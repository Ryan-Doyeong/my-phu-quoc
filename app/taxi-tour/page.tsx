import type { Metadata } from 'next'
import { generateTourMetadata, renderTourRoute } from '@/lib/routes/TourRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateTourMetadata('taxi', 'en')
}

export default async function TaxiTourPage() {
  return renderTourRoute('taxi', 'en')
}
