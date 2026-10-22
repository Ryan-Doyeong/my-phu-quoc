import { generateSearchMetadata, renderSearchRoute } from '@/lib/routes/MemberAndSearchRoutes'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return generateSearchMetadata('en')
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return renderSearchRoute(q, 'en')
}
