import { SITE_URL } from '@/lib/supabase/config'

export const SUPPORTED_LOCALES = ['en', 'vi', 'ko'] as const
export const LOCALES = SUPPORTED_LOCALES
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type PrefixedLocale = 'vi' | 'ko'
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE_NAME = 'gl_lang'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  vi: 'VI',
  ko: 'KO',
}

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export function isPrefixedLocale(value: unknown): value is PrefixedLocale {
  return value === 'vi' || value === 'ko'
}

export function normalizeLocale(value?: string | null): Locale {
  if (isValidLocale(value)) return value
  return DEFAULT_LOCALE
}

export function stripLocalePrefix(pathname: string): { locale: Locale; barePath: string } {
  const clean = pathname || '/'
  if (clean === '/vi' || clean.startsWith('/vi/')) {
    return { locale: 'vi', barePath: clean.slice(3) || '/' }
  }
  if (clean === '/ko' || clean.startsWith('/ko/')) {
    return { locale: 'ko', barePath: clean.slice(3) || '/' }
  }
  if (clean === '/en' || clean.startsWith('/en/')) {
    return { locale: 'en', barePath: clean.slice(3) || '/' }
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

export function buildAlternates(
  barePath: string = '/',
  availableLocales: readonly Locale[] = SUPPORTED_LOCALES,
  baseUrl: string = SITE_URL
) {
  const languages: Record<string, string> = {}
  for (const loc of availableLocales) {
    languages[loc] = localeUrl(loc, barePath, baseUrl)
  }
  if (availableLocales.includes('en')) {
    languages['x-default'] = localeUrl('en', barePath, baseUrl)
  }
  return {
    canonical: localeUrl('en', barePath, baseUrl),
    languages,
  }
}

export function dateLocaleFor(locale: Locale): string {
  if (locale === 'vi') return 'vi-VN'
  if (locale === 'ko') return 'ko-KR'
  return 'en-US'
}

export function ogLocaleFor(locale: Locale): string {
  if (locale === 'vi') return 'vi_VN'
  if (locale === 'ko') return 'ko_KR'
  return 'en_US'
}
