/**
 * 에이전트(AI) 친화 설정 — 단일 출처
 * robots.txt Content-Signal, llms.txt, JSON-LD, WebMCP, MCP 서버/카드가 함께 사용한다.
 */
import { SITE_URL } from '@/lib/supabase/config'
import { CONTACT_CONFIG } from '@/lib/contactConfig'

export const SITE_NAME = 'My Phu Quoc'
export const SITE_TAGLINE = 'Independent travel guide to Sunset Town & southern Phu Quoc, Vietnam'

export const SITE_CONTACT = {
  email: 'ddunddun8484@gmail.com',
  telephone: '+84907994188', // E.164 (= CONTACT_CONFIG.phoneNumber 0907994188)
  telephoneDisplay: CONTACT_CONFIG.phoneFormatted,
  whatsappUrl: CONTACT_CONFIG.whatsappUrl,
} as const

/**
 * Content-Signal (https://contentsignals.org): search / ai-input / ai-train
 * 기본값: 검색·AI 답변 인용은 허용, AI 학습은 거부. (정책 결정은 사이트 운영자 몫)
 */
export const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no'

/**
 * 공식 SNS·디렉터리 프로필 URL (JSON-LD sameAs).
 * 확인된 마이푸꾸옥 공식 계정만 넣을 것 — 미확인 URL을 추측해서 넣지 않는다.
 */
export const SAME_AS_PROFILES: string[] = []

export const KEY_PAGES: { path: string; title: string; description: string }[] = [
  { path: '/', title: 'Home', description: 'Overview of Sunset Town and Khem Beach travel info' },
  { path: '/zones/sunset-town', title: 'Sunset Town guide', description: 'Zone guide, map and top attractions of Sunset Town' },
  { path: '/zones/khem-beach', title: 'Khem Beach guide', description: 'Resorts and beach pubs on Khem Beach' },
  { path: '/hotels', title: 'Hotels', description: 'Curated Sunset Town and Khem Beach hotels with price tiers and Agoda booking links' },
  { path: '/directory/dining', title: 'Dining', description: 'Restaurants in Sunset Town with menus' },
  { path: '/directory/bars', title: 'Cafes & bars', description: 'Cafes, bars and beach pubs' },
  { path: '/activities', title: 'Activities', description: 'Yacht, hopping and partner tours with listed VND prices' },
  { path: '/map', title: 'Town map', description: 'Interactive Sunset Town map with 12 key attractions' },
  { path: '/news', title: 'News', description: 'Phu Quoc news' },
  { path: '/events', title: 'Events', description: 'Sunset Town events and shows' },
  { path: '/about', title: 'About', description: 'About My Phu Quoc, editorial principles' },
  { path: '/contact', title: 'Contact', description: 'Email, phone and WhatsApp' },
  { path: '/terms', title: 'Terms & disclaimer', description: 'Terms of use and booking disclaimer' },
]

export const SUPPORTED_LANGUAGES = ['en', 'ko', 'zh', 'ru', 'ja', 'hi']

export function siteOrigin(): string {
  return SITE_URL.replace(/\/+$/, '')
}
