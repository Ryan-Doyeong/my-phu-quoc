-- 035_seed_articles_20261103.sql
-- Ryan 승인 완료 신규 5편 발행 시드 SQL (2026-11-03)
BEGIN;

-- 선 시그니처 갤러리 — 선셋타운 중심부, 빌 벤슬리가 설계한 공간
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'sun-signature-gallery-sunset-town-bill-bensley', 'Sun Signature Gallery — Sunset Town Space by Bill Bensley', '선 시그니처 갤러리 — 선셋타운 중심부, 빌 벤슬리가 설계한 공간', 'Architecture & Space', 'news', 'published', TRUE, '2026-11-03', '/stock/sun-signature-gallery-sunset-town-cover.webp', 'AI-generated illustration: Mid Century Modern interior space with afternoon sunlight through tall arched glass doors', 'AI-generated illustration: 아치형 유리문으로 오후 햇빛이 들어오는 미드센추리 모던 양식 실내 공간 일러스트', 'Sun Signature Gallery in central Sunset Town, designed by Bill Bensley in Mid Century Modern style, summarized from official Sun World channel posts.', '선셋타운 중심부에 있는 선 시그니처 갤러리. 빌 벤슬리가 미드센추리 모던 양식으로 설계한 공간을 공식 채널의 소개 내용을 바탕으로 정리했습니다.', 'Sun Signature Gallery — Sunset Town Space by Bill Bensley', '선 시그니처 갤러리 — 선셋타운 중심부, 빌 벤슬리가 설계한 공간', 'Sun Signature Gallery in central Sunset Town, designed by Bill Bensley in Mid Century Modern style, summarized from official Sun World channel posts.', '선셋타운 중심부에 있는 선 시그니처 갤러리. 빌 벤슬리가 미드센추리 모던 양식으로 설계한 공간을 공식 채널의 소개 내용을 바탕으로 정리했습니다.', 'The official Sun World page introduced Sun Signature Gallery, located in the center of [Sunset Town](/news/conde-nast-top-island-sunset-town-course).

## Details Introduced on the Official Channel

- Designed by Bill Bensley in the Mid Century Modern style.
- Afternoon sunlight enters through tall arched glass doors.
- Mustard yellow, emerald green, and red colors are used.
- Chairs, chandeliers, and wall murals were introduced as elements of the space.
- Visitors were encouraged to visit on [Vietnam Culture Day (Ngày Văn hóa Việt Nam) on November 24](/news/vietnam-culture-day-nov-24-sunset-town).

Please check official channels for admission fees and operating hours.

Source: Sun World Paradise Land Phu Quoc Official Facebook (November 2, 2026 post)', '선월드 공식 페이지에서는 [선셋타운](/ko/news/conde-nast-top-island-sunset-town-course) 중심부에 있는 선 시그니처 갤러리(Sun Signature Gallery)를 소개했습니다.

## 공식 채널에서 소개한 내용

- 빌 벤슬리(Bill Bensley)가 미드센추리 모던(Mid Century Modern) 양식으로 설계했습니다.
- 높은 아치형 유리문을 통해 오후 햇빛이 들어옵니다.
- 머스터드 옐로, 에메랄드 그린, 레드 색상이 사용되었습니다.
- 의자, 샹들리에, 벽화가 공간의 구성 요소로 소개되었습니다.
- [11월 24일 베트남 문화의 날(Ngày Văn hóa Việt Nam)](/ko/news/vietnam-culture-day-nov-24-sunset-town)에 방문해 볼 것을 권했습니다.

입장료와 운영시간은 공식 채널에서 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 11월 2일 게시물)', '太阳世界（Sun World）官方页面介绍了位于[日落小镇](/zh/news/conde-nast-top-island-sunset-town-course)中心的Sun Signature Gallery。

## 官方渠道介绍内容

- 由比尔·本斯利（Bill Bensley）以世纪中叶现代（Mid Century Modern）风格设计。
- 午后阳光透过高大的拱形玻璃门照入室内。
- 空间采用了芥末黄、祖母绿和红色。
- 座椅、吊灯与壁画被介绍为该空间的构成要素。
- 官方建议在[11月24日越南文化日（Ngày Văn hóa Việt Nam）](/zh/news/vietnam-culture-day-nov-24-sunset-town)前往参观。

门票价格与开放时间请通过官方渠道确认。

出处：太阳世界富国岛乐园（Sun World Paradise Land Phu Quoc）官方 Facebook（2026年11月2日帖文）', 'На официальной странице Sun World представлена галерея Sun Signature Gallery, расположенная в центральной части [Сансет Тауна](/ru/news/conde-nast-top-island-sunset-town-course).

## Сведения из официального канала

- Пространство спроектировано Биллом Бенсли (Bill Bensley) в стиле мид-сенчури модерн (Mid Century Modern).
- Послеполуденный солнечный свет проникает сквозь высокие арочные стеклянные двери.
- В оформлении использованы горчично-желтый, изумрудно-зеленый и красный цвета.
- Стулья, люстры и настенные росписи представлены как элементы пространства.
- Рекомендовано посетить галерею [24 ноября в День культуры Вьетнама (Ngày Văn hóa Việt Nam)](/ru/news/vietnam-culture-day-nov-24-sunset-town).

Стоимость входа и часы работы уточняйте в официальных каналах.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (публикация от 2 ноября 2026 г.)', 'サンワールド公式ページでは、[サンセットタウン](/ja/news/conde-nast-top-island-sunset-town-course)中心部にあるサン・シグネチャー・ギャラリー（Sun Signature Gallery）が紹介されました。

## 公式チャンネルで紹介された内容

- ビル・ベンスリー（Bill Bensley）がミッドセンチュリーモダン（Mid Century Modern）様式で設計しました。
- 高いアーチ型のガラス扉から午後の日差しが入ります。
- マスタードイエロー、エメラルドグリーン、レッドの色が使われています。
- 椅子、シャンデリア、壁画が空間の構成要素として紹介されました。
- [11月24日のベトナム文化の日（Ngày Văn hóa Việt Nam）](/ja/news/vietnam-culture-day-nov-24-sunset-town)に訪れてみることが勧められています。

入場料と営業時間は公式チャンネルでご確認ください。

出処: サンワールド・パラダイスランド・フーコック（Sun World Paradise Land Phu Quoc）公式Facebook（2026年11月2日投稿）', 'सन वर्ल्ड के आधिकारिक पेज पर [सनसेट टाउन](/hi/news/conde-nast-top-island-sunset-town-course) के केंद्र में स्थित सन सिग्नेचर गैलरी (Sun Signature Gallery) का परिचय दिया गया है।

## आधिकारिक चैनल पर साझा की गई जानकारी

- इसे बिल बेन्सले (Bill Bensley) ने मिड-सेंचुरी मॉडर्न (Mid Century Modern) शैली में डिज़ाइन किया है।
- ऊंचे मेहराबदार कांच के दरवाजों से दोपहर की धूप अंदर आती है।
- इसमें मस्टर्ड येलो, एमराल्ड ग्रीन और लाल रंगों का उपयोग किया गया है।
- कुर्सियों, झूमर और भित्तिचित्रों को इस स्थान के घटकों के रूप में प्रस्तुत किया गया है।
- [24 नवंबर को वियतनाम संस्कृति दिवस (Ngày Văn hóa Việt Nam)](/hi/news/vietnam-culture-day-nov-24-sunset-town) पर यहां जाने का सुझाव दिया गया है।

प्रवेश शुल्क और संचालन समय की जानकारी के लिए कृपया आधिकारिक चैनल देखें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक (Sun World Paradise Land Phu Quoc) आधिकारिक फेसबुक (2 नवंबर 2026 का पोस्ट)'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  body_zh = EXCLUDED.body_zh,
  body_ru = EXCLUDED.body_ru,
  body_ja = EXCLUDED.body_ja,
  body_hi = EXCLUDED.body_hi;

-- 한국 가족이 겨울에 가장 많이 검색한 해외 여행지 1위 푸꾸옥
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'korean-families-winter-top-destination-agoda-phu-quoc', 'Phu Quoc Ranked #1 Winter Destination for Korean Families', '한국 가족이 겨울에 가장 많이 검색한 해외 여행지 1위 푸꾸옥', 'Travel News', 'news', 'published', TRUE, '2026-11-03', '/stock/korean-families-winter-destination-phu-quoc-cover.webp', 'AI-generated illustration: Sunset Town coastline in southern Phu Quoc with sea-crossing cable car and evening fireworks', 'AI-generated illustration: 푸꾸옥 남부 선셋타운 해안과 해상 케이블카, 밤바다 불꽃놀이 일러스트', 'Official Sun World post citing Agoda data on Phu Quoc ranking #1 in winter vacation searches by Korean families (Nov–Jan), plus Sunset Town night shows.', '아고다 최신 데이터에서 푸꾸옥이 한국 가족의 겨울 휴가 검색 1위를 기록했다는 공식 채널의 소개 내용과 선셋타운 야간 쇼 정보.', 'Phu Quoc Ranked #1 Winter Destination for Korean Families', '한국 가족이 겨울에 가장 많이 검색한 해외 여행지 1위 푸꾸옥', 'Official Sun World post citing Agoda data on Phu Quoc ranking #1 in winter vacation searches by Korean families (Nov–Jan), plus Sunset Town night shows.', '아고다 최신 데이터에서 푸꾸옥이 한국 가족의 겨울 휴가 검색 1위를 기록했다는 공식 채널의 소개 내용과 선셋타운 야간 쇼 정보.', 'Citing recent data from Agoda, the official Sun World page introduced Phu Quoc as the #1 most-searched overseas destination by Korean families for winter vacations from November this year through January next year, ahead of cities in Japan and Southeast Asia.

## Details Also Introduced on the Official Channel

- Mentioned [accommodations on the southern island](/news/phu-quoc-south-island-family-pool-villas): Premier Village Phu Quoc Resort, New World Phu Quoc Resort, and JW Marriott Phu Quoc Emerald Bay Resort.
- From Sunset Town (Thị trấn Hoàng Hôn), visitors can take the sea-crossing cable car to Sun World Hòn Thơm.
- At night, [Symphony of the Sea](/news/symphony-of-the-sea-season-3-opening) and [Kiss of the Sea](/news/kiss-of-the-sea-fireworks-viewing-tips) fireworks take place.
- Introduced a direct flight route from Seoul operated by Sun PhuQuoc Airways.

Search figures, flight frequencies, and fares were not included in the official post and have been omitted here. Please check each official channel for schedules and fares.

Source: Sun World Paradise Land Phu Quoc Official Facebook (November 3, 2026 post)', '선월드 공식 페이지에서는 아고다(Agoda)의 최신 데이터를 인용해, 푸꾸옥이 한국 가족이 올해 11월부터 내년 1월까지 겨울 휴가를 위해 가장 많이 검색한 해외 여행지 1위라고 소개했습니다. 일본과 동남아 도시를 앞섰다고 합니다.

## 공식 채널에서 함께 소개한 내용

- [남부 섬의 숙소](/ko/news/phu-quoc-south-island-family-pool-villas)로 프리미어 빌리지 푸꾸옥 리조트(Premier Village Phu Quoc Resort), 뉴 월드 푸꾸옥 리조트(New World Phu Quoc Resort), JW 메리어트 푸꾸옥 에메랄드 베이 리조트(JW Marriott Phu Quoc Emerald Bay Resort)를 언급했습니다.
- 선셋타운(Thị trấn Hoàng Hôn)에서 해상 케이블카를 타고 선월드 혼텀(Sun World Hòn Thơm)에 갈 수 있습니다.
- 밤에는 [심포니 오브 더 씨(Symphony of the Sea)](/ko/news/symphony-of-the-sea-season-3-opening)와 [키스 오브 더 씨(Kiss of the Sea)](/ko/news/kiss-of-the-sea-fireworks-viewing-tips) 불꽃놀이가 열립니다.
- 선 푸꾸옥 에어웨이즈(Sun PhuQuoc Airways)의 서울 직항 노선이 있다고 소개했습니다.

검색 수치, 항공 편수와 요금은 공식 게시물에 없어 싣지 않았습니다. 일정과 요금은 각 공식 채널에서 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 11월 3일 게시물)', '太阳世界（Sun World）官方页面引用Agoda的最新数据介绍称，在今年11月至明年1月的冬季休假期间，富国岛位列韩国家庭搜索量第一的海外旅游目的地，领先于日本及东南亚其他城市。

## 官方渠道一并介绍的内容

- 提及[南部岛屿住宿](/zh/news/phu-quoc-south-island-family-pool-villas)：富国岛翡翠湾高级乡村度假村（Premier Village Phu Quoc Resort）、富国岛新世界度假酒店（New World Phu Quoc Resort）、富国岛翡翠湾JW万豪度假酒店（JW Marriott Phu Quoc Emerald Bay Resort）。
- 从日落小镇（Thị trấn Hoàng Hôn）可搭乘跨海缆车前往太阳世界香岛（Sun World Hòn Thơm）。
- 夜间举行[《海洋交响乐》（Symphony of the Sea）](/zh/news/symphony-of-the-sea-season-3-opening)与[《海洋之吻》（Kiss of the Sea）](/zh/news/kiss-of-the-sea-fireworks-viewing-tips)烟花演出。
- 介绍了Sun PhuQuoc Airways开通的首尔直飞航线。

具体搜索数值、航班班次及票价未在官方帖文中公布，因此本文未予收录。具体日程与费用请通过各官方渠道确认。

出处：太阳世界富国岛乐园（Sun World Paradise Land Phu Quoc）官方 Facebook（2026年11月3日帖文）', 'Официальная страница Sun World со ссылкой на свежие данные Agoda сообщила, что Фукуок занял 1-е место среди зарубежных направлений, которые корейские семьи чаще всего искали для зимнего отпуска в период с ноября этого года по январь следующего года, опередив города Японии и Юго-Восточной Азии.

## Что еще упомянуто в официальном канале

- В качестве [вариантов размещения на юге острова](/ru/news/phu-quoc-south-island-family-pool-villas) названы Premier Village Phu Quoc Resort, New World Phu Quoc Resort и JW Marriott Phu Quoc Emerald Bay Resort.
- Из Сансет Тауна (Thị trấn Hoàng Hôn) по морской канатной дороге можно добраться до Sun World Hòn Thơm.
- Вечером проводятся шоу и фейерверки [Symphony of the Sea](/ru/news/symphony-of-the-sea-season-3-opening) и [Kiss of the Sea](/ru/news/kiss-of-the-sea-fireworks-viewing-tips).
- Упомянут прямой авиарейс из Сеула авиакомпании Sun PhuQuoc Airways.

Численные показатели поиска, количество рейсов и тарифы в официальной публикации отсутствуют, поэтому здесь не приводятся. Расписание и стоимость уточняйте в соответствующих официальных каналах.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (публикация от 3 ноября 2026 г.)', 'サンワールド公式ページでは、アゴダ（Agoda）の最新データを引用し、今年11月から来年1月までの冬休みに向けて韓国の家族が最も多く検索した海外旅行先1位がフーコック島であると紹介されました。日本や東南アジアの都市を上回ったとされています。

## 公式チャンネルであわせて紹介された内容

- [南部の島の宿泊施設](/ja/news/phu-quoc-south-island-family-pool-villas)として、プレミア・ビレッジ・フーコック・リゾート（Premier Village Phu Quoc Resort）、ニューワールド・フーコック・リゾート（New World Phu Quoc Resort）、JWマリオット・フーコック・エメラルド・ベイ・リゾート（JW Marriott Phu Quoc Emerald Bay Resort）が挙げられました。
- サンセットタウン（Thị trấn Hoàng Hôn）から海上ケーブルカーに乗ってサンワールド・ホントム（Sun World Hòn Thơm）へ行くことができます。
- 夜には[シンフォニー・オブ・ザ・シー（Symphony of the Sea）](/ja/news/symphony-of-the-sea-season-3-opening)と[キス・オブ・ザ・シー（Kiss of the Sea）](/ja/news/kiss-of-the-sea-fireworks-viewing-tips)の花火が開催されます。
- サン・フーコック・エアウェイズ（Sun PhuQuoc Airways）のソウル直行便があると紹介されました。

検索数値、運航便数、料金は公式投稿に記載がないため掲載していません。日程や料金は各公式チャンネルでご確認ください。

出処: サンワールド・パラダイスランド・フーコック（Sun World Paradise Land Phu Quoc）公式Facebook（2026年11月3日投稿）', 'सन वर्ल्ड के आधिकारिक पेज ने अगोडा (Agoda) के नवीनतम डेटा का हवाला देते हुए बताया है कि इस वर्ष नवंबर से अगले वर्ष जनवरी तक सर्दियों की छुट्टियों के लिए कोरियाई परिवारों द्वारा सबसे अधिक खोजा गया नंबर 1 विदेशी यात्रा गंतव्य फू क्वोक है। यह जापान और दक्षिण-पूर्व एशिया के शहरों से आगे रहा।

## आधिकारिक चैनल पर साथ में साझा की गई जानकारी

- [दक्षिणी द्वीप के आवास](/hi/news/phu-quoc-south-island-family-pool-villas) के रूप में प्रीमियर विलेज फू क्वोक रिसॉर्ट (Premier Village Phu Quoc Resort), न्यू वर्ल्ड फू क्वोक रिसॉर्ट (New World Phu Quoc Resort), और जेडब्ल्यू मैरियट फू क्वोक एमराल्ड बे रिसॉर्ट (JW Marriott Phu Quoc Emerald Bay Resort) का उल्लेख किया गया।
- सनसेट टाउन (Thị trấn Hoàng Hôn) से समुद्री केबल कार द्वारा सन वर्ल्ड होन थोम (Sun World Hòn Thơm) जाया जा सकता है।
- रात में [सिम्फनी ऑफ द सी (Symphony of the Sea)](/hi/news/symphony-of-the-sea-season-3-opening) और [किस ऑफ द सी (Kiss of the Sea)](/hi/news/kiss-of-the-sea-fireworks-viewing-tips) की आतिशबाजी होती है।
- सन फू क्वोक एयरवेज (Sun PhuQuoc Airways) की सियोल सीधी उड़ान के बारे में बताया गया है।

खोज के आंकड़े, उड़ानों की संख्या और किराए आधिकारिक पोस्ट में नहीं दिए गए हैं, इसलिए उन्हें यहां शामिल नहीं किया गया है। समय-सारणी और शुल्क के लिए कृपया संबंधित आधिकारिक चैनल देखें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक (Sun World Paradise Land Phu Quoc) आधिकारिक फेसबुक (3 नवंबर 2026 का पोस्ट)'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  body_zh = EXCLUDED.body_zh,
  body_ru = EXCLUDED.body_ru,
  body_ja = EXCLUDED.body_ja,
  body_hi = EXCLUDED.body_hi;

-- 가족 여행 숙소 — 남부 섬의 개인 수영장 빌라
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'phu-quoc-south-island-family-pool-villas', 'Family Stay — Private Pool Villas on Phu Quoc South Island', '가족 여행 숙소 — 남부 섬의 개인 수영장 빌라', 'Resort & Stay', 'news', 'published', TRUE, '2026-11-03', '/stock/phu-quoc-south-island-family-pool-villas-cover.webp', 'AI-generated illustration: Southern Phu Quoc resort villa with a private swimming pool and shared living room', 'AI-generated illustration: 푸꾸옥 남부 섬의 개인 수영장과 공용 거실을 갖춘 빌라 일러스트', 'Three resorts and private pool villas on Phu Quoc''s southern island mentioned on the official channel as reference information for family travelers.', '공식 채널에서 소개한 푸꾸옥 남부 섬의 리조트 3곳과 개인 수영장 빌라. 가족 단위 여행객을 위한 숙소 참고 정보.', 'Family Stay — Private Pool Villas on Phu Quoc South Island', '가족 여행 숙소 — 남부 섬의 개인 수영장 빌라', 'Three resorts and private pool villas on Phu Quoc''s southern island mentioned on the official channel as reference information for family travelers.', '공식 채널에서 소개한 푸꾸옥 남부 섬의 리조트 3곳과 개인 수영장 빌라. 가족 단위 여행객을 위한 숙소 참고 정보.', 'The official post mentioned three resorts on the southern island of Phu Quoc as accommodations for family travel:

- Premier Village Phu Quoc Resort
- New World Phu Quoc Resort
- JW Marriott Phu Quoc Emerald Bay Resort

## Details Introduced on the Official Channel

- Villas with private swimming pools are available.
- With separated bedrooms and a shared living room, the layout was introduced as suitable for three generations staying together.

Room rates, room counts, and promotions were not included in the official post and have been omitted here. Please check each property''s official guidance before booking.

Source: Sun World Paradise Land Phu Quoc Official Facebook (November 3, 2026 post)', '공식 게시물에서는 가족 여행 숙소로 푸꾸옥 남부 섬에 있는 리조트 세 곳을 언급했습니다.

- 프리미어 빌리지 푸꾸옥 리조트(Premier Village Phu Quoc Resort)
- 뉴 월드 푸꾸옥 리조트(New World Phu Quoc Resort)
- JW 메리어트 푸꾸옥 에메랄드 베이 리조트(JW Marriott Phu Quoc Emerald Bay Resort)

## 공식 채널에서 소개한 내용

- 개인 수영장이 딸린 빌라가 있다고 합니다.
- 침실이 분리되어 있고 공용 거실을 갖추고 있어 3대가 함께 이용하기에 적합하다고 소개했습니다.

요금, 객실 수, 프로모션은 공식 게시물에 없어 싣지 않았습니다. 예약 전 각 숙소의 공식 안내를 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 11월 3일 게시물)', '官方帖文提及了位于富国岛南部岛屿的三处度假村作为家庭旅行住宿：

- 富国岛翡翠湾高级乡村度假村（Premier Village Phu Quoc Resort）
- 富国岛新世界度假酒店（New World Phu Quoc Resort）
- 富国岛翡翠湾JW万豪度假酒店（JW Marriott Phu Quoc Emerald Bay Resort）

## 官方渠道介绍内容

- 设有配备私人泳池的别墅。
- 卧室相互独立并配有公共客厅，官方介绍称适合三代同堂共同入住。

房价、客房数量及促销活动未在官方帖文中公布，因此本文未予收录。预订前请确认各住宿机构的官方说明。

出处：太阳世界富国岛乐园（Sun World Paradise Land Phu Quoc）官方 Facebook（2026年11月3日帖文）', 'В официальной публикации в качестве вариантов размещения для семейной поездки упомянуты три курорта в южной части острова Фукуок:

- Premier Village Phu Quoc Resort
- New World Phu Quoc Resort
- JW Marriott Phu Quoc Emerald Bay Resort

## Сведения из официального канала

- Сообщается о наличии вилл с собственным бассейном.
- Отмечено, что благодаря раздельным спальням и общей гостиной такие виллы подходят для совместного проживания трех поколений семьи.

Тарифы, количество номеров и акции в официальной публикации не указаны, поэтому здесь не приводятся. Перед бронированием ознакомьтесь с официальной информацией каждого отеля.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (публикация от 3 ноября 2026 г.)', '公式投稿では、家族旅行の宿泊先としてフーコック島南部にある3つのリゾートが挙げられました。

- プレミア・ビレッジ・フーコック・リゾート（Premier Village Phu Quoc Resort）
- ニューワールド・フーコック・リゾート（New World Phu Quoc Resort）
- JWマリオット・フーコック・エメラルド・ベイ・リゾート（JW Marriott Phu Quoc Emerald Bay Resort）

## 公式チャンネルで紹介された内容

- プライベートプール付きのヴィラがあるとされています。
- 寝室が分かれており共用のリビングルームを備えているため、3世代での滞在に適していると紹介されました。

料金、客室数、プロモーションは公式投稿に記載がないため掲載していません。ご予約前に各宿泊施設の公式案内をご確認ください。

出処: サンワールド・パラダイスランド・フーコック（Sun World Paradise Land Phu Quoc）公式Facebook（2026年11月3日投稿）', 'आधिकारिक पोस्ट में पारिवारिक यात्रा आवास के रूप में दक्षिणी फू क्वोक द्वीप पर स्थित तीन रिसॉर्ट्स का उल्लेख किया गया है:

- प्रीमियर विलेज फू क्वोक रिसॉर्ट (Premier Village Phu Quoc Resort)
- न्यू वर्ल्ड फू क्वोक रिसॉर्ट (New World Phu Quoc Resort)
- जेडब्ल्यू मैरियट फू क्वोक एमराल्ड बे रिसॉर्ट (JW Marriott Phu Quoc Emerald Bay Resort)

## आधिकारिक चैनल पर साझा की गई जानकारी

- यहां निजी स्विमिंग पूल वाले विला उपलब्ध हैं।
- अलग बेडरूम और साझा लिविंग रूम होने के कारण इन्हें तीन पीढ़ियों के एक साथ ठहरने के लिए उपयुक्त बताया गया है।

किराया, कमरों की संख्या और प्रमोशन की जानकारी आधिकारिक पोस्ट में नहीं दी गई है, इसलिए उन्हें यहां शामिल नहीं किया गया है। बुकिंग से पहले कृपया प्रत्येक रिसॉर्ट के आधिकारिक दिशानिर्देश देखें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक (Sun World Paradise Land Phu Quoc) आधिकारिक फेसबुक (3 नवंबर 2026 का पोस्ट)'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  body_zh = EXCLUDED.body_zh,
  body_ru = EXCLUDED.body_ru,
  body_ja = EXCLUDED.body_ja,
  body_hi = EXCLUDED.body_hi;

-- 11월 24일 베트남 문화의 날 — 선셋타운에서 보내는 하루 참고
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'vietnam-culture-day-nov-24-sunset-town', 'Vietnam Culture Day (Nov 24) — Sunset Town Visit Notes', '11월 24일 베트남 문화의 날 — 선셋타운에서 보내는 하루 참고', 'Culture & Notice', 'news', 'published', TRUE, '2026-11-03', '/stock/vietnam-culture-day-nov-24-sunset-town-cover.webp', 'AI-generated illustration: Central plaza and gallery exterior with arched doorways in Sunset Town, Phu Quoc', 'AI-generated illustration: 푸꾸옥 선셋타운 중심부 광장과 아치형 출입구 건축 외관 일러스트', 'Verified details from official Sun World posts mentioning Vietnam Culture Day on November 24 and an upcoming Culture Week (Tuần lễ Văn hóa) in Sunset Town.', '공식 채널에서 언급한 11월 24일 베트남 문화의 날과 곧 열릴 예정이라고 예고한 문화 주간. 확인된 정보만 정리했습니다.', 'Vietnam Culture Day (Nov 24) — Sunset Town Visit Notes', '11월 24일 베트남 문화의 날 — 선셋타운에서 보내는 하루 참고', 'Verified details from official Sun World posts mentioning Vietnam Culture Day on November 24 and an upcoming Culture Week (Tuần lễ Văn hóa) in Sunset Town.', '공식 채널에서 언급한 11월 24일 베트남 문화의 날과 곧 열릴 예정이라고 예고한 문화 주간. 확인된 정보만 정리했습니다.', 'On the official Sun World page, visitors were encouraged to visit [Sun Signature Gallery (see Article 1)](/news/sun-signature-gallery-sunset-town-bill-bensley) on November 24, Vietnam Culture Day. In addition, a video post previewed an "upcoming Culture Week (Tuần lễ Văn hóa)."

Currently, those two points are the only details confirmed in the official posts. Specific dates and programs for Culture Week, as well as event details for November 24, have not yet been announced. This article will be updated once new official guidance is released.

Source: Sun World Paradise Land Phu Quoc Official Facebook (November 2, 2026 post)', '선월드 공식 페이지에서는 11월 24일 베트남 문화의 날에 [선 시그니처 갤러리(글 1 참고)](/ko/news/sun-signature-gallery-sunset-town-bill-bensley)를 방문해 볼 것을 권했습니다. 또 영상 게시물에서는 "곧 있을 문화 주간(Tuần lễ Văn hóa)"을 예고했습니다.

현재 공식 게시물에서 확인할 수 있는 내용은 위 두 가지뿐입니다. 문화 주간의 날짜와 프로그램, 11월 24일 행사 내용은 아직 안내되지 않았습니다. 새로운 안내가 나오면 이 글을 갱신하겠습니다.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 11월 2일 게시물)', '太阳世界（Sun World）官方页面建议游客在11月24日越南文化日当天前往参观[Sun Signature Gallery（参见第1篇）](/zh/news/sun-signature-gallery-sunset-town-bill-bensley)。此外，官方视频帖文中还预告了“即将到来的文化周（Tuần lễ Văn hóa）”。

目前从官方帖文中能够确认的内容仅限上述两项。文化周的具体日期与节目安排，以及11月24日当天的活动详情尚未公布。待官方发布新通知后，本文将予以更新。

出处：太阳世界富国岛乐园（Sun World Paradise Land Phu Quoc）官方 Facebook（2026年11月2日帖文）', 'На официальной странице Sun World рекомендовано посетить [Sun Signature Gallery (см. статью 1)](/ru/news/sun-signature-gallery-sunset-town-bill-bensley) 24 ноября, в День культуры Вьетнама. Кроме того, в видеопубликации была анонсирована «предстоящая Неделя культуры (Tuần lễ Văn hóa)».

На данный момент эти два пункта — единственные сведения, которые можно подтвердить по официальным публикациям. Даты и программа Недели культуры, а также расписание мероприятий на 24 ноября пока не объявлены. Мы обновим эту статью после выхода новой официальной информации.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (публикация от 2 ноября 2026 г.)', 'サンワールド公式ページでは、11月24日のベトナム文化の日に[サン・シグネチャー・ギャラリー（記事1参照）](/ja/news/sun-signature-gallery-sunset-town-bill-bensley)を訪れてみることが勧められています。また、動画投稿では「まもなく開催される文化週間（Tuần lễ Văn hóa）」が予告されました。

現在、公式投稿から確認できる内容は上記の2点のみです。文化週間の日程やプログラム、11月24日の行事内容はまだ案内されていません。新しい案内が出次第、この記事を更新します。

出処: サンワールド・パラダイスランド・フーコック（Sun World Paradise Land Phu Quoc）公式Facebook（2026年11月2日投稿）', 'सन वर्ल्ड के आधिकारिक पेज पर 24 नवंबर को वियतनाम संस्कृति दिवस के अवसर पर [सन सिग्नेचर गैलरी (लेख 1 देखें)](/hi/news/sun-signature-gallery-sunset-town-bill-bensley) जाने का सुझाव दिया गया है। इसके अतिरिक्त, एक वीडियो पोस्ट में "शीघ्र होने वाले संस्कृति सप्ताह (Tuần lễ Văn hóa)" की झलक दी गई है।

वर्तमान में आधिकारिक पोस्ट से केवल उपरोक्त दो बातों की ही पुष्टि होती है। संस्कृति सप्ताह की तारीखों और कार्यक्रम, तथा 24 नवंबर के आयोजन का विवरण अभी घोषित नहीं किया गया है। नई जानकारी आने पर इस लेख को अपडेट किया जाएगा।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक (Sun World Paradise Land Phu Quoc) आधिकारिक फेसबुक (2 नवंबर 2026 का पोस्ट)'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  body_zh = EXCLUDED.body_zh,
  body_ru = EXCLUDED.body_ru,
  body_ja = EXCLUDED.body_ja,
  body_hi = EXCLUDED.body_hi;

-- 푸꾸옥 건축 속 베트남의 흔적 — 후에, 호이안, 프랑스풍, 어촌
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'phu-quoc-architecture-vietnamese-heritage', 'Vietnamese Traces in Phu Quoc Architecture — Hue & Hoi An', '푸꾸옥 건축 속 베트남의 흔적 — 후에, 호이안, 프랑스풍, 어촌', 'Architecture & Culture', 'news', 'published', TRUE, '2026-11-03', '/stock/phu-quoc-architecture-vietnamese-heritage-cover.webp', 'AI-generated illustration: Red and gold tones with bronze cauldron, lanterns, French-style facade, and leaf roof with bamboo', 'AI-generated illustration: 붉은색과 황금색 및 청동 솥, 등불, 프랑스풍 건축, 잎 지붕과 대나무 어촌 요소 일러스트', 'Elements of Phu Quoc architecture from an official Sun World video: Hue imperial style, Hoi An lanterns, French-style buildings, and fishing village roof.', '공식 영상에서 소개한 푸꾸옥 건축의 후에 왕궁풍, 호이안 등불, 프랑스풍, 어촌 분위기 요소.', 'Vietnamese Traces in Phu Quoc Architecture — Hue & Hoi An', '푸꾸옥 건축 속 베트남의 흔적 — 후에, 호이안, 프랑스풍, 어촌', 'Elements of Phu Quoc architecture from an official Sun World video: Hue imperial style, Hoi An lanterns, French-style buildings, and fishing village roof.', '공식 영상에서 소개한 푸꾸옥 건축의 후에 왕궁풍, 호이안 등불, 프랑스풍, 어촌 분위기 요소.', 'Through a video post, the official Sun World page introduced the architecture of [Phu Quoc](/news/conde-nast-top-island-sunset-town-course) from the perspective of Vietnamese cultural identity. The elements mentioned in the video are as follows:

- Hue imperial style: red and gold colors, bronze cauldrons
- Hoi An lanterns
- French-style architecture
- Fishing village atmosphere with leaf-thatched roofs and bamboo

Which specific facilities correspond to each architectural style was not stated in the official post and has been omitted here.

Source: Sun World Paradise Land Phu Quoc Official Facebook (November 2, 2026 video post)', '선월드 공식 페이지에서는 영상을 통해 [푸꾸옥](/ko/news/conde-nast-top-island-sunset-town-course)의 건축을 베트남의 문화적 정체성이라는 관점에서 소개했습니다. 영상에서 언급한 요소는 다음과 같습니다.

- 후에 왕궁풍: 붉은색과 황금색, 청동 솥
- 호이안 등불
- 프랑스풍 건축
- 잎으로 얹은 지붕과 대나무가 있는 어촌 분위기

어느 시설이 어느 양식에 해당하는지는 공식 게시물에 적혀 있지 않아 싣지 않았습니다.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 11월 2일 영상 게시물)', '太阳世界（Sun World）官方页面通过视频，从越南文化认同的视角介绍了[富国岛](/zh/news/conde-nast-top-island-sunset-town-course)的建筑。视频中提及的元素如下：

- 顺化皇城风格：红色与金色、青铜鼎
- 会安灯笼
- 法式建筑
- 树叶铺顶与翠竹相伴的渔村氛围

具体哪一处设施对应哪一种建筑风格未在官方帖文中注明，因此本文未予收录。

出处：太阳世界富国岛乐园（Sun World Paradise Land Phu Quoc）官方 Facebook（2026年11月2日视频帖文）', 'На официальной странице Sun World в видеоролике архитектура [Фукуока](/ru/news/conde-nast-top-island-sunset-town-course) была представлена с точки зрения культурной идентичности Вьетнама. В видео упомянуты следующие элементы:

- Императорский стиль Хюэ: красный и золотой цвета, бронзовые котлы
- Фонарики Хойана
- Французская архитектура
- Атмосфера рыбацкой деревни с крышами из листьев и бамбуком

Какие именно объекты относятся к каждому из стилей, в официальной публикации не указано, поэтому эти сведения здесь не приводятся.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (видеопубликация от 2 ноября 2026 г.)', 'サンワールド公式ページでは、動画を通じて[フーコック島](/ja/news/conde-nast-top-island-sunset-town-course)の建築がベトナムの文化的アイデンティティという観点から紹介されました。動画内で言及された要素は次のとおりです。

- フエ王宮風：赤色と金色、青銅の鼎（かなえ）
- ホイアンのランタン
- フランス風建築
- 葉で葺いた屋根と竹がある漁村の雰囲気

どの施設がどの様式に該当するかは公式投稿に記載されていないため掲載していません。

出処: サンワールド・パラダイスランド・フーコック（Sun World Paradise Land Phu Quoc）公式Facebook（2026年11月2日動画投稿）', 'सन वर्ल्ड के आधिकारिक पेज ने एक वीडियो के माध्यम से वियतनाम की सांस्कृतिक पहचान के दृष्टिकोण से [फू क्वोक](/hi/news/conde-nast-top-island-sunset-town-course) की वास्तुकला का परिचय दिया है। वीडियो में उल्लिखित तत्व इस प्रकार हैं:

- ह्यू शाही शैली: लाल और सुनहरा रंग, कांस्य के पात्र (कड़ाही/कलश)
- होई आन के लालटेन
- फ्रेंच शैली की वास्तुकला
- पत्तों से बनी छत और बांस के साथ मछुआरा गांव का माहौल

कौन सी सुविधा किस शैली से संबंधित है, यह आधिकारिक पोस्ट में नहीं लिखा गया है, इसलिए इसे यहां शामिल नहीं किया गया है।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक (Sun World Paradise Land Phu Quoc) आधिकारिक फेसबुक (2 नवंबर 2026 का वीडियो पोस्ट)'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  body_zh = EXCLUDED.body_zh,
  body_ru = EXCLUDED.body_ru,
  body_ja = EXCLUDED.body_ja,
  body_hi = EXCLUDED.body_hi;

COMMIT;
