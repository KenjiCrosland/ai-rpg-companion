/**
 * THE ENGINE'S TOKENS ARE FILLED, OR THE ROW IS REFUSED (2026-11-16, repaired 2026-11-17).
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
 *
 * WHAT THE REPAIR FOUND. As first written, not one test in this file reached the row it was about.
 * Every assertion was an ABSENCE (`not.toMatch(/\{dmg\}/)`), and two that were not sat inside an
 * `if (row)` / `if (/Temporary Hit Points/.test(all))`. The stub answered only the author call, so
 * the idea call's answer did not parse, the seat fell back to a word-matched template
 * (`Faultless Tracker`), and the authored row never existed — on which sheet every absence is
 * trivially true. The file was green for a fix that reached neither row.
 *
 * Three things were needed to reach the seat: the idea call answered in its own shape, the fit call
 * answering `declined_because: "no_fit"` (the ENUM — prose there is not a refusal the engine can
 * read), and only then does `buildSeatPrompt` run and the authored row land. Every test below now
 * names whether its row LANDS or is REFUSED and asserts that first, so a test can no longer pass on
 * a sheet the row never reached.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

const CONCEPT = 'a mud-caked bog hound that hides in the mud';
const IDEA = 'while it lies still in the mud the hound simply cannot be picked out from the bank';
const ROW = 'Mud-Caked Hide';

/** a stub that answers every call on the way to the seat, and writes one trait carrying the token */
const stub = (effect) => {
  let cached = null;
  return async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ trait: { idea: IDEA, section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      // `no_fit` is the one refusal that opens seat authoring; `closest: null` keeps the
      // nearest-template path out of it.
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a creature that cannot be found while it lies still' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      return JSON.stringify({ traits: [{ clause: 'hides in the mud', name: ROW, trigger: 'While the hound is motionless', effect, imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 1, passive_effect: 'defense' }] });
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
  mechanics: [], archetype: 'brute', concept: CONCEPT, userConcept: CONCEPT, cr: 1,
  path: { path: 'homebrew', print_body: null, relation: null, class: null },
}, stub(effect));

const rowsOf = (m) => Object.values(m.sections ?? {}).flat();
const textOf = (m) => rowsOf(m).map((e) => String(e.text ?? '')).join('\n');

/** the authored row, asserted onto the sheet before anything is asserted about its text */
const authoredRow = (m) => {
  const row = rowsOf(m).find((e) => String(e.name ?? '').replace(/ \(.*\)$/, '') === ROW);
  expect(row?.text).toBeTruthy();
  return String(row.text);
};

describe('a DC token renders its letters once', () => {
  test('"a DC of {dc}" does not ship as "a DC of DC 13"', async () => {
    const m = await build('a creature notices it only by succeeding on a Wisdom (Perception) check against a DC of {dc}');
    const text = authoredRow(m);
    expect(text).toMatch(/a DC of \d+/);
    expect(text).not.toMatch(/DC of DC/);
    expect(textOf(m)).not.toMatch(/DC\s+DC/);
  }, 30000);

  test('a prose saving throw is REFUSED, not shipped with the hole in it', async () => {
    // not a token bug: a trait may not write a saving throw as prose at all ("a trait is not a
    // save — the save form takes stat, target and effect as fields"), so the seat writes nothing
    // and the nearest template stands in. The point here is that the refusal is what leaves no
    // token behind — which is exactly what the old version of this test could not tell apart from
    // a row that shipped filled.
    const m = await build('a creature must succeed on a {dc} Wisdom saving throw to notice it');
    expect(rowsOf(m).map((e) => e.name)).not.toContain(ROW);
    expect(textOf(m)).not.toMatch(/\{dc\}/);
    expect(textOf(m)).not.toMatch(/DC\s+DC/);
  }, 30000);
});

describe('a damage token is filled or the row is refused, never left as a hole', () => {
  test('"gains {dmg} Temporary Hit Points" keeps its number', async () => {
    const m = await build('the hound gains {dmg} Temporary Hit Points whenever it ends its turn in mud');
    const text = authoredRow(m);
    // the promise is readable: a number stands in front of it
    expect(text).toMatch(/\d+(?:\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\))?\s+Temporary Hit Points/);
    expect(text).not.toMatch(/gains Temporary Hit Points/);
    expect(text).not.toMatch(/\{dmg\}/);
  }, 30000);

  test('"an extra {dmg} Fire damage" in the same row keeps its number too', async () => {
    const m = await build('the hound gains {dmg} Temporary Hit Points, and its bite deals an extra {dmg} Fire damage');
    const text = authoredRow(m);
    expect(text).not.toMatch(/gains Temporary Hit Points/);
    expect(text).not.toMatch(/extra Fire damage\b/);   // the second token is not dropped either
    expect(text).not.toMatch(/\{dmg\}/);
    expect(text.match(/\d+\s*\(\d+d\d+\)/g) ?? []).toHaveLength(2); // BOTH were priced
  }, 30000);

  test('a {dmg} standing where damage IS dealt keeps its number', async () => {
    const m = await build('it takes {dmg} Fire damage when struck');
    const text = authoredRow(m);
    expect(text).toMatch(/\d+\s*\(\d+d\d+\)\s+Fire damage/);
    expect(text).not.toMatch(/\{dmg\}/);
  }, 30000);

  test('a {dmg} written as a bonus is REFUSED, not shipped as "a + bonus"', async () => {
    // this quantity the engine cannot price, so the whole row goes rather than ship a hole
    const m = await build('an ally within 5 feet gains a +{dmg} bonus to its AC until the start of the hound\'s next turn');
    expect(rowsOf(m).map((e) => e.name)).not.toContain(ROW);
    const all = textOf(m);
    expect(all).not.toMatch(/\{dmg\}/);
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
