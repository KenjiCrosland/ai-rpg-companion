// WHAT A NAME PROMISES, ASKED ONCE (metadata queue #2, 2026-10-15).
//
// One question had two tables: `CONDITION_CLAIMS` in generate.mjs fed the repair
// call and knew 7 conditions; `NAME_MECHANIC` in checker.mjs FAILED the finished
// sheet and knew 10 claims the engine never asked about. So the gate refused
// things the call was never given a chance to fix, and a late audit rename was
// vetted for element claims but not these at all — which is how "Lance Charge"
// and "Poisoned Blade" reached live canary sheets.
import { NAME_CLAIMS_MECHANIC, mechanicUnkept } from '../name-claims.mjs';
import { reskinDefects, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

describe('the merged table keeps both halves', () => {
  test("the engine's conditions survived the merge — the Petrifying Patient class", () => {
    // the first cut of this merge replaced one table with the other and a pin
    // from 2026-09-08 caught it: the checker's table has no petrify entry
    for (const w of ['Petrifying Stare', 'Deafening Roar', 'Charming Gaze', 'Restraining Web']) {
      expect(mechanicUnkept(w, 'deals 10 (3d6) damage')).toBeTruthy();
    }
  });

  test("the checker's claims survived too — the ones the engine never vetted", () => {
    expect(mechanicUnkept('Lance Charge', 'reach 10 ft. 22 (4d8 + 4) Piercing damage')).toBe('movement');
    expect(mechanicUnkept('Poisoned Blade', '17 (4d6 + 3) Piercing damage')).toBe('Poison');
    expect(mechanicUnkept('Shoving Slam', '14 (2d8 + 5) Bludgeoning damage')).toBeTruthy();
  });

  test('a name whose text keeps its promise passes', () => {
    expect(mechanicUnkept('Dreadful Glare', 'the target has the Frightened condition')).toBeNull();
    expect(mechanicUnkept('Crushing Tail', 'the target has the Prone condition')).toBeNull();
    expect(mechanicUnkept('Lance Charge', 'the creature moves up to half its Speed, then attacks')).toBeNull();
    expect(mechanicUnkept('Petrifying Stare', 'the target has the Petrified condition')).toBeNull();
  });

  test('a name that claims nothing is never a defect', () => {
    for (const n of ['Bite', 'Barbed Spear', 'Thunder Wall', 'Tide Surge']) {
      expect(mechanicUnkept(n, '17 (4d6 + 3) Piercing damage')).toBeNull();
    }
  });

  test('every entry is a triple the three readers can use', () => {
    expect(NAME_CLAIMS_MECHANIC.length).toBeGreaterThanOrEqual(14);
    for (const [nameRe, textRe, what] of NAME_CLAIMS_MECHANIC) {
      expect(nameRe).toBeInstanceOf(RegExp);
      expect(textRe).toBeInstanceOf(RegExp);
      expect(typeof what).toBe('string');
    }
  });
});

describe("the repair call is told what the gate will refuse", () => {
  test('a rename promising movement reaches the engine\'s defect list, not just the checker', () => {
    const scaled = scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = i === 0 ? 'Lance Charge' : `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const answer = { name: 'Test', type: 'Humanoid', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Piercing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' };
    const out = reskinDefects(scaled, answer, {}).join(' ');
    expect(out).toMatch(/"Lance Charge" promises movement but the row never delivers it/);
  });
});
