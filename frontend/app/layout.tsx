import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import BlockMount from '@/components/wordpress/BlockMount';

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

export const metadata: Metadata = {
  title: 'Toutefois',
  description: 'Toutefois.ca website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
            <BlockMount />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
