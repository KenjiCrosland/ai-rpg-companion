// Reference check: every class on every people's own printed body (2026-11-15).
//
//   node --import ./scripts/alias-loader.mjs scripts/reference-class-on-people.mjs
//
// WHAT IT CHECKS
//   1. no sheet throws
//   2. a mage or a cleric carries a Spellcasting row
//   3. that row does not still call the creature by the lending block's noun
import fs from 'node:fs';

const R = `${process.cwd()}/src/tools/statblock-generator/reskin`;
const { generateReskin } = await import(`${R}/generate.mjs`);

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

const BODIES = [['Kobold Warrior', 2], ['Goblin Warrior', 3], ['Hobgoblin Warrior', 4], ['Bugbear Warrior', 3], ['Satyr', 3], ['Centaur Trooper', 4],
  ['Bandit', 2], ['Guard', 2], ['Scout', 2], ['Knight', 4], ['Spy', 3], ['Noble', 2]];
const CLASSES = ['mage', 'cleric', 'bard', 'paladin', 'monk', 'fighter', 'rogue', 'barbarian'];
const CASTERS = new Set(['mage', 'cleric']);
const LENDER_NOUN = /\bthe (?:mage|archmage|priest|acolyte)\b/i;

const log = console.log;
for (const k of ['log', 'warn', 'info', 'debug']) console[k] = () => {};
const threw = [], noRow = [], leaked = []; let cases = 0, lent = 0;
for (const [body, cr] of BODIES) for (const cls of CLASSES) {
  cases++;
  const concept = `${body.split(' ')[0].toLowerCase()} ${cls}`;
  try {
    const m = await generateReskin({ mechanics: [], archetype: 'caster', concept, userConcept: concept, cr, path: { path: 'class_npc', print_body: body, relation: 'is', class: cls } }, stub());
    if (!CASTERS.has(cls)) continue;
    const sp = Object.values(m.sections).flat().find((e) => /^Spellcasting/.test(e.name ?? ''));
    if (!sp) { noRow.push(`${body} ${cls}`); continue; }
    lent++;
    if (LENDER_NOUN.test(sp.text ?? '')) leaked.push(`${body} ${cls}: "${String(sp.text).slice(0, 70)}"`);
  } catch (e) { threw.push(`${body} ${cls}: ${String(e.message).slice(0, 70)}`); }
}
console.log = log;
console.log(`cases ${cases}`);
console.log(`threw ${threw.length}`); for (const x of threw) console.log(`  ${x}`);
console.log(`mage or cleric sheets with a Spellcasting row: ${lent} of ${BODIES.length * CASTERS.size}`);
console.log(`mage or cleric sheets with NO Spellcasting row: ${noRow.length}`); for (const x of noRow) console.log(`  ${x}`);
console.log(`Spellcasting rows still using the lender's noun: ${leaked.length}`); for (const x of leaked) console.log(`  ${x}`);
process.exitCode = threw.length || noRow.length || leaked.length ? 1 : 0;
