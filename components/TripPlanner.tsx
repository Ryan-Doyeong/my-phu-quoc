'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CONTACT_CONFIG } from '@/lib/contactConfig'
import { buildWhatsAppLink, buildZaloLink } from '@/lib/contactLinks'
import { localePath, type Locale } from '@/lib/i18n/config'
import { PRODUCTS, REGION_LABEL, TIER_DESC, TIER_LABEL } from '@/lib/planner/catalog'
import { BAND_LABEL, BAND_RANGE, generatePlan } from '@/lib/planner/generate'
import type {
  Companion,
  ItemKind,
  L,
  Pace,
  PlanItem,
  PlannerInput,
  Purpose,
  StayPlan,
  Tier,
  TimeBand,
} from '@/lib/planner/types'

type Lang = 'ko' | 'en'

const UI = {
  conditions: { ko: '여행 조건', en: 'Your trip' },
  conditionsHint: { ko: '고르는 즉시 일정이 다시 짜여요.', en: 'The plan updates as you choose.' },
  length: { ko: '남부 일정 기간', en: 'Days in the south' },
  lengthHint: { ko: '남부 일정은 최대 3박 4일까지 짜 드려요.', en: 'We plan up to 3 nights in the south.' },
  startDate: { ko: '출발 날짜 (선택)', en: 'Start date (optional)' },
  startDateHint: { ko: '날짜를 넣으면 요일·우기를 반영해요', en: 'Adds weekdays & season checks' },
  people: { ko: '인원', en: 'Travellers' },
  adults: { ko: '성인', en: 'Adults' },
  children: { ko: '아이', en: 'Children' },
  arrival: { ko: '남부 도착 시간대', en: 'Arrival in the south' },
  departure: { ko: '남부에서 떠나는 시간대', en: 'Leaving the south' },
  bandHint: { ko: '공항 또는 다른 지역에서 오가는 시간 기준', en: 'From/to the airport or another area' },
  stay: { ko: '여행 형태', en: 'Trip shape' },
  stayHint: { ko: '중부·북부는 일정 대신 이동 시간 등 조언으로 안내해요.', en: 'For the centre and north we give advice, not a schedule.' },
  adviceTitle: { ko: '중부·북부도 가신다면', en: 'If you also visit the centre or north' },
  otherArea: { ko: '다른 지역', en: 'Other area' },
  companion: { ko: '누구와 가세요?', en: 'Travelling with' },
  purpose: { ko: '여행 목적 (여러 개 선택)', en: 'Trip focus (pick any)' },
  pace: { ko: '여행 속도', en: 'Pace' },
  nightsDays: { ko: (n: number) => `남부 ${n}박 ${n + 1}일`, en: (n: number) => `${n}N ${n + 1}D in the south` },
  sampleBadge: { ko: '샘플 일정', en: 'Sample plan' },
  myBadge: { ko: '내 맞춤 일정', en: 'Your plan' },
  howBuilt: { ko: '이렇게 짰어요', en: 'How we planned it' },
  addAll: { ko: '추천 상품 한 번에 담기', en: 'Add all suggestions' },
  sleep: { ko: '숙박', en: 'stay' },
  noSleep: { ko: '귀국', en: 'Home' },
  swap: { ko: '다른 선택', en: 'Swap' },
  add: { ko: '문의 담기', en: 'Add to inquiry' },
  added: { ko: '담김', en: 'Added' },
  priceAsk: { ko: '가격 문의', en: 'Price on request' },
  detail: { ko: '자세히', en: 'Details' },
  direct: { ko: '마이 푸꾸옥 직접 운영', en: 'Run by My Phu Quoc' },
  partner: { ko: '제휴 업체 연결', en: 'Partner operator' },
  cartBar: { ko: '문의 목록', en: 'Inquiry list' },
  cartEmpty: { ko: '마음에 드는 상품을 담아 한 번에 문의하세요', en: 'Add items and ask about them all at once' },
  openCart: { ko: '견적·예약 문의하기', en: 'Ask for a quote' },
  sheetTitle: { ko: '견적·예약 문의', en: 'Quote & booking inquiry' },
  sheetLead: {
    ko: '담은 상품과 여행 조건을 정리해 상담 번호로 보내드려요. 가능 여부와 가격을 확인해 답장드리고, 결제는 확정 후 안내해 드려요.',
    en: 'We send your items and trip details to our team. We confirm availability and price, then guide you through payment.',
  },
  request: { ko: '요청 사항 (선택)', en: 'Notes (optional)' },
  requestPh: { ko: '예) 아이 카시트 필요, 호텔 이름, 항공편명 등', en: 'e.g. child seat, hotel name, flight number' },
  name: { ko: '이름 (선택)', en: 'Name (optional)' },
  sendWa: { ko: 'WhatsApp으로 보내기', en: 'Send via WhatsApp' },
  sendZalo: { ko: 'Zalo로 문의 (문구 복사 후 열기)', en: 'Ask on Zalo (copies text)' },
  copy: { ko: '문의 문구 복사', en: 'Copy message' },
  copied: { ko: '복사됐어요. Zalo 대화창에 붙여 넣어 주세요.', en: 'Copied — paste it into Zalo.' },
  copiedPlain: { ko: '복사됐어요.', en: 'Copied.' },
  remove: { ko: '빼기', en: 'Remove' },
  close: { ko: '닫기', en: 'Close' },
  generalAsk: { ko: '상품 없이 일정만 상담하기', en: 'Ask about the plan only' },
  showConditions: { ko: '조건 바꾸기', en: 'Change conditions' },
  hideConditions: { ko: '조건 접기', en: 'Hide conditions' },
  phoneLine: { ko: '상담 번호', en: 'Contact' },
}

const KIND_LABEL: Record<ItemKind, L> = {
  must: { ko: '필수', en: 'Must-see' },
  spot: { ko: '추천', en: 'Spot' },
  option: { ko: '예약 가능', en: 'Bookable' },
  service: { ko: '서비스', en: 'Service' },
  move: { ko: '이동', en: 'Transfer' },
  rest: { ko: '휴식', en: 'Rest' },
  meal: { ko: '식사', en: 'Meal' },
}

const STAY_OPTIONS: { id: StayPlan; label: L; desc: L }[] = [
  { id: 'south_only', label: { ko: '남부만 여행', en: 'South only' }, desc: { ko: '공항 ↔ 남부, 선셋타운·켐비치에 계속', en: 'Airport ↔ south, whole stay' } },
  { id: 'south_first', label: { ko: '남부에서 시작 → 다른 지역', en: 'South first → elsewhere' }, desc: { ko: '도착해서 남부부터, 끝은 중부·북부', en: 'Start south, end elsewhere' } },
  { id: 'other_first', label: { ko: '다른 지역 → 남부에서 마무리', en: 'Elsewhere → finish south' }, desc: { ko: '중부·북부 다음 남부로, 남부에서 귀국', en: 'Finish your trip in the south' } },
]

const COMPANIONS: { id: Companion; icon: string; label: L }[] = [
  { id: 'kids', icon: '👨‍👩‍👧', label: { ko: '아이 동반 가족', en: 'Family with kids' } },
  { id: 'parents', icon: '👵', label: { ko: '부모님과 (효도 여행)', en: 'With parents' } },
  { id: 'couple', icon: '💑', label: { ko: '커플·부부', en: 'Couple' } },
  { id: 'friends', icon: '🙌', label: { ko: '친구끼리', en: 'Friends' } },
  { id: 'solo', icon: '🎒', label: { ko: '혼자', en: 'Solo' } },
]

const PURPOSES: { id: Purpose; label: L }[] = [
  { id: 'relax', label: { ko: '푹 쉬기', en: 'Relax' } },
  { id: 'activity', label: { ko: '바다 액티비티', en: 'Sea activities' } },
  { id: 'food', label: { ko: '먹거리·로컬', en: 'Food & local' } },
  { id: 'photo', label: { ko: '사진·인생샷', en: 'Photos' } },
  { id: 'shopping', label: { ko: '쇼핑', en: 'Shopping' } },
]

const PACES: { id: Pace; label: L; desc: L }[] = [
  { id: 'easy', label: { ko: '여유롭게', en: 'Easy' }, desc: { ko: '쉬는 시간 많이', en: 'Plenty of rest' } },
  { id: 'normal', label: { ko: '적당히', en: 'Balanced' }, desc: { ko: '하루 1~2개 일정', en: '1–2 plans a day' } },
  { id: 'full', label: { ko: '알차게', en: 'Packed' }, desc: { ko: '밤까지 꽉 채워', en: 'Into the night' } },
]

const BANDS: TimeBand[] = ['dawn', 'morning', 'afternoon', 'evening', 'late']
const NIGHTS = [1, 2, 3]

const DEFAULT_INPUT: PlannerInput = {
  nights: 3,
  startDate: '',
  arrival: 'afternoon',
  departure: 'afternoon',
  stayPlan: 'south_only',
  companion: 'couple',
  purposes: ['photo'],
  pace: 'normal',
  adults: 2,
  children: 0,
}

const WEEKDAYS: Record<Lang, string[]> = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

interface CartEntry {
  key: string
  day: number
  productId: string
  tier?: Tier
}

function priceText(productId: string, tier: Tier | undefined, lang: Lang): string {
  const p = PRODUCTS[productId]
  if (!p) return UI.priceAsk[lang]
  const value = tier ? p.price[tier] : p.price.base
  return value ?? UI.priceAsk[lang]
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

export function TripPlanner({ locale = 'ko' }: { locale?: Locale }) {
  const lang: Lang = locale === 'ko' ? 'ko' : 'en'
  const tx = (l: L) => l[lang]

  const [input, setInput] = useState<PlannerInput>(DEFAULT_INPUT)
  const [touched, setTouched] = useState(false)
  const [swaps, setSwaps] = useState<Record<string, number>>({})
  const [cart, setCart] = useState<CartEntry[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [note, setNote] = useState('')
  const [name, setName] = useState('')
  const [toast, setToast] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const plan = useMemo(() => generatePlan(input), [input])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [sheetOpen])

  const update = (patch: Partial<PlannerInput>) => {
    setTouched(true)
    setSwaps({}) // 조건이 바뀌면 바꿔 놓은 선택지는 초기화
    setInput((prev) => ({ ...prev, ...patch }))
  }

  const togglePurpose = (p: Purpose) => {
    const has = input.purposes.includes(p)
    update({ purposes: has ? input.purposes.filter((x) => x !== p) : [...input.purposes, p] })
  }

  /** 화면에 실제로 보이는 아이템 (바꾸기 반영) */
  const resolved = (it: PlanItem): PlanItem => {
    const idx = swaps[it.key] ?? 0
    if (!idx || !it.alternatives?.length) return it
    const options = [it, ...it.alternatives]
    return options[idx % options.length]
  }

  const cycle = (it: PlanItem) => {
    const total = (it.alternatives?.length ?? 0) + 1
    setSwaps((s) => ({ ...s, [it.key]: ((s[it.key] ?? 0) + 1) % total }))
  }

  const inCart = (day: number, productId: string) => cart.find((c) => c.day === day && c.productId === productId)

  const toggleCart = (day: number, it: PlanItem) => {
    if (!it.productId) return
    const existing = inCart(day, it.productId)
    if (existing) setCart((c) => c.filter((x) => x !== existing))
    else setCart((c) => [...c, { key: `${day}-${it.productId}`, day, productId: it.productId!, tier: it.defaultTier }])
  }

  const setTier = (day: number, productId: string, tier: Tier) => {
    setCart((c) => {
      const found = c.find((x) => x.day === day && x.productId === productId)
      if (found) return c.map((x) => (x === found ? { ...x, tier } : x))
      return [...c, { key: `${day}-${productId}`, day, productId, tier }]
    })
  }

  const addAll = () => {
    const next: CartEntry[] = [...cart]
    for (const day of plan.days) {
      for (const raw of day.items) {
        const it = resolved(raw)
        if (!it.productId) continue
        if (it.kind === 'must') continue // 공연 티켓은 리조트 무료 여부를 먼저 확인
        if (next.some((c) => c.day === day.index && c.productId === it.productId)) continue
        next.push({ key: `${day.index}-${it.productId}`, day: day.index, productId: it.productId, tier: it.defaultTier })
      }
    }
    setCart(next)
    setToast(lang === 'ko' ? `추천 상품 ${next.length}개를 담았어요` : `${next.length} items added`)
  }

  const dayLabel = (index: number, date: Date | null) => {
    const base = `DAY ${index + 1}`
    if (!date) return base
    return `${base} · ${date.getMonth() + 1}/${date.getDate()} (${WEEKDAYS[lang][date.getDay()]})`
  }

  const timeText = (time: string) => {
    if (time.startsWith('arr-')) return lang === 'ko' ? `${BAND_LABEL[time.slice(4) as TimeBand].ko} 도착` : 'Arrive'
    if (time.startsWith('dep-')) return lang === 'ko' ? `${BAND_LABEL[time.slice(4) as TimeBand].ko} 출발` : 'Depart'
    return time
  }

  const southText = `${tx(REGION_LABEL.south)} ${input.nights}${lang === 'ko' ? '박' : 'N'}`
  const stayText =
    input.stayPlan === 'south_first'
      ? `${southText} → ${UI.otherArea[lang]}`
      : input.stayPlan === 'other_first'
        ? `${UI.otherArea[lang]} → ${southText}`
        : southText

  const companionLabel = COMPANIONS.find((c) => c.id === input.companion)!.label

  const buildMessage = () => {
    const lines: string[] = []
    const ko = lang === 'ko'
    lines.push(ko ? '[마이 푸꾸옥 일정·예약 문의]' : '[My Phu Quoc trip inquiry]')
    if (name.trim()) lines.push(`${ko ? '이름' : 'Name'}: ${name.trim()}`)
    lines.push(`${ko ? '여행 형태' : 'Trip shape'}: ${tx(STAY_OPTIONS.find((o) => o.id === input.stayPlan)!.label)}`)
    lines.push(
      `${ko ? '일정' : 'Trip'}: ${UI.nightsDays[lang](input.nights)}${input.startDate ? ` (${input.startDate} ${ko ? '출발' : 'start'})` : ''} / ${stayText}`,
    )
    lines.push(`${ko ? '인원' : 'Guests'}: ${ko ? '성인' : 'Adults'} ${input.adults}${input.children ? `, ${ko ? '아이' : 'Children'} ${input.children}` : ''}`)
    lines.push(
      `${ko ? '남부 도착' : 'Arrive south'}: ${tx(BAND_LABEL[input.arrival])} (${BAND_RANGE[input.arrival]}) / ${ko ? '남부 출발' : 'Leave south'}: ${tx(BAND_LABEL[input.departure])} (${BAND_RANGE[input.departure]})`,
    )
    lines.push(
      `${ko ? '동행' : 'With'}: ${tx(companionLabel)}${input.purposes.length ? ` / ${ko ? '목적' : 'Focus'}: ${input.purposes.map((p) => tx(PURPOSES.find((x) => x.id === p)!.label)).join(', ')}` : ''}`,
    )
    lines.push('')
    if (cart.length) {
      lines.push(ko ? '■ 문의 상품' : '■ Items')
      const sorted = [...cart].sort((a, b) => a.day - b.day)
      sorted.forEach((c, i) => {
        const p = PRODUCTS[c.productId]
        const tier = c.tier ? ` – ${tx(TIER_LABEL[c.tier])}` : ''
        lines.push(`${i + 1}) DAY ${c.day + 1} ${tx(p.name)}${tier}`)
      })
    } else {
      lines.push(ko ? '■ 일정 상담 요청 (상품 미선택)' : '■ Plan consultation (no items yet)')
    }
    if (note.trim()) {
      lines.push('')
      lines.push(`${ko ? '요청 사항' : 'Notes'}: ${note.trim()}`)
    }
    return lines.join('\n')
  }

  const sendWhatsApp = () => {
    window.open(buildWhatsAppLink(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  const sendZalo = async () => {
    const ok = await copyText(buildMessage())
    setToast(ok ? UI.copied[lang] : UI.copiedPlain[lang])
    window.open(buildZaloLink(), '_blank', 'noopener,noreferrer')
  }

  const copyOnly = async () => {
    const ok = await copyText(buildMessage())
    if (ok) setToast(UI.copiedPlain[lang])
  }

  /* ----------------------------- render ----------------------------- */

  const chip = (active: boolean) => `tpChip${active ? ' isActive' : ''}`

  return (
    <div className="tpRoot">
      <div className="tpLayout">
        {/* ============ 조건 패널 ============ */}
        <aside className={`tpPanel${panelOpen ? ' isOpen' : ''}`} aria-label={UI.conditions[lang]}>
          <div className="tpPanelHead">
            <div>
              <h2 className="tpPanelTitle">{UI.conditions[lang]}</h2>
              <p className="tpPanelHint">{UI.conditionsHint[lang]}</p>
            </div>
            <button type="button" className="tpPanelToggle" onClick={() => setPanelOpen((v) => !v)} aria-expanded={panelOpen}>
              {panelOpen ? UI.hideConditions[lang] : UI.showConditions[lang]}
            </button>
          </div>

          <div className="tpPanelBody">
            <fieldset className="tpField">
              <legend>{UI.length[lang]}</legend>
              <div className="tpChips">
                {NIGHTS.map((n) => (
                  <button key={n} type="button" className={chip(input.nights === n)} aria-pressed={input.nights === n} onClick={() => update({ nights: n })}>
                    {UI.nightsDays[lang](n)}
                  </button>
                ))}
              </div>
              <label className="tpDate">
                <span>{UI.startDate[lang]}</span>
                <input type="date" value={input.startDate} onChange={(e) => update({ startDate: e.target.value })} />
                <small>{UI.startDateHint[lang]}</small>
              </label>
              <p className="tpFieldHint">{UI.lengthHint[lang]}</p>
            </fieldset>

            <fieldset className="tpField">
              <legend>{UI.people[lang]}</legend>
              <div className="tpSteppers">
                {(['adults', 'children'] as const).map((k) => (
                  <div className="tpStepper" key={k}>
                    <span>{UI[k][lang]}</span>
                    <div>
                      <button
                        type="button"
                        aria-label="-"
                        disabled={k === 'adults' ? input.adults <= 1 : input.children <= 0}
                        onClick={() => update({ [k]: input[k] - 1 } as Partial<PlannerInput>)}
                      >
                        −
                      </button>
                      <strong>{input[k]}</strong>
                      <button type="button" aria-label="+" disabled={input[k] >= 12} onClick={() => update({ [k]: input[k] + 1 } as Partial<PlannerInput>)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            {(['arrival', 'departure'] as const).map((k) => (
              <fieldset className="tpField" key={k}>
                <legend>{UI[k][lang]}</legend>
                <p className="tpFieldHint">{UI.bandHint[lang]}</p>
                <div className="tpBands">
                  {BANDS.map((b) => (
                    <button key={b} type="button" className={chip(input[k] === b)} aria-pressed={input[k] === b} onClick={() => update({ [k]: b } as Partial<PlannerInput>)}>
                      <strong>{tx(BAND_LABEL[b])}</strong>
                      <small>{BAND_RANGE[b]}{lang === 'ko' ? '시' : 'h'}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}

            <fieldset className="tpField">
              <legend>{UI.stay[lang]}</legend>
              <div className="tpStayList">
                {STAY_OPTIONS.map((o) => (
                  <button key={o.id} type="button" className={`tpStayOption${input.stayPlan === o.id ? ' isActive' : ''}`} aria-pressed={input.stayPlan === o.id} onClick={() => update({ stayPlan: o.id })}>
                    <strong>{tx(o.label)}</strong>
                    <small>{tx(o.desc)}</small>
                  </button>
                ))}
              </div>
              <p className="tpFieldHint">{UI.stayHint[lang]}</p>
            </fieldset>

            <fieldset className="tpField">
              <legend>{UI.companion[lang]}</legend>
              <div className="tpChips">
                {COMPANIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={chip(input.companion === c.id)}
                    aria-pressed={input.companion === c.id}
                    onClick={() => update({ companion: c.id, children: c.id === 'kids' && input.children === 0 ? 1 : input.children })}
                  >
                    <span aria-hidden="true">{c.icon}</span> {tx(c.label)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="tpField">
              <legend>{UI.purpose[lang]}</legend>
              <div className="tpChips">
                {PURPOSES.map((p) => (
                  <button key={p.id} type="button" className={chip(input.purposes.includes(p.id))} aria-pressed={input.purposes.includes(p.id)} onClick={() => togglePurpose(p.id)}>
                    {tx(p.label)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="tpField">
              <legend>{UI.pace[lang]}</legend>
              <div className="tpPaces">
                {PACES.map((p) => (
                  <button key={p.id} type="button" className={chip(input.pace === p.id)} aria-pressed={input.pace === p.id} onClick={() => update({ pace: p.id })}>
                    <strong>{tx(p.label)}</strong>
                    <small>{tx(p.desc)}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              className="tpPanelDone"
              onClick={() => {
                setPanelOpen(false)
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {lang === 'ko' ? '일정 보기' : 'See plan'}
            </button>
          </div>
        </aside>

        {/* ============ 결과 ============ */}
        <section className="tpResult" ref={resultRef} aria-live="polite">
          <div className="tpSummary">
            <div className="tpSummaryTop">
              <span className={`tpBadge${touched ? ' isMine' : ''}`}>{touched ? UI.myBadge[lang] : UI.sampleBadge[lang]}</span>
              <button type="button" className="tpGhostBtn tpOnlyMobile" onClick={() => setPanelOpen(true)}>
                {UI.showConditions[lang]}
              </button>
            </div>
            <h2 className="tpSummaryTitle">
              {UI.nightsDays[lang](input.nights)} · {tx(companionLabel)}
            </h2>
            <p className="tpSummaryMeta">
              {lang === 'ko' ? '성인' : 'Adults'} {input.adults}
              {input.children ? ` · ${lang === 'ko' ? '아이' : 'Children'} ${input.children}` : ''} · {tx(BAND_LABEL[input.arrival])} {lang === 'ko' ? '도착' : 'arrival'} · {tx(BAND_LABEL[input.departure])}{' '}
              {lang === 'ko' ? '출발' : 'departure'}
            </p>

            <div className="tpStayBar" role="img" aria-label={stayText}>
              {input.stayPlan === 'other_first' && <div className="tpStaySeg other">{UI.otherArea[lang]}</div>}
              <div className="tpStaySeg south" style={{ flexGrow: 3 }}>
                <strong>{tx(REGION_LABEL.south)}</strong>
                <span>
                  {input.nights}
                  {lang === 'ko' ? '박' : 'N'}
                </span>
              </div>
              {input.stayPlan === 'south_first' && <div className="tpStaySeg other">{UI.otherArea[lang]}</div>}
            </div>

            <details className="tpNotes" open>
              <summary>{UI.howBuilt[lang]}</summary>
              <ul>
                {plan.notes.map((n, i) => (
                  <li key={i}>{tx(n)}</li>
                ))}
              </ul>
            </details>

            {plan.advice.length > 0 && (
              <details className="tpNotes tpAdvice" open>
                <summary>{UI.adviceTitle[lang]}</summary>
                <ul>
                  {plan.advice.map((n, i) => (
                    <li key={i}>{tx(n)}</li>
                  ))}
                </ul>
              </details>
            )}

            <div className="tpDayJump">
              {plan.days.map((d) => (
                <a key={d.index} href={`#tp-day-${d.index}`}>
                  DAY {d.index + 1}
                </a>
              ))}
              <button type="button" className="tpAddAll" onClick={addAll}>
                + {UI.addAll[lang]}
              </button>
            </div>
          </div>

          {plan.days.map((day) => (
            <article className="tpDay" id={`tp-day-${day.index}`} key={day.index}>
              <header className="tpDayHead">
                <div>
                  <span className="tpDayLabel">{dayLabel(day.index, day.date)}</span>
                  <h3>{tx(day.theme)}</h3>
                </div>
                {day.sleepRegion ? (
                  <span className={`tpSleep ${day.sleepRegion}`}>
                    {tx(REGION_LABEL[day.sleepRegion])} {UI.sleep[lang]}
                  </span>
                ) : (
                  <span className="tpSleep home">{UI.noSleep[lang]}</span>
                )}
              </header>

              <ol className="tpTimeline">
                {day.items.map((raw) => {
                  const it = resolved(raw)
                  const product = it.productId ? PRODUCTS[it.productId] : undefined
                  const entry = it.productId ? inCart(day.index, it.productId) : undefined
                  const tier = entry?.tier ?? it.defaultTier
                  const altCount = raw.alternatives?.length ?? 0
                  const bookable = !!product && (it.kind === 'option' || it.kind === 'service' || it.kind === 'must' || it.kind === 'move' || it.kind === 'spot')
                  return (
                    <li key={raw.key} className={`tpItem kind-${it.kind}`}>
                      <div className="tpTime">{timeText(it.time)}</div>
                      <div className="tpRail" aria-hidden="true">
                        <span />
                      </div>
                      <div className="tpCard">
                        <div className="tpCardTop">
                          <span className={`tpKind kind-${it.kind}`}>{tx(KIND_LABEL[it.kind])}</span>
                          {it.region !== (day.sleepRegion ?? it.region) && <span className="tpRegionTag">{tx(REGION_LABEL[it.region])}</span>}
                          {altCount > 0 && (
                            <button type="button" className="tpSwap" onClick={() => cycle(raw)}>
                              ↻ {UI.swap[lang]} <em>{((swaps[raw.key] ?? 0) % (altCount + 1)) + 1}/{altCount + 1}</em>
                            </button>
                          )}
                        </div>
                        <h4>{tx(it.title)}</h4>
                        {it.desc && <p className="tpDesc">{tx(it.desc)}</p>}
                        {it.flags?.map((f, i) => (
                          <p className="tpFlag" key={i}>
                            {tx(f)}
                          </p>
                        ))}

                        {product && bookable && (
                          <div className="tpProduct">
                            <div className="tpProductMeta">
                              <span>{product.operator === 'direct' ? UI.direct[lang] : UI.partner[lang]}</span>
                              {product.duration && it.kind !== 'move' && !it.title.ko.includes('체크인 전') && <span>· {tx(product.duration)}</span>}
                            </div>

                            {product.tiers && (
                              <div className="tpTiers" role="radiogroup" aria-label="tier">
                                {product.tiers.map((tr) => (
                                  <button
                                    key={tr}
                                    type="button"
                                    role="radio"
                                    aria-checked={tier === tr}
                                    className={`tpTier${tier === tr ? ' isActive' : ''}`}
                                    title={tx(TIER_DESC[tr])}
                                    onClick={() => setTier(day.index, product.id, tr)}
                                  >
                                    <strong>{tx(TIER_LABEL[tr])}</strong>
                                    <small>{product.tierNotes?.[tr] ? tx(product.tierNotes[tr]!) : tx(TIER_DESC[tr])}</small>
                                  </button>
                                ))}
                              </div>
                            )}

                            {product.caution && <p className="tpCaution">{tx(product.caution)}</p>}

                            <div className="tpProductFoot">
                              <span className="tpPrice">{priceText(product.id, product.tiers ? tier : undefined, lang)}</span>
                              <div className="tpProductActions">
                                {product.link && (
                                  <Link href={localePath(locale, product.link)} className="tpLink">
                                    {UI.detail[lang]}
                                  </Link>
                                )}
                                <button type="button" className={`tpAdd${entry ? ' isAdded' : ''}`} aria-pressed={!!entry} onClick={() => toggleCart(day.index, it)}>
                                  {entry ? `✓ ${UI.added[lang]}` : `+ ${UI.add[lang]}`}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </article>
          ))}

          <div className="tpBottomContact">
            <p>
              {UI.phoneLine[lang]} <a href={`tel:${CONTACT_CONFIG.phoneNumber}`}>{CONTACT_CONFIG.phoneFormatted}</a> · WhatsApp · Zalo
            </p>
            <button type="button" className="tpGhostBtn" onClick={() => setSheetOpen(true)}>
              {UI.generalAsk[lang]}
            </button>
          </div>
        </section>
      </div>

      {/* ============ 하단 문의 바 ============ */}
      <div className="tpCartBar">
        <div className="tpCartInfo">
          <strong>
            {UI.cartBar[lang]} <span>{cart.length}</span>
          </strong>
          <small>{cart.length ? cart.map((c) => tx(PRODUCTS[c.productId].name)).slice(0, 3).join(' · ') + (cart.length > 3 ? ' …' : '') : UI.cartEmpty[lang]}</small>
        </div>
        <button type="button" className="tpCartBtn" onClick={() => setSheetOpen(true)}>
          {UI.openCart[lang]}
        </button>
      </div>

      {/* ============ 문의 시트 ============ */}
      {sheetOpen && (
        <div className="tpSheetWrap" role="dialog" aria-modal="true" aria-label={UI.sheetTitle[lang]}>
          <button type="button" className="tpSheetBackdrop" aria-label={UI.close[lang]} onClick={() => setSheetOpen(false)} />
          <div className="tpSheet">
            <div className="tpSheetHead">
              <h3>{UI.sheetTitle[lang]}</h3>
              <button type="button" className="tpClose" onClick={() => setSheetOpen(false)} aria-label={UI.close[lang]}>
                ✕
              </button>
            </div>
            <p className="tpSheetLead">{UI.sheetLead[lang]}</p>

            <div className="tpSheetTrip">
              <strong>
                {UI.nightsDays[lang](input.nights)} · {stayText}
              </strong>
              <span>
                {tx(companionLabel)} · {lang === 'ko' ? '성인' : 'Adults'} {input.adults}
                {input.children ? ` · ${lang === 'ko' ? '아이' : 'Children'} ${input.children}` : ''}
              </span>
            </div>

            {cart.length > 0 ? (
              <ul className="tpSheetList">
                {[...cart]
                  .sort((a, b) => a.day - b.day)
                  .map((c) => {
                    const p = PRODUCTS[c.productId]
                    return (
                      <li key={c.key}>
                        <span className="tpSheetDay">DAY {c.day + 1}</span>
                        <div>
                          <strong>{tx(p.name)}</strong>
                          <small>
                            {c.tier ? `${tx(TIER_LABEL[c.tier])} · ` : ''}
                            {priceText(p.id, p.tiers ? c.tier : undefined, lang)}
                          </small>
                        </div>
                        <button type="button" onClick={() => setCart((x) => x.filter((y) => y !== c))}>
                          {UI.remove[lang]}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            ) : (
              <p className="tpSheetEmpty">{UI.cartEmpty[lang]}</p>
            )}

            <label className="tpInput">
              <span>{UI.name[lang]}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
            </label>
            <label className="tpInput">
              <span>{UI.request[lang]}</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={500} placeholder={UI.requestPh[lang]} />
            </label>

            <div className="tpSheetActions">
              <button type="button" className="tpSend wa" data-cta="whatsapp" data-cta-source="trip-planner" onClick={sendWhatsApp}>
                {UI.sendWa[lang]}
              </button>
              <button type="button" className="tpSend zalo" data-cta="zalo" data-cta-source="trip-planner" onClick={sendZalo}>
                {UI.sendZalo[lang]}
              </button>
              <button type="button" className="tpGhostBtn" onClick={copyOnly}>
                {UI.copy[lang]}
              </button>
            </div>
            <p className="tpSheetFoot">
              {UI.phoneLine[lang]} {CONTACT_CONFIG.phoneFormatted}
            </p>
          </div>
        </div>
      )}

      {toast && (
        <div className="tpToast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}
