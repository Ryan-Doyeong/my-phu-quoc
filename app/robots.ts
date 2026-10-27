import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myphuquoc.net';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/editor',
        '/login',
        '/account',
        '/auth',
        '/api',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
