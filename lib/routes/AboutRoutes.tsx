import Link from 'next/link'
import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SiteFooter } from '@/components/SiteFooter'
import {
  buildAlternates,
  localePath,
  localeUrl,
  ogLocaleFor,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { SITE_URL } from '@/lib/supabase/config'

const ABOUT_CONTENT: Record<
  Locale,
  {
    title: string
    seoTitle: string
    seoDesc: string
    breadcrumb: string
    tagline: string
    intro: string
    whatYouCanDoTitle: string
    whatYouCanDoItems: string[]
    principlesTitle: string
    principlesText: string
    bookingTitle: string
    bookingText: string
    contactTitle: string
    contactText: string
    contactEmail: string
    partnerPageLabel: string
  }
> = {
  ko: {
    title: '마이 푸꾸옥 소개 — 선셋타운 여행·상권 종합 가이드',
    seoTitle: '마이 푸꾸옥 소개 — 선셋타운 여행·상권 종합 가이드 | My Phu Quoc',
    seoDesc:
      '마이 푸꾸옥은 선셋타운을 중심으로 맛집, 카페, 호텔, 쇼핑, 액티비티, 생활 편의시설 정보를 공식 채널 확인 기반으로 6개 언어로 제공하는 여행 가이드입니다.',
    breadcrumb: '소개',
    tagline: '선셋타운 여행·상권 종합 가이드',
    intro:
      '마이 푸꾸옥은 푸꾸옥 선셋타운을 중심으로 맛집, 카페와 바, 호텔, 쇼핑, 액티비티, 스파, 생활 편의시설, 환전·ATM·은행 정보를 한곳에 모아 제공하는 여행 가이드입니다.',
    whatYouCanDoTitle: '이 사이트에서 할 수 있는 일',
    whatYouCanDoItems: [
      '업체 디렉토리에서 카테고리별로 장소 찾기',
      '선셋타운 지도와 12대 명소 가이드 살펴보기',
      '뉴스·가이드에서 이벤트와 쇼 소식 확인하기',
      '한국어, 영어, 중국어, 러시아어, 일본어, 힌디어로 정보 보기',
    ],
    principlesTitle: '정보 원칙',
    principlesText:
      '공식 채널을 통해 확인된 정보를 중심으로 제공합니다. 확인되지 않은 내용은 게재하지 않으며, 정보가 변경되면 업데이트합니다. 가격과 운영시간은 달라질 수 있으므로 방문 전에 공식 안내를 확인해 주세요.',
    bookingTitle: '예매 링크 안내',
    bookingText:
      '일부 액티비티는 고객 편의를 위해 연결한 예매 링크(Klook 예매 페이지)로 연결됩니다.',
    contactTitle: '제보 및 제휴 문의',
    contactText:
      "정보 수정 제보, 업체 등록, 호텔·업체 제휴 관련 문의는 ddunddun8484@gmail.com으로 보내 주세요. 업체 등록은 '업체 등록 신청' 페이지에서도 가능합니다.",
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: '업체 등록 신청 바로가기',
  },
  en: {
    title: 'About My Phu Quoc — Comprehensive Guide to Sunset Town',
    seoTitle: 'About My Phu Quoc — Comprehensive Guide to Sunset Town | My Phu Quoc',
    seoDesc:
      'My Phu Quoc is an independent travel guide offering verified information on dining, cafes, hotels, shopping, and activities in Sunset Town across 6 languages.',
    breadcrumb: 'About',
    tagline: 'Sunset Town Travel & Commercial District Guide',
    intro:
      'My Phu Quoc is an independent travel and commercial district guide centered on Sunset Town, Phu Quoc, bringing together verified dining, cafes & bars, hotels, shopping, activities, spas, amenities, and banking/ATM information in one place.',
    whatYouCanDoTitle: 'What You Can Do on This Site',
    whatYouCanDoItems: [
      'Browse places by category in the business directory',
      'Explore the interactive Sunset Town map and 12 key landmarks',
      'Discover latest show announcements and events in News & Guides',
      'Access all travel information in 6 languages: English, Korean, Chinese, Russian, Japanese, and Hindi',
    ],
    principlesTitle: 'Editorial Principles',
    principlesText:
      'We curate information based on official announcements and verified channels. Unconfirmed rumors are excluded, and listings are updated as official facts change. Operating hours and prices are subject to change, so please check official notices before visiting.',
    bookingTitle: 'Booking Link Notice',
    bookingText:
      'Select activity links connect to Klook booking pages provided for visitor convenience.',
    contactTitle: 'Inquiries & Submissions',
    contactText:
      'For information corrections, business listings, or partnership inquiries, please contact ddunddun8484@gmail.com. You can also submit business information via our partner registration page.',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: 'Go to Partner Registration',
  },
  zh: {
    title: '关于My Phu Quoc — 富国岛日落小镇旅游与商圈综合指南',
    seoTitle: '关于My Phu Quoc — 富国岛日落小镇旅游与商圈综合指南 | My Phu Quoc',
    seoDesc:
      'My Phu Quoc以富国岛日落小镇为核心，汇集美食、咖啡厅、酒店、购物、游玩及便民设施资讯，以官方信息为基准提供6种语言的综合旅游指南。',
    breadcrumb: '关于我们',
    tagline: '富国岛日落小镇旅游与商圈综合指南',
    intro:
      'My Phu Quoc是以越南富国岛日落小镇为核心的综合旅游与商圈指南，汇聚美食餐厅、咖啡厅与酒吧、酒店住宿、购物商场、休闲活动、水疗SPA、生活便利设施及ATM/银行信息。',
    whatYouCanDoTitle: '本站主要功能',
    whatYouCanDoItems: [
      '在商家目录中按分类便捷检索场所',
      '查看日落小镇全景地图与12大标志性景点指南',
      '在资讯与博客中掌握最新演出与活动消息',
      '支持中文、英语、韩语、俄语、日语、印地语6种语言浏览',
    ],
    principlesTitle: '信息发布原则',
    principlesText:
      '坚持以官方渠道发布的信息为基准。未核实内容不予收录，信息变更时及时修正更新。价格与营业时间可能调整，出行前请参考官方最新通知。',
    bookingTitle: '预订链接说明',
    bookingText: '部分游玩活动页面提供前往Klook的预订链接，旨在为游客提供便利的票务通道。',
    contactTitle: '合作与信息反馈',
    contactText:
      '如需勘误、商家入驻或业务合作，请发送邮件至 ddunddun8484@gmail.com。您也可以通过“商家入驻申请”页面提交信息。',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: '前往商家入驻申请',
  },
  ru: {
    title: 'О проекте My Phu Quoc — путеводитель по Сансет Тауну',
    seoTitle: 'О проекте My Phu Quoc — путеводитель по Сансет Тауну | My Phu Quoc',
    seoDesc:
      'My Phu Quoc — независимый путеводитель по Сансет Тауну на Фукуоке: рестораны, отели, развлечения и полезная информация на 6 языках на основе официальных данных.',
    breadcrumb: 'О проекте',
    tagline: 'Путеводитель по Сансет Тауну и курортной инфраструктуре',
    intro:
      'My Phu Quoc — независимый туристический путеводитель по Сансет Тауну на острове Фукуок, объединяющий проверенную информацию о ресторанах, кафе, барах, отелях, магазинах, спа-центрах, банкоматах и инфраструктуре.',
    whatYouCanDoTitle: 'Возможности сервиса',
    whatYouCanDoItems: [
      'Поиск заведений по категориям в каталоге',
      'Интерактивная карта Сансет Тауна и гид по 12 ключевым достопримечательностям',
      'Актуальные новости, шоу и события в разделе блога',
      'Поддержка 6 языков: русский, английский, корейский, китайский, японский и хинди',
    ],
    principlesTitle: 'Принципы проверки информации',
    principlesText:
      'Мы публикуем данные на основе официальных сообщений Sun World и подтвержденных источников. Непроверенные сведения исключаются, а данные обновляются при поступлении официальных изменений. Цены и часы работы могут меняться, рекомендуем проверять актуальность перед визитом.',
    bookingTitle: 'Ссылки на бронирование',
    bookingText:
      'Ссылки на некоторые активности ведут на платформу Klook исключительно для удобства гостей при оформлении билетов.',
    contactTitle: 'Контакты и сотрудничество',
    contactText:
      'Для уточнений информации, добавления заведений или сотрудничества пишите на ddunddun8484@gmail.com.',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: 'Подать заявку на регистрацию объекта',
  },
  ja: {
    title: 'My Phu Quocについて — サンセットタウン観光・エリア総合ガイド',
    seoTitle:
      'My Phu Quocについて — サンセットタウン観光・エリア総合ガイド | My Phu Quoc',
    seoDesc:
      'My Phu Quocはサンセットタウンを中心に、飲食店、カフェ、ホテル、アクティビティ等の公式情報を6言語でお届けする総合観光ガイドです。',
    breadcrumb: '概要',
    tagline: 'サンセットタウン観光・エリア総合ガイド',
    intro:
      'My Phu Quocは、フーコック島サンセットタウンを中心に、飲食店、カフェ＆バー、ホテル、ショッピング、アクティビティ、スパ、ATM・生活便利施設を一元的にまとめた独立型観光ガイドです。',
    whatYouCanDoTitle: '当サイトでできること',
    whatYouCanDoItems: [
      '店舗ディレクトリでカテゴリー別にスポットを検索',
      'サンセットタウンマップと12大名所ガイドを閲覧',
      'ニュース＆ブログでイベントやショーの最新情報を確認',
      '日本語、英語、韓国語、中国語、ロシア語、ヒンディー語の6言語で閲覧',
    ],
    principlesTitle: '情報掲載の原則',
    principlesText:
      '公式発表や現地確認が取れた情報を厳選して掲載しています。未確認の情報は掲載せず、公式変更に合わせて随時アップデートします。料金や営業時間は変更される場合がありますので、訪問前に公式案内をご確認ください。',
    bookingTitle: '予約リンクについて',
    bookingText:
      '一部のアクティビティには、お客様の利便性のためにKlookの予約ページへのリンクを設置しています。',
    contactTitle: 'お問い合わせ・掲載依頼',
    contactText:
      '情報の修正依頼、店舗掲載、提携に関するお問い合わせは ddunddun8484@gmail.com までご連絡ください。',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: '店舗掲載の申請ページへ',
  },
  hi: {
    title: 'My Phu Quoc के बारे में — सनसेट टाउन यात्रा व व्यावसायिक क्षेत्र गाइड',
    seoTitle:
      'My Phu Quoc के बारे में — सनसेट टाउन यात्रा व व्यावसायिक क्षेत्र गाइड | My Phu Quoc',
    seoDesc:
      'माई फू क्वोक सनसेट टाउन पर केंद्रित एक स्वतंत्र यात्रा गाइड है, जो 6 भाषाओं में आधिकारिक जानकारी के आधार पर रेस्तरां, होटल और गतिविधियों का विवरण प्रदान करता है।',
    breadcrumb: 'हमारे बारे में',
    tagline: 'सनसेट टाउन यात्रा व व्यावसायिक क्षेत्र गाइड',
    intro:
      'माई फू क्वोक (My Phu Quoc) वियतनाम के सनसेट टाउन पर केंद्रित एक स्वतंत्र यात्रा गाइड है, जो रेस्तरां, कैफे, होटल, शॉपिंग, गतिविधियों, स्पा और बैंकिंग/एटीएम की सत्यापित जानकारी एक ही मंच पर उपलब्ध कराता है।',
    whatYouCanDoTitle: 'इस वेबसाइट पर आप क्या कर सकते हैं',
    whatYouCanDoItems: [
      'श्रेणी के अनुसार व्यवसाय निर्देशिका में स्थानों की खोज',
      'सनसेट टाउन मानचित्र और 12 प्रमुख स्थलों की मार्गदर्शिका',
      'समाचार और गाइड अनुभाग में शो और कार्यक्रमों की ताज़ा जानकारी',
      '6 भाषाओं में जानकारी: हिन्दी, अंग्रेज़ी, कोरियाई, चीनी, रूसी और जापानी',
    ],
    principlesTitle: 'सूचना के सिद्धांत',
    principlesText:
      'हम आधिकारिक चैनलों से पुष्ट जानकारी ही प्रकाशित करते हैं। अप्रमाणित विवरण शामिल नहीं किए जाते हैं। समय और कीमतों में बदलाव संभव है, कृपया यात्रा से पहले आधिकारिक चैनलों से जांच लें।',
    bookingTitle: 'बुकिंग लिंक सूचना',
    bookingText:
      'कुछ गतिविधियों के लिए आगंतुकों की सुविधा हेतु Klook बुकिंग लिंक जोड़े गए हैं।',
    contactTitle: 'संपर्क और सहयोग',
    contactText:
      'जानकारी संशोधन, व्यापार पंजीकरण या साझेदारी के लिए कृपया ddunddun8484@gmail.com पर संपर्क करें।',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: 'व्यवसाय पंजीकरण पृष्ठ पर जाएं',
  },
  vi: {
    title: 'Giới thiệu My Phu Quoc — Cẩm nang du lịch Sunset Town',
    seoTitle: 'Giới thiệu My Phu Quoc — Cẩm nang du lịch Sunset Town | My Phu Quoc',
    seoDesc:
      'My Phu Quoc là cẩm nang du lịch độc lập cung cấp thông tin ẩm thực, khách sạn và điểm đến tại Sunset Town bằng 6 ngôn ngữ.',
    breadcrumb: 'Giới thiệu',
    tagline: 'Cẩm nang du lịch Sunset Town',
    intro:
      'My Phu Quoc là cẩm nang du lịch tổng hợp về ẩm thực, lưu trú, mua sắm và giải trí tại Sunset Town, Phú Quốc.',
    whatYouCanDoTitle: 'Tính năng trên trang',
    whatYouCanDoItems: [
      'Tra cứu địa điểm theo danh mục',
      'Bản đồ Sunset Town và 12 điểm đến nổi bật',
      'Cập nhật sự kiện và tin tức',
      'Hỗ trợ 6 ngôn ngữ',
    ],
    principlesTitle: 'Nguyên tắc thông tin',
    principlesText:
      'Cung cấp thông tin dựa trên các thông báo chính thức và được kiểm chứng.',
    bookingTitle: 'Liên kết đặt vé',
    bookingText:
      'Một số hoạt động có liên kết đặt vé qua Klook nhằm tạo thuận tiện cho du khách.',
    contactTitle: 'Liên hệ',
    contactText: 'Mọi thông tin liên hệ xin gửi về ddunddun8484@gmail.com.',
    contactEmail: 'ddunddun8484@gmail.com',
    partnerPageLabel: 'Đăng ký doanh nghiệp',
  },
}

export async function generateAboutMetadata(locale: Locale = 'en'): Promise<Metadata> {
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en
  const barePath = '/about'
  const canonicalUrl = localeUrl(locale, barePath)
  const alternates = buildAlternates(barePath)

  return {
    title: content.seoTitle,
    description: content.seoDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
    openGraph: {
      title: content.seoTitle,
      description: content.seoDesc,
      url: canonicalUrl,
      locale: ogLocaleFor(locale),
      type: 'website',
    },
  }
}

export function renderAboutRoute(locale: Locale = 'en') {
  const dict = getDictionary(locale)
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en
  const barePath = '/about'
  const canonicalUrl = localeUrl(locale, barePath)
  const baseUrl = SITE_URL.replace(/\/+$/, '')

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'My Phu Quoc',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: content.seoDesc,
      email: content.contactEmail,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'My Phu Quoc',
      url: baseUrl,
      inLanguage: locale,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: dict.nav.home,
          item: localeUrl(locale, '/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: content.breadcrumb,
          item: canonicalUrl,
        },
      ],
    },
  ]

  return (
    <main className="aboutPageRoot">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {dict.nav.zones}
            </Link>
            <Link href={localePath(locale, '/news')}>{dict.nav.newsAndBlog}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/search')}>{dict.nav.search}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <div className="aboutContainer">
        <header className="aboutHeader">
          <span className="aboutBadge">{content.tagline}</span>
          <h1 className="aboutTitle">{content.title}</h1>
          <p className="aboutIntro">{content.intro}</p>
        </header>

        <section className="aboutSection">
          <h2>{content.whatYouCanDoTitle}</h2>
          <div className="aboutGrid">
            {content.whatYouCanDoItems.map((item, idx) => (
              <div key={idx} className="aboutCard">
                <span className="aboutCardNumber">0{idx + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="aboutSection calloutSection">
          <h2>{content.principlesTitle}</h2>
          <div className="calloutBox">
            <p>{content.principlesText}</p>
          </div>
        </section>

        <section className="aboutSection">
          <h2>{content.bookingTitle}</h2>
          <p className="aboutNoticeText">{content.bookingText}</p>
        </section>

        <section className="aboutSection contactSection">
          <h2>{content.contactTitle}</h2>
          <p>{content.contactText}</p>
          <div className="contactActionRow">
            <a href={`mailto:${content.contactEmail}`} className="contactEmailBadge">
              ✉️ {content.contactEmail}
            </a>
            <Link href={localePath(locale, '/for-businesses')} className="partnerButton">
              {content.partnerPageLabel}
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />

      <style>{`
        .aboutPageRoot {
          min-height: 100vh;
          background: var(--site-bg, #f3f8f7);
          color: var(--ink, #12333b);
        }
        .aboutContainer {
          max-width: 860px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }
        .aboutHeader {
          text-align: left;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid var(--line, #d5e5e4);
        }
        .aboutBadge {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          color: var(--accent, #0b7a8a);
          background: var(--ocean-soft, #ddf0ef);
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .aboutTitle {
          font-family: Georgia, serif;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.2;
          margin: 0 0 20px;
          color: var(--ink, #12333b);
        }
        .aboutIntro {
          font-size: 18px;
          line-height: 1.6;
          color: #3d5a60;
          margin: 0;
        }
        .aboutSection {
          margin-bottom: 40px;
        }
        .aboutSection h2 {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink, #12333b);
          margin-bottom: 18px;
        }
        .aboutGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }
        .aboutCard {
          background: #fff;
          border: 1px solid var(--line, #d5e5e4);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .aboutCardNumber {
          font-size: 14px;
          font-weight: 800;
          color: var(--accent, #0b7a8a);
          background: var(--ocean-soft, #ddf0ef);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .aboutCard p {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
          color: #2a4349;
        }
        .calloutBox {
          background: #eef7f6;
          border-left: 4px solid var(--accent, #0b7a8a);
          border-radius: 8px;
          padding: 20px;
          font-size: 15px;
          line-height: 1.65;
          color: #204147;
        }
        .calloutBox p {
          margin: 0;
        }
        .aboutNoticeText {
          font-size: 15px;
          line-height: 1.6;
          color: #4a6369;
        }
        .contactSection p {
          font-size: 15px;
          line-height: 1.6;
          color: #2a4349;
          margin-bottom: 20px;
        }
        .contactActionRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .contactEmailBadge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid var(--accent, #0b7a8a);
          color: var(--accent, #0b7a8a);
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
        }
        .partnerButton {
          display: inline-flex;
          align-items: center;
          background: var(--accent, #0b7a8a);
          color: #fff;
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
        }
      `}</style>
    </main>
  )
}
