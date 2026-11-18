/**
 * A PROPER NAME KEEPS ITS CAPITAL (item 1.3, 2026-11-18).
 *
 * Krennik Skullstandard was the only sheet of the forty whose inline is a PERSON rather than a kind,
 * and his own name was lowercased five times on his own card:
 *
 *   2024  While mounted and wielding the standard, krennik's Iron-Shod Standard attacks …
 *   2014  … and when krennik moves at least 20 feet …; krennik cannot use this reach …
 *   2014  Hit: 12 (2d8 + 3) bludgeoning damage. If krennik moved at least 20 feet …
 *
 * TWO CAUSES, one per printing.
 *
 * 1. `low()` lowercases the first word of a rendered clause so it can sit after "While …, ", and
 *    keeps a word that is one of the creature's own nouns. Its match takes the apostrophe with the
 *    word, so the lookup asked for "krennik's" while the kept set held "krennik". The key is
 *    normalised; the list is not widened.
 *
 * 2. The 2014 conversion call lowercased the name in the prose it rewrote. The engine restores it
 *    afterwards, which is the rule this file already follows for a lost bound and a lost structure.
 *
 * A NAME IS NOT A KIND, and the engine has already decided which: `inline` is "Krennik" for a
 * person and "the drowned choir" for a kind, and print lowercases a kind everywhere ("the dire
 * wolf"). My first attempt read the case off the 2024 source per word instead of asking, and it
 * capitalised one word of a kind — the Drowned Choir's hymn came back "each creature within 60 feet
 * of the drowned Choir", which strict replay caught on s10. That case is the fourth test.
 */
import { renderForm } from '../forms.mjs';
import { keepNameCase } from '@/tools/statblock-generator/format-2024/generate.mjs';

describe('a proper name keeps its capital', () => {
  // 1. THE RENDER
  test("a clause opening with the creature's possessive keeps the capital", () => {
    const text = renderForm({
      kind: 'trait',
      trigger: 'mounted and wielding the standard',
      effect: "Krennik's Iron-Shod Standard attacks have a reach of 10 feet",
    }, '2024', { properNouns: ['Krennik Skullstandard', '', 'Krennik'] });
    expect(text).toContain("Krennik's Iron-Shod Standard");
    expect(text).not.toContain("krennik's");
  });

  test('a clause opening with the bare name still keeps it, and an ordinary word still lowercases', () => {
    const own = { properNouns: ['Krennik Skullstandard', '', 'Krennik'] };
    expect(renderForm({ kind: 'trait', trigger: 'mounted', effect: 'Krennik ignores Difficult Terrain' }, '2024', own)).toContain('Krennik ignores');
    // the whole point of `low`: a sentence that becomes a clause reads as one
    expect(renderForm({ kind: 'trait', trigger: 'mounted', effect: 'The rider ignores Difficult Terrain' }, '2024', own)).toContain('the rider ignores');
  });

  test('a creature whose nouns do not include the word is unaffected', () => {
    const text = renderForm({ kind: 'trait', trigger: 'bloodied', effect: "Krennik's rage doubles" }, '2024', { properNouns: ['Grask Ironjaw', '', 'Grask'] });
    expect(text).toContain("krennik's rage"); // not this creature's name, so it lowercases as before
  });

  // 2. THE CONVERSION
  test('a KIND is never recased — the Drowned Choir regression', () => {
    const src = 'Each creature within 60 feet of the Drowned Choir must succeed on a saving throw.';
    const out = 'Each creature within 60 feet of the drowned choir must succeed on a DC 15 Constitution saving throw or be deafened until the end of its next turn.';
    expect(keepNameCase(src, out, 'the drowned choir')).toBe(out);
    expect(keepNameCase(src, out, 'the drowned choir')).not.toContain('drowned Choir');
  });

  test("a PERSON's name is restored wherever the conversion lowercased it", () => {
    const src = 'While mounted, Krennik\'s attacks have reach 10 feet, and when Krennik moves 20 feet the attack deals extra damage; Krennik cannot use this while unmounted.';
    const out = 'While mounted, krennik\'s attacks have reach 10 feet, and when krennik moves 20 feet the attack deals extra damage; krennik cannot use this while unmounted.';
    const fixed = keepNameCase(src, out, 'Krennik');
    expect(fixed).not.toMatch(/(?<![A-Za-z])krennik/);
    expect((fixed.match(/Krennik/g) ?? [])).toHaveLength(3);
    expect(fixed).toContain("Krennik's attacks");  // the possessive too
  });

  test('a row that never names the creature is returned untouched', () => {
    const out = 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.';
    expect(keepNameCase('*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.', out, 'Krennik')).toBe(out);
  });

  test('a word that the source does not capitalise is not promoted', () => {
    // the source says "the standard" lowercase; "Standard" is a Name word, and it stays lowercase
    const src = 'While mounted and wielding the standard, Krennik strikes.';
    const out = 'While mounted and wielding the standard, krennik strikes.';
    const fixed = keepNameCase(src, out, 'Krennik Skullstandard');
    expect(fixed).toBe('While mounted and wielding the standard, Krennik strikes.');
  });

  test('no inline, an empty inline or no answer is handled without throwing', () => {
    expect(keepNameCase('x', 'y', null)).toBe('y');
    expect(keepNameCase('x', 'y', '')).toBe('y');
    expect(keepNameCase('x', '', 'Krennik')).toBe('');
    expect(keepNameCase('Krennik', undefined, 'Krennik')).toBeUndefined();
  });
});
