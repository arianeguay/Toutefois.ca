'use client';

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.lightText};
  padding-block: ${({ theme }) => theme.spacing.lg}px;
  padding-inline: ${({ theme }) => theme.spacing.xxl}px;
`;

export const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.content.maxWidth}px;
  margin-inline: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
