import theme from '@/theme';
import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './types';

interface ButtonTheme {
  backgroundColor: string;
  textColor: string;
}
const buttonThemes: Record<ButtonVariant, ButtonTheme> = {
  primary: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
    textColor: theme.colors.buttonPrimaryColor,
  },
  secondary: {
    backgroundColor: theme.colors.buttonSecondaryBackground,
    textColor: theme.colors.buttonSecondaryColor,
  },
  tertiary: {
    backgroundColor: theme.colors.buttonTertiaryBackground,
    textColor: theme.colors.buttonTertiaryColor,
  },
};

const buttonSizeWeight: Record<ButtonSize, string> = {
  sm: theme.fontWeights.normal,
  md: theme.fontWeights.medium,
  lg: theme.fontWeights.bold,
};

const getButtonColors = (variant: ButtonVariant) => {
  const buttonTheme = buttonThemes[variant];
  return css`
    background-color: ${buttonTheme.backgroundColor};
    color: ${buttonTheme.textColor};
    border: 1px solid ${buttonTheme.backgroundColor};
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
  font-weight: ${({ $size }) => buttonSizeWeight[$size]};
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
`;
