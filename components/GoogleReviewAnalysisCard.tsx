import React from 'react'
import type { BusinessReviewAnalysis } from '@/lib/googleReviewAnalyzer'
import type { Locale } from '@/lib/i18n/config'

interface GoogleReviewAnalysisCardProps {
  analysis: BusinessReviewAnalysis
  businessName: string
  googleMapsUrl?: string | null
  locale?: Locale
}

export function GoogleReviewAnalysisCard({
  analysis,
  businessName,
  googleMapsUrl,
  locale = 'ko',
}: GoogleReviewAnalysisCardProps) {
  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const title = isKo
    ? '방문자 리뷰 분석 & 장단점 평가'
    : isVi
    ? 'Đánh giá & Phân tích ưu nhược điểm'
    : 'Visitor Review Insights: Pros & Cons'

  const eyebrow = isKo
    ? '구글맵 빅데이터 분석'
    : isVi
    ? 'Phân tích dữ liệu Google Maps'
    : 'Verified Google Maps Review Analysis'

  const reviewCountLabel = analysis.reviewCount
    ? isKo
      ? `실측 리뷰 ${analysis.reviewCount.toLocaleString()}개 기반`
      : isVi
      ? `Dựa trên ${analysis.reviewCount.toLocaleString()} đánh giá thực tế`
      : `Based on ${analysis.reviewCount.toLocaleString()} reviews`
    : null

  const prosTitle = isKo
    ? '방문객들이 칭찬하는 장점 (Pros)'
    : isVi
    ? 'Điểm cộng nổi bật (Ưu điểm)'
    : 'What People Like (+)'

  const consTitle = isKo
    ? '방문 전 알아둘 점 & 주의사항 (Cons)'
    : isVi
    ? 'Lưu ý trước khi đến (Nhược điểm & Mẹo)'
    : 'Good to Know & Cons (-)'

  const dateLabel = isKo
    ? '분석 기준일'
    : isVi
    ? 'Cập nhật'
    : 'Analysis updated'

  const sourceLabel = isKo
    ? '출처: 구글맵 공개 방문자 평가 종합'
    : isVi
    ? 'Nguồn: Tổng hợp đánh giá công khai trên Google Maps'
    : 'Source: Public Google Maps Reviews'

  const liveLinkText = isKo
    ? '구글맵에서 실시간 리뷰 전체보기 →'
    : isVi
    ? 'Xem toàn bộ đánh giá trên Google Maps →'
    : 'See all reviews on Google Maps →'

  return (
    <section className="detailCard reviewAnalysisCard" id="review-analysis">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>

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
            <span>{prosTitle}</span>
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
            <span>{consTitle}</span>
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

      {/* Footer link to live google maps */}
      <div className="reviewFooterAction">
        <small>
          {dateLabel}: {analysis.lastVerified} · {sourceLabel}
        </small>
        {googleMapsUrl && (
          <a href={googleMapsUrl} target="_blank" rel="noreferrer">
            {liveLinkText}
          </a>
        )}
      </div>
    </section>
  )
}
