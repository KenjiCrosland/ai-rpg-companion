// AN AUTHORED ROW ANSWERS THE SAME QUESTIONS A TEMPLATE DOES (critic gate 2, 2026-11-08).
// 1d stopped the budget evicting GM-asked rows; nothing then re-read them with a
// template's rigor, so the protected rows were both the best and the worst on the forty.
//
// Each predicate here was SHAPED BY PRINT, and the obvious version of each was wrong:
//  - "never key on a state word" fails print twice (Bearded Devil, Horned Devil) because
//    print DEFINES the state in the row, then references it.
//  - "a sheet that forbids healing may not heal" flags print's Aboleth, whose Mucus Cloud
//    forbids THE TARGET's healing with a pronoun ("...and it can't regain Hit Points").
// Both read 0 over print's 329 blocks and catch the critic's #29 on the forty.
import { undefinedStateIn, contradictsSelfHeal, selfHealForbiddenBy, lintSheet } from '../sheet-lints.mjs';
import PRINT from '@/data/srd52-monsters.json';

const trait = (name, text) => ({ sec: 'Traits', r: { name, text } });

describe('a state word is a rule only if the row defines it', () => {
  test("#29's Rotting Toll: 'wounded' with no threshold is refused", () => {
    expect(undefinedStateIn('When a wounded creature starts its turn within 5 feet of the swarm, the creature takes 24 (7d6) Necrotic damage.')).toBe('wounded');
  });

  test("print's own shape passes: the row defines the state, then references it", () => {
    // Bearded Devil, Infernal Glaive — verbatim shape
    expect(undefinedStateIn('The target receives an infernal wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns.')).toBeNull();
  });

  test('a game term the GM already tracks passes', () => {
    expect(undefinedStateIn('While Bloodied, the drake deals an extra 7 (2d6) Thunder damage.')).toBeNull();
    expect(undefinedStateIn('When a creature drops to 0 Hit Points within 10 feet, the lich regains 9 (2d8) Hit Points.')).toBeNull();
  });

  test('a capitalised one is a NAME, not a rule key', () => {
    // #29's Multiattack cites the row "Peal for the Dying" and was flagged by a first cut
    expect(undefinedStateIn('The swarm makes two Bell attacks. It can replace one attack with a use of Peal for the Dying.')).toBeNull();
  });
});

describe('a row may not contradict a trait on its own sheet', () => {
  const swarmTrait = trait('Swarm', "The swarm can occupy another creature's space and vice versa, and the swarm can't regain Hit Points or gain Temporary Hit Points.");

  test("#29: the swarm heals two lines under a trait saying it can't", () => {
    const rows = [swarmTrait];
    const f = contradictsSelfHeal('When a wounded creature starts its turn within 5 feet of the swarm, the creature takes 24 (7d6) Necrotic damage, and the swarm regains Hit Points equal to the damage dealt.', rows);
    expect(f?.name).toBe('Swarm');
  });

  test('a forbiddance aimed at a TARGET is not the creature forbidding itself', () => {
    // the Pit Fiend's Bite riders the target; a first cut read this as the sheet's own rule
    const rows = [trait('Bite', 'If the target is a creature, it must make a saving throw. While Poisoned, the target can\'t regain Hit Points and takes 21 (6d6) Poison damage.')];
    expect(selfHealForbiddenBy(rows)).toBeNull();
    expect(contradictsSelfHeal('The fiend regains 14 (4d6) Hit Points.', rows)).toBeNull();
  });

  test('healing a TARGET is not the creature healing itself', () => {
    expect(contradictsSelfHeal('The target regains 10 (3d6) Hit Points.', [swarmTrait])).toBeNull();
  });
});

describe('both read zero over print', () => {
  // the guard that stops either rule being widened later: print is the calibration
  // authority, and a rule print fails is a rule we do not have
  const FLAT = ['abilities', 'actions', 'reactions', 'legendary_actions', 'bonus_actions'];
  test('no print block trips undefined-state-word or contradicts-own-trait', () => {
    const offenders = [];
    for (const m of PRINT) {
      const hits = lintSheet(m).filter((h) => h.rule === 'undefined-state-word' || h.rule === 'contradicts-own-trait');
      if (hits.length) offenders.push(`${m.name}: ${hits.map((h) => h.rule).join(', ')}`);
    }
    expect(offenders).toEqual([]);
  });
  test('and print rows are actually being read (the zero is not an empty scan)', () => {
    const n = PRINT.reduce((acc, m) => acc + [...Object.values(m.sections ?? {}).flat(), ...FLAT.flatMap((k) => m[k] ?? [])].length, 0);
    expect(n).toBeGreaterThan(1200);
  });
});
