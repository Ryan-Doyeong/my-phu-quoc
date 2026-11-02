/**
 * 푸꾸옥 남부 여행 일정 자동 생성 로직
 *
 * 원칙 (2026-11-01 결정)
 *  1. 일정은 남부(선셋타운·켐비치·안토이)만 짠다. 남부 일정은 최대 3박 4일.
 *  2. 여행 형태: 남부만 / 남부에서 시작 → 다른 지역 / 다른 지역 → 남부에서 마무리.
 *     중부·북부는 일정 대신 조언(이동 시간 등)으로 안내한다.
 *  3. 필수 공연 2개(심포니 19:30 / 키스 21:00)는 남부 저녁에 배치.
 *     - 저녁이 하루뿐이면 같은 날 연달아 관람(19:30 → 21:00).
 *     - 여행 날짜를 알면 키스 오브 더 씨를 화요일에 두지 않도록 피함(휴무 여부 미확인).
 *  4. 남부 도착·출발 시간대에 맞춰 첫날/마지막 날 쓸 수 있는 시간만 채움.
 *     이른 도착은 체크인 전 '호국사 → 쌀국수 → 커피' 동선.
 *  5. 시간 충돌 금지: 호핑·케이블카(낮 전체) ↔ 크루즈 디너(오후 출발),
 *     오징어 낚시(17~21시) ↔ 공연 저녁.
 *  6. 동행·여행 목적·여행 속도에 따라 프로그램 순서와 기본 등급이 달라짐.
 */

import { checkShowAvailability, SHOW_SCHEDULES } from '@/lib/shows'
import { OTHER_REGION_ADVICE, PRODUCTS, SPOT } from './catalog'
import type { Companion, L, Plan, PlanDay, PlanItem, PlannerInput, Region, Tier, TimeBand } from './types'

type Slot = 'morning' | 'lunch' | 'afternoon' | 'sunset' | 'evening' | 'night'
const SLOTS: Slot[] = ['morning', 'lunch', 'afternoon', 'sunset', 'evening', 'night']

export const MAX_SOUTH_NIGHTS = 3

export const BAND_LABEL: Record<TimeBand, L> = {
  dawn: { ko: '새벽', en: 'Early hours' },
  morning: { ko: '오전', en: 'Morning' },
  afternoon: { ko: '오후', en: 'Afternoon' },
  evening: { ko: '저녁', en: 'Evening' },
  late: { ko: '밤 늦게', en: 'Late night' },
}

export const BAND_RANGE: Record<TimeBand, string> = {
  dawn: '00–06',
  morning: '06–12',
  afternoon: '12–18',
  evening: '18–22',
  late: '22–24',
}

const ARRIVAL_SLOTS: Record<TimeBand, Slot[]> = {
  dawn: ['morning', 'lunch', 'afternoon', 'sunset', 'evening', 'night'],
  morning: ['lunch', 'afternoon', 'sunset', 'evening', 'night'],
  afternoon: ['sunset', 'evening', 'night'],
  evening: ['night'],
  late: [],
}

const DEPARTURE_SLOTS: Record<TimeBand, Slot[]> = {
  dawn: [],
  morning: [],
  afternoon: ['morning'],
  evening: ['morning', 'lunch', 'afternoon'],
  late: ['morning', 'lunch', 'afternoon', 'sunset'],
}

const t = (ko: string, en: string): L => ({ ko, en })

function isRainySeason(date: Date | null): boolean {
  if (!date) return false
  const m = date.getMonth() + 1
  return m >= 5 && m <= 11
}

function parseDate(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null
  const [y, m, d] = s.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export function defaultTierFor(productId: string, companion: Companion): Tier | undefined {
  const p = PRODUCTS[productId]
  if (!p?.tiers) return undefined
  const wish: Record<Companion, Tier[]> = {
    kids: ['premium', 'private', 'shared'],
    parents: ['private', 'premium', 'shared'],
    couple: ['premium', 'private', 'shared'],
    friends: ['shared', 'premium', 'private'],
    solo: ['shared', 'premium', 'private'],
  }
  return wish[companion].find((tier) => p.tiers!.includes(tier)) ?? p.tiers[0]
}

/* ------------------------------------------------------------------ */
/* 아이템 빌더                                                           */
/* ------------------------------------------------------------------ */

interface Ctx {
  input: PlannerInput
  rainy: boolean
  dayIndex: number
  /** 이 날 저녁에 공연(심포니/키스)이 잡혀 있으면 true — 석양 시간대 활동을 피함 */
  showDay?: boolean
}

/** 버기 투어 시간대: 석양이 가장 좋고, 번잡함을 피하려면 10~15시. 정오 전후는 햇빛이 강함. */
const BUGGY_TIME_FLAG: L = t('가장 예쁜 시간은 석양 무렵 · 한적한 시간은 10~15시 (정오 전후는 햇빛이 강해요)', 'Best at sunset · quietest 10:00–15:00 (midday sun is harsh)')
function buggy(ctx: Ctx, extra: Partial<PlanItem> = {}, forceMorning = false): PlanItem {
  const sunset = !ctx.showDay && !forceMorning
  return productItem(ctx, 'buggy_tour', sunset ? '16:30' : '10:00', 'south', {
    ...(sunset ? { title: t('석양 버기 투어 (필수 사진 코스)', 'Sunset buggy tour (photo course)') } : {}),
    desc: sunset
      ? t('해 질 무렵 빛이 가장 예뻐요. 선셋타운 포토 스팟을 돌고 그대로 저녁으로 이어가요.', 'Golden-hour light is the prettiest. Loop the photo spots and roll into dinner.')
      : t('공연이 있는 날은 석양 대신 한적하고 덜 더운 오전 10시쯤이 좋아요.', 'On show days, go around 10:00 — quiet and before the heat.'),
    flags: [BUGGY_TIME_FLAG],
    ...extra,
  })
}

function item(ctx: Ctx, id: string, time: string, kind: PlanItem['kind'], title: L, region: Region, extra: Partial<PlanItem> = {}): PlanItem {
  return { key: `d${ctx.dayIndex}-${id}-${time}`, time, kind, title, region, ...extra }
}

function productItem(ctx: Ctx, productId: string, time: string, region: Region, extra: Partial<PlanItem> = {}): PlanItem {
  const p = PRODUCTS[productId]
  const flags: L[] = [...(extra.flags ?? [])]
  const seaProduct = ['hopping', 'squid_fishing', 'cruise_dinner', 'ocean_activity'].includes(productId)
  if (seaProduct && ctx.rainy) {
    flags.push(t('우기 기간: 날씨·파도에 따라 일정 변경 가능', 'Rainy season: may change with weather'))
  }
  return {
    key: `d${ctx.dayIndex}-${productId}-${time}`,
    time,
    kind: productId.startsWith('airport') ? 'service' : 'option',
    title: p.name,
    desc: p.summary,
    region,
    productId,
    defaultTier: defaultTierFor(productId, ctx.input.companion),
    ...extra,
    flags: flags.length ? flags : undefined,
  }
}

function spot(ctx: Ctx, key: keyof typeof SPOT, time: string, region: Region, kind: PlanItem['kind'] = 'spot', extra: Partial<PlanItem> = {}): PlanItem {
  return item(ctx, key, time, kind, SPOT[key].title, region, { desc: SPOT[key].desc, ...extra })
}

/* ------------------------------------------------------------------ */
/* 낮 프로그램                                                           */
/* ------------------------------------------------------------------ */

type ProgramId = 'hopping' | 'honthom' | 'buggyOcean' | 'carSouth' | 'relaxSouth'

interface ProgramResult {
  items: PlanItem[]
  /** 낮 전체를 쓰는 투어라 크루즈 디너(오후 출발)를 넣을 수 없음 */
  blocksAfternoon: boolean
  theme: L
}

function programOrder(input: PlannerInput): ProgramId[] {
  const base: Record<Companion, ProgramId[]> = {
    kids: ['honthom', 'buggyOcean', 'hopping', 'relaxSouth'],
    parents: ['carSouth', 'honthom', 'hopping', 'relaxSouth'],
    couple: ['hopping', 'buggyOcean', 'relaxSouth', 'honthom'],
    friends: ['hopping', 'buggyOcean', 'honthom', 'relaxSouth'],
    solo: ['buggyOcean', 'hopping', 'honthom', 'relaxSouth'],
  }
  let order = [...base[input.companion]]
  const bump = (id: ProgramId, pos: number) => {
    order = order.filter((x) => x !== id)
    order.splice(pos, 0, id)
  }
  if (input.purposes.includes('activity')) bump('hopping', 0)
  if (input.purposes.includes('photo')) bump('buggyOcean', input.purposes.includes('activity') ? 1 : 0)
  if (input.purposes.includes('relax')) bump('relaxSouth', 1)
  return order
}

function runProgram(ctx: Ctx, id: ProgramId): ProgramResult {
  const { companion, purposes } = ctx.input
  switch (id) {
    case 'hopping':
      return {
        theme: t('바다의 날', 'Sea day'),
        blocksAfternoon: true,
        items: [
          productItem(ctx, 'hopping', '08:30', 'south', {
            desc: t(
              '안토이 항에서 출발해 남쪽 섬을 돌며 스노클링·해변 휴식·점심까지 (약 6~8시간). 하루 전에는 예약해 두세요.',
              'From An Thoi port: snorkelling, beach time and lunch around the southern islands (6–8 h). Book a day ahead.',
            ),
            alternatives: [
              // 커플·프러포즈·단체는 프라이빗 요트를 첫 대안으로
              ...(companion === 'couple' || companion === 'friends' || companion === 'parents' ? [productItem(ctx, 'private_yacht', '09:00', 'south')] : []),
              productItem(ctx, 'cable_car', '09:30', 'south'),
              productItem(ctx, 'ocean_activity', '09:30', 'south', { desc: SPOT.sao.desc }),
            ],
          }),
          spot(ctx, 'resortRest', '15:30', 'south', 'rest', {
            desc: t('투어를 마치고 숙소에서 씻고 쉬어요.', 'Freshen up and rest after the tour.'),
          }),
        ],
      }
    case 'honthom':
      return {
        theme: t('케이블카 타고 섬으로', 'Cable car island day'),
        blocksAfternoon: true,
        items: [
          productItem(ctx, 'cable_car', '09:30', 'south', {
            desc: t(
              '바다를 건너는 케이블카로 혼똔섬에 가서 워터파크·놀이시설에서 하루를 보내요. 점심은 섬 안에서. 돌아오는 케이블카는 오후 늦게 줄이 길어 16시 전에 나오는 게 좋아요.',
              'Cross the sea by cable car to Hon Thom for water park and rides. Lunch on the island. Head back before 16:00 — late-afternoon return queues are long.',
            ),
            flags: [t('돌아오는 케이블카 마감 17시 전후 (확인 필요)', 'Last return cable car around 17:00 (check)')],
            alternatives: [productItem(ctx, 'hopping', '08:30', 'south')],
          }),
          spot(ctx, 'resortRest', '16:00', 'south', 'rest'),
        ],
      }
    case 'buggyOcean': {
      const gentle = companion === 'kids' || companion === 'parents'
      const afternoon = gentle
        ? spot(ctx, 'khem', '14:30', 'south', 'spot', {
            alternatives: [productItem(ctx, 'ocean_activity', '14:30', 'south'), productItem(ctx, 'massage', '15:00', 'south')],
          })
        : productItem(ctx, 'ocean_activity', '14:30', 'south', {
            desc: t('사오 비치에서 패러세일링·제트스키 등 원하는 종목을 즐겨요.', 'Parasailing or jet ski at Sao Beach.'),
            alternatives: [spot(ctx, 'khem', '14:30', 'south'), productItem(ctx, 'massage', '15:00', 'south')],
          })
      return {
        theme: purposes.includes('photo') ? t('사진 남기는 날', 'Photo day') : t('선셋타운과 해변', 'Sunset Town & beach'),
        blocksAfternoon: false,
        items: [
          ...(ctx.showDay
            ? [buggy(ctx, { alternatives: [spot(ctx, 'cafe', '10:00', 'south')] })]
            : [spot(ctx, 'cafe', '10:00', 'south', 'spot', { alternatives: [spot(ctx, 'sunsetTown', '10:00', 'south')] })]),
          spot(ctx, 'lunch', '12:00', 'south', 'meal'),
          afternoon,
          ...(ctx.showDay ? [] : [buggy(ctx)]),
        ],
      }
    }
    case 'carSouth':
      return {
        theme: t('편하게 남부 둘러보기', 'Easy south sightseeing'),
        blocksAfternoon: false,
        items: [
          productItem(ctx, 'car_tour', '09:00', 'south', {
            desc: t(
              '전용 차량으로 호국사·사오 비치 등 남부 명소를 무리 없이 돌아봐요. 걷는 거리가 적어 부모님과 함께하기 좋아요.',
              'Private car to Ho Quoc Pagoda, Sao Beach and other southern sights with little walking.',
            ),
            alternatives: [buggy(ctx, { time: '10:00' }, true)],
          }),
          ...(PRODUCTS.local_guide.hidden ? [] : [productItem(ctx, 'local_guide', '08:45', 'south', { desc: t('부모님·아이와 함께라면 가이드가 동행해 설명하고 사진도 찍어 드려요. 시즌·인원에 따라 상담 후 견적.', 'A guide joins to explain, help and take photos. Quote after consultation.') })]),
          spot(ctx, 'lunch', '12:30', 'south', 'meal'),
          productItem(ctx, 'massage', '15:00', 'south', { alternatives: [spot(ctx, 'resortRest', '15:00', 'south', 'rest')] }),
        ],
      }
    case 'relaxSouth':
      return {
        theme: t('쉬어 가는 날', 'Slow day'),
        blocksAfternoon: false,
        items: [
          spot(ctx, 'cafe', '10:00', 'south'),
          spot(ctx, 'resortRest', '13:00', 'south', 'rest'),
          productItem(ctx, 'massage', '15:30', 'south', { alternatives: [spot(ctx, 'khem', '15:30', 'south')] }),
        ],
      }
  }
}

/* ------------------------------------------------------------------ */
/* 메인                                                                  */
/* ------------------------------------------------------------------ */

export function generatePlan(input: PlannerInput): Plan {
  const notes: L[] = []
  const N = Math.min(MAX_SOUTH_NIGHTS, Math.max(1, Math.round(input.nights)))
  const fromOther = input.stayPlan === 'other_first'
  const toOther = input.stayPlan === 'south_first'
  const start = parseDate(input.startDate)
  const days: PlanDay[] = []

  /* 1) 날짜별 사용 가능 시간대 */
  const info = Array.from({ length: N + 1 }, (_, d) => {
    let slots: Slot[] = SLOTS
    if (d === 0) slots = ARRIVAL_SLOTS[input.arrival]
    if (d === N) slots = DEPARTURE_SLOTS[input.departure]
    return { slots: new Set(slots), date: start ? addDays(start, d) : null }
  })

  /* 2) 필수 공연 배치 (공연별 운영 요일 · 시즌 시작일 검증) */
  const evenings = info.map((_, d) => d).filter((d) => d < N && info[d].slots.has('evening'))
  const symValidEvenings = evenings.filter((d) => checkShowAvailability('symphony-of-the-sea', info[d].date).available)
  const kissValidEvenings = evenings.filter((d) => checkShowAvailability('kiss-of-the-sea', info[d].date).available)

  let symphonyDay: number | null = symValidEvenings[0] ?? null
  let kissDay: number | null = null

  if (kissValidEvenings.length > 0) {
    // 심포니와 다른 날을 우선 선택하되, 가능한 날이 하루뿐이면 같은 날 배치
    const diffDay = kissValidEvenings.find((d) => d !== symphonyDay)
    kissDay = diffDay !== undefined ? diffDay : kissValidEvenings[0]
    // 만약 심포니가 화요일이 아닌 날을 차지해서 키스가 같은 날로 몰렸는데, 심포니를 화요일(키스 휴무일)로 옮길 수 있다면 스왑
    if (
      kissDay === symphonyDay &&
      symValidEvenings.length >= 2
    ) {
      const altSym = symValidEvenings.find((d) => d !== kissDay)
      if (altSym !== undefined) {
        symphonyDay = altSym
      }
    }
  }

  if (!start) {
    notes.push(
      t(
        '출발 날짜가 아직 선택되지 않아 임시 예시 일정으로 표시 중이에요. 출발 날짜를 선택하시면 키스 오브 더 씨 휴연일(매주 화요일)과 심포니 오브 더 씨 시즌 3 개막일(2026년 11월 10일 예정)을 자동 검증해 실제 관람 가능한 공연만 배치해 드려요.',
        'No start date selected yet — showing a tentative sample schedule. Pick your travel date to automatically validate show dark days (Kiss of the Sea closed Tuesdays) and season dates (Symphony of the Sea Season 3 opens Nov 10, 2026).',
      ),
    )
  }

  if (evenings.length === 0) {
    notes.push(
      t(
        '도착·출발 시간 때문에 남부에서 저녁 공연을 볼 수 있는 날이 없어요. 남부 숙박을 늘리거나 시간대를 바꿔 보세요.',
        'No free evening in the south for the shows — add a night or change times.',
      ),
    )
  } else {
    if (start && symValidEvenings.length === 0) {
      notes.push(
        t(
          SHOW_SCHEDULES['symphony-of-the-sea'].seasonNotice?.ko ??
            '심포니 오브 더 씨 시즌 3는 2026년 11월 10일 개막 예정이어서, 선택하신 날짜에는 선셋타운 야경·야시장 산책 일정으로 대체했어요.',
          SHOW_SCHEDULES['symphony-of-the-sea'].seasonNotice?.en ??
            'Symphony of the Sea Season 3 opens on Nov 10, 2026. For earlier dates, we substituted a Sunset Town evening stroll & bazaar visit.',
        ),
      )
    }
    if (start && kissValidEvenings.length === 0) {
      notes.push(
        t(
          '선택하신 남부 숙박 저녁이 화요일(키스 오브 더 씨 정기 휴연일)이어서 해당 공연을 추천에서 제외하고 선셋타운 야경·야시장 코스로 대체했어요.',
          'Your free evening in the south falls on a Tuesday (Kiss of the Sea weekly dark day), so we excluded the show and arranged a Sunset Town evening & night market course instead.',
        ),
      )
    }
    if (symphonyDay !== null && symphonyDay === kissDay) {
      notes.push(
        t(
          '두 공연 모두 관람 가능한 저녁에 맞춰 같은 날 연달아 보도록 구성했어요 (19:30 심포니 → 21:00 키스 오브 더 씨).',
          'Both shows are arranged back to back on your available evening (19:30 Symphony → 21:00 Kiss of the Sea).',
        ),
      )
    }
  }

  /* 3) 날짜별 일정 */
  const queue = programOrder(input)
  let progIdx = 0
  const rainyAny = info.some((x) => isRainySeason(x.date))

  for (let d = 0; d <= N; d++) {
    const ctx: Ctx = { input, rainy: isRainySeason(info[d].date), dayIndex: d, showDay: d < N && (d === symphonyDay || d === kissDay) }
    const has = (s: Slot) => info[d].slots.has(s)
    const items: PlanItem[] = []
    let theme: L = t('자유 일정', 'Free day')
    let blocksAfternoon = false

    if (d === 0) {
      /* ---------- 남부 도착일 ---------- */
      theme = t('남부 도착', 'Arrive in the south')
      const arrLabel = `arr-${input.arrival}`
      if (fromOther) {
        items.push(
          productItem(ctx, 'car_tour', arrLabel, 'south', {
            kind: 'move',
            title: t('다른 지역에서 남부로 이동', 'Transfer to the south'),
            desc: t(
              '즈엉동(중부)에서 약 40분, 북부(사파리·그랜드월드 방면)에서 약 1~1.5시간. 짐이 있으면 전용 차량이 편해요.',
              'About 40 min from Duong Dong, 1–1.5 h from the north. A private car is easiest with luggage.',
            ),
          }),
        )
      } else {
        items.push(
          productItem(ctx, 'airport_pickup', arrLabel, 'south', {
            desc: t('공항 도착 후 남부 숙소까지 약 25~30분.', 'About 25–30 min from the airport to your southern hotel.'),
          }),
        )
        items.push(
          productItem(ctx, 'exchange', arrLabel, 'south', {
            desc: t(
              '공항 환전소는 환율이 불리해요. 픽업 기사에게 미리 말해 두면 숙소 근처에서 바꿀 수 있어요.',
              'Airport counters give poor rates. Tell your driver in advance to exchange near your hotel.',
            ),
          }),
        )
      }

      if (input.arrival === 'dawn' || input.arrival === 'morning') {
        const dawn = input.arrival === 'dawn'
        const hoursFlag = t('운영 시작 시간 확인 필요', 'Check opening hours')
        items.push(
          item(ctx, 'checkin', '14:00', 'rest', t('체크인 (보통 14시 이후)', 'Check-in (usually from 14:00)'), 'south', {
            desc: t(
              '일찍 도착하면 짐을 맡기고 움직여요. 얼리 체크인 가능 여부는 숙소에 미리 물어보세요.',
              'Drop your bags if early. Ask your hotel about early check-in in advance.',
            ),
          }),
        )
        /* 체크인 전 '호국사 → 쌀국수 → 커피' (짐은 차량에 싣고 이동) */
        items.push(
          productItem(ctx, 'car_tour', dawn ? '06:30' : '09:00', 'south', {
            title: t('짐 싣고 체크인 전 둘러보기 (차량)', 'Pre-check-in tour with luggage (car)'),
            desc: t(
              `${fromOther ? '' : '공항에서 바로 '}짐을 싣고 호국사 → 쌀국수 → 카페 순서로 돌다가 숙소에 내려 드려요. 체크인 전 시간을 알차게 쓸 수 있어요.`,
              'Load your bags, visit the pagoda, have pho and coffee, then we drop you at your hotel.',
            ),
          }),
        )
        items.push(
          spot(ctx, 'hoQuoc', dawn ? '07:00' : '09:30', 'south', 'spot', {
            flags: [hoursFlag],
            alternatives: [spot(ctx, 'khem', dawn ? '07:00' : '09:30', 'south', 'spot', { title: t('켐비치 아침 산책', 'Morning walk at Khem Beach') })],
          }),
        )
        items.push(
          spot(ctx, 'phoBreakfast', dawn ? '08:30' : '11:00', 'south', 'meal', {
            title: dawn ? SPOT.phoBreakfast.title : t('쌀국수 브런치 (퍼 틴 · 하이봇)', 'Pho brunch (Pho Thin · Haibot)'),
            flags: [hoursFlag],
            alternatives: [spot(ctx, 'cafe', dawn ? '08:30' : '11:00', 'south', 'meal')],
          }),
        )
        items.push(
          spot(ctx, 'bakery', dawn ? '09:30' : '12:00', 'south', 'spot', {
            title: t('카페에서 커피 한잔', 'Coffee break'),
            desc: t(
              '에릭 카이저(Maison Kayser) 빵집이나 라페스타 카페(iL Salone)에서 커피를 마시며 쉬어요.',
              'Rest over coffee at Maison Kayser or La Festa’s café (iL Salone).',
            ),
            flags: [hoursFlag],
            alternatives: [
              productItem(ctx, 'massage', dawn ? '09:30' : '12:00', 'south', {
                title: t('도착 후 마사지로 피로 풀기', 'Massage after landing'),
                desc: t(
                  '밤 비행 뒤 체크인 전에 씻고 마사지 받는 일정이 후기에서 만족도가 높아요. 미리 예약하면 픽업과 함께 잡을 수 있어요.',
                  'A shower and massage before check-in is a reviewer favourite after night flights. Pre-book it with your pick-up.',
                ),
              }),
              spot(ctx, 'sunsetTown', dawn ? '09:30' : '12:00', 'south', 'spot', {
                title: dawn ? t('선셋타운 아침 산책', 'Morning walk in Sunset Town') : t('선셋타운 산책', 'Walk in Sunset Town'),
              }),
            ],
          }),
        )
        const groupSize = input.adults + input.children
        if (groupSize >= 4 && !PRODUCTS.morning_spa.hidden) {
          items.push(productItem(ctx, 'morning_spa', dawn ? '10:30' : '12:00', 'south'))
        }
        // 오전 도착은 쌀국수가 브런치를 겸하므로 점심 생략
        if (dawn && has('lunch')) items.push(spot(ctx, 'lunch', '12:00', 'south', 'meal'))
        if (has('afternoon')) {
          items.push(
            dawn
              ? spot(ctx, 'resortRest', '15:00', 'south', 'rest', {
                  title: t('체크인 후 낮잠·휴식', 'Nap after check-in'),
                  desc: t('새벽 비행 후에는 저녁 공연 전에 한숨 자 두는 게 좋아요.', 'After a night flight, rest before the evening show.'),
                })
              : spot(ctx, 'resortRest', '15:00', 'south', 'rest', {
                  title: t('체크인 후 수영장·휴식', 'Pool time after check-in'),
                  alternatives: [buggy(ctx, { time: ctx.showDay ? '15:00' : '16:30' })],
                }),
          )
        }
      } else if (input.arrival === 'afternoon') {
        items.push(item(ctx, 'checkin', '16:00', 'rest', t('체크인 · 짐 풀기', 'Check in & unpack'), 'south'))
      } else {
        items.push(
          item(ctx, 'checkin', '—', 'rest', t('체크인 후 휴식', 'Check in and rest'), 'south', {
            desc: t('늦게 도착하면 숙소에 도착 시간을 미리 알려 두세요.', 'Tell your hotel your late arrival time.'),
          }),
        )
      }
    } else if (d === N) {
      /* ---------- 남부 마지막 날 ---------- */
      theme = toOther ? t('다른 지역으로 이동', 'Move on') : t('출국', 'Departure')
      if (has('morning')) {
        items.push(
          input.purposes.includes('shopping')
            ? spot(ctx, 'bazaar', '09:30', 'south', 'spot', { title: t('선셋타운 기념품 쇼핑', 'Souvenir shopping in Sunset Town'), desc: t('마지막 기념품을 챙겨요.', 'Pick up last souvenirs.') })
            : spot(ctx, 'cafe', '09:30', 'south'),
        )
      }
      const early = input.departure === 'dawn' || input.departure === 'morning'
      items.push(
        early
          ? item(ctx, 'checkout', '—', 'rest', t('출발 시간에 맞춰 체크아웃', 'Check out in time'), 'south', {
              desc: t('이른 출발이면 전날 짐을 미리 싸 두고, 조식 가능 여부를 숙소에 확인하세요.', 'Pack the night before and ask about early breakfast.'),
            })
          : item(ctx, 'checkout', '11:00', 'rest', t('체크아웃 · 짐 보관', 'Check-out · store bags'), 'south', {
              desc: t('늦은 출발이면 짐을 맡겨 두고 움직여요. 출발 전 쉴 곳이 필요하면 데이유즈 객실도 방법이에요.', 'Store your bags; a day-use room helps before a late departure.'),
            }),
      )
      if (has('lunch')) items.push(spot(ctx, 'lunch', '12:00', 'south', 'meal'))
      if (has('afternoon')) {
        items.push(
          productItem(ctx, 'massage', '14:30', 'south', {
            desc: t('출발 전에 씻고 마사지로 몸을 풀어 두면 편해요.', 'Freshen up and relax before you leave.'),
            alternatives: [spot(ctx, 'khem', '14:30', 'south')],
          }),
        )
      }
      if (has('sunset')) items.push(spot(ctx, 'sunsetTown', '17:30', 'south'))
      const depLabel = `dep-${input.departure}`
      if (toOther) {
        items.push(
          productItem(ctx, 'car_tour', depLabel, 'south', {
            kind: 'move',
            title: t('남부에서 다른 지역으로 이동', 'Transfer from the south'),
            desc: t(
              '즈엉동(중부)까지 약 40분, 북부(사파리·그랜드월드 방면)까지 약 1~1.5시간. 짐이 있으면 전용 차량이 편해요.',
              'About 40 min to Duong Dong, 1–1.5 h to the north. A private car is easiest with luggage.',
            ),
          }),
        )
      } else {
        items.push(
          productItem(ctx, 'airport_dropoff', depLabel, 'south', {
            desc: t('국제선은 출발 2~3시간 전 공항 도착을 권장해요. 남부에서 약 25~30분.', 'Be at the airport 2–3 h before international flights. 25–30 min from the south.'),
            flags: input.departure === 'dawn' ? [t('새벽 비행이면 전날 밤 늦게 숙소를 나서야 해요', 'Dawn flight: leave the hotel late the night before')] : undefined,
          }),
        )
      }
    } else {
      /* ---------- 남부 일반 날 ---------- */
      let prog = queue[progIdx % queue.length]
      progIdx += 1
      if (input.pace === 'easy' && progIdx === 2) prog = 'relaxSouth'
      const res = runProgram(ctx, prog)
      items.push(...res.items)
      theme = res.theme
      blocksAfternoon = res.blocksAfternoon
    }

    /* ---------- 저녁 ---------- */
    if (d < N) {
      const isSym = d === symphonyDay
      const isKiss = d === kissDay
      const romantic = input.companion === 'couple' || input.purposes.includes('photo')

      if (isSym || isKiss) {
        // 두 공연이 다른 날이면 둘째 공연 날 일몰 장소를 바꿔 겹치지 않게
        const secondShowDay = isKiss && !isSym && symphonyDay !== null && symphonyDay < d
        if (has('sunset')) {
          items.push(
            input.companion !== 'kids' && romantic !== secondShowDay
              ? spot(ctx, 'rooftop', '17:30', 'south', 'spot', { alternatives: [spot(ctx, 'sunsetTown', '17:30', 'south')] })
              : spot(ctx, 'sunsetTown', '17:30', 'south', 'spot', { alternatives: [spot(ctx, 'rooftop', '17:30', 'south')] }),
          )
        }
        if (isSym) {
          items.push(spot(ctx, 'dinner', '18:30', 'south', 'meal'))
          const symFlags: L[] = []
          if (!info[d].date) {
            symFlags.push(
              t(
                '날짜 미확정(임시 배치) · 시즌 3 개막일(2026.11.10 예정) 이후 관람 가능',
                'Date not set (tentative) · Available from Season 3 opening (Nov 10, 2026)',
              ),
            )
          } else {
            symFlags.push(
              t(
                '공연 약 30분 소요 (19:30~20:00) · 해변 관람 구역 15분 전 도착 권장',
                'Approx. 30 min show (19:30–20:00) · Arrive 15 min early at beachfront viewing zone',
              ),
            )
          }
          items.push(
            item(ctx, 'symphony', '19:30', 'must', SPOT.symphony.title, 'south', {
              desc: SPOT.symphony.desc,
              productId: 'symphony_ticket',
              flags: symFlags,
            }),
          )
        }
        if (isKiss) {
          if (!isSym) {
            items.push(spot(ctx, 'dinner', '19:00', 'south', 'meal', { desc: t('공연장에는 20시 30분쯤 도착하면 여유로워요.', 'Aim to reach the venue by about 20:30.') }))
          }
          const kissFlags: L[] = []
          const kd = info[d].date
          if (!kd) {
            kissFlags.push(
              t(
                '날짜 미확정(임시 배치) · 매주 화요일 정기 휴무이므로 날짜 선택 시 화요일을 피해 배치해요',
                'Date not set (tentative) · Closed every Tuesday; select dates to auto-avoid Tuesdays',
              ),
            )
          }
          kissFlags.push(t('공연 약 30분 소요 (21:00~21:30, 21:25 불꽃놀이) · 30분 전 입장 권장', 'Approx. 30 min show (21:00–21:30, 21:25 fireworks) · Arrive 30 min early'))
          if (input.companion === 'parents') kissFlags.push(t('앞줄은 소리·조명이 강해요 — 중간~뒤쪽 좌석 추천', 'Front rows are loud and bright — sit middle to back'))
          if (input.companion === 'kids') kissFlags.push(t('21시 시작이라 아이가 피곤하면 바깥에서 불꽃만 봐도 좋아요', '21:00 start — with tired kids, just watch the fireworks outside'))
          items.push(item(ctx, 'kiss', '21:00', 'must', SPOT.kiss.title, 'south', { desc: SPOT.kiss.desc, productId: 'kiss_ticket', flags: kissFlags }))
          items.push(
            productItem(ctx, 'show_return', '21:45', 'south', {
              desc: t(
                '공연이 끝나면 수천 명이 한꺼번에 나와 택시·그랩이 잘 안 잡혀요. 숙소가 걸어갈 거리가 아니면 미리 잡아 두세요.',
                'Thousands leave at once and taxis/Grab are scarce. Pre-book unless your hotel is within walking distance.',
              ),
            }),
          )
        } else if (has('night')) {
          items.push(spot(ctx, 'bazaar', '20:15', 'south'))
        }
      } else if (has('evening') || has('sunset')) {
        const cruiseOk = !blocksAfternoon && has('afternoon')
        const fishing = productItem(ctx, 'squid_fishing', '17:00', 'south')
        const cruise = productItem(ctx, 'cruise_dinner', '15:00', 'south', {
          desc: t('오후에 출발해 바다 위에서 일몰과 저녁을 즐겨요.', 'Leave in the afternoon for sunset and dinner at sea.'),
        })
        const pub = spot(ctx, 'khemPub', '19:30', 'south')
        const rooftopDinner = spot(ctx, 'rooftop', '17:30', 'south', 'spot', { title: t('루프탑 일몰 & 디너', 'Rooftop sunset & dinner') })
        const bazaar = spot(ctx, 'bazaar', '19:30', 'south')
        const c = input.companion
        const pick: PlanItem[] = []
        // 크루즈는 오후에 출발하므로 메인으로 고를 때만 넣고, 그날 오후 일정은 비움
        if (c === 'friends' || input.purposes.includes('activity')) pick.push(fishing, pub)
        else if (c === 'couple') pick.push(...(cruiseOk ? [cruise] : []), rooftopDinner, fishing)
        else if (c === 'parents') pick.push(...(cruiseOk ? [{ ...cruise, defaultTier: 'private' as Tier }] : []), rooftopDinner, bazaar)
        else pick.push(bazaar, fishing)
        if (has('evening') && pick[0]?.productId === 'cruise_dinner') {
          const toHour = (time: string) => {
            const [h, m] = time.split(':').map(Number)
            return Number.isFinite(h) ? h + (m || 0) / 60 : -1
          }
          for (let i = items.length - 1; i >= 0; i--) {
            const h = toHour(items[i].time)
            if (h >= 14 && items[i].kind !== 'meal' && !items[i].key.includes('checkin')) items.splice(i, 1)
          }
        }
        if (!has('evening')) {
          items.push(spot(ctx, 'sunsetTown', '17:30', 'south'))
        } else {
          const [main, ...alts] = pick
          if (has('sunset') && (main.key.includes('bazaar') || main.key.includes('khemPub'))) {
            items.push(spot(ctx, 'sunsetTown', '17:30', 'south'))
          }
          // 석양 버기(16:30)와 17시 출발 오징어 낚시가 겹치면 버기를 오전 10시로 옮김
          if (main.productId === 'squid_fishing') {
            const bi = items.findIndex((i) => i.productId === 'buggy_tour' && i.time === '16:30')
            if (bi >= 0) items[bi] = buggy(ctx, { time: '10:30' }, true)
          }
          items.push({ ...main, alternatives: alts.length ? alts : undefined })
        }
      }

      /* 알찬 일정: 밤 시간에 마사지 추가 (키스 공연 날·늦은 도착일 제외) */
      const lateArrivalDay = d === 0 && (input.arrival === 'evening' || input.arrival === 'late')
      if (input.pace === 'full' && has('night') && !isKiss && !lateArrivalDay && !items.some((i) => i.productId === 'massage')) {
        items.push(productItem(ctx, 'massage', '21:30', 'south'))
      }
    }

    // 시간순 정렬 (특수 시간 표기는 맨 앞/뒤)
    const order = (time: string) => {
      if (time.startsWith('arr-')) return -1
      if (time.startsWith('dep-')) return 99
      if (time === '—') return d === 0 ? 0 : 98
      const [h, m] = time.split(':').map(Number)
      return Number.isFinite(h) ? h + (m || 0) / 60 : 50
    }
    items.sort((a, b) => order(a.time) - order(b.time))
    // 동일 시간대 중복 활동 방지 (HH:MM 충돌 시 +30분 순차 조정)
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1].time
      const curr = items[i].time
      if (/^\d{2}:\d{2}$/.test(prev) && prev === curr) {
        const [h, m] = curr.split(':').map(Number)
        const totalMin = h * 60 + m + 30
        const nh = String(Math.floor(totalMin / 60) % 24).padStart(2, '0')
        const nm = String(totalMin % 60).padStart(2, '0')
        items[i] = { ...items[i], time: `${nh}:${nm}` }
      }
    }
    days.push({ index: d, date: info[d].date, sleepRegion: d < N ? 'south' : null, theme, items })
  }

  /* 4) 마사지가 이틀 연속 메인으로 잡히면 둘째 날은 다른 선택지로 바꿈 */
  const hasMainMassage = (day: PlanDay) => day.items.some((i) => i.productId === 'massage')
  for (let i = 1; i < days.length; i++) {
    if (!hasMainMassage(days[i - 1])) continue
    days[i].items = days[i].items.map((it) => {
      if (it.productId !== 'massage' || !it.alternatives?.length) return it
      const [first, ...rest] = it.alternatives
      return { ...first, alternatives: [{ ...it, alternatives: undefined }, ...rest] }
    })
  }
  const productKeys = new Set<string>()
  for (const day of days) for (const it of day.items) if (it.productId) productKeys.add(it.productId)

  /* 5) 안내 */
  if (fromOther) notes.unshift(t('다른 지역 일정을 마치고 남부로 와서, 공연과 바다로 여행을 마무리하는 일정이에요.', 'You finish your trip in the south with the shows and the sea.'))
  else if (toOther) notes.unshift(t('남부에서 공연과 바다를 먼저 즐기고 다른 지역으로 넘어가는 일정이에요.', 'You start in the south, then move on to another area.'))
  else notes.unshift(t('남부(선셋타운·켐비치·안토이)에만 머무는 일정이에요.', 'You stay in the south (Sunset Town · Khem Beach · An Thoi) throughout.'))
  if (rainyAny) {
    notes.push(t('여행 기간이 우기(대략 5~11월)에 걸쳐 있어요. 바다 상품은 날씨에 따라 바뀔 수 있어요.', 'Your dates overlap the rainy season (roughly May–Nov); sea trips may change.'))
  }
  if (input.companion === 'kids' && input.children > 0) {
    notes.push(t('아이와 함께라 휴식 시간을 넉넉히 두고, 늦은 공연은 상황에 맞게 고르도록 했어요.', 'With kids: more rest time, and late shows are optional on the day.'))
  }
  notes.push(
    t(
      '선셋타운 안 이동: 16~18시 피크 타임엔 인파가 많아 걸어서 다니는 게 가장 편해요. 지나다니는 버기는 아무거나 잡아 타면 되고 공식 요금은 1인 10,000₫이지만, 피크 땐 빈 버기가 거의 없어요.',
      'Getting around Sunset Town: 16:00–18:00 is peak, so walking is easiest. Any passing buggy can be flagged (official fare 10,000₫ per person), but empty ones are rare at peak.',
    ),
  )
  notes.push(t('공연 시간·운영 시간·가격은 바뀔 수 있어요. 예약 전에 저희가 다시 확인해 드려요.', 'Show times, hours and prices can change — we re-check before booking.'))

  return {
    days,
    stays: [{ region: 'south', nights: N }],
    notes,
    advice: input.stayPlan === 'south_only' ? [] : OTHER_REGION_ADVICE,
    productKeys: Array.from(productKeys),
  }
}
