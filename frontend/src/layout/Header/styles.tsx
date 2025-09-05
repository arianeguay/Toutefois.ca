import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  height: 70px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.mainBackground};
`;
