import rawSunsetTownHotels from '@/data/sunset_town_hotels.json'
import rawKhemBeachHotels from '@/data/khem_beach_hotels.json'
import rawHotelInsights from '@/data/hotel_insights.json'

export interface HotelInsight {
  googleMapsUrl?: string
  location?: string
  location_en?: string
  view?: string
  condition?: string
  staff?: string
  pros?: string[]
  cons?: string[]
}

export type HotelInsightsMap = Record<string, HotelInsight>

export const HOTEL_INSIGHTS: HotelInsightsMap = rawHotelInsights as HotelInsightsMap

export function getHotelInsight(slug: string): HotelInsight | undefined {
  return HOTEL_INSIGHTS[slug]
}

export interface HotelRoom {
  name: string
  size?: string
  bed?: string
  view?: string
  features?: string
  photo?: string
}

export interface HotelSubRatings {
  cleanliness?: number
  service?: number
  facilities?: number
  valueForMoney?: number
  location?: number
}

export interface HotelGoogleReview {
  author: string
  rating?: number
  text: string
  source: string
}

export interface FacilityCategory {
  name: string
  items: string[]
}

export interface LandmarkDistance {
  name: string
  distance: string
}

export interface HotelReviewQuote {
  text: string
  source: string
}

export type HotelArea = 'sunset-town' | 'khem-beach'
export type HotelTier = 'top' | 'recommended' | 'standard'
export type HotelPriceRange = '$' | '$$' | '$$$' | '$$$$' | '$$$$$'

export const PRICE_TIER_CONFIG = {
  currency: 'VND',
  referenceCurrency: 'USD (고정 참고 환율: 1 USD = 25,400 VND)',
  checkInDate: '2026-11-16',
  nights: 1,
  occupancy: 'Adults 2, Room 1',
  // 2026-11-01 아고다 실시간 시작가(₫) 5분위 분할 기준 (총 24개 실측 완료)
  thresholds: [
    { tier: '$' as const, level: 1, maxPriceVnd: 1000000, label: '초실속형 (Budget)', description: '하위 20% (1,000,000 VND 이하, 약 $39 이하)' },
    { tier: '$$' as const, level: 2, maxPriceVnd: 1250000, label: '준실속형 (Economy)', description: '20%~40% (1,000,001 ~ 1,250,000 VND, 약 $39 ~ $49)' },
    { tier: '$$$' as const, level: 3, maxPriceVnd: 1750000, label: '스탠다드·부티크 (Mid-range)', description: '40%~60% (1,250,001 ~ 1,750,000 VND, 약 $49 ~ $69)' },
    { tier: '$$$$' as const, level: 4, maxPriceVnd: 2100000, label: '고급·오션뷰 (Upscale)', description: '60%~80% (1,750,001 ~ 2,100,000 VND, 약 $69 ~ $83)' },
    { tier: '$$$$$' as const, level: 5, maxPriceVnd: Infinity, label: '프리미엄·특급 (Luxury)', description: '상위 20% (2,100,001 VND 이상, 약 $83 이상)' },
  ],
} as const

export function getPriceTierFromVnd(priceVnd: number): HotelPriceRange {
  for (const t of PRICE_TIER_CONFIG.thresholds) {
    if (priceVnd <= t.maxPriceVnd) return t.tier
  }
  return '$$$$$'
}

export function getPriceTierLevel(tier?: string): number | null {
  if (!tier) return null
  return tier.length
}

/** 고정 참고 환율 (PRICE_TIER_CONFIG.referenceCurrency 와 동일) */
export const VND_PER_USD = 25400

export interface PriceTierBand {
  level: number
  /** null = 하한 없음 ($ 등급) */
  minVnd: number | null
  /** null = 상한 없음 ($$$$$ 등급) */
  maxVnd: number | null
  minUsd: number | null
  maxUsd: number | null
}

/**
 * 아고다 5단계 요금대 → 실제 1박 가격 범위(VND/USD).
 * 2026-11-01 아고다 실측 5분위 기준(PRICE_TIER_CONFIG) 그대로 사용.
 */
export function getPriceTierBand(priceRange?: HotelPriceRange | string | null): PriceTierBand | null {
  const level = getPriceTierLevel(priceRange || undefined)
  if (!level) return null
  const thresholds = PRICE_TIER_CONFIG.thresholds
  const idx = Math.min(Math.max(level, 1), thresholds.length) - 1
  const cur = thresholds[idx]
  const prev = idx > 0 ? thresholds[idx - 1] : null
  const minVnd = prev ? prev.maxPriceVnd : null
  const maxVnd = Number.isFinite(cur.maxPriceVnd) ? (cur.maxPriceVnd as number) : null
  const toUsd = (v: number | null) => (v == null ? null : Math.round(v / VND_PER_USD))
  return { level, minVnd, maxVnd, minUsd: toUsd(minVnd), maxUsd: toUsd(maxVnd) }
}

/**
 * 호텔 목록 상단 카테고리 (가격 순).
 * - recommended: 마이 푸꾸옥 추천 호텔 모음
 * - luxury:     특급 ~ 4성급 (아고다 요금대 $$$$$ · $$$$)
 * - boutique:   3성 부티크 ($$$ · $$)
 * - guesthouse: 게스트하우스·실속형 ($)
 * - khem-beach: 켐 비치 리조트
 */
export type HotelCategory = 'recommended' | 'luxury' | 'boutique' | 'guesthouse' | 'khem-beach'
export const HOTEL_CATEGORY_ORDER: HotelCategory[] = ['recommended', 'luxury', 'boutique', 'guesthouse', 'khem-beach']

export type HotelPriceCategory = Exclude<HotelCategory, 'recommended' | 'khem-beach'>

/**
 * 가격 카테고리 판정. 아고다 요금대가 있으면 요금대 기준,
 * 요금대 미확인이면 아고다 표시 성급으로 임시 분류 (4성 이상 → luxury, 그 외 → boutique).
 */
export function getHotelPriceCategory(hotel: { priceRange?: HotelPriceRange | string | null; star?: number }): HotelPriceCategory {
  const level = getPriceTierLevel(hotel.priceRange || undefined)
  if (level) {
    if (level >= 4) return 'luxury'
    if (level >= 2) return 'boutique'
    return 'guesthouse'
  }
  if ((hotel.star || 0) >= 4) return 'luxury'
  return 'boutique'
}

export function isRecommendedHotel(hotel: { tier?: HotelTier; isFeatured?: boolean; slug?: string }): boolean {
  return hotel.tier === 'top' || hotel.tier === 'recommended' || Boolean(hotel.isFeatured) || hotel.slug === 'jw-marriott-phu-quoc-emerald-bay'
}

export interface HotelItem {
  slug: string
  hotelId: string
  name_ko: string
  name_en: string
  /** Localized display name set by localizeHotel (ko: name_ko, others: name_en). */
  displayName?: string
  star: number
  officialStar?: number | null
  area?: HotelArea
  tier?: HotelTier
  driveMinutesToSunsetTown?: number | string
  driveMinutesNote?: string
  order?: number
  rating: number
  reviewsCount: number
  subRatings?: HotelSubRatings
  cable_m: number
  address: string
  landmarks?: LandmarkDistance[]
  summary: string
  description?: string
  summary_en?: string
  summary_zh?: string
  summary_ja?: string
  summary_ru?: string
  summary_vi?: string
  agodaRawDescription?: string
  isAiGeneratedIntro?: boolean
  coreFacilities: string[]
  facilityCategories?: FacilityCategory[]
  checkIn: string
  checkOut: string
  builtYear?: number
  floors?: number
  policies?: {
    childPolicy?: string
    [key: string]: any
  }
  rooms?: HotelRoom[]
  photos: string[]
  agodaUrl: string
  isFeatured?: boolean
  strengths?: string[]
  badgeText?: string
  highlightSummary?: string
  reviewHighlight?: string
  reviewPros?: string[]
  reviewQuote?: HotelReviewQuote
  googleRating?: number
  googleReviewsCount?: number
  priceRange?: HotelPriceRange
  googleReviews?: HotelGoogleReview[]
  unverified?: string[]
  insight?: HotelInsight
  googleMapsUrl?: string
  googlePlaceId?: string
}

function mapHotelItem(raw: any, defaultArea: HotelArea): HotelItem {
  const insight = HOTEL_INSIGHTS[raw.slug]
  return {
    ...raw,
    area: raw.area || defaultArea,
    insight,
    googleMapsUrl: insight?.googleMapsUrl || raw.googleMapsUrl,
    googlePlaceId: raw.googlePlaceId,
    googleRating: raw.googleRating,
    googleReviewsCount: raw.googleReviewsCount,
    priceRange: raw.priceRange,
  }
}

export function getSunsetTownHotels(): HotelItem[] {
  return (rawSunsetTownHotels.hotels as any[]).map(h => mapHotelItem(h, 'sunset-town'))
}

export function getKhemBeachHotels(): HotelItem[] {
  return (rawKhemBeachHotels.hotels as any[]).map(h => mapHotelItem(h, 'khem-beach'))
}

export function getAllHotels(): HotelItem[] {
  return [...getSunsetTownHotels(), ...getKhemBeachHotels()]
}

export function getHotelsByArea(area: HotelArea): HotelItem[] {
  if (area === 'khem-beach') return getKhemBeachHotels()
  return getSunsetTownHotels()
}

export function getFeaturedHotel(): HotelItem | undefined {
  return getAllHotels().find(h => h.isFeatured || h.tier === 'recommended')
}

export function getHotelBySlug(slug: string): HotelItem | undefined {
  return getAllHotels().find(h => h.slug === slug)
}

/**
 * Single Source of Truth lookup for Agoda 5-tier price range by business.
 * Returns HotelPriceRange ('$' | '$$' | '$$$' | '$$$$' | '$$$$$') or undefined if unconfirmed/sold-out.
 */
export function getHotelPriceRangeForBusiness(b: {
  slug?: string | null
  google_place_id?: string | null
  agoda_url?: string | null
  website_url?: string | null
  category?: string | null
  id?: string | null
} | null | undefined): HotelPriceRange | undefined {
  if (!b) return undefined
  const all = getAllHotels()

  // 1. Direct slug match
  if (b.slug) {
    const found = all.find((h) => h.slug === b.slug)
    if (found?.priceRange) return found.priceRange
  }

  // 2. Google Place ID match
  if (b.google_place_id) {
    const found = all.find((h) => h.googlePlaceId && h.googlePlaceId === b.google_place_id)
    if (found?.priceRange) return found.priceRange
  }

  // 3. Agoda URL match
  const testUrl = b.agoda_url || (b.website_url && b.website_url.includes('agoda.com') ? b.website_url : null)
  if (testUrl) {
    const m = testUrl.match(/agoda\.com\/(?:[a-z]{2}-[a-z]{2}\/)?([^/?#]+)\/hotel/i)
    if (m) {
      const agodaSlug = m[1].toLowerCase()
      const found = all.find((h) => {
        if (!h.agodaUrl) return false
        const hm = h.agodaUrl.match(/agoda\.com\/(?:[a-z]{2}-[a-z]{2}\/)?([^/?#]+)\/hotel/i)
        return hm && hm[1].toLowerCase() === agodaSlug
      })
      if (found?.priceRange) return found.priceRange
    }
  }

  // 4. Special alias mappings
  if (b.slug === 'sunset-place-7') {
    const found = all.find((h) => h.slug.includes('la-festa'))
    if (found?.priceRange) return found.priceRange
  }

  return undefined
}

export { HotelPriceBadge } from '@/components/HotelPriceBadge'

