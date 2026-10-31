import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateEmergencyMetadata, renderEmergencyRoute } from '@/lib/routes/EmergencyRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateEmergencyMetadata(locale as Locale)
}

export default async function LocaleEmergencyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderEmergencyRoute(locale as Locale)
}
