'use client';

import { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme, { DefaultStyling } from '../theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      <DefaultStyling />
      {children}
    </StyledThemeProvider>
  );
}
