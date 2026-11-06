import type { Locale } from '@/lib/i18n/config'

// 공항 택시(픽업) 강조 문구
// 한국어: 사용자 확정 내용 / 그 외 언어: Claude 초안 (ChatGPT 언어 검수 전, 2026-11-06)
export interface AirportTaxiCopy {
  badge: string
  title: string
  subtitle: string
  points: { icon: string; title: string; body: string }[]
  cta: string
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
        body: '고객님 이름을 출력해 들고 미리 기다립니다. 도착하면 바로 택시에 탑승하실 수 있습니다.',
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
  },
  en: {
    badge: 'Airport Taxi · Top Pick',
    title: 'Start your Phu Quoc trip comfortably with our airport taxi',
    subtitle: 'A smooth first ride sets the tone for the whole trip.',
    points: [
      {
        icon: '🪧',
        title: 'Your driver is already waiting',
        body: 'Your driver waits for you in advance holding a printed sign with your name, so you can get straight into the taxi.',
      },
      {
        icon: '🤝',
        title: 'A driver you can trust',
        body: 'If anything is uncomfortable during your ride, we take your report and handle it for you.',
      },
      {
        icon: '✨',
        title: 'Clean, new vehicles',
        body: 'Travel comfortably in a clean, new car.',
      },
    ],
    cta: 'Ask About Airport Taxi',
  },
  zh: {
    badge: '机场出租车 强烈推荐',
    title: '抵达富国岛即刻舒适，机场出租车',
    subtitle: '旅程的第一段路舒适，整趟旅行都会轻松。',
    points: [
      {
        icon: '🪧',
        title: '司机提前等候',
        body: '司机会提前打印您的姓名牌等候，您到达后可直接上车。',
      },
      {
        icon: '🤝',
        title: '值得信赖的司机',
        body: '乘车过程中如有任何不便，我们会受理并代为处理。',
      },
      {
        icon: '✨',
        title: '干净的新车',
        body: '乘坐干净的新车，舒适出行。',
      },
    ],
    cta: '咨询机场出租车',
  },
  ru: {
    badge: 'Такси из аэропорта · Рекомендуем',
    title: 'Комфортное начало поездки на Фукуок — такси из аэропорта',
    subtitle: 'Удобная первая поездка задаёт тон всему путешествию.',
    points: [
      {
        icon: '🪧',
        title: 'Водитель ждёт заранее',
        body: 'Водитель заранее ждёт вас с табличкой с вашим именем, и вы сразу садитесь в такси.',
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
  },
  ja: {
    badge: '空港タクシー 一押し',
    title: 'フーコック到着から快適に、空港タクシー',
    subtitle: '旅の最初の移動が快適なら、旅全体が快適になります。',
    points: [
      {
        icon: '🪧',
        title: 'ドライバーが先に待っています',
        body: 'お客様のお名前を印刷したボードを持って先にお待ちしています。到着後すぐにタクシーに乗れます。',
      },
      {
        icon: '🤝',
        title: '信頼できるドライバー',
        body: 'ご利用中に不便なことがあれば、私たちが承り、代わりに対応します。',
      },
      {
        icon: '✨',
        title: '清潔な新型車両',
        body: '清潔な新型車両で快適にご移動ください。',
      },
    ],
    cta: '空港タクシーを問い合わせる',
  },
  hi: {
    badge: 'एयरपोर्ट टैक्सी · ख़ास सिफ़ारिश',
    title: 'फु क्वोक पहुँचते ही आरामदायक सफ़र, एयरपोर्ट टैक्सी',
    subtitle: 'सफ़र का पहला हिस्सा आरामदायक हो, तो पूरी यात्रा आसान हो जाती है।',
    points: [
      {
        icon: '🪧',
        title: 'ड्राइवर पहले से इंतज़ार करता है',
        body: 'ड्राइवर आपके नाम की छपी तख़्ती लेकर पहले से इंतज़ार करता है, इसलिए आप सीधे टैक्सी में बैठ सकते हैं।',
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
  },
  vi: {
    badge: 'Taxi sân bay · Rất nên chọn',
    title: 'Khởi đầu chuyến đi Phú Quốc thoải mái với taxi sân bay',
    subtitle: 'Chặng đầu tiên suôn sẻ sẽ giúp cả chuyến đi dễ chịu hơn.',
    points: [
      {
        icon: '🪧',
        title: 'Tài xế chờ sẵn',
        body: 'Tài xế chờ sẵn với bảng in tên của bạn, bạn có thể lên taxi ngay khi đến nơi.',
      },
      {
        icon: '🤝',
        title: 'Tài xế đáng tin cậy',
        body: 'Nếu có điều gì bất tiện trong chuyến đi, chúng tôi tiếp nhận và xử lý thay bạn.',
      },
      {
        icon: '✨',
        title: 'Xe mới, sạch sẽ',
        body: 'Di chuyển thoải mái trên xe mới và sạch sẽ.',
      },
    ],
    cta: 'Hỏi về taxi sân bay',
  },
}

export function getAirportTaxiCopy(locale: Locale): AirportTaxiCopy {
  return COPY[locale] ?? COPY.en
}
