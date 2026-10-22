'use client'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import Link from 'next/link'
import { localePath, stripLocalePrefix } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section
        className="shell"
        style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}
      >
        <span className="eyebrow">{dict.errors.errorEyebrow}</span>
        <h1>{dict.errors.errorTitle}</h1>
        <p style={{ marginTop: '20px', marginBottom: '40px' }}>{dict.errors.errorDesc}</p>
        <button onClick={() => reset()} className="primaryButton">
          {dict.errors.tryAgain}
        </button>
      </section>
    </main>
  )
}
