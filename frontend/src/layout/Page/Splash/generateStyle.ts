import { CSSProperties } from 'react';
import { SplashProps } from './types';

const generateSplashStyle = ({
  size = 'medium',
  side = 'left',
  style,
  color,
  ogWidth,
  ogHeight,
  top = 0,
}: SplashProps & { ogWidth: number; ogHeight: number }): CSSProperties => {
  const width =
    size === 'small'
      ? ogWidth / 2
      : size === 'medium'
        ? ogWidth
        : size === 'large'
          ? ogWidth * 2
          : 0;

  const margin = -width / 6;
  return {
    ...style,
    color,
    width: width,

    height: 'auto',
    position: 'absolute',
    top,
    aspectRatio: ogWidth / ogHeight,
    left: side === 'left' ? margin : 'auto',
    right: side === 'right' ? margin : 'auto',
    zIndex: -1,
  };
};

export default generateSplashStyle;
