import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { getNoOverchargeCopy } from '@/lib/noOverchargeCopy'
import type { Locale } from '@/lib/i18n/config'

export function NoOvercharge({ locale }: { locale: Locale }) {
  const copy = getNoOverchargeCopy(locale)
  const href = `${CONTACT_CONFIG.whatsappUrl}?text=${encodeURIComponent(copy.prefill)}`
  return (
    <section className="noOverchargeSection" aria-label={copy.title}>
      <div className="noOverchargeBox">
        <span className="noOverchargeIcon" aria-hidden="true">✓</span>
        <div className="noOverchargeText">
          <h2 className="noOverchargeTitle">{copy.title}</h2>
          <p className="noOverchargeBody">{copy.body}</p>
        </div>
        <a className="noOverchargeCta" href={href} target="_blank" rel="noopener noreferrer">
          {copy.cta}
        </a>
      </div>
    </section>
  )
}

export function MustDoBadge({ locale }: { locale: Locale }) {
  return <span className="mustDoBadge">★ {getNoOverchargeCopy(locale).mustDo}</span>
}
