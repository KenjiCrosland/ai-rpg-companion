// Reference checks for the two defects a class-on-a-people's-body sheet carries (2026-11-15).
//
//   node --import ./scripts/alias-loader.mjs scripts/reference-lend-checks.mjs
//
//   1. THE LENT SPELL LIST FITS THE SHEET'S CR. A mage on a people's body carried print's
//      whole CR 6 Mage list at every CR — Fireball twice a day and Cone of Cold on a CR 1
//      goblin wizard. Compared against the list the same class carries at the same CR on its
//      own body.
//   2. NO FUSED RIDER. Print's Goblin Warrior Scimitar reads "5 (1d6 + 2) Slashing damage,
//      plus 2 (1d4) Slashing damage if the attack roll had Advantage". On the sheet the rider's
//      damage was gone and its condition left hanging on the base damage.
import { generateReskin } from '@/tools/statblock-generator/reskin/generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`); if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const stub = () => {
  let cached = null;
  return async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      const typed = [...keysOf(p, 'damage_types'), ...Object.values(renames)];
      cached = JSON.stringify({
        name: 'Pip', type: 'Humanoid', size: 'Small', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common',
        renames, damage_types: Object.fromEntries(typed.map((n) => [renames[n] ?? n, 'Bludgeoning'])),
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'stone',
        wildcard: '*Strength Saving Throw*: DC 12, one creature within 10 feet. *Failure:* The target has the Prone condition.',
      });
    }
    return cached;
  };
};

const PEOPLES = ['Kobold Warrior', 'Goblin Warrior', 'Hobgoblin Warrior', 'Bugbear Warrior', 'Satyr', 'Centaur Trooper'];
const CRS = [1, 2, 3, 4, 6, 8];
const build = (body, cls, cr) => {
  const concept = `${body.split(' ')[0].toLowerCase()} ${cls}`;
  return generateReskin({ mechanics: [], archetype: 'caster', concept, userConcept: concept, cr, path: { path: 'class_npc', print_body: body, relation: 'is', class: cls } }, stub());
};
const rowsOf = (m) => Object.values(m.sections ?? {}).flat().filter(Boolean);
const spellRow = (m) => rowsOf(m).find((e) => /^Spellcasting/.test(e.name ?? ''));
/** every italicised spell name in a Spellcasting row */
const spellsIn = (t) => [...new Set([...String(t ?? '').matchAll(/\*([A-Z][A-Za-z' /]+)\*/g)].map((x) => x[1].trim()))];

const log = console.log;
for (const k of ['log', 'warn', 'info', 'debug']) console[k] = () => {};

// the list the class carries at that CR on its OWN body — the baseline the lend must not exceed
const own = {};
for (const cls of ['mage', 'cleric']) for (const cr of CRS) {
  try { const m = await build(cls === 'mage' ? 'Mage' : 'Priest', cls, cr); own[`${cls}@${cr}`] = spellsIn(spellRow(m)?.text); } catch { own[`${cls}@${cr}`] = null; }
}

const tooStrong = []; const fused = []; let casters = 0; let rows = 0;
for (const body of PEOPLES) for (const cr of CRS) {
  for (const cls of ['mage', 'cleric', 'rogue', 'fighter']) {
    let m; try { m = await build(body, cls, cr); } catch { continue; }
    if (['mage', 'cleric'].includes(cls)) {
      casters += 1;
      const got = spellsIn(spellRow(m)?.text);
      const base = own[`${cls}@${cr}`];
      const extra = base ? got.filter((s) => !base.includes(s)) : [];
      if (extra.length) tooStrong.push(`${body} ${cls} CR ${cr}: ${extra.join(', ')}`);
    }
    for (const e of rowsOf(m)) {
      const t = String(e.text ?? '');
      if (!/Attack Roll/.test(t)) continue;
      rows += 1;
      // a rider's condition with no rider damage before it
      if (/\bif the attack roll had Advantage\b/i.test(t) && !/\bplus \d+ \(\d+d\d+\)[^.]*if the attack roll had Advantage/i.test(t)) {
        fused.push(`${body} ${cls} CR ${cr}: ${e.name}: ${t.slice(0, 92)}`);
      }
    }
  }
}
console.log = log;
console.log(`caster sheets ${casters}, attack rows ${rows}`);
console.log(`\n1. lent lists carrying a spell the class would not have at that CR: ${tooStrong.length}`);
for (const x of tooStrong.slice(0, 8)) console.log(`   ${x}`);
console.log(`\n2. attack rows with a rider's condition and no rider damage: ${fused.length}`);
for (const x of fused.slice(0, 8)) console.log(`   ${x}`);
process.exitCode = tooStrong.length || fused.length ? 1 : 0;
