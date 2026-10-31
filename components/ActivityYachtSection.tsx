import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { MARMORIS_YACHT_TOURS, type L } from '@/lib/activities/marmorisYacht'
import type { Locale } from '@/lib/i18n/config'

/* ko = 한국어 확정, 그 외 언어는 영어 원문 사용 (ChatGPT 검수 대기) */
const pick = (l: L, locale: Locale) => (locale === 'ko' ? l.ko : l.en)

const UI = {
  ko: { section: '요트 투어', lead: '선셋타운 선착장에서 출발하는 프리미엄 요트입니다. 가격과 일정은 파트너사 기준입니다.', partner: '파트너', per: '1인', from: '부터', schedule: '일정 보기', included: '포함 · 추가요금', wa: 'WhatsApp 문의', za: 'Zalo 문의', credit: '사진 출처: Marmoris Yachting' },
  en: { section: 'Yacht Tours', lead: 'Premium yachts departing from Sunset Town Pier. Prices and schedules are provided by our partner.', partner: 'Partner', per: 'per person', from: 'from', schedule: 'View schedule', included: 'Included · Extras', wa: 'WhatsApp', za: 'Zalo', credit: 'Photos: Marmoris Yachting' },
} as const

export function ActivityYachtSection({ locale = 'ko' }: { locale?: Locale }) {
  const ui = locale === 'ko' ? UI.ko : UI.en
  return (
    <section className="yachtSection" id="yacht">
      <h2 className="activitiesSectionTitle">{ui.section}</h2>
      <p className="yachtLead">{ui.lead}</p>
      <div className="yachtGrid">
        {MARMORIS_YACHT_TOURS.map((t) => (
          <article key={t.id} className="yachtCard">
            <div className="yachtPhoto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.images[0]} alt={pick(t.title, locale)} loading="lazy" />
              <span className="yachtBadge">{pick(t.badge, locale)}</span>
            </div>
            <div className="yachtThumbs">
              {t.images.slice(1).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
            <div className="yachtBody">
              <p className="yachtOp">{ui.partner} · {t.operator}</p>
              <h3 className="yachtTitle">{pick(t.title, locale)}</h3>
              <div className="yachtMeta">
                <span>{t.hours}</span>
                {t.facts.map((f) => <span key={f.en}>{pick(f, locale)}</span>)}
              </div>
              <div className="yachtTags">
                {t.tags.map((g) => <span key={g.en}>{pick(g, locale)}</span>)}
              </div>
              <div className="yachtPrice">
                {t.priceVnd.toLocaleString('en-US')} ₫{locale === 'ko' ? '~' : '+'}
                <small>{ui.per}</small>
              </div>

              <details className="yachtDetails">
                <summary>{ui.schedule}</summary>
                <ul className="yachtTimeline">
                  {t.steps.map((s) => (
                    <li key={s.time + s.title.en}>
                      <time>{s.time}</time>
                      <div>
                        <b>{pick(s.title, locale)}</b>
                        {s.desc && <span>{pick(s.desc, locale)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
                {t.notes.map((n) => <p key={n.en} className="yachtNote">{pick(n, locale)}</p>)}
              </details>

              <details className="yachtDetails">
                <summary>{ui.included}</summary>
                <ul className="yachtList">
                  {t.included.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtNote">{pick(t.extra, locale)}</p>
              </details>

              <div className="yachtCta">
                <a href={CONTACT_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="yachtCtaPrimary">{ui.wa}</a>
                <a href={CONTACT_CONFIG.zaloUrl} target="_blank" rel="noopener noreferrer" className="yachtCtaGhost">{ui.za}</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="yachtCredit">{ui.credit}</p>
    </section>
  )
}
