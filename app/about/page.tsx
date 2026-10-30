import type { Metadata } from 'next'
import { generateAboutMetadata, renderAboutRoute } from '@/lib/routes/AboutRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateAboutMetadata('en')
}

export default async function AboutPage() {
  return renderAboutRoute('en')
}
