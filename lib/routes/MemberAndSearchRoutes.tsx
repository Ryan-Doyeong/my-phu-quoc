import Link from 'next/link'
import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import businessesRegistryJson from '@/data/businesses-registry.json'
import khemBusinesses from '@/data/khem-beach-businesses.json'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { DIRECTORY_CATEGORY_KEYS, getCategoryPublishedCount, categoryLabel, nearbyBadgeText, formatLocalizedAddress, isHiddenBusiness } from '@/lib/directory'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import { stockPrimaryFor } from '@/lib/stockImages'
import { getCoverPhoto } from '@/lib/coverPhotos'
import { getHotelBySlug } from '@/lib/hotels'
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

function normalizeSearch(v: unknown) {
  return String(v || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim()
}

const ZONE_BADGE_LABELS: Record<Locale, { sunset: string; khem: string }> = {
  ko: { sunset: '선셋타운', khem: '켐비치' },
  en: { sunset: 'Sunset Town', khem: 'Khem Beach' },
  vi: { sunset: 'Thị trấn Hoàng Hôn', khem: 'Bãi Khem' },
  zh: { sunset: '日落小镇', khem: 'Khem海滩' },
  ja: { sunset: 'サンセットタウン', khem: 'ケムビーチ' },
  ru: { sunset: 'Сансет-Таун', khem: 'Пляж Кхем' },
  hi: { sunset: 'सनसेट टाउन', khem: 'खेम बीच' },
}

const SEARCH_SUGGESTIONS: Record<Locale, { label: string; q: string }[]> = {
  ko: [
    { label: '키스브릿지', q: 'Kiss Bridge' },
    { label: '케이블카', q: 'Cable Car' },
    { label: '씨푸드 맛집', q: 'seafood' },
    { label: '루프탑 바', q: 'rooftop' },
    { label: '마사지·스파', q: 'spa' },
    { label: '환전·ATM', q: 'ATM' },
  ],
  en: [
    { label: 'Kiss Bridge', q: 'Kiss Bridge' },
    { label: 'Cable Car', q: 'Cable Car' },
    { label: 'Seafood', q: 'seafood' },
    { label: 'Rooftop Bar', q: 'rooftop' },
    { label: 'Spa & Massage', q: 'spa' },
    { label: 'ATM & Banking', q: 'ATM' },
  ],
  vi: [
    { label: 'Cầu Hôn', q: 'Cau Hon' },
    { label: 'Cáp treo', q: 'Cap treo' },
    { label: 'Hải sản', q: 'seafood' },
    { label: 'Chợ đêm VuiFest', q: 'VuiFest' },
    { label: 'Spa & Massage', q: 'spa' },
  ],
  zh: [
    { label: '接吻桥', q: 'Kiss Bridge' },
    { label: '跨海缆车', q: 'Cable Car' },
    { label: '海鲜餐厅', q: 'seafood' },
    { label: '水疗按摩', q: 'spa' },
  ],
  ja: [
    { label: 'キスブリッジ', q: 'Kiss Bridge' },
    { label: 'ケーブルカー', q: 'Cable Car' },
    { label: 'シーフード', q: 'seafood' },
    { label: 'スパ・マッサージ', q: 'spa' },
  ],
  ru: [
    { label: 'Мост Поцелуев', q: 'Kiss Bridge' },
    { label: 'Канатная дорога', q: 'Cable Car' },
    { label: 'Морепродукты', q: 'seafood' },
    { label: 'Спа и массаж', q: 'spa' },
  ],
  hi: [
    { label: 'किस ब्रिज', q: 'Kiss Bridge' },
    { label: 'केबल कार', q: 'Cable Car' },
    { label: 'सीफूड', q: 'seafood' },
    { label: 'स्पा और मसाज', q: 'spa' },
  ],
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
  const normNeedle = normalizeSearch(q)
  const regList: any[] = Array.isArray(businessesRegistryJson)
    ? (businessesRegistryJson as any[])
    : (businessesRegistryJson as any).businesses || []
  const regMap = new Map<string, any>(regList.map((r) => [r.slug, r]))
  const syncedBusinesses = (businesses || []).map((x: any) => {
    const reg = regMap.get(x.slug)
    if (!reg) return x
    return {
      ...x,
      status: reg.status ?? x.status,
      category: reg.category ?? x.category,
      subcategory: reg.subcategory ?? x.subcategory,
      public_name: reg.public_name ?? x.public_name,
      name_local: reg.name_local ?? x.name_local,
      description_ko: reg.description_ko ?? x.description_ko,
      description_en: reg.description_en ?? x.description_en,
      tags: reg.tags ?? x.tags,
      aliases: reg.aliases ?? x.aliases,
      google_maps_name: reg.google_maps_name ?? x.google_maps_name,
      google_rating: reg.google_rating ?? x.google_rating,
      google_review_count: reg.google_review_count ?? x.google_review_count,
      gallery_urls:
        Array.isArray(reg.gallery_urls) && reg.gallery_urls.length > 0
          ? reg.gallery_urls
          : x.gallery_urls,
    }
  })
  const khemSlugs = new Set((khemBusinesses as any[]).map((k) => k.slug))
  const allBusinesses = [
    ...syncedBusinesses,
    ...(khemBusinesses as any[]).filter(
      (x) => x.status === 'published'
    ),
  ]
  const b = allBusinesses.filter((x: any) => {
    if (isHiddenBusiness(x) || x.category === 'activities') return false
    if (!needle) return true
    const fields = [
      x.slug,
      x.public_name,
      x.name_local,
      displayBusinessName(x, locale),
      x.google_maps_name,
      ...(x.aliases || []),
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
    ]
    return fields.some(
      (v) => text(v).includes(needle) || (normNeedle && normalizeSearch(v).includes(normNeedle))
    )
  })
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
            {DIRECTORY_CATEGORY_KEYS.filter((key) => getCategoryPublishedCount(key) > 0).map((key) => (
              <Link
                href={
                  key === 'hotels'
                    ? localePath(locale, '/hotels')
                    : key === 'activities'
                    ? localePath(locale, '/activities')
                    : localePath(locale, `/directory/${key}`)
                }
                key={key}
              >
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
              const zLabels = ZONE_BADGE_LABELS[locale] || ZONE_BADGE_LABELS.en
              const zoneBadge = khemSlugs.has(x.slug) ? zLabels.khem : zLabels.sunset
              return (
                <Link
                  href={localePath(locale, `/business/${x.slug}`)}
                  key={x.id || x.slug}
                  className="compactBusinessLink"
                >
                  <article className="directoryResult compactDirectoryCard">
                    <div className="resultImageWrap">
                      <img
                        src={imageUrl(
                          x.gallery_urls?.[0] ||
                            getCoverPhoto(x.slug)?.image_url ||
                            getHotelBySlug(x.slug)?.photos?.[0] ||
                            stockPrimaryFor(x.category, x.subcategory, x.tags),
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
                          📍 {zoneBadge} · {subLabel}
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
          {!b.length && (
            <div style={{ marginTop: '12px' }}>
              <p className="muted">{dict.search.noPlace}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {(SEARCH_SUGGESTIONS[locale] || SEARCH_SUGGESTIONS.en).map((sug) => (
                  <Link
                    key={sug.q}
                    href={`${localePath(locale, '/search')}?q=${encodeURIComponent(sug.q)}`}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      background: '#f0fdfa',
                      border: '1px solid #99f6e4',
                      color: '#0f766e',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                    }}
                  >
                    🔍 {sug.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="searchResultSection">
          <div className="directoryHeading">
            <h2>{dict.search.storiesHeading}</h2>
          </div>
          <div className="storyGrid">
            {s.slice(0, 12).map((x: any) => (
              <Link
                href={localePath(
                  locale,
                  `/${x.content_type === 'event' ? 'events' : 'news'}/${x.slug}`
                )}
                key={x.id || x.slug}
              >
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
