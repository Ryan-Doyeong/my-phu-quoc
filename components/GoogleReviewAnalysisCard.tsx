// Translations: 7개 국어 (ko, en, zh, ja, ru, hi, vi) ChatGPT 원어민 전수 검수 완료 (2026-11-02)
import React from 'react'
import type { BusinessReviewAnalysis } from '@/lib/googleReviewAnalyzer'
import type { Locale } from '@/lib/i18n/config'

interface GoogleReviewAnalysisCardProps {
  analysis: BusinessReviewAnalysis
  businessName: string
  googleMapsUrl?: string | null
  locale?: Locale
}

interface ReviewCardLabels {
  eyebrow: string
  title: string
  reviewCountTpl: string
  prosTitle: string
  consTitle: string
  sampleTitle: string
  dateLabel: string
  sourceLabel: string
  liveLinkText: string
}

const LABELS: Record<string, ReviewCardLabels> = {
  ko: {
    eyebrow: '구글맵 리뷰 분석',
    title: '방문자 리뷰 분석: 장점과 참고할 점',
    reviewCountTpl: '리뷰 {n}개 분석',
    prosTitle: '방문객들이 꼽은 장점 (+)',
    consTitle: '방문 전 알아둘 점 (-)',
    sampleTitle: '구글맵 방문자 리뷰 발췌',
    dateLabel: '분석 기준일',
    sourceLabel: '출처: 구글맵 공개 리뷰 종합',
    liveLinkText: '구글맵에서 전체 리뷰 보기 →',
  },
  en: {
    eyebrow: 'Google Maps Review Analysis',
    title: 'Visitor Review Insights: Pros & Cons',
    reviewCountTpl: 'Based on {n} reviews',
    prosTitle: 'What Visitors Like (+)',
    consTitle: 'Things to Consider (-)',
    sampleTitle: 'Excerpts from Google Maps Reviews',
    dateLabel: 'Analysis Date',
    sourceLabel: 'Source: Public Google Maps Reviews',
    liveLinkText: 'See All Reviews on Google Maps →',
  },
  zh: {
    eyebrow: 'Google 地图评价分析',
    title: '游客评价分析：优点与注意事项',
    reviewCountTpl: '基于 {n} 条评价的分析',
    prosTitle: '游客认可的优点 (+)',
    consTitle: '到访前需要注意的事项 (-)',
    sampleTitle: 'Google 地图游客评价摘录',
    dateLabel: '分析日期',
    sourceLabel: '来源：Google 地图公开评价',
    liveLinkText: '在 Google 地图查看全部评价 →',
  },
  ja: {
    eyebrow: 'Google マップの口コミ分析',
    title: '訪問者の口コミ分析：良い点と気になる点',
    reviewCountTpl: '{n}件の口コミをもとに分析',
    prosTitle: '訪問者が評価したポイント (+)',
    consTitle: '訪問前に知っておきたい点 (-)',
    sampleTitle: 'Google マップの口コミ抜粋',
    dateLabel: '分析基準日',
    sourceLabel: '出典：Google マップの公開口コミ',
    liveLinkText: 'Google マップですべての口コミを見る →',
  },
  ru: {
    eyebrow: 'Анализ отзывов Google Карт',
    title: 'Анализ отзывов посетителей: плюсы и минусы',
    reviewCountTpl: 'На основе {n} отзывов',
    prosTitle: 'Что нравится посетителям (+)',
    consTitle: 'На что стоит обратить внимание (-)',
    sampleTitle: 'Выдержки из отзывов на Google Картах',
    dateLabel: 'Дата анализа',
    sourceLabel: 'Источник: публичные отзывы на Google Картах',
    liveLinkText: 'Все отзывы на Google Картах →',
  },
  hi: {
    eyebrow: 'Google Maps समीक्षाओं का विश्लेषण',
    title: 'आगंतुक समीक्षाओं का विश्लेषण: खूबियाँ और कमियाँ',
    reviewCountTpl: '{n} समीक्षाओं के आधार पर',
    prosTitle: 'आगंतुकों को क्या पसंद आया (+)',
    consTitle: 'जाने से पहले ध्यान देने योग्य बातें (-)',
    sampleTitle: 'Google Maps समीक्षाओं के अंश',
    dateLabel: 'विश्लेषण की तारीख',
    sourceLabel: 'स्रोत: Google Maps पर सार्वजनिक समीक्षाएँ',
    liveLinkText: 'Google Maps पर सभी समीक्षाएँ देखें →',
  },
  vi: {
    eyebrow: 'Phân tích đánh giá trên Google Maps',
    title: 'Phân tích đánh giá của khách: Ưu và nhược điểm',
    reviewCountTpl: 'Dựa trên {n} đánh giá',
    prosTitle: 'Những điểm khách đánh giá cao (+)',
    consTitle: 'Những điều cần lưu ý trước khi đến (-)',
    sampleTitle: 'Trích dẫn đánh giá từ Google Maps',
    dateLabel: 'Ngày phân tích',
    sourceLabel: 'Nguồn: Đánh giá công khai trên Google Maps',
    liveLinkText: 'Xem tất cả đánh giá trên Google Maps →',
  },
}

export function GoogleReviewAnalysisCard({
  analysis,
  businessName,
  googleMapsUrl,
  locale = 'ko',
}: GoogleReviewAnalysisCardProps) {
  const L = LABELS[locale] || LABELS.en
  const reviewCountLabel = analysis.reviewCount
    ? L.reviewCountTpl.replace('{n}', analysis.reviewCount.toLocaleString())
    : null

  return (
    <section className="detailCard reviewAnalysisCard" id="review-analysis">
      <span className="eyebrow">{L.eyebrow}</span>
      <h2>{L.title}</h2>

      {/* Rating & Review Count Header Bar */}
      <div className="reviewScoreBar">
        {analysis.rating && (
          <span className="reviewRatingPill">★ {analysis.rating.toFixed(1)}</span>
        )}
        {reviewCountLabel && <span className="reviewCountPill">{reviewCountLabel}</span>}
        <span
          style={{
            fontSize: '12px',
            color: '#0B7A8A',
            fontWeight: 700,
            background: '#e3f3f5',
            padding: '4px 10px',
            borderRadius: '999px',
          }}
        >
          {analysis.ratingBadge}
        </span>
      </div>

      <p className="reviewAnalysisDesc">{analysis.sentimentSummary}</p>

      {/* Review Topics Tags */}
      {analysis.topics.length > 0 && (
        <div className="reviewTopicsList">
          {analysis.topics.map((t, idx) => (
            <span key={idx} className="reviewTopicTag">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Pros & Cons Columns Grid */}
      <div className="reviewColsGrid">
        {/* Pros (+) */}
        <div className="reviewProsBox">
          <h3>
            <span aria-hidden="true">👍</span>
            <span>{L.prosTitle}</span>
          </h3>
          <ul className="reviewPointsList">
            {analysis.praised.map((point, idx) => (
              <li key={idx}>
                <b aria-hidden="true">+</b>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons & Good to Know (-) */}
        <div className="reviewConsBox">
          <h3>
            <span aria-hidden="true">💡</span>
            <span>{L.consTitle}</span>
          </h3>
          <ul className="reviewPointsList">
            {analysis.goodToKnow.map((point, idx) => (
              <li key={idx}>
                <b aria-hidden="true">-</b>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Real Visitor Review Snippets from Google Maps */}
      {analysis.sampleReviews && analysis.sampleReviews.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 16px',
            borderRadius: '10px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
          }}
        >
          <h4
            style={{
              margin: '0 0 8px 0',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden="true">💬</span>
            <span>{L.sampleTitle}</span>
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '13px',
              lineHeight: 1.55,
              color: '#334155',
            }}
          >
            {analysis.sampleReviews.slice(0, 3).map((quote, qIdx) => (
              <li key={qIdx}>“{quote}”</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer link to live google maps */}
      <div className="reviewFooterAction">
        <small>
          {L.dateLabel}: {analysis.lastVerified} · {L.sourceLabel}
        </small>
        {googleMapsUrl && (
          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
            {L.liveLinkText}
          </a>
        )}
      </div>
    </section>
  )
}
