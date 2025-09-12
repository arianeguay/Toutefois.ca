'use client';

import styled, { css } from 'styled-components';
import { WordpressStyling } from '../../wp-style';

interface PageContainerProps {
  $template?: string;
}

export const PageContainer = styled.div<PageContainerProps>`
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
