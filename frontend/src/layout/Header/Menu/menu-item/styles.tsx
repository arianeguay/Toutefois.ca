import Link from 'next/link';
import styled from 'styled-components';

export const MenuItemLink = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.body}px;
  line-height: ${({ theme }) => theme.lineHeights.body + 2}px;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.buttonPrimaryBackground};
  }
`;
