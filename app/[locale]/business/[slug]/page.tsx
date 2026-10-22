import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateBusinessMetadata, renderBusinessRoute } from '@/lib/routes/BusinessRoute'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateBusinessMetadata(slug, locale)
}

export default async function LocaleBusinessDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderBusinessRoute(slug, locale)
}
