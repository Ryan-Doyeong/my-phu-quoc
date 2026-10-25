import { SITE_URL } from '@/lib/supabase/config'

// My Phu Quoc — 7개 언어 (2026-10-22 확정)
// en(기본, 접두사 없음) · vi · hi · zh(간체) · ru · ko · ja
export const SUPPORTED_LOCALES = ['en', 'vi', 'hi', 'zh', 'ru', 'ko', 'ja'] as const
export const LOCALES = SUPPORTED_LOCALES
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type PrefixedLocale = Exclude<Locale, 'en'>
export const PREFIXED_LOCALES = SUPPORTED_LOCALES.filter((l) => l !== 'en') as PrefixedLocale[]
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE_NAME = 'mpq_lang'

/** 헤더 버튼에 쓰는 짧은 코드 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  vi: 'VI',
  hi: 'HI',
  zh: '中文',
  ru: 'RU',
  ko: 'KO',
  ja: 'JA',
}

/** 드롭다운에 쓰는 자국어 이름 */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  hi: 'हिन्दी',
  zh: '简体中文',
  ru: 'Русский',
  ko: '한국어',
  ja: '日本語',
}

/** hi/zh/ru/ja 는 처음에 "AI 검수 완료 / 원어민 미확인" 상태 (내부 관리용, 방문자 비노출) */
export const AI_REVIEWED_LOCALES: readonly Locale[] = ['hi', 'zh', 'ru', 'ja']

export function isValidLocale(value: unknown): value is Locale {
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
  vi: 'vi',
  hi: 'hi',
  zh: 'zh-Hans',
  ru: 'ru',
  ko: 'ko',
  ja: 'ja',
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
