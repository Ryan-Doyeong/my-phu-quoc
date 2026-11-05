import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateLegalMetadata, renderLegalRoute } from '@/lib/routes/LegalRoutes'
import { isPrefixedLocale, type Locale } from '@/lib/i18n/config'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) return {}
  return generateLegalMetadata('contact', locale as Locale)
}

export default async function LocaleContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) notFound()
  return renderLegalRoute('contact', locale as Locale)
}
