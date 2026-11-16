// DOES THE GM'S ASK LAND? The product promise, measured off DECLARED data.
//
// Three readings, weakest claim to strongest:
//
//   CLAUSE ANSWERED   a shipped row carries this clause's `clauseId`. The row
//                     says which of the GM's clauses it answers — the engine's
//                     own receipt, so a chassis or donor row that has no
//                     template still counts. (The first cut of this script
//                     scored only template ids, so the brass tyrant's Furnace
//                     Breath — a chassis nova that IS a breath — read as a miss.)
//   MECHANIC MATCHED  and that clause named a mechanic (`askMechanic`), and some
//                     shipped row's template is in MECHANIC[that mechanic]. The
//                     strict reading: the GM got the KIND of thing they named.
//   SHEET-LEVEL       the route call's one `asked_mechanic`, read from its own
//                     trace line ("the sheet's declared ask: <mech> — …"), with
//                     the same template test. Comparable to the 2026-10-27
//                     baseline of 6/18 (33%).
//
// Why not the "declared mechanic leads the menu" line: it became a PER-SEAT line
// when each seat started leading by its own clause, so reading its first
// occurrence reported one seat's answer as the sheet's.
import fs from 'node:fs'; import path from 'node:path';
import { MECHANIC_OF } from '@/tools/statblock-generator/reskin/templates.mjs';

const dirs = process.argv.slice(2);
let sheets = 0, withAsk = 0, landed = 0, multi = 0, multiBothAnswered = 0;
const clause = { mechanical: 0, answered: 0, withMech: 0, mechLanded: 0 };
const misses = [];
for (const D of dirs) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const tr = fs.readFileSync(path.join(D, f), 'utf8');
  const json = path.join(D, f.replace(/\.md$/, '.json'));
  if (!fs.existsSync(json)) continue;
  const j = JSON.parse(fs.readFileSync(json, 'utf8'));
  const rows = [...Object.values(j.sections ?? {}).flat(), ...(j.abilities ?? []), ...(j.actions ?? [])].filter(Boolean);
  const shippedMechs = new Set(rows.flatMap((e) => [e.template, e.seed, ...(e.riderTemplates ?? [])]).filter(Boolean).map((id) => MECHANIC_OF[String(id)]).filter(Boolean));
  const answeredIds = new Set(rows.map((e) => e.clauseId).filter(Boolean));
  sheets += 1;
  const tag = `${f.slice(0, 2)} ${path.basename(D).slice(-5)}`;

  // the clause line carries each clause's text, kind and (since 2026-10-27) its
  // asked mechanic. The clause ID is not on that line, so a clause is matched to
  // an answering row by the row's own `clause` TEXT — the engine wrote both from
  // the same record, so this compares two copies of one declared string.
  const answeredText = new Set(rows.map((e) => String(e.clause ?? '').trim()).filter(Boolean));
  const clauseLine = (/^\[reskin\] clauses: (.*)$/m.exec(tr) ?? [])[1] ?? '';
  const clauses = clauseLine.split(' | ').map((c) => ({
    text: ((/"([^"]*)"/.exec(c) ?? [])[1] ?? '').trim(),
    mechanical: /\(mechanical\)/.test(c),
    askMechanic: (/\[askMechanic: ([a-z_]+)\]/.exec(c) ?? [])[1] ?? null,
  })).filter((c) => c.text);

  const mech = clauses.filter((c) => c.mechanical);
  if (mech.length >= 2) multi += 1;
  let answeredHere = 0;
  for (const c of mech) {
    clause.mechanical += 1;
    const answered = answeredText.has(c.text);
    if (answered) { clause.answered += 1; answeredHere += 1; }
    if (c.askMechanic) {
      clause.withMech += 1;
      if (shippedMechs.has(c.askMechanic)) clause.mechLanded += 1;
      else misses.push(`${tag} clause "${c.text.slice(0, 40)}" asked ${c.askMechanic}${answered ? ' — a row answers the clause but not with that mechanic' : ' — no row answers it'}`);
    } else if (!answered) misses.push(`${tag} clause "${c.text.slice(0, 40)}" — no mechanic named, no row answers it`);
  }
  if (mech.length >= 2 && answeredHere >= 2) multiBothAnswered += 1;

  // "none" is the trace's word for a concept that named no mechanic (a plain
  // mercenary, a bare Owlbear). It is not an ask and must not count as a miss.
  const askRaw = (/^\[reskin\] the sheet's declared ask: ([a-z_]+) /m.exec(tr) ?? [])[1] ?? null;
  const sheetMech = askRaw === 'none' ? null : askRaw;
  if (sheetMech) {
    withAsk += 1;
    if (shippedMechs.has(sheetMech)) landed += 1;
    else misses.push(`${tag} SHEET asked ${sheetMech} — shipped ${[...shippedMechs].join(',') || 'nothing declaring a mechanic'}`);
  }
  if (!clauseLine) misses.push(`${tag} — no clauses line parsed (stale trace format?)`);
}
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
console.log(`${sheets} sheets, ${clause.mechanical} mechanical clauses.\n`);
console.log(`CLAUSE ANSWERED (a shipped row carries the clause): ${clause.answered}/${clause.mechanical} (${pc(clause.answered, clause.mechanical)})`);
console.log(`MECHANIC MATCHED (the clause named one and a row ships it): ${clause.mechLanded}/${clause.withMech} (${pc(clause.mechLanded, clause.withMech)})`);
console.log(`  clauses that named a mechanic at all: ${clause.withMech}/${clause.mechanical} (${pc(clause.withMech, clause.mechanical)})`);
console.log(`\nSHEET-LEVEL ask: declared on ${withAsk}, landed on ${landed} (${pc(landed, withAsk)})   [baseline 2026-10-27: 6/18 = 33%]`);
console.log(`TWO-CLAUSE SHEETS: ${multi}; both clauses answered on ${multiBothAnswered} (${pc(multiBothAnswered, multi)})   [baseline: 0/4 = 0%]`);
if (misses.length) { console.log('\nMISSES:'); for (const m of misses.slice(0, 24)) console.log('  ' + m); if (misses.length > 24) console.log(`  … ${misses.length - 24} more`); }
