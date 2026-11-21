import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const DATA_FILE = new URL('./src/data/kit.data.json', import.meta.url);

const esc = (v: string): string =>
  v
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Injects <title>, description, canonical, Open Graph / Twitter tags and a
 * monogram favicon into index.html from src/data/kit.data.json, so the JSON
 * stays the single source of truth.
 */
function kitHeadMeta(): Plugin {
  return {
    name: 'kit-head-meta',
    transformIndexHtml(html) {
      const kit = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      const { meta, creator, headlineMetrics } = kit;
      const site = (process.env.VITE_SITE_URL || meta.liveUrl).replace(/\/+$/, '') + '/';
      const title = `${creator.fullName} (${creator.handle}) — Media Kit`;
      const description = `${meta.editionLabel}. ${creator.tagline}`;
      const ogDescription = headlineMetrics
        .slice(0, 3)
        .map((m: { value: string; label: string }) => `${m.value} ${m.label}`)
        .join(' • ');
      const image = new URL(meta.ogImage || 'og-image.png', site).href;
      const initials = (
        creator.initials ||
        creator.fullName
          .split(/\s+/)
          .map((w: string) => w[0])
          .join('')
          .slice(0, 2)
      ).toUpperCase();
      const favicon =
        'data:image/svg+xml,' +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#141413"/><text x="32" y="42" font-family="Georgia,serif" font-size="30" text-anchor="middle" fill="#C9A978">${esc(initials)}</text></svg>`
        );

      const tags = [
        `<title>${esc(title)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        meta.demoMode ? '<meta name="robots" content="noindex, nofollow" />' : '',
        `<link rel="canonical" href="${esc(site)}" />`,
        `<link rel="icon" href="${favicon}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(ogDescription)}" />`,
        `<meta property="og:url" content="${esc(site)}" />`,
        `<meta property="og:image" content="${esc(image)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(ogDescription)}" />`,
        `<meta name="twitter:image" content="${esc(image)}" />`,
      ]
        .filter(Boolean)
        .join('\n    ');

      return html.replace('<!--KIT_HEAD_META-->', tags);
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('kit.data.json')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), kitHeadMeta()],
  base: './',
});
