"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
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
  if (target_url && target_url !== '#' && !target_url.includes('/partners')) {
    if (target_url.startsWith('/')) {
      const [p, q] = target_url.split('?')
      const localized = localePath(locale, p)
      return q ? `${localized}?${q}` : localized
    }
    return target_url
  }
  return '#'
}

function localizeSponsorBanner(banner: Banner, locale: Locale): { title: string; subtitle: string | null } {
  const rawTitle = banner.title || ''
  const rawSub = banner.subtitle || null
  if (locale === 'en') return { title: rawTitle, subtitle: rawSub }

  const key = banner.slot_key
  if (locale === 'vi') {
    if (/featured partner/i.test(rawTitle)) {
      return {
        title: 'Vị trí Đối tác Nổi bật · Đang mở đăng ký',
        subtitle: 'Đồng hành cùng khu phố — miễn phí 3 tháng đầu cho Đối tác Cộng đồng Sáng lập.',
      }
    }
    if (/food partner/i.test(rawTitle)) {
      return { title: 'Đối tác Ẩm thực · Còn trống', subtitle: rawSub }
    }
    if (/fitness partner/i.test(rawTitle)) {
      return { title: 'Đối tác Thể dục · Còn trống', subtitle: rawSub }
    }
    if (/caf[eé] partner/i.test(rawTitle)) {
      return { title: 'Đối tác Cà phê · Còn trống', subtitle: rawSub }
    }
    if (/community partner/i.test(rawTitle)) {
      return { title: 'Đối tác Cộng đồng · Còn trống', subtitle: rawSub }
    }
  }

  if (locale === 'ko') {
    if (/featured partner/i.test(rawTitle)) {
      return {
        title: '대표 커뮤니티 파트너 자리 · 신청 가능',
        subtitle: '푸꾸옥 이웃과 함께하는 창립 커뮤니티 파트너 — 첫 3개월 무료.',
      }
    }
    if (/food partner/i.test(rawTitle)) {
      return { title: '미식 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (/fitness partner/i.test(rawTitle)) {
      return { title: '운동 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (/caf[eé] partner/i.test(rawTitle)) {
      return { title: '카페 파트너 · 신청 가능', subtitle: rawSub }
    }
    if (/community partner/i.test(rawTitle)) {
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
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Touch tracking for swipe
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const isHoveredRef = useRef(false)
  const isTouchingRef = useRef(false)

  // Pause auto-advance temporarily (8s) after user interaction
  const triggerUserInteraction = useCallback(() => {
    setIsPaused(true)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }, [])

  const nextSlide = useCallback(() => {
    if (main.length < 2) return
    triggerUserInteraction()
    setIndex((i) => (i + 1) % main.length)
  }, [main.length, triggerUserInteraction])

  const prevSlide = useCallback(() => {
    if (main.length < 2) return
    triggerUserInteraction()
    setIndex((i) => (i - 1 + main.length) % main.length)
  }, [main.length, triggerUserInteraction])

  const goToSlide = useCallback(
    (i: number) => {
      triggerUserInteraction()
      setIndex(i)
    },
    [triggerUserInteraction]
  )

  useEffect(() => {
    if (main.length < 2) return
    const timer = setInterval(() => {
      if (!isPaused && !isHoveredRef.current && !isTouchingRef.current) {
        setIndex((i) => (i + 1) % main.length)
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [main.length, isPaused])

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isTouchingRef.current = true
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    isTouchingRef.current = false
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    // Only swipe if horizontal movement is dominant
    const minDistance = 35
    if (Math.abs(deltaX) >= minDistance && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }

  if (!main.length && !small.length) return null
  const active = main[index] || main[0]
  const activeHref = active ? resolvePartnerUrl(locale, active.slot_key, active.title, active.target_url) : '#'
  const isActiveExternal = activeHref.startsWith('http')
  const activeLocalized = active ? localizeSponsorBanner(active, locale) : { title: '', subtitle: null }

  const isExchange = active?.slot_key === 'main-1' || active?.image_url?.includes('viet-travel-exchange')
  const isTour =
    active?.slot_key === 'main-2' ||
    active?.slot_key === 'main-3' ||
    active?.image_url?.includes('buggy-tour') ||
    active?.image_url?.includes('taxi-tour')

  const slogan = isExchange
    ? dict.home.bannerExchangeSlogan
    : isTour
    ? dict.home.bannerTourSlogan
    : activeLocalized.subtitle

  const activeContent = active ? (
    <>
      <img
        src={imageUrl(active.image_url, 1400, 72)}
        alt={activeLocalized.title || ''}
        loading="lazy"
        decoding="async"
      />
      <div className="sponsorShade" />
      <div className="sponsorCopy">
        <h3>{activeLocalized.title}</h3>
        {slogan && <p>{slogan}</p>}
      </div>
    </>
  ) : null

  return (
    <section className="shell sponsorsSection">
      {active && (
        <div
          className="mainSponsorFrame"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Banners"
          onMouseEnter={() => {
            isHoveredRef.current = true
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
        >
          {isActiveExternal ? (
            <a
              href={activeHref}
              className="mainSponsorLink"
              data-analytics-id={active.slot_key}
              target="_blank"
              rel="noreferrer"
            >
              {activeContent}
            </a>
          ) : activeHref !== '#' ? (
            <Link
              href={activeHref}
              className="mainSponsorLink"
              data-analytics-id={active.slot_key}
            >
              {activeContent}
            </Link>
          ) : (
            <div
              className="mainSponsorLink"
              data-analytics-id={active.slot_key}
            >
              {activeContent}
            </div>
          )}
          {main.length > 1 && (
            <>
              <button
                type="button"
                className="bannerArrow bannerArrowPrev"
                aria-label="Previous slide"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  prevSlide()
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="bannerArrow bannerArrowNext"
                aria-label="Next slide"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  nextSlide()
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="sponsorDots">
                {main.map((x, i) => (
                  <button
                    key={x.slot_key}
                    aria-label={`Show slide ${i + 1}`}
                    className={i === index ? 'active' : ''}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToSlide(i)
                    }}
                  />
                ))}
              </div>
            </>
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
                  alt={locSmall.title || ''}
                  loading="lazy"
                  decoding="async"
                />
                <strong>{locSmall.title}</strong>
              </>
            )
            return isExternal ? (
              <a
                key={x.slot_key}
                href={href}
                data-analytics-type="banner"
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
                data-analytics-type="banner"
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
