import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateNewsListMetadata, renderNewsListRoute } from '@/lib/routes/NewsRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'
import { parseContentCategory } from '@/lib/contentCategories'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateNewsListMetadata(locale)
}

export default async function LocaleNewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { locale } = await params
  const { category } = await searchParams
  if (!isPrefixedLocale(locale)) notFound()
  return renderNewsListRoute(locale, parseContentCategory(category))
}
