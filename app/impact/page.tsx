import { generateImpactMetadata, renderImpactRoute } from '@/lib/routes/ImpactRoute'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateImpactMetadata('en')
}

export default async function ImpactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>
}) {
  const { topic } = await searchParams
  return renderImpactRoute(topic, 'en')
}
