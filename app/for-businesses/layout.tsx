import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "For Businesses | Good Life in Phu Quoc",
  description: "Information for businesses in Phu Quoc to claim or update their listing."
}

export default function ForBusinessesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
