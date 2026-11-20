/**
 * A CONDITION ZONE NAMES ITS CONDITION, AND DEAFENED LEAVES THE FAMILY
 * (fault 4, owner 2026-11-20).
 *
 * Two sheets of the forty shipped an aura whose condition had nothing to do with the creature, and
 * both traces said why in as many words — `[shape fit, no verb match]`:
 *
 *   s01 Dire Wolf, "with a frost-rimed hide"  -> Rime-Stiffened Aura: save or Deafened
 *   s14 Glacier Heart, "a wake of killing cold" -> Rime Lattice: save or Poisoned
 *
 * The shape fit and the condition was whatever the template happened to hold. Two rulings: Deafened
 * is never a row's only effect, and a condition zone's condition IS its only effect, so Deafened
 * leaves the family; and the candidate is offered only when the idea's own words name the condition
 * it would impose.
 *
 * The idea texts below are copied from baseline-2026-11-20 as the model wrote them, not paraphrased
 * — a gate about words has to be tested on the real words.
 */
import { composedCandidates, namesTheCondition } from '../templates.mjs';

const trait = (idea) => ({ family: 'zone', section: 'trait', effect: 'condition', idea });

// verbatim from the recording's traces
const DIRE_WOLF = 'The frost-rimed hide sheds a creeping rime: at the start of the dire wolf\'s turn, each creature within 5 feet of it that has taken Cold damage since its last turn must succeed on a Constitution saving throw or be unable to take Reactions until the start of its next turn as the cold stiffens its limbs.';
const HYDRA = 'Each neck it loses does not regrow; instead the wound seals into a smoking stump that streams stinging vapor, so the more heads it sheds the thicker the choking haze becomes around the hydra.';
const ARCHON = 'A buzzing cloud of plague-flies orbits the archon and follows it into battle, filling a 5-foot Emanation. At the start of each of its turns, each creature of the archon\'s choice in that cloud must succeed on a Constitution saving throw or have the Poisoned condition until the start of its next turn.';

describe('Deafened is not in the family', () => {
  test('an idea that names BOTH gets the other one and never Deafened', () => {
    const ids = composedCandidates(trait('a deafening, poisonous reek that leaves them deafened and poisoned')).map((t) => t.id);
    expect(ids).toEqual(['composed:zone:condition:poisoned']);        // the family still composes
    expect(ids.join(' ')).not.toMatch(/deafened/i);
  });
});

describe('the idea has to name the condition', () => {
  test('THE DIRE WOLF: its idea names no condition, so no condition zone is offered', () => {
    expect(namesTheCondition(trait(DIRE_WOLF), 'Deafened')).toBe(false);
    expect(namesTheCondition(trait(DIRE_WOLF), 'Poisoned')).toBe(false);
    expect(composedCandidates(trait(DIRE_WOLF)).map((t) => t.id)).toEqual([]);
  });

  test('THE PLAGUE-ARCHON: its idea says "Poisoned", so the Poisoned zone is offered', () => {
    expect(namesTheCondition(trait(ARCHON), 'Poisoned')).toBe(true);
    expect(composedCandidates(trait(ARCHON)).map((t) => t.id)).toEqual(['composed:zone:condition:poisoned']);
  });

  test('THE HYDRA: its idea says "stinging" and "choking" and names no condition, so none is offered', () => {
    // Reported to the owner rather than worked around: he expected this one to keep landing.
    // Widening the condition words to catch "choking" is the thing I am not allowed to do.
    expect(namesTheCondition(trait(HYDRA), 'Poisoned')).toBe(false);
    expect(composedCandidates(trait(HYDRA)).map((t) => t.id)).toEqual([]);
  });

  test('a form of the word counts, not only the word', () => {
    for (const t of ['the air poisons everything near it', 'a poisonous reek', 'its poison fills the room']) {
      expect([t, namesTheCondition(trait(t), 'Poisoned')]).toEqual([t, true]);
    }
    for (const t of ['a frightening wail', 'it terrifies anyone close', 'creatures are frightened of it']) {
      expect([t, namesTheCondition(trait(t), 'Frightened')]).toEqual([t, true]);
    }
  });

  test('and the damage and terrain payloads are untouched — the gate is only about a condition', () => {
    const dmg = composedCandidates({ family: 'zone', section: 'trait', effect: 'damage', idea: DIRE_WOLF });
    expect(dmg.map((t) => t.id)).toContain('composed:zone:damage');
  });
});
