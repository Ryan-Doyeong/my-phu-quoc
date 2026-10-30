-- 027_seed_articles_01_02.sql
-- Ryan 승인 완료된 1편 및 2편 갱신본 발행 시드 SQL
BEGIN;

-- 1편: 심포니 오브 더 씨 시즌 3 개막 (공식 발표 기준 갱신본)
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko
) VALUES (
  'symphony-of-the-sea-season-3-opening', 'Phu Quoc Symphony of the Sea Season 3 Opening Guide — Official Announcement Overview', '푸꾸옥 심포니 오브 더 씨 시즌 3 개막 총정리 — 공식 발표 기준 안내', 'Event & Show', 'news', 'published', TRUE, '2026-10-27T08:00:00+07:00', '/stock/symphony-of-the-sea-season-3-cover.webp', 'AI-generated illustration: Jetski and flyboard performance at Symphony of the Sea off Kiss Bridge in Sunset Town, Phu Quoc', 'AI-generated illustration: 푸꾸옥 선셋타운 키스브릿지 인근 해상에서 펼쳐지는 심포니 오브 더 씨 제트스키·플라이보드 공연 일러스트', 'Official details for Symphony of the Sea Season 3 opening November 10, 2026 in Sunset Town, Phu Quoc: ~30 international artists, 14 jetskis, 8 flyboards, 3x fireworks, and an ocean piano.', '2026년 11월 10일 개막하는 푸꾸옥 선셋타운 ''심포니 오브 더 씨'' 시즌 3 공식 발표 소식. 30여 명의 아티스트, 제트스키 14대, 플라이보드 8대, 3배 확대된 해상 불꽃놀이 안내.', 'Phu Quoc Symphony of the Sea Season 3 Opening Guide — Official Announcement Overview', '푸꾸옥 심포니 오브 더 씨 시즌 3 개막 총정리 — 공식 발표 기준 안내', 'Official details for Symphony of the Sea Season 3 opening November 10, 2026 in Sunset Town, Phu Quoc: ~30 international artists, 14 jetskis, 8 flyboards, 3x fireworks, and an ocean piano.', '2026년 11월 10일 개막하는 푸꾸옥 선셋타운 ''심포니 오브 더 씨'' 시즌 3 공식 발표 소식. 30여 명의 아티스트, 제트스키 14대, 플라이보드 8대, 3배 확대된 해상 불꽃놀이 안내.', '## [1] Executive Summary

The maritime action spectacular **''Symphony of the Sea'' (Bản giao hưởng của biển)** in Sunset Town, Phu Quoc, Vietnam, will raise the curtain on Season 3 on November 10, 2026. According to official posts on the Sun Paradise Land Phu Quoc Facebook page (dated 2026-10-25/26), this season features approximately 30 international artists, 14 jetskis (per official post), and 8 flyboards. The maritime fireworks display will expand to three times its previous scale, accompanied by an all-new floating ocean piano.

## [2] Season 3 Overview Table

| Item | Details | Source |
|---|---|---|
| Opening Date | November 10, 2026 | Sun Paradise Land Phu Quoc Official Facebook (2026-10-26 post) |
| Venue | Waters off Sunset Town | My Phu Quoc Facility Page Listing |
| Duration | Approx. 20 minutes | Official Facebook Posts |
| Cast | Approx. 30 international artists | Official Facebook (2026-10-25/26 posts) |
| Equipment | 14 jetskis (per official post), 8 flyboards | Official Facebook (2026-10-25/26 posts) |
| Maritime Fireworks | Expanded to 3 times previous scale | Official Facebook (2026-10-25/26 posts) |
| New Production | Floating ocean piano, ~400m coastal laser effects | Official Facebook (2026-10-25/26 posts) |
| Fireworks Team | Champion team from China, runner-up from Portugal (Danang Int''l Fireworks Festival) | Official Facebook (2026-10-25 post) |

Official Facebook: https://www.facebook.com/SunParadiseLandPhuQuoc

**Featured Athletes from Official Posts**
- **Lee Sak Yoon**: Hydroflight Champion
- **Aleksandr Malykh**: Flyboard
- **Kristina Isaeva**: Hydrofest Runner-up

**Athletes Featured in Vietnamese Media** (Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12)
- **Ekaterina Poliakina**: Flyboard (Russia)
- **Andrei Smirnov**: Flyboard (Russia)
- **German Khomiakov**: Jetski (Russia)
- **Warit Ruangrob**: Jetski (Thailand)

## [3] Visitor Tips

① **Check Official Channels**: Stay up to date with the latest Season 3 announcements directly on the official Sun Paradise Land Phu Quoc Facebook page.

② **Explore Sunset Town Coastline (Suggested)**: Sunset Town features [Kiss Bridge (Cầu Hôn)](https://myphuquoc.net/business/kiss-bridge) stretching into the sea (per My Phu Quoc facility page). Consider including it in your travel itinerary.

## [4] Suggested Itinerary (Proposal)

*(※ This itinerary is a recommendation by the My Phu Quoc editorial team; adjustments may be made based on on-site conditions.)*

1. **Daytime**: Enjoy daytime attractions such as the [Hon Thom Cable Car](https://myphuquoc.net/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc).
2. **Evening**: Stroll Mediterranean-style streets and around [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge) while watching the sunset.
3. **Nighttime**: Savor local street food at [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town), followed by the maritime action show on the water.
4. **Transit**: Use the [Sunset Town electric buggy service](https://myphuquoc.net/business/sun-group-sunset-town-electric-buggy-service) for town transit (see facility page for stops).

## [5] Frequently Asked Questions (FAQ)

**Q. When does Season 3 premiere?**
The show opens on November 10, 2026 (Sun Paradise Land Phu Quoc official Facebook, 2026-10-26 post).

**Q. How does it differ from Kiss of the Sea at 21:00?**
- **Symphony of the Sea**: An ocean action performance staged on the sea by jetski and flyboard athletes.
- **Kiss of the Sea**: Runs from 21:00 to 21:30 with an ocean fireworks finale around 21:25 (per My Phu Quoc [sunset-place-10](https://myphuquoc.net/business/sunset-place-10) listing).', '## [1] 핵심 요약

베트남 푸꾸옥 선셋타운(Sunset Town)의 해상 액션 쇼 ''심포니 오브 더 씨(Symphony of the Sea / Bản giao hưởng của biển)''가 2026년 11월 10일 시즌 3의 막을 올립니다. 선월드 파라다이스랜드 푸꾸옥 공식 페이스북(2026-10-25/26 게시글) 기준으로, 이번 시즌에는 국제 아티스트 약 30명이 참여하고, 제트스키 14대(공식 게시글 기준)와 플라이보드 8대가 출동합니다. 해상 불꽃놀이 규모는 이전 대비 3배로 확대되고, 바다 위 피아노도 새롭게 등장합니다.

## [2] 시즌 3 정보 표

| 항목 | 내용 | 출처 |
|---|---|---|
| 개막일 | 2026년 11월 10일 | 선월드 파라다이스랜드 푸꾸옥 공식 페이스북 (2026-10-26 게시글) |
| 공연 장소 | 선셋타운(Sunset Town) 해상 | 마이푸꾸옥 시설 페이지 기재 기준 |
| 공연 시간 | 약 20분 | 공식 페이스북 게시글 |
| 출연 | 국제 아티스트 약 30명 | 공식 페이스북 (2026-10-25/26 게시글) |
| 장비 | 제트스키 14대(공식 게시글 기준), 플라이보드 8대 | 공식 페이스북 (2026-10-25/26 게시글) |
| 해상 불꽃놀이 | 이전 대비 3배 규모로 확대 | 공식 페이스북 (2026-10-25/26 게시글) |
| 신규 연출 | 바다 위 피아노 등장, 해안 약 400m 구간 레이저 (게시글 기재) | 공식 페이스북 (2026-10-25/26 게시글) |
| 불꽃 연출팀 | 중국 우승팀, 다낭 국제불꽃축제 포르투갈 준우승팀 | 공식 페이스북 (2026-10-25 게시글) |

공식 페이스북: https://www.facebook.com/SunParadiseLandPhuQuoc

**공식 게시글에서 소개된 출연진**
- 리 삭 윤 (Lee Sak Yoon): 하이드로플라이트 챔피언
- 알렉산드르 말리흐 (Aleksandr Malykh): 플라이보드
- 크리스티나 이사예바 (Kristina Isaeva): 하이드로페스트(Hydrofest) 준우승

**베트남 언론에서 소개된 선수** (Thanh Niên 2026-10-19 / Báo Tin Tức 2026-10-12 보도)
- 예카테리나 폴리아키나 (Ekaterina Poliakina): 플라이보드 (러시아)
- 안드레이 스미르노프 (Andrei Smirnov): 플라이보드 (러시아)
- 게르만 호먀코프 (German Khomiakov): 제트스키 (러시아)
- 와릿 루앙롭 (Warit Ruangrob): 제트스키 (태국)

## [3] 이용 팁

① **소식은 공식 채널에서**: 시즌 3의 새로운 소식은 선월드 파라다이스랜드 푸꾸옥 공식 페이스북 게시글에서 확인할 수 있습니다.

② **선셋타운 해안 둘러보기 (제안)**: 선셋타운에는 바다 쪽으로 뻗은 [키스 브릿지(Kiss Bridge / Cầu Hôn)](https://myphuquoc.net/ko/business/kiss-bridge)가 있습니다 (마이푸꾸옥 시설 페이지 기재 기준). 일정에 함께 넣어 보세요.

## [4] 제안 동선 (제안)

*(※ 본 동선은 마이푸꾸옥 편집팀이 제안하는 추천 코스이며, 현장 사정에 따라 달라질 수 있습니다.)*

1. **낮**: [선월드 혼똔섬 케이블카](https://myphuquoc.net/ko/business/sunworld-hon-thom-hon-thom-cable-car-phu-quoc) 등 낮 일정 즐기기
2. **저녁**: 선셋타운의 지중해풍 거리와 [키스 브릿지](https://myphuquoc.net/ko/business/kiss-bridge) 일대를 산책하며 일몰 풍경 즐기기
3. **밤**: [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town)에서 길거리 음식을 즐긴 뒤 바다 위 공연 관람
4. **이동**: 타운 내 이동은 [선셋타운 전동 버기카](https://myphuquoc.net/ko/business/sun-group-sunset-town-electric-buggy-service) 이용 (정류장은 마이푸꾸옥 시설 페이지 참고)

## [5] 자주 묻는 질문 (FAQ)

**Q. 시즌 3는 언제 시작하나요?**
2026년 11월 10일 개막입니다 (선월드 파라다이스랜드 푸꾸옥 공식 페이스북, 2026-10-26 게시글).

**Q. 밤 21시 키스 오브 더 씨와는 어떻게 다른가요?**
- 심포니 오브 더 씨: 바다 위에서 제트스키와 플라이보드 아티스트들이 펼치는 해상 액션 쇼입니다.
- 키스 오브 더 씨: 21:00~21:30에 공연이 진행되며 21:25경 해상 불꽃놀이 피날레가 펼쳐집니다 (사이트 기재 기준, 마이푸꾸옥 [sunset-place-10](https://myphuquoc.net/ko/business/sunset-place-10) 페이지).'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  updated_at = NOW();

-- 2편: 키스 오브 더 씨 불꽃쇼 관람 팁 (시간·관람 장소 안내 갱신본)
INSERT INTO public.stories (
  slug, title, title_ko, category, content_type, status, is_featured, published_at, cover_image_url, hero_caption, hero_caption_ko, excerpt, excerpt_ko, seo_title, seo_title_ko, seo_description, seo_description_ko, body_en, body_ko
) VALUES (
  'kiss-of-the-sea-fireworks-viewing-tips', 'Phu Quoc Kiss of the Sea Fireworks Viewing Tips — Schedule & Venue Guide', '푸꾸옥 키스 오브 더 씨(Kiss of the Sea) 불꽃쇼 관람 팁 — 시간·관람 장소 안내', 'Travel Guide', 'guide', 'published', TRUE, '2026-10-27T08:00:00+07:00', '/stock/kiss-of-the-sea-night-fireworks-cover.webp', 'AI-generated illustration: Phu Quoc Sunset Town Kiss of the Sea evening multi-sensory theater show and fireworks over the ocean', 'AI-generated illustration: 푸꾸옥 선셋타운 키스 오브 더 씨 멀티미디어 쇼와 밤바다 불꽃놀이 일러스트', 'Viewing tips for Sunset Town''s iconic ''Kiss of the Sea'' in South Phu Quoc: nightly 21:00 show, 21:25 ocean fireworks finale, accessibility amenities, and suggested evening itinerary.', '베트남 푸꾸옥 선셋타운 대표 야간 쇼 ''키스 오브 더 씨''의 21:00 공연 및 21:25 해상 불꽃놀이 피날레 관람 팁, 편의시설, 추천 저녁 동선 안내.', 'Phu Quoc Kiss of the Sea Fireworks Viewing Tips — Schedule & Venue Guide', '푸꾸옥 키스 오브 더 씨(Kiss of the Sea) 불꽃쇼 관람 팁 — 시간·관람 장소 안내', 'Viewing tips for Sunset Town''s iconic ''Kiss of the Sea'' in South Phu Quoc: nightly 21:00 show, 21:25 ocean fireworks finale, accessibility amenities, and suggested evening itinerary.', '베트남 푸꾸옥 선셋타운 대표 야간 쇼 ''키스 오브 더 씨''의 21:00 공연 및 21:25 해상 불꽃놀이 피날레 관람 팁, 편의시설, 추천 저녁 동선 안내.', '## [1] Executive Summary

In Sunset Town, South Phu Quoc, Vietnam, visitors can experience the **''Kiss of the Sea'' (Nụ hôn của biển cả)** performance. According to the My Phu Quoc facility guide, the show runs from 21:00 to 21:30, concluding with a maritime fireworks finale around 21:25 (per site listing).

## [2] Show Overview Table

| Item | Details | Source |
|---|---|---|
| Show Title | Kiss of the Sea (Nụ hôn của biển cả) | My Phu Quoc Facility Guide |
| Venue | Sunset Town Theater | My Phu Quoc Facility Guide |
| Showtime | 21:00 ~ 21:30 | My Phu Quoc Facility Page Listing (sunset-place-10) |
| Fireworks Finale | Around 21:25 maritime fireworks | My Phu Quoc Facility Page Listing (sunset-place-10) |
| Amenities | Wheelchair-accessible entrance, parking, restrooms | My Phu Quoc Facility Page Listing |

## [3] Visitor Tips

① **Allow Ample Time**: The show begins at 21:00 followed by the fireworks finale around 21:25, so arriving early to take your seat is recommended (proposal).

② **Check Amenities**: Wheelchair-accessible entrances, parking facilities, and restrooms are available on-site (per My Phu Quoc facility listing).

## [4] Suggested Itinerary (Proposal)

*(※ This itinerary is a recommendation by the My Phu Quoc editorial team; adjustments may be made based on on-site conditions.)*

1. **17:00 ~ 18:30**: Stroll Mediterranean-style streets and catch the sunset near [Kiss Bridge](https://myphuquoc.net/business/kiss-bridge).
2. **18:30 ~ 20:30**: Enjoy dinner at the nearby seaside [VUI-Fest Bazaar](https://myphuquoc.net/business/cho-dem-vui-fest-bazaar-sunset-town) or an ocean-view restaurant.
3. **20:30 ~ 21:40**: Proceed to the theater for the 21:00 performance and the ~21:25 fireworks finale.

## [5] Frequently Asked Questions (FAQ)

**Q. What time does Kiss of the Sea start?**
According to the My Phu Quoc facility listing, the show is presented from 21:00 to 21:30, with the maritime fireworks finale around 21:25.

**Q. Is wheelchair access available?**
Yes, the facility listing indicates wheelchair-accessible entrances, parking, and restrooms.', '## [1] 핵심 요약

베트남 푸꾸옥 남부 선셋타운(Sunset Town)에서는 ''키스 오브 더 씨(Kiss of the Sea / Nụ hôn của biển cả)'' 공연이 열립니다. 마이푸꾸옥 사이트 시설 안내에 따르면 공연은 21:00~21:30에 상연되며, 21:25경 해상 불꽃놀이 피날레가 펼쳐집니다 (사이트 기재 기준).

## [2] 공연 개요

| 항목 | 내용 | 출처 |
|---|---|---|
| 공연 명칭 | 키스 오브 더 씨 (Kiss of the Sea / Nụ hôn của biển cả) | 마이푸꾸옥 시설 안내 |
| 공연 장소 | 선셋타운 공연장 | 마이푸꾸옥 시설 안내 |
| 공연 시간 | 21:00 ~ 21:30 | 마이푸꾸옥 시설 페이지 기재 기준 (sunset-place-10) |
| 불꽃놀이 피날레 | 21:25경 해상 불꽃놀이 | 마이푸꾸옥 시설 페이지 기재 기준 (sunset-place-10) |
| 편의 시설 | 휠체어 이용 가능 출입구, 주차장, 화장실 | 마이푸꾸옥 시설 페이지 기재 기준 |

## [3] 이용 팁

① **시간 여유 두기**: 공연은 21:00에 시작해 21:25경 불꽃놀이 피날레가 이어지므로, 시작 전에 여유 있게 이동해 자리를 잡는 것을 권장합니다 (제안).

② **편의 시설 확인**: 휠체어 이용 가능 출입구, 주차장, 화장실이 있습니다 (마이푸꾸옥 시설 페이지 기재 기준).

## [4] 제안 동선 (제안)

*(※ 본 동선은 마이푸꾸옥 편집팀이 제안하는 추천 코스이며, 현장 사정에 따라 달라질 수 있습니다.)*

1. **오후 17:00 ~ 18:30**: 지중해풍 거리를 거닐며 [키스 브릿지](https://myphuquoc.net/ko/business/kiss-bridge) 주변에서 일몰 감상
2. **저녁 18:30 ~ 20:30**: 인근 해변 [부이페스트 야시장](https://myphuquoc.net/ko/business/cho-dem-vui-fest-bazaar-sunset-town) 또는 오션뷰 레스토랑에서 저녁 식사
3. **밤 20:30 ~ 21:40**: 공연장으로 이동해 21:00 공연과 21:25경 피날레 불꽃놀이 관람

## [5] 자주 묻는 질문 (FAQ)

**Q. 키스 오브 더 씨는 몇 시에 하나요?**
마이푸꾸옥 시설 페이지 기재 기준 21:00~21:30에 상연되며, 21:25경 해상 불꽃놀이 피날레가 진행됩니다.

**Q. 휠체어 이용이 가능한가요?**
시설 페이지에 휠체어 이용 가능 출입구, 주차장, 화장실이 기재되어 있습니다.'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  title_ko = EXCLUDED.title_ko,
  category = EXCLUDED.category,
  content_type = EXCLUDED.content_type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  hero_caption = EXCLUDED.hero_caption,
  hero_caption_ko = EXCLUDED.hero_caption_ko,
  excerpt = EXCLUDED.excerpt,
  excerpt_ko = EXCLUDED.excerpt_ko,
  seo_title = EXCLUDED.seo_title,
  seo_title_ko = EXCLUDED.seo_title_ko,
  seo_description = EXCLUDED.seo_description,
  seo_description_ko = EXCLUDED.seo_description_ko,
  body_en = EXCLUDED.body_en,
  body_ko = EXCLUDED.body_ko,
  updated_at = NOW();

COMMIT;
