import { CONTACT_CONFIG } from '@/lib/contactConfig'
import {
  MARMORIS_YACHT_TOURS,
  YACHT_CANCELLATION,
  YACHT_CANCEL_NOTE,
  YACHT_CHILD_POLICY,
  YACHT_EXCLUDED,
  YACHT_EXTRA_PAID,
  YACHT_INCLUDED,
  type L,
} from '@/lib/activities/marmorisYacht'
import { BOOKING_SERVICE_COPY } from '@/lib/i18n/bookingServiceCopy'
import type { Locale } from '@/lib/i18n/config'
import { NoOvercharge, MustDoBadge } from '@/components/NoOvercharge'

/* ChatGPT 7개 국어 검수 완료 (2026-11-02) */
const pick = (l: L, locale: Locale) => (l as unknown as Record<string, string>)[locale] ?? l.en

interface YachtUiCopy {
  section: string
  lead: string
  partner: string
  per: string
  schedule: string
  included: string
  policy: string
  extraPaid: string
  excluded: string
  cancelTitle: string
  childTitle: string
  wa: string
  credit: string
  notice: string
}

const UI: Record<string, YachtUiCopy> = {
  ko: {
    section: '요트 투어',
    lead: '푸꾸옥 바다를 즐기는 프리미엄 요트 투어입니다. 가격과 일정은 파트너사가 제공한 정보를 기준으로 안내합니다.',
    partner: '파트너',
    per: '1인',
    schedule: '일정 보기',
    included: '포함 · 불포함',
    policy: '취소 · 아동 정책',
    extraPaid: '추가요금(별도, Ocean Class 기준)',
    excluded: '불포함',
    cancelTitle: '취소·환불',
    childTitle: '아동 요금',
    wa: 'WhatsApp 문의',
    credit: '사진 출처: Marmoris Yachting',
    notice: '해상 관광은 날씨와 바다 상태, 당일 운영 상황 등 여러 요인의 영향을 받습니다. 아래 일정과 시간은 일반적인 안내 기준이며, 실제 운영 시 변경될 수 있습니다.',
  },
  en: {
    section: 'Yacht Tours',
    lead: 'Explore the waters of Phu Quoc on a premium yacht tour. Prices and schedules are based on information provided by our partner.',
    partner: 'Partner',
    per: 'per person',
    schedule: 'View Schedule',
    included: 'Included · Excluded',
    policy: 'Cancellation · Child Policy',
    extraPaid: 'Additional Charges (Ocean Class)',
    excluded: 'Not Included',
    cancelTitle: 'Cancellation & Refunds',
    childTitle: "Children's Rates",
    wa: 'Enquire via WhatsApp',
    credit: 'Photos: Marmoris Yachting',
    notice: 'Yacht tours are subject to weather, sea conditions, and other circumstances on the day. The schedules and times below are general guidelines and may change depending on actual operating conditions.',
  },
  zh: {
    section: '游艇之旅',
    lead: '乘坐游艇探索富国岛周边海域，体验高品质海上旅程。价格和行程以合作伙伴提供的信息为准。',
    partner: '合作伙伴',
    per: '每人',
    schedule: '查看行程安排',
    included: '费用包含 · 不包含',
    policy: '取消政策 · 儿童政策',
    extraPaid: '额外收费项目（Ocean Class 标准）',
    excluded: '费用不包含',
    cancelTitle: '取消与退款',
    childTitle: '儿童票价',
    wa: '通过 WhatsApp 咨询',
    credit: '图片来源：Marmoris Yachting',
    notice: '游艇观光活动受天气、海况及当天实际运营情况等多种因素影响。以下行程和时间仅供参考，实际安排可能有所调整。',
  },
  ja: {
    section: 'ヨットツアー',
    lead: 'フーコック島の海を楽しむプレミアムヨットツアーです。料金とスケジュールは提携事業者から提供された情報に基づいてご案内します。',
    partner: '提携パートナー',
    per: '1名あたり',
    schedule: 'スケジュールを見る',
    included: '料金に含まれるもの・含まれないもの',
    policy: 'キャンセル・お子様の料金規定',
    extraPaid: '追加料金（Ocean Class基準・別途）',
    excluded: '料金に含まれないもの',
    cancelTitle: 'キャンセル・返金',
    childTitle: '子ども料金',
    wa: 'WhatsAppで問い合わせる',
    credit: '写真提供：Marmoris Yachting',
    notice: '海上観光は、天候や海の状況、当日の運営状況などによって影響を受けます。以下のスケジュールと時間は目安であり、実際の運航状況により変更される場合があります。',
  },
  ru: {
    section: 'Яхтенные туры',
    lead: 'Откройте для себя морские просторы Фукуока во время яхтенного тура премиум-класса. Цены и расписание указаны на основе информации нашего партнёра.',
    partner: 'Партнёр',
    per: 'за человека',
    schedule: 'Посмотреть расписание',
    included: 'Что включено · Что не включено',
    policy: 'Отмена · Условия для детей',
    extraPaid: 'Дополнительная плата (для Ocean Class)',
    excluded: 'Не включено',
    cancelTitle: 'Отмена и возврат средств',
    childTitle: 'Тарифы для детей',
    wa: 'Написать в WhatsApp',
    credit: 'Фото: Marmoris Yachting',
    notice: 'Морские экскурсии зависят от погоды, состояния моря и других обстоятельств в день поездки. Указанные ниже время и расписание являются ориентировочными и могут меняться в зависимости от фактических условий проведения тура.',
  },
  hi: {
    section: 'यॉट टूर',
    lead: 'प्रीमियम यॉट टूर के साथ फू क्वोक के समुद्री नज़ारों का आनंद लें। कीमतें और समय-सारणी हमारे पार्टनर द्वारा दी गई जानकारी पर आधारित हैं।',
    partner: 'पार्टनर',
    per: 'प्रति व्यक्ति',
    schedule: 'समय-सारणी देखें',
    included: 'शामिल · शामिल नहीं',
    policy: 'रद्द करने और बच्चों से जुड़ी नीति',
    extraPaid: 'अतिरिक्त शुल्क (Ocean Class के अनुसार)',
    excluded: 'शामिल नहीं',
    cancelTitle: 'रद्दीकरण और रिफ़ंड',
    childTitle: 'बच्चों के लिए शुल्क',
    wa: 'WhatsApp पर पूछताछ करें',
    credit: 'फ़ोटो स्रोत: Marmoris Yachting',
    notice: 'यॉट टूर मौसम, समुद्र की स्थिति और यात्रा के दिन की अन्य परिस्थितियों पर निर्भर करते हैं। नीचे दिया गया कार्यक्रम और समय केवल सामान्य मार्गदर्शन के लिए है। वास्तविक संचालन की परिस्थितियों के अनुसार इनमें बदलाव हो सकता है।',
  },
  vi: {
    section: 'Tour du thuyền',
    lead: 'Khám phá vùng biển Phú Quốc với tour du thuyền cao cấp. Giá và lịch trình được cung cấp dựa trên thông tin từ đối tác.',
    partner: 'Đối tác',
    per: 'mỗi người',
    schedule: 'Xem lịch trình',
    included: 'Bao gồm · Không bao gồm',
    policy: 'Chính sách hủy · Trẻ em',
    extraPaid: 'Phụ phí riêng (áp dụng cho Ocean Class)',
    excluded: 'Không bao gồm',
    cancelTitle: 'Hủy và hoàn tiền',
    childTitle: 'Giá vé trẻ em',
    wa: 'Liên hệ qua WhatsApp',
    credit: 'Nguồn ảnh: Marmoris Yachting',
    notice: 'Hoạt động tham quan trên biển phụ thuộc vào thời tiết, điều kiện biển và các yếu tố phát sinh trong ngày. Lịch trình và thời gian dưới đây chỉ mang tính tham khảo và có thể thay đổi tùy theo điều kiện vận hành thực tế.',
  },
}

export function ActivityYachtSection({ locale = 'ko' }: { locale?: Locale }) {
  const ui = UI[locale] ?? UI.en
  const booking = BOOKING_SERVICE_COPY[locale].activities
  return (
    <section className="yachtSection" id="yacht">
      <h2 className="activitiesSectionTitle">{ui.section}</h2>
      <p className="yachtLead">{ui.lead}</p>
      <p className="yachtNotice">{ui.notice}</p>
      <div className="yachtGrid">
        {MARMORIS_YACHT_TOURS.map((t) => (
          <article key={t.id} className="yachtCard">
            <div className="yachtPhoto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.images[0]} alt={pick(t.title, locale)} loading="lazy" />
              <span className="yachtBadge">{pick(t.badge, locale)}</span>
              <span style={{ position: 'absolute', top: 12, right: 12 }}><MustDoBadge locale={locale} /></span>
            </div>
            <div className="yachtThumbs">
              {t.images.slice(1).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
            <div className="yachtBody">
              <p className="yachtOp">{ui.partner} · {t.operator}</p>
              <h3 className="yachtTitle">{pick(t.title, locale)}</h3>
              <div className="yachtMeta">
                <span>{t.hours}</span>
                {t.facts.map((f) => <span key={f.en}>{pick(f, locale)}</span>)}
              </div>
              <div className="yachtTags">
                {t.tags.map((g) => <span key={g.en}>{pick(g, locale)}</span>)}
              </div>
              <ul className="yachtClasses">
                {t.classes.map((c) => (
                  <li key={c.name.en}>
                    <div className="yachtClassMain">
                      <span>
                        <b>{pick(c.name, locale)}</b>
                        <em>{pick(c.deck, locale)}</em>
                      </span>
                      <strong>{c.priceVnd.toLocaleString('en-US')} ₫<small>{ui.per}</small></strong>
                    </div>
                    {c.note && <p className="yachtClassNote">{pick(c.note, locale)}</p>}
                  </li>
                ))}
              </ul>

              <details className="yachtDetails">
                <summary>{ui.schedule}</summary>
                <p className="yachtNote">{pick(t.flow, locale)}</p>
                <ul className="yachtTimeline">
                  {t.steps.map((s) => (
                    <li key={s.time + s.title.en}>
                      <time>{s.time}</time>
                      <div>
                        <b>{pick(s.title, locale)}</b>
                        {s.desc && <span>{pick(s.desc, locale)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
                {t.notes.map((n) => <p key={n.en} className="yachtNote">{pick(n, locale)}</p>)}
              </details>

              <details className="yachtDetails">
                <summary>{ui.included}</summary>
                <ul className="yachtList">
                  {YACHT_INCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.extraPaid}</p>
                <ul className="yachtList">
                  {YACHT_EXTRA_PAID.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
                <p className="yachtSub">{ui.excluded}</p>
                <ul className="yachtList">
                  {YACHT_EXCLUDED.map((i) => <li key={i.en}>{pick(i, locale)}</li>)}
                </ul>
              </details>

              <details className="yachtDetails">
                <summary>{ui.policy}</summary>
                <p className="yachtSub">{ui.cancelTitle}</p>
                {YACHT_CANCELLATION.map((g) => (
                  <div key={g.title.en}>
                    <p className="yachtGroup">{pick(g.title, locale)}</p>
                    <ul className="yachtList">
                      {g.rows.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                    </ul>
                  </div>
                ))}
                <p className="yachtNote">{pick(YACHT_CANCEL_NOTE, locale)}</p>
                <p className="yachtSub">{ui.childTitle}</p>
                <ul className="yachtList">
                  {YACHT_CHILD_POLICY.map((r) => <li key={r.en}>{pick(r, locale)}</li>)}
                </ul>
              </details>

              <div className="yachtCta">
                <a
                  href={`${CONTACT_CONFIG.whatsappUrl}?text=${encodeURIComponent(`${booking.prefillMessage} [${pick(t.title, locale)}] `)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yachtCtaPrimary"
                >
                  {ui.wa}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="yachtCredit">{ui.credit}</p>
      <NoOvercharge locale={locale} />
    </section>
  )
}
