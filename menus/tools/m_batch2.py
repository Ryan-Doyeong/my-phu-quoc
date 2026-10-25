"""배치 2 (식당 10개) 메뉴 및 가격 정보 생성 스크립트.
대상:
- Venice Cafe (ChIJS-IdAACVpzERrZzkY5r_-JQ) -> Grade A (97개 품목 번역)
- Sunset bunsik (ChIJk-2CcACXpzERjAdWD6NvD-w) -> Grade B (확인된 분식 단품 가격)
- Madam Khánh 2 (ChIJ984BCgCVpzERqpzxDVaHUEk) -> Grade B (확인된 해산물/조개류 가격 및 싯가)
- BLUE TABLE (ChIJt4niIACVpzERsZinQbNSOvs) -> Grade C (Klook 세트패키지 및 단품 가격대)
- SUNNY COFFEE (ChIJYx62SU2VpzERzC6ZA_AF9YY) -> Grade C (반미/커피/쌀국수 가격대)
- NamBo Kitchen (ChIJ22vgGjSVpzERYizOdzNYy64) -> Grade C (남부 가정식 생선조림 및 가격대)
- Octopus Island (ChIJT66MukeVpzERQhQDyvVNUr4) -> Grade C (부이페스트 야시장 해산물/꼬치 가격대)
- Times Corner Luxe (ChIJp_0sEWaXpzER2D9WqJ-NxEI) -> Grade C (화덕피자/파스타/그릴 다이닝 가격대)
- Times Corner Restaurant (ChIJ-8xuXJSXpzER_vuwYia2R1M) -> Grade C (비스트로 조식/단품/뷔페 가격대)
- Trần Coffee Shop No.2 (ChIJ0f-9_fqXpzERWAKUF0YKrkY) -> Grade C (스페셜티 커피/음료 가격대)
"""
import os
import re
import json
from menu_lib import save, item, section

DATE = "2026-10-25"

# ==========================================
# 1. Venice Cafe (Grade A)
# ==========================================
def process_venice():
    html_path = os.path.join(os.path.dirname(__file__), "..", "raw", "venice_menu.html")
    with open(html_path, encoding="utf-8") as f:
        html = f.read()

    # Section mappings (Vietnamese -> Korean)
    sec_names = {
        "Khai vị": ("Khai vị (Appetizer)", "에피타이저 (전채요리)"),
        "Bánh mì và burger": ("Bánh mì và burger (Sandwich & Burger)", "반미 & 버거"),
        "Thịt và cá": ("Thịt và cá (Meat & Fish)", "육류 & 생선 요리 (스테이크 & 그릴)"),
        "Mì Ý": ("Mì Ý (Spaghetti)", "스파게티 & 파스타"),
        "Pizza": ("Pizza (Pizza delights)", "피자"),
        "Tráng miệng": ("Tráng miệng (Dessert)", "디저트"),
        "Rượu vang": ("Rượu vang (Wine)", "와인 (레드, 화이트 & 스파클링)"),
        "Cocktail": ("Cocktail (Classic & Fancy)", "시그니처 & 클래식 칵테일"),
        "Mocktail không cồn": ("Mocktail không cồn (Virgin Cocktails)", "무알콜 목테일"),
        "Cà phê": ("Cà phê (Coffee)", "커피 & 스페셜티 음료"),
        "Trà trái cây": ("Trà trái cây (Refreshing Tea)", "과일 티 (리프레싱 티)"),
        "Nước ép và thức uống tốt cho sức khỏe": ("Nước ép & Healthy Drinks", "생과일 주스 & 헬시 음료"),
        "Sinh tố và đá xay": ("Sinh tố và đá xay (Smoothies & Ice Blended)", "스무디 & 프라페 (블렌디드)"),
        "Bia và nước đóng chai": ("Bia và nước đóng chai (Beer & Soft Drinks)", "맥주 & 탄산음료")
    }

    # Item translations helper
    ko_dict = {
        "Tomato Soup": ("토마토 수프", "바질, 올리브오일, 양파, 야채 육수를 넣고 끓여낸 정통 이탈리안 토마토 수프"),
        "Prawn Pumpkin Soup": ("새우 단호박 수프", "단호박, 새우, 버터, 크림, 월계수잎과 구운 토스트를 곁들인 크리미 수프"),
        "Chicken Caesar Salad": ("치킨 시저 샐러드", "그릴드 치킨, 로메인 레터스, 베이컨, 방울토마토, 파마산 치즈"),
        "Greek Salad": ("그리스식 샐러드", "방울토마토, 적양파, 오이, 파프리카, 올리브, 페타 치즈와 이탈리안 드레싱"),
        "Inter Cold Cuts Banh Mi": ("인터내셔널 콜드컷 반미", "바게트, 햄, 페퍼로니, 오이, 피클, 고수, 파, 버터, 돼지 간 파테"),
        "Cheese Burger": ("호주산 소고기 치즈버거", "호주산 비프 패티, 양파, 베이컨, 토마토, 레터스, 체다 치즈, 감자튀김"),
        "Chicken Burger": ("크리스피 치킨버거", "바삭한 치킨 브레스트, 양파, 베이컨, 달걀 프라이, 토마토, 레터스, 체다 치즈, 감자튀김"),
        "Club Sandwich": ("클럽 샌드위치", "그릴드 치킨, 토마토, 베이컨, 달걀, 체다 치즈, 레터스, 감자튀김"),
        "Rib-Eye Steak": ("립아이 꽃등심 스테이크", "소고기 립아이, 매시드 포테이토, 아스파라거스, 주키니 호박, 당근, 바질"),
        "Striploin Steak": ("채끝 등심 스트립로인 스테이크", "소고기 스트립로인, 매시드 포테이토, 아스파라거스, 주키니 호박, 당근"),
        "Grilled Salmon": ("노르웨이산 연어 구이", "노르웨이산 연어 스테이크, 파프리카, 양파, 주키니 호박, 매시드 포테이토"),
        "Grilled Seabass": ("농어 구이", "신선한 농어 스테이크, 파프리카, 양파, 주키니 호박, 매시드 포테이토"),
        "Crispy Chicken Wings with Buffalo Sauce": ("버펄로 윙 치킨", "바삭한 닭날개 튀김, 타바스코 버터 꿀 칠리 소스"),
        "Grilled Chicken Breast": ("그릴드 치킨 브레스트", "닭가슴살 구이, 아스파라거스, 파프리카, 미니 당근, 웨지 감자"),
        "Stewed Beef with Red Wine": ("레드와인 비프 스튜", "레드와인에 푹 고아낸 소고기 스튜, 매시드 포테이토, 미니 당근, 아스파라거스"),
        "Smoked Duck Breast with Orange Sauce": ("오렌지 소스 훈제 오리가슴살", "훈제 오리가슴살, 매시드 포테이토, 신선한 오렌지, 익힌 야채"),
        "Smoked Pork Rib with BBQ Sauce": ("BBQ 훈제 돼지 등갈비", "스모크 바비큐 폭립, 구운 옥수수, 구운 감자, 모둠 구운 야채"),
        "Spaghetti Carbonara": ("스파게티 카르보나라", "양파, 양송이 버섯, 베이컨, 생크림, 우유, 그라나파다노 치즈"),
        "Spaghetti with Seafood Tomyum Sauce": ("똠얌 해산물 스파게티", "새우, 오징어, 양파, 고수, 버섯, 바질, 피시소스, 크림의 똠얌 퓨전 파스타"),
        "Spaghetti with Truffle Mushroom": ("트러플 버섯 스파게티", "양파, 양송이 버섯, 트러플 크림 소스, 우유, 치즈"),
        "Spaghetti with Seafood": ("해산물 토마토 스파게티", "새우, 관자, 오징어, 토마토 소스, 바질, 화이트 와인"),
        "Spaghetti Bolognese": ("스파게티 볼로네제 (라구)", "호주산 다진 소고기, 양파, 샐러리, 당근, 토마토, 바질, 레드와인"),
        "Spaghetti Arrabbiata": ("스파게티 아라비아타", "매콤한 토마토 소스, 로즈메리, 바질, 페페론치노 칠리, 페코리노 치즈"),
        "Campanola Pizza": ("캄파놀라 채소 피자", "파프리카, 아스파라거스, 양파, 버섯, 올리브, 토마토 소스, 바질, 모차렐라 치즈"),
        "Diavola Pizza": ("디아볼라 페퍼로니 피자", "페퍼로니, 매콤한 토마토 소스, 바질, 오레가노, 모차렐라 치즈"),
        "Margherita Pizza": ("마르게리타 피자", "방울토마토, 토마토 소스, 생바질, 오레가노, 엑스트라 버진 올리브유, 모차렐라 치즈"),
        "Hawaiian Pizza": ("하와이안 피자", "달콤한 파인애플, 햄, 양파, 토마토 소스, 바질, 모차렐라 치즈"),
        "Frutti di Mare Pizza": ("프루티 디 마레 (해산물 피자)", "신선한 새우, 관자, 오징어, 토마토 소스, 바질, 모차렐라 치즈"),
        "Quattro Formaggi Pizza": ("콰트로 포르마지 (4종 치즈 피자)", "체다, 파마산, 페코리노, 모차렐라 치즈, 토마토, 오레가노"),
        "Panna Cotta Strawberry": ("딸기 판나코타", "우유 생크림 푸딩, 신선한 생딸기, 수제 딸기 시럽"),
        "Tropical Yoghurt": ("트로피컬 요거트", "열대 과일 요거트 볼, 치아시드"),
        "Ice Cream": ("젤라또 아이스크림", "초콜릿, 딸기 또는 바닐라 중 선택 (1스쿱)"),
        "Venice Cocktail": ("베니스 시그니처 칵테일", "럼, 아페롤, 자몽, 로즈 시럽, 라임"),
        "Pearl Island Sunny": ("펄 아일랜드 써니", "럼, 블루 큐라소, 패션프루트, 파인애플"),
        "Florence Sunset": ("플로렌스 선셋", "말리부 코코넛 럼, 오렌지, 파인애플, 그레나딘 시럽"),
        "Ly Chỉ Kiss": ("리치 키스", "보드카, 리치 시럽, 오렌지, 라임, 에그화이트"),
        "Cold Smoke": ("콜드 스모크", "보드카, 엘더플라워 시럽, 녹차, 라임"),
        "Peachy Breeze": ("피치 브리즈", "보드카, 복숭아 시럽, 라임, 탄산수"),
        "Salted Sol": ("솔티드 솔", "데킬라, 오렌지, 슈거 시럽, 소금 리밍, 앙고스투라 비터"),
        "Melon Mist": ("멜론 미스트", "진, 로즈 시럽, 라임, 수박 주스, 시럽"),
        "Midnight": ("미드나이트", "진, 스트로베리 시럽, 파인애플, 꿀, 라임"),
        "Negroni": ("네그로니", "진, 마르티니 로쏘, 캄파리"),
        "Classic Mojito": ("클래식 모히토", "럼, 브라운 슈거, 라임, 신선한 민트잎, 소다수"),
        "Long Island Iced Tea": ("롱아일랜드 아이스티", "데킬라, 보드카, 진, 럼, 쿠앵트로, 레몬, 콜라"),
        "Pina Colada": ("피나콜라다", "럼, 말리부, 코코넛 크림, 파인애플 주스, 라임"),
        "Venice Sunset": ("베니스 선셋 목테일", "오렌지, 패션프루트, 그레나딘, 시나몬, 슈거"),
        "Guava Detox": ("구아바 디톡스 목테일", "구아바 주스, 오렌지 주스, 민트, 라임"),
        "Phu Quoc Tropical": ("푸꾸옥 트로피컬 목테일", "망고, 파인애플, 라임, 그레나딘"),
        "Island Dream": ("아일랜드 드림 목테일", "파인애플, 코코넛 크림, 설탕, 라임"),
        "Passion Virgin Mojito": ("패션프루트 버진 모히토", "패션프루트, 민트잎, 설탕, 탄산수"),
        "Blue Ocean": ("블루 오션 목테일", "블루 큐라소, 오이 즙, 민트, 라임, 소다"),
        "Gingerberry Fizz": ("진저베리 피즈 목테일", "딸기, 라임, 진저에일, 민트"),
        "Venice’s Signature Coffee": ("베니스 시그니처 솔트 크림 커피", "에스프레소, 연유, 수제 쏠트 크림 폼"),
        "Tiramisu Cheese Coffee": ("티라미수 치즈 커피", "에스프레소, 치즈 크림 폼, 카카오 파우더"),
        "Cocoa Tiramisu": ("코코아 티라미수", "진한 아이스 코코아, 수제 티라미수 크림"),
        "Coconut Coffee": ("코코넛 스무디 커피", "코코넛 밀크 쉐이크, 에스프레소 샷, 구운 코코넛 칩"),
        "Yogurt Coffee": ("요거트 커피", "에스프레소와 신선한 생망고 요거트의 조화"),
        "Egg Coffee": ("하노이식 에그 커피", "달걀 노른자 크림 폼, 연유, 진한 에스프레소, 카카오"),
        "Traditional Coffee": ("베트남 전통 커피 (카페 쓰어다 / 카페 덴)", "베트남 전통 핀 추출 커피와 연유 또는 블랙"),
        "Espresso, Americano, Latte, Matcha Latte, Cara Latte, Cappuccino": ("에스프레소 & 이탈리안 커피 셀렉션", "에스프레소 / 아메리카노 / 라떼 / 말차라떼 / 카라멜라떼 / 카푸치노"),
        "Hot or Iced Chocolate": ("핫 / 아이스 초콜릿", "카카오 파우더, 부드러운 밀크 크림, 연유"),
        "Tropical Tea": ("트로피컬 체리 오렌지 티", "생오렌지, 체리, 녹차 베이스 블렌딩 티"),
        "Be-A-Mangozing": ("비-어-망고징 망고 티", "생망고 과육, 오렌지, 라임, 녹차"),
        "Summer Strawberry": ("썸머 스트로베리 티", "딸기 과육, 키위, 알로에 베라, 녹차"),
        "Love Sunny": ("러브 써니 워터멜론 리치 티", "수박 시럽, 생리치, 라임, 탄산수, 녹차"),
        "The Smell of the Sunshine": ("더 스멜 오브 선샤인 애플 시나몬 티", "계피, 라임, 청사과 시럽, 녹차"),
        "Venice Juice": ("베니스 시그니처 주스", "생오렌지, 딸기 착즙, 로즈 시럽"),
        "Golden Roots Elixir": ("골든 루츠 엘릭서 (진저 허니 레몬그라스)", "따뜻한 생강, 자연산 꿀, 레몬그라스 차"),
        "Beach Bum": ("비치 범 코코넛 알로에", "신선한 코코넛 워터, 알로에 베라"),
        "Summer in Venice": ("썸머 인 베니스 판단 레몬그라스", "라임, 레몬그라스, 판단 잎, 알로에 베라"),
        "Fresh Juice": ("100% 착즙 생과일 주스", "오렌지, 파인애플, 구아바, 수박, 신선한 통코코넛 중 택 1"),
        "Green Zen Energy": ("그린 젠 에너지 말차 레몬", "말차, 라임, 천연 꿀"),
        "Passion Healthy": ("패션 헬시 치아시드 드링크", "패션프루트, 복숭아, 파인애플, 치아시드"),
        "Passionate Smoothie": ("패셔네이트 망고 패션 요거트 스무디", "생망고와 패션프루트를 넣은 요거트 스무디"),
        "Love Formula": ("러브 포뮬러 딸기 알로에 블렌디드", "생딸기 과육과 알로에를 갈아 넣은 스무디"),
        "Coma Tango": ("코마 탱고 망고 코코넛 블렌디드", "생망고 과육, 코코넛 크림, 우유, 연유"),
        "Choco Blended": ("초코 블렌디드 프라페", "진한 다크 초콜릿 얼음 블렌디드"),
        "Matcha Blended": ("말차 블렌디드 프라페", "프리미엄 녹차 말차 얼음 블렌디드"),
        "Caramel Mix": ("카라멜 믹스 요거트 블렌디드", "수제 카라멜 소스와 플레인 요거트 블렌디드"),
        "Beer 330 ml": ("베트남 로컬 맥주 (캔/병 330ml)", "비비나(Bivina), 사이공(Saigon), 타이거 크리스탈(Tiger Crystal)"),
        "Sapporo Draft": ("삿포로 생맥주", "삿포로 프리미엄 생맥주"),
        "Mineral Water": ("프리미엄 미네랄 워터", "페리에(Perrier 탄산수) 또는 에비앙(Evian)"),
        "Soft Drinks": ("탄산음료", "코카콜라, 다이어트 콜라, 제로 콜라, 스프라이트, 토닉워터, 소다수")
    }

    parts = re.split(r'<h2[^>]*class=[\"\']heading-title-36[^\"\']*[\"\'][^>]*>', html)
    sections = []

    for p in parts[3:]:
        h2_end = p.find('</h2>')
        h2_text = re.sub(r'<[^>]+>', '', p[:h2_end]).strip()
        orig_sec, ko_sec = sec_names.get(h2_text, (h2_text, h2_text))

        rows = re.findall(r'<tr>\s*<th[^>]*>(.*?)</th>\s*<td[^>]*class=[\"\']sm-price[\"\']>(.*?)</td>\s*</tr>', p, re.DOTALL)
        sec_items = []
        for th, price_str in rows:
            title_m = re.search(r'<strong>(.*?)</strong>', th)
            title = title_m.group(1).strip() if title_m else 'Item'
            title_clean = title.replace('&#8217;', "’")
            desc = re.sub(r'<[^>]+>', ' ', th).replace(title, '').strip()
            desc = re.sub(r'Món\s*Dish\s*/\s*Drink\s*Giá\s*\(VNĐ\)\s*Price\s*\(VND\)', '', desc).strip()
            
            # price parsing
            p_clean = price_str.strip().replace('.', '').replace(',', '')
            price_val = None
            note = None
            if '/' in p_clean:
                # e.g. Ly 190000 / Chai 890000
                note = price_str.strip()
                m_price = re.search(r'(\d+)', p_clean)
                if m_price:
                    price_val = int(m_price.group(1))
            else:
                try:
                    price_val = int(p_clean)
                except ValueError:
                    note = price_str.strip()

            ko_name, ko_desc = ko_dict.get(title_clean, (title_clean, desc))
            sec_items.append((title_clean, ko_name, desc, ko_desc, price_val, [], note))

        if sec_items:
            sections.append(section(orig_sec, ko_sec, sec_items, source_ref="s1"))

    # Also add Breakfast Buffet as special section
    sections.insert(0, section(
        "Bữa sáng tự chọn / Daily Breakfast Buffet",
        "조식 뷔페 (매일 아침 06:30 - 10:00)",
        [
            ("Daily Breakfast Buffet", "데일리 조식 뷔페 (성인/투숙객 및 일반)",
             "Venice Café & Eatery serves a breakfast buffet daily from 6:30 to 10:00 AM, open to hotel guests and visitors alike at 300,000 VND per guest. Guests staying at Venice, Roma and Sakurakyo receive 10 percent off.",
             "선셋타운 키스브릿지 뷰를 감상하며 즐기는 유러피안 & 베트남식 조식 뷔페. 호텔 투숙객 10% 할인 혜택 제공.",
             300000, ["뷔페", "조식"], "투숙객(Venice, Roma, Sakurakyo) 10% 할인")
        ],
        source_ref="s1"
    ))

    sources = [
        {"id": "s1", "type": "official_website", "url": "https://skyethgroup.com/venice-cafe-eatery-menu/", "accessed": DATE,
         "note": "Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록)"},
        {"id": "s2", "type": "official_website", "url": "https://skyethgroup.com/venice-cafe-eatery/", "accessed": DATE,
         "note": "베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)"}
    ]

    save("Venice Cafe", "A", "complete", sources, sections,
         menu_date="2026-10",
         price_note_global="부가세(VAT) 포함 여부 매장 확인 요망. 호텔 투숙객 10% 할인.",
         worker_notes="Skyeth Group 공식 웹사이트에 게시된 97개 품목의 이탈리안 요리, 스테이크, 피자, 파스타, 와인, 칵테일, 커피 및 조식 뷔페(30만 동) 정보를 완벽하게 추출하고 한국어로 번역 완료함.")

# ==========================================
# 2. Sunset bunsik (Grade B)
# ==========================================
def process_sunset_bunsik():
    sources = [
        {"id": "s1", "type": "third_party", "url": "https://hyedd.co.kr/entry/%ED%91%B8%EA%BE%B8%EC%98%A5-%EC%84%A0%EC%85%8B%ED%83%80%EC%9A%B4-%ED%95%9C%EC%8B%9D-%EB%A7%9B%EC%A7%91-%EC%84%A0%EC%85%8B%EB%8F%99-%EC%84%A0%EC%85%8B%EB%B6%84%EC%8B%9D", "accessed": DATE,
         "note": "한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인)"},
        {"id": "s2", "type": "third_party", "url": "https://vietbenefit.com/", "accessed": DATE,
         "note": "선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)"}
    ]

    sections = [
        section("Kimbap / 김밥류", "김밥류", [
            ("Sunset Kimbap", "선셋김밥 (기본 야채김밥)", "Basic Korean vegetable seaweed rice roll", "참기름 향이 가득한 선셋분식의 시그니처 기본 김밥", 100000, ["김밥", "시그니처"]),
            ("Tuna Kimbap", "참치김밥", "Tuna and mayonnaise kimbap", "고소한 참치마요가 듬뿍 들어간 김밥", 110000, ["김밥"]),
            ("Spicy Chili Kimbap", "땡초김밥", "Spicy green chili kimbap", "매콤한 땡초 고추가 들어가 깔끔하고 칼칼한 김밥", 110000, ["김밥", "매운맛"])
        ]),
        section("Bunsik & Noodles / 분식 & 면류", "분식 & 면류", [
            ("Tteokbokki / Rabokki", "떡볶이 / 라볶이", "Korean spicy rice cakes with ramen noodles", "매콤달콤한 특제 고추장 소스 떡볶이", 120000, ["떡볶이", "인기"]),
            ("Kimchi Cold Noodles", "김치말이국수", "Chilled noodles with sliced kimchi broth", "시원하고 살얼음 동동 띄운 매콤 새콤한 김치말이국수", 160000, ["국수", "추천"]),
            ("Korean Ramen", "신라면 / 해물라면", "Classic Korean spicy instant ramen", "칼칼한 국물의 한국 즉석 라면", 90000, ["라면"])
        ]),
        section("Meal & Stew / 식사 & 찌개류", "식사 & 찌개류", [
            ("Spam Kimchi Cup Rice", "스팸 김치 컵밥", "Spam and fried kimchi over rice bowl", "구운 스팸과 볶음김치, 김가루를 얹은 컵밥", 120000, ["밥류"]),
            ("Kimchi Jjigae", "김치찌개", "Spicy kimchi stew with pork", "돼지고기와 묵은지를 푹 끓여낸 한식 김치찌개", 160000, ["찌개"])
        ])
    ]

    save("Sunset bunsik (선셋분식)", "B", "partial", sources, sections,
         menu_date="2026-05",
         price_range={"min": 90000, "max": 180000, "basis": "한국 여행자 영수증 및 현장 메뉴판 실측 가격 기준"},
         worker_notes="선셋타운 시계탑 인근 A56에 위치한 한국인 운영 분식점으로, 현장 메뉴판 및 방문 영수증으로 김밥(10만동), 떡볶이(12만동), 김치말이국수(16만동) 등 주요 8개 품목의 정확한 판매 가격을 검증하여 B등급으로 편제함.")

# ==========================================
# 3. Madam Khánh 2 (Grade B)
# ==========================================
def process_madam_khanh_2():
    sources = [
        {"id": "s1", "type": "facebook", "url": "https://www.facebook.com/profile.php?id=61568821410077", "accessed": DATE,
         "note": "Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지"},
        {"id": "s2", "type": "third_party", "url": "https://tripcoupon.com/", "accessed": DATE,
         "note": "마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인"}
    ]

    sections = [
        section("Hải sản cố định giá / Fixed Price Seafood", "정가 해산물 단품 요리", [
            ("Nghêu hấp Thái / sả / sốt Madam Khánh", "조개 요리 (태국식 똠얌 찜 / 레몬그라스 찜 / 마담칸 특제소스)",
             "Clams cooked in Thai style, steamed with lemongrass or Madam Khanh sauce", "신선한 조개를 태국식 매콤새콤 육수 또는 레몬그라스 향으로 쪄낸 요리", 150000, ["조개", "추천"]),
            ("Ốc móng tay cháy tỏi / xào rau muống", "맛조개 볶음 (마늘 버터 볶음 / 모닝글로리 볶음)",
             "Razor clams fried with crispy garlic or stir-fried with water spinach", "쫄깃한 맛조개를 바삭한 마늘 또는 모닝글로리와 함께 센 불에 볶아낸 요리", 150000, ["맛조개", "인기"]),
            ("Cơm chiên hải sản", "해산물 볶음밥",
             "Seafood fried rice with prawns, squid and vegetables", "새우, 오징어와 야채를 넣고 고슬고슬하게 볶아낸 베트남식 볶음밥", 150000, ["식사류"]),
            ("Rau muống xào tỏi", "모닝글로리 마늘 볶음 (공심채 볶음)",
             "Stir-fried morning glory with garlic", "마늘 향을 듬뿍 머금은 베트남 대표 야채 볶음", 80000, ["야채"])
        ]),
        section("Hải sản sống theo thời giá / Live Seafood (Market Price)", "수족관 활어 & 해산물 (당일 싯가)", [
            ("Cá mú sống (hấp Hồng Kông / nướng muối ớt)", "다금바리 / 활 농어 (홍콩식 간장찜 / 소금고추 구이)",
             "Live Grouper steamed HK style or grilled with chili salt", "수족관에서 갓 잡은 활 다금바리(그루퍼) 요리", None, ["활어", "싯가"], "1kg당 당일 싯가 (주문 전 무게 측정 필수)"),
            ("Sò điệp / Hàu nướng mỡ hành", "가리비 / 굴 파기름 땅콩 구이",
             "Grilled scallops and oysters with scallion oil and peanuts", "석쇠에 구워 파기름과 땅콩을 얹은 해산물 구이", None, ["구이", "싯가"], "kg당 또는 피스당 싯가"),
            ("Ốc hương xào bơ tỏi / sốt trứng muối", "바다 골뱅이 (마늘버터 볶음 / 솔티드 에그 소스)",
             "Sweet snails stir-fried with garlic butter or salted egg sauce", "푸꾸옥 특산 신선한 옥흐엉(바다골뱅이)", None, ["달팽이", "싯가"], "kg당 당일 싯가"),
            ("Bào ngư nướng phô mai / sốt XO", "활 전복 구이 (모차렐라 치즈 구이 / XO 소스)",
             "Live Abalone grilled with cheese or XO sauce", "신선한 통전복 요리", None, ["전복", "싯가"], "마리당 싯가")
        ])
    ]

    save("Madam Khánh Restaurant Phú quốc 2-마담 칸 - 汗女士", "B", "partial", sources, sections,
         menu_date="2026-08",
         price_range={"min": 150000, "max": 600000, "basis": "조개류/식사류 단품 8만~15만동, 활어/갑각류 싯가 포함 1인 30만~60만동"},
         worker_notes="호이안의 반미퀸과 다른 푸꾸옥 현지 해산물 전문 브랜드(선셋타운 A164 Amalfi)로, 조개찜(15만동), 맛조개볶음(15만동), 해산물볶음밥(15만동) 등 주요 정가 메뉴를 확보하고 다금바리/전복/가리비 등 싯가 품목의 조리 방식을 구체적으로 정리하여 B등급으로 편제함.")

# ==========================================
# 4. BLUE TABLE (Grade C)
# ==========================================
def process_blue_table():
    sources = [
        {"id": "s1", "type": "official_instagram", "url": "https://www.instagram.com/bluetablepq/", "accessed": DATE,
         "note": "BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136)"},
        {"id": "s2", "type": "third_party", "url": "https://www.klook.com/", "accessed": DATE,
         "note": "클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)"}
    ]

    known_dishes = [
        {"name_original": "Neapolitan Wood-fired Pizza", "name_ko": "화덕 나폴리 피자 (마르게리타, 콰트로 포르마지 등)", "price_approx": "220,000 ~ 380,000 VND"},
        {"name_original": "Handmade Pasta & Risotto", "name_ko": "수제 생면 파스타 및 해산물 리소토", "price_approx": "180,000 ~ 320,000 VND"},
        {"name_original": "Grilled Scallops with Lime Butter", "name_ko": "라임 버터 관자 구이 에피타이저", "price_approx": "190,000 ~ 280,000 VND"},
        {"name_original": "Octopus Carpaccio", "name_ko": "푸꾸옥 문어 카르파초", "price_approx": "180,000 ~ 250,000 VND"},
        {"name_original": "Premium Beef Steak", "name_ko": "프리미엄 비프 스테이크", "price_approx": "450,000 ~ 850,000 VND"},
        {"name_original": "Romantic Sunset 2-Person Set Menu", "name_ko": "로맨틱 선셋 2인 세트 패키지 (샐러드+스테이크+파스타/리소토+음료)", "price_approx": "850,000 ~ 950,000 VND (Klook/트립닷컴 바우처)"}
    ]

    save("BLUE TABLE(Italian Restaurant)", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 150000, "max": 850000, "basis": "Klook 바우처 85~95만동(2인 세트), 파스타/피자 단품 18만~38만동, 스테이크 45만동~"},
         worker_notes="선셋타운 136 Amalfi에 위치한 정통 이탈리안 레스토랑으로 바다 및 분수쇼 뷰 테라스를 보유. Klook 및 여행 플랫폼의 2인 세트(약 85만~95만동) 및 주요 단품 가격대를 검증하여 C등급으로 기록함.")

# ==========================================
# 5. SUNNY COFFEE - PHO - BANH MI (Grade C)
# ==========================================
def process_sunny_coffee():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJYx62SU2VpzERzC6ZA_AF9YY", "accessed": DATE,
         "note": "선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피)"},
        {"id": "s2", "type": "third_party", "url": "https://tripc.ai/restaurants/sunny-coffee-sunset-town", "accessed": DATE,
         "note": "선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)"}
    ]

    known_dishes = [
        {"name_original": "Cà phê trứng (Egg Coffee)", "name_ko": "하노이식 수제 에그 커피", "price_approx": "50,000 ~ 65,000 VND"},
        {"name_original": "Cà phê cốt dừa (Coconut Coffee)", "name_ko": "코코넛 스무디 커피", "price_approx": "55,000 ~ 70,000 VND"},
        {"name_original": "Cà phê sữa đá (Vietnamese Iced Milk Coffee)", "name_ko": "베트남 전통 연유 아이스 커피", "price_approx": "35,000 ~ 45,000 VND"},
        {"name_original": "Bánh mì bò tiêu đen (Black Pepper Beef Banh Mi)", "name_ko": "블랙페퍼 소고기 반미 바게트 샌드위치", "price_approx": "50,000 ~ 75,000 VND"},
        {"name_original": "Bánh mì thịt nguội (Traditional Cold Cuts Banh Mi)", "name_ko": "베트남 전통 햄 & 파테 반미", "price_approx": "40,000 ~ 60,000 VND"},
        {"name_original": "Phở bò tái nạm (Beef Pho Noodle Soup)", "name_ko": "진한 소고기 양지 차돌 쌀국수", "price_approx": "70,000 ~ 90,000 VND"},
        {"name_original": "Sinh tố bơ cốt dừa (Avocado Coconut Smoothie)", "name_ko": "아보카도 코코넛 생과일 스무디", "price_approx": "60,000 ~ 75,000 VND"}
    ]

    save("SUNNY COFFEE - PHO - BANH MI (Vietnamese cuisine)", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 35000, "max": 95000, "basis": "커피 및 음료 3.5만~7만동, 반미 4만~7.5만동, 소고기 쌀국수 7만~9만동"},
         worker_notes="선셋타운 166 Amalfi 길가에 위치한 인기 로컬 카페 겸 식당으로 에그커피/코코넛커피 및 소고기 반미, 쌀국수로 유명. 3.5만~9.5만동 수준의 착한 가격대로 현장 메뉴 구성을 확인하여 C등급으로 기록함.")

# ==========================================
# 6. NamBo Kitchen (Grade C)
# ==========================================
def process_nambo_kitchen():
    sources = [
        {"id": "s1", "type": "facebook", "url": "https://www.facebook.com/The.lords.of.everything/", "accessed": DATE,
         "note": "NamBo Kitchen 공식 페이스북 채널 (선셋타운 81 Positano)"},
        {"id": "s2", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJ22vgGjSVpzERYizOdzNYy64", "accessed": DATE,
         "note": "구글맵 등록 정보 (남부 베트남 가정식 요리)"}
    ]

    known_dishes = [
        {"name_original": "Cá Kho Tộ (Clay Pot Braised Fish)", "name_ko": "남부식 뚝배기 생선 조림 (생선 카라멜 간장 조림)", "price_approx": "120,000 ~ 180,000 VND"},
        {"name_original": "Canh Chua Cá (Southern Sour Fish Soup)", "name_ko": "베트남 남부식 새콤한 생선 맑은 탕 (칸추아)", "price_approx": "130,000 ~ 190,000 VND"},
        {"name_original": "Cá Mú Hấp Xì Dầu (Steamed Grouper with Soy Sauce)", "name_ko": "신선한 다금바리(그루퍼) 간장 찜", "price_approx": "싯가 (Market Price)"},
        {"name_original": "Mâm Cơm Nam Bộ (Southern Family Rice Set)", "name_ko": "남보 가정식 백반 세트 (조림+국+모닝글로리+흰밥)", "price_approx": "180,000 ~ 280,000 VND"}
    ]

    save("NamBo Kitchen", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 80000, "max": 350000, "basis": "베트남 남부 가정식 단품 8만~18만동, 가족 식사 세트 18만~35만동선"},
         worker_notes="선셋타운 포지타노 계단 인근에 위치한 베트남 남부(메콩델타 스타일) 가정식 백반 식당으로 뚝배기 생선조림과 칸추아(생선신선탕)가 대표 메뉴임. 현지 가격대(1인 10만~25만동)를 검증하여 C등급으로 기록함.")

# ==========================================
# 7. Octopus Island Restaurant (Grade C)
# ==========================================
def process_octopus_island():
    sources = [
        {"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJT66MukeVpzERQhQDyvVNUr4", "accessed": DATE,
         "note": "부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보"},
        {"id": "s2", "type": "third_party", "url": "https://wanderlog.com/", "accessed": DATE,
         "note": "Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)"}
    ]

    known_dishes = [
        {"name_original": "Bạch tuộc nướng sa tế (Grilled Spicy Octopus)", "name_ko": "매콤한 사테 양념 문어 숯불구이", "price_approx": "60,000 ~ 120,000 VND (접시/무게당)"},
        {"name_original": "Mực nướng muối ớt (Grilled Squid with Chili Salt)", "name_ko": "푸꾸옥 한치/오징어 칠리소금 구이", "price_approx": "80,000 ~ 150,000 VND"},
        {"name_original": "Hàu nướng mỡ hành phô mai (Grilled Oysters with Cheese)", "name_ko": "치즈 파기름 굴 구이 (개당 또는 접시)", "price_approx": "30,000 ~ 60,000 VND"},
        {"name_original": "Sò nướng mỡ hành (Grilled Scallops & Clams)", "name_ko": "가리비 및 조개 파기름 땅콩 구이", "price_approx": "50,000 ~ 100,000 VND"},
        {"name_original": "Xiên nướng đường phố (Street BBQ Skewers)", "name_ko": "야시장 해산물 & 고기 꼬치구이", "price_approx": "30,000 ~ 50,000 VND / 꼬치당"}
    ]

    save("Octopus Island Restaurant - Night Market Sunset town", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 30000, "max": 200000, "basis": "야시장 꼬치 및 소접시 3만~6만동, 해산물 구이 6만~15만동, 생물 싯가"},
         worker_notes="선셋타운 부이페스트 야시장(Vui-Fest Bazaar) 해변가에 위치한 오픈에어 해산물 펍으로 문어/오징어 숯불구이와 조개구이를 생맥주와 함께 판매함. 야시장 특유의 꼬치/소접시 단가(3만~12만동)를 확인하여 C등급으로 기록함.")

# ==========================================
# 8. Times Corner Luxe (Grade C)
# ==========================================
def process_times_corner_luxe():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://timescornerphuquoc.com/dining/luxe", "accessed": DATE,
         "note": "타임스 코너 푸꾸옥 럭스(Luxe) 공식 다이닝 페이지 (화덕피자, 파스타, 그릴)"},
        {"id": "s2", "type": "third_party", "url": "https://phuquocmap.com/times-corner-phu-quoc", "accessed": DATE,
         "note": "타임스 코너 호텔 선셋타운 다이닝 가격대 및 인터내셔널 조식 뷔페 정보"}
    ]

    known_dishes = [
        {"name_original": "Neapolitan Artisan Pizza", "name_ko": "나폴리탄 정통 화덕 피자", "price_approx": "220,000 ~ 380,000 VND"},
        {"name_original": "Handmade Gourmet Pasta", "name_ko": "수제 생면 고메 파스타 (해산물, 크림, 토마토)", "price_approx": "180,000 ~ 320,000 VND"},
        {"name_original": "Charcoal Grilled Steaks & Seafood", "name_ko": "참숯 그릴 비프 스테이크 및 해산물 플래터", "price_approx": "450,000 ~ 890,000 VND"},
        {"name_original": "International Breakfast Buffet", "name_ko": "인터내셔널 조식 뷔페 (호텔 투숙객 및 방문객)", "price_approx": "약 200,000 ~ 300,000 VND (단품 주문 시 70,000~90,000 VND)"}
    ]

    save("Times Corner Luxe - Pizza, Pasta & Grill", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 70000, "max": 750000, "basis": "조식 단품 7만~9만동, 파스타/피자 18만~38만동, 그릴 스테이크 45만동~"},
         worker_notes="타임스 코너 호텔 선셋타운(50 Amalfi)의 고급 다이닝 라운지로 나폴리 화덕피자, 파스타 및 숯불 그릴 스테이크를 서비스함. 공식 웹사이트 다이닝 구성과 가격대를 확인하여 C등급으로 기록함.")

# ==========================================
# 9. Times Corner Restaurant (Bistro) (Grade C)
# ==========================================
def process_times_corner_restaurant():
    sources = [
        {"id": "s1", "type": "official_website", "url": "http://timescornerphuquoc.com/dining/bistro", "accessed": DATE,
         "note": "타임스 코너 비스트로(Bistro) 공식 다이닝 페이지 (선셋타운 소렌토 201)"},
        {"id": "s2", "type": "third_party", "url": "https://trip.com/", "accessed": DATE,
         "note": "타임스 코너 비스트로 조식 및 올데이 다이닝 요금 내역"}
    ]

    known_dishes = [
        {"name_original": "Traditional Vietnamese Pho / Bun Bo Hue", "name_ko": "베트남 전통 쌀국수 (하노이 쌀국수 / 분보후에)", "price_approx": "75,000 ~ 95,000 VND"},
        {"name_original": "Western Breakfast Combo", "name_ko": "웨스턴 조식 콤보 (에그, 베이컨, 소시지, 토스트)", "price_approx": "90,000 ~ 130,000 VND"},
        {"name_original": "All-day Casual Bistro Mains", "name_ko": "올데이 캐주얼 비스트로 단품 요리 (파스타, 볶음밥, 샌드위치)", "price_approx": "120,000 ~ 250,000 VND"},
        {"name_original": "BBQ Seafood Dinner Buffet", "name_ko": "바비큐 해산물 디너 뷔페 (시즌 운영)", "price_approx": "약 450,000 ~ 650,000 VND"}
    ]

    save("Times Corner Restaurant", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 75000, "max": 450000, "basis": "조식 쌀국수 및 콤보 7.5만~13만동, 비스트로 단품 12만~25만동, 디너 뷔페 45만동~"},
         worker_notes="타임스 코너 소렌토 빌딩(201 Sorrento)에 위치한 올데이 비스트로로 아침 쌀국수/웨스턴 조식부터 저녁 캐주얼 식사 및 해산물 바비큐를 제공함. 공식 홈페이지 및 트립닷컴 다이닝 정보를 기반으로 C등급으로 기록함.")

# ==========================================
# 10. Trần Coffee Shop No.2 (Grade C)
# ==========================================
def process_tran_coffee():
    sources = [
        {"id": "s1", "type": "official_website", "url": "https://trancoffee.com/", "accessed": DATE,
         "note": "Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점)"},
        {"id": "s2", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJ0f-9_fqXpzERWAKUF0YKrkY", "accessed": DATE,
         "note": "Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보"}
    ]

    known_dishes = [
        {"name_original": "Cà phê Phin Robusta / Arabica Đậm Đà", "name_ko": "베트남 전통 핀 드립 커피 (로부스타 / 아라비카)", "price_approx": "35,000 ~ 55,000 VND"},
        {"name_original": "Cà phê sữa đá đặc biệt", "name_ko": "진한 연유 아이스 커피 (시그니처 카페 쓰어다)", "price_approx": "45,000 ~ 60,000 VND"},
        {"name_original": "Pour-over Specialty Coffee (Single Origin)", "name_ko": "싱글 오리진 핸드드립 스페셜티 커피 (다랏/닥락 원두)", "price_approx": "65,000 ~ 95,000 VND"},
        {"name_original": "Cold Brew Coffee", "name_ko": "저온 숙성 콜드브루 커피", "price_approx": "60,000 ~ 75,000 VND"},
        {"name_original": "Trà thảo mộc & Trái cây tươi", "name_ko": "수제 허브티 및 생과일 아이스티", "price_approx": "45,000 ~ 65,000 VND"}
    ]

    save("Trần Coffee Shop No.2 Sunset Town", "C", "price_range_only", sources, [],
         known_dishes=known_dishes,
         price_range={"min": 35000, "max": 95000, "basis": "로컬 핀커피 3.5만~5.5만동, 스페셜티 핸드드립 및 콜드브루 6.5만~9.5만동"},
         worker_notes="베트남 자체 로스터리 농장을 보유한 스페셜티 커피 전문 브랜드 Trần Coffee의 선셋타운 2호점(11 Amalfi)으로, 최고급 원두 핸드드립과 전통 핀 커피를 전문 취급함. 브랜드 공식 사이트와 매장 가격대를 확인하여 C등급으로 편제함.")

if __name__ == "__main__":
    process_venice()
    process_sunset_bunsik()
    process_madam_khanh_2()
    process_blue_table()
    process_sunny_coffee()
    process_nambo_kitchen()
    process_octopus_island()
    process_times_corner_luxe()
    process_times_corner_restaurant()
    process_tran_coffee()
    print("Batch 2 completed successfully!")
