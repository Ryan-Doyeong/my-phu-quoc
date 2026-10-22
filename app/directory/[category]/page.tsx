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
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  return renderDirectoryRoute(category, 'en')
}
