"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, requireStaff } from '@/lib/auth'
import { DIRECTORY_CATEGORY_KEYS, DEFAULT_DIRECTORY_CATEGORY_APPEARANCE, mergeDirectoryCategoryAppearance } from '@/lib/directory'
import { checkRateLimit, checkSpam } from '@/lib/rateLimit'

function str(v: FormDataEntryValue | null) { return typeof v === 'string' ? v.trim() : '' }
function slugify(v:string){return v.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90)||crypto.randomUUID()}
function normalizeSocial(value:string,network:'facebook'|'instagram'|'tiktok'){
  let v=value.trim(); if(!v) return null
  if(/^https?:\/\//i.test(v)) return v
  v=v.replace(/^@/,'').replace(/^\/+|\/+$/g,'')
  if(v.includes('.com/')) return `https://${v}`
  if(network==='facebook') return `https://facebook.com/${v}`
  if(network==='instagram') return `https://instagram.com/${v}`
  return `https://tiktok.com/@${v}`
}
async function uploadImage(supabase:Awaited<ReturnType<typeof createClient>>,file:File,folder:string,max=5_000_000){
  if(file.size>max) throw new Error('Each image must be under 5 MB. (Will be optimized to WebP)');
  if(!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.heic') && !file.name.toLowerCase().endsWith('.heif')) throw new Error('Only image files are allowed.');
  
  const { processUpload } = await import('@/lib/image/process');
  const { convertHeicToJpeg } = await import('@/lib/image/heic');
  let buffer = Buffer.from(await file.arrayBuffer()) as any;
  if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      buffer = await convertHeicToJpeg(buffer) as Buffer
  }
  const processed = await processUpload(buffer);
  
  const baseName = `${Date.now()}-${crypto.randomUUID()}`;
  let fullUrl = '';
  
  for (const img of processed) {
    const path = `${folder}/${baseName}${img.suffix}`;
    const { error } = await supabase.storage.from('site-media').upload(path, img.buffer, { upsert: false, contentType: img.contentType });
    if (error) throw error;
    if (img.suffix === '-full.webp') {
      fullUrl = supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl;
    }
  }
  return fullUrl;
}

export async function submitSuggestion(formData: FormData) {
  if (checkSpam(formData)) return
  await checkRateLimit(5, 'suggestion')
  const supabase = await createClient()
  const payload = { name:str(formData.get('name')),email:str(formData.get('email')),suggestion_type:str(formData.get('type')),message:str(formData.get('message')) }
  if (!payload.email || !payload.message) throw new Error('Email and message are required.')
  const { error } = await supabase.from('community_suggestions').insert(payload); if (error) throw error
  revalidatePath('/admin')
}

export async function submitVolunteer(formData: FormData) {
  if (checkSpam(formData)) return
  await checkRateLimit(5, 'volunteer')
  const supabase = await createClient()
  const payload = { name:str(formData.get('name')),email:str(formData.get('email')),area:str(formData.get('area')),message:str(formData.get('message')) }
  if (!payload.email || !payload.message) throw new Error('Email and message are required.')
  const { error } = await supabase.from('volunteer_applications').insert(payload); if (error) throw error
  revalidatePath('/admin')
}

export async function subscribeNewsletter(formData:FormData){
  if (checkSpam(formData)) return
  await checkRateLimit(5, 'newsletter')
  const supabase=await createClient();const email=str(formData.get('email')).toLowerCase();const full_name=str(formData.get('full_name'));const consent=str(formData.get('consent'))==='yes'
  if(!email||!consent) throw new Error('Email and consent are required.')
  const {error}=await supabase.from('newsletter_subscribers').insert({email,full_name,consent:true,status:'subscribed',updated_at:new Date().toISOString()});if(error&&error.code!=='23505') throw error
}

export async function submitBusiness(formData: FormData) {
  const supabase = await createClient()
  const files=formData.getAll('business_photos').filter((x):x is File=>x instanceof File&&x.size>0)
  if(files.length<3||files.length>8) throw new Error('Please upload between 3 and 8 photos.')
  const photo_urls:string[]=[]
  for(const file of files) photo_urls.push(await uploadImage(supabase,file,'business-intake'))
  const public_name=str(formData.get('public_name')),address=str(formData.get('address'))
  const tags=str(formData.get('tags')).split(',').map(x=>x.trim()).filter(Boolean).slice(0,12)
  const google_maps_url=str(formData.get('google_maps_url'))||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${public_name} ${address}`)}`
  const payload = {
    contact_name:str(formData.get('contact_name')),contact_email:str(formData.get('contact_email')),public_name,
    google_maps_name:str(formData.get('google_maps_name'))||public_name,google_maps_url,tax_code:str(formData.get('tax_code')),
    category:str(formData.get('category')),subcategory:str(formData.get('subcategory')),tags,price_level:str(formData.get('price_level'))||null,address,description_en:str(formData.get('description_en')),phone:str(formData.get('phone')),
    website_url:str(formData.get('website_url'))||null,facebook_url:normalizeSocial(str(formData.get('facebook_url')),'facebook'),instagram_url:normalizeSocial(str(formData.get('instagram_url')),'instagram'),tiktok_url:normalizeSocial(str(formData.get('tiktok_url')),'tiktok'),photo_urls,
  }
  if (!payload.contact_email || !payload.public_name || !payload.tax_code || !payload.address) throw new Error('Contact email, business name, tax code and address are required.')
  const { error } = await supabase.from('business_submissions').insert(payload); if (error) throw error
  revalidatePath('/admin')
}

export async function saveAppearance(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  let imageUrl = str(formData.get('hero_image_url')) || '/stock/hero.webp'
  const file = formData.get('hero_image'); if (file instanceof File && file.size > 0) imageUrl=await uploadImage(supabase,file,'hero')
  const value = {hero_image_url:imageUrl,hero_topline:str(formData.get('hero_topline')),hero_title:str(formData.get('hero_title')),hero_subtitle:str(formData.get('hero_subtitle')),hero_description:str(formData.get('hero_description')),hero_primary_cta:str(formData.get('hero_primary_cta')),hero_secondary_cta:str(formData.get('hero_secondary_cta')),hero_note:str(formData.get('hero_note')),hero_blur:Number(str(formData.get('hero_blur'))||2),hero_overlay:Number(str(formData.get('hero_overlay'))||.18),accent_color:str(formData.get('accent_color'))||'#556f58',bg_color:str(formData.get('bg_color'))||'#f5f2ea',paper_color:str(formData.get('paper_color'))||'#fffdf8',radius:Number(str(formData.get('radius'))||28)}
  const { error } = await supabase.from('site_settings').upsert({ key: 'appearance', value, updated_by: user.id }, { onConflict: 'key' }); if (error) throw error
  await supabase.from('audit_logs').insert({ actor_id: user.id, action: 'appearance.updated', entity_type: 'site_settings', entity_id: 'appearance' })
  revalidatePath('/');revalidatePath('/admin')
}


export async function saveCategoryIcons(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  const {data:existingRow}=await supabase.from('site_settings').select('value').eq('key','directory_categories').maybeSingle()
  const current=mergeDirectoryCategoryAppearance(existingRow?.value)
  const value:any={}
  for(const key of DIRECTORY_CATEGORY_KEYS){
    let icon_url=str(formData.get(`icon_url_${key}`)) || current[key].icon_url || ''
    const file=formData.get(`icon_image_${key}`)
    if(file instanceof File && file.size>0) icon_url=await uploadImage(supabase,file,'category-icons',2_000_000)
    if(str(formData.get(`remove_icon_${key}`))==='yes') icon_url=''
    value[key]={
      icon_text:(str(formData.get(`icon_text_${key}`)) || DEFAULT_DIRECTORY_CATEGORY_APPEARANCE[key].icon_text).slice(0,6),
      icon_url,
    }
  }
  const {error}=await supabase.from('site_settings').upsert({key:'directory_categories',value,updated_by:user.id},{onConflict:'key'})
  if(error) throw error
  await supabase.from('audit_logs').insert({actor_id:user.id,action:'directory.category_icons.updated',entity_type:'site_settings',entity_id:'directory_categories'})
  revalidatePath('/')
  revalidatePath('/admin')
  for(const key of DIRECTORY_CATEGORY_KEYS) revalidatePath(`/directory/${key}`)
}

export async function reviewSubmission(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  const id=str(formData.get('id'))
  const decision=str(formData.get('decision'))
  const verification_note=str(formData.get('verification_note'))||null
  const requested_changes=str(formData.get('requested_changes'))||null
  if (!id || !['approved','rejected','manual_review','needs_info'].includes(decision)) throw new Error('Invalid review action')

  const {data:submission,error:readError}=await supabase.from('business_submissions').select('*').eq('id',id).single()
  if(readError) throw readError

  if(decision==='approved'){
    const slug=slugify(submission.public_name)
    const allowedCategories=DIRECTORY_CATEGORY_KEYS as readonly string[]
    const category=allowedCategories.includes(submission.category)?submission.category:'wellness'
    const businessPayload={
      public_name:submission.public_name,
      slug,
      category,
      subcategory:submission.subcategory,
      description_en:submission.description_en,
      address:submission.address,
      google_maps_name:submission.google_maps_name,
      google_maps_url:submission.google_maps_url,
      tax_code:submission.tax_code,
      phone:submission.phone,
      website_url:submission.website_url,
      facebook_url:submission.facebook_url,
      instagram_url:submission.instagram_url,
      tiktok_url:submission.tiktok_url,
      gallery_urls:submission.photo_urls||[],
      tags:submission.tags||[],
      price_level:submission.price_level||null,
      status:'published',
      verification_status:'verified',
      verification_note:verification_note||'Manually reviewed and approved by the site administrator.',
      published_at:new Date().toISOString(),
      updated_by:user.id,
      updated_at:new Date().toISOString()
    }
    const {error:businessError}=await supabase.from('businesses').upsert(businessPayload,{onConflict:'slug'})
    if(businessError) throw businessError
  }

  const submissionUpdate:any={
    status:decision,
    verification_note,
    requested_changes:decision==='needs_info'?(requested_changes||'Please update the submitted information and contact us if you need help.'):requested_changes,
    reviewed_by:user.id,
    reviewed_at:new Date().toISOString()
  }
  if(decision==='approved'){
    submissionUpdate.maps_check_status='matched'
    submissionUpdate.tax_check_status='verified'
    submissionUpdate.relationship_check_status='verified'
    submissionUpdate.photo_check_status='passed'
    submissionUpdate.editorial_check_status='passed'
  }

  const { error } = await supabase.from('business_submissions').update(submissionUpdate).eq('id', id)
  if (error) throw error
  await supabase.from('audit_logs').insert({ actor_id: user.id, action: `business_submission.${decision}`, entity_type: 'business_submission', entity_id: id })
  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath(`/admin/submissions/${id}`)
  for(const key of DIRECTORY_CATEGORY_KEYS)revalidatePath(`/directory/${key}`)
}

export async function saveSponsorSlot(formData:FormData){
  const {supabase,user}=await requireAdmin();const slot_key=str(formData.get('slot_key'));const size=str(formData.get('size'))
  if(!/^main-[1-7]$|^small-[1-4]$/.test(slot_key)||!['main','small'].includes(size)) throw new Error('Invalid sponsor slot.')
  let image_url=str(formData.get('image_url'));const file=formData.get('image')
  if(file instanceof File&&file.size>0) image_url=await uploadImage(supabase,file,'sponsors')
  if(!image_url) throw new Error('Sponsor image is required.')
  const payload={slot_key,size,title:str(formData.get('title')),subtitle:str(formData.get('subtitle')),image_url,target_url:str(formData.get('target_url'))||'#',is_active:str(formData.get('is_active'))==='yes',sort_order:Number(slot_key.split('-')[1]),updated_by:user.id,updated_at:new Date().toISOString()}
  const {error}=await supabase.from('sponsor_banners').upsert(payload,{onConflict:'slot_key'});if(error) throw error
  revalidatePath('/');revalidatePath('/admin')
}

export async function createEvent(formData:FormData){
  const {supabase,user}=await requireAdmin();const title=str(formData.get('title'));if(!title)throw new Error('Title is required.')
  const slug=`${slugify(title)}-${Date.now().toString(36)}`
  let cover=str(formData.get('cover_image_url'))||'/stock/hobby.webp';const file=formData.get('cover_image');if(file instanceof File&&file.size>0)cover=await uploadImage(supabase,file,'events')
  const {error}=await supabase.from('stories').insert({title,slug,category:'Events',excerpt:str(formData.get('excerpt')),body_en:str(formData.get('body_en')),cover_image_url:cover,status:'published',content_type:'event',event_date:str(formData.get('event_date'))||null,event_location:str(formData.get('event_location')),is_featured:true,author_id:user.id,published_at:new Date().toISOString()});if(error) throw error
  revalidatePath('/');revalidatePath('/news/events');revalidatePath('/admin')
}

export async function createBackupSnapshot(formData:FormData){
  const {supabase,user}=await requireAdmin();const label=str(formData.get('label'))||`Manual backup ${new Date().toISOString()}`
  const tables=['profiles','businesses','business_submissions','business_claims','verification_checks','stories','newsletter_subscribers','sponsor_banners','site_settings','impact_programs','promotions','community_suggestions','volunteer_applications','saved_businesses','audit_logs'] as const
  const snapshot:Record<string,unknown>={generated_at:new Date().toISOString(),format_version:1}
  for(const table of tables){const {data,error}=await supabase.from(table).select('*');if(error)throw error;snapshot[table]=data||[]}
  const {error}=await supabase.from('backup_snapshots').insert({label,snapshot,created_by:user.id});if(error)throw error
  revalidatePath('/admin')
}

export async function saveArticle(formData:FormData){
  const {supabase,user}=await requireStaff('/editor')
  const id=str(formData.get('id'))
  const title=str(formData.get('title'))
  if(!title) throw new Error('Title is required.')
  const content_type=str(formData.get('content_type'))||'news'
  if(!['news','blog','impact','event','story'].includes(content_type)) throw new Error('Invalid content type.')
  const status=str(formData.get('status'))==='published'?'published':'draft'
  const requestedSlug=str(formData.get('slug'))
  let cover_image_url=str(formData.get('cover_image_url'))||'/stock/wellness.webp'
  const cover=formData.get('cover_image')
  if(cover instanceof File&&cover.size>0) cover_image_url=await uploadImage(supabase,cover,'editorial')
  const removeGallery=new Set(formData.getAll('remove_gallery').map(x=>String(x)))
  const existingGallery=str(formData.get('existing_gallery')).split('\n').map(x=>x.trim()).filter(Boolean).filter(x=>!removeGallery.has(x)).slice(0,10)
  const newGallery=formData.getAll('gallery_images').filter((x):x is File=>x instanceof File&&x.size>0)
  const gallery_urls=[...existingGallery]
  for(const file of newGallery.slice(0,Math.max(0,10-gallery_urls.length))) gallery_urls.push(await uploadImage(supabase,file,'editorial-gallery'))
  const tags=str(formData.get('tags')).split(/[,\n]/).map(x=>x.trim()).filter(Boolean).slice(0,20)
  const key_points=str(formData.get('key_points')).split('\n').map(x=>x.trim().replace(/^[-•]\s*/, '')).filter(Boolean).slice(0,12)
  const publishedInput=str(formData.get('published_at'))
  const published_at=status==='published'?(publishedInput?new Date(publishedInput).toISOString():new Date().toISOString()):null

  let body_en = str(formData.get('body_en'));
  let excerpt = str(formData.get('excerpt'));
  if (!excerpt && body_en) {
    const paragraphs = body_en.split(/\n\s*\n/).filter(x => x.trim() && !/^#{1,6}\s|^-\s|^>\s|^---$|^!\[/.test(x.trim()));
    if (paragraphs.length > 0) {
      let firstPara = paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_~`]/g, '').trim();
      excerpt = firstPara.length > 160 ? firstPara.slice(0, 157) + '...' : firstPara;
    }
  }
  let seo_title = str(formData.get('seo_title')) || title;
  let seo_description = str(formData.get('seo_description')) || excerpt;

  const base={
    title,
    subtitle:str(formData.get('subtitle'))||null,
    category:str(formData.get('category'))||'Local News',
    excerpt,
    body_en,
    cover_image_url,
    hero_caption:str(formData.get('hero_caption'))||null,
    gallery_urls,
    status,
    content_type,
    source_name:str(formData.get('source_name'))||null,
    source_url:str(formData.get('source_url'))||null,
    source_published_at:str(formData.get('source_published_at'))||null,
    effective_date:str(formData.get('effective_date'))||null,
    event_date:str(formData.get('event_date'))||null,
    event_location:str(formData.get('event_location'))||null,
    impact_topic:str(formData.get('impact_topic'))||null,
    is_featured:formData.get('is_featured')==='yes',
    newsletter_ready:formData.get('newsletter_ready')==='yes',
    author_name:str(formData.get('author_name'))||null,
    tags,
    key_points,
    callout:str(formData.get('callout'))||null,
    seo_title:seo_title||null,
    seo_description:seo_description||null,
    editor_note:str(formData.get('editor_note'))||null,
    author_id:user.id,
    updated_at:new Date().toISOString(),
    published_at,
  }
  let articleSlug=requestedSlug?slugify(requestedSlug):''
  if(id){
    const update:any={...base}
    if(articleSlug)update.slug=articleSlug
    else{
      const {data:existing}=await supabase.from('stories').select('slug').eq('id',id).maybeSingle()
      articleSlug=existing?.slug||''
    }
    const {error}=await supabase.from('stories').update(update).eq('id',id);if(error) throw error
  }else{
    articleSlug=articleSlug||`${slugify(title)}-${Date.now().toString(36)}`
    const {error}=await supabase.from('stories').insert({...base,slug:articleSlug});if(error) throw error
  }
  revalidatePath('/');revalidatePath('/news');revalidatePath('/news/events');revalidatePath('/impact');revalidatePath('/editor');revalidatePath('/admin');if(articleSlug)revalidatePath(`/news/${articleSlug}`)
}

export async function deleteArticle(formData:FormData){
  const {supabase}=await requireStaff('/editor')
  const id=str(formData.get('id'));if(!id) throw new Error('Article ID is required.')
  const {error}=await supabase.from('stories').delete().eq('id',id);if(error) throw error
  revalidatePath('/');revalidatePath('/news');revalidatePath('/impact');revalidatePath('/editor');revalidatePath('/admin')
}

function parseLines(value:string){return value.split('\n').map(x=>x.trim()).filter(Boolean)}
function parsePairs(value:string){
  return Object.fromEntries(parseLines(value).map(line=>{const i=line.indexOf('=');return i>0?[line.slice(0,i).trim(),line.slice(i+1).trim()]:[line,'Yes']}))
}

export async function saveBusiness(formData:FormData){
  const {supabase,user}=await requireAdmin()
  const id=str(formData.get('id'))
  if(!id)throw new Error('Business ID is required.')
  const public_name=str(formData.get('public_name'))
  if(!public_name)throw new Error('Business name is required.')
  const allowedCategories=DIRECTORY_CATEGORY_KEYS as readonly string[]
  const category=allowedCategories.includes(str(formData.get('category')))?str(formData.get('category')):'wellness'
  const existing=str(formData.get('existing_gallery')).split('\n').map(x=>x.trim()).filter(Boolean)
  const removed=new Set(formData.getAll('remove_gallery').map(x=>String(x)))
  const gallery_urls=existing.filter(x=>!removed.has(x)).slice(0,8)
  const files=formData.getAll('gallery_images').filter((x):x is File=>x instanceof File&&x.size>0)
  for(const file of files.slice(0,Math.max(0,8-gallery_urls.length)))gallery_urls.push(await uploadImage(supabase,file,'businesses'))
  const statusAllowed=['draft','submitted','review','published','rejected','needs_update','archived']
  const verificationAllowed=['unverified','ai_checked','manual_review','verified','rejected']
  const status=statusAllowed.includes(str(formData.get('status')))?str(formData.get('status')):'draft'
  const verification_status=verificationAllowed.includes(str(formData.get('verification_status')))?str(formData.get('verification_status')):'unverified'
  const slugInput=str(formData.get('slug'))
  const payload={
    public_name,
    slug:slugInput?slugify(slugInput):slugify(public_name),
    category,
    subcategory:str(formData.get('subcategory'))||null,
    description_en:str(formData.get('description_en'))||null,
    address:str(formData.get('address'))||null,
    phone:str(formData.get('phone'))||null,
    website_url:str(formData.get('website_url'))||null,
    facebook_url:normalizeSocial(str(formData.get('facebook_url')),'facebook')||null,
    instagram_url:normalizeSocial(str(formData.get('instagram_url')),'instagram')||null,
    tiktok_url:normalizeSocial(str(formData.get('tiktok_url')),'tiktok')||null,
    booking_url:str(formData.get('booking_url'))||null,
    google_maps_name:str(formData.get('google_maps_name'))||public_name,
    google_maps_url:str(formData.get('google_maps_url'))||null,
    google_rating:str(formData.get('google_rating'))?Number(str(formData.get('google_rating'))):null,
    google_review_count:str(formData.get('google_review_count'))?Number(str(formData.get('google_review_count'))):null,
    rating_source:str(formData.get('rating_source'))||null,
    tax_code:str(formData.get('tax_code'))||null,
    price_level:str(formData.get('price_level'))||null,
    badges:formData.getAll('badges').map(x=>String(x)).filter(x=>['Recommended','New','HOT'].includes(x)),
    is_good_life_member:str(formData.get('is_good_life_member'))==='yes',
    good_life_member_since:str(formData.get('good_life_member_since'))||null,
    good_life_member_note:str(formData.get('good_life_member_note'))||null,
    tags:str(formData.get('tags')).split(/[,\n]/).map(x=>x.trim()).filter(Boolean).slice(0,20),
    services:parseLines(str(formData.get('services'))),
    highlights:parseLines(str(formData.get('highlights'))),
    opening_hours:parsePairs(str(formData.get('opening_hours'))),
    amenities:parsePairs(str(formData.get('amenities'))),
    gallery_urls,
    source_label:str(formData.get('source_label'))||null,
    media_note:str(formData.get('media_note'))||null,
    status,
    verification_status,
    verification_note:str(formData.get('verification_note'))||null,
    last_verified_at:verification_status==='verified'?(str(formData.get('existing_last_verified_at'))||new Date().toISOString()):(str(formData.get('existing_last_verified_at'))||null),
    listing_checked_at:str(formData.get('mark_listing_checked'))==='yes'?new Date().toISOString():(str(formData.get('existing_listing_checked_at'))||null),
    listing_checked_by:str(formData.get('mark_listing_checked'))==='yes'?user.id:(str(formData.get('existing_listing_checked_by'))||null),
    published_at:status==='published'?new Date().toISOString():null,
    updated_by:user.id,
    updated_at:new Date().toISOString(),
  }
  const {error}=await supabase.from('businesses').update(payload).eq('id',id)
  if(error)throw error
  revalidatePath('/');revalidatePath('/search');for(const key of DIRECTORY_CATEGORY_KEYS)revalidatePath(`/directory/${key}`);revalidatePath(`/business/${payload.slug}`);revalidatePath('/admin')
}


export async function saveBusinessEditorNote(formData:FormData){
  const {supabase,user,profile}=await requireStaff('/editor')
  const id=str(formData.get('id'))
  if(!id) throw new Error('Business ID is required.')
  const payload={
    editor_name:str(formData.get('editor_name'))||profile.full_name||profile.email,
    editor_visited_at:str(formData.get('editor_visited_at'))||null,
    editor_note:str(formData.get('editor_note'))||null,
    editor_note_updated_at:new Date().toISOString(),
    editor_note_updated_by:user.id,
  }
  const {error}=await supabase.from('businesses').update(payload).eq('id',id)
  if(error) throw error
  const {data:b}=await supabase.from('businesses').select('slug').eq('id',id).single()
  revalidatePath('/editor')
  revalidatePath(`/editor/businesses/${id}`)
  if(b?.slug) revalidatePath(`/business/${b.slug}`)
}

export async function deleteBusiness(formData:FormData){
  const {supabase}=await requireAdmin()
  const id=str(formData.get('id'))
  if(!id)throw new Error('Business ID is required.')
  const {error}=await supabase.from('businesses').delete().eq('id',id)
  if(error)throw error
  revalidatePath('/');revalidatePath('/search');for(const key of DIRECTORY_CATEGORY_KEYS)revalidatePath(`/directory/${key}`);revalidatePath('/admin')
}

export async function importOsmCsv(formData: FormData) {
  const { supabase, profile } = await requireStaff('importOsmCsv');
  const file = formData.get('csv_file');
  if (!(file instanceof File) || file.size === 0) throw new Error('No CSV file uploaded.');
  
  const text = await file.text();
  const rows = text.split('\n').filter(Boolean) as any[];
  if (rows.length < 2) throw new Error('CSV is empty or invalid.');
  
  const headers = rows[0].split(',').map((x: string) => x.trim().replace(/^"|"$/g, ''));
  
  const parsed = rows.slice(1).map(row => {
    const values: string[] = [];
    let inQuotes = false;
    let curr = '';
    for(let i=0; i<row.length; i++){
      const c = row[i];
      if(c === '"' && row[i+1] === '"') { curr += '"'; i++; }
      else if(c === '"') { inQuotes = !inQuotes; }
      else if(c === ',' && !inQuotes) { values.push(curr); curr = ''; }
      else { curr += c; }
    }
    values.push(curr);
    const obj: any = {};
    headers.forEach((h: string, i: number) => obj[h] = values[i]?.trim() || null);
    return obj;
  });

  const inserts: any[] = parsed.map(p => {
    if (!p.name) return null;
    return {
      public_name: p.name,
      slug: (p.name_en || p.name).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random()*10000),
      category: p.category || 'food',
      subcategory: p.subcategory || null,
      address: p.address || null,
      lat: p.lat ? Number(p.lat) : null,
      lng: p.lng ? Number(p.lng) : null,
      phone: p.phone || null,
      website_url: p.website || null,
      facebook_url: p.facebook || null,
      instagram_url: p.instagram || null,
      google_maps_url: p.google_maps_search || null,
      source: p.source || 'osm',
      source_id: p.osm_id || null,
      source_url: p.osm_url || null,
      opening_hours: p.opening_hours ? { raw: p.opening_hours } : {},
      status: 'draft',
      verification_status: 'unverified',
      /* created_by: profile.id */
      /* updated_by: profile.id */
    };
  }).filter(Boolean);

  if (inserts.length === 0) throw new Error('No valid rows found to import.');

  const { error } = await supabase.from('businesses').insert(inserts);
  if (error) throw new Error('DB Insert failed: ' + error.message);

  revalidatePath('/admin');
  revalidatePath('/editor');
}

export async function saveHomeSections(formData: FormData) {
  const { supabase, user } = await requireAdmin()
  
  const purposeVisible = formData.get('purposeVisible') === 'on'
  const purposeTitle = String(formData.get('purposeTitle') || '').trim().slice(0,120)
  const purposeDescription = String(formData.get('purposeDescription') || '').trim().slice(0,400)
  const purposeHandNote = String(formData.get('purposeHandNote') || '').trim().slice(0,120)

  const discoverVisible = formData.get('discoverVisible') === 'on'
  const discoverTitle = String(formData.get('discoverTitle') || '').trim().slice(0,120)
  const discoverDescription = String(formData.get('discoverDescription') || '').trim().slice(0,400)

  const storiesVisible = formData.get('storiesVisible') === 'on'
  const storiesTitle = String(formData.get('storiesTitle') || '').trim().slice(0,120)
  const storiesDescription = String(formData.get('storiesDescription') || '').trim().slice(0,400)

  const newsletterVisible = formData.get('newsletterVisible') === 'on'
  const newsletterTitle = String(formData.get('newsletterTitle') || '').trim().slice(0,120)
  const newsletterDescription = String(formData.get('newsletterDescription') || '').trim().slice(0,400)

  const participationVisible = formData.get('participationVisible') === 'on'
  const suggestionTitle = String(formData.get('suggestionTitle') || '').trim().slice(0,120)
  const suggestionDescription = String(formData.get('suggestionDescription') || '').trim().slice(0,400)
  const volunteerTitle = String(formData.get('volunteerTitle') || '').trim().slice(0,120)
  const volunteerDescription = String(formData.get('volunteerDescription') || '').trim().slice(0,400)

  const closingVisible = formData.get('closingVisible') === 'on'
  const closingTitle = String(formData.get('closingTitle') || '').trim().slice(0,120)
  const closingDescription = String(formData.get('closingDescription') || '').trim().slice(0,400)

  const eventPromoVisible = formData.get('eventPromoVisible') === 'on'

  const payload = {
    purpose: { visible: purposeVisible, title: purposeTitle, description: purposeDescription, handNote: purposeHandNote },
    discover: { visible: discoverVisible, title: discoverTitle, description: discoverDescription },
    stories: { visible: storiesVisible, title: storiesTitle, description: storiesDescription },
    newsletter: { visible: newsletterVisible, title: newsletterTitle, description: newsletterDescription },
    participation: { visible: participationVisible, suggestionTitle, suggestionDescription, volunteerTitle, volunteerDescription },
    closing: { visible: closingVisible, title: closingTitle, description: closingDescription },
    eventPromo: { visible: eventPromoVisible }
  }
  
  await supabase.from('site_settings').upsert({ key: 'home_sections', value: payload, updated_by: user.id }, { onConflict: 'key' })
  await supabase.from('audit_logs').insert({ actor_id: user.id, action: 'home_sections.updated', entity_type: 'site_settings', entity_id: 'home_sections' })
  
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateSponsorApplicationStatus(formData: FormData) {
  const { supabase, user } = await requireStaff();
  const id = str(formData.get('id'));
  const status = str(formData.get('status'));
  const reviewNote = str(formData.get('review_note'));

  const validStatuses = ['pending', 'reserved', 'approved', 'rejected', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const { error } = await supabase
    .from('sponsor_applications')
    .update({
      status,
      review_note: reviewNote || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/editor');
}

