'use client';

import { getElement } from './styles';
import type { TypographyProps } from './types';

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  variant = 'body',
  element = 'p',
  children,
  lineClamp,
  ...props
}) => {
  const Element = getElement(element);
  return (
    <Element $variant={variant} $lineClamp={lineClamp} {...props}>
      {children}
    </Element>
  );
};

export default Typography;
