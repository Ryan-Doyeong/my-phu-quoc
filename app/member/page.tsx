import type { Metadata } from 'next'
import {
  generateMemberMetadata,
  renderMemberRoute,
} from '@/lib/routes/MemberAndSearchRoutes'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return generateMemberMetadata('en')
}

export default function MemberPage() {
  return renderMemberRoute('en')
}

