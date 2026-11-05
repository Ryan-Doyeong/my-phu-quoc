import type { Locale } from '@/lib/i18n/config'

export type UserPos = { lat: number; lng: number }

/** 두 좌표 사이의 직선거리(km) — haversine. 선셋타운 안에서는 직선거리로 충분함. */
export function distanceKm(a: UserPos, b: UserPos): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function businessPos(b: Record<string, any>): UserPos | null {
  const lat = Number(b.lat)
  const lng = Number(b.lng)
  if (b.lat == null || b.lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return { lat, lng }
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.max(10, Math.round((km * 1000) / 10) * 10)}m` : `${km.toFixed(1)}km`
}

type Copy = {
  button: string
  loading: string
  active: string
  denied: string
  error: string
  away: string
}

export const NEARBY_COPY: Record<string, Copy> = {
  ko: {
    button: '📍 내 위치에서 가까운 순으로 보기',
    loading: '위치 확인 중…',
    active: '마이푸꾸옥 추천 업체는 상단에 먼저 보여드리고, 나머지는 내 위치에서 가까운 순(직선거리)으로 정렬했어요.',
    denied: '위치 공유가 허용되지 않아 기본 순서로 보여드려요. 브라우저 설정에서 위치를 허용하면 가까운 순으로 볼 수 있어요.',
    error: '위치를 확인하지 못했어요. 기본 순서로 보여드려요.',
    away: '내 위치에서',
  },
  en: {
    button: '📍 Sort by distance from my location',
    loading: 'Finding your location…',
    active: 'My Phu Quoc recommended places stay at the top; all others are sorted by straight-line distance from your location.',
    denied: 'Location sharing was not allowed, so the default order is shown. Allow location in your browser to sort by distance.',
    error: 'Could not get your location. Showing the default order.',
    away: 'from you',
  },
  zh: {
    button: '📍 按离我最近排序',
    loading: '正在获取位置…',
    active: 'My Phu Quoc 推荐商家置顶显示，其余商家按距离您当前位置的直线距离由近到远排序。',
    denied: '未允许共享位置，已按默认顺序显示。在浏览器中允许定位后即可按距离排序。',
    error: '无法获取您的位置，已按默认顺序显示。',
    away: '距您',
  },
  ru: {
    button: '📍 Сортировать по расстоянию от меня',
    loading: 'Определяем местоположение…',
    active: 'Рекомендуемые My Phu Quoc места остаются вверху, остальные отсортированы по расстоянию по прямой от вашего местоположения.',
    denied: 'Доступ к геолокации не разрешён, показан порядок по умолчанию. Разрешите геолокацию в браузере, чтобы сортировать по расстоянию.',
    error: 'Не удалось определить местоположение. Показан порядок по умолчанию.',
    away: 'от вас',
  },
  ja: {
    button: '📍 現在地から近い順に表示',
    loading: '現在地を確認中…',
    active: 'My Phu Quoc のおすすめは上部に表示し、その他は現在地からの直線距離が近い順に並べています。',
    denied: '位置情報の共有が許可されていないため、標準の順序で表示しています。ブラウザで位置情報を許可すると近い順に並べられます。',
    error: '現在地を取得できませんでした。標準の順序で表示しています。',
    away: '現在地から',
  },
  hi: {
    button: '📍 मेरी लोकेशन से नज़दीकी क्रम में देखें',
    loading: 'आपकी लोकेशन पता की जा रही है…',
    active: 'My Phu Quoc की अनुशंसित जगहें ऊपर रहती हैं; बाकी सभी आपकी लोकेशन से सीधी दूरी के अनुसार नज़दीक से दूर क्रम में हैं।',
    denied: 'लोकेशन साझा करने की अनुमति नहीं मिली, इसलिए सामान्य क्रम दिखाया जा रहा है। दूरी के क्रम के लिए ब्राउज़र में लोकेशन की अनुमति दें।',
    error: 'आपकी लोकेशन नहीं मिल सकी। सामान्य क्रम दिखाया जा रहा है।',
    away: 'आपसे',
  },
  vi: {
    button: '📍 Sắp xếp theo khoảng cách từ vị trí của tôi',
    loading: 'Đang xác định vị trí của bạn…',
    active: 'Các địa điểm My Phu Quoc đề xuất vẫn ở đầu danh sách; những địa điểm còn lại được sắp xếp theo khoảng cách đường thẳng từ vị trí của bạn.',
    denied: 'Bạn chưa cho phép chia sẻ vị trí nên danh sách được hiển thị theo thứ tự mặc định. Hãy cho phép truy cập vị trí trong trình duyệt để sắp xếp theo khoảng cách.',
    error: 'Không thể xác định vị trí của bạn. Đang hiển thị thứ tự mặc định.',
    away: 'từ vị trí của bạn',
  },
}

export function nearbyCopy(locale: Locale): Copy {
  return NEARBY_COPY[locale] || NEARBY_COPY.en
}
