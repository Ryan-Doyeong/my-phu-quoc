"use client"

import { useState, useTransition } from 'react'
import type { ReactNode } from 'react'
import { submitSuggestion, submitVolunteer } from '@/app/actions'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

function SubmitButton({
  pending,
  sendingLabel,
  children,
}: {
  pending: boolean
  sendingLabel: string
  children: ReactNode
}) {
  return (
    <button className="primaryButton" type="submit" disabled={pending}>
      {pending ? sendingLabel : children}
    </button>
  )
}

type SuggestionFormProps = {
  locale?: Locale
  types?: string[]
  messageLabel?: string
  messagePlaceholder?: string
  buttonLabel?: string
  successMessage?: string
}

export function SuggestionForm({
  locale = 'en',
  types,
  messageLabel,
  messagePlaceholder,
  buttonLabel,
  successMessage,
}: SuggestionFormProps = {}) {
  const dict = getDictionary(locale)
  const resolvedTypes = types || dict.forms.suggestionTypes
  const resolvedMessageLabel = messageLabel || dict.forms.yourMessage
  const resolvedButtonLabel = buttonLabel || dict.forms.shareSuggestion
  const resolvedSuccessMessage = successMessage || dict.forms.suggestionSuccess

  const [message, setMessage] = useState('')
  const [pending, start] = useTransition()
  const [renderTime] = useState(() => Date.now())
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const f = e.currentTarget
        const fd = new FormData(f)
        start(async () => {
          try {
            await submitSuggestion(fd)
            f.reset()
            setMessage(resolvedSuccessMessage)
          } catch (err) {
            setMessage(err instanceof Error ? err.message : dict.errors.errorTitle)
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
      <label>
        {dict.forms.name}
        <input name="name" />
      </label>
      <label>
        {dict.forms.email}
        <input type="email" name="email" required />
      </label>
      <label>
        {dict.forms.type}
        <select name="type">
          {resolvedTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        {resolvedMessageLabel}
        <textarea name="message" rows={5} required placeholder={messagePlaceholder} />
      </label>
      <SubmitButton pending={pending} sendingLabel={dict.forms.sending}>
        {resolvedButtonLabel}
      </SubmitButton>
      {message && <p className="formMessage">{message}</p>}
    </form>
  )
}

export function VolunteerForm({ locale = 'en' }: { locale?: Locale }) {
  const dict = getDictionary(locale)
  const [message, setMessage] = useState('')
  const [pending, start] = useTransition()
  const [renderTime] = useState(() => Date.now())
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const f = e.currentTarget
        const fd = new FormData(f)
        start(async () => {
          try {
            await submitVolunteer(fd)
            f.reset()
            setMessage(dict.forms.volunteerSuccess)
          } catch (err) {
            setMessage(err instanceof Error ? err.message : dict.errors.errorTitle)
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
      <label>
        {dict.forms.name}
        <input name="name" />
      </label>
      <label>
        {dict.forms.email}
        <input type="email" name="email" required />
      </label>
      <label>
        {dict.forms.volunteerArea}
        <select name="area">
          {dict.forms.volunteerAreas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label>
        {dict.forms.howToHelp}
        <textarea name="message" rows={5} required />
      </label>
      <SubmitButton pending={pending} sendingLabel={dict.forms.sending}>
        {dict.forms.exploreVolunteer}
      </SubmitButton>
      {message && <p className="formMessage">{message}</p>}
    </form>
  )
}
