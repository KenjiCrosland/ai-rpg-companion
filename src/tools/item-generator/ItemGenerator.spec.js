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
import { originMaterialPools, allMaterials } from './utils/material-pools.mjs';
import { orcGivenNames, goblinoidGivenNames } from './utils/orc-goblin-name-pools.mjs';
import { fantasyRaceConventionalPalettes } from './utils/select-language-palette.mjs';
import { languagePalettes } from './utils/language-palettes.mjs';

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

  describe('Origin/Palette Pairing — Conditional Translation Block', () => {
    // The prompt distinguishes two cases for fantasy-race origins:
    //   - Conventional pairing (Elven+Sindarin, Dwarven+Germanic, etc.)
    //     → simple "ORIGIN DRIVES LORE CONTENT:" guidance
    //   - Unconventional pairing (Giant + non-pool palette, post-Task-1)
    //     → "UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP" block
    //       (trimmed in Task 4 — principle kept, three worked examples
    //       removed because they modeled pairings the architecture no
    //       longer allows post-Task-1, and the Mesoamerican example
    //       contained a sacred-concept teaching artifact we want out
    //       of the prompt)
    // Math.random is stubbed because selectLanguagePalette uses it to roll
    // the 70/30 weighted choice. Stubbing to 0.5 forces the conventional
    // branch; 0.85 forces the "other" (unconventional) branch.

    let randomSpy;
    beforeEach(() => {
      randomSpy = jest.spyOn(Math, 'random');
    });
    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('renders UNCONVENTIONAL PAIRING block when fantasy-race origin pairs with non-conventional palette', async () => {
      // Post-Task-1, the only fantasy race that can reach the
      // unconventional-pairing branch is Giant (the cross-cultural-
      // archetype race left on priority-2 weighted with broad alt-
      // branch). The five Western-fantasy-bound races are allow-list-
      // restricted, so their selected palette is always in their
      // allow-list and the unconventional branch never fires for them.
      randomSpy.mockReturnValue(0.85); // forces non-pool palette for Giant
      wrapper = mount(ItemGenerator, { props: { premium: true } });

      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Giant');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      // Routing assertion: the unconventional-pairing block fires for
      // Giant + non-pool palette, and the simple ORIGIN-DRIVES block
      // does not (the two are mutually exclusive). Block CONTENT —
      // principle phrasing, presence/absence of the stripped worked
      // examples, etc. — is a prompt-string concern verified through
      // manual production-review, not via Jest assertions on wording.
      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain("UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP");
      expect(prompt).not.toMatch(/ORIGIN DRIVES LORE CONTENT:\s+The thematic origin/);
    });

    it('renders simple ORIGIN DRIVES LORE CONTENT block (and not UNCONVENTIONAL) when fantasy-race origin pairs with its conventional palette', async () => {
      // Same context as above, but Math.random < 0.7 forces the
      // conventional pool[0] (Norse-inspired for Giant). The
      // unconventional branch never fires.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });

      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Giant');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      // Routing assertion only — the simple ORIGIN-DRIVES block fires
      // for Giant on the conventional roll, and the unconventional
      // block does not.
      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('ORIGIN DRIVES LORE CONTENT:');
      expect(prompt).not.toContain("UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP");
    });

    it('renders simple ORIGIN DRIVES LORE CONTENT block when origin is not a fantasy race', async () => {
      // Non-fantasy-race origin (Draconic) → conditional flag is always
      // false regardless of which palette gets rolled, so the simple block
      // is the right one even on a "weird" palette.
      randomSpy.mockReturnValue(0.85);
      wrapper = mount(ItemGenerator, { props: { premium: true } });

      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Draconic');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('ORIGIN DRIVES LORE CONTENT:');
      expect(prompt).not.toContain("UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP");
    });

    // The "UNCONVENTIONAL block carries EXPLICIT ORIGIN IDENTIFICATION
    // requirement and origin-subgroup examples" test was removed during
    // the test-style cleanup — the entire test was prompt-string
    // content checks (toContain on section headers, subgroup-example
    // strings, the translate-not-rename punchline). The routing
    // (UNCONVENTIONAL block fires for Giant + non-pool) is covered by
    // the parameterized test above; whether the EXPLICIT ORIGIN
    // IDENTIFICATION block survives intact is a manual production-
    // review concern.

    // The "simple ORIGIN DRIVES LORE CONTENT block also requires
    // explicit origin naming" test was likewise removed — the key
    // assertions were on principle phrasing ("lore MUST explicitly
    // name the origin culture", "A reader should be able to identify
    // the origin from the lore alone"). Routing (simple block fires
    // for Elven + conventional palette) is covered elsewhere.

    it('renders LANGUAGE PALETTE RESTRICTION when origin is Orcish (override-revocation block)', async () => {
      // The orc-coded-pairing failure user reported: code-side filter
      // correctly excluded orc-coded palettes from random selection,
      // but the LLM-authority LANGUAGE PALETTE OVERRIDE block let the
      // model override to Japanese anyway. The fix revokes that
      // authority prompt-side when fantasy race is Orcish or Goblinoid.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Orcish');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
      expect(prompt).toContain('OVERRIDES THE AUTHORITY ABOVE');
      expect(prompt).toContain('REVOKED for this generation');
      // The full restricted-register list must be present so the LLM
      // sees every prefix it must not pick from.
      expect(prompt).toContain('Yoruba, Akan, Igbo, Swahili');
      expect(prompt).toContain('Chinese, Japanese, Korean, Mongolian, Tibetan, Thai');
      expect(prompt).toContain('Maori, Hawaiian');
      expect(prompt).toContain('Maya, Aztec/Nahuatl, Andean');
      expect(prompt).toContain('Lakota or other North American Indigenous traditions');
    });

    it('renders LANGUAGE PALETTE RESTRICTION when origin is Goblinoid', async () => {
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Goblinoid');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('renders LANGUAGE PALETTE RESTRICTION when lore mentions orcish on a non-fantasy-race origin (user repro)', async () => {
      // The exact user-reported scenario: dropdown=Necromantic, lore=
      // "Orcish Battleaxe". fantasyRace resolves to 'Orcish' via the
      // keyword path (priority 2b in resolveFantasyRace), so the
      // revocation block must fire even though the dropdown isn't
      // Orcish. Without this, the prompt-side enforcement would only
      // catch dropdown selections and would miss the keyword path.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });

      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Necromantic');
      // Lore textarea is the last cdr-input rendered as a regular input
      // by the test mock (matches the pattern used in the existing
      // USER-PROVIDED LORE test).
      const allInputs = wrapper.findAll('input');
      const loreInput = allInputs[allInputs.length - 1];
      await loreInput.setValue('An ancient orcish battleaxe');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
      // Worth verifying the restriction is hard-banning Japanese
      // specifically since that was the failure case in the bug report.
      expect(prompt).toContain('Chinese, Japanese, Korean, Mongolian, Tibetan, Thai');
    });

    it('does NOT render LANGUAGE PALETTE RESTRICTION when origin is non-fantasy-race with no Western-bound-race keyword', async () => {
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Necromantic');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).not.toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('renders LANGUAGE PALETTE RESTRICTION for Elven (now Western-fantasy-bound)', async () => {
      // Pre-Task-1 this test asserted Elven did NOT render the
      // restriction (the restriction was orc/goblin-scoped). Post-
      // Task-1, Elven joined WESTERN_FANTASY_BOUND_RACES alongside Dwarven and
      // Gnomish under the Western-fantasy-bound tier — all five render
      // the restriction block.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Elven');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('renders LANGUAGE PALETTE RESTRICTION for Dwarven (now Western-fantasy-bound)', async () => {
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Dwarven');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('renders LANGUAGE PALETTE RESTRICTION for Gnomish (now Western-fantasy-bound)', async () => {
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Gnomish');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('does NOT render LANGUAGE PALETTE RESTRICTION for Giant (cross-cultural archetype)', async () => {
      // Regression guard: Giant is NOT in WESTERN_FANTASY_BOUND_RACES — its
      // archetype-slot exists in many living mythological traditions
      // (jötnar/titans/rakshasas/oni). The Western-fantasy-bound
      // restriction does not apply.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Giant');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).not.toContain('LANGUAGE PALETTE RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('always renders ITEM NAMING — TRANSLATION FOR NON-ENGLISH PALETTES directive', async () => {
      // The translation rule is a general naming directive (not gated
      // on which palette gets rolled) — DeepSeek decides which side
      // of the apply/don't-apply lists the selected palette belongs
      // to. So the prompt must contain it for every generation.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('ITEM NAMING — TRANSLATION FOR NON-ENGLISH PALETTES');
      // Worked-example anchors documented in the brief — a regression
      // here means a contributor trimmed examples without realizing
      // they're load-bearing for DeepSeek's pattern-match.
      expect(prompt).toContain('Sulkasipailon Kukka');
      expect(prompt).toContain('Wand of First Bloom');
      expect(prompt).toContain('Tizi-Uzzu');
      expect(prompt).toContain('Pou o te Maunga');
      // Apply / don't-apply sections must both be present so DeepSeek
      // knows which palettes trigger the rule.
      expect(prompt).toContain('APPLY translation rule');
      expect(prompt).toContain('DO NOT apply translation rule');
      // Latin/Greek/Italian Renaissance must be on the don't-apply side.
      expect(prompt).toMatch(/DO NOT apply translation rule[\s\S]*Latin/);
      // Description integration pattern should be present.
      expect(prompt).toContain('DESCRIPTION INTEGRATION PATTERN');
    });

    it('Orcish dropdown rotates the palette example tail when the rolled palette IS Orcish', async () => {
      // Under the allow-list architecture, an Orcish dropdown picks
      // from a 10-palette pool; rotation only fires when the rolled
      // palette is actually the 'Orcish' palette (rotatePaletteExamples
      // is keyed on prefix). Mock Math.random=0 so pool[0] is selected,
      // which is 'Orcish' (the primary fictional register). The prompt's
      // NAMING STYLE block must embed names from the orc pool, not the
      // static "Grokthash, Uzgark, Dra'mok" defaults.
      randomSpy.mockReturnValue(0);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Orcish');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const namingLine = prompt.match(/Use this linguistic palette for ALL names[^\n]*/)[0];
      // Verify the rolled palette IS Orcish (otherwise the rotation
      // wouldn't fire and this test would be checking the wrong path).
      expect(namingLine).toMatch(/location names: Orcish:/);

      const exampleTail = namingLine.match(/\(e\.g\., (.+?)\)/);
      expect(exampleTail).not.toBeNull();
      const sampled = exampleTail[1].split(', ');
      expect(sampled.length).toBeGreaterThanOrEqual(3);
      for (const name of sampled) {
        expect(orcGivenNames).toContain(name);
      }
      // The static defaults must not appear together in the rotated tail.
      expect(exampleTail[1]).not.toContain('Grokthash, Uzgark, Dra\'mok');
    });

    it('Goblinoid dropdown rotates the palette example tail when the rolled palette IS Goblin-inspired', async () => {
      // Same pool-pick determinism as Orcish: pool[0] = 'Goblin-inspired'
      // for Goblinoid, so Math.random=0 forces the path that triggers
      // rotation.
      randomSpy.mockReturnValue(0);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Goblinoid');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const namingLine = prompt.match(/Use this linguistic palette for ALL names[^\n]*/)[0];
      expect(namingLine).toMatch(/location names: Goblin-inspired:/);

      const exampleTail = namingLine.match(/\(e\.g\., (.+?)\)/);
      expect(exampleTail).not.toBeNull();
      const sampled = exampleTail[1].split(', ');
      for (const name of sampled) {
        expect(goblinoidGivenNames).toContain(name);
      }
    });

    it('Orcish dropdown can roll a non-Orcish allow-list palette (no rotation in that case)', async () => {
      // Regression guard for the allow-list architecture: when the pool
      // pick lands on Old-Norse, Anglo-Saxon, etc., those palettes
      // keep their static seeds (no orc-pool rotation). Iterate index
      // rolls and confirm at least one lands on a non-Orcish member of
      // the pool.
      const indexRolls = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
      let sawNonOrcishPaletteInPool = false;
      for (const indexRoll of indexRolls) {
        if (wrapper) wrapper.unmount();
        jest.clearAllMocks();
        randomSpy.mockReturnValue(indexRoll);
        wrapper = mount(ItemGenerator, { props: { premium: true } });
        const originSelect = wrapper.findAll('select')[2];
        await originSelect.setValue('Orcish');
        await wrapper.find('form').trigger('submit');
        await flushPromises();
        const prompt = openAi.generateGptResponse.mock.calls[0][0];
        const namingLine = prompt.match(/Use this linguistic palette for ALL names[^\n]*/)[0];
        if (!/location names: Orcish:/.test(namingLine)) {
          sawNonOrcishPaletteInPool = true;
          break;
        }
      }
      expect(sawNonOrcishPaletteInPool).toBe(true);
    });

    describe('every conventional pool prefix resolves to a languagePalettes entry', () => {
      // Non-LLM integrity check: a prefix listed in
      // fantasyRaceConventionalPalettes that doesn't exist in
      // languagePalettes silently falls through to the 30% alt branch
      // — not a crash but a wrong-behavior bug. With languagePalettes
      // extracted to its own module, the check is a direct lookup
      // against the imported list (no need to drive selection through
      // a mocked component, which is unreliable because earlier
      // Math.random consumers in generateMagicItem shift the mock
      // queue's alignment).
      const cases = [];
      for (const [race, pool] of Object.entries(fantasyRaceConventionalPalettes)) {
        for (const prefix of pool) {
          cases.push([race, prefix]);
        }
      }

      it.each(cases)('%s pool prefix "%s" resolves', (race, prefix) => {
        const matchingEntry = languagePalettes.find(p => p.startsWith(prefix));
        expect(matchingEntry).toBeDefined();
      });

      it('languagePalettes entries each have unique prefixes (no collisions)', () => {
        // If two languagePalettes entries shared a prefix, startsWith
        // lookups would non-deterministically match either depending
        // on array order. Each "prefix:" head should be unique.
        const prefixes = languagePalettes.map(p => p.split(':')[0]);
        expect(new Set(prefixes).size).toBe(prefixes.length);
      });
    });

    it('Elven dropdown does NOT rotate via orc/goblin pool (multi-palette races bypass)', async () => {
      // Regression guard: rotation is scoped to single-palette races.
      // Elven gets variety from cross-palette rotation, so the orc/
      // goblin rotation must not interfere.
      randomSpy.mockReturnValue(0);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Elven');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const namingLine = prompt.match(/Use this linguistic palette for ALL names[^\n]*/)[0];
      const exampleTail = namingLine.match(/\(e\.g\., (.+?)\)/);
      // Should still have an example tail (the static one from the
      // Sindarin palette); none of those names should be in the orc
      // or goblin pool.
      const sampled = exampleTail[1].split(', ');
      for (const name of sampled) {
        expect(orcGivenNames).not.toContain(name);
        expect(goblinoidGivenNames).not.toContain(name);
      }
    });

    it('always renders CULTURAL-SPECIFIC NAMES — INVENT BY DEFAULT directive', async () => {
      // Universal-invent rule replaces calibration with a uniform
      // commitment: invent fictional named entities for almost every
      // real-world cultural register, with a short LIMITED EXCEPTIONS
      // list grounded in fantasy-genre convention (Greek, Roman,
      // Egyptian, Norse-family, Germanic-family, Celtic-family,
      // Sindarin + fictional palettes). User-typed real-entity
      // invocations still honored via cultural detection (priority 1).
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('CULTURAL-SPECIFIC NAMES — INVENT BY DEFAULT');

      // Entity-type list — every category load-bearing because the
      // brief broadens beyond deities to clans, sacred places,
      // ceremonial roles, foundational figures, and historical figures.
      expect(prompt).toContain('Deities, religious figures, sacred beings, mythological figures');
      expect(prompt).toContain('Clans, kinship groups, family lineages, tribal names');
      expect(prompt).toContain('Sacred places, ceremonial sites, religious geography');
      expect(prompt).toContain('Ceremonial roles, religious titles, traditional offices');
      expect(prompt).toContain('Foundational ancestral figures from creation narratives');
      expect(prompt).toContain('Real historical figures with cultural-religious significance');

      // Worked-example anchors for the invention rule (constructed
      // names that aren't real deities) and the common-noun
      // counter-example. A Diné-register example (Hashtłʼish, Navajo
      // word for clay) used to anchor here too; it was removed when
      // the Navajo/Diné palette was deleted under appropriation caution.
      expect(prompt).toContain('Olosun');
      expect(prompt).toContain('Kibarua');

      // LIMITED EXCEPTIONS section — Western-fantasy-canonical
      // traditions where real names are genre-expected.
      expect(prompt).toContain('LIMITED EXCEPTIONS');
      expect(prompt).toContain('Greek-inspired');
      expect(prompt).toContain('Latin-inspired / Roman');
      expect(prompt).toContain('Egyptian-inspired');
      expect(prompt).toContain('Norse-inspired, Old-Norse-inspired');
      expect(prompt).toContain('Anglo-Saxon-inspired, Old-High-German-inspired');
      expect(prompt).toContain('Celtic-inspired, Welsh-inspired, Irish-inspired, Old-Irish-inspired');
      expect(prompt).toContain('Sindarin-inspired and all fictional palettes');

      // Explicit non-exception list — pins the most acute production-
      // failure traditions (Maori, Lakota, Yoruba) so a future
      // contributor can't quietly drop them. Navajo/Diné used to be
      // pinned here too; the palette was removed entirely under
      // appropriation caution, so we no longer assert its presence.
      expect(prompt).toContain('Yoruba');
      expect(prompt).toContain('Lakota');
      expect(prompt).toContain('Maori');
      expect(prompt).toContain('Hindu/Sanskrit');

      // User-agency carve-out via cultural detection.
      expect(prompt).toContain('Cultural detection from user input still wins');
      expect(prompt).toContain('Athena');
      expect(prompt).toContain('the temple of Inti');
    });

    it('translation directive includes the REQUIREMENT clause that the item itself has an original-language name', async () => {
      // The translation block establishes the title-vs-description split,
      // but the worked examples leave room for outputs where only the
      // characters or places get original-language names while the item
      // itself stays generic-English. The requirement clause closes
      // that gap explicitly: the ITEM must have a culturally-rooted
      // name in the lore, even if short ("Hjartasteinn" / "Starozub").
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(prompt).toContain('REQUIREMENT — THE ITEM ITSELF MUST HAVE AN ORIGINAL-LANGUAGE NAME');
      expect(prompt).toContain('Not just original-language character names or place names');
      expect(prompt).toContain('the ITEM must have a name in the cultural-linguistic register');
      // Short-name examples are load-bearing — they signal that the rule
      // doesn't demand long ornate constructions, just a culturally-
      // rooted name regardless of length.
      expect(prompt).toContain('Hjartasteinn');
      expect(prompt).toContain('Starozub');
    });

    it('translation directive does not duplicate or replace the explicit-origin-naming requirement', async () => {
      // The brief's last paragraph: "This rule does NOT override the
      // explicit-origin-naming requirement." Both must coexist.
      randomSpy.mockReturnValue(0.5);
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Elven');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      // ORIGIN DRIVES LORE CONTENT block (the explicit-origin-naming
      // requirement from the conventional-pairing branch) still fires.
      expect(prompt).toContain('ORIGIN DRIVES LORE CONTENT');
      expect(prompt).toContain('lore MUST explicitly name the origin culture');
      // And the translation directive coexists.
      expect(prompt).toContain('ITEM NAMING — TRANSLATION FOR NON-ENGLISH PALETTES');
    });

    it('does not render UNCONVENTIONAL block for each of the six fantasy races on the conventional roll', async () => {
      // Smoke-test that all six entries in fantasyRaceOriginConventionalPalettes
      // hit the conventional branch when Math.random < 0.7. Catches future
      // accidents where a race is added to the keyword/palette map but
      // selectLanguagePalette doesn't recognize it.
      randomSpy.mockReturnValue(0.5);
      const races = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];

      for (const race of races) {
        jest.clearAllMocks();
        if (wrapper) wrapper.unmount();
        wrapper = mount(ItemGenerator, { props: { premium: true } });

        const originSelect = wrapper.findAll('select')[2];
        await originSelect.setValue(race);
        await wrapper.find('form').trigger('submit');
        await flushPromises();

        const prompt = openAi.generateGptResponse.mock.calls[0][0];
        expect(prompt).not.toContain("UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP");
        expect(prompt).toContain('ORIGIN DRIVES LORE CONTENT:');
      }
    });
  });

  describe('Material selection — origin-curated pools', () => {
    // The prompt embeds the selected material via "MAGICAL MATERIAL:\nThe
    // item incorporates: ${selectedMaterial}". When origin is set, the
    // selection should come from that origin's pool; when origin is
    // null (user input drives theme), it should come from the
    // deduplicated union of all pools.
    //
    // We force determinism by stubbing Math.random to 0 — that always
    // picks index 0 from any array. Combined with knowing each pool's
    // first entry, we can assert exactly which material was chosen.

    let randomSpy;
    beforeEach(() => {
      randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    });
    afterEach(() => {
      randomSpy.mockRestore();
    });

    it('selects material from the origin pool when a fantasy-race origin is chosen (Elven)', async () => {
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Elven');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const expected = originMaterialPools.Elven[0];
      expect(prompt).toContain(`The item incorporates: ${expected}`);
    });

    it('selects material from the origin pool for an aesthetic origin (Necromantic)', async () => {
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const originSelect = wrapper.findAll('select')[2];
      await originSelect.setValue('Necromantic');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const expected = originMaterialPools.Necromantic[0];
      expect(prompt).toContain(`The item incorporates: ${expected}`);
    });

    it('falls back to allMaterials when origin is unresolved (user-provided name, no dropdown)', async () => {
      // User provides a name → resolvedOrigin stays null (the LLM
      // derives theme from input) → material selection should pull
      // from allMaterials, not any specific origin pool.
      wrapper = mount(ItemGenerator, { props: { premium: true } });
      const nameInput = wrapper.find('input#item-name');
      await nameInput.setValue('Curious Lantern');
      await wrapper.find('form').trigger('submit');
      await flushPromises();

      const prompt = openAi.generateGptResponse.mock.calls[0][0];
      const expected = allMaterials[0];
      expect(prompt).toContain(`The item incorporates: ${expected}`);
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
