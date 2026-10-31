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
      // 호텔 디렉터리 -> 새 호텔 소개 페이지 301 영구 리다이렉트
      {
        source: '/directory/hotels',
        destination: '/hotels',
        permanent: true,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi|vi)/directory/hotels',
        destination: '/:locale/hotels',
        permanent: true,
      },
      {
        source: '/en/directory/hotels',
        destination: '/hotels',
        permanent: true,
      },
      {
        source: '/directory/hotels/:path*',
        destination: '/hotels',
        permanent: true,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi|vi)/directory/hotels/:path*',
        destination: '/:locale/hotels',
        permanent: true,
      },
      {
        source: '/en/directory/hotels/:path*',
        destination: '/hotels',
        permanent: true,
      },
      // SEO: /impact 는 /news 로 301 통합
      {
        source: '/impact',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/:locale(ko|zh|ru|ja|hi)/impact',
        destination: '/:locale/news',
        permanent: true,
      },
      {
        source: '/en/impact',
        destination: '/news',
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
