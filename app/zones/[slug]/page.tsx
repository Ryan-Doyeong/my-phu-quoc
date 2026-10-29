import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { generateZoneMetadata, renderZoneRoute } from '@/lib/routes/ZoneRoute'
import { MAIN_ZONES, type MainZoneSlug } from '@/lib/zones'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!MAIN_ZONES[slug as MainZoneSlug]) return {}
  return generateZoneMetadata(slug, 'en')
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!MAIN_ZONES[slug as MainZoneSlug]) notFound()
  return renderZoneRoute(slug, 'en')
}
