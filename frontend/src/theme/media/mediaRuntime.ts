// lib/mediaRuntime.ts
import { mediaIsMobileNow } from './mediaIsMobile';

type Sub = (isMobile: boolean) => void;

let started = false;
let isMobile = false;
const subs = new Set<Sub>();
let mql: MediaQueryList | null = null;
let rafId: number | null = null;

// simple debounce with rAF (enough for resize)
function scheduleRecalc() {
  if (rafId != null) return;
  rafId = window.requestAnimationFrame(() => {
    rafId = null;
    const next = mediaIsMobileNow();
    if (next !== isMobile) {
      isMobile = next;
      subs.forEach((cb) => cb(isMobile));
      // Also broadcast a DOM event if you prefer that style
      window.dispatchEvent(
        new CustomEvent('media:mobile-change', { detail: isMobile }),
      );
    }
  });
}

export function getIsMobile() {
  // Handle server-side rendering by checking window existence
  if (typeof window === 'undefined') {
    // Default to false on the server, will be updated on client hydration
    return false;
  }
  return isMobile;
}

export function subscribeIsMobile(cb: Sub): () => void {
  subs.add(cb);
  // call immediately with current value
  cb(isMobile);
  return () => subs.delete(cb);
}

export function startMediaRuntime() {
  if (started || typeof window === 'undefined') return;
  started = true;

  // initial
  isMobile = mediaIsMobileNow();

  // matchMedia (most efficient)
  const lg = parseInt(
    (typeof getComputedStyle === 'function'
      ? getComputedStyle(document.documentElement).getPropertyValue(
          '--lg-breakpoint',
        ) // optional CSS var
      : '') || '',
    10,
  );
  // We already compute in util; just mirror that query:
  mql = window.matchMedia(
    `(max-width: ${Number.isFinite(lg) ? lg - 1 : window.innerWidth - 1}px)`,
  );
  try {
    mql = window.matchMedia('(max-width: 1023px)'); // fallback; actual value doesn't matter—resize handler also runs
  } catch {}

  // listeners
  window.addEventListener('resize', scheduleRecalc, { passive: true });
  if (mql && typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', scheduleRecalc);
  } else if (mql && typeof (mql as any).addListener === 'function') {
    // Safari < 14
    (mql as any).addListener(scheduleRecalc);
  }
}

// Optional (only if you need manual cleanup somewhere)
export function stopMediaRuntime() {
  if (!started || typeof window === 'undefined') return;
  started = false;

  window.removeEventListener('resize', scheduleRecalc);
  if (mql && typeof mql.removeEventListener === 'function') {
    mql.removeEventListener('change', scheduleRecalc);
  } else if (mql && typeof (mql as any).removeListener === 'function') {
    (mql as any).removeListener(scheduleRecalc);
  }
  mql = null;
}
