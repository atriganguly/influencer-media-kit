/** Public URL of the deployed kit: CI-provided VITE_SITE_URL wins over the JSON value. */
export function resolveSiteUrl(fallback: string): string {
  const raw = import.meta.env.VITE_SITE_URL || fallback;
  return raw.replace(/\/+$/, '') + '/';
}
