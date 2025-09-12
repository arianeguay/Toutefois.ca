import { ContainerContentStyling } from '@/theme/global-styles';
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

  ${({ $background }) =>
    $background &&
    css`
      background-color: ${$background};
    `};
`;

export const ContainerContentStyled = styled.section`
  ${ContainerContentStyling}
`;
