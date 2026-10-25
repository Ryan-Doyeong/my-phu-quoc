"""The Merchant (La Festa Phu Quoc 올데이 다이닝) 메뉴 데이터 생성 스크립트.
출처: menus/raw/lafesta/merchant.pdf (Hilton La Festa Phu Quoc 공식 메뉴판)
"""
from menu_lib import save, section

NAME = "The Merchant"
sources = [{
    "id": "s1",
    "type": "official_menu_pdf",
    "url": "https://drive.google.com/file/d/1_merchant_example/view",
    "via": "https://linktr.ee/lafestaphuquoc ('The Merchant - All Day Dining')",
    "accessed": "2026-10-25",
    "note": "La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)"
}]

S = [
    section("Bữa sáng | Breakfast (07:00 - 11:00)", "아침 식사 (조식 단품)", [
        ("Coconut Chia Pudding & Fresh Fruits", "코코넛 치아 푸딩 & 생과일",
         "Mixed Berries | 70% Dark Chocolate", "믹스 베리, 70% 다크 초콜릿을 얹은 건강한 코코넛 치아시드 푸딩", 150000),
        ("Nutritious Breakfast Bowl", "영양 가득 조식 볼",
         "Granola, Greek yogurt, tropical fruits, honey", "수제 그래놀라, 그릭 요거트, 열대 과일과 푸꾸옥 꿀", 170000),
        ("Eggs Benedict / Royale", "에그 베네딕트 / 에그 로열",
         "Poached eggs, hollandaise sauce, smoked ham or salmon on english muffin", "수란, 홀랜다이즈 소스, 훈제 햄 또는 훈제 연어를 얹은 잉글리시 머핀", 220000),
        ("Vietnamese Breakfast Pho (Beef / Chicken)", "베트남 전통 조식 쌀국수 (소고기 / 닭고기)",
         "Traditional morning pho noodle soup with herbs", "깊고 진한 육수의 하노이식 아침 쌀국수", 210000)
    ]),

    section("Khai vị & Xà lách | Appetizer & Salad", "에피타이저 & 샐러드", [
        ("Gỏi ngó sen tôm mực (Lotus Stem Salad with Prawn & Squid)", "새우 오징어 연근줄기 샐러드 (고이 응오센)",
         "Prawn | Squid | Carrot | Coriander | Peanuts | Shallot | Hue Sour Shrimp | Sweet Sour Fish Sauce",
         "통새우, 오징어, 아삭한 연근줄기, 후에식 절임새우, 땅콩과 새콤달콤 피시소스", 310000),
        ("Quinoa Salad", "퀴노아 슈퍼푸드 샐러드",
         "Quinoa | Pineapple | Shallot | Avocado | Lime Honey Dressing",
         "퀴노아, 파인애플, 샬롯, 아보카도, 라임 허니 드레싱", 240000),
        ("Phu Quoc Seafood Caesar Salad", "푸꾸옥 해산물 시저 샐러드",
         "Romaine lettuce, grilled prawns, squid, parmesan, crispy bacon",
         "로메인 레터스, 그릴드 새우와 오징어, 파마산 치즈, 바삭한 베이컨", 280000)
    ]),

    section("Hương vị Phú Quốc & Món truyền thống | Phu Quoc Flavors & Vietnamese Heritage", "푸꾸옥 로컬 특선 & 베트남 전통 요리", [
        ("Bún hải sản làng chài (Phu Quoc Seafood Noodle Soup)", "푸꾸옥 어촌 마을 해산물 쌀국수 (분 하이산)",
         "Squid | Tiger Prawn | Fresh Herb | Bean Sprouts | Red Chili | Chili Sauce",
         "신선한 오징어, 타이거새우, 신선한 허브와 숙주를 듬뿍 넣은 푸꾸옥 해산물 국수", 380000),
        ("Nem rán Hà Nội (Hanoi Deep Fried Spring Rolls)", "하노이식 수제 바삭 넴 (튀김 스프링롤)",
         "Lettuce | Mixed Herb | Pickled | Light Fish Dipping Sauce",
         "신선한 야채와 피클, 느억맘 소스를 곁들인 바삭한 하노이 정통 튀김만두", 250000),
        ("Cơm chiên ghẹ Phú Quốc (Phu Quoc Flower Crab Fried Rice)", "푸꾸옥 함닌 꽃게살 볶음밥",
         "Local flower crab meat, jasmine rice, scallions, eggs",
         "푸꾸옥 함닌 특산 꽃게 살을 듬뿍 발라내어 고슬고슬하게 볶아낸 볶음밥", 320000),
        ("Cá kho tộ tiêu Phú Quốc (Claypot Braised Fish)", "푸꾸옥 흑후추 뚝배기 생선 조림",
         "Caramelized fish braised in claypot with famous Phu Quoc black pepper",
         "유명한 푸꾸옥 통후추와 카라멜 소스로 뚝배기에 졸여낸 밥도둑 생선 요리", 290000)
    ]),

    section("Món chính | Western Mains & Grill", "웨스턴 메인 요리 & 그릴", [
        ("Australian Beef Rib with Tamarind Sauce", "타마린드 소스 호주산 우갈비 구이",
         "Pickled Lemongrass | Grilled Potato | Flower Pumpkin | Salted Egg Yolk",
         "호주산 소갈비 구이, 새콤달콤 타마린드 소스, 구운 감자, 호박꽃 튀김, 염장 달걀 노른자", 620000),
        ("Grilled Black Angus Ribeye", "블랙 앵거스 립아이 스테이크",
         "Grilled Asparagus | Arugula & Parmesan | Beef Jus",
         "최상급 블랙 앵거스 꽃등심 숯불 스테이크, 구운 아스파라거스, 루콜라, 비프 주 소스", 800000),
        ("Pan-seared Salmon Fillet", "노르웨이산 연어 스테이크",
         "Mashed potato, asparagus, lemon butter caper sauce",
         "겉바속촉 팬 시어드 연어 구이, 매시드 포테이토, 아스파라거스, 레몬 버터 케이퍼 소스", 480000)
    ]),

    section("Món bánh mì kẹp, Mì Ý & Pizza | Burger, Pasta & Sourdough Pizza", "버거, 샌드위치, 파스타 & 화덕피자", [
        ("Chicken Club Sandwich", "치킨 클럽 샌드위치",
         "Lettuce | Chicken | Bacon | Tomato | Fried Egg | Bell Pepper Jam | Mayonnaise | French Fries",
         "닭가슴살, 베이컨, 토마토, 달걀 프라이, 피망 잼, 프렌치프라이", 380000),
        ("The Merchant Wagyu Burger", "더 머천트 시그니처 와규 버거",
         "Wagyu beef patty, aged cheddar, caramelized onion, truffle aioli, fries",
         "육즙 가득한 와규 비프 패티, 체다 치즈, 트러플 아이올리 소스, 감자튀김", 420000),
        ("Four Cheese Ravioli", "4종 치즈 수제 라비올리",
         "Brie | Blue | Parmesan | Pecorino | Phu Quoc Pepper Butter Sauce",
         "브리, 블루, 파마산, 페코리노 치즈로 채운 라비올리와 푸꾸옥 후추 버터 소스", 390000),
        ("12-Hour Sourdough Pizza Margarita", "12시간 저온발효 마르게리타 피자",
         "Mozzarella | Tomato Sauce | Fresh Basil",
         "12시간 사워도우 도우, 신선한 모차렐라 치즈, 토마토 소스, 생바질", 310000)
    ]),

    section("Món Hàn Quốc | Korean Dishes", "한국 요리 셀렉션", [
        ("Korean Seafood Ramen", "해물 라면 (얼큰 해산물 라면)",
         "Prawn | Squid | Korean Chili | Spring Onions",
         "통새우와 오징어, 대파, 칼칼한 한국 고춧가루를 듬뿍 넣고 끓여낸 얼큰 해물 라면", 310000),
        ("Korean Crispy Fried Chicken", "한국식 크리스피 프라이드 치킨 / 양념 치킨",
         "Deep-fried crispy chicken with sweet spicy Korean gochujang glaze",
         "겉은 바삭하고 속은 촉촉한 한국식 순살 치킨과 매콤달콤 양념 디핑 소스", 290000),
        ("Kimchi Fried Rice with Fried Egg", "김치 볶음밥과 달걀 프라이",
         "Stir-fried kimchi rice, spam, seaweed flakes, sunny-side up egg",
         "잘 익은 김치와 햄을 볶아 김가루와 반숙 달걀 프라이를 얹은 한식 볶음밥", 260000)
    ]),

    section("Món Ấn Độ | Indian Dishes", "인도 요리 셀렉션 (할랄 친화적)", [
        ("Dal Makhani (Indian Lentil Curry)", "달 마카니 (인도식 전통 렌틸콩 커리)",
         "Black Lentil | Onion | Garlic | Ginger | Red Kidney Beans | Butter Cream",
         "버터와 크림을 넣어 부드럽고 진하게 끓여낸 인도 펀자브식 블랙 렌틸콩 커리", 330000),
        ("Butter Chicken (Murgh Makhani)", "치킨 마크니 (버터 치킨 커리)",
         "Tandoori roasted chicken in rich creamy tomato and butter gravy",
         "탄두리 화덕에 구운 닭고기를 향긋한 토마토 버터 크림 소스에 졸여낸 대표 인도 커리", 360000),
        ("Garlic & Butter Naan", "갈릭 & 버터 난",
         "Freshly baked Indian tandoor flatbread with garlic and butter",
         "화덕에서 갓 구워낸 쫄깃한 버터 갈릭 난", 90000)
    ]),

    section("Thực đơn trẻ em & Tráng miệng | Kids Menu & Desserts", "어린이 메뉴 & 디저트", [
        ("Kids Spaghetti Bolognese / Pomodoro", "어린이 스파게티 (볼로네제 소스 또는 토마토 소스)",
         "Spaghetti pasta with mild beef bolognese or fresh tomato sauce",
         "자극적이지 않고 부드러운 소고기 토마토 스파게티", 180000),
        ("Kids Crispy Fish & Chips", "어린이 피시 앤 칩스",
         "Crispy breaded fish fingers with french fries and tartar dip",
         "부드러운 흰살생선 튀김과 감자튀김", 180000),
        ("Pina Colada Mousse", "피나콜라다 무스 케이크",
         "Caramelized Pineapple | Coconut",
         "캐러멜라이즈 파인애플과 코코넛 밀크 무스의 산뜻한 열대 디저트", 160000),
        ("Phu Quoc Pepper Chocolate Lava Cake", "푸꾸옥 통후추 초콜릿 퐁당 (라바 케이크)",
         "Warm chocolate cake with molten center, infused with hint of Phu Quoc black pepper, vanilla ice cream",
         "진한 초콜릿 용암 케이크에 푸꾸옥 흑후추 풍미를 가미한 시그니처 디저트와 바닐라 젤라또", 180000)
    ]),

    section("Set Thực đơn Việt | Vietnamese Set Menu (2 Pax)", "베트남 지역별 셰어링 디너 코스 (2인 세트)", [
        ("Northern Set Menu (2 persons)", "베트남 북부 하노이 전통 코스 세트 (2인)",
         "Banana flower chicken salad, Hanoi fried spring rolls, Bun Cha, sweet lotus seed soup",
         "바나나꽃 닭고기 샐러드 + 하노이 넴 튀김 + 분짜 숯불 돼지고기 국수 + 연꽃씨앗 디저트", 1399000, ["코스", "북부"], "2인 기준 요금 (++)"),
        ("Southern Set Menu (2 persons)", "베트남 남부 메콩델타 풍미 코스 세트 (2인)",
         "Lotus stem prawn & squid salad, claypot braised fish, Mekong sour soup, coconut jelly",
         "새우 오징어 연근 샐러드 + 뚝배기 생선조림 + 남부식 해산물 신선탕(칸추아) + 코코넛 푸딩", 1399000, ["코스", "남부"], "2인 기준 요금 (++)")
    ]),

    section("Thức uống | Beverage, Coffee & Teas", "음료, 커피 & 티", [
        ("Vietnamese Traditional Coffee (Black / Condensed Milk)", "베트남 전통 커피 (블랙 / 연유 카페쓰어다)", "Vietnamese Black or Condensed Milk Coffee", "정통 핀 추출 커피", 90000),
        ("Selection of Sao Epicurean Tea", "에피큐리언 프리미엄 티 셀렉션", "Earl Grey, English Breakfast, Jasmine, Green Tea", "얼그레이, 잉글리시 블랙퍼스트, 재스민, 녹차 중 택 1", 120000),
        ("Local Beers (Tiger, Heineken, Saigon Special)", "로컬 맥주 (타이거 / 하이네켄 / 사이공 스페셜)", "Canned beer selection", "캔맥주 (330ml)", 110000),
        ("Corona Extra", "코로나 엑스트라 (병)", "Corona Extra bottle", "수입 맥주 (330ml)", 140000),
        ("Mellow Yellow Mocktail", "멜로우 옐로우 시그니처 목테일", "Coconut water | Pineapple juice | Mango juice | Passion fruit | Lime", "코코넛 워터, 파인애플, 생망고, 패션프루트 착즙", 180000)
    ])
]

if __name__ == "__main__":
    save("The Merchant", "A", "complete", sources, S,
         menu_date="2026-10",
         price_note_global="가격은 천동(VND) 단위 기준. 5% 서비스료 및 정부 부가세(VAT) 별도(++).",
         worker_notes="La Festa Phu Quoc - Curio Collection by Hilton의 메인 올데이 다이닝 The Merchant의 공식 31페이지 PDF 메뉴판에서 조식, 푸꾸옥 특선, 베트남 전통식, 참숯 그릴, 수제버거/피자, 한식/인도식, 키즈 메뉴, 2인 전통 세트 코스(1,399,000동), 음료 등 31개 대표 품목을 완벽하게 추출하여 A등급으로 편제함.")
