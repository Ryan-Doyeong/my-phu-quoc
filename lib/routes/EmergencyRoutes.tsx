// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import type { Metadata } from 'next'
import { EmergencyLandingPage } from '@/components/EmergencyLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

// vi is not an active locale; it falls back to en.
const TITLES: Record<string, string> = {
    ko: "긴급상황 안내 | My Phu Quoc",
    en: "Emergency Guide | My Phu Quoc",
    zh: "紧急情况指南 | My Phu Quoc",
    ru: "Экстренные ситуации | My Phu Quoc",
    ja: "緊急時のご案内 | My Phu Quoc",
    hi: "आपातकालीन मार्गदर्शिका | My Phu Quoc",
  }

const DESCRIPTIONS: Record<string, string> = {
    ko: "선셋타운 및 켐비치 여행자를 위한 푸꾸옥 남부 응급 의료 및 안전 연락망 안내입니다.",
    en: "Emergency medical and safety contact information for travelers in Sunset Town and Khem Beach, Southern Phu Quoc.",
    zh: "为日落小镇和 凯姆海滩游客提供的富国岛南部紧急医疗与安全联络信息。",
    ru: "Экстренная медицинская помощь и контакты служб безопасности для путешественников в Сансет Тауне и на пляже Бай Кхем на юге Фукуока.",
    ja: "サンセットタウンとケムビーチを訪れる旅行者のための、フーコック島南部の救急医療・安全連絡先のご案内です。",
    hi: "फु क्वोक के दक्षिण में सनसेट टाउन और खेम बीच के यात्रियों के लिए आपातकालीन चिकित्सा और सुरक्षा संपर्क जानकारी।",
  }

export function generateEmergencyMetadata(locale: Locale = 'en'): Metadata {
  const path = '/emergency'
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

export function renderEmergencyRoute(locale: Locale = 'en') {
  return <EmergencyLandingPage locale={locale} />
}
