--
-- Supabase Seed: My Phu Quoc Business Menus (59 Places)
-- Generated At: 2026-10-25T16:50:29.002Z
-- Total Venues: 95
--
BEGIN;

-- Optional cleanup of previous menu items if re-seeding
DELETE FROM public.business_menu_items;

-- Venue: Times Corner Restaurant (Grade C, place_id: ChIJ-8xuXJSXpzER_vuwYia2R1M)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Traditional Vietnamese Pho / Bun Bo Hue',
  '베트남 전통 쌀국수 (하노이 쌀국수 / 분보후에)',
  'Traditional Vietnamese Pho / Bun Bo Hue',
  75000,
  '75,000 ~ 95,000 VND',
  'C',
  '타임스 코너 비스트로(Bistro) 공식 다이닝 페이지 (선셋타운 소렌토 201); 타임스 코너 비스트로 조식 및 올데이 다이닝 요금 내역',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ-8xuXJSXpzER_vuwYia2R1M'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Western Breakfast Combo',
  '웨스턴 조식 콤보 (에그, 베이컨, 소시지, 토스트)',
  'Western Breakfast Combo',
  90000,
  '90,000 ~ 130,000 VND',
  'C',
  '타임스 코너 비스트로(Bistro) 공식 다이닝 페이지 (선셋타운 소렌토 201); 타임스 코너 비스트로 조식 및 올데이 다이닝 요금 내역',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ-8xuXJSXpzER_vuwYia2R1M'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'All-day Casual Bistro Mains',
  '올데이 캐주얼 비스트로 단품 요리 (파스타, 볶음밥, 샌드위치)',
  'All-day Casual Bistro Mains',
  120000,
  '120,000 ~ 250,000 VND',
  'C',
  '타임스 코너 비스트로(Bistro) 공식 다이닝 페이지 (선셋타운 소렌토 201); 타임스 코너 비스트로 조식 및 올데이 다이닝 요금 내역',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ-8xuXJSXpzER_vuwYia2R1M'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'BBQ Seafood Dinner Buffet',
  '바비큐 해산물 디너 뷔페 (시즌 운영)',
  'BBQ Seafood Dinner Buffet',
  450000,
  '약 450,000 ~ 650,000 VND',
  'C',
  '타임스 코너 비스트로(Bistro) 공식 다이닝 페이지 (선셋타운 소렌토 201); 타임스 코너 비스트로 조식 및 올데이 다이닝 요금 내역',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ-8xuXJSXpzER_vuwYia2R1M'
LIMIT 1;

-- Venue: 케이브맨 스모크 립 & 크래프트 비어 (Caveman Smoked Ribs) (Grade B, place_id: ChIJ013bPieXpzERQbVdD9Sx2Kg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Slow Smoked Pork Ribs (Half Rack - 350g)',
  '저온 훈제 스모크 바비큐 폭립 (하프 랙 350g)',
  'Slow Smoked Pork Ribs (Half Rack - 350g)',
  378000,
  '378,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Slow Smoked Pork Ribs (Full Rack - 700g)',
  '저온 훈제 스모크 바비큐 폭립 (풀 랙 700g)',
  'Slow Smoked Pork Ribs (Full Rack - 700g)',
  690000,
  '690,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caveman Giant Smoked Beef Rib',
  '케이브맨 자이언트 스모크 비프 립 (소갈비 바비큐)',
  'Caveman Giant Smoked Beef Rib',
  1120000,
  '1,120,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Classic Angus Beef Burger',
  '클래식 앵거스 비프 버거 (감자튀김 세트)',
  'Classic Angus Beef Burger',
  234000,
  '234,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Calamari Rings',
  '바삭한 오징어 튀김 (칼라마리 링)',
  'Crispy Calamari Rings',
  185000,
  '185,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Mozzarella Sticks',
  '모차렐라 치즈 스틱 & 어니언링',
  'Crispy Mozzarella Sticks',
  125000,
  '125,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  '2-Hour Unlimited Craft Beer Package',
  '2시간 수제 크래프트 맥주 무제한 패키지',
  '2-Hour Unlimited Craft Beer Package',
  299000,
  '1인 기준 요금',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caveman Craft Beer by Glass (Pilsner / IPA / Stout)',
  '케이브맨 수제 생맥주 (글라스)',
  'Caveman Craft Beer by Glass (Pilsner / IPA / Stout)',
  85000,
  '85,000 VND',
  'B',
  '케이브맨 스모크 립 공식 웹사이트 (선셋타운 48 Positano); 온라인 딜리버리 및 레스토랑 메뉴판 실측 가격 (하프립 37.8만동, 버거 23.4만동); 수제 맥주 2시간 무제한 뷔페 299,000 VND 프로모션 공지',
  '2026-07-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ013bPieXpzERQbVdD9Sx2Kg'
LIMIT 1;

-- Venue: Trần Coffee Shop No.2 Sunset Town (Grade C, place_id: ChIJ0f-9_fqXpzERWAKUF0YKrkY)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Robusta / Arabica Đậm Đà',
  '베트남 전통 핀 드립 커피 (로부스타 / 아라비카)',
  'Cà phê Phin Robusta / Arabica Đậm Đà',
  35000,
  '35,000 ~ 55,000 VND',
  'C',
  'Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점); Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ0f-9_fqXpzERWAKUF0YKrkY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê sữa đá đặc biệt',
  '진한 연유 아이스 커피 (시그니처 카페 쓰어다)',
  'Cà phê sữa đá đặc biệt',
  45000,
  '45,000 ~ 60,000 VND',
  'C',
  'Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점); Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ0f-9_fqXpzERWAKUF0YKrkY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Pour-over Specialty Coffee (Single Origin)',
  '싱글 오리진 핸드드립 스페셜티 커피 (다랏/닥락 원두)',
  'Pour-over Specialty Coffee (Single Origin)',
  65000,
  '65,000 ~ 95,000 VND',
  'C',
  'Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점); Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ0f-9_fqXpzERWAKUF0YKrkY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cold Brew Coffee',
  '저온 숙성 콜드브루 커피',
  'Cold Brew Coffee',
  60000,
  '60,000 ~ 75,000 VND',
  'C',
  'Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점); Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ0f-9_fqXpzERWAKUF0YKrkY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Trà thảo mộc & Trái cây tươi',
  '수제 허브티 및 생과일 아이스티',
  'Trà thảo mộc & Trái cây tươi',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'Trần Coffee 공식 웹사이트 (푸꾸옥 선셋타운 11 Amalfi 및 즈엉동 본점); Trần Coffee Shop No.2 Sunset Town 구글맵 등록 정보',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ0f-9_fqXpzERWAKUF0YKrkY'
LIMIT 1;

-- Venue: 쿵푸 누들 푸꾸옥 (Kungfu Noodle Phú Quốc - 수타면 & 딤섬) (Grade B, place_id: ChIJ1-LOM_iVpzEReC2eAEZgchI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì gà Kungfu (Chicken Hand-pulled Noodle)',
  '쿵푸 닭고기 수타면 (담백한 육수)',
  'Mì gà Kungfu (Chicken Hand-pulled Noodle)',
  50000,
  '50,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì xá xíu Kungfu (Charsiu BBQ Pork Noodle)',
  '쿵푸 정통 차슈 수타면',
  'Mì xá xíu Kungfu (Charsiu BBQ Pork Noodle)',
  55000,
  '55,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì tôm tươi (Fresh Shrimp Noodle)',
  '생새우 수타면',
  'Mì tôm tươi (Fresh Shrimp Noodle)',
  65000,
  '65,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì hải sản đặc biệt (Special Seafood Noodle)',
  '쿵푸 스페셜 모둠 해산물 수타면',
  'Mì hải sản đặc biệt (Special Seafood Noodle)',
  100000,
  '100,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Đĩa xá xíu truyền thống (Charsiu Plate for Sharing)',
  '광동식 정통 꿀 차슈 바비큐 한 접시',
  'Đĩa xá xíu truyền thống (Charsiu Plate for Sharing)',
  150000,
  '150,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà phê đen truyền thống (Traditional Black Coffee)',
  '베트남 전통 블랙 커피',
  'Cà phê đen truyền thống (Traditional Black Coffee)',
  20000,
  '20,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nước ép dừa / cam / xoài (Fresh Fruit Juice)',
  '생과일 착즙 주스 (통코코넛 / 오렌지 / 망고 / 수박)',
  'Nước ép dừa / cam / xoài (Fresh Fruit Juice)',
  30000,
  '30,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sinh tố xoài cốt dừa (Mango Coconut Smoothie)',
  '망고 코코넛 스무디',
  'Sinh tố xoài cốt dừa (Mango Coconut Smoothie)',
  35000,
  '35,000 VND',
  'B',
  '쿵푸 누들 푸꾸옥 공식 온라인 사이트 (선셋타운 VUI-Fest Bazaar 야시장); 쿵푸 누들 정규 수타면 단품 가격표 (치킨면 5만동, 차슈면 5.5만동, 해산물 10만동, 음료 2만~3.5만동)',
  '2026-06-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1-LOM_iVpzEReC2eAEZgchI'
LIMIT 1;

-- Venue: Mai Hương Restaurant - Sunset Town (Grade D, place_id: ChIJ1SUXRwCVpzERK21wkH1D7nM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1SUXRwCVpzERK21wkH1D7nM'
LIMIT 1;

-- Venue: Ốc Đảo An Thới (Grade C, place_id: ChIJ1UTOAQCXpzERJu5SyLaNnBs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Ốc hương xào bơ tỏi / me',
  '바다골뱅이 버터갈릭 / 타마린드 볶음',
  'Ốc hương xào bơ tỏi / me',
  80000,
  '80,000 ~ 130,000 VND',
  'C',
  'https://restaurantsphuquoc.com/oc-dao-an-thoi',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1UTOAQCXpzERJu5SyLaNnBs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sò lông nướng mỡ hành',
  '피조개 파기름 땅콩 숯불구이',
  'Sò lông nướng mỡ hành',
  50000,
  '50,000 ~ 90,000 VND',
  'C',
  'https://restaurantsphuquoc.com/oc-dao-an-thoi',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ1UTOAQCXpzERJu5SyLaNnBs'
LIMIT 1;

-- Venue: 남보 키친 (NamBo Kitchen - Southern Vietnamese Cuisine) (Grade C, place_id: ChIJ22vgGjSVpzERYizOdzNYy64)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cá Kho Tộ (Clay Pot Braised Fish)',
  '남부식 뚝배기 생선 조림 (생선 카라멜 간장 조림)',
  'Cá Kho Tộ (Clay Pot Braised Fish)',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  'NamBo Kitchen 공식 페이스북 채널 (선셋타운 81 Positano); 구글맵 등록 정보 (남부 베트남 가정식 요리)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ22vgGjSVpzERYizOdzNYy64'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Canh Chua Cá (Southern Sour Fish Soup)',
  '베트남 남부식 새콤한 생선 맑은 탕 (칸추아)',
  'Canh Chua Cá (Southern Sour Fish Soup)',
  130000,
  '130,000 ~ 190,000 VND',
  'C',
  'NamBo Kitchen 공식 페이스북 채널 (선셋타운 81 Positano); 구글맵 등록 정보 (남부 베트남 가정식 요리)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ22vgGjSVpzERYizOdzNYy64'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cá Mú Hấp Xì Dầu (Steamed Grouper with Soy Sauce)',
  '신선한 다금바리(그루퍼) 간장 찜',
  'Cá Mú Hấp Xì Dầu (Steamed Grouper with Soy Sauce)',
  NULL,
  '싯가 (Market Price)',
  'C',
  'NamBo Kitchen 공식 페이스북 채널 (선셋타운 81 Positano); 구글맵 등록 정보 (남부 베트남 가정식 요리)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ22vgGjSVpzERYizOdzNYy64'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mâm Cơm Nam Bộ (Southern Family Rice Set)',
  '남보 가정식 백반 세트 (조림+국+모닝글로리+흰밥)',
  'Mâm Cơm Nam Bộ (Southern Family Rice Set)',
  180000,
  '180,000 ~ 280,000 VND',
  'C',
  'NamBo Kitchen 공식 페이스북 채널 (선셋타운 81 Positano); 구글맵 등록 정보 (남부 베트남 가정식 요리)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ22vgGjSVpzERYizOdzNYy64'
LIMIT 1;

-- Venue: 지온 바 & 바이츠 키친 (Giòn Bar & Bites Kitchen) (Grade B, place_id: ChIJ2_09NpGVpzERNU0LHL9210Q)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sunset Town Mojito (Passion Fruit)',
  '선셋 모히토 (패션후르츠 & 민트)',
  'Sunset Town Mojito (Passion Fruit)',
  140000,
  '140,000 VND',
  'B',
  '부이페스트 야시장 Giòn Bar 구글맵 리뷰 정가',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ2_09NpGVpzERNU0LHL9210Q'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phu Quoc Pepper Highball',
  '푸꾸옥 후추 진저 하이볼',
  'Phu Quoc Pepper Highball',
  130000,
  '130,000 VND',
  'B',
  '부이페스트 야시장 Giòn Bar 구글맵 리뷰 정가',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ2_09NpGVpzERNU0LHL9210Q'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gà Giòn Cay Sốt Mắm Tỏi (Crispy Spicy Garlic Fish Sauce Chicken)',
  '크리스피 갈릭 피시소스 치킨',
  'Gà Giòn Cay Sốt Mắm Tỏi (Crispy Spicy Garlic Fish Sauce Chicken)',
  140000,
  '140,000 VND',
  'B',
  '부이페스트 야시장 Giòn Bar 구글맵 리뷰 정가',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ2_09NpGVpzERNU0LHL9210Q'
LIMIT 1;

-- Venue: 드래프트 비어 선셋타운 (Draft Beer Sunset Town Phú Quốc) (Grade B, place_id: ChIJ4-08StuXpzERjwmUJihXMSM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bia Tươi Tiger Crystal / Heineken Cold',
  '타이거 크리스탈 / 하이네켄 생맥주 (Pint)',
  'Bia Tươi Tiger Crystal / Heineken Cold',
  65000,
  '65,000 VND',
  'B',
  '드래프트 비어 공식 SNS 및 현장 메뉴판',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4-08StuXpzERjwmUJihXMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bia Thủ Công Jasmine IPA (Pasteur Street)',
  '파스퇴르 스트리트 자스민 IPA 수제맥주',
  'Bia Thủ Công Jasmine IPA (Pasteur Street)',
  110000,
  '110,000 VND',
  'B',
  '드래프트 비어 공식 SNS 및 현장 메뉴판',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4-08StuXpzERjwmUJihXMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gỏi Cá Trích Phú Quốc (Phu Quoc Herring Salad)',
  '푸꾸옥 전통 청어회 샐러드 (고이까찍)',
  'Gỏi Cá Trích Phú Quốc (Phu Quoc Herring Salad)',
  195000,
  '195,000 VND',
  'B',
  '드래프트 비어 공식 SNS 및 현장 메뉴판',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4-08StuXpzERjwmUJihXMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mực Trứng Nướng Muối Ớt (Grilled Egg Squid with Chili Salt)',
  '알배기 한치(오징어) 숯불구이',
  'Mực Trứng Nướng Muối Ớt (Grilled Egg Squid with Chili Salt)',
  260000,
  '260,000 VND',
  'B',
  '드래프트 비어 공식 SNS 및 현장 메뉴판',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4-08StuXpzERjwmUJihXMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sườn Heo Nướng Sốt BBQ (Grilled BBQ Pork Ribs)',
  '특제 바비큐 폭립 (풀랙)',
  'Sườn Heo Nướng Sốt BBQ (Grilled BBQ Pork Ribs)',
  380000,
  '380,000 VND',
  'B',
  '드래프트 비어 공식 SNS 및 현장 메뉴판',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4-08StuXpzERjwmUJihXMSM'
LIMIT 1;

-- Venue: Bánh Canh Ghẹ BY-restaurant seafood (Grade B, place_id: ChIJ4SO9awCXpzERER4uBviu2l0)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh canh ghẹ thịt bóc sẵn (Regular Crab Noodle)',
  '꽃게살 바인깐 국수 (발라낸 게살)',
  'Bánh canh ghẹ thịt bóc sẵn (Regular Crab Noodle)',
  65000,
  '65,000 VND',
  'B',
  '바인깐 꾸아/게 BY 공식 페이스북 및 선셋타운 매장 안내; 실측 단품 가격표 (기본 5만~7.5만동, 통꽃게 특선 15만~25만동)',
  '2026-06-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4SO9awCXpzERER4uBviu2l0'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh canh ghẹ nguyên con đặc biệt (Whole Flower Crab Noodle)',
  '통꽃게 스페셜 바인깐 국수 (꽃게 1마리 통째)',
  'Bánh canh ghẹ nguyên con đặc biệt (Whole Flower Crab Noodle)',
  180000,
  '180,000 VND',
  'B',
  '바인깐 꾸아/게 BY 공식 페이스북 및 선셋타운 매장 안내; 실측 단품 가격표 (기본 5만~7.5만동, 통꽃게 특선 15만~25만동)',
  '2026-06-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4SO9awCXpzERER4uBviu2l0'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh canh tôm mực (Prawn & Squid Noodle)',
  '새우 & 오징어 바인깐 국수',
  'Bánh canh tôm mực (Prawn & Squid Noodle)',
  70000,
  '70,000 VND',
  'B',
  '바인깐 꾸아/게 BY 공식 페이스북 및 선셋타운 매장 안내; 실측 단품 가격표 (기본 5만~7.5만동, 통꽃게 특선 15만~25만동)',
  '2026-06-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4SO9awCXpzERER4uBviu2l0'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chả cá Phú Quốc chiên giòn (Crispy Fish Cake)',
  '푸꾸옥 특산 수제 어묵 튀김',
  'Chả cá Phú Quốc chiên giòn (Crispy Fish Cake)',
  30000,
  '30,000 VND',
  'B',
  '바인깐 꾸아/게 BY 공식 페이스북 및 선셋타운 매장 안내; 실측 단품 가격표 (기본 5만~7.5만동, 통꽃게 특선 15만~25만동)',
  '2026-06-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4SO9awCXpzERER4uBviu2l0'
LIMIT 1;

-- Venue: Islander PhuQuoc Handmade Gifts & Coffee (Grade C, place_id: ChIJ4XRWXwCVpzER4TmxHDp0HaI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ4XRWXwCVpzER4TmxHDp0HaI',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4XRWXwCVpzER4TmxHDp0HaI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ4XRWXwCVpzER4TmxHDp0HaI',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4XRWXwCVpzER4TmxHDp0HaI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ4XRWXwCVpzER4TmxHDp0HaI',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ4XRWXwCVpzER4TmxHDp0HaI'
LIMIT 1;

-- Venue: Maison Kayser Phu Quoc (Grade C, place_id: ChIJ51OpPgCVpzER-TzMZtCOk0o)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ51OpPgCVpzER-TzMZtCOk0o',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ51OpPgCVpzER-TzMZtCOk0o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ51OpPgCVpzER-TzMZtCOk0o',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ51OpPgCVpzER-TzMZtCOk0o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ51OpPgCVpzER-TzMZtCOk0o',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ51OpPgCVpzER-TzMZtCOk0o'
LIMIT 1;

-- Venue: Antalya Turkish Cuisine-Sunset Town (Grade D, place_id: ChIJ5ZFzqOiVpzERxxGEcmIZi3g)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ5ZFzqOiVpzERxxGEcmIZi3g'
LIMIT 1;

-- Venue: Madam Khánh Restaurant Phú quốc 2-마담 칸 - 汗女士 (Grade B, place_id: ChIJ984BCgCVpzERqpzxDVaHUEk)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nghêu hấp Thái / sả / sốt Madam Khánh',
  '조개 요리 (태국식 똠얌 찜 / 레몬그라스 찜 / 마담칸 특제소스)',
  'Nghêu hấp Thái / sả / sốt Madam Khánh',
  150000,
  '150,000 VND',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ốc móng tay cháy tỏi / xào rau muống',
  '맛조개 볶음 (마늘 버터 볶음 / 모닝글로리 볶음)',
  'Ốc móng tay cháy tỏi / xào rau muống',
  150000,
  '150,000 VND',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm chiên hải sản',
  '해산물 볶음밥',
  'Cơm chiên hải sản',
  150000,
  '150,000 VND',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rau muống xào tỏi',
  '모닝글로리 마늘 볶음 (공심채 볶음)',
  'Rau muống xào tỏi',
  80000,
  '80,000 VND',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá mú sống (hấp Hồng Kông / nướng muối ớt)',
  '다금바리 / 활 농어 (홍콩식 간장찜 / 소금고추 구이)',
  'Cá mú sống (hấp Hồng Kông / nướng muối ớt)',
  NULL,
  '1kg당 당일 싯가 (주문 전 무게 측정 필수)',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sò điệp / Hàu nướng mỡ hành',
  '가리비 / 굴 파기름 땅콩 구이',
  'Sò điệp / Hàu nướng mỡ hành',
  NULL,
  'kg당 또는 피스당 싯가',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ốc hương xào bơ tỏi / sốt trứng muối',
  '바다 골뱅이 (마늘버터 볶음 / 솔티드 에그 소스)',
  'Ốc hương xào bơ tỏi / sốt trứng muối',
  NULL,
  'kg당 당일 싯가',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bào ngư nướng phô mai / sốt XO',
  '활 전복 구이 (모차렐라 치즈 구이 / XO 소스)',
  'Bào ngư nướng phô mai / sốt XO',
  NULL,
  '마리당 싯가',
  'B',
  'Madam Khánh Restaurant Phú Quốc 2 공식 페이스북 페이지; 마담 칸 선셋타운점(A164 Amalfi) 정규 메뉴판 및 단품 정가 내역 확인',
  '2026-08-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ984BCgCVpzERqpzxDVaHUEk'
LIMIT 1;

-- Venue: 선 바바리아 가스트로펍 (Sun Bavaria GastroPub - Sun KraftBeer) (Grade B, place_id: ChIJAwwqc2yVpzER_4K_0feO5I8)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun KraftBeer Munich Helles (Lager)',
  '뮌헨 헬레스 라거 수제맥주 (500ml)',
  'Sun KraftBeer Munich Helles (Lager)',
  120000,
  '120,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun KraftBeer Weizen (Wheat Beer)',
  '바이젠 밀맥주 (500ml)',
  'Sun KraftBeer Weizen (Wheat Beer)',
  130000,
  '130,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun KraftBeer Dark Dunkel',
  '둔켈 흑맥주 (500ml)',
  'Sun KraftBeer Dark Dunkel',
  130000,
  '130,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Đùi Heo Muối Chiên Giòn (Crispy Bavarian Schweinshaxe)',
  '독일식 슈바인학센 (겉바속촉 족발 구이)',
  'Đùi Heo Muối Chiên Giòn (Crispy Bavarian Schweinshaxe)',
  480000,
  '480,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Xúc Xích Đức Tổng Hợp (Assorted German Sausages Platter)',
  '독일식 모둠 수제 소시지 플래터',
  'Xúc Xích Đức Tổng Hợp (Assorted German Sausages Platter)',
  350000,
  '350,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gói Buffet Tối + Xem Show Symphony of the Sea (Dinner Buffet & Show)',
  '디너 뷔페 + 심포니 오브 더 씨 수상쇼 관람 패키지 (1인)',
  'Gói Buffet Tối + Xem Show Symphony of the Sea (Dinner Buffet & Show)',
  850000,
  '850,000 VND',
  'B',
  '선그룹 선 바바리아 가스트로펍 공식 요금 및 메뉴',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJAwwqc2yVpzER_4K_0feO5I8'
LIMIT 1;

-- Venue: 더 머천트 (The Merchant - La Festa Hilton 올데이 다이닝) (Grade A, place_id: ChIJD-a4fwCVpzERA9KJ8gWE4cA)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coconut Chia Pudding & Fresh Fruits',
  '코코넛 치아 푸딩 & 생과일',
  'Coconut Chia Pudding & Fresh Fruits',
  150000,
  '150,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nutritious Breakfast Bowl',
  '영양 가득 조식 볼',
  'Nutritious Breakfast Bowl',
  170000,
  '170,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Eggs Benedict / Royale',
  '에그 베네딕트 / 에그 로열',
  'Eggs Benedict / Royale',
  220000,
  '220,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Breakfast Pho (Beef / Chicken)',
  '베트남 전통 조식 쌀국수 (소고기 / 닭고기)',
  'Vietnamese Breakfast Pho (Beef / Chicken)',
  210000,
  '210,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gỏi ngó sen tôm mực (Lotus Stem Salad with Prawn & Squid)',
  '새우 오징어 연근줄기 샐러드 (고이 응오센)',
  'Gỏi ngó sen tôm mực (Lotus Stem Salad with Prawn & Squid)',
  310000,
  '310,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Quinoa Salad',
  '퀴노아 슈퍼푸드 샐러드',
  'Quinoa Salad',
  240000,
  '240,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phu Quoc Seafood Caesar Salad',
  '푸꾸옥 해산물 시저 샐러드',
  'Phu Quoc Seafood Caesar Salad',
  280000,
  '280,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bún hải sản làng chài (Phu Quoc Seafood Noodle Soup)',
  '푸꾸옥 어촌 마을 해산물 쌀국수 (분 하이산)',
  'Bún hải sản làng chài (Phu Quoc Seafood Noodle Soup)',
  380000,
  '380,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nem rán Hà Nội (Hanoi Deep Fried Spring Rolls)',
  '하노이식 수제 바삭 넴 (튀김 스프링롤)',
  'Nem rán Hà Nội (Hanoi Deep Fried Spring Rolls)',
  250000,
  '250,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm chiên ghẹ Phú Quốc (Phu Quoc Flower Crab Fried Rice)',
  '푸꾸옥 함닌 꽃게살 볶음밥',
  'Cơm chiên ghẹ Phú Quốc (Phu Quoc Flower Crab Fried Rice)',
  320000,
  '320,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá kho tộ tiêu Phú Quốc (Claypot Braised Fish)',
  '푸꾸옥 흑후추 뚝배기 생선 조림',
  'Cá kho tộ tiêu Phú Quốc (Claypot Braised Fish)',
  290000,
  '290,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Australian Beef Rib with Tamarind Sauce',
  '타마린드 소스 호주산 우갈비 구이',
  'Australian Beef Rib with Tamarind Sauce',
  620000,
  '620,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Black Angus Ribeye',
  '블랙 앵거스 립아이 스테이크',
  'Grilled Black Angus Ribeye',
  800000,
  '800,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan-seared Salmon Fillet',
  '노르웨이산 연어 스테이크',
  'Pan-seared Salmon Fillet',
  480000,
  '480,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chicken Club Sandwich',
  '치킨 클럽 샌드위치',
  'Chicken Club Sandwich',
  380000,
  '380,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'The Merchant Wagyu Burger',
  '더 머천트 시그니처 와규 버거',
  'The Merchant Wagyu Burger',
  420000,
  '420,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Four Cheese Ravioli',
  '4종 치즈 수제 라비올리',
  'Four Cheese Ravioli',
  390000,
  '390,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  '12-Hour Sourdough Pizza Margarita',
  '12시간 저온발효 마르게리타 피자',
  '12-Hour Sourdough Pizza Margarita',
  310000,
  '310,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Korean Seafood Ramen',
  '해물 라면 (얼큰 해산물 라면)',
  'Korean Seafood Ramen',
  310000,
  '310,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Korean Crispy Fried Chicken',
  '한국식 크리스피 프라이드 치킨 / 양념 치킨',
  'Korean Crispy Fried Chicken',
  290000,
  '290,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kimchi Fried Rice with Fried Egg',
  '김치 볶음밥과 달걀 프라이',
  'Kimchi Fried Rice with Fried Egg',
  260000,
  '260,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dal Makhani (Indian Lentil Curry)',
  '달 마카니 (인도식 전통 렌틸콩 커리)',
  'Dal Makhani (Indian Lentil Curry)',
  330000,
  '330,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Butter Chicken (Murgh Makhani)',
  '치킨 마크니 (버터 치킨 커리)',
  'Butter Chicken (Murgh Makhani)',
  360000,
  '360,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Garlic & Butter Naan',
  '갈릭 & 버터 난',
  'Garlic & Butter Naan',
  90000,
  '90,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kids Spaghetti Bolognese / Pomodoro',
  '어린이 스파게티 (볼로네제 소스 또는 토마토 소스)',
  'Kids Spaghetti Bolognese / Pomodoro',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kids Crispy Fish & Chips',
  '어린이 피시 앤 칩스',
  'Kids Crispy Fish & Chips',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pina Colada Mousse',
  '피나콜라다 무스 케이크',
  'Pina Colada Mousse',
  160000,
  '160,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phu Quoc Pepper Chocolate Lava Cake',
  '푸꾸옥 통후추 초콜릿 퐁당 (라바 케이크)',
  'Phu Quoc Pepper Chocolate Lava Cake',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Northern Set Menu (2 persons)',
  '베트남 북부 하노이 전통 코스 세트 (2인)',
  'Northern Set Menu (2 persons)',
  1399000,
  '2인 기준 요금 (++)',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Southern Set Menu (2 persons)',
  '베트남 남부 메콩델타 풍미 코스 세트 (2인)',
  'Southern Set Menu (2 persons)',
  1399000,
  '2인 기준 요금 (++)',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Traditional Coffee (Black / Condensed Milk)',
  '베트남 전통 커피 (블랙 / 연유 카페쓰어다)',
  'Vietnamese Traditional Coffee (Black / Condensed Milk)',
  90000,
  '90,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Selection of Sao Epicurean Tea',
  '에피큐리언 프리미엄 티 셀렉션',
  'Selection of Sao Epicurean Tea',
  120000,
  '120,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Local Beers (Tiger, Heineken, Saigon Special)',
  '로컬 맥주 (타이거 / 하이네켄 / 사이공 스페셜)',
  'Local Beers (Tiger, Heineken, Saigon Special)',
  110000,
  '110,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Corona Extra',
  '코로나 엑스트라 (병)',
  'Corona Extra',
  140000,
  '140,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mellow Yellow Mocktail',
  '멜로우 옐로우 시그니처 목테일',
  'Mellow Yellow Mocktail',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 올데이 다이닝 The Merchant 공식 메뉴판 PDF (menus/raw/lafesta/merchant.pdf)',
  '2026-10-01'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJD-a4fwCVpzERA9KJ8gWE4cA'
LIMIT 1;

-- Venue: The Juliet Coffee & Dessert - AMA71 (Grade C, place_id: ChIJE6Jt3vuVpzERA6ErTfB79es)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJE6Jt3vuVpzERA6ErTfB79es',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJE6Jt3vuVpzERA6ErTfB79es'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJE6Jt3vuVpzERA6ErTfB79es',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJE6Jt3vuVpzERA6ErTfB79es'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJE6Jt3vuVpzERA6ErTfB79es',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJE6Jt3vuVpzERA6ErTfB79es'
LIMIT 1;

-- Venue: The Ivy Café & Lounge Phu Quoc (Grade C, place_id: ChIJEUml2SuVpzER3wqcSc2d9yg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJEUml2SuVpzER3wqcSc2d9yg',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJEUml2SuVpzER3wqcSc2d9yg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJEUml2SuVpzER3wqcSc2d9yg',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJEUml2SuVpzER3wqcSc2d9yg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJEUml2SuVpzER3wqcSc2d9yg',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJEUml2SuVpzER3wqcSc2d9yg'
LIMIT 1;

-- Venue: 카페 그린 선셋타운 (Cafe Green - 망고빙수 전문) (Grade B, place_id: ChIJFU6xryaXpzERe2HL0ChKMXY)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bingsu Xoài Tươi (Fresh Mango Snowflake Bingsu)',
  '생망고 눈꽃빙수 (대표 시그니처)',
  'Bingsu Xoài Tươi (Fresh Mango Snowflake Bingsu)',
  160000,
  '160,000 VND',
  'B',
  '구글맵 리뷰 사진 실측 메뉴판',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFU6xryaXpzERe2HL0ChKMXY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sinh Tố Xoài (Fresh Mango Smoothie)',
  '생망고 스무디',
  'Sinh Tố Xoài (Fresh Mango Smoothie)',
  70000,
  '70,000 VND',
  'B',
  '구글맵 리뷰 사진 실측 메뉴판',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFU6xryaXpzERe2HL0ChKMXY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà Phê Cốt Dừa (Iced Coconut Coffee)',
  '코코넛 커피 스무디',
  'Cà Phê Cốt Dừa (Iced Coconut Coffee)',
  65000,
  '65,000 VND',
  'B',
  '구글맵 리뷰 사진 실측 메뉴판',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFU6xryaXpzERe2HL0ChKMXY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà phê Americano',
  '아이스 아메리카노',
  'Cà phê Americano',
  50000,
  '50,000 VND',
  'B',
  '구글맵 리뷰 사진 실측 메뉴판',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFU6xryaXpzERe2HL0ChKMXY'
LIMIT 1;

-- Venue: 마레 (Mare - La Festa Hilton 이탈리안 레스토랑) (Grade A, place_id: ChIJFUbrywqVpzERZ-766zaQ1NE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Radicchio Salad',
  '라디치오 샐러드 (적양배추 샐러드)',
  'Radicchio Salad',
  250000,
  '250,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Fritto Misto',
  '프리토 미스토 (해산물 모둠 튀김)',
  'Fritto Misto',
  285000,
  '285,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Burrata Salad',
  '부라타 샐러드',
  'Burrata Salad',
  375000,
  '375,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Garden Green Salad',
  '가든 그린 샐러드',
  'Garden Green Salad',
  165000,
  '165,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gambas al Ajillo',
  '감바스 알 아히요 (스페인식 마늘 새우)',
  'Gambas al Ajillo',
  300000,
  '300,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spanish Scallops',
  '스페인식 관자 요리',
  'Spanish Scallops',
  365000,
  '365,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Selection of Italian & Spanish Cold Cut & Cheese',
  '이탈리아 & 스페인 샤퀴테리 & 치즈 모둠',
  'Selection of Italian & Spanish Cold Cut & Cheese',
  525000,
  '525,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Peas Soup',
  '완두콩 크림 수프',
  'Peas Soup',
  225000,
  '225,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Beef Carpaccio',
  '소고기 카르파초',
  'Beef Carpaccio',
  355000,
  '355,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Carbonara (Finished Tableside)',
  '스파게티 카르보나라 (테이블사이드 연출)',
  'Spaghetti Carbonara (Finished Tableside)',
  385000,
  '385,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti ai Frutti di Mare',
  '스파게티 아이 프루티 디 마레 (해산물 스파게티)',
  'Spaghetti ai Frutti di Mare',
  425000,
  '425,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lasagne',
  '라자냐',
  'Lasagne',
  365000,
  '365,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crab Ravioli',
  '게살 라비올리 (오징어 먹물 생면)',
  'Crab Ravioli',
  435000,
  '435,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Clam Tagliolini',
  '조개 딸리올리니 생면 파스타',
  'Clam Tagliolini',
  425000,
  '425,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Potato Gnocchi',
  '수제 감자 뇨끼',
  'Potato Gnocchi',
  345000,
  '345,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'La Classica',
  '라 클라시카 피자',
  'La Classica',
  525000,
  '525,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Quattro Formaggi',
  '콰트로 포르마지 (4종 치즈 피자)',
  'Quattro Formaggi',
  525000,
  '525,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bianca',
  '비앙카 피자',
  'Bianca',
  555000,
  '555,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tartufo',
  '타르투포 (트러플 감자 피자)',
  'Tartufo',
  535000,
  '535,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza di Mare',
  '피자 디 마레 (해산물 피자)',
  'Pizza di Mare',
  595000,
  '595,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Australia Lamb Rack',
  '호주산 양갈비 숯불구이',
  'Australia Lamb Rack',
  1050000,
  '1,050,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Australian Tenderloin 250g',
  '호주산 안심 스테이크 (250g)',
  'Australian Tenderloin 250g',
  1200000,
  '1,200,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Japanese Rib Eye Wagyu MB 6-7 (300g)',
  '일본산 와규 꽃등심 립아이 MB 6-7 (300g)',
  'Japanese Rib Eye Wagyu MB 6-7 (300g)',
  1900000,
  '1,900,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Australian Fiorentina 1KG (T-Bone)',
  '호주산 피오렌티나 티본 스테이크 (1kg)',
  'Australian Fiorentina 1KG (T-Bone)',
  2300000,
  '2,300,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Octopus Tentacles',
  '문어 다리 팬 시어링 구이',
  'Octopus Tentacles',
  450000,
  '450,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan-Fried Red Snapper',
  '도미(레드 스내퍼) 필레 구이',
  'Pan-Fried Red Snapper',
  450000,
  '450,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Anticucho Pan-Fried Seabass',
  '안티쿠초 농어 필레 구이',
  'Anticucho Pan-Fried Seabass',
  585000,
  '585,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'King Prawns',
  '킹프라운 왕새우 구이',
  'King Prawns',
  745000,
  '745,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mashed Potato with Goat Cheese',
  '염소치즈 매시드 포테이토',
  'Mashed Potato with Goat Cheese',
  145000,
  '145,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Parma Ham & Asparagus',
  '파르마 햄 & 아스파라거스',
  'Parma Ham & Asparagus',
  155000,
  '155,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan-Roasted Rustic Vegetables with Balsamic',
  '구운 모둠 채소와 발사믹 리덕션',
  'Pan-Roasted Rustic Vegetables with Balsamic',
  130000,
  '130,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Broccolini with Garlic',
  '마늘 브로콜리니 구이',
  'Grilled Broccolini with Garlic',
  130000,
  '130,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phu Quoc Black Peppercorn Jus',
  '푸꾸옥 통후추 주 소스',
  'Phu Quoc Black Peppercorn Jus',
  70000,
  '70,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Natural Jus',
  '내추럴 비프 주 소스',
  'Natural Jus',
  60000,
  '60,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chimichurri Sauce',
  '치미추리 소스',
  'Chimichurri Sauce',
  45000,
  '45,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Truffles Cream Sauce',
  '트러플 크림 소스',
  'Truffles Cream Sauce',
  85000,
  '85,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  36
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiramisu',
  '클래식 티라미수',
  'Tiramisu',
  225000,
  '225,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  37
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Soft Pavlova',
  '소프트 파블로바',
  'Soft Pavlova',
  155000,
  '155,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  38
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Burnt Basque Cheesecake',
  '바스크 치즈케이크',
  'Burnt Basque Cheesecake',
  195000,
  '195,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  39
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Affogato',
  '아포가토',
  'Affogato',
  130000,
  '130,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  40
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lavie Still / Sparkling Mineral Water (450ml)',
  '라비 미네랄 워터 / 탄산수 (450ml)',
  'Lavie Still / Sparkling Mineral Water (450ml)',
  95000,
  '95,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  41
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Soft Drinks (Coke, Coke Zero, Sprite)',
  '탄산음료 (코카콜라 / 제로콜라 / 스프라이트)',
  'Soft Drinks (Coke, Coke Zero, Sprite)',
  90000,
  '90,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  42
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Modena Smoothie',
  '모데나 스무디',
  'Modena Smoothie',
  150000,
  '150,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  43
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vicenza Smoothie',
  '비첸차 스무디',
  'Vicenza Smoothie',
  150000,
  '150,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  44
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ananas Mocktail',
  '아나나스 목테일 (무알콜)',
  'Ananas Mocktail',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  45
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Frizzante Mocktail',
  '프리잔테 목테일 (무알콜)',
  'Frizzante Mocktail',
  180000,
  '180,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  46
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Signature Coffee (Black / Condensed Milk)',
  '베트남 전통 커피 (블랙 / 연유 카페쓰어다)',
  'Vietnamese Signature Coffee (Black / Condensed Milk)',
  90000,
  '90,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  47
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Espresso Bar (Espresso / Americano)',
  '에스프레소 / 아메리카노',
  'Espresso Bar (Espresso / Americano)',
  90000,
  '90,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  48
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cappuccino / Latte / Mocha',
  '카푸치노 / 카페라떼 / 카페모카',
  'Cappuccino / Latte / Mocha',
  110000,
  '110,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  49
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot / Iced Chocolate',
  '핫 / 아이스 초콜릿',
  'Hot / Iced Chocolate',
  120000,
  '120,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  50
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Classic Cocktails',
  '클래식 칵테일 셀렉션',
  'Classic Cocktails',
  300000,
  '300,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  51
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Como Signature Cocktail',
  '코모 시그니처 칵테일',
  'Como Signature Cocktail',
  320000,
  '320,000 VND',
  'A',
  'La Festa Phu Quoc - Curio Collection by Hilton 공식 레스토랑 Mare 메뉴판 PDF (menus/raw/lafesta/mare.pdf)',
  '2026-10-01'::date,
  52
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFUbrywqVpzERZ-766zaQ1NE'
LIMIT 1;

-- Venue: 포틴 푸꾸옥 (Phở Thìn Phú Quốc - 하노이 3대 쌀국수 & 핫팟) (Grade B, place_id: ChIJFYITJBKVpzERPIOdOa8Hzyg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phở tái lăn đặc biệt',
  '직화 파기름 볶음 소고기 쌀국수 (포 따이란)',
  'Phở tái lăn đặc biệt',
  75000,
  '75,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phở sườn cây',
  '왕갈비 쌀국수 (포 스언 까이)',
  'Phở sườn cây',
  85000,
  '85,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phở chín / tái nạm',
  '소고기 양지 차돌 쌀국수',
  'Phở chín / tái nạm',
  65000,
  '65,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lẩu bò chua cay (Combo 2 người)',
  '매콤 새콤 소고기 핫팟 전골 (2인 세트)',
  'Lẩu bò chua cay (Combo 2 người)',
  499000,
  '499,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lẩu đuôi bò / Lòng bò đặc biệt',
  '소꼬리 / 곱창 핫팟 전골',
  'Lẩu đuôi bò / Lòng bò đặc biệt',
  499000,
  '499,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nem rán Hà Nội (Chả giò)',
  '하노이식 수제 바삭 넴 (튀김 스프링롤)',
  'Nem rán Hà Nội (Chả giò)',
  60000,
  '60,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Quẩy nóng',
  '바삭한 베트남식 튀김 빵 (꿔이)',
  'Quẩy nóng',
  15000,
  '15,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trứng chần',
  '온천 수란 (달걀 추가)',
  'Trứng chần',
  10000,
  '10,000 VND',
  'B',
  'Phở Thìn Hà Nội 공식 브랜드 웹사이트 및 푸꾸옥 선셋타운 지점(Ven 40) 안내; 선셋타운 포틴 공식 채널: 직화 볶음 소고기 쌀국수 및 저녁 소고기 핫팟 세트(499,000동) 프로모션; 선셋타운 지점 단품 쌀국수 실측 가격대 (65,000~85,000동)',
  '2026-08-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYITJBKVpzERPIOdOa8Hzyg'
LIMIT 1;

-- Venue: Amritsar Grill Indian Restaurant (Grade D, place_id: ChIJFYbEOYuVpzERNhVUrah1-3Y)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFYbEOYuVpzERNhVUrah1-3Y'
LIMIT 1;

-- Venue: La isla Bistro & coffee (Grade C, place_id: ChIJFePbK8yXpzER_rJM4eYtKaA)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJFePbK8yXpzER_rJM4eYtKaA',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFePbK8yXpzER_rJM4eYtKaA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJFePbK8yXpzER_rJM4eYtKaA',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFePbK8yXpzER_rJM4eYtKaA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJFePbK8yXpzER_rJM4eYtKaA',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJFePbK8yXpzER_rJM4eYtKaA'
LIMIT 1;

-- Venue: Phố Nướng / seafood & meat grill (Grade C, place_id: ChIJHWzLNQCXpzER8C174EPH8Fs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Hải sản nướng than hoa',
  '참숯 모둠 해산물 구이',
  'Hải sản nướng than hoa',
  120000,
  '120,000 ~ 250,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJHWzLNQCXpzER8C174EPH8Fs',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJHWzLNQCXpzER8C174EPH8Fs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Thịt xiên nướng sốt cay',
  '매콤 소스 돼지고기 꼬치구이',
  'Thịt xiên nướng sốt cay',
  40000,
  '40,000 ~ 70,000 VND / 꼬치',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJHWzLNQCXpzER8C174EPH8Fs',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJHWzLNQCXpzER8C174EPH8Fs'
LIMIT 1;

-- Venue: Lotus Home & Cafe (Grade C, place_id: ChIJHfkAZ4WVpzERmME-KkMKRrI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJHfkAZ4WVpzERmME-KkMKRrI',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJHfkAZ4WVpzERmME-KkMKRrI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJHfkAZ4WVpzERmME-KkMKRrI',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJHfkAZ4WVpzERmME-KkMKRrI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJHfkAZ4WVpzERmME-KkMKRrI',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJHfkAZ4WVpzERmME-KkMKRrI'
LIMIT 1;

-- Venue: 껌 메 (Cơm Mẹ - 엄마의 밥상 베트남 가정식) (Grade D, place_id: ChIJIb8W0jqVpzERKa5wk0xTu3k)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJIb8W0jqVpzERKa5wk0xTu3k'
LIMIT 1;

-- Venue: One Boat Restaurant & Bar (Grade C, place_id: ChIJLwGTViCVpzER8VvsPx7gfqs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Hải sản nướng muối ớt One Boat',
  '원보트 특제 칠리소금 해산물 숯불구이',
  'Hải sản nướng muối ớt One Boat',
  150000,
  '150,000 ~ 300,000 VND',
  'C',
  'https://www.facebook.com/oneboatphuquoc/',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJLwGTViCVpzER8VvsPx7gfqs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Combo Hải sản Cướp biển (Pirate Seafood Combo)',
  '파이러츠 모둠 해산물 바비큐 콤보 (2~4인)',
  'Combo Hải sản Cướp biển (Pirate Seafood Combo)',
  450000,
  '450,000 ~ 750,000 VND',
  'C',
  'https://www.facebook.com/oneboatphuquoc/',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJLwGTViCVpzER8VvsPx7gfqs'
LIMIT 1;

-- Venue: Đảo Vị VuiFest Bazaar (Grade C, place_id: ChIJM0_7pzqVpzERSaJMCKvjEZU)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Xiên nướng hải sản chợ đêm',
  '부이페스트 야시장 해산물 꼬치구이',
  'Xiên nướng hải sản chợ đêm',
  30000,
  '30,000 ~ 60,000 VND / 꼬치',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJM0_7pzqVpzERSaJMCKvjEZU',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJM0_7pzqVpzERSaJMCKvjEZU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mực nướng muối ớt',
  '칠리소금 오징어 숯불구이',
  'Mực nướng muối ớt',
  80000,
  '80,000 ~ 150,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJM0_7pzqVpzERSaJMCKvjEZU',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJM0_7pzqVpzERSaJMCKvjEZU'
LIMIT 1;

-- Venue: SANTO CAFE (Grade C, place_id: ChIJM56vPyOVpzERkcoihdCbcQg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJM56vPyOVpzERkcoihdCbcQg',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJM56vPyOVpzERkcoihdCbcQg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJM56vPyOVpzERkcoihdCbcQg',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJM56vPyOVpzERkcoihdCbcQg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJM56vPyOVpzERkcoihdCbcQg',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJM56vPyOVpzERkcoihdCbcQg'
LIMIT 1;

-- Venue: 루나 포크 (Luna Folk - La Festa Hilton 재즈 & 칵테일 바) (Grade B, place_id: ChIJMXSxNgCXpzERgxlz0F6Zn7I)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'The Amalfi Old Fashioned',
  '아말피 올드 패션드',
  'The Amalfi Old Fashioned',
  280000,
  '280,000 VND',
  'B',
  '라 페스타 힐튼 루나 포크 바 공식 메뉴',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMXSxNgCXpzERgxlz0F6Zn7I'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Negroni Classico',
  '네그로니 클라시코',
  'Negroni Classico',
  260000,
  '260,000 VND',
  'B',
  '라 페스타 힐튼 루나 포크 바 공식 메뉴',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMXSxNgCXpzERgxlz0F6Zn7I'
LIMIT 1;

-- Venue: 한식당 화로구이 (Charcoal Korean BBQ) (Grade C, place_id: ChIJMfJ3VWSVpzER2App4vNzuqo)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Charcoal Grilled Samgyeopsal (숯불 삼겹살)',
  '참숯 화로 생삼겹살 구이',
  'Charcoal Grilled Samgyeopsal (숯불 삼겹살)',
  180000,
  '180,000 ~ 250,000 VND / 1인분',
  'C',
  '선셋타운 화로구이(Charcoal Korean BBQ) 구글맵 등록 정보; 선셋타운 내 숯불 화로구이 한식당 다이닝 안내',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMfJ3VWSVpzER2App4vNzuqo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Charcoal Beef Ribs (소갈비살 구이)',
  '참숯 소갈비살 및 양념 소고기 구이',
  'Charcoal Beef Ribs (소갈비살 구이)',
  280000,
  '280,000 ~ 380,000 VND / 1인분',
  'C',
  '선셋타운 화로구이(Charcoal Korean BBQ) 구글맵 등록 정보; 선셋타운 내 숯불 화로구이 한식당 다이닝 안내',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMfJ3VWSVpzER2App4vNzuqo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Kimchi Stew & Steamed Rice (김치찌개와 공깃밥)',
  '얼큰한 한국식 돼지고기 김치찌개 백반',
  'Kimchi Stew & Steamed Rice (김치찌개와 공깃밥)',
  150000,
  '150,000 ~ 200,000 VND',
  'C',
  '선셋타운 화로구이(Charcoal Korean BBQ) 구글맵 등록 정보; 선셋타운 내 숯불 화로구이 한식당 다이닝 안내',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMfJ3VWSVpzER2App4vNzuqo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cold Naengmyeon (물냉면 / 비빔냉면)',
  '시원한 살얼음 물냉면 / 매콤 비빔냉면',
  'Cold Naengmyeon (물냉면 / 비빔냉면)',
  140000,
  '140,000 ~ 180,000 VND',
  'C',
  '선셋타운 화로구이(Charcoal Korean BBQ) 구글맵 등록 정보; 선셋타운 내 숯불 화로구이 한식당 다이닝 안내',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMfJ3VWSVpzER2App4vNzuqo'
LIMIT 1;

-- Venue: Restaurant- Coffee Halal Sunset Town Phu Quoc (Grade C, place_id: ChIJMyo1GFCXpzERJi4JKDavOgQ)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Halal Beef / Chicken Curry with Roti',
  '할랄 소고기 / 치킨 커리와 로티 차파티',
  'Halal Beef / Chicken Curry with Roti',
  90000,
  '90,000 ~ 150,000 VND',
  'C',
  'http://www.champatravel.com/',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMyo1GFCXpzERJi4JKDavOgQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Halal Vietnamese Beef Pho',
  '할랄 인증 소고기 쌀국수',
  'Halal Vietnamese Beef Pho',
  75000,
  '75,000 ~ 95,000 VND',
  'C',
  'http://www.champatravel.com/',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMyo1GFCXpzERJi4JKDavOgQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Nasi Goreng Halal',
  '할랄 나시고랭 해산물 볶음밥',
  'Nasi Goreng Halal',
  80000,
  '80,000 ~ 120,000 VND',
  'C',
  'http://www.champatravel.com/',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJMyo1GFCXpzERJi4JKDavOgQ'
LIMIT 1;

-- Venue: Tribal Grill - Ribs, Burger & Beer (Grade C, place_id: ChIJN7xYjTaVpzERxXuOhOW_Bkg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Tribal Smoked BBQ Ribs',
  '트라이벌 스모크 바비큐 폭립',
  'Tribal Smoked BBQ Ribs',
  280000,
  '280,000 ~ 480,000 VND',
  'C',
  'https://visitphuquoc.com.vn/tribal-grill',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN7xYjTaVpzERxXuOhOW_Bkg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Gourmet Beef Burger with Fries',
  '수제 비프 버거와 감자튀김',
  'Gourmet Beef Burger with Fries',
  180000,
  '180,000 ~ 250,000 VND',
  'C',
  'https://visitphuquoc.com.vn/tribal-grill',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN7xYjTaVpzERxXuOhOW_Bkg'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Craft Beer on Tap',
  '수제 생맥주 (파인트)',
  'Craft Beer on Tap',
  70000,
  '70,000 ~ 110,000 VND',
  'C',
  'https://visitphuquoc.com.vn/tribal-grill',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN7xYjTaVpzERxXuOhOW_Bkg'
LIMIT 1;

-- Venue: 세타 (Seta - La Festa Hilton 광동식 파인다이닝) (Grade A, place_id: ChIJN_Q6ZQCXpzERnEgRa_rea4k)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chef Victor''s Curated Selection',
  '빅터 셰프 추천 세트 (1인)',
  'Chef Victor''s Curated Selection',
  658000,
  '++ (세금·서비스료 별도), 1인 가격',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Imperial Dimsum Basket (5 pieces)',
  '황실 딤섬 바구니 (5개)',
  'Imperial Dimsum Basket (5 pieces)',
  248000,
  '248,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Spinach Dumpling (3 pieces)',
  '새우·돼지고기 시금치 만두 (3개)',
  'Steamed Spinach Dumpling (3 pieces)',
  105000,
  '105,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Shrimp Dumpling - Ha Gao (3 pieces)',
  '새우 하가우 (3개)',
  'Steamed Shrimp Dumpling - Ha Gao (3 pieces)',
  145000,
  '145,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Pork & Shrimp with Mushroom - Siew Mai (3 pieces)',
  '샤오마이 (돼지고기·새우·버섯, 3개)',
  'Steamed Pork & Shrimp with Mushroom - Siew Mai (3 pieces)',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Barbecue Pork Buns (2 pieces)',
  '차슈바오 (꿀 바비큐 돼지고기 찐빵, 2개)',
  'Steamed Barbecue Pork Buns (2 pieces)',
  105000,
  '105,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Village-Style Chicken Feet',
  '시골식 닭발찜',
  'Village-Style Chicken Feet',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Pork Ribs with Black Bean Sauce',
  '흑두소스 돼지갈비찜',
  'Steamed Pork Ribs with Black Bean Sauce',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Charcoal Custard Bun (3 pieces)',
  '숯 커스터드 번 (류사바오, 3개)',
  'Charcoal Custard Bun (3 pieces)',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chili Oil Dumplings (3 pieces)',
  '쓰촨식 홍유 만두 (3개)',
  'Chili Oil Dumplings (3 pieces)',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Baked Pineapple Buns with BBQ Pork (3 pieces)',
  '파인애플 차슈번 (3개)',
  'Baked Pineapple Buns with BBQ Pork (3 pieces)',
  155000,
  '155,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lotus Leaf Sticky Rice with Chicken',
  '연잎 닭고기 찹쌀밥 (로마이까이)',
  'Lotus Leaf Sticky Rice with Chicken',
  128000,
  '128,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Prawn Toast with XO Sauce',
  'XO소스 새우 토스트',
  'Prawn Toast with XO Sauce',
  325000,
  '325,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sichuan Mala Braised Beef Shank',
  '쓰촨 마라 소고기 사태 조림',
  'Sichuan Mala Braised Beef Shank',
  168000,
  '168,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chilled French Beans with Sesame Sauce',
  '참깨소스 껍질콩 냉채',
  'Chilled French Beans with Sesame Sauce',
  125000,
  '125,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chilled Marinated Jelly Fish',
  '해파리 냉채',
  'Chilled Marinated Jelly Fish',
  125000,
  '125,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Century Egg with Ginger-Scallion Dressing',
  '생강·파 드레싱 피단',
  'Century Egg with Ginger-Scallion Dressing',
  68000,
  '68,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Braised Chicken Soup with Morel Mushrooms & Cabbage (per person)',
  '곰보버섯 배추 닭고기 수프 (1인)',
  'Braised Chicken Soup with Morel Mushrooms & Cabbage (per person)',
  325000,
  '325,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hokkaido Scallop Hot & Sour Soup (per person)',
  '홋카이도 관자 산라탕 (1인)',
  'Hokkaido Scallop Hot & Sour Soup (per person)',
  345000,
  '345,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Wok-Fried Typhoon Shelter-Style Tiger Prawn (3 pieces)',
  '타이푼 셸터식 타이거새우 볶음 (3마리, 마늘 크럼블)',
  'Wok-Fried Typhoon Shelter-Style Tiger Prawn (3 pieces)',
  695000,
  '695,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Tofu with Japanese Scallops in Black Bean Sauce (3 pieces)',
  '흑두소스 일본 관자 두부찜 (3개)',
  'Steamed Tofu with Japanese Scallops in Black Bean Sauce (3 pieces)',
  695000,
  '695,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stir-Fried Beef with 3 Types of Onion',
  '소고기 3가지 파 볶음',
  'Stir-Fried Beef with 3 Types of Onion',
  535000,
  '535,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Typhoon Shelter-Style New Zealand Lamb Chops (3 pieces)',
  '타이푼 셸터식 뉴질랜드 양갈비 (3대)',
  'Typhoon Shelter-Style New Zealand Lamb Chops (3 pieces)',
  695000,
  '695,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sweet & Sour Sauce Crispy Pork Fillet with Pineapple & Bell Pepper',
  '파인애플·피망 탕수육',
  'Sweet & Sour Sauce Crispy Pork Fillet with Pineapple & Bell Pepper',
  425000,
  '425,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Marinated Chicken with Salt, Spices and Minced Spring Onion (quarter)',
  '광동식 소금 닭과 다진 파 (1/4마리)',
  'Marinated Chicken with Salt, Spices and Minced Spring Onion (quarter)',
  328000,
  '328,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Marinated Chicken with Salt, Spices and Minced Spring Onion (half)',
  '광동식 소금 닭과 다진 파 (반 마리)',
  'Marinated Chicken with Salt, Spices and Minced Spring Onion (half)',
  498000,
  '498,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Roasted Pork Belly',
  '바삭한 통삼겹 구이 (시우육)',
  'Crispy Roasted Pork Belly',
  388000,
  '388,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Honey-Glazed Char Siu Pork Belly',
  '꿀 차슈 삼겹살',
  'Honey-Glazed Char Siu Pork Belly',
  388000,
  '388,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cantonese-Style Sesame Grilled Chicken (quarter)',
  '광동식 참깨 닭구이 (1/4마리)',
  'Cantonese-Style Sesame Grilled Chicken (quarter)',
  328000,
  '328,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cantonese-Style Sesame Grilled Chicken (half)',
  '광동식 참깨 닭구이 (반 마리)',
  'Cantonese-Style Sesame Grilled Chicken (half)',
  498000,
  '498,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caramelized Smoked Duck Breast',
  '캐러멜 훈제 오리가슴살',
  'Caramelized Smoked Duck Breast',
  498000,
  '498,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Local Seasonal Green (poached / stir-fried with oil / with minced garlic / with "Lao Gan Ma")',
  '제철 채소 (데침 / 기름 볶음 / 마늘 볶음 / 라오간마 고추기름 볶음 중 선택)',
  'Local Seasonal Green (poached / stir-fried with oil / with minced garlic / with "Lao Gan Ma")',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Additional with Crab Meat',
  '게살 추가',
  'Additional with Crab Meat',
  328000,
  '328,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Additional with Dried Scallop',
  '말린 관자 추가',
  'Additional with Dried Scallop',
  328000,
  '328,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hong Kong-Style Fried Flat Rice Noodles with Beef',
  '홍콩식 소고기 볶음 쌀국수 (깐차우 응아우호)',
  'Hong Kong-Style Fried Flat Rice Noodles with Beef',
  425000,
  '425,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Wok-Fried Rice with Crab Meat, Ginger & Egg White',
  '게살·생강·달걀흰자 볶음밥',
  'Wok-Fried Rice with Crab Meat, Ginger & Egg White',
  425000,
  '425,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  36
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lotus Leaf Fried Rice with Diced Roasted Duck, Chicken, Crab Meat & Dried Scallop (per person)',
  '연잎 볶음밥 (오리·닭·게살·말린 관자, 1인)',
  'Lotus Leaf Fried Rice with Diced Roasted Duck, Chicken, Crab Meat & Dried Scallop (per person)',
  425000,
  '425,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  37
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'White Rice',
  '흰쌀밥',
  'White Rice',
  50000,
  '50,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  38
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vegetarian Crystal Dumpling (3 pieces)',
  '채식 크리스털 만두 (3개)',
  'Vegetarian Crystal Dumpling (3 pieces)',
  88000,
  '88,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  39
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spinach Dumpling (3 pieces)',
  '시금치 만두 (3개)',
  'Spinach Dumpling (3 pieces)',
  88000,
  '88,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  40
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Fried Vegetarian Spring Roll (3 pieces)',
  '채식 춘권 튀김 (3개)',
  'Fried Vegetarian Spring Roll (3 pieces)',
  88000,
  '88,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  41
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chinese Bun - Steamed or Deep Fried (3 pieces)',
  '만터우 (찐빵 또는 튀김, 3개)',
  'Chinese Bun - Steamed or Deep Fried (3 pieces)',
  88000,
  '88,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  42
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sweet and Sour Radish Roll (3 pieces)',
  '새콤달콤 무말이 (3개)',
  'Sweet and Sour Radish Roll (3 pieces)',
  88000,
  '88,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  43
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stir-fried Green Beans in Sesame Dressing',
  '참깨 드레싱 껍질콩',
  'Stir-fried Green Beans in Sesame Dressing',
  125000,
  '125,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  44
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Deep Fried Salt and Pepper Beancurd',
  '두부 소금후추 튀김',
  'Deep Fried Salt and Pepper Beancurd',
  125000,
  '125,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  45
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vegetarian Hot and Sour Soup',
  '채식 산라탕',
  'Vegetarian Hot and Sour Soup',
  238000,
  '238,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  46
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pumpkin Soup with Black Truffle',
  '블랙 트러플 단호박 수프',
  'Pumpkin Soup with Black Truffle',
  238000,
  '238,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  47
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stir Fried Eggplant with Typhoon Shelter Style',
  '타이푼 셸터식 가지 볶음',
  'Stir Fried Eggplant with Typhoon Shelter Style',
  108000,
  '108,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  48
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Steamed Eggplant with Garlic Dressing',
  '마늘 드레싱 가지찜',
  'Steamed Eggplant with Garlic Dressing',
  108000,
  '108,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  49
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stir Fried Mixed Vegetable with Bell Pepper and Black Pepper',
  '피망 흑후추 모둠 채소 볶음',
  'Stir Fried Mixed Vegetable with Bell Pepper and Black Pepper',
  118000,
  '118,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  50
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Braised Baby Chinese Cabbage with Enoki Mushrooms in Pumpkin Sauce',
  '단호박 소스 알배추 팽이버섯 조림',
  'Braised Baby Chinese Cabbage with Enoki Mushrooms in Pumpkin Sauce',
  118000,
  '118,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  51
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Braised Tofu with Morel Mushrooms',
  '곰보버섯 두부조림',
  'Braised Tofu with Morel Mushrooms',
  318000,
  '318,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  52
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sweet and Sour Gourd Ball',
  '채식 탕수 박 완자',
  'Sweet and Sour Gourd Ball',
  268000,
  '268,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  53
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stir Fried Potato Ball with Kung Pao Sauce',
  '궁보 소스 감자 완자 볶음',
  'Stir Fried Potato Ball with Kung Pao Sauce',
  268000,
  '268,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  54
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Wok Fried Rice with Avocado and Cashew Nut',
  '아보카도 캐슈넛 볶음밥',
  'Wok Fried Rice with Avocado and Cashew Nut',
  288000,
  '288,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  55
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Braised Ee Fu Noodles with Mushrooms, Onion and Black Pepper',
  '버섯·양파·흑후추 이푸면 조림',
  'Braised Ee Fu Noodles with Mushrooms, Onion and Black Pepper',
  288000,
  '288,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  56
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Glutinous Rice Balls in Wolfberry Ginger Tea',
  '구기자 생강차 찹쌀경단',
  'Glutinous Rice Balls in Wolfberry Ginger Tea',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  57
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lemongrass Jelly with Lime Sorbet',
  '레몬그라스 젤리와 라임 소르베',
  'Lemongrass Jelly with Lime Sorbet',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  58
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mango Puree with Pomelo & Sago',
  '망고 포멜로 사고 (양지감로)',
  'Mango Puree with Pomelo & Sago',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  59
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Baked Egg Tart',
  '에그타르트',
  'Baked Egg Tart',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  60
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Longevity Peach Buns (3 pieces)',
  '장수 복숭아 찐빵 (3개)',
  'Longevity Peach Buns (3 pieces)',
  95000,
  '95,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  61
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sesame Balls with Red Bean (3 pieces)',
  '팥소 참깨볼 (3개)',
  'Sesame Balls with Red Bean (3 pieces)',
  78000,
  '78,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  62
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Senado Silk',
  '세나도 실크',
  'Senado Silk',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  63
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lan Kwai Fong Breeze',
  '란콰이퐁 브리즈',
  'Lan Kwai Fong Breeze',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  64
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Donghu Drift',
  '동후 드리프트',
  'Donghu Drift',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  65
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Classic Cocktail (ask our mixologist)',
  '클래식 칵테일 (바텐더에게 원하는 칵테일 요청)',
  'Classic Cocktail (ask our mixologist)',
  350000,
  '350,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  66
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cat Street Spice',
  '캣 스트리트 스파이스',
  'Cat Street Spice',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  67
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Canton Road Citrus',
  '캔턴 로드 시트러스',
  'Canton Road Citrus',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  68
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Shamian Spice',
  '샤미엔 스파이스',
  'Shamian Spice',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  69
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun Kraft Kiss Bridge Helles Lager | Sunset Town Dry Hop Pale Ale - can',
  '선 크래프트 키스브릿지 헬레스 라거 / 선셋타운 드라이홉 페일에일 (캔)',
  'Sun Kraft Kiss Bridge Helles Lager | Sunset Town Dry Hop Pale Ale - can',
  110000,
  '110,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  70
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun Kraft (as above) - glass 330ml',
  '선 크래프트 (위 2종) 생맥주 330ml',
  'Sun Kraft (as above) - glass 330ml',
  61000,
  '61,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  71
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun Kraft (as above) - glass 500ml',
  '선 크래프트 (위 2종) 생맥주 500ml',
  'Sun Kraft (as above) - glass 500ml',
  87000,
  '87,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  72
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tsing Tao - can',
  '칭다오 (캔)',
  'Tsing Tao - can',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  73
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tsing Tao - bottle',
  '칭다오 (병)',
  'Tsing Tao - bottle',
  280000,
  '280,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  74
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiger / Saigon Special / Heineken / Heineken Zero',
  '타이거·사이공 스페셜·하이네켄·하이네켄 제로',
  'Tiger / Saigon Special / Heineken / Heineken Zero',
  110000,
  '110,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  75
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coke / Coke Zero / Sprite / Ginger Ale / Tonic / Soda Schweppes',
  '콜라·제로콜라·스프라이트·진저에일·토닉·소다',
  'Coke / Coke Zero / Sprite / Ginger Ale / Tonic / Soda Schweppes',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  76
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Aqua Panna Still 750ml',
  '아쿠아 파나 생수 750ml',
  'Aqua Panna Still 750ml',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  77
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'San Pellegrino Sparkling 750ml',
  '산펠레그리노 탄산수 750ml',
  'San Pellegrino Sparkling 750ml',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  78
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sai Kung Sunset',
  '사이쿵 선셋',
  'Sai Kung Sunset',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  79
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Fuxing Blend',
  '푸싱 블렌드',
  'Fuxing Blend',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  80
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Huaihai Glow',
  '화이하이 글로',
  'Huaihai Glow',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  81
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Wukang Whisper',
  '우캉 위스퍼',
  'Wukang Whisper',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  82
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tai Ping Green',
  '타이핑 그린',
  'Tai Ping Green',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  83
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Yellow Buds Tea',
  '황아차 (옐로 버드)',
  'Yellow Buds Tea',
  1200000,
  '단위(잔/포트) 표기 없음',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  84
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rising Stars Tea',
  '라이징 스타 차',
  'Rising Stars Tea',
  680000,
  '단위 표기 없음',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  85
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Imperial Pu-Erh',
  '황실 보이차',
  'Imperial Pu-Erh',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  86
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tie Guan Yin',
  '철관음',
  'Tie Guan Yin',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  87
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pai Mu Tan',
  '백모단',
  'Pai Mu Tan',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  88
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chamomile',
  '캐모마일',
  'Chamomile',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  89
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Salted Iced Coffee',
  '아이스 소금커피',
  'Salted Iced Coffee',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  90
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Black Coffee',
  '베트남 블랙커피',
  'Vietnamese Black Coffee',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  91
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Milk Coffee',
  '베트남 연유커피',
  'Vietnamese Milk Coffee',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  92
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot Chocolate',
  '핫초콜릿',
  'Hot Chocolate',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  93
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cappuccino',
  '카푸치노',
  'Cappuccino',
  110000,
  '110,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  94
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Latte',
  '라테',
  'Latte',
  110000,
  '110,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  95
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Espresso',
  '에스프레소',
  'Espresso',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  96
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Americano',
  '아메리카노',
  'Americano',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  97
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Maotai Cun 53% 50cl',
  '마오타이 춘 53% 500ml',
  'Maotai Cun 53% 50cl',
  12500000,
  '12,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  98
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Maotai Prince 53% 50cl',
  '마오타이 프린스 53% 500ml',
  'Maotai Prince 53% 50cl',
  7500000,
  '7,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  99
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Maotai Yingbin 53% 50cl',
  '마오타이 잉빈 53% 500ml',
  'Maotai Yingbin 53% 50cl',
  6350000,
  '6,350,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  100
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Maison Castel, Merlot, IGP d''Oc',
  '메종 카스텔 메를로 (레드)',
  'Maison Castel, Merlot, IGP d''Oc',
  280000,
  '280,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  101
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Banfi, Placido Chianti DOCG',
  '반피 플라치도 키안티 (레드)',
  'Banfi, Placido Chianti DOCG',
  315000,
  '315,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  102
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Château Haut-Meyreau, Nu Comme Un Verre, AOP Bordeaux 2023',
  '샤토 오 메이로 뉘 콤 엉 베르 보르도 2023 (화이트)',
  'Château Haut-Meyreau, Nu Comme Un Verre, AOP Bordeaux 2023',
  280000,
  '280,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  103
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kono Marlborough Sauvignon Blanc',
  '코노 말버러 소비뇽 블랑 (화이트)',
  'Kono Marlborough Sauvignon Blanc',
  215000,
  '215,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  104
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Moulin de Gassac, Figaro Rosé, IGP Pays d''Hérault',
  '물랭 드 가삭 피가로 로제',
  'Moulin de Gassac, Figaro Rosé, IGP Pays d''Hérault',
  275000,
  '275,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  105
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bottega il Vino Dei Poeti Brut Bianco, Prosecco DOC',
  '보테가 일 비노 데이 포에티 프로세코 (스파클링)',
  'Bottega il Vino Dei Poeti Brut Bianco, Prosecco DOC',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  106
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Silver Heights Ningxia Pinot Noir (Chinese red wine)',
  '실버 하이츠 닝샤 피노누아 (중국 레드)',
  'Silver Heights Ningxia Pinot Noir (Chinese red wine)',
  5500000,
  '5,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  107
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Guigal, Crozes-Hermitage',
  '기갈 크로즈 에르미타주 (레드)',
  'Guigal, Crozes-Hermitage',
  4000000,
  '4,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  108
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Edouard Delaunay, Septembre, Pinot Noir',
  '에두아르 들로네 셉탕브르 피노누아 (레드)',
  'Edouard Delaunay, Septembre, Pinot Noir',
  3600000,
  '3,600,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  109
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'd''Arenberg, The Custodian, Grenache, McLaren Vale',
  '다렌버그 더 커스터디언 그르나슈 (레드)',
  'd''Arenberg, The Custodian, Grenache, McLaren Vale',
  2800000,
  '2,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  110
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Maison Castel, Merlot, IGP d''Oc',
  '메종 카스텔 메를로 (레드)',
  'Maison Castel, Merlot, IGP d''Oc',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  111
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Banfi, Placido Chianti DOCG',
  '반피 플라치도 키안티 (레드)',
  'Banfi, Placido Chianti DOCG',
  1350000,
  '1,350,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  112
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Silver Heights Family Reserve Chardonnay (Chinese white wine)',
  '실버 하이츠 패밀리 리저브 샤르도네 (중국 화이트)',
  'Silver Heights Family Reserve Chardonnay (Chinese white wine)',
  5000000,
  '5,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  113
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Henri Bourgeois, Les Baronnes, Sancerre Sauvignon Blanc',
  '앙리 부르주아 레 바론 상세르 (화이트)',
  'Henri Bourgeois, Les Baronnes, Sancerre Sauvignon Blanc',
  3800000,
  '3,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  114
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Von Winning Estate, Win Win, Dry Riesling',
  '폰 비닝 윈윈 드라이 리슬링 (화이트)',
  'Von Winning Estate, Win Win, Dry Riesling',
  3600000,
  '3,600,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  115
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Villa Maria, Private Bin Pinot Gris, Marlborough',
  '빌라 마리아 프라이빗 빈 피노 그리 (화이트)',
  'Villa Maria, Private Bin Pinot Gris, Marlborough',
  2800000,
  '2,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  116
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kono Marlborough Sauvignon Blanc',
  '코노 말버러 소비뇽 블랑 (화이트)',
  'Kono Marlborough Sauvignon Blanc',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  117
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Château Haut-Meyreau, Nu Comme Un Verre, AOP Bordeaux 2023',
  '샤토 오 메이로 보르도 2023 (화이트)',
  'Château Haut-Meyreau, Nu Comme Un Verre, AOP Bordeaux 2023',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  118
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Moulin de Gassac, Figaro Rosé, IGP Pays d''Hérault',
  '물랭 드 가삭 피가로 로제',
  'Moulin de Gassac, Figaro Rosé, IGP Pays d''Hérault',
  1100000,
  '1,100,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  119
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Champagne Taittinger, Brut Réserve',
  '떼땅져 브뤼 레제르브 (샴페인)',
  'Champagne Taittinger, Brut Réserve',
  4850000,
  '4,850,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  120
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bottega il Vino Dei Poeti Brut Bianco, Prosecco DOC',
  '보테가 프로세코 (스파클링)',
  'Bottega il Vino Dei Poeti Brut Bianco, Prosecco DOC',
  2800000,
  '2,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  121
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Macallan 18 yrs Double Cask - bottle',
  '맥캘란 18년 더블캐스크 (보틀)',
  'Macallan 18 yrs Double Cask - bottle',
  35000000,
  '35,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  122
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Macallan 12 yrs Double Cask - bottle',
  '맥캘란 12년 더블캐스크 (보틀)',
  'Macallan 12 yrs Double Cask - bottle',
  12000000,
  '12,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  123
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Royal Salute 21 yrs - bottle',
  '로얄 살루트 21년 (보틀)',
  'Royal Salute 21 yrs - bottle',
  12000000,
  '12,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  124
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Glenlivet 18 yrs - bottle',
  '글렌리벳 18년 (보틀)',
  'Glenlivet 18 yrs - bottle',
  10500000,
  '10,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  125
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Glenlivet 12 yrs - bottle',
  '글렌리벳 12년 (보틀)',
  'Glenlivet 12 yrs - bottle',
  4500000,
  '4,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  126
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dewar''s 12 yrs - glass',
  '듀어스 12년 (글라스)',
  'Dewar''s 12 yrs - glass',
  350000,
  '350,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  127
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dewar''s 12 yrs - bottle',
  '듀어스 12년 (보틀)',
  'Dewar''s 12 yrs - bottle',
  3000000,
  '3,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  128
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Jim Beam White - glass',
  '짐빔 화이트 (글라스)',
  'Jim Beam White - glass',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  129
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Jim Beam White - bottle',
  '짐빔 화이트 (보틀)',
  'Jim Beam White - bottle',
  1200000,
  '1,200,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  130
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hennessy XO - bottle',
  '헤네시 XO (보틀)',
  'Hennessy XO - bottle',
  17500000,
  '17,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  131
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hennessy VSOP - bottle',
  '헤네시 VSOP (보틀)',
  'Hennessy VSOP - bottle',
  6500000,
  '6,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  132
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patrón Reposado - bottle',
  '파트론 레포사도 (보틀)',
  'Patrón Reposado - bottle',
  6500000,
  '6,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  133
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patrón Silver - glass',
  '파트론 실버 (글라스)',
  'Patrón Silver - glass',
  365000,
  '365,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  134
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patrón Silver - bottle',
  '파트론 실버 (보틀)',
  'Patrón Silver - bottle',
  5900000,
  '5,900,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  135
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grey Goose - glass',
  '그레이 구스 (글라스)',
  'Grey Goose - glass',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  136
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grey Goose - bottle',
  '그레이 구스 (보틀)',
  'Grey Goose - bottle',
  4000000,
  '4,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  137
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nordés - glass',
  '노르데스 진 (글라스)',
  'Nordés - glass',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  138
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nordés - bottle',
  '노르데스 진 (보틀)',
  'Nordés - bottle',
  2800000,
  '2,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  139
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hendrick''s - bottle',
  '헨드릭스 진 (보틀)',
  'Hendrick''s - bottle',
  2350000,
  '2,350,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  140
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bombay Sapphire - glass',
  '봄베이 사파이어 (글라스)',
  'Bombay Sapphire - glass',
  200000,
  '200,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  141
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bombay Sapphire - bottle',
  '봄베이 사파이어 (보틀)',
  'Bombay Sapphire - bottle',
  1100000,
  '1,100,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  142
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Myers''s Original Dark Rum - glass',
  '마이어스 다크 럼 (글라스)',
  'Myers''s Original Dark Rum - glass',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  143
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Myers''s Original Dark Rum - bottle',
  '마이어스 다크 럼 (보틀)',
  'Myers''s Original Dark Rum - bottle',
  2500000,
  '2,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  144
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Blanca - glass',
  '바카디 카르타 블랑카 (글라스)',
  'Bacardi Carta Blanca - glass',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  145
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Blanca - bottle',
  '바카디 카르타 블랑카 (보틀)',
  'Bacardi Carta Blanca - bottle',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1uUp-SGVDfmcqIAot9z-JU2yCOHx9WxOB/view; 다운로드만 하고 이번 정리에는 s1을 사용',
  '2026-10-22'::date,
  146
FROM public.businesses b
WHERE b.google_place_id = 'ChIJN_Q6ZQCXpzERnEgRa_rea4k'
LIMIT 1;

-- Venue: Green Tree Buffet SeaFood (Grade C, place_id: ChIJNcEJoqmXpzERV_7N3lFq9sM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Buffet Hải Sản Nướng & Lẩu Hoàng Hôn',
  '선셋타운 대형 해산물 구이 & 핫팟 뷔페 (석식)',
  'Buffet Hải Sản Nướng & Lẩu Hoàng Hôn',
  350000,
  '약 350,000 ~ 550,000 VND / 1인',
  'C',
  'http://greentreerestaurant.vn/',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJNcEJoqmXpzERV_7N3lFq9sM'
LIMIT 1;

-- Venue: Kem Tràng Tiền - Sunset Town, Phú Quốc (Grade C, place_id: ChIJO3-yzguVpzERco-w4qWwzBE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO3-yzguVpzERco-w4qWwzBE',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO3-yzguVpzERco-w4qWwzBE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO3-yzguVpzERco-w4qWwzBE',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO3-yzguVpzERco-w4qWwzBE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO3-yzguVpzERco-w4qWwzBE',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO3-yzguVpzERco-w4qWwzBE'
LIMIT 1;

-- Venue: Sunset Tiger Tea (Grade C, place_id: ChIJO5hTZgCVpzERv98h_ecyvFc)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO5hTZgCVpzERv98h_ecyvFc',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO5hTZgCVpzERv98h_ecyvFc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO5hTZgCVpzERv98h_ecyvFc',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO5hTZgCVpzERv98h_ecyvFc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJO5hTZgCVpzERv98h_ecyvFc',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJO5hTZgCVpzERv98h_ecyvFc'
LIMIT 1;

-- Venue: H Corner Chợ đêm Vuifest (Grade C, place_id: ChIJOTitfqa1oDERmIfA4qzOI_U)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Hong Kong Bubble Waffle with Ice Cream',
  '홍콩식 버블 에그와플과 젤라또 아이스크림',
  'Hong Kong Bubble Waffle with Ice Cream',
  50000,
  '50,000 ~ 75,000 VND',
  'C',
  '선셋타운 Vui-Fest Bazaar 야시장 H Corner 매장 소개 (S362 Seta 3); H Corner 홍콩 에그와플 및 디저트 가격대 (3만~10만 동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJOTitfqa1oDERmIfA4qzOI_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Matcha / Chocolate Bubble Waffle',
  '말차 / 초콜릿 버블 와플',
  'Matcha / Chocolate Bubble Waffle',
  55000,
  '55,000 ~ 80,000 VND',
  'C',
  '선셋타운 Vui-Fest Bazaar 야시장 H Corner 매장 소개 (S362 Seta 3); H Corner 홍콩 에그와플 및 디저트 가격대 (3만~10만 동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJOTitfqa1oDERmIfA4qzOI_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê sữa đá & Trà trái cây',
  '시원한 연유 아이스 커피 및 생과일 티',
  'Cà phê sữa đá & Trà trái cây',
  35000,
  '35,000 ~ 55,000 VND',
  'C',
  '선셋타운 Vui-Fest Bazaar 야시장 H Corner 매장 소개 (S362 Seta 3); H Corner 홍콩 에그와플 및 디저트 가격대 (3만~10만 동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJOTitfqa1oDERmIfA4qzOI_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Trà đào cam sả (Peach Orange Lemongrass Tea)',
  '복숭아 오렌지 레몬그라스 아이스티',
  'Trà đào cam sả (Peach Orange Lemongrass Tea)',
  45000,
  '45,000 ~ 60,000 VND',
  'C',
  '선셋타운 Vui-Fest Bazaar 야시장 H Corner 매장 소개 (S362 Seta 3); H Corner 홍콩 에그와플 및 디저트 가격대 (3만~10만 동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJOTitfqa1oDERmIfA4qzOI_U'
LIMIT 1;

-- Venue: Cap'tr Phú Quốc (Grade D, place_id: ChIJQyGZW3iVpzERlT6miydatAU)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJQyGZW3iVpzERlT6miydatAU'
LIMIT 1;

-- Venue: 마하라자 라운지 선셋타운 (Maharaja Lounge - 인도 채식 레스토랑) (Grade D, place_id: ChIJR4_RrzuVpzERTNZI9HaezLk)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJR4_RrzuVpzERTNZI9HaezLk'
LIMIT 1;

-- Venue: 하이산캉 (Hải Sản Cảng Phú Quốc - 해산물 전문점) (Grade C, place_id: ChIJRT9hCe6VpzER9hYA7wlPylM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Tôm sú sốt cay ngọt (Steamed Sweet & Spicy Prawns)',
  '매콤달콤 특제 소스 타이거새우 찜 요리',
  'Tôm sú sốt cay ngọt (Steamed Sweet & Spicy Prawns)',
  790000,
  '약 790,000 VND / 플레이트',
  'C',
  '하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴); 선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJRT9hCe6VpzER9hYA7wlPylM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mì xào hải sản / Cơm chiên hải sản',
  '해산물 볶음면 / 해산물 볶음밥',
  'Mì xào hải sản / Cơm chiên hải sản',
  150000,
  '150,000 ~ 220,000 VND',
  'C',
  '하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴); 선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJRT9hCe6VpzER9hYA7wlPylM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cá mú sống hấp Hồng Kông (Live Grouper HK Style)',
  '대형 수족관 활 다금바리(그루퍼) 파간장 찜',
  'Cá mú sống hấp Hồng Kông (Live Grouper HK Style)',
  NULL,
  'kg당 당일 싯가 (Market Price)',
  'C',
  '하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴); 선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJRT9hCe6VpzER9hYA7wlPylM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Hàu nướng phô mai / mỡ hành',
  '모차렐라 치즈 굴 구이 / 파기름 굴 구이',
  'Hàu nướng phô mai / mỡ hành',
  35000,
  '35,000 ~ 50,000 VND / 미(piece)',
  'C',
  '하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴); 선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJRT9hCe6VpzER9hYA7wlPylM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tiger / Nước suối',
  '타이거 캔맥주 및 생수',
  'Bia Tiger / Nước suối',
  50000,
  '맥주 50,000 VND / 생수 20,000 VND',
  'C',
  '하이산캉 선셋타운 Ven 45 공식 웹사이트 (50여 종 수족관 해산물과 100여 개 메뉴); 선셋타운 하이산캉 실측 가격 (해산물 볶음면 15만동, 새우 요리 79만동 등)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJRT9hCe6VpzER9hYA7wlPylM'
LIMIT 1;

-- Venue: 베니스 카페 & 이터리 (Venice Café & Eatery) (Grade A, place_id: ChIJS-IdAACVpzERrZzkY5r_-JQ)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Daily Breakfast Buffet',
  '데일리 조식 뷔페 (성인/투숙객 및 일반)',
  'Daily Breakfast Buffet',
  300000,
  '투숙객(Venice, Roma, Sakurakyo) 10% 할인',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tomato Soup',
  '토마토 수프',
  'Tomato Soup',
  215000,
  '215,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Prawn Pumpkin Soup',
  '새우 단호박 수프',
  'Prawn Pumpkin Soup',
  225000,
  '225,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chicken Caesar Salad',
  '치킨 시저 샐러드',
  'Chicken Caesar Salad',
  275000,
  '275,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Salad',
  '그리스식 샐러드',
  'Greek Salad',
  275000,
  '275,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Inter Cold Cuts Banh Mi',
  '인터내셔널 콜드컷 반미',
  'Inter Cold Cuts Banh Mi',
  225000,
  '225,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cheese Burger',
  '호주산 소고기 치즈버거',
  'Cheese Burger',
  345000,
  '345,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chicken Burger',
  '크리스피 치킨버거',
  'Chicken Burger',
  325000,
  '325,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Club Sandwich',
  '클럽 샌드위치',
  'Club Sandwich',
  325000,
  '325,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rib-Eye Steak',
  '립아이 꽃등심 스테이크',
  'Rib-Eye Steak',
  975000,
  '975,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Striploin Steak',
  '채끝 등심 스트립로인 스테이크',
  'Striploin Steak',
  679000,
  '679,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Salmon',
  '노르웨이산 연어 구이',
  'Grilled Salmon',
  539000,
  '539,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Seabass',
  '농어 구이',
  'Grilled Seabass',
  469000,
  '469,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Chicken Wings with Buffalo Sauce',
  '버펄로 윙 치킨',
  'Crispy Chicken Wings with Buffalo Sauce',
  315000,
  '315,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Chicken Breast',
  '그릴드 치킨 브레스트',
  'Grilled Chicken Breast',
  479000,
  '479,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stewed Beef with Red Wine',
  '레드와인 비프 스튜',
  'Stewed Beef with Red Wine',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Smoked Duck Breast with Orange Sauce',
  '오렌지 소스 훈제 오리가슴살',
  'Smoked Duck Breast with Orange Sauce',
  405000,
  '405,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Smoked Pork Rib with BBQ Sauce',
  'BBQ 훈제 돼지 등갈비',
  'Smoked Pork Rib with BBQ Sauce',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Carbonara',
  '스파게티 카르보나라',
  'Spaghetti Carbonara',
  375000,
  '375,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti with Seafood Tomyum Sauce',
  '똠얌 해산물 스파게티',
  'Spaghetti with Seafood Tomyum Sauce',
  375000,
  '375,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti with Truffle Mushroom',
  '트러플 버섯 스파게티',
  'Spaghetti with Truffle Mushroom',
  375000,
  '375,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti with Seafood',
  '해산물 토마토 스파게티',
  'Spaghetti with Seafood',
  375000,
  '375,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Bolognese',
  '스파게티 볼로네제 (라구)',
  'Spaghetti Bolognese',
  375000,
  '375,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Arrabbiata',
  '스파게티 아라비아타',
  'Spaghetti Arrabbiata',
  355000,
  '355,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Campanola Pizza',
  '캄파놀라 채소 피자',
  'Campanola Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Diavola Pizza',
  '디아볼라 페퍼로니 피자',
  'Diavola Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Margherita Pizza',
  '마르게리타 피자',
  'Margherita Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hawaiian Pizza',
  '하와이안 피자',
  'Hawaiian Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Frutti di Mare Pizza',
  '프루티 디 마레 (해산물 피자)',
  'Frutti di Mare Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Quattro Formaggi Pizza',
  '콰트로 포르마지 (4종 치즈 피자)',
  'Quattro Formaggi Pizza',
  425000,
  '425,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Panna Cotta Strawberry',
  '딸기 판나코타',
  'Panna Cotta Strawberry',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tropical Yoghurt',
  '트로피컬 요거트',
  'Tropical Yoghurt',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ice Cream',
  '젤라또 아이스크림',
  'Ice Cream',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Le Triporteur Rouge IGP, Rhône (vang đỏ)',
  'Le Triporteur Rouge IGP, Rhône (vang đỏ)',
  'Le Triporteur Rouge IGP, Rhône (vang đỏ)',
  190000,
  'Ly 190.000 / Chai 890.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Signore Giuseppe Bardolino, Veneto (vang đỏ)',
  'Signore Giuseppe Bardolino, Veneto (vang đỏ)',
  'Signore Giuseppe Bardolino, Veneto (vang đỏ)',
  180000,
  'Ly 180.000 / Chai 850.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Château Platon, Bordeaux (vang đỏ)',
  'Château Platon, Bordeaux (vang đỏ)',
  'Château Platon, Bordeaux (vang đỏ)',
  NULL,
  'Chai 1.400.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  36
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Deakin Estate, Victoria (vang đỏ)',
  'Deakin Estate, Victoria (vang đỏ)',
  'Deakin Estate, Victoria (vang đỏ)',
  NULL,
  'Chai 1.036.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  37
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Velenosi, Abruzzo (vang đỏ)',
  'Velenosi, Abruzzo (vang đỏ)',
  'Velenosi, Abruzzo (vang đỏ)',
  NULL,
  'Chai 1.596.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  38
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Château Pas de l’Âne, Saint-Émilion (vang đỏ)',
  'Château Pas de l’Âne, Saint-Émilion (vang đỏ)',
  'Château Pas de l’Âne, Saint-Émilion (vang đỏ)',
  NULL,
  'Chai 3.500.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  39
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mouton Cadet Classic Rosé (vang hồng)',
  'Mouton Cadet Classic Rosé (vang hồng)',
  'Mouton Cadet Classic Rosé (vang hồng)',
  NULL,
  'Chai 1.996.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  40
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Le Triporteur IGP, Rhône (vang trắng)',
  'Le Triporteur IGP, Rhône (vang trắng)',
  'Le Triporteur IGP, Rhône (vang trắng)',
  190000,
  'Ly 190.000 / Chai 890.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  41
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gustave Lorentz, Alsace (vang trắng)',
  'Gustave Lorentz, Alsace (vang trắng)',
  'Gustave Lorentz, Alsace (vang trắng)',
  NULL,
  'Chai 1.996.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  42
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Santa Cristina, Veneto (vang trắng)',
  'Santa Cristina, Veneto (vang trắng)',
  'Santa Cristina, Veneto (vang trắng)',
  NULL,
  'Chai 1.476.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  43
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Deakin Estate, Victoria (vang trắng)',
  'Deakin Estate, Victoria (vang trắng)',
  'Deakin Estate, Victoria (vang trắng)',
  NULL,
  'Chai 1.036.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  44
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Allan Scott, Marlborough (vang trắng)',
  'Allan Scott, Marlborough (vang trắng)',
  'Allan Scott, Marlborough (vang trắng)',
  NULL,
  'Chai 1.560.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  45
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cava Vega Medien Semi-Sec (vang sủi)',
  'Cava Vega Medien Semi-Sec (vang sủi)',
  'Cava Vega Medien Semi-Sec (vang sủi)',
  NULL,
  'Chai 1.520.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  46
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tommasi Filodora Prosecco (vang sủi)',
  'Tommasi Filodora Prosecco (vang sủi)',
  'Tommasi Filodora Prosecco (vang sủi)',
  NULL,
  'Chai 1.916.000',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  47
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Venice Cocktail',
  '베니스 시그니처 칵테일',
  'Venice Cocktail',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  48
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pearl Island Sunny',
  '펄 아일랜드 써니',
  'Pearl Island Sunny',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  49
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Florence Sunset',
  '플로렌스 선셋',
  'Florence Sunset',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  50
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ly Chỉ Kiss',
  '리치 키스',
  'Ly Chỉ Kiss',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  51
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cold Smoke',
  '콜드 스모크',
  'Cold Smoke',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  52
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Peachy Breeze',
  '피치 브리즈',
  'Peachy Breeze',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  53
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Salted Sol',
  '솔티드 솔',
  'Salted Sol',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  54
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Melon Mist',
  '멜론 미스트',
  'Melon Mist',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  55
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Midnight',
  '미드나이트',
  'Midnight',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  56
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Negroni',
  '네그로니',
  'Negroni',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  57
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Classic Mojito',
  '클래식 모히토',
  'Classic Mojito',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  58
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Long Island Iced Tea',
  '롱아일랜드 아이스티',
  'Long Island Iced Tea',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  59
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pina Colada',
  '피나콜라다',
  'Pina Colada',
  220000,
  '220,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  60
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Venice Sunset',
  '베니스 선셋 목테일',
  'Venice Sunset',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  61
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Guava Detox',
  '구아바 디톡스 목테일',
  'Guava Detox',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  62
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phu Quoc Tropical',
  '푸꾸옥 트로피컬 목테일',
  'Phu Quoc Tropical',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  63
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Island Dream',
  '아일랜드 드림 목테일',
  'Island Dream',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  64
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Passion Virgin Mojito',
  '패션프루트 버진 모히토',
  'Passion Virgin Mojito',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  65
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Blue Ocean',
  '블루 오션 목테일',
  'Blue Ocean',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  66
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gingerberry Fizz',
  '진저베리 피즈 목테일',
  'Gingerberry Fizz',
  155000,
  '155,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  67
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Venice’s Signature Coffee',
  '베니스 시그니처 솔트 크림 커피',
  'Venice’s Signature Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  68
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiramisu Cheese Coffee',
  '티라미수 치즈 커피',
  'Tiramisu Cheese Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  69
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cocoa Tiramisu',
  '코코아 티라미수',
  'Cocoa Tiramisu',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  70
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coconut Coffee',
  '코코넛 스무디 커피',
  'Coconut Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  71
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Yogurt Coffee',
  '요거트 커피',
  'Yogurt Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  72
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Egg Coffee',
  '하노이식 에그 커피',
  'Egg Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  73
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Traditional Coffee',
  '베트남 전통 커피 (카페 쓰어다 / 카페 덴)',
  'Traditional Coffee',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  74
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Espresso, Americano, Latte, Matcha Latte, Cara Latte, Cappuccino',
  '에스프레소 & 이탈리안 커피 셀렉션',
  'Espresso, Americano, Latte, Matcha Latte, Cara Latte, Cappuccino',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  75
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot or Iced Chocolate',
  '핫 / 아이스 초콜릿',
  'Hot or Iced Chocolate',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  76
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tropical Tea',
  '트로피컬 체리 오렌지 티',
  'Tropical Tea',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  77
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Be-A-Mangozing',
  '비-어-망고징 망고 티',
  'Be-A-Mangozing',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  78
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Summer Strawberry',
  '썸머 스트로베리 티',
  'Summer Strawberry',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  79
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Love Sunny',
  '러브 써니 워터멜론 리치 티',
  'Love Sunny',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  80
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'The Smell of the Sunshine',
  '더 스멜 오브 선샤인 애플 시나몬 티',
  'The Smell of the Sunshine',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  81
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Venice Juice',
  '베니스 시그니처 주스',
  'Venice Juice',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  82
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Golden Roots Elixir',
  '골든 루츠 엘릭서 (진저 허니 레몬그라스)',
  'Golden Roots Elixir',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  83
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Beach Bum',
  '비치 범 코코넛 알로에',
  'Beach Bum',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  84
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Summer in Venice',
  '썸머 인 베니스 판단 레몬그라스',
  'Summer in Venice',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  85
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Fresh Juice',
  '100% 착즙 생과일 주스',
  'Fresh Juice',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  86
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Green Zen Energy',
  '그린 젠 에너지 말차 레몬',
  'Green Zen Energy',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  87
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Passion Healthy',
  '패션 헬시 치아시드 드링크',
  'Passion Healthy',
  95000,
  '95,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  88
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Passionate Smoothie',
  '패셔네이트 망고 패션 요거트 스무디',
  'Passionate Smoothie',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  89
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Love Formula',
  '러브 포뮬러 딸기 알로에 블렌디드',
  'Love Formula',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  90
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coma Tango',
  '코마 탱고 망고 코코넛 블렌디드',
  'Coma Tango',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  91
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Choco Blended',
  '초코 블렌디드 프라페',
  'Choco Blended',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  92
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Matcha Blended',
  '말차 블렌디드 프라페',
  'Matcha Blended',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  93
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caramel Mix',
  '카라멜 믹스 요거트 블렌디드',
  'Caramel Mix',
  110000,
  '110,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  94
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Beer 330 ml',
  '베트남 로컬 맥주 (캔/병 330ml)',
  'Beer 330 ml',
  75000,
  '75,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  95
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sapporo Draft',
  '삿포로 생맥주',
  'Sapporo Draft',
  90000,
  '90,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  96
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mineral Water',
  '프리미엄 미네랄 워터',
  'Mineral Water',
  85000,
  '85,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  97
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Soft Drinks',
  '탄산음료',
  'Soft Drinks',
  70000,
  '70,000 VND',
  'A',
  'Skyeth Group 베니스 호텔 공식 웹사이트의 Venice Café & Eatery 정규 풀 메뉴판 (전 품목 베트남어/영어 명칭 및 정가 수록); 베니스 카페 공식 레스토랑 소개 페이지 (조식 뷔페 시간 및 300,000 VND 요금 안내)',
  '2026-10-01'::date,
  98
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS-IdAACVpzERrZzkY5r_-JQ'
LIMIT 1;

-- Venue: Hai Bột Eatery & Homestay Phu Quoc (Grade C, place_id: ChIJS_8A-C2XpzERXDMcG9FVR8w)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bánh canh cua Hai Bột (Signature Crab Noodle Soup)',
  '하이 봇 시그니처 꽃게 쌀국수 (바인깐 꾸아)',
  'Bánh canh cua Hai Bột (Signature Crab Noodle Soup)',
  95000,
  '95,000 ~ 150,000 VND',
  'C',
  '하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54); 하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS_8A-C2XpzERXDMcG9FVR8w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bò bít tết sốt bơ tỏi đặc biệt (Beef Steak with Garlic Butter)',
  '특제 갈릭 버터 소스 비프 스테이크',
  'Bò bít tết sốt bơ tỏi đặc biệt (Beef Steak with Garlic Butter)',
  220000,
  '220,000 ~ 350,000 VND',
  'C',
  '하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54); 하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS_8A-C2XpzERXDMcG9FVR8w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bột chiên & Chả giò truyền thống',
  '베트남식 무 떡 튀김(봇찌엔)과 바삭 스프링롤',
  'Bột chiên & Chả giò truyền thống',
  65000,
  '65,000 ~ 95,000 VND',
  'C',
  '하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54); 하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS_8A-C2XpzERXDMcG9FVR8w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu hải sản Hai Bột (Seafood Hot Pot)',
  '하이 봇 해산물 전골 핫팟',
  'Lẩu hải sản Hai Bột (Seafood Hot Pot)',
  350000,
  '350,000 ~ 550,000 VND',
  'C',
  '하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54); 하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS_8A-C2XpzERXDMcG9FVR8w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê & Trà trái cây tươi',
  '전통 연유 커피 및 생과일 티',
  'Cà phê & Trà trái cây tươi',
  60000,
  '60,000 ~ 90,000 VND',
  'C',
  '하이 봇 푸꾸옥 공식 웹사이트 (선셋타운 베니스 54); 하이 봇 누들, 핫팟, 스테이크 및 음료 가격대 (음료 6만~9만동, 식사 10만~35만동)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJS_8A-C2XpzERXDMcG9FVR8w'
LIMIT 1;

-- Venue: 옥토퍼스 아일랜드 레스토랑 (Octopus Island - 부이페스트 야시장) (Grade C, place_id: ChIJT66MukeVpzERQhQDyvVNUr4)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bạch tuộc nướng sa tế (Grilled Spicy Octopus)',
  '매콤한 사테 양념 문어 숯불구이',
  'Bạch tuộc nướng sa tế (Grilled Spicy Octopus)',
  60000,
  '60,000 ~ 120,000 VND (접시/무게당)',
  'C',
  '부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보; Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJT66MukeVpzERQhQDyvVNUr4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mực nướng muối ớt (Grilled Squid with Chili Salt)',
  '푸꾸옥 한치/오징어 칠리소금 구이',
  'Mực nướng muối ớt (Grilled Squid with Chili Salt)',
  80000,
  '80,000 ~ 150,000 VND',
  'C',
  '부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보; Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJT66MukeVpzERQhQDyvVNUr4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Hàu nướng mỡ hành phô mai (Grilled Oysters with Cheese)',
  '치즈 파기름 굴 구이 (개당 또는 접시)',
  'Hàu nướng mỡ hành phô mai (Grilled Oysters with Cheese)',
  30000,
  '30,000 ~ 60,000 VND',
  'C',
  '부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보; Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJT66MukeVpzERQhQDyvVNUr4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sò nướng mỡ hành (Grilled Scallops & Clams)',
  '가리비 및 조개 파기름 땅콩 구이',
  'Sò nướng mỡ hành (Grilled Scallops & Clams)',
  50000,
  '50,000 ~ 100,000 VND',
  'C',
  '부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보; Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJT66MukeVpzERQhQDyvVNUr4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Xiên nướng đường phố (Street BBQ Skewers)',
  '야시장 해산물 & 고기 꼬치구이',
  'Xiên nướng đường phố (Street BBQ Skewers)',
  30000,
  '30,000 ~ 50,000 VND / 꼬치당',
  'C',
  '부이페스트 야시장 옥토퍼스 아일랜드 구글맵 등록 정보; Vui-Fest Bazaar 야시장 내 시푸드 바비큐 리뷰 및 실측 가격 정보 (단품 3만~10만 동대)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJT66MukeVpzERQhQDyvVNUr4'
LIMIT 1;

-- Venue: Cafe Juliet & Pastries (Grade C, place_id: ChIJTdwiKNmVpzER1knXm_zr2zA)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJTdwiKNmVpzER1knXm_zr2zA',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJTdwiKNmVpzER1knXm_zr2zA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJTdwiKNmVpzER1knXm_zr2zA',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJTdwiKNmVpzER1knXm_zr2zA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJTdwiKNmVpzER1knXm_zr2zA',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJTdwiKNmVpzER1knXm_zr2zA'
LIMIT 1;

-- Venue: The Fern Coffee Sea (Grade C, place_id: ChIJUZs9AACVpzERDU2CVZEwhMQ)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJUZs9AACVpzERDU2CVZEwhMQ',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJUZs9AACVpzERDU2CVZEwhMQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJUZs9AACVpzERDU2CVZEwhMQ',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJUZs9AACVpzERDU2CVZEwhMQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJUZs9AACVpzERDU2CVZEwhMQ',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJUZs9AACVpzERDU2CVZEwhMQ'
LIMIT 1;

-- Venue: 미쉐 아이스크림 & 티 선셋타운점 (MIXUE) (Grade B, place_id: ChIJVUPC1uyXpzERD5yoNJTu_-w)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kem Ốc Quế (Crispy Soft Serve Cone)',
  '소프트 아이스크림 콘',
  'Kem Ốc Quế (Crispy Soft Serve Cone)',
  10000,
  '10,000 VND',
  'B',
  'MIXUE 베트남 표준 메뉴 및 정가',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVUPC1uyXpzERD5yoNJTu_-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nước Chanh Tươi (Fresh Lemon Water)',
  '생레몬 워터',
  'Nước Chanh Tươi (Fresh Lemon Water)',
  15000,
  '15,000 VND',
  'B',
  'MIXUE 베트남 표준 메뉴 및 정가',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVUPC1uyXpzERD5yoNJTu_-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trà Sữa Trân Châu (Pearl Milk Tea)',
  '오리지널 버블 밀크티',
  'Trà Sữa Trân Châu (Pearl Milk Tea)',
  25000,
  '25,000 VND',
  'B',
  'MIXUE 베트남 표준 메뉴 및 정가',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVUPC1uyXpzERD5yoNJTu_-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trà Đào Bốn Mùa (Four Seasons Peach Tea)',
  '포시즌스 복숭아 과일티',
  'Trà Đào Bốn Mùa (Four Seasons Peach Tea)',
  30000,
  '30,000 VND',
  'B',
  'MIXUE 베트남 표준 메뉴 및 정가',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVUPC1uyXpzERD5yoNJTu_-w'
LIMIT 1;

-- Venue: MAE Coffee (Grade C, place_id: ChIJVef0-G6XpzERfRGPWSjnMSM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJVef0-G6XpzERfRGPWSjnMSM',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVef0-G6XpzERfRGPWSjnMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJVef0-G6XpzERfRGPWSjnMSM',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVef0-G6XpzERfRGPWSjnMSM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJVef0-G6XpzERfRGPWSjnMSM',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJVef0-G6XpzERfRGPWSjnMSM'
LIMIT 1;

-- Venue: Hiên Nhà Veranda Sunset Town Phú Quốc (Grade C, place_id: ChIJWemJxp-XpzER7U_LSFAw2FI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Signature Tropical Sunset Cocktail',
  '선셋 시그니처 트로피컬 칵테일',
  'Signature Tropical Sunset Cocktail',
  120000,
  '120,000 ~ 220,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJWemJxp-XpzER7U_LSFAw2FI',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJWemJxp-XpzER7U_LSFAw2FI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  '생맥주 / 수제맥주 (Draft / Craft Beer)',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  65000,
  '65,000 ~ 130,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJWemJxp-XpzER7U_LSFAw2FI',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJWemJxp-XpzER7U_LSFAw2FI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bar Bites & Finger Foods',
  '바 스낵 & 핑거푸드 안주',
  'Bar Bites & Finger Foods',
  90000,
  '90,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJWemJxp-XpzER7U_LSFAw2FI',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJWemJxp-XpzER7U_LSFAw2FI'
LIMIT 1;

-- Venue: Rasa Nusantara Phú Quốc (Grade D, place_id: ChIJX83fV32VpzERWuVp_qZeJVc)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJX83fV32VpzERWuVp_qZeJVc'
LIMIT 1;

-- Venue: SUNNY COFFEE - PHO - BANH MI (Vietnamese cuisine) (Grade C, place_id: ChIJYx62SU2VpzERzC6ZA_AF9YY)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê trứng (Egg Coffee)',
  '하노이식 수제 에그 커피',
  'Cà phê trứng (Egg Coffee)',
  50000,
  '50,000 ~ 65,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê cốt dừa (Coconut Coffee)',
  '코코넛 스무디 커피',
  'Cà phê cốt dừa (Coconut Coffee)',
  55000,
  '55,000 ~ 70,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê sữa đá (Vietnamese Iced Milk Coffee)',
  '베트남 전통 연유 아이스 커피',
  'Cà phê sữa đá (Vietnamese Iced Milk Coffee)',
  35000,
  '35,000 ~ 45,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bánh mì bò tiêu đen (Black Pepper Beef Banh Mi)',
  '블랙페퍼 소고기 반미 바게트 샌드위치',
  'Bánh mì bò tiêu đen (Black Pepper Beef Banh Mi)',
  50000,
  '50,000 ~ 75,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bánh mì thịt nguội (Traditional Cold Cuts Banh Mi)',
  '베트남 전통 햄 & 파테 반미',
  'Bánh mì thịt nguội (Traditional Cold Cuts Banh Mi)',
  40000,
  '40,000 ~ 60,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Phở bò tái nạm (Beef Pho Noodle Soup)',
  '진한 소고기 양지 차돌 쌀국수',
  'Phở bò tái nạm (Beef Pho Noodle Soup)',
  70000,
  '70,000 ~ 90,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố bơ cốt dừa (Avocado Coconut Smoothie)',
  '아보카도 코코넛 생과일 스무디',
  'Sinh tố bơ cốt dừa (Avocado Coconut Smoothie)',
  60000,
  '60,000 ~ 75,000 VND',
  'C',
  '선셋타운 166 Amalfi 구글맵 등록 정보 (평점 4.9, 쌀국수/반미/커피); 선셋타운 써니커피 매장 정보 및 대표 메뉴 가격대 (3만~10만 동대)',
  '2026-10-25'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJYx62SU2VpzERzC6ZA_AF9YY'
LIMIT 1;

-- Venue: 껌자딘 선셋타운 (Cơm Gia Đình - 베트남 가정식) (Grade C, place_id: ChIJZ97LhDOVpzER7ZlyLY3K-9o)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cơm phần gia đình (Family Rice Set)',
  '베트남 가정식 백반 정식 (밥+메인요리+국+반찬)',
  'Cơm phần gia đình (Family Rice Set)',
  80000,
  '80,000 ~ 120,000 VND / 1인',
  'C',
  '선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보; 선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJZ97LhDOVpzER7ZlyLY3K-9o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Thịt heo kho tộ (Claypot Caramelized Pork)',
  '뚝배기 돼지고기 장조림',
  'Thịt heo kho tộ (Claypot Caramelized Pork)',
  70000,
  '70,000 ~ 110,000 VND',
  'C',
  '선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보; 선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJZ97LhDOVpzER7ZlyLY3K-9o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Trứng chiên thịt bằm (Minced Pork Omelette)',
  '다진 돼지고기를 넣은 베트남식 계란부침',
  'Trứng chiên thịt bằm (Minced Pork Omelette)',
  50000,
  '50,000 ~ 75,000 VND',
  'C',
  '선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보; 선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJZ97LhDOVpzER7ZlyLY3K-9o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Rau muống xào tỏi (Stir-fried Morning Glory)',
  '마늘 모닝글로리(공심채) 볶음',
  'Rau muống xào tỏi (Stir-fried Morning Glory)',
  40000,
  '40,000 ~ 60,000 VND',
  'C',
  '선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보; 선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJZ97LhDOVpzER7ZlyLY3K-9o'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Canh chua cá (Sour Fish Soup)',
  '새콤하고 시원한 베트남식 생선탕',
  'Canh chua cá (Sour Fish Soup)',
  80000,
  '80,000 ~ 130,000 VND',
  'C',
  '선셋타운 껌자딘(Cơm Gia Đình - 越南家常菜) 구글맵 등록 정보; 선셋타운 베트남 가정식 백반 가격대 (1인 8만~18만동)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJZ97LhDOVpzER7ZlyLY3K-9o'
LIMIT 1;

-- Venue: WOW QUÊ TÔI (Grade C, place_id: ChIJ_6I1rnKVpzERSyzp7e76ffQ)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Món ăn vặt đường phố Việt Nam',
  '베트남 길거리 퓨전 스낵 모둠',
  'Món ăn vặt đường phố Việt Nam',
  50000,
  '50,000 ~ 90,000 VND',
  'C',
  'http://facebook.com/wowquetoi.phuquoc',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_6I1rnKVpzERSyzp7e76ffQ'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu hải sản bình dân',
  '가성비 해산물 핫팟 전골',
  'Lẩu hải sản bình dân',
  250000,
  '250,000 ~ 380,000 VND',
  'C',
  'http://facebook.com/wowquetoi.phuquoc',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_6I1rnKVpzERSyzp7e76ffQ'
LIMIT 1;

-- Venue: Mía Phú Quốc (Grade C, place_id: ChIJ_8PhSl6XpzERyXEGZHWPPK8)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Signature Tropical Sunset Cocktail',
  '선셋 시그니처 트로피컬 칵테일',
  'Signature Tropical Sunset Cocktail',
  120000,
  '120,000 ~ 220,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_8PhSl6XpzERyXEGZHWPPK8',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_8PhSl6XpzERyXEGZHWPPK8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  '생맥주 / 수제맥주 (Draft / Craft Beer)',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  65000,
  '65,000 ~ 130,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_8PhSl6XpzERyXEGZHWPPK8',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_8PhSl6XpzERyXEGZHWPPK8'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bar Bites & Finger Foods',
  '바 스낵 & 핑거푸드 안주',
  'Bar Bites & Finger Foods',
  90000,
  '90,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_8PhSl6XpzERyXEGZHWPPK8',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_8PhSl6XpzERyXEGZHWPPK8'
LIMIT 1;

-- Venue: PH Rooftop Bar & Lounge - Sea View Restaurant, An Thoi, Phu Quoc (Grade C, place_id: ChIJ_UidppuWpzERKabcboVlovw)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Signature Tropical Sunset Cocktail',
  '선셋 시그니처 트로피컬 칵테일',
  'Signature Tropical Sunset Cocktail',
  120000,
  '120,000 ~ 220,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_UidppuWpzERKabcboVlovw',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_UidppuWpzERKabcboVlovw'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  '생맥주 / 수제맥주 (Draft / Craft Beer)',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  65000,
  '65,000 ~ 130,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_UidppuWpzERKabcboVlovw',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_UidppuWpzERKabcboVlovw'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bar Bites & Finger Foods',
  '바 스낵 & 핑거푸드 안주',
  'Bar Bites & Finger Foods',
  90000,
  '90,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_UidppuWpzERKabcboVlovw',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_UidppuWpzERKabcboVlovw'
LIMIT 1;

-- Venue: Hội Quán - European Brasserie • Bar • Pastry (Grade C, place_id: ChIJ_VQ_ljWXpzERbwSZZ5XUYYU)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'European Pastries & Cakes',
  '유럽식 수제 페이스트리 & 케이크',
  'European Pastries & Cakes',
  60000,
  '60,000 ~ 120,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_VQ_ljWXpzERbwSZZ5XUYYU',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_VQ_ljWXpzERbwSZZ5XUYYU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Brasserie Casual Mains & Pasta',
  '브라세리 캐주얼 파스타 및 스테이크',
  'Brasserie Casual Mains & Pasta',
  180000,
  '180,000 ~ 380,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_VQ_ljWXpzERbwSZZ5XUYYU',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_VQ_ljWXpzERbwSZZ5XUYYU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cocktails & House Wine',
  '시그니처 칵테일 및 하우스 와인',
  'Cocktails & House Wine',
  140000,
  '140,000 ~ 250,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJ_VQ_ljWXpzERbwSZZ5XUYYU',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJ_VQ_ljWXpzERbwSZZ5XUYYU'
LIMIT 1;

-- Venue: 일 살로네 (iL Salone - La Festa Hilton 애프터눈티 & 라운지 바) (Grade B, place_id: ChIJbR-3v0iXpzERO5uhXf8gO8k)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Italian Amalfi Afternoon Tea Set for Two',
  '이탈리안 아말피 애프터눈 티 세트 (2인)',
  'Italian Amalfi Afternoon Tea Set for Two',
  750000,
  '750,000 VND',
  'B',
  '라 페스타 힐튼 일 살로네 라운지 메뉴',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJbR-3v0iXpzERO5uhXf8gO8k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cannoli Siciliani (Classic Sicilian Cannoli)',
  '시칠리아 정통 카놀리 (리코타 치즈)',
  'Cannoli Siciliani (Classic Sicilian Cannoli)',
  120000,
  '120,000 VND',
  'B',
  '라 페스타 힐튼 일 살로네 라운지 메뉴',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJbR-3v0iXpzERO5uhXf8gO8k'
LIMIT 1;

-- Venue: 술탄 터키쉬 케밥 선셋타운 (Sultan Turkish Kebab) (Grade B, place_id: ChIJc9wZF96XpzERaOKT6SZjnj4)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Döner Kebab Bò (Beef Döner Kebab Wrap)',
  '소고기 도네르 케밥 랩',
  'Döner Kebab Bò (Beef Döner Kebab Wrap)',
  110000,
  '110,000 VND',
  'B',
  '구글맵 리뷰 등록 메뉴판',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJc9wZF96XpzERaOKT6SZjnj4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Döner Kebab Gà (Chicken Döner Kebab Wrap)',
  '치킨 도네르 케밥 랩',
  'Döner Kebab Gà (Chicken Döner Kebab Wrap)',
  90000,
  '90,000 VND',
  'B',
  '구글맵 리뷰 등록 메뉴판',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJc9wZF96XpzERaOKT6SZjnj4'
LIMIT 1;

-- Venue: 푸꾸옥 뚱보집 선셋타운점 (한식당) (Grade C, place_id: ChIJcRC6HwCVpzERbkajor2btbM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Samgyeopsal / Pork Belly (삼겹살)',
  '한국식 생삼겹살 / 냉동삼겹살 구이',
  'Samgyeopsal / Pork Belly (삼겹살)',
  180000,
  '180,000 ~ 240,000 VND / 1인분',
  'C',
  '푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개; 선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJcRC6HwCVpzERbkajor2btbM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Honeycomb Pork Rind (돼지 벌집껍데기)',
  '뚱보집 시그니처 쫀득한 벌집 껍데기',
  'Honeycomb Pork Rind (돼지 벌집껍데기)',
  140000,
  '140,000 ~ 190,000 VND',
  'C',
  '푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개; 선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJcRC6HwCVpzERbkajor2btbM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Pork Neck / Moksal (목살)',
  '두툼한 소금 생목살 구이',
  'Pork Neck / Moksal (목살)',
  180000,
  '180,000 ~ 240,000 VND / 1인분',
  'C',
  '푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개; 선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJcRC6HwCVpzERbkajor2btbM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Kimchi Jjigae / Doenjang Jjigae (뚝배기 찌개류)',
  '대형 뚝배기 돼지고기 김치찌개 / 구수한 된장찌개',
  'Kimchi Jjigae / Doenjang Jjigae (뚝배기 찌개류)',
  150000,
  '150,000 ~ 190,000 VND',
  'C',
  '푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개; 선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJcRC6HwCVpzERbkajor2btbM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cheese Tteokbokki (치즈 떡볶이)',
  '매콤달콤 모차렐라 치즈 떡볶이',
  'Cheese Tteokbokki (치즈 떡볶이)',
  140000,
  '140,000 ~ 180,000 VND',
  'C',
  '푸꾸옥 선셋타운 한식당 뚱보집(BBQ Ông Mập) 매장 및 삼겹살/돼지껍데기 메뉴 소개; 선셋타운 아말피 거리 뚱보집 방문 리뷰 (삼겹살, 목살, 된장찌개 등 한식 가격대)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJcRC6HwCVpzERbkajor2btbM'
LIMIT 1;

-- Venue: 카다이 인디안 레스토랑 (Kadhai Indian Restaurant) (Grade D, place_id: ChIJdbjrShmVpzER-zfUU0OhqPg)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdbjrShmVpzER-zfUU0OhqPg'
LIMIT 1;

-- Venue: 더 갱스 선셋 (The Gangs Sunset - 해산물 & 크래프트 비어) (Grade B, place_id: ChIJdy0S10CVpzERjeJJwHTOH7s)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ốc hương Pháp xào bơ tỏi / sốt trứng muối (100g)',
  '프랑스산 바다골뱅이 (마늘버터 / 에그솔트 볶음 100g)',
  'Ốc hương Pháp xào bơ tỏi / sốt trứng muối (100g)',
  81000,
  '100g당 가격 (기본 300g 주문)',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hàu Miyagi Nhật Bản (1 con)',
  '일본 미야기현 직수입 프리미엄 생굴 (1미)',
  'Hàu Miyagi Nhật Bản (1 con)',
  81000,
  '1마리(피스) 기준',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá hồi Na Uy áp chảo sốt chanh leo',
  '노르웨이산 연어 스테이크 패션프루트 소스',
  'Cá hồi Na Uy áp chảo sốt chanh leo',
  265000,
  '265,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Đĩa hải sản nướng tổng hợp The Gangs',
  '더 갱스 시그니처 모둠 해산물 바비큐 플래터',
  'Đĩa hải sản nướng tổng hợp The Gangs',
  580000,
  '580,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bò Mỹ tái chanh wasabi (Tataki)',
  '미국산 소고기 타타키 (라임 와사비 소스)',
  'Bò Mỹ tái chanh wasabi (Tataki)',
  135000,
  '135,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Combo thịt nướng The Gangs BBQ Platter',
  '더 갱스 모둠 고기 바비큐 콤보',
  'Combo thịt nướng The Gangs BBQ Platter',
  680000,
  '680,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm chiên hải sản sốt XO',
  'XO 소스 해산물 볶음밥',
  'Cơm chiên hải sản sốt XO',
  156600,
  '156,600 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm chiên tỏi giòn',
  '바삭한 마늘 볶음밥',
  'Cơm chiên tỏi giòn',
  81000,
  '81,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'The Gangs Craft Beer (Pint)',
  '더 갱스 자체 양조 수제 생맥주 (1파인트)',
  'The Gangs Craft Beer (Pint)',
  75000,
  '75,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bia Tháp (Beer Tower 3L)',
  '수제 생맥주 비어 타워 (3리터)',
  'Bia Tháp (Beer Tower 3L)',
  420000,
  '420,000 VND',
  'B',
  'The Gangs 공식 웹사이트 및 실시간 온라인 오더링 포털; The Gangs Sunset Town 공식 페이스북 채널',
  '2026-09-01'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJdy0S10CVpzERjeJJwHTOH7s'
LIMIT 1;

-- Venue: 라군 BBQ & 베트남 퀴진 (Lagoon BBQ & Vietnamese Cuisine) (Grade C, place_id: ChIJexQHMSaVpzERSr6zIxWjYDs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Combo Nướng Than Hoa Lagoon (Lagoon BBQ Platter)',
  '라군 시그니처 숯불 고기 & 해산물 바비큐 플래터',
  'Combo Nướng Than Hoa Lagoon (Lagoon BBQ Platter)',
  450000,
  '450,000 ~ 850,000 VND',
  'C',
  '라군 BBQ & 베트남 퀴진 공식 페이스북 (선셋타운 베니스 05); 선셋타운 키스브릿지 뷰 바비큐 & 전골 다이닝 가격대 (20만~100만 동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexQHMSaVpzERSr6zIxWjYDs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Đĩa hải sản lạnh phong cách Pháp (Chilled Seafood Platter)',
  '프랑스식 프리미엄 냉 해산물 플래터 (굴, 새우, 게살)',
  'Đĩa hải sản lạnh phong cách Pháp (Chilled Seafood Platter)',
  600000,
  '600,000 ~ 1,200,000 VND',
  'C',
  '라군 BBQ & 베트남 퀴진 공식 페이스북 (선셋타운 베니스 05); 선셋타운 키스브릿지 뷰 바비큐 & 전골 다이닝 가격대 (20만~100만 동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexQHMSaVpzERSr6zIxWjYDs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu hải sản Địa Trung Hải (Mediterranean Seafood Hot Pot)',
  '지중해풍 토마토 해산물 핫팟 전골',
  'Lẩu hải sản Địa Trung Hải (Mediterranean Seafood Hot Pot)',
  380000,
  '380,000 ~ 650,000 VND',
  'C',
  '라군 BBQ & 베트남 퀴진 공식 페이스북 (선셋타운 베니스 05); 선셋타운 키스브릿지 뷰 바비큐 & 전골 다이닝 가격대 (20만~100만 동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexQHMSaVpzERSr6zIxWjYDs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sườn heo nướng sốt BBQ',
  '특제 바비큐 소스 돼지 등갈비 구이',
  'Sườn heo nướng sốt BBQ',
  250000,
  '250,000 ~ 380,000 VND',
  'C',
  '라군 BBQ & 베트남 퀴진 공식 페이스북 (선셋타운 베니스 05); 선셋타운 키스브릿지 뷰 바비큐 & 전골 다이닝 가격대 (20만~100만 동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexQHMSaVpzERSr6zIxWjYDs'
LIMIT 1;

-- Venue: Casa Limone Phu Quoc Hotel & Café - Specialty Coffee & Matcha Bar (Grade C, place_id: ChIJexxLuvWVpzERYfMNC6E2l6k)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJexxLuvWVpzERYfMNC6E2l6k',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexxLuvWVpzERYfMNC6E2l6k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJexxLuvWVpzERYfMNC6E2l6k',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexxLuvWVpzERYfMNC6E2l6k'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJexxLuvWVpzERYfMNC6E2l6k',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJexxLuvWVpzERYfMNC6E2l6k'
LIMIT 1;

-- Venue: 소렌토 레스토랑 & 바 (Sorrento Restaurant & Bar) (Grade C, place_id: ChIJfyqPrL2VpzERtUaB6o2c_ZU)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Chả giò hoàng hôn (Sunset Spring Rolls)',
  '선셋 특제 수제 스프링롤',
  'Chả giò hoàng hôn (Sunset Spring Rolls)',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  '소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰); 소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJfyqPrL2VpzERtUaB6o2c_ZU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu nấm tràm Phú Quốc (Melaleuca Mushroom Hot Pot)',
  '푸꾸옥 특산 짬버섯(멜라루카 버섯) 해산물 전골',
  'Lẩu nấm tràm Phú Quốc (Melaleuca Mushroom Hot Pot)',
  350000,
  '350,000 ~ 550,000 VND',
  'C',
  '소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰); 소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJfyqPrL2VpzERtUaB6o2c_ZU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu ghẹ Hàm Ninh (Ham Ninh Flower Crab Hot Pot)',
  '함닌 꽃게 해산물 전골',
  'Lẩu ghẹ Hàm Ninh (Ham Ninh Flower Crab Hot Pot)',
  450000,
  '450,000 ~ 650,000 VND',
  'C',
  '소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰); 소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJfyqPrL2VpzERtUaB6o2c_ZU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Tôm sú sốt bơ tỏi (Garlic Butter Black Tiger Prawns)',
  '블랙타이거 새우 갈릭버터 구이',
  'Tôm sú sốt bơ tỏi (Garlic Butter Black Tiger Prawns)',
  250000,
  '250,000 ~ 450,000 VND',
  'C',
  '소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰); 소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJfyqPrL2VpzERtUaB6o2c_ZU'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Rượu vang Ý & Cocktail Địa Trung Hải',
  '이탈리아 직수입 와인 및 지중해풍 칵테일',
  'Rượu vang Ý & Cocktail Địa Trung Hải',
  150000,
  '150,000 ~ 300,000 VND (글라스)',
  'C',
  '소렌토 레스토랑 & 바 공식 페이스북 채널 (선셋타운 키스브릿지 인근 오션뷰); 소렌토 레스토랑 지중해 & 베트남 퓨전 시그니처 요리 및 가격대 (1인 30만~70만동)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJfyqPrL2VpzERtUaB6o2c_ZU'
LIMIT 1;

-- Venue: 카페 루남 푸꾸옥 (Café RuNam Phú Quốc - Hexagonal House) (Grade B, place_id: ChIJgbE4kXGVpzERZ8C1U29WbHA)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh mì Phở đặc biệt RuNam',
  '루남 시그니처 반미 퍼 (소고기 쌀국수 풍미 반미)',
  'Bánh mì Phở đặc biệt RuNam',
  195000,
  '195,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hủ tiếu cá hồi / Mì hoành thánh xá xíu',
  '연어 후띠우 / 차슈 완탕면',
  'Hủ tiếu cá hồi / Mì hoành thánh xá xíu',
  230000,
  '230,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bún bò Huế đuôi bò (Oxtail Bun Bo Hue)',
  '소꼬리 분보후에 (매콤 후에 쌀국수)',
  'Bún bò Huế đuôi bò (Oxtail Bun Bo Hue)',
  280000,
  '280,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phở bò tủy xương & đuôi bò cao cấp',
  '프리미엄 사골 골수 & 소꼬리 소고기 쌀국수',
  'Phở bò tủy xương & đuôi bò cao cấp',
  320000,
  '320,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh canh cua lột (Soft-shell Crab Noodle)',
  '소프트셸 크랩 게살 바인깐 국수',
  'Bánh canh cua lột (Soft-shell Crab Noodle)',
  320000,
  '320,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Thịt bò Úc nướng trên đá nóng (250g)',
  '화산석 스톤 그릴 호주산 소고기 스테이크 (250g)',
  'Thịt bò Úc nướng trên đá nóng (250g)',
  590000,
  '590,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá hồi Na Uy áp chảo sốt bơ chanh',
  '노르웨이산 연어 스테이크와 레몬 버터 소스',
  'Cá hồi Na Uy áp chảo sốt bơ chanh',
  390000,
  '390,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì Ý gà nấm sốt kem (Chicken Mushroom Pasta)',
  '치킨 머시룸 크림 파스타',
  'Mì Ý gà nấm sốt kem (Chicken Mushroom Pasta)',
  250000,
  '250,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà phê trứng RuNam (RuNam Signature Egg Coffee)',
  '루남 시그니처 수제 에그 커피',
  'Cà phê trứng RuNam (RuNam Signature Egg Coffee)',
  120000,
  '120,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà phê cốt dừa tuyết (Coconut Snow Coffee)',
  '코코넛 스노우 스무디 커피',
  'Cà phê cốt dừa tuyết (Coconut Snow Coffee)',
  130000,
  '130,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trà hoa quả nhiệt đới thượng hạng',
  '프리미엄 열대 과일 블렌딩 티',
  'Trà hoa quả nhiệt đới thượng hạng',
  110000,
  '110,000 VND',
  'B',
  'Café RuNam 공식 웹사이트 및 푸꾸옥 선셋타운(Hexagonal House 룩각루) 안내; 루남 공식 온라인 메뉴판 (반미 19.5만동, 후띠우 23만동, 분보후에 28만동, 쌀국수 32만동, 스테이크 59만동)',
  '2026-09-01'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgbE4kXGVpzERZ8C1U29WbHA'
LIMIT 1;

-- Venue: 테아트로 클럽 푸꾸옥 (Teatro Club Phú Quốc) (Grade B, place_id: ChIJgdPeM-6VpzERp4qCP5Rftfc)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Teatro Signature Sunset Flame Cocktail',
  '테아트로 선셋 플레임 칵테일',
  'Teatro Signature Sunset Flame Cocktail',
  250000,
  '250,000 VND',
  'B',
  '테아트로 클럽 공식 드링크 메뉴',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgdPeM-6VpzERp4qCP5Rftfc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Classic Gin & Tonic (Hendrick’s)',
  '핸드릭스 진토닉',
  'Classic Gin & Tonic (Hendrick’s)',
  220000,
  '220,000 VND',
  'B',
  '테아트로 클럽 공식 드링크 메뉴',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJgdPeM-6VpzERp4qCP5Rftfc'
LIMIT 1;

-- Venue: 델리 다르바르 인디안 레스토랑 (Delhi Darbaar) (Grade D, place_id: ChIJhZhof9GNpzERkbbDN9MnQEo)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhZhof9GNpzERkbbDN9MnQEo'
LIMIT 1;

-- Venue: 하이랜드 커피 안터이 케이블카역점 (Highlands Coffee Cable Car An Thới) (Grade B, place_id: ChIJhwN-oSqXpzERgUhhE4tiYRE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phin Sữa Đá (Iced Coffee with Condensed Milk)',
  '카페 쓰어다 (베트남 전통 핀 연유 아이스 커피)',
  'Phin Sữa Đá (Iced Coffee with Condensed Milk)',
  39000,
  '39,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Phin Đen Đá (Iced Black Coffee)',
  '카페 덴다 (베트남 전통 핀 블랙 아이스 커피)',
  'Phin Đen Đá (Iced Black Coffee)',
  35000,
  '35,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bạc Xỉu Đá (White Coffee with Extra Milk)',
  '박시우 (부드러운 연유 라떼)',
  'Bạc Xỉu Đá (White Coffee with Extra Milk)',
  45000,
  '45,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trà Sen Vàng (Golden Lotus Seed Tea)',
  '짜 센 방 (골든 연꽃씨 밀크티)',
  'Trà Sen Vàng (Golden Lotus Seed Tea)',
  55000,
  '55,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Trà Thạch Đào (Peach Jelly Tea)',
  '복숭아 젤리 아이스티',
  'Trà Thạch Đào (Peach Jelly Tea)',
  55000,
  '55,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Freeze Trà Xanh (Green Tea Freeze)',
  '그린티 프리즈 (녹차 블렌디드 스무디)',
  'Freeze Trà Xanh (Green Tea Freeze)',
  65000,
  '65,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caramel Phin Freeze',
  '카라멜 핀 프리즈',
  'Caramel Phin Freeze',
  65000,
  '65,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bánh Mì Thịt Nướng (Grilled Pork Banh Mi)',
  '바비큐 돼지고기 반미',
  'Bánh Mì Thịt Nướng (Grilled Pork Banh Mi)',
  29000,
  '29,000 VND',
  'B',
  '하이랜드 커피 공식 메뉴 및 정가',
  '2026-10-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJhwN-oSqXpzERgUhhE4tiYRE'
LIMIT 1;

-- Venue: Senthy Coffee Lounge (Grade C, place_id: ChIJi6p4AwCXpzERrcfUWx2c6gY)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJi6p4AwCXpzERrcfUWx2c6gY',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJi6p4AwCXpzERrcfUWx2c6gY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJi6p4AwCXpzERrcfUWx2c6gY',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJi6p4AwCXpzERrcfUWx2c6gY'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJi6p4AwCXpzERrcfUWx2c6gY',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJi6p4AwCXpzERrcfUWx2c6gY'
LIMIT 1;

-- Venue: Chill Sunset Restaurant (Grade C, place_id: ChIJia_QcgCVpzER-0oMbCu_tgs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cocktail Hoàng Hôn (Sunset Chill Cocktail)',
  '칠 선셋 시그니처 트로피컬 칵테일',
  'Cocktail Hoàng Hôn (Sunset Chill Cocktail)',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJia_QcgCVpzER-0oMbCu_tgs',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJia_QcgCVpzER-0oMbCu_tgs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Đĩa hải sản nướng & Bia lạnh',
  '해산물 구이 플래터와 시원한 맥주',
  'Đĩa hải sản nướng & Bia lạnh',
  250000,
  '250,000 ~ 450,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJia_QcgCVpzER-0oMbCu_tgs',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJia_QcgCVpzER-0oMbCu_tgs'
LIMIT 1;

-- Venue: 까이 멈 비스트로 (Cái Mâm Bistro - Vietnamese Noodles & Cafe) (Grade C, place_id: ChIJj9eeH0-XpzERR3O-7B0rxFo)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Phở Bò Hà Nội (Traditional Hanoi Beef Pho)',
  '하노이 정통 소고기 쌀국수',
  'Phở Bò Hà Nội (Traditional Hanoi Beef Pho)',
  65000,
  '65,000 ~ 95,000 VND',
  'C',
  '까이 멈 비스트로 선셋타운점 공식 안내 (Vui-Fest Bazaar 야시장 P27); 선셋타운 까이 멈 비스트로 식사 가격대 (1인 6만~20만 동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJj9eeH0-XpzERR3O-7B0rxFo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bún Bò Nam Bộ (Southern Dry Beef Noodles)',
  '분보남보 (베트남 남부식 소고기 비빔 쌀국수)',
  'Bún Bò Nam Bộ (Southern Dry Beef Noodles)',
  75000,
  '75,000 ~ 110,000 VND',
  'C',
  '까이 멈 비스트로 선셋타운점 공식 안내 (Vui-Fest Bazaar 야시장 P27); 선셋타운 까이 멈 비스트로 식사 가격대 (1인 6만~20만 동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJj9eeH0-XpzERR3O-7B0rxFo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Chả Giò Cái Mâm (Crispy Spring Rolls)',
  '까이 멈 수제 바삭 튀김 스프링롤',
  'Chả Giò Cái Mâm (Crispy Spring Rolls)',
  60000,
  '60,000 ~ 95,000 VND',
  'C',
  '까이 멈 비스트로 선셋타운점 공식 안내 (Vui-Fest Bazaar 야시장 P27); 선셋타운 까이 멈 비스트로 식사 가격대 (1인 6만~20만 동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJj9eeH0-XpzERR3O-7B0rxFo'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà Phê & Trà Trái Cây (Vietnamese Coffee & Fruit Tea)',
  '베트남 전통 핀 커피 및 시원한 열대 과일차',
  'Cà Phê & Trà Trái Cây (Vietnamese Coffee & Fruit Tea)',
  35000,
  '35,000 ~ 65,000 VND',
  'C',
  '까이 멈 비스트로 선셋타운점 공식 안내 (Vui-Fest Bazaar 야시장 P27); 선셋타운 까이 멈 비스트로 식사 가격대 (1인 6만~20만 동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJj9eeH0-XpzERR3O-7B0rxFo'
LIMIT 1;

-- Venue: 에릭 케제르 푸꾸옥 (Maison Eric Kayser Sunset Town) (Grade B, place_id: ChIJjVDpHgiHCjERTaQVRRrVJ9Y)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Croissant au Beurre (French Butter Croissant)',
  '버터 크루아상 (프랑스 AOP 버터 100%)',
  'Croissant au Beurre (French Butter Croissant)',
  45000,
  '45,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pain au Chocolat',
  '뺑 오 쇼콜라',
  'Pain au Chocolat',
  55000,
  '55,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Baguette Monge (Artisanal Monge Baguette)',
  '바게트 몽쥬 (천연 발효 정통 프랑스 바게트)',
  'Baguette Monge (Artisanal Monge Baguette)',
  45000,
  '45,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tarte au Citron Meringuée (Lemon Meringue Tart)',
  '레몬 머랭 타르트',
  'Tarte au Citron Meringuée (Lemon Meringue Tart)',
  95000,
  '95,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Café Latte / Cappuccino',
  '카페 라떼 / 카푸치노',
  'Café Latte / Cappuccino',
  75000,
  '75,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Americano (Hot / Iced)',
  '아메리카노 (핫 / 아이스)',
  'Americano (Hot / Iced)',
  65000,
  '65,000 VND',
  'B',
  '에릭 케제르 베트남 공식 메뉴 및 정가',
  '2026-10-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJjVDpHgiHCjERTaQVRRrVJ9Y'
LIMIT 1;

-- Venue: 선셋분식 (Sunset Bunsik) (Grade B, place_id: ChIJk-2CcACXpzERjAdWD6NvD-w)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sunset Kimbap',
  '선셋김밥 (기본 야채김밥)',
  'Sunset Kimbap',
  100000,
  '100,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tuna Kimbap',
  '참치김밥',
  'Tuna Kimbap',
  110000,
  '110,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spicy Chili Kimbap',
  '땡초김밥',
  'Spicy Chili Kimbap',
  110000,
  '110,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tteokbokki / Rabokki',
  '떡볶이 / 라볶이',
  'Tteokbokki / Rabokki',
  120000,
  '120,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kimchi Cold Noodles',
  '김치말이국수',
  'Kimchi Cold Noodles',
  160000,
  '160,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Korean Ramen',
  '신라면 / 해물라면',
  'Korean Ramen',
  90000,
  '90,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spam Kimchi Cup Rice',
  '스팸 김치 컵밥',
  'Spam Kimchi Cup Rice',
  120000,
  '120,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kimchi Jjigae',
  '김치찌개',
  'Kimchi Jjigae',
  160000,
  '160,000 VND',
  'B',
  '한국인 여행객 영수증 및 현장 메뉴판 인증 리뷰 (김밥 10만 동, 떡볶이 12만 동, 김치말이국수 16만 동 확인); 선셋분식 제휴 할인 및 위치 안내 (시계탑 및 케이블카 인근 A56 Sunset Town)',
  '2026-05-01'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk-2CcACXpzERjAdWD6NvD-w'
LIMIT 1;

-- Venue: Apollo Cafe Phu Quoc (Grade C, place_id: ChIJk8rbTrmXpzERJtmse_K7fYA)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJk8rbTrmXpzERJtmse_K7fYA',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk8rbTrmXpzERJtmse_K7fYA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJk8rbTrmXpzERJtmse_K7fYA',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk8rbTrmXpzERJtmse_K7fYA'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJk8rbTrmXpzERJtmse_K7fYA',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJk8rbTrmXpzERJtmse_K7fYA'
LIMIT 1;

-- Venue: Turkish Kitchen (Grade D, place_id: ChIJkfRb6NeVpzERPDPeRKGHXZ0)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJkfRb6NeVpzERPDPeRKGHXZ0'
LIMIT 1;

-- Venue: Nhà Hàng Cơm Niêu Việt Xưa - An Thới (Grade B, place_id: ChIJlehtpXeXpzERpS23o9pxwrc)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ba chỉ rang mắm tép (Fried Pork Belly with Shrimp Paste)',
  '바삭 삼겹살 맘뗍(새우젓갈) 볶음',
  'Ba chỉ rang mắm tép (Fried Pork Belly with Shrimp Paste)',
  90000,
  '90,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá bống kho tộ (Claypot Braised Goby Fish)',
  '옹기 뚝배기 망둑어(생선) 카라멜 조림',
  'Cá bống kho tộ (Claypot Braised Goby Fish)',
  100000,
  '100,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bò xào rau củ theo mùa (Stir-fried Beef with Vegetables)',
  '소고기 계절 야채 볶음',
  'Bò xào rau củ theo mùa (Stir-fried Beef with Vegetables)',
  145000,
  '145,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Thịt ba chỉ luộc chấm cà pháo mắm tôm',
  '삶은 삼겹살 수육과 가지절임 맘똠',
  'Thịt ba chỉ luộc chấm cà pháo mắm tôm',
  95000,
  '95,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm niêu cháy giòn (Crispy Claypot Rice)',
  '전통 옹기 돌솥 누룽지 밥',
  'Cơm niêu cháy giòn (Crispy Claypot Rice)',
  30000,
  '30,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Canh cua đồng mồng tơi (Field Crab & Spinach Soup)',
  '민물 게살 말라바 시금치 국',
  'Canh cua đồng mồng tơi (Field Crab & Spinach Soup)',
  70000,
  '70,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Canh chua cá lăng (Sour Catfish Soup)',
  '칼칼한 메콩 생선 신선탕 (칸추아)',
  'Canh chua cá lăng (Sour Catfish Soup)',
  85000,
  '85,000 VND',
  'B',
  'Cơm Niêu Việt Xưa 공식 웹사이트 및 안터이/남부 매장 안내; 정규 단품 가격표 (삼겹살 9만동, 생선조림 10만동, 소고기 14.5만동, 국 7만동)',
  '2026-07-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJlehtpXeXpzERpS23o9pxwrc'
LIMIT 1;

-- Venue: 라군 식당 (Grade C, place_id: ChIJmwciuL6VpzER3ZIjhoDL17I)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴 안내',
  'Menu Unconfirmed',
  '메뉴 정보 현장 확인 필요 (미확인)',
  'Menu information to be verified on-site',
  NULL,
  '현장 문의',
  'D',
  '현장 미확인',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJmwciuL6VpzER3ZIjhoDL17I'
LIMIT 1;

-- Venue: 핀카 (Finca - La Festa Hilton 스페인 다이닝) (Grade A, place_id: ChIJn8-tUACXpzER6RqdNBwIv2U)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spanish Indulgence Set',
  '스페인식 브런치 세트',
  'Spanish Indulgence Set',
  285000,
  '++ (세금·서비스료 별도)',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ensalada Mediterránea de la Costa',
  '엔살라다 메디테라네아 (해안식 지중해 샐러드)',
  'Ensalada Mediterránea de la Costa',
  245000,
  '245,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Roast Chicken Croquettes',
  '치킨 크로켓',
  'Roast Chicken Croquettes',
  155000,
  '155,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spanish Avocado Toast',
  '스페인식 아보카도 토스트',
  'Spanish Avocado Toast',
  215000,
  '215,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bocadillo Ibérico',
  '보카디요 이베리코 (하몽 바게트 샌드위치)',
  'Bocadillo Ibérico',
  275000,
  '275,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crab Salad Brioche',
  '게살 샐러드 브리오슈',
  'Crab Salad Brioche',
  295000,
  '295,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spanish Burger',
  '스페인식 버거',
  'Spanish Burger',
  275000,
  '275,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caramelized Onion and Potato Tortilla',
  '캐러멜라이즈 양파 감자 토르티야',
  'Caramelized Onion and Potato Tortilla',
  195000,
  '195,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Roasted Cauliflower with Romesco',
  '로메스코 소스 구운 콜리플라워',
  'Roasted Cauliflower with Romesco',
  195000,
  '195,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Huevos Rotos with Chorizo',
  '우에보스 로토스 (초리소 달걀 감자)',
  'Huevos Rotos with Chorizo',
  275000,
  '275,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tapas Evening Package (2 persons)',
  '타파스 이브닝 패키지 (2인)',
  'Tapas Evening Package (2 persons)',
  1200000,
  'NET (세금·서비스료 포함), 2인 가격',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Roast Chicken Croquettes',
  '치킨 크로켓',
  'Roast Chicken Croquettes',
  95000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Local Oysters',
  '푸꾸옥 굴 (3가지 스타일)',
  'Local Oysters',
  165000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Seabass Ceviche',
  '농어 세비체',
  'Seabass Ceviche',
  115000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Charcuterie & Cheese Board',
  '샤퀴테리 & 치즈 보드',
  'Charcuterie & Cheese Board',
  165000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiger Prawns Grilled with Vinaigrette',
  '타이거새우 마늘 오일 구이',
  'Tiger Prawns Grilled with Vinaigrette',
  115000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Galician Style Octopus with Chimichurri',
  '갈리시아식 문어 구이',
  'Galician Style Octopus with Chimichurri',
  185000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Seared Scallops',
  '관자 시어링',
  'Seared Scallops',
  185000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Andalusian Style Fried Squid',
  '안달루시아식 오징어 튀김',
  'Andalusian Style Fried Squid',
  165000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan con Tomate',
  '판 콘 토마테 (스페인식 토마토 빵)',
  'Pan con Tomate',
  95000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Charcoal Roasted Vegetables with Romesco Sauce',
  '로메스코 소스 숯불 구운 채소',
  'Charcoal Roasted Vegetables with Romesco Sauce',
  95000,
  '추가 주문가',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'House Wine by Glass (Red / White / Sparkling)',
  '하우스 와인 글라스 (레드/화이트/스파클링)',
  'House Wine by Glass (Red / White / Sparkling)',
  175000,
  '175,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'House Wine by Bottle (Red / White / Sparkling)',
  '하우스 와인 보틀 (레드/화이트/스파클링)',
  'House Wine by Bottle (Red / White / Sparkling)',
  750000,
  '750,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Roasted Chicken Croquettes',
  '치킨 크로켓',
  'Roasted Chicken Croquettes',
  155000,
  '155,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tomato Salad with Mixed Greens & Escabeche Mackerel',
  '에스카베체 고등어 토마토 샐러드',
  'Tomato Salad with Mixed Greens & Escabeche Mackerel',
  195000,
  '195,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Seabass Ceviche',
  '농어 세비체',
  'Seabass Ceviche',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Local Oysters',
  '푸꾸옥 굴 (3가지 스타일)',
  'Local Oysters',
  275000,
  '275,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Seared Scallops',
  '관자 시어링',
  'Seared Scallops',
  365000,
  '365,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Charcuterie & Cheese Board',
  '샤퀴테리 & 치즈 보드',
  'Charcuterie & Cheese Board',
  395000,
  '395,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Betanzos-Style Tortilla with Marinated Pork',
  '베탄소스식 토르티야 (양념 돼지고기)',
  'Betanzos-Style Tortilla with Marinated Pork',
  225000,
  '225,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pork Cheeks Braised in Spiced Wine',
  '향신 와인 돼지 볼살 찜',
  'Pork Cheeks Braised in Spiced Wine',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Tiger Prawns',
  '타이거새우 구이',
  'Grilled Tiger Prawns',
  375000,
  '375,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Red Shrimp Tartare',
  '레드 쉬림프 타르타르',
  'Red Shrimp Tartare',
  395000,
  '395,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Octopus',
  '문어 구이',
  'Grilled Octopus',
  395000,
  '395,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grouper Suquet',
  '그루퍼 수켓 (스페인식 생선 스튜)',
  'Grouper Suquet',
  395000,
  '395,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Surf & Turf Seafood Paella (per person)',
  '해산물 파에야 (1인)',
  'Surf & Turf Seafood Paella (per person)',
  295000,
  '295,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  36
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Add Prawn 100g',
  '새우 100g 추가',
  'Add Prawn 100g',
  200000,
  '200,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  37
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Add Half of Lobster 600g',
  '랍스터 반 마리(600g) 추가',
  'Add Half of Lobster 600g',
  950000,
  '950,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  38
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Surf & Turf Seafood Paella (sharing)',
  '해산물 파에야 (셰어용)',
  'Surf & Turf Seafood Paella (sharing)',
  950000,
  '950,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  39
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan-Seared Grass-Fed 7+ Wagyu',
  '목초 사육 와규 7+ 팬 시어링',
  'Pan-Seared Grass-Fed 7+ Wagyu',
  1295000,
  '1,295,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  40
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sauteed Vegetables',
  '채소 볶음',
  'Sauteed Vegetables',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  41
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Confit Aubergine with Honey',
  '꿀 가지 콩피',
  'Confit Aubergine with Honey',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  42
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patatas Bravas',
  '파타타스 브라바스 (스페인식 감자튀김)',
  'Patatas Bravas',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  43
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pan con Tomate',
  '판 콘 토마테 (토마토 빵)',
  'Pan con Tomate',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  44
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Charcoal-Roasted Peppers and Onions',
  '숯불 구운 피망과 양파',
  'Charcoal-Roasted Peppers and Onions',
  150000,
  '저녁 메뉴에만 표기',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  45
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spiced Creme Caramel',
  '스파이스 크렘 캐러멜 (플랑)',
  'Spiced Creme Caramel',
  175000,
  '175,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  46
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Almond Tart',
  '아몬드 타르트',
  'Almond Tart',
  175000,
  '175,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  47
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Torrija',
  '토리하 (스페인식 프렌치토스트)',
  'Torrija',
  175000,
  '175,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  48
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Roast Chicken Croquettes',
  '치킨 크로켓 (어린이)',
  'Roast Chicken Croquettes',
  160000,
  '160,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  49
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Kid Burger',
  '어린이 버거',
  'Kid Burger',
  160000,
  '160,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  50
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Breaded Fish Bites with Aioli',
  '그루퍼 생선 튀김과 아이올리',
  'Breaded Fish Bites with Aioli',
  160000,
  '160,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  51
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Earl Grey',
  '얼그레이',
  'Earl Grey',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  52
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'English Breakfast',
  '잉글리시 브렉퍼스트',
  'English Breakfast',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  53
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Black Coffee',
  '베트남 블랙커피 (카페 덴)',
  'Vietnamese Black Coffee',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  54
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vietnamese Coffee with Condensed Milk',
  '베트남 연유커피 (카페 쓰어)',
  'Vietnamese Coffee with Condensed Milk',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  55
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Salted Iced Coffee',
  '아이스 소금커피',
  'Salted Iced Coffee',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  56
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cappuccino',
  '카푸치노',
  'Cappuccino',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  57
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Latte',
  '라테',
  'Latte',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  58
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Espresso',
  '에스프레소',
  'Espresso',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  59
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Americano',
  '아메리카노',
  'Americano',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  60
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot Chocolate',
  '핫초콜릿',
  'Hot Chocolate',
  120000,
  '120,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  61
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coke / Coke Zero / Sprite / Ginger Ale Schweppes / Indian Tonic / Soda Schweppes',
  '콜라·제로콜라·스프라이트·진저에일·토닉·소다',
  'Coke / Coke Zero / Sprite / Ginger Ale Schweppes / Indian Tonic / Soda Schweppes',
  90000,
  '90,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  62
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Aqua Panna Still 750ml',
  '아쿠아 파나 생수 750ml',
  'Aqua Panna Still 750ml',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  63
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'San Pellegrino 750ml',
  '산펠레그리노 탄산수 750ml',
  'San Pellegrino 750ml',
  265000,
  '265,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  64
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiger / Saigon Special / Heineken',
  '타이거·사이공 스페셜·하이네켄',
  'Tiger / Saigon Special / Heineken',
  110000,
  '110,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  65
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sun Kraft Beer Helles Can',
  '선 크래프트 비어 헬레스 (캔)',
  'Sun Kraft Beer Helles Can',
  70000,
  '70,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  66
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Brisa de Verano',
  '브리사 데 베라노',
  'Brisa de Verano',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  67
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Verde Vida',
  '베르데 비다',
  'Verde Vida',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  68
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rosa del Alba',
  '로사 델 알바',
  'Rosa del Alba',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  69
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Young Coconut Juice',
  '생코코넛 주스',
  'Young Coconut Juice',
  150000,
  '150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  70
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Berry Fiesta (smoothie)',
  '베리 피에스타 (스무디)',
  'Berry Fiesta (smoothie)',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  71
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sol Tropical (smoothie)',
  '솔 트로피컬 (스무디)',
  'Sol Tropical (smoothie)',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  72
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Amber Flow',
  '앰버 플로',
  'Amber Flow',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  73
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rosa Salvaje',
  '로사 살바헤',
  'Rosa Salvaje',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  74
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Berry Carmesí',
  '베리 카르메시',
  'Berry Carmesí',
  180000,
  '180,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  75
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Apertura',
  '아페르투라',
  'Apertura',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  76
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cantriberry',
  '칸트리베리',
  'Cantriberry',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  77
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Galicia Tropical',
  '갈리시아 트로피컬',
  'Galicia Tropical',
  380000,
  '380,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  78
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Signature Sangria',
  '시그니처 상그리아',
  'Signature Sangria',
  350000,
  '350,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  79
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Atlantico',
  '아틀란티코',
  'Atlantico',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  80
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Aro Dorado',
  '아로 도라도',
  'Aro Dorado',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  81
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'La Rosa',
  '라 로사',
  'La Rosa',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  82
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Negroni Travieso',
  '네그로니 트라비에소',
  'Negroni Travieso',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  83
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Delafinca Cava (Blend)',
  '델라핀카 카바 (스파클링)',
  'Delafinca Cava (Blend)',
  195000,
  '195,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  84
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pedro Luis Jumilla, DO Jumilla (Sauvignon Blanc)',
  '페드로 루이스 후미야 (화이트, 소비뇽 블랑)',
  'Pedro Luis Jumilla, DO Jumilla (Sauvignon Blanc)',
  215000,
  '215,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  85
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Solaz (Verdejo)',
  '솔라스 (화이트, 베르데호)',
  'Solaz (Verdejo)',
  235000,
  '235,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  86
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pedro Luis Jumilla Monastrell, DO Jumilla (Mourvedre)',
  '페드로 루이스 후미야 모나스트렐 (레드)',
  'Pedro Luis Jumilla Monastrell, DO Jumilla (Mourvedre)',
  215000,
  '215,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  87
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Solaz (Tempranillo, Cabernet Sauvignon)',
  '솔라스 (레드, 템프라니요·카베르네 소비뇽)',
  'Solaz (Tempranillo, Cabernet Sauvignon)',
  235000,
  '235,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  88
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Delafinca Cava (Blend)',
  '델라핀카 카바 (스파클링)',
  'Delafinca Cava (Blend)',
  995000,
  '995,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  89
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rondel Gold Semi Seco, DO Cava',
  '론델 골드 세미 세코 카바 (스파클링)',
  'Rondel Gold Semi Seco, DO Cava',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  90
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pedro Luis Jumilla, DO Jumilla (Sauvignon Blanc)',
  '페드로 루이스 후미야 (화이트)',
  'Pedro Luis Jumilla, DO Jumilla (Sauvignon Blanc)',
  995000,
  '995,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  91
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Solaz (Verdejo)',
  '솔라스 (화이트)',
  'Solaz (Verdejo)',
  1150000,
  '1,150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  92
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Torres, Viña Esmeralda Semi Dry White, Catalunya (Moscatel, Gewürztraminer)',
  '토레스 비냐 에스메랄다 (세미 드라이 화이트)',
  'Torres, Viña Esmeralda Semi Dry White, Catalunya (Moscatel, Gewürztraminer)',
  1800000,
  '1,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  93
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Rías Baixas Faustino Rivero Ulecia (Albariño)',
  '리아스 바이샤스 파우스티노 리베로 울레시아 (알바리뇨)',
  'Rías Baixas Faustino Rivero Ulecia (Albariño)',
  1950000,
  '메뉴판 원문 ''Rias Bixas Fautino''',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  94
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Santa Julia "Nacional" (Semillon - Torrontes)',
  '산타 훌리아 나시오날 (화이트)',
  'Santa Julia "Nacional" (Semillon - Torrontes)',
  2000000,
  '2,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  95
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Marqués de Riscal, Rueda DO (Sauvignon Blanc)',
  '마르케스 데 리스칼 루에다 (화이트)',
  'Marqués de Riscal, Rueda DO (Sauvignon Blanc)',
  2150000,
  '2,150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  96
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Henri Bourgeois, ''En Travertin'', Pouilly Fumé (Sauvignon Blanc)',
  '앙리 부르주아 앙 트라베르탱 푸이 퓌메 (화이트)',
  'Henri Bourgeois, ''En Travertin'', Pouilly Fumé (Sauvignon Blanc)',
  3950000,
  '3,950,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  97
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pedro Luis Jumilla Monastrell, DO Jumilla (Mourvedre)',
  '페드로 루이스 후미야 모나스트렐 (레드)',
  'Pedro Luis Jumilla Monastrell, DO Jumilla (Mourvedre)',
  995000,
  '995,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  98
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Solaz (Tempranillo, Cabernet Sauvignon)',
  '솔라스 (레드)',
  'Solaz (Tempranillo, Cabernet Sauvignon)',
  1150000,
  '1,150,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  99
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Torres, Sangre de Toro Original, Catalunya DO (Grenache Carignan)',
  '토레스 상그레 데 토로 (레드)',
  'Torres, Sangre de Toro Original, Catalunya DO (Grenache Carignan)',
  1700000,
  '1,700,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  100
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Marqués de Riscal, Próximo, Rioja DOCa (Tempranillo blend)',
  '마르케스 데 리스칼 프록시모 리오하 (레드)',
  'Marqués de Riscal, Próximo, Rioja DOCa (Tempranillo blend)',
  1750000,
  '1,750,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  101
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Marqués de Riscal, Reserva, Rioja DOCa (Tempranillo blend)',
  '마르케스 데 리스칼 레세르바 리오하 (레드)',
  'Marqués de Riscal, Reserva, Rioja DOCa (Tempranillo blend)',
  3850000,
  '3,850,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  102
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bombay Sapphire - shot',
  '봄베이 사파이어 (샷)',
  'Bombay Sapphire - shot',
  200000,
  '200,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  103
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bombay Sapphire - bottle',
  '봄베이 사파이어 (보틀)',
  'Bombay Sapphire - bottle',
  1100000,
  '1,100,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  104
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nordés - shot',
  '노르데스 진 (샷)',
  'Nordés - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  105
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nordés - bottle',
  '노르데스 진 (보틀)',
  'Nordés - bottle',
  2800000,
  '2,800,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  106
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Blanca - shot',
  '바카디 카르타 블랑카 (샷)',
  'Bacardi Carta Blanca - shot',
  200000,
  '200,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  107
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Blanca - bottle',
  '바카디 카르타 블랑카 (보틀)',
  'Bacardi Carta Blanca - bottle',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  108
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Oro - shot',
  '바카디 카르타 오로 (샷)',
  'Bacardi Carta Oro - shot',
  200000,
  '200,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  109
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bacardi Carta Oro - bottle',
  '바카디 카르타 오로 (보틀)',
  'Bacardi Carta Oro - bottle',
  1500000,
  '1,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  110
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vededi Right Rum - shot',
  '베데디 라이트 럼 (샷)',
  'Vededi Right Rum - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  111
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vededi Right Rum - bottle',
  '베데디 라이트 럼 (보틀)',
  'Vededi Right Rum - bottle',
  1850000,
  '1,850,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  112
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Belami ROC 16 Delta - shot',
  '벨라미 ROC 16 델타 (샷)',
  'Belami ROC 16 Delta - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  113
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Belami ROC 16 Delta - bottle',
  '벨라미 ROC 16 델타 (보틀)',
  'Belami ROC 16 Delta - bottle',
  3650000,
  '3,650,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  114
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patrón Silver - shot',
  '파트론 실버 (샷)',
  'Patrón Silver - shot',
  365000,
  '365,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  115
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Patrón Silver - bottle',
  '파트론 실버 (보틀)',
  'Patrón Silver - bottle',
  5900000,
  '5,900,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  116
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ketel One - shot',
  '케텔 원 (샷)',
  'Ketel One - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  117
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ketel One - bottle',
  '케텔 원 (보틀)',
  'Ketel One - bottle',
  2650000,
  '2,650,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  118
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grey Goose - shot',
  '그레이 구스 (샷)',
  'Grey Goose - shot',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  119
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grey Goose - bottle',
  '그레이 구스 (보틀)',
  'Grey Goose - bottle',
  4000000,
  '4,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  120
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dewar''s 12 Year Old - shot',
  '듀어스 12년 (샷)',
  'Dewar''s 12 Year Old - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  121
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dewar''s 12 Year Old - bottle',
  '듀어스 12년 (보틀)',
  'Dewar''s 12 Year Old - bottle',
  3000000,
  '3,000,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  122
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vededi Single Malt Distiller''s Choice - shot',
  '베데디 싱글몰트 (샷)',
  'Vededi Single Malt Distiller''s Choice - shot',
  250000,
  '250,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  123
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Vededi Single Malt Distiller''s Choice - bottle',
  '베데디 싱글몰트 (보틀)',
  'Vededi Single Malt Distiller''s Choice - bottle',
  3500000,
  '3,500,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  124
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hennessy V.S - shot',
  '헤네시 V.S (샷)',
  'Hennessy V.S - shot',
  300000,
  '300,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  125
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hennessy V.S - bottle',
  '헤네시 V.S (보틀)',
  'Hennessy V.S - bottle',
  2950000,
  '2,950,000 VND',
  'A',
  'https://drive.google.com/file/d/1kf2k8jxDNNNBWjTUb3NbDuACZDf6JF8M/view',
  '2026-10-22'::date,
  126
FROM public.businesses b
WHERE b.google_place_id = 'ChIJn8-tUACXpzER6RqdNBwIv2U'
LIMIT 1;

-- Venue: 메디테란 선셋타운 (MEDITERRAN - 그리스 & 이탈리안 레스토랑) (Grade A, place_id: ChIJoU5XY4qXpzER7IMIeP5u2_U)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mediterranean Salad with Grilled Eggplant',
  '구운 가지 지중해 샐러드',
  'Mediterranean Salad with Grilled Eggplant',
  199000,
  '199,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caprese Salad',
  '카프레제 샐러드',
  'Caprese Salad',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Baby Octopus Salad',
  '주꾸미 샐러드',
  'Baby Octopus Salad',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Burrata e Crudo',
  '부라타 에 크루도 (부라타 치즈와 생햄)',
  'Burrata e Crudo',
  279000,
  '279,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Scallop Crudo',
  '가리비 크루도 (생가리비)',
  'Scallop Crudo',
  279000,
  '279,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tris di Bruschette',
  '트리스 디 브루스케타 (브루스케타 3종)',
  'Tris di Bruschette',
  219000,
  '219,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cacciucco alla Livornese',
  '카추코 알라 리보르네세 (리보르노식 해산물 스튜)',
  'Cacciucco alla Livornese',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Minestra di Verdure',
  '미네스트라 디 베르두레 (미네스트로네 채소 수프)',
  'Minestra di Verdure',
  219000,
  '219,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  8
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Zuppa di Spinaci e Manzo',
  '주파 디 스피나치 에 만초 (시금치 소고기 수프)',
  'Zuppa di Spinaci e Manzo',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  9
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Margherita',
  '마르게리타 피자',
  'Pizza Margherita',
  219000,
  '219,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  10
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza alla Diavola',
  '디아볼라 피자 (매운 살라미)',
  'Pizza alla Diavola',
  289000,
  '메뉴판 원문 표기 ''DIAVOLLA''',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  11
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Quattro Formaggi',
  '콰트로 포르마지 피자 (4가지 치즈)',
  'Pizza Quattro Formaggi',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  12
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Prosciutto e Funghi',
  '프로슈토 에 풍기 피자 (햄과 버섯)',
  'Pizza Prosciutto e Funghi',
  289000,
  '289,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  13
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Frutti di Mare',
  '프루티 디 마레 피자 (해산물)',
  'Pizza Frutti di Mare',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  14
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Prosciutto Crudo Rucola e Parmigiano',
  '프로슈토 크루도 루콜라 파르미자노 피자',
  'Pizza Prosciutto Crudo Rucola e Parmigiano',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  15
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Pizza Smoked Salmon',
  '훈제연어 피자',
  'Pizza Smoked Salmon',
  359000,
  '359,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  16
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spicy Pizza "Phu Quoc Chicken"',
  '스파이시 ''푸꾸옥 치킨'' 피자',
  'Spicy Pizza "Phu Quoc Chicken"',
  289000,
  '289,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  17
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Burrata Pesto Pizza',
  '부라타 페스토 피자',
  'Burrata Pesto Pizza',
  359000,
  '359,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  18
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spice / Nonspice Salami',
  '살라미 (매운맛/순한맛)',
  'Spice / Nonspice Salami',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  19
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Jamón Serrano',
  '하몬 세라노',
  'Jamón Serrano',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  20
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Prosciutto Crudo o Cotto',
  '프로슈토 (생햄 또는 익힌 햄)',
  'Prosciutto Crudo o Cotto',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  21
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gorgonzola or Parmesan',
  '고르곤졸라 또는 파르메산 치즈',
  'Gorgonzola or Parmesan',
  49000,
  '49,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  22
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mushroom & Sweetcorn',
  '버섯 & 스위트콘',
  'Mushroom & Sweetcorn',
  49000,
  '49,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  23
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Risotto ai Frutti di Mare',
  '해산물 리소토',
  'Risotto ai Frutti di Mare',
  299000,
  '메뉴판 원문 표기 ''FRUITTI''',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  24
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Risotto Bianco',
  '리소토 비앙코 (화이트 리소토)',
  'Risotto Bianco',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  25
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Risotto Mushroom',
  '버섯 리소토',
  'Risotto Mushroom',
  259000,
  '259,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  26
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Tomato & Herbs',
  '토마토 허브 스파게티',
  'Spaghetti Tomato & Herbs',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  27
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti Aglio e Olio',
  '알리오 올리오 스파게티',
  'Spaghetti Aglio e Olio',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  28
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti alla Carbonara',
  '카르보나라 스파게티',
  'Spaghetti alla Carbonara',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  29
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti con Gamberetti e Zucchine',
  '새우 주키니 스파게티',
  'Spaghetti con Gamberetti e Zucchine',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  30
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti ai Frutti di Mare',
  '해산물 스파게티',
  'Spaghetti ai Frutti di Mare',
  299000,
  '299,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  31
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tagliatelle ai Quattro Formaggi',
  '4가지 치즈 탈리아텔레',
  'Tagliatelle ai Quattro Formaggi',
  299000,
  '299,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  32
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tagliatelle Prosciutto e Funghi',
  '프로슈토 버섯 탈리아텔레',
  'Tagliatelle Prosciutto e Funghi',
  299000,
  '299,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  33
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spaghetti alla Bolognese',
  '볼로네제 스파게티',
  'Spaghetti alla Bolognese',
  299000,
  '299,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  34
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Tuna Steak',
  '참치 스테이크',
  'Grilled Tuna Steak',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  35
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tonno in Crosta di Pistacchi',
  '피스타치오 크러스트 참치',
  'Tonno in Crosta di Pistacchi',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  36
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tuna Avocado Tartare',
  '참치 아보카도 타르타르',
  'Tuna Avocado Tartare',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  37
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tiramisu',
  '티라미수',
  'Tiramisu',
  149000,
  '149,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  38
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mango Mousse',
  '망고 무스',
  'Mango Mousse',
  149000,
  '149,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  39
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sbrisolona',
  '즈브리졸로나 (헤이즐넛·아몬드 크럼블 케이크)',
  'Sbrisolona',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  40
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Salad (Choriatiki Salata)',
  '그릭 샐러드 (호리아티키 살라타)',
  'Greek Salad (Choriatiki Salata)',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  41
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mediterranean Salad (Mesogeiaki Salata)',
  '지중해 샐러드 (메소기아키 살라타)',
  'Mediterranean Salad (Mesogeiaki Salata)',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  42
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Hummus Dip',
  '그릭 후무스 딥',
  'Greek Hummus Dip',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  43
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Eggplant Dip (Melitzanosalata)',
  '그릭 가지 딥 (멜리찬살라타)',
  'Greek Eggplant Dip (Melitzanosalata)',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  44
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tzatziki',
  '차지키 (요거트 오이 딥)',
  'Tzatziki',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  45
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Keftedes Greek Meatballs',
  '케프테데스 (그리스식 미트볼)',
  'Keftedes Greek Meatballs',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  46
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Deep-Fried Zucchini (Tiganita Kolokythakia)',
  '주키니 튀김 (티가니타 콜로키타키아)',
  'Crispy Deep-Fried Zucchini (Tiganita Kolokythakia)',
  199000,
  '199,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  47
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stuffed Mushrooms Feta & Fresh Herbs (Manitaria me Feta kai Freska Myrodika)',
  '페타 치즈 허브 버섯구이',
  'Stuffed Mushrooms Feta & Fresh Herbs (Manitaria me Feta kai Freska Myrodika)',
  199000,
  '199,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  48
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Souvlaki - Chicken/Pork',
  '수블라키 (닭고기/돼지고기 꼬치)',
  'Souvlaki - Chicken/Pork',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  49
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Souvlaki - Lamb',
  '수블라키 (양고기 꼬치)',
  'Souvlaki - Lamb',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  50
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gyros Plate (Piato Gyrou) - Chicken/Pork',
  '기로스 플레이트 (닭고기/돼지고기)',
  'Gyros Plate (Piato Gyrou) - Chicken/Pork',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  51
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Gyros Plate (Piato Gyrou) - Lamb',
  '기로스 플레이트 (양고기)',
  'Gyros Plate (Piato Gyrou) - Lamb',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  52
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek-Style Grilled Lamb Chops (Ellinika Psita Paidakia)',
  '그리스식 양갈비 구이',
  'Greek-Style Grilled Lamb Chops (Ellinika Psita Paidakia)',
  369000,
  '369,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  53
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Pork Sausage Plate (Piato Psiton Choriatikon Loukanikon)',
  '돼지고기 소시지 구이 플레이트',
  'Grilled Pork Sausage Plate (Piato Psiton Choriatikon Loukanikon)',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  54
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Style Beef T-Bone Black Angus',
  '그리스식 블랙앵거스 티본 스테이크',
  'Greek Style Beef T-Bone Black Angus',
  899000,
  '899,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  55
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Old-Fashioned Greek Burgers (Palies Ellinikes Mperger)',
  '옛날식 그리스 버거 (패티 플레이트)',
  'Old-Fashioned Greek Burgers (Palies Ellinikes Mperger)',
  269000,
  '269,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  56
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mussels Saganaki (Saganaki Mydia)',
  '홍합 사가나키 (토마토 페타 홍합찜)',
  'Mussels Saganaki (Saganaki Mydia)',
  279000,
  '279,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  57
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Stuffed Calamari with Feta Cheese (Gemista Kalamaria me Feta)',
  '페타 치즈 오징어순대',
  'Stuffed Calamari with Feta Cheese (Gemista Kalamaria me Feta)',
  319000,
  '319,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  58
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Shrimp Saganaki (Saganaki Garidas)',
  '새우 사가나키 (토마토 페타 새우찜)',
  'Shrimp Saganaki (Saganaki Garidas)',
  279000,
  '279,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  59
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Greek Seafood Platter (Thalassinos Diskos) - Prawn, Calamari, Baby Octopus',
  '그리스식 해산물 플래터 (새우·오징어·주꾸미)',
  'Greek Seafood Platter (Thalassinos Diskos) - Prawn, Calamari, Baby Octopus',
  289000,
  '289,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  60
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Deep-Fried Calamari (Piato Traganon Tiganiton Kalamarion)',
  '오징어 튀김',
  'Crispy Deep-Fried Calamari (Piato Traganon Tiganiton Kalamarion)',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  61
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Crispy Deep-Fried Shrimp (Piato Traganon Tiganiton Garidon)',
  '새우 튀김',
  'Crispy Deep-Fried Shrimp (Piato Traganon Tiganiton Garidon)',
  229000,
  '229,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  62
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Grilled Mango with Greek Yogurt, Honey & Almonds',
  '그릭요거트·꿀·아몬드를 곁들인 구운 망고',
  'Grilled Mango with Greek Yogurt, Honey & Almonds',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  63
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Chocolate Baklava with Coffee Syrup',
  '커피 시럽 초콜릿 바클라바',
  'Chocolate Baklava with Coffee Syrup',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  64
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Baklava Strudel with Orange Syrup',
  '오렌지 시럽 바클라바 슈트루델',
  'Baklava Strudel with Orange Syrup',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  65
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'French Fries',
  '감자튀김',
  'French Fries',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  66
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Wedges Potatoes',
  '웨지 감자',
  'Wedges Potatoes',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  67
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mixed Vegetable Salad',
  '모둠 채소 샐러드',
  'Mixed Vegetable Salad',
  169000,
  '169,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  68
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra Herb Tomato Sauce',
  '허브 토마토소스 추가',
  'Extra Herb Tomato Sauce',
  39000,
  '39,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  69
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra Pita',
  '피타빵 추가',
  'Extra Pita',
  59000,
  '59,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  70
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra Tzatziki',
  '차지키 추가',
  'Extra Tzatziki',
  59000,
  '59,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  71
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra Kalamata Olive',
  '칼라마타 올리브 추가',
  'Extra Kalamata Olive',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  72
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra Feta Cheese',
  '페타 치즈 추가',
  'Extra Feta Cheese',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  73
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Espresso',
  '에스프레소',
  'Espresso',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  74
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Americano',
  '아메리카노',
  'Americano',
  79000,
  '79,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  75
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cappuccino',
  '카푸치노',
  'Cappuccino',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  76
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cafe Latte',
  '카페라테',
  'Cafe Latte',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  77
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Matcha Latte',
  '말차 라테',
  'Matcha Latte',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  78
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot Chocolate',
  '핫초콜릿',
  'Hot Chocolate',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  79
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot / Iced Tea (Green Jasmine, Oolong, Black Tea) - cup',
  '따뜻한/아이스 차 (재스민 녹차·우롱차·홍차) 한 잔',
  'Hot / Iced Tea (Green Jasmine, Oolong, Black Tea) - cup',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  80
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hot / Iced Tea (Green Jasmine, Oolong, Black Tea) - teapot',
  '따뜻한/아이스 차 (재스민 녹차·우롱차·홍차) 포트',
  'Hot / Iced Tea (Green Jasmine, Oolong, Black Tea) - teapot',
  119000,
  '119,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  81
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Peach Chiller',
  '피치 칠러',
  'Peach Chiller',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  82
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Ginger Lemongrass',
  '진저 레몬그라스',
  'Ginger Lemongrass',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  83
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Extra: Malibu (rum 21%) 30ml / Baileys (17%) 30ml',
  '추가: 말리부(럼 21%) 30ml / 베일리스(17%) 30ml',
  'Extra: Malibu (rum 21%) 30ml / Baileys (17%) 30ml',
  59000,
  '59,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  84
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Spicy Celery',
  '스파이시 셀러리',
  'Spicy Celery',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  85
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Refreshing Red',
  '리프레싱 레드',
  'Refreshing Red',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  86
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Sunshine',
  '선샤인',
  'Sunshine',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  87
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Orange Sunshine',
  '오렌지 선샤인',
  'Orange Sunshine',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  88
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Fresh Juice single selection (Watermelon, Beetroot, Carrot, Passion Fruit, Orange, Lemon, Green Apple, Pineapple)',
  '단일 생과일 주스 (수박·비트·당근·패션프루트·오렌지·레몬·청사과·파인애플 중 택1)',
  'Fresh Juice single selection (Watermelon, Beetroot, Carrot, Passion Fruit, Orange, Lemon, Green Apple, Pineapple)',
  79000,
  '79,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  89
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Banana Mango & Cinnamon',
  '바나나 망고 시나몬',
  'Banana Mango & Cinnamon',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  90
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Lime Mexico',
  '라임 멕시코',
  'Lime Mexico',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  91
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mango & Passion',
  '망고 & 패션프루트',
  'Mango & Passion',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  92
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Banana Chocolate',
  '바나나 초콜릿',
  'Banana Chocolate',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  93
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Smoothie single selection (Mango, Banana, Passion Fruit, Orange, Lemon, Pineapple)',
  '단일 스무디 (망고·바나나·패션프루트·오렌지·레몬·파인애플 중 택1)',
  'Smoothie single selection (Mango, Banana, Passion Fruit, Orange, Lemon, Pineapple)',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  94
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Saigon Special Green',
  '사이공 스페셜 (녹색)',
  'Saigon Special Green',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  95
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Saigon Export Red',
  '사이공 엑스포트 (빨간색)',
  'Saigon Export Red',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  96
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bivina',
  '비비나 맥주',
  'Bivina',
  59000,
  '59,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  97
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Corona Extra',
  '코로나 엑스트라',
  'Corona Extra',
  109000,
  '109,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  98
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Apple Cider',
  '애플 사이다(사과 발효주)',
  'Apple Cider',
  99000,
  '99,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  99
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'San Pellegrino Sparkling 500ml',
  '산펠레그리노 탄산수 500ml',
  'San Pellegrino Sparkling 500ml',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  100
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'San Pellegrino Sparkling 750ml',
  '산펠레그리노 탄산수 750ml',
  'San Pellegrino Sparkling 750ml',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  101
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Acqua Panna Natural Water 500ml',
  '아쿠아 파나 생수 500ml',
  'Acqua Panna Natural Water 500ml',
  69000,
  '69,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  102
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Acqua Panna Natural Water 750ml',
  '아쿠아 파나 생수 750ml',
  'Acqua Panna Natural Water 750ml',
  89000,
  '89,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  103
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Schweppes (Tonic / Ginger Ale / Soda Water)',
  '슈웹스 (토닉/진저에일/소다수)',
  'Schweppes (Tonic / Ginger Ale / Soda Water)',
  59000,
  '59,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  104
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Red Bull',
  '레드불',
  'Red Bull',
  49000,
  '49,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  105
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Coke / Pepsi / Coke Zero / Pepsi Zero Lime / 7Up / Sprite / Fanta',
  '콜라·펩시·제로콜라·펩시 제로 라임·세븐업·스프라이트·환타',
  'Coke / Pepsi / Coke Zero / Pepsi Zero Lime / 7Up / Sprite / Fanta',
  49000,
  '49,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  106
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mojito',
  '모히토',
  'Mojito',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  107
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Negroni',
  '네그로니',
  'Negroni',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  108
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Caipirinha',
  '카이피리냐',
  'Caipirinha',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  109
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Black/White Russian',
  '블랙/화이트 러시안',
  'Black/White Russian',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  110
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Long Island Iced Tea',
  '롱아일랜드 아이스티',
  'Long Island Iced Tea',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  111
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Piña Colada',
  '피냐 콜라다',
  'Piña Colada',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  112
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Whisky Sour',
  '위스키 사워',
  'Whisky Sour',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  113
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Tequila Sunrise',
  '데킬라 선라이즈',
  'Tequila Sunrise',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  114
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Daiquiri',
  '다이키리',
  'Daiquiri',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  115
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Dry Martini',
  '드라이 마티니',
  'Dry Martini',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  116
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Margarita',
  '마르가리타',
  'Margarita',
  189000,
  '189,000 VND',
  'A',
  'Ti Amo Pizza 이탈리안 메뉴판 이미지 (menu-pages/italian/page-03~13); Dinos Greek Taverna 그리스 메뉴판 이미지 (menu-pages/greek/page-03~11); 음료 메뉴판 이미지 (menu-pages/drinks/page-01~04)',
  '2026-10-22'::date,
  117
FROM public.businesses b
WHERE b.google_place_id = 'ChIJoU5XY4qXpzER7IMIeP5u2_U'
LIMIT 1;

-- Venue: Times Corner Luxe - Pizza, Pasta & Grill (Grade C, place_id: ChIJp_0sEWaXpzER2D9WqJ-NxEI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Neapolitan Artisan Pizza',
  '나폴리탄 정통 화덕 피자',
  'Neapolitan Artisan Pizza',
  220000,
  '220,000 ~ 380,000 VND',
  'C',
  '타임스 코너 푸꾸옥 럭스(Luxe) 공식 다이닝 페이지 (화덕피자, 파스타, 그릴); 타임스 코너 호텔 선셋타운 다이닝 가격대 및 인터내셔널 조식 뷔페 정보',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJp_0sEWaXpzER2D9WqJ-NxEI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Handmade Gourmet Pasta',
  '수제 생면 고메 파스타 (해산물, 크림, 토마토)',
  'Handmade Gourmet Pasta',
  180000,
  '180,000 ~ 320,000 VND',
  'C',
  '타임스 코너 푸꾸옥 럭스(Luxe) 공식 다이닝 페이지 (화덕피자, 파스타, 그릴); 타임스 코너 호텔 선셋타운 다이닝 가격대 및 인터내셔널 조식 뷔페 정보',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJp_0sEWaXpzER2D9WqJ-NxEI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Charcoal Grilled Steaks & Seafood',
  '참숯 그릴 비프 스테이크 및 해산물 플래터',
  'Charcoal Grilled Steaks & Seafood',
  450000,
  '450,000 ~ 890,000 VND',
  'C',
  '타임스 코너 푸꾸옥 럭스(Luxe) 공식 다이닝 페이지 (화덕피자, 파스타, 그릴); 타임스 코너 호텔 선셋타운 다이닝 가격대 및 인터내셔널 조식 뷔페 정보',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJp_0sEWaXpzER2D9WqJ-NxEI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'International Breakfast Buffet',
  '인터내셔널 조식 뷔페 (호텔 투숙객 및 방문객)',
  'International Breakfast Buffet',
  200000,
  '약 200,000 ~ 300,000 VND (단품 주문 시 70,000~90,000 VND)',
  'C',
  '타임스 코너 푸꾸옥 럭스(Luxe) 공식 다이닝 페이지 (화덕피자, 파스타, 그릴); 타임스 코너 호텔 선셋타운 다이닝 가격대 및 인터내셔널 조식 뷔페 정보',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJp_0sEWaXpzER2D9WqJ-NxEI'
LIMIT 1;

-- Venue: Yushima Japanese Restaurant (Grade B, place_id: ChIJqSNX-FuLpzERVHIK_K9q4ac)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá thu Nhật nướng muối / sốt Teriyaki (Grilled Saba Mackerel)',
  '고등어 소금구이 / 데리야키 구이',
  'Cá thu Nhật nướng muối / sốt Teriyaki (Grilled Saba Mackerel)',
  280000,
  '280,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá trích nướng Shishamo (Grilled Shishamo)',
  '열빙어(시샤모) 숯불구이',
  'Cá trích nướng Shishamo (Grilled Shishamo)',
  200000,
  '200,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cá hồi nướng sốt Teriyaki (Grilled Salmon Teriyaki)',
  '연어 데리야키 숯불구이',
  'Cá hồi nướng sốt Teriyaki (Grilled Salmon Teriyaki)',
  350000,
  '350,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Hàu sữa Nhật tươi sống (Fresh Japanese Oysters)',
  '일본산 신선 생석화 (생굴 플레이트)',
  'Hàu sữa Nhật tươi sống (Fresh Japanese Oysters)',
  240000,
  '240,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Mì Ramen hải sản Yushima (Seafood Ramen)',
  '유시마 특제 해산물 라멘',
  'Mì Ramen hải sản Yushima (Seafood Ramen)',
  180000,
  '180,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cơm lươn Nhật nướng sốt Kabayaki (Unagi Don)',
  '일본산 민물장어 덮밥 (우나기동)',
  'Cơm lươn Nhật nướng sốt Kabayaki (Unagi Don)',
  380000,
  '380,000 VND',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Thuyền Sashimi tổng hợp (Mixed Sashimi Boat)',
  '모둠 사시미 셰어링 보트',
  'Thuyền Sashimi tổng hợp (Mixed Sashimi Boat)',
  NULL,
  '어종 구성에 따른 당일 싯가',
  'B',
  '선셋타운 프리마베라 FB3-04B 유시마 일식당 온라인 메뉴판; 생선 숯불구이(18만~35만동), 석화(24만동), 단품 일식 정가 내역',
  '2026-08-01'::date,
  7
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqSNX-FuLpzERVHIK_K9q4ac'
LIMIT 1;

-- Venue: 투안 끼에우 2 해산물 그릴 전문점 (Nhà hàng hải sản Thuận Kiều 2) (Grade C, place_id: ChIJqWMc3JqXpzER9imqzVVuH00)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Ghẹ Hàm Ninh hấp bia / luộc (Ham Ninh Flower Crab)',
  '푸꾸옥 함닌 자연산 꽃게 찜 (맥주 찜)',
  'Ghẹ Hàm Ninh hấp bia / luộc (Ham Ninh Flower Crab)',
  NULL,
  'kg당 당일 싯가 (Market Price by kg)',
  'C',
  '투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점); 투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqWMc3JqXpzER9imqzVVuH00'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mực trứng hấp gừng / chiên nước mắm',
  '알배기 오징어 생강 찜 / 피시소스 튀김',
  'Mực trứng hấp gừng / chiên nước mắm',
  150000,
  '150,000 ~ 250,000 VND',
  'C',
  '투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점); 투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqWMc3JqXpzER9imqzVVuH00'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Ngao / Sò điệp nướng mỡ hành (Grilled Clams with Scallion)',
  '가리비 및 조개 파기름 땅콩 숯불구이',
  'Ngao / Sò điệp nướng mỡ hành (Grilled Clams with Scallion)',
  80000,
  '80,000 ~ 150,000 VND',
  'C',
  '투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점); 투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqWMc3JqXpzER9imqzVVuH00'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu hải sản chua cay Thuận Kiều (Seafood Hotpot)',
  '투안 끼에우 특제 해산물 매콤새콤 핫팟 전골',
  'Lẩu hải sản chua cay Thuận Kiều (Seafood Hotpot)',
  300000,
  '300,000 ~ 600,000 VND',
  'C',
  '투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점); 투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqWMc3JqXpzER9imqzVVuH00'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Tôm hùm bông nướng phô mai (Grilled Lobster with Cheese)',
  '자연산 닭새우 랍스터 모차렐라 치즈 구이',
  'Tôm hùm bông nướng phô mai (Grilled Lobster with Cheese)',
  NULL,
  'kg당 당일 싯가 (Market Price)',
  'C',
  '투안 끼에우 해산물 공식 웹사이트 (함닌 본점 및 안터이 대대로 2호점); 투안 끼에우 실측 다이닝 가격대 (해산물 단품 8만~25만동, 전골 30만~60만동)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqWMc3JqXpzER9imqzVVuH00'
LIMIT 1;

-- Venue: Milano Coffee - 64 Milan Sunset Town (Grade C, place_id: ChIJqzR5BqKVpzERsUFb1ZBTkHI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJqzR5BqKVpzERsUFb1ZBTkHI',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqzR5BqKVpzERsUFb1ZBTkHI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJqzR5BqKVpzERsUFb1ZBTkHI',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqzR5BqKVpzERsUFb1ZBTkHI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJqzR5BqKVpzERsUFb1ZBTkHI',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJqzR5BqKVpzERsUFb1ZBTkHI'
LIMIT 1;

-- Venue: Hải Sản Hàm Ninh (Grade C, place_id: ChIJr-c8ZACVpzER41yqzYEUGAE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Ghẹ Hàm Ninh hấp (Steamed Ham Ninh Crab)',
  '함닌 자연산 꽃게 찜',
  'Ghẹ Hàm Ninh hấp (Steamed Ham Ninh Crab)',
  NULL,
  'kg당 당일 싯가 (Market Price)',
  'C',
  'https://www.facebook.com/haisanhamninhphuquoc/',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJr-c8ZACVpzER41yqzYEUGAE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mực trứng nướng sa tế',
  '알배기 오징어 사테 구이',
  'Mực trứng nướng sa tế',
  120000,
  '120,000 ~ 200,000 VND',
  'C',
  'https://www.facebook.com/haisanhamninhphuquoc/',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJr-c8ZACVpzER41yqzYEUGAE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Ngao 2 còi hấp sả',
  '대형 가리비/조개 레몬그라스 찜',
  'Ngao 2 còi hấp sả',
  100000,
  '100,000 ~ 180,000 VND',
  'C',
  'https://www.facebook.com/haisanhamninhphuquoc/',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJr-c8ZACVpzER41yqzYEUGAE'
LIMIT 1;

-- Venue: Cơm Gia Đình Việt - Tây Hồ Restaurant (Grade C, place_id: ChIJsx0UrT6LpzERcrAcAZp0Ea4)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cơm gia đình Hà Nội (Hanoi Family Set)',
  '하노이식 가정식 백반 세트',
  'Cơm gia đình Hà Nội (Hanoi Family Set)',
  80000,
  '80,000 ~ 140,000 VND / 1인',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJsx0UrT6LpzERcrAcAZp0Ea4',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJsx0UrT6LpzERcrAcAZp0Ea4'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Thịt kho tàu & Canh chua',
  '돼지고기 장조림 및 새콤한 생선국',
  'Thịt kho tàu & Canh chua',
  70000,
  '70,000 ~ 120,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJsx0UrT6LpzERcrAcAZp0Ea4',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJsx0UrT6LpzERcrAcAZp0Ea4'
LIMIT 1;

-- Venue: 블루 테이블 (Blue Table - 이탈리안 레스토랑) (Grade C, place_id: ChIJt4niIACVpzERsZinQbNSOvs)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Neapolitan Wood-fired Pizza',
  '화덕 나폴리 피자 (마르게리타, 콰트로 포르마지 등)',
  'Neapolitan Wood-fired Pizza',
  220000,
  '220,000 ~ 380,000 VND',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Handmade Pasta & Risotto',
  '수제 생면 파스타 및 해산물 리소토',
  'Handmade Pasta & Risotto',
  180000,
  '180,000 ~ 320,000 VND',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Grilled Scallops with Lime Butter',
  '라임 버터 관자 구이 에피타이저',
  'Grilled Scallops with Lime Butter',
  190000,
  '190,000 ~ 280,000 VND',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Octopus Carpaccio',
  '푸꾸옥 문어 카르파초',
  'Octopus Carpaccio',
  180000,
  '180,000 ~ 250,000 VND',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Premium Beef Steak',
  '프리미엄 비프 스테이크',
  'Premium Beef Steak',
  450000,
  '450,000 ~ 850,000 VND',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Romantic Sunset 2-Person Set Menu',
  '로맨틱 선셋 2인 세트 패키지 (샐러드+스테이크+파스타/리소토+음료)',
  'Romantic Sunset 2-Person Set Menu',
  850000,
  '850,000 ~ 950,000 VND (Klook/트립닷컴 바우처)',
  'C',
  'BLUE TABLE 공식 인스타그램 계정 (선셋타운 아말피 136); 클룩(Klook) & 트립닷컴 BLUE TABLE 2인 다이닝 세트 패키지 바우처 (약 85만~95만 동, 34~37 USD)',
  '2026-10-25'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJt4niIACVpzERsZinQbNSOvs'
LIMIT 1;

-- Venue: Quán Nhậu Bình Dân HOÀNG HÔN ( Hoàng Hôn Quán ) (Grade C, place_id: ChIJufI0FqCVpzER1FiJropT03Y)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Mực trứng chiên mắm / nướng',
  '알배기 오징어 튀김 / 구이',
  'Mực trứng chiên mắm / nướng',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  'https://www.facebook.com/hoanghonquanphuquoc/',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJufI0FqCVpzER1FiJropT03Y'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Lẩu hải sản chua cay bình dân',
  '실속형 해산물 전골 핫팟',
  'Lẩu hải sản chua cay bình dân',
  200000,
  '200,000 ~ 300,000 VND',
  'C',
  'https://www.facebook.com/hoanghonquanphuquoc/',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJufI0FqCVpzER1FiJropT03Y'
LIMIT 1;

-- Venue: Loop Jacuzzi Bar (Grade C, place_id: ChIJw0KgNACVpzERw5KrYRFhYrk)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Signature Tropical Sunset Cocktail',
  '선셋 시그니처 트로피컬 칵테일',
  'Signature Tropical Sunset Cocktail',
  120000,
  '120,000 ~ 220,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJw0KgNACVpzERw5KrYRFhYrk',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJw0KgNACVpzERw5KrYRFhYrk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  '생맥주 / 수제맥주 (Draft / Craft Beer)',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  65000,
  '65,000 ~ 130,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJw0KgNACVpzERw5KrYRFhYrk',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJw0KgNACVpzERw5KrYRFhYrk'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bar Bites & Finger Foods',
  '바 스낵 & 핑거푸드 안주',
  'Bar Bites & Finger Foods',
  90000,
  '90,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJw0KgNACVpzERw5KrYRFhYrk',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJw0KgNACVpzERw5KrYRFhYrk'
LIMIT 1;

-- Venue: 웨이브 카페 & 펍 3F (Wave Cafe & Pub - 웨이브스파 3층) (Grade B, place_id: ChIJwXlCOq-VpzERR7dMoAKRcpM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cà Phê Cốt Dừa Wave (Wave Coconut Coffee)',
  '웨이브 코코넛 커피 스무디',
  'Cà Phê Cốt Dừa Wave (Wave Coconut Coffee)',
  75000,
  '75,000 VND',
  'B',
  '웨이브 스파 3F 카페&펍 메뉴 실측',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJwXlCOq-VpzERR7dMoAKRcpM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Nước Ép Dưa Hấu / Chanh Dây (Fresh Watermelon / Passion Fruit Juice)',
  '생과일 주스 (수박 / 패션후르츠)',
  'Nước Ép Dưa Hấu / Chanh Dây (Fresh Watermelon / Passion Fruit Juice)',
  65000,
  '65,000 VND',
  'B',
  '웨이브 스파 3F 카페&펍 메뉴 실측',
  '2026-10-01'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJwXlCOq-VpzERR7dMoAKRcpM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Bia Tươi Sunset (Draft Beer Sunset)',
  '선셋 생맥주 (타이거 / 하이네켄)',
  'Bia Tươi Sunset (Draft Beer Sunset)',
  65000,
  '65,000 VND',
  'B',
  '웨이브 스파 3F 카페&펍 메뉴 실측',
  '2026-10-01'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJwXlCOq-VpzERR7dMoAKRcpM'
LIMIT 1;

-- Venue: Mango Mango (Grade C, place_id: ChIJxyS9aICXpzERzjprHrHS6HM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Signature Tropical Sunset Cocktail',
  '선셋 시그니처 트로피컬 칵테일',
  'Signature Tropical Sunset Cocktail',
  120000,
  '120,000 ~ 220,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJxyS9aICXpzERzjprHrHS6HM',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJxyS9aICXpzERzjprHrHS6HM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  '생맥주 / 수제맥주 (Draft / Craft Beer)',
  'Bia Tươi / Bia Thủ Công Craft Beer',
  65000,
  '65,000 ~ 130,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJxyS9aICXpzERzjprHrHS6HM',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJxyS9aICXpzERzjprHrHS6HM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bar Bites & Finger Foods',
  '바 스낵 & 핑거푸드 안주',
  'Bar Bites & Finger Foods',
  90000,
  '90,000 ~ 180,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJxyS9aICXpzERzjprHrHS6HM',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJxyS9aICXpzERzjprHrHS6HM'
LIMIT 1;

-- Venue: IBIZA - Oyster & Seafood Bar (Grade C, place_id: ChIJyRBqwHeVpzERduOQZkmhLAE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Fresh & Baked Oysters Selection',
  '신선 생석화 및 치즈 구이 굴 플래터',
  'Fresh & Baked Oysters Selection',
  150000,
  '150,000 ~ 280,000 VND',
  'C',
  'https://restaurantsphuquoc.com/ibiza-sunset-town',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJyRBqwHeVpzERduOQZkmhLAE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Seafood Tapas & Sparkling Wine',
  '해산물 타파스와 스파클링 와인',
  'Seafood Tapas & Sparkling Wine',
  200000,
  '200,000 ~ 450,000 VND',
  'C',
  'https://restaurantsphuquoc.com/ibiza-sunset-town',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJyRBqwHeVpzERduOQZkmhLAE'
LIMIT 1;

-- Venue: Phu Quoc Sunset Town Coffee Workshop - Brew & Design the Art of Vietnamese Coffee (Grade C, place_id: ChIJy_hxHgCrNTERoIcGv_opdSI)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJy_hxHgCrNTERoIcGv_opdSI',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJy_hxHgCrNTERoIcGv_opdSI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJy_hxHgCrNTERoIcGv_opdSI',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJy_hxHgCrNTERoIcGv_opdSI'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJy_hxHgCrNTERoIcGv_opdSI',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJy_hxHgCrNTERoIcGv_opdSI'
LIMIT 1;

-- Venue: Tsunagari Phu Quoc - Japanese matcha in the island (Grade C, place_id: ChIJybaGwLWXpzER0vqLL6QiWjE)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  '베트남 연유 커피(쓰어다) / 코코넛 커피',
  'Cà phê Phin Sữa Đá / Cốt Dừa',
  45000,
  '45,000 ~ 75,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJybaGwLWXpzER0vqLL6QiWjE',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJybaGwLWXpzER0vqLL6QiWjE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cà phê Americano / Espresso',
  '아메리카노 / 에스프레소',
  'Cà phê Americano / Espresso',
  45000,
  '45,000 ~ 65,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJybaGwLWXpzER0vqLL6QiWjE',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJybaGwLWXpzER0vqLL6QiWjE'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  '망고 스무디 / 생과일 주스',
  'Sinh tố Xoài / Trái cây nhiệt đới',
  55000,
  '55,000 ~ 85,000 VND',
  'C',
  'https://www.google.com/maps/place/?q=place_id:ChIJybaGwLWXpzER0vqLL6QiWjE',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJybaGwLWXpzER0vqLL6QiWjE'
LIMIT 1;

-- Venue: 껌니우 비엣 선셋타운 (Nhà hàng Cơm Niêu Việt - 베트남 돌솥밥) (Grade C, place_id: ChIJzUpxDmWXpzER9_x5dGSKcdM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cơm Niêu đập truyền thống',
  '베트남 전통 도자기 돌솥밥 (누룽지 밥)',
  'Cơm Niêu đập truyền thống',
  35000,
  '35,000 ~ 50,000 VND / 솥',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Cá kho tộ đất sét (Claypot Caramelized Fish)',
  '옹기 뚝배기 메콩 생선 조림',
  'Cá kho tộ đất sét (Claypot Caramelized Fish)',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  2
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Canh cua rau đay (Crab & Jute Leaf Soup)',
  '민물 게살과 말라바 시금치 맑은 국',
  'Canh cua rau đay (Crab & Jute Leaf Soup)',
  90000,
  '90,000 ~ 140,000 VND',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  3
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Thịt kho tàu nước dừa (Braised Pork Belly with Eggs)',
  '코코넛 워터에 조려낸 삼겹살 달걀 장조림',
  'Thịt kho tàu nước dừa (Braised Pork Belly with Eggs)',
  120000,
  '120,000 ~ 180,000 VND',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  4
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Bò xào bông thiên lý (Stir-fried Beef with Tonkin Jasmine)',
  '천리향 야생꽃 소고기 볶음',
  'Bò xào bông thiên lý (Stir-fried Beef with Tonkin Jasmine)',
  180000,
  '180,000 ~ 270,000 VND',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  5
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '대표 메뉴 / 추천',
  'Set Cơm Niêu Gia Đình (Family Set Menu)',
  '가족 4인 정식 세트 (돌솥밥+생선조림+삼겹살조림+모닝글로리+국)',
  'Set Cơm Niêu Gia Đình (Family Set Menu)',
  350000,
  '350,000 ~ 450,000 VND / 1인',
  'C',
  '그린 트리(Green Tree) 그룹 껌니우 비엣 공식 사이트 (선셋타운 지점); 껌니우 비엣 정규 뚝배기 돌솥밥 및 가정식 요리 가격대 (단품 10만~30만동, 세트 35만~45만동)',
  '2026-10-25'::date,
  6
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzUpxDmWXpzER9_x5dGSKcdM'
LIMIT 1;

-- Venue: 씨엘로 루프탑 바 (Cielo Rooftop Bar - La Festa Hilton) (Grade B, place_id: ChIJzXtAVDKXpzER1cjjYNLZETM)
INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  '메뉴',
  'Cielo Kiss of the Sea Cocktail',
  '씨엘로 키스 오브 더 씨 칵테일',
  'Cielo Kiss of the Sea Cocktail',
  290000,
  '290,000 VND',
  'B',
  '라 페스타 힐튼 씨엘로 루프탑 바 메뉴',
  '2026-10-01'::date,
  1
FROM public.businesses b
WHERE b.google_place_id = 'ChIJzXtAVDKXpzER1cjjYNLZETM'
LIMIT 1;

COMMIT;
