import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import './globals.css'
import './sunset-town-custom.css'
import './trip-planner.css'
import { FloatingContact } from '@/components/FloatingContact'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { SiteFooter } from '@/components/SiteFooter'
import { SITE_URL } from '@/lib/supabase/config'
import { normalizeLocale } from '@/lib/i18n/config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'My Phu Quoc — Sunset Town & Island Travel Guide',
  description: 'MyPhuQuoc.NET — Your curated local guide to Sunset Town, Kiss Bridge, fireworks, dining, and southern Phu Quoc, An Giang.',
  verification: {
    google: '6FfEKv96WlVRG5ro9J6eMUi2LRTki7l5_MkFYm0fhVs',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

const CJK_FONT_FAMILY: Record<string, string> = {
  ko: 'Noto+Sans+KR',
  zh: 'Noto+Sans+SC',
  ja: 'Noto+Sans+JP',
  hi: 'Noto+Sans+Devanagari',
}

function fontsHref(lang: string): string {
  const families = ['Noto+Sans:wght@400;700']
  const extra = CJK_FONT_FAMILY[lang]
  if (extra) families.push(`${extra}:wght@400;700`)
  return `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join('&')}&display=swap`
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  let lang = 'en'
  try {
    const h = await headers()
    lang = normalizeLocale(h.get('x-gl-locale'))
  } catch {
    lang = 'en'
  }

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref(lang)} />
      </head>
      <body>
        <AnalyticsTracker />
        {children}
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  )
}
