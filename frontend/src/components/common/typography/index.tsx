'use client';

import { getElement } from './styles';
import type { TypographyProps } from './types';

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  variant = 'body',
  element = 'p',
  children,
  ...props
}) => {
  const Element = getElement(element);
  return (
    <Element $variant={variant} {...props}>
      {children}
    </Element>
  );
};

export default Typography;
