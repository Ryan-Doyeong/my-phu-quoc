// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import type { Metadata } from 'next'
import { ItinerariesLandingPage } from '@/components/ItinerariesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

// vi is not an active locale; it falls back to en.
const TITLES: Record<string, string> = {
    ko: "추천 테마 일정 | My Phu Quoc",
    en: "Theme Itineraries | My Phu Quoc",
    zh: "推荐主题行程 | My Phu Quoc",
    ru: "Тематические маршруты | My Phu Quoc",
    ja: "おすすめテーマ別プラン | My Phu Quoc",
    hi: "थीम यात्रा-कार्यक्रम | My Phu Quoc",
  }

const DESCRIPTIONS: Record<string, string> = {
    ko: "푸꾸옥 남부 선셋타운과 켐비치를 가장 알차게 즐길 수 있는 여행 스타일별 맞춤 추천 코스 안내입니다.",
    en: "Curated travel courses tailored to your travel style, to help you get the most out of Sunset Town and Khem Beach in Southern Phu Quoc.",
    zh: "按旅行风格为您量身推荐的路线，帮助您充分玩转富国岛南部的日落小镇和 凯姆海滩。",
    ru: "Маршруты, подобранные по стилю путешествия, чтобы вы могли максимально насладиться Сансет Тауном и пляжем Бай Кхем на юге Фукуока.",
    ja: "フーコック島南部のサンセットタウンとケムビーチを存分に楽しめる、旅のスタイル別おすすめコースのご案内です。",
    hi: "यात्रा शैली के अनुसार तैयार किए गए सुझाए गए कोर्स, ताकि आप फु क्वोक के दक्षिण में सनसेट टाउन और खेम बीच का भरपूर आनंद ले सकें।",
  }

export function generateItinerariesMetadata(locale: Locale = 'en'): Metadata {
  const path = '/itineraries'
  const title = TITLES[locale] ?? TITLES.en
  const description = DESCRIPTIONS[locale] ?? DESCRIPTIONS.en
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
