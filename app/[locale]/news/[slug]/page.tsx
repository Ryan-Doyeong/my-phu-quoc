import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateArticleMetadata, renderArticleRoute } from '@/lib/routes/NewsRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateArticleMetadata(slug, locale)
}

export default async function LocaleArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderArticleRoute(slug, locale, 'news')
}
