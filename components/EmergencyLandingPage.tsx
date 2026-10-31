// Translations: ko source; en/zh/ru/ja/hi drafted 2026-10-31 — ChatGPT 검수 대기
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface EmergencyLandingPageProps {
  locale?: Locale
}


// vi is not an active locale; it falls back to en.
const T: Record<string, {
  sunsetTown: string; khemBeach: string; activities: string; itineraries: string; breadcrumb: string
  frontDesk: string; findTitle: string; hospitals: string; pharmacies: string; hospital: string; pharmacy: string
  blank: string; address: string; phone: string; googleMap: string; consulate: string; consulatePhone: string; disclaimer: string
}> = {
  ko: {
    sunsetTown: '선셋타운', khemBeach: '켐비치', activities: '액티비티', itineraries: '추천 테마 일정', breadcrumb: '긴급상황',
    frontDesk: '위급하면 먼저 묵고 계신 호텔 프런트에 알려 주세요. 앰뷸런스 호출과 가까운 병원 안내를 도와드립니다.',
    findTitle: '병원·약국 찾기', hospitals: '병원', pharmacies: '약국', hospital: '병원', pharmacy: '약국',
    blank: '(공란)', address: '주소', phone: '전화', googleMap: '구글맵', consulate: '심각한 상황이면 영사관', consulatePhone: '전화번호', disclaimer: '면책 문구',
  },
  en: {
    sunsetTown: 'Sunset Town', khemBeach: 'Khem Beach', activities: 'Activities', itineraries: 'Theme Itineraries', breadcrumb: 'Emergency',
    frontDesk: 'In an emergency, please first tell the front desk of your hotel. They can help you call an ambulance and direct you to the nearest hospital.',
    findTitle: 'Find Hospitals & Pharmacies', hospitals: 'Hospitals', pharmacies: 'Pharmacies', hospital: 'Hospital', pharmacy: 'Pharmacy',
    blank: '(to be added)', address: 'Address', phone: 'Phone', googleMap: 'Google Maps', consulate: 'In a serious situation, contact your consulate', consulatePhone: 'Phone number', disclaimer: 'Disclaimer',
  },
  zh: {
    sunsetTown: '日落小镇', khemBeach: '凯姆海滩', activities: '活动体验', itineraries: '推荐主题行程', breadcrumb: '紧急情况',
    frontDesk: '遇到紧急情况，请先告知您入住酒店的前台。他们会协助您呼叫救护车并指引您前往附近的医院。',
    findTitle: '查找医院与药店', hospitals: '医院', pharmacies: '药店', hospital: '医院', pharmacy: '药店',
    blank: '（待补充）', address: '地址', phone: '电话', googleMap: '谷歌地图', consulate: '情况严重时请联系领事馆', consulatePhone: '电话号码', disclaimer: '免责声明',
  },
  ru: {
    sunsetTown: 'Сансет Таун', khemBeach: 'Пляж Бай Кхем', activities: 'Активности', itineraries: 'Тематические маршруты', breadcrumb: 'Экстренные ситуации',
    frontDesk: 'В случае опасности сначала сообщите на стойку регистрации вашего отеля. Там помогут вызвать скорую помощь и подскажут ближайшую больницу.',
    findTitle: 'Поиск больниц и аптек', hospitals: 'Больницы', pharmacies: 'Аптеки', hospital: 'Больница', pharmacy: 'Аптека',
    blank: '(будет добавлено)', address: 'Адрес', phone: 'Телефон', googleMap: 'Google Карты', consulate: 'В серьёзной ситуации обращайтесь в консульство', consulatePhone: 'Номер телефона', disclaimer: 'Отказ от ответственности',
  },
  ja: {
    sunsetTown: 'サンセットタウン', khemBeach: 'ケムビーチ', activities: 'アクティビティ', itineraries: 'おすすめテーマ別プラン', breadcrumb: '緊急時',
    frontDesk: '緊急の場合は、まずご宿泊のホテルのフロントにお知らせください。救急車の手配や最寄りの病院のご案内をお手伝いします。',
    findTitle: '病院・薬局を探す', hospitals: '病院', pharmacies: '薬局', hospital: '病院', pharmacy: '薬局',
    blank: '（準備中）', address: '住所', phone: '電話', googleMap: 'Googleマップ', consulate: '深刻な状況では領事館へ', consulatePhone: '電話番号', disclaimer: '免責事項',
  },
  hi: {
    sunsetTown: 'सनसेट टाउन', khemBeach: 'खेम बीच', activities: 'गतिविधियाँ', itineraries: 'थीम यात्रा-कार्यक्रम', breadcrumb: 'आपातकाल',
    frontDesk: 'आपात स्थिति में सबसे पहले अपने होटल के फ्रंट डेस्क को बताएं। वे एम्बुलेंस बुलाने और नज़दीकी अस्पताल की जानकारी देने में आपकी मदद करेंगे।',
    findTitle: 'अस्पताल और फ़ार्मेसी खोजें', hospitals: 'अस्पताल', pharmacies: 'फ़ार्मेसी', hospital: 'अस्पताल', pharmacy: 'फ़ार्मेसी',
    blank: '(जोड़ा जाएगा)', address: 'पता', phone: 'फ़ोन', googleMap: 'गूगल मैप', consulate: 'गंभीर स्थिति में वाणिज्य दूतावास से संपर्क करें', consulatePhone: 'फ़ोन नंबर', disclaimer: 'अस्वीकरण',
  },
}

export function EmergencyLandingPage({ locale = 'ko' }: EmergencyLandingPageProps) {
  const dict = getDictionary(locale)
  const t = T[locale] ?? T.en

  return (
    <div className="emergencyPageRoot">
      {/* 0. Top Header */}
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
            <Link href={localePath(locale, '/itineraries')}>
              {t.itineraries}
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
          <span className="current">{t.breadcrumb}</span>
        </div>

        {/* ① 호텔 프런트 안내 박스 (가장 크게) */}
        <div className="emergencyMainNoticeBox">
          <p className="mainNoticeText">
            {t.frontDesk}
          </p>
        </div>

        {/* ② 병원·약국 찾기 (중심 영역) */}
        <section className="emergencyCentralSection">
          <h1 className="emergencySectionMainTitle">{t.findTitle}</h1>

          {/* 1) 병원 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{t.hospitals}</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`hospital-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">{t.hospital} {idx}</span>
                    <span className="slotPlaceholderTag">{t.blank}</span>
                  </div>
                  <h3 className="slotItemTitle">{t.blank}</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{t.address}</span>
                      <span className="slotMetaVal">{t.blank}</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{t.phone}</span>
                      <span className="slotMetaVal">{t.blank}</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      {t.googleMap} {t.blank}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2) 약국 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{t.pharmacies}</h2>
            <div className="slotGrid3">
              {[1, 2, 3].map((idx) => (
                <div key={`pharmacy-${idx}`} className="slotCard">
                  <div className="slotCardHeader">
                    <span className="slotBadge">{t.pharmacy} {idx}</span>
                    <span className="slotPlaceholderTag">{t.blank}</span>
                  </div>
                  <h3 className="slotItemTitle">{t.blank}</h3>
                  <div className="slotMetaList">
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{t.address}</span>
                      <span className="slotMetaVal">{t.blank}</span>
                    </div>
                    <div className="slotMetaRow">
                      <span className="slotMetaLabel">{t.phone}</span>
                      <span className="slotMetaVal">{t.blank}</span>
                    </div>
                  </div>
                  <div className="slotBtnRow">
                    <button type="button" className="slotMapBtn" disabled>
                      {t.googleMap} {t.blank}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ 심각한 상황이면 영사관 박스 */}
        <section className="emergencyConsularBox">
          <h2 className="consularBoxTitle">{t.consulate}</h2>
          <div className="consularSlotContent">
            <div className="consularRow">
              <span className="consularLabel">{t.consulatePhone}</span>
              <span className="consularValue">{t.blank}</span>
            </div>
          </div>
        </section>

        {/* ④ 하단 113/114/115 한 줄 자리 + 면책 문구 자리 */}
        <div className="emergencyBottomWrap">
          <div className="emergencyHotlineSingleLine">
            <span>113 {t.blank}</span>
            <span className="dotDivider">·</span>
            <span>114 {t.blank}</span>
            <span className="dotDivider">·</span>
            <span>115 {t.blank}</span>
          </div>
          <div className="emergencyDisclaimerLine">
            <span>{t.disclaimer}: {t.blank}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
