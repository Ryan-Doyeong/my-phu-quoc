import { getAirportTaxiCopy } from '@/lib/airportTaxiCopy'
import type { Locale } from '@/lib/i18n/config'

export function AirportTaxiHighlight({
  locale,
  whatsappHref,
}: {
  locale: Locale
  whatsappHref: string
}) {
  const copy = getAirportTaxiCopy(locale)
  return (
    <section className="airportTaxi" id="airport-taxi">
      <span className="airportTaxiBadge">★ {copy.badge}</span>
      <h2 className="airportTaxiTitle">{copy.title}</h2>
      <p className="airportTaxiSub">{copy.subtitle}</p>
      <div className="airportTaxiGrid">
        {copy.points.map((p, i) => (
          <article key={p.title} className="airportTaxiPoint">
            <span className="airportTaxiNo" aria-hidden="true">
              {i + 1}
            </span>
            <span className="airportTaxiIcon" aria-hidden="true">
              {p.icon}
            </span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="airportTaxiCta">
        {copy.cta}
      </a>
    </section>
  )
}
