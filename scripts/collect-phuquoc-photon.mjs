#!/usr/bin/env node
/**
 * scripts/collect-phuquoc-photon.mjs
 * Photon API (OpenStreetMap 기반 고속 검색 엔진)를 활용하여
 * 푸꾸옥 전역(호텔, 맛집, 카페, 스파, 비치클럽, 관광지 등)의 업체 리스트를 수집합니다.
 */

import { writeFileSync, mkdirSync } from 'node:fs'

const SEARCH_QUERIES = [
  { q: 'Phu Quoc Restaurant', category: 'dining' },
  { q: 'Phu Quoc Seafood', category: 'dining' },
  { q: 'Phu Quoc Cafe', category: 'bars' },
  { q: 'Phu Quoc Bar', category: 'bars' },
  { q: 'Phu Quoc Resort', category: 'hotels' },
  { q: 'Phu Quoc Hotel', category: 'hotels' },
  { q: 'Phu Quoc Spa', category: 'wellness' },
  { q: 'Phu Quoc Massage', category: 'wellness' },
  { q: 'Phu Quoc Tour Attraction', category: 'activities' },
  { q: 'Phu Quoc Beach', category: 'beach' },
  { q: 'Phu Quoc Supermarket', category: 'shopping' },
  { q: 'Phu Quoc Pharmacy', category: 'essentials' },
  // 지역별 쿼리
  { q: 'Duong Dong Restaurant', category: 'dining' },
  { q: 'Duong Dong Hotel', category: 'hotels' },
  { q: 'Duong Dong Cafe', category: 'bars' },
  { q: 'An Thoi Restaurant', category: 'dining' },
  { q: 'An Thoi Hotel', category: 'hotels' },
  { q: 'Grand World Phu Quoc', category: 'activities' },
  { q: 'Sunset Town Phu Quoc', category: 'activities' },
]

function detectRegion(lat, lng) {
  if (lat <= 10.06) return 'South (Sunset Town / An Thoi)'
  if (lat > 10.06 && lat <= 10.16) return 'South-Central (Bai Truong / Sonasea)'
  if (lat > 10.16 && lat <= 10.28) return 'Central (Duong Dong / Ong Lang)'
  return 'North (Grand World / Cua Can / Ganh Dau)'
}

async function searchPhoton(query, limit = 50) {
  // 푸꾸옥 중심 좌표: lat 10.2, lon 103.95
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lat=10.22&lon=103.96&limit=${limit}`
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'PhuQuocDirectoryCollector/1.0' } })
    if (!res.ok) return []
    const json = await res.json()
    return json.features || []
  } catch (e) {
    console.error(`Error searching ${query}:`, e.message)
    return []
  }
}

async function run() {
  mkdirSync('data', { recursive: true })
  console.log('🚀 Photon 기반 푸꾸옥 전역 시설 정보 수집 시작...')

  const seen = new Set()
  const records = []

  for (const item of SEARCH_QUERIES) {
    console.log(`🔍 검색 중: "${item.q}" (${item.category})...`)
    const features = await searchPhoton(item.q, 50)
    let addedCount = 0

    for (const f of features) {
      const p = f.properties || {}
      const coords = f.geometry?.coordinates || []
      const lng = coords[0]
      const lat = coords[1]

      // 푸꾸옥 경위도 바운딩 체크 (lat 9.9 ~ 10.5, lng 103.7 ~ 104.2)
      if (!lat || !lng || lat < 9.9 || lat > 10.5 || lng < 103.7 || lng > 104.2) continue

      const name = p.name
      if (!name) continue

      const key = `${name.toLowerCase().trim()}`
      if (seen.has(key)) continue
      seen.add(key)

      const region = detectRegion(lat, lng)
      const street = p.street ? `${p.housenumber || ''} ${p.street}`.trim() : ''
      const city = p.city || p.district || 'Phú Quốc'

      records.push({
        name,
        category: item.category,
        region,
        osm_id: p.osm_id,
        osm_value: p.osm_value,
        street,
        city,
        country: p.country || 'Vietnam',
        lat,
        lng,
      })
      addedCount++
    }
    console.log(`  -> 유효 신규 시설: ${addedCount}개 추가`)
    await new Promise((r) => setTimeout(r, 600)) // Rate-limit 방지 딜레이
  }

  // 통계 집계
  const statsByCat = {}
  const statsByRegion = {}
  for (const r of records) {
    statsByCat[r.category] = (statsByCat[r.category] || 0) + 1
    statsByRegion[r.region] = (statsByRegion[r.region] || 0) + 1
  }

  // JSON 저장
  writeFileSync('data/phuquoc-photon-candidates.json', JSON.stringify(records, null, 2), 'utf-8')

  // CSV 저장
  const csvHeaders = ['name', 'category', 'region', 'street', 'city', 'lat', 'lng', 'osm_id']
  const csvRows = records.map((r) =>
    csvHeaders.map((h) => `"${String(r[h] || '').replace(/"/g, '""')}"`).join(',')
  )
  writeFileSync('data/phuquoc-photon-candidates.csv', [csvHeaders.join(','), ...csvRows].join('\n'), 'utf-8')

  // 리포트 생성
  const report = `# 🏝️ 푸꾸옥 전역 시설 정보 수집 현황 리포트

> 수집 일시: ${new Date().toISOString()}  
> 총 신규 수집 시설 수: **${records.length}개**

## 1. 지역별 분포
${Object.entries(statsByRegion)
  .map(([reg, count]) => `- **${reg}**: ${count}곳`)
  .join('\n')}

## 2. 카테고리별 분포
${Object.entries(statsByCat)
  .map(([cat, count]) => `- **${cat}**: ${count}곳`)
  .join('\n')}

## 3. 요약 및 활용
- 기존 선셋타운 위주 291개 시설 외에, **즈엉동(중부 시내/야시장)** 및 **바이쯔엉/소나시(중남부)**, **북부(그랜드월드)**의 핵심 업체 후보들이 대거 확보되었습니다.
- 본 데이터를 바탕으로 채팅방 추천 리스트 및 제휴 업체들을 매핑하여 디렉토리를 완성해 나갑니다.
`
  writeFileSync('data/phuquoc-photon-report.md', report, 'utf-8')

  console.log(`\n🎉 수집 완료! 총 ${records.length}개 푸꾸옥 시설 DB 구축 완료`)
  console.log('📊 지역별 현황:', statsByRegion)
  console.log('📊 카테고리별 현황:', statsByCat)
}

run().catch(console.error)
