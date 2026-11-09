// BUILD THE TYPED FORTY FROM REAL INPUTS.
//   node scripts/typed40-from-export.mjs <monsters-export.json> [more exports...]
//
// Reads the statblock generator's own export (the DataManager's "monsters" JSON — a map of
// folder -> [sheet]) and writes scripts/smoke-batches/typed40.json: one batch entry per saved
// sheet, carrying exactly what the GM typed (`generation.userConcept`, which the engine stores
// as "<name> — <description>" or just one of them), the CR they set, and the printing.
//
// Why real inputs: every number the release was measured on comes from forty writer's
// sentences (sweep.json: 31 of 40 polished prose, 1 two-word concept). The owner typed "knife
// ball" and hit a bug four fortys never saw. This set answers "does it serve GMs", sweep.json
// answers "does it serve clear requests" — run both, expect this one lower.
//
// Dedupes by concept, keeps the register as typed (no cleanup of case or typos — that IS the
// data), and caps at 40 by taking a spread: shortest-to-longest by word count, so thin concepts
// are not crowded out by pasted lore.
import fs from 'node:fs';
import path from 'node:path';

const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node scripts/typed40-from-export.mjs <monsters-export.json> [...]'); process.exit(2); }
const sheets = [];
for (const f of files) {
  const raw = JSON.parse(fs.readFileSync(f, 'utf8'));
  // three shapes: the DataManager export `{ monsters: { folder: [sheet] }, ...other tools }`,
  // the bare localStorage `monsters` value `{ folder: [sheet] }`, or a plain `[sheet]`
  const store = raw && typeof raw === 'object' && !Array.isArray(raw) && raw.monsters ? raw.monsters : raw;
  const list = Array.isArray(store) ? store : Object.values(store ?? {}).flat();
  for (const m of list) if (m && typeof m === 'object' && (m.name || m.generation)) sheets.push(m);
}
const seen = new Set(); const entries = [];
for (const m of sheets) {
  const g = m.generation ?? m.other_edition?.generation ?? {};
  const typed = String(g.userConcept ?? '').trim();
  if (!typed) continue;                                   // a sheet with no record of the ask teaches nothing here
  const key = typed.toLowerCase(); if (seen.has(key)) continue; seen.add(key);
  const [name, ...rest] = typed.split(/\s[—–]\s/);        // the engine joins name and description with an em dash
  const description = rest.join(' — ');
  const cr = String(m.cr_str ?? m.cr ?? String(m.challenge_rating ?? '').replace(/\s.*$/, '') ?? '').trim() || 'auto';
  const rules = m.format === '2014' || m.actions ? '2014' : '2024';
  entries.push({ name: rest.length ? name : '', description: rest.length ? description : typed, cr, rules, words: typed.split(/\s+/).length,
    canary: `TYPED - real input, ${typed.split(/\s+/).length} words` });
}
entries.sort((a, b) => a.words - b.words);
const pick = entries.length <= 40 ? entries : Array.from({ length: 40 }, (_, i) => entries[Math.floor(i * entries.length / 40)]);
const out = pick.map(({ words, ...e }) => e);
fs.mkdirSync('scripts/smoke-batches', { recursive: true });
fs.writeFileSync('scripts/smoke-batches/typed40.json', JSON.stringify(out, null, 2));
const buckets = { '1-2 words': 0, '3-4': 0, '5-12': 0, '13+': 0 };
for (const e of pick) { const w = e.words; buckets[w <= 2 ? '1-2 words' : w <= 4 ? '3-4' : w <= 12 ? '5-12' : '13+']++; }
console.log(`${sheets.length} saved sheets -> ${entries.length} distinct typed concepts -> wrote ${out.length} to scripts/smoke-batches/typed40.json`);
console.log('register:', JSON.stringify(buckets));
console.log('sample:', out.slice(0, 6).map((e) => `"${[e.name, e.description].filter(Boolean).join(' — ')}"`).join(' | '));
