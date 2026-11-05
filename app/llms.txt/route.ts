import { KEY_PAGES, SITE_CONTACT, SITE_NAME, SITE_TAGLINE, SUPPORTED_LANGUAGES, siteOrigin } from '@/lib/siteAgent'

export const dynamic = 'force-static'

export function GET() {
  const o = siteOrigin()
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_TAGLINE}. Hotels, restaurants, cafes, bars, activities, events and a town map, in 6 languages (${SUPPORTED_LANGUAGES.join(', ')}). Prices are in VND. Bookings for tours are handled by the listed operators; ${SITE_NAME} only assists.`,
    '',
    '## Key pages',
    ...KEY_PAGES.map((p) => `- [${p.title}](${o}${p.path === '/' ? '' : p.path}): ${p.description}`),
    '',
    '## Machine-readable',
    `- [Sitemap](${o}/sitemap.xml)`,
    `- Markdown: request any page with \`Accept: text/markdown\``,
    `- [MCP server card](${o}/.well-known/mcp/server-card.json)`,
    '',
    '## Languages',
    `- English (default, no prefix); other languages use a prefix: ${SUPPORTED_LANGUAGES.filter((l) => l !== 'en').map((l) => `${o}/${l}`).join(', ')}`,
    '',
    '## Contact',
    `- Email: ${SITE_CONTACT.email}`,
    `- Phone / WhatsApp: ${SITE_CONTACT.telephone}`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
