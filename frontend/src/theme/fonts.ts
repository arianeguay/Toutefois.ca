import { css } from 'styled-components';

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
