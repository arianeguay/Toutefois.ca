import api from '@/api';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import { PageContainer } from '@/layout/Page/styles';
import StyledComponentsRegistry from '@/lib/registry';
import { ColorProvider } from '@/providers/color-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import {
  Bree_Serif,
  Montserrat,
  Permanent_Marker,
  Poppins,
} from 'next/font/google';
import Script from 'next/script';
import './globals.css';

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

const breeSerif = Bree_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bree-serif',
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
    const options = await api.fetchOptions();
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
      verification: {
        google:
          options?.google_site_verification ||
          process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
          undefined,
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
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options = await api.fetchOptions();
  const donation_link = options?.donation_link;
  const gaId = options?.ga_measurement_id || process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${breeSerif.variable} ${poppins.variable} ${permanentMarker.variable}`}
        suppressHydrationWarning
        style={{ overflowY: 'auto' }}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="fc4bcff0-442c-4f8c-8bb2-b3e2ebfc96b4"
          type="text/javascript"
          async
        ></script>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <ColorProvider>
              <PageContainer>
                <Header donation_link={donation_link} />
                {children}
                <Footer donation_link={donation_link} />
              </PageContainer>
            </ColorProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
