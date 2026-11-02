/**
 * lib/googleReviewAnalyzer.ts
 * 구글맵 평점, 리뷰 수, 현장 특징 및 방문자 피드백을 기반으로
 * 각 업체의 장점(Pros +)과 참고할 점(Cons/Good to Know -)을 객관적으로 분석
 *
 * 7개 국어(ko, en, zh, ja, ru, hi, vi) 원어민 전수 검수 반영 (2026-11-02)
 */

import type { Locale } from './i18n/config'

export interface BusinessReviewAnalysis {
  rating: number | null
  reviewCount: number | null
  ratingBadge: string
  topics: string[]
  praised: string[]
  goodToKnow: string[]
  sentimentSummary: string
  lastVerified: string
  sampleReviews?: string[]
}

const BADGE_TPL: Record<string, Record<string, string>> = {
  exceptional: {
    ko: '★ {score} 매우 높은 평가',
    en: '★ {score} Highly Rated',
    zh: '★ {score} 评分很高',
    ja: '★ {score} 非常に高い評価',
    ru: '★ {score} Очень высокая оценка',
    hi: '★ {score} बहुत उच्च रेटिंग',
    vi: '★ {score} Đánh giá rất cao',
  },
  veryGood: {
    ko: '★ {score} 높은 평가',
    en: '★ {score} Very Good',
    zh: '★ {score} 评价良好',
    ja: '★ {score} 高評価',
    ru: '★ {score} Высокая оценка',
    hi: '★ {score} बहुत अच्छी रेटिंग',
    vi: '★ {score} Đánh giá tốt',
  },
  verified: {
    ko: '★ {score} 구글맵 평점',
    en: '★ {score} Google Maps Rating',
    zh: '★ {score} Google 地图评分',
    ja: '★ {score} Google マップの評価',
    ru: '★ {score} Рейтинг на Google Картах',
    hi: '★ {score} Google Maps रेटिंग',
    vi: '★ {score} Điểm đánh giá Google Maps',
  },
  collecting: {
    ko: '리뷰 집계 중',
    en: 'Collecting Reviews',
    zh: '正在汇总评价',
    ja: '口コミを集計中',
    ru: 'Идёт сбор отзывов',
    hi: 'समीक्षाएँ एकत्र की जा रही हैं',
    vi: 'Đang tổng hợp đánh giá',
  },
}

const REAL_TPL = {
  sentimentSummary: {
    ko: "구글맵 리뷰 {count}개 기준 평점은 {score}점이며, 방문객 리뷰에서 '{topics}' 관련 내용이 자주 언급됩니다.",
    en: "Based on {count} Google Maps reviews, the rating is {score}, with visitors frequently mentioning '{topics}'.",
    zh: '根据 Google 地图上的 {count} 条评价，该地点的评分为 {score} 分，游客经常提到与“{topics}”相关的内容。',
    ja: 'Google マップの口コミ{count}件に基づく評価は{score}点で、「{topics}」に関する内容が訪問者の口コミで多く言及されています。',
    ru: 'По данным {count} отзывов на Google Картах, рейтинг составляет {score}. Посетители часто упоминают темы, связанные с «{topics}».',
    hi: "Google Maps पर {count} समीक्षाओं के आधार पर रेटिंग {score} है। आगंतुकों की समीक्षाओं में '{topics}' से जुड़े विषयों का अक्सर उल्लेख मिलता है।",
    vi: "Dựa trên {count} đánh giá trên Google Maps, địa điểm có điểm đánh giá {score}. Khách ghé thăm thường nhắc đến các nội dung liên quan đến '{topics}'.",
  },
  praisedTopic: {
    ko: "방문객 리뷰에서 '{topics}' 관련 긍정적인 평가가 자주 언급됩니다.",
    en: "Visitors frequently leave positive comments about '{topics}'.",
    zh: '游客评价中经常出现对“{topics}”的正面反馈。',
    ja: '訪問者の口コミでは、「{topics}」について好意的な評価が多く見られます。',
    ru: 'В отзывах посетители часто положительно оценивают «{topics}».',
    hi: "आगंतुकों की समीक्षाओं में '{topics}' के बारे में अक्सर सकारात्मक टिप्पणियाँ मिलती हैं।",
    vi: "Trong các đánh giá, khách ghé thăm thường có nhận xét tích cực về '{topics}'.",
  },
  praisedRating: {
    ko: '구글맵 리뷰 {count}개를 기준으로 평점 {score}점을 기록하고 있습니다.',
    en: 'Rated {score} based on {count} Google Maps reviews.',
    zh: '根据 Google 地图上的 {count} 条评价，目前评分为 {score} 分。',
    ja: 'Google マップの口コミ{count}件に基づく評価は{score}点です。',
    ru: 'Рейтинг на Google Картах составляет {score} на основе {count} отзывов.',
    hi: 'Google Maps पर {count} समीक्षाओं के आधार पर रेटिंग {score} है।',
    vi: 'Điểm đánh giá trên Google Maps là {score}, dựa trên {count} lượt đánh giá.',
  },
  goodToKnowPeak: {
    ko: '일몰 및 저녁 시간대(18:00~20:30)에는 방문객이 많을 수 있으니 여유 있게 방문하는 것이 좋습니다.',
    en: 'Sunset and dinner hours (18:00–20:30) may be busy, so consider allowing extra time for your visit.',
    zh: '日落及晚餐时段（18:00–20:30）游客可能较多，建议预留充足时间。',
    ja: '日没や夕食の時間帯（18:00～20:30）は混雑する場合があるため、時間に余裕を持って訪れることをおすすめします。',
    ru: 'В часы заката и ужина (18:00–20:30) здесь может быть многолюдно, поэтому рекомендуем предусмотреть дополнительное время для посещения.',
    hi: 'सूर्यास्त और रात के खाने के समय (18:00–20:30) भीड़ हो सकती है, इसलिए अपनी यात्रा के लिए थोड़ा अतिरिक्त समय रखें।',
    vi: 'Khung giờ ngắm hoàng hôn và ăn tối (18:00–20:30) có thể đông khách, vì vậy bạn nên dành thêm thời gian khi đến.',
  },
  goodToKnowHours: {
    ko: '방문 전 구글맵에서 최신 영업시간과 휴무 여부를 확인하는 것이 좋습니다.',
    en: 'We recommend checking the latest opening hours and closure information on Google Maps before visiting.',
    zh: '建议到访前通过 Google 地图查看最新营业时间及休息日信息。',
    ja: '訪問前にGoogle マップで最新の営業時間や休業日を確認することをおすすめします。',
    ru: 'Перед посещением рекомендуем проверить актуальные часы работы и информацию о выходных днях на Google Картах.',
    hi: 'जाने से पहले Google Maps पर खुलने के नवीनतम समय और बंद रहने वाले दिनों की जानकारी जाँच लें।',
    vi: 'Bạn nên kiểm tra giờ mở cửa mới nhất và thông tin ngày nghỉ trên Google Maps trước khi đến.',
  },
}

interface CatPack {
  topics: string[]
  praised: string[]
  goodToKnow: string[]
}

const CATEGORY_PACKS: Record<'wellness' | 'hotels' | 'dining' | 'cafe' | 'shopping', Record<string, CatPack>> = {
  wellness: {
    ko: {
      topics: ['테라피스트 압 조절', '룸 청결도 & 웰컴 티', '사전 예약 편리', '픽업 안내'],
      praised: [
        '세심한 테라피스트의 손길과 뭉친 근육을 풀어주는 압 조절에 대한 만족도가 높습니다.',
        '깔끔하고 쾌적한 개별 스파 룸과 시원한 웰컴 티 서비스가 호평받습니다.',
        '메신저를 통한 사전 예약 소통이 원활하며 주변 이동 안내가 편리합니다.',
      ],
      goodToKnow: [
        '오후 6시~9시 저녁 피크 시간대에는 워크인 방문 시 대기가 발생할 수 있으니 사전 예약을 권장합니다.',
        '테라피스트마다 기본 압의 차이가 있을 수 있으므로 시작 직후 강도를 요청하세요.',
        '계산서에 팁 포함 여부를 확인하고, 불포함 시 매너 팁(5만~10만 동)을 준비하는 것이 좋습니다.',
      ],
    },
    en: {
      topics: ['Therapist Pressure', 'Clean Private Rooms', 'Easy Booking', 'Pickup Support'],
      praised: [
        'Therapists provide attentive pressure control to ease muscle tension and travel fatigue.',
        'Clean, air-conditioned private treatment rooms and refreshing welcome tea.',
        'Responsive messaging support in English for advance bookings and directions.',
      ],
      goodToKnow: [
        'Evening peak hours (18:00–21:00) can get busy; advance booking is recommended.',
        'Let your therapist know your preferred pressure within the first few minutes.',
        'Check whether a service tip is included on the bill; otherwise, 50k–100k VND is customary.',
      ],
    },
    zh: {
      topics: ['技师手法力度', '房间整洁与迎宾茶', '预约便捷', '交通指引'],
      praised: [
        '按摩技师手法细致，力度控制适中，有助于缓解旅途疲劳。',
        '理疗房间整洁舒适，配有冷气并提供清爽迎宾茶饮。',
        '支持通过即时通讯工具提前预约，沟通顺畅便捷。',
      ],
      goodToKnow: [
        '晚间高峰时段（18:00–21:00）客人较多，建议提前预约。',
        '每位技师的默认力度不同，建议在开始后尽早说明偏好的力度。',
        '结账时请留意账单是否已含小费，如未包含，可按惯例准备5万至10万越南盾小费。',
      ],
    },
    ja: {
      topics: ['セラピストの力加減', '清潔な個室・ウェルカムティー', '事前予約のしやすさ', 'アクセス案内'],
      praised: [
        'セラピストの丁寧な施術と力加減の調整が好評です。',
        '清潔で空調の効いたトリートメントルームとウェルカムティーが提供されます。',
        'メッセージアプリでの事前予約や問い合わせにスムーズに対応しています。',
      ],
      goodToKnow: [
        '夕方の混雑時間帯（18:00～21:00）は待ち時間が発生する場合があるため、事前予約がおすすめです。',
        '施術開始後すぐに希望の力加減を伝えると、より快適に受けられます。',
        '会計時にチップが含まれているか確認し、別料金の場合は5万～10万VND程度を目安にご用意ください。',
      ],
    },
    ru: {
      topics: ['Сила нажатия мастера', 'Чистые кабинеты и чай', 'Удобная запись', 'Помощь с трансфером'],
      praised: [
        'Гости отмечают внимательную работу мастеров и комфортную регулировку силы нажатия.',
        'Чистые кабинеты с кондиционером и освежающий приветственный чай.',
        'Удобная предварительная запись через мессенджеры.',
      ],
      goodToKnow: [
        'В вечерние часы пик (18:00–21:00) возможна полная запись, поэтому рекомендуем бронировать время заранее.',
        'В первые минуты сеанса сообщите мастеру желаемую силу нажатия.',
        'Проверьте, включены ли чаевые в счёт; если нет, принято оставлять 50 000–100 000 донгов.',
      ],
    },
    hi: {
      topics: ['थेरेपिस्ट का दबाव नियंत्रण', 'साफ़ कमरे और वेलकम टी', 'आसान बुकिंग', 'यात्रा सहायता'],
      praised: [
        'थेरेपिस्ट की कुशल मसाज और आरामदायक दबाव नियंत्रण की सराहना की जाती है।',
        'साफ़-सुथरे, वातानुकूलित स्पॉ रूम और ताज़गी भरी वेलकम टी मिलती है।',
        'मैसेजिंग ऐप के माध्यम से अग्रिम बुकिंग और संवाद करना आसान है।',
      ],
      goodToKnow: [
        'शाम के व्यस्त समय (18:00–21:00) में भीड़ हो सकती है, इसलिए पहले से बुकिंग करना बेहतर है।',
        'मसाज शुरू होने के शुरुआती कुछ मिनटों में अपनी पसंद का दबाव बता दें।',
        'जाँच लें कि बिल में टिप शामिल है या नहीं; शामिल न होने पर 50,000–100,000 VND टिप देना सामान्य है।',
      ],
    },
    vi: {
      topics: ['Lực bấm huyệt chuẩn', 'Phòng ốc sạch sẽ', 'Đặt lịch tiện lợi', 'Hỗ trợ di chuyển'],
      praised: [
        'Kỹ thuật viên tay nghề vững, lực ấn vừa vặn giúp thư giãn cơ thể.',
        'Không gian phòng trị liệu sạch sẽ, máy lạnh mát và có trà chào mừng.',
        'Hỗ trợ tư vấn và đặt lịch trước nhanh chóng qua tin nhắn.',
      ],
      goodToKnow: [
        'Khung giờ cao điểm 18:00–21:00 khá đông khách, nên liên hệ đặt chỗ trước.',
        'Nên trao đổi rõ độ mạnh nhẹ ngay trong vài phút đầu để có trải nghiệm phù hợp.',
        'Kiểm tra hóa đơn đã gồm tiền tip chưa để chuẩn bị tip phù hợp (50k–100k VND).',
      ],
    },
  },
  hotels: {
    ko: {
      topics: ['선셋 & 불꽃놀이 전망', '발코니 객실', '버기카 이동', '객실 청결도'],
      praised: [
        '선셋타운 특유의 지중해풍 건축과 깔끔한 객실 컨디션, 바다·거리 전망이 호평받습니다.',
        '주요 명소와 해변 산책로, 야시장 등으로 이동하기 편리한 위치를 갖추고 있습니다.',
        '친절한 프런트 응대와 체크인·투어 안내 서비스를 제공합니다.',
      ],
      goodToKnow: [
        '선셋타운 지형 특성상 언덕과 계단이 있으므로 무거운 캐리어가 있다면 버기카 이동을 활용하세요.',
        '야간 공연 및 불꽃놀이(수~월 21:25경, 화요일 휴무) 시간대에는 외부 소음이 들릴 수 있습니다.',
        '체크인 시 보증금(디포짓) 또는 신분증 확인이 요청될 수 있습니다.',
      ],
    },
    en: {
      topics: ['Sunset & Fireworks Views', 'Balcony Rooms', 'Buggy Access', 'Clean Rooms'],
      praised: [
        'Mediterranean-inspired architecture with clean interiors and pleasant sea or town views.',
        'Convenient access to Sunset Town attractions, the promenade, and evening dining.',
        'Helpful front desk staff assisting with check-in and local transport.',
      ],
      goodToKnow: [
        'Sunset Town has hills and stairs; consider using an electric buggy when travelling with heavy luggage.',
        'Evening shows and fireworks (around 21:25 Wed–Mon; closed Tue) may bring brief outdoor sound.',
        'A refundable room deposit may be requested at check-in.',
      ],
    },
    zh: {
      topics: ['日落与烟花景观', '阳台客房', '观光车接驳', '客房整洁度'],
      praised: [
        '融合地中海风格建筑与整洁的客房环境，部分客房可欣赏海景或街景。',
        '前往日落小镇主要景点、海滨步道及餐饮区较为便利。',
        '前台人员服务热情，可协助办理入住及提供当地出行建议。',
      ],
      goodToKnow: [
        '日落小镇地势多坡道与台阶，携带大件行李时建议预约电瓶观光车协助。',
        '晚间演出及烟花时段（周三至周一约21:25，周二停演）可能会有一定室外声响。',
        '办理入住时酒店可能会要求支付可退还的押金。',
      ],
    },
    ja: {
      topics: ['夕日・花火の眺め', 'バルコニー客室', 'バギー移動', '客室の清潔さ'],
      praised: [
        '地中海風の街並みに調和した建物と清潔な客室環境が好評です。',
        'サンセットタウンの主要スポットや遊歩道、飲食店へのアクセスに便利です。',
        'フロントスタッフの丁寧なチェックイン対応と現地案内が評価されています。',
      ],
      goodToKnow: [
        '坂道や階段が多いエリアのため、大きな荷物がある場合は電動バギーの利用がおすすめです。',
        '夜のショーや花火（水～月 21:25頃、火曜休演）の時間帯は屋外の音が聞こえる場合があります。',
        'チェックイン時にデポジット（保証金）が必要となる場合があります。',
      ],
    },
    ru: {
      topics: ['Вид на закат и салют', 'Номера с балконом', 'Поездки на багги', 'Чистота номеров'],
      praised: [
        'Средиземноморская архитектура, чистые номера и приятный вид на море или улицы городка.',
        'Удобное расположение рядом с набережной, ресторанами и основными локациями Сансет-Тауна.',
        'Приветливый персонал стойки регистрации, готовый помочь с заселением и транспортом.',
      ],
      goodToKnow: [
        'Из-за холмистого рельефа и лестниц при наличии крупного багажа удобнее пользоваться электрокаром багги.',
        'Во время вечерних шоу и фейерверков (ср.–пн. около 21:25, вт. — выходной) может быть слышен звук с улицы.',
        'При заселении может потребоваться возвратный депозит.',
      ],
    },
    hi: {
      topics: ['सूर्यास्त और आतिशबाज़ी दृश्य', 'बालकनी वाले कमरे', 'बग्गी सुविधा', 'साफ़-सुथरे कमरे'],
      praised: [
        'भूमध्यसागरीय शैली की वास्तुकला, साफ़ कमरे और समुद्र या शहर का सुंदर दृश्य।',
        'सनसेट टाउन के प्रमुख आकर्षणों, समुद्र तटीय पथ और रेस्तराँ तक आसान पहुँच।',
        'चेक-इन और स्थानीय जानकारी में मदद करने वाला सहयोगी रिसेप्शन स्टाफ़।',
      ],
      goodToKnow: [
        'इलाके में ढलान और सीढ़ियाँ हैं; भारी सामान होने पर इलेक्ट्रिक बग्गी का उपयोग करना सुविधाजनक रहता है।',
        'शाम के शो और आतिशबाज़ी (बुध–सोम लगभग 21:25, मंगलवार बंद) के समय बाहर की आवाज़ आ सकती है।',
        'चेक-इन के समय वापसी योग्य सुरक्षा जमा (डिपॉज़िट) माँगी जा सकती है।',
      ],
    },
    vi: {
      topics: ['View hoàng hôn & pháo hoa', 'Phòng có ban công', 'Xe điện buggy', 'Phòng ốc sạch sẽ'],
      praised: [
        'Kiến trúc Địa Trung Hải đẹp mắt, phòng nghỉ sạch sẽ với tầm nhìn hướng biển hoặc phố.',
        'Thuận tiện di chuyển đến các điểm tham quan, đường dạo biển và khu ẩm thực.',
        'Nhân viên lễ tân nhiệt tình hỗ trợ nhận phòng và hướng dẫn di chuyển.',
      ],
      goodToKnow: [
        'Địa hình có dốc và bậc thang, nên liên hệ xe điện buggy khi mang hành lý nặng.',
        'Khung giờ trình diễn pháo hoa (~21:25 Thứ Tư–Thứ Hai, nghỉ Thứ Ba) có thể có âm thanh sôi động từ bên ngoài.',
        'Khách sạn có thể yêu cầu đặt cọc khi làm thủ tục nhận phòng.',
      ],
    },
  },
  dining: {
    ko: {
      topics: ['신선한 식재료', '음식 맛과 구성', '친절한 응대', '편리한 주문'],
      praised: [
        '신선한 식재료를 사용한 요리 완성도와 깔끔한 맛으로 방문객들의 긍정적인 평가를 받고 있습니다.',
        '선셋타운 산책이나 공연 관람 전후에 들르기 좋은 분위기와 좌석을 갖추고 있습니다.',
        '메뉴판에 사진과 영문 표기가 잘 되어 있고 직원 응대가 친절해 주문이 수월합니다.',
      ],
      goodToKnow: [
        '일몰 시간대(18:00~19:30)와 야간 공연 전후에는 방문객이 몰려 대기 시간이 발생할 수 있습니다.',
        '베트남 현지 식당 특성상 테이블 물티슈(Khăn lạnh)는 소액의 요금이 추가될 수 있습니다.',
      ],
    },
    en: {
      topics: ['Fresh Ingredients', 'Flavor & Quality', 'Attentive Service', 'Clear Menus'],
      praised: [
        'Well-prepared dishes made with fresh ingredients that suit both local and international palates.',
        'Inviting dining atmosphere convenient for meals before or after Sunset Town walks and evening shows.',
        'Clear menus with photos and English descriptions make ordering straightforward.',
      ],
      goodToKnow: [
        'Sunset hours (18:00–19:30) and post-show periods can be busy; arriving slightly early is recommended.',
        'Packaged wet towels on tables may carry a small customary charge at local restaurants.',
      ],
    },
    zh: {
      topics: ['食材新鲜', '菜品口味', '服务周到', '菜单清晰'],
      praised: [
        '食材新鲜，菜品口味兼顾当地特色与国际游客的饮食习惯。',
        '用餐环境舒适，适合在游览日落小镇或观看演出前后就餐。',
        '菜单配有图片及英文说明，服务人员态度友好，点餐方便。',
      ],
      goodToKnow: [
        '日落时段（18:00–19:30）及演出结束后客流较多，建议错峰或提前前往。',
        '部分越南餐厅桌上提供的湿纸巾（Khăn lạnh）可能会按惯例收取小额费用。',
      ],
    },
    ja: {
      topics: ['新鮮な食材', '料理の味と質', '丁寧な接客', '分かりやすいメニュー'],
      praised: [
        '新鮮な食材を使った料理の味わいと品質が訪問者から好評を得ています。',
        'サンセットタウンの散策や夜のショーの前後に立ち寄りやすい雰囲気です。',
        '写真や英語表記付きのメニューがあり、スタッフの対応も丁寧で注文しやすい環境です。',
      ],
      goodToKnow: [
        '日没の時間帯（18:00～19:30）やショー終了後は混雑する場合があるため、早めの来店がおすすめです。',
        'ベトナムの飲食店では、卓上のウェットティッシュ（Khăn lạnh）に少額の料金がかかる場合があります。',
      ],
    },
    ru: {
      topics: ['Свежие ингредиенты', 'Вкус и качество блюд', 'Внимательное обслуживание', 'Понятное меню'],
      praised: [
        'Свежие продукты и сбалансированный вкус блюд, подходящий как местным жителям, так и туристам.',
        'Приятная атмосфера для обеда или ужина во время прогулки по Сансет-Тауну.',
        'Меню с фотографиями и названиями на английском языке облегчает выбор блюд.',
      ],
      goodToKnow: [
        'В часы заката (18:00–19:30) и после вечерних шоу бывает много гостей; лучше приходить немного заранее.',
        'Влажные салфетки на столах во вьетнамских кафе могут включаться в счёт за небольшую плату.',
      ],
    },
    hi: {
      topics: ['ताज़ी सामग्री', 'भोजन का स्वाद', 'सहयोगी सेवा', 'स्पष्ट मेन्यू'],
      praised: [
        'ताज़ी सामग्री से बने स्वादिष्ट व्यंजन, जो अंतरराष्ट्रीय और स्थानीय दोनों तरह के मेहमानों को पसंद आते हैं।',
        'सनसेट टाउन की सैर या शाम के शो से पहले और बाद में भोजन के लिए उपयुक्त वातावरण।',
        'फ़ोटो और अंग्रेज़ी विवरण वाले मेन्यू से ऑर्डर करना आसान होता है।',
      ],
      goodToKnow: [
        'सूर्यास्त के समय (18:00–19:30) और शो के बाद भीड़ हो सकती है, इसलिए थोड़ा पहले पहुँचना बेहतर है।',
        'स्थानीय रेस्तराँ में मेज़ पर रखे पैक किए हुए वेट वाइप्स के लिए मामूली शुल्क लिया जा सकता है।',
      ],
    },
    vi: {
      topics: ['Nguyên liệu tươi ngon', 'Hương vị hài hòa', 'Phục vụ nhiệt tình', 'Thực đơn rõ ràng'],
      praised: [
        'Món ăn chế biến từ nguyên liệu tươi, hương vị vừa miệng cả du khách trong nước và quốc tế.',
        'Không gian thuận tiện để dùng bữa trước hoặc sau khi dạo phố và xem biểu diễn buổi tối.',
        'Thực đơn có hình ảnh minh họa rõ ràng, nhân viên hỗ trợ chu đáo.',
      ],
      goodToKnow: [
        'Khung giờ hoàng hôn (18:00–19:30) và sau giờ diễn show thường đông khách.',
        'Khăn lạnh trên bàn tại một số quán có thể tính phí nhỏ theo thông lệ.',
      ],
    },
  },
  cafe: {
    ko: {
      topics: ['음료·디저트 맛', '시원한 휴식 공간', '포토 스폿', '산책 중 들르기 좋은 위치'],
      praised: [
        '베트남 커피와 열대과일 음료, 수제 디저트 메뉴의 맛과 구성이 호평받습니다.',
        '선셋타운 도보 여행 중 더위를 식히며 쉬어가기 좋은 쾌적한 좌석을 갖추고 있습니다.',
        '매장 인테리어와 주변 거리 풍경이 어우러져 사진 촬영과 휴식에 좋습니다.',
      ],
      goodToKnow: [
        '베트남 전통 연유 커피는 단맛이 강할 수 있으니 덜 달게 드시려면 주문 시 미리 요청하세요.',
        '일몰 전후 시간대에는 창가나 테라스 좌석이 빠르게 찰 수 있습니다.',
      ],
    },
    en: {
      topics: ['Drinks & Desserts', 'Comfortable Seating', 'Photo Spots', 'Convenient Location'],
      praised: [
        'Well-crafted Vietnamese coffees, tropical fruit drinks, and desserts receive positive feedback.',
        'Provides a comfortable spot to cool down and recharge while exploring Sunset Town on foot.',
        'Pleasant interior design and street views suited for relaxing and taking photos.',
      ],
      goodToKnow: [
        'Traditional Vietnamese condensed milk coffee is quite sweet; ask for less sugar ("ít đường") if preferred.',
        'Window and terrace seats fill up quickly around sunset hours.',
      ],
    },
    zh: {
      topics: ['饮品与甜点口味', '舒适休息空间', '拍照打卡点', '位置便利'],
      praised: [
        '越南特色咖啡、热带鲜果饮品及甜点出品稳定，受到游客好评。',
        '适合在步行游览日落小镇途中歇脚乘凉、补充体力。',
        '店内装潢与周边街景相映成趣，适合休息与拍照留念。',
      ],
      goodToKnow: [
        '越南传统炼乳咖啡甜度较高，如偏爱少甜可在点单时说明“少糖（ít đường）”。',
        '临近日落时段，靠窗及露台座位通常较为抢手。',
      ],
    },
    ja: {
      topics: ['ドリンク・デザートの味', '快適な休憩スペース', 'フォトスポット', '立ち寄りやすい立地'],
      praised: [
        'ベトナムコーヒーやトロピカルフルーツドリンク、デザートの味わいが好評です。',
        'サンセットタウンの散策途中に涼みながら休憩できる快適な席が用意されています。',
        '店内の雰囲気や通りの景色が良く、写真撮影やカフェタイムに適しています。',
      ],
      goodToKnow: [
        'ベトナムの伝統的な練乳コーヒーは甘めのため、控えめが好みの方は注文時に「少なめ（ít đường）」と伝えるのがおすすめです。',
        '夕暮れ時は窓際やテラス席が早めに埋まることがあります。',
      ],
    },
    ru: {
      topics: ['Напитки и десерты', 'Уютное место для отдыха', 'Фотогеничный интерьер', 'Удобное расположение'],
      praised: [
        'Посетители хвалят вкус вьетнамского кофе, напитков из тропических фруктов и десертов.',
        'Удобное место, чтобы отдохнуть в прохладе во время пешей прогулки по Сансет-Тауну.',
        'Приятный интерьер и виды на улочки подходят для отдыха и красивых фотографий.',
      ],
      goodToKnow: [
        'Традиционный вьетнамский кофе со сгущённым молоком довольно сладкий; при желании попросите меньше сахара («ít đường»).',
        'Столики у окна и на террасе быстро занимают ближе к закату.',
      ],
    },
    hi: {
      topics: ['पेय और मिठाइयाँ', 'आरामदायक बैठने की जगह', 'फ़ोटो स्पॉट', 'सुविधाजनक स्थान'],
      praised: [
        'वियतनामी कॉफ़ी, ताज़े ट्रॉपिकल फलों के पेय और डेज़र्ट को आगंतुकों से अच्छी प्रतिक्रिया मिलती है।',
        'सनसेट टाउन में पैदल घूमते समय आराम करने और ताज़गी पाने के लिए उपयुक्त स्थान।',
        'आकर्षक इंटीरियर और आसपास का दृश्य फ़ोटो लेने और समय बिताने के लिए अच्छा है।',
      ],
      goodToKnow: [
        'पारंपरिक वियतनामी कंडेंस्ड मिल्क कॉफ़ी काफ़ी मीठी होती है; कम मीठा पसंद हो तो ऑर्डर करते समय बताएँ।',
        'सूर्यास्त के आसपास खिड़की और टेरेस की सीटें जल्दी भर सकती हैं।',
      ],
    },
    vi: {
      topics: ['Đồ uống & tráng miệng', 'Không gian nghỉ chân', 'Góc chụp ảnh đẹp', 'Vị trí thuận tiện'],
      praised: [
        'Cà phê Việt Nam, đồ uống trái cây nhiệt đới và món tráng miệng được đánh giá tốt.',
        'Không gian thoáng mát, thích hợp để nghỉ chân khi dạo bộ quanh Thị trấn Hoàng Hôn.',
        'Bài trí đẹp mắt, hài hòa với cảnh phố xung quanh, thuận tiện chụp ảnh lưu niệm.',
      ],
      goodToKnow: [
        'Cà phê sữa truyền thống khá ngọt; bạn có thể dặn "ít đường" hoặc "ít sữa" theo khẩu vị.',
        'Các bàn gần cửa sổ hoặc ngoài trời thường nhanh kín chỗ vào khung giờ hoàng hôn.',
      ],
    },
  },
  shopping: {
    ko: {
      topics: ['위치 접근성', '다양한 품목 구성', '편리한 결제', '친절한 안내'],
      praised: [
        '여행 중 필요한 생필품, 음료, 간식, 기념품 등을 한곳에서 편리하게 구매할 수 있습니다.',
        '선셋타운 주요 동선 및 숙소 인접 구역에 위치해 도보 접근성이 좋습니다.',
        '현금 외에도 카드 결제나 QR 결제를 지원하는 곳이 많아 이용이 편리합니다.',
      ],
      goodToKnow: [
        '신선 과일이나 인기 베이커리·기념품 품목은 늦은 저녁에 품절될 수 있습니다.',
        '액체류 특산품(피시소스 등)은 항공 수하물 규정을 확인하고 완충 포장을 요청하세요.',
      ],
    },
    en: {
      topics: ['Central Location', 'Wide Selection', 'Easy Payment', 'Helpful Staff'],
      praised: [
        'Convenient stop for daily travel essentials, cold drinks, snacks, and local souvenirs.',
        'Well located along main walking routes and hotel areas in Sunset Town.',
        'Many shops support card or QR payments in addition to cash.',
      ],
      goodToKnow: [
        'Fresh cut fruit and popular items may sell out late in the evening.',
        'For bottled liquids such as fish sauce, check airline baggage rules and ask for protective wrapping.',
      ],
    },
    zh: {
      topics: ['位置便利', '商品种类丰富', '支付便捷', '服务友好'],
      praised: [
        '方便一站式购买旅途所需的日常用品、冷饮、零食及当地纪念品。',
        '位于日落小镇主要步行路线及酒店聚集区附近，步行可达。',
        '除现金外，多数店铺支持银行卡或二维码支付。',
      ],
      goodToKnow: [
        '鲜切水果或热门商品在深夜时段可能会售罄。',
        '购买鱼露等液体特产时，请留意航空公司托运规定并要求妥善包装。',
      ],
    },
    ja: {
      topics: ['便利な立地', '豊富な品揃え', 'スムーズな決済', '丁寧な案内'],
      praised: [
        '滞在中に必要な日用品、冷たい飲み物、軽食、お土産などをまとめて購入できます。',
        'サンセットタウンの主要な散策ルートやホテル周辺にあり、徒歩で立ち寄りやすい立地です。',
        '現金のほか、カード決済やQR決済に対応している店舗が多く便利です。',
      ],
      goodToKnow: [
        'カットフルーツや人気商品は夜遅い時間帯に売り切れる場合があります。',
        'ヌクマム（魚醤）などの液体類を購入する際は、航空会社の手荷物規定を確認し、緩衝材での梱包を依頼してください。',
      ],
    },
    ru: {
      topics: ['Удобное расположение', 'Широкий выбор', 'Удобная оплата', 'Приветливый персонал'],
      praised: [
        'Удобное место для покупки товаров первой необходимости, прохладительных напитков, закусок и сувениров.',
        'Расположено рядом с основными прогулочными маршрутами и отелями Сансет-Тауна.',
        'Во многих магазинах помимо наличных принимают оплату картами или по QR-коду.',
      ],
      goodToKnow: [
        'Свежие нарезанные фрукты и популярные товары могут заканчиваться поздно вечером.',
        'При покупке жидкостей в бутылках (например, рыбного соуса) уточните правила провоза багажа в самолёте и попросите защитную упаковку.',
      ],
    },
    hi: {
      topics: ['सुविधाजनक स्थान', 'विविध उत्पाद', 'आसान भुगतान', 'सहयोगी स्टाफ़'],
      praised: [
        'यात्रा के दौरान ज़रूरी सामान, ठंडे पेय, स्नैक्स और स्मृति-चिह्न खरीदने के लिए सुविधाजनक स्थान।',
        'सनसेट टाउन के मुख्य पैदल मार्गों और होटलों के पास स्थित।',
        'नकद के अलावा कई दुकानों में कार्ड या QR भुगतान की सुविधा उपलब्ध है।',
      ],
      goodToKnow: [
        'ताज़े कटे फल और लोकप्रिय सामान देर शाम तक समाप्त हो सकते हैं।',
        'फ़िश सॉस जैसे तरल पदार्थ खरीदते समय एयरलाइन के बैगेज नियमों की जाँच करें और सुरक्षित पैकिंग करवाएँ।',
      ],
    },
    vi: {
      topics: ['Vị trí thuận tiện', 'Hàng hóa đa dạng', 'Thanh toán linh hoạt', 'Nhân viên nhiệt tình'],
      praised: [
        'Thuận tiện mua sắm đồ dùng thiết yếu, nước giải khát, đồ ăn nhẹ và quà lưu niệm.',
        'Nằm gần các trục đường đi bộ chính và khu khách sạn tại Thị trấn Hoàng Hôn.',
        'Hỗ trợ thanh toán tiền mặt, thẻ hoặc chuyển khoản QR tiện lợi.',
      ],
      goodToKnow: [
        'Trái cây tươi cắt sẵn hoặc các mặt hàng bán chạy có thể hết sớm vào cuối buổi tối.',
        'Với các sản phẩm dạng lỏng như nước mắm, nên kiểm tra quy định hành lý ký gửi và nhờ bọc chống sốc.',
      ],
    },
  },
}

function getCategoryKey(business: any): 'wellness' | 'hotels' | 'dining' | 'cafe' | 'shopping' {
  const cat = (business.category || '').toLowerCase()
  const subcat = (business.subcategory || '').toLowerCase()
  const name = `${business.public_name || ''} ${business.google_maps_name || ''}`.toLowerCase()
  const fullText = `${name} ${cat} ${subcat}`.toLowerCase()

  if (cat === 'wellness' || subcat.includes('spa') || fullText.includes('massage') || fullText.includes('마사지')) {
    return 'wellness'
  }
  if (cat === 'hotels' || subcat.includes('hotel') || subcat.includes('residence') || fullText.includes('호텔')) {
    return 'hotels'
  }
  if (cat === 'cafe' || cat === 'bars' || fullText.includes('coffee') || fullText.includes('yogurt') || fullText.includes('bar')) {
    return 'cafe'
  }
  if (cat === 'dining' || cat === 'food' || fullText.includes('restaurant') || fullText.includes('해산물')) {
    return 'dining'
  }
  return 'shopping'
}

function formatBadge(score: number | null, locale: Locale): string {
  const lang = BADGE_TPL.exceptional[locale] ? locale : 'en'
  if (score && score >= 4.7) {
    return BADGE_TPL.exceptional[lang].replace('{score}', score.toFixed(1))
  }
  if (score && score >= 4.3) {
    return BADGE_TPL.veryGood[lang].replace('{score}', score.toFixed(1))
  }
  if (score) {
    return BADGE_TPL.verified[lang].replace('{score}', score.toFixed(1))
  }
  return BADGE_TPL.collecting[lang]
}

const hasHangul = (s: string) => /[가-힣]/.test(s)

export function analyzeGoogleReviews(business: any, locale: Locale = 'ko'): BusinessReviewAnalysis | null {
  if (!business) return null

  const cat = (business.category || '').toLowerCase()
  const subcat = (business.subcategory || '').toLowerCase()

  // essentials·banking(ATM·약국·병원·환전·세탁)은 기본 영업정보 위주 안내
  const isExcluded =
    cat === 'essentials' ||
    cat === 'banking' ||
    ['atm', 'pharmacy', 'clinic', 'hospital', 'currency_exchange', 'laundry'].includes(subcat)

  if (isExcluded) {
    return null
  }

  const rating = business.google_rating ? Number(business.google_rating) : null
  const reviewCount = business.google_review_count ? Number(business.google_review_count) : null
  const isKo = locale === 'ko'
  const catKey = getCategoryKey(business)
  const pack = CATEGORY_PACKS[catKey][locale] || CATEGORY_PACKS[catKey].en

  // 구글맵 실측 리뷰 분석 데이터(google_review_analysis)가 등록된 업체만 표시 (미확보·데이터 부족 시 비노출)
  const realAnalysis = business.google_review_analysis
  if (!realAnalysis || typeof realAnalysis !== 'object') {
    return null
  }

  const rScore = realAnalysis.rating ? Number(realAnalysis.rating) : rating
  const rCount = realAnalysis.reviewCount !== undefined ? Number(realAnalysis.reviewCount) : reviewCount
  if (!rScore || !rCount || rCount < 5) {
    return null
  }

  const rBadge = formatBadge(rScore, locale)
  const goodSource = realAnalysis.goodToKnow || realAnalysis.considerations || {}

  // Localize topics: on ko use realAnalysis.topics, on non-ko use localized topics if available
  const rawTopics: string[] = Array.isArray(realAnalysis.topics) ? realAnalysis.topics : []
  const cleanNonKoTopics = rawTopics.filter((t) => !hasHangul(String(t)))
  const localizedTopics: string[] = isKo
    ? rawTopics
    : Array.isArray(realAnalysis.topics_by_locale?.[locale])
    ? realAnalysis.topics_by_locale[locale]
    : Array.isArray(realAnalysis.topics_by_locale?.en)
    ? realAnalysis.topics_by_locale.en
    : cleanNonKoTopics

  const topicSummaryStr = localizedTopics
    .slice(0, 3)
    .map((t: string) => String(t).replace(/\s*\(\d+\)\s*$/, ''))
    .join(', ')

  let praisedList: string[] = []
  let goodToKnowList: string[] = []
  let sentimentStr = ''

  if (isKo) {
    praisedList = Array.isArray(realAnalysis.praised?.ko) ? realAnalysis.praised.ko : []
    goodToKnowList = Array.isArray(goodSource?.ko) ? goodSource.ko : []
    sentimentStr =
      typeof realAnalysis.sentimentSummary?.ko === 'string' && realAnalysis.sentimentSummary.ko
        ? realAnalysis.sentimentSummary.ko
        : topicSummaryStr
        ? REAL_TPL.sentimentSummary.ko
            .replace('{count}', rCount.toLocaleString())
            .replace('{score}', rScore.toFixed(1))
            .replace('{topics}', topicSummaryStr)
        : REAL_TPL.praisedRating.ko
            .replace('{count}', rCount.toLocaleString())
            .replace('{score}', rScore.toFixed(1))
  } else if ((locale === 'en' || locale === 'vi') && realAnalysis.praised?.[locale]) {
    const candidatePraised: string[] = Array.isArray(realAnalysis.praised[locale])
      ? realAnalysis.praised[locale].filter((s: string) => !hasHangul(String(s)))
      : []
    const candidateGood: string[] = Array.isArray(goodSource?.[locale])
      ? goodSource[locale].filter((s: string) => !hasHangul(String(s)))
      : []
    const candidateSummary: string =
      typeof realAnalysis.sentimentSummary?.[locale] === 'string' &&
      !hasHangul(realAnalysis.sentimentSummary[locale])
        ? realAnalysis.sentimentSummary[locale]
        : ''

    const tplLang = REAL_TPL.sentimentSummary[locale] ? locale : 'en'
    praisedList =
      candidatePraised.length > 0
        ? candidatePraised
        : [
            REAL_TPL.praisedRating[tplLang]
              .replace('{count}', rCount.toLocaleString())
              .replace('{score}', rScore.toFixed(1)),
            ...(topicSummaryStr
              ? [REAL_TPL.praisedTopic[tplLang].replace('{topics}', topicSummaryStr)]
              : []),
          ]
    goodToKnowList = candidateGood
    sentimentStr =
      candidateSummary ||
      (topicSummaryStr
        ? REAL_TPL.sentimentSummary[tplLang]
            .replace('{count}', rCount.toLocaleString())
            .replace('{score}', rScore.toFixed(1))
            .replace('{topics}', topicSummaryStr)
        : REAL_TPL.praisedRating[tplLang]
            .replace('{count}', rCount.toLocaleString())
            .replace('{score}', rScore.toFixed(1)))
  } else {
    const tplLang = (REAL_TPL.sentimentSummary as Record<string, string>)[locale] ? locale : 'en'
    const candidateLocalePraised: string[] = Array.isArray(realAnalysis.praised?.[locale])
      ? realAnalysis.praised[locale].filter((s: string) => !hasHangul(String(s)))
      : []
    const candidateLocaleGood: string[] = Array.isArray(goodSource?.[locale])
      ? goodSource[locale].filter((s: string) => !hasHangul(String(s)))
      : Array.isArray(goodSource?.en)
      ? goodSource.en.filter((s: string) => !hasHangul(String(s)))
      : []

    praisedList =
      candidateLocalePraised.length > 0
        ? candidateLocalePraised
        : [
            (REAL_TPL.praisedRating as Record<string, string>)[tplLang]
              .replace('{count}', rCount.toLocaleString())
              .replace('{score}', rScore.toFixed(1)),
            ...(topicSummaryStr
              ? [(REAL_TPL.praisedTopic as Record<string, string>)[tplLang].replace('{topics}', topicSummaryStr)]
              : []),
          ]

    goodToKnowList = candidateLocaleGood

    sentimentStr = topicSummaryStr
      ? (REAL_TPL.sentimentSummary as Record<string, string>)[tplLang]
          .replace('{count}', rCount.toLocaleString())
          .replace('{score}', rScore.toFixed(1))
          .replace('{topics}', topicSummaryStr)
      : (REAL_TPL.praisedRating as Record<string, string>)[tplLang]
          .replace('{count}', rCount.toLocaleString())
          .replace('{score}', rScore.toFixed(1))
  }

  if (praisedList.length === 0) {
    return null
  }

  const rawSamples: string[] = Array.isArray(realAnalysis.sampleReviews) ? realAnalysis.sampleReviews : []
  const sampleReviews = isKo ? rawSamples : rawSamples.filter((s) => !hasHangul(String(s)))

  return {
    rating: rScore,
    reviewCount: rCount,
    ratingBadge: rBadge,
    topics: localizedTopics,
    praised: praisedList,
    goodToKnow: goodToKnowList,
    sentimentSummary: sentimentStr,
    lastVerified: business.rating_check_date || realAnalysis.lastVerified || realAnalysis.analyzedAt || '2026-11-01',
    sampleReviews,
  }
}
