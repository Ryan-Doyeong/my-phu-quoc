'use client';

import type { Locale } from '@/lib/i18n/config';
import styles from './ActivityMiniBanners.module.css';

export const PARTNER_CATEGORY_EVENT = 'partner-tour-category';

type BannerKey =
  | 'hopping'
  | 'cablecar'
  | 'fishing'
  | 'sunset'
  | 'diving'
  | 'land'
  | 'camping'
  | 'yacht';

const BANNERS: { key: BannerKey; icon: string; ko: string; en: string }[] = [
  { key: 'hopping', icon: '🏝️', ko: '호핑·스노클링', en: 'Island Hopping' },
  { key: 'cablecar', icon: '🚡', ko: '케이블카', en: 'Cable Car' },
  { key: 'fishing', icon: '🎣', ko: '낚시', en: 'Fishing' },
  { key: 'sunset', icon: '🌅', ko: '일몰·야간', en: 'Sunset & Night' },
  { key: 'diving', icon: '🤿', ko: '다이빙·씨워커', en: 'Diving' },
  { key: 'land', icon: '🚌', ko: '육상 투어', en: 'Land Tours' },
  { key: 'camping', icon: '⛺', ko: '캠핑·글램핑', en: 'Camping' },
  { key: 'yacht', icon: '⛵', ko: '요트 투어', en: 'Yacht' },
];

export function ActivityMiniBanners({ locale = 'ko' }: { locale?: Locale }) {
  const go = (key: BannerKey) => {
    if (key === 'yacht') {
      document.getElementById('yacht-tours')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.dispatchEvent(new CustomEvent(PARTNER_CATEGORY_EVENT, { detail: key }));
    document.getElementById('partner-tours')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.wrap} aria-label={locale === 'ko' ? '액티비티 카테고리' : 'Activity categories'}>
      <div className={styles.grid}>
        {BANNERS.map((b) => (
          <button key={b.key} type="button" className={styles.banner} onClick={() => go(b.key)}>
            <span className={styles.icon} aria-hidden="true">{b.icon}</span>
            <span className={styles.label}>{locale === 'ko' ? b.ko : b.en}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
