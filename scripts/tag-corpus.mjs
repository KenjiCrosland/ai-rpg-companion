/**
 * Writes the cookbook index: every print ability in src/data/srd52-monsters.json
 * tagged in the template grammar (reskin/corpus-tags.mjs). NOT part of the test
 * suite. `smoke-misses.mjs` reads the index to cite print under each miss.
 * Usage: node scripts/tag-corpus.mjs
 */
import fs from 'node:fs';
import { tagCorpus } from '../src/tools/statblock-generator/reskin/corpus-tags.mjs';

const src = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8'));
const list = Array.isArray(src) ? src : Object.values(src).flat();
const out = tagCorpus(list);
fs.writeFileSync('scripts/corpus-shapes.json', JSON.stringify(out));
const tally = {};
for (const r of out) { const k = `${r.section}/${r.trigger}/${r.effect}`; tally[k] = (tally[k] ?? 0) + 1; }
console.log(`${out.length} print signatures tagged from ${list.length} blocks → scripts/corpus-shapes.json`);
console.log(Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, n]) => `${String(n).padStart(4)}  ${k}`).join('\n'));
