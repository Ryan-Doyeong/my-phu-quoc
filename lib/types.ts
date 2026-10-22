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
  hero_topline: 'PEOPLE · PLACES · A BRIGHTER THAO DIEN',
  hero_title: 'Good life\nin Thaodien',
  hero_subtitle: 'Live well. Grow together. Feel at home.',
  hero_description: 'A local guide for better everyday living in Thao Dien.',
  hero_primary_cta: 'Explore',
  hero_secondary_cta: 'Join the community',
  hero_note: 'A kinder\nbrighter\nThaodien ♥',
  hero_blur: 2,
  hero_overlay: 0.18,
  accent_color: '#556f58',
  bg_color: '#f5f2ea',
  paper_color: '#fffdf8',
  radius: 28,
}
