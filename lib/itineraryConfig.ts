/**
 * 마이 푸꾸옥 — 추천 테마 일정 & 투어 예약 설정 (Single Source of Truth)
 * 
 * [공란 입력 안내]
 * 업체명, 가격, 시간, 인원, 마사지, 스쿠터, 중부/북부 장소 등 미정 정보는 
 * 아래 객체의 값을 채워 넣으면 페이지 전체에 즉시 반영됩니다.
 * 값이 비어있을 경우(null 또는 빈 문자열) 사이트에는 빈 칸 대신 '문의하기' 버튼 및 '확인 필요' 배지가 노출됩니다.
 */

export interface OptionTier {
  id: string
  name: string // 예: 다수 탑승, 프리미엄, 프라이빗 단독
  desc: string
  priceVnd: number | null // null이면 '문의하기'
  vendorName: string | null // null이면 비공개/문의하기
  capacityNote: string | null // 예: '최대 15인', null이면 '문의하기'
  durationNote: string | null // 예: '4시간', null이면 '문의하기'
  badge?: string
}

export interface ItineraryOptionItem {
  id: string
  code: 'A' | 'B' | 'C' | 'D'
  title: string
  subtitle: string
  category: string
  recommendedDay: string // 예: 'Day 2 낮'
  image: string
  description: string
  tiers: OptionTier[]
}

export interface AdditionalServiceItem {
  id: string
  code: 'S1' | 'S2' | 'S3' | 'S4' | 'S5'
  title: string
  desc: string
  priceVnd: number | null
  note: string | null
  badge: string
}

export interface DayScheduleItem {
  time: string
  title: string
  desc: string
  badge?: string
  isMustEvent?: boolean
  linkedOptionCode?: 'A' | 'B' | 'C' | 'D'
  linkedServiceCode?: 'S1' | 'S2' | 'S3' | 'S4' | 'S5'
  vendorName?: string | null
  priceNote?: string | null
  unverifiedNote?: string | null // '확인 필요'
}

export interface ItineraryDay {
  day: number
  title: string
  theme: string
  summary: string
  schedules: DayScheduleItem[]
}

export interface CompanionPlace {
  id: string
  name: string
  category: string
  desc: string
  tag: string
  image: string
}

export interface ItineraryMasterConfig {
  contact: {
    phoneNumber: string
    whatsappUrl: string
    zaloUrl: string
    counselHours: string
  }
  paymentStatus: {
    paypalEnabled: boolean
    vnpayEnabled: boolean
    notice: string
  }
  options: ItineraryOptionItem[]
  services: AdditionalServiceItem[]
  days: ItineraryDay[]
  sample5Days: {
    title: string
    badge: string
    summary: string
    routeOverview: string[]
  }
  companionPlaces: Record<string, { label: string; places: CompanionPlace[] }>
}

export const ITINERARY_CONFIG: ItineraryMasterConfig = {
  contact: {
    phoneNumber: '0907994188',
    whatsappUrl: 'https://wa.me/84907994188',
    zaloUrl: 'https://zalo.me/0907994188',
    counselHours: '연중무휴 한국어 상담 가능',
  },
  paymentStatus: {
    paypalEnabled: false,
    vnpayEnabled: false,
    notice: '결제 시스템(PayPal · VNPay)은 정식 연동 준비 중입니다. 현재는 예약 신청 후 현장 결제 또는 안내 계좌로 진행됩니다.',
  },
  sample5Days: {
    title: '남부 시작형 4박 5일 추천 코스',
    badge: '추천 샘플 일정',
    summary: '공항 도착 즉시 남부 선셋타운·켐비치에 체크인하여 바다와 공연을 먼저 여유롭게 즐긴 뒤, 중부 야시장과 북부 사파리로 이동하는 알찬 황금 동선입니다.',
    routeOverview: [
      'Day 1: 남부 입국 체크인 → 선셋타운 산책 → 심포니 오브 더 씨 제트스키 쇼',
      'Day 2: 남부 3섬 호핑투어 → 선셋 바다낚시 또는 럭셔리 크루즈 디너',
      'Day 3: 선셋타운 친환경 버기 투어 → 해양 레저 액티비티 → 키스 오브 더 씨 야간 쇼',
      'Day 4: 중부 이동 → 즈엉동 야시장 & 킹콩마트 쇼핑 → 현지 해산물 다이닝',
      'Day 5: 북부 그랜드월드 / 사파리 투어 → 공항 샌딩 출국',
    ],
  },
  options: [
    {
      id: 'opt-hopping',
      code: 'A',
      title: '남부 3섬 / 4섬 호핑 투어',
      subtitle: '푸꾸옥 최고의 에메랄드빛 바다에서 즐기는 스노클링과 해양 레저',
      category: '해양 투어',
      recommendedDay: 'Day 2 낮',
      image: '/features/activities_featured_640.webp',
      description: '푸꾸옥 남부 안토이 군도의 대표 섬(감기섬, 메이란, 몽타이 등)을 보트로 순회하며 산호 스노클링과 점심 식사를 즐깁니다.',
      tiers: [
        {
          id: 'opt-a-regular',
          name: '다수 탑승 (일반 투어)',
          desc: '대형 스피드보트로 여러 팀과 함께 합리적인 가격으로 즐기는 기본 호핑 투어',
          priceVnd: null, // 공란 → '문의하기'
          vendorName: null, // 공란
          capacityNote: null,
          durationNote: null,
          badge: '가성비 추천',
        },
        {
          id: 'opt-a-premium',
          name: '프리미엄 투어',
          desc: '소규모 정원, 전문 수중 촬영 및 업그레이드 선상 해산물 런치 제공',
          priceVnd: null, // 공란 → '문의하기'
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '만족도 최고',
        },
        {
          id: 'opt-a-private',
          name: '프라이빗 단독 보트',
          desc: '우리 일행만을 위한 단독 쾌속선과 전담 가이드, 원하는 시간과 포인트 자유 조율',
          priceVnd: null, // 공란 → '문의하기'
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '단독 전용',
        },
      ],
    },
    {
      id: 'opt-fishing-cruise',
      code: 'B',
      title: '선셋 바다낚시 & 럭셔리 요트 크루즈 디너 (택1)',
      subtitle: '황홀한 노을을 바라보며 즐기는 손맛 낚시 또는 낭만 가득 선상 디너',
      category: '선셋 & 다이닝',
      recommendedDay: 'Day 2 저녁 (택1)',
      image: '/activities/marmoris/sunset-1.webp',
      description: '남부 바다 위에서 일몰을 감상하며 직접 잡은 생선회/오징어 낚시를 즐기거나, 5성급 요트에서 라이브 음악과 함께 럭셔리 디너를 즐깁니다.',
      tiers: [
        {
          id: 'opt-b-regular',
          name: '다수 탑승 (선셋 낚시)',
          desc: '전통 낚시선에 탑승하여 즐기는 일몰 감상 및 야간 오징어/어류 낚시 체험',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '체험 추천',
        },
        {
          id: 'opt-b-premium',
          name: '프리미엄 (요트 크루즈 디너)',
          desc: '마르모리스 5성급 럭셔리 카타마란 요트 선상 뷔페 디너 & 선셋 칵테일',
          priceVnd: null,
          vendorName: 'Marmoris Yacht',
          capacityNote: null,
          durationNote: null,
          badge: '로맨틱 추천',
        },
        {
          id: 'opt-b-private',
          name: '프라이빗 단독 차터',
          desc: '프라이빗 럭셔리 요트 전일/선셋 단독 대절, 프라이빗 셰프 케이터링 지원',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: 'VIP 단독',
        },
      ],
    },
    {
      id: 'opt-buggy',
      code: 'C',
      title: '선셋타운 친환경 버기 투어',
      subtitle: '지중해풍 골목길과 해안 명소를 시원한 바람을 맞으며 둘러보는 필수 코스',
      category: '이동 투어',
      recommendedDay: 'Day 3 오전',
      image: '/banners/phu-quoc-buggy-tour.webp',
      description: '오르막길이 많은 선셋타운의 시계탑, 키스 브릿지 입구, 센트럴 빌리지 등 핵심 포인트를 편안하게 연결하는 친환경 전기 버기 투어입니다.',
      tiers: [
        {
          id: 'opt-c-regular',
          name: '다수 탑승 (셔틀식 순환)',
          desc: '정해진 정류장 구간을 순환하며 탑승하는 기본 셔틀형 버기',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '구간 이동',
        },
        {
          id: 'opt-c-premium',
          name: '프리미엄 (명소 해설 코스)',
          desc: '선셋타운 핫스폿 사진 촬영 대기와 주요 명소 가이드가 포함된 코스',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '포토스폿 집중',
        },
        {
          id: 'opt-c-private',
          name: '프라이빗 전용 버기 대절',
          desc: '원하는 시간만큼 전용 기사와 함께 우리 가족·일행만 단독으로 자유 탑승',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '가족 단독 추천',
        },
      ],
    },
    {
      id: 'opt-ocean-activity',
      code: 'D',
      title: '남부 해양 액티비티',
      subtitle: '혼똔섬 및 켐비치에서 즐기는 짜릿한 수상 스포츠',
      category: '해양 레포츠',
      recommendedDay: 'Day 3 오후',
      image: '/zones/khem-beach-hero.webp',
      description: '하늘을 나는 패러세일링, 시원한 바다를 가르는 제트스키, 온 가족이 신나는 바나나보트 등 다채로운 해양 액티비티를 선택할 수 있습니다.',
      tiers: [
        {
          id: 'opt-d-regular',
          name: '다수 탑승 (단품 액티비티)',
          desc: '바나나보트, 튜브 라이딩 등 여럿이 함께 즐기는 인기 수상 놀이',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '신나는 체험',
        },
        {
          id: 'opt-d-premium',
          name: '프리미엄 콤보 패키지',
          desc: '패러세일링 + 제트스키 체험이 결합된 남부 인기 베스트 콤보',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: '인기 콤보',
        },
        {
          id: 'opt-d-private',
          name: '프라이빗 단독 장비 렌탈',
          desc: '전담 안전요원 1:1 케어 및 고급 기종 단독 렌탈 서비스',
          priceVnd: null,
          vendorName: null,
          capacityNote: null,
          durationNote: null,
          badge: 'VIP 케어',
        },
      ],
    },
  ],
  services: [
    {
      id: 'srv-s1',
      code: 'S1',
      title: '입국 공항 픽업',
      desc: '푸꾸옥 국제공항 도착 게이트에서 네임피켓 영접 후 남부 숙소까지 쾌적하고 안전하게 이동',
      priceVnd: null,
      note: '7인승 SUV 또는 16인승 밴, 비행기 지연 무료 대기',
      badge: '공항 → 숙소',
    },
    {
      id: 'srv-s2',
      code: 'S2',
      title: '출국 공항 샌딩',
      desc: '여행 마지막 날 숙소 로비에서 픽업하여 공항 출국장까지 여유롭게 안전 배송',
      priceVnd: null,
      note: '항공편 출발 2시간 30분 전 픽업 권장',
      badge: '숙소 → 공항',
    },
    {
      id: 'srv-s3',
      code: 'S3',
      title: '남부 ↔ 중부/북부 지역 간 이동 차량',
      desc: '선셋타운/켐비치에서 즈엉동 야시장 또는 북부 빈펄/그랜드월드로 이동하는 프라이빗 편도/왕복 차량',
      priceVnd: null,
      note: '그랩 대기 없이 정시 출발하는 단독 전용차량',
      badge: '지역 간 이동',
    },
    {
      id: 'srv-s4',
      code: 'S4',
      title: '리조트 간 캐리어 이동 배송',
      desc: '남부에서 다른 숙소로 이동할 때 짐 걱정 없이 두 손 가볍게 관광할 수 있는 호텔 간 캐리어 배송',
      priceVnd: null,
      note: '오전 체크아웃 시 수거 → 다음 호텔 체크인 시 수령',
      badge: '짐 배송 서비스',
    },
    {
      id: 'srv-s5',
      code: 'S5',
      title: '기사 포함 전일 / 반일 차량 대절',
      desc: '우리 일행만의 맞춤 일정으로 원하는 장소 어디든 자유롭게 이동할 수 있는 단독 기사 렌터카',
      priceVnd: null,
      note: '6시간(반일) / 10시간(전일) 선택 가능, 유류비·톨비 포함',
      badge: '자유 대절 차량',
    },
  ],
  days: [
    {
      day: 1,
      title: '푸꾸옥 도착 & 남부 선셋타운 입성',
      theme: '낭만적인 일몰과 화려한 오션 제트스키 쇼의 첫날',
      summary: '공항에서 전용 픽업 차량으로 남부 숙소에 도착하여 여장을 풀고, 유럽풍 선셋타운의 일몰과 심포니 오브 더 씨 공연을 관람합니다.',
      schedules: [
        {
          time: '도착 시간대별',
          title: '푸꾸옥 국제공항 도착 & 전용 픽업 차량 탑승',
          desc: '입국장 게이트에서 기사님과 미팅 후 남부 호텔/리조트로 이동 (소요시간 약 25분)',
          badge: '이동',
          linkedServiceCode: 'S1',
        },
        {
          time: '15:00 ~ 17:00',
          title: '호텔 체크인 & 웰컴 휴식',
          desc: '선셋타운 또는 켐비치 숙소에 체크인 후 편안한 복장으로 정비',
          badge: '숙소',
        },
        {
          time: '17:30 ~ 18:30',
          title: '선셋타운 센트럴 빌리지 산책 & 바다 조망',
          desc: '이탈리아 아말피를 연상시키는 알록달록한 골목길과 시계탑 광장 감상',
          badge: '관광',
        },
        {
          time: '18:00 ~ 18:30',
          title: '[필수 이벤트] 심포니 오브 더 씨 (Symphony of the Sea)',
          desc: '선셋타운 해안가에서 펼쳐지는 세계 정상급 제트스키 & 플라이보드 수상 퍼포먼스 쇼',
          badge: '필수 공연',
          isMustEvent: true,
          unverifiedNote: '기상 상황에 따라 공연 시간이 변동될 수 있습니다.',
        },
        {
          time: '19:00 ~ 21:00',
          title: '부이페스트 야시장(VUI-Fest) 탐방 & 해변 디너',
          desc: '베트남 최초의 해변 야시장에서 로컬 길거리 음식과 버스킹 공연, 수제 맥주 즐기기',
          badge: '식음료',
        },
      ],
    },
    {
      day: 2,
      title: '남부 바다의 에메랄드빛 매력 속으로',
      theme: '청정 군도 스노클링과 황홀한 선셋 낚시·크루즈 디너',
      summary: '푸꾸옥 남부에서 가장 투명한 바다를 찾아 스노클링을 즐기고, 저녁에는 선셋 낚시 또는 럭셔리 크루즈 디너 중 원하는 스타일을 선택합니다.',
      schedules: [
        {
          time: '08:00 ~ 09:00',
          title: '호텔 조식 및 투어 준비',
          desc: '물놀이 복장(수영복, 래시가드, 아쿠아슈즈, 자외선 차단제) 챙기기',
          badge: '준비',
        },
        {
          time: '09:30 ~ 15:00',
          title: '[옵션 A] 남부 3섬 / 4섬 호핑 투어',
          desc: '스피드보트를 타고 안토이 군도의 청정 산호 군락 스노클링 & 선상 해산물 중식',
          badge: '옵션 상품',
          linkedOptionCode: 'A',
        },
        {
          time: '15:30 ~ 17:00',
          title: '숙소 복귀 후 샤워 및 재충전 휴식',
          desc: '리조트 수영장에서 가벼운 릴랙스 타임 또는 휴식',
          badge: '휴식',
        },
        {
          time: '17:30 ~ 20:30',
          title: '[옵션 B] 선셋 바다낚시 또는 럭셔리 요트 크루즈 디너 (택1)',
          desc: '손맛 가득한 선셋 낚시 체험 또는 5성급 마르모리스 카타마란 요트에서 즐기는 로맨틱 디너',
          badge: '옵션 상품',
          linkedOptionCode: 'B',
        },
      ],
    },
    {
      day: 3,
      title: '선셋타운 집중 탐방 & 불꽃 축제',
      theme: '친환경 버기, 해양 레저, 라페스타 일몰, 키스 오브 더 씨',
      summary: '버기로 선셋타운을 편안하게 일주하고 해양 액티비티를 즐긴 뒤, 라페스타 루프탑 석양과 키스 오브 더 씨 메가 쇼를 만끽합니다.',
      schedules: [
        {
          time: '09:30 ~ 11:30',
          title: '[옵션 C] 선셋타운 친환경 버기 투어',
          desc: '선셋타운 골목 명소와 포토제닉 스폿을 전기 버기를 타고 시원하고 편안하게 순회',
          badge: '옵션 상품',
          linkedOptionCode: 'C',
        },
        {
          time: '12:00 ~ 13:30',
          title: '선셋타운 오션뷰 레스토랑 중식',
          desc: '베트남 정통 요리 또는 지중해풍 씨푸드 레스토랑에서 여유로운 점심',
          badge: '식음료',
          vendorName: null, // 공란 → 문의하기
        },
        {
          time: '14:00 ~ 16:30',
          title: '[옵션 D] 남부 해양 액티비티',
          desc: '혼똔섬 또는 켐비치에서 짜릿한 패러세일링, 제트스키, 바나나보트 체험',
          badge: '옵션 상품',
          linkedOptionCode: 'D',
        },
        {
          time: '17:30 ~ 19:30',
          title: '라페스타 루프탑 일몰 조망 & 선셋 칵테일',
          desc: '힐튼 라페스타 루프탑 바에서 키스 브릿지와 붉게 물드는 석양을 한눈에 내려다보는 골든아워',
          badge: '일몰 뷰',
        },
        {
          time: '21:00 ~ 21:30',
          title: '[필수 이벤트] 키스 오브 더 씨 (Kiss of the Sea) & 불꽃놀이',
          desc: '바다 위 초대형 특설무대에서 펼쳐지는 멀티미디어 쇼와 화려한 피날레 불꽃축제',
          badge: '필수 공연',
          isMustEvent: true,
          unverifiedNote: '화요일 정기 휴무 여부 및 무료 티켓 포함 프로모션은 현장 정책에 따라 변동되므로 확인 필요',
        },
      ],
    },
    {
      day: 4,
      title: '여유로운 마무리 & 안전한 귀국',
      theme: '기념품 쇼핑과 카페 힐링 후 전용 차량 샌딩',
      summary: '남부의 아침 바다를 여유롭게 산책하고 특산품을 쇼핑한 뒤, 전용 샌딩 차량으로 공항으로 이동하여 귀국길에 오릅니다.',
      schedules: [
        {
          time: '09:00 ~ 11:00',
          title: '호텔 체크아웃 준비 & 오션뷰 카페 티타임',
          desc: '선셋타운의 감성 카페에서 베트남 연유 커피(카페 쓰어다)와 함께 여행 사진 정리',
          badge: '카페',
        },
        {
          time: '11:30 ~ 13:30',
          title: '선셋타운 로컬 특산품 및 기념품 쇼핑',
          desc: '푸꾸옥 특산 진주, 후추, 캐슈넛, 건과일 등 선물용 쇼핑',
          badge: '쇼핑',
        },
        {
          time: '항공편 2.5시간 전',
          title: '[서비스 S2] 출국 공항 샌딩 차량 탑승',
          desc: '숙소 로비에서 기사님과 미팅 후 공항 출국장으로 편안하게 배송',
          badge: '공항 이동',
          linkedServiceCode: 'S2',
        },
      ],
    },
  ],
  companionPlaces: {
    family_kids: {
      label: '아이 동반 가족',
      places: [
        {
          id: 'cp-k1',
          name: '혼똔섬 아쿠아토피아 워터파크',
          category: '테마파크',
          desc: '동남아 최대급 워터슬라이드와 유수풀, 키즈 전용 물놀이 시설이 완비된 패밀리 파라다이스',
          tag: '어린이 인기 1위',
          image: '/tickets/hon-thom-cable-car.webp',
        },
        {
          id: 'cp-k2',
          name: '선셋타운 분수 광장 & 트램',
          category: '관광 스폿',
          desc: '넓고 안전한 보행자 전용 광장과 재미있는 클래식 트램 포토존',
          tag: '유모차 추천',
          image: '/features/general_sightseeing_640.webp',
        },
        {
          id: 'cp-k3',
          name: '키스 오브 더 씨 & 매일 밤 불꽃놀이',
          category: '야간 공연',
          desc: '거대한 워터스크린과 레이저, 밤하늘을 수놓는 불꽃으로 아이들의 탄성을 자아내는 공연',
          tag: '필수 관람',
          image: '/tickets/kiss-of-the-sea.webp',
        },
      ],
    },
    parents: {
      label: '부모님 동반',
      places: [
        {
          id: 'cp-p1',
          name: '기네스북 등재 혼똔섬 해상 케이블카',
          category: '명소',
          desc: '발아래 펼쳐지는 남부 옥빛 바다와 섬들을 편안히 조망하는 360도 파노라마 케이블카',
          tag: '효도 관광 필수',
          image: '/tickets/hon-thom-cable-car.webp',
        },
        {
          id: 'cp-p2',
          name: '호국사 (트룩람 호국선원)',
          category: '사찰 / 힐링',
          desc: '남부 바다를 품은 푸꾸옥 최대 사찰로 탁 트인 동해 바다 뷰와 고즈넉한 힐링',
          tag: '힐링 명소',
          image: '/features/hotel_featured_640.webp',
        },
        {
          id: 'cp-p3',
          name: '선셋타운 프리미엄 오션뷰 스파 마사지',
          category: '마사지 / 스파',
          desc: '여행의 피로를 풀어드리는 부모님 맞춤 전통 허브 핫스톤 스파',
          tag: '문의하기',
          image: '/features/hotel_featured_1280.webp',
        },
      ],
    },
    couples: {
      label: '커플',
      places: [
        {
          id: 'cp-c1',
          name: '키스 브릿지 (Kiss Bridge)',
          category: '일몰 랜드마크',
          desc: '바다 한가운데서 마주보는 50cm 간격의 다리. 세상에서 가장 로맨틱한 일몰 키스 사진의 명소',
          tag: '인생샷 필수',
          image: '/tickets/kiss-bridge.webp',
        },
        {
          id: 'cp-c2',
          name: '라페스타 루프탑 바 (The Sky Bar)',
          category: '루프탑 / 칵테일',
          desc: '지중해풍 건물 위에서 키스 브릿지와 선셋, 밤에는 불꽃놀이를 칵테일과 함께 조망',
          tag: '로맨틱 핫플',
          image: '/features/nightlife_featured_640.webp',
        },
        {
          id: 'cp-c3',
          name: '마르모리스 5성급 선셋 요트 크루즈',
          category: '럭셔리 다이닝',
          desc: '붉게 타오르는 석양 아래 샴페인과 라이브 바이올린 음악을 즐기는 럭셔리 요트',
          tag: '커플 인기',
          image: '/activities/marmoris/sunset-1.webp',
        },
      ],
    },
    friends: {
      label: '친구 동행',
      places: [
        {
          id: 'cp-f1',
          name: '켐비치 비치클럽 & 펍 (루프탑/비치)',
          category: '비치 라이프',
          desc: '하얀 백사장 위 선베드에서 트로피컬 칵테일과 신나는 비트의 음악을 즐기는 핫플레이스',
          tag: '나이트라이프',
          image: '/zones/khem-beach-hero.webp',
        },
        {
          id: 'cp-f2',
          name: '남부 스피드보트 제트스키 & 패러세일링',
          category: '익스트림 레저',
          desc: '친구들과 함께 환호성을 지르며 바다 위를 가르는 스릴 만점 해양 스포츠',
          tag: '액티비티',
          image: '/features/activities_featured_640.webp',
        },
        {
          id: 'cp-f3',
          name: '부이페스트(VUI-Fest) 야시장 길거리 먹거리',
          category: '야시장 / 펍',
          desc: '로컬 크래프트 맥주와 직화 바비큐, 신나는 버스킹 공연을 함께 즐기는 밤문화',
          tag: '먹거리 천국',
          image: '/banners/event_nightlife.webp',
        },
      ],
    },
    solo: {
      label: '혼자 여행 (싱글)',
      places: [
        {
          id: 'cp-s1',
          name: '선셋타운 파스텔 골목 감성 출사 산책',
          category: '사진 / 산책',
          desc: '줄리아나 분수, 로마 원형극장, 아치형 테라스 등 나만의 속도로 걷는 아름다운 골목길',
          tag: '감성 사진',
          image: '/features/general_sightseeing_1280.webp',
        },
        {
          id: 'cp-s2',
          name: '선셋타운 스페셜티 로스터리 카페 탐방',
          category: '카페',
          desc: '바다가 보이는 창가에 앉아 시원한 코코넛 커피와 독서를 즐기는 여유',
          tag: '오션뷰 힐링',
          image: '/features/dining_featured_640.webp',
        },
        {
          id: 'cp-s3',
          name: '키스 브릿지 석양 산책',
          category: '힐링',
          desc: '탁 트인 수평선 너머로 저무는 해를 바라보며 생각을 정리하는 나만의 힐링 모먼트',
          tag: '힐링 스폿',
          image: '/tickets/kiss-bridge.webp',
        },
      ],
    },
  },
}
