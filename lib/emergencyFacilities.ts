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
  /** Observed Google Maps driving estimate; never infer north-road access. */
  routeEvidence: Record<Locale, string>
  languageNote: Record<Locale, string>
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

// Rechecked against live Google Maps and linked primary sources on 2026-11-04.
export const PRIMARY_EMERGENCY_FACILITIES: EmergencyFacility[] = [
  {
    id: "sun-international-hospital",
    kind: "hospital",
    officialName: "Bệnh viện Quốc tế Mặt Trời Phú Quốc",
    formerOrKnownName: {
      ko: "썬 국제병원 푸꾸옥 (Sun Group International Hospital)",
      en: "Sun Group International Hospital Phu Quoc",
      zh: "富国岛太阳国际医院 (Sun Group International Hospital)",
      ru: "Международная больница Sun Group Фукуок",
      ja: "サングループ国際病院フーコック (Sun Group International Hospital)",
      hi: "सन ग्रुप इंटरनेशनल हॉस्पिटल फ़ू क्वोक",
      vi: "Sun Group International Hospital Phú Quốc"
    },
    address: "Khu đô thị An Thới, Khu phố 6, Phường An Thới, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "+84 297 3898 888",
    phoneTel: "+842973898888",
    placeId: "ChIJY8WHWACVpzERqhosrS9_k48",
    lat: 10.0388989,
    lng: 104.0067145,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJY8WHWACVpzERqhosrS9_k48",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0388989,104.0067145&destination_place_id=ChIJY8WHWACVpzERqhosrS9_k48&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJY8WHWACVpzERqhosrS9_k48",
    officialWebsiteUrl: "https://sunmedicare.com/en/customer-guide",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 6.4 km · 자동차 약 26분 (구글맵, 2026-11-04)",
      en: "~6.4 km · ~26 min by car (Google Maps, 2026-11-04)",
      zh: "约6.4公里 · 驾车约26分钟（Google 地图，2026-11-04）",
      ru: "~6.4 км · ~26 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約6.4 km・車で約26分（Googleマップ、2026-11-04）",
      hi: "~6.4 किमी · कार से ~26 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 6.4 km · khoảng 26 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "구글맵: 24시간 영업. 푸꾸옥 지점의 24시간 응급진료 운영은 이번 공식 출처에서 재확인하지 못했습니다.",
      en: "Google Maps: open 24 hours. Round-the-clock emergency care at this branch was not reverified from an official source.",
      zh: "Google 地图显示24小时营业；本次未能从官方来源再次确认该院全天急诊。",
      ru: "Google Карты: круглосуточно. Круглосуточная экстренная помощь этого филиала по официальному источнику повторно не подтверждена.",
      ja: "Googleマップ：24時間営業。この施設の24時間救急診療は公式情報で再確認できていません。",
      hi: "Google Maps: 24 घंटे खुला। इस शाखा की चौबीसों घंटे आपातकालीन सेवा की आधिकारिक पुनः पुष्टि नहीं हुई।",
      vi: "Google Maps: mở cửa 24 giờ. Chưa xác minh lại cấp cứu 24/7 tại cơ sở này từ nguồn chính thức."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  },
  {
    id: "dng-international-clinic-an-thoi",
    kind: "clinic",
    officialName: "Phòng khám Đa khoa Quốc tế DNG – Cơ sở An Thới",
    formerOrKnownName: {
      ko: "구 명칭: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      en: "Formerly: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      zh: "曾用名：Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      ru: "Прежнее название: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      ja: "旧名称：Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      hi: "पूर्व नाम: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới",
      vi: "Tên cũ: Phòng khám Đa khoa Quốc tế Sài Gòn – Phú Quốc, An Thới"
    },
    address: "S259 – S354, Khu đô thị Sun Grand City New An Thới, Phường An Thới, TP. Phú Quốc",
    phoneDisplay: "1900 3315",
    phoneTel: "19003315",
    placeId: "ChIJU2YY86iWpzERfGNTGD1eM6Q",
    lat: 10.0362796,
    lng: 104.0090037,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJU2YY86iWpzERfGNTGD1eM6Q",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0362796,104.0090037&destination_place_id=ChIJU2YY86iWpzERfGNTGD1eM6Q&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJU2YY86iWpzERfGNTGD1eM6Q",
    officialWebsiteUrl: "https://dngclinic.com/lien-he/",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 6.6 km · 자동차 약 27분 (구글맵, 2026-11-04)",
      en: "~6.6 km · ~27 min by car (Google Maps, 2026-11-04)",
      zh: "约6.6公里 · 驾车约27分钟（Google 地图，2026-11-04）",
      ru: "~6.6 км · ~27 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約6.6 km・車で約27分（Googleマップ、2026-11-04）",
      hi: "~6.6 किमी · कार से ~27 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 6.6 km · khoảng 27 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "공식: 매일 07:30–11:30, 13:30–18:30. 지도: 18:00 마감으로 상충하므로 전화 확인 필요.",
      en: "Official: daily 07:30–11:30, 13:30–18:30. Maps shows an 18:00 closing time; call to resolve the discrepancy.",
      zh: "官方：每日07:30–11:30、13:30–18:30。地图显示18:00关门，信息冲突，请电话确认。",
      ru: "Официально: ежедневно 07:30–11:30, 13:30–18:30. На карте закрытие в 18:00; уточните по телефону.",
      ja: "公式：毎日07:30〜11:30、13:30〜18:30。地図は18:00閉院と表示されるため電話確認が必要です。",
      hi: "आधिकारिक: प्रतिदिन 07:30–11:30, 13:30–18:30। Maps पर बंद होने का समय 18:00 है; कॉल करके पुष्टि करें।",
      vi: "Chính thức: hằng ngày 07:30–11:30, 13:30–18:30. Maps ghi đóng cửa 18:00; cần gọi xác nhận vì thông tin khác nhau."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  },
  {
    id: "sos-clinic-an-thoi",
    kind: "clinic",
    officialName: "Phòng khám Đa khoa S.O.S Phú Quốc – Cơ sở 2 (An Thới)",
    formerOrKnownName: {
      ko: "구글맵 표기: Phòng khám đa khoa SOS An Thới Phú Quốc",
      en: "Google Maps name: Phòng khám đa khoa SOS An Thới Phú Quốc",
      zh: "谷歌地图名称：Phòng khám đa khoa SOS An Thới Phú Quốc",
      ru: "Название на Google Картах: Phòng khám đa khoa SOS An Thới Phú Quốc",
      ja: "Googleマップ表記：Phòng khám đa khoa SOS An Thới Phú Quốc",
      hi: "Google Maps नाम: Phòng khám đa khoa SOS An Thới Phú Quốc",
      vi: "Tên trên Google Maps: Phòng khám đa khoa SOS An Thới Phú Quốc"
    },
    address: "243 Nguyễn Văn Cừ, Tổ 6, Khu phố 8, An Thới, Đặc khu Phú Quốc, An Giang",
    phoneDisplay: "+84 297 3992 115",
    phoneTel: "+842973992115",
    placeId: "ChIJt4aBPTKXpzERXxwyYMJ_UEs",
    lat: 10.0255321,
    lng: 104.0170654,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJt4aBPTKXpzERXxwyYMJ_UEs",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0255321,104.0170654&destination_place_id=ChIJt4aBPTKXpzERXxwyYMJ_UEs&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJt4aBPTKXpzERXxwyYMJ_UEs",
    officialWebsiteUrl: "https://phongkhamdakhoasos.com/",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 8.8 km · 자동차 약 29분 (구글맵, 2026-11-04)",
      en: "~8.8 km · ~29 min by car (Google Maps, 2026-11-04)",
      zh: "约8.8公里 · 驾车约29分钟（Google 地图，2026-11-04）",
      ru: "~8.8 км · ~29 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約8.8 km・車で約29分（Googleマップ、2026-11-04）",
      hi: "~8.8 किमी · कार से ~29 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 8.8 km · khoảng 29 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "공식 사이트: 07:30–11:30, 13:30–17:30. 지점별 당일 진료는 전화 확인 필요 (지도 시간 미기재).",
      en: "Official site: 07:30–11:30, 13:30–17:30. Call to confirm branch hours today; Maps has no hours listed.",
      zh: "官网：07:30–11:30、13:30–17:30。地图未列时间，请致电确认分院当天接诊。",
      ru: "На официальном сайте: 07:30–11:30, 13:30–17:30. Часы филиала уточняйте по телефону; на карте они не указаны.",
      ja: "公式サイト：07:30〜11:30、13:30〜17:30。地図に時間の記載がないため、当日の分院診療は電話確認が必要です。",
      hi: "आधिकारिक साइट: 07:30–11:30, 13:30–17:30। शाखा के आज के समय की फोन पर पुष्टि करें; Maps में समय नहीं है।",
      vi: "Website chính thức: 07:30–11:30, 13:30–17:30. Gọi xác nhận lịch khám tại cơ sở trong ngày; Maps chưa ghi giờ."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "공식 지점 번호 0297 3992 115 (추가: 0824 988 115). 지도에는 다른 번호(0328 219 764)와 Khu 3 주소가 남아 있습니다. 방문 전 공식 번호로 지점·진료를 확인하세요.",
      en: "Official branch numbers: 0297 3992 115 and 0824 988 115. Maps retains 0328 219 764 and Khu 3. Confirm the branch and care via the official number before visiting.",
      zh: "官方分院电话：0297 3992 115、0824 988 115。地图仍列0328 219 764及Khu 3地址，请先拨官方电话确认分院及诊疗。",
      ru: "Официальные номера филиала: 0297 3992 115 и 0824 988 115. На карте остаются 0328 219 764 и Khu 3. Перед визитом уточните филиал и приём по официальному номеру.",
      ja: "公式分院番号：0297 3992 115、0824 988 115。地図には0328 219 764とKhu 3が残っています。来院前に公式番号で施設と診療を確認してください。",
      hi: "शाखा के आधिकारिक नंबर: 0297 3992 115 और 0824 988 115। Maps में 0328 219 764 और Khu 3 है। जाने से पहले आधिकारिक नंबर पर शाखा और चिकित्सा की पुष्टि करें।",
      vi: "Số chính thức của cơ sở: 0297 3992 115 và 0824 988 115. Maps vẫn ghi 0328 219 764 và Khu 3. Hãy gọi số chính thức để xác nhận cơ sở và dịch vụ trước khi đến."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  },
  {
    id: "pharmacy-amalfi-67",
    kind: "pharmacy",
    officialName: "Pharmacy Amalfi 67 (Nhà thuốc Amalfi 67 Sunset Town)",
    address: "Căn Amalfi 67, Sunset Town, Phường An Thới, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "+84 868 681 994",
    phoneTel: "+84868681994",
    placeId: "ChIJgeZqD5SVpzERoy7NGQ43Sy8",
    lat: 10.0325402,
    lng: 104.0051013,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0325402,104.0051013&destination_place_id=ChIJgeZqD5SVpzERoy7NGQ43Sy8&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJgeZqD5SVpzERoy7NGQ43Sy8",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 0.7 km · 자동차 약 3분 (구글맵, 2026-11-04)",
      en: "~0.7 km · ~3 min by car (Google Maps, 2026-11-04)",
      zh: "约0.7公里 · 驾车约3分钟（Google 地图，2026-11-04）",
      ru: "~0.7 км · ~3 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約0.7 km・車で約3分（Googleマップ、2026-11-04）",
      hi: "~0.7 किमी · कार से ~3 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 0.7 km · khoảng 3 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "구글맵 확인일 표시: 23:30 마감. 요일별 전체 운영시간은 전화로 확인하세요.",
      en: "Google Maps on the check date: closes 23:30. Call for the full schedule for your visit.",
      zh: "核查当天Google 地图显示23:30关门，完整营业时间请致电确认。",
      ru: "На дату проверки Google Карты: закрытие в 23:30. Полное расписание уточняйте по телефону.",
      ja: "確認日のGoogleマップ表示：23:30閉店。曜日別の営業時間は電話で確認してください。",
      hi: "जाँच के दिन Google Maps: 23:30 बजे बंद। पूरा समय फोन पर पूछें।",
      vi: "Google Maps tại ngày kiểm tra: đóng cửa 23:30. Gọi để xác nhận lịch hoạt động đầy đủ."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  },
  {
    id: "fpt-long-chau-46-nvc",
    kind: "pharmacy",
    officialName: "Nhà thuốc FPT Long Châu — 46 Nguyễn Văn Cừ",
    address: "46 Nguyễn Văn Cừ, Phường An Thới, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "1800 6928",
    phoneTel: "18006928",
    placeId: "ChIJY5o0asSXpzERJEewEY1Dy9U",
    lat: 10.0182266,
    lng: 104.0146462,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0182266,104.0146462&destination_place_id=ChIJY5o0asSXpzERJEewEY1Dy9U&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJY5o0asSXpzERJEewEY1Dy9U",
    officialWebsiteUrl: "https://nhathuoclongchau.com.vn/he-thong-cua-hang/46-nguyen-van-cu-p-an-thoi-tp-phu-quoc-tinh-kien-giang",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 9.7 km · 자동차 약 32분 (구글맵, 2026-11-04)",
      en: "~9.7 km · ~32 min by car (Google Maps, 2026-11-04)",
      zh: "约9.7公里 · 驾车约32分钟（Google 地图，2026-11-04）",
      ru: "~9.7 км · ~32 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約9.7 km・車で約32分（Googleマップ、2026-11-04）",
      hi: "~9.7 किमी · कार से ~32 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 9.7 km · khoảng 32 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "구글맵 확인일 표시: 21:00 마감. 요일별 전체 운영시간은 전화로 확인하세요.",
      en: "Google Maps on the check date: closes 21:00. Call for the full schedule for your visit.",
      zh: "核查当天Google 地图显示21:00关门，完整营业时间请致电确认。",
      ru: "На дату проверки Google Карты: закрытие в 21:00. Полное расписание уточняйте по телефону.",
      ja: "確認日のGoogleマップ表示：21:00閉店。曜日別の営業時間は電話で確認してください。",
      hi: "जाँच के दिन Google Maps: 21:00 बजे बंद। पूरा समय फोन पर पूछें।",
      vi: "Google Maps tại ngày kiểm tra: đóng cửa 21:00. Gọi để xác nhận lịch hoạt động đầy đủ."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  },
  {
    id: "an-khang-pharmacy-an-thoi",
    kind: "pharmacy",
    officialName: "Nhà thuốc An Khang — Nguyễn Văn Cừ (Khu phố 3, An Thới)",
    address: "Đ. Nguyễn Văn Cừ, Khu phố 3, Phường An Thới, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "1900 1572",
    phoneTel: "19001572",
    placeId: "ChIJuYW74Y2XpzERIbXTGTiotEU",
    lat: 10.0188201,
    lng: 104.0152307,
    googleMapsPlaceUrl: "https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.0188201,104.0152307&destination_place_id=ChIJuYW74Y2XpzERIbXTGTiotEU&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/place/?q=place_id:ChIJuYW74Y2XpzERIbXTGTiotEU",
    officialWebsiteUrl: "https://www.nhathuocankhang.com/tin-khuyen-mai/09-10-11-10-gio-vang-gia-soc-khuyen-mai-ngap-tran-1599697",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 9.6 km · 자동차 약 32분 (구글맵, 2026-11-04)",
      en: "~9.6 km · ~32 min by car (Google Maps, 2026-11-04)",
      zh: "约9.6公里 · 驾车约32分钟（Google 地图，2026-11-04）",
      ru: "~9.6 км · ~32 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約9.6 km・車で約32分（Googleマップ、2026-11-04）",
      hi: "~9.6 किमी · कार से ~32 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 9.6 km · khoảng 32 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "구글맵 확인일 표시: 21:30 마감. 요일별 전체 운영시간은 전화로 확인하세요.",
      en: "Google Maps on the check date: closes 21:30. Call for the full schedule for your visit.",
      zh: "核查当天Google 地图显示21:30关门，完整营业时间请致电确认。",
      ru: "На дату проверки Google Карты: закрытие в 21:30. Полное расписание уточняйте по телефону.",
      ja: "確認日のGoogleマップ表示：21:30閉店。曜日別の営業時間は電話で確認してください。",
      hi: "जाँच के दिन Google Maps: 21:30 बजे बंद। पूरा समय फोन पर पूछें।",
      vi: "Google Maps tại ngày kiểm tra: đóng cửa 21:30. Gọi để xác nhận lịch hoạt động đầy đủ."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    }
  }
]

export const REFERENCE_MAJOR_HOSPITALS: EmergencyFacility[] = [
  {
    id: "phu-quoc-medical-center",
    kind: "hospital",
    officialName: "Trung tâm Y tế thành phố Phú Quốc",
    formerOrKnownName: {
      ko: "푸꾸옥 시립 의료센터 (즈엉동 공공 종합병원)",
      en: "Phu Quoc City Medical Center (Duong Dong Public Hospital)",
      zh: "富国市医疗中心（阳东公立医院）",
      ru: "Городской медицинский центр Фукуока (государственная больница в Зыонгдонге)",
      ja: "フーコック市立医療センター（ズオンドン公立病院）",
      hi: "फ़ू क्वोक सिटी मेडिकल सेंटर (डुओंग डोंग सरकारी अस्पताल)",
      vi: "Trung tâm Y tế TP. Phú Quốc (Dương Đông)"
    },
    address: "128 Đường 30/4, Khu phố 1, Phường Dương Đông, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "+84 297 3846 972",
    phoneTel: "+842973846972",
    placeId: "",
    lat: 10.2150242,
    lng: 103.96767,
    googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+Y+t%E1%BA%BF+th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c+128+%C4%90%C6%B0%E1%BB%9Dng+30%2F4",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.2150242,103.96767&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+Y+t%E1%BA%BF+th%C3%A0nh+ph%E1%BB%91+Ph%C3%BA+Qu%E1%BB%91c+128+%C4%90%C6%B0%E1%BB%9Dng+30%2F4",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 28.8 km · 자동차 약 59분 (구글맵, 2026-11-04)",
      en: "~28.8 km · ~59 min by car (Google Maps, 2026-11-04)",
      zh: "约28.8公里 · 驾车约59分钟（Google 地图，2026-11-04）",
      ru: "~28.8 км · ~59 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約28.8 km・車で約59分（Googleマップ、2026-11-04）",
      hi: "~28.8 किमी · कार से ~59 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 28.8 km · khoảng 59 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "구글맵: 24시간 영업. 공식 사이트 접근 불가로 24시간 응급진료·외래 시간은 미확인.",
      en: "Google Maps: open 24 hours. Official site unavailable; emergency and outpatient schedules remain unconfirmed.",
      zh: "Google 地图显示24小时营业。官网无法访问，急诊及门诊时间未确认。",
      ru: "Google Карты: круглосуточно. Официальный сайт недоступен; график экстренной и амбулаторной помощи не подтверждён.",
      ja: "Googleマップ：24時間営業。公式サイトにアクセスできず、救急・外来の時間は未確認です。",
      hi: "Google Maps: 24 घंटे खुला। आधिकारिक साइट उपलब्ध नहीं; आपातकालीन और ओपीडी का समय अपुष्ट है।",
      vi: "Google Maps: mở cửa 24 giờ. Không truy cập được website chính thức; chưa xác nhận lịch cấp cứu và ngoại trú."
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "외국어 응대·통역은 미확인입니다. 필요한 언어를 방문 전 확인하세요.",
      en: "Foreign-language support and interpretation are unconfirmed. Ask about your language before visiting.",
      zh: "外语接待及口译服务未确认，请提前询问所需语言。",
      ru: "Поддержка иностранных языков и перевод не подтверждены. Уточните нужный язык заранее.",
      ja: "外国語対応・通訳は未確認です。必要な言語を事前に確認してください。",
      hi: "विदेशी भाषा और दुभाषिया सहायता की पुष्टि नहीं है। जाने से पहले आवश्यक भाषा के बारे में पूछें।",
      vi: "Chưa xác nhận hỗ trợ ngoại ngữ hoặc phiên dịch. Hãy hỏi trước về ngôn ngữ cần dùng."
    },
    officialWebsiteUrl: "http://ttyttpphuquoc.vn/"
  },
  {
    id: "vinmec-phu-quoc",
    kind: "hospital",
    officialName: "Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc",
    formerOrKnownName: {
      ko: "빈멕 푸꾸옥 국제종합병원 (북부 바이자이)",
      en: "Vinmec Phu Quoc International Hospital (North Bai Dai)",
      zh: "富国岛 Vinmec 国际综合医院（北部长滩）",
      ru: "Международный госпиталь Vinmec Phu Quoc (север острова, Бай-Зай)",
      ja: "ビンメック・フーコック国際総合病院（北部バイザイ）",
      hi: "विनमेक फ़ू क्वोक इंटरनेशनल हॉस्पिटल (उत्तरी बाई दाई)",
      vi: "Bệnh viện Đa khoa Quốc tế Vinmec Phú Quốc (Bãi Dài, Gành Dầu)"
    },
    address: "Khu Bãi Dài, Xã Gành Dầu, TP. Phú Quốc, Kiên Giang",
    phoneDisplay: "+84 297 3985 588",
    phoneTel: "+842973985588",
    placeId: "",
    lat: 10.3363672,
    lng: 103.8568577,
    googleMapsPlaceUrl: "https://www.google.com/maps/search/?api=1&query=B%E1%BB%87nh+vi%E1%BB%87n+%C4%90a+khoa+Qu%E1%BB%91c+t%E1%BA%BF+Vinmec+Ph%C3%BA+Qu%E1%BB%91c",
    googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&origin=10.0292527,104.0074202&destination=10.3363672,103.8568577&travelmode=driving",
    googleMapsPhotosUrl: "https://www.google.com/maps/search/?api=1&query=B%E1%BB%87nh+vi%E1%BB%87n+%C4%90a+khoa+Qu%E1%BB%91c+t%E1%BA%BF+Vinmec+Ph%C3%BA+Qu%E1%BB%91c",
    officialWebsiteUrl: "https://www.vinmec.com/eng/hospital/vinmec-phu-quoc-hospital",
    verifiedAt: "2026-11-04",
    routeSummary: {
      ko: "약 49.5 km · 자동차 약 81분 (구글맵, 2026-11-04)",
      en: "~49.5 km · ~81 min by car (Google Maps, 2026-11-04)",
      zh: "约49.5公里 · 驾车约81分钟（Google 地图，2026-11-04）",
      ru: "~49.5 км · ~81 мин на автомобиле (Google Карты, 2026-11-04)",
      ja: "約49.5 km・車で約81分（Googleマップ、2026-11-04）",
      hi: "~49.5 किमी · कार से ~81 मिनट (Google Maps, 2026-11-04)",
      vi: "Khoảng 49.5 km · khoảng 81 phút đi ô tô (Google Maps, 2026-11-04)"
    },
    operatingHours: {
      ko: "공식: 응급·소생과 24시간, 매일 운영. 일반 외래 시간은 전화 확인.",
      en: "Official: Emergency Resuscitation Department operates 24 hours, every day. Call for outpatient hours.",
      zh: "官方：急诊复苏科每天24小时运行，普通门诊时间请电话确认。",
      ru: "Официально: отделение неотложной помощи и реанимации работает круглосуточно ежедневно. Часы амбулаторного приёма уточняйте.",
      ja: "公式：救急・蘇生科は毎日24時間対応。一般外来の時間は電話確認。",
      hi: "आधिकारिक: आपातकालीन और पुनर्जीवन विभाग प्रतिदिन 24 घंटे। ओपीडी का समय फोन पर पूछें।",
      vi: "Chính thức: Khoa Cấp cứu – Hồi sức hoạt động 24 giờ mỗi ngày. Gọi hỏi giờ khám ngoại trú."
    },
    emergencyCareConfirmed: {
      ko: "응급진료 확인됨: 24/7 응급실 및 중환자·수술 설비 운영 (vinmec.com 공식 확인)",
      en: "Confirmed: 24/7 Emergency Department, ICU & Surgical Facilities (verified via vinmec.com)",
      zh: "已确认急诊服务：设有 24/7 急诊室、重症监护与手术设施（vinmec.com 官方核实）",
      ru: "Экстренная помощь подтверждена: круглосуточное отделение неотложной помощи, реанимация и хирургия (vinmec.com)",
      ja: "救急診療確認済：24時間救急室およびICU・手術設備を運営（vinmec.com公式確認）",
      hi: "आपातकालीन चिकित्सा पुष्ट: 24/7 इमरजेंसी विभाग, आईसीयू और सर्जरी सुविधा (vinmec.com द्वारा सत्यापित)",
      vi: "Đã xác nhận cấp cứu: Khoa Cấp cứu 24/7, Hồi sức tích cực và Phẫu thuật (xác nhận trên vinmec.com)"
    },
    officialPhotoUrl: null,
    pros: {
      ko: "위 주소와 지도에서 위치를 확인하고 표시된 전화번호로 연락할 수 있습니다.",
      en: "Use the address and map to locate the facility and the listed number to contact it.",
      zh: "可根据地址和地图查找位置，并通过所列电话联系。",
      ru: "Адрес и карта помогут найти учреждение; для связи указан телефон.",
      ja: "住所と地図で所在地を確認し、掲載の電話番号へ連絡できます。",
      hi: "पते और मानचित्र से स्थान देखें और दिए गए नंबर पर संपर्क करें।",
      vi: "Có thể xem vị trí theo địa chỉ và bản đồ, rồi liên hệ qua số điện thoại được niêm yết."
    },
    cautions: {
      ko: "당일 운영시간과 필요한 진료·약품의 제공 여부는 직접 전화로 확인하세요.",
      en: "Call directly to confirm today’s hours and the care or medicines you need.",
      zh: "请直接致电确认当天营业时间及所需诊疗或药品。",
      ru: "Позвоните напрямую, чтобы уточнить часы работы и нужные услуги или лекарства.",
      ja: "当日の営業時間と必要な診療・薬の取扱いは直接電話で確認してください。",
      hi: "आज का समय और आवश्यक चिकित्सा या दवा की उपलब्धता के लिए सीधे कॉल करें।",
      vi: "Gọi trực tiếp để xác nhận giờ hoạt động trong ngày và dịch vụ khám hoặc thuốc cần tìm."
    },
    routeEvidence: {
      ko: "구글맵 자동차 경로 표시 기준 (2026-11-04). 북측 도로 통행은 미확인입니다. 경로에 통행 제한·사유지 경고가 있으므로 출발 전 기사와 확인하세요.",
      en: "Google Maps driving estimate (2026-11-04). North-road access is unconfirmed. Routes carry restricted-access/private-road warnings; check with your driver before departure.",
      zh: "Google 地图驾车估算（2026-11-04）。北侧道路通行情况未确认，路线含限行或私人道路警告，出发前请与司机确认。",
      ru: "Оценка Google Карт для автомобиля (2026-11-04). Проезд по северной дороге не подтверждён. Есть предупреждения об ограниченном проезде или частной территории; уточните маршрут у водителя.",
      ja: "Googleマップの車ルート表示（2026-11-04）。北側道路の通行可否は未確認です。通行制限・私道の警告があるため、出発前に運転手へ確認してください。",
      hi: "Google Maps का ड्राइविंग अनुमान (2026-11-04)। उत्तरी सड़क पर आवागमन की पुष्टि नहीं है। रास्ते में प्रतिबंधित या निजी सड़क की चेतावनी है; निकलने से पहले चालक से पुष्टि करें।",
      vi: "Ước tính tuyến ô tô trên Google Maps (2026-11-04). Chưa xác nhận khả năng lưu thông đường phía bắc. Tuyến có cảnh báo hạn chế lưu thông hoặc đường riêng; hãy xác nhận với tài xế trước khi đi."
    },
    languageNote: {
      ko: "공식 지점 안내: 영어·러시아어 현장 통역 제공. 방문 시간대의 가능 여부는 전화 확인.",
      en: "Official branch page: on-site English and Russian interpretation. Call to confirm availability at your visit time.",
      zh: "官方分院介绍：提供英语和俄语现场口译，请电话确认到访时能否安排。",
      ru: "Официальная страница филиала: очный перевод на английский и русский. Уточните доступность на время визита.",
      ja: "公式分院案内：英語・ロシア語の院内通訳。来院時の対応可否は電話確認。",
      hi: "आधिकारिक शाखा पृष्ठ: अंग्रेज़ी और रूसी में मौके पर दुभाषिया सेवा। अपनी यात्रा के समय उपलब्धता फोन पर पूछें।",
      vi: "Trang chính thức của cơ sở: có phiên dịch tại chỗ bằng tiếng Anh và tiếng Nga. Gọi xác nhận khả năng hỗ trợ vào giờ đến."
    },
    foreignLanguageConfirmed: {
      ko: "공식 지점 안내: 영어·러시아어 현장 통역 제공. 방문 시간대의 가능 여부는 전화 확인.",
      en: "Official branch page: on-site English and Russian interpretation. Call to confirm availability at your visit time.",
      zh: "官方分院介绍：提供英语和俄语现场口译，请电话确认到访时能否安排。",
      ru: "Официальная страница филиала: очный перевод на английский и русский. Уточните доступность на время визита.",
      ja: "公式分院案内：英語・ロシア語の院内通訳。来院時の対応可否は電話確認。",
      hi: "आधिकारिक शाखा पृष्ठ: अंग्रेज़ी और रूसी में मौके पर दुभाषिया सेवा। अपनी यात्रा के समय उपलब्धता फोन पर पूछें।",
      vi: "Trang chính thức của cơ sở: có phiên dịch tại chỗ bằng tiếng Anh và tiếng Nga. Gọi xác nhận khả năng hỗ trợ vào giờ đến."
    }
  }
]
