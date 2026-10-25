'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { imageUrl } from '@/lib/imageUrl'
import { dateLocaleFor, localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import {
  getEventProgressStatus,
  getEventStatusLabel,
  getSampleBadgeLabel,
  isSampleEventSlug,
} from '@/lib/eventSamples'

export interface EventBoardItem {
  id: string
  slug: string
  title: string
  title_en?: string | null
  title_vi?: string | null
  title_ko?: string | null
  excerpt?: string | null
  excerpt_en?: string | null
  excerpt_vi?: string | null
  excerpt_ko?: string | null
  body?: string | null
  body_en?: string | null
  body_vi?: string | null
  body_ko?: string | null
  category?: string | null
  category_en?: string | null
  category_vi?: string | null
  category_ko?: string | null
  cover_image_url?: string | null
  published_at?: string | null
  event_date?: string | null
  event_end_date?: string | null
  effective_date?: string | null
  event_location?: string | null
  tags?: string[] | null
  is_sample?: boolean
}

interface EventsBoardProps {
  items: EventBoardItem[]
  locale: Locale
}

const DEFAULT_PAGE_SIZE = 10

export function EventsBoard({ items, locale }: EventsBoardProps) {
  const dict = getDictionary(locale)
  const [inputValue, setInputValue] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [visibleCount, setVisibleCount] = useState(DEFAULT_PAGE_SIZE)

  // Sync initial query and optional preview pageSize (?q=...&limit=...) from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const qParam = params.get('q') || ''
    const limitParam = Number(params.get('limit') || params.get('pageSize') || '')
    if (qParam) {
      setInputValue(qParam)
      setActiveQuery(qParam)
    }
    if (limitParam && limitParam > 0) {
      setPageSize(limitParam)
      setVisibleCount(limitParam)
    }
  }, [])

  const updateUrlQuery = (nextQ: string) => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (nextQ.trim()) {
      url.searchParams.set('q', nextQ.trim())
    } else {
      url.searchParams.delete('q')
    }
    window.history.replaceState({}, '', url.toString())
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    setActiveQuery(trimmed)
    setVisibleCount(pageSize)
    updateUrlQuery(trimmed)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    setActiveQuery(val.trim())
    setVisibleCount(pageSize)
    updateUrlQuery(val.trim())
  }

  const handleClear = () => {
    setInputValue('')
    setActiveQuery('')
    setVisibleCount(pageSize)
    updateUrlQuery('')
  }

  // Sort newest-first (published_at desc, fallback event_date desc)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aTime = new Date(a.published_at || a.event_date || 0).getTime()
      const bTime = new Date(b.published_at || b.event_date || 0).getTime()
      return bTime - aTime
    })
  }, [items])

  // Multilingual keyword search across Title + Body + Excerpt + Category + Tags + Location (EN / VI / KO)
  const filteredItems = useMemo(() => {
    const q = activeQuery.trim().toLowerCase()
    if (!q) return sortedItems

    const tokens = q.split(/\s+/).filter(Boolean)
    return sortedItems.filter((item) => {
      const searchableBlob = [
        item.title,
        item.title_en,
        item.title_vi,
        item.title_ko,
        item.excerpt,
        item.excerpt_en,
        item.excerpt_vi,
        item.excerpt_ko,
        item.body,
        item.body_en,
        item.body_vi,
        item.body_ko,
        item.category,
        item.category_en,
        item.category_vi,
        item.category_ko,
        item.event_location,
        ...(Array.isArray(item.tags) ? item.tags : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return tokens.every((tok) => searchableBlob.includes(tok))
    })
  }, [sortedItems, activeQuery])

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length
  const hasSampleItems = visibleItems.some((it) => it.is_sample || isSampleEventSlug(it.slug))

  const formatRowDate = (isoDate?: string | null) => {
    if (!isoDate) return ''
    const d = new Date(isoDate)
    if (Number.isNaN(d.getTime())) return ''
    if (locale === 'ko') {
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      return `${yyyy}.${mm}.${dd}`
    }
    return d.toLocaleDateString(dateLocaleFor(locale), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section className="shell eventBoardSection">
      <div className="eventBoardWrap">
        {/* Top Search Bar */}
        <form className="eventSearchBar" onSubmit={handleSearchSubmit} role="search">
          <div className="eventSearchInputWrap">
            <span className="eventSearchIcon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={dict.news.eventsSearchPlaceholder}
              aria-label={dict.news.eventsSearchPlaceholder}
              className="eventSearchInput"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="eventSearchClearInline"
                aria-label={dict.news.eventsSearchClear}
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="eventSearchSubmitBtn">
            {dict.news.eventsSearchBtn}
          </button>
        </form>

        {/* Sample preview notice banner (shown when sample items are present) */}
        {hasSampleItems && (
          <div className="eventSampleNoticeBar" role="note">
            <span className="sampleBadge">{getSampleBadgeLabel(locale)}</span>
            <span>{dict.news.eventsSampleNotice}</span>
          </div>
        )}

        {/* Active search summary bar */}
        {activeQuery && (
          <div className="eventSearchStatusRow">
            <span>{dict.news.eventsSearchResultLabel(filteredItems.length, activeQuery)}</span>
            <button type="button" onClick={handleClear} className="eventSearchResetLink">
              {dict.news.eventsSearchClear}
            </button>
          </div>
        )}

        {/* DC Inside Best Posts style mobile-first vertical list */}
        {visibleItems.length > 0 ? (
          <ul className="eventDcList" role="list">
            {visibleItems.map((item, idx) => {
              const isSample = Boolean(item.is_sample || isSampleEventSlug(item.slug))
              const endDate = item.event_end_date || item.effective_date || null
              const progressStatus = getEventProgressStatus(item.event_date, endDate)
              const statusLabel = getEventStatusLabel(progressStatus, locale)
              const displayDate = formatRowDate(item.event_date || item.published_at)
              const categoryText = item.category || 'Event'

              return (
                <li key={item.id || item.slug} className="eventDcItem">
                  <Link
                    href={localePath(locale, `/events/${item.slug}`)}
                    className="eventDcRow"
                  >
                    {/* Left Square Thumbnail (object-fit: cover, lazy loading for non-LCP) */}
                    <div className="eventDcThumbWrap">
                      <img
                        src={imageUrl(item.cover_image_url || '/stock/hobby.webp', 240, 75)}
                        alt={item.title}
                        width={84}
                        height={84}
                        {...(idx === 0
                          ? { loading: 'eager', fetchPriority: 'high' }
                          : { loading: 'lazy' })}
                        decoding="async"
                        className="eventDcThumb"
                      />
                    </div>

                    {/* Right Content: 1-line truncated title + small gray meta line below */}
                    <div className="eventDcBody">
                      <h2 className="eventDcTitle" title={item.title}>
                        {item.title}
                      </h2>
                      <div className="eventDcMeta">
                        {isSample && (
                          <span className="sampleBadge">{getSampleBadgeLabel(locale)}</span>
                        )}
                        {statusLabel && (
                          <span
                            className={
                              progressStatus === 'ended'
                                ? 'eventStatusBadge ended'
                                : 'eventStatusBadge ongoing'
                            }
                          >
                            {statusLabel}
                          </span>
                        )}
                        <span className="eventDcMetaText">
                          {categoryText && (
                            <span className="eventDcCategory">{categoryText}</span>
                          )}
                          {categoryText && displayDate && (
                            <span className="eventDcDot" aria-hidden="true">
                              {' · '}
                            </span>
                          )}
                          {displayDate && (
                            <time
                              className="eventDcDate"
                              dateTime={item.event_date || item.published_at || undefined}
                            >
                              {displayDate}
                            </time>
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="eventEmptyState" role="status">
            <p className="eventEmptyTitle">
              {activeQuery ? dict.news.eventsEmptySearchTitle : dict.news.eventsEmptyListTitle}
            </p>
            {activeQuery && (
              <>
                <p className="eventEmptyDesc">{dict.news.eventsEmptySearchDesc}</p>
                <button type="button" onClick={handleClear} className="eventResetBtn">
                  {dict.news.eventsSearchClear}
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination / Load More Footer */}
        {filteredItems.length > 0 && (
          <div className="eventBoardFooter">
            <span className="eventCountMeta">
              {dict.news.eventsShowingCount(visibleItems.length, filteredItems.length)}
            </span>
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + pageSize)}
                className="eventLoadMoreBtn"
              >
                {dict.news.eventsLoadMore} ({visibleItems.length}/{filteredItems.length})
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
