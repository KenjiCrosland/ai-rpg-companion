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
  validateArchetypeResponse, validateGenerationResponse,
} from '../format-2024/generate.mjs';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
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
  useToast: () => ({ success: jest.fn(), error: jest.fn() }),
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
      { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage.' },
      { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
    ],
  },
};

function mockLLM({ resolvedArchetype = 'lurker' } = {}) {
  aiClient.generateGptResponse.mockImplementation((prompt, validate) => {
    if (validate === validateArchetypeResponse) {
      return Promise.resolve(JSON.stringify({ archetype: resolvedArchetype }));
    }
    if (validate === validateGenerationResponse) {
      return Promise.resolve(JSON.stringify(llmFixture));
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

    test('switching the toggle persists the choice', async () => {
      const wrapper = mountGenerator();
      const button2014 = wrapper.findAll('button').find((b) => b.text().includes('2014 rules'));
      await button2014.trigger('click');
      expect(localStorage.getItem('statblock-format')).toBe('2014');
      expect(wrapper.text()).toContain('Build');
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
    test('manual archetype: one LLM call, archetype_source user', async () => {
      mockLLM();
      const wrapper = mountGenerator();
      const roleSelect = wrapper.findAll('select').find((s) =>
        s.findAll('option').some((o) => o.element.value === 'lurker')
      );
      await roleSelect.setValue('lurker');
      await setCR(wrapper, '4');
      await generate(wrapper);

      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
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

      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(2);
      expect(aiClient.generateGptResponse.mock.calls[0][1]).toBe(validateArchetypeResponse);
      expect(aiClient.generateGptResponse.mock.calls[1][1]).toBe(validateGenerationResponse);
      const saved = savedMonsters().Uncategorized[0];
      expect(saved.archetype).toBe('lurker');
      expect(saved.archetype_source).toBe('auto');
      wrapper.unmount();
    });

    test('auto + blank inputs: no resolve call, random client-side pick', async () => {
      mockLLM();
      // Pin the random pick to lurker (index 5 of 8) so the lurker-shaped
      // LLM fixture assembles lint-clean.
      jest.spyOn(Math, 'random').mockReturnValue(5 / 8);
      const wrapper = mountGenerator();
      await setCR(wrapper, '4');
      await generate(wrapper);

      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      expect(aiClient.generateGptResponse.mock.calls[0][1]).toBe(validateGenerationResponse);
      expect(savedMonsters().Uncategorized[0].archetype_source).toBe('auto');
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
      expect(saved.hp).toBe(59); // engine number, not LLM's
      expect(saved.selectedChallengeRating).toBe('4');
      expect(wrapper.find('.statblock-2024-stub').exists()).toBe(true);
      expect(wrapper.find('.statblock-2014-stub').exists()).toBe(false);
      wrapper.unmount();
    });

    test('mixed folder stays sorted by CR across formats', async () => {
      localStorage.setItem('monsters', JSON.stringify({
        Uncategorized: [{ name: 'Old Wolf', challenge_rating: '2 (450 XP)' }],
      }));
      mockLLM();
      jest.spyOn(Math, 'random').mockReturnValue(5 / 8); // pin auto-pick to lurker
      const wrapper = mountGenerator();
      await setCR(wrapper, '4');
      await generate(wrapper);

      const names = savedMonsters().Uncategorized.map((m) => m.name);
      expect(names).toEqual(['Old Wolf', 'Gloom Stalker']); // CR 2 before CR 4
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
});
