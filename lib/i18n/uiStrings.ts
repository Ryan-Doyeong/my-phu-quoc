import type { Locale } from '@/lib/i18n/config'
import uiStringsJson from '@/data/i18n/translations/ui_strings.json'

export type UiStringId = keyof typeof uiStringsJson

interface UiStringEntry {
  en: string
  zh?: string
  ru?: string
  ja?: string
  hi?: string
  [key: string]: string | undefined
}

const UI_DATA = uiStringsJson as Record<string, UiStringEntry>

// Map keyed by exact English string and trimmed English string
const BY_EN = new Map<string, UiStringEntry>()

for (const [id, entry] of Object.entries(UI_DATA)) {
  if (entry && entry.en) {
    BY_EN.set(entry.en, entry)
    const trimmed = entry.en.trim()
    if (!BY_EN.has(trimmed)) {
      BY_EN.set(trimmed, entry)
    }
  }
}

/**
 * Look up localized string by English text.
 * Strictly preserves `en` output without alteration.
 * If locale is 'zh', 'ru', 'ja', or 'hi', returns translation if available;
 * otherwise falls back to enText.
 */
export function tUi(enText: string, locale: Locale = 'en'): string {
  if (!enText) return ''
  if (locale === 'en' || locale === 'ko' || locale === 'vi') {
    return enText
  }

  const entry = BY_EN.get(enText) || BY_EN.get(enText.trim())
  if (entry) {
    const val = entry[locale]
    if (val && typeof val === 'string' && val.trim().length > 0) {
      return val
    }
  }

  return enText
}

/**
 * Look up localized string by dictionary entry ID (e.g. 'U1', 'T1', etc.).
 */
export function tUiById(id: string, locale: Locale = 'en'): string {
  const entry = UI_DATA[id]
  if (!entry) return ''
  if (locale === 'en' || locale === 'ko' || locale === 'vi') {
    return entry.en || ''
  }
  const val = entry[locale]
  if (val && typeof val === 'string' && val.trim().length > 0) {
    return val
  }
  return entry.en || ''
}
