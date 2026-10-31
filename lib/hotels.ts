import rawHotelData from '@/data/sunset_town_hotels.json'
import rawHotelInsights from '@/data/hotel_insights.json'

export interface HotelInsight {
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

export interface HotelItem {
  slug: string
  hotelId: string
  name_ko: string
  name_en: string
  star: number
  rating: number
  reviewsCount: number
  subRatings?: HotelSubRatings
  cable_m: number
  address: string
  landmarks?: LandmarkDistance[]
  summary: string
  summary_en?: string
  summary_zh?: string
  summary_ja?: string
  summary_ru?: string
  summary_vi?: string
  description: string
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
  badgeText?: string
  highlightSummary?: string
  reviewHighlight?: string
  reviewPros?: string[]
  reviewQuote?: HotelReviewQuote
  googleRating?: number
  googleReviewsCount?: number
  googleReviews?: HotelGoogleReview[]
  unverified?: string[]
  insight?: HotelInsight
}

export function getAllHotels(): HotelItem[] {
  return (rawHotelData.hotels as unknown as HotelItem[]).map(h => ({
    ...h,
    insight: HOTEL_INSIGHTS[h.slug],
  }))
}

export function getFeaturedHotel(): HotelItem | undefined {
  return getAllHotels().find(h => h.isFeatured)
}

export function getHotelBySlug(slug: string): HotelItem | undefined {
  return getAllHotels().find(h => h.slug === slug)
}
