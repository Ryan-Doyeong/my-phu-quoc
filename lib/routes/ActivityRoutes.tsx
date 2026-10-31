// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import type { Metadata } from 'next'
import { ActivitiesLandingPage } from '@/components/ActivitiesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

// vi is not an active locale; it falls back to en.
const TITLES: Record<string, string> = {
    ko: "액티비티 | My Phu Quoc",
    en: "Activities | My Phu Quoc",
    zh: "活动体验 | My Phu Quoc",
    ru: "Активности | My Phu Quoc",
    ja: "アクティビティ | My Phu Quoc",
    hi: "गतिविधियाँ | My Phu Quoc",
  }

const DESCRIPTIONS: Record<string, string> = {
    ko: "푸꾸옥 남부 선셋타운과 켐비치에서 즐길 수 있는 대표 해양 액티비티 및 투어 프로그램 안내입니다.",
    en: "Discover top ocean activities and tour experiences across Southern Phu Quoc.",
    zh: "为您介绍富国岛南部日落小镇和 凯姆海滩一带的代表性海上活动与旅游项目。",
    ru: "Обзор основных морских активностей и туров, доступных в Сансет Тауне и на пляже Бай Кхем на юге Фукуока.",
    ja: "フーコック島南部のサンセットタウンとケムビーチで楽しめる、代表的なマリンアクティビティとツアープログラムのご案内です。",
    hi: "फु क्वोक के दक्षिण में सनसेट टाउन और खेम बीच पर आनंद लेने योग्य प्रमुख समुद्री गतिविधियों और टूर कार्यक्रमों की जानकारी।",
  }

export function generateActivitiesMetadata(locale: Locale = 'en'): Metadata {
  const path = '/activities'
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

export function renderActivitiesRoute(locale: Locale = 'en') {
  return <ActivitiesLandingPage locale={locale} />
}
