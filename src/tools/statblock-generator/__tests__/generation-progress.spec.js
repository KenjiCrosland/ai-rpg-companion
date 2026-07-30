/**
 * Staged-loading progress events (owner ask, 2026-07-30): chassis numbers
 * emit before any LLM call, the draft emits before the audit (the long
 * pole), stage statuses mark each call boundary, and a throwing onProgress
 * can never break generation.
 */
jest.mock('../format-2024/audit.mjs', () => {
  const actual = jest.requireActual('../format-2024/audit.mjs');
  return { ...actual, auditEligible: jest.fn(actual.auditEligible) };
});

import { mount } from '@vue/test-utils';
import { generateMonster2024, validateGenerationResponse, validateNamingResponse } from '../format-2024/generate.mjs';
import { auditEligible, validateAuditResponse } from '../format-2024/audit.mjs';
import Statblock2024Skeleton from '@/components/skeletons/Statblock2024Skeleton.vue';

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

const routedLLM = () => jest.fn((prompt, validate) => {
  if (validate === validateGenerationResponse) return Promise.resolve(JSON.stringify(llmFixture));
  if (validate === validateAuditResponse) return Promise.resolve(JSON.stringify({ findings: [] }));
  if (validate === validateNamingResponse) return Promise.resolve(JSON.stringify({ candidates: ['Bad-One'] }));
  return Promise.reject(new Error('Unexpected LLM call'));
});

const OPTS = { concept: 'a gloom stalker', cr: 4, archetypeName: 'lurker', archetypeSource: 'user' };

describe('generateMonster2024 progress events', () => {
  beforeEach(() => auditEligible.mockImplementation(jest.requireActual('../format-2024/audit.mjs').auditEligible));

  test('chassis emits first with real engine numbers, then writing, then the draft', async () => {
    const events = [];
    await generateMonster2024({ ...OPTS, onProgress: (p) => events.push(p) }, routedLLM());
    expect(events[0].phase).toBe('chassis');
    expect(events[0].chassis.ac).toEqual(expect.any(Number));
    expect(events[0].chassis.pb).toBe(2); // CR 4
    expect(events[0].chassis.cr_str).toBe('4');
    expect(events[0].chassis.xp).toBe(1100);
    expect(events[1]).toEqual({ phase: 'status', stage: 'writing' });
    const draftIdx = events.findIndex((p) => p.phase === 'draft');
    expect(draftIdx).toBeGreaterThan(1);
    expect(events[draftIdx].monster.sections.Actions).toHaveLength(3);
  });

  test('the draft emits BEFORE the audit status (card visible during the long pole)', async () => {
    auditEligible.mockReturnValue(true);
    const events = [];
    await generateMonster2024({ ...OPTS, onProgress: (p) => events.push(p) }, routedLLM());
    const draftIdx = events.findIndex((p) => p.phase === 'draft');
    const auditIdx = events.findIndex((p) => p.phase === 'status' && p.stage === 'audit');
    expect(draftIdx).toBeGreaterThan(-1);
    expect(auditIdx).toBeGreaterThan(draftIdx);
  });

  test('a throwing onProgress never breaks generation', async () => {
    const monster = await generateMonster2024(
      { ...OPTS, onProgress: () => { throw new Error('display exploded'); } },
      routedLLM(),
    );
    expect(monster.name).toBe('Gloom Stalker');
  });

  test('no onProgress: silent, unchanged contract', async () => {
    const monster = await generateMonster2024(OPTS, routedLLM());
    expect(monster.name).toBe('Gloom Stalker');
  });
});

describe('Statblock2024Skeleton chassis preview', () => {
  test('renders real engine numbers inside the shimmer', () => {
    const wrapper = mount(Statblock2024Skeleton, {
      props: { chassis: { ac: 17, hp: 142, cr_str: '10', pb: 4, xp: 5900 } },
    });
    expect(wrapper.find('[data-testid="skeleton-ac"]').text()).toContain('17');
    expect(wrapper.find('[data-testid="skeleton-hp"]').text()).toContain('~142');
    expect(wrapper.find('[data-testid="skeleton-cr"]').text()).toContain('CR 10 (XP 5,900; PB +4)');
  });

  test('without chassis it is all bones', () => {
    const wrapper = mount(Statblock2024Skeleton);
    expect(wrapper.find('[data-testid="skeleton-ac"]').exists()).toBe(false);
  });
});

describe('concept-call lore threading (owner design, 2026-08-04)', () => {
  const { buildArchetypeResolvePrompt, buildSeedSynthesisPrompt, validateArchetypeResponse: vAR, validateSeedSynthesisResponse: vSS } =
    require('../format-2024/generate.mjs');

  test('validators tolerate responses with and without lore', () => {
    expect(vAR(JSON.stringify({ archetype: 'lurker', identity: 'It hunts from shadow and strikes once.', creature_type: 'Monstrosity' }))).toBe(true);
    expect(vAR(JSON.stringify({ archetype: 'lurker', identity: 'It hunts.', lore: 'Born of a drowned oath.', creature_type: 'Monstrosity' }))).toBe(true);
    expect(vSS(JSON.stringify({ archetype: 'brute', synthesis: 'A hulking mass of grave-iron that charges anything warm.' }))).toBe(true);
  });

  test('prompt builders accept CR without throwing (behavioral smoke)', () => {
    expect(typeof buildArchetypeResolvePrompt('a bog stalker', '', { cr: 4 })).toBe('string');
    expect(typeof buildSeedSynthesisPrompt({ intelligence: 'mindless (INT 1-2)', physical: 'tar-slick', silhouette: 'burrower', origin: 'a drowned swamp', creature_type: 'Ooze' }, { cr: 12 })).toBe('string');
    expect(typeof buildArchetypeResolvePrompt('a bog stalker')).toBe('string'); // legacy call shape
  });
});

describe('lore-driven naming (owner law: names are what creatures ARE)', () => {
  test('buildNamingPrompt accepts a lore field and legacy call shapes still work', () => {
    const { buildNamingPrompt } = require('../format-2024/generate.mjs');
    const m = { name: 'Palegrasp', size: 'Medium', type: 'Fey', speed: '30 ft.', sections: {} };
    expect(typeof buildNamingPrompt(m, null, [], 'a concept', null, 'Born from the last breath of a drowned oath-keeper.')).toBe('string');
    expect(typeof buildNamingPrompt(m, null, [], 'a concept')).toBe('string');
  });
});
