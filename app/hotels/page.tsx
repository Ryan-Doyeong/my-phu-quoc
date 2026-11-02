import type { Metadata } from 'next'
import { generateHotelsMetadata, renderHotelsRoute } from '@/lib/routes/HotelsRoute'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateHotelsMetadata('en')
}

export default async function HotelsPage() {
  return renderHotelsRoute('en')
}
