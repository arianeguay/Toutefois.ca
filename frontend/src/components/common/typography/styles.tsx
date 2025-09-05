import styled, { css } from 'styled-components';
import type theme from '../../../theme';
import type { ElementType } from './types';

const getTypographyStyle = (variant: keyof typeof theme.fontSizes) => {
    return css`
    font-size: ${({ theme }) => theme.fontSizes[variant]};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights[variant]};
    letter-spacing: ${({ theme }) => theme.letterSpacings[variant]};
  `;
};

interface TypographyProps {
    $variant: keyof typeof theme.fontSizes;
}

export const Paragraph = styled.p<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading1 = styled.h1<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading2 = styled.h2<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading3 = styled.h3<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading4 = styled.h4<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading5 = styled.h5<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
`;

export const Heading6 = styled.h6<TypographyProps>`
  ${(props) => getTypographyStyle(props.$variant)}
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
