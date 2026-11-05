import { MARMORIS_YACHT_TOURS } from '@/lib/activities/marmorisYacht'
import { KEY_PAGES, SITE_CONTACT, SITE_NAME, siteOrigin } from '@/lib/siteAgent'

/**
 * 읽기 전용 MCP 서버 (Streamable HTTP, stateless JSON-RPC).
 * 공개 정보만 제공한다: 연락처, 주요 페이지, 공개된 액티비티 요금.
 */
export const dynamic = 'force-dynamic'

const PROTOCOL_VERSION = '2025-06-18'
export const SERVER_VERSION = '1.0.0'

const TOOLS = [
  {
    name: 'get_contact_info',
    description: 'Email, phone and WhatsApp contact details of My Phu Quoc.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_key_pages',
    description: 'List the main pages of myphuquoc.net with URLs and descriptions.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_activity_prices',
    description: 'Listed per-person prices (VND) of yacht tours on Phu Quoc offered by partner operators. Prices may vary by season and conditions.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
]

function callTool(name: string): unknown {
  const o = siteOrigin()
  if (name === 'get_contact_info') return { ...SITE_CONTACT, website: o }
  if (name === 'list_key_pages') return KEY_PAGES.map((p) => ({ ...p, url: o + (p.path === '/' ? '' : p.path) }))
  if (name === 'get_activity_prices')
    return MARMORIS_YACHT_TOURS.map((t) => ({
      tour: t.title.en,
      operator: t.operator,
      hours: t.hours,
      currency: 'VND',
      classes: t.classes.map((c) => ({ name: c.name.en, deck: c.deck.en, pricePerPerson: c.priceVnd })),
      url: `${o}/activities`,
    }))
  return undefined
}

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: { name?: string } }

function handle(msg: Rpc) {
  const id = msg.id ?? null
  const ok = (result: unknown) => ({ jsonrpc: '2.0', id, result })
  const err = (code: number, message: string) => ({ jsonrpc: '2.0', id, error: { code, message } })
  switch (msg.method) {
    case 'initialize':
      return ok({
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'my-phu-quoc', title: SITE_NAME, version: SERVER_VERSION },
      })
    case 'ping':
      return ok({})
    case 'tools/list':
      return ok({ tools: TOOLS })
    case 'tools/call': {
      const data = callTool(msg.params?.name ?? '')
      if (data === undefined) return err(-32602, 'Unknown tool')
      return ok({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] })
    }
    default:
      return err(-32601, 'Method not found')
  }
}

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, { status: 400 })
  }
  const msgs = (Array.isArray(body) ? body : [body]) as Rpc[]
  const replies = msgs.filter((m) => m && m.id !== undefined && m.method).map(handle)
  if (replies.length === 0) return new Response(null, { status: 202 })
  return new Response(JSON.stringify(Array.isArray(body) ? replies : replies[0]), { headers: HEADERS })
}

export function GET() {
  return new Response('Use POST with JSON-RPC (MCP Streamable HTTP).', { status: 405, headers: { Allow: 'POST' } })
}
