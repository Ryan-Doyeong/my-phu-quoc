import type { Metadata } from 'next'
import { ActivitiesLandingPage } from '@/components/ActivitiesLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'

export function generateActivitiesMetadata(locale: Locale = 'en'): Metadata {
  const path = '/activities'
  const TITLE_MAP: Record<string, string> = {
    ko: '액티비티 | My Phu Quoc',
    en: 'Activities | My Phu Quoc',
    zh: '活动体验 | My Phu Quoc',
    ja: 'アクティビティ | My Phu Quoc',
    ru: 'Активности | My Phu Quoc',
    hi: 'गतिविधियाँ | My Phu Quoc',
    vi: 'Hoạt động & Tour | My Phu Quoc',
  }
  const DESC_MAP: Record<string, string> = {
    ko: '푸꾸옥 남부 선셋타운과 켐비치에서 즐길 수 있는 대표 해양 액티비티 및 투어 프로그램 안내입니다.',
    en: 'Discover top ocean activities and tour experiences across Southern Phu Quoc.',
    zh: '为您介绍富国岛南部日落小镇和凯姆海滩一带的代表性海上活动与旅游项目。',
    ja: 'フーコック島南部のサンセットタウンとケムビーチで楽しめる代表的なマリンアクティビティとツアーのご案内。',
    ru: 'Обзор основных морских активностей и туров в Сансет-Тауне и на пляже Кхем на юге Фукуока.',
    hi: 'दक्षिण फु क्वोक के सनसेट टाउन और खेम बीच में प्रमुख समुद्री गतिविधियों और टूर की जानकारी।',
    vi: 'Khám phá các hoạt động biển và tour trải nghiệm tiêu biểu tại Thị trấn Hoàng Hôn và Bãi Khem, Nam Phú Quốc.',
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

export function renderActivitiesRoute(locale: Locale = 'en') {
  return <ActivitiesLandingPage locale={locale} />
}
