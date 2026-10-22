import { generateMemberMetadata, renderMemberRoute } from '@/lib/routes/MemberAndSearchRoutes'
import type { Metadata } from 'next'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return generateMemberMetadata('en')
}

export default function MemberPage() {
  return renderMemberRoute('en')
}
