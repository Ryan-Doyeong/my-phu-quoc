import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateItinerariesMetadata, renderItinerariesRoute } from '@/lib/routes/ItineraryRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateItinerariesMetadata(locale as Locale)
}

export default async function LocaleItinerariesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderItinerariesRoute(locale as Locale)
}
