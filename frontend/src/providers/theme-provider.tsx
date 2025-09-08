'use client';

import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme, { DefaultStyling, Fonts } from '../theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      <DefaultStyling />
      <Fonts />
      {children}
    </StyledThemeProvider>
  );
}
