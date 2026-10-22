"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, stripLocalePrefix } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default function NotFound() {
  const pathname = usePathname() || '/'
  const { locale } = stripLocalePrefix(pathname)
  const dict = getDictionary(locale)

  return (
    <main>
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section
        className="shell"
        style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}
      >
        <span className="eyebrow">{dict.errors.notFoundEyebrow}</span>
        <h1>{dict.errors.notFoundTitle}</h1>
        <p style={{ marginTop: '20px', marginBottom: '40px' }}>{dict.errors.notFoundDesc}</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={localePath(locale, '/')} className="primaryButton">
            {dict.errors.goHome}
          </Link>
          <Link href={localePath(locale, '/directory/wellness')} className="outlineDark">
            {dict.errors.browseDirectory}
          </Link>
        </div>
      </section>
    </main>
  )
}
