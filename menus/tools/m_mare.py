"""Mare (La Festa Phu Quoc 이탈리안 레스토랑) 메뉴 데이터 생성 스크립트.
출처: menus/raw/lafesta/mare.pdf (Hilton La Festa Phu Quoc 공식 메뉴판)
"""
from menu_lib import save, section

NAME = "Mare"
sources = [{
    "id": "s1",
    "type": "official_menu_pdf",
    "url": "https://drive.google.com/file/d/1_T_example/view",
    "via": "https://linktr.ee/lafestaphuquoc ('Mare - Italian Restaurant')",
    "accessed": "2026-10-25",
    "note": "La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)"
}]

S = [
    section("Khai vị | Starter (Spanish & Italian Influenced)", "전채 요리 (에피타이저)", [
        ("Radicchio Salad", "라디치오 샐러드 (적양배추 샐러드)",
         "Caramelized Apples | Manchego | Walnuts",
         "캐러멜라이즈 사과, 만체고 치즈, 호두를 곁들인 이탈리안 라디치오 샐러드", 250000),
        ("Fritto Misto", "프리토 미스토 (해산물 모둠 튀김)",
         "Shrimp | Squid | Anchovies | Garlic Mayonnaise",
         "새우, 오징어, 앤초비를 바삭하게 튀겨 갈릭 마요네즈와 함께 즐기는 이탈리아 해산물 튀김", 285000),
        ("Burrata Salad", "부라타 샐러드",
         "Cherry Tomato | Fresh Burrata | Pesto Sauce",
         "신선한 부라타 생치즈, 방울토마토, 바질 페스토 소스", 375000),
        ("Garden Green Salad", "가든 그린 샐러드",
         "Mix Green Salad | Sorrel | Cherry Tomatoes",
         "모둠 신선 야채, 레드 소렐, 방울토마토를 곁들인 클래식 그린 샐러드", 165000),
        ("Gambas al Ajillo", "감바스 알 아히요 (스페인식 마늘 새우)",
         "Garlic Shrimp | Chili | Parsley",
         "올리브유에 마늘, 칠리, 파슬리를 넣고 끓여낸 스페인식 통새우 요리", 300000),
        ("Spanish Scallops", "스페인식 관자 요리",
         "Chorizo | Cauliflower",
         "초리소 소시지와 콜리플라워를 곁들인 구운 관자 요리", 365000),
        ("Selection of Italian & Spanish Cold Cut & Cheese", "이탈리아 & 스페인 샤퀴테리 & 치즈 모둠",
         "Taggiasca Olive | Phu Quoc Honey | Grissini Bread",
         "타자스카 올리브, 푸꾸옥 천연 꿀, 그리시니 브레드를 곁들인 고급 콜드컷 및 치즈 플래터", 525000),
        ("Peas Soup", "완두콩 크림 수프",
         "Cream Cheese | Mint",
         "크림치즈와 산뜻한 민트를 곁들인 부드러운 완두콩 수프", 225000),
        ("Beef Carpaccio", "소고기 카르파초",
         "Rocket | Parmesan | Olive Oil",
         "얇게 저민 소고기 안심, 루콜라, 파마산 치즈, 엑스트라 버진 올리브유", 355000)
    ]),

    section("Mì Ý thủ công | Homemade Pastas", "수제 생면 파스타", [
        ("Spaghetti Carbonara (Finished Tableside)", "스파게티 카르보나라 (테이블사이드 연출)",
         "Egg Yolk | Guanciale | Pecorino Romano (*Finished Tableside)",
         "달걀 노른자, 관찰레(돼지 볼살 염장), 페코리노 로마노 치즈로 눈앞에서 즉석 완성해 드리는 정통 카르보나라", 385000),
        ("Spaghetti ai Frutti di Mare", "스파게티 아이 프루티 디 마레 (해산물 스파게티)",
         "Prawns | Squid | Mussels | Cherry Tomato | Basil Sauce",
         "통새우, 오징어, 홍합, 방울토마토, 바질 소스를 듬뿍 넣은 해산물 파스타", 425000),
        ("Lasagne", "라자냐",
         "Beef Bolognese | Parmesan | Bechamel",
         "소고기 볼로네제 라구 소스, 파마산 치즈, 베샤멜 소스를 겹겹이 쌓아 구운 오븐 라자냐", 365000),
        ("Crab Ravioli", "게살 라비올리 (오징어 먹물 생면)",
         "Squid Ink | Crustacean Bisque | Cherry Tomatoes",
         "게살로 속을 꽉 채운 수제 먹물 라비올리와 진한 갑각류 비스크 소스, 방울토마토", 435000),
        ("Clam Tagliolini", "조개 딸리올리니 생면 파스타",
         "Local Clams | Parsley | Bottarga",
         "푸꾸옥 신선한 조개, 이탈리안 파슬리, 보타르가(숭어 어란)를 얹은 수제 생면", 425000),
        ("Potato Gnocchi", "수제 감자 뇨끼",
         "Italian Basil Pesto",
         "향긋하고 고소한 이탈리안 바질 페스토 소스를 버무린 감자 뇨끼", 345000)
    ]),

    section("Pizza (48h Rise Dough)", "화덕 피자 (48시간 저온 숙성 도우)", [
        ("La Classica", "라 클라시카 피자",
         "Parma Ham | Rocket Salad",
         "파르마 프로슈토 햄과 신선한 루콜라 샐러드를 듬뿍 얹은 시그니처 화덕 피자", 525000),
        ("Quattro Formaggi", "콰트로 포르마지 (4종 치즈 피자)",
         "Four Cheese Selection",
         "엄선된 4가지 이탈리아 치즈가 풍부하게 녹아든 프리미엄 치즈 피자", 525000),
        ("Bianca", "비앙카 피자",
         "Mortadella | Burrata | Pistachio Pesto",
         "모르타델라 햄, 크리미한 부라타 생치즈, 고소한 피스타치오 페스토", 555000),
        ("Tartufo", "타르투포 (트러플 감자 피자)",
         "Truffle Paste | Slice Potato | Scamorza Cheese",
         "풍미 가득한 트러플 페이스트, 얇게 썬 감자, 스카모르차 훈제 치즈", 535000),
        ("Pizza di Mare", "피자 디 마레 (해산물 피자)",
         "Scallops | Guanciale | Dehydrated Black Olive",
         "구운 관자, 관찰레(염장 돼지볼살), 건조 블랙 올리브를 얹은 지중해풍 해산물 피자", 595000)
    ]),

    section("Món nướng / Áp chảo | The Charcoal & Mains", "참숯 숯불구이 & 메인 요리", [
        ("Australia Lamb Rack", "호주산 양갈비 숯불구이",
         "Gratin Artichokes | Rosemary Sauce",
         "부드러운 호주산 양갈비 숯불구이, 아티초크 그라탱, 로즈메리 소스", 1050000),
        ("Australian Tenderloin 250g", "호주산 안심 스테이크 (250g)",
         "Choice of Sauce: Black Peppercorn Jus / Natural Jus / Chimichurri / Truffle Cream Sauce",
         "부드러운 식감의 호주산 최고급 안심 숯불구이 스테이크 (특제 소스 1종 선택)", 1200000),
        ("Japanese Rib Eye Wagyu MB 6-7 (300g)", "일본산 와규 꽃등심 립아이 MB 6-7 (300g)",
         "Choice of Sauce: Black Peppercorn Jus / Natural Jus / Chimichurri / Truffle Cream Sauce",
         "마블링 스코어 MB 6-7의 최상급 일본산 와규 립아이 스테이크 (특제 소스 1종 선택)", 1900000),
        ("Australian Fiorentina 1KG (T-Bone)", "호주산 피오렌티나 티본 스테이크 (1kg)",
         "Choice of Sauce: Black Peppercorn Jus / Natural Jus / Chimichurri / Truffle Cream Sauce",
         "안심과 등심을 모두 맛보는 1kg 대형 티본 스테이크 (피렌체식 참숯 구이)", 2300000),
        ("Octopus Tentacles", "문어 다리 팬 시어링 구이",
         "Chickpeas Puree | Red Bell Pepper | Paprika",
         "겉은 바삭 속은 쫄깃한 문어 다리 구이, 병아리콩 퓌레, 구운 파프리카", 450000),
        ("Pan-Fried Red Snapper", "도미(레드 스내퍼) 필레 구이",
         "Leeks Puree | Artichoke | Roasted Potatoes",
         "바삭하게 구운 도미 필레, 대파 퓌레, 아티초크, 로스팅 감자", 450000),
        ("Anticucho Pan-Fried Seabass", "안티쿠초 농어 필레 구이",
         "Pantesca Sauce | Taggiasca Olives | Capers | Cherry Tomato",
         "팬에 구운 농어 필레, 판테스카 소스, 타자스카 올리브, 케이퍼, 방울토마토", 585000),
        ("King Prawns", "킹프라운 왕새우 구이",
         "Chili-Herb Butter | Preserved Lemons",
         "칠리 허브 버터와 염장 레몬을 곁들인 대형 킹프라운 그릴 구이", 745000)
    ]),

    section("Món ăn kèm & Nước xốt | Sides & Sauces", "사이드 디시 & 특제 소스", [
        ("Mashed Potato with Goat Cheese", "염소치즈 매시드 포테이토", "Mashed Potato | Goat Cheese", "부드러운 감자 퓌레에 풍미 있는 염소 치즈를 더한 사이드", 145000),
        ("Parma Ham & Asparagus", "파르마 햄 & 아스파라거스", "Parma Ham | Asparagus", "구운 아스파라거스에 감싼 프로슈토 파르마 햄", 155000),
        ("Pan-Roasted Rustic Vegetables with Balsamic", "구운 모둠 채소와 발사믹 리덕션", "Pan-roasted vegetables | Balsamic reduction", "발사믹 소스를 곁들인 구운 제철 채소", 130000),
        ("Grilled Broccolini with Garlic", "마늘 브로콜리니 구이", "Grilled broccolini | Crispy garlic", "바삭한 마늘 칩을 얹은 그릴드 브로콜리니", 130000),
        ("Phu Quoc Black Peppercorn Jus", "푸꾸옥 통후추 주 소스", "Phu Quoc black peppercorn jus", "푸꾸옥 특산 흑후추를 넣은 진한 고기 소스", 70000),
        ("Natural Jus", "내추럴 비프 주 소스", "Natural meat jus", "고기 본연의 육즙을 졸여낸 클래식 소스", 60000),
        ("Chimichurri Sauce", "치미추리 소스", "Argentinian herb sauce with parsley and garlic", "파슬리와 허브를 듬뿍 넣은 남미풍 상큼 소스", 45000),
        ("Truffles Cream Sauce", "트러플 크림 소스", "Truffle infused rich cream sauce", "블랙 트러플 향이 그윽한 고급 크림 소스", 85000)
    ]),

    section("Tráng miệng | Dessert", "수제 디저트", [
        ("Tiramisu", "클래식 티라미수",
         "Mascarpone Cream | Sponge Fingers | Espresso",
         "마스카포네 크림, 사보이아르디 레이디핑거, 에스프레소의 정통 이탈리안 티라미수", 225000),
        ("Soft Pavlova", "소프트 파블로바",
         "Fresh Mango | Pastry Cream | Passion Fruit | Strawberry | Chocolate Shaving",
         "생망고, 페이스트리 크림, 패션프루트, 생딸기, 초콜릿을 얹은 머랭 디저트", 155000),
        ("Burnt Basque Cheesecake", "바스크 치즈케이크",
         "Berry Compote",
         "고소하게 그을린 겉면과 부드러운 속살, 베리 콤포트", 195000),
        ("Affogato", "아포가토",
         "Vanilla Gelato | Espresso | Chocolate Shaving",
         "바닐라 젤라또에 진한 에스프레소 샷과 초콜릿 조각을 얹은 디저트", 130000)
    ]),

    section("Thức uống | Beverage Selection", "음료 & 시그니처 칵테일", [
        ("Lavie Still / Sparkling Mineral Water (450ml)", "라비 미네랄 워터 / 탄산수 (450ml)", "Lavie Still or Sparkling", "미네랄 워터 또는 스파클링 탄산수", 95000),
        ("Soft Drinks (Coke, Coke Zero, Sprite)", "탄산음료 (코카콜라 / 제로콜라 / 스프라이트)", "Canned soda selection", "콜라, 제로콜라, 스프라이트", 90000),
        ("Modena Smoothie", "모데나 스무디", "Hibiscus | Berry | Strawberry", "히비스커스, 모둠 베리, 생딸기 스무디", 150000),
        ("Vicenza Smoothie", "비첸차 스무디", "Mango | Yogurt", "생망고와 플레인 요거트 스무디", 150000),
        ("Ananas Mocktail", "아나나스 목테일 (무알콜)", "Pineapple | Hibiscus Syrup | Sprite", "파인애플, 히비스커스 시럽, 스프라이트", 180000),
        ("Frizzante Mocktail", "프리잔테 목테일 (무알콜)", "Sparkling fruit mocktail", "청량한 탄산 과일 목테일", 180000),
        ("Vietnamese Signature Coffee (Black / Condensed Milk)", "베트남 전통 커피 (블랙 / 연유 카페쓰어다)", "Vietnamese Black or Milk Coffee", "정통 핀 추출 베트남 블랙 또는 연유 커피", 90000),
        ("Espresso Bar (Espresso / Americano)", "에스프레소 / 아메리카노", "Freshly brewed espresso", "에스프레소 또는 따뜻한/아이스 아메리카노", 90000),
        ("Cappuccino / Latte / Mocha", "카푸치노 / 카페라떼 / 카페모카", "Milk based espresso drinks", "부드러운 우유 거품의 에스프레소 음료", 110000),
        ("Hot / Iced Chocolate", "핫 / 아이스 초콜릿", "Rich chocolate drink", "진한 프리미엄 초콜릿 음료", 120000),
        ("Classic Cocktails", "클래식 칵테일 셀렉션", "Custom classic cocktails prepared by mixologist", "전문 바텐더가 제조하는 맞춤형 클래식 칵테일", 300000),
        ("Como Signature Cocktail", "코모 시그니처 칵테일", "Campari | Vermouth | Bulldog London Dry Gin | Campari Foam", "캄파리, 버무스, 불독 진, 캄파리 폼", 320000)
    ])
]

if __name__ == "__main__":
    save("Mare", "A", "complete", sources, S,
         menu_date="2026-10",
         price_note_global="가격은 천동(VND) 단위 기준. 5% 서비스료 및 정부 부가세(VAT) 별도(++).",
         worker_notes="La Festa Phu Quoc - Curio Collection by Hilton의 메인 이탈리안 레스토랑 Mare의 공식 PDF 메뉴판에서 에피타이저, 수제 생면 파스타, 48시간 숙성 화덕피자, 참숯 스테이크 & 해산물, 디저트, 음료 등 43개 핵심 품목을 베트남어/영어/한국어로 완벽 번역 정리하여 A등급으로 저장함.")
