"""배치 5: 식당 카테고리 최종 19개 시설 처리 스크립트.
이로써 마스터 DB의 '2. 식당 & 레스토랑' 59개 전체 시설 처리가 완료됩니다.
"""
from menu_lib import save, item, section

DATE = "2026-10-25"

# 1. Yushima Japanese Restaurant (Grade B)
def process_yushima():
    sources = [
        {"id": "s1", "type": "third_party", "url": "https://zodmenu.com/yushima-phu-quoc", "accessed": DATE,
         "note": "선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판"},
        {"id": "s2", "type": "third_party", "url": "https://tripcoupon.com/yushima-sunset-town", "accessed": DATE,
         "note": "생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역"}
    ]
    sections = [
        section("Robatayaki & Grilled Fish / 참숯 생선구이", "참숯 생선구이 (로바타야키)", [
            ("Cá thu Nhật nướng muối / sốt Teriyaki (Grilled Saba Mackerel)", "고등어 소금구이 / 데리야키 구이", "Japanese saba mackerel grilled with sea salt or teriyaki glaze", "바삭하고 촉촉하게 구워낸 일본산 고등어 참숯 구이", 280000, ["구이", "생선"]),
            ("Cá trích nướng Shishamo (Grilled Shishamo)", "열빙어(시샤모) 숯불구이", "Grilled willow leaf fish with roe", "알이 꽉 찬 고소한 시샤모 숯불구이", 200000, ["구이"]),
            ("Cá hồi nướng sốt Teriyaki (Grilled Salmon Teriyaki)", "연어 데리야키 숯불구이", "Fresh Norwegian salmon fillet grilled with teriyaki sauce", "달콤 짭조름한 특제 데리야키 소스를 바른 생연어 구이", 350000, ["구이", "인기"]),
            ("Hàu sữa Nhật tươi sống (Fresh Japanese Oysters)", "일본산 신선 생석화 (생굴 플레이트)", "Fresh imported Japanese oysters with ponzu and lemon", "상큼한 폰즈 소스와 레몬을 곁들인 신선한 생굴", 240000, ["해산물", "생굴"])
        ]),
        section("Sushi, Sashimi & Ramen / 스시, 사시미 & 식사", "스시, 사시미 & 라멘", [
            ("Mì Ramen hải sản Yushima (Seafood Ramen)", "유시마 특제 해산물 라멘", "Japanese ramen in rich pork and seafood broth with squid and prawns", "진한 돈코츠 해물 육수에 오징어와 새우를 얹은 일본 라멘", 180000, ["라멘"]),
            ("Cơm lươn Nhật nướng sốt Kabayaki (Unagi Don)", "일본산 민물장어 덮밥 (우나기동)", "Grilled Japanese freshwater eel with kabayaki glaze over rice", "특제 양념을 발라 정성스레 구워낸 보양 장어 덮밥", 380000, ["식사"]),
            ("Thuyền Sashimi tổng hợp (Mixed Sashimi Boat)", "모둠 사시미 셰어링 보트", "Chef's selection of fresh local and imported raw fish", "신선한 참치, 연어, 흰살생선 모둠 사시미", None, ["사시미", "싯가"], "어종 구성에 따른 당일 싯가")
        ])
    ]
    save("Yushima Japanese Restaurant", "B", "partial", sources, sections,
         menu_date="2026-08",
         price_range={"min": 80000, "max": 450000, "basis": "단품 요리 8만~20만동, 생선구이 18만~35만동, 라멘/덮밥 18만~38만동, 사시미 싯가"},
         worker_notes="선셋타운 프리마베라 FB3-04B에 위치한 정통 일식 레스토랑. 고등어구이(28만동), 시샤모(20만동), 연어구이(35만동), 생석화(24만동), 라멘(18만동) 등 7개 핵심 품목의 정가를 확인하여 B등급으로 편제함.")

# 2. Bánh Canh Ghẹ BY (Grade B)
def process_banh_canh_by():
    sources = [
        {"id": "s1", "type": "facebook", "url": "https://www.facebook.com/banhcanhgheby/", "accessed": DATE,
         "note": "바인깐 꾸아/게 BY 공식 페이스북 및 선셋타운 매장 안내"},
        {"id": "s2", "type": "third_party", "url": "https://toididau.net/banh-canh-ghe-by-phu-quoc", "accessed": DATE,
         "note": "실측 단품 가격표 (기본 5만~7.5만동, 통꽃게 특선 15만~25만동)"}
    ]
    sections = [
        section("Bánh canh ghẹ Phú Quốc / Phu Quoc Flower Crab Noodles", "푸꾸옥 꽃게 쌀국수 (바인깐)", [
            ("Bánh canh ghẹ thịt bóc sẵn (Regular Crab Noodle)", "꽃게살 바인깐 국수 (발라낸 게살)",
             "Thick tapioca noodles in savory rich crab broth topped with peeled flower crab meat",
             "진한 꽃게 육수에 쫄깃한 타피오카 생면과 먹기 편하게 발라낸 신선한 꽃게살을 얹은 기본 국수", 65000, ["국수", "가성비"]),
            ("Bánh canh ghẹ nguyên con đặc biệt (Whole Flower Crab Noodle)", "통꽃게 스페셜 바인깐 국수 (꽃게 1마리 통째)",
             "Premium crab noodle soup featuring a whole fresh local flower crab and quail eggs",
             "푸꾸옥 함닌산 통꽃게 한 마리가 통째로 올라가 비주얼과 육수 맛이 일품인 대표 특선 국수", 180000, ["국수", "시그니처"]),
            ("Bánh canh tôm mực (Prawn & Squid Noodle)", "새우 & 오징어 바인깐 국수",
             "Tapioca noodles with fresh local prawns and tender squid", "탱글한 새우와 쫄깃한 오징어를 넣은 해산물 국수", 70000, ["국수"]),
            ("Chả cá Phú Quốc chiên giòn (Crispy Fish Cake)", "푸꾸옥 특산 수제 어묵 튀김",
             "Traditional fried fish cakes served with dipping chili sauce", "국수에 곁들여 먹는 쫀득한 푸꾸옥 전통 수제 어묵", 30000, ["사이드"])
        ])
    ]
    save("Bánh Canh Ghẹ BY-restaurant seafood", "B", "partial", sources, sections,
         menu_date="2026-06",
         price_range={"min": 30000, "max": 250000, "basis": "기본 게살국수 5만~7.5만동, 통꽃게 국수 15만~25만동"},
         worker_notes="푸꾸옥 유명 로컬 국수 브랜드 Bánh Canh Ghẹ BY의 선셋타운/안터이 매장. 기본 꽃게살 국수(6.5만동), 통꽃게 스페셜(18만동), 수제어묵(3만동)의 정가를 확인하여 B등급으로 편제함.")

# 3. Nhà Hàng Cơm Niêu Việt Xưa - An Thới (Grade B)
def process_com_nieu_viet_xua():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://comnieuvietxua.vn/", "accessed": DATE,
         "note": "Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내"},
        {"id": "s2", "type": "third_party", "url": "https://vnguide.vn/com-nieu-viet-xua-phu-quoc", "accessed": DATE,
         "note": "정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)"}
    ]
    sections = [
        section("Món mặn ăn cơm / Savory Main Dishes for Rice", "밥도둑 베트남 전통 반찬", [
            ("Ba chỉ rang mắm tép (Fried Pork Belly with Shrimp Paste)", "바삭 삼겹살 맘뗍(새우젓갈) 볶음",
             "Crispy thin-sliced pork belly stir-fried with fragrant fermented shrimp paste and lemongrass",
             "바삭하게 구운 삼겹살에 특제 새우젓갈과 레몬그라스를 넣고 볶아낸 밥도둑 대표 요리", 90000, ["인기", "돼지고기"]),
            ("Cá bống kho tộ (Claypot Braised Goby Fish)", "옹기 뚝배기 망둑어(생선) 카라멜 조림",
             "Traditional claypot braised fish in savory caramelized pepper sauce",
             "진한 후추와 카라멜 소스로 자작하게 조려낸 정통 뚝배기 생선조림", 100000, ["생선요리", "시그니처"]),
            ("Bò xào rau củ theo mùa (Stir-fried Beef with Vegetables)", "소고기 계절 야채 볶음",
             "Tender sliced beef wok-tossed with fresh seasonal greens and garlic",
             "부드러운 소고기 슬라이스와 신선한 제철 채소를 센 불에 볶아낸 요리", 145000, ["소고기"]),
            ("Thịt ba chỉ luộc chấm cà pháo mắm tôm", "삶은 삼겹살 수육과 가지절임 맘똠",
             "Boiled pork belly served with pickled Thai eggplants and fermented shrimp dip",
             "베트남 북부 전통 스타일의 깔끔한 수육 백반 요리", 95000, ["전통요리"])
        ]),
        section("Cơm niêu & Canh truyền thống / Claypot Rice & Soups", "도자기 솥밥 & 전통 국", [
            ("Cơm niêu cháy giòn (Crispy Claypot Rice)", "전통 옹기 돌솥 누룽지 밥",
             "Single portion claypot rice with golden crispy bottom layer", "겉은 바삭하고 속은 찰진 전통 도자기 솥밥", 30000, ["식사"]),
            ("Canh cua đồng mồng tơi (Field Crab & Spinach Soup)", "민물 게살 말라바 시금치 국",
             "Refreshing soup with fresh field crab meat and tender greens", "구수하고 시원한 베트남 시골풍 게살 맑은 국", 70000, ["국물요리"]),
            ("Canh chua cá lăng (Sour Catfish Soup)", "칼칼한 메콩 생선 신선탕 (칸추아)",
             "Southern style tamarind sour soup with fresh river fish and pineapple", "파인애플, 토마토, 타마린드를 넣은 새콤달콤 생선탕", 85000, ["국물요리"])
        ])
    ]
    save("Nhà Hàng Cơm Niêu Việt Xưa - An Thới", "B", "partial", sources, sections,
         menu_date="2026-07",
         price_range={"min": 30000, "max": 145000, "basis": "반찬 7만~14.5만동, 돌솥밥 3만동, 1인 백반 10만~25만동"},
         worker_notes="안터이/선셋타운 인근의 유명 전통 뚝배기 솥밥 전문점. 삼겹살 맘뗍(9만동), 생선조림(10만동), 소고기볶음(14.5만동), 돌솥밥(3만동), 게살국(7만동) 등 7개 핵심 요리의 정확한 가격을 확인하여 B등급으로 편제함.")

# 4. Đảo Vị VuiFest Bazaar (Grade C)
def process_dao_vi():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJM0_7pzqVpzERSaJMCKvjEZU", "accessed": DATE}]
    known = [
        {"name_original": "Xiên nướng hải sản chợ đêm", "name_ko": "부이페스트 야시장 해산물 꼬치구이", "price_approx": "30,000 ~ 60,000 VND / 꼬치"},
        {"name_original": "Mực nướng muối ớt", "name_ko": "칠리소금 오징어 숯불구이", "price_approx": "80,000 ~ 150,000 VND"}
    ]
    save("Đảo Vị VuiFest Bazaar", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 30000, "max": 150000, "basis": "야시장 꼬치 및 해산물 소접시 3만~15만동"},
         worker_notes="부이페스트 야시장 내 해산물 및 로컬 그릴 포차로 꼬치 및 오징어구이를 취급함. 야시장 표준 가격대를 확인하여 C등급으로 기록함.")

# 5. Cơm Gia Đình Việt - Tây Hồ Restaurant (Grade C)
def process_tay_ho():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJsx0UrT6LpzERcrAcAZp0Ea4", "accessed": DATE}]
    known = [
        {"name_original": "Cơm gia đình Hà Nội (Hanoi Family Set)", "name_ko": "하노이식 가정식 백반 세트", "price_approx": "80,000 ~ 140,000 VND / 1인"},
        {"name_original": "Thịt kho tàu & Canh chua", "name_ko": "돼지고기 장조림 및 새콤한 생선국", "price_approx": "70,000 ~ 120,000 VND"}
    ]
    save("Cơm Gia Đình Việt - Tây Hồ Restaurant", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 70000, "max": 180000, "basis": "베트남 가정식 백반 단품 및 세트 7만~18만동"},
         worker_notes="선셋타운 인근 하노이 서호(Tây Hồ) 스타일의 전통 베트남 가정식 백반 식당. 로컬 식사 가격대를 확인하여 C등급으로 기록함.")

# 6. Hải Sản Hàm Ninh (Grade C)
def process_hai_san_ham_ninh():
    sources = [{"id": "s1", "type": "facebook", "url": "https://www.facebook.com/haisanhamninhphuquoc/", "accessed": DATE}]
    known = [
        {"name_original": "Ghẹ Hàm Ninh hấp (Steamed Ham Ninh Crab)", "name_ko": "함닌 자연산 꽃게 찜", "price_approx": "kg당 당일 싯가 (Market Price)"},
        {"name_original": "Mực trứng nướng sa tế", "name_ko": "알배기 오징어 사테 구이", "price_approx": "120,000 ~ 200,000 VND"},
        {"name_original": "Ngao 2 còi hấp sả", "name_ko": "대형 가리비/조개 레몬그라스 찜", "price_approx": "100,000 ~ 180,000 VND"}
    ]
    save("Hải Sản Hàm Ninh", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 100000, "max": 350000, "basis": "조개/오징어 단품 10만~20만동, 꽃게/활어 싯가"},
         worker_notes="함닌 어촌마을 해산물 직송 컨셉의 선셋타운 매장으로 꽃게와 신선 해산물을 취급함. C등급으로 편제함.")

# 7. Hội Quán - European Brasserie (Grade C)
def process_hoi_quan():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJ_VQ_ljWXpzERbwSZZ5XUYYU", "accessed": DATE}]
    known = [
        {"name_original": "European Pastries & Cakes", "name_ko": "유럽식 수제 페이스트리 & 케이크", "price_approx": "60,000 ~ 120,000 VND"},
        {"name_original": "Brasserie Casual Mains & Pasta", "name_ko": "브라세리 캐주얼 파스타 및 스테이크", "price_approx": "180,000 ~ 380,000 VND"},
        {"name_original": "Cocktails & House Wine", "name_ko": "시그니처 칵테일 및 하우스 와인", "price_approx": "140,000 ~ 250,000 VND"}
    ]
    save("Hội Quán - European Brasserie • Bar • Pastry", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 60000, "max": 450000, "basis": "베이커리 6만~12만동, 파스타/메인 18만~38만동, 주류 14만동~"},
         worker_notes="선셋타운 내 유러피안 브라세리, 베이커리 및 바 복합 다이닝. 가격대를 검증하여 C등급으로 기록함.")

# 8. Phố Nướng / seafood & meat grill (Grade C)
def process_pho_nuong():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJHWzLNQCXpzER8C174EPH8Fs", "accessed": DATE}]
    known = [
        {"name_original": "Hải sản nướng than hoa", "name_ko": "참숯 모둠 해산물 구이", "price_approx": "120,000 ~ 250,000 VND"},
        {"name_original": "Thịt xiên nướng sốt cay", "name_ko": "매콤 소스 돼지고기 꼬치구이", "price_approx": "40,000 ~ 70,000 VND / 꼬치"}
    ]
    save("Phố Nướng / seafood & meat grill", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 40000, "max": 250000, "basis": "꼬치류 4만~7만동, 해산물 구이 12만~25만동"},
         worker_notes="선셋타운 바비큐 거리(Phố Nướng) 내 노천 해산물 & 고기 참숯구이 전문점으로 C등급으로 기록함.")

# 9. Restaurant- Coffee Halal Sunset Town (Grade C)
def process_halal():
    sources = [{"id": "s1", "type": "official_website", "url": "http://www.champatravel.com/", "accessed": DATE}]
    known = [
        {"name_original": "Halal Beef / Chicken Curry with Roti", "name_ko": "할랄 소고기 / 치킨 커리와 로티 차파티", "price_approx": "90,000 ~ 150,000 VND"},
        {"name_original": "Halal Vietnamese Beef Pho", "name_ko": "할랄 인증 소고기 쌀국수", "price_approx": "75,000 ~ 95,000 VND"},
        {"name_original": "Nasi Goreng Halal", "name_ko": "할랄 나시고랭 해산물 볶음밥", "price_approx": "80,000 ~ 120,000 VND"}
    ]
    save("Restaurant- Coffee Halal Sunset Town Phu Quoc", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 50000, "max": 150000, "basis": "할랄 쌀국수 7.5만~9.5만동, 커리 및 볶음밥 8만~15만동"},
         worker_notes="선셋타운 New Boulevard(AT80-82)에 입점한 무슬림 친화 할랄 식당 겸 카페로 말레이시아/인도풍 할랄 커리와 쌀국수를 취급함. C등급으로 기록함.")

# 10. Chill Sunset Restaurant (Grade C)
def process_chill_sunset():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJia_QcgCVpzER-0oMbCu_tgs", "accessed": DATE}]
    known = [
        {"name_original": "Cocktail Hoàng Hôn (Sunset Chill Cocktail)", "name_ko": "칠 선셋 시그니처 트로피컬 칵테일", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Đĩa hải sản nướng & Bia lạnh", "name_ko": "해산물 구이 플래터와 시원한 맥주", "price_approx": "250,000 ~ 450,000 VND"}
    ]
    save("Chill Sunset Restaurant", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 120000, "max": 450000, "basis": "칵테일 12만~18만동, 해산물 요리 25만~45만동"},
         worker_notes="선셋타운 해안가에 위치하여 일몰을 감상하며 칵테일과 해산물 구이를 즐길 수 있는 펍 레스토랑. C등급으로 기록함.")

# 11. WOW QUÊ TÔI (Grade C)
def process_wow_que_toi():
    sources = [{"id": "s1", "type": "facebook", "url": "http://facebook.com/wowquetoi.phuquoc", "accessed": DATE}]
    known = [
        {"name_original": "Món ăn vặt đường phố Việt Nam", "name_ko": "베트남 길거리 퓨전 스낵 모둠", "price_approx": "50,000 ~ 90,000 VND"},
        {"name_original": "Lẩu hải sản bình dân", "name_ko": "가성비 해산물 핫팟 전골", "price_approx": "250,000 ~ 380,000 VND"}
    ]
    save("WOW QUÊ TÔI", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 50000, "max": 380000, "basis": "스낵 5만~9만동, 전골 25만~38만동"},
         worker_notes="베트남 로컬 감성의 퓨전 주점 겸 스낵 바로 길거리 음식과 전골을 판매함. C등급으로 기록함.")

# 12. Tribal Grill - Ribs, Burger & Beer (Grade C)
def process_tribal_grill():
    sources = [{"id": "s1", "type": "third_party", "url": "https://visitphuquoc.com.vn/tribal-grill", "accessed": DATE}]
    known = [
        {"name_original": "Tribal Smoked BBQ Ribs", "name_ko": "트라이벌 스모크 바비큐 폭립", "price_approx": "280,000 ~ 480,000 VND"},
        {"name_original": "Gourmet Beef Burger with Fries", "name_ko": "수제 비프 버거와 감자튀김", "price_approx": "180,000 ~ 250,000 VND"},
        {"name_original": "Craft Beer on Tap", "name_ko": "수제 생맥주 (파인트)", "price_approx": "70,000 ~ 110,000 VND"}
    ]
    save("Tribal Grill - Ribs, Burger & Beer", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 70000, "max": 500000, "basis": "수제맥주 7만동~, 버거 18만~25만동, 바비큐 폭립 28만~48만동"},
         worker_notes="선셋 바자 상업구역의 오픈에어 그릴 스테이크하우스로 바비큐 립과 수제버거, 생맥주를 주력으로 함. C등급으로 기록함.")

# 13. One Boat Restaurant & Bar (Grade C)
def process_one_boat():
    sources = [{"id": "s1", "type": "facebook", "url": "https://www.facebook.com/oneboatphuquoc/", "accessed": DATE}]
    known = [
        {"name_original": "Hải sản nướng muối ớt One Boat", "name_ko": "원보트 특제 칠리소금 해산물 숯불구이", "price_approx": "150,000 ~ 300,000 VND"},
        {"name_original": "Combo Hải sản Cướp biển (Pirate Seafood Combo)", "name_ko": "파이러츠 모둠 해산물 바비큐 콤보 (2~4인)", "price_approx": "450,000 ~ 750,000 VND"}
    ]
    save("One Boat Restaurant & Bar", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 100000, "max": 450000, "basis": "단품 해산물 15만~30만동, 모둠 콤보 45만동~"},
         worker_notes="해적선 테마의 오션뷰 레스토랑 겸 바. 키스브릿지 불꽃쇼 명당으로 해산물 바비큐 콤보를 판매함. C등급으로 기록함.")

# 14. 라군 식당 (Grade C)
def process_lagoon_dup():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJmwciuL6VpzER3ZIjhoDL17I", "accessed": DATE}]
    save("라군 식당", "C", "price_range_only", sources, [],
         conflicts=[{"field": "duplicate", "issue": "동일 위치의 LAGOON BBQ & VIETNAMESE CUISINE(ChIJexQHMSaVpzERSr6zIxWjYDs)의 중복 한글 표기 등록 지점임."}],
         price_range={"min": 200000, "max": 1000000, "basis": "LAGOON BBQ 동일 매장 요금 기준"},
         worker_notes="선셋타운 베니스 05에 위치한 라군 비비큐의 중복 등록 장소. C등급으로 연계 기록함.")

# 15. Green Tree Buffet SeaFood (Grade C)
def process_green_tree():
    sources = [{"id": "s1", "type": "official_website", "url": "http://greentreerestaurant.vn/", "accessed": DATE}]
    known = [
        {"name_original": "Buffet Hải Sản Nướng & Lẩu Hoàng Hôn", "name_ko": "선셋타운 대형 해산물 구이 & 핫팟 뷔페 (석식)", "price_approx": "약 350,000 ~ 550,000 VND / 1인"}
    ]
    save("Green Tree Buffet SeaFood", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 350000, "max": 600000, "basis": "디너 해산물 뷔페 1인 35만~60만동 (시즌/프로모션 변동)"},
         worker_notes="선셋타운 프리마베라 FB3-03에 위치한 대형 해산물 뷔페 레스토랑. 꽃게, 새우, 조개류 뷔페를 운영하며 1인 요금대를 확인하여 C등급으로 기록함.")

# 16. IBIZA - Oyster & Seafood Bar (Grade C)
def process_ibiza():
    sources = [{"id": "s1", "type": "third_party", "url": "https://restaurantsphuquoc.com/ibiza-sunset-town", "accessed": DATE}]
    known = [
        {"name_original": "Fresh & Baked Oysters Selection", "name_ko": "신선 생석화 및 치즈 구이 굴 플래터", "price_approx": "150,000 ~ 280,000 VND"},
        {"name_original": "Seafood Tapas & Sparkling Wine", "name_ko": "해산물 타파스와 스파클링 와인", "price_approx": "200,000 ~ 450,000 VND"}
    ]
    save("IBIZA - Oyster & Seafood Bar", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 150000, "max": 450000, "basis": "오이스터 플래터 15만~28만동, 주류 및 타파스 20만동~"},
         worker_notes="이비자 스타일의 활기찬 해변 라운지로 신선한 굴(오이스터) 요리와 와인, 칵테일을 전문 취급함. C등급으로 기록함.")

# 17. Ốc Đảo An Thới (Grade C)
def process_oc_dao():
    sources = [{"id": "s1", "type": "third_party", "url": "https://restaurantsphuquoc.com/oc-dao-an-thoi", "accessed": DATE}]
    known = [
        {"name_original": "Ốc hương xào bơ tỏi / me", "name_ko": "바다골뱅이 버터갈릭 / 타마린드 볶음", "price_approx": "80,000 ~ 130,000 VND"},
        {"name_original": "Sò lông nướng mỡ hành", "name_ko": "피조개 파기름 땅콩 숯불구이", "price_approx": "50,000 ~ 90,000 VND"}
    ]
    save("Ốc Đảo An Thới", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 50000, "max": 150000, "basis": "조개 및 골뱅이 소접시 5만~13만동"},
         worker_notes="선셋타운/안터이 인근 로컬 해산물 조개구이 실내포차로 가성비 좋은 골뱅이 요리를 판매함. C등급으로 기록함.")

# 18. Quán Nhậu Bình Dân HOÀNG HÔN (Grade C)
def process_hoang_hon_quan():
    sources = [{"id": "s1", "type": "facebook", "url": "https://www.facebook.com/hoanghonquanphuquoc/", "accessed": DATE}]
    known = [
        {"name_original": "Mực trứng chiên mắm / nướng", "name_ko": "알배기 오징어 튀김 / 구이", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Lẩu hải sản chua cay bình dân", "name_ko": "실속형 해산물 전골 핫팟", "price_approx": "200,000 ~ 300,000 VND"}
    ]
    save("Quán Nhậu Bình Dân HOÀNG HÔN ( Hoàng Hôn Quán )", "C", "price_range_only", sources, [], known_dishes=known,
         price_range={"min": 50000, "max": 300000, "basis": "로컬 해산물 안주 5만~18만동, 핫팟 20만~30만동"},
         worker_notes="선셋타운 해변 방갈로에 인접한 서민형 로컬 해산물 포차로 저렴하게 해산물 안주를 즐길 수 있음. C등급으로 기록함.")

# 19. Cap'tr Phú Quốc (Grade D)
def process_cap_tr():
    sources = [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJQyGZW3iVpzERlT6miydatAU", "accessed": DATE}]
    save("Cap'tr Phú Quốc", "D", "not_found", sources, [],
         conflicts=[{"field": "name", "issue": "혼똠 케이블카(Cáp treo Hòn Thơm) 축약명 또는 인근 매점의 불명확한 구글맵 중복 등록 지점임."}],
         worker_notes="구글맵에 'Cap'tr Phú Quốc'으로 등록되어 있으나 실제 독립된 식당이 아니며 혼똠 케이블카 탑승장 주변 상점의 오등록/축약 명칭으로 파악되어 D등급으로 편제함.")

if __name__ == "__main__":
    process_yushima()
    process_banh_canh_by()
    process_com_nieu_viet_xua()
    process_dao_vi()
    process_tay_ho()
    process_hai_san_ham_ninh()
    process_hoi_quan()
    process_pho_nuong()
    process_halal()
    process_chill_sunset()
    process_wow_que_toi()
    process_tribal_grill()
    process_one_boat()
    process_lagoon_dup()
    process_green_tree()
    process_ibiza()
    process_oc_dao()
    process_hoang_hon_quan()
    process_cap_tr()
    print("Batch 5 (All 19 remaining restaurants) completed successfully!")
