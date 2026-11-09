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
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%ED%98%B8%ED%85%94',  // /푸꾸옥-호텔
        destination: '/ko/hotels',
        permanent: true,
      },
      {
        source: '/category/%ED%91%B8%EA%BE%B8%EC%98%A5-%ED%98%B8%ED%85%94',  // /category/푸꾸옥-호텔
        destination: '/ko/hotels',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EC%97%AC%ED%96%89-%EC%A4%80%EB%B9%84-%EB%B0%8F-%EC%A3%BC%EC%9D%98%EC%82%AC%ED%95%AD',  // /푸꾸옥-여행-준비-및-주의사항
        destination: '/ko/news',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EC%84%A0%EC%85%8B%ED%83%80%EC%9A%B4-%ED%8B%B0%EC%BC%93-%EC%B5%9C%EC%A0%80%EA%B0%80-%EA%B5%AC%EB%A7%A4',  // /푸꾸옥-선셋타운-티켓-최저가-구매
        destination: '/ko/sunset-town-shows',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EC%84%A0%EC%85%8B%ED%83%80%EC%9A%B4-%ED%8B%B0%EC%BC%93-%EC%B5%9C%EC%A0%80%EA%B0%80-%EA%B5%AC%EB%A7%A4-2',  // /푸꾸옥-선셋타운-티켓-최저가-구매-2
        destination: '/ko/sunset-town-shows',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EB%A7%88%EC%82%AC%EC%A7%80-%EB%A3%A8%EB%AF%B8%EC%8A%A4%ED%8C%8C',  // /푸꾸옥-마사지-루미스파
        destination: '/ko/directory/wellness',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%ED%8A%B8%EB%A1%9C%ED%94%BC%EC%B9%B4-%ED%8E%98%EC%8A%A4%ED%8A%B8',  // /푸꾸옥-트로피카-페스트
        destination: '/ko/events',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EB%A7%9B%EC%A7%91-%EC%B6%94%EC%B2%9C-%EB%B0%A9%EB%B2%952',  // /푸꾸옥-맛집-추천-방법2
        destination: '/ko/directory/dining',
        permanent: true,
      },
      {
        source: '/%ED%91%B8%EA%BE%B8%EC%98%A5-%EC%97%AC%ED%96%89-%EC%B6%94%EC%B2%9C-%EB%B0%A9%EB%B2%953',  // /푸꾸옥-여행-추천-방법3
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
