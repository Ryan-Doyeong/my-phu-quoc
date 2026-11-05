import { SITE_CONTACT, SITE_NAME, siteOrigin } from '@/lib/siteAgent'

export const dynamic = 'force-static'

/** MCP Server Card (SEP-1649 초안; 명세가 아직 바뀌는 중이라 transport/remotes 두 표기를 모두 둠) */
export function GET() {
  const o = siteOrigin()
  const card = {
    protocolVersion: '2025-06-18',
    name: 'net.myphuquoc/my-phu-quoc',
    title: SITE_NAME,
    version: '1.0.0',
    description: 'Read-only information about Sunset Town and southern Phu Quoc: contact details, key pages and listed activity prices.',
    websiteUrl: o,
    homepage: o,
    transport: { type: 'streamable-http', url: `${o}/api/mcp` },
    remotes: [{ type: 'streamable-http', url: `${o}/api/mcp` }],
    capabilities: { tools: { listChanged: false } },
    tools: ['get_contact_info', 'list_key_pages', 'get_activity_prices'],
    authentication: { required: false },
    contact: { email: SITE_CONTACT.email },
  }
  return new Response(JSON.stringify(card, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' },
  })
}
