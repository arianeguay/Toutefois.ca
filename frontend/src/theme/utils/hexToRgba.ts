const hexToRgba = (hex: string, alpha: number = 1): string => {
  // Remove leading "#" if present
  hex = hex.replace(/^#/, '');

  // Expand shorthand (e.g. "03F") to full form ("0033FF")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default hexToRgba;

/**
 * Compute the base RGBA color that, when placed over a background at a given opacity,
 * visually matches a target hex color.
 *
 * Example:
 *   hexToEquivalentRgba('#282651', '#f4f2ef', 0.8)
 *   → "rgba(0, 0, 42, 0.8)"
 */
export const hexToEquivalentRgba = (
  targetHex: string,
  backgroundHex: string,
  alpha: number,
  offset: number = 3,
): string => {
  // Helper to convert hex → [r,g,b]
  const hexToRgb = (hex: string): [number, number, number] => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  };

  const [tr, tg, tb] = hexToRgb(targetHex);
  const [br, bg, bb] = hexToRgb(backgroundHex);

  // Solve for baseColor:  target = base*alpha + background*(1 - alpha)
  const solveChannel = (target: number, bg: number): number => {
    const base = (target - bg * (1 - alpha)) / alpha;
    return Math.min(255, Math.max(0, Math.round(base))); // clamp to [0,255]
  };

  const addOffset = (target: number, offset: number): number => {
    return Math.min(255, Math.max(0, target + offset));
  };

  const removeOffset = (target: number, offset: number): number => {
    return Math.min(255, Math.max(0, target - offset));
  };
  const r = solveChannel(tr, br);
  const g = solveChannel(tg, bg);
  const b = solveChannel(tb, bb);

  return `rgba(${removeOffset(r, offset)}, ${removeOffset(g, offset)}, ${removeOffset(b, offset)}, ${alpha})`;
};
