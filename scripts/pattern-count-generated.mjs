// STAGE 2 ITEM 3 — the flat metric on generated sheets (owner's fix order,
// 2026-10-16). Runs the FROZEN print predicates over every saved block and
// reports patterns per sheet against print's own band. Changes no behavior.
//
// This also re-tests hypothesis 6 on the outcome it was actually about: the
// findings doc tested seat-kept-vs-stood-down against SIGNATURE HELD-RATE and
// refuted it; the hypothesis was about MOVE SETS, which is pattern count.
//
// usage: node scripts/pattern-count-generated.mjs [--since YYYY-MM-DD]
import fs from 'node:fs';
import path from 'node:path';
const { sheetPatterns } = await import('./pattern-label.mjs');

const args = process.argv.slice(2);
const since = args.includes('--since') ? args[args.indexOf('--since') + 1] : null;
const print = JSON.parse(fs.readFileSync('src/data/print-patterns.json', 'utf8'));
const band = (cr) => (cr == null ? '?' : cr <= 1 ? '0-1' : cr <= 4 ? '2-4' : cr <= 8 ? '5-8' : cr <= 12 ? '9-12' : cr <= 16 ? '13-16' : '17+');

// print's own mean per band, from the frozen labels — the bar
const printBand = {};
for (const m of Object.values(print)) {
  const b = band(m.cr); (printBand[b] ??= []).push(m.patterns[0] === 'meat' ? 0 : m.patterns.length);
}
const printMean = Object.fromEntries(Object.entries(printBand).map(([b, v]) => [b, v.reduce((a, x) => a + x, 0) / v.length]));

const rows = [];
for (const d of fs.readdirSync('smoke-out')) {
  if (!fs.statSync(path.join('smoke-out', d)).isDirectory()) continue;
  const dm = /(\d{4}-\d{2}-\d{2})T/.exec(d); if (!dm) continue;
  if (since && dm[1] < since) continue;
  for (const f of fs.readdirSync(path.join('smoke-out', d)).filter((x) => /^\d+-.*\.json$/.test(x))) {
    let raw; try { raw = JSON.parse(fs.readFileSync(path.join('smoke-out', d, f), 'utf8')); } catch { continue; }
    const m = raw.monster ?? raw;
    // the 2014 sheets carry legacy keys, and the frozen labels are SRD 5.2 —
    // scope to 2024 sheets, which is one of the owner's parked questions
    if (!m?.sections) continue;
    const md = fs.existsSync(path.join('smoke-out', d, f.replace(/\.json$/, '.md'))) ? fs.readFileSync(path.join('smoke-out', d, f.replace(/\.json$/, '.md')), 'utf8') : '';
    const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    if (/print canon: ".*" is a print creature/.test(trace)) continue; // print composes it, not us
    const donor = (/\[reskin\] donor: ([\w-]+) ->/.exec(trace) ?? [])[1] ?? '';
    // AUTHORED ONLY (critic, 2026-10-16). Counting every pattern-shaped row made
    // this metric measure the chassis: Whisker Tithe's Crowdslip, Fleet Agility
    // and Cunning Action are three rows doing one job, and all three label
    // hit-and-run. Print's rows are all authored, so authored-only is the
    // like-for-like comparison. Excluded: chassis rows with no provenance, and
    // library seeds, which are generic by construction. Kept: print rows, kit
    // rows, the GM's own rows, and a FITTED template (e.template), which is a
    // row some call chose for this creature.
    const authored = (e) => !!(e.print || e.printNamed || e.kit || e.part || e.feature || e.authored || e.clause || (e.boundKeys ?? []).length || (e.template && !e.seed));
    const authoredSections = Object.fromEntries(Object.entries(m.sections ?? {}).map(([s, es]) => [s, (es ?? []).filter(authored)]));
    const sp = sheetPatterns(authoredSections);
    const spAll = sheetPatterns(m.sections);
    rows.push({
      date: dm[1], run: d, name: m.name, cr: Number(m.cr ?? NaN), donor,
      archetype: donor.split('-')[0] || '', variant: donor.split('-').slice(2).join('-') || '(plain)',
      stoodDown: /body outranks the \w+ seat|style unserved:|is not a caster first|seat stands down for the plain line|a \w+ is a mechanic engine and needs a key/.test(trace),
      n: sp.patterns[0] === 'meat' ? 0 : sp.patterns.length, patterns: sp.patterns, unl: sp.unlabelled.length,
      nAll: spAll.patterns[0] === 'meat' ? 0 : spAll.patterns.length,
    });
  }
}
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
const mean = (g) => (g.length ? (g.reduce((a, r) => a + r.n, 0) / g.length).toFixed(2) : '—');
console.log(`STAGE 2 ITEM 3 (re-run, AUTHORED ROWS ONLY) — ${rows.length} generated 2024 sheets (non-print)\n`);
console.log('BY CR BAND, against print\'s own mean. "all rows" is the first pass, kept for contrast.');
console.log('band     n   authored  print    gap   all rows   meat-only(ours)  print meat-only');
for (const b of ['0-1', '2-4', '5-8', '9-12', '13-16', '17+']) {
  const g = rows.filter((r) => band(r.cr) === b); if (!g.length) continue;
  const pg = Object.values(print).filter((m) => band(m.cr) === b);
  const ourMeat = g.filter((r) => r.n === 0).length; const prMeat = pg.filter((m) => m.patterns[0] === 'meat').length;
  const gap = (Number(mean(g)) - printMean[b]).toFixed(2);
  const meanAll = (g.reduce((a, r) => a + r.nAll, 0) / g.length).toFixed(2);
  console.log(`${b.padEnd(8)} ${String(g.length).padStart(4)}  ${mean(g).padStart(7)}  ${printMean[b].toFixed(2).padStart(6)} ${String(gap).padStart(6)}   ${meanAll.padStart(7)}   ${pc(ourMeat, g.length).padStart(8)}         ${pc(prMeat, pg.length).padStart(6)}`);
}
console.log('\nHYPOTHESIS 6, RE-TESTED ON PATTERN COUNT (the outcome it was about)');
for (const [label, g] of [['seat survived', rows.filter((r) => !r.stoodDown)], ['a variant seat stood down', rows.filter((r) => r.stoodDown)]]) {
  console.log(`  ${label.padEnd(26)} n=${String(g.length).padStart(5)}  mean patterns ${mean(g)}  meat-only ${pc(g.filter((r) => r.n === 0).length, g.length)}`);
}
console.log('\n  and within one CR band (5-8, the biggest), to rule out CR mix:');
for (const [label, g] of [['seat survived', rows.filter((r) => !r.stoodDown && band(r.cr) === '5-8')], ['stood down', rows.filter((r) => r.stoodDown && band(r.cr) === '5-8')]]) {
  console.log(`    ${label.padEnd(24)} n=${String(g.length).padStart(5)}  mean patterns ${mean(g)}`);
}
console.log('\nBY ARCHETYPE');
for (const [a, n] of Object.entries(rows.reduce((acc, r) => { acc[r.archetype] = (acc[r.archetype] ?? 0) + 1; return acc; }, {})).sort((x, y) => y[1] - x[1])) {
  const g = rows.filter((r) => r.archetype === a);
  console.log(`  ${(a || '(none)').padEnd(13)} n=${String(n).padStart(5)}  mean ${mean(g)}  meat-only ${pc(g.filter((r) => r.n === 0).length, n)}`);
}
console.log('\nVARIANT SEAT IN THE DONOR vs THE PLAIN LINE');
for (const [label, g] of [['variant seat', rows.filter((r) => r.variant !== '(plain)')], ['plain line', rows.filter((r) => r.variant === '(plain)')]]) {
  console.log(`  ${label.padEnd(14)} n=${String(g.length).padStart(5)}  mean ${mean(g)}  meat-only ${pc(g.filter((r) => r.n === 0).length, g.length)}`);
}
const freq = {}; for (const r of rows) for (const p of r.patterns) freq[p] = (freq[p] ?? 0) + 1;
console.log('\nPATTERN FREQUENCY, OURS vs PRINT');
const pf = {}; for (const m of Object.values(print)) for (const p of m.patterns) pf[p] = (pf[p] ?? 0) + 1;
const keys = [...new Set([...Object.keys(pf), ...Object.keys(freq)])].sort((a, b) => (pf[b] ?? 0) - (pf[a] ?? 0));
for (const k of keys) console.log(`  ${k.padEnd(22)} ours ${pc(freq[k] ?? 0, rows.length).padStart(5)}   print ${pc(pf[k] ?? 0, Object.keys(print).length).padStart(5)}`);
