import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primaryText: '#2F2C58',
    secondaryText: '#6B1E2C',
    lightText: '#F5F3EE',

    headerBackground: '#2F2C58',
    mainBackground: '#FFF4D8',
  },
  fonts: {
    secondary: 'Poppins',
    primary: 'Montserrat',
  },
  fontSizes: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1rem',
    h6: '0.875rem',
    body: '1rem',
    small: '0.875rem',
    subtitle: '1.25rem',
    big: '2rem',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1rem',
    h6: '0.875rem',
    body: '1rem',
    small: '0.875rem',
    subtitle: '1.25rem',
    big: '2rem',
  },
  letterSpacings: {
    h1: '0.05em',
    h2: '0.05em',
    h3: '0.05em',
    h4: '0.05em',
    h5: '0.05em',
    h6: '0.05em',
    body: '0.05em',
    small: '0.05em',
    subtitle: '0.05em',
    big: '0.05em',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 54,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  boxShadow: {
    xs: '0 2px 4px rgba(0, 0, 0, 0.1)',
    sm: '0 4px 8px rgba(0, 0, 0, 0.1)',
    md: '0 8px 16px rgba(0, 0, 0, 0.1)',
    lg: '0 16px 32px rgba(0, 0, 0, 0.1)',
    xl: '0 32px 64px rgba(0, 0, 0, 0.1)',
    xxl: '0 64px 128px rgba(0, 0, 0, 0.1)',
  },
};

export const DefaultStyling = createGlobalStyle`
body {
    background-color: ${({ theme }) => theme.colors.mainBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    font-family: ${({ theme }) => theme.fonts.primary};

    .app {
      width: 100%;
      
    }
}`;

export type ThemeType = typeof theme;

export default theme;
