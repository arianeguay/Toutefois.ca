import theme from '@/theme';

export type TypographyElementType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'small'
  | 'overline'
  | 'subtitle'
  | 'big';
export interface TypographyProps {
  variant?: TypographyVariant;
  element?: TypographyElementType;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler;
  lineClamp?: number;
  color?: keyof typeof theme.colors;
}
