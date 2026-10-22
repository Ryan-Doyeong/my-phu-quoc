import {
  generatePartnersMetadata,
  renderPartnersRoute,
} from '@/lib/routes/BusinessFormsRoutes'
import type { Metadata } from 'next'

export const revalidate = 300

type Props = {
  searchParams: Promise<{ slot?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePartnersMetadata('en')
}

export default async function PartnersPage({ searchParams }: Props) {
  const { slot } = await searchParams
  return renderPartnersRoute(slot, 'en')
}
