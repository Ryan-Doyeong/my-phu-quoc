// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
// 2026-10-31 일정 자동 생성기 전환: ko·en 갱신, zh/ru/ja/hi 문구는 재번역 필요 (ChatGPT 검수 대기)
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
    ko: "푸꾸옥 여행 일정 자동 만들기 | My Phu Quoc",
    en: "Phu Quoc Trip Planner | My Phu Quoc",
    zh: "推荐主题行程 | My Phu Quoc",
    ru: "Тематические маршруты | My Phu Quoc",
    ja: "おすすめテーマ別プラン | My Phu Quoc",
    hi: "थीम यात्रा-कार्यक्रम | My Phu Quoc",
  }

const DESCRIPTIONS: Record<string, string> = {
    ko: "도착 시간·동행·여행 목적만 고르면 심포니 오브 더 씨, 키스 오브 더 씨, 호핑 투어까지 푸꾸옥 일정을 시간대별로 자동으로 짜 드려요.",
    en: "Pick your arrival time, companions and interests — we build an hour-by-hour Phu Quoc plan with the must-see shows, island hopping and more.",
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
