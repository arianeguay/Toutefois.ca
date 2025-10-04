'use client';

import { useColorContext } from '@/providers/color-provider';
import { ContainerContentStyling } from '@/theme/global-styles';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => {
    const { mainColor } = useColorContext();
    return mainColor || theme.colors.headerBackground;
  }};
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
    gap: 0;
    text-align: center;
  }
`;

export const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  align-self: stretch;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.xs}px;
    &:before {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.lightText};
      margin-block: ${({ theme }) => theme.spacing.md}px;
    }
  }
`;

export const FooterActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
    flex-direction: column;
    &:before {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.lightText};
      margin-block: ${({ theme }) => theme.spacing.lg}px;
    }
  }
`;
