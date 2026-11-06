import type { Locale } from '@/lib/i18n/config'
import { getSouthCourseCopy } from '@/lib/southCourseCopy'

/** 차량 투어 페이지 — 남부 문화·특산품 8시간 추천 코스 (버기 코스와 같은 목록 스타일 재사용) */
export function SouthCourse({ locale }: { locale: Locale }) {
  const copy = getSouthCourseCopy(locale)
  return (
    <section className="buggyCourseSection" id="south-course">
      <div className="tourSectionHeader">
        <div className="tourSectionEyebrow">{copy.eyebrow}</div>
        <h2 className="tourSectionTitle">{copy.title}</h2>
        <p className="buggyCourseNote">{copy.note}</p>
      </div>
      <ol className="buggyCourseList">
        {copy.stops.map((stop, i) => (
          <li className="buggyCourseStop" key={stop.title}>
            <span className="buggyCourseNum" aria-hidden="true">{i + 1}</span>
            <div>
              <h3 className="buggyCourseStopTitle">{stop.title}</h3>
              <p className="buggyCourseStopDesc">{stop.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
