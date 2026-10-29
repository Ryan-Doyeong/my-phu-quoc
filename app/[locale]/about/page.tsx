import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateAboutMetadata, renderAboutRoute } from '@/lib/routes/AboutRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateAboutMetadata(locale as Locale)
}

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderAboutRoute(locale as Locale)
}
