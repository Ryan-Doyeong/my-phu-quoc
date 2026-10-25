"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { submitBusinessIntake } from '@/app/for-businesses/actions'
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CATEGORY_KEYS,
  categoryLabel,
  type DirectoryCategory,
} from '@/lib/directory'
import { localePath, type Locale } from '@/lib/i18n/config'
import { getDictionary, translateTerm } from '@/lib/i18n/dictionaries'

export function ForBusinessesClient({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  const [initName, setInitName] = useState('')
  const [initAddress, setInitAddress] = useState('')
  const [deliveryAvailable, setDeliveryAvailable] = useState(false)

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    if (sp.has('public_name')) {
      setInitName(sp.get('public_name') || '')
      const el = document.querySelector('input[name="public_name"]') as HTMLInputElement
      if (el) el.value = sp.get('public_name') || ''
    }
    if (sp.has('address')) {
      setInitAddress(sp.get('address') || '')
      const el = document.querySelector('textarea[name="address"]') as HTMLTextAreaElement
      if (el) el.value = sp.get('address') || ''
    }
  }, [])

  const [msg, setMsg] = useState('')
  const [pending, setPending] = useState(false)
  const [progress, setProgress] = useState('')
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState<DirectoryCategory>('wellness')
  const [aiMsg, setAiMsg] = useState('')
  const [aiPending, setAiPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function createAiDraft() {
    const form = formRef.current
    if (!form) return
    setAiPending(true)
    setAiMsg(dict.intake.aiDraftCreating)
    try {
      const fd = new FormData(form)
      const r = await fetch('/api/ai/business-draft', { method: 'POST', body: fd })
      const data = await r.json()
      if (!r.ok || !data.ok) throw new Error(data.message || dict.errors.errorTitle)
      const box = form.elements.namedItem('description_en') as HTMLTextAreaElement | null
      if (box) box.value = data.draft || ''
      setAiMsg(
        locale === 'vi'
          ? 'Đã tạo bản nháp bằng AI. Vui lòng kiểm tra trước khi gửi.'
          : locale === 'ko'
          ? 'AI 초안이 생성되었습니다. 제출 전 내용을 확인·수정해 주세요.'
          : 'AI draft ready. You can edit it before submitting.'
      )
    } catch (e) {
      setAiMsg(e instanceof Error ? e.message : dict.errors.errorTitle)
    } finally {
      setAiPending(false)
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const files = fd
      .getAll('business_photos')
      .filter((x): x is File => x instanceof File && x.size > 0)
    if (files.length < 3 || files.length > 5) {
      setMsg(dict.intake.errPhotosCount)
      return
    }
    if (files.some((f) => f.size > 10_000_000)) {
      setMsg(dict.intake.errPhotoSize)
      return
    }
    setPending(true)
    setMsg('')
    setProgress(dict.intake.uploadingProgress)
    try {
      const res = await submitBusinessIntake(fd)
      if (!res || !res.success)
        throw new Error((res as any)?.error || dict.errors.errorTitle)
      form.reset()
      setCount(0)
      setCategory('wellness')
      setDeliveryAvailable(false)
      setProgress('')
      setMsg(dict.intake.successMsg)
    } catch (err) {
      setProgress('')
      setMsg(err instanceof Error ? err.message : dict.errors.errorTitle)
    } finally {
      setPending(false)
    }
  }

  const [renderTime] = useState(() => Date.now())

  return (
    <main className="businessIntakePage">
      <header className="detailNav">
        <Logo locale={locale} />
        <div className="detailNavRight">
          <nav>
            <Link href={localePath(locale, '/')}>{dict.nav.home}</Link>
            <Link href={localePath(locale, '/directory/wellness')}>{dict.nav.directory}</Link>
            <Link href={localePath(locale, '/partners')}>{dict.nav.partners}</Link>
          </nav>
          <LanguageSwitcher locale={locale} variant="light" />
        </div>
      </header>
      <section className="intakeHero">
        <div>
          <span className="eyebrow">{dict.intake.eyebrow}</span>
          <h1>{dict.intake.title}</h1>
          <p>{dict.intake.lead}</p>
        </div>
      </section>
      <section className="shell intakeGrid">
        <form ref={formRef} className="intakeForm" onSubmit={submit}>
          <div className="mediaDisclosure pilotNoticeBanner" role="note">
            <strong>{dict.intake.pilotNoticeTitle}</strong> {dict.intake.pilotNoticeBody1}{' '}
            <strong>{dict.intake.pilotNoticeArea1}</strong> {dict.intake.pilotNoticeBody2}{' '}
            <strong>{dict.intake.pilotNoticeArea2}</strong> {dict.intake.pilotNoticeBody3}
          </div>
          <input
            type="text"
            name="website_url_confirm"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ opacity: 0, position: 'absolute', top: 0, left: '-9999px', zIndex: -1 }}
          />
          <input type="hidden" name="form_render_time" value={renderTime} />

          {/* Section 01 */}
          <div className="formSection">
            <span>01</span>
            <div>
              <h2>{dict.intake.sec1Title}</h2>
              <label>
                {dict.intake.contactName}
                <input name="contact_name" />
              </label>
              <label>
                {dict.intake.contactEmail}
                <input type="email" name="contact_email" required />
              </label>
              <label>
                {dict.intake.publicName}
                <input name="public_name" required defaultValue={initName} />
              </label>
            </div>
          </div>

          {/* Section 02 */}
          <div className="formSection">
            <span>02</span>
            <div>
              <h2>{dict.intake.sec2Title}</h2>
              <label>
                {dict.intake.publicAddress}
                <textarea
                  name="address"
                  rows={3}
                  required
                  placeholder={dict.intake.addressPlaceholder}
                  defaultValue={initAddress}
                />
              </label>
              <label>
                {dict.intake.gmapsName}
                <input
                  name="google_maps_name"
                  placeholder={dict.intake.gmapsNamePlaceholder}
                />
              </label>
              <label>
                {dict.intake.gmapsUrl} <small>{dict.intake.gmapsUrlHint}</small>
                <input type="url" name="google_maps_url" />
              </label>
              <div className="formTwo">
                <label>
                  {dict.intake.categoryLabel}
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DirectoryCategory)}
                  >
                    {DIRECTORY_CATEGORY_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {categoryLabel(key, locale)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  {dict.intake.conceptLabel}
                  <select key={category} name="subcategory" defaultValue="" required>
                    <option value="" disabled>
                      {dict.intake.selectConcept}
                    </option>
                    {DIRECTORY_CATEGORIES[category].subcategories.map((x) => (
                      <option key={x} value={x}>
                        {translateTerm(x, locale)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                {dict.intake.tagsLabel}
                <input
                  name="tags"
                  placeholder={
                    category === 'dining'
                      ? 'e.g. Seafood, Family Friendly, Sea View'
                      : category === 'bars'
                      ? 'e.g. Sunset View, Live Music, Cocktails'
                      : category === 'hotels'
                      ? 'e.g. Beachfront, Pool Villa, Breakfast Included'
                      : category === 'shopping'
                      ? 'e.g. Pearls, Souvenirs, Local Specialties'
                      : category === 'activities'
                      ? 'e.g. Island Hopping, Show, Family Friendly'
                      : category === 'beach'
                      ? 'e.g. Sun Loungers, Quiet, Water Sports'
                      : category === 'wellness'
                      ? 'e.g. Massage, Nail Art, Sunburn Care'
                      : 'e.g. Scooter Rental, Taxi, Pharmacy, Money Exchange'
                  }
                />
                <small>{dict.intake.tagsHint}</small>
              </label>
              <div className="formTwo">
                <label>
                  {dict.intake.priceLevelLabel}
                  <select name="price_level" defaultValue="">
                    <option value="">{dict.intake.notSpecified}</option>
                    <option value="₫">₫</option>
                    <option value="₫₫">₫₫</option>
                    <option value="₫₫₫">₫₫₫</option>
                    <option value="₫₫₫₫">₫₫₫₫</option>
                  </select>
                </label>
                <label>
                  {dict.intake.phoneLabel}
                  <input name="phone" />
                </label>
              </div>
              <label>
                {dict.intake.openingHoursLabel}
                <input
                  name="opening_hours"
                  placeholder={dict.intake.openingHoursPlaceholder}
                />
              </label>
              <label>
                {dict.intake.introPrimaryLabel}
                <textarea
                  name="description_en"
                  rows={4}
                  placeholder={dict.intake.introPrimaryPlaceholder}
                />
              </label>
              <details style={{ marginTop: '8px' }}>
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'var(--accent)',
                  }}
                >
                  {dict.intake.introMultiToggle}
                </summary>
                <p className="fieldHelp" style={{ marginTop: '8px' }}>
                  {dict.intake.introMultiNote}
                </p>
                <label style={{ marginTop: '10px', display: 'block' }}>
                  {dict.intake.introViLabel}
                  <textarea
                    name="description_vi"
                    rows={3}
                    placeholder={dict.intake.introPrimaryPlaceholder}
                  />
                </label>
                <label style={{ marginTop: '10px', display: 'block' }}>
                  {dict.intake.introKoLabel}
                  <textarea
                    name="description_ko"
                    rows={3}
                    placeholder={dict.intake.introPrimaryPlaceholder}
                  />
                </label>
              </details>
            </div>
          </div>

          {/* Section 03 */}
          <div className="formSection">
            <span>03</span>
            <div>
              <h2>{dict.intake.sec3Title}</h2>
              <p className="fieldHelp">{dict.intake.photoHelp}</p>
              <label className="photoDrop">
                {dict.intake.photoDropLabel}
                <input
                  type="file"
                  name="business_photos"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  multiple
                  required
                  onChange={(e) => setCount(e.currentTarget.files?.length || 0)}
                />
                <strong>{dict.intake.photoSelected(count)}</strong>
              </label>
              <small>{dict.intake.photoFormatHint}</small>
              <div className="aiDraftRow">
                <button
                  type="button"
                  className="outlineDark"
                  disabled={aiPending}
                  onClick={createAiDraft}
                >
                  {aiPending ? dict.intake.aiDraftCreating : dict.intake.aiDraftBtn}
                </button>
                {aiMsg && <small>{aiMsg}</small>}
              </div>
            </div>
          </div>

          {/* Section 04: Website, Social & Direct Contact (Merged with /kr/join messaging & delivery) */}
          <div className="formSection">
            <span>04</span>
            <div>
              <h2>{dict.intake.sec4Title}</h2>
              <p className="fieldHelp">{dict.intake.socialHelp}</p>
              <label>
                {dict.intake.websiteLabel}
                <input name="website_url" type="url" placeholder="https://yourbusiness.com" />
              </label>
              <label>
                {dict.intake.facebookLabel}
                <input
                  name="facebook_url"
                  placeholder="@yourbusiness or facebook.com/yourbusiness"
                />
              </label>
              <label>
                {dict.intake.instagramLabel}
                <input
                  name="instagram_url"
                  placeholder="@yourbusiness or instagram.com/yourbusiness"
                />
              </label>
              <label>
                {dict.intake.tiktokLabel}
                <input
                  name="tiktok_url"
                  placeholder="@yourbusiness or tiktok.com/@yourbusiness"
                />
              </label>
              <div className="formTwo" style={{ marginTop: '10px' }}>
                <label>
                  {dict.intake.zaloLabel}
                  <input name="zalo_phone" placeholder={dict.intake.zaloPlaceholder} />
                </label>
                <label>
                  {dict.intake.kakaoLabel}
                  <input name="kakao_openchat_url" placeholder={dict.intake.kakaoPlaceholder} />
                </label>
              </div>
              <label style={{ marginTop: '10px', display: 'block' }}>
                {dict.intake.messengerLabel}
                <input name="messenger_url" placeholder={dict.intake.messengerPlaceholder} />
              </label>

              {/* Delivery options merged from /kr/join */}
              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <strong style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                  {dict.intake.deliveryToggleTitle}
                </strong>
                <label className="inlineCheck">
                  <input
                    type="checkbox"
                    name="delivery_available"
                    value="yes"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                  />
                  <span>{dict.intake.deliveryYes}</span>
                </label>
                {deliveryAvailable && (
                  <div className="formTwo" style={{ marginTop: '10px' }}>
                    <label>
                      {dict.intake.deliveryModeLabel}
                      <select name="delivery_mode" defaultValue="self">
                        <option value="self">{dict.intake.deliveryModeSelf}</option>
                        <option value="driver">{dict.intake.deliveryModeDriver}</option>
                        <option value="pickup_only">{dict.intake.deliveryModePickup}</option>
                      </select>
                    </label>
                    <label>
                      {dict.intake.deliveryAreaLabel}
                      <input
                        name="delivery_area"
                        placeholder={dict.intake.deliveryAreaPlaceholder}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="primaryButton intakeSubmit" disabled={pending}>
            {pending ? dict.intake.submittingBtn : dict.intake.submitBtn}
          </button>
          {progress && <p className="formMessage">{progress}</p>}
          {msg && <p className="formMessage">{msg}</p>}
        </form>

        <aside className="intakeAside">
          <h2>{dict.intake.asideTitle}</h2>
          <ol>
            {dict.intake.asideSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <div className="fairListingBox">
            <strong>{dict.intake.fairBoxTitle}</strong>
            <p>{dict.intake.fairBoxDesc}</p>
          </div>
          <p
            className="partnerNoticeLine"
            style={{ marginTop: '16px', fontSize: '13px', lineHeight: 1.5 }}
          >
            {dict.intake.partnerPrompt}{' '}
            <Link
              href={localePath(locale, '/partners')}
              style={{
                color: 'var(--accent)',
                fontWeight: 700,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {dict.intake.partnerLink}
            </Link>
          </p>
        </aside>
      </section>
    </main>
  )
}
