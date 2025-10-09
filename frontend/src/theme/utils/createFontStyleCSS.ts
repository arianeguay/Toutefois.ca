import { TypographyVariant } from '@/components/common/Typography/types';
import { css } from 'styled-components';
import { clampPx } from './fluid';
import { mobileTheme } from '../index';

const HeadingVariant: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const createFontStyleCSS = (variant: TypographyVariant, lineClamp?: number) => {
  return css`
    /* Fluid type */ 
    font-size: ${({ theme }) => clampPx(mobileTheme.fontSizes[variant], theme.fontSizes[variant])};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => 
      // Use unitless values for line-height with fluid typography
      (variant === 'body' || variant === 'small' || variant === 'big') 
        ? (theme.lineHeights[variant] / theme.fontSizes[variant]).toFixed(2) 
        : (theme.lineHeights[variant] / theme.fontSizes[variant]).toFixed(2)
    };
    
    /* Optical letter-spacing: negative for large headings, positive for small text */
    letter-spacing: ${({ theme }) => {
      if (variant === 'h1' || variant === 'h2') return '-0.015em';
      if (variant === 'h5' || variant === 'h6' || variant === 'small' || variant === 'overline') return '0.02em';
      return theme.letterSpacings[variant] + 'px';
    }};
    
    /* Font rendering for better legibility */
    text-rendering: optimizeLegibility;

    ${HeadingVariant.includes(variant) &&
    css`
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      font-family: ${({ theme }) => theme.fonts.secondary};
    `}

    ${variant === 'overline' &&
    css`
      text-transform: uppercase;
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      font-family: ${({ theme }) => theme.fonts.tertiary};
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
