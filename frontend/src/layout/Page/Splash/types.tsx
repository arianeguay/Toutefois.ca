export interface SplashProps {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  side?: 'left' | 'right';
  top?: number;
}

export type SplashName = 'Splash1' | 'Splash2' | 'Splash3';
export type StartingSide = 'left' | 'right';
