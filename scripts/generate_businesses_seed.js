#!/usr/bin/env node
/**
 * scripts/generate_businesses_seed.js
 * 
 * 1) 3_푸꾸옥_선셋타운_전체시설_마스터DB.json (선셋타운 및 안터이 291곳)
 * 2) data/phuquoc-photon-candidates.json (푸꾸옥 전역 262곳)
 * 
 * 두 소스를 병합 및 정제하여 Supabase public.businesses 테이블에 즉시 삽입 가능한
 * SQL 시드 스크립트 (supabase/seed_phuquoc_businesses.sql)를 생성합니다.
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
  if (!str) return 'NULL'
  return `'${String(str).replace(/'/g, "''")}'`
}

function mapMasterCategory(masterCat) {
  if (!masterCat) return 'dining'
  if (masterCat.includes('호텔')) return 'hotels'
  if (masterCat.includes('식당')) return 'dining'
  if (masterCat.includes('카페') || masterCat.includes('바 & 펍')) return 'bars'
  if (masterCat.includes('편의점') || masterCat.includes('쇼핑')) return 'shopping'
  if (masterCat.includes('스파') || masterCat.includes('마사지')) return 'wellness'
  if (masterCat.includes('관광명소')) return 'activities'
  if (masterCat.includes('병원') || masterCat.includes('약국')) return 'essentials'
  return 'dining'
}

function run() {
  console.log('🔄 푸꾸옥 업체 통합 시드 SQL 생성 시작...')

  const seenSlugs = new Set()
  const records = []

  // 1. 선셋타운 마스터 DB (291곳)
  try {
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

      const category = mapMasterCategory(item.master_category)
      const descKo = `${item.features || ''} ${item.menu_and_price ? '• ' + item.menu_and_price : ''}`.trim()
      const descEn = `${item.sub_category || ''} in Sunset Town Phu Quoc.`

      records.push({
        public_name: name,
        slug,
        category,
        subcategory: item.sub_category || null,
        description_en: descEn,
        description_ko: descKo || null,
        address: item.address || 'Sunset Town, Phu Quoc',
        google_maps_name: item.name_google || name,
        google_maps_url: item.google_maps_url || null,
        phone: item.phone || null,
        website_url: item.website || item.facebook || null,
        instagram_url: item.instagram || null,
        status: 'published',
        verification_status: 'verified',
        verification_note: 'Sun Group Sunset Town Master DB 2026-10 Verified',
        lat: item.lat || null,
        lng: item.lng || null,
      })
    }
  } catch (e) {
    console.warn('⚠️ 마스터 DB 로드 실패:', e.message)
  }

  // 2. 푸꾸옥 전역 Photon 데이터 (262곳)
  try {
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

      records.push({
        public_name: name,
        slug,
        category: item.category || 'dining',
        subcategory: item.osm_value || null,
        description_en: `${name} located in ${item.region}, Phu Quoc.`,
        description_ko: `푸꾸옥 ${item.region}에 위치한 ${name}입니다.`,
        address: [item.street, item.city].filter(Boolean).join(', ') || `${item.region}, Phu Quoc`,
        google_maps_name: name,
        google_maps_url: null,
        phone: null,
        website_url: null,
        instagram_url: null,
        status: 'published',
        verification_status: 'ai_checked',
        verification_note: `Imported via OpenStreetMap Candidates (${item.region})`,
        lat: item.lat || null,
        lng: item.lng || null,
      })
    }
  } catch (e) {
    console.warn('⚠️ Photon 후보 DB 로드 실패:', e.message)
  }

  console.log(`✨ 총 정제된 시설 수: ${records.length}곳`)

  // SQL 생성
  const sqlLines = [
    '--',
    '-- Supabase Seed: My Phu Quoc Master Businesses Directory',
    `-- Generated At: ${new Date().toISOString()}`,
    `-- Total Businesses: ${records.length}`,
    '--',
    'BEGIN;',
    '',
    '-- Clean existing directory if needed (or ON CONFLICT DO UPDATE)',
  ]

  for (const r of records) {
    const sql = `INSERT INTO public.businesses (
  public_name, slug, category, subcategory, description_en, description_ko,
  address, google_maps_name, google_maps_url, phone, website_url, instagram_url,
  status, verification_status, verification_note, published_at
) VALUES (
  ${escapeSql(r.public_name)},
  ${escapeSql(r.slug)},
  ${escapeSql(r.category)},
  ${escapeSql(r.subcategory)},
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
  updated_at = NOW();`
    sqlLines.push(sql)
  }

  sqlLines.push('')
  sqlLines.push('COMMIT;')
  sqlLines.push('')

  writeFileSync('supabase/seed_phuquoc_businesses.sql', sqlLines.join('\n'), 'utf8')
  console.log('💾 파일 생성 완료: supabase/seed_phuquoc_businesses.sql')
}

run()
