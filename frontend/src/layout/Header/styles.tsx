'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.header<{ $mainColor?: string }>`
  width: 100%;
  background-color: ${({ theme, $mainColor }) =>
    $mainColor || theme.colors.headerBackground};
  height: ${({ theme }) => theme.appearance.headerHeight};
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainBackground};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;
