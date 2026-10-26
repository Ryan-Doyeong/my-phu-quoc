import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import './globals.css'
import './sunset-town-custom.css'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { SiteFooter } from '@/components/SiteFooter'
import { SITE_URL } from '@/lib/supabase/config'
import { normalizeLocale } from '@/lib/i18n/config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'My Phu Quoc — Sunset Town & Island Travel Guide',
  description: 'MyPhuQuoc.NET — Your curated local guide to Sunset Town, Kiss Bridge, fireworks, dining, and southern Phu Quoc, An Giang.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap"
        />
      </head>
      <body>
        <AnalyticsTracker />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
