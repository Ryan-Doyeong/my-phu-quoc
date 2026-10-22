"use client"

import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export function HeroSearch({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  return (
    <form action={localePath(locale, '/search')} method="get" className="heroSearch">
      <span>⌕</span>
      <input
        name="q"
        aria-label={dict.nav.search}
        placeholder={dict.home.heroSearchPlaceholder}
      />
      <button>{dict.home.heroSearchButton}</button>
    </form>
  )
}
