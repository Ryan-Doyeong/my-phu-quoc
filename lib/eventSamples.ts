import type { Locale } from '@/lib/i18n/config'

export type EventSampleStory = {
  id: string
  slug: string
  content_type: 'event'
  status: 'published'
  is_sample: boolean
  category: string
  category_vi: string
  category_ko: string
  title: string
  title_vi: string
  title_ko: string
  subtitle: string
  subtitle_vi: string
  subtitle_ko: string
  excerpt: string
  excerpt_vi: string
  excerpt_ko: string
  body_en: string
  body_vi: string
  body_ko: string
  seo_title: string
  seo_title_vi: string
  seo_title_ko: string
  seo_description: string
  seo_description_vi: string
  seo_description_ko: string
  key_points: string[]
  key_points_vi: string[]
  key_points_ko: string[]
  callout: string
  callout_vi: string
  callout_ko: string
  cover_image_url: string
  hero_caption: string
  hero_caption_vi: string
  hero_caption_ko: string
  published_at: string
  updated_at: string
  event_date: string
  effective_date: string | null // Used as event end date (종료일)
  event_location: string
  author_name: string
  source_name?: string
  source_name_vi?: string
  source_name_ko?: string
  source_url?: string
  tags: string[]
}

/**
 * 실제 운영 게시 이벤트 (일반 게시물 — is_sample: false, 검색엔진 정상 노출 index/follow)
 * - 날짜(effective_date) 경과 시 자동으로 Ended / Đã kết thúc / 종료 배지로 전환됨
 */
export const PUBLISHED_EVENTS: EventSampleStory[] = [
  // Ryan 지시 (2026-10-26 2단계): 타오디엔 외지 이벤트 (spooky-halloween) 영구 삭제 완료 (HTTP 410 반환)
]

export const SAMPLE_EVENTS: EventSampleStory[] = [
  // Ryan 지시 (2026-10-26 2단계): sample-thao-dien-weekend-farmers-craft-market 및 sample-riverside-morning-yoga-breathwork-session 영구 삭제 완료 (HTTP 410 반환)
{
    id: 'sample-event-003',
    slug: 'sample-autumn-acoustic-coffee-social-quoc-huong',
    content_type: 'event',
    status: 'published',
    is_sample: true,
    category: 'Community & Culture',
    category_vi: 'Cộng đồng & Văn hóa',
    category_ko: '커뮤니티 · 문화',
    title: '[SAMPLE] Phu Quoc Autumn Acoustic & Neighbor Coffee Social (Past Event)',
    title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Phú Quốc (Đã kết thúc)',
    title_ko: '[샘플] 푸꾸옥 어텀 어쿠스틱 & 이웃 커피 모임 (종료된 행사 예시)',
    subtitle: 'Sample completed event demonstrating the Ended status badge when the event end date has passed.',
    subtitle_vi: 'Bài mẫu sự kiện đã qua nhằm hiển thị trạng thái Đã kết thúc khi qua ngày kết thúc sự kiện.',
    subtitle_ko: '종료일 경과 시 ‘종료(Ended)’ 배지가 표시되는 것을 확인하기 위한 샘플 이벤트 게시물.',
    excerpt: '[SAMPLE — Not a real event] An afternoon acoustic guitar session and specialty pour-over coffee tasting for new and long-time Phu Quoc residents.',
    excerpt_vi: '[BÀI MẪU — Không phải sự kiện thật] Buổi chiều nhạc guitar acoustic và thưởng thức cà phê pha thủ công dành cho cư dân mới và lâu năm tại Phú Quốc.',
    excerpt_ko: '[샘플 — 실제 행사가 아닙니다] 푸꾸옥 신규 전입 주민과 기존 거주민이 함께 어울리는 오후 어쿠스틱 기타 연주 및 핸드드립 커피 시음 모임입니다.',
    body_en: `> **[SAMPLE PREVIEW]** This post is a **sample entry** created to preview the Phu Quoc Events board layout (specifically the **Ended** status badge). It is not a real event and is blocked from search engine indexing (\`noindex\`).

Neighbors gathered on Quoc Huong Street for an informal afternoon of acoustic music, pour-over coffee tasting and practical neighborhood tips for newcomers.

## What happened

- **Specialty coffee tasting**: Local roasters shared single-origin Arabica beans from Lam Dong Province.
- **Acoustic music set**: Two unplugged acoustic sets by resident musicians from 16:00 to 17:30.
- **Newcomer Q&A table**: Practical information on metro commuting, trash collection schedules and pet-friendly parks.

## When & where

- **Date**: October 10, 2026 (15:00 – 18:00) — **Event Ended**
- **Location**: Clock Tower Square, Sunset Town, Phu Quoc

## Good to know

This sample event has an end date in the past (\`2026-10-10\`) so you can verify how completed events display the **Ended / Đã kết thúc / 종료** badge on both the list and detail pages.`,
    body_vi: `> **[BÀI MẪU XEM TRƯỚC]** Đây là **bài viết mẫu** dùng để kiểm tra trạng thái **Đã kết thúc** trên bảng Sự kiện Phú Quốc, không phải sự kiện thực tế và đã được chặn lập chỉ mục tìm kiếm (\`noindex\`).

Buổi chiều giao lưu thân mật trên đường Quốc Hương với âm nhạc acoustic, thưởng thức cà phê pour-over và chia sẻ kinh nghiệm sinh hoạt cho cư dân mới.

## Nội dung chương trình

- **Thưởng thức cà phê đặc sản**: Trải nghiệm hạt Arabica vùng Lâm Đồng pha thủ công.
- **Biểu diễn nhạc Acoustic**: Hai khung giờ nhạc mộc từ 16:00 đến 17:30 của các nghệ sĩ sống tại khu phố.
- **Bàn thông tin cho cư dân mới**: Chia sẻ mẹo đi tàu Metro số 1, lịch thu gom rác và các công viên thân thiện thú cưng.

## Thời gian & địa điểm

- **Thời gian**: 10/10/2026 (15:00 – 18:00) — **Sự kiện đã kết thúc**
- **Địa điểm**: Không gian sân vườn đường Quốc Hương, Phú Quốc, Phú Quốc

## Lưu ý hữu ích

Sự kiện mẫu này có ngày kết thúc trong quá khứ (\`2026-10-10\`) để kiểm tra cách hiển thị nhãn **Ended / Đã kết thúc / 종료** trên trang danh sách và trang chi tiết.`,
    body_ko: `> **[샘플 미리보기 안내]** 이 글은 푸꾸옥 이벤트 게시판의 **‘종료’ 상태 배지** 표시를 확인하기 위해 작성된 **샘플 게시물**입니다. 실제 열린 행사가 아니며 검색엔진 노출이 차단(\`noindex\`)되어 있습니다.

꾸옥흐엉(Quốc Hương) 거리의 가든 라운지에서 푸꾸옥 신규 입주민과 기존 주민들이 함께 핸드드립 커피를 마시며 어쿠스틱 음악을 즐긴 오후 모임입니다.

## 주요 진행 내용

- **스페셜티 커피 테이스팅**: 럼동(Lâm Đồng) 지역 싱글 오리진 아라비카 원두 핸드드립 시음
- **어쿠스틱 기타 라이브**: 오후 4시부터 5시 30분까지 동네 뮤지션들의 언플러그드 공연 진행
- **신규 거주민 생활 정보 나눔**: 메트로 1호선 이용법, 동네 생활 팁, 반려동물 산책 코스 안내

## 일시 및 장소

- **일정**: 2026년 10월 10일 (15:00 – 18:00) — **종료된 이벤트**
- **장소**: 푸꾸옥 꾸옥흐엉 가든 라운지 (Quốc Hương, Phú Quốc, Phú Quốc)

## 참고사항

이 샘플 게시물은 종료일(\`2026-10-10\`)이 과거로 설정되어 있어, 목록과 상세 페이지에서 **Ended / Đã kết thúc / 종료** 배지가 정상적으로 표시되는지 확인하는 용도입니다.`,
    seo_title: '[SAMPLE] Phu Quoc Autumn Acoustic & Coffee Social | My Phu Quoc',
    seo_title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Phú Quốc | My Phu Quoc',
    seo_title_ko: '[샘플] 푸꾸옥 어텀 어쿠스틱 & 이웃 커피 모임 | My Phu Quoc',
    seo_description: '[SAMPLE] Preview completed event entry demonstrating the Ended status badge on the Phu Quoc Events board.',
    seo_description_vi: '[MẪU] Bài xem trước cho sự kiện đã kết thúc trên bảng Sự kiện Phú Quốc.',
    seo_description_ko: '[샘플] 종료일 경과 시 종료 배지 표시를 확인하기 위한 푸꾸옥 이벤트 샘플 글입니다.',
    key_points: [
      '[SAMPLE] Completed event held on October 10, 2026 (demonstrates Ended status badge)',
      'Featured Lam Dong pour-over coffee tasting and acoustic guitar sessions',
      'Included newcomer Q&A on Phu Quoc daily living',
    ],
    key_points_vi: [
      '[MẪU] Sự kiện đã diễn ra ngày 10/10/2026 (minh họa nhãn trạng thái Đã kết thúc)',
      'Thưởng thức cà phê pour-over Lâm Đồng và nhạc guitar acoustic',
      'Chia sẻ kinh nghiệm sinh hoạt tại Phú Quốc cho cư dân mới',
    ],
    key_points_ko: [
      '[샘플] 2026년 10월 10일 종료된 행사 예시 (‘종료’ 배지 동작 확인용)',
      '럼동 싱글오리진 핸드드립 커피 시음 및 어쿠스틱 기타 공연',
      '푸꾸옥 신규 거주민을 위한 동네 생활 정보 교류',
    ],
    callout: 'SAMPLE NOTICE: This listing is a sample post for UI verification only and is excluded from public search indexing.',
    callout_vi: 'THÔNG BÁO BÀI MẪU: Đây là bài đăng mẫu chỉ dùng để kiểm tra giao diện và không xuất hiện trên công cụ tìm kiếm.',
    callout_ko: '샘플 공지: 이 게시물은 게시판 디자인 및 기능 점검을 위한 샘플 데이터이며 외부 검색엔진에 노출되지 않습니다.',
    cover_image_url: '/features/dining_featured_640.webp',
    hero_caption: 'Sample illustration image from existing site stock (/features/dining_featured_640.webp).',
    hero_caption_vi: 'Ảnh minh họa mẫu từ kho ảnh sẵn có của trang (/features/dining_featured_640.webp).',
    hero_caption_ko: '사이트 기존 보유 스톡 이미지를 활용한 샘플 대표 사진입니다 (/features/dining_featured_640.webp).',
    published_at: '2026-10-08T10:00:00+07:00',
    updated_at: '2026-10-10T19:00:00+07:00',
    event_date: '2026-10-10T15:00:00+07:00',
    effective_date: '2026-10-10T18:00:00+07:00', // Ended Oct 10, 2026 -> Ended (종료)
    event_location: 'Sunset Town, Phu Quoc',
    author_name: 'My Phu Quoc Editorial Desk (Sample)',
    tags: ['sample', 'coffee', 'acoustic', 'community', 'cafe', '커피', '어쿠스틱', '카페', 'cà phê'],
  },
]

export function isSampleEventsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_SAMPLE_EVENTS === 'true'
}

export function isSampleEventSlug(slug: string): boolean {
  return SAMPLE_EVENTS.some((x) => x.slug === slug)
}

export function getSampleEventBySlug(slug: string): EventSampleStory | null {
  const published = PUBLISHED_EVENTS.find((x) => x.slug === slug)
  if (published) return published
  if (!isSampleEventsEnabled()) return null
  return SAMPLE_EVENTS.find((x) => x.slug === slug) || null
}

/**
 * 이벤트 종료일(effective_date 또는 event_end_date) 기준 진행 상태 계산
 * - 종료일이 있으면 현재 시각과 비교하여 'ongoing'(진행중) 또는 'ended'(종료) 반환
 * - 종료일이 없으면 null 반환
 */
export function getEventProgressStatus(
  storyOrStart?:
    | { effective_date?: string | null; event_end_date?: string | null }
    | string
    | null,
  endDateOrNow?: string | Date | null
): 'ongoing' | 'ended' | null {
  let endRaw: string | null | undefined = null
  let now = new Date()

  if (typeof storyOrStart === 'object' && storyOrStart !== null) {
    endRaw = storyOrStart.event_end_date || storyOrStart.effective_date
    if (endDateOrNow instanceof Date) {
      now = endDateOrNow
    }
  } else {
    endRaw = typeof endDateOrNow === 'string' ? endDateOrNow : null
  }

  if (!endRaw) return null
  const endDate = new Date(endRaw)
  if (Number.isNaN(endDate.getTime())) return null
  return endDate.getTime() >= now.getTime() ? 'ongoing' : 'ended'
}

export function getEventStatusLabel(
  status: 'ongoing' | 'ended' | null | undefined,
  locale: Locale = 'en'
): string | null {
  if (!status) return null
  if (status === 'ongoing') {
    if (locale === 'vi') return 'Đang diễn ra'
    if (locale === 'ko') return '진행중'
    return 'Ongoing'
  }
  if (locale === 'vi') return 'Đã kết thúc'
  if (locale === 'ko') return '종료'
  return 'Ended'
}

export function getSampleBadgeLabel(locale: Locale = 'en'): string {
  if (locale === 'vi') return 'BÀI MẪU'
  if (locale === 'ko') return '샘플'
  return 'SAMPLE'
}
