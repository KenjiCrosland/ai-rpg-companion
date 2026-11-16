/**
 * ONE NAME, ONE ROW (owner's fix F, 2026-11-16).
 *
 * Captain Vane shipped two rows named Longsword with different damage, under a Multiattack reading
 * "two Longsword attacks". The Guard Captain's body already carries a Longsword, and the
 * class-weapon pass renamed its Javelin to a second one.
 *
 * It was not rare. Over every person body print carries, eight classes and two CRs — 576 sheets
 * built with a stubbed model — 48 held two rows with one name before this fix, and they were all on
 * the Bugbear Stalker, the Bugbear Warrior and the Guard Captain. No other body did it.
 * `scripts/reference-one-name-one-row.mjs` is that whole grid; this file is the three bodies that
 * failed plus controls, so it runs in seconds.
 *
 * THE RULE: the class's weapon lands on ONE row. If the body already carries a row with that name,
 * nothing is renamed. Otherwise the first eligible row in section order takes it — print lists a
 * body's primary attack first and its Multiattack cites that row — and the body's secondary weapon
 * keeps its own name and print's own numbers.
 */
import { CLASSES } from '../classes.mjs';
import { generateReskin } from '../generate.mjs';

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

const ARCH = { mage: 'caster', cleric: 'caster', warlock: 'caster', druid: 'caster', bard: 'caster', sorcerer: 'caster', rogue: 'skirmisher', ranger: 'skirmisher', monk: 'skirmisher', fighter: 'brute', barbarian: 'brute', paladin: 'defender' };
const bare = (n) => String(n ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\)$/, '').trim();
const build = (body, cls, cr) => generateReskin({
  mechanics: [], archetype: ARCH[cls] ?? 'brute', concept: `${body.toLowerCase()} ${cls}`, userConcept: `${body.toLowerCase()} ${cls}`,
  cr, path: { path: 'class_npc', print_body: body, relation: 'is', class: cls },
}, stub());

// the three that failed, plus two that never did
const BODIES = ['Guard Captain', 'Bugbear Stalker', 'Bugbear Warrior', 'Goblin Warrior', 'Kobold Warrior'];
const CLASS_KEYS = CLASSES.map((c) => c.key);

describe('one name, one row', () => {
  test('no sheet holds two rows with the same name, and every Multiattack citation is a row', async () => {
    const dup = []; const badCite = [];
    for (const body of BODIES) {
      for (const cls of CLASS_KEYS) {
        for (const cr of [3, 4]) {
          let m; try { m = await build(body, cls, cr); } catch { continue; }
          const rows = Object.values(m.sections ?? {}).flat();
          const seen = new Map();
          for (const r of rows) { const b = bare(r.name).toLowerCase(); if (b) seen.set(b, (seen.get(b) ?? 0) + 1); }
          for (const [n, c] of seen) if (c > 1) dup.push(`${body} ${cls} CR ${cr}: ${c} rows named "${n}"`);
          const names = new Set([...seen.keys()]);
          for (const r of rows) {
            if (!/^Multiattack/.test(String(r.name ?? ''))) continue;
            const spans = [...String(r.text ?? '').matchAll(/(?:using |makes (?:one|two|three|four) |a use of )([A-Z][A-Za-z'\- ]{2,60}?)(?: attacks?\b|\b in any combination|[.,]|$)/g)].map((x) => x[1].trim());
            for (const cited of spans.flatMap((s) => s.split(/\s+(?:or|and)\s+/i)).map((x) => x.trim())) {
              if (!cited || /^(?:Melee|Ranged|It|The|Spellcasting)$/i.test(cited)) continue;
              if (!names.has(cited.toLowerCase())) badCite.push(`${body} ${cls} CR ${cr}: Multiattack cites "${cited}", which is no row`);
            }
          }
        }
      }
    }
    expect(dup).toEqual([]);
    expect(badCite).toEqual([]);
  }, 900000);

  // THE TWO HALVES OF THE RULE, read on the sheet that showed the bug.
  test("the Guard Captain's Javelin keeps its own name and print's own numbers", async () => {
    const m = await build('Guard Captain', 'fighter', 4);
    const rows = Object.values(m.sections ?? {}).flat();
    const names = rows.map((r) => bare(r.name));
    expect(names).toContain('Longsword');   // the body's own, which the class also wants
    expect(names).toContain('Javelin');     // NOT renamed to a second Longsword
    expect(names.filter((n) => n === 'Longsword')).toHaveLength(1);
    const jav = rows.find((r) => bare(r.name) === 'Javelin');
    expect(jav.text).toMatch(/range 30\/120 ft\./); // print's javelin, not a longsword's reach
  });

  test('the Bugbear monk gets one Unarmed Strike, not two', async () => {
    const names = Object.values((await build('Bugbear Warrior', 'monk', 3)).sections ?? {}).flat().map((r) => bare(r.name));
    expect(names.filter((n) => n === 'Unarmed Strike')).toHaveLength(1);
  });

  test('a body that carries no row of the class\'s weapon still gets re-armed', async () => {
    // the whole point of the pass must survive the fix: the kobold's Dagger becomes the mage's Quarterstaff
    const names = Object.values((await build('Kobold Warrior', 'mage', 3)).sections ?? {}).flat().map((r) => bare(r.name));
    expect(names).toContain('Quarterstaff');
  });
});
