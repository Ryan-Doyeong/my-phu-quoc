import { generateArticleMetadata, renderArticleRoute } from '@/lib/routes/NewsRoutes'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return generateArticleMetadata(slug, 'en')
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return renderArticleRoute(slug, 'en', 'news')
}
