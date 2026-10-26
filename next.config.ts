import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: {
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
    ]
  },
}
export default nextConfig
