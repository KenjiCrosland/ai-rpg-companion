/**
 * A REACTION'S SAVE IS NOT AIMED AT A CREATURE THAT HAS DROPPED (item 1.2, 2026-11-18).
 *
 * The Swarm of Funeral Bells (s29 of the forty) shipped this:
 *
 *   Knellsong. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points.
 *   *Response—Constitution Saving Throw:* DC 17, the triggering creature.
 *   *Failure:* The target has the Deafened condition until the end of its next turn.
 *
 * The audit named it twice — "the target is at 0 HP when the save is called for, so Deafened has no
 * one to affect" and "Deafened is a dead payload" — and both findings are gone after this fix.
 *
 * THE CALL WAS NOT WRONG. It answered `target: "each other creature of the swarm's choice within 30
 * feet"`. The engine replaced that with the one creature the trigger names, which on this trigger is
 * the creature at 0 Hit Points.
 *
 * THE CAUSE was one question with three answers across two files: `AN_AREA` wants "each creature"
 * adjacent or an "N-foot" shape, so "each OTHER creature … within 30 feet" failed it and the target
 * collapsed — while the pricing line three rows above read `target.startsWith('each')` and priced
 * the same row as an area. The price said many and the text said one. `manyTargets` is the single
 * definition, read by the parse, the price and the text.
 *
 * WHAT THIS DOES NOT CHANGE: the owner's 2026-11-17 ruling that a SINGLE-target save in a Reaction
 * is made by the creature the trigger names (print's only such Reaction, the Chain Devil's Unnerving
 * Gaze: "DC 15, the triggering creature"). That collapse is right and is still what happens — the
 * last two tests hold it in place.
 */
import { manyTargets, AN_AREA, parseAuthorResponse } from '../author.mjs';
import srd from '@/data/srd52-monsters.json';

/** the Swarm of Funeral Bells' own answer, from the recorded tape */
const KNELLSONG = {
  clause: "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite",
  name: 'Knellsong',
  trigger: "A creature within the swarm's reach drops to 0 Hit Points.",
  // FRIGHTENED, NOT THE RECORDED DEAFENED: a Reaction's damage is always held, so Deafened alone is
  // refused at the read (fix C, 2026-11-18) and this file's subject is WHO saves, not the condition.
  // The recorded Deafened answer is pinned in `a-reaction-save-says-what-it-does.spec.js`.
  save: { stat: 'Wisdom', target: "each other creature of the swarm's choice within 30 feet", damage: true, type: 'Necrotic', condition: 'Frightened', success: 'none' },
  imposes: 'Deafened', condition_relation: 'inflicts', acts: null, heals: false, mechanics: 1, quantities: 3,
};

describe("a reaction's save is not aimed at a creature that has dropped", () => {
  test("the swarm's own target is many creatures, and the old test is why it was read as one", () => {
    const t = KNELLSONG.save.target;
    expect(AN_AREA.test(t)).toBe(false);   // the test that collapsed it — "each OTHER creature"
    expect(manyTargets(t)).toBe(true);     // the determiner: "each" is many
  });

  test('the parse keeps the model\'s own words for a many-creature target', () => {
    const parsed = parseAuthorResponse(JSON.stringify({ reactions: [KNELLSONG] }), {});
    const r = parsed?.reactions?.[0];
    expect(r).toBeDefined();                                        // the subject is present
    expect(r.save).toBeDefined();
    expect(r.save.target).toBe("each other creature of the swarm's choice within 30 feet");
    expect(r.save.target).not.toBe('the triggering creature');      // the defect, named
  });

  test('a single-creature target still falls back, so the triggering-creature ruling stands', () => {
    expect(manyTargets('one creature within 10 feet')).toBe(false);
    expect(manyTargets('the triggering creature')).toBe(false);
    expect(manyTargets('one creature it can see within 30 feet')).toBe(false);
  });

  test('an unanswered or junk target is not promoted to many', () => {
    for (const t of [null, undefined, '', '   ', 'whoever the GM likes']) expect(manyTargets(t)).toBe(false);
  });

  test('every shape AN_AREA names is still many — the union never narrows', () => {
    for (const t of ['each creature in a 60-foot Cone', 'each creature in a 30-foot Emanation originating from the leviathan',
      'each creature in a 20-foot Sphere centered on a point within 60 feet', 'each creature within 15 feet', 'each creature in a 60-foot-long, 5-foot-wide Line']) {
      expect(AN_AREA.test(t)).toBe(true);
      expect(manyTargets(t)).toBe(true);
    }
  });

  // THE PREDICATE AGAINST PRINT. Print's save rows state their target between the DC and the
  // failure clause; every one of those clauses that begins "each" must read as many, and print's
  // single-creature clauses must read as one. 0 disagreements allowed in either direction.
  test("print's own save targets are classified without one disagreement", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    let each = 0; let one = 0; const wrong = [];
    for (const m of list) for (const r of Object.values(m.sections ?? {}).flat().filter((x) => x?.text)) {
      for (const g of String(r.text).matchAll(/Saving Throw:?\*?:?\s*DC \d+,\s*([^.*]{3,90}?)\.\s*\*/g)) {
        const t = g[1].trim();
        if (/^each\b/i.test(t)) { each += 1; if (!manyTargets(t)) wrong.push(`MANY->one ${m.name}: ${t}`); }
        else if (/^(?:one|the) \w+/i.test(t) && !AN_AREA.test(t)) { one += 1; if (manyTargets(t)) wrong.push(`ONE->many ${m.name}: ${t}`); }
      }
    }
    expect(each).toBeGreaterThan(50);   // the sweep actually found print's areas
    expect(one).toBeGreaterThan(10);    // and its single-creature targets
    expect(wrong).toEqual([]);
  });

  test("print never writes the phrasing that collapsed, which is why no print body hit this", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    const rows = list.flatMap((m) => Object.values(m.sections ?? {}).flat().filter((x) => x?.text));
    expect(rows.filter((r) => /each other creature/i.test(r.text))).toHaveLength(0);
    expect(rows.filter((r) => /each creature/i.test(r.text)).length).toBeGreaterThan(100);
  });
});
