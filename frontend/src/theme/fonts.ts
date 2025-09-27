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
  ${createFontFacesFromUrl(
    'Cerebri Sans',
    '/fonts/Cerebri Sans Bold.ttf',
    '700',
    'truetype',
  )}
`;
