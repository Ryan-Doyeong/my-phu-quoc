export type SiteSettings = {
  hero_image_url: string
  hero_topline: string
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_primary_cta: string
  hero_secondary_cta: string
  hero_note: string
  hero_blur: number
  hero_overlay: number
  accent_color: string
  bg_color: string
  paper_color: string
  radius: number
}

export const defaultSettings: SiteSettings = {
  hero_image_url: '/stock/hero.webp',
  hero_topline: 'SUNSET TOWN · KHEM BEACH · AN THOI',
  hero_title: 'My\nPhu Quoc',
  hero_subtitle: 'Turquoise water by day, golden sunsets by night.',
  hero_description: 'Your local guide to Sunset Town, Khem Beach and southern Phu Quoc.',
  hero_primary_cta: 'Explore',
  hero_secondary_cta: "Tonight's sunset spots",
  hero_note: 'Golden hours\n& sea breeze ♥',
  hero_blur: 2,
  hero_overlay: 0.18,
  accent_color: '#0B7A8A',
  bg_color: '#F3F8F7',
  paper_color: '#FCFEFD',
  radius: 28,
}
