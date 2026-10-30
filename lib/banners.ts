export type DefaultBanner = {
  slot_key: string
  title: string | null
  subtitle: string | null
  image_url: string
  target_url: string | null
  size: 'main' | 'small'
  sort_order: number
}

/**
 * 13차 A 개편: 파일 기반 기본 스폰서 배너 설정 (DB 쓰기 없음)
 * - Viet Travel 환전소 (Currency Exchange)
 * - My Phu Quoc 버기 투어 (Sunset Town Buggy Tour)
 * - My Phu Quoc 택시 투어 (Island Taxi Tour)
 */
export const DEFAULT_SPONSOR_BANNERS: DefaultBanner[] = [
  {
    slot_key: 'main-1',
    title: 'Viet Travel',
    subtitle: 'Currency Exchange',
    image_url: '/banners/viet-travel-exchange.webp',
    target_url: '/partners',
    size: 'main',
    sort_order: 1,
  },
  {
    slot_key: 'main-2',
    title: 'My Phu Quoc Buggy Tour',
    subtitle: 'Sunset Town Scenic Coastal Tour',
    image_url: '/banners/phu-quoc-buggy-tour.webp',
    target_url: '/partners',
    size: 'main',
    sort_order: 2,
  },
  {
    slot_key: 'main-3',
    title: 'My Phu Quoc Taxi Tour',
    subtitle: 'Island Sightseeing & Private Transfer',
    image_url: '/banners/phu-quoc-taxi-tour.webp',
    target_url: '/partners',
    size: 'main',
    sort_order: 3,
  },
]
