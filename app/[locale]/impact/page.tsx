import { redirect } from 'next/navigation'
import { isPrefixedLocale, localePath } from '@/lib/i18n/config'

export default async function LocaleImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isPrefixedLocale(locale)) {
    redirect('/news')
  }
  redirect(localePath(locale, '/news'))
}
