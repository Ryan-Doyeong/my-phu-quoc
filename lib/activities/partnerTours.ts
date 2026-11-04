export type L = {
  ko: string;
  en: string;
  zh?: string;
  ja?: string;
  ru?: string;
  hi?: string;
  vi?: string;
};

export type PartnerOperator = 'johns' | 'redriver';

export type PartnerTourCategory =
  | 'hopping'
  | 'cablecar'
  | 'fishing'
  | 'sunset'
  | 'diving'
  | 'land'
  | 'camping';

export interface PartnerTourVariant {
  label: L;
  adultVnd: number;
  childVnd?: number;
  childNote?: L;
}

export interface PartnerTour {
  id: string;
  operator: PartnerOperator;
  code: string;
  category: PartnerTourCategory;
  title: L;
  summary: L;
  variants: PartnerTourVariant[];
  priceAsOf: string;
  notes?: L[];
  /** true면 사이트에 노출하지 않음(데이터는 보존) */
  hidden?: boolean;
}

export interface PickupSurchargeItem {
  area: L;
  surchargePerPersonVnd?: number;
  note?: L;
}

export interface PartnerOperatorInfo {
  operator: PartnerOperator;
  name: L;
  legalName?: string;
  priceAsOf: string;
  priceAsOfNote: L;
  departureSchedule: L;
  included: L[];
  excluded: L[];
  childPolicy: L[];
  pickupSurcharges: {
    standard: PickupSurchargeItem[];
    specialByTourCode?: Record<string, PickupSurchargeItem[]>;
  };
  cancellationPolicy: L[];
  unverifiedItems: L[];
}

export const PARTNER_INFO: Record<PartnerOperator, PartnerOperatorInfo> = {
  johns: {
    operator: 'johns',
    name: {
      ko: "John's Tours Phú Quốc",
      en: "John's Tours Phú Quốc",
      vi: "John's Tours Phú Quốc",
    },
    priceAsOf: '2025-04-16',
    priceAsOfNote: {
      ko: '가격 기준일: 2025-04-16 (최신 여부 미확인)',
      en: 'Price as of: 2025-04-16 (current validity unverified)',
      vi: 'Giá theo bảng giá ngày 16/04/2025 (chưa xác nhận hiệu lực hiện tại)',
    },
    departureSchedule: {
      ko: '미확인',
      en: 'Unverified',
      vi: 'Chưa xác nhận',
    },
    included: [
      {
        ko: '미확인 (투어 옵션에 명시된 사항을 제외한 세부 포함 내역은 원본에 없음)',
        en: 'Unverified (inclusion details are not provided in the source, except where specified in tour options)',
        vi: 'Chưa xác nhận (bản gốc không nêu chi tiết các dịch vụ bao gồm, ngoại trừ những mục được ghi rõ trong các lựa chọn tour)',
      },
    ],
    excluded: [
      {
        ko: '미확인',
        en: 'Unverified',
        vi: 'Chưa xác nhận',
      },
    ],
    childPolicy: [
      {
        ko: '일반 투어 어린이 기준: 5~9세',
        en: 'Child fare eligibility for standard tours: 5–9 years old',
        vi: 'Độ tuổi áp dụng giá trẻ em cho tour thông thường: 5–9 tuổi',
      },
      {
        ko: '케이블카 포함 투어 어린이 기준: 키 1m~1.4m',
        en: 'Child fare eligibility for cable car tours: Height 1m–1.4m',
        vi: 'Chiều cao áp dụng giá trẻ em cho tour có cáp treo: 1m–1.4m',
      },
      {
        ko: 'Sea walker(해저 걷기): 어린이도 성인과 동일 요금 (1,250,000 VND)',
        en: 'Sea walker: Child fare is the same as adult fare (1,250,000 VND)',
        vi: 'Đi bộ dưới đáy biển (Sea walker): Giá trẻ em bằng giá người lớn (1.250.000 VND)',
      },
      {
        ko: '그 외 연령/신장 규정(5세 미만, 9세 초과, 1m 미만, 1.4m 초과 등): 미확인',
        en: 'Other age/height rules (under 5, over 9, under 1m, over 1.4m, etc.): Unverified',
        vi: 'Quy định độ tuổi/chiều cao khác (dưới 5 tuổi, trên 9 tuổi, dưới 1m, trên 1.4m, v.v.): Chưa xác nhận',
      },
    ],
    pickupSurcharges: {
      standard: [
        {
          area: {
            ko: '전 지역 픽업 규정 및 추가 요금 미확인',
            en: 'Pickup rules and surcharges for all areas unverified',
            vi: 'Chưa xác nhận quy định đưa đón và phụ phí tại tất cả các khu vực',
          },
        },
      ],
    },
    cancellationPolicy: [
      {
        ko: '미확인',
        en: 'Unverified',
        vi: 'Chưa xác nhận',
      },
    ],
    unverifiedItems: [
      {
        ko: '2025-04-16 가격표의 현재 시점 최신 유효 여부 미확인',
        en: 'Current validity of the 2025-04-16 price list is unverified',
        vi: 'Chưa xác nhận hiệu lực hiện tại của bảng giá ngày 16/04/2025',
      },
      {
        ko: '5~9세 및 키 1~1.4m 외 연령·신장 구간 규정 미확인',
        en: 'Age and height policies outside 5–9 years old and 1–1.4m height are unverified',
        vi: 'Quy định độ tuổi và chiều cao ngoài khoảng 5–9 tuổi và 1–1.4m chưa xác nhận',
      },
      {
        ko: '투어별 세부 포함/불포함 내역 미확인',
        en: 'Detailed inclusions and exclusions per tour are unverified',
        vi: 'Chi tiết bao gồm và không bao gồm của từng tour chưa xác nhận',
      },
      {
        ko: '픽업/드롭 규정 및 지역별 추가 픽업비 미확인',
        en: 'Pickup/drop-off policies and regional surcharges are unverified',
        vi: 'Quy định đưa đón và phụ phí theo khu vực chưa xác nhận',
      },
      {
        ko: '취소 및 환불 규정 미확인',
        en: 'Cancellation and refund policies are unverified',
        vi: 'Chính sách hủy và hoàn tiền chưa xác nhận',
      },
      {
        ko: '세부 일정, 출발 시간, 소요 시간 미확인',
        en: 'Detailed itinerary, departure time, and duration are unverified',
        vi: 'Lịch trình chi tiết, giờ khởi hành và thời lượng chưa xác nhận',
      },
    ],
  },
  redriver: {
    operator: 'redriver',
    name: {
      ko: 'Red River Tour',
      en: 'Red River Tour',
      vi: 'Red River Tour',
    },
    legalName: 'Công ty TNHH DV DL TM D và M Phú Quốc',
    priceAsOf: '2026-10-04',
    priceAsOfNote: {
      ko: '가격 기준일: 2026-10-04',
      en: 'Price as of: 2026-10-04',
      vi: 'Giá theo bảng giá ngày 04/10/2026',
    },
    departureSchedule: {
      ko: '모든 투어 매일 출발',
      en: 'All tours depart daily',
      vi: 'Tất cả các tour khởi hành hàng ngày',
    },
    included: [
      {
        ko: '즈엉동(Dương Đông) 중심가 무료 픽업·드롭',
        en: 'Free pickup & drop-off in central Dương Đông',
        vi: 'Miễn phí đón và trả khách tại trung tâm Dương Đông',
      },
      {
        ko: '가이드',
        en: 'Tour guide',
        vi: 'Hướng dẫn viên',
      },
      {
        ko: '생수 500ml',
        en: 'Mineral water (500ml)',
        vi: 'Nước suối (500ml)',
      },
      {
        ko: '스노클링·다이빙 장비',
        en: 'Snorkeling and diving equipment',
        vi: 'Dụng cụ lặn ngắm san hô/lặn biển',
      },
      {
        ko: '낚시 도구 (해당 투어)',
        en: 'Fishing gear (for applicable tours)',
        vi: 'Dụng cụ câu cá (đối với các tour áp dụng)',
      },
      {
        ko: '입장료',
        en: 'Entrance fees',
        vi: 'Vé tham quan',
      },
      {
        ko: '식사 (식사 포함 투어)',
        en: 'Meals (for tours with meals included)',
        vi: 'Bữa ăn (đối với các tour có bao gồm bữa ăn)',
      },
      {
        ko: '여행자보험 (최대 30,000,000 VND/건)',
        en: 'Travel insurance (coverage up to 30,000,000 VND per case)',
        vi: 'Bảo hiểm du lịch (tối đa 30.000.000 VND/trường hợp)',
      },
    ],
    excluded: [
      {
        ko: '즈엉동(Dương Đông) 중심가 밖 픽업비',
        en: 'Pickup surcharge outside central Dương Đông',
        vi: 'Phí đón trả ngoài khu vực trung tâm Dương Đông',
      },
      {
        ko: '투어 프로그램에 포함되지 않은 기타 비용',
        en: 'Other expenses not included in the tour program',
        vi: 'Các chi phí khác không bao gồm trong chương trình tour',
      },
      {
        ko: '부가세(VAT)',
        en: 'Value Added Tax (VAT)',
        vi: 'Thuế GTGT (VAT)',
      },
    ],
    childPolicy: [
      {
        ko: '키 100cm 미만: 무료 (가족이 돌봄)',
        en: 'Under 100cm: Free of charge (family responsible for care)',
        vi: 'Dưới 100cm: Miễn phí (gia đình tự chăm sóc)',
      },
      {
        ko: '키 100cm 이상 ~ 140cm 미만: 어린이 요금',
        en: 'Height 100cm to under 140cm: Child fare',
        vi: 'Chiều cao từ 100cm đến dưới 140cm: Giá vé trẻ em',
      },
      {
        ko: '키 140cm 이상: 성인 요금',
        en: 'Height 140cm and above: Adult fare',
        vi: 'Chiều cao từ 140cm trở lên: Giá vé người lớn',
      },
      {
        ko: 'RED 3 (스쿠버다이빙 / 씨워커): 어린이 요금 해당 없음',
        en: 'RED 3 (Scuba Diving / Sea Walker): Child fare not applicable',
        vi: 'RED 3 (Lặn bình khí / Đi bộ dưới biển): Không áp dụng giá trẻ em',
      },
    ],
    pickupSurcharges: {
      standard: [
        {
          area: {
            ko: '옹랑 (Ông Lang)',
            en: 'Ông Lang',
            vi: 'Ông Lang',
          },
          surchargePerPersonVnd: 100000,
        },
        {
          area: {
            ko: '끄어깐 · 븡버우 (Cửa Cạn · Vũng Bầu)',
            en: 'Cửa Cạn · Vũng Bầu',
            vi: 'Cửa Cạn · Vũng Bầu',
          },
          surchargePerPersonVnd: 200000,
        },
        {
          area: {
            ko: '바이자이 · 잔저우 (Bãi Dài · Gành Dầu)',
            en: 'Bãi Dài · Gành Dầu',
            vi: 'Bãi Dài · Gành Dầu',
          },
          surchargePerPersonVnd: 400000,
        },
        {
          area: {
            ko: '꺼이사오 · 함닌 (Cây Sao · Hàm Ninh)',
            en: 'Cây Sao · Hàm Ninh',
            vi: 'Cây Sao · Hàm Ninh',
          },
          surchargePerPersonVnd: 200000,
        },
        {
          area: {
            ko: '기타 지역',
            en: 'Other areas',
            vi: 'Khu vực khác',
          },
          note: {
            ko: '문의',
            en: 'Please inquire',
            vi: 'Liên hệ',
          },
        },
        {
          area: {
            ko: '선셋타운 (Sunset Town)',
            en: 'Sunset Town',
            vi: 'Thị trấn Hoàng Hôn (Sunset Town)',
          },
          note: {
            ko: '미확인 (원본에 없음)',
            en: 'Unverified (not in source)',
            vi: 'Chưa xác nhận (không có trong bản gốc)',
          },
        },
      ],
      specialByTourCode: {
        'RED 4': [
          {
            area: {
              ko: '옹랑 (Ông Lang)',
              en: 'Ông Lang',
              vi: 'Ông Lang',
            },
            surchargePerPersonVnd: 100000,
          },
          {
            area: {
              ko: '바이쯩 (Bãi Trường)',
              en: 'Bãi Trường',
              vi: 'Bãi Trường',
            },
            surchargePerPersonVnd: 50000,
          },
          {
            area: {
              ko: '바이자이 · 잔저우 (Bãi Dài · Gành Dầu)',
              en: 'Bãi Dài · Gành Dầu',
              vi: 'Bãi Dài · Gành Dầu',
            },
            surchargePerPersonVnd: 400000,
          },
          {
            area: {
              ko: '안터이 · 바이켐 (An Thới · Bãi Khem)',
              en: 'An Thới · Bãi Khem',
              vi: 'An Thới · Bãi Khem',
            },
            surchargePerPersonVnd: 200000,
          },
          {
            area: {
              ko: '선셋타운 (Sunset Town)',
              en: 'Sunset Town',
              vi: 'Thị trấn Hoàng Hôn (Sunset Town)',
            },
            note: {
              ko: '미확인 (원본에 없음)',
              en: 'Unverified (not in source)',
              vi: 'Chưa xác nhận (không có trong bản gốc)',
            },
          },
        ],
      },
    },
    cancellationPolicy: [
      {
        ko: '단체투어: 출발 1일 전까지 무료 취소 / 출발 당일 취소 시 요금의 100% 부과',
        en: 'Group tour: Free cancellation up to 1 day before departure / 100% charge on the day of departure',
        vi: 'Tour ghép đoàn: Miễn phí hủy đến 1 ngày trước ngày khởi hành / Hủy vào ngày khởi hành tính phí 100%',
      },
      {
        ko: '프라이빗 투어: 출발 3일 전까지 무료 취소 / 출발 2일 전 취소 시 요금의 50% 부과 / 출발 1일 전 취소 시 요금의 100% 부과',
        en: 'Private tour: Free cancellation up to 3 days before departure / 50% charge for cancellation 2 days before departure / 100% charge for cancellation 1 day before departure',
        vi: 'Tour riêng: Miễn phí hủy trước 3 ngày / Hủy trước 2 ngày tính 50% phí / Hủy trước 1 ngày tính 100% phí',
      },
      {
        ko: '불가항력 상황 발생 시: 미사용분만 환불',
        en: 'Force majeure: Refund only for unused services',
        vi: 'Trường hợp bất khả kháng: Chỉ hoàn tiền cho các dịch vụ chưa sử dụng',
      },
    ],
    unverifiedItems: [
      {
        ko: '선셋타운(Sunset Town) 픽업 추가 요금 미확인 (원본에 없음)',
        en: 'Sunset Town pickup surcharge is unverified (not in source)',
        vi: 'Phụ phí đón tại Thị trấn Hoàng Hôn (Sunset Town) chưa xác nhận (không có trong bản gốc)',
      },
      {
        ko: '투어별 세부 시간표, 출발 시각, 총 소요 시간 미확인',
        en: 'Detailed schedule, departure time, and total duration per tour are unverified',
        vi: 'Lịch trình chi tiết, giờ khởi hành và tổng thời lượng từng tour chưa xác nhận',
      },
    ],
  },
};

const ALL_PARTNER_TOURS: PartnerTour[] = [
  // ==========================================
  // John's Tours Phú Quốc (가격 기준일: 2025-04-16)
  // ==========================================
  {
    id: 'johns-trip-2',
    operator: 'johns',
    code: 'Trip 2',
    category: 'hopping',
    title: {
      ko: '남부 먼 섬 낚시·스노클링 (Hòn Móng Tay 또는 Hòn Gầm Ghì – Hòn Mây Rút)',
      en: 'Far Southern Islands Fishing & Snorkeling (Hòn Móng Tay or Hòn Gầm Ghì – Hòn Mây Rút)',
      vi: 'Câu cá & lặn ngắm san hô các đảo nhỏ phía Nam (Hòn Móng Tay hoặc Hòn Gầm Ghì – Hòn Mây Rút)',
    },
    summary: {
      ko: '혼몽따이(Hòn Móng Tay) 또는 혼감기(Hòn Gầm Ghì) – 혼메이룻(Hòn Mây Rút) 낚시 및 스노클링 투어',
      en: 'Fishing and snorkeling tour at Hòn Móng Tay or Hòn Gầm Ghì – Hòn Mây Rút',
      vi: 'Tour câu cá và lặn ngắm san hô tại Hòn Móng Tay hoặc Hòn Gầm Ghì – Hòn Mây Rút',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 500000,
        childVnd: 250000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-trip-3',
    operator: 'johns',
    code: 'Trip 3',
    category: 'hopping',
    title: {
      ko: '3섬 투어 (Hòn Bườm (Móng Tay) – Hòn Gầm Ghì – Hòn Mây Rút)',
      en: '3 Islands Tour (Hòn Bườm (Móng Tay) – Hòn Gầm Ghì – Hòn Mây Rút)',
      vi: 'Tour 3 đảo (Hòn Bườm (Móng Tay) – Hòn Gầm Ghì – Hòn Mây Rút)',
    },
    summary: {
      ko: '혼브엄(Hòn Bườm, 혼몽따이/Móng Tay) – 혼감기(Hòn Gầm Ghì) – 혼메이룻(Hòn Mây Rút) 3개 섬 방문 투어',
      en: '3 islands tour visiting Hòn Bườm (Móng Tay), Hòn Gầm Ghì, and Hòn Mây Rút',
      vi: 'Tour tham quan 3 đảo: Hòn Bườm (Móng Tay) – Hòn Gầm Ghì – Hòn Mây Rút',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 650000,
        childVnd: 330000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-trip-4',
    operator: 'johns',
    code: 'Trip 4',
    category: 'cablecar',
    title: {
      ko: '케이블카 + 3섬 (배)',
      en: 'Cable Car + 3 Islands (Boat)',
      vi: 'Cáp treo + Tour 3 đảo (tàu)',
    },
    summary: {
      ko: '케이블카 탑승 및 배로 이동하는 3섬 투어',
      en: 'Cable car ride combined with a 3-island boat tour',
      vi: 'Trải nghiệm cáp treo kết hợp tour 3 đảo bằng tàu',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1370000,
        childVnd: 990000,
        childNote: {
          ko: '어린이 요금: 키 1~1.4m 기준',
          en: 'Child fare: Height 1–1.4m',
          vi: 'Giá trẻ em: Chiều cao 1–1.4m',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-option-2',
    hidden: true, // 2026-11-04 비공개: PDF와 상품 구성 불일치 확인 전까지
    operator: 'johns',
    code: 'Option 2',
    category: 'sunset',
    title: {
      ko: '일몰 BBQ & 야간 오징어낚시',
      en: 'Sunset BBQ & Night Squid Fishing',
      vi: 'BBQ hoàng hôn & Câu mực đêm',
    },
    summary: {
      ko: '일몰 감상 BBQ 식사 및 야간 오징어낚시 체험',
      en: 'Sunset viewing with BBQ meal and night squid fishing experience',
      vi: 'Ngắm hoàng hôn, thưởng thức BBQ và trải nghiệm câu mực đêm',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 330000,
        childVnd: 165000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-cano-trip',
    operator: 'johns',
    code: 'Cano trip',
    category: 'hopping',
    title: {
      ko: '푸꾸옥 남부 스피드보트 투어',
      en: 'Southern Phú Quốc Speedboat Tour',
      vi: 'Tour cano khám phá các đảo phía Nam',
    },
    summary: {
      ko: '스피드보트(카노)를 이용한 푸꾸옥 남부 투어',
      en: 'Southern Phú Quốc tour by speedboat (cano)',
      vi: 'Tour tham quan các đảo phía Nam bằng cano cao tốc',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 800000,
        childVnd: 400000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-cablecar-trip',
    operator: 'johns',
    code: 'Cablecar trip',
    category: 'cablecar',
    title: {
      ko: '혼똔섬 케이블카 + 4섬 스피드보트 (Hòn Thơm)',
      en: 'Hòn Thơm Cable Car + 4 Islands Speedboat',
      vi: 'Cáp treo Hòn Thơm + Cano 4 đảo',
    },
    summary: {
      ko: '혼똔섬(Hòn Thơm) 케이블카 탑승 및 4섬 스피드보트 투어',
      en: 'Hòn Thơm cable car ride and 4 islands tour by speedboat',
      vi: 'Trải nghiệm cáp treo Hòn Thơm kết hợp tour cano 4 đảo',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1510000,
        childVnd: 990000,
        childNote: {
          ko: '어린이 요금: 키 1~1.4m 기준',
          en: 'Child fare: Height 1–1.4m',
          vi: 'Giá trẻ em: Chiều cao 1–1.4m',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-bbq-trip',
    operator: 'johns',
    code: 'BBQ trip',
    category: 'sunset',
    title: {
      ko: '2섬: 스노클링·일몰·섬 BBQ 만찬',
      en: '2 Islands: Snorkeling, Sunset & Island BBQ Dinner',
      vi: 'Tour 2 đảo: Lặn ngắm san hô, Hoàng hôn & Tiệc BBQ trên đảo',
    },
    summary: {
      ko: '2개 섬 방문, 스노클링, 일몰 감상 및 섬에서의 BBQ 만찬',
      en: 'Visit 2 islands for snorkeling, sunset viewing, and a BBQ dinner on the island',
      vi: 'Tham quan 2 đảo, lặn ngắm san hô, ngắm hoàng hôn và thưởng thức tiệc BBQ trên đảo',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1320000,
        childVnd: 660000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-luxury-trip',
    hidden: true, // 2026-11-04 비공개: PDF와 상품 구성 불일치 확인 전까지
    operator: 'johns',
    code: 'Luxury trip',
    category: 'hopping',
    title: {
      ko: '스피드보트 럭셔리 3섬 스노클링',
      en: 'Luxury 3-Island Snorkeling Tour by Speedboat',
      vi: 'Tour cano cao cấp lặn ngắm san hô 3 đảo',
    },
    summary: {
      ko: '스피드보트로 진행되는 럭셔리 3섬 스노클링 투어',
      en: 'Luxury 3-island snorkeling tour by speedboat',
      vi: 'Tour lặn ngắm san hô 3 đảo cao cấp bằng cano',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1150000,
        childVnd: 575000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-island-life-trip',
    operator: 'johns',
    code: 'Island Life trip',
    category: 'hopping',
    title: {
      ko: '섬 생활 체험(낚시·스노클링·현지 생활·BBQ 점심)',
      en: 'Island Life Experience (Fishing, Snorkeling, Local Life & BBQ Lunch)',
      vi: 'Trải nghiệm cuộc sống trên đảo (câu cá, lặn ngắm san hô, đời sống địa phương và ăn trưa BBQ)',
    },
    summary: {
      ko: '낚시, 스노클링, 현지 섬 생활 체험 및 BBQ 점심이 포함된 투어',
      en: 'Experience fishing, snorkeling, local island life, and BBQ lunch',
      vi: 'Tour trải nghiệm câu cá, lặn ngắm san hô, đời sống địa phương và bữa trưa BBQ',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1460000,
        childVnd: 730000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-camping-trip',
    operator: 'johns',
    code: 'Camping trip 2일1박',
    category: 'camping',
    title: {
      ko: '캠핑 투어 2일 1박 (Hòn Mây Rút Trong)',
      en: '2D1N Camping Trip (Hòn Mây Rút Trong)',
      vi: 'Tour cắm trại 2 ngày 1 đêm (Hòn Mây Rút Trong)',
    },
    summary: {
      ko: '혼메이룻쫑(Hòn Mây Rút Trong)에서 진행되는 2일 1박 캠핑 투어',
      en: '2-day, 1-night camping trip at Hòn Mây Rút Trong',
      vi: 'Tour cắm trại 2 ngày 1 đêm tại Hòn Mây Rút Trong',
    },
    variants: [
      {
        label: {
          ko: '2일 1박',
          en: '2 Days 1 Night',
          vi: '2 ngày 1 đêm',
        },
        adultVnd: 1840000,
        childVnd: 1000000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-glamping-trip',
    operator: 'johns',
    code: 'Glamping trip 2일1박',
    category: 'camping',
    title: {
      ko: '글램핑 투어 2일 1박 (Dugong Bay – Hòn Xưởng)',
      en: '2D1N Glamping Trip (Dugong Bay – Hòn Xưởng)',
      vi: 'Tour Glamping 2 ngày 1 đêm (Dugong Bay – Hòn Xưởng)',
    },
    summary: {
      ko: '두공 베이(Dugong Bay) – 혼쓰엉(Hòn Xưởng)에서 진행되는 2일 1박 글램핑 투어',
      en: '2-day, 1-night glamping trip at Dugong Bay – Hòn Xưởng',
      vi: 'Tour nghỉ dưỡng lều trại cao cấp (Glamping) 2 ngày 1 đêm tại Dugong Bay – Hòn Xưởng',
    },
    variants: [
      {
        label: {
          ko: '2일 1박',
          en: '2 Days 1 Night',
          vi: '2 ngày 1 đêm',
        },
        adultVnd: 2180000,
        childVnd: 1500000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-land-tour-1',
    operator: 'johns',
    code: 'Land Tour 1',
    category: 'land',
    title: {
      ko: '남부 주요 8곳 관광',
      en: 'Southern Phú Quốc: 8 Attractions (Land Tour 1)',
      vi: 'Tham quan 8 điểm nổi bật phía Nam (Land Tour 1)',
    },
    summary: {
      ko: '푸꾸옥 남부 주요 8개 명소 육상 관광 (점심 포함/불포함 선택 가능)',
      en: 'Land tour visiting 8 key attractions in southern Phú Quốc (with or without lunch)',
      vi: 'Tour đường bộ tham quan 8 điểm nổi bật phía Nam Phú Quốc (tùy chọn có hoặc không ăn trưa)',
    },
    variants: [
      {
        label: {
          ko: '점심 포함',
          en: 'With Lunch',
          vi: 'Bao gồm ăn trưa',
        },
        adultVnd: 540000,
        childVnd: 270000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
      {
        label: {
          ko: '점심 불포함',
          en: 'Without Lunch',
          vi: 'Không bao gồm ăn trưa',
        },
        adultVnd: 320000,
        childVnd: 160000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-land-tour-2',
    operator: 'johns',
    code: 'Land Tour 2',
    category: 'land',
    title: {
      ko: '북부 관광 (카약·락뱀·함롱곶)',
      en: 'Northern Tour (Kayaking, Rạch Vẹm & Mũi Hàm Rồng)',
      vi: 'Tour phía Bắc (chèo kayak, Rạch Vẹm và Mũi Hàm Rồng)',
    },
    summary: {
      ko: '푸꾸옥 북부 카약, 락뱀(Rạch Vẹm), 함롱곶(Mũi Hàm Rồng) 육상 투어 (점심 포함/불포함 선택 가능)',
      en: 'Northern Phú Quốc tour with kayaking, Rạch Vẹm, and Mũi Hàm Rồng (with or without lunch)',
      vi: 'Tour khám phá phía Bắc Phú Quốc: chèo kayak, Rạch Vẹm, Mũi Hàm Rồng (tùy chọn có hoặc không ăn trưa)',
    },
    variants: [
      {
        label: {
          ko: '점심 포함',
          en: 'With Lunch',
          vi: 'Bao gồm ăn trưa',
        },
        adultVnd: 950000,
        childVnd: 475000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
      {
        label: {
          ko: '점심 불포함',
          en: 'Without Lunch',
          vi: 'Không bao gồm ăn trưa',
        },
        adultVnd: 700000,
        childVnd: 350000,
        childNote: {
          ko: '어린이: 5~9세',
          en: 'Child: 5–9 years old',
          vi: 'Trẻ em: 5–9 tuổi',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-land-tour-4',
    operator: 'johns',
    code: 'Land Tour 4',
    category: 'cablecar',
    title: {
      ko: '케이블카 + 남부 관광',
      en: 'Cable Car + Southern Sightseeing (Land Tour 4)',
      vi: 'Cáp treo + Tham quan phía Nam (Land Tour 4)',
    },
    summary: {
      ko: '케이블카 탑승과 남부 육상 관광을 결합한 투어 (점심 포함/불포함 선택 가능)',
      en: 'Cable car ride combined with Southern Phú Quốc land sightseeing (with or without lunch)',
      vi: 'Trải nghiệm cáp treo kết hợp tham quan phía Nam (tùy chọn có hoặc không ăn trưa)',
    },
    variants: [
      {
        label: {
          ko: '점심 포함',
          en: 'With Lunch',
          vi: 'Bao gồm ăn trưa',
        },
        adultVnd: 1370000,
        childVnd: 1210000,
        childNote: {
          ko: '어린이 요금: 키 1~1.4m 기준',
          en: 'Child fare: Height 1–1.4m',
          vi: 'Giá trẻ em: Chiều cao 1–1.4m',
        },
      },
      {
        label: {
          ko: '점심 불포함',
          en: 'Without Lunch',
          vi: 'Không bao gồm ăn trưa',
        },
        adultVnd: 1120000,
        childVnd: 960000,
        childNote: {
          ko: '어린이 요금: 키 1~1.4m 기준',
          en: 'Child fare: Height 1–1.4m',
          vi: 'Giá trẻ em: Chiều cao 1–1.4m',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },
  {
    id: 'johns-sea-walker',
    operator: 'johns',
    code: 'Sea walker',
    category: 'diving',
    title: {
      ko: '씨워커(해저 걷기) — 추가 서비스',
      en: 'Sea Walker (Add-on Service)',
      vi: 'Đi bộ dưới đáy biển – Sea Walker (Dịch vụ bổ sung)',
    },
    summary: {
      ko: '해저 걷기 체험 추가 서비스 (어린이도 성인과 동일 요금 적용)',
      en: 'Sea Walker add-on experience (same fare for children and adults)',
      vi: 'Dịch vụ bổ sung đi bộ dưới đáy biển (giá trẻ em bằng giá người lớn)',
    },
    variants: [
      {
        label: {
          ko: '1인 (성인/어린이 동일)',
          en: 'Per Person (Same for Adult/Child)',
          vi: 'Mỗi khách (Người lớn/Trẻ em đồng giá)',
        },
        adultVnd: 1250000,
        childVnd: 1250000,
        childNote: {
          ko: '어린이도 성인과 동일 요금',
          en: 'Same fare as adult for children',
          vi: 'Trẻ em áp dụng giá như người lớn',
        },
      },
    ],
    priceAsOf: '2025-04-16',
  },

  // ==========================================
  // Red River Tour (가격 기준일: 2026-10-04)
  // ==========================================
  {
    id: 'redriver-fishing',
    operator: 'redriver',
    code: 'FISHING',
    category: 'fishing',
    title: {
      ko: '대물 낚시',
      en: 'Big Game Fishing',
      vi: 'Câu cá lớn (Big Game Fishing)',
    },
    summary: {
      ko: '주간 또는 야간 선택이 가능한 대물 낚시 투어 (매일 출발)',
      en: 'Daytime or nighttime big-game fishing tour (daily departures)',
      vi: 'Tour câu cá lớn ban ngày hoặc ban đêm (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '낮 (주간)',
          en: 'Day Fishing',
          vi: 'Ban ngày',
        },
        adultVnd: 3500000,
        childVnd: 2450000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
      {
        label: {
          ko: '밤 (야간)',
          en: 'Night Fishing',
          vi: 'Ban đêm',
        },
        adultVnd: 3800000,
        childVnd: 2660000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-redspecial',
    operator: 'redriver',
    code: 'REDSPECIAL',
    category: 'hopping',
    title: {
      ko: '3섬 투어(배)',
      en: '3 Islands Tour (Boat)',
      vi: 'Tour 3 đảo (Tàu)',
    },
    summary: {
      ko: '배를 타고 이동하는 3섬 투어 (매일 출발)',
      en: '3-island-hopping tour by boat (daily departures)',
      vi: 'Tour tham quan 3 đảo bằng tàu (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 820000,
        childVnd: 574000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-7',
    operator: 'redriver',
    code: 'RED 7',
    category: 'fishing',
    title: {
      ko: '남부 낚시 & 스노클링',
      en: 'Southern Fishing & Snorkeling',
      vi: 'Câu cá & Lặn ngắm san hô phía Nam',
    },
    summary: {
      ko: '푸꾸옥 남부 바다에서의 낚시 및 스노클링 투어 (매일 출발)',
      en: 'Fishing and snorkeling tour in Southern Phú Quốc (daily departure)',
      vi: 'Tour câu cá và lặn ngắm san hô vùng biển phía Nam (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 720000,
        childVnd: 504000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-1',
    operator: 'redriver',
    code: 'RED 1',
    category: 'hopping',
    title: {
      ko: '2섬 투어(배)',
      en: '2 Islands Tour (Boat)',
      vi: 'Tour 2 đảo (Tàu)',
    },
    summary: {
      ko: '배를 타고 이동하는 2섬 투어 (매일 출발)',
      en: '2 islands hopping tour by boat (daily departure)',
      vi: 'Tour tham quan 2 đảo bằng tàu (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 650000,
        childVnd: 455000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-2',
    operator: 'redriver',
    code: 'RED 2',
    category: 'cablecar',
    title: {
      ko: '3섬 + 케이블카',
      en: '3 Islands + Cable Car',
      vi: '3 đảo + Cáp treo',
    },
    summary: {
      ko: '3섬 투어와 케이블카 탑승 결합 상품 (매일 출발)',
      en: '3 islands tour combined with cable car ride (daily departure)',
      vi: 'Tour 3 đảo kết hợp trải nghiệm cáp treo (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1600000,
        childVnd: 1120000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-3',
    operator: 'redriver',
    code: 'RED 3',
    category: 'diving',
    title: {
      ko: '스쿠버다이빙(1회) / 씨워커(1회)',
      en: 'Scuba Diving (1 Dive) / Sea Walker (1 Session)',
      vi: 'Lặn bình khí (1 lần) / Đi bộ dưới biển (1 lần)',
    },
    summary: {
      ko: '스쿠버다이빙 1회 또는 씨워커 1회 체험 (어린이 요금 해당 없음)',
      en: '1 scuba diving session or 1 Sea Walker session (child fare not applicable)',
      vi: 'Trải nghiệm 1 lần lặn bình khí hoặc 1 lần đi bộ dưới biển (không áp dụng giá trẻ em)',
    },
    variants: [
      {
        label: {
          ko: '스쿠버다이빙 (1회)',
          en: 'Scuba Diving (1 Dive)',
          vi: 'Lặn bình khí (1 lần)',
        },
        adultVnd: 1700000,
        childNote: {
          ko: '어린이 요금: 해당 없음',
          en: 'Child fare: Not applicable',
          vi: 'Giá trẻ em: Không áp dụng',
        },
      },
      {
        label: {
          ko: '씨워커 (1회)',
          en: 'Sea Walker (1 Session)',
          vi: 'Đi bộ dưới biển (1 lần)',
        },
        adultVnd: 1550000,
        childNote: {
          ko: '어린이 요금: 해당 없음',
          en: 'Child fare: Not applicable',
          vi: 'Giá trẻ em: Không áp dụng',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-4',
    operator: 'redriver',
    code: 'RED 4',
    category: 'sunset',
    title: {
      ko: '일몰 & 야간 오징어낚시',
      en: 'Sunset & Night Squid Fishing',
      vi: 'Ngắm hoàng hôn & Câu mực đêm',
    },
    summary: {
      ko: '일몰 감상 및 야간 오징어낚시 투어 (RED 4 전용 지역별 픽업 추가 요금 적용)',
      en: 'Sunset and night squid fishing tour (special regional pickup surcharges apply for RED 4)',
      vi: 'Tour ngắm hoàng hôn và câu mực đêm (áp dụng bảng phụ phí đón riêng cho RED 4)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 430000,
        childVnd: 301000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
    notes: [
      {
        ko: 'RED 4 전용 픽업 추가비(1인): 옹랑(Ông Lang) 100,000 VND / 바이쯩(Bãi Trường) 50,000 VND / 바이자이·잔저우(Bãi Dài·Gành Dầu) 400,000 VND / 안터이·바이켐(An Thới·Bãi Khem) 200,000 VND',
        en: 'RED 4 pickup surcharge (per person): Ông Lang 100,000 VND / Bãi Trường 50,000 VND / Bãi Dài·Gành Dầu 400,000 VND / An Thới·Bãi Khem 200,000 VND',
        vi: 'Phụ phí đón riêng cho RED 4 (1 khách): Ông Lang 100.000 VND / Bãi Trường 50.000 VND / Bãi Dài·Gành Dầu 400.000 VND / An Thới·Bãi Khem 200.000 VND',
      },
    ],
  },
  {
    id: 'redriver-trip-1',
    operator: 'redriver',
    code: 'TRIP 1',
    category: 'hopping',
    title: {
      ko: '스피드보트 4섬',
      en: '4-Island Speedboat Tour',
      vi: 'Cano 4 đảo',
    },
    summary: {
      ko: '스피드보트로 이동하는 남부 4섬 호핑 투어 (매일 출발)',
      en: '4 islands hopping tour by speedboat (daily departure)',
      vi: 'Tour tham quan 4 đảo bằng cano cao tốc (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 850000,
        childVnd: 595000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-trip-2',
    operator: 'redriver',
    code: 'TRIP 2',
    category: 'cablecar',
    title: {
      ko: '스피드보트 4섬 + 케이블카',
      en: '4-Island Speedboat Tour + Cable Car',
      vi: 'Cano 4 đảo + Cáp treo',
    },
    summary: {
      ko: '스피드보트 4섬 투어 및 케이블카 탑승 결합 상품 (매일 출발)',
      en: 'Speedboat 4 islands tour combined with cable car ride (daily departure)',
      vi: 'Tour cano 4 đảo kết hợp cáp treo (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 1700000,
        childVnd: 1190000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-land-1',
    operator: 'redriver',
    code: 'LAND 1',
    category: 'land',
    title: {
      ko: '남부 육상 관광(케이블카 없음)',
      en: 'Southern Land Sightseeing (No Cable Car)',
      vi: 'Tham quan đường bộ phía Nam (Không cáp treo)',
    },
    summary: {
      ko: '케이블카가 포함되지 않은 남부 육상 관광 투어 (매일 출발)',
      en: 'Southern Phú Quốc land sightseeing tour without cable car (daily departure)',
      vi: 'Tour tham quan đường bộ phía Nam không bao gồm cáp treo (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 620000,
        childVnd: 434000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-land-2',
    operator: 'redriver',
    code: 'LAND 2',
    category: 'cablecar',
    title: {
      ko: '남부 육상 관광(케이블카 & 뷔페)',
      en: 'Southern Land Sightseeing (Cable Car & Buffet)',
      vi: 'Tham quan đường bộ phía Nam (Cáp treo & Buffet)',
    },
    summary: {
      ko: '케이블카 탑승과 뷔페 식사가 포함된 남부 육상 관광 투어 (매일 출발)',
      en: 'Southern Phú Quốc sightseeing tour including a cable car ride and buffet (daily departures)',
      vi: 'Tour tham quan đường bộ phía Nam bao gồm cáp treo và ăn trưa buffet (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '케이블카 & 뷔페 포함',
          en: 'With Cable Car & Buffet',
          vi: 'Bao gồm Cáp treo & Buffet',
        },
        adultVnd: 1750000,
        childVnd: 1225000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-vin-3',
    operator: 'redriver',
    code: 'VIN 3',
    category: 'land',
    title: {
      ko: '즈엉동 시내 투어',
      en: 'Dương Đông Town Tour',
      vi: 'Tour tham quan thị trấn Dương Đông',
    },
    summary: {
      ko: '즈엉동(Dương Đông) 시내 주요 명소 육상 투어 (매일 출발)',
      en: 'City tour exploring key sights around Dương Đông (daily departure)',
      vi: 'Tour tham quan các điểm nổi bật tại khu vực Dương Đông (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '기본',
          en: 'Standard',
          vi: 'Tiêu chuẩn',
        },
        adultVnd: 550000,
        childVnd: 385000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
  {
    id: 'redriver-red-10',
    operator: 'redriver',
    code: 'RED 10',
    category: 'land',
    title: {
      ko: '북부 야생 투어 (끄어깐강 카약 / 바구니배)',
      en: 'Northern Wild Tour (Cửa Cạn River Kayaking / Basket Boat)',
      vi: 'Tour khám phá hoang dã phía Bắc (Chèo Kayak sông Cửa Cạn / Thuyền thúng)',
    },
    summary: {
      ko: '끄어깐강(Cửa Cạn) 카약 또는 바구니배 체험을 선택하는 북부 야생 투어 (매일 출발)',
      en: 'Northern wild tour with a choice of kayaking on the Cửa Cạn River or taking a basket boat ride (daily departures)',
      vi: 'Tour khám phá thiên nhiên phía Bắc với lựa chọn chèo kayak trên sông Cửa Cạn hoặc đi thuyền thúng (khởi hành hàng ngày)',
    },
    variants: [
      {
        label: {
          ko: '카약 (끄어깐강 / Cửa Cạn)',
          en: 'Kayaking (Cửa Cạn River)',
          vi: 'Chèo Kayak (Sông Cửa Cạn)',
        },
        adultVnd: 1400000,
        childVnd: 980000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
      {
        label: {
          ko: '바구니배',
          en: 'Basket Boat',
          vi: 'Thuyền thúng',
        },
        adultVnd: 1500000,
        childVnd: 1050000,
        childNote: {
          ko: '키 100cm 이상 ~ 140cm 미만 어린이 요금 (100cm 미만 무료)',
          en: 'Height 100cm to under 140cm: Child fare (under 100cm free)',
          vi: 'Chiều cao từ 100cm đến dưới 140cm: Áp dụng giá trẻ em (dưới 100cm miễn phí)',
        },
      },
    ],
    priceAsOf: '2026-10-04',
  },
];

/** 사이트에 노출되는 투어(hidden 제외) */
export const PARTNER_TOURS: PartnerTour[] = ALL_PARTNER_TOURS.filter(
  (t) => !t.hidden
);
