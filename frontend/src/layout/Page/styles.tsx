'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { WordpressStyling } from '../../theme/wp-style';

interface PageContainerProps {
  $template?: string;
  $color?: string;
}

export const PageContainer = styled.div<PageContainerProps>`
  background-color: ${({ $color }) => $color || 'transparent'};
  width: 100vw;
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
        return css`
          > main {
            margin-block-start: 54px;
            margin-block-end: 32px;
            overflow-x: hidden;
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
  width: 100%;
  flex: 1;
  position: relative;
  ${WordpressStyling}
`;

const LightLink = css`
  color: ${({ theme }) => theme.colors.lightText};
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
  }
`;

const DarkLink = css`
  color: ${({ theme }) => theme.colors.primaryText};
  &:hover {
    color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
  }
`;

export const BackToLink = styled(Link)<{ $template?: string }>`
  &.back-to {
    display: block;
    margin-block-start: 12px;
    width: fit-content;
    ${ContainerContentStyling}

    ${({ $template }) =>
      $template === 'template-banner.php' ? LightLink : DarkLink}
    z-index: 100;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      display: none;
    }
  }
`;
