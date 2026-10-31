import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { SiteSettings } from '@/lib/types'
import { SuggestionForm, VolunteerForm } from '@/components/PublicForms'
import { Logo } from '@/components/Logo'
import { SponsorCarousel } from '@/components/SponsorCarousel'
import { MrtBannerCarousel } from '@/components/MrtBannerCarousel'
import { SouthGlanceSection } from '@/components/SouthGlanceSection'
import { NewsletterForm } from '@/components/NewsletterForm'
import { HeroSearch } from '@/components/SiteSearch'
import { MobileMenu } from '@/components/MobileMenu'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SunsetTownTickets } from '@/components/SunsetTownTickets'
import { SunsetDistrictFilter } from '@/components/SunsetDistrictFilter'
import { MAIN_ZONES, INTER_ZONE_TRANSIT } from '@/lib/zones'
import { SunsetTownMap } from '@/components/SunsetTownMapClient'
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CATEGORY_KEYS,
  categoryLabel,
  categoryEyebrow,
  categoryDescription,
  categoryTheme,
  type DirectoryCategoryAppearance,
  type DirectoryCategory,
} from '@/lib/directory'
import { STOCK_IMAGES } from '@/lib/stockImages'
import { tUi } from '@/lib/i18n/uiStrings'
import { imageUrl } from '@/lib/imageUrl'
import type { HomeSections } from '@/lib/homeSections'
import { localePath, dateLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary, localizeStory, translateTerm } from '@/lib/i18n/dictionaries'
import { DEFAULT_SPONSOR_BANNERS } from '@/lib/banners'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { SITE_CONFIG } from '@/lib/siteConfig'

const HOME_NAV_SUNSET: Record<string, string> = {
  ko: '선셋타운',
  en: 'Sunset Town',
  zh: 'Sunset Town',
  ru: 'Sunset Town',
  ja: 'Sunset Town',
  hi: 'Sunset Town',
}

const HOME_NAV_KHEM: Record<string, string> = {
  ko: '켐비치',
  en: 'Khem Beach',
  zh: 'Khem Beach',
  ru: 'Khem Beach',
  ja: 'Khem Beach',
  hi: 'Khem Beach',
}

/* Quick Service Card Labels (Korean confirmed; other languages temporary English awaiting ChatGPT review) */
/* ChatGPT 검수 대기 */
const QUICK_CARD_EXCHANGE: Record<string, string> = {
  ko: '환전',
  en: 'Currency Exchange',
  zh: 'Currency Exchange',
  ru: 'Currency Exchange',
  ja: 'Currency Exchange',
  hi: 'Currency Exchange',
}

const QUICK_CARD_BUGGY: Record<string, string> = {
  ko: '버기 투어',
  en: 'Buggy Tour',
  zh: 'Buggy Tour',
  ru: 'Buggy Tour',
  ja: 'Buggy Tour',
  hi: 'Buggy Tour',
}

const QUICK_CARD_TAXI: Record<string, string> = {
  ko: '차량 투어',
  en: 'Vehicle Tour',
  zh: 'Vehicle Tour',
  ru: 'Vehicle Tour',
  ja: 'Vehicle Tour',
  hi: 'Vehicle Tour',
}

const QUICK_CARD_EVENTS: Record<string, string> = {
  ko: '이벤트',
  en: 'Events',
  zh: 'Events',
  ru: 'Events',
  ja: 'Events',
  hi: 'Events',
}

const QUICK_CARD_ACTIVITIES: Record<string, string> = {
  ko: '액티비티',
  en: 'Activities',
  zh: 'Activities',
  ru: 'Activities',
  ja: 'Activities',
  hi: 'Activities',
}

const QUICK_CARD_EMERGENCY: Record<string, string> = {
  ko: '긴급상황',
  en: 'Emergency',
  zh: 'Emergency',
  ru: 'Emergency',
  ja: 'Emergency',
  hi: 'Emergency',
}

const QUICK_CARD_ITINERARIES: Record<string, string> = {
  ko: '추천 테마 일정',
  en: 'Theme Itineraries',
  zh: 'Theme Itineraries',
  ru: 'Theme Itineraries',
  ja: 'Theme Itineraries',
  hi: 'Theme Itineraries',
}

export type QuickServiceKey =
  | 'exchange'
  | 'buggy'
  | 'taxi'
  | 'events'
  | 'activities'
  | 'emergency'
  | 'itineraries'

/**
 * [홈 서비스 카드 표시 순서 설정 - Single Source of Truth]
 * 사용자가 카드 노출 순서를 한 곳에서 손쉽게 변경할 수 있는 설정 배열입니다.
 * 아래 배열 요소의 순서를 변경하거나 추가/제거하면 홈 화면에 즉시 반영됩니다.
 */
export const QUICK_SERVICE_ORDER: QuickServiceKey[] = [
  'exchange',     // 1. 환전 (링크 없음)
  'buggy',        // 2. 버기 투어
  'taxi',         // 3. 차량 투어
  'events',       // 4. 이벤트
  'activities',   // 5. 액티비티
  'emergency',    // 6. 긴급상황
  'itineraries',  // 7. 추천 테마 일정
]

interface QuickServiceDefinition {
  key: QuickServiceKey
  labels: Record<string, string>
  href: string | null
  iconWrapClass: string
  disabled?: boolean
  renderIcon: () => React.ReactNode
}

const QUICK_SERVICES_REGISTRY: Record<QuickServiceKey, QuickServiceDefinition> = {
  exchange: {
    key: 'exchange',
    labels: QUICK_CARD_EXCHANGE,
    href: null,
    iconWrapClass: 'iconWrapExchange',
    disabled: true,
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="3" y="10" width="24" height="15" rx="3" fill="#10B981" />
        <rect x="5" y="12" width="20" height="11" rx="2" fill="#34D399" />
        <circle cx="15" cy="17.5" r="3.5" fill="#10B981" />
        <circle cx="25" cy="21" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
        <circle cx="25" cy="21" r="4.5" fill="#FBBF24" />
        <text x="25" y="24" textAnchor="middle" fontSize="7" fontWeight="900" fill="#92400E">₫</text>
        <circle cx="28.5" cy="14" r="4.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <circle cx="28.5" cy="14" r="2.8" fill="#FDE68A" />
      </svg>
    ),
  },
  buggy: {
    key: 'buggy',
    labels: QUICK_CARD_BUGGY,
    href: '/buggy-tour',
    iconWrapClass: 'iconWrapBuggy',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M7 11h20a2.5 2.5 0 0 1 2.5 2.5v1H5v-1A2.5 2.5 0 0 1 7 11z" fill="#0284C7" />
        <path d="M8 14.5v5M25 14.5v5" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 14.5l3.5 5" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 19.5h23.5l3.5 5H6l-2-5z" fill="#F59E0B" />
        <rect x="7" y="18.5" width="10" height="3" rx="1.5" fill="#FEF3C7" />
        <circle cx="10" cy="26" r="3.8" fill="#1E293B" />
        <circle cx="10" cy="26" r="1.5" fill="#CBD5E1" />
        <circle cx="23" cy="26" r="3.8" fill="#1E293B" />
        <circle cx="23" cy="26" r="1.5" fill="#CBD5E1" />
      </svg>
    ),
  },
  taxi: {
    key: 'taxi',
    labels: QUICK_CARD_TAXI,
    href: '/taxi-tour',
    iconWrapClass: 'iconWrapTaxi',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="14" y="8" width="8" height="3" rx="1.2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <path d="M6 18c0-3.5 2-5 5.5-5h13c3 0 5 1.8 6 5l1.5 5.5a2.5 2.5 0 0 1-2.5 3H7.5A2.5 2.5 0 0 1 5 23.5L6 18z" fill="#F97316" />
        <rect x="10" y="14.5" width="6.5" height="4.5" rx="1.5" fill="#BAE6FD" />
        <rect x="18" y="14.5" width="7.5" height="4.5" rx="1.5" fill="#BAE6FD" />
        <circle cx="27" cy="21.5" r="1.6" fill="#FEF08A" />
        <circle cx="11.5" cy="27" r="3.8" fill="#1E293B" />
        <circle cx="11.5" cy="27" r="1.5" fill="#CBD5E1" />
        <circle cx="23.5" cy="27" r="3.8" fill="#1E293B" />
        <circle cx="23.5" cy="27" r="1.5" fill="#CBD5E1" />
      </svg>
    ),
  },
  events: {
    key: 'events',
    labels: QUICK_CARD_EVENTS,
    href: '/events',
    iconWrapClass: 'iconWrapEvent',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="24" height="21" rx="4" fill="#9333EA" />
        <path d="M6 14h24" stroke="#7E22CE" strokeWidth="1.5" />
        <rect x="11" y="5" width="2.5" height="5" rx="1.25" fill="#E9D5FF" />
        <rect x="22.5" y="5" width="2.5" height="5" rx="1.25" fill="#E9D5FF" />
        <circle cx="18" cy="21.5" r="4.5" fill="#FDE047" />
        <path d="M18 18.5l.8 1.8 2 .3-1.4 1.4.3 2-1.7-.9-1.7.9.3-2-1.4-1.4 2-.3.8-1.8z" fill="#D97706" />
      </svg>
    ),
  },
  activities: {
    key: 'activities',
    labels: QUICK_CARD_ACTIVITIES,
    href: '/activities',
    iconWrapClass: 'iconWrapActivity',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M17 7v13h8L17 7z" fill="#0284C7" />
        <path d="M15 10v10H9l6-10z" fill="#38BDF8" />
        <rect x="15" y="6" width="2" height="15" fill="#0369A1" />
        <path d="M6 21.5h24l-3 4H9l-3-4z" fill="#F59E0B" />
        <path d="M4 27c2.5-1 4.5-1 7 0s4.5 1 7 0 4.5-1 7 0 4.5 1 7 0" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7 30.5c2.5-.8 4.5-.8 7 0s4.5.8 7 0 4.5-.8 7 0" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  emergency: {
    key: 'emergency',
    labels: QUICK_CARD_EMERGENCY,
    href: '/emergency',
    iconWrapClass: 'iconWrapEmergency',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M13 11a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2h-10v-2z" fill="#EF4444" />
        <rect x="15" y="10" width="6" height="3" rx="1" fill="#FEE2E2" />
        <rect x="5" y="12" width="26" height="18" rx="4" fill="#DC2626" />
        <rect x="6.5" y="13.5" width="23" height="15" rx="3" fill="#EF4444" />
        <rect x="15.5" y="16.5" width="5" height="11" rx="1.2" fill="#FFFFFF" />
        <rect x="12.5" y="19.5" width="11" height="5" rx="1.2" fill="#FFFFFF" />
      </svg>
    ),
  },
  itineraries: {
    key: 'itineraries',
    labels: QUICK_CARD_ITINERARIES,
    href: '/itineraries',
    iconWrapClass: 'iconWrapItineraries',
    renderIcon: () => (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M7 10.5l7-2.5 8 2.5 7-2.5v17l-7 2.5-8-2.5-7 2.5v-17z" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M14 8v17M22 10.5v17" stroke="#FDA4AF" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
        <path d="M10.5 21.5c2.5-3 4.5-1 6.5-4s3-1 5-3" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 1.5" />
        <path d="M22 11c0-2.8 2.2-5 5-5s5 2.2 5 5c0 3.5-5 8-5 8s-5-4.5-5-8z" fill="#E11D48" />
        <circle cx="27" cy="11" r="2" fill="#FFFFFF" />
        <path d="M10 13.5l3-1.8L10 10v3.5z" fill="#F59E0B" />
        <line x1="10" y1="9.5" x2="10" y2="15.5" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
}

const TWO_HUBS_EYEBROW: Record<string, string> = {
  ko: 'TWO HUBS · 2대 구역',
  en: 'TWO HUBS · DUAL ZONES',
  zh: '两大区域',
  ru: 'Две основные зоны',
  ja: '2つの主要エリア',
  hi: 'दो प्रमुख क्षेत्र',
}

const TWO_HUBS_TITLE: Record<string, string> = {
  ko: '선셋타운 & 켐비치',
  en: 'Sunset Town & Khem Beach',
  zh: 'Sunset Town 与 Khem Beach',
  ru: 'Sunset Town и Khem Beach',
  ja: 'Sunset TownとKhem Beach',
  hi: 'Sunset Town और Khem Beach',
}

const TWO_HUBS_DESC: Record<string, string> = {
  ko: '저녁·야경 중심의 선셋타운과 낮·해변 중심의 켐비치는 차량으로 약 10분 거리입니다.',
  en: 'Sunset Town for evenings and night views, Khem Beach for daytime beach relaxation — about 10 minutes apart by car.',
  zh: 'Sunset Town 以傍晚活动和夜景为主，Khem Beach 适合白天的海滩休闲。两地车程约10分钟。',
  ru: 'Sunset Town — для вечернего отдыха и ночных видов, а Khem Beach — для дневного отдыха на пляже. Между ними около 10 минут на машине.',
  ja: '夕方と夜景が中心の Sunset Town と、昼間のビーチでのんびり過ごせる Khem Beach。両エリア間は車で約10分です。',
  hi: 'Sunset Town शाम और रात के नज़ारों के लिए, जबकि Khem Beach दिन में समुद्र तट पर आराम करने के लिए है। दोनों के बीच कार से लगभग 10 मिनट लगते हैं।',
}

type Story = {
  id: string
  title: string
  category: string | null
  excerpt: string | null
  cover_image_url: string | null
  slug: string
  content_type?: string | null
  event_date?: string | null
  event_location?: string | null
  [key: string]: any
}
type Banner = {
  slot_key: string
  title: string | null
  subtitle: string | null
  image_url: string
  target_url: string | null
  size: string
  sort_order: number
}

const fallbackStories = [
  {
    title: 'From expat to neighbor',
    category: 'PEOPLE',
    excerpt: 'How Phu Quoc became home for good.',
    image: '/features/general_sightseeing_640.webp',
  },
  {
    title: 'Why we love Phu Quoc',
    category: 'PLACES',
    excerpt: 'Green streets, great food and a stronger community.',
    image: '/features/dining_featured_640.webp',
  },
  {
    title: 'A second chance',
    category: 'COMMUNITY',
    excerpt: 'Meet the rescue dogs finding new homes in Phu Quoc.',
    image: '/features/hotel_featured_640.webp',
  },
  {
    title: 'Small actions, big impact',
    category: 'VOLUNTEER',
    excerpt: 'How neighbors come together to make a difference.',
    image: '/features/activities_featured_640.webp',
  },
]

function sanitizeFireworksTiming(text: string, locale: Locale = 'en'): string {
  if (!text) return ''
  let t = text
  if (locale === 'ko') {
    t = t.replace(/매일\s*밤\s*21시\s*30분\s*터지는\s*불꽃놀이/g, '불꽃놀이 피날레(운영 일정은 공식 공지 확인)')
    t = t.replace(/매일\s*밤\s*21:30/g, '공연 피날레')
    t = t.replace(/21시\s*30분\s*불꽃놀이/g, '불꽃놀이 피날레')
    t = t.replace(/21시\s*30분/g, '공연 피날레(공식 공지 확인)')
    t = t.replace(/21:30/g, '공연 피날레(공식 공지 확인)')
    t = t.replace(/매일\s*밤\s*불꽃놀이/g, '불꽃놀이 쇼')
    return t
  }
  if (locale === 'en') {
    t = t.replace(/for the 21:30 fireworks/gi, 'for the fireworks finale (check official schedule)')
    t = t.replace(/the 21:30 fireworks/gi, 'the fireworks finale (check official schedule)')
    t = t.replace(/21:30 fireworks/gi, 'fireworks finale (check official schedule)')
    t = t.replace(/Nightly Fireworks/gi, 'Fireworks Finale')
    return t
  }
  if (locale === 'vi') {
    t = t.replace(/lúc 21:30/gi, 'cuối show diễn (xem thông báo chính thức)')
    t = t.replace(/21:30/gi, 'cuối show (xem lịch chính thức)')
    t = t.replace(/Pháo Hoa Hàng Đêm/gi, 'Pháo Hoa Biển')
    return t
  }
  if (locale === 'ru') {
    t = t.replace(/21:30/gi, 'в финале шоу (уточняйте расписание)')
    return t
  }
  if (locale === 'ja') {
    t = t.replace(/21:30/gi, 'フィナーレ花火（公式スケジュール確認）')
    t = t.replace(/毎晩/g, '公演')
    return t
  }
  if (locale === 'zh') {
    t = t.replace(/21:30/gi, '压轴烟花秀（以官方最新公告为准）')
    t = t.replace(/每晚/g, '演出')
    return t
  }
  if (locale === 'hi') {
    t = t.replace(/21:30/gi, 'आतिशबाजी (आधिकारिक समय सारिणी देखें)')
    return t
  }
  return t
}

export function HomePage({
  settings,
  categoryAppearance,
  stories,
  banners,
  event,
  homeSections,
  locale = 'en',
}: {
  settings: SiteSettings
  categoryAppearance: Record<DirectoryCategory, DirectoryCategoryAppearance>
  stories: Story[]
  banners: Banner[]
  event: Story | null
  homeSections: HomeSections
  locale?: Locale
}) {
  const dict = getDictionary(locale)
  const style = {
    '--accent': settings.accent_color,
    '--site-bg': settings.bg_color,
    '--paper': settings.paper_color,
    '--radius': `${settings.radius}px`,
    '--blur': `${settings.hero_blur}px`,
    '--overlay': String(settings.hero_overlay),
  } as CSSProperties

  const storyItems = stories.length
    ? stories.slice(0, 4).map((raw, i) => {
        const s = localizeStory(raw, locale)
        return {
          title: sanitizeFireworksTiming(s.title, locale),
          category: s.category || fallbackStories[i]?.category || 'COMMUNITY',
          excerpt: sanitizeFireworksTiming(s.excerpt || fallbackStories[i]?.excerpt || '', locale),
          image: s.cover_image_url,
          slug: s.slug,
        }
      })
    : fallbackStories.map((x, i) => ({
        ...x,
        title: sanitizeFireworksTiming(x.title, locale),
        excerpt: sanitizeFireworksTiming(x.excerpt, locale),
        slug: `fallback-${i}`,
      }))

  const activeBanners = banners && banners.length > 0 ? banners : DEFAULT_SPONSOR_BANNERS
  const mainBanners = activeBanners
    .filter((x) => x.size === 'main')
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 7)
  const smallBanners = activeBanners
    .filter((x) => x.size === 'small')
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 4)

  const activeEvent =
    event ||
    PUBLISHED_EVENTS.find((e) => e.slug === 'phu-quoc-halloween-sunset-town-hon-thom') ||
    PUBLISHED_EVENTS[0] ||
    null
  const localizedEvent = activeEvent ? localizeStory(activeEvent, locale) : null
  const eventHref = localizedEvent?.slug
    ? localePath(locale, `/news/${localizedEvent.slug}`)
    : localePath(locale, '/news')

  const heroImage = '/hero/02_kiss_bridge_aerial_1920.webp'

  // 언어별 딕셔너리 정본 텍스트 적용 (마이 푸꾸옥 공식 브랜딩)
  const heroTopline = dict.home.heroTopline
  const heroTitle = dict.home.heroTitle
  const heroSubtitle = dict.home.heroSubtitle
  const heroDescription = dict.home.heroDescription
  const heroPrimaryCta = dict.home.heroPrimaryCta
  const heroSecondaryCta = dict.home.heroSecondaryCta

  const purposeTitle = locale === 'en' ? homeSections.purpose.title : dict.home.purposeTitle
  const purposeDesc = locale === 'en' ? homeSections.purpose.description : dict.home.purposeDesc
  const purposeHandNote = locale === 'en' ? homeSections.purpose.handNote : dict.home.purposeHandNote

  const discoverTitle = locale === 'en' ? homeSections.discover.title : dict.home.discoverTitle
  const discoverDesc = locale === 'en' ? homeSections.discover.description : dict.home.discoverDesc

  const storiesTitle = locale === 'en' ? homeSections.stories.title : dict.home.storiesTitle
  const storiesDesc = locale === 'en' ? homeSections.stories.description : dict.home.storiesDesc

  const newsletterTitle = locale === 'en' ? homeSections.newsletter.title : dict.home.newsletterTitle
  const newsletterDesc = locale === 'en' ? homeSections.newsletter.description : dict.home.newsletterDesc

  const suggestionTitle =
    locale === 'en' ? homeSections.participation.suggestionTitle : dict.home.suggestionTitle
  const suggestionDesc =
    locale === 'en' ? homeSections.participation.suggestionDescription : dict.home.suggestionDesc
  const volunteerTitle =
    locale === 'en' ? homeSections.participation.volunteerTitle : dict.home.volunteerTitle
  const volunteerDesc =
    locale === 'en' ? homeSections.participation.volunteerDescription : dict.home.volunteerDesc

  const closingTitle = locale === 'en' ? homeSections.closing.title : dict.home.closingTitle
  const closingDesc = locale === 'en' ? homeSections.closing.description : dict.home.closingDesc

  return (
    <div style={style} className="siteRoot">
      {/* 0. Top Header (White background, matching Zone page detailNav style) */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {HOME_NAV_SUNSET[locale] || HOME_NAV_SUNSET.en}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {HOME_NAV_KHEM[locale] || HOME_NAV_KHEM.en}
            </Link>
            <Link href={localePath(locale, '/directory/dining')}>
              {categoryLabel('dining', locale)}
            </Link>
            <Link href={localePath(locale, '/directory/bars')}>
              {categoryLabel('bars', locale)}
            </Link>
            <Link href={localePath(locale, '/hotels')}>
              {categoryLabel('hotels', locale)}
            </Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <div className="heroHeaderWrap">
        {/* 1. Rounded Main Photo Box (12px, Sunset Town aerial photo) */}
        <section className="heroPhotoSection">
          <div className="heroImageBox">
            <img
              src="/hero/02_kiss_bridge_aerial_1920.webp"
              alt="푸꾸옥 선셋타운 키스브릿지 석양 항공 전경"
              className="heroImage"
              loading="eager"
              fetchPriority="high"
            />
            <div className="photoCreditBadge">
              <span>{locale === 'ko' ? '사진: Vivu Vietnam · CC BY 4.0' : 'Photo: Vivu Vietnam · CC BY 4.0'}</span>
            </div>
          </div>
        </section>

        {/* 2. Quick Service Cards (Configurable order via QUICK_SERVICE_ORDER) */}
        <section className="quickServiceSection" id="quick-services">
          <div className="cardScrollTrack" id="cardScrollTrack">
            {QUICK_SERVICE_ORDER.map((key) => {
              const def = QUICK_SERVICES_REGISTRY[key]
              if (!def) return null
              const label = def.labels[locale] || def.labels.en

              if (def.disabled || !def.href) {
                return (
                  <div
                    key={key}
                    className="serviceCard disabled"
                    id={`card-${key}`}
                    title={label}
                  >
                    <div className={`cardIconWrap ${def.iconWrapClass}`}>
                      {def.renderIcon()}
                    </div>
                    <div className="cardLabel">{label}</div>
                  </div>
                )
              }

              return (
                <Link
                  key={key}
                  href={localePath(locale, def.href)}
                  className="serviceCard"
                  id={`card-${key}`}
                  title={label}
                >
                  <div className={`cardIconWrap ${def.iconWrapClass}`}>
                    {def.renderIcon()}
                  </div>
                  <div className="cardLabel">{label}</div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* 3. Text, Search & Twin Buttons */}
        <section className="heroTextSection">
          <div className="heroTopline">{heroTopline}</div>
          <h1 className="heroHeading">
            {heroSubtitle || heroTitle}
          </h1>
          <p className="heroDesc">{heroDescription}</p>

          <HeroSearch locale={locale} />

          <div className="heroBtnRow">
            <Link
              href={localePath(locale, '/zones/sunset-town')}
              className="heroTwinBtn btnSunsetOrange"
            >
              {heroPrimaryCta}
            </Link>
            <Link
              href={localePath(locale, '/zones/khem-beach')}
              className="heroTwinBtn btnKhemOcean"
            >
              {heroSecondaryCta}
            </Link>
          </div>
        </section>

        {/* Section Divider */}
        <div className="mrtSectionDivider" />
      </div>

      <main>
        {/* Ryan 지시: 시안대로 홈의 스폰서 영역은 미사용 (컴포넌트는 보존) */}
        {false && <SponsorCarousel main={mainBanners} small={smallBanners} locale={locale} />}

        {/* Ryan 지시: 시안대로 홈의 이벤트 프로모 카드는 제거 */}
        {false && homeSections.eventPromo.visible && localizedEvent && (
          <section className="shell eventPromo">
            <Link href={eventHref} className="eventPromoLink">
              <img
                src={imageUrl(localizedEvent.cover_image_url || '/features/nightlife_featured_1280.webp', 1200, 72)}
                alt=""
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
              />
              <div className="eventPromoShade" />
              <div className="eventPromoCopy">
                <span className="eyebrow">{dict.home.eventEyebrow}</span>
                <h2>{sanitizeFireworksTiming(localizedEvent.title)}</h2>
                <p>{sanitizeFireworksTiming(localizedEvent.excerpt || '')}</p>
                <div className="eventPromoFooter">
                  <span className="eventPromoDate">
                    {localizedEvent.event_date
                      ? new Date(localizedEvent.event_date).toLocaleDateString(dateLocaleFor(locale), {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : dict.home.eventUpcoming}
                    {localizedEvent.event_location ? ` · ${localizedEvent.event_location}` : ''}
                  </span>
                  <span className="eventPromoDot">·</span>
                  <strong className="eventPromoCta">{dict.home.eventCta}</strong>
                </div>
              </div>
              <span className="eventPromoAttribution">Photo: Vivu Vietnam · CC BY-SA 4.0</span>
            </Link>
          </section>
        )}

        {/* 메인 v6 시안: 신규 남부 한눈에 (개요 지도 도식 + 구역 카드 2장) */}
        <SouthGlanceSection locale={locale} />

        {/* Claude 5차/6차: 타오디엔 레거시 섹션 비활성화 */
        false && homeSections.purpose.visible && (
          <section className="shell purpose" id="community">
            <div className="sectionIntro purposeIntro">
              <div>
                {purposeTitle && <span className="eyebrow">{dict.home.purposeEyebrow}</span>}
                <h2>{purposeTitle}</h2>
                <p>{purposeDesc}</p>
              </div>
              <div className="handNote">
                {purposeHandNote.split('\n').map((l, i) => (
                  <span key={i}>
                    {l}
                    <br />
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={localePath(locale, '/impact')}
              className="communityImpactBar"
              data-analytics-type="impact"
              data-analytics-id="community-impact"
              aria-label="Read community impact news"
            >
              <div>
                <span className="eyebrow">{dict.home.impactEyebrow}</span>
                <h3>{dict.home.impactBarTitle}</h3>
                <p>{dict.home.impactBarDesc}</p>
              </div>
              <span className="communityImpactArrow" aria-hidden="true">
                →
              </span>
            </Link>
          </section>
        )}

        {/* [확정 지시 · Claude] TWO HUBS · 2대 구역 섹션 (선셋타운 & 켐비치) — 시안 v6 남부 한눈에 섹션으로 통합되어 홈에서는 숨김 플래그 처리 */}
        {SITE_CONFIG.showLegacyTwoZonesSection && (
          <section className="shell twoZonesSection" id="two-zones">
            <div className="sectionHeader">
              <span className="hubEyebrow">
                {TWO_HUBS_EYEBROW[locale] || TWO_HUBS_EYEBROW.en}
              </span>
              <h3>
                {TWO_HUBS_TITLE[locale] || TWO_HUBS_TITLE.en}
              </h3>
              <p>
                {TWO_HUBS_DESC[locale] || TWO_HUBS_DESC.en}
              </p>
            </div>

            <div className="dualGrid">
              {/* Card 1: Sunset Town */}
              <div className="hubCard sunset">
                <div
                  className="hubCardImage"
                  style={{
                    backgroundImage: `url('${MAIN_ZONES['sunset-town'].heroImage}')`,
                  }}
                >
                  <span className="hubCardBadge">
                    {MAIN_ZONES['sunset-town'].badge[locale] || MAIN_ZONES['sunset-town'].badge.en}
                  </span>
                </div>
                <div className="hubCardBody">
                  <div className="hubCardTitleRow">
                    <h4>{MAIN_ZONES['sunset-town'].name[locale] || MAIN_ZONES['sunset-town'].name.en}</h4>
                    <span>{MAIN_ZONES['sunset-town'].nameLocal}</span>
                  </div>
                  <div className="hubSubConcept">
                    {MAIN_ZONES['sunset-town'].subConcept[locale] || MAIN_ZONES['sunset-town'].subConcept.en}
                  </div>
                  <p className="hubCardDesc">
                    {MAIN_ZONES['sunset-town'].homeDescription[locale] || MAIN_ZONES['sunset-town'].homeDescription.en}
                  </p>
                  <div className="hubFeatureChips">
                    {(MAIN_ZONES['sunset-town'].featureChips[locale] || MAIN_ZONES['sunset-town'].featureChips.en).map((chip, idx) => (
                      <span key={idx}>{chip}</span>
                    ))}
                  </div>
                  <Link
                    href={localePath(locale, '/zones/sunset-town')}
                    className="hubButton"
                  >
                    <span>{MAIN_ZONES['sunset-town'].ctaButton[locale] || MAIN_ZONES['sunset-town'].ctaButton.en}</span>
                  </Link>
                </div>
              </div>

              {/* Card 2: Khem Beach */}
              <div className="hubCard khem">
                <div
                  className="hubCardImage"
                  style={{
                    backgroundImage: `url('${MAIN_ZONES['khem-beach'].heroImage}')`,
                  }}
                >
                  <span className="hubCardBadge">
                    {MAIN_ZONES['khem-beach'].badge[locale] || MAIN_ZONES['khem-beach'].badge.en}
                  </span>
                </div>
                <div className="hubCardBody">
                  <div className="hubCardTitleRow">
                    <h4>{MAIN_ZONES['khem-beach'].name[locale] || MAIN_ZONES['khem-beach'].name.en}</h4>
                    <span>{MAIN_ZONES['khem-beach'].nameLocal}</span>
                  </div>
                  <div className="hubSubConcept">
                    {MAIN_ZONES['khem-beach'].subConcept[locale] || MAIN_ZONES['khem-beach'].subConcept.en}
                  </div>
                  <p className="hubCardDesc">
                    {MAIN_ZONES['khem-beach'].homeDescription[locale] || MAIN_ZONES['khem-beach'].homeDescription.en}
                  </p>
                  <div className="hubFeatureChips">
                    {(MAIN_ZONES['khem-beach'].featureChips[locale] || MAIN_ZONES['khem-beach'].featureChips.en).map((chip, idx) => (
                      <span key={idx}>{chip}</span>
                    ))}
                  </div>
                  <Link
                    href={localePath(locale, '/zones/khem-beach')}
                    className="hubButton"
                  >
                    <span>{MAIN_ZONES['khem-beach'].ctaButton[locale] || MAIN_ZONES['khem-beach'].ctaButton.en}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Transit Bridge */}
            <div className="interZoneBridge">
              <div className="bridgeLeft">
                <div className="bridgeIcon">⇄</div>
                <div className="bridgeText">
                  <h5>{INTER_ZONE_TRANSIT.headline[locale] || INTER_ZONE_TRANSIT.headline.en}</h5>
                  <p>{INTER_ZONE_TRANSIT.description[locale] || INTER_ZONE_TRANSIT.description.en}</p>
                </div>
              </div>
              <div className="bridgeInfoBadge">
                {INTER_ZONE_TRANSIT.badge[locale] || INTER_ZONE_TRANSIT.badge.en}
              </div>
            </div>
          </section>
        )}

        {/* [2026-10-27 개편] 선셋타운 지도 & 12대 핵심 명소 바로가기 컴팩트 카드 (상세 본문은 /map 페이지로 분리) */}
        <section className="shell sunsetTownMapPromoSection" id="map-preview">
          {(() => {
            const promoTexts: Record<Locale, { badge: string; title: string; desc: string; cta: string }> = {
              ko: {
                badge: '선셋타운 지도 & 12대 명소',
                title: '선셋타운 인터랙티브 지도 & 12대 핵심 명소 가이드',
                desc: '키스 브릿지·75m 시계탑·케이블카·불꽃쇼 등 선셋타운 12대 랜드마크의 인터랙티브 핀 지도와 상세 관람 안내를 한눈에 확인하세요.',
                cta: '선셋타운 지도 & 12대 명소 보기 →',
              },
              en: {
                badge: 'MAP & 12 LANDMARKS',
                title: 'Sunset Town Interactive Map & 12 Iconic Landmarks',
                desc: 'Explore the master plan illustrated map, walking routes, and detailed visitor tips for all 12 iconic landmarks including Kiss Bridge.',
                cta: 'Explore Sunset Town Map & 12 Iconic Landmarks →',
              },
              vi: {
                badge: 'BẢN ĐỒ & 12 ĐIỂM ĐẾN',
                title: 'Bản đồ tương tác & 12 Điểm đến biểu tượng Sunset Town',
                desc: 'Khám phá bản đồ minh họa, tuyến phố đi bộ và cẩm nang tham quan 12 điểm đến nổi tiếng như Cầu Hôn, Tháp đồng hồ và Cáp treo.',
                cta: 'Xem Bản đồ & 12 Điểm đến Thị trấn Hoàng Hôn →',
              },
              zh: {
                badge: '导览地图与12大地标',
                title: '日落小镇互动地图与12大核心地标',
                desc: '通过手绘全景地图与详尽游玩指南，探索亲吻桥、75米钟楼、跨海缆车站等12大打卡点。',
                cta: '查看日落小镇地图与12大地标 →',
              },
              ja: {
                badge: 'マップ＆12大名所',
                title: 'サンセットタウン案内マップ＆12大名所ガイド',
                desc: 'キスブリッジ、75m時計台、海上ロープウェイなど、12大名所の見どころとストリート網をご案内。',
                cta: 'サンセットタウン地図＆12大名所を見る →',
              },
              ru: {
                badge: 'КАРТА И 12 МЕСТ',
                title: 'Интерактивная карта Сансет-Тауна и 12 главных мест',
                desc: 'Иллюстрированная карта, пешеходные маршруты и подробные советы для путешественников по 12 знаковым местам.',
                cta: 'Карта Сансет-Тауна и 12 главных мест →',
              },
              hi: {
                badge: 'नक्शा और 12 स्थल',
                title: 'सनसेट टाउन इंटरैक्टिव मैप और 12 प्रमुख दर्शनीय स्थल',
                desc: 'किस ब्रिज, 75 मीटर क्लॉक टॉवर और 12 प्रमुख स्थलों के सचित्र नक्शे और संपूर्ण गाइड का अन्वेषण करें।',
                cta: 'सनसेट टाउन मैप और 12 प्रमुख स्थल देखें →',
              },
            }
            const pt = promoTexts[locale] || promoTexts.en
            return (
              <div className="sunsetMapPromoCard">
                <div className="sunsetMapPromoCopy">
                  <span className="sunsetMapPromoBadge">{pt.badge}</span>
                  <h2 className="sunsetMapPromoTitle">{pt.title}</h2>
                  <p className="sunsetMapPromoDesc">{pt.desc}</p>
                  <Link href={localePath(locale, '/map')} className="sunsetMapPromoBtn">
                    <span>{pt.cta}</span>
                  </Link>
                </div>
                <div className="sunsetMapPromoGraphic">
                  <Link href={localePath(locale, '/map')} className="sunsetMapPromoThumbnail" aria-label={pt.cta}>
                    <span style={{ fontSize: '38px' }}>🗺️</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '0.04em' }}>
                      {tUi('INTERACTIVE MAP', locale)}
                    </span>
                  </Link>
                </div>
              </div>
            )
          })()}
        </section>

        {homeSections.discover.visible && (
          <section className="shell discover" id="discover">
            <div className="sectionIntro">
              <div>
                <span className="eyebrow">{dict.home.discoverEyebrow}</span>
                <h2>{discoverTitle}</h2>
                <p>{discoverDesc}</p>
              </div>
            </div>
            <div className="categoryCards categoryCardsFive">
              {DIRECTORY_CATEGORY_KEYS.map((key) => {
                const c = DIRECTORY_CATEGORIES[key]
                const icon = categoryAppearance[key]
                const locLabel = categoryLabel(key, locale)
                const locEyebrow = categoryEyebrow(key, locale)
                const locDesc = categoryDescription(key, locale)
                return (
                  <Link
                    href={localePath(locale, `/directory/${key}`)}
                    key={key}
                    data-analytics-type="category"
                    data-analytics-id={key}
                    data-theme={categoryTheme(key)}
                  >
                    <article>
                      <img
                        src={imageUrl(c.image, 480, 72)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={320}
                      />
                      <div className="categoryIconBadge">
                        {icon.icon_url ? (
                          <img src={icon.icon_url} alt={`${locLabel} icon`} />
                        ) : (
                          <span>{icon.icon_text}</span>
                        )}
                      </div>
                      <span>{locEyebrow}</span>
                      <h3>{locLabel}</h3>
                      <p>{locDesc}</p>
                      <div className="categoryMiniTags">
                        {c.subcategories.slice(0, 4).map((x) => (
                          <em key={x}>{translateTerm(x, locale)}</em>
                        ))}
                      </div>
                      <strong>{dict.home.exploreCategory(locLabel)}</strong>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <SunsetTownTickets locale={locale} />

        {homeSections.stories.visible && (
          <section className="shell stories" id="stories">
            <div className="sectionIntro storyIntro">
              <div>
                <span className="eyebrow">{dict.home.storiesEyebrow}</span>
                <h2>{storiesTitle}</h2>
                <p>{storiesDesc}</p>
              </div>
              <Link className="viewAll" href={localePath(locale, '/news')}>
                {dict.home.viewAll}
              </Link>
            </div>
            <div className="storyGrid">
              {storyItems.map((s, i) => (
                <Link
                  href={s.slug.startsWith('fallback-') ? '#' : localePath(locale, `/news/${s.slug}`)}
                  key={`${s.title}-${i}`}
                >
                  <article className="storyCard">
                    <div className="storyCardImage">
                      {s.image && (
                        <img
                          src={imageUrl(s.image, 640, 70)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={640}
                          height={426}
                        />
                      )}
                    </div>
                    <div className="storyCardBody">
                      <span className="storyCategory">{s.category}</span>
                      <h3>{s.title}</h3>
                      <p>{s.excerpt}</p>
                      <small className="storyPhotoCredit">Photo: Vivu Vietnam · CC BY-SA 4.0</small>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {homeSections.newsletter.visible && (
          <section className="newsletterBand">
            <div className="shell newsletterGrid">
              <div>
                <span className="eyebrow">{dict.home.newsletterEyebrow}</span>
                <h2>{newsletterTitle}</h2>
                <p>{newsletterDesc}</p>
              </div>
              <NewsletterForm locale={locale} />
            </div>
          </section>
        )}

        {homeSections.participation.visible && (
          <section className="shell participation" id="about">
            <article className="participationCard suggestion">
              <span className="eyebrow">{dict.home.suggestionEyebrow}</span>
              <h2>{suggestionTitle}</h2>
              <p>{suggestionDesc}</p>
              <SuggestionForm locale={locale} />
            </article>
            <article className="participationCard volunteer" id="volunteer">
              <span className="eyebrow">{dict.home.volunteerEyebrow}</span>
              <h2>{volunteerTitle}</h2>
              <p>{volunteerDesc}</p>
              <VolunteerForm locale={locale} />
            </article>
          </section>
        )}

        {homeSections.closing.visible && (
          <section className="closing">
            <img
              src={imageUrl(STOCK_IMAGES.closing, 1500, 72)}
              alt="Riverside city skyline at sunset"
              loading="lazy"
              decoding="async"
              width={1500}
              height={1000}
            />
            <div className="closingOverlay" />
            <div className="closingContent">
              <div>
                <h2>
                  {closingTitle.split('\n').map((l, i) => (
                    <span key={i}>
                      {l}
                      <br />
                    </span>
                  ))}
                </h2>
                <p>{closingDesc}</p>
              </div>
              <Link href={localePath(locale, '/impact')} className="outlineButton closingButton">
                {dict.home.closingCta} <span>→</span>
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
