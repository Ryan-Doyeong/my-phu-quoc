export const STOCK_IMAGES = {
  wellness: '/stock/ai/wellness.webp',
  workout: '/stock/ai/workout.webp',
  food: '/stock/ai/food.webp',
  cafe: '/stock/ai/cafe.webp',
  hobby: '/stock/ai/hobby.webp',

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
  if(category==='cafe'){
    if(t.includes('brunch')) return [STOCK_IMAGES.brunch]
    if(t.includes('bakery')||t.includes('dessert')) return [STOCK_IMAGES.bakery]
    return [STOCK_IMAGES.cafe]
  }
  if(category==='food'){
    if(t.includes('japanese')||t.includes('sushi')) return [STOCK_IMAGES.japanese]
    if(t.includes('korean')) return [STOCK_IMAGES.korean]
    if(t.includes('italian')||t.includes('pizza')) return [STOCK_IMAGES.italian]
    if(t.includes('healthy')||t.includes('vegetarian')||t.includes('salad')) return [STOCK_IMAGES.healthy]
    return [STOCK_IMAGES.restaurant]
  }
  if(category==='workout'){
    if(t.includes('yoga')) return [STOCK_IMAGES.yoga]
    if(t.includes('pilates')) return [STOCK_IMAGES.pilates]
    return [STOCK_IMAGES.gym]
  }
  if(category==='wellness'){
    if(t.includes('recovery')||t.includes('therapy')||t.includes('sauna')||t.includes('ice bath')) return [STOCK_IMAGES.recovery]
    if(t.includes('massage')) return [STOCK_IMAGES.massage]
    if(t.includes('clinic')) return [STOCK_IMAGES.clinic]
    return [STOCK_IMAGES.spa]
  }
  if(category==='beauty'){
    // TODO: replace with dedicated beauty stock images
    return [STOCK_IMAGES.wellness]
  }
  if(category==='services'){
    // TODO: replace with dedicated services stock images
    return [STOCK_IMAGES.hobby]
  }
  if(category==='market'){
    // TODO: replace with dedicated market stock images
    return [STOCK_IMAGES.healthy]
  }
  return [STOCK_IMAGES.tennis]
}

export function stockPrimaryFor(category:string,subcategory:string|null,tags:string[]|null=[]){
  return stockGalleryFor(category,subcategory,tags)[0]
}
