#!/usr/bin/env node
/**
 * scripts/generate_businesses_seed_v2.js
 * 
 * 1) 3_푸꾸옥_선셋타운_전체시설_마스터DB.json (선셋타운 291곳)
 *    - google_place_id 추가
 *    - description_en에서 한국어 전면 제거 (영어만)
 *    - verification_status: 'ai_checked', verification_note: 'Master DB 수집 2026-10, 현장 미확인'
 *    - status: 'published'
 *    - 카페가 bars로 들어간 것 -> dining/cafe로 분류
 *    - description_ko 속 원화 환산 요금 삭제(VND만 유지, '2026-10 기준' 표기)
 * 2) data/phuquoc-photon-candidates.json (푸꾸옥 전역 262곳)
 *    - status: 'review' (비공개)
 *    - verification_status: 'ai_checked'
 *    - subcategory 'yes' 등 OSM 원시값 정리
 *    - description_en 한국어 없음 (영어만)
 * 
 * 산출물: supabase/seed_phuquoc_businesses_v2.sql
 */

import { readFileSync, writeFileSync } from 'node:fs'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function escapeSql(str) {
  if (str === null || str === undefined || str === '') return 'NULL'
  return `'${String(str).replace(/'/g, "''")}'`
}

function cleanKrwPricing(text) {
  if (!text) return ''
  // Remove patterns like (약 5.2만~14만원), (약 6.6만~19.5만원), (약 5천~1.2만원), (약 ... 원)
  let cleaned = text.replace(/\s*\([약\s]*[0-9.,~–\-]+\s*[만천\s]*~?\s*[0-9.,]*\s*[만천]?\s*원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\s*\([약\s]*[0-9.,~–\s만천]+원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\s*\(약\s*[0-9.,~–\-]+\s*만원\)/g, ' (2026-10 기준)')
  // Dedup repeated (2026-10 기준)
  cleaned = cleaned.replace(/(\s*\(2026-10 기준\))+/g, ' (2026-10 기준)')
  return cleaned.trim()
}

function mapSubcategoryAndCategory(item) {
  const masterCat = item.master_category || ''
  const subCat = item.sub_category || ''
  const name = (item.name_display || item.name_google || '').toLowerCase()

  // 1. Cafe detection: 카페가 bars로 들어간 건 dining/cafe로
  const isCafe = masterCat.includes('카페') ||
    subCat.includes('카페') ||
    subCat.includes('커피') ||
    subCat.includes('베이커리') ||
    subCat.includes('디저트') ||
    subCat.includes('아이스크림') ||
    name.includes('cafe') ||
    name.includes('coffee') ||
    name.includes('bakery')

  if (isCafe && !masterCat.includes('호텔')) {
    return { category: 'dining', subcategory: 'cafe', enType: 'cafe & bakery' }
  }

  // 2. Bar / Pub / Lounge
  if (masterCat.includes('바 & 펍') || subCat.includes('바') || subCat.includes('펍') || subCat.includes('라운지') || subCat.includes('술집')) {
    return { category: 'bars', subcategory: 'bar', enType: 'sunset bar & lounge' }
  }

  // 3. Hotel / Accommodation
  if (masterCat.includes('호텔') || subCat.includes('호텔') || subCat.includes('리조트') || subCat.includes('레지던스')) {
    let sub = 'hotel'
    let enType = 'hotel & resort'
    if (subCat.includes('부티크')) { sub = 'boutique_hotel'; enType = 'boutique hotel' }
    else if (subCat.includes('레지던스') || subCat.includes('아파트')) { sub = 'residence'; enType = 'residence apartment' }
    return { category: 'hotels', subcategory: sub, enType }
  }

  // 4. Dining / Restaurant
  if (masterCat.includes('식당') || subCat.includes('음식점') || subCat.includes('레스토랑') || subCat.includes('식당')) {
    let sub = 'restaurant'
    let enType = 'restaurant'
    if (subCat.includes('해산물')) { sub = 'seafood'; enType = 'seafood restaurant' }
    else if (subCat.includes('베트남') || subCat.includes('쌀국수')) { sub = 'vietnamese'; enType = 'Vietnamese restaurant' }
    else if (subCat.includes('이탈리안') || subCat.includes('그리스') || subCat.includes('지중해')) { sub = 'western'; enType = 'Mediterranean & Italian restaurant' }
    else if (subCat.includes('한식') || subCat.includes('고기구이')) { sub = 'korean'; enType = 'Korean restaurant' }
    else if (subCat.includes('인도') || subCat.includes('할랄') || subCat.includes('터키')) { sub = 'international'; enType = 'international restaurant' }
    return { category: 'dining', subcategory: sub, enType }
  }

  // 5. Spa / Wellness
  if (masterCat.includes('스파') || masterCat.includes('마사지') || subCat.includes('스파') || subCat.includes('마사지')) {
    return { category: 'wellness', subcategory: 'spa', enType: 'spa & massage center' }
  }

  // 6. Shopping / Mart
  if (masterCat.includes('쇼핑') || masterCat.includes('편의점') || subCat.includes('마트') || subCat.includes('슈퍼') || subCat.includes('기념품')) {
    return { category: 'shopping', subcategory: 'convenience_store', enType: 'convenience store & market' }
  }

  // 7. Activities & Attractions
  if (masterCat.includes('관광명소') || subCat.includes('랜드마크') || subCat.includes('케이블카') || subCat.includes('공연') || subCat.includes('포토존')) {
    return { category: 'activities', subcategory: 'attraction', enType: 'attraction & landmark' }
  }

  // 8. Essentials (Clinic, Pharmacy, Laundry, Currency Exchange)
  if (masterCat.includes('병원') || masterCat.includes('약국') || subCat.includes('병원') || subCat.includes('약국') || subCat.includes('클리닉')) {
    return { category: 'essentials', subcategory: 'clinic', enType: 'clinic & healthcare service' }
  }
  if (subCat.includes('환전')) return { category: 'essentials', subcategory: 'exchange', enType: 'currency exchange' }
  if (subCat.includes('세탁')) return { category: 'essentials', subcategory: 'laundry', enType: 'laundry service' }
  if (subCat.includes('렌트') || subCat.includes('투어')) return { category: 'essentials', subcategory: 'rental', enType: 'rental & travel service' }

  return { category: 'dining', subcategory: 'restaurant', enType: 'dining establishment' }
}

function cleanOsmSubcategory(cat, osmVal, name) {
  const n = (name || '').toLowerCase()
  if (osmVal === 'yes' || !osmVal) {
    if (cat === 'hotels') return 'hotel'
    if (cat === 'dining') return n.includes('cafe') || n.includes('coffee') ? 'cafe' : 'restaurant'
    if (cat === 'bars') return 'bar'
    if (cat === 'shopping') return 'shop'
    if (cat === 'wellness') return 'spa'
    if (cat === 'beach') return 'beach'
    if (cat === 'activities') return 'attraction'
    if (cat === 'essentials') return 'service'
    return 'general'
  }
  if (osmVal === 'guest_house') return 'guesthouse'
  if (osmVal === 'beach_resort') return 'resort'
  if (osmVal === 'coffee') return 'cafe'
  if (osmVal === 'bus_stop') return 'bus_station'
  return osmVal.toLowerCase().replace(/[^a-z0-9_]/g, '_')
}

function run() {
  console.log('🔄 푸꾸옥 업체 통합 v2 시드 SQL 생성 시작...')

  const seenSlugs = new Set()
  const records = []

  // 1. 선셋타운 마스터 DB (291곳)
  const rawMaster = JSON.parse(readFileSync('3_푸꾸옥_선셋타운_전체시설_마스터DB.json', 'utf8'))
  console.log(`📖 선셋타운 마스터 DB 로드: ${rawMaster.length}건`)

  for (const item of rawMaster) {
    const name = item.name_display || item.name_google || ''
    if (!name) continue

    let baseSlug = slugify(item.name_google || item.name_display)
    if (!baseSlug) baseSlug = 'sunset-place'
    let slug = baseSlug
    let counter = 1
    while (seenSlugs.has(slug)) {
      slug = `${baseSlug}-${counter++}`
    }
    seenSlugs.add(slug)

    const { category, subcategory, enType } = mapSubcategoryAndCategory(item)

    // Description EN: ONLY ENGLISH, NO KOREAN
    const zoneEn = item.zone && item.zone.includes('선셋타운') ? 'Sunset Town' : 'Southern Phu Quoc'
    const cleanEnName = (item.name_google || item.name_display).replace(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/g, '').trim()
    const descEn = `${cleanEnName || 'Popular spot'} is a premier ${enType} located in ${zoneEn}, Phu Quoc.`

    // Description KO: Clean KRW conversion
    const cleanFeatures = cleanKrwPricing(item.features || '')
    const cleanMenuPrice = cleanKrwPricing(item.menu_and_price || '')
    const descKoParts = []
    if (cleanFeatures) descKoParts.push(cleanFeatures)
    if (cleanMenuPrice) descKoParts.push(cleanMenuPrice)
    const descKo = descKoParts.join(' • ')

    // Place ID extraction
    let googlePlaceId = item.place_id || null
    if (!googlePlaceId && item.google_maps_url) {
      const match = item.google_maps_url.match(/place_id:([A-Za-z0-9_-]+)/) || item.google_maps_url.match(/place_id=([A-Za-z0-9_-]+)/)
      if (match) googlePlaceId = match[1]
    }

    records.push({
      public_name: name,
      slug,
      category,
      subcategory,
      google_place_id: googlePlaceId,
      description_en: descEn,
      description_ko: descKo || null,
      address: item.address || 'Sunset Town, Phu Quoc',
      google_maps_name: item.name_google || name,
      google_maps_url: item.google_maps_url || null,
      phone: item.phone || null,
      website_url: item.website || item.facebook || null,
      instagram_url: item.instagram || null,
      status: 'published',
      verification_status: 'ai_checked',
      verification_note: 'Master DB 수집 2026-10, 현장 미확인',
      lat: item.lat || null,
      lng: item.lng || null,
    })
  }

  // 2. 푸꾸옥 전역 Photon 후보 (262곳)
  const rawPhoton = JSON.parse(readFileSync('data/phuquoc-photon-candidates.json', 'utf8'))
  console.log(`📖 푸꾸옥 전역 후보 DB 로드: ${rawPhoton.length}건`)

  for (const item of rawPhoton) {
    const name = item.name
    if (!name) continue

    let baseSlug = slugify(name)
    if (!baseSlug) baseSlug = 'phuquoc-biz'
    let slug = baseSlug
    let counter = 1
    while (seenSlugs.has(slug)) {
      slug = `${baseSlug}-${counter++}`
    }
    seenSlugs.add(slug)

    let category = item.category || 'dining'
    // check if cafe
    if (item.osm_value === 'cafe' || item.osm_value === 'coffee' || name.toLowerCase().includes('cafe') || name.toLowerCase().includes('coffee')) {
      category = 'dining'
    }

    const subcategory = cleanOsmSubcategory(category, item.osm_value, name)
    const region = item.region || 'Phu Quoc'

    records.push({
      public_name: name,
      slug,
      category,
      subcategory,
      google_place_id: null,
      description_en: `${name} located in ${region}, Phu Quoc.`,
      description_ko: `푸꾸옥 ${region}에 위치한 ${name}입니다.`,
      address: [item.street, item.city].filter(Boolean).join(', ') || `${region}, Phu Quoc`,
      google_maps_name: name,
      google_maps_url: null,
      phone: null,
      website_url: null,
      instagram_url: null,
      status: 'review', // 비공개
      verification_status: 'ai_checked',
      verification_note: `Imported via OpenStreetMap Candidates (${region})`,
      lat: item.lat || null,
      lng: item.lng || null,
    })
  }

  console.log(`✨ 총 정제된 시설 수: ${records.length}곳`)

  // Verification checks
  let koreanInEnCount = 0
  const statusCounts = {}
  const verificationCounts = {}
  let sunsetCafeInDining = 0
  let sunsetPlaceIdCount = 0

  for (const r of records) {
    if (/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/.test(r.description_en)) {
      koreanInEnCount++
    }
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1
    verificationCounts[r.verification_status] = (verificationCounts[r.verification_status] || 0) + 1
    if (r.category === 'dining' && r.subcategory === 'cafe') sunsetCafeInDining++
    if (r.google_place_id) sunsetPlaceIdCount++
  }

  console.log('\n--- 데이터 검증 요약 ---')
  console.log(`- 전체 행 수: ${records.length}`)
  console.log(`- description_en에 한국어 포함 건수: ${koreanInEnCount}`)
  console.log(`- status별 건수:`, statusCounts)
  console.log(`- verification_status별 건수:`, verificationCounts)
  console.log(`- google_place_id 보유 건수: ${sunsetPlaceIdCount}`)
  console.log(`- dining/cafe 건수: ${sunsetCafeInDining}`)

  if (koreanInEnCount > 0) {
    throw new Error(`검증 실패: description_en에 한국어가 ${koreanInEnCount}건 남아있습니다!`)
  }

  // Generate SQL
  const sqlLines = [
    '--',
    '-- Supabase Seed: My Phu Quoc Master Businesses Directory (v2)',
    `-- Generated At: ${new Date().toISOString()}`,
    `-- Total Businesses: ${records.length} (Sunset Town: 291 published, Rest of Phu Quoc: 262 review)`,
    '--',
    'BEGIN;',
    '',
  ]

  for (const r of records) {
    const sql = `INSERT INTO public.businesses (
  public_name, slug, category, subcategory, google_place_id, description_en, description_ko,
  address, google_maps_name, google_maps_url, phone, website_url, instagram_url,
  status, verification_status, verification_note, published_at
) VALUES (
  ${escapeSql(r.public_name)},
  ${escapeSql(r.slug)},
  ${escapeSql(r.category)},
  ${escapeSql(r.subcategory)},
  ${escapeSql(r.google_place_id)},
  ${escapeSql(r.description_en)},
  ${escapeSql(r.description_ko)},
  ${escapeSql(r.address)},
  ${escapeSql(r.google_maps_name)},
  ${escapeSql(r.google_maps_url)},
  ${escapeSql(r.phone)},
  ${escapeSql(r.website_url)},
  ${escapeSql(r.instagram_url)},
  ${escapeSql(r.status)},
  ${escapeSql(r.verification_status)},
  ${escapeSql(r.verification_note)},
  NOW()
) ON CONFLICT (slug) DO UPDATE SET
  public_name = EXCLUDED.public_name,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  google_place_id = EXCLUDED.google_place_id,
  description_en = EXCLUDED.description_en,
  description_ko = EXCLUDED.description_ko,
  address = EXCLUDED.address,
  google_maps_name = EXCLUDED.google_maps_name,
  google_maps_url = EXCLUDED.google_maps_url,
  phone = EXCLUDED.phone,
  website_url = EXCLUDED.website_url,
  instagram_url = EXCLUDED.instagram_url,
  status = EXCLUDED.status,
  verification_status = EXCLUDED.verification_status,
  verification_note = EXCLUDED.verification_note,
  updated_at = NOW();`
    sqlLines.push(sql)
  }

  sqlLines.push('')
  sqlLines.push('COMMIT;')
  sqlLines.push('')

  writeFileSync('supabase/seed_phuquoc_businesses_v2.sql', sqlLines.join('\n'), 'utf8')
  console.log('💾 파일 생성 완료: supabase/seed_phuquoc_businesses_v2.sql')
}

run()
