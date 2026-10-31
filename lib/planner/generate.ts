/**
 * 여행 일정 자동 생성 로직
 *
 * 원칙
 *  1. 숙박은 최대 2곳(남부 + 중부). 2박 이하는 이동을 줄이려고 남부만.
 *  2. 필수 공연 2개(심포니 19:30 / 키스 21:00)는 남부에서 묵는 저녁에만 배치.
 *     - 남부 저녁이 하루뿐이면 같은 날 연달아 관람(19:30 → 21:00).
 *     - 여행 날짜를 알면 키스 오브 더 씨를 화요일에 두지 않도록 피함(휴무 여부 미확인).
 *  3. 도착·출국 시간대에 맞춰 첫날/마지막 날 쓸 수 있는 시간만 채움.
 *  4. 시간 충돌 금지: 호핑(오전~15시) ↔ 크루즈 디너(오후 출발),
 *     오징어 낚시(17~21시) ↔ 공연 저녁.
 *  5. 동행·여행 목적·여행 속도에 따라 프로그램 순서와 기본 등급이 달라짐.
 */

import { PRODUCTS, SPOT } from './catalog'
import type {
  Companion,
  L,
  Plan,
  PlanDay,
  PlanItem,
  PlannerInput,
  Region,
  StaySegment,
  Tier,
  TimeBand,
} from './types'

type Slot = 'morning' | 'lunch' | 'afternoon' | 'sunset' | 'evening' | 'night'
const SLOTS: Slot[] = ['morning', 'lunch', 'afternoon', 'sunset', 'evening', 'night']

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
/* 숙박 지역 배분                                                        */
/* ------------------------------------------------------------------ */

function resolveStays(input: PlannerInput, notes: L[]): Region[] {
  const n = Math.min(6, Math.max(2, Math.round(input.nights)))
  let plan = input.stayPlan

  if (plan === 'auto') {
    if (n <= 2) {
      plan = 'south_only'
      notes.push(t('짧은 일정이라 이동 없이 남부에만 묵도록 짰어요.', 'Short trip — staying in the south only to avoid moving.'))
    } else {
      plan = 'south_first'
      notes.push(
        t(
          '남부에서 먼저 묵으며 공연·바다 일정을 소화하고, 공항이 가까운 중부에서 마무리하도록 짰어요.',
          'South first for the shows and sea, then finish in the centre close to the airport.',
        ),
      )
    }
  } else if (plan !== 'south_only' && n <= 2) {
    plan = 'south_only'
    notes.push(t('2박 이하는 숙소를 옮기면 반나절이 사라져서 남부에만 묵도록 바꿨어요.', 'With 2 nights or less, moving hotels wastes half a day — south only.'))
  }

  const southNights = plan === 'south_only' ? n : Math.ceil(n / 2)
  const centralNights = n - southNights
  const south: Region[] = Array(southNights).fill('south')
  const central: Region[] = Array(centralNights).fill('central')
  return plan === 'central_first' ? [...central, ...south] : [...south, ...central]
}

function summarizeStays(nights: Region[]): StaySegment[] {
  const out: StaySegment[] = []
  for (const r of nights) {
    const last = out[out.length - 1]
    if (last && last.region === r) last.nights += 1
    else out.push({ region: r, nights: 1 })
  }
  return out
}

/* ------------------------------------------------------------------ */
/* 아이템 빌더                                                           */
/* ------------------------------------------------------------------ */

interface Ctx {
  input: PlannerInput
  rainy: boolean
  dayIndex: number
}

function item(
  ctx: Ctx,
  id: string,
  time: string,
  kind: PlanItem['kind'],
  title: L,
  region: Region,
  extra: Partial<PlanItem> = {},
): PlanItem {
  return { key: `d${ctx.dayIndex}-${id}-${time}`, time, kind, title, region, ...extra }
}

function productItem(ctx: Ctx, productId: string, time: string, region: Region, extra: Partial<PlanItem> = {}): PlanItem {
  const p = PRODUCTS[productId]
  const flags: L[] = [...(extra.flags ?? [])]
  const seaProduct = ['hopping', 'squid_fishing', 'cruise_dinner', 'ocean_activity'].includes(productId)
  if (seaProduct && ctx.rainy) {
    flags.push(t('우기 기간: 날씨·파도에 따라 일정 변경 가능', 'Rainy season: may change with weather'))
  }
  if (productId === 'scooter') {
    flags.push(t('유효한 운전면허(국제운전면허 등) 필요', 'Valid licence required'))
  }
  return {
    key: `d${ctx.dayIndex}-${productId}-${time}`,
    time,
    kind: p.kind === 'service' && p.operator === 'direct' && productId.startsWith('airport') ? 'service' : 'option',
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
/* 프로그램 (낮 일정 묶음)                                               */
/* ------------------------------------------------------------------ */

type ProgramId =
  | 'hopping'
  | 'honthom'
  | 'buggyOcean'
  | 'carSouth'
  | 'relaxSouth'
  | 'localCentral'
  | 'northDay'
  | 'relaxCentral'

interface ProgramResult {
  items: PlanItem[]
  /** 이 날 오후가 투어로 막혀 크루즈 디너를 넣을 수 없음 */
  blocksAfternoon: boolean
  theme: L
}

function southProgramOrder(input: PlannerInput): ProgramId[] {
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

function centralProgramOrder(input: PlannerInput): ProgramId[] {
  const order: ProgramId[] = input.northTrip ? ['northDay', 'localCentral', 'relaxCentral'] : ['localCentral', 'relaxCentral', 'localCentral']
  if (input.purposes.includes('relax') && !input.northTrip) return ['relaxCentral', 'localCentral', 'relaxCentral']
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
              '안토이 항에서 출발해 남쪽 섬을 돌며 스노클링·해변 휴식·점심까지 (약 6~8시간).',
              'From An Thoi port: snorkelling, beach time and lunch around the southern islands (6–8 h).',
            ),
            alternatives: [
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
              '바다를 건너는 케이블카로 혼똔섬에 가서 워터파크·놀이시설에서 하루를 보내요. 점심은 섬 안에서.',
              'Cross the sea by cable car to Hon Thom for water park and rides. Lunch on the island.',
            ),
            alternatives: [productItem(ctx, 'hopping', '08:30', 'south')],
          }),
          spot(ctx, 'resortRest', '16:00', 'south', 'rest'),
        ],
      }
    case 'buggyOcean': {
      const kidsOrParents = companion === 'kids' || companion === 'parents'
      const afternoon = kidsOrParents
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
          productItem(ctx, 'buggy_tour', '09:30', 'south', {
            alternatives: [spot(ctx, 'cafe', '09:30', 'south', 'spot')],
          }),
          spot(ctx, 'lunch', '12:00', 'south', 'meal'),
          afternoon,
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
              '전용 차량으로 사오 비치 등 남부 명소를 무리 없이 돌아봐요. 걷는 거리가 적어 부모님과 함께하기 좋아요.',
              'Private car around Sao Beach and southern sights with little walking.',
            ),
            alternatives: [productItem(ctx, 'buggy_tour', '09:30', 'south')],
          }),
          spot(ctx, 'lunch', '12:30', 'south', 'meal'),
          productItem(ctx, 'massage', '15:00', 'south', {
            alternatives: [spot(ctx, 'resortRest', '15:00', 'south', 'rest')],
          }),
        ],
      }
    case 'relaxSouth':
      return {
        theme: t('쉬어 가는 날', 'Slow day'),
        blocksAfternoon: false,
        items: [
          spot(ctx, 'cafe', '10:00', 'south', 'spot'),
          spot(ctx, 'resortRest', '13:00', 'south', 'rest'),
          productItem(ctx, 'massage', '15:30', 'south', {
            alternatives: [spot(ctx, 'khem', '15:30', 'south')],
          }),
        ],
      }
    case 'localCentral': {
      const free = companion === 'friends' || companion === 'solo'
      return {
        theme: t('로컬 푸꾸옥', 'Local Phu Quoc'),
        blocksAfternoon: false,
        items: [
          spot(ctx, 'localMarket', '08:00', 'central', 'spot'),
          free
            ? productItem(ctx, 'scooter', '10:00', 'central', {
                desc: t('스쿠터로 해변·카페·후추 농장 등을 자유롭게 다녀요.', 'Ride to beaches, cafes and pepper farms at your pace.'),
                alternatives: [productItem(ctx, 'car_tour', '10:00', 'central')],
              })
            : productItem(ctx, 'car_tour', '10:00', 'central', {
                desc: t('전용 차량으로 중부 명소를 둘러봐요.', 'See the central sights by private car.'),
              }),
          spot(ctx, 'lunch', '12:30', 'central', 'meal'),
          productItem(ctx, 'massage', '15:00', 'central', {
            alternatives: [spot(ctx, 'resortRest', '15:00', 'central', 'rest')],
          }),
        ],
      }
    }
    case 'northDay':
      return {
        theme: t('북부 당일 여행', 'North day trip'),
        blocksAfternoon: true,
        items: [
          spot(ctx, 'northDay', '09:00', 'north', 'spot', {
            desc: t(
              '중부에서 차로 약 30분 이상. 왕복은 전용 차량(차량 투어)이 편해요. 테마파크·사파리 운영시간과 입장권은 미리 확인하세요.',
              '30+ min from the centre; a private car is easiest. Check park hours and tickets beforehand.',
            ),
            productId: 'car_tour',
            defaultTier: undefined,
            flags: [t('운영시간·입장권 확인 필요', 'Check hours & tickets')],
          }),
          spot(ctx, 'resortRest', '17:00', 'central', 'rest', {
            title: t('숙소로 돌아와 휴식', 'Back to the hotel'),
          }),
        ],
      }
    case 'relaxCentral':
      return {
        theme: t('바다 보며 쉬기', 'Beach & rest'),
        blocksAfternoon: false,
        items: [
          spot(ctx, 'resortRest', '10:00', 'central', 'rest'),
          spot(ctx, 'lunch', '12:30', 'central', 'meal'),
          productItem(ctx, 'massage', '15:00', 'central'),
        ],
      }
  }
}

/* ------------------------------------------------------------------ */
/* 메인                                                                  */
/* ------------------------------------------------------------------ */

export function generatePlan(input: PlannerInput): Plan {
  const notes: L[] = []
  const nightRegions = resolveStays(input, notes)
  const N = nightRegions.length
  const start = parseDate(input.startDate)
  const days: PlanDay[] = []

  /* 1) 날짜별 사용 가능 시간대와 지역 */
  type DayInfo = {
    slots: Set<Slot>
    wake: Region | null
    sleep: Region | null
    move: boolean
    date: Date | null
  }
  const info: DayInfo[] = []
  for (let d = 0; d <= N; d++) {
    let slots: Slot[] = SLOTS
    if (d === 0) slots = ARRIVAL_SLOTS[input.arrival]
    if (d === N) slots = DEPARTURE_SLOTS[input.departure]
    const wake = d === 0 ? null : nightRegions[d - 1]
    const sleep = d < N ? nightRegions[d] : null
    info.push({
      slots: new Set(slots),
      wake,
      sleep,
      move: wake !== null && sleep !== null && wake !== sleep,
      date: start ? addDays(start, d) : null,
    })
  }
  const eveningRegion = (d: number): Region => info[d].sleep ?? info[d].wake ?? 'south'

  /* 2) 필수 공연 배치 */
  const southEvenings = info
    .map((x, d) => d)
    .filter((d) => info[d].slots.has('evening') && eveningRegion(d) === 'south')
  const isTuesday = (d: number) => info[d].date?.getDay() === 2

  let symphonyDay: number | null = southEvenings[0] ?? null
  let kissDay: number | null = null
  if (southEvenings.length >= 2) {
    const candidates = southEvenings.filter((d) => d !== symphonyDay)
    kissDay = candidates.find((d) => !isTuesday(d)) ?? candidates[0]
    // 첫 남부 저녁이 화요일 아닌 유일 후보라면 서로 바꿔 화요일 키스를 피함
    if (kissDay !== null && isTuesday(kissDay) && symphonyDay !== null && !isTuesday(symphonyDay)) {
      ;[symphonyDay, kissDay] = [kissDay, symphonyDay]
    }
  } else if (southEvenings.length === 1) {
    kissDay = symphonyDay
  }
  if (symphonyDay === null) {
    notes.push(
      t(
        '도착·출국 시간 때문에 남부에서 저녁 공연을 볼 수 있는 날이 없어요. 남부 숙박을 늘리거나 시간대를 바꿔 보세요.',
        'No evening in the south is free for the shows — add a south night or change times.',
      ),
    )
  } else if (symphonyDay === kissDay) {
    notes.push(t('남부 저녁이 하루뿐이라 두 공연을 같은 날 연달아 보도록 넣었어요 (19:30 → 21:00).', 'Only one evening in the south — both shows back to back (19:30 → 21:00).'))
  }
  if (kissDay !== null && isTuesday(kissDay)) {
    notes.push(t('키스 오브 더 씨가 화요일에 잡혔어요. 화요일 휴무 여부는 확인이 필요해요.', 'Kiss of the Sea falls on a Tuesday — Tuesday closure needs checking.'))
  }

  /* 3) 낮 프로그램 큐 */
  const southQueue = southProgramOrder(input)
  const centralQueue = centralProgramOrder(input)
  let southIdx = 0
  let centralIdx = 0
  let usedNorth = false
  const productKeys = new Set<string>()
  const rainyAny = info.some((x) => isRainySeason(x.date))

  for (let d = 0; d <= N; d++) {
    const ctx: Ctx = { input, rainy: isRainySeason(info[d].date), dayIndex: d }
    const di = info[d]
    const items: PlanItem[] = []
    let theme: L = t('자유 일정', 'Free day')
    let blocksAfternoon = false
    const has = (s: Slot) => di.slots.has(s)

    /* 도착일 */
    if (d === 0) {
      const region = nightRegions[0]
      theme = t('도착', 'Arrival')
      items.push(
        productItem(ctx, 'airport_pickup', `${BAND_LABEL[input.arrival].ko} 도착`, region, {
          time: `arr-${input.arrival}`,
          desc: t(
            `공항 도착 후 ${region === 'south' ? '남부 숙소까지 약 25~30분' : '중부 숙소까지 약 10~20분'}.`,
            `From the airport to your hotel: ${region === 'south' ? 'about 25–30 min (south)' : 'about 10–20 min (central)'}.`,
          ),
        }),
      )
      if (input.arrival === 'dawn' || input.arrival === 'morning') {
        items.push(
          item(ctx, 'checkin', '14:00', 'rest', t('체크인 (보통 14시 이후)', 'Check-in (usually from 14:00)'), region, {
            desc: t(
              '일찍 도착하면 짐을 맡기고 움직여요. 얼리 체크인 가능 여부는 숙소에 미리 물어보세요.',
              'Drop your bags if early. Ask your hotel about early check-in in advance.',
            ),
          }),
        )
        const dawn = input.arrival === 'dawn'
        const hoursFlag = t('운영 시작 시간 확인 필요', 'Check opening hours')
        if (region === 'south') {
          /* 이른 도착: 체크인 전 '호국사 → 쌀국수 → 커피' 동선 (짐은 차량에 싣고 이동) */
          items.push(
            productItem(ctx, 'car_tour', dawn ? '06:30' : '09:00', 'south', {
              title: t('짐 싣고 체크인 전 둘러보기 (차량)', 'Pre-check-in tour with luggage (car)'),
              desc: t(
                '공항에서 바로 짐을 싣고 호국사 → 쌀국수 → 카페 순서로 돌다가 숙소에 내려 드려요. 체크인 전 시간을 알차게 쓸 수 있어요.',
                'Load your bags at the airport, visit the pagoda, have pho and coffee, then we drop you at your hotel.',
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
              alternatives: [spot(ctx, 'sunsetTown', dawn ? '09:30' : '12:00', 'south', 'spot', { title: dawn ? t('선셋타운 아침 산책', 'Morning walk in Sunset Town') : t('선셋타운 산책', 'Walk in Sunset Town') })],
            }),
          )
          const groupSize = input.adults + input.children
          if (groupSize >= 4 && !PRODUCTS.morning_spa.hidden) {
            items.push(productItem(ctx, 'morning_spa', dawn ? '10:30' : '12:00', 'south'))
          }
        } else if (dawn) {
          items.push(spot(ctx, 'localMarket', '07:00', 'central', 'meal', { desc: t('짐을 맡기고 시장에서 쌀국수로 아침을 먹어요.', 'Drop bags and have pho at the market.') }))
          items.push(spot(ctx, 'cafe', '09:00', 'central', 'spot', { title: t('카페에서 쉬어 가기', 'Café break'), desc: t('체크인 전까지 카페에서 쉬어요.', 'Relax at a café until check-in.') }))
        }
        // 오전 도착 + 남부: 쌀국수가 브런치를 겸하므로 점심은 생략
        if (has('lunch') && !(region === 'south' && !dawn)) items.push(spot(ctx, 'lunch', '12:00', region, 'meal'))
        if (has('afternoon')) {
          if (region === 'south' && dawn) {
            items.push(
              spot(ctx, 'resortRest', '15:00', 'south', 'rest', {
                title: t('체크인 후 낮잠·휴식', 'Nap after check-in'),
                desc: t('새벽 비행 후에는 저녁 공연 전에 한숨 자 두는 게 좋아요.', 'After a night flight, rest before the evening show.'),
              }),
            )
          } else if (region === 'south') {
            items.push(
              spot(ctx, 'resortRest', '15:00', 'south', 'rest', {
                title: t('체크인 후 수영장·휴식', 'Pool time after check-in'),
                alternatives: [productItem(ctx, 'buggy_tour', '15:30', 'south')],
              }),
            )
          } else {
            items.push(spot(ctx, 'resortRest', '15:00', 'central', 'rest'))
          }
        }
      } else if (input.arrival === 'afternoon') {
        items.push(item(ctx, 'checkin', '16:00', 'rest', t('체크인 · 짐 풀기', 'Check in & unpack'), region))
      } else {
        items.push(
          item(ctx, 'checkin', '—', 'rest', t('체크인 후 휴식', 'Check in and rest'), region, {
            desc: t('늦게 도착하면 숙소에 도착 시간을 미리 알려 두세요.', 'Tell your hotel your late arrival time.'),
          }),
        )
      }
    } else if (d === N) {
      /* 출국일 */
      theme = t('출국', 'Departure')
      const region = di.wake ?? 'south'
      if (has('morning')) {
        const morning = region === 'south'
          ? input.purposes.includes('shopping')
            ? spot(ctx, 'bazaar', '09:30', 'south', 'spot', { title: t('선셋타운 기념품 쇼핑', 'Souvenir shopping in Sunset Town'), desc: t('마지막 기념품을 챙겨요.', 'Pick up last souvenirs.') })
            : spot(ctx, 'cafe', '09:30', 'south', 'spot')
          : spot(ctx, 'localMarket', '08:30', 'central', 'spot', { title: t('시장에서 특산품 쇼핑', 'Market shopping'), desc: t('후추·느억맘 같은 특산품을 사요.', 'Buy pepper, fish sauce and more.') })
        items.push(morning)
      }
      const earlyFlight = input.departure === 'dawn' || input.departure === 'morning'
      items.push(
        earlyFlight
          ? item(ctx, 'checkout', '—', 'rest', t('비행 시간에 맞춰 체크아웃', 'Check out in time for your flight'), region, {
              desc: t('이른 비행이면 전날 짐을 미리 싸 두고, 조식 가능 여부를 숙소에 확인하세요.', 'Pack the night before and ask about early breakfast.'),
            })
          : item(ctx, 'checkout', '11:00', 'rest', t('체크아웃 · 짐 보관', 'Check-out · store bags'), region, {
              desc: t('늦은 출발이면 짐을 맡겨 두고 움직여요.', 'Store your bags if your flight is later.'),
            }),
      )
      if (has('lunch')) items.push(spot(ctx, 'lunch', '12:00', region, 'meal'))
      if (has('afternoon')) {
        items.push(
          productItem(ctx, 'massage', '14:30', region, {
            desc: t('비행 전에 씻고 마사지로 몸을 풀어 두면 편해요.', 'Freshen up and relax before the flight.'),
            alternatives: [
              region === 'south'
                ? spot(ctx, 'khem', '14:30', 'south')
                : spot(ctx, 'longBeach', '14:30', 'central', 'spot', {
                    title: t('롱비치 해변 산책', 'Long Beach walk'),
                    desc: t('공항 가기 전 바다를 한 번 더 봐요.', 'One last look at the sea before the airport.'),
                  }),
            ],
          }),
        )
      }
      if (has('sunset')) {
        items.push(spot(ctx, region === 'south' ? 'sunsetTown' : 'longBeach', '17:30', region))
      }
      items.push(
        productItem(ctx, 'airport_dropoff', `${BAND_LABEL[input.departure].ko} 출발`, region, {
          time: `dep-${input.departure}`,
          desc: t(
            `국제선은 출발 2~3시간 전 공항 도착을 권장해요. ${region === 'south' ? '남부에서 약 25~30분.' : '중부에서 약 10~20분.'}`,
            `Be at the airport 2–3 h before international flights. ${region === 'south' ? '25–30 min from the south.' : '10–20 min from the centre.'}`,
          ),
          flags:
            input.departure === 'dawn'
              ? [t('새벽 비행이면 전날 밤 늦게 숙소를 나서야 해요', 'Dawn flight: leave the hotel late the night before')]
              : undefined,
        }),
      )
    } else if (di.move) {
      /* 이동일 */
      const from = di.wake!
      const to = di.sleep!
      theme = t(`${from === 'south' ? '남부' : '중부'} → ${to === 'south' ? '남부' : '중부'} 이동`, `Move ${from} → ${to}`)
      items.push(
        from === 'south'
          ? spot(ctx, 'cafe', '09:30', 'south')
          : item(ctx, 'slowMorning', '09:00', 'rest', t('체크아웃 전 여유로운 아침', 'Slow morning before check-out'), 'central', {
              desc: t('조식 먹고 수영장에서 쉬다가 짐을 챙겨요.', 'Breakfast, pool time, then pack.'),
            }),
      )
      items.push(
        item(ctx, 'move', '11:00', 'move', t('체크아웃 후 숙소 이동 (약 40분)', 'Check out and move (about 40 min)'), to, {
          desc: t('전용 차량이면 짐과 함께 편하게 옮길 수 있어요.', 'A private car makes moving with luggage easy.'),
          productId: 'car_tour',
          alternatives: undefined,
        }),
      )
      items.push(spot(ctx, 'lunch', '12:30', to, 'meal'))
      items.push(item(ctx, 'checkin', '14:00', 'rest', t('새 숙소 체크인', 'Check in to the new hotel'), to))
      items.push(
        productItem(ctx, 'massage', '15:30', to, {
          alternatives: [spot(ctx, to === 'south' ? 'khem' : 'resortRest', '15:30', to)],
        }),
      )
    } else {
      /* 일반 날 */
      const region = di.sleep!
      let prog: ProgramId
      if (region === 'south') {
        prog = southQueue[southIdx % southQueue.length]
        southIdx += 1
        // 여유 일정: 두 번째 남부 날부터는 쉬는 날을 섞음
        if (input.pace === 'easy' && southIdx === 2) prog = 'relaxSouth'
      } else {
        prog = centralQueue[centralIdx % centralQueue.length]
        if (prog === 'northDay' && usedNorth) prog = 'localCentral'
        if (prog === 'northDay') usedNorth = true
        centralIdx += 1
        if (input.pace === 'easy' && centralIdx === 2) prog = 'relaxCentral'
      }
      const res = runProgram(ctx, prog)
      items.push(...res.items)
      theme = res.theme
      blocksAfternoon = res.blocksAfternoon
    }

    /* 저녁 (도착일·일반·이동일 공통) */
    if (d < N) {
      const region = eveningRegion(d)
      const isSym = d === symphonyDay
      const isKiss = d === kissDay
      const romantic = input.companion === 'couple' || input.purposes.includes('photo')

      if (isSym || isKiss) {
        // 두 공연이 다른 날이면 둘째 공연 날 일몰 장소는 바꿔서 겹치지 않게
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
          items.push(
            item(ctx, 'symphony', '19:30', 'must', SPOT.symphony.title, 'south', {
              desc: SPOT.symphony.desc,
              productId: 'symphony_ticket',
            }),
          )
          productKeys.add('symphony_ticket')
        }
        if (isKiss) {
          if (!isSym) items.push(spot(ctx, 'dinner', '19:00', 'south', 'meal', { desc: t('공연장에는 20시 15분쯤 도착하면 여유로워요.', 'Aim to reach the venue by about 20:15.') }))
          const kissFlags: L[] = []
          const kd = info[d].date
          if (!kd) {
            kissFlags.push(t('화요일 휴무 여부 확인 필요 · 여행 날짜를 넣으면 화요일을 피해 배치해요', 'Tuesday closure unconfirmed · add dates to avoid Tuesdays'))
          } else if (kd.getDay() === 2) {
            kissFlags.push(t('화요일 공연 — 휴무 여부를 꼭 확인하세요', 'Tuesday show — confirm it runs'))
          }
          if (input.companion === 'kids') kissFlags.push(t('21시 시작이라 아이가 피곤하면 바깥에서 불꽃만 봐도 좋아요', '21:00 start — with tired kids, just watch the fireworks outside'))
          items.push(
            item(ctx, 'kiss', '21:00', 'must', SPOT.kiss.title, 'south', {
              desc: SPOT.kiss.desc,
              productId: 'kiss_ticket',
              flags: kissFlags.length ? kissFlags : undefined,
            }),
          )
        } else if (has('night')) {
          items.push(spot(ctx, 'bazaar', '20:15', 'south'))
        }
      } else if (has('evening') || has('sunset')) {
        if (region === 'south') {
          const pick: PlanItem[] = []
          const cruiseOk = !blocksAfternoon && has('afternoon')
          const fishing = productItem(ctx, 'squid_fishing', '17:00', 'south')
          const cruise = productItem(ctx, 'cruise_dinner', '15:00', 'south', {
            desc: t('오후에 출발해 바다 위에서 일몰과 저녁을 즐겨요.', 'Leave in the afternoon for sunset and dinner at sea.'),
          })
          const pub = spot(ctx, 'khemPub', '19:30', 'south')
          const rooftopDinner = spot(ctx, 'rooftop', '17:30', 'south', 'spot', { title: t('루프탑 일몰 & 디너', 'Rooftop sunset & dinner') })
          const bazaar = spot(ctx, 'bazaar', '19:30', 'south')
          const c = input.companion
          if (c === 'friends' || input.purposes.includes('activity')) pick.push(fishing, pub, ...(cruiseOk ? [cruise] : []))
          else if (c === 'couple') pick.push(...(cruiseOk ? [cruise] : []), rooftopDinner, fishing)
          else if (c === 'parents') pick.push(...(cruiseOk ? [{ ...cruise, defaultTier: 'private' as Tier }] : []), rooftopDinner, bazaar)
          else pick.push(bazaar, fishing)
          if (!has('evening')) {
            // 저녁 공연·투어가 불가한 시간대 → 일몰만
            items.push(spot(ctx, 'sunsetTown', '17:30', 'south'))
          } else {
            const [main, ...alts] = pick
            // 저녁 메인이 야시장·비치펍이면 그 전에 일몰 산책을 넣음
            if (has('sunset') && (main.key.includes('bazaar') || main.key.includes('khemPub'))) {
              items.push(spot(ctx, 'sunsetTown', '17:30', 'south'))
            }
            items.push({ ...main, alternatives: alts.length ? alts : undefined })
          }
        } else {
          if (has('sunset')) items.push(spot(ctx, 'longBeach', '17:30', 'central'))
          if (has('evening')) {
            items.push(
              spot(ctx, 'nightMarket', '19:00', 'central', 'spot', {
                alternatives: [productItem(ctx, 'massage', '19:30', 'central')],
              }),
            )
          }
        }
      }

      /* 알찬 일정: 밤 시간에 마사지 추가 (키스 공연 날 제외) */
      const lateArrivalDay = d === 0 && (input.arrival === 'evening' || input.arrival === 'late')
      if (input.pace === 'full' && has('night') && !isKiss && !lateArrivalDay && !items.some((i) => i.productId === 'massage')) {
        items.push(productItem(ctx, 'massage', '21:30', region))
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

    for (const it of items) {
      if (it.productId) productKeys.add(it.productId)
    }

    days.push({ index: d, date: di.date, sleepRegion: di.sleep, theme, items })
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
  productKeys.clear()
  for (const day of days) for (const it of day.items) if (it.productId) productKeys.add(it.productId)

  /* 5) 공통 안내 */
  if (input.stayPlan !== 'south_only' && N > 2) {
    notes.push(t('남부(안토이) ↔ 중부(즈엉동)는 차로 약 40분이에요.', 'South (An Thoi) ↔ Centre (Duong Dong) is about 40 min by car.'))
  }
  if (rainyAny) {
    notes.push(t('여행 기간이 우기(대략 5~11월)에 걸쳐 있어요. 바다 상품은 날씨에 따라 바뀔 수 있어요.', 'Your dates overlap the rainy season (roughly May–Nov); sea trips may change.'))
  }
  if (input.companion === 'kids' && input.children > 0) {
    notes.push(t('아이와 함께라 낮잠·휴식 시간을 넉넉히 두고, 늦은 공연은 상황에 맞게 고르도록 했어요.', 'With kids: more rest time, and late shows are optional on the day.'))
  }
  notes.push(t('공연 시간·운영 시간·가격은 바뀔 수 있어요. 예약 전에 저희가 다시 확인해 드려요.', 'Show times, hours and prices can change — we re-check before booking.'))

  return {
    days,
    stays: summarizeStays(nightRegions),
    notes,
    productKeys: Array.from(productKeys),
  }
}
