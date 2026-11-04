// Translations: ChatGPT 7개 국어 검수 완료 (2026-11-02)
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { TripPlanner } from '@/components/TripPlanner'
import { BookingCommonIntroCallout, CommonHelpSection } from '@/components/BookingServiceSections'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface ItinerariesLandingPageProps {
  locale?: Locale
}

const NAV: Record<string, { sunsetTown: string; khemBeach: string; activities: string }> = {
  ko: { sunsetTown: '선셋타운', khemBeach: '켐비치', activities: '액티비티' },
  en: { sunsetTown: 'Sunset Town', khemBeach: 'Khem Beach', activities: 'Activities' },
  zh: { sunsetTown: '日落小镇', khemBeach: '凯姆海滩', activities: '活动体验' },
  ru: { sunsetTown: 'Сансет-Таун', khemBeach: 'Пляж Кхем', activities: 'Активности' },
  ja: { sunsetTown: 'サンセットタウン', khemBeach: 'ケムビーチ', activities: 'アクティビティ' },
  hi: { sunsetTown: 'सनसेट टाउन', khemBeach: 'खेम बीच', activities: 'गतिविधियाँ' },
  vi: { sunsetTown: 'Thị trấn Hoàng Hôn', khemBeach: 'Bãi Khem', activities: 'Hoạt động' },
}

interface ItineraryCopy {
  breadcrumb: string
  eyebrow: string
  title: string
  subtitle: string
  points: string[]
  policyTitle: string
  policyText: string
}

const COPY: Record<string, ItineraryCopy> = {
  ko: {
    breadcrumb: '추천 테마 일정',
    eyebrow: '맞춤 여행 일정 만들기',
    title: '몇 가지만 선택하면 푸꾸옥 남부 여행 일정이 완성돼요',
    subtitle:
      '선셋타운과 켐비치가 있는 푸꾸옥 남부 여행 일정(최대 3박 4일)을 도착 시간, 동행인, 여행 목적에 맞춰 시간대별로 구성해 드려요. 필요한 픽업과 투어를 선택해 한 번에 문의할 수 있어요.',
    points: [
      '주요 공연 2개 일정에 자동 반영',
      '항공편에 맞춘 첫날·마지막 날 일정',
      '푸꾸옥 중부·북부 이동 시간 안내',
      'WhatsApp·Zalo로 바로 견적 문의',
    ],
    policyTitle: '일정 안내 원칙',
    policyText:
      "공연 시간과 이동 시간은 공식 안내 및 현지 정보를 기준으로 반영하며, 확인되지 않은 내용은 '확인 필요'로 표시합니다. 가격은 업체 확인 후 안내하고, 예약 전 일정과 운영 여부를 다시 확인해 드립니다.",
  },
  en: {
    breadcrumb: 'Trip Planner',
    eyebrow: 'TRIP PLANNER',
    title: 'Make Your South Phu Quoc Itinerary in Just a Few Steps',
    subtitle:
      'Create a time-based itinerary for South Phu Quoc, including Sunset Town and Khem Beach, for up to 4 days and 3 nights. Your plan is tailored to your arrival time, travel companions, and interests. Add the transfers and tours you need and send one enquiry for everything.',
    points: [
      'Two key shows added to your plan',
      'First and last days planned around your flights',
      'Travel time guidance for Central & North Phu Quoc',
      'Request quotes via WhatsApp · Zalo',
    ],
    policyTitle: 'How We Plan Your Trip',
    policyText:
      "Show times and travel durations are based on official announcements and local information. Unconfirmed details are marked 'Confirmation needed'. Prices are provided after checking with operators, and we reconfirm schedules and availability before booking.",
  },
  zh: {
    breadcrumb: '旅行行程规划',
    eyebrow: '定制旅行行程',
    title: '只需简单选择，即可生成富国岛南部旅行行程',
    subtitle:
      '根据您的抵达时间、同行人员和旅行偏好，为您规划包含日落小镇和凯姆海滩的富国岛南部行程，最长4天3晚，并按时段安排活动。您还可以选择所需的接送及旅游项目，一次性提交咨询。',
    points: [
      '自动安排两场主要演出',
      '根据航班时间安排首日和最后一天的行程',
      '提供前往富国岛中部和北部的交通时间建议',
      '通过 WhatsApp · Zalo 咨询报价',
    ],
    policyTitle: '行程规划说明',
    policyText:
      '演出时间和交通时长依据官方公告及当地信息安排，尚未确认的内容会标注为“待确认”。价格将在向服务商核实后提供，预订前我们也会再次确认行程安排及实际运营情况。',
  },
  ja: {
    breadcrumb: '旅行プラン作成',
    eyebrow: 'オリジナル旅行プラン',
    title: 'いくつか選ぶだけで、フーコック島南部の旅行プランが完成',
    subtitle:
      'サンセットタウンやケムビーチを含むフーコック島南部の旅行プランを、最大3泊4日まで作成できます。到着時間、同行者、旅の目的に合わせて時間帯ごとにご提案。必要な送迎やツアーを選んで、まとめてお問い合わせいただけます。',
    points: [
      '主なショー2公演を自動で組み込み',
      'フライト時間に合わせて初日・最終日を調整',
      'フーコック島中部・北部への移動時間もご案内',
      'WhatsApp・Zaloでお見積もりを依頼',
    ],
    policyTitle: '旅行プラン作成の方針',
    policyText:
      'ショーの開催時間や移動時間は、公式案内と現地情報をもとに設定しています。未確認の情報には「要確認」と表示します。料金は事業者への確認後にご案内し、予約前にスケジュールと運営状況を再確認します。',
  },
  ru: {
    breadcrumb: 'Планировщик путешествия',
    eyebrow: 'ПЛАНИРОВЩИК ПУТЕШЕСТВИЯ',
    title: 'Составьте маршрут по югу Фукуока за несколько шагов',
    subtitle:
      'Составьте маршрут по югу Фукуока, включая Сансет-Таун и пляж Кхем, на срок до 4 дней и 3 ночей. План учитывает время прибытия, состав группы и ваши интересы, а мероприятия распределяются по времени. Выберите нужные трансферы и экскурсии и отправьте один общий запрос.',
    points: [
      'Два основных шоу автоматически включены в план',
      'Первый и последний дни с учётом времени рейсов',
      'Рекомендации по времени в пути до центра и севера Фукуока',
      'Запрос стоимости через WhatsApp · Zalo',
    ],
    policyTitle: 'Принципы планирования маршрута',
    policyText:
      'Время проведения шоу и продолжительность поездок указаны на основе официальных объявлений и местной информации. Неподтверждённые сведения отмечены как «Требует подтверждения». Стоимость сообщается после уточнения у операторов. Перед бронированием мы повторно проверяем расписание и доступность услуг.',
  },
  hi: {
    breadcrumb: 'यात्रा प्लानर',
    eyebrow: 'यात्रा की योजना बनाएँ',
    title: 'बस कुछ विकल्प चुनें और दक्षिणी फु क्वोक की यात्रा योजना पाएँ',
    subtitle:
      'सनसेट टाउन और खेम बीच सहित दक्षिणी फु क्वोक के लिए अधिकतम 3 रात और 4 दिन का यात्रा कार्यक्रम बनाएँ। आपकी आगमन की समय-सारणी, साथ यात्रा करने वाले लोगों और रुचियों के अनुसार गतिविधियाँ अलग-अलग समय पर तय की जाएँगी। ज़रूरी ट्रांसफ़र और टूर चुनकर एक साथ पूछताछ करें।',
    points: [
      'दो प्रमुख शो अपने आप यात्रा कार्यक्रम में शामिल',
      'फ़्लाइट के समय के अनुसार पहले और आख़िरी दिन की योजना',
      'मध्य और उत्तरी फु क्वोक तक पहुँचने के समय की जानकारी',
      'WhatsApp · Zalo पर कीमत की जानकारी माँगें',
    ],
    policyTitle: 'यात्रा योजना के दिशानिर्देश',
    policyText:
      "शो के समय और यात्रा की अवधि आधिकारिक घोषणाओं तथा स्थानीय जानकारी पर आधारित हैं। जिन विवरणों की पुष्टि नहीं हुई है, उन्हें 'पुष्टि आवश्यक' के रूप में चिह्नित किया जाता है। सेवा प्रदाताओं से जाँच के बाद कीमतें बताई जाती हैं और बुकिंग से पहले समय-सारणी तथा सेवाओं की उपलब्धता दोबारा जाँची जाती है।",
  },
  vi: {
    breadcrumb: 'Lên lịch trình du lịch',
    eyebrow: 'LÊN LỊCH TRÌNH DU LỊCH',
    title: 'Chỉ vài lựa chọn để tạo lịch trình khám phá Nam Phú Quốc',
    subtitle:
      'Tạo lịch trình khám phá Nam Phú Quốc, bao gồm Thị trấn Hoàng Hôn và Bãi Khem, tối đa 4 ngày 3 đêm. Các hoạt động được sắp xếp theo khung giờ, dựa trên thời gian đến, người đồng hành và sở thích của bạn. Chọn dịch vụ đưa đón và tour cần thiết để gửi yêu cầu tư vấn trong một lần.',
    points: [
      'Tự động sắp xếp 2 chương trình biểu diễn chính',
      'Sắp xếp ngày đầu và ngày cuối theo giờ bay',
      'Gợi ý thời gian di chuyển đến Trung và Bắc Phú Quốc',
      'Yêu cầu báo giá qua WhatsApp · Zalo',
    ],
    policyTitle: 'Nguyên tắc lên lịch trình',
    policyText:
      "Thời gian biểu diễn và di chuyển được sắp xếp dựa trên thông báo chính thức và thông tin địa phương. Nội dung chưa được xác nhận sẽ được đánh dấu 'Cần xác nhận'. Giá được cung cấp sau khi kiểm tra với đơn vị vận hành. Trước khi đặt dịch vụ, chúng tôi sẽ xác nhận lại lịch trình và tình trạng hoạt động.",
  },
}

export function ItinerariesLandingPage({ locale = 'ko' }: ItinerariesLandingPageProps) {
  const dict = getDictionary(locale)
  const nav = NAV[locale] ?? NAV.en
  const c = COPY[locale] ?? COPY.en

  return (
    <div className="itinerariesPageRoot">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>{nav.sunsetTown}</Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>{nav.khemBeach}</Link>
            <Link href={localePath(locale, '/activities')}>{nav.activities}</Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      <main className="itinerariesContainer">
        <div className="itinerariesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{c.breadcrumb}</span>
        </div>

        <div className="itinerariesHeaderBox tpHero">
          <div className="itinerariesEyebrow">{c.eyebrow}</div>
          <h1 className="itinerariesTitle">{c.title}</h1>
          <p className="itinerariesSubtitle">{c.subtitle}</p>
          <ul className="tpHeroPoints">
            {c.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <BookingCommonIntroCallout locale={locale} />

        <TripPlanner locale={locale} />

        <div className="itinerariesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">{c.policyTitle}</div>
            <div className="calloutText">{c.policyText}</div>
          </div>
        </div>

        <CommonHelpSection locale={locale} />
      </main>
    </div>
  )
}
