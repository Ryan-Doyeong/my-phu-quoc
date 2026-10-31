import { NextRequest, NextResponse } from 'next/server'
import { Converter } from 'opencc-js/cn2t'
import { SITE_URL } from '@/lib/supabase/config'

// /tw = /zh(간체) 페이지를 서버에서 가져와 OpenCC(cn -> twp, 대만 어휘)로 번체 변환해 내려주는 프록시.
// 설계 문서: docs/i18n_traditional_chinese_tw.md

export const dynamic = 'force-dynamic'

const SOURCE_HEADER = 'x-mpq-hant-source'
const toTraditional = Converter({ from: 'cn', to: 'twp' })

function sourceOrigin(): string {
  return (process.env.HANT_SOURCE_ORIGIN || SITE_URL).replace(/\/+$/, '')
}

function siteOrigin(): string {
  return SITE_URL.replace(/\/+$/, '')
}

const PRESERVE = '\u0000HANS'

/** hreflang="zh-Hans" 대체 링크(및 RSC 페이로드의 동일 객체)는 /zh 를 유지해야 하므로 토큰으로 보호 */
function protectHansAlternates(html: string, stash: string[]): string {
  const save = (m: string) => {
    stash.push(m)
    return `${PRESERVE}${stash.length - 1}\u0000`
  }
  // <link ... hrefLang="zh-Hans" ... >
  html = html.replace(/<link\b[^>]*hrefLang=["']zh-Hans["'][^>]*>/gi, save)
  // RSC 페이로드: {\"rel\":\"alternate\",\"hrefLang\":\"zh-Hans\",\"href\":\"...\"} 류 (속성 순서 무관)
  html = html.replace(/\{[^{}]*\\"hrefLang\\":\\"zh-Hans\\"[^{}]*\}/g, save)
  return html
}

function rewriteHtml(raw: string): string {
  const stash: string[] = []
  let html = protectHansAlternates(raw, stash)

  // 1) 간체 -> 번체
  html = toTraditional(html)

  // 2) 내부 링크/URL: 따옴표(또는 이스케이프된 따옴표)로 시작하는 /zh, https://<site>/zh -> /tw
  const origins = [...new Set([siteOrigin(), 'https://myphuquoc.net', sourceOrigin()])]
    .map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const urlRe = new RegExp(`(\\\\?["'])((?:${origins})?)/zh(?=[/?#"'\\\\]|\\1)`, 'g')
  html = html.replace(urlRe, '$1$2/tw')

  // 3) 문서 속성
  html = html.replace(/<html([^>]*?)\blang="zh"/, '<html$1lang="zh-Hant"')
  // RSC 페이로드의 <html lang> prop 도 맞춰야 hydration 후 lang 이 zh 로 되돌아가지 않는다
  html = html.replace(/(\\"html\\",null,\{\\"lang\\":\\")zh(\\")/g, '$1zh-Hant$2')
  html = html.replace(/(property="og:locale"\s+content=")zh_CN(")/g, '$1zh_TW$2')
  html = html.replace(/(content="zh_CN")(\s+property="og:locale")/g, 'content="zh_TW"$2')
  html = html.replace(/\\"og:locale\\",\\"content\\":\\"zh_CN\\"/g, '\\"og:locale\\",\\"content\\":\\"zh_TW\\"')

  // 4) 언어 선택기: 현재 언어명 간체중문 -> 繁體中文
  html = html.replace(/(langCurrentName">)簡體中文(<)/g, '$1繁體中文$2')
  html = html.replace(/(語言（目前：)簡體中文(）)/g, '$1繁體中文$2')

  // 5) 폰트: Noto Sans SC -> TC
  html = html.replace(/Noto\+Sans\+SC/g, 'Noto+Sans+TC').replace(/Noto Sans SC/g, 'Noto Sans TC')

  // 6) 런타임 변환기: 클라이언트 번들의 간체 문자열(사전·동적 텍스트)을 hydration 이후 DOM 에서 번체로 재변환
  html = html.replace(
    '</head>',
    '<script defer src="/hant/opencc-cn2t.js"></script><script defer src="/hant/runtime.js"></script></head>'
  )

  // 보호했던 zh-Hans 대체 링크 복원 (원문 간체 그대로 유지)
  // eslint-disable-next-line no-control-regex
  html = html.replace(/\u0000HANS(\d+)\u0000/g, (_, i) => stash[Number(i)])
  return html
}

function hopByHop(h: Headers): Headers {
  const out = new Headers(h)
  for (const k of ['content-encoding', 'content-length', 'transfer-encoding', 'connection', 'set-cookie']) {
    out.delete(k)
  }
  return out
}

export async function GET(request: NextRequest) {
  // 루프 가드
  if (request.headers.get(SOURCE_HEADER)) {
    return new NextResponse('Not Found', { status: 404 })
  }
  // 클라이언트 라우터의 RSC/프리페치 요청은 지원하지 않음 -> 404 이면 Next 가 일반 페이지 이동으로 전환
  if (request.headers.get('rsc') || request.headers.get('next-router-prefetch')) {
    return new NextResponse('Not Found', { status: 404, headers: { 'Cache-Control': 'no-store' } })
  }

  const { pathname, search } = request.nextUrl
  const rest = pathname.replace(/^\/tw(?=\/|$)/, '')
  const upstream = `${sourceOrigin()}/zh${rest === '/' ? '' : rest}${search}`

  const headers: Record<string, string> = { [SOURCE_HEADER]: '1' }
  const ua = request.headers.get('user-agent')
  if (ua) headers['user-agent'] = ua

  let res: Response
  try {
    res = await fetch(upstream, { headers, redirect: 'manual', next: { revalidate: 300 } })
    if (res.status >= 500) {
      res = await fetch(upstream, { headers, redirect: 'manual', cache: 'no-store' })
    }
  } catch {
    return new NextResponse('Bad Gateway', { status: 502, headers: { 'Cache-Control': 'no-store' } })
  }

  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location')
    if (!loc) return new NextResponse(null, { status: 502 })
    const abs = new URL(loc, upstream)
    const own = [new URL(sourceOrigin()).origin, new URL(siteOrigin()).origin]
    let target: string
    if (own.includes(abs.origin)) {
      const p = abs.pathname.replace(/^\/zh(?=\/|$)/, '/tw')
      target = `${p}${abs.search}${abs.hash}`
      const base = new URL(request.url)
      target = new URL(target, base.origin).toString()
    } else {
      target = abs.toString()
    }
    return NextResponse.redirect(target, res.status === 301 || res.status === 308 ? res.status : 307)
  }

  if (res.status === 404 || res.status === 410) {
    const h = hopByHop(res.headers)
    h.set('Cache-Control', 'public, s-maxage=60')
    const type = res.headers.get('content-type') || ''
    if (type.includes('text/html')) {
      h.set('Content-Type', 'text/html; charset=utf-8')
      return new NextResponse(rewriteHtml(await res.text()), { status: res.status, headers: h })
    }
    return new NextResponse(await res.arrayBuffer(), { status: res.status, headers: h })
  }

  const type = res.headers.get('content-type') || ''
  if (type.includes('text/html')) {
    const body = rewriteHtml(await res.text())
    const h = new Headers({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      Vary: 'Accept-Encoding',
    })
    const robots = res.headers.get('x-robots-tag')
    if (robots) h.set('X-Robots-Tag', robots)
    return new NextResponse(body, { status: res.status, headers: h })
  }

  const h = hopByHop(res.headers)
  if (!h.has('cache-control')) h.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
  return new NextResponse(await res.arrayBuffer(), { status: res.status, headers: h })
}
