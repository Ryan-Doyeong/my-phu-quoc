import type { Metadata } from 'next'
import { ItinerariesLandingPage } from '@/components/ItinerariesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateItinerariesMetadata(locale: Locale = 'en'): Metadata {
  const path = '/itineraries'
  const TITLE_MAP: Record<string, string> = {
    ko: '추천 테마 일정 | My Phu Quoc',
    en: 'Trip Planner & Itineraries | My Phu Quoc',
    zh: '推荐主题行程 | My Phu Quoc',
    ja: 'おすすめテーマ別モデルコース | My Phu Quoc',
    ru: 'Планировщик маршрутов | My Phu Quoc',
    hi: 'यात्रा कार्यक्रम प्लानर | My Phu Quoc',
    vi: 'Lịch trình gợi ý | My Phu Quoc',
  }
  const DESC_MAP: Record<string, string> = {
    ko: '푸꾸옥 남부 선셋타운과 켐비치를 가장 알차게 즐길 수 있는 여행 스타일별 맞춤 추천 코스 안내입니다.',
    en: 'Curated travel courses tailored for couples, families, solo travelers, and friends in Southern Phu Quoc.',
    zh: '根据您的航班、同行人员和旅行主题，为您定制富国岛南部日落小镇与凯姆海滩专属行程。',
    ja: 'フライト時間や同行者、旅の目的に合わせてフーコック島南部のモデルコースを自動作成します。',
    ru: 'Индивидуальные маршруты по югу Фукуока для пар, семей и компаний друзей.',
    hi: 'जोड़ों, परिवार और दोस्तों के लिए दक्षिण फु क्वोक की अनुकूलित यात्रा योजना।',
    vi: 'Lịch trình gợi ý theo phong cách du lịch tại Thị trấn Hoàng Hôn và Bãi Khem, Nam Phú Quốc.',
  }
  const title = TITLE_MAP[locale] || TITLE_MAP.en
  const description = DESC_MAP[locale] || DESC_MAP.en
  const canonical = localeUrl(locale, path)
  const alternates = buildAlternates(path)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'My Phu Quoc',
      locale: ogLocaleFor(locale),
      type: 'website',
    },
  }
}

export function renderItinerariesRoute(locale: Locale = 'en') {
  return <ItinerariesLandingPage locale={locale} />
}
