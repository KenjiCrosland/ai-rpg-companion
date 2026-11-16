/**
 * THE PAYOFF FAMILY IS A RIDER ON THE CREATURE'S OWN ATTACK.
 *
 * `payoff` was the third-commonest family the idea call named (12 of 122 gap
 * records) and had no grammar behind it, so every one of those ideas fell
 * through to the catalog. The first attempt built it as an ACTION grammar and
 * served 2 of 176 ideas — `normaliseTag` turns an action idea whose trigger is
 * `on_hit` into a rider, which is what "it hits harder against an afflicted
 * target" IS. The measured target is 39 rider/on_hit ideas (21 condition, 18
 * damage).
 *
 * The two rules these tests pin are the owner's, from the reverted attempt:
 *  - no condition stacking ("pretty sure not restrained and prone") — the
 *    condition payload EXTENDS the condition already there;
 *  - no incoherent reach ("how do you tighten coils to restrain if they aren't
 *    first tethered") — the target is the one the creature just hit.
 */
import {
  composedCandidates, composedReason, composedTemplate, renderTemplate,
  GRAMMARS, IDEA_FAMILIES, SECTION_OF,
} from '@/tools/statblock-generator/reskin/templates.mjs';
import { riderPayoffReachable } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const idea = (effect, section = 'rider') => ({ family: 'payoff', section, effect, trigger: 'on_hit' });
const ctxAt = (cr) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }),
  archetype: 'brute', cr, imposed: ['Frightened'], conditionMinor: 'Prone',
  name: 'Tyrant', inline: 'the tyrant', energy: 'Fire', mix: null,
  meleeType: 'Bludgeoning', concept: 'a tyrant whose hammer finds the terrified', size: 'Large',
});

describe('the payoff grammar is reachable at all', () => {
  it('is a family the idea call can name', () => {
    expect(IDEA_FAMILIES).toContain('payoff');
    expect(GRAMMARS.payoff).toBeTruthy();
  });

  // the first attempt's whole defect: an action grammar for rider ideas
  it('composes a RIDER, not an action', () => {
    expect(GRAMMARS.payoff.section).toBe('rider');
    expect(GRAMMARS.payoff.trigger_tag).toBe('on_hit');
    expect(SECTION_OF[GRAMMARS.payoff.section]).toBe('Rider');
  });

  it('offers the two effects the measured ideas actually carry', () => {
    expect(composedCandidates(idea('damage'), { can: [] })).toHaveLength(1);
    expect(composedCandidates(idea('condition'), { can: [] })).toHaveLength(1);
  });

  it('declines the trait seat, and says why', () => {
    expect(composedCandidates(idea('damage', 'trait'), { can: [] })).toEqual([]);
    expect(composedReason(idea('damage', 'trait'), { can: [] })).toMatch(/composes a rider/);
  });

  it('gives each candidate a distinct id', () => {
    const ids = ['damage', 'condition', 'movement'].flatMap((e) => composedCandidates(idea(e), { can: [] }).map((t) => t.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('what the rider says', () => {
  it('keys on the target just hit — never on a creature at a distance', () => {
    const [t] = composedCandidates(idea('damage'), { can: [] });
    const { text } = renderTemplate(t, ctxAt(9), {});
    expect(text).toMatch(/^If the target already has the \w+ condition,/);
    // the reverted attempt's incoherence: an area keyed on a condition
    expect(text).not.toMatch(/within \d+ feet/);
  });

  it('records the condition it requires as DECLARED data', () => {
    const [t] = composedCandidates(idea('damage'), { can: [] });
    const r = renderTemplate(t, ctxAt(9), { consumed_condition: 'Frightened' });
    expect(r.consumes).toBe('Frightened');
    expect(r.section).toBe('Rider');
  });

  it('EXTENDS the condition rather than stacking a second one', () => {
    const [t] = composedCandidates(idea('condition'), { can: [] });
    const r = renderTemplate(t, ctxAt(9), { consumed_condition: 'Restrained' });
    // the same condition named twice, and no other condition introduced
    expect(r.text).toBe('If the target already has the Restrained condition, the Restrained condition on the target lasts until the end of the creature\'s next turn.');
    expect(r.imposes).toBeUndefined();
  });

  it('scales its extra damage off the sheet, every band', () => {
    for (const cr of [1, 4, 7, 11, 15, 22]) {
      const [t] = composedCandidates(idea('damage'), { can: [] });
      const { text } = renderTemplate(t, ctxAt(cr), {});
      expect(text).toMatch(/takes an extra \d+ \(\d+d\d+(?: \+ \d+)?\) \w+ damage\./);
      expect(text).not.toMatch(/[{}]/); // no unfilled slot ships
    }
  });

  it('leaves no unfilled slot in any payload at any band', () => {
    for (const effect of ['damage', 'condition', 'movement']) {
      for (const cr of [1, 9, 22]) {
        for (const t of composedCandidates(idea(effect), { can: [] })) {
          expect(renderTemplate(t, ctxAt(cr), {}).text).not.toMatch(/[{}]/);
        }
      }
    }
  });

  it('builds every band, so no CR ships an empty frame', () => {
    const t = composedTemplate({ family: 'payoff', consequence: GRAMMARS.payoff.consequence[0] });
    expect(Object.keys(t.frames).sort()).toEqual(['0-2', '10-12', '13-20', '21+', '3-5', '6-9']);
  });
});

describe('a welded payoff rider that cannot pay off', () => {
  // `payoffReachable` DROPS a dead payoff row. This rider owns no row — its
  // sentence was welded onto the creature's weapon attack — so the repair must
  // strip the clause and keep the attack, as `advantageReachable` does.
  const clause = 'If the target already has the Frightened condition, the target takes an extra 16 (3d10) Fire damage.';
  const slam = (extra = {}) => ({
    name: 'Hammer', text: `*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 18 (3d8 + 5) Bludgeoning damage. ${clause}`,
    riderNeeds: [{ need: 'Frightened', text: clause }], ...extra,
  });

  it('strips the clause and KEEPS the attack when nothing imposes the condition', () => {
    const sections = { Actions: [slam()] };
    const out = riderPayoffReachable(sections, () => {});
    expect(out).toEqual([{ name: 'Hammer', need: 'Frightened' }]);
    expect(sections.Actions).toHaveLength(1); // the weapon row survives
    expect(sections.Actions[0].text).not.toMatch(/already has the Frightened/);
    expect(sections.Actions[0].text).toMatch(/18 \(3d8 \+ 5\) Bludgeoning damage\.$/);
    expect(sections.Actions[0].riderNeeds).toEqual([]);
  });

  it('keeps the clause when another row imposes the condition', () => {
    const sections = { Actions: [slam()], Traits: [{ name: 'Dread', text: 'x', imposes: 'Frightened' }] };
    expect(riderPayoffReachable(sections, () => {})).toEqual([]);
    expect(sections.Actions[0].text).toMatch(/already has the Frightened/);
  });

  // the host counts: first hit frightens, second finds the terrified
  it('keeps the clause when the HOST itself imposes the condition', () => {
    const sections = { Actions: [slam({ imposes: 'Frightened' })] };
    expect(riderPayoffReachable(sections, () => {})).toEqual([]);
    expect(sections.Actions[0].text).toMatch(/already has the Frightened/);
  });

  it('is inert on a sheet with no payoff rider', () => {
    const sections = { Actions: [{ name: 'Bite', text: 'plain' }] };
    expect(riderPayoffReachable(sections, () => {})).toEqual([]);
    expect(sections.Actions[0].text).toBe('plain');
  });

  it('traces the drop in plain English', () => {
    const lines = [];
    riderPayoffReachable({ Actions: [slam()] }, (l, d) => lines.push(`${l} ${d}`));
    expect(lines.join('\n')).toMatch(/payoff rider clause dropped.*Hammer.*Frightened.*the attack stays/);
  });
});

describe('the damage arm pays for itself', () => {
  // Riders skip the value check and ride a Multiattack row, so an unlimited
  // conditional bonus multiplies by the attack count (+42 measured at CR 11
  // against a band ceiling of 0.97x). The limit must be the grammar's own, not
  // the weld's — the weld's gate reads a condition NAME out of the text and so
  // fired for Restrained and Grappled while missing Frightened and Poisoned.
  it('carries its own once-per-turn limit whatever the condition', () => {
    for (const consumed_condition of ['Frightened', 'Poisoned', 'Prone', 'Restrained', 'Grappled']) {
      const [t] = composedCandidates(idea('damage'), { can: [] });
      expect(renderTemplate(t, ctxAt(11), { consumed_condition }).text).toMatch(/This effect can be applied only once per turn\.$/);
    }
  });

  // extending a duration is not cumulative, so repeating it costs nothing
  it('does not limit the condition arm, which is idempotent', () => {
    const [t] = composedCandidates(idea('condition'), { can: [] });
    expect(renderTemplate(t, ctxAt(11), { consumed_condition: 'Restrained' }).text).not.toMatch(/once per turn/);
  });

  it('never doubles the limiter — the weld would not append a second one', () => {
    const [t] = composedCandidates(idea('damage'), { can: [] });
    const { text } = renderTemplate(t, ctxAt(11), { consumed_condition: 'Restrained' });
    expect(text.match(/once per turn/g)).toHaveLength(1);
    // the weld's own gate: it skips when the row REQUIRES a condition and imposes none
    expect(/once per turn/i.test(text)).toBe(true);
  });

  it('declares a requirement and no imposition, which is what stands the weld gate down', () => {
    for (const effect of ['damage', 'condition', 'movement']) {
      const [t] = composedCandidates(idea(effect), { can: [] });
      const r = renderTemplate(t, ctxAt(11), { consumed_condition: 'Restrained' });
      expect(r.consumes).toBe('Restrained');
      expect(r.imposes).toBeUndefined();
    }
  });
});

describe('the guard cannot be satisfied by the row it guards', () => {
  // The weld reads a condition name out of the rider text twice — once to decide
  // whether to limit a no-save hold, once to record what the host imposes. A
  // payoff rider NAMES the condition it requires, so both read a requirement as
  // an imposition. The second is the dangerous one: `riderPayoffReachable` asks
  // whether anything on the sheet imposes the condition, so a host that claimed
  // to impose its own requirement would satisfy the check by itself.
  it('a host that falsely claims to impose its requirement makes the guard dead', () => {
    const clause = 'If the target already has the Frightened condition, the target takes an extra 16 (3d10) Fire damage.';
    const host = {
      name: 'Hammer', text: `*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 18 (3d8 + 5) Bludgeoning damage. ${clause}`,
      riderNeeds: [{ need: 'Frightened', text: clause }], imposes: 'Frightened', // the bug this pins
    };
    // nothing else on the sheet frightens, yet the clause survives — because the
    // host vouches for itself. This is why the weld must not stamp it.
    expect(riderPayoffReachable({ Actions: [host] }, () => {})).toEqual([]);
    expect(host.text).toMatch(/already has the Frightened/);
  });

  it('and with the stamp withheld, the same sheet strips the clause', () => {
    const clause = 'If the target already has the Frightened condition, the target takes an extra 16 (3d10) Fire damage.';
    const host = {
      name: 'Hammer', text: `*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 18 (3d8 + 5) Bludgeoning damage. ${clause}`,
      riderNeeds: [{ need: 'Frightened', text: clause }], // no `imposes`
    };
    expect(riderPayoffReachable({ Actions: [host] }, () => {})).toEqual([{ name: 'Hammer', need: 'Frightened' }]);
    expect(host.text).not.toMatch(/already has the Frightened/);
  });
});
