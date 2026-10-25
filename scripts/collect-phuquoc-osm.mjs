#!/usr/bin/env node
/**
 * scripts/collect-phuquoc-osm.mjs
 * OpenStreetMap(Overpass API)를 활용하여 푸꾸옥 전역(선셋타운/안터이, 즈엉동, 바이쯔엉, 북부 빈펄 등)의
 * 식당, 카페, 호텔, 스파, 액티비티 시설 후보 목록을 자동 수집합니다.
 * 
 * 실행: node scripts/collect-phuquoc-osm.mjs
 * 결과: data/phuquoc-osm-candidates.json, data/phuquoc-osm-candidates.csv, data/phuquoc-osm-report.md
 */

import { writeFileSync, mkdirSync } from 'node:fs'

// 푸꾸옥 섬 전체 바운딩 박스 (남위, 서경, 북위, 동경)
// 대략: 9.95 ~ 10.45 N, 103.80 ~ 104.10 E
const BBOX = process.env.BBOX || '9.95,103.80,104.45,104.10'
const ENDPOINTS = [
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

const RULES = [
  // Dining
  ['dining', 'amenity', 'restaurant'],
  ['dining', 'amenity', 'fast_food'],
  ['dining', 'amenity', 'food_court'],
  // Bars & Cafes
  ['bars', 'amenity', 'cafe'],
  ['bars', 'amenity', 'bar'],
  ['bars', 'amenity', 'pub'],
  // Hotels
  ['hotels', 'tourism', 'hotel'],
  ['hotels', 'tourism', 'resort'],
  ['hotels', 'tourism', 'guest_house'],
  ['hotels', 'tourism', 'hostel'],
  ['hotels', 'tourism', 'motel'],
  // Shopping
  ['shopping', 'shop', 'supermarket'],
  ['shopping', 'shop', 'convenience'],
  ['shopping', 'shop', 'gift'],
  // Activities & Attractions
  ['activities', 'tourism', 'theme_park'],
  ['activities', 'tourism', 'attraction'],
  ['activities', 'tourism', 'viewpoint'],
  ['activities', 'leisure', 'water_park'],
  // Wellness / Spa
  ['wellness', 'amenity', 'spa'],
  ['wellness', 'shop', 'massage'],
  ['wellness', 'leisure', 'sauna'],
  // Essentials
  ['essentials', 'amenity', 'pharmacy'],
  ['essentials', 'amenity', 'hospital'],
  ['essentials', 'amenity', 'clinic'],
  ['essentials', 'amenity', 'bank'],
  ['essentials', 'amenity', 'bureau_de_change'],
]

const query = `[out:json][timeout:120];(${RULES.map(
  ([, k, v]) => `nwr["${k}"="${v}"]["name"](${BBOX});`
).join('')});out center tags;`

async function fetchFromOverpass() {
  for (const ep of ENDPOINTS) {
    try {
      console.log(`🌐 Overpass API 요청 중: ${ep}...`)
      const res = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
      })
      if (res.ok) {
        return await res.json()
      }
      console.warn(`⚠️ ${ep} 응답 실패: ${res.status}`)
    } catch (e) {
      console.warn(`⚠️ ${ep} 접속 실패:`, e.message)
    }
  }
  throw new Error('모든 Overpass 엔드포인트 응답 실패')
}

function detectRegion(lat, lng) {
  // 푸꾸옥 대략 지역 구분
  if (lat <= 10.06) return 'South (Sunset Town / An Thoi)'
  if (lat > 10.06 && lat <= 10.16) return 'South-Central (Bai Truong / Sonasea)'
  if (lat > 10.16 && lat <= 10.28) return 'Central (Duong Dong / Ong Lang)'
  return 'North (Grand World / Cua Can / Ganh Dau)'
}

function mapCategory(tags) {
  if (tags.amenity === 'restaurant' || tags.amenity === 'fast_food' || tags.amenity === 'food_court') return 'dining'
  if (tags.amenity === 'bar' || tags.amenity === 'pub' || tags.amenity === 'cafe') return 'bars'
  if (tags.tourism === 'hotel' || tags.tourism === 'resort' || tags.tourism === 'guest_house' || tags.tourism === 'hostel') return 'hotels'
  if (tags.shop === 'supermarket' || tags.shop === 'convenience' || tags.shop === 'gift') return 'shopping'
  if (tags.tourism === 'attraction' || tags.tourism === 'theme_park' || tags.tourism === 'viewpoint' || tags.leisure === 'water_park') return 'activities'
  if (tags.amenity === 'spa' || tags.shop === 'massage' || tags.leisure === 'sauna') return 'wellness'
  return 'essentials'
}

async function run() {
  mkdirSync('data', { recursive: true })
  console.log('🚀 푸꾸옥 전역 시설 정보 수집 시작...')
  
  const raw = await fetchFromOverpass()
  const elements = raw.elements || []
  console.log(`✅ 수집된 원시 데이터: ${elements.length}건`)

  const records = []
  const seen = new Set()

  for (const el of elements) {
    const tags = el.tags || {}
    const name = tags['name:en'] || tags.name || tags['name:vi']
    if (!name) continue

    const lat = el.lat || el.center?.lat
    const lng = el.lon || el.center?.lon
    if (!lat || !lng) continue

    const key = `${name.toLowerCase()}_${lat.toFixed(3)}_${lng.toFixed(3)}`
    if (seen.has(key)) continue
    seen.add(key)

    const category = mapCategory(tags)
    const region = detectRegion(lat, lng)

    records.push({
      osm_id: el.id,
      name,
      name_vi: tags['name:vi'] || '',
      name_en: tags['name:en'] || '',
      category,
      region,
      cuisine: tags.cuisine || '',
      phone: tags.phone || tags['contact:phone'] || '',
      website: tags.website || tags['contact:website'] || '',
      opening_hours: tags.opening_hours || '',
      lat,
      lng,
      address: tags['addr:street'] ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}`.trim() : '',
    })
  }

  // 통계 집계
  const statsByCat = {}
  const statsByRegion = {}
  for (const r of records) {
    statsByCat[r.category] = (statsByCat[r.category] || 0) + 1
    statsByRegion[r.region] = (statsByRegion[r.region] || 0) + 1
  }

  // 파일 저장
  writeFileSync('data/phuquoc-osm-candidates.json', JSON.stringify(records, null, 2), 'utf-8')

  // CSV 헤더 및 데이터 생성
  const csvHeaders = ['osm_id', 'name', 'name_vi', 'name_en', 'category', 'region', 'cuisine', 'phone', 'website', 'opening_hours', 'lat', 'lng', 'address']
  const csvRows = records.map(r => 
    csvHeaders.map(h => `"${String(r[h] || '').replace(/"/g, '""')}"`).join(',')
  )
  writeFileSync('data/phuquoc-osm-candidates.csv', [csvHeaders.join(','), ...csvRows].join('\n'), 'utf-8')

  // 리포트 마크다운 저장
  const report = `# 🏝️ 푸꾸옥 전역 시설 정보 수집 현황 리포트 (OSM 기준)

> 수집 일시: ${new Date().toISOString()}  
> 총 수집 업체/시설: **${records.length}개**

## 1. 지역별 분포
${Object.entries(statsByRegion).map(([reg, count]) => `- **${reg}**: ${count}곳`).join('\n')}

## 2. 카테고리별 분포
${Object.entries(statsByCat).map(([cat, count]) => `- **${cat}**: ${count}곳`).join('\n')}

## 3. 활용 가이드
- 선셋타운 외의 **즈엉동(야시장/시내), 바이쯔엉(소나시), 북부(그랜드월드)** 지역 업체 리스트 보강용 후보 DB로 활용됩니다.
- 구글 플레이스 API 및 채팅방 공유 정보와 매핑하여 마스터 DB에 최종 수록합니다.
`
  writeFileSync('data/phuquoc-osm-report.md', report, 'utf-8')

  console.log(`\n🎉 수집 및 저장 완료! 총 ${records.length}개 시설 확보`)
  console.log('📊 지역별 현황:', statsByRegion)
  console.log('📂 저장 파일: data/phuquoc-osm-candidates.json, data/phuquoc-osm-candidates.csv, data/phuquoc-osm-report.md')
}

run().catch(console.error)
