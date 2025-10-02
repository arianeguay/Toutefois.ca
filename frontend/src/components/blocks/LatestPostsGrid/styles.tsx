'use client';
import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const GridContainer = styled.div`
  ${ContainerContentStyling}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: ${({ theme }) => theme.spacing.lg}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
    gap: ${({ theme }) => theme.spacing.lg}px;
    & > *:first-child {
      grid-column-start: 1;
      grid-column-end: 1;
    }
  }
`;
