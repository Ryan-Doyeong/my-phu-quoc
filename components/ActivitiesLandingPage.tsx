// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { ActivityYachtSection } from '@/components/ActivityYachtSection'

interface ActivitiesLandingPageProps {
  locale?: Locale
}

interface ActivityCategoryItem {
  id: string
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
}

/* Category definitions for Southern Phu Quoc Activities */
// vi is not an active locale; it falls back to en.
const ACTIVITY_CATEGORIES: ActivityCategoryItem[] = [
  {
    id: 'hon-thom',
    icon: '🚡',
    title: {
      ko: '혼똔섬 아일랜드',
      en: 'Hon Thom Island',
      zh: 'Hon Thom 岛',
      ru: 'Остров Хон Том',
      ja: 'ホントム島',
      hi: 'हॉन थॉम द्वीप',
    },
    desc: {
      ko: '해상 케이블카 · 아쿠아토피아 워터파크 · 테마파크',
      en: 'Sea Cable Car · Aquatopia Water Park · Theme Park',
      zh: '海上缆车 · Aquatopia 水上乐园 · 主题公园',
      ru: 'Морская канатная дорога · Аквапарк Aquatopia · Тематический парк',
      ja: '海上ケーブルカー · アクアトピア ウォーターパーク · テーマパーク',
      hi: 'समुद्री केबल कार · Aquatopia वाटर पार्क · थीम पार्क',
    },
  },
  {
    id: 'hopping-tour',
    icon: '⛵',
    title: {
      ko: '호핑 투어',
      en: 'Hopping Tour',
      zh: '跳岛游',
      ru: 'Тур по островам',
      ja: 'アイランドホッピングツアー',
      hi: 'आइलैंड हॉपिंग टूर',
    },
    desc: {
      ko: '남부 3섬·4섬 스노클링 · 선셋 크루즈',
      en: 'Southern 3-Island & 4-Island Snorkeling · Sunset Cruise',
      zh: '南部3岛·4岛浮潜 · 日落游船',
      ru: 'Снорклинг на 3 и 4 островах юга · Закатный круиз',
      ja: '南部3島・4島スノーケリング · サンセットクルーズ',
      hi: 'दक्षिण के 3-द्वीप और 4-द्वीप स्नॉर्कलिंग · सनसेट क्रूज़',
    },
  },
  {
    id: 'private-yacht',
    icon: '🛥️',
    title: {
      ko: '프라이빗 요트 투어',
      en: 'Private Yacht Tour',
      zh: '私人游艇之旅',
      ru: 'Частный яхт-тур',
      ja: 'プライベートヨットツアー',
      hi: 'प्राइवेट याट टूर',
    },
    desc: {
      ko: '단독 대절 요트 · 일몰 세일링 · 프라이빗 파티',
      en: 'Exclusive Charter Yacht · Sunset Sailing · Private Party',
      zh: '包船游艇 · 日落航行 · 私人派对',
      ru: 'Яхта в единоличную аренду · Парусная прогулка на закате · Частная вечеринка',
      ja: '貸切ヨット · サンセットセーリング · プライベートパーティー',
      hi: 'निजी चार्टर याट · सनसेट सेलिंग · प्राइवेट पार्टी',
    },
  },
  {
    id: 'fishing',
    icon: '🎣',
    title: {
      ko: '낚시',
      en: 'Fishing',
      zh: '钓鱼',
      ru: 'Рыбалка',
      ja: '釣り',
      hi: 'मछली पकड़ना',
    },
    desc: {
      ko: '야간 오징어 낚시 · 바다 낚시 체험',
      en: 'Night Squid Fishing · Sea Fishing Experience',
      zh: '夜间钓鱿鱼 · 海钓体验',
      ru: 'Ночная ловля кальмаров · Морская рыбалка',
      ja: '夜のイカ釣り · 海釣り体験',
      hi: 'रात में स्क्विड फिशिंग · समुद्री मछली पकड़ने का अनुभव',
    },
  },
  {
    id: 'others',
    icon: '🏄',
    title: {
      ko: '기타',
      en: 'Other Activities',
      zh: '其他',
      ru: 'Другое',
      ja: 'その他',
      hi: 'अन्य',
    },
    desc: {
      ko: '패러세일링 · 제트스키 · 카약 · 해양 스포츠',
      en: 'Parasailing · Jet Ski · Kayak · Water Sports',
      zh: '滑翔伞 · 水上摩托 · 皮划艇 · 水上运动',
      ru: 'Парасейлинг · Гидроцикл · Каяк · Водные виды спорта',
      ja: 'パラセーリング · ジェットスキー · カヤック · マリンスポーツ',
      hi: 'पैरासेलिंग · जेट स्की · कयाक · जल क्रीड़ाएँ',
    },
  },
]

const T: Record<string, {
  sunsetTown: string; khemBeach: string; activities: string; categories: string; soon: string
  subtitle: string; notice: string; policyTitle: string; policyText: string
}> = {
  ko: {
    sunsetTown: '선셋타운', khemBeach: '켐비치', activities: '액티비티', categories: '주요 카테고리', soon: '준비 중',
    subtitle: '푸꾸옥 남부 선셋타운과 켐비치에서 즐길 수 있는 대표 해양 액티비티 및 투어 프로그램 안내입니다.',
    notice: '콘텐츠 준비 중입니다. 공식 일정 및 세부 프로그램 정보가 순차적으로 업데이트됩니다.',
    policyTitle: '투어 및 액티비티 안내 기준',
    policyText: '마이 푸꾸옥은 공식 확인된 검증 정보만을 제공합니다. 임의의 가격이나 일정을 게시하지 않으며, 제휴 및 정식 운영 프로그램이 확정되는 대로 정식 오픈될 예정입니다.',
  },
  en: {
    sunsetTown: 'Sunset Town', khemBeach: 'Khem Beach', activities: 'Activities', categories: 'Categories', soon: 'Coming Soon',
    subtitle: 'Discover top ocean activities and tour experiences across Southern Phu Quoc.',
    notice: 'Content is being prepared. Verified program schedules and details will be updated soon.',
    policyTitle: 'Activity Information Policy',
    policyText: 'My Phu Quoc publishes verified official information only. We do not post arbitrary prices or schedules; programs will officially open as soon as partnerships and official operations are confirmed.',
  },
  zh: {
    sunsetTown: '日落小镇', khemBeach: '凯姆海滩', activities: '活动体验', categories: '主要类别', soon: '筹备中',
    subtitle: '为您介绍富国岛南部日落小镇和 凯姆海滩一带的代表性海上活动与旅游项目。',
    notice: '内容筹备中。官方日程及详细项目信息将陆续更新。',
    policyTitle: '旅游与活动信息说明',
    policyText: 'My Phu Quoc 只提供经官方确认的核实信息。我们不会随意发布价格或日程，待合作及正式运营项目确定后将正式上线。',
  },
  ru: {
    sunsetTown: 'Сансет Таун', khemBeach: 'Пляж Бай Кхем', activities: 'Активности', categories: 'Основные категории', soon: 'Скоро',
    subtitle: 'Обзор основных морских активностей и туров, доступных в Сансет Тауне и на пляже Бай Кхем на юге Фукуока.',
    notice: 'Контент в стадии подготовки. Официальное расписание и подробная информация о программах будут обновляться постепенно.',
    policyTitle: 'Правила публикации информации о турах и активностях',
    policyText: 'My Phu Quoc публикует только официально подтверждённую информацию. Мы не размещаем произвольные цены и расписания; программы откроются официально сразу после подтверждения партнёрства и официальной работы.',
  },
  ja: {
    sunsetTown: 'サンセットタウン', khemBeach: 'ケムビーチ', activities: 'アクティビティ', categories: '主なカテゴリー', soon: '準備中',
    subtitle: 'フーコック島南部のサンセットタウンとケムビーチで楽しめる、代表的なマリンアクティビティとツアープログラムのご案内です。',
    notice: 'コンテンツは準備中です。公式の日程や詳細なプログラム情報は順次更新されます。',
    policyTitle: 'ツアー・アクティビティ情報の掲載基準',
    policyText: 'マイ・フーコックは、公式に確認された検証済みの情報のみを提供します。根拠のない料金や日程は掲載せず、提携および正式な運営プログラムが確定次第、正式にオープンする予定です。',
  },
  hi: {
    sunsetTown: 'सनसेट टाउन', khemBeach: 'खेम बीच', activities: 'गतिविधियाँ', categories: 'मुख्य श्रेणियाँ', soon: 'जल्द आ रहा है',
    subtitle: 'फु क्वोक के दक्षिण में सनसेट टाउन और खेम बीच पर आनंद लेने योग्य प्रमुख समुद्री गतिविधियों और टूर कार्यक्रमों की जानकारी।',
    notice: 'सामग्री तैयार की जा रही है। आधिकारिक कार्यक्रम और विस्तृत जानकारी क्रमशः अपडेट की जाएगी।',
    policyTitle: 'टूर और गतिविधि जानकारी नीति',
    policyText: 'My Phu Quoc केवल आधिकारिक रूप से सत्यापित जानकारी ही प्रदान करता है। हम मनमाने मूल्य या कार्यक्रम प्रकाशित नहीं करते; साझेदारी और आधिकारिक संचालन तय होते ही कार्यक्रम औपचारिक रूप से शुरू किए जाएंगे।',
  },
}

export function ActivitiesLandingPage({ locale = 'ko' }: ActivitiesLandingPageProps) {
  const dict = getDictionary(locale)
  const t = T[locale] ?? T.en

  return (
    <div className="activitiesPageRoot">
      {/* 0. Top Header (White background matching detailNav style) */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {t.sunsetTown}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {t.khemBeach}
            </Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container (White MyRealTrip style, 12px frame, 8px tiles) */}
      <main className="activitiesContainer">
        {/* Breadcrumb */}
        <div className="activitiesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{t.activities}</span>
        </div>

        {/* Hero Title Box (12px rounded, white background) */}
        <div className="activitiesHeaderBox">
          <div className="activitiesEyebrow">EXPERIENCES & TOURS</div>
          <h1 className="activitiesTitle">
            {t.activities}
          </h1>
          <p className="activitiesSubtitle">
            {t.subtitle}
          </p>
          <div className="activitiesNoticeTag">
            <span className="noticeDot" />
            <span>
              {t.notice}
            </span>
          </div>
        </div>

        <ActivityYachtSection locale={locale} />

        {/* 5 Planned Category Tiles (8px rounded) */}
        <section className="activitiesTilesSection">
          <h2 className="activitiesSectionTitle">
            {t.categories}
          </h2>
          <div className="activitiesTilesGrid">
            {ACTIVITY_CATEGORIES.map((cat) => {
              const catTitle = cat.title[locale] || cat.title.en
              const catDesc = cat.desc[locale] || cat.desc.en
              return (
                <div key={cat.id} className="activityCategoryTile">
                  <div className="tileTopRow">
                    <span className="tileIcon" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span className="tileStatusPill">
                      {t.soon}
                    </span>
                  </div>
                  <h3 className="tileTitle">{catTitle}</h3>
                  <p className="tileDesc">{catDesc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Information & Partnership Callout (12px rounded) */}
        <div className="activitiesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">
              {t.policyTitle}
            </div>
            <div className="calloutText">
              {t.policyText}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
