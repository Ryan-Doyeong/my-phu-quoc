// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface ItinerariesLandingPageProps {
  locale?: Locale
}

interface ItineraryThemeItem {
  id: string
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
}

/* 4 Theme Itinerary Categories (Planned 2026-10-26: 커플, 가족, 싱글, 친구) */
// vi is not an active locale; it falls back to en.
const ITINERARY_THEMES: ItineraryThemeItem[] = [
  {
    id: 'couples',
    icon: '🌅',
    title: { ko: '커플', en: 'Couples', zh: '情侣', ru: 'Пары', ja: 'カップル', hi: 'कपल्स' },
    desc: {
      ko: '로맨틱 석양과 키스브릿지, 분위기 좋은 오션뷰 다이닝 코스',
      en: 'Romantic sunset, Kiss Bridge, and atmospheric ocean-view dining course',
      zh: '浪漫日落、Kiss Bridge（亲吻桥）与氛围绝佳的海景餐厅路线',
      ru: 'Романтичный закат, Kiss Bridge и маршрут с ужином в уютной обстановке с видом на океан',
      ja: 'ロマンチックな夕日とキスブリッジ、雰囲気のよいオーシャンビューダイニングのコース',
      hi: 'रोमांटिक सूर्यास्त, Kiss Bridge और शानदार माहौल वाले ओशन-व्यू डाइनिंग का कोर्स',
    },
  },
  {
    id: 'families',
    icon: '👨‍👩‍👧‍👦',
    title: { ko: '가족', en: 'Families', zh: '家庭', ru: 'Семьи', ja: 'ファミリー', hi: 'परिवार' },
    desc: {
      ko: '아이·부모님과 함께하는 편안한 휴양 & 케이블카 워터파크 코스',
      en: 'Relaxing getaway with children and parents, plus a cable car and water park course',
      zh: '与孩子和父母同行的轻松度假，以及缆车与水上乐园路线',
      ru: 'Спокойный отдых с детьми и родителями и маршрут с канатной дорогой и аквапарком',
      ja: 'お子様やご両親と過ごすのんびりとした休暇と、ケーブルカー・ウォーターパークのコース',
      hi: 'बच्चों और माता-पिता के साथ आरामदायक छुट्टी, साथ ही केबल कार और वाटर पार्क का कोर्स',
    },
  },
  {
    id: 'solo',
    icon: '🎒',
    title: { ko: '싱글', en: 'Solo', zh: '独自旅行', ru: 'Соло', ja: 'ひとり旅', hi: 'सोलो' },
    desc: {
      ko: '여유로운 골목 카페 탐방과 나만의 사진 스폿 산책 코스',
      en: 'Leisurely alley cafe hopping and a walking course through your own favorite photo spots',
      zh: '悠闲探访小巷咖啡馆，并漫步专属于自己的拍照地点',
      ru: 'Неспешный обход кафе в переулках и прогулка по любимым местам для фото',
      ja: 'のんびり路地裏のカフェ巡りと、自分だけのフォトスポットを巡る散策コース',
      hi: 'आराम से गलियों के कैफ़े घूमना और अपने पसंदीदा फ़ोटो स्पॉट्स की सैर का कोर्स',
    },
  },
  {
    id: 'friends',
    icon: '🍹',
    title: { ko: '친구', en: 'Friends', zh: '朋友', ru: 'Друзья', ja: '友達', hi: 'दोस्त' },
    desc: {
      ko: '켐비치 펍 나이트라이프와 활기찬 해양 액티비티 코스',
      en: 'Khem Beach pub nightlife and lively ocean activity course',
      zh: '凯姆海滩酒吧夜生活与活力十足的海上活动路线',
      ru: 'Ночная жизнь в пабах на пляже Бай Кхем и маршрут с активными морскими развлечениями',
      ja: 'ケムビーチのパブナイトライフと、活気あふれるマリンアクティビティのコース',
      hi: 'खेम बीच पब नाइटलाइफ़ और जोशीली समुद्री गतिविधियों का कोर्स',
    },
  },
]

const T: Record<string, {
  sunsetTown: string; khemBeach: string; activities: string; breadcrumb: string; title: string
  subtitle: string; notice: string; themes: string; soon: string; policyTitle: string; policyText: string
}> = {
  ko: {
    sunsetTown: '선셋타운', khemBeach: '켐비치', activities: '액티비티', breadcrumb: '추천 테마 일정', title: '추천 테마 일정',
    subtitle: '푸꾸옥 남부 선셋타운과 켐비치를 가장 알차게 즐길 수 있는 여행 스타일별 맞춤 추천 코스 안내입니다.',
    notice: '콘텐츠 준비 중입니다. 현장 동선 및 테마별 세부 일정 안내가 순차적으로 업데이트됩니다.',
    themes: '테마별 여행 코스', soon: '준비 중', policyTitle: '일정 안내 원칙',
    policyText: '마이 푸꾸옥의 추천 일정은 임의의 가상 데이터나 추측성 정보를 배제하고, 실제 이동 소요 시간과 현장 동선 검증을 마친 최적의 코스만을 선별하여 제공할 예정입니다.',
  },
  en: {
    sunsetTown: 'Sunset Town', khemBeach: 'Khem Beach', activities: 'Activities', breadcrumb: 'Theme Itineraries', title: 'Recommended Theme Itineraries',
    subtitle: 'Curated travel courses tailored to your travel style, to help you get the most out of Sunset Town and Khem Beach in Southern Phu Quoc.',
    notice: 'Content is being prepared. On-site routes and detailed themed schedules will be updated soon.',
    themes: 'Travel Courses by Theme', soon: 'Coming Soon', policyTitle: 'Itinerary Editorial Policy',
    policyText: 'My Phu Quoc\'s recommended itineraries exclude fabricated data and speculative information. We plan to offer only carefully selected courses whose actual travel times and on-site routes have been verified.',
  },
  zh: {
    sunsetTown: '日落小镇', khemBeach: '凯姆海滩', activities: '活动体验', breadcrumb: '推荐主题行程', title: '推荐主题行程',
    subtitle: '按旅行风格为您量身推荐的路线，帮助您充分玩转富国岛南部的日落小镇和 凯姆海滩。',
    notice: '内容筹备中。现场动线及各主题的详细行程将陆续更新。',
    themes: '主题旅行路线', soon: '筹备中', policyTitle: '行程说明原则',
    policyText: 'My Phu Quoc 的推荐行程不会使用任意虚构的数据或推测性信息，我们计划仅精选已核实实际移动时间和现场动线的最佳路线提供给您。',
  },
  ru: {
    sunsetTown: 'Сансет Таун', khemBeach: 'Пляж Бай Кхем', activities: 'Активности', breadcrumb: 'Тематические маршруты', title: 'Рекомендуемые тематические маршруты',
    subtitle: 'Маршруты, подобранные по стилю путешествия, чтобы вы могли максимально насладиться Сансет Тауном и пляжем Бай Кхем на юге Фукуока.',
    notice: 'Контент в стадии подготовки. Маршруты на местности и подробные программы по темам будут обновляться постепенно.',
    themes: 'Маршруты по темам', soon: 'Скоро', policyTitle: 'Принципы составления маршрутов',
    policyText: 'В рекомендуемых маршрутах My Phu Quoc не используются выдуманные данные и предположения. Мы планируем предлагать только тщательно отобранные маршруты, для которых проверены реальное время в пути и пути передвижения на месте.',
  },
  ja: {
    sunsetTown: 'サンセットタウン', khemBeach: 'ケムビーチ', activities: 'アクティビティ', breadcrumb: 'おすすめテーマ別プラン', title: 'おすすめテーマ別プラン',
    subtitle: 'フーコック島南部のサンセットタウンとケムビーチを存分に楽しめる、旅のスタイル別おすすめコースのご案内です。',
    notice: 'コンテンツは準備中です。現地の動線やテーマ別の詳細な日程案内は順次更新されます。',
    themes: 'テーマ別旅行コース', soon: '準備中', policyTitle: '日程案内の方針',
    policyText: 'マイ・フーコックのおすすめ日程は、根拠のない架空のデータや憶測に基づく情報を排除し、実際の移動所要時間と現地での動線を確認したうえで、最適なコースのみを厳選してご提供する予定です。',
  },
  hi: {
    sunsetTown: 'सनसेट टाउन', khemBeach: 'खेम बीच', activities: 'गतिविधियाँ', breadcrumb: 'सुझाए गए थीम यात्रा-कार्यक्रम', title: 'सुझाए गए थीम यात्रा-कार्यक्रम',
    subtitle: 'यात्रा शैली के अनुसार तैयार किए गए सुझाए गए कोर्स, ताकि आप फु क्वोक के दक्षिण में सनसेट टाउन और खेम बीच का भरपूर आनंद ले सकें।',
    notice: 'सामग्री तैयार की जा रही है। स्थल पर आवागमन मार्ग और थीम-वार विस्तृत कार्यक्रम क्रमशः अपडेट किए जाएंगे।',
    themes: 'थीम के अनुसार यात्रा कोर्स', soon: 'जल्द आ रहा है', policyTitle: 'कार्यक्रम संबंधी संपादकीय सिद्धांत',
    policyText: 'My Phu Quoc के सुझाए गए कार्यक्रमों में मनगढ़ंत आँकड़ों या अनुमान-आधारित जानकारी को शामिल नहीं किया जाता। हम केवल वही चुने हुए बेहतरीन कोर्स प्रस्तुत करने की योजना बना रहे हैं जिनके वास्तविक यात्रा-समय और स्थल पर आवागमन मार्ग की जाँच हो चुकी है।',
  },
}

export function ItinerariesLandingPage({ locale = 'ko' }: ItinerariesLandingPageProps) {
  const dict = getDictionary(locale)
  const t = T[locale] ?? T.en

  return (
    <div className="itinerariesPageRoot">
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
            <Link href={localePath(locale, '/activities')}>
              {t.activities}
            </Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container (White MyRealTrip style, 12px frame, 8px tiles) */}
      <main className="itinerariesContainer">
        {/* Breadcrumb */}
        <div className="itinerariesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{t.breadcrumb}</span>
        </div>

        {/* Hero Title Box (12px rounded, white background) */}
        <div className="itinerariesHeaderBox">
          <div className="itinerariesEyebrow">CURATED ITINERARIES</div>
          <h1 className="itinerariesTitle">
            {t.title}
          </h1>
          <p className="itinerariesSubtitle">
            {t.subtitle}
          </p>
          <div className="itinerariesNoticeTag">
            <span className="noticeDot" />
            <span>
              {t.notice}
            </span>
          </div>
        </div>

        {/* 4 Planned Theme Tiles (8px rounded, link-free empty state) */}
        <section className="itinerariesTilesSection">
          <h2 className="itinerariesSectionTitle">
            {t.themes}
          </h2>
          <div className="itinerariesTilesGrid">
            {ITINERARY_THEMES.map((theme) => {
              const themeTitle = theme.title[locale] || theme.title.en
              const themeDesc = theme.desc[locale] || theme.desc.en
              return (
                <div key={theme.id} className="itineraryCategoryTile">
                  <div className="tileTopRow">
                    <span className="tileIcon" aria-hidden="true">
                      {theme.icon}
                    </span>
                    <span className="tileStatusPill">
                      {t.soon}
                    </span>
                  </div>
                  <h3 className="tileTitle">{themeTitle}</h3>
                  <p className="tileDesc">{themeDesc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Editorial Notice Callout (12px rounded) */}
        <div className="itinerariesCalloutBox">
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
