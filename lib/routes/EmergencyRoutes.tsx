import type { Metadata } from 'next'
import { EmergencyLandingPage } from '@/components/EmergencyLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateEmergencyMetadata(locale: Locale = 'en'): Metadata {
  const path = '/emergency'
  const TITLE_MAP: Record<string, string> = {
    ko: '긴급상황 안내 | My Phu Quoc',
    en: 'Emergency Guide | My Phu Quoc',
    zh: '紧急情况指南 | My Phu Quoc',
    ja: '緊急時のご案内 | My Phu Quoc',
    ru: 'Экстренная помощь | My Phu Quoc',
    hi: 'आपातकालीन सहायता गाइड | My Phu Quoc',
    vi: 'Hỗ trợ khẩn cấp | My Phu Quoc',
  }
  const DESC_MAP: Record<string, string> = {
    ko: '선셋타운 및 켐비치 여행자를 위한 푸꾸옥 남부 응급 의료 및 안전 연락망 안내입니다.',
    en: 'Emergency numbers, hospitals, and safety support for Southern Phu Quoc travelers.',
    zh: '面向富国岛南部日落小镇及凯姆海滩游客的紧急医疗与安全联系指南。',
    ja: 'サンセットタウン・ケムビーチ滞在中の緊急連絡先・病院・薬局のご案内。',
    ru: 'Экстренные телефоны, больницы и аптеки для путешественников на юге Фукуока.',
    hi: 'दक्षिण फू क्वोक के यात्रियों के लिए आपातकालीन नंबर, अस्पताल और फ़ार्मेसी की जानकारी।',
    vi: 'Hướng dẫn liên hệ khẩn cấp, bệnh viện và nhà thuốc cho du khách tại Nam Phú Quốc.',
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

export function renderEmergencyRoute(locale: Locale = 'en') {
  return <EmergencyLandingPage locale={locale} />
}
