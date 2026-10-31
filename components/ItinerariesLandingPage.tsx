'use client'

import React, { useState, useId } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import {
  ITINERARY_CONFIG,
  type OptionTier,
  type ItineraryOptionItem,
  type AdditionalServiceItem,
} from '@/lib/itineraryConfig'

interface ItinerariesLandingPageProps {
  locale?: Locale
}

export function ItinerariesLandingPage({ locale = 'ko' }: ItinerariesLandingPageProps) {
  const dict = getDictionary(locale)
  const isKo = locale === 'ko'

  // Question States (6 Questions)
  const [nights, setNights] = useState<'3박 4일' | '4박 5일' | '5박 이상'>('3박 4일')
  const [partySize, setPartySize] = useState<'1인' | '2인' | '3~4인' | '5인 이상'>('2인')
  const [arrivalTime, setArrivalTime] = useState<'새벽' | '오전' | '오후' | '저녁' | '심야'>('오후')
  const [startZone, setStartZone] = useState<'남부' | '중부' | '북부' | '모르겠음'>('남부')
  const [companion, setCompanion] = useState<'아이 동반 가족' | '부모님' | '커플' | '친구' | '혼자'>('커플')
  const [purpose, setPurpose] = useState<'휴양' | '액티비티' | '먹거리' | '사진' | '쇼핑'>('휴양')
  const [departureTime, setDepartureTime] = useState<'새벽' | '오전' | '오후' | '저녁' | '심야'>('저녁')

  // Sample Itinerary Region Modal / Details Toggle
  const [showRegionTips, setShowRegionTips] = useState(false)

  // 3N4D Schedule Active Day
  const [activeDay, setActiveDay] = useState<number>(1)

  // Selected Option Tiers (Set of tierId)
  const [selectedTiers, setSelectedTiers] = useState<Record<string, { optionTitle: string; tierName: string; code: string }>>({
    'opt-a-regular': { optionTitle: '남부 3섬 호핑 투어', tierName: '다수 탑승 (일반 투어)', code: '옵션 A' },
    'opt-c-regular': { optionTitle: '선셋타운 친환경 버기 투어', tierName: '다수 탑승 (셔틀식)', code: '옵션 C' },
  })

  // Selected Additional Services (Set of serviceId)
  const [selectedServices, setSelectedServices] = useState<Record<string, { title: string; code: string }>>({
    'srv-s1': { title: '입국 공항 픽업', code: 'S1' },
    'srv-s2': { title: '출국 공항 샌딩', code: 'S2' },
  })

  // Companion Places Tab
  const [companionTab, setCompanionTab] = useState<'family_kids' | 'parents' | 'couples' | 'friends' | 'solo'>('couples')

  // Booking Form Fields
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [hotel, setHotel] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestContact, setGuestContact] = useState('')
  const [extraRequests, setExtraRequests] = useState('')

  // Unique accessible IDs for form inputs
  const startDateId = useId()
  const endDateId = useId()
  const adultsId = useId()
  const childrenId = useId()
  const hotelId = useId()
  const guestNameId = useId()
  const guestContactId = useId()
  const extraRequestsId = useId()

  // Sync companion question with places tab
  const handleCompanionChange = (val: '아이 동반 가족' | '부모님' | '커플' | '친구' | '혼자') => {
    setCompanion(val)
    if (val === '아이 동반 가족') setCompanionTab('family_kids')
    else if (val === '부모님') setCompanionTab('parents')
    else if (val === '커플') setCompanionTab('couples')
    else if (val === '친구') setCompanionTab('friends')
    else if (val === '혼자') setCompanionTab('solo')
  }

  // Toggle Option Tier
  const handleToggleTier = (option: ItineraryOptionItem, tier: OptionTier) => {
    setSelectedTiers((prev) => {
      const copy = { ...prev }
      if (copy[tier.id]) {
        delete copy[tier.id]
      } else {
        copy[tier.id] = {
          optionTitle: option.title,
          tierName: tier.name,
          code: `옵션 ${option.code}`,
        }
      }
      return copy
    })
  }

  // Toggle Service
  const handleToggleService = (srv: AdditionalServiceItem) => {
    setSelectedServices((prev) => {
      const copy = { ...prev }
      if (copy[srv.id]) {
        delete copy[srv.id]
      } else {
        copy[srv.id] = {
          title: srv.title,
          code: srv.code,
        }
      }
      return copy
    })
  }

  // Remove Selected Item Tag
  const handleRemoveTier = (id: string) => {
    setSelectedTiers((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleRemoveService = (id: string) => {
    setSelectedServices((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  // Generate Pre-filled Message for WhatsApp & Zalo
  const buildInquiryMessage = () => {
    const tierList = Object.values(selectedTiers)
      .map((t) => `- [${t.code}] ${t.optionTitle} (${t.tierName})`)
      .join('\n')

    const serviceList = Object.values(selectedServices)
      .map((s) => `- [${s.code}] ${s.title}`)
      .join('\n')

    return `[마이 푸꾸옥 맞춤 일정 & 투어 예약 문의]
- 여행 기간: ${startDate || '미정'} ~ ${endDate || '미정'} (${nights})
- 인원: 성인 ${adults}명, 아동 ${children}명 (${partySize})
- 동행 및 목적: ${companion} / ${purpose}
- 항공/시간: 도착 ${arrivalTime} / 출국 ${departureTime}
- 숙소: ${hotel || '미정/문의'}
- 예약자명: ${guestName || '미입력'}
- 연락처: ${guestContact || '미입력'}

[선택한 투어 옵션]
${tierList || '선택 없음'}

[선택한 차량 및 편의 서비스]
${serviceList || '선택 없음'}

[추가 요청사항]
${extraRequests || '없음'}

위 일정으로 가능 여부 및 견적 확인 부탁드립니다.`
  }

  const whatsappInquiryUrl = `${ITINERARY_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(buildInquiryMessage())}`
  const zaloInquiryUrl = ITINERARY_CONFIG.contact.zaloUrl

  const scrollToCustomizer = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('plan-customizer')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('plan-booking')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="itinerariesPageRoot">
      {/* 0. Top Header */}
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/zones/sunset-town')}>
              {isKo ? '선셋타운' : 'Sunset Town'}
            </Link>
            <Link href={localePath(locale, '/zones/khem-beach')}>
              {isKo ? '켐비치' : 'Khem Beach'}
            </Link>
            <Link href={localePath(locale, '/activities')}>
              {isKo ? '액티비티' : 'Activities'}
            </Link>
            <Link href={localePath(locale, '/events')}>{dict.nav.events}</Link>
            <Link href={localePath(locale, '/about')}>{dict.nav.about || 'About'}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>

      {/* Main Container */}
      <main className="itinerariesContainer">
        {/* Breadcrumb */}
        <div className="itinerariesBreadcrumb">
          <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
          <span>&gt;</span>
          <span className="current">{isKo ? '추천 테마 일정' : 'Theme Itineraries'}</span>
        </div>

        {/* 1. Hero Title & Intro */}
        <div className="itinerariesHeaderBox">
          <div className="itinerariesEyebrow">CURATED ITINERARIES & SMART BOOKING</div>
          <h1 className="itinerariesTitle">
            {isKo ? '푸꾸옥 남부 맞춤 테마 일정' : 'Southern Phu Quoc Tailored Itineraries'}
          </h1>
          <p className="itinerariesSubtitle">
            {isKo
              ? '여행 기간과 스타일에 맞춰 질문에 답하면 최적의 동선이 완성됩니다. 공항 픽업부터 버기 투어, 호핑, 선셋 디너 크루즈, 해양 액티비티까지 원스톱으로 예약 요청하세요.'
              : 'Answer a few simple questions to create your tailored 3N4D itinerary in Southern Phu Quoc, with seamless booking for airport transfers, buggy tours, hopping, and yacht sunset dinner.'}
          </p>

          <div className="planHeroCtaRow">
            <a href="#plan-customizer" onClick={scrollToCustomizer} className="planMakeBtn">
              <span>내 일정 만들기</span>
              <span>↓</span>
            </a>
            <a href="#plan-booking" onClick={scrollToBooking} className="planHeroSecondaryBtn">
              <span>예약 요청 바로가기</span>
            </a>
          </div>
        </div>

        {/* 2. 6 Interactive Button Questions */}
        <section id="plan-customizer" className="planQuestionSection">
          <div className="itinerariesHeaderRow">
            <h2 className="itinerariesSectionTitle">
              {isKo ? '내 여행 스타일 선택 (6개 질문)' : 'Travel Style Quiz'}
            </h2>
            <span className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
              {isKo ? '버튼을 클릭하면 맞춤 추천 일정과 장소가 자동으로 구성됩니다.' : 'Select options to customize your schedule.'}
            </span>
          </div>

          <div className="planQuestionGrid" style={{ marginTop: '16px' }}>
            {/* Q1: 박수 & 인원 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q1. 일정 및 인원</span>
                <span className="planTierBadge">선택됨: {nights} / {partySize}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '여행 박수와 동행 인원을 선택해 주세요' : 'Nights & Party Size'}</p>
              <div className="planBtnGroup">
                {(['3박 4일', '4박 5일', '5박 이상'] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNights(n)}
                    className={`planChoiceBtn ${nights === n ? 'active' : ''}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="planBtnGroup" style={{ marginTop: '4px' }}>
                {(['1인', '2인', '3~4인', '5인 이상'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPartySize(p)}
                    className={`planChoiceBtn ${partySize === p ? 'active' : ''}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: 도착 시간대 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q2. 도착 시간대</span>
                <span className="planTierBadge">선택됨: {arrivalTime}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '푸꾸옥 공항 도착 시간대는 언제인가요?' : 'Arrival Time'}</p>
              <div className="planBtnGroup">
                {(['새벽', '오전', '오후', '저녁', '심야'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setArrivalTime(t)}
                    className={`planChoiceBtn ${arrivalTime === t ? 'active' : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: 시작 지역 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q3. 여행 시작 지역</span>
                <span className="planTierBadge">선택됨: {startZone}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '어느 지역 숙소에서 먼저 머무르시나요?' : 'Starting Region'}</p>
              <div className="planBtnGroup">
                {(['남부', '중부', '북부', '모르겠음'] as const).map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setStartZone(z)}
                    className={`planChoiceBtn ${startZone === z ? 'active' : ''}`}
                  >
                    {z === '남부' ? '남부 (선셋타운/켐비치)' : z === '중부' ? '중부 (즈엉동)' : z === '북부' ? '북부 (빈펄/그랜드월드)' : '모르겠음 (추천 희망)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4: 동행 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q4. 동행 형태</span>
                <span className="planTierBadge">선택됨: {companion}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '누구와 함께하는 여행인가요?' : 'Companion'}</p>
              <div className="planBtnGroup">
                {(['아이 동반 가족', '부모님', '커플', '친구', '혼자'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCompanionChange(c)}
                    className={`planChoiceBtn ${companion === c ? 'active' : ''}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Q5: 여행 목적 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q5. 여행 주요 테마</span>
                <span className="planTierBadge">선택됨: {purpose}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '가장 기대하는 여행 활동은 무엇인가요?' : 'Primary Theme'}</p>
              <div className="planBtnGroup">
                {(['휴양', '액티비티', '먹거리', '사진', '쇼핑'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPurpose(m)}
                    className={`planChoiceBtn ${purpose === m ? 'active' : ''}`}
                  >
                    {m === '휴양' ? '휴양 & 힐링' : m === '액티비티' ? '해양 액티비티' : m === '먹거리' ? '로컬 먹거리' : m === '사진' ? '사진 & 인생샷' : '쇼핑 & 관광'}
                  </button>
                ))}
              </div>
            </div>

            {/* Q6: 출국 시간대 */}
            <div className="planQuestionCard">
              <div className="planQuestionHeader">
                <span className="planQuestionNumber">Q6. 출국 시간대</span>
                <span className="planTierBadge">선택됨: {departureTime}</span>
              </div>
              <p className="planQuestionTitle">{isKo ? '마지막 날 푸꾸옥을 떠나는 시간대는 언제인가요?' : 'Departure Time'}</p>
              <div className="planBtnGroup">
                {(['새벽', '오전', '오후', '저녁', '심야'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDepartureTime(d)}
                    className={`planChoiceBtn ${departureTime === d ? 'active' : ''}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sample Itinerary Section: 남부 시작형 4박 5일 먼저 표시 + 시작/끝 지역 바꾸기 버튼 */}
        <section id="plan-sample" className="planSampleSection">
          <div className="planSampleHeader">
            <div>
              <span className="planSampleBadge">{ITINERARY_CONFIG.sample5Days.badge}</span>
              <h2 className="planSampleTitle">{ITINERARY_CONFIG.sample5Days.title}</h2>
              <p className="planSampleDesc">{ITINERARY_CONFIG.sample5Days.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowRegionTips(!showRegionTips)}
              className="planSampleToggleBtn"
            >
              {showRegionTips ? '지역 변경 팁 닫기 ▲' : '시작/끝 지역 바꾸기 ▼'}
            </button>
          </div>

          <div className="planSampleRouteList">
            {ITINERARY_CONFIG.sample5Days.routeOverview.map((item, idx) => (
              <div key={idx} className="planSampleRouteItem">
                <span style={{ fontWeight: 700, color: '#0F172A' }}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {showRegionTips && (
            <div className="planSampleRegionBox">
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                💡 시작/끝 지역 구성 가이드 (남부 ↔ 중부/북부)
              </div>
              <div>
                • <b>남부 시작형(추천)</b>: 공항 도착 후 남부 선셋타운·켐비치 리조트에서 바다와 공연을 먼저 여유롭게 감상한 뒤 여행 후반에 즈엉동 야시장 또는 북부 테마파크로 이동하는 동선이 가장 만족도가 높습니다.<br />
                • <b>북부 시작형</b>: 빈원더스/사파리를 먼저 관람하고 남부로 내려와 마지막 날 선셋타운 야시장과 키스 오브 더 씨 쇼를 보며 샌딩 차량으로 공항 출국하는 일정도 가능합니다.<br />
                • <b>지역 간 이동</b>: 아래 [서비스 S3] 프라이빗 이동 차량을 예약하시면 남부↔중부/북부 간 안전하고 편안하게 이동하실 수 있습니다.
              </div>
            </div>
          )}
        </section>

        {/* 4. 3박 4일 일정표 Day 1~4 */}
        <section id="plan-schedule" className="planScheduleSection">
          <div className="itinerariesHeaderRow">
            <div>
              <h2 className="itinerariesSectionTitle">
                {isKo ? '푸꾸옥 남부 3박 4일 핵심 일정표' : '3 Nights 4 Days Schedule'}
              </h2>
              <p className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
                {isKo
                  ? '필수 공연 이벤트와 추천 옵션(A~D), 여행 서비스(S1~S5)가 최적의 시간대로 결합된 맞춤 일정입니다.'
                  : 'Daily timeline featuring must-see events and curated tour options.'}
              </p>
            </div>
          </div>

          {/* Day Navigation Tabs */}
          <div className="planDayNav" style={{ marginTop: '16px' }}>
            {ITINERARY_CONFIG.days.map((d) => (
              <button
                key={d.day}
                type="button"
                onClick={() => setActiveDay(d.day)}
                className={`planDayNavBtn ${activeDay === d.day ? 'active' : ''}`}
              >
                Day {d.day} ({d.day === 1 ? '도착·공연' : d.day === 2 ? '호핑·선셋' : d.day === 3 ? '버기·불꽃놀이' : '쇼핑·귀국'})
              </button>
            ))}
          </div>

          {/* Current Day Overview */}
          {(() => {
            const dayData = ITINERARY_CONFIG.days.find((d) => d.day === activeDay) || ITINERARY_CONFIG.days[0]
            return (
              <div>
                <div className="planDayOverviewBox">
                  <div className="planDayOverviewTitle">Day {dayData.day}: {dayData.title}</div>
                  <div className="planDayOverviewTheme">{dayData.theme}</div>
                  <p className="planDayOverviewSummary">{dayData.summary}</p>
                </div>

                {/* Timeline Items */}
                <div className="planTimelineList">
                  {dayData.schedules.map((item, sIdx) => {
                    const isMust = item.isMustEvent
                    const linkedOpt = item.linkedOptionCode
                    const linkedSrv = item.linkedServiceCode

                    return (
                      <div
                        key={sIdx}
                        className={`planTimelineItem ${isMust ? 'mustEvent' : ''}`}
                      >
                        <div className="planTimelineTopRow">
                          <span className="planTimelineTime">{item.time}</span>
                          <span
                            className={`planTimelineBadge ${
                              isMust ? 'must' : linkedOpt ? 'option' : linkedSrv ? 'service' : ''
                            }`}
                          >
                            {item.badge || '일정'}
                          </span>
                        </div>

                        <h3 className="planTimelineTitle">{item.title}</h3>
                        <p className="planTimelineDesc">{item.desc}</p>

                        {/* Unverified note if any */}
                        {item.unverifiedNote && (
                          <div className="planUnverifiedNotice">
                            <span>⚠️</span>
                            <span>{item.unverifiedNote}</span>
                          </div>
                        )}

                        {/* Linked Options or Service shortcut */}
                        {linkedOpt && (
                          <div style={{ marginTop: '4px', fontSize: '13px' }}>
                            <span style={{ color: '#0284C7', fontWeight: 600 }}>
                              ↳ 아래 [옵션 {linkedOpt}] 카드에서 등급(다수탑승·프리미엄·프라이빗)을 선택하여 추가할 수 있습니다.
                            </span>
                          </div>
                        )}

                        {linkedSrv && (
                          <div style={{ marginTop: '4px', fontSize: '13px' }}>
                            <span style={{ color: '#0F172A', fontWeight: 600 }}>
                              ↳ 아래 [서비스 {linkedSrv}] 카드에서 예약 항목에 추가할 수 있습니다.
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </section>

        {/* 5. Option Cards: 등급 3종(다수 탑승 · 프리미엄 · 프라이빗), 각 칸 "추가" 버튼 */}
        <section id="plan-options" className="planOptionsSection">
          <div className="itinerariesHeaderRow">
            <h2 className="itinerariesSectionTitle">
              {isKo ? '투어 옵션 카드 (옵션 A ~ D)' : 'Tour Options (Tiers)'}
            </h2>
            <p className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
              {isKo
                ? '원하시는 등급의 "추가" 버튼을 누르시면 아래 예약 요청 목록에 즉시 등록됩니다. 미정 항목은 문의하기로 안내됩니다.'
                : 'Select your preferred tier (Regular, Premium, Private) and click Add to customize.'}
            </p>
          </div>

          <div className="planOptionCardGrid">
            {ITINERARY_CONFIG.options.map((opt) => (
              <div key={opt.id} className="planOptionCard">
                <div className="planOptionCardHeader">
                  <div>
                    <span className="planOptionCodeBadge">옵션 {opt.code}</span>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginRight: '8px' }}>
                      {opt.category} · {opt.recommendedDay}
                    </span>
                    <h3 className="planOptionTitle">{opt.title}</h3>
                    <p className="planOptionSubtitle">{opt.subtitle}</p>
                  </div>
                </div>

                <div className="planTierGrid">
                  {opt.tiers.map((tier) => {
                    const isSelected = !!selectedTiers[tier.id]

                    return (
                      <div
                        key={tier.id}
                        className={`planTierBox ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="planTierTop">
                          {tier.badge && <span className="planTierBadge">{tier.badge}</span>}
                          <div className="planTierName">{tier.name}</div>
                          <p className="planTierDesc">{tier.desc}</p>
                        </div>

                        <div>
                          <div className="planTierPriceRow">
                            <span style={{ fontSize: '12.5px', color: '#64748B' }}>예상 요금</span>
                            {tier.priceVnd !== null ? (
                              <span className="planTierPriceVal">{tier.priceVnd.toLocaleString('ko-KR')} ₫</span>
                            ) : (
                              <span className="planInquiryBadge">문의하기 (정가 실측 중)</span>
                            )}
                          </div>

                          <div style={{ marginTop: '6px', fontSize: '12px', color: '#64748B' }}>
                            운영 업체: {tier.vendorName || '현지 검증 제휴사 (문의 요망)'}
                          </div>

                          <div style={{ marginTop: '10px' }}>
                            <button
                              type="button"
                              onClick={() => handleToggleTier(opt, tier)}
                              className={`planAddBtn ${isSelected ? 'added' : ''}`}
                            >
                              {isSelected ? '✓ 일정에 추가됨' : '+ 내 일정에 추가'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-1. Additional Services S1~S5 */}
        <section className="planOptionsSection">
          <div className="itinerariesHeaderRow">
            <h2 className="itinerariesSectionTitle">
              {isKo ? '추가 여행 편의 서비스 (S1 ~ S5)' : 'Additional Services'}
            </h2>
            <p className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
              {isKo
                ? '공항 픽업/샌딩, 지역 간 이동 차량, 리조트 간 캐리어 배송 등 필요한 서비스를 선택해 함께 예약 요청하세요.'
                : 'Select airport transfers, inter-zone transfers, and luggage deliveries.'}
            </p>
          </div>

          <div className="planServiceGrid">
            {ITINERARY_CONFIG.services.map((srv) => {
              const isSelected = !!selectedServices[srv.id]

              return (
                <div
                  key={srv.id}
                  className={`planServiceCard ${isSelected ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="planServiceCode">{srv.code}</span>
                      <span className="planTierBadge">{srv.badge}</span>
                    </div>
                    <h3 className="planServiceTitle">{srv.title}</h3>
                    <p className="planServiceDesc">{srv.desc}</p>
                    {srv.note && <p className="planServiceNote">• {srv.note}</p>}
                  </div>

                  <div>
                    <div className="planTierPriceRow">
                      <span style={{ fontSize: '12.5px', color: '#64748B' }}>이용 요금</span>
                      <span className="planInquiryBadge">문의하기</span>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleService(srv)}
                        className={`planAddBtn ${isSelected ? 'added' : ''}`}
                      >
                        {isSelected ? '✓ 서비스 선택됨' : '+ 서비스 추가'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 6. 동행별 추천 장소 목록 (아이 동반 가족 · 부모님 · 커플 · 친구 · 혼자) */}
        <section className="planCompanionSection">
          <div className="itinerariesHeaderRow">
            <h2 className="itinerariesSectionTitle">
              {isKo ? '동행별 추천 명소 목록' : 'Recommended Places by Companion'}
            </h2>
            <p className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
              {isKo
                ? '함께 떠나는 동행의 취향에 딱 맞춘 푸꾸옥 남부 선셋타운과 켐비치 핵심 명소입니다.'
                : 'Curated spots tailored for your travel companions.'}
            </p>
          </div>

          {/* Companion Tabs */}
          <div className="planCompanionNav" style={{ marginTop: '16px' }}>
            {(
              [
                ['family_kids', '아이 동반 가족'],
                ['parents', '부모님 동반'],
                ['couples', '커플'],
                ['friends', '친구 동행'],
                ['solo', '혼자 여행'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCompanionTab(key)}
                className={`planCompanionNavBtn ${companionTab === key ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Place Cards */}
          <div className="planCompanionGrid">
            {ITINERARY_CONFIG.companionPlaces[companionTab].places.map((place) => (
              <div key={place.id} className="planCompanionCard">
                <Image
                  src={place.image}
                  alt={place.name}
                  width={400}
                  height={140}
                  unoptimized
                />
                <div className="planCompanionBody">
                  <span className="planCompanionTag">{place.tag}</span>
                  <div className="planCompanionName">{place.name}</div>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>{place.category}</span>
                  <p className="planCompanionDesc">{place.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 예약 요청 폼 + 결제 준비중 안내 + WhatsApp / Zalo 직통 버튼 */}
        <section id="plan-booking" className="planBookingSection">
          <div className="itinerariesHeaderRow">
            <h2 className="itinerariesSectionTitle">
              {isKo ? '맞춤 일정 예약 요청서' : 'Reservation Request'}
            </h2>
            <p className="itinerariesSubtitle" style={{ marginBottom: 0 }}>
              {isKo
                ? '위에서 선택하신 일정과 옵션을 확인하고 여행 정보를 입력하시면 공식 한국어 채널(WhatsApp·Zalo)로 즉시 상담 및 예약 요청이 전달됩니다.'
                : 'Review your selected itinerary items and submit to WhatsApp or Zalo.'}
            </p>
          </div>

          {/* Selected Option & Service Summary */}
          <div className="planSelectedBox" style={{ marginTop: '16px' }}>
            <div className="planSelectedLabel">
              선택된 투어 옵션 및 서비스 ({Object.keys(selectedTiers).length + Object.keys(selectedServices).length}건)
            </div>
            <div className="planSelectedTags">
              {Object.entries(selectedTiers).map(([id, t]) => (
                <span key={id} className="planSelectedTag">
                  <span>[{t.code}] {t.optionTitle} ({t.tierName})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(id)}
                    className="planTagRemoveBtn"
                    title="삭제"
                  >
                    ×
                  </button>
                </span>
              ))}

              {Object.entries(selectedServices).map(([id, s]) => (
                <span key={id} className="planSelectedTag" style={{ background: '#0284C7' }}>
                  <span>[{s.code}] {s.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(id)}
                    className="planTagRemoveBtn"
                    title="삭제"
                  >
                    ×
                  </button>
                </span>
              ))}

              {Object.keys(selectedTiers).length === 0 && Object.keys(selectedServices).length === 0 && (
                <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                  선택된 옵션이 없습니다. 상단에서 원하는 옵션의 &apos;추가&apos; 버튼을 눌러보세요.
                </span>
              )}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="planFormGrid">
            <div className="planFormGroup">
              <label htmlFor={startDateId} className="planFormLabel">여행 시작일 (도착일)</label>
              <input
                id={startDateId}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="planInput"
              />
            </div>

            <div className="planFormGroup">
              <label htmlFor={endDateId} className="planFormLabel">여행 종료일 (출국일)</label>
              <input
                id={endDateId}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="planInput"
              />
            </div>

            <div className="planFormGroup">
              <label htmlFor={adultsId} className="planFormLabel">성인 인원</label>
              <select
                id={adultsId}
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="planSelect"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, '9인 이상'].map((n) => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>

            <div className="planFormGroup">
              <label htmlFor={childrenId} className="planFormLabel">아동/유아 인원</label>
              <select
                id={childrenId}
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="planSelect"
              >
                {[0, 1, 2, 3, 4, '5인 이상'].map((n) => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>

            <div className="planFormGroup fullWidth">
              <label htmlFor={hotelId} className="planFormLabel">숙소 정보 (호텔 또는 리조트명)</label>
              <input
                id={hotelId}
                type="text"
                placeholder="예: 선셋타운 라페스타 힐튼 / JW 메리어트 켐비치 (미정 시 '미정' 입력)"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="planInput"
              />
            </div>

            <div className="planFormGroup">
              <label htmlFor={guestNameId} className="planFormLabel">신청자 성함</label>
              <input
                id={guestNameId}
                type="text"
                placeholder="예: 홍길동"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="planInput"
              />
            </div>

            <div className="planFormGroup">
              <label htmlFor={guestContactId} className="planFormLabel">연락처 (전화번호 / 카카오톡 ID)</label>
              <input
                id={guestContactId}
                type="text"
                placeholder="예: 010-1234-5678 또는 카카오ID"
                value={guestContact}
                onChange={(e) => setGuestContact(e.target.value)}
                className="planInput"
              />
            </div>

            <div className="planFormGroup fullWidth">
              <label htmlFor={extraRequestsId} className="planFormLabel">추가 요청사항</label>
              <textarea
                id={extraRequestsId}
                rows={3}
                placeholder="희망하시는 투어 시간대, 유아 카시트 필요 여부, 특별 요청사항 등을 편하게 적어주세요."
                value={extraRequests}
                onChange={(e) => setExtraRequests(e.target.value)}
                className="planTextarea"
              />
            </div>
          </div>

          {/* Payment Notice (PayPal / VNPay 준비 중) */}
          <div className="planPayBox">
            <div className="planPayTitle">온라인 결제 안내</div>
            <div className="planPayBtnRow">
              <button type="button" disabled className="planPayBtnDisabled">
                <span>PayPal 결제 (준비 중)</span>
              </button>
              <button type="button" disabled className="planPayBtnDisabled">
                <span>VNPay 결제 (준비 중)</span>
              </button>
            </div>
            <p className="planPayDesc">{ITINERARY_CONFIG.paymentStatus.notice}</p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="planCtaRow">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="planCtaWhatsApp"
            >
              <span>💬 WhatsApp으로 예약 요청하기</span>
            </a>
            <a
              href={zaloInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="planCtaZalo"
            >
              <span>📱 Zalo로 예약 요청하기</span>
            </a>
          </div>

          <div className="planContactInfo">
            <span>공식 고객센터 안내 (공항 픽업 · 버기 투어 · 차량 공통): </span>
            <a href="tel:0907994188" style={{ color: '#0F172A', fontWeight: 700, textDecoration: 'none' }}>
              0907 994 188
            </a>
            <span> (연중무휴 한국어 지원)</span>
          </div>
        </section>

        {/* Editorial Policy Callout */}
        <div className="itinerariesCalloutBox">
          <div className="calloutIcon">ℹ️</div>
          <div className="calloutBody">
            <div className="calloutTitle">
              {isKo ? '마이 푸꾸옥 일정 및 투어 안내 원칙' : 'Editorial Policy'}
            </div>
            <div className="calloutText">
              {isKo
                ? '마이 푸꾸옥의 모든 추천 코스는 현장 실측 이동 시간과 공연 시간을 바탕으로 검증되었습니다. 확인되지 않은 요금이나 일정은 임의로 표기하지 않고 "확인 필요" 또는 "문의하기"로 투명하게 안내하며, 현지 공식 제휴사를 통해 정직하게 운영됩니다.'
                : 'All courses are verified on-site. Fabricated prices or unverified schedules are prohibited.'}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
