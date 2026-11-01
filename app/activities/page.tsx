import type { Metadata } from 'next'
import { generateActivitiesMetadata, renderActivitiesRoute } from '@/lib/routes/ActivityRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateActivitiesMetadata('ko')
}

export default async function ActivitiesPage() {
  return renderActivitiesRoute('ko')
}
