/**
 * Batch-17 regressions (2026-08-02, Gulfmaw/Shiverfungus/Icetread/
 * Hardshell): rename residue in plural/possessive forms, stale identity
 * nouns in choice clauses, and the widened success-clause/prone vocab.
 * Sweeps: "knocked Prone" 0/329; officials write "of the <own name>'s
 * choice" or "of its choice" only.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections, applyRenameMapping } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 21 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text, extra = {}) =>
  ({ type: 'Aberration', name: 'Grinding Hardshell', sections: { [section]: [{ name, text }] }, ...extra });

describe('rename residue: plurals and possessives (Shiverfungus thawcaps)', () => {
  test('bare plurals of the old name follow the rename', () => {
    const m = {
      name: 'Thawcap',
      sections: { Traits: [{ name: 'Frozen Chitter', text: 'The thawcap can communicate simple ideas with other thawcaps within 60 feet.' }] },
    };
    const out = applyRenameMapping(m, { Thawcap: 'Shiverfungus' });
    expect(out.sections.Traits[0].text).toContain('other shiverfunguses within 60 feet');
    expect(out.sections.Traits[0].text).not.toContain('thawcap');
  });

  test('possessive self-references follow the rename', () => {
    const m = {
      name: 'Burrowing Herder',
      sections: { Traits: [{ name: 'Numbing Aura', text: "Any creature of the herder's choice that starts its turn near the herder is slowed." }] },
    };
    const out = applyRenameMapping(m, { 'Burrowing Herder': 'Grinding Hardshell' });
    expect(out.sections.Traits[0].text).toContain("the hardshell's choice");
    expect(out.sections.Traits[0].text).not.toContain('herder');
  });
});

describe('choice-referent (Numbing Aura live text)', () => {
  test('an alien noun in a choice clause rewrites to "of its choice"', () => {
    const m = wrap('Traits', 'Numbing Aura',
      "Constitution Saving Throw: DC 21, any creature of the herder's choice that starts its turn in a 20-foot Emanation originating from the hardshell. Failure: The creature's Speed is reduced by 10 feet until the start of its next turn.");
    const f = rulesFor(m, 'choice-referent');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Traits[0].text).toContain('any creature of its choice');
  });

  test('the monster\'s own name in a choice clause passes (official dragon shape)', () => {
    const m = wrap('Actions', 'Frightful Presence',
      "Each creature of the hardshell's choice within 120 feet must make a save.");
    expect(rulesFor(m, 'choice-referent')).toHaveLength(0);
  });
});

describe('success-half-only: creature variant + knocked Prone (Psychic Slush Spray)', () => {
  test('the Hardshell success clause normalizes and the prone vocab fixes', () => {
    const m = wrap('Actions', 'Psychic Slush Spray (Recharge 5-6)',
      'Constitution Saving Throw: DC 21, each creature in a 30-foot Cone. Failure: 28 (8d6) Psychic damage, and the creature has the Prone condition. Success: Half damage, and the creature is not knocked Prone.');
    const f = lintStatblock(m, { chassis, edition: '2024' }).findings
      .filter((x) => ['success-half-only', 'prone-vocab'].includes(x.rule));
    expect(f.length).toBeGreaterThanOrEqual(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('Success: Half damage only.');
    expect(fixed.sections.Actions[0].text).not.toContain('knocked Prone');
  });
});

describe('naming grade gate (owner design: rename only at C or lower)', () => {
  const { nameGradeKeeps, validateNamingResponse } = require('../format-2024/generate.mjs');

  test('A/B (and missing) keep; C or lower renames (threshold reverted after bad live renames)', () => {
    expect(nameGradeKeeps('A')).toBe(true);
    expect(nameGradeKeeps('B')).toBe(true);
    expect(nameGradeKeeps(undefined)).toBe(true); // missing grade leans keep
    expect(nameGradeKeeps('excellent')).toBe(true); // malformed leans keep
    expect(nameGradeKeeps('C')).toBe(false);
    expect(nameGradeKeeps('c-')).toBe(false);
    expect(nameGradeKeeps('F')).toBe(false);
  });

  test('validator accepts a grade and rejects junk grades', () => {
    const base = { candidates: ['A1', 'B2', 'C3'] };
    expect(validateNamingResponse(JSON.stringify(base))).toBe(true);
    expect(validateNamingResponse(JSON.stringify({ ...base, grade: 'B' }))).toBe(true);
    expect(validateNamingResponse(JSON.stringify({ ...base, grade: 'excellent' }))).toBe(false);
  });
});

describe('batch 18 live fixes (Gliding Shade / Glintwrithe)', () => {
  test('an attack entry rider save re-targets to "the target" (Forgetting Puncture)', () => {
    const m = wrap('Actions', 'Forgetting Puncture',
      'Melee Attack Roll: +10, reach 5 ft. 27 (6d6 + 6) Piercing damage plus 11 (2d10) Psychic damage. Intelligence Saving Throw: DC 17, one creature within 5 feet. Failure: The target has the Incapacitated condition until the start of its next turn.');
    const f = rulesFor(m, 'rider-target-mismatch');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('DC 17, the target. Failure:');
  });

  test('a standalone save action keeps its own targeting clause', () => {
    const m = wrap('Actions', 'Treasure Whisper',
      'Wisdom Saving Throw: DC 16, one creature within 60 feet. Failure: The target has the Charmed condition.');
    expect(rulesFor(m, 'rider-target-mismatch')).toHaveLength(0);
  });
});

describe('entry-name-meta-paren (Blightwind "Disengage (if not already used)")', () => {
  test('a meta parenthetical strips from the entry name', () => {
    const m = wrap('Bonus Actions', 'Disengage (if not already used)',
      'The blightwind shatterer takes the Disengage action. This bonus action can be taken only once per turn.');
    const f = rulesFor(m, 'entry-name-meta-paren');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections['Bonus Actions'][0].name).toBe('Disengage');
  });

  test('official metering parens pass', () => {
    for (const name of ['Legendary Resistance (3/Day)', 'Acid Breath (Recharge 5-6)', 'Lash (Costs 2 Actions)', 'Slink Away (2/Day)']) {
      const m = wrap('Actions', name, 'Melee Attack Roll: +10, reach 5 ft. 20 (3d8 + 7) Slashing damage.');
      expect(rulesFor(m, 'entry-name-meta-paren')).toHaveLength(0);
    }
  });
});

describe('swarm-half-value with typed riders (Sorrowsand live text)', () => {
  test('riders no longer exempt the entry; the reduction fixes to halved-dice-kept-flat', () => {
    const m = {
      type: 'Swarm of Tiny Elementals', name: 'Sorrowsand', archetype: 'swarm',
      sections: { Actions: [{ name: 'Scouring Grit', text: 'Melee Attack Roll: +10, reach 5 ft. 37 (7d8 + 6) Slashing damage plus 4 (1d8) Fire damage, or 18 (4d8) Slashing damage plus 4 (1d8) Fire damage if the swarm has half of its Hit Points or fewer.' }] },
    };
    const f = lintStatblock(m, { chassis: { archetype: 'swarm', save_dc: 17 }, edition: '2024' }).findings
      .filter((x) => x.rule === 'swarm-half-value');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: { archetype: 'swarm', save_dc: 17 } });
    expect(fixed.sections.Actions[0].text).toContain('or 19 (3d8 + 6) Slashing damage');
    expect(fixed.sections.Actions[0].text).toContain('plus 4 (1d8) Fire damage, or'); // rider untouched
  });
});

describe('swarm-half-value with typed riders (Sorrowsand live text)', () => {
  test('riders no longer exempt the entry; the reduction fixes to halved-dice-kept-flat', () => {
    const m = {
      type: 'Swarm of Tiny Elementals', name: 'Sorrowsand', archetype: 'swarm',
      sections: { Actions: [{ name: 'Scouring Grit', text: 'Melee Attack Roll: +10, reach 5 ft. 37 (7d8 + 6) Slashing damage plus 4 (1d8) Fire damage, or 18 (4d8) Slashing damage plus 4 (1d8) Fire damage if the swarm has half of its Hit Points or fewer.' }] },
    };
    const swarmChassis = { archetype: 'swarm', save_dc: 17 };
    const f = lintStatblock(m, { chassis: swarmChassis, edition: '2024' }).findings
      .filter((x) => x.rule === 'swarm-half-value');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: swarmChassis });
    expect(fixed.sections.Actions[0].text).toContain('or 19 (3d8 + 6) Slashing damage');
    expect(fixed.sections.Actions[0].text).toContain('plus 4 (1d8) Fire damage, or'); // rider untouched
  });
});
