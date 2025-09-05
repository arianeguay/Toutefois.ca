export type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'small'
  | 'subtitle'
  | 'big';
export interface TypographyProps {
  variant?: Variant;
  element?: ElementType;
}
