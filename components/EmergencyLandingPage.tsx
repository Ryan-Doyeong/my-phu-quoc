// Translations: 7개 국어 (ko, en, zh, ja, ru, hi, vi)
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CommonHelpSection } from '@/components/BookingServiceSections'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { NAV_ZONE_LABELS } from '@/lib/i18n/uiStrings'
import {
  PRIMARY_EMERGENCY_FACILITIES,
  REFERENCE_MAJOR_HOSPITALS,
  type EmergencyFacility,
  type FacilityKind,
} from '@/lib/emergencyFacilities'

interface EmergencyLandingPageProps {
  locale?: Locale
}

interface EmergencyCopy {
  activities: string
  itineraries: string
  breadcrumb: string
  mainNotice: string
  sectionTitle: string
  sectionSub: string
  travelTimeNoticeTitle: string
  travelTimeNoticeQuote: string
  travelTimeNoticeDetail: string
  groupHospitalClinic: string
  groupPharmacy: string
  kindLabels: Record<FacilityKind, string>
  formerNamePrefix: string
  addressLabel: string
  coordsLabel: string
  routeLabel: string
  hoursLabel: string
  phoneLabel: string
  emergencyBadgePrefix: string
  foreignLangBadgePrefix: string
  prosTitle: string
  cautionsTitle: string
  verifiedDateLabel: string
  photoOfficialBadge: string
  photoUnavailableTitle: string
  photoUnavailableDesc: string
  viewMapPhotosBtn: string
  callNowBtn: string
  directionsBtn: string
  mapPinBtn: string
  officialSiteBtn: string
  majorHospitalsTitle: string
  majorHospitalsSub: string
  consularTitle: string
  consularSub: string
  hotlinePolice: string
  hotlineFire: string
  hotlineAmbulance: string
  disclaimer: string
}

const COPY: Record<Locale, EmergencyCopy> = {
  ko: {
    activities: '액티비티',
    itineraries: '추천 테마 일정',
    breadcrumb: '긴급상황',
    mainNotice:
      '위급한 상황에서는 즉시 현지 긴급전화(115 구급차 · 113 경찰 · 114 소방) 또는 아래 의료기관으로 직접 전화하세요. 호텔에 머무르고 계신다면 프런트에도 알려 구급차 호출과 병원 안내 도움을 받으세요.',
    sectionTitle: '선셋타운·안터이 병원·의원·약국 안내',
    sectionSub:
      "선셋타운·안터이의 병원·의원·약국과 푸꾸옥 내 추가 병원을 안내합니다. 확인 수준과 현재 경로를 확인하고 방문 전 직접 연락해 주세요.",
    travelTimeNoticeTitle: '이동 시간 및 경로 안내',
    travelTimeNoticeQuote: '선셋타운 시계탑 출발 기준이며 교통 상황에 따라 달라질 수 있습니다.',
    travelTimeNoticeDetail:
      "2026-11-04 구글맵 자동차 경로를 직접 확인했습니다. 북측 도로의 현재 통행 가능 여부는 미확인이며, 지도에는 도로 폐쇄 우회 및 통행 제한·사유지 경고가 표시됩니다. 짧은 직결 경로 또는 10분 이내 병원 도착을 확정하지 않습니다. 출발 전 최신 경로와 현장 통행 여부를 기사·의료기관에 확인해 주세요.",
    groupHospitalClinic: "1. 선셋타운·안터이 병원 및 의원",
    groupPharmacy: "2. 선셋타운·안터이 약국",
    kindLabels: {
      hospital: '병원 (Hospital)',
      clinic: '의원·클리닉 (Clinic)',
      pharmacy: '약국 (Pharmacy)',
    },
    formerNamePrefix: '구 명칭 / 병기:',
    addressLabel: '주소 및 지도 핀',
    coordsLabel: '좌표',
    routeLabel: '자동차 경로 (거리·예상 소요 시간)',
    hoursLabel: '운영시간',
    phoneLabel: '전화번호',
    emergencyBadgePrefix: '응급진료 확인:',
    foreignLangBadgePrefix: '외국어 응대 확인:',
    prosTitle: '이용상 장점',
    cautionsTitle: '이용상 유의점',
    verifiedDateLabel: "정보 재검토 날짜",
    photoOfficialBadge: '공식 외관 사진 확인됨',
    photoUnavailableTitle: "지도에서 장소·사진 확인",
    photoUnavailableDesc:
      "재게시 사용 조건이 확인되지 않은 사진은 싣지 않았습니다. 아래 링크로 구글맵 장소를 열어 사진을 확인해 주세요.",
    viewMapPhotosBtn: '구글맵에서 외관·간판 사진 보기',
    callNowBtn: '전화하기',
    directionsBtn: '구글맵 길찾기',
    mapPinBtn: '지도 핀 보기',
    officialSiteBtn: '공식 안내 페이지',
    majorHospitalsTitle: "3. 푸꾸옥 내 추가 병원 안내",
    majorHospitalsSub:
      "선셋타운에서 거리가 있는 병원입니다. 각 기관의 응급진료 확인 수준과 이동 시간을 확인하고 직접 연락하세요.",
    consularTitle: '심각한 상황에서는 대사관·총영사관에 연락하세요',
    consularSub:
      '푸꾸옥(끼엔장성)은 호치민 주재 각국 총영사관 관할 구역입니다. 여권 분실·사건·사고 시 아래 직통 번호로 연락하세요.',
    hotlinePolice: '113 경찰',
    hotlineFire: '114 소방',
    hotlineAmbulance: '115 구급차',
    disclaimer: '응급 의료 판단과 조치는 현지 의료진 및 공식 기관의 안내를 따르시기 바랍니다.',
  },
  en: {
    activities: 'Activities',
    itineraries: 'Trip Planner',
    breadcrumb: 'Emergency',
    mainNotice:
      'In an emergency, call local emergency services immediately (115 Ambulance · 113 Police · 114 Fire) or call the medical facilities below directly. If staying at a hotel, also inform the front desk for help calling an ambulance or finding a hospital.',
    sectionTitle: 'Hospitals, Clinics & Pharmacies (Sunset Town · An Thoi)',
    sectionSub:
      "Find hospitals, clinics and pharmacies in Sunset Town and An Thoi, plus other hospitals on Phu Quoc. Check the verification notes and current route, and contact the facility before visiting.",
    travelTimeNoticeTitle: 'Travel Time & Route Notice',
    travelTimeNoticeQuote:
      'Based on departure from the Sunset Town Clock Tower and may vary depending on traffic conditions.',
    travelTimeNoticeDetail:
      "Driving routes were checked directly in Google Maps on 2026-11-04. North-road access remains unconfirmed; Maps shows closure detours and restricted-access/private-road warnings. A short direct route or hospital arrival within ten minutes is not confirmed. Check the latest route and access with your driver and the facility before departure.",
    groupHospitalClinic: "1. Hospitals and clinics in Sunset Town and An Thoi",
    groupPharmacy: "2. Pharmacies in Sunset Town and An Thoi",
    kindLabels: {
      hospital: 'Hospital',
      clinic: 'Clinic / Polyclinic',
      pharmacy: 'Pharmacy',
    },
    formerNamePrefix: 'Former / Known Name:',
    addressLabel: 'Address & Map Pin',
    coordsLabel: 'Coordinates',
    routeLabel: 'Driving Route (Distance & Estimated Time)',
    hoursLabel: 'Operating Hours',
    phoneLabel: 'Phone Number',
    emergencyBadgePrefix: 'Confirmed Emergency Care:',
    foreignLangBadgePrefix: 'Confirmed Language Support:',
    prosTitle: 'Advantages',
    cautionsTitle: 'Good to Know & Cautions',
    verifiedDateLabel: "Information reviewed",
    photoOfficialBadge: 'Official Exterior Photo Verified',
    photoUnavailableTitle: "View the place and photos on Maps",
    photoUnavailableDesc:
      "Photos without verified republication permission are not reproduced. Open the Google Maps place below to browse its photos.",
    viewMapPhotosBtn: 'View Exterior & Signboard Photos on Google Maps',
    callNowBtn: 'Call Now',
    directionsBtn: 'Google Maps Directions',
    mapPinBtn: 'View Map Pin',
    officialSiteBtn: 'Official Info Page',
    majorHospitalsTitle: "3. Other hospitals on Phu Quoc",
    majorHospitalsSub:
      "These hospitals are farther from Sunset Town. Check each facility’s emergency-care verification and journey time, and call directly.",
    consularTitle: 'For Serious Situations, Contact Your Embassy or Consulate',
    consularSub:
      'Phu Quoc (Kien Giang Province) falls under the jurisdiction of Consulates General in Ho Chi Minh City. Tap any number below to call directly.',
    hotlinePolice: '113 Police',
    hotlineFire: '114 Fire & Rescue',
    hotlineAmbulance: '115 Ambulance',
    disclaimer:
      'For emergency medical decisions and treatment, follow the guidance of local medical professionals and official authorities.',
  },
  zh: {
    activities: '活动体验',
    itineraries: '推荐主题行程',
    breadcrumb: '紧急情况',
    mainNotice:
      '遇到紧急情况，请立即拨打当地紧急救援电话（115 急救 · 113 报警 · 114 消防）或直接拨打下方医疗机构电话。如入住酒店，也请告知前台协助呼叫救护车或指引附近医院。',
    sectionTitle: '日落小镇与安泰区医院·诊所·药房指南',
    sectionSub:
      "以下介绍日落小镇、安泰的医院、诊所、药房及岛内其他医院。请查看核实说明及当前路线，并在到访前直接联系。",
    travelTimeNoticeTitle: '车程时间与路线说明',
    travelTimeNoticeQuote: '以日落小镇钟楼出发为准，实际时间可能因交通状况而异。',
    travelTimeNoticeDetail:
      "已于2026-11-04直接核查Google 地图驾车路线。北侧道路通行情况未确认，地图显示封路绕行及限行或私人道路警告。未确认可走短途直连路线或十分钟内到院。出发前请向司机及机构确认最新路线和通行情况。",
    groupHospitalClinic: "1. 日落小镇及安泰医院与诊所",
    groupPharmacy: "2. 日落小镇及安泰药房",
    kindLabels: {
      hospital: '医院 (Hospital)',
      clinic: '诊所·门诊 (Clinic)',
      pharmacy: '药房 (Pharmacy)',
    },
    formerNamePrefix: '曾用名 / 并称：',
    addressLabel: '地址与地图定位',
    coordsLabel: '坐标',
    routeLabel: '驾车路线（距离与预计时间）',
    hoursLabel: '营业时间',
    phoneLabel: '电话号码',
    emergencyBadgePrefix: '已确认急诊服务：',
    foreignLangBadgePrefix: '已确认外语服务：',
    prosTitle: '就诊优势',
    cautionsTitle: '注意事项',
    verifiedDateLabel: "信息复核日期",
    photoOfficialBadge: '已核实官方外观照片',
    photoUnavailableTitle: "在地图查看地点及照片",
    photoUnavailableDesc:
      "未转载使用许可未确认的照片。请打开下方Google 地图地点查看照片。",
    viewMapPhotosBtn: '在 Google 地图查看外观与招牌照片',
    callNowBtn: '拨打电话',
    directionsBtn: 'Google 地图导航',
    mapPinBtn: '查看地图定位',
    officialSiteBtn: '官方介绍页面',
    majorHospitalsTitle: "3. 富国岛其他医院",
    majorHospitalsSub:
      "这些医院距日落小镇较远，请查看各院急诊核实情况及车程，并直接致电。",
    consularTitle: '情况严重时，请联系本国大使馆或领事馆',
    consularSub:
      '富国岛（坚江省）属各国驻胡志明市总领事馆领区。如遇护照遗失或重大事故，请点击下方电话直接拨打。',
    hotlinePolice: '113 报警电话',
    hotlineFire: '114 消防救援',
    hotlineAmbulance: '115 急救电话',
    disclaimer: '涉及紧急医疗判断和处理时，请遵循当地医护人员及官方机构的指导。',
  },
  ja: {
    activities: 'アクティビティ',
    itineraries: 'テーマ別プラン',
    breadcrumb: '緊急時のご案内',
    mainNotice:
      '緊急時は、現地の緊急通報先（115 救急車・113 警察・114 消防）または下記の医療機関へ直接お電話ください。ホテルに滞在中の場合は、フロントにもお知らせいただくと救急車の手配や病院案内を受けやすくなります。',
    sectionTitle: 'サンセットタウン・アントイの病院・クリニック・薬局案内',
    sectionSub:
      "サンセットタウン・アントイの病院・クリニック・薬局と島内の追加病院をご案内します。確認状況と現在のルートを確認し、訪問前に直接連絡してください。",
    travelTimeNoticeTitle: '移動時間およびルートのご案内',
    travelTimeNoticeQuote: 'サンセットタウン時計塔出発基準であり、交通状況によって異なる場合があります。',
    travelTimeNoticeDetail:
      "2026-11-04にGoogleマップの車ルートを直接確認しました。北側道路の通行可否は未確認で、通行止め迂回・通行制限・私道の警告があります。短い直結ルートや10分以内の病院到着は確認できていません。出発前に運転手や施設へ最新ルートと通行状況を確認してください。",
    groupHospitalClinic: "1. サンセットタウン・アントイの病院・クリニック",
    groupPharmacy: "2. サンセットタウン・アントイの薬局",
    kindLabels: {
      hospital: '病院 (Hospital)',
      clinic: 'クリニック・医院 (Clinic)',
      pharmacy: '薬局 (Pharmacy)',
    },
    formerNamePrefix: '旧名称・併記:',
    addressLabel: '住所・マップピン',
    coordsLabel: '座標',
    routeLabel: '車での経路（距離・予想所要時間）',
    hoursLabel: '営業時間',
    phoneLabel: '電話番号',
    emergencyBadgePrefix: '救急診療の確認:',
    foreignLangBadgePrefix: '外国語対応の確認:',
    prosTitle: '利用上のメリット',
    cautionsTitle: '利用上の留意点',
    verifiedDateLabel: "Дата проверки сведений",
    photoOfficialBadge: '公式外観写真 確認済み',
    photoUnavailableTitle: "地図で施設・写真を確認",
    photoUnavailableDesc:
      "再掲載の使用条件を確認できない写真は掲載していません。下のGoogleマップの施設ページで写真をご確認ください。",
    viewMapPhotosBtn: 'Googleマップで外観・看板の写真を見る',
    callNowBtn: '電話をかける',
    directionsBtn: 'Googleマップ経路案内',
    mapPinBtn: '地図ピンを見る',
    officialSiteBtn: '公式案内ページ',
    majorHospitalsTitle: "3. フーコック島内のその他の病院",
    majorHospitalsSub:
      "サンセットタウンから距離があります。各施設の救急対応の確認状況と移動時間を確認し、直接電話してください。",
    consularTitle: '深刻な事態では大使館・総領事館にご連絡ください',
    consularSub:
      'フーコック島（キエンザン省）は在ホーチミン総領事館の管轄区域です。パスポート紛失や緊急時は以下の番号をタップして発信できます。',
    hotlinePolice: '113 警察',
    hotlineFire: '114 消防・救助',
    hotlineAmbulance: '115 救急車',
    disclaimer:
      '緊急時の医療上の判断や処置については、現地の医療従事者および公的機関の指示に従ってください。',
  },
  ru: {
    activities: 'Активности',
    itineraries: 'Маршруты',
    breadcrumb: 'Экстренная помощь',
    mainNotice:
      'В экстренной ситуации немедленно звоните в местные экстренные службы (115 Скорая · 113 Полиция · 114 Пожарная) или напрямую в медицинские учреждения ниже. Если вы остановились в отеле, сообщите на ресепшен для помощи с вызовом скорой.',
    sectionTitle: 'Больницы, клиники и аптеки (Сансет-Таун · Ан Тхой)',
    sectionSub:
      "Здесь указаны больницы, клиники и аптеки Сансет-Тауна и Антхоя, а также другие больницы острова. Проверьте примечания и маршрут и свяжитесь с учреждением заранее.",
    travelTimeNoticeTitle: 'Информация о времени в пути и маршрутах',
    travelTimeNoticeQuote:
      'Расчёт от Часовой башни Сансет-Тауна; время в пути может меняться в зависимости от дорожной обстановки.',
    travelTimeNoticeDetail:
      "Автомобильные маршруты проверены в Google Картах 2026-11-04. Проезд по северной дороге не подтверждён; показаны объезды закрытий и предупреждения об ограничениях или частных дорогах. Короткий прямой проезд и прибытие в больницу за десять минут не подтверждены. Перед выездом уточните маршрут у водителя и учреждения.",
    groupHospitalClinic: "1. Больницы и клиники Сансет-Тауна и Антхоя",
    groupPharmacy: "2. Аптеки Сансет-Тауна и Антхоя",
    kindLabels: {
      hospital: 'Больница (Hospital)',
      clinic: 'Клиника / поликлиника (Clinic)',
      pharmacy: 'Аптека (Pharmacy)',
    },
    formerNamePrefix: 'Прежнее / известное название:',
    addressLabel: 'Адрес и точка на карте',
    coordsLabel: 'Координаты',
    routeLabel: 'Маршрут на авто (расстояние и время)',
    hoursLabel: 'Часы работы',
    phoneLabel: 'Телефон',
    emergencyBadgePrefix: 'Подтверждённая неотложная помощь:',
    foreignLangBadgePrefix: 'Подтверждённая языковая поддержка:',
    prosTitle: 'Преимущества',
    cautionsTitle: 'Что важно учитывать',
    verifiedDateLabel: "情報再確認日",
    photoOfficialBadge: 'Официальное фото фасада подтверждено',
    photoUnavailableTitle: "Место и фотографии на карте",
    photoUnavailableDesc:
      "Фотографии без подтверждённого разрешения на перепубликацию не размещены. Откройте место на Google Картах, чтобы посмотреть фото.",
    viewMapPhotosBtn: 'Смотреть фото фасада и вывески в Google Картах',
    callNowBtn: 'Позвонить',
    directionsBtn: 'Маршрут в Google Картах',
    mapPinBtn: 'Точка на карте',
    officialSiteBtn: 'Официальная страница',
    majorHospitalsTitle: "3. Другие больницы Фукуока",
    majorHospitalsSub:
      "Эти больницы дальше от Сансет-Тауна. Проверьте подтверждение экстренной помощи и время в пути и позвоните напрямую.",
    consularTitle: 'В серьёзной ситуации свяжитесь с посольством или консульством',
    consularSub:
      'Остров Фукуок относится к консульскому округу Генеральных консульств в г. Хошимине. Нажмите на номер для вызова.',
    hotlinePolice: '113 Полиция',
    hotlineFire: '114 Пожарная охрана и спасатели',
    hotlineAmbulance: '115 Скорая помощь',
    disclaimer:
      'По вопросам экстренной медицинской помощи следуйте рекомендациям местных медицинских специалистов и официальных служб.',
  },
  hi: {
    activities: 'गतिविधियाँ',
    itineraries: 'यात्रा कार्यक्रम',
    breadcrumb: 'आपातकालीन सहायता',
    mainNotice:
      'आपात स्थिति में तुरंत स्थानीय आपातकालीन सेवा (115 एम्बुलेंस · 113 पुलिस · 114 अग्निशमन) या नीचे दिए गए चिकित्सा केंद्रों को सीधे कॉल करें। यदि आप होटल में ठहरे हैं, तो एम्बुलेंस या अस्पताल की जानकारी के लिए रिसेप्शन को भी सूचित करें।',
    sectionTitle: 'अस्पताल, क्लिनिक और फार्मेसी (सनसेट टाउन · आन थोई)',
    sectionSub:
      "सनसेट टाउन और अन थोई के अस्पताल, क्लिनिक और फ़ार्मेसी तथा द्वीप के अन्य अस्पताल यहाँ देखें। पुष्टि संबंधी जानकारी और वर्तमान मार्ग जाँचें और जाने से पहले सीधे संपर्क करें।",
    travelTimeNoticeTitle: 'यात्रा समय और मार्ग सूचना',
    travelTimeNoticeQuote:
      'यह समय सनसेट टाउन क्लॉक टॉवर से प्रस्थान पर आधारित है और यातायात की स्थिति के अनुसार बदल सकता है।',
    travelTimeNoticeDetail:
      "2026-11-04 को Google Maps में कार मार्ग सीधे जाँचे गए। उत्तरी सड़क पर आवागमन अपुष्ट है; Maps पर बंद सड़क के वैकल्पिक मार्ग और प्रतिबंधित या निजी सड़क की चेतावनियाँ हैं। छोटे सीधे मार्ग या दस मिनट में अस्पताल पहुँचने की पुष्टि नहीं है। निकलने से पहले चालक और संस्था से वर्तमान मार्ग की पुष्टि करें।",
    groupHospitalClinic: "1. सनसेट टाउन और अन थोई के अस्पताल और क्लिनिक",
    groupPharmacy: "2. सनसेट टाउन और अन थोई की फ़ार्मेसी",
    kindLabels: {
      hospital: 'अस्पताल (Hospital)',
      clinic: 'क्लिनिक / पॉलीक्लिनिक (Clinic)',
      pharmacy: 'फार्मेसी (Pharmacy)',
    },
    formerNamePrefix: 'पूर्व / प्रचलित नाम:',
    addressLabel: 'पता और मैप पिन',
    coordsLabel: 'निर्देशांक',
    routeLabel: 'कार मार्ग (दूरी और अनुमानित समय)',
    hoursLabel: 'खुलने का समय',
    phoneLabel: 'फ़ोन नंबर',
    emergencyBadgePrefix: 'पुष्ट आपातकालीन सेवा:',
    foreignLangBadgePrefix: 'पुष्ट विदेशी भाषा सहायता:',
    prosTitle: 'उपयोग के लाभ',
    cautionsTitle: 'ध्यान देने योग्य बातें',
    verifiedDateLabel: "जानकारी की समीक्षा",
    photoOfficialBadge: 'आधिकारिक बाहरी फ़ोटो सत्यापित',
    photoUnavailableTitle: "Maps पर स्थान और फ़ोटो देखें",
    photoUnavailableDesc:
      "पुनर्प्रकाशन की अनुमति अपुष्ट होने पर फ़ोटो यहाँ नहीं लगाई गई हैं। नीचे Google Maps का स्थान खोलकर फ़ोटो देखें।",
    viewMapPhotosBtn: 'Google Maps पर बाहरी और साइनबोर्ड फ़ोटो देखें',
    callNowBtn: 'कॉल करें',
    directionsBtn: 'Google Maps दिशा-निर्देश',
    mapPinBtn: 'मैप पिन देखें',
    officialSiteBtn: 'आधिकारिक वेबसाइट',
    majorHospitalsTitle: "3. फ़ू क्वोक के अन्य अस्पताल",
    majorHospitalsSub:
      "ये अस्पताल सनसेट टाउन से दूर हैं। प्रत्येक की आपातकालीन सेवा की पुष्टि और यात्रा का समय देखें और सीधे कॉल करें।",
    consularTitle: 'गंभीर स्थिति में अपने दूतावास या वाणिज्य दूतावास से संपर्क करें',
    consularSub:
      'फू क्वोक हो ची मिन्ह सिटी में स्थित महावाणिज्य दूतावासों के अधिकार क्षेत्र में आता है। कॉल करने के लिए नंबर पर टैप करें।',
    hotlinePolice: '113 पुलिस',
    hotlineFire: '114 अग्निशमन एवं बचाव',
    hotlineAmbulance: '115 एम्बुलेंस',
    disclaimer:
      'आपातकालीन चिकित्सा संबंधी निर्णयों और उपचार के लिए स्थानीय चिकित्सा विशेषज्ञों तथा आधिकारिक संस्थाओं के निर्देशों का पालन करें।',
  },
  vi: {
    activities: 'Hoạt động',
    itineraries: 'Lịch trình gợi ý',
    breadcrumb: 'Tình huống khẩn cấp',
    mainNotice:
      'Trong trường hợp khẩn cấp, hãy gọi ngay số điện thoại khẩn cấp tại địa phương (115 Cấp cứu · 113 Công an · 114 Cứu hỏa) hoặc gọi trực tiếp cho cơ sở y tế bên dưới. Nếu đang lưu trú tại khách sạn, hãy báo lễ tân để được hỗ trợ gọi xe cấp cứu và hướng dẫn bệnh viện gần nhất.',
    sectionTitle: 'Bệnh viện, Phòng khám & Nhà thuốc (Sunset Town · An Thới)',
    sectionSub:
      "Thông tin bệnh viện, phòng khám, nhà thuốc tại Thị trấn Hoàng Hôn, An Thới và các bệnh viện khác trên đảo. Xem ghi chú xác minh, tuyến đường hiện tại và liên hệ trực tiếp trước khi đến.",
    travelTimeNoticeTitle: 'Lưu ý về thời gian di chuyển và lộ trình',
    travelTimeNoticeQuote:
      'Tính từ điểm xuất phát Tháp Đồng Hồ Sunset Town và có thể thay đổi tùy theo tình hình giao thông.',
    travelTimeNoticeDetail:
      "Đã kiểm tra trực tiếp tuyến ô tô trên Google Maps ngày 2026-11-04. Chưa xác nhận khả năng lưu thông đường phía bắc; Maps hiển thị đường vòng tránh đường đóng và cảnh báo hạn chế hoặc đường riêng. Chưa xác nhận đường nối ngắn hay khả năng đến bệnh viện trong mười phút. Hỏi tài xế và cơ sở về tuyến hiện tại trước khi đi.",
    groupHospitalClinic: "1. Bệnh viện và phòng khám tại Thị trấn Hoàng Hôn, An Thới",
    groupPharmacy: "2. Nhà thuốc tại Thị trấn Hoàng Hôn, An Thới",
    kindLabels: {
      hospital: 'Bệnh viện (Hospital)',
      clinic: 'Phòng khám (Clinic)',
      pharmacy: 'Nhà thuốc (Pharmacy)',
    },
    formerNamePrefix: 'Tên cũ / thường gọi:',
    addressLabel: 'Địa chỉ & Ghim bản đồ',
    coordsLabel: 'Tọa độ',
    routeLabel: 'Lộ trình ô tô (Khoảng cách & Thời gian dự kiến)',
    hoursLabel: 'Giờ mở cửa',
    phoneLabel: 'Số điện thoại',
    emergencyBadgePrefix: 'Tiếp nhận cấp cứu đã xác nhận:',
    foreignLangBadgePrefix: 'Hỗ trợ ngoại ngữ đã xác nhận:',
    prosTitle: 'Ưu điểm khi sử dụng',
    cautionsTitle: 'Lưu ý khi sử dụng',
    verifiedDateLabel: "Ngày rà soát thông tin",
    photoOfficialBadge: 'Ảnh mặt tiền chính thức đã xác minh',
    photoUnavailableTitle: "Xem địa điểm và ảnh trên Maps",
    photoUnavailableDesc:
      "Không đăng lại ảnh khi chưa xác nhận quyền sử dụng. Mở địa điểm trên Google Maps bên dưới để xem ảnh.",
    viewMapPhotosBtn: 'Xem ảnh mặt tiền & biển hiệu trên Google Maps',
    callNowBtn: 'Gọi điện',
    directionsBtn: 'Chỉ đường Google Maps',
    mapPinBtn: 'Xem ghim bản đồ',
    officialSiteBtn: 'Trang thông tin chính thức',
    majorHospitalsTitle: "3. Các bệnh viện khác tại Phú Quốc",
    majorHospitalsSub:
      "Các bệnh viện này ở xa Thị trấn Hoàng Hôn hơn. Xem mức độ xác minh cấp cứu, thời gian di chuyển và gọi trực tiếp.",
    consularTitle: 'Trong tình huống nghiêm trọng, hãy liên hệ đại sứ quán hoặc lãnh sự quán',
    consularSub:
      'Phú Quốc (Kiên Giang) thuộc khu vực lãnh sự của các Tổng Lãnh sự quán tại TP. Hồ Chí Minh. Chạm vào số điện thoại để gọi trực tiếp.',
    hotlinePolice: '113 Công an',
    hotlineFire: '114 Cứu hỏa và cứu nạn',
    hotlineAmbulance: '115 Cấp cứu',
    disclaimer:
      'Đối với các quyết định và xử trí y tế khẩn cấp, vui lòng tuân theo hướng dẫn của nhân viên y tế địa phương và cơ quan chức năng.',
  },
}

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
      vi: '🇨🇳 Tổng Lãnh sự quán Trung Quốc tại TP.HCM',
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

  const primaryHospitalsAndClinics = PRIMARY_EMERGENCY_FACILITIES.filter(
    (item) => item.kind === 'hospital' || item.kind === 'clinic'
  )
  const primaryPharmacies = PRIMARY_EMERGENCY_FACILITIES.filter(
    (item) => item.kind === 'pharmacy'
  )

  const renderFacilityCard = (item: EmergencyFacility) => {
    const kindLabel = c.kindLabels[item.kind]
    const formerName = item.formerOrKnownName
      ? item.formerOrKnownName[locale] || item.formerOrKnownName.en || null
      : null
    const routeSummary = item.routeSummary[locale] || item.routeSummary.en
    const operatingHours = item.operatingHours[locale] || item.operatingHours.en
    const emergencyCare = item.emergencyCareConfirmed
      ? item.emergencyCareConfirmed[locale] || item.emergencyCareConfirmed.en
      : null
    const foreignLang = item.foreignLanguageConfirmed
      ? item.foreignLanguageConfirmed[locale] || item.foreignLanguageConfirmed.en
      : null
    const prosText = item.pros[locale] || item.pros.en
    const cautionsText = item.cautions[locale] || item.cautions.en
    const photoAttribution = item.photoAttribution
      ? item.photoAttribution[locale] || item.photoAttribution.en
      : null

    return (
      <article key={item.id} className="slotCard emergencyDetailCard">
        <div className="slotCardHeader emergencyCardHeaderRow">
          <span
            className={`slotBadge emergencyKindBadge emergencyKindBadge--${item.kind}`}
          >
            {kindLabel}
          </span>
          <span className="slotPlaceholderTag emergencyAreaTag">
            {c.verifiedDateLabel}: {item.verifiedAt}
          </span>
        </div>

        <h3 className="slotItemTitle emergencyOfficialTitle">{item.officialName}</h3>
        {formerName && (
          <p className="emergencyFormerNameNote">
            <strong>{c.formerNamePrefix}</strong> {formerName}
          </p>
        )}

        {/* Action Buttons — Direct Call FIRST per instructions */}
        <div className="slotBtnRow emergencyCardActionRow">
          <a href={`tel:${item.phoneTel}`} className="emergencyActionBtn emergencyActionBtn--call">
            📞 {c.callNowBtn} ({item.phoneDisplay})
          </a>
          <a
            href={item.googleMapsDirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="emergencyActionBtn emergencyActionBtn--dir"
          >
            🚗 {c.directionsBtn}
          </a>
          <a
            href={item.googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="emergencyActionBtn emergencyActionBtn--pin"
          >
            📍 {c.mapPinBtn}
          </a>
          {item.officialWebsiteUrl && (
            <a
              href={item.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="emergencyActionBtn emergencyActionBtn--web"
            >
              🔗 {c.officialSiteBtn}
            </a>
          )}
        </div>

        {/* Photo or Official Map Photo Link */}
        {item.officialPhotoUrl ? (
          <div className="emergencyPhotoWrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.officialPhotoUrl}
              alt={item.officialName}
              className="emergencyFacilityImg"
              loading="lazy"
            />
            <div className="emergencyPhotoCaption">
              <span className="emergencyPhotoVerifiedTag">✓ {c.photoOfficialBadge}</span>
              {photoAttribution && (
                <p className="emergencyPhotoSourceText">{photoAttribution}</p>
              )}
              <a
                href={item.googleMapsPhotosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="emergencyInlineMapPhotoLink"
              >
                📷 {c.viewMapPhotosBtn} ↗
              </a>
            </div>
          </div>
        ) : (
          <div className="emergencyPhotoFallbackBox">
            <div className="emergencyPhotoFallbackTitle">
              📷 {c.photoUnavailableTitle}
            </div>
            <p className="emergencyPhotoFallbackDesc">{c.photoUnavailableDesc}</p>
            <a
              href={item.googleMapsPhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="emergencyMapPhotoBtn"
            >
              📷 {c.viewMapPhotosBtn} ↗
            </a>
          </div>
        )}

        {/* Confirmed Emergency / Foreign Language Badges (only when verified) */}
        {(emergencyCare || foreignLang) && (
          <div className="emergencyVerifiedBadgesWrap">
            {emergencyCare && (
              <div className="emergencyConfirmedItem emergencyConfirmedItem--care">
                <strong>🚑 {c.emergencyBadgePrefix}</strong> {emergencyCare}
              </div>
            )}
            {foreignLang && (
              <div className="emergencyConfirmedItem emergencyConfirmedItem--lang">
                <strong>🌐 {c.foreignLangBadgePrefix}</strong> {foreignLang}
              </div>
            )}
          </div>
        )}

        <p className="emergencyInfoParagraph">{item.languageNote[locale]}</p>

        {/* Meta Info Table */}
        <div className="slotMetaList emergencyMetaList">
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.addressLabel}</span>
            <span className="slotMetaVal">
              {item.address}{' '}
              <span className="emergencyCoordsBadge">
                ({c.coordsLabel}: {item.lat}, {item.lng})
              </span>
            </span>
          </div>
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.routeLabel}</span>
            <span className="slotMetaVal emergencyRouteText">{routeSummary}<br />{item.routeEvidence[locale]}</span>
          </div>
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.hoursLabel}</span>
            <span className="slotMetaVal">{operatingHours}</span>
          </div>
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.phoneLabel}</span>
            <span className="slotMetaVal">
              <a href={`tel:${item.phoneTel}`} className="emergencyPhoneLink">
                {item.phoneDisplay}
              </a>
            </span>
          </div>
          <div className="slotMetaRow">
            <span className="slotMetaLabel">{c.verifiedDateLabel}</span>
            <span className="slotMetaVal">{item.verifiedAt}</span>
          </div>
        </div>

        {/* Pros & Cautions */}
        <div className="emergencyProsCautionsGrid">
          <div className="emergencyInfoSubBox emergencyInfoSubBox--pros">
            <h4 className="emergencyInfoSubTitle">✓ {c.prosTitle}</h4>
            <p className="emergencyInfoParagraph">{prosText}</p>
          </div>
          <div className="emergencyInfoSubBox emergencyInfoSubBox--cautions">
            <h4 className="emergencyInfoSubTitle">! {c.cautionsTitle}</h4>
            <p className="emergencyInfoParagraph">{cautionsText}</p>
          </div>
        </div>


      </article>
    )
  }

  return (
    <div className="emergencyPageRoot">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {NAV_ZONE_LABELS.sunset[locale] || NAV_ZONE_LABELS.sunset.en}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {NAV_ZONE_LABELS.khem[locale] || NAV_ZONE_LABELS.khem.en}
            </Link>
            <Link href={localePath(locale, '/activities')}>{c.activities}</Link>
            <Link href={localePath(locale, '/itineraries')}>{c.itineraries}</Link>
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
          <p className="mainNoticeText">{c.mainNotice}</p>
          <div className="emergencyQuickHotlineRow">
            <a href="tel:115" className="emergencyHotlinePill emergencyHotlinePill--ambulance">
              🚑 {c.hotlineAmbulance}
            </a>
            <a href="tel:113" className="emergencyHotlinePill emergencyHotlinePill--police">
              🚓 {c.hotlinePolice}
            </a>
            <a href="tel:114" className="emergencyHotlinePill emergencyHotlinePill--fire">
              🚒 {c.hotlineFire}
            </a>
          </div>
        </div>

        {/* ② 병원·의원·약국 찾기 (중심 영역) */}
        <section className="emergencyCentralSection">
          <h1 className="emergencySectionMainTitle">{c.sectionTitle}</h1>
          <p className="emergencySectionSubText">{c.sectionSub}</p>

          {/* 이동 시간 기준 안내 박스 */}
          <div className="emergencyTravelTimeNoticeBox">
            <div className="emergencyTravelTimeHeader">
              <span>🕒 {c.travelTimeNoticeTitle}:</span>{' '}
              <strong>“{c.travelTimeNoticeQuote}”</strong>
            </div>
            <p className="emergencyTravelTimeDetail">{c.travelTimeNoticeDetail}</p>
          </div>

          {/* 1) 선셋타운·안터이 병원 및 의원 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.groupHospitalClinic}</h2>
            <div className="emergencyCardStack">
              {primaryHospitalsAndClinics.map((item) => renderFacilityCard(item))}
            </div>
          </div>

          {/* 2) 선셋타운·안터이 약국 */}
          <div className="slotGroup">
            <h2 className="slotGroupTitle">{c.groupPharmacy}</h2>
            <div className="emergencyCardStack">
              {primaryPharmacies.map((item) => renderFacilityCard(item))}
            </div>
          </div>

          {/* 3) 별도 안내: 푸꾸옥 내 가장 가까운 확인된 24시간 종합병원 */}
          <div className="slotGroup emergencyReferenceGroup">
            <h2 className="slotGroupTitle">{c.majorHospitalsTitle}</h2>
            <p className="emergencyReferenceSub">{c.majorHospitalsSub}</p>
            <div className="emergencyCardStack">
              {REFERENCE_MAJOR_HOSPITALS.map((item) => renderFacilityCard(item))}
            </div>
          </div>

          {/* 조사 후 게시 제외 및 미확인 사항 안내 */}

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

        {/* ④ 공통 도움 안내 (의료기관 직접 전화 버튼들보다 하단에 배치) */}
        <CommonHelpSection locale={locale} />

        {/* ⑤ 하단 113/114/115 한 줄 자리 + 면책 문구 자리 */}
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
