import type { Metadata } from 'next'
import { createPublicClient } from '@/lib/supabase/public'
import { PartnersClient } from '@/app/partners/PartnersClient'
import { ForBusinessesClient } from '@/components/ForBusinessesClient'
import { buildAlternates, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function generateForBusinessesMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const dict = getDictionary(locale)
  const barePath = '/for-businesses'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  return {
    title: dict.intake.metaTitle,
    description: dict.intake.metaDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: dict.intake.metaTitle,
      description: dict.intake.metaDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export function renderForBusinessesRoute(locale: Locale = 'en') {
  return <ForBusinessesClient locale={locale} />
}

export async function generatePartnersMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const barePath = '/partners'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)
  const title =
    locale === 'vi'
      ? 'Đối tác Cộng đồng — Good Life in Phu Quoc'
      : locale === 'ko'
      ? '커뮤니티 파트너 — Good Life in Phu Quoc'
      : 'Community Partners — Good Life in Phu Quoc'
  const description =
    locale === 'vi'
      ? 'Đồng hành cùng Good Life in Phu Quoc với tư cách Đối tác Cộng đồng Sáng lập. Năm vị trí, ba tháng miễn phí — cùng nhau vì một Thảo Điền tươi đẹp.'
      : locale === 'ko'
      ? 'Good Life in Phu Quoc의 창립 커뮤니티 파트너로 함께해 주세요. 5개 자리 한정, 첫 3개월 무료 — 함께 만들어가는 아름다운 타오디엔.'
      : 'Join Good Life in Phu Quoc as a Founding Community Partner. Five places, three months free — for a beautiful Phu Quoc, together.'

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
    },
  }
}

export async function renderPartnersRoute(slot: string | undefined, locale: Locale = 'en') {
  const supabase = createPublicClient()
  let businesses: { id: string; public_name: string; slug: string }[] = []
  try {
    const { data } = await supabase
      .from('businesses')
      .select('id, public_name, slug')
      .eq('status', 'published')
      .order('public_name')
    if (data) businesses = data
  } catch {
    businesses = []
  }

  return <PartnersClient initialLang={locale} initialSlot={slot || ''} businesses={businesses} />
}
