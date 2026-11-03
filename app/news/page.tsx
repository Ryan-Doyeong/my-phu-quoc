import { generateNewsListMetadata, renderNewsListRoute } from '@/lib/routes/NewsRoutes'
import { parseContentCategory } from '@/lib/contentCategories'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateNewsListMetadata('en')
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { category } = await searchParams
  return renderNewsListRoute('en', parseContentCategory(category))
}
