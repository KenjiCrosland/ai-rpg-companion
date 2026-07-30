/**
 * Mechanical-audit judgment layer (batch 12, owner option c): the audit
 * call runs only for complex blocks (CR >= 5 or Legendary Actions), its
 * findings are span-verified before merging into the first fix round, and
 * it can never fail or block a generation. Behavioral tests; the mock
 * routes by validator identity, not prompt strings.
 */
jest.mock('../format-2024/audit.mjs', () => {
  const actual = jest.requireActual('../format-2024/audit.mjs');
  return {
    ...actual,
    auditEligible: jest.fn(actual.auditEligible),
    buildAuditPrompt: jest.fn(actual.buildAuditPrompt),
  };
});

import {
  generateMonster2024, validateGenerationResponse, validateSectionResponse,
  validateNamingResponse,
} from '../format-2024/generate.mjs';
// (validateNamingResponse used by the grade-gate tests below)
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings, auditNameGrade, auditTypeCorrection } from '../format-2024/audit.mjs';

const { auditEligible: realAuditEligible } = jest.requireActual('../format-2024/audit.mjs');

const llmFixture = {
  name: 'Gloom Stalker',
  size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
  speed: '40 ft.',
  stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
  save_proficiencies: ['DEX'],
  skill_proficiencies: ['Stealth', 'Perception'],
  senses_special: 'darkvision 60 ft.',
  languages: 'Common',
  sections: {
    Traits: [
      { name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' },
    ],
    Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
      { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
      { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
    ],
  },
};

const AUDIT_FINDING = {
  findings: [{
    principle: 2, section: 'Traits', entry: 'Umbral Veil',
    span: 'While in Dim Light or Darkness, the stalker has the Invisible condition.',
    issue: 'The Invisible condition has no end clause beyond the light level.',
    suggestion: 'State that the condition ends when the stalker attacks.',
    confidence: 'high',
  }],
};

const routedLLM = ({ audit } = {}) => jest.fn((prompt, validate) => {
  if (validate === validateGenerationResponse) return Promise.resolve(JSON.stringify(llmFixture));
  if (validate === validateAuditResponse) {
    return audit === 'reject'
      ? Promise.reject(new Error('audit call failed'))
      : Promise.resolve(JSON.stringify(audit ?? { findings: [] }));
  }
  if (validate === validateSectionResponse) {
    return Promise.resolve(JSON.stringify([{ name: 'Umbral Veil', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition. The condition ends immediately after the stalker makes an attack roll.' }]));
  }
  if (validate === validateNamingResponse) {
    return Promise.resolve(JSON.stringify({ candidates: ['Bad-One', 'Bad-Two', 'Bad-Three'] }));
  }
  return Promise.reject(new Error('Unexpected LLM call'));
});

const auditCalls = (callLLM) => callLLM.mock.calls.filter(([, v]) => v === validateAuditResponse);
const OPTS = { concept: 'a gloom stalker', cr: 4, archetypeName: 'lurker', archetypeSource: 'user' };

describe('auditEligible gate (opened 2026-08-03)', () => {
  test('all creatures audit — the CR gate is gone (owner call)', () => {
    expect(realAuditEligible({ sections: {} }, 5)).toBe(true);
    expect(realAuditEligible({ sections: {} }, 3)).toBe(true);
    expect(realAuditEligible({ sections: {} }, undefined)).toBe(true);
  });
});

describe('audit call in the repair ladder', () => {
  beforeEach(() => auditEligible.mockImplementation(realAuditEligible));

  test('a verified finding merges into a fix round and the entry is rewritten', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = routedLLM({ audit: AUDIT_FINDING });
    const monster = await generateMonster2024(OPTS, callLLM);
    expect(auditCalls(callLLM)).toHaveLength(1); // never re-audited
    expect(monster.sections.Traits[0].text).toContain('ends immediately after the stalker makes an attack roll');
  });

  test('an empty findings array costs no fix call', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = routedLLM({ audit: { findings: [] } });
    const monster = await generateMonster2024(OPTS, callLLM);
    expect(auditCalls(callLLM)).toHaveLength(1);
    expect(callLLM.mock.calls.filter(([, v]) => v === validateSectionResponse)).toHaveLength(0);
    expect(monster.sections.Traits[0].text).toBe('While in Dim Light or Darkness, the stalker has the Invisible condition.');
  });

  test('even CR 4 audits now (gate opened)', async () => {
    const callLLM = routedLLM(); // CR 4, no legendary — audited anyway
    await generateMonster2024(OPTS, callLLM);
    expect(auditCalls(callLLM)).toHaveLength(1);
  });

  test('an audit call failure never fails the generation (never-fail)', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = routedLLM({ audit: 'reject' });
    const monster = await generateMonster2024(OPTS, callLLM);
    expect(monster.name).toBe('Gloom Stalker');
  });

  test('the audit prompt is built for the edition being generated', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = routedLLM({ audit: { findings: [] } });
    await generateMonster2024({ ...OPTS, edition: '2014' }, callLLM);
    expect(buildAuditPrompt).toHaveBeenCalledWith(expect.anything(), '2014');
  });

  test('structural rejects skip the audit (no wasted call on a doomed block)', async () => {
    auditEligible.mockImplementation(realAuditEligible);
    // CR 22 demands legendary actions the fixture lacks — a structural
    // reject that survives the regen retry. The audit must not spend a
    // call whose findings the skipped fix loop would throw away.
    const callLLM = routedLLM({ audit: AUDIT_FINDING });
    await generateMonster2024({ ...OPTS, cr: 22 }, callLLM);
    expect(auditCalls(callLLM)).toHaveLength(0);
  });

  test('an audit A name grade SKIPS the naming call (filter-passing provisional)', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = jest.fn((prompt, validate) => {
      if (validate === validateGenerationResponse) {
        return Promise.resolve(JSON.stringify({ ...llmFixture, name: 'Palegrasp' }));
      }
      if (validate === validateAuditResponse) {
        return Promise.resolve(JSON.stringify({ name_grade: 'A', findings: [] }));
      }
      return Promise.reject(new Error('Unexpected LLM call (naming should be skipped)'));
    });
    const monster = await generateMonster2024(
      { ...OPTS, seedTraits: { naming: 'a folk name' } }, callLLM,
    );
    expect(monster.name).toBe('Palegrasp');
    expect(callLLM.mock.calls.filter(([p]) => String(p).startsWith('Name this finished'))).toHaveLength(0);
  });

  test('an audit C grade forces the rename through the naming call', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = jest.fn((prompt, validate) => {
      if (validate === validateGenerationResponse) {
        return Promise.resolve(JSON.stringify({ ...llmFixture, name: 'Palegrasp' }));
      }
      if (validate === validateAuditResponse) {
        return Promise.resolve(JSON.stringify({ name_grade: 'C', findings: [] }));
      }
      if (validate === validateNamingResponse) {
        return Promise.resolve(JSON.stringify({ candidates: ['Quietmaw', 'Bogtorch', 'Mirelock'] }));
      }
      return Promise.reject(new Error('Unexpected LLM call'));
    });
    const monster = await generateMonster2024(
      { ...OPTS, seedTraits: { naming: 'a folk name' } }, callLLM,
    );
    expect(monster.name).toBe('Quietmaw');
  });

  test('an audit type correction retypes the block (Shusker: Construct → Plant)', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = jest.fn((prompt, validate) => {
      if (validate === validateGenerationResponse) return Promise.resolve(JSON.stringify({ ...llmFixture, name: 'Palegrasp' }));
      if (validate === validateAuditResponse) {
        return Promise.resolve(JSON.stringify({ name_grade: 'A', type_correction: 'Plant', findings: [] }));
      }
      return Promise.reject(new Error('Unexpected LLM call'));
    });
    const monster = await generateMonster2024({ ...OPTS, seedTraits: { naming: 'x' } }, callLLM);
    expect(monster.type).toBe('Plant');
  });

  test('a USER-picked type is never overridden by the audit', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = jest.fn((prompt, validate) => {
      if (validate === validateGenerationResponse) return Promise.resolve(JSON.stringify({ ...llmFixture, name: 'Palegrasp' }));
      if (validate === validateAuditResponse) {
        return Promise.resolve(JSON.stringify({ name_grade: 'A', type_correction: 'Plant', findings: [] }));
      }
      return Promise.reject(new Error('Unexpected LLM call'));
    });
    const monster = await generateMonster2024(
      { ...OPTS, seedTraits: { naming: 'x' }, resolvedType: 'Monstrosity', typeSource: 'user' }, callLLM,
    );
    expect(monster.type).toBe('Monstrosity');
  });

  test('auditTypeCorrection validates against the canonical list and no-ops on same type', () => {
    expect(auditTypeCorrection(JSON.stringify({ type_correction: 'plant' }), 'Construct')).toBe('Plant');
    expect(auditTypeCorrection(JSON.stringify({ type_correction: 'Plant' }), 'Plant')).toBeNull();
    expect(auditTypeCorrection(JSON.stringify({ type_correction: 'Robot' }), 'Construct')).toBeNull();
    expect(auditTypeCorrection(JSON.stringify({ type_correction: null }), 'Construct')).toBeNull();
  });

  test('degraded mode skips the audit entirely', async () => {
    auditEligible.mockReturnValue(true);
    const callLLM = routedLLM({ audit: AUDIT_FINDING });
    await generateMonster2024({ ...OPTS, degraded: true }, callLLM);
    expect(auditCalls(callLLM)).toHaveLength(0);
  });
});

describe('verifyAuditFindings guardrails', () => {
  const monster = {
    sections: {
      Traits: [{ name: 'Umbral Veil', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' }],
      Actions: [{ name: 'Shadow Claw', text: 'Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }],
    },
  };
  const finding = (over = {}) => ({
    principle: 2, section: 'Traits', entry: 'Umbral Veil',
    span: 'has the Invisible condition', issue: 'No end clause.',
    suggestion: 'Add one.', confidence: 'high', ...over,
  });
  const run = (...findings) => verifyAuditFindings(monster, JSON.stringify({ findings }));

  test('a verbatim span survives and maps to the fix-call shape', () => {
    const [f] = run(finding());
    expect(f).toEqual({
      rule: 'mechanical-audit', severity: 'audit',
      message: expect.stringContaining('No end clause.'),
      loc: { section: 'Traits', entry: 'Umbral Veil' },
    });
  });

  test('a span differing only in case/smart-quotes still verifies (live drop: "when" vs "When")', () => {
    const [f] = run(finding({ span: 'while in dim light or darkness, the stalker has the invisible condition.' }));
    expect(f).toBeTruthy();
  });

  test('a hallucinated span is dropped', () => {
    expect(run(finding({ span: 'the stalker phases through walls' }))).toHaveLength(0);
  });

  test('an unknown entry is dropped', () => {
    expect(run(finding({ entry: 'Void Latch' }))).toHaveLength(0);
  });

  test('a mislabeled section still resolves by entry name', () => {
    const [f] = run(finding({ section: 'Actions' }));
    expect(f.loc).toEqual({ section: 'Traits', entry: 'Umbral Veil' });
  });

  test('confidence gate: principle 5 needs high; others accept medium', () => {
    expect(run(finding({ principle: 5, confidence: 'medium' }))).toHaveLength(0);
    expect(run(finding({ principle: 2, confidence: 'medium' }))).toHaveLength(1);
    expect(run(finding({ confidence: 'low' }))).toHaveLength(0);
  });

  test('findings cap at 6', () => {
    const many = Array.from({ length: 9 }, () => finding());
    expect(run(...many)).toHaveLength(6);
  });

  test('auditNameGrade extracts a grade and tolerates absence', () => {
    expect(auditNameGrade(JSON.stringify({ name_grade: 'B', findings: [] }))).toBe('B');
    expect(auditNameGrade(JSON.stringify({ findings: [] }))).toBeNull();
    expect(auditNameGrade('junk')).toBeNull();
  });

  test('validateAuditResponse accepts empty findings and rejects junk', () => {
    expect(validateAuditResponse(JSON.stringify({ findings: [] }))).toBe(true);
    expect(validateAuditResponse(JSON.stringify({ findings: [finding()] }))).toBe(true);
    expect(validateAuditResponse(JSON.stringify({ findings: [{ principle: 9 }] }))).toBe(false);
    expect(validateAuditResponse('not json')).toBe(false);
  });
});
