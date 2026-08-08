/**
 * Resolves once the image is decoded and safe to paint, so callers can swap views
 * without the browser showing a half-loaded frame. Always resolves: a failed or slow
 * image must never block the UI, so errors and the timeout fall through quietly.
 */
export function preloadImage(src: string, timeoutMs = 3000): Promise<void> {
  if (typeof window === 'undefined' || !src || src.startsWith('data:')) {
    return Promise.resolve();
  }

  const img = new Image();
  img.src = src;

  const decoded = img.decode
    ? img.decode().catch(() => undefined)
    : new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeoutMs);
  });

  return Promise.race([decoded, timeout]).then(() => undefined);
}
