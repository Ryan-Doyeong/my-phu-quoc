"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { imageUrl } from '@/lib/imageUrl'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Banner = {
  slot_key: string
  title: string | null
  subtitle: string | null
  image_url: string
  target_url: string | null
}

function resolvePartnerUrl(
  locale: Locale,
  slot_key: string,
  title?: string | null,
  target_url?: string | null
): string {
  if (target_url && target_url !== '#') {
    if (target_url.startsWith('/')) {
      const [p, q] = target_url.split('?')
      const localized = localePath(locale, p)
      return q ? `${localized}?${q}` : localized
    }
    return target_url
  }
  const t = (title || '').toLowerCase()
  const basePartners = localePath(locale, '/partners')
  if (slot_key === 'main-1' || t.includes('local living')) return `${basePartners}?slot=featured`
  if (slot_key === 'small-1' || t.includes('food')) return `${basePartners}?slot=food`
  if (slot_key === 'small-2' || t.includes('fitness')) return `${basePartners}?slot=fitness`
  if (slot_key === 'small-3' || t.includes('caf')) return `${basePartners}?slot=cafe`
  if (slot_key === 'small-4' || t.includes('community')) return `${basePartners}?slot=community`
  if (slot_key.startsWith('main-')) return `${basePartners}?slot=featured`
  return basePartners
}

function localizeSponsorBanner(banner: Banner, locale: Locale): { title: string; subtitle: string | null } {
  const rawTitle = banner.title || ''
  const rawSub = banner.subtitle || null
  if (locale === 'en') return { title: rawTitle, subtitle: rawSub }

  const key = banner.slot_key
  if (locale === 'vi') {
    if (key === 'main-1' || /featured partner/i.test(rawTitle)) {
      return {
        title: 'Vị trí Đối tác Nổi bật · Đang mở đăng ký',
        subtitle: 'Đồng hành cùng khu phố — miễn phí 3 tháng đầu cho Đối tác Cộng đồng Sáng lập.',
      }
    }
    if (key === 'small-1' || /food partner/i.test(rawTitle)) {
      return { title: 'Đối tác Ẩm thực · Còn trống', subtitle: rawSub }
    }
    if (key === 'small-2' || /fitness partner/i.test(rawTitle)) {
      return { title: 'Đối tác Thể dục · Còn trống', subtitle: rawSub }
    }
    if (key === 'small-3' || /caf[eé] partner/i.test(rawTitle)) {
      return { title: 'Đối tác Cà phê · Còn trống', subtitle: rawSub }
    }
    if (key === 'small-4' || /community partner/i.test(rawTitle)) {
      return { title: 'Đối tác Cộng đồng · Còn trống', subtitle: rawSub }
    }
  }

  if (locale === 'ko') {
    if (key === 'main-1' || /featured partner/i.test(rawTitle)) {
      return {
        title: '대표 커뮤니티 파트너 자리 · 신청 가능',
        subtitle: '타오디엔 이웃과 함께하는 창립 커뮤니티 파트너 — 첫 3개월 무료.',
      }
    }
    if (key === 'small-1' || /food partner/i.test(rawTitle)) {
      return { title: '미식 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (key === 'small-2' || /fitness partner/i.test(rawTitle)) {
      return { title: '운동 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (key === 'small-3' || /caf[eé] partner/i.test(rawTitle)) {
      return { title: '카페 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (key === 'small-4' || /community partner/i.test(rawTitle)) {
      return { title: '커뮤니티 파트너 · 신청 가능', subtitle: rawSub }
    }
  }

  return { title: rawTitle, subtitle: rawSub }
}

export function SponsorCarousel({
  main,
  small,
  locale = 'en',
}: {
  main: Banner[]
  small: Banner[]
  locale?: Locale
}) {
  const dict = getDictionary(locale)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (main.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % main.length), 5000)
    return () => clearInterval(timer)
  }, [main.length])
  if (!main.length && !small.length) return null
  const active = main[index] || main[0]
  const activeHref = active ? resolvePartnerUrl(locale, active.slot_key, active.title, active.target_url) : '#'
  const isActiveExternal = activeHref.startsWith('http')
  const activeLocalized = active ? localizeSponsorBanner(active, locale) : { title: '', subtitle: null }

  const activeContent = active ? (
    <>
      <img
        src={imageUrl(active.image_url, 1400, 72)}
        alt={activeLocalized.title || 'Sponsor banner'}
        loading="lazy"
        decoding="async"
      />
      <div className="sponsorShade" />
      <div className="sponsorCopy">
        <span>{dict.home.sponsoredBadge}</span>
        <h3>{activeLocalized.title}</h3>
        {activeLocalized.subtitle && <p>{activeLocalized.subtitle}</p>}
      </div>
    </>
  ) : null

  return (
    <section className="shell sponsorsSection" aria-label="Sponsors">
      <div className="sectionIntro sponsorIntro">
        <div>
          <span className="eyebrow">{dict.home.sponsorEyebrow}</span>
          <h2>{dict.home.sponsorTitle}</h2>
          <p>{dict.home.sponsorDesc}</p>
        </div>
        <span className="sponsorCount">{dict.home.sponsorCount}</span>
      </div>
      {active && (
        <div className="mainSponsorFrame">
          {isActiveExternal ? (
            <a
              href={activeHref}
              className="mainSponsorLink"
              data-analytics-type="sponsor"
              data-analytics-id={active.slot_key}
              target="_blank"
              rel="noreferrer"
            >
              {activeContent}
            </a>
          ) : (
            <Link
              href={activeHref}
              className="mainSponsorLink"
              data-analytics-type="sponsor"
              data-analytics-id={active.slot_key}
            >
              {activeContent}
            </Link>
          )}
          {main.length > 1 && (
            <div className="sponsorDots">
              {main.map((x, i) => (
                <button
                  key={x.slot_key}
                  aria-label={`Show sponsor ${i + 1}`}
                  className={i === index ? 'active' : ''}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {!!small.length && (
        <div className="smallSponsorGrid">
          {small.slice(0, 4).map((x) => {
            const href = resolvePartnerUrl(locale, x.slot_key, x.title, x.target_url)
            const isExternal = href.startsWith('http')
            const locSmall = localizeSponsorBanner(x, locale)
            const smallContent = (
              <>
                <img
                  src={imageUrl(x.image_url, 520, 68)}
                  alt={locSmall.title || 'Sponsor'}
                  loading="lazy"
                  decoding="async"
                />
                <span>{dict.home.sponsoredBadge}</span>
                <strong>{locSmall.title}</strong>
              </>
            )
            return isExternal ? (
              <a
                key={x.slot_key}
                href={href}
                data-analytics-type="sponsor"
                data-analytics-id={x.slot_key}
                target="_blank"
                rel="noreferrer"
              >
                {smallContent}
              </a>
            ) : (
              <Link
                key={x.slot_key}
                href={href}
                data-analytics-type="sponsor"
                data-analytics-id={x.slot_key}
              >
                {smallContent}
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
