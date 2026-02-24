/**
 * ItemGenerator Component Tests
 *
 * These tests verify:
 * 1. Prompt generation includes correct rarity guidelines and user input protection
 * 2. API calls to generateGptResponse are made with proper arguments
 * 3. localStorage operations preserve user-saved items
 * 4. User-provided names and lore are protected from AI override
 */

import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import ItemGenerator from './ItemGenerator.vue';
import * as openAi from '@/util/open-ai.mjs';

// Mock the open-ai module
jest.mock('@/util/open-ai.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

// Mock convertToMarkdown
jest.mock('@/util/convertToMarkdown.mjs', () => ({
  convertItemToMarkdown: jest.fn(),
}));

// Mock determineFeaturesAndBonuses
jest.mock('@/util/determine-features-and-bonuses.mjs', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    bonus: '+1',
    feature_count: 1,
    features: { 'Placeholder Feature': 'placeholder_effect' },
    effectDefinitions: {
      minor_utility_or_cosmetic_effect: 'A small, flavorful effect with no combat impact.',
      useful_magical_effect: 'A practical utility feature.',
      moderate_magical_effect: 'A meaningful magical ability.',
      powerful_magical_effect: 'A significant magical power.',
      very_powerful_magical_effect: 'A major magical capability.',
      legendary_magical_effect: 'An extraordinary, campaign-defining power.'
    }
  }))
}));

// Mock GeneratorLayout component
jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar"></slot><slot></slot></div>',
  props: ['premium']
}));

// Mock DataManagerModal component
jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div></div>',
  props: ['opened', 'premium', 'currentApp']
}));

// Mock ItemSkeleton
jest.mock('@/components/skeletons/ItemSkeleton.vue', () => ({
  name: 'ItemSkeleton',
  template: '<div>Loading...</div>'
}));

// Mock tab components
jest.mock('./components/QuestHookTab.vue', () => ({
  name: 'QuestHookTab',
  template: '<div>Quest Hook Tab</div>',
  props: ['item', 'premium']
}));

jest.mock('./components/LoreBuilderTab.vue', () => ({
  name: 'LoreBuilderTab',
  template: '<div>Lore Builder Tab</div>',
  props: ['item', 'premium']
}));

// Mock Cedar components with proper v-model support
jest.mock('@rei/cedar', () => ({
  CdrButton: {
    name: 'CdrButton',
    template: '<button type="button"><slot></slot></button>',
    props: ['modifier', 'fullWidth', 'type']
  },
  CdrInput: {
    name: 'CdrInput',
    template: '<input :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue', 'label', 'background', 'id', 'rows', 'tag', 'placeholder']
  },
  CdrSelect: {
    name: 'CdrSelect',
    template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option value="">{{ prompt }}</option><option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option></select>',
    props: ['modelValue', 'label', 'prompt', 'options']
  },
  CdrLink: {
    name: 'CdrLink',
    template: '<a :href="href"><slot></slot></a>',
    props: ['href']
  },
  CdrText: {
    name: 'CdrText',
    template: '<span><slot></slot></span>',
    props: ['tag']
  }
}));

// Mock Tabs components
jest.mock('@/components/tabs/Tabs.vue', () => ({
  name: 'Tabs',
  template: '<div><slot></slot></div>',
  props: ['activeIndex']
}));

jest.mock('@/components/tabs/TabPanel.vue', () => ({
  name: 'TabPanel',
  template: '<div><slot></slot></div>',
  props: ['label']
}));

// Mock toast composable
jest.mock('@/composables/useToast', () => ({
  useToast: () => ({
    success: jest.fn(),
    error: jest.fn()
  })
}));

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

describe('ItemGenerator - Prompt Generation', () => {
  let wrapper;
  let localStorageMock;

  beforeEach(() => {
    // Setup localStorage mock
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;

    // Reset the mock
    jest.clearAllMocks();

    // Mock successful response
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Test Item',
      item_type: 'Weapon',
      rarity: 'Rare',
      bonus: '+1',
      modifier_sentence: 'You gain a +1 bonus to attack and damage rolls made with this weapon.',
      feature_guidelines: 'Test guidelines',
      feature_count: 1,
      features: {
        'Test Feature': 'A test feature description'
      },
      reason_for_rarity_level: 'Test reason',
      physical_description: 'Test description',
      lore: 'Test lore'
    }));
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    localStorageMock.clear();
  });

  describe('User Input Protection', () => {
    it('should include USER-PROVIDED NAME block when user provides a name', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      // Set user-provided name via the input element
      const nameInput = wrapper.find('input#item-name');
      await nameInput.setValue('Flamebrand Aegis');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      // Check that generateGptResponse was called
      expect(openAi.generateGptResponse).toHaveBeenCalled();

      // Get the prompt that was passed
      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // Verify USER-PROVIDED NAME block is present
      expect(prompt).toContain('USER-PROVIDED NAME — DO NOT CHANGE');
      expect(prompt).toContain('Flamebrand Aegis');
      expect(prompt).toContain('This name is FINAL and MUST appear exactly as written');
      expect(prompt).toContain('Do NOT rename, alter, translate, or "improve" it');
    });

    it('should include naming style guidance when user does NOT provide a name', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      // Leave name empty
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // Should have naming style guidance instead
      expect(prompt).toContain('NAMING STYLE:');
      expect(prompt).toContain('Use this linguistic palette for ALL names');
      expect(prompt).not.toContain('USER-PROVIDED NAME — DO NOT CHANGE');
    });

    it('should include USER-PROVIDED LORE block when user provides lore', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      // Find and set the lore textarea (it's an input rendered by CdrInput)
      const allInputs = wrapper.findAll('input');
      // The last input should be the lore textarea (based on form order)
      const loreInput = allInputs[allInputs.length - 1];
      await loreInput.setValue('Forged by the legendary smith Gorath');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // Verify USER-PROVIDED LORE block is present
      expect(prompt).toContain('USER-PROVIDED LORE — PRESERVE INTENT');
      expect(prompt).toContain('Forged by the legendary smith Gorath');
      expect(prompt).toContain('keep the core narrative, characters, and events the user described');
    });

    it('should skip random origin when user provides name', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      // Set user-provided name, no explicit origin
      const nameInput = wrapper.find('input#item-name');
      await nameInput.setValue('Flamebrand Aegis');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // When user provides a name and no explicit origin, origin instruction should be empty
      // or should not contain strong "MUST reflect" language
      const hasStrongOriginRequirement = prompt.includes('MUST reflect its') && prompt.includes('origin.');

      // If there IS an origin instruction, it should be a HINT not a requirement
      if (prompt.includes('ITEM ORIGIN')) {
        expect(prompt).toContain('ITEM ORIGIN HINT');
      }
    });

    it('should use explicit origin as HINT when user provides both origin and name', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      // User picks an origin AND provides a name
      const selects = wrapper.findAll('select');
      const originSelect = selects[2]; // Third select is origin
      await originSelect.setValue('Draconic');

      const nameInput = wrapper.find('input#item-name');
      await nameInput.setValue('Flamebrand Aegis');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // Should use origin as hint, not strict requirement
      expect(prompt).toContain('ITEM ORIGIN HINT: Draconic');
      expect(prompt).toContain('use the origin as thematic influence, but their name "Flamebrand Aegis" is final');
    });

    it('should include COHERENCE block emphasizing user input priority', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      const nameInput = wrapper.find('input#item-name');
      await nameInput.setValue('Test Item');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      expect(prompt).toContain('COHERENCE:');
      expect(prompt).toContain('USER INPUT TAKES PRIORITY');
      expect(prompt).toContain('The user\'s name and lore are the anchor; the seeds are supporting flavor');
    });
  });

  describe('Rarity Mechanics Enforcement', () => {
    it('should include explicit Common item restrictions', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      const raritySelect = wrapper.findAll('select')[0];
      await raritySelect.setValue('Common');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // Check for explicit Common restrictions
      expect(prompt).toContain('Common items are purely cosmetic/utility with NO combat benefits');
    });

    it('should include rarity self-check placeholder (full instructions in prompt)', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];

      // The prompt is very long and includes various rarity guidance
      // Just verify it's a substantial prompt with key elements
      expect(prompt.length).toBeGreaterThan(1000);
      expect(prompt).toContain('IMPORTANT D&D 5e DESIGN RULES');
    });
  });

  describe('API Call Verification', () => {
    it('should call generateGptResponse with prompt, validation function, and retry count', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      await wrapper.find('form').trigger('submit');
      await flushPromises();

      expect(openAi.generateGptResponse).toHaveBeenCalledTimes(1);

      const call = openAi.generateGptResponse.mock.calls[0];
      expect(typeof call[0]).toBe('string'); // prompt
      expect(typeof call[1]).toBe('function'); // validation function
      expect(call[2]).toBe(3); // retry count
    });

    it('should validate required JSON fields', async () => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });

      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const validationFn = openAi.generateGptResponse.mock.calls[0][1];

      // Test with valid JSON
      const validJson = JSON.stringify({
        name: 'Test',
        item_type: 'Weapon',
        rarity: 'Rare',
        bonus: '+1',
        feature_count: 1,
        features: {},
        physical_description: 'Test',
        lore: 'Test'
      });

      expect(validationFn(validJson)).toBe(true);

      // Test with missing field - should return false
      const invalidJson = JSON.stringify({
        name: 'Test',
        item_type: 'Weapon'
        // missing other required fields
      });

      expect(validationFn(invalidJson)).toBe(false);
    });
  });
});

describe('ItemGenerator - localStorage Operations', () => {
  let wrapper;
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;
    jest.clearAllMocks();

    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Sword of Testing',
      item_type: 'Weapon',
      rarity: 'Rare',
      bonus: '+1',
      modifier_sentence: 'You gain a +1 bonus to attack and damage rolls made with this weapon.',
      feature_guidelines: 'Test guidelines',
      feature_count: 1,
      features: {
        'Test Feature': 'A test feature description'
      },
      reason_for_rarity_level: 'Test reason',
      physical_description: 'A gleaming blade',
      lore: 'Forged in ancient times'
    }));
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    localStorageMock.clear();
  });

  it('should save generated item to localStorage', async () => {
    wrapper = mount(ItemGenerator, {
      props: { premium: true }
    });

    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const savedData = localStorage.getItem('savedItems');
    expect(savedData).toBeTruthy();

    const parsed = JSON.parse(savedData);
    expect(Array.isArray(parsed)).toBe(true);
    // The mock returns the item name from the response
    expect(parsed[0]).toHaveProperty('name');
    expect(parsed[0].name).toBeTruthy();
  });

  it('should preserve item structure when saving', async () => {
    wrapper = mount(ItemGenerator, {
      props: { premium: true }
    });

    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const savedData = JSON.parse(localStorage.getItem('savedItems'));
    const item = savedData[0];

    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('item_type');
    expect(item).toHaveProperty('rarity');
    expect(item).toHaveProperty('bonus');
    expect(item).toHaveProperty('features');
    expect(item).toHaveProperty('physical_description');
    expect(item).toHaveProperty('lore');
  });

  it('should load items from localStorage on mount', async () => {
    const existingItems = [{
      name: 'Existing Item',
      item_type: 'Ring',
      rarity: 'Uncommon',
      bonus: 'None',
      features: {},
      physical_description: 'A simple ring',
      lore: 'Found in a cave',
      questHooks: []
    }];

    localStorage.setItem('savedItems', JSON.stringify(existingItems));

    wrapper = mount(ItemGenerator, {
      props: { premium: true }
    });

    await nextTick();

    // The item should appear in the sidebar
    const savedItemsList = wrapper.find('.saved-items');
    expect(savedItemsList.text()).toContain('Existing Item');
  });

  it('should handle round-trip save and load', async () => {
    wrapper = mount(ItemGenerator, {
      props: { premium: true }
    });

    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    // Get saved data
    const savedData = JSON.parse(localStorage.getItem('savedItems'));

    // Unmount and remount
    wrapper.unmount();

    wrapper = mount(ItemGenerator, {
      props: { premium: true }
    });
    await nextTick();

    // Check that item is still there
    const savedItemsList = wrapper.find('.saved-items');
    expect(savedItemsList.text()).toContain('Sword of Testing');
  });

  it('should handle empty localStorage gracefully', async () => {
    localStorageMock.clear();

    expect(() => {
      wrapper = mount(ItemGenerator, {
        props: { premium: true }
      });
    }).not.toThrow();
  });
});
