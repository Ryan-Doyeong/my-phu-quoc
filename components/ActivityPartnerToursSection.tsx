'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { CONTACT_CONFIG } from '@/lib/contactConfig';
import {
  buildServiceWhatsappUrl,
  BOOKING_SERVICE_COPY,
} from '@/lib/i18n/bookingServiceCopy';
import {
  PARTNER_INFO,
  PARTNER_TOURS,
  type L,
  type PartnerOperator,
  type PartnerTourCategory,
  type PickupSurchargeItem,
} from '@/lib/activities/partnerTours';
import styles from './ActivityPartnerToursSection.module.css';

export interface ActivityPartnerToursSectionProps {
  locale?: Locale;
}

type FilterKey =
  | 'all'
  | `op:${PartnerOperator}`
  | `cat:${PartnerTourCategory}`;

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

const UI_COPY: { ko: UiLabels; en: UiLabels } = {
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

  const ui: UiLabels = locale === 'ko' ? UI_COPY.ko : UI_COPY.en;
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

            return (
              <article key={tour.id} className={styles.card}>
                <div className={styles.cardMedia}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/activities/partner/${tour.category}.webp`}
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

                <div className={styles.cardBody}>
                  <div className={styles.categoryTagRow}>
                    <span className={styles.categoryTag}>
                      {ui.categoryChip[tour.category]}
                    </span>
                  </div>

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
                  <a
                    href={CONTACT_CONFIG.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaSecondary}
                  >
                    {bookingCopy.zaloLabel}
                  </a>
                </div>
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
