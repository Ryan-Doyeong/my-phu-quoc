import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: {
    cpus: 4,
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.myphuquoc.net' }],
        destination: 'https://myphuquoc.net/:path*',
        permanent: true,
      },
      // Ryan 지시 (2026-10-26 2단계): 슬러그 오탈자 301 영구 리다이렉트
      {
        source: '/business/sunset-house-phu-quoc-buggy-sevices',
        destination: '/business/sunset-house-phu-quoc-buggy-services',
        permanent: true,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/business/sunset-house-phu-quoc-buggy-sevices',
        destination: '/:locale/business/sunset-house-phu-quoc-buggy-services',
        permanent: true,
      },
      {
        source: '/business/l-a-hillside-aparment-sunset-town-phu-quoc',
        destination: '/business/l-a-hillside-apartment-sunset-town-phu-quoc',
        permanent: true,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/business/l-a-hillside-aparment-sunset-town-phu-quoc',
        destination: '/:locale/business/l-a-hillside-apartment-sunset-town-phu-quoc',
        permanent: true,
      },
      // Search Console 404 정리 (2026-11-09): 옛 워드프레스 한글 슬러그 -> 새 사이트 대응 페이지 301
      {
        source: '/푸꾸옥-호텔',
        destination: '/ko/hotels',
        permanent: true,
      },
      {
        source: '/category/푸꾸옥-호텔',
        destination: '/ko/hotels',
        permanent: true,
      },
      {
        source: '/푸꾸옥-여행-준비-및-주의사항',
        destination: '/ko/news',
        permanent: true,
      },
      {
        source: '/푸꾸옥-선셋타운-티켓-최저가-구매',
        destination: '/ko/sunset-town-shows',
        permanent: true,
      },
      {
        source: '/푸꾸옥-선셋타운-티켓-최저가-구매-2',
        destination: '/ko/sunset-town-shows',
        permanent: true,
      },
      {
        source: '/푸꾸옥-마사지-루미스파',
        destination: '/ko/directory/wellness',
        permanent: true,
      },
      {
        source: '/푸꾸옥-트로피카-페스트',
        destination: '/ko/events',
        permanent: true,
      },
      {
        source: '/푸꾸옥-맛집-추천-방법2',
        destination: '/ko/directory/dining',
        permanent: true,
      },
      {
        source: '/푸꾸옥-여행-추천-방법3',
        destination: '/ko/itineraries',
        permanent: true,
      },
      {
        source: '/home/about',
        destination: '/ko/about',
        permanent: true,
      },
      // Ryan 15차 지시: /partners, /for-businesses 6개 언어 홈으로 임시 리다이렉트 (307)
      {
        source: '/partners',
        destination: '/',
        permanent: false,
      },
      {
        source: '/partners/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/partners',
        destination: '/:locale',
        permanent: false,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/partners/:path*',
        destination: '/:locale',
        permanent: false,
      },
      {
        source: '/en/partners',
        destination: '/',
        permanent: false,
      },
      {
        source: '/en/partners/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/for-businesses',
        destination: '/',
        permanent: false,
      },
      {
        source: '/for-businesses/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/for-businesses',
        destination: '/:locale',
        permanent: false,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/for-businesses/:path*',
        destination: '/:locale',
        permanent: false,
      },
      {
        source: '/en/for-businesses',
        destination: '/',
        permanent: false,
      },
      {
        source: '/en/for-businesses/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}
export default nextConfig
