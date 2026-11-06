import type { Locale } from '@/lib/i18n/config'

/**
 * 선셋타운 버기 투어 코스(약 45분) 안내 — 업체 제공 문서(So_do_lo_trinh_Sunset_Town_Moi.docx) 기준.
 * 영어·베트남어는 업체 문서의 표기를 그대로 사용한다. 그 외 언어는 번역 감수 전까지 영어로 표시한다.
 */
export interface BuggyCourseStop {
  title: string
  desc: string
}

export interface BuggyCourseCopy {
  eyebrow: string
  title: string
  note: string
  stops: BuggyCourseStop[]
}

const EN: BuggyCourseCopy = {
  eyebrow: 'Course',
  title: 'Sunset Town Buggy Course',
  note: 'The estimated duration is 45 minutes. However, the actual schedule will be flexibly adjusted based on how much time guests spend taking photos at each location.',
  stops: [
    {
      title: 'Pick-up: your hotel (in Sunset Town)',
      desc: 'The car picks guests up directly at their hotel lobby within the Sunset Town area to start the tour.',
    },
    {
      title: 'The Roman Colosseum (An Thoi Cable Car Station)',
      desc: 'The first stop after leaving the hotel. The car parks in a spacious area for guests to comfortably get off and take photos with the grand, ancient stone arches.',
    },
    {
      title: 'Arc de Triomphe (Gavi Arch)',
      desc: 'The car moves along the main road into the shophouse area. The Arc de Triomphe, standing over 10 meters tall, beautifully replicates classic French architecture.',
    },
    {
      title: 'The Dragon Stairs',
      desc: 'Located in The Center sector, featuring impressive zigzag slopes lined with vibrant bougainvillea, inspired by the famous Lombard Street.',
    },
    {
      title: 'Milan Sky Gate & end of Milan Street',
      desc: 'A winding road hugging the hillside. The end of the street features the Sky Gate, opening up a magnificent panoramic sea view and looking directly towards the premium Convention Center.',
    },
    {
      title: 'Pearl Square (flexible stop)',
      desc: 'The car moves down to the beachfront area near the square. If parking is allowed, the car stops close to the curb for guests to take quick photos for 3-5 minutes. If parking is restricted, the car drives slowly (20-30 km/h) with windows rolled down so guests can admire the seaside square scenery.',
    },
    {
      title: 'Drop-off: requested location in Sunset Town',
      desc: 'The car conveniently drops guests off at their desired seaside restaurants, cafes, hotels, or shophouses, concluding the 45-minute tour.',
    },
  ],
}

const VI: BuggyCourseCopy = {
  eyebrow: 'Lộ trình',
  title: 'Lộ trình tham quan Sunset Town',
  note: 'Thời gian di chuyển tham quan mỗi tour dự kiến là 45 phút. Tuy nhiên, thời gian thực tế sẽ được linh hoạt cân đối tùy thuộc vào thời lượng khách chụp hình tại mỗi địa điểm nhiều hay ít.',
  stops: [
    {
      title: 'Điểm đón: khách sạn của khách (tại Sunset Town)',
      desc: 'Xe đón khách trực tiếp tại sảnh khách sạn để bắt đầu hành trình tham quan.',
    },
    {
      title: 'Đấu trường La Mã (Ga cáp treo An Thới)',
      desc: 'Điểm dừng chân đầu tiên sau khi rời khách sạn. Xe đỗ tại bãi rộng để khách thoải mái xuống chụp hình check-in với các vòm đá cổ kính nguy nga.',
    },
    {
      title: 'Cổng Khải Hoàn Môn (Gavi Arch)',
      desc: 'Xe di chuyển dọc theo trục đường lớn dẫn vào phân khu shophouse. Cổng Khải Hoàn Môn cao hơn 10m tái hiện kiến trúc Pháp cổ kính.',
    },
    {
      title: 'Cầu thang Rồng',
      desc: 'Nằm tại phân khu The Center với các con dốc zigzag ấn tượng được phủ đầy hoa giấy rực rỡ, lấy cảm hứng từ con đường Lombard nổi tiếng.',
    },
    {
      title: 'Cổng Trời Milan & cuối đường Milan',
      desc: 'Cung đường uốn lượn ôm dốc đồi. Cuối đoạn đường là view Cổng Trời mở ra toàn cảnh biển hoành tráng và hướng thẳng mắt nhìn sang Khu hội nghị cao cấp.',
    },
    {
      title: 'Quảng trường Ngọc Trai (điểm linh hoạt)',
      desc: 'Xe xuống khu vực sát biển gần quảng trường. Nếu bảo vệ cho dừng, xe tấp sát lề để khách xuống chụp hình nhanh 3–5 phút. Nếu bảo vệ không cho dừng, xe chạy chậm (20–30 km/h) hạ kính để khách ngắm cảnh toàn khu quảng trường ven biển.',
    },
    {
      title: 'Điểm kết thúc: vị trí khách yêu cầu trong Sunset Town',
      desc: 'Xe thuận đường trả khách tại các điểm nhà hàng, quán cafe ven biển hoặc khách sạn/shophouse theo ý muốn của khách, kết thúc tour tham quan 45 phút.',
    },
  ],
}

// 한국어·중국어·러시아어·일본어·힌디어: Gemini 초안(ChatGPT 감수 대기). 중국어 '安泰缆车站' 등 현지 표기는 미확인.
const TRANSLATED: Partial<Record<Locale, BuggyCourseCopy>> = {
  ko: {
    eyebrow: "코스",
    title: "선셋타운 버기 투어 코스",
    note: "예상 소요 시간은 45분입니다. 단, 각 장소에서 고객이 사진 촬영에 소요하는 시간에 따라 실제 일정은 유연하게 조정됩니다.",
    stops: [
      { title: "픽업: 투숙 호텔 (선셋타운 내)", desc: "투어를 시작하기 위해 선셋타운 지역 내 호텔 로비에서 고객을 직접 픽업합니다." },
      { title: "로마 콜로세움(안토이 케이블카 역)", desc: "호텔 출발 후 첫 번째 정차 지점입니다. 고객이 편안하게 하차하여 웅장한 고대 석조 아치를 배경으로 사진을 찍을 수 있도록 넓은 공간에 정차합니다." },
      { title: "개선문(Gavi Arch)", desc: "메인 도로를 따라 숍하우스 구역으로 이동합니다. 높이 10m가 넘는 개선문은 고전적인 프랑스 건축 양식을 아름답게 재현하고 있습니다." },
      { title: "드래곤 계단", desc: "더 센터(The Center) 구역에 위치해 있으며, 유명한 롬바드 거리(Lombard Street)에서 영감을 받아 화사한 부겐빌레아가 늘어선 인상적인 지그재그 경사로가 특징입니다." },
      { title: "밀라노 스카이 게이트 & 밀라노 거리 끝자락", desc: "언덕을 따라 이어지는 구불구불한 길입니다. 거리 끝에는 스카이 게이트가 있어 탁 트인 웅장한 바다 파노라마 뷰가 펼쳐지며, 프리미엄 컨벤션 센터를 정면으로 바라볼 수 있습니다." },
      { title: "펄 광장 (유동적 정차)", desc: "광장 근처 해변 구역으로 내려갑니다. 주차가 허용되는 경우, 고객이 3~5분간 간단히 사진을 찍을 수 있도록 연석 가까이에 정차합니다. 주차가 제한된 경우, 창문을 내리고 천천히(20~30 km/h) 주행하여 고객이 해변 광장의 풍경을 감상할 수 있도록 합니다." },
      { title: "드롭오프: 선셋타운 내 요청 장소", desc: "고객이 원하는 해변가 레스토랑, 카페, 호텔 또는 숍하우스에 편리하게 내려드리며 45분간의 투어를 마무리합니다." },
    ],
  },
  zh: {
    eyebrow: "路线",
    title: "日落小镇观光车路线",
    note: "预计时长为45分钟。但实际行程将根据客人在每个地点拍照所花费的时间进行灵活调整。",
    stops: [
      { title: "接车：您的酒店（日落小镇内）", desc: "车辆直接前往日落小镇区域内的酒店大堂接客人，开始游览。" },
      { title: "古罗马斗兽场（安泰缆车站）", desc: "离开酒店后的第一站。车辆停靠在宽敞的区域，方便客人舒适下车，与宏伟的古老石拱门合影留念。" },
      { title: "凯旋门（Gavi Arch）", desc: "车辆沿着主干道驶入商业街（Shophouse）区域。高达10米以上的凯旋门完美复刻了经典的法式建筑风格。" },
      { title: "龙梯（The Dragon Stairs）", desc: "位于The Center区域，拥有令人印象深刻的之字形坡道，两侧盛开着鲜艳的三角梅，其设计灵感源自著名的伦巴底街（Lombard Street）。" },
      { title: "米兰天门（Milan Sky Gate）及米兰街尽头", desc: "一条环绕山坡的蜿蜒道路。街道尽头设有天门，展现出壮丽的海景全景，并正对着高端会议中心。" },
      { title: "珍珠广场（灵活停靠）", desc: "车辆向下行驶至广场附近的海滨区域。如果允许停车，车辆将停靠在路边，供客人快速拍照3-5分钟。如果限制停车，车辆将摇下车窗缓慢行驶（20-30 km/h），让客人欣赏海滨广场的风景。" },
      { title: "送达：日落小镇内的指定地点", desc: "车辆将客人便捷地送达其心仪的海滨餐厅、咖啡馆、酒店或商业街（Shophouse），结束45分钟的游览。" },
    ],
  },
  ru: {
    eyebrow: "Маршрут",
    title: "Маршрут тура на багги по Закатному городу (Sunset Town)",
    note: "Расчетная продолжительность составляет 45 минут. Однако фактическое расписание будет гибко корректироваться в зависимости от того, сколько времени гости проведут за фотосъемкой в каждой локации.",
    stops: [
      { title: "Посадка: ваш отель (в пределах Sunset Town)", desc: "Автомобиль забирает гостей прямо из лобби их отеля на территории Sunset Town, откуда начинается тур." },
      { title: "Римский Колизей (станция канатной дороги Ан Тхой)", desc: "Первая остановка после выезда из отеля. Автомобиль паркуется на просторной площадке, чтобы гости могли с комфортом выйти и сфотографироваться на фоне величественных старинных каменных арок." },
      { title: "Триумфальная арка (Gavi Arch)", desc: "Автомобиль движется по главной дороге в район шопхаусов. Триумфальная арка высотой более 10 метров прекрасно воспроизводит классическую французскую архитектуру." },
      { title: "Лестница Дракона (The Dragon Stairs)", desc: "Расположена в секторе The Center и представляет собой впечатляющие зигзагообразные склоны, усаженные яркой бугенвиллеей, вдохновленные знаменитой улицей Ломбард-стрит." },
      { title: "Небесные врата Милана (Milan Sky Gate) и конец Миланской улицы", desc: "Извилистая дорога, огибающая склон холма. В конце улицы находятся Небесные врата, откуда открывается великолепный панорамный вид на море и прямой вид на премиальный Конференц-центр." },
      { title: "Жемчужная площадь (гибкая остановка)", desc: "Автомобиль спускается к пляжной зоне рядом с площадью. Если парковка разрешена, автомобиль останавливается у обочины, чтобы гости могли сделать быстрые фотографии в течение 3–5 минут. Если парковка ограничена, автомобиль едет медленно (20–30 km/h) с опущенными окнами, чтобы гости могли полюбоваться пейзажем приморской площади." },
      { title: "Высадка: по запросу в пределах Sunset Town", desc: "Автомобиль с комфортом доставляет гостей в выбранные ими прибрежные рестораны, кафе, отели или шопхаусы, завершая 45-минутный тур." },
    ],
  },
  ja: {
    eyebrow: "コース",
    title: "サンセットタウン・バギーコース",
    note: "所要時間は約45分です。ただし、各スポットでお客様が写真撮影に費やす時間に応じて、実際のスケジュールは柔軟に調整されます。",
    stops: [
      { title: "ピックアップ：ご宿泊ホテル（サンセットタウン内）", desc: "ツアー開始にあたり、サンセットタウンエリア内のホテルロビーまでお車で直接お迎えに上がります。" },
      { title: "ローマ・コロッセオ（アントイ・ケーブルカー駅）", desc: "ホテルを出発して最初の停車スポットです。広々としたスペースに駐車するため、ゆったりと車を降りて、壮大な古代の石造りアーチを背景に写真撮影をお楽しみいただけます。" },
      { title: "凱旋門（Gavi Arch）", desc: "メインストリートに沿ってショップハウスエリアへと進みます。高さ10メートルを超える凱旋門は、古典的なフランス建築を美しく再現しています。" },
      { title: "ドラゴン階段（The Dragon Stairs）", desc: "「The Center」セクターに位置し、有名なロンバード・ストリートからインスピレーションを得た、鮮やかなブーゲンビリアが並ぶ印象的なジグザグの坂道が特徴です。" },
      { title: "ミラノ・スカイゲート＆ミラノ通りの終点", desc: "丘の斜面に沿って続く曲がりくねった道です。通りの終点にはスカイゲートがあり、壮大な海のパノラマビューが広がり、正面にプレミアムなコンベンションセンターを望むことができます。" },
      { title: "パール広場（状況に応じた停車）", desc: "広場近くのビーチフロントエリアへと下ります。駐車が許可されている場合は、縁石の近くに停車し、3〜5分間の簡単な写真撮影をお楽しみいただけます。駐車が制限されている場合は、窓を開けてゆっくりと（20〜30 km/h）走行し、海辺の広場の景色をご覧いただきます。" },
      { title: "ドロップオフ：サンセットタウン内のご希望の場所", desc: "ご希望の海辺のレストラン、カフェ、ホテル、またはショップハウスまで快適にお送りし、45分間のツアーを終了します。" },
    ],
  },
  hi: {
    eyebrow: "कोर्स",
    title: "सनसेट टाउन बग्गी कोर्स",
    note: "अनुमानित समय 45 मिनट है। हालांकि, प्रत्येक स्थान पर मेहमानों द्वारा फोटो खींचने में बिताए गए समय के आधार पर वास्तविक समय-सारणी को लचीले ढंग से समायोजित किया जाएगा।",
    stops: [
      { title: "पिक-अप: आपका होटल (सनसेट टाउन में)", desc: "टूर शुरू करने के लिए कार सनसेट टाउन क्षेत्र के भीतर सीधे उनके होटल की लॉबी से मेहमानों को पिक करती है।" },
      { title: "रोमन कोलोसियम (आन थोई केबल कार स्टेशन)", desc: "होटल छोड़ने के बाद पहला स्टॉप। कार एक विशाल क्षेत्र में पार्क होती है ताकि मेहमान आराम से उतर सकें और भव्य, प्राचीन पत्थर के मेहराबों के साथ तस्वीरें ले सकें।" },
      { title: "आर्क डी ट्रायम्फ (Gavi Arch)", desc: "कार मुख्य सड़क से होते हुए शॉपहाउस क्षेत्र में जाती है। 10 मीटर से अधिक ऊंचा आर्क डी ट्रायम्फ, क्लासिक फ्रांसीसी वास्तुकला की खूबसूरती से नकल करता है।" },
      { title: "द ड्रैगन स्टेयर्स (The Dragon Stairs)", desc: "द सेंटर (The Center) सेक्टर में स्थित, इसमें प्रसिद्ध लोम्बार्ड स्ट्रीट से प्रेरित, जीवंत बोगनविलिया से कतारबद्ध प्रभावशाली ज़िगज़ैग ढलान हैं।" },
      { title: "मिलान स्काई गेट और मिलान स्ट्रीट का अंत", desc: "पहाड़ी से सटी एक घुमावदार सड़क। सड़क के अंत में स्काई गेट है, जो समुद्र का एक शानदार मनोरम दृश्य प्रस्तुत करता है और सीधे प्रीमियम कन्वेंशन सेंटर की ओर देखता है।" },
      { title: "पर्ल स्क्वायर (लचीला स्टॉप)", desc: "कार स्क्वायर के पास समुद्र तट क्षेत्र की ओर नीचे जाती है। यदि पार्किंग की अनुमति है, तो कार मेहमानों के लिए 3-5 मिनट के लिए त्वरित तस्वीरें लेने हेतु किनारे के करीब रुकती है। यदि पार्किंग प्रतिबंधित है, तो कार की खिड़कियां नीचे करके धीरे-धीरे (20-30 km/h) चलाया जाता है ताकि मेहमान समुद्र के किनारे के स्क्वायर के दृश्यों की सराहना कर सकें।" },
      { title: "ड्रॉप-ऑफ: सनसेट टाउन में अनुरोधित स्थान", desc: "कार 45 मिनट के टूर का समापन करते हुए, मेहमानों को उनके इच्छित समुद्र तटीय रेस्तरां, कैफे, होटल या शॉपहाउस पर सुविधाजनक रूप से छोड़ती है।" },
    ],
  },
}

const COPY: Partial<Record<Locale, BuggyCourseCopy>> = {
  ...TRANSLATED,
  en: EN,
  vi: VI,
}

export function getBuggyCourseCopy(locale: Locale): BuggyCourseCopy {
  return COPY[locale] ?? EN
}
