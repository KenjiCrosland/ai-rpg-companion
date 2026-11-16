/**
 * A CONDITION RIDER RIDES THE ATTACK, ALWAYS (owner's ruling, 2026-11-13).
 *
 * Grask Ironjaw, typed40 #1, shipped a TRAIT that grappled on a hit:
 *
 *     Locking Grip. When Grask hits a creature with his Longsword attack, Grask clamps
 *     the target in his irontusk grip; the target has the Grappled condition, cannot
 *     speak or cast spells with verbal components, and Grask has Advantage on attack
 *     rolls against it.
 *
 * Three times a round, no save, and no escape DC — which is also why it failed
 * `grapple-no-escape`. The owner's reading: "A longsword hit does not lead to a grip
 * logically and naturally; when an attack has a condition rider it should be mentioned
 * in the attack, not a trait."
 *
 * WHY IT HAPPENED, from the trace rather than from guessing:
 *
 *     signature idea (trait): "When Grask hits a creature with his Ironjaw attack …"
 *                             [trait/always/condition] [family: payoff]
 *     composed candidates: none trait — the payoff family composes a rider
 *                             and this is the trait seat
 *     seat authored the row: trait — the call refused every template for no_fit
 *
 * The call stamped the trigger `always`, not `on_hit`, so nothing downstream could
 * route on the trigger. The FAMILY knew: `GRAMMARS.payoff.section` is `'rider'` — the
 * payoff family composes a rider on the creature's own attack, by design. The composer
 * said exactly that and then declined, the fit call was offered nothing, and the seat
 * wrote free prose.
 *
 * `normaliseTag` already encodes "what an idea IS beats what the seat asked for" — an
 * action idea triggered `on_hit` becomes a rider. It could not reach this case, because
 * the trait seat FORCES `section: 'trait'` and `trait/always` is legal, so the tag
 * returns untouched and the family is never consulted. The correction sits beside it,
 * reading the family's own grammar.
 *
 * Scoped to `condition`, which is the ruling. Measured over three saved forties: 8
 * sheets carry trait + payoff + condition; ~10 more carry a `damage` payoff at a trait
 * seat and are deliberately left alone.
 */
import { parseIdeas, GRAMMARS } from '../templates.mjs';

const idea = (over) => JSON.stringify({
  trait: {
    idea: 'When Grask hits a creature with his Ironjaw attack, he can attempt to grapple the target as part of the same attack. While grappled in this way, the target cannot speak or cast spells.',
    section: 'trait', trigger: 'always', effect: 'condition', family: 'payoff', ...over,
  },
});
const seatOf = (over = {}) => parseIdeas(idea(over), []).trait;

describe('a condition rider rides the attack', () => {
  test('the premise: the payoff family composes a rider, and that is declared', () => {
    // if this ever stops being true the fix below is routing on nothing
    expect(GRAMMARS.payoff.section).toBe('rider');
    expect(GRAMMARS.zone.section).toBe('trait');
  });

  test("Grask's idea is re-seated onto the attack, and says so", () => {
    const t = seatOf();
    expect(t.section).toBe('rider');
    expect(t.trigger).toBe('on_hit');
    expect(t.reseated).toBe('trait/always -> rider/on_hit');
  });

  test('a damage payoff at a trait seat is NOT moved — the ruling is about conditions', () => {
    const t = seatOf({ effect: 'damage' });
    expect(t.section).toBe('trait');
    expect(t.reseated).toBeUndefined();
  });

  test('a condition whose family composes a TRAIT is not moved', () => {
    for (const family of ['zone', 'body-reaction']) {
      const t = seatOf({ family });
      expect(GRAMMARS[family].section).toBe('trait');
      expect(t.section).toBe('trait');
      expect(t.reseated).toBeUndefined();
    }
  });

  test('an idea already seated as a rider is left exactly as it is', () => {
    const r = parseIdeas(JSON.stringify({
      action: {
        idea: 'When it hits with a claw the target is grappled and dragged a few feet closer to the maw, held fast until it breaks free.',
        section: 'rider', trigger: 'on_hit', effect: 'condition', family: 'payoff',
      },
    }), []).action;
    expect(r.section).toBe('rider');
    expect(r.reseated).toBeUndefined(); // nothing to report; it arrived correct
  });

  test('a family with no grammar at all routes nowhere new', () => {
    const t = seatOf({ family: 'mark' });
    expect(GRAMMARS.mark).toBeUndefined();
    expect(t.section).toBe('trait');
    expect(t.reseated).toBeUndefined();
  });
});
