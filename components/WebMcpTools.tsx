"use client"
import { useEffect } from 'react'

/**
 * WebMCP: 브라우저 내 에이전트에게 도구를 노출한다 (navigator.modelContext).
 * 지원하지 않는 브라우저에서는 아무 일도 하지 않는다.
 */
const CONTACT = {
  email: 'ddunddun8484@gmail.com',
  telephone: '+84907994188',
  whatsapp: 'https://wa.me/84907994188',
}

export function WebMcpTools() {
  useEffect(() => {
    const mc = (navigator as unknown as { modelContext?: { registerTool?: (t: unknown) => unknown } }).modelContext
    if (!mc || typeof mc.registerTool !== 'function') return
    const text = (t: string) => ({ content: [{ type: 'text', text: t }] })
    try {
      mc.registerTool({
        name: 'search_site',
        description: 'Search My Phu Quoc (hotels, restaurants, cafes, activities) and open the search results page.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string', description: 'Search keywords' } },
          required: ['query'],
        },
        async execute({ query }: { query: string }) {
          const url = `/search?q=${encodeURIComponent(String(query || ''))}`
          window.location.assign(url)
          return text(`Opening ${window.location.origin}${url}`)
        },
      })
      mc.registerTool({
        name: 'get_contact_info',
        description: 'Get My Phu Quoc contact details (email, phone, WhatsApp).',
        inputSchema: { type: 'object', properties: {} },
        async execute() {
          return text(JSON.stringify(CONTACT))
        },
      })
    } catch {
      /* 이미 등록되었거나 미지원 — 무시 */
    }
  }, [])
  return null
}
