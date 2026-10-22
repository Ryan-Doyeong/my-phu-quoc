import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateHomeMetadata, renderHomeRoute } from '@/lib/routes/HomeRoute'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateHomeMetadata(locale)
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderHomeRoute(locale)
}
