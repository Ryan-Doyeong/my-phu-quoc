"""배치1 중 공식 메뉴·가격 근거를 확인하지 못한 업체를 D등급으로 기록."""
from menu_lib import save

TRIED = "2026-10-22"

def d(name, tried, notes, **kw):
    save(name, "D", "not_found", tried, [], worker_notes=notes, **kw)

d("Kadhai Indian Restaurant Sunset Town (Phu Quoc)",
  [{"id": "s1", "type": "official_website", "url": "https://kadhaivietnam.com/", "accessed": TRIED,
    "note": "브랜드 홈페이지는 열림. 사진·소개만 있고 메뉴·가격 페이지 없음(메뉴 링크 탐색 결과 없음)"},
   {"id": "s2", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJdbjrShmVpzER-zfUU0OhqPg", "accessed": TRIED,
    "note": "장소 패널에 가격(₫) 표시·메뉴 탭 없음"}],
  "공식 사이트에 품목별 메뉴·가격 없음. 웹 검색 요약은 '일반적인 인도 식당 가격'을 말하는 내용이라 근거로 쓰지 않음. 페이스북 페이지에서 메뉴판 사진을 확인하면 B등급 이상으로 올릴 수 있음(이번에는 페이스북 접속 불가).")

d("Antalya Turkish Cuisine-Sunset Town",
  [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJ5ZFzqOiVpzERxxGEcmIZi3g", "accessed": TRIED,
    "note": "공식 홈페이지 없음, 가격(₫) 표시 없음"}],
  "검색 요약에 나온 케밥·피데 가격은 'Sultan Turkish Kebab'(다른 업체) 이야기였고 출처가 페이스북 그룹 게시물이라 Antalya의 근거로 쓰지 않음.")

d("Amritsar Grill Indian Restaurant",
  [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJFYbEOYuVpzERNhVUrah1-3Y", "accessed": TRIED,
    "note": "공식 홈페이지 없음, 가격(₫) 표시 없음"}],
  "검색 요약의 가격은 '푸꾸옥 인도 식당의 일반적 가격'이라 근거로 쓰지 않음. 주소는 요약에 'OTM 7-11 (S223), Gateway Urban Area'로 나오나 원문 미확인.")

d("Rasa Nusantara Phú Quốc",
  [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJX83fV32VpzERWuVp_qZeJVc", "accessed": TRIED,
    "note": "구글맵에는 평점 5.0으로 등록돼 있으나 공식 채널·가격 표시 없음"}],
  "웹 검색에서는 같은 이름의 푸꾸옥 식당을 찾지 못함. 구글맵 등록 정보와 어긋나므로 현장 확인이 필요하며, 폐업·이전 여부도 불확실.")

d("Mai Hương Restaurant - Sunset Town",
  [{"id": "s1", "type": "facebook", "url": "https://www.facebook.com/MaiHuongSunset/", "accessed": TRIED, "note": "마스터 DB의 SNS 링크, 접속 불가"},
   {"id": "s2", "type": "third_party", "url": "https://checkinvietnam.io/clients/restaurants/80", "accessed": TRIED,
    "note": "열렸으나 GrandWorld(VinWonders) 지점 정보라 선셋타운 지점에는 사용하지 않음"}],
  "제3자 사이트의 '10$~100$' 가격대는 그랜드월드 지점 기준이라 선셋타운 지점의 근거가 아님. 검색 요약의 '1인 20만~100만 동'은 출처가 trip.com 등 원문 미확인이라 채택하지 않음.")

d("Maharaja Lounge - 100% Pure Veg Authentic Indian Restaurant Sunset Town",
  [{"id": "s1", "type": "official_website", "url": "https://maharajalounge.com/", "accessed": TRIED, "note": "봇 차단(HTTP 406)으로 내용 확인 불가"},
   {"id": "s2", "type": "third_party", "url": "https://www.happycow.net/reviews/maharaja-lounge-phu-quoc-334629", "accessed": TRIED, "note": "열었으나 본문에서 가격을 추출하지 못함"}],
  "검색 요약에는 '탈리·콤보 78,000~160,000 동, 단품 38,000~130,000 동'이라고 HappyCow를 인용했으나 원문에서 확인하지 못해 가격대로 올리지 않음(확인되지 않은 단서). 브라우저로 maharajalounge.com 메뉴 페이지를 직접 보면 A등급 가능성이 큼.")

d("Turkish Kitchen",
  [{"id": "s1", "type": "google_maps", "url": "https://www.google.com/maps/place/?q=place_id:ChIJkfRb6NeVpzERPDPeRKGHXZ0", "accessed": TRIED,
    "note": "공식 채널 없음, 가격(₫) 표시 없음"}],
  "검색 요약은 'Sultan Turkish Kebab'의 가격이라 다른 업체로 보고 사용하지 않음.")
