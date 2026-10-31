import type { Metadata } from 'next'
import { EmergencyLandingPage } from '@/components/EmergencyLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateEmergencyMetadata(locale: Locale = 'ko'): Metadata {
  const path = '/emergency'
  const title = locale === 'ko' ? '긴급상황 안내 | My Phu Quoc' : 'Emergency Guide | My Phu Quoc'
  const description =
    locale === 'ko'
      ? '선셋타운 및 켐비치 여행자를 위한 푸꾸옥 남부 응급 의료 및 안전 연락망 안내입니다.'
      : 'Emergency numbers, hospitals, and safety support for Southern Phu Quoc travelers.'
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

export function renderEmergencyRoute(locale: Locale = 'ko') {
  return <EmergencyLandingPage locale={locale} />
}
