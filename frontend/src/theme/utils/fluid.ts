/**
 * Generates a CSS clamp() function for fluid typography and spacing
 * Scales smoothly between min and max values across the viewport range
 */
export const clampPx = (minPx: number, maxPx: number, minViewport = 360, maxViewport = 1280): string => {
  // Calculate the slope of the linear equation
  const slope = (maxPx - minPx) / (maxViewport - minViewport);
  // Calculate y-axis intercept (b in y = mx + b)
  const yAxis = minPx - slope * minViewport;
  // Convert to vw units (percentage of viewport width)
  const vw = (slope * 100).toFixed(5);
  // Convert to rem for better accessibility
  const remMin = (minPx / 16).toFixed(4);
  const remMax = (maxPx / 16).toFixed(4);

  // Return the CSS clamp function with rem units + vw slope
  return `clamp(${remMin}rem, ${yAxis.toFixed(4)}px + ${vw}vw, ${remMax}rem)`;
};

/**
 * Converts pixel value to rem value
 */
export const pxToRem = (px: number): string => {
  return `${(px / 16).toFixed(4)}rem`;
};

/**
 * Creates a fluid scale for spacing values
 */
export const fluidSpace = (
  minPx: number, 
  maxPx: number, 
  minViewport = 360, 
  maxViewport = 1280
): string => {
  return clampPx(minPx, maxPx, minViewport, maxViewport);
};
