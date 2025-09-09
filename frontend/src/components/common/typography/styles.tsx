import styled, { css } from 'styled-components';
import type { ElementType, Variant } from './types';

const HeadingVariant: Variant[] = ['h1', 'h2', 'h3', 'h4'];

export const createFontStyleCSS = (variant: Variant, lineClamp?: number) => {
  return css`
    font-size: ${({ theme }) => theme.fontSizes[variant]}px;
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights[variant]}px;
    letter-spacing: ${({ theme }) => theme.letterSpacings[variant]}px;

    ${HeadingVariant.includes(variant) &&
    css`
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      font-family: ${({ theme }) => theme.fonts.secondary};
    `}

    ${lineClamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `;
};

interface TypographyProps {
  $variant: Variant;
  $lineClamp?: number;
}

export const Paragraph = styled.p<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading1 = styled.h1<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading2 = styled.h2<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading3 = styled.h3<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading4 = styled.h4<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading5 = styled.h5<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Heading6 = styled.h6<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const getElement = (element: ElementType) => {
  switch (element) {
    case 'h1':
      return Heading1;
    case 'h2':
      return Heading2;
    case 'h3':
      return Heading3;
    case 'h4':
      return Heading4;
    case 'h5':
      return Heading5;
    case 'h6':
      return Heading6;
    case 'p':
      return Paragraph;
  }
};
