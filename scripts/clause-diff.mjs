// WHAT THE SAME FORTY ANSWERED LAST TIME AND DOES NOT ANSWER NOW.
//   node --import ./scripts/alias-loader.mjs scripts/clause-diff.mjs <older-run> <newer-run>
//   node --import ./scripts/alias-loader.mjs scripts/clause-diff.mjs            (the two most recent sweeps)
//
// The critic's 2026-10-30 read found SEVEN regressions by hand — the Hydra
// regrowing, Meshrin losing a roar the GM explicitly asked for, the Archon losing
// Sovereign of the Swarm, the Peals losing "over the dying", Vashka back on the
// Gladiator body, Ilvareth's leash returning, the Weeping Saint absent again. All
// seven passed the gate, passed my reading, and passed the previous critic read.
//
// The forty is the SAME forty every sweep, so this is measurable rather than a
// matter of attention: a clause CREDITED in the older run and DROPPED in the
// newer one is a regression. `checkBlock().fidelity` already computes both sets
// with the clause text, so nothing new is judged here — two runs are compared.
//
// Sheets are paired by BATCH INDEX, never by name: the engine renames the
// creature every run ("Chapel Toller" became "Death-Knell Sexton"), so a
// name-keyed pairing silently compares different concepts.
import fs from 'node:fs';
import path from 'node:path';
import { readRun, nameOf, modelOf } from './lib/run-reader.mjs';
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';

const sweeps = () => fs.readdirSync('smoke-out').filter((d) => /^sweep-\d{4}-\d{2}-\d{2}T/.test(d)).sort();
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const [older, newer] = args.length >= 2 ? args : sweeps().slice(-2).map((d) => path.join('smoke-out', d));
if (!older || !newer) { console.error('need two runs; found: ' + sweeps().length); process.exit(2); }

const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const readClauses = (dir) => {
  const out = [];
  for (const { sheet } of readRun(dir)) {
    let f = null; try { f = checkBlock(sheet).fidelity; } catch { /* a sheet the checker cannot read contributes nothing */ }
    const credited = new Set((f?.credits ?? []).map((c) => norm(c.clause)).filter(Boolean));
    const dropped = new Set((f?.dropped ?? []).map(norm).filter(Boolean));
    // a clause in BOTH is credited: `credits` lists what was asked, `dropped` what went unanswered
    for (const d of dropped) credited.delete(d);
    out.push({ name: nameOf(sheet), cr: modelOf(sheet)?.cr ?? sheet.cr, credited, dropped, total: f?.total ?? 0 });
  }
  return out;
};

const A = readClauses(older); const B = readClauses(newer);
const n = Math.min(A.length, B.length);
console.log(`older: ${path.basename(older)}  (${A.length} sheets)`);
console.log(`newer: ${path.basename(newer)}  (${B.length} sheets)`);
if (A.length !== B.length) console.log(`  NOTE: sheet counts differ — pairing the first ${n} by batch index`);
console.log();

const regressions = []; const recoveries = [];
for (let i = 0; i < n; i += 1) {
  for (const c of A[i].credited) if (B[i].dropped.has(c)) regressions.push({ i, c, was: A[i].name, now: B[i].name, cr: B[i].cr });
  for (const c of A[i].dropped) if (B[i].credited.has(c)) recoveries.push({ i, c, now: B[i].name, cr: B[i].cr });
}

console.log(`REGRESSIONS — credited in the older run, dropped in the newer: ${regressions.length}`);
for (const r of regressions) console.log(`  #${String(r.i + 1).padStart(2, '0')} CR${String(r.cr).padEnd(4)} ${String(r.now).slice(0, 24).padEnd(26)} "${r.c.slice(0, 62)}"${r.was !== r.now ? `   (was "${r.was}")` : ''}`);
console.log();
console.log(`RECOVERIES — dropped before, answered now: ${recoveries.length}`);
for (const r of recoveries) console.log(`  #${String(r.i + 1).padStart(2, '0')} CR${String(r.cr).padEnd(4)} ${String(r.now).slice(0, 24).padEnd(26)} "${r.c.slice(0, 62)}"`);
console.log();
const cov = (X) => { const t = X.reduce((s, x) => s + x.total, 0); const d = X.reduce((s, x) => s + x.dropped.size, 0); return t ? `${t - d}/${t} (${Math.round(100 * (t - d) / t)}%)` : 'n/a'; };
console.log(`clause coverage   older ${cov(A)}   newer ${cov(B)}`);
console.log(`net              ${regressions.length} lost, ${recoveries.length} regained`);
