# Influencer Media Kit

A fast, static media kit website with a one-click **PDF export**, hosted entirely on free GitHub services (GitHub Pages + GitHub Actions). No servers, no database, no paid tools.

- **Live site:** `https://<github-username>.github.io/<repo-name>/`
- **Canonical PDF:** `.../media-kit.pdf` (rebuilt automatically on every push)
- **Custom PDF:** the "Export Custom View (PDF)" button prints the filtered view (a chosen vertical, rates shown/hidden, a selected package) through the browser's "Save as PDF".

Stack: React 19, TypeScript, Vite, Tailwind CSS 3.4. Content comes from one JSON file.

> The repo ships with a **demo persona**. Read [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) before sharing it.

## Quick start

Requires Node 22 or newer (`.nvmrc` pins 24).

```bash
npm install
npm run dev          # http://localhost:5173
```

## Editing content (no coding needed)

Everything on the page comes from [`src/data/kit.data.json`](src/data/kit.data.json): bio, metrics, case studies, partners, rates, contact, and the page title / link preview. You can edit it straight on github.com (pencil icon -> commit to `main`); the site and PDF rebuild in about 2 minutes. The build fails with a clear error if a field is mistyped, so a broken edit never goes live.

Images: put files in `public/images/` and reference them as `"./images/photo.jpg"` (relative path, no leading `/`).

## Deploying to GitHub Pages

1. Create a **public** repository and push this code to `main`. (Free GitHub accounts can only use Pages on public repos, so everything in the repo, including rates, is publicly readable.)
2. **Settings -> Pages -> Build and deployment -> Source: GitHub Actions.**
3. Push (or **Actions -> Build & Deploy Media Kit -> Run workflow**). The workflow installs, type-checks, builds, renders `media-kit.pdf` and `og-image.png` with headless Chromium, and publishes `dist/`.

Pull requests run a build + PDF check and attach the PDF as a downloadable artifact.

## PDF export

| Need | How |
|---|---|
| Share the standard kit | Send the link, or the file from `.../media-kit.pdf`. It is regenerated on every deploy (A4, vector, selectable text) |
| Tailored version (one vertical, chosen package, rates hidden) | Set the filters on the page and click **Export Custom View (PDF)** -> choose *Save as PDF*, margins *Default*, enable *Background graphics* |
| Refresh the PDF without changing anything | Actions -> Run workflow |
| Local PDF | `npm run build:full` -> `dist/media-kit.pdf` (first time: `npx playwright install chromium`) |

## Rates visibility (read this)

`pricing.defaultPublicVisible` and the URL override (`?rates=false` / `?rates=true`) control **what is displayed**, which is handy for sending a rate-free link to a brand or an agency. They are **not security**: the rates are still in the public repo and the JavaScript bundle. If rates must be truly private, remove the numbers from `kit.data.json` and share them by email.

Optional remote flag: set `pricing.remoteFlagUrl` to the raw URL of a public GitHub Gist containing `{ "publicRatesEnabled": false }` to flip visibility without a redeploy. Leave it empty to disable. Rates stay hidden behind a placeholder until the flag loads (1.5 s timeout), so there is no flash of content.

## Optional extras

- **Custom domain:** add the domain in Settings -> Pages and a `public/CNAME` file containing it. Update `meta.liveUrl`.
- **Transfer to your friend's account:** Settings -> Danger zone -> Transfer. The Pages URL changes; CI picks up the new URL automatically (update `meta.liveUrl` for local builds).
- **Analytics:** GoatCounter or Cloudflare Web Analytics are free and cookie-free; add their script tag via the `kit-head-meta` plugin in `vite.config.ts`.
- **License:** none is included on purpose, so the photos, copy and data stay "all rights reserved". Add one only if you intend to open-source the template.

## Project layout

```
src/data/kit.data.json   all content (single source of truth)
src/types/mediaKit.ts    schema
src/components/          page sections
src/styles/print.css     PDF/print rules
scripts/generate-pdf.mjs PDF + OG image (Playwright)
scripts/check-launch.mjs placeholder guard
.github/workflows/       deploy (Pages) and CI (PRs)
```

For AI coding agents see [AGENTS.md](AGENTS.md) / [CLAUDE.md](CLAUDE.md).
