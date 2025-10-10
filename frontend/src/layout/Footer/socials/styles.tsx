'use client';
import styled from 'styled-components';

export const SocialsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  a {
    &:hover {
      color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;
