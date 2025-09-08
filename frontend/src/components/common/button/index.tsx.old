import { ButtonContainerStyled } from './styles';
import type { ButtonProps } from './types';
import ButtonLinkWrapper from './wrapper';

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  style,
}) => {
  return (
    <ButtonLinkWrapper to={to}>
      <ButtonContainerStyled $variant={variant} $size={size} style={style}>
        {children}
      </ButtonContainerStyled>
    </ButtonLinkWrapper>
  );
};

export default Button;
