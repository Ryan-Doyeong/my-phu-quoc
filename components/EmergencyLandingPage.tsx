// Translations: 7개 국어 (ko, en, zh, ja, ru, hi, vi) ChatGPT 원어민 전수 검수 완료 (2026-11-02)
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { NAV_ZONE_LABELS } from '@/lib/i18n/uiStrings'

interface EmergencyLandingPageProps {
  locale?: Locale
}

interface EmergencyCopy {
  activities: string
  itineraries: string
  breadcrumb: string
  mainNotice: string
  sectionTitle: string
  hospital: string
  pharmacy: string
  address: string
  phone: string
  googleMapsBtn: string
  placeholder: string
  consularTitle: string
  phoneLabel: string
  hotlinePolice: string
  hotlineFire: string
  hotlineAmbulance: string
  disclaimer: string
}

const COPY: Record<string, EmergencyCopy> = {
  ko: {
    activities: '액티비티',
    itineraries: '추천 테마 일정',
    breadcrumb: '긴급상황',
    mainNotice: '위급한 상황에서는 즉시 현지 긴급전화로 연락하세요. 호텔에 머무르고 계신다면 프런트에도 알려 주세요. 구급차 호출과 가까운 병원 안내를 도와드릴 수 있습니다.',
    sectionTitle: '병원·약국 찾기',
    hospital: '병원',
    pharmacy: '약국',
    address: '주소',
    phone: '전화',
    googleMapsBtn: '구글맵에서 보기',
    placeholder: '(준비 중)',
    consularTitle: '심각한 상황에서는 대사관·영사관에 연락하세요',
    phoneLabel: '전화번호',
    hotlinePolice: '113 경찰',
    hotlineFire: '114 소방',
    hotlineAmbulance: '115 구급차',
    disclaimer: '응급 의료 판단과 조치는 현지 의료진 및 공식 기관의 안내를 따르시기 바랍니다.',
  },
  en: {
    activities: 'Activities',
    itineraries: 'Trip Planner',
    breadcrumb: 'Emergency',
    mainNotice: "In an emergency, call the local emergency services immediately. If you're staying at a hotel, also inform the front desk. Staff may be able to help arrange an ambulance and direct you to a nearby hospital.",
    sectionTitle: 'Find Hospitals & Pharmacies',
    hospital: 'Hospital',
    pharmacy: 'Pharmacy',
    address: 'Address',
    phone: 'Phone',
    googleMapsBtn: 'View on Google Maps',
    placeholder: '(Coming soon)',
    consularTitle: 'For Serious Situations, Contact Your Embassy or Consulate',
    phoneLabel: 'Phone Number',
    hotlinePolice: '113 Police',
    hotlineFire: '114 Fire & Rescue',
    hotlineAmbulance: '115 Ambulance',
    disclaimer: 'For emergency medical decisions and treatment, follow the guidance of local medical professionals and official authorities.',
  },
  zh: {
    activities: '活动体验',
    itineraries: '推荐主题行程',
    breadcrumb: '紧急情况',
    mainNotice: '遇到紧急情况，请立即拨打当地紧急救援电话。如果您入住酒店，也请告知前台。工作人员可协助呼叫救护车并提供附近医院的信息。',
    sectionTitle: '查找医院和药店',
    hospital: '医院',
    pharmacy: '药店',
    address: '地址',
    phone: '电话',
    googleMapsBtn: '在 Google 地图中查看',
    placeholder: '（即将上线）',
    consularTitle: '情况严重时，请联系本国大使馆或领事馆',
    phoneLabel: '电话号码',
    hotlinePolice: '113 报警电话',
    hotlineFire: '114 消防救援',
    hotlineAmbulance: '115 急救电话',
    disclaimer: '涉及紧急医疗判断和处理时，请遵循当地医护人员及官方机构的指导。',
  },
  ja: {
    activities: 'アクティビティ',
    itineraries: 'テーマ別プラン',
    breadcrumb: '緊急時のご案内',
    mainNotice: '緊急時は、まず現地の緊急通報先にご連絡ください。ホテルに滞在中の場合は、フロントにもお知らせください。救急車の手配や近隣の病院のご案内をお手伝いできる場合があります。',
    sectionTitle: '病院・薬局を探す',
    hospital: '病院',
    pharmacy: '薬局',
    address: '住所',
    phone: '電話',
    googleMapsBtn: 'Google マップで見る',
    placeholder: '（準備中）',
    consularTitle: '深刻な事態では大使館・領事館にご連絡ください',
    phoneLabel: '電話番号',
    hotlinePolice: '113 警察',
    hotlineFire: '114 消防・救助',
    hotlineAmbulance: '115 救急車',
    disclaimer: '緊急時の医療上の判断や処置については、現地の医療従事者および公的機関の指示に従ってください。',
  },
  ru: {
    activities: 'Активности',
    itineraries: 'Маршруты',
    breadcrumb: 'Экстренная помощь',
    mainNotice: 'В экстренной ситуации немедленно позвоните в местную службу экстренной помощи. Если вы остановились в отеле, также сообщите на стойку регистрации. Сотрудники могут помочь вызвать скорую помощь и подсказать ближайшую больницу.',
    sectionTitle: 'Найти больницы и аптеки',
    hospital: 'Больница',
    pharmacy: 'Аптека',
    address: 'Адрес',
    phone: 'Телефон',
    googleMapsBtn: 'Открыть в Google Картах',
    placeholder: '(Скоро появится)',
    consularTitle: 'В серьёзной ситуации свяжитесь с посольством или консульством',
    phoneLabel: 'Номер телефона',
    hotlinePolice: '113 Полиция',
    hotlineFire: '114 Пожарная охрана и спасатели',
    hotlineAmbulance: '115 Скорая помощь',
    disclaimer: 'По вопросам экстренной медицинской помощи следуйте рекомендациям местных медицинских специалистов и официальных служб.',
  },
  hi: {
    activities: 'गतिविधियाँ',
    itineraries: 'यात्रा कार्यक्रम',
    breadcrumb: 'आपातकालीन सहायता',
    mainNotice: 'आपात स्थिति में तुरंत स्थानीय आपातकालीन सेवा को कॉल करें। यदि आप किसी होटल में ठहरे हैं, तो रिसेप्शन को भी सूचित करें। कर्मचारी एम्बुलेंस बुलाने और नज़दीकी अस्पताल की जानकारी देने में मदद कर सकते हैं।',
    sectionTitle: 'अस्पताल और दवा की दुकानें खोजें',
    hospital: 'अस्पताल',
    pharmacy: 'दवा की दुकान',
    address: 'पता',
    phone: 'फ़ोन',
    googleMapsBtn: 'Google Maps पर देखें',
    placeholder: '(जल्द उपलब्ध होगा)',
    consularTitle: 'गंभीर स्थिति में अपने दूतावास या वाणिज्य दूतावास से संपर्क करें',
    phoneLabel: 'फ़ोन नंबर',
    hotlinePolice: '113 पुलिस',
    hotlineFire: '114 अग्निशमन एवं बचाव',
    hotlineAmbulance: '115 एम्बुलेंस',
    disclaimer: 'आपातकालीन चिकित्सा संबंधी निर्णयों और उपचार के लिए स्थानीय चिकित्सा विशेषज्ञों तथा आधिकारिक संस्थाओं के निर्देशों का पालन करें।',
  },
  vi: {
    activities: 'Hoạt động',
    itineraries: 'Lịch trình gợi ý',
    breadcrumb: 'Tình huống khẩn cấp',
    mainNotice: 'Trong trường hợp khẩn cấp, hãy gọi ngay số điện thoại khẩn cấp tại địa phương. Nếu đang lưu trú tại khách sạn, bạn cũng nên thông báo cho lễ tân. Nhân viên có thể hỗ trợ gọi xe cấp cứu và hướng dẫn đến bệnh viện gần nhất.',
    sectionTitle: 'Tìm bệnh viện và nhà thuốc',
    hospital: 'Bệnh viện',
    pharmacy: 'Nhà thuốc',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    googleMapsBtn: 'Xem trên Google Maps',
    placeholder: '(Đang cập nhật)',
    consularTitle: 'Trong tình huống nghiêm trọng, hãy liên hệ đại sứ quán hoặc lãnh sự quán',
    phoneLabel: 'Số điện thoại',
    hotlinePolice: '113 Công an',
    hotlineFire: '114 Cứu hỏa và cứu nạn',
    hotlineAmbulance: '115 Cấp cứu',
    disclaimer: 'Đối với các quyết định và xử trí y tế khẩn cấp, vui lòng tuân theo hướng dẫn của nhân viên y tế địa phương và cơ quan chức năng.',
  },
}

export function EmergencyLandingPage({ locale = 'en' }: EmergencyLandingPageProps) {
  const dict = getDictionary(locale)
  const c = COPY[locale] || COPY.en

  return (
    <div className="emergencyPageRoot">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {NAV_ZONE_LABELS.sunset[locale] || NAV_ZONE_LABELS.sunset.en}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {NAV_ZONE_LABELS.khem[locale] || NAV_ZONE_LABELS.khem.en}
            </Link>
            <Link href={localePath(locale, '/activities')}>
              {c.activities}
            </Link>
            <Link href={localePath(locale, '/itineraries')}>
              {c.itineraries}
            </Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container */}
      <main className="emergencyContainer">
        {/* Breadcrumb */}
        <div className="emergencyBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{c.breadcrumb}</span>
        </div>

        {/* ① 호텔 프런트 안내 박스 */}
        <div className="emergencyMainNoticeBox">
          <p className="mainNoticeText">
            {c.mainNotice}
          </p>
        </div>

        {/* ② 병원·약국 찾기 (중심 영역) */}
        <section className="emergencyCentralSection">
          <h1 className="emergencySectionMainTitle">{c.sectionTitle}</h1>

          {/* 1) 병원 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.hospital}</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`hospital-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">{c.hospital} {idx}</span>
                    <span className="slotPlaceholderTag">{c.placeholder}</span>
                  </div>
                  <h3 className="slotItemTitle">{c.placeholder}</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{c.address}</span>
                      <span className="slotMetaVal">{c.placeholder}</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{c.phone}</span>
                      <span className="slotMetaVal">{c.placeholder}</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      {c.googleMapsBtn} {c.placeholder}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2) 약국 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.pharmacy}</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`pharmacy-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">{c.pharmacy} {idx}</span>
                    <span className="slotPlaceholderTag">{c.placeholder}</span>
                  </div>
                  <h3 className="slotItemTitle">{c.placeholder}</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{c.address}</span>
                      <span className="slotMetaVal">{c.placeholder}</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{c.phone}</span>
                      <span className="slotMetaVal">{c.placeholder}</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      {c.googleMapsBtn} {c.placeholder}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ 심각한 상황이면 영사관 박스 */}
        <section className="emergencyConsularBox">
          <h2 className="consularBoxTitle">{c.consularTitle}</h2>
          <div className="consularSlotContent">
            <div className="consularRow">
              <span className="consularLabel">{c.phoneLabel}</span>
              <span className="consularValue">{c.placeholder}</span>
            </div>
          </div>
        </section>

        {/* ④ 하단 113/114/115 한 줄 자리 + 면책 문구 자리 */}
        <div className="emergencyBottomWrap">
          <div className="emergencyHotlineSingleLine">
            <span>{c.hotlinePolice}</span>
            <span className="dotDivider">·</span>
            <span>{c.hotlineFire}</span>
            <span className="dotDivider">·</span>
            <span>{c.hotlineAmbulance}</span>
          </div>
          <div className="emergencyDisclaimerLine">
            <span>{c.disclaimer}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
