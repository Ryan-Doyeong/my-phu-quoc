import type { Locale } from '@/lib/i18n/config';
import styles from './ActivityOperatorNotice.module.css';

const COPY: Record<string, { title: string; body: string }> = {
  ko: {
    title: '예약 안내',
    body: '마이 푸꾸옥은 액티비티 예약을 도와드리는 역할만 합니다. 투어의 실제 운영(진행·안전·일정 변경·취소와 환불 등)은 각 투어 업체가 담당합니다.',
  },
  en: {
    title: 'Booking notice',
    body: 'My Phu Quoc only helps you arrange bookings. Each tour is operated by the partner company, which is responsible for the actual service, safety, schedule changes, cancellations and refunds.',
  },
  vi: {
    title: 'Lưu ý khi đặt tour',
    body: 'My Phu Quoc chỉ hỗ trợ sắp xếp đặt tour. Đơn vị đối tác trực tiếp tổ chức tour và chịu trách nhiệm về dịch vụ thực tế, an toàn, thay đổi lịch trình, hủy tour và hoàn tiền.',
  },
};

export function ActivityOperatorNotice({ locale = 'ko' }: { locale?: Locale }) {
  const c = COPY[locale] ?? COPY.en;
  return (
    <aside className={styles.notice} role="note">
      <strong className={styles.title}>{c.title}</strong>
      <span className={styles.body}>{c.body}</span>
    </aside>
  );
}
