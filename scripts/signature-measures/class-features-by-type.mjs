// A CLASS FEATURE'S NAME NEEDS A BODY THAT COULD HAVE A CLASS.
//
// Owner, 2026-10-27: "Assassinate should not be assassinate for non-humanoids."
// Measured across the saved runs before the fix: `assassinate` shipped 443 rows
// with 163 (37%) on a body that cannot have a class; `rally` 188 with 81 (43%),
// 76 of those Constructs.
//
// The fix was four RENAMES, not a gate — the mechanics are body-neutral, only
// the words were class features. So this script reports two things:
//   RETIRED NAMES   must be 0. Any hit is an unswept reference.
//   BY BODY TYPE    the same templates should still ship on beasts and
//                   constructs at the old rate. A DROP means something got
//                   gated by accident, which the rename was chosen to avoid.
import fs from 'node:fs'; import path from 'node:path';

const RETIRED = ['Assassinate', 'Bolstering Cry', 'Second Wind', 'Lay on Hands'];
const WATCH = ['assassinate', 'rally', 'second-wind', 'lay-on-hands', 'evasion'];
const CLASS_OK = new Set(['Humanoid', 'Fey', 'Fiend', 'Celestial', 'Undead']);

const dirs = process.argv.slice(2);
let sheets = 0; const retired = []; const byTemplate = {};
for (const D of dirs) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.json$/.test(x)).sort()) {
  const j = JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));
  const type = String(j.type ?? '?').split(/[ (]/)[0];
  sheets += 1;
  for (const e of Object.values(j.sections ?? {}).flat()) {
    if (!e) continue;
    const hit = RETIRED.find((r) => String(e.name ?? '').startsWith(r));
    if (hit) retired.push(`${f.slice(0, 2)} [${type}] "${e.name}"`);
    const id = String(e.template ?? e.seed ?? '');
    if (WATCH.includes(id)) ((byTemplate[id] ??= {})[type] = (byTemplate[id][type] ?? 0) + 1);
  }
}
console.log(`${sheets} sheets.\n`);
console.log(`RETIRED NAMES on a shipped row: ${retired.length}  ${retired.length ? '— UNSWEPT REFERENCE' : '(bar: 0)'}`);
for (const r of retired.slice(0, 12)) console.log('  ' + r);
console.log('\nBY BODY TYPE (a drop on non-class bodies means something was gated by accident):');
for (const id of WATCH) {
  const by = byTemplate[id]; if (!by) { console.log(`  ${id.padEnd(14)}not shipped on this set`); continue; }
  const tot = Object.values(by).reduce((a, b) => a + b, 0);
  const nonClass = Object.entries(by).filter(([t]) => !CLASS_OK.has(t));
  const bad = nonClass.reduce((a, [, n]) => a + n, 0);
  console.log(`  ${id.padEnd(14)}${String(tot).padStart(3)} shipped, ${String(bad).padStart(3)} (${tot ? Math.round((100 * bad) / tot) : 0}%) on a body that cannot have a class${nonClass.length ? ': ' + nonClass.sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(', ') : ''}`);
}
