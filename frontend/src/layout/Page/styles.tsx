'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import Link from 'next/link';
import styled, { css, DefaultTheme } from 'styled-components';
import { WordpressStyling } from '../../theme/wp-style';

interface PageContainerProps {
  $template?: string;
  $color?: string;
}
export const PageContainer = styled.div<PageContainerProps>`
  background-color: ${({ $color }) => $color || 'transparent'};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0;

  ${({ $template }) => {
    switch ($template) {
      case 'template-banner.php':
        return css`
          > main {
            margin-top: 0;
            margin-bottom: 32px;
            overflow-x: hidden;
          }
        `;
      case 'template-title.php':
      case 'template-projects.php':
      case 'template-collaborators.php':
        return css`
          > main {
            margin-block-start: 54px;
            margin-block-end: 32px;
            overflow-x: hidden;
          }
        `;
      case 'template-carousel.php':
        return css`
          > main {
            margin-top: 0;
            margin-bottom: 32px;
            overflow-x: hidden;
          }
        `;
      case 'template-fullwidth.php':
        return css`
          > main {
            margin: 0;
            padding: 0;
            overflow-x: hidden;

            .entry-content {
              max-width: 100%;
              padding: 0;
            }
          }
        `;
      default:
        return css`
          > main {
            margin: 0;
            overflow-x: hidden;
          }
        `;
    }
  }}
`;

export const MainContent = styled.main`
  flex: 1;
  position: relative;
  ${WordpressStyling}
`;

const LightLink = (theme: DefaultTheme) => css`
  color: ${theme.colors.lightText};
  position: absolute;
  top: ${theme.spacing.xxl}px;
  left: ${theme.spacing.xxl}px;
  z-index: 1;
  &:hover {
    color: ${theme.colors.buttonPrimaryBackground};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

const DarkLink = (theme: DefaultTheme) => css`
  color: ${theme.colors.primaryText};
  &:hover {
    color: ${theme.colors.buttonPrimaryBackground};
  }
`;

export const BackToLink = styled(Link)<{ $template?: string }>`
  &.back-to {
    display: block;
    margin-block-start: 12px;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
    ${ContainerContentStyling}

    ${({ theme, $template }) =>
      $template === 'template-banner.php' ? LightLink(theme) : DarkLink(theme)}

    /* Arrow hover animation */
    svg {
      transition: transform 200ms ease;
      transform-origin: left center;
    }
    p {
      margin-block: 0;
    }

    &:hover svg {
      transform: scaleX(1.35);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      display: none;
    }
  }
`;
