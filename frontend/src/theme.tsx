import { createGlobalStyle, css } from 'styled-components';
import { createFontStyleCSS } from './components/common/typography/styles';

export const theme = {
  colors: {
    primaryText: '#2F2C58',
    secondaryText: '#6B1E2C',
    lightText: '#F5F3EE',

    headerBackground: '#2F2C58',
    mainBackground: '#FFF4D8',

    sectionColor1: '#862331',
    sectionColor2: '#5A3D55',
    sectionColor3: '#333333',
    sectionColor4: '#588B8B',

    buttonPrimaryBackground: '#E1A42B',
    buttonPrimaryColor: '#2F2C58',
    buttonSecondaryBackground: '#6B1E2C',
    buttonSecondaryColor: '#F5F3EE',
    buttonTertiaryBackground: '#2F2C58',
    buttonTertiaryColor: '#F5F3EE',

    borderColor1: '#B1B1B1',
    borderColor2: '#E1A42B',
  },
  fonts: {
    secondary: 'Poppins',
    primary: 'Montserrat',
  },
  fontSizes: {
    h1: 48,
    h2: 36,
    h3: 28,
    h4: 22,
    body: 16,
    small: 14,
    subtitle: 18,
    big: 18,
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
    h1: 58,
    h2: 47,
    h3: 36,
    h4: 31,
    h5: 24,
    h6: 20,
    body: 26,
    small: 20,
    subtitle: 29,
    big: 29,
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
  },
  prose: {
    link: '#862331', // could also be colors.projects
    linkHover: '#6B1E2C',
    codeBg: '#0b1020',
    codeFg: '#F5F3EE',
    quoteBar: '#2F2C58', // primaryText
    hr: 'rgba(0,0,0,0.25)',
    zebra: 'rgba(0,0,0,0.03)',
    softBg: 'rgba(0,0,0,0.04)',
  },
  appearance: {
    headerHeight: '70px',
  },
};

export const ContainerContentStyling = css`
  max-width: ${({ theme }) => theme.content.maxWidth}px;
  margin-inline: auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.content.maxWidth}px) {
    padding-inline: ${({ theme }) => theme.spacing.xl}px;
  }
`;

export const DefaultStyling = createGlobalStyle`
body {
    background-color: ${({ theme }) => theme.colors.mainBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    font-family: ${({ theme }) => theme.fonts.primary};

    .app {
      width: 100%;
      
    }

    h1 {${createFontStyleCSS('h1')}}
    h2 {${createFontStyleCSS('h2')}}
    h3 {${createFontStyleCSS('h3')}}
    h4 {${createFontStyleCSS('h4')}}
    p {${createFontStyleCSS('body')}}
    
    
 
}`;

export const Fonts = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.cdnfonts.com/css/gagalin" rel="stylesheet" />
    </>
  );
};

export type ThemeType = typeof theme;

export default theme;
