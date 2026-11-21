import type { Metadata } from 'next'
import { TourLandingPage } from '@/components/TourLandingPage'
import {
  buildAlternates,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { SITE_URL } from '@/lib/supabase/config'
import { VEHICLE_FARES } from '@/lib/vehiclePricing'

function getAirportToSouthFareFormatted(seats: 4 | 7 | 16): string {
  const row = VEHICLE_FARES.find((f) => f.seats === seats)
  const amount = row?.south.airportToSouth ?? 0
  return amount.toLocaleString('en-US')
}

const TAXI_TOUR_SEO: Partial<Record<Locale, { title: string; description: string }>> = {
  ko: {
    title: '푸꾸옥 공항↔선셋타운(남부) 택시 요금·차량 투어 | 마이 푸꾸옥',
    description: `푸꾸옥 공항↔남부(선셋타운 방면) 택시 요금: 4인승 ${getAirportToSouthFareFormatted(4)}동, 7인승 ${getAirportToSouthFareFormatted(7)}동, 16인승 ${getAirportToSouthFareFormatted(16)}동(차량 1대 기준). 차량 투어 코스와 요금, WhatsApp 문의 방법을 확인하세요.`,
  },
  en: {
    title: 'Phu Quoc Airport to Sunset Town Taxi Fares & Private Car Tours | My Phu Quoc',
    description: `Private taxi between Phu Quoc Airport and the south (Sunset Town area): 4-seater ${getAirportToSouthFareFormatted(4)} VND, 7-seater ${getAirportToSouthFareFormatted(7)} VND, 16-seater ${getAirportToSouthFareFormatted(16)} VND per vehicle. See car tour routes, fares and how to contact us on WhatsApp.`,
  },
}

const BUGGY_TOUR_SEO: Partial<Record<Locale, { title: string }>> = {
  ko: {
    title: '푸꾸옥 선셋타운 버기 투어 예약 | 마이 푸꾸옥',
  },
  en: {
    title: 'Sunset Town Buggy Tour, Phu Quoc | My Phu Quoc',
  },
}

export function generateTourMetadata(
  type: 'buggy' | 'taxi',
  locale: Locale = 'en'
): Metadata {
  const dict = getDictionary(locale)
  const isBuggy = type === 'buggy'
  const tourData = isBuggy ? dict.buggyTour : dict.taxiTour
  const path = isBuggy ? '/buggy-tour' : '/taxi-tour'

  const seoOverride = isBuggy ? BUGGY_TOUR_SEO[locale] : TAXI_TOUR_SEO[locale]
  const titleText = seoOverride?.title ?? `${tourData.pageTitle} | My Phu Quoc`
  const title = seoOverride ? { absolute: titleText } : titleText
  const description =
    (!isBuggy && TAXI_TOUR_SEO[locale]?.description) || tourData.heroSubtitle
  const canonical = localeUrl(locale, path)
  const alternates = buildAlternates(path)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: titleText,
      description,
      url: canonical,
      siteName: 'My Phu Quoc',
      locale: ogLocaleFor(locale),
      type: 'website',
      images: [
        {
          url: isBuggy
            ? `${SITE_URL}/banners/phu_quoc_buggy_tour_v5.webp`
            : `${SITE_URL}/banners/phu_quoc_taxi_tour_v5.webp`,
          width: 1200,
          height: 630,
          alt: titleText,
        },
      ],
    },
  }
}

export function renderTourRoute(type: 'buggy' | 'taxi', locale: Locale = 'en') {
  return <TourLandingPage type={type} locale={locale} />
}
