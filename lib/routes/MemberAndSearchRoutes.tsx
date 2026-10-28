import Link from 'next/link'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { DIRECTORY_CATEGORY_KEYS, categoryLabel, nearbyBadgeText, formatLocalizedAddress } from '@/lib/directory'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { stockPrimaryFor } from '@/lib/stockImages'
import { imageUrl } from '@/lib/imageUrl'
import { buildAlternates, localePath, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import {
  getDictionary,
  localizeStory,
  selectBusinessDescription,
  displayBusinessName,
  translateBadge,
  translateTerm,
} from '@/lib/i18n/dictionaries'

export async function generateMemberMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/member'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  return {
    title: dict.member.metaTitle,
    description: dict.member.metaDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: dict.member.metaTitle,
      description: dict.member.metaDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export function renderMemberRoute(locale: Locale = 'en') {
  const dict = getDictionary(locale)
  return (
    <main className="memberInfoPage">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.directory}</Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section className="memberHero">
        <div className="shell">
          <span className="eyebrow">{dict.member.eyebrow}</span>
          <h1>{dict.member.title}</h1>
          <p>{dict.member.lead}</p>
        </div>
      </section>
      <section className="shell memberInfoGrid">
        <article>
          <h2>{dict.member.whatItMeansTitle}</h2>
          <p>{dict.member.whatItMeansDesc}</p>
          <ul>
            {dict.member.whatItMeansBullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>{dict.member.whatItDoesNotMeanTitle}</h2>
          <p>{dict.member.whatItDoesNotMeanP1}</p>
          <p>{dict.member.whatItDoesNotMeanP2}</p>
        </article>
      </section>
      <section className="shell memberCallout">
        <h2>{dict.member.calloutTitle}</h2>
        <p>{dict.member.calloutDesc}</p>
        <Link href={localePath(locale, '/directory/wellness')} className="primaryButton">
          {dict.member.calloutCta}
        </Link>
      </section>
    </main>
  )
}

export async function generateSearchMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/search'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  return {
    title: dict.search.metaTitle,
    description: dict.search.metaDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: dict.search.metaTitle,
      description: dict.search.metaDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

function text(v: unknown) {
  return String(v || '').toLowerCase()
}

export async function renderSearchRoute(qRaw: string | undefined, locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const q = (qRaw || '').trim()
  const supabase = createPublicClient()
  const [{ data: businesses }, { data: stories }] = await Promise.all([
    supabase.from('businesses').select('*').eq('status', 'published').limit(200),
    supabase.from('stories').select('*').eq('status', 'published').limit(100),
  ])
  const needle = q.toLowerCase()
  const b = (businesses || []).filter(
    (x: any) =>
      !needle ||
      [
        x.public_name,
        displayBusinessName(x, locale),
        x.category,
        categoryLabel(x.category, locale),
        x.subcategory,
        x.subcategory ? translateTerm(x.subcategory, locale) : '',
        x.address,
        x.description_en,
        x.description_vi,
        x.description_ko,
        ...(x.tags || []),
        ...(x.tags || []).map((t: string) => translateTerm(t, locale)),
        ...(x.badges || []),
        nearbyBadgeText(x.address, x.tags, x.badges, locale) || '',
      ].some((v) => text(v).includes(needle))
  )
  const dbStorySlugs = new Set((stories || []).map((row: any) => row.slug))
  const mergedStories = [
    ...(stories || []),
    ...PUBLISHED_EVENTS.filter((e) => !dbStorySlugs.has(e.slug)),
  ]
  const localizedStories = mergedStories.map((raw: any) => localizeStory(raw, locale))
  const s = localizedStories.filter(
    (x: any) =>
      !needle || [x.title, x.category, x.excerpt, x.content_type].some((v) => text(v).includes(needle))
  )

  return (
    <main className="searchPage">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
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
      <section className="newsHero">
        <div className="shell">
          <span className="eyebrow">{dict.search.eyebrow}</span>
          <h1>{dict.search.title}</h1>
          <form action={localePath(locale, '/search')} method="get" className="searchPageForm">
            <input name="q" defaultValue={q} autoFocus placeholder={dict.search.placeholder} />
            <button className="primaryButton">{dict.search.button}</button>
          </form>
          {q && <p>{dict.search.resultCount(b.length, s.length, q)}</p>}
        </div>
      </section>
      <section className="shell searchResults">
        <div className="searchResultSection">
          <div className="directoryHeading">
            <h2>{dict.search.placesHeading}</h2>
          </div>
          <div className="fullBusinessGrid compactBusinessGrid">
            {b.slice(0, 60).map((x: any) => {
              const nearbyText = nearbyBadgeText(x.address, x.tags, x.badges, locale)
              const subLabel = x.subcategory
                ? translateTerm(x.subcategory, locale)
                : categoryLabel(x.category, locale)
              return (
                <Link
                  href={localePath(locale, `/business/${x.slug}`)}
                  key={x.id}
                  className="compactBusinessLink"
                >
                  <article className="directoryResult compactDirectoryCard">
                    <div className="resultImageWrap">
                      <img
                        src={imageUrl(
                          x.gallery_urls?.[0] || stockPrimaryFor(x.category, x.subcategory, x.tags),
                          620,
                          68
                        )}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="businessBadgeStack">
                        {(x.badges || []).slice(0, 3).map((badge: string) => (
                          <span key={badge} className={`businessBadge badge${badge.toLowerCase()}`}>
                            {translateBadge(badge, locale)}
                          </span>
                        ))}
                        {nearbyText &&
                          !(x.badges || []).some((badge: string) =>
                            badge.toLowerCase().includes('nearby')
                          ) && <span className="businessBadge badgenearby">{nearbyText}</span>}
                      </div>
                    </div>
                    <div className="compactBusinessBody">
                      <div className="resultMeta">
                        <span>
                          {subLabel}
                          {nearbyText ? ` · ${nearbyText}` : ''}
                        </span>
                        {x.google_rating && <strong>★ {Number(x.google_rating).toFixed(1)}</strong>}
                      </div>
                      <h3>{displayBusinessName(x, locale)}</h3>
                      <div className="tagList compactTags">
                        {(x.tags || []).slice(0, 3).map((t: string) => (
                          <span key={t}>{translateTerm(t, locale)}</span>
                        ))}
                      </div>
                      <p>{selectBusinessDescription(x, locale)}</p>
                      <small>{formatLocalizedAddress(x.address, locale)}</small>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
          {!b.length && <p className="muted">{dict.search.noPlace}</p>}
        </div>
        <div className="searchResultSection">
          <div className="directoryHeading">
            <h2>{dict.search.storiesHeading}</h2>
          </div>
          <div className="storyGrid">
            {s.slice(0, 12).map((x: any) => (
              <Link href={localePath(locale, `/news/${x.slug}`)} key={x.id}>
                <article className="storyCard">
                  {x.cover_image_url && (
                    <img
                      src={imageUrl(x.cover_image_url, 900, 70)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span>{x.category || x.content_type}</span>
                  <h3>{x.title}</h3>
                  <p>{x.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
          {!s.length && <p className="muted">{dict.search.noStory}</p>}
        </div>
      </section>
    </main>
  )
}
