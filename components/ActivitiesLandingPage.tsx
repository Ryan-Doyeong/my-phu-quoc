import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { BookingCommonIntroCallout, CommonHelpSection } from '@/components/BookingServiceSections'
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { BOOKING_SERVICE_COPY, buildServiceWhatsappUrl } from '@/lib/i18n/bookingServiceCopy'
import { MAIN_ZONES, SUNSET_BEACH_NOTICE_TEXT } from '@/lib/zones'
import { ActivityYachtSection } from '@/components/ActivityYachtSection'

interface ActivitiesLandingPageProps {
  locale?: Locale
}

interface ActivityCategoryItem {
  id: string
  icon: string
  title: Record<Locale, string>
  desc: Record<Locale, string>
}

const ACTIVITY_CATEGORIES: ActivityCategoryItem[] = [
  {
    id: 'hon-thom',
    icon: '🚡',
    title: {
      ko: '혼똔섬 아일랜드',
      en: 'Hon Thom Island',
      zh: '香岛 (Hon Thom Island)',
      ru: 'Остров Хон Том',
      ja: 'ホントム島',
      hi: 'हॉन थॉम द्वीप',
      vi: 'Đảo Hòn Thơm',
    },
    desc: {
      ko: '해상 케이블카 · 아쿠아토피아 워터파크 · 테마파크',
      en: 'Sea Cable Car · Aquatopia Water Park · Theme Park',
      zh: '跨海缆车 · Aquatopia 水上乐园 · 主题公园',
      ru: 'Морская канатная дорога · Аквапарк Aquatopia · Тематический парк',
      ja: '海上ケーブルカー · アクアトピア ウォーターパーク · テーマパーク',
      hi: 'समुद्री केबल कार · Aquatopia वाटर पार्क · थीम पार्क',
      vi: 'Cáp treo vượt biển · Công viên nước Aquatopia · Công viên chủ đề',
    },
  },
  {
    id: 'hopping-tour',
    icon: '⛵',
    title: {
      ko: '호핑 투어',
      en: 'Island Hopping Tour',
      zh: '南部跳岛游',
      ru: 'Тур по островам',
      ja: 'アイランドホッピングツアー',
      hi: 'आइलैंड हॉपिंग टूर',
      vi: 'Tour cano khám phá đảo',
    },
    desc: {
      ko: '남부 3섬·4섬 스노클링 · 선셋 크루즈',
      en: 'Southern 3-Island & 4-Island Snorkeling · Sunset Cruise',
      zh: '南部3岛·4岛浮潜 · 日落游船',
      ru: 'Снорклинг на 3 и 4 островах юга · Закатный круиз',
      ja: '南部3島・4島スノーケリング · サンセットクルーズ',
      hi: 'दक्षिण के 3-द्वीप और 4-द्वीप स्नॉर्कलिंग · सनसेट क्रूज़',
      vi: 'Lặn ngắm san hô 3 đảo · 4 đảo Nam Phú Quốc · Du thuyền hoàng hôn',
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
      vi: 'Tour du thuyền riêng',
    },
    desc: {
      ko: '단독 대절 요트 · 일몰 세일링 · 맞춤 일정 상담',
      en: 'Exclusive Charter Yacht · Sunset Sailing · Custom Schedule',
      zh: '包船游艇 · 日落航行 · 定制日程咨询',
      ru: 'Индивидуальная аренда яхты · Закатный круиз · Индивидуальный маршрут',
      ja: '貸切ヨット · サンセットセーリング · オーダーメイド日程相談',
      hi: 'निजी चार्टर याट · सनसेट सेलिंग · कस्टम शेड्यूल',
      vi: 'Thuê trọn du thuyền · Ngắm hoàng hôn · Lịch trình theo yêu cầu',
    },
  },
  {
    id: 'fishing',
    icon: '🎣',
    title: {
      ko: '낚시 체험',
      en: 'Fishing Experience',
      zh: '海钓与夜钓鱿鱼',
      ru: 'Морская рыбалка',
      ja: '釣り体験',
      hi: 'मछली पकड़ने का अनुभव',
      vi: 'Trải nghiệm câu cá · câu mực',
    },
    desc: {
      ko: '야간 오징어 낚시 · 바다 낚시 체험',
      en: 'Night Squid Fishing · Sea Fishing Experience',
      zh: '夜间钓鱿鱼 · 海钓体验',
      ru: 'Ночная ловля кальмаров · Морская рыбалка',
      ja: '夜のイカ釣り · 海釣り体験',
      hi: 'रात में स्क्विड फिशिंग · समुद्री मछली पकड़ने का अनुभव',
      vi: 'Câu mực đêm · Trải nghiệm câu cá biển',
    },
  },
  {
    id: 'others',
    icon: '🏄',
    title: {
      ko: '기타 해양 스포츠·체험',
      en: 'Other Water Sports & Experiences',
      zh: '其他水上运动与体验',
      ru: 'Другие водные развлечения',
      ja: 'その他のマリンスポーツ・体験',
      hi: 'अन्य जल क्रीड़ाएँ और अनुभव',
      vi: 'Thể thao biển & Trải nghiệm khác',
    },
    desc: {
      ko: '패러세일링 · 제트스키 · 카약 · 해양 스포츠',
      en: 'Parasailing · Jet Ski · Kayak · Water Sports',
      zh: '滑翔伞 · 水上摩托 · 皮划艇 · 水上运动',
      ru: 'Парасейлинг · Гидроцикл · Каяк · Водные виды спорта',
      ja: 'パラセーリング · ジェットスキー · カヤック · マリンスポーツ',
      hi: 'पैरासेलिंग · जेट स्की · कयाक · जल क्रीड़ाएँ',
      vi: 'Dù lượn · Mô tô nước · Chèo kayak · Thể thao biển',
    },
  },
]

const T: Record<
  Locale,
  {
    sunsetTown: string
    khemBeach: string
    activities: string
    categories: string
    policyTitle: string
    policyText: string
  }
> = {
  ko: {
    sunsetTown: '선셋타운',
    khemBeach: '켐비치',
    activities: '액티비티',
    categories: '상담 가능한 액티비티 분야 (프로그램·요금: 문의)',
    policyTitle: '액티비티 사전 안내 및 예약 도우미 원칙',
    policyText:
      '마이 푸꾸옥은 여행 일정과 취향에 맞는 액티비티 예약을 도와드립니다. 예약 전 참여 시간과 포함 사항, 이동 방법, 이용 조건과 요금을 확인해 안내해 드리며, 확인되지 않은 임의의 상품·일정·가격을 게시하지 않습니다.',
  },
  en: {
    sunsetTown: 'Sunset Town',
    khemBeach: 'Khem Beach',
    activities: 'Activities',
    categories: 'Activity Categories Available for Inquiry (Program & Rates: On Request)',
    policyTitle: 'Activity Guidance & Booking Support Principles',
    policyText:
      'My Phu Quoc helps you arrange activities suited to your schedule and preferences. Before booking, we check and explain session times, inclusions, transfers, terms, and rates. We never post unverified or arbitrary products, schedules, or prices.',
  },
  zh: {
    sunsetTown: '日落小镇',
    khemBeach: '凯姆海滩',
    activities: '活动体验',
    categories: '可咨询的活动类别（项目与费用：咨询确认）',
    policyTitle: '活动提前说明与预订协助原则',
    policyText:
      'My Phu Quoc 协助预订符合您旅行日程与喜好的当地活动。预订前为您核实并说明参与时间、包含内容、交通方式、使用条件与费用，绝不发布未经核实的随意项目、日程或价格。',
  },
  ru: {
    sunsetTown: 'Сансет-Таун',
    khemBeach: 'Пляж Кхем',
    activities: 'Экскурсии и развлечения',
    categories: 'Категории развлечений по запросу (Программа и стоимость: по запросу)',
    policyTitle: 'Принципы информирования и помощи с бронированием',
    policyText:
      'My Phu Quoc помогает подобрать и забронировать развлечения под ваше расписание. Перед бронированием мы проверяем и сообщаем время проведения, что включено, трансфер, условия и стоимость, не публикуя произвольных цен или непроверенных программ.',
  },
  ja: {
    sunsetTown: 'サンセットタウン',
    khemBeach: 'ケムビーチ',
    activities: 'アクティビティ',
    categories: 'ご相談可能なアクティビティ分野（プログラム・料金：お問い合わせ）',
    policyTitle: 'アクティビティ事前案内・予約サポートの原則',
    policyText:
      'My Phu Quocはご旅行日程やお好みに合わせたアクティビティ予約をお手伝いします。ご予約前に参加時間・含まれる内容・移動方法・ご利用条件と料金を確認してご案内し、未確認のプログラムや任意の価格・日程は掲載いたしません。',
  },
  hi: {
    sunsetTown: 'सनसेट टाउन',
    khemBeach: 'खेम बीच',
    activities: 'एक्टिविटीज़',
    categories: 'पूछताछ के लिए उपलब्ध एक्टिविटी श्रेणियाँ (प्रोग्राम और शुल्क: पूछताछ करें)',
    policyTitle: 'एक्टिविटी पूर्व-मार्गदर्शन और बुकिंग सहायता सिद्धांत',
    policyText:
      'My Phu Quoc आपके शेड्यूल और पसंद के अनुसार एक्टिविटी बुक करने में मदद करता है। बुकिंग से पहले हम समय, शामिल सेवाओं, आने-जाने के तरीके, शर्तों और शुल्क की पुष्टि कर जानकारी देते हैं और बिना पुष्टि के कोई मनमाना कार्यक्रम या कीमत प्रकाशित नहीं करते।',
  },
  vi: {
    sunsetTown: 'Thị trấn Hoàng Hôn',
    khemBeach: 'Bãi Khem',
    activities: 'Hoạt động & Trải nghiệm',
    categories: 'Các nhóm hoạt động hỗ trợ tư vấn (Chương trình · Chi phí: Liên hệ)',
    policyTitle: 'Nguyên tắc hướng dẫn trước & hỗ trợ đặt hoạt động',
    policyText:
      'My Phu Quoc hỗ trợ đặt các hoạt động trải nghiệm phù hợp với lịch trình và sở thích của bạn. Trước khi đặt, chúng tôi kiểm tra và thông báo thời gian tham gia, hạng mục bao gồm, phương tiện di chuyển, điều kiện áp dụng và chi phí; tuyệt đối không đăng tải sản phẩm, lịch trình hay mức giá tùy ý chưa xác nhận.',
  },
}

export function ActivitiesLandingPage({ locale = 'ko' }: ActivitiesLandingPageProps) {
  const dict = getDictionary(locale)
  const t = T[locale] ?? T.en
  const copy = BOOKING_SERVICE_COPY[locale] ?? BOOKING_SERVICE_COPY.en
  const actCopy = copy.activities
  const mainWhatsappUrl = buildServiceWhatsappUrl(actCopy.prefillMessage)

  return (
    <div className="activitiesPageRoot">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>{t.sunsetTown}</Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>{t.khemBeach}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <main className="activitiesContainer">
        {/* Breadcrumb */}
        <div className="activitiesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{t.activities}</span>
        </div>

        {/* Hero Title Box ([액티비티]) */}
        <div
          className="activitiesHeaderBox"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(8, 22, 36, 0.52) 0%, rgba(8, 22, 36, 0.78) 100%), url('/categories/activities.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#FFFFFF',
            padding: '48px 28px',
            border: 'none',
            textAlign: 'center',
          }}
        >
          <div
            className="activitiesEyebrow"
            style={{ color: '#7DD3FC', textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}
          >
            {actCopy.tag} · {actCopy.priceLabel}
          </div>
          <h1
            className="activitiesTitle"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(26px, 4.2vw, 36px)',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            {actCopy.title}
          </h1>
          <p
            className="activitiesSubtitle"
            style={{
              color: 'rgba(255,255,255,0.94)',
              maxWidth: '680px',
              margin: '0 auto 20px',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {actCopy.body}
          </p>
          <div className="activitiesHeroBadgeRow">
            <span className="activitiesHeroPriceBadge">{actCopy.priceLabel}</span>
          </div>
          <div className="activitiesHeroCtaRow">
            <a
              href={mainWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="activitiesHeroPrimaryBtn"
            >
              {actCopy.ctaLabel}
            </a>
            <a
              href={CONTACT_CONFIG.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="activitiesHeroSecondaryBtn"
            >
              {actCopy.zaloLabel}
            </a>
          </div>
        </div>

        {/* [공통 소개] */}
        <BookingCommonIntroCallout locale={locale} />

        <div
          className="zoneNoteBanner amberNotice"
          style={{
            marginTop: '0',
            marginBottom: '20px',
            padding: '13px 16px',
            fontSize: '13.5px',
            lineHeight: 1.6,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px 16px',
          }}
        >
          <span>ℹ️ {SUNSET_BEACH_NOTICE_TEXT[locale] || SUNSET_BEACH_NOTICE_TEXT.en}</span>
          <Link
            href={localePath(locale, '/zones/khem-beach')}
            style={{ color: '#0B7A8A', fontWeight: 700, textDecoration: 'underline', whiteSpace: 'nowrap' }}
          >
            {MAIN_ZONES['khem-beach'].ctaButton[locale] || MAIN_ZONES['khem-beach'].ctaButton.en}
          </Link>
        </div>

        {/* 5 Activity Category Tiles (프로그램·요금: 문의 + 액티비티 문의하기) */}
        <section className="activitiesTilesSection">
          <h2 className="activitiesSectionTitle">{t.categories}</h2>
          <div className="activitiesTilesGrid">
            {ACTIVITY_CATEGORIES.map((cat) => {
              const catTitle = cat.title[locale] || cat.title.en
              const catDesc = cat.desc[locale] || cat.desc.en
              const catWhatsappUrl = buildServiceWhatsappUrl(`${actCopy.prefillMessage}[${catTitle}] `)
              return (
                <div key={cat.id} className="activityCategoryTile">
                  <div className="tileTopRow">
                    <span className="tileIcon" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span className="tileStatusPill">{actCopy.priceLabel}</span>
                  </div>
                  <h3 className="tileTitle">{catTitle}</h3>
                  <p className="tileDesc">{catDesc}</p>
                  <div className="tileActionRow">
                    <a
                      href={catWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tileInquiryBtn"
                    >
                      {actCopy.ctaLabel}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <ActivityYachtSection locale={locale} />

        {/* Information & Partnership Callout */}
        <div className="activitiesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">{t.policyTitle}</div>
            <div className="calloutText">{t.policyText}</div>
          </div>
        </div>

        {/* [4. 공통 도움 안내] */}
        <CommonHelpSection locale={locale} />
      </main>
    </div>
  )
}
