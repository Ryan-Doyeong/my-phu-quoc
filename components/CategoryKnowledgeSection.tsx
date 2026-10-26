import React from 'react'
import type { FoodGuideSectionData } from '@/lib/foodKnowledge'
import type { Locale } from '@/lib/i18n/config'

interface CategoryKnowledgeSectionProps {
  eyebrow: string
  title?: string
  introText?: string
  sections: FoodGuideSectionData[]
  locale?: Locale
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
    title ||
    (isKo
      ? '선셋타운 필수 상식 & 이용 꿀팁 가이드'
      : isVi
      ? 'Cẩm nang kinh nghiệm & Hướng dẫn trải nghiệm'
      : 'Essential Tips & Category Guide')

  const intro = isKo
    ? '방문 전 알아두면 유용한 기본 상식과 실전 팁을 안내합니다.'
    : isVi
    ? 'Những thông tin hữu ích và mẹo thực tế bạn nên biết trước khi trải nghiệm.'
    : 'Helpful background knowledge and practical tips to know before your visit.'

  return (
    <section className="detailCard foodGuideCard" id="knowledge-guide">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{displayTitle}</h2>
      <p className="foodGuideIntro">{intro}</p>

      {/* 1. TOC Buttons */}
      <nav className="foodGuideToc" aria-label="Knowledge guide table of contents">
        {sections.map((sec) => (
          <a key={sec.id} href={`#guide-${sec.id}`}>
            {sec.icon} {sec.tocLabel}
          </a>
        ))}
      </nav>

      {/* 2. Single Language Article per Locale */}
      {sections.map((sec) => {
        const langData = isVi ? sec.vi : isKo ? sec.ko : sec.en
        const langClass = isVi ? 'lang-vi' : isKo ? 'lang-ko' : 'lang-en'
        const langCode = isVi ? 'vi' : isKo ? 'ko' : 'en'

        return (
          <article key={sec.id} id={`guide-${sec.id}`} className="foodGuideSection">
            <h3>
              <span aria-hidden="true">{sec.icon} </span>
              {sec.title}
            </h3>

            <div className={`foodGuideLang ${langClass}`} lang={langCode}>
              {langData.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {langData.list && langData.list.length > 0 && (
                <ul className="guideList">
                  {langData.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {langData.subheading && <h5>{langData.subheading}</h5>}

              {langData.subList && langData.subList.length > 0 && (
                <ul className="guideList">
                  {langData.subList.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
