'use client';

import { useColorContext } from '@/providers/color-provider';
import { hexToEquivalentRgba } from '@/theme/utils/hexToRgba';
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  ${({ theme }) => {
    const { mainColor } = useColorContext();
    const color = mainColor || theme.colors.headerBackground;
    const bgColor = hexToEquivalentRgba(
      color,
      theme.colors.mainBackground,
      0.9,
    );

    const boxShadow = theme.boxShadow.xxlColored(color);

    return css`
      background-color: ${bgColor};
      box-shadow: ${boxShadow};
      border-bottom: 1px solid ${color};
    `;
  }};

  backdrop-filter: blur(10px);
  height: ${({ theme }) => theme.appearance.headerHeight};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
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
