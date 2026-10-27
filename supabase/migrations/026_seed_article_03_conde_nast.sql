-- 026_seed_article_03_conde_nast.sql
-- Ryan 승인 완료된 3편(컨데나스트 1위 및 선셋타운 남부 코스) 발행 시드 SQL
BEGIN;

INSERT INTO public.stories (
  slug,
  title,
  title_ko,
  category,
  content_type,
  status,
  is_featured,
  published_at,
  cover_image_url,
  hero_caption,
  hero_caption_ko,
  excerpt,
  excerpt_ko,
  seo_title,
  seo_title_ko,
  seo_description,
  seo_description_ko,
  body_en,
  body_ko
) VALUES (
  'conde-nast-top-island-sunset-town-course',
  'Condé Nast Traveler Names Phu Quoc Top Island in Asia — Sunset Town South Island Itinerary',
  '미 컨데나스트 트래블러 아시아 최고 섬 1위 푸꾸옥 — 선셋타운 남부 여행 코스',
  'Travel Guide',
  'guide',
  'published',
  TRUE,
  '2026-10-27T08:00:00+07:00',
  '/stock/phu-quoc-sunset-town-asia-top-island-cover.webp',
  'AI-generated illustration: Mediterranean-style streets and Kiss Bridge in Sunset Town, South Phu Quoc',
  'AI-generated illustration: 푸꾸옥 남부 선셋타운의 지중해풍 거리와 키스브릿지 일러스트',
  'Celebrating Phu Quoc''s recognition as the #1 Top Island in Asia (95.26 points) by Condé Nast Traveler, here is a curated 1-day South Island itinerary featuring Sunset Town, Kiss Bridge, and the cable car.',
  '미국 여행지 컨데나스트 트래블러에서 2026년 아시아 최고 섬 1위(95.26점)로 선정된 푸꾸옥의 소식과 함께, 기사에 소개된 선셋타운, 키스브릿지, 케이블카를 엮은 남부 1일 추천 제안 코스를 안내합니다.',
  'Condé Nast Traveler Names Phu Quoc Top Island in Asia — Sunset Town Itinerary',
  '미 컨데나스트 트래블러 아시아 최고 섬 1위 푸꾸옥 — 선셋타운 남부 여행 코스',
  'Celebrating Phu Quoc''s recognition as the #1 Top Island in Asia (95.26 points) by Condé Nast Traveler, here is a curated 1-day South Island itinerary featuring Sunset Town, Kiss Bridge, and the cable car.',
  '미국 여행지 컨데나스트 트래블러에서 2026년 아시아 최고 섬 1위(95.26점)로 선정된 푸꾸옥의 소식과 함께, 기사에 소개된 선셋타운, 키스브릿지, 케이블카를 엮은 남부 1일 추천 제안 코스를 안내합니다.',
  '## 1. Phu Quoc Named #1 Top Island in Asia by Condé Nast Traveler 2026

Vietnam’s Phu Quoc island has earned first place in the "Top Island in Asia" category in the 2026 Readers'' Choice Awards by the globally recognized US travel publication, **Condé Nast Traveler (US)**.

According to major Vietnamese news media (Vietnam News on 2026-10-08, VnExpress on 2026-10-08, and VTV on 2026-10-09), Phu Quoc achieved an outstanding score of **95.26 out of 100**, securing the top ranking in Asia.

*(Note: The award was announced on October 6 according to the VnExpress report.)*

Vietnam News also reported that this #1 ranking reflects the US edition (Condé Nast Traveler US). In the UK edition (Condé Nast Traveller UK) readers'' survey, Phu Quoc ranked 2nd in Asia with 98.26 points (with Palawan, Philippines taking 1st place).

Among local media, Vietnam News highlighted Phu Quoc''s natural beaches alongside South Island attractions: the sea-crossing cable car, sunset strolls at [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge), evening arts and culture at [Sunset Town](https://myphuquoc.net/business/sunset-place-10), and nightly fireworks displays. (VnExpress and VTV coverage highlighted the island’s key tourism infrastructure, including the sea-crossing cable car).

---

## 2. South Island 1-Day Itinerary (Suggested Itinerary)

The specific hours and stay durations listed in the table below (approx. 8–10 hours for the full course, 4–5 hours for a half-day visit) represent a **suggested itinerary created by the My Phu Quoc editorial team** to help travelers plan their visit. Please adjust your schedule flexibly based on operating timetables and on-site conditions.

| Time | Schedule | Key Visit Points |
|---|---|---|
| 09:30 Departure ~ 13:00 | Cable Car & Hon Thom Nature Park | Ride the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) (*operating schedule unverified; check official on-site timetable beforehand*) and explore Aquatopia Water Park |
| 13:30 ~ 16:30 | Return to Sunset Town & Alley Walk | Stroll along pastel-toned hillside alleys and relax at [Starbucks Beach House](https://myphuquoc.net/business/starbucks-beach-house-sun-primavera) |
| 17:00 ~ 18:30 | Kiss Bridge Sunset Stroll & Golden Hour | Watch the ocean sunset from [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) |
| 18:30 ~ 20:30 | Dinner at VUI-Fest Seaside Night Market | Savor local seafood and street bites at [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) |
| 21:00 ~ 21:40 | Night Ocean Performance & Fireworks | Watch [Kiss of the Sea](https://myphuquoc.net/business/sunset-place-10) or view the fireworks from the outdoor terrace at [Sun Bavaria Gastropub](https://myphuquoc.net/business/sun-bavaria-gastropub) |

---

## 3. Top 3 Landmarks of Sunset Town

### ① Kiss Bridge (Cầu Hôn)
[Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) is an iconic pedestrian bridge stretching out over the sea, featuring two spans that face each other with a 30cm gap. (*The 30cm facing distance is as stated on the My Phu Quoc kiss-bridge facility information page.*) It offers an unobstructed vantage point for enjoying the sunset.

### ② VUI-Fest Bazaar Night Market
[VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) is a modern seaside night market arranged along the waterfront promenade, where visitors can enjoy sea breezes, sample local street snacks, and shop for souvenirs.

### ③ Sun World Hon Thom Cable Car
Departing from An Thoi station and crossing the open sea to Hon Thom island, the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) provides panoramic aerial views of turquoise waters and southern island fishing villages. (*Exact operating hours are subject to seasonal adjustments; please verify on-site.*)

---

## 4. Practical Travel Tips

1. **Accommodation**: Staying in central Sunset Town allows convenient walking access to major attractions. Consider [La Festa Phu Quoc, Curio Collection by Hilton](https://myphuquoc.net/business/sunset-place-7) for a luxury stay, or boutique hotels within Sunset Town for great views and value.
2. **Getting Around**: Take advantage of the [complimentary electric buggy service](https://myphuquoc.net/business/sun-group-sunset-town-electric-buggy-service) to navigate Sunset Town’s hilly terrain effortlessly.
3. **Check Schedules**: Night shows and cable car operations may adjust according to local weather or weekly policies (Kiss of the Sea may be closed on Tuesdays). Be sure to check the [My Phu Quoc Events board](https://myphuquoc.net/events) or on-site notices on the day of your visit.

---

## 5. Frequently Asked Questions (FAQ)

### Q1. How much time is needed to explore Sunset Town?
This is a suggested itinerary by our editorial team: allowing half a day or more (approx. 8–10 hours) from daytime through the evening is recommended for the full course including the cable car and night show. For a relaxed stroll, sunset viewing, and dinner, arriving around 16:00 for a 4–5 hour visit is ideal.

### Q2. How does VUI-Fest Bazaar differ from Duong Dong Night Market?
While Duong Dong Night Market in central Phu Quoc offers a traditional and bustling local market experience, the southern [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) offers a contemporary, neatly organized promenade setting with street entertainment and seaside views.

### Q3. What is Phu Quoc''s weather like during the dry season (November to April)?
The dry season beginning in November brings minimal rainfall, clear skies, and calm seas, marking Phu Quoc''s peak travel season. It provides optimal conditions for comfortable sunset viewing and outdoor sightseeing.

---

## Sources

- Vietnam News (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html
- VnExpress (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html
- VTV (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm',
  '## 1. 푸꾸옥, 미 컨데나스트 트래블러 ''2026년 아시아 최고 섬'' 1위 선정

베트남 푸꾸옥이 세계적으로 권위 있는 미국 여행 전문지 컨데나스트 트래블러(Condé Nast Traveler US)의 ''리더스 초이스 어워드 2026(Readers'' Choice Awards 2026)'' 독자 투표에서 ''2026년 아시아 최고 섬(Top Island in Asia)'' 부문 1위에 올랐습니다.

베트남 주요 언론(Vietnam News 2026-10-08 보도, VnExpress 2026-10-08 보도, VTV 2026-10-09 보도)에 따르면, 푸꾸옥은 100점 만점에 95.26점의 높은 평점을 기록하며 아시아 최고 섬 1위로 선정되었습니다.

(※ 주최 측의 본상 발표일은 10월 6일(VnExpress 보도 기준)입니다.)

또한 Vietnam News는 이번 1위 결과가 미국판(Condé Nast Traveler US) 기준이며, 같은 매체의 영국판(Condé Nast Traveller UK) 독자 투표에서는 푸꾸옥이 98.26점으로 아시아 2위(1위 필리핀 팔라완)를 차지했다고 함께 전했습니다.

현지 언론 가운데 Vietnam News는 푸꾸옥의 자연 해변과 함께 남부의 주요 볼거리로 해상 케이블카, 일몰 산책로인 키스 브릿지(Kiss Bridge), 저녁 문화예술 공간인 선셋타운(Sunset Town), 야간 불꽃놀이 등을 여행자들에게 소개하고 있습니다. (VnExpress와 VTV 보도에서는 해상 케이블카를 비롯한 섬의 주요 관광 인프라를 언급하였습니다.)

## 2. 선셋타운 남부 1일 여행 코스 (추천 제안 코스)

아래 표에 기재된 세부 시간대와 체류 시간(풀코스 약 8~10시간, 반일 코스 약 4~5시간)은 여행자의 일정 계획을 돕기 위해 마이푸꾸옥 편집팀이 구성한 추천 제안 동선입니다. 시설별 실제 운영 시간표와 현장 상황에 따라 일정을 유동적으로 조정하시기 바랍니다.

| 시간대 | 일정 | 방문 포인트 |
|---|---|---|
| 09:30 탑승 ~ 13:00 | 해상 케이블카 탑승 & 혼똔섬 자연공원 | [선월드 혼똔섬 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) 탑승 (※ 운행 시간 미확인, 현장 시간표 사전 확인 필요) 및 아쿠아토피아 워터파크 둘러보기 |
| 13:30 ~ 16:30 | 선셋타운 복귀 & 지중해풍 골목 산책 | 파스텔톤 언덕길 골목, [스타벅스 비치 하우스](https://myphuquoc.net/ko/business/starbucks-beach-house-sun-primavera)에서 휴식 |
| 17:00 ~ 18:30 | 키스 브릿지 일몰 산책 & 황금빛 노을 감상 | [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)에서 남부 바다 일몰 감상 |
| 18:30 ~ 20:30 | 부이페스트 해변 야시장 저녁 식사 | [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)에서 로컬 해산물·길거리 음식 즐기기 |
| 21:00 ~ 21:40 | 밤바다 공연 & 불꽃축제 관람 | [키스 오브 더 씨(Kiss of the Sea)](https://myphuquoc.net/ko/business/sunset-place-10) 또는 [선 바바리아 가스트로펍](https://myphuquoc.net/ko/business/sun-bavaria-gastropub) 야외 테라스 |

## 3. 선셋타운 핵심 랜드마크 3선

① 키스 브릿지 (Cầu Hôn): [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)는 바다를 향해 뻗은 두 다리가 30cm 간격으로 마주 보는 독특한 구조를 갖춘 선셋타운의 대표적인 해상 보행교입니다. (두 다리가 30cm 간격으로 마주 보는 구조는 마이푸꾸옥 kiss-bridge 시설 안내 페이지 기재 기준.) 탁 트인 시야로 일몰을 감상할 수 있는 명소입니다.

② 부이페스트 바자 해변 야시장 (VUI-Fest Bazaar): [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해변 산책로를 따라 깔끔하게 정비된 부스에서 바닷바람을 맞으며 현지 길거리 간식을 맛보고 기념품을 쇼핑할 수 있는 현대적인 분위기의 해변 야시장입니다.

③ 선월드 혼똔섬 케이블카: 안터이역에서 출발해 바다를 건너 혼똔섬으로 이어지는 [혼똔섬 해상 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)는 상공에서 에메랄드빛 바다와 남부 군도의 어촌 마을 전경을 파노라마처럼 조망할 수 있는 코스입니다. (세부 운행 시간은 계절별 변동 가능하므로 현장 확인 요망)

## 4. 여행자 실전 꿀팁

1. 숙소 위치: 선셋타운 중심가에 머물면 주요 어트랙션까지 도보로 이동할 수 있어 편리합니다. 럭셔리 스테이를 원한다면 [라 페스타 푸꾸옥 힐튼](https://myphuquoc.net/ko/business/sunset-place-7)을, 가성비와 전망을 중시한다면 선셋타운 내 부티크 호텔들을 고려해 볼 만합니다.
2. 단지 내 이동: 언덕이 많은 선셋타운을 이동할 때는 [무료 전동 버기카](https://myphuquoc.net/ko/business/sun-group-sunset-town-electric-buggy-service)를 이용하면 편리합니다.
3. 공연 및 시설 일정 확인: 야간 쇼와 케이블카는 현지 기상 상황이나 요일별 운영 정책에 따라 일정이 변동될 수 있으므로(키스 오브 더 씨는 화요일 휴무 가능), 여행 당일 [마이푸꾸옥 이벤트 소식](https://myphuquoc.net/ko/events)이나 시설별 현장 공지를 미리 확인하시기 바랍니다.

## 5. 자주 묻는 질문

Q1. 선셋타운을 둘러보는 데 소요되는 시간은 어느 정도인가요?
본 코스는 마이푸꾸옥 편집팀이 구성한 제안 코스로, 케이블카와 야간 쇼를 모두 포함하는 풀코스를 즐기신다면 낮부터 밤까지 반나절 이상(약 8~10시간)을 권장합니다. 산책과 일몰 관람, 저녁 식사 위주라면 오후 16시경에 도착해 4~5시간 머무르는 일정이 적당합니다.

Q2. 즈엉동 야시장과 부이페스트 야시장의 차이점은 무엇인가요?
중부 즈엉동 야시장이 전통적이고 활기찬 재래 야시장 분위기라면, 남부 [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해안 산책로를 따라 깔끔하게 정비된 부스에서 거리 공연과 함께 바다 전망을 즐길 수 있는 현대적인 분위기의 해변 야시장입니다.

Q3. 건기(11월~4월) 푸꾸옥 날씨는 여행하기에 어떤가요?
11월부터 시작되는 건기는 비가 거의 내리지 않고 맑은 하늘과 잔잔한 바다가 이어지는 푸꾸옥 여행 성수기입니다. 쾌적한 환경에서 일몰을 감상하고 야외 활동을 즐기기에 적합한 시기입니다.

## 출처 (Source)

- Vietnam News 2026-10-08: https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html
- VnExpress 2026-10-08: https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html
- VTV 2026-10-09: https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  updated_at = NOW();

COMMIT;
