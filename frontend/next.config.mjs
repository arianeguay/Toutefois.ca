/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_ADMIN_URL:
      process.env.NEXT_PUBLIC_ADMIN_URL ||
      'https://admin.toutefois.arianeguay.ca/wp-json',
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.toutefois.arianeguay.ca',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'http',
        hostname: 'admin.toutefois.arianeguay.ca',
        pathname: '/wp-content/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, s-maxage=2592000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
