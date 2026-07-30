/**
 * Batch-20 regressions (2026-08-03, Ironhoof/Ulgoth/Boulderhatch/
 * Bristleback/Glacial Brawler): dangling use-refs, flat damage reduction,
 * riders with flat bonuses, redundant bonus-action openers, Primordial
 * dialect garbles, unconditional global name bans, and -er-formula
 * candidate demotion. All anchors 0/329 (dangling-use-ref narrowed for
 * official self-mention prose — Entangling Rope).
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections, demoteFormulaHeads, nameGradeKeeps } from '../format-2024/generate.mjs';
import { rollNameBans } from '../format-2024/concept-seeds.mjs';

const chassis = { archetype: 'balanced', save_dc: 18 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text, extra = {}) =>
  ({ type: 'Monstrosity', name: 'Boulderhatch', sections: { [section]: [{ name, text }] }, ...extra });

describe('dangling-use-ref (Boulderhatch Swarm Eruption)', () => {
  test('a bare self-delegation to a nonexistent action is a reject', () => {
    const m = {
      type: 'Monstrosity', name: 'Boulderhatch',
      sections: {
        Actions: [{ name: "Swarm's Talons (Recharge 5-6)", text: 'Dexterity Saving Throw: DC 18, each creature in a 20-foot Emanation originating from the boulderhatch. Failure: 27 (6d8) Slashing damage.' }],
        'Legendary Actions': [{ name: 'Swarm Eruption', text: 'The boulderhatch uses Swarm Eruption, if available.' }],
      },
    };
    const f = lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'dangling-use-ref');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('a legendary delegating to a REAL action passes (Zizzak Scatter shape)', () => {
    const m = {
      type: 'Monstrosity', name: 'Zizzak',
      sections: {
        Actions: [{ name: 'Scatter', text: 'The zizzak teleports up to 60 feet and makes one attack.' }],
        'Legendary Actions': [{ name: 'Scatter', text: 'The zizzak uses Scatter.' }],
      },
    };
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'dangling-use-ref')).toHaveLength(0);
  });

  test('official self-mention prose passes (Entangling Rope shape)', () => {
    const m = wrap('Actions', 'Entangling Rope (Requires Magic Rope)',
      'The archon entangles a creature. If the archon uses Entangling Rope while a creature is already Restrained by it, the first effect ends.');
    expect(rulesFor(m, 'dangling-use-ref')).toHaveLength(0);
  });
});

describe('flat-damage-reduction (Boulderhatch Stone Carapace)', () => {
  test('flat DR is a reject for redesign', () => {
    const m = wrap('Traits', 'Stone Carapace', 'When the boulderhatch takes damage, it reduces the damage by 10 (3d6).');
    const f = rulesFor(m, 'flat-damage-reduction');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });
});

describe('rider-flat-bonus (Ulgoth Claw)', () => {
  test('a rider with a flat bonus recomputes as pure dice', () => {
    const m = wrap('Actions', 'Claw',
      'Melee Attack Roll: +11, reach 5 ft. 27 (4d8 + 9) Slashing damage plus 12 (2d8 + 3) Fire damage.');
    const f = rulesFor(m, 'rider-flat-bonus');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('plus 9 (2d8) Fire damage');
    expect(fixed.sections.Actions[0].text).toContain('27 (4d8 + 9)'); // primary untouched
  });
});

describe('ba-opener (Ironhoof Fey Step)', () => {
  test('the redundant opener strips', () => {
    const m = wrap('Bonus Actions', 'Fey Step',
      'As a Bonus Action, the ironhoof warder can teleport up to 30 feet to an unoccupied space it can see.');
    const f = rulesFor(m, 'ba-opener');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections['Bonus Actions'][0].text).toMatch(/^The ironhoof warder can teleport/);
  });
});

describe('primordial-dialects (Glacial Brawler languages)', () => {
  test('non-dialects move out of the Primordial parenthetical', () => {
    const m = { type: 'Giant', name: 'Glacial Brawler', languages: 'Common, Primordial (Giant, Aquan)', sections: {} };
    const f = lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'primordial-dialects');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.languages).toBe('Giant, Common, Primordial (Aquan)');
  });

  test('pure dialect lists pass', () => {
    const m = { type: 'Elemental', name: 'X', languages: 'Primordial (Aquan, Ignan)', sections: {} };
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'primordial-dialects')).toHaveLength(0);
  });
});

describe('naming: unconditional global bans + formula demotion + threshold revert', () => {
  test('global stems ban regardless of the roll (the Ulgoth escape)', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99); // every roll fails
    const bans = rollNameBans({ type: 'Elemental' });
    expect(bans).toContain('uul');
    expect(bans).toContain('ulg');
    Math.random.mockRestore();
  });

  test('-er formula heads sort last among candidates', () => {
    expect(demoteFormulaHeads(['Glacial Brawler', 'Frosthowl', 'Pale Warder', 'Rimefang']))
      .toEqual(['Frosthowl', 'Rimefang', 'Glacial Brawler', 'Pale Warder']);
  });

  test('threshold reverted: B keeps again', () => {
    expect(nameGradeKeeps('A')).toBe(true);
    expect(nameGradeKeeps('B')).toBe(true);
    expect(nameGradeKeeps('C')).toBe(false);
  });
});

describe('batch 21b: Starfilth live findings', () => {
  test('a buff behind a saving throw is a reject (Glimmering Dome)', () => {
    const m = wrap('Actions', 'Glimmering Dome (1/Day)',
      'Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: The target gains 15 temporary Hit Points and has Advantage on saving throws until the start of the starfilth\'s next turn. Success: The target gains 7 temporary Hit Points until the start of the starfilth\'s next turn.');
    const f = rulesFor(m, 'buff-behind-save');
    expect(f.length).toBeGreaterThanOrEqual(1);
    expect(f[0].severity).toBe('reject');
  });

  test('harmful failure clauses pass (Sphinx exhaustion, Wisp self-heal shapes)', () => {
    const sphinx = wrap('Actions', 'Roar',
      'Wisdom Saving Throw: DC 16, each creature within 300 feet. Failure: The target gains 1 Exhaustion level and has the Frightened condition.');
    expect(rulesFor(sphinx, 'buff-behind-save')).toHaveLength(0);
    const wisp = wrap('Actions', 'Consume Life',
      'Constitution Saving Throw: DC 10, one creature with 0 Hit Points. Failure: The target dies, and the wisp regains 10 Hit Points.');
    expect(rulesFor(wisp, 'buff-behind-save')).toHaveLength(0);
  });

  test('"be has the" garble normalizes (Drifting Form)', () => {
    const m = wrap('Traits', 'Drifting Form',
      'The starfilth can move through spaces as narrow as 1 inch without squeezing. It can\'t be has the Prone condition.');
    const f = rulesFor(m, 'garbled-condition-grammar');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Traits[0].text).toContain("can't have the Prone condition");
  });

  test('four energy types on one body is a reject; two passes', () => {
    const four = {
      type: 'Elemental', name: 'X',
      sections: { Actions: [
        { name: 'A', text: 'Melee Attack Roll: +6, reach 5 ft. 10 (2d8) Radiant damage plus 5 (1d8) Poison damage.' },
        { name: 'B', text: 'Ranged Attack Roll: +6, range 60 ft. 10 (2d8) Cold damage plus 5 (1d8) Necrotic damage.' },
      ] },
    };
    expect(lintStatblock(four, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'energy-type-spread')).toHaveLength(1);
    const two = {
      type: 'Elemental', name: 'X',
      sections: { Actions: [{ name: 'A', text: 'Melee Attack Roll: +6, reach 5 ft. 10 (2d8) Fire damage plus 5 (1d8) Thunder damage.' }] },
    };
    expect(lintStatblock(two, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'energy-type-spread')).toHaveLength(0);
  });
});
