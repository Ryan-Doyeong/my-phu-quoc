-- 028_seed_articles_halloween_gastropub_dessert_golf_walk.sql
-- Ryan 승인 완료 신규 5편 발행 시드 SQL (수정본)
BEGIN;

-- 푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'phu-quoc-halloween-sunset-town-hon-thom', 'Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points', '푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내', 'Event & Festival', 'news', 'published', TRUE, '2026-10-29T10:05:00+07:00', '/stock/phu-quoc-halloween-sunset-town-cover.webp', 'AI-generated illustration: Sunset Town European-style street at sunset with two figures in simple costume viewed from behind', 'AI-generated illustration: 선셋타운 유럽풍 거리의 해 질 녘, 간단한 분장을 한 두 사람의 뒷모습 일러스트', 'Official announcement from Sun World for Halloween (October 31) featuring more than ten check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.', '2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.', 'Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points', '푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내', 'Official announcement from Sun World for Halloween (October 31) featuring more than ten check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.', '2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.', '## What Is the Event About?

Leading up to Halloween (October 31), the official Sun World channel has introduced a filming and photo opportunity at more than ten check-in points arranged throughout Sunset Town and Hon Thom (Hòn Thơm).

In the official promotional video, two individuals dressed in simple ghost costumes explore both destinations while recording photos and video clips. According to the announcement, visitors are invited to participate even with minimal costumes. The check-in locations span more than ten spots across both Sunset Town and Hon Thom.

## Inquiries

- **Sun World Hon Thom Hotline**: 088.604.5888
- **Email**: thomisland@sunworld.vn

Please verify exact daily schedules and participation details directly via the official channels before visiting.

Source: Sun World Paradise Land Phu Quoc Official Facebook (October 2026)', '## 어떤 이벤트인가요?

선월드 공식 페이지에서는 핼러윈(10월 31일)을 앞두고 선셋타운과 혼텀(Hòn Thơm)에 마련된 십수 곳의 체크인 포인트에서 핼러윈 사진과 영상을 촬영해 보라고 안내했습니다.

공식 영상에서는 두 사람이 귀신으로 분장한 채 두 곳을 돌아다니며 촬영하는 모습을 보여 줍니다. 간단한 분장만으로도 참여할 수 있다고 안내되어 있습니다. 체크인 포인트는 선셋타운과 혼텀을 합쳐 십수 곳입니다.

## 문의

- **선월드 혼텀 핫라인**: 088.604.5888
- **이메일**: thomisland@sunworld.vn

일정과 자세한 참여 방법은 공식 채널의 최신 안내를 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 10월)', '## 活动内容

在万圣节（10月31日）到来之际，太阳世界（Sun World）官方页面向游客推介在富国岛日落小镇与香岛（Hòn Thơm）设立的十几处打卡点拍摄万圣节照片与视频。

官方视频中展示了两位装扮成鬼怪造型的人物在日落小镇与香岛两地穿梭拍摄的画面。官方说明指出，仅需简单的装扮即可参与体验。打卡点遍布日落小镇与香岛十几处位置。

## 咨询渠道

- **太阳世界香岛热线**：088.604.5888
- **电子邮箱**：thomisland@sunworld.vn

活动具体日程与详细参与方式请以官方渠道最新通知为准。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook（2026年10月）', '## Формат мероприятия

В преддверии Хэллоуина (31 октября) официальный канал Sun World приглашает гостей сделать памятные фото и видео в более чем десяти точках для чекина, оборудованных в Сансет Тауне и на острове Хон Тхом (Hòn Thơm).

В официальном видеоролике показаны двое участников в простых костюмах призраков, перемещающихся по локациям Сансет Тауна и острова Хон Тхом. Согласно анонсу, принять участие в съемках можно даже в самом простом наряде. Всего в обеих зонах подготовлено более десяти тематических точек.

## Справки и контакты

- **Горячая линия Sun World Hon Thom**: 088.604.5888
- **Эл. почта**: thomisland@sunworld.vn

Точное расписание и подробности участия уточняйте в официальных источниках перед визитом.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (октябрь 2026)', '## イベントの内容

ハロウィン（10月31日）を控え、サンワールド公式ページにおいて、サンセットタウンとホントム島（Hòn Thơm）の十数カ所に設置されたチェックインポイントでの写真・動画撮影の案内が公開されました。

公式動画では、簡単な仮装をした2人が両エリアを巡りながら撮影を楽しむ様子が紹介されています。簡単な仮装のみで参加可能と案内されています。撮影ポイントはサンセットタウンとホントム島を合わせて十数カ所設けられています。

## お問い合わせ

- **サンワールド・ホントム ホットライン**: 088.604.5888
- **メール**: thomisland@sunworld.vn

日程や詳細な参加方法については、ご来場前に公式チャンネルの最新案内をご確認ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook（2026年10月）', '## इस कार्यक्रम में क्या है?

हैलोवीन (31 अक्टूबर) से पहले सन वर्ल्ड के आधिकारिक चैनल ने दक्षिणी फू क्वोक के सनसेट टाउन और होन थोम (Hòn Thơm) में स्थापित दस से अधिक चेक-इन पॉइंट्स पर फोटो और वीडियो शूट करने की घोषणा की है।

आधिकारिक वीडियो में दो व्यक्ति सामान्य भूतिया वेशभूषा में दोनों स्थलों का भ्रमण करते हुए तस्वीरें और वीडियो बनाते दिखाई देते हैं। आधिकारिक जानकारी के अनुसार, आगंतुक साधारण वेशभूषा के साथ भी इसमें भाग ले सकते हैं। दोनों क्षेत्रों को मिलाकर दस से अधिक चेक-इन पॉइंट्स तैयार किए गए हैं।

## संपर्क

- **सन वर्ल्ड होन थोम हॉटलाइन**: 088.604.5888
- **ईमेल**: thomisland@sunworld.vn

विस्तृत समय-सारणी और भागीदारी के विवरण के लिए कृपया आधिकारिक चैनल की ताज़ा जानकारी देखें।

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
  'sun-bavaria-gastropub-sunset-town-dining', 'Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town', '선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍', 'Dining & Restaurant', 'guide', 'published', TRUE, '2026-10-29T10:04:00+07:00', '/stock/sun-bavaria-gastropub-dining-cover.webp', 'AI-generated illustration: Waterside dining table with seafood, BBQ, and bread at a Sunset Town terrace restaurant', 'AI-generated illustration: 선셋타운 물가 옆 테라스 레스토랑의 해산물과 바비큐, 빵이 놓인 테이블 일러스트', 'Guide to Sun Bavaria GastroPub situated right at the water''s edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.', '푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.', 'Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town', '선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍', 'Guide to Sun Bavaria GastroPub situated right at the water''s edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.', '푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.', 'If you are looking for an evening dining destination in Sunset Town, explore [Sun Bavaria GastroPub](/business/sun-bavaria-gastropub). The official Sun World channel highlighted this venue as a grand feast featuring approximately 100 dishes.

## Highlights Introduced on Official Channels

- A restaurant featuring approximately 100 dishes.
- Offers seafood and BBQ menus.
- Features French-style artisanal bread.
- Situated right at the water''s edge.

During the period when Symphony of the Sea Season 3 opens (slated for November 10), visitors can plan show viewing and dining together in the same area. Please check on-site or via official channels for menu offerings and usage details.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '선셋타운에서 저녁 식사 장소를 찾고 있다면 [썬 바바리아 가스트로펍(Sun Bavaria GastroPub)](/ko/business/sun-bavaria-gastropub)을 확인해 보세요. 선월드 공식 페이지에서는 이곳을 "약 100가지 요리의 대연회"라고 소개했습니다.

## 공식 채널에서 소개한 내용

- 약 100가지 요리를 갖춘 식당입니다.
- 해산물과 BBQ 메뉴를 제공합니다.
- 프랑스식 수제 빵을 선보인다고 소개되어 있습니다.
- 물가 바로 옆에 자리하고 있습니다.

심포니 오브 더 씨 시즌 3(11월 10일 개막)가 열리는 시기에는 같은 구역에서 쇼 관람과 식사를 함께 계획할 수 있습니다. 메뉴 구성과 이용 방법은 현장 또는 공식 채널에서 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '若您在日落小镇寻觅晚餐好去处，不妨了解一下[Sun Bavaria餐厨酒吧（Sun Bavaria GastroPub）](/zh/business/sun-bavaria-gastropub)。太阳世界官方页面将其介绍为“约100道菜肴的大宴席”。

## 官方渠道介绍内容

- 汇集约100道菜肴的餐厅。
- 提供海鲜与BBQ菜单。
- 介绍称提供法式风味手工面包。
- 坐落于水岸边。

在《海洋交响乐》第3季（11月10日开幕）举办期间，游客可在同一区域内统筹规划观演与用餐。菜单构成与使用方式请在现场或通过官方渠道确认。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', 'Для вечернего ужина в Сансет Тауне обратите внимание на [Sun Bavaria GastroPub](/ru/business/sun-bavaria-gastropub). На официальной странице Sun World это заведение представлено как «пир из около 100 блюд».

## Особенности из официального анонса

- Ресторан с выбором из около 100 блюд.
- Предлагает блюда из морепродуктов и меню BBQ.
- Представлен французский домашний хлеб.
- Расположен непосредственно у самой воды.

В период проведения 3-го сезона шоу «Симфония моря» (открытие 10 ноября) в этой же зоне можно совместить просмотр шоу и ужин. Меню и условия посещения уточняйте на месте или по официальным каналам.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', 'サンセットタウンでディナーをお探しの際は、[Sun Bavaria GastroPub](/ja/business/sun-bavaria-gastropub)をご確認ください。サンワールド公式ページにおいて「約100種類の料理が揃う大宴会」として紹介されています。

## 公式チャンネルで紹介された内容

- 約100種類の料理を取り揃えたレストランです。
- シーフードとBBQメニューを提供します。
- フランス風自家製パンを提供すると紹介されています。
- 水辺のすぐ隣に位置しています。

シンフォニー・オブ・ザ・シー シーズン3（11月10日開幕）の開催期間中は、同じエリア内でショーの観覧とお食事を合わせて計画できます。メニュー構成やご利用方法は、現地または公式チャンネルでご確認ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', 'यदि आप सनसेट टाउन में शाम के भोजन की योजना बना रहे हैं, तो [सन बावरिया गैस्ट्रोपब (Sun Bavaria GastroPub)](/hi/business/sun-bavaria-gastropub) का विवरण देखें। सन वर्ल्ड के आधिकारिक पेज ने इसे "लगभग 100 व्यंजनों की भव्य दावत" के रूप में पेश किया है।

## आधिकारिक चैनल पर प्रस्तुत मुख्य बातें

- लगभग 100 व्यंजनों की पेशकश करने वाला रेस्तरां।
- सीफूड और बारबेक्यू (BBQ) मेनू उपलब्ध।
- फ्रेंच शैली की हस्तनिर्मित ब्रेड परोसी जाती है।
- समुद्र के पानी के बिल्कुल किनारे स्थित है।

सिम्फनी ऑफ द सी सीजन 3 (10 नवंबर को शुरू) के दौरान, आगंतुक उसी क्षेत्र में शो देखने और भोजन करने की योजना एक साथ बना सकते हैं। मेनू और उपयोग के विवरण की पुष्टि साइट पर या आधिकारिक चैनलों से करें।

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
  'maison-eric-kayser-pink-desserts-sunset-town', 'Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection', '메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종', 'Cafe & Dessert', 'guide', 'published', TRUE, '2026-10-29T10:03:00+07:00', '/stock/maison-eric-kayser-pink-desserts-cover.webp', 'AI-generated illustration: Light pink dessert collection on a cafe table at Sunset Town', 'AI-generated illustration: 선셋타운 카페 테이블 위에 정갈하게 놓인 핑크 디저트 컬렉션 일러스트', 'Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.', '푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.', 'Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection', '메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종', 'Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.', '푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.', 'Situated at Pearl Square (Quảng trường Ngọc Trai) in Sunset Town, Maison Eric Kayser Vietnam has debuted an exclusive collection of five pink-themed desserts. The official page introduced the following 5 items:

- Macaronade — raspberry cream
- Guava Flower Cake
- Lychee Flower Cake
- Pink Saint Honoré
- Eclair Raspberry

This spot provides a relaxing stop for desserts while strolling through Sunset Town. Daily menu availability may vary based on store conditions; please consult official channels prior to your visit.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '선셋타운 진주 광장(Quảng trường Ngọc Trai)에 위치한 메종 에릭 카이저 베트남(Maison Eric Kayser Vietnam)이 핑크 디저트 컬렉션을 선보였습니다. 공식 페이지에서 소개한 메뉴는 다음 5가지입니다.

- 마카로나드(Macaronade) — 라즈베리 크림
- 구아바 플라워 케이크(Guava Flower Cake)
- 리치 플라워 케이크(Lychee Flower Cake)
- 핑크 생토노레(Pink Saint Honoré)
- 라즈베리 에클레어(Eclair Raspberry)

선셋타운을 산책하다 잠시 쉬어 가며 디저트를 즐기기 좋습니다. 메뉴 구성은 매장 사정에 따라 달라질 수 있으니 방문 전에 공식 채널을 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '位于日落小镇珍珠广场（Quảng trường Ngọc Trai）的Maison Eric Kayser Vietnam最新推出了粉色主题甜点系列。官方页面公布的5款菜单如下：

- 覆盆子马卡龙（Macaronade） — 覆盆子奶油
- 番石榴花蛋糕（Guava Flower Cake）
- 荔枝花蛋糕（Lychee Flower Cake）
- 粉红圣多诺黑（Pink Saint Honoré）
- 覆盆子闪电泡芙（Eclair Raspberry）

漫步日落小镇途中，此处是停下脚步品尝甜点、小憩片刻的好去处。具体菜单供应可能视门店当日情况有所变动，建议到访前咨询官方渠道。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', 'Пекарня Maison Eric Kayser Vietnam, расположенная на Жемчужной площади (Quảng trường Ngọc Trai) в Сансет Тауне, представила коллекцию десертов в розовой цветовой гамме. В официальном анонсе представлены следующие 5 позиций:

- Макаронад (Macaronade) — с малиновым кремом
- Торт с цветами гуавы (Guava Flower Cake)
- Торт с цветами личи (Lychee Flower Cake)
- Розовый Сент-Оноре (Pink Saint Honoré)
- Малиновый эклер (Eclair Raspberry)

Кафе отлично подходит для отдыха с десертом во время прогулки по Сансет Тауну. Ассортимент может меняться в зависимости от текущего наличия в кондитерской, перед визитом рекомендуем свериться с официальной информацией.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', 'サンセットタウンの真珠広場（Quảng trường Ngọc Trai）に位置する「Maison Eric Kayser Vietnam」が、ピンクデザートコレクションを発表しました。公式ページで紹介されたメニューは次の5つです。

- マカロナード（Macaronade） — ラズベリークリーム
- グアバフラワーケーキ（Guava Flower Cake）
- ライチフラワーケーキ（Lychee Flower Cake）
- ピンク・サントノーレ（Pink Saint Honoré）
- ラズベリーエクレア（Eclair Raspberry）

サンセットタウン散策の合間に立ち寄り、デザートを楽しむのに最適です。メニュー内容は店舗の状況により変更される場合がありますので、ご来店前に公式チャンネルをご確認ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', 'सनसेट टाउन के पर्ल स्क्वायर (Quảng trường Ngọc Trai) में स्थित मैसन एरिक काइज़र वियतनाम (Maison Eric Kayser Vietnam) ने गुलाबी डेसर्ट संग्रह पेश किया है। आधिकारिक पेज पर पेश किए गए 5 व्यंजन निम्नलिखित हैं:

- मैकरोनेड (Macaronade) — रास्पबेरी क्रीम के साथ
- अमरूद फ्लावर केक (Guava Flower Cake)
- लीची फ्लावर केक (Lychee Flower Cake)
- पिंक सेंट ऑनरे (Pink Saint Honoré)
- रास्पबेरी एक्लेयर (Eclair Raspberry)

सनसेट टाउन में घूमते समय थोड़ी देर रुककर डेसर्ट का आनंद लेने के लिए यह एक अच्छा स्थान है। दुकान की दैनिक स्थिति के अनुसार मेनू में बदलाव हो सकता है, कृपया जाने से पहले आधिकारिक चैनल से पुष्टि करें।

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

-- 에스추리 벙바우 골프장: 원시림과 바다 사이 코스
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko, body_zh, body_ru, body_ja, body_hi
) VALUES (
  'eschuri-vung-bau-golf-phu-quoc', 'Eschuri Vung Bau Golf: Course Between Virgin Forest and Sea', '에스추리 벙바우 골프장: 원시림과 바다 사이 코스', 'Activity & Golf', 'guide', 'published', TRUE, '2026-10-29T10:02:00+07:00', '/stock/eschuri-vung-bau-golf-course-cover.webp', 'AI-generated illustration: Panoramic aerial view of golf course between virgin forest and coastline in Phu Quoc', 'AI-generated illustration: 푸꾸옥 원시림과 해안선 사이에 펼쳐진 골프 코스 전경 일러스트', 'Explore Eschuri Vung Bau Golf in Phu Quoc, set between virgin forest and coastline. Features preserved old trees, marine wind/salinity management, and caddie service.', '푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.', 'Eschuri Vung Bau Golf: Course Between Virgin Forest and Sea', '에스추리 벙바우 골프장: 원시림과 바다 사이 코스', 'Explore Eschuri Vung Bau Golf in Phu Quoc, set between virgin forest and coastline. Features preserved old trees, marine wind/salinity management, and caddie service.', '푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.', 'For golfers planning a trip to Phu Quoc, Eschuri Vung Bau Golf is an acclaimed sports venue to consider. The official Sun World channel highlighted this golf course with the following details:

- Situated between virgin forest and the coastline.
- Existing mature trees were preserved and integrated into the golf course layout.
- Maintained to account for strong winds and salty environment.
- Caddie service is provided.

Please verify reservation policies and visitor guidance directly through official channels before your visit.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '푸꾸옥에서 골프를 계획하고 있다면 에스추리 벙바우 골프(Eschuri Vung Bau Golf)를 눈여겨볼 만합니다. 선월드 공식 페이지에서는 이 골프 코스를 다음과 같이 소개했습니다.

- 원시림과 해안 사이에 위치해 있습니다.
- 오래된 나무를 보존해 골프 코스에 반영했습니다.
- 강한 바람과 염분이 있는 환경을 고려해 코스를 관리합니다.
- 캐디 서비스를 제공합니다.

이용 방법과 예약 관련 정보는 공식 채널에서 확인해 주세요.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '如果您计划在富国岛体验高尔夫运动，Eschuri Vung Bau Golf是一处备受关注的球场。太阳世界官方页面对该高尔夫球场介绍如下：

- 坐落于原始森林与海岸线之间。
- 保留古树风貌并融入高尔夫球道设计之中。
- 综合考量强风与盐分环境进行球道维护。
- 提供球童服务。

使用细则与预约详情请通过官方渠道咨询确认。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', 'Для любителей гольфа, планирующих поездку на Фукуок, поле Eschuri Vung Bau Golf представляет особый интерес. На официальной странице Sun World этот гольф-комплекс представлен следующим образом:

- Расположен между реликтовым лесом и морским побережьем.
- Вековые деревья были сохранены и интегрированы в планировку поля.
- Поле обслуживается с учетом воздействия сильного ветра и морской соли.
- Предоставляются услуги кэдди.

Информацию о бронировании и правилах посещения уточняйте по официальным каналам.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', 'フーコック島でゴルフを計画されているなら、Eschuri Vung Bau Golfが注目されます。サンワールド公式ページにおいて、このゴルフコースは次のように紹介されています。

- 原生林と海岸の間に位置しています。
- 古木を保存してゴルフコースの設計に反映しています。
- 強い風と塩分のある環境を考慮してコースが管理されています。
- キャディサービスを提供しています。

ご利用方法やご予約に関する詳細は、公式チャンネルにてご確認ください。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', 'फू क्वोक में गोल्फ खेलने की योजना बनाने वाले यात्रियों के लिए एस्चुरी वुंग बाउ गोल्फ (Eschuri Vung Bau Golf) एक उल्लेखनीय कोर्स है। सन वर्ल्ड के आधिकारिक पेज पर इस गोल्फ कोर्स का विवरण इस प्रकार दिया गया है:

- यह प्राचीन जंगल और समुद्र तट के बीच स्थित है।
- पुराने पेड़ों को संरक्षित करके गोल्फ कोर्स में शामिल किया गया है।
- तेज हवा और खारे वातावरण को ध्यान में रखकर कोर्स की देखभाल की जाती है।
- कैडी सेवा प्रदान की जाती है।

उपयोग के नियम और बुकिंग से संबंधित जानकारी के लिए कृपया आधिकारिक चैनल देखें।

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
  'sunset-town-romantic-walking-course', 'Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks', '선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼', 'Travel Guide', 'guide', 'published', TRUE, '2026-10-29T10:01:00+07:00', '/stock/sunset-town-romantic-walk-cover.webp', 'AI-generated illustration: Sunset Town promenade with fountain and Mediterranean buildings at sunset', 'AI-generated illustration: 해 질 녘 선셋타운 분수대와 유럽 지중해풍 거리 산책로 일러스트', 'A couple''s walking course through Sunset Town''s highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.', '선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.', 'Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks', '선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼', 'A couple''s walking course through Sunset Town''s highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.', '선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.', 'Based on key landmarks introduced by the official Sun World channel, here is a walking course that couples can enjoy together in Sunset Town:

1. **Sun God Fountain (Thần Mặt Trời) and European-style streets**
2. **Kiss Bridge (Cầu Hôn)** — Officially described as having a 30 cm gap between the two spans.
3. **Pearl Square** — A great place to pause and enjoy desserts during your walk. (See [Maison Eric Kayser 5 Pink Desserts](/news/maison-eric-kayser-pink-desserts-sunset-town))
4. **Post-Sunset Fireworks** — Announcements indicate that a fireworks display follows after sunset. [Symphony of the Sea Season 3](/news/symphony-of-the-sea-season-3-opening) opens on November 10.

Source: Sun World Paradise Land Phu Quoc Official Facebook', '선월드 공식 페이지에서 소개한 선셋타운의 주요 명소를 바탕으로 커플이 함께 즐길 수 있는 산책 코스를 정리했습니다.

1. **썬 갓 분수(Thần Mặt Trời)와 유럽풍 거리**
2. **키스 브릿지(Cầu Hôn)** — 틈이 30cm라고 소개되어 있습니다.
3. **진주 광장** — 산책 도중 잠시 쉬어 가며 디저트를 즐기기 좋은 곳입니다. ([메종 에릭 카이저 핑크 디저트 5종](/ko/news/maison-eric-kayser-pink-desserts-sunset-town) 참고)
4. **해가 진 뒤의 불꽃쇼** — 일몰 후에는 불꽃쇼가 이어진다고 소개되어 있습니다. [심포니 오브 더 씨 시즌 3](/ko/news/symphony-of-the-sea-season-3-opening)는 11월 10일 개막합니다.

출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북', '依据太阳世界官方页面介绍的日落小镇核心地标，为情侣整理了一条可以一同漫步游览的路线：

1. **太阳神喷泉（Thần Mặt Trời）与欧风街区**
2. **亲吻桥（Cầu Hôn）** — 官方介绍称两跨之间相距30厘米。
3. **珍珠广场** — 漫步途中适宜小憩并享用甜点的去处。（参考[Maison Eric Kayser 5款粉红甜点](/zh/news/maison-eric-kayser-pink-desserts-sunset-town)）
4. **日落后的烟花秀** — 官方介绍称日落后将上演烟花秀。[《海洋交响乐》第3季](/zh/news/symphony-of-the-sea-season-3-opening)将于11月10日开幕。

出处：Sun World Paradise Land Phu Quoc 官方 Facebook', 'На основе ключевых достопримечательностей Сансет Тауна из официальных материалов Sun World составлен прогулочный маршрут, которым пары могут насладиться вместе:

1. **Фонтан Солнца (Thần Mặt Trời) и европейские улочки**
2. **Мост Kiss Bridge (Cầu Hôn)** — Согласно официальному описанию, зазор между двумя пролетами составляет 30 см.
3. **Жемчужная площадь** — Место, где приятно остановиться во время прогулки и попробовать десерты. (См. [5 розовых десертов Maison Eric Kayser](/ru/news/maison-eric-kayser-pink-desserts-sunset-town))
4. **Вечерний салют** — Согласно официальному анонсу, после заката начинается фейерверк. Шоу [«Симфония моря» 3-й сезон](/ru/news/symphony-of-the-sea-season-3-opening) открывается 10 ноября.

Источник: официальная страница Sun World Paradise Land Phu Quoc в Facebook', 'サンワールド公式ページで紹介されているサンセットタウンの主要スポットをもとに、カップルで一緒に楽しめる散策コースをまとめました。

1. **太陽神の噴水（Thần Mặt Trời）と欧風の街並み**
2. **キス・ブリッジ（Cầu Hôn）** — 隙間が30cmと紹介されています。
3. **真珠広場** — 散策の合間にひと休みしてデザートを楽しむのに適した場所です。（[メゾン・エリック・カイザーのピンクデザート5種](/ja/news/maison-eric-kayser-pink-desserts-sunset-town)を参照）
4. **日没後の花火ショー** — 日没後には花火ショーが続くと紹介されています。[シンフォニー・オブ・ザ・シー シーズン3](/ja/news/symphony-of-the-sea-season-3-opening)は11月10日に開幕します。

出処: サンワールド・パラダイスランド・フーコック公式Facebook', 'सन वर्ल्ड के आधिकारिक पेज द्वारा प्रस्तुत प्रमुख स्थलों के आधार पर जोड़ों के लिए एक साथ सैर करने का यात्रा मार्ग तैयार किया गया है:

1. **सन गॉड फव्वारा (Thần Mặt Trời) और यूरोपीय शैली की सड़कें**
2. **किस ब्रिज (Cầu Hôn)** — दोनों हिस्सों के बीच की दूरी 30 सेमी बताई गई है।
3. **पर्ल स्क्वायर** — सैर के दौरान रुककर डेसर्ट का आनंद लेने का उत्तम स्थान। (देखें [मैसन एरिक काइज़र के 5 गुलाबी डेसर्ट](/hi/news/maison-eric-kayser-pink-desserts-sunset-town))
4. **सूर्यास्त के बाद का आतिशबाजी शो** — आधिकारिक जानकारी के अनुसार सूर्यास्त के बाद आतिशबाजी होती है। [सिम्फनी ऑफ द सी सीजन 3](/hi/news/symphony-of-the-sea-season-3-opening) का उद्घाटन 10 नवंबर को होगा।

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
