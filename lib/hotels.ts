import rawSunsetTownHotels from '@/data/sunset_town_hotels.json'
import rawKhemBeachHotels from '@/data/khem_beach_hotels.json'
import rawHotelInsights from '@/data/hotel_insights.json'

export interface HotelInsight {
  googleMapsUrl?: string
  location?: string
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
}

function mapHotelItem(raw: any, defaultArea: HotelArea): HotelItem {
  const insight = HOTEL_INSIGHTS[raw.slug]
  return {
    ...raw,
    area: raw.area || defaultArea,
    insight,
    googleMapsUrl: insight?.googleMapsUrl || raw.googleMapsUrl,
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
