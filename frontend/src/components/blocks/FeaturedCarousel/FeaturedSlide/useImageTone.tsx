// hooks/useImageTone.ts
import { useEffect, useState } from 'react';

function srgbToLin(c: number) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

export function useImageTone(src?: string) {
  const [tone, setTone] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // in case your CDN sends CORS
    img.src = src;
    img.onload = () => {
      try {
        const w = 48,
          h = 48; // small sample for speed
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        let ySum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = srgbToLin(data[i]);
          const g = srgbToLin(data[i + 1]);
          const b = srgbToLin(data[i + 2]);
          // Relative luminance (WCAG)
          const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          ySum += y;
        }
        const avgY = ySum / (data.length / 4);
        // Threshold ~0.45 works well for photos
        setTone(avgY >= 0.45 ? 'light' : 'dark');
      } catch {
        // ignore and keep null (fallback styling will handle it)
      }
    };
  }, [src]);

  return tone; // 'light' | 'dark' | null (while loading)
}
