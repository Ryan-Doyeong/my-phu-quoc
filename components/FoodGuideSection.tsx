import React from 'react'
import type { FoodGuideSectionData } from '@/lib/foodKnowledge'
import type { Locale } from '@/lib/i18n/config'

interface FoodGuideSectionProps {
  eyebrow: string
  introText?: string
  sections: FoodGuideSectionData[]
  locale?: Locale
}

export function FoodGuideSection({
  eyebrow,
  sections,
  locale = 'ko',
}: FoodGuideSectionProps) {
  if (!sections || sections.length === 0) return null

  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const title = isKo
    ? '음식 알고 먹기 · 미식 지식 백과'
    : isVi
    ? 'Tìm hiểu món ăn & Văn hóa ẩm thực'
    : 'Get to Know the Food'

  const intro = isKo
    ? '푸꾸옥 여행자를 위해 음식의 유래, 특징 및 식사 안내를 제공합니다.'
    : isVi
    ? 'Khám phá nguồn gốc, hương vị đặc trưng và bí quyết thưởng thức trọn vẹn món ăn.'
    : 'Discover the origins, signature flavors, and tips to savor this dish like a local.'

  return (
    <section className="detailCard foodGuideCard" id="food-guide">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p className="foodGuideIntro">{intro}</p>

      {/* 1. TOC Buttons */}
      <nav className="foodGuideToc" aria-label="Food guide table of contents">
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
