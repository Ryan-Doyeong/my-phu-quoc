'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { imageUrl } from '@/lib/imageUrl'
import { dateLocaleFor, localePath, type Locale } from '@/lib/i18n/config'
import { EventsBoard, type EventBoardItem } from '@/components/EventsBoard'
import { getEventProgressStatus, getEventStatusLabel } from '@/lib/eventSamples'
import {
  EVENT_HUB_LABELS,
  getEventTrack,
  overlapsWeekend,
  type EventTrack,
  type HighlightFilter,
} from '@/lib/eventTracks'

function endOf(item: EventBoardItem) {
  return item.event_end_date || item.effective_date || null
}

function formatDate(iso: string | null | undefined, locale: Locale) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  if (locale === 'ko') {
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }
  return d.toLocaleDateString(dateLocaleFor(locale), { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatRange(item: EventBoardItem, locale: Locale) {
  const a = formatDate(item.event_date || item.published_at, locale)
  const b = formatDate(endOf(item), locale)
  return a && b && a !== b ? `${a} ~ ${b}` : a
}

export function EventsHub({ items, locale }: { items: EventBoardItem[]; locale: Locale }) {
  const t = EVENT_HUB_LABELS[locale] || EVENT_HUB_LABELS.en
  const [track, setTrack] = useState<EventTrack | 'all'>('all')
  const [chip, setChip] = useState<HighlightFilter>('all')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('track')
    if (q === 'south' || q === 'island') setTrack(q)
  }, [])

  const counts = useMemo(() => {
    const c = { south: 0, island: 0 }
    items.forEach((it) => {
      if (getEventProgressStatus(it.event_date, endOf(it)) === 'ended') return
      c[getEventTrack(it)] += 1
    })
    return c
  }, [items])

  const trackItems = useMemo(
    () => (track === 'all' ? items : items.filter((it) => getEventTrack(it) === track)),
    [items, track]
  )

  const highlights = useMemo(() => {
    const rank = (it: EventBoardItem) => (getEventProgressStatus(it.event_date, endOf(it)) === 'ongoing' ? 0 : 1)
    return trackItems
      .filter((it) => {
        const st = getEventProgressStatus(it.event_date, endOf(it))
        if (st === 'ended') return false
        if (chip === 'ongoing') return st === 'ongoing'
        if (chip === 'upcoming') return st === 'upcoming'
        if (chip === 'weekend') return overlapsWeekend(it.event_date, endOf(it))
        return true
      })
      .sort((a, b) => {
        if (rank(a) !== rank(b)) return rank(a) - rank(b)
        const at = new Date(a.event_date || a.published_at || 0).getTime()
        const bt = new Date(b.event_date || b.published_at || 0).getTime()
        return rank(a) === 0 ? bt - at : at - bt
      })
      .slice(0, 3)
  }, [trackItems, chip])

  const topSlugs = useMemo(() => new Set(highlights.map((h) => h.slug)), [highlights])
  const hasAnyActive = useMemo(
    () => trackItems.some((it) => getEventProgressStatus(it.event_date, endOf(it)) !== 'ended'),
    [trackItems]
  )
  const hasActiveBeyondHighlights = useMemo(
    () => trackItems.some((it) => !topSlugs.has(it.slug) && getEventProgressStatus(it.event_date, endOf(it)) !== 'ended'),
    [trackItems, topSlugs]
  )
  const listItems = useMemo(
    () => (hasActiveBeyondHighlights ? trackItems.filter((it) => !topSlugs.has(it.slug)) : trackItems),
    [trackItems, topSlugs, hasActiveBeyondHighlights]
  )
  const hasActiveMore = hasAnyActive

  const trackCard = (key: EventTrack, tag: string, title: string, desc: string) => {
    const on = track === key
    return (
      <button
        type="button"
        className={`evTrackCard evTrack_${key}${on ? ' on' : ''}`}
        aria-pressed={on}
        onClick={() => setTrack(on ? 'all' : key)}
      >
        <span className="evTrackTag">{tag}</span>
        <span className="evTrackCount">{counts[key]}</span>
        <strong className="evTrackTitle">{title}</strong>
        <span className="evTrackDesc">{desc}</span>
      </button>
    )
  }

  const chips: { key: HighlightFilter; label: string }[] = [
    { key: 'all', label: t.chipAll },
    { key: 'ongoing', label: t.chipOngoing },
    { key: 'upcoming', label: t.chipUpcoming },
    { key: 'weekend', label: t.chipWeekend },
  ]

  return (
    <>
      <section className="shell evHub">
        <div className="evTrackGrid">
          {trackCard('south', t.track1Tag, t.track1Title, t.track1Desc)}
          {trackCard('island', t.track2Tag, t.track2Title, t.track2Desc)}
        </div>

        <div className="evHlHead">
          <div>
            <span className="evHlEyebrow">{t.hlEyebrow}</span>
            <h2 className="evHlTitle">{t.hlTitle}</h2>
          </div>
          <div className="evChips" role="tablist">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={chip === c.key}
                className={`evChip${chip === c.key ? ' on' : ''}`}
                onClick={() => setChip(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {highlights.length > 0 ? (
          <div className="evHlGrid">
            {highlights.map((it, i) => {
              const st = getEventProgressStatus(it.event_date, endOf(it))
              const label = getEventStatusLabel(st, locale)
              return (
                <Link key={it.slug} href={localePath(locale, `/events/${it.slug}`)} className="evHlCard">
                  <div className="evHlImg">
                    <img
                      src={imageUrl(it.cover_image_url || '/features/default_cover_640.webp', 720, 75)}
                      alt={it.title}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = '/features/default_cover_640.webp'
                      }}
                    />
                    <span className="evHlTop">
                      {t.topLabel} {i + 1}
                    </span>
                  </div>
                  <div className="evHlBody">
                    <div className="evHlBadges">
                      {label && <span className={`eventStatusBadge ${st === 'ended' ? 'ended' : 'ongoing'}`}>{label}</span>}
                      <span className="evHlTrack">{getEventTrack(it) === 'south' ? t.track1Tag.split('·')[1]?.trim() : t.track2Tag.split('·')[1]?.trim()}</span>
                      {it.category && <span className="evHlCat">{it.category}</span>}
                    </div>
                    <h3 className="evHlName">{it.title}</h3>
                    <p className="evHlMeta">📅 {formatRange(it, locale)}</p>
                    {it.event_location && <p className="evHlMeta evHlLoc">📍 {it.event_location}</p>}
                    {it.excerpt && <p className="evHlExcerpt">{it.excerpt}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="evHlEmpty">{t.noHighlights}</p>
        )}

        {listItems.length > 0 && (
          <h2 className="evMoreTitle">{hasActiveMore ? t.moreTitle : t.pastTitle}</h2>
        )}
      </section>

      {listItems.length > 0 && (
        <EventsBoard
          key={`${track}-${hasActiveMore ? 'a' : 'p'}`}
          items={listItems}
          locale={locale}
          defaultStatus={hasActiveMore ? 'active' : 'ended'}
        />
      )}

      <section className="shell evCta">
        <div className="evCtaBox">
          <div>
            <strong>{t.ctaTitle}</strong>
            <span>{t.ctaDesc}</span>
          </div>
          <Link href={localePath(locale, '/contact')} className="evCtaBtn">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  )
}
