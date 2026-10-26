// lib/stockImages.ts - Phu Quoc Sunset Town 카테고리별 대표 실사 이미지 매핑
export const STOCK_IMAGES = {
  wellness: '/categories/wellness.webp',
  workout: '/categories/activities.webp',
  food: '/categories/dining.webp',
  cafe: '/categories/bars.webp',
  hobby: '/categories/shopping.webp',
  hotel: '/categories/hotels.webp',
  beach: '/categories/beach.webp',
  essentials: '/categories/essentials.webp',
  banking: '/categories/essentials.webp',

  massage: '/categories/wellness.webp',
  spa: '/categories/wellness.webp',
  recovery: '/categories/wellness.webp',
  clinic: '/categories/wellness.webp',

  gym: '/categories/activities.webp',
  yoga: '/categories/activities.webp',
  pilates: '/categories/activities.webp',

  restaurant: '/categories/dining.webp',
  korean: '/categories/dining.webp',
  japanese: '/categories/dining.webp',
  italian: '/categories/dining.webp',
  healthy: '/categories/dining.webp',

  brunch: '/categories/dining.webp',
  bakery: '/categories/dining.webp',
  tennis: '/categories/activities.webp',

  hero: '/hero/02_kiss_bridge_aerial_1920.webp',
  closing: '/features/general_sightseeing_1280.webp',
} as const

export function stockGalleryFor(category: string, subcategory: string | null, tags: string[] | null = []) {
  if (category === 'bars') return ['/categories/bars.webp']
  if (category === 'dining') return ['/categories/dining.webp']
  if (category === 'hotels') return ['/categories/hotels.webp']
  if (category === 'activities') return ['/categories/activities.webp']
  if (category === 'beach') return ['/categories/beach.webp']
  if (category === 'wellness') return ['/categories/wellness.webp']
  if (category === 'shopping') return ['/categories/shopping.webp']
  if (category === 'essentials') return ['/categories/essentials.webp']
  if (category === 'banking') return ['/categories/essentials.webp']
  return [STOCK_IMAGES.hero]
}

export function stockPrimaryFor(category: string, subcategory: string | null, tags: string[] | null = []) {
  return stockGalleryFor(category, subcategory, tags)[0]
}
