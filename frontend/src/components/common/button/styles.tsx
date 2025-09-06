import styled, { css } from 'styled-components';
import theme from '../../../theme';
import type { ButtonSize, ButtonVariant } from './types';

interface ButtonTheme {
  backgroundColor: string;
  borderColor: string;
}
const buttonThemes: Record<ButtonVariant, ButtonTheme> = {
  primary: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
    borderColor: theme.colors.buttonPrimaryBackground,
  },
  secondary: {
    backgroundColor: theme.colors.buttonSecondaryBackground,
    borderColor: theme.colors.buttonSecondaryBackground,
  },
  tertiary: {
    backgroundColor: theme.colors.buttonTertiaryBackground,
    borderColor: theme.colors.buttonTertiaryBackground,
  },
};
const getButtonColors = (variant: ButtonVariant) => {
  const buttonTheme = buttonThemes[variant];
  return css`
    background-color: ${buttonTheme.backgroundColor};
    border: 1px solid ${buttonTheme.borderColor};
  `;
};

export const ButtonContainerStyled = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  min-height: ${({ theme, $size }) => theme.buttonSize[`height_${$size}`]};
  min-width: ${({ theme, $size }) => theme.buttonSize[`width_${$size}`]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  width: fit-content;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  transition: all 0.1s ease;

  ${({ $variant }) => getButtonColors($variant)}
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;
