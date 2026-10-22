import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateEventsMetadata, renderEventsRoute } from '@/lib/routes/NewsRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateEventsMetadata(locale)
}

export default async function LocaleEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderEventsRoute(locale)
}
