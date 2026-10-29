import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateZoneMetadata, renderZoneRoute } from '@/lib/routes/ZoneRoute'
import { isPrefixedLocale } from '@/lib/i18n/config'
import { MAIN_ZONES, type MainZoneSlug } from '@/lib/zones'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) return {}
  if (!MAIN_ZONES[slug as MainZoneSlug]) return {}
  return generateZoneMetadata(slug, locale)
}

export default async function LocaleZonePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) notFound()
  if (!MAIN_ZONES[slug as MainZoneSlug]) notFound()
  return renderZoneRoute(slug, locale)
}
