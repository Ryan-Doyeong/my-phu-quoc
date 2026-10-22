import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateImpactMetadata, renderImpactRoute } from '@/lib/routes/ImpactRoute'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateImpactMetadata(locale)
}

export default async function LocaleImpactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ topic?: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  const { topic } = await searchParams
  return renderImpactRoute(topic, locale)
}
