"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { BANNER_SETTINGS, HOME_BANNERS_CONFIG, type BannerItemConfig } from '@/lib/bannerConfig'

interface MrtBannerCarouselProps {
  locale?: Locale
}

export function MrtBannerCarousel({ locale = 'en' }: MrtBannerCarouselProps) {
  const dict = getDictionary(locale)

  // 활성화된 배너만 필터링 (Ryan 지시: 환전 배너 숨김으로 기본 3장)
  const activeBanners = HOME_BANNERS_CONFIG.filter((b) => b.enabled)
  const totalSlides = activeBanners.length

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef<number>(0)
  const currentXRef = useRef<number>(0)
  const isPointerDownRef = useRef<boolean>(false)

  const nextSlide = useCallback(() => {
    if (totalSlides < 2) return
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    if (totalSlides < 2) return
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // 자동 전환 (1초 주기, 호버 또는 드래그 시 일시정지)
  useEffect(() => {
    if (!isPlaying || isDragging || totalSlides < 2) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, BANNER_SETTINGS.autoplayIntervalMs)

    return () => clearInterval(timer)
  }, [isPlaying, isDragging, totalSlides])

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPlaying(false)
    setIsDragging(true)
    startXRef.current = e.touches[0].clientX
    currentXRef.current = startXRef.current
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    currentXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = startXRef.current - currentXRef.current
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setIsPlaying(true)
  }

  // 마우스 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPlaying(false)
    isPointerDownRef.current = true
    setIsDragging(true)
    startXRef.current = e.clientX
    currentXRef.current = startXRef.current
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDownRef.current) return
    currentXRef.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!isPointerDownRef.current) return
    isPointerDownRef.current = false
    setIsDragging(false)
    const diff = startXRef.current - currentXRef.current
    if (Math.abs(diff) > 35) {
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

  // 배너 아이템 콘텐츠 생성 헬퍼
  const getBannerDetails = (banner: BannerItemConfig) => {
    switch (banner.id) {
      case 'sunset-event':
        return {
          eyebrow: dict.home.bannerSlide1Eyebrow,
          title: dict.home.bannerSlide1Title,
          showAd: false,
        }
      case 'viet-travel-exchange':
        return {
          eyebrow: dict.home.bannerSlide2Eyebrow,
          title: dict.home.bannerSlide2Title,
          showAd: BANNER_SETTINGS.showAdBadge,
        }
      case 'buggy-tour':
        return {
          eyebrow: null,
          title: dict.home.bannerSlide3Title,
          showAd: false,
        }
      case 'taxi-tour':
        return {
          eyebrow: null,
          title: dict.home.bannerSlide4Title,
          showAd: false,
        }
      default:
        return {
          eyebrow: null,
          title: '',
          showAd: false,
        }
    }
  }

  if (totalSlides === 0) return null

  return (
    <section className="mrtBannerSection mode-A" id="mrt-banner-section" aria-label="Main Banners">
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
          {activeBanners.map((banner, index) => {
            const details = getBannerDetails(banner)
            const targetHref = banner.targetUrl ? localePath(locale, banner.targetUrl) : null

            const slideInner = (
              <>
                <img
                  src={banner.image}
                  alt={details.title}
                  className="mrtSlideImg"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="mrtSlideOverlay" />
                <div className="mrtSlideContent">
                  {details.showAd && (
                    <span className="mrtAdBadge" id="adBadge">
                      {dict.home.bannerSlide2AdBadge}
                    </span>
                  )}
                  {details.eyebrow && (
                    <div className="mrtSlideEyebrow">{details.eyebrow}</div>
                  )}
                  <div className="mrtSlideTitle">{details.title}</div>
                </div>
              </>
            )

            if (!targetHref) {
              return (
                <div
                  key={banner.slotKey}
                  className="mrtSlide is-static"
                  data-index={index + 1}
                >
                  {slideInner}
                </div>
              )
            }

            return (
              <Link
                key={banner.slotKey}
                href={targetHref}
                className="mrtSlide"
                data-index={index + 1}
                title={details.title}
              >
                {slideInner}
              </Link>
            )
          })}
        </div>

        {/* Count Indicator Pill (Right Bottom: 1 / 3) */}
        <div className="mrtCounterPill" id="mrtCounterPill" aria-live="polite">
          <span id="currentSlideNum">{currentSlide + 1}</span> / {totalSlides}
        </div>
      </div>
    </section>
  )
}
