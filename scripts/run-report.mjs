/**
 * THE STANDING NUMBERS FOR A RUN, IN ONE PLACE.
 *
 *   node --import ./scripts/alias-loader.mjs scripts/run-report.mjs <run-dir>
 *
 * Every figure here was, at some point this sprint, computed by an ad-hoc probe
 * and got a different answer each time. Reading them from one place with one
 * reader is the point; see `lib/run-reader.mjs` for the shape trap it exists to
 * avoid. `check-run.mjs` still owns the GATES — this owns the baselines.
 */
import {
  readRun, modelOf, scorable, nameOf, formatOf, pathOf, expectedBare,
  rowsOf, featureRowsOf, isFeatureRow, clausesOf, deliveredClauseIds, pickTallyOf,
} from './lib/run-reader.mjs';

const dir = process.argv[2];
if (!dir) { console.error('usage: run-report.mjs <run-dir>'); process.exit(1); }
const run = readRun(dir);
const pct = (n, d) => (d ? `${Math.round((n / d) * 100)}%` : '—');
const row = (label, value, note = '') => console.log(`  ${label.padEnd(38)}${String(value).padStart(10)}  ${note}`);

console.log(`\n=== ${dir}  (${run.length} sheets) ===\n`);

// ---- composition, so a reader knows what the rest is measured over
const byPath = {}; const byFormat = {};
for (const { sheet } of run) { byPath[pathOf(sheet)] = (byPath[pathOf(sheet)] ?? 0) + 1; byFormat[formatOf(sheet)] = (byFormat[formatOf(sheet)] ?? 0) + 1; }
console.log('COMPOSITION');
row('paths', Object.entries(byPath).map(([k, v]) => `${k}:${v}`).join(' '));
row('formats', Object.entries(byFormat).map(([k, v]) => `${k}:${v}`).join(' '));

const unscorable = run.filter(({ sheet }) => !scorable(sheet));
if (unscorable.length) row('UNSCORABLE (conversion fell back)', unscorable.length, unscorable.map(({ sheet }) => nameOf(sheet)).join(', '));

// ---- feature rows. The denominator excludes sheets that cannot be scored AND
// paths that are SUPPOSED to be bare: an exact sheet reproduces print and a
// blank sheet has no concept to answer, so counting them as misses was the
// error that read 5 bare sheets as a defect when 2 of them were correct.
const scored = run.filter(({ sheet }) => scorable(sheet));
const eligible = scored.filter(({ sheet }) => !expectedBare(sheet));
const feat = scored.reduce((a, { sheet }) => a + featureRowsOf(sheet).length, 0);
const bare = eligible.filter(({ sheet }) => featureRowsOf(sheet).length === 0);
console.log('\nFEATURE ROWS');
row('rows the engine put on a sheet', feat);
row('per scorable sheet', (feat / (scored.length || 1)).toFixed(2), 'baseline 1.45');
row('sheets landing NONE', `${bare.length}/${eligible.length}`, `${pct(bare.length, eligible.length)} of eligible — baseline 10%`);
if (bare.length) row('  which', '', bare.map(({ sheet }) => `${nameOf(sheet)} (${pathOf(sheet)})`).join(', '));

// ---- clause delivery, by the engine's own provenance rather than prose credit
let mech = 0; let mechDone = 0; const undelivered = [];
for (const { sheet } of scored) {
  const done = deliveredClauseIds(sheet);
  for (const c of clausesOf(sheet)) {
    if (c.kind !== 'mechanical') continue;
    mech += 1;
    if (c.id && done.has(String(c.id))) mechDone += 1;
    else undelivered.push(`${nameOf(sheet)}: "${String(c.text).slice(0, 44)}"`);
  }
}
// TWO DIFFERENT QUESTIONS, COUNTED SEPARATELY (corrected 2026-10-28). The first
// cut called 40% of rows "missing provenance" and read that as a delivery
// ceiling. It was wrong twice: the authoring path records its clause on 100% of
// its rows, and 11 of the 12 unrecorded TEMPLATE rows on a forty were `freeRow`
// — rows that answer no clause BY DESIGN, inside the owner's free-row budget.
// Counting those as missing something invented a problem. So:
//
//   ROWS THAT OWE A LINK — a row the fit or authoring call placed that is not a
//   free row or decoration. This should be ~100%, and a shortfall is a real bug.
//   CLAUSES CLAIMED — of the GM's mechanical clauses, how many a row names. This
//   is LOWER and not a bug by itself: a clause can be answered by a chassis,
//   donor or print row, and those paths mostly do not record what they answer
//   (the flaw row now does). So it is a floor on delivery, never the rate.
const owing = scored.flatMap(({ sheet }) => rowsOf(sheet).map(({ row: r }) => r))
  .filter((r) => (isFeatureRow(r) || r.authored) && !r.freeRow && !r.decoration);
const owingLinked = owing.filter((r) => r.clauseId || r.clause || r.gmQuote || (r.boundKeys ?? []).length);
console.log('\nPROVENANCE  (rows that owe a clause link)');
row('rows owing a link', owing.length);
row('recording one', owingLinked.length, `${pct(owingLinked.length, owing.length)} — a shortfall here IS a bug`);
for (const r of owing.filter((x) => !owingLinked.includes(x))) row('  owes and names none', '', `${r.name} (${r.template ?? (r.library ? 'library draw' : r.seed ? 'seed' : 'authored')})`);
console.log('\nCLAUSE DELIVERY  (a FLOOR: chassis and print rows answer clauses without recording it)');
row('mechanical clauses', mech);
row('claimed by a row, exactly', mechDone, `${pct(mechDone, mech)} — floor, not the delivery rate`);
for (const u of undelivered.slice(0, 12)) console.log(`     undelivered  ${u}`);
if (undelivered.length > 12) console.log(`     …and ${undelivered.length - 12} more`);

// ---- accepted picks, and where they died
let lost = 0; let counted = 0; const sites = {}; const lostByPath = {};
for (const { file, sheet } of run) {
  const t = pickTallyOf(dir, file); if (!t) continue;
  lost += t.lost; counted += t.counted;
  const p = pathOf(sheet);
  lostByPath[p] = lostByPath[p] ?? { lost: 0, counted: 0 };
  lostByPath[p].lost += t.lost; lostByPath[p].counted += t.counted;
  for (const s of t.sites) sites[s] = (sites[s] ?? 0) + 1;
}
console.log('\nACCEPTED PICKS');
row('lost', `${lost}/${counted}`, `${pct(lost, counted)} — baseline 20%`);
for (const [s, n] of Object.entries(sites).sort((a, b) => b[1] - a[1])) row(`  died at ${s}`.slice(0, 38), n);
for (const [p, v] of Object.entries(lostByPath)) row(`  path ${p}`, `${v.lost}/${v.counted}`, pct(v.lost, v.counted));

// ---- the duration field, since a fail-severity rule now rests on it
let imposing = 0; let withDuration = 0;
for (const { sheet } of scored) for (const { row: r } of rowsOf(sheet)) { if (!r.imposes) continue; imposing += 1; if (r.duration) withDuration += 1; }
console.log('\nDECLARED DURATION');
row('rows imposing a condition', imposing);
row('carrying a duration', withDuration, pct(withDuration, imposing));
console.log();
