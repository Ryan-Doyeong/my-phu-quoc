/**
 * My Phu Quoc 7개 언어(EN · VI · HI · ZH · RU · KO · JA) UI 사전 및 용어집 매핑
 * - 언어별 UI 사전: ./locales/*.ts (영어가 기준, 빠진 키는 영어로 자동 대체)
 * @status DRAFT — vi·ko 는 기존 초안, hi·zh·ru·ja 는 "AI 검수 완료 / 원어민 미확인"
 */

import type { Locale } from './config'
import type { Dictionary, DictionaryInput } from './dictionaryTypes'
import { en } from './locales/en'
import { vi } from './locales/vi'
import { hi } from './locales/hi'
import { zh } from './locales/zh'
import { ru } from './locales/ru'
import { ko } from './locales/ko'
import { ja } from './locales/ja'

export type { Dictionary } from './dictionaryTypes'

/** 영어 이외 언어별 번역 문자열 (없는 언어는 영어 원문으로 대체) */
export type LocalizedText = Partial<Record<Exclude<Locale, 'en'>, string>>

// 1. 에디토리얼 배지 및 사진 출처 배지 번역
const BADGE_MAP: Record<string, LocalizedText> = {
  recommended: { vi: 'Đề xuất', hi: 'अनुशंसित', zh: '推荐', ru: 'Рекомендуем', ko: '추천', ja: 'おすすめ' },
  new: { vi: 'Mới', hi: 'नया', zh: '新店', ru: 'Новое', ko: '신규', ja: '新着' },
  hot: { vi: 'HOT', hi: 'HOT', zh: '热门', ru: 'HOT', ko: '인기(HOT)', ja: '人気' },
  'my phu quoc member': {
    vi: 'Thành viên My Phu Quoc',
    hi: 'My Phu Quoc सदस्य',
    zh: 'My Phu Quoc 会员',
    ru: 'Участник My Phu Quoc',
    ko: '마이 푸꾸옥 멤버',
    ja: 'My Phu Quoc メンバー',
  },
  'nearby (an thoi)': {
    vi: 'Lân cận (An Thới)',
    hi: 'आसपास (आन थोई)',
    zh: '周边（安泰）',
    ru: 'Рядом (Ан Тхой)',
    ko: '인접 지역 (안터이)',
    ja: '周辺エリア（アントイ）',
  },
}

export function translateBadge(badge: string, locale: Locale = 'en'): string {
  if (locale === 'en') return badge
  const key = badge.trim().toLowerCase()
  return BADGE_MAP[key]?.[locale] || badge
}

const PHOTO_BADGES: Record<'illustration' | 'official' | 'representative', { en: string } & LocalizedText> = {
  illustration: {
    en: 'Representative illustration',
    vi: 'Hình minh họa đại diện',
    hi: 'प्रतिनिधि चित्रण',
    zh: '示意插图',
    ru: 'Иллюстрация',
    ko: '대표 일러스트 이미지',
    ja: 'イメージイラスト',
  },
  official: {
    en: 'Photo: official website',
    vi: 'Ảnh: website chính thức',
    hi: 'फ़ोटो: आधिकारिक वेबसाइट',
    zh: '图片来源：官方网站',
    ru: 'Фото: официальный сайт',
    ko: '사진 출처: 공식 웹사이트',
    ja: '写真：公式サイト',
  },
  representative: {
    en: 'Representative photo',
    vi: 'Ảnh đại diện',
    hi: 'प्रतिनिधि फ़ोटो',
    zh: '示意图片',
    ru: 'Иллюстративное фото',
    ko: '대표 참고 이미지',
    ja: 'イメージ写真',
  },
}

function pickBadge(kind: keyof typeof PHOTO_BADGES, locale: Locale): string {
  const entry = PHOTO_BADGES[kind]
  if (locale === 'en') return entry.en
  return entry[locale] || entry.en
}

export function getPhotoBadgeText(mediaNote: string | null, locale: Locale = 'en', img?: string | null): string | null {
  const isIllustrative =
    (mediaNote && /illustrat/i.test(mediaNote)) ||
    (img && (img.includes('/beauty__') || img.includes('/services__') || img.includes('/market__')))
  if (isIllustrative) return pickBadge('illustration', locale)
  if (mediaNote?.startsWith('Image source:')) return pickBadge('official', locale)
  if (!mediaNote) return null
  return pickBadge('representative', locale)
}

// 2. 서브카테고리·태그·짧은 특징(highlights)·리뷰 토픽(topics)·편의시설(amenities) 용어집 사전
// (지시서 확정 2번: 짧고 반복되는 highlights·태그는 용어집 사전으로 가능한 만큼 3개 언어 표시)
const TERM_GLOSSARY: Record<string, LocalizedText> = {
  // Common UI filter
  all: { vi: 'Tất cả', ko: '전체' },
  other: { vi: 'Khác', ko: '기타' },
  general: { vi: 'Chung', ko: '일반' },

  // Subcategories & Tags (8 Categories)
  'wellness center': { vi: 'Trung tâm chăm sóc sức khỏe', ko: '웰니스 센터' },
  massage: { vi: 'Massage', ko: '마사지' },
  spa: { vi: 'Spa', ko: '스파' },
  therapy: { vi: 'Trị liệu', ko: '테라피' },
  recovery: { vi: 'Phục hồi', ko: '리커버리' },
  'sauna & ice bath': { vi: 'Xông hơi & Tắm đá', ko: '사우나 · 아이스배스' },
  sauna: { vi: 'Xông hơi (Sauna)', ko: '사우나' },
  clinic: { vi: 'Phòng khám', ko: '클리닉' },
  'clinic & spa': { vi: 'Phòng khám & Spa', ko: '클리닉 & 스파' },
  'beauty & skin': { vi: 'Chăm sóc da', ko: '피부 · 에스테틱' },
  'skin care': { vi: 'Chăm sóc da', ko: '스킨케어' },
  'skin care & massage': { vi: 'Chăm sóc da & Massage', ko: '스킨케어 & 마사지' },
  'massage & recovery': { vi: 'Massage & Phục hồi', ko: '마사지 & 리커버리' },
  'spa & sauna': { vi: 'Spa & Xông hơi', ko: '스파 & 사우나' },
  'wellness spa': { vi: 'Wellness Spa', ko: '웰니스 스파' },
  'beauty & spa': { vi: 'Làm đẹp & Spa', ko: '뷰티 & 스파' },
  'beauty & therapy': { vi: 'Làm đẹp & Trị liệu', ko: '뷰티 & 테라피' },
  waxing: { vi: 'Waxing', ko: '왁싱' },

  crossfit: { vi: 'CrossFit', ko: '크로스핏' },
  'public gym': { vi: 'Phòng gym', ko: '일반 헬스장' },
  gym: { vi: 'Phòng gym', ko: '헬스장' },
  fitness: { vi: 'Thể hình (Fitness)', ko: '피트니스' },
  'pt gym': { vi: 'Tập cùng PT', ko: 'PT 전문 짐' },
  'circuit training': { vi: 'Tập mạch (Circuit)', ko: '서킷 트레이닝' },
  'functional training': { vi: 'Tập chức năng', ko: '펑셔널 트레이닝' },
  yoga: { vi: 'Yoga', ko: '요가' },
  'yoga & wellness': { vi: 'Yoga & Chăm sóc sức khỏe', ko: '요가 & 웰니스' },
  'gym & yoga': { vi: 'Gym & Yoga', ko: '짐 & 요가' },
  pilates: { vi: 'Pilates', ko: '필라테스' },
  'boxing fitness': { vi: 'Boxing thể hình', ko: '복싱 피트니스' },
  'dance & movement': { vi: 'Nhảy & Chuyển động', ko: '댄스 · 무브먼트' },
  'sports stretching': { vi: 'Giãn cơ thể thao', ko: '스포츠 스트레칭' },
  strength: { vi: 'Tập sức mạnh', ko: '스트렝스(근력)' },

  korean: { vi: 'Món Hàn', ko: '한식' },
  japanese: { vi: 'Món Nhật', ko: '일식' },
  chinese: { vi: 'Món Hoa', ko: '중식' },
  vietnamese: { vi: 'Món Việt', ko: '베트남 음식' },
  'vietnamese food': { vi: 'Món Việt', ko: '베트남 음식' },
  thai: { vi: 'Món Thái', ko: '태국 음식' },
  italian: { vi: 'Món Ý', ko: '이탈리안' },
  western: { vi: 'Món Âu', ko: '양식' },
  asian: { vi: 'Món Á', ko: '아시안 요리' },
  indian: { vi: 'Món Ấn', ko: '인도 요리' },
  vegetarian: { vi: 'Món chay', ko: '채식 · 비건' },
  'salad bar': { vi: 'Quầy salad', ko: '샐러드바' },
  'healthy restaurant': { vi: 'Nhà hàng lành mạnh', ko: '건강식 레스토랑' },
  'healthy food': { vi: 'Đồ ăn lành mạnh', ko: '건강식' },
  healthy: { vi: 'Lành mạnh', ko: '건강식' },
  grill: { vi: 'Đồ nướng (Grill)', ko: '그릴 · 바비큐' },
  pizza: { vi: 'Pizza', ko: '피자' },
  restaurant: { vi: 'Nhà hàng', ko: '레스토랑' },

  cafe: { vi: 'Quán cà phê', ko: '카페' },
  'specialty coffee': { vi: 'Cà phê đặc sản (Specialty)', ko: '스페셜티 커피' },
  'brunch cafe': { vi: 'Cà phê Brunch', ko: '브런치 카페' },
  brunch: { vi: 'Brunch', ko: '브런치' },
  'bakery cafe': { vi: 'Tiệm bánh & Cà phê', ko: '베이커리 카페' },
  'bakery & cafe': { vi: 'Tiệm bánh & Cà phê', ko: '베이커리 & 카페' },
  bakery: { vi: 'Tiệm bánh', ko: '베이커리' },
  'dessert cafe': { vi: 'Tiệm tráng miệng', ko: '디저트 카페' },
  'cafe & dessert': { vi: 'Cà phê & Tráng miệng', ko: '카페 & 디저트' },
  dessert: { vi: 'Tráng miệng', ko: '디저트' },
  'pet cafe': { vi: 'Cà phê thú cưng', ko: '애견·펫 카페' },
  'cafe & lounge': { vi: 'Cà phê & Lounge', ko: '카페 & 라운지' },
  'cafe & bistro': { vi: 'Cà phê & Bistro', ko: '카페 & 비스트로' },

  tennis: { vi: 'Quần vợt (Tennis)', ko: '테니스' },
  golf: { vi: 'Golf', ko: '골프' },
  'art & craft': { vi: 'Nghệ thuật & Thủ công', ko: '공방 · 아트' },
  music: { vi: 'Âm nhạc', ko: '음악' },
  dance: { vi: 'Nhảy múa', ko: '댄스' },
  'kids activities': { vi: 'Hoạt động cho bé', ko: '키즈 활동' },
  'clubs & community': { vi: 'Câu lạc bộ & Cộng đồng', ko: '동호회 · 커뮤니티' },
  'other hobbies': { vi: 'Sở thích khác', ko: '기타 취미' },

  'nail salon': { vi: 'Tiệm nail', ko: '네일샵' },
  'hair salon': { vi: 'Salon tóc', ko: '헤어살롱 · 미용실' },
  barber: { vi: 'Tiệm cắt tóc nam (Barber)', ko: '바버샵' },
  'lash & brow': { vi: 'Nối mi & Chân mày', ko: '속눈썹 · 브로우' },
  beauty: { vi: 'Làm đẹp', ko: '뷰티' },

  laundry: { vi: 'Giặt ủi', ko: '세탁소 (런드리)' },
  'ac cleaning & repair': { vi: 'Vệ sinh & Sửa máy lạnh', ko: '에어컨 청소 · 수리' },
  cleaning: { vi: 'Dọn dẹp nhà cửa', ko: '가사 · 홈클리닝' },
  'repair & handyman': { vi: 'Sửa chữa nhà cửa', ko: '집수리 · 핸디맨' },

  supermarket: { vi: 'Siêu thị', ko: '슈퍼마켓' },
  grocery: { vi: 'Cửa hàng thực phẩm', ko: '식료품점 · 그로서리' },
  'convenience store': { vi: 'Cửa hàng tiện lợi', ko: '편의점' },
  'fresh market': { vi: 'Chợ tươi sống', ko: '재래시장 · 신선장터' },

  // Common Short Highlights & Services
  'small class format': { vi: 'Lớp học quy mô nhỏ', ko: '소규모 클래스 운영' },
  'small classes': { vi: 'Lớp học quy mô nhỏ', ko: '소규모 클래스' },
  'small group': { vi: 'Nhóm nhỏ', ko: '소그룹 수업' },
  'english-friendly coaching': { vi: 'Huấn luyện viên giao tiếp tiếng Anh', ko: '영어 소통 가능 코칭' },
  'english-friendly instruction': { vi: 'Hướng dẫn bằng tiếng Anh', ko: '영어 수업 지원' },
  'beginner onboarding': { vi: 'Hướng dẫn cho người mới bắt đầu', ko: '초보자 입문 안내' },
  'beginner introduction': { vi: 'Giới thiệu cho người mới', ko: '초보자 입문 과정' },
  'beginner friendly': { vi: 'Thân thiện với người mới', ko: '초보자 환영' },
  'morning and evening sessions': { vi: 'Có lớp sáng và tối', ko: '오전·저녁 클래스 운영' },
  'quiet studio setting': { vi: 'Không gian studio yên tĩnh', ko: '조용한 스튜디오 환경' },
  'reformer': { vi: 'Máy Reformer', ko: '리포머 기구' },
  'private sessions': { vi: 'Buổi tập riêng (1:1)', ko: '1:1 프라이빗 세션' },
  'active-lifestyle focus': { vi: 'Tập trung lối sống năng động', ko: '활동적인 라이프스타일 맞춤' },
  'private treatment space': { vi: 'Không gian trị liệu riêng tư', ko: '프라이빗 시술 공간' },
  'appointment based': { vi: 'Theo lịch hẹn trước', ko: '예약제 운영' },
  'short recovery sessions available': { vi: 'Có gói phục hồi ngắn', ko: '단시간 리커버리 세션 가능' },
  'outdoor seating': { vi: 'Chỗ ngồi ngoài trời', ko: '야외 좌석' },
  'good for weekend brunch': { vi: 'Phù hợp ăn brunch cuối tuần', ko: '주말 브런치 추천' },
  'family-friendly layout': { vi: 'Không gian thân thiện gia đình', ko: '가족 친화적 공간' },
  'family friendly': { vi: 'Thân thiện với gia đình', ko: '가족 동반 적합' },
  'family-friendly': { vi: 'Thân thiện với gia đình', ko: '가족 동반 적합' },
  'casual group dining': { vi: 'Phù hợp đi nhóm thân mật', ko: '모임 식사에 적합' },
  'quick breakfast': { vi: 'Bữa sáng nhanh gọn', ko: '간편한 아침 식사' },
  'lighter meal options': { vi: 'Thực đơn nhẹ bụng', ko: '가벼운 식사 메뉴' },
  'casual weekday stop': { vi: 'Điểm ghé ngày thường thoải mái', ko: '평일 편하게 들르기 좋은 곳' },
  'modern vietnamese style': { vi: 'Phong cách Việt hiện đại', ko: '모던 베트남 스타일' },
  'good for small groups': { vi: 'Phù hợp nhóm nhỏ', ko: '소모임에 적합' },
  'comfortable dining room': { vi: 'Phòng ăn thoải mái', ko: '쾌적한 식사 공간' },
  'dinner reservations accepted': { vi: 'Nhận đặt bàn bữa tối', ko: '저녁 예약 가능' },
  takeaway: { vi: 'Mang đi (Takeaway)', ko: '포장(테이크아웃) 가능' },
  breakfast: { vi: 'Bữa sáng', ko: '아침 식사' },
  dinner: { vi: 'Bữa tối', ko: '저녁 식사' },
  groups: { vi: 'Nhóm bạn', ko: '단체·모임' },
  coffee: { vi: 'Cà phê', ko: '커피' },

  // Amenities keys & values
  changing_area: { vi: 'Phòng thay đồ', ko: '탈의실' },
  'changing area': { vi: 'Phòng thay đồ', ko: '탈의실' },
  showers: { vi: 'Phòng tắm', ko: '샤워실' },
  water_refill: { vi: 'Trạm lấy nước', ko: '음수대' },
  'water refill': { vi: 'Trạm lấy nước', ko: '음수대' },
  water: { vi: 'Nước uống', ko: '생수 제공' },
  towels: { vi: 'Khăn tập/tắm', ko: '수건 제공' },
  booking: { vi: 'Đặt lịch', ko: '예약' },
  private_rooms: { vi: 'Phòng riêng', ko: '프라이빗 룸' },
  'private rooms': { vi: 'Phòng riêng', ko: '프라이빗 룸' },
  motorbike_parking: { vi: 'Chỗ đậu xe máy', ko: '오토바이 주차' },
  'motorbike parking': { vi: 'Chỗ đậu xe máy', ko: '오토바이 주차' },
  wifi: { vi: 'Wi-Fi', ko: '와이파이' },
  air_conditioning: { vi: 'Máy lạnh', ko: '에어컨 완비' },
  'air conditioning': { vi: 'Máy lạnh', ko: '에어컨 완비' },
  outdoor_seating: { vi: 'Chỗ ngồi ngoài trời', ko: '야외 좌석' },
  pet_friendly: { vi: 'Thân thiện thú cưng', ko: '반려동물 동반' },
  'pet friendly': { vi: 'Thân thiện thú cưng', ko: '반려동물 동반' },
  street_level_access: { vi: 'Lối vào tầng trệt', ko: '1층 출입 가능' },
  'street level access': { vi: 'Lối vào tầng trệt', ko: '1층 출입 가능' },
  group_tables: { vi: 'Bàn nhóm', ko: '단체석' },
  'group tables': { vi: 'Bàn nhóm', ko: '단체석' },
  card_payment: { vi: 'Thanh toán thẻ', ko: '카드 결제' },
  'card payment': { vi: 'Thanh toán thẻ', ko: '카드 결제' },
  available: { vi: 'Có sẵn', ko: '있음' },
  nearby: { vi: 'Gần đó', ko: '인근 가능' },
  yes: { vi: 'Có', ko: '가능' },
  'selected outdoor seats': { vi: 'Một số bàn ngoài trời', ko: '야외 지정석 가능' },

  // Frequent Google Review Topics (review_summary.topics)
  'enthusiastic staff': { vi: 'nhân viên nhiệt tình', ko: '친절하고 열정적인 직원' },
  'friendly staff': { vi: 'nhân viên thân thiện', ko: '친절한 직원' },
  'cute staff': { vi: 'nhân viên dễ thương', ko: '상냥한 직원' },
  'enthusiastic consultation': { vi: 'tư vấn nhiệt tình', ko: '꼼꼼한 상담' },
  'cozy space': { vi: 'không gian ấm cúng', ko: '아늑한 공간' },
  'quiet space': { vi: 'không gian yên tĩnh', ko: '조용한 분위기' },
  'spacious space': { vi: 'không gian rộng rãi', ko: '넓고 쾌적한 공간' },
  'chill space': { vi: 'không gian thư giãn', ko: '편안한(Chill) 분위기' },
  'airy space': { vi: 'không gian thoáng đãng', ko: '개방감 있는 공간' },
  'clean space': { vi: 'không gian sạch sẽ', ko: '청결한 내부' },
  'comfortable space': { vi: 'không gian thoải mái', ko: '편안한 좌석·공간' },
  'luxurious space': { vi: 'không gian sang trọng', ko: '고급스러운 인테리어' },
  'outdoor space': { vi: 'không gian ngoài trời', ko: '야외 테라스·정원' },
  'relaxing space': { vi: 'không gian thư thái', ko: '차분한 휴식 공간' },
  'relaxing atmosphere': { vi: 'bầu không khí thư giãn', ko: '편안한 분위기' },
  'happy hour': { vi: 'giờ vàng (Happy Hour)', ko: '해피아워' },
  'live music': { vi: 'nhạc sống', ko: '라이브 음악' },
  'fast serving': { vi: 'phục vụ nhanh', ko: '빠른 메뉴 제공' },
  'hair wash': { vi: 'gội đầu dưỡng sinh', ko: '샴푸·두피 마사지' },
  'foot massage': { vi: 'massage chân', ko: '발 마사지' },
  'hot stone massage': { vi: 'massage đá nóng', ko: '핫스톤 마사지' },
  'full body massage': { vi: 'massage toàn thân', ko: '전신 마사지' },
  'body massage': { vi: 'massage cơ thể', ko: '바디 마사지' },
  'acne extraction': { vi: 'lấy nhân mụn', ko: '트러블·압출 케어' },
  'hair removal': { vi: 'triệt lông / waxing', ko: '제모 · 왁싱' },
  pedicure: { vi: 'chăm sóc móng chân (Pedicure)', ko: '페디큐어' },
  'shopping mall': { vi: 'trung tâm thương mại', ko: '쇼핑몰' },
  'work friendly': { vi: 'phù hợp làm việc', ko: '노트북·작업하기 좋은 곳' },
  'matcha latte': { vi: 'matcha latte', ko: '말차 라떼' },
  matcha: { vi: 'matcha', ko: '말차' },
  tiramisu: { vi: 'bánh tiramisu', ko: '티라미수' },
  wine: { vi: 'rượu vang', ko: '와인' },
  sourdough: { vi: 'bánh mì sourdough', ko: '사워도우 브레드' },
  'smash burger': { vi: 'smash burger', ko: '스매시 버거' },
  burgers: { vi: 'burger', ko: '수제버거' },
  cheesecake: { vi: 'bánh cheesecake', ko: '치즈케이크' },
  croissants: { vi: 'bánh sừng bò (croissant)', ko: '크루아상' },
  croissant: { vi: 'bánh sừng bò (croissant)', ko: '크루아상' },
  'carrot cake': { vi: 'bánh cà rốt', ko: '당근 케이크' },
  cake: { vi: 'bánh ngọt', ko: '케이크' },
  cakes: { vi: 'bánh ngọt', ko: '케이크' },
  smoothies: { vi: 'sinh tố (smoothie)', ko: '스무디' },
  sandwiches: { vi: 'bánh mì kẹp (sandwich)', ko: '샌드위치' },
  buffet: { vi: 'buffet', ko: '뷔페' },
  'garden seating': { vi: 'chỗ ngồi sân vườn', ko: '정원 좌석' },
  garden: { vi: 'sân vườn', ko: '정원' },
  'garden cafe': { vi: 'cà phê sân vườn', ko: '정원 카페' },
  'modern equipment': { vi: 'thiết bị hiện đại', ko: '최신 운동 기구' },
  kids: { vi: 'trẻ em', ko: '어린이·키즈' },
  'kids & craft workshop': { vi: 'Workshop Thiếu nhi & Thủ công', ko: '어린이 · 공예 워크숍' },
}

export function translateTerm(term: string | null | undefined, locale: Locale = 'en'): string {
  if (!term) return ''
  if (locale === 'en') return term
  const normalized = term.trim().toLowerCase()
  const entry = TERM_GLOSSARY[normalized]
  return entry?.[locale] || term
}

// 3. 페이지별 전체 UI 사전 — 언어별 파일은 ./locales/*.ts
export const DICTIONARIES: Record<Locale, DictionaryInput> = { en, vi, hi, zh, ru, ko, ja }


function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown> | undefined) {
  const out: Record<string, unknown> = { ...base }
  if (!override) return out
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined) continue
    const b = base[k]
    out[k] = isPlainObject(b) && isPlainObject(v) ? deepMerge(b, v) : v
  }
  return out
}

const MERGED_CACHE = new Map<Locale, Dictionary>()

/** 언어별 사전 (빠진 키는 영어로 자동 대체) */
export function getDictionary(locale: Locale = 'en'): Dictionary {
  const cached = MERGED_CACHE.get(locale)
  if (cached) return cached
  const base = en as unknown as Record<string, unknown>
  const merged = (
    locale === 'en' ? en : deepMerge(base, DICTIONARIES[locale] as Record<string, unknown> | undefined)
  ) as unknown as Dictionary
  MERGED_CACHE.set(locale, merged)
  return merged
}

function hasText(v: unknown): boolean {
  return Boolean(v && String(v).trim().length > 0)
}

/** 스토리에 번역 본문(body_xx)이 있는 언어 목록 */
export function storyAvailableLocales(story: any): Locale[] {
  const out: Locale[] = ['en']
  if (!story) return out
  for (const loc of ['vi', 'hi', 'zh', 'ru', 'ko', 'ja'] as const) {
    if (hasText(story[`body_${loc}`])) out.push(loc)
  }
  return out
}

// 스토리(뉴스·이벤트·임팩트) 다국어 필드 추출 헬퍼
// - 번역본(body_xx)이 실제 존재하는지 판별하고, 없으면 영어 원문 + isUntranslatedFallback=true 반환
export function localizeStory(story: any, locale: Locale = 'en') {
  if (!story) {
    return {
      id: '',
      slug: '',
      title: '',
      subtitle: null,
      excerpt: null,
      body: '',
      seo_title: null,
      seo_description: null,
      seoTitle: null,
      seoDescription: null,
      key_points: [] as string[],
      keyPoints: [] as string[],
      callout: null,
      hero_caption: null,
      heroCaption: null,
      cover_image_url: null,
      content_type: null,
      category: null,
      published_at: null,
      updated_at: null,
      effective_date: null,
      event_date: null,
      event_location: null,
      author_name: null,
      source_name: null,
      source_url: null,
      source_published_at: null,
      gallery_urls: [] as string[],
      tags: [] as string[],
      impact_topic: null,
      is_featured: false,
      hasVi: false,
      hasKo: false,
      availableLocales: ['en'] as Locale[],
      isTranslated: true,
      isUntranslatedFallback: false,
    }
  }

  const availableLocales = storyAvailableLocales(story)
  const hasVi = availableLocales.includes('vi')
  const hasKo = availableLocales.includes('ko')

  const titleEn = story.title || ''
  const excerptEn = story.excerpt || null
  const categoryEn = story.category || null

  if (locale !== 'en' && availableLocales.includes(locale)) {
    const f = (name: string) => story[`${name}_${locale}`]
    const title = f('title') || story.title
    const subtitle = f('subtitle') || story.subtitle || null
    const excerpt = f('excerpt') || story.excerpt || null
    const body = f('body')
    const category = f('category') || translateTerm(story.category, locale) || story.category || null
    const seoTitle = f('seo_title') || f('title') || story.seo_title || story.title
    const seoDescription = f('seo_description') || f('excerpt') || story.seo_description || story.excerpt || null
    const kp = f('key_points')
    const keyPoints = Array.isArray(kp) && kp.length > 0 ? kp : Array.isArray(story.key_points) ? story.key_points : []
    const callout = f('callout') || story.callout || null
    const heroCaption = f('hero_caption') || story.hero_caption || null
    const sourceName = f('source_name') || story.source_name || null
    const eventLocation = f('event_location') || story.event_location || null
    return {
      ...story,
      title,
      title_en: titleEn,
      subtitle,
      excerpt,
      excerpt_en: excerptEn,
      body,
      category,
      category_en: categoryEn,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seoTitle,
      seoDescription,
      key_points: keyPoints,
      keyPoints,
      callout,
      hero_caption: heroCaption,
      heroCaption,
      source_name: sourceName,
      event_location: eventLocation,
      hasVi,
      hasKo,
      availableLocales,
      isTranslated: true,
      isUntranslatedFallback: false,
    }
  }

  const seoTitle = story.seo_title || story.title
  const seoDescription = story.seo_description || story.excerpt || null
  const keyPoints = Array.isArray(story.key_points) ? story.key_points : []
  const callout = story.callout || null
  const heroCaption = story.hero_caption || null

  return {
    ...story,
    title: story.title,
    title_en: titleEn,
    subtitle: story.subtitle || null,
    excerpt: story.excerpt || null,
    excerpt_en: excerptEn,
    body: story.body_en || '',
    category: story.category || null,
    category_en: categoryEn,
    seo_title: seoTitle,
    seo_description: seoDescription,
    seoTitle,
    seoDescription,
    key_points: keyPoints,
    keyPoints,
    callout,
    hero_caption: heroCaption,
    heroCaption,
    hasVi,
    hasKo,
    availableLocales,
    isTranslated: locale === 'en',
    isUntranslatedFallback: locale !== 'en',
  }
}

// 업체(Business) 소개글 선택 헬퍼
// - 자동번역 절대 없음. 업체가 직접 해당 언어 소개(description_xx)를 등록해 둔 경우에만 표시하고, 없으면 영어 원문 표시
export function selectBusinessDescription(b: any, locale: Locale = 'en'): string | null {
  if (!b) return null
  if (locale !== 'en') {
    const v = b[`description_${locale}`]
    if (hasText(v)) return String(v).trim()
  }
  return b.description_en || b.description_vi || b.description_ko || null
}
