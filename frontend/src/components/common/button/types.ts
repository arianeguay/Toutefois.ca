export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // Changed from 'to' to 'href' to match Next.js Link API
  style?: React.CSSProperties;
  disabled?: boolean;
}
