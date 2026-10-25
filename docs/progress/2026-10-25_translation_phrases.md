# My Phu Quoc — 신규 추가 문구 다국어 번역 요청서 (ChatGPT 검수용)

- **작성일:** 2026-10-25
- **대상 언어:** 7개 언어 (`en`, `vi`, `hi`, `zh`, `ru`, `ko`, `ja`)
- **목적:** 선셋타운 특화 개편(히어로 카피, 6대 구역 필터, A~D 등급 메뉴판)에 따라 새롭게 추가된 UI 문구 목록. ChatGPT 검수 후 `lib/i18n/locales/*.ts` 반영 예정.

---

## 1. 홈 히어로 카피 (Sunset Town Hero)

| 번호 | 항목 Key | 한국어 (KO 기준) | 영문 (EN 기준) | 베트남어 (VI 초안) | 번역 필요 언어 (HI / ZH / RU / JA) |
|---|---|---|---|---|---|
| 1 | `home.heroTopline` | 선셋타운 · 키스브릿지 · 불꽃놀이 | SUNSET TOWN · KISS BRIDGE · FIREWORKS | THỊ TRẤN HOÀNG HÔN · CẦU HÔN · PHÁO HOA | 번역 필요 |
| 2 | `home.heroTitle` | 마이\n푸꾸옥 | My\nPhu Quoc | My\nPhu Quoc | 번역 필요 |
| 3 | `home.heroSubtitle` | 매일 밤 펼쳐지는 불꽃축제와 키스브릿지의 낭만, 지중해풍 야경. | The magic of Sunset Town: Kiss Bridge, nightly fireworks & ocean views. | Sắc màu Địa Trung Hải, Cầu Hôn lãng mạn và pháo hoa rực rỡ mỗi đêm. | 번역 필요 |
| 4 | `home.heroDescription` | 지중해풍 프리마베라 거리부터 키스브릿지, 야경 불꽃쇼, 로컬 미식까지 선셋타운의 모든 것. | Your curated guide to Mediterranean alleys, iconic Kiss Bridge, nightly fireworks, and dining in Sunset Town. | Cẩm nang khám phá Thị trấn Hoàng Hôn Sunset Town, Cầu Hôn và Nam đảo Phú Quốc. | 번역 필요 |
| 5 | `home.heroPrimaryCta` | 선셋타운 둘러보기 | Explore Sunset Town | Khám phá ngay | 번역 필요 |
| 6 | `home.heroSecondaryCta` | 오늘의 불꽃놀이 명당 | Tonight's Fireworks | Điểm ngắm pháo hoa tối nay | 번역 필요 |
| 7 | `home.heroNote` | 매일 밤 21:00\n불꽃놀이 쇼 ♥ | Daily Fireworks\nat 21:00 ♥ | Pháo hoa hằng đêm\nlúc 21:00 ♥ | 번역 필요 |
| 8 | `home.heroSearchPlaceholder`| 선셋타운 맛집, 스파, 카페, 불꽃놀이 명당 검색… | Search Sunset Town dining, cafes, fireworks spots… | Tìm quán ăn, cà phê, spa, điểm ngắm pháo hoa Sunset Town… | 번역 필요 |

---

## 2. 선셋타운 6대 구역 (Sunset Town 6 Quarters)

| 번호 | 구역 Key | 구역명 (KO / EN) | 구역 설명 (KO 기준) | 영문 (EN 기준) |
|---|---|---|---|---|
| 1 | `all` | 선셋타운 전체 / All Zones | 선셋타운의 모든 구역과 시설 | All quarters and facilities across Sunset Town |
| 2 | `sorrento` | 소렌토 / Sorrento | 해안 산책로와 썬월드 케이블카 승강장이 인접한 이탈리아풍 거리 | Coastal promenade and entrance near Sun World Cable Car station |
| 3 | `amalfi` | 아말피 / Amalfi | 탁 트인 오션뷰와 테라스 레스토랑이 밀집한 지중해 절벽 마을 스타일 | Breathtaking sea views, cliffside colorful villas, and terrace dining |
| 4 | `venice` | 베니스 / Venice | 베니스 운하 감성과 낭만적인 부티크 호텔, 브런치 카페 거리 | Romantic Venetian architecture, boutique hotels and brunch bistros |
| 5 | `positano` | 포지타노 / Positano | 다채로운 파스텔톤 숍하우스와 쇼핑, 스파, 카페 명소 | Vibrant pastel shophouses, fashion boutiques, spas and cafes |
| 6 | `hillside` | 힐사이드 / Hillside | 선셋타운 언덕 위에서 바다와 타운 전경을 내려다보는 레지던스 단지 | Panoramic high-rise residence towers overlooking Sunset Town and sea |
| 7 | `central` | 중심가 · 키스브릿지 · 부이페스트 / Central | 키스브릿지, 부이페스트 야시장, 키스오브더씨 불꽃놀이의 중심 | Heart of Kiss Bridge, VuiFest Night Market, and Kiss of the Sea Fireworks |

---

## 3. 업체 상세 검증 메뉴판 (Verified Menu & Prices)

| 번호 | 항목 | 한국어 (KO 기준) | 영문 (EN 기준) |
|---|---|---|---|
| 1 | 헤더 타이틀 | 선셋타운 검증 메뉴판 | Verified Menu & Prices |
| 2 | Grade A 라벨 | Grade A · 전체 메뉴 확인 | Grade A · Full Menu Verified |
| 3 | Grade A 설명 | 실제 메뉴판 전수 조사 및 한글 번역, 최신 가격(VND)이 완벽하게 등록된 업체입니다. | Comprehensive menu verified with official prices and multilingual translations. |
| 4 | Grade B 라벨 | Grade B · 주요 메뉴 확인 | Grade B · Core Menu Verified |
| 5 | Grade B 설명 | 인기 대표 메뉴와 시그니처 요금 정보가 확인된 업체입니다. | Core selection of signature dishes and prices verified from menu boards. |
| 6 | Grade C 라벨 | Grade C · 대표 메뉴 & 가격대 파악 | Grade C · Estimated Signatures |
| 7 | Grade C 설명 | 방문자 후기 및 공인 채널을 통해 대표 메뉴와 예상 가격대가 파악된 곳입니다. | Representative dishes and approximate price range based on verified sources. |
| 8 | Grade D 라벨 | Grade D · 현장 확인 필요 (미확인) | Grade D · On-site Verification Needed |
| 9 | Grade D 설명 | 공식 온라인 메뉴판이 등록되지 않은 상태로, 현장 방문 후 주문을 권장합니다. | Official menu board not yet published online. Please verify on site. |
| 10 | 가격 고지 문구 | 가격은 현장과 다를 수 있으며, 프로모션 및 시즌에 따라 변동될 수 있습니다. (2026-10 기준) | Prices may differ on site and fluctuate by season or promotion. (As of 2026-10) |
| 11 | 미확인 안내문 | 현재 온라인에 등록된 공식 메뉴판이 없습니다. 방문 시 현장에서 메뉴판을 확인해 주세요. | Official menu is not yet registered online. Please check on site. |
| 12 | 지도 바로보기 링크 | 지도 바로보기 ↗ | View on Map ↗ |
| 13 | 가격대 필터 라벨 | 전체 가격 / $ / $$ / $$$ / $$$$ | All Prices / $ / $$ / $$$ / $$$$ |
