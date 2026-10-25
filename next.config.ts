import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async redirects() {
    // My Phu Quoc: Phu Quoc-only redirects (goodlifethaodien.online host, old Phu Quoc story slugs) removed in Phase 0.
    // Add the www → apex redirect here once the My Phu Quoc domain is decided.
    return []
  },
}
export default nextConfig
