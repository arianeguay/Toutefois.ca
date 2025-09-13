'use client';

import { ButtonContainerStyled } from './styles';
import type { ButtonProps } from './types';
import ButtonLinkWrapper from './wrapper';

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  style,
  onClick,
  disabled,
}) => {
  return (
    <ButtonLinkWrapper href={href}>
      <ButtonContainerStyled
        $variant={variant}
        $size={size}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </ButtonContainerStyled>
    </ButtonLinkWrapper>
  );
};

export default Button;
