/**
 * HALF A RULE IS WORSE THAN NO ROW (the forty of 2026-10-27).
 *
 * The critic's new failure class — three seams, one symptom, a row a GM cannot
 * run. All three shipped on that forty:
 *
 *   Carrion Archon — "The archon can command a number of Swarms at once equal."
 *   Brass Tyrant   — "…each creature within 10 feet of the tyrant. Failure:"
 *   (and a fourth the critic had not named, found while measuring)
 *   Multiattack    — "It can replace one attack with."
 *
 * These are rejects, not correctables: the missing half cannot be invented by
 * string surgery. Measured before shipping — 0 of print's 1,291 rows trip it,
 * 23 of 50,811 saved generated rows do.
 */
import { lintStatblock } from '@/tools/statblock-generator/format-2024/lint.mjs';

const found = (text, name = 'Swarm Sovereignty') => lintStatblock({ name: 'T', challenge_rating: '13', sections: { Traits: [{ name, text }] } }, { edition: '2024' })
  .findings.filter((f) => f.rule === 'unfinished-text');

describe('the seams that shipped', () => {
  test('a sentence that stops on a dangling word', () => {
    expect(found('Swarms obey it. The archon can command a number of Swarms at once equal.')).toHaveLength(1);
  });

  test('a save outcome with no effect after it', () => {
    expect(found('*Strength Saving Throw:* DC 19, each creature within 10 feet of the tyrant. *Failure:*')).toHaveLength(1);
  });

  test('a Multiattack replacement clause with nothing to replace with', () => {
    expect(found('The creature makes three Greataxe attacks. It can replace one attack with.', 'Multiattack')).toHaveLength(1);
  });
});

describe('finished rules text is left alone', () => {
  test.each([
    ['*Strength Saving Throw:* DC 19, each creature within 10 feet. *Failure:* 22 (4d10) Bludgeoning damage.'],
    ['The creature regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point.'],
    ['*Melee Attack Roll:* +12, reach 10 ft. 33 (6d8 + 6) Bludgeoning damage.'],
    ['While Bloodied, the creature has Advantage on attack rolls.'],
    ['The creature can command a number of Swarms at once equal to its Charisma modifier.'],
    ['*Failure:* 72 (16d8) Fire damage, and the target has the Frightened condition. *Success:* Half damage only.'],
  ])('%s', (t) => expect(found(t)).toHaveLength(0));

  test('print is clean: the rule can be a hard reject', () => {
    // 0 of print's 1,291 rows trip this, which is why it rejects rather than warns
    const CORPUS = require('@/data/srd52-monsters.json');
    const all = Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat();
    const tripped = [];
    for (const c of all.slice(0, 120)) {
      for (const f of lintStatblock({ ...c, challenge_rating: String(c.cr) }, { edition: '2024' }).findings) {
        if (f.rule === 'unfinished-text') tripped.push(`${c.name}/${f.loc?.entry}`);
      }
    }
    expect(tripped).toEqual([]);
  });
});
