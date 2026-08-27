/**
 * Staged-loading progress events (owner ask, 2026-07-30): engine numbers
 * emit before any LLM call, the draft emits before the audit (the long
 * pole), and a throwing onProgress can never break generation.
 *
 * Retargeted to the SKELETON path when the 2024 chassis retired
 * (2026-08-14) — and the retargeting immediately caught the skeleton
 * emitting its draft AFTER the audit, a live UX regression the
 * chassis-bound suite could not see.
 */
import { mount } from '@vue/test-utils';
import { generateMonster2024, validateNamingResponse } from '../format-2024/generate.mjs';
import { validateAuditResponse } from '../format-2024/audit.mjs';
import Statblock2024Skeleton from '@/components/skeletons/Statblock2024Skeleton.vue';

const routedLLM = () => jest.fn((prompt, validate) => {
  if (/Every number is already fixed/.test(prompt)) return Promise.resolve(null); // flavor: never-fail path
  if (validate === validateAuditResponse) return Promise.resolve(JSON.stringify({ findings: [] }));
  if (validate === validateNamingResponse) return Promise.resolve(JSON.stringify({ candidates: ['Stoneling', 'Gravemaw', 'Cairn Warden'] }));
  return Promise.resolve(JSON.stringify({ problems: [] }));
});

const OPTS = { concept: 'a gloom stalker', cr: 12, seed: 7, archetypeName: 'lurker', archetypeSource: 'user' };

describe('generateMonster2024 progress events', () => {

  test('chassis emits first with real engine numbers, then writing, then the draft', async () => {
    const events = [];
    await generateMonster2024({ ...OPTS, onProgress: (p) => events.push(p) }, routedLLM());
    expect(events[0].phase).toBe('chassis');
    expect(events[0].chassis.ac).toEqual(expect.any(Number));
    expect(events[0].chassis.pb).toBe(4); // CR 12
    expect(events[0].chassis.cr_str).toBe('12');
    expect(events[0].chassis.xp).toBe(8400);
    expect(events[1]).toEqual({ phase: 'status', stage: 'writing' });
    const draftIdx = events.findIndex((p) => p.phase === 'draft');
    expect(draftIdx).toBeGreaterThan(1);
    // never-fail flavor: the draft is the placeholder-rendered block, and
    // it is a REAL block — sections present, entries named
    expect(Object.values(events[draftIdx].monster.sections).flat().length).toBeGreaterThan(2);
  });

  test('the draft emits BEFORE the audit status (card visible during the long pole)', async () => {
    // caught live on retargeting: the skeleton path emitted its draft
    // AFTER the audit — the card was held through the long pole
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
    expect(typeof monster.name).toBe('string');
    expect(monster.name.length).toBeGreaterThan(0);
  });

  test('no onProgress: silent, unchanged contract', async () => {
    const monster = await generateMonster2024(OPTS, routedLLM());
    expect(typeof monster.name).toBe('string');
    expect(Object.values(monster.sections).flat().length).toBeGreaterThan(2);
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

  test('a synthesis that swallowed the prompt briefs is rejected — the field becomes the concept', () => {
    const ok = { archetype: 'skirmisher', synthesis: 'A stone warden of the sunless roads. It circles prey and drains warmth with each blow. Bloodied, it melts into the dark and returns from a new angle.' };
    expect(vSS(JSON.stringify(ok))).toBe(true);
    const echoed = { archetype: 'skirmisher', synthesis: `${ok.synthesis} Its creature type MUST be Construct: a MADE thing. ${'Name it as two words: a vivid predatory participle. '.repeat(25)}` };
    expect(vSS(JSON.stringify(echoed))).toBe(false);
  });

  test('the seed synthesis asks for signature elements — blank rolls feed the seat machinery too', () => {
    const p = buildSeedSynthesisPrompt({ intelligence: 'cunning', physical: 'sleek', silhouette: 'stalker', origin: 'a moor', creature_type: 'Monstrosity' }, { cr: 8 });
    expect(p).toMatch(/"signature_elements"/);
    expect(p).toMatch(/behavior\|body\|object\|aura/);
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
