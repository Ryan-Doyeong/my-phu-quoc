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
  excludedNoticeTitle: string
  excludedNoticeItems: string[]
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
      '선셋타운 시계탑(Clock Tower) 기준 자동차 약 10분 이내(실제 북측 출구 도로 기준)의 병원·의원·약국을 공식 정보와 교차 확인하여 안내합니다.',
    travelTimeNoticeTitle: '이동 시간 및 경로 안내',
    travelTimeNoticeQuote: '선셋타운 시계탑 출발 기준이며 교통 상황에 따라 달라질 수 있습니다.',
    travelTimeNoticeDetail:
      '선셋타운 내부 약국(Amalfi 67)은 차로 약 3분 거리이며, 선셋타운 북측 게이트(Đường Cáp Treo)·안터이 중심가 의료기관은 실제 도로 주행 시 약 4~10분(1.5~4.8km) 거리입니다. 단, 구글맵 자동 길찾기에서는 선셋타운 북측 게이트 일부 구간이 공사 통제로 표시되어 남측 우회로(ĐT 975 경유, 약 26~32분)로 계산될 수 있으니 각 카드의 두 경로 안내를 함께 확인해 주세요.',
    groupHospitalClinic: '1. 선셋타운·안터이 병원 및 의원 (자동차 약 4~7분 / 구글맵 우회 표기 병기)',
    groupPharmacy: '2. 선셋타운·안터이 약국 (자동차 약 3~10분)',
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
    verifiedDateLabel: '정보 확인 날짜',
    photoOfficialBadge: '공식 외관 사진 확인됨',
    photoUnavailableTitle: '공식 외관 사진 미확보 (지도 사진 링크 제공)',
    photoUnavailableDesc:
      '구글맵 이용자 사진을 무단으로 내려받아 재게시하지 않는 원칙에 따라, 실제 외관·간판·입구 사진은 아래 구글맵 사진 보기 링크에서 바로 확인하실 수 있습니다.',
    viewMapPhotosBtn: '구글맵에서 외관·간판 사진 보기',
    callNowBtn: '전화하기',
    directionsBtn: '구글맵 길찾기',
    mapPinBtn: '지도 핀 보기',
    officialSiteBtn: '공식 안내 페이지',
    majorHospitalsTitle: '3. [별도 안내] 구글맵 기준 확인된 24시간 종합병원·응급의료센터 (중증·야간 응급 대비)',
    majorHospitalsSub:
      '구글맵 자동 길찾기에서 선셋타운 북측 출구 공사 표기로 인해 안터이 병원이 26분 이상으로 안내되거나, 야간·중증 응급 처치가 필요한 경우를 대비해 푸꾸옥 내 공식 확인된 24시간 종합병원·의료센터를 별도로 안내합니다.',
    excludedNoticeTitle: '조사 후 게시에서 제외한 후보 및 미확인 사항 안내',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới: 현재 동일 주소(S259-S354, Sun Grand City New An Thới)에서 "Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới"로 명칭이 변경되어 운영 중임을 교차 확인하여 현행 공식 명칭(구 명칭 병기)으로 게시했습니다.',
      'Nhà thuốc Amalfi 65 (선셋타운 내): 구글맵에 핀이 존재하나 전화번호·운영시간·공식 운영 여부가 확인되지 않아 게시에서 제외했습니다 (바로 옆 Amalfi 67 약국 이용 권장).',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới: 구글맵상 전화번호·운영시간·실제 외관 및 진료 여부가 공식 확인되지 않아 게시에서 제외했습니다.',
      '의원·약국의 응급진료 및 외국어 상시 통역 여부: 공식 출처에서 확인되지 않은 사항은 추정하여 표기하지 않았습니다.',
    ],
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
      'Cross-verified hospitals, clinics, and pharmacies within ~10 minutes by car from the Sunset Town Clock Tower (via direct road).',
    travelTimeNoticeTitle: 'Travel Time & Route Notice',
    travelTimeNoticeQuote:
      'Based on departure from the Sunset Town Clock Tower and may vary depending on traffic conditions.',
    travelTimeNoticeDetail:
      'Pharmacy Amalfi 67 inside Sunset Town is ~3 minutes by car, and medical facilities at the Sunset Town North Gate (Đường Cáp Treo) and An Thới town are ~4–10 minutes (1.5–4.8 km) by direct road. Note that Google Maps auto-routing currently flags a short road-work segment at the North Gate and may calculate a southern detour via ĐT 975 (~26–32 min); both figures are shown on each card.',
    groupHospitalClinic: '1. Hospitals & Clinics Near Sunset Town · An Thới (~4–7 min direct road)',
    groupPharmacy: '2. Pharmacies Near Sunset Town · An Thới (~3–10 min by car)',
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
    verifiedDateLabel: 'Verified Date',
    photoOfficialBadge: 'Official Exterior Photo Verified',
    photoUnavailableTitle: 'Official Exterior Photo Not Held (Map Photo Link Provided)',
    photoUnavailableDesc:
      'In compliance with copyright rules against downloading and reposting Google Maps user photos without permission, you can view real exterior, storefront, and entrance photos directly via the Google Maps photo link below.',
    viewMapPhotosBtn: 'View Exterior & Signboard Photos on Google Maps',
    callNowBtn: 'Call Now',
    directionsBtn: 'Google Maps Directions',
    mapPinBtn: 'View Map Pin',
    officialSiteBtn: 'Official Info Page',
    majorHospitalsTitle: '3. [Separate Guide] Closest Confirmed 24/7 Major Hospitals in Phu Quoc',
    majorHospitalsSub:
      'Provided separately in case Google Maps routes around the North Gate construction (26+ min) or if 24-hour / severe emergency hospital care is required.',
    excludedNoticeTitle: 'Excluded Candidates & Unconfirmed Items',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới: Cross-verified that the clinic at S259-S354, Sun Grand City New An Thới now operates under the name "Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới" (listed above with its former name noted).',
      'Nhà thuốc Amalfi 65 (Sunset Town): Excluded because phone number, operating hours, and active operation could not be verified (use Pharmacy Amalfi 67 next door).',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới: Excluded due to unverified phone numbers, hours, and active clinical status.',
      'Emergency care and foreign-language interpretation at clinics/pharmacies: Only officially confirmed capabilities are badged; unconfirmed items are never assumed.',
    ],
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
      '为您整理从日落小镇钟楼（Clock Tower）出发约10分钟车程内（按实际道路）并经官方渠道交叉核实的医院、诊所与药房信息。',
    travelTimeNoticeTitle: '车程时间与路线说明',
    travelTimeNoticeQuote: '以日落小镇钟楼出发为准，实际时间可能因交通状况而异。',
    travelTimeNoticeDetail:
      '日落小镇内部药房（Amalfi 67）车程约3分钟；北侧出口（Đường Cáp Treo）及安泰镇医疗机构按实际主干道行驶约4~10分钟（1.5~4.8公里）。由于 Google 地图自动导航目前将北门一小段道路标记为施工管制，可能会按南侧绕行路线（经 ĐT 975，约26~32分钟）计算，每张卡片均同时标明两种数据供参考。',
    groupHospitalClinic: '1. 日落小镇·安泰区医院与诊所（实际车程约4~7分钟）',
    groupPharmacy: '2. 日落小镇·安泰区药房（车程约3~10分钟）',
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
    verifiedDateLabel: '信息核实日期',
    photoOfficialBadge: '已核实官方外观照片',
    photoUnavailableTitle: '暂无官方授权外观照片（提供地图照片链接）',
    photoUnavailableDesc:
      '为严格遵守不擅自下载及转载 Google 地图用户上传照片的原则，您可通过下方链接直接在 Google 地图查看实景外观、招牌与入口照片。',
    viewMapPhotosBtn: '在 Google 地图查看外观与招牌照片',
    callNowBtn: '拨打电话',
    directionsBtn: 'Google 地图导航',
    mapPinBtn: '查看地图定位',
    officialSiteBtn: '官方介绍页面',
    majorHospitalsTitle: '3. 【另行说明】富国岛已核实24小时综合医院与急诊中心',
    majorHospitalsSub:
      '针对 Google 地图绕行显示超过10分钟，或需要夜间及重症急诊救治的情况，另行提供富国岛内已确认的24小时综合医院信息。',
    excludedNoticeTitle: '经调查未收录的候选地点与未确认事项说明',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới：经交叉核实，同一地址（S259-S354, Sun Grand City New An Thới）现以“Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới”名称运营，已按现行官方名称（附注曾用名）发布。',
      'Nhà thuốc Amalfi 65（日落小镇内）：地图虽有定位，但无电话、营业时间及营业状态确认，故不予收录（建议使用相邻的 Amalfi 67 药房）。',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới：因缺少电话号码、营业时间及官方核实信息，未予收录。',
      '普通诊所及药房的急诊与外语服务：凡未经官方渠道确认的信息均不做推测标注。',
    ],
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
      'サンセットタウン時計塔（Clock Tower）から車で約10分以内（実道路基準）の病院・クリニック・薬局を公式情報と照合して掲載しています。',
    travelTimeNoticeTitle: '移動時間およびルートのご案内',
    travelTimeNoticeQuote: 'サンセットタウン時計塔出発基準であり、交通状況によって異なる場合があります。',
    travelTimeNoticeDetail:
      'サンセットタウン内の薬局（Amalfi 67）は車で約3分、北側ゲート（Đường Cáp Treo）・アントイ中心部の医療機関は実道路で約4〜10分（1.5〜4.8km）です。ただしGoogleマップの自動ルート検索では現在、北側ゲートの一部区間が工事規制と表示され南側迂回ルート（ĐT 975経由、約26〜32分）で算出される場合があるため、両方の数値を併記しています。',
    groupHospitalClinic: '1. サンセットタウン・アントイの病院・クリニック（実道路 約4〜7分）',
    groupPharmacy: '2. サンセットタウン・アントイの薬局（車で約3〜10分）',
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
    verifiedDateLabel: '情報確認日',
    photoOfficialBadge: '公式外観写真 確認済み',
    photoUnavailableTitle: '公式外観写真 未保有（地図写真リンクを提供）',
    photoUnavailableDesc:
      'Googleマップのユーザー投稿写真を無断転載しない方針に基づき、外観・看板・入口の写真は以下のGoogleマップ写真リンクから直接ご確認いただけます。',
    viewMapPhotosBtn: 'Googleマップで外観・看板の写真を見る',
    callNowBtn: '電話をかける',
    directionsBtn: 'Googleマップ経路案内',
    mapPinBtn: '地図ピンを見る',
    officialSiteBtn: '公式案内ページ',
    majorHospitalsTitle: '3. 【別枠案内】フーコック島内の確認済み24時間総合病院・救急医療センター',
    majorHospitalsSub:
      'Googleマップで北側ゲート工事により迂回案内（26分以上）となる場合や、夜間・重症救急が必要な場合に備え、島内で確認された24時間総合病院を別枠でご案内します。',
    excludedNoticeTitle: '調査後に掲載から除外した候補および未確認事項',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới：同一住所（S259-S354, Sun Grand City New An Thới）にて現在「Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới」として運営されていることを確認し、現行の公式名称（旧名称併記）で掲載しました。',
      'Nhà thuốc Amalfi 65（サンセットタウン内）：電話番号・営業時間・営業実態が確認できないため掲載から除外しました（隣のAmalfi 67薬局をご利用ください）。',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới：電話番号・営業時間・公式情報が確認できないため掲載から除外しました。',
      'クリニック・薬局の救急診療および外国語対応：公式情報で確認できた項目のみ表示し、未確認の事項は推測で記載していません。',
    ],
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
      'Проверенные больницы, клиники и аптеки в пределах ~10 минут езды на автомобиле от Часовой башни Сансет-Тауна (по прямой дороге).',
    travelTimeNoticeTitle: 'Информация о времени в пути и маршрутах',
    travelTimeNoticeQuote:
      'Расчёт от Часовой башни Сансет-Тауна; время в пути может меняться в зависимости от дорожной обстановки.',
    travelTimeNoticeDetail:
      'Аптека Amalfi 67 внутри Сансет-Тауна находится в ~3 минутах езды, а медучреждения у северных ворот (Đường Cáp Treo) и в районе Ан Тхой — в ~4–10 минутах (1,5–4,8 км) по прямой дороге. Поскольку автопрокладка Google Карт сейчас отмечает короткий участок у северных ворот как закрытый на ремонт, навигатор может строить южный объезд через ĐT 975 (~26–32 мин); в карточках указаны оба значения.',
    groupHospitalClinic: '1. Больницы и клиники (Сансет-Таун · Ан Тхой, ~4–7 мин по прямой дороге)',
    groupPharmacy: '2. Аптеки (Сансет-Таун · Ан Тхой, ~3–10 мин на авто)',
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
    verifiedDateLabel: 'Дата проверки информации',
    photoOfficialBadge: 'Официальное фото фасада подтверждено',
    photoUnavailableTitle: 'Официальное фото фасада отсутствует (доступна ссылка на фото в картах)',
    photoUnavailableDesc:
      'Мы не скачиваем и не публикуем пользовательские фотографии из Google Карт без разрешения. Реальные фото фасада, вывески и входа можно посмотреть по прямой ссылке ниже.',
    viewMapPhotosBtn: 'Смотреть фото фасада и вывески в Google Картах',
    callNowBtn: 'Позвонить',
    directionsBtn: 'Маршрут в Google Картах',
    mapPinBtn: 'Точка на карте',
    officialSiteBtn: 'Официальная страница',
    majorHospitalsTitle: '3. [Отдельная справка] Ближайшие подтверждённые круглосуточные больницы Фукуока',
    majorHospitalsSub:
      'Информация о крупных круглосуточных больницах острова на случай ночного обращения, серьёзных неотложных состояний или объездного маршрута в Google Картах.',
    excludedNoticeTitle: 'Исключённые из списка кандидаты и неподтверждённые данные',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới: по этому же адресу (S259-S354, Sun Grand City New An Thới) сейчас работает клиника под названием «Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới» (указана выше с пометкой прежнего названия).',
      'Nhà thuốc Amalfi 65 (Сансет-Таун): исключена из-за отсутствия подтверждённого телефона и часов работы (рекомендуем соседнюю аптеку Amalfi 67).',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới: исключены из-за отсутствия подтверждённых телефонов, часов работы и официальных данных.',
      'Экстренная помощь и иностранные языки в клиниках и аптеках: указаны только официально подтверждённые сведения.',
    ],
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
      'सनसेट टाउन क्लॉक टॉवर से कार द्वारा लगभग 10 मिनट के भीतर (सीधी सड़क मार्ग से) सत्यापित अस्पताल, क्लिनिक और दवा की दुकानें।',
    travelTimeNoticeTitle: 'यात्रा समय और मार्ग सूचना',
    travelTimeNoticeQuote:
      'यह समय सनसेट टाउन क्लॉक टॉवर से प्रस्थान पर आधारित है और यातायात की स्थिति के अनुसार बदल सकता है।',
    travelTimeNoticeDetail:
      'सनसेट टाउन के अंदर फार्मेसी (Amalfi 67) कार से ~3 मिनट की दूरी पर है, और नॉर्थ गेट (Đường Cáp Treo) व आन थोई क्षेत्र के चिकित्सा केंद्र सीधी सड़क से ~4–10 मिनट (1.5–4.8 किमी) की दूरी पर हैं। चूँकि Google Maps ऑटो-रूटिंग वर्तमान में नॉर्थ गेट के पास सड़क निर्माण दिखाता है, इसलिए वह दक्षिण की ओर ĐT 975 से (~26–32 मिनट) लंबा मार्ग दिखा सकता है; प्रत्येक कार्ड में दोनों जानकारी दी गई है।',
    groupHospitalClinic: '1. सनसेट टाउन · आन थोई के अस्पताल और क्लिनिक (~4–7 मिनट सीधी सड़क)',
    groupPharmacy: '2. सनसेट टाउन · आन थोई की फार्मेसी (~3–10 मिनट कार द्वारा)',
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
    verifiedDateLabel: 'जानकारी सत्यापन तिथि',
    photoOfficialBadge: 'आधिकारिक बाहरी फ़ोटो सत्यापित',
    photoUnavailableTitle: 'आधिकारिक बाहरी फ़ोटो उपलब्ध नहीं (मैप फ़ोटो लिंक दिया गया है)',
    photoUnavailableDesc:
      'Google Maps उपयोगकर्ताओं की फ़ोटो को बिना अनुमति डाउनलोड कर पुनः पोस्ट न करने की नीति के अनुसार, आप नीचे दिए गए लिंक से सीधे बाहरी इमारत, साइनबोर्ड और प्रवेश द्वार की फ़ोटो देख सकते हैं।',
    viewMapPhotosBtn: 'Google Maps पर बाहरी और साइनबोर्ड फ़ोटो देखें',
    callNowBtn: 'कॉल करें',
    directionsBtn: 'Google Maps दिशा-निर्देश',
    mapPinBtn: 'मैप पिन देखें',
    officialSiteBtn: 'आधिकारिक वेबसाइट',
    majorHospitalsTitle: '3. [अलग जानकारी] फू क्वोक के निकटतम पुष्ट 24/7 प्रमुख अस्पताल',
    majorHospitalsSub:
      'यदि रात्रि कालीन या गंभीर आपातकालीन उपचार की आवश्यकता हो, या Google Maps डायवर्जन 10 मिनट से अधिक दिखाए, तो फू क्वोक के पुष्ट 24 घंटे चलने वाले प्रमुख अस्पताल नीचे दिए गए हैं।',
    excludedNoticeTitle: 'जाँच के बाद सूची से हटाए गए स्थान और अपुष्ट विवरण',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới: सत्यापन में पाया गया कि इसी पते (S259-S354, Sun Grand City New An Thới) पर अब "Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới" नाम से क्लिनिक संचालित है (पूर्व नाम सहित ऊपर सूचीबद्ध)।',
      'Nhà thuốc Amalfi 65 (सनसेट टाउन): फ़ोन नंबर और खुलने का समय सत्यापित न होने के कारण सूची से हटाया गया (बगल में स्थित Amalfi 67 फार्मेसी का उपयोग करें)।',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới: फ़ोन नंबर, समय और संचालन की आधिकारिक पुष्टि न होने के कारण हटाया गया।',
      'आपातकालीन देखभाल और विदेशी भाषा सहायता: केवल आधिकारिक रूप से पुष्ट जानकारी ही दर्शाई गई है।',
    ],
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
      'Danh sách bệnh viện, phòng khám và nhà thuốc trong khoảng 10 phút đi ô tô từ Tháp Đồng Hồ Sunset Town (theo trục đường thực tế), đã được đối chiếu với thông tin chính thức.',
    travelTimeNoticeTitle: 'Lưu ý về thời gian di chuyển và lộ trình',
    travelTimeNoticeQuote:
      'Tính từ điểm xuất phát Tháp Đồng Hồ Sunset Town và có thể thay đổi tùy theo tình hình giao thông.',
    travelTimeNoticeDetail:
      'Nhà thuốc Amalfi 67 trong nội khu Sunset Town cách khoảng 3 phút đi xe; các cơ sở y tế tại cổng Bắc Sunset Town (Đường Cáp Treo) và trung tâm An Thới cách khoảng 4–10 phút (1,5–4,8 km) theo đường thực tế. Lưu ý: chỉ đường tự động trên Google Maps hiện gắn cờ rào chắn công trường tại một đoạn ngắn ở cổng Bắc nên có thể tính lộ trình vòng phía Nam qua ĐT 975 (~26–32 phút); cả hai thông tin đều được ghi rõ trên từng thẻ.',
    groupHospitalClinic: '1. Bệnh viện & Phòng khám gần Sunset Town · An Thới (~4–7 phút đường thực tế)',
    groupPharmacy: '2. Nhà thuốc gần Sunset Town · An Thới (~3–10 phút đi ô tô)',
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
    verifiedDateLabel: 'Ngày xác minh thông tin',
    photoOfficialBadge: 'Ảnh mặt tiền chính thức đã xác minh',
    photoUnavailableTitle: 'Chưa có ảnh mặt tiền chính thức (Cung cấp liên kết xem ảnh bản đồ)',
    photoUnavailableDesc:
      'Tuân thủ nguyên tắc không tự ý tải xuống và đăng lại ảnh do người dùng Google Maps tải lên, bạn có thể xem trực tiếp ảnh mặt tiền, biển hiệu và lối vào qua liên kết Google Maps bên dưới.',
    viewMapPhotosBtn: 'Xem ảnh mặt tiền & biển hiệu trên Google Maps',
    callNowBtn: 'Gọi điện',
    directionsBtn: 'Chỉ đường Google Maps',
    mapPinBtn: 'Xem ghim bản đồ',
    officialSiteBtn: 'Trang thông tin chính thức',
    majorHospitalsTitle: '3. [Hướng dẫn riêng] Bệnh viện đa khoa & Trung tâm y tế trực cấp cứu 24/24 tại Phú Quốc',
    majorHospitalsSub:
      'Thông tin riêng về các bệnh viện tuyến chính trực cấp cứu 24/24 trên đảo Phú Quốc để dự phòng trường hợp cấp cứu ban đêm, ca nặng hoặc khi lộ trình Google Maps báo绕 đường trên 10 phút.',
    excludedNoticeTitle: 'Các địa điểm loại khỏi danh sách sau khảo sát & thông tin chưa xác minh',
    excludedNoticeItems: [
      'Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới: Đã đối chiếu tại cùng địa chỉ (S259-S354, Sun Grand City New An Thới) hiện hoạt động với tên chính thức "Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới" (đã đăng ở trên kèm ghi chú tên cũ).',
      'Nhà thuốc Amalfi 65 (trong Sunset Town): Có ghim trên bản đồ nhưng không có số điện thoại, giờ mở cửa và xác nhận hoạt động nên loại khỏi danh sách (khuyến khích dùng Nhà thuốc Amalfi 67 kế bên).',
      'An Thoi Polyclinics (120 ĐT46) / Phòng khám 30/4 An Thới: Không xác minh được số điện thoại, giờ mở cửa và tình trạng hoạt động chính thức nên không đăng tải.',
      'Khả năng cấp cứu và hỗ trợ ngoại ngữ tại phòng khám/nhà thuốc: Chỉ hiển thị các thông tin đã được xác nhận chính thức, tuyệt đối không suy đoán.',
    ],
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
            <span className="slotMetaVal emergencyRouteText">{routeSummary}</span>
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
          <div className="emergencyExcludedBox">
            <h3 className="emergencyExcludedTitle">ℹ️ {c.excludedNoticeTitle}</h3>
            <ul className="emergencyBulletList">
              {c.excludedNoticeItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
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
