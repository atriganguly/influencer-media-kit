// Builds dist/media-kit.pdf (vector, A4) and dist/og-image.png (1200x630 link preview)
// from the already-built site in dist/. Run `npm run build` first.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const pdfPath = path.join(distDir, 'media-kit.pdf');
const ogPath = path.join(distDir, 'og-image.png');
const PORT = 4173;

async function main() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found. Run `npm run build` first.');
  }

  const server = await preview({
    root,
    preview: { port: PORT, host: '127.0.0.1', strictPort: true },
  });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

    const problems = [];
    page.on('pageerror', (err) => problems.push(`page error: ${err.message}`));
    page.on('requestfailed', (req) =>
      problems.push(`request failed: ${req.url()} (${req.failure()?.errorText})`)
    );
    page.on('response', (res) => {
      if (res.status() >= 400) problems.push(`HTTP ${res.status()}: ${res.url()}`);
    });

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(
      () => [...document.images].every((img) => img.complete && img.naturalWidth > 0),
      undefined,
      { timeout: 30_000 }
    );

    // The og-image.png itself is requested by nobody at build time, so any 404s are real problems.
    // 1) Link-preview image: top of the page, without the sticky utility bar.
    await page.addStyleTag({ content: 'header{display:none!important}' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: ogPath, type: 'png' });
    console.log(`OG image written to ${ogPath}`);

    // 2) Canonical vector PDF using the print stylesheet.
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
    console.log(`Vector PDF written to ${pdfPath}`);

    if (problems.length > 0) {
      throw new Error(`Page reported problems while rendering:\n - ${problems.join('\n - ')}`);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
