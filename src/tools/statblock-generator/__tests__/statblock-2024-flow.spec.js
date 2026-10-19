/**
 * 2024 flow component tests — build-order step 5 (categories 2b, 3, 5).
 *
 * Covers: format toggle default + persistence, Build↔Combat role select swap,
 * dynamic helper text, resolve-call routing (manual / auto+concept /
 * auto+blank), saved-monster fields, mixed-folder sort compat, and
 * format-follows-selection. The mocked LLM routes on the validate function
 * IDENTITY (resolve vs generation), not prompt text — per the no-prompt-
 * string-assertions rule.
 */
import { mount, flushPromises } from '@vue/test-utils';
import StatblockGenerator from '../StatblockGenerator.vue';
import * as aiClient from '@/util/ai-client.mjs';
import {
  validateArchetypeResponse, validateGenerationResponse, validateSeedSynthesisResponse,
  validateNamingResponse,
} from '../format-2024/generate.mjs';
import { validateRouteResponse } from '../reskin/route.mjs';

// ROUTE-CALL MOCKS (two calls since 2026-09-21): the route reply names a
// shelf line and QUOTES the concept (chooseLine verifies the quote against
// the input, so the mock lifts it from the prompt's own Concept line)
const conceptOf = (prompt) => (/^Concept: (.*)$/m.exec(prompt)?.[1] ?? '');
const quoteOf = (prompt) => conceptOf(prompt).split(/\s+/).slice(0, 6).join(' ');
const lineIdFor = (p) => {
  const fam = ['artillery', 'controller'].includes(p.archetype) ? 'caster' : (p.archetype ?? 'lurker');
  const style = p.style ?? p.styles?.[0]?.style ?? null;
  return p.body ?? (style ? `${fam}-${style}` : fam);
};
const routeReply = (prompt, archetypeOrPayload) => {
  const p = typeof archetypeOrPayload === 'string' ? { archetype: archetypeOrPayload } : (archetypeOrPayload ?? {});
  if (p.route) return p.route;
  return { picks: [{ line: lineIdFor(p), because: quoteOf(prompt) }], creature_type: p.creature_type, extras: (p.mechanics ?? []).map((mm) => ({ mechanic: mm, because: quoteOf(prompt) })) };
};
import { validateAuditResponse } from '../format-2024/audit.mjs';
import { validateFlavorResponse } from '../skeleton/flavor-prompt.mjs';


// These exercise the CHASSIS path, which 2024 no longer uses by default
// (owner call, 2026-08-02) but which is still reachable: 2014 generation,
// Opt in explicitly so the suite keeps testing what it was written for.

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
  isDegradedMode: jest.fn(() => false),
}));

jest.mock('@/util/can-generate-statblock.mjs', () => ({
  canGenerateStatblock: jest.fn(() => true),
}));

jest.mock('@/util/statblock-enrichment.mjs', () => ({
  enrichCustomStatblock: jest.fn(() => Promise.resolve({})),
  saveEnrichment: jest.fn(),
  deleteEnrichment: jest.fn(),
}));

jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar"></slot><slot></slot></div>',
  props: ['premium'],
}));

jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock',
  template: '<div class="statblock-2014-stub">2014 Statblock</div>',
  props: ['monster', 'premium', 'loadingPart1', 'loadingPart2', 'columns', 'width', 'linkedNpcsCount'],
}));

jest.mock('@/components/Statblock2024.vue', () => ({
  name: 'Statblock2024',
  template: '<div class="statblock-2024-stub">{{ monster ? monster.name : "loading" }}</div>',
  props: ['monster', 'columns', 'width', 'loading', 'readonly'],
}));

jest.mock('../components/StatblockExports.vue', () => ({
  name: 'StatblockExports',
  template: '<div>Export Options</div>',
  props: ['monster'],
}));

jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div></div>',
  props: ['opened', 'premium', 'currentApp'],
}));

jest.mock('@rei/cedar', () => ({
  CdrLink: { name: 'CdrLink', template: '<a><slot /></a>' },
  CdrList: { name: 'CdrList', template: '<ul><slot /></ul>' },
  IconDownload: { name: 'IconDownload', template: '<span />' },
  IconUpload: { name: 'IconUpload', template: '<span />' },
}));

jest.mock('@/composables/useToast', () => ({
  useToast: () => ({ success: jest.fn(), error: jest.fn(), info: jest.fn(), warning: jest.fn() }),
}));

// Deterministic seed: a REAL random seed can roll words that collide with the
// lurker fixture's names ("quadrupedal stalker" → "Gloom Stalker"), which the
// seed-leakage lint correctly rejects — right behavior, wrong test flake.
jest.mock('../format-2024/concept-seeds.mjs', () => ({
  ...jest.requireActual('../format-2024/concept-seeds.mjs'),
  buildRandomConceptSeed: () => ({
    intelligence: 'mindless (INT 1-2)',
    physical: 'metallic',
    silhouette: 'serpent',
    origin: 'the Abyss',
    naming: 'a single stark word: one short, heavy name',
    concept: 'a mindless (INT 1-2), metallic serpent from the Abyss.',
  }),
}));

// LLM response fixture: lurker CR 4 (lint-clean; mirrors generate-2024.spec.js).
const llmFixture = {
  name: 'Gloom Stalker',
  size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
  speed: '40 ft.',
  stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
  save_proficiencies: ['DEX'],
  skill_proficiencies: ['Stealth'],
  senses_special: 'darkvision 60 ft.',
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

function mockLLM({ resolvedArchetype = 'lurker' } = {}) {
  aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
    if (validate === validateAuditResponse) {
      return Promise.resolve(JSON.stringify({ findings: [] })); // gate opened: all CRs audit
    }
    if (validate === validateRouteResponse) {
      return Promise.resolve(JSON.stringify(routeReply(prompt, resolvedArchetype)));
    }
    if (validate === validateArchetypeResponse) {
      return Promise.resolve(JSON.stringify({ archetype: resolvedArchetype }));
    }
    if (validate === validateSeedSynthesisResponse) {
      return Promise.resolve(JSON.stringify({
        archetype: resolvedArchetype,
        synthesis: 'A pale drifting hunger that haunts the high passes.',
      }));
    }
    if (validate === validateGenerationResponse) {
      return Promise.resolve(JSON.stringify(llmFixture)); // 2014-only since the retirement
    }
    if (/Every number is already fixed/.test(prompt)) {
      return Promise.resolve(null); // skeleton flavor: never-fail placeholder path
    }
    if (validate === validateNamingResponse) {
      // All candidates fail the deterministic filters (hyphens) so the
      // provisional fixture name survives and assertions stay stable.
      return Promise.resolve(JSON.stringify({ candidates: ['Bad-One', 'Bad-Two', 'Bad-Three'] }));
    }
    return Promise.reject(new Error('Unexpected LLM call in 2024 flow test'));
  });
}

const mountGenerator = () => mount(StatblockGenerator, { props: { premium: true } });

async function setCR(wrapper, value) {
  const crSelect = wrapper.findAll('select').find((s) =>
    s.findAll('option').some((o) => o.element.value === value)
  );
  await crSelect.setValue(value);
}

async function generate(wrapper) {
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();
}

const savedMonsters = () => JSON.parse(localStorage.getItem('monsters') ?? '{}');

describe('StatblockGenerator 2024 flow', () => {
  beforeEach(() => {
    localStorage.clear();
    // Re-set after the clear: this suite exercises the CHASSIS path.
    // The suite's test role is 'lurker', which grew a reskin family
    // (2026-09-04) — the kill switch keeps these on the slot path they
    // were written to exercise.
    localStorage.setItem('statblock-reskin-lurker', '0');
    jest.clearAllMocks();
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // un-spy Math.random between tests
  });

  describe('form behavior', () => {
    // The selects are told apart by their options ("Stronger Defense" is
    // 2014-Build-only, "lurker" is archetype-only) — the page prose contains
    // the word "Build", so text-level assertions would false-positive.
    const hasOption = (wrapper, value) =>
      wrapper.findAll('option').some((o) => o.element.value === value || o.text() === value);

    test('defaults to 2024: archetype select shown, Build hidden', () => {
      const wrapper = mountGenerator();
      expect(hasOption(wrapper, 'lurker')).toBe(true);
      expect(hasOption(wrapper, 'Stronger Defense')).toBe(false);
      wrapper.unmount();
    });

    test('2014 mode also shows the Combat role select (Build is retired)', () => {
      localStorage.setItem('statblock-format', '2014');
      const wrapper = mountGenerator();
      expect(hasOption(wrapper, 'lurker')).toBe(true);
      expect(hasOption(wrapper, 'Stronger Defense')).toBe(false);
      wrapper.unmount();
    });

    test('flipping the rules switch persists the choice', async () => {
      const wrapper = mountGenerator();
      const rulesSwitch = wrapper.find('[data-testid="rules-switch"]');
      expect(rulesSwitch.attributes('aria-checked')).toBe('true'); // 2024 default
      await rulesSwitch.trigger('click');
      expect(localStorage.getItem('statblock-format')).toBe('2014');
      expect(rulesSwitch.attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    test('helper text follows the selected archetype', async () => {
      const wrapper = mountGenerator();
      expect(wrapper.text()).toContain("pick the role that best fits");
      const roleSelect = wrapper.findAll('select').find((s) =>
        s.findAll('option').some((o) => o.element.value === 'lurker')
      );
      await roleSelect.setValue('lurker');
      expect(wrapper.text()).toContain('ambusher with a devastating opening strike');
      wrapper.unmount();
    });
  });

  describe('resolve-call routing', () => {
    test('manual archetype: resolve runs with the role as GIVEN, archetype_source user', async () => {
      mockLLM();
      const wrapper = mountGenerator();
      const roleSelect = wrapper.findAll('select').find((s) =>
        s.findAll('option').some((o) => o.element.value === 'lurker')
      );
      await roleSelect.setValue('lurker');
      await setCR(wrapper, '4');
      await generate(wrapper);

      // resolve (user role passes as GIVEN — owner call 2026-08-04) +
      // skeleton flavor + naming pass (audit CR-gated below eligibility here)
      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(4); // route + identity + flavor + naming
      const saved = savedMonsters().Uncategorized[0];
      expect(saved.archetype).toBe('lurker');
      expect(saved.archetype_source).toBe('user');
      wrapper.unmount();
    });

    test('auto + concept: resolve call first, then generation', async () => {
      mockLLM({ resolvedArchetype: 'lurker' });
      const wrapper = mountGenerator();
      await wrapper.find('input#monsterName').setValue('Gloom Stalker');
      await setCR(wrapper, '4');
      await generate(wrapper);

      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(4); // route + identity + flavor + naming
      expect(aiClient.generateGptResponse.mock.calls[0][1]).toBe(validateRouteResponse); // the route call runs first
      expect(aiClient.generateGptResponse.mock.calls[1][1]).toBe(validateArchetypeResponse);
      expect(aiClient.generateGptResponse.mock.calls[2][1]).toBe(validateFlavorResponse);
      const saved = savedMonsters().Uncategorized[0];
      expect(saved.archetype).toBe('lurker');
      expect(saved.archetype_source).toBe('auto');
      wrapper.unmount();
    });

    test('auto + blank inputs: a random concept seed feeds the resolve call', async () => {
      mockLLM({ resolvedArchetype: 'lurker' });
      const wrapper = mountGenerator();
      await setCR(wrapper, '4');
      await generate(wrapper);

      // Blank form: synthesis micro-call → skeleton flavor → (audit when the
      // random skeleton crosses eligibility — no seed input exists on the
      // blank form, so that coin flip is genuinely random) → naming.
      // The tail is conditional both ways on the skeleton path (audit by
      // CR/shape eligibility, naming by the audit's name-grade gate), and
      // the blank form has no seed input to pin the coin flips. This test's
      // intent is the HEAD: the random seed feeds the resolve call, and the
      // skeleton flavor call follows it.
      const calls = aiClient.generateGptResponse.mock.calls;
      expect(calls.length).toBeGreaterThanOrEqual(2);
      expect(calls[0][1]).toBe(validateSeedSynthesisResponse);
      expect(calls[1][1]).toBe(validateRouteResponse); // blank path: synthesis first, then route on the fused creature
      expect(calls[2][1]).toBe(validateFlavorResponse);
      const saved = savedMonsters().Uncategorized[0];
      expect(saved.archetype).toBe('lurker');
      expect(saved.archetype_source).toBe('auto');
      wrapper.unmount();
    });
  });

  describe('saved monster and display', () => {
    test('generated monster carries 2024 fields and renders the 2024 card', async () => {
      mockLLM();
      const wrapper = mountGenerator();
      await wrapper.find('input#monsterName').setValue('Gloom Stalker');
      await setCR(wrapper, '4');
      await generate(wrapper);

      const saved = savedMonsters().Uncategorized[0];
      expect(saved.format).toBe('2024');
      expect(saved.challenge_rating).toBe('4 (XP 1,100; PB +2)');
      expect(saved.hp).toEqual(expect.any(Number)); // engine-owned, path-specific
      expect(saved.selectedChallengeRating).toBe('4');
      expect(wrapper.find('.statblock-2024-stub').exists()).toBe(true);
      expect(wrapper.find('.statblock-2014-stub').exists()).toBe(false);
      wrapper.unmount();
    });

    test('mixed folder stays sorted by CR across formats', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [{ name: 'Old Wolf', challenge_rating: '2 (450 XP)' }],
      }));
      mockLLM({ resolvedArchetype: 'lurker' }); // blank form resolves from the seed
      const wrapper = mountGenerator();
      await setCR(wrapper, '4');
      await generate(wrapper);

      const names = savedMonsters().Uncategorized.map((m) => m.name);
      expect(names).toEqual(['Old Wolf', 'Unnamed Creature']); // CR 2 before CR 4
      wrapper.unmount();
    });

    test('a neighbor without challenge_rating never crashes the save-time CR sort', async () => {
      // Live crash: pre-stamp 2024 saves lack challenge_rating; sorting the
      // folder on the NEXT save (any edition) hit fractionToDecimal(null).
      // Numeric `cr` backstops the sort; a stamped label is backfilled on load.
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [{ name: 'Prestamp Horror', format: '2024', cr: 10, cr_str: '10', xp: 5900, pb: 4 }],
      }));
      mockLLM({ resolvedArchetype: 'lurker' });
      const wrapper = mountGenerator();
      await setCR(wrapper, '4');
      await generate(wrapper);

      const saved = savedMonsters().Uncategorized;
      expect(saved.map((m) => m.name)).toEqual(['Unnamed Creature', 'Prestamp Horror']); // CR 4 before CR 10
      expect(saved.find((m) => m.name === 'Prestamp Horror').challenge_rating)
        .toBe('10 (XP 5,900; PB +4)'); // backfilled label persisted with the save
      wrapper.unmount();
    });

    test('selecting a saved monster follows its format', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [
          { name: 'Old Wolf', challenge_rating: '2 (450 XP)' },
          { name: 'New Stalker', format: '2024', archetype: 'lurker', archetype_source: 'auto', challenge_rating: '4 (XP 1,100; PB +2)' },
        ],
      }));
      const wrapper = mountGenerator();
      await flushPromises(); // sidebar rows render a tick after onMounted loads storage

      const rowFor = (name) =>
        wrapper.findAll('.statblock-row__button').find((b) => b.text().includes(name));

      await rowFor('Old Wolf').trigger('click');
      expect(wrapper.find('.statblock-2014-stub').exists()).toBe(true);
      expect(localStorage.getItem('statblock-format')).toBe('2014');

      await rowFor('New Stalker').trigger('click');
      expect(wrapper.find('.statblock-2024-stub').exists()).toBe(true);
      expect(localStorage.getItem('statblock-format')).toBe('2024');
      wrapper.unmount();
    });
  });

  describe('edition switch (cache-and-swap)', () => {
    // A saved engine-2024 monster, complete enough for the deterministic
    // shape mapping (toLegacyModel) that backs the blurred preview.
    const stalker2024 = () => ({
      name: 'Gloom Stalker', format: '2024',
      size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
      ac: 14, hp: 59, hp_formula: '13d8 + 1', speed: '40 ft.',
      stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
      saves: { STR: 1, DEX: 5, CON: 1, INT: -2, WIS: 2, CHA: -1 },
      senses: 'darkvision 60 ft.; Passive Perception 14',
      cr: 4, cr_str: '4', xp: 1100, pb: 2,
      challenge_rating: '4 (XP 1,100; PB +2)',
      archetype: 'lurker', archetype_source: 'user',
      sections: {
        Traits: [{ name: 'Umbral Veil', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' }],
        Actions: [
          { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
          { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
        ],
      },
    });

    const conversion2014 = {
      Traits: [{ name: 'Umbral Veil', text: 'While in dim light or darkness, the stalker is invisible.' }],
      Actions: [
        { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
        { name: 'Shadow Claw', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
      ],
    };

    const mountWithStalker = async (monster = stalker2024()) => {
      localStorage.setItem('monsters', JSON.stringify({ Uncategorized: [monster] }));
      const wrapper = mountGenerator();
      await flushPromises();
      await wrapper.findAll('.statblock-row__button')
        .find((b) => b.text().includes('Gloom Stalker')).trigger('click');
      return wrapper;
    };

    // The edition switcher is a ParTabToggle: click the tab for the printing.
    const clickEditionTab = (wrapper, label) =>
      wrapper.find('[data-testid="edition-switch"]')
        .findAll('button').find((b) => b.text().includes(label)).trigger('click');

    test('flipping to a missing edition shows the blurred preview; flipping back leaves it — no call, no storage change', async () => {
      const wrapper = await mountWithStalker();
      expect(wrapper.find('[data-testid="edition-preview"]').exists()).toBe(false);

      await clickEditionTab(wrapper, '2014 rules');
      const preview = wrapper.find('[data-testid="edition-preview"]');
      expect(preview.exists()).toBe(true);
      expect(preview.find('.statblock-2014-stub').exists()).toBe(true); // deterministic target-shape card
      expect(preview.find('[data-testid="convert-edition"]').text()).toContain('Convert to 2014');
      expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
      expect(savedMonsters().Uncategorized[0].format).toBe('2024'); // nothing persisted

      await clickEditionTab(wrapper, '2024 rules');
      expect(wrapper.find('[data-testid="edition-preview"]').exists()).toBe(false);
      expect(wrapper.find('.statblock-2024-stub').exists()).toBe(true);
      wrapper.unmount();
    });

    test('Convert meters through the generation quota: gate consulted, denial blocks the call', async () => {
      const { canGenerateStatblock } = require('@/util/can-generate-statblock.mjs');
      canGenerateStatblock.mockClear();
      const wrapper = await mountWithStalker();
      await clickEditionTab(wrapper, '2014 rules');

      // Quota denied (free user at the daily cap): no LLM call, preview stays.
      canGenerateStatblock.mockResolvedValueOnce(false);
      await wrapper.find('[data-testid="convert-edition"]').trigger('click');
      await flushPromises();
      expect(canGenerateStatblock).toHaveBeenCalledWith(true); // premium flag forwarded
      expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
      expect(wrapper.find('[data-testid="edition-preview"]').exists()).toBe(true);
      expect(savedMonsters().Uncategorized[0].format).toBe('2024');

      // Quota available: the conversion proceeds.
      aiClient.generateGptResponse.mockResolvedValue(JSON.stringify(conversion2014));
      await wrapper.find('[data-testid="convert-edition"]').trigger('click');
      await flushPromises();
      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      expect(savedMonsters().Uncategorized[0].format).toBe('2014');
      wrapper.unmount();
    });

    test('Convert fills the cache and swaps; later flips are instant with no calls', async () => {
      aiClient.generateGptResponse.mockResolvedValue(JSON.stringify(conversion2014));
      const wrapper = await mountWithStalker();

      await clickEditionTab(wrapper, '2014 rules');
      await wrapper.find('[data-testid="convert-edition"]').trigger('click');
      await flushPromises();

      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      expect(wrapper.find('[data-testid="edition-preview"]').exists()).toBe(false);
      expect(wrapper.find('.statblock-2014-stub').exists()).toBe(true);
      let saved = savedMonsters().Uncategorized[0];
      expect(saved.format).toBe('2014');
      expect(saved.actions.find((a) => a.name === 'Shadow Claw').description).toContain('to hit');
      expect(saved.other_edition.format).toBe('2024'); // original cached, verbatim
      expect(saved.other_edition.sections.Actions[1].text).toContain('*Melee Attack Roll:*');

      // Flip back: instant swap from the cache — no preview, no second call.
      await clickEditionTab(wrapper, '2024 rules');
      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      expect(wrapper.find('[data-testid="edition-preview"]').exists()).toBe(false);
      expect(wrapper.find('.statblock-2024-stub').exists()).toBe(true);
      saved = savedMonsters().Uncategorized[0];
      expect(saved.format).toBe('2024');
      expect(saved.other_edition.format).toBe('2014');
      wrapper.unmount();
    });

    test('editing the active edition invalidates the cached conversion', async () => {
      const monster = stalker2024();
      monster.other_edition = { name: 'Gloom Stalker', format: '2014', abilities: [], actions: [] };
      const wrapper = await mountWithStalker(monster);

      const card = wrapper.findComponent({ name: 'Statblock2024' });
      card.vm.$emit('update-monster', { ...stalker2024(), hp: 70, other_edition: monster.other_edition });
      await flushPromises();

      expect(savedMonsters().Uncategorized[0].hp).toBe(70);
      expect(savedMonsters().Uncategorized[0].other_edition).toBeUndefined();
      wrapper.unmount();
    });
  });
});

// THE 2014 MOVE (owner go 2026-09-14): a 2014-format generation rides the
// reskin pipeline, then one lint-gated convertEdition call rewrites the
// phrasing — both printings save. The reskin module is mocked here (its
// own suite owns its behavior); these tests own the ROUTING + conversion.
jest.mock('../reskin/generate.mjs', () => ({ generateReskin: jest.fn() }));
const reskinMod = require('../reskin/generate.mjs');

describe('the 2014 move: reskin-first 2014 (2026-09-14)', () => {
  const reskinStalker = () => ({
    name: 'Gloom Stalker', format: '2024',
    size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
    ac: 14, hp: 59, hp_formula: '13d8 + 1', speed: '40 ft.',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
    saves: { STR: 1, DEX: 5, CON: 1, INT: -2, WIS: 2, CHA: -1 },
    senses: 'darkvision 60 ft.; Passive Perception 14',
    cr: 4, cr_str: '4', xp: 1100, pb: 2,
    challenge_rating: '4 (XP 1,100; PB +2)',
    archetype: 'lurker', archetype_source: 'user',
    generation: { donor: 'lurker-3', signature: 'custom' },
    sections: {
      Traits: [{ name: 'Umbral Veil', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' }],
      Actions: [
        { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
        { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
      ],
    },
  });
  const conversionPayload = {
    Traits: [{ name: 'Umbral Veil', text: 'While in dim light or darkness, the stalker is invisible.' }],
    Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
      { name: 'Shadow Claw', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
    ],
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem('statblock-format', '2014');
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
  });

  test('a 2014-format generation routes the reskin, converts once, and saves both printings', async () => {
    reskinMod.generateReskin.mockResolvedValue(reskinStalker());
    aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
      if (validate === validateRouteResponse) return Promise.resolve(JSON.stringify(routeReply(prompt, 'lurker')));
      if (validate === validateArchetypeResponse) return Promise.resolve(JSON.stringify({ archetype: 'lurker' }));
      return Promise.resolve(JSON.stringify(conversionPayload)); // the conversion call
    });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('Gloom Stalker');
    await setCR(wrapper, '4');
    await generate(wrapper);

    expect(reskinMod.generateReskin).toHaveBeenCalledTimes(1);
    const saved = savedMonsters().Uncategorized[0];
    expect(saved.format).toBe('2014');
    expect(saved.actions.find((a) => a.name === 'Shadow Claw').description).toContain('to hit');
    expect(saved.other_edition.format).toBe('2024');
    expect(saved.other_edition.sections.Actions[1].text).toContain('*Melee Attack Roll:*');
    wrapper.unmount();
  });

  test('the kill switch restores the slot path — generateReskin never called', async () => {
    // the routing is the claim; the slot path's own fixtures live in its
    // suite, so its calls simply fail here and the error path runs
    localStorage.setItem('statblock-reskin-2014', '0');
    aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
      if (validate === validateRouteResponse) return Promise.resolve(JSON.stringify(routeReply(prompt, 'lurker')));
      if (validate === validateArchetypeResponse) return Promise.resolve(JSON.stringify({ archetype: 'lurker' }));
      return Promise.reject(new Error('slot path reached — fixtures live in its own suite'));
    });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('Gloom Stalker');
    await setCR(wrapper, '4');
    await generate(wrapper);

    expect(reskinMod.generateReskin).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test('conversion failure NEVER fails the generation — the deterministic shape ships with the 2024 original cached', async () => {
    reskinMod.generateReskin.mockResolvedValue(reskinStalker());
    aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
      if (validate === validateRouteResponse) return Promise.resolve(JSON.stringify(routeReply(prompt, 'lurker')));
      if (validate === validateArchetypeResponse) return Promise.resolve(JSON.stringify({ archetype: 'lurker' }));
      return Promise.reject(new Error('Failed to generate a valid response. Please try again later.'));
    });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('Gloom Stalker');
    await setCR(wrapper, '4');
    await generate(wrapper);

    const saved = savedMonsters().Uncategorized[0];
    expect(saved.format).toBe('2014'); // toLegacyModel deterministic shape
    const claw = saved.actions.find((a) => a.name === 'Shadow Claw');
    expect(claw).toBeTruthy(); // the card renders inline markdown now — markers survive (owner 2026-09-14)
    expect(saved.other_edition.format).toBe('2024');
    wrapper.unmount();
  });

  test("a saved 'caster' archetype never crashes the conversion — the Tollkeeper class dies", async () => {
    // the reskin's internal family name reached convertEdition's chassis
    // lookup and threw (live, 2026-09-14); the conversion now falls back
    // to the balanced chassis
    const m = reskinStalker();
    m.archetype = 'caster';
    reskinMod.generateReskin.mockResolvedValue(m);
    aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
      if (validate === validateRouteResponse) return Promise.resolve(JSON.stringify(routeReply(prompt, 'lurker')));
      if (validate === validateArchetypeResponse) return Promise.resolve(JSON.stringify({ archetype: 'lurker' }));
      return Promise.resolve(JSON.stringify(conversionPayload));
    });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('Gloom Stalker');
    await setCR(wrapper, '4');
    await generate(wrapper);

    const saved = savedMonsters().Uncategorized[0];
    expect(saved.format).toBe('2014');
    expect(saved.actions.find((a) => a.name === 'Shadow Claw').description).toContain('to hit'); // REAL conversion, not the degrade
    wrapper.unmount();
  });
});

describe('routing contradiction belt (2026-09-15): physical artillery is a thrower', () => {
  // the Cliff Troll landed on caster-6 TWICE — once when hurler dropped
  // at STYLE_HOME (artillery isn't its home family), once when resolve
  // dropped the style entirely. The damage mix carries the contradiction
  // deterministically: a caster seat claiming purely physical damage.
  const reskinTroll = () => ({
    name: 'Cliff Troll', format: '2024',
    size: 'Large', type: 'Giant', alignment: 'Neutral',
    ac: 15, hp: 75, hp_formula: '10d10 + 20', speed: '30 ft.',
    stats: { STR: 18, DEX: 12, CON: 14, INT: 7, WIS: 12, CHA: 7 },
    saves: { STR: 7, DEX: 1, CON: 2, INT: -2, WIS: 1, CHA: -2 },
    senses: 'darkvision 60 ft.; Passive Perception 14',
    cr: 5, cr_str: '5', xp: 1800, pb: 3,
    challenge_rating: '5 (XP 1,800; PB +3)',
    archetype: 'skirmisher', archetype_source: 'auto',
    generation: { donor: 'skirmisher-5-hurler', signature: 'custom' },
    sections: {
      Actions: [{ name: 'Slab Hurl', text: '*Ranged Attack Roll:* +7, range 60/240 ft. 15 (2d10 + 4) Bludgeoning damage.' }],
    },
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem('statblock-format', '2024');
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
  });

  const resolveWith = (payload) => {
    reskinMod.generateReskin.mockResolvedValue(reskinTroll());
    aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
      if (validate === validateRouteResponse) return Promise.resolve(JSON.stringify(routeReply(prompt, payload)));
      if (validate === validateArchetypeResponse) return Promise.resolve(JSON.stringify(payload));
      return Promise.resolve(JSON.stringify({ findings: [], candidates: [] }));
    });
  };

  test('a provided_name that is the whole input is a description, not a name (item F)', async () => {
    const input = 'a scarecrow that only moves when nobody is looking';
    resolveWith({ archetype: 'lurker', provided_name: input });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue(input);
    await setCR(wrapper, '4');
    await generate(wrapper);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName).toBeNull();
    wrapper.unmount();
  });

  // THE CRITIC'S A3 (owner, 2026-10-18): with a Name in the Name box and a description
  // in the textarea, the Name is a closed fact — the call's `provided_name` is not
  // consulted. "Purple Worm" + "that swallowed a war-band's armoury" shipped as Gutforge.
  test('a Name beside a description is the name, whatever the call says about it', async () => {
    resolveWith({ archetype: 'brute' }); // no provided_name at all — the call "did not see a name"
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('Purple Worm');
    await wrapper.find('textarea').setValue("that swallowed a war-band's armoury");
    await setCR(wrapper, '15');
    await generate(wrapper);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName).toBe('Purple Worm');
    wrapper.unmount();
  });

  test('a short provided_name inside a longer input is still honoured, article stripped', async () => {
    resolveWith({ archetype: 'brute', provided_name: 'the Brazen Bull' });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('the Brazen Bull, a brass construct that charges through market stalls');
    await setCR(wrapper, '5');
    await generate(wrapper);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName).toBe('Brazen Bull');
    wrapper.unmount();
  });

  test('a lowercase fragment of a description is never a provided name; a capitalized one, or a short input, is', async () => {
    resolveWith({ archetype: 'brute', style: 'charger', provided_name: 'brass bull' });
    const w1 = mountGenerator();
    await w1.find('input#monsterName').setValue('a brass bull that charges down anyone who enters its pen');
    await setCR(w1, '5');
    await generate(w1);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName ?? null).toBeNull();
    w1.unmount();

    jest.clearAllMocks();
    resolveWith({ archetype: 'brute', style: 'charger', provided_name: 'Brazen Bull' });
    const w2 = mountGenerator();
    await w2.find('input#monsterName').setValue('Brazen Bull - a brass bull that charges down anyone who enters its pen');
    await setCR(w2, '5');
    await generate(w2);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName).toBe('Brazen Bull');
    w2.unmount();

    jest.clearAllMocks();
    resolveWith({ archetype: 'brute', style: 'charger', provided_name: 'brazen bull' });
    const w3 = mountGenerator();
    await w3.find('input#monsterName').setValue('brazen bull');
    await setCR(w3, '5');
    await generate(w3);
    expect(reskinMod.generateReskin.mock.calls[0][0].fixedName).toBe('brazen bull');
    w3.unmount();
  });

  test('the route call runs first and the identity call is conditioned on the routed line', async () => {
    resolveWith({ route: { picks: [{ line: 'brute-charger', because: 'charges down anyone who enters' }], creature_type: 'Construct' }, identity: 'It paws once, then thunders down the first thing across the threshold.' });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('A brass bull that charges down anyone who enters its pen');
    await setCR(wrapper, '5');
    await generate(wrapper);
    const calls = aiClient.generateGptResponse.mock.calls;
    expect(calls[0][1]).toBe(validateRouteResponse);
    expect(calls[0][0]).toMatch(/THE SHELF/);
    expect(calls[1][1]).toBe(validateArchetypeResponse);
    expect(calls[1][0]).toMatch(/CHASSIS: this creature has been routed onto the "brute-charger"/);
    expect(calls[1][0]).toMatch(/Creature type: Construct/);
    expect(reskinMod.generateReskin.mock.calls[0][0]).toMatchObject({ archetype: 'brute', style: 'charger', resolvedType: 'Construct', mechanics: [] });
    wrapper.unmount();
  });

  test('a grappler pick carries the engulf engine to brute (the toad, the iron maiden)', async () => {
    resolveWith({ route: { picks: [{ line: 'brute-grappler', because: 'drags victims under the mire' }], creature_type: 'Giant' } });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('A bog troll that drags victims under the mire');
    await setCR(wrapper, '8');
    await generate(wrapper);
    expect(reskinMod.generateReskin.mock.calls[0][0]).toMatchObject({ archetype: 'brute', style: 'grappler', mechanics: ['grapple', 'engulf'] });
    wrapper.unmount();
  });

  test('a pick whose quote is not in the input falls to the NEXT pick, never to a plain line', async () => {
    resolveWith({ route: { picks: [{ line: 'ooze', because: 'an amorphous mass of tar' }, { line: 'brute-grappler', because: 'drags cattle into the bog' }], creature_type: 'Beast' } });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('A tar-mouthed toad the size of a cart that drags cattle into the bog');
    await setCR(wrapper, '5');
    await generate(wrapper);
    const a = reskinMod.generateReskin.mock.calls[0][0];
    expect(a.bodyType).toBeNull();
    expect(a).toMatchObject({ archetype: 'brute', style: 'grappler' });
    wrapper.unmount();
  });

  test('a caster-binder pick records the controller menu role and its binder prior', async () => {
    resolveWith({ route: { picks: [{ line: 'caster-binder', because: 'curses the unbelievers from the pulpit' }], creature_type: 'Undead' } });
    const wrapper = mountGenerator();
    await wrapper.find('input#monsterName').setValue('A wax preacher that curses the unbelievers from the pulpit');
    await setCR(wrapper, '6');
    await generate(wrapper);
    expect(reskinMod.generateReskin.mock.calls[0][0]).toMatchObject({ archetype: 'caster', menuRole: 'controller', stylePrior: 'binder', style: 'binder' });
    wrapper.unmount();
  });

  test('a swarm pick ships the swarm body; "swarm of" derives it even when the route misses', async () => {
    resolveWith({ route: { picks: [{ line: 'swarm', because: 'a swarm of grave beetles' }] } });
    const w1 = mountGenerator();
    await w1.find('input#monsterName').setValue('A swarm of grave beetles that strips a body to bone');
    await setCR(w1, '3');
    await generate(w1);
    expect(reskinMod.generateReskin.mock.calls[0][0]).toMatchObject({ archetype: 'swarm', bodyType: 'swarm' });
    w1.unmount();

    jest.clearAllMocks();
    resolveWith({ route: { picks: [{ line: 'lurker', because: 'strips a body to bone' }] } });
    const w2 = mountGenerator();
    await w2.find('input#monsterName').setValue('A swarm of grave beetles that strips a body to bone');
    await setCR(w2, '3');
    await generate(w2);
    expect(reskinMod.generateReskin.mock.calls[0][0]).toMatchObject({ bodyType: 'swarm' });
    w2.unmount();
  });

  test('a route that names nothing on the shelf still generates — a plain line ships (never-fail)', async () => {
    resolveWith({ route: { picks: [{ line: 'ninja', because: 'x' }] } });
    const wrapper = mountGenerator();
    const roleSelect = wrapper.findAll('select').find((sel) => sel.findAll('option').some((op) => op.attributes('value') === 'brute'));
    await roleSelect.setValue('brute');
    await wrapper.find('input#monsterName').setValue('A thing');
    await setCR(wrapper, '5');
    await generate(wrapper);
    const a = reskinMod.generateReskin.mock.calls[0][0];
    expect(a).toMatchObject({ archetype: 'brute' });
    expect(a.style ?? null).toBeNull();
    wrapper.unmount();
  });
});
