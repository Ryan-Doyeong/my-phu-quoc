"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { submitPartnerApplication } from './actions';
import { localePath, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

type Business = {
  id: string;
  public_name: string;
  slug: string;
};

type Props = {
  initialLang: Locale;
  initialSlot: string;
  businesses: Business[];
};

const VALID_SLOTS = ['featured', 'food', 'fitness', 'cafe', 'community'] as const;
type SlotKey = (typeof VALID_SLOTS)[number];

function getStartMonthOptions() {
  const options = [];
  const now = new Date();
  for (let i = 1; i <= 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const value = `${year}-${month}`;
    const en = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const vi = `Tháng ${month}/${year}`;
    const ko = `${year}년 ${Number(month)}월`;
    options.push({ value, en, vi, ko });
  }
  return options;
}

export function PartnersClient({ initialLang, initialSlot, businesses }: Props) {
  const lang: Locale = initialLang;
  const dict = getDictionary(lang);
  const normalizedInitialSlot = VALID_SLOTS.includes(initialSlot?.toLowerCase() as SlotKey)
    ? (initialSlot.toLowerCase() as SlotKey)
    : '';
  const [selectedSlot, setSelectedSlot] = useState<string>(normalizedInitialSlot);
  const [selectedBusiness, setSelectedBusiness] = useState<string>('');
  const [needsBanner, setNeedsBanner] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [renderTime] = useState(() => Date.now());
  const startMonthOptions = getStartMonthOptions();

  const isVi = lang === 'vi';
  const isKo = lang === 'ko';
  const t = <T,>(enVal: T, viVal: T, koVal: T): T => (isVi ? viVal : isKo ? koVal : enVal);

  useEffect(() => {
    if (normalizedInitialSlot) {
      setSelectedSlot(normalizedInitialSlot);
      const timer = setTimeout(() => {
        const el = document.getElementById('apply');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [normalizedInitialSlot]);

  function handleSlotSelect(slotKey: string) {
    setSelectedSlot(slotKey);
    const sp = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    sp.set('slot', slotKey);
    const qs = sp.toString();
    const base = localePath(lang, '/partners');
    const newUrl = qs ? `${base}?${qs}` : base;
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', newUrl);
    }
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollToApply(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg('');
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await submitPartnerApplication(formData);
      if (!res.success) {
        throw new Error(
          res.error ||
            t(
              'Submission failed. Please try again.',
              'Gửi đăng ký thất bại. Vui lòng thử lại.',
              '신청 전송에 실패했습니다. 다시 시도해 주세요.'
            )
        );
      }
      setSubmitted(true);
      const el = document.getElementById('apply');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: any) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t(
              'Submission failed. Please try again.',
              'Gửi đăng ký thất bại. Vui lòng thử lại.',
              '신청 전송에 실패했습니다. 다시 시도해 주세요.'
            )
      );
    } finally {
      setSubmitting(false);
    }
  }

  const slotOptions = [
    { key: 'featured', en: 'Featured Partner', vi: 'Đối tác Nổi bật', ko: '대표 파트너 (Featured)' },
    { key: 'food', en: 'Food Partner', vi: 'Đối tác Ẩm thực', ko: '미식 파트너 (Food)' },
    { key: 'fitness', en: 'Fitness Partner', vi: 'Đối tác Thể dục', ko: '운동 파트너 (Fitness)' },
    { key: 'cafe', en: 'Café Partner', vi: 'Đối tác Cà phê', ko: '카페 파트너 (Café)' },
    { key: 'community', en: 'Community Partner', vi: 'Đối tác Cộng đồng', ko: '커뮤니티 파트너 (Community)' },
  ];

  return (
    <div className="partnersPage">
      {/* Navigation Header */}
      <header className="detailNav partnersNav">
        <Logo locale={lang} />
        <div className="partnersNavRight">
          <nav className="partnersNavLinks">
            <Link href={localePath(lang, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(lang, '/news')}>{dict.nav.news}</Link>
            <Link href={localePath(lang, '/impact')}>{dict.nav.impact}</Link>
            <Link href={localePath(lang, '/for-businesses')}>{dict.nav.forBusinesses}</Link>
          </nav>
          <LanguageSwitcher locale={lang} variant="light" />
        </div>
      </header>

      <main>
        {/* Section 1: Hero */}
        <section className="partnerHero">
          <div className="shell">
            <span className="eyebrow">
              {t('COMMUNITY PARTNERS', 'ĐỐI TÁC CỘNG ĐỒNG', '커뮤니티 파트너')}
            </span>
            <h1>
              {t(
                'For a beautiful Phu Quoc, together.',
                'Cùng nhau vì một Phú Quốc tươi đẹp.',
                '함께 만들어가는 아름다운 푸꾸옥.'
              )}
            </h1>
            <p className="partnerLead">
              {t(
                'Phu Quoc is where many lives meet — families who have called it home for generations and newcomers from every corner of the world, the café on the corner and the little studio down the lane. We hope the people who share these streets can come to know one another, and live side by side in harmony.',
                'Phú Quốc là nơi nhiều cuộc sống gặp gỡ — những gia đình đã gắn bó nơi đây qua nhiều thế hệ và những người bạn mới đến từ khắp nơi trên thế giới, quán cà phê nơi góc phố và studio nhỏ cuối con hẻm. Chúng tôi mong rằng những người cùng chung con phố có thể hiểu nhau hơn và sống bên nhau thật hài hòa.',
                '푸꾸옥은 오랜 세월 이곳을 터전으로 살아온 가족들과 세계 각지에서 새로 온 이웃들, 골목 모퉁이 카페와 작은 스튜디오까지 다양한 삶이 만나는 동네입니다. 같은 거리를 걷는 이웃들이 서로를 더 잘 알고 조화롭게 살아가길 바랍니다.'
              )}
            </p>
            <div className="partnerHeroActions">
              <a
                href="#apply"
                className="primaryButton partnerCta"
                onClick={scrollToApply}
              >
                {t(
                  'Become a Founding Partner',
                  'Trở thành Đối tác Sáng lập',
                  '창립 커뮤니티 파트너 신청하기'
                )}{' '}
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Why we're here */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('OUR NEIGHBORHOOD', 'KHU PHỐ', '우리 동네 푸꾸옥')}
              </span>
              <h2>
                {t("Why we're here", 'Vì sao chúng tôi ở đây', '우리가 이곳에 있는 이유')}
              </h2>
            </div>
          </div>
          <div className="partnerProseCard">
            <p>
              {t(
                'The same bánh mì stall every morning. A familiar smile at the café. A neighbor who waves as you pass. Small moments like these are what turn a place into home.',
                'Xe bánh mì quen thuộc mỗi sáng. Nụ cười thân quen ở quán cà phê. Người hàng xóm vẫy tay chào khi bạn đi ngang. Chính những khoảnh khắc nhỏ bé ấy biến một nơi chốn thành nhà.',
                '매일 아침 들르는 단골 반미 가판대, 카페에서 건네는 반가운 미소, 지나가며 손을 흔들어 주는 이웃. 이런 작은 순간들이 모여 한 장소를 진정한 집으로 만듭니다.'
              )}
            </p>
            <p>
              {t(
                'My Phu Quoc began as a way to gather those moments — honest information about the businesses that care for this neighborhood, news that matters to the people who live here, and the quiet efforts that make Phu Quoc a little kinder each day.',
                'My Phu Quoc ra đời để gom góp những khoảnh khắc đó — thông tin trung thực về những cơ sở kinh doanh luôn quan tâm đến khu phố, tin tức thiết thực cho người dân nơi đây, và những nỗ lực thầm lặng giúp Phú Quốc mỗi ngày thêm ấm áp.',
                'My Phu Quoc은 이러한 순간들을 모으기 위해 시작되었습니다 — 동네를 아끼는 로컬 비즈니스에 대한 정직한 정보, 주민들에게 꼭 필요한 소식, 그리고 푸꾸옥을 매일 조금씩 더 따뜻하게 만드는 조용한 노력들을 전합니다.'
              )}
            </p>
            <p>
              {t(
                'Whether you live here for a lifetime or a season, we hope you find what you need close by, support the places that support this community, and feel that you belong.',
                'Dù bạn sống ở đây cả đời hay chỉ một mùa, chúng tôi mong bạn tìm được điều mình cần ngay gần bên, ủng hộ những nơi đang chung tay vì cộng đồng, và cảm thấy mình thuộc về nơi này.',
                '이곳에 평생을 머물든 한 계절을 머물든, 가까이에서 필요한 곳을 찾고 지역사회를 응원하는 가게들을 지지하며 이곳의 일원임을 느끼시길 바랍니다.'
              )}
            </p>
          </div>
        </section>

        {/* Section 3: What it means to be a Community Partner */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('PARTNERSHIP', 'ĐỒNG HÀNH', '파트너십 안내')}
              </span>
              <h2>
                {t(
                  'What it means to be a Community Partner',
                  'Đối tác Cộng đồng là gì',
                  '커뮤니티 파트너가 된다는 것'
                )}
              </h2>
            </div>
          </div>
          <div className="partnerProseCard highlightBox">
            <p className="largeLead">
              {t(
                'A Community Partner is a local business that stands with this neighborhood.',
                'Đối tác Cộng đồng là doanh nghiệp địa phương đồng hành cùng khu phố.',
                '커뮤니티 파트너는 푸꾸옥 이웃과 함께 서는 로컬 비즈니스입니다.'
              )}
            </p>
            <p>
              {t(
                'Your support keeps My Phu Quoc free, honest and growing — and makes room for community initiatives that give back to Phu Quoc.',
                'Sự ủng hộ của bạn giúp My Phu Quoc luôn miễn phí, trung thực và phát triển — đồng thời tạo điều kiện cho những hoạt động cộng đồng đóng góp lại cho Phú Quốc.',
                '파트너의 후원은 My Phu Quoc이 누구나 무료로 이용할 수 있는 정직한 플랫폼으로 성장하게 돕고, 푸꾸옥 지역사회에 환원하는 다양한 커뮤니티 활동을 가능하게 합니다.'
              )}
            </p>
          </div>
        </section>

        {/* Section 4: Founding Partners — 3 months, free */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('FOUNDING INITIATIVE', 'ƯU ĐÃI SÁNG LẬP', '창립 파트너 혜택')}
              </span>
              <h2>
                {t(
                  'Founding Partners — 3 months, free',
                  'Đối tác Sáng lập — miễn phí 3 tháng',
                  '창립 파트너 — 첫 3개월 무료'
                )}
              </h2>
              <p>
                {t(
                  'We are opening our first five places to the neighbors who join us at the beginning.',
                  'Chúng tôi dành năm vị trí đầu tiên cho những người hàng xóm đồng hành cùng chúng tôi ngay từ đầu.',
                  '시작을 함께해 주시는 이웃 업체들을 위해 첫 5개 파트너 자리를 오픈합니다.'
                )}
              </p>
            </div>
          </div>
          <div className="partnerGridFour">
            <div className="partnerPointCard">
              <span className="pointNumber">01</span>
              <h3>{t('5 places only', 'Chỉ 5 vị trí', '단 5개 자리 한정')}</h3>
              <p>
                {t(
                  '1 Featured Partner and 4 Category Partners (Food · Fitness · Café · Community)',
                  '1 Đối tác Nổi bật và 4 Đối tác theo Danh mục (Ẩm thực · Thể dục · Cà phê · Cộng đồng)',
                  '대표 파트너 1곳 및 카테고리 파트너 4곳 (미식 · 운동 · 카페 · 커뮤니티)'
                )}
              </p>
            </div>
            <div className="partnerPointCard">
              <span className="pointNumber">02</span>
              <h3>
                {t(
                  'One business per place',
                  'Mỗi vị trí một doanh nghiệp',
                  '자리당 1개 업체 단독 노출'
                )}
              </h3>
              <p>
                {t(
                  'first come, first served after review',
                  'ưu tiên đăng ký trước sau khi được duyệt',
                  '검토 승인 후 선착순 배정'
                )}
              </p>
            </div>
            <div className="partnerPointCard">
              <span className="pointNumber">03</span>
              <h3>
                {t(
                  'Each posting runs for one month',
                  'Mỗi lượt hiển thị kéo dài một tháng',
                  '1개월 단위 게시 운영'
                )}
              </h3>
              <p>
                {t(
                  'and your first three months are free',
                  'và ba tháng đầu hoàn toàn miễn phí',
                  '창립 파트너는 첫 3개월간 전액 무료'
                )}
              </p>
            </div>
            <div className="partnerPointCard">
              <span className="pointNumber">04</span>
              <h3>
                {t(
                  'No payment details needed.',
                  'Không cần thông tin thanh toán.',
                  '결제 정보 입력 불필요'
                )}
              </h3>
              <p>
                {t(
                  'Nothing is ever charged automatically. Before anything changes, we will talk with you first.',
                  'Không có khoản phí tự động nào. Trước mọi thay đổi, chúng tôi sẽ trao đổi với bạn trước.',
                  '자동 결제나 과금이 일절 없습니다. 조건이 변경되기 전에 반드시 먼저 상의드립니다.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Where your place appears */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('PLACEMENT', 'VỊ TRÍ', '노출 위치')}
              </span>
              <h2>
                {t('Where your place appears', 'Vị trí hiển thị', '파트너 배너가 표시되는 곳')}
              </h2>
              <p>
                {t(
                  'Your banner appears in the Community Partners section near the top of our homepage, marked clearly as SPONSORED. Visitors who tap it are taken to your business page in our directory.',
                  'Banner của bạn xuất hiện trong mục Community Partners gần đầu trang chủ, được ghi rõ là SPONSORED. Khi khách nhấn vào, họ sẽ được đưa đến trang doanh nghiệp của bạn trong danh bạ.',
                  '파트너 배너는 홈페이지 상단 커뮤니티 파트너 섹션에 SPONSORED(후원) 표시와 함께 노출됩니다. 방문자가 배너를 누르면 디렉토리 내 업체 상세 페이지로 연결됩니다.'
                )}
              </p>
            </div>
          </div>
          <div className="partnerSlotsGrid">
            {slotOptions.map((s) => {
              const isSelected = selectedSlot === s.key;
              return (
                <button
                  type="button"
                  key={s.key}
                  className={`partnerSlotCard ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSlotSelect(s.key)}
                >
                  <div className="slotCardTop">
                    <span className="slotBadge">
                      {t('available', 'còn trống', '신청 가능')}
                    </span>
                    {isSelected && (
                      <span className="slotSelectedPill">
                        {t('Selected', 'Đang chọn', '선택됨')}
                      </span>
                    )}
                  </div>
                  <h3>{t(s.en, s.vi, s.ko)}</h3>
                  <p className="slotActionText">
                    {t('Choose this place →', 'Chọn vị trí này →', '이 자리 선택하기 →')}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 6: Our promises */}
        <section className="shell partnerSection" id="promises">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('OUR VALUES', 'NGUYÊN TẮC', '핵심 원칙')}
              </span>
              <h2>
                {t('Our promises', 'Cam kết của chúng tôi', '우리의 약속')}
              </h2>
            </div>
          </div>
          <div className="partnerGridTwo">
            <div className="partnerPromiseCard">
              <span className="promiseCheck">✓</span>
              <div>
                <h3>
                  {t('Always clearly labeled.', 'Luôn ghi rõ.', '언제나 명확하게 표시합니다.')}
                </h3>
                <p>
                  {t(
                    'Every partner placement is marked SPONSORED.',
                    'Mọi vị trí đối tác đều được đánh dấu SPONSORED.',
                    '모든 파트너 배너에는 SPONSORED(후원) 라벨이 명확히 표시됩니다.'
                  )}
                </p>
              </div>
            </div>
            <div className="partnerPromiseCard">
              <span className="promiseCheck">✓</span>
              <div>
                <h3>
                  {t(
                    'Honest information comes first.',
                    'Thông tin trung thực là trên hết.',
                    '정직한 정보가 최우선입니다.'
                  )}
                </h3>
                <p>
                  {t(
                    'Partnership never changes directory order, labels such as Recommended, New or HOT, or our news.',
                    'Việc làm đối tác không thay đổi thứ tự danh bạ, các nhãn như Recommended, New hay HOT, cũng như tin tức.',
                    '파트너십 여부는 디렉토리 노출 순서나 Recommended, New, HOT 같은 에디토리얼 라벨, 뉴스 기사에 영향을 주지 않습니다.'
                  )}
                </p>
              </div>
            </div>
            <div className="partnerPromiseCard">
              <span className="promiseCheck">✓</span>
              <div>
                <h3>
                  {t(
                    'Local and verified.',
                    'Địa phương và đã xác minh.',
                    '검증된 푸꾸옥 로컬 업체만 함께합니다.'
                  )}
                </h3>
                <p>
                  {t(
                    'Only businesses we have reviewed and confirmed in Phu Quoc can become partners.',
                    'Chỉ những doanh nghiệp tại Phú Quốc đã được chúng tôi xem xét và xác nhận mới có thể trở thành đối tác.',
                    '에디터가 직접 검토하고 확인한 푸꾸옥 지역 비즈니스만 파트너로 참여할 수 있습니다.'
                  )}
                </p>
              </div>
            </div>
            <div className="partnerPromiseCard">
              <span className="promiseCheck">✓</span>
              <div>
                <h3>
                  {t(
                    'A good fit for the neighborhood.',
                    'Phù hợp với khu phố.',
                    '동네 분위기와 어울리는 곳과 함께합니다.'
                  )}
                </h3>
                <p>
                  {t(
                    "We may kindly decline partnerships that don't suit the community.",
                    'Chúng tôi có thể từ chối những hợp tác không phù hợp với cộng đồng.',
                    '지역 커뮤니티의 성격과 맞지 않는 제휴는 정중히 거절할 수 있습니다.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: How to join */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('HOW IT WORKS', 'QUY TRÌNH', '참여 방법')}
              </span>
              <h2>{t('How to join', 'Cách tham gia', '참여 절차')}</h2>
            </div>
          </div>
          <div className="partnerStepsList">
            <div className="partnerStepItem">
              <span className="stepNum">1</span>
              <div>
                <h3>
                  {t('List your business', 'Đăng ký doanh nghiệp', '업체 등록')}
                </h3>
                <p>
                  {t(
                    "Not listed yet? You can still apply — we'll review your listing and partnership together.",
                    'Chưa có trong danh bạ? Bạn vẫn có thể gửi đơn — chúng tôi sẽ xem xét doanh nghiệp và việc hợp tác cùng lúc.',
                    '아직 디렉토리에 없나요? 그래도 신청하실 수 있습니다 — 업체 등록과 파트너십을 함께 검토해 드립니다.'
                  )}
                </p>
              </div>
            </div>
            <div className="partnerStepItem">
              <span className="stepNum">2</span>
              <div>
                <h3>{t('Choose your place', 'Chọn vị trí', '원하는 자리 선택')}</h3>
                <p>
                  {t(
                    'and send a short application below.',
                    'và gửi đơn đăng ký ngắn bên dưới.',
                    '아래 간단한 신청서를 작성해 보내주세요.'
                  )}
                </p>
              </div>
            </div>
            <div className="partnerStepItem">
              <span className="stepNum">3</span>
              <div>
                <h3>
                  {t(
                    'We review and get in touch',
                    'Chúng tôi xem xét và liên hệ',
                    '검토 후 개별 안내'
                  )}
                </h3>
                <p>
                  {t('usually within a few days.', 'thường trong vài ngày.', '보통 며칠 내로 연락드립니다.')}
                </p>
              </div>
            </div>
            <div className="partnerStepItem">
              <span className="stepNum">4</span>
              <div>
                <h3>
                  {t('Your banner goes live', 'Banner được hiển thị', '배너 게시 시작')}
                </h3>
                <p>
                  {t(
                    "for one month at a time, and we'll check in with you each month.",
                    'theo từng tháng, và chúng tôi sẽ liên lạc với bạn mỗi tháng.',
                    '1개월 단위로 게시되며 매달 연장 여부를 함께 확인합니다.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: FAQ */}
        <section className="shell partnerSection">
          <div className="sectionIntro">
            <div>
              <span className="eyebrow">
                {t('QUESTIONS', 'HỎI ĐÁP', '자주 묻는 질문')}
              </span>
              <h2>{t('FAQ', 'Câu hỏi thường gặp', 'FAQ')}</h2>
            </div>
          </div>
          <div className="partnerFaqGrid">
            <div className="partnerFaqItem">
              <h3>
                {t(
                  "I don't have a banner image.",
                  'Tôi chưa có hình banner.',
                  '배너 이미지가 없어도 되나요?'
                )}
              </h3>
              <p>
                {t(
                  'No problem. We can create a simple banner from your listing photos.',
                  'Không sao. Chúng tôi có thể làm banner đơn giản từ ảnh trong trang doanh nghiệp của bạn.',
                  '걱정하지 마세요. 업체 사진으로 깔끔한 배너를 직접 제작해 드립니다.'
                )}
              </p>
            </div>
            <div className="partnerFaqItem">
              <h3>
                {t(
                  'Can I choose my place?',
                  'Tôi có thể chọn vị trí không?',
                  '원하는 자리를 지정할 수 있나요?'
                )}
              </h3>
              <p>
                {t(
                  'Yes, if it is still available. Each place holds one business at a time.',
                  'Có, nếu vị trí đó còn trống. Mỗi vị trí chỉ dành cho một doanh nghiệp.',
                  '네, 비어 있는 자리가 있다면 선택하실 수 있습니다. 각 자리에는 한 번에 한 업체만 게시됩니다.'
                )}
              </p>
            </div>
            <div className="partnerFaqItem">
              <h3>
                {t(
                  'What happens after three months?',
                  'Sau ba tháng thì sao?',
                  '3개월 무료 기간이 끝나면 어떻게 되나요?'
                )}
              </h3>
              <p>
                {t(
                  "We'll reach out before your free period ends. You are free to stop at any time.",
                  'Chúng tôi sẽ liên hệ trước khi thời gian miễn phí kết thúc. Bạn có thể dừng bất cứ lúc nào.',
                  '무료 기간 종료 전에 미리 연락드립니다. 언제든 부담 없이 중단하실 수 있습니다.'
                )}
              </p>
            </div>
            <div className="partnerFaqItem">
              <h3>
                {t(
                  'Can I change my banner?',
                  'Tôi có thể đổi banner không?',
                  '중간에 배너를 변경할 수 있나요?'
                )}
              </h3>
              <p>
                {t(
                  'Yes, just let us know.',
                  'Có, chỉ cần báo cho chúng tôi.',
                  '네, 언제든 말씀해 주시면 변경해 드립니다.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Application Form (Section ID: apply) */}
        <section className="shell partnerSection" id="apply">
          <div className="partnerFormCard">
            <div className="partnerFormHeader">
              <span className="eyebrow">
                {t('APPLICATION', 'ĐĂNG KÝ', '파트너 신청서')}
              </span>
              <h2>
                {t(
                  'Become a Founding Partner',
                  'Trở thành Đối tác Sáng lập',
                  '창립 커뮤니티 파트너 신청'
                )}
              </h2>
            </div>

            {submitted ? (
              <div className="partnerSuccessBox">
                <div className="successCheckmark">✓</div>
                <h3>
                  {t(
                    "Thank you, neighbor. We've received your application and will be in touch soon.",
                    'Cảm ơn bạn, người hàng xóm. Chúng tôi đã nhận được đơn và sẽ sớm liên hệ.',
                    '감사합니다, 이웃님. 신청서가 정상적으로 접수되었으며 곧 연락드리겠습니다.'
                  )}
                </h3>
                <button
                  type="button"
                  className="outlineDark"
                  onClick={() => setSubmitted(false)}
                >
                  {t(
                    'Submit another application',
                    'Gửi đăng ký khác',
                    '다른 신청서 작성하기'
                  )}
                </button>
              </div>
            ) : (
              <form className="partnerForm" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website_url_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ opacity: 0, position: 'absolute', top: 0, left: '-9999px', zIndex: -1 }}
                />
                <input type="hidden" name="form_render_time" value={renderTime} />
                <input type="hidden" name="lang" value={lang === 'vi' ? 'vi' : 'en'} />

                {errorMsg && (
                  <div className="partnerErrorBox">
                    <p>{errorMsg}</p>
                  </div>
                )}

                {/* Business selection */}
                <div className="formField">
                  <label htmlFor="business_select">
                    {t(
                      'Your business *',
                      'Doanh nghiệp của bạn *',
                      '운영 중인 업체 선택 *'
                    )}
                  </label>
                  <select
                    id="business_select"
                    name="business_id"
                    required={selectedBusiness !== 'unlisted'}
                    value={selectedBusiness}
                    onChange={(e) => setSelectedBusiness(e.target.value)}
                  >
                    <option value="">
                      {t(
                        '— Select your listed business —',
                        '— Chọn doanh nghiệp đã có trong danh bạ —',
                        '— 디렉토리에 등재된 업체를 선택하세요 —'
                      )}
                    </option>
                    {businesses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.public_name}
                      </option>
                    ))}
                    <option value="unlisted">
                      {t(
                        "My business isn't listed yet",
                        'Doanh nghiệp của tôi chưa có trong danh bạ',
                        '아직 디렉토리에 등록되지 않은 업체입니다'
                      )}
                    </option>
                  </select>

                  {selectedBusiness === 'unlisted' && (
                    <div className="unlistedFieldsContainer">
                      <div className="formField" style={{ marginTop: '12px' }}>
                        <label htmlFor="unlisted_business_name">
                          {t('Business name *', 'Tên doanh nghiệp *', '업체명 *')}
                        </label>
                        <input
                          type="text"
                          id="unlisted_business_name"
                          name="unlisted_business_name"
                          required={selectedBusiness === 'unlisted'}
                          placeholder={t(
                            'Enter your business name',
                            'Nhập tên doanh nghiệp của bạn',
                            '업체 이름을 입력해 주세요'
                          )}
                        />
                      </div>

                      <div className="formField" style={{ marginTop: '12px' }}>
                        <label htmlFor="unlisted_maps_url">
                          {t(
                            'Google Maps link (optional)',
                            'Link Google Maps (không bắt buộc)',
                            'Google 지도 링크 (선택)'
                          )}
                        </label>
                        <input
                          type="url"
                          id="unlisted_maps_url"
                          name="unlisted_maps_url"
                          placeholder="https://maps.google.com/..."
                        />
                      </div>

                      <div className="unlistedNoticeBox">
                        <p>
                          {isVi ? (
                            <>
                              Không sao — thứ tự của bạn được giữ từ lúc gửi đơn. Vui lòng đăng ký doanh nghiệp tại{' '}
                              <Link href={localePath(lang, '/for-businesses')}>Dành cho doanh nghiệp</Link> để chúng tôi xem xét. Banner sẽ được hiển thị sau khi doanh nghiệp được duyệt.
                            </>
                          ) : isKo ? (
                            <>
                              걱정하지 마세요 — 신청 시점부터 대기 순번이 확보됩니다. 검토를 위해{' '}
                              <Link href={localePath(lang, '/for-businesses')}>업체 등록 페이지</Link>에서도 업체 정보를 함께 제출해 주세요. 업체 등재가 승인되면 배너가 게시됩니다.
                            </>
                          ) : (
                            <>
                              No problem — your place in line is saved from the moment you apply. Please also submit your listing at{' '}
                              <Link href={localePath(lang, '/for-businesses')}>For Businesses</Link> so we can review it. Your banner goes live once your listing is approved.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="formField">
                  <label htmlFor="contact_name">
                    {t('Your name *', 'Họ tên *', '담당자 성함 *')}
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="contact_name"
                    required
                    placeholder={t('Your full name', 'Họ và tên', '성함을 입력해 주세요')}
                  />
                </div>

                {/* Email */}
                <div className="formField">
                  <label htmlFor="contact_email">Email *</label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    required
                    placeholder="email@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="formField">
                  <label htmlFor="contact_phone">
                    {t(
                      'Phone / Zalo / WhatsApp *',
                      'Điện thoại / Zalo / WhatsApp *',
                      '전화번호 / Zalo / 카카오톡 *'
                    )}
                  </label>
                  <input
                    type="text"
                    id="contact_phone"
                    name="contact_phone"
                    required
                    placeholder={t(
                      '+84 ... or phone number',
                      'Số điện thoại / Zalo',
                      '+84 ... 또는 연락처'
                    )}
                  />
                </div>

                {/* Place selection */}
                <div className="formField">
                  <label htmlFor="slot_select">
                    {t(
                      "Place you'd like * — Featured / Food / Fitness / Café / Community",
                      'Vị trí mong muốn * (Nổi bật / Ẩm thực / Thể dục / Cà phê / Cộng đồng)',
                      '희망 파트너 자리 * (대표 / 미식 / 운동 / 카페 / 커뮤니티)'
                    )}
                  </label>
                  <select
                    id="slot_select"
                    name="slot"
                    required
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                  >
                    <option value="">
                      {t(
                        '— Select a place —',
                        '— Chọn vị trí mong muốn —',
                        '— 희망 자리를 선택하세요 —'
                      )}
                    </option>
                    {slotOptions.map((s) => (
                      <option key={s.key} value={s.key}>
                        {t(s.en, s.vi, s.ko)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred start month */}
                <div className="formField">
                  <label htmlFor="start_month">
                    {t(
                      'Preferred start month',
                      'Tháng muốn bắt đầu',
                      '희망 시작 월 (선택)'
                    )}
                  </label>
                  <select id="start_month" name="start_month" defaultValue="">
                    <option value="">
                      {t(
                        '— Select start month (optional) —',
                        '— Chọn tháng bắt đầu (tuỳ chọn) —',
                        '— 시작 월 선택 (선택 사항) —'
                      )}
                    </option>
                    {startMonthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {t(opt.en, opt.vi, opt.ko)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Banner image upload */}
                <div className="formField">
                  <label htmlFor="banner_image">
                    {t(
                      'Banner image (optional, JPG/PNG/WebP)',
                      'Hình banner (không bắt buộc)',
                      '배너 이미지 (선택, JPG/PNG/WebP)'
                    )}
                  </label>
                  <input
                    type="file"
                    id="banner_image"
                    name="banner_file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setFileName(f ? f.name : '');
                    }}
                  />
                  {fileName && (
                    <small className="fieldHint">
                      {t('Selected file: ', 'Đã chọn tệp: ', '선택된 파일: ')}
                      <strong>{fileName}</strong>
                    </small>
                  )}
                </div>

                {/* Create banner checkbox */}
                <div className="formCheckboxField">
                  <label>
                    <input
                      type="checkbox"
                      name="needs_banner"
                      checked={needsBanner}
                      onChange={(e) => setNeedsBanner(e.target.checked)}
                    />
                    <span>
                      {t(
                        'Please create a banner for me',
                        'Nhờ làm banner giúp tôi',
                        '업체 사진으로 배너 제작을 요청합니다'
                      )}
                    </span>
                  </label>
                </div>

                {/* Message */}
                <div className="formField">
                  <label htmlFor="message">
                    {t('Message (optional)', 'Lời nhắn', '남기실 말씀 (선택)')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t(
                      'Any notes or questions for our team (optional)...',
                      'Ghi chú thêm cho ban quản trị (không bắt buộc)...',
                      '운영진에게 전달할 메모나 문의 사항을 적어주세요 (선택)...'
                    )}
                  />
                </div>

                {/* Agreement checkbox */}
                <div className="formCheckboxField requiredAgreement">
                  <label>
                    <input type="checkbox" name="agreed_promises" required />
                    <span>
                      {t(
                        'I have read and agree to the partner promises *',
                        'Tôi đã đọc và đồng ý với các cam kết đối tác *',
                        '파트너십 핵심 원칙과 약속을 읽었으며 이에 동의합니다 *'
                      )}
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="formSubmitRow">
                  <button
                    type="submit"
                    className="primaryButton partnerSubmitBtn"
                    disabled={submitting}
                  >
                    {submitting
                      ? t('Sending…', 'Đang gửi…', '전송 중…')
                      : t('Send application', 'Gửi đăng ký', '신청서 보내기')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Section 10: Closing */}
        <section className="partnerClosingSection">
          <div className="shell">
            <h2>
              {t(
                'Good neighbors make a good life.',
                'Hàng xóm tốt làm nên cuộc sống tốt.',
                '좋은 이웃이 좋은 삶을 만듭니다.'
              )}
            </h2>
            <p>
              {t(
                'Thank you for helping Phu Quoc stay a place where everyone can belong.',
                'Cảm ơn bạn đã cùng giữ cho Phú Quốc là nơi ai cũng có thể thuộc về.',
                '푸꾸옥이 누구에게나 따뜻한 삶의 터전이 될 수 있도록 함께해 주셔서 감사합니다.'
              )}
            </p>
            <a
              href="#apply"
              className="primaryButton partnerClosingCta"
              onClick={scrollToApply}
            >
              {t(
                'Become a Founding Partner',
                'Trở thành Đối tác Sáng lập',
                '창립 커뮤니티 파트너 신청하기'
              )}{' '}
              <span>→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
