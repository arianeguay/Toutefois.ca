'use client';

import styled from 'styled-components';

export const CarouselContainer = styled.div`
  border-bottom: ${({ theme }) => theme.borders.section};
  background-color: #000;
  height: calc(
    60vh - ${({ theme }) => theme.appearance.headerHeight} -
      ${({ theme }) => theme.spacing.xxl}px
  );
  overflow: hidden;
  min-height: 540px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: calc(90vh - ${({ theme }) => theme.appearance.headerHeight});
  }
`;
