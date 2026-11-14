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

const FAKE_PLACE_ID_SLUG_RE = /^ChIJ_[a-z0-9_]+$/
const VALID_GOOGLE_PLACE_ID_RE = /^(?:ChIJ|GhIJ|Eh)[A-Za-z0-9_-]{20,}$/

export function isValidGooglePlaceId(placeId?: string | null): boolean {
  if (typeof placeId !== 'string') return false
  const trimmed = placeId.trim()
  if (trimmed.length < 24) return false
  if (FAKE_PLACE_ID_SLUG_RE.test(trimmed)) return false
  if (!VALID_GOOGLE_PLACE_ID_RE.test(trimmed)) return false
  const suffix = trimmed.replace(/^(?:ChIJ|GhIJ|Eh)/, '')
  if (!/[A-Z]/.test(suffix) && (suffix.match(/_/g) || []).length >= 2) {
    return false
  }
  return true
}

function sanitizePlaceId(placeId?: string | null): string | null {
  if (!isValidGooglePlaceId(placeId)) return null
  return placeId!.trim()
}

function extractPlaceId(url?: string | null): string | null {
  if (!url) return null
  const m = url.match(/place_id[:=]([A-Za-z0-9_-]+)/) || url.match(/query_place_id=([A-Za-z0-9_-]+)/)
  return m ? sanitizePlaceId(m[1]) : null
}

function areaHint(address?: string | null): string {
  const a = (address || '').toLowerCase()
  if (a.includes('khem') || a.includes('bãi khem') || a.includes('bai khem')) return 'Khem Beach Phu Quoc'
  return 'Sunset Town Phu Quoc'
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
    return `https://www.google.com/maps/search/?api=1&query=${fallbackQuery}&query_place_id=${placeId}`
  }

  // 2순위: place_id 파라미터 없는 확정 프로필 URL(cid= 또는 /maps/place/ 경로) 우선 활용
  const rawUrl = b.google_maps_url?.trim()
  if (
    rawUrl &&
    !rawUrl.includes('place_id') &&
    (rawUrl.includes('cid=') || rawUrl.includes('/maps/place/'))
  ) {
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
