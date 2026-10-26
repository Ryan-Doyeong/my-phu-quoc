import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { DirectoryBrowser } from '@/components/DirectoryBrowser'
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CATEGORY_KEYS,
  categoryLabel,
  categoryEyebrow,
  categoryDescription,
  isDirectoryCategory,
  mergeDirectoryCategoryAppearance,
} from '@/lib/directory'
import { buildAlternates, localePath, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import businessesRegistry from '@/data/businesses-registry.json'

export async function generateDirectoryMetadata(
  category: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  if (!isDirectoryCategory(category)) return {}
  const label = categoryLabel(category, locale)
  const description = categoryDescription(category, locale)
  const title =
    locale === 'vi'
      ? `${label} tại Sunset Town | My Phu Quoc`
      : locale === 'ko'
      ? `선셋타운 ${label} | 마이 푸꾸옥 (My Phu Quoc)`
      : `${label} in Sunset Town | My Phu Quoc`
  const barePath = `/directory/${category}`
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderDirectoryRoute(category: string, locale: Locale = 'en') {
  if (!isDirectoryCategory(category)) notFound()
  const dict = getDictionary(locale)
  const label = categoryLabel(category, locale)
  const eyebrow = categoryEyebrow(category, locale)
  const description = categoryDescription(category, locale)
  const supabase = createPublicClient()
  const [{ data }, { data: categorySettingRow }] = await Promise.all([
    supabase
      .from('businesses')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .order('google_review_count', { ascending: false, nullsFirst: false }),
    supabase.from('site_settings').select('value').eq('key', 'directory_categories').maybeSingle(),
  ])
  const categoryAppearance = mergeDirectoryCategoryAppearance(categorySettingRow?.value)
  const icon = categoryAppearance[category]
  const rawConfig = DIRECTORY_CATEGORIES[category]
  const theme = rawConfig.theme
  const items =
    data && data.length > 0
      ? data
      : (businessesRegistry as any[]).filter((b) => b.category === category)

  return (
    <main className="directoryPage">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
            {DIRECTORY_CATEGORY_KEYS.map((key) => (
              <Link href={localePath(locale, `/directory/${key}`)} key={key}>
                {categoryLabel(key, locale)}
              </Link>
            ))}
            <Link href={localePath(locale, '/news')}>{dict.nav.news}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section
        className={`directoryHero categoryDirectoryHero theme-${theme}`}
        style={{
          background:
            theme === 'amber'
              ? 'linear-gradient(135deg, #9C4511 0%, #C86D2D 45%, #D47A3A 100%)'
              : 'linear-gradient(135deg, #06353E 0%, #0B7A8A 45%, #1693A5 100%)',
          color: '#FFFFFF',
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '48px 24px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          className="directoryHeroShade"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)',
          }}
        />
        <article
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Claude 5차/6차: 디렉토리 배너 접시 이모지 제거 (글자와 브랜드색 배경만) */}
          {icon.icon_url ? (
            <div
              className="directoryCategoryIcon"
              style={{
                fontSize: '44px',
                lineHeight: 1,
                marginBottom: '10px',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
              }}
            >
              <img src={icon.icon_url} alt={`${label} icon`} />
            </div>
          ) : null}
          <span
            className="eyebrow"
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: '12.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {dict.directory.heroEyebrowPrefix} · {eyebrow}
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '10px 0 14px',
              textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            }}
          >
            {label}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '16px',
              lineHeight: 1.55,
              margin: '0 auto',
              maxWidth: '640px',
              textShadow: '0 1px 4px rgba(0,0,0,0.25)',
            }}
          >
            {description} {dict.directory.heroDescSuffix}
          </p>
        </article>
      </section>
      <section className="shell directoryFull">
        <DirectoryBrowser
          category={category}
          items={items as any}
          shuffleSeed={String(Date.now())}
          locale={locale}
        />
      </section>
    </main>
  )
}
