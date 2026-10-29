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
    "id": "news-phu-quoc-halloween-sunset-town-hon-thom",
    "slug": "phu-quoc-halloween-sunset-town-hon-thom",
    "content_type": "news",
    "status": "published",
    "is_sample": false,
    "category": "Event & Festival",
    "category_ko": "축제 & 이벤트",
    "category_zh": "节庆与活动",
    "category_ru": "Фестивали и события",
    "category_ja": "フェスティバル・イベント",
    "category_hi": "उत्सव और कार्यक्रम",
    "cover_image_url": "/stock/phu-quoc-halloween-sunset-town-cover.webp",
    "published_at": "2026-10-29T10:05:00+07:00",
    "updated_at": "2026-10-29T10:05:00+07:00",
    "title": "Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points",
    "title_ko": "푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내",
    "title_zh": "富国岛万圣节2026：日落小镇与香岛拍照打卡点指南",
    "title_ru": "Хэллоуин 2026 на Фукуоке: точки для фото в Сансет Тауне и на острове Хон Тхом",
    "title_ja": "フーコック島ハロウィン2026：サンセットタウン・ホントム島チェックインスポット案内",
    "title_hi": "फू क्वोक हैलोवीन 2026: सनसेट टाउन और होन थोम चेक-इन पॉइंट्स गाइड",
    "seo_title": "Phu Quoc Halloween 2026: Sunset Town & Hon Thom Check-In Points",
    "seo_title_ko": "푸꾸옥 핼러윈 2026: 선셋타운·혼텀 체크인 포인트 안내",
    "seo_title_zh": "富国岛万圣节2026：日落小镇与香岛拍照打卡点指南",
    "seo_title_ru": "Хэллоуин 2026 на Фукуоке: точки для фото в Сансет Тауне и на острове Хон Тхом",
    "seo_title_ja": "フーコック島ハロウィン2026：サンセットタウン・ホントム島チェックインスポット案内",
    "seo_title_hi": "फू क्वोक हैलोवीन 2026: सनसेट टाउन और होन थोम चेक-इन पॉइंट्स गाइड",
    "seo_description": "Official announcement from Sun World for Halloween (October 31) featuring dozens of check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.",
    "seo_description_ko": "2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.",
    "seo_description_zh": "太阳世界（Sun World）官方发布富国岛万圣节活动：10月31日前在日落小镇与香岛数十处打卡点拍摄照片与视频。咨询热线：088.604.5888，邮箱：thomisland@sunworld.vn。",
    "seo_description_ru": "Официальный анонс Sun World к Хэллоуину (31 октября): десятки точек для съёмки фото и видео в Сансет Тауне и на острове Хон Тхом. Горячая линия: 088.604.5888, эл. почта: thomisland@sunworld.vn.",
    "seo_description_ja": "サンワールド公式発表によるハロウィン（10月31日）撮影企画。サンセットタウンとホントム島の十数カ所のチェックインポイントでの撮影方法と連絡先（088.604.5888 / thomisland@sunworld.vn）。",
    "seo_description_hi": "हैलोवीन (31 अक्टूबर) से पहले सन वर्ल्ड द्वारा घोषित सनसेट टाउन और होन थोम के दर्जनों चेक-इन पॉइंट्स पर फोटो और वीडियो शूट करने की आधिकारिक जानकारी। संपर्क: 088.604.5888 या thomisland@sunworld.vn।",
    "excerpt": "Official announcement from Sun World for Halloween (October 31) featuring dozens of check-in filming points across Sunset Town and Hon Thom in Phu Quoc. Contact: 088.604.5888 or thomisland@sunworld.vn.",
    "excerpt_ko": "2026년 푸꾸옥 핼러윈을 앞두고 선월드 공식 채널에서 안내한 선셋타운과 혼텀(Hòn Thơm)의 십수 곳 체크인 포인트 촬영 이벤트 소식과 문의처(핫라인 088.604.5888, 이메일 thomisland@sunworld.vn) 안내.",
    "excerpt_zh": "太阳世界（Sun World）官方发布富国岛万圣节活动：10月31日前在日落小镇与香岛数十处打卡点拍摄照片与视频。咨询热线：088.604.5888，邮箱：thomisland@sunworld.vn。",
    "excerpt_ru": "Официальный анонс Sun World к Хэллоуину (31 октября): десятки точек для съёмки фото и видео в Сансет Тауне и на острове Хон Тхом. Горячая линия: 088.604.5888, эл. почта: thomisland@sunworld.vn.",
    "excerpt_ja": "サンワールド公式発表によるハロウィン（10月31日）撮影企画。サンセットタウンとホントム島の十数カ所のチェックインポイントでの撮影方法と連絡先（088.604.5888 / thomisland@sunworld.vn）。",
    "excerpt_hi": "हैलोवीन (31 अक्टूबर) से पहले सन वर्ल्ड द्वारा घोषित सनसेट टाउन और होन थोम के दर्जनों चेक-इन पॉइंट्स पर फोटो और वीडियो शूट करने की आधिकारिक जानकारी। संपर्क: 088.604.5888 या thomisland@sunworld.vn।",
    "hero_caption": "AI-generated illustration: Sunset Town European-style street at sunset with two figures in simple costume viewed from behind",
    "hero_caption_ko": "AI-generated illustration: 선셋타운 유럽풍 거리의 해 질 녘, 간단한 분장을 한 두 사람의 뒷모습 일러스트",
    "hero_caption_zh": "AI-generated illustration: 日落时分日落小镇欧式街道上两位身着简易服饰漫步者的背影插画",
    "hero_caption_ru": "AI-generated illustration: Закат на европейской улочке Сансет Тауна и вид со спины на двух человек в простых костюмах",
    "hero_caption_ja": "AI-generated illustration: サンセットタウンの夕暮れの街並みと、簡単な仮装をした二人の後ろ姿イラスト",
    "hero_caption_hi": "AI-generated illustration: सनसेट टाउन की यूरोपीय शैली की सड़क पर सूर्यास्त के समय साधारण वेशभूषा में दो लोगों का पीछे से दृश्य",
    "body_ko": "## [1] 이벤트 개요\n\n선월드 공식 페이지에서는 핼러윈(10월 31일)을 앞두고 선셋타운과 혼텀(Hòn Thơm)에 마련된 십수 곳의 체크인 포인트에서 핼러윈 사진과 영상을 촬영해 보라고 안내했습니다.\n\n## [2] 어떤 이벤트인가요?\n\n공식 영상에서는 두 사람이 귀신으로 분장한 채 두 곳을 돌아다니며 촬영하는 모습을 보여 줍니다. 간단한 분장만으로도 참여할 수 있다고 안내되어 있습니다. 체크인 포인트는 선셋타운과 혼텀을 합쳐 십수 곳입니다.\n\n## [3] 문의 및 공식 채널\n\n- **선월드 혼텀 핫라인**: 088.604.5888\n- **이메일**: thomisland@sunworld.vn\n\n일정과 자세한 참여 방법은 공식 채널의 최신 안내를 확인해 주세요.\n\n## [4] 연계 추천 정보\n\n선셋타운을 함께 둘러보시려면 아래 가이드를 참고하세요:\n- [심포니 오브 더 씨 시즌 3 개막 안내](/ko/news/symphony-of-the-sea-season-3-opening)\n- [선셋타운 로맨틱 산책 코스](/ko/news/sunset-town-romantic-walking-course)\n\n출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북 (2026년 10월)",
    "body": "## [1] Event Overview\n\nLeading up to Halloween (October 31), the official Sun World channel has introduced a filming and photo opportunity at dozens of check-in points arranged throughout Sunset Town and Hon Thom (Hòn Thơm) in southern Phu Quoc.\n\n## [2] What Is the Event About?\n\nIn the official promotional video, two individuals dressed in simple ghost costumes explore both destinations while recording photos and video clips. According to the announcement, visitors are invited to participate even with minimal costumes. The check-in locations span dozens of spots across both Sunset Town and Hon Thom.\n\n## [3] Inquiries & Official Channels\n\n- **Sun World Hon Thom Hotline**: 088.604.5888\n- **Email**: thomisland@sunworld.vn\n\nPlease verify exact daily schedules and participation details directly via the official channels before visiting.\n\n## [4] Related Sunset Town Guides\n\nFor visitors exploring southern Phu Quoc during this season:\n- [Symphony of the Sea Season 3 Opening Guide](/news/symphony-of-the-sea-season-3-opening)\n- [Sunset Town Romantic Walking Course](/news/sunset-town-romantic-walking-course)\n\nSource: Sun World Paradise Land Phu Quoc Official Facebook (October 2026)",
    "body_zh": "## [1] 活动概述\n\n在万圣节（10月31日）到来之际，太阳世界（Sun World）官方页面向游客推介在富国岛日落小镇与香岛（Hòn Thơm）设立的数十处打卡点拍摄万圣节照片与视频。\n\n## [2] 活动内容\n\n官方视频中展示了两位装扮成鬼怪造型的人物在日落小镇与香岛两地穿梭拍摄的画面。官方说明指出，仅需简单的装扮即可参与体验。打卡点遍布日落小镇与香岛数十处位置。\n\n## [3] 咨询与官方渠道\n\n- **太阳世界香岛热线**：088.604.5888\n- **电子邮箱**：thomisland@sunworld.vn\n\n活动具体日程与详细参与方式请以官方渠道最新通知为准。\n\n## [4] 相关游览指南\n\n如需游览日落小镇周边，可参考：\n- [《海洋交响乐》第3季开幕指南](/zh/news/symphony-of-the-sea-season-3-opening)\n- [日落小镇浪漫漫步路线](/zh/news/sunset-town-romantic-walking-course)\n\n出处：Sun World Paradise Land Phu Quoc 官方 Facebook（2026年10月）",
    "body_ru": "## [1] Обзор события\n\nВ преддверии Хэллоуина (31 октября) официальный канал Sun World приглашает гостей сделать памятные фото и видео в десятках точек для чекина, оборудованных в Сансет Тауне и на острове Хон Тхом (Hòn Thơm).\n\n## [2] Формат мероприятия\n\nВ официальном видеоролике показаны двое участников в простых костюмах призраков, перемещающихся по локациям Сансет Тауна и острова Хон Тхом. Согласно анонсу, принять участие в съемках можно даже в самом простом гриме или наряде. Всего в обеих зонах подготовлено несколько десятков тематических точек.\n\n## [3] Контакты и справки\n\n- **Горячая линия Sun World Hon Thom**: 088.604.5888\n- **Эл. почта**: thomisland@sunworld.vn\n\nТочное расписание и подробности участия уточняйте в официальных источниках перед визитом.\n\n## [4] Полезные материалы по Сансет Тауну\n\n- [Шоу «Симфония моря» — открытие 3-го сезона](/ru/news/symphony-of-the-sea-season-3-opening)\n- [Романтический пешеходный маршрут по Сансет Тауну](/ru/news/sunset-town-romantic-walking-course)\n\nИсточник: официальная страница Sun World Paradise Land Phu Quoc в Facebook (октябрь 2026)",
    "body_ja": "## [1] イベントの概要\n\nハロウィン（10月31日）を控え、サンワールド公式ページにおいて、サンセットタウンとホントム島（Hòn Thơm）の十数カ所に設置されたチェックインポイントでの写真・動画撮影の案内が公開されました。\n\n## [2] イベントの内容\n\n公式動画では、簡単な仮装をした2人が両エリアを巡りながら撮影を楽しむ様子が紹介されています。本格的な準備がなくても、手軽な仮装のみで参加可能と案内されています。撮影ポイントはサンセットタウンとホントム島を合わせて十数カ所設けられています。\n\n## [3] お問い合わせ・公式窓口\n\n- **サンワールド・ホントム ホットライン**: 088.604.5888\n- **メール**: thomisland@sunworld.vn\n\n詳細な日程や参加方法については、ご来場前に公式チャンネルの最新案内をご確認ください。\n\n## [4] 関連ガイド\n\nサンセットタウン観光に合わせてこちらもご活用ください：\n- [シンフォニー・オブ・ザ・シー シーズン3開幕ガイド](/ja/news/symphony-of-the-sea-season-3-opening)\n- [サンセットタウン散策コース](/ja/news/sunset-town-romantic-walking-course)\n\n出処: サンワールド・パラダイスランド・フーコック公式Facebook（2026年10月）",
    "body_hi": "## [1] कार्यक्रम सारांश\n\nहैलोवीन (31 अक्टूबर) से पहले सन वर्ल्ड के आधिकारिक चैनल ने दक्षिणी फू क्वोक के सनसेट टाउन और होन थोम (Hòn Thơm) में स्थापित दर्जनों चेक-इन पॉइंट्स पर फोटो और वीडियो शूट करने की घोषणा की है।\n\n## [2] इस कार्यक्रम में क्या है?\n\nआधिकारिक वीडियो में दो व्यक्ति सामान्य भूतिया वेशभूषा में दोनों स्थलों का भ्रमण करते हुए तस्वीरें और वीडियो बनाते दिखाई देते हैं। आधिकारिक जानकारी के अनुसार, आगंतुक साधारण वेशभूषा के साथ भी इसमें भाग ले सकते हैं। दोनों क्षेत्रों को मिलाकर दर्जनों चेक-इन पॉइंट्स तैयार किए गए हैं।\n\n## [3] संपर्क और आधिकारिक चैनल\n\n- **सन वर्ल्ड होन थोम हॉटलाइन**: 088.604.5888\n- **ईमेल**: thomisland@sunworld.vn\n\nविस्तृत समय-सारणी और भागीदारी के विवरण के लिए कृपया आधिकारिक चैनल की ताज़ा जानकारी देखें।\n\n## [4] संबंधित यात्रा गाइड\n\nसनसेट टाउन की यात्रा के लिए ये गाइड भी देखें:\n- [सिम्फनी ऑफ द सी सीजन 3 ओपनिंग गाइड](/hi/news/symphony-of-the-sea-season-3-opening)\n- [सनसेट टाउन रोमांटिक वॉक रूट](/hi/news/sunset-town-romantic-walking-course)\n\nस्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक (अक्टूबर 2026)",
    "faqs": [
      {
        "question": "Where are the check-in points located?",
        "answer": "Across dozens of designated spots throughout Sunset Town and Hon Thom in southern Phu Quoc."
      },
      {
        "question": "How can I contact Sun World for details?",
        "answer": "Call the hotline at 088.604.5888 or email thomisland@sunworld.vn."
      }
    ],
    "faqs_ko": [
      {
        "question": "체크인 포인트는 어디에 마련되어 있나요?",
        "answer": "푸꾸옥 남부 선셋타운과 혼텀 섬에 걸쳐 십수 곳이 마련되어 있습니다."
      },
      {
        "question": "문의는 어디로 하나요?",
        "answer": "선월드 혼텀 핫라인(088.604.5888) 또는 이메일(thomisland@sunworld.vn)로 문의하실 수 있습니다."
      }
    ],
    "faqs_zh": [
      {
        "question": "打卡点设立在哪些地点？",
        "answer": "分布在富国岛南部的日落小镇与香岛数十处指定打卡点。"
      },
      {
        "question": "如何联系官方咨询？",
        "answer": "可拨打太阳世界香岛热线088.604.5888，或发送邮件至thomisland@sunworld.vn。"
      }
    ],
    "faqs_ru": [
      {
        "question": "Где находятся точки для чекина?",
        "answer": "Они расположены в десятках мест на территории Сансет Тауна и острова Хон Тхом."
      },
      {
        "question": "По каким контактам можно обратиться?",
        "answer": "Горячая линия: 088.604.5888, электронная почта: thomisland@sunworld.vn."
      }
    ],
    "faqs_ja": [
      {
        "question": "チェックインポイントはどこにありますか？",
        "answer": "サンセットタウンとホントム島の十数カ所に設置されています。"
      },
      {
        "question": "問い合わせ先はどこですか？",
        "answer": "サンワールド・ホントムのホットライン（088.604.5888）またはメール（thomisland@sunworld.vn）にて確認できます。"
      }
    ],
    "faqs_hi": [
      {
        "question": "चेक-इन पॉइंट्स कहाँ स्थित हैं?",
        "answer": "दक्षिणी फू क्वोक के सनसेट टाउन और होन थोम में दर्जनों स्थानों पर स्थित हैं।"
      },
      {
        "question": "विस्तृत जानकारी के लिए संपर्क कहाँ करें?",
        "answer": "हॉटलाइन 088.604.5888 पर कॉल करें या thomisland@sunworld.vn पर ईमेल भेजें।"
      }
    ]
  },
  {
    "id": "news-sun-bavaria-gastropub-sunset-town-dining",
    "slug": "sun-bavaria-gastropub-sunset-town-dining",
    "content_type": "guide",
    "status": "published",
    "is_sample": false,
    "category": "Dining & Restaurant",
    "category_ko": "식음료 & 맛집",
    "category_zh": "美食与餐厅",
    "category_ru": "Рестораны и гастрономия",
    "category_ja": "グルメ・レストラン",
    "category_hi": "रेस्तरां और भोजन",
    "cover_image_url": "/stock/sun-bavaria-gastropub-dining-cover.webp",
    "published_at": "2026-10-29T10:04:00+07:00",
    "updated_at": "2026-10-29T10:04:00+07:00",
    "title": "Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town",
    "title_ko": "선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍",
    "title_zh": "日落小镇Sun Bavaria餐厨酒吧：临水而建与约100道精选佳肴",
    "title_ru": "Sun Bavaria GastroPub: ресторан у воды и около 100 блюд в Сансет Тауне",
    "title_ja": "サンセットタウンSun Bavaria：水辺のガ스트로パブと約100種類の料理",
    "title_hi": "सन बावरिया गैस्ट्रोपब: सनसेट टाउन में पानी के किनारे ~100 व्यंजनों का डाइनिंग",
    "seo_title": "Sun Bavaria GastroPub: Waterside Dining with ~100 Dishes in Sunset Town",
    "seo_title_ko": "선셋타운 썬 바바리아: 물가 옆 100가지 요리 가스트로펍",
    "seo_title_zh": "日落小镇Sun Bavaria餐厨酒吧：临水而建与约100道精选佳肴",
    "seo_title_ru": "Sun Bavaria GastroPub: ресторан у воды и около 100 блюд в Сансет Тауне",
    "seo_title_ja": "サンセットタウンSun Bavaria：水辺のガストロパブと約100種類の料理",
    "seo_title_hi": "सन बावरिया गैस्ट्रोपब: सनसेट टाउन में पानी के किनारे ~100 व्यंजनों का डाइनिंग",
    "seo_description": "Guide to Sun Bavaria GastroPub situated right at the water's edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.",
    "seo_description_ko": "푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.",
    "seo_description_zh": "富国岛日落小镇临水而建的Sun Bavaria餐厨酒吧（Sun Bavaria GastroPub）介绍。官方推荐约100道菜肴大盛宴，包含海鲜、BBQ及法式手工面包。",
    "seo_description_ru": "Гид по ресторану Sun Bavaria GastroPub у самой воды в Сансет Тауне на Фукуоке. Около 100 блюд, включая морепродукты, BBQ и французский домашний хлеб.",
    "seo_description_ja": "フーコック島サンセットタウンの水辺に位置する「Sun Bavaria GastroPub」のご案内。公式発表による約100種類の料理、シーフード、BBQ、フランス風自家製パンをご紹介。",
    "seo_description_hi": "सनसेट टाउन में पानी के बिल्कुल किनारे स्थित सन बावरिया गैस्ट्रोपब (Sun Bavaria GastroPub) का परिचय। आधिकारिक घोषणा के अनुसार लगभग 100 व्यंजन, सीफूड, BBQ और फ्रेंच शैली की ब्रेड।",
    "excerpt": "Guide to Sun Bavaria GastroPub situated right at the water's edge in Sunset Town, Phu Quoc. Features about 100 dishes including seafood, BBQ, and French-style artisanal bread.",
    "excerpt_ko": "푸꾸옥 선셋타운 물가 바로 옆에 자리한 썬 바바리아 가스트로펍(Sun Bavaria GastroPub) 안내. 선월드 공식 채널에서 소개한 약 100가지 요리와 해산물·BBQ·프랑스식 수제 빵 메뉴 소개.",
    "excerpt_zh": "富国岛日落小镇临水而建的Sun Bavaria餐厨酒吧（Sun Bavaria GastroPub）介绍。官方推荐约100道菜肴大盛宴，包含海鲜、BBQ及法式手工面包。",
    "excerpt_ru": "Гид по ресторану Sun Bavaria GastroPub у самой воды в Сансет Тауне на Фукуоке. Около 100 блюд, включая морепродукты, BBQ и французский домашний хлеб.",
    "excerpt_ja": "フーコック島サンセットタウンの水辺に位置する「Sun Bavaria GastroPub」のご案内。公式発表による約100種類の料理、シーフード、BBQ、フランス風自家製パンをご紹介。",
    "excerpt_hi": "सनसेट टाउन में पानी के बिल्कुल किनारे स्थित सन बावरिया गैस्ट्रोपब (Sun Bavaria GastroPub) का परिचय। आधिकारिक घोषणा के अनुसार लगभग 100 व्यंजन, सीफूड, BBQ और फ्रेंच शैली की ब्रेड।",
    "hero_caption": "AI-generated illustration: Waterside dining table with seafood, BBQ, and bread at a Sunset Town terrace restaurant",
    "hero_caption_ko": "AI-generated illustration: 선셋타운 물가 옆 테라스 레스토랑의 해산물과 바비큐, 빵이 놓인 테이블 일러스트",
    "hero_caption_zh": "AI-generated illustration: 日落小镇临水餐厅露天餐桌上海鲜、BBQ与面包插画",
    "hero_caption_ru": "AI-generated illustration: Терраса ресторана у воды в Сансет Тауне с морепродуктами, BBQ и хлебом на столе",
    "hero_caption_ja": "AI-generated illustration: サンセットタウンの水辺テラスレストランに並ぶシーフードとBBQ、パンのイラスト",
    "hero_caption_hi": "AI-generated illustration: सनसेट टाउन में पानी के किनारे रेस्तरां की मेज पर सीफूड, बारबेक्यू और ब्रेड का चित्र",
    "body_ko": "## [1] 썬 바바리아 가스트로펍 소개\n\n선셋타운에서 저녁 식사 장소를 찾고 있다면 [썬 바바리아 가스트로펍(Sun Bavaria GastroPub)](/ko/business/sun-bavaria-gastropub)을 확인해 보세요. 선월드 공식 페이지에서는 이곳을 \"약 100가지 요리의 대연회\"라고 소개했습니다.\n\n## [2] 공식 채널에서 소개한 특징\n\n- **약 100가지 요리**: 다채로운 메뉴 라인업을 갖춘 식당입니다.\n- **해산물 & BBQ**: 신선한 해산물과 바비큐 메뉴를 제공합니다.\n- **프랑스식 수제 빵**: 식사와 함께 즐길 수 있는 프랑스식 수제 빵을 선보인다고 소개되어 있습니다.\n- **위치**: 바다 물가 바로 옆에 자리하고 있습니다.\n\n## [3] 쇼 관람과 연계 팁\n\n[심포니 오브 더 씨 시즌 3(11월 10일 개막)](/ko/news/symphony-of-the-sea-season-3-opening)가 열리는 시기에는 같은 구역에서 쇼 관람과 식사를 함께 계획할 수 있습니다. \n\n식사 후 21:00에는 인근 해상에서 펼쳐지는 [키스 오브 더 씨(Kiss of the Sea) 불꽃쇼](/ko/news/kiss-of-the-sea-fireworks-viewing-tips)를 감상하기에 좋은 동선입니다.\n\n메뉴 구성과 이용 방법은 현장 또는 공식 채널에서 확인해 주세요.\n\n출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북",
    "body": "## [1] Overview of Sun Bavaria GastroPub\n\nIf you are looking for an evening dining destination in Sunset Town, explore [Sun Bavaria GastroPub](/business/sun-bavaria-gastropub). The official Sun World channel highlighted this venue as a grand feast featuring approximately 100 dishes.\n\n## [2] Features Highlighted by Official Channels\n\n- **Approximately 100 Dishes**: A diverse culinary selection prepared for guests.\n- **Seafood & BBQ Menus**: Offering savory grilled items and fresh ocean catches.\n- **French Artisanal Bread**: Handcrafted breads baked in traditional French style.\n- **Waterfront Location**: Situated directly along the water's edge.\n\n## [3] Combining Dining with Evening Shows\n\nDuring the run of [Symphony of the Sea Season 3 (opening November 10)](/news/symphony-of-the-sea-season-3-opening), guests can coordinate evening dining with maritime show viewing within the same immediate district. \n\nFollowing dinner, visitors can easily take in the nightly 21:00 [Kiss of the Sea fireworks show](/news/kiss-of-the-sea-fireworks-viewing-tips).\n\nSpecific menu offerings and operating arrangements should be confirmed on-site or via official channels.\n\nSource: Sun World Paradise Land Phu Quoc Official Facebook",
    "body_zh": "## [1] Sun Bavaria餐厨酒吧简介\n\n若您在日落小镇寻觅晚餐好去处，不妨了解一下[Sun Bavaria餐厨酒吧（Sun Bavaria GastroPub）](/zh/business/sun-bavaria-gastropub)。太阳世界官方页面将其盛赞为“约100道菜肴的大宴席”。\n\n## [2] 官方推介的核心亮点\n\n- **约100道佳肴**：拥有丰富多样的餐饮选择。\n- **海鲜与BBQ**：提供风味烧烤与鲜美海味。\n- **法式手工面包**：特别推介法式风味烘焙手作面包。\n- **临水地理位置**：坐落于日落小镇水岸边。\n\n## [3] 观演与用餐结合建议\n\n在[《海洋交响乐》第3季（11月10日开幕）](/zh/news/symphony-of-the-sea-season-3-opening)上演期间，游客可在同一片区内同步安排观演与晚餐。晚餐后还可便利地观赏每晚21:00上演的[《海洋之吻》烟花大秀](/zh/news/kiss-of-the-sea-fireworks-viewing-tips)。\n\n具体菜单内容与使用规则请以现场或官方渠道说明为准。\n\n出处：Sun World Paradise Land Phu Quoc 官方 Facebook",
    "body_ru": "## [1] О ресторане Sun Bavaria GastroPub\n\nДля вечернего ужина в Сансет Тауне обратите внимание на [Sun Bavaria GastroPub](/ru/business/sun-bavaria-gastropub). На официальной странице Sun World это заведение охарактеризовано как масштабный пир из примерно 100 блюд.\n\n## [2] Особенности из официального анонса\n\n- **Около 100 блюд**: Обширное меню для гостей.\n- **Морепродукты и BBQ**: Ассортимент блюд на гриле и даров моря.\n- **Французский домашний хлеб**: Свежая ремесленная выпечка во французских традициях.\n- **Расположение у кромки воды**: Заведение находится непосредственно на набережной.\n\n## [3] Совмещение с вечерней программой\n\nВ период проведения [3-го сезона шоу «Симфония моря» (старт 10 ноября)](/ru/news/symphony-of-the-sea-season-3-opening) гости могут объединить ужин и просмотр шоу в единый маршрут. После трапезы удобно наблюдать за представлением [«Поцелуй моря» и вечерним салютом в 21:00](/ru/news/kiss-of-the-sea-fireworks-viewing-tips).\n\nАктуальное меню и правила обслуживания уточняйте на месте или по официальным каналам.\n\nИсточник: официальная страница Sun World Paradise Land Phu Quoc в Facebook",
    "body_ja": "## [1] Sun Bavaria GastroPubのご紹介\n\nサンセットタウンでのディナーをお探しの際は、[Sun Bavaria GastroPub](/ja/business/sun-bavaria-gastropub)にご注目ください。サンワールド公式ページにおいて「約100種類の料理が揃う大宴会」として紹介されています。\n\n## [2] 公式発表による特徴\n\n- **約100種類の料理**: 多彩なメニューを取り揃えています。\n- **シーフード & BBQ**: 新鮮な魚介類やグリル料理を提供。\n- **フランス風自家製パン**: こだわりのフランス風手作りパンが用意されています。\n- **水辺のロケーション**: 海の水辺のすぐ隣に位置しています。\n\n## [3] 夜のショー観賞との組み合わせ\n\n[シンフォニー・オブ・ザ・シー シーズン3（11月10日開幕）](/ja/news/symphony-of-the-sea-season-3-opening)の公演期間中は、同じエリア内でディナーとショーの観賞を合わせて楽しむことができます。食後には21:00からの[「キス・オブ・ザ・シー」花火ショー](/ja/news/kiss-of-the-sea-fireworks-viewing-tips)の観覧へとスムーズに繋げられます。\n\nメニュー内容やご利用案内は、現地または公式チャンネルにてご確認ください。\n\n出処: サンワールド・パラダイスランド・フーコック公式Facebook",
    "body_hi": "## [1] सन बावरिया गैस्ट्रोपब का परिचय\n\nयदि आप सनसेट टाउन में शाम के भोजन की योजना बना रहे हैं, तो [सन बावरिया गैस्ट्रोपब (Sun Bavaria GastroPub)](/hi/business/sun-bavaria-gastropub) एक प्रमुख विकल्प है। सन वर्ल्ड के आधिकारिक पेज ने इसे लगभग 100 व्यंजनों की भव्य दावत के रूप में पेश किया है।\n\n## [2] आधिकारिक चैनल द्वारा उल्लिखित विशेषताएं\n\n- **लगभग 100 व्यंजन**: मेहमानों के लिए विविध प्रकार के खाद्य विकल्प उपलब्ध।\n- **सीफूड और BBQ**: ग्रिल्ड बारबेक्यू और ताज़ा समुद्री खाद्य पदार्थ।\n- **फ्रेंच शैली की हस्तनिर्मित ब्रेड**: पारंपरिक फ्रांसीसी शैली में तैयार ताज़ा ब्रेड।\n- **पानी के किनारे स्थान**: यह रेस्तरां समुद्र के पानी के बिल्कुल किनारे स्थित है।\n\n## [3] शाम के शो के साथ यात्रा योजना\n\n[सिम्फनी ऑफ द सी सीजन 3 (10 नवंबर से शुरू)](/hi/news/symphony-of-the-sea-season-3-opening) के दौरान, आगंतुक उसी क्षेत्र में भोजन और शो देखने की योजना एक साथ बना सकते हैं। रात 21:00 बजे के [किस ऑफ द सी आतिशबाजी शो](/hi/news/kiss-of-the-sea-fireworks-viewing-tips) के साथ शाम का कार्यक्रम पूरा होता है।\n\nविस्तृत मेनू और संचालन व्यवस्था की पुष्टि साइट पर या आधिकारिक चैनलों से करें।\n\nस्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक",
    "faqs": [
      {
        "question": "What type of food is served at Sun Bavaria?",
        "answer": "The official announcement highlights about 100 dishes including seafood, BBQ, and French-style artisanal bread."
      },
      {
        "question": "Where is Sun Bavaria located?",
        "answer": "It is situated right at the water's edge in Sunset Town, Phu Quoc."
      }
    ],
    "faqs_ko": [
      {
        "question": "썬 바바리아에서는 어떤 메뉴를 제공하나요?",
        "answer": "선월드 공식 안내에 따르면 약 100가지 요리와 해산물, 바비큐, 프랑스식 수제 빵을 선보입니다."
      },
      {
        "question": "식당 위치는 어디인가요?",
        "answer": "푸꾸옥 선셋타운의 바다 물가 바로 옆에 자리하고 있습니다."
      }
    ],
    "faqs_zh": [
      {
        "question": "Sun Bavaria提供哪些美食？",
        "answer": "官方推介约100道菜肴，包含精选海鲜、BBQ烧烤及法式手工面包。"
      },
      {
        "question": "餐厅位于何处？",
        "answer": "坐落于富国岛日落小镇的水岸边。"
      }
    ],
    "faqs_ru": [
      {
        "question": "Какая кухня представлена в Sun Bavaria?",
        "answer": "В меню представлено около 100 блюд, включая морепродукты, BBQ и французский домашний хлеб."
      },
      {
        "question": "Где расположен ресторан?",
        "answer": "Непосредственно у кромки воды в Сансет Тауне на Фукуоке."
      }
    ],
    "faqs_ja": [
      {
        "question": "Sun Bavariaではどんな料理が楽しめますか？",
        "answer": "公式案内によると、約100種類の料理、シーフード、BBQ、フランス風自家製パンが提供されています。"
      },
      {
        "question": "レストランの場所はどこですか？",
        "answer": "フーコック島サンセットタウンの水辺のすぐ隣に位置しています。"
      }
    ],
    "faqs_hi": [
      {
        "question": "सन बावरिया में क्या परोसा जाता है?",
        "answer": "आधिकारिक घोषणा के अनुसार लगभग 100 व्यंजन, सीफूड, बारबेक्यू और फ्रेंच शैली की ब्रेड पेश की जाती है।"
      },
      {
        "question": "रेस्तरां कहाँ स्थित है?",
        "answer": "यह सनसेट टाउन में पानी के बिल्कुल किनारे स्थित है।"
      }
    ]
  },
  {
    "id": "news-maison-eric-kayser-pink-desserts-sunset-town",
    "slug": "maison-eric-kayser-pink-desserts-sunset-town",
    "content_type": "guide",
    "status": "published",
    "is_sample": false,
    "category": "Cafe & Dessert",
    "category_ko": "카페 & 디저트",
    "category_zh": "咖啡与甜品",
    "category_ru": "Кафе и десерты",
    "category_ja": "カフェ・スイーツ",
    "category_hi": "कैफे और डेसर्ट",
    "cover_image_url": "/stock/maison-eric-kayser-pink-desserts-cover.webp",
    "published_at": "2026-10-29T10:03:00+07:00",
    "updated_at": "2026-10-29T10:03:00+07:00",
    "title": "Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection",
    "title_ko": "메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종",
    "title_zh": "富国岛Maison Eric Kayser：日落小镇珍珠广场5款粉红甜点",
    "title_ru": "Maison Eric Kayser на Фукуоке: 5 розовых десертов в Сансет Тауне",
    "title_ja": "メゾン・エリック・カイザー富国島：サンセットタウンのピンクデザート5選",
    "title_hi": "मैसन एरिक काइज़र फू क्वोक: सनसेट टाउन पर्ल स्क्वायर में 5 गुलाबी डेसर्ट",
    "seo_title": "Maison Eric Kayser Sunset Town: 5 Pink Dessert Collection",
    "seo_title_ko": "메종 에릭 카이저 푸꾸옥: 선셋타운 핑크 디저트 5종",
    "seo_title_zh": "富国岛Maison Eric Kayser：日落小镇珍珠广场5款粉红甜点",
    "seo_title_ru": "Maison Eric Kayser на Фукуоке: 5 розовых десертов в Сансет Тауне",
    "seo_title_ja": "メゾン・エリック・カイザー富国島：サンセットタウンのピンクデザート5選",
    "seo_title_hi": "मैसन एरिक काइज़र फू क्वोक: सनसेट टाउन पर्ल स्क्वायर में 5 गुलाबी डेसर्ट",
    "seo_description": "Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.",
    "seo_description_ko": "푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.",
    "seo_description_zh": "富国岛日落小镇珍珠广场Maison Eric Kayser Vietnam推出的5款粉色甜点系列（覆盆子马卡龙、番石榴花蛋糕、荔枝花蛋糕、粉红圣多诺黑、覆盆子闪电泡芙）。",
    "seo_description_ru": "Коллекция из 5 розовых десертов в Maison Eric Kayser Vietnam на Жемчужной площади в Сансет Тауне: Макаронад, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré и малиновый эклер.",
    "seo_description_ja": "サンセットタウン真珠広場のMaison Eric Kayser Vietnamによるピンクデザート5種（マカロナード、グアバフラワーケーキ、ライチフラワーケーキ、ピンク・サントノーレ、ラズベリーエクレア）の紹介。",
    "seo_description_hi": "सनसेट टाउन पर्ल स्क्वायर में स्थित मैसन एरिक काइज़र वियतनाम के 5 नए गुलाबी डेसर्ट: मैकरोनेड, अमरूद फ्लावर केक, लीची फ्लावर केक, पिंक सेंट ऑनरे और रास्पबेरी एक्लेयर।",
    "excerpt": "Discover the 5 pink dessert collection by Maison Eric Kayser Vietnam at Pearl Square in Sunset Town, Phu Quoc: Macaronade, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry.",
    "excerpt_ko": "푸꾸옥 선셋타운 진주 광장에 위치한 메종 에릭 카이저 베트남이 선보인 핑크 디저트 5종(마카로나드, 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어) 안내.",
    "excerpt_zh": "富国岛日落小镇珍珠广场Maison Eric Kayser Vietnam推出的5款粉色甜点系列（覆盆子马卡龙、番石榴花蛋糕、荔枝花蛋糕、粉红圣多诺黑、覆盆子闪电泡芙）。",
    "excerpt_ru": "Коллекция из 5 розовых десертов в Maison Eric Kayser Vietnam на Жемчужной площади в Сансет Тауне: Макаронад, Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré и малиновый эклер.",
    "excerpt_ja": "サンセットタウン真珠広場のMaison Eric Kayser Vietnamによるピンクデザート5種（マカロナード、グアバフラワーケーキ、ライチフラワーケーキ、ピンク・サントノーレ、ラズベリーエクレア）の紹介。",
    "excerpt_hi": "सनसेट टाउन पर्ल स्क्वायर में स्थित मैसन एरिक काइज़र वियतनाम के 5 नए गुलाबी डेसर्ट: मैकरोनेड, अमरूद फ्लावर केक, लीची फ्लावर केक, पिंक सेंट ऑनरे और रास्पबेरी एक्लेयर।",
    "hero_caption": "AI-generated illustration: Light pink dessert collection on a cafe table at Sunset Town",
    "hero_caption_ko": "AI-generated illustration: 선셋타운 카페 테이블 위에 정갈하게 놓인 핑크 디저트 컬렉션 일러스트",
    "hero_caption_zh": "AI-generated illustration: 日落小镇咖啡厅餐桌上摆放的粉色系甜点插画",
    "hero_caption_ru": "AI-generated illustration: Коллекция нежно-розовых десертов на столике кафе в Сансет Тауне",
    "hero_caption_ja": "AI-generated illustration: サンセットタウンのカフェテーブルに並ぶピンクデザートのイラスト",
    "hero_caption_hi": "AI-generated illustration: सनसेट टाउन के कैफे टेबल पर 5 गुलाबी डेसर्ट की सुंदर प्रस्तुति",
    "body_ko": "## [1] 메종 에릭 카이저 핑크 디저트 컬렉션\n\n선셋타운 진주 광장(Quảng trường Ngọc Trai)에 위치한 메종 에릭 카이저 베트남(Maison Eric Kayser Vietnam)이 핑크 디저트 컬렉션을 선보였습니다. \n\n선월드 공식 페이지에서 소개한 5가지 신메뉴는 다음과 같습니다:\n\n1. **마카로나드(Macaronade)** — 라즈베리 크림\n2. **구아바 플라워 케이크(Guava Flower Cake)**\n3. **리치 플라워 케이크(Lychee Flower Cake)**\n4. **핑크 생토노레(Pink Saint Honoré)**\n5. **라즈베리 에클레어(Eclair Raspberry)**\n\n## [2] 방문 및 이용 팁\n\n선셋타운을 산책하다 잠시 쉬어 가며 디저트를 즐기기 좋습니다. \n\n메뉴 구성은 매장 사정에 따라 달라질 수 있으니 방문 전에 공식 채널을 확인해 주세요.\n\n- [선셋타운 로맨틱 산책 코스](/ko/news/sunset-town-romantic-walking-course) 중 진주 광장 쉼터로 함께 계획해 보세요.\n\n출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북",
    "body": "## [1] Pink Dessert Collection by Maison Eric Kayser\n\nSituated at Pearl Square (Quảng trường Ngọc Trai) in Sunset Town, Maison Eric Kayser Vietnam has debuted an exclusive collection of five pink-themed desserts.\n\nThe 5 signature items introduced on the official Sun World channel include:\n\n1. **Macaronade** — Featuring raspberry cream\n2. **Guava Flower Cake**\n3. **Lychee Flower Cake**\n4. **Pink Saint Honoré**\n5. **Eclair Raspberry**\n\n## [2] Visitor Tips & Walk Integration\n\nThis spot provides a relaxing stop for sweet pastries while strolling through Sunset Town. \n\nDaily menu availability may vary based on store conditions; please consult official channels prior to your visit.\n\n- Explore the [Sunset Town Romantic Walking Course](/news/sunset-town-romantic-walking-course) which naturally passes through Pearl Square.\n\nSource: Sun World Paradise Land Phu Quoc Official Facebook",
    "body_zh": "## [1] Maison Eric Kayser粉色甜点系列\n\n位于日落小镇珍珠广场（Quảng trường Ngọc Trai）的Maison Eric Kayser Vietnam最新推出了粉色主题甜点系列。\n\n太阳世界官方页面公布的5款甜点包括：\n\n1. **覆盆子马卡龙（Macaronade）** — 搭配覆盆子奶油\n2. **番石榴花蛋糕（Guava Flower Cake）**\n3. **荔枝花蛋糕（Lychee Flower Cake）**\n4. **粉红圣多诺黑（Pink Saint Honoré）**\n5. **覆盆子闪电泡芙（Eclair Raspberry）**\n\n## [2] 游玩与品尝建议\n\n漫步日落小镇途中，此处是停下脚步品尝甜点、小憩片刻的理想去处。\n\n具体供应情况可能视门店当日情况有所变动，建议到访前咨询官方渠道。\n\n- 推荐结合[日落小镇浪漫漫步路线](/zh/news/sunset-town-romantic-walking-course)规划行程。\n\n出处：Sun World Paradise Land Phu Quoc 官方 Facebook",
    "body_ru": "## [1] Коллекция розовых десертов в Maison Eric Kayser\n\nПекарня Maison Eric Kayser Vietnam, расположенная на Жемчужной площади (Quảng trường Ngọc Trai) в Сансет Тауне, представила коллекцию из пяти десертов в розовой цветовой гамме.\n\nВ официальном анонсе представлены следующие 5 позиций:\n\n1. **Макаронад (Macaronade)** — с малиновым кремом\n2. **Цветочный торт с гуавой (Guava Flower Cake)**\n3. **Цветочный торт с личи (Lychee Flower Cake)**\n4. **Розовый Сент-Оноре (Pink Saint Honoré)**\n5. **Малиновый эклер (Eclair Raspberry)**\n\n## [2] Советы гостям\n\nКафе отлично подходит для приятной паузы с десертом во время неспешной прогулки по Сансет Тауну.\n\nАссортимент может меняться в зависимости от текущего наличия в кондитерской, перед визитом рекомендуем свериться с официальной информацией.\n\n- Ознакомьтесь с [Романтическим пешеходным маршрутом по Сансет Тауну](/ru/news/sunset-town-romantic-walking-course).\n\nИсточник: официальная страница Sun World Paradise Land Phu Quoc в Facebook",
    "body_ja": "## [1] メゾン・エリック・カイザーのピンクデザートコレクション\n\nサンセットタウンの真珠広場（Quảng trường Ngọc Trai）に位置する「Maison Eric Kayser Vietnam」が、5種類のピンクデザートコレクションを発表しました。\n\n公式ページで紹介された5つの新メニュー：\n\n1. **マカロナード（Macaronade）** — ラズベリークリーム\n2. **グアバフラワーケーキ（Guava Flower Cake）**\n3. **ライチフラワーケーキ（Lychee Flower Cake）**\n4. **ピンク・サントノーレ（Pink Saint Honoré）**\n5. **ラズベリーエクレア（Eclair Raspberry）**\n\n## [2] ご利用のヒント\n\nサンセットタウン散策の合間に立ち寄り、甘いデザートとともにひと休みするのに最適です。\n\nメニュー内容は店舗の状況により変更される場合がありますので、ご来店前に公式チャンネルをご確認ください。\n\n- [サンセットタウン散策コース](/ja/news/sunset-town-romantic-walking-course)と合わせてお楽しみください。\n\n出処: サンワールド・パラダイスランド・フーコック公式Facebook",
    "body_hi": "## [1] मैसन एरिक काइज़र का गुलाबी डेसर्ट संग्रह\n\nसनसेट टाउन के पर्ल स्क्वायर (Quảng trường Ngọc Trai) में स्थित मैसन एरिक काइज़र वियतनाम (Maison Eric Kayser Vietnam) ने 5 नए गुलाबी डेसर्ट का संग्रह पेश किया है।\n\nसन वर्ल्ड के आधिकारिक पेज पर पेश किए गए 5 व्यंजन:\n\n1. **मैकरोनेड (Macaronade)** — रास्पबेरी क्रीम के साथ\n2. **अमरूद फ्लावर केक (Guava Flower Cake)**\n3. **लीची फ्लावर केक (Lychee Flower Cake)**\n4. **पिंक सेंट ऑनरे (Pink Saint Honoré)**\n5. **रास्पबेरी एक्लेयर (Eclair Raspberry)**\n\n## [2] आगंतुक सुझाव\n\nसनसेट टाउन में घूमते समय थोड़ी देर रुककर इन स्वादिष्ट डेसर्ट का आनंद लेना एक बेहतरीन विकल्प है।\n\nदुकान की दैनिक स्थिति के अनुसार मेनू में बदलाव हो सकता है, कृपया जाने से पहले आधिकारिक चैनल से पुष्टि करें।\n\n- इसे [सनसेट टाउन रोमांटिक वॉक रूट](/hi/news/sunset-town-romantic-walking-course) के साथ शामिल करें।\n\nस्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक",
    "faqs": [
      {
        "question": "Where is Maison Eric Kayser located in Sunset Town?",
        "answer": "At Pearl Square (Quảng trường Ngọc Trai) in Sunset Town, Phu Quoc."
      },
      {
        "question": "What are the 5 pink desserts?",
        "answer": "Macaronade (raspberry cream), Guava Flower Cake, Lychee Flower Cake, Pink Saint Honoré, and Eclair Raspberry."
      }
    ],
    "faqs_ko": [
      {
        "question": "메종 에릭 카이저는 선셋타운 어디에 있나요?",
        "answer": "선셋타운 진주 광장(Quảng trường Ngọc Trai)에 위치해 있습니다."
      },
      {
        "question": "새로 선보인 핑크 디저트 5종은 무엇인가요?",
        "answer": "마카로나드(라즈베리 크림), 구아바 플라워 케이크, 리치 플라워 케이크, 핑크 생토노레, 라즈베리 에클레어입니다."
      }
    ],
    "faqs_zh": [
      {
        "question": "Maison Eric Kayser位于日落小镇何处？",
        "answer": "位于日落小镇珍珠广场（Quảng trường Ngọc Trai）。"
      },
      {
        "question": "5款粉色甜点分别是什么？",
        "answer": "覆盆子马卡龙、番石榴花蛋糕、荔枝花蛋糕、粉红圣多诺黑以及覆盆子闪电泡芙。"
      }
    ],
    "faqs_ru": [
      {
        "question": "Где находится Maison Eric Kayser?",
        "answer": "На Жемчужной площади (Quảng trường Ngọc Trai) в Сансет Тауне."
      },
      {
        "question": "Какие 5 десертов вошли в коллекцию?",
        "answer": "Макаронад с малиновым кремом, торт с гуавой, торт с личи, розовый Сент-Оноре и малиновый эклер."
      }
    ],
    "faqs_ja": [
      {
        "question": "メゾン・エリック・カイザーの場所はどこですか？",
        "answer": "サンセットタウンの真珠広場（Quảng trường Ngọc Trai）にあります。"
      },
      {
        "question": "ピンクデザート5種の内訳は？",
        "answer": "マカロナード、グアバフラワーケーキ、ライチフラワーケーキ、ピンク・サントノーレ、ラズベリーエクレアです。"
      }
    ],
    "faqs_hi": [
      {
        "question": "मैसन एरिक काइज़र कहाँ स्थित है?",
        "answer": "सनसेट टाउन के पर्ल स्क्वायर में स्थित है।"
      },
      {
        "question": "5 नए गुलाबी डेसर्ट कौन से हैं?",
        "answer": "मैकरोनेड, अमरूद फ्लावर केक, लीची फ्लावर केक, पिंक सेंट ऑनरे और रास्पबेरी एक्लेयर।"
      }
    ]
  },
  {
    "id": "news-eschuri-vung-bau-golf-phu-quoc",
    "slug": "eschuri-vung-bau-golf-phu-quoc",
    "content_type": "guide",
    "status": "published",
    "is_sample": false,
    "category": "Activity & Golf",
    "category_ko": "액티비티 & 골프",
    "category_zh": "活动与高尔夫",
    "category_ru": "Активности и гольф",
    "category_ja": "アクティビティ・ゴルフ",
    "category_hi": "गतिविधियां और गोल्फ",
    "cover_image_url": "/stock/eschuri-vung-bau-golf-course-cover.webp",
    "published_at": "2026-10-29T10:02:00+07:00",
    "updated_at": "2026-10-29T10:02:00+07:00",
    "title": "Eschuri Vung Bau Golf: 18-Hole Course Between Virgin Forest and Sea",
    "title_ko": "에스추리 벙바우 골프장: 원시림과 해안 사이 18홀 코스",
    "title_zh": "Eschuri Vung Bau高尔夫：坐落于原始森林与海岸之间的18洞球场",
    "title_ru": "Eschuri Vung Bau Golf: 18-луночное поле между реликтовым лесом и морем",
    "title_ja": "エシュリ・ヴンバウ・ゴルフ：原生林と海岸の間に広がる18ホールコース",
    "title_hi": "एस्चुरी वुंग बाउ गोल्फ: प्राचीन जंगल और समुद्र के बीच 18-होल गोल्फ कोर्स",
    "seo_title": "Eschuri Vung Bau Golf: 18-Hole Course Between Virgin Forest and Sea",
    "seo_title_ko": "에스추리 벙바우 골프장: 원시림과 해안 사이 18홀 코스",
    "seo_title_zh": "Eschuri Vung Bau高尔夫：坐落于原始森林与海岸之间的18洞球场",
    "seo_title_ru": "Eschuri Vung Bau Golf: 18-луночное поле между реликтовым лесом и морем",
    "seo_title_ja": "エシュリ・ヴンバウ・ゴルフ：原生林と海岸の間に広がる18ホールコース",
    "seo_title_hi": "एस्चुरी वुंग बाउ गोल्फ: प्राचीन जंगल और समुद्र के बीच 18-होल गोल्फ कोर्स",
    "seo_description": "Explore Eschuri Vung Bau Golf in Phu Quoc, set between ancient virgin forest and the coastline. Features preserved old trees, marine wind/salinity management, and caddie service.",
    "seo_description_ko": "푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.",
    "seo_description_zh": "富国岛Eschuri Vung Bau高尔夫球场介绍。球场坐落于原始森林与海岸线之间，保留古树原生风貌，根据海风与盐分进行球道维护，并提供球童服务。",
    "seo_description_ru": "Обзор поля Eschuri Vung Bau Golf на Фукуоке, расположенного между реликтовым лесом и морским побережьем: сохранение вековых деревьев, учет ветра и солености, сервис кэдди.",
    "seo_description_ja": "フーコック島の原生林と海岸の間に位置するEschuri Vung Bau Golfの紹介。古木を活かしたコース、海風と塩分に配慮したコース管理、キャディサービスをご案内。",
    "seo_description_hi": "फू क्वोक के प्राचीन जंगल और तटरेखा के बीच स्थित एस्चुरी वुंग बाउ गोल्फ का परिचय। पुराने वृक्षों का संरक्षण, समुद्री हवा और लवणता के अनुकूल रखरखाव व कैडी सेवा उपलब्ध।",
    "excerpt": "Explore Eschuri Vung Bau Golf in Phu Quoc, set between ancient virgin forest and the coastline. Features preserved old trees, marine wind/salinity management, and caddie service.",
    "excerpt_ko": "푸꾸옥 원시림과 해안 사이에 자리한 에스추리 벙바우 골프(Eschuri Vung Bau Golf) 소개. 오래된 나무 보존, 바람과 염분 환경을 고려한 코스 관리 및 캐디 서비스 안내.",
    "excerpt_zh": "富国岛Eschuri Vung Bau高尔夫球场介绍。球场坐落于原始森林与海岸线之间，保留古树原生风貌，根据海风与盐分进行球道维护，并提供球童服务。",
    "excerpt_ru": "Обзор поля Eschuri Vung Bau Golf на Фукуоке, расположенного между реликтовым лесом и морским побережьем: сохранение вековых деревьев, учет ветра и солености, сервис кэдди.",
    "excerpt_ja": "フーコック島の原生林と海岸の間に位置するEschuri Vung Bau Golfの紹介。古木を活かしたコース、海風と塩分に配慮したコース管理、キャディサービスをご案内。",
    "excerpt_hi": "फू क्वोक के प्राचीन जंगल और तटरेखा के बीच स्थित एस्चुरी वुंग बाउ गोल्फ का परिचय। पुराने वृक्षों का संरक्षण, समुद्री हवा और लवणता के अनुकूल रखरखाव व कैडी सेवा उपलब्ध।",
    "hero_caption": "AI-generated illustration: Panoramic aerial view of 18-hole golf course between virgin forest and coastline in Phu Quoc",
    "hero_caption_ko": "AI-generated illustration: 푸꾸옥 원시림과 해안선 사이에 펼쳐진 18홀 골프 코스 전경 일러스트",
    "hero_caption_zh": "AI-generated illustration: 富国岛原始森林与海岸线之间的18洞高尔夫球场全景插画",
    "hero_caption_ru": "AI-generated illustration: Панорамный вид на 18-луночное поле для гольфа между реликтовым лесом и морем",
    "hero_caption_ja": "AI-generated illustration: 原生林と海岸の間に広がる18ホールゴルフコースのパノラマイラスト",
    "hero_caption_hi": "AI-generated illustration: प्राचीन जंगल और समुद्र तट के बीच 18-होल गोल्फ कोर्स का विहंगम दृश्य",
    "body_ko": "## [1] 에스추리 벙바우 골프 소개\n\n푸꾸옥에서 골프를 계획하고 있다면 에스추리 벙바우 골프(Eschuri Vung Bau Golf)를 눈여겨볼 만합니다. \n\n## [2] 선월드 공식 페이지에서 소개한 특징\n\n- **원시림과 해안 사이**: 울창한 원시림과 바다 해안선 사이에 위치해 있습니다.\n- **오래된 나무 보존**: 수령이 오래된 나무들을 보존하여 골프 코스에 반영했습니다.\n- **환경 맞춤 코스 관리**: 강한 바닷바람과 염분이 있는 해안 환경을 고려하여 잔디와 코스를 관리합니다.\n- **캐디 서비스 제공**: 라운딩 중 캐디 서비스를 제공합니다.\n\n## [3] 이용 안내\n\n이용 방법과 예약 관련 정보는 공식 채널에서 확인해 주세요.\n\n- 푸꾸옥 남부 선셋타운과 연계한 여정은 [컨데나스트 1위 섬 남부 여행 코스](/ko/news/conde-nast-top-island-sunset-town-course)를 참고하세요.\n\n출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북",
    "body": "## [1] Introduction to Eschuri Vung Bau Golf\n\nFor golfers planning a trip to Phu Quoc, Eschuri Vung Bau Golf is an acclaimed sports venue to consider.\n\n## [2] Key Course Features Highlighted by Sun World\n\n- **Situated Between Forest & Coast**: Nestled between native virgin forest and the marine shoreline.\n- **Preservation of Ancient Trees**: Existing mature trees were preserved and integrated directly into the course layout.\n- **Environment-Specific Course Management**: Maintained to account for strong coastal winds and salt exposure.\n- **Caddie Services**: Full caddie service is provided during rounds.\n\n## [3] Booking & Visitor Guidance\n\nPlease verify reservation policies, tee times, and visitor guidance directly through official channels before your visit.\n\n- For connecting your golfing visit with southern attractions, review the [Condé Nast #1 Island Sunset Town Course](/news/conde-nast-top-island-sunset-town-course).\n\nSource: Sun World Paradise Land Phu Quoc Official Facebook",
    "body_zh": "## [1] Eschuri Vung Bau高尔夫球场介绍\n\n如果您计划在富国岛体验高尔夫运动，Eschuri Vung Bau Golf是一处备受关注的球场。\n\n## [2] 太阳世界官方介绍的核心特色\n\n- **坐落于森林与海岸之间**：球场巧妙地布局于原始森林与海岸线相交汇的自然环境之中。\n- **保护古树原生风貌**：在球场设计中保留了当地历史悠久的古树。\n- **针对海洋环境的球道维护**：针对强海风和盐分环境进行精细化养护。\n- **配备球童服务**：打球过程中提供球童服务。\n\n## [3] 预约与游览须知\n\n球场使用细则与预约详情请通过官方渠道咨询确认。\n\n- 结合南部景点的行程规划，可参考[《悦游》榜首岛屿日落小镇游览路线](/zh/news/conde-nast-top-island-sunset-town-course)。\n\n出处：Sun World Paradise Land Phu Quoc 官方 Facebook",
    "body_ru": "## [1] О гольф-клубе Eschuri Vung Bau\n\nДля любителей гольфа, планирующих поездку на Фукуок, поле Eschuri Vung Bau Golf представляет особый интерес.\n\n## [2] Особенности из официального описания Sun World\n\n- **Расположение между лесом и морем**: Поле раскинулось между девственным лесом и морской береговой линией.\n- **Сохранение вековых деревьев**: При формировании лунок были сохранены реликтовые деревья.\n- **Уход с учетом морского климата**: Трава и фервеи обслуживаются с учетом воздействия морского бриза и соли.\n- **Сервис кэдди**: Игрокам предоставляется сопровождение кэдди.\n\n## [3] Бронирование и справки\n\nИнформацию о бронировании и правилах посещения уточняйте по официальным каналам.\n\n- Идеи для поездки по югу острова: [Гид по Сансет Тауну на лучшем острове Азии](/ru/news/conde-nast-top-island-sunset-town-course).\n\nИсточник: официальная страница Sun World Paradise Land Phu Quoc в Facebook",
    "body_ja": "## [1] エシュリ・ヴンバウ・ゴルフのご紹介\n\nフーコック島でゴルフを計画されているなら、Eschuri Vung Bau Golfが注目されます。\n\n## [2] サンワールド公式によるコースの特徴\n\n- **原生林と海岸の間**: 豊かな原生林と海沿いの海岸線の間に位置しています。\n- **古木の保存**: 樹齢を重ねた樹木をそのまま保存し、コースレイアウトに反映。\n- **環境に配慮したコース管理**: 強い海風や塩分を含む環境を考慮した芝管理が行われています。\n- **キャディサービス**: ラウンド中のキャディサービスが提供されます。\n\n## [3] ご利用案内\n\nご利用方法やご予約に関する詳細は、公式チャンネルにてご確認ください。\n\n- 南部エリアの観光と合わせる場合は、[コンデナスト1位の島 サンセットタウン観光コース](/ja/news/conde-nast-top-island-sunset-town-course)もご参照ください。\n\n出処: サンワールド・パラダイスランド・フーコック公式Facebook",
    "body_hi": "## [1] एस्चुरी वुंग बाउ गोल्फ का परिचय\n\nफू क्वोक में गोल्फ खेलने की योजना बनाने वाले यात्रियों के लिए एस्चुरी वुंग बाउ गोल्फ (Eschuri Vung Bau Golf) एक उल्लेखनीय कोर्स है।\n\n## [2] सन वर्ल्ड के अनुसार मुख्य विशेषताएं\n\n- **जंगल और तट के बीच**: यह कोर्स घने प्राचीन जंगल और समुद्र तट के बीच स्थित है।\n- **पुराने वृक्षों का संरक्षण**: कोर्स के लेआउट में पुराने और बड़े पेड़ों को संरक्षित किया गया है।\n- **पर्यावरण अनुकूल प्रबंधन**: तेज समुद्री हवा और खारे वातावरण को ध्यान में रखकर कोर्स की देखभाल की जाती है।\n- **कैडी सेवा**: खेल के दौरान कैडी सेवा उपलब्ध कराई जाती है।\n\n## [3] उपयोग व बुकिंग दिशा-निर्देश\n\nउपयोग के नियम और बुकिंग से संबंधित जानकारी के लिए कृपया आधिकारिक चैनल देखें।\n\n- दक्षिणी फू क्वोक की यात्रा के लिए [कोंडे नास्ट #1 द्वीप सनसेट टाउन कोर्स](/hi/news/conde-nast-top-island-sunset-town-course) देखें।\n\nस्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक",
    "faqs": [
      {
        "question": "Where is Eschuri Vung Bau Golf located?",
        "answer": "It is situated between virgin forest and the coastline in Phu Quoc."
      },
      {
        "question": "Are caddie services available?",
        "answer": "Yes, caddie services are officially provided during rounds."
      }
    ],
    "faqs_ko": [
      {
        "question": "에스추리 벙바우 골프장은 어디에 위치해 있나요?",
        "answer": "푸꾸옥의 원시림과 해안선 사이에 위치해 있습니다."
      },
      {
        "question": "캐디 서비스가 제공되나요?",
        "answer": "네, 라운딩 시 캐디 서비스가 제공된다고 공식 소개되어 있습니다."
      }
    ],
    "faqs_zh": [
      {
        "question": "Eschuri Vung Bau高尔夫球场位于何处？",
        "answer": "坐落于富国岛原始森林与海岸线之间。"
      },
      {
        "question": "球场是否提供球童服务？",
        "answer": "是的，官方介绍明确提供球童服务。"
      }
    ],
    "faqs_ru": [
      {
        "question": "Где находится гольф-клуб Eschuri Vung Bau?",
        "answer": "Между реликтовым лесом и береговой линией Фукуока."
      },
      {
        "question": "Предоставляются ли услуги кэдди?",
        "answer": "Да, согласно официальному анонсу, сервис кэдди доступен."
      }
    ],
    "faqs_ja": [
      {
        "question": "エシュリ・ヴンバウ・ゴルフの立地は？",
        "answer": "フーコック島の原生林と海岸線の間に位置しています。"
      },
      {
        "question": "キャディサービスはありますか？",
        "answer": "はい、公式案内においてキャディサービスが提供されると明記されています。"
      }
    ],
    "faqs_hi": [
      {
        "question": "एस्चुरी वुंग बाउ गोल्फ कहाँ स्थित है?",
        "answer": "यह फू क्वोक में प्राचीन जंगल और समुद्र तट के बीच स्थित है।"
      },
      {
        "question": "क्या कैडी सेवा उपलब्ध है?",
        "answer": "हाँ, आधिकारिक जानकारी के अनुसार कैडी सेवा प्रदान की जाती है।"
      }
    ]
  },
  {
    "id": "news-sunset-town-romantic-walking-course",
    "slug": "sunset-town-romantic-walking-course",
    "content_type": "guide",
    "status": "published",
    "is_sample": false,
    "category": "Travel Guide",
    "category_ko": "여행 가이드",
    "category_zh": "旅游指南",
    "category_ru": "Путеводитель",
    "category_ja": "旅行ガイド",
    "category_hi": "यात्रा गाइड",
    "cover_image_url": "/stock/sunset-town-romantic-walk-cover.webp",
    "published_at": "2026-10-29T10:01:00+07:00",
    "updated_at": "2026-10-29T10:01:00+07:00",
    "title": "Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks",
    "title_ko": "선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼",
    "title_zh": "日落小镇浪漫漫步路线：从太阳神喷泉到日落烟花秀",
    "title_ru": "Романтический маршрут по Сансет Тауну: от фонтана до вечернего салюта",
    "title_ja": "サンセットタウン散策コース：太陽神の噴水から日没後の花火ショーまで",
    "title_hi": "सनसेट टाउन रोमांटिक वॉक रूट: सन गॉड फव्वारे से आतिशबाजी तक",
    "seo_title": "Sunset Town Romantic Walking Course: From Sun God Fountain to Fireworks",
    "seo_title_ko": "선셋타운 로맨틱 산책 코스: 분수대부터 일몰 불꽃쇼",
    "seo_title_zh": "日落小镇浪漫漫步路线：从太阳神喷泉到日落烟花秀",
    "seo_title_ru": "Романтический маршрут по Сансет Тауну: от фонтана до вечернего салюта",
    "seo_title_ja": "サンセットタウン散策コース：太陽神の噴水から日没後の花火ショーまで",
    "seo_title_hi": "सनसेट टाउन रोमांटिक वॉक रूट: सन गॉड फव्वारे से आतिशबाजी तक",
    "seo_description": "A couple's walking course through Sunset Town's highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.",
    "seo_description_ko": "선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.",
    "seo_description_zh": "依据太阳世界官方介绍整理的日落小镇情侣漫步路线：太阳神喷泉与欧风街区、相隔30厘米的亲吻桥、珍珠广场，以及日落后的烟花秀。",
    "seo_description_ru": "Прогулочный маршрут по ключевым местам Сансет Тауна от Sun World: фонтан Солнца, европейские улочки, мост Kiss Bridge с пролетом 30 см, Жемчужная площадь и салют после заката.",
    "seo_description_ja": "サンワールド公式発表に基づくサンセットタウン散策コース：太陽神の噴水と欧風の街並み、隙間が30cmのキス・ブリッジ、真珠広場、日没後の花火ショー。",
    "seo_description_hi": "सन वर्ल्ड की आधिकारिक घोषणाओं पर आधारित सनसेट टाउन वॉक रूट: सन गॉड फव्वारा, यूरोपीय सड़कें, किस ब्रिज (30 सेमी दूरी), पर्ल स्क्वायर और सूर्यास्त के बाद आतिशबाजी।",
    "excerpt": "A couple's walking course through Sunset Town's highlights based on Sun World announcements: Sun God Fountain, European-style streets, Kiss Bridge (30cm gap), Pearl Square, and post-sunset fireworks.",
    "excerpt_ko": "선월드 공식 페이지에서 소개한 선셋타운 주요 명소 산책 코스. 썬 갓 분수와 유럽풍 거리, 틈이 30cm인 키스 브릿지, 진주 광장, 일몰 후 불꽃쇼까지 이어지는 코스 정리.",
    "excerpt_zh": "依据太阳世界官方介绍整理的日落小镇情侣漫步路线：太阳神喷泉与欧风街区、相隔30厘米的亲吻桥、珍珠广场，以及日落后的烟花秀。",
    "excerpt_ru": "Прогулочный маршрут по ключевым местам Сансет Тауна от Sun World: фонтан Солнца, европейские улочки, мост Kiss Bridge с пролетом 30 см, Жемчужная площадь и салют после заката.",
    "excerpt_ja": "サンワールド公式発表に基づくサンセットタウン散策コース：太陽神の噴水と欧風の街並み、隙間が30cmのキス・ブリッジ、真珠広場、日没後の花火ショー。",
    "excerpt_hi": "सन वर्ल्ड की आधिकारिक घोषणाओं पर आधारित सनसेट टाउन वॉक रूट: सन गॉड फव्वारा, यूरोपीय सड़कें, किस ब्रिज (30 सेमी दूरी), पर्ल स्क्वायर और सूर्यास्त के बाद आतिशबाजी।",
    "hero_caption": "AI-generated illustration: Sunset Town promenade with fountain and Mediterranean buildings at sunset",
    "hero_caption_ko": "AI-generated illustration: 해 질 녘 선셋타운 분수대와 유럽 지중해풍 거리 산책로 일러스트",
    "hero_caption_zh": "AI-generated illustration: 日落时分日落小镇喷泉与地中海风情建筑漫步道插画",
    "hero_caption_ru": "AI-generated illustration: Набережная Сансет Тауна с фонтаном и средиземноморской архитектурой на закате",
    "hero_caption_ja": "AI-generated illustration: 夕暮れのサンセットタウンの噴水と地中海風の街並み散策路イラスト",
    "hero_caption_hi": "AI-generated illustration: सूर्यास्त के समय सनसेट टाउन के फव्वारे और भूमध्यसागरीय शैली के रास्ते का दृश्य",
    "body_ko": "## [1] 선셋타운 산책 코스 개요\n\n선월드 공식 페이지에서 소개한 선셋타운의 주요 명소를 바탕으로 커플과 여행자가 함께 즐길 수 있는 산책 코스를 정리했습니다.\n\n## [2] 4단계 추천 산책 코스\n\n### 1단계: 썬 갓 분수(Thần Mặt Trời)와 유럽풍 거리\n지중해풍 파스텔톤 파사드가 이어지는 골목길과 썬 갓 분수대를 둘러보며 산책을 시작합니다.\n\n### 2단계: 키스 브릿지(Cầu Hôn)\n바다를 향해 뻗은 [키스 브릿지(Kiss Bridge)](/ko/business/kiss-bridge)는 양쪽 교각 사이의 틈이 30cm라고 소개되어 있습니다. 일몰 무렵의 바다 경관을 감상하기 좋습니다.\n\n### 3단계: 진주 광장(Quảng trường Ngọc Trai)\n산책 도중 잠시 쉬어 가며 디저트를 즐기기 좋은 곳입니다. 진주 광장에 위치한 [메종 에릭 카이저 핑크 디저트 5종](/ko/news/maison-eric-kayser-pink-desserts-sunset-town)을 만나보세요.\n\n### 4단계: 해가 진 뒤의 불꽃쇼\n일몰 후에는 불꽃쇼가 이어진다고 소개되어 있습니다. \n- [심포니 오브 더 씨 시즌 3(11월 10일 개막)](/ko/news/symphony-of-the-sea-season-3-opening)\n- [키스 오브 더 씨 불꽃쇼(21:00)](/ko/news/kiss-of-the-sea-fireworks-viewing-tips)\n\n출처: 선월드 파라다이스 랜드 푸꾸옥 공식 페이스북",
    "body": "## [1] Sunset Town Walking Course Overview\n\nBased on key landmarks introduced by the official Sun World channel, here is an evening walking course designed for couples and visitors in Sunset Town.\n\n## [2] 4-Step Recommended Course\n\n### Step 1: Sun God Fountain (Thần Mặt Trời) & European Streets\nBegin your stroll around the iconic Sun God Fountain and through the Mediterranean-styled pastel streets.\n\n### Step 2: Kiss Bridge (Cầu Hôn)\nExtending over the sea, [Kiss Bridge](/business/kiss-bridge) features an architectural gap officially described as 30 cm between its two pedestrian spans. It offers sweeping sunset vistas over the ocean.\n\n### Step 3: Pearl Square (Quảng trường Ngọc Trai)\nA relaxing stop to pause for sweet treats. Visit [Maison Eric Kayser's 5 Pink Desserts](/news/maison-eric-kayser-pink-desserts-sunset-town) situated right at Pearl Square.\n\n### Step 4: Post-Sunset Fireworks & Shows\nAfter the sun sets, the district transitions into evening shows and fireworks:\n- [Symphony of the Sea Season 3 (opening November 10)](/news/symphony-of-the-sea-season-3-opening)\n- [Kiss of the Sea Show & Fireworks (21:00)](/news/kiss-of-the-sea-fireworks-viewing-tips)\n\nSource: Sun World Paradise Land Phu Quoc Official Facebook",
    "body_zh": "## [1] 日落小镇漫步路线概述\n\n依据太阳世界官方页面推介的日落小镇核心地标，为情侣及游客梳理出一条经典的漫步游览路线。\n\n## [2] 4段推荐漫步路线\n\n### 第1站：太阳神喷泉（Thần Mặt Trời）与欧陆风情街\n围绕标志性的太阳神喷泉启程，穿行于地中海色彩斑斓的欧式街道之中。\n\n### 第2站：亲吻桥（Cầu Hôn）\n横跨于海面的[亲吻桥（Kiss Bridge）](/zh/business/kiss-bridge)两端桥体相距仅30厘米。此处是饱览海上落日的绝佳位置。\n\n### 第3站：珍珠广场（Quảng trường Ngọc Trai）\n漫步途中的休憩好去处。不妨品尝位于珍珠广场的[Maison Eric Kayser 5款粉色甜点](/zh/news/maison-eric-kayser-pink-desserts-sunset-town)。\n\n### 第4站：日落之后的烟花盛宴\n日落之后，日落小镇将迎来精彩的晚间大秀与烟花展示：\n- [《海洋交响乐》第3季（11月10日开幕）](/zh/news/symphony-of-the-sea-season-3-opening)\n- [《海洋之吻》大秀与烟花（每晚21:00）](/zh/news/kiss-of-the-sea-fireworks-viewing-tips)\n\n出处：Sun World Paradise Land Phu Quoc 官方 Facebook",
    "body_ru": "## [1] Обзор пешеходного маршрута по Сансет Тауну\n\nНа основе официальных материалов Sun World подготовлен последовательный прогулочный маршрут для пар и гостей города.\n\n## [2] 4 этапа рекомендованного маршрута\n\n### Этап 1: Фонтан Солнца (Thần Mặt Trời) и европейские улочки\nНачните прогулку у монументального фонтана Бога Солнца, любуясь фасадами в пастельных средиземноморских тонах.\n\n### Этап 2: Мост Kiss Bridge (Cầu Hôn)\nВыступающий в море пешеходный [мост Kiss Bridge](/ru/business/kiss-bridge) имеет официальный пролет в 30 см между двумя арками, открывая великолепный вид на морской закат.\n\n### Этап 3: Жемчужная площадь (Quảng trường Ngọc Trai)\nПриятная остановка для отдыха. На площади расположена пекарня с [коллекцией 5 розовых десертов Maison Eric Kayser](/ru/news/maison-eric-kayser-pink-desserts-sunset-town).\n\n### Этап 4: Вечерний салют и представления\nПосле захода солнца на набережной разворачиваются вечерние шоу:\n- [3-й сезон шоу «Симфония моря» (старт 10 ноября)](/ru/news/symphony-of-the-sea-season-3-opening)\n- [Вечернее шоу «Поцелуй моря» и салют в 21:00](/ru/news/kiss-of-the-sea-fireworks-viewing-tips)\n\nИсточник: официальная страница Sun World Paradise Land Phu Quoc в Facebook",
    "body_ja": "## [1] サンセットタウン散策コースの概要\n\nサンワールド公式ページで紹介されている主要スポットをもとに、カップルや旅行者が楽しめるおすすめの散策ルートをまとめました。\n\n## [2] 4つのステップでおすすめする散策ルート\n\n### ステップ1: 太陽神の噴水（Thần Mặt Trời）と欧風の街並み\nパステルカラーの地中海風建築が並ぶ路地と太陽神の噴水から散策をスタートします。\n\n### ステップ2: キス・ブリッジ（Cầu Hôn）\n海に向かって延びる[キス・ブリッジ](/ja/business/kiss-bridge)は、橋と橋の間の隙間が30cmと紹介されています。夕暮れの美しい海を一望できます。\n\n### ステップ3: 真珠広場（Quảng trường Ngọc Trai）\n散策途中のひと休みに最適なスポット。真珠広場にある[メゾン・エリック・カイザーのピンクデザート5種](/ja/news/maison-eric-kayser-pink-desserts-sunset-town)をお楽しみください。\n\n### ステップ4: 日没後の花火ショー\n日没後には華やかな花火とショーが続きます：\n- [シンフォニー・オブ・ザ・シー シーズン3（11月10日開幕）](/ja/news/symphony-of-the-sea-season-3-opening)\n- [「キス・オブ・ザ・シー」花火ショー（21:00）](/ja/news/kiss-of-the-sea-fireworks-viewing-tips)\n\n出処: サンワールド・パラダイスランド・フーコック公式Facebook",
    "body_hi": "## [1] सनसेट टाउन वॉक रूट सारांश\n\nसन वर्ल्ड के आधिकारिक पेज द्वारा प्रस्तुत प्रमुख स्थलों के आधार पर पर्यटकों और जोड़ों के लिए एक आदर्श पैदल यात्रा मार्ग तैयार किया गया है।\n\n## [2] 4 चरणों का सुझाया गया मार्ग\n\n### चरण 1: सन गॉड फव्वारा (Thần Mặt Trời) और यूरोपीय सड़कें\nभूमध्यसागरीय शैली की सुंदर इमारतों और सन गॉड फव्वारे से अपनी सैर की शुरुआत करें।\n\n### चरण 2: किस ब्रिज (Cầu Hôn)\nसमुद्र में फैला [किस ब्रिज](/hi/business/kiss-bridge), जिसके दोनों हिस्सों के बीच की दूरी आधिकारिक रूप से 30 सेमी बताई गई है। सूर्यास्त का नजारा देखने के लिए यह सबसे बेहतरीन जगह है।\n\n### चरण 3: पर्ल स्क्वायर (Quảng trường Ngọc Trai)\nसैर के दौरान थोड़ा सुस्ताने और मीठा खाने का उपयुक्त स्थल। पर्ल स्क्वायर में [मैसन एरिक काइज़र के 5 गुलाबी डेसर्ट](/hi/news/maison-eric-kayser-pink-desserts-sunset-town) का आनंद लें।\n\n### चरण 4: सूर्यास्त के बाद का आतिशबाजी शो\nसूरज ढलने के बाद सनसेट टाउन में रात के शो शुरू होते हैं:\n- [सिम्फनी ऑफ द सी सीजन 3 (10 नवंबर से)](/hi/news/symphony-of-the-sea-season-3-opening)\n- [किस ऑफ द सी आतिशबाजी शो (21:00 बजे)](/hi/news/kiss-of-the-sea-fireworks-viewing-tips)\n\nस्रोत: सन वर्ल्ड पैराडाइज लैंड फू क्वोक आधिकारिक फेसबुक",
    "faqs": [
      {
        "question": "How wide is the gap between the two spans of Kiss Bridge?",
        "answer": "The official Sun World description states that the gap between the two spans is 30 cm."
      },
      {
        "question": "What evening shows can be seen along this walking route?",
        "answer": "Symphony of the Sea (starting November 10) and the nightly 21:00 Kiss of the Sea fireworks show."
      }
    ],
    "faqs_ko": [
      {
        "question": "키스 브릿지의 양 교각 사이 간격은 얼마인가요?",
        "answer": "선월드 공식 소개에 따르면 양쪽 교각 사이의 틈은 30cm입니다."
      },
      {
        "question": "산책 코스에서 볼 수 있는 저녁 쇼는 무엇인가요?",
        "answer": "11월 10일 개막하는 심포니 오브 더 씨 시즌 3와 매일 21:00에 펼쳐지는 키스 오브 더 씨 불꽃쇼가 있습니다."
      }
    ],
    "faqs_zh": [
      {
        "question": "亲吻桥两侧桥跨之间的间隙有多大？",
        "answer": "根据太阳世界官方介绍，两侧桥体之间的缝隙为30厘米。"
      },
      {
        "question": "漫步路线途中可以观赏哪些晚间大秀？",
        "answer": "包括将于11月10日开幕的《海洋交响乐》第3季以及每晚21:00上演的《海洋之吻》烟花大秀。"
      }
    ],
    "faqs_ru": [
      {
        "question": "Каково расстояние между пролетами моста Kiss Bridge?",
        "answer": "По официальным данным Sun World, зазор между двумя пролетами моста составляет 30 см."
      },
      {
        "question": "Какие вечерние шоу можно увидеть на этом маршруте?",
        "answer": "3-й сезон «Симфонии моря» (с 10 ноября) и ежедневное шоу «Поцелуй моря» с салютом в 21:00."
      }
    ],
    "faqs_ja": [
      {
        "question": "キス・ブリッジの両側の隙間はどのくらいですか？",
        "answer": "サンワールドの公式発表によると、橋の間の隙間は30cmとされています。"
      },
      {
        "question": "この散策コースで見られる夜のショーは何ですか？",
        "answer": "11月10日開幕のシンフォニー・オブ・ザ・シー シーズン3と、毎晩21:00からのキス・オブ・ザ・シー花火ショーです。"
      }
    ],
    "faqs_hi": [
      {
        "question": "किस ब्रिज के दोनों हिस्सों के बीच की दूरी कितनी है?",
        "answer": "सन वर्ल्ड की आधिकारिक जानकारी के अनुसार दोनों पुलों के बीच 30 सेमी का अंतर है।"
      },
      {
        "question": "इस वॉक रूट पर कौन से शो देखे जा सकते हैं?",
        "answer": "10 नवंबर से सिम्फनी ऑफ द सी सीजन 3 और रात 21:00 बजे किस ऑफ द सी आतिशबाजी शो।"
      }
    ]
  },
  {
  "id": "news-symphony-of-the-sea-season-3-opening",
  "slug": "symphony-of-the-sea-season-3-opening",
  "content_type": "news",
  "status": "published",
  "is_sample": false,
  "category": "Event & Show",
  "category_ko": "공연 & 이벤트",
  "category_zh": "演出与活动",
  "category_ru": "Шоу и события",
  "category_ja": "公演・イベント",
  "category_hi": "शो और कार्यक्रम",
  "cover_image_url": "/stock/symphony-of-the-sea-season-3-cover.webp",
  "published_at": "2026-10-27T08:00:00+07:00",
  "updated_at": "2026-10-28T19:00:00+07:00",
  "title": "Phu Quoc Symphony of the Sea Season 3 Opening Guide — Official Announcement Overview",
  "title_ko": "푸꾸옥 심포니 오브 더 씨 시즌 3 개막 총정리 — 공식 발표 기준 안내",
  "title_zh": "富国岛《海洋交响乐》第3季开幕前瞻 — 依据官方发布信息",
  "title_ru": "Шоу «Симфония моря» на Фукуоке: открытие 3-го сезона — официальный анонс",
  "title_ja": "フーコック島「シンフォニー・オブ・ザ・シー」シーズン3開幕ガイド — 公式発表情報まとめ",
  "title_hi": "फू क्वोक 'सिम्फनी ऑफ द सी' सीजन 3 ओपनिंग गाइड — आधिकारिक घोषणा सारांश",
  "seo_title": "Phu Quoc Symphony of the Sea Season 3 Opening Guide — Official Announcement Overview",
  "seo_title_ko": "푸꾸옥 심포니 오브 더 씨 시즌 3 개막 총정리 — 공식 발표 기준 안내",
  "seo_title_zh": "富国岛《海洋交响乐》第3季开幕前瞻 — 依据官方发布信息",
  "seo_title_ru": "Шоу «Симфония моря» на Фукуоке: открытие 3-го сезона — официальный анонс",
  "seo_title_ja": "フーコック島「シンフォニー・オブ・ザ・シー」シーズン3開幕ガイド — 公式発表情報まとめ",
  "seo_title_hi": "फू क्वोक 'सिम्फनी ऑफ द सी' सीजन 3 ओपनिंग गाइड — आधिकारिक घोषणा सारांश",
  "seo_description": "Official details for Symphony of the Sea Season 3 opening November 10, 2026 in Sunset Town, Phu Quoc: ~30 international artists, 14 jetskis, 8 flyboards, 3x fireworks, and an ocean piano.",
  "seo_description_ko": "2026년 11월 10일 개막하는 푸꾸옥 선셋타운 '심포니 오브 더 씨' 시즌 3 공식 발표 소식. 30여 명의 아티스트, 제트스키 14대, 플라이보드 8대, 3배 확대된 해상 불꽃놀이 안내.",
  "seo_description_zh": "越南富国岛日落小镇《海洋交响乐》第3季将于2026年11月10日开幕。约30位国际艺术家、14台摩托艇、8台水上飞人、规模扩大3倍的海上烟花及海上钢琴亮相。",
  "seo_description_ru": "3-й сезон морского шоу «Симфония моря» в Сансет Тауне открывается 10 ноября 2026 года: около 30 артистов, 14 гидроциклов, 8 флайбордов, фейерверки втрое масштабнее и рояль на воде.",
  "seo_description_ja": "2026年11月10日に開幕するサンセットタウン「シンフォニー・オブ・ザ・シー」シーズン3公式発表。約30名のアーティスト、水上バイク14台、フライボード8台、3倍規模の花火、海上のピアノ演出をご紹介。",
  "seo_description_hi": "10 नवंबर 2026 को सनसेट टाउन में शुरू होने वाले 'सिम्फनी ऑफ द सी' सीजन 3 की आधिकारिक घोषणा: लगभग 30 कलाकार, 14 जेट स्की, 8 फ्लाईबोर्ड, 3 गुना बड़ी आतिशबाजी और तैरता हुआ पियानो।",
  "excerpt": "Official details for Symphony of the Sea Season 3 opening November 10, 2026 in Sunset Town, Phu Quoc: ~30 international artists, 14 jetskis, 8 flyboards, 3x fireworks, and an ocean piano.",
  "excerpt_ko": "2026년 11월 10일 개막하는 푸꾸옥 선셋타운 '심포니 오브 더 씨' 시즌 3 공식 발표 소식. 30여 명의 아티스트, 제트스키 14대, 플라이보드 8대, 3배 확대된 해상 불꽃놀이 안내.",
  "excerpt_zh": "越南富国岛日落小镇《海洋交响乐》第3季将于2026年11月10日开幕。约30位国际艺术家、14台摩托艇、8台水上飞人、规模扩大3倍的海上烟花及海上钢琴亮相。",
  "excerpt_ru": "3-й сезон морского шоу «Симфония моря» в Сансет Тауне открывается 10 ноября 2026 года: около 30 артистов, 14 гидроциклов, 8 флайбордов, фейерверки втрое масштабнее и рояль на воде.",
  "excerpt_ja": "2026年11月10日に開幕するサンセットタウン「シンフォニー・オブ・ザ・シー」シーズン3公式発表。約30名のアーティスト、水上バイク14台、フライボード8台、3倍規模の花火、海上のピアノ演出をご紹介。",
  "excerpt_hi": "10 नवंबर 2026 को सनसेट टाउन में शुरू होने वाले 'सिम्फनी ऑफ द सी' सीजन 3 की आधिकारिक घोषणा: लगभग 30 कलाकार, 14 जेट स्की, 8 फ्लाईबोर्ड, 3 गुना बड़ी आतिशबाजी और तैरता हुआ पियानो।",
  "hero_caption": "AI-generated illustration: Jetski and flyboard performance at Symphony of the Sea off Kiss Bridge in Sunset Town, Phu Quoc",
  "hero_caption_ko": "AI-generated illustration: 푸꾸옥 선셋타운 키스브릿지 인근 해상에서 펼쳐지는 심포니 오브 더 씨 제트스키·플라이보드 공연 일러스트",
  "hero_caption_zh": "AI-generated illustration: 富国岛日落小镇亲吻桥海域上演的《海洋交响乐》水上摩托与水上飞人表演插画",
  "hero_caption_ru": "AI-generated illustration: Иллюстрация морского шоу «Симфония моря» с гидроциклами и флайбордами у моста Kiss Bridge в Сансет Тауне на Фукуоке",
  "hero_caption_ja": "AI-generated illustration: フーコック島サンセットタウンのキスブリッジ沖で繰り広げられる「シンフォニー・オブ・ザ・シー」水上バイク＆フライボード公演のイラスト",
  "hero_caption_hi": "AI-generated illustration: फू क्वोक सनसेट टाउन के किस ब्रिज के पास समुद्र में 'सिम्फनी ऑफ द सी' जेट स्की और फ्लाईबोर्ड शो का चित्रण",
  "body_en": "## [1] Executive Summary\n\nThe maritime action spectacular **'Symphony of the Sea' (Bản giao hưởng của biển)** in Sunset Town, Phu Quoc, Vietnam, will raise the curtain on Season 3 on November 10, 2026. According to official posts on the Sun Paradise Land Phu Quoc Facebook page (dated 2026-10-25/26), this season features approximately 30 international artists, 14 jetskis (per official post), and 8 flyboards. The maritime fireworks display will expand to three times its previous scale, accompanied by an all-new floating ocean piano.\n\n## [2] Season 3 Overview Table\n\n| Item | Details | Source |\n|---|---|---|\n| Opening Date | November 10, 2026 | Sun Paradise Land Phu Quoc Official Facebook (2026-10-26 post) |\n| Venue | Waters off Sunset Town | My Phu Quoc Facility Page Listing |\n| Duration | Approx. 20 minutes | Official Facebook Posts |\n| Cast | Approx. 30 international artists | Official Facebook (2026-10-25/26 posts) |\n| Equipment | 14 jetskis (per official post), 8 flyboards | Official Facebook (2026-10-25/26 posts) |\n| Maritime Fireworks | Expanded to 3 times previous scale | Official Facebook (2026-10-25/26 posts) |\n| New Production | Floating ocean piano, ~400m coastal laser effects | Official Facebook (2026-10-25/26 posts) |\n| Fireworks Team | Champion team from China, runner-up from Portugal (Danang Int'l Fireworks Festival) | Official Facebook (2026-10-25 post) |\n\nOfficial Facebook: https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**Featured Athletes from Official Posts**\n- **Lee Sak Yoon**: Hydroflight Champion\n- **Aleksandr Malykh**: Flyboard\n- **Kristina Isaeva**: Hydrofest Runner-up\n\n**Athletes Featured in Vietnamese Media** (Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12)\n- **Ekaterina Poliakina**: Flyboard (Russia)\n- **Andrei Smirnov**: Flyboard (Russia)\n- **German Khomiakov**: Jetski (Russia)\n- **Warit Ruangrob**: Jetski (Thailand)\n\n## [3] Visitor Tips\n\n① **Check Official Channels**: Stay up to date with the latest Season 3 announcements directly on the official Sun Paradise Land Phu Quoc Facebook page.\n\n② **Explore Sunset Town Coastline (Suggested)**: Sunset Town features [Kiss Bridge (Cầu Hôn)](https://myphuquoc.net/business/kiss-bridge) stretching into the sea (per My Phu Quoc facility page). Consider including it in your travel itinerary.\n\n## [4] Suggested Itinerary (Proposal)\n\n*(※ This itinerary is a recommendation by the My Phu Quoc editorial team; adjustments may be made based on on-site conditions.)*\n\n1. **Daytime**: Enjoy daytime attractions such as the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc).\n2. **Evening**: Stroll Mediterranean-style streets and around [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) while watching the sunset.\n3. **Nighttime**: Savor local street food at [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town), followed by the maritime action show on the water.\n4. **Transit**: Use the [Sunset Town electric buggy service](https://myphuquoc.net/business/sun-group-sunset-town-electric-buggy-service) for town transit (see facility page for stops).\n\n## [5] Frequently Asked Questions (FAQ)\n\n**Q. When does Season 3 premiere?**\nThe show opens on November 10, 2026 (Sun Paradise Land Phu Quoc official Facebook, 2026-10-26 post).\n\n**Q. How does it differ from Kiss of the Sea at 21:00?**\n- **Symphony of the Sea**: An ocean action performance staged on the sea by jetski and flyboard athletes.\n- **Kiss of the Sea**: Runs from 21:00 to 21:30 with an ocean fireworks finale around 21:25 (per My Phu Quoc [sunset-place-10](https://myphuquoc.net/business/sunset-place-10) listing).",
  "body_ko": "## [1] 핵심 요약\n\n베트남 푸꾸옥 선셋타운(Sunset Town)의 해상 액션 쇼 '심포니 오브 더 씨(Symphony of the Sea / Bản giao hưởng của biển)'가 2026년 11월 10일 시즌 3의 막을 올립니다. 선월드 파라다이스랜드 푸꾸옥 공식 페이스북(2026-10-25/26 게시글) 기준으로, 이번 시즌에는 국제 아티스트 약 30명이 참여하고, 제트스키 14대(공식 게시글 기준)와 플라이보드 8대가 출동합니다. 해상 불꽃놀이 규모는 이전 대비 3배로 확대되고, 바다 위 피아노도 새롭게 등장합니다.\n\n## [2] 시즌 3 정보 표\n\n| 항목 | 내용 | 출처 |\n|---|---|---|\n| 개막일 | 2026년 11월 10일 | 선월드 파라다이스랜드 푸꾸옥 공식 페이스북 (2026-10-26 게시글) |\n| 공연 장소 | 선셋타운(Sunset Town) 해상 | 마이푸꾸옥 시설 페이지 기재 기준 |\n| 공연 시간 | 약 20분 | 공식 페이스북 게시글 |\n| 출연 | 국제 아티스트 약 30명 | 공식 페이스북 (2026-10-25/26 게시글) |\n| 장비 | 제트스키 14대(공식 게시글 기준), 플라이보드 8대 | 공식 페이스북 (2026-10-25/26 게시글) |\n| 해상 불꽃놀이 | 이전 대비 3배 규모로 확대 | 공식 페이스북 (2026-10-25/26 게시글) |\n| 신규 연출 | 바다 위 피아노 등장, 해안 약 400m 구간 레이저 (게시글 기재) | 공식 페이스북 (2026-10-25/26 게시글) |\n| 불꽃 연출팀 | 중국 우승팀, 다낭 국제불꽃축제 포르투갈 준우승팀 | 공식 페이스북 (2026-10-25 게시글) |\n\n공식 페이스북: https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**공식 게시글에서 소개된 출연진**\n- 리 삭 윤 (Lee Sak Yoon): 하이드로플라이트 챔피언\n- 알렉산드르 말리흐 (Aleksandr Malykh): 플라이보드\n- 크리스티나 이사예바 (Kristina Isaeva): 하이드로페스트(Hydrofest) 준우승\n\n**베트남 언론에서 소개된 선수** (Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12 보도)\n- 예카테리나 폴리아키나 (Ekaterina Poliakina): 플라이보드 (러시아)\n- 안드레이 스미르노프 (Andrei Smirnov): 플라이보드 (러시아)\n- 게르만 호먀코프 (German Khomiakov): 제트스키 (러시아)\n- 와릿 루앙롭 (Warit Ruangrob): 제트스키 (태국)\n\n## [3] 이용 팁\n\n① **소식은 공식 채널에서**: 시즌 3의 새로운 소식은 선월드 파라다이스랜드 푸꾸옥 공식 페이스북 게시글에서 확인할 수 있습니다.\n\n② **선셋타운 해안 둘러보기 (제안)**: 선셋타운에는 바다 쪽으로 뻗은 [키스 브릿지(Kiss Bridge / Cầu Hôn)](https://myphuquoc.net/ko/business/kiss-bridge)가 있습니다 (마이푸꾸옥 시설 페이지 기재 기준). 일정에 함께 넣어 보세요.\n\n## [4] 제안 동선 (제안)\n\n*(※ 본 동선은 마이푸꾸옥 편집팀이 제안하는 추천 코스이며, 현장 사정에 따라 달라질 수 있습니다.)*\n\n1. **낮**: [선월드 혼똔섬 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) 등 낮 일정 즐기기\n2. **저녁**: 선셋타운의 지중해풍 거리와 [키스 브릿지](https://myphuquoc.net/ko/business/kiss-bridge) 일대를 산책하며 일몰 풍경 즐기기\n3. **밤**: [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)에서 길거리 음식을 즐긴 뒤 바다 위 공연 관람\n4. **이동**: 타운 내 이동은 [선셋타운 전동 버기카](https://myphuquoc.net/ko/business/sun-group-sunset-town-electric-buggy-service) 이용 (정류장은 마이푸꾸옥 시설 페이지 참고)\n\n## [5] 자주 묻는 질문 (FAQ)\n\n**Q. 시즌 3는 언제 시작하나요?**\n2026년 11월 10일 개막입니다 (선월드 파라다이스랜드 푸꾸옥 공식 페이스북, 2026-10-26 게시글).\n\n**Q. 밤 21시 키스 오브 더 씨와는 어떻게 다른가요?**\n- 심포니 오브 더 씨: 바다 위에서 제트스키와 플라이보드 아티스트들이 펼치는 해상 액션 쇼입니다.\n- 키스 오브 더 씨: 21:00~21:30에 공연이 진행되며 21:25경 해상 불꽃놀이 피날레가 펼쳐집니다 (사이트 기재 기준, 마이푸꾸옥 [sunset-place-10](https://myphuquoc.net/ko/business/sunset-place-10) 페이지).",
  "body_zh": "## [1] 核心摘要\n\n越南富国岛日落小镇（Sunset Town）标志性海上动作盛典**《海洋交响乐》（Symphony of the Sea / Bản giao hưởng của biển）**将于2026年11月10日正式迎来第3季。根据太阳世界乐园富国岛官方Facebook（2026-10-25/26发布帖文），本季将汇聚约30名国际专业艺术家，14台水上摩托艇（依官方帖文）及8台水上飞人设备。海上烟花规模较以往扩大3倍，并将首次呈现浪漫的海上钢琴演奏。\n\n## [2] 第3季演出信息表\n\n| 项目 | 内容详情 | 来源出处 |\n|---|---|---|\n| 开幕日期 | 2026年11月10日 | 太阳世界乐园官方Facebook（2026-10-26帖文） |\n| 演出场地 | 日落小镇（Sunset Town）海域 | My Phu Quoc 设施页面记载 |\n| 演出时长 | 约20分钟 | 官方Facebook帖文 |\n| 参演阵容 | 约30位国际艺术家 | 官方Facebook（2026-10-25/26帖文） |\n| 演出设备 | 摩托艇14台（官方帖文基准）、水上飞人8台 | 官方Facebook（2026-10-25/26帖文） |\n| 海上烟花 | 较以往扩大3倍规模 | 官方Facebook（2026-10-25/26帖文） |\n| 新增亮点 | 海上浮动钢琴、约400米海岸激光秀 | 官方Facebook（2026-10-25/26帖文） |\n| 烟花编排团队 | 中国冠军团队、岘港国际烟花节葡萄牙亚军团队 | 官方Facebook（2026-10-25帖文） |\n\n官方Facebook：https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**官方帖文重点介绍选手**\n- **Lee Sak Yoon**：Hydroflight 水上飞行冠军\n- **Aleksandr Malykh**：水上飞人选手\n- **Kristina Isaeva**：Hydrofest 水上运动节亚军\n\n**越南主流媒体报道选手**（Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12）\n- **Ekaterina Poliakina**：水上飞人（俄罗斯）\n- **Andrei Smirnov**：水上飞人（俄罗斯）\n- **German Khomiakov**：水上摩托（俄罗斯）\n- **Warit Ruangrob**：水上摩托（泰国）\n\n## [3] 游览贴士\n\n① **关注官方发布渠道**：第3季最新动态可在太阳世界乐园富国岛官方Facebook主页查阅。\n\n② **打卡日落小镇海岸（建议）**：日落小镇海域建有延伸入海的[亲吻桥（Kiss Bridge / Cầu Hôn）](https://myphuquoc.net/zh/business/kiss-bridge)（依 My Phu Quoc 设施页面）。建议列入同一行程安排。\n\n## [4] 建议游览路线（建议行程）\n\n*(※ 本行程为 My Phu Quoc 编辑团队推荐建议路线，请根据现场实际运营安排灵活调整。)*\n\n1. **白天**：乘坐[香岛跨海缆车](https://myphuquoc.net/zh/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)畅玩白天景点。\n2. **傍晚**：漫步日落小镇地中海风情街区与[亲吻桥](https://myphuquoc.net/zh/business/kiss-bridge)周边，欣赏绝美日落。\n3. **夜晚**：在[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)品尝街头美食后，观赏海上海洋交响乐大秀。\n4. **镇内交通**：可搭乘[日落小镇电动观光车](https://myphuquoc.net/zh/business/sun-group-sunset-town-electric-buggy-service)便捷穿梭（停靠站点参见设施页面）。\n\n## [5] 常见问题解答 (FAQ)\n\n**Q. 《海洋交响乐》第3季何时开幕？**\n大秀将于2026年11月10日正式开幕（引自太阳世界乐园富国岛官方Facebook 2026-10-26帖文）。\n\n**Q. 与晚间21:00的《海洋之吻》有何区别？**\n- **海洋交响乐**：由专业水上摩托与水上飞人艺术家在海面上演的海上极限运动动作秀。\n- **海洋之吻**：于21:00~21:30在专属剧场上演，并在约21:25迎来海上烟花压轴（引自 My Phu Quoc [sunset-place-10](https://myphuquoc.net/zh/business/sunset-place-10) 页面记载）。",
  "body_ru": "## [1] Главное\n\nМорское экшн-шоу **«Симфония моря» (Symphony of the Sea / Bản giao hưởng của biển)** в Сансет Тауне (Sunset Town) на острове Фукуок открывает 3-й сезон 10 ноября 2026 года. Согласно официальным публикациям страницы Sun Paradise Land Phu Quoc в Facebook (от 25 и 26 октября 2026 г.), в новом сезоне задействовано около 30 международных артистов, 14 гидроциклов (аквабайков) и 8 флайбордов. Масштаб морского фейерверка увеличен в 3 раза по сравнению с прошлым сезоном, а на воде появится плавучий рояль.\n\n## [2] Информация о 3-м сезоне\n\n| Параметр | Описание | Источник |\n|---|---|---|\n| Дата открытия | 10 ноября 2026 года | Официальный Facebook Sun Paradise Land Phu Quoc (пост от 26.10.2026) |\n| Место | Акватория Сансет Тауна (Sunset Town) | Страница объекта на портале My Phu Quoc |\n| Продолжительность | Около 20 минут | Официальные публикации в Facebook |\n| Участники | Около 30 международных артистов | Официальный Facebook (посты от 25-26.10.2026) |\n| Техника | 14 гидроциклов (по официальному посту), 8 флайбордов | Официальный Facebook (посты от 25-26.10.2026) |\n| Морской фейерверк | Увеличен в 3 раза по масштабу | Официальный Facebook (посты от 25-26.10.2026) |\n| Новые элементы | Плавучий рояль на воде, лазерное шоу вдоль 400 м берега | Официальный Facebook (посты от 25-26.10.2026) |\n| Пиротехники | Команда-победитель из Китая, вице-чемпионы из Португалии | Официальный Facebook (пост от 25.10.2026) |\n\nОфициальная страница в Facebook: https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**Артисты из официальных публикаций**\n- **Ли Сак Юн (Lee Sak Yoon)**: чемпион по гидрофлайту\n- **Александр Малых (Aleksandr Malykh)**: флайборд\n- **Кристина Исаева (Kristina Isaeva)**: вице-чемпионка Hydrofest\n\n**Спортсмены, упомянутые во вьетнамских СМИ** (Thanh Niên 19.10.2026 / Báo Tin Tức 12.10.2026)\n- **Екатерина Полякина (Ekaterina Poliakina)**: флайборд (Россия)\n- **Андрей Смирнов (Andrei Smirnov)**: флайборд (Россия)\n- **Герман Хомяков (German Khomiakov)**: гидроцикл (Россия)\n- **Варит Руангро́б (Warit Ruangrob)**: гидроцикл (Таиланд)\n\n## [3] Советы зрителям\n\n① **Следите за официальными каналами**: самые свежие анонсы публикуются на официальной странице Sun Paradise Land Phu Quoc в Facebook.\n\n② **Осмотрите побережье Сансет Тауна (рекомендация)**: прямо над морем расположен пешеходный мост [Kiss Bridge (Cầu Hôn)](https://myphuquoc.net/ru/business/kiss-bridge) (согласно данным My Phu Quoc). Рекомендуем включить его в программу дня.\n\n## [4] Рекомендованный маршрут (предложение редакции)\n\n*(※ Данный маршрут составлен редакцией My Phu Quoc в качестве рекомендации; ориентируйтесь на фактическое расписание.)*\n\n1. **День**: Поездка на [канатной дороге Hon Thom](https://myphuquoc.net/ru/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) и дневные развлечения.\n2. **Вечер**: Прогулка по улочкам Сансет Тауна и мосту [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge), созерцание заката.\n3. **Ночь**: Стритфуд на ночном рынке [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) и просмотр морского шоу.\n4. **Транспорт**: Для перемещений по городу используйте [электрические шаттлы (багги)](https://myphuquoc.net/ru/business/sun-group-sunset-town-electric-buggy-service).\n\n## [5] Часто задаваемые вопросы (FAQ)\n\n**В. Когда стартует 3-й сезон шоу?**\nПремьера состоится 10 ноября 2026 года (официальный Facebook Sun Paradise Land Phu Quoc, пост от 26.10.2026).\n\n**В. Чем шоу отличается от вечернего спектакля «Поцелуй моря» в 21:00?**\n- **«Симфония моря»**: Экшн-шоу на воде с участием спортсменов на гидроциклах и флайбордах.\n- **«Поцелуй моря» (Kiss of the Sea)**: Мультимедийное представление в амфитеатре с 21:00 до 21:30, с финальным морским фейерверком около 21:25 (по данным страницы My Phu Quoc [sunset-place-10](https://myphuquoc.net/ru/business/sunset-place-10)).",
  "body_ja": "## [1] 概要\n\nベトナム・フーコック島サンセットタウン（Sunset Town）の海上アクションショー**「シンフォニー・オブ・ザ・シー（Symphony of the Sea / Bản giao hưởng của biển）」**が、2026年11月10日にシーズン3の開幕を迎えます。サンワールド・パラダイスランド・フーコック公式Facebook（2026年10月25日・26日投稿）によると、今季は約30名の国際的アーティストが出演し、水上バイク（ジェットスキー）14台（公式投稿基準）とフライボード8台が登場します。海上花火の規模は前年比3倍に拡大され、海上に浮かぶピアノ演出も新たに導入されます。\n\n## [2] シーズン3 公演データ表\n\n| 項目 | 内容 | 出典 |\n|---|---|---|\n| 開幕日 | 2026年11月10日 | サンワールド・パラダイスランド公式Facebook（2026-10-26投稿） |\n| 公演場所 | サンセットタウン（Sunset Town）沖 | My Phu Quoc 施設案内基準 |\n| 公演時間 | 約20分 | 公式Facebook投稿 |\n| 出演 | 国際アーティスト約30名 | 公式Facebook（2026-10-25/26投稿） |\n| 機材 | ジェットスキー14台（公式投稿基準）、フライボード8台 | 公式Facebook（2026-10-25/26投稿） |\n| 海上花火 | 前年比3倍の規模に拡大 | 公式Facebook（2026-10-25/26投稿） |\n| 新演出 | 海上ピアノの登場、海岸約400mのレーザー演出 | 公式Facebook（2026-10-25/26投稿） |\n| 花火演出陣 | 中国優勝チーム、ダナン国際花火大会ポルトガル準優勝チーム | 公式Facebook（2026-10-25投稿） |\n\n公式Facebook：https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**公式投稿で紹介された出演陣**\n- **イ・サクユン (Lee Sak Yoon)**: ハイドロフライト・チャンピオン\n- **アレクサンドル・マリーフ (Aleksandr Malykh)**: フライボード\n- **クリスティーナ・イサエヴァ (Kristina Isaeva)**: ハイドロフェスト準優勝\n\n**現地メディアで報じられた選手**（Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12）\n- **エカテリーナ・ポリアキナ (Ekaterina Poliakina)**: フライボード（ロシア）\n- **アンドレイ・スミルノフ (Andrei Smirnov)**: フライボード（ロシア）\n- **ゲルマン・ホミャコフ (German Khomiakov)**: ジェットスキー（ロシア）\n- **ワリット・ルアンロブ (Warit Ruangrob)**: ジェットスキー（タイ）\n\n## [3] 観賞のヒント\n\n① **最新情報は公式チャンネルで**: シーズン3の最新動向はサンワールド・パラダイスランド・フーコック公式Facebookにてご確認いただけます。\n\n② **海岸沿いの散策（提案）**: サンセットタウンには海へ伸びる[キスブリッジ（Kiss Bridge / Cầu Hôn）](https://myphuquoc.net/ja/business/kiss-bridge)があります（My Phu Quoc 施設案内基準）。同じ旅程で訪れることをおすすめします。\n\n## [4] おすすめモデルコース（提案）\n\n*(※ 本動線は My Phu Quoc 編集部が提案するおすすめコースであり、現地の運行状況により変更となる場合があります。)*\n\n1. **日中**: [ホントム・ロープウェイ](https://myphuquoc.net/ja/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)など日中のアクティビティを満喫。\n2. **夕方**: サンセットタウンの街並みや[キスブリッジ](https://myphuquoc.net/ja/business/kiss-bridge)周辺を散策し、夕日を鑑賞。\n3. **夜**: [ブイフェスト・ナイトマーケット](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)で屋台料理を楽しんだ後、海上のアクションショーを観賞。\n4. **移動**: タウン内の移動には[電動バギー](https://myphuquoc.net/ja/business/sun-group-sunset-town-electric-buggy-service)をご利用ください。\n\n## [5] よくある質問 (FAQ)\n\n**Q. シーズン3の開幕はいつですか？**\n2026年11月10日に開幕します（サンワールド・パラダイスランド公式Facebook、2026年10月26日投稿）。\n\n**Q. 夜21時の「キス・オブ・ザ・シー」とはどう違いますか？**\n- **シンフォニー・オブ・ザ・シー**: 海上でジェットスキーやフライボードの選手たちが繰り広げるダイナミックなアクションショーです。\n- **キス・オブ・ザ・シー**: 21:00〜21:30に上演され、21:25頃に海上花火のフィナーレが上がります（My Phu Quoc [sunset-place-10](https://myphuquoc.net/ja/business/sunset-place-10) 掲載基準）。",
  "body_hi": "## [1] मुख्य सारांश\n\nवियतनाम के फू क्वोक स्थित सनसेट टाउन (Sunset Town) का समुद्री एक्शन शो **'सिम्फनी ऑफ द सी' (Symphony of the Sea / Bản giao hưởng của biển)** 10 नवंबर 2026 को अपना तीसरा सीजन शुरू कर रहा है। सन वर्ल्ड पैराडाइज लैंड फू क्वोक के आधिकारिक फेसबुक पेज (25/26 अक्टूबर 2026 के पोस्ट) के अनुसार, इस सीजन में लगभग 30 अंतरराष्ट्रीय कलाकार भाग लेंगे, जिसमें 14 जेट स्की (आधिकारिक पोस्ट अनुसार) और 8 फ्लाईबोर्ड शामिल हैं। समुद्री आतिशबाजी का पैमाना पहले की तुलना में 3 गुना बड़ा होगा, और समुद्र में एक तैरता हुआ पियानो भी पेश किया जाएगा।\n\n## [2] सीजन 3 विवरण तालिका\n\n| मद | विवरण | स्रोत |\n|---|---|---|\n| उद्घाटन तिथि | 10 नवंबर 2026 | सन वर्ल्ड पैराडाइज लैंड आधिकारिक फेसबुक (26.10.2026 पोस्ट) |\n| आयोजन स्थल | सनसेट टाउन समुद्री क्षेत्र | माई फू क्वोक सुविधा पृष्ठ विवरण |\n| शो की अवधि | लगभग 20 मिनट | आधिकारिक फेसबुक पोस्ट |\n| कलाकार | लगभग 30 अंतरराष्ट्रीय कलाकार | आधिकारिक फेसबुक (25-26.10.2026 पोस्ट) |\n| उपकरण | 14 जेट स्की (आधिकारिक पोस्ट अनुसार), 8 फ्लाईबोर्ड | आधिकारिक फेसबुक (25-26.10.2026 पोस्ट) |\n| समुद्री आतिशबाजी | पहले से 3 गुना बड़ा पैमाना | आधिकारिक फेसबुक (25-26.10.2026 पोस्ट) |\n| नई प्रस्तुति | समुद्र पर तैरता पियानो, 400 मीटर तटीय लेजर शो | आधिकारिक फेसबुक (25-26.10.2026 पोस्ट) |\n| आतिशबाजी टीम | चीन की विजेता टीम, डा नांग महोत्सव की पुर्तगाल उपविजेता टीम | आधिकारिक फेसबुक (25.10.2026 पोस्ट) |\n\nआधिकारिक फेसबुक: https://www.facebook.com/SunParadiseLandPhuQuoc\n\n**आधिकारिक पोस्ट में उल्लिखित प्रमुख कलाकार**\n- **ली साक यून (Lee Sak Yoon)**: हाइड्रोफ्लाइट चैंपियन\n- **अलेक्सांद्र मालीख (Aleksandr Malykh)**: फ्लाईबोर्ड\n- **क्रिस्टीना इसायेवा (Kristina Isaeva)**: हाइड्रोफेस्ट उपविजेता\n\n**वियतनामी मीडिया रिपोर्टों में शामिल एथलीट** (Thanh Niên 19.10.2026 / Báo Tin Tức 12.10.2026)\n- **एकतेरिना पोलियाकिना (Ekaterina Poliakina)**: फ्लाईबोर्ड (रूस)\n- **आंद्रेई स्मिरनोव (Andrei Smirnov)**: फ्लाईबोर्ड (रूस)\n- **जर्मन खोम्याकोव (German Khomiakov)**: जेट स्की (रूस)\n- **वारित रुआंगरोब (Warit Ruangrob)**: जेट स्की (थाईलैंड)\n\n## [3] दर्शक सुझाव\n\n① **आधिकारिक चैनल से जुड़ें**: सीजन 3 की नवीनतम सूचनाएं सन वर्ल्ड पैराडाइज लैंड फू क्वोक के आधिकारिक फेसबुक पेज पर देखी जा सकती हैं।\n\n② **सनसेट टाउन तट की सैर (सुझाव)**: सनसेट टाउन में समुद्र की ओर फैला [किस ब्रिज (Kiss Bridge / Cầu Hôn)](https://myphuquoc.net/hi/business/kiss-bridge) स्थित है (माई फू क्वोक विवरण अनुसार)। अपनी यात्रा में इसे भी शामिल करें।\n\n## [4] सुझाया गया यात्रा कार्यक्रम (प्रस्तावित)\n\n*(※ यह मार्ग माई फू क्वोक संपादकीय टीम द्वारा सुझाया गया कार्यक्रम है; स्थानीय परिस्थितियों के अनुसार इसमें परिवर्तन हो सकता है।)*\n\n1. **दोपहर**: [होन थोम केबल कार](https://myphuquoc.net/hi/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) और दिन के आकर्षणों का आनंद लें।\n2. **शाम**: सनसेट टाउन की गलियों और [किस ब्रिज](https://myphuquoc.net/hi/business/kiss-bridge) के पास टहलते हुए सूर्यास्त देखें।\n3. **रात**: [VUI-Fest नाइट मार्केट](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) में स्ट्रीट फूड का स्वाद लें और समुद्र पर होने वाले शो का आनंद लें।\n4. **आवागमन**: टाउन में आवागमन के लिए [इलेक्ट्रिक बग्गी](https://myphuquoc.net/hi/business/sun-group-sunset-town-electric-buggy-service) का उपयोग करें।\n\n## [5] अक्सर पूछे जाने वाले प्रश्न (FAQ)\n\n**प्र. सीजन 3 कब शुरू होगा?**\nशो 10 नवंबर 2026 को शुरू होगा (सन वर्ल्ड पैराडाइज लैंड आधिकारिक फेसबुक, 26.10.2026 पोस्ट)।\n\n**प्र. यह रात 21:00 बजे के 'किस ऑफ द सी' से किस प्रकार भिन्न है?**\n- **सिम्फनी ऑफ द सी**: समुद्र के पानी पर जेट स्की और फ्लाईबोर्ड कलाकारों द्वारा प्रस्तुत एक्शन शो है।\n- **किस ऑफ द सी**: रात 21:00 से 21:30 बजे तक आयोजित होता है, जिसमें लगभग 21:25 बजे समुद्री आतिशबाजी का फिनाले होता है (माई फू क्वोक [sunset-place-10](https://myphuquoc.net/hi/business/sunset-place-10) पृष्ठ अनुसार)।",
  "faqs": [
    {
      "question": "When does Season 3 premiere?",
      "answer": "The show opens on November 10, 2026 (Sun Paradise Land Phu Quoc official Facebook, 2026-10-26 post)."
    },
    {
      "question": "How does it differ from Kiss of the Sea at 21:00?",
      "answer": "Symphony of the Sea is an ocean action performance staged on the water by jetski and flyboard athletes. In contrast, Kiss of the Sea runs from 21:00 to 21:30 with an ocean fireworks finale around 21:25 (based on the My Phu Quoc sunset-place-10 listing)."
    }
  ],
  "faqs_ko": [
    {
      "question": "시즌 3는 언제 시작하나요?",
      "answer": "2026년 11월 10일 개막입니다 (선월드 파라다이스랜드 푸꾸옥 공식 페이스북, 2026-10-26 게시글)."
    },
    {
      "question": "밤 21시 키스 오브 더 씨와는 어떻게 다른가요?",
      "answer": "심포니 오브 더 씨는 바다 위에서 제트스키와 플라이보드 아티스트들이 펼치는 해상 액션 쇼입니다. 키스 오브 더 씨는 21:00~21:30에 공연이 진행되며 21:25경 해상 불꽃놀이 피날레가 펼쳐집니다 (사이트 기재 기준, 마이푸꾸옥 sunset-place-10 페이지)."
    }
  ],
  "faqs_zh": [
    {
      "question": "《海洋交响乐》第3季何时开幕？",
      "answer": "大秀将于2026年11月10日正式开幕（引自太阳世界乐园富国岛官方Facebook 2026-10-26帖文）。"
    },
    {
      "question": "与晚间21:00的《海洋之吻》有何区别？",
      "answer": "《海洋交响乐》是由专业水上摩托与水上飞人艺术家在海面上演的海上极限运动动作秀；而《海洋之吻》于21:00~21:30在专属剧场上演，并在约21:25迎来海上烟花压轴（引自 My Phu Quoc sunset-place-10 页面记载）。"
    }
  ],
  "faqs_ru": [
    {
      "question": "Когда стартует 3-й сезон шоу?",
      "answer": "Премьера состоится 10 ноября 2026 года (официальный Facebook Sun Paradise Land Phu Quoc, пост от 26.10.2026)."
    },
    {
      "question": "Чем шоу отличается от вечернего спектакля «Поцелуй моря» в 21:00?",
      "answer": "«Симфония моря» — это экшн-шоу на воде с участием спортсменов на гидроциклах и флайбордах. «Поцелуй моря» (Kiss of the Sea) — представление в амфитеатре с 21:00 до 21:30, с финальным морским фейерверком около 21:25 (по данным страницы My Phu Quoc sunset-place-10)."
    }
  ],
  "faqs_ja": [
    {
      "question": "シーズン3の開幕はいつですか？",
      "answer": "2026年11月10日に開幕します（サンワールド・パラダイスランド公式Facebook、2026年10月26日投稿）。"
    },
    {
      "question": "夜21時の「キス・オブ・ザ・シー」とはどう違いますか？",
      "answer": "シンフォニー・オブ・ザ・シーは海上でジェットスキーやフライボードの選手たちが繰り広げるアクションショーです。一方のキス・オブ・ザ・シーは21:00〜21:30に上演され、21:25頃に海上花火のフィナーレが上がります（My Phu Quoc sunset-place-10 掲載基準）。"
    }
  ],
  "faqs_hi": [
    {
      "question": "सीजन 3 कब शुरू होगा?",
      "answer": "शो 10 नवंबर 2026 को शुरू होगा (सन वर्ल्ड पैराडाइज लैंड आधिकारिक फेसबुक, 26.10.2026 पोस्ट)।"
    },
    {
      "question": "यह रात 21:00 बजे के 'किस ऑफ द सी' से किस प्रकार भिन्न है?",
      "answer": "'सिम्फनी ऑफ द सी' समुद्र के पानी पर जेट स्की और फ्लाईबोर्ड कलाकारों द्वारा प्रस्तुत एक्शन शो है; जबकि 'किस ऑफ द सी' रात 21:00 से 21:30 बजे तक आयोजित होता है, जिसमें लगभग 21:25 बजे समुद्री आतिशबाजी का फिनाले होता है (माई फू क्वोक sunset-place-10 पृष्ठ अनुसार)।"
    }
  ]
},
  {
  "id": "guide-kiss-of-the-sea-fireworks-viewing-tips",
  "slug": "kiss-of-the-sea-fireworks-viewing-tips",
  "content_type": "guide",
  "status": "published",
  "is_sample": false,
  "category": "Travel Guide",
  "category_ko": "공연 관람 팁",
  "category_zh": "观演指南",
  "category_ru": "Советы зрителям",
  "category_ja": "観賞ガイド",
  "category_hi": "दर्शक गाइड",
  "cover_image_url": "/stock/kiss-of-the-sea-night-fireworks-cover.webp",
  "published_at": "2026-10-27T08:00:00+07:00",
  "updated_at": "2026-10-28T19:00:00+07:00",
  "title": "Phu Quoc Kiss of the Sea Fireworks Viewing Tips — Schedule & Venue Guide",
  "title_ko": "푸꾸옥 키스 오브 더 씨(Kiss of the Sea) 불꽃쇼 관람 팁 — 시간·관람 장소 안내",
  "title_zh": "富国岛《海洋之吻》（Kiss of the Sea）烟花秀观演贴士 — 演出时间与观演地点指南",
  "title_ru": "Шоу «Поцелуй моря» и фейерверки на Фукуоке — Время и площадка",
  "title_ja": "フーコック島「キス・オブ・ザ・シー」花火ショー観賞のコツ — 公演時間と観覧場所のご案内",
  "title_hi": "फू क्वोक 'किस ऑफ द सी' आतिशबाजी शो देखने के टिप्स — समय और स्थल मार्गदर्शिका",
  "seo_title": "Phu Quoc Kiss of the Sea Fireworks Viewing Tips — Schedule & Venue Guide",
  "seo_title_ko": "푸꾸옥 키스 오브 더 씨(Kiss of the Sea) 불꽃쇼 관람 팁 — 시간·관람 장소 안내",
  "seo_title_zh": "富国岛《海洋之吻》（Kiss of the Sea）烟花秀观演贴士 — 演出时间与观演地点指南",
  "seo_title_ru": "Шоу «Поцелуй моря» и фейерверки на Фукуоке — Время и площадка",
  "seo_title_ja": "フーコック島「キス・オブ・ザ・シー」花火ショー観賞のコツ — 公演時間と観覧場所のご案内",
  "seo_title_hi": "फू क्वोक 'किस ऑफ द सी' आतिशबाजी शो देखने के टिप्स — समय और स्थल मार्गदर्शिका",
  "seo_description": "Viewing tips for Sunset Town's iconic 'Kiss of the Sea' in South Phu Quoc: nightly 21:00 show, 21:25 ocean fireworks finale, accessibility amenities, and suggested evening itinerary.",
  "seo_description_ko": "베트남 푸꾸옥 선셋타운 대표 야간 쇼 '키스 오브 더 씨'의 21:00 공연 및 21:25 해상 불꽃놀이 피날레 관람 팁, 편의시설, 추천 저녁 동선 안내.",
  "seo_description_zh": "越南富国岛日落小镇标志性大秀《海洋之吻》观演指南：每晚21:00开演，约21:25上演海上烟花压轴，包含无障碍设施与建议晚间游览路线。",
  "seo_description_ru": "Гид по вечернему шоу «Kiss of the Sea» в Сансет Тауне: сеанс 21:00–21:30, морской салют в 21:25, доступная среда и вечерний маршрут.",
  "seo_description_ja": "フーコック島南部サンセットタウンを代表する「キス・オブ・ザ・シー」の観賞ガイド。21:00開演、21:25頃の花火フィナーレ、バリアフリー設備、おすすめの夕方モデルコースを解説。",
  "seo_description_hi": "सनसेट टाउन के प्रसिद्ध 'किस ऑफ द सी' शो के लिए गाइड: रात 21:00 बजे शो, 21:25 पर समुद्री आतिशबाजी, व्हीलचेयर सुविधाएं और शाम का सुझाया गया यात्रा कार्यक्रम।",
  "excerpt": "Viewing tips for Sunset Town's iconic 'Kiss of the Sea' in South Phu Quoc: nightly 21:00 show, 21:25 ocean fireworks finale, accessibility amenities, and suggested evening itinerary.",
  "excerpt_ko": "베트남 푸꾸옥 선셋타운 대표 야간 쇼 '키스 오브 더 씨'의 21:00 공연 및 21:25 해상 불꽃놀이 피날레 관람 팁, 편의시설, 추천 저녁 동선 안내.",
  "excerpt_zh": "越南富国岛日落小镇标志性大秀《海洋之吻》观演指南：每晚21:00开演，约21:25上演海上烟花压轴，包含无障碍设施与建议晚间游览路线。",
  "excerpt_ru": "Гид по вечернему шоу «Kiss of the Sea» в Сансет Тауне: сеанс 21:00–21:30, морской салют в 21:25, доступная среда и вечерний маршрут.",
  "excerpt_ja": "フーコック島南部サンセットタウンを代表する「キス・オブ・ザ・シー」の観賞ガイド。21:00開演、21:25頃の花火フィナーレ、バリアフリー設備、おすすめの夕方モデルコースを解説。",
  "excerpt_hi": "सनसेट टाउन के प्रसिद्ध 'किस ऑफ द सी' शो के लिए गाइड: रात 21:00 बजे शो, 21:25 पर समुद्री आतिशबाजी, व्हीलचेयर सुविधाएं और शाम का सुझाया गया यात्रा कार्यक्रम।",
  "hero_caption": "AI-generated illustration: Phu Quoc Sunset Town Kiss of the Sea evening multi-sensory theater show and fireworks over the ocean",
  "hero_caption_ko": "AI-generated illustration: 푸꾸옥 선셋타운 키스 오브 더 씨 멀티미디어 쇼와 밤바다 불꽃놀이 일러스트",
  "hero_caption_zh": "AI-generated illustration: 富国岛日落小镇《海洋之吻》多媒体秀与海上海景烟花插画",
  "hero_caption_ru": "AI-generated illustration: Вечернее мультимедийное шоу «Поцелуй моря» и морской фейерверк в Сансет Тауне на Фукуоке",
  "hero_caption_ja": "AI-generated illustration: フーコック島サンセットタウン「キス・オブ・ザ・シー」マルチメディアショーと海上花火のイラスト",
  "hero_caption_hi": "AI-generated illustration: फू क्वोक सनसेट टाउन के 'किस ऑफ द सी' मल्टीमीडिया शो और समुद्री आतिशबाजी का चित्रण",
  "body_en": "## [1] Executive Summary\n\nIn Sunset Town, South Phu Quoc, Vietnam, visitors can experience the **'Kiss of the Sea' (Nụ hôn của biển cả)** performance. According to the My Phu Quoc facility guide, the show runs from 21:00 to 21:30, concluding with a maritime fireworks finale around 21:25 (per site listing).\n\n## [2] Show Overview Table\n\n| Item | Details | Source |\n|---|---|---|\n| Show Title | Kiss of the Sea (Nụ hôn của biển cả) | My Phu Quoc Facility Guide |\n| Venue | Sunset Town Theater | My Phu Quoc Facility Guide |\n| Showtime | 21:00 ~ 21:30 | My Phu Quoc Facility Page Listing (sunset-place-10) |\n| Fireworks Finale | Around 21:25 maritime fireworks | My Phu Quoc Facility Page Listing (sunset-place-10) |\n| Amenities | Wheelchair-accessible entrance, parking, restrooms | My Phu Quoc Facility Page Listing |\n\n## [3] Visitor Tips\n\n① **Allow Ample Time**: The show begins at 21:00 followed by the fireworks finale around 21:25, so arriving early to take your seat is recommended (proposal).\n\n② **Check Amenities**: Wheelchair-accessible entrances, parking facilities, and restrooms are available on-site (per My Phu Quoc facility listing).\n\n## [4] Suggested Itinerary (Proposal)\n\n*(※ This itinerary is a recommendation by the My Phu Quoc editorial team; adjustments may be made based on on-site conditions.)*\n\n1. **17:00 ~ 18:30**: Stroll Mediterranean-style streets and catch the sunset near [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge).\n2. **18:30 ~ 20:30**: Enjoy dinner at the nearby seaside [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) or an ocean-view restaurant.\n3. **20:30 ~ 21:40**: Proceed to the theater for the 21:00 performance and the ~21:25 fireworks finale.\n\n## [5] Frequently Asked Questions (FAQ)\n\n**Q. What time does Kiss of the Sea start?**\nAccording to the My Phu Quoc facility listing, the show is presented from 21:00 to 21:30, with the maritime fireworks finale around 21:25.\n\n**Q. Is wheelchair access available?**\nYes, the facility listing indicates wheelchair-accessible entrances, parking, and restrooms.",
  "body_ko": "## [1] 핵심 요약\n\n베트남 푸꾸옥 남부 선셋타운(Sunset Town)에서는 '키스 오브 더 씨(Kiss of the Sea / Nụ hôn của biển cả)' 공연이 열립니다. 마이푸꾸옥 사이트 시설 안내에 따르면 공연은 21:00~21:30에 상연되며, 21:25경 해상 불꽃놀이 피날레가 펼쳐집니다 (사이트 기재 기준).\n\n## [2] 공연 개요\n\n| 항목 | 내용 | 출처 |\n|---|---|---|\n| 공연 명칭 | 키스 오브 더 씨 (Kiss of the Sea / Nụ hôn của biển cả) | 마이푸꾸옥 시설 안내 |\n| 공연 장소 | 선셋타운 공연장 | 마이푸꾸옥 시설 안내 |\n| 공연 시간 | 21:00 ~ 21:30 | 마이푸꾸옥 시설 페이지 기재 기준 (sunset-place-10) |\n| 불꽃놀이 피날레 | 21:25경 해상 불꽃놀이 | 마이푸꾸옥 시설 페이지 기재 기준 (sunset-place-10) |\n| 편의 시설 | 휠체어 이용 가능 출입구, 주차장, 화장실 | 마이푸꾸옥 시설 페이지 기재 기준 |\n\n## [3] 이용 팁\n\n① **시간 여유 두기**: 공연은 21:00에 시작해 21:25경 불꽃놀이 피날레가 이어지므로, 시작 전에 여유 있게 이동해 자리를 잡는 것을 권장합니다 (제안).\n\n② **편의 시설 확인**: 휠체어 이용 가능 출입구, 주차장, 화장실이 있습니다 (마이푸꾸옥 시설 페이지 기재 기준).\n\n## [4] 제안 동선 (제안)\n\n*(※ 본 동선은 마이푸꾸옥 편집팀이 제안하는 추천 코스이며, 현장 사정에 따라 달라질 수 있습니다.)*\n\n1. **오후 17:00 ~ 18:30**: 지중해풍 거리를 거닐며 [키스 브릿지](https://myphuquoc.net/ko/business/kiss-bridge) 주변에서 일몰 감상\n2. **저녁 18:30 ~ 20:30**: 인근 해변 [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town) 또는 오션뷰 레스토랑에서 저녁 식사\n3. **밤 20:30 ~ 21:40**: 공연장으로 이동해 21:00 공연과 21:25경 피날레 불꽃놀이 관람\n\n## [5] 자주 묻는 질문 (FAQ)\n\n**Q. 키스 오브 더 씨는 몇 시에 하나요?**\n마이푸꾸옥 시설 페이지 기재 기준 21:00~21:30에 상연되며, 21:25경 해상 불꽃놀이 피날레가 진행됩니다.\n\n**Q. 휠체어 이용이 가능한가요?**\n시설 페이지에 휠체어 이용 가능 출입구, 주차장, 화장실이 기재되어 있습니다.",
  "body_zh": "## [1] 核心摘要\n\n在越南富国岛南部日落小镇（Sunset Town），游客可欣赏到震撼的**《海洋之吻》（Kiss of the Sea / Nụ hôn của biển cả）**大秀。依据 My Phu Quoc 设施页面记载，该演出于 21:00~21:30 上演，并在约 21:25 迎来璀璨的海上海景烟花压轴（依据网站记载）。\n\n## [2] 演出概况表\n\n| 项目 | 内容详情 | 来源出处 |\n|---|---|---|\n| 演出名称 | 海洋之吻 (Kiss of the Sea / Nụ hôn của biển cả) | My Phu Quoc 设施指南 |\n| 演出场地 | 日落小镇剧场 | My Phu Quoc 设施指南 |\n| 演出时间 | 每晚 21:00 ~ 21:30 | My Phu Quoc 设施页面记载 (sunset-place-10) |\n| 烟花压轴 | 约 21:25 海上烟花秀 | My Phu Quoc 设施页面记载 (sunset-place-10) |\n| 便利设施 | 轮椅无障碍出入口、停车场、洗手间 | My Phu Quoc 设施页面记载 |\n\n## [3] 观演贴士\n\n① **预留充裕时间**：演出于 21:00 开始，并在约 21:25 迎来烟花压轴，建议在开演前提前到场入座（建议）。\n\n② **确认便利设施**：现场配备轮椅无障碍出入口、停车场与洗手间（依据 My Phu Quoc 设施页面记载）。\n\n## [4] 建议游览路线（建议行程）\n\n*(※ 本行程为 My Phu Quoc 编辑团队推荐建议路线，请根据现场实际运营安排灵活调整。)*\n\n1. **下午 17:00 ~ 18:30**：漫步地中海风情街区，在[亲吻桥](https://myphuquoc.net/zh/business/kiss-bridge)周边欣赏夕阳。\n2. **晚上 18:30 ~ 20:30**：在海滨[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)或海景餐厅享用晚餐。\n3. **夜间 20:30 ~ 21:40**：前往剧场观赏 21:00 的演出及约 21:25 的烟花压轴秀。\n\n## [5] 常见问题解答 (FAQ)\n\n**Q. 《海洋之吻》演出时间是几点？**\n依据 My Phu Quoc 设施页面记载，演出时间为 21:00~21:30，并在约 21:25 进行海上海景烟花压轴。\n\n**Q. 剧场是否支持轮椅通行？**\n设施页面明确记载配备轮椅无障碍出入口、停车场及洗手间。",
  "body_ru": "## [1] Главное\n\nВ Сансет Тауне (Sunset Town) на юге острова Фукуок проходит мультимедийное представление **«Поцелуй моря» (Kiss of the Sea / Nụ hôn của biển cả)**. По данным страницы объекта My Phu Quoc, показ проводится с 21:00 до 21:30, а около 21:25 небо озаряет морской фейерверк (согласно информации на сайте).\n\n## [2] Общие сведения о шоу\n\n| Параметр | Описание | Источник |\n|---|---|---|\n| Название | Поцелуй моря (Kiss of the Sea / Nụ hôn của biển cả) | Справочник My Phu Quoc |\n| Площадка | Амфитеатр Сансет Тауна | Справочник My Phu Quoc |\n| Время показа | 21:00 ~ 21:30 | Страница объекта My Phu Quoc (sunset-place-10) |\n| Морской салют | Около 21:25 морской фейерверк | Страница объекта My Phu Quoc (sunset-place-10) |\n| Удобства | Доступ для инвалидных колясок, парковка, туалеты | Страница объекта My Phu Quoc |\n\n## [3] Советы зрителям\n\n① **Приходите заранее**: Представление начинается в 21:00 и завершается салютом около 21:25, поэтому рекомендуется прийти заблаговременно, чтобы спокойно занять места (рекомендация).\n\n② **Доступная среда**: Для маломобильных посетителей предусмотрены пандусы, парковочные места и оборудованные туалеты (по данным My Phu Quoc).\n\n## [4] Рекомендованный вечерний маршрут (предложение)\n\n*(※ Данный маршрут составлен редакцией My Phu Quoc; ориентируйтесь на фактические условия.)*\n\n1. **17:00 ~ 18:30**: Прогулка по улочкам Сансет Тауна и созерцание заката у моста [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge).\n2. **18:30 ~ 20:30**: Ужин со свежими морепродуктами на рынке [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) или в ресторане с видом на море.\n3. **20:30 ~ 21:40**: Переход в зрительный зал для просмотра представления в 21:00 и салюта в 21:25.\n\n## [5] Часто задаваемые вопросы (FAQ)\n\n**В. В какое время идет шоу «Поцелуй моря»?**\nСогласно странице объекта My Phu Quoc, спектакль начинается в 21:00 и длится до 21:30, а финальный морской салют проходит около 21:25.\n\n**В. Оборудован ли амфитеатр для инвалидных колясок?**\nДа, на странице объекта указано наличие безбарьерных входов, парковки и специализированных санузлов.",
  "body_ja": "## [1] 概要\n\nベトナム・フーコック島南部のサンセットタウン（Sunset Town）では、人気公演**「キス・オブ・ザ・シー（Kiss of the Sea / Nụ hôn của biển cả）」**が開催されています。My Phu Quoc の施設案内によると、本公演は 21:00〜21:30 に上演され、21:25頃に海上花火のフィナーレが夜空を彩ります（サイト掲載基準）。\n\n## [2] 公演概要データ表\n\n| 項目 | 内容 | 出典 |\n|---|---|---|\n| 公演名称 | キス・オブ・ザ・シー (Kiss of the Sea / Nụ hôn của biển cả) | My Phu Quoc 施設案内 |\n| 公演場所 | サンセットタウン劇場 | My Phu Quoc 施設案内 |\n| 公演時間 | 21:00 ~ 21:30 | My Phu Quoc 施設案内基準 (sunset-place-10) |\n| 花火フィナーレ | 21:25頃 海上花火打ち上げ | My Phu Quoc 施設案内基準 (sunset-place-10) |\n| 利便施設 | 車椅子利用可能出入口、駐車場、トイレ | My Phu Quoc 施設案内基準 |\n\n## [3] 観賞のヒント\n\n① **時間に余裕をもって移動**: 公演は 21:00 に始まり、21:25頃に花火フィナーレが続きますので、開演前にゆとりを持って移動し着席することをおすすめします（提案）。\n\n② **設備の事前確認**: 車椅子対応の出入口、駐車場、トイレが整備されています（My Phu Quoc 施設案内基準）。\n\n## [4] おすすめモデルコース（提案）\n\n*(※ 本動線は My Phu Quoc 編集部が提案するおすすめコースであり、現地の運行状況により変更となる場合があります。)*\n\n1. **夕方 17:00 ~ 18:30**: 地中海風の街並みを散策し、[キスブリッジ](https://myphuquoc.net/ja/business/kiss-bridge)周辺で夕日を鑑賞。\n2. **夜 18:30 ~ 20:30**: 海辺の[ブイフェスト・ナイトマーケット](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)やオーシャンビューレストランで夕食。\n3. **夜 20:30 ~ 21:40**: 劇場へ移動し、21:00 の本公演と 21:25頃の花火フィナーレを観賞。\n\n## [5] よくある質問 (FAQ)\n\n**Q. 「キス・オブ・ザ・シー」は何時に始まりますか？**\nMy Phu Quoc 施設案内基準によると、21:00〜21:30 に上演され、21:25頃に海上花火フィナーレが行われます。\n\n**Q. 車椅子での利用は可能ですか？**\n施設ページに車椅子利用可能な出入口、駐車場、トイレが明記されています。",
  "body_hi": "## [1] मुख्य सारांश\n\nवियतनाम के दक्षिणी फू क्वोक स्थित सनसेट टाउन (Sunset Town) में **'किस ऑफ द सी' (Kiss of the Sea / Nụ hôn của biển cả)** शो आयोजित किया जाता है। माई फू क्वोक सुविधा विवरण के अनुसार, यह शो रात 21:00 से 21:30 बजे तक प्रस्तुत किया जाता है, जिसमें लगभग 21:25 बजे समुद्री आतिशबाजी का भव्य फिनाले होता है (वेबसाइट विवरण अनुसार)।\n\n## [2] शो अवलोकन तालिका\n\n| मद | विवरण | स्रोत |\n|---|---|---|\n| शो का नाम | किस ऑफ द सी (Kiss of the Sea / Nụ hôn của biển cả) | माई फू क्वोक सुविधा गाइड |\n| आयोजन स्थल | सनसेट टाउन थिएटर | माई फू क्वोक सुविधा गाइड |\n| शो का समय | 21:00 ~ 21:30 | माई फू क्वोक सुविधा पृष्ठ विवरण (sunset-place-10) |\n| आतिशबाजी फिनाले | लगभग 21:25 बजे समुद्री आतिशबाजी | माई फू क्वोक सुविधा पृष्ठ विवरण (sunset-place-10) |\n| सुविधाएं | व्हीलचेयर सुलभ प्रवेश द्वार, पार्किंग, शौचालय | माई फू क्वोक सुविधा पृष्ठ विवरण |\n\n## [3] दर्शक सुझाव\n\n① **समय से पहले पहुंचें**: शो रात 21:00 बजे शुरू होता है और लगभग 21:25 बजे आतिशबाजी होती है, इसलिए शुरू होने से पहले पहुंचकर अपना स्थान ग्रहण करने का सुझाव दिया जाता है (प्रस्ताव)।\n\n② **सुविधाओं की जानकारी**: थिएटर में व्हीलचेयर सुलभ प्रवेश द्वार, पार्किंग और शौचालय उपलब्ध हैं (माई फू क्वोक सुविधा विवरण अनुसार)।\n\n## [4] सुझाया गया शाम का कार्यक्रम (प्रस्तावित)\n\n*(※ यह मार्ग माई फू क्वोक संपादकीय टीम द्वारा सुझाया गया कार्यक्रम है; स्थानीय परिस्थितियों के अनुसार इसमें परिवर्तन हो सकता है।)*\n\n1. **शाम 17:00 ~ 18:30**: भूमध्यसागरीय शैली की गलियों में टहलें और [किस ब्रिज](https://myphuquoc.net/hi/business/kiss-bridge) के पास सूर्यास्त का आनंद लें।\n2. **शाम 18:30 ~ 20:30**: तटीय [VUI-Fest नाइट मार्केट](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) या समुद्र दृश्य वाले रेस्तरां में रात्रिभोज करें।\n3. **रात 20:30 ~ 21:40**: थिएटर पहुंचकर 21:00 का शो और लगभग 21:25 का आतिशबाजी फिनाले देखें।\n\n## [5] अक्सर पूछे जाने वाले प्रश्न (FAQ)\n\n**प्र. 'किस ऑफ द सी' शो किस समय होता है?**\nमाई फू क्वोक सुविधा पृष्ठ अनुसार, यह शो रात 21:00 से 21:30 बजे तक प्रस्तुत किया जाता है और लगभग 21:25 बजे समुद्री आतिशबाजी का फिनाले होता है।\n\n**प्र. क्या व्हीलचेयर की सुविधा उपलब्ध है?**\nहां, सुविधा पृष्ठ पर व्हीलचेयर सुलभ प्रवेश द्वार, पार्किंग और शौचालय की उपलब्धता का उल्लेख है।",
  "faqs": [
    {
      "question": "What time does Kiss of the Sea start?",
      "answer": "According to the My Phu Quoc facility listing, the show is presented from 21:00 to 21:30, with the maritime fireworks finale around 21:25."
    },
    {
      "question": "Is wheelchair access available?",
      "answer": "Yes, the facility listing indicates wheelchair-accessible entrances, parking, and restrooms."
    }
  ],
  "faqs_ko": [
    {
      "question": "키스 오브 더 씨는 몇 시에 하나요?",
      "answer": "마이푸꾸옥 시설 페이지 기재 기준 21:00~21:30에 상연되며, 21:25경 해상 불꽃놀이 피날레가 진행됩니다."
    },
    {
      "question": "휠체어 이용이 가능한가요?",
      "answer": "시설 페이지에 휠체어 이용 가능 출입구, 주차장, 화장실이 기재되어 있습니다."
    }
  ],
  "faqs_zh": [
    {
      "question": "《海洋之吻》演出时间是几点？",
      "answer": "依据 My Phu Quoc 设施页面记载，演出时间为 21:00~21:30，并在约 21:25 进行海上海景烟花压轴。"
    },
    {
      "question": "剧场是否支持轮椅通行？",
      "answer": "设施页面明确记载配备轮椅无障碍出入口、停车场及洗手间。"
    }
  ],
  "faqs_ru": [
    {
      "question": "В какое время идет шоу «Поцелуй моря»?",
      "answer": "Согласно странице объекта My Phu Quoc, спектакль начинается в 21:00 и длится до 21:30, а финальный морской салют проходит около 21:25."
    },
    {
      "question": "Оборудован ли амфитеатр для инвалидных колясок?",
      "answer": "Да, на странице объекта указано наличие безбарьерных входов, парковки и специализированных санузлов."
    }
  ],
  "faqs_ja": [
    {
      "question": "「キス・オブ・ザ・シー」は何時に始まりますか？",
      "answer": "My Phu Quoc 施設案内基準によると、21:00〜21:30 に上演され、21:25頃に海上花火フィナーレが行われます。"
    },
    {
      "question": "車椅子での利用は可能ですか？",
      "answer": "施設ページに車椅子利用可能な出入口、駐車場、トイレが明記されています。"
    }
  ],
  "faqs_hi": [
    {
      "question": "'किस ऑफ द सी' शो किस समय होता है?",
      "answer": "माई फू क्वोक सुविधा पृष्ठ अनुसार, यह शो रात 21:00 से 21:30 बजे तक प्रस्तुत किया जाता है और लगभग 21:25 बजे समुद्री आतिशबाजी का फिनाले होता है।"
    },
    {
      "question": "क्या व्हीलचेयर की सुविधा उपलब्ध है?",
      "answer": "हां, सुविधा पृष्ठ पर व्हीलचेयर सुलभ प्रवेश द्वार, पार्किंग और शौचालय की उपलब्धता का उल्लेख है।"
    }
  ]
},
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
  "body_en": "## 1. Phu Quoc Named #1 Top Island in Asia by Condé Nast Traveler 2026\n\nVietnam’s Phu Quoc island has earned first place in the \"Top Island in Asia\" category in the 2026 Readers' Choice Awards by the globally recognized US travel publication, **Condé Nast Traveler (US)**.\n\nAccording to major Vietnamese news media (Vietnam News on 2026-10-08, VnExpress on 2026-10-08, and VTV on 2026-10-09), Phu Quoc achieved an outstanding score of **95.26 out of 100**, securing the top ranking in Asia.\n\n*(Note: The award was announced on October 6 according to the VnExpress report.)*\n\nVietnam News also reported that this #1 ranking reflects the US edition (Condé Nast Traveler US). In the UK edition (Condé Nast Traveller UK) readers' survey, Phu Quoc ranked 2nd in Asia with 98.26 points (with Palawan, Philippines taking 1st place).\n\nAmong local media, Vietnam News highlighted Phu Quoc's natural beaches alongside South Island attractions: the sea-crossing cable car, sunset strolls at [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge), evening arts and culture at [Sunset Town](https://myphuquoc.net/business/sunset-place-10), and nightly fireworks displays. (VnExpress and VTV coverage highlighted the island’s key tourism infrastructure, including the sea-crossing cable car).\n\n---\n\n## 2. South Island 1-Day Itinerary (Suggested Itinerary)\n\nThe specific hours and stay durations listed in the table below (approx. 8–10 hours for the full course, 4–5 hours for a half-day visit) represent a **suggested itinerary created by the My Phu Quoc editorial team** to help travelers plan their visit. Please adjust your schedule flexibly based on operating timetables and on-site conditions.\n\n| Time | Schedule | Key Visit Points |\n|---|---|---|\n| 09:30 Departure ~ 13:00 | Cable Car & Hon Thom Nature Park | Ride the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) (*operating schedule unverified; check official on-site timetable beforehand*) and explore Aquatopia Water Park |\n| 13:30 ~ 16:30 | Return to Sunset Town & Alley Walk | Stroll along pastel-toned hillside alleys and relax at [Starbucks Beach House](https://myphuquoc.net/business/starbucks-beach-house-sun-primavera) |\n| 17:00 ~ 18:30 | Kiss Bridge Sunset Stroll & Golden Hour | Watch the ocean sunset from [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) |\n| 18:30 ~ 20:30 | Dinner at VUI-Fest Seaside Night Market | Savor local seafood and street bites at [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) |\n| 21:00 ~ 21:40 | Night Ocean Performance & Fireworks | Watch [Kiss of the Sea](https://myphuquoc.net/business/sunset-place-10) or view the fireworks from the outdoor terrace at [Sun Bavaria Gastropub](https://myphuquoc.net/business/sun-bavaria-gastropub) |\n\n---\n\n## 3. Top 3 Landmarks of Sunset Town\n\n### ① Kiss Bridge (Cầu Hôn)\n[Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) is an iconic pedestrian bridge stretching out over the sea, featuring two spans that face each other with a 30cm gap. (*The 30cm facing distance is as stated on the My Phu Quoc kiss-bridge facility information page.*) It offers an unobstructed vantage point for enjoying the sunset.\n\n### ② VUI-Fest Bazaar Night Market\n[VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) is a modern seaside night market arranged along the waterfront promenade, where visitors can enjoy sea breezes, sample local street snacks, and shop for souvenirs.\n\n### ③ Sun World Hon Thom Cable Car\nDeparting from An Thoi station and crossing the open sea to Hon Thom island, the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) provides panoramic aerial views of turquoise waters and southern island fishing villages. (*Exact operating hours are subject to seasonal adjustments; please verify on-site.*)\n\n---\n\n## 4. Practical Travel Tips\n\n1. **Accommodation**: Staying in central Sunset Town allows convenient walking access to major attractions. Consider [La Festa Phu Quoc, Curio Collection by Hilton](https://myphuquoc.net/business/sunset-place-7) for a luxury stay, or boutique hotels within Sunset Town for great views and value.\n2. **Getting Around**: Take advantage of the [complimentary electric buggy service](https://myphuquoc.net/business/sun-group-sunset-town-electric-buggy-service) to navigate Sunset Town’s hilly terrain effortlessly.\n3. **Check Schedules**: Night shows and cable car operations may adjust according to local weather or weekly policies (checking daily show schedules beforehand is recommended). Be sure to check the [My Phu Quoc Events board](https://myphuquoc.net/events) or on-site notices on the day of your visit.\n\n---\n\n## 5. Frequently Asked Questions (FAQ)\n\n### Q1. How much time is needed to explore Sunset Town?\nThis is a suggested itinerary by our editorial team: allowing half a day or more (approx. 8–10 hours) from daytime through the evening is recommended for the full course including the cable car and night show. For a relaxed stroll, sunset viewing, and dinner, arriving around 16:00 for a 4–5 hour visit is ideal.\n\n### Q2. How does VUI-Fest Bazaar differ from Duong Dong Night Market?\nWhile Duong Dong Night Market in central Phu Quoc offers a traditional and bustling local market experience, the southern [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) offers a contemporary, neatly organized promenade setting with street entertainment and seaside views.\n\n### Q3. What is Phu Quoc's weather like during the dry season (November to April)?\nThe dry season beginning in November brings minimal rainfall, clear skies, and calm seas, marking Phu Quoc's peak travel season. It provides optimal conditions for comfortable sunset viewing and outdoor sightseeing.\n\n---\n\n## Sources\n\n- Vietnam News (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ko": "## 1. 푸꾸옥, 미 컨데나스트 트래블러 '2026년 아시아 최고 섬' 1위 선정\n\n베트남 푸꾸옥이 세계적으로 권위 있는 미국 여행 전문지 컨데나스트 트래블러(Condé Nast Traveler US)의 '리더스 초이스 어워드 2026(Readers' Choice Awards 2026)' 독자 투표에서 '2026년 아시아 최고 섬(Top Island in Asia)' 부문 1위에 올랐습니다.\n\n베트남 주요 언론(Vietnam News 2026-10-08 보도, VnExpress 2026-10-08 보도, VTV 2026-10-09 보도)에 따르면, 푸꾸옥은 100점 만점에 95.26점의 높은 평점을 기록하며 아시아 최고 섬 1위로 선정되었습니다.\n\n(※ 주최 측의 본상 발표일은 10월 6일(VnExpress 보도 기준)입니다.)\n\n또한 Vietnam News는 이번 1위 결과가 미국판(Condé Nast Traveler US) 기준이며, 같은 매체의 영국판(Condé Nast Traveller UK) 독자 투표에서는 푸꾸옥이 98.26점으로 아시아 2위(1위 필리핀 팔라완)를 차지했다고 함께 전했습니다.\n\n현지 언론 가운데 Vietnam News는 푸꾸옥의 자연 해변과 함께 남부의 주요 볼거리로 해상 케이블카, 일몰 산책로인 키스 브릿지(Kiss Bridge), 저녁 문화예술 공간인 선셋타운(Sunset Town), 야간 불꽃놀이 등을 여행자들에게 소개하고 있습니다. (VnExpress와 VTV 보도에서는 해상 케이블카를 비롯한 섬의 주요 관광 인프라를 언급하였습니다.)\n\n## 2. 선셋타운 남부 1일 여행 코스 (추천 제안 코스)\n\n아래 표에 기재된 세부 시간대와 체류 시간(풀코스 약 8~10시간, 반일 코스 약 4~5시간)은 여행자의 일정 계획을 돕기 위해 마이푸꾸옥 편집팀이 구성한 추천 제안 동선입니다. 시설별 실제 운영 시간표와 현장 상황에 따라 일정을 유동적으로 조정하시기 바랍니다.\n\n| 시간대 | 일정 | 방문 포인트 |\n|---|---|---|\n| 09:30 탑승 ~ 13:00 | 해상 케이블카 탑승 & 혼똔섬 자연공원 | [선월드 혼똔섬 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) 탑승 (※ 운행 시간 미확인, 현장 시간표 사전 확인 필요) 및 아쿠아토피아 워터파크 둘러보기 |\n| 13:30 ~ 16:30 | 선셋타운 복귀 & 지중해풍 골목 산책 | 파스텔톤 언덕길 골목, [스타벅스 비치 하우스](https://myphuquoc.net/ko/business/starbucks-beach-house-sun-primavera)에서 휴식 |\n| 17:00 ~ 18:30 | 키스 브릿지 일몰 산책 & 황금빛 노을 감상 | [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)에서 남부 바다 일몰 감상 |\n| 18:30 ~ 20:30 | 부이페스트 해변 야시장 저녁 식사 | [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)에서 로컬 해산물·길거리 음식 즐기기 |\n| 21:00 ~ 21:40 | 밤바다 공연 & 불꽃축제 관람 | [키스 오브 더 씨(Kiss of the Sea)](https://myphuquoc.net/ko/business/sunset-place-10) 또는 [선 바바리아 가스트로펍](https://myphuquoc.net/ko/business/sun-bavaria-gastropub) 야외 테라스 |\n\n## 3. 선셋타운 핵심 랜드마크 3선\n\n① 키스 브릿지 (Cầu Hôn): [키스 브릿지(Kiss Bridge)](https://myphuquoc.net/ko/business/kiss-bridge)는 바다를 향해 뻗은 두 다리가 30cm 간격으로 마주 보는 독특한 구조를 갖춘 선셋타운의 대표적인 해상 보행교입니다. (두 다리가 30cm 간격으로 마주 보는 구조는 마이푸꾸옥 kiss-bridge 시설 안내 페이지 기재 기준.) 탁 트인 시야로 일몰을 감상할 수 있는 명소입니다.\n\n② 부이페스트 바자 해변 야시장 (VUI-Fest Bazaar): [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해변 산책로를 따라 깔끔하게 정비된 부스에서 바닷바람을 맞으며 현지 길거리 간식을 맛보고 기념품을 쇼핑할 수 있는 현대적인 분위기의 해변 야시장입니다.\n\n③ 선월드 혼똔섬 케이블카: 안터이역에서 출발해 바다를 건너 혼똔섬으로 이어지는 [혼똔섬 해상 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)는 상공에서 에메랄드빛 바다와 남부 군도의 어촌 마을 전경을 파노라마처럼 조망할 수 있는 코스입니다. (세부 운행 시간은 계절별 변동 가능하므로 현장 확인 요망)\n\n## 4. 여행자 실전 꿀팁\n\n1. 숙소 위치: 선셋타운 중심가에 머물면 주요 어트랙션까지 도보로 이동할 수 있어 편리합니다. 럭셔리 스테이를 원한다면 [라 페스타 푸꾸옥 힐튼](https://myphuquoc.net/ko/business/sunset-place-7)을, 가성비와 전망을 중시한다면 선셋타운 내 부티크 호텔들을 고려해 볼 만합니다.\n2. 단지 내 이동: 언덕이 많은 선셋타운을 이동할 때는 [무료 전동 버기카](https://myphuquoc.net/ko/business/sun-group-sunset-town-electric-buggy-service)를 이용하면 편리합니다.\n3. 공연 및 시설 일정 확인: 야간 쇼와 케이블카는 현지 기상 상황이나 요일별 운영 정책에 따라 일정이 변동될 수 있으므로(야간 쇼는 당일 현장 일정 사전 확인 권장), 여행 당일 [마이푸꾸옥 이벤트 소식](https://myphuquoc.net/ko/events)이나 시설별 현장 공지를 미리 확인하시기 바랍니다.\n\n## 5. 자주 묻는 질문\n\nQ1. 선셋타운을 둘러보는 데 소요되는 시간은 어느 정도인가요?\n본 코스는 마이푸꾸옥 편집팀이 구성한 제안 코스로, 케이블카와 야간 쇼를 모두 포함하는 풀코스를 즐기신다면 낮부터 밤까지 반나절 이상(약 8~10시간)을 권장합니다. 산책과 일몰 관람, 저녁 식사 위주라면 오후 16시경에 도착해 4~5시간 머무르는 일정이 적당합니다.\n\nQ2. 즈엉동 야시장과 부이페스트 야시장의 차이점은 무엇인가요?\n중부 즈엉동 야시장이 전통적이고 활기찬 재래 야시장 분위기라면, 남부 [부이페스트 바자 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)은 해안 산책로를 따라 깔끔하게 정비된 부스에서 거리 공연과 함께 바다 전망을 즐길 수 있는 현대적인 분위기의 해변 야시장입니다.\n\nQ3. 건기(11월~4월) 푸꾸옥 날씨는 여행하기에 어떤가요?\n11월부터 시작되는 건기는 비가 거의 내리지 않고 맑은 하늘과 잔잔한 바다가 이어지는 푸꾸옥 여행 성수기입니다. 쾌적한 환경에서 일몰을 감상하고 야외 활동을 즐기기에 적합한 시기입니다.\n\n## 출처 (Source)\n\n- Vietnam News 2026-10-08: https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 2026-10-08: https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 2026-10-09: https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_zh": "## 1. 富国岛荣膺《悦游》2026年“亚洲最佳岛屿”第一名\n\n越南富国岛在享誉全球的美国权威旅游杂志**《悦游》（Condé Nast Traveler US）**“读者选择奖2026（Readers' Choice Awards 2026）”投票中，荣获“2026年亚洲最佳岛屿（Top Island in Asia）”第一名。\n\n据越南主要媒体（Vietnam News 2026-10-08、VnExpress 2026-10-08、VTV 2026-10-09）报道，富国岛以满分100分中的**95.26分**高分力拔头筹，位列亚洲第一。\n\n*(※ 依据VnExpress报道，主办方奖项公布日期为10月6日。)*\n\nVietnam News进一步报道，该第一名评选基于美国版（Condé Nast Traveler US）读者投票；在同家媒体的英国版（Condé Nast Traveller UK）读者评选中，富国岛以98.26分位居亚洲第二名（第一名为菲律宾巴拉望）。\n\n在当地媒体报道中，Vietnam News向游客介绍了富国岛的自然海滩以及南部的核心景点：跨海缆车、日落散步胜地[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)、夜间文化艺术胜地[日落小镇（Sunset Town）](https://myphuquoc.net/zh/business/sunset-place-10)以及夜间烟花表演。（VnExpress与VTV报道重点提及了包括跨海缆车在内的全岛重点旅游基础设施）。\n\n---\n\n## 2. 日落小镇南部一日游路线（建议行程）\n\n下表列出的具体时间段与停留时长（全天完整行程约8至10小时，半天行程约4至5小时），是由**My Phu Quoc编辑团队为方便游客规划行程而制定的建议路线**。请根据设施实际运营时刻表及现场情况灵活调整。\n\n| 时间段 | 建议行程 | 核心游览点 |\n|---|---|---|\n| 09:30 出发 ~ 13:00 | 跨海缆车与香岛自然公园 | 乘坐[太阳世界香岛缆车](https://myphuquoc.net/zh/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)（※ 运营时刻未确认，请提前核实官方现场时刻表），畅玩水上乐园 |\n| 13:30 ~ 16:30 | 返回日落小镇与漫步小巷 | 漫步柔和色调的山坡小径，在[星巴克海滩小屋店](https://myphuquoc.net/zh/business/starbucks-beach-house-sun-primavera)小憩 |\n| 17:00 ~ 18:30 | 亲吻桥日落漫步与金黄晚霞 | 登上[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)饱览南部海域日落美景 |\n| 18:30 ~ 20:30 | VUI-Fest 海滨夜市晚餐 | 在[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)品尝当地海鲜与街头美食 |\n| 21:00 ~ 21:40 | 海洋夜间盛典与璀璨烟花 | 观赏[海洋之吻（Kiss of the Sea）](https://myphuquoc.net/zh/business/sunset-place-10)表演，或在[Sun Bavaria 鲜啤餐厅](https://myphuquoc.net/zh/business/sun-bavaria-gastropub)室外露台享受氛围 |\n\n---\n\n## 3. 日落小镇三大核心地标\n\n### ① 亲吻桥 (Cầu Hôn)\n[亲吻桥（Kiss Bridge）](https://myphuquoc.net/zh/business/kiss-bridge)是日落小镇极具代表性的跨海步行桥，两座桥身延伸向大海并在相隔30厘米处深情相对。（两桥相隔30厘米的结构为 My Phu Quoc kiss-bridge 设施信息页面记载基准）。这里是开阔视野下欣赏夕阳的绝佳胜地。\n\n### ② VUI-Fest Bazaar 海滨夜市\n[VUI-Fest 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)沿海滨步道整齐分布，游客可在海风吹拂下品尝地道街头小吃并选购纪念品，体验现代活力的海滨夜市风情。\n\n### ③ 太阳世界香岛缆车\n由安泰站（An Thoi）出发飞跃浩瀚大海连接香岛的[香岛跨海缆车](https://myphuquoc.net/zh/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)，让游客能自高空360度全景俯瞰翡翠色大海与南部群岛渔村风光。（具体运行时间可能因季节调整，请以现场确认为准）。\n\n---\n\n## 4. 游客实用贴士\n\n1. **住宿选择**: 入住日落小镇中心区域可轻松步行抵达主要景点。奢华度假首选[富国岛罗菲斯塔希尔顿格芮精选酒店](https://myphuquoc.net/zh/business/sunset-place-7)，注重性价比与景观则可考虑小镇内的精品酒店。\n2. **镇内交通**: 在坡度起伏的日落小镇内游览，搭乘[免费电动观光车（Buggy）](https://myphuquoc.net/zh/business/sun-group-sunset-town-electric-buggy-service)最为轻松便捷。\n3. **确认运营时间**: 夜间演出与缆车运营可能受天气或周度安排调整（夜间演出建议提前确认当天日程）。出发当天建议先确认 [My Phu Quoc 活动公告板](https://myphuquoc.net/zh/events) 或各设施现场公告。\n\n---\n\n## 5. 常见问题解答 (FAQ)\n\n### Q1. 游览日落小镇建议预留多少时间？\n本路线为编辑团队制定的建议路线：若包含缆车及夜间演出的全套体验，建议安排白天至夜晚大半天时间（约8至10小时）。若仅安排散步、日落观赏及晚餐，下午16:00左右到达游览4至5小时即可。\n\n### Q2. 阳东夜市与 VUI-Fest 夜市有何区别？\n中部阳东夜市更偏向传统热闹的在地传统夜市，而南部[VUI-Fest Bazaar 夜市](https://myphuquoc.net/zh/business/cho-dem-vui-fest-bazaar-sunset-town)则是沿海滨步道规范建设、融合街头表演与海景的现代时尚海滩夜市。\n\n### Q3. 旱季（11月至次年4月）富国岛天气适合旅行吗？\n11月起进入的旱季降雨稀少、晴空万里、风平浪静，是富国岛的黄金旅游季节，非常适宜舒适地观赏日落及开展户外活动。\n\n---\n\n## 报道来源 (Sources)\n\n- Vietnam News 报道 (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 报道 (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 报道 (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ru": "## 1. Фукуок занял 1-е место в рейтинге «Лучшие острова Азии 2026» по версии Condé Nast Traveler\n\nВьетнамский остров Фукуок занял первое место в номинации «Лучший остров Азии» (Top Island in Asia) в рамках престижной ежегодной премии Readers' Choice Awards 2026 ведущего американского издания о путешествиях **Condé Nast Traveler (US)**.\n\nПо сообщениям ведущих вьетнамских СМИ (Vietnam News от 08.10.2026, VnExpress от 08.10.2026 и VTV от 09.10.2026), Фукуок набрал высокий балл — **95.26 из 100**, заняв верхнюю строчку рейтинга в Азии.\n\n*(※ Согласно сообщению VnExpress, официальное объявление награды состоялось 6 октября).*\n\nИздание Vietnam News также отметило, что данный результат относится к голосованию читателей американской версии (Condé Nast Traveler US). В опросе британской версии журнала (Condé Nast Traveller UK) Фукуок занял 2-е место в Азии с результатом 98.26 балла (первое место занял остров Палаван, Филиппины).\n\nСреди местных СМИ газета Vietnam News знакомит путешественников с природными пляжами Фукуока и ключевыми достопримечательностями юга острова: канатной дорогой над морем, пешеходным мостом [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) для романтических прогулок на закате, вечерним культурно-развлекательным комплексом [Сансет Таун (Sunset Town)](https://myphuquoc.net/ru/business/sunset-place-10) и ежедневными фейерверками. (В репортажах VnExpress и VTV также подчеркивалась ключевая туристическая инфраструктура острова, включая морскую канатную дорогу).\n\n---\n\n## 2. Однодневный маршрут по югу Фукуока и Сансет Тауну (Рекомендованный маршрут)\n\nУказанные в таблице временные интервалы и продолжительность пребывания (полный маршрут около 8–10 часов, экспресс-программа на полдня около 4–5 часов) представляют собой **рекомендованный маршрут, составленный редакцией My Phu Quoc** для помощи в планировании путешествия. Пожалуйста, корректируйте время в зависимости от графика работы объектов и фактических обстоятельств.\n\n| Время | Программа | Основные точки маршрута |\n|---|---|---|\n| 09:30 Отправление ~ 13:00 | Морская канатная дорога и парк Хон Тхом | Поездка на [канатной дороге Sun World Hon Thom](https://myphuquoc.net/ru/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) (*расписание не подтверждено, просьба уточнять на месте*) и посещение аквапарка Aquatopia |\n| 13:30 ~ 16:30 | Возвращение в Сансет Таун и прогулка | Прогулка по живописным улочкам пастельных тонов, отдых в [Starbucks Beach House](https://myphuquoc.net/ru/business/starbucks-beach-house-sun-primavera) |\n| 17:00 ~ 18:30 | Закат на мосту Kiss Bridge | Встреча золотистого заката с панорамным видом на море на мосту [Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) |\n| 18:30 ~ 20:30 | Ужин на набережном ночном рынке VUI-Fest | Дегустация морепродуктов и местных блюд на рынке [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) |\n| 21:00 ~ 21:40 | Морское вечернее шоу и фейерверк | Просмотр шоу [Kiss of the Sea](https://myphuquoc.net/ru/business/sunset-place-10) или отдых на открытой террасе ресторана [Sun Bavaria Gastropub](https://myphuquoc.net/ru/business/sun-bavaria-gastropub) |\n\n---\n\n## 3. Топ-3 достопримечательности Сансет Тауна\n\n### ① Мост Поцелуев — Kiss Bridge (Cầu Hôn)\n[Мост Kiss Bridge](https://myphuquoc.net/ru/business/kiss-bridge) — культовое архитектурное сооружение, две ветви которого устремлены навстречу друг другу в море и сходятся с зазором всего в 30 см. (*Расстояние в 30 см между пролетами приведено согласно данным информационной страницы объекта kiss-bridge на сайте My Phu Quoc.*) Это идеальное место для панорамного обзора заката.\n\n### ② Ночной рынок VUI-Fest Bazaar\nПриморский ночной рынок [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) расположен вдоль благоустроенной набережной. Здесь можно прогуляться под морским бризом, попробовать аутентичный стритфуд и приобрести сувениры в современной комфортной атмосфере.\n\n### ③ Канатная дорога Sun World Hon Thom\nМорская канатная дорога [Hon Thom Cable Car](https://myphuquoc.net/ru/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc), берущая начало от станции Ан Тхой (An Thoi), соединяет главный остров с островом Хон Тхом. Во время полета над морем открывается панорамный вид на бирюзовые воды и рыбацкие деревни. (*Точное расписание движения может меняться в зависимости от сезона; уточняйте на месте.*)\n\n---\n\n## 4. Практические советы для туристов\n\n1. **Где остановиться**: Проживание в центре Сансет Тауна обеспечивает удобную пешую доступность ко всем локациям. Для роскошного отдыха выберите [La Festa Phu Quoc, Curio Collection by Hilton](https://myphuquoc.net/ru/business/sunset-place-7), а для оптимального баланса цены и видовых характеристик подойдут бутик-отели города.\n2. **Передвижение**: Для перемещения по холмистой территории Сансет Тауна удобно пользоваться [бесплатными электрическими шаттлами (багги)](https://myphuquoc.net/ru/business/sun-group-sunset-town-electric-buggy-service).\n3. **Уточнение расписания**: Расписание вечерних шоу и канатной дороги может корректироваться из-за погодных условий или внутренних регламентов (рекомендуется заранее уточнять расписание вечерних шоу). В день поездки обязательно проверяйте [доску событий My Phu Quoc Events](https://myphuquoc.net/ru/events) или объявления на месте.\n\n---\n\n## 5. Часто задаваемые вопросы (FAQ)\n\n### В1. Сколько времени требуется на осмотр Сансет Тауна?\nЭто рекомендованный маршрут от редакции: на полную программу с канатной дорогой и вечерним шоу рекомендуется выделить от полудня до вечера (около 8–10 часов). Если цель визита — спокойная прогулка, закат и ужин, достаточно приехать к 16:00 на 4–5 часов.\n\n### В2. В чем разница между ночным рынком Зыонгдонг и рынком VUI-Fest?\nЕсли ночной рынок в Зыонгдонге (центр острова) представляет собой классический азиатский базар, то южный рынок [VUI-Fest Bazaar](https://myphuquoc.net/ru/business/cho-dem-vui-fest-bazaar-sunset-town) — это современное гастрономическое пространство на набережной с морским видом и аккуратными павильонами.\n\n### В3. Какая погода на Фукуоке в сухой сезон (с ноября по апрель)?\nСухой сезон, начинающийся в ноябре — это пик туристического сезона на Фукуоке: минимум осадков, чистое небо и спокойное море. Это самое благоприятное время для созерцания закатов и активного отдыха на открытом воздухе.\n\n---\n\n## Источники (Sources)\n\n- Сообщение Vietnam News (08.10.2026): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- Сообщение VnExpress (08.10.2026): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- Сообщение VTV (09.10.2026): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_ja": "## 1. フーコック島、米コンデナスト・トラベラー誌「2026年アジア最高の島」第1位に選出\n\nベトナムのフーコック島が、世界的な権威を誇る米国の旅行専門誌**コンデナスト・トラベラー（Condé Nast Traveler US）**による「リーダーズ・チョイス・アワード2026（Readers' Choice Awards 2026）」読者投票において、「2026年アジア最高の島（Top Island in Asia）」部門で第1位に輝きました。\n\nベトナム主要メディア（Vietnam News 2026-10-08報道、VnExpress 2026-10-08報道、VTV 2026-10-09報道）によると、フーコック島は100点満点中**95.26点**という高得点を記録し、アジアのトップアイランドとして選出されました。\n\n*(※ VnExpressの報道によると、主催者による本賞の公式発表日は10月6日です。)*\n\nまた、Vietnam Newsはこの第1位の結果が米国版（Condé Nast Traveler US）の基準であり、同誌の英国版（Condé Nast Traveller UK）の読者投票ではフーコック島が98.26点でアジア第2位（第1位はフィリピンのパラワン島）を獲得したことも併せて報じています。\n\n現地報道の中でVietnam Newsは、フーコック島の豊かな自然ビーチとともに、南部エリアの主要な見どころとして海上ロープウェイ、夕日散策の定番である[キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)、夜の文化芸術スポット[サンセットタウン（Sunset Town）](https://myphuquoc.net/ja/business/sunset-place-10)、そして毎晩の花火ショーを旅行者向けに紹介しています。（VnExpressおよびVTVの報道でも、海上ロープウェイをはじめとする島の基幹観光インフラが言及されました）。\n\n---\n\n## 2. サンセットタウン南部1日モデルコース（提案コース）\n\n以下の表に記載された具体的な時間帯や滞在時間（フルコース約8〜10時間、半日コース約4〜5時間）は、旅行者の計画をサポートするために**My Phu Quoc編集チームが作成したおすすめの提案動線**です。各施設の実際の運行スケジュールや現地の天候状況に合わせて柔軟に調整してください。\n\n| 時間帯 | スケジュール | 主な立ち寄りポイント |\n|---|---|---|\n| 09:30 出発 ~ 13:00 | 海上ロープウェイ乗車＆ホントム島自然公園 | [サンワールド・ホントム・ロープウェイ](https://myphuquoc.net/ja/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)に乗車（※ 運行スケジュール未確認、現地の公式時刻表を事前確認推奨）し、アクアトピア・ウォーターパークを満喫 |\n| 13:30 ~ 16:30 | サンセットタウン帰還＆地中海風の路地散策 | パステルトーンの丘の小道を散策し、[スターバックス ビーチハウス店](https://myphuquoc.net/ja/business/starbucks-beach-house-sun-primavera)で休憩 |\n| 17:00 ~ 18:30 | キスブリッジで夕日散策＆黄金色の黄昏観賞 | [キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)の上から南部の海のサンセットを観賞 |\n| 18:30 ~ 20:30 | ブイフェスト海浜ナイトマーケットで夕食 | [ブイフェスト・バザール（VUI-Fest Bazaar）](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)で新鮮なシーフードや屋台料理を堪能 |\n| 21:00 ~ 21:40 | 夜の海上ショー観賞＆花火フィナーレ | [キス・オブ・ザ・シー（Kiss of the Sea）](https://myphuquoc.net/ja/business/sunset-place-10)を観賞、または[サン・ババリア・ガストロパブ](https://myphuquoc.net/ja/business/sun-bavaria-gastropub)のオープンエアテラスで満喫 |\n\n---\n\n## 3. サンセットタウンの3大注目ランドマーク\n\n### ① キスブリッジ (Cầu Hôn)\n[キスブリッジ（Kiss Bridge）](https://myphuquoc.net/ja/business/kiss-bridge)は、海に向かって伸びる2本の橋がわずか30cmの間隔を空けて向かい合う独特の設計が施された、サンセットタウンを代表する海上歩道橋です。（向かい合う間隔が30cmである構造は、My Phu Quocのkiss-bridge施設案内ページ記載基準）。視界を遮るもののない大パノラマでサンセットを望める名所です。\n\n### ② ブイフェスト・バザール海浜ナイトマーケット\n海辺のプロムナード沿いに綺麗に整えられたブースが並ぶ[ブイフェスト・ナイトマーケット](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)は、潮風を感じながら現地のストリートフードを味わい、お土産探しを楽しめるモダンな雰囲気の海浜マーケットです。\n\n### ③ サンワールド・ホントム・ロープウェイ\nアントイ駅（An Thoi）から出発して大海原を越えホントム島へと繋がる[ホントム海上ロープウェイ](https://myphuquoc.net/ja/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc)は、上空からエメラルドグリーンの海と南部諸島の漁村風景を一望できる爽快なアトラクションです。（詳細な運行時間は季節により変動する可能性があるため、現地でのご確認をお願いします）。\n\n---\n\n## 4. 旅行者のための実践的なヒント\n\n1. **宿泊エリアの選択**: サンセットタウンの中心部に滞在すると、主要な見どころまで徒歩で快適に移動できます。贅沢なリゾートステイなら[ラ・フェスタ・フーコック・ヒルトン](https://myphuquoc.net/ja/business/sunset-place-7)、眺望とコストパフォーマンスを両立させるならタウン内のブティックホテルがおすすめです。\n2. **タウン内の移動**: 坂道の多いサンセットタウン内を移動する際は、[無料の電動バギー（Buggy）](https://myphuquoc.net/ja/business/sun-group-sunset-town-electric-buggy-service)を上手に活用すると体力を温存できます。\n3. **運行・公演日時の確認**: 夜間ショーやロープウェイは、現地の天候状況や曜日ごとの運営方針によって変更される場合があります（夜間ショーの当日スケジュールは事前確認を推奨）。旅行当日は[My Phu Quocイベント掲示板](https://myphuquoc.net/ja/events)や現地の最新案内を事前にご確認ください。\n\n---\n\n## 5. よくある質問 (FAQ)\n\n### Q1. サンセットタウンを巡るのに必要な所要時間はどのくらいですか？\n本コースは編集部による提案コースです。ロープウェイと夜間ショーの両方を含むフルコースを満喫する場合は、日中から夜まで半日以上（約8〜10時間）の確保をおすすめします。散策、夕日観賞、夕食がメインであれば、午後16時頃に到着して4〜5時間滞在するスケジュールが手頃です。\n\n### Q2. ズオンドン夜市とブイフェスト・バザールの違いは何ですか？\n中部にあるズオンドン夜市が昔ながらの活気あふれる伝統的な市場であるのに対し、南部の[ブイフェスト・バザール（VUI-Fest Bazaar）](https://myphuquoc.net/ja/business/cho-dem-vui-fest-bazaar-sunset-town)は海沿いの遊歩道に沿って清潔に整備され、ストリートパフォーマンスとオーシャンビューを同時に楽しめる現代的なビーチフロントナイトマーケットです。\n\n### Q3. 乾期（11月〜4月）のフーコック島の気候は観光に適していますか？\n11月から始まる乾期は雨がほとんど降らず、澄み渡る青空と穏やかな波が続くフーコック観光のベストシーズンです。快適な環境の中で美しい夕日を眺め、屋外アクティビティを満喫するのに最も適した時期です。\n\n---\n\n## 情報出所 (Sources)\n\n- Vietnam News 報道 (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress 報道 (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV 報道 (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
  "body_hi": "## 1. फू क्वोक को कोंडे नास्ट ट्रैवलर द्वारा '2026 में एशिया का शीर्ष द्वीप' घोषित किया गया\n\nवियतनाम के फू क्वोक द्वीप ने विश्व प्रसिद्ध अमेरिकी यात्रा पत्रिका **कोंडे नास्ट ट्रैवलर (Condé Nast Traveler US)** के 'रीडर्स च्वाइस अवार्ड्स 2026 (Readers' Choice Awards 2026)' में \"एशिया का शीर्ष द्वीप (Top Island in Asia)\" श्रेणी में पहला स्थान प्राप्त किया है।\n\nवियतनाम के प्रमुख समाचार माध्यमों (Vietnam News 2026-10-08, VnExpress 2026-10-08, VTV 2026-10-09) के अनुसार, फू क्वोक ने 100 में से **95.26 अंकों** का उत्कृष्ट स्कोर हासिल कर एशिया में पहला स्थान प्राप्त किया।\n\n*(※ VnExpress की रिपोर्ट के अनुसार, आयोजकों द्वारा पुरस्कार की आधिकारिक घोषणा 6 अक्टूबर को की गई थी।)*\n\nVietnam News ने यह भी बताया कि यह नंबर 1 रैंकिंग अमेरिकी संस्करण (Condé Nast Traveler US) पर आधारित है; जबकि इसी पत्रिका के यूके संस्करण (Condé Nast Traveller UK) के पाठकों के सर्वेक्षण में फू क्वोक 98.26 अंकों के साथ एशिया में दूसरे स्थान पर रहा (फिलीपींस का पलावन पहले स्थान पर रहा)।\n\nस्थानीय मीडिया में, Vietnam News ने फू क्वोक के प्राकृतिक समुद्र तटों के साथ-साथ दक्षिणी द्वीप के प्रमुख आकर्षणों को पर्यटकों के सामने प्रस्तुत किया: समुद्र पार करने वाली केबल कार, सूर्यास्त की सैर के लिए [किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge), शाम के सांस्कृतिक और कला केंद्र [सनसेट टाउन (Sunset Town)](https://myphuquoc.net/hi/business/sunset-place-10), और रात्रि आतिशबाजी। (VnExpress और VTV की रिपोर्टों में भी केबल कार सहित द्वीप के प्रमुख पर्यटन बुनियादी ढांचे का उल्लेख किया गया था)।\n\n---\n\n## 2. सनसेट टाउन दक्षिण द्वीप 1-दिवसीय यात्रा कार्यक्रम (सुझाया गया मार्ग)\n\nनीचे दी गई तालिका में उल्लिखित विशिष्ट समय और रुकने की अवधि (पूरे दिन के कार्यक्रम के लिए लगभग 8–10 घंटे, आधे दिन के लिए 4–5 घंटे) **माई फू क्वोक संपादकीय टीम द्वारा यात्रियों की सुविधा के लिए तैयार किया गया एक सुझाया गया मार्ग है**। कृपया सुविधाओं के वास्तविक समय और स्थानीय परिस्थितियों के अनुसार अपने कार्यक्रम को समायोजित करें।\n\n| समय | कार्यक्रम | प्रमुख पड़ाव |\n|---|---|---|\n| 09:30 प्रस्थान ~ 13:00 | केबल कार की सवारी और होन थोम प्राकृतिक पार्क | [सन वर्ल्ड होन थोम केबल कार](https://myphuquoc.net/hi/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) की सवारी (*संचालन समय असत्यापित, कृपया पहले से आधिकारिक समय सारिणी की जांच करें*) और एक्वाटोपिया वाटर पार्क का आनंद |\n| 13:30 ~ 16:30 | सनसेट टाउन वापसी और गलियों में सैर | पेस्टल रंगों वाली ढलानदार गलियों में घूमें और [स्टारबक्स बीच हाउस](https://myphuquoc.net/hi/business/starbucks-beach-house-sun-primavera) में विश्राम करें |\n| 17:00 ~ 18:30 | किस ब्रिज पर सूर्यास्त की सैर और सुनहरी शाम | [किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge) से समुद्र में डूबते सूर्य का विहंगम दृश्य देखें |\n| 18:30 ~ 20:30 | VUI-Fest नाइट मार्केट में रात्रिभोज | [VUI-Fest Bazaar](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) में स्थानीय सीफूड और स्ट्रीट फूड का स्वाद लें |\n| 21:00 ~ 21:40 | रात्रि समुद्री शो और भव्य आतिशबाजी | [किस ऑफ द सी (Kiss of the Sea)](https://myphuquoc.net/hi/business/sunset-place-10) देखें, या [Sun Bavaria Gastropub](https://myphuquoc.net/hi/business/sun-bavaria-gastropub) की खुली छत से दृश्यों का आनंद लें |\n\n---\n\n## 3. सनसेट टाउन के 3 प्रमुख ऐतिहासिक स्थल\n\n### ① किस ब्रिज (Cầu Hôn)\n[किस ब्रिज (Kiss Bridge)](https://myphuquoc.net/hi/business/kiss-bridge) समुद्र की ओर फैली एक अनूठी पैदल पुल संरचना है, जिसके दो सिरे एक-दूसरे से मात्र 30 सेमी की दूरी पर आमने-सामने स्थित हैं। (*दोनों सिरों के बीच 30 सेमी का अंतर माई फू क्वोक kiss-bridge सुविधा पृष्ठ पर उल्लिखित विवरण के अनुसार है।*) यह सूर्यास्त के विहंगम दर्शन के लिए सबसे प्रसिद्ध स्थान है।\n\n### ② VUI-Fest Bazaar समुद्री नाइट मार्केट\nतटीय सैरगाह के किनारे सुव्यवस्थित स्टालों के साथ [VUI-Fest नाइट मार्केट](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) समुद्री हवा के बीच स्थानीय स्नैक्स और स्मृति चिन्हों की खरीदारी के लिए एक आधुनिक और जीवंत स्थान है।\n\n### ③ सन वर्ल्ड होन थोम केबल कार\nअन थोई स्टेशन (An Thoi) से शुरू होकर समुद्र के ऊपर से होते हुए होन थोम द्वीप तक जाने वाली [होन थोम केबल कार](https://myphuquoc.net/hi/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) ऊपर से फ़िरोज़ा समुद्र और दक्षिणी द्वीपों के मछली पकड़ने वाले गांवों का मनोरम दृश्य प्रस्तुत करती है। (*मौसम के अनुसार समय में बदलाव संभव है; कृपया मौके पर पुष्टि करें।* )\n\n---\n\n## 4. यात्रियों के लिए व्यावहारिक सुझाव\n\n1. **आवास**: सनसेट टाउन के केंद्र में ठहरने से प्रमुख आकर्षणों तक पैदल पहुंचा जा सकता है। विलासिता के लिए [ला फेस्टा फू क्वोक हिल्टन](https://myphuquoc.net/hi/business/sunset-place-7) चुनें, या उत्कृष्ट दृश्यों और किफ़ायती दरों के लिए बुटीक होटल देखें।\n2. **आवागमन**: ढलानों वाले सनसेट टाउन में आसानी से घूमने के लिए [मुफ्त इलेक्ट्रिक बग्गी सेवा](https://myphuquoc.net/hi/business/sun-group-sunset-town-electric-buggy-service) का उपयोग करें।\n3. **समय सारिणी की पुष्टि**: मौसम या दिन की नीतियों के आधार पर रात्रि शो और केबल कार के समय में बदलाव हो सकता है (शाम के शो का कार्यक्रम पहले से देख लें)। यात्रा के दिन [My Phu Quoc Events बोर्ड](https://myphuquoc.net/hi/events) या स्थानीय सूचना बोर्ड अवश्य देखें।\n\n---\n\n## 5. अक्सर पूछे जाने वाले प्रश्न (FAQ)\n\n### प्र1. सनसेट टाउन घूमने के लिए कितना समय पर्याप्त है?\nयह संपादकीय टीम द्वारा सुझाया गया मार्ग है: केबल कार और नाइट शो सहित पूरे कार्यक्रम का आनंद लेने के लिए दोपहर से रात तक (लगभग 8–10 घंटे) का समय रखने की सिफारिश की जाती है। यदि केवल सैर, सूर्यास्त और रात का खाना ही प्राथमिकता है, तो शाम 16:00 बजे पहुंचकर 4–5 घंटे रुकना पर्याप्त है।\n\n### प्र2. डुओंग डोंग नाइट मार्केट और VUI-Fest में क्या अंतर है?\nमध्य फू क्वोक का डुओंग डोंग नाइट मार्केट पारंपरिक और चहल-पहल वाला बाज़ार है, जबकि दक्षिणी [VUI-Fest Bazaar](https://myphuquoc.net/hi/business/cho-dem-vui-fest-bazaar-sunset-town) समुद्र तट के किनारे सुव्यवस्थित, आधुनिक और स्ट्रीट परफॉर्मेंस से युक्त एक खुला बाज़ार है।\n\n### प्र3. सूखे मौसम (नवंबर से अप्रैल) में फू क्वोक का मौसम कैसा रहता है?\nनवंबर से शुरू होने वाले सूखे मौसम में नगण्य बारिश, साफ आसमान और शांत समुद्र रहता है, जो फू क्वोक की यात्रा का सबसे बेहतरीन मौसम है। यह सूर्यास्त देखने और बाहरी गतिविधियों के लिए सबसे अनुकूल समय है।\n\n---\n\n## स्रोत (Sources)\n\n- Vietnam News रिपोर्ट (2026-10-08): https://vietnamnews.vn/life-style/1801476/phu-quoc-sweeps-prestigious-conde-nast-global-island-rankings.html\n- VnExpress रिपोर्ट (2026-10-08): https://vnexpress.net/phu-quoc-la-dao-dep-nhat-chau-a-2026-5129568.html\n- VTV रिपोर्ट (2026-10-09): https://vtv.vn/phu-quoc-dung-dau-binh-chon-dao-duoc-yeu-thich-nhat-chau-a-100261008193924304.htm",
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
}
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
