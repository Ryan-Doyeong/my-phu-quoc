-- 028_seed_articles_halloween_gastropub_dessert_golf_walk.sql
-- Ryan 승인 완료 신규 5편 발행 시드 SQL
BEGIN;

-- 푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'phu-quoc-halloween-sunset-town-hon-thom', 'Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points', '푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내', 'Event & Festival', 'news', 'published', TRUE, '2026-10-29T10:05:00+07:00', '/stock/phu-quoc-halloween-sunset-town-cover.webp', 'AI-generated illustration: Sunset Town European-style street at sunset with two figures in simple costume viewed from behind', 'AI-generated illustration: 선셋타운 유럽풍 거리의 해 질 녘, 간단한 분장을 한 두 사람의 뒷모습 일러스트', 'Official announcement from Sun World for Halloween (October 31) featuring dozens of check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.', '2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.', 'Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points', '푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내', 'Official announcement from Sun World for Halloween (October 31) featuring dozens of check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.', '2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.', '## [1] Event Overview

Leading up to Halloween (October 31), the official Sun World channel has introduced a filming and photo opportunity at dozens of check-in points arranged throughout Sunset Town and Hon Thom (Hòn Thơm) in southern Phu Quoc.

## [2] What Is the Event About?

In the official promotional video, two individuals dressed in simple ghost costumes explore both destinations while recording photos and video clips. According to the announcement, visitors are invited to participate even with minimal costumes. The check-in locations span dozens of spots across both Sunset Town and Hon Thom.

## [3] Inquiries & Official Channels

- **Sun World Hon Thom Hotline**: 088.604.5888
- **Email**: thomisland@sunworld.vn

Please verify exact daily schedules and participation details directly via the official channels before visiting.

## [4] Related Sunset Town Guides

For visitors exploring southern Phu Quoc during this season:
- [Symphony of the Sea Season 3 Opening Guide](/news/symphony-of-the-sea-season-3-opening)
- [Sunset Town Romantic Walking Course](/news/sunset-town-romantic-walking-course)

Source: Sun World Paradise Land Phu Quoc Official Facebook (October 2026)', '## [1] 이벤트 개요

선월드 공식 페이지에서는 핼러윈(10월 31일)을 앞두고 선셋타운과 혼텀(Hòn Thơm)에 마련된 십수 곳의 체크인 포인트에서 핼러윈 사진과 영상을 촬영해 보라고 안내했습니다.

## [2] 어떤 이벤트인가요?

공식 영상에서는 두 사람이 귀신으로 분장한 채 두 곳을 돌아다니며 촬영하는 모습을 보여 줍니다. 간단한 분장만으로도 참여할 수 있다고 안내되어 있습니다. 체크인 포인트는 선셋타운과 혼텀을 합쳐 십수 곳입니다.

## [3] 문의 및 공식 채널

- **선월드 혼텀 핫라인**: 088.604.5888
- **이메일**: thomisland@sunworld.vn

일정과 자세한 참여 방법은 공식 채널의 최신 안내를 확인해 주세요.

## [4] 연계 추천 정보

선셋타운을 함께 둘러보시려면 아래 가이드를 참고하세요:
- [심포니 오브 더 씨 시즌 3 개막 안내](/ko/news/symphony-of-the-sea-season-3-opening)
- [선셋타운 로맨틱 산책 코스](/ko/news/sunset-town-romantic-walking-course)

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 10월)', '## [1] 活动概述

在万圣节（10月31日）到来之际，太阳世界（Sun World）官方页面向游客推介在富国岛日落小镇与香岛（Hòn Thơm）设立的数十处打卡点拍摄万圣节照片与视频。

## [2] 活动内容

官方视频中展示了两位装扮成鬼怪造型的人物在日落小镇与香岛两地穿梭拍摄的画面。官方说明指出，仅需简单的装扮即可参与体验。打卡点遍布日落小镇与香岛数十处位置。

## [3] 咨询与官方渠道

- **太阳世界香岛热线**：088.604.5888
- **电子邮箱**：thomisland@sunworld.vn

活动具体日程与详细参与方式请以官方渠道最新通知为准。

## [4] 相关游览指南

如需游览日落小镇周边，可参考：
- [《海洋交响乐》第3季开幕指南](/zh/news/symphony-of-the-sea-season-3-opening)
- [日落小镇浪漫漫步路线](/zh/news/sunset-town-romantic-walking-course)

出处：Sun World Paradise Land Phu Quoc 官方 Facebook（2026年10月）', '## [1] Обзор события

В преддверии Хэллоуина (31 октября) официальный канал Sun World приглашает гостей сделать памятные фото и видео в десятках точек для чекина, оборудованных в Сансет Тауне и на острове Хон Тхом (Hòn Thơm).

## [2] Формат мероприятия

В официальном видеоролике показаны двое участников в простых костюмах призраков, перемещающихся по локациям Сансет Тауна и острова Хон Тхом. Согласно анонсу, принять участие в съемках можно даже в самом простом гриме или наряде. Всего в обеих зонах подготовлено несколько десятков тематических точек.

## [3] Контакты и справки

- **Горячая линия Sun World Hon Thom**: 088.604.5888
- **Эл. почта**: thomisland@sunworld.vn

Точное расписание и подробности участия уточняйте в официальных источниках перед визитом.

## [4] Полезные материалы по Сансет Тауну

- [Шоу «Симфония моря» — открытие 3-го сезона](/ru/news/symphony-of-the-sea-season-3-opening)
- [Романтический пешеходный маршрут по Сансет Тауну](/ru/news/sunset-town-romantic-walking-course)

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (октябрь 2026)', '## [1] イベントの概要

ハロウィン（10月31日）を控え、サンワールド公式ページにおいて、サンセットタウンとホントム島（Hòn Thơm）の十数カ所に設置されたチェックインポイントでの写真・動画撮影の案内が公開されました。

## [2] イベントの内容

公式動画では、簡単な仮装をした2人が両エリアを巡りながら撮影を楽しむ様子が紹介されています。本格的な準備がなくても、手軽な仮装のみで参加可能と案内されています。撮影ポイントはサンセットタウンとホントム島を合わせて十数カ所設けられています。

## [3] お問い合わせ・公式窓口

- **サンワールド・ホントム ホットライン**: 088.604.5888
- **メール**: thomisland@sunworld.vn

詳細な日程や参加方法については、ご来場前に公式チャンネルの最新案内をご確認ください。

## [4] 関連ガイド

サンセットタウン観光に合わせてこちらもご活用ください：
- [シンフォニー・オブ・ザ・シー シーズン3開幕ガイド](/ja/news/symphony-of-the-sea-season-3-opening)
- [サンセットタウン散策コース](/ja/news/sunset-town-romantic-walking-course)

出処: サンワールド・パラダイスランド・フーコック公式Facebook（2026年10月）', '## [1] कार्यक्रम सारांश

हैलोवीन (31 अक्टूबर) से पहले सन वर्ल्ड के आधिकारिक चैनल ने दक्षिणी फू क्वोक के सनसेट टाउन और होन थोम (Hòn Thơm) में स्थापित दर्जनों चेक-इन पॉइंट्स पर फोटो और वीडियो शूट करने की घोषणा की है।

## [2] इस कार्यक्रम में क्या है?

आधिकारिक वीडियो में दो व्यक्ति सामान्य भूतिया वेशभूषा में दोनों स्थलों का भ्रमण करते हुए तस्वीरें और वीडियो बनाते दिखाई देते हैं। आधिकारिक जानकारी के अनुसार, आगंतुक साधारण वेशभूषा के साथ भी इसमें भाग ले सकते हैं। दोनों क्षेत्रों को मिलाकर दर्जनों चेक-इन पॉइंट्स तैयार किए गए हैं।

## [3] संपर्क और आधिकारिक चैनल

- **सन वर्ल्ड होन थोम हॉटलाइन**: 088.604.5888
- **ईमेल**: thomisland@sunworld.vn

विस्तृत समय-सारणी और भागीदारी के विवरण के लिए कृपया आधिकारिक चैनल की ताज़ा जानकारी देखें।

## [4] संबंधित यात्रा गाइड

सनसेट टाउन की यात्रा के लिए ये गाइड भी देखें:
- [सिम्फनी ऑफ द सी सीजन 3 ओपनिंग गाइड](/hi/news/symphony-of-the-sea-season-3-opening)
- [सनसेट टाउन रोमांटिक वॉक रूट](/hi/news/sunset-town-romantic-walking-course)

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक (अक्टूबर 2026)'
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

-- 선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'sun-bavaria-gastropub-sunset-town-dining', 'Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town', '선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍', 'Dining & Restaurant', 'guide', 'published', TRUE, '2026-10-29T10:04:00+07:00', '/stock/sun-bavaria-gastropub-dining-cover.webp', 'AI-generated illustration: Waterside dining table with seafood, BBQ, and bread at a Sunset Town terrace restaurant', 'AI-generated illustration: 선셋타운 물가 옆 테라스 레스토랑의 해산물과 바비큐, 빵이 놓인 테이블 일러스트', 'Guide to Sun Bavaria GastroPub situated right at the water''s edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.', '푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.', 'Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town', '선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍', 'Guide to Sun Bavaria GastroPub situated right at the water''s edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.', '푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.', '## [1] Overview of Sun Bavaria GastroPub

If you are looking for an evening dining destination in Sunset Town, explore [Sun Bavaria GastroPub](/business/sun-bavaria-gastropub). The official Sun World channel highlighted this venue as a grand feast featuring approximately 100 dishes.

## [2] Features Highlighted by Official Channels

- **Approximately 100 Dishes**: A diverse culinary selection prepared for guests.
- **Seafood & BBQ Menus**: Offering savory grilled items and fresh ocean catches.
- **French Artisanal Bread**: Handcrafted breads baked in traditional French style.
- **Waterfront Location**: Situated directly along the water''s edge.

## [3] Combining Dining with Evening Shows

During the run of [Symphony of the Sea Season 3 (opening November 10)](/news/symphony-of-the-sea-season-3-opening), guests can coordinate evening dining with maritime show viewing within the same immediate district. 

Following dinner, visitors can easily take in the nightly 21:00 [Kiss of the Sea fireworks show](/news/kiss-of-the-sea-fireworks-viewing-tips).

Specific menu offerings and operating arrangements should be confirmed on-site or via official channels.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '## [1] 썬 바바리아 가스트로펍 소개

선셋타운에서 저녁 식사 장소를 찾고 있다면 [썬 바바리아 가스트로펍(Sun Bavaria GastroPub)](/ko/business/sun-bavaria-gastropub)을 확인해 보세요. 선월드 공식 페이지에서는 이곳을 "약 100가지 요리의 대연회"라고 소개했습니다.

## [2] 공식 채널에서 소개한 특징

- **약 100가지 요리**: 다채로운 메뉴 라인업을 갖춘 식당입니다.
- **해산물 & BBQ**: 신선한 해산물과 바비큐 메뉴를 제공합니다.
- **프랑스식 수제 빵**: 식사와 함께 즐길 수 있는 프랑스식 수제 빵을 선보인다고 소개되어 있습니다.
- **위치**: 바다 물가 바로 옆에 자리하고 있습니다.

## [3] 쇼 관람과 연계 팁

[심포니 오브 더 씨 시즌 3(11월 10일 개막)](/ko/news/symphony-of-the-sea-season-3-opening)가 열리는 시기에는 같은 구역에서 쇼 관람과 식사를 함께 계획할 수 있습니다. 

식사 후 21:00에는 인근 해상에서 펼쳐지는 [키스 오브 더 씨(Kiss of the Sea) 불꽃쇼](/ko/news/kiss-of-the-sea-fireworks-viewing-tips)를 감상하기에 좋은 동선입니다.

메뉴 구성과 이용 방법은 현장 또는 공식 채널에서 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '## [1] Sun Bavaria餐厨酒吧简介

若您在日落小镇寻觅晚餐好去处，不妨了解一下[Sun Bavaria餐厨酒吧（Sun Bavaria GastroPub）](/zh/business/sun-bavaria-gastropub)。太阳世界官方页面将其盛赞为“约100道菜肴的大宴席”。

## [2] 官方推介的核心亮点

- **约100道佳肴**：拥有丰富多样的餐饮选择。
- **海鲜与BBQ**：提供风味烧烤与鲜美海味。
- **法式手工面包**：特别推介法式风味烘焙手作面包。
- **临水地理位置**：坐落于日落小镇水岸边。

## [3] 观演与用餐结合建议

在[《海洋交响乐》第3季（11月10日开幕）](/zh/news/symphony-of-the-sea-season-3-opening)上演期间，游客可在同一片区内同步安排观演与晚餐。晚餐后还可便利地观赏每晚21:00上演的[《海洋之吻》烟花大秀](/zh/news/kiss-of-the-sea-fireworks-viewing-tips)。

具体菜单内容与使用规则请以现场或官方渠道说明为准。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', '## [1] О ресторане Sun Bavaria GastroPub

Для вечернего ужина в Сансет Тауне обратите внимание на [Sun Bavaria GastroPub](/ru/business/sun-bavaria-gastropub). На официальной странице Sun World это заведение охарактеризовано как масштабный пир из примерно 100 блюд.

## [2] Особенности из официального анонса

- **Около 100 блюд**: Обширное меню для гостей.
- **Морепродукты и BBQ**: Ассортимент блюд на гриле и даров моря.
- **Французский домашний хлеб**: Свежая ремесленная выпечка во французских традициях.
- **Расположение у кромки воды**: Заведение находится непосредственно на набережной.

## [3] Совмещение с вечерней программой

В период проведения [3-го сезона шоу «Симфония моря» (старт 10 ноября)](/ru/news/symphony-of-the-sea-season-3-opening) гости могут объединить ужин и просмотр шоу в единый маршрут. После трапезы удобно наблюдать за представлением [«Поцелуй моря» и вечерним салютом в 21:00](/ru/news/kiss-of-the-sea-fireworks-viewing-tips).

Актуальное меню и правила обслуживания уточняйте на месте или по официальным каналам.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', '## [1] Sun Bavaria GastroPubのご紹介

サンセットタウンでのディナーをお探しの際は、[Sun Bavaria GastroPub](/ja/business/sun-bavaria-gastropub)にご注目ください。サンワールド公式ページにおいて「約100種類の料理が揃う大宴会」として紹介されています。

## [2] 公式発表による特徴

- **約100種類の料理**: 多彩なメニューを取り揃えています。
- **シーフード & BBQ**: 新鮮な魚介類やグリル料理を提供。
- **フランス風自家製パン**: こだわりのフランス風手作りパンが用意されています。
- **水辺のロケーション**: 海の水辺のすぐ隣に位置しています。

## [3] 夜のショー観賞との組み合わせ

[シンフォニー・オブ・ザ・シー シーズン3（11月10日開幕）](/ja/news/symphony-of-the-sea-season-3-opening)の公演期間中は、同じエリア内でディナーとショーの観賞を合わせて楽しむことができます。食後には21:00からの[「キス・オブ・ザ・シー」花火ショー](/ja/news/kiss-of-the-sea-fireworks-viewing-tips)の観覧へとスムーズに繋げられます。

メニュー内容やご利用案内は、現地または公式チャンネルにてご確認ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', '## [1] सन बावरिया गैस्ट्रोपब का परिचय

यदि आप सनसेट टाउन में शाम के भोजन की योजना बना रहे हैं, तो [सन बावरिया गैस्ट्रोपब (Sun Bavaria GastroPub)](/hi/business/sun-bavaria-gastropub) एक प्रमुख विकल्प है। सन वर्ल्ड के आधिकारिक पेज ने इसे लगभग 100 व्यंजनों की भव्य दावत के रूप में पेश किया है।

## [2] आधिकारिक चैनल द्वारा उल्लिखित विशेषताएं

- **लगभग 100 व्यंजन**: मेहमानों के लिए विविध प्रकार के खाद्य विकल्प उपलब्ध।
- **सीफूड और BBQ**: ग्रिल्ड बारबेक्यू और ताज़ा समुद्री खाद्य पदार्थ।
- **फ्रेंच शैली की हस्तनिर्मित ब्रेड**: पारंपरिक फ्रांसीसी शैली में तैयार ताज़ा ब्रेड।
- **पानी के किनारे स्थान**: यह रेस्तरां समुद्र के पानी के बिल्कुल किनारे स्थित है।

## [3] शाम के शो के साथ यात्रा योजना

[सिम्फनी ऑफ द सी सीजन 3 (10 नवंबर से शुरू)](/hi/news/symphony-of-the-sea-season-3-opening) के दौरान, आगंतुक उसी क्षेत्र में भोजन और शो देखने की योजना एक साथ बना सकते हैं। रात 21:00 बजे के [किस ऑफ द सी आतिशबाजी शो](/hi/news/kiss-of-the-sea-fireworks-viewing-tips) के साथ शाम का कार्यक्रम पूरा होता है।

विस्तृत मेनू और संचालन व्यवस्था की पुष्टि साइट पर या आधिकारिक चैनलों से करें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक'
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

-- 메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'maison-eric-kayser-pink-desserts-sunset-town', 'Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection', '메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종', 'Cafe & Dessert', 'guide', 'published', TRUE, '2026-10-29T10:03:00+07:00', '/stock/maison-eric-kayser-pink-desserts-cover.webp', 'AI-generated illustration: Light pink dessert collection on a cafe table at Sunset Town', 'AI-generated illustration: 선셋타운 카페 테이블 위에 정갈하게 놓인 핑크 디저트 컬렉션 일러스트', 'Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.', '푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.', 'Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection', '메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종', 'Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.', '푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.', '## [1] Pink Dessert Collection by Maison Eric Kayser

Situated at Pearl Square (Quảng trường Ngọc Trai) in Sunset Town, Maison Eric Kayser Vietnam has debuted an exclusive collection of five pink-themed desserts.

The 5 signature items introduced on the official Sun World channel include:

1. **Macaronade** — Featuring raspberry cream
2. **Guava Flower Cake**
3. **Lychee Flower Cake**
4. **Pink Saint Honoré**
5. **Eclair Raspberry**

## [2] Visitor Tips & Walk Integration

This spot provides a relaxing stop for sweet pastries while strolling through Sunset Town. 

Daily menu availability may vary based on store conditions; please consult official channels prior to your visit.

- Explore the [Sunset Town Romantic Walking Course](/news/sunset-town-romantic-walking-course) which naturally passes through Pearl Square.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '## [1] 메종 에릭 카이저 핑크 디저트 컬렉션

선셋타운 진주 광장(Quảng trường Ngọc Trai)에 위치한 메종 에릭 카이저 베트남(Maison Eric Kayser Vietnam)이 핑크 디저트 컬렉션을 선보였습니다. 

선월드 공식 페이지에서 소개한 5가지 신메뉴는 다음과 같습니다:

1. **마카로나드(Macaronade)** — 라즈베리 크림
2. **구아바 플라워 케이크(Guava Flower Cake)**
3. **리치 플라워 케이크(Lychee Flower Cake)**
4. **핑크 생토노레(Pink Saint Honoré)**
5. **라즈베리 에클레어(Eclair Raspberry)**

## [2] 방문 및 이용 팁

선셋타운을 산책하다 잠시 쉬어 가며 디저트를 즐기기 좋습니다. 

메뉴 구성은 매장 사정에 따라 달라질 수 있으니 방문 전에 공식 채널을 확인해 주세요.

- [선셋타운 로맨틱 산책 코스](/ko/news/sunset-town-romantic-walking-course) 중 진주 광장 쉼터로 함께 계획해 보세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '## [1] Maison Eric Kayser粉色甜点系列

位于日落小镇珍珠广场（Quảng trường Ngọc Trai）的Maison Eric Kayser Vietnam最新推出了粉色主题甜点系列。

太阳世界官方页面公布的5款甜点包括：

1. **覆盆子马卡龙（Macaronade）** — 搭配覆盆子奶油
2. **番石榴花蛋糕（Guava Flower Cake）**
3. **荔枝花蛋糕（Lychee Flower Cake）**
4. **粉红圣多诺黑（Pink Saint Honoré）**
5. **覆盆子闪电泡芙（Eclair Raspberry）**

## [2] 游玩与品尝建议

漫步日落小镇途中，此处是停下脚步品尝甜点、小憩片刻的理想去处。

具体供应情况可能视门店当日情况有所变动，建议到访前咨询官方渠道。

- 推荐结合[日落小镇浪漫漫步路线](/zh/news/sunset-town-romantic-walking-course)规划行程。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', '## [1] Коллекция розовых десертов в Maison Eric Kayser

Пекарня Maison Eric Kayser Vietnam, расположенная на Жемчужной площади (Quảng trường Ngọc Trai) в Сансет Тауне, представила коллекцию из пяти десертов в розовой цветовой гамме.

В официальном анонсе представлены следующие 5 позиций:

1. **Макаронад (Macaronade)** — с малиновым кремом
2. **Цветочный торт с гуавой (Guava Flower Cake)**
3. **Цветочный торт с личи (Lychee Flower Cake)**
4. **Розовый Сент-Оноре (Pink Saint Honoré)**
5. **Малиновый эклер (Eclair Raspberry)**

## [2] Советы гостям

Кафе отлично подходит для приятной паузы с десертом во время неспешной прогулки по Сансет Тауну.

Ассортимент может меняться в зависимости от текущего наличия в кондитерской, перед визитом рекомендуем свериться с официальной информацией.

- Ознакомьтесь с [Романтическим пешеходным маршрутом по Сансет Тауну](/ru/news/sunset-town-romantic-walking-course).

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', '## [1] メゾン・エリック・カイザーのピンクデザートコレクション

サンセットタウンの真珠広場（Quảng trường Ngọc Trai）に位置する「Maison Eric Kayser Vietnam」が、5種類のピンクデザートコレクションを発表しました。

公式ページで紹介された5つの新メニュー：

1. **マカロナード（Macaronade）** — ラズベリークリーム
2. **グアバフラワーケーキ（Guava Flower Cake）**
3. **ライチフラワーケーキ（Lychee Flower Cake）**
4. **ピンク・サントノーレ（Pink Saint Honoré）**
5. **ラズベリーエクレア（Eclair Raspberry）**

## [2] ご利用のヒント

サンセットタウン散策の合間に立ち寄り、甘いデザートとともにひと休みするのに最適です。

メニュー内容は店舗の状況により変更される場合がありますので、ご来店前に公式チャンネルをご確認ください。

- [サンセットタウン散策コース](/ja/news/sunset-town-romantic-walking-course)と合わせてお楽しみください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', '## [1] मैसन एरिक काइज़र का गुलाबी डेसर्ट संग्रह

सनसेट टाउन के पर्ल स्क्वायर (Quảng trường Ngọc Trai) में स्थित मैसन एरिक काइज़र वियतनाम (Maison Eric Kayser Vietnam) ने 5 नए गुलाबी डेसर्ट का संग्रह पेश किया है।

सन वर्ल्ड के आधिकारिक पेज पर पेश किए गए 5 व्यंजन:

1. **मैकरोनेड (Macaronade)** — रास्पबेरी क्रीम के साथ
2. **अमरूद फ्लावर केक (Guava Flower Cake)**
3. **लीची फ्लावर केक (Lychee Flower Cake)**
4. **पिंक सेंट ऑनरे (Pink Saint Honoré)**
5. **रास्पबेरी एक्लेयर (Eclair Raspberry)**

## [2] आगंतुक सुझाव

सनसेट टाउन में घूमते समय थोड़ी देर रुककर इन स्वादिष्ट डेसर्ट का आनंद लेना एक बेहतरीन विकल्प है।

दुकान की दैनिक स्थिति के अनुसार मेनू में बदलाव हो सकता है, कृपया जाने से पहले आधिकारिक चैनल से पुष्टि करें।

- इसे [सनसेट टाउन रोमांटिक वॉक रूट](/hi/news/sunset-town-romantic-walking-course) के साथ शामिल करें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक'
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

-- 에스추리 벙바우 골프장: 원시림과 해안 사이 18홀 코스
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'eschuri-vung-bau-golf-phu-quoc', 'Eschuri Vung Bau Golf: 18-Hole Course Between Virgin Forest and Sea', '에스추리 벙바우 골프장: 원시림과 해안 사이 18홀 코스', 'Activity & Golf', 'guide', 'published', TRUE, '2026-10-29T10:02:00+07:00', '/stock/eschuri-vung-bau-golf-course-cover.webp', 'AI-generated illustration: Panoramic aerial view of 18-hole golf course between virgin forest and coastline in Phu Quoc', 'AI-generated illustration: 푸꾸옥 원시림과 해안선 사이에 펼쳐진 18홀 골프 코스 전경 일러스트', 'Explore Eschuri Vung Bau Golf in Phu Quoc, set between ancient virgin forest and the coastline. Features preserved old trees, marine wind/salinity management, and caddie service.', '푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.', 'Eschuri Vung Bau Golf: 18-Hole Course Between Virgin Forest and Sea', '에스추리 벙바우 골프장: 원시림과 해안 사이 18홀 코스', 'Explore Eschuri Vung Bau Golf in Phu Quoc, set between ancient virgin forest and the coastline. Features preserved old trees, marine wind/salinity management, and caddie service.', '푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.', '## [1] Introduction to Eschuri Vung Bau Golf

For golfers planning a trip to Phu Quoc, Eschuri Vung Bau Golf is an acclaimed sports venue to consider.

## [2] Key Course Features Highlighted by Sun World

- **Situated Between Forest & Coast**: Nestled between native virgin forest and the marine shoreline.
- **Preservation of Ancient Trees**: Existing mature trees were preserved and integrated directly into the course layout.
- **Environment-Specific Course Management**: Maintained to account for strong coastal winds and salt exposure.
- **Caddie Services**: Full caddie service is provided during rounds.

## [3] Booking & Visitor Guidance

Please verify reservation policies, tee times, and visitor guidance directly through official channels before your visit.

- For connecting your golfing visit with southern attractions, review the [Condé Nast #1 Island Sunset Town Course](/news/conde-nast-top-island-sunset-town-course).

Source: Sun World Paradise Land Phu Quoc Official Facebook', '## [1] 에스추리 벙바우 골프 소개

푸꾸옥에서 골프를 계획하고 있다면 에스추리 벙바우 골프(Eschuri Vung Bau Golf)를 눈여겨볼 만합니다. 

## [2] 선월드 공식 페이지에서 소개한 특징

- **원시림과 해안 사이**: 울창한 원시림과 바다 해안선 사이에 위치해 있습니다.
- **오래된 나무 보존**: 수령이 오래된 나무들을 보존하여 골프 코스에 반영했습니다.
- **환경 맞춤 코스 관리**: 강한 바닷바람과 염분이 있는 해안 환경을 고려하여 잔디와 코스를 관리합니다.
- **캐디 서비스 제공**: 라운딩 중 캐디 서비스를 제공합니다.

## [3] 이용 안내

이용 방법과 예약 관련 정보는 공식 채널에서 확인해 주세요.

- 푸꾸옥 남부 선셋타운과 연계한 여정은 [컨데나스트 1위 섬 남부 여행 코스](/ko/news/conde-nast-top-island-sunset-town-course)를 참고하세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '## [1] Eschuri Vung Bau高尔夫球场介绍

如果您计划在富国岛体验高尔夫运动，Eschuri Vung Bau Golf是一处备受关注的球场。

## [2] 太阳世界官方介绍的核心特色

- **坐落于森林与海岸之间**：球场巧妙地布局于原始森林与海岸线相交汇的自然环境之中。
- **保护古树原生风貌**：在球场设计中保留了当地历史悠久的古树。
- **针对海洋环境的球道维护**：针对强海风和盐分环境进行精细化养护。
- **配备球童服务**：打球过程中提供球童服务。

## [3] 预约与游览须知

球场使用细则与预约详情请通过官方渠道咨询确认。

- 结合南部景点的行程规划，可参考[《悦游》榜首岛屿日落小镇游览路线](/zh/news/conde-nast-top-island-sunset-town-course)。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', '## [1] О гольф-клубе Eschuri Vung Bau

Для любителей гольфа, планирующих поездку на Фукуок, поле Eschuri Vung Bau Golf представляет особый интерес.

## [2] Особенности из официального описания Sun World

- **Расположение между лесом и морем**: Поле раскинулось между девственным лесом и морской береговой линией.
- **Сохранение вековых деревьев**: При формировании лунок были сохранены реликтовые деревья.
- **Уход с учетом морского климата**: Трава и фервеи обслуживаются с учетом воздействия морского бриза и соли.
- **Сервис кэдди**: Игрокам предоставляется сопровождение кэдди.

## [3] Бронирование и справки

Информацию о бронировании и правилах посещения уточняйте по официальным каналам.

- Идеи для поездки по югу острова: [Гид по Сансет Тауну на лучшем острове Азии](/ru/news/conde-nast-top-island-sunset-town-course).

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', '## [1] エシュリ・ヴンバウ・ゴルフのご紹介

フーコック島でゴルフを計画されているなら、Eschuri Vung Bau Golfが注目されます。

## [2] サンワールド公式によるコースの特徴

- **原生林と海岸の間**: 豊かな原生林と海沿いの海岸線の間に位置しています。
- **古木の保存**: 樹齢を重ねた樹木をそのまま保存し、コースレイアウトに反映。
- **環境に配慮したコース管理**: 強い海風や塩分を含む環境を考慮した芝管理が行われています。
- **キャディサービス**: ラウンド中のキャディサービスが提供されます。

## [3] ご利用案内

ご利用方法やご予約に関する詳細は、公式チャンネルにてご確認ください。

- 南部エリアの観光と合わせる場合は、[コンデナスト1位の島 サンセットタウン観光コース](/ja/news/conde-nast-top-island-sunset-town-course)もご参照ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', '## [1] एस्चुरी वुंग बाउ गोल्फ का परिचय

फू क्वोक में गोल्फ खेलने की योजना बनाने वाले यात्रियों के लिए एस्चुरी वुंग बाउ गोल्फ (Eschuri Vung Bau Golf) एक उल्लेखनीय कोर्स है।

## [2] सन वर्ल्ड के अनुसार मुख्य विशेषताएं

- **जंगल और तट के बीच**: यह कोर्स घने प्राचीन जंगल और समुद्र तट के बीच स्थित है।
- **पुराने वृक्षों का संरक्षण**: कोर्स के लेआउट में पुराने और बड़े पेड़ों को संरक्षित किया गया है।
- **पर्यावरण अनुकूल प्रबंधन**: तेज समुद्री हवा और खारे वातावरण को ध्यान में रखकर कोर्स की देखभाल की जाती है।
- **कैडी सेवा**: खेल के दौरान कैडी सेवा उपलब्ध कराई जाती है।

## [3] उपयोग व बुकिंग दिशा-निर्देश

उपयोग के नियम और बुकिंग से संबंधित जानकारी के लिए कृपया आधिकारिक चैनल देखें।

- दक्षिणी फू क्वोक की यात्रा के लिए [कोंडे नास्ट #1 द्वीप सनसेट टाउन कोर्स](/hi/news/conde-nast-top-island-sunset-town-course) देखें।

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक'
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

-- 선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'sunset-town-romantic-walking-course', 'Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks', '선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼', 'Travel Guide', 'guide', 'published', TRUE, '2026-10-29T10:01:00+07:00', '/stock/sunset-town-romantic-walk-cover.webp', 'AI-generated illustration: Sunset Town promenade with fountain and Mediterranean buildings at sunset', 'AI-generated illustration: 해 질 녘 선셋타운 분수대와 유럽 지중해풍 거리 산책로 일러스트', 'A couple''s walking course through Sunset Town''s highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.', '선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.', 'Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks', '선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼', 'A couple''s walking course through Sunset Town''s highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.', '선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.', '## [1] Sunset Town Walking Course Overview

Based on key landmarks introduced by the official Sun World channel, here is an evening walking course designed for couples and visitors in Sunset Town.

## [2] 4-Step Recommended Course

### Step 1: Sun God Fountain (Thần Mặt Trời) & European Streets
Begin your stroll around the iconic Sun God Fountain and through the Mediterranean-styled pastel streets.

### Step 2: Kiss Bridge (Cầu Hôn)
Extending over the sea, [Kiss Bridge](/business/kiss-bridge) features an architectural gap officially described as 30 cm between its two pedestrian spans. It offers sweeping sunset vistas over the ocean.

### Step 3: Pearl Square (Quảng trường Ngọc Trai)
A relaxing stop to pause for sweet treats. Visit [Maison Eric Kayser''s 5 Pink Desserts](/news/maison-eric-kayser-pink-desserts-sunset-town) situated right at Pearl Square.

### Step 4: Post-Sunset Fireworks & Shows
After the sun sets, the district transitions into evening shows and fireworks:
- [Symphony of the Sea Season 3 (opening November 10)](/news/symphony-of-the-sea-season-3-opening)
- [Kiss of the Sea Show & Fireworks (21:00)](/news/kiss-of-the-sea-fireworks-viewing-tips)

Source: Sun World Paradise Land Phu Quoc Official Facebook', '## [1] 선셋타운 산책 코스 개요

선월드 공식 페이지에서 소개한 선셋타운의 주요 명소를 바탕으로 커플과 여행자가 함께 즐길 수 있는 산책 코스를 정리했습니다.

## [2] 4단계 추천 산책 코스

### 1단계: 썬 갓 분수(Thần Mặt Trời)와 유럽풍 거리
지중해풍 파스텔톤 파사드가 이어지는 골목길과 썬 갓 분수대를 둘러보며 산책을 시작합니다.

### 2단계: 키스 브릿지(Cầu Hôn)
바다를 향해 뻗은 [키스 브릿지(Kiss Bridge)](/ko/business/kiss-bridge)는 양쪽 교각 사이의 틈이 30cm라고 소개되어 있습니다. 일몰 무렵의 바다 경관을 감상하기 좋습니다.

### 3단계: 진주 광장(Quảng trường Ngọc Trai)
산책 도중 잠시 쉬어 가며 디저트를 즐기기 좋은 곳입니다. 진주 광장에 위치한 [메종 에릭 카이저 핑크 디저트 5종](/ko/news/maison-eric-kayser-pink-desserts-sunset-town)을 만나보세요.

### 4단계: 해가 진 뒤의 불꽃쇼
일몰 후에는 불꽃쇼가 이어진다고 소개되어 있습니다. 
- [심포니 오브 더 씨 시즌 3(11월 10일 개막)](/ko/news/symphony-of-the-sea-season-3-opening)
- [키스 오브 더 씨 불꽃쇼(21:00)](/ko/news/kiss-of-the-sea-fireworks-viewing-tips)

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '## [1] 日落小镇漫步路线概述

依据太阳世界官方页面推介的日落小镇核心地标，为情侣及游客梳理出一条经典的漫步游览路线。

## [2] 4段推荐漫步路线

### 第1站：太阳神喷泉（Thần Mặt Trời）与欧陆风情街
围绕标志性的太阳神喷泉启程，穿行于地中海色彩斑斓的欧式街道之中。

### 第2站：亲吻桥（Cầu Hôn）
横跨于海面的[亲吻桥（Kiss Bridge）](/zh/business/kiss-bridge)两端桥体相距仅30厘米。此处是饱览海上落日的绝佳位置。

### 第3站：珍珠广场（Quảng trường Ngọc Trai）
漫步途中的休憩好去处。不妨品尝位于珍珠广场的[Maison Eric Kayser 5款粉色甜点](/zh/news/maison-eric-kayser-pink-desserts-sunset-town)。

### 第4站：日落之后的烟花盛宴
日落之后，日落小镇将迎来精彩的晚间大秀与烟花展示：
- [《海洋交响乐》第3季（11月10日开幕）](/zh/news/symphony-of-the-sea-season-3-opening)
- [《海洋之吻》大秀与烟花（每晚21:00）](/zh/news/kiss-of-the-sea-fireworks-viewing-tips)

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', '## [1] Обзор пешеходного маршрута по Сансет Тауну

На основе официальных материалов Sun World подготовлен последовательный прогулочный маршрут для пар и гостей города.

## [2] 4 этапа рекомендованного маршрута

### Этап 1: Фонтан Солнца (Thần Mặt Trời) и европейские улочки
Начните прогулку у монументального фонтана Бога Солнца, любуясь фасадами в пастельных средиземноморских тонах.

### Этап 2: Мост Kiss Bridge (Cầu Hôn)
Выступающий в море пешеходный [мост Kiss Bridge](/ru/business/kiss-bridge) имеет официальный пролет в 30 см между двумя арками, открывая великолепный вид на морской закат.

### Этап 3: Жемчужная площадь (Quảng trường Ngọc Trai)
Приятная остановка для отдыха. На площади расположена пекарня с [коллекцией 5 розовых десертов Maison Eric Kayser](/ru/news/maison-eric-kayser-pink-desserts-sunset-town).

### Этап 4: Вечерний салют и представления
После захода солнца на набережной разворачиваются вечерние шоу:
- [3-й сезон шоу «Симфония моря» (старт 10 ноября)](/ru/news/symphony-of-the-sea-season-3-opening)
- [Вечернее шоу «Поцелуй моря» и салют в 21:00](/ru/news/kiss-of-the-sea-fireworks-viewing-tips)

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', '## [1] サンセットタウン散策コースの概要

サンワールド公式ページで紹介されている主要スポットをもとに、カップルや旅行者が楽しめるおすすめの散策ルートをまとめました。

## [2] 4つのステップでおすすめする散策ルート

### ステップ1: 太陽神の噴水（Thần Mặt Trời）と欧風の街並み
パステルカラーの地中海風建築が並ぶ路地と太陽神の噴水から散策をスタートします。

### ステップ2: キス・ブリッジ（Cầu Hôn）
海に向かって延びる[キス・ブリッジ](/ja/business/kiss-bridge)は、橋と橋の間の隙間が30cmと紹介されています。夕暮れの美しい海を一望できます。

### ステップ3: 真珠広場（Quảng trường Ngọc Trai）
散策途中のひと休みに最適なスポット。真珠広場にある[メゾン・エリック・カイザーのピンクデザート5種](/ja/news/maison-eric-kayser-pink-desserts-sunset-town)をお楽しみください。

### ステップ4: 日没後の花火ショー
日没後には華やかな花火とショーが続きます：
- [シンフォニー・オブ・ザ・シー シーズン3（11月10日開幕）](/ja/news/symphony-of-the-sea-season-3-opening)
- [「キス・オブ・ザ・シー」花火ショー（21:00）](/ja/news/kiss-of-the-sea-fireworks-viewing-tips)

出処: サンワールド・パラダイスランド・フーコック公式Facebook', '## [1] सनसेट टाउन वॉक रूट सारांश

सन वर्ल्ड के आधिकारिक पेज द्वारा प्रस्तुत प्रमुख स्थलों के आधार पर पर्यटकों और जोड़ों के लिए एक आदर्श पैदल यात्रा मार्ग तैयार किया गया है।

## [2] 4 चरणों का सुझाया गया मार्ग

### चरण 1: सन गॉड फव्वारा (Thần Mặt Trời) और यूरोपीय सड़कें
भूमध्यसागरीय शैली की सुंदर इमारतों और सन गॉड फव्वारे से अपनी सैर की शुरुआत करें।

### चरण 2: किस ब्रिज (Cầu Hôn)
समुद्र में फैला [किस ब्रिज](/hi/business/kiss-bridge), जिसके दोनों हिस्सों के बीच की दूरी आधिकारिक रूप से 30 सेमी बताई गई है। सूर्यास्त का नजारा देखने के लिए यह सबसे बेहतरीन जगह है।

### चरण 3: पर्ल स्क्वायर (Quảng trường Ngọc Trai)
सैर के दौरान थोड़ा सुस्ताने और मीठा खाने का उपयुक्त स्थल। पर्ल स्क्वायर में [मैसन एरिक काइज़र के 5 गुलाबी डेसर्ट](/hi/news/maison-eric-kayser-pink-desserts-sunset-town) का आनंद लें।

### चरण 4: सूर्यास्त के बाद का आतिशबाजी शो
सूरज ढलने के बाद सनसेट टाउन में रात के शो शुरू होते हैं:
- [सिम्फनी ऑफ द सी सीजन 3 (10 नवंबर से)](/hi/news/symphony-of-the-sea-season-3-opening)
- [किस ऑफ द सी आतिशबाजी शो (21:00 बजे)](/hi/news/kiss-of-the-sea-fireworks-viewing-tips)

स्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक'
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
