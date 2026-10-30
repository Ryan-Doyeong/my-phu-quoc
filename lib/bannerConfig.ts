/**
 * 홈 마이리얼트립 스타일 메인 배너 설정 (단일 출처)
 * 
 * 사용자(Ryan) 지시:
 * - 홈 배너는 3장: ① 선셋타운 이벤트 ② 버기 투어 ③ 택시 투어
 * - 비엣 트래블 환전(외부 업체) 배너는 숨김 처리 (플래그로 꺼두기, 데이터는 보존)
 * - 광고 라벨은 화면에 나오지 않게 숨김 (플래그로 꺼두기)
 * - 자동 전환 1초 (1000ms)
 */

export interface BannerItemConfig {
  id: string
  slotKey: string
  image: string
  targetUrl: string | null // null이면 클릭 이동 없음 (static)
  isExternal?: boolean
  showAdBadge?: boolean
  enabled: boolean
}

export const BANNER_SETTINGS = {
  autoplayIntervalMs: 1000, // 1초 자동 전환
  showAdBadge: false, // 광고 라벨 표시 플래그 (현재 숨김)
  enableExchangeBanner: false, // 비엣 트래블 환전 배너 표시 플래그 (현재 숨김)
} as const

export const HOME_BANNERS_CONFIG: BannerItemConfig[] = [
  // 1. 선셋타운 야간 공연 이벤트
  {
    id: 'sunset-event',
    slotKey: 'main-event',
    image: '/banners/event_nightlife.webp',
    targetUrl: '/events',
    enabled: true,
  },
  // 2. 비엣 트래블 환전 (외부 업체 - 현재 숨김 처리)
  {
    id: 'viet-travel-exchange',
    slotKey: 'main-exchange',
    image: '/banners/viet_travel_exchange_v6.webp',
    targetUrl: null,
    showAdBadge: true,
    enabled: BANNER_SETTINGS.enableExchangeBanner,
  },
  // 3. 버기 투어
  {
    id: 'buggy-tour',
    slotKey: 'main-buggy',
    image: '/banners/phu_quoc_buggy_tour_v5.webp',
    targetUrl: '/buggy-tour',
    enabled: true,
  },
  // 4. 택시 투어
  {
    id: 'taxi-tour',
    slotKey: 'main-taxi',
    image: '/banners/phu_quoc_taxi_tour_v5.webp',
    targetUrl: '/taxi-tour',
    enabled: true,
  },
]
