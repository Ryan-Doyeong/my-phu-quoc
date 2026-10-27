import React from 'react'
import type { Metadata } from 'next'
import MapPage, { generateMetadata as generateMapMetadata } from '@/app/[locale]/map/page'

export async function generateMetadata(): Promise<Metadata> {
  return generateMapMetadata({ params: Promise.resolve({ locale: 'en' }) })
}

export default async function DefaultMapPage() {
  return <MapPage params={Promise.resolve({ locale: 'en' })} />
}
