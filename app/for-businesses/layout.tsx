import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "For Businesses | Hello Sunset Town",
  description: "Information for businesses in Sunset Town and Phu Quoc to claim or update their listing."
}

export default function ForBusinessesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
