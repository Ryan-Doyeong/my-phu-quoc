import type { Metadata } from 'next'
import { generateShowsMetadata, renderShowsRoute } from '@/lib/routes/ShowsRoute'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateShowsMetadata('en')
}

export default async function SunsetTownShowsPage() {
  return renderShowsRoute('en')
}
