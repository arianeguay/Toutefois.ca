'use client';

import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { getElement } from './styles';
import type { TypographyProps } from './types';

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  variant = 'body',
  element = 'p',
  children,
  lineClamp,
  color,
  ...props
}) => {
  const theme = useTheme();
  const colorValue = useMemo(
    () => (color ? theme.colors[color] : undefined),
    [color, theme.colors],
  );
  const Element = getElement(element);

  const classes = [variant, props.className].filter(Boolean).join(' ');
  return (
    <Element
      $variant={variant}
      className={classes}
      $lineClamp={lineClamp}
      style={{
        ...(props.style ?? {}),
        color: colorValue ?? props.style?.color,
      }}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;
