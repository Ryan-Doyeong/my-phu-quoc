# 푸꾸옥 후기 일정 레코드 스키마 (JSON 배열의 각 원소)
{
  "id": "ko-001",                       // 언어코드-번호
  "source_url": "https://...",
  "source_title": "페이지 제목",
  "source_type": "blog|forum|review_site|news|video_description|other",
  "language": "ko|en|vi|ru|ja|zh|other",
  "published": "YYYY-MM" | null,
  "trip_date": "YYYY-MM" | null,
  "traveler_type": "couple|family_kids|parents|friends|solo|group|unknown",
  "group_size": 2 | null,
  "nights": 3 | null,
  "stays": [{"region": "south|central|north", "area": "Sunset Town / Khem Beach / Duong Dong ...", "hotel": "이름 또는 null", "nights": 2 | null}],
  "arrival_time": "dawn|morning|afternoon|evening|late|null",     // 00-06/06-12/12-18/18-22/22-24
  "departure_time": "dawn|morning|afternoon|evening|late|null",
  "days": [
    {"day": 1, "items": [
      {"slot": "early_morning|morning|lunch|afternoon|sunset|evening|night",
       "place": "장소/상품 영문 또는 원어 명칭 (예: Ho Quoc Pagoda, Sunset Town, Kiss of the Sea)",
       "category": "sight|food|cafe|show|tour|beach|activity|massage|shopping|transport|rest|checkin",
       "region": "south|central|north|island|unknown",
       "note": "짧은 요약(직접 인용 금지, 15단어 이내 바꿔 쓰기)"}
    ]}
  ],
  "liked": ["만족 포인트 요약"],
  "disliked": ["불만/아쉬움 요약"],
  "tips": ["실용 팁 요약 (시간·이동·예약 등)"],
  "satisfaction": "high|medium|low|unknown",
  "satisfaction_basis": "판단 근거 한 줄",
  "mentions": {"symphony_of_the_sea": false, "kiss_of_the_sea": false, "hopping": false, "cable_car": false,
               "squid_fishing": false, "cruise_dinner": false, "massage": false, "buggy": false,
               "scooter": false, "grab_taxi": false, "night_market": false, "safari_vinwonders": false},
  "prices_mentioned": [{"item": "...", "price": "...", "currency": "VND|USD|KRW|...", "as_of": "YYYY-MM" | null}]
}
