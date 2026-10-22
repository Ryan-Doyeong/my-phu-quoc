import { generateEventsMetadata, renderEventsRoute } from '@/lib/routes/NewsRoutes'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateEventsMetadata('en')
}

export default async function EventsPage() {
  return renderEventsRoute('en')
}
