/**
 * Batch-16 regressions (2026-08-01, coherence-focused batch: Prism
 * Lurcher / Shimmerscale Serpent / Tarzotch / Lullaby Maw). Empty entries,
 * swarm mechanics without swarm typing, dangling movement-path areas, the
 * widened rider-save bridge, redundant Line widths, and the audit's fuzzy
 * entry-name recovery. Sweeps: 0-FP both corpora (swarm detection is
 * name-aware because official swarms type by component).
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';
import { verifyAuditFindings } from '../format-2024/audit.mjs';

const chassis = { archetype: 'balanced', save_dc: 24 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text, extra = {}) =>
  ({ type: 'Monstrosity', name: 'Shimmerscale Serpent', sections: { [section]: [{ name, text }] }, ...extra });

describe('empty-entry (Lullaby Maw)', () => {
  test('a named entry with no rules text is a reject', () => {
    const m = wrap('Actions', 'Psionic Lullaby (1/Day)', '');
    const f = rulesFor(m, 'empty-entry');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });
});

describe('swarm-content-untyped (Shimmerscale Serpent)', () => {
  test('colony mechanics on a non-swarm block are structural', () => {
    const m = wrap('Traits', 'Swarm Form',
      'The shimmerscale serpent can occupy another creature\'s space and vice versa, and it can move through any opening large enough for a Tiny eel without squeezing.');
    expect(rulesFor(m, 'swarm-content-untyped')).toHaveLength(1);
  });

  test('an actual swarm passes (official Swarm of Bats shape)', () => {
    const m = wrap('Traits', 'Swarm',
      'The swarm can occupy another creature\'s space and vice versa, and the swarm can move through any opening large enough for a Tiny bat.',
      { name: 'Swarm of Bats', type: 'Beast' });
    expect(rulesFor(m, 'swarm-content-untyped')).toHaveLength(0);
  });
});

describe('undefined-area: movement-path referents (Tarzotch Tar Rush)', () => {
  test('"each creature in the line" with no Line defined is a reject', () => {
    const m = wrap('Actions', 'Tar Rush (Recharge 5-6)',
      'The tarzotch moves up to its Speed without provoking Opportunity Attacks. Dexterity Saving Throw: DC 24, each creature in the line. Failure: 60 (11d10) Acid damage and the target has the Prone condition. Success: Half damage only.');
    expect(rulesFor(m, 'undefined-area')).toHaveLength(1);
  });

  test('a defined Line before the referent passes (official breath shape)', () => {
    const m = wrap('Actions', 'Lightning Breath',
      'The dragon exhales lightning in a 90-foot-long, 5-foot-wide Line. Dexterity Saving Throw: DC 24, each creature in the line. Failure: 66 (12d10) Lightning damage.');
    expect(rulesFor(m, 'undefined-area')).toHaveLength(0);
  });
});

describe('rider-save bridge at 80 chars (Tarzotch Glistening)', () => {
  test('a long targeting bridge no longer hides the 2014 form', () => {
    const m = wrap('Traits', 'Glistening',
      'The tarzotch\'s space is difficult terrain for creatures other than the tarzotch. A creature that enters the tarzotch\'s space for the first time on a turn or starts its turn there must succeed on a DC 24 Dexterity saving throw or be Prone.');
    expect(rulesFor(m, 'phrasing-rider-save')).toHaveLength(1);
  });
});

describe('line-dimensions: redundant width echo (Spear-Swarm Strike)', () => {
  test('"5-foot-wide Line that is 5 feet wide" loses the echo', () => {
    const m = wrap('Actions', 'Spear-Swarm Strike (Recharge 5-6)',
      'Dexterity Saving Throw: DC 18, each creature in a 30-foot-long, 5-foot-wide Line that is 5 feet wide. Failure: 22 (5d8) Piercing damage. Success: Half damage.');
    const f = rulesFor(m, 'line-dimensions');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('5-foot-wide Line. Failure:');
    expect(fixed.sections.Actions[0].text).not.toContain('that is 5 feet wide');
  });
});

describe('audit fuzzy entry recovery (the Ethereal Lullaby drop)', () => {
  const monster = {
    sections: {
      Actions: [
        { name: 'Psionic Lullaby (1/Day)', text: '' },
        { name: 'Psychic Pierce', text: 'Melee Attack Roll: +12, reach 5 ft. 11 (1d8 + 7) Psychic damage.' },
      ],
    },
  };

  test('a paraphrased entry name resolves when unique; span verifies against the name', () => {
    const raw = JSON.stringify({ findings: [{
      principle: 2, section: 'Actions', entry: 'Ethereal Lullaby',
      span: 'Psionic Lullaby (1/Day).', issue: 'The entry has no rules text.',
      suggestion: 'Write the mechanic.', confidence: 'high',
    }] });
    const out = verifyAuditFindings(monster, raw);
    expect(out).toHaveLength(1);
    expect(out[0].loc).toEqual({ section: 'Actions', entry: 'Psionic Lullaby (1/Day)' });
  });

  test('an ambiguous fuzzy name still drops', () => {
    const m2 = { sections: { Actions: [
      { name: 'Psychic Pierce', text: 'x'.repeat(20) },
      { name: 'Psychic Burst', text: 'y'.repeat(20) },
    ] } };
    const raw = JSON.stringify({ findings: [{
      principle: 2, entry: 'Psychic Blast', span: 'zzz', issue: 'i', suggestion: 's', confidence: 'high',
    }] });
    expect(verifyAuditFindings(m2, raw)).toHaveLength(0);
  });
});

describe('escape-dc-band (fix-call number-integrity hole)', () => {
  test('an off-policy escape DC restamps to save_dc − 2', () => {
    const m = wrap('Actions', 'Thorn Lash',
      'Melee Attack Roll: +10, reach 10 ft. 27 (6d6 + 6) Piercing damage, and the target has the Grappled condition (escape DC 18).');
    const f = rulesFor(m, 'escape-dc-band');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis }); // save_dc 24 → escape 22
    expect(fixed.sections.Actions[0].text).toContain('(escape DC 22)');
    expect(rulesFor(fixed, 'escape-dc-band')).toHaveLength(0);
  });

  test('the policy DC passes', () => {
    const m = wrap('Actions', 'Grab',
      'Hit: 14 (2d8 + 5) Bludgeoning damage and the target has the Grappled condition (escape DC 22).');
    expect(rulesFor(m, 'escape-dc-band')).toHaveLength(0);
  });
});

describe('unknown-action-ref (Crafty Withdrawal)', () => {
  test('a fake action reference is a reject', () => {
    const m = wrap('Bonus Actions', 'Crafty Withdrawal', 'The lurcher takes the withdrawal action.');
    expect(rulesFor(m, 'unknown-action-ref')).toHaveLength(1);
  });

  test('standard actions and own entries pass', () => {
    const m = {
      type: 'Monstrosity', name: 'X',
      sections: {
        Actions: [{ name: 'Slam', text: 'Melee Attack Roll: +9, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage.' }],
        'Bonus Actions': [{ name: 'Skitter', text: 'The lurcher takes the Disengage action, or it takes the Slam action instead.' }],
        'Legendary Actions': [{ name: 'Vanish', text: 'The lurcher takes the Hide action.' }],
      },
    };
    expect(rulesFor(m, 'unknown-action-ref')).toHaveLength(0);
  });
});
