import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateActivitiesMetadata, renderActivitiesRoute } from '@/lib/routes/ActivityRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateActivitiesMetadata(locale as Locale)
}

export default async function LocaleActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderActivitiesRoute(locale as Locale)
}
