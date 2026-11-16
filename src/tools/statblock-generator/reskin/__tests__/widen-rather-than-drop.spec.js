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
 * Print writes this row as an AREA: Repulsion Breath (30-foot Cone, pushed +
 * Prone) is push-prone's twin and Blinding Breath (15-foot Cone, Blinded) is
 * sensory-strike's. Sizes are flat, not laddered — Repulsion Breath is 30 feet
 * at CR 2 and at CR 22 alike.
 */
import { valueCheck } from '@/tools/statblock-generator/reskin/templates.mjs';
import { LIBRARY_SEEDS } from '@/tools/statblock-generator/reskin/library.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const seedText = (key) => String(LIBRARY_SEEDS.find((s) => s.key === key).text);
const sub = (t, dc) => t.split('{dc}').join(dc).split('{duration}').join('until the end of its next turn');
const check = (text, cr, section = 'Actions', name = 'Probe') => {
  const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
  return valueCheck({ name, text: sub(text, scaled.dc) }, { scaled, sections: scaled.sections, section, cr });
};

describe('the rows that were dying at the floor', () => {
  // these five are the exact templates behind the forty's floor deaths
  it.each([
    ['push-prone', 6], ['push-prone', 10], ['obstacle-pull', 12],
    ['sensory-strike', 13], ['slow-bolt', 20],
  ])('%s at CR %i widens and clears the floor', (key, cr) => {
    const vc = check(seedText(key), cr);
    expect(vc.ev).toBeGreaterThanOrEqual(vc.floor);
    expect(vc.steps.join('; ')).toMatch(/widened to a \d+-foot Cone/);
    expect(vc.text).toMatch(/each creature in a \d+-foot Cone\./);
    // print writes a bare Cone: 55 cones in the corpus, none say "originating
    // from" (33 of 34 Emanations do). It also keeps the inserted text free of a
    // self-reference, which valueCheck runs too late to rename.
    expect(vc.text).not.toMatch(/Cone originating from/);
    expect(vc.text).not.toMatch(/Cone[^.]*the creature\b/);
    expect(vc.text).not.toMatch(/one creature within/);
  });

  // print keeps the failure clause singular: "each creature in a 30-foot Cone.
  // *Failure:* The target is pushed…" — only the target clause is rewritten
  it('keeps print\'s singular failure clause', () => {
    const vc = check(seedText('push-prone'), 10);
    expect(vc.text).toMatch(/\*Failure:\* The target is pushed/);
  });

  it('takes print\'s flat sizes: 15 feet below CR 5, 30 at or above', () => {
    expect(check(seedText('sensory-strike'), 3).text).toMatch(/15-foot Cone\./);
    expect(check(seedText('sensory-strike'), 5).text).toMatch(/30-foot Cone/);
    expect(check(seedText('sensory-strike'), 20).text).toMatch(/30-foot Cone/);
  });
});

describe('what it must not touch', () => {
  // the dice rungs own a damaging row — and this is what excludes delayed-brand
  it('leaves a row that deals damage alone', () => {
    const vc = check(seedText('delayed-brand').split('{burst}').join('14 (4d6)').split('{damage_type}').join('Necrotic'), 8);
    expect(vc.steps.join('; ')).not.toMatch(/widened/);
    expect(vc.text).not.toMatch(/Cone/);
  });

  it('leaves a row that is already an area alone', () => {
    const vc = check('*Strength Saving Throw*: DC {dc}, each creature in a 15-foot Cone. *Failure:* The target has the Prone condition.', 9);
    expect(vc.steps.join('; ')).not.toMatch(/widened/);
    expect((vc.text.match(/Cone/g) ?? []).length).toBe(1); // not widened twice
  });

  it('leaves a trait alone — a trait replaces no attack, so it has no floor to clear', () => {
    const vc = check(seedText('sensory-strike'), 9, 'Traits');
    expect(vc.steps.join('; ')).not.toMatch(/widened/);
  });

  it('leaves a row with no minor effect alone', () => {
    const vc = check('*Wisdom Saving Throw*: DC {dc}, one creature within 60 feet. *Failure:* The target can\'t speak until the end of its next turn.', 9);
    expect(vc.steps.join('; ')).not.toMatch(/widened/);
  });

  // a bonus action trades for nothing, so it has no floor worth widening for
  it('leaves a bonus action alone', () => {
    const vc = check(seedText('push-prone'), 9, 'Bonus Actions');
    expect(vc.steps.join('; ')).not.toMatch(/widened/);
  });
});

describe('a save that succeeds does nothing', () => {
  // Owner, 2026-10-28: "If someone makes the save they aren't pushed yeah?" Yes —
  // the row carries only a Failure clause. A Success line exists to split DAMAGE,
  // and these rows have none, which is print's convention: of its 20 no-damage
  // Cone rows, ZERO carry a Success clause. The half-damage rung is gated on the
  // row having damage, so it cannot add one here either.
  it.each(['push-prone', 'obstacle-pull', 'sensory-strike', 'slow-bolt'])(
    '%s widens without gaining a Success clause', (key) => {
      const vc = check(seedText(key), 9);
      expect(vc.steps.join('; ')).toMatch(/widened/);
      expect(vc.text).not.toMatch(/\*Success/);
      expect(vc.text).not.toMatch(/Half damage/);
      expect(vc.text).toMatch(/\*Failure:\*/);
    },
  );
});
