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
  currency: 'USD',
  checkInDate: '2026-11-16',
  nights: 1,
  occupancy: 'Adults 2, Room 1',
  thresholds: [
    { tier: '$' as const, level: 1, maxPrice: 39, label: '실속형 (Budget)', description: '하위 20% ($39 이하)' },
    { tier: '$$' as const, level: 2, maxPrice: 45, label: '준실속 (Economy)', description: '20%~40% ($40 ~ $45)' },
    { tier: '$$$' as const, level: 3, maxPrice: 55, label: '스탠다드·부티크 (Mid-range)', description: '40%~60% ($46 ~ $55)' },
    { tier: '$$$$' as const, level: 4, maxPrice: 80, label: '고급·오션뷰 (Upscale)', description: '60%~80% ($56 ~ $80)' },
    { tier: '$$$$$' as const, level: 5, maxPrice: Infinity, label: '프리미엄·특급 (Luxury)', description: '상위 20% ($81 이상)' },
  ],
} as const

export function getPriceTierFromUsd(priceUsd: number): HotelPriceRange {
  for (const t of PRICE_TIER_CONFIG.thresholds) {
    if (priceUsd <= t.maxPrice) return t.tier
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
