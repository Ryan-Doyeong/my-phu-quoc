import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateHotelsMetadata, renderHotelsRoute } from '@/lib/routes/HotelsRoute'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateHotelsMetadata(locale as Locale)
}

export default async function LocaleHotelsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderHotelsRoute(locale as Locale)
}
