import type { Locale } from '@/lib/i18n/config'
import { getBuggyCourseCopy } from '@/lib/buggyCourseCopy'

const BUGGY_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/activities/buggy/buggy-${n}.webp`)

export function BuggyCourse({ locale }: { locale: Locale }) {
  const copy = getBuggyCourseCopy(locale)
  return (
    <section className="buggyCourseSection" id="buggy-course">
      <div className="tourSectionHeader">
        <div className="tourSectionEyebrow">{copy.eyebrow}</div>
        <h2 className="tourSectionTitle">{copy.title}</h2>
        <p className="buggyCourseNote">{copy.note}</p>
      </div>
      <div className="buggyPhotoGrid">
        {BUGGY_PHOTOS.map((src) => (
          <img key={src} src={src} alt={copy.title} width={960} height={720} loading="lazy" decoding="async" />
        ))}
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
