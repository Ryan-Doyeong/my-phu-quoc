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
  hero_image_url: '/hero/02_kiss_bridge_aerial_1920.webp',
  hero_topline: 'SUNSET TOWN · KISS BRIDGE · FIREWORKS',
  hero_title: 'My\nPhu Quoc',
  hero_subtitle: 'The magic of Sunset Town: Kiss Bridge, nightly fireworks & ocean views.',
  hero_description: 'Your insider guide to Sun Premier Village Primavera, iconic Kiss Bridge, nightly multimedia shows, and southern Phu Quoc.',
  hero_primary_cta: 'Explore Sunset Town',
  hero_secondary_cta: "Tonight's Fireworks",
  hero_note: 'Nightly Fireworks\nat 21:00 ♥',
  hero_blur: 2,
  hero_overlay: 0.18,
  accent_color: '#0B7A8A',
  bg_color: '#F3F8F7',
  paper_color: '#FCFEFD',
  radius: 28,
}
