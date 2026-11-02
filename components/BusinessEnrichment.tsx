// Google Maps place card, review highlights and official Instagram posts for a business page.
// Ratings are never stored or printed by us: the Google Maps embed shows them live.
// Review highlights are our own summary of public Google reviews (no quotes, names or star numbers).

import { dateLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary, translateTerm } from '@/lib/i18n/dictionaries'

type GmapsPlace = { name?: string; ftid?: string; lat?: number; lng?: number }
type ReviewSummary = { praised?: string[]; good_to_know?: string[]; topics?: string[]; updated?: string }

function mapEmbedUrl(p: GmapsPlace, query: string | null, locale: Locale = 'en') {
  const hl = locale === 'vi' ? 'vi' : locale === 'ko' ? 'ko' : 'en'
  if (p?.ftid && typeof p.lat === 'number' && typeof p.lng === 'number') {
    const name = encodeURIComponent(p.name || '')
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d${p.lng}!3d${p.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${p.ftid}!2s${name}!5e0!3m2!1s${hl}!2s!4v1760400000000!5m2!1s${hl}!2s`
  }
  if (query) return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=${hl}&z=16&output=embed`
  return null
}

function updatedLabel(v: string | undefined, locale: Locale) {
  if (!v) return null
  const d = new Date(`${v.length === 7 ? `${v}-01` : v}T00:00:00`)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString(dateLocaleFor(locale), { year: 'numeric', month: 'long' })
}

export function BusinessReviews({ b, locale = 'en' }: { b: any; locale?: Locale }) {
  const dict = getDictionary(locale)
  const place: GmapsPlace = b.gmaps_place && typeof b.gmaps_place === 'object' ? b.gmaps_place : {}
  const embed = mapEmbedUrl(place, b.gmaps_query || null, locale)
  const s: ReviewSummary = b.review_summary && typeof b.review_summary === 'object' ? b.review_summary : {}
  const praised = Array.isArray(s.praised) ? s.praised : []
  const know = Array.isArray(s.good_to_know) ? s.good_to_know : []
  const topics = Array.isArray(s.topics) ? s.topics : []
  if (!embed && !praised.length && !topics.length) return null
  const mapsLink = b.gmaps_query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.gmaps_query)}`
    : b.google_maps_url || null
  const updated = updatedLabel(s.updated, locale)
  return (
    <section className="glReviews" aria-labelledby="gl-maps-title">
      {embed && (
        <>
          <h2 id="gl-maps-title">{dict.business.onGoogleMaps}</h2>
          <p className="glSub">{dict.business.liveRatingSub}</p>
          <div className="glMap">
            <iframe
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${b.public_name} on Google Maps`}
            />
          </div>
          <div className="glMapNote">
            <span>{dict.business.mapShownLive}</span>
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                data-analytics-type="business-map"
                data-analytics-id={b.id}
              >
                {dict.business.seeAllReviews}
              </a>
            )}
          </div>
        </>
      )}
      {(topics.length > 0 || praised.length > 0) && (
        <>
          <h2 className="glHeading">{dict.business.whatGuestsMention}</h2>
          {topics.length > 0 && (
            <div className="glTopics">
              {topics.map((t) => (
                <span key={t}>{translateTerm(t, locale)}</span>
              ))}
            </div>
          )}
          {(praised.length > 0 || know.length > 0) && (
            <div className="glCols">
              {praised.length > 0 && (
                <div className="glPlus">
                  <h3>{dict.business.whatPeopleLike}</h3>
                  <ul>
                    {praised.map((x) => (
                      <li key={x}>
                        <b aria-hidden="true">+</b>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {know.length > 0 && (
                <div className="glMinus">
                  <h3>{dict.business.goodToKnow}</h3>
                  <ul>
                    {know.map((x) => (
                      <li key={x}>
                        <b aria-hidden="true">–</b>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <p className="glFoot">{dict.business.reviewSummaryFoot(updated)}</p>
        </>
      )}
    </section>
  )
}

function igHandle(url: string | null) {
  if (!url) return null
  const m = String(url).match(/instagram\.com\/([^/?#]+)/i)
  return m ? m[1] : String(url).replace(/^@/, '')
}

export function BusinessInstagram({ b, locale = 'en' }: { b: any; locale?: Locale }) {
  const dict = getDictionary(locale)
  const posts: string[] = Array.isArray(b.ig_posts)
    ? b.ig_posts.filter((p: string) => /^(p|reel)\/[A-Za-z0-9_-]+$/.test(p))
    : []
  if (!posts.length) return null
  const handle = igHandle(b.instagram_url)
  return (
    <section className="shell glIg">
      <div className="detailCard">
        <h2>{dict.business.fromInstagram}</h2>
        <p className="glSub">
          {handle ? dict.business.igSubWithHandle(handle) : dict.business.igSubDefault}
        </p>
        <div className="glIgRow">
          {posts.slice(0, 4).map((p) => (
            <iframe
              key={p}
              src={`https://www.instagram.com/${p}/embed/`}
              loading="lazy"
              scrolling="no"
              title={`Instagram post${handle ? ` by @${handle}` : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
