/**
 * lib/foodKnowledge.ts
 * 푸꾸옥 선셋타운 & 베트남 식음료 문화 및 메뉴 지식베이스
 * 
 * 외국인 및 여행자에게 낯설 수 있는 음식의 정체, 식재료, 문화적 배경,
 * 소스 조합법, 먹는 법, 보관 및 주문 팁을 3개 국어(한국어, 영어, Tiếng Việt)로 제공
 */

export interface FoodGuideLangContent {
  label: string
  paragraphs: string[]
  list?: string[]
  subheading?: string
  subList?: string[]
}

export interface FoodGuideSectionData {
  id: string
  icon: string
  title: string
  tocLabel: string
  ko: FoodGuideLangContent
  en: FoodGuideLangContent
  vi: FoodGuideLangContent
}

export interface FoodKnowledgeEntry {
  keywords: string[]
  section: FoodGuideSectionData
}

// 1. 음식별 백과사전 지식 항목
export const FOOD_KNOWLEDGE_ENTRIES: Record<string, FoodGuideSectionData> = {
  // --- A. 곱창 & 한국식 바비큐 (K-BBQ & Gopchang) ---
  gopchang: {
    id: 'what-is-gopchang',
    icon: '🥩',
    title: 'What is So-gopchang & Korean BBQ?',
    tocLabel: 'What is Gopchang?',
    ko: {
      label: '한국어 · 소곱창과 K-BBQ 문화',
      paragraphs: [
        "소곱창은 소의 작은창자(소장)를 말합니다. '곱창'이라는 이름은 '구불구불 굽은 창자'라는 뜻과, 창자 안쪽에 꽉 찬 고소한 '곱'에서 유래했습니다.",
        "기름기를 깔끔하게 세척하고 삶아낸 뒤, 뜨거운 철판에 감자, 양파, 김치, 부추와 함께 구워 먹는 것이 정석입니다.",
      ],
      list: [
        '소곱창: 소의 작은창자. 쫄깃하고 겉은 바삭하며 안쪽의 녹진하고 고소한 곱이 일품입니다.',
        '소대창: 소의 큰창자. 도톰하고 풍부한 육즙과 부드러운 고소함이 특징입니다.',
        '소막창: 소의 네 번째 위. 쫀득쫀득하고 씹을수록 깊은 육향이 배어납니다.',
        '볶음밥 문화: 구이를 다 먹은 뒤 남은 김치와 기름, 김가루를 넣고 볶아먹는 볶음밥(Bokkeum-bap)은 한국 식문화의 정수입니다.',
      ],
      subheading: '맛있게 즐기는 법 & 소스 페어링',
      subList: [
        '특제 간장소스(참소스)에 청양고추와 다진 마늘을 풀고 푹 찍어 드세요.',
        '고소한 콩가루(미숫가루)를 살짝 묻히면 기름진 맛을 부드럽게 감싸줍니다.',
        '시원한 맥주나 한국 전통 소주와 곁들여 즐기기 좋습니다.',
      ],
    },
    en: {
      label: 'English · What is Gopchang?',
      paragraphs: [
        'Gopchang refers to beef small intestine, a prized delicacy in Korean culinary culture known for its rich, nutty flavor and uniquely chewy texture.',
        'The intestines are meticulously cleaned, parboiled, and grilled on a sizzling tabletop platter alongside fresh onions, potatoes, kimchi, and seasoned garlic chives.',
      ],
      list: [
        'So-gopchang: Beef small intestines filled with creamy, savory goodness called "gop".',
        'Daechang: Beef large intestines boasting luscious juiciness and melt-in-the-mouth tenderness.',
        'Makchang: Beef fourth stomach (abomasum), favored for its dense, bouncy bite.',
        'Bokkeum-bap: Finishing the meal with seaweed, kimchi, and rice fried in the remaining skillet pan drippings is mandatory in Korean dining.',
      ],
      subheading: 'How to Enjoy & Dipping Tips',
      subList: [
        'Dip into sweet-savory soy dipping sauce (Cham-sauce) with minced garlic and chilies.',
        'Roll lightly in roasted soybean powder for a nutty, balanced flavor.',
        'Pairs extraordinarily well with ice-cold beer or Korean soju.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Lòng bò nướng Gopchang',
      paragraphs: [
        'Gopchang là món lòng non bò nướng đặc sản rất được ưa chuộng tại Hàn Quốc. Phần lòng được làm sạch kỹ lưỡng, luộc sơ qua rồi nướng xèo xèo trên chảo gang cùng hành tây, khoai tây, kim chi và hẹ.',
        'Điểm đặc biệt nhất là phần nhân bùi béo tự nhiên (gọi là "gop") bên trong kết hợp với lớp vỏ ngoài nướng xém giòn dai.',
      ],
      list: [
        'Lòng non (Gopchang): Giòn dai, bùi ngậy đặc trưng bên trong.',
        'Đại tràng (Daechang): Béo ngậy, mềm mọng nước, nướng cháy cạnh.',
        'Dạ dày (Makchang): Giòn sần sật, nhai càng lâu càng ngọt thơm.',
        'Cơm chiên chảo gang (Bokkeum-bap): Rang cơm với kim chi, rong biển trên mỡ nướng còn lại.',
      ],
      subheading: 'Cách thưởng thức chuẩn vị',
      subList: [
        'Chấm nước sốt tương tỏi ớt chua ngọt hoặc bột đậu nành rang thơm bùi.',
        'Thưởng thức cùng hẹ xào dầu mè và kim chi nướng nóng hổi.',
      ],
    },
  },

  // --- B. 푸꾸옥 명물 분쿼이 (Bún Quậy) ---
  bunquay: {
    id: 'what-is-bunquay',
    icon: '🍜',
    title: 'What is Phu Quoc Bún Quậy?',
    tocLabel: 'What is Bún Quậy?',
    ko: {
      label: '한국어 · 푸꾸옥 명물 분쿼이란?',
      paragraphs: [
        "분쿼이(Bún Quậy)는 오직 베트남 푸꾸옥 섬에서만 맛볼 수 있는 상징적인 생면 해산물 쌀국수입니다. 'Quậy'는 베트남어로 '휘젓다'라는 뜻입니다.",
        "주문 즉시 생면 반죽을 기계에서 압출해 끓는 물에 삶고, 그릇 바닥에 신선한 생새우살과 생선살 페이스트(Chả tôm & Chả cá)를 바른 뒤 펄펄 끓는 맑은 육수를 부어 빠르게 저어 익혀내는 독창적인 조리법을 자랑합니다.",
      ],
      list: [
        '오징어 통마리: 갓 잡은 싱싱한 한치/오징어 한 마리가 통째로 들어가 쫄깃하고 달큰합니다.',
        '생새우 & 어묵 페이스트: 그릇에 바른 뒤 육수의 열기로 익혀 극강의 부드러움과 신선한 바다 향을 냅니다.',
        '첨가물 없는 순수 생면: 쌀가루 반죽으로 현장에서 즉석 제면하여 투명하고 부드러운 목넘김이 특징입니다.',
      ],
      subheading: '분쿼이만의 필수 셀프 소스 제조법',
      subList: [
        '셀프 소스 바에서 설탕 1~2스푼, 소금/미원 약간, 다진 고추를 절구 접시에 넣습니다.',
        '칼라만시(Tắc) 3~4개를 듬뿍 즙을 짜 넣고, 수저로 설탕이 녹아 걸쭉한 주황빛 크림이 될 때까지 힘차게 휘젓습니다.',
        '국물에 소스를 1~2스푼 풀어 감칠맛을 더하고, 해산물과 어묵을 찍어 드세요!',
      ],
    },
    en: {
      label: 'English · What is Bún Quậy?',
      paragraphs: [
        'Bún Quậy ("Stirred Noodles") is Phu Quoc Island\'s most iconic culinary invention. The word "Quậy" literally means "to vigorously stir".',
        'Raw minced shrimp and fish pastes are smeared directly onto the inside of the bowl. Boiling hot broth is poured over, and the cook stirs vigorously so the seafood cooks instantly into delicate, tender morsels.',
      ],
      list: [
        'Whole fresh squid: Tender local baby squid boiled directly in the noodle pot.',
        'Handmade seafood paste: Fresh wild shrimp and fish mousse cooked gently by hot broth.',
        'Live fresh noodles: Pressed from rice dough right before your eyes, offering an exceptionally silky texture.',
      ],
      subheading: 'The Famous DIY Dipping Sauce',
      subList: [
        'Head to the sauce station: Add sugar, salt, chili, and squeeze 3-4 calamansi limes into a bowl.',
        'Stir vigorously with a spoon until emulsified into a frothy, bright orange dipping emulsion.',
        'Spoon some into your soup broth and dip every bite of seafood into this magical sauce!',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Bún Quậy Phú Quốc',
      paragraphs: [
        'Bún Quậy là món ăn trứ danh làm nên thương hiệu ẩm thực đảo ngọc Phú Quốc. Chữ "quậy" bắt nguồn từ hành động quậy tròn đều tay phần chả tôm, chả cá tươi sống phết dưới đáy tô khi nước dùng sôi sùng sục được chan vào.',
        'Sợi bún được ép tươi trực tiếp từ khối bột gạo ngay tại quán, không hóa chất, ăn kèm mực trứng tươi rói nguyên con.',
      ],
      list: [
        'Chả tôm & cá tươi: Giữ trọn vị ngọt thanh thuần khiết từ biển khơi.',
        'Mực lá/mực trứng: Tươi giòn sần sật, ngọt lịm.',
        'Bún tươi ép tại chỗ: Trong veo, dẻo dai và thơm mùi gạo mới.',
      ],
      subheading: 'Bí quyết pha nước chấm huyền thoại',
      subList: [
        'Cho muối, đường, ớt xay và vắt 3-4 quả tắc vào chén.',
        'Dùng muỗng quậy thật nhanh và đều tay cho đến khi hỗn hợp sánh mịn đổi sang màu cam sữa.',
        'Chấm hải sản hoặc múc trực tiếp 1-2 thìa vào tô bún để bùng nổ hương vị.',
      ],
    },
  },

  // --- C. 푸꾸옥 해산물 & 함닌 꽃게 (Phu Quoc Seafood & Crab) ---
  seafood: {
    id: 'what-is-seafood',
    icon: '🦀',
    title: 'Phu Quoc Seafood & Ham Ninh Crab',
    tocLabel: 'Phu Quoc Seafood',
    ko: {
      label: '한국어 · 푸꾸옥 해산물과 함닌 꽃게',
      paragraphs: [
        '청정 해역으로 둘러싸인 푸꾸옥 섬은 신선한 해산물 어획이 풍부한 지역입니다. 특히 푸꾸옥 동쪽 함닌(Hàm Ninh) 마을의 꽃게(Ghẹ)는 크기는 아담하지만 단맛과 살이 찬 특징으로 알려져 있습니다.',
        '복잡한 양념 대신 찜(Hấp)이나 숯불구이(Nướng)로 본연의 신선함을 살리며, 푸꾸옥 특산 후추 소금에 찍어 먹습니다.',
      ],
      list: [
        '함닌 꽃게(Ghẹ Hàm Ninh): 레몬그라스와 함께 쪄내어 은은한 향과 게살 본연의 맛을 살립니다.',
        '파기름 가리비/조개구이(Sò nướng mỡ hành): 고소한 땅콩 분태와 파기름, 느억맘을 얹어 직화로 구워냅니다.',
        '마늘버터 타이거새우(Tôm sốt bơ tỏi): 큼직한 블랙타이거 새우에 마늘 버터소스를 곁들여 즐기기 좋습니다.',
      ],
      subheading: '푸꾸옥 특산 소스 안내: 소금+후추+라임',
      subList: [
        '푸꾸옥 후추 소금(Muối tiêu Phú Quốc)에 라임/칼라만시 즙을 넉넉히 짭니다.',
        '갓 쪄낸 꽃게살과 조개, 새우를 곁들이면 깔끔하게 해산물을 즐길 수 있습니다.',
      ],
    },
    en: {
      label: 'English · Phu Quoc Seafood Delicacies',
      paragraphs: [
        'Encircled by the Gulf of Thailand, Phu Quoc is celebrated for world-class wild seafood. In particular, Ham Ninh flower crab (Ghẹ Hàm Ninh) is renowned throughout Vietnam for its sweet, firm, and nutrient-dense flesh.',
        'Locals prefer minimalist cooking—steaming with aromatic lemongrass or charcoal grilling—to let the pure oceanic sweetness shine through.',
      ],
      list: [
        'Steamed Flower Crab: Cooked with lemongrass sprigs; intensely sweet with firm meat.',
        'Grilled Scallops with Scallion Oil: Topped with roasted peanuts and savory fried shallots.',
        'Garlic Butter Prawns: Jumbo local prawns tossed in caramelized garlic butter.',
      ],
      subheading: 'The Sacred Local Condiment: Pepper Salt & Lime',
      subList: [
        'Mix Phu Quoc black/pink pepper salt (Muối tiêu) with freshly squeezed lime juice.',
        'Dip freshly peeled crab, prawns, or squid to elevate the natural oceanic sweetness.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Hải sản Phú Quốc & Ghẹ Hàm Ninh',
      paragraphs: [
        'Phú Quốc được thiên nhiên ưu đãi nguồn hải sản dồi dào, tươi ngon nức tiếng. Ghẹ Hàm Ninh tuy thân không quá to nhưng thịt chắc nịch, vị ngọt đậm đà khó nơi nào sánh bằng.',
        'Cách chế biến ngon nhất chính là hấp sả hoặc nướng mọi trên than hồng để giữ trọn vị ngọt tự nhiên của biển cả.',
      ],
      list: [
        'Ghẹ Hàm Ninh hấp sả: Thịt ghẹ ngọt lịm, gạch béo ngậy chấm muối tiêu chanh.',
        'Sò điệp / Tu hài nướng mỡ hành: Thơm lừng mỡ hành béo béo cùng đậu phộng giòn tan.',
        'Tôm sú sốt bơ tỏi: Đậm đà, thơm nức mũi, chấm kèm bánh mì nóng giòn.',
      ],
      subheading: 'Nước chấm muối tiêu Phú Quốc',
      subList: [
        'Muối hồng tiêu Phú Quốc hòa cùng nước cốt tắc/chanh tươi tạo nên vị chua cay mặn ngọt hài hòa.',
      ],
    },
  },

  // --- D. 쌀국수 & 전통 국수 (Phở & Bún) ---
  pho: {
    id: 'what-is-pho',
    icon: '🍲',
    title: 'What is Vietnamese Phở?',
    tocLabel: 'What is Phở?',
    ko: {
      label: '한국어 · 베트남 전통 쌀국수(포)란?',
      paragraphs: [
        '포(Phở)는 소뼈나 닭을 팔각, 계피, 생강 등 천연 향신료와 함께 오랜 시간 푹 고아낸 깊은 육수에 납작한 쌀국수 면(Bánh phở)과 고기를 올린 베트남의 국민 요리입니다.',
        '북부 하노이식은 맑고 담백한 육수와 파 본연의 깔끔함을 중시하며, 남부 호치민식은 달콤하고 진한 육수에 숙주나물, 바질, 쿨란트로(고수 풀), 해선장 소스를 듬뿍 곁들여 먹습니다.',
      ],
      list: [
        '포보(Phở Bò): 소고기 쌀국수. 양지(Nạm), 안심(Tái), 차돌박이(Gầu), 소고기 완자(Bò viên) 등을 선택합니다.',
        '포가(Phở Gà): 토종닭을 삶아낸 담백하고 맑은 육수의 닭고기 쌀국수.',
        '꿔이(Quẩy): 바삭하게 튀긴 베트남식 도넛 빵으로, 뜨거운 국물에 푹 적셔 먹으면 일품입니다.',
      ],
      subheading: '로컬처럼 쌀국수 맛있게 먹는 법',
      subList: [
        '먼저 아무것도 넣지 않고 순수한 육수 한 스푼을 맛보아 본연의 풍미를 음미합니다.',
        '라임 즙을 한 바퀴 두르고, 취향에 따라 생고추 1~2조각과 허브를 찢어 넣습니다.',
        '고기는 칠리소스(Tương ớt)와 해선장(Tương đen)을 1:1로 섞은 종지에 찍어 드세요.',
      ],
    },
    en: {
      label: 'English · The Art of Vietnamese Phở',
      paragraphs: [
        'Phở is Vietnam’s national treasure: a deeply comforting noodle soup crafted by simmering beef marrow bones or whole chicken for 8–12 hours with charred ginger, onions, star anise, and cinnamon.',
        'Northern (Hanoi) style focuses on a crystal-clear, subtly spiced savory broth accented with green scallions, whereas Southern style embraces fresh aromatic herbs, bean sprouts, lime, and hoisin-chili sauce.',
      ],
      list: [
        'Phở Bò (Beef): Featuring tender rare flank (Tái), brisket (Nạm), fatty flank (Gầu), or beef balls.',
        'Phở Gà (Chicken): Lighter, fragrant broth made with free-range chicken and lime leaves.',
        'Quẩy (Fried Cruller): Crisp golden dough sticks designed to soak up the rich, steaming soup.',
      ],
      subheading: 'How to Savor Phở Like a Local',
      subList: [
        'Sip the pure broth first before adding any condiments.',
        'Squeeze a wedge of fresh lime and add torn fresh herbs (sawtooth herb & Thai basil).',
        'Mix equal parts chili sauce and sweet black hoisin sauce in a small dish for meat dipping.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Tinh hoa Phở Việt Nam',
      paragraphs: [
        'Phở là biểu tượng ẩm thực vĩ đại của đất nước Việt Nam. Nước dùng phở được hầm kỳ công từ xương ống bò cùng gừng nướng, hành nướng, hoa hồi, quế chi và thảo quả trong nhiều giờ liền để đạt độ ngọt thanh trong vắt.',
      ],
      list: [
        'Phở bò: Tái, chín, nạm, gầu, gân, bò viên thơm ngậy.',
        'Phở gà: Nước dùng thanh ngọt tự nhiên, thịt gà ta da giòn thịt chắc chấm muối tiêu ớt lá chanh.',
        'Quẩy giòn: Món ăn kèm hoàn hảo, nhúng đẫm nước dùng nóng hổi.',
      ],
      subheading: 'Cách ăn phở chuẩn sành điệu',
      subList: [
        'Húp thử một thìa nước dùng nguyên bản để cảm nhận trọn vẹn vị ngọt từ xương.',
        'Vắt thêm chanh, thêm vài lát ớt tươi và thưởng thức ngay khi còn nóng bốc khói.',
      ],
    },
  },

  // --- E. 분짜 & 베트남 길거리 음식 (Bún Chả & Street Food) ---
  buncha: {
    id: 'what-is-buncha',
    icon: '🥗',
    title: 'What is Bún Chả & Hanoi BBQ?',
    tocLabel: 'What is Bún Chả?',
    ko: {
      label: '한국어 · 하노이 정통 숯불 분짜란?',
      paragraphs: [
        '분짜(Bún Chả)는 숯불에 노릇하게 구워낸 돼지고기 완자(Chả viên)와 삼겹살(Chả miếng)을 새콤달콤한 따뜻한 느억맘(피시소스) 국물에 담가, 신선한 야채와 가는 쌀국수 면(Bún)을 적셔 먹는 요리입니다.',
        '2016년 버락 오바마 전 미국 대통령과 앤서니 부르댕 셰프가 하노이 로컬 식당에서 함께 먹어 전 세계적인 유명세를 탔습니다.',
      ],
      list: [
        '숯불 고기: 겉은 불향이 그윽하고 속은 육즙이 촉촉한 완자와 삼겹살.',
        '느억맘 육수: 피시소스, 식초, 설탕, 라임을 배합하고 그린 파파야와 당근 절임을 띄운 따뜻한 소스.',
        '바삭한 넴(Nem rán): 게살과 다진 돼지고기를 라이스페이퍼에 말아 튀긴 스프링롤을 곁들여 먹는 방식입니다.',
      ],
      subheading: '분짜 먹는 순서 & 팁',
      subList: [
        '따뜻한 소스 그릇에 쌀국수 면 한 젓가락과 쌈 야채(상추, 깻잎류, 민트)를 적십니다.',
        '고기 한 점과 파파야 피클을 면과 함께 집어 한 입에 드세요.',
        '마늘과 다진 고추를 취향껏 소스에 풀어 알싸함을 더할 수 있습니다.',
      ],
    },
    en: {
      label: 'English · What is Hanoi Bún Chả?',
      paragraphs: [
        'Bún Chả is Hanoi’s celebrated culinary masterpiece: smoky charcoal-grilled pork patties and caramelized pork belly swimming in a warm, tangy fish sauce broth, paired with silky rice vermicelli and heaps of crisp herbs.',
        'It gained global stardom when President Barack Obama and chef Anthony Bourdain enjoyed a humble bowl together in Hanoi in 2016.',
      ],
      list: [
        'Charcoal-grilled pork: Infused with natural smoke and sweet shallot marinades.',
        'Warm tangy broth: Diluted artisan fish sauce with vinegar, sugar, and pickled green papaya.',
        'Nem Rán (Fried Spring Rolls): Crispy golden rolls stuffed with crab, minced pork, and glass noodles.',
      ],
      subheading: 'How to Eat Bún Chả',
      subList: [
        'Pick up a bite-sized portion of noodles and dunk them into the warm broth bowl.',
        'Pair noodles with a slice of smoky pork, pickled papaya, and fresh fragrant mint.',
        'Add minced fresh garlic and chili into the bowl to customize your heat level.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Bún Chả Hà Nội trứ danh',
      paragraphs: [
        'Bún chả là món ăn mang đậm hồn cốt ẩm thực đất kinh kỳ Thăng Long. Chả miếng và chả băm được nướng xém cạnh trên than hoa đượm khói, thả ngập trong bát nước chấm ấm nóng chua ngọt cùng đu đủ, cà rốt giòn sần sật.',
      ],
      list: [
        'Chả viên & chả miếng: Tẩm ướp đậm đà, nướng than hoa thơm lừng.',
        'Bún lá / bún rối: Sợi bún thanh mát ăn cùng rau sống kinh giới, tía tô, xà lách.',
        'Nem cua bể: Giòn rụm béo ngậy, món ăn kèm không thể thiếu.',
      ],
      subheading: 'Cách thưởng thức bún chả',
      subList: [
        'Gắp một đũa bún và ít rau sống nhúng ngập vào bát nước chấm.',
        'Kèm theo miếng chả nướng và miếng đu đủ giòn tan rồi thưởng thức.',
      ],
    },
  },

  // --- F. 반미 & 반쎄오 (Bánh Mì & Bánh Xèo) ---
  banhmi: {
    id: 'what-is-banhmi',
    icon: '🥖',
    title: 'What is Bánh Mì & Bánh Xèo?',
    tocLabel: 'Bánh Mì & Bánh Xèo',
    ko: {
      label: '한국어 · 반미와 반쎄오란?',
      paragraphs: [
        '반미(Bánh Mì)는 겉은 파삭하고 속은 깃털처럼 가벼운 바게트에 고소한 간 파테(Pâté), 마요네즈, 신선한 오이, 고수, 새콤한 무·당근 절임(Đồ chua)과 다양한 고기(돼지구이, 햄, 차슈 등)를 채워 넣은 베트남식 샌드위치입니다.',
        '반쎄오(Bánh Xèo)는 쌀가루와 강황 가루, 코코넛 밀크 반죽을 기름 두른 팬에 얇게 부쳐 숙주와 새우, 삼겹살을 넣은 베트남식 크레페로, 바삭한 전을 상추나 라이스페이퍼에 말아 소스에 찍어 먹습니다.',
      ],
      list: [
        '반미의 핵심: 바삭한 빵의 질감과 매콤달콤한 소스, 파테의 녹진함이 어우러진 맛의 밸런스.',
        '반쎄오의 핵심: 노릇노릇하고 바삭한 테두리와 푸짐한 신선 야채를 쌈으로 즐기는 건강한 식문화.',
      ],
      subheading: '식사 & 포장 팁',
      subList: [
        '반미는 갓 구워 따뜻할 때 바로 먹어야 바삭한 식감을 제대로 즐길 수 있습니다. 고수를 못 드신다면 "콤 쪼 라우 무이(Không cho rau mùi)"라고 요청하세요.',
        '반쎄오는 가위로 먹기 좋은 크기로 잘라 상추와 허브에 얹고 돌돌 말아 느억맘 소스에 푹 찍어 드세요.',
      ],
    },
    en: {
      label: 'English · Bánh Mì & Bánh Xèo Essentials',
      paragraphs: [
        'Bánh Mì is Vietnam’s world-famous baguette sandwich: a featherlight, ultra-crispy crust packed with rich pork liver pâté, creamy mayo, crisp cucumber, cilantro, tangy pickled daikon and carrot, and savory grilled meats.',
        'Bánh Xèo ("Sizzling Pancake") is a crisp golden crepe made from rice flour, turmeric, and coconut milk, filled with tender pork slices, sweet prawns, and fresh bean sprouts, eaten wrapped in lettuce and rice paper.',
      ],
      list: [
        'Bánh Mì: The ultimate harmony of French colonial baking and vibrant Vietnamese street herbs.',
        'Bánh Xèo: Crisp textures wrapped in leafy greens, balancing indulgence with freshness.',
      ],
      subheading: 'Pro Tips',
      subList: [
        'Eat Bánh Mì fresh within 20 minutes to enjoy the iconic crispy crust.',
        'To ask for no cilantro, say "Không cho rau mùi" (Northern) or "Không cho ngò rí" (Southern).',
        'Wrap Bánh Xèo in mustard greens or lettuce leaves before dipping into sweet chili garlic fish sauce.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Bánh Mì & Bánh Xèo',
      paragraphs: [
        'Bánh mì Việt Nam nổi danh khắp năm châu với lớp vỏ giòn rụm, ruột xốp nhẹ quyện cùng pa-tê béo bùi, bơ thơm ngậy, thịt xá xíu/thịt nướng, dưa leo, ngò rí và đồ chua thanh mát.',
        'Bánh xèo miền Tây giòn tan sắc vàng nghệ, đượm vị béo nước cốt dừa, ôm trọn nhân tôm thịt và giá đỗ tươi giòn.',
      ],
      list: [
        'Bánh mì: Đậm đà, tiện lợi, bản giao hưởng hoàn hảo của ẩm thực đường phố.',
        'Bánh xèo: Cuộn cùng bánh tráng, rau rừng, đọt xoài và chấm nước mắm chua ngọt.',
      ],
      subheading: 'Lưu ý khi thưởng thức',
      subList: [
        'Nên ăn khi bánh vừa ra lò còn nóng giòn để cảm nhận trọn vẹn hương vị tuyệt đỉnh.',
      ],
    },
  },

  // --- G. 기원 & 푸꾸옥 식문화 (Origins & Food Culture) ---
  origins: {
    id: 'food-origins-culture',
    icon: '📜',
    title: 'Origins & Phu Quoc Food Culture',
    tocLabel: 'Origins & History',
    ko: {
      label: '한국어 · 푸꾸옥의 식문화와 유래',
      paragraphs: [
        '베트남 최남단에 위치한 섬 푸꾸옥은 풍부한 일조량과 해양 환경을 바탕으로 독자적인 지역 식문화를 발전시켜 왔습니다.',
        '바다에서 어획한 해산물을 조리하는 방식과 함께, 현지에서 재배되는 천연 흑후추와 전통 목통 발효 피시소스(Nước mắm)가 주요 식재료로 사용됩니다.',
      ],
      list: [
        '푸꾸옥 전통 피시소스: 멸치와 바다 소금을 나무통에서 장기간 자연 발효시켜 만드는 푸꾸옥 전통 발효 조미료.',
        '푸꾸옥 후추(Tiêu Phú Quốc): 향과 매운맛의 여운이 뚜렷하여 베트남 국내외에서 널리 활용되는 지역 특산 후추.',
        '나이트마켓 & 선셋 다이닝: 해질녘 바다 전망과 함께 신선한 해산물 요리를 즐기는 선셋타운의 식문화.',
      ],
    },
    en: {
      label: 'English · Phu Quoc Heritage & Food Culture',
      paragraphs: [
        'Located in the Gulf of Thailand, Phu Quoc Island has developed a distinct culinary identity shaped by coastal marine harvests, local agriculture, and traditional food-making techniques.',
        'The island\'s cuisine highlights fresh seafood complemented by two staple specialties: traditional barrel-fermented fish sauce (Nước mắm) and aromatic sun-dried black peppercorns.',
      ],
      list: [
        'Phu Quoc Fish Sauce: Traditional fish sauce fermented in wooden vats with anchovies and sea salt according to island traditions.',
        'Phu Quoc Peppercorns: Celebrated for citrusy floral notes and warm heat, widely used in regional Vietnamese cooking.',
        'Sunset Dining Tradition: Enjoying fresh seafood dishes on seaside promenades as dusk sets over the sea.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Văn hóa ẩm thực đảo ngọc',
      paragraphs: [
        'Phú Quốc được biết đến với nền ẩm thực biển đảo phong phú cùng các đặc sản truyền thống: nước mắm cá cơm lên men thùng gỗ và hồ tiêu thơm cay.',
      ],
      list: [
        'Nước mắm Phú Quốc: Sản phẩm truyền thống ủ chượp từ cá cơm than và muối biển trong thùng gỗ.',
        'Hồ tiêu Phú Quốc: Hạt tiêu thơm cay đặc trưng, gia vị chủ đạo của vùng đảo.',
      ],
    },
  },

  // --- H. 맛있게 먹는 법 & 소스 페어링 (How to Eat & Sauces) ---
  howToEat: {
    id: 'how-to-eat-local',
    icon: '🍳',
    title: 'How to Eat Like a Local & Sauce Guide',
    tocLabel: 'How to Eat',
    ko: {
      label: '한국어 · 현지인처럼 맛있게 먹는 법 & 소스 백과',
      paragraphs: [
        '베트남 요리는 식탁 위에 놓인 다양한 소스와 허브, 생라임을 손님이 직접 조합하여 나만의 황금 비율을 완성하는 참여형 미식입니다.',
      ],
      list: [
        '느억맘 참(Nước mắm chấm): 피시소스에 물, 설탕, 라임 즙, 다진 마늘과 고추를 섞은 마법의 만능 디핑 소스. 튀김, 쌀국수 면, 구이에 곁들입니다.',
        '무이 띠에우 짠(Muối tiêu chanh): 푸꾸옥 후추 소금에 생라임 즙을 듬뿍 짠 것으로, 해산물과 닭고기에 곁들여 먹는 대표적인 소스 조합입니다.',
        '신선한 허브(Rau thơm): 바질(Húng quế), 쿨란트로(Ngò gai), 민트, 어성초 등 향채를 손으로 찢어 국물에 넣거나 쌈에 곁들이면 소화와 풍미를 돕습니다.',
      ],
      subheading: '선셋타운 식당 이용 안내',
      subList: [
        '얼음(Đá): 베트남에서는 맥주와 음료에 큰 원통형 얼음을 넣어 마십니다. 위생적인 식당에서는 정제 튜브 얼음을 제공합니다.',
        '물티슈(Khăn lạnh): 식탁에 놓인 비닐 포장 물티슈는 매장 정책에 따라 소액의 비용이 추가될 수 있으니 영수증을 확인하세요.',
      ],
    },
    en: {
      label: 'English · How to Eat Like a Local',
      paragraphs: [
        'Vietnamese dining is inherently interactive. The tabletop is always filled with fresh herbs, fiery birds-eye chilies, limes, and condiments for you to tune every bite to perfection.',
      ],
      list: [
        'Nước Mắm Chấm: Sweet, sour, salty, and spicy diluted fish sauce dipping sauce for rolls, meats, and noodles.',
        'Muối Tiêu Chanh: Salt, cracked local pepper, and fresh lime juice—the gold standard condiment for all steamed seafood.',
        'Fresh Herb Platter: Tear Thai basil and sawtooth coriander by hand into hot soups to release aromatic essential oils.',
      ],
      subheading: 'Local Dining Etiquette & Tips',
      subList: [
        'Ice with Beer: It is local tradition to pour beer over a giant ice cube in your glass to stay refreshing in tropical warmth.',
        'Wet Towels (Khăn lạnh): Packaged wet wipes on tables are common and may carry a small charge depending on restaurant policy.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Bí quyết ăn ngon chuẩn người bản địa',
      paragraphs: [
        'Ẩm thực Việt Nam đề cao sự cân bằng âm dương và tính tương tác. Bàn ăn luôn đầy ắp các loại gia vị để thực khách tự nêm nếm theo khẩu vị riêng.',
      ],
      list: [
        'Nước mắm chua ngọt: Linh hồn của các món cuốn, bún và bánh.',
        'Muối tiêu chanh / Muối ớt xanh: Chấm hải sản luộc, nướng thơm lừng.',
        'Rau thơm tươi sống: Tăng cường hương vị và hỗ trợ tiêu hóa tuyệt vời.',
      ],
    },
  },

  // --- I. 식품 안전 & 보관 안내 (Storage & Safety) ---
  safety: {
    id: 'food-safety-tips',
    icon: '❄️',
    title: 'Food Freshness & Dining Safety',
    tocLabel: 'Food Safety',
    ko: {
      label: '한국어 · 신선도 & 위생 안내',
      paragraphs: [
        '푸꾸옥의 열대 기후 특성상 신선하고 안전한 미식 경험을 위해 아래 기본 지침을 참고해 주세요.',
      ],
      list: [
        '해산물 익힘: 굴, 조개류, 오징어 등 해산물은 가급적 속까지 충분히 익힌 요리를 권장합니다.',
        '포장/테이크아웃: 반미나 구이 요리를 포장한 경우 2시간 이내에 드시는 것이 가장 바삭하고 안전합니다.',
        '생수 음용: 식당에서 제공하는 차(Trà đá)는 안전하게 끓인 물이지만, 민감하신 분은 밀봉된 생수(Nước suối)를 주문하세요.',
      ],
    },
    en: {
      label: 'English · Dining Safety & Storage',
      paragraphs: [
        'Phu Quoc enjoys a warm tropical climate year-round. Keep these simple safety pointers in mind for the best culinary experience.',
      ],
      list: [
        'Cooked through: Ensure shellfish, prawns, and squid are thoroughly cooked before eating.',
        'Takeaway: Consume takeaway bánh mì, skewers, or meals within 2 hours of purchase.',
        'Bottled Water: Chilled iced tea (Trà đá) is widely served; however, sensitive travelers may prefer sealed bottled mineral water.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · An toàn thực phẩm & Lưu ý',
      paragraphs: [
        'Để chuyến du lịch Phú Quốc luôn trọn vẹn và an toàn, quý khách hãy lưu ý những điều sau khi thưởng thức ẩm thực.',
      ],
      list: [
        'Ăn chín uống sôi: Thưởng thức hải sản được chế biến chín kỹ.',
        'Bảo quản mang về: Dùng ngay trong vòng 2 tiếng sau khi mua để giữ độ giòn ngon.',
      ],
    },
  },

  // --- J. 주문 & 배달 / 이용 팁 (Ordering & Tips) ---
  ordering: {
    id: 'ordering-delivery-tips',
    icon: '🛵',
    title: 'Ordering, Delivery & Sunset Town Tips',
    tocLabel: 'Ordering & Tips',
    ko: {
      label: '한국어 · 선셋타운 매장 이용 & 배달 안내',
      paragraphs: [
        '선셋타운(Sunset Town) 내 대부분의 식당은 매장 식사뿐만 아니라 포장 및 인근 리조트/호텔 배달 서비스를 제공합니다.',
      ],
      list: [
        '피크 시간 안내: 일몰 시간대 및 공연 전후는 매장 이용객이 증가할 수 있으므로 예약 가능 여부를 확인하세요.',
        '배달 주문: 호텔 프런트나 배달 앱(GrabFood), 메신저 채널을 통해 숙소로 배달받으실 수 있습니다.',
        '결제 수단: 베트남 동(VND) 현금, 국제 신용카드(Visa/Mastercard), 현지 QR 계좌이체(VietQR)가 널리 사용됩니다.',
      ],
    },
    en: {
      label: 'English · Ordering & Sunset Town Dining Tips',
      paragraphs: [
        'Most restaurants across Sunset Town accommodate dine-in, takeaway, and delivery to nearby hotels and villas.',
      ],
      list: [
        'Peak Hours: Sunset and showtimes often see higher customer volumes; reservations are recommended where available.',
        'Delivery: Order via GrabFood, WhatsApp, or Zalo directly to your hotel lobby.',
        'Payment: Cash (VND), international credit cards (Visa/Mastercard), and VietQR payments are widely accepted.',
      ],
    },
    vi: {
      label: 'Tiếng Việt · Hướng dẫn đặt món & Giao hàng',
      paragraphs: [
        'Hầu hết các nhà hàng tại Thị trấn Hoàng Hôn đều phục vụ ăn tại chỗ, mua mang về và giao hàng tận nơi tới các resort/khách sạn lân cận.',
      ],
      list: [
        'Khung giờ cao điểm: Thời điểm hoàng hôn và trước sau các sự kiện biểu diễn thường đông khách, nên liên hệ trước.',
        'Hình thức thanh toán: Tiền mặt VND, thẻ quốc tế và quét mã chuyển khoản QR tiện lợi.',
      ],
    },
  },
}

// 2. 비즈니스별 적합한 음식 가이드 섹션 리스트를 자동으로 구성하는 함수
export function getFoodGuideForBusiness(
  business: any,
  menuData: any
): { eyebrow: string; introText: string; sections: FoodGuideSectionData[] } {
  const category = (business.category || '').toLowerCase()
  const subcategory = (business.subcategory || '').toLowerCase()
  const name = `${business.public_name || ''} ${business.google_maps_name || ''}`.toLowerCase()
  const tags = (business.tags || []).map((t: string) => String(t).toLowerCase())

  // 메뉴 아이템 텍스트 수집
  const menuTextParts: string[] = []
  if (menuData && menuData.sections) {
    for (const sec of menuData.sections) {
      menuTextParts.push(sec.title)
      for (const item of sec.items) {
        menuTextParts.push(item.name_original || '')
        menuTextParts.push(item.name_ko || '')
        menuTextParts.push(item.description_original || '')
        menuTextParts.push(item.description_ko || '')
      }
    }
  }
  const fullSearchString = `${name} ${category} ${subcategory} ${tags.join(' ')} ${menuTextParts.join(' ')}`.toLowerCase()

  const selectedSections: FoodGuideSectionData[] = []

  // 1. 곱창 / K-BBQ / 한국 요리 체크
  if (
    fullSearchString.includes('gopchang') ||
    fullSearchString.includes('곱창') ||
    fullSearchString.includes('대창') ||
    fullSearchString.includes('막창') ||
    fullSearchString.includes('korean') ||
    fullSearchString.includes('한식') ||
    fullSearchString.includes('k-bbq') ||
    fullSearchString.includes('삼겹살')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.gopchang)
  }

  // 2. 분쿼이 체크
  if (
    fullSearchString.includes('quậy') ||
    fullSearchString.includes('quay') ||
    fullSearchString.includes('분쿼이') ||
    fullSearchString.includes('kiến xây')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.bunquay)
  }

  // 3. 해산물 / 함닌 꽃게 체크
  if (
    fullSearchString.includes('seafood') ||
    fullSearchString.includes('hải sản') ||
    fullSearchString.includes('해산물') ||
    fullSearchString.includes('ghẹ') ||
    fullSearchString.includes('flower crab') ||
    fullSearchString.includes('꽃게') ||
    fullSearchString.includes('tôm') ||
    fullSearchString.includes('mực') ||
    fullSearchString.includes('조개')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.seafood)
  }

  // 4. 쌀국수(Phở) 체크
  if (
    fullSearchString.includes('phở') ||
    fullSearchString.includes('pho ') ||
    fullSearchString.includes('쌀국수') ||
    fullSearchString.includes('noodle')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.pho)
  }

  // 5. 분짜 체크
  if (
    fullSearchString.includes('bún chả') ||
    fullSearchString.includes('buncha') ||
    fullSearchString.includes('분짜') ||
    fullSearchString.includes('nem rán')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.buncha)
  }

  // 6. 반미 / 반쎄오 체크
  if (
    fullSearchString.includes('bánh mì') ||
    fullSearchString.includes('banh mi') ||
    fullSearchString.includes('반미') ||
    fullSearchString.includes('bánh xèo') ||
    fullSearchString.includes('banh xeo') ||
    fullSearchString.includes('반쎄오')
  ) {
    selectedSections.push(FOOD_KNOWLEDGE_ENTRIES.banhmi)
  }

  // 기본 필수 문화 섹션 (역사, 먹는법, 안전, 주문팁)
  // 중복 없이 추가
  const defaultKeys = ['origins', 'howToEat', 'safety', 'ordering']
  for (const k of defaultKeys) {
    const sec = FOOD_KNOWLEDGE_ENTRIES[k]
    if (!selectedSections.some((s) => s.id === sec.id)) {
      selectedSections.push(sec)
    }
  }

  // 식당 특성에 맞춘 Eyebrow
  let eyebrow = 'Phu Quoc & Vietnamese Food Guide'
  if (selectedSections.some((s) => s.id === 'what-is-gopchang')) {
    eyebrow = 'Korean Culinary & Food Guide'
  } else if (category === 'cafe') {
    eyebrow = 'Vietnamese Coffee & Beverage Guide'
  }

  return {
    eyebrow,
    introText: 'Korean first, followed by English and Vietnamese.',
    sections: selectedSections,
  }
}

// 3. 개별 메뉴 단품에 대한 일반적 설명 보충 (가게 고유 특색을 몰라도 식재료/음식 기본 지식 제공)
export function enrichDishDescription(
  nameOriginal: string,
  nameKo: string | null,
  currentDescKo: string | null,
  currentDescEn: string | null
): { descKo: string | null; descEn: string | null } {
  // 이미 충분한 설명이 있으면 유지
  if (currentDescKo && currentDescKo.length > 15) {
    return { descKo: currentDescKo, descEn: currentDescEn }
  }

  const text = `${nameOriginal} ${nameKo || ''}`.toLowerCase()

  if (text.includes('gopchang') || text.includes('곱창')) {
    return {
      descKo:
        '소의 작은창자로 안쪽에 고소한 곱이 가득 차 있으며, 겉은 바삭하고 속은 녹진하게 구워내는 한국의 대표적인 철판 구이 요리입니다.',
      descEn:
        'Cleaned and parboiled beef small intestine grilled to crispy exterior and rich, savory nutty center.',
    }
  }
  if (text.includes('daechang') || text.includes('대창')) {
    return {
      descKo:
        '소의 큰창자로 두툼하고 풍부한 육즙과 부드러운 고소함이 일품이며, 겉을 바삭하게 구워 소스에 찍어 먹습니다.',
      descEn:
        'Beef large intestine boasting luscious richness, melt-in-your-mouth tenderness, and charred edges.',
    }
  }
  if (text.includes('nakgopsae') || text.includes('낙곱새')) {
    return {
      descKo:
        '낙지, 소곱창, 새우를 비법 양념과 채소, 당면과 함께 자작하게 끓여 밥에 비벼 먹는 부산식 매콤 해물 전골입니다.',
      descEn:
        'Spicy skillet stew combining tender octopus, beef intestines, and plump shrimp, spooned over hot rice.',
    }
  }
  if (text.includes('quậy') || text.includes('quay') || text.includes('분쿼이')) {
    return {
      descKo:
        '푸꾸옥 특산 즉석 압출 생면에 그릇에 바른 생새우·생선 페이스트를 뜨거운 육수로 익혀내고, 직접 만든 칼라만시 소스에 찍어 먹는 시그니처 국수입니다.',
      descEn:
        'Phu Quoc signature stirred noodles with freshly pressed rice vermicelli, quick-cooked shrimp paste, and DIY calamansi dipping emulsion.',
    }
  }
  if (text.includes('phở bò') || text.includes('소고기 쌀국수') || text.includes('pho bo')) {
    return {
      descKo:
        '사골과 양지를 천연 향신료(팔각, 계피, 생강)와 함께 10시간 이상 푹 고아낸 깊은 육수에 얇게 저민 소고기를 얹은 베트남 전통 쌀국수입니다.',
      descEn:
        'Traditional flat rice noodle soup in an aromatic 10-hour beef bone broth topped with tender beef slices and herbs.',
    }
  }
  if (text.includes('bún chả') || text.includes('분짜')) {
    return {
      descKo:
        '숯불에 구워 불향 가득한 돼지고기 완자와 삼겹살을 새콤달콤한 따뜻한 피시소스에 적셔 쌀국수 면, 신선한 야채와 함께 즐기는 하노이 명물입니다.',
      descEn:
        'Smoky charcoal-grilled pork patties and belly in warm tangy fish sauce broth, paired with rice vermicelli and leafy herbs.',
    }
  }
  if (text.includes('bánh mì') || text.includes('반미')) {
    return {
      descKo:
        '바삭한 베트남식 바게트 속에 파테, 마요네즈, 오이, 절인 무·당근, 신선한 고수와 특제 육류를 듬뿍 넣은 국민 샌드위치입니다.',
      descEn:
        'Crispy baguette sandwich stuffed with savory meat, rich pâté, pickled daikon-carrot, and fresh cilantro.',
    }
  }
  if (text.includes('bánh xèo') || text.includes('반쎄오')) {
    return {
      descKo:
        '강황과 쌀가루 반죽을 얇고 바삭하게 부쳐 새우, 돼지고기, 숙주를 감싸고, 상추와 허브에 말아 새콤달콤한 느억맘에 찍어 먹는 베트남식 부침개입니다.',
      descEn:
        'Crispy turmeric rice crepe filled with shrimp, pork, and bean sprouts, wrapped in leafy greens and dipped in fish sauce.',
    }
  }
  if (text.includes('cơm chiên') || text.includes('볶음밥') || text.includes('fried rice')) {
    return {
      descKo:
        '고슬고슬한 밥알에 신선한 해산물 또는 육류와 계란, 야채를 강한 화력의 웍에서 불향을 입혀 볶아낸 요리입니다.',
      descEn:
        'Wok-fried jasmine rice tossed with fresh seafood or meat, eggs, and crisp vegetables over high heat.',
    }
  }
  if (text.includes('nem') || text.includes('chả giò') || text.includes('스프링롤') || text.includes('spring roll')) {
    return {
      descKo:
        '라이스페이퍼에 다진 돼지고기, 버섯, 당면, 야채를 정갈하게 말아 겉은 파삭하고 속은 촉촉하게 튀겨낸 베트남식 롤 튀김입니다.',
      descEn:
        'Crisp golden rice paper rolls packed with seasoned minced pork, glass noodles, and mushrooms.',
    }
  }
  if (text.includes('ghẹ') || text.includes('flower crab') || text.includes('꽃게')) {
    return {
      descKo:
        '푸꾸옥 함닌 청정 해역에서 잡은 꽃게로 살이 단단하고 단맛이 강하며, 레몬그라스 찜이나 푸꾸옥 후추 소금에 찍어 먹습니다.',
      descEn:
        'Wild Phu Quoc flower crab known for intensely sweet, firm meat, gently steamed with fragrant lemongrass.',
    }
  }
  if (text.includes('mực') || text.includes('squid') || text.includes('오징어') || text.includes('한치')) {
    return {
      descKo:
        '푸꾸옥 밤바다에서 낚아 올린 신선한 오징어로 쫄깃하고 달큼한 감칠맛이 특징이며, 구이나 찜, 튀김으로 제공됩니다.',
      descEn:
        'Fresh local squid caught in surrounding island waters, cooked to tender perfection with lime and pepper salt.',
    }
  }

  return {
    descKo: currentDescKo || '엄선된 로컬 식재료로 조리한 요리입니다.',
    descEn: currentDescEn || 'Crafted with carefully selected local ingredients.',
  }
}
