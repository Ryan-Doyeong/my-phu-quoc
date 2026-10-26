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
    ]
  },
}
export default nextConfig
