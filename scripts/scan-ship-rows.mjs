// THE WIDENED TEXT SCAN (Fable 5.2's ship gate, 2026-11-15).
//
// The last two scans looked for unfilled tokens and blanks, and both missed a garbled rider
// ("...Bludgeoning damage if the attack roll had Advantage") and a garbled Multiattack ("It can
// replace one attack with  (Recharge 5-6)"). Those were found by eye, which does not scale to 65
// sheets. This scans every row of every sheet for the shapes that actually shipped.
//
//   node --import ./scripts/alias-loader.mjs scripts/scan-ship-rows.mjs <run-dir> [<run-dir>...]
import fs from 'node:fs';
import path from 'node:path';
import { SPECIES } from '@/tools/statblock-generator/reskin/species.mjs';
import { FEY_PEOPLES, OFF_TYPE_PEOPLES } from '@/tools/statblock-generator/reskin/path.mjs';
import printBlocks from '@/data/srd52-monsters.json';

const DECLARED = new Map([...FEY_PEOPLES, ...OFF_TYPE_PEOPLES].map((n) => [n.toLowerCase(), n]));
const PRINT_SIZE = new Map((printBlocks ?? []).map((b) => [String(b.name ?? '').toLowerCase(), (/^(Tiny|Small|Medium|Large|Huge|Gargantuan)/.exec(String(b.size ?? b.type ?? '')) ?? [])[1] ?? null]));
/** the row names a print block carries, by block name — a people's own trait is not a kit's */
const PRINT_ROWS = new Map((printBlocks ?? []).map((b) => [String(b.name ?? '').toLowerCase(),
  new Set(Object.values(b.sections ?? {}).flat().concat(b.traits ?? [], b.actions ?? [])
    .map((r) => String(r?.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()).filter(Boolean))]));
/** every row name a species kit can stamp — the srd pairs and the flavour rows */
const SPECIES_TRAITS = new Map();
for (const s of SPECIES) {
  for (const t of s.traits ?? []) if (Array.isArray(t.srd) && t.srd[1]) SPECIES_TRAITS.set(String(t.srd[1]).toLowerCase(), s.key);
  for (const f of s.flavor ?? []) if (f?.name) SPECIES_TRAITS.set(String(f.name).toLowerCase(), s.key);
}

// "…dealing 22 (5d8) Piercing damage to it." and "…or slide it." are correct sentences, so `it`,
// `its` and `is` come OUT of this list — they ended two good rows on the first pass.
const FUNCTION_TAIL = /\b(?:with|of|to|for|from|into|onto|the|a|an|and|or|plus|than|by|at|on|in)\s*\.\s*$/i;

const sheetsIn = (d) => fs.readdirSync(d).filter((f) => /^\d+-.*\.md$/.test(f)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).map((f) => path.join(d, f));

function read(p) {
  const s = fs.readFileSync(p, 'utf8');
  const block = (/### Block\n```\n([\s\S]*?)\n```/.exec(s) ?? [])[1] ?? '';
  const trace = s.split('### Trace')[1] ?? '';
  const pathLine = (/^\[path\] (?:class_npc|exact|twist|homebrew)[^\n]*/m.exec(trace) ?? [])[0] ?? '';
  // THE TYPE LINE, FOUND rather than assumed at an index — the blank lines vary, and index 2
  // was reading "Armor Class" on five sheets
  const typeLine = (block.split('\n').slice(0, 8).find((l) => /^(Tiny|Small|Medium|Large|Huge|Gargantuan)\s+\w+/i.test(l.trim())) ?? '').trim();
  const input = (/\*\*Input:\*\*\s*`([^`]*)`/.exec(s) ?? [])[1] ?? '';
  return { block, trace, pathLine, typeLine, input, name: (block.split('\n')[0] ?? '').trim() };
}

const findings = [];
const flag = (sheet, kind, detail) => findings.push({ sheet, kind, detail: String(detail).slice(0, 150) });

for (const dir of process.argv.slice(2).filter((a) => !a.startsWith('-'))) {
  if (!fs.existsSync(dir)) { console.log(`(missing) ${dir}`); continue; }
  for (const p of sheetsIn(dir)) {
    const id = `${path.basename(dir)}/${path.basename(p, '.md')}`;
    const { block, pathLine, typeLine, input } = read(p);
    const rows = [];
    let cur = null;
    for (const ln of block.split('\n')) {
      const m = /^([A-Z][A-Za-z'’\- ]{2,40}(?: \((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\))?)\.\s+(.*)$/.exec(ln.trim());
      if (m) { cur = { name: m[1], text: m[2] }; rows.push(cur); }
      // A ROW STOPS AT A SECTION HEADING OR THE UI (the first pass swallowed "Bonus Actions" and
      // "Create NPC" into the row above and then reported it as a sentence that does not end)
      else if (/^(?:Traits|Actions|Bonus Actions|Reactions|Legendary Actions|Lair Actions|Regional Effects|Create NPC|Edit|Move to folder|Regenerate|Export|Delete|Use in Encounter|✏️|📁|🔄|📤|🗑️|⚔️|👤)$/i.test(ln.trim())) cur = null;
      else if (cur && ln.trim()) cur.text += ` ${ln.trim()}`;
    }
    for (const r of rows) {
      const t = r.text.trim();
      if (/\bwith\s*\(/i.test(t)) flag(id, 'with-paren', `${r.name}: ${t}`);
      if (/can replace (?:one|two|three) attacks? with\s*(?:\((?:Recharge|\d)[^)]*\)\s*)?[.;]/i.test(t)) flag(id, 'objectless-clause', `${r.name}: ${t}`);
      // ONLY INSIDE AN ATTACK ROW. Print's Incorporeal Movement legitimately reads "It takes 5
      // (1d10) Force damage if it ends its turn inside an object" — conditional damage that is
      // the whole row, not a rider stripped of its damage.
      if (/Attack Roll/.test(t) && /\)\s+\w+ damage if /.test(t) && !/plus \d+ \([^)]*\) \w+ damage if /.test(t)) flag(id, 'rider-no-damage', `${r.name}: ${t}`);
      if (/(?:Attack Roll|Saving Throw)/.test(t) && !/[.!?]["')\]]?$/.test(t)) flag(id, 'row-not-a-sentence', `${r.name}: …${t.slice(-60)}`);
      const dbl = /\b([A-Za-z']{3,})\s+\1\b/i.exec(t);
      if (dbl && !/^(?:that|had|very)$/i.test(dbl[1])) flag(id, 'doubled-word', `${r.name}: ${dbl[0]}`);
      if (FUNCTION_TAIL.test(t)) flag(id, 'dangling-word', `${r.name}: …${t.slice(-50)}`);
      // CASE-SENSITIVE on NaN: /NaN/i matched the "nan" inside "revenant" on two rows
      if (/\{[a-z_]+\}/.test(t) || /\bundefined\b|\bNaN\b|\bnull\b/.test(t)) flag(id, 'raw-token', `${r.name}: ${t}`);
    }
    // the type line against the path line
    const isClassNpc = /^\[path\] class_npc/.test(pathLine);
    const bodyM = /^\[path\] (?:class_npc|twist|exact) — ([A-Z][A-Za-z' ]+?) \((?:is|resembles)\)/.exec(pathLine);
    const body = bodyM ? bodyM[1].trim() : null;
    // SHOWN WITH THE GM'S OWN WORDS. "An undead priest" and "clockwork friar" are class NPCs with
    // no body that are correctly NOT Humanoid, because the GM's words carry the type. Whether a
    // finding here is a defect depends on that, so the scan reports and the reader judges.
    if (isClassNpc && !body && typeLine && !/\bhumanoid\b/i.test(typeLine)) flag(id, 'class-npc-not-humanoid', `input "${input}" -> ${typeLine}  <<  ${pathLine.slice(0, 64)}`);
    if (body && DECLARED.has(body.toLowerCase())) {
      const want = PRINT_SIZE.get(body.toLowerCase());
      const got = (/^(Tiny|Small|Medium|Large|Huge|Gargantuan)/i.exec(typeLine) ?? [])[1] ?? null;
      if (want && got && want.toLowerCase() !== got.toLowerCase()) flag(id, 'people-wrong-size', `${got} but print's ${body} is ${want} — ${typeLine}`);
      for (const r of rows) {
        const bare = String(r.name).replace(/ \(.*\)$/, '').toLowerCase();
        const kit = SPECIES_TRAITS.get(bare);
        // Nimble Escape is the Goblin Warrior's OWN trait and Sunlight Sensitivity the Kobold
        // Warrior's; both also sit in a species kit's list. A people's own print row is never a
        // foreign kit, so print's own row names stand down first.
        if (kit && !(PRINT_ROWS.get(body.toLowerCase())?.has(bare))) flag(id, 'species-kit-on-a-people', `"${r.name}" belongs to the ${kit} kit, on a ${body}`);
      }
    }
  }
}

const byKind = findings.reduce((m, f) => ({ ...m, [f.kind]: [...(m[f.kind] ?? []), f] }), {});
console.log(`\n=== widened scan: ${findings.length} finding(s) ===`);
for (const [k, fs2] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${k} — ${fs2.length}`);
  for (const f of fs2.slice(0, 12)) console.log(`   ${f.sheet}  ${f.detail}`);
  if (fs2.length > 12) console.log(`   … ${fs2.length - 12} more`);
}
if (!findings.length) console.log('none');
