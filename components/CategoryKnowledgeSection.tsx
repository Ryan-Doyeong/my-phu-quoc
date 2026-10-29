import React from 'react'
import type { FoodGuideSectionData } from '@/lib/foodKnowledge'
import type { Locale } from '@/lib/i18n/config'
import { tUi } from '@/lib/i18n/uiStrings'

interface CategoryKnowledgeSectionProps {
  eyebrow: string
  title?: string
  introText?: string
  sections: FoodGuideSectionData[]
  locale?: Locale
}

const CATEGORY_GUIDE_TITLE: Record<string, string> = {
  ko: '선셋타운 필수 상식 & 이용 안내 가이드',
  vi: 'Cẩm nang kinh nghiệm & Hướng dẫn trải nghiệm',
  en: 'Essential Tips & Category Guide',
  zh: '日落小镇必备常识与游览指南',
  ru: 'Основные сведения и руководство для посетителей Сансет-Тауна',
  ja: 'サンセットタウンの基本知識・利用ガイド',
  hi: 'सनसेट टाउन की ज़रूरी जानकारी और आगंतुक गाइड',
}

const CATEGORY_GUIDE_INTRO: Record<string, string> = {
  ko: '방문 전 알아두면 유용한 기본 상식과 실전 팁을 안내합니다.',
  vi: 'Những thông tin hữu ích và mẹo thực tế bạn nên biết trước khi trải nghiệm.',
  en: 'Helpful background knowledge and practical tips to know before your visit.',
  zh: '提供到访前值得了解的基本知识和实用建议。',
  ru: 'Основная информация и практические советы, которые полезно знать перед посещением.',
  ja: '訪問前に知っておくと役立つ基本知識と実用的なヒントをご案内します。',
  hi: 'यात्रा से पहले जानने योग्य बुनियादी जानकारी और व्यावहारिक सुझाव दिए जाते हैं।',
}

export function CategoryKnowledgeSection({
  eyebrow,
  title,
  sections,
  locale = 'ko',
}: CategoryKnowledgeSectionProps) {
  if (!sections || sections.length === 0) return null

  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const displayTitle =
    (title && tUi(title, locale)) ||
    CATEGORY_GUIDE_TITLE[locale] ||
    CATEGORY_GUIDE_TITLE.en

  const intro =
    CATEGORY_GUIDE_INTRO[locale] ||
    CATEGORY_GUIDE_INTRO.en

  return (
    <section className="detailCard foodGuideCard" id="knowledge-guide">
      <span className="eyebrow">{tUi(eyebrow, locale)}</span>
      <h2>{displayTitle}</h2>
      <p className="foodGuideIntro">{intro}</p>

      {/* 1. TOC Buttons */}
      <nav className="foodGuideToc" aria-label="Knowledge guide table of contents">
        {sections.map((sec) => {
          const fullTitle = `${sec.icon} ${sec.title}`.trim()
          const trFull = tUi(fullTitle, locale)
          const tocText = trFull !== fullTitle ? trFull.replace(sec.icon, '').trim() : tUi(sec.tocLabel, locale)
          return (
            <a key={sec.id} href={`#guide-${sec.id}`}>
              {sec.icon} {tocText}
            </a>
          )
        })}
      </nav>

      {/* 2. Single Language Article per Locale */}
      {sections.map((sec) => {
        const langData = isVi ? sec.vi : isKo ? sec.ko : sec.en
        const langClass = isVi ? 'lang-vi' : isKo ? 'lang-ko' : 'lang-en'
        const langCode = isVi ? 'vi' : isKo ? 'ko' : 'en'

        const fullTitle = `${sec.icon} ${sec.title}`.trim()
        const trFull = tUi(fullTitle, locale)
        const hasFullTr = trFull !== fullTitle

        return (
          <article key={sec.id} id={`guide-${sec.id}`} className="foodGuideSection">
            <h3>
              {hasFullTr ? (
                trFull
              ) : (
                <>
                  <span aria-hidden="true">{sec.icon} </span>
                  {tUi(sec.title, locale)}
                </>
              )}
            </h3>

            <div className={`foodGuideLang ${langClass}`} lang={langCode}>
              {langData.paragraphs.map((p, idx) => (
                <p key={idx}>{tUi(p, locale)}</p>
              ))}

              {langData.list && langData.list.length > 0 && (
                <ul className="guideList">
                  {langData.list.map((item, idx) => (
                    <li key={idx}>{tUi(item, locale)}</li>
                  ))}
                </ul>
              )}

              {langData.subheading && <h5>{tUi(langData.subheading, locale)}</h5>}

              {langData.subList && langData.subList.length > 0 && (
                <ul className="guideList">
                  {langData.subList.map((item, idx) => (
                    <li key={idx}>{tUi(item, locale)}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        )
      })}
    </section>
  )
}
