import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateLegalMetadata, renderLegalRoute } from '@/lib/routes/LegalRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateLegalMetadata('terms', locale as Locale)
}

export default async function LocaleTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderLegalRoute('terms', locale as Locale)
}
