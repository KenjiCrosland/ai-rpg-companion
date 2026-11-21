/**
 * THE SECOND KEY, TESTED (the item 2 review's gap, 2026-11-14).
 *
 * `traitWritesARider` is the check that enforces the owner's ruling — a condition on a
 * hit does not ship as a trait. It lived as an inline expression inside a 9,000-line
 * function, so nothing could call it and nothing did.
 *
 * EXTRACTING IT FOUND THAT IT WAS DEAD CODE. The inline version read
 * `form.section === 'trait'`, and a trait form's section is `'Traits'` — so the guard
 * could never be true, on any sheet, ever. No block run could have told us: a guard that
 * never fires looks exactly like a guard with nothing to catch. `kind` is the field that
 * names the form.
 *
 * The two cases the review asked for are the first two tests. The forms are built by
 * `parseAuthorResponse` from real-shaped call answers rather than hand-written objects,
 * so the test also proves the wiring it depends on: that `condition_relation` is what
 * separates inflicting a condition from requiring one or being immune to it.
 */
import { parseAuthorResponse, traitWritesARider } from '../author.mjs';

const RESEATED = { reseated: 'trait/always -> rider/on_hit', section: 'rider', trigger: 'on_hit' };
const NOT_RESEATED = { section: 'trait', trigger: 'always' };

/** a real author answer -> the trait form the seat would hold */
const traitForm = (over) => {
  const parsed = parseAuthorResponse(JSON.stringify({
    traits: [{
      clause: 'clamps his iron jaw on a foe',
      name: 'Locking Grip',
      trigger: 'when it hits a creature with its Iron Jaw',
      effect: 'the target is clamped fast in his jaws and cannot pull free',
      passive_effect: 'other',
      ...over,
    }],
    // the rider path is only for a RE-SEATED idea, and a non-reseated trait that INFLICTS is now
    // refused outright (item 4, owner 2026-11-21) — so the form this helper builds is the
    // re-seated one, which is what every test here is about
  }), { reseated: true });
  const f = parsed?.traits?.[0];
  return f ? { kind: 'trait', f, section: 'Traits' } : null;
};

describe('a trait does not write a rider', () => {
  test('a re-seated idea whose trait INFLICTS a condition is refused', () => {
    const form = traitForm({ imposes: 'Grappled', condition_relation: 'inflicts' });
    expect(form.f.imposes).toBe('Grappled'); // the wiring: `inflicts` survives into the form
    expect(traitWritesARider(RESEATED, form)).toBe('Grappled');
  });

  test('a re-seated idea whose trait only grants an IMMUNITY keeps its trait', () => {
    // the mislabelled stance: "he cannot be Frightened" — an immunity, not an imposition
    const form = traitForm({ name: 'Shield-Wall Anchor', imposes: 'Frightened', condition_relation: 'immune' });
    expect(form.f.imposes).toBeNull(); // `imposesFromRelation` narrows it away
    expect(traitWritesARider(RESEATED, form)).toBeNull();
  });

  test('a trait that REQUIRES a condition is not a rider either', () => {
    const form = traitForm({ imposes: 'Grappled', condition_relation: 'requires' });
    expect(form.f.imposes).toBeNull();
    expect(form.f.requiresConditionNamed).toBe('Grappled');
    expect(traitWritesARider(RESEATED, form)).toBeNull();
  });

  test('an idea that was never re-seated is untouched, whatever its trait inflicts', () => {
    const form = traitForm({ imposes: 'Grappled', condition_relation: 'inflicts' });
    expect(traitWritesARider(NOT_RESEATED, form)).toBeNull();
    expect(traitWritesARider({}, form)).toBeNull();
    expect(traitWritesARider(null, form)).toBeNull();
  });

  test('only a TRAIT form is judged — this is the bug the extraction found', () => {
    const form = traitForm({ imposes: 'Grappled', condition_relation: 'inflicts' });
    // `kind` names the form; `section` is the sheet heading ('Traits'), and reading the
    // latter is what made the inline guard dead code
    expect(form.section).toBe('Traits');
    expect(form.kind).toBe('trait');
    expect(traitWritesARider(RESEATED, { ...form, kind: 'reaction' })).toBeNull();
    expect(traitWritesARider(RESEATED, null)).toBeNull();
  });
});
