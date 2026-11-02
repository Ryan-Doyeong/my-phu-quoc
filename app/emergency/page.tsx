import type { Metadata } from 'next'
import { generateEmergencyMetadata, renderEmergencyRoute } from '@/lib/routes/EmergencyRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateEmergencyMetadata('ko')
}

export default async function EmergencyPage() {
  return renderEmergencyRoute('ko')
}
