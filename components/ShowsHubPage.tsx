import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { JsonLd } from '@/components/JsonLd'
import { getShowsHubCopy, SHOWS_CHECKED_DATE } from '@/lib/showsHubCopy'
import { localePath, localeUrl, type Locale } from '@/lib/i18n/config'
import { buildWhatsAppLink } from '@/lib/contactLinks'
import { breadcrumbJsonLd, faqJsonLd, graph, inLanguage, organizationRef } from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/supabase/config'
import styles from './ShowsHubPage.module.css'

const BARE_PATH = '/sunset-town-shows'

function eventNode(opts: {
  name: string
  startTime: string
  endTime?: string
  description: string
  url: string
  locale: Locale
}) {
  const [h, m] = opts.startTime.split(':')
  const end = opts.endTime?.split(':')
  return {
    '@type': 'Event',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: inLanguage(opts.locale),
    startDate: `${SHOWS_CHECKED_DATE}T${h}:${m}:00+07:00`,
    // endDate는 공식 시간표로 확인된 경우에만 기재 (확인 안 된 종료 시각은 넣지 않음)
    ...(end ? { endDate: `${SHOWS_CHECKED_DATE}T${end[0]}:${end[1]}:00+07:00` } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Sunset Beach, Sunset Town, Phu Quoc',
      address: { '@type': 'PostalAddress', addressLocality: 'Phu Quoc', addressCountry: 'VN' },
    },
    organizer: { '@type': 'Organization', name: 'Sun World', url: 'https://sunworld.vn' },
  }
}

export function ShowsHubPage({ locale }: { locale: Locale }) {
  const c = getShowsHubCopy(locale)
  const P = (p: string) => localePath(locale, p)
  const url = localeUrl(locale, BARE_PATH)
  const wa = buildWhatsAppLink(`${c.h1} – My Phu Quoc`)

  const symphony = eventNode({
    name: 'Symphony of the Sea',
    startTime: '19:30',
    endTime: '20:05', // showsHubCopy row1Time '19:30–20:05'
    description: `${c.row1Time} · ${c.row1Note}`,
    url,
    locale,
  })
  const kiss = eventNode({
    name: 'Kiss of the Sea',
    startTime: '21:00',
    description: `${c.row2Time} · ${c.row2Note}`,
    url,
    locale,
  })

  const ld = graph(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: c.title,
      description: c.meta,
      inLanguage: inLanguage(locale),
      dateModified: SHOWS_CHECKED_DATE,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: organizationRef(),
    },
    symphony,
    kiss,
    faqJsonLd(
      [
        { q: c.q1, a: c.a1 },
        { q: c.q2, a: c.a2 },
        { q: c.q3, a: c.a3 },
      ],
      locale
    ),
    breadcrumbJsonLd([
      { name: 'My Phu Quoc', url: localeUrl(locale, '/') },
      { name: c.h1, url },
    ])
  )

  const sections = [
    [c.h2_1, c.p1, '/shows/show-1.webp'],
    [c.h2_2, c.p2, '/shows/show-2.webp'],
    [c.h2_3, c.p3, '/shows/show-3.webp'],
    [c.h2_4, c.p4, '/shows/show-4.webp'],
  ] as const

  return (
    <div className={`tourLandingWrap ${styles.wrap}`}>
      <JsonLd data={ld} />
      <SiteHeader locale={locale} />
      <header className={styles.hero}>
        <div className={styles.inner}>
          <h1>{c.h1}</h1>
          <span className={styles.checked}>{c.lastChecked}</span>
          <p className={styles.source}>{c.sourceNote}</p>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.inner}>
          <section className={styles.card}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{c.thShow}</th>
                    <th>{c.thTime}</th>
                    <th>{c.thNote}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.showName}>{c.row1Name}</td>
                    <td className={styles.time}>{c.row1Time}</td>
                    <td>{c.row1Note}</td>
                  </tr>
                  <tr>
                    <td className={styles.showName}>{c.row2Name}</td>
                    <td className={styles.time}>{c.row2Time}</td>
                    <td>{c.row2Note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {sections.map(([h, p, img]) => (
            <section key={h} className={styles.card}>
              <img className={styles.figure} src={img} alt={h} width={960} height={536} loading="lazy" />
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}

          <section className={styles.card}>
            <img className={styles.figure} src="/shows/show-5.webp" alt={c.h2_5} width={960} height={536} loading="lazy" />
            <h2>{c.h2_5}</h2>
            <p>{c.p5}</p>
            <div className={styles.links}>
              <Link className={styles.link} href={P('/buggy-tour')}>{c.linkBuggy}</Link>
              <Link className={styles.link} href={P('/directory/banking')}>{c.linkExchange}</Link>
              <Link className={styles.link} href={P('/hotels')}>{c.linkHotels}</Link>
              <a className={styles.cta} href={wa} target="_blank" rel="noopener noreferrer">{c.ctaWhatsApp}</a>
            </div>
          </section>

          <section className={`${styles.card} ${styles.faq}`}>
            <h2>{c.faqTitle}</h2>
            {[
              [c.q1, c.a1],
              [c.q2, c.a2],
              [c.q3, c.a3],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
