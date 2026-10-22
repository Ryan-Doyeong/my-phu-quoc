import { generateNewsListMetadata, renderNewsListRoute } from '@/lib/routes/NewsRoutes'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateNewsListMetadata('en')
}

export default async function NewsPage() {
  return renderNewsListRoute('en')
}
