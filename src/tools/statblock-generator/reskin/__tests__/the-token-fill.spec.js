/**
 * THE ENGINE'S TOKENS ARE FILLED, OR THE ROW IS REFUSED (2026-11-16).
 *
 * A model-written row carries `{dc}` where a save DC belongs and `{dmg}` where damage belongs, and
 * never a number — so an uncomputable quantity cannot survive the round trip. The engine then fills
 * them. Two ways that went wrong, both found on the tapes:
 *
 *   "a DC of {dc}"  shipped as "a DC of DC 13". The fill always wrote "DC n" and only ate an
 *                   IMMEDIATELY preceding "DC ", so the word "of" got between them.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

/** a stub that answers every call, and writes one trait carrying the token in prose */
const stub = (effect) => {
  let cached = null;
  return async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith('You are writing ONE ability')) {
      return JSON.stringify({ traits: [{ clause: 'that hides in the mud', name: 'Mud-Caked Hide', trigger: 'While the hound is motionless', effect, imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1, passive_effect: 'defense' }] });
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      const typed = [...keysOf(p, 'damage_types'), ...Object.values(renames)];
      cached = JSON.stringify({ name: 'Bog Hound', type: 'Beast', size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames,
        damage_types: Object.fromEntries(typed.map((n) => [renames[n] ?? n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'stone',
        wildcard: '*Strength Saving Throw*: DC 12, one creature within 10 feet. *Failure:* The target has the Prone condition.' });
    }
    return cached;
  };
};

const build = (effect) => generateReskin({
  mechanics: [], archetype: 'brute', concept: 'a mud-caked bog hound that hides in the mud',
  userConcept: 'a mud-caked bog hound that hides in the mud', cr: 1,
  path: { path: 'homebrew', print_body: null, relation: null, class: null },
}, stub(effect));

const textOf = (m) => Object.values(m.sections ?? {}).flat().map((e) => String(e.text ?? '')).join('\n');

describe('a DC token renders its letters once', () => {
  test('"a DC of {dc}" does not ship as "a DC of DC 13"', async () => {
    const m = await build('a creature notices it only by succeeding on a Wisdom (Perception) check against a DC of {dc}');
    const all = textOf(m);
    expect(all).not.toMatch(/DC of DC/);
    expect(all).not.toMatch(/DC\s+DC/);
    // and the number is still there, once, with its letters
    const row = Object.values(m.sections).flat().find((e) => /Perception/.test(String(e.text ?? '')));
    if (row) expect(row.text).toMatch(/a DC of \d+/);
  }, 30000);

  test('a bare token still gains its letters', async () => {
    const m = await build('a creature must succeed on a {dc} Wisdom saving throw to notice it');
    const all = textOf(m);
    expect(all).not.toMatch(/\{dc\}/);
    expect(all).not.toMatch(/DC\s+DC/);
  }, 30000);

  test('no row ships with an unfilled token of either kind', async () => {
    for (const effect of ['it takes {dmg} Fire damage when struck', 'a creature notices it on a DC of {dc} check']) {
      const all = textOf(await build(effect));
      expect(all).not.toMatch(/\{dc\}|\{dmg\}/);
    }
  }, 40000);
});
