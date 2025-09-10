'use client';

import styled from 'styled-components';

export const FooterContainer = styled.footer<{ $mainColor?: string }>`
  width: 100%;
  background-color: ${({ theme, $mainColor }) =>
    $mainColor || theme.colors.headerBackground};
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

  a {
    color: inherit;
    text-decoration: underline;
    display: block;
    margin-block: ${({ theme }) => theme.spacing.xs}px;

    &:hover {
      text-decoration: none;
    }
  }
`;
