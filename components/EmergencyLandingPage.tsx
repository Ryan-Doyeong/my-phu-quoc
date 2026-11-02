// Translations: 7개 국어 (ko, en, zh, ja, ru, hi, vi) ChatGPT 원어민 전수 검수 완료 (2026-11-02)
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { NAV_ZONE_LABELS } from '@/lib/i18n/uiStrings'

interface EmergencyLandingPageProps {
  locale?: Locale
}

interface EmergencyCopy {
  activities: string
  itineraries: string
  breadcrumb: string
  mainNotice: string
  sectionTitle: string
  hospital: string
  pharmacy: string
  address: string
  phone: string
  callNowBtn: string
  detailBtn: string
  googleMapsBtn: string
  verifiedTag: string
  consularTitle: string
  consularSub: string
  phoneLabel: string
  hotlinePolice: string
  hotlineFire: string
  hotlineAmbulance: string
  disclaimer: string
}

const COPY: Record<string, EmergencyCopy> = {
  ko: {
    activities: '액티비티',
    itineraries: '추천 테마 일정',
    breadcrumb: '긴급상황',
    mainNotice: '위급한 상황에서는 즉시 현지 긴급전화(115 구급차 · 113 경찰 · 114 소방)로 연락하세요. 호텔에 머무르고 계신다면 프런트에도 알려 주세요. 구급차 호출과 가까운 병원 안내를 도와드릴 수 있습니다.',
    sectionTitle: '선셋타운·안터이 병원·약국 찾기',
    hospital: '병원·의원',
    pharmacy: '약국',
    address: '주소',
    phone: '전화',
    callNowBtn: '전화 걸기',
    detailBtn: '상세 정보',
    googleMapsBtn: '구글맵 보기',
    verifiedTag: '위치·연락처 확인됨',
    consularTitle: '심각한 상황에서는 대사관·총영사관에 연락하세요',
    consularSub: '푸꾸옥(끼엔장성)은 호치민 주재 각국 총영사관 관할 구역입니다. 여권 분실·사건·사고 시 아래 직통 번호로 연락하세요.',
    phoneLabel: '긴급 연락처',
    hotlinePolice: '113 경찰',
    hotlineFire: '114 소방',
    hotlineAmbulance: '115 구급차',
    disclaimer: '응급 의료 판단과 조치는 현지 의료진 및 공식 기관의 안내를 따르시기 바랍니다.',
  },
  en: {
    activities: 'Activities',
    itineraries: 'Trip Planner',
    breadcrumb: 'Emergency',
    mainNotice: "In an emergency, call local emergency services immediately (115 Ambulance · 113 Police · 114 Fire). If you're staying at a hotel, also inform the front desk. Staff can help arrange an ambulance and direct you to a nearby hospital.",
    sectionTitle: 'Find Hospitals & Pharmacies (Sunset Town · An Thoi)',
    hospital: 'Hospital / Clinic',
    pharmacy: 'Pharmacy',
    address: 'Address',
    phone: 'Phone',
    callNowBtn: 'Call Now',
    detailBtn: 'Details',
    googleMapsBtn: 'Google Maps',
    verifiedTag: 'Verified Info',
    consularTitle: 'For Serious Situations, Contact Your Embassy or Consulate',
    consularSub: 'Phu Quoc (Kien Giang Province) falls under the jurisdiction of Consulates General in Ho Chi Minh City. Tap any number below to call directly.',
    phoneLabel: 'Phone Number',
    hotlinePolice: '113 Police',
    hotlineFire: '114 Fire & Rescue',
    hotlineAmbulance: '115 Ambulance',
    disclaimer: 'For emergency medical decisions and treatment, follow the guidance of local medical professionals and official authorities.',
  },
  zh: {
    activities: '活动体验',
    itineraries: '推荐主题行程',
    breadcrumb: '紧急情况',
    mainNotice: '遇到紧急情况，请立即拨打当地紧急救援电话（115 急救 · 113 报警 · 114 消防）。如果您入住酒店，也请告知前台。工作人员可协助呼叫救护车并提供附近医院的信息。',
    sectionTitle: '查找日落小镇与安泰区医院和药店',
    hospital: '医院 / 诊所',
    pharmacy: '药店',
    address: '地址',
    phone: '电话',
    callNowBtn: '立即拨打',
    detailBtn: '查看详情',
    googleMapsBtn: 'Google 地图',
    verifiedTag: '已核实信息',
    consularTitle: '情况严重时，请联系本国大使馆或领事馆',
    consularSub: '富国岛（坚江省）属各国驻胡志明市总领事馆领区。如遇护照遗失或重大事故，请点击下方电话直接拨打。',
    phoneLabel: '电话号码',
    hotlinePolice: '113 报警电话',
    hotlineFire: '114 消防救援',
    hotlineAmbulance: '115 急救电话',
    disclaimer: '涉及紧急医疗判断和处理时，请遵循当地医护人员及官方机构的指导。',
  },
  ja: {
    activities: 'アクティビティ',
    itineraries: 'テーマ別プラン',
    breadcrumb: '緊急時のご案内',
    mainNotice: '緊急時は、まず現地の緊急通報先（115 救急車・113 警察・114 消防）にご連絡ください。ホテルに滞在中の場合は、フロントにもお知らせください。救急車の手配や近隣の病院のご案内をお手伝いできる場合があります。',
    sectionTitle: 'サンセットタウン・アントイの病院・薬局を探す',
    hospital: '病院・クリニック',
    pharmacy: '薬局',
    address: '住所',
    phone: '電話',
    callNowBtn: '電話をかける',
    detailBtn: '詳細を見る',
    googleMapsBtn: 'Google マップ',
    verifiedTag: '確認済み',
    consularTitle: '深刻な事態では大使館・総領事館にご連絡ください',
    consularSub: 'フーコック島（キエンザン省）は在ホーチミン総領事館の管轄区域です。パスポート紛失や緊急時は以下の番号をタップして発信できます。',
    phoneLabel: '電話番号',
    hotlinePolice: '113 警察',
    hotlineFire: '114 消防・救助',
    hotlineAmbulance: '115 救急車',
    disclaimer: '緊急時の医療上の判断や処置については、現地の医療従事者および公的機関の指示に従ってください。',
  },
  ru: {
    activities: 'Активности',
    itineraries: 'Маршруты',
    breadcrumb: 'Экстренная помощь',
    mainNotice: 'В экстренной ситуации немедленно позвоните в местную службу экстренной помощи (115 Скорая · 113 Полиция · 114 Пожарная). Если вы остановились в отеле, также сообщите на стойку регистрации.',
    sectionTitle: 'Больницы и аптеки (Сансет-Таун · Ан Тхой)',
    hospital: 'Больница / Клиника',
    pharmacy: 'Аптека',
    address: 'Адрес',
    phone: 'Телефон',
    callNowBtn: 'Позвонить',
    detailBtn: 'Подробнее',
    googleMapsBtn: 'Google Карты',
    verifiedTag: 'Проверено',
    consularTitle: 'В серьёзной ситуации свяжитесь с посольством или консульством',
    consularSub: 'Остров Фукуок относится к консульскому округу Генеральных консульств в г. Хошимине. Нажмите на номер для вызова.',
    phoneLabel: 'Номер телефона',
    hotlinePolice: '113 Полиция',
    hotlineFire: '114 Пожарная охрана и спасатели',
    hotlineAmbulance: '115 Скорая помощь',
    disclaimer: 'По вопросам экстренной медицинской помощи следуйте рекомендациям местных медицинских специалистов и официальных служб.',
  },
  hi: {
    activities: 'गतिविधियाँ',
    itineraries: 'यात्रा कार्यक्रम',
    breadcrumb: 'आपातकालीन सहायता',
    mainNotice: 'आपात स्थिति में तुरंत स्थानीय आपातकालीन सेवा (115 एम्बुलेंस · 113 पुलिस · 114 अग्निशमन) को कॉल करें। यदि आप किसी होटल में ठहरे हैं, तो रिसेप्शन को भी सूचित करें।',
    sectionTitle: 'अस्पताल और दवा की दुकानें खोजें (सनसेट टाउन · आन थोई)',
    hospital: 'अस्पताल / क्लिनिक',
    pharmacy: 'दवा की दुकान',
    address: 'पता',
    phone: 'फ़ोन',
    callNowBtn: 'कॉल करें',
    detailBtn: 'विवरण',
    googleMapsBtn: 'Google Maps',
    verifiedTag: 'सत्यापित',
    consularTitle: 'गंभीर स्थिति में अपने दूतावास या वाणिज्य दूतावास से संपर्क करें',
    consularSub: 'फू क्वोक हो ची मिन्ह सिटी में स्थित महावाणिज्य दूतावासों के अधिकार क्षेत्र में आता है। कॉल करने के लिए नंबर पर टैप करें।',
    phoneLabel: 'फ़ोन नंबर',
    hotlinePolice: '113 पुलिस',
    hotlineFire: '114 अग्निशमन एवं बचाव',
    hotlineAmbulance: '115 एम्बुलेंस',
    disclaimer: 'आपातकालीन चिकित्सा संबंधी निर्णयों और उपचार के लिए स्थानीय चिकित्सा विशेषज्ञों तथा आधिकारिक संस्थाओं के निर्देशों का पालन करें।',
  },
  vi: {
    activities: 'Hoạt động',
    itineraries: 'Lịch trình gợi ý',
    breadcrumb: 'Tình huống khẩn cấp',
    mainNotice: 'Trong trường hợp khẩn cấp, hãy gọi ngay số điện thoại khẩn cấp tại địa phương (115 Cấp cứu · 113 Công an · 114 Cứu hỏa). Nếu đang lưu trú tại khách sạn, bạn cũng nên thông báo cho lễ tân.',
    sectionTitle: 'Tìm bệnh viện và nhà thuốc (Sunset Town · An Thới)',
    hospital: 'Bệnh viện / Phòng khám',
    pharmacy: 'Nhà thuốc',
    address: 'Địa chỉ',
    phone: 'Điện thoại',
    callNowBtn: 'Gọi ngay',
    detailBtn: 'Chi tiết',
    googleMapsBtn: 'Google Maps',
    verifiedTag: 'Đã xác minh',
    consularTitle: 'Trong tình huống nghiêm trọng, hãy liên hệ đại sứ quán hoặc lãnh sự quán',
    consularSub: 'Phú Quốc (Kiên Giang) thuộc khu vực lãnh sự của các Tổng Lãnh sự quán tại TP. Hồ Chí Minh. Chạm vào số điện thoại để gọi trực tiếp.',
    phoneLabel: 'Số điện thoại',
    hotlinePolice: '113 Công an',
    hotlineFire: '114 Cứu hỏa và cứu nạn',
    hotlineAmbulance: '115 Cấp cứu',
    disclaimer: 'Đối với các quyết định và xử trí y tế khẩn cấp, vui lòng tuân theo hướng dẫn của nhân viên y tế địa phương và cơ quan chức năng.',
  },
}

interface EmergencyFacility {
  id: string
  slug: string
  name: Record<Locale, string>
  areaTag: Record<Locale, string>
  address: string
  phoneDisplay: string
  phoneTel: string
  googleMapsUrl: string
}

const HOSPITALS: EmergencyFacility[] = [
  {
    id: 'sun-hospital',
    slug: 'sun-international-hospital-phu-quoc',
    name: {
      ko: '썬 국제 병원 푸꾸옥 (Sun International Hospital)',
      en: 'Sun International Hospital Phu Quoc',
      vi: 'Bệnh viện Quốc tế Mặt Trời Phú Quốc (Sun Hospital)',
      zh: '富国岛太阳国际医院 (Sun International Hospital)',
      ja: 'サン国際病院フーコック (Sun International Hospital)',
      ru: 'Международный госпиталь Sun Phu Quoc',
      hi: 'सन इंटरनेशनल हॉस्पिटल फू क्वोक',
    },
    areaTag: {
      ko: '안터이 · 선셋타운 인접',
      en: 'An Thoi · Near Sunset Town',
      vi: 'An Thới · Gần Sunset Town',
      zh: '安泰区 · 邻近日落小镇',
      ja: 'アントイ・サンセットタウン隣接',
      ru: 'Ан Тхой · Рядом с Сансет-Таун',
      hi: 'आन थोई · सनसेट टाउन के पास',
    },
    address: 'Khu Đô thị An Thới, Khu phố 6, Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 297 3898 888',
    phoneTel: '+842973898888',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJY8WHWACVpzERqhosrS9_k48',
  },
  {
    id: 'dng-clinic',
    slug: 'phong-kham-a-khoa-quoc-te-dng-co-so-an-thoi-phu-quoc',
    name: {
      ko: 'DNG 국제 종합 클리닉 안터이 (DNG Polyclinic)',
      en: 'DNG International Polyclinic - An Thoi',
      vi: 'Phòng Khám Đa Khoa Quốc Tế DNG - Cơ Sở An Thới',
      zh: 'DNG 国际综合诊所（安泰分院）',
      ja: 'DNG国際総合クリニック・アントイ',
      ru: 'Международная поликлиника DNG — Ан Тхой',
      hi: 'DNG इंटरनेशनल पॉलीक्लिनिक - आन थोई',
    },
    areaTag: {
      ko: '뉴 안터이 (선셋타운 입구)',
      en: 'New An Thoi (Gateway)',
      vi: 'New An Thới',
      zh: '新安泰区',
      ja: 'ニュー・アントイ',
      ru: 'Нью Ан Тхой',
      hi: 'न्यू आन थोई',
    },
    address: 'S259-S354, Sun Grand City New An Thới, Phú Quốc, Kiên Giang',
    phoneDisplay: '1900 3315',
    phoneTel: '19003315',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJU2YY86iWpzERfGNTGD1eM6Q',
  },
  {
    id: 'sos-clinic',
    slug: 'phong-kham-a-khoa-sos-an-thoi-phu-quoc',
    name: {
      ko: 'SOS 안터이 종합의원 (SOS An Thoi Clinic)',
      en: 'SOS An Thoi Polyclinic Phu Quoc',
      vi: 'Phòng khám đa khoa SOS An Thới Phú Quốc',
      zh: 'SOS 安泰综合诊所 (SOS Polyclinic)',
      ja: 'SOSアントイ総合クリニック',
      ru: 'Поликлиника SOS Ан Тхой',
      hi: 'SOS आन थोई पॉलीक्लिनिक',
    },
    areaTag: {
      ko: '안터이 중심가 (응우옌반끄 거리)',
      en: 'An Thoi Center (Nguyen Van Cu St)',
      vi: 'Trung tâm An Thới (Đ. Nguyễn Văn Cừ)',
      zh: '安泰中心（阮文渠街）',
      ja: 'アントイ中心部（グエン・ヴァン・クー通り）',
      ru: 'Центр Ан Тхой (ул. Нгуен Ван Кы)',
      hi: 'आन थोई सेंटर',
    },
    address: '243 Đ. Nguyễn Văn Cừ, Khu 3, An Thới, Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 328 219 764',
    phoneTel: '+84328219764',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJt4aBPTKXpzERXxwyYMJ_UEs',
  },
]

const PHARMACIES: EmergencyFacility[] = [
  {
    id: 'amalfi-pharmacy',
    slug: 'nha-thuoc-amalfi-67-sunset-town-pharmacy-амальфи-67-аптека',
    name: {
      ko: '아말피 67 선셋타운 약국 (Pharmacy Amalfi 67)',
      en: 'Pharmacy Amalfi 67 Sunset Town',
      vi: 'Nhà thuốc Amalfi 67 Sunset Town',
      zh: '日落小镇 Amalfi 67 药房',
      ja: 'アマルフィ67 サンセットタウン薬局',
      ru: 'Аптека Amalfi 67 Sunset Town',
      hi: 'अमाल्फी 67 सनसेट टाउन फार्मेसी',
    },
    areaTag: {
      ko: '선셋타운 내 (아말피 거리)',
      en: 'Inside Sunset Town (Amalfi St)',
      vi: 'Trong Sunset Town (Đường Amalfi)',
      zh: '日落小镇内（阿马尔菲街）',
      ja: 'サンセットタウン内（アマルフィ通り）',
      ru: 'Внутри Сансет-Таун (ул. Амальфи)',
      hi: 'सनसेट टाउन के अंदर (अमाल्फी स्ट्रीट)',
    },
    address: 'Căn Amalfi 67, Sunset Town, An Thới, Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 868 681 994',
    phoneTel: '+84868681994',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8',
  },
  {
    id: 'fpt-long-chau',
    slug: 'nha-thuoc-fpt-long-chau',
    name: {
      ko: 'FPT 롱쩌우 약국 안터이점 (FPT Long Chau)',
      en: 'FPT Long Chau Pharmacy An Thoi',
      vi: 'Nhà Thuốc FPT Long Châu - An Thới',
      zh: 'FPT 龙洲连锁药房（安泰店）',
      ja: 'FPTロンチャウ薬局 アントイ店',
      ru: 'Аптека FPT Long Chau — Ан Тхой',
      hi: 'FPT लॉन्ग चाऊ फार्मेसी - आन थोई',
    },
    areaTag: {
      ko: '안터이 중심가 (대형 체인 약국)',
      en: 'An Thoi (Major Pharmacy Chain)',
      vi: 'An Thới (Chuỗi nhà thuốc lớn)',
      zh: '安泰区（越南大型连锁药房）',
      ja: 'アントイ（大手チェーン薬局）',
      ru: 'Ан Тхой (крупная сеть аптек)',
      hi: 'आन थोई (प्रमुख फार्मेसी चेन)',
    },
    address: '46 Đ. Nguyễn Văn Cừ, An Thới, Phú Quốc, Kiên Giang',
    phoneDisplay: '1800 6928',
    phoneTel: '18006928',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U',
  },
  {
    id: 'an-khang-pharmacy',
    slug: 'nha-thuoc-an-khang-kp3-p-an-thoi',
    name: {
      ko: '안캉 약국 안터이점 (An Khang Pharmacy)',
      en: 'An Khang Pharmacy An Thoi',
      vi: 'Nhà thuốc An Khang - Khu phố 3, An Thới',
      zh: '安康连锁药房（安泰店）',
      ja: 'アンカン薬局 アントイ店',
      ru: 'Аптека An Khang — Ан Тхой',
      hi: 'आन खांग फार्मेसी - आन थोई',
    },
    areaTag: {
      ko: '안터이 중심가 (응우옌반끄 거리)',
      en: 'An Thoi (Nguyen Van Cu St)',
      vi: 'An Thới (Đ. Nguyễn Văn Cừ)',
      zh: '安泰区（阮文渠街）',
      ja: 'アントイ（グエン・ヴァン・クー通り）',
      ru: 'Ан Тхой (ул. Нгуен Ван Кы)',
      hi: 'आन थोई (गुयेन वान कू स्ट्रीट)',
    },
    address: 'Đ. Nguyễn Văn Cừ, Khu phố 3, An Thới, Phú Quốc, Kiên Giang',
    phoneDisplay: '1900 1572',
    phoneTel: '19001572',
    googleMapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU',
  },
]

interface ConsularContact {
  id: string
  label: Record<Locale, string>
  phoneDisplay: string
  phoneTel: string
  extraDisplay?: string
  extraTel?: string
}

const CONSULAR_CONTACTS: ConsularContact[] = [
  {
    id: 'kr',
    label: {
      ko: '🇰🇷 주호치민 대한민국 총영사관 / 영사콜센터(24시간)',
      en: '🇰🇷 Consulate General of the Republic of Korea in HCMC / 24h Call Center',
      vi: '🇰🇷 Tổng Lãnh sự quán Hàn Quốc tại TP.HCM',
      zh: '🇰🇷 大韩民国驻胡志明市总领事馆',
      ja: '🇰🇷 在ホーチミン大韓民国総領事館',
      ru: '🇰🇷 Генконсульство Республики Корея в Хошимине',
      hi: '🇰🇷 कोरिया गणराज्य का महावाणिज्य दूतावास (HCMC)',
    },
    phoneDisplay: '+84 28 3822 5757',
    phoneTel: '+842838225757',
    extraDisplay: '+82 2 3210 0404 (24h)',
    extraTel: '+82232100404',
  },
  {
    id: 'us',
    label: {
      ko: '🇺🇸 주호치민 미국 총영사관 (U.S. Consulate General HCMC)',
      en: '🇺🇸 U.S. Consulate General in Ho Chi Minh City',
      vi: '🇺🇸 Tổng Lãnh sự quán Hoa Kỳ tại TP.HCM',
      zh: '🇺🇸 美国驻胡志明市总领事馆',
      ja: '🇺🇸 在ホーチミン米国総領事館',
      ru: '🇺🇸 Генконсульство США в Хошимине',
      hi: '🇺🇸 अमेरिकी महावाणिज्य दूतावास (HCMC)',
    },
    phoneDisplay: '+84 28 3520 4200',
    phoneTel: '+842835204200',
  },
  {
    id: 'cn',
    label: {
      ko: '🇨🇳 주호치민 중국 총영사관 (中国驻胡志明市总领事馆)',
      en: '🇨🇳 Consulate General of China in Ho Chi Minh City',
      vi: '🇨🇷 Tổng Lãnh sự quán Trung Quốc tại TP.HCM',
      zh: '🇨🇳 中国驻胡志明市总领事馆（领事保护）',
      ja: '🇨🇳 在ホーチミン中国総領事館',
      ru: '🇨🇳 Генконсульство КНР в Хошимине',
      hi: '🇨🇳 चीन का महावाणिज्य दूतावास (HCMC)',
    },
    phoneDisplay: '+84 28 3829 2459',
    phoneTel: '+842838292459',
  },
  {
    id: 'jp',
    label: {
      ko: '🇯🇵 주호치민 일본 총영사관 (在ホーチミン日本国総領事館)',
      en: '🇯🇵 Consulate General of Japan in Ho Chi Minh City',
      vi: '🇯🇵 Tổng Lãnh sự quán Nhật Bản tại TP.HCM',
      zh: '🇯🇵 日本驻胡志明市总领事馆',
      ja: '🇯🇵 在ホーチミン日本国総領事館',
      ru: '🇯🇵 Генконсульство Японии в Хошимине',
      hi: '🇯🇵 जापान का महावाणिज्य दूतावास (HCMC)',
    },
    phoneDisplay: '+84 28 3933 3510',
    phoneTel: '+842839333510',
  },
  {
    id: 'ru',
    label: {
      ko: '🇷🇺 주호치민 러시아 총영사관 (Генконсульство России)',
      en: '🇷🇺 Consulate General of Russia in Ho Chi Minh City',
      vi: '🇷🇺 Tổng Lãnh sự quán Nga tại TP.HCM',
      zh: '🇷🇺 俄罗斯驻胡志明市总领事馆',
      ja: '🇷🇺 在ホーチミン・ロシア総領事館',
      ru: '🇷🇺 Генеральное консульство России в Хошимине',
      hi: '🇷🇺 रूस का महावाणिज्य दूतावास (HCMC)',
    },
    phoneDisplay: '+84 28 3930 3936',
    phoneTel: '+842839303936',
  },
  {
    id: 'in',
    label: {
      ko: '🇮🇳 주호치민 인도 총영사관 (Consulate General of India)',
      en: '🇮🇳 Consulate General of India in Ho Chi Minh City',
      vi: '🇮🇳 Tổng Lãnh sự quán Ấn Độ tại TP.HCM',
      zh: '🇮🇳 印度驻胡志明市总领事馆',
      ja: '🇮🇳 在ホーチミン・インド総領事館',
      ru: '🇮🇳 Генконсульство Индии в Хошимине',
      hi: '🇮🇳 भारत का महावाणिज्य दूतावास (हो ची मिन्ह सिटी)',
    },
    phoneDisplay: '+84 28 3744 2400',
    phoneTel: '+842837442400',
  },
]

export function EmergencyLandingPage({ locale = 'en' }: EmergencyLandingPageProps) {
  const dict = getDictionary(locale)
  const c = COPY[locale] || COPY.en

  const renderFacilityCard = (item: EmergencyFacility, categoryLabel: string) => {
    const title = item.name[locale] || item.name.en
    const area = item.areaTag[locale] || item.areaTag.en
    return (
      <div key={item.id} className="slotCard">
        <div className="slotCardHeader">
          <span className="slotBadge">{categoryLabel}</span>
          <span
            className="slotPlaceholderTag"
            style={{
              backgroundColor: '#E6F4F1',
              color: '#0B7A8A',
              fontWeight: 700,
            }}
          >
            {area}
          </span>
        </div>
        <h3 className="slotItemTitle">
          <Link
            href={localePath(locale, `/business/${item.slug}`)}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {title}
          </Link>
        </h3>
        <div className="slotMetaList">
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.address}</span>
            <span className="slotMetaVal">{item.address}</span>
          </div>
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.phone}</span>
            <span className="slotMetaVal">
              <a
                href={`tel:${item.phoneTel}`}
                style={{
                  color: '#0B7A8A',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                {item.phoneDisplay}
              </a>
            </span>
          </div>
        </div>
        <div className="slotBtnRow" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a
            href={`tel:${item.phoneTel}`}
            className="slotMapBtn"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C86D2D',
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: 8,
              padding: '10px 12px',
              minHeight: 42,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            📞 {c.callNowBtn}
          </a>
          <a
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="slotMapBtn"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0B7A8A',
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: 8,
              padding: '10px 12px',
              minHeight: 42,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            📍 {c.googleMapsBtn}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="emergencyPageRoot">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {NAV_ZONE_LABELS.sunset[locale] || NAV_ZONE_LABELS.sunset.en}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {NAV_ZONE_LABELS.khem[locale] || NAV_ZONE_LABELS.khem.en}
            </Link>
            <Link href={localePath(locale, '/activities')}>
              {c.activities}
            </Link>
            <Link href={localePath(locale, '/itineraries')}>
              {c.itineraries}
            </Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container */}
      <main className="emergencyContainer">
        {/* Breadcrumb */}
        <div className="emergencyBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{c.breadcrumb}</span>
        </div>

        {/* ① 호텔 프런트 안내 박스 & 즉시 전화 버튼 */}
        <div className="emergencyMainNoticeBox">
          <p className="mainNoticeText">
            {c.mainNotice}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 14,
            }}
          >
            <a
              href="tel:115"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 999,
                backgroundColor: '#DC2626',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              🚑 {c.hotlineAmbulance}
            </a>
            <a
              href="tel:113"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 999,
                backgroundColor: '#0B7A8A',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              🚓 {c.hotlinePolice}
            </a>
            <a
              href="tel:114"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 999,
                backgroundColor: '#C86D2D',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              🚒 {c.hotlineFire}
            </a>
          </div>
        </div>

        {/* ② 병원·약국 찾기 (중심 영역) */}
        <section className="emergencyCentralSection">
          <h1 className="emergencySectionMainTitle">{c.sectionTitle}</h1>

          {/* 1) 병원 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.hospital}</h2>
            <div className="slotGrid3">
              {HOSPITALS.map((item) => renderFacilityCard(item, c.hospital))}
            </div>
          </div>

          {/* 2) 약국 슬롯 3개 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.pharmacy}</h2>
            <div className="slotGrid3">
              {PHARMACIES.map((item) => renderFacilityCard(item, c.pharmacy))}
            </div>
          </div>
        </section>

        {/* ③ 심각한 상황이면 영사관 박스 */}
        <section className="emergencyConsularBox">
          <h2 className="consularBoxTitle">{c.consularTitle}</h2>
          <p style={{ fontSize: '0.88rem', color: '#475569', margin: '0 0 14px', lineHeight: 1.5 }}>
            {c.consularSub}
          </p>
          <div className="consularSlotContent" style={{ display: 'grid', gap: 10 }}>
            {CONSULAR_CONTACTS.map((con) => (
              <div
                key={con.id}
                className="consularRow"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 8,
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <span className="consularLabel" style={{ fontWeight: 600, color: '#1E293B' }}>
                  {con.label[locale] || con.label.en}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                  <a
                    href={`tel:${con.phoneTel}`}
                    className="consularValue"
                    style={{
                      color: '#0B7A8A',
                      fontWeight: 700,
                      textDecoration: 'underline',
                    }}
                  >
                    📞 {con.phoneDisplay}
                  </a>
                  {con.extraDisplay && con.extraTel ? (
                    <a
                      href={`tel:${con.extraTel}`}
                      className="consularValue"
                      style={{
                        color: '#C86D2D',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                    >
                      📞 {con.extraDisplay}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ④ 하단 113/114/115 한 줄 자리 + 면책 문구 자리 */}
        <div className="emergencyBottomWrap">
          <div className="emergencyHotlineSingleLine">
            <a href="tel:113" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 700 }}>
              {c.hotlinePolice}
            </a>
            <span className="dotDivider">·</span>
            <a href="tel:114" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 700 }}>
              {c.hotlineFire}
            </a>
            <span className="dotDivider">·</span>
            <a href="tel:115" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 700 }}>
              {c.hotlineAmbulance}
            </a>
          </div>
          <div className="emergencyDisclaimerLine">
            <span>{c.disclaimer}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
