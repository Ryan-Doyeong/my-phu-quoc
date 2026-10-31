import { CONTACT_CONFIG } from '@/lib/contactConfig'

export type CtaType = 'whatsapp' | 'zalo' | 'tel'
export type CtaSource = 'floating' | 'tour-page' | 'service-card'

/** WhatsApp deep link with an optional prefilled message. */
export function buildWhatsAppLink(text?: string): string {
  if (!text) return CONTACT_CONFIG.whatsappUrl
  return `${CONTACT_CONFIG.whatsappUrl}?text=${encodeURIComponent(text)}`
}

export function buildZaloLink(): string {
  return CONTACT_CONFIG.zaloUrl
}

export function buildTelLink(): string {
  return `tel:${CONTACT_CONFIG.phoneNumber}`
}

/** Detect contact type from an href (used by analytics). */
export function detectCtaType(href: string): CtaType | null {
  if (!href) return null
  if (href.startsWith('tel:')) return 'tel'
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return 'whatsapp'
  if (/^https?:\/\/zalo\.me\//i.test(href)) return 'zalo'
  return null
}
