/**
 * LocationGenerator Component Tests
 *
 * These tests verify:
 * 1. Prompt generation with correct location type parameters
 * 2. Single JSON API generation with structured sentences
 * 3. API calls to generateGptResponse are made with proper arguments
 * 4. Response parsing and validation work correctly
 * 5. Sublocation generation includes parent context
 */

import { mount, flushPromises } from '@vue/test-utils';
import LocationForm from './LocationForm.vue';
import * as openAi from "@/util/ai-client.mjs";
import * as locationPrompts from './location-prompts.mjs';

// Mock the ai-config module
jest.mock('@/util/ai-config.mjs', () => ({
  PROVIDERS: {
    OPENAI: 'gpt-4o-mini',
    DEEPSEEK: 'deepseek-v3',
  },
  getProviderConfig: jest.fn(),
  getAPIKey: jest.fn(),
  getAIProvider: jest.fn(),
  normalizeModel: jest.fn(),
}));

// Mock the ai-client module
jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

// Mock Cedar components with proper v-model support
jest.mock('@rei/cedar', () => ({
  CdrButton: {
    name: 'CdrButton',
    template: '<button type="button" @click="$emit(\'click\')"><slot></slot></button>',
    props: ['modifier', 'fullWidth', 'type', 'size', 'disabled']
  },
  CdrInput: {
    name: 'CdrInput',
    template: '<input :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue', 'label', 'background', 'id', 'required']
  }
}));

describe('LocationForm', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Prompt Generation', () => {
    it('should call createLocationPrompt with the user-provided location type', async () => {
      const createLocationPromptSpy = jest.spyOn(locationPrompts, 'createLocationPrompt');

      // Mock API response with structured JSON
      openAi.generateGptResponse
        .mockResolvedValueOnce('{"locationName":"The Golden Dragon","sentence1_dimensions":"A two-story tavern with oak beams.","sentence2_atmosphere":"The smell of roasted meat fills the air.","sentence3_unique_feature":"A golden dragon statue dominates the bar.","sentence4_interaction":"The innkeeper polishes mugs while humming.","locationNPCs":["John Smith (Innkeeper)"],"subLocations":["Kitchen","Cellar"]}');

      wrapper = mount(LocationForm);

      // Fill in location type
      const input = wrapper.find('input');
      await input.setValue('tavern');

      // Submit form
      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify createLocationPrompt was called with "Tavern" (startCase applied)
      expect(createLocationPromptSpy).toHaveBeenCalledWith('Tavern');
    });

    it('should include parent location context when generating sublocation', async () => {
      const parentLocation = {
        name: 'The Golden Dragon Tavern',
        description: 'A cozy tavern with warm lighting and friendly atmosphere.',
        npcNames: ['John Smith (Innkeeper)'],
        subLocations: ['Kitchen', 'Cellar', 'Guest Rooms']
      };

      // Mock API response with structured JSON
      openAi.generateGptResponse
        .mockResolvedValueOnce('{"locationName":"The Kitchen","sentence1_dimensions":"A rustic kitchen with copper pots.","sentence2_atmosphere":"Steam rises from bubbling cauldrons.","sentence3_unique_feature":"A massive fireplace dominates one wall.","sentence4_interaction":"The chef chops vegetables rhythmically.","locationNPCs":["Mary Cook (Chef)"],"subLocations":[]}');

      wrapper = mount(LocationForm, {
        props: {
          parentLocation,
          formContent: 'kitchen'
        }
      });

      // Trigger generation via button click
      const button = wrapper.find('button');
      await button.trigger('click');

      await flushPromises();

      // Verify API call includes parent context
      const firstCallArgs = openAi.generateGptResponse.mock.calls[0];
      const previousContext = firstCallArgs[3]; // 4th argument is previousContext

      expect(previousContext).toBeDefined();
      expect(previousContext).toHaveLength(2);

      // The context should be a JSON stringified object with parent location data
      const contextData = JSON.parse(previousContext[1].content);
      expect(contextData.locationName).toBe(parentLocation.name);
      expect(contextData.locationDescription).toBe(parentLocation.description);
      expect(contextData.locationNPCs).toEqual(parentLocation.npcNames);
      expect(contextData.subLocations).toEqual(parentLocation.subLocations);
    });
  });

  describe('Single JSON API Generation', () => {
    it('should make a single API call that returns structured JSON', async () => {
      const mockJSON = '{"locationName":"The Rusty Anchor","sentence1_dimensions":"A weathered two-story tavern with salt-stained walls.","sentence2_atmosphere":"The smell of fish and rum permeates the air.","sentence3_unique_feature":"A ship\'s wheel serves as a chandelier.","sentence4_interaction":"The bartender polishes mugs while eyeing newcomers.","locationNPCs":["Captain Reed (Sailor)","Martha Vale (Bartender)"],"subLocations":["Bar","Storage Room","Upstairs Rooms"]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('tavern');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify only one API call was made
      expect(openAi.generateGptResponse).toHaveBeenCalledTimes(1);
    });

    it('should include all sentence fields in the JSON response', async () => {
      const mockJSON = '{"locationName":"The Midnight Market","sentence1_dimensions":"A sprawling open-air bazaar with colorful tents.","sentence2_atmosphere":"Incense smoke drifts through the narrow aisles.","sentence3_unique_feature":"Floating lanterns illuminate the paths between stalls.","sentence4_interaction":"A merchant beckons with exotic wares.","locationNPCs":["Shadows (Merchant)"],"subLocations":["Weapon Stall","Potion Shop"]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('market');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify emitted event contains all sentence fields
      const emitted = wrapper.emitted('location-description-generated');
      const emittedData = emitted[0][0];

      expect(emittedData.sentence1_dimensions).toBeDefined();
      expect(emittedData.sentence2_atmosphere).toBeDefined();
      expect(emittedData.sentence3_unique_feature).toBeDefined();
      expect(emittedData.sentence4_interaction).toBeDefined();
    });

    it('should build locationDescription from individual sentences', async () => {
      const mockJSON = '{"locationName":"Test Temple","sentence1_dimensions":"A small stone shrine.","sentence2_atmosphere":"Candlelight flickers.","sentence3_unique_feature":"Ancient runes glow.","sentence4_interaction":"A priest meditates.","locationNPCs":[],"subLocations":[]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('temple');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify locationDescription is built from sentences
      const emitted = wrapper.emitted('location-description-generated');
      const emittedData = emitted[0][0];

      expect(emittedData.locationDescription).toBe('A small stone shrine. Candlelight flickers. Ancient runes glow. A priest meditates.');
    });
  });

  describe('Response Validation and Parsing', () => {
    it('should validate JSON response has all required keys', async () => {
      const mockJSON = '{"locationName":"Test Location","sentence1_dimensions":"A test.","sentence2_atmosphere":"More test.","sentence3_unique_feature":"Unique test.","sentence4_interaction":"Interactive test.","locationNPCs":["NPC One"],"subLocations":["Room 1"]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('location');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify validation function was passed to API call
      const firstCallArgs = openAi.generateGptResponse.mock.calls[0];
      const validationFn = firstCallArgs[1]; // 2nd argument is validation function

      expect(validationFn).toBeDefined();
      expect(typeof validationFn).toBe('function');

      // Test validation function accepts valid JSON with all fields
      expect(validationFn(mockJSON)).toBe(true);
    });

    it('should reject JSON without required keys', () => {
      wrapper = mount(LocationForm);

      const validationFn = wrapper.vm.validateLocationDescription;

      // Missing sentence fields
      expect(validationFn('{"locationName":"Test","locationNPCs":[],"subLocations":[]}')).toBe(false);

      // Missing locationNPCs
      expect(validationFn('{"locationName":"Test","sentence1_dimensions":"A","sentence2_atmosphere":"B","sentence3_unique_feature":"C","sentence4_interaction":"D","subLocations":[]}')).toBe(false);

      // Missing subLocations
      expect(validationFn('{"locationName":"Test","sentence1_dimensions":"A","sentence2_atmosphere":"B","sentence3_unique_feature":"C","sentence4_interaction":"D","locationNPCs":[]}')).toBe(false);

      // Missing locationName
      expect(validationFn('{"sentence1_dimensions":"A","sentence2_atmosphere":"B","sentence3_unique_feature":"C","sentence4_interaction":"D","locationNPCs":[],"subLocations":[]}')).toBe(false);

      // Invalid JSON
      expect(validationFn('not valid json')).toBe(false);
    });

    it('should emit location-description-generated with merged response data', async () => {
      const mockJSON = '{"locationName":"The Shadow Guild","sentence1_dimensions":"A hidden headquarters beneath the city.","sentence2_atmosphere":"Shadows dance in the torchlight.","sentence3_unique_feature":"A wall of daggers gleams.","sentence4_interaction":"An assassin sharpens blades.","locationNPCs":["Nightshade (Assassin)","Whisper (Informant)"],"subLocations":["Training Room","Armory","Secret Vault"]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('guild hall');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify emitted event contains merged data
      const emitted = wrapper.emitted('location-description-generated');
      expect(emitted).toBeDefined();
      expect(emitted).toHaveLength(1);

      const emittedData = emitted[0][0];
      expect(emittedData).toEqual({
        locationDescription: 'A hidden headquarters beneath the city. Shadows dance in the torchlight. A wall of daggers gleams. An assassin sharpens blades.',
        locationName: 'The Shadow Guild',
        sentence1_dimensions: 'A hidden headquarters beneath the city.',
        sentence2_atmosphere: 'Shadows dance in the torchlight.',
        sentence3_unique_feature: 'A wall of daggers gleams.',
        sentence4_interaction: 'An assassin sharpens blades.',
        locationNPCs: ['Nightshade (Assassin)', 'Whisper (Informant)'],
        subLocations: ['Training Room', 'Armory', 'Secret Vault']
      });
    });
  });

  describe('Error Handling', () => {
    it('should emit location-description-error when API call fails', async () => {
      openAi.generateGptResponse.mockRejectedValueOnce(new Error('API Error'));

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('location');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify error emission
      const emitted = wrapper.emitted('location-description-error');
      expect(emitted).toBeDefined();
      expect(emitted[0][0]).toBe('Failed to generate location description. Please try again later.');
    });

    it('should set loading state to false after error', async () => {
      openAi.generateGptResponse.mockRejectedValueOnce(new Error('API Error'));

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('location');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify loading state was set to false
      const loadingEmits = wrapper.emitted('set-loading-state');
      expect(loadingEmits[loadingEmits.length - 1][0]).toBe(false);
    });
  });

  describe('Input Handling', () => {
    it('should apply startCase transformation to location type', async () => {
      const mockJSON = '{"locationName":"Test","sentence1_dimensions":"A","sentence2_atmosphere":"B","sentence3_unique_feature":"C","sentence4_interaction":"D","locationNPCs":[],"subLocations":[]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('wizard tower'); // lowercase with space

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify prompt was called with startCase version
      const firstCallArgs = openAi.generateGptResponse.mock.calls[0];
      expect(firstCallArgs[0]).toContain('Wizard Tower');
    });

    it('should use formContent prop when provided', async () => {
      const mockJSON = '{"locationName":"Test","sentence1_dimensions":"A","sentence2_atmosphere":"B","sentence3_unique_feature":"C","sentence4_interaction":"D","locationNPCs":[],"subLocations":[]}';

      openAi.generateGptResponse.mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm, {
        props: {
          formContent: 'library'
        }
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      await flushPromises();

      // Verify formContent was used (as "Library" with startCase)
      const firstCallArgs = openAi.generateGptResponse.mock.calls[0];
      expect(firstCallArgs[0]).toContain('Library');
    });
  });
});
