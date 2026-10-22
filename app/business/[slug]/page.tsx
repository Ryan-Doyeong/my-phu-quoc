import { generateBusinessMetadata, renderBusinessRoute } from '@/lib/routes/BusinessRoute'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return generateBusinessMetadata(slug, 'en')
}

export default async function BusinessDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return renderBusinessRoute(slug, 'en')
}
