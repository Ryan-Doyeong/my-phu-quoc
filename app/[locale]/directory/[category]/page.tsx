import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateDirectoryMetadata, renderDirectoryRoute } from '@/lib/routes/DirectoryRoute'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}): Promise<Metadata> {
  const { locale, category } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateDirectoryMetadata(category, locale)
}

export default async function LocaleDirectoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>
  searchParams?: Promise<{ zone?: string }>
}) {
  const { locale, category } = await params
  if (!isPrefixedLocale(locale)) notFound()
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  return renderDirectoryRoute(category, locale, resolvedSearchParams)
}
