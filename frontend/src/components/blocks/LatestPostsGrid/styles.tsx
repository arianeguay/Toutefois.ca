import { ContainerContentStyling } from '@/theme';
import styled from 'styled-components';

export const GridContainer = styled.div`
  ${ContainerContentStyling}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: ${({ theme }) => theme.spacing.md}px;

  & > *:first-child {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);

    & > *:first-child {
      grid-column-span: 1;
    }
  }
`;
