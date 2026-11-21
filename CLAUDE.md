@AGENTS.md

## Claude Code notes
- Editing content is the common task: change only `src/data/kit.data.json`, then run `npm run typecheck`.
- For layout changes, run `npm run build && npm run generate:pdf` and rasterise/inspect `dist/media-kit.pdf` before calling the work done.
- Do not commit or push unless asked. Never commit `.env*` files other than `.env.example`.
