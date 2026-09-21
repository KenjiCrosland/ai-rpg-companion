/**
 * Batch-15 regressions (2026-07-31, Cinderstone Giant live text):
 * "Half damage and no <rider>" → the official "Half damage only." idiom
 * (11 official uses, 0 of the and-no form), and "falls Prone" → "has the
 * Prone condition" (2024-gated: 2014 officials use "falls prone" 6 times).
 * Killed candidate: retaliation traits need no "within 5 feet" qualifier
 * (Black Pudding's official Corrosive Form has none).
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 22 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text) => ({ type: 'Giant', sections: { [section]: [{ name, text }] } });

describe('success-half-only (Erupting Geyser)', () => {
  const geyser = wrap('Actions', 'Erupting Geyser (1/Day)',
    'Dexterity Saving Throw: DC 22, each creature in a 20-foot-radius, 40-foot-high Cylinder centered on a point the giant can see within 60 feet. Failure: 45 (13d6) Fire damage and the target is pushed 10 feet upward and falls Prone. Success: Half damage and no push.');

  test('normalizes to the official idiom', () => {
    const f = rulesFor(geyser, 'success-half-only');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(geyser, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('Success: Half damage only.');
    expect(fixed.sections.Actions[0].text).not.toContain('no push');
  });

  test('the official form passes untouched', () => {
    const m = wrap('Actions', 'Reassemble (1/Day)',
      'Dexterity Saving Throw: DC 22, each creature in a 20-foot Emanation originating from the giant. Failure: 45 (13d6) Thunder damage. Success: Half damage only.');
    expect(rulesFor(m, 'success-half-only')).toHaveLength(0);
  });
});

describe('prone-vocab (2024-gated)', () => {
  test('"falls Prone" becomes the condition form', () => {
    const geyser = wrap('Actions', 'Erupting Geyser (1/Day)',
      'Failure: 45 (13d6) Fire damage and the target is pushed 10 feet upward and falls Prone. Success: Half damage only.');
    const f = rulesFor(geyser, 'prone-vocab');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(geyser, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('and has the Prone condition');
  });

  test('2014 blocks keep "falls prone" (6 official uses)', () => {
    const m = wrap('Actions', 'Trip',
      'On a failed save, the target falls prone.');
    expect(rulesFor(m, 'prone-vocab', { edition: '2014' })).toHaveLength(0);
  });

  test('retaliation without a range qualifier is official (Black Pudding) — no rule fires', () => {
    const m = wrap('Traits', 'Fire-Laced Hide',
      'Each creature that hits the giant with a melee attack takes 7 (2d6) Fire damage.');
    const all = lintStatblock(m, { chassis, edition: '2024' }).findings;
    expect(all.filter((f) => f.loc?.entry === 'Fire-Laced Hide')).toHaveLength(0);
  });
});
