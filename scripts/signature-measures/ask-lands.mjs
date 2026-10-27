// DOES THE GM'S ASK LAND? The product promise, measured directly.
//
// For every MECHANICAL clause the GM typed, did a row ship that does what the
// clause asked? Two readings, because the engine declares the ask at two
// granularities:
//   SHEET-LEVEL  the route call's one `asked_mechanic` per sheet, traced as
//                "declared mechanic leads the menu: <seat> — <mech>: <ids>".
//                Landed = some shipped row's template is in MECHANIC[mech].
//   PER-CLAUSE   `askMechanic` on a clause record, once the clause call answers
//                it (plans/the-ask-lands-2026-10-27.md). Absent before that
//                change; this script reads it when it appears.
//
// Also counts the sheets AT RISK: those with two or more mechanical clauses,
// where one sheet-level mechanic cannot serve both seats and the second clause
// is the one that goes missing.
import fs from 'node:fs'; import path from 'node:path';
import { MECHANIC, MECHANIC_OF } from '@/tools/statblock-generator/reskin/templates.mjs';

const dirs = process.argv.slice(2);
let sheets = 0, withAsk = 0, landed = 0, multi = 0, multiLanded = 0;
const perClause = { asked: 0, landed: 0 };
const misses = [];
for (const D of dirs) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const tr = fs.readFileSync(path.join(D, f), 'utf8');
  const json = path.join(D, f.replace(/\.md$/, '.json'));
  if (!fs.existsSync(json)) continue;
  const j = JSON.parse(fs.readFileSync(json, 'utf8'));
  const rows = [...Object.values(j.sections ?? {}).flat(), ...(j.abilities ?? []), ...(j.actions ?? [])].filter(Boolean);
  const shipped = new Set(rows.flatMap((e) => [e.template, e.seed, ...(e.riderTemplates ?? [])]).filter(Boolean));
  const shippedMechs = new Set([...shipped].map((id) => MECHANIC_OF[String(id)]).filter(Boolean));
  sheets += 1;

  // the clauses line: "<text>" -> has (kind) [asked: ...]
  const clauseLine = (/^\[reskin\] clauses: (.*)$/m.exec(tr) ?? [])[1] ?? '';
  const clauses = clauseLine.split(' | ').map((c) => ({
    text: (/"([^"]*)"/.exec(c) ?? [])[1] ?? '',
    mechanical: /\(mechanical\)/.test(c),
    askMechanic: (/\[askMechanic: ([a-z_]+)\]/.exec(c) ?? [])[1] ?? null, // appears after the change
  })).filter((c) => c.text);
  const mech = clauses.filter((c) => c.mechanical);
  if (mech.length >= 2) multi += 1;

  // sheet-level
  const sheetMech = (/declared mechanic leads the menu:[^\n]*?— ([a-z_]+):/.exec(tr) ?? [])[1] ?? null;
  if (sheetMech) {
    withAsk += 1;
    const ok = shippedMechs.has(sheetMech);
    if (ok) { landed += 1; if (mech.length >= 2) multiLanded += 1; }
    else misses.push(`${f.slice(0, 2)} ${path.basename(D).slice(7, 13)} asked "${sheetMech}" — shipped ${[...shippedMechs].join(',') || 'nothing declaring a mechanic'}`);
  }
  // per-clause, when present
  for (const c of clauses) {
    if (!c.askMechanic) continue;
    perClause.asked += 1;
    if (shippedMechs.has(c.askMechanic)) perClause.landed += 1;
    else misses.push(`${f.slice(0, 2)} CLAUSE "${c.text.slice(0, 44)}" asked "${c.askMechanic}" — not shipped`);
  }
}
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
console.log(`${sheets} sheets.`);
console.log(`\nSHEET-LEVEL ask: declared on ${withAsk}, landed on ${landed} (${pc(landed, withAsk)})`);
console.log(`  of the sheets with TWO OR MORE mechanical clauses (${multi}): landed ${multiLanded} (${pc(multiLanded, multi)})`);
console.log(`  — one mechanic per sheet cannot serve two seats; the second clause is the one at risk`);
if (perClause.asked) console.log(`\nPER-CLAUSE ask: declared on ${perClause.asked} clauses, landed ${perClause.landed} (${pc(perClause.landed, perClause.asked)})`);
else console.log('\nPER-CLAUSE ask: not declared yet (the clause call answers no mechanic)');
if (misses.length) { console.log('\nMISSES:'); for (const m of misses.slice(0, 20)) console.log('  ' + m); }
