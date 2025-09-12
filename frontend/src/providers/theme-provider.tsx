'use client';

import theme from '@/theme';
import { Fonts } from '@/theme/fonts';
import { DefaultStyling } from '@/theme/global-styles';
import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      <DefaultStyling />
      <Fonts />
      {children}
    </StyledThemeProvider>
  );
}
