import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block non-indexable or technical routes to reduce crawl waste
        disallow: [
          '/checkout', // checkout pages shouldn't be indexed
          '/api/', // any app API routes (if present)
          '/_next/', // Next.js build assets
          '/not-found',
          '/404',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
