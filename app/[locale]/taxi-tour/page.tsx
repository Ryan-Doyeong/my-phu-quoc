import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateTourMetadata, renderTourRoute } from '@/lib/routes/TourRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateTourMetadata('taxi', locale as Locale)
}

export default async function LocaleTaxiTourPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderTourRoute('taxi', locale as Locale)
}
