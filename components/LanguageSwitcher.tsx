"use client"

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_NATIVE_NAMES,
  LOCALE_COOKIE_NAME,
  localePath,
  stripLocalePrefix,
  type Locale,
} from '@/lib/i18n/config'

type Variant = 'hero' | 'light'

function rootClass(variant: Variant) {
  return `langSwitcher ${variant === 'hero' ? 'langSwitcherHero' : 'langSwitcherLight'}`
}

function LanguageSwitcherInner({ locale, variant = 'light' }: { locale: Locale; variant?: Variant }) {
  const pathname = usePathname() || '/'
  const searchParams = useSearchParams()
  const { barePath } = stripLocalePrefix(pathname)

  const sp = new URLSearchParams(searchParams?.toString() || '')
  sp.delete('lang')
  const qs = sp.toString()

  function handleSelect(targetLocale: Locale) {
    try {
      document.cookie = `${LOCALE_COOKIE_NAME}=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // ignore cookie error
    }
  }

  const hrefFor = (loc: Locale) => {
    const baseTarget = localePath(loc, barePath)
    return qs ? `${baseTarget}?${qs}` : baseTarget
  }

  return (
    <div className={rootClass(variant)}>
      {/* PC: 버튼 7개 */}
      <div className="langButtons" role="group" aria-label="Language">
        {LOCALES.map((loc) => {
          const isActive = loc === locale
          return (
            <a
              key={loc}
              href={hrefFor(loc)}
              hrefLang={loc}
              lang={loc}
              className={`langSwitchBtn ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleSelect(loc)}
            >
              {LOCALE_LABELS[loc]}
            </a>
          )
        })}
      </div>
      {/* 모바일: 🌐 EN ▾ 드롭다운 */}
      <details className="langDropdown">
        <summary aria-label="Language">
          <span aria-hidden="true">🌐</span> {LOCALE_LABELS[locale]} <span aria-hidden="true">▾</span>
        </summary>
        <ul className="langMenu">
          {LOCALES.map((loc) => (
            <li key={loc}>
              <a
                href={hrefFor(loc)}
                hrefLang={loc}
                lang={loc}
                className={loc === locale ? 'active' : ''}
                aria-current={loc === locale ? 'page' : undefined}
                onClick={() => handleSelect(loc)}
              >
                {LOCALE_NATIVE_NAMES[loc]}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export function LanguageSwitcher({ locale, variant = 'light' }: { locale: Locale; variant?: Variant }) {
  const pathname = usePathname() || '/'
  const { barePath } = stripLocalePrefix(pathname)
  return (
    <Suspense
      fallback={
        <div className={rootClass(variant)}>
          <div className="langButtons" role="group" aria-label="Language">
            {LOCALES.map((loc) => (
              <a
                key={loc}
                href={localePath(loc, barePath)}
                lang={loc}
                className={`langSwitchBtn ${loc === locale ? 'active' : ''}`}
              >
                {LOCALE_LABELS[loc]}
              </a>
            ))}
          </div>
        </div>
      }
    >
      <LanguageSwitcherInner locale={locale} variant={variant} />
    </Suspense>
  )
}
