import {
  generateForBusinessesMetadata,
  renderForBusinessesRoute,
} from '@/lib/routes/BusinessFormsRoutes'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateForBusinessesMetadata('en')
}

export default function BusinessPage() {
  return renderForBusinessesRoute('en')
}
