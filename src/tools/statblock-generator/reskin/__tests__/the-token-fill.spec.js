/**
 * THE ENGINE'S TOKENS ARE FILLED, OR THE ROW IS REFUSED (2026-11-16).
 *
 * A model-written row carries `{dc}` where a save DC belongs and `{dmg}` where damage belongs, and
 * never a number — so an uncomputable quantity cannot survive the round trip. The engine then fills
 * them. Two ways that went wrong, both found on the tapes:
 *
 *   "a DC of {dc}"  shipped as "a DC of DC 13". The fill always wrote "DC n" and only ate an
 *                   IMMEDIATELY preceding "DC ", so the word "of" got between them.
 *   "gains {dmg} Temporary Hit Points"  shipped as "gains Temporary Hit Points". The strip that
 *                   drops a token not standing where damage is dealt took the number and left the
 *                   words. Two rows across every recording, about one a forty.
 *   "a +{dmg} bonus to its AC"  shipped as "a + bonus". That number this engine cannot price at
 *                   all, so the row is REFUSED rather than stripped and left as a hole.
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

describe('a damage token is filled or the row is refused, never left as a hole', () => {
  test('"gains {dmg} Temporary Hit Points" keeps its number', async () => {
    const m = await build('the hound gains {dmg} Temporary Hit Points whenever it ends its turn in mud');
    const all = textOf(m);
    expect(all).not.toMatch(/\{dmg\}/);
    if (/Temporary Hit Points/.test(all)) {
      // the promise is readable: a number stands in front of it
      expect(all).toMatch(/\d+(?:\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\))?\s+Temporary Hit Points/);
      expect(all).not.toMatch(/gains Temporary Hit Points/);
    }
  }, 30000);

  test('"an extra {dmg} Fire damage" in the same row keeps its number too', async () => {
    const m = await build('the hound gains {dmg} Temporary Hit Points, and its bite deals an extra {dmg} Fire damage');
    const all = textOf(m);
    expect(all).not.toMatch(/\{dmg\}/);
    expect(all).not.toMatch(/gains Temporary Hit Points/);
    expect(all).not.toMatch(/extra Fire damage\b/);   // the second token is not dropped either
  }, 30000);

  test('a {dmg} written as a bonus does not ship as "a + bonus"', async () => {
    const m = await build('an ally within 5 feet gains a +{dmg} bonus to its AC until the start of the hound\'s next turn');
    const all = textOf(m);
    expect(all).not.toMatch(/\{dmg\}/);
    expect(all).not.toMatch(/a \+ bonus/);
    expect(all).not.toMatch(/\+\s+bonus/);
  }, 30000);

  test('no row on any of these sheets leaves a number promised and unwritten', async () => {
    for (const effect of [
      'the hound gains {dmg} Temporary Hit Points whenever it ends its turn in mud',
      'an ally within 5 feet gains a +{dmg} bonus to its AC',
      'a creature notices it on a DC of {dc} check',
    ]) {
      const all = textOf(await build(effect));
      expect(all).not.toMatch(/\{dmg\}|\{dc\}/);
      expect(all).not.toMatch(/gains Temporary Hit Points/);
      expect(all).not.toMatch(/a \+ bonus/);
      expect(all).not.toMatch(/equal to,/);
    }
  }, 60000);
});
