import type { Locale } from '@/lib/i18n/config'

/**
 * 홈 이벤트·공지 3단 슬라이드 배너 및 메인 배너 설정 (Single Source of Truth)
 *
 * - 작은 서비스 배너 영역(추천 테마 일정 포함) 바로 아래에 3개의 이벤트·공지 슬라이드 배너를 노출합니다.
 * - 기존 검증된 이벤트·공지(PUBLISHED_EVENTS / DB stories) 콘텐츠를 우선 연동하며,
 *   추후 배너 교체가 필요할 때 아래 HOME_EVENT_BANNERS_CONFIG 배열의 storySlug 또는
 *   개별 덮어쓰기 필드(image, targetUrl, titleOverride 등)만 수정하면 즉시 반영됩니다.
 */

export interface BannerItemConfig {
  id: string
  slotKey: string
  image: string
  targetUrl: string | null
  isExternal?: boolean
  showAdBadge?: boolean
  enabled: boolean
}

export interface EventBannerSlideConfig {
  id: string
  slotKey: string
  /** PUBLISHED_EVENTS 또는 DB 게시물의 slug (지정 시 다국어 제목·카테고리·요약·커버 이미지·상세 링크 자동 연동) */
  storySlug?: string
  /** 개별 이미지 덮어쓰기 (선택) */
  image?: string
  /** 개별 상세 링크 덮어쓰기 (선택, 예: '/events/slug' 또는 '/news/slug') */
  targetUrl?: string
  /** 언어별 상단 배지(eyebrow) 덮어쓰기 (선택) */
  eyebrowOverride?: Partial<Record<Locale, string>>
  /** 언어별 제목 덮어쓰기 (선택) */
  titleOverride?: Partial<Record<Locale, string>>
  /** 언어별 요약 문구 덮어쓰기 (선택) */
  subtitleOverride?: Partial<Record<Locale, string>>
  enabled: boolean
}

export const BANNER_SETTINGS = {
  autoplayIntervalMs: 5000, // 5초 자동 전환 (터치·스와이프·호버 시 일시정지)
  showAdBadge: false,
  enableExchangeBanner: false,
} as const

/**
 * 홈 이벤트·공지 슬라이드 배너 3개 설정 (교체 가능 구조)
 * - 기본값: 현재 게시 중인 공식 이벤트·공지 3건 연동
 */
export const HOME_EVENT_BANNERS_CONFIG: EventBannerSlideConfig[] = [
  {
    id: 'event-banner-1',
    slotKey: 'event-slot-1',
    storySlug: 'sun-world-spa-anniversary-offers-november-2026',
    enabled: true,
  },
  {
    id: 'event-banner-2',
    slotKey: 'event-slot-2',
    storySlug: 'kiss-of-the-sea-nightly-multimedia-show',
    enabled: true,
  },
  {
    id: 'event-banner-3',
    slotKey: 'event-slot-3',
    storySlug: 'symphony-of-the-sea-season-3-opening',
    enabled: true,
  },
]

export const HOME_BANNERS_CONFIG: BannerItemConfig[] = [
  {
    id: 'sunset-event',
    slotKey: 'main-event',
    image: '/banners/event_nightlife.webp',
    targetUrl: '/events',
    enabled: true,
  },
  {
    id: 'viet-travel-exchange',
    slotKey: 'main-exchange',
    image: '/banners/viet_travel_exchange_v6.webp',
    targetUrl: null,
    showAdBadge: true,
    enabled: BANNER_SETTINGS.enableExchangeBanner,
  },
  {
    id: 'buggy-tour',
    slotKey: 'main-buggy',
    image: '/banners/phu_quoc_buggy_tour_v5.webp',
    targetUrl: '/buggy-tour',
    enabled: true,
  },
  {
    id: 'taxi-tour',
    slotKey: 'main-taxi',
    image: '/banners/phu_quoc_taxi_tour_v5.webp',
    targetUrl: '/taxi-tour',
    enabled: true,
  },
]
