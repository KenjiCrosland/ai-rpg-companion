/**
 * ONLY THE MAGE IS "THE MAGE" (fix 4's third leak, repaired in the data 2026-11-14).
 *
 * The Archmage's Misty Step row was word for word the Mage's, name included — five of its
 * six rows say "the archmage" and that one said "the mage". The reskin engine swaps print's
 * noun for the sheet's creature, reading the nouns of the body's NAME, and "mage" is not a
 * word of "Archmage" (only a trailing substring), so Lord Vexmoor shipped "The mage casts
 * Misty Step" on a card with no mage on it.
 *
 * `scripts/repair-srd-archmage-mage.py` corrects it. That is a correction to the PUBLISHED
 * SRD, not to our parse: both independently-vendored markdown conversions under
 * scripts/srd-source/ already carry "The mage", as does Roll20's 2024 Archmage.
 *
 * THIS TEST IS DELIBERATELY NARROW. A general "does a block name itself consistently?"
 * detector is the word rule the repair exists to avoid — it would have to tell a
 * self-reference from a mention of something else, and print legitimately writes "the
 * armor", "the limb", "the specter" and "the ooze" about other things. One noun, one block.
 */
import PRINT from '@/data/srd52-monsters.json';

const BLOCKS = Array.isArray(PRINT) ? PRINT : Object.values(PRINT);
const rowsOf = (m) => Object.entries(m?.sections ?? {}).flatMap(([section, rs]) => (rs ?? []).map((r) => ({ section, ...r })));

describe('no print block calls itself the mage', () => {
  test('the corpus is loaded and has the two blocks this is about', () => {
    expect(BLOCKS.length).toBeGreaterThan(300);
    expect(BLOCKS.filter((m) => m?.name === 'Archmage' || m?.name === 'Mage')).toHaveLength(2);
  });

  test('"the mage" appears only inside the Mage\'s own block', () => {
    const offenders = BLOCKS.filter((m) => m?.name !== 'Mage')
      .flatMap((m) => rowsOf(m).filter((r) => /\bthe mage\b/i.test(String(r.text ?? ''))).map((r) => `${m.name} / ${r.section} / ${r.name}`));
    expect(offenders).toEqual([]);
  });

  test("the Archmage's Misty Step is its own row, and the Mage's is untouched", () => {
    const row = (name) => rowsOf(BLOCKS.find((m) => m?.name === name)).find((r) => r.name === 'Misty Step (3/Day)');
    expect(row('Archmage').text).toBe('The archmage casts *Misty Step*, using the same spellcasting ability as Spellcasting.');
    expect(row('Mage').text).toBe('The mage casts *Misty Step*, using the same spellcasting ability as Spellcasting.');
  });
});
