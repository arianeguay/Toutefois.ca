import styled, { css } from 'styled-components';

export const ContainerStyled = styled.div<{
  $background?: string;
  $noPadding?: boolean;
}>`
  width: 100%;
  ${({ theme, $noPadding }) =>
    !$noPadding &&
    css`
      padding-block: ${theme.spacing.xxl}px;
    `};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ $background }) =>
    $background &&
    css`
      background-color: ${$background};
    `};
`;

export const ContainerContentStyled = styled.section`
  max-width: 1200px;
  width: 100%;
`;
