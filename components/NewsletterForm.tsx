"use client"
import { useState, useTransition } from 'react'
import { subscribeNewsletter } from '@/app/actions'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export function NewsletterForm({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  const [msg, setMsg] = useState('')
  const [pending, start] = useTransition()
  const [renderTime] = useState(() => Date.now())
  return (
    <form
      className="newsletterInline"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)
        start(async () => {
          try {
            await subscribeNewsletter(fd)
            form.reset()
            setMsg(dict.home.newsletterSuccess)
          } catch (err) {
            setMsg(err instanceof Error ? err.message : dict.errors.errorTitle)
          }
        })
      }}
    >
      <input
        type="text"
        name="website_url_confirm"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ opacity: 0, position: 'absolute', top: 0, left: '-9999px', zIndex: -1 }}
      />
      <input type="hidden" name="form_render_time" value={renderTime} />
      <input name="full_name" placeholder={dict.home.newsletterNamePlaceholder} />
      <input name="email" type="email" required placeholder={dict.home.newsletterEmailPlaceholder} />
      <label className="consentLine">
        <input name="consent" type="checkbox" value="yes" required /> {dict.home.newsletterConsent}
      </label>
      <button className="primaryButton" disabled={pending}>
        {pending ? dict.home.newsletterSaving : dict.home.newsletterSubmit}
      </button>
      {msg && <small>{msg}</small>}
    </form>
  )
}
