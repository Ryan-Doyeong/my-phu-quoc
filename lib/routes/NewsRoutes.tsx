import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ArticleBody } from '@/components/ArticleBody'
import { EventsBoard } from '@/components/EventsBoard'
import { imageUrl } from '@/lib/imageUrl'
import {
  PUBLISHED_EVENTS,
  SAMPLE_EVENTS,
  getEventProgressStatus,
  getEventStatusLabel,
  getSampleBadgeLabel,
  getSampleEventBySlug,
  isSampleEventSlug,
  isSampleEventsEnabled,
} from '@/lib/eventSamples'
import {
  buildAlternates,
  dateLocaleFor,
  localePath,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary, localizeStory } from '@/lib/i18n/dictionaries'

export async function generateNewsListMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/news'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  return {
    title: dict.news.metaTitle,
    description: dict.news.metaDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: dict.news.metaTitle,
      description: dict.news.metaDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderNewsListRoute(locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .neq('content_type', 'event') // 이벤트는 /events 게시판에서만 보여준다
    .order('published_at', { ascending: false })
    .limit(60)

  const dbSlugs = new Set((data || []).map((s: any) => s.slug))
  const inRepoStories = PUBLISHED_EVENTS.filter(
    (e) => e.status === 'published' && e.content_type !== 'event' && !dbSlugs.has(e.slug)
  )
  const allRaw = [...inRepoStories, ...(data || [])]
  const items = allRaw.map((raw) => localizeStory(raw, locale))

  return (
    <main>
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section className="newsHero">
        <div className="shell">
          <span className="eyebrow">{dict.news.eyebrow}</span>
          <h1>{dict.news.title}</h1>
          <p className="lead">{dict.news.lead}</p>
        </div>
      </section>
      <section className="shell newsListing">
        <div className="newsGridOnline">
          {items.map((x, i) => (
            <Link key={x.id} href={localePath(locale, `/news/${x.slug}`)}>
              <article className={i === 0 ? 'newsCardOnline featured' : 'newsCardOnline'}>
                {x.cover_image_url && (
                  <img
                    src={imageUrl(x.cover_image_url, i === 0 ? 900 : 600, 70)}
                    alt=""
                    {...(i === 0 ? { loading: 'eager', fetchPriority: 'high' } : { loading: 'lazy' })}
                    decoding="async"
                    width={i === 0 ? 900 : 600}
                    height={i === 0 ? 600 : 400}
                  />
                )}
                <div>
                  <span>
                    {x.content_type?.toUpperCase() || 'STORY'} · {x.category}
                  </span>
                  <h2>{x.title}</h2>
                  <p>{x.excerpt}</p>
                  <small>
                    {x.published_at
                      ? new Date(x.published_at).toLocaleDateString(dateLocaleFor(locale))
                      : ''}
                    {x.source_name ? ` · ${dict.news.sourcePrefix}: ${x.source_name}` : ''}
                  </small>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export async function generateArticleMetadata(
  slug: string,
  locale: Locale = 'en'
): Promise<Metadata> {
  const supabase = createPublicClient()
  const { data: dbRaw } = await supabase
    .from('stories')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  const raw = dbRaw || getSampleEventBySlug(slug)
  if (!raw) return { title: 'My Phu Quoc' }

  const x = localizeStory(raw, locale)
  const barePath = `${x.content_type === 'event' ? '/events' : '/news'}/${slug}`
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Only include locales that have an actual translation in hreflang!
  const availableLocales = x.availableLocales
  const alternates = buildAlternates(barePath, availableLocales)
  const isUntranslatedFallback = x.isUntranslatedFallback
  const isSample = Boolean(raw.is_sample || isSampleEventSlug(slug))

  // For untranslated fallback pages on /vi/news/[slug] or /ko/news/[slug],
  // set robots: noindex, follow and use self-referencing canonical (Alternative 1).
  // For sample posts, strictly block indexing and following (noindex, nofollow).
  const canonicalUrl = localeUrl(locale, barePath)

  const ogImageUrl = x.cover_image_url
    ? x.cover_image_url.startsWith('http')
      ? x.cover_image_url
      : `${baseUrl}${x.cover_image_url.startsWith('/') ? '' : '/'}${x.cover_image_url}`
    : undefined

  return {
    title: x.seo_title || `${x.title} | My Phu Quoc`,
    description: x.seo_description || x.excerpt || undefined,
    robots: isSample
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : isUntranslatedFallback
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: x.seo_title || x.title,
      description: x.seo_description || x.excerpt || undefined,
      url: canonicalUrl,
      type: 'article',
      locale: ogLocaleFor(isUntranslatedFallback ? 'en' : locale),
      images: ogImageUrl ? [{ url: ogImageUrl, alt: x.title }] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export async function renderArticleRoute(
  slug: string,
  locale: Locale = 'en',
  section: 'news' | 'events' = 'news'
) {
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  const { data: dbRaw } = await supabase
    .from('stories')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  const raw = dbRaw || getSampleEventBySlug(slug)
  if (!raw) notFound()

  const x = localizeStory(raw, locale)
  // 뉴스와 이벤트는 별도 게시판: 글 종류와 주소가 다르면 올바른 주소로 이동
  const expectedSection = x.content_type === 'event' ? 'events' : 'news'
  if (section !== expectedSection) redirect(localePath(locale, `/${expectedSection}/${slug}`))
  const keyPoints = Array.isArray(x.key_points) ? x.key_points : []
  const tags = Array.isArray(x.tags) ? x.tags : []
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = localeUrl(locale, `/${expectedSection}/${slug}`)
  const isUntranslatedFallback = x.isUntranslatedFallback
  const isEvent = x.content_type === 'event'
  const isSample = Boolean(raw.is_sample || isSampleEventSlug(slug))
  const eventEndDate: string | null = x.event_end_date || (isEvent ? x.effective_date : null) || null
  const eventProgressStatus = isEvent ? getEventProgressStatus(x.event_date, eventEndDate) : null
  const eventStatusLabel = getEventStatusLabel(eventProgressStatus, locale)

  const absCoverImage = x.cover_image_url
    ? x.cover_image_url.startsWith('http')
      ? x.cover_image_url
      : `${baseUrl}${x.cover_image_url.startsWith('/') ? '' : '/'}${x.cover_image_url}`
    : undefined

  const articleLd: any = {
    '@context': 'https://schema.org',
    '@type': x.content_type === 'news' || x.content_type === 'guide' ? 'NewsArticle' : 'Article',
    headline: x.title,
    inLanguage: isUntranslatedFallback ? 'en' : locale,
    author: { '@type': 'Organization', name: 'My Phu Quoc' },
    publisher: { '@type': 'Organization', name: 'My Phu Quoc' },
    mainEntityOfPage: articleUrl,
  }
  if (x.seo_description || x.excerpt) articleLd.description = x.seo_description || x.excerpt
  if (absCoverImage) articleLd.image = absCoverImage
  if (x.published_at) articleLd.datePublished = x.published_at
  if (x.updated_at) articleLd.dateModified = x.updated_at

  const faqLd: any =
    Array.isArray(x.faqs) && x.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: x.faqs.map((f: any) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null

  const eventLd: any = isEvent
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: x.title,
        description: x.seo_description || x.excerpt || undefined,
        startDate: x.event_date || x.published_at || undefined,
        endDate: eventEndDate || x.event_date || undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        inLanguage: isUntranslatedFallback ? 'en' : locale,
        url: articleUrl,
        image: absCoverImage ? [absCoverImage] : undefined,
        location: {
          '@type': 'Place',
          name: x.event_location || 'Sunset Town, An Thoi, Phu Quoc',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Phú Quốc',
            addressRegion: 'An Giang',
            addressCountry: 'VN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'My Phu Quoc',
          url: baseUrl,
        },
      }
    : null

  const breadcrumbLd: any = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: isEvent
      ? [
          { '@type': 'ListItem', position: 1, name: dict.nav.home, item: localeUrl(locale, '/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: dict.nav.events,
            item: localeUrl(locale, '/events'),
          },
          { '@type': 'ListItem', position: 3, name: x.title, item: articleUrl },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: dict.nav.home, item: localeUrl(locale, '/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: dict.nav.newsAndBlog,
            item: localeUrl(locale, '/news'),
          },
          { '@type': 'ListItem', position: 3, name: x.title, item: articleUrl },
        ],
  }

  const structuredData = [
    articleLd,
    breadcrumbLd,
    ...(eventLd ? [eventLd] : []),
    ...(faqLd ? [faqLd] : []),
  ]

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <article className="onlineArticle richArticle">
        {isEvent && (
          <div className="eventDetailBackRow">
            <Link href={localePath(locale, '/events')} className="eventDetailBackLink">
              {dict.news.eventsBackToList}
            </Link>
          </div>
        )}
        {isSample && (
          <div className="eventSampleNoticeBar detail" role="note">
            <span className="sampleBadge">{getSampleBadgeLabel(locale)}</span>
            <span>{dict.news.eventsSampleNotice}</span>
          </div>
        )}
        {isUntranslatedFallback && dict.news.untranslatedFallbackNotice && (
          <div className="untranslatedBanner" role="status">
            <span>🌐</span>
            <span>
              <strong>{dict.news.untranslatedFallbackTitle}:</strong>{' '}
              {dict.news.untranslatedFallbackNotice}
            </span>
          </div>
        )}
        <div className="articleEyebrowRow">
          <span className="eyebrow">
            {x.content_type?.toUpperCase() || 'STORY'} · {x.category}
          </span>
          {isSample && <span className="sampleBadge">{getSampleBadgeLabel(locale)}</span>}
          {isEvent && eventStatusLabel && (
            <span
              className={
                eventProgressStatus === 'ended'
                  ? 'eventStatusBadge ended'
                  : 'eventStatusBadge ongoing'
              }
            >
              {eventStatusLabel}
            </span>
          )}
        </div>
        <h1>{x.title}</h1>
        {x.subtitle && <p className="articleSubtitle">{x.subtitle}</p>}
        <p className="articleDeck">{x.excerpt}</p>
        {isEvent && (x.event_date || eventEndDate || x.event_location) && (
          <div className="eventDetailInfoBox">
            {(x.event_date || eventEndDate) && (
              <div className="eventDetailInfoItem">
                <strong>{dict.news.eventsDateLabel}</strong>
                <span>
                  {x.event_date
                    ? new Date(x.event_date).toLocaleDateString(dateLocaleFor(locale), {
                        timeZone: 'Asia/Ho_Chi_Minh',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : ''}
                  {eventEndDate &&
                  (!x.event_date ||
                    new Date(eventEndDate).toLocaleDateString('en-CA', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                    }) !==
                      new Date(x.event_date).toLocaleDateString('en-CA', {
                        timeZone: 'Asia/Ho_Chi_Minh',
                      }))
                    ? ` – ${new Date(eventEndDate).toLocaleDateString(dateLocaleFor(locale), {
                        timeZone: 'Asia/Ho_Chi_Minh',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}`
                    : x.event_date && eventEndDate && x.event_date !== eventEndDate
                    ? ` · ${new Date(x.event_date).toLocaleTimeString('en-GB', {
                        timeZone: 'Asia/Ho_Chi_Minh',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}–${new Date(eventEndDate).toLocaleTimeString('en-GB', {
                        timeZone: 'Asia/Ho_Chi_Minh',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : ''}
                </span>
              </div>
            )}
            {x.event_location && (
              <div className="eventDetailInfoItem">
                <strong>{dict.news.eventsLocationLabel}</strong>
                <span>{x.event_location}</span>
              </div>
            )}
            {eventStatusLabel && (
              <div className="eventDetailInfoItem status">
                <span
                  className={
                    eventProgressStatus === 'ended'
                      ? 'eventStatusBadge ended'
                      : 'eventStatusBadge ongoing'
                  }
                >
                  {eventStatusLabel}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="articleMetaRow">
          <div className="articleMeta">
            {x.author_name && (
              <span>
                {dict.news.byPrefix} {x.author_name}
              </span>
            )}
            {x.published_at && (
              <span>
                {new Date(x.published_at).toLocaleDateString(dateLocaleFor(locale), {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {!isEvent && x.effective_date && (
              <span>
                {dict.news.effectivePrefix}{' '}
                {new Date(x.effective_date).toLocaleDateString(dateLocaleFor(locale), {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
            {!isEvent && x.event_date && (
              <span>
                {dict.news.eventPrefix} {new Date(x.event_date).toLocaleString(dateLocaleFor(locale))}
              </span>
            )}
          </div>
          {tags.length > 0 && (
            <div className="tagList articleTags">
              {tags.slice(0, 8).map((t: string) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
        </div>
        {x.cover_image_url && (
          <figure className="articleHeroFigure">
            <img
              className="articleHero"
              src={imageUrl(x.cover_image_url || '/features/default_cover_1280.webp', 1400, 76)}
              alt={x.title}
              fetchPriority="high"
              decoding="async"
            />
            {x.hero_caption && <figcaption>{x.hero_caption}</figcaption>}
          </figure>
        )}
        {keyPoints.length > 0 && (
          <section className="keyPointsBox">
            <span className="eyebrow">{dict.news.keyPoints}</span>
            <ul>
              {keyPoints.map((k: string) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </section>
        )}
        {x.callout && <aside className="articleCallout">{x.callout}</aside>}
        <ArticleBody body={x.body} />
        {Array.isArray(x.gallery_urls) && x.gallery_urls.length > 0 && (
          <div className="articleGallery">
            {x.gallery_urls.map((p: string, i: number) => (
              <img key={i} src={imageUrl(p, 900, 70)} alt="" loading="lazy" decoding="async" />
            ))}
          </div>
        )}
        {x.source_name && (
          <div className="sourcePanel">
            <strong>{dict.news.sourcePrefix}</strong>
            <p>
              {x.source_name}
              {x.source_published_at
                ? ` · ${dict.news.publishedPrefix} ${new Date(
                    x.source_published_at
                  ).toLocaleDateString(dateLocaleFor(locale), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}`
                : ''}
            </p>
            {x.source_url && (
              <a href={x.source_url} target="_blank" rel="noreferrer">
                {dict.news.openOriginalSource}
              </a>
            )}
          </div>
        )}
      </article>
    </main>
  )
}

export async function generateEventsMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/events'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  const title = `${dict.news.eventsTitle} | My Phu Quoc`
  return {
    title,
    description: dict.news.eventsLead,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description: dict.news.eventsLead,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderEventsRoute(locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const supabase = createPublicClient()
  const { data } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'published')
    .eq('content_type', 'event')
    .order('published_at', { ascending: false })

  const dbEvents = data || []
  const dbSlugs = new Set(dbEvents.map((row: any) => row.slug))
  const publishedStaticEvents = PUBLISHED_EVENTS.filter((e) => !dbSlugs.has(e.slug))
  const mergedRaw = isSampleEventsEnabled()
    ? [
        ...dbEvents,
        ...publishedStaticEvents,
        ...SAMPLE_EVENTS.filter((sample) => !dbSlugs.has(sample.slug)),
      ]
    : [...dbEvents, ...publishedStaticEvents]

  const items = mergedRaw.map((raw) => localizeStory(raw, locale))

  return (
    <main>
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section className="newsHero eventsHeroCompact">
        <div className="shell">
          <span className="eyebrow">{dict.news.eventsEyebrow}</span>
          <h1>{dict.news.eventsTitle}</h1>
          <p className="lead">{dict.news.eventsLead}</p>
        </div>
      </section>
      <EventsBoard items={items} locale={locale} />
    </main>
  )
}
