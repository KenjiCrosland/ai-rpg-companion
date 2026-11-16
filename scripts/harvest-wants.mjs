// WHAT THE CALL ASKED FOR AND THE CATALOG DID NOT HAVE.
//   node --import ./scripts/alias-loader.mjs scripts/harvest-wants.mjs [run-dir ...]
// Default: every run in smoke-out.
//
// 94.8% of the call's template declines are `no_fit` — "nothing offered carries
// this mechanic" (3,618 declines across 10,134 trace files, 2026-10-29). The
// engine then lands the NEAREST template anyway, which is where unexpressing
// shapes come from: the 10-29 forty landed 65 shapes for 78 seats with 4
// expressed. So the gap list is the build list, and it is already written down —
// every refused seat records `what it wanted`.
//
// THE AXIS IS THE CELL, NOT A WORD LIST. An idea declares section/trigger/effect
// and every template declares the same three, so a want can be placed against
// the templates that exist for its cell with no reading of meaning at all. A cell
// with many wants and few templates is a build target; a cell with many of both
// is a parameterisation target — the shape exists and will not bend.
import fs from 'node:fs';
import path from 'node:path';
import { TEMPLATES, GRAMMARS } from '@/tools/statblock-generator/reskin/templates.mjs';

// SINCE WHEN. A want harvested from a run that predates the fix for its cell is
// history, not a build target: the `body-reaction` grammar landed 2026-10-26 and
// serves trait/on_being_hit/{condition,movement}, and the `payoff` grammar serves
// rider/on_hit/*. Pass --since YYYY-MM-DD to read only runs from that date on.
const sinceArg = (() => { const i = process.argv.indexOf('--since'); return i > 0 ? process.argv[i + 1] : null; })();
const keep = (d) => !sinceArg || (d.match(/(\d{4}-\d{2}-\d{2})/) ?? [])[1] >= sinceArg;
const dirs = process.argv.slice(2).filter((a) => !a.startsWith('--') && a !== sinceArg).length ? process.argv.slice(2).filter((a) => !a.startsWith('--') && a !== sinceArg)
  : fs.readdirSync('smoke-out').filter((d) => { try { return fs.statSync(path.join('smoke-out', d)).isDirectory(); } catch { return false; } }).filter(keep).map((d) => path.join('smoke-out', d));

const byCell = new Map();   // cell -> template ids
for (const t of TEMPLATES ?? []) {
  const k = `${t.section ?? '?'}/${t.trigger ?? '?'}/${t.effect ?? '?'}`;
  if (!byCell.has(k)) byCell.set(k, []);
  byCell.get(k).push(t.id ?? t.key);
}

// WHICH CELLS A GRAMMAR ALREADY ASSEMBLES. A composed row is built at factory
// time and never appears in TEMPLATES, so counting templates alone calls these
// cells empty when they are served.
const composedCells = new Map();
for (const [name, g] of Object.entries(GRAMMARS ?? {})) {
  const sec = g.section ?? null; if (!sec) continue;
  const effects = new Set();
  for (const c of (g.consequence ?? [])) {
    const txt = typeof c === 'string' ? c : String(c?.effect ?? '');
    if (/damage/.test(txt)) effects.add('damage');
    if (/condition/.test(txt)) effects.add('condition');
    if (/pushed|pulls|Speed halved|Speed is halved/.test(txt)) effects.add('movement');
  }
  const triggers = sec === 'trait' ? ['on_being_hit'] : sec === 'rider' ? ['on_hit'] : [];
  for (const tr of triggers) for (const ef of effects) composedCells.set(`${sec}/${tr}/${ef}`, name);
}

const wants = [];           // { cell, seat, text, reason, near, run }
for (const dir of dirs) {
  let files = [];
  try { files = fs.readdirSync(dir).filter((x) => x.endsWith('.md')); } catch { continue; }
  for (const f of files) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    // seat -> the cell its idea declared
    const cells = new Map();
    for (const m of t.matchAll(/signature idea \((\w+)\):[\s\S]{0,900}?\[(\w+)\/(\w+)\/(\w+)\]/g)) cells.set(m[1], `${m[2]}/${m[3]}/${m[4]}`);
    const push = (seat, text, reason, near) => {
      const clean = String(text ?? '').trim().replace(/\s+/g, ' ');
      if (!clean || clean === 'unstated') return;
      wants.push({ cell: cells.get(seat) ?? null, seat, text: clean, reason: reason ?? null, near: near ?? null, run: path.basename(dir) });
    };
    for (const m of t.matchAll(/closest accepted: (\w+) — the call refused every template but named "([^"]+)" as nearest(?: and declined it for ([\w()]+))?; it lands rather than the row being dropped \(what it wanted: ([^)]*)\)/g)) push(m[1], m[4], m[3] ?? null, m[2]);
    for (const m of t.matchAll(/closest refused: (\w+) — "([^"]+)" was named nearest, but the call declined it for (\w+)[\s\S]{0,400}?\(what it wanted: ([^)]*)\)/g)) push(m[1], m[4], m[3], m[2]);
  }
}

const norm = (s) => s.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
const groups = new Map();   // cell -> Map(normalised want -> {n, sample, nears:Set})
for (const w of wants) {
  const c = w.cell ?? '(cell unrecorded)';
  if (!groups.has(c)) groups.set(c, new Map());
  const g = groups.get(c);
  const k = norm(w.text).split(' ').slice(0, 8).join(' ');   // the first 8 words, as a crude bucket
  if (!g.has(k)) g.set(k, { n: 0, sample: w.text, nears: new Set() });
  const e = g.get(k); e.n++; if (w.near) e.nears.add(w.near);
}

console.log(`runs scanned: ${dirs.length}   wants harvested: ${wants.length}`);
const reasons = {};
for (const w of wants) reasons[w.reason ?? '(not traced)'] = (reasons[w.reason ?? '(not traced)'] ?? 0) + 1;
console.log('by decline reason:', Object.entries(reasons).map(([k, v]) => `${k} ${v}`).join('  ·  '));
console.log();
console.log('CELL                              templates   wants   distinct   verdict');
const rows = [...groups.entries()].map(([cell, g]) => ({
  cell, tpl: (byCell.get(cell) ?? []).length, n: [...g.values()].reduce((a, b) => a + b.n, 0), distinct: g.size, g,
})).sort((a, b) => b.n - a.n);
for (const r of rows) {
  const verdict = r.cell === '(cell unrecorded)' ? '—'
    : composedCells.has(r.cell) ? `composed — the ${composedCells.get(r.cell)} grammar assembles this`
    : r.tpl === 0 ? 'BUILD — nothing serves this cell'
    : r.n / Math.max(r.tpl, 1) >= 8 ? 'PARAMETERISE — shapes exist and will not bend'
    : 'ordinary';
  console.log(`${r.cell.padEnd(34)}${String(r.tpl).padStart(8)}${String(r.n).padStart(8)}${String(r.distinct).padStart(11)}   ${verdict}`);
}
console.log();
console.log('THE TOP WANTS, by cell (the build list):');
for (const r of rows.slice(0, 6)) {
  if (r.cell === '(cell unrecorded)') continue;
  console.log(`\n== ${r.cell}  (${r.tpl} template(s): ${(byCell.get(r.cell) ?? []).slice(0, 8).join(', ')})`);
  for (const [, e] of [...r.g.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 8)) {
    console.log(`   x${String(e.n).padEnd(4)} ${e.sample.slice(0, 104)}`);
    if (e.nears.size) console.log(`          landed instead: ${[...e.nears].slice(0, 5).join(', ')}`);
  }
}
