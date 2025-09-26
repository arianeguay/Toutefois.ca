import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import { Montserrat, Permanent_Marker, Poppins } from 'next/font/google';
import './globals.css';
import api from '@/api';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const home = await api.fetchPageBySlug('home');
    const page = Array.isArray(home) ? home[0] : home;
    const description = page?.excerpt?.rendered
      ? page.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
      : page?.content?.rendered
        ? page.content.rendered.replace(/<[^>]*>/g, '').slice(0, 160)
        : 'Toutefois';

    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: 'Toutefois',
        template: '%s | Toutefois',
      },
      description,
      alternates: { canonical: '/' },
      openGraph: {
        url: siteUrl + '/',
        title: 'Toutefois',
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Toutefois',
        description,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-video-preview': -1,
          'max-snippet': -1,
        },
      },
    };
  } catch (e) {
    // Fallback to existing defaults if WP fails
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: 'Toutefois',
        template: '%s | Toutefois',
      },
      alternates: { canonical: '/' },
      openGraph: {
        type: 'website',
        url: siteUrl + '/',
        siteName: 'Toutefois',
        title: 'Toutefois',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Toutefois',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-video-preview': -1,
          'max-snippet': -1,
        },
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${permanentMarker.variable}`}
      >
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

