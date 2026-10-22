"use server"

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, checkSpam } from '@/lib/rateLimit'

async function runIntake(formData: FormData) {
  // Anti-spam checks
  if (checkSpam(formData)) {
    return { success: true }
  }

  // Rate limiting (3 times/hour for Business Intake)
  await checkRateLimit(3, 'intake')

  const supabase = await createClient()

  // 1) File validation (up to 5 files, 10MB each, allowed formats)
  const files = formData
    .getAll('business_photos')
    .filter((x): x is File => x instanceof File && x.size > 0)
  if (files.length < 3 || files.length > 5) {
    throw new Error('Please upload between 3 and 5 photos.')
  }

  const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
  for (const file of files) {
    if (file.size > 10_000_000) {
      throw new Error('Each photo must be under 10 MB.')
    }
    if (
      !allowedMime.includes(file.type.toLowerCase()) &&
      !file.name.toLowerCase().endsWith('.heic')
    ) {
      throw new Error('Only JPG, PNG, WebP, and HEIC files are allowed.')
    }
  }

  // 2) Process and upload images
  const { processUpload } = await import('@/lib/image/process')
  const { convertHeicToJpeg } = await import('@/lib/image/heic')
  const photoUrls: string[] = []

  for (const file of files) {
    let buffer = Buffer.from(await file.arrayBuffer()) as any
    if (
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    ) {
      buffer = (await convertHeicToJpeg(buffer)) as Buffer
    }
    const processed = await processUpload(buffer)
    const baseName = `${Date.now()}-${crypto.randomUUID()}`

    let fullUrl = ''
    for (const img of processed) {
      const path = `business-intake/${baseName}${img.suffix}`
      const { error } = await supabase.storage
        .from('site-media')
        .upload(path, img.buffer, { contentType: img.contentType })
      if (error) throw new Error(`Photo upload failed: ${error.message}`)

      if (img.suffix === '-full.webp') {
        fullUrl = supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl
      }
    }
    photoUrls.push(fullUrl)
  }

  // 3) Create submission record
  function str(v: FormDataEntryValue | null) {
    return typeof v === 'string' ? v.trim() : ''
  }
  function normalizeSocial(value: string, network: 'facebook' | 'instagram' | 'tiktok') {
    let v = value.trim()
    if (!v) return null
    if (/^https?:\/\//i.test(v)) return v
    v = v.replace(/^@/, '').replace(/^\/+|\/+$/g, '')
    if (v.includes('.com/')) return `https://${v}`
    if (network === 'facebook') return `https://facebook.com/${v}`
    if (network === 'instagram') return `https://instagram.com/${v}`
    return `https://tiktok.com/@${v}`
  }

  const publicName = str(formData.get('public_name'))
  const address = str(formData.get('address'))
  const basePayload: Record<string, any> = {
    contact_name: str(formData.get('contact_name')) || null,
    contact_email: str(formData.get('contact_email')).toLowerCase(),
    public_name: publicName,
    google_maps_name: str(formData.get('google_maps_name')) || publicName,
    google_maps_url:
      str(formData.get('google_maps_url')) ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${publicName} ${address}`
      )}`,
    tax_code: str(formData.get('tax_code')),
    category: str(formData.get('category')),
    subcategory: str(formData.get('subcategory')) || null,
    tags: str(formData.get('tags'))
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 12),
    price_level: str(formData.get('price_level')) || null,
    address,
    description_en: str(formData.get('description_en')) || null,
    phone: str(formData.get('phone')) || null,
    website_url: str(formData.get('website_url')) || null,
    facebook_url: normalizeSocial(str(formData.get('facebook_url')), 'facebook'),
    instagram_url: normalizeSocial(str(formData.get('instagram_url')), 'instagram'),
    tiktok_url: normalizeSocial(str(formData.get('tiktok_url')), 'tiktok'),
    photo_urls: photoUrls,
    status: 'submitted',
    maps_check_status: 'pending',
    tax_check_status: 'pending',
    relationship_check_status: 'pending',
    photo_check_status: 'pending',
    editorial_check_status: 'pending',
  }

  if (!basePayload.contact_email || !basePayload.public_name || !basePayload.address) {
    throw new Error('Contact email, business name and address are required.')
  }

  // Extended multilingual + merged /kr/join optional fields (supported once migration 019 is applied)
  const extendedFields: Record<string, any> = {
    description_vi: str(formData.get('description_vi')) || null,
    description_ko: str(formData.get('description_ko')) || null,
    opening_hours: str(formData.get('opening_hours')) || null,
    kakao_openchat_url: str(formData.get('kakao_openchat_url')) || null,
    zalo_phone: str(formData.get('zalo_phone')) || null,
    messenger_url: str(formData.get('messenger_url')) || null,
    preferred_contact: str(formData.get('preferred_contact')) || null,
    delivery_available: str(formData.get('delivery_available')) === 'yes',
    delivery_mode: str(formData.get('delivery_mode')) || null,
    delivery_area: str(formData.get('delivery_area')) || null,
  }

  const fullPayload = { ...basePayload, ...extendedFields }
  const { error } = await supabase.from('business_submissions').insert(fullPayload)
  if (error) {
    // Graceful fallback if 019 migration has not been applied to live DB yet
    if (error.message && /column .* does not exist|schema cache/i.test(error.message)) {
      const { error: fallbackError } = await supabase
        .from('business_submissions')
        .insert(basePayload)
      if (fallbackError) throw new Error(`Submission record failed: ${fallbackError.message}`)
    } else {
      throw new Error(`Submission record failed: ${error.message}`)
    }
  }

  return { success: true }
}

export async function submitBusinessIntake(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await runIntake(formData)
    return { success: true }
  } catch (e) {
    console.error('submitBusinessIntake failed', e)
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Submission failed. Please try again.',
    }
  }
}
