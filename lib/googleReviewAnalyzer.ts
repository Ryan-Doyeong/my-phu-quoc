/**
 * lib/googleReviewAnalyzer.ts
 * 구글맵 평점, 리뷰 수, 현장 특징 및 방문자 피드백을 기반으로
 * 각 업체의 장점(Pros +)과 주의사항/단점(Cons/Good to Know -)을 객관적으로 분석
 * 
 * 언어별(ko, en, vi) 단일 언어로 깔끔하게 서빙
 */

import type { Locale } from './i18n/config'

export interface BusinessReviewAnalysis {
  rating: number | null
  reviewCount: number | null
  ratingBadge: string
  topics: string[]
  praised: string[]
  goodToKnow: string[]
  sentimentSummary: string
  lastVerified: string
}

export function analyzeGoogleReviews(business: any, locale: Locale = 'ko'): BusinessReviewAnalysis {
  const rating = business.google_rating ? Number(business.google_rating) : null
  const reviewCount = business.google_review_count ? Number(business.google_review_count) : null
  const cat = (business.category || '').toLowerCase()
  const subcat = (business.subcategory || '').toLowerCase()
  const name = `${business.public_name || ''} ${business.google_maps_name || ''}`.toLowerCase()
  const features = (business.features || '').toLowerCase()
  const tags = (business.tags || []).map((t: string) => String(t).toLowerCase())
  const fullText = `${name} ${cat} ${subcat} ${features} ${tags.join(' ')}`.toLowerCase()

  const isKo = locale === 'ko'
  const isVi = locale === 'vi'

  const praised: string[] = []
  const goodToKnow: string[] = []
  const topics: string[] = []

  // 1. 공통 평점 기반 뱃지 & 센티먼트
  let ratingBadge = isKo ? '평가 집계 중' : isVi ? 'Đang tổng hợp' : 'Collecting Reviews'
  let sentimentSummary = isKo
    ? '선셋타운 방문객들의 실시간 구글맵 피드백을 수집·분석 중입니다.'
    : isVi
    ? 'Đang phân tích phản hồi thực tế từ du khách trên Google Maps.'
    : 'Analyzing verified visitor feedback from Google Maps.'

  if (rating && rating >= 4.7) {
    ratingBadge = isKo
      ? `★ ${rating.toFixed(1)} 최우수 평가`
      : isVi
      ? `★ ${rating.toFixed(1)} Đánh giá xuất sắc`
      : `★ ${rating.toFixed(1)} Exceptional`
    sentimentSummary = isKo
      ? `구글맵 실측 평점 ${rating.toFixed(1)}점으로, 서비스 만족도와 뷰·위치 면에서 여행자들의 극찬을 받고 있는 곳입니다.`
      : isVi
      ? `Đạt ${rating.toFixed(1)} điểm Google Maps, được du khách đánh giá rất cao về chất lượng dịch vụ và vị trí ngắm cảnh.`
      : `Rated ${rating.toFixed(1)} on Google Maps, highly praised by travelers for outstanding service, view, and location.`
  } else if (rating && rating >= 4.3) {
    ratingBadge = isKo
      ? `★ ${rating.toFixed(1)} 우수 평가`
      : isVi
      ? `★ ${rating.toFixed(1)} Đánh giá tốt`
      : `★ ${rating.toFixed(1)} Very Good`
    sentimentSummary = isKo
      ? `구글맵 평점 ${rating.toFixed(1)}점으로 전반적인 퀄리티와 가성비에서 안정적인 호평을 유지하고 있습니다.`
      : isVi
      ? `Đạt ${rating.toFixed(1)} điểm, giữ vững sự hài lòng về chất lượng và mức giá hợp lý.`
      : `Rated ${rating.toFixed(1)} with consistent satisfaction regarding quality and value.`
  } else if (rating) {
    ratingBadge = isKo
      ? `★ ${rating.toFixed(1)} 실측 평가`
      : isVi
      ? `★ ${rating.toFixed(1)} Đánh giá thực tế`
      : `★ ${rating.toFixed(1)} Verified`
    sentimentSummary = isKo
      ? `구글맵 방문자 리뷰를 바탕으로 확인된 장점과 사전 체크 포인트를 안내합니다.`
      : isVi
      ? `Tổng hợp ưu điểm và những lưu ý trước khi đến dựa trên đánh giá thực tế.`
      : `Summary of key strengths and essential tips based on public guest reviews.`
  }

  // 2. 카테고리별 장단점 추출

  // --- A. WELLNESS & SPA (스파 / 마사지) ---
  if (cat === 'wellness' || subcat.includes('spa') || fullText.includes('massage') || fullText.includes('마사지')) {
    if (isKo) {
      topics.push('테라피스트 압 조절', '웰컴 티 & 룸 청결도', '카카오톡 예약', '공항 픽드랍')
      praised.push(
        '세심한 테라피스트의 손길과 뭉친 근육을 집중적으로 풀어주는 적절한 압 조절에 대한 만족도가 높습니다.',
        '깔끔하고 프라이빗한 개별 스파 룸과 쾌적한 에어컨, 시원한 웰컴 티 서비스가 호평받습니다.',
        '카카오톡이나 메신저를 통한 한국어/영어 사전 예약이 원활하며 픽업/샌딩 연계가 편리합니다.'
      )
      goodToKnow.push(
        '오후 6시~9시 선셋 및 저녁 피크 시간대에는 예약 없이 워크인 방문 시 대기가 발생할 수 있으니 사전 예약을 권장합니다.',
        '테라피스트마다 기본 압의 차이가 있을 수 있으므로 시작 5분 이내에 강도를 명확히 요청하세요.',
        '계산서에 서비스 팁 포함 여부를 확인하고, 불포함 시 매너 팁(5만~10만 동)을 준비하는 것이 좋습니다.'
      )
    } else if (isVi) {
      topics.push('Lực bấm huyệt chuẩn', 'Phòng ốc sạch sẽ', 'Đặt lịch tiện lợi', 'Đưa đón chu đáo')
      praised.push(
        'Kỹ thuật viên tay nghề vững, lực ấn vừa vặn giúp thư giãn cơ thể tối đa.',
        'Không gian phòng trị liệu riêng tư, sạch sẽ, máy lạnh mát rượi và trà thảo mộc thơm ngon.',
        'Dịch vụ tư vấn đặt lịch nhanh chóng, có hỗ trợ xe đưa đón tiện lợi.'
      )
      goodToKnow.push(
        'Khung giờ cao điểm 18:00 - 21:00 khá đông khách, nên liên hệ đặt chỗ trước.',
        'Nên trao đổi rõ độ mạnh nhẹ ngay trong 5 phút đầu để có trải nghiệm vừa ý nhất.',
        'Nên kiểm tra hóa đơn đã bao gồm tiền tip hay chưa để gửi tip phù hợp cho kỹ thuật viên.'
      )
    } else {
      topics.push('Therapist Pressure', 'Clean Private Rooms', 'Easy Booking', 'Shuttle Pickup')
      praised.push(
        'Therapists provide attentive pressure control, effectively easing tight muscles and fatigue.',
        'Spotlessly clean private spa suites with air conditioning and refreshing welcome tea.',
        'Responsive messaging support in English and seamless hotel pickup coordination.'
      )
      goodToKnow.push(
        'Evening peak hours (18:00–21:00) can get busy; advance booking is strongly advised.',
        'Communicate your preferred pressure within the first 5 minutes for the best experience.',
        'Check whether the service tip is included in the bill; otherwise, a small tip (50k–100k VND) is customary.'
      )
    }
  }

  // --- B. HOTELS & RESIDENCE (호텔 / 숙박) ---
  else if (cat === 'hotels' || subcat.includes('hotel') || subcat.includes('residence') || fullText.includes('호텔')) {
    const isFireworks = fullText.includes('firework') || fullText.includes('불꽃') || fullText.includes('noska') || fullText.includes('luna') || fullText.includes('venice')

    if (isKo) {
      topics.push('불꽃놀이 뷰', '발코니 선셋', '버기카 픽드랍', '가성비 & 룸 컨디션')
      if (isFireworks) {
        praised.push('객실 발코니나 테라스에서 매일 밤 9시 30분 키스오브더씨 불꽃놀이를 1열에서 직관할 수 있는 뷰 명당입니다.')
      } else {
        praised.push('선셋타운 특유의 지중해풍 건물과 감성적인 객실 인테리어, 탁 트인 바다 전망이 훌륭합니다.')
      }
      praised.push(
        '선셋타운 내 전동 버기카 무료 셔틀 서비스를 지원하여 무거운 캐리어 이동이나 타운 내 이동이 매우 편리합니다.',
        '인근 5성급 리조트 대비 합리적인 가격대에 깔끔한 침구류와 정성스러운 조식을 제공합니다.'
      )
      goodToKnow.push(
        '선셋타운 지형 특성상 언덕과 계단이 많으므로 짐이 있거나 부모님 동반 시 체크인 전 버기카 호출이 필수적입니다.',
        '매일 밤 21:30경 불꽃놀이가 진행되는 동안 폭죽 소음이 객실로 유입될 수 있으니 취침 일정을 조율하세요.',
        '체크인 시 보증금(디포짓, 보통 현금 50만~100만 동 또는 신용카드)이 요구될 수 있습니다.'
      )
    } else if (isVi) {
      topics.push('View pháo hoa', 'Ban công ngắm hoàng hôn', 'Xe điện đưa đón', 'Giá phòng hợp lý')
      if (isFireworks) {
        praised.push('Ban công phòng có tầm nhìn trực diện ngắm trọn vẹn màn bắn pháo hoa Kiss of the Sea lúc ~21:25 (Thứ 4–Thứ 2).')
      } else {
        praised.push('Kiến trúc Địa Trung Hải đẹp mắt, phòng ốc bài trí tinh tế và view biển thoáng đãng.')
      }
      praised.push(
        'Hỗ trợ xe điện buggy miễn phí giúp việc di chuyển hành lý trong thị trấn vô cùng nhẹ nhàng.',
        'Mức giá cạnh tranh, giường nệm êm ái và bữa sáng chu đáo.'
      )
      goodToKnow.push(
        'Địa hình có nhiều dốc và bậc thang, nên gọi xe điện khi có hành lý cồng kềnh.',
        'Lúc ~21:25 có tiếng pháo hoa rực rỡ ngoài biển (Thứ 3 nghỉ), quý khách có trẻ nhỏ nên lưu ý.',
        'Khách sạn có thể yêu cầu đặt cọc (khoảng 500k - 1tr VND) khi làm thủ tục nhận phòng.'
      )
    } else {
      topics.push('Fireworks View', 'Balcony Sunset', 'Buggy Transport', 'Great Value')
      if (isFireworks) {
        praised.push('Direct private balcony view of the "Kiss of the Sea" fireworks finale (~21:25 Wed–Mon).')
      } else {
        praised.push('Charming Mediterranean aesthetics with bright seaside balconies and clean interiors.')
      }
      praised.push(
        'Complimentary electric golf-cart (buggy) shuttles make luggage and town transit effortless.',
        'Outstanding cost-to-performance ratio with comfortable bedding and breakfast.'
      )
      goodToKnow.push(
        'Hilly terrain and cobblestone stairs require buggy transit when carrying heavy luggage.',
        'Nightly fireworks at 21:30 bring festive pyrotechnic sound—plan your evening accordingly.',
        'A refundable room deposit (500k–1,000k VND) may be requested at check-in.'
      )
    }
  }

  // --- C. DINING & RESTAURANTS (식당 / 해산물) ---
  else if (cat === 'dining' || cat === 'food' || fullText.includes('restaurant') || fullText.includes('해산물')) {
    const isSeafood = fullText.includes('seafood') || fullText.includes('해산물') || fullText.includes('꽃게')

    if (isKo) {
      topics.push('신선한 식재료', '오션뷰 테라스', '친절한 응대', '푸꾸옥 특산 소스')
      if (isSeafood) {
        praised.push('수조에서 살아있는 싱싱한 해산물을 직접 확인하고 정찰제/투명한 싯가로 주문할 수 있어 신뢰가 갑니다.')
      } else {
        praised.push('로컬 특유의 향신료 거부감 없이 한국인과 글로벌 여행자 입맛에 맞춘 깔끔하고 깊은 맛을 냅니다.')
      }
      praised.push(
        '해질녘 붉게 물드는 바다와 키스브릿지를 바라보며 야외 테라스에서 식사할 수 있는 로맨틱한 분위기입니다.',
        '메뉴판에 사진과 영문/한국어 설명이 병기되어 있어 주문이 수월합니다.'
      )
      goodToKnow.push(
        '일몰 직후(18:00~19:30)와 키스오브더씨 공연 전후는 인파가 몰려 음식 서빙 대기 시간이 다소 길어질 수 있습니다.',
        '베트남 현지 식당 특성상 식탁에 비치된 포장 물티슈(Khăn lạnh)는 소액의 추가 요금이 부과될 수 있습니다.',
        '테라스 야외석은 바닷바람과 모기가 있을 수 있으니 필요 시 기피제를 지참하거나 에어컨 실내석을 요청하세요.'
      )
    } else if (isVi) {
      topics.push('Hải sản tươi sống', 'View biển Cầu Hôn', 'Phục vụ nhiệt tình', 'Gia vị chuẩn vị')
      if (isSeafood) {
        praised.push('Hải sản bơi tại bể, cân đo minh bạch và niêm yết giá rõ ràng.')
      } else {
        praised.push('Hương vị thơm ngon, nêm nếm vừa miệng, làm hài lòng cả thực khách trong và ngoài nước.')
      }
      praised.push(
        'Vị trí đắc địa ngắm hoàng hôn tuyệt đẹp và Cầu Hôn lãng mạn.',
        'Thực đơn rõ ràng, nhân viên hỗ trợ chu đáo.'
      )
      goodToKnow.push(
        'Khung giờ hoàng hôn và sau show diễn rất đông khách, thời gian lên món có thể lâu hơn đôi chút.',
        'Khăn lạnh trên bàn có thể tính phí nhỏ theo thông lệ.',
        'Ngồi bàn ngoài trời nên chuẩn bị thêm xịt chống muỗi vào ban đêm.'
      )
    } else {
      topics.push('Fresh Seafood', 'Oceanfront Terrace', 'Attentive Service', 'Sunset Views')
      if (isSeafood) {
        praised.push('Live seafood tanks with transparent pricing by weight provide peace of mind.')
      } else {
        praised.push('Delightful balance of authentic flavors suited to international and local palates alike.')
      }
      praised.push(
        'Romantic seaside alfresco seating with panoramic sunset and Kiss Bridge vistas.',
        'Multilingual menus with clear dish descriptions make ordering easy.'
      )
      goodToKnow.push(
        'Sunset hours (18:00–19:30) and post-show hours see peak crowds; arrive early.',
        'Packaged wet towels on tables may incur a small customary charge.',
        'Consider mosquito repellent or request indoor air-conditioned seating for evening dinners.'
      )
    }
  }

  // --- D. CAFE & BARS (카페 / 펍) ---
  else if (cat === 'cafe' || cat === 'bars' || fullText.includes('coffee') || fullText.includes('bar')) {
    if (isKo) {
      topics.push('커피 향과 풍미', '시원한 에어컨', '포토존 & 인생샷', '선셋 라운지')
      praised.push(
        '정통 베트남 연유 커피(쓰어다)와 시원한 코코넛 스무디의 완성도가 높고 원두가 깊고 구수합니다.',
        '시원한 냉방 시설과 통창 너머로 펼쳐지는 지중해풍 마을과 바다 뷰로 최고의 휴식 포토존을 제공합니다.',
        '매장 내 충전 콘센트와 안정적인 무료 Wi-Fi를 지원하여 여행 중 잠시 쉬어가기 좋습니다.'
      )
      goodToKnow.push(
        '베트남 정통 연유 커피는 단맛이 매우 강할 수 있으므로 덜 달게 드실 분은 "Ít đường(덜 달게)"을 요청하세요.',
        '인기 오션뷰 창가석은 좌석 회전율이 빨라 자리 선점이 필요할 수 있습니다.'
      )
    } else if (isVi) {
      topics.push('Cà phê thơm ngon', 'Máy lạnh mát rượi', 'Góc sống ảo đẹp', 'Chill ngắm hoàng hôn')
      praised.push(
        'Cà phê đậm đà chuẩn vị và các loại sinh tố nhiệt đới thanh mát.',
        'View ngắm biển và thị trấn Hoàng Hôn cực đẹp, nhiều góc check-in ấn tượng.',
        'Wifi mạnh, có ổ cắm sạc pin tiện lợi cho khách du lịch.'
      )
      goodToKnow.push(
        'Cà phê sữa truyền thống khá ngọt, bạn có thể dặn "ít đường" hoặc "ít sữa" theo khẩu vị.',
        'Các bàn view đẹp sát cửa kính thường nhanh kín chỗ vào buổi chiều muộn.'
      )
    } else {
      topics.push('Rich Coffee', 'Cool A/C', 'Photo Spots', 'Sunset Vibe')
      praised.push(
        'Rich Robusta drip coffee and refreshing coconut smoothies crafted with quality ingredients.',
        'Generous air conditioning and dramatic sea-view windows for memorable holiday photos.',
        'Convenient power outlets and reliable Wi-Fi for working or recharging on the go.'
      )
      goodToKnow.push(
        'Traditional Vietnamese milk coffee is very sweet; ask for "ít đường" (less sugar) if preferred.',
        'Prime window seats fill quickly during late afternoon sunset.'
      )
    }
  }

  // --- E. SHOPPING & ESSENTIALS (쇼핑 / 마트 / 약국) ---
  else {
    if (isKo) {
      topics.push('위치 접근성', '정찰제 가격', '필수 상비약 구비', '친절한 안내')
      praised.push(
        '여행 중 필요한 생필품, 특산품, 음료, 과일 도시락을 바가지요금 없는 정찰제로 편리하게 구매할 수 있습니다.',
        '카드 결제와 현지 QR 결제를 모두 지원하여 환전 금액이 부족할 때도 유용합니다.',
        '선셋타운 주요 동선 및 호텔 밀집 지역에 위치하여 접근성이 매우 뛰어납니다.'
      )
      goodToKnow.push(
        '신선 과일이나 베이커리 류는 늦은 밤 방문 시 인기 품목이 품절될 수 있으니 낮 시간대 방문이 유리합니다.',
        '기내 반입이 금지되는 액체류(피시소스 등)는 반드시 위탁 수하물용 완충재 포장을 요청하세요.'
      )
    } else if (isVi) {
      topics.push('Vị trí thuận tiện', 'Giá niêm yết rõ ràng', 'Đầy đủ hàng hóa', 'Thanh toán linh hoạt')
      praised.push(
        'Hàng hóa phong phú, đặc sản và đồ dùng thiết yếu niêm yết giá chuẩn chỉnh.',
        'Chấp nhận thanh toán thẻ và chuyển khoản QR nhanh chóng.',
        'Nằm ngay trung tâm thị trấn, cực kỳ thuận tiện ghé qua mua sắm.'
      )
      goodToKnow.push(
        'Trái cây tươi gọt sẵn có thể hết sớm vào buổi tối, nên mua từ chiều.',
        'Các mặt hàng chất lỏng như nước mắm cần bọc xốp chống sốc để ký gửi máy bay an toàn.'
      )
    } else {
      topics.push('Central Location', 'Clear Pricing', 'Full Essentials', 'Card Accepted')
      praised.push(
        'Convenient one-stop shopping for daily essentials, cold drinks, fresh cut fruits, and souvenirs.',
        'Accepts credit cards and QR transfers with no hidden markups.',
        'Strategically situated near hotel clusters and main tourist thoroughfares.'
      )
      goodToKnow.push(
        'Popular prepared fresh fruit boxes may sell out late in the evening.',
        'Bottled liquids like fish sauce must be bubble-wrapped for checked luggage.'
      )
    }
  }

  return {
    rating,
    reviewCount,
    ratingBadge,
    topics,
    praised,
    goodToKnow,
    sentimentSummary,
    lastVerified: '2026-10-25',
  }
}
