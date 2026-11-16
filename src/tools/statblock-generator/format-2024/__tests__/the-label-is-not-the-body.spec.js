/**
 * THE ROLE LABEL IS NOT THE BODY'S FAMILY (2026-11-13, Fable 5.2's round-2 review).
 *
 * `monster.archetype` is the role the USER picked; `generation.archetype` is the
 * family the route actually landed on. They were one field doing both jobs and
 * agreed only by accident — every menu role used to resolve to its own family.
 *
 * Once artillery could reach `skirmisher-hurler`, Big Bob saved as label "artillery"
 * on a skirmisher body. Fixing the label alone moved the bug rather than closing it:
 * every engine reader of `.archetype` then compared him to an ARTILLERY chassis —
 * re-rolling one of his rows drew from a shelf his body does not stand on, and the
 * edit-time band hints measured him against the wrong card.
 *
 * Display reads the label. Mechanics read `bodyFamilyOf`. This is the data test the
 * review asked for.
 */
import { bodyFamilyOf } from '@/tools/statblock-generator/format-2024/generate.mjs';

const bigBob = {
  name: 'Big Bob',
  cr: 9,
  archetype: 'artillery', // what the user picked in the menu
  archetype_source: 'user',
  generation: { path: 'reskin', donor: 'skirmisher-8-hurler', archetype: 'skirmisher' },
};

describe('the label is not the body', () => {
  test('a sheet labelled artillery on a routed skirmisher body reads as a skirmisher for mechanics', () => {
    expect(bigBob.archetype).toBe('artillery'); // the dropdown still shows the pick
    expect(bodyFamilyOf(bigBob)).toBe('skirmisher'); // the shelf, the chassis and the band do not
  });

  test('with no routed family recorded, the label stands in', () => {
    expect(bodyFamilyOf({ archetype: 'brute' })).toBe('brute');
    expect(bodyFamilyOf({ archetype: 'brute', generation: {} })).toBe('brute');
  });

  test('"balanced" is not a family, from either field', () => {
    expect(bodyFamilyOf({ archetype: 'balanced' })).toBeNull();
    expect(bodyFamilyOf({ archetype: 'balanced', generation: { archetype: 'balanced' } })).toBeNull();
    expect(bodyFamilyOf({ archetype: 'balanced', generation: { archetype: 'lurker' } })).toBe('lurker');
  });

  test('a hand-made sheet with neither field yields null rather than guessing', () => {
    expect(bodyFamilyOf({})).toBeNull();
    expect(bodyFamilyOf(null)).toBeNull();
  });

  test('when the pick and the body agree, nothing changes', () => {
    expect(bodyFamilyOf({ archetype: 'lurker', generation: { archetype: 'lurker' } })).toBe('lurker');
  });
});
