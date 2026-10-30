import type { Metadata } from 'next'
import { generateTourMetadata, renderTourRoute } from '@/lib/routes/TourRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateTourMetadata('buggy', 'en')
}

export default async function BuggyTourPage() {
  return renderTourRoute('buggy', 'en')
}
