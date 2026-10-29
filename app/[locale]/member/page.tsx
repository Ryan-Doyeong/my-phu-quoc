import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  generateMemberMetadata,
  renderMemberRoute,
} from '@/lib/routes/MemberAndSearchRoutes'
import { isPrefixedLocale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateMemberMetadata(locale)
}

export default async function LocaleMemberPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderMemberRoute(locale)
}

