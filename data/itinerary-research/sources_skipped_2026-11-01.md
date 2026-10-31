# Sources tried but not usable

## Could not be fetched
- https://old.reddit.com/r/VietNam/search?q=phu+quoc+trip+report&restrict_sr=on&sort=relevance : fetch tool blocked the site (SITE_BLOCKED); no Reddit threads obtained.
- WebSearch with allowed_domains=reddit.com : rejected by search proxy (HTTP 400, twice), so Reddit threads could not be found via search.
- https://www.travelfish.org/board/post/vietnam/11881_phu-quoc-island-solo-trip : client_error, page not retrieved.
- TripAdvisor forum trip reports : none surfaced in search results; TripAdvisor not fetched.

## Fetched but excluded (not first-hand, too old, or no usable trip)
- https://www.fodors.com/community/asia/trip-report-from-phu-quoc-in-vietnam-1037947 and http://gardkarlsen.com/Phu_Quoc_Vietnam_trip_report.htm : real trip report but November 2014 (too old).
- https://blog.carmenandingo.com/?p=4476 : October 2010 trip (too old).
- https://blogs.ubc.ca/seasia/?p=27 : about 2014, too old.
- https://nitravelnews.com/blog/emirates-an-agent-abroad-masting-the-art-of-chopsticks-in-phu-quoc/ : 2019 agent trip.
- https://velvetescape.com/things-to-do-phu-quoc/ : January trip, published 2019.
- https://www.expat.com/en/forum/asia/vietnam/760053-what-is-fascinating-about-phu-quoc-island.html : opinions about 8 years old, no itineraries.
- https://www.hostelworld.com/blog/?p=315134 , https://theaseanpost.com/node/4423 , https://bring-you.info/en/phu-quoc-island-travel-guide , https://holidayswithkids.com.au/phu-quoc-things-to-do/ : generic guides, not own trips.
- https://e.nhipcaudautu.vn/life-art/from-khem-beach-to-kiss-bridge-unveiling-phu-quocs-family-adventures-with-accor-3358865/ : sponsored brand article.
- https://www.trvlogue.com/en/phu-quoc-3-day-itinerary : first-person claims but inconsistent (byline/persona mismatch, 3 vs 4 nights, affiliate); judged unreliable.
- https://explorertom.com/en/3-days-in-phu-quoc/ : recommended plan, not the author's actual day-by-day trip (author's trips used in en-008 instead).
- https://destinationlesstravel.com/where-to-stay-on-phu-quoc-vietnam/ and https://www.thebrokebackpacker.com/where-to-stay-in-phu-quoc-vietnam : first-hand flavour but no timeline of an actual trip.
- visitphuquoc.com.vn, sunparadiseland.com, pickyourtrail.com, vinpearl.com, sungroup.com.vn itineraries : operator or marketing content, not traveller reports.
- Trip.com Moments page ph.trip.com/moments/poi-turtle-head-vpl-142892833 etc.: Chinese-language posts and tag/POI pages with empty post areas were not used.

## Notes
- Trip.com Moments user posts (en-009 to en-016) are short; several share one page URL, so the poster name is in source_title.
- Region for Movenpick Waverly / New World (en-002) is inferred (north), not stated in the source.
# Sources tried but not used (Korean)

- https://damoang.net/qa/46052 - fetch failed (client error)
- https://m.ppomppu.co.kr/new/bbs_view.php?id=tour&no=107248 - fetch failed (client error)
- https://www.82cook.com/entiz/read.php?bn=15&num=3993383 - robots disallowed
- https://www.wishbeen.co.kr/note/594719 and /594721 - robots disallowed
- https://triple.guide/trips/lounge/itineraries/f5fd11b4-b3a9-40ed-acd3-8e50ded2af9c (6박7일 푸꾸옥 여행기) - robots disallowed
- https://mjw96.com/entry/...혼자-푸꾸옥... (solo trip) - robots disallowed
- https://keyzard.cc/views/nb/... (3 Naver-mirror posts) - fetch failed (client error)
- https://hyedd.co.kr/entry/...선셋타운-루남... (Sunset Town + Kiss of the Sea trip) - URL too long for fetch proxy
- https://www.phuquoclove.com/post/...3박-5일... - URL too long for fetch proxy
- https://eacheye.co.kr/travel/?bmode=view&idx=168543429 (Sunset Town night market visit) - redirect loop (http/https)
- https://view.nate.com/travel/view/407154/ - server error
- https://www.threads.com/@o_sovely/post/DJo7M42RDn0 - robots disallowed
- https://www.youtube.com/watch?v=GHCm4DzPkOs and ?v=cEs4flrc5FA - client error / rate limited
- Naver blogs (blog.naver.com): WebSearch with naver domain was rejected by proxy; no Naver post URLs were found to test m.blog.naver.com form (vnguide reposts only link to Naver reviews by 배가네 / 나봉순 / 비야 / 한울 without giving URLs)
- https://vnguide.co.kr/bbs/board.php?bo_table=phuquoc&wr_id=1833,1835,1836,1839,1841,1846 - not fetched (listing suggests promotional/itinerary guides; time limit)

## Read but excluded
- https://www.oases.co.kr/reviews/... (4 agency custom-trip reviews, 2025-11 to 2026-02) - no itinerary or hotel content
- https://kr.trip.com/moments/detail/phu-quoc-island-24779-121470931 and -120557481 - hotel-only snippets, no itinerary
- https://vietnamguide.co.kr/푸꾸옥-선셋타운-후기/ - destination guide, not a trip record
- https://vnguide.co.kr/bbs/board.php?bo_table=phuquoc&wr_id=1843 - family of 4, Lahana Resort, only a missed-flight story, no itinerary
- https://vnguide.co.kr/bbs/board.php?bo_table=phuquoc&wr_id=1837 - fetch returned the same content as 1838; not counted separately
- https://brunch.co.kr/@withalice/151 (2019), /@hotelscomkr/479 (2018), /@rache5kimdukyou/41 (2020), /@skyscanner/677 (2019 promo) - too old or promotional
- tripstore.kr, vinpearl.com, vinwonders.com, kkday, waug, myrealtrip pages - agency/OTA guides, not traveller reviews
# Skipped / unreadable sources

## Blocked or failed fetches
- https://voz.vn/t/review-phu-quoc-3n2d.549712/page-2 (and base thread) - fetch client_error (2 attempts)
- https://www.tourister.ru/world/asia/vietnam/city/fukuok/responses - fetch client_error
- https://irecommend.ru/content/raiskii-ostrov-fukuok-... , .../otdykh-na-fukuoka-skazochnyi-ostrov-..., .../prodolzhayu-rasskazyvat-... - robots_disallowed
- https://tonkosti.ru/otzyv/Tolko-dlya-semejnyh_—_o-Fukuoke-272556631 (2025-12), .../Eto-byl-nezabyvaem-otdyh_—_o-Fukuoke-271403401 (2025-04), .../fukuok-otstrov-naslazhdenij_—_o-Fukuoke-272796901 (2026-02) - permission request unanswered (blocked)
- https://tonkosti.ru Zhurnal "Fukuok bez prikras" - URL too long for fetch proxy
- https://tinhte.vn/thread/review-di-phu-quoc-vua-bui-vua-trai-nghiem-huong-thu.3488533/ , .../tour-phu-quoc-3n2d-trai-nghiem-dao-ngoc-... , .../review-tour-phu-quoc-4-ngay-3-dem-tron-goi-cung-rooty-trip... - client_error
- https://phuquoctv.vn/dia-diem/2387-review-phu-quoc-3-ngay-2-dem.html - page text empty (only title/nav)
- https://www.ivivu.com/blog/2021/04/lich-trinh-du-lich-phu-quoc-4-ngay-3-dem-tu-tuc/ - client_error
- https://otzovik.com/reviews/gorod_sunset_town_phu_quoc_vetnam_fukuok/ - server error
- https://voz.vn/t/review-sai-gon-phu-quoc-4n3d.511141/ - not attempted after voz failures

## Read but not a first-hand trip (excluded)
- vnexpress ba-ngay-hai-dem-o-phu-quoc-4060621 (2020 guide), ba-ngay-kham-pha-nam-dao-... (2026 guide), travel.com.vn Sunset Town, phuquocgo.vn Sunset Town, happyvivu, rootytrip, klook blog, dulichvuivn, buiphuquoc lich-trinh (marketing guides)
- otofun thread 1818571 (2022 planning thread, no completed trip)
- vnexpress Dich Long son family trip (no itinerary or places)
- svoe-zagorodom.ru, phuquoc24.ru (general guides)

## Caveats on included records
- vi-002 is written by a tour operator guide about a friends' trip (promotional).
- vi-001 page shows 2026-10-31 as date but cites 2023 prices; published left null.
- vi-004 has no itinerary (opinion piece); days empty.
- ru-004, ru-005 are from 2018 (old); Russian sources from 2024+ were scarce.
- Records with unordered activities use "day": null.
- Hotel regions for Novotel, Mercury Resort, SOL by Melia and ja-002 hotel are assumptions (marked central) - unverified.
# south_skipped (2026-11-01)
Honest note: only 4 usable records. Search engines return mostly Sun Paradise Land / visitphuquoc.com.vn marketing; first-hand south-stay posts are rare outside Naver (blocked).

## Fetched but not first-hand / no south overnight stay
- vietnamguide.co.kr/푸꾸옥-선셋타운-후기 : opinion piece, no own itinerary/hotel
- etnews.com/20251010000008 : journalist trip, stayed Novotel (not south)
- mom-mom.net place page : info page, no itinerary
- explorertom.com/en/3-days-in-phu-quoc : recommended plan, stayed Long Beach/Duong Dong
- localvietnam.com sunset-town & symphony pages : generic guides
- nashaplaneta.net, vietnamspot.ru : guides, no hotel
- trvlogue ko 3-day-itinerary : central (Sonasea) stay
- trvlogue ja 3n5d-package-guide : package, Sol Beach House region unknown, affiliate
- trvlogue ja sunset-town-night-market : one evening, hotel unknown
- meetup.travel, rootytrip.com, ago.info4youhub.com, travelmozi.com : marketing/affiliate guides
- kr/us.trip.com moments (Sunset Town, Kiss Bridge, cable car, others) : short, no hotel/itinerary or AI-translated partner posts
- vnguide.co.kr wr_id 1832-1846 (new ones): only intro excerpts linking to blocked Naver blogs

## Unreadable / failed
- hyedd.co.kr entry (URL too long for fetch proxy), hub.zum.com kkday (same), keyzard.cc (client error), alvinology.com (client error)
- 4travel.jp listing page: fetch needed approval (not granted), not retried
