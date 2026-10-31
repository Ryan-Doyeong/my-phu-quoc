import type { Metadata } from 'next'
import { generateHotelsMetadata, renderHotelsRoute } from '@/lib/routes/HotelsRoute'
import type { HotelArea } from '@/lib/hotels'

export const revalidate = 300

export async function generateMetadata(props: {
  searchParams?: Promise<{ area?: string }>
}): Promise<Metadata> {
  const sp = props.searchParams ? await props.searchParams : undefined
  return generateHotelsMetadata('en', sp)
}

export default async function HotelsPage(props: {
  searchParams?: Promise<{ area?: string }>
}) {
  const sp = props.searchParams ? await props.searchParams : undefined
  return renderHotelsRoute('en', sp?.area as HotelArea | undefined)
}
