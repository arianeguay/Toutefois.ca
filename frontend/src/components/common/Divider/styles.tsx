import styled, { css, DefaultTheme } from 'styled-components';

const DividerHorizontal = (theme: DefaultTheme) => css`
  height: 1px;
  background-color: ${theme.colors.borderColor1};
  margin-block-start: ${({ theme }) => theme.spacing.sm}px;
  margin-block-end: ${({ theme }) => theme.spacing.md}px;
  width: 100%;
  max-width: 40%;
`;
const DividerVertical = (theme: DefaultTheme) => css`
  width: 1px;
  height: auto;
  align-self: stretch;
  min-height: 12px;
  background-color: ${theme.colors.borderColor1};
`;
export const DividerStyled = styled.hr<{
  $direction?: 'horizontal' | 'vertical';
}>`
  &.divider {
    ${({ theme, $direction }) =>
      $direction === 'vertical'
        ? DividerVertical(theme)
        : DividerHorizontal(theme)}
  }
`;
