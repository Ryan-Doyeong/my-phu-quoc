import React from 'react'
import type { Metadata } from 'next'
import MapPreviewPage, { generateMetadata as generateMapPreviewMetadata } from '@/app/[locale]/map-preview/page'

export async function generateMetadata(): Promise<Metadata> {
  return generateMapPreviewMetadata({ params: Promise.resolve({ locale: 'en' }) })
}

export default async function DefaultMapPreviewPage() {
  return <MapPreviewPage params={Promise.resolve({ locale: 'en' })} />
}
