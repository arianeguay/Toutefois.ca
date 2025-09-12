'use client';

import theme, { mobileTheme } from '@/theme';
import { Fonts } from '@/theme/fonts';
import { DefaultStyling } from '@/theme/global-styles';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <StyledThemeProvider theme={isMobile ? mobileTheme : theme}>
      <DefaultStyling />
      <Fonts />
      {children}
    </StyledThemeProvider>
  );
}
