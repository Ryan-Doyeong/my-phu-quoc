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
  {
    id: 'event-20261025-get-arty-halloween-mask',
    slug: 'spooky-halloween-mask-making-kids-thao-dien',
    content_type: 'event',
    status: 'published',
    is_sample: false,
    category: 'Kids & Craft Workshop',
    category_vi: 'Workshop Thiếu nhi & Thủ công',
    category_ko: '어린이 · 공예 워크숍',
    title: 'Spooky Halloween Mask Making (Kids 6–12) – Thảo Điền',
    title_vi: 'Workshop Làm Mặt nạ Halloween cho Bé (6–12 tuổi) – Thảo Điền',
    title_ko: 'Spooky Halloween Mask Making (Kids 6–12) – 타오디엔 어린이 할로윈 가면 만들기 공방',
    subtitle:
      'Hands-on Halloween mask-making workshop for children aged 6–12 at Get Arty Studio in Thao Dien — all craft materials provided.',
    subtitle_vi:
      'Buổi workshop thủ công tự tay làm mặt nạ Halloween dành cho các bé từ 6–12 tuổi tại Get Arty Studio (Thảo Điền) — cung cấp đầy đủ dụng cụ.',
    subtitle_ko:
      '타오디엔 아트 스튜디오 Get Arty에서 열리는 6–12세 어린이 할로윈 가면 만들기 공방 — 모든 재료 제공 및 당일 완성품 지참 귀가.',
    excerpt:
      'A creative Sunday afternoon workshop at Get Arty Studio (19 Đường số 46, Thảo Điền) where kids aged 6–12 design and craft their own Halloween masks to take home.',
    excerpt_vi:
      'Buổi chiều Chủ Nhật sáng tạo tại Get Arty Studio (19 Đường số 46, Thảo Điền), nơi các bé 6–12 tuổi tự thiết kế và hoàn thiện chiếc mặt nạ Halloween để mang về nhà ngay trong ngày.',
    excerpt_ko:
      '10월 25일(일) 오후 타오디엔 Get Arty Studio(19 Đường số 46)에서 6–12세 어린이가 직접 할로윈 가면을 만들고 당일 완성품을 집으로 가져가는 체험 공방입니다.',
    body_en: `**Get Arty** (an art studio located in Thao Dien, [www.getartystudio.com](https://www.getartystudio.com)) is hosting a hands-on **Spooky Halloween Mask Making** workshop for children aged **6 to 12** on Sunday afternoon, October 25, 2026.

## Workshop Highlights

- **Hands-on mask crafting**: Children design, cut, paint and assemble their own custom Halloween masks in a guided studio session.
- **All materials provided**: Felt, cardstock, paints, brushes, ribbons and decorative craft supplies are fully prepared by the studio.
- **Age-appropriate tools**: Older kids can also use glue guns under instructor supervision for sturdier mask details.
- **Take home on the same day**: Every participant finishes their mask during the session and brings the completed piece home right away.

## Schedule, Venue & Fee

- **Date & Time**: Sunday, October 25, 2026 · **15:30 – 17:00**
- **Organizer**: Get Arty ([www.getartystudio.com](https://www.getartystudio.com))
- **Location**: Get Arty Studio, 19 Đường số 46, Thảo Điền, Thủ Đức, Hồ Chí Minh
- **Fee**: **450,000 VND** per child (**10% sibling discount** for 2 or more brothers/sisters)
- **Booking & Inquiries**: [www.getartystudio.com/events](https://www.getartystudio.com/events)

---

**Source**: Shared via Facebook 'Events in Saigon' group (Get Arty) / 정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)`,
    body_vi: `**Get Arty** (xưởng nghệ thuật tại Thảo Điền, [www.getartystudio.com](https://www.getartystudio.com)) tổ chức buổi workshop thủ công **Spooky Halloween Mask Making** dành cho các bé từ **6 đến 12 tuổi** vào chiều Chủ Nhật, ngày 25/10/2026.

## Nội dung hoạt động

- **Tự tay làm mặt nạ Halloween**: Các bé trực tiếp lên ý tưởng, cắt dán, tô màu và trang trí chiếc mặt nạ Halloween theo phong cách riêng.
- **Cung cấp toàn bộ nguyên vật liệu**: Xưởng chuẩn bị sẵn đầy đủ giấy bìa màu, vải nỉ, màu vẽ, cọ, dây ruy-băng và phụ kiện thủ công.
- **Dụng cụ phù hợp theo độ tuổi**: Các bé lớn hơn có thể sử dụng súng bắn keo (glue gun) dưới sự hướng dẫn an toàn của giáo viên.
- **Mang sản phẩm về ngay trong ngày**: Hoàn thiện tác phẩm tại lớp và các bé sẽ mang chiếc mặt nạ của mình về nhà ngay sau buổi học.

## Thời gian, Địa điểm & Học phí

- **Thời gian**: Chủ Nhật, **25/10/2026 · 15:30 – 17:00**
- **Đơn vị tổ chức**: Get Arty ([www.getartystudio.com](https://www.getartystudio.com))
- **Địa điểm**: Get Arty Studio, 19 Đường số 46, Thảo Điền, Thủ Đức, Hồ Chí Minh
- **Chi phí**: **450.000 VND / 1 bé** (**Giảm 10%** khi đăng ký từ 2 anh/chị/em ruột trở lên)
- **Đặt chỗ & Liên hệ**: [www.getartystudio.com/events](https://www.getartystudio.com/events)

---

**Nguồn thông tin**: Chia sẻ từ nhóm Facebook 'Events in Saigon' (Get Arty) / 정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)`,
    body_ko: `타오디엔 소재 아트 스튜디오 **Get Arty**([www.getartystudio.com](https://www.getartystudio.com))에서 오는 2026년 10월 25일(일) 오후, **6~12세 어린이**를 위한 할로윈 가면 만들기 공방(**Spooky Halloween Mask Making**)을 진행합니다.

## 주요 프로그램 내용

- **나만의 할로윈 가면 직접 제작**: 아이들이 직접 할로윈 가면을 디자인하고 오리고 칠하며 세상에 하나뿐인 가면을 만드는 미술·공예 클래스입니다.
- **모든 재료 제공**: 펠트지, 색지, 물감, 붓, 리본 끈 등 가면 제작에 필요한 모든 크래프트 재료를 스튜디오에서 제공합니다.
- **연령별 맞춤 도구 활용**: 큰 아이들은 강사 지도 아래 글루건(glue gun)을 직접 사용해 보다 입체적인 가면 장식을 완성할 수 있습니다.
- **완성품 당일 지참 귀가**: 수업 시간 내에 완성한 할로윈 가면은 당일 바로 집으로 가져갑니다.

## 일시 · 장소 · 참가비 및 예약 안내

- **일시**: 2026년 10월 25일(일) **15:30 – 17:00**
- **주최**: Get Arty (타오디엔 소재 아트 스튜디오, [www.getartystudio.com](https://www.getartystudio.com))
- **장소**: Get Arty Studio, 19 Đường số 46, Thảo Điền, Thủ Đức, Hồ Chí Minh
- **요금**: 1인 **450,000 VND** (2명 이상 형제/자매 함께 등록 시 **10% 할인**)
- **예약 및 문의**: [www.getartystudio.com/events](https://www.getartystudio.com/events)

---

**정보 출처**: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)`,
    seo_title: 'Spooky Halloween Mask Making (Kids 6–12) – Thảo Điền | Good Life in Thaodien',
    seo_title_vi:
      'Workshop Làm Mặt nạ Halloween cho Bé (6–12 tuổi) – Thảo Điền | Good Life in Thaodien',
    seo_title_ko:
      'Spooky Halloween Mask Making (Kids 6–12) – 타오디엔 어린이 할로윈 가면 만들기 공방 | Good Life in Thaodien',
    seo_description:
      'Kids Halloween mask-making workshop (ages 6–12) at Get Arty Studio in Thao Dien on Oct 25, 2026 (15:30–17:00). 450,000 VND per child, 10% sibling discount, all materials provided.',
    seo_description_vi:
      'Workshop làm mặt nạ Halloween cho bé 6–12 tuổi tại Get Arty Studio (19 Đường số 46, Thảo Điền) ngày 25/10/2026 (15:30–17:00). Học phí 450.000 VND/bé, giảm 10% cho anh chị em.',
    seo_description_ko:
      '2026년 10월 25일(일) 15:30–17:00 타오디엔 Get Arty Studio에서 열리는 6–12세 어린이 할로윈 가면 만들기 공방. 참가비 450,000 VND(형제·자매 10% 할인), 재료 전부 제공.',
    key_points: [
      'Sunday, October 25, 2026 (15:30–17:00) at Get Arty Studio, 19 Đường số 46, Thảo Điền',
      'For kids aged 6–12: all mask-making materials provided, older kids can use glue guns, take finished mask home the same day',
      'Fee: 450,000 VND per child (10% sibling discount for 2+ kids) · Booking: www.getartystudio.com/events',
    ],
    key_points_vi: [
      'Chủ Nhật, 25/10/2026 (15:30–17:00) tại Get Arty Studio, 19 Đường số 46, Thảo Điền',
      'Dành cho bé 6–12 tuổi: cung cấp toàn bộ nguyên liệu, bé lớn được dùng súng bắn keo, mang mặt nạ hoàn thiện về ngay trong ngày',
      'Chi phí: 450.000 VND/bé (giảm 10% cho từ 2 anh/chị/em) · Đặt chỗ: www.getartystudio.com/events',
    ],
    key_points_ko: [
      '일시 및 장소: 2026년 10월 25일(일) 15:30–17:00 · Get Arty Studio (19 Đường số 46, Thảo Điền)',
      '대상 및 내용: 6–12세 어린이 할로윈 가면 만들기 공방 (재료 전부 제공, 큰 아이 글루건 사용 가능, 당일 완성품 지참 귀가)',
      '요금 및 예약: 1인 450,000 VND (2명 이상 형제/자매 10% 할인) · www.getartystudio.com/events',
    ],
    callout:
      "Booking & inquiries: www.getartystudio.com/events · Source: Shared via Facebook 'Events in Saigon' group (Get Arty)",
    callout_vi:
      "Đặt chỗ & liên hệ: www.getartystudio.com/events · Nguồn thông tin: Chia sẻ từ nhóm Facebook 'Events in Saigon' (Get Arty)",
    callout_ko:
      "예약 및 문의: www.getartystudio.com/events · 정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)",
    cover_image_url: '/news-img/spooky-halloween-mask-making-get-arty-thao-dien.webp',
    hero_caption:
      'Halloween mask-making craft table with felt masks, colored cardstock, brushes and glue gun (illustration prepared by Good Life Thaodien).',
    hero_caption_vi:
      'Bàn thủ công làm mặt nạ Halloween với mặt nạ vải nỉ, giấy màu, cọ vẽ và súng bắn keo (ảnh minh họa do Good Life Thaodien thực hiện).',
    hero_caption_ko:
      '할로윈 가면과 펠트지·색지·붓·글루건 등 크래프트 재료가 준비된 공방 테이블 (Good Life Thaodien 자체 제작 썸네일).',
    published_at: '2026-10-20T13:45:00+07:00',
    updated_at: '2026-10-20T13:45:00+07:00',
    event_date: '2026-10-25T15:30:00+07:00',
    effective_date: '2026-10-25T17:00:00+07:00', // Automatically switches to Ended after Oct 25, 2026 17:00 ICT
    event_location: 'Get Arty Studio, 19 Đường số 46, Thảo Điền, Thủ Đức, Hồ Chí Minh',
    author_name: 'Good Life Editorial Desk',
    source_name:
      "Source: Shared via Facebook 'Events in Saigon' group (Get Arty) · 정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)",
    source_name_vi:
      "Nguồn thông tin: Chia sẻ từ nhóm Facebook 'Events in Saigon' (Get Arty) · 정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)",
    source_name_ko: "정보 출처: Facebook 'Events in Saigon' 그룹 공유 (Get Arty)",
    source_url: 'https://www.getartystudio.com/events',
    tags: [
      'halloween',
      'kids',
      'workshop',
      'craft',
      'get-arty',
      'thao-dien',
      '할로윈',
      '어린이',
      '가면',
      '공방',
      '워크숍',
      'mặt nạ',
      'thiếu nhi',
      'thủ công',
    ],
  },
]

/**
 * 샘플 이벤트 글 3건 (실제가 아닌 '샘플' 표시, 외부 검색 노출 금지 noindex 처리)
 * - 사진은 기존 사이트 보유 정적 이미지(/stock/*.webp)만 사용 (새 오브젝트 추가 없음)
 * - 아르곤이 3개 언어(EN / VI / KO)를 한 번에 입력한 구조
 */
export const SAMPLE_EVENTS: EventSampleStory[] = [
  {
    id: 'sample-event-001',
    slug: 'sample-thao-dien-weekend-farmers-craft-market',
    content_type: 'event',
    status: 'published',
    is_sample: true,
    category: 'Market & Pop-up',
    category_vi: 'Chợ phiên & Pop-up',
    category_ko: '플리마켓 · 팝업',
    title: '[SAMPLE] Thao Dien Weekend Farmers & Craft Market at Xuan Thuy Courtyard',
    title_vi: '[MẪU] Chợ phiên Nông sản & Thủ công Cuối tuần Thảo Điền tại sân Xuân Thủy',
    title_ko: '[샘플] 타오디엔 주말 파머스 & 크래프트 마켓 (쑤언투이 코트야드)',
    subtitle: 'Sample preview event: organic produce, sourdough bread, local ceramics and family-friendly workshops.',
    subtitle_vi: 'Bài mẫu xem trước: nông sản hữu cơ, bánh mì sourdough, gốm thủ công và workshop cuối tuần.',
    subtitle_ko: '화면 확인용 샘플 이벤트: 유기농 농산물, 사워도우 베이커리, 로컬 도자기 공예 및 주말 워크숍 안내.',
    excerpt: '[SAMPLE — Not a real event] A neighborhood weekend market bringing together Dalat organic growers, artisan bakers and local makers in central Thao Dien.',
    excerpt_vi: '[BÀI MẪU — Không phải sự kiện thật] Chợ phiên cuối tuần quy tụ nông sản Đà Lạt, bánh nướng thủ công và các nghệ nhân địa phương tại trung tâm Thảo Điền.',
    excerpt_ko: '[샘플 — 실제 행사가 아닙니다] 달랏 유기농 농산물, 수제 베이커리, 로컬 창작자들이 한자리에 모이는 타오디엔 주말 마켓 안내입니다.',
    body_en: `> **[SAMPLE PREVIEW]** This post is a **sample entry** created to preview the Thao Dien Events board layout and features. It is not a real event and is blocked from search engine indexing (\`noindex\`).

The Thao Dien Weekend Farmers & Craft Market gathers local growers, bakers and neighborhood makers for a relaxed two-day courtyard market on Xuan Thuy Street.

## What to expect

- **Fresh produce & pantry**: Dalat highland vegetables, raw honey, artisanal cheese and small-batch coffee beans.
- **Bakery & brunch stalls**: Freshly baked sourdough loaves, pastries and cold-pressed juices available from 8:30 AM.
- **Craft & ceramic tables**: Handmade tableware, linen home goods and botanical candles by Thu Duc studio artists.

## When & where

- **Dates**: October 18 – October 26, 2026 (08:30 – 17:00)
- **Location**: Xuan Thuy Community Courtyard, Thao Dien, Thu Duc City
- **Entry**: Free admission (pet-friendly outdoor area)

## Good to know

Bring your own reusable tote bag and tumbler. Motorbike parking is available at the side entrance on Quoc Huong Street.`,
    body_vi: `> **[BÀI MẪU XEM TRƯỚC]** Đây là **bài viết mẫu** dùng để kiểm tra giao diện bảng Sự kiện Thảo Điền, không phải sự kiện thực tế và đã được chặn lập chỉ mục tìm kiếm (\`noindex\`).

Chợ phiên Nông sản & Thủ công Cuối tuần Thảo Điền quy tụ các nhà vườn địa phương, tiệm bánh thủ công và các nghệ nhân trong khu phố tại khoảng sân thoáng mát trên đường Xuân Thủy.

## Hoạt động nổi bật

- **Nông sản tươi & thực phẩm sạch**: Rau củ Đà Lạt, mật ong nguyên chất, phô mai thủ công và cà phê rang mộc.
- **Quầy bánh & đồ uống sáng**: Bánh mì sourdough mới ra lò, bánh ngọt và nước ép lạnh phục vụ từ 08:30 sáng.
- **Góc thủ công & gốm**: Đồ gốm bàn ăn, vải linen gia dụng và nến thơm tự nhiên từ các xưởng nhỏ tại TP. Thủ Đức.

## Thời gian & địa điểm

- **Thời gian**: 18/10 – 26/10/2026 (08:30 – 17:00)
- **Địa điểm**: Sân sinh hoạt cộng đồng Xuân Thủy, Thảo Điền, TP. Thủ Đức
- **Vé vào cửa**: Miễn phí (khu vực ngoài trời thân thiện với thú cưng)

## Lưu ý hữu ích

Khuyến khích cư dân mang theo túi vải cá nhân và bình nước riêng. Có bãi giữ xe máy ở cổng phụ phía đường Quốc Hương.`,
    body_ko: `> **[샘플 미리보기 안내]** 이 글은 타오디엔 이벤트 게시판 화면과 기능을 확인하기 위해 작성된 **샘플 게시물**입니다. 실제 열리는 행사가 아니며 검색엔진 노출이 차단(\`noindex\`)되어 있습니다.

타오디엔 주말 파머스 & 크래프트 마켓은 쑤언투이(Xuân Thủy) 거리의 야외 코트야드에서 로컬 농가, 수제 베이커리, 동네 공방 작가들이 함께 여는 주말 장터입니다.

## 주요 프로그램 및 부스

- **신선 농산물 & 그로서리**: 달랏 고원 유기농 채소, 천연 벌꿀, 수제 치즈 및 소량 로스팅 원두를 만나볼 수 있습니다.
- **베이커리 & 모닝 브런치**: 오전 8시 30분부터 갓 구운 사워도우 브레드, 페이스트리, 착즙 주스가 준비됩니다.
- **수공예 & 세라믹 마켓**: 투득시 로컬 공방에서 제작한 도자기 식기, 리넨 소품, 천연 소이 캔들을 전시·판매합니다.

## 일시 및 장소

- **일정**: 2026년 10월 18일 ~ 10월 26일 (08:30 – 17:00)
- **장소**: 타오디엔 쑤언투이 커뮤니티 코트야드 (Xuân Thủy, Thảo Điền, TP. Thủ Đức)
- **입장료**: 무료 입장 (반려동물 동반 가능 야외 공간)

## 방문 전 참고사항

개인 에코백과 텀블러 지참을 권장합니다. 오토바이 주차는 꾸옥흐엉(Quốc Hương) 거리 쪽 보조 출입구를 이용하실 수 있습니다.`,
    seo_title: '[SAMPLE] Thao Dien Weekend Farmers & Craft Market | Good Life in Thaodien',
    seo_title_vi: '[MẪU] Chợ phiên Nông sản & Thủ công Cuối tuần Thảo Điền | Good Life in Thaodien',
    seo_title_ko: '[샘플] 타오디엔 주말 파머스 & 크래프트 마켓 | Good Life in Thaodien',
    seo_description: '[SAMPLE] Preview event entry for the Thao Dien Weekend Farmers & Craft Market at Xuan Thuy Courtyard.',
    seo_description_vi: '[MẪU] Bài xem trước cho sự kiện Chợ phiên Nông sản & Thủ công Cuối tuần Thảo Điền.',
    seo_description_ko: '[샘플] 타오디엔 주말 파머스 & 크래프트 마켓 이벤트 게시판 화면 확인용 샘플 글입니다.',
    key_points: [
      '[SAMPLE] Runs October 18–26, 2026 (08:30–17:00) at Xuan Thuy Courtyard',
      'Features Dalat organic produce, sourdough bakery stalls and local ceramics',
      'Free entry, pet-friendly outdoor space, bring your own reusable bag',
    ],
    key_points_vi: [
      '[MẪU] Diễn ra từ 18/10 đến 26/10/2026 (08:30–17:00) tại sân Xuân Thủy',
      'Quy tụ nông sản hữu cơ Đà Lạt, bánh mì sourdough và đồ gốm thủ công',
      'Vào cửa miễn phí, không gian ngoài trời thân thiện thú cưng',
    ],
    key_points_ko: [
      '[샘플] 2026년 10월 18일 ~ 10월 26일 (08:30–17:00) 쑤언투이 코트야드 진행',
      '달랏 유기농 채소, 사워도우 베이커리, 로컬 도자기·공예 부스 참여',
      '무료 입장 및 반려동물 동반 가능 야외 공간 (개인 장바구니 지참 권장)',
    ],
    callout: 'SAMPLE NOTICE: This listing is a sample post for UI verification only and is excluded from public search indexing.',
    callout_vi: 'THÔNG BÁO BÀI MẪU: Đây là bài đăng mẫu chỉ dùng để kiểm tra giao diện và không xuất hiện trên công cụ tìm kiếm.',
    callout_ko: '샘플 공지: 이 게시물은 게시판 디자인 및 기능 점검을 위한 샘플 데이터이며 외부 검색엔진에 노출되지 않습니다.',
    cover_image_url: '/stock/bakery.webp',
    hero_caption: 'Sample illustration image from existing site stock (/stock/bakery.webp).',
    hero_caption_vi: 'Ảnh minh họa mẫu từ kho ảnh sẵn có của trang (/stock/bakery.webp).',
    hero_caption_ko: '사이트 기존 보유 스톡 이미지를 활용한 샘플 대표 사진입니다 (/stock/bakery.webp).',
    published_at: '2026-10-19T09:00:00+07:00',
    updated_at: '2026-10-19T09:00:00+07:00',
    event_date: '2026-10-18T08:30:00+07:00',
    effective_date: '2026-10-26T17:00:00+07:00', // Ends Oct 26, 2026 -> Ongoing (진행중)
    event_location: 'Xuan Thuy Courtyard, Thao Dien, Thu Duc City',
    author_name: 'Good Life Editorial Desk (Sample)',
    tags: ['sample', 'market', 'farmers-market', 'bakery', 'craft', 'xuan-thuy', '플리마켓', '마켓', 'chợ phiên'],
  },
  {
    id: 'sample-event-002',
    slug: 'sample-riverside-morning-yoga-breathwork-session',
    content_type: 'event',
    status: 'published',
    is_sample: true,
    category: 'Wellness & Sports',
    category_vi: 'Sức khỏe & Thể thao',
    category_ko: '웰니스 · 스포츠',
    title: '[SAMPLE] Saigon Riverside Morning Yoga & Breathwork Community Session',
    title_vi: '[MẪU] Buổi tập Yoga & Thở buổi sáng bên sông Sài Gòn tại Thảo Điền',
    title_ko: '[샘플] 사이공 리버사이드 모닝 요가 & 호흡 커뮤니티 클래스',
    subtitle: 'Sample preview event: beginner-friendly outdoor vinyasa flow and guided breathwork by the river.',
    subtitle_vi: 'Bài mẫu xem trước: lớp yoga vinyasa ngoài trời và hướng dẫn hít thở dành cho người mới.',
    subtitle_ko: '화면 확인용 샘플 이벤트: 초보자도 참여할 수 있는 강변 야외 빈야사 요가 및 호흡 명상.',
    excerpt: '[SAMPLE — Not a real event] An open-air morning movement and recovery session along Nguyen Van Huong riverside lawn for Thao Dien residents.',
    excerpt_vi: '[BÀI MẪU — Không phải sự kiện thật] Buổi tập vận động và phục hồi buổi sáng ngoài trời dọc bờ sông đường Nguyễn Văn Hưởng dành cho cư dân Thảo Điền.',
    excerpt_ko: '[샘플 — 실제 행사가 아닙니다] 응우옌반흐엉 강변 잔디밭에서 진행되는 타오디엔 주민 대상 아침 야외 요가 및 회복 세션입니다.',
    body_en: `> **[SAMPLE PREVIEW]** This post is a **sample entry** created to preview the Thao Dien Events board layout and features. It is not a real event and is blocked from search engine indexing (\`noindex\`).

Start the weekend with a gentle 60-minute outdoor yoga flow followed by 15 minutes of guided breathwork overlooking the Saigon River.

## What to expect

- **06:45 – 07:00**: Check-in and mat setup on the shaded riverside lawn.
- **07:00 – 08:00**: All-levels vinyasa mobility flow (conducted in English with Vietnamese and Korean posture cues).
- **08:00 – 08:15**: Cooling breathwork and neighborhood coffee social.

## When & where

- **Dates**: October 17 – November 15, 2026 (Saturdays, 07:00 – 08:15)
- **Location**: Nguyen Van Huong Riverside Lawn, Thao Dien, Thu Duc City
- **Who it is for**: Open to all fitness levels; beginners welcome.

## Good to know

Please bring your own yoga mat, a small towel and water bottle. In case of heavy morning rain, the session moves under the covered pavilion.`,
    body_vi: `> **[BÀI MẪU XEM TRƯỚC]** Đây là **bài viết mẫu** dùng để kiểm tra giao diện bảng Sự kiện Thảo Điền, không phải sự kiện thực tế và đã được chặn lập chỉ mục tìm kiếm (\`noindex\`).

Khởi đầu ngày cuối tuần với 60 phút tập yoga ngoài trời nhẹ nhàng kết hợp 15 phút thực hành hít thở thư giãn bên bờ sông Sài Gòn.

## Lịch trình dự kiến

- **06:45 – 07:00**: Đón người tham gia và trải thảm tại bãi cỏ ven sông.
- **07:00 – 08:00**: Bài tập Vinyasa linh hoạt phù hợp mọi cấp độ (hướng dẫn bằng tiếng Anh, hỗ trợ chỉnh tư thế bằng tiếng Việt và tiếng Hàn).
- **08:00 – 08:15**: Hít thở thư giãn và giao lưu cà phê sáng cùng hàng xóm.

## Thời gian & địa điểm

- **Thời gian**: 17/10 – 15/11/2026 (Thứ Bảy hàng tuần, 07:00 – 08:15)
- **Địa điểm**: Bãi cỏ ven sông đường Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức
- **Đối tượng**: Phù hợp với mọi trình độ, hoan nghênh người mới bắt đầu.

## Lưu ý hữu ích

Vui lòng tự chuẩn bị thảm tập yoga, khăn nhỏ và bình nước cá nhân. Nếu trời mưa lớn vào buổi sáng, lớp tập sẽ chuyển vào khu mái che liền kề.`,
    body_ko: `> **[샘플 미리보기 안내]** 이 글은 타오디엔 이벤트 게시판 화면과 기능을 확인하기 위해 작성된 **샘플 게시물**입니다. 실제 열리는 행사가 아니며 검색엔진 노출이 차단(\`noindex\`)되어 있습니다.

주말 아침 사이공강 바람을 맞으며 60분간의 야외 빈야사 요가와 15분간의 호흡 명상으로 상쾌하게 하루를 시작해 보세요.

## 세부 프로그램

- **06:45 – 07:00**: 강변 그늘 잔디밭 체크인 및 개인 매트 준비
- **07:00 – 08:00**: 전신 모빌리티 빈야사 플로우 (영어 진행, 베트남어·한국어 자세 안내 병행)
- **08:00 – 08:15**: 마무리 호흡 이완 및 이웃들과의 모닝 커피 티타임

## 일시 및 장소

- **일정**: 2026년 10월 17일 ~ 11월 15일 (매주 토요일 오전 07:00 – 08:15)
- **장소**: 응우옌반흐엉 강변 잔디 공간 (Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức)
- **대상**: 요가 입문자부터 숙련자까지 모든 거주민 참여 가능

## 방문 전 참고사항

개인 요가 매트, 작은 수건, 생수를 지참해 주세요. 우천 시에는 바로 옆 지붕이 있는 파빌리온 공간에서 진행됩니다.`,
    seo_title: '[SAMPLE] Saigon Riverside Morning Yoga & Breathwork | Good Life in Thaodien',
    seo_title_vi: '[MẪU] Buổi tập Yoga & Thở buổi sáng bên sông Sài Gòn | Good Life in Thaodien',
    seo_title_ko: '[샘플] 사이공 리버사이드 모닝 요가 & 호흡 클래스 | Good Life in Thaodien',
    seo_description: '[SAMPLE] Preview event entry for the Saigon Riverside Morning Yoga & Breathwork Community Session in Thao Dien.',
    seo_description_vi: '[MẪU] Bài xem trước cho sự kiện Buổi tập Yoga & Thở buổi sáng bên sông Sài Gòn tại Thảo Điền.',
    seo_description_ko: '[샘플] 사이공 리버사이드 모닝 요가 & 호흡 커뮤니티 클래스 화면 확인용 샘플 글입니다.',
    key_points: [
      '[SAMPLE] Saturday morning sessions (07:00–08:15) through November 15, 2026',
      'Beginner-friendly outdoor vinyasa flow and breathwork along Nguyen Van Huong',
      'Bring your own yoga mat, towel and water bottle',
    ],
    key_points_vi: [
      '[MẪU] Các buổi sáng Thứ Bảy (07:00–08:15) kéo dài đến 15/11/2026',
      'Yoga ngoài trời thân thiện với người mới dọc bờ sông Nguyễn Văn Hưởng',
      'Người tham gia tự chuẩn bị thảm tập, khăn nhỏ và bình nước',
    ],
    key_points_ko: [
      '[샘플] 2026년 11월 15일까지 매주 토요일 오전(07:00–08:15) 진행',
      '응우옌반흐엉 강변에서 열리는 초보자 맞춤형 야외 요가 & 호흡 명상',
      '개인 요가 매트·수건·텀블러 지참 필요',
    ],
    callout: 'SAMPLE NOTICE: This listing is a sample post for UI verification only and is excluded from public search indexing.',
    callout_vi: 'THÔNG BÁO BÀI MẪU: Đây là bài đăng mẫu chỉ dùng để kiểm tra giao diện và không xuất hiện trên công cụ tìm kiếm.',
    callout_ko: '샘플 공지: 이 게시물은 게시판 디자인 및 기능 점검을 위한 샘플 데이터이며 외부 검색엔진에 노출되지 않습니다.',
    cover_image_url: '/stock/workout.webp',
    hero_caption: 'Sample illustration image from existing site stock (/stock/workout.webp).',
    hero_caption_vi: 'Ảnh minh họa mẫu từ kho ảnh sẵn có của trang (/stock/workout.webp).',
    hero_caption_ko: '사이트 기존 보유 스톡 이미지를 활용한 샘플 대표 사진입니다 (/stock/workout.webp).',
    published_at: '2026-10-16T08:00:00+07:00',
    updated_at: '2026-10-16T08:00:00+07:00',
    event_date: '2026-10-17T07:00:00+07:00',
    effective_date: '2026-11-15T08:15:00+07:00', // Ends Nov 15, 2026 -> Ongoing (진행중)
    event_location: 'Nguyen Van Huong Riverside, Thao Dien, Thu Duc City',
    author_name: 'Good Life Editorial Desk (Sample)',
    tags: ['sample', 'yoga', 'wellness', 'workout', 'riverside', '요가', '운동', '웰니스', 'thể thao'],
  },
  {
    id: 'sample-event-003',
    slug: 'sample-autumn-acoustic-coffee-social-quoc-huong',
    content_type: 'event',
    status: 'published',
    is_sample: true,
    category: 'Community & Culture',
    category_vi: 'Cộng đồng & Văn hóa',
    category_ko: '커뮤니티 · 문화',
    title: '[SAMPLE] Thao Dien Autumn Acoustic & Neighbor Coffee Social (Past Event)',
    title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Thảo Điền (Đã kết thúc)',
    title_ko: '[샘플] 타오디엔 어텀 어쿠스틱 & 이웃 커피 모임 (종료된 행사 예시)',
    subtitle: 'Sample completed event demonstrating the Ended status badge when the event end date has passed.',
    subtitle_vi: 'Bài mẫu sự kiện đã qua nhằm hiển thị trạng thái Đã kết thúc khi qua ngày kết thúc sự kiện.',
    subtitle_ko: '종료일 경과 시 ‘종료(Ended)’ 배지가 표시되는 것을 확인하기 위한 샘플 이벤트 게시물.',
    excerpt: '[SAMPLE — Not a real event] An afternoon acoustic guitar session and specialty pour-over coffee tasting for new and long-time Thao Dien residents.',
    excerpt_vi: '[BÀI MẪU — Không phải sự kiện thật] Buổi chiều nhạc guitar acoustic và thưởng thức cà phê pha thủ công dành cho cư dân mới và lâu năm tại Thảo Điền.',
    excerpt_ko: '[샘플 — 실제 행사가 아닙니다] 타오디엔 신규 전입 주민과 기존 거주민이 함께 어울리는 오후 어쿠스틱 기타 연주 및 핸드드립 커피 시음 모임입니다.',
    body_en: `> **[SAMPLE PREVIEW]** This post is a **sample entry** created to preview the Thao Dien Events board layout (specifically the **Ended** status badge). It is not a real event and is blocked from search engine indexing (\`noindex\`).

Neighbors gathered on Quoc Huong Street for an informal afternoon of acoustic music, pour-over coffee tasting and practical neighborhood tips for newcomers.

## What happened

- **Specialty coffee tasting**: Local roasters shared single-origin Arabica beans from Lam Dong Province.
- **Acoustic music set**: Two unplugged acoustic sets by resident musicians from 16:00 to 17:30.
- **Newcomer Q&A table**: Practical information on metro commuting, trash collection schedules and pet-friendly parks.

## When & where

- **Date**: October 10, 2026 (15:00 – 18:00) — **Event Ended**
- **Location**: Quoc Huong Garden Lounge, Thao Dien, Thu Duc City

## Good to know

This sample event has an end date in the past (\`2026-10-10\`) so you can verify how completed events display the **Ended / Đã kết thúc / 종료** badge on both the list and detail pages.`,
    body_vi: `> **[BÀI MẪU XEM TRƯỚC]** Đây là **bài viết mẫu** dùng để kiểm tra trạng thái **Đã kết thúc** trên bảng Sự kiện Thảo Điền, không phải sự kiện thực tế và đã được chặn lập chỉ mục tìm kiếm (\`noindex\`).

Buổi chiều giao lưu thân mật trên đường Quốc Hương với âm nhạc acoustic, thưởng thức cà phê pour-over và chia sẻ kinh nghiệm sinh hoạt cho cư dân mới.

## Nội dung chương trình

- **Thưởng thức cà phê đặc sản**: Trải nghiệm hạt Arabica vùng Lâm Đồng pha thủ công.
- **Biểu diễn nhạc Acoustic**: Hai khung giờ nhạc mộc từ 16:00 đến 17:30 của các nghệ sĩ sống tại khu phố.
- **Bàn thông tin cho cư dân mới**: Chia sẻ mẹo đi tàu Metro số 1, lịch thu gom rác và các công viên thân thiện thú cưng.

## Thời gian & địa điểm

- **Thời gian**: 10/10/2026 (15:00 – 18:00) — **Sự kiện đã kết thúc**
- **Địa điểm**: Không gian sân vườn đường Quốc Hương, Thảo Điền, TP. Thủ Đức

## Lưu ý hữu ích

Sự kiện mẫu này có ngày kết thúc trong quá khứ (\`2026-10-10\`) để kiểm tra cách hiển thị nhãn **Ended / Đã kết thúc / 종료** trên trang danh sách và trang chi tiết.`,
    body_ko: `> **[샘플 미리보기 안내]** 이 글은 타오디엔 이벤트 게시판의 **‘종료’ 상태 배지** 표시를 확인하기 위해 작성된 **샘플 게시물**입니다. 실제 열린 행사가 아니며 검색엔진 노출이 차단(\`noindex\`)되어 있습니다.

꾸옥흐엉(Quốc Hương) 거리의 가든 라운지에서 타오디엔 신규 입주민과 기존 주민들이 함께 핸드드립 커피를 마시며 어쿠스틱 음악을 즐긴 오후 모임입니다.

## 주요 진행 내용

- **스페셜티 커피 테이스팅**: 럼동(Lâm Đồng) 지역 싱글 오리진 아라비카 원두 핸드드립 시음
- **어쿠스틱 기타 라이브**: 오후 4시부터 5시 30분까지 동네 뮤지션들의 언플러그드 공연 진행
- **신규 거주민 생활 정보 나눔**: 메트로 1호선 이용법, 동네 생활 팁, 반려동물 산책 코스 안내

## 일시 및 장소

- **일정**: 2026년 10월 10일 (15:00 – 18:00) — **종료된 이벤트**
- **장소**: 타오디엔 꾸옥흐엉 가든 라운지 (Quốc Hương, Thảo Điền, TP. Thủ Đức)

## 참고사항

이 샘플 게시물은 종료일(\`2026-10-10\`)이 과거로 설정되어 있어, 목록과 상세 페이지에서 **Ended / Đã kết thúc / 종료** 배지가 정상적으로 표시되는지 확인하는 용도입니다.`,
    seo_title: '[SAMPLE] Thao Dien Autumn Acoustic & Coffee Social | Good Life in Thaodien',
    seo_title_vi: '[MẪU] Giao lưu Cà phê & Nhạc Acoustic Mùa thu Thảo Điền | Good Life in Thaodien',
    seo_title_ko: '[샘플] 타오디엔 어텀 어쿠스틱 & 이웃 커피 모임 | Good Life in Thaodien',
    seo_description: '[SAMPLE] Preview completed event entry demonstrating the Ended status badge on the Thao Dien Events board.',
    seo_description_vi: '[MẪU] Bài xem trước cho sự kiện đã kết thúc trên bảng Sự kiện Thảo Điền.',
    seo_description_ko: '[샘플] 종료일 경과 시 종료 배지 표시를 확인하기 위한 타오디엔 이벤트 샘플 글입니다.',
    key_points: [
      '[SAMPLE] Completed event held on October 10, 2026 (demonstrates Ended status badge)',
      'Featured Lam Dong pour-over coffee tasting and acoustic guitar sessions',
      'Included newcomer Q&A on Thao Dien daily living',
    ],
    key_points_vi: [
      '[MẪU] Sự kiện đã diễn ra ngày 10/10/2026 (minh họa nhãn trạng thái Đã kết thúc)',
      'Thưởng thức cà phê pour-over Lâm Đồng và nhạc guitar acoustic',
      'Chia sẻ kinh nghiệm sinh hoạt tại Thảo Điền cho cư dân mới',
    ],
    key_points_ko: [
      '[샘플] 2026년 10월 10일 종료된 행사 예시 (‘종료’ 배지 동작 확인용)',
      '럼동 싱글오리진 핸드드립 커피 시음 및 어쿠스틱 기타 공연',
      '타오디엔 신규 거주민을 위한 동네 생활 정보 교류',
    ],
    callout: 'SAMPLE NOTICE: This listing is a sample post for UI verification only and is excluded from public search indexing.',
    callout_vi: 'THÔNG BÁO BÀI MẪU: Đây là bài đăng mẫu chỉ dùng để kiểm tra giao diện và không xuất hiện trên công cụ tìm kiếm.',
    callout_ko: '샘플 공지: 이 게시물은 게시판 디자인 및 기능 점검을 위한 샘플 데이터이며 외부 검색엔진에 노출되지 않습니다.',
    cover_image_url: '/stock/cafe.webp',
    hero_caption: 'Sample illustration image from existing site stock (/stock/cafe.webp).',
    hero_caption_vi: 'Ảnh minh họa mẫu từ kho ảnh sẵn có của trang (/stock/cafe.webp).',
    hero_caption_ko: '사이트 기존 보유 스톡 이미지를 활용한 샘플 대표 사진입니다 (/stock/cafe.webp).',
    published_at: '2026-10-08T10:00:00+07:00',
    updated_at: '2026-10-10T19:00:00+07:00',
    event_date: '2026-10-10T15:00:00+07:00',
    effective_date: '2026-10-10T18:00:00+07:00', // Ended Oct 10, 2026 -> Ended (종료)
    event_location: 'Quoc Huong Street, Thao Dien, Thu Duc City',
    author_name: 'Good Life Editorial Desk (Sample)',
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
