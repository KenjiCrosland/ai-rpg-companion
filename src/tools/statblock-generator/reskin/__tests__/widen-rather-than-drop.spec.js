/**
 * WIDEN RATHER THAN DROP.
 *
 * Owner, 2026-10-28: "I don't particularly like seeing dead rows though so maybe
 * we try to up the severity of abilities that get dropped for being too soft."
 *
 * Every rung on the value ladder adjusts DICE, so a control row with no damage
 * has nothing to climb and falls off — the trace even names what it needs
 * ("needs a condition from the worth-an-attack list") and then drops it. Over the
 * homebrew forty the floor was the biggest killer of picks the call had already
 * accepted (9 of 19), and the rows were all one shape: single target, no damage,
 * a minor effect, failing by a hair (Barrow Shove EV 1.9 against a floor of 7.3).
 *
 * THE MEANS CHANGED ON 24 NOVEMBER, and this file changed with it. The intent above is the owner's
 * and still stands; the lift used to be a rewrite of the target clause to a Cone, and is now half a
 * hit of damage on the one creature the row was written for. His words: "one creature half a hit of
 * damage over a cone". Every assertion below that named a Cone now names the damage, and the
 * describes keep their own subjects.
 */
import { valueCheck, attackDamageTypeOf } from '@/tools/statblock-generator/reskin/templates.mjs';
import { LIBRARY_SEEDS } from '@/tools/statblock-generator/reskin/library.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const seedText = (key) => String(LIBRARY_SEEDS.find((s) => s.key === key).text);
const sub = (t, dc) => t.split('{dc}').join(dc).split('{duration}').join('until the end of its next turn');
const check = (text, cr, section = 'Actions', name = 'Probe') => {
  const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
  return valueCheck({ name, text: sub(text, scaled.dc) }, {
    scaled, sections: scaled.sections, section, cr, hitType: attackDamageTypeOf(scaled.sections) ?? 'Bludgeoning',
  });
};

describe('the rows that were dying at the floor', () => {
  // these five are the exact templates behind the forty's floor deaths
  it.each([
    ['push-prone', 6], ['push-prone', 10], ['obstacle-pull', 12],
    ['sensory-strike', 13], ['slow-bolt', 20],
  ])('%s at CR %i gains half a hit and keeps its one target', (key, cr) => {
    const vc = check(seedText(key), cr);
    // ENCODED: the row widened to a Cone and cleared the floor. It now gains half a hit instead,
    // and the floor KEEPS what it cannot lift (23 November), so clearing is no longer required.
    expect(vc.steps.join('; ')).toMatch(/half a hit added: \d+ \(\d+d\d+\) \w+ damage on a failed save/);
    expect(vc.text).toMatch(/one creature within/);
    expect(vc.text).not.toMatch(/Cone/);
  });

  // print keeps the failure clause singular: "each creature in a 30-foot Cone.
  // *Failure:* The target is pushed…" — only the target clause is rewritten
  it("the damage goes in FRONT of the effect the row already had", () => {
    const vc = check(seedText('push-prone'), 10);
    expect(vc.text).toMatch(/\*Failure:\* \d+ \(\d+d\d+\) \w+ damage, and the target is pushed/);
  });

  // ENCODED: print's flat Cone sizes, 15 feet below CR 5 and 30 at or above. No Cone is written
  // now, so what the size rule governed is gone; the damage is half a hit at every CR instead.
  it('is half a hit at every CR, not a laddered size', () => {
    for (const cr of [3, 5, 20]) {
      expect(check(seedText('sensory-strike'), cr).steps.join('; ')).toMatch(/half of one \d+-damage hit/);
      expect(check(seedText('sensory-strike'), cr).text).not.toMatch(/Cone/);
    }
  });
});

describe('what it must not touch', () => {
  // the dice rungs own a damaging row — and this is what excludes delayed-brand
  it('leaves a row that deals damage alone', () => {
    const vc = check(seedText('delayed-brand').split('{burst}').join('14 (4d6)').split('{damage_type}').join('Necrotic'), 8);
    expect(vc.steps.join('; ')).not.toMatch(/half a hit/);
    expect(vc.text).not.toMatch(/Cone/);
  });

  it('leaves a row that is already an area alone', () => {
    const vc = check('*Strength Saving Throw*: DC {dc}, each creature in a 15-foot Cone. *Failure:* The target has the Prone condition.', 9);
    expect(vc.steps.join('; ')).not.toMatch(/half a hit/);
    expect((vc.text.match(/Cone/g) ?? []).length).toBe(1); // untouched
  });

  it('leaves a trait alone — a trait replaces no attack, so it has no floor to clear', () => {
    expect(check(seedText('sensory-strike'), 9, 'Traits').steps.join('; ')).not.toMatch(/half a hit/);
  });

  it("leaves a Reaction alone — his ruling: a Reaction's save deals no damage", () => {
    expect(check(seedText('sensory-strike'), 9, 'Reactions').steps.join('; ')).not.toMatch(/half a hit/);
  });

  it('leaves a row with no minor effect alone', () => {
    const vc = check('*Wisdom Saving Throw*: DC {dc}, one creature within 60 feet. *Failure:* The target can\'t speak until the end of its next turn.', 9);
    expect(vc.steps.join('; ')).not.toMatch(/half a hit/);
  });

  // a bonus action trades for nothing, so it has no floor worth lifting for
  it('leaves a bonus action alone', () => {
    expect(check(seedText('push-prone'), 9, 'Bonus Actions').steps.join('; ')).not.toMatch(/half a hit/);
  });
});

describe('a save that succeeds does nothing', () => {
  // Owner, 2026-10-28: "If someone makes the save they aren't pushed yeah?" Yes —
  // the row carries only a Failure clause. A Success line exists to split DAMAGE,
  // and these rows have none, which is print's convention: of its 20 no-damage
  // Cone rows, ZERO carry a Success clause. The half-damage rung is gated on the
  // row having damage, so it cannot add one here either.
  it.each(['push-prone', 'obstacle-pull', 'sensory-strike', 'slow-bolt'])(
    '%s gains half a hit without gaining a Success clause', (key) => {
      const vc = check(seedText(key), 9);
      expect(vc.steps.join('; ')).toMatch(/half a hit added/);
      expect(vc.text).not.toMatch(/\*Success/);
      expect(vc.text).not.toMatch(/Half damage/);
      expect(vc.text).toMatch(/\*Failure:\*/);
    },
  );
});
