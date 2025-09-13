export type TypographyElementType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p';
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'small'
  | 'subtitle'
  | 'big';
export interface TypographyProps {
  variant?: TypographyVariant;
  element?: TypographyElementType;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler;
  lineClamp?: number;
}
