"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { localizeStory } from '@/lib/i18n/dictionaries'
import { PUBLISHED_EVENTS } from '@/lib/eventSamples'
import {
  BANNER_SETTINGS,
  HOME_EVENT_BANNERS_CONFIG,
  type EventBannerSlideConfig,
} from '@/lib/bannerConfig'

type BannerStoryInput = {
  id?: string
  slug: string
  title?: string
  category?: string | null
  excerpt?: string | null
  cover_image_url?: string | null
  content_type?: string | null
  [key: string]: any
}

interface MrtBannerCarouselProps {
  locale?: Locale
  events?: BannerStoryInput[]
}

interface ResolvedSlide {
  slotKey: string
  eyebrow: string
  title: string
  subtitle: string
  image: string
  href: string
}

const DEFAULT_EYEBROW: Record<Locale, string> = {
  ko: '이벤트 · 공지',
  en: 'Event & Notice',
  zh: '活动与公告',
  ru: 'События и объявления',
  ja: 'イベント・お知らせ',
  hi: 'इवेंट और सूचना',
  vi: 'Sự kiện & Thông báo',
}

const CAROUSEL_ARIA_LABEL: Record<Locale, string> = {
  ko: '이벤트·공지 슬라이드 배너',
  en: 'Events and Notices Banner Carousel',
  zh: '活动与公告轮播横幅',
  ru: 'Карусель баннеров событий и объявлений',
  ja: 'イベント・お知らせスライドバナー',
  hi: 'इवेंट और सूचना स्लाइड बैनर',
  vi: 'Banner sự kiện và thông báo',
}

export function MrtBannerCarousel({ locale = 'en', events = [] }: MrtBannerCarouselProps) {
  const slides: ResolvedSlide[] = useMemo(() => {
    const storyPool: BannerStoryInput[] = [...events, ...PUBLISHED_EVENTS]
    const seenSlugs = new Set<string>()
    const resolved: ResolvedSlide[] = []

    const activeConfigs = HOME_EVENT_BANNERS_CONFIG.filter((cfg) => cfg.enabled).slice(0, 3)

    for (const cfg of activeConfigs) {
      const matchedRaw = cfg.storySlug
        ? storyPool.find((item) => item.slug === cfg.storySlug)
        : undefined
      const localized = matchedRaw ? localizeStory(matchedRaw, locale) : null

      if (matchedRaw?.slug) {
        seenSlugs.add(matchedRaw.slug)
      }

      const contentType = matchedRaw?.content_type || 'event'
      const defaultPath = matchedRaw?.slug
        ? `/${contentType === 'event' ? 'events' : 'news'}/${matchedRaw.slug}`
        : '/events'

      const rawTarget = cfg.targetUrl || defaultPath
      const href = localePath(locale, rawTarget)
      const image =
        cfg.image ||
        localized?.cover_image_url ||
        matchedRaw?.cover_image_url ||
        '/banners/event_nightlife.webp'

      const eyebrow =
        cfg.eyebrowOverride?.[locale] ||
        cfg.eyebrowOverride?.en ||
        localized?.category ||
        DEFAULT_EYEBROW[locale] ||
        DEFAULT_EYEBROW.en

      const title =
        cfg.titleOverride?.[locale] ||
        cfg.titleOverride?.en ||
        localized?.title ||
        ''

      const subtitle =
        cfg.subtitleOverride?.[locale] ||
        cfg.subtitleOverride?.en ||
        localized?.excerpt ||
        ''

      if (title) {
        resolved.push({
          slotKey: cfg.slotKey,
          eyebrow,
          title,
          subtitle,
          image,
          href,
        })
      }
    }

    // 설정된 슬라이드가 3개 미만일 경우 기존 이벤트·공지 풀에서 보충
    if (resolved.length < 3) {
      for (const raw of storyPool) {
        if (resolved.length >= 3) break
        if (!raw.slug || seenSlugs.has(raw.slug)) continue
        seenSlugs.add(raw.slug)
        const localized = localizeStory(raw, locale)
        const contentType = raw.content_type || 'event'
        resolved.push({
          slotKey: `fallback-${raw.slug}`,
          eyebrow: localized.category || DEFAULT_EYEBROW[locale] || DEFAULT_EYEBROW.en,
          title: localized.title,
          subtitle: localized.excerpt || '',
          image: localized.cover_image_url || '/banners/event_nightlife.webp',
          href: localePath(locale, `/${contentType === 'event' ? 'events' : 'news'}/${raw.slug}`),
        })
      }
    }

    return resolved.slice(0, 3)
  }, [events, locale])

  const totalSlides = slides.length

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef<number>(0)
  const startYRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)
  const currentYRef = useRef<number>(0)
  const isPointerDownRef = useRef<boolean>(false)
  const didSwipeRef = useRef<boolean>(false)

  const nextSlide = useCallback(() => {
    if (totalSlides < 2) return
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    if (totalSlides < 2) return
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (!isPlaying || isDragging || totalSlides < 2) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, BANNER_SETTINGS.autoplayIntervalMs)

    return () => clearInterval(timer)
  }, [isPlaying, isDragging, totalSlides])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPlaying(false)
    setIsDragging(true)
    didSwipeRef.current = false
    startXRef.current = e.touches[0].clientX
    startYRef.current = e.touches[0].clientY
    currentXRef.current = startXRef.current
    currentYRef.current = startYRef.current
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    currentXRef.current = e.touches[0].clientX
    currentYRef.current = e.touches[0].clientY
    const diffX = Math.abs(startXRef.current - currentXRef.current)
    const diffY = Math.abs(startYRef.current - currentYRef.current)
    if (diffX > 12 && diffX > diffY) {
      didSwipeRef.current = true
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diffX = startXRef.current - currentXRef.current
    const diffY = startYRef.current - currentYRef.current
    if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
      didSwipeRef.current = true
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setIsPlaying(true)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPlaying(false)
    isPointerDownRef.current = true
    setIsDragging(true)
    didSwipeRef.current = false
    startXRef.current = e.clientX
    currentXRef.current = startXRef.current
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDownRef.current) return
    currentXRef.current = e.clientX
    if (Math.abs(startXRef.current - currentXRef.current) > 10) {
      didSwipeRef.current = true
    }
  }

  const handleMouseUp = () => {
    if (!isPointerDownRef.current) return
    isPointerDownRef.current = false
    setIsDragging(false)
    const diff = startXRef.current - currentXRef.current
    if (Math.abs(diff) > 35) {
      didSwipeRef.current = true
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setIsPlaying(true)
  }

  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    if (isPointerDownRef.current) {
      isPointerDownRef.current = false
      setIsDragging(false)
    }
    setIsPlaying(true)
  }

  const handleSlideClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (didSwipeRef.current) {
      e.preventDefault()
      didSwipeRef.current = false
    }
  }

  if (totalSlides === 0) return null

  return (
    <section
      className="mrtBannerSection mode-A"
      id="mrt-banner-section"
      aria-label={CAROUSEL_ARIA_LABEL[locale] || CAROUSEL_ARIA_LABEL.en}
    >
      <div
        className="mrtBannerContainer"
        id="mrtBannerContainer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="mrtSlideTrack"
          id="mrtSlideTrack"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Link
              key={slide.slotKey}
              href={slide.href}
              className="mrtSlide"
              data-index={index + 1}
              title={slide.title}
              draggable={false}
              onClick={handleSlideClick}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="mrtSlideImg"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
              <div className="mrtSlideOverlay" />
              <div className="mrtSlideContent">
                {slide.eyebrow && (
                  <div className="mrtSlideEyebrow">{slide.eyebrow}</div>
                )}
                <div className="mrtSlideTitle">{slide.title}</div>
                {slide.subtitle && (
                  <div className="mrtSlideSub">{slide.subtitle}</div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Count Indicator Pill (Right Bottom: 1 / 3) */}
        <div className="mrtCounterPill" id="mrtCounterPill" aria-live="polite">
          <span id="currentSlideNum">{currentSlide + 1}</span> / {totalSlides}
        </div>
      </div>

      {/* 현재 위치를 보여주는 표시점 3개 (Indicator Dots) */}
      <div className="mrtDots" role="tablist" aria-label="Slide Indicator">
        {slides.map((slide, index) => (
          <button
            key={slide.slotKey}
            type="button"
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Slide ${index + 1}: ${slide.title}`}
            className={`mrtDot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => {
              setCurrentSlide(index)
              setIsPlaying(false)
            }}
          />
        ))}
      </div>
    </section>
  )
}
