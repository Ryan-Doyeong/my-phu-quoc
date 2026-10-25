// lib/stockImages.ts - Claude 7차 지시서: public/stock 대체용 Sunset Town 실제 사진 매핑
export const STOCK_IMAGES = {
  wellness: '/features/hotel_featured_1280.webp',
  workout: '/features/activities_featured_1280.webp',
  food: '/features/dining_featured_1280.webp',
  cafe: '/features/dining_featured_1280.webp',
  hobby: '/features/activities_featured_1280.webp',
  hotel: '/features/hotel_featured_1280.webp',

  massage: '/features/hotel_featured_1280.webp',
  spa: '/features/hotel_featured_1280.webp',
  recovery: '/features/hotel_featured_1280.webp',
  clinic: '/features/hotel_featured_1280.webp',

  gym: '/features/activities_featured_1280.webp',
  yoga: '/features/activities_featured_1280.webp',
  pilates: '/features/activities_featured_1280.webp',

  restaurant: '/features/dining_featured_1280.webp',
  korean: '/features/dining_featured_1280.webp',
  japanese: '/features/dining_featured_1280.webp',
  italian: '/features/dining_featured_1280.webp',
  healthy: '/features/dining_featured_1280.webp',

  brunch: '/features/dining_featured_1280.webp',
  bakery: '/features/dining_featured_1280.webp',
  tennis: '/features/activities_featured_1280.webp',

  hero: '/hero/02_kiss_bridge_aerial_1920.webp',
  closing: '/features/general_sightseeing_1280.webp',
} as const

export function stockGalleryFor(category: string, subcategory: string | null, tags: string[] | null = []) {
  const t = [subcategory || '', ...(tags || [])].join(' ').toLowerCase()
  if (category === 'bars') return [STOCK_IMAGES.cafe]
  if (category === 'dining') {
    return [STOCK_IMAGES.restaurant]
  }
  if (category === 'hotels') return [STOCK_IMAGES.hotel]
  if (category === 'activities') return [STOCK_IMAGES.workout]
  if (category === 'beach') return [STOCK_IMAGES.hero]
  if (category === 'wellness') {
    return [STOCK_IMAGES.spa]
  }
  if (category === 'shopping') return [STOCK_IMAGES.hobby]
  if (category === 'essentials') return [STOCK_IMAGES.closing]
  return [STOCK_IMAGES.hero]
}

export function stockPrimaryFor(category: string, subcategory: string | null, tags: string[] | null = []) {
  return stockGalleryFor(category, subcategory, tags)[0]
}
