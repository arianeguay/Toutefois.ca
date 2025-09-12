import { TypographyVariant } from '@/components/common/Typography/types';
import { css } from 'styled-components';

const HeadingVariant: TypographyVariant[] = ['h1', 'h2', 'h3', 'h4'];

const createFontStyleCSS = (variant: TypographyVariant, lineClamp?: number) => {
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

export default createFontStyleCSS;
