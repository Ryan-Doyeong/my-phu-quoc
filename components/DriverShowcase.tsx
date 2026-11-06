import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { getDriverShowcaseCopy } from '@/lib/driverShowcaseCopy'
import { getNoOverchargeCopy } from '@/lib/noOverchargeCopy'
import type { Locale } from '@/lib/i18n/config'

const DRIVER_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `/activities/drivers/driver-${n}.webp`,
)

export function DriverShowcase({ locale }: { locale: Locale }) {
  const copy = getDriverShowcaseCopy(locale)
  const report = getNoOverchargeCopy(locale)
  return (
    <section className="driverShowcase">
      <h2 className="driverShowcaseTitle">{copy.title}</h2>
      <p className="driverShowcaseSub">{copy.subtitle}</p>
      <div className="driverShowcaseGrid">
        {DRIVER_PHOTOS.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={copy.alt} loading="lazy" width={360} height={480} />
        ))}
      </div>
      <ul className="driverShowcasePoints">
        {copy.points.map((p) => (
          <li key={p}>
            <span aria-hidden="true">✓</span> {p}
          </li>
        ))}
      </ul>
      <p className="driverShowcaseReport">
        <strong>{copy.report}</strong>{' '}
        <a
          href={`${CONTACT_CONFIG.whatsappUrl}?text=${encodeURIComponent(report.prefill)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {report.cta}
        </a>
      </p>
    </section>
  )
}
