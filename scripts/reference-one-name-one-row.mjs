// ONE NAME, ONE ROW (owner's fix F, 2026-11-16).
//
//   node --import ./scripts/alias-loader.mjs scripts/reference-one-name-one-row.mjs [out.json]
//
// No model: the path is handed in and the stub reads the answer skeleton out of the prompt.
//
// Captain Vane shipped two rows named Longsword with different damage under a Multiattack reading
// "two Longsword attacks". The owner measured 32 of 416 class-NPC sheets carrying two rows with one
// name — all 16 on the Guard Captain and all 16 on the Bugbear Warrior. This grid is a SUPERSET of
// his: every person body print carries (36, by `isPersonBody`) x 8 classes x 2 CRs = 576.
//
// WHAT IT CHECKS
//   1. No sheet holds two rows with the same name.
//   2. Every name a Multiattack cites is a row on the sheet.
// With an output path it also dumps every row of every sheet, so a run on another commit can be
// diffed against it to prove nothing ELSE moved.
import fs from 'node:fs';
import blocks from '@/data/srd52-monsters.json';
import { isPersonBody } from '@/tools/statblock-generator/reskin/path.mjs';
import { CLASSES as CLASS_TABLE } from '@/tools/statblock-generator/reskin/classes.mjs';
import { generateReskin } from '@/tools/statblock-generator/reskin/generate.mjs';

const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };
const stub = () => { let cached = null; return async (p0) => {
  const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0); const rk = keysOf(p, 'renames');
  if (rk.length || !cached) {
    const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])); const typed = [...keysOf(p, 'damage_types'), ...Object.values(renames)];
    cached = JSON.stringify({ name: 'Pip', type: 'Humanoid', size: 'Small', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames,
      damage_types: Object.fromEntries(typed.map((n) => [renames[n] ?? n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'stone',
      wildcard: '*Strength Saving Throw*: DC 12, one creature within 10 feet. *Failure:* The target has the Prone condition.' });
  }
  return cached; }; };

const BODIES = blocks.filter((b) => isPersonBody(b.name)).map((b) => b.name);
const CLASSES = CLASS_TABLE.map((c) => c.key);
const CRS = [3, 4];
// generateReskin refuses a null archetype — "no silent default" — so each class names one.
const ARCH = { mage: 'caster', cleric: 'caster', warlock: 'caster', druid: 'caster', bard: 'caster', sorcerer: 'caster', rogue: 'skirmisher', ranger: 'skirmisher', monk: 'skirmisher', fighter: 'brute', barbarian: 'brute', paladin: 'defender' };
const bare = (n) => String(n ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\)$/, '').trim();

const out = process.argv.find((a) => a.endsWith('.json'));
const log = console.log; for (const k of ['log', 'warn', 'info', 'debug']) console[k] = () => {};
const dup = []; const badCite = []; const dump = {}; const errs = []; let cases = 0; let threw = 0;
for (const body of BODIES) for (const cls of CLASSES) for (const cr of CRS) {
  cases += 1;
  const concept = `${body.toLowerCase()} ${cls}`;
  let m;
  try { m = await generateReskin({ mechanics: [], archetype: ARCH[cls] ?? 'brute', concept, userConcept: concept, cr, path: { path: 'class_npc', print_body: body, relation: 'is', class: cls } }, stub()); }
  catch (e) { threw += 1; if (threw <= 3) errs.push(`${body} ${cls} CR ${cr}: ${e?.message ?? e}`); continue; }
  const rows = Object.entries(m.sections ?? {}).flatMap(([sec, es]) => es.map((e) => ({ sec, name: String(e.name ?? ''), text: String(e.text ?? '') })));
  const key = `${body} | ${cls} | CR ${cr}`;
  if (out) dump[key] = rows.map((r) => `${r.sec}/${r.name}: ${r.text}`);
  const seen = new Map();
  for (const r of rows) { const b = bare(r.name).toLowerCase(); if (!b) continue; seen.set(b, (seen.get(b) ?? 0) + 1); }
  const twice = [...seen.entries()].filter(([, n]) => n > 1).map(([b]) => b);
  if (twice.length) dup.push(`${key}: ${twice.join(', ')}`);
  const names = new Set(rows.map((r) => bare(r.name).toLowerCase()));
  for (const r of rows) {
    if (!/^Multiattack/.test(r.name)) continue;
    // THE SPAN IS SPLIT ON ITS CONNECTIVES. The first version captured "Shortsword or Morningstar"
    // as one name, because a row name may contain spaces and "or" is letters — 20 reports that were
    // the parser's fault, not the engine's.
    const spans = [...r.text.matchAll(/(?:using |makes (?:one|two|three|four) |a use of )([A-Z][A-Za-z'\- ]{2,60}?)(?: attacks?\b|\b in any combination|[.,]|$)/g)].map((x) => x[1].trim());
    for (const cited of spans.flatMap((sp) => sp.split(/\s+(?:or|and)\s+/i)).map((x) => x.trim())) {
      if (/^(?:Melee|Ranged|It|The|Spellcasting)$/i.test(cited) || !cited) continue;
      if (!names.has(cited.toLowerCase())) badCite.push(`${key}: Multiattack cites "${cited}", which is no row`);
    }
  }
}
console.log = log;
console.log(`cases ${cases} (${BODIES.length} person bodies x ${CLASSES.length} classes x ${CRS.length} CRs), threw ${threw}`);
for (const e of errs) console.log(`   THREW: ${e}`);
if (threw === cases) { console.log('EVERY case threw — the harness is wrong, not the engine; the counts below mean nothing.'); process.exit(2); }
console.log(`sheets with two rows of one name: ${dup.length}`);
for (const d of dup.slice(0, 20)) console.log(`   ${d}`);
if (dup.length > 20) console.log(`   … ${dup.length - 20} more`);
console.log(`Multiattack citations naming no row: ${badCite.length}`);
for (const d of badCite.slice(0, 10)) console.log(`   ${d}`);
if (out) { fs.writeFileSync(out, JSON.stringify(dump, null, 0)); console.log(`rows dumped to ${out} (${Object.keys(dump).length} sheets)`); }
process.exit(dup.length || badCite.length ? 1 : 0);
