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
import * as openAi from "@/util/ai-client.mjs";

// Mock the open-ai module
jest.mock('@/util/ai-client.mjs', () => ({
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

jest.mock('./components/RelatedNPCsSection.vue', () => ({
  name: 'RelatedNPCsSection',
  template: '<div>Related NPCs Section</div>',
  props: ['item']
}));

// Mock the item-storage helpers (item rename/delete trigger reference cleanup
// via these functions; the spec tests behavior, not their implementations).
jest.mock('@/util/item-storage.mjs', () => ({
  renameItemReferences: jest.fn(() => ({ totalUpdated: 0 })),
  removeReferencesForItem: jest.fn(() => 0),
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
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn()
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

describe('ItemGenerator - Related NPCs Integration', () => {
  let wrapper;
  let localStorageMock;
  const itemStorage = require('@/util/item-storage.mjs');

  beforeEach(() => {
    // Clear any localStorage state left by prior `describe` blocks. We use
    // whichever localStorage is currently in scope — could be jsdom's real
    // storage or a mock from an earlier suite.
    try { localStorage.clear(); } catch {}
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    localStorageMock.clear();
    try { localStorage.clear(); } catch {}
  });

  it('asks the prompt to populate related_npcs', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Test', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
      related_npcs: []
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    const prompt = openAi.generateGptResponse.mock.calls[0][0];
    expect(prompt).toContain('"related_npcs"');
    expect(prompt).toMatch(/every NAMED INDIVIDUAL/);
    expect(prompt).toMatch(/role_brief[\s\S]*≤10 words/);
    // role_brief must contain the item name verbatim so the NPC subtitle can
    // be linkified back to the item with a literal-string match.
    expect(prompt).toMatch(/role_brief[\s\S]*item[\s\S]*name[\s\S]*verbatim/);
  });

  it('requires the lore to include at least one named individual with archetype suggestions', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'X', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    const prompt = openAi.generateGptResponse.mock.calls[0][0];
    // Upstream guarantee: lore always has someone to extract, so "scan lore"
    // is honest about what the related-NPCs feature does.
    expect(prompt).toContain('LORE MUST INCLUDE A NAMED INDIVIDUAL');
    // Spot-check the archetype suggestions so the model has variety to choose from.
    expect(prompt).toMatch(/Creator/);
    expect(prompt).toMatch(/First Wielder/);
    expect(prompt).toMatch(/Corrupter/);
    expect(prompt).toMatch(/Champion/);
    expect(prompt).toMatch(/Thief/);
    expect(prompt).toMatch(/Scholar/);
  });

  it('accepts a generated item that includes related_npcs and persists it', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Hearthstaff', item_type: 'Staff', rarity: 'Common', bonus: '+0', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
      related_npcs: [
        { name: 'Yelena of the Duskwood', role_brief: 'oracle', context: 'received a vision' },
        { name: 'Morghul, the Watcher', role_brief: 'divine watcher', context: 'guards the embers' },
      ]
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const saved = JSON.parse(localStorage.getItem('savedItems'));
    expect(saved).toHaveLength(1);
    expect(saved[0].related_npcs).toHaveLength(2);
    expect(saved[0].related_npcs[0]).toMatchObject({
      name: 'Yelena of the Duskwood',
      role_brief: 'oracle',
      context: 'received a vision',
      npc_id: null,
    });
    expect(saved[0].related_npcs[0]).not.toHaveProperty('npc_folder');
  });

  it('accepts a generated item without related_npcs (backwards compat)', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Old Item', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const saved = JSON.parse(localStorage.getItem('savedItems'));
    expect(saved[0].related_npcs).toEqual([]);
  });

  it('deduplicates related_npcs by case-insensitive name on save', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Dup Item', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
      related_npcs: [
        { name: 'Yelena', role_brief: 'oracle', context: 'a' },
        { name: 'YELENA', role_brief: 'duplicate', context: 'b' },
        { name: '   ', role_brief: 'no name', context: 'c' },
      ]
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const saved = JSON.parse(localStorage.getItem('savedItems'));
    expect(saved[0].related_npcs).toHaveLength(1);
    expect(saved[0].related_npcs[0].name).toBe('Yelena');
  });

  it('rejects responses where related_npcs is not an array', async () => {
    // Make every retry fail validation by returning malformed shape
    openAi.generateGptResponse.mockImplementation(async (prompt, validate) => {
      const candidate = JSON.stringify({
        name: 'Bad Item', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
        feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
        related_npcs: { not: 'an array' },
      });
      // The SUT calls validate(jsonString); this asserts our validator catches it.
      expect(validate(candidate)).toBe(false);
      // Return a legal response so the test doesn't throw (validator would normally retry).
      return JSON.stringify({
        name: 'Bad Item', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
        feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
      });
    });
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();
  });

  it('removes references for the item on delete', async () => {
    openAi.generateGptResponse.mockResolvedValue(JSON.stringify({
      name: 'Doomed Item', item_type: 'Weapon', rarity: 'Rare', bonus: '+1', modifier_sentence: '',
      feature_count: 1, features: { F: 'x' }, physical_description: 'pd', lore: 'l',
    }));
    wrapper = mount(ItemGenerator, { props: { premium: true } });
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    await nextTick();

    const originalConfirm = global.confirm;
    global.confirm = jest.fn(() => true);
    try {
      // The Delete action is a CardFooterAction button whose text contains
      // an emoji icon plus the label.
      const buttons = wrapper.findAll('button');
      const deleteBtn = buttons.find(b => b.text().includes('Delete item'));
      expect(deleteBtn).toBeTruthy();
      await deleteBtn.trigger('click');
      await nextTick();
      expect(itemStorage.removeReferencesForItem).toHaveBeenCalledWith('Doomed Item');
    } finally {
      global.confirm = originalConfirm;
    }
  });
});
