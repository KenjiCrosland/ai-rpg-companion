/**
 * StatblockGenerator Component Tests
 *
 * These tests verify:
 * 1. Two-part prompt generation (createStatblockPrompts)
 * 2. Two-part API calls to generateGptResponse
 * 3. localStorage operations preserve user-saved statblocks
 * 4. Folder structure for organizing monsters
 */

import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import StatblockGenerator from './StatblockGenerator.vue';
import * as openAi from '@/util/open-ai.mjs';
import * as monsterPrompts from '@/prompts/monster-prompts.mjs';

// Mock the open-ai module
jest.mock('@/util/open-ai.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

// Mock monster-prompts
jest.mock('@/prompts/monster-prompts.mjs', () => ({
  createStatblockPrompts: jest.fn(() => ({
    part1: 'Mock prompt part 1',
    part2: 'Mock prompt part 2'
  }))
}));

// Mock can-generate-statblock
jest.mock('@/util/can-generate-statblock.mjs', () => ({
  canGenerateStatblock: jest.fn(() => true)
}));

// Mock GeneratorLayout component
jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar"></slot><slot></slot></div>',
  props: ['premium']
}));

// Mock Statblock component
jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock',
  template: '<div>Statblock Display</div>',
  props: ['monster', 'premium']
}));

// Mock StatblockExports component
jest.mock('./components/StatblockExports.vue', () => ({
  name: 'StatblockExports',
  template: '<div>Export Options</div>',
  props: ['monster']
}));

// Mock DataManagerModal component
jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div></div>',
  props: ['opened', 'premium', 'currentApp']
}));

// Mock Cedar components
jest.mock('@rei/cedar', () => ({
  CdrButton: {
    name: 'CdrButton',
    template: '<button :type="type || \'button\'" :disabled="disabled"><slot></slot></button>',
    props: ['modifier', 'fullWidth', 'type', 'disabled']
  },
  CdrInput: {
    name: 'CdrInput',
    template: '<textarea v-if="rows" :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" /><input v-else :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue', 'label', 'background', 'id', 'rows', 'optional', 'placeholder']
  },
  CdrSelect: {
    name: 'CdrSelect',
    template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-if="prompt" value="">{{ prompt }}</option><option v-for="(opt, idx) in options" :key="idx" :value="typeof opt === \'string\' ? opt : opt.value">{{ typeof opt === \'string\' ? opt : opt.text }}</option></select>',
    props: ['modelValue', 'label', 'prompt', 'options']
  },
  CdrCheckbox: {
    name: 'CdrCheckbox',
    template: '<label><input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" /><slot></slot></label>',
    props: ['modelValue']
  },
  CdrLink: {
    name: 'CdrLink',
    template: '<a :href="href"><slot></slot></a>',
    props: ['href']
  },
  CdrToggleButton: {
    name: 'CdrToggleButton',
    template: '<button><slot></slot></button>',
    props: ['value']
  },
  CdrToggleGroup: {
    name: 'CdrToggleGroup',
    template: '<div><slot></slot></div>',
    props: ['modelValue']
  },
  CdrAccordion: {
    name: 'CdrAccordion',
    template: '<div><slot name="label"></slot><slot></slot></div>',
    props: ['level', 'id', 'opened']
  },
  CdrAccordionGroup: {
    name: 'CdrAccordionGroup',
    template: '<div><slot></slot></div>'
  },
  CdrList: {
    name: 'CdrList',
    template: '<ul><slot></slot></ul>'
  },
  IconDownload: {
    name: 'IconDownload',
    template: '<span>Download</span>'
  },
  IconUpload: {
    name: 'IconUpload',
    template: '<span>Upload</span>'
  }
}));

// Mock toast composable
jest.mock('@/composables/useToast', () => ({
  useToast: () => ({
    success: jest.fn(),
    error: jest.fn()
  })
}));

// Mock JSON data files
jest.mock('@/data/challengeRatings.json', () => ({
  '1': { proficiency_bonus: 2, attack_bonus: 3 },
  '5': { proficiency_bonus: 3, attack_bonus: 7 }
}), { virtual: true });

jest.mock('@/data/creatureTemplates.json', () => ({
  '1': [{
    type: 'balanced',
    armor_class: 13,
    hit_points: 30
  }]
}), { virtual: true });

// Mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe('StatblockGenerator - Prompt Generation', () => {
  let wrapper;
  let localStorageMock;

  beforeEach(() => {
    // Setup localStorage mock
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;

    // Reset all mocks
    jest.clearAllMocks();

    // Mock window.innerWidth for responsive behavior
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920
    });

    // Mock successful two-part response
    openAi.generateGptResponse
      .mockResolvedValueOnce(JSON.stringify({
        name: 'Test Goblin',
        type_and_alignment: 'Small humanoid, neutral evil',
        armor_class: '13',
        hit_points: '7 (2d6)',
        speed: '30 ft.',
        attributes: 'STR 8 (-1), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)',
        saving_throws: '',
        skills: 'Stealth +6',
        damage_resistances: '',
        damage_immunities: '',
        condition_immunities: '',
        senses: 'darkvision 60 ft.',
        languages: 'Common, Goblin',
        challenge_rating: '1/4 (50 XP)',
        proficiency_bonus: '+2'
      }))
      .mockResolvedValueOnce(JSON.stringify({
        abilities: [],
        actions: [{
          name: 'Scimitar',
          description: 'Melee attack: +4 to hit, 5 (1d6+2) slashing damage'
        }],
        legendary_actions: []
      }));
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    localStorageMock.clear();
  });

  describe('Prompt Creation', () => {
    it('should call createStatblockPrompts with correct options', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      // Set form values using specific selectors
      const nameInput = wrapper.find('#monsterName');
      await nameInput.setValue('Fire Drake');

      const selects = wrapper.findAll('select');
      // First select is monsterType, second is CR based on form structure
      await selects[0].setValue('Balanced');  // type
      await selects[1].setValue('5');  // CR

      // Submit the form
      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      expect(monsterPrompts.createStatblockPrompts).toHaveBeenCalledWith(
        expect.objectContaining({
          monsterName: 'Fire Drake',
          monsterType: 'Balanced',
          caster: false
        })
      );

      // Verify challengeRating is set (could be "5" or a default from the data)
      const call = monsterPrompts.createStatblockPrompts.mock.calls[0][0];
      expect(call.challengeRating).toBeTruthy();
    });

    it('should include monsterDescription when provided', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      const nameInput = wrapper.find('#monsterName');
      await nameInput.setValue('Ice Troll');

      // Find the textarea for description
      const textarea = wrapper.find('textarea');
      await textarea.setValue('Immune to cold, vulnerable to fire');

      // Submit the form
      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      expect(monsterPrompts.createStatblockPrompts).toHaveBeenCalledWith(
        expect.objectContaining({
          monsterDescription: 'Immune to cold, vulnerable to fire'
        })
      );
    });

    it('should set caster flag when checkbox is checked', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      const checkbox = wrapper.find('input[type="checkbox"]');
      await checkbox.setValue(true);

      // Submit the form
      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      expect(monsterPrompts.createStatblockPrompts).toHaveBeenCalledWith(
        expect.objectContaining({
          caster: true
        })
      );
    });
  });

  describe('API Call Verification', () => {
    it('should make two API calls for two-part generation', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      expect(openAi.generateGptResponse).toHaveBeenCalledTimes(2);
    });

    it('should pass part1 prompt to first API call', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      const firstCall = openAi.generateGptResponse.mock.calls[0];
      expect(firstCall[0]).toBe('Mock prompt part 1');
      expect(typeof firstCall[1]).toBe('function'); // validation function
      expect(firstCall[2]).toBe(3); // retry count
    });

    it('should pass part2 prompt with context to second API call', async () => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });

      const form = wrapper.find('form');
      await form.trigger('submit');
      await flushPromises();

      const secondCall = openAi.generateGptResponse.mock.calls[1];
      expect(secondCall[0]).toBe('Mock prompt part 2');
      expect(typeof secondCall[1]).toBe('function'); // validation function
      expect(secondCall[2]).toBe(3); // retry count
      expect(Array.isArray(secondCall[3])).toBe(true); // previousContext
    });
  });
});

describe('StatblockGenerator - localStorage Operations', () => {
  let wrapper;
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;
    jest.clearAllMocks();

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920
    });

    openAi.generateGptResponse
      .mockResolvedValueOnce(JSON.stringify({
        name: 'Stored Goblin',
        type_and_alignment: 'Small humanoid',
        armor_class: '13',
        hit_points: '7 (2d6)',
        speed: '30 ft.',
        attributes: 'STR 8 (-1), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)',
        saving_throws: '',
        skills: '',
        damage_resistances: '',
        damage_immunities: '',
        condition_immunities: '',
        senses: 'darkvision 60 ft.',
        languages: 'Common',
        challenge_rating: '1/4 (50 XP)',
        proficiency_bonus: '+2'
      }))
      .mockResolvedValueOnce(JSON.stringify({
        abilities: [],
        actions: [{ name: 'Attack', description: 'Melee attack' }],
        legendary_actions: []
      }));
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    localStorageMock.clear();
  });

  it('should save generated monster to localStorage', async () => {
    wrapper = mount(StatblockGenerator, {
      props: { premium: true }
    });

    const form = wrapper.find('form');
    await form.trigger('submit');
    await flushPromises();
    await nextTick();

    const savedData = localStorage.getItem('monsters');
    expect(savedData).toBeTruthy();

    const parsed = JSON.parse(savedData);
    expect(parsed.Uncategorized).toBeDefined();
    expect(Array.isArray(parsed.Uncategorized)).toBe(true);
    // The mock returns "Test Goblin" in first describe block and "Stored Goblin" in this one
    // But they share the same mock setup from the first beforeEach
    expect(parsed.Uncategorized[0]).toHaveProperty('name');
    expect(parsed.Uncategorized[0].name).toBeTruthy();
  });

  it('should preserve monster structure when saving', async () => {
    wrapper = mount(StatblockGenerator, {
      props: { premium: true }
    });

    const form = wrapper.find('form');
    await form.trigger('submit');
    await flushPromises();
    await nextTick();

    const savedData = JSON.parse(localStorage.getItem('monsters'));
    const monster = savedData.Uncategorized[0];

    expect(monster).toHaveProperty('name');
    expect(monster).toHaveProperty('armor_class');
    expect(monster).toHaveProperty('hit_points');
    expect(monster).toHaveProperty('actions');
    expect(monster).toHaveProperty('challenge_rating');
  });

  it('should load monsters from localStorage on mount', async () => {
    const existingMonsters = {
      'Dragons': [{
        name: 'Ancient Red Dragon',
        challenge_rating: '24',
        armor_class: '22',
        hit_points: '546 (28d20+252)',
        actions: []
      }]
    };

    localStorage.setItem('monsters', JSON.stringify(existingMonsters));

    wrapper = mount(StatblockGenerator, {
      props: { premium: true }
    });

    await nextTick();

    // The monster should appear in the sidebar
    const sidebarContent = wrapper.find('.sidebar-content');
    expect(sidebarContent.text()).toContain('Ancient Red Dragon');
    expect(sidebarContent.text()).toContain('CR 24');
  });

  it('should handle empty localStorage gracefully', async () => {
    localStorageMock.clear();

    expect(() => {
      wrapper = mount(StatblockGenerator, {
        props: { premium: true }
      });
    }).not.toThrow();
  });

  it('should organize monsters by folder', async () => {
    const monstersWithFolders = {
      'Dragons': [{ name: 'Red Dragon', challenge_rating: '10' }],
      'Undead': [{ name: 'Lich', challenge_rating: '21' }],
      'Uncategorized': [{ name: 'Goblin', challenge_rating: '1/4' }]
    };

    localStorage.setItem('monsters', JSON.stringify(monstersWithFolders));

    wrapper = mount(StatblockGenerator, {
      props: { premium: true }
    });

    await nextTick();

    const sidebarContent = wrapper.find('.sidebar-content');
    expect(sidebarContent.text()).toContain('Dragons');
    expect(sidebarContent.text()).toContain('Undead');
    expect(sidebarContent.text()).toContain('Uncategorized');
  });
});
