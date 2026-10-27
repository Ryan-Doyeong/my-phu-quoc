import type { Locale } from '@/lib/i18n/config'

export type EventSampleStory = {
  id: string
  slug: string
  content_type: 'event' | 'news' | 'guide' | 'story'
  status: 'published' | 'draft'
  is_sample: boolean
  category: string
  [key: string]: any
}

/**
 * 실제 운영 게시 이벤트 (일반 게시물 — is_sample: false, 검색엔진 정상 노출 index/follow)
 * - 날짜(effective_date) 경과 시 자동으로 Ended / Đã kết thúc / 종료 배지로 전환됨
 */
export const PUBLISHED_EVENTS: EventSampleStory[] = [
  {
  "id": "guide-conde-nast-top-island-sunset-town-course",
  "slug": "conde-nast-top-island-sunset-town-course",
  "content_type": "guide",
  "status": "published",
  "is_sample": false,
  "category": "Travel Guide",
  "category_ko": "여행 가이드",
  "category_zh": "旅游指南",
  "category_ru": "Путеводитель",
  "category_ja": "旅行ガイド",
  "category_hi": "यात्रा गाइड",
  "cover_image_url": "/stock/phu-quoc-sunset-town-asia-top-island-cover.webp",
  "published_at": "2026-10-27T08:00:00+07:00",
  "updated_at": "2026-10-27T08:00:00+07:00",
  "title": "Condé Nast Traveler Names Phu Quoc Top Island in Asia — Sunset Town South Island Itinerary",
  "title_ko": "미 컨데나스트 트래블러 아시아 최고 섬 1위 푸꾸옥 — 선셋타운 남부 여행 코스",
  "title_zh": "美《悦游》评选富国岛荣登2026亚洲最佳岛屿榜首 — 日落小镇南部一日游路线",
  "title_ru": "Condé Nast Traveler назвал Фукуок лучшим островом Азии 2026 года — Маршрут по Сансет Тауну",
  "title_ja": "米コンデナスト誌「2026年アジア最高の島」第1位のフーコック島 — サンセットタウン南部1日モデルコース",
  "title_hi": "कोंडे नास्ट ट्रैवलर ने फू क्वोक को एशिया का शीर्ष द्वीप घोषित किया — सनसेट टाउन दक्षिण द्वीप यात्रा कार्यक्रम",
  "seo_title": "Condé Nast Traveler Names Phu Quoc Top Island in Asia — Sunset Town Itinerary",
  "seo_title_ko": "미 컨데나스트 트래블러 아시아 최고 섬 1위 푸꾸옥 — 선셋타운 남부 여행 코스",
  "seo_title_zh": "美《悦游》评选富国岛荣登2026亚洲最佳岛屿榜首 — 日落小镇南部一日游路线",
  "seo_title_ru": "Condé Nast Traveler назвал Фукуок лучшим островом Азии 2026 — Маршрут по Сансет Тауну",
  "seo_title_ja": "米コンデナスト誌「2026年アジア最高の島」第1位のフーコック島 — サンセットタウン南部コース",
  "seo_title_hi": "कोंडे नास्ट ट्रैवलर: फू क्वोक एशिया का शीर्ष द्वीप — सनसेट टाउन यात्रा कार्यक्रम",
  "seo_description": "Celebrating Phu Quoc's recognition as the #1 Top Island in Asia (95.26 points) by Condé Nast Traveler, here is a curated 1-day South Island itinerary featuring Sunset Town, Kiss Bridge, and the cable car.",
  "seo_description_ko": "미국 여행지 컨데나스트 트래블러에서 2026년 아시아 최고 섬 1위(95.26점)로 선정된 푸꾸옥의 소식과 함께, 기사에 소개된 선셋타운, 키스브릿지, 케이블카를 엮은 남부 1일 추천 제안 코스를 안내합니다.",
  "seo_description_zh": "美国知名旅游杂志《悦游》（Condé Nast Traveler）评选富国岛为2026年亚洲最佳岛屿第一名（95.26分）。本文为您呈献结合日落小镇、亲吻桥与跨海缆车的南部精选一日建议路线。",
  "seo_description_ru": "Американский журнал Condé Nast Traveler признал Фукуок лучшим островом Азии 2026 года (95.26 балла). Предлагаем подробный 1-дневный маршрут по югу острова: Сансет Таун, мост Kiss Bridge и канатная дорога.",
  "seo_description_ja": "米国旅行誌コンデナスト・トラベラーで2026年アジア最高の島第1位（95.26点）に選ばれたフーコック島の最新情報と、サンセットタウン、キスブリッジ、海上ロープウェイを巡る南部1日のおすすめ提案コースをご案内します。",
  "seo_description_hi": "प्रतिष्ठित अमेरिकी यात्रा पत्रिका कोंडे नास्ट ट्रैवलर द्वारा 2026 में एशिया का नंबर 1 द्वीप (95.26 अंक) चुने जाने के उपलक्ष्य में, सनसेट टाउन, किस ब्रिज और केबल कार का 1-दिवसीय सुझाया गया मार्ग।",
  "excerpt": "Celebrating Phu Quoc's recognition as the #1 Top Island in Asia (95.26 points) by Condé Nast Traveler, here is a curated 1-day South Island itinerary featuring Sunset Town, Kiss Bridge, and the cable car.",
  "excerpt_ko": "미국 여행지 컨데나스트 트래블러에서 2026년 아시아 최고 섬 1위(95.26점)로 선정된 푸꾸옥의 소식과 함께, 기사에 소개된 선셋타운, 키스브릿지, 케이블카를 엮은 남부 1일 추천 제안 코스를 안내합니다.",
  "excerpt_zh": "美国知名旅游杂志《悦游》（Condé Nast Traveler）评选富国岛为2026年亚洲最佳岛屿第一名（95.26分）。本文为您呈献结合日落小镇、亲吻桥与跨海缆车的南部精选一日建议路线。",
  "excerpt_ru": "Американский журнал Condé Nast Traveler признал Фукуок лучшим островом Азии 2026 года (95.26 балла). Предлагаем подробный 1-дневный маршрут по югу острова: Сансет Таун, мост Kiss Bridge и канатная дорога.",
  "excerpt_ja": "米国旅行誌コンデナスト・トラベラーで2026年アジア最高の島第1位（95.26点）に選ばれたフーコック島の最新情報と、サンセットタウン、キスブリッジ、海上ロープウェイを巡る南部1日のおすすめ提案コースをご案内します。",
  "excerpt_hi": "प्रतिष्ठित अमेरिकी यात्रा पत्रिका कोंडे नास्ट ट्रैवलर द्वारा 2026 में एशिया का नंबर 1 द्वीप (95.26 अंक) चुने जाने के उपलक्ष्य में, सनसेट टाउन, किस ब्रिज और केबल कार का 1-दिवसीय सुझाया गया मार्ग।",
  "hero_caption": "AI-generated illustration: Mediterranean-style streets and Kiss Bridge in Sunset Town, South Phu Quoc",
  "hero_caption_ko": "AI-generated illustration: 푸꾸옥 남부 선셋타운의 지중해풍 거리와 키스브릿지 일러스트",
  "hero_caption_zh": "AI-generated illustration: 富国岛南部日落小镇地中海风情街道与亲吻桥插画",
  "hero_caption_ru": "AI-generated illustration: Средиземноморские улочки Сансет Тауна и мост Kiss Bridge на юге Фукуока",
  "hero_caption_ja": "AI-generated illustration: フーコック島南部サンセットタウンの地中海風の街並みとキスブリッジのイラスト",
  "hero_caption_hi": "AI-generated illustration: दक्षिणी फू क्वोक के सनसेट टाउन की भूमध्यसागरीय शैली की गलियों और किस ब्रिज का चित्रण",
  "body_en": "## 1. Phu Quoc Named #1 Top Island in Asia by Condé Nast Traveler 2026\n\nVietnam’s Phu Quoc island has earned first place in the \"Top Island in Asia\" category in the 2026 Readers' Choice Awards by the globally recognized US travel publication, **Condé Nast Traveler (US)**.\n\nAccording to major Vietnamese news media (Vietnam News on 2026-10-08, VnExpress on 2026-10-08, and VTV on 2026-10-09), Phu Quoc achieved an outstanding score of **95.26 out of 100**, securing the top ranking in Asia.\n\n*(Note: The award was announced on October 6 according to the VnExpress report.)*\n\nVietnam News also reported that this #1 ranking reflects the US edition (Condé Nast Traveler US). In the UK edition (Condé Nast Traveller UK) readers' survey, Phu Quoc ranked 2nd in Asia with 98.26 points (with Palawan, Philippines taking 1st place).\n\nAmong local media, Vietnam News highlighted Phu Quoc's natural beaches alongside South Island attractions: the sea-crossing cable car, sunset strolls at [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge), evening arts and culture at [Sunset Town](https://myphuquoc.net/business/sunset-place-10), and nightly fireworks displays. (VnExpress and VTV coverage highlighted the island’s key tourism infrastructure, including the sea-crossing cable car).\n\n---\n\n## 2. South Island 1-Day Itinerary (Suggested Itinerary)\n\nThe specific hours and stay durations listed in the table below (approx. 8–10 hours for the full course, 4–5 hours for a half-day visit) represent a **suggested itinerary created by the My Phu Quoc editorial team** to help travelers plan their visit. Please adjust your schedule flexibly based on operating timetables and on-site conditions.\n\n| Time | Schedule | Key Visit Points |\n|---|---|---|\n| 09:30 Departure ~ 13:00 | Cable Car & Hon Thom Nature Park | Ride the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) (*operating schedule unverified; check official on-site timetable beforehand*) and explore Aquatopia Water Park |\n| 13:30 ~ 16:30 | Return to Sunset Town & Alley Walk | Stroll along pastel-toned hillside alleys and relax at [Starbucks Beach House](https://myphuquoc.net/business/starbucks-beach-house-sun-primavera) |\n| 17:00 ~ 18:30 | Kiss Bridge Sunset Stroll & Golden Hour | Watch the ocean sunset from [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) |\n| 18:30 ~ 20:30 | Dinner at VUI-Fest Seaside Night Market | Savor local seafood and street bites at [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) |\n| 21:00 ~ 21:40 | Night Ocean Performance & Fireworks | Watch [Kiss of the Sea](https://myphuquoc.net/business/sunset-place-10) or view the fireworks from the outdoor terrace at [Sun Bavaria Gastropub](https://myphuquoc.net/business/sun-bavaria-gastropub) |\n\n---\n\n## 3. Top 3 Landmarks of Sunset Town\n\n### ① Kiss Bridge (Cầu Hôn)\n[Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) is an iconic pedestrian bridge stretching out over the sea, featuring two spans that face each other with a 30cm gap. (*The 30cm facing distance is as stated on the My Phu Quoc kiss-bridge facility information page.*) It offers an unobstructed vantage point for enjoying the sunset.\n\n### ② VUI-Fest Bazaar Night Market\n[VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) is a modern seaside night market arranged along the waterfront promenade, where visitors can enjoy sea breezes, sample local street snacks, and shop for souvenirs.\n\n### ③ Sun World Hon Thom Cable Car\nDeparting from An Thoi station and crossing the open sea to Hon Thom island, the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) provides panoramic aerial views of turquoise waters and southern island fishing villages. (*Exact operating hours are subject to seasonal adjustments; please verify on-site.*)\n\n---\n\n## 4. Practical Travel Tips\n\n1. **Accommodation**: Staying in central Sunset Town allows convenient walking access to major attractions. Consider [La Festa Phu Quoc, Curio Collection by Hilton](https://myphuquoc.net/business/sunset-place-7) for a luxury stay, or boutique hotels within Sunset Town for great views and value.\n2. **Getting Around**: Take advantage of the [complimentary electric buggy service](https://myphuquoc.net/business/sun-group-sunset-town-electric-buggy-service) to navigate Sunset Town’s hilly terrain effortlessly.\n3. **Check Schedules**: Night shows and cable car operations may adjust according to local weather or weekly policies (Kiss of the Sea may be closed on Tuesdays). Be sure to check the [My Phu Quoc Events board](https://myphuquoc.net/events) or on-site notices on the day of your visit.\n\n---\n\n## 5. Frequently Asked Questions (FAQ)\n\n### Q1. How much time is needed to explore Sunset Town?\nThis is a suggested itinerary by our editorial team: allowing half a day or more (approx. 8–10 hours) from daytime through the evening is recommended for the full course including the cable car and night show. For a relaxed stroll, sunset viewing, and dinner, arriving around 16:00 for a 4–5 hour visit is ideal.\n\n### Q2. How does VUI-Fest Bazaar differ from Duong Dong Night Market?\nWhile Duong Dong Night Market in central Phu Quoc offers a traditional and bustling local market experience, the southern [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) offers a contemporary, neatly organized promenade setting with street entertainment and seaside views.\n\n### Q3. What is Phu Quoc's weather like during the dry season (November to April)?\nThe dry season beginning in November brings minimal rainfall, clear skies, and calm seas, marking Phu Quoc's peak travel season. It provides optimal conditions for comfortable sunset viewing and outdoor sightseeing.\n\n---\n\n## Sources\n\n- Vietnam News (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ko": "## 1. 푸꾸옥, 미 컨데나스트 트래블러 '2026년 아시아 최고 섬' 1위 선정\n\n베트남 푸꾸옥이 세계적으로 권위 있는 미국 여행 전문지 컨데나스트 트래블러(Condé Nast Traveler US)의 '리더스 초이스 어워드 2026(Readers' Choice Awards 2026)' 독자 투표에서 '2026년 아시아 최고 섬(Top Island in Asia)' 부문 1위에 올랐습니다.\n\n베트남 주요 언론(Vietnam News 2026-10-08 보도, VnExpress 2026-10-08 보도, VTV 2026-10-09 보도)에 따르면, 푸꾸옥은 100점 만점에 95.26점의 높은 평점을 기록하며 아시아 최고 섬 1위로 선정되었습니다.\n\n(※ 주최 측의 본상 발표일은 10월 6일(VnExpress 보도 기준)입니다.)\n\n또한 Vietnam News는 이번 1위 결과가 미국판(Condé Nast Traveler US) 기준이며, 같은 매체의 영국판(Condé Nast Traveller UK) 독자 투표에서는 푸꾸옥이 98.26점으로 아시아 2위(1위 필리핀 팔라완)를 차지했다고 함께 전했습니다.\n\n현지 언론 가운데 Vietnam News는 푸꾸옥의 자연 해변과 함께 남부의 주요 볼거리로 해상 케이블카, 일몰 산책로인 키스 브릿지(Kiss Bridge), 저녁 문화예술 공간인 선셋타운(Sunset Town), 야간 불꽃놀이 등을 여행자들에게 소개하고 있습니다. (VnExpress와 VTV 보도에서는 해상 케이블카를 비롯한 섬의 주요 관광 인프라를 언급하였습니다.)\n\n## 2. 선셋타운 남부 1일 여행 코스 (추천 제안 코스)\n\n아래 표에 기재된 세부 시간대와 체류 시간(풀코스 약 8~10시간, 반일 코스 약 4~5시간)은 여행자의 일정 계획을 돕기 위해 마이푸꾸옥 편집팀이 구성한 추천 제안 동선입니다. 시설별 실제 운영 시간표와 현장 상황에 따라 일정을 유동적으로 조정하시기 바랍니다.\n\n| 시간대 | 일정 | 방문 포인트 |\n|---|---|---|\n| 09:30 탑승 ~ 13:00 | 해상 케이블카 탑승 & 혼똔섬 자연공원 | [선월드 혼똔섬 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) 탑승 (※ 운행 시간 미확인, 현장 시간표 사전 확인 필요) 및 아쿠아토피아 워터파크 둘러보기 |\n| 13:30 ~ 16:30 | 선셋타운 복귀 & 지중해풍 골목 산책 | 파스텔톤 언덕길 골목, [스타벅스 비치 하우스](https://myphuquoc.net/ko/business/starbucks-beach-house-sun-primavera)에서 휴식 |\n| 17:00 ~ 18:30 | 키스 브릿지 일몰 산책 & 황금빛 노을 감상 | [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)에서 남부 바다 일몰 감상 |\n| 18:30 ~ 20:30 | 부이페스트 해변 야시장 저녁 식사 | [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)에서 로컬 해산물·길거리 음식 즐기기 |\n| 21:00 ~ 21:40 | 밤바다 공연 & 불꽃축제 관람 | [키스 오브 더 씨(Kiss of the Sea)](https://myphuquoc.net/ko/business/sunset-place-10) 또는 [선 바바리아 가스트로펍](https://myphuquoc.net/ko/business/sun-bavaria-gastropub) 야외 테라스 |\n\n## 3. 선셋타운 핵심 랜드마크 3선\n\n① 키스 브릿지 (Cầu Hôn): [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)는 바다를 향해 뻗은 두 다리가 30cm 간격으로 마주 보는 독특한 구조를 갖춘 선셋타운의 대표적인 해상 보행교입니다. (두 다리가 30cm 간격으로 마주 보는 구조는 마이푸꾸옥 kiss-bridge 시설 안내 페이지 기재 기준.) 탁 트인 시야로 일몰을 감상할 수 있는 명소입니다.\n\n② 부이페스트 바자 해변 야시장 (VUI-Fest Bazaar): [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해변 산책로를 따라 깔끔하게 정비된 부스에서 바닷바람을 맞으며 현지 길거리 간식을 맛보고 기념품을 쇼핑할 수 있는 현대적인 분위기의 해변 야시장입니다.\n\n③ 선월드 혼똔섬 케이블카: 안터이역에서 출발해 바다를 건너 혼똔섬으로 이어지는 [혼똔섬 해상 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)는 상공에서 에메랄드빛 바다와 남부 군도의 어촌 마을 전경을 파노라마처럼 조망할 수 있는 코스입니다. (세부 운행 시간은 계절별 변동 가능하므로 현장 확인 요망)\n\n## 4. 여행자 실전 꿀팁\n\n1. 숙소 위치: 선셋타운 중심가에 머물면 주요 어트랙션까지 도보로 이동할 수 있어 편리합니다. 럭셔리 스테이를 원한다면 [라 페스타 푸꾸옥 힐튼](https://myphuquoc.net/ko/business/sunset-place-7)을, 가성비와 전망을 중시한다면 선셋타운 내 부티크 호텔들을 고려해 볼 만합니다.\n2. 단지 내 이동: 언덕이 많은 선셋타운을 이동할 때는 [무료 전동 버기카](https://myphuquoc.net/ko/business/sun-group-sunset-town-electric-buggy-service)를 이용하면 편리합니다.\n3. 공연 및 시설 일정 확인: 야간 쇼와 케이블카는 현지 기상 상황이나 요일별 운영 정책에 따라 일정이 변동될 수 있으므로(키스 오브 더 씨는 화요일 휴무 가능), 여행 당일 [마이푸꾸옥 이벤트 소식](https://myphuquoc.net/ko/events)이나 시설별 현장 공지를 미리 확인하시기 바랍니다.\n\n## 5. 자주 묻는 질문\n\nQ1. 선셋타운을 둘러보는 데 소요되는 시간은 어느 정도인가요?\n본 코스는 마이푸꾸옥 편집팀이 구성한 제안 코스로, 케이블카와 야간 쇼를 모두 포함하는 풀코스를 즐기신다면 낮부터 밤까지 반나절 이상(약 8~10시간)을 권장합니다. 산책과 일몰 관람, 저녁 식사 위주라면 오후 16시경에 도착해 4~5시간 머무르는 일정이 적당합니다.\n\nQ2. 즈엉동 야시장과 부이페스트 야시장의 차이점은 무엇인가요?\n중부 즈엉동 야시장이 전통적이고 활기찬 재래 야시장 분위기라면, 남부 [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해안 산책로를 따라 깔끔하게 정비된 부스에서 거리 공연과 함께 바다 전망을 즐길 수 있는 현대적인 분위기의 해변 야시장입니다.\n\nQ3. 건기(11월~4월) 푸꾸옥 날씨는 여행하기에 어떤가요?\n11월부터 시작되는 건기는 비가 거의 내리지 않고 맑은 하늘과 잔잔한 바다가 이어지는 푸꾸옥 여행 성수기입니다. 쾌적한 환경에서 일몰을 감상하고 야외 활동을 즐기기에 적합한 시기입니다.\n\n## 출처 (Source)\n\n- Vietnam News 2026-10-08: https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 2026-10-08: https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 2026-10-09: https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_zh": "## 1. 富国岛荣膺《悦游》2026年“亚洲最佳岛屿”第一名\n\n越南富国岛在享誉全球的美国权威旅游杂志**《悦游》（Condé Nast Traveler US）**“读者选择奖2026（Readers' Choice Awards 2026）”投票中，荣获“2026年亚洲最佳岛屿（Top Island in Asia）”第一名。\n\n据越南主要媒体（Vietnam News 2026-10-08、VnExpress 2026-10-08、VTV 2026-10-09）报道，富国岛以满分100分中的**95.26分**高分力拔头筹，位列亚洲第一。\n\n*(※ 依据VnExpress报道，主办方奖项公布日期为10月6日。)*\n\nVietnam News进一步报道，该第一名评选基于美国版（Condé Nast Traveler US）读者投票；在同家媒体的英国版（Condé Nast Traveller UK）读者评选中，富国岛以98.26分位居亚洲第二名（第一名为菲律宾巴拉望）。\n\n在当地媒体报道中，Vietnam News向游客介绍了富国岛的自然海滩以及南部的核心景点：跨海缆车、日落散步胜地[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)、夜间文化艺术胜地[日落小镇（Sunset Town）](https://myphuquoc.net/zh/business/sunset-place-10)以及夜间烟花表演。（VnExpress与VTV报道重点提及了包括跨海缆车在内的全岛重点旅游基础设施）。\n\n---\n\n## 2. 日落小镇南部一日游路线（建议行程）\n\n下表列出的具体时间段与停留时长（全天完整行程约8至10小时，半天行程约4至5小时），是由**My Phu Quoc编辑团队为方便游客规划行程而制定的建议路线**。请根据设施实际运营时刻表及现场情况灵活调整。\n\n| 时间段 | 建议行程 | 核心游览点 |\n|---|---|---|\n| 09:30 出发 ~ 13:00 | 跨海缆车与香岛自然公园 | 乘坐[太阳世界香岛缆车](https://myphuquoc.net/zh/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)（※ 运营时刻未确认，请提前核实官方现场时刻表），畅玩水上乐园 |\n| 13:30 ~ 16:30 | 返回日落小镇与漫步小巷 | 漫步柔和色调的山坡小径，在[星巴克海滩小屋店](https://myphuquoc.net/zh/business/starbucks-beach-house-sun-primavera)小憩 |\n| 17:00 ~ 18:30 | 亲吻桥日落漫步与金黄晚霞 | 登上[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)饱览南部海域日落美景 |\n| 18:30 ~ 20:30 | VUI-Fest 海滨夜市晚餐 | 在[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)品尝当地海鲜与街头美食 |\n| 21:00 ~ 21:40 | 海洋夜间盛典与璀璨烟花 | 观赏[海洋之吻（Kiss of the Sea）](https://myphuquoc.net/zh/business/sunset-place-10)表演，或在[Sun Bavaria 鲜啤餐厅](https://myphuquoc.net/zh/business/sun-bavaria-gastropub)室外露台享受氛围 |\n\n---\n\n## 3. 日落小镇三大核心地标\n\n### ① 亲吻桥 (Cầu Hôn)\n[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)是日落小镇极具代表性的跨海步行桥，两座桥身延伸向大海并在相隔30厘米处深情相对。（两桥相隔30厘米的结构为 My Phu Quoc kiss-bridge 设施信息页面记载基准）。这里是开阔视野下欣赏夕阳的绝佳胜地。\n\n### ② VUI-Fest Bazaar 海滨夜市\n[VUI-Fest 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)沿海滨步道整齐分布，游客可在海风吹拂下品尝地道街头小吃并选购纪念品，体验现代活力的海滨夜市风情。\n\n### ③ 太阳世界香岛缆车\n由安泰站（An Thoi）出发飞跃浩瀚大海连接香岛的[香岛跨海缆车](https://myphuquoc.net/zh/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)，让游客能自高空360度全景俯瞰翡翠色大海与南部群岛渔村风光。（具体运行时间可能因季节调整，请以现场确认为准）。\n\n---\n\n## 4. 游客实用贴士\n\n1. **住宿选择**: 入住日落小镇中心区域可轻松步行抵达主要景点。奢华度假首选[富国岛罗菲斯塔希尔顿格芮精选酒店](https://myphuquoc.net/zh/business/sunset-place-7)，注重性价比与景观则可考虑小镇内的精品酒店。\n2. **镇内交通**: 在坡度起伏的日落小镇内游览，搭乘[免费电动观光车（Buggy）](https://myphuquoc.net/zh/business/sun-group-sunset-town-electric-buggy-service)最为轻松便捷。\n3. **确认运营时间**: 夜间演出与缆车运营可能受天气或周度安排调整（海洋之吻周二可能休演）。出发当天建议先确认 [My Phu Quoc 活动公告板](https://myphuquoc.net/zh/events) 或各设施现场公告。\n\n---\n\n## 5. 常见问题解答 (FAQ)\n\n### Q1. 游览日落小镇建议预留多少时间？\n本路线为编辑团队制定的建议路线：若包含缆车及夜间演出的全套体验，建议安排白天至夜晚大半天时间（约8至10小时）。若仅安排散步、日落观赏及晚餐，下午16:00左右到达游览4至5小时即可。\n\n### Q2. 阳东夜市与 VUI-Fest 夜市有何区别？\n中部阳东夜市更偏向传统热闹的在地传统夜市，而南部[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)则是沿海滨步道规范建设、融合街头表演与海景的现代时尚海滩夜市。\n\n### Q3. 旱季（11月至次年4月）富国岛天气适合旅行吗？\n11月起进入的旱季降雨稀少、晴空万里、风平浪静，是富国岛的黄金旅游季节，非常适宜舒适地观赏日落及开展户外活动。\n\n---\n\n## 报道来源 (Sources)\n\n- Vietnam News 报道 (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 报道 (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 报道 (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ru": "## 1. Фукуок занял 1-е место в рейтинге «Лучшие острова Азии 2026» по версии Condé Nast Traveler\n\nВьетнамский остров Фукуок занял первое место в номинации «Лучший остров Азии» (Top Island in Asia) в рамках престижной ежегодной премии Readers' Choice Awards 2026 ведущего американского издания о путешествиях **Condé Nast Traveler (US)**.\n\nПо сообщениям ведущих вьетнамских СМИ (Vietnam News от 08.10.2026, VnExpress от 08.10.2026 и VTV от 09.10.2026), Фукуок набрал высокий балл — **95.26 из 100**, заняв верхнюю строчку рейтинга в Азии.\n\n*(※ Согласно сообщению VnExpress, официальное объявление награды состоялось 6 октября).*\n\nИздание Vietnam News также отметило, что данный результат относится к голосованию читателей американской версии (Condé Nast Traveler US). В опросе британской версии журнала (Condé Nast Traveller UK) Фукуок занял 2-е место в Азии с результатом 98.26 балла (первое место занял остров Палаван, Филиппины).\n\nСреди местных СМИ газета Vietnam News знакомит путешественников с природными пляжами Фукуока и ключевыми достопримечательностями юга острова: канатной дорогой над морем, пешеходным мостом [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) для романтических прогулок на закате, вечерним культурно-развлекательным комплексом [Сансет Таун (Sunset Town)](https://myphuquoc.net/ru/business/sunset-place-10) и ежедневными фейерверками. (В репортажах VnExpress и VTV также подчеркивалась ключевая туристическая инфраструктура острова, включая морскую канатную дорогу).\n\n---\n\n## 2. Однодневный маршрут по югу Фукуока и Сансет Тауну (Рекомендованный маршрут)\n\nУказанные в таблице временные интервалы и продолжительность пребывания (полный маршрут около 8–10 часов, экспресс-программа на полдня около 4–5 часов) представляют собой **рекомендованный маршрут, составленный редакцией My Phu Quoc** для помощи в планировании путешествия. Пожалуйста, корректируйте время в зависимости от графика работы объектов и фактических обстоятельств.\n\n| Время | Программа | Основные точки маршрута |\n|---|---|---|\n| 09:30 Отправление ~ 13:00 | Морская канатная дорога и парк Хон Тхом | Поездка на [канатной дороге Sun World Hon Thom](https://myphuquoc.net/ru/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) (*расписание не подтверждено, просьба уточнять на месте*) и посещение аквапарка Aquatopia |\n| 13:30 ~ 16:30 | Возвращение в Сансет Таун и прогулка | Прогулка по живописным улочкам пастельных тонов, отдых в [Starbucks Beach House](https://myphuquoc.net/ru/business/starbucks-beach-house-sun-primavera) |\n| 17:00 ~ 18:30 | Закат на мосту Kiss Bridge | Встреча золотистого заката с панорамным видом на море на мосту [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) |\n| 18:30 ~ 20:30 | Ужин на набережном ночном рынке VUI-Fest | Дегустация морепродуктов и местных блюд на рынке [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) |\n| 21:00 ~ 21:40 | Морское вечернее шоу и фейерверк | Просмотр шоу [Kiss of the Sea](https://myphuquoc.net/ru/business/sunset-place-10) или отдых на открытой террасе ресторана [Sun Bavaria Gastropub](https://myphuquoc.net/ru/business/sun-bavaria-gastropub) |\n\n---\n\n## 3. Топ-3 достопримечательности Сансет Тауна\n\n### ① Мост Поцелуев — Kiss Bridge (Cầu Hôn)\n[Мост Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) — культовое архитектурное сооружение, две ветви которого устремлены навстречу друг другу в море и сходятся с зазором всего в 30 см. (*Расстояние в 30 см между пролетами приведено согласно данным информационной страницы объекта kiss-bridge на сайте My Phu Quoc.*) Это идеальное место для панорамного обзора заката.\n\n### ② Ночной рынок VUI-Fest Bazaar\nПриморский ночной рынок [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) расположен вдоль благоустроенной набережной. Здесь можно прогуляться под морским бризом, попробовать аутентичный стритфуд и приобрести сувениры в современной комфортной атмосфере.\n\n### ③ Канатная дорога Sun World Hon Thom\nМорская канатная дорога [Hon Thom Cable Car](https://myphuquoc.net/ru/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc), берущая начало от станции Ан Тхой (An Thoi), соединяет главный остров с островом Хон Тхом. Во время полета над морем открывается панорамный вид на бирюзовые воды и рыбацкие деревни. (*Точное расписание движения может меняться в зависимости от сезона; уточняйте на месте.*)\n\n---\n\n## 4. Практические советы для туристов\n\n1. **Где остановиться**: Проживание в центре Сансет Тауна обеспечивает удобную пешую доступность ко всем локациям. Для роскошного отдыха выберите [La Festa Phu Quoc, Curio Collection by Hilton](https://myphuquoc.net/ru/business/sunset-place-7), а для оптимального баланса цены и видовых характеристик подойдут бутик-отели города.\n2. **Передвижение**: Для перемещения по холмистой территории Сансет Тауна удобно пользоваться [бесплатными электрическими шаттлами (багги)](https://myphuquoc.net/ru/business/sun-group-sunset-town-electric-buggy-service).\n3. **Уточнение расписания**: Расписание вечерних шоу и канатной дороги может корректироваться из-за погодных условий или внутренних регламентов (во вторник у шоу Kiss of the Sea возможен выходной). В день поездки обязательно проверяйте [доску событий My Phu Quoc Events](https://myphuquoc.net/ru/events) или объявления на месте.\n\n---\n\n## 5. Часто задаваемые вопросы (FAQ)\n\n### В1. Сколько времени требуется на осмотр Сансет Тауна?\nЭто рекомендованный маршрут от редакции: на полную программу с канатной дорогой и вечерним шоу рекомендуется выделить от полудня до вечера (около 8–10 часов). Если цель визита — спокойная прогулка, закат и ужин, достаточно приехать к 16:00 на 4–5 часов.\n\n### В2. В чем разница между ночным рынком Зыонгдонг и рынком VUI-Fest?\nЕсли ночной рынок в Зыонгдонге (центр острова) представляет собой классический азиатский базар, то южный рынок [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) — это современное гастрономическое пространство на набережной с морским видом и аккуратными павильонами.\n\n### В3. Какая погода на Фукуоке в сухой сезон (с ноября по апрель)?\nСухой сезон, начинающийся в ноябре — это пик туристического сезона на Фукуоке: минимум осадков, чистое небо и спокойное море. Это самое благоприятное время для созерцания закатов и активного отдыха на открытом воздухе.\n\n---\n\n## Источники (Sources)\n\n- Сообщение Vietnam News (08.10.2026): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- Сообщение VnExpress (08.10.2026): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- Сообщение VTV (09.10.2026): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ja": "## 1. フーコック島、米コンデナスト・トラベラー誌「2026年アジア最高の島」第1位に選出\n\nベトナムのフーコック島が、世界的な権威を誇る米国の旅行専門誌**コンデナスト・トラベラー（Condé Nast Traveler US）**による「リーダーズ・チョイス・アワード2026（Readers' Choice Awards 2026）」読者投票において、「2026年アジア最高の島（Top Island in Asia）」部門で第1位に輝きました。\n\nベトナム主要メディア（Vietnam News 2026-10-08報道、VnExpress 2026-10-08報道、VTV 2026-10-09報道）によると、フーコック島は100点満点中**95.26点**という高得点を記録し、アジアのトップアイランドとして選出されました。\n\n*(※ VnExpressの報道によると、主催者による本賞の公式発表日は10月6日です。)*\n\nまた、Vietnam Newsはこの第1位の結果が米国版（Condé Nast Traveler US）の基準であり、同誌の英国版（Condé Nast Traveller UK）の読者投票ではフーコック島が98.26点でアジア第2位（第1位はフィリピンのパラワン島）を獲得したことも併せて報じています。\n\n現地報道の中でVietnam Newsは、フーコック島の豊かな自然ビーチとともに、南部エリアの主要な見どころとして海上ロープウェイ、夕日散策の定番である[キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)、夜の文化芸術スポット[サンセットタウン（Sunset Town）](https://myphuquoc.net/ja/business/sunset-place-10)、そして毎晩の花火ショーを旅行者向けに紹介しています。（VnExpressおよびVTVの報道でも、海上ロープウェイをはじめとする島の基幹観光インフラが言及されました）。\n\n---\n\n## 2. サンセットタウン南部1日モデルコース（提案コース）\n\n以下の表に記載された具体的な時間帯や滞在時間（フルコース約8〜10時間、半日コース約4〜5時間）は、旅行者の計画をサポートするために**My Phu Quoc編集チームが作成したおすすめの提案動線**です。各施設の実際の運行スケジュールや現地の天候状況に合わせて柔軟に調整してください。\n\n| 時間帯 | スケジュール | 主な立ち寄りポイント |\n|---|---|---|\n| 09:30 出発 ~ 13:00 | 海上ロープウェイ乗車＆ホントム島自然公園 | [サンワールド・ホントム・ロープウェイ](https://myphuquoc.net/ja/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)に乗車（※ 運行スケジュール未確認、現地の公式時刻表を事前確認推奨）し、アクアトピア・ウォーターパークを満喫 |\n| 13:30 ~ 16:30 | サンセットタウン帰還＆地中海風の路地散策 | パステルトーンの丘の小道を散策し、[スターバックス ビーチハウス店](https://myphuquoc.net/ja/business/starbucks-beach-house-sun-primavera)で休憩 |\n| 17:00 ~ 18:30 | キスブリッジで夕日散策＆黄金色の黄昏観賞 | [キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)の上から南部の海のサンセットを観賞 |\n| 18:30 ~ 20:30 | ブイフェスト海浜ナイトマーケットで夕食 | [ブイフェスト・バザール（VUI-Fest Bazaar）](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)で新鮮なシーフードや屋台料理を堪能 |\n| 21:00 ~ 21:40 | 夜の海上ショー観賞＆花火フィナーレ | [キス・オブ・ザ・シー（Kiss of the Sea）](https://myphuquoc.net/ja/business/sunset-place-10)を観賞、または[サン・ババリア・ガストロパブ](https://myphuquoc.net/ja/business/sun-bavaria-gastropub)のオープンエアテラスで満喫 |\n\n---\n\n## 3. サンセットタウンの3大注目ランドマーク\n\n### ① キスブリッジ (Cầu Hôn)\n[キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)は、海に向かって伸びる2本の橋がわずか30cmの間隔を空けて向かい合う独特の設計が施された、サンセットタウンを代表する海上歩道橋です。（向かい合う間隔が30cmである構造は、My Phu Quocのkiss-bridge施設案内ページ記載基準）。視界を遮るもののない大パノラマでサンセットを望める名所です。\n\n### ② ブイフェスト・バザール海浜ナイトマーケット\n海辺のプロムナード沿いに綺麗に整えられたブースが並ぶ[ブイフェスト・ナイトマーケット](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)は、潮風を感じながら現地のストリートフードを味わい、お土産探しを楽しめるモダンな雰囲気の海浜マーケットです。\n\n### ③ サンワールド・ホントム・ロープウェイ\nアントイ駅（An Thoi）から出発して大海原を越えホントム島へと繋がる[ホントム海上ロープウェイ](https://myphuquoc.net/ja/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)は、上空からエメラルドグリーンの海と南部諸島の漁村風景を一望できる爽快なアトラクションです。（詳細な運行時間は季節により変動する可能性があるため、現地でのご確認をお願いします）。\n\n---\n\n## 4. 旅行者のための実践的なヒント\n\n1. **宿泊エリアの選択**: サンセットタウンの中心部に滞在すると、主要な見どころまで徒歩で快適に移動できます。贅沢なリゾートステイなら[ラ・フェスタ・フーコック・ヒルトン](https://myphuquoc.net/ja/business/sunset-place-7)、眺望とコストパフォーマンスを両立させるならタウン内のブティックホテルがおすすめです。\n2. **タウン内の移動**: 坂道の多いサンセットタウン内を移動する際は、[無料の電動バギー（Buggy）](https://myphuquoc.net/ja/business/sun-group-sunset-town-electric-buggy-service)を上手に活用すると体力を温存できます。\n3. **運行・公演日時の確認**: 夜間ショーやロープウェイは、現地の天候状況や曜日ごとの運営方針によって変更される場合があります（キス・オブ・ザ・シーは火曜日休演の可能性あり）。旅行当日は[My Phu Quocイベント掲示板](https://myphuquoc.net/ja/events)や現地の最新案内を事前にご確認ください。\n\n---\n\n## 5. よくある質問 (FAQ)\n\n### Q1. サンセットタウンを巡るのに必要な所要時間はどのくらいですか？\n本コースは編集部による提案コースです。ロープウェイと夜間ショーの両方を含むフルコースを満喫する場合は、日中から夜まで半日以上（約8〜10時間）の確保をおすすめします。散策、夕日観賞、夕食がメインであれば、午後16時頃に到着して4〜5時間滞在するスケジュールが手頃です。\n\n### Q2. ズオンドン夜市とブイフェスト・バザールの違いは何ですか？\n中部にあるズオンドン夜市が昔ながらの活気あふれる伝統的な市場であるのに対し、南部の[ブイフェスト・バザール（VUI-Fest Bazaar）](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)は海沿いの遊歩道に沿って清潔に整備され、ストリートパフォーマンスとオーシャンビューを同時に楽しめる現代的なビーチフロントナイトマーケットです。\n\n### Q3. 乾期（11月〜4月）のフーコック島の気候は観光に適していますか？\n11月から始まる乾期は雨がほとんど降らず、澄み渡る青空と穏やかな波が続くフーコック観光のベストシーズンです。快適な環境の中で美しい夕日を眺め、屋外アクティビティを満喫するのに最も適した時期です。\n\n---\n\n## 情報出所 (Sources)\n\n- Vietnam News 報道 (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 報道 (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 報道 (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_hi": "## 1. फू क्वोक को कोंडे नास्ट ट्रैवलर द्वारा '2026 में एशिया का शीर्ष द्वीप' घोषित किया गया\n\nवियतनाम के फू क्वोक द्वीप ने विश्व प्रसिद्ध अमेरिकी यात्रा पत्रिका **कोंडे नास्ट ट्रैवलर (Condé Nast Traveler US)** के 'रीडर्स च्वाइस अवार्ड्स 2026 (Readers' Choice Awards 2026)' में \"एशिया का शीर्ष द्वीप (Top Island in Asia)\" श्रेणी में पहला स्थान प्राप्त किया है।\n\nवियतनाम के प्रमुख समाचार माध्यमों (Vietnam News 2026-10-08, VnExpress 2026-10-08, VTV 2026-10-09) के अनुसार, फू क्वोक ने 100 में से **95.26 अंकों** का उत्कृष्ट स्कोर हासिल कर एशिया में पहला स्थान प्राप्त किया।\n\n*(※ VnExpress की रिपोर्ट के अनुसार, आयोजकों द्वारा पुरस्कार की आधिकारिक घोषणा 6 अक्टूबर को की गई थी।)*\n\nVietnam News ने यह भी बताया कि यह नंबर 1 रैंकिंग अमेरिकी संस्करण (Condé Nast Traveler US) पर आधारित है; जबकि इसी पत्रिका के यूके संस्करण (Condé Nast Traveller UK) के पाठकों के सर्वेक्षण में फू क्वोक 98.26 अंकों के साथ एशिया में दूसरे स्थान पर रहा (फिलीपींस का पलावन पहले स्थान पर रहा)।\n\nस्थानीय मीडिया में, Vietnam News ने फू क्वोक के प्राकृतिक समुद्र तटों के साथ-साथ दक्षिणी द्वीप के प्रमुख आकर्षणों को पर्यटकों के सामने प्रस्तुत किया: समुद्र पार करने वाली केबल कार, सूर्यास्त की सैर के लिए [किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge), शाम के सांस्कृतिक और कला केंद्र [सनसेट टाउन (Sunset Town)](https://myphuquoc.net/hi/business/sunset-place-10), और रात्रि आतिशबाजी। (VnExpress और VTV की रिपोर्टों में भी केबल कार सहित द्वीप के प्रमुख पर्यटन बुनियादी ढांचे का उल्लेख किया गया था)।\n\n---\n\n## 2. सनसेट टाउन दक्षिण द्वीप 1-दिवसीय यात्रा कार्यक्रम (सुझाया गया मार्ग)\n\nनीचे दी गई तालिका में उल्लिखित विशिष्ट समय और रुकने की अवधि (पूरे दिन के कार्यक्रम के लिए लगभग 8–10 घंटे, आधे दिन के लिए 4–5 घंटे) **माई फू क्वोक संपादकीय टीम द्वारा यात्रियों की सुविधा के लिए तैयार किया गया एक सुझाया गया मार्ग है**। कृपया सुविधाओं के वास्तविक समय और स्थानीय परिस्थितियों के अनुसार अपने कार्यक्रम को समायोजित करें।\n\n| समय | कार्यक्रम | प्रमुख पड़ाव |\n|---|---|---|\n| 09:30 प्रस्थान ~ 13:00 | केबल कार की सवारी और होन थोम प्राकृतिक पार्क | [सन वर्ल्ड होन थोम केबल कार](https://myphuquoc.net/hi/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) की सवारी (*संचालन समय असत्यापित, कृपया पहले से आधिकारिक समय सारिणी की जांच करें*) और एक्वाटोपिया वाटर पार्क का आनंद |\n| 13:30 ~ 16:30 | सनसेट टाउन वापसी और गलियों में सैर | पेस्टल रंगों वाली ढलानदार गलियों में घूमें और [स्टारबक्स बीच हाउस](https://myphuquoc.net/hi/business/starbucks-beach-house-sun-primavera) में विश्राम करें |\n| 17:00 ~ 18:30 | किस ब्रिज पर सूर्यास्त की सैर और सुनहरी शाम | [किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge) से समुद्र में डूबते सूर्य का विहंगम दृश्य देखें |\n| 18:30 ~ 20:30 | VUI-Fest नाइट मार्केट में रात्रिभोज | [VUI-Fest Bazaar](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) में स्थानीय सीफूड और स्ट्रीट फूड का स्वाद लें |\n| 21:00 ~ 21:40 | रात्रि समुद्री शो और भव्य आतिशबाजी | [किस ऑफ द सी (Kiss of the Sea)](https://myphuquoc.net/hi/business/sunset-place-10) देखें, या [Sun Bavaria Gastropub](https://myphuquoc.net/hi/business/sun-bavaria-gastropub) की खुली छत से दृश्यों का आनंद लें |\n\n---\n\n## 3. सनसेट टाउन के 3 प्रमुख ऐतिहासिक स्थल\n\n### ① किस ब्रिज (Cầu Hôn)\n[किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge) समुद्र की ओर फैली एक अनूठी पैदल पुल संरचना है, जिसके दो सिरे एक-दूसरे से मात्र 30 सेमी की दूरी पर आमने-सामने स्थित हैं। (*दोनों सिरों के बीच 30 सेमी का अंतर माई फू क्वोक kiss-bridge सुविधा पृष्ठ पर उल्लिखित विवरण के अनुसार है।*) यह सूर्यास्त के विहंगम दर्शन के लिए सबसे प्रसिद्ध स्थान है।\n\n### ② VUI-Fest Bazaar समुद्री नाइट मार्केट\nतटीय सैरगाह के किनारे सुव्यवस्थित स्टालों के साथ [VUI-Fest नाइट मार्केट](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) समुद्री हवा के बीच स्थानीय स्नैक्स और स्मृति चिन्हों की खरीदारी के लिए एक आधुनिक और जीवंत स्थान है।\n\n### ③ सन वर्ल्ड होन थोम केबल कार\nअन थोई स्टेशन (An Thoi) से शुरू होकर समुद्र के ऊपर से होते हुए होन थोम द्वीप तक जाने वाली [होन थोम केबल कार](https://myphuquoc.net/hi/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) ऊपर से फ़िरोज़ा समुद्र और दक्षिणी द्वीपों के मछली पकड़ने वाले गांवों का मनोरम दृश्य प्रस्तुत करती है। (*मौसम के अनुसार समय में बदलाव संभव है; कृपया मौके पर पुष्टि करें।* )\n\n---\n\n## 4. यात्रियों के लिए व्यावहारिक सुझाव\n\n1. **आवास**: सनसेट टाउन के केंद्र में ठहरने से प्रमुख आकर्षणों तक पैदल पहुंचा जा सकता है। विलासिता के लिए [ला फेस्टा फू क्वोक हिल्टन](https://myphuquoc.net/hi/business/sunset-place-7) चुनें, या उत्कृष्ट दृश्यों और किफ़ायती दरों के लिए बुटीक होटल देखें।\n2. **आवागमन**: ढलानों वाले सनसेट टाउन में आसानी से घूमने के लिए [मुफ्त इलेक्ट्रिक बग्गी सेवा](https://myphuquoc.net/hi/business/sun-group-sunset-town-electric-buggy-service) का उपयोग करें।\n3. **समय सारिणी की पुष्टि**: मौसम या दिन की नीतियों के आधार पर रात्रि शो और केबल कार के समय में बदलाव हो सकता है (किस ऑफ द सी मंगलवार को बंद रह सकता है)। यात्रा के दिन [My Phu Quoc Events बोर्ड](https://myphuquoc.net/hi/events) या स्थानीय सूचना बोर्ड अवश्य देखें।\n\n---\n\n## 5. अक्सर पूछे जाने वाले प्रश्न (FAQ)\n\n### प्र1. सनसेट टाउन घूमने के लिए कितना समय पर्याप्त है?\nयह संपादकीय टीम द्वारा सुझाया गया मार्ग है: केबल कार और नाइट शो सहित पूरे कार्यक्रम का आनंद लेने के लिए दोपहर से रात तक (लगभग 8–10 घंटे) का समय रखने की सिफारिश की जाती है। यदि केवल सैर, सूर्यास्त और रात का खाना ही प्राथमिकता है, तो शाम 16:00 बजे पहुंचकर 4–5 घंटे रुकना पर्याप्त है।\n\n### प्र2. डुओंग डोंग नाइट मार्केट और VUI-Fest में क्या अंतर है?\nमध्य फू क्वोक का डुओंग डोंग नाइट मार्केट पारंपरिक और चहल-पहल वाला बाज़ार है, जबकि दक्षिणी [VUI-Fest Bazaar](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) समुद्र तट के किनारे सुव्यवस्थित, आधुनिक और स्ट्रीट परफॉर्मेंस से युक्त एक खुला बाज़ार है।\n\n### प्र3. सूखे मौसम (नवंबर से अप्रैल) में फू क्वोक का मौसम कैसा रहता है?\nनवंबर से शुरू होने वाले सूखे मौसम में नगण्य बारिश, साफ आसमान और शांत समुद्र रहता है, जो फू क्वोक की यात्रा का सबसे बेहतरीन मौसम है। यह सूर्यास्त देखने और बाहरी गतिविधियों के लिए सबसे अनुकूल समय है।\n\n---\n\n## स्रोत (Sources)\n\n- Vietnam News रिपोर्ट (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress रिपोर्ट (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV रिपोर्ट (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "faqs": [
    {
      "question": "How much time is needed to explore Sunset Town?",
      "answer": "This is a suggested itinerary by our editorial team: allowing half a day or more (approx. 8–10 hours) from daytime through the evening is recommended for the full course including the cable car and night show. For a relaxed stroll, sunset viewing, and dinner, arriving around 16:00 for a 4–5 hour visit is ideal."
    },
    {
      "question": "How does VUI-Fest Bazaar differ from Duong Dong Night Market?",
      "answer": "While Duong Dong Night Market in central Phu Quoc offers a traditional and bustling local market experience, the southern VUI-Fest Bazaar offers a contemporary, neatly organized promenade setting with street entertainment and seaside views."
    },
    {
      "question": "What is Phu Quoc's weather like during the dry season (November to April)?",
      "answer": "The dry season beginning in November brings minimal rainfall, clear skies, and calm seas, marking Phu Quoc's peak travel season. It provides optimal conditions for comfortable sunset viewing and outdoor sightseeing."
    }
  ],
  "faqs_ko": [
    {
      "question": "선셋타운을 둘러보는 데 소요되는 시간은 어느 정도인가요?",
      "answer": "본 코스는 마이푸꾸옥 편집팀이 구성한 제안 코스로, 케이블카와 야간 쇼를 모두 포함하는 풀코스를 즐기신다면 낮부터 밤까지 반나절 이상(약 8~10시간)을 권장합니다. 산책과 일몰 관람, 저녁 식사 위주라면 오후 16시경에 도착해 4~5시간 머무르는 일정이 적당합니다."
    },
    {
      "question": "즈엉동 야시장과 부이페스트 야시장의 차이점은 무엇인가요?",
      "answer": "중부 즈엉동 야시장이 전통적이고 활기찬 재래 야시장 분위기라면, 남부 부이페스트 바자 야시장은 해안 산책로를 따라 깔끔하게 정비된 부스에서 거리 공연과 함께 바다 전망을 즐길 수 있는 현대적인 분위기의 해변 야시장입니다."
    },
    {
      "question": "건기(11월~4월) 푸꾸옥 날씨는 여행하기에 어떤가요?",
      "answer": "11월부터 시작되는 건기는 비가 거의 내리지 않고 맑은 하늘과 잔잔한 바다가 이어지는 푸꾸옥 여행 성수기입니다. 쾌적한 환경에서 일몰을 감상하고 야외 활동을 즐기기에 적합한 시기입니다."
    }
  ],
  "faqs_zh": [
    {
      "question": "游览日落小镇建议预留多少时间？",
      "answer": "本路线为编辑团队制定的建议路线：若包含缆车及夜间演出的全套体验，建议安排白天至夜晚大半天时间（约8至10小时）。若仅安排散步、日落观赏及晚餐，下午16:00左右到达游览4至5小时即可。"
    },
    {
      "question": "阳东夜市与 VUI-Fest 夜市有何区别？",
      "answer": "中部阳东夜市更偏向传统热闹的在地传统夜市，而南部VUI-Fest Bazaar 夜市则是沿海滨步道规范建设、融合街头表演与海景的现代时尚海滩夜市。"
    },
    {
      "question": "旱季（11月至次年4月）富国岛天气适合旅行吗？",
      "answer": "11月起进入的旱季降雨稀少、晴空万里、风平浪静，是富国岛的黄金旅游季节，非常适宜舒适地观赏日落及开展户外活动。"
    }
  ],
  "faqs_ru": [
    {
      "question": "Сколько времени требуется на осмотр Сансет Тауна?",
      "answer": "Это рекомендованный маршрут от редакции: на полную программу с канатной дорогой и вечерним шоу рекомендуется выделить от полудня до вечера (около 8–10 часов). Если цель визита — спокойная прогулка, закат и ужин, достаточно приехать к 16:00 на 4–5 часов."
    },
    {
      "question": "В чем разница между ночным рынком Зыонгдонг и рынком VUI-Fest?",
      "answer": "Если ночной рынок в Зыонгдонге (центр острова) представляет собой классический азиатский базар, то южный рынок VUI-Fest Bazaar — это современное гастрономическое пространство на набережной с морским видом и аккуратными павильонами."
    },
    {
      "question": "Какая погода на Фукуоке в сухой сезон (с ноября по апрель)?",
      "answer": "Сухой сезон, начинающийся в ноябре — это пик туристического сезона на Фукуоке: минимум осадков, чистое небо и спокойное море. Это самое благоприятное время для созерцания закатов и активного отдыха на открытом воздухе."
    }
  ],
  "faqs_ja": [
    {
      "question": "サンセットタウンを巡るのに必要な所要時間はどのくらいですか？",
      "answer": "本コースは編集部による提案コースです。ロープウェイと夜間ショーの両方を含むフルコースを満喫する場合は、日中から夜まで半日以上（約8〜10時間）の確保をおすすめします。散策、夕日観賞、夕食がメインであれば、午後16時頃に到着して4〜5時間滞在するスケジュールが手頃です。"
    },
    {
      "question": "ズオンドン夜市とブイフェスト・バザールの違いは何ですか？",
      "answer": "中部にあるズオンドン夜市が昔ながらの活気あふれる伝統的な市場であるのに対し、南部のブイフェスト・バザール（VUI-Fest Bazaar）は海沿いの遊歩道に沿って清潔に整備され、ストリートパフォーマンスとオーシャンビューを同時に楽しめる現代的なビーチフロントナイトマーケットです。"
    },
    {
      "question": "乾期（11月〜4月）のフーコック島の気候は観光に適していますか？",
      "answer": "11月から始まる乾期は雨がほとんど降らず、澄み渡る青空と穏やかな波が続くフーコック観光のベストシーズンです。快適な環境の中で美しい夕日を眺め、屋外アクティビティを満喫するのに最も適した時期です。"
    }
  ],
  "faqs_hi": [
    {
      "question": "सनसेट टाउन घूमने के लिए कितना समय पर्याप्त है?",
      "answer": "यह संपादकीय टीम द्वारा सुझाया गया मार्ग है: केबल कार और नाइट शो सहित पूरे कार्यक्रम का आनंद लेने के लिए दोपहर से रात तक (लगभग 8–10 घंटे) का समय रखने की सिफारिश की जाती है। यदि केवल सैर, सूर्यास्त और रात का खाना ही प्राथमिकता है, तो शाम 16:00 बजे पहुंचकर 4–5 घंटे रुकना पर्याप्त है।"
    },
    {
      "question": "डुओंग डोंग नाइट मार्केट और VUI-Fest में क्या अंतर है?",
      "answer": "मध्य फू क्वोक का डुओंग डोंग नाइट मार्केट पारंपरिक और चहल-पहल वाला बाज़ार है, जबकि दक्षिणी VUI-Fest Bazaar समुद्र तट के किनारे सुव्यवस्थित, आधुनिक और स्ट्रीट परफॉर्मेंस से युक्त एक खुला बाज़ार है।"
    },
    {
      "question": "सूखे मौसम (नवंबर से अप्रैल) में फू क्वोक का मौसम कैसा रहता है?",
      "answer": "नवंबर से शुरू होने वाले सूखे मौसम में नगण्य बारिश, साफ आसमान और शांत समुद्र रहता है, जो फू क्वोक की यात्रा का सबसे बेहतरीन मौसम है। यह सूर्यास्त देखने और बाहरी गतिविधियों के लिए सबसे अनुकूल समय है।"
    }
  ]
},
]

export const SAMPLE_EVENTS: EventSampleStory[] = [
  // Ryan 지시 (2026-10-26 2단계): sample-thao-dien-weekend-farmers-craft-market 및 sample-riverside-morning-yoga-breathwork-session 영구 삭제 완료 (HTTP 410 반환)
{
    id: 'sample-event-003',
    slug: 'sample-autumn-acoustic-coffee-social-quoc-huong',
    content_type: 'event',
    status: 'published',
    is_sample: true,
    category: 'Community & Culture',
    category_vi: 'Cộng đồng & Văn hóa',
    category_ko: '커뮤니티 · 문화',
    title: '[SAMPLE] Phu Quoc Autumn Acoustic & Neighbor Coffee Social (Past Event)',
    title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Phú Quốc (Đã kết thúc)',
    title_ko: '[샘플] 푸꾸옥 어텀 어쿠스틱 & 이웃 커피 모임 (종료된 행사 예시)',
    subtitle: 'Sample completed event demonstrating the Ended status badge when the event end date has passed.',
    subtitle_vi: 'Bài mẫu sự kiện đã qua nhằm hiển thị trạng thái Đã kết thúc khi qua ngày kết thúc sự kiện.',
    subtitle_ko: '종료일 경과 시 ‘종료(Ended)’ 배지가 표시되는 것을 확인하기 위한 샘플 이벤트 게시물.',
    excerpt: '[SAMPLE — Not a real event] An afternoon acoustic guitar session and specialty pour-over coffee tasting for new and long-time Phu Quoc residents.',
    excerpt_vi: '[BÀI MẪU — Không phải sự kiện thật] Buổi chiều nhạc guitar acoustic và thưởng thức cà phê pha thủ công dành cho cư dân mới và lâu năm tại Phú Quốc.',
    excerpt_ko: '[샘플 — 실제 행사가 아닙니다] 푸꾸옥 신규 전입 주민과 기존 거주민이 함께 어울리는 오후 어쿠스틱 기타 연주 및 핸드드립 커피 시음 모임입니다.',
    body_en: `> **[SAMPLE PREVIEW]** This post is a **sample entry** created to preview the Phu Quoc Events board layout (specifically the **Ended** status badge). It is not a real event and is blocked from search engine indexing (\`noindex\`).

Neighbors gathered on Quoc Huong Street for an informal afternoon of acoustic music, pour-over coffee tasting and practical neighborhood tips for newcomers.

## What happened

- **Specialty coffee tasting**: Local roasters shared single-origin Arabica beans from Lam Dong Province.
- **Acoustic music set**: Two unplugged acoustic sets by resident musicians from 16:00 to 17:30.
- **Newcomer Q&A table**: Practical information on metro commuting, trash collection schedules and pet-friendly parks.

## When & where

- **Date**: October 10, 2026 (15:00 – 18:00) — **Event Ended**
- **Location**: Clock Tower Square, Sunset Town, Phu Quoc

## Good to know

This sample event has an end date in the past (\`2026-10-10\`) so you can verify how completed events display the **Ended / Đã kết thúc / 종료** badge on both the list and detail pages.`,
    body_vi: `> **[BÀI MẪU XEM TRƯỚC]** Đây là **bài viết mẫu** dùng để kiểm tra trạng thái **Đã kết thúc** trên bảng Sự kiện Phú Quốc, không phải sự kiện thực tế và đã được chặn lập chỉ mục tìm kiếm (\`noindex\`).

Buổi chiều giao lưu thân mật trên đường Quốc Hương với âm nhạc acoustic, thưởng thức cà phê pour-over và chia sẻ kinh nghiệm sinh hoạt cho cư dân mới.

## Nội dung chương trình

- **Thưởng thức cà phê đặc sản**: Trải nghiệm hạt Arabica vùng Lâm Đồng pha thủ công.
- **Biểu diễn nhạc Acoustic**: Hai khung giờ nhạc mộc từ 16:00 đến 17:30 của các nghệ sĩ sống tại khu phố.
- **Bàn thông tin cho cư dân mới**: Chia sẻ mẹo đi tàu Metro số 1, lịch thu gom rác và các công viên thân thiện thú cưng.

## Thời gian & địa điểm

- **Thời gian**: 10/10/2026 (15:00 – 18:00) — **Sự kiện đã kết thúc**
- **Địa điểm**: Không gian sân vườn đường Quốc Hương, Phú Quốc, Phú Quốc

## Lưu ý hữu ích

Sự kiện mẫu này có ngày kết thúc trong quá khứ (\`2026-10-10\`) để kiểm tra cách hiển thị nhãn **Ended / Đã kết thúc / 종료** trên trang danh sách và trang chi tiết.`,
    body_ko: `> **[샘플 미리보기 안내]** 이 글은 푸꾸옥 이벤트 게시판의 **‘종료’ 상태 배지** 표시를 확인하기 위해 작성된 **샘플 게시물**입니다. 실제 열린 행사가 아니며 검색엔진 노출이 차단(\`noindex\`)되어 있습니다.

꾸옥흐엉(Quốc Hương) 거리의 가든 라운지에서 푸꾸옥 신규 입주민과 기존 주민들이 함께 핸드드립 커피를 마시며 어쿠스틱 음악을 즐긴 오후 모임입니다.

## 주요 진행 내용

- **스페셜티 커피 테이스팅**: 럼동(Lâm Đồng) 지역 싱글 오리진 아라비카 원두 핸드드립 시음
- **어쿠스틱 기타 라이브**: 오후 4시부터 5시 30분까지 동네 뮤지션들의 언플러그드 공연 진행
- **신규 거주민 생활 정보 나눔**: 메트로 1호선 이용법, 동네 생활 팁, 반려동물 산책 코스 안내

## 일시 및 장소

- **일정**: 2026년 10월 10일 (15:00 – 18:00) — **종료된 이벤트**
- **장소**: 푸꾸옥 꾸옥흐엉 가든 라운지 (Quốc Hương, Phú Quốc, Phú Quốc)

## 참고사항

이 샘플 게시물은 종료일(\`2026-10-10\`)이 과거로 설정되어 있어, 목록과 상세 페이지에서 **Ended / Đã kết thúc / 종료** 배지가 정상적으로 표시되는지 확인하는 용도입니다.`,
    seo_title: '[SAMPLE] Phu Quoc Autumn Acoustic & Coffee Social | My Phu Quoc',
    seo_title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Phú Quốc | My Phu Quoc',
    seo_title_ko: '[샘플] 푸꾸옥 어텀 어쿠스틱 & 이웃 커피 모임 | My Phu Quoc',
    seo_description: '[SAMPLE] Preview completed event entry demonstrating the Ended status badge on the Phu Quoc Events board.',
    seo_description_vi: '[MẪU] Bài xem trước cho sự kiện đã kết thúc trên bảng Sự kiện Phú Quốc.',
    seo_description_ko: '[샘플] 종료일 경과 시 종료 배지 표시를 확인하기 위한 푸꾸옥 이벤트 샘플 글입니다.',
    key_points: [
      '[SAMPLE] Completed event held on October 10, 2026 (demonstrates Ended status badge)',
      'Featured Lam Dong pour-over coffee tasting and acoustic guitar sessions',
      'Included newcomer Q&A on Phu Quoc daily living',
    ],
    key_points_vi: [
      '[MẪU] Sự kiện đã diễn ra ngày 10/10/2026 (minh họa nhãn trạng thái Đã kết thúc)',
      'Thưởng thức cà phê pour-over Lâm Đồng và nhạc guitar acoustic',
      'Chia sẻ kinh nghiệm sinh hoạt tại Phú Quốc cho cư dân mới',
    ],
    key_points_ko: [
      '[샘플] 2026년 10월 10일 종료된 행사 예시 (‘종료’ 배지 동작 확인용)',
      '럼동 싱글오리진 핸드드립 커피 시음 및 어쿠스틱 기타 공연',
      '푸꾸옥 신규 거주민을 위한 동네 생활 정보 교류',
    ],
    callout: 'SAMPLE NOTICE: This listing is a sample post for UI verification only and is excluded from public search indexing.',
    callout_vi: 'THÔNG BÁO BÀI MẪU: Đây là bài đăng mẫu chỉ dùng để kiểm tra giao diện và không xuất hiện trên công cụ tìm kiếm.',
    callout_ko: '샘플 공지: 이 게시물은 게시판 디자인 및 기능 점검을 위한 샘플 데이터이며 외부 검색엔진에 노출되지 않습니다.',
    cover_image_url: '/features/dining_featured_640.webp',
    hero_caption: 'Sample illustration image from existing site stock (/features/dining_featured_640.webp).',
    hero_caption_vi: 'Ảnh minh họa mẫu từ kho ảnh sẵn có của trang (/features/dining_featured_640.webp).',
    hero_caption_ko: '사이트 기존 보유 스톡 이미지를 활용한 샘플 대표 사진입니다 (/features/dining_featured_640.webp).',
    published_at: '2026-10-08T10:00:00+07:00',
    updated_at: '2026-10-10T19:00:00+07:00',
    event_date: '2026-10-10T15:00:00+07:00',
    effective_date: '2026-10-10T18:00:00+07:00', // Ended Oct 10, 2026 -> Ended (종료)
    event_location: 'Sunset Town, Phu Quoc',
    author_name: 'My Phu Quoc Editorial Desk (Sample)',
    tags: ['sample', 'coffee', 'acoustic', 'community', 'cafe', '커피', '어쿠스틱', '카페', 'cà phê'],
  },
]

export function isSampleEventsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_SAMPLE_EVENTS === 'true'
}

export function isSampleEventSlug(slug: string): boolean {
  return SAMPLE_EVENTS.some((x) => x.slug === slug)
}

export function getSampleEventBySlug(slug: string): EventSampleStory | null {
  const published = PUBLISHED_EVENTS.find((x) => x.slug === slug)
  if (published) return published
  if (!isSampleEventsEnabled()) return null
  return SAMPLE_EVENTS.find((x) => x.slug === slug) || null
}

/**
 * 이벤트 종료일(effective_date 또는 event_end_date) 기준 진행 상태 계산
 * - 종료일이 있으면 현재 시각과 비교하여 'ongoing'(진행중) 또는 'ended'(종료) 반환
 * - 종료일이 없으면 null 반환
 */
export function getEventProgressStatus(
  storyOrStart?:
    | { effective_date?: string | null; event_end_date?: string | null }
    | string
    | null,
  endDateOrNow?: string | Date | null
): 'ongoing' | 'ended' | null {
  let endRaw: string | null | undefined = null
  let now = new Date()

  if (typeof storyOrStart === 'object' && storyOrStart !== null) {
    endRaw = storyOrStart.event_end_date || storyOrStart.effective_date
    if (endDateOrNow instanceof Date) {
      now = endDateOrNow
    }
  } else {
    endRaw = typeof endDateOrNow === 'string' ? endDateOrNow : null
  }

  if (!endRaw) return null
  const endDate = new Date(endRaw)
  if (Number.isNaN(endDate.getTime())) return null
  return endDate.getTime() >= now.getTime() ? 'ongoing' : 'ended'
}

export function getEventStatusLabel(
  status: 'ongoing' | 'ended' | null | undefined,
  locale: Locale = 'en'
): string | null {
  if (!status) return null
  if (status === 'ongoing') {
    if (locale === 'vi') return 'Đang diễn ra'
    if (locale === 'ko') return '진행중'
    return 'Ongoing'
  }
  if (locale === 'vi') return 'Đã kết thúc'
  if (locale === 'ko') return '종료'
  return 'Ended'
}

export function getSampleBadgeLabel(locale: Locale = 'en'): string {
  if (locale === 'vi') return 'BÀI MẪU'
  if (locale === 'ko') return '샘플'
  return 'SAMPLE'
}
