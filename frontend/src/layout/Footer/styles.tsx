'use client';

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.lightText};
  padding-block: ${({ theme }) => theme.spacing.md}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
`;
