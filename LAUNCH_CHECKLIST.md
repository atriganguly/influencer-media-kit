# Launch checklist

The repo ships with a **demo persona** ("Elena Vance"). Go through this list before sharing the link or the PDF.

- [ ] **Identity**: `creator` block (name, `initials`, handle, Instagram/TikTok, tagline, bio, locations, pillars).
- [ ] **Photos**: use photos your friend owns. Save them in `public/images/` and reference them relatively, e.g. `"./images/portrait.jpg"` (about 1200px wide, under 300 KB). Replace the Unsplash URLs for `heroPortraitUrl` and every case study `heroImage`.
- [ ] **Numbers**: `headlineMetrics`, `formatPerformance`, `audience` must come from real Instagram/TikTok Insights screenshots. Update `meta.lastUpdated` every time. Brands trust dated numbers.
- [ ] **Case studies and partners**: list only real collaborations. Real brand names and client quotes need permission. A false claim of a partnership with a luxury house is a legal risk.
- [ ] **Rates**: set real `startingPriceUsd` and multipliers, or hide them (see "Rates visibility" in README).
- [ ] **Contact**: real booking/press emails and phone. These are public once deployed. Use a role address, not a personal one.
- [ ] **Meta**: `meta.liveUrl` (the QR code and vCard use it; CI overrides it with the real Pages URL), `meta.pdfFileName`, `meta.editionLabel`.
- [ ] **Flip the switch**: set `"demoMode": false`. The build now fails if any demo markers remain (`npm run check:launch`).
- [ ] Run `npm run build:full`, open `dist/media-kit.pdf`, and check every page.
- [ ] Push to `main`, wait for the Actions run to go green, open the Pages URL on a phone, test the QR code, download the PDF.
- [ ] Share the link in WhatsApp/LinkedIn to confirm the preview card (title + image) shows.
