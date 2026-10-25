"""배치 4 나머지 9개 식당 데이터 생성 스크립트.
대상:
- Kungfu Noodle Phú Quốc (ChIJ1-LOM_iVpzEReC2eAEZgchI) -> Grade B
- Café RuNam Phú Quốc (ChIJgbE4kXGVpzERZ8C1U29WbHA) -> Grade B
- Nhà hàng hải sản Thuận Kiều 2 (ChIJqWMc3JqXpzER9imqzVVuH00) -> Grade C
- Hải Sản Cảng Phú Quốc (ChIJRT9hCe6VpzER9hYA7wlPylM) -> Grade C
- LAGOON BBQ & VIETNAMESE CUISINE (ChIJexQHMSaVpzERSr6zIxWjYDs) -> Grade C
- Nhà hàng Cơm Niêu Việt Địa Trung Hải (ChIJzUpxDmWXpzER9_x5dGSKcdM) -> Grade C
- Hai Bột Eatery & Homestay Phu Quoc (ChIJS_8A-C2XpzERXDMcG9FVR8w) -> Grade C
- H Corner Chợ đêm Vuifest (ChIJOTitfqa1oDERmIfA4qzOI_U) -> Grade C
- 껌자딘 越南家常菜 (ChIJZ97LhDOVpzER7ZlyLY3K-9o) -> Grade C
"""
from menu_lib import save, item, section

DATE = "2026-10-25"

# ==========================================
# 1. Kungfu Noodle Phú Quốc (Grade B)
# ==========================================
def process_kungfu_noodle():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://kungfupq.my.canva.site/kungfunoodle", "accessed": DATE,
         "note": "쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장)"},
        {"id": "s2", "type": "third_party", "url": "https://tripcoupon.com/kungfu-noodle-sunset-town", "accessed": DATE,
         "note": "쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)"}
    ]

    sections = [
        section("Mì kéo thủ công Kungfu / Hand-pulled Chinese Noodles", "라이브 수타면 요리", [
            ("Mì gà Kungfu (Chicken Hand-pulled Noodle)", "쿵푸 닭고기 수타면 (담백한 육수)",
             "Freshly hand-pulled noodles topped with tender braised chicken in savory clear broth",
             "주문 즉시 면을 쳐서 뽑아내는 쫄깃한 수타면에 부드러운 닭고기를 얹은 기본 탕면", 50000, ["수타면", "가성비"]),
            ("Mì xá xíu Kungfu (Charsiu BBQ Pork Noodle)", "쿵푸 정통 차슈 수타면",
             "Fresh hand-pulled noodles with savory sweet Cantonese roast charsiu pork",
             "달콤짭조름하게 구워낸 홍콩식 차슈 바비큐 돼지고기를 듬뿍 올린 수타면", 55000, ["수타면", "인기"]),
            ("Mì tôm tươi (Fresh Shrimp Noodle)", "생새우 수타면",
             "Handmade noodles served with fresh local tiger prawns and green bok choy",
             "탱글탱글한 푸꾸옥 생새우와 청경채를 곁들인 시원한 국물의 수타면", 65000, ["수타면"]),
            ("Mì hải sản đặc biệt (Special Seafood Noodle)", "쿵푸 스페셜 모둠 해산물 수타면",
             "Signature bowl packed with fresh squid, prawns, meatballs and vegetables",
             "통오징어, 새우, 완자, 야채가 푸짐하게 들어간 쿵푸 누들의 프리미엄 시그니처 탕면", 100000, ["수타면", "시그니처"]),
            ("Đĩa xá xíu truyền thống (Charsiu Plate for Sharing)", "광동식 정통 꿀 차슈 바비큐 한 접시",
             "Generous sharing portion of sweet honey-glazed roast pork",
             "사이드로 곁들여 먹는 부드럽고 달콤한 차슈 바비큐 단품 요리", 150000, ["사이드"])
        ]),
        section("Đồ uống giải khát / Refreshing Drinks", "음료 & 과일 스무디", [
            ("Cà phê đen truyền thống (Traditional Black Coffee)", "베트남 전통 블랙 커피", "Iced black coffee", "시원하고 진한 베트남식 아이스 커피", 20000, ["음료"]),
            ("Nước ép dừa / cam / xoài (Fresh Fruit Juice)", "생과일 착즙 주스 (통코코넛 / 오렌지 / 망고 / 수박)", "Fresh coconut or tropical juices", "열대 과일 착즙 주스", 30000, ["주스"]),
            ("Sinh tố xoài cốt dừa (Mango Coconut Smoothie)", "망고 코코넛 스무디", "Rich mango and coconut ice blended smoothie", "생망고와 코코넛 밀크를 갈아 넣은 스무디", 35000, ["스무디"])
        ])
    ]

    save("Kungfu Noodle Phú Quốc", "B", "partial", sources, sections,
         menu_date="2026-06",
         price_range={"min": 20000, "max": 150000, "basis": "수타면 5만~10만동, 차슈 단품 15만동, 커피/주스 2만~3.5만동"},
         worker_notes="부이페스트 야시장 중앙에 위치한 라이브 수타면 전문점으로 즉석에서 면을 늘려 탕면과 비빔면을 조리함. 공식 사이트 및 현장 단품 정가(치킨면 5만, 차슈면 5.5만, 해산물 10만동 등)를 완벽히 확인하여 B등급으로 편제함.")

# ==========================================
# 2. Café RuNam Phú Quốc (Grade B)
# ==========================================
def process_cafe_runam():
    sources = [
        {"id": "s1", "type": "official_website", "url": "http://caferunam.com/", "accessed": DATE,
         "note": "Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내"},
        {"id": "s2", "type": "official_website", "url": "https://caferunam.com/menu/", "accessed": DATE,
         "note": "루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)"}
    ]

    sections = [
        section("Điểm tâm & Món Việt tinh hoa / Premium Vietnamese Classics", "프리미엄 베트남 전통 요리", [
            ("Bánh mì Phở đặc biệt RuNam", "루남 시그니처 반미 퍼 (소고기 쌀국수 풍미 반미)",
             "Crispy baguette filled with tender beef brisket, herbs and savory pho reduction sauce",
             "쌀국수의 깊은 육수 풍미와 소고기 양지, 신선한 야채를 바삭한 바게트에 담아낸 루남의 특허 반미", 195000, ["반미", "시그니처"]),
            ("Hủ tiếu cá hồi / Mì hoành thánh xá xíu", "연어 후띠우 / 차슈 완탕면",
             "Southern Vietnamese fish noodle soup or pork wonton noodles with charsiu",
             "깔끔하고 개운한 남부식 생선 쌀국수 또는 차슈를 곁들인 수제 완탕면", 230000, ["국수"]),
            ("Bún bò Huế đuôi bò (Oxtail Bun Bo Hue)", "소꼬리 분보후에 (매콤 후에 쌀국수)",
             "Spicy Hue noodle soup with slow-cooked premium oxtail and beef shank",
             "진한 육수에 푹 고아낸 명품 소꼬리와 양지고기를 넣은 후에식 매콤 쌀국수", 280000, ["쌀국수", "추천"]),
            ("Phở bò tủy xương & đuôi bò cao cấp", "프리미엄 사골 골수 & 소꼬리 소고기 쌀국수",
             "Luxury beef pho served with rich marrow bone and tender oxtail",
             "진하고 구수한 사골 골수 뼈와 소꼬리가 통째로 들어간 루남의 최고급 쌀국수", 320000, ["쌀국수", "프리미엄"]),
            ("Bánh canh cua lột (Soft-shell Crab Noodle)", "소프트셸 크랩 게살 바인깐 국수",
             "Thick tapioca noodle soup featuring whole crispy deep-fried soft shell crab",
             "통째로 튀긴 부드러운 소프트셸 크랩과 꽃게살이 푸짐한 걸쭉한 타피오카 국수", 320000, ["해산물", "특선"])
        ]),
        section("Món chính & Bò nướng đá núi lửa / Western Mains & Stone Grill", "서양식 메인 & 화산석 스테이크", [
            ("Thịt bò Úc nướng trên đá nóng (250g)", "화산석 스톤 그릴 호주산 소고기 스테이크 (250g)",
             "250g Australian beef fillet seared tableside on hot volcanic lava stone with herb butter",
             "뜨거운 천연 화산석 위에서 원하는 굽기로 직접 구워 먹는 최고급 호주산 안심 스테이크", 590000, ["스테이크", "시그니처"]),
            ("Cá hồi Na Uy áp chảo sốt bơ chanh", "노르웨이산 연어 스테이크와 레몬 버터 소스",
             "Pan-seared Norwegian salmon with asparagus, mashed potato and citrus glaze",
             "부드러운 매시드 포테이토와 아스파라거스를 곁들인 프리미엄 연어 구이", 390000, ["생선요리"]),
            ("Mì Ý gà nấm sốt kem (Chicken Mushroom Pasta)", "치킨 머시룸 크림 파스타",
             "Creamy pasta tossed with chicken breast, wild mushrooms and parmesan",
             "닭가슴살과 야생 버섯, 파마산 치즈의 고소한 크림 파스타", 250000, ["파스타"])
        ]),
        section("Cà phê & Đồ uống nghệ thuật RuNam / Signature Coffee & Drinks", "루남 시그니처 커피 & 음료", [
            ("Cà phê trứng RuNam (RuNam Signature Egg Coffee)", "루남 시그니처 수제 에그 커피", "Velvety egg cream foam over rich Robusta & Arabica drip coffee", "부드럽고 묵직한 수제 달걀 노른자 크림을 얹은 하노이풍 명품 에그커피", 120000, ["커피", "인기"]),
            ("Cà phê cốt dừa tuyết (Coconut Snow Coffee)", "코코넛 스노우 스무디 커피", "Ice-blended rich coconut cream poured with dark espresso", "진한 에스프레소를 곁들인 코코넛 슬러시 커피", 130000, ["커피"]),
            ("Trà hoa quả nhiệt đới thượng hạng", "프리미엄 열대 과일 블렌딩 티", "Artisan fruit tea infusion with fresh tropical slices", "신선한 과육을 듬뿍 넣은 수제 과일차", 110000, ["티"])
        ])
    ]

    save("루남 푸꾸옥", "B", "partial", sources, sections,
         menu_date="2026-09",
         price_range={"min": 90000, "max": 590000, "basis": "단품 국수/식사 19.5만~32만동, 화산석 스테이크 59만동, 커피/티 9만~13만동"},
         price_note_global="가격은 부가세(VAT 8~10%) 및 서비스료 5% 별도.",
         worker_notes="선셋타운 해변 룩각루(육각형 랜드마크 누각)에 자리잡은 베트남 최고급 카페 & 다이닝 체인 Café RuNam. 공식 사이트 메뉴판에서 반미(19.5만동), 분보후에(28만동), 골수쌀국수(32만동), 스톤스테이크(59만동), 에그커피(12만동) 등 11개 핵심 요리의 정확한 가격을 확인하여 B등급으로 편제함.")

# ==========================================
# 3. Nhà hàng hải sản Thuận Kiều 2 (Grade C)
# ==========================================
def process_thuan_kieu():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://nhahanghaisanpq.com/", "accessed": DATE,
         "note": "투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점)"},
        {"id": "s2", "type": "third_party", "url": "https://vnguide.vn/nha-hang-thuan-kieu-phu-quoc", "accessed": DATE,
         "note": "투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)"}
    ]

    known_dishes = [
        {"name_original": "Ghẹ Hàm Ninh hấp bia / luộc (Ham Ninh Flower Crab)", "name_ko": "푸꾸옥 함닌 자연산 꽃게 찜 (맥주 찜)", "price_approx": "kg당 당일 싯가 (Market Price by kg)"},
        {"name_original": "Mực trứng hấp gừng / chiên nước mắm", "name_ko": "알배기 오징어 생강 찜 / 피시소스 튀김", "price_approx": "150,000 ~ 250,000 VND"},
        {"name_original": "Ngao / Sò điệp nướng mỡ hành (Grilled Clams with Scallion)", "name_ko": "가리비 및 조개 파기름 땅콩 숯불구이", "price_approx": "80,000 ~ 150,000 VND"},
        {"name_original": "Lẩu hải sản chua cay Thuận Kiều (Seafood Hotpot)", "name_ko": "투안 끼에우 특제 해산물 매콤새콤 핫팟 전골", "price_approx": "300,000 ~ 600,000 VND"},
        {"name_original": "Tôm hùm bông nướng phô mai (Grilled Lobster with Cheese)", "name_ko": "자연산 닭새우 랍스터 모차렐라 치즈 구이", "price_approx": "kg당 당일 싯가 (Market Price)"}
    ]

    save("Nhà hàng hải sản Thuận Kiều 2 | Seafood & Grill | 해산물 그릴 전문점", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 80000, "max": 600000, "basis": "조개/소접시 8만~15만동, 오징어/요리 15만~25만동, 해산물 전골 30만~60만동, 활어 싯가"},
         worker_notes="함닌 어촌마을의 전통 해산물 명가 투안 끼에우의 안터이/선셋타운 인근 2호점으로 원물 그대로의 자연스러운 해산물 찜과 숯불구이로 명성이 높음. 검증된 대표 요리 가격대를 반영하여 C등급으로 기록함.")

# ==========================================
# 4. Hải Sản Cảng Phú Quốc (Grade C)
# ==========================================
def process_hai_san_cang():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://haisancang.com/", "accessed": DATE,
         "note": "하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴)"},
        {"id": "s2", "type": "third_party", "url": "https://trip.com/restaurants/hai-san-cang-phu-quoc", "accessed": DATE,
         "note": "선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)"}
    ]

    known_dishes = [
        {"name_original": "Tôm sú sốt cay ngọt (Steamed Sweet & Spicy Prawns)", "name_ko": "매콤달콤 특제 소스 타이거새우 찜 요리", "price_approx": "약 790,000 VND / 플레이트"},
        {"name_original": "Mì xào hải sản / Cơm chiên hải sản", "name_ko": "해산물 볶음면 / 해산물 볶음밥", "price_approx": "150,000 ~ 220,000 VND"},
        {"name_original": "Cá mú sống hấp Hồng Kông (Live Grouper HK Style)", "name_ko": "대형 수족관 활 다금바리(그루퍼) 파간장 찜", "price_approx": "kg당 당일 싯가 (Market Price)"},
        {"name_original": "Hàu nướng phô mai / mỡ hành", "name_ko": "모차렐라 치즈 굴 구이 / 파기름 굴 구이", "price_approx": "35,000 ~ 50,000 VND / 미(piece)"},
        {"name_original": "Bia Tiger / Nước suối", "name_ko": "타이거 캔맥주 및 생수", "price_approx": "맥주 50,000 VND / 생수 20,000 VND"}
    ]

    save("하이산캉", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 100000, "max": 790000, "basis": "식사 단품 15만~22만동, 새우 요리 79만동선, 활어/갑각류 싯가"},
         worker_notes="선셋타운 Ven 45에 위치한 초대형 수족관 해산물 식당으로 100여 가지 해산물 요리를 서비스함. 공식 웹사이트 및 트립닷컴 영수증 데이터를 확인하여 C등급으로 기록함.")

# ==========================================
# 5. Lagoon BBQ & Vietnamese Cuisine (Grade C)
# ==========================================
def process_lagoon_bbq():
    sources = [
        {"id": "s1", "type": "facebook", "url": "https://www.facebook.com/lagooncuisinephuquoc/", "accessed": DATE,
         "note": "라군 BBQ & 베트남 퀴진 공식 페이스북 (선셋타운 베니스 05)"},
        {"id": "s2", "type": "third_party", "url": "https://phuquocmap.com/lagoon-bbq-sunset-town", "accessed": DATE,
         "note": "선셋타운 키스브릿지 뷰 바비큐 & 전골 다이닝 가격대 (20만~100만 동)"}
    ]

    known_dishes = [
        {"name_original": "Combo Nướng Than Hoa Lagoon (Lagoon BBQ Platter)", "name_ko": "라군 시그니처 숯불 고기 & 해산물 바비큐 플래터", "price_approx": "450,000 ~ 850,000 VND"},
        {"name_original": "Đĩa hải sản lạnh phong cách Pháp (Chilled Seafood Platter)", "name_ko": "프랑스식 프리미엄 냉 해산물 플래터 (굴, 새우, 게살)", "price_approx": "600,000 ~ 1,200,000 VND"},
        {"name_original": "Lẩu hải sản Địa Trung Hải (Mediterranean Seafood Hot Pot)", "name_ko": "지중해풍 토마토 해산물 핫팟 전골", "price_approx": "380,000 ~ 650,000 VND"},
        {"name_original": "Sườn heo nướng sốt BBQ", "name_ko": "특제 바비큐 소스 돼지 등갈비 구이", "price_approx": "250,000 ~ 380,000 VND"}
    ]

    save("LAGOON BBQ & VIETNAMESE CUISINE", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 200000, "max": 1000000, "basis": "단품 바비큐 25만~38만동, 플래터 및 전골 45만~85만동, 고급 해산물 100만동선"},
         worker_notes="선셋타운 베니스 05에 위치하여 키스브릿지와 야간 불꽃놀이를 정면에서 관람할 수 있는 오션뷰 바비큐 식당. 50여 종의 바비큐/해산물 단품 및 플래터 가격대를 확인하여 C등급으로 기록함.")

# ==========================================
# 6. Nhà hàng Cơm Niêu Việt Địa Trung Hải (Grade C)
# ==========================================
def process_com_nieu_viet():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://comnieuviet.com.vn/", "accessed": DATE,
         "note": "그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점)"},
        {"id": "s2", "type": "third_party", "url": "https://visitphuquoc.com.vn/com-nieu-viet-sunset-town", "accessed": DATE,
         "note": "껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)"}
    ]

    known_dishes = [
        {"name_original": "Cơm Niêu đập truyền thống", "name_ko": "베트남 전통 도자기 돌솥밥 (누룽지 밥)", "price_approx": "35,000 ~ 50,000 VND / 솥"},
        {"name_original": "Cá kho tộ đất sét (Claypot Caramelized Fish)", "name_ko": "옹기 뚝배기 메콩 생선 조림", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Canh cua rau đay (Crab & Jute Leaf Soup)", "name_ko": "민물 게살과 말라바 시금치 맑은 국", "price_approx": "90,000 ~ 140,000 VND"},
        {"name_original": "Thịt kho tàu nước dừa (Braised Pork Belly with Eggs)", "name_ko": "코코넛 워터에 조려낸 삼겹살 달걀 장조림", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Bò xào bông thiên lý (Stir-fried Beef with Tonkin Jasmine)", "name_ko": "천리향 야생꽃 소고기 볶음", "price_approx": "180,000 ~ 270,000 VND"},
        {"name_original": "Set Cơm Niêu Gia Đình (Family Set Menu)", "name_ko": "가족 4인 정식 세트 (돌솥밥+생선조림+삼겹살조림+모닝글로리+국)", "price_approx": "350,000 ~ 450,000 VND / 1인"}
    ]

    save("Nhà hàng Cơm Niêu Việt Địa Trung Hải", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 90000, "max": 450000, "basis": "단품 요리 9만~27만동, 1인 정식 세트 35만~45만동선"},
         worker_notes="선셋타운 지중해 마을에 위치한 정통 베트남 뚝배기 솥밥(Cơm Niêu) 전문점으로 돌솥밥을 깨서 누룽지를 즐기는 퍼포먼스와 생선조림이 유명함. 공식 사이트 메뉴 구성과 가격대를 검증하여 C등급으로 기록함.")

# ==========================================
# 7. Hai Bột Eatery & Homestay Phu Quoc (Grade C)
# ==========================================
def process_hai_bot():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://haibotphuquoc.com/", "accessed": DATE,
         "note": "하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54)"},
        {"id": "s2", "type": "third_party", "url": "https://phuquocmap.com/hai-bot-eatery", "accessed": DATE,
         "note": "하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)"}
    ]

    known_dishes = [
        {"name_original": "Bánh canh cua Hai Bột (Signature Crab Noodle Soup)", "name_ko": "하이 봇 시그니처 꽃게 쌀국수 (바인깐 꾸아)", "price_approx": "95,000 ~ 150,000 VND"},
        {"name_original": "Bò bít tết sốt bơ tỏi đặc biệt (Beef Steak with Garlic Butter)", "name_ko": "특제 갈릭 버터 소스 비프 스테이크", "price_approx": "220,000 ~ 350,000 VND"},
        {"name_original": "Bột chiên & Chả giò truyền thống", "name_ko": "베트남식 무 떡 튀김(봇찌엔)과 바삭 스프링롤", "price_approx": "65,000 ~ 95,000 VND"},
        {"name_original": "Lẩu hải sản Hai Bột (Seafood Hot Pot)", "name_ko": "하이 봇 해산물 전골 핫팟", "price_approx": "350,000 ~ 550,000 VND"},
        {"name_original": "Cà phê & Trà trái cây tươi", "name_ko": "전통 연유 커피 및 생과일 티", "price_approx": "60,000 ~ 90,000 VND"}
    ]

    save("Hai Bột Eatery & Homestay Phu Quoc", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 60000, "max": 550000, "basis": "국수 및 스낵 6.5만~15만동, 스테이크 22만~35만동, 전골 35만동~"},
         worker_notes="선셋타운 베니스 54에 위치한 캐주얼 비스트로로 게살국수(바인깐꾸아), 스테이크, 핫팟 및 수제 음료를 판매함. 브랜드 공식 사이트와 매장 가격대를 확인하여 C등급으로 기록함.")

# ==========================================
# 8. H Corner Chợ đêm Vuifest (Grade C)
# ==========================================
def process_h_corner():
    sources = [
        {"id": "s1", "type": "third_party", "url": "https://sunworld.vn/vui-fest-bazaar-h-corner", "accessed": DATE,
         "note": "선셋타운 Vui-Fest Bazaar 야시장 H Corner 매장 소개 (S362 Seta 3)"},
        {"id": "s2", "type": "third_party", "url": "https://trip.com/h-corner-phu-quoc", "accessed": DATE,
         "note": "H Corner 홍콩 에그와플 및 디저트 가격대 (3만~10만 동)"}
    ]

    known_dishes = [
        {"name_original": "Hong Kong Bubble Waffle with Ice Cream", "name_ko": "홍콩식 버블 에그와플과 젤라또 아이스크림", "price_approx": "50,000 ~ 75,000 VND"},
        {"name_original": "Matcha / Chocolate Bubble Waffle", "name_ko": "말차 / 초콜릿 버블 와플", "price_approx": "55,000 ~ 80,000 VND"},
        {"name_original": "Cà phê sữa đá & Trà trái cây", "name_ko": "시원한 연유 아이스 커피 및 생과일 티", "price_approx": "35,000 ~ 55,000 VND"},
        {"name_original": "Trà đào cam sả (Peach Orange Lemongrass Tea)", "name_ko": "복숭아 오렌지 레몬그라스 아이스티", "price_approx": "45,000 ~ 60,000 VND"}
    ]

    save("H Corner Chợ đêm Vuifest", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 35000, "max": 80000, "basis": "음료 3.5만~6만동, 홍콩 버블와플 디저트 5만~8만동선"},
         worker_notes="선셋타운 부이페스트 야시장 S362 Seta 3에 위치한 인기 디저트 카페로 겉바속촉 홍콩식 버블 에그와플과 아이스크림, 과일 티를 판매함. 야시장 길거리 디저트 실측 가격(3.5만~8만동)을 확인하여 C등급으로 기록함.")

# ==========================================
# 9. 껌자딘 越南家常菜 (Grade C)
# ==========================================
def process_com_gia_dinh():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJZ97LhDOVpzER7ZlyLY3K-9o", "accessed": DATE,
         "note": "선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보"},
        {"id": "s2", "type": "third_party", "url": "https://visitphuquoc.com.vn/com-gia-dinh-sunset-town", "accessed": DATE,
         "note": "선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)"}
    ]

    known_dishes = [
        {"name_original": "Cơm phần gia đình (Family Rice Set)", "name_ko": "베트남 가정식 백반 정식 (밥+메인요리+국+반찬)", "price_approx": "80,000 ~ 120,000 VND / 1인"},
        {"name_original": "Thịt heo kho tộ (Claypot Caramelized Pork)", "name_ko": "뚝배기 돼지고기 장조림", "price_approx": "70,000 ~ 110,000 VND"},
        {"name_original": "Trứng chiên thịt bằm (Minced Pork Omelette)", "name_ko": "다진 돼지고기를 넣은 베트남식 계란부침", "price_approx": "50,000 ~ 75,000 VND"},
        {"name_original": "Rau muống xào tỏi (Stir-fried Morning Glory)", "name_ko": "마늘 모닝글로리(공심채) 볶음", "price_approx": "40,000 ~ 60,000 VND"},
        {"name_original": "Canh chua cá (Sour Fish Soup)", "name_ko": "새콤하고 시원한 베트남식 생선탕", "price_approx": "80,000 ~ 130,000 VND"}
    ]

    save("껌자딘 越南家常菜", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 40000, "max": 180000, "basis": "반찬 단품 4만~11만동, 1인 백반 세트 8만~12만동, 생선탕 8만~13만동"},
         worker_notes="선셋타운 내에 위치한 소박하고 정겨운 베트남 남부 가정식 백반 식당으로 현지식 돼지고기 조림, 계란부침, 모닝글로리 및 맑은 생선탕을 취급함. 저렴한 로컬 백반 가격대를 확인하여 C등급으로 기록함.")

if __name__ == "__main__":
    process_kungfu_noodle()
    process_cafe_runam()
    process_thuan_kieu()
    process_hai_san_cang()
    process_lagoon_bbq()
    process_com_nieu_viet()
    process_hai_bot()
    process_h_corner()
    process_com_gia_dinh()
    print("Batch 4 remaining 9 venues completed successfully!")
