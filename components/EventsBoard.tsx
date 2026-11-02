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

type StatusFilter = 'all' | 'active' | 'ended'

const BOARD_FILTER_LABELS: Record<
  Locale,
  {
    all: string
    active: string
    ended: string
    dateLabel: string
    clearDate: string
    guidesNotice: string
    guidesCta: string
  }
> = {
  ko: {
    all: '전체 행사',
    active: '진행·예정 행사',
    ended: '종료된 행사',
    dateLabel: '방문 날짜별 조회',
    clearDate: '날짜 초기화',
    guidesNotice: '맛집·카페 소개, 추천 산책 코스, 공연 관람 팁 등 일반 여행 정보는 가이드 게시판에서 확인하실 수 있습니다.',
    guidesCta: '뉴스 & 여행 가이드 보기 →',
  },
  en: {
    all: 'All Events',
    active: 'Ongoing & Upcoming',
    ended: 'Past / Ended',
    dateLabel: 'Filter by Visit Date',
    clearDate: 'Clear Date',
    guidesNotice: 'Looking for dining introductions, walking routes, and viewing tips? Browse our Travel Guides & News section.',
    guidesCta: 'View Travel Guides & News →',
  },
  vi: {
    all: 'Tất cả sự kiện',
    active: 'Đang & Sắp diễn ra',
    ended: 'Đã kết thúc',
    dateLabel: 'Lọc theo ngày tham quan',
    clearDate: 'Xóa ngày',
    guidesNotice: 'Xem giới thiệu nhà hàng, quán cà phê và cẩm nang lịch trình tại chuyên mục Tin tức & Cẩm nang.',
    guidesCta: 'Xem Tin tức & Cẩm nang →',
  },
  zh: {
    all: '全部活动',
    active: '进行中 / 即将开始',
    ended: '已结束',
    dateLabel: '按到访日期筛选',
    clearDate: '清除日期',
    guidesNotice: '餐厅与咖啡馆介绍、漫步路线及观演贴士等常规旅游资讯，请前往新闻与指南专区查阅。',
    guidesCta: '查看新闻与旅游指南 →',
  },
  ja: {
    all: 'すべてのイベント',
    active: '開催中・開催予定',
    ended: '終了したイベント',
    dateLabel: '訪問日で絞り込む',
    clearDate: '日付クリア',
    guidesNotice: 'レストラン・カフェ紹介、散策コース、観賞のコツなどの一般観光情報はニュース＆ガイド一覧でご確認いただけます。',
    guidesCta: 'ニュース＆旅行ガイドを見る →',
  },
  ru: {
    all: 'Все события',
    active: 'Текущие и будущие',
    ended: 'Завершённые',
    dateLabel: 'Фильтр по дате визита',
    clearDate: 'Сбросить дату',
    guidesNotice: 'Обзоры ресторанов и кафе, прогулочные маршруты и советы путешественникам доступны в разделе «Новости и гиды».',
    guidesCta: 'Перейти к новостям и гидам →',
  },
  hi: {
    all: 'सभी कार्यक्रम',
    active: 'जारी और आगामी',
    ended: 'समाप्त कार्यक्रम',
    dateLabel: 'यात्रा तिथि के अनुसार फ़िल्टर करें',
    clearDate: 'तिथि साफ़ करें',
    guidesNotice: 'रेस्तरां परिचय, वॉकिंग रूट और दर्शक टिप्स जैसी सामान्य यात्रा जानकारी के लिए समाचार और गाइड अनुभाग देखें।',
    guidesCta: 'समाचार और यात्रा गाइड देखें →',
  },
}

export function EventsBoard({ items, locale }: EventsBoardProps) {
  const dict = getDictionary(locale)
  const ui = BOARD_FILTER_LABELS[locale] || BOARD_FILTER_LABELS.en
  const [inputValue, setInputValue] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedDate, setSelectedDate] = useState('')
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
    setStatusFilter('all')
    setSelectedDate('')
    setVisibleCount(pageSize)
    updateUrlQuery('')
  }

  // Sort active/upcoming events first, then newest-first
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aEnd = a.event_end_date || a.effective_date || null
      const bEnd = b.event_end_date || b.effective_date || null
      const aStatus = getEventProgressStatus(a.event_date, aEnd)
      const bStatus = getEventProgressStatus(b.event_date, bEnd)
      const aEnded = aStatus === 'ended' ? 1 : 0
      const bEnded = bStatus === 'ended' ? 1 : 0
      if (aEnded !== bEnded) return aEnded - bEnded

      const aTime = new Date(a.event_date || a.published_at || 0).getTime()
      const bTime = new Date(b.event_date || b.published_at || 0).getTime()
      return bTime - aTime
    })
  }, [items])

  // Multilingual keyword + status + visit date filter
  const filteredItems = useMemo(() => {
    const q = activeQuery.trim().toLowerCase()
    const tokens = q ? q.split(/\s+/).filter(Boolean) : []

    return sortedItems.filter((item) => {
      const endDate = item.event_end_date || item.effective_date || null
      const progressStatus = getEventProgressStatus(item.event_date, endDate)

      if (statusFilter === 'active' && progressStatus === 'ended') return false
      if (statusFilter === 'ended' && progressStatus !== 'ended') return false

      if (selectedDate) {
        const visitDayStart = new Date(`${selectedDate}T00:00:00+07:00`)
        const visitDayEnd = new Date(`${selectedDate}T23:59:59+07:00`)
        if (!Number.isNaN(visitDayStart.getTime())) {
          // Check Tuesday off-day for Kiss of the Sea regular show
          if (
            item.slug === 'kiss-of-the-sea-nightly-multimedia-show' &&
            visitDayStart.getDay() === 2
          ) {
            return false
          }
          if (item.event_date) {
            const evStart = new Date(item.event_date)
            if (!Number.isNaN(evStart.getTime()) && evStart.getTime() > visitDayEnd.getTime()) {
              return false
            }
          }
          if (endDate) {
            const evEnd = new Date(endDate)
            if (!Number.isNaN(evEnd.getTime()) && evEnd.getTime() < visitDayStart.getTime()) {
              return false
            }
          }
        }
      }

      if (tokens.length === 0) return true

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
  }, [sortedItems, activeQuery, statusFilter, selectedDate])

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

        {/* Status Tabs + Visit Date Filter Bar */}
        <div
          className="eventFilterControlsBar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '14px',
            padding: '10px 12px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }} role="tablist">
            {(['all', 'active', 'ended'] as StatusFilter[]).map((tab) => {
              const isSelected = statusFilter === tab
              const label = tab === 'all' ? ui.all : tab === 'active' ? ui.active : ui.ended
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setStatusFilter(tab)
                    setVisibleCount(pageSize)
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected ? '1px solid #0f766e' : '1px solid #cbd5e1',
                    background: isSelected ? '#0f766e' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <label
              htmlFor="event-visit-date"
              style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}
            >
              📅 {ui.dateLabel}
            </label>
            <input
              id="event-visit-date"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                setVisibleCount(pageSize)
              }}
              style={{
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
                background: '#ffffff',
                color: '#0f172a',
              }}
            />
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate('')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.76rem',
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                {ui.clearDate}
              </button>
            )}
          </div>
        </div>

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
              const startText = formatRowDate(item.event_date || item.published_at)
              const endText = endDate ? formatRowDate(endDate) : ''
              const displayDate =
                startText && endText && startText !== endText
                  ? `${startText} ~ ${endText}`
                  : startText
              const categoryText = item.category || 'Event'

              return (
                <li key={item.id || item.slug} className="eventDcItem">
                  <Link
                    href={localePath(locale, `/events/${item.slug}`)}
                    className="eventDcRow"
                    style={progressStatus === 'ended' ? { opacity: 0.78 } : undefined}
                  >
                    {/* Left Square Thumbnail (object-fit: cover, lazy loading for non-LCP) */}
                    <div className="eventDcThumbWrap">
                      <img
                        src={imageUrl(item.cover_image_url || '/features/default_cover_640.webp', 240, 75)}
                        alt={item.title}
                        width={84}
                        height={84}
                        {...(idx === 0
                          ? { loading: 'eager', fetchPriority: 'high' }
                          : { loading: 'lazy' })}
                        decoding="async"
                        className="eventDcThumb"
                        onError={(e) => {
                          e.currentTarget.src = '/features/default_cover_640.webp';
                        }}
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
                              📅 {displayDate}
                            </time>
                          )}
                          {item.event_location && (
                            <>
                              <span className="eventDcDot" aria-hidden="true">
                                {' · '}
                              </span>
                              <span className="eventDcLocation" style={{ color: '#0f766e', fontWeight: 500 }}>
                                📍 {item.event_location}
                              </span>
                            </>
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
              {activeQuery || selectedDate || statusFilter !== 'all'
                ? dict.news.eventsEmptySearchTitle
                : dict.news.eventsEmptyListTitle}
            </p>
            {(activeQuery || selectedDate || statusFilter !== 'all') && (
              <>
                <p className="eventEmptyDesc">{dict.news.eventsEmptySearchDesc}</p>
                <button type="button" onClick={handleClear} className="eventResetBtn">
                  {dict.news.eventsSearchClear}
                </button>
              </>
            )}
          </div>
        )}

        {/* Guide & Travel Tips cross-navigation banner */}
        <div
          style={{
            marginTop: '18px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: '#f0fdfa',
            border: '1px solid #99f6e4',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '0.86rem', color: '#134e4a', lineHeight: 1.5 }}>
            💡 {ui.guidesNotice}
          </span>
          <Link
            href={localePath(locale, '/news')}
            style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#0f766e',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {ui.guidesCta}
          </Link>
        </div>

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
