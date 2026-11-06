import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { buildAlternates, localePath, localeUrl, ogLocaleFor, type Locale } from '@/lib/i18n/config'
import { SITE_CONTACT } from '@/lib/siteAgent'

type Page = 'contact' | 'terms'

/** 한국어·영어만 작성. 다른 언어는 영어로 표시(번역은 ChatGPT 검수 후 추가). */
const TEXT = {
  en: {
    contact: {
      title: 'Contact',
      desc: 'Contact My Phu Quoc by email, phone or WhatsApp.',
      intro: 'For corrections, business listings, partnership inquiries or tour questions, please reach us through any channel below.',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
    },
    terms: {
      title: 'Terms of Use & Disclaimer',
      desc: 'Terms of use and booking disclaimer of My Phu Quoc.',
      items: [
        'My Phu Quoc is an independent travel guide to Sunset Town and southern Phu Quoc. Information is compiled from official channels and Google Maps and may change without notice.',
        'Prices, hours and schedules shown are general guides. They may vary with season, weather, sea conditions and operations. Please confirm with the business before you go.',
        'For tours and activities, My Phu Quoc only assists with booking. The tour itself is operated by, and is the responsibility of, the listed operator.',
        'Hotel and ticket links (for example Agoda, Klook) lead to third-party sites that have their own terms.',
        'Photos and text belong to their owners. Please contact us if you believe something should be corrected or removed.',
      ],
    },
  },
  ko: {
    contact: {
      title: '문의하기',
      desc: '마이 푸꾸옥 이메일·전화·WhatsApp 연락처.',
      intro: '정보 수정, 업체 등록, 제휴, 투어 문의는 아래 채널로 연락해 주세요.',
      email: '이메일',
      phone: '전화',
      whatsapp: 'WhatsApp',
    },
    terms: {
      title: '이용약관 및 면책 안내',
      desc: '마이 푸꾸옥 이용약관과 예약 관련 면책 안내.',
      items: [
        '마이 푸꾸옥은 선셋타운과 푸꾸옥 남부를 소개하는 독립 여행 가이드입니다. 정보는 공식 채널과 구글맵을 바탕으로 정리하며 예고 없이 바뀔 수 있습니다.',
        '표시된 가격·운영시간·일정은 일반적인 기준이며 계절, 날씨, 해상 상태, 운영 사정에 따라 달라질 수 있습니다. 방문 전 업체에 확인해 주세요.',
        '투어·액티비티는 마이 푸꾸옥이 예약을 도와드릴 뿐이며, 실제 운영과 책임은 해당 운영 업체에 있습니다.',
        '호텔·티켓 링크(아고다, Klook 등)는 별도의 약관이 적용되는 외부 사이트로 연결됩니다.',
        '사진과 글의 권리는 각 권리자에게 있으며, 수정·삭제가 필요하면 연락해 주세요.',
      ],
    },
  },
} as const

function t(locale: Locale) {
  return locale === 'ko' ? TEXT.ko : TEXT.en
}

export function generateLegalMetadata(page: Page, locale: Locale = 'en'): Metadata {
  const c = t(locale)[page]
  const barePath = `/${page}`
  const canonicalUrl = localeUrl(locale, barePath)
  return {
    title: `${c.title} | My Phu Quoc`,
    description: c.desc,
    alternates: { canonical: canonicalUrl, languages: buildAlternates(barePath).languages },
    openGraph: { title: c.title, description: c.desc, url: canonicalUrl, locale: ogLocaleFor(locale), type: 'website' },
  }
}

export function renderLegalRoute(page: Page, locale: Locale = 'en') {
  const all = t(locale)
  return (
    <>
      <SiteHeader locale={locale} />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px' }}>
        <p><Link href={localePath(locale, '/')}>← My Phu Quoc</Link></p>
        {page === 'contact' ? (
          <>
            <h1>{all.contact.title}</h1>
            <p>{all.contact.intro}</p>
            <ul>
              <li>{all.contact.email}: <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a></li>
              <li>{all.contact.phone}: <a href={`tel:${SITE_CONTACT.telephone}`}>{SITE_CONTACT.telephoneDisplay}</a></li>
              <li>{all.contact.whatsapp}: <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noreferrer">{SITE_CONTACT.telephoneDisplay}</a></li>
            </ul>
          </>
        ) : (
          <>
            <h1>{all.terms.title}</h1>
            <ol>{all.terms.items.map((it) => <li key={it}>{it}</li>)}</ol>
          </>
        )}
      </main>
    </>
  )
}
