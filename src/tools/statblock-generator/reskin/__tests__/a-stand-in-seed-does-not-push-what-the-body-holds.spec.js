/**
 * A BODY THAT HOLDS IS NOT GIVEN A ROW THAT PUSHES ITS PREY AWAY (item 1.6, 2026-11-18).
 *
 * The Mire Hound (s02) and the Well Drowned Worm (s35) both shipped this pair:
 *
 *   Bite   … If the target is a Large or smaller creature, it has the Grappled condition (escape DC 11).
 *   Sundering Shove   *Strength Saving Throw:* DC 13 … The target is pushed up to 15 feet away
 *                     from the hound and has the Prone condition.
 *
 * It grapples you and then shoves you out of its grip. On the hound the contradiction is sharper
 * still: the idea the row stood in for was the OPPOSITE direction — the trace reads "the target is
 * pulled into the hound's space and the hound may immediately move up to half its Speed … dragging".
 *
 * Both rows arrived the same way: "library seed drawn: push-prone … (no template held the idea; a
 * proven shape stands in)". A stand-in is chosen for archetype and verb, and nothing asked whether
 * the body it is standing in on holds its prey.
 *
 * `moves` is now DECLARED on the three library seeds that move a target relative to the creature —
 * 'away' on push-prone, 'toward' on obstacle-pull and hook-drag — and a seed that moves the target
 * away is not legal on a sheet that already imposes Grappled. The pull seeds still deal to a
 * grappler, which is where they belong. The guard sits beside the Prone-dominance clause it is
 * modelled on, reading the same declared `imposed` list.
 *
 * COUNTED FIRST, as the handoff asked: of 40 saved sheets whose attack grapples, 2 also carried a
 * push-away row — both on this forty, both this seed, and 0 in any earlier run. After the fix, 0.
 */
import { LIBRARY_SEEDS, drawLibraryRow } from '../library.mjs';

/** a CR 1 grappler's scaled frame, enough for the seed renderer */
const grappler = () => ({
  cr: 1, dc: 13, pb: 2, per_hit: 6, mod: { STR: 1 }, attack_bonus: 3,
  sections: { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +3, reach 5 ft. 5 (1d8 + 1) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 11).' }] },
});
const draw = (shapeKey, imposed) => drawLibraryRow(grappler(), { archetype: 'brute', name: 'Mire Hound', shapeKey, imposed, cr: 1 });

describe('a stand-in seed does not push what the body holds', () => {
  test('the three seeds that move a target declare which way', () => {
    const moving = LIBRARY_SEEDS.filter((s) => s.moves);
    expect(moving.map((s) => s.key).sort()).toEqual(['hook-drag', 'obstacle-pull', 'push-prone']);
    expect(LIBRARY_SEEDS.find((s) => s.key === 'push-prone').moves).toBe('away');
    for (const s of moving) expect(['away', 'toward']).toContain(s.moves);
  });

  test('every seed declaring a direction says it in its own text, and no other seed moves a target', () => {
    for (const s of LIBRARY_SEEDS) {
      const movesText = /\b(?:pushed|pulled) up to \d+ feet\b/.test(String(s.text ?? ''));
      expect(Boolean(s.moves)).toBe(movesText);          // the declaration matches the row
      if (s.moves === 'away') expect(s.text).toMatch(/pushed up to \d+ feet away/);
      if (s.moves === 'toward') expect(s.text).toMatch(/pulled up to \d+ feet straight toward/);
    }
  });

  test('the push-away seed IS dealt to a body that does not hold', () => {
    const row = draw('push-prone', ['Frightened']);
    expect(row).toBeTruthy();                             // the subject is reachable at all
    expect(row.row.name).toBe('Sundering Shove');
    expect(row.row.text).toMatch(/pushed up to 15 feet away/);
  });

  // A REFUSED KEY DOES NOT END THE DRAW — the shelf hands back another legal seed — so the
  // invariant is about what LANDS, not about a null. On a grappler the hound got "Hooked Lash",
  // a pull, which is the direction a grip wants.
  test('the push-away seed is REFUSED on a body that grapples, and a pull stands in', () => {
    const row = draw('push-prone', ['Grappled']);
    expect(row?.seed).not.toBe('push-prone');
    expect(row?.row?.text ?? '').not.toMatch(/pushed up to \d+ feet away/);
    expect(row?.row?.text ?? '').toMatch(/pulled up to \d+ feet straight toward/);
  });

  test('NO key can land a push-away row on a body that grapples', () => {
    const landed = LIBRARY_SEEDS.map((s) => draw(s.key, ['Grappled'])).filter(Boolean);
    expect(landed.length).toBeGreaterThan(5);          // the sweep actually drew rows
    expect(landed.filter((r) => /pushed up to \d+ feet away/.test(r.row.text))).toEqual([]);
  });

  test('a pull seed still deals to a grappler — the direction that fits a grip', () => {
    const row = draw('obstacle-pull', ['Grappled']);
    expect(row).toBeTruthy();
    expect(row.row.text).toMatch(/pulled up to \d+ feet straight toward/);
  });

  test('the Prone-dominance guard it sits beside still fires', () => {
    const row = draw('push-prone', ['Prone']);
    expect(row?.seed).not.toBe('push-prone');
  });
});
