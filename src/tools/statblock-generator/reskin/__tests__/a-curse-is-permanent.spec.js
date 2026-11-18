/**
 * A CURSE IS PERMANENT (owner's ruling R2, 2026-11-18).
 *
 * `curse-debt` used to read "The target is cursed until the end of the creature's next turn. The
 * first time the cursed target deals damage to any creature before then, it takes {burst} damage."
 * That is a condition with a timer wearing a curse's name. The owner: "curse is a permanent effect.
 * At lower levels it can even be a joke, like CR 1/2 it's a minor inconvenience, but still needs a
 * restoration spell. Permanent speed reduction by 5 feet is an example of a moderate curse."
 *
 * PRINT AGREES, and the form below is print's own: the Mummy and the Mummy Lord write "it is
 * cursed. While cursed, the target can't regain Hit Points"; the Rakshasa "While cursed, the target
 * gains no benefit from finishing a Short or Long Rest"; the Incubus "gains no benefit from
 * finishing Short Rests". The severe and moderate effects in `CURSE_TIERS` are those sentences. The
 * two MINOR ones are the handoff author's wording of "a minor inconvenience" and are flagged in the
 * report for the owner to change.
 *
 * DELIVERY: a rider on damage, never a row whose only effect is the curse.
 */
import { drawLibraryRow, curseEffectFor, CURSE_TIERS, LIBRARY_SEEDS } from '../library.mjs';

const draw = (cr, name = 'Mirewitch Sable') => drawLibraryRow(
  { cr, dc: 10 + Math.round(Number(cr) / 2), pb: 2, per_hit: Math.max(4, Math.round(Number(cr) * 2.2)), sections: {} },
  { archetype: 'caster', name, shapeKey: 'curse-debt', imposed: [], cr },
);

describe('a curse is permanent', () => {
  test('the seed still exists under its own key, with its own keys', () => {
    const seed = LIBRARY_SEEDS.find((s) => s.key === 'curse-debt');
    expect(seed).toBeDefined();
    expect(seed.keys).toEqual(['curse', 'debt', 'rebuke', 'price']);
    expect(seed.text).not.toMatch(/until the end of/);     // the timer is gone
  });

  for (const [cr, tier] of [[0.5, 'minor'], [3, 'moderate'], [7, 'severe']]) {
    test(`at CR ${cr} the row deals damage, curses with no duration, and takes a ${tier} effect`, () => {
      const row = draw(cr)?.row;
      expect(row).toBeDefined();                            // the subject is present
      expect(row.text).toMatch(/\d+ \(\d+d\d+(?: \+ \d+)?\) \w+ damage/);   // a rider on DAMAGE
      expect(row.text).toMatch(/and the target is cursed\. While cursed, /); // print's sentence
      expect(row.text).not.toMatch(/\buntil\b/i);           // no duration, which is the ruling
      expect(row.text).not.toMatch(/for \d+ (?:hour|minute|day)/i);
      const { effects } = CURSE_TIERS.find((t) => t.tier === tier);
      expect(effects.some((e) => row.text.includes(e))).toBe(true);
      expect(curseEffectFor(cr, 'Mirewitch Sable').tier).toBe(tier);
    });
  }

  test('the tiers are a closed ladder that covers every CR with no gap', () => {
    expect(CURSE_TIERS.map((t) => t.tier)).toEqual(['minor', 'moderate', 'severe']);
    for (const cr of [0, 0.125, 0.25, 0.5, 1, 2, 4, 5, 9, 17, 24, 30]) {
      const { tier, effect } = curseEffectFor(cr, 'x');
      expect(['minor', 'moderate', 'severe']).toContain(tier);
      expect(typeof effect).toBe('string');
      expect(effect.length).toBeGreaterThan(10);
    }
    expect(curseEffectFor(1, 'x').tier).toBe('minor');      // the boundaries, named
    expect(curseEffectFor(2, 'x').tier).toBe('moderate');
    expect(curseEffectFor(4, 'x').tier).toBe('moderate');
    expect(curseEffectFor(5, 'x').tier).toBe('severe');
  });

  test('no tier effect carries a duration — a curse that ends is not a curse', () => {
    for (const t of CURSE_TIERS) for (const e of t.effects) {
      expect(e).not.toMatch(/\buntil\b|\bfor \d+|\bnext turn\b/i);
    }
  });

  test('the same creature always curses the same way, and the pick is the sheet\'s own seed', () => {
    expect(draw(7, 'Mirewitch Sable').row.text).toBe(draw(7, 'Mirewitch Sable').row.text);
    const names = ['Mirewitch Sable', 'Grask Ironjaw', 'Ilvareth Dusksong', 'Krennik', 'Halric', 'Meshrin'];
    const picked = new Set(names.map((n) => curseEffectFor(7, n).effect));
    expect(picked.size).toBeGreaterThan(1);                 // both of the tier's effects get used
  });

  test("the severe and moderate wordings are print's own", () => {
    const severe = CURSE_TIERS.find((t) => t.tier === 'severe').effects;
    expect(severe).toContain("the target can't regain Hit Points");                       // Mummy
    expect(severe).toContain('the target gains no benefit from finishing a Short or Long Rest'); // Rakshasa
    expect(CURSE_TIERS.find((t) => t.tier === 'moderate').effects)
      .toContain('the target gains no benefit from finishing Short Rests');               // Incubus
  });
});

/**
 * A SAVE THAT NAMES NO EFFECT IS REFUSED, NOT FILLED (item 2.2, 2026-11-18) — the step before the
 * curse can land. The marsh witch's seat answered a save with damage:false, condition:null,
 * movement:null, because the form has no field for the "lasting curse mark" her idea wanted. The
 * parser used to turn that into damage, and the sheet got "Fen-Whisper Hex. 19 (3d12) Bludgeoning
 * damage" — which the audit then renamed Fen-Whisper Blast, because a hex that only bludgeons is
 * not a hex.
 */
describe('a save that names no effect is refused, not filled', () => {
  const { parseAuthorResponse } = require('../author.mjs');
  const hex = { clause: 'a lasting curse mark', name: 'Fen-Whisper Hex', stat: 'Charisma', target: 'one creature within 60 feet', damage: false, type: null, condition: null, movement: null, success: 'none' };
  const parse = (over) => parseAuthorResponse(JSON.stringify({ saves: [{ ...hex, ...over }] }), {});

  test('the empty save writes no row, and the reason comes back for the second ask', () => {
    const p = parse({});
    expect(p).toBeTruthy();                                   // the parse itself succeeded
    expect(p.saves).toHaveLength(0);
    const why = p.refused.find((r) => r.name === 'Fen-Whisper Hex')?.why;
    expect(why).toBeDefined();
    expect(why).toMatch(/does nothing on a failed save/);
    expect(why).toMatch(/a condition it gains, a forced movement, or damage/); // actionable words
  });

  test('any ONE of the three effects is enough for the row to stand', () => {
    expect(parse({ condition: 'Restrained' }).saves).toHaveLength(1);
    expect(parse({ damage: true, type: 'Necrotic' }).saves).toHaveLength(1);
    expect(parse({ movement: 'pulled up to 10 feet' }).saves).toHaveLength(1);
    for (const over of [{ condition: 'Restrained' }, { damage: true, type: 'Necrotic' }, { movement: 'pulled up to 10 feet' }]) {
      expect(parse(over).refused.filter((r) => r.name === 'Fen-Whisper Hex')).toEqual([]);
    }
  });

  test('a save with no effect AND no name is dropped without a reason to report', () => {
    const p = parseAuthorResponse(JSON.stringify({ saves: [{ ...hex, name: '' }] }), {});
    expect(p.saves).toHaveLength(0);
    expect(p.refused.filter((r) => /Fen-Whisper/.test(String(r.name)))).toEqual([]);
  });
});
