// THE NUMBER A GM ACTUALLY EXPERIENCES.
//   node --import ./scripts/alias-loader.mjs scripts/clause-rate.mjs [n]
//
// The critic's item 3 (2026-10-30): "Four sweeps of the same forty now exist.
// Report a per-clause hit rate across them. That number is what a user actually
// experiences." Its headline that run was churn - 7 clauses answered in the
// previous sweep went unanswered and 6 unanswered ones were answered - so the
// same concept flips, and "a GM generating one of these gets a coin flip on
// their twist".
//
// A single sweep's coverage cannot show that: 68% four times running may be the
// same 68% or a different 68% each time, and those are very different products.
// This reports, per clause, how many of the last n sweeps answered it.
import fs from 'node:fs';
import path from 'node:path';
import { readRun, nameOf } from './lib/run-reader.mjs';
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';

const n = Number(process.argv[2] ?? 4);
const runs = fs.readdirSync('smoke-out').filter((d) => /^sweep-\d{4}-\d{2}-\d{2}T/.test(d)).sort()
  .filter((d) => fs.readdirSync(path.join('smoke-out', d)).filter((x) => x.endsWith('.json')).length >= 40)
  .slice(-n).map((d) => path.join('smoke-out', d));
if (runs.length < 2) { console.error('need two or more full sweeps'); process.exit(2); }

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const read = (dir) => [...readRun(dir)].map(({ sheet }) => {
  let f = null; try { f = checkBlock(sheet).fidelity; } catch { /* unscorable contributes nothing */ }
  const dropped = new Set((f?.dropped ?? []).map(norm).filter(Boolean));
  // ONLY A RULE REQUEST COUNTS (owner's ruling, 2026-11-06). The extraction already
  // judges each clause `mechanical` or `descriptive`, and a descriptive one is owed no
  // row — "keeps a garden of thorns" is colour, and the engine is right not to build a
  // rule for it. Counting it as a miss marked correct behaviour wrong: of the six clauses
  // this script reported as NEVER answered across three sweeps, one was descriptive.
  //
  // The watchdog this gives up, stated plainly: a real rule request MISLABELLED as colour
  // now disappears from the rate instead of showing up as a miss. The owner accepted that
  // trade on the understanding the mislabel rate gets measured separately — this number is
  // meant to be "what a user actually experiences" (the roadmap's own words for it), and a
  // clause the user never asked to be mechanical does not belong in it.
  const isAsk = (c) => String(c?.kind ?? 'mechanical') !== 'descriptive';
  const asked = new Set((f?.credits ?? []).filter(isAsk).map((c) => norm(c.clause)).filter(Boolean));
  const descriptive = new Set((f?.credits ?? []).filter((c) => !isAsk(c)).map((c) => norm(c.clause)).filter(Boolean));
  for (const d of dropped) if (!descriptive.has(d)) asked.add(d); // a dropped descriptive clause is not a miss
  const answered = new Set([...asked].filter((c) => !dropped.has(c)));
  return { name: nameOf(sheet), asked, answered };
});

const all = runs.map(read);
const width = Math.min(...all.map((r) => r.length));
// a clause is keyed by (batch index, clause text): the forty is the same forty,
// and the engine renames the creature every run, so the index is the identity
const tally = new Map();
for (let i = 0; i < width; i += 1) {
  for (const run of all) for (const c of run[i].asked) {
    const k = i + ' ' + c;
    if (!tally.has(k)) tally.set(k, { i, c, asked: 0, hit: 0, name: run[i].name });
    const t = tally.get(k); t.asked += 1; if (run[i].answered.has(c)) t.hit += 1;
  }
}

const rows = [...tally.values()].filter((t) => t.asked >= 2);
const always = rows.filter((t) => t.hit === t.asked);
const never = rows.filter((t) => t.hit === 0);
const flaky = rows.filter((t) => t.hit > 0 && t.hit < t.asked);
const pct = (a, b) => Math.round((100 * a) / b);

console.log('sweeps: ' + runs.length);
for (const r of runs) console.log('  ' + path.basename(r));
console.log('');
console.log('clauses seen in two or more sweeps: ' + rows.length);
console.log('  answered EVERY time       ' + String(always.length).padStart(4) + '  (' + pct(always.length, rows.length) + '%)');
console.log('  answered SOME of the time ' + String(flaky.length).padStart(4) + '  (' + pct(flaky.length, rows.length) + '%)   <- the coin flip');
console.log('  answered NEVER            ' + String(never.length).padStart(4) + '  (' + pct(never.length, rows.length) + '%)');
console.log('');
const total = rows.reduce((s, t) => s + t.asked, 0);
const hits = rows.reduce((s, t) => s + t.hit, 0);
console.log('PER-CLAUSE HIT RATE: ' + hits + '/' + total + ' = ' + pct(hits, total) + '%   (the critic\'s "done when" is >= 90%)');
console.log('');
console.log('THE COIN FLIPS, worst first:');
for (const t of flaky.sort((a, b) => a.hit / a.asked - b.hit / b.asked).slice(0, 12)) console.log('  ' + t.hit + '/' + t.asked + '  #' + String(t.i + 1).padStart(2, '0') + ' ' + String(t.name).slice(0, 22).padEnd(24) + '"' + t.c.slice(0, 52) + '"');
console.log('');
console.log('NEVER ANSWERED in any sweep:');
for (const t of never.slice(0, 10)) console.log('  0/' + t.asked + '  #' + String(t.i + 1).padStart(2, '0') + ' ' + String(t.name).slice(0, 22).padEnd(24) + '"' + t.c.slice(0, 52) + '"');
