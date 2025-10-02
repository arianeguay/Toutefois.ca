import theme from '..';

const LG = Number(String(theme.breakpoints.lg).replace('px', '') || 1024);

export function mediaIsMobileForWidth(width: number) {
  return width < LG;
}

export function mediaIsMobileNow(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.matchMedia === 'function') {
    // -1 so 1024px “lg” breakpoint is considered desktop
    return window.matchMedia(`(max-width: ${LG - 1}px)`).matches;
  }
  return mediaIsMobileForWidth(window.innerWidth);
}

// lib/isMobileFromUA.ts
export function isMobileFromUA(ua?: string | null) {
  if (!ua) return false;
  // keep it simple; swap for ua-parser-js if you want more nuance
  return /Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
    ua,
  );
}
