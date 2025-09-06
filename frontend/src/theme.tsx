import { createGlobalStyle, css } from 'styled-components';
import { createFontStyleCSS } from './components/common/typography/styles';

export const theme = {
  colors: {
    primaryText: '#2F2C58',
    secondaryText: '#6B1E2C',
    lightText: '#F5F3EE',

    headerBackground: '#2F2C58',
    mainBackground: '#FFF4D8',

    projects: '#862331',

    buttonPrimaryBackground: '#E1A42B',
    buttonPrimaryColor: '#2F2C58',
    buttonSecondaryBackground: '#6B1E2C',
    buttonSecondaryColor: '#F5F3EE',
    buttonTertiaryBackground: '#2F2C58',
    buttonTertiaryColor: '#F5F3EE',
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
  buttonSize: {
    height_sm: '24px',
    height_md: '32px',
    height_lg: '40px',
    width_sm: '120px',
    width_md: '160px',
    width_lg: '200px',
  },
};

const WordpressStyling = css`
  .wp-block-group,
  .wp-block-columns,
  .wp-block-cover,
  .wp-block-media-text {
    max-width: 1200px;
    width: 100%;
    margin-inline: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md}px;

    padding-block: ${({ theme }) => theme.spacing.xl}px;
  }

  .wp-block-image img {
    width: 100%;
    height: auto;
  }

  .wp-block-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.spacing.md}px;
  }

  .wp-block-quote {
    border-left: 4px solid ${({ theme }) => theme.colors.primaryText};
    padding-left: ${({ theme }) => theme.spacing.md}px;
    font-style: italic;
  }

  .wp-block-pullquote {
    border-top: 4px solid ${({ theme }) => theme.colors.primaryText};
    border-bottom: 4px solid ${({ theme }) => theme.colors.primaryText};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg}px 0;
  }

  .wp-block-button__link {
    background-color: ${({ theme }) => theme.colors.primaryText};
    color: ${({ theme }) => theme.colors.lightText};
    padding: ${({ theme }) => theme.spacing.sm}px
      ${({ theme }) => theme.spacing.md}px;
    border-radius: ${({ theme }) => theme.borderRadius.sm}px;
    text-decoration: none;
  }

  .wp-block-separator {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
    opacity: 0.5;
    max-width: 200px;
  }

  .wp-block-table table {
    width: 100%;
    border-collapse: collapse;
  }

  .wp-block-table th,
  .wp-block-table td {
    border: 1px solid ${({ theme }) => theme.colors.secondaryText};
    padding: ${({ theme }) => theme.spacing.sm}px;
  }

  ul,
  ol {
    padding-left: ${({ theme }) => theme.spacing.lg}px;
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
    
    
    ${WordpressStyling}
 
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
    </>
  );
};

export type ThemeType = typeof theme;

export default theme;
