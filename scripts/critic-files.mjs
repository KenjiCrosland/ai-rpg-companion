// Build the two critic files from review batches: node scripts/critic-files.mjs <case.md> <REVIEW-run>... → RELEASE-for-critic-2024-<date>.md / -2014-<date>.md
// The case (the response to the audit, the gate summary) sits on top of the 2024 file; each block lands by the edition in its checker row's CR cell.
import fs from 'node:fs';
import path from 'node:path';
const [caseFile, ...runs] = process.argv.slice(2);
if (!caseFile || !runs.length) { console.error('usage: node scripts/critic-files.mjs <case.md> <REVIEW-run-name>...'); process.exit(1); }
const date = new Date().toISOString().slice(0, 10);
// A SECOND PACKAGE ON THE SAME DAY MUST NOT CLOBBER THE FIRST (2026-10-16: two
// packages shipped in one day, and the second overwrote the first — recoverable
// only because every REVIEW input survived). The case file's own name carries
// the distinction, so the output takes it: "RELEASE-case-stage2-2026-10-16.md"
// yields "...-2026-10-16-stage2.md". A plain "RELEASE-case-<date>" keeps the
// bare name it has always had.
const slug = (() => {
  const b = path.basename(caseFile, '.md');
  const m = /^RELEASE-case-(.+?)-?\d{4}-\d{2}-\d{2}$/.exec(b);
  return m && m[1] ? `-${m[1].replace(/^-|-$/g, '')}` : '';
})();
const caseText = fs.readFileSync(caseFile, 'utf8').trim();
const out = { 2024: [], 2014: [] };
for (const r of runs) {
  const text = fs.readFileSync(`scripts/smoke-evidence/${r}.md`, 'utf8');
  const [head, ...secs] = text.split(/\n(?=## )/);
  const gate = secs.find((s) => s.startsWith('## Gate table'));
  const by = { 2024: [], 2014: [] };
  for (const b of secs.filter((s) => !s.startsWith('## Gate table'))) { const row = b.split('\n').find((l) => /^\| [^|]+ \| \d+(?:\/\d)? (?:\(2014\) )?\|/.test(l)); by[row && /\(2014\)/.test(row) ? 2014 : 2024].push(b.replace(/^## /, '### ')); }
  for (const ed of [2024, 2014]) out[ed].push(`## Review batch — ${r.replace('REVIEW-', '')}\n\n${head.split('\n').slice(1).join('\n').trim()}\n\n${(gate ?? '').replace(/^## /, '### ')}\n\n${by[ed].length ? by[ed].join('\n\n') : `_No ${ed} blocks sampled in this run._`}`);
}
const f24 = `scripts/smoke-evidence/RELEASE-for-critic-2024-${date}${slug}.md`; const f14 = `scripts/smoke-evidence/RELEASE-for-critic-2014-${date}${slug}.md`;
for (const f of [f24, f14]) if (fs.existsSync(f) && !process.argv.includes('--force')) { console.error(`refusing to overwrite ${f} — pass --force, or name the case file RELEASE-case-<slug>-${date}.md`); process.exit(2); }
fs.writeFileSync(f24, `${caseText}\n\n---\n\n# 2024 blocks\n\n${out[2024].join('\n\n---\n\n')}\n`);
fs.writeFileSync(f14, `# Release table for the critic — 2014 blocks — ${date}\n\nThe case is at the top of the 2024 file (RELEASE-for-critic-2024-${date}${slug}.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.\n\n---\n\n${out[2014].join('\n\n---\n\n')}\n`);
for (const f of [f24, f14]) { const t = fs.readFileSync(f, 'utf8'); console.log(f, t.split('\n').length, 'lines,', (t.match(/^### (?!Gate table)/gm) ?? []).length, 'blocks'); }
