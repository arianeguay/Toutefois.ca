'use client';

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  height: ${({ theme }) => theme.appearance.headerHeight};
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainBackground};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;
