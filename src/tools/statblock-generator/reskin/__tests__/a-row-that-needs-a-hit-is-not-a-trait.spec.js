/**
 * A ROW THAT NEEDS A HIT IS NOT A TRAIT (fault 3, owner 2026-11-20).
 *
 * The marsh witch shipped this as a TRAIT:
 *
 *   Spiteful Curse. If the target is a creature and isn't already Poisoned by this creature, it is
 *   subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has
 *   the Poisoned condition …
 *
 * That is the text that follows an attack's hit, standing alone, with no target and nothing saying
 * when it fires. The audit called it at high confidence: "nothing on the sheet says when or at whom
 * this saving throw occurs, so a GM cannot run it."
 *
 * The template declares the problem itself — `contagion`'s trigger is `on_hit`. These tests are
 * data integrity over the catalog plus the one routing fact, because the fault was never about
 * contagion: it was about a whole class of template reaching a seat that cannot hold it.
 */
import { TEMPLATES, templatesFor } from '../templates.mjs';

describe('the catalog: no template a trait seat may take depends on a hit', () => {
  test('every template whose declared trigger is on_hit declares itself a rider', () => {
    const onHit = TEMPLATES.filter((t) => t.trigger === 'on_hit');
    expect(onHit.length).toBeGreaterThan(0);                       // the subject is present
    for (const t of onHit) expect([t.id, t.section]).toEqual([t.id, 'rider']);
  });

  test('and no template that declares itself a trait has a body that opens as a rider does', () => {
    // a rider's body is the sentence that follows a hit: it speaks of "the target" with no frame
    // of its own — no area, no trigger, no creature it names.
    const RIDER_OPENING = /^(?:\s*\*?)?If the target/i;
    const traits = TEMPLATES.filter((t) => t.section === 'trait');
    expect(traits.length).toBeGreaterThan(0);
    const offenders = traits.filter((t) => Object.values(t.frames ?? {}).some((f) => RIDER_OPENING.test(String(f ?? ''))));
    expect(offenders.map((t) => t.id)).toEqual([]);
  });
});

describe('the routing: a trait seat is not offered one', () => {
  // a context that DOES offer contagion as a rider, so the trait exclusion is what the test reads
  // and not some other leg of legality (role, CR band, a melee row to ride)
  const ctx = { archetype: 'brute', cr: 3, sections: { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d6 + 5) Piercing damage.' }] } };

  test('contagion is legal for a rider seat and not for a trait seat', () => {
    const asRider = templatesFor({ ...ctx, section: 'rider' }).map((t) => t.id);
    expect(asRider).toContain('contagion');                        // the subject is present
    const asTrait = templatesFor({ ...ctx, section: 'trait' }).map((t) => t.id);
    expect(asTrait).not.toContain('contagion');
  });

  test('the gate is the declared trigger, not a list of ids — every on_hit template is out', () => {
    const asTrait = new Set(templatesFor({ ...ctx, section: 'trait' }).map((t) => t.id));
    for (const t of TEMPLATES.filter((x) => x.trigger === 'on_hit')) expect([t.id, asTrait.has(t.id)]).toEqual([t.id, false]);
  });
});
