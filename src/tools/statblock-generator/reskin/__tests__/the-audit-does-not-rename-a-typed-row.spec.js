/**
 * THE AUDIT DOES NOT RENAME A ROW WRITTEN FOR THE GM'S WORDS (fix 1, 2026-11-18).
 *
 * "An air elemental that carries stolen voices" (s05). The seat delivered it — the trace reads
 * `seat takes its clause: "Chorus of the Drowned" is HANDED "carries stolen voices"` — and the
 * audit then returned, at medium confidence, "The entry is authored for this air elemental yet
 * invokes drowned voices it has no fiction for", with `"rename": "Howling Gust"`. The rename
 * landed, and nothing on the sheet was a voice any more.
 *
 * The audit is never shown what the GM typed: "stolen voices" appears nowhere in its prompt for
 * that sheet, so it judged the fiction blind and removed the ask.
 *
 * THE WORD GUARD COULD NOT CATCH IT, and the first two tests below are why: `renameDropsAGmWord`
 * compares WORDS, the clause says "voices" and the name says "Chorus", so no GM word is lost by
 * the rename and the guard passes it. The binding is the thing to read instead — a row carrying a
 * `clauseId` was written for a clause the GM typed, and its NAME is part of that answer.
 *
 * Counted on the forty: 12 audit renames, 2 on a row that had been handed a typed clause, and both
 * took the GM's word off the sheet — this one and the marsh witch's Fen-Whisper Hex -> Fen-Whisper
 * Blast.
 *
 * The rename loop itself is inline in `generateReskin` and cannot be called, so what is asserted
 * here is the DECISION it now makes: one named predicate, read by this pass and by print canon.
 */
import { writtenForATypedClause, printCanonExempt } from '../generate.mjs';
import { renameDropsAGmWord } from '../typed-fixes.mjs';

/** s05's row, as the seat wrote it */
const chorus = {
  name: 'Chorus of the Drowned',
  text: '*Wisdom Saving Throw*: DC 14, each creature in a 30-foot Emanation originating from the elemental. *Failure:* 14 (4d6) Psychic damage.',
  clauseId: 'cl_voices', clause: 'carries stolen voices', authoredSeat: true,
};
const gmWords = [...'carries stolen voices'.match(/[a-z]{4,}/g)];

describe('the audit does not rename a row written for the GM\'s words', () => {
  test('THE OLD GUARD PASSES THE RENAME — this is the hole, stated as a fact', () => {
    expect(renameDropsAGmWord(chorus, 'Chorus of the Drowned', 'Howling Gust', gmWords)).toEqual([]);
  });

  test('it does still catch a rename that drops a word the name carried', () => {
    const stumps = { name: 'Smoldering Stumps', text: 'x', clause: 'whose stumps smoke instead of regrowing' };
    const words = [...'whose stumps smoke instead of regrowing'.match(/[a-z]{4,}/g)];
    expect(renameDropsAGmWord(stumps, 'Smoldering Stumps', 'Searing Body', words)).toContain('stumps');
  });

  test('the binding is what holds the rename, and the row is present to be judged', () => {
    expect(chorus.clauseId).toBe('cl_voices');          // the subject is bound
    expect(writtenForATypedClause(chorus)).toBe(true);
  });

  test('a row with no binding is renamed as before', () => {
    expect(writtenForATypedClause({ name: 'Drowning Song', text: 'x' })).toBe(false);
    expect(writtenForATypedClause({ name: 'Slam', text: 'x', print: true })).toBe(false);
    expect(writtenForATypedClause(null)).toBe(false);
    expect(writtenForATypedClause(undefined)).toBe(false);
  });

  // THE NARROWING FROM THE EARLIER CORRECTION STANDS: a seat row's `clause` can be the model's own
  // idea rather than the GM's words (the Brass Tyrant's "Molten Seam" carried a clause matching no
  // clause on the sheet), so only the id counts.
  test('a seat row whose clause is the model\'s own idea is NOT exempt', () => {
    expect(writtenForATypedClause({ name: 'Molten Seam', clause: 'The Brass Tyrant slams its molten fist into the ground, ', authoredSeat: true })).toBe(false);
  });

  test('both passes read ONE predicate, not two copies of it', () => {
    expect(printCanonExempt).toBe(writtenForATypedClause);
  });
});
