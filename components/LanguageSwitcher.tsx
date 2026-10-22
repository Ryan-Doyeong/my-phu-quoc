"use client"

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE_NAME, localePath, stripLocalePrefix, type Locale } from '@/lib/i18n/config'

function LanguageSwitcherInner({
  locale,
  variant = 'light',
}: {
  locale: Locale
  variant?: 'hero' | 'light'
}) {
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

  return (
    <div
      className={`langSwitcher ${variant === 'hero' ? 'langSwitcherHero' : 'langSwitcherLight'}`}
      role="group"
      aria-label="Language switcher / Chuyển ngôn ngữ / 언어 전환"
    >
      {LOCALES.map((loc) => {
        const baseTarget = localePath(loc, barePath)
        const href = qs ? `${baseTarget}?${qs}` : baseTarget
        const isActive = loc === locale
        return (
          <a
            key={loc}
            href={href}
            className={`langSwitchBtn ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => handleSelect(loc)}
          >
            {LOCALE_LABELS[loc]}
          </a>
        )
      })}
    </div>
  )
}

export function LanguageSwitcher({
  locale,
  variant = 'light',
}: {
  locale: Locale
  variant?: 'hero' | 'light'
}) {
  const pathname = usePathname() || '/'
  const { barePath } = stripLocalePrefix(pathname)
  return (
    <Suspense
      fallback={
        <div
          className={`langSwitcher ${variant === 'hero' ? 'langSwitcherHero' : 'langSwitcherLight'}`}
          role="group"
          aria-label="Language switcher"
        >
          {LOCALES.map((loc) => (
            <a
              key={loc}
              href={localePath(loc, barePath)}
              className={`langSwitchBtn ${loc === locale ? 'active' : ''}`}
            >
              {LOCALE_LABELS[loc]}
            </a>
          ))}
        </div>
      }
    >
      <LanguageSwitcherInner locale={locale} variant={variant} />
    </Suspense>
  )
}
