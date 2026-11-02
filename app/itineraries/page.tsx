import type { Metadata } from 'next'
import { generateItinerariesMetadata, renderItinerariesRoute } from '@/lib/routes/ItineraryRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateItinerariesMetadata('ko')
}

export default async function ItinerariesPage() {
  return renderItinerariesRoute('ko')
}
