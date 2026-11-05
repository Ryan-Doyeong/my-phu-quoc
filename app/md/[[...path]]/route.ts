import TurndownService from 'turndown'
import { siteOrigin } from '@/lib/siteAgent'

/**
 * Accept: text/markdown 요청을 받으면 proxy.ts 가 이 라우트로 rewrite 한다.
 * 같은 사이트의 공개 HTML(쿠키·인증 없이)을 가져와 본문을 Markdown 으로 변환한다.
 */
export const dynamic = 'force-dynamic'

const BLOCKED_PREFIXES = ['/admin', '/editor', '/login', '/account', '/auth', '/api', '/md']

function extractMain(html: string): string {
  const main = html.match(/<main[\s\S]*?<\/main>/i)
  let body = main ? main[0] : (html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? html)
  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  return body
}

export async function GET(_req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params
  const pagePath = '/' + path.map(encodeURIComponent).join('/')
  if (BLOCKED_PREFIXES.some((p) => pagePath === p || pagePath.startsWith(p + '/'))) {
    return new Response('Not available as Markdown', { status: 404 })
  }
  const origin = process.env.INTERNAL_ORIGIN || siteOrigin()
  const res = await fetch(origin + pagePath, {
    headers: { Accept: 'text/html', 'Accept-Language': 'en', 'User-Agent': 'mpq-markdown-renderer' },
    redirect: 'follow',
    cache: 'no-store',
  })
  if (!res.ok) return new Response(`Upstream returned ${res.status}`, { status: res.status === 404 ? 404 : 502 })
  const html = await res.text()
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? ''
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
  td.remove(['nav', 'footer', 'form', 'button', 'iframe', 'img'])
  const md = (title ? `# ${title}\n\n` : '') + td.turndown(extractMain(html)).replace(/\n{3,}/g, '\n\n')
  return new Response(md + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=300',
      'X-Markdown-Tokens': String(Math.ceil(md.length / 4)),
    },
  })
}
