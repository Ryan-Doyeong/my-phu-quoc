import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
import {
  LOCALE_COOKIE_NAME,
  LEGACY_LOCALE_COOKIE_NAME,
  isPrefixedLocale,
  isValidLocale,
  localePath,
  stripLocalePrefix,
  detectPreferredLocale,
} from '@/lib/i18n/config'

const AUTH_PREFIXES = [
  '/admin',
  '/editor',
  '/account',
  '/login',
  '/auth',
  '/api/auth',
  '/api/admin',
]

const BOT_UA_REGEX =
  /bot|crawler|spider|slurp|googlebot|bingbot|yandex|baiduspider|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot|semrushbot|ahrefsbot|mj12bot|petalbot|gptbot|claudebot|perplexitybot/i

export async function proxy(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') || ''
  const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  if (process.env.NODE_ENV === 'production' && forwarded === 'http' && host && !isLocalhost) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = host
    return NextResponse.redirect(url, 308)
  }

  const { pathname, searchParams } = request.nextUrl

  // 1) Unnecessary /en prefix -> unprefixed English path (301)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const barePath = pathname === '/en' ? '/' : pathname.slice(3) || '/'
    const url = request.nextUrl.clone()
    url.pathname = barePath
    if (url.searchParams.has('lang')) {
      const qLang = url.searchParams.get('lang')?.toLowerCase()
      url.searchParams.delete('lang')
      if (isPrefixedLocale(qLang)) {
        url.pathname = localePath(qLang, barePath)
      }
    }
    return NextResponse.redirect(url, 301)
  }

  // 1-b) Deactivated /vi prefix -> redirect to unprefixed path (301)
  if (pathname === '/vi' || pathname.startsWith('/vi/')) {
    const barePath = pathname === '/vi' ? '/' : pathname.slice(3) || '/'
    const url = request.nextUrl.clone()
    url.pathname = barePath
    return NextResponse.redirect(url, 301)
  }

  // 2) Old Phu Quoc-style events URL (/news/events) -> standalone /events board (301)
  {
    const { locale: evLocale, barePath: evPath } = stripLocalePrefix(pathname)
    if (evPath === '/news/events' || evPath === '/news/events/') {
      const url = request.nextUrl.clone()
      url.pathname = localePath(evLocale, '/events')
      return NextResponse.redirect(url, 301)
    }
  }

  // 3) ?lang=<locale> query parameter -> 301 redirect to path-based locale URL
  const langParam = searchParams.get('lang')?.toLowerCase()
  if (isValidLocale(langParam)) {
    const { barePath } = stripLocalePrefix(pathname)
    const url = request.nextUrl.clone()
    url.pathname = localePath(langParam, barePath)
    url.searchParams.delete('lang')
    return NextResponse.redirect(url, 301)
  }

  // 4) Root (/) visit by non-bot browser:
  // - First visit: Accept-Language header detection (zh, ko, ja, ru, hi -> auto redirect; other -> en)
  // - Subsequent visits: User-selected cookie (NEXT_LOCALE / mpq_lang) overrides auto detection
  if (pathname === '/' && searchParams.toString() === '') {
    const ua = request.headers.get('user-agent') || ''
    if (!BOT_UA_REGEX.test(ua)) {
      const cookieLang =
        request.cookies.get(LOCALE_COOKIE_NAME)?.value?.toLowerCase() ||
        request.cookies.get(LEGACY_LOCALE_COOKIE_NAME)?.value?.toLowerCase()

      if (cookieLang) {
        // User explicitly picked a language earlier
        if (isPrefixedLocale(cookieLang)) {
          const url = request.nextUrl.clone()
          url.pathname = `/${cookieLang}`
          return NextResponse.redirect(url, 307)
        }
      } else {
        // First visit: inspect Accept-Language
        const acceptLang = request.headers.get('accept-language')
        const preferred = detectPreferredLocale(acceptLang)
        if (isPrefixedLocale(preferred)) {
          const url = request.nextUrl.clone()
          url.pathname = `/${preferred}`
          return NextResponse.redirect(url, 307)
        }
      }
    }
  }

  // 5) Determine active locale and inject x-gl-locale request header for RootLayout (<html lang={locale}>)
  const { locale } = stripLocalePrefix(pathname)
  const isAuthRoute = AUTH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (isAuthRoute) {
    return updateSession(request)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-gl-locale', locale)
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)$).*)',
  ],
}
