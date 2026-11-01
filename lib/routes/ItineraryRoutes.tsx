import type { Metadata } from 'next'
import { ItinerariesLandingPage } from '@/components/ItinerariesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateItinerariesMetadata(locale: Locale = 'ko'): Metadata {
  const path = '/itineraries'
  const title = locale === 'ko' ? '추천 테마 일정 | My Phu Quoc' : 'Theme Itineraries | My Phu Quoc'
  const description =
    locale === 'ko'
      ? '푸꾸옥 남부 선셋타운과 켐비치를 가장 알차게 즐길 수 있는 여행 스타일별 맞춤 추천 코스 안내입니다.'
      : 'Curated travel courses tailored for couples, families, solo travelers, and friends in Southern Phu Quoc.'
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

export function renderItinerariesRoute(locale: Locale = 'ko') {
  return <ItinerariesLandingPage locale={locale} />
}
