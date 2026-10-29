"use client"

import { Suspense, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  LOCALES,
  LOCALE_NATIVE_NAMES,
  LOCALE_COOKIE_NAME,
  LEGACY_LOCALE_COOKIE_NAME,
  localePath,
  stripLocalePrefix,
  type Locale,
} from '@/lib/i18n/config'

type Variant = 'hero' | 'light'

function rootClass(variant: Variant) {
  return `langSwitcher ${variant === 'hero' ? 'langSwitcherHero' : 'langSwitcherLight'}`
}

const SELECT_LANGUAGE_LABEL: Record<Locale, (cur: string) => string> = {
  ko: (c) => `언어 선택 (현재: ${c})`,
  en: (c) => `Select language (Current: ${c})`,
  vi: (c) => `Chọn ngôn ngữ (Hiện tại: ${c})`,
  zh: (c) => `选择语言（当前：${c}）`,
  ru: (c) => `Выбор языка (Текущий: ${c})`,
  ja: (c) => `言語を選択（現在: ${c}）`,
  hi: (c) => `भाषा चुनें (वर्तमान: ${c})`,
}

function LanguageSwitcherInner({ locale, variant = 'light' }: { locale: Locale; variant?: Variant }) {
  const pathname = usePathname() || '/'
  const searchParams = useSearchParams()
  const { barePath } = stripLocalePrefix(pathname)
  const [isOpen, setIsOpen] = useState(searchParams.get('openLang') === '1')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sp = new URLSearchParams(searchParams?.toString() || '')
  sp.delete('lang')
  const qs = sp.toString()

  function handleSelect(targetLocale: Locale) {
    try {
      document.cookie = `${LOCALE_COOKIE_NAME}=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
      document.cookie = `${LEGACY_LOCALE_COOKIE_NAME}=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // ignore cookie error
    }
    setIsOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const hrefFor = (loc: Locale) => {
    const baseTarget = localePath(loc, barePath)
    return qs ? `${baseTarget}?${qs}` : baseTarget
  }

  const currentNativeName = LOCALE_NATIVE_NAMES[locale] || 'English'

  return (
    <div className={rootClass(variant)} ref={dropdownRef}>
      <div className="prominentLangContainer">
        <button
          type="button"
          className="prominentLangBtn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={(SELECT_LANGUAGE_LABEL[locale] || SELECT_LANGUAGE_LABEL.en)(currentNativeName)}
        >
          <span className="langGlobe" aria-hidden="true">🌐</span>
          <span className="langCurrentName">{currentNativeName}</span>
          <span className="langArrow" aria-hidden="true">{isOpen ? '▴' : '▾'}</span>
        </button>

        {isOpen && (
          <div className="prominentLangMenu" role="listbox" aria-label="Languages">
            {LOCALES.map((loc) => {
              const isActive = loc === locale
              return (
                <a
                  key={loc}
                  href={hrefFor(loc)}
                  hrefLang={loc}
                  lang={loc}
                  role="option"
                  aria-selected={isActive}
                  className={`prominentLangItem ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelect(loc)}
                >
                  <span className="langOptionName">{LOCALE_NATIVE_NAMES[loc]}</span>
                  {isActive && <span className="langCheckMark" aria-hidden="true">✓</span>}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function LanguageSwitcher({ locale, variant = 'light' }: { locale: Locale; variant?: Variant }) {
  const currentNativeName = LOCALE_NATIVE_NAMES[locale] || 'English'
  return (
    <Suspense
      fallback={
        <div className={rootClass(variant)}>
          <button type="button" className="prominentLangBtn" disabled>
            <span className="langGlobe">🌐</span>
            <span className="langCurrentName">{currentNativeName}</span>
            <span className="langArrow">▾</span>
          </button>
        </div>
      }
    >
      <LanguageSwitcherInner locale={locale} variant={variant} />
    </Suspense>
  )
}
