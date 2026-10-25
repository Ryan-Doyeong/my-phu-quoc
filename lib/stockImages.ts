export const STOCK_IMAGES = {
  wellness: '/stock/ai/wellness.webp',
  workout: '/stock/ai/workout.webp',
  food: '/stock/ai/food.webp',
  cafe: '/stock/ai/cafe.webp',
  hobby: '/stock/ai/hobby.webp',
  hotel: '/stock/ai/hero.webp',

  massage: '/stock/wellness.webp',
  spa: '/stock/wellness.webp',
  recovery: '/stock/wellness.webp',
  clinic: '/stock/wellness.webp',

  gym: '/stock/workout.webp',
  yoga: '/stock/workout.webp',
  pilates: '/stock/workout.webp',

  restaurant: '/stock/food.webp',
  korean: '/stock/korean.webp',
  japanese: '/stock/japanese.webp',
  italian: '/stock/italian.webp',
  healthy: '/stock/healthy.webp',

  brunch: '/stock/brunch.webp',
  bakery: '/stock/bakery.webp',
  tennis: '/stock/hobby.webp',

  hero: '/stock/ai/hero.webp',
  closing: '/stock/closing.webp',
} as const

export function stockGalleryFor(category:string,subcategory:string|null,tags:string[]|null=[]){
  const t=[subcategory||'',...(tags||[])].join(' ').toLowerCase()
  if(category==='bars') return [STOCK_IMAGES.cafe]
  if(category==='dining'){
    if(t.includes('japanese')||t.includes('sushi')) return [STOCK_IMAGES.japanese]
    if(t.includes('korean')) return [STOCK_IMAGES.korean]
    if(t.includes('italian')||t.includes('pizza')) return [STOCK_IMAGES.italian]
    if(t.includes('vegetarian')||t.includes('healthy')) return [STOCK_IMAGES.healthy]
    return [STOCK_IMAGES.restaurant]
  }
  if(category==='hotels') return [STOCK_IMAGES.hotel]
  if(category==='activities') return [STOCK_IMAGES.workout]
  if(category==='beach') return [STOCK_IMAGES.hero]
  if(category==='wellness'){
    if(t.includes('massage')) return [STOCK_IMAGES.massage]
    return [STOCK_IMAGES.spa]
  }
  if(category==='shopping') return [STOCK_IMAGES.hobby]
  if(category==='essentials') return [STOCK_IMAGES.closing]
  return [STOCK_IMAGES.tennis]
}

export function stockPrimaryFor(category:string,subcategory:string|null,tags:string[]|null=[]){
  return stockGalleryFor(category,subcategory,tags)[0]
}
