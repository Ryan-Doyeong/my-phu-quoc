"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  DIRECTORY_CATEGORIES,
  categoryLabel,
  categoryEyebrow,
  nearbyBadgeText,
  type DirectoryCategory,
} from '@/lib/directory'
import { stockPrimaryFor } from '@/lib/stockImages'
import { imageUrl } from '@/lib/imageUrl'
import { localePath, type Locale } from '@/lib/i18n/config'
import {
  getDictionary,
  translateBadge,
  translateTerm,
  getPhotoBadgeText,
  selectBusinessDescription,
} from '@/lib/i18n/dictionaries'

type Business = {
  id: string
  public_name: string
  slug: string
  category: DirectoryCategory
  subcategory: string | null
  address: string | null
  description_en: string | null
  description_vi?: string | null
  description_ko?: string | null
  google_rating: number | null
  google_review_count: number | null
  gallery_urls: string[] | null
  tags: string[] | null
  media_note: string | null
  badges: string[] | null
  is_good_life_member?: boolean | null
  [key: string]: any
}

type LabelFilter = 'All' | 'Recommended' | 'New' | 'HOT' | 'Good Life Thaodien member'

function imageFor(b: Business) {
  return stockPrimaryFor(b.category, b.subcategory, b.tags)
}
function badgeRank(b: Business) {
  const badges = (b.badges || []).map((x) => x.toLowerCase())
  if (badges.includes('recommended')) return 0
  if (badges.includes('new')) return 1
  if (badges.includes('hot')) return 2
  return 3
}
function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function randomScore(b: Business, seed: string) {
  return hash(`${seed}|${b.id}`)
}

function BusinessCard({ b, locale }: { b: Business; locale: Locale }) {
  const img = b.gallery_urls?.[0] || imageFor(b)
  const badgeText = getPhotoBadgeText(b.media_note, locale, img)
  const nearbyText = nearbyBadgeText(b.address, b.tags, b.badges, locale)
  const desc = selectBusinessDescription(b, locale)
  const subLabel = b.subcategory
    ? translateTerm(b.subcategory, locale)
    : categoryLabel(b.category, locale)

  return (
    <Link
      href={localePath(locale, `/business/${b.slug}`)}
      className="compactBusinessLink"
      data-analytics-type="business"
      data-analytics-id={b.id}
    >
      <article className="directoryResult compactDirectoryCard">
        <div className="resultImageWrap">
          <img
            src={imageUrl(img, 620, 68)}
            alt=""
            loading="lazy"
            decoding="async"
            width={620}
            height={414}
          />
          {badgeText && <span className="illustrativeBadge">{badgeText}</span>}
          <div className="businessBadgeStack">
            {(b.badges || []).slice(0, 3).map((x) => (
              <span key={x} className={`businessBadge badge${x.toLowerCase().replaceAll(' ', '')}`}>
                {translateBadge(x, locale)}
              </span>
            ))}
            {nearbyText &&
              !(b.badges || []).some((x) => x.toLowerCase().includes('nearby')) && (
                <span className="businessBadge badgenearby">{nearbyText}</span>
              )}
            {b.is_good_life_member && (
              <span className="businessBadge badgegoodlifemember">
                {translateBadge('Good Life Thaodien member', locale)}
              </span>
            )}
          </div>
        </div>
        <div className="compactBusinessBody">
          <div className="resultMeta">
            <span>
              {subLabel}
              {nearbyText ? ` · ${nearbyText}` : ''}
            </span>
            {b.google_rating ? <strong>★ {Number(b.google_rating).toFixed(1)}</strong> : null}
          </div>
          <h3>{b.public_name}</h3>
          <div className="tagList compactTags">
            {(b.tags || []).slice(0, 3).map((t) => (
              <span key={t}>{translateTerm(t, locale)}</span>
            ))}
          </div>
          <p>{desc}</p>
          <small>{b.address}</small>
        </div>
      </article>
    </Link>
  )
}

function BusinessListSection({
  title,
  subtitle,
  items,
  className,
  locale,
}: {
  title: string
  subtitle: string
  items: Business[]
  className?: string
  locale: Locale
}) {
  const dict = getDictionary(locale)
  const [prevItems, setPrevItems] = useState(items)
  const [visible, setVisible] = useState(24)
  if (items !== prevItems) {
    setPrevItems(items)
    setVisible(24)
  }
  const visibleItems = items.slice(0, visible)
  return (
    <section className={className || 'directoryGroup'}>
      <div className="directoryGroupHeading">
        <div>
          <span>{subtitle}</span>
          <h2>{title}</h2>
        </div>
        <strong>{items.length}</strong>
      </div>
      <div className="fullBusinessGrid compactBusinessGrid">
        {visibleItems.map((b) => (
          <BusinessCard b={b} locale={locale} key={b.id} />
        ))}
      </div>
      {visible < items.length && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            type="button"
            className="outlineButton"
            onClick={() => setVisible((v) => v + 24)}
          >
            {dict.directory.showMore}
          </button>
        </div>
      )}
    </section>
  )
}

export function DirectoryBrowser({
  category,
  items,
  shuffleSeed,
  locale = 'en',
  isVi,
}: {
  category: DirectoryCategory
  items: Business[]
  shuffleSeed: string
  locale?: Locale
  isVi?: boolean
}) {
  const activeLocale: Locale = isVi ? 'vi' : locale
  const dict = getDictionary(activeLocale)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const [labelFilter, setLabelFilter] = useState<LabelFilter>('All')
  const config = DIRECTORY_CATEGORIES[category]
  const catLabel = categoryLabel(category, activeLocale)
  const catEyebrow = categoryEyebrow(category, activeLocale)
  const filters = ['All', ...config.subcategories]
  const labels: LabelFilter[] = ['All', 'Recommended', 'New', 'HOT', 'Good Life Thaodien member']

  const filtered = useMemo(
    () =>
      items
        .filter((b) => {
          const hay = [
            b.public_name,
            b.subcategory,
            b.subcategory ? translateTerm(b.subcategory, activeLocale) : '',
            b.address,
            b.description_en,
            b.description_vi,
            b.description_ko,
            ...(b.tags || []),
            ...(b.tags || []).map((t) => translateTerm(t, activeLocale)),
            ...(b.badges || []),
            nearbyBadgeText(b.address, b.tags, b.badges, activeLocale) || '',
            b.is_good_life_member ? 'good life thaodien member' : '',
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          if (q && !hay.includes(q.toLowerCase())) return false
          if (
            filter !== 'All' &&
            (b.subcategory || '').toLowerCase() !== filter.toLowerCase() &&
            !(b.tags || []).some((x) => x.toLowerCase() === filter.toLowerCase())
          )
            return false
          if (labelFilter === 'Good Life Thaodien member' && !b.is_good_life_member) return false
          if (
            labelFilter !== 'All' &&
            labelFilter !== 'Good Life Thaodien member' &&
            !(b.badges || []).includes(labelFilter)
          )
            return false
          return true
        })
        .sort(
          (a, b) => badgeRank(a) - badgeRank(b) || randomScore(a, shuffleSeed) - randomScore(b, shuffleSeed)
        ),
    [items, q, filter, labelFilter, shuffleSeed, activeLocale]
  )

  const showEditorialHighlights = filter === 'All' && labelFilter === 'All'
  const featuredBuckets = useMemo(
    () =>
      showEditorialHighlights
        ? [
            { name: 'Recommended', items: filtered.filter((b) => badgeRank(b) === 0) },
            { name: 'New', items: filtered.filter((b) => badgeRank(b) === 1) },
            { name: 'HOT', items: filtered.filter((b) => badgeRank(b) === 2) },
          ].filter((x) => x.items.length)
        : [],
    [filtered, showEditorialHighlights]
  )
  const groups = useMemo(() => {
    const source = showEditorialHighlights ? filtered.filter((b) => badgeRank(b) === 3) : filtered
    if (filter !== 'All') return [{ name: filter, items: source }]
    const order = [...config.subcategories]
    const map = new Map<string, Business[]>()
    for (const b of source) {
      const key = b.subcategory || 'Other'
      map.set(key, [...(map.get(key) || []), b])
    }
    return [
      ...order.filter((name) => map.has(name)).map((name) => ({ name, items: map.get(name)! })),
      ...Array.from(map.entries())
        .filter(([name]) => !(order as readonly string[]).includes(name))
        .map(([name, rows]) => ({ name, items: rows })),
    ]
  }, [filtered, filter, config.subcategories, showEditorialHighlights])

  return (
    <>
      <div className="directoryToolbar">
        <label className="directorySearch">
          <span>⌕</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.directory.searchPlaceholder(catLabel)}
          />
        </label>
        <div>
          <div className="directoryFilterLabel">{dict.directory.browseByType}</div>
          <div className="directoryFilters" aria-label={`${catLabel} concepts`}>
            {filters.map((x) => (
              <button
                type="button"
                key={x}
                className={filter === x ? 'active' : ''}
                onClick={() => setFilter(x)}
              >
                {translateTerm(x, activeLocale)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="directoryFilterLabel">{dict.directory.exploreByLabel}</div>
          <div className="directoryFilters labelFilters" aria-label="Editorial labels">
            {labels.map((x) => (
              <button
                type="button"
                key={x}
                className={labelFilter === x ? 'active' : ''}
                onClick={() => setLabelFilter(x)}
              >
                {x === 'All' ? translateTerm('All', activeLocale) : translateBadge(x, activeLocale)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="directorySummary">
        <div>
          <span className="eyebrow">{catEyebrow}</span>
          <h2>{dict.directory.placesCount(filtered.length)}</h2>
        </div>
        <p>
          {dict.directory.summaryText}{' '}
          <Link href={localePath(activeLocale, '/member')}>{dict.directory.memberBadgeLink}</Link>
        </p>
      </div>
      <div className="directoryGroups">
        {featuredBuckets.map((bucket) => (
          <BusinessListSection
            key={`editorial-${bucket.name}`}
            className="directoryGroup editorialHighlightsGroup"
            subtitle={dict.directory.featured}
            title={translateBadge(bucket.name, activeLocale)}
            items={bucket.items}
            locale={activeLocale}
          />
        ))}
        {groups.map((group) => (
          <BusinessListSection
            key={group.name}
            subtitle={dict.directory.morePlaces}
            title={translateTerm(group.name, activeLocale)}
            items={group.items}
            locale={activeLocale}
          />
        ))}
        {!filtered.length && (
          <div className="emptyDirectory">
            <h3>{dict.directory.emptyTitle}</h3>
            <p>{dict.directory.emptyDesc}</p>
          </div>
        )}
      </div>
    </>
  )
}
