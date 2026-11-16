// Reference sweep for item 4's save-DC rule (2026-11-15).
//
// Every donor card, at its own CR and two either side, with all three mind tiers set to each
// of the four tiers in turn. One stubbed model answer per card, so the only thing that changes
// inside a pair is the tiers.
//
//   node --import ./scripts/alias-loader.mjs scripts/reference-mind-dc-sweep.mjs
//
// It borrows the stub helpers (mk, json, gen) from the-mind-on-a-sheet.spec.js so that the
// sweep and the suite build a sheet the same way.
//
// THE RULE IT CHECKS: with the tiers, no save DC sits further above the card's DC than the
// same sheet's DC without them. A DC that moves ONTO the card's, or down, is fine.
import fs from 'node:fs';

const R = `${process.cwd()}/src/tools/statblock-generator/reskin`;
const { generateReskin, renameKeysOf } = await import(`${R}/generate.mjs`);
const { pickDonor, scaleDonor } = await import(`${R}/scale.mjs`);
const { DONORS } = await import(`${R}/donors.mjs`);

const spec = fs.readFileSync(`${R}/__tests__/the-mind-on-a-sheet.spec.js`, 'utf8').split('\n');
const helpers = ['const mk =', 'const json =', 'const gen ='].map((p) => {
  const l = spec.find((x) => x.startsWith(p));
  if (!l) throw new Error(`the spec no longer has a line starting "${p}" — this sweep is out of date`);
  return l;
}).join('\n');
const { json, gen } = new Function('generateReskin', 'renameKeysOf', 'pickDonor', 'scaleDonor', `${helpers}\nreturn { mk, json, gen };`)(generateReskin, renameKeysOf, pickDonor, scaleDonor);

const all = (m, re) => Object.values(m.sections).flat().flatMap((e) => [...String(e.text ?? '').matchAll(re)].map((x) => Number(x[1])));
const numbersOf = (m) => ({ ac: m.ac, hp: m.hp, atk: all(m, /Attack Roll:\*?\s*\+(\d+)/g), dc: all(m, /DC (\d+)/g) });

const log = console.log;
for (const k of ['log', 'warn', 'info', 'debug']) console[k] = () => {};

const TIERS = ['feeble', 'ordinary', 'capable', 'formidable'];
const CONCEPT = 'a clattering heap of fused scrap'; // matches no print block, so the sheet is homebrew
let pairs = 0, errors = 0, other = 0;
const onto = [], above = [], threw = new Set();
for (const d of DONORS) {
  const arch = (d.archetypes ?? [])[0]; if (!arch) continue;
  for (const cr of [...new Set([d.cr, Math.max(1, d.cr - 2), d.cr + 2])]) {
    let answer, plain;
    const base = { archetype: arch, style: d.style ?? null, concept: CONCEPT, userConcept: CONCEPT, cr, donorPin: d.id };
    try { answer = json('Scrapheap', 'Aberration', cr, d.style ?? null, arch); plain = await gen(base, answer); } catch { errors++; threw.add(`${d.id}@CR${cr}`); continue; }
    if (plain.generation?.donor !== d.id) continue;
    const card = scaleDonor(d, cr, { mechanics: [] }).dc;
    const a = numbersOf(plain);
    for (const t of TIERS) {
      let tiered; try { tiered = await gen({ ...base, mindTiers: { INT: t, WIS: t, CHA: t }, mind: 'sapient' }, answer); } catch { errors++; continue; }
      pairs++;
      const b = numbersOf(tiered);
      if (a.ac !== b.ac || a.hp !== b.hp || a.atk.join() !== b.atk.join()) other++;
      a.dc.forEach((x, i) => {
        const y = b.dc[i]; if (y === x || y === undefined) return;
        const row = { donor: d.id, cr, tier: t, card, without: x, with: y };
        (y - card > Math.max(0, x - card) ? above : onto).push(row);
      });
    }
  }
}
console.log = log;
console.log(`pairs ${pairs}, generation errors ${errors}`);
console.log(`pairs where AC, HP or an attack bonus differs: ${other}`);
console.log(`save DC rows that moved onto the card's DC or down: ${onto.length}`);
console.log(`save DC rows that moved FURTHER ABOVE the card's DC: ${above.length}  ${above.length ? '<- the rule fails' : '<- the rule holds'}`);
for (const r of above.slice(0, 12)) console.log(`  ${r.donor} at CR ${r.cr}, all ${r.tier}: card DC ${r.card}, without ${r.without}, with ${r.with}`);
if (threw.size) console.log(`\ncard+CR combinations that threw in the stub helper before any tier: ${threw.size}\n  ${[...threw].join(', ')}`);
process.exitCode = above.length || other ? 1 : 0;
