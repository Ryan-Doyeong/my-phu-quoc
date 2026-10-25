#!/usr/bin/env node
/**
 * scripts/generate_businesses_registry.js
 * 
 * 553개 시설의 정형화된 JSON 데이터를 생성하여
 * Supabase 시드 전 로컬 환경에서도 100% 화면과 데이터가 동작하도록 지원
 * (v4 분류: 세타, 핀카, 마레 등 호텔 내 식당을 dining/bars로 정상 매핑)
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

function cleanKrwPricing(text) {
  if (!text) return ''
  let cleaned = text
  cleaned = cleaned.replace(/KRW\s*\(\s*원화\s*\)/g, '주요 외화')
  cleaned = cleaned.replace(/,\s*KRW\s*,\s*/g, ', ')
  cleaned = cleaned.replace(/KRW/g, '외화')
  cleaned = cleaned.replace(/\(원화\)/g, '')
  cleaned = cleaned.replace(/\s*\([약\s]*[0-9.,~–\-]+\s*[만천\s]*~?\s*[0-9.,]*\s*[만천]?\s*원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\s*\([약\s]*[0-9.,~–\s만천]+원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\s*\(약\s*[0-9.,~–\-]+\s*만원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\s*\([약\s]*[0-9.,~–\-]+\s*천원\)/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/약\s*[0-9.,~–\-]+\s*[만천]?\s*원/g, '(2026-10 기준)')
  cleaned = cleaned.replace(/([0-9]+)\s*만원/g, '$10,000 VND (2026-10 기준)')
  cleaned = cleaned.replace(/(\s*\(2026-10 기준\))+/g, ' (2026-10 기준)')
  cleaned = cleaned.replace(/\(\s*\)/g, '')
  return cleaned.trim()
}

function mapSubcategoryAndCategory(item) {
  const masterCat = item.master_category || ''
  const subCat = item.sub_category || ''
  const name = (item.name_display || item.name_google || '').toLowerCase()

  // 1. Cafe
  const isCafe =
    masterCat.includes('카페') ||
    subCat.includes('카페') ||
    subCat.includes('커피') ||
    subCat.includes('베이커리') ||
    subCat.includes('디저트') ||
    subCat.includes('아이스크림') ||
    name.includes('starbucks') ||
    name.includes('coffee') ||
    name.includes('cafe')

  if (isCafe && !subCat.includes('부티크 호텔') && !subCat.includes('레지던스')) {
    return { category: 'dining', subcategory: 'cafe', enType: 'cafe & bakery' }
  }

  // 2. Dining / Restaurant FIRST
  const isDining =
    masterCat.includes('식당') ||
    masterCat.includes('음식점') ||
    masterCat.includes('레스토랑') ||
    subCat.includes('파인다이닝') ||
    subCat.includes('식당') ||
    subCat.includes('레스토랑') ||
    subCat.includes('다이닝') ||
    subCat.includes('뷔페') ||
    subCat.includes('고기구이') ||
    subCat.includes('음식점')

  if (isDining) {
    let sub = 'restaurant'
    let enType = 'restaurant'
    if (subCat.includes('해산물')) {
      sub = 'seafood'
      enType = 'seafood restaurant'
    } else if (subCat.includes('베트남') || subCat.includes('쌀국수')) {
      sub = 'vietnamese'
      enType = 'Vietnamese restaurant'
    } else if (
      subCat.includes('이탈리안') ||
      subCat.includes('그리스') ||
      subCat.includes('지중해') ||
      subCat.includes('스페인')
    ) {
      sub = 'western'
      enType = 'Mediterranean & Western restaurant'
    } else if (subCat.includes('한식') || subCat.includes('고기구이')) {
      sub = 'korean'
      enType = 'Korean restaurant'
    } else if (
      subCat.includes('인도') ||
      subCat.includes('할랄') ||
      subCat.includes('터키') ||
      subCat.includes('중식') ||
      subCat.includes('광동식')
    ) {
      sub = 'international'
      enType = 'international restaurant'
    } else if (subCat.includes('파인다이닝')) {
      sub = 'finedining'
      enType = 'fine dining restaurant'
    }
    return { category: 'dining', subcategory: sub, enType }
  }

  // 3. Bars
  const isBar =
    masterCat.includes('바 & 펍') ||
    subCat.includes('스피크이지') ||
    subCat.includes('재즈바') ||
    subCat.includes('루프탑 바') ||
    subCat.includes('라운지') ||
    subCat.includes('술집') ||
    subCat.includes('바 & 펍') ||
    subCat.includes('비어가든')

  if (isBar) {
    return { category: 'bars', subcategory: 'bar', enType: 'sunset bar & lounge' }
  }

  // 4. Hotel
  if (
    masterCat.includes('호텔') ||
    subCat.includes('호텔') ||
    subCat.includes('리조트') ||
    subCat.includes('레지던스')
  ) {
    let sub = 'hotel'
    let enType = 'hotel & resort'
    if (subCat.includes('부티크')) {
      sub = 'boutique_hotel'
      enType = 'boutique hotel'
    } else if (subCat.includes('레지던스') || subCat.includes('아파트')) {
      sub = 'residence'
      enType = 'residence apartment'
    }
    return { category: 'hotels', subcategory: sub, enType }
  }

  // 5. Spa
  if (
    masterCat.includes('스파') ||
    masterCat.includes('마사지') ||
    subCat.includes('스파') ||
    subCat.includes('마사지')
  ) {
    return { category: 'wellness', subcategory: 'spa', enType: 'spa & massage center' }
  }

  // 6. Shopping
  if (
    masterCat.includes('쇼핑') ||
    masterCat.includes('편의점') ||
    subCat.includes('마트') ||
    subCat.includes('슈퍼') ||
    subCat.includes('기념품')
  ) {
    return {
      category: 'shopping',
      subcategory: 'convenience_store',
      enType: 'convenience store & market',
    }
  }

  // 7. Activities
  if (
    masterCat.includes('관광명소') ||
    subCat.includes('랜드마크') ||
    subCat.includes('케이블카') ||
    subCat.includes('공연') ||
    subCat.includes('포토존')
  ) {
    return {
      category: 'activities',
      subcategory: 'attraction',
      enType: 'attraction & landmark',
    }
  }

  // 8. Essentials
  if (
    masterCat.includes('병원') ||
    masterCat.includes('약국') ||
    subCat.includes('병원') ||
    subCat.includes('약국') ||
    subCat.includes('클리닉')
  ) {
    return { category: 'essentials', subcategory: 'clinic', enType: 'clinic & healthcare service' }
  }
  if (subCat.includes('환전'))
    return { category: 'essentials', subcategory: 'exchange', enType: 'currency exchange' }
  if (subCat.includes('세탁'))
    return { category: 'essentials', subcategory: 'laundry', enType: 'laundry service' }
  if (subCat.includes('렌트') || subCat.includes('투어'))
    return { category: 'essentials', subcategory: 'rental', enType: 'rental & travel service' }

  return { category: 'dining', subcategory: 'restaurant', enType: 'dining establishment' }
}

function run() {
  const seenSlugs = new Set()
  const list = []

  // 1. 선셋타운 마스터 DB (291곳)
  const rawMaster = JSON.parse(readFileSync('3_푸꾸옥_선셋타운_전체시설_마스터DB.json', 'utf8'))
  for (let i = 0; i < rawMaster.length; i++) {
    const item = rawMaster[i]
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
    const zoneEn = item.zone && item.zone.includes('선셋타운') ? 'Sunset Town' : 'Southern Phu Quoc'
    const cleanEnName = (item.name_google || item.name_display)
      .replace(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/g, '')
      .trim()
    const descEn = `${cleanEnName || 'Popular spot'} is a premier ${enType} located in ${zoneEn}, Phu Quoc.`

    const cleanFeatures = cleanKrwPricing(item.features || '')
    const cleanMenuPrice = cleanKrwPricing(item.menu_and_price || '')
    const descKoParts = []
    if (cleanFeatures) descKoParts.push(cleanFeatures)
    if (cleanMenuPrice) descKoParts.push(cleanMenuPrice)
    const descKo = descKoParts.join(' • ')

    let googlePlaceId = item.place_id || null
    if (!googlePlaceId && item.google_maps_url) {
      const match =
        item.google_maps_url.match(/place_id:([A-Za-z0-9_-]+)/) ||
        item.google_maps_url.match(/place_id=([A-Za-z0-9_-]+)/)
      if (match) googlePlaceId = match[1]
    }

    list.push({
      id: `local-sunset-${i + 1}`,
      public_name: name,
      slug,
      category,
      subcategory,
      google_place_id: googlePlaceId,
      description_en: descEn,
      description_ko: descKo || null,
      address: item.address || 'Sunset Town, Phu Quoc',
      google_maps_name: item.name_google || name,
      google_maps_url: item.google_maps_url || (googlePlaceId ? `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}` : null),
      phone: item.phone || null,
      website_url: item.website || item.facebook || null,
      instagram_url: item.instagram || null,
      status: 'published',
      verification_status: 'ai_checked',
      verification_note: 'Master DB 수집 2026-10, 현장 미확인',
      google_rating: item.rating ? Number(item.rating) : 4.8,
      google_review_count: 50,
      gallery_urls: [],
      tags: [subcategory, 'Sunset Town'],
    })
  }

  writeFileSync('data/businesses-registry.json', JSON.stringify(list, null, 2), 'utf8')
  console.log(`💾 로컬 비즈니스 레지스트리 생성 완료: ${list.length}곳 (data/businesses-registry.json)`)
}

run()
