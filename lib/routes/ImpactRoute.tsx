import Link from 'next/link'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { imageUrl } from '@/lib/imageUrl'
import { SuggestionForm } from '@/components/PublicForms'
import {
  buildAlternates,
  dateLocaleFor,
  localePath,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary, localizeStory } from '@/lib/i18n/dictionaries'

function topicLabel(value: string | null | undefined, locale: Locale) {
  const dict = getDictionary(locale)
  if (!value) return dict.impact.emptyEyebrow
  return (
    dict.impact.topics[value] ||
    value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

export async function generateImpactMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/impact'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  return {
    title: dict.impact.metaTitle,
    description: dict.impact.metaDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: dict.impact.metaTitle,
      description: dict.impact.metaDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

const TOPIC_KEYS = [
  '',
  'community-care',
  'volunteering-giving',
  'animal-welfare',
  'children-families',
  'neighborhood-projects',
] as const

export async function renderImpactRoute(topic: string | undefined, locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  let q = supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .eq('content_type', 'impact')
    .order('published_at', { ascending: false })

  if (topic) q = q.eq('impact_topic', topic)
  const { data } = await q
  const items = (data || []).map((raw: any) => localizeStory(raw, locale))
  const featured = items.find((x: any) => x.is_featured) || items[0]
  const rest = featured ? items.filter((x: any) => x.id !== featured.id) : items

  const baseImpactPath = localePath(locale, '/impact')

  return (
    <main>
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
            <Link href={localePath(locale, '/news/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/impact')}>{dict.nav.impact}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <section className="newsHero impactEditorialHero">
        <div className="shell">
          <span className="eyebrow">{dict.impact.eyebrow}</span>
          <h1>{dict.impact.title}</h1>
          <p className="lead">{dict.impact.lead}</p>
          <div className="impactFilter">
            {TOPIC_KEYS.map((val) => (
              <Link
                key={val || 'all'}
                className={(topic || '') === val ? 'active' : ''}
                href={val ? `${baseImpactPath}?topic=${val}` : baseImpactPath}
              >
                {dict.impact.topics[val] || val}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell impactEditorialSection">
        {featured ? (
          <>
            <div className="impactSectionHeading">
              <div>
                <span className="eyebrow">{dict.impact.featuredEyebrow}</span>
                <h2>{dict.impact.featuredTitle}</h2>
              </div>
            </div>
            <Link
              href={localePath(locale, `/news/${featured.slug}`)}
              className="impactFeaturedStory"
            >
              <img
                src={imageUrl(featured.cover_image_url || '/stock/cafe.webp', 1400, 76)}
                alt=""
                decoding="async"
              />
              <div className="impactFeaturedCopy">
                <span>{topicLabel(featured.impact_topic, locale)}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <small>
                  {featured.published_at
                    ? new Date(featured.published_at).toLocaleDateString(dateLocaleFor(locale), {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''}
                  {featured.author_name ? ` · ${featured.author_name}` : ''}
                </small>
                <strong>{dict.impact.readStory}</strong>
              </div>
            </Link>
          </>
        ) : null}

        <div className="impactSectionHeading impactLatestHeading">
          <div>
            <span className="eyebrow">{dict.impact.latestEyebrow}</span>
            <h2>{topic ? topicLabel(topic, locale) : dict.impact.latestDefaultTitle}</h2>
          </div>
          <Link href={localePath(locale, '/news')}>{dict.impact.viewAllNews}</Link>
        </div>

        {rest.length ? (
          <div className="impactArticleGrid">
            {rest.map((x: any) => (
              <Link
                key={x.id}
                href={localePath(locale, `/news/${x.slug}`)}
                className="impactArticleCard"
              >
                <img
                  src={imageUrl(x.cover_image_url || '/stock/cafe.webp', 900, 72)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span>{topicLabel(x.impact_topic, locale)}</span>
                  <h3>{x.title}</h3>
                  <p>{x.excerpt}</p>
                  <small>
                    {x.published_at
                      ? new Date(x.published_at).toLocaleDateString(dateLocaleFor(locale), {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        ) : !featured ? (
          <div className="impactEmptyState">
            <span className="eyebrow">{dict.impact.emptyEyebrow}</span>
            <h2>{dict.impact.emptyTitle}</h2>
            <p>{dict.impact.emptyDesc}</p>
          </div>
        ) : null}
      </section>

      <section className="shell impactTipSection" id="share-news">
        <div className="impactTipCard">
          <figure className="impactTipImage">
            <img
              src="/stock/ai/thao-dien-neighbors-dinner-v2.webp"
              alt="Neighbors of all ages sharing a long dinner table on a leafy Thao Dien lane"
              loading="lazy"
              decoding="async"
              width={1600}
              height={900}
            />
            <figcaption>{dict.impact.tipFigcaption}</figcaption>
          </figure>
          <div className="impactTipCopy">
            <span className="eyebrow">{dict.impact.tipEyebrow}</span>
            <h2>{dict.impact.tipTitle}</h2>
            <p>{dict.impact.tipDesc}</p>
            <ul>
              {dict.impact.tipBullets.map((bText, idx) => (
                <li key={idx}>{bText}</li>
              ))}
            </ul>
            <SuggestionForm
              locale={locale}
              types={[...dict.impact.tipTypes]}
              messageLabel={dict.impact.tipMessageLabel}
              messagePlaceholder={dict.impact.tipMessagePlaceholder}
              buttonLabel={dict.impact.tipButtonLabel}
              successMessage={dict.impact.tipSuccessMessage}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
