import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  generatePartnersMetadata,
  renderPartnersRoute,
} from '@/lib/routes/BusinessFormsRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generatePartnersMetadata(locale)
}

export default async function LocalePartnersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ slot?: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  const { slot } = await searchParams
  return renderPartnersRoute(slot, locale)
}
