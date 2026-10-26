// Overlaps removed: a "free signature row" is ALSO logged as a signature
// template (it is a template fit that carries no receipt), and its trace fires
// twice — once naming the seat, once naming the row. Counted once, by the
// row-naming form. Cross-checked against the engine's own loss tally.
import fs from 'node:fs'; import path from 'node:path';
const MISS = [
  [/no template exists for this seat on this line/, 'no template for that seat'],
  [/no template on the shelf shares a verb/, 'nothing on the shelf does that'],
  [/the model found no template that holds it/, 'AI found none that fits'],
  [/could not be filled/, 'template could not be filled'],
  [/which is not on this sheet/, 'cited a row that is not there'],
  [/quotes nothing the GM typed/, 'no receipt'],
  [/print closes this sheet's row set/, 'no room left on the sheet'],
  [/has no (?:ranged|melee) row to ride/, 'no attack row to ride'],
];
const t = { sheets: 0, ideas: 0, shipped: 0, riders: 0, freeRows: 0, seed: 0, sigRows: 0, floor: 0, nothingHeld: 0, miss: 0, vetoed: 0, counted: 0 };
const buckets = {}; const unparsed = new Set();
for (const D of process.argv.slice(2)) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const tr = fs.readFileSync(path.join(D, f), 'utf8'); t.sheets += 1;
  for (const line of tr.split('\n')) {
    if (!/^\[reskin\] (signature|seed share|free signature)/.test(line)) continue;
    if (/signature idea \((?:action|trait)\)/.test(line)) { t.ideas += 1; continue; }
    if (/signature template(?: \(trait\))?:/.test(line)) { t.shipped += 1; continue; }
    if (/signature rider:/.test(line)) { t.riders += 1; continue; }
    if (/free signature row: "/.test(line)) { t.freeRows += 1; continue; }      // the row-naming form only
    if (/free signature row: (?:action|trait|bonus_action|reaction) —/.test(line)) continue; // its seat twin
    if (/signature dropped by the floor:/.test(line)) { t.floor += 1; continue; }
    if (/signature dropped —/.test(line)) { t.nothingHeld += 1; continue; }
    if (/signature miss:/.test(line)) { t.miss += 1; const b = MISS.find(([r]) => r.test(line))?.[1] ?? 'OTHER: ' + line.slice(30, 110); buckets[b] = (buckets[b] ?? 0) + 1; continue; }
    let m = /seed share: (\d+) of (\d+) signature row/.exec(line); if (m) { t.seed += +m[1]; t.sigRows += +m[2]; continue; }
    m = /signature outcome: (\d+) of (\d+) accepted/.exec(line); if (m) { t.vetoed += +m[1]; t.counted += +m[2]; continue; }
    if (/signature (bound to|re-seated:|re-slotted:|idea call failed|fit call failed)|free-row budget/.test(line)) continue;
    unparsed.add(line.slice(0, 110));
  }
}
const pc = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : '—';
const total = t.shipped + t.riders;
console.log(`${t.sheets} monsters. The AI proposed ${t.ideas} signature abilities at the concept stage.\n`);
console.log(`REACHED THE STATBLOCK AS A ROW   ${total}  (${pc(total, t.ideas)})`);
console.log(`   of those, carrying a real receipt (it does what the GM asked)   ${total - t.freeRows}  (${pc(total - t.freeRows, t.ideas)} of all ideas)`);
console.log(`   of those, shipped as DECORATION — no receipt, nearest match     ${t.freeRows}  (${pc(t.freeRows, total)} of shipped rows)`);
console.log(`\nNEVER REACHED IT                 ${t.miss + t.floor + t.nothingHeld}  (${pc(t.miss + t.floor + t.nothingHeld, t.ideas)})`);
console.log(`   nothing on the shelf could hold the idea   ${t.miss}`);
console.log(`   too weak to be worth a row (priced out)    ${t.floor}`);
console.log(`   nothing held it and no seed was legal      ${t.nothingHeld}`);
console.log(`\nCross-check, the engine's own tally: ${t.vetoed} of ${t.counted} accepted picks never reached the sheet (${pc(t.vetoed, t.counted)}).`);
console.log(`Prebuilt library seeds among shipped signature rows: ${t.seed} of ${t.sigRows} (${pc(t.seed, t.sigRows)}).`);
if (Object.keys(buckets).length) { console.log('\nWhy an idea found no row:'); for (const [k, v] of Object.entries(buckets).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`); }
if (unparsed.size) { console.log('\nUNPARSED (parser gap — do not trust a zero above without reading these):'); for (const u of [...unparsed].slice(0, 6)) console.log('   ', u); }
