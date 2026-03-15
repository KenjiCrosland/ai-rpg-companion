/**
 * LocationGenerator Component Tests
 *
 * These tests verify:
 * 1. Prompt generation with correct location type parameters
 * 2. Two-part API generation (description then JSON extraction)
 * 3. API calls to generateGptResponse are made with proper arguments
 * 4. Response parsing and validation work correctly
 * 5. Sublocation generation includes parent context
 */

import { mount, flushPromises } from '@vue/test-utils';
import LocationForm from './LocationForm.vue';
import * as openAi from '@/util/open-ai.mjs';
import * as locationPrompts from './location-prompts.mjs';

// Mock the open-ai module
jest.mock('@/util/open-ai.mjs', () => ({
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

      // Mock API responses
      openAi.generateGptResponse
        .mockResolvedValueOnce('A beautiful tavern description...')
        .mockResolvedValueOnce('{"locationName":"The Golden Dragon","locationNPCs":["John Smith (Innkeeper)"],"subLocations":["Kitchen","Cellar"]}');

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

      // Mock API responses
      openAi.generateGptResponse
        .mockResolvedValueOnce('A rustic kitchen with copper pots...')
        .mockResolvedValueOnce('{"locationName":"The Kitchen","locationNPCs":["Mary Cook (Chef)"],"subLocations":[]}');

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

      // Verify first API call includes parent context
      const firstCallArgs = openAi.generateGptResponse.mock.calls[0];
      const previousContext = firstCallArgs[3]; // 4th argument is previousContext

      expect(previousContext).toBeDefined();
      expect(previousContext).toHaveLength(2);
      expect(previousContext[1].content).toBe(parentLocation.description);
    });
  });

  describe('Two-Part API Generation', () => {
    it('should make two sequential API calls (description then JSON)', async () => {
      const mockDescription = 'The Rusty Anchor is a weathered tavern near the docks...';
      const mockJSON = '{"locationName":"The Rusty Anchor","locationNPCs":["Captain Reed (Sailor)","Martha Vale (Bartender)"],"subLocations":["Bar","Storage Room","Upstairs Rooms"]}';

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockDescription)
        .mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('tavern');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify two API calls were made
      expect(openAi.generateGptResponse).toHaveBeenCalledTimes(2);
    });

    it('should pass the description response as context to the JSON extraction call', async () => {
      const mockDescription = 'The Midnight Market is a shadowy bazaar...';
      const mockJSON = '{"locationName":"The Midnight Market","locationNPCs":["Shadows (Merchant)"],"subLocations":["Weapon Stall","Potion Shop"]}';

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockDescription)
        .mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('market');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify second API call includes description as context
      const secondCallArgs = openAi.generateGptResponse.mock.calls[1];
      const previousContext = secondCallArgs[3];

      expect(previousContext).toBeDefined();
      expect(previousContext).toHaveLength(2);
      expect(previousContext[1].content).toBe(mockDescription);
    });

    it('should use getLocationJSON prompt for the second API call', async () => {
      const getLocationJSONSpy = jest.spyOn(locationPrompts, 'getLocationJSON');

      openAi.generateGptResponse
        .mockResolvedValueOnce('A description...')
        .mockResolvedValueOnce('{"locationName":"Test","locationNPCs":[],"subLocations":[]}');

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('temple');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify getLocationJSON was called
      expect(getLocationJSONSpy).toHaveBeenCalled();
    });
  });

  describe('Response Validation and Parsing', () => {
    it('should validate JSON response has required keys (locationName, locationNPCs, subLocations)', async () => {
      const mockDescription = 'A description...';
      const mockJSON = '{"locationName":"Test Location","locationNPCs":["NPC One"],"subLocations":["Room 1"]}';

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockDescription)
        .mockResolvedValueOnce(mockJSON);

      wrapper = mount(LocationForm);

      const input = wrapper.find('input');
      await input.setValue('location');

      const form = wrapper.find('form');
      await form.trigger('submit.prevent');

      await flushPromises();

      // Verify validation function was passed to second API call
      const secondCallArgs = openAi.generateGptResponse.mock.calls[1];
      const validationFn = secondCallArgs[1]; // 2nd argument is validation function

      expect(validationFn).toBeDefined();
      expect(typeof validationFn).toBe('function');

      // Test validation function accepts valid JSON
      expect(validationFn(mockJSON)).toBe(true);
    });

    it('should reject JSON without required keys', () => {
      wrapper = mount(LocationForm);

      const validationFn = wrapper.vm.validateLocationDescription;

      // Missing locationNPCs
      expect(validationFn('{"locationName":"Test","subLocations":[]}')).toBe(false);

      // Missing subLocations
      expect(validationFn('{"locationName":"Test","locationNPCs":[]}')).toBe(false);

      // Missing locationName
      expect(validationFn('{"locationNPCs":[],"subLocations":[]}')).toBe(false);

      // Invalid JSON
      expect(validationFn('not valid json')).toBe(false);
    });

    it('should emit location-description-generated with merged response data', async () => {
      const mockDescription = 'The Shadow Guild headquarters is hidden beneath...';
      const mockJSON = '{"locationName":"The Shadow Guild","locationNPCs":["Nightshade (Assassin)","Whisper (Informant)"],"subLocations":["Training Room","Armory","Secret Vault"]}';

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockDescription)
        .mockResolvedValueOnce(mockJSON);

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
        locationDescription: mockDescription,
        locationName: 'The Shadow Guild',
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
      openAi.generateGptResponse
        .mockResolvedValueOnce('Description...')
        .mockResolvedValueOnce('{"locationName":"Test","locationNPCs":[],"subLocations":[]}');

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
      openAi.generateGptResponse
        .mockResolvedValueOnce('Description...')
        .mockResolvedValueOnce('{"locationName":"Test","locationNPCs":[],"subLocations":[]}');

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
