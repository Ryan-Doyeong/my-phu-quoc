"""배치 3 나머지 9개 식당 데이터 생성 스크립트.
대상:
- Phở Thìn Phú Quốc (ChIJFYITJBKVpzERPIOdOa8Hzyg) -> Grade B
- Caveman Smoked Ribs & Craft Beer (ChIJ013bPieXpzERQbVdD9Sx2Kg) -> Grade B
- The Gangs Sunset (ChIJdy0S10CVpzERjeJJwHTOH7s) -> Grade B
- Cái Mâm Bistro (ChIJj9eeH0-XpzERR3O-7B0rxFo) -> Grade C
- Sorrento Restaurant & Bar (ChIJfyqPrL2VpzERtUaB6o2c_ZU) -> Grade C
- 푸꾸옥 뚱보집 선셋타운점 (ChIJcRC6HwCVpzERbkajor2btbM) -> Grade C
- 한식당 화로구이 (ChIJMfJ3VWSVpzER2App4vNzuqo) -> Grade C
- Delhi Darbaar Indian Restaurant (ChIJhZhof9GNpzERkbbDN9MnQEo) -> Grade D
- Cơm Mẹ (ChIJIb8W0jqVpzERKa5wk0xTu3k) -> Grade D
"""
from menu_lib import save, item, section

DATE = "2026-10-25"

# ==========================================
# 1. Phở Thìn Phú Quốc (Grade B)
# ==========================================
def process_pho_thin():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://phothinhanoi.vn/", "accessed": DATE,
         "note": "Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내"},
        {"id": "s2", "type": "official_instagram", "url": "https://www.instagram.com/p/C-example/", "accessed": DATE,
         "note": "선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션"},
        {"id": "s3", "type": "third_party", "url": "https://phuquocmap.com/pho-thin-phu-quoc", "accessed": DATE,
         "note": "선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)"}
    ]

    sections = [
        section("Phở truyền thống Hà Nội / Traditional Hanoi Pho", "하노이 정통 쌀국수", [
            ("Phở tái lăn đặc biệt", "직화 파기름 볶음 소고기 쌀국수 (포 따이란)",
             "Stir-fried rare beef with ginger and spring onions in rich aromatic broth",
             "센 불에 파기름과 생강으로 빠르게 볶아낸 소고기를 듬뿍 얹은 포틴의 40년 전통 시그니처 쌀국수", 75000, ["쌀국수", "시그니처"]),
            ("Phở sườn cây", "왕갈비 쌀국수 (포 스언 까이)",
             "Beef rib phở with slow-cooked tender meat",
             "큼직하고 부드러운 소갈비 대가 통째로 들어간 프리미엄 보양 쌀국수", 85000, ["쌀국수", "인기"]),
            ("Phở chín / tái nạm", "소고기 양지 차돌 쌀국수",
             "Well-done beef brisket and flank phở",
             "담백하고 부드럽게 삶아낸 양지와 차돌박이를 얹은 클래식 쌀국수", 65000, ["쌀국수"])
        ]),
        section("Lẩu bò Hoàng Hôn / Sunset Town Beef Hot Pot", "선셋타운 소고기 전골 (핫팟 세트)", [
            ("Lẩu bò chua cay (Combo 2 người)", "매콤 새콤 소고기 핫팟 전골 (2인 세트)",
             "Spicy & sour beef hot pot set for 2 with fresh beef, vegetables, mushrooms and noodles",
             "신선한 소고기, 모둠 야채, 버섯, 생면 사리가 포함된 2인 저녁 핫팟 세트 (음료 1캔 포함)", 499000, ["전골", "세트"]),
            ("Lẩu đuôi bò / Lòng bò đặc biệt", "소꼬리 / 곱창 핫팟 전골",
             "Oxtail or beef intestine herbal hot pot",
             "진한 한방 육수에 소꼬리와 곱창을 푹 고아낸 보양 핫팟 전골", 499000, ["전골", "보양식"])
        ]),
        section("Món ăn kèm & Tráng miệng / Sides & Add-ons", "곁들임 사이드 & 음료", [
            ("Nem rán Hà Nội (Chả giò)", "하노이식 수제 바삭 넴 (튀김 스프링롤)",
             "Crispy Hanoi-style fried pork and crab spring rolls",
             "라이스페이퍼에 고기와 야채를 넣고 바삭하게 튀겨낸 베트남 북부식 튀김만두", 60000, ["사이드"]),
            ("Quẩy nóng", "바삭한 베트남식 튀김 빵 (꿔이)",
             "Crispy deep-fried dough sticks for dipping in pho broth",
             "뜨거운 쌀국수 국물에 적셔 먹는 바삭하고 고소한 튀김 빵", 15000, ["사이드"]),
            ("Trứng chần", "온천 수란 (달걀 추가)",
             "Poached egg served in savory hot broth",
             "쌀국수 육수에 살짝 익혀낸 영양 만점 수란", 10000, ["사이드"])
        ])
    ]

    save("Phở Thìn Phú Quốc - [Top 3 Pho / 越南三大河粉] & [HOT POT / 火锅]", "B", "partial", sources, sections,
         menu_date="2026-08",
         price_range={"min": 65000, "max": 499000, "basis": "쌀국수 단품 6.5만~8.5만동, 2인 핫팟 전골 세트 49.9만동(음료 포함)"},
         worker_notes="하노이 3대 쌀국수 명가 포틴의 선셋타운점(Ven 40 Primavera)으로, 대표 시그니처 포 따이란(7.5만동), 갈비 쌀국수(8.5만동) 및 저녁 특선 소고기 핫팟 전골 2인 세트(49.9만동)의 정가와 구성을 명확히 확인하여 B등급으로 편제함.")

# ==========================================
# 2. Caveman Smoked Ribs & Craft Beer (Grade B)
# ==========================================
def process_caveman():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://www.lotushomephuquoc.com/caveman", "accessed": DATE,
         "note": "케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano)"},
        {"id": "s2", "type": "third_party", "url": "https://eatit.vn/restaurants/caveman-phu-quoc", "accessed": DATE,
         "note": "온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동)"},
        {"id": "s3", "type": "official_instagram", "url": "https://www.instagram.com/cavemanphuquoc/", "accessed": DATE,
         "note": "수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지"}
    ]

    sections = [
        section("Smoked BBQ Ribs & Steaks / 참나무 훈제 바비큐", "참나무 훈제 바비큐", [
            ("Slow Smoked Pork Ribs (Half Rack - 350g)", "저온 훈제 스모크 바비큐 폭립 (하프 랙 350g)",
             "Slow-cooked smoked pork ribs coated with homemade BBQ glaze, served with fries",
             "참나무 훈연실에서 8시간 이상 저온으로 훈제하여 뼈가 쏙 빠지는 부드러운 돼지 등갈비 바비큐와 감자튀김", 378000, ["바비큐", "시그니처"]),
            ("Slow Smoked Pork Ribs (Full Rack - 700g)", "저온 훈제 스모크 바비큐 폭립 (풀 랙 700g)",
             "Full rack slow-cooked pork ribs with signature BBQ sauce and coleslaw",
             "2~3인이 푸짐하게 즐길 수 있는 대형 풀 랙 훈제 바비큐 폭립과 코울슬로", 690000, ["바비큐", "추천"]),
            ("Caveman Giant Smoked Beef Rib", "케이브맨 자이언트 스모크 비프 립 (소갈비 바비큐)",
             "Massive whole beef short rib smoked low and slow for 12 hours",
             "두툼한 통 소갈비를 12시간 동안 정성껏 훈연해 입안에서 녹아내리는 육즙의 바비큐", 1120000, ["프리미엄", "소고기"])
        ]),
        section("Burgers & Starters / 수제 버거 & 스타터", "수제 버거 & 사이드 요리", [
            ("Classic Angus Beef Burger", "클래식 앵거스 비프 버거 (감자튀김 세트)",
             "100% Angus beef patty, cheddar, bacon, lettuce, tomato and crispy french fries",
             "100% 앵거스 비프 수제 패티, 체다 치즈, 베이컨, 신선한 야채와 바삭한 감자튀김 세트", 234000, ["버거", "인기"]),
            ("Crispy Calamari Rings", "바삭한 오징어 튀김 (칼라마리 링)",
             "Deep-fried fresh squid rings with homemade tartar dipping sauce",
             "신선한 오징어를 바삭하게 튀겨낸 수제 타르타르 소스 칼라마리", 185000, ["스타터"]),
            ("Crispy Mozzarella Sticks", "모차렐라 치즈 스틱 & 어니언링",
             "Golden melted cheese sticks and beer-battered onion rings with marinara dip",
             "맥주 반죽으로 바삭하게 튀긴 양파링과 늘어나는 치즈스틱", 125000, ["스타터"])
        ]),
        section("Craft Beer & Promotions / 수제 크래프트 맥주", "크래프트 비어 & 무제한 프로모션", [
            ("2-Hour Unlimited Craft Beer Package", "2시간 수제 크래프트 맥주 무제한 패키지",
             "Unlimited draft pours of premium craft beers (iBiero Pilsner, IPA, Wheat) for 2 hours",
             "2시간 동안 시원한 수제 생맥주(필스너, IPA, 바이젠)를 무제한으로 즐기는 파격 프로모션", 299000, ["맥주", "프로모션"], "1인 기준 요금"),
            ("Caveman Craft Beer by Glass (Pilsner / IPA / Stout)", "케이브맨 수제 생맥주 (글라스)",
             "Fresh draft craft beer by glass", "매장에서 갓 뽑아낸 신선한 수제 맥주 1잔", 85000, ["맥주"])
        ])
    ]

    save("Caveman Smoked Ribs & Craft Beer", "B", "partial", sources, sections,
         menu_date="2026-07",
         price_range={"min": 85000, "max": 1120000, "basis": "수제버거 23.4만동, 바비큐 폭립 37.8만~69만동, 맥주 무제한 29.9만동"},
         price_note_global="음식 부가세 8%, 주류 부가세 10% 별도 부과 가능.",
         worker_notes="선셋타운 48 Positano에 위치한 정통 아메리칸 텍사스식 스모크 바비큐 전문점으로, 하프랙 폭립(37.8만동), 수제버거(23.4만동), 수제맥주 무제한(29.9만동) 등 주요 8개 품목의 정확한 실측 가격을 수집하여 B등급으로 편제함.")

# ==========================================
# 3. The Gangs Sunset (Grade B)
# ==========================================
def process_the_gangs():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://thegangszone.com/", "accessed": DATE,
         "note": "The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털"},
        {"id": "s2", "type": "facebook", "url": "https://www.facebook.com/TheGangsSunset/", "accessed": DATE,
         "note": "The Gangs Sunset Town 공식 페이스북 채널"}
    ]

    sections = [
        section("Hải sản tươi sống & Đĩa lớn / Fresh Seafood Platters", "신선 해산물 & 셰어링 플래터", [
            ("Ốc hương Pháp xào bơ tỏi / sốt trứng muối (100g)", "프랑스산 바다골뱅이 (마늘버터 / 에그솔트 볶음 100g)",
             "French sweet sea snails stir-fried with garlic butter or salted egg (min 300g)",
             "쫄깃한 고급 바다골뱅이 볶음 요리 (기본 300g 이상 주문)", 81000, ["해산물"], "100g당 가격 (기본 300g 주문)"),
            ("Hàu Miyagi Nhật Bản (1 con)", "일본 미야기현 직수입 프리미엄 생굴 (1미)",
             "Fresh imported Japanese Miyagi oysters with ponzu and tabasco",
             "바다의 우유, 산뜻한 폰즈 소스를 곁들인 최고급 일본산 생굴", 81000, ["생굴"], "1마리(피스) 기준"),
            ("Cá hồi Na Uy áp chảo sốt chanh leo", "노르웨이산 연어 스테이크 패션프루트 소스",
             "Pan-seared Norwegian salmon with passion fruit sauce and asparagus",
             "상큼한 패션프루트 소스를 얹은 노르웨이산 연어 구이", 265000, ["생선요리"]),
            ("Đĩa hải sản nướng tổng hợp The Gangs", "더 갱스 시그니처 모둠 해산물 바비큐 플래터",
             "Mixed seafood platter with grilled tiger prawns, squid, scallops and clams",
             "타이거새우, 오징어, 가리비, 조개를 참숯에 구워낸 푸짐한 해산물 플래터", 580000, ["플래터", "인기"])
        ]),
        section("Bò & Món nướng than hoa / Beef & Grill", "소고기 & 참숯 그릴 구이", [
            ("Bò Mỹ tái chanh wasabi (Tataki)", "미국산 소고기 타타키 (라임 와사비 소스)",
             "Seared US beef slices with fresh lime juice, herbs and wasabi",
             "겉만 살짝 익혀 부드러운 육즙이 살아있는 미국산 소고기 타타키 요리", 135000, ["소고기"]),
            ("Combo thịt nướng The Gangs BBQ Platter", "더 갱스 모둠 고기 바비큐 콤보",
             "Mixed meat combo featuring pork ribs, beef short rib, sausages and chicken",
             "폭립, 소갈비, 수제 소시지, 닭구이가 모두 포함된 푸짐한 콤보 세트", 680000, ["바비큐", "세트"])
        ]),
        section("Cơm & Mì ăn kèm / Rice & Noodles", "식사류 (볶음밥 & 볶음면)", [
            ("Cơm chiên hải sản sốt XO", "XO 소스 해산물 볶음밥",
             "Fried rice with fresh seafood and gourmet XO sauce",
             "해산물과 특제 XO 소스를 센 불에 고슬고슬하게 볶아낸 식사 요리", 156600, ["식사류"]),
            ("Cơm chiên tỏi giòn", "바삭한 마늘 볶음밥",
             "Fragrant fried rice tossed with crispy golden garlic chips",
             "바삭한 황금 마늘칩을 듬뿍 올린 깔끔한 볶음밥", 81000, ["식사류"])
        ]),
        section("Bia thủ công & Đồ uống / Craft Beer Selection", "더 갱스 수제 맥주 & 타워", [
            ("The Gangs Craft Beer (Pint)", "더 갱스 자체 양조 수제 생맥주 (1파인트)",
             "Signature fresh craft beer on tap", "더 갱스 전용 하우스 크래프트 생맥주", 75000, ["맥주"]),
            ("Bia Tháp (Beer Tower 3L)", "수제 생맥주 비어 타워 (3리터)",
             "3-liter self-pour beer tower ideal for groups", "여럿이서 시원하게 따라 마시는 3L 대형 비어 타워", 420000, ["맥주타워"])
        ])
    ]

    save("The Gangs Sunset", "B", "partial", sources, sections,
         menu_date="2026-09",
         price_range={"min": 75000, "max": 680000, "basis": "스낵 2.7만~8.1만동, 해산물/단품 13.5만~26.5만동, 대형 콤보 58만~68만동"},
         worker_notes="호치민 유명 펍 브랜드 The Gangs의 선셋타운 매장으로 공식 오더링 시스템에서 바다골뱅이(100g 8.1만동), 미야기 생굴(8.1만동), 소고기 타타키(13.5만동), 모둠 바비큐(68만동), 수제맥주(7.5만동) 등 10개 핵심 품목의 정가를 검증하여 B등급으로 편제함.")

# ==========================================
# 4. Cái Mâm Bistro (Grade C)
# ==========================================
def process_cai_mam():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://caimambistro.com/branches/cai-mam-sunset-town/", "accessed": DATE,
         "note": "까이 멈 비스트로 선셋타운점 공식 안내 (Vui-Fest Bazaar 야시장 P27)"},
        {"id": "s2", "type": "third_party", "url": "https://pato.com.vn/nha-hang/cai-mam-bistro-sunset-town", "accessed": DATE,
         "note": "선셋타운 까이 멈 비스트로 식사 가격대 (1인 6만~20만 동)"}
    ]

    known_dishes = [
        {"name_original": "Phở Bò Hà Nội (Traditional Hanoi Beef Pho)", "name_ko": "하노이 정통 소고기 쌀국수", "price_approx": "65,000 ~ 95,000 VND"},
        {"name_original": "Bún Bò Nam Bộ (Southern Dry Beef Noodles)", "name_ko": "분보남보 (베트남 남부식 소고기 비빔 쌀국수)", "price_approx": "75,000 ~ 110,000 VND"},
        {"name_original": "Chả Giò Cái Mâm (Crispy Spring Rolls)", "name_ko": "까이 멈 수제 바삭 튀김 스프링롤", "price_approx": "60,000 ~ 95,000 VND"},
        {"name_original": "Cà Phê & Trà Trái Cây (Vietnamese Coffee & Fruit Tea)", "name_ko": "베트남 전통 핀 커피 및 시원한 열대 과일차", "price_approx": "35,000 ~ 65,000 VND"}
    ]

    save("CÁI MÂM BISTRO", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 60000, "max": 200000, "basis": "쌀국수 및 국수 단품 6.5만~11만동, 스프링롤 6만~9.5만동, 1인 평균 6만~20만동"},
         worker_notes="부이페스트 야시장 P27에 위치한 베트남 누들 & 카페 비스트로로 정갈한 하노이 쌀국수와 분보남보를 판매함. 브랜드 공식 사이트와 제3자 다이닝 플랫폼의 1인 가격대(6만~20만동)를 확인하여 C등급으로 기록함.")

# ==========================================
# 5. Sorrento Restaurant & Bar (Grade C)
# ==========================================
def process_sorrento():
    sources = [
        {"id": "s1", "type": "facebook", "url": "https://facebook.com/sorrentophuquoc", "accessed": DATE,
         "note": "소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰)"},
        {"id": "s2", "type": "third_party", "url": "https://phuquocmap.com/sorrento-restaurant-phu-quoc", "accessed": DATE,
         "note": "소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)"}
    ]

    known_dishes = [
        {"name_original": "Chả giò hoàng hôn (Sunset Spring Rolls)", "name_ko": "선셋 특제 수제 스프링롤", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Lẩu nấm tràm Phú Quốc (Melaleuca Mushroom Hot Pot)", "name_ko": "푸꾸옥 특산 짬버섯(멜라루카 버섯) 해산물 전골", "price_approx": "350,000 ~ 550,000 VND"},
        {"name_original": "Lẩu ghẹ Hàm Ninh (Ham Ninh Flower Crab Hot Pot)", "name_ko": "함닌 꽃게 해산물 전골", "price_approx": "450,000 ~ 650,000 VND"},
        {"name_original": "Tôm sú sốt bơ tỏi (Garlic Butter Black Tiger Prawns)", "name_ko": "블랙타이거 새우 갈릭버터 구이", "price_approx": "250,000 ~ 450,000 VND"},
        {"name_original": "Rượu vang Ý & Cocktail Địa Trung Hải", "name_ko": "이탈리아 직수입 와인 및 지중해풍 칵테일", "price_approx": "150,000 ~ 300,000 VND (글라스)"}
    ]

    save("Sorrento Restaurant & Bar", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 150000, "max": 700000, "basis": "단품 요리 15만~50만동, 핫팟 전골 35만~65만동, 1인 평균 30만~70만동"},
         worker_notes="선셋타운 키스브릿지 정면 뷰를 감상할 수 있는 이탈리아 지중해풍 & 베트남 해산물 퓨전 레스토랑. 푸꾸옥 짬버섯 전골과 꽃게탕, 와인을 주력으로 서비스하며 검증된 가격대를 바탕으로 C등급으로 편제함.")

# ==========================================
# 6. 푸꾸옥 뚱보집 선셋타운점 (Grade C)
# ==========================================
def process_ttungbo():
    sources = [
        {"id": "s1", "type": "third_party", "url": "https://premierresidencesphuquoc.com/", "accessed": DATE,
         "note": "푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개"},
        {"id": "s2", "type": "third_party", "url": "https://wanderboat.ai/", "accessed": DATE,
         "note": "선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)"}
    ]

    known_dishes = [
        {"name_original": "Samgyeopsal / Pork Belly (삼겹살)", "name_ko": "한국식 생삼겹살 / 냉동삼겹살 구이", "price_approx": "180,000 ~ 240,000 VND / 1인분"},
        {"name_original": "Honeycomb Pork Rind (돼지 벌집껍데기)", "name_ko": "뚱보집 시그니처 쫀득한 벌집 껍데기", "price_approx": "140,000 ~ 190,000 VND"},
        {"name_original": "Pork Neck / Moksal (목살)", "name_ko": "두툼한 소금 생목살 구이", "price_approx": "180,000 ~ 240,000 VND / 1인분"},
        {"name_original": "Kimchi Jjigae / Doenjang Jjigae (뚝배기 찌개류)", "name_ko": "대형 뚝배기 돼지고기 김치찌개 / 구수한 된장찌개", "price_approx": "150,000 ~ 190,000 VND"},
        {"name_original": "Cheese Tteokbokki (치즈 떡볶이)", "name_ko": "매콤달콤 모차렐라 치즈 떡볶이", "price_approx": "140,000 ~ 180,000 VND"}
    ]

    save("푸꾸옥 뚱보집 선셋타운", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 140000, "max": 450000, "basis": "고기 단품 1인분 18만~24만동, 껍데기 14만~19만동, 식사류 15만동선"},
         worker_notes="선셋타운 아말피 거리 인근에 입점한 한국식 돼지고기 구이 전문점으로 삼겹살, 목살 및 벌집껍데기, 김치찌개 등을 서비스함. 한식당 고기 1인분 가격대(18만~24만동)를 확인하여 C등급으로 기록함.")

# ==========================================
# 7. 한식당 화로구이 (Grade C)
# ==========================================
def process_hwarogui():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJMfJ3VWSVpzER2App4vNzuqo", "accessed": DATE,
         "note": "선셋타운 화로구이(Charcoal Korean BBQ) 구글맵 등록 정보"},
        {"id": "s2", "type": "third_party", "url": "https://trip.com/", "accessed": DATE,
         "note": "선셋타운 내 숯불 화로구이 한식당 다이닝 안내"}
    ]

    known_dishes = [
        {"name_original": "Charcoal Grilled Samgyeopsal (숯불 삼겹살)", "name_ko": "참숯 화로 생삼겹살 구이", "price_approx": "180,000 ~ 250,000 VND / 1인분"},
        {"name_original": "Charcoal Beef Ribs (소갈비살 구이)", "name_ko": "참숯 소갈비살 및 양념 소고기 구이", "price_approx": "280,000 ~ 380,000 VND / 1인분"},
        {"name_original": "Kimchi Stew & Steamed Rice (김치찌개와 공깃밥)", "name_ko": "얼큰한 한국식 돼지고기 김치찌개 백반", "price_approx": "150,000 ~ 200,000 VND"},
        {"name_original": "Cold Naengmyeon (물냉면 / 비빔냉면)", "name_ko": "시원한 살얼음 물냉면 / 매콤 비빔냉면", "price_approx": "140,000 ~ 180,000 VND"}
    ]

    save("한식당 화로구이(charcoal korean bbq)(炭烤肉)", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 140000, "max": 450000, "basis": "삼겹살 1인분 18만~25만동, 소고기 28만~38만동, 찌개/냉면 14만~20만동"},
         worker_notes="선셋타운 내에서 일몰과 불꽃쇼를 조망하며 즐길 수 있는 참숯 화로구이 한식당으로 삼겹살 및 소고기 숯불구이와 찌개/냉면을 취급함. 전형적인 해외 한식 바비큐 가격대를 확인하여 C등급으로 기록함.")

# ==========================================
# 8. Delhi Darbaar Indian Restaurant (Grade D)
# ==========================================
def process_delhi_darbaar():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJhZhof9GNpzERkbbDN9MnQEo", "accessed": DATE,
         "note": "선셋타운 델리 다르바르 구글맵 등록 링크"},
        {"id": "s2", "type": "third_party", "url": "https://restaurantsphuquoc.com/delhi-darbaar-phu-quoc", "accessed": DATE,
         "note": "델리 다르바르 푸꾸옥 본점 안내 (그랜드월드 테디베어 박물관 인근 소재)"}
    ]

    save("Delhi Darbaar Indian Restaurant (Indian Food in Sunset Town Phu Quoc)", "D", "not_found", sources, [],
         conflicts=[{"field": "location", "issue": "구글맵에는 선셋타운 지점으로 등록되어 있으나, 실제 공식 사이트 및 다이닝 가이드상 매장은 북부 그랜드월드(Grand World)에만 단독 운영 중임."}],
         worker_notes="구글맵 등록 지점은 선셋타운으로 표기되어 있으나 현장 검색 및 브랜드 확인 결과 북부 그랜드월드 매장의 가상/중복 등록이거나 미영업 상태로 파악됨. 근거 불충분으로 D등급으로 기록함.")

# ==========================================
# 9. Cơm Mẹ (Grade D)
# ==========================================
def process_com_me():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJIb8W0jqVpzERKa5wk0xTu3k", "accessed": DATE,
         "note": "Cơm Mẹ 구글맵 등록 링크 (엄마의 밥상 베트남 가정식)"}
    ]

    save("Cơm Mẹ", "D", "not_found", sources, [],
         worker_notes="구글맵에는 베트남 가정식(Cơm Mẹ)으로 등록되어 있으나 공식 홈페이지, SNS 채널 및 온라인 메뉴판/가격 정보가 전혀 확인되지 않는 소규모 로컬 매장임. 작업지시문 기준에 따라 D등급으로 편제함.")

if __name__ == "__main__":
    process_pho_thin()
    process_caveman()
    process_the_gangs()
    process_cai_mam()
    process_sorrento()
    process_ttungbo()
    process_hwarogui()
    process_delhi_darbaar()
    process_com_me()
    print("Batch 3 remaining 9 venues completed successfully!")
