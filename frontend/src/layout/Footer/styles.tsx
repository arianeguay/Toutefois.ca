'use client';

import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const FooterContainer = styled.footer<{ $mainColor?: string }>`
  width: 100%;
  background-color: ${({ theme, $mainColor }) =>
    $mainColor || theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.lightText};
  padding-block: ${({ theme }) => theme.spacing.lg}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
`;

export const FooterContent = styled.div`
  ${ContainerContentStyling}
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  a {
    color: inherit;
    text-decoration: underline;
    display: block;
    margin-block: ${({ theme }) => theme.spacing.xs}px;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(1, 1fr);
    gap: ${({ theme }) => theme.spacing.md}px;
  }
`;

export const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  align-self: stretch;
`;
