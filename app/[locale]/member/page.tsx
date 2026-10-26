import { redirect } from 'next/navigation'
import { isPrefixedLocale, localePath } from '@/lib/i18n/config'

export default async function LocaleMemberPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) {
    redirect('/')
  }
  redirect(localePath(locale, '/'))
}
