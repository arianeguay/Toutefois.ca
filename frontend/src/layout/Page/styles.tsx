'use client';

import styled from 'styled-components';
import { WordpressStyling } from '../../wp-style';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  width: 100%;
  flex: 1;

  ${WordpressStyling}
`;
