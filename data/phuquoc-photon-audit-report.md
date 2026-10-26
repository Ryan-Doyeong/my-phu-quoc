# 🏝️ 푸꾸옥 전역 시설 후보군(262개소) 정밀 전수 검수 리포트

> **검수 일시**: 2026-10-26 11:19:09  
> **대상 파일**: `data/phuquoc-photon-candidates.json` (총 262개소)  
> **검수 기준**: 푸꾸옥 지리 좌표 유효성(Bounding Box), 카테고리 정합성, 선셋타운 기존 마스터 DB(291개소) 중복도, 비사업체(Non-POI) 노이즈 여부  

---

## 1. 종합 검수 결과 요약

| 검수 항목 | 검수 수치 | 점검 결과 및 조치 사항 |
| :--- | :---: | :--- |
| **총 수집 후보 시설** | **262개** | Photon (OpenStreetMap) 기반 푸꾸옥 전역 수집 원본 |
| **좌표 유효성 (Bounding Box)** | **262개 적합 (100%)** | 위도 9.8°~10.5°N, 경도 103.7°~104.2°E 내 정상 위치 (이탈 0건) |
| **선셋타운 기존 마스터 DB 중복** | **5개 검출** | 선셋타운 291개 마스터 DB에 이미 수록된 업체 (제외 처리 플래그 부여) |
| **비사업체/노이즈 (Non-POI)** | **10개 식별** | 버스정류장 5건, 안내판 1건, 바우처광고 1건, 구역명/게이트 조형물 3건 제외 |
| **카테고리 오분류 정정** | **4개 수정** | 롱비치센터, 솔비치호텔, 롱비치마트 등 실제 업종에 맞게 정정 완료 |
| **최종 승인 가능 후보 시설 (Clean POI)** | **247개소** | **즉시 디렉토리 리뷰/배포 파이프라인에 투입 가능한 유효 시설** |

---

## 2. 지역별 유효 시설 분포 (Clean 247개소 기준)

| 지역 (Region) | 유효 시설 수 | 점유율 | 주요 시설 및 핫스팟 구성 |
| :--- | :---: | :---: | :--- |
| **Central (Duong Dong / Ong Lang)** | **143개** | 57.9% | 즈엉동 야시장 인근, 쩐흥다오 해변가 레스토랑, 바, 로컬 부티크 호텔 및 스파 밀집 |
| **North (Grand World / Cua Can / Ganh Dau)** | **59개** | 23.9% | 그랜드월드(Grand World), 끄어깐/간더우 해변 리조트, 빈원더스 배후 상권 |
| **South (Sunset Town / An Thoi)** | **24개** | 9.7% | 안터이 로컬 타운, 사오비치(Sao Beach), 켐비치(Khem Beach) JW 메리어트/뉴월드 및 혼똠섬 |
| **South-Central (Bai Truong / Sonasea)** | **21개** | 8.5% | 바이쯔엉(Bai Truong), 소나시(Sonasea) 워킹스트리트, 노보텔/인터컨티넨탈 리조트 상권 |

---

## 3. 카테고리별 유효 시설 분포 (Clean 247개소 기준)

| 카테고리 (Category) | 시설 수 | 주요 포함 시설 유형 |
| :--- | :---: | :--- |
| **`hotels`** | **78개** | JW 메리어트, 인터컨티넨탈, 노보텔, 코로나 리조트 등 4~5성급 리조트 및 로컬 호텔 |
| **`bars`** | **56개** | 골든 샌드 바, 비치 바, 루프탑 바, 즈엉동/그랜드월드 카페 & 티 바 |
| **`dining`** | **41개** | 해산물 레스토랑(Làng Cá 등), 로컬 식당, 비비큐 및 서양식 다이닝 |
| **`wellness`** | **31개** | 파미아나 리조트 스파, 마이 스파, 로컬 맹인 마사지 및 전문 테라피 샵 |
| **`beach`** | **28개** | 사오비치(Bãi Sao), 켐비치(Khem Beach), 옹랑비치, 바이쯔엉 비치 명소 |
| **`activities`** | **8개** | 빈원더스 인근 및 해양 액티비티, 나이트클럽 엔터테인먼트 시설 |
| **`shopping`** | **3개** | 롱비치센터(Long Beach Center), 롱비치마트, 식음료/기념품 슈퍼마켓 |
| **`essentials`** | **2개** | 약국 (Quầy Thuốc Hảo Chi), 현금인출기 (Techcombank ATM) |

---

## 4. 선셋타운 기존 마스터 DB(291개소) 중복 검출 및 분리 내역

다음 5개 시설은 기존에 정밀 구축 완료된 **선셋타운 291개 마스터 DB 및 메뉴 번역 DB에 이미 등록된 업체**이므로, 전역 후보군에서 중복 등록되지 않도록 제외(Flag) 조치했습니다.

| 후보 시설명 (Candidate Name) | OSM ID | 기존 등록 마스터 ID | 마스터 등록명 & Slug | 조치 결과 |
| :--- | :---: | :---: | :--- | :--- |
| **PH Rooftop Bar & Lounge** | `13676323505` | `local-sunset-181` | PH Rooftop Bar & Lounge - Sea View Restaurant, An Thoi, Phu Quoc (`ph-rooftop-bar-lounge-sea-view-restaurant-an-thoi-phu-quoc`) | **마스터 유지 / 후보 제외** |
| **Times Corner Amalfi Hotel** | `1287649767` | `local-sunset-10` | 타임즈 코너 아말피 호텔 (Times Corner Amalfi Hotel) (`times-corner-amalfi-hotel`) | **마스터 유지 / 후보 제외** |
| **King Spa & Massage** | `1287649535` | `local-sunset-231` | KING Spa & Massage Sunset Town Phú Quốc | Spa Phú Quốc | 푸꾸옥 마사지샵 (`king-spa-massage-sunset-town-phu-quoc-spa-phu-quoc`) | **마스터 유지 / 후보 제외** |
| **La Festa Phu Quoc, Curio Collection by Hilton** | `11499885685` | `local-sunset-229` | 라 페스타 푸꾸옥, 큐리오 컬렉션 바이 힐튼 (La Festa Phu Quoc, Curio Collection by Hilton) (`sunset-place-7`) | **마스터 유지 / 후보 제외** |
| **Luna Folk** | `14189321521` | `local-sunset-169` | 루나 포크 (Luna Folk - La Festa Hilton 재즈 & 칵테일 바) (`luna-folk`) | **마스터 유지 / 후보 제외** |

---

## 5. 비사업체 노이즈 (Non-POI) 식별 및 필터링 내역

OpenStreetMap 태그 상 시설(POI)이 아닌 버스정류장, 구역명, 안내판, 티켓 광고 브로커 등 총 10건의 노이즈 데이터를 식별하여 필터링했습니다.

| 시설명 / 태그 (Name / Tag) | OSM ID | OSM Value | 식별 사유 및 정제 조치 |
| :--- | :---: | :---: | :--- |
| **Ngã ba Fusion Resort Phú Quốc** | `11795370171` | `bus_stop` | 버스 정류장 및 삼거리 교차로 (Bus Stop / Intersection) → **제외(Exclude)** |
| **Voucher Khách Sạn, Resort, Tour Du Lịch Cao Cấp Tại Phú Quốc** | `1282334548` | `yes` | 호텔/투어 바우처 광고성 티켓 브로커 (Advertising Broker) → **제외(Exclude)** |
| **Hòa Bình Resort** | `11591767870` | `bus_stop` | 호아빈 리조트 앞 버스 정류장 (OSM bus_stop tag) → **제외(Exclude)** |
| **Gold Beach Hotel** | `11591711269` | `bus_stop` | 골드 비치 호텔 앞 버스 정류장 (OSM bus_stop tag) → **제외(Exclude)** |
| **Mường Thanh Hotel** | `12104426725` | `bus_stop` | 무엉탄 호텔 앞 버스 정류장 (OSM bus_stop tag) → **제외(Exclude)** |
| **KHUNG GIỜ VẬN HÀNH TRÒ CHƠI 438Attraction Opening Times** | `13651727612` | `map` | 운영시간 안내판 (Signboard/Billboard) → **제외(Exclude)** |
| **Khách Sạn Sol Beach** | `12104426723` | `bus_stop` | 솔 비치 호텔 앞 버스 정류장 (OSM bus_stop tag) → **제외(Exclude)** |
| **GRAND WORLD INDOCHINE CHO DEM PHU QUOC GRAND WORLD** | `13706395650` | `city_gate` | 그랜드월드 야시장 게이트 조형물 (Gate Architecture) → **제외(Exclude)** |
| **GRAND WORLD MALLORCA PHU QUOC** | `13706395649` | `city_gate` | 그랜드월드 마요르카 게이트 조형물 (Gate Architecture) → **제외(Exclude)** |
| **Sun Premier Village Primavera** | `718108394` | `commercial` | 도시개발 지구 전체 구역명 (District/Zone Name) → **제외(Exclude)** |

---

## 6. 카테고리 오분류 정정 내역

OSM 수집 당시 잘못 매핑된 카테고리를 실제 사업체 운영 유형에 맞게 보정했습니다.

| 시설명 | 기존 카테고리 | 정정 카테고리 | 보정 사유 |
| :--- | :---: | :---: | :--- |
| **Long Beach Center** | `beach` | **`shopping`** | 즈엉동 쩐흥다오 중심가에 위치한 대형 쇼핑몰 및 복합문화공간 |
| **Long Beach Mart** | `beach` | **`shopping`** | 해변이 아닌 마트/편의점 시설 |
| **Sol Beach House Phu Quoc** | `beach` | **`hotels`** | 멜리아 계열의 5성급 리조트 숙박시설 |
| **ATM Techcombank Casino Vinpearl** | `activities` | **`essentials`** | 액티비티가 아닌 카지노 내 금융 편의시설(ATM) |

---

## 7. 정제 산출물 및 향후 배포 권고안

1. **클린 데이터 파일 생성**: `data/phuquoc-candidates-clean.json`
   - 총 262건 중 **유효 POI 247건**, **선셋타운 중복 5건(플래그)**, **비사업체 노이즈 10건(플래그)** 분리 완료.
   - 표준 Slug, 영문/베트남어 표기, 위경도 좌표, 정제 카테고리 부여 완료.
2. **Supabase 마이그레이션 전략 (안전 무충돌)**:
   - 선셋타운 기존 291개 업체는 `status: 'published'` 상태 유지.
   - 본 전역 247개소는 `supabase/migrations/025_seed_island_candidates_staged.sql`을 통해 `status: 'review'` 상태로 안전하게 인제스트.
   - `ON CONFLICT (slug) DO NOTHING;` 멱등성 보장으로 충돌 0건 보장.