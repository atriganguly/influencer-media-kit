// Pre-launch guard: detects demo/placeholder content in src/data/kit.data.json.
//   node scripts/check-launch.mjs            -> warn while meta.demoMode is true, fail once it is false
//   node scripts/check-launch.mjs --strict   -> always fail when markers are found
import { readFileSync } from 'node:fs';

const file = new URL('../src/data/kit.data.json', import.meta.url);
const raw = readFileSync(file, 'utf-8');
const data = JSON.parse(raw);
const strict = process.argv.includes('--strict');
const inCi = process.env.GITHUB_ACTIONS === 'true';

const markers = [
  [/images\.unsplash\.com/i, 'Stock photos from Unsplash are still used (replace with real photos in public/images/).'],
  [/elenavance/i, 'The demo persona handle/email domain "elenavance" is still present.'],
  [/\+44 ?20 ?7946/, 'The fictional UK phone number (+44 20 7946 xxxx) is still present.'],
  [/placeholder-owner/i, 'pricing.remoteFlagUrl still points at the placeholder Gist.'],
  [/Maison Vance Studio|Camille Laurent/i, 'The demo representative "Camille Laurent / Maison Vance Studio" is still present.'],
];

const findings = markers.filter(([re]) => re.test(raw)).map(([, msg]) => msg);
if (data.meta?.demoMode === true) findings.unshift('meta.demoMode is true (shows a demo ribbon and adds noindex).');

const mustFail = findings.length > 0 && (strict || data.meta?.demoMode === false);

if (findings.length === 0) {
  console.log('check-launch: no demo/placeholder content found. Ready to go live.');
  process.exit(0);
}

for (const msg of findings) {
  console.log(inCi ? `::${mustFail ? 'error' : 'warning'} file=src/data/kit.data.json::${msg}` : `- ${msg}`);
}
console.log(
  mustFail
    ? `\ncheck-launch: ${findings.length} placeholder issue(s) block this launch. See LAUNCH_CHECKLIST.md.`
    : `\ncheck-launch: demo mode is on, so this is only a warning (${findings.length} item(s)). See LAUNCH_CHECKLIST.md.`
);
process.exit(mustFail ? 1 : 0);
