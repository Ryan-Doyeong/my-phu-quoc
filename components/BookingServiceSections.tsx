import Link from 'next/link'
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { localePath, type Locale } from '@/lib/i18n/config'
import { BOOKING_SERVICE_COPY, buildServiceWhatsappUrl } from '@/lib/i18n/bookingServiceCopy'

export function BookingCommonIntroCallout({ locale = 'ko' }: { locale?: Locale }) {
  const copy = BOOKING_SERVICE_COPY[locale] ?? BOOKING_SERVICE_COPY.en
  return (
    <div className="mpqServiceIntroCallout" role="note">
      <div className="mpqServiceIntroInner">
        <span className="mpqServiceIntroEyebrow">{copy.commonIntro.eyebrow}</span>
        <h2 className="mpqServiceIntroTitle">{copy.commonIntro.title}</h2>
        <p className="mpqServiceIntroBody">{copy.commonIntro.body}</p>
      </div>
    </div>
  )
}

export function BookingServiceOverviewSection({ locale = 'ko' }: { locale?: Locale }) {
  const copy = BOOKING_SERVICE_COPY[locale] ?? BOOKING_SERVICE_COPY.en

  const cards = [
    {
      key: 'buggy',
      data: copy.buggyTour,
      href: localePath(locale, '/buggy-tour'),
    },
    {
      key: 'car-tour',
      data: copy.carTour,
      href: localePath(locale, '/taxi-tour'),
    },
    {
      key: 'transfer',
      data: copy.transfer,
      href: `${localePath(locale, '/taxi-tour')}#transfer-service`,
    },
    {
      key: 'activities',
      data: copy.activities,
      href: localePath(locale, '/activities'),
    },
  ]

  return (
    <section className="shell mpqServiceOverviewSection" aria-labelledby="mpq-service-overview-heading">
      <div className="mpqServiceOverviewHeader">
        <span className="mpqServiceIntroEyebrow">{copy.commonIntro.eyebrow}</span>
        <h2 id="mpq-service-overview-heading" className="mpqServiceOverviewTitle">
          {copy.commonIntro.title}
        </h2>
        <p className="mpqServiceOverviewLead">{copy.commonIntro.body}</p>
      </div>

      <div className="mpqServiceOverviewGrid">
        {cards.map((card) => (
          <article key={card.key} className="mpqServiceOverviewCard">
            <div className="mpqServiceCardTop">
              <span className="mpqServiceCardTag">{card.data.tag}</span>
              <span className="mpqServicePriceBadge">{card.data.priceLabel}</span>
            </div>
            <h3 className="mpqServiceCardTitle">{card.data.title}</h3>
            <p className="mpqServiceCardDesc">{card.data.body}</p>
            <div className="mpqServiceCardActions">
              <a
                href={buildServiceWhatsappUrl(card.data.prefillMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mpqServiceBtnPrimary"
              >
                {card.data.ctaLabel}
              </a>
              <div className="mpqServiceSubActions">
                <Link href={card.href} className="mpqServiceBtnLink">
                  {card.data.detailLabel} →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CommonHelpSection({ locale = 'ko' }: { locale?: Locale }) {
  const copy = BOOKING_SERVICE_COPY[locale] ?? BOOKING_SERVICE_COPY.en
  const whatsappUrl = buildServiceWhatsappUrl(copy.commonHelp.prefillMessage)

  return (
    <section className="mpqCommonHelpSection" aria-labelledby="mpq-common-help-title">
      <div className="mpqCommonHelpBox">
        <span className="mpqCommonHelpEyebrow">{copy.commonHelp.eyebrow}</span>
        <h2 id="mpq-common-help-title" className="mpqCommonHelpTitle">
          {copy.commonHelp.title}
        </h2>
        <p className="mpqCommonHelpBody">{copy.commonHelp.body}</p>
        <div className="mpqCommonHelpActions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mpqCommonHelpBtnPrimary"
          >
            {copy.commonHelp.ctaLabel}
          </a>
          <a
            href={`tel:${CONTACT_CONFIG.phoneNumber}`}
            className="mpqCommonHelpBtnPhone"
          >
            📞 {copy.commonHelp.callLabel} ({CONTACT_CONFIG.phoneFormatted})
          </a>
        </div>
      </div>
    </section>
  )
}
