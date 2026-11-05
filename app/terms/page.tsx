import type { Metadata } from 'next'
import { generateLegalMetadata, renderLegalRoute } from '@/lib/routes/LegalRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata('terms', 'en')
}

export default async function TermsPage() {
  return renderLegalRoute('terms', 'en')
}
