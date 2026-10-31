import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateHotelsMetadata, renderHotelsRoute } from '@/lib/routes/HotelsRoute'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'
import type { HotelArea } from '@/lib/hotels'

export const revalidate = 300

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ area?: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  const sp = searchParams ? await searchParams : undefined
  return generateHotelsMetadata(locale as Locale, sp)
}

export default async function LocaleHotelsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ area?: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  const sp = searchParams ? await searchParams : undefined
  return renderHotelsRoute(locale as Locale, sp?.area as HotelArea | undefined)
}
