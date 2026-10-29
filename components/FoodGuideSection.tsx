import React from 'react'
import type { FoodGuideSectionData } from '@/lib/foodKnowledge'
import type { Locale } from '@/lib/i18n/config'
import { tUi } from '@/lib/i18n/uiStrings'

interface FoodGuideSectionProps {
  eyebrow: string
  introText?: string
  sections: FoodGuideSectionData[]
  locale?: Locale
}

const FOOD_GUIDE_TITLE: Record<string, string> = {
  ko: '음식 알고 먹기 · 미식 지식 백과',
  vi: 'Tìm hiểu món ăn & Văn hóa ẩm thực',
  en: 'Get to Know the Food',
  zh: '了解美食 · 美食知识百科',
  ru: 'Знакомство с едой · Гастрономическая энциклопедия',
  ja: '食を知る・グルメ知識百科',
  hi: 'भोजन को जानें · पाक ज्ञान विश्वकोश',
}

const FOOD_GUIDE_INTRO: Record<string, string> = {
  ko: '푸꾸옥 여행자를 위해 음식의 유래, 특징 및 식사 안내를 제공합니다.',
  vi: 'Khám phá nguồn gốc, hương vị đặc trưng và bí quyết thưởng thức trọn vẹn món ăn.',
  en: 'Discover the origins, signature flavors, and tips to savor this dish like a local.',
  zh: '为富国岛游客提供有关美食起源、特点及用餐的指南。',
  ru: 'Для туристов на Фукуоке представлена информация о происхождении и особенностях блюд, а также рекомендации по питанию.',
  ja: 'フーコック島を訪れる旅行者向けに、料理の由来や特徴、食事に関する情報をご案内します。',
  hi: 'फु क्वोक के यात्रियों के लिए व्यंजनों की उत्पत्ति, विशेषताओं और भोजन संबंधी जानकारी प्रदान की जाती है।',
}

export function FoodGuideSection({
  eyebrow,
  sections,
  locale = 'ko',
}: FoodGuideSectionProps) {
  if (!sections || sections.length === 0) return null

  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const title = FOOD_GUIDE_TITLE[locale] || FOOD_GUIDE_TITLE.en
  const intro = FOOD_GUIDE_INTRO[locale] || FOOD_GUIDE_INTRO.en

  return (
    <section className="detailCard foodGuideCard" id="food-guide">
      <span className="eyebrow">{tUi(eyebrow, locale)}</span>
      <h2>{title}</h2>
      <p className="foodGuideIntro">{intro}</p>

      {/* 1. TOC Buttons */}
      <nav className="foodGuideToc" aria-label="Food guide table of contents">
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
