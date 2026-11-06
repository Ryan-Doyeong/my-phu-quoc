import type { Locale } from '@/lib/i18n/config'

/**
 * 푸꾸옥 남부 문화·특산품 8시간 차량 추천 코스 — 업체 제공 PDF(chuong_trinh_tour_nam_dao_song_ngu.pdf) 기준.
 * 업체 확인: 가격이 붙은 상품이 아니라 "추천 일정"이며, 요금은 8시간 차량 대절 요금표를 따른다.
 * 영어·베트남어는 업체 PDF의 표기를 그대로 사용한다. 한국어는 승인 문안(2026-11-06).
 * zh·ru·ja·hi 는 ChatGPT 번역·2차 검수본(2026-11-06).
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
  overtime: (amount) => `Additional charge after 8 hours: ${amount} per hour.`,
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
  overtime: (amount) => `Phụ thu sau 8 giờ: ${amount}/giờ.`,
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


// zh·ru·ja·hi: ChatGPT 번역·2차 검수 반영 (2026-11-06). 힌디어 "푸꾸옥" 표기(फु क्वोक)는 관광청 사이트의 फू क्वोक 표기와 단일 표준이 확정되지 않음(미확인).
const ZH: SouthCourseCopy = {
  eyebrow: "推荐路线",
  title: "南部文化与特产之旅（推荐行程）",
  note: "这是富国岛南部8小时包车推荐路线。游览顺序仅供参考，可根据个人喜好和航班时间调整。费用以页面上方“南部观光包车”8小时价格表为准。",
  overtime: (amount) => `超过8小时后，每小时加收${amount}。`,
  teaserTitle: "南部文化与特产之旅",
  teaserText: "8小时包车游览富国岛南部，参观胡椒园、Sim果酒庄、珍珠养殖场等景点。",
  teaserCta: "查看推荐路线",
  stops: [
    { title: "酒店出发", desc: "车辆和导游将在住宿地点接您，开启南部手工作坊与特产村之旅。出发时间可根据行程调整。" },
    { title: "胡椒种植园", desc: "了解富国岛的土壤为何能孕育出香气浓郁的胡椒。品尝胡椒盐和糖味胡椒，还可购买原粒胡椒。在绿色胡椒园里自由拍照。" },
    { title: "Sim果酒庄", desc: "欣赏紫色Sim花田，观看用野生Sim果实酿酒的传统工艺。可免费品尝Sim果酒、糖浆和糖果。" },
    { title: "燕窝与沉香工坊", desc: "观看燕窝的人工采集和加工过程，了解如何辨别真假燕窝。还可参观香气怡人的沉香园。" },
    { title: "传统鱼露工厂", desc: "观看采用200年传统工艺，在3米高的大木桶中发酵鳀鱼制作鱼露的过程。品尝直接从木桶中取出的第一道鱼露。" },
    { title: "海边午餐", desc: "导游会协助您前往 Sao Beach 的餐厅，或 Ham Ninh 渔村的水上餐厅用餐。以合理透明的价格享用新鲜海鲜。" },
    { title: "Ngoc Hien珍珠养殖场", desc: "观看从珍珠贝中取出珍珠的示范，学习辨别真假珍珠。还可参观珠宝展厅和贝壳雕刻作品。" },
    { title: "丝绸与家具工坊", desc: "观看丝绸织造过程，以及用木材、藤条和竹子制作的手工家具。" },
    { title: "特产购物中心", desc: "可按标价购买海鲜干货、鱼露、胡椒、Sim果酒等特产，并提供适合航空托运的泡沫箱包装。" },
    { title: "返回酒店", desc: "车辆将安全送您返回酒店。" },
  ],
}

const RU: SouthCourseCopy = {
  eyebrow: "Рекомендуемый маршрут",
  title: "Культура и местные продукты юга (рекомендуемый маршрут)",
  note: "Рекомендуемый маршрут по югу острова Фукуок на 8 часов с арендованным автомобилем. Порядок остановок можно менять в зависимости от ваших предпочтений и времени рейса. Стоимость указана выше в тарифах на 8-часовую аренду автомобиля для экскурсии по югу острова.",
  overtime: (amount) => `Если поездка длится более 8 часов, доплата составляет ${amount} за каждый дополнительный час.`,
  teaserTitle: "Культура и местные продукты юга",
  teaserText: "8-часовая поездка по югу острова Фукуок с посещением перечной плантации, винодельни Sim, жемчужной фермы и других мест.",
  teaserCta: "Посмотреть маршрут",
  stops: [
    { title: "Отправление из отеля", desc: "Автомобиль и гид заберут вас от места проживания. Начнётся поездка по мастерским и деревням местных ремёсел и продуктов на юге острова. Время отправления можно согласовать с вашим расписанием." },
    { title: "Перечная плантация", desc: "Узнайте, как местная почва влияет на аромат перца с острова Фукуок. Попробуйте соль с перцем и горошины перца в сахарной глазури. Здесь можно купить цельный перец и свободно фотографироваться среди зелёных кустов." },
    { title: "Винодельня Sim", desc: "Прогуляйтесь среди фиолетовых цветов Sim и посмотрите, как традиционным способом делают алкогольный напиток из дикорастущих плодов Sim. Бесплатная дегустация вина Sim, сиропа и конфет." },
    { title: "Мастерская ласточкиных гнёзд и агарового дерева", desc: "Посмотрите, как вручную собирают и обрабатывают съедобные птичьи гнёзда. Узнайте, как отличить настоящие гнёзда от подделок. Также можно посетить ароматный сад агарового дерева." },
    { title: "Традиционная фабрика рыбного соуса", desc: "Посмотрите, как анчоусы ферментируют в больших деревянных бочках высотой 3 м по технологии с 200-летней историей. Попробуйте рыбный соус первого отжима прямо из бочки." },
    { title: "Обед у моря", desc: "Гид поможет посетить ресторан на пляже Сао (Sao Beach) или плавучий ресторан в рыбацкой деревне Хамнинь (Ham Ninh). Попробуйте свежие морепродукты по честным ценам." },
    { title: "Жемчужная ферма Ngoc Hien", desc: "Посмотрите, как извлекают жемчуг из раковин, и научитесь отличать настоящий жемчуг от поддельного. Осмотрите ювелирную экспозицию и резные изделия из ракушек." },
    { title: "Мастерские шёлка и мебели", desc: "Посмотрите на процесс ткачества шёлка и изготовленную вручную мебель из дерева, ротанга и бамбука." },
    { title: "Торговый центр местных продуктов", desc: "Здесь можно купить сушёные морепродукты, рыбный соус, перец, вино Sim и другие продукты по фиксированным ценам. Покупки упакуют в пенопластовые коробки для перевозки самолётом." },
    { title: "Возвращение в отель", desc: "Автомобиль безопасно доставит вас обратно в отель." },
  ],
}

const JA: SouthCourseCopy = {
  eyebrow: "おすすめコース",
  title: "南部の文化・特産品コース（おすすめプラン）",
  note: "車を8時間チャーターしてフーコック島南部を巡るおすすめコースです。訪問順は一例で、お好みやフライト時間に合わせて調整できます。料金は上記「南部観光ツアー」の8時間チャーター料金表に準じます。",
  overtime: (amount) => `8時間を超える場合、1時間あたり${amount}の追加料金がかかります。`,
  teaserTitle: "南部の文化・特産品コース",
  teaserText: "8時間の車チャーターで、胡椒農園やSimワイン農園、真珠養殖場など、フーコック島南部を巡るおすすめコースです。",
  teaserCta: "おすすめコースを見る",
  stops: [
    { title: "ホテル出発", desc: "宿泊先まで車とガイドがお迎えに上がり、南部の工房や特産品の村を巡る旅が始まります。出発時間は予定に合わせて調整できます。" },
    { title: "胡椒農園", desc: "フーコック産胡椒の香りが豊かな理由を土壌の特徴から学びます。胡椒塩や砂糖をまぶした胡椒を試食し、粒胡椒も購入できます。緑の胡椒畑では自由に写真撮影をお楽しみください。" },
    { title: "Simワイン農園", desc: "紫色のSimの花畑を見学し、野生のSimの実を使った伝統的なお酒造りを見学します。Simワイン、シロップ、キャンディーを無料で試飲・試食できます。" },
    { title: "ツバメの巣・沈香工房", desc: "食用のツバメの巣を手作業で採取・加工する工程を見学し、本物と偽物の見分け方を学びます。香り豊かな沈香の庭園も巡ります。" },
    { title: "伝統的な魚醤工場", desc: "高さ3mの大きな木樽で、200年続く伝統製法によりカタクチイワシを発酵させる工程を見学します。樽から直接取り出した一番搾りの魚醤を試飲します。" },
    { title: "海辺でのランチ", desc: "ガイドがサオビーチ（Sao Beach）のレストラン、またはハムニン漁村（Ham Ninh）の水上レストランへのご案内をお手伝いします。新鮮なシーフードを適正価格でお楽しみください。" },
    { title: "Ngoc Hien真珠養殖場", desc: "真珠貝から真珠を取り出す実演を見学し、本物と偽物の真珠の見分け方を学びます。宝飾品の展示室や貝殻の彫刻作品も見学できます。" },
    { title: "シルク・家具工房", desc: "シルクを織る工程や、木・籐・竹を使って作られる手工芸家具を見学します。" },
    { title: "特産品ショッピングセンター", desc: "乾燥海産物、魚醤、胡椒、Simワインなどを定価で購入できます。飛行機に持ち込めるよう、発泡スチロール製の箱に梱包してもらえます。" },
    { title: "ホテルへ戻る", desc: "車で安全にホテルまでお送りします。" },
  ],
}

const HI: SouthCourseCopy = {
  eyebrow: "सुझाया गया टूर",
  title: "दक्षिणी संस्कृति और स्थानीय उत्पाद टूर (सुझाया गया कार्यक्रम)",
  note: "यह फु क्वोक के दक्षिणी हिस्से में 8 घंटे की निजी कार यात्रा का सुझाया गया रूट है। घूमने का क्रम केवल सुझाव है। इसे अपनी पसंद और फ्लाइट के समय के अनुसार बदला जा सकता है। किराया ऊपर दिए गए 'दक्षिणी दर्शनीय स्थल टूर' की 8 घंटे की कार किराया सूची के अनुसार होगा।",
  overtime: (amount) => `8 घंटे से अधिक होने पर हर अतिरिक्त घंटे का शुल्क ${amount} है।`,
  teaserTitle: "दक्षिणी संस्कृति और स्थानीय उत्पाद टूर",
  teaserText: "8 घंटे की निजी कार यात्रा में फु क्वोक के दक्षिणी हिस्से की काली मिर्च की खेती, Sim वाइन फार्म, मोती फार्म और अन्य स्थानों को देखने का सुझाया गया रूट।",
  teaserCta: "सुझाया गया रूट देखें",
  stops: [
    { title: "होटल से प्रस्थान", desc: "कार और गाइड आपको ठहरने की जगह से लेने आएँगे। इसके बाद दक्षिण के कारीगरी केंद्रों और स्थानीय उत्पादों के गाँवों की यात्रा शुरू होगी। प्रस्थान का समय आपके कार्यक्रम के अनुसार बदला जा सकता है।" },
    { title: "काली मिर्च का फार्म", desc: "जानें कि यहाँ की मिट्टी फु क्वोक की काली मिर्च को इतनी अच्छी खुशबू क्यों देती है। मिर्च वाला नमक और चीनी के साथ तैयार मिर्च चखें। साबुत काली मिर्च खरीद सकते हैं और हरे-भरे खेतों में आराम से तस्वीरें ले सकते हैं।" },
    { title: "Sim वाइन फार्म", desc: "बैंगनी Sim फूलों के खेत देखें और जंगली Sim फलों से पारंपरिक तरीके से शराब बनाने की प्रक्रिया जानें। Sim वाइन, सिरप और कैंडी का मुफ्त स्वाद ले सकते हैं।" },
    { title: "पक्षियों के घोंसलों और अगरवुड की कार्यशाला", desc: "खाने योग्य पक्षियों के घोंसलों को हाथ से इकट्ठा करने और तैयार करने की प्रक्रिया देखें। असली और नकली घोंसलों की पहचान करना सीखें। सुगंधित अगरवुड के बगीचे में भी घूमें।" },
    { title: "पारंपरिक फिश सॉस फैक्ट्री", desc: "देखें कि 3 मीटर ऊँचे लकड़ी के बड़े पीपों में 200 साल पुरानी पारंपरिक विधि से एन्कोवी मछलियों को कैसे फर्मेंट किया जाता है। पीपे से सीधे निकाली गई पहली फिश सॉस का स्वाद लें।" },
    { title: "समुद्र किनारे दोपहर का भोजन", desc: "गाइड आपको साओ बीच (Sao Beach) के रेस्तराँ या हाम निन्ह (Ham Ninh) मछुआरा गाँव के पानी पर बने रेस्तराँ में जाने में मदद करेगा। उचित और पारदर्शी कीमतों पर ताज़ा सीफ़ूड का आनंद लें।" },
    { title: "Ngoc Hien मोती फार्म", desc: "सीप से मोती निकालने का प्रदर्शन देखें और असली व नकली मोती पहचानना सीखें। आभूषणों की प्रदर्शनी और सीप के खोल पर की गई नक्काशी भी देखें।" },
    { title: "रेशम और फर्नीचर की कार्यशाला", desc: "रेशम बुनने की प्रक्रिया देखें। लकड़ी, बेंत और बाँस से बना हस्तनिर्मित फर्नीचर भी देखें।" },
    { title: "स्थानीय उत्पाद शॉपिंग सेंटर", desc: "यहाँ सूखा सीफ़ूड, फिश सॉस, काली मिर्च, Sim वाइन और अन्य उत्पाद तय कीमत पर खरीद सकते हैं। हवाई यात्रा के लिए सामान को थर्मोकोल के डिब्बों में पैक किया जाता है।" },
    { title: "होटल वापसी", desc: "कार आपको सुरक्षित रूप से वापस होटल पहुँचाएगी।" },
  ],
}

const COPY: Partial<Record<Locale, SouthCourseCopy>> = { ko: KO, en: EN, vi: VI, zh: ZH, ru: RU, ja: JA, hi: HI }

export function getSouthCourseCopy(locale: Locale): SouthCourseCopy {
  return COPY[locale] ?? EN
}
