import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const PageNumber = styled.span<{ $active?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  background: none;
  border: none;
  box-shadow: none;
  ${({ $active }) =>
    $active
      ? css`
          font-weight: bold;
        `
      : css`
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        `}
`;

export const LimitSelect = styled.select``;
