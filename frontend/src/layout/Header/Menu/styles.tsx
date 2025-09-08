import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  width: 100%;
`;
