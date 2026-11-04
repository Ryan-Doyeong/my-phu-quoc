import type { Locale } from '@/lib/i18n/config'

export type FacilityKind = 'hospital' | 'clinic' | 'pharmacy'

export interface EmergencyFacility {
  id: string
  kind: FacilityKind
  officialName: string
  formerOrKnownName?: Partial<Record<Locale, string>>
  address: string
  phoneDisplay: string
  phoneTel: string
  placeId: string
  lat: number
  lng: number
  googleMapsPlaceUrl: string
  googleMapsDirUrl: string
  googleMapsPhotosUrl: string
  officialWebsiteUrl?: string
  verifiedAt: string
  /** Direct road distance/time via Sunset Town North Gate + Google Maps detour note */
  routeSummary: Record<Locale, string>
  operatingHours: Record<Locale, string>
  /** Only populated when officially confirmed */
  emergencyCareConfirmed?: Record<Locale, string>
  /** Only populated when officially confirmed */
  foreignLanguageConfirmed?: Record<Locale, string>
  /** Official photo path if available & permitted; otherwise null (renders Google Maps photo link) */
  officialPhotoUrl: string | null
  photoAttribution?: Record<Locale, string>
  pros: Record<Locale, string>
  cautions: Record<Locale, string>
}

export const CLOCK_TOWER_ORIGIN = '10.0292527,104.0074202'

export const PRIMARY_EMERGENCY_FACILITIES: EmergencyFacility[] = [
  {
    id: 'sun-international-hospital',
    kind: 'hospital',
    officialName: 'Bệnh viện Quốc tế Mặt Trời Phú Quốc',
    formerOrKnownName: {
      ko: '썬 국제병원 푸꾸옥 (Sun Group International Hospital)',
      en: 'Sun Group International Hospital Phu Quoc',
      zh: '富国岛太阳国际医院 (Sun Group International Hospital)',
      ru: 'Международная больница Sun Group Фукуок',
      ja: 'サングループ国際病院フーコック (Sun Group International Hospital)',
      hi: 'सन ग्रुप इंटरनेशनल हॉस्पिटल फ़ू क्वोक',
      vi: 'Sun Group International Hospital Phú Quốc',
    },
    address: 'Khu đô thị An Thới, Khu phố 6, Phường An Thới, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 297 3898 888',
    phoneTel: '+842973898888',
    placeId: 'ChIJY8WHWACVpzERqhosrS9_k48',
    lat: 10.0388989,
    lng: 104.0067145,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJY8WHWACVpzERqhosrS9_k48',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0388989,104.0067145&destination_place_id=ChIJY8WHWACVpzERqhosrS9_k48&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJY8WHWACVpzERqhosrS9_k48',
    officialWebsiteUrl: 'https://sunmedicare.com/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '직결 도로 약 1.5 km · 차량 약 4~5분 (선셋타운 북문 기준 600 m · 2분 / 구글맵 북문 공사 우회 표시 시 ĐT 975 경유 6.4 km · 약 26분)',
      en: 'Direct road ~1.5 km · ~4–5 min by car (600 m · 2 min from Sunset Town North Gate / Google Maps detour around north-gate roadwork shows 6.4 km · ~26 min via ĐT 975)',
      zh: '直连道路约 1.5 公里 · 车程约 4~5 分钟（距日落小镇北门 600 米 · 2 分钟 / 谷歌地图避开北门施工标记时显示绕行 ĐT 975 约 6.4 公里 · 26 分钟）',
      ru: 'Прямая дорога ~1,5 км · ~4–5 мин на авто (600 м · 2 мин от северных ворот Сансет-Тауна / при объезде перекрытия на Google Картах: 6,4 км · ~26 мин через ĐT 975)',
      ja: '直結道路 約1.5 km・車で約4〜5分（サンセットタウン北門から600 m・2分／Googleマップの北門工事迂回表示時はĐT 975経由 6.4 km・約26分）',
      hi: 'सीधी सड़क ~1.5 किमी · कार से ~4–5 मिनट (सनसेट टाउन नॉर्थ गेट से 600 मीटर · 2 मिनट / Google Maps निर्माण डायवर्जन दिखने पर ĐT 975 होकर 6.4 किमी · ~26 मिनट)',
      vi: 'Đường nối trực tiếp khoảng 1,5 km · khoảng 4–5 phút đi ô tô (cách cổng bắc Sunset Town 600 m · 2 phút / nếu Google Maps dẫn đường vòng tránh rào chắn công trường qua ĐT 975: 6,4 km · khoảng 26 phút)',
    },
    operatingHours: {
      ko: '24시간 영업 (응급·소생·해독과 24/7 운영 · 외래 진료과는 주간 운영)',
      en: 'Open 24 hours (24/7 Emergency & Resuscitation Dept. · Outpatient clinics operate daytime hours)',
      zh: '24小时营业（急诊复苏与解毒科 24/7 全天开放 · 门诊科室日间开放）',
      ru: 'Круглосуточно 24/7 (отделение неотложной помощи и реанимации 24/7 · амбулаторные кабинеты — днём)',
      ja: '24時間営業（救急・蘇生・解毒科 24時間対応 · 外来診療科は日中営業）',
      hi: '24 घंटे खुला (आपातकालीन और पुनर्जीवन विभाग 24/7 · ओपीडी दिन के समय)',
      vi: 'Mở cửa 24 giờ (Khoa Hồi sức cấp cứu và chống độc 24/7 · Các khoa khám ngoại trú làm việc ban ngày)',
    },
    emergencyCareConfirmed: {
      ko: '응급진료 확인됨: 24/7 응급·소생·해독과 운영 (공식 웹사이트 확인)',
      en: 'Confirmed: 24/7 Emergency, Resuscitation & Toxicology Department (verified via official website)',
      zh: '已确认急诊服务：设有 24/7 急诊复苏与解毒科（官方网站核实）',
      ru: 'Экстренная помощь подтверждена: круглосуточное отделение реанимации и неотложной помощи 24/7 (по данным официального сайта)',
      ja: '救急診療確認済：24時間救急・蘇生・解毒科を運営（公式サイトにて確認）',
      hi: 'आपातकालीन चिकित्सा पुष्ट: 24/7 इमरजेंसी और रिससिटेशन विभाग (आधिकारिक वेबसाइट द्वारा सत्यापित)',
      vi: 'Đã xác nhận cấp cứu: Khoa Hồi sức cấp cứu và chống độc 24/7 (xác nhận trên website chính thức)',
    },
    officialPhotoUrl: '/images/emergency/sun-hospital-phu-quoc-official.webp',
    photoAttribution: {
      ko: '사진 출처: Sun Medicare 공식 웹사이트 (sunmedicare.com) 공식 외관 홍보 사진 · 정보 안내 목적 인용',
      en: 'Photo source: Sun Medicare official website (sunmedicare.com) official exterior press photo · Cited for informational guidance',
      zh: '图片来源：Sun Medicare 官方网站 (sunmedicare.com) 官方外观宣传照 · 仅供信息指引引用',
      ru: 'Источник фото: официальный сайт Sun Medicare (sunmedicare.com), официальное фото здания · использовано в справочных целях',
      ja: '写真出典：Sun Medicare 公式ウェブサイト (sunmedicare.com) 公式外観写真・情報案内目的で引用',
      hi: 'फ़ोटो स्रोत: Sun Medicare आधिकारिक वेबसाइट (sunmedicare.com) आधिकारिक बाहरी फ़ोटो · सूचनात्मक मार्गदर्शन हेतु',
      vi: 'Nguồn ảnh: Website chính thức Sun Medicare (sunmedicare.com) · Ảnh ngoại관 chính thức trích dẫn phục vụ thông tin chỉ dẫn',
    },
    pros: {
      ko: '선셋타운·안터이 권역에서 가장 가까운 종합병원으로, 공식 웹사이트(sunmedicare.com)를 통해 24시간 응급·소생·해독과 및 내과·외과·소아과·영상의학과·검사의학과·원내 약국 운영과 다수 여행자보험 제휴(Insmart, Pacific Cross, Fullerton 등)가 확인됩니다.',
      en: 'The closest general hospital to Sunset Town and An Thoi. Its official website (sunmedicare.com) confirms a 24/7 Emergency & Resuscitation department, Internal Medicine, Surgery, Pediatrics, Imaging, Lab, Pharmacy, and direct billing partnerships with major insurers (Insmart, Pacific Cross, Fullerton, etc.).',
      zh: '距离日落小镇与安泰区最近的综合医院。官方网站 (sunmedicare.com) 确认设有 24/7 急诊科及内科、外科、儿科、影像科、检验科、院内药房，并与多家国际医疗保险机构（Insmart、Pacific Cross、Fullerton 等）合作。',
      ru: 'Ближайшая к Сансет-Тауну многопрофильная больница. На официальном сайте (sunmedicare.com) подтверждена работа круглосуточного отделения неотложной помощи 24/7, терапии, хирургии, педиатрии, диагностики, аптеки и сотрудничество со страховыми компаниями (Insmart, Pacific Cross, Fullerton и др.).',
      ja: 'サンセットタウン・アントイ地区から最も近い総合病院です。公式サイト(sunmedicare.com)にて24時間救急科および内科・外科・小児科・画像診断・検査・院内薬局の運営、主要海外旅行保険（Insmart、Pacific Cross、Fullerton等）との提携が確認されています。',
      hi: 'सनसेट टाउन के सबसे नज़दीक स्थित जनरल हॉस्पिटल। आधिकारिक वेबसाइट (sunmedicare.com) पर 24/7 इमरजेंसी विभाग, मेडिसिन, सर्जरी, पीडियाट्रिक्स, इमेजिंग, लैब, फ़ार्मेसी और प्रमुख बीमा कंपनियों (Insmart, Pacific Cross, Fullerton आदि) के साथ साझेदारी की पुष्टि है।',
      vi: 'Bệnh viện đa khoa gần Thị trấn Hoàng Hôn nhất. Website chính thức (sunmedicare.com) xác nhận có Khoa Hồi sức cấp cứu 24/7, Nội, Ngoại, Nhi, Chẩn đoán hình ảnh, Xét nghiệm, Nhà thuốc và liên kết bảo lãnh viện phí với nhiều hãng bảo hiểm (Insmart, Pacific Cross, Fullerton...).',
    },
    cautions: {
      ko: '야간·주말 방문 시 특정 전문의 진료 가능 여부를 대표전화(0297 3898 888)로 먼저 확인하시기 바랍니다. 또한 구글맵 길찾기 시 선셋타운 북문 연결 도로의 공사 표시로 인해 남측 우회 경로(26분)가 표시될 수 있으므로 기사님께 뉴안터이 직결 도로 통행 가능 여부를 확인하세요.',
      en: 'Call ahead (0297 3898 888) to check specialist availability at night or on weekends. Note that Google Maps may show a 26-minute southern detour due to a construction flag at the Sunset Town north gate—ask your driver to check the direct New An Thoi connector road.',
      zh: '夜间或周末就诊前建议先致电 (0297 3898 888) 确认专科医生是否在岗。此外，由于谷歌地图在日落小镇北门连接处标有施工限制，自动导航可能显示南侧绕行路线（26分钟），乘车时请与司机确认北门直连道路是否通行。',
      ru: 'Перед визитом ночью или в выходные рекомендуем позвонить (0297 3898 888) и уточнить наличие профильного врача. На Google Картах из-за отметки о ремонте у северных ворот маршрут может строиться в объезд (26 мин) — уточните у водителя возможность проезда напрямую через New An Thoi.',
      ja: '夜間や週末に受診される際は、事前に代表電話(0297 3898 888)で専門医の対応可否をご確認ください。またGoogleマップでは北門付近の工事表示により南側迂回ルート（約26分）が案内される場合があるため、ドライバーへ直結道路の通行可否をご確認ください。',
      hi: 'रात या सप्ताहांत में जाने से पहले विशेष डॉक्टर की उपलब्धता के लिए 0297 3898 888 पर कॉल करें। Google Maps पर नॉर्थ गेट निर्माण चिह्न के कारण 26 मिनट का लंबा रास्ता दिख सकता है—ड्राइवर से सीधी New An Thoi सड़क की जाँच करने को कहें।',
      vi: 'Khi đến khám vào ban đêm hoặc cuối tuần, nên gọi trước (0297 3898 888) để kiểm tra lịch bác sĩ chuyên khoa. Lưu ý Google Maps có thể hiển thị đường vòng 26 phút do cảnh báo công trường ở cổng bắc Sunset Town—hãy hỏi tài xế走 đường nối trực tiếp qua KĐT New An Thới.',
    },
  },
  {
    id: 'dng-international-clinic-an-thoi',
    kind: 'clinic',
    officialName: 'Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới',
    formerOrKnownName: {
      ko: '구 명칭: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      en: 'Formerly: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      zh: '曾用名：Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      ru: 'Прежнее название: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      ja: '旧名称：Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      hi: 'पूर्व नाम: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
      vi: 'Tên cũ: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới',
    },
    address: 'S259 – S354, Khu đô thị Sun Grand City New An Thới, Phường An Thới, TP. Phú Quốc',
    phoneDisplay: '1900 3315',
    phoneTel: '+8419003315',
    placeId: 'ChIJU2YY86iWpzERfGNTGD1eM6Q',
    lat: 10.0362796,
    lng: 104.0090037,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJU2YY86iWpzERfGNTGD1eM6Q',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0362796,104.0090037&destination_place_id=ChIJU2YY86iWpzERfGNTGD1eM6Q&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJU2YY86iWpzERfGNTGD1eM6Q',
    officialWebsiteUrl: 'https://dngclinic.com/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '직결 도로 약 1.6 km · 차량 약 4~5분 (선셋타운 북문 기준 550 m · 1~2분 / 구글맵 북문 공사 우회 표시 시 ĐT 975 경유 6.6 km · 약 27분)',
      en: 'Direct road ~1.6 km · ~4–5 min by car (550 m · 1–2 min from Sunset Town North Gate / Google Maps detour shows 6.6 km · ~27 min via ĐT 975)',
      zh: '直连道路约 1.6 公里 · 车程约 4~5 分钟（距日落小镇北门 550 米 · 1~2 分钟 / 谷歌地图绕行显示 6.6 公里 · 约 27 分钟）',
      ru: 'Прямая дорога ~1,6 км · ~4–5 мин на авто (550 м · 1–2 мин от северных ворот / при объезде на Google Картах: 6,6 км · ~27 мин)',
      ja: '直結道路 約1.6 km・車で約4〜5分（サンセットタウン北門から550 m・1〜2分／Googleマップ迂回表示時は6.6 km・約27分）',
      hi: 'सीधी सड़क ~1.6 किमी · कार से ~4–5 मिनट (नॉर्थ गेट से 550 मीटर · 1–2 मिनट / Google Maps डायवर्जन पर 6.6 किमी · ~27 मिनट)',
      vi: 'Đường nối trực tiếp khoảng 1,6 km · khoảng 4–5 phút đi ô tô (cách cổng bắc Sunset Town 550 m · 1–2 phút / nếu Google Maps dẫn đường vòng: 6,6 km · khoảng 27 phút)',
    },
    operatingHours: {
      ko: '07:30–11:30, 13:30–18:00 (점심 휴진 11:30–13:30 · 야간 휴진)',
      en: '07:30–11:30, 13:30–18:00 (Closed for lunch 11:30–13:30 · Closed at night)',
      zh: '07:30–11:30, 13:30–18:00（午休停诊 11:30–13:30 · 夜间停诊）',
      ru: '07:30–11:30, 13:30–18:00 (перерыв 11:30–13:30 · ночью закрыто)',
      ja: '07:30〜11:30、13:30〜18:00（昼休診 11:30〜13:30・夜間休診）',
      hi: '07:30–11:30, 13:30–18:00 (दोपहर अवकाश 11:30–13:30 · रात में बंद)',
      vi: '07:30–11:30, 13:30–18:00 (Nghỉ trưa 11:30–13:30 · Đóng cửa buổi tối)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '선셋타운 바로 위 뉴안터이(Sun Grand City New An Thới) 단지에 위치해 주간 외래 방문이 가깝습니다. 공식 웹사이트(dngclinic.com) 기준 내과·외과·소아과·산부인과·이비인후과·안과·초음파 등 1차 외래 진료 과목과 통합 콜센터(1900 3315)가 운영됩니다.',
      en: 'Located right in the Sun Grand City New An Thoi complex adjacent to Sunset Town. Its official website (dngclinic.com) lists primary outpatient departments (Internal Medicine, Surgery, Pediatrics, OB/GYN, ENT, Ophthalmology, Ultrasound) and a central hotline (1900 3315).',
      zh: '位于紧邻日落小镇的新安泰 (Sun Grand City New An Thới) 街区。官方网站 (dngclinic.com) 显示设有内科、外科、儿科、妇产科、耳鼻喉科、眼科及超声检查等日间门诊，并提供客服热线 (1900 3315)。',
      ru: 'Расположена в квартале Sun Grand City New An Thoi рядом с Сансет-Тауном. На официальном сайте (dngclinic.com) указаны амбулаторные направления (терапия, хирургия, педиатрия, гинекология, ЛОР, офтальмология, УЗИ) и единый колл-центр (1900 3315).',
      ja: 'サンセットタウン隣接のニューアントイ地区に位置し、日中の外来受診に便利です。公式サイト(dngclinic.com)にて内科・外科・小児科・産婦人科・耳鼻咽喉科・眼科などの外来科目とコールセンター(1900 3315)が確認できます。',
      hi: 'सनसेट टाउन के पास Sun Grand City New An Thoi में स्थित। आधिकारिक वेबसाइट (dngclinic.com) पर सामान्य ओपीडी विभाग (मेडिसिन, सर्जरी, पीडियाट्रिक्स, ईएनटी, नेत्र, अल्ट्रासाउंड) और हॉटलाइन (1900 3315) उपलब्ध हैं।',
      vi: 'Nằm ngay trong khu đô thị Sun Grand City New An Thới sát Thị trấn Hoàng Hôn. Website chính thức (dngclinic.com) công bố các chuyên khoa khám ngoại trú (Nội, Ngoại, Nhi, Sản phụ khoa, Tai Mũi Họng, Mắt, Siêu âm) và tổng đài 1900 3315.',
    },
    cautions: {
      ko: '기존 "Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc"에서 현재 "Phòng khám Đa khoa Quốc tế DNG"로 공식 명칭이 변경되었습니다. 일반 외래 의원(24시간 응급실 미운영)이며 점심시간(11:30–13:30)과 저녁 18시 이후에는 진료하지 않으므로 응급 상황 시에는 24시간 병원을 이용하세요.',
      en: 'Formerly known as "Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc", it has officially rebranded to "DNG International Clinic". It is a daytime outpatient clinic (not a 24-hour emergency room) and closes for lunch (11:30–13:30) and after 18:00.',
      zh: '原名“Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc”，现已正式更名为“DNG 国际综合诊所”。该机构为日间普通门诊（非 24 小时急诊室），午间（11:30–13:30）及 18:00 后停诊，急重症请前往 24 小时医院。',
      ru: 'Клиника официально переименована из «Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc» в «DNG». Это дневная амбулаторная поликлиника (не круглосуточный травмпункт/стационар); закрыта в обед (11:30–13:30) и после 18:00.',
      ja: '旧称「サイゴン・フーコック国際総合クリニック」から現在の「DNG国際総合クリニック」へ名称変更されています。日中の一般外来クリニック（24時間救急室ではありません）で、昼休み（11:30〜13:30）および18時以降は休診となります。',
      hi: 'इसका नाम "Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc" से बदलकर "DNG क्लिनिक" हो गया है। यह दिन का ओपीडी क्लिनिक है (24 घंटे का इमरजेंसी रूम नहीं), जो दोपहर 11:30–13:30 और शाम 18:00 के बाद बंद रहता है।',
      vi: 'Phòng khám đã đổi tên từ "Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc" sang "Phòng khám Đa khoa Quốc tế DNG". Đây là phòng khám ngoại trú ban ngày (không phải phòng cấp cứu 24/24), nghỉ trưa 11:30–13:30 và đóng cửa sau 18:00.',
    },
  },
  {
    id: 'sos-clinic-an-thoi',
    kind: 'clinic',
    officialName: 'Phòng khám Đa khoa S.O.S Phú Quốc – Cơ sở 2 (An Thới)',
    formerOrKnownName: {
      ko: '구글맵 표기: Phòng khám đa khoa SOS An Thới Phú Quốc',
      en: 'Google Maps name: Phòng khám đa khoa SOS An Thới Phú Quốc',
      zh: '谷歌地图名称：Phòng khám đa khoa SOS An Thới Phú Quốc',
      ru: 'Название на Google Картах: Phòng khám đa khoa SOS An Thới Phú Quốc',
      ja: 'Googleマップ表記：Phòng khám đa khoa SOS An Thới Phú Quốc',
      hi: 'Google Maps नाम: Phòng khám đa khoa SOS An Thới Phú Quốc',
      vi: 'Tên trên Google Maps: Phòng khám đa khoa SOS An Thới Phú Quốc',
    },
    address: '243 Nguyễn Văn Cừ, Khu phố 3, Phường An Thới, TP. Phú Quốc',
    phoneDisplay: '+84 328 219 764',
    phoneTel: '+84328219764',
    placeId: 'ChIJt4aBPTKXpzERXxwyYMJ_UEs',
    lat: 10.0255321,
    lng: 104.0170654,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJt4aBPTKXpzERXxwyYMJ_UEs',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0255321,104.0170654&destination_place_id=ChIJt4aBPTKXpzERXxwyYMJ_UEs&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJt4aBPTKXpzERXxwyYMJ_UEs',
    officialWebsiteUrl: 'https://phongkhamdakhoasos.com/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '직결 도로 약 3.0~3.8 km · 차량 약 6~7분 (선셋타운 북문 기준 Đường Cáp Treo 경유 2.0 km · 5분 / 구글맵 공사 우회 표시 시 8.8 km · 약 29분)',
      en: 'Direct road ~3.0–3.8 km · ~6–7 min by car (2.0 km · 5 min from Sunset Town North Gate via Đường Cáp Treo / Google Maps detour shows 8.8 km · ~29 min)',
      zh: '直连道路约 3.0~3.8 公里 · 车程约 6~7 分钟（从日落小镇北门经 Đường Cáp Treo 约 2.0 公里 · 5 分钟 / 谷歌地图绕行显示 8.8 公里 · 约 29 分钟）',
      ru: 'Прямая дорога ~3,0–3,8 км · ~6–7 мин на авто (2,0 км · 5 мин от северных ворот через Đường Cáp Treo / при объезде на Google Картах: 8,8 км · ~29 мин)',
      ja: '直結道路 約3.0〜3.8 km・車で約6〜7分（北門からĐường Cáp Treo経由 2.0 km・5分／Googleマップ迂回表示時は8.8 km・約29分）',
      hi: 'सीधी सड़क ~3.0–3.8 किमी · कार से ~6–7 मिनट (नॉर्थ गेट से Đường Cáp Treo होकर 2.0 किमी · 5 मिनट / Google Maps डायवर्जन पर 8.8 किमी · ~29 मिनट)',
      vi: 'Đường nối trực tiếp khoảng 3,0–3,8 km · khoảng 6–7 phút đi ô tô (từ cổng bắc qua Đường Cáp Treo 2,0 km · 5 phút / nếu Google Maps dẫn đường vòng: 8,8 km · khoảng 29 phút)',
    },
    operatingHours: {
      ko: '07:00–20:00 (공식 웹사이트 안내 기준 · 구글맵 영업시간 미표기, 방문 전 전화 확인 권장)',
      en: '07:00–20:00 (Per official website · Hours not listed on Google Maps; calling ahead is recommended)',
      zh: '07:00–20:00（依据官方网站说明 · 谷歌地图未标注营业时间，建议出发前致电确认）',
      ru: '07:00–20:00 (по данным официального сайта · на Google Картах часы не указаны, рекомендуем позвонить заранее)',
      ja: '07:00〜20:00（公式サイト案内基準・Googleマップには営業時間未記載のため事前連絡を推奨）',
      hi: '07:00–20:00 (आधिकारिक वेबसाइट के अनुसार · Google Maps पर समय दर्ज नहीं है, जाने से पहले कॉल करें)',
      vi: '07:00–20:00 (theo website chính thức · Google Maps chưa cập nhật giờ mở cửa, nên gọi xác nhận trước khi đến)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '안터이 중심 도로(Nguyễn Văn Cừ)에 위치한 의원 2호점으로, 공식 웹사이트(phongkhamdakhoasos.com) 기준 오전 7시부터 저녁 8시까지 주간·초저녁 시간대에 내과·외과·소아과·이비인후과·치과 등 1차 외래 진료 및 기초 검사를 안내하고 있습니다.',
      en: 'Branch 2 on An Thoi’s main road (Nguyễn Văn Cừ). Its official website (phongkhamdakhoasos.com) lists daytime and early-evening hours (07:00–20:00) for primary outpatient care including Internal Medicine, Surgery, Pediatrics, ENT, and Dentistry.',
      zh: '位于安泰主干道 (Nguyễn Văn Cừ) 的第二分院，官方网站 (phongkhamdakhoasos.com) 指南显示每日 07:00 至 20:00 提供内科、外科、儿科、耳鼻喉科及牙科等基础门诊服务。',
      ru: 'Филиал №2 на главной улице Ан-Тхой (Nguyễn Văn Cừ). На официальном сайте (phongkhamdakhoasos.com) указан приём с 07:00 до 20:00 по направлениям: терапия, хирургия, педиатрия, ЛОР и стоматология.',
      ja: 'アントイ中心通り(Nguyễn Văn Cừ)にある第2分院で、公式サイト(phongkhamdakhoasos.com)では朝7時から夜8時まで内科・外科・小児科・耳鼻咽喉科・歯科などの一次外来案内が掲載されています。',
      hi: 'आन थोई की मुख्य सड़क (Nguyễn Văn Cừ) पर स्थित शाखा 2। आधिकारिक वेबसाइट (phongkhamdakhoasos.com) के अनुसार सुबह 7 से रात 8 बजे तक मेडिसिन, सर्जरी, पीडियाट्रिक्स, ईएनटी और डेंटल ओपीडी उपलब्ध है।',
      vi: 'Cơ sở 2 trên trục đường chính Nguyễn Văn Cừ (An Thới). Theo website chính thức (phongkhamdakhoasos.com), phòng khám hoạt động từ 07:00 đến 20:00 với các khoa Nội, Ngoại, Nhi, Tai Mũi Họng và Nha khoa.',
    },
    cautions: {
      ko: '일반 외래 의원(응급실 아님)이며, 구글맵에는 치과 진료소 카테고리로만 등록되어 있고 영업시간이 비어 있으므로 방문 전 희망 진료 과목과 당일 진료 여부를 전화(+84 328 219 764)로 먼저 확인하시기 바랍니다.',
      en: 'This is an outpatient clinic (not an emergency room). On Google Maps it is categorized under dental clinic without posted hours, so please call (+84 328 219 764) to confirm your needed department before visiting.',
      zh: '该机构为普通门诊（非急诊室），且在谷歌地图上仅归类为牙科诊所、未显示营业时间，前往前请务必致电 (+84 328 219 764) 确认所需科室当日是否接诊。',
      ru: 'Это обычная амбулаторная клиника (не отделение скорой помощи). На Google Картах отмечена как стоматология без часов работы, поэтому перед выездом обязательно позвоните (+84 328 219 764) для уточнения приёма нужного врача.',
      ja: '一般外来クリニック（救急病院ではありません）であり、Googleマップ上では歯科クリニック分類・営業時間未記載となっているため、訪問前に電話(+84 328 219 764)で希望診療科の対応可否をご確認ください。',
      hi: 'यह एक सामान्य ओपीडी क्लिनिक है (इमरजेंसी रूम नहीं)। Google Maps पर यह केवल डेंटल क्लिनिक के रूप में दिखता है, इसलिए जाने से पहले +84 328 219 764 पर कॉल करके संबंधित डॉक्टर की उपलब्धता जांच लें।',
      vi: 'Đây là phòng khám ngoại trú (không phải cấp cứu 24/24). Trên Google Maps hiện hiển thị danh mục nha khoa và chưa ghi giờ mở cửa, vui lòng gọi trước (+84 328 219 764) để xác nhận chuyên khoa cần khám.',
    },
  },
  {
    id: 'pharmacy-amalfi-67',
    kind: 'pharmacy',
    officialName: 'Pharmacy Amalfi 67 (Nhà thuốc Amalfi 67 Sunset Town)',
    address: 'Căn Amalfi 67, Sunset Town, Phường An Thới, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 868 681 994',
    phoneTel: '+84868681994',
    placeId: 'ChIJgeZqD5SVpzERoy7NGQ43Sy8',
    lat: 10.0325402,
    lng: 104.0051013,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0325402,104.0051013&destination_place_id=ChIJgeZqD5SVpzERoy7NGQ43Sy8&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '약 700 m · 자동차 약 3분 / 도보 약 8분 (Đ. Amalfi 경유, 선셋타운 내부)',
      en: '~700 m · ~3 min by car / ~8 min walk (via Đ. Amalfi, inside Sunset Town)',
      zh: '约 700 米 · 车程约 3 分钟 / 步行约 8 分钟（经 Đ. Amalfi，位于日落小镇内部）',
      ru: '~700 м · ~3 мин на авто / ~8 мин пешком (по ул. Đ. Amalfi, внутри Сансет-Тауна)',
      ja: '約700 m・車で約3分／徒歩約8分（Đ. Amalfi経由、サンセットタウン内）',
      hi: '~700 मीटर · कार से ~3 मिनट / पैदल ~8 मिनट (Đ. Amalfi होकर, सनसेट टाउन के अंदर)',
      vi: 'Khoảng 700 m · khoảng 3 phút đi xe / 8 phút đi bộ (qua đường Amalfi, ngay trong Thị trấn Hoàng Hôn)',
    },
    operatingHours: {
      ko: '오전 ~ 23:30 (구글맵 기준 오후 11:30 영업 종료 · 방문 전 전화 확인 권장)',
      en: 'Open until 23:30 (Closes at 11:30 PM per Google Maps · Calling ahead is recommended)',
      zh: '营业至 23:30（谷歌地图显示晚 11:30 结束营业 · 建议提前致电确认）',
      ru: 'Открыто до 23:30 (по данным Google Карт закрывается в 23:30 · рекомендуем позвонить заранее)',
      ja: '〜23:30（Googleマップ基準 午後11:30営業終了・事前電話確認を推奨）',
      hi: 'रात 23:30 तक खुला (Google Maps के अनुसार रात 11:30 बजे बंद · कॉल करना उचित है)',
      vi: 'Mở cửa đến 23:30 (theo Google Maps đóng cửa lúc 23:30 · nên gọi trước khi ghé muộn)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '선셋타운 내부 아말피(Amalfi) 거리에 위치해 시계탑에서 차량 약 3분·도보 약 8분으로 가장 빠르게 접근할 수 있으며, 밤 11시 30분까지 운영해 야간 공연 직후에도 기본 상비약을 구하기 편리합니다.',
      en: 'Located directly on Amalfi Street inside Sunset Town—just ~3 minutes by car or an ~8-minute walk from the Clock Tower—and open until 23:30 for late-evening over-the-counter needs.',
      zh: '直接位于日落小镇内部的 Amalfi 街，从钟楼出发乘车约 3 分钟、步行约 8 分钟即可到达，且营业至晚间 23:30，方便晚间演出后购买基础常备药。',
      ru: 'Находится прямо внутри Сансет-Тауна на улице Amalfi (около 3 минут на машине или 8 минут пешком от Часовой башни) и работает до 23:30.',
      ja: 'サンセットタウン内のアマルフィ通りに位置し、時計塔から車で約3分・徒歩約8分と最も近く、夜23:30まで営業しているため夜間の常備薬購入に便利です。',
      hi: 'सनसेट टाउन के अंदर अमाल्फ़ी स्ट्रीट पर स्थित—क्लॉक टॉवर से कार द्वारा केवल ~3 मिनट या पैदल ~8 मिनट—और रात 23:30 तक खुला रहता है।',
      vi: 'Nằm ngay trên trục đường Amalfi trong nội khu Thị trấn Hoàng Hôn, chỉ mất khoảng 3 phút đi xe hoặc 8 phút đi bộ từ Tháp Đồng Hồ và mở cửa đến 23:30.',
    },
    cautions: {
      ko: '개인 운영 소규모 약국이므로 전문 처방약이나 특수 의약품은 구비되어 있지 않을 수 있습니다. 방문 시 필요한 약의 영문 성분명(예: Paracetamol, Ibuprofen)이나 증상 번역 화면을 준비해 주세요.',
      en: 'As a small independent pharmacy, specialized or prescription medications may have limited stock. Prepare the English generic ingredient name (e.g., Paracetamol, Ibuprofen) or a translation app when visiting.',
      zh: '作为独立小型药店，特殊药品或处方药库存可能有限。购买时请准备好药品的英文通用成分名（如 Paracetamol、Ibuprofen）或翻译软件说明症状。',
      ru: 'Это небольшая частная аптека, поэтому редких или рецептурных препаратов может не быть в наличии. Заранее подготовьте международное название действующего вещества (например, Paracetamol, Ibuprofen) или переводчик.',
      ja: '小規模な薬局のため、処方薬や特殊な医薬品は在庫がない場合があります。有効成分の英語名（Paracetamol、Ibuprofenなど）や翻訳アプリをご準備のうえご利用ください。',
      hi: 'छोटी स्थानीय फ़ार्मेसी होने के कारण विशेष या प्रिस्क्रिप्शन दवाओं का स्टॉक सीमित हो सकता है। दवा का अंग्रेज़ी जेनेरिक नाम (जैसे Paracetamol, Ibuprofen) या अनुवाद ऐप साथ रखें।',
      vi: 'Là nhà thuốc quy mô nhỏ trong khu du lịch nên các loại thuốc kê đơn đặc thù có thể hạn chế. Nên chuẩn bị sẵn tên hoạt chất quốc tế (như Paracetamol, Ibuprofen) hoặc ứng dụng dịch thuật khi mua thuốc.',
    },
  },
  {
    id: 'fpt-long-chau-46-nvc',
    kind: 'pharmacy',
    officialName: 'Nhà thuốc FPT Long Châu — 46 Nguyễn Văn Cừ',
    address: '46 Nguyễn Văn Cừ, Phường An Thới, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '1800 6928',
    phoneTel: '+8418006928',
    placeId: 'ChIJY5o0asSXpzERJEewEY1Dy9U',
    lat: 10.0182266,
    lng: 104.0146462,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0182266,104.0146462&destination_place_id=ChIJY5o0asSXpzERJEewEY1Dy9U&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U',
    officialWebsiteUrl: 'https://nhathuoclongchau.com.vn/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '직결 도로 약 3.9~4.8 km · 차량 약 8~10분 (선셋타운 북문 기준 Đường Cáp Treo, Đ. Nguyễn Văn Cừ 경유 3.0 km · 8분 / 구글맵 공사 우회 표시 시 9.7 km · 약 32분)',
      en: 'Direct road ~3.9–4.8 km · ~8–10 min by car (3.0 km · 8 min from Sunset Town North Gate via Đường Cáp Treo & Nguyễn Văn Cừ / Google Maps detour shows 9.7 km · ~32 min)',
      zh: '直连道路约 3.9~4.8 公里 · 车程约 8~10 分钟（从北门经 Đường Cáp Treo、Nguyễn Văn Cừ 约 3.0 公里 · 8 分钟 / 谷歌地图绕行显示 9.7 公里 · 约 32 分钟）',
      ru: 'Прямая дорога ~3,9–4,8 км · ~8–10 мин на авто (3,0 км · 8 мин от северных ворот / при объезде на Google Картах: 9,7 км · ~32 мин)',
      ja: '直結道路 約3.9〜4.8 km・車で約8〜10分（北門からĐường Cáp Treo・Nguyễn Văn Cừ経由 3.0 km・8分／Googleマップ迂回表示時は9.7 km・約32分）',
      hi: 'सीधी सड़क ~3.9–4.8 किमी · कार से ~8–10 मिनट (नॉर्थ गेट से 3.0 किमी · 8 मिनट / Google Maps डायवर्जन पर 9.7 किमी · ~32 मिनट)',
      vi: 'Đường nối trực tiếp khoảng 3,9–4,8 km · khoảng 8–10 phút đi ô tô (từ cổng bắc qua Đường Cáp Treo & Nguyễn Văn Cừ 3,0 km · 8 phút / nếu Google Maps dẫn đường vòng: 9,7 km · khoảng 32 phút)',
    },
    operatingHours: {
      ko: '07:00–21:00 (구글맵 및 공식 체인 안내 기준 오후 9:00 영업 종료)',
      en: '07:00–21:00 (Closes at 9:00 PM per Google Maps & official chain listing)',
      zh: '07:00–21:00（谷歌地图及官方连锁标准晚 9:00 结束营业）',
      ru: '07:00–21:00 (закрывается в 21:00 по данным Google Карт и официальной сети)',
      ja: '07:00〜21:00（Googleマップおよび公式チェーン基準 午後9:00営業終了）',
      hi: '07:00–21:00 (Google Maps और आधिकारिक चेन के अनुसार रात 9:00 बजे बंद)',
      vi: '07:00–21:00 (Đóng cửa lúc 21:00 theo Google Maps và hệ thống chính thức)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '베트남 최대 규모 약국 체인(FPT Retail 운영) 중 하나로, 의약품 정찰제 가격 표기·영수증 발급·보관 관리가 체계적이며 공식 웹사이트(nhathuoclongchau.com.vn)에서 약품명과 재고·가격을 미리 조회하기 좋습니다.',
      en: 'One of Vietnam’s largest pharmacy chains (operated by FPT Retail), offering standardized fixed pricing, printed receipts, and searchable product information on its official website (nhathuoclongchau.com.vn).',
      zh: '越南最大的连锁药房之一（FPT Retail 旗下），实行明码标价、提供正规小票，且可在官方网站 (nhathuoclongchau.com.vn) 提前查询药品信息与参考价格。',
      ru: 'Одна из крупнейших аптечных сетей Вьетнама (FPT Retail): фиксированные цены, кассовые чеки, широкий ассортимент и возможность заранее проверить наличие и цены на сайте (nhathuoclongchau.com.vn).',
      ja: 'ベトナム最大手クラスの薬局チェーン（FPTリテール運営）で、明朗な定価表示・レシート発行・品質管理が整っており、公式サイト(nhathuoclongchau.com.vn)で事前に医薬品情報を検索できます。',
      hi: 'वियतनाम की सबसे बड़ी फ़ार्मेसी चेन में से एक (FPT Retail द्वारा संचालित), जहाँ तय कीमतें, पक्की रसीद और आधिकारिक वेबसाइट (nhathuoclongchau.com.vn) पर दवाओं की जानकारी उपलब्ध है।',
      vi: 'Hệ thống nhà thuốc lớn thuộc FPT Retail với giá niêm yết rõ ràng, hóa đơn đầy đủ, nguồn gốc thuốc minh bạch và có thể tra cứu trước thông tin thuốc trên website (nhathuoclongchau.com.vn).',
    },
    cautions: {
      ko: '대표전화(1800 6928)는 베트남 전국 통합 콜센터(베트남어 중심)로 연결되며, 밤 9시(21:00)에 문을 닫으므로 심야 방문은 어렵습니다. 약국은 응급 진료 기관이 아니므로 고열·심한 통증·응급 증상 시 병원을 방문하세요.',
      en: 'The hotline (1800 6928) connects to a nationwide Vietnamese-language call center, and the store closes at 21:00. A pharmacy is not an emergency clinic—visit a hospital for severe symptoms.',
      zh: '客服电话 (1800 6928) 为越南全国统一热线（以越语服务为主），门店于晚 21:00 关门。药房并非急诊医疗机构，如遇高烧或急重症请直接前往医院。',
      ru: 'Горячая линия (1800 6928) — общенациональный колл-центр (преимущественно на вьетнамском языке). Аптека работает до 21:00 и не заменяет врачебную неотложную помощь.',
      ja: '代表番号(1800 6928)はベトナム全国統合コールセンター（ベトナム語中心）に繋がります。また夜21:00に閉店するため深夜利用はできません。急病や重い症状の際は病院を受診してください。',
      hi: 'हॉटलाइन (1800 6928) राष्ट्रीय वियतनामी कॉल सेंटर से जुड़ती है, और स्टोर रात 21:00 बजे बंद हो जाता है। गंभीर लक्षण होने पर फ़ार्मेसी के बजाय अस्पताल जाएँ।',
      vi: 'Số 1800 6928 là tổng đài toàn quốc và cửa hàng đóng cửa lúc 21:00. Nhà thuốc không thay thế cơ sở cấp cứu y tế khi có triệu chứng nặng.',
    },
  },
  {
    id: 'an-khang-pharmacy-an-thoi',
    kind: 'pharmacy',
    officialName: 'Nhà thuốc An Khang — Nguyễn Văn Cừ (Khu phố 3, An Thới)',
    address: 'Đ. Nguyễn Văn Cừ, Khu phố 3, Phường An Thới, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '1900 1572',
    phoneTel: '+8419001572',
    placeId: 'ChIJuYW74Y2XpzERIbXTGTiotEU',
    lat: 10.0188201,
    lng: 104.0152307,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0188201,104.0152307&destination_place_id=ChIJuYW74Y2XpzERIbXTGTiotEU&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU',
    officialWebsiteUrl: 'https://www.nhathuocankhang.com/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '직결 도로 약 3.8~4.7 km · 차량 약 8~10분 (선셋타운 북문 기준 Đường Cáp Treo, Đ. Nguyễn Văn Cừ 경유 2.9 km · 7분 / 구글맵 공사 우회 표시 시 9.6 km · 약 31분)',
      en: 'Direct road ~3.8–4.7 km · ~8–10 min by car (2.9 km · 7 min from Sunset Town North Gate / Google Maps detour shows 9.6 km · ~31 min)',
      zh: '直连道路约 3.8~4.7 公里 · 车程约 8~10 分钟（从北门出发约 2.9 公里 · 7 分钟 / 谷歌地图绕行显示 9.6 公里 · 约 31 分钟）',
      ru: 'Прямая дорога ~3,8–4,7 км · ~8–10 мин на авто (2,9 км · 7 мин от северных ворот / при объезде на Google Картах: 9,6 км · ~31 мин)',
      ja: '直結道路 約3.8〜4.7 km・車で約8〜10分（北門から2.9 km・7分／Googleマップ迂回表示時は9.6 km・約31分）',
      hi: 'सीधी सड़क ~3.8–4.7 किमी · कार से ~8–10 मिनट (नॉर्थ गेट से 2.9 किमी · 7 मिनट / Google Maps डायवर्जन पर 9.6 किमी · ~31 मिनट)',
      vi: 'Đường nối trực tiếp khoảng 3,8–4,7 km · khoảng 8–10 phút đi ô tô (từ cổng bắc 2,9 km · 7 phút / nếu Google Maps dẫn đường vòng: 9,6 km · khoảng 31 phút)',
    },
    operatingHours: {
      ko: '06:30–21:30 (구글맵 기준 오후 9:30 영업 종료)',
      en: '06:30–21:30 (Closes at 9:30 PM per Google Maps)',
      zh: '06:30–21:30（谷歌地图显示晚 9:30 结束营业）',
      ru: '06:30–21:30 (закрывается в 21:30 по данным Google Карт)',
      ja: '06:30〜21:30（Googleマップ基準 午後9:30営業終了）',
      hi: '06:30–21:30 (Google Maps के अनुसार रात 9:30 बजे बंद)',
      vi: '06:30–21:30 (Đóng cửa lúc 21:30 theo Google Maps)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '베트남 대기업(Mobile World 그룹) 계열 체인 약국으로 안터이 중심가(FPT 롱쩌우 인근)에 함께 위치해 있으며, 오전 일찍부터 밤 9시 30분까지 정찰제로 일반의약품·위생용품을 구매할 수 있습니다.',
      en: 'A major retail pharmacy chain (Mobile World Group) located near FPT Long Chau on Nguyễn Văn Cừ Street, open from early morning until 21:30 with fixed retail pricing.',
      zh: '越南大型零售集团（Mobile World 旗下）连锁药房，位于安泰主干道（紧邻 FPT Long Châu），早间至晚 21:30 营业，商品明码标价。',
      ru: 'Крупная сетевая аптека (группа Mobile World) на улице Nguyễn Văn Cừ рядом с FPT Long Châu; открыта до 21:30, фиксированные цены.',
      ja: '大手流通グループ（Mobile World傘下）のチェーン薬局で、アントイ中心部（FPTロンチャウ近く）に位置し、朝早くから夜21:30まで定価で一般医薬品や衛生用品を購入できます。',
      hi: 'Mobile World ग्रुप की प्रमुख फ़ार्मेसी चेन, जो Nguyễn Văn Cừ सड़क पर FPT Long Châu के पास स्थित है और रात 21:30 तक खुली रहती है।',
      vi: 'Chuỗi nhà thuốc thuộc tập đoàn Thế Giới Di Động nằm gần FPT Long Châu trên đường Nguyễn Văn Cừ, mở cửa đến 21:30 với giá niêm yết rõ ràng.',
    },
    cautions: {
      ko: '대표전화(1900 1572)는 전국 통합 콜센터로 연결되며, 밤 9시 30분 이후에는 영업하지 않습니다. 인근 5 Nguyễn Văn Cừ 지점(An Khang Phú Quốc 2)과 혼동하지 않도록 주소를 확인하세요.',
      en: 'The hotline (1900 1572) is a national call center, and the store closes at 21:30. Check the address carefully as there is another An Khang branch nearby on Nguyễn Văn Cừ.',
      zh: '客服热线 (1900 1572) 为全国统一总机，门店于 21:30 结束营业。附近同条街上另有 An Khang 分店，导航时请核对具体位置。',
      ru: 'Телефон 1900 1572 — единый колл-центр, аптека закрывается в 21:30. На этой же улице есть второй филиал An Khang, сверяйте точку на карте.',
      ja: '代表番号(1900 1572)は全国コールセンターに繋がり、21:30に閉店します。同じ通り沿いに別店舗（An Khang Phú Quốc 2）があるため地図ピンをご確認ください。',
      hi: 'हॉटलाइन (1900 1572) राष्ट्रीय कॉल सेंटर है और स्टोर रात 21:30 बजे बंद हो जाता है। इसी सड़क पर एक अन्य शाखा भी है, इसलिए मैप पिन की जाँच करें।',
      vi: 'Số 1900 1572 là tổng đài toàn quốc và nhà thuốc đóng cửa lúc 21:30. Trên cùng tuyến đường Nguyễn Văn Cừ còn có một chi nhánh An Khang khác, hãy kiểm tra đúng ghim bản đồ.',
    },
  },
]

/**
 * Closest confirmed 24/7 major hospitals outside the 10-minute Sunset Town radius
 * (Provided as separate reference per instruction: "10분 이내 병원이 확인되지 않으면 이동 시간을 임의로 줄이지 말고, 가장 가까운 확인된 병원을 별도로 안내하세요.")
 */
export const REFERENCE_MAJOR_HOSPITALS: EmergencyFacility[] = [
  {
    id: 'phu-quoc-medical-center',
    kind: 'hospital',
    officialName: 'Trung tâm Y tế thành phố Phú Quốc',
    formerOrKnownName: {
      ko: '푸꾸옥 시립 의료센터 (즈엉동 공공 종합병원)',
      en: 'Phu Quoc City Medical Center (Duong Dong Public Hospital)',
      zh: '富国市医疗中心（阳东公立医院）',
      ru: 'Городской медицинский центр Фукуока (государственная больница в Зыонгдонге)',
      ja: 'フーコック市立医療センター（ズオンドン公立病院）',
      hi: 'फ़ू क्वोक सिटी मेडिकल सेंटर (डुओंग डोंग सरकारी अस्पताल)',
      vi: 'Trung tâm Y tế TP. Phú Quốc (Dương Đông)',
    },
    address: '128 Đường 30/4, Khu phố 1, Phường Dương Đông, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 297 3846 972',
    phoneTel: '+842973846972',
    placeId: 'ChIJbdp0m2yOpzERzB3g0p7X9nQ',
    lat: 10.2145,
    lng: 103.9634,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+Y+t%E1%BA%BF+th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c+128+%C4%90%C6%B0%E1%BB%9Dng+30%2F4',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.2145,103.9634&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+Y+t%E1%BA%BF+th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c+128+%C4%90%C6%B0%E1%BB%9Dng+30%2F4',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '약 27.8 km · 자동차 약 40~45분 (Đ. Nguyễn Văn Cừ/ĐT46, TL47 경유 — 중부 즈엉동 위치)',
      en: '~27.8 km · ~40–45 min by car (via Đ. Nguyễn Văn Cừ/ĐT46 & TL47 — Central Duong Dong)',
      zh: '约 27.8 公里 · 车程约 40~45 分钟（经 Đ. Nguyễn Văn Cừ/ĐT46, TL47 — 位于中部阳东）',
      ru: '~27,8 км · ~40–45 мин на авто (через Đ. Nguyễn Văn Cừ/ĐT46, TL47 — центр острова, Зыонгдонг)',
      ja: '約27.8 km・車で約40〜45分（Đ. Nguyễn Văn Cừ/ĐT46、TL47経由 — 中部ズオンドン）',
      hi: '~27.8 किमी · कार से ~40–45 मिनट (Đ. Nguyễn Văn Cừ/ĐT46, TL47 होकर — मध्य डुओंग डोंग)',
      vi: 'Khoảng 27,8 km · khoảng 40–45 phút đi ô tô (qua Đ. Nguyễn Văn Cừ/ĐT46, TL47 — khu vực Dương Đông)',
    },
    operatingHours: {
      ko: '24시간 영업 (공공 응급실 상시 운영)',
      en: 'Open 24 hours (24/7 public emergency room)',
      zh: '24小时营业（公立急诊室全天开放）',
      ru: 'Круглосуточно 24/7 (государственное приёмное отделение)',
      ja: '24時間営業（公立救急外来 常時運営）',
      hi: '24 घंटे खुला (24/7 सरकारी आपातकालीन कक्ष)',
      vi: 'Mở cửa 24/24 (Khoa cấp cứu công lập hoạt động thường trực)',
    },
    emergencyCareConfirmed: {
      ko: '응급진료 확인됨: 24시간 공공 응급실 및 115 구급 연계 거점',
      en: 'Confirmed: 24/7 public emergency department & 115 ambulance hub',
      zh: '已确认急诊服务：24小时公立急诊室及 115 急救联动中心',
      ru: 'Экстренная помощь подтверждена: круглосуточное государственное отделение скорой помощи (115)',
      ja: '救急診療確認済：24時間公立救急室および115救急連携拠点',
      hi: 'आपातकालीन चिकित्सा पुष्ट: 24 घंटे सरकारी इमरजेंसी और 115 एम्बुलेंस केंद्र',
      vi: 'Đã xác nhận cấp cứu: Khoa cấp cứu 24/24 và đầu mối cấp cứu 115 của đảo',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '푸꾸옥 중심부(즈엉동)의 거점 공공 의료기관으로 24시간 응급실과 입원 병동을 상시 운영하며 115 구급차 이송의 기준 거점 역할을 합니다.',
      en: 'The primary public medical center in central Phu Quoc (Duong Dong), operating a 24/7 emergency room and inpatient wards and serving as the main hub for 115 ambulance transport.',
      zh: '富国岛中部（阳东）的核心公立医疗机构，全天候开放急诊室与住院部，是岛上 115 救护车转运的主要枢纽。',
      ru: 'Главный государственный медицинский центр в центральной части острова (Зыонгдонг) с круглосуточным приёмным покоем и стационаром.',
      ja: 'フーコック島中心部（ズオンドン）の拠点公立医療機関で、24時間救急室と入院病棟を常時運営し、115救急搬送の拠点となっています。',
      hi: 'मध्य फ़ू क्वोक (डुओंग डोंग) का मुख्य सरकारी चिकित्सा केंद्र, जहाँ 24/7 इमरजेंसी रूम और भर्ती वार्ड उपलब्ध हैं।',
      vi: 'Cơ sở y tế công lập tuyến chính tại trung tâm Dương Đông, trực cấp cứu 24/24 và tiếp nhận xe cấp cứu 115.',
    },
    cautions: {
      ko: '선셋타운 시계탑에서 차량으로 약 40~45분이 소요되며, 공공 병원 특성상 베트남어 위주로 응대가 이루어지므로 번역 앱이나 현지인 소통 도움을 준비하시는 것이 좋습니다.',
      en: 'Located ~40–45 minutes by car from Sunset Town Clock Tower. As a public hospital, staff primarily speak Vietnamese, so prepare a translation app or local communication support.',
      zh: '距离日落小镇钟楼车程约 40~45 分钟。公立医院主要使用越语沟通，建议准备好翻译软件或寻求当地沟通协助。',
      ru: 'Находится в 40–45 минутах езды от Сансет-Тауна. Персонал говорит преимущественно по-вьетнамски, поэтому рекомендуем использовать переводчик.',
      ja: 'サンセットタウン時計塔から車で約40〜45分かかります。公立病院のためベトナム語対応が中心となりますので、翻訳アプリや現地サポートの準備を推奨します。',
      hi: 'सनसेट टाउन से कार द्वारा लगभग 40–45 मिनट दूर है। सरकारी अस्पताल होने के कारण मुख्य रूप से वियतनामी भाषा बोली जाती है।',
      vi: 'Cách Tháp Đồng Hồ khoảng 40–45 phút đi ô tô; bệnh viện công lập chủ yếu giao tiếp bằng tiếng Việt.',
    },
  },
  {
    id: 'vinmec-phu-quoc',
    kind: 'hospital',
    officialName: 'Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc',
    formerOrKnownName: {
      ko: '빈멕 푸꾸옥 국제종합병원 (북부 바이자이)',
      en: 'Vinmec Phu Quoc International Hospital (North Bai Dai)',
      zh: '富国岛 Vinmec 国际综合医院（北部长滩）',
      ru: 'Международный госпиталь Vinmec Phu Quoc (север острова, Бай-Зай)',
      ja: 'ビンメック・フーコック国際総合病院（北部バイザイ）',
      hi: 'विनमेक फ़ू क्वोक इंटरनेशनल हॉस्पिटल (उत्तरी बाई दाई)',
      vi: 'Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc (Bãi Dài, Gành Dầu)',
    },
    address: 'Khu Bãi Dài, Xã Gành Dầu, TP. Phú Quốc, Kiên Giang',
    phoneDisplay: '+84 297 3985 588',
    phoneTel: '+842973985588',
    placeId: 'ChIJa2b67gB5pzERpX9m0m5E0nE',
    lat: 10.3338,
    lng: 103.8569,
    googleMapsPlaceUrl:
      'https://www.google.com/maps/search/?api=1&query=B%E1%BB%87nh+vi%E1%BB%87n+%C4%90a+khoa+Qu%E1%BB%91c+t%E1%BA%BF+Vinmec+Ph%C3%BA+Qu%E1%BB%91c',
    googleMapsDirUrl:
      'https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.3338,103.8569&travelmode=driving',
    googleMapsPhotosUrl:
      'https://www.google.com/maps/search/?api=1&query=B%E1%BB%87nh+vi%E1%BB%87n+%C4%90a+khoa+Qu%E1%BB%91c+t%E1%BA%BF+Vinmec+Ph%C3%BA+Qu%E1%BB%91c',
    officialWebsiteUrl: 'https://www.vinmec.com/',
    verifiedAt: '2026-11-04',
    routeSummary: {
      ko: '약 47.7~48.4 km · 자동차 약 60~65분 (Đ. Nguyễn Văn Cừ/ĐT46 경유 — 북부 간저우 위치)',
      en: '~47.7–48.4 km · ~60–65 min by car (via Đ. Nguyễn Văn Cừ/ĐT46 — Northern Ganh Dau)',
      zh: '约 47.7~48.4 公里 · 车程约 60~65 分钟（经 Đ. Nguyễn Văn Cừ/ĐT46 — 位于北部 Gành Dầu）',
      ru: '~47,7–48,4 км · ~60–65 мин на авто (через Đ. Nguyễn Văn Cừ/ĐT46 — север острова, Гань-Зау)',
      ja: '約47.7〜48.4 km・車で約60〜65分（Đ. Nguyễn Văn Cừ/ĐT46経由 — 北部ガンダウ）',
      hi: '~47.7–48.4 किमी · कार से ~60–65 मिनट (Đ. Nguyễn Văn Cừ/ĐT46 होकर — उत्तरी गन्ह दाऊ)',
      vi: 'Khoảng 47,7–48,4 km · khoảng 60–65 phút đi ô tô (qua Đ. Nguyễn Văn Cừ/ĐT46 — khu vực Gành Dầu, Bắc đảo)',
    },
    operatingHours: {
      ko: '24시간 영업 (응급실 24/7 상시 운영 · 일반 외래 08:00–17:00)',
      en: 'Open 24 hours (24/7 Emergency Room · Outpatient 08:00–17:00)',
      zh: '24小时营业（急诊室 24/7 全天开放 · 普通门诊 08:00–17:00）',
      ru: 'Круглосуточно 24/7 (приёмное отделение 24/7 · поликлиника 08:00–17:00)',
      ja: '24時間営業（救急室24時間対応・一般外来 08:00〜17:00）',
      hi: '24 घंटे खुला (24/7 इमरजेंसी रूम · सामान्य ओपीडी 08:00–17:00)',
      vi: 'Mở cửa 24/24 (Cấp cứu 24/7 · Khám ngoại trú 08:00–17:00)',
    },
    emergencyCareConfirmed: {
      ko: '응급진료 확인됨: 24/7 응급실 및 중환자·수술 설비 운영 (vinmec.com 공식 확인)',
      en: 'Confirmed: 24/7 Emergency Department, ICU & Surgical Facilities (verified via vinmec.com)',
      zh: '已确认急诊服务：设有 24/7 急诊室、重症监护与手术设施（vinmec.com 官方核实）',
      ru: 'Экстренная помощь подтверждена: круглосуточное отделение неотложной помощи, реанимация и хирургия (vinmec.com)',
      ja: '救急診療確認済：24時間救急室およびICU・手術設備を運営（vinmec.com公式確認）',
      hi: 'आपातकालीन चिकित्सा पुष्ट: 24/7 इमरजेंसी विभाग, आईसीयू और सर्जरी सुविधा (vinmec.com द्वारा सत्यापित)',
      vi: 'Đã xác nhận cấp cứu: Khoa Cấp cứu 24/7, Hồi sức tích cực và Phẫu thuật (xác nhận trên vinmec.com)',
    },
    foreignLanguageConfirmed: {
      ko: '외국어 응대 확인됨: 영어 등 외국인 환자 진료·보험 서류 지원 안내 (vinmec.com 공식 안내)',
      en: 'Foreign Language Confirmed: English support & international insurance documentation (verified via vinmec.com)',
      zh: '已确认外语接待：提供英语等外籍患者诊疗及国际保险单据支持（vinmec.com 官方说明）',
      ru: 'Иностранные языки подтверждены: приём иностранных пациентов (английский язык) и оформление документов для страховки (vinmec.com)',
      ja: '外国語対応確認済：英語など外国人患者の診療および海外旅行保険書類サポート（vinmec.com公式案内）',
      hi: 'विदेशी भाषा सहायता पुष्ट: अंग्रेज़ी सहायता और अंतर्राष्ट्रीय बीमा दस्तावेज़ (vinmec.com द्वारा सत्यापित)',
      vi: 'Đã xác nhận hỗ trợ ngoại ngữ: Hỗ trợ bệnh nhân quốc tế (tiếng Anh) và hồ sơ bảo hiểm du lịch (vinmec.com)',
    },
    officialPhotoUrl: null,
    pros: {
      ko: '베트남 빈그룹(Vingroup) 계열 국제종합병원으로, 24시간 응급실·입원·수술 설비와 외국인 환자 영어 소통 및 해외 여행자보험 청구 서류 발급 체계가 공식 확인됩니다.',
      en: 'Part of the Vinmec Healthcare System (Vingroup), offering confirmed 24/7 emergency care, inpatient/surgical facilities, English-speaking support, and international travel insurance documentation.',
      zh: '越南 Vingroup 集团旗下的国际综合医院，官方确认具备 24 小时急诊、住院与手术能力，并提供英语接诊服务及完备的国际旅游保险理赔单据。',
      ru: 'Международный госпиталь сети Vinmec (Vingroup) с подтверждённым круглосуточным приёмным отделением, стационаром, поддержкой английского языка и опытом работы с международными страховками.',
      ja: 'ビングループ系列の国際総合病院で、24時間救急室・入院・手術設備、英語対応、海外旅行保険請求用の診断書・領収書発行体制が公式に確認されています。',
      hi: 'Vingroup का अंतर्राष्ट्रीय अस्पताल, जहाँ 24/7 इमरजेंसी, सर्जरी सुविधा, अंग्रेज़ी भाषा सहायता और अंतर्राष्ट्रीय यात्रा बीमा दस्तावेज़ की सुविधा पुष्ट है।',
      vi: 'Bệnh viện đa khoa quốc tế thuộc hệ thống Vinmec (Vingroup) với Khoa Cấp cứu 24/7, trang thiết bị phẫu thuật – nội trú đồng bộ, hỗ trợ tiếng Anh và thủ tục bảo hiểm quốc tế.',
    },
    cautions: {
      ko: '푸꾸옥 북부(간저우·바이자이)에 위치해 선셋타운 시계탑에서 자동차로 약 60~65분(약 48 km)이 소요됩니다. 남부에서 출발 시 거리와 이동 시간을 반드시 고려하고 출발 전 대표전화(0297 3985 588)로 먼저 연락하세요.',
      en: 'Located in northern Phu Quoc (Ganh Dau / Bai Dai), about 60–65 minutes (~48 km) by car from Sunset Town Clock Tower. Account for the travel time when departing from the south and call 0297 3985 588 ahead of arrival.',
      zh: '位于富国岛北部（Gành Dầu / 长滩），从日落小镇钟楼出发车程约需 60~65 分钟（约 48 公里）。从南部前往时请充分考虑路途时间，并提前致电 0297 3985 588。',
      ru: 'Находится на севере острова (Гань-Зау), поездка от Часовой башни Сансет-Тауна займёт около 60–65 минут (~48 км). Учитывайте время в пути и позвоните по номеру 0297 3985 588 перед выездом.',
      ja: 'フーコック島北部（ガンダウ・バイザイ）に位置するため、サンセットタウン時計塔から車で約60〜65分（約48 km）かかります。南部から向かう際は移動時間を考慮し、事前に電話(0297 3985 588)でご連絡ください。',
      hi: 'यह उत्तरी फ़ू क्वोक (गन्ह दाऊ) में स्थित है, जहाँ सनसेट टाउन से कार द्वारा लगभग 60–65 मिनट (~48 किमी) लगते हैं। रवाना होने से पहले 0297 3985 588 पर कॉल करें।',
      vi: 'Nằm ở Bắc đảo (Bãi Dài, Gành Dầu), cách Tháp Đồng Hồ Thị trấn Hoàng Hôn khoảng 60–65 phút đi ô tô (~48 km). Cần cân nhắc thời gian di chuyển và gọi trước số 0297 3985 588.',
    },
  },
]
