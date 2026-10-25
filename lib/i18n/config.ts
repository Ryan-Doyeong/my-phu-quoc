import { SITE_URL } from '@/lib/supabase/config'

// My Phu Quoc — 6개 언어 (2026-10-25 4차 수정 지시 확정: 한국어·영어·중국어·러시아어·일본어·힌디어)
// 베트남어(vi)는 제외하되 관련 사전·코드는 복구 가능하도록 비활성화 보존
export const ALL_HISTORICAL_LOCALES = ['en', 'vi', 'hi', 'zh', 'ru', 'ko', 'ja'] as const
export const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'ru', 'ja', 'hi'] as const
export const LOCALES = SUPPORTED_LOCALES
export type HistoricalLocale = (typeof ALL_HISTORICAL_LOCALES)[number]
export type Locale = HistoricalLocale
export type ActiveLocale = (typeof SUPPORTED_LOCALES)[number]
export type PrefixedLocale = Exclude<ActiveLocale, 'en'>
export const PREFIXED_LOCALES = SUPPORTED_LOCALES.filter((l) => l !== 'en') as PrefixedLocale[]
export const DEFAULT_LOCALE: ActiveLocale = 'en'
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
export const LEGACY_LOCALE_COOKIE_NAME = 'mpq_lang'

/** 헤더 버튼에 쓰는 짧은 코드 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ko: 'KO',
  zh: '中文',
  ru: 'RU',
  ja: 'JA',
  hi: 'HI',
  vi: 'VI',
}

/** 드롭다운에 쓰는 자국어 이름 */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  zh: '简体中文',
  ru: 'Русский',
  ja: '日本語',
  hi: 'हिन्दी',
  vi: 'Tiếng Việt',
}

/** 브라우저 Accept-Language 헤더 분석하여 6개 지원 언어 중 최적 언어 판별 */
export function detectPreferredLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const clean = acceptLanguage.toLowerCase()
  
  // zh-CN, zh-TW, zh-HK, zh -> zh
  if (clean.includes('zh-cn') || clean.includes('zh-tw') || clean.includes('zh-hk') || clean.includes('zh-sg') || clean.startsWith('zh')) {
    return 'zh'
  }
  // ko-KR, ko -> ko
  if (clean.includes('ko-kr') || clean.startsWith('ko')) {
    return 'ko'
  }
  // ja-JP, ja -> ja
  if (clean.includes('ja-jp') || clean.startsWith('ja')) {
    return 'ja'
  }
  // ru-RU, ru -> ru
  if (clean.includes('ru-ru') || clean.startsWith('ru')) {
    return 'ru'
  }
  // hi-IN, hi -> hi
  if (clean.includes('hi-in') || clean.startsWith('hi')) {
    return 'hi'
  }

  // 기본은 영어
  return 'en'
}

/** hi/zh/ru/ja 는 처음에 "AI 검수 완료 / 원어민 미확인" 상태 (내부 관리용, 방문자 비노출) */
export const AI_REVIEWED_LOCALES: readonly Locale[] = ['hi', 'zh', 'ru', 'ja']

export function isValidLocale(value: unknown): value is ActiveLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export function isPrefixedLocale(value: unknown): value is PrefixedLocale {
  return typeof value === 'string' && value !== 'en' && isValidLocale(value)
}

export function normalizeLocale(value?: string | null): Locale {
  if (isValidLocale(value)) return value
  return DEFAULT_LOCALE
}

export function stripLocalePrefix(pathname: string): { locale: Locale; barePath: string } {
  const clean = pathname || '/'
  for (const loc of SUPPORTED_LOCALES) {
    const prefix = `/${loc}`
    if (clean === prefix || clean.startsWith(`${prefix}/`)) {
      return { locale: loc, barePath: clean.slice(prefix.length) || '/' }
    }
  }
  return { locale: 'en', barePath: clean.startsWith('/') ? clean : `/${clean}` }
}

export function localePath(locale: Locale, barePath: string = '/'): string {
  const normalized =
    !barePath || barePath === '/' ? '/' : barePath.startsWith('/') ? barePath : `/${barePath}`
  if (locale === 'en') {
    return normalized
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export function localeUrl(locale: Locale, barePath: string = '/', baseUrl: string = SITE_URL): string {
  const base = (baseUrl || SITE_URL).replace(/\/+$/, '')
  const p = localePath(locale, barePath)
  return `${base}${p}`
}

/** hreflang 값 (zh 는 간체이므로 zh-Hans) */
export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  ko: 'ko',
  zh: 'zh-Hans',
  ru: 'ru',
  ja: 'ja',
  hi: 'hi',
  vi: 'vi',
}

export function buildAlternates(
  barePath: string = '/',
  availableLocales: readonly Locale[] = SUPPORTED_LOCALES,
  baseUrl: string = SITE_URL
) {
  const languages: Record<string, string> = {}
  for (const loc of availableLocales) {
    languages[HREFLANG[loc]] = localeUrl(loc, barePath, baseUrl)
  }
  if (availableLocales.includes('en')) {
    languages['x-default'] = localeUrl('en', barePath, baseUrl)
  }
  return {
    canonical: localeUrl('en', barePath, baseUrl),
    languages,
  }
}

const DATE_LOCALES: Record<Locale, string> = {
  en: 'en-US',
  vi: 'vi-VN',
  hi: 'hi-IN',
  zh: 'zh-CN',
  ru: 'ru-RU',
  ko: 'ko-KR',
  ja: 'ja-JP',
}

const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  vi: 'vi_VN',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ru: 'ru_RU',
  ko: 'ko_KR',
  ja: 'ja_JP',
}

export function dateLocaleFor(locale: Locale): string {
  return DATE_LOCALES[locale] || 'en-US'
}

export function ogLocaleFor(locale: Locale): string {
  return OG_LOCALES[locale] || 'en_US'
}
