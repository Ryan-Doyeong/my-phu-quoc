import { generateDirectoryMetadata, renderDirectoryRoute } from '@/lib/routes/DirectoryRoute'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  return generateDirectoryMetadata(category, 'en')
}

export default async function DirectoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ zone?: string }>
}) {
  const { category } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  return renderDirectoryRoute(category, 'en', resolvedSearchParams)
}
