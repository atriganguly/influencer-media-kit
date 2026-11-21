# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Copilot, etc.) working in this repo.

## What this is
A static, single-page influencer media kit. React 19 + TypeScript + Vite + Tailwind CSS 3.4. It is hosted on **GitHub Pages** and built by **GitHub Actions**. There is no backend, database or server, and none may be added. A canonical A4 vector PDF (`media-kit.pdf`) and a link-preview image (`og-image.png`) are generated in CI by headless Chromium (Playwright).

## Commands
| Command | Purpose |
|---|---|
| `npm ci` / `npm install` | Install deps (Node >= 22, see `.nvmrc`) |
| `npm run dev` | Dev server |
| `npm run typecheck` | `tsc -b`, which also validates `kit.data.json` against `MediaKitData` |
| `npm run build` | Typecheck + production build into `dist/` |
| `npm run generate:pdf` | Needs `dist/` and `npx playwright install chromium`. Writes `dist/media-kit.pdf` and `dist/og-image.png` |
| `npm run build:full` | build + PDF |
| `npm run check:launch` | Detects demo/placeholder content (see below) |

There is no test suite. Verify changes with `npm run build`, then `npm run generate:pdf` and look at the PDF.

## Rules
1. **All content lives in `src/data/kit.data.json`.** Never hardcode creator names, numbers, URLs or copy in components or `index.html`. `<head>` tags (title, OG, favicon, noindex) are injected from the JSON by the `kit-head-meta` plugin in `vite.config.ts`.
2. **Types:** `src/types/mediaKit.ts` mirrors the JSON. `App.tsx` uses a typed assignment, not `as`. Keep it that way so a typo in the JSON fails the build. Vertical ids and tiers are plain strings; `'all'` is reserved (`ALL_VERTICALS`).
3. **Print/PDF is a first-class output.**
   - `tailwind.config.js` maps `sm`/`md`/`lg` to `(min-width) , print`, so the PDF gets the desktop layout. Do not undo this.
   - Use `.no-print` for interactive chrome, `.print-only` for print-only content, `.avoid-break` on cards, `.section-head` on section headings, `.page-break-before` for forced breaks (all in `src/styles/print.css`).
   - After any layout change, regenerate the PDF and inspect every page (no orphaned headings, no split cards).
4. **GitHub Pages is a sub-path site** (`/<repo>/`). Keep `base: './'` and use relative URLs. Never use root-absolute paths such as `/img.png`. Put self-hosted assets in `public/` and reference them relatively.
5. **Everything shipped is public.** The repo and the bundle are readable by anyone. Do not commit secrets, private rates, personal phone numbers or anything not meant for the public. `VITE_*` env vars are embedded in the bundle. The rate "kill-switch" (`pricing.defaultPublicVisible`, `?rates=`, optional remote flag) is only a presentation toggle, not access control.
6. **Fonts are self-hosted** via `@fontsource/*` (imported in `src/main.tsx`). Do not add Google Fonts or other CDN links (privacy, and the PDF build must be deterministic).
7. **Demo mode:** `meta.demoMode: true` shows a ribbon, adds `noindex`, and makes `check:launch` warn. When set to `false`, CI fails if placeholder content (Unsplash images, `elenavance`, fictional phone, placeholder Gist) remains. Follow `LAUNCH_CHECKLIST.md`.
8. Keep dependencies minimal. Tailwind stays on v3.4 unless a migration is requested.

## Deploy flow
Push to `main` -> `.github/workflows/deploy.yml`: `npm ci` -> `check:launch` -> `build` (with `VITE_SITE_URL` from `configure-pages`) -> Chromium PDF + OG image -> upload `dist/` -> deploy to Pages. Pull requests run `.github/workflows/ci.yml` (build + PDF, uploaded as a downloadable artifact). Pages must be set to Settings -> Pages -> Source: **GitHub Actions**.
