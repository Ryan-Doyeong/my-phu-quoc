#!/usr/bin/env node
/**
 * scripts/validate-gmaps-links.mjs
 *
 * Zero-API 정적 무결성 검증 스크립트 (Google Maps URL / Place ID / 좌표 / SSOT 정합성)
 * - 외부 단축 URL(maps.app.goo.gl, goo.gl/maps) 0건 검증
 * - 가짜/손상된 Place ID(ChIJ_..., 스네이크케이스, 길이 미달, URL 혼입 등) 0건 검증
 * - 푸꾸옥 바운딩 박스(lat: 9.90~10.45, lng: 103.84~104.12) 이탈 0건 검증
 * - 빈 지도로 리다이렉트되는 수제 `/maps/place/<Name>/@lat,lng` URL 0건 검증
 * - 공개 항목의 단순 좌표 검색 URL(`?api=1&query=lat,lng` 단독) 0건 검증
 * - SSOT 교차 정합성 검증:
 *   1) `lib/banking.ts` ↔ `data/businesses-registry.json`
 *   2) `data/sunset_town_hotels.json` + `data/khem_beach_hotels.json` ↔ `data/hotel_insights.json`
 *   3) `data/zone-assignments.json` ↔ `data/businesses-registry.json` + `data/khem-beach-businesses.json`
 */

import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'

const ROOT = process.cwd()
const requireFromRoot = createRequire(path.join(ROOT, 'package.json'))

const PHU_QUOC_BOUNDS = {
  minLat: 9.9,
  maxLat: 10.45,
  minLng: 103.84,
  maxLng: 104.12,
}

const SHORTLINK_RE = /https?:\/\/(?:maps\.app\.goo\.gl|goo\.gl\/maps)\b/i
const RAW_COORD_QUERY_RE = /[?&]query=\s*-?\d+\.\d+\s*(?:,|%2C)\s*-?\d+\.\d+\s*(?:&|$)/i
const PLUS_CODE_IN_QUERY_RE = /\b[2-9CFGHJMPQRVWX]{4,8}(?:\+|%2B)[2-9CFGHJMPQRVWX]{2,3}\b/i

function loadTsModule(relPath) {
  const absPath = path.join(ROOT, relPath)
  if (absPath.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(absPath, 'utf8'))
  }
  const source = fs.readFileSync(absPath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    fileName: absPath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  })

  const mod = { exports: {} }
  const sandbox = {
    module: mod,
    exports: mod.exports,
    require: (id) => {
      if (id.startsWith('@/')) {
        const sub = id.slice(2)
        if (sub.endsWith('.json') || fs.existsSync(path.join(ROOT, `${sub}.json`))) {
          return loadTsModule(sub.endsWith('.json') ? sub : `${sub}.json`)
        }
        return loadTsModule(sub.endsWith('.ts') ? sub : `${sub}.ts`)
      }
      return requireFromRoot(id)
    },
    process,
    console,
    URL,
    URLSearchParams,
  }
  vm.runInNewContext(transpiled.outputText, sandbox, { filename: absPath })
  return mod.exports
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'))
}

const mapsLink = loadTsModule('lib/mapsLink.ts')
const { isValidGooglePlaceId, isConfirmedPlaceProfileUrl, buildGoogleMapsUrl } = mapsLink
const { isHiddenBusiness } = loadTsModule('lib/directory.ts')

const errors = []
const stats = {
  checkedPlaceIds: 0,
  checkedUrls: 0,
  checkedCoords: 0,
  scannedFilesForShortlinks: 0,
}

function addError(scope, message) {
  errors.push(`[${scope}] ${message}`)
}

function checkCoords(scope, lat, lng, { required = true } = {}) {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    if (required) {
      addError(scope, `좌표 누락 (lat=${lat}, lng=${lng})`)
    }
    return
  }
  if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) {
    addError(scope, `유효하지 않은 숫자 좌표 (lat=${lat}, lng=${lng})`)
    return
  }
  stats.checkedCoords++
  if (
    lat < PHU_QUOC_BOUNDS.minLat ||
    lat > PHU_QUOC_BOUNDS.maxLat ||
    lng < PHU_QUOC_BOUNDS.minLng ||
    lng > PHU_QUOC_BOUNDS.maxLng
  ) {
    addError(
      scope,
      `푸꾸옥 바운딩 박스 이탈 좌표 (${lat}, ${lng}) — 허용 범위 lat [${PHU_QUOC_BOUNDS.minLat}, ${PHU_QUOC_BOUNDS.maxLat}], lng [${PHU_QUOC_BOUNDS.minLng}, ${PHU_QUOC_BOUNDS.maxLng}]`
    )
  }
}

function checkPlaceId(scope, placeId, { required = false } = {}) {
  if (placeId === null || placeId === undefined || placeId === '') {
    if (required) {
      addError(scope, '필수 Google Place ID 누락')
    }
    return
  }
  stats.checkedPlaceIds++
  if (!isValidGooglePlaceId(placeId)) {
    addError(scope, `유효하지 않거나 가짜 의심되는 Google Place ID: "${placeId}"`)
  }
}

function extractUrlPlaceIds(url) {
  const ids = []
  const patterns = [
    /[?&]q=place_id:([^&#]+)/gi,
    /[?&]query_place_id=([^&#]+)/gi,
    /[?&]destination_place_id=([^&#]+)/gi,
  ]
  for (const re of patterns) {
    for (const m of url.matchAll(re)) {
      ids.push(decodeURIComponent(m[1]))
    }
  }
  return ids
}

function extractUrlCoords(url) {
  const pairs = []
  for (const m of url.matchAll(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/g)) {
    pairs.push([Number(m[1]), Number(m[2])])
  }
  for (const m of url.matchAll(/@(-?\d+\.\d+),(-?\d+\.\d+)/g)) {
    pairs.push([Number(m[1]), Number(m[2])])
  }
  for (const m of url.matchAll(/[?&](?:origin|destination)=(-?\d+\.\d+)(?:,|%2C)(-?\d+\.\d+)/gi)) {
    pairs.push([Number(m[1]), Number(m[2])])
  }
  return pairs
}

function checkGoogleMapsUrl(scope, url, { required = true, allowNonMapsUrl = false } = {}) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    if (required) {
      addError(scope, 'Google Maps URL 누락')
    }
    return
  }
  const trimmed = url.trim()
  stats.checkedUrls++

  if (SHORTLINK_RE.test(trimmed)) {
    addError(scope, `외부 단축 URL 사용 금지 위반: "${trimmed}"`)
    return
  }

  if (!trimmed.includes('google.com/maps')) {
    if (!allowNonMapsUrl) {
      addError(scope, `비표준 외부 URL(google.com/maps 아님): "${trimmed}"`)
    }
    return
  }

  const embeddedPlaceIds = extractUrlPlaceIds(trimmed)
  for (const pid of embeddedPlaceIds) {
    checkPlaceId(`${scope} (URL param)`, pid, { required: true })
  }

  // `/maps/place/` 경로이면서 `place_id` 파라미터가 없는 경우 반드시 확정 프로필 데이터 블록이 있어야 함
  if (trimmed.includes('/maps/place/') && embeddedPlaceIds.length === 0) {
    if (!isConfirmedPlaceProfileUrl(trimmed)) {
      addError(
        scope,
        `빈 지도(/maps/place//@...)로 리다이렉트되는 수제 /maps/place/ URL 감지: "${trimmed}"`
      )
    }
  }

  // `query_place_id` 없는 순수 좌표 검색 핀 차단
  if (RAW_COORD_QUERY_RE.test(trimmed) && !trimmed.includes('query_place_id=')) {
    addError(scope, `단순 좌표 핀 검색 URL 금지 위반 (상호명 검색 또는 query_place_id 사용 필수): "${trimmed}"`)
  }

  // 검색 쿼리 내 Plus Code 차단
  if (trimmed.includes('/maps/search/') && PLUS_CODE_IN_QUERY_RE.test(trimmed)) {
    addError(scope, `검색 URL 내 Plus Code 포함 금지 위반: "${trimmed}"`)
  }

  for (const [uLat, uLng] of extractUrlCoords(trimmed)) {
    checkCoords(`${scope} (URL coords)`, uLat, uLng, { required: true })
  }
}

// 0. lib/mapsLink.ts 자체 유닛 회귀 검증 (Self-Test)
function runMapsLinkSelfTests() {
  const scope = 'self-test:lib/mapsLink.ts'
  const validSamples = [
    'ChIJLZPWxLiWpzERwrkgfIa1P8I',
    'ChIJ_UwInh-XpzERL3bKuuPz_sw',
    'GhIJfX9d3F9XJEARK9P62d2gWkA',
  ]
  for (const s of validSamples) {
    if (!isValidGooglePlaceId(s)) {
      addError(scope, `정상 Place ID가 거부됨: ${s}`)
    }
  }

  const fakeSamples = [
    'ChIJ_triland_hillside_phu_quoc',
    'ChIJ_coastal_living_phuquoc',
    'mimi_fruits_sunset_town',
    'ChIJ12345678901234567890123',
    'https://www.google.com/maps/place/?q=place_id:ChIJLZPWxLiWpzERwrkgfIa1P8I',
    '미확인',
  ]
  for (const s of fakeSamples) {
    if (isValidGooglePlaceId(s)) {
      addError(scope, `가짜/비정상 Place ID가 통과됨: ${s}`)
    }
  }

  // 수제 /maps/place/<Name>/@lat,lng,18z URL이 buildGoogleMapsUrl 2순위를 우회하지 않고 검색 URL로 안전 폴백되는지 검증
  const handcraftedFallback = buildGoogleMapsUrl({
    public_name: 'Test Venue',
    address: 'Sunset Town, Phú Quốc',
    google_place_id: null,
    google_maps_url: 'https://www.google.com/maps/place/Test+Venue/@10.032,104.005,18z',
    lat: 10.032,
    lng: 104.005,
  })
  if (!handcraftedFallback || !handcraftedFallback.startsWith('https://www.google.com/maps/search/?api=1&query=')) {
    addError(scope, `수제 /maps/place/@lat,lng URL이 검색 폴백으로 전환되지 않음: ${handcraftedFallback}`)
  }
}

// 1. 전역 코드/데이터 파일 내 단축 URL(maps.app.goo.gl / goo.gl/maps) 전수 스캔
function scanWorkspaceForShortlinks() {
  const targetDirs = ['app', 'components', 'lib', 'data']
  function walk(dir) {
    const absDir = path.join(ROOT, dir)
    if (!fs.existsSync(absDir)) return
    for (const ent of fs.readdirSync(absDir, { withFileTypes: true })) {
      if (ent.name === 'node_modules' || ent.name === '.next' || ent.name === '.git') continue
      const rel = path.join(dir, ent.name)
      if (ent.isDirectory()) {
        walk(rel)
      } else if (/\.(?:json|ts|tsx|js|mjs|cjs)$/.test(ent.name)) {
        stats.scannedFilesForShortlinks++
        const content = fs.readFileSync(path.join(ROOT, rel), 'utf8')
        const lines = content.split('\n')
        lines.forEach((line, idx) => {
          if (SHORTLINK_RE.test(line)) {
            addError(`${rel}:${idx + 1}`, `외부 단축 URL 감지: ${line.trim().slice(0, 140)}`)
          }
        })
      }
    }
  }
  for (const d of targetDirs) walk(d)
}

runMapsLinkSelfTests()
scanWorkspaceForShortlinks()

// 2. data/businesses-registry.json 검증
const businessesRegistry = readJson('data/businesses-registry.json')
const registryById = new Map()
for (const b of businessesRegistry) {
  registryById.set(b.id, b)
  const scope = `businesses-registry.json#${b.id}(${b.slug})`
  checkPlaceId(scope, b.google_place_id, { required: false })
  if (b.status === 'published' && !isHiddenBusiness(b)) {
    checkCoords(scope, b.lat, b.lng, { required: true })
    checkGoogleMapsUrl(scope, b.google_maps_url, { required: true })
  } else if (b.google_maps_url && SHORTLINK_RE.test(b.google_maps_url)) {
    addError(scope, `비공개 레코드 내 외부 단축 URL 잔존: ${b.google_maps_url}`)
  }
}

// 3. data/khem-beach-businesses.json 검증
const khemBusinesses = readJson('data/khem-beach-businesses.json')
const khemById = new Map()
for (const b of khemBusinesses) {
  khemById.set(b.id, b)
  const scope = `khem-beach-businesses.json#${b.id}(${b.slug})`
  if (b.status === 'published') {
    checkPlaceId(scope, b.google_place_id, { required: false })
    if (b.place_id !== undefined && b.place_id !== null) {
      checkPlaceId(`${scope}.place_id`, b.place_id, { required: false })
      if (b.google_place_id && b.place_id !== b.google_place_id) {
        addError(scope, `place_id("${b.place_id}")와 google_place_id("${b.google_place_id}") 불일치`)
      }
    }
    checkCoords(scope, b.lat, b.lng, { required: true })
    checkGoogleMapsUrl(scope, b.google_maps_url, { required: true })
  }
}

// 4. data/sunset_town_hotels.json + data/khem_beach_hotels.json + data/hotel_insights.json 검증
const sunsetHotels = readJson('data/sunset_town_hotels.json').hotels || []
const khemHotels = readJson('data/khem_beach_hotels.json').hotels || []
const hotelInsights = readJson('data/hotel_insights.json')

for (const [slug, insight] of Object.entries(hotelInsights)) {
  const scope = `hotel_insights.json#${slug}`
  checkPlaceId(scope, insight.google_place_id, { required: false })
}

for (const h of sunsetHotels) {
  const scope = `sunset_town_hotels.json#${h.slug}`
  checkPlaceId(scope, h.googlePlaceId, { required: true })
  checkCoords(scope, h.lat, h.lng, { required: true })
  checkGoogleMapsUrl(scope, h.googleMapsUrl, { required: true })
  const insight = hotelInsights[h.slug]
  if (insight?.google_place_id && insight.google_place_id !== h.googlePlaceId) {
    addError(
      scope,
      `hotel_insights.json Place ID 드리프트: hotel="${h.googlePlaceId}" vs insight="${insight.google_place_id}"`
    )
  }
}

for (const h of khemHotels) {
  const scope = `khem_beach_hotels.json#${h.slug}`
  checkPlaceId(scope, h.googlePlaceId, { required: true })
  checkCoords(scope, h.lat, h.lng, { required: true })
  checkGoogleMapsUrl(scope, h.googleMapsUrl, { required: true })
  const insight = hotelInsights[h.slug]
  if (insight?.google_place_id && h.googlePlaceId && insight.google_place_id !== h.googlePlaceId) {
    addError(
      scope,
      `hotel_insights.json Place ID 드리프트: hotel="${h.googlePlaceId}" vs insight="${insight.google_place_id}"`
    )
  }
}

// 5. data/zone-assignments.json 검증 및 레지스트리 Place ID 정합성 체크
const zoneAssignments = readJson('data/zone-assignments.json')
for (const [id, za] of Object.entries(zoneAssignments)) {
  const scope = `zone-assignments.json#${id}`
  checkPlaceId(scope, za.google_place_id, { required: false })
  const src = registryById.get(id) || khemById.get(id)
  if (src) {
    const srcPid = src.google_place_id || null
    const zaPid = za.google_place_id || null
    if (srcPid !== zaPid) {
      addError(scope, `레지스트리 Place ID 불일치: zone-assignments="${zaPid}" vs registry="${srcPid}" (${src.slug})`)
    }
  }
}

// 6. lib/banking.ts 검증 및 businesses-registry.json SSOT 일치 검증
const { BANKING_PLACES } = loadTsModule('lib/banking.ts')
for (const item of BANKING_PLACES) {
  const scope = `lib/banking.ts#${item.id}`
  checkPlaceId(scope, item.googlePlaceId, { required: true })
  checkCoords(scope, item.lat, item.lng, { required: true })
  checkGoogleMapsUrl(scope, item.googleMapsUrl, { required: true })

  const reg = registryById.get(item.id)
  if (!reg) {
    addError(scope, `businesses-registry.json에 대응 레코드(${item.id}) 없음`)
    continue
  }
  if (reg.google_place_id !== item.googlePlaceId) {
    addError(scope, `Place ID 드리프트: banking="${item.googlePlaceId}" vs registry="${reg.google_place_id}"`)
  }
  if (reg.google_maps_url !== item.googleMapsUrl) {
    addError(scope, `URL 드리프트: banking="${item.googleMapsUrl}" vs registry="${reg.google_maps_url}"`)
  }
  if (Math.abs((reg.lat ?? 0) - item.lat) > 1e-6 || Math.abs((reg.lng ?? 0) - item.lng) > 1e-6) {
    addError(
      scope,
      `좌표 드리프트: banking=(${item.lat}, ${item.lng}) vs registry=(${reg.lat}, ${reg.lng})`
    )
  }
}

// 7. lib/emergencyFacilities.ts 검증
const { PRIMARY_EMERGENCY_FACILITIES, REFERENCE_MAJOR_HOSPITALS } = loadTsModule('lib/emergencyFacilities.ts')
for (const fac of [...PRIMARY_EMERGENCY_FACILITIES, ...REFERENCE_MAJOR_HOSPITALS]) {
  const scope = `lib/emergencyFacilities.ts#${fac.id}`
  checkPlaceId(scope, fac.placeId, { required: true })
  checkCoords(scope, fac.lat, fac.lng, { required: true })
  checkGoogleMapsUrl(`${scope}.placeUrl`, fac.googleMapsPlaceUrl, { required: true })
  checkGoogleMapsUrl(`${scope}.dirUrl`, fac.googleMapsDirUrl, { required: true })
  checkGoogleMapsUrl(`${scope}.photosUrl`, fac.googleMapsPhotosUrl, { required: true })
}

// 8. lib/sunsetMapData.ts 검증
const { SUNSET_LANDMARKS } = loadTsModule('lib/sunsetMapData.ts')
for (const lm of SUNSET_LANDMARKS) {
  const scope = `lib/sunsetMapData.ts#${lm.id}`
  checkPlaceId(scope, lm.googlePlaceId, { required: false })
  checkCoords(scope, lm.lat, lm.lng, { required: true })
  checkGoogleMapsUrl(scope, lm.googleMapsUrl, { required: true })
}

if (errors.length > 0) {
  console.error(`\n[validate:gmaps] FAILED — 총 ${errors.length}건의 무결성 위반이 감지되었습니다:\n`)
  for (const err of errors) {
    console.error(`  - ${err}`)
  }
  process.exit(1)
}

console.log(
  `[validate:gmaps] PASSED — 0 errors (Place IDs: ${stats.checkedPlaceIds}, URLs: ${stats.checkedUrls}, Coords: ${stats.checkedCoords}, Scanned files: ${stats.scannedFilesForShortlinks})`
)
