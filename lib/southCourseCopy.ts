import type { Locale } from '@/lib/i18n/config'

/**
 * 푸꾸옥 남부 문화·특산품 8시간 차량 추천 코스 — 업체 제공 PDF(chuong_trinh_tour_nam_dao_song_ngu.pdf) 기준.
 * 업체 확인: 가격이 붙은 상품이 아니라 "추천 일정"이며, 요금은 8시간 차량 대절 요금표를 따른다.
 * 영어·베트남어는 업체 PDF의 표기를 그대로 사용한다. 한국어는 승인 문안(2026-11-06).
 * zh·ru·ja·hi 는 ChatGPT 번역 감수 전까지 영어로 표시한다.
 */
export interface SouthCourseStop {
  title: string
  desc: string
}

export interface SouthCourseCopy {
  eyebrow: string
  title: string
  note: string
  /** 8시간 초과 시 추가 요금 안내 (금액은 vehiclePricing 기준) */
  overtime: (amount: string) => string
  stops: SouthCourseStop[]
  /** 추천 테마 일정 페이지에서 쓰는 짧은 소개 */
  teaserTitle: string
  teaserText: string
  teaserCta: string
}

const EN: SouthCourseCopy = {
  eyebrow: 'Recommended course',
  title: 'Phu Quoc South Island Tour Itinerary',
  note: 'The actual departure time can be flexibly arranged and customized to best suit the needs, flight schedules, or personal preferences of each tourist.',
  overtime: (amount) => `Extra charge if the tour exceeds 8 hours: ${amount} per hour.`,
  teaserTitle: 'South Island Tour Itinerary',
  teaserText: 'A recommended 8-hour car tour route through the craft villages and local products of South Phu Quoc.',
  teaserCta: 'View the itinerary',
  stops: [
    { title: 'Pick-up & Departure', desc: 'Our car and tour guide will pick you up at your hotel to begin the journey exploring the traditional craft villages and unique local products of the South Island.' },
    { title: 'Phu Quoc Pepper Garden', desc: 'Stroll through straight, lush green rows of pepper trees and take beautiful photos. Discover why Phu Quoc pepper is famous for its superior aroma thanks to local soil, taste specialized pepper salts or sugar-infused pepper, and buy authentic pepper directly from the farm.' },
    { title: 'Phu Quoc Sim Wine Garden', desc: 'Visit the purple myrtle flower garden and explore the traditional fermentation process of Sim wine from wild myrtle berries. Enjoy free tastings of Sim wine, Sim syrup, and Sim candies, which are highly beneficial for health and digestion.' },
    { title: 'Swiftlet Nest & Agarwood Craft Center', desc: "Learn about the process of attracting swiftlets, harvesting, and processing bird's nests entirely by hand to preserve full nutritional value. Relax your mind in the fragrant atmosphere of a natural agarwood garden and learn how to distinguish genuine bird's nests from fake ones." },
    { title: 'Traditional Fish Sauce Factory', desc: 'Admire the giant wooden vats standing up to 3 meters high used to ferment anchovies according to a 200-year-old traditional method. Taste the premium "first-press" fish sauce drawn directly from the vats, featuring high natural protein and a rich flavor profile.' },
    { title: 'Seaside Lunch Support', desc: 'Our tour guide will assist you with dining arrangements at beachfront restaurants at Sao Beach (enjoying seafood while admiring the white sand and turquoise sea) or floating rafts at Ham Ninh Fishing Village for fresh catch. Guaranteed transparent pricing with no overcharging worries.' },
    { title: 'Ngoc Hien Pearl Farm', desc: 'Witness live operations of extracting pearls executed skillfully under the guidance of Japanese experts. Learn how to distinguish real pearls from counterfeits, and admire the magnificent jewelry showroom along with unique art sculptures carved from oyster shells.' },
    { title: 'Silk Craft & Furniture Center', desc: 'A destination celebrating Vietnamese traditional craft villages. Learn about the delicate silk weaving process and how artisans craft exquisite art furniture from wood, rattan, and bamboo. Perfect for those who love cultural beauty and interior arts.' },
    { title: 'Phu Quoc Specialty Shopping Center', desc: 'A perfect final stop gathering all signature Phu Quoc specialties: dried seafood, fish sauce, pepper, Sim wine... with clearly listed prices. Complimentary packing in foam boxes is provided for easy airplane check-in or transport.' },
    { title: 'Tour End', desc: 'Our car transfers you safely back to your hotel. Concluding a relaxing, meaningful cultural journey through the South Island with memories and local gifts.' },
  ],
}

const VI: SouthCourseCopy = {
  eyebrow: 'Lịch trình gợi ý',
  title: 'Chương trình tour Nam Đảo Phú Quốc',
  note: 'Thời gian khởi hành thực tế có thể linh hoạt sắp xếp và điều chỉnh sao cho phù hợp nhất với nhu cầu, giờ giấc bay hoặc lịch trình riêng của từng khách du lịch.',
  overtime: (amount) => `Phụ thu nếu vượt quá 8 tiếng: ${amount}/giờ.`,
  teaserTitle: 'Chương trình tour Nam Đảo',
  teaserText: 'Lịch trình gợi ý 8 tiếng bằng xe, khám phá các làng nghề và sản vật phía Nam đảo Phú Quốc.',
  teaserCta: 'Xem lịch trình',
  stops: [
    { title: 'Đón khách & khởi hành', desc: 'Xe và hướng dẫn viên đón khách tại khách sạn, bắt đầu hành trình khám phá các làng nghề và sản vật độc đáo phía Nam đảo.' },
    { title: 'Vườn tiêu Phú Quốc', desc: 'Khách dạo bước giữa những hàng tiêu xanh mướt thẳng tắp, tự do chụp ảnh. Tìm hiểu lý do tiêu Phú Quốc thơm ngon vượt trội nhờ thổ nhưỡng, nếm thử muối tiêu dưỡng, tiêu ngào đường và mua tiêu hạt nguyên chất tại vườn.' },
    { title: 'Vườn sim Phú Quốc', desc: 'Tham quan vườn hoa sim tím và khám phá quy trình ủ rượu sim mật truyền thống từ trái sim rừng. Khách được thưởng thức miễn phí các loại vang sim, mật sim, kẹo sim... rất tốt cho sức khỏe và hệ tiêu hóa.' },
    { title: 'Khu thủ công yến sào & vườn trầm hương', desc: 'Tìm hiểu quy trình dẫn dụ chim yến, khai thác và sơ chế tổ yến hoàn toàn thủ công để giữ trọn vi chất dinh dưỡng. Kết hợp không gian thơm ngát của vườn trầm hương tự nhiên giúp thư giãn tinh thần và học cách phân biệt yến sào thật - giả.' },
    { title: 'Nhà thùng nước mắm', desc: 'Chiêm ngưỡng những thùng gỗ khổng lồ cao tới 3m dùng để ủ chượp cá cơm theo phương pháp truyền thống hơn 200 năm tuổi. Khách sẽ được nếm thử nước mắm cốt nhĩ kéo rút trực tiếp từ thùng gỗ với độ đạm tự nhiên cao và hương vị đậm đà.' },
    { title: 'Bữa trưa ven biển', desc: 'Hướng dẫn viên hỗ trợ khách dùng bữa tại các nhà hàng ven Bãi Sao (vừa ăn hải sản vừa ngắm biển xanh cát trắng) hoặc các nhà bè tại Làng chài Hàm Ninh để thưởng thức hải sản tươi sống bắt ngay dưới nước. Cam kết ăn đúng giá, không lo chặt chém.' },
    { title: 'Ngọc trai Ngọc Hiền', desc: 'Xem trực tiếp kỹ thuật mổ trai lấy ngọc điêu luyện dưới sự cố vấn của chuyên gia Nhật Bản. Học cách phân biệt ngọc trai thật - giả, chiêm ngưỡng không gian trưng bày trang sức lộng lẫy và các tác phẩm nghệ thuật điêu khắc bằng vỏ trai độc bản.' },
    { title: 'Khu thủ công tơ lụa & đồ nội thất', desc: 'Điểm đến tôn vinh các làng nghề thủ công Việt Nam. Khách được tìm hiểu quy trình dệt tơ lụa mềm mại và cách các nghệ nhân chế tác đồ nội thất mỹ nghệ tinh xảo từ gỗ, mây, tre. Thích hợp cho những ai yêu nét đẹp văn hóa và nghệ thuật không gian sống.' },
    { title: 'Siêu thị đặc sản Phú Quốc', desc: 'Điểm dừng chân trọn vẹn quy tụ đầy đủ đặc sản đảo Ngọc: hải sản khô, nước mắm, tiêu, rượu sim... với giá niêm yết rõ ràng. Hỗ trợ đóng thùng xốp cẩn thận để khách tiện lợi mang theo hoặc ký gửi máy bay mà không cần gom lắt nhắt từ trước.' },
    { title: 'Kết thúc hành trình', desc: 'Xe đưa khách về lại khách sạn an toàn. Khép lại chuyến đi trải nghiệm văn hóa Nam Đảo nhẹ nhàng, ý nghĩa và đầy ắp quà mang về.' },
  ],
}

const KO: SouthCourseCopy = {
  eyebrow: '추천 코스',
  title: '남부 문화·특산품 코스 (추천 일정)',
  note: '8시간 차량 대절로 둘러보는 푸꾸옥 남부 추천 코스입니다. 순서는 추천일 뿐이며, 취향과 항공 시간에 맞춰 조정할 수 있습니다. 요금은 위 "남부 관광 투어" 8시간 차량 요금표를 따릅니다.',
  overtime: (amount) => `8시간을 넘기면 시간당 추가 요금은 ${amount}입니다.`,
  teaserTitle: '남부 문화·특산품 코스',
  teaserText: '8시간 차량 대절로 후추·심 와인·진주 농장 등 푸꾸옥 남부를 둘러보는 추천 코스예요.',
  teaserCta: '추천 코스 보기',
  stops: [
    { title: '호텔 출발', desc: '숙소에서 차량과 가이드가 픽업해 남부 공방과 특산품 마을 여행을 시작합니다. 출발 시간은 일정에 맞게 조정할 수 있습니다.' },
    { title: '후추 농장', desc: '푸꾸옥 후추가 향이 좋은 이유(토양)를 듣고, 후추소금과 설탕 후추를 맛보고, 원물 후추를 살 수 있습니다. 푸른 후추밭에서 사진도 자유롭게 찍어보세요.' },
    { title: '심(Sim) 와인 농장', desc: '보라색 심 꽃밭을 구경하고, 야생 심 열매로 술을 담그는 전통 과정을 봅니다. 심 와인, 시럽, 사탕은 무료로 시음할 수 있습니다.' },
    { title: '제비집·침향 공방', desc: '제비집을 수작업으로 채취하고 가공하는 과정을 보고, 진짜와 가짜 제비집을 구별하는 법을 듣습니다. 향기로운 침향 정원도 둘러봅니다.' },
    { title: '전통 느억맘(피시소스) 공장', desc: '높이 3m 대형 나무통에서 200년 된 전통 방식으로 멸치를 발효시키는 모습을 봅니다. 통에서 바로 뽑은 첫 번째 피시소스를 시음합니다.' },
    { title: '해변 점심', desc: '가이드가 바이사오 해변 식당이나 함닌 어촌의 수상 식당 이용을 도와줍니다. 신선한 해산물을 정직한 가격으로 즐기세요.' },
    { title: '응옥히엔 진주 농장', desc: '진주조개에서 진주를 꺼내는 시연을 보고, 진짜와 가짜 진주 구별법을 배웁니다. 보석 전시장과 조개껍데기 조각 작품도 구경합니다.' },
    { title: '실크·가구 공방', desc: '비단을 짜는 과정과, 나무·등나무·대나무로 만드는 공예 가구를 봅니다.' },
    { title: '특산품 쇼핑센터', desc: '건어물, 피시소스, 후추, 심 와인 등을 정가로 살 수 있고, 비행기에 실을 수 있게 스티로폼 박스 포장을 해줍니다.' },
    { title: '호텔 복귀', desc: '차량으로 호텔까지 안전하게 데려다줍니다.' },
  ],
}

const COPY: Partial<Record<Locale, SouthCourseCopy>> = { ko: KO, en: EN, vi: VI }

export function getSouthCourseCopy(locale: Locale): SouthCourseCopy {
  return COPY[locale] ?? EN
}
