import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "For Businesses | Good Life in Thaodien",
  description: "Information for businesses in Thao Dien to claim or update their listing."
}

export default function ForBusinessesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
