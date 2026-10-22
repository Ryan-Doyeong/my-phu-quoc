import {STOCK_IMAGES} from '@/lib/stockImages'
import type {Locale} from '@/lib/i18n/config'

export const DIRECTORY_CATEGORIES = {
  wellness: {
    label: 'Wellness',
    label_vi: 'Chăm sóc sức khỏe',
    label_ko: '웰니스 · 스파',
    eyebrow: 'RECOVER · RESET · FEEL BETTER',
    eyebrow_vi: 'PHỤC HỒI · THƯ GIÃN · TÁI TẠO NĂNG LƯỢNG',
    eyebrow_ko: '회복 · 휴식 · 웰니스 케어',
    description: 'Massage, spa, therapy, recovery and full-service wellness centers.',
    description_vi: 'Massage, spa, trị liệu, phục hồi và trung tâm chăm sóc sức khỏe toàn diện.',
    description_ko: '마사지, 스파, 테라피, 리커버리 및 종합 웰니스 센터.',
    image: STOCK_IMAGES.wellness,
    subcategories: ['Wellness Center','Massage','Spa','Therapy','Recovery','Sauna & Ice Bath','Clinic','Beauty & Skin','Waxing'],
  },
  workout: {
    label: 'Workout',
    label_vi: 'Thể dục & Thể thao',
    label_ko: '운동 · 피트니스',
    eyebrow: 'TRAIN · MOVE · GET STRONGER',
    eyebrow_vi: 'TẬP LUYỆN · VẬN ĐỘNG · RÈN LUYỆN SỨC KHỎE',
    eyebrow_ko: '트레이닝 · 움직임 · 체력 강화',
    description: 'CrossFit, public gyms, PT gyms, circuit training, yoga, Pilates and more.',
    description_vi: 'CrossFit, phòng gym, tập cùng PT, yoga, Pilates và nhiều hơn nữa.',
    description_ko: '크로스핏, 헬스장, PT 전문 짐, 서킷 트레이닝, 요가, 필라테스 등.',
    image: STOCK_IMAGES.workout,
    subcategories: ['CrossFit','Public Gym','PT Gym','Circuit Training','Functional Training','Yoga','Pilates','Boxing Fitness','Dance & Movement'],
  },
  food: {
    label: 'Food',
    label_vi: 'Ẩm thực',
    label_ko: '맛집 · 식당',
    eyebrow: 'RESTAURANTS · CUISINES · HEALTHY EATING',
    eyebrow_vi: 'NHÀ HÀNG · ẨM THỰC · ĂN UỐNG LÀNH MẠNH',
    eyebrow_ko: '레스토랑 · 세계 요리 · 건강한 식사',
    description: 'Restaurants grouped by cuisine and dining concept.',
    description_vi: 'Các nhà hàng đa dạng theo phong cách ẩm thực và trải nghiệm dùng bữa.',
    description_ko: '국가별 요리와 다이닝 컨셉으로 정리한 지역 식당 가이드.',
    image: STOCK_IMAGES.food,
    subcategories: ['Korean','Japanese','Chinese','Vietnamese','Thai','Italian','Western','Asian','Indian','Vegetarian','Salad Bar','Healthy Restaurant','Grill','Pizza','Restaurant'],
  },
  cafe: {
    label: 'Cafe',
    label_vi: 'Cà phê & Bánh',
    label_ko: '카페 · 베이커리',
    eyebrow: 'COFFEE · BRUNCH · BAKERY',
    eyebrow_vi: 'CÀ PHÊ · BỮA LỠ · TIỆM BÁNH',
    eyebrow_ko: '커피 · 브런치 · 베이커리',
    description: 'Cafés, specialty coffee, brunch cafés, bakery cafés and dessert spots.',
    description_vi: 'Quán cà phê, specialty coffee, brunch, tiệm bánh và điểm tâm ngọt.',
    description_ko: '카페, 스페셜티 커피, 브런치 카페, 베이커리 및 디저트 명소.',
    image: STOCK_IMAGES.cafe,
    subcategories: ['Cafe','Specialty Coffee','Brunch Cafe','Bakery Cafe','Dessert Cafe','Pet Cafe'],
  },
  hobby: {
    label: 'Hobbies',
    label_vi: 'Sở thích & Lớp học',
    label_ko: '취미 · 클래스',
    eyebrow: 'PLAY · LEARN · MEET PEOPLE',
    eyebrow_vi: 'VUI CHƠI · HỌC HỎI · KẾT NỐI BẠN BÈ',
    eyebrow_ko: '여가 · 배움 · 이웃 모임',
    description: 'Local places for hobbies, classes, clubs and leisure time.',
    description_vi: 'Không gian sở thích, lớp học, câu lạc bộ và thời gian giải trí.',
    description_ko: '취미 생활, 원데이·정규 클래스, 동호회 및 여가 공간.',
    image: STOCK_IMAGES.hobby,
    subcategories: ['Tennis','Golf','Art & Craft','Music','Dance','Kids Activities','Clubs & Community','Other Hobbies'],
  },
  beauty: {
    label: 'Beauty',
    label_vi: 'Làm đẹp',
    label_ko: '뷰티 · 헤어 · 네일',
    eyebrow: 'HAIR · NAILS · BARBER · CARE',
    eyebrow_vi: 'TÓC · MÓNG · SALON · CHĂM SÓC',
    eyebrow_ko: '헤어 · 네일 · 바버샵 · 뷰티 케어',
    description: 'Nail salons, hair salons, barbershops, waxing, lash and brow studios.',
    description_vi: 'Tiệm nail, salon tóc, tiệm cắt tóc nam, waxing, nối mi và chăm sóc chân mày.',
    description_ko: '네일샵, 헤어살롱·미용실, 바버샵, 왁싱, 속눈썹·브로우 전문점.',
    // TODO: replace with dedicated beauty category image
    image: STOCK_IMAGES.wellness,
    subcategories: ['Nail Salon','Hair Salon','Barber','Waxing','Lash & Brow'],
  },
  services: {
    label: 'Home & Services',
    label_vi: 'Dịch vụ',
    label_ko: '생활 서비스',
    eyebrow: 'HOME · CLEANING · REPAIRS · DAILY ESSENTIALS',
    eyebrow_vi: 'DỊCH VỤ NHÀ CỬA · VỆ SINH · SỬA CHỮA',
    eyebrow_ko: '가사 · 세탁 · 에어컨 청소 · 수리',
    description: 'Laundry, AC cleaning, house cleaning, handyman and residential services.',
    description_vi: 'Giặt ủi, vệ sinh máy lạnh, dọn dẹp nhà cửa và dịch vụ sửa chữa.',
    description_ko: '세탁소, 에어컨 청소·수리, 가사 도우미, 집수리 등 생활 밀착 서비스.',
    // TODO: replace with dedicated services category image
    image: STOCK_IMAGES.hobby,
    subcategories: ['Laundry','AC Cleaning & Repair','Cleaning','Repair & Handyman'],
  },
  market: {
    label: 'Groceries & Markets',
    label_vi: 'Siêu thị & Chợ',
    label_ko: '마트 · 장보기',
    eyebrow: 'SUPERMARKETS · GROCERIES · FRESH FOOD',
    eyebrow_vi: 'SIÊU THỊ · TẠP HÓA · THỰC PHẨM TƯƠI',
    eyebrow_ko: '슈퍼마켓 · 식료품점 · 신선 장터',
    description: 'Supermarkets, organic groceries, convenience stores and fresh local markets.',
    description_vi: 'Siêu thị, cửa hàng thực phẩm hữu cơ, cửa hàng tiện lợi và chợ tươi sống.',
    description_ko: '슈퍼마켓, 유기농 식료품점, 편의점 및 로컬 신선 시장.',
    // TODO: replace with dedicated market category image
    image: STOCK_IMAGES.food,
    subcategories: ['Supermarket','Grocery','Convenience Store','Fresh Market'],
  },
} as const

export type DirectoryCategory = keyof typeof DIRECTORY_CATEGORIES

export const DIRECTORY_CATEGORY_KEYS = Object.keys(DIRECTORY_CATEGORIES) as DirectoryCategory[]

export function isDirectoryCategory(value:string): value is DirectoryCategory {
  return DIRECTORY_CATEGORY_KEYS.includes(value as DirectoryCategory)
}

export function categoryLabel(value:string, localeOrIsVi?: Locale | boolean){
  if(!isDirectoryCategory(value)) return value
  const cat = DIRECTORY_CATEGORIES[value]
  const loc: Locale = typeof localeOrIsVi === 'boolean' ? (localeOrIsVi ? 'vi' : 'en') : (localeOrIsVi || 'en')
  if (loc === 'vi' && cat.label_vi) return cat.label_vi
  if (loc === 'ko' && cat.label_ko) return cat.label_ko
  return cat.label
}

export function categoryEyebrow(value: string, locale: Locale = 'en') {
  if (!isDirectoryCategory(value)) return value
  const cat = DIRECTORY_CATEGORIES[value]
  if (locale === 'vi' && cat.eyebrow_vi) return cat.eyebrow_vi
  if (locale === 'ko' && cat.eyebrow_ko) return cat.eyebrow_ko
  return cat.eyebrow
}

export function categoryDescription(value: string, locale: Locale = 'en') {
  if (!isDirectoryCategory(value)) return ''
  const cat = DIRECTORY_CATEGORIES[value]
  if (locale === 'vi' && cat.description_vi) return cat.description_vi
  if (locale === 'ko' && cat.description_ko) return cat.description_ko
  return cat.description
}

export const EDITORIAL_BADGES = ['Recommended','New','HOT'] as const

const THAO_DIEN_CORE_STREETS = /Xuân Thủy|Xuan Thuy|Quốc Hương|Quoc Huong|Thảo Điền|Thao Dien|Nguyễn Văn Hưởng|Nguyen Van Huong|Trần Ngọc Diện|Tran Ngoc Dien|Lê Văn Miến|Le Van Mien|Nguyễn Đăng Giai|Nguyen Dang Giai|Võ Trường Toản|Vo Truong Toan|Tống Hữu Định|Tong Huu Dinh|Nguyễn Cừ|Nguyen Cu|Thái Ly|Thai Ly|Trúc Đường|Truc Duong|Đỗ Quang|Do Quang|Nguyễn Bá Lân|Nguyen Ba Lan|Lê Thước|Le Thuoc|Nguyễn Duy Hiệu|Nguyen Duy Hieu|Nguyễn Bá Huân|Nguyen Ba Huan|Trần Văn Sắc|Tran Van Sac|161 Võ Nguyên Giáp|161 Vo Nguyen Giap|Vincom Mega Mall/i

const NEARBY_AN_PHU_AN_KHANH_PATTERN = /An Phú|An Phu|An Khánh|An Khanh|Trần Não|Tran Nao|Lương Định Của|Luong Dinh Cua|Nguyễn Quý Cảnh|Nguyen Quy Canh|Nguyễn Quý Đức|Nguyen Quy Duc|Song Hành|Song Hanh|Trần Lựu|Tran Luu|Bình Trưng|Binh Trung|Võ Nguyên Giáp|Vo Nguyen Giap/i

export function isNearbyArea(address?: string | null, tags?: string[] | null, badges?: string[] | null): boolean {
  const allLabels = [...(tags || []), ...(badges || [])].map(x => x.toLowerCase())
  if (allLabels.some(x => x.includes('nearby') || x.includes('an phu') || x.includes('an khanh'))) return true
  if (!address) return false
  if (THAO_DIEN_CORE_STREETS.test(address)) return false
  return NEARBY_AN_PHU_AN_KHANH_PATTERN.test(address)
}

export function nearbyBadgeText(address?: string | null, tags?: string[] | null, badges?: string[] | null, locale: Locale = 'en'): string | null {
  if (!isNearbyArea(address, tags, badges)) return null
  if (locale === 'vi') return 'Lân cận (An Phú / An Khánh)'
  if (locale === 'ko') return '인접 지역 (안푸 / 안카인)'
  return 'Nearby (An Phu / An Khanh)'
}

export type DirectoryCategoryAppearance = {
  icon_text: string
  icon_url: string
}

export const DEFAULT_DIRECTORY_CATEGORY_APPEARANCE: Record<DirectoryCategory,DirectoryCategoryAppearance> = {
  wellness: {icon_text:'✦',icon_url:''},
  workout: {icon_text:'↗',icon_url:''},
  food: {icon_text:'◉',icon_url:''},
  cafe: {icon_text:'☕',icon_url:''},
  hobby: {icon_text:'◇',icon_url:''},
  beauty: {icon_text:'✿',icon_url:''},
  services: {icon_text:'⚙',icon_url:''},
  market: {icon_text:'🛒',icon_url:''},
}

export function mergeDirectoryCategoryAppearance(value:unknown){
  const raw=(value&&typeof value==='object'?value:{}) as Record<string,Partial<DirectoryCategoryAppearance>>
  return Object.fromEntries(DIRECTORY_CATEGORY_KEYS.map(key=>[key,{...DEFAULT_DIRECTORY_CATEGORY_APPEARANCE[key],...(raw[key]||{})}])) as Record<DirectoryCategory,DirectoryCategoryAppearance>
}
