import { CONTACT_CONFIG } from '@/lib/contactConfig'
import {
  MARMORIS_YACHT_TOURS,
  YACHT_CANCELLATION,
  YACHT_CANCEL_NOTE,
  YACHT_CHILD_POLICY,
  YACHT_EXCLUDED,
  YACHT_EXTRA_PAID,
  YACHT_INCLUDED,
  type L,
} from '@/lib/activities/marmorisYacht'
import type { Locale } from '@/lib/i18n/config'

/* ko = 한국어 확정, 그 외 언어는 영어 원문 사용 (ChatGPT 검수 대기) */
const pick = (l: L, locale: Locale) => (locale === 'ko' ? l.ko : l.en)

const UI = {
  ko: { section: '요트 투어', lead: '푸꾸옥 바다를 즐기는 프리미엄 요트 투어입니다. 가격과 일정은 파트너사 기준입니다.', partner: '파트너', per: '1인', from: '부터', schedule: '일정 보기', included: '포함 · 불포함', policy: '취소 · 아동 정책', extraPaid: '추가요금(별도, 오션 클래스 기준)', excluded: '불포함', cancelTitle: '취소·환불', childTitle: '아동 요금', wa: 'WhatsApp 문의', za: 'Zalo 문의', credit: '사진 출처: Marmoris Yachting', notice: '관광은 날씨와 해상 상태, 당일 상황 등 여러 변수의 영향을 받습니다. 아래 일정과 시간은 일반적인 기준이며, 실제 운영은 이를 감안해 조정될 수 있습니다.' },
  en: { section: 'Yacht Tours', lead: 'Premium yacht tours on the waters of Phu Quoc. Prices and schedules are provided by our partner.', partner: 'Partner', per: 'per person', from: 'from', schedule: 'View schedule', included: 'Included · Excluded', policy: 'Cancellation · Children', extraPaid: 'Additional charge (Ocean Class)', excluded: 'Not included', cancelTitle: 'Cancellation', childTitle: 'Children', wa: 'WhatsApp', za: 'Zalo', credit: 'Photos: Marmoris Yachting', notice: 'Sightseeing depends on weather, sea conditions and other circumstances on the day. The schedules and times below are general guidelines and actual operations may be adjusted accordingly.' },
} as const

export function ActivityYachtSection({ locale = 'ko' }: { locale?: Locale }) {
  const ui = locale === 'ko' ? UI.ko : UI.en
  return (
    <section className="yachtSection" id="yacht">
      <h2 className="activitiesSectionTitle">{ui.section}</h2>
      <p className="yachtLead">{ui.lead}</p>
      <p className="yachtNotice">{ui.notice}</p>
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
              <ul className="yachtClasses">
                {t.classes.map((c) => (
                  <li key={c.name.en}>
                    <div className="yachtClassMain">
                      <span>
                        <b>{pick(c.name, locale)}</b>
                        <em>{pick(c.deck, locale)}</em>
                      </span>
                      <strong>{c.priceVnd.toLocaleString('en-US')} ₫<small>{ui.per}</small></strong>
                    </div>
                    {c.note && <p className="yachtClassNote">{pick(c.note, locale)}</p>}
                  </li>
                ))}
              </ul>

              <details className="yachtDetails">
                <summary>{ui.schedule}</summary>
                <p className="yachtNote">{pick(t.flow, locale)}</p>
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
                  {YACHT_INCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.extraPaid}</p>
                <ul className="yachtList">
                  {YACHT_EXTRA_PAID.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.excluded}</p>
                <ul className="yachtList">
                  {YACHT_EXCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
              </details>

              <details className="yachtDetails">
                <summary>{ui.policy}</summary>
                <p className="yachtSub">{ui.cancelTitle}</p>
                {YACHT_CANCELLATION.map((g) => (
                  <div key={g.title.en}>
                    <p className="yachtGroup">{pick(g.title, locale)}</p>
                    <ul className="yachtList">
                      {g.rows.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                    </ul>
                  </div>
                ))}
                <p className="yachtNote">{pick(YACHT_CANCEL_NOTE, locale)}</p>
                <p className="yachtSub">{ui.childTitle}</p>
                <ul className="yachtList">
                  {YACHT_CHILD_POLICY.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                </ul>
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
