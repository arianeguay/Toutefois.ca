import hexToRgba from './utils/hexToRgba';

export const theme = {
  colors: {
    primaryText: '#282651',
    secondaryText: '#6B1E2C',
    tertiaryText: '#2e2e2e',
    lightText: '#F5F3EE',

    headerBackground: '#282651',
    mainBackground: '#f4f2ef',

    sectionColor1: '#862331',
    sectionColor2: '#5A3D55',
    sectionColor3: '#333333',
    sectionColor4: '#437C90',

    buttonPrimaryBackground: '#eaaa19',
    buttonPrimaryColor: '#282651',
    buttonSecondaryBackground: '#6B1E2C',
    buttonSecondaryColor: '#F5F3EE',
    buttonTertiaryBackground: '#282651',
    buttonTertiaryColor: '#F5F3EE',

    borderColor1: '#B1B1B1',
    borderColor2: '#E1A42B',
  },
  fonts: {
    secondary: 'Cerebri Sans',
    primary: 'var(--font-bree-serif), system-ui',
    tertiary: '"Montserrat", system-ui',
  },
  fontSizes: {
    h1: 42,
    h2: 36,
    h3: 28,
    h4: 22,
    h5: 20,
    h6: 18,
    body: 16,
    small: 14,
    subtitle: 18,
    big: 18,
    overline: 12,
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    h1: 50,
    h2: 47,
    h3: 36,
    h4: 31,
    h5: 24,
    h6: 20,
    body: 26,
    small: 20,
    subtitle: 29,
    big: 29,
    overline: 13,
  },
  letterSpacings: {
    h1: -0.5,
    h2: -0.3,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    body: 0,
    small: 0.25,
    subtitle: 0,
    big: 0,
    overline: 0.35,
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
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
  },
  boxShadow: {
    xs: '0 2px 4px rgba(0, 0, 0, 0.1)',
    sm: '0 4px 8px rgba(0, 0, 0, 0.1)',
    md: '0 8px 16px rgba(0, 0, 0, 0.1)',
    lg: '0 16px 32px rgba(0, 0, 0, 0.1)',
    xl: '0 32px 64px rgba(0, 0, 0, 0.1)',
    xxl: '0 64px 128px rgba(0, 0, 0, 0.1)',

    xxlColored: (color: string) => `2px 2px 4px ${hexToRgba(color, 0.5)}`,
  },
  buttonSize: {
    height_sm: '24px',
    height_md: '32px',
    height_lg: '40px',
    width_sm: '120px',
    width_md: '160px',
    width_lg: '200px',
  },
  content: {
    maxWidth: 1200, // px
    padX: 24, // px
    padY: 32, // px
    narrow: 680, // px forms/tables cap
    mediaRadius: 12, // px
  },
  borders: {
    subtle: '1px solid rgba(0,0,0,0.08)',
    strong: '1px solid rgba(0,0,0,0.18)',
    dark: '1px solid #282651',
    section: '3px solid rgba(0,0,0,0.3)',
  },
  prose: {
    link: '#862331', // could also be colors.projects
    linkHover: '#6B1E2C',
    codeBg: '#0b1020',
    codeFg: '#F5F3EE',
    quoteBar: '#282651', // primaryText
    hr: 'rgba(0,0,0,0.25)',
    zebra: 'rgba(0,0,0,0.03)',
    softBg: 'rgba(0,0,0,0.04)',
  },
  appearance: {
    headerHeight: '70px',
  },
};

export const pxToNumber = (px: string) => parseInt(px.replace('px', ''), 10);
// --- Mobile theme (typography et espacements réduits) ---
export const mobileTheme: typeof theme = {
  ...theme,
  fontSizes: {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    body: 14,
    small: 12,
    subtitle: 16,
    big: 16,
    overline: 12,
  },
  lineHeights: {
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 18,
    body: 22,
    small: 18,
    subtitle: 24,
    big: 24,
    overline: 13,
  },
  spacing: {
    xs: 2,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  appearance: {
    headerHeight: '56px',
  },
};

export type ThemeType = typeof theme;

export default theme;
