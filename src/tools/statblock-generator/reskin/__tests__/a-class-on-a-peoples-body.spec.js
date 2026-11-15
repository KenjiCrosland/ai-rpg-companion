/**
 * EVERY CLASS BUILDS ON EVERY PEOPLE'S OWN PRINTED BODY (2026-11-15).
 *
 * The class kit lends a Spellcasting row from the class's own print block when the sheet
 * stands on a body that carries none — a goblin wizard on the Goblin Warrior borrows the
 * Mage's row. That lend called `asInline` directly, and `asInline` is a const ~260 lines
 * below it that needs the creature's rules-text name, so **every mage and every cleric on a
 * people's body threw and the sheet was lost**: 24 of 24. It had been that way since the lend
 * landed on 2026-11-08, unseen because it needs the routing step to name the people's body and
 * no saved sheet or test built that combination.
 *
 * The lend now stamps the lending block as `kitSrc` and the sweep fix 4 built substitutes the
 * name once `inline` exists. `scripts/reference-class-on-people.mjs` is the same check at
 * three CRs; this is the suite's copy.
 *
 * The stub reads the answer skeleton out of the prompt it is handed so it fits whichever
 * chassis the class NPC path picks. That is a fixture reading a prompt's STRUCTURE to build a
 * reply, not a test asserting on prompt wording.
 */
import { generateReskin } from '../generate.mjs';

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

const build = (body, cls, cr) => {
  const concept = `${body.split(' ')[0].toLowerCase()} ${cls}`;
  return generateReskin({ mechanics: [], archetype: 'caster', concept, userConcept: concept, cr, path: { path: 'class_npc', print_body: body, relation: 'is', class: cls } }, stub());
};
const spellRow = (m) => Object.values(m.sections).flat().find((e) => /^Spellcasting/.test(e.name ?? ''));

describe('every class on every people\'s body', () => {
  test('none throws, every caster carries a Spellcasting row, and none names the lender', async () => {
    const threw = []; const noRow = []; const leaked = [];
    for (const [body, cr] of BODIES) {
      for (const cls of CLASSES) {
        let m;
        try { m = await build(body, cls, cr); } catch (e) { threw.push(`${body} ${cls}: ${e.message}`); continue; }
        if (!CASTERS.has(cls)) continue;
        const sp = spellRow(m);
        if (!sp) { noRow.push(`${body} ${cls}`); continue; }
        if (/\bthe (?:mage|archmage|priest|acolyte)\b/i.test(sp.text ?? '')) leaked.push(`${body} ${cls}: ${String(sp.text).slice(0, 70)}`);
      }
    }
    expect(threw).toEqual([]);
    expect(noRow).toEqual([]);
    expect(leaked).toEqual([]);
  }, 600000);
});

describe('the lent row is this sheet\'s own', () => {
  test.each([['Goblin Warrior', 'mage', 3], ['Hobgoblin Warrior', 'cleric', 4]])(
    '%s %s: the DC derives from this sheet\'s casting score, and the row starts with a capital',
    async (body, cls, cr) => {
      const m = await build(body, cls, cr);
      const sp = spellRow(m);
      expect(sp).toBeTruthy();
      expect(sp.text[0]).toBe(sp.text[0].toUpperCase());
      const named = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(sp.text)?.[1];
      expect(named).toBeTruthy();
      const K = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[named];
      const want = 8 + Number(m.pb) + Math.floor((Number(m.stats[K]) - 10) / 2);
      expect(Number(/spell save DC (\d+)/.exec(sp.text)?.[1])).toBe(want);
    },
    120000,
  );
});
