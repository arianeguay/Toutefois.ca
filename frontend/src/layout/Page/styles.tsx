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
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0;

  overflow-x: hidden;
  ${({ $template }) => {
    switch ($template) {
      case 'template-banner.php':
        return css`
          > main {
            margin-top: 0;
            margin-bottom: 32px;
          }
        `;
      case 'template-title.php':
        return css`
          > main {
            margin-block-start: 54px;
            margin-block-end: 32px;
          }
        `;
      default:
        return css`
          > main {
            margin: 0;
          }
        `;
    }
  }}
`;

export const MainContent = styled.main`
  width: 100%;
  flex: 1;
  ${WordpressStyling}
`;

export const BackToLink = styled(Link)`
  display: block;
  margin-block-start: 12px;
  width: fit-content;
  ${ContainerContentStyling}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;
