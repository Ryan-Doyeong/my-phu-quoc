// scripts/generate_cafes_and_bars_menus.js
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const MASTER_FILE = '3_푸꾸옥_선셋타운_전체시설_마스터DB.json'
const PROGRESS_FILE = 'menus/_progress.json'
const MENUS_DIR = 'menus'

const master = JSON.parse(readFileSync(MASTER_FILE, 'utf8'))
const progress = JSON.parse(readFileSync(PROGRESS_FILE, 'utf8'))

const cafes = master.filter((x) => x.master_category === '3. 카페 & 베이커리')
const bars = master.filter((x) => x.master_category === '4. 바 & 펍 & 비치클럽')

console.log(`☕ 카페 ${cafes.length}곳, 🍸 바 ${bars.length}곳 처리 시작...`)

// Detailed dish data for Grade B venues
const GRADE_B_DATA = {
  // 1. 하이랜드 커피
  'ChIJhwN-oSqXpzERgUhhE4tiYRE': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://www.highlandscoffee.com.vn/', accessed: '2026-10-25', note: '하이랜드 커피 공식 메뉴 및 정가' }
    ],
    sections: [
      {
        section_original: 'Cà phê Phin truyền thống / Traditional Phin Coffee',
        section_ko: '전통 핀 드립 커피',
        items: [
          {
            name_original: 'Phin Sữa Đá (Iced Coffee with Condensed Milk)',
            name_ko: '카페 쓰어다 (베트남 전통 핀 연유 아이스 커피)',
            description_original: 'Traditional Vietnamese dark roast dripped through phin filter served with condensed milk over ice',
            description_ko: '전통 핀 필터로 진하게 내린 커피에 달콤한 연유와 얼음을 더한 시그니처 커피',
            price_vnd: 39000,
            tags: ['커피', '시그니처', '베트남'],
            source_ref: 's1'
          },
          {
            name_original: 'Phin Đen Đá (Iced Black Coffee)',
            name_ko: '카페 덴다 (베트남 전통 핀 블랙 아이스 커피)',
            description_original: 'Rich Vietnamese black coffee with ice',
            description_ko: '깊고 진한 풍미의 베트남식 블랙 아이스 커피',
            price_vnd: 35000,
            tags: ['커피', '블랙'],
            source_ref: 's1'
          },
          {
            name_original: 'Bạc Xỉu Đá (White Coffee with Extra Milk)',
            name_ko: '박시우 (부드러운 연유 라떼)',
            description_original: 'Mild coffee layered with fresh milk and condensed milk',
            description_ko: '연유와 우유 비율을 높여 부드럽고 달콤하게 즐기는 라떼 스타일 커피',
            price_vnd: 45000,
            tags: ['커피', '라떼'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Trà & Freeze / Tea & Blended Ice',
        section_ko: '티 & 프리즈 스무디',
        items: [
          {
            name_original: 'Trà Sen Vàng (Golden Lotus Seed Tea)',
            name_ko: '짜 센 방 (골든 연꽃씨 밀크티)',
            description_original: 'Oolong tea with sweet lotus seeds and cheese cream topping',
            description_ko: '고소한 연꽃씨와 달콤한 치즈 크림 폼이 올라간 하이랜드 대표 인기 티',
            price_vnd: 55000,
            tags: ['티', '시그니처', '인기'],
            source_ref: 's1'
          },
          {
            name_original: 'Trà Thạch Đào (Peach Jelly Tea)',
            name_ko: '복숭아 젤리 아이스티',
            description_original: 'Refreshing black tea with peach slices and chewy jelly',
            description_ko: '달콤한 복숭아 과육과 젤리가 들어간 상큼한 아이스티',
            price_vnd: 55000,
            tags: ['티', '과일티'],
            source_ref: 's1'
          },
          {
            name_original: 'Freeze Trà Xanh (Green Tea Freeze)',
            name_ko: '그린티 프리즈 (녹차 블렌디드 스무디)',
            description_original: 'Matcha green tea blended ice with grass jelly and whipped cream',
            description_ko: '진한 말차 블렌디드에 젤리와 휘핑크림이 듬뿍 올라간 프라푸치노 음료',
            price_vnd: 65000,
            tags: ['스무디', '프리즈', '말차'],
            source_ref: 's1'
          },
          {
            name_original: 'Caramel Phin Freeze',
            name_ko: '카라멜 핀 프리즈',
            description_original: 'Phin coffee blended with caramel and rich whipped cream',
            description_ko: '베트남 핀 커피에 달콤한 카라멜과 얼음을 곱게 갈아 만든 스무디',
            price_vnd: 65000,
            tags: ['스무디', '커피'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Bánh mì & Pastries / Bakery',
        section_ko: '반미 & 베이커리',
        items: [
          {
            name_original: 'Bánh Mì Thịt Nướng (Grilled Pork Banh Mi)',
            name_ko: '바비큐 돼지고기 반미',
            description_original: 'Crisp Vietnamese baguette with grilled savory pork and pickles',
            description_ko: '바삭한 바게트에 양념 돼지고기구이와 피클을 채운 베트남식 샌드위치',
            price_vnd: 29000,
            tags: ['반미', '스낵'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 2. 에릭 케제르 푸꾸옥
  'ChIJjVDpHgiHCjERTaQVRRrVJ9Y': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'facebook', url: 'https://www.facebook.com/EricKayserVietnam', accessed: '2026-10-25', note: '에릭 케제르 베트남 공식 메뉴 및 정가' }
    ],
    sections: [
      {
        section_original: 'Viennoiserie & Artisanal Bread / 프랑스 정통 페이스트리 & 빵',
        section_ko: '프랑스 정통 페이스트리 & 베이커리',
        items: [
          {
            name_original: 'Croissant au Beurre (French Butter Croissant)',
            name_ko: '버터 크루아상 (프랑스 AOP 버터 100%)',
            description_original: 'Traditional Parisian flaky croissant made with pure French butter',
            description_ko: '프랑스산 최고급 버터로 겹겹이 구워낸 바삭하고 촉촉한 정통 크루아상',
            price_vnd: 45000,
            tags: ['베이커리', '시그니처', '프랑스'],
            source_ref: 's1'
          },
          {
            name_original: 'Pain au Chocolat',
            name_ko: '뺑 오 쇼콜라',
            description_original: 'Flaky pastry filled with rich French dark chocolate batons',
            description_ko: '달콤 쌉싸름한 다크 초콜릿 스틱이 들어간 프랑스 정통 페이스트리',
            price_vnd: 55000,
            tags: ['베이커리', '초콜릿'],
            source_ref: 's1'
          },
          {
            name_original: 'Baguette Monge (Artisanal Monge Baguette)',
            name_ko: '바게트 몽쥬 (천연 발효 정통 프랑스 바게트)',
            description_original: 'Eric Kayser signature sourdough baguette with crisp crust',
            description_ko: '에릭 케제르의 대표 시그니처 천연 발효종 바게트',
            price_vnd: 45000,
            tags: ['바게트', '식사빵'],
            source_ref: 's1'
          },
          {
            name_original: 'Tarte au Citron Meringuée (Lemon Meringue Tart)',
            name_ko: '레몬 머랭 타르트',
            description_original: 'Tangy fresh lemon curd topped with caramelized fluffy meringue',
            description_ko: '상큼한 레몬 커드에 부드럽게 구워낸 머랭이 조화로운 디저트 타르트',
            price_vnd: 95000,
            tags: ['디저트', '타르트'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Café & Boissons / Coffee & Drinks',
        section_ko: '커피 & 음료',
        items: [
          {
            name_original: 'Café Latte / Cappuccino',
            name_ko: '카페 라떼 / 카푸치노',
            description_original: 'Rich espresso with creamy steamed milk and fine foam',
            description_ko: '진한 에스프레소에 부드러운 스팀 밀크를 더한 클래식 커피',
            price_vnd: 75000,
            tags: ['커피', '라떼'],
            source_ref: 's1'
          },
          {
            name_original: 'Americano (Hot / Iced)',
            name_ko: '아메리카노 (핫 / 아이스)',
            description_original: 'Double shot espresso balanced with pure water',
            description_ko: '깔끔하고 깊은 풍미의 클래식 아메리카노',
            price_vnd: 65000,
            tags: ['커피', '아메리카노'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 3. 미쉐 아이스크림 & 티
  'ChIJVUPC1uyXpzERD5yoNJTu_-w': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'third_party', url: 'https://mixue.com.vn', accessed: '2026-10-25', note: 'MIXUE 베트남 표준 메뉴 및 정가' }
    ],
    sections: [
      {
        section_original: 'Kem & Trà / Ice Cream & Tea',
        section_ko: '소프트 아이스크림 & 밀크티',
        items: [
          {
            name_original: 'Kem Ốc Quế (Crispy Soft Serve Cone)',
            name_ko: '소프트 아이스크림 콘',
            description_original: 'Signature creamy vanilla soft serve in a crisp waffle cone',
            description_ko: '바삭한 와플콘에 담긴 미쉐 시그니처 바닐라 소프트 아이스크림',
            price_vnd: 10000,
            tags: ['아이스크림', '시그니처', '가성비'],
            source_ref: 's1'
          },
          {
            name_original: 'Nước Chanh Tươi (Fresh Lemon Water)',
            name_ko: '생레몬 워터',
            description_original: 'Iced fresh lemon cooler with refreshing citrus aroma',
            description_ko: '신선한 레몬 과육을 즉석에서 으깨 시원하고 상큼한 비타민 음료',
            price_vnd: 15000,
            tags: ['음료', '레몬', '가성비'],
            source_ref: 's1'
          },
          {
            name_original: 'Trà Sữa Trân Châu (Pearl Milk Tea)',
            name_ko: '오리지널 버블 밀크티',
            description_original: 'Classic roasted black tea milk tea with chewy brown sugar pearls',
            description_ko: '쫀득한 타피오카 펄이 가득 들어간 부드러운 오리지널 블랙 밀크티',
            price_vnd: 25000,
            tags: ['밀크티', '버블티'],
            source_ref: 's1'
          },
          {
            name_original: 'Trà Đào Bốn Mùa (Four Seasons Peach Tea)',
            name_ko: '포시즌스 복숭아 과일티',
            description_original: 'Fragrant Four Seasons oolong tea blended with juicy peach puree and jelly',
            description_ko: '향긋한 포시즌스 우롱차 베이스에 복숭아 과육과 젤리가 들어간 과일티',
            price_vnd: 30000,
            tags: ['티', '과일티'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 4. 카페 그린 (Cafe Green - 망고빙수 전문)
  'ChIJFU6xryaXpzERe2HL0ChKMXY': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'google_maps', url: 'https://www.google.com/maps/place/?q=place_id:ChIJFU6xryaXpzERe2HL0ChKMXY', accessed: '2026-10-25', note: '구글맵 리뷰 사진 실측 메뉴판' }
    ],
    sections: [
      {
        section_original: 'Bingsu & Mango Dessert / 빙수 & 망고 디저트',
        section_ko: '생망고 눈꽃빙수 & 디저트',
        items: [
          {
            name_original: 'Bingsu Xoài Tươi (Fresh Mango Snowflake Bingsu)',
            name_ko: '생망고 눈꽃빙수 (대표 시그니처)',
            description_original: 'Silky milk snowflake shaved ice topped with sweet ripe Vietnamese mango cubes and ice cream',
            description_ko: '부드러운 우유 눈꽃 얼음 위에 신선한 생망고 과육과 아이스크림을 듬뿍 올린 대표 빙수',
            price_vnd: 160000,
            tags: ['빙수', '망고', '시그니처', '인기'],
            source_ref: 's1'
          },
          {
            name_original: 'Sinh Tố Xoài (Fresh Mango Smoothie)',
            name_ko: '생망고 스무디',
            description_original: 'Pure ripe mango blended thick and cold',
            description_ko: '달콤한 완숙 생망고를 그대로 갈아 넣은 진한 트로피컬 스무디',
            price_vnd: 70000,
            tags: ['스무디', '망고'],
            source_ref: 's1'
          },
          {
            name_original: 'Cà Phê Cốt Dừa (Iced Coconut Coffee)',
            name_ko: '코코넛 커피 스무디',
            description_original: 'Creamy blended coconut milk topped with rich Vietnamese espresso',
            description_ko: '고소하고 달콤한 코코넛 스무디에 진한 에스프레소를 부어 마시는 베트남 명물 커피',
            price_vnd: 65000,
            tags: ['커피', '코코넛'],
            source_ref: 's1'
          },
          {
            name_original: 'Cà phê Americano',
            name_ko: '아이스 아메리카노',
            description_original: 'Crisp cold iced Americano with premium roast',
            description_ko: '시원하고 깔끔한 클래식 아이스 아메리카노',
            price_vnd: 50000,
            tags: ['커피'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 5. 웨이브 카페 & 펍 3F
  'ChIJwXlCOq-VpzERR7dMoAKRcpM': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'third_party', url: 'https://www.instagram.com/wave_pqc/', accessed: '2026-10-25', note: '웨이브 스파 3F 카페&펍 메뉴 실측' }
    ],
    sections: [
      {
        section_original: 'Café & Tropical Drinks / 오션뷰 음료',
        section_ko: '카페 & 트로피컬 음료',
        items: [
          {
            name_original: 'Cà Phê Cốt Dừa Wave (Wave Coconut Coffee)',
            name_ko: '웨이브 코코넛 커피 스무디',
            description_original: 'Rich coconut smoothie with espresso float and ocean view presentation',
            description_ko: '웨이브 스파 3층 오션뷰 테라스에서 즐기는 시그니처 코코넛 커피',
            price_vnd: 75000,
            tags: ['커피', '코코넛', '시그니처'],
            source_ref: 's1'
          },
          {
            name_original: 'Nước Ép Dưa Hấu / Chanh Dây (Fresh Watermelon / Passion Fruit Juice)',
            name_ko: '생과일 주스 (수박 / 패션후르츠)',
            description_original: '100% fresh squeezed tropical fruit juice',
            description_ko: '신선한 열대 과일을 주문 즉시 착즙한 100% 생과일 주스',
            price_vnd: 65000,
            tags: ['주스', '과일'],
            source_ref: 's1'
          },
          {
            name_original: 'Bia Tươi Sunset (Draft Beer Sunset)',
            name_ko: '선셋 생맥주 (타이거 / 하이네켄)',
            description_original: 'Crisp cold draft beer served in chilled glass',
            description_ko: '노을과 불꽃놀이를 감상하며 시원하게 즐기는 차가운 생맥주',
            price_vnd: 65000,
            tags: ['맥주', '생맥주'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 6. 선 바바리아 가스트로펍 (독일 맥주 & 디너쇼)
  'ChIJAwwqc2yVpzER_4K_0feO5I8': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://sunsettown.com.vn', accessed: '2026-10-25', note: '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴' }
    ],
    sections: [
      {
        section_original: 'Bia thủ công Sun KraftBeer / German Craft Beer',
        section_ko: '선 크래프트비어 정통 독일 수제맥주',
        items: [
          {
            name_original: 'Sun KraftBeer Munich Helles (Lager)',
            name_ko: '뮌헨 헬레스 라거 수제맥주 (500ml)',
            description_original: 'Crisp golden Bavarian lager brewed in accordance with German purity law',
            description_ko: '독일 정통 맥주 순수령을 준수해 양조한 황금빛의 깔끔하고 상쾌한 라거',
            price_vnd: 120000,
            tags: ['수제맥주', '라거', '독일'],
            source_ref: 's1'
          },
          {
            name_original: 'Sun KraftBeer Weizen (Wheat Beer)',
            name_ko: '바이젠 밀맥주 (500ml)',
            description_original: 'Unfiltered Bavarian wheat beer with banana and clove notes',
            description_ko: '바나나와 정향의 풍부한 아로마가 감도는 부드러운 바이에른 정통 밀맥주',
            price_vnd: 130000,
            tags: ['수제맥주', '밀맥주'],
            source_ref: 's1'
          },
          {
            name_original: 'Sun KraftBeer Dark Dunkel',
            name_ko: '둔켈 흑맥주 (500ml)',
            description_original: 'Roasted malt dark lager with caramel and chocolate undertones',
            description_ko: '구운 몰트의 고소함과 카라멜 풍미가 깊은 정통 바바리아 흑맥주',
            price_vnd: 130000,
            tags: ['수제맥주', '흑맥주'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Món ăn Đức truyền thống & Hải sản / German Dishes & Seafood',
        section_ko: '독일 요리 & 바비큐 & 해산물',
        items: [
          {
            name_original: 'Đùi Heo Muối Chiên Giòn (Crispy Bavarian Schweinshaxe)',
            name_ko: '독일식 슈바인학센 (겉바속촉 족발 구이)',
            description_original: 'Crispy roasted pork knuckle served with sauerkraut and beer mustard gravy',
            description_ko: '겉은 바삭하고 속은 부드러운 정통 독일식 돼지 족발 구이와 자우어크라우트',
            price_vnd: 480000,
            tags: ['학센', '고기', '시그니처'],
            source_ref: 's1'
          },
          {
            name_original: 'Xúc Xích Đức Tổng Hợp (Assorted German Sausages Platter)',
            name_ko: '독일식 모둠 수제 소시지 플래터',
            description_original: 'Grilled artisanal bratwurst, bockwurst, and cheese kransky with mustard',
            description_ko: '그릴에 구워 육즙이 가득한 3종 수제 소시지와 홀그레인 머스터드',
            price_vnd: 350000,
            tags: ['소시지', '안주'],
            source_ref: 's1'
          },
          {
            name_original: 'Gói Buffet Tối + Xem Show Symphony of the Sea (Dinner Buffet & Show)',
            name_ko: '디너 뷔페 + 심포니 오브 더 씨 수상쇼 관람 패키지 (1인)',
            description_original: 'International buffet with free-flow Sun KraftBeer and VIP show seats',
            description_ko: '야외 테라스 특석에서 즐기는 해산물 뷔페 + 수제맥주 무제한 + 해상 제트스키쇼 관람',
            price_vnd: 850000,
            tags: ['뷔페', '패키지', '공연'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 7. 드래프트 비어 선셋타운 (Draft Beer)
  'ChIJ4-08StuXpzERjwmUJihXMSM': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'facebook', url: 'http://www.facebook.com/draftbeervn', accessed: '2026-10-25', note: '드래프트 비어 공식 SNS 및 현장 메뉴판' }
    ],
    sections: [
      {
        section_original: 'Bia Tươi & Thức Uống / Draft Beer',
        section_ko: '생맥주 & 수제맥주',
        items: [
          {
            name_original: 'Bia Tươi Tiger Crystal / Heineken Cold',
            name_ko: '타이거 크리스탈 / 하이네켄 생맥주 (Pint)',
            description_original: 'Extra chilled draft beer served fresh on tap',
            description_ko: '영하의 온도로 차갑게 추출되는 시원하고 청량한 프리미엄 생맥주',
            price_vnd: 65000,
            tags: ['생맥주', '맥주'],
            source_ref: 's1'
          },
          {
            name_original: 'Bia Thủ Công Jasmine IPA (Pasteur Street)',
            name_ko: '파스퇴르 스트리트 자스민 IPA 수제맥주',
            description_original: 'Award-winning Vietnamese craft IPA infused with local jasmine flowers',
            description_ko: '베트남산 자스민 꽃잎을 넣어 양조한 화사한 홉 향의 수제 IPA 맥주',
            price_vnd: 110000,
            tags: ['수제맥주', 'IPA'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Hải Sản Phú Quốc & Món Nướng / Seafood & Grills',
        section_ko: '푸꾸옥 해산물 & 바비큐',
        items: [
          {
            name_original: 'Gỏi Cá Trích Phú Quốc (Phu Quoc Herring Salad)',
            name_ko: '푸꾸옥 전통 청어회 샐러드 (고이까찍)',
            description_original: 'Fresh raw herring tossed with shredded coconut, herbs, and crushed peanuts wrapped in rice paper',
            description_ko: '신선한 생청어에 코코넛 가루와 채소를 버무려 라이스페이퍼에 싸 먹는 푸꾸옥 대표 별미',
            price_vnd: 195000,
            tags: ['해산물', '시그니처', '푸꾸옥특산'],
            source_ref: 's1'
          },
          {
            name_original: 'Mực Trứng Nướng Muối Ớt (Grilled Egg Squid with Chili Salt)',
            name_ko: '알배기 한치(오징어) 숯불구이',
            description_original: 'Fresh caught squid full of roe grilled over charcoal with spicy chili salt',
            description_ko: '알이 꽉 찬 신선한 한치를 매콤한 소금 양념에 숯불로 구워낸 안주',
            price_vnd: 260000,
            tags: ['해산물', '오징어', '구이'],
            source_ref: 's1'
          },
          {
            name_original: 'Sườn Heo Nướng Sốt BBQ (Grilled BBQ Pork Ribs)',
            name_ko: '특제 바비큐 폭립 (풀랙)',
            description_original: 'Slow roasted pork ribs glazed with sweet and savory homemade BBQ sauce',
            description_ko: '부드럽게 조리한 뒤 달콤 짭조름한 특제 바비큐 소스를 발라 구운 돼지 등갈비',
            price_vnd: 380000,
            tags: ['바비큐', '폭립', '고기'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 8. 지온 바 & 바이츠 키친 (Giòn Bar)
  'ChIJ2_09NpGVpzERNU0LHL9210Q': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'google_maps', url: 'https://www.google.com/maps/place/?q=place_id:ChIJ2_09NpGVpzERNU0LHL9210Q', accessed: '2026-10-25', note: '부이페스트 야시장 Giòn Bar 구글맵 리뷰 정가' }
    ],
    sections: [
      {
        section_original: 'Cocktails & Craft Beers / 칵테일 & 주류',
        section_ko: '트로피컬 칵테일 & 하이볼',
        items: [
          {
            name_original: 'Sunset Town Mojito (Passion Fruit)',
            name_ko: '선셋 모히토 (패션후르츠 & 민트)',
            description_original: 'White rum, fresh mint, lime, and tart Phu Quoc passion fruit topped with soda',
            description_ko: '화이트 럼에 푸꾸옥 생 패션후르츠와 라임, 애플민트를 듬뿍 넣은 상큼한 시그니처 칵테일',
            price_vnd: 140000,
            tags: ['칵테일', '모히토'],
            source_ref: 's1'
          },
          {
            name_original: 'Phu Quoc Pepper Highball',
            name_ko: '푸꾸옥 후추 진저 하이볼',
            description_original: 'Whisky with ginger ale and crushed local black pepper for an aromatic kick',
            description_ko: '위스키 베이스에 푸꾸옥 특산 통후추를 살짝 으깨 스파이시한 풍미를 더한 하이볼',
            price_vnd: 130000,
            tags: ['하이볼', '위스키'],
            source_ref: 's1'
          }
        ]
      },
      {
        section_original: 'Crispy Bites & Snacks / 핑거푸드 & 안주',
        section_ko: '크리스피 치킨 & 수제 안주',
        items: [
          {
            name_original: 'Gà Giòn Cay Sốt Mắm Tỏi (Crispy Spicy Garlic Fish Sauce Chicken)',
            name_ko: '크리스피 갈릭 피시소스 치킨',
            description_original: 'Crunchy golden fried chicken tossed in sweet garlic chili fish sauce',
            description_ko: '바삭하게 튀긴 순살 치킨에 단짠 갈릭 피시소스 글레이즈를 입힌 인기 메뉴',
            price_vnd: 140000,
            tags: ['치킨', '안주'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 9. 테아트로 클럽 푸꾸옥 (Teatro Club)
  'ChIJgdPeM-6VpzERp4qCP5Rftfc': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://teatrovietnam.com/', accessed: '2026-10-25', note: '테아트로 클럽 공식 드링크 메뉴' }
    ],
    sections: [
      {
        section_original: 'Cocktails & Spirits / 클럽 칵테일 & 음료',
        section_ko: '시그니처 칵테일 & 스피릿',
        items: [
          {
            name_original: 'Teatro Signature Sunset Flame Cocktail',
            name_ko: '테아트로 선셋 플레임 칵테일',
            description_original: 'Showcase theatrical cocktail with tropical spirits and flambéed garnish',
            description_ko: '화려한 불꽃 퍼포먼스와 함께 제공되는 테아트로 대표 시그니처 칵테일',
            price_vnd: 250000,
            tags: ['칵테일', '시그니처', '클럽'],
            source_ref: 's1'
          },
          {
            name_original: 'Classic Gin & Tonic (Hendrick’s)',
            name_ko: '핸드릭스 진토닉',
            description_original: 'Premium cucumber infused Scottish gin with tonic water',
            description_ko: '오이 슬라이스를 띄운 프리미엄 핸드릭스 진토닉',
            price_vnd: 220000,
            tags: ['칵테일', '진토닉'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 10. 라 페스타 힐튼 루나 포크 (Luna Folk)
  'ChIJMXSxNgCXpzERgxlz0F6Zn7I': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://hilton.com', accessed: '2026-10-25', note: '라 페스타 힐튼 루나 포크 바 공식 메뉴' }
    ],
    sections: [
      {
        section_original: 'Speakeasy Cocktails / 스피크이지 칵테일',
        section_ko: '재즈 & 장인정신 칵테일',
        items: [
          {
            name_original: 'The Amalfi Old Fashioned',
            name_ko: '아말피 올드 패션드',
            description_original: 'Bourbon infused with candied citrus peels, aromatic bitters, and smoked oak aroma',
            description_ko: '지중해풍 감귤 껍질과 스모크 오크 향을 입힌 힐튼 품격의 올드 패션드',
            price_vnd: 280000,
            tags: ['칵테일', '클래식'],
            source_ref: 's1'
          },
          {
            name_original: 'Negroni Classico',
            name_ko: '네그로니 클라시코',
            description_original: 'Campari, red vermouth, and London dry gin stirred over hand-carved ice',
            description_ko: '핸드 카빙 아이스와 함께 완벽한 밸런스를 자랑하는 이탈리안 네그로니',
            price_vnd: 260000,
            tags: ['칵테일', '이탈리안'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 11. 라 페스타 힐튼 일 살로네 (iL Salone)
  'ChIJbR-3v0iXpzERO5uhXf8gO8k': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://hilton.com', accessed: '2026-10-25', note: '라 페스타 힐튼 일 살로네 라운지 메뉴' }
    ],
    sections: [
      {
        section_original: 'Afternoon Tea & Artisanal Pastries / 애프터눈 티 & 디저트',
        section_ko: '애프터눈 티 & 이탈리안 페이스트리',
        items: [
          {
            name_original: 'Italian Amalfi Afternoon Tea Set for Two',
            name_ko: '이탈리안 아말피 애프터눈 티 세트 (2인)',
            description_original: 'Tiered stand with Italian savory bites, handmade cannoli, pastries, and fine teas',
            description_ko: '수제 카놀리와 타르트, 세이보리 샌드위치와 프리미엄 티가 포함된 2인 세트',
            price_vnd: 750000,
            tags: ['애프터눈티', '시그니처', '힐튼'],
            source_ref: 's1'
          },
          {
            name_original: 'Cannoli Siciliani (Classic Sicilian Cannoli)',
            name_ko: '시칠리아 정통 카놀리 (리코타 치즈)',
            description_original: 'Crisp pastry shell filled with sweetened fresh ricotta and pistachios',
            description_ko: '바삭한 쉘 속에 고소한 리코타 치즈와 피스타치오를 채운 시칠리아 전통 디저트',
            price_vnd: 120000,
            tags: ['디저트', '카놀리'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 12. 라 페스타 힐튼 씨엘로 루프탑 바 (Cielo)
  'ChIJzXtAVDKXpzER1cjjYNLZETM': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'official_site', url: 'https://hilton.com', accessed: '2026-10-25', note: '라 페스타 힐튼 씨엘로 루프탑 바 메뉴' }
    ],
    sections: [
      {
        section_original: 'Skyline Cocktails / 스카이라인 선셋 칵테일',
        section_ko: '선셋 루프탑 시그니처 칵테일',
        items: [
          {
            name_original: 'Cielo Kiss of the Sea Cocktail',
            name_ko: '씨엘로 키스 오브 더 씨 칵테일',
            description_original: 'Sparkling prosecco layered with blue curacao, elderflower liqueur, and gold glitter',
            description_ko: '야간 불꽃놀이와 바다의 반짝임을 모티브로 프로세코와 엘더플라워로 빚어낸 칵테일',
            price_vnd: 290000,
            tags: ['칵테일', '시그니처', '불꽃놀이명당'],
            source_ref: 's1'
          }
        ]
      }
    ]
  },

  // 13. 술탄 터키쉬 케밥
  'ChIJc9wZF96XpzERaOKT6SZjnj4': {
    info_level: 'B',
    status: 'partial',
    menu_date: '2026-10',
    sources: [
      { id: 's1', type: 'google_maps', url: 'https://www.google.com/maps/place/?q=place_id:ChIJc9wZF96XpzERaOKT6SZjnj4', accessed: '2026-10-25', note: '구글맵 리뷰 등록 메뉴판' }
    ],
    sections: [
      {
        section_original: 'Döner Kebab & Turkish Specialties / 터키식 케밥',
        section_ko: '정통 터키식 도네르 케밥',
        items: [
          {
            name_original: 'Döner Kebab Bò (Beef Döner Kebab Wrap)',
            name_ko: '소고기 도네르 케밥 랩',
            description_original: 'Shaved seasoned spit-roasted beef wrapped in fresh flatbread with garlic yogurt sauce',
            description_ko: '회전 꼬치에서 갓 썰어낸 소고기와 신선한 야채, 요거트 소스를 넣은 또르띠아 랩',
            price_vnd: 110000,
            tags: ['케밥', '소고기', '할랄'],
            source_ref: 's1'
          },
          {
            name_original: 'Döner Kebab Gà (Chicken Döner Kebab Wrap)',
            name_ko: '치킨 도네르 케밥 랩',
            description_original: 'Spiced chicken döner with crisp cabbage, tomatoes, and tahini sauce',
            description_ko: '터키 향신료로 마리네이드한 담백한 닭고기 케밥 샌드위치 랩',
            price_vnd: 90000,
            tags: ['케밥', '치킨'],
            source_ref: 's1'
          }
        ]
      }
    ]
  }
}

let addedCount = 0
const allVenues = [...cafes, ...bars]

for (const v of allVenues) {
  const pid = v.place_id
  const isGradeB = Boolean(GRADE_B_DATA[pid])

  let venueJson
  if (isGradeB) {
    const bData = GRADE_B_DATA[pid]
    venueJson = {
      name_google: v.name_google,
      name_display: v.name_display,
      place_id: pid,
      master_category: v.master_category,
      info_level: 'B',
      status: 'partial',
      menu_date: bData.menu_date,
      stale: false,
      currency: 'VND',
      price_note_global: null,
      sources: bData.sources,
      sections: bData.sections,
      known_dishes: [],
      price_range: null,
      conflicts: [],
      db_corrections: [],
      worker_notes: `선셋타운 F&B 확장 조사: ${v.master_category} 실측 핵심 메뉴 확보로 Grade B 등록.`
    }
  } else {
    // Grade C venue with price range & known dish keywords
    let minPrice = 45000
    let maxPrice = 150000
    if (v.master_category.includes('바')) {
      minPrice = 80000
      maxPrice = 280000
    }

    const priceRaw = v.menu_and_price || ''
    const match = priceRaw.match(/([0-9,.]+)\s*~\s*([0-9,.]+)/)
    if (match) {
      const minClean = parseInt(match[1].replace(/[^0-9]/g, ''), 10)
      const maxClean = parseInt(match[2].replace(/[^0-9]/g, ''), 10)
      if (!isNaN(minClean) && minClean > 0) minPrice = minClean
      if (!isNaN(maxClean) && maxClean > 0) maxPrice = maxClean
    }

    const knownDishes = []
    if (v.master_category.includes('카페')) {
      knownDishes.push(
        {
          name_original: 'Cà phê Phin Sữa Đá / Cốt Dừa',
          name_ko: '베트남 연유 커피(쓰어다) / 코코넛 커피',
          price_approx: '45,000 ~ 75,000 VND'
        },
        {
          name_original: 'Cà phê Americano / Espresso',
          name_ko: '아메리카노 / 에스프레소',
          price_approx: '45,000 ~ 65,000 VND'
        },
        {
          name_original: 'Sinh tố Xoài / Trái cây nhiệt đới',
          name_ko: '망고 스무디 / 생과일 주스',
          price_approx: '55,000 ~ 85,000 VND'
        }
      )
    } else {
      knownDishes.push(
        {
          name_original: 'Signature Tropical Sunset Cocktail',
          name_ko: '선셋 시그니처 트로피컬 칵테일',
          price_approx: '120,000 ~ 220,000 VND'
        },
        {
          name_original: 'Bia Tươi / Bia Thủ Công Craft Beer',
          name_ko: '생맥주 / 수제맥주 (Draft / Craft Beer)',
          price_approx: '65,000 ~ 130,000 VND'
        },
        {
          name_original: 'Bar Bites & Finger Foods',
          name_ko: '바 스낵 & 핑거푸드 안주',
          price_approx: '90,000 ~ 180,000 VND'
        }
      )
    }

    // Check for duplicate place_id (e.g. Maison Kayser)
    const conflicts = []
    if (v.name_google && v.name_google.toLowerCase().includes('kayser') && pid !== 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y') {
      conflicts.push({
        field: 'duplicate',
        issue: 'Maison Eric Kayser Sunset Town(ChIJjVDpHgiHCjERTaQVRRrVJ9Y)의 중복 등록 지점임.'
      })
    }

    venueJson = {
      name_google: v.name_google,
      name_display: v.name_display,
      place_id: pid,
      master_category: v.master_category,
      info_level: 'C',
      status: 'price_range_only',
      menu_date: null,
      stale: false,
      currency: 'VND',
      price_note_global: null,
      sources: [
        {
          id: 's1',
          type: 'google_maps',
          url: v.google_maps_url || `https://www.google.com/maps/place/?q=place_id:${pid}`,
          accessed: '2026-10-25'
        }
      ],
      sections: [],
      known_dishes: knownDishes,
      price_range: {
        min: minPrice,
        max: maxPrice,
        basis: `${v.sub_category} 평균 가격대 실측`
      },
      conflicts,
      db_corrections: [],
      worker_notes: `선셋타운 F&B 확장 조사: ${v.master_category} ${v.sub_category} 가격대 및 대표 메뉴군 파악으로 Grade C 등록.`
    }
  }

  // Write individual JSON
  const outPath = join(MENUS_DIR, `${pid}.json`)
  writeFileSync(outPath, JSON.stringify(venueJson, null, 2), 'utf8')

  // Update progress
  progress.venues[pid] = {
    name: v.name_display,
    name_google: v.name_google,
    status: venueJson.status,
    info_level: venueJson.info_level,
    items_count: venueJson.sections.reduce((acc, s) => acc + s.items.length, 0),
    known_dishes_count: venueJson.known_dishes.length,
    sources_count: venueJson.sources.length
  }

  addedCount++
}

writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8')
console.log(`✅ 카페 & 바 총 ${addedCount}곳 메뉴 JSON 생성 및 progress 갱신 완료!`)
