"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  DIRECTORY_CATEGORIES,
  categoryLabel,
  categoryEyebrow,
  nearbyBadgeText,
  formatLocalizedAddress,
  type DirectoryCategory,
} from '@/lib/directory'
import {
  SUNSET_ZONE_KEYS,
  zoneLabel,
  detectSunsetZone,
  isSunsetTownFacility,
  type SunsetZoneKey,
} from '@/lib/zones'
import { BusinessCover } from '@/components/BusinessCover'
import { getCoverPhoto } from '@/lib/coverPhotos'
import { stockPrimaryFor } from '@/lib/stockImages'
import { imageUrl } from '@/lib/imageUrl'
import { localePath, type Locale } from '@/lib/i18n/config'
import {
  getDictionary,
  translateBadge,
  translateTerm,
  getPhotoBadgeText,
  selectBusinessDescription,
  displayBusinessName,
} from '@/lib/i18n/dictionaries'

const MAP_LINK_LABEL: Record<string, string> = {
  ko: '지도 보기 ↗',
  en: 'Google Maps ↗',
  zh: 'Google 地图 ↗',
  ru: 'Google Карты ↗',
  ja: 'Google マップ ↗',
  hi: 'Google मैप्स ↗',
}

const EXPLORE_BY_ZONE_LABEL: Record<string, string> = {
  ko: '구역별 보기 (선셋타운 & 켐비치)',
  en: 'Explore by Zone',
  zh: '按区域探索',
  ru: 'Поиск по районам',
  ja: 'エリアから探す',
  hi: 'क्षेत्र के अनुसार खोजें',
}

const ALL_ZONES_LABEL: Record<string, string> = {
  ko: '전체 구역',
  en: 'All Zones',
  zh: '全部区域',
  ru: 'Все районы',
  ja: 'すべてのエリア',
  hi: 'सभी क्षेत्र',
}

const ZONE_FILTER_SUNSET: Record<string, string> = {
  ko: '선셋타운',
  en: 'Sunset Town',
  zh: '日落小镇',
  ru: 'Сансет-Таун',
  ja: 'サンセットタウン',
  hi: 'सनसेट टाउन',
}

const ZONE_FILTER_KHEM: Record<string, string> = {
  ko: '켐비치',
  en: 'Khem Beach',
  zh: '凯姆海滩',
  ru: 'Пляж Кхем',
  ja: 'ケムビーチ',
  hi: 'खेम बीच',
}

const PRICE_LEVEL_LABEL: Record<string, string> = {
  ko: '가격대',
  en: 'Price Level',
  zh: '价格档次',
  ru: 'Ценовая категория',
  ja: '価格帯',
  hi: 'मूल्य श्रेणी',
}

const ALL_PRICES_LABEL: Record<string, string> = {
  ko: '전체 가격',
  en: 'All Prices',
  zh: '全部价位',
  ru: 'Все ценовые категории',
  ja: 'すべての価格帯',
  hi: 'सभी मूल्य श्रेणियाँ',
}

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

type LabelFilter = 'All' | 'Recommended' | 'New' | 'HOT'

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
  const coverPhoto = getCoverPhoto(b.slug)

  return (
    <Link
      href={localePath(locale, `/business/${b.slug}`)}
      className="compactBusinessLink"
      data-analytics-type="business"
      data-analytics-id={b.id}
    >
      <article className="directoryResult compactDirectoryCard">
        <div className="resultImageWrap">
          {coverPhoto ? (
            <div
              className="officialCoverCard"
              style={{
                width: '100%',
                height: '220px',
                overflow: 'hidden',
                backgroundColor: '#18181b',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <img
                src={coverPhoto.image_url}
                alt={displayBusinessName(b, locale)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <BusinessCover
              name={displayBusinessName(b, locale)}
              googleName={b.google_maps_name}
              category={b.category}
              subcategory={b.subcategory}
              aspectRatio="card"
            />
          )}
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
          <h3>{displayBusinessName(b, locale)}</h3>
          <div className="tagList compactTags">
            {(b.tags || []).slice(0, 3).map((t) => (
              <span key={t}>{translateTerm(t, locale)}</span>
            ))}
          </div>
          <p>{desc}</p>
          <small>{formatLocalizedAddress(b.address, locale)}</small>
          {(b.google_maps_url || b.google_place_id) && (
            <div style={{ marginTop: '8px' }}>
              <span
                role="button"
                tabIndex={0}
                className="mapDirectLink"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const url =
                    b.google_maps_url ||
                    `https://www.google.com/maps/place/?q=place_id:${b.google_place_id}`
                  window.open(url, '_blank', 'noopener,noreferrer')
                }}
              >
                📍 {MAP_LINK_LABEL[locale] || MAP_LINK_LABEL.en}
              </span>
            </div>
          )}
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
  initialZone,
}: {
  category: DirectoryCategory
  items: Business[]
  shuffleSeed: string
  locale?: Locale
  isVi?: boolean
  initialZone?: 'sunset-town' | 'khem-beach'
}) {
  const activeLocale: Locale = isVi ? 'vi' : locale
  const dict = getDictionary(activeLocale)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('All')
  const [labelFilter, setLabelFilter] = useState<LabelFilter>('All')
  const [zoneFilter, setZoneFilter] = useState<SunsetZoneKey>(initialZone || 'all')
  const [priceFilter, setPriceFilter] = useState<string>('All')
  const config = DIRECTORY_CATEGORIES[category]
  const catLabel = categoryLabel(category, activeLocale)
  const catEyebrow = categoryEyebrow(category, activeLocale)
  const filters = ['All', ...config.subcategories]
  const labels: LabelFilter[] = ['All', 'Recommended', 'New', 'HOT']

  const filtered = useMemo(
    () =>
      items
        .filter((b) => {
          const hay = [
            b.public_name,
            displayBusinessName(b, activeLocale),
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
          if (labelFilter !== 'All' && !(b.badges || []).includes(labelFilter)) return false
          if (zoneFilter !== 'all' && detectSunsetZone(b) !== zoneFilter) return false
          if (priceFilter !== 'All' && b.price_level && b.price_level !== priceFilter) return false
          return true
        })
        .sort((a, b) => {
          const sunsetA = isSunsetTownFacility(a) ? 0 : 1
          const sunsetB = isSunsetTownFacility(b) ? 0 : 1
          if (sunsetA !== sunsetB) return sunsetA - sunsetB
          return badgeRank(a) - badgeRank(b) || randomScore(a, shuffleSeed) - randomScore(b, shuffleSeed)
        }),
    [items, q, filter, labelFilter, zoneFilter, priceFilter, shuffleSeed, activeLocale]
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
    const norm = (s: string) => s.trim().toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')
    const map = new Map<string, Business[]>()
    for (const b of source) {
      const key = b.subcategory || 'Other'
      map.set(key, [...(map.get(key) || []), b])
    }
    const matchedKeys = new Set<string>()
    const orderedGroups: { name: string; items: Business[] }[] = []
    for (const oName of order) {
      const oKey = norm(oName)
      for (const [key, rows] of map.entries()) {
        if (norm(key) === oKey) {
          orderedGroups.push({ name: key, items: rows })
          matchedKeys.add(key)
        }
      }
    }
    for (const [key, rows] of map.entries()) {
      if (!matchedKeys.has(key)) {
        orderedGroups.push({ name: key, items: rows })
      }
    }
    return orderedGroups
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
          <div className="directoryFilterLabel">
            {EXPLORE_BY_ZONE_LABEL[activeLocale] || EXPLORE_BY_ZONE_LABEL.en}
          </div>
          <div className="directoryFilters zoneFilters" aria-label={EXPLORE_BY_ZONE_LABEL[activeLocale] || 'Zones'}>
            {[
              { key: 'all', label: ALL_ZONES_LABEL[activeLocale] || ALL_ZONES_LABEL.en },
              { key: 'sunset-town', label: ZONE_FILTER_SUNSET[activeLocale] || ZONE_FILTER_SUNSET.en },
              { key: 'khem-beach', label: ZONE_FILTER_KHEM[activeLocale] || ZONE_FILTER_KHEM.en },
            ].map(({ key, label }) => (
              <button
                type="button"
                key={key}
                className={zoneFilter === key ? 'active' : ''}
                onClick={() => setZoneFilter(key as SunsetZoneKey)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="directoryFilterLabel">
            {PRICE_LEVEL_LABEL[activeLocale] || PRICE_LEVEL_LABEL.en}
          </div>
          <div className="directoryFilters priceFilters" aria-label={PRICE_LEVEL_LABEL[activeLocale] || 'Price Level'}>
            {['All', '$', '$$', '$$$', '$$$$'].map((p) => (
              <button
                type="button"
                key={p}
                className={priceFilter === p ? 'active' : ''}
                onClick={() => setPriceFilter(p)}
              >
                {p === 'All' ? (ALL_PRICES_LABEL[activeLocale] || ALL_PRICES_LABEL.en) : p}
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
        <p>{dict.directory.summaryText}</p>
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
