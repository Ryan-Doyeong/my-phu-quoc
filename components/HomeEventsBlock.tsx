import Link from 'next/link'
import { imageUrl } from '@/lib/imageUrl'
import { localePath, dateLocaleFor, type Locale } from '@/lib/i18n/config'
import { localizeStory } from '@/lib/i18n/dictionaries'
import { getEventProgressStatus, getEventStatusLabel } from '@/lib/eventSamples'
import { EVENT_HUB_LABELS, getEventTrack, type EventTrack } from '@/lib/eventTracks'

function fmt(iso: string | null | undefined, locale: Locale) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  if (locale === 'ko') {
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }
  return d.toLocaleDateString(dateLocaleFor(locale), { year: 'numeric', month: 'short', day: 'numeric' })
}

export function HomeEventsBlock({ pool, locale }: { pool: any[]; locale: Locale }) {
  const t = EVENT_HUB_LABELS[locale] || EVENT_HUB_LABELS.en
  const items = (pool || []).map((raw) => localizeStory(raw, locale) as any).filter((s) => {
    const end = s.event_end_date || s.effective_date || null
    return getEventProgressStatus(s.event_date, end) !== 'ended'
  })
  const rank = (s: any) =>
    getEventProgressStatus(s.event_date, s.event_end_date || s.effective_date || null) === 'ongoing' ? 0 : 1
  const pick = (track: EventTrack) =>
    items
      .filter((s) => getEventTrack(s) === track)
      .sort((a, b) => {
        if (rank(a) !== rank(b)) return rank(a) - rank(b)
        const at = new Date(a.event_date || a.published_at || 0).getTime()
        const bt = new Date(b.event_date || b.published_at || 0).getTime()
        return rank(a) === 0 ? bt - at : at - bt
      })
      .slice(0, 3)

  const tracks = ([
    { key: 'south' as EventTrack, title: t.track1Title, list: pick('south') },
    { key: 'island' as EventTrack, title: t.track2Title, list: pick('island') },
  ]).filter((x) => x.list.length > 0)

  if (tracks.length === 0) return null

  return (
    <section className="shell homeEv" id="home-events">
      <div className="homeEvHead">
        <span className="homeEvEyebrow">{t.homeEyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.lead}</p>
      </div>
      {tracks.map((tr) => (
        <div className="homeEvTrack" key={tr.key}>
          <div className="homeEvTrackHead">
            <h3>{tr.title}</h3>
            <Link href={`${localePath(locale, '/events')}?track=${tr.key}`}>{t.homeMore}</Link>
          </div>
          <div className="storyGrid storyGrid3">
            {tr.list.map((s) => {
              const end = s.event_end_date || s.effective_date || null
              const st = getEventProgressStatus(s.event_date, end)
              const label = getEventStatusLabel(st, locale)
              const a = fmt(s.event_date || s.published_at, locale)
              const b = fmt(end, locale)
              const range = a && b && a !== b ? `${a} ~ ${b}` : a
              return (
                <Link href={localePath(locale, `/events/${s.slug}`)} key={s.slug}>
                  <article className="storyCard">
                    <div className="storyCardImage">
                      <img
                        src={imageUrl(s.cover_image_url || '/features/default_cover_640.webp', 640, 70)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={426}
                      />
                    </div>
                    <div className="storyCardBody">
                      <span className="storyCategory">
                        {label ? `${label} · ` : ''}
                        {s.category || ''}
                      </span>
                      <h3>{s.title}</h3>
                      <p>
                        📅 {range}
                        {s.event_location ? ` · 📍 ${s.event_location}` : ''}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
