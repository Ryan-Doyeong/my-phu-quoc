import type { Locale } from '@/lib/i18n/config'

// 바가지 요금 없음 안내 + 필수 코스 배지
// 한국어: 사용자 확정 문구 / 그 외: Gemini 초안 + ChatGPT 검수 (2026-11-06)
export interface NoOverchargeCopy {
  title: string
  body: string
  cta: string
  prefill: string
  mustDo: string
}

const COPY: Record<Locale, NoOverchargeCopy> = {
  ko: {
    title: '숨은 바가지 요금, 없습니다',
    body: '마이 푸꾸옥에서 안내한 버기·요트·택시 요금 외에 숨은 추가 요금은 없습니다. 안내된 요금과 다른 금액을 요구받으면 바로 저희에게 신고해 주세요.',
    cta: '요금 문제 신고하기',
    prefill: '안녕하세요! 마이 푸꾸옥 안내 요금과 다른 금액을 요구받아 신고합니다. (이용 서비스 / 날짜 / 요구받은 금액): ',
    mustDo: '필수 코스',
  },
  en: {
    title: 'No Hidden Fees or Overcharging',
    body: 'There are no hidden extra charges beyond the buggy, yacht, and taxi rates listed on My Phu Quoc. If you are asked to pay an amount different from the listed rate, please report it to us immediately.',
    cta: 'Report a Pricing Issue',
    prefill: 'Hello! I was asked to pay more than the rate listed on My Phu Quoc and would like to report it. (Service / Date / Amount requested): ',
    mustDo: 'Must-Do Experience',
  },
  zh: {
    title: '无隐性加价或乱收费',
    body: '除 My Phu Quoc 公布的观光车、游艇和出租车费用外，绝无任何隐形附加费。如果您被要求支付与公布价格不符的费用，请立即向我们举报。',
    cta: '举报收费问题',
    prefill: '您好！我被要求支付与 My Phu Quoc 公布价格不符的费用，现向你们举报。（服务 / 日期 / 被要求的金额）：',
    mustDo: '必体验项目',
  },
  ru: {
    title: 'Никаких скрытых доплат и завышенных цен',
    body: 'Помимо тарифов на багги, яхты и такси, указанных на My Phu Quoc, нет никаких скрытых доплат. Если с вас требуют сумму, отличающуюся от указанного тарифа, пожалуйста, немедленно сообщите нам.',
    cta: 'Сообщить о проблеме с ценой',
    prefill: 'Здравствуйте! С меня потребовали сумму, отличающуюся от тарифа на My Phu Quoc, и я хочу сообщить об этом. (Услуга / Дата / Запрошенная сумма): ',
    mustDo: 'Обязательно стоит попробовать',
  },
  ja: {
    title: '不当な上乗せ請求や隠れた追加料金はありません',
    body: 'My Phu Quocでご案内したバギー・ヨット・タクシー料金以外に、隠れた追加料金は一切ありません。ご案内した料金と異なる金額を請求された場合は、すぐに私たちにご報告ください。',
    cta: '料金トラブルを報告する',
    prefill: 'こんにちは！My Phu Quocでご案内の料金と異なる金額を請求されたため、報告します。（サービス / 日付 / 請求された金額）：',
    mustDo: '外せない体験',
  },
  hi: {
    title: 'कोई छिपा हुआ अतिरिक्त शुल्क नहीं',
    body: 'My Phu Quoc पर बताए गए बग्गी, यॉट और टैक्सी शुल्क के अलावा कोई छिपा हुआ अतिरिक्त शुल्क नहीं है। यदि आपसे बताए गए शुल्क से अलग राशि मांगी जाती है, तो कृपया तुरंत हमें रिपोर्ट करें।',
    cta: 'शुल्क संबंधी समस्या की रिपोर्ट करें',
    prefill: 'नमस्ते! मुझसे My Phu Quoc पर बताए गए शुल्क से अलग राशि मांगी गई है, मैं इसकी रिपोर्ट करना चाहता/चाहती हूँ। (सेवा / तारीख / मांगी गई राशि): ',
    mustDo: 'ज़रूर आज़माएँ',
  },
  vi: {
    title: 'Không có phụ phí ẩn hay tình trạng thu giá bất hợp lý',
    body: 'Ngoài mức giá xe buggy, du thuyền và taxi được thông báo trên My Phu Quoc, hoàn toàn không có phụ phí ẩn nào khác. Nếu bạn bị yêu cầu thanh toán số tiền khác với giá đã thông báo, vui lòng báo ngay cho chúng tôi.',
    cta: 'Báo vấn đề về giá',
    prefill: 'Xin chào! Tôi bị yêu cầu trả số tiền khác với giá đã thông báo trên My Phu Quoc và muốn báo cho bên bạn. (Dịch vụ / Ngày / Số tiền bị yêu cầu): ',
    mustDo: 'Nhất định phải thử',
  },
}

export function getNoOverchargeCopy(locale: Locale): NoOverchargeCopy {
  return COPY[locale] ?? COPY.en
}
