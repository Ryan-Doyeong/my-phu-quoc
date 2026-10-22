import { generateHomeMetadata, renderHomeRoute } from '@/lib/routes/HomeRoute'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateHomeMetadata('en')
}

export default async function Page() {
  return renderHomeRoute('en')
}
