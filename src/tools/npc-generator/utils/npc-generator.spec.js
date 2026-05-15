/**
 * Tests for generateNPCDescription's register routing.
 *
 * The orchestrator now accepts two distinct register slots:
 *   - sourceRegister  → passed to createNPCPrompt for Part 1
 *   - relationshipsRegister → passed to createRelationshipAndTipsPrompt for Part 2
 *
 * Inference happens upstream in NPCGenerator.vue (combined upfront
 * inferRegisterAndName call). The orchestrator just routes whatever
 * the caller supplies. This test file verifies that routing.
 */

import * as aiClient from '@/util/ai-client.mjs';
import { generateNPCDescription, validatePart2 } from './npc-generator.mjs';
import { goblinoidCharacterEpithets } from '@/shared/registers/goblinoid.mjs';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

const validPart1 = {
  character_name: 'Whoever',
  description_of_position: 'whatever',
  reason_for_being_there: 'whatever',
  distinctive_feature_or_mannerism: 'whatever',
  character_secret: 'whatever',
  read_aloud_description: 'whatever',
  roleplaying_tips: 'whatever',
};
const validPart1Json = JSON.stringify(validPart1);
const validPart2Json = JSON.stringify({ relationships: { 'A': 'a' } });

let lastSourcePrompt = null;
let lastRelationshipsPrompt = null;

function setupMocks() {
  jest.clearAllMocks();
  lastSourcePrompt = null;
  lastRelationshipsPrompt = null;
  aiClient.generateGptResponse.mockImplementation(async (prompt) => {
    if (prompt.startsWith('Please create description of relationships')) {
      lastRelationshipsPrompt = prompt;
      return validPart2Json;
    }
    lastSourcePrompt = prompt;
    return validPart1Json;
  });
}

describe('generateNPCDescription — sourceRegister and relationshipsRegister routing', () => {
  beforeEach(setupMocks);

  it('passes sourceRegister to Part 1 and relationshipsRegister to Part 2 independently', async () => {
    await generateNPCDescription('typeOfPlace', {}, {
      sourceRegister: null,                                        // suppress source whitelist
      relationshipsRegister: 'Goblin-inspired: sharp, crude, percussive', // inject relationships whitelist
    });
    // Part 1: no whitelist (orchestrator decided to suppress).
    expect(lastSourcePrompt).not.toContain(goblinoidCharacterEpithets[0]);
    expect(lastSourcePrompt).not.toContain('NAMING REGISTER FOR THIS GENERATION');
    // Part 2: whitelist present (orchestrator decided to inject).
    expect(lastRelationshipsPrompt).toContain(goblinoidCharacterEpithets[0]);
  });

  it('both prompts get the whitelist when both register slots are set', async () => {
    await generateNPCDescription('typeOfPlace', {}, {
      sourceRegister: 'Goblin-inspired: sharp, crude, percussive',
      relationshipsRegister: 'Goblin-inspired: sharp, crude, percussive',
    });
    expect(lastSourcePrompt).toContain(goblinoidCharacterEpithets[0]);
    expect(lastRelationshipsPrompt).toContain(goblinoidCharacterEpithets[0]);
  });

  it('neither prompt gets the whitelist when both slots are null', async () => {
    await generateNPCDescription('typeOfPlace', {}, {
      sourceRegister: null,
      relationshipsRegister: null,
    });
    expect(lastSourcePrompt).not.toContain(goblinoidCharacterEpithets[0]);
    expect(lastRelationshipsPrompt).not.toContain(goblinoidCharacterEpithets[0]);
  });

  it('backwards-compat: a single `register` option populates both slots', async () => {
    // Pre-refactor callers passed { register, fantasyRace }. The
    // orchestrator preserves that shape — when only `register` is
    // supplied, both source and relationships use it.
    await generateNPCDescription('typeOfPlace', {}, {
      register: 'Goblin-inspired: sharp, crude, percussive',
    });
    expect(lastSourcePrompt).toContain(goblinoidCharacterEpithets[0]);
    expect(lastRelationshipsPrompt).toContain(goblinoidCharacterEpithets[0]);
  });
});

describe('validatePart2 — relationship shape enforcement', () => {
  describe('accepts the flat shape', () => {
    it('accepts a relationships object with three string-valued keys', () => {
      const raw = JSON.stringify({
        relationships: {
          'Éabha of the Grey Stones': 'Two-sentence description here. With a second sentence.',
          'Cormac the Sun-Caller': 'Two-sentence description here. With a second sentence.',
          'Aurelium Ferrata': 'Two-sentence description here. With a second sentence.',
        },
      });
      expect(validatePart2(raw)).toBe(true);
    });

    it('accepts a single-entry relationships object', () => {
      // Defensive: not all callers expect exactly three, so the
      // validator only enforces "at least one non-empty string value".
      const raw = JSON.stringify({ relationships: { 'A': 'a description' } });
      expect(validatePart2(raw)).toBe(true);
    });
  });

  describe('rejects the nested shape (source-NPC-wrapping bug)', () => {
    it('rejects when relationships values are objects (DeepSeek wrapping under source NPC name)', () => {
      // The production bug case: DeepSeek wraps the three targets inside
      // an outer object keyed by the source NPC's name. The retry layer
      // in generateGptResponse needs this rejection to kick in.
      const raw = JSON.stringify({
        relationships: {
          'Caoimhe of the Ashwood': {
            'Éabha of the Grey Stones': 'description...',
            'Cormac the Sun-Caller': 'description...',
            'Aurelium Ferrata': 'description...',
          },
        },
      });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when ANY relationships value is an object (partial nesting)', () => {
      const raw = JSON.stringify({
        relationships: {
          'Target One': 'a valid string description',
          'Target Two': { nested: 'wrong' },
        },
      });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when relationships values are arrays', () => {
      const raw = JSON.stringify({
        relationships: {
          'Target One': ['sentence one', 'sentence two'],
        },
      });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when relationships values are numbers', () => {
      const raw = JSON.stringify({ relationships: { 'Target One': 42 } });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when a relationship value is an empty string', () => {
      const raw = JSON.stringify({
        relationships: {
          'Target One': 'valid description',
          'Target Two': '',
        },
      });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when a relationship value is whitespace-only', () => {
      const raw = JSON.stringify({
        relationships: {
          'Target One': '   \n  ',
        },
      });
      expect(validatePart2(raw)).toBe(false);
    });
  });

  describe('rejects malformed shapes', () => {
    it('rejects empty relationships object', () => {
      const raw = JSON.stringify({ relationships: {} });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when relationships is an array', () => {
      const raw = JSON.stringify({ relationships: ['target one', 'target two'] });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when relationships is null', () => {
      const raw = JSON.stringify({ relationships: null });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when relationships is a string', () => {
      const raw = JSON.stringify({ relationships: 'just a string' });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when the top-level relationships key is missing', () => {
      const raw = JSON.stringify({ other_key: { 'A': 'a' } });
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects when the top-level value is an array', () => {
      const raw = JSON.stringify([{ relationships: { 'A': 'a' } }]);
      expect(validatePart2(raw)).toBe(false);
    });

    it('rejects malformed JSON without throwing', () => {
      expect(validatePart2('not json')).toBe(false);
      expect(validatePart2('')).toBe(false);
      expect(validatePart2('{relationships: missing quotes}')).toBe(false);
    });

    it('rejects JSON null literal', () => {
      expect(validatePart2('null')).toBe(false);
    });
  });
});
