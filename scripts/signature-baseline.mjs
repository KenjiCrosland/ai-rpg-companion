// SIGNATURE MOVE SETS, PHASE 2 — the baseline measurement (owner's brief, 2026-10-16).
//
// Reads every saved smoke run's per-block .md and tallies what happened in the
// SIGNATURE slot, from the engine's own trace. Nothing here changes behavior;
// it only counts what the traces already recorded, so the whole 624-run,
// 4869-block archive is one corpus and the pre-sprint-9 comparison is free.
//
// usage: node scripts/signature-baseline.mjs [--since 2026-10-01] [--until ...] [--runs <glob substring>] [--csv out.csv]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const since = opt('--since'); const until = opt('--until'); const only = opt('--runs');
const csvOut = opt('--csv');

// A VERB IN THE PROMPT is what routing keys on today, so the baseline splits on
// it (hypothesis 2). The engine's own test is rankByVerb over the concept; from
// a trace we can read whether any template matched a CONCEPT key.
const OUTCOME = [
  // order matters: the first match wins per block
  ['held', /^\[reskin\] signature template(?: \(trait\))?:/m],
  ['rider', /^\[reskin\] signature rider:/m],
  ['seed', /^\[reskin\] library seed drawn:/m],
];

function classify(trace) {
  const out = {};
  // the ACTION seat and the TRAIT seat are separate slots; report each
  out.action = /^\[reskin\] signature template: /m.test(trace) ? 'held'
    : /^\[reskin\] signature rider: /m.test(trace) ? 'rider'
    : /^\[reskin\] library seed drawn: /m.test(trace) ? 'seed'
    : 'nothing';
  out.trait = /^\[reskin\] signature template \(trait\): /m.test(trace) ? 'held' : 'nothing';
  return out;
}

// WHY a variant seat stood down — one cause per line, taken verbatim from the
// rule that fired, so the count attributes rather than guesses.
const STANDDOWN = [
  ['print body outranks the seat', /print canon route: the .+?'s body outranks the (\w[\w-]*) seat/g],
  ['print body is not a caster first', /print canon route: the .+? is not a caster first/g],
  ['print body casts only with magic', /print canon route: the .+? casts and strikes only with magic/g],
  ['style has no line at this archetype', /style unserved: "([\w-]+)" has no [\w-]+ line/g],
  ['mechanic engine needs a key in the words', /-> [\w-]+: a (\w+) is a mechanic engine and needs a key/g],
  ['bow-user: the hurler seat stands down', /is the .+?, a bow-user — the hurler seat stands down/g],
  ['seat stands down for the plain line', /the (\w[\w-]*) seat stands down for the plain line/g],
];
const CHASSIS_EXIT = [
  ["kept its role (yields to print's row)", /chassis row leaves — [^\n]*? yields to [^\n]*/g],
  ["dropped (the seat's, not print's)", /chassis row leaves — [^\n]*? is the seat's, not the [^\n]*/g],
];
// the fit call is NEVER MADE when no template on the shelf shares a verb
const NO_CALL = /signature miss: \w+ — .*? no template on the shelf shares a verb/;
const FLOOR_DROP = /signature dropped by the floor:/;
const VETO = /(?:fit|nova|rider|trait) declined:/g;
const CAP_YIELD = /(?:yielded to print's row cap|kit yields:|species kit yields:)/g;

const runs = fs.readdirSync('smoke-out').filter((d) => {
  if (!fs.statSync(path.join('smoke-out', d)).isDirectory()) return false;
  if (only && !d.includes(only)) return false;
  const m = /(\d{4}-\d{2}-\d{2})T/.exec(d); if (!m) return false;
  if (since && m[1] < since) return false;
  if (until && m[1] > until) return false;
  return true;
});

const rows = [];
for (const r of runs) {
  const dir = path.join('smoke-out', r);
  const date = /(\d{4}-\d{2}-\d{2})T/.exec(r)[1];
  for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join(dir, f), 'utf8');
    const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    if (!trace) continue;
    const input = (/\*\*Input:\*\* `([^`]*)`/.exec(md) ?? [])[1] ?? '';
    const donor = (/\[reskin\] donor: ([\w-]+) ->/.exec(trace) ?? [])[1] ?? '';
    const crM = /\*\*Donor:\*\* `?[\w-]+`? -> CR ([\d./]+)/.exec(md) ?? /-> CR ([\d./]+)/.exec(trace);
    const cr = crM ? Number(crM[1].includes('/') ? eval(crM[1]) : crM[1]) : null;
    const isPrint = /print canon: ".*" is a print creature/.test(trace);
    const seat = donor.split('-').slice(2).join('-') || '(plain)';
    const archetype = donor.split('-')[0] || '';
    // a CONCEPT key matched = the GM's own words keyed a template
    const conceptKeyed = /signature bound to the concept's verb:/.test(trace);
    const o = classify(trace);
    rows.push({
      run: r, date, file: f, input, donor, archetype, seat, cr, isPrint,
      action: o.action, trait: o.trait, conceptKeyed,
      seeds: [...trace.matchAll(/library seed drawn: ([\w-]+) ->/g)].map((m) => m[1]),
      noCall: NO_CALL.test(trace),
      floorDrop: FLOOR_DROP.test(trace),
      vetoes: (trace.match(VETO) ?? []).length,
      capYields: (trace.match(CAP_YIELD) ?? []).length,
      standdowns: STANDDOWN.flatMap(([label, re]) => [...trace.matchAll(re)].map(() => label)),
      chassisExits: CHASSIS_EXIT.flatMap(([label, re]) => [...trace.matchAll(re)].map(() => label)),
      trace,
    });
  }
}

const nonPrint = rows.filter((r) => !r.isPrint);
const pct = (n, d) => (d ? `${((100 * n) / d).toFixed(0)}%` : '—');
const tally = (list, fn) => list.reduce((a, r) => { const k = fn(r); if (k == null) return a; a[k] = (a[k] ?? 0) + 1; return a; }, {});
const table = (title, obj, total) => {
  console.log(`\n${title}`);
  for (const [k, v] of Object.entries(obj).sort((a, b) => b[1] - a[1])) console.log(`  ${String(k).padEnd(44)} ${String(v).padStart(5)}  ${pct(v, total)}`);
};

console.log(`SIGNATURE BASELINE — ${runs.length} runs, ${rows.length} blocks (${nonPrint.length} non-print)`);
console.log(`date range ${rows.length ? rows.map((r) => r.date).sort()[0] : '-'} .. ${rows.length ? rows.map((r) => r.date).sort().at(-1) : '-'}`);

table('ACTION seat outcome (non-print)', tally(nonPrint, (r) => r.action), nonPrint.length);
table('TRAIT seat outcome (non-print)', tally(nonPrint, (r) => r.trait), nonPrint.length);

// hypothesis 2: verbs are the wrong routing key
console.log('\nOUTCOME BY WHETHER THE GM\'S OWN WORDS KEYED A TEMPLATE (hypothesis 2)');
for (const keyed of [true, false]) {
  const g = nonPrint.filter((r) => r.conceptKeyed === keyed);
  const t = tally(g, (r) => r.action);
  console.log(`  concept-keyed=${String(keyed).padEnd(5)} n=${String(g.length).padStart(5)}  held ${pct(t.held ?? 0, g.length).padStart(4)}  rider ${pct(t.rider ?? 0, g.length).padStart(4)}  seed ${pct(t.seed ?? 0, g.length).padStart(4)}  nothing ${pct(t.nothing ?? 0, g.length).padStart(4)}`);
}

// hypothesis 4: patterns per creature climb with CR  (proxy: held-or-rider rate by CR band)
console.log('\nOUTCOME BY CR BAND');
const band = (cr) => (cr == null ? '?' : cr <= 1 ? '0-1' : cr <= 4 ? '2-4' : cr <= 8 ? '5-8' : cr <= 12 ? '9-12' : cr <= 16 ? '13-16' : '17+');
for (const b of ['0-1', '2-4', '5-8', '9-12', '13-16', '17+']) {
  const g = nonPrint.filter((r) => band(r.cr) === b); if (!g.length) continue;
  const t = tally(g, (r) => r.action);
  console.log(`  CR ${b.padEnd(6)} n=${String(g.length).padStart(5)}  held ${pct(t.held ?? 0, g.length).padStart(4)}  rider ${pct(t.rider ?? 0, g.length).padStart(4)}  seed ${pct(t.seed ?? 0, g.length).padStart(4)}  nothing ${pct(t.nothing ?? 0, g.length).padStart(4)}`);
}

// hypothesis 1: flatness is recent
console.log('\nHELD-RATE BY DATE (hypothesis 1: flatness is recent)');
const byDate = {};
for (const r of nonPrint) { (byDate[r.date] ??= []).push(r); }
for (const [d, g] of Object.entries(byDate).sort()) {
  const t = tally(g, (r) => r.action);
  const heldish = (t.held ?? 0) + (t.rider ?? 0);
  console.log(`  ${d}  n=${String(g.length).padStart(4)}  held+rider ${pct(heldish, g.length).padStart(4)}  seed ${pct(t.seed ?? 0, g.length).padStart(4)}  nothing ${pct(t.nothing ?? 0, g.length).padStart(4)}  no-call-miss ${pct(g.filter((x) => x.noCall).length, g.length).padStart(4)}`);
}

table('SEED FREQUENCY (every library draw, non-print)', tally(nonPrint.flatMap((r) => r.seeds), (s) => s), nonPrint.flatMap((r) => r.seeds).length);
table('VARIANT-SEAT STAND-DOWNS BY CAUSE', tally(rows.flatMap((r) => r.standdowns), (s) => s), rows.length);
table('CHASSIS ROW EXITS', tally(rows.flatMap((r) => r.chassisExits), (s) => s), rows.length);

console.log('\nTHE FIT CALL IS NEVER MADE when no shelf template shares a verb (generate.mjs:2958)');
console.log(`  blocks with that miss: ${nonPrint.filter((r) => r.noCall).length} of ${nonPrint.length} (${pct(nonPrint.filter((r) => r.noCall).length, nonPrint.length)})`);
console.log(`  blocks where a seed was dropped by the value floor: ${nonPrint.filter((r) => r.floorDrop).length} (${pct(nonPrint.filter((r) => r.floorDrop).length, nonPrint.length)})`);
console.log(`  total call-pick vetoes (fit/nova/rider/trait declined): ${rows.reduce((a, r) => a + r.vetoes, 0)}`);
console.log(`  total row-cap yields: ${rows.reduce((a, r) => a + r.capYields, 0)}`);

table('OUTCOME BY ARCHETYPE (non-print, action seat "held"+"rider" share)',
  Object.fromEntries(Object.entries(tally(nonPrint, (r) => r.archetype)).map(([a, n]) => {
    const g = nonPrint.filter((r) => r.archetype === a);
    return [`${a} (n=${n})`, Math.round((100 * g.filter((r) => r.action === 'held' || r.action === 'rider').length) / n)];
  })), null);

if (csvOut) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  fs.writeFileSync(csvOut, ['run,date,file,input,donor,archetype,seat,cr,isPrint,action,trait,conceptKeyed,seeds,noCall,floorDrop,vetoes,capYields,standdowns,chassisExits']
    .concat(rows.map((r) => [r.run, r.date, r.file, r.input, r.donor, r.archetype, r.seat, r.cr, r.isPrint, r.action, r.trait, r.conceptKeyed, r.seeds.join('|'), r.noCall, r.floorDrop, r.vetoes, r.capYields, r.standdowns.join('|'), r.chassisExits.join('|')].map(esc).join(','))).join('\n'));
  console.log(`\nwrote ${csvOut} (${rows.length} rows)`);
}
