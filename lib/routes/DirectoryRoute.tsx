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

export async function generateDirectoryMetadata(
  category: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  if (!isDirectoryCategory(category)) return {}
  const label = categoryLabel(category, locale)
  const description = categoryDescription(category, locale)
  const title =
    locale === 'vi'
      ? `${label} tại Phú Quốc | Good Life`
      : locale === 'ko'
      ? `푸꾸옥 ${label} | Good Life`
      : `${label} in Phu Quoc | Good Life`
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
      <section className="directoryHero categoryDirectoryHero">
        <img src={rawConfig.image} alt="" />
        <div className="directoryHeroShade" />
        <article>
          <div className="directoryCategoryIcon">
            {icon.icon_url ? <img src={icon.icon_url} alt={`${label} icon`} /> : <span>{icon.icon_text}</span>}
          </div>
          <span className="eyebrow">
            {dict.directory.heroEyebrowPrefix} · {eyebrow}
          </span>
          <h1>{label}</h1>
          <p>
            {description} {dict.directory.heroDescSuffix}
          </p>
        </article>
      </section>
      <section className="shell directoryFull">
        <DirectoryBrowser
          category={category}
          items={(data || []) as any}
          shuffleSeed={String(Date.now())}
          locale={locale}
        />
      </section>
    </main>
  )
}
