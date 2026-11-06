'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';
import {
  buildServiceWhatsappUrl,
  BOOKING_SERVICE_COPY,
} from '@/lib/i18n/bookingServiceCopy';
import {
  PARTNER_INFO,
  PARTNER_TOURS as ALL_PARTNER_TOURS,
  type L,
  type PartnerOperator,
  type PartnerTourCategory,
  type PickupSurchargeItem,
} from '@/lib/activities/partnerTours';
import {
  PARTNER_TOUR_DETAILS_KO,
  getPartnerTourPhoto,
} from '@/lib/activities/partnerTourDetails';
import styles from './ActivityPartnerToursSection.module.css';

// 존스 투어 여행 정보는 한국어만 제공한다(다른 언어는 번역 전까지 미표시).
const DETAIL_COPY_KO = {
  includedExcluded: '포함 · 불포함',
  partner: '파트너',
  operator: { johns: "John's Tours", redriver: 'Red River Tour' } as Record<PartnerOperator, string>,
  itinerary: '일정',
  included: '포함',
  excluded: '불포함',
  bring: '준비물',
  notice:
    '일정·시간은 일반적인 기준이며, 날씨·해상 상태·당일 상황에 따라 변경될 수 있습니다.',
  credit: '사진: 존스 투어(phuquoctrip.com)',
  creditRedriver: '사진: Red River Tour',
};

// 업체 브로셔에 상세 일정이 없는 상품: 일정 없이 노출하고 문의를 안내한다.
const NO_DETAIL_NOTICE: Record<string, string> = {
  ko: '상세 일정·포함 사항·준비물은 업체 자료 확인 후 안내해 드립니다. 구체적인 내용은 문의해 주세요.',
  en: 'We will provide the detailed itinerary, inclusions and what to bring after checking with the tour operator. Please contact us for details.',
  zh: '详细行程、包含项目及需携带的物品，将在核实服务商提供的资料后告知。如需了解具体内容，请联系我们。',
  ru: 'Подробная программа, что включено и что взять с собой уточняются по запросу. Свяжитесь с нами.',
  ja: '詳しい日程・料金に含まれる内容・持ち物については、催行会社の資料を確認したうえでご案内します。詳細はお問い合わせください。',
  hi: 'विस्तृत कार्यक्रम, शामिल सेवाएँ और साथ ले जाने की चीज़ें पूछने पर बताई जाती हैं। कृपया हमसे संपर्क करें।',
  vi: 'Lịch trình chi tiết, dịch vụ bao gồm và đồ cần mang sẽ được báo khi bạn liên hệ. Vui lòng nhắn cho chúng tôi để biết thêm.',
}

export interface ActivityPartnerToursSectionProps {
  locale?: Locale;
}

type FilterKey =
  | 'all'
  | `op:${PartnerOperator}`
  | `cat:${PartnerTourCategory}`;

const CATEGORY_ICON: Record<PartnerTourCategory, string> = {
  hopping: '🏝️',
  cablecar: '🚡',
  fishing: '🎣',
  sunset: '🌅',
  diving: '🤿',
  land: '🚌',
  camping: '⛺',
};

// 비공개 처리 (2026-11-06): 데이터는 유지하고 화면에서만 숨김. 다시 공개하려면 목록에서 제거.
// 존스 새 공시가표(2026-08-23) 반영으로 케이블카·육상·캠핑 카테고리를 다시 공개하고, 글램핑만 투어 단위로 비공개.
export const HIDDEN_PARTNER_CATEGORIES: PartnerTourCategory[] = [];
export // Red River 투어별 사진 (얼굴이 나온 사진은 제외하고 풍경·어획물 위주로 선별)
const REDRIVER_TOUR_PHOTOS: Record<string, string> = {
  'redriver-fishing': '/activities/partner/redriver/fishing.webp',
  'redriver-red-4': '/activities/partner/redriver/sunset-squid.webp',
  'redriver-red-10': '/activities/partner/redriver/red10.webp',
  'redriver-redspecial': '/activities/partner/redriver/islands-1.webp',
  'redriver-red-1': '/activities/partner/redriver/islands-2.webp',
  'redriver-red-2': '/activities/partner/redriver/islands-3.webp',
  'redriver-red-3': '/activities/partner/redriver/islands-4.webp',
  'redriver-red-7': '/activities/partner/redriver/islands-5.webp',
  'redriver-trip-1': '/activities/partner/redriver/islands-6.webp',
  'redriver-trip-2': '/activities/partner/redriver/islands-7.webp',
};

// 시트·브로셔 내용이 서로 맞지 않아 '업체 확인 중'이 필요한 상품은 확인될 때까지 비공개 (2026-11-06 사용자 지시).
// - redriver-red-1: 섬 2곳/3곳 표기 불일치 · redriver-trip-1: 3개 섬/4개 섬 불일치
// - redriver-red-2, redriver-trip-2, redriver-land-2: 아쿠아토피아 '자비'와 '포함' 표기 불일치
// - johns-land-tour-5: 포함·불포함 세부 내역 업체 확인 중
const HIDDEN_PARTNER_TOUR_IDS: string[] = [
  'johns-glamping-trip',
  'johns-land-tour-5',
  'redriver-red-1',
  'redriver-red-2',
  'redriver-trip-1',
  'redriver-trip-2',
  'redriver-land-2',
];

const PARTNER_TOURS = ALL_PARTNER_TOURS.filter(
  (t) =>
    !HIDDEN_PARTNER_CATEGORIES.includes(t.category) &&
    !HIDDEN_PARTNER_TOUR_IDS.includes(t.id),
);

const CATEGORIES: PartnerTourCategory[] = [
  'hopping',
  'cablecar',
  'fishing',
  'sunset',
  'diving',
  'land',
  'camping',
];

const OPERATORS: PartnerOperator[] = ['johns', 'redriver'];

function pick(l: L | undefined, locale: Locale): string {
  if (!l) return '';
  return l[locale] ?? l.en;
}

// 일정 문장에서 맨 앞 시간(예: "08:15~08:30", "[1일차] 12:00")을 분리해 요트 카드와 같은 시간 열로 표시한다.
function splitStep(text: string): { time: string; body: string } {
  const m = text.match(/^(\[[^\]]+\]\s*)?(\d{1,2}:\d{2}(?:~\d{1,2}:\d{2})?)\s+(.*)$/);
  if (m) return { time: `${m[1] ?? ''}${m[2]}`.trim(), body: m[3] };
  return { time: '', body: text };
}

function formatVnd(amount: number): string {
  return `₫${amount.toLocaleString('en-US')}`;
}

interface UiLabels {
  sectionTitle: string;
  sectionSubtitle: string;
  filterAriaLabel: string;
  filterAll: string;
  operatorBanner: Record<PartnerOperator, string>;
  operatorChip: Record<PartnerOperator, string>;
  categoryChip: Record<PartnerTourCategory, string>;
  adult: string;
  child: string;
  childNotApplicable: string;
  priceAsOfLabel: string;
  detailsToggleTitle: string;
  includedTitle: string;
  excludedTitle: string;
  childPolicyTitle: string;
  pickupTitle: string;
  pickupSpecialPrefix: string;
  cancellationTitle: string;
  departureTitle: string;
  unverifiedTitle: string;
  perPerson: string;
  emptyResult: string;
}

const UI_COPY: { ko: UiLabels; en: UiLabels; vi: UiLabels } = {
  ko: {
    sectionTitle: '해양·투어 액티비티',
    sectionSubtitle:
      '표시된 가격은 파트너사 공시가(1인, VND)이며 날씨·시즌·운영 상황에 따라 달라질 수 있습니다. 예약 전 포함 사항을 확인한 뒤 안내해 드립니다.',
    filterAriaLabel: '액티비티 필터',
    filterAll: '전체',
    operatorBanner: {
      johns: "JOHN'S TOURS PHÚ QUỐC",
      redriver: 'RED RIVER TOUR',
    },
    operatorChip: {
      johns: "John's Tours",
      redriver: 'Red River Tour',
    },
    categoryChip: {
      hopping: '호핑·스노클링',
      cablecar: '케이블카',
      fishing: '낚시',
      sunset: '일몰·야간',
      diving: '다이빙·씨워커',
      land: '육상·북부·남부',
      camping: '캠핑·글램핑',
    },
    adult: '성인',
    child: '어린이',
    childNotApplicable: '어린이: 해당 없음',
    priceAsOfLabel: '가격 기준일',
    detailsToggleTitle: '업체별 이용 규정 및 안내 보기 (포함사항 · 픽업 · 취소 규정)',
    includedTitle: '포함 사항',
    excludedTitle: '불포함 사항',
    childPolicyTitle: '어린이 기준',
    pickupTitle: '지역별 추가 픽업비 (1인 기준)',
    pickupSpecialPrefix: '전용 픽업비',
    cancellationTitle: '취소 및 환불 규정',
    departureTitle: '출발 일정',
    unverifiedTitle: '미확인 항목 안내',
    perPerson: '/ 1인',
    emptyResult: '선택한 조건에 해당하는 투어가 없습니다.',
  },
  en: {
    sectionTitle: 'Marine & Tour Activities',
    sectionSubtitle:
      'Listed prices are official partner rates (per person, VND) and may vary by weather, season, or operations. Inclusions will be confirmed prior to booking.',
    filterAriaLabel: 'Activity filters',
    filterAll: 'All',
    operatorBanner: {
      johns: "JOHN'S TOURS PHÚ QUỐC",
      redriver: 'RED RIVER TOUR',
    },
    operatorChip: {
      johns: "John's Tours",
      redriver: 'Red River Tour',
    },
    categoryChip: {
      hopping: 'Island Hopping',
      cablecar: 'Cable Car',
      fishing: 'Fishing',
      sunset: 'Sunset & Night',
      diving: 'Diving & Sea Walker',
      land: 'Land Tours',
      camping: 'Camping & Glamping',
    },
    adult: 'Adult',
    child: 'Child',
    childNotApplicable: 'Child: Not applicable',
    priceAsOfLabel: 'Price as of',
    detailsToggleTitle: 'View Partner Policies & Info (Inclusions · Pickup · Cancellation)',
    includedTitle: 'Included',
    excludedTitle: 'Not Included',
    childPolicyTitle: 'Child Policy',
    pickupTitle: 'Regional Pickup Surcharges (Per Person)',
    pickupSpecialPrefix: 'Specific Pickup Surcharges',
    cancellationTitle: 'Cancellation Policy',
    departureTitle: 'Departure Schedule',
    unverifiedTitle: 'Unverified Details',
    perPerson: '/ person',
    emptyResult: 'No tours match the selected filter.',
  },
  vi: {
    sectionTitle: 'Hoạt động biển & Tour du lịch',
    sectionSubtitle:
      'Giá niêm yết là giá chính thức từ đơn vị đối tác (VND/người) và có thể thay đổi tùy thời tiết, mùa du lịch hoặc tình hình vận hành. Các dịch vụ bao gồm sẽ được xác nhận trước khi đặt tour.',
    filterAriaLabel: 'Lọc hoạt động',
    filterAll: 'Tất cả',
    operatorBanner: {
      johns: "JOHN'S TOURS PHÚ QUỐC",
      redriver: 'RED RIVER TOUR',
    },
    operatorChip: {
      johns: "John's Tours",
      redriver: 'Red River Tour',
    },
    categoryChip: {
      hopping: 'Tour khám phá các đảo',
      cablecar: 'Cáp treo',
      fishing: 'Câu cá',
      sunset: 'Hoàng hôn & Buổi tối',
      diving: 'Lặn biển & Đi bộ dưới biển',
      land: 'Tour trên đảo',
      camping: 'Cắm trại & Glamping',
    },
    adult: 'Người lớn',
    child: 'Trẻ em',
    childNotApplicable: 'Trẻ em: Không áp dụng',
    priceAsOfLabel: 'Giá cập nhật ngày',
    detailsToggleTitle: 'Xem thông tin & chính sách tour (Bao gồm · Đón khách · Hủy tour)',
    includedTitle: 'Bao gồm',
    excludedTitle: 'Không bao gồm',
    childPolicyTitle: 'Chính sách trẻ em',
    pickupTitle: 'Phụ thu đón khách theo khu vực (mỗi người)',
    pickupSpecialPrefix: 'Phụ thu đón khách tại địa điểm cụ thể',
    cancellationTitle: 'Chính sách hủy tour',
    departureTitle: 'Lịch khởi hành',
    unverifiedTitle: 'Thông tin chưa xác minh',
    perPerson: '/ người',
    emptyResult: 'Không có tour nào phù hợp với bộ lọc đã chọn.',
  },
};

export function ActivityPartnerToursSection({
  locale = 'ko',
}: ActivityPartnerToursSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>(`cat:${CATEGORIES[0]}`);

  useEffect(() => {
    const onCat = (e: Event) => {
      const cat = (e as CustomEvent<PartnerTourCategory>).detail;
      if (CATEGORIES.includes(cat)) setActiveFilter(`cat:${cat}`);
    };
    window.addEventListener('partner-tour-category', onCat);
    return () => window.removeEventListener('partner-tour-category', onCat);
  }, []);

  const ui: UiLabels = locale === 'ko' ? UI_COPY.ko : locale === 'vi' ? UI_COPY.vi : UI_COPY.en;
  const bookingCopy =
    (BOOKING_SERVICE_COPY[locale] ?? BOOKING_SERVICE_COPY.en).activities;

  const filteredTours = useMemo(() => {
    if (activeFilter === 'all') return PARTNER_TOURS;
    if (activeFilter.startsWith('op:')) {
      const op = activeFilter.slice(3) as PartnerOperator;
      return PARTNER_TOURS.filter((tour) => tour.operator === op);
    }
    if (activeFilter.startsWith('cat:')) {
      const cat = activeFilter.slice(4) as PartnerTourCategory;
      return PARTNER_TOURS.filter((tour) => tour.category === cat);
    }
    return PARTNER_TOURS;
  }, [activeFilter]);

  const renderPickupItem = (item: PickupSurchargeItem, idx: number) => {
    const areaText = pick(item.area, locale);
    const hasAmount = typeof item.surchargePerPersonVnd === 'number';
    const noteText = item.note ? pick(item.note, locale) : '';

    return (
      <li key={idx} className={styles.policyListItem}>
        <span>{areaText}</span>
        {hasAmount && (
          <span className={styles.surchargeAmount}>
            : {formatVnd(item.surchargePerPersonVnd!)} {ui.perPerson}
          </span>
        )}
        {noteText && <span className={styles.surchargeNote}> ({noteText})</span>}
      </li>
    );
  };

  return (
    <section id="partner-tours" className={styles.section} aria-labelledby="partner-tours-heading">
      <div className={styles.header}>
        <h2 id="partner-tours-heading" className={styles.title}>
          {ui.sectionTitle}
        </h2>
        <p className={styles.subtitle}>{ui.sectionSubtitle}</p>
      </div>

      <div
        className={styles.filterScrollWrap}
        role="group"
        aria-label={ui.filterAriaLabel}
      >
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => {
            const key: FilterKey = `cat:${cat}`;
            const isSelected = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                className={`${styles.chip} ${
                  isSelected ? styles.chipActive : ''
                }`}
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(key)}
              >
                <span aria-hidden="true">{CATEGORY_ICON[cat]}</span>{' '}
                {ui.categoryChip[cat]}{' '}
                <span className={styles.chipCount}>
                  {PARTNER_TOURS.filter((t) => t.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredTours.length === 0 ? (
        <p className={styles.emptyMessage}>{ui.emptyResult}</p>
      ) : (
        <div className={styles.grid}>
          {filteredTours.map((tour) => {
            const tourTitle = pick(tour.title, locale);
            const tourSummary = pick(tour.summary, locale);
            const whatsappHref = buildServiceWhatsappUrl(
              `${bookingCopy.prefillMessage}[${tourTitle}] `
            );

            const detail =
              locale === 'ko' ? PARTNER_TOUR_DETAILS_KO[tour.id] : undefined;

            return (
              <article key={tour.id} className={styles.card}>
                <div className={styles.cardMedia}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      detail && detail.photoCount > 0
                        ? getPartnerTourPhoto(tour.id, 1)
                        : REDRIVER_TOUR_PHOTOS[tour.id] ??
                          `/activities/partner/${tour.category}.webp`
                    }
                    alt={tourTitle}
                    loading="lazy"
                    width={640}
                    height={480}
                  />
                  <span className={styles.mediaOperator}>
                    {ui.operatorChip[tour.operator]}
                  </span>
                  <span className={styles.mediaCode}>{tour.code}</span>
                </div>

                {detail && detail.photoCount > 0 && (
                  <div className={styles.tourThumbs}>
                    {[2, 3].map((n) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={n}
                        src={getPartnerTourPhoto(tour.id, n)}
                        alt=""
                        loading="lazy"
                        width={480}
                        height={360}
                      />
                    ))}
                  </div>
                )}

                <div className={styles.cardBody}>
                  <div className={styles.categoryTagRow}>
                    <span className={styles.categoryTag}>
                      {ui.categoryChip[tour.category]}
                    </span>
                  </div>

                  {detail && (
                    <p className={styles.tourOp}>
                      {DETAIL_COPY_KO.partner} · {DETAIL_COPY_KO.operator[tour.operator]}
                    </p>
                  )}
                  <h3 className={styles.cardTitle}>{tourTitle}</h3>
                  <p className={styles.cardSummary}>{tourSummary}</p>

                  <div className={styles.variantsList}>
                    {tour.variants.map((variant, vIdx) => {
                      const variantLabel = pick(variant.label, locale);
                      const childNote = variant.childNote
                        ? pick(variant.childNote, locale)
                        : '';

                      return (
                        <div key={vIdx} className={styles.variantItem}>
                          <div className={styles.variantHeader}>
                            <span className={styles.variantLabel}>
                              {variantLabel}
                            </span>
                            <span className={styles.variantPrices}>
                              <strong className={styles.adultPrice}>
                                {ui.adult} {formatVnd(variant.adultVnd)}
                              </strong>
                              <span className={styles.priceDivider}>/</span>
                              <span className={styles.childPrice}>
                                {typeof variant.childVnd === 'number'
                                  ? `${ui.child} ${formatVnd(variant.childVnd)}`
                                  : ui.childNotApplicable}
                              </span>
                            </span>
                          </div>
                          {childNote && (
                            <p className={styles.childNoteText}>{childNote}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {detail && (
                    <>
                      <details className={styles.tourDetail}>
                        <summary>{DETAIL_COPY_KO.itinerary}</summary>
                        <p className={styles.tourNote}>{detail.description}</p>
                        <ul className={styles.tourTimeline}>
                          {detail.itinerary.map((it, i) => {
                            const st = splitStep(it);
                            return (
                              <li key={i}>
                                <time>{st.time}</time>
                                <div>
                                  <b>{st.body}</b>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                      <details className={styles.tourDetail}>
                        <summary>{DETAIL_COPY_KO.includedExcluded}</summary>
                        <p className={styles.tourSub}>{DETAIL_COPY_KO.included}</p>
                        <p className={styles.tourText}>{detail.included}</p>
                        <p className={styles.tourSub}>{DETAIL_COPY_KO.excluded}</p>
                        <p className={styles.tourText}>{detail.excluded}</p>
                        {detail.bring && (
                          <>
                            <p className={styles.tourSub}>{DETAIL_COPY_KO.bring}</p>
                            <p className={styles.tourText}>{detail.bring}</p>
                          </>
                        )}
                      </details>
                      <p className={styles.tourDetailNotice}>
                        {DETAIL_COPY_KO.notice}
                      </p>
                      {detail.note && (
                        <p className={styles.tourDetailNotice}>{detail.note}</p>
                      )}
                    </>
                  )}

                  {!(locale === 'ko' && detail) && (
                    <p className={styles.tourDetailNotice}>
                      {NO_DETAIL_NOTICE[locale] || NO_DETAIL_NOTICE.en}
                    </p>
                  )}

                  {tour.notes && tour.notes.length > 0 && (
                    <ul className={styles.tourNotesList}>
                      {tour.notes.map((noteItem, nIdx) => (
                        <li key={nIdx} className={styles.tourNoteItem}>
                          {pick(noteItem, locale)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    {bookingCopy.ctaLabel}
                  </a>
                </div>
                {detail && (
                  <p className={styles.tourCredit}>
                    {tour.operator === 'johns'
                      ? DETAIL_COPY_KO.credit
                      : DETAIL_COPY_KO.creditRedriver}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

      <details className={styles.detailsContainer}>
        <summary className={styles.detailsSummary}>
          <span>{ui.detailsToggleTitle}</span>
          <span className={styles.summaryChevron} aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className={styles.detailsContent}>
          {OPERATORS.map((op) => {
            const info = PARTNER_INFO[op];
            const specialPickups = info.pickupSurcharges.specialByTourCode;

            return (
              <div key={op} className={styles.operatorPolicyBlock}>
                <div className={styles.operatorPolicyHeader}>
                  <h3 className={styles.operatorPolicyName}>
                    {pick(info.name, locale)}
                    {info.legalName && (
                      <span className={styles.legalName}>
                        ({info.legalName})
                      </span>
                    )}
                  </h3>
                  <p className={styles.priceAsOfText}>
                    {pick(info.priceAsOfNote, locale)}
                  </p>
                </div>

                <div className={styles.policyGrid}>
                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>{ui.departureTitle}</h4>
                    <p className={styles.policyText}>
                      {pick(info.departureSchedule, locale)}
                    </p>
                  </div>

                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>{ui.includedTitle}</h4>
                    <ul className={styles.policyList}>
                      {info.included.map((item, idx) => (
                        <li key={idx} className={styles.policyListItem}>
                          {pick(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>{ui.excludedTitle}</h4>
                    <ul className={styles.policyList}>
                      {info.excluded.map((item, idx) => (
                        <li key={idx} className={styles.policyListItem}>
                          {pick(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>
                      {ui.childPolicyTitle}
                    </h4>
                    <ul className={styles.policyList}>
                      {info.childPolicy.map((item, idx) => (
                        <li key={idx} className={styles.policyListItem}>
                          {pick(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>{ui.pickupTitle}</h4>
                    <ul className={styles.policyList}>
                      {info.pickupSurcharges.standard.map((item, idx) =>
                        renderPickupItem(item, idx)
                      )}
                    </ul>

                    {specialPickups &&
                      Object.entries(specialPickups).map(([tourCode, list]) => (
                        <div key={tourCode} className={styles.specialPickupBox}>
                          <p className={styles.specialPickupTitle}>
                            [{tourCode}] {ui.pickupSpecialPrefix}
                          </p>
                          <ul className={styles.policyList}>
                            {list.map((item, idx) =>
                              renderPickupItem(item, idx)
                            )}
                          </ul>
                        </div>
                      ))}
                  </div>

                  <div className={styles.policySection}>
                    <h4 className={styles.policyHeading}>
                      {ui.cancellationTitle}
                    </h4>
                    <ul className={styles.policyList}>
                      {info.cancellationPolicy.map((item, idx) => (
                        <li key={idx} className={styles.policyListItem}>
                          {pick(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {info.unverifiedItems.length > 0 && (
                  <div className={styles.unverifiedBlock}>
                    <p className={styles.unverifiedHeading}>
                      {ui.unverifiedTitle}
                    </p>
                    <ul className={styles.unverifiedList}>
                      {info.unverifiedItems.map((item, idx) => (
                        <li key={idx} className={styles.unverifiedListItem}>
                          {pick(item, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </details>
    </section>
  );
}
