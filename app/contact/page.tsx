import type { Metadata } from 'next'
import { generateLegalMetadata, renderLegalRoute } from '@/lib/routes/LegalRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata('contact', 'en')
}

export default async function ContactPage() {
  return renderLegalRoute('contact', 'en')
}
