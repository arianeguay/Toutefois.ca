'use client';
import createFontStyleCSS from '@/theme/utils/createFontStyleCSS';
import styled from 'styled-components';
import { TypographyElementType, TypographyVariant } from './types';

interface TypographyProps {
  $variant: TypographyVariant;
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

export const Span = styled.span<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const Div = styled.div<TypographyProps>`
  ${(props) => createFontStyleCSS(props.$variant, props.$lineClamp)}
`;

export const getElement = (element: TypographyElementType) => {
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
    case 'span':
      return Span;
    case 'div':
      return Div;
  }
};
