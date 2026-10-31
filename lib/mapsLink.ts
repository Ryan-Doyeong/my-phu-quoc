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

function extractPlaceId(url?: string | null): string | null {
  if (!url) return null
  const m = url.match(/place_id[:=]([A-Za-z0-9_-]+)/) || url.match(/query_place_id=([A-Za-z0-9_-]+)/)
  return m ? m[1] : null
}

function areaHint(address?: string | null): string {
  const a = (address || '').toLowerCase()
  if (a.includes('khem') || a.includes('bãi khem') || a.includes('bai khem')) return 'Khem Beach Phu Quoc'
  return 'Sunset Town Phu Quoc'
}

export function buildGoogleMapsUrl(b: MapsLinkSource): string | null {
  const placeId = b.google_place_id || extractPlaceId(b.google_maps_url)
  const name = (b.google_maps_name || b.public_name || '').trim()
  const hasCoords = typeof b.lat === 'number' && typeof b.lng === 'number' && b.lat !== 0 && b.lng !== 0

  // 좌표가 검증된 업체: 좌표 + place_id (가장 정확)
  if (hasCoords && placeId) {
    return `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}&query_place_id=${placeId}`
  }
  // 상호명 기반 검색 (+ place_id 가 맞으면 바로 장소로 이동)
  if (name) {
    const q = encodeURIComponent(`${name} ${areaHint(b.address)}`)
    return placeId
      ? `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${placeId}`
      : `https://www.google.com/maps/search/?api=1&query=${q}`
  }
  if (hasCoords) return `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`
  // 마지막 수단: 기존 URL 중 search 형식만 신뢰
  if (b.google_maps_url && b.google_maps_url.includes('api=1')) return b.google_maps_url
  return null
}
