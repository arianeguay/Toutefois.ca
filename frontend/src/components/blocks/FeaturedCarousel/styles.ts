'use client';

import styled from 'styled-components';

export const CarouselContainer = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainBackground};
  background-color: #000;
  height: calc(
    60vh - ${({ theme }) => theme.appearance.headerHeight} -
      ${({ theme }) => theme.spacing.xxl}px
  );
  overflow: hidden;
  min-height: 540px;
  width: 100%;
`;
