/**
 * lib/zones.ts
 * Sunset Town 구역(Zone) 정의 및 다국어 라벨, 감지 유틸리티
 */

import type { Locale } from '@/lib/i18n/config'

export type SunsetZoneKey =
  | 'all'
  | 'sorrento'
  | 'amalfi'
  | 'venice'
  | 'positano'
  | 'hillside'
  | 'central'

export interface SunsetZoneInfo {
  key: SunsetZoneKey
  nameEn: string
  nameKo: string
  nameVi: string
  descriptionKo: string
  descriptionEn: string
  highlights: string[]
}

export const SUNSET_ZONES: Record<SunsetZoneKey, SunsetZoneInfo> = {
  all: {
    key: 'all',
    nameEn: 'All Zones',
    nameKo: '선셋타운 전체',
    nameVi: 'Toàn bộ Thị trấn Hoàng Hôn',
    descriptionKo: '선셋타운의 모든 구역과 시설',
    descriptionEn: 'All quarters and facilities across Sunset Town',
    highlights: ['291 Facilities', 'All Quarters'],
  },
  sorrento: {
    key: 'sorrento',
    nameEn: 'Sorrento',
    nameKo: '소렌토',
    nameVi: 'Sorrento',
    descriptionKo: '해안 산책로와 썬월드 케이블카 승강장이 인접한 이탈리아풍 거리',
    descriptionEn: 'Coastal promenade and entrance near Sun World Cable Car station',
    highlights: ['Cable Car Station', 'Oceanview Cafes'],
  },
  amalfi: {
    key: 'amalfi',
    nameEn: 'Amalfi',
    nameKo: '아말피',
    nameVi: 'Amalfi',
    descriptionKo: '탁 트인 오션뷰와 테라스 레스토랑이 밀집한 지중해 절벽 마을 스타일',
    descriptionEn: 'Breathtaking sea views, cliffside colorful villas, and terrace dining',
    highlights: ['Terrace Dining', 'Sunset Views'],
  },
  venice: {
    key: 'venice',
    nameEn: 'Venice',
    nameKo: '베니스',
    nameVi: 'Venice',
    descriptionKo: '베니스 운하 감성과 낭만적인 부티크 호텔, 브런치 카페 거리',
    descriptionEn: 'Romantic Venetian architecture, boutique hotels and brunch bistros',
    highlights: ['Boutique Hotels', 'Canal Atmosphere'],
  },
  positano: {
    key: 'positano',
    nameEn: 'Positano',
    nameKo: '포지타노',
    nameVi: 'Positano',
    descriptionKo: '다채로운 파스텔톤 숍하우스와 쇼핑, 스파, 카페 명소',
    descriptionEn: 'Vibrant pastel shophouses, fashion boutiques, spas and cafes',
    highlights: ['Spas & Shopping', 'Pastel Shophouses'],
  },
  hillside: {
    key: 'hillside',
    nameEn: 'Hillside',
    nameKo: '힐사이드',
    nameVi: 'Hillside',
    descriptionKo: '선셋타운 언덕 위에서 바다와 타운 전경을 내려다보는 레지던스 단지',
    descriptionEn: 'Panoramic high-rise residence towers overlooking Sunset Town and sea',
    highlights: ['Hillside Towers', 'Panoramic Overlook'],
  },
  central: {
    key: 'central',
    nameEn: 'Central / Kiss Bridge',
    nameKo: '중심가 · 키스브릿지 · 부이페스트',
    nameVi: 'Trung tâm · Cầu Hôn · VuiFest',
    descriptionKo: '키스브릿지, 부이페스트 야시장, 키스오브더씨 불꽃놀이의 중심',
    descriptionEn: 'Heart of Kiss Bridge, VuiFest Night Market, and Kiss of the Sea Fireworks',
    highlights: ['Kiss Bridge', 'VuiFest Night Market', 'Fireworks Stage'],
  },
}

export const SUNSET_ZONE_KEYS: SunsetZoneKey[] = [
  'all',
  'sorrento',
  'amalfi',
  'venice',
  'positano',
  'hillside',
  'central',
]

export function zoneLabel(key: SunsetZoneKey, locale: Locale = 'en'): string {
  const info = SUNSET_ZONES[key] || SUNSET_ZONES.all
  if (locale === 'ko') return info.nameKo
  if (locale === 'vi') return info.nameVi
  return info.nameEn
}

export function detectSunsetZone(b: {
  address?: string | null
  public_name?: string | null
  tags?: string[] | null
  subcategory?: string | null
}): SunsetZoneKey {
  const text = `${b.address || ''} ${b.public_name || ''} ${(b.tags || []).join(' ')} ${
    b.subcategory || ''
  }`.toLowerCase()

  if (/sorrento|소렌토|sor[- 0-9]/i.test(text)) return 'sorrento'
  if (/amalfi|아말피|ama[- 0-9]/i.test(text)) return 'amalfi'
  if (/venice|베니스|ven[- 0-9]/i.test(text)) return 'venice'
  if (/positano|포지타노|pos[- 0-9]/i.test(text)) return 'positano'
  if (/hillside|힐사이드|the sky|the hill|the sea/i.test(text)) return 'hillside'
  if (
    /vuifest|부이페스트|야시장|kiss bridge|키스브릿지|kiss of the sea|primavera|센트럴|central/i.test(
      text
    )
  )
    return 'central'
  return 'all'
}

export function isSunsetTownFacility(b: {
  google_place_id?: string | null
  address?: string | null
  verification_note?: string | null
}): boolean {
  if (b.google_place_id) return true
  const addr = (b.address || '').toLowerCase()
  if (addr.includes('sunset town') || addr.includes('primavera') || addr.includes('선셋타운')) {
    return true
  }
  if (b.verification_note && b.verification_note.includes('Master DB')) {
    return true
  }
  return false
}
