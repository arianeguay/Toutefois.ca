'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const MenuItemLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.body}px;
  line-height: ${({ theme }) => theme.lineHeights.body + 2}px;
  white-space: nowrap;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          color: ${theme.colors.buttonPrimaryBackground};
        `
      : css`
          color: ${theme.colors.lightText};
          &:hover {
            color: ${theme.colors.buttonPrimaryBackground};
            text-shadow: 0 0 10px ${theme.colors.buttonPrimaryBackground};
          }
        `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ $isActive, theme }) =>
      $isActive
        ? css`
            color: ${theme.colors.buttonPrimaryBackground};
          `
        : css`
            color: ${theme.colors.primaryText};
            &:hover {
              color: ${theme.colors.buttonPrimaryBackground};
              text-shadow: 0 0 10px ${theme.colors.buttonPrimaryBackground};
            }
          `}
  }
`;
