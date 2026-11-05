import { CONTENT_SIGNAL, siteOrigin } from '@/lib/siteAgent'

export const dynamic = 'force-static'

const DISALLOW = [
  '/admin',
  '/editor',
  '/login',
  '/account',
  '/auth',
  '/api',
  '/md',
  '/partners',
  '/for-businesses',
  '/*/partners',
  '/*/for-businesses',
]

/** Next 의 MetadataRoute.Robots 는 Content-Signal 을 지원하지 않아 robots.txt 를 직접 생성한다. */
export function GET() {
  const body = [
    'User-Agent: *',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
    '',
    `Sitemap: ${siteOrigin()}/sitemap.xml`,
    '',
  ].join('\n')
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
