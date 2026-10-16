// STAGE 2 ITEM 1 (owner's fix order, 2026-10-16) — the decline sample. Pulls
// every decline the fit call named a reason for, with the GM's own words beside
// it, so 50 can be hand-labelled right or wrong. Reads traces only.
//
// The decision this makes:
//   mostly collision        -> the call is working; nothing to build
//   mostly already_answered -> fix the held-rate metric, not the engine
//   mostly no_fit           -> build the successor (stage 5 item 1)
import fs from 'node:fs';
import path from 'node:path';
const since = process.argv.includes('--since') ? process.argv[process.argv.indexOf('--since') + 1] : '2026-10-16';
const reasons = {}; const rows = [];
for (const d of fs.readdirSync('smoke-out')) {
  const p = path.join('smoke-out', d);
  if (!fs.statSync(p).isDirectory()) continue;
  const dm = /(\d{4}-\d{2}-\d{2})T/.exec(d); if (!dm || dm[1] < since) continue;
  for (const f of fs.readdirSync(p).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join(p, f), 'utf8');
    const tr = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    if (!tr) continue;
    const input = (/\*\*Input:\*\* `([^`]*)`/.exec(md) ?? [])[1] ?? '';
    for (const m of tr.matchAll(/decline reason: (\w+) — the call answered none and names it "([^"]*)"(?: after being shown ([^,\n]*?), which the GM's words keyed)?/g)) {
      const [, seat, reason, shown] = m;
      reasons[reason] = (reasons[reason] ?? 0) + 1;
      // the idea that was declined, for hand-judging
      const ideaRe = new RegExp(`signature idea \\\\(${seat === 'trait' ? 'trait' : 'action'}\\\\): "([^"]{0,110})`);
      rows.push({ run: d, seat, reason, shown: shown ?? '', input: input.slice(0, 70), idea: (ideaRe.exec(tr) ?? [])[1] ?? '' });
    }
  }
}
const tot = Object.values(reasons).reduce((a, b) => a + b, 0);
console.log(`STAGE 2 ITEM 1 — ${tot} named declines since ${since}\n`);
for (const [k, v] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(20)} ${String(v).padStart(4)}  ${tot ? Math.round((100 * v) / tot) : 0}%`);
console.log(`\n  of those, declines where the GM's OWN WORDS had keyed the template: ${rows.filter((r) => r.shown).length}`);
console.log('\n--- the sample, for hand-labelling (right / wrong) ---');
for (const [i, r] of rows.slice(0, 50).entries()) {
  console.log(`\n${String(i + 1).padStart(2)}. [${r.reason}] ${r.seat} seat${r.shown ? `  — was shown: ${r.shown}` : ''}`);
  console.log(`    GM: ${r.input}`);
  if (r.idea) console.log(`    idea: ${r.idea}…`);
}
