'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.header<{ $mainColor?: string }>`
  width: 100%;
  background-color: ${({ theme, $mainColor }) =>
    $mainColor || theme.colors.headerBackground};
  height: ${({ theme }) => theme.appearance.headerHeight};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  border-bottom: ${({ theme }) => theme.borders.subtle};
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xl}px;
    justify-content: space-between;
    padding-inline: ${({ theme }) => theme.spacing.lg}px;
  }
`;

export const LogoImage = styled.img`
  width: 100px;
  height: auto;
  object-fit: contain;
  aspect-ratio: 1;
  position: relative;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70px;
    height: auto;
  }
`;
