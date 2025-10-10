'use client';
import styled from 'styled-components';

export const JoinInfoRowLink = styled.a`
  &.join-info-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    width: fit-content;
    margin-block-end: ${({ theme }) => theme.spacing.xs}px;
    margin-block-start: 0;
    &:hover {
      color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    }
  }
`;

export const JoinSectionContainer = styled.div``;

export const JoinSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xs}px;
    margin-block-end: ${({ theme }) => theme.spacing.md}px;
    ${JoinInfoRowLink} {
      p {
        width: 100%;
      }
      svg {
        display: none;
      }
    }
  }
`;
