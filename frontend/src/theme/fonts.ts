import { css } from 'styled-components';

const createFontFaces = (fontName: string, fontWeight: string) => {
  return css`
    @font-face {
      font-family: '${fontName}';
      src:
        url('/fonts/cerebri-sans/CerebriSans-Regular.woff2') format('woff2'),
        url('/fonts/cerebri-sans/CerebriSans-Regular.woff') format('woff');
      font-weight: ${fontWeight};
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: '${fontName}';
      src:
        url('/fonts/cerebri-sans/CerebriSans-Regular.woff2') format('woff2'),
        url('/fonts/cerebri-sans/CerebriSans-Regular.woff') format('woff');
      font-weight: ${fontWeight};
      font-style: italic;
      font-display: swap;
    }
  `;
};

const createFontFacesFromUrl = (
  fontName: string,
  fontUrl: string,
  fontWeight: string,
  format: string,
) => {
  return css`
    @font-face {
      font-family: '${fontName}';
      src: url('${fontUrl}') format('${format}');
      font-weight: ${fontWeight};
      font-style: bold;
      font-display: swap;
    }
  `;
};
export const FontFaces = css`
  ${createFontFaces('Cerebri Sans', '400')}
  ${createFontFacesFromUrl(
    'Cerebri Sans',
    'https://db.onlinewebfonts.com/t/ad775834db281065fc17e86ad857bf63.woff2',
    '700',
    'woff2',
  )}
  ${createFontFacesFromUrl(
    'Special Elite',
    '/fonts/SpecialElite.ttf',
    '400',
    'truetype',
  )}
`;
