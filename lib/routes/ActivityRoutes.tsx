import type { Metadata } from 'next'
import { ActivitiesLandingPage } from '@/components/ActivitiesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateActivitiesMetadata(locale: Locale = 'ko'): Metadata {
  const path = '/activities'
  const title = locale === 'ko' ? '액티비티 | My Phu Quoc' : 'Activities | My Phu Quoc'
  const description =
    locale === 'ko'
      ? '푸꾸옥 남부 선셋타운과 켐비치에서 즐길 수 있는 대표 해양 액티비티 및 투어 프로그램 안내입니다.'
      : 'Discover top ocean activities and tour experiences across Southern Phu Quoc.'
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

export function renderActivitiesRoute(locale: Locale = 'ko') {
  return <ActivitiesLandingPage locale={locale} />
}
