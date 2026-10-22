import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateSearchMetadata, renderSearchRoute } from '@/lib/routes/MemberAndSearchRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateSearchMetadata(locale)
}

export default async function LocaleSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  const { q } = await searchParams
  return renderSearchRoute(q, locale)
}
