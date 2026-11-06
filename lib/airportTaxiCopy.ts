import type { Locale } from '@/lib/i18n/config'

// 공항 택시(픽업) 강조 문구
// 한국어: 사용자 확정 내용 / 그 외 언어: Claude 초안 (ChatGPT 언어 검수 전, 2026-11-06)
export interface AirportTaxiCopy {
  badge: string
  title: string
  subtitle: string
  points: { icon: string; title: string; body: string }[]
  cta: string
  rateEyebrow: string
  rateTitle: string
  rateSubtitle: string
}

const COPY: Record<Locale, AirportTaxiCopy> = {
  ko: {
    badge: '공항 택시 강력 추천',
    title: '푸꾸옥 도착부터 편안하게, 공항 택시',
    subtitle: '여행의 첫 이동이 편해야 여행 전체가 편안합니다.',
    points: [
      {
        icon: '🪧',
        title: '기사님이 미리 기다립니다',
        body: '고객님 이름이 적힌 안내판을 들고 미리 기다립니다. 도착하시면 바로 택시에 탑승하실 수 있습니다.',
      },
      {
        icon: '🤝',
        title: '믿을 수 있는 기사님',
        body: '이용 중 불편 사항은 저희가 접수해 대신 처리해 드립니다.',
      },
      {
        icon: '✨',
        title: '깨끗한 신형 차량',
        body: '깨끗한 신형 차량으로 쾌적하게 이동하세요.',
      },
    ],
    cta: '공항 택시 문의하기',
    rateEyebrow: '공항 택시 요금',
    rateTitle: '공항 ↔ 숙소 택시 요금',
    rateSubtitle: '공항 이동 노선만 모았습니다. 차량 1대 기준 공시 요금(VND)이며 4인승·7인승·16인승 중 선택하세요.',
  },
  en: {
    badge: 'Airport Taxi · Top Pick',
    title: 'Start your Phu Quoc trip comfortably with our airport taxi',
    subtitle: 'A smooth first ride sets the tone for the whole trip.',
    points: [
      {
        icon: '🪧',
        title: 'Your driver will be waiting',
        body: 'Your driver will be waiting with a printed sign showing your name, so you can get straight into the taxi when you arrive.',
      },
      {
        icon: '🤝',
        title: 'A driver you can trust',
        body: 'If you run into any inconvenience during your ride, we take your report and handle it on your behalf.',
      },
      {
        icon: '✨',
        title: 'Clean, new vehicles',
        body: 'Travel comfortably in a clean, new car.',
      },
    ],
    cta: 'Ask About Airport Taxi',
    rateEyebrow: 'Airport Taxi Rates',
    rateTitle: 'Airport ↔ Hotel Taxi Rates',
    rateSubtitle: 'Airport routes only. Published rates per vehicle in VND — choose a 4-, 7- or 16-seater.',
  },
  zh: {
    badge: '机场出租车 强烈推荐',
    title: '抵达富国岛即刻舒适，机场出租车',
    subtitle: '旅程的第一段路舒适，整趟旅行都会轻松。',
    points: [
      {
        icon: '🪧',
        title: '司机提前等候',
        body: '司机会提前手持印有您姓名的接机牌等候，您抵达后即可直接上车。',
      },
      {
        icon: '🤝',
        title: '值得信赖的司机',
        body: '乘车过程中如遇任何不便，我们会受理并代您处理。',
      },
      {
        icon: '✨',
        title: '干净的新车',
        body: '乘坐干净的新车，舒适出行。',
      },
    ],
    cta: '咨询机场出租车',
    rateEyebrow: '机场出租车价格',
    rateTitle: '机场 ↔ 酒店 出租车价格',
    rateSubtitle: '仅列出机场路线。按每辆车公示价格（越南盾），可选4座、7座或16座。',
  },
  ru: {
    badge: 'Такси из аэропорта · Настоятельно рекомендуем',
    title: 'Комфортное начало поездки на Фукуок — такси из аэропорта',
    subtitle: 'Удобная первая поездка задаёт тон всему путешествию.',
    points: [
      {
        icon: '🪧',
        title: 'Водитель встретит вас',
        body: 'Водитель будет ждать вас с табличкой, на которой напечатано ваше имя, и вы сразу сядете в такси по прибытии.',
      },
      {
        icon: '🤝',
        title: 'Надёжный водитель',
        body: 'Если во время поездки что-то вас не устроит, мы примем обращение и решим вопрос за вас.',
      },
      {
        icon: '✨',
        title: 'Чистые новые автомобили',
        body: 'Комфортная поездка на чистом новом автомобиле.',
      },
    ],
    cta: 'Узнать про такси из аэропорта',
    rateEyebrow: 'Тарифы такси из аэропорта',
    rateTitle: 'Такси аэропорт ↔ отель',
    rateSubtitle: 'Только маршруты аэропорта. Опубликованные тарифы за автомобиль в VND — на 4, 7 или 16 мест.',
  },
  ja: {
    badge: '空港タクシー 一押し',
    title: 'フーコック到着から快適に、空港タクシー',
    subtitle: '旅の最初の移動が快適なら、旅全体が快適になります。',
    points: [
      {
        icon: '🪧',
        title: 'ドライバーが先に待っています',
        body: 'お客様のお名前を印刷したボードを持ってお待ちしています。ご到着後、すぐにタクシーにご乗車いただけます。',
      },
      {
        icon: '🤝',
        title: '信頼できるドライバー',
        body: 'ご利用中にお困りのことがあれば、私たちがお申し出を受け付け、お客様に代わって対応いたします。',
      },
      {
        icon: '✨',
        title: '清潔な新型車両',
        body: '清潔な新型車両で快適にご移動ください。',
      },
    ],
    cta: '空港タクシーを問い合わせる',
    rateEyebrow: '空港タクシー料金',
    rateTitle: '空港 ↔ ホテル タクシー料金',
    rateSubtitle: '空港路線のみ掲載。車両1台あたりの公示料金（VND）で、4人乗り・7人乗り・16人乗りから選べます。',
  },
  hi: {
    badge: 'एयरपोर्ट टैक्सी · ख़ास सिफ़ारिश',
    title: 'फू क्वोक पहुँचते ही आरामदायक सफ़र, एयरपोर्ट टैक्सी',
    subtitle: 'सफ़र का पहला हिस्सा आरामदायक हो, तो पूरी यात्रा आसान हो जाती है।',
    points: [
      {
        icon: '🪧',
        title: 'ड्राइवर पहले से इंतज़ार करता है',
        body: 'ड्राइवर आपके नाम की छपी हुई तख़्ती लेकर इंतज़ार करेगा, ताकि आप पहुँचते ही सीधे टैक्सी में बैठ सकें।',
      },
      {
        icon: '🤝',
        title: 'भरोसेमंद ड्राइवर',
        body: 'सफ़र के दौरान कोई परेशानी हो, तो हम शिकायत दर्ज करके आपकी ओर से उसे संभालते हैं।',
      },
      {
        icon: '✨',
        title: 'साफ़-सुथरी नई गाड़ियाँ',
        body: 'साफ़-सुथरी नई गाड़ी में आराम से सफ़र करें।',
      },
    ],
    cta: 'एयरपोर्ट टैक्सी पूछें',
    rateEyebrow: 'एयरपोर्ट टैक्सी दरें',
    rateTitle: 'एयरपोर्ट ↔ होटल टैक्सी दरें',
    rateSubtitle: 'केवल एयरपोर्ट रूट। प्रति वाहन प्रकाशित दरें (VND) — 4, 7 या 16-सीटर चुनें।',
  },
  vi: {
    badge: 'Taxi sân bay · Rất nên chọn',
    title: 'Khởi đầu chuyến đi Phú Quốc thoải mái với taxi sân bay',
    subtitle: 'Chặng đầu tiên suôn sẻ sẽ giúp cả chuyến đi dễ chịu hơn.',
    points: [
      {
        icon: '🪧',
        title: 'Tài xế đón sẵn',
        body: 'Tài xế sẽ chờ bạn với bảng đón có in tên của bạn, giúp bạn lên taxi ngay khi đến nơi.',
      },
      {
        icon: '🤝',
        title: 'Tài xế đáng tin cậy',
        body: 'Nếu gặp bất kỳ bất tiện nào trong chuyến đi, chúng tôi sẽ tiếp nhận phản ánh và thay mặt bạn xử lý.',
      },
      {
        icon: '✨',
        title: 'Xe mới, sạch sẽ',
        body: 'Di chuyển thoải mái trên xe mới và sạch sẽ.',
      },
    ],
    cta: 'Hỏi về taxi sân bay',
    rateEyebrow: 'Giá taxi sân bay',
    rateTitle: 'Taxi sân bay ↔ khách sạn',
    rateSubtitle: 'Chỉ gồm các tuyến sân bay. Giá niêm yết theo xe (VND), chọn xe 4, 7 hoặc 16 chỗ.',
  },
}

export function getAirportTaxiCopy(locale: Locale): AirportTaxiCopy {
  return COPY[locale] ?? COPY.en
}
