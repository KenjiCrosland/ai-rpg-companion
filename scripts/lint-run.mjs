// THE RUN GATE (§8 R1): apply the sheet lints to a saved run and fail on findings.
//   node --import ./scripts/alias-loader.mjs scripts/lint-run.mjs <run-dir> [--quiet]
//
// This is the build-failing half of R1. `npm test` pins the DETECTORS (both
// directions, on the sheets the critic named); this pins the RUN. Keeping them
// apart is deliberate: a jest suite that was red on committed data until the
// writers are fixed would mask every new regression, which is the opposite of
// what this item is for.
//
// Exit 0 clean, 1 with findings, 2 on bad usage. Zero API cost — saved sheets only.
import fs from 'node:fs';
import path from 'node:path';
import { lintSheet, SHEET_LINTS } from '@/tools/statblock-generator/reskin/sheet-lints.mjs';

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const quiet = args.includes('--quiet');
if (!dir || !fs.existsSync(dir)) {
  console.error('usage: node --import ./scripts/alias-loader.mjs scripts/lint-run.mjs <run-dir> [--quiet]');
  process.exit(2);
}

const files = fs.readdirSync(dir).filter((f) => /^\d+-.*\.json$/.test(f)).sort();
const byRule = new Map();
let total = 0;
for (const f of files) {
  let sheet;
  try { sheet = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { continue; }
  for (const h of lintSheet(sheet.monster ?? sheet)) {
    total += 1;
    if (!byRule.has(h.rule)) byRule.set(h.rule, []);
    byRule.get(h.rule).push({ file: f.replace('.json', ''), ...h });
  }
}

const lines = [`# Sheet lints — ${path.basename(dir)}`, '', `${files.length} sheets · **${total} finding${total === 1 ? '' : 's'}**`, ''];
for (const l of SHEET_LINTS) {
  const hits = byRule.get(l.rule) ?? [];
  lines.push(`### ${l.rule} — ${hits.length}`, `*reads: ${l.reads}*`, `${l.why}`, '');
  for (const h of hits) lines.push(`- \`${h.file}\` ${h.message}`);
  if (hits.length) lines.push('');
}
const out = path.join('scripts', 'smoke-evidence', `LINT-${path.basename(dir)}.md`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${lines.join('\n')}\n`);

if (!quiet) {
  for (const l of SHEET_LINTS) {
    const hits = byRule.get(l.rule) ?? [];
    if (hits.length) for (const h of hits) console.log(`  ${l.rule.padEnd(24)}${h.file.slice(0, 26).padEnd(28)}${h.message}`);
  }
}
console.log(`wrote ${out}`);
console.log(`${total} finding(s) across ${files.length} sheets`);
process.exit(total ? 1 : 0);
