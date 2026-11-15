/**
 * 업체 구글맵 링크 생성 (단일 출처) — 2026-10-31
 * 문제: DB의 google_maps_url 이 `maps/place/?q=place_id:XXX` 형식이라 place_id 가 틀리면 빈 지도가 열림.
 * 해결: 공식 Maps URL 스킴 `search/?api=1&query=<텍스트|좌표>&query_place_id=<id>` 사용.
 *  - place_id 가 유효하면 해당 장소를, 유효하지 않으면 query 텍스트(상호 + Sunset Town Phu Quoc)로 검색 결과를 보여줌.
 */
export interface MapsLinkSource {
  public_name?: string | null
  google_maps_name?: string | null
  google_place_id?: string | null
  google_maps_url?: string | null
  address?: string | null
  lat?: number | null
  lng?: number | null
}

const VALID_POI_PLACE_ID_RE = /^ChI[A-Za-z0-9_-]{21,}$/
const VALID_GEOCODE_PLACE_ID_RE = /^GhIJ[A-Za-z0-9_-]{23}$/
const VALID_COMPOUND_PLACE_ID_RE = /^E[g-v][A-Za-z0-9_-]{20,}={0,2}$/
const FAKE_PREFIX_SLUG_RE = /^(?:ChI[A-Za-z0-9]?|GhIJ|E[g-v])_[a-z0-9_]+$/
const HUMAN_SNAKE_WORDS_RE = /[a-z]{4,}_[a-z]{4,}/
const REPEATED_CHAR_RE = /(.)\1{7,}/
const SEQUENTIAL_DUMMY_RE = /(?:01234567|12345678|23456789|98765432|87654321|abcdefgh)/i

export function isValidGooglePlaceId(placeId?: string | null): boolean {
  if (typeof placeId !== 'string') return false
  if (placeId.length < 22 || /\s/.test(placeId) || /[^\x20-\x7E]/.test(placeId)) {
    return false
  }
  if (/https?:\/\/|\/maps\//i.test(placeId)) return false

  const matchesOfficialFormat =
    VALID_POI_PLACE_ID_RE.test(placeId) ||
    VALID_GEOCODE_PLACE_ID_RE.test(placeId) ||
    VALID_COMPOUND_PLACE_ID_RE.test(placeId)
  if (!matchesOfficialFormat) return false

  if (FAKE_PREFIX_SLUG_RE.test(placeId)) return false

  const suffix = placeId
    .replace(/^(?:ChI[A-Za-z0-9]|GhIJ|E[g-v])/, '')
    .replace(/=+$/, '')
  if (HUMAN_SNAKE_WORDS_RE.test(suffix)) return false
  if (!/[A-Za-z]/.test(suffix)) return false
  if (REPEATED_CHAR_RE.test(suffix) || SEQUENTIAL_DUMMY_RE.test(suffix)) return false
  if (!/[A-Z]/.test(suffix) && (suffix.match(/_/g) || []).length >= 2) {
    return false
  }
  return true
}

function sanitizePlaceId(placeId?: string | null): string | null {
  if (typeof placeId !== 'string') return null
  const trimmed = placeId.trim()
  return isValidGooglePlaceId(trimmed) ? trimmed : null
}

function extractPlaceId(url?: string | null): string | null {
  if (!url) return null
  const m =
    url.match(/place_id[:=]([A-Za-z0-9_-]+(?:=|%3D){0,2})/i) ||
    url.match(/query_place_id=([A-Za-z0-9_-]+(?:=|%3D){0,2})/i)
  if (!m) return null
  const normalized = m[1].replace(/%3D/gi, '=')
  return sanitizePlaceId(normalized)
}

function areaHint(address?: string | null): string {
  const a = (address || '').toLowerCase()
  if (a.includes('khem') || a.includes('bãi khem') || a.includes('bai khem')) return 'Khem Beach Phu Quoc'
  return 'Sunset Town Phu Quoc'
}

export function isConfirmedPlaceProfileUrl(url?: string | null): boolean {
  if (typeof url !== 'string') return false
  const trimmed = url.trim()
  if (!trimmed || /maps\.app\.goo\.gl|goo\.gl\/maps/i.test(trimmed)) return false
  if (trimmed.includes('cid=') || trimmed.includes('ftid=')) return true
  if (!trimmed.includes('/maps/place/')) return false
  // 수제 `/maps/place/<Name>/@lat,lng,18z` URL은 실제 브라우저에서 `/maps/place//@lat,lng` 빈 지도로 리다이렉트되므로 차단.
  // Google 공식 확정 프로필 경로는 반드시 `!1s0x...:0x...` 피처 ID 또는 `!3d...!4d...` 핀 데이터 블록을 포함함.
  return /!1s0x[0-9a-f]+:0x[0-9a-f]+|!3d-?\d+\.\d+!4d-?\d+\.\d+/i.test(trimmed)
}

export function buildGoogleMapsUrl(b: MapsLinkSource): string | null {
  const placeId = sanitizePlaceId(b.google_place_id) || extractPlaceId(b.google_maps_url)
  const name = (b.google_maps_name || b.public_name || '').trim()
  const hasCoords = typeof b.lat === 'number' && typeof b.lng === 'number' && b.lat !== 0 && b.lng !== 0

  // 1순위: 검증된 Google Place ID가 있는 경우 (폴백 쿼리도 상호명 우선으로 지정하여 좌표 핀 폴백 방지)
  if (placeId) {
    const fallbackQuery = name
      ? encodeURIComponent(`${name} ${areaHint(b.address)}`)
      : hasCoords
        ? `${b.lat},${b.lng}`
        : encodeURIComponent('Sunset Town Phu Quoc')
    return `https://www.google.com/maps/search/?api=1&query=${fallbackQuery}&query_place_id=${encodeURIComponent(placeId)}`
  }

  // 2순위: place_id 파라미터 없는 확정 프로필 URL(cid=, ftid= 또는 엔티티 데이터 블록이 있는 /maps/place/) 우선 활용
  const rawUrl = b.google_maps_url?.trim()
  if (rawUrl && !rawUrl.includes('place_id') && isConfirmedPlaceProfileUrl(rawUrl)) {
    return rawUrl
  }

  // 3순위: 상호명 기반 검색 (단순 lat,lng 좌표 핀 노출 방지)
  if (name) {
    const q = encodeURIComponent(`${name} ${areaHint(b.address)}`)
    return `https://www.google.com/maps/search/?api=1&query=${q}`
  }

  // 4순위: 상호명이 없을 때만 좌표 또는 기존 search URL 폴백
  if (hasCoords) return `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`
  if (rawUrl && rawUrl.includes('api=1') && !rawUrl.includes('place_id')) return rawUrl
  return null
}
