import type { Locale } from '@/lib/i18n/config'

// 차량 투어(택시) 기사님 소개 문구
// 한국어: 사용자 확정 문구 / 그 외 언어: Claude 초안 (ChatGPT 언어 검수 전, 2026-11-06)
export interface DriverShowcaseCopy {
  title: string
  subtitle: string
  points: string[]
  report: string
  alt: string
}

const COPY: Record<Locale, DriverShowcaseCopy> = {
  ko: {
    title: '여러분의 재미있고 추억에 남을 여행을 책임지는 멋쟁이 기사님들',
    subtitle: '마이 푸꾸옥과 함께하는 기사님들을 소개합니다.',
    points: [
      '전문적인 서비스를 제공합니다',
      '숨겨진 비용이 없습니다',
      '추가 비용이 발생하는 경우 미리 안내해 드립니다',
    ],
    report: '안내된 요금과 다른 바가지 요금을 요구받으면 바로 저희에게 신고해 주세요.',
    alt: '마이 푸꾸옥 차량 투어 기사님',
  },
  en: {
    title: 'Our stylish drivers, in charge of making your trip fun and memorable',
    subtitle: 'Meet the drivers who work with My Phu Quoc.',
    points: [
      'Professional service',
      'No hidden fees',
      'If any extra cost is needed, we tell you in advance',
    ],
    report: 'If you are asked to pay more than the listed rate, please report it to us right away.',
    alt: 'My Phu Quoc car tour driver',
  },
  zh: {
    title: '帅气的司机们，为您带来有趣又难忘的旅程',
    subtitle: '认识与 My Phu Quoc 合作的司机们。',
    points: ['提供专业服务', '没有隐性费用', '如需额外费用，会提前告知您'],
    report: '如果被要求支付与公布价格不符的费用，请立即向我们举报。',
    alt: 'My Phu Quoc 包车游司机',
  },
  ru: {
    title: 'Наши стильные водители сделают вашу поездку весёлой и запоминающейся',
    subtitle: 'Знакомьтесь: водители, которые работают с My Phu Quoc.',
    points: [
      'Профессиональный сервис',
      'Никаких скрытых платежей',
      'Если понадобятся дополнительные расходы, мы сообщим заранее',
    ],
    report: 'Если с вас просят больше указанной цены, сразу сообщите нам.',
    alt: 'Водитель автомобильных туров My Phu Quoc',
  },
  ja: {
    title: '楽しくて思い出に残る旅をお届けする、素敵なドライバーたち',
    subtitle: 'My Phu Quoc と一緒に働くドライバーをご紹介します。',
    points: [
      'プロのサービスを提供します',
      '隠れた費用はありません',
      '追加費用が必要な場合は事前にお知らせします',
    ],
    report: 'ご案内した料金と異なる金額を請求された場合は、すぐに私たちへご連絡ください。',
    alt: 'My Phu Quoc 貸切車ツアーのドライバー',
  },
  hi: {
    title: 'आपकी यात्रा को मज़ेदार और यादगार बनाने वाले हमारे स्टाइलिश ड्राइवर',
    subtitle: 'My Phu Quoc के साथ काम करने वाले ड्राइवरों से मिलिए।',
    points: [
      'पेशेवर सेवा',
      'कोई छिपा शुल्क नहीं',
      'अगर कोई अतिरिक्त खर्च हो, तो हम पहले से बता देंगे',
    ],
    report: 'अगर बताई गई दर से ज़्यादा पैसे माँगे जाएँ, तो तुरंत हमें बताएँ।',
    alt: 'My Phu Quoc कार टूर ड्राइवर',
  },
  vi: {
    title: 'Các bác tài lịch lãm, đồng hành để chuyến đi của bạn vui và đáng nhớ',
    subtitle: 'Làm quen với các tài xế hợp tác cùng My Phu Quoc.',
    points: [
      'Dịch vụ chuyên nghiệp',
      'Không có phí ẩn',
      'Nếu cần thêm chi phí, chúng tôi sẽ báo trước',
    ],
    report: 'Nếu bị yêu cầu trả cao hơn mức giá niêm yết, hãy báo ngay cho chúng tôi.',
    alt: 'Tài xế tour xe của My Phu Quoc',
  },
}

export function getDriverShowcaseCopy(locale: Locale): DriverShowcaseCopy {
  return COPY[locale] ?? COPY.en
}
