/**
 * Tests for infer-item-dungeon-mode.
 *
 * Behavior-over-shape per the project's testing convention: the tests
 * cover validator routing, mode→preset mapping integrity, and the
 * fallback paths. No prompt-string-content tests beyond verifying the
 * critical mode list is presented.
 */

import {
  MODES,
  MODE_TO_PRESETS,
  validateModeResponse,
  buildModeInferencePrompt,
  inferItemDungeonMode,
} from '../util/infer-item-dungeon-mode.mjs';
import { DRIVE_TYPES, POWER_STRUCTURES, ORGANIZING_LOGICS } from '../util/dungeon-dimensions.mjs';

// Mock the AI client so the inference call is deterministic.
jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));
import { generateGptResponse } from '@/util/ai-client.mjs';

describe('MODES', () => {
  it('contains exactly the four documented modes in declared order', () => {
    expect(MODES).toEqual(['forgotten', 'revered', 'carried', 'trial']);
  });
});

describe('MODE_TO_PRESETS', () => {
  it('has an entry for every MODE', () => {
    for (const mode of MODES) {
      expect(MODE_TO_PRESETS[mode]).toBeDefined();
    }
  });

  it('every preset specifies driveType, powerStructure, organizingLogic', () => {
    for (const mode of MODES) {
      const preset = MODE_TO_PRESETS[mode];
      expect(typeof preset.driveType).toBe('string');
      expect(typeof preset.powerStructure).toBe('string');
      expect(Array.isArray(preset.organizingLogic)).toBe(true);
      expect(preset.organizingLogic.length).toBeGreaterThan(0);
    }
  });

  it('every preset has a driveType from DRIVE_TYPES', () => {
    for (const mode of MODES) {
      expect(DRIVE_TYPES).toContain(MODE_TO_PRESETS[mode].driveType);
    }
  });

  it('every preset has a powerStructure from POWER_STRUCTURES', () => {
    for (const mode of MODES) {
      expect(POWER_STRUCTURES).toContain(MODE_TO_PRESETS[mode].powerStructure);
    }
  });

  it('every preset has organizingLogic entries from ORGANIZING_LOGICS', () => {
    for (const mode of MODES) {
      for (const logic of MODE_TO_PRESETS[mode].organizingLogic) {
        expect(ORGANIZING_LOGICS).toContain(logic);
      }
    }
  });

  it('trial mode pre-sets driveType to prove_worthiness', () => {
    expect(MODE_TO_PRESETS.trial.driveType).toBe('prove_worthiness');
  });
});

describe('validateModeResponse', () => {
  it('accepts a well-formed response for each mode', () => {
    for (const mode of MODES) {
      const raw = JSON.stringify({ mode, reasoning: 'because the lore says so' });
      expect(validateModeResponse(raw)).toBe(true);
    }
  });

  it('accepts a response wrapped in code fences', () => {
    const raw = '```json\n{"mode":"trial","reasoning":"earned by the worthy"}\n```';
    expect(validateModeResponse(raw)).toBe(true);
  });

  it('rejects unknown mode values', () => {
    const raw = JSON.stringify({ mode: 'destroyed', reasoning: 'made up' });
    expect(validateModeResponse(raw)).toBe(false);
  });

  it('rejects responses without a mode field', () => {
    const raw = JSON.stringify({ reasoning: 'no mode here' });
    expect(validateModeResponse(raw)).toBe(false);
  });

  it('rejects malformed JSON', () => {
    expect(validateModeResponse('{not json')).toBe(false);
    expect(validateModeResponse('')).toBe(false);
    expect(validateModeResponse(null)).toBe(false);
  });

  it('rejects arrays at the top level', () => {
    const raw = JSON.stringify([{ mode: 'forgotten' }]);
    expect(validateModeResponse(raw)).toBe(false);
  });
});

describe('buildModeInferencePrompt', () => {
  it('includes the item name, type, physical description, and lore', () => {
    const item = {
      name: 'The Helm of Eikheim',
      item_type: 'Wondrous Item',
      physical_description: 'a black iron helm with no visor',
      lore: 'forged in the deep places by the sons of Eikheim, lost when the line fell',
    };
    const prompt = buildModeInferencePrompt(item);
    expect(prompt).toContain('The Helm of Eikheim');
    expect(prompt).toContain('Wondrous Item');
    expect(prompt).toContain('a black iron helm with no visor');
    expect(prompt).toContain('forged in the deep places');
  });

  it('handles missing fields with explicit placeholders', () => {
    const prompt = buildModeInferencePrompt({});
    expect(prompt).toContain('(unnamed)');
    expect(prompt).toContain('(unspecified)');
    expect(prompt).toContain('(none)');
  });

  it('handles null / undefined input without throwing', () => {
    expect(() => buildModeInferencePrompt(null)).not.toThrow();
    expect(() => buildModeInferencePrompt(undefined)).not.toThrow();
  });

  it('lists the four mode options', () => {
    const prompt = buildModeInferencePrompt({ name: 'x' });
    for (const mode of MODES) {
      expect(prompt).toContain(`"${mode}"`);
    }
  });
});

describe('inferItemDungeonMode', () => {
  beforeEach(() => {
    generateGptResponse.mockReset();
  });

  it('returns the inferred mode when the call succeeds', async () => {
    generateGptResponse.mockResolvedValue(
      JSON.stringify({ mode: 'trial', reasoning: 'the lore names a guardians-test' })
    );
    const result = await inferItemDungeonMode({ name: 'x', lore: 'won by trial' });
    expect(result.mode).toBe('trial');
    expect(result.reasoning).toBe('the lore names a guardians-test');
  });

  it('handles each mode round-trip', async () => {
    for (const mode of MODES) {
      generateGptResponse.mockResolvedValueOnce(
        JSON.stringify({ mode, reasoning: 'fits' })
      );
      const result = await inferItemDungeonMode({ name: 'x' });
      expect(result.mode).toBe(mode);
    }
  });

  it('defaults to forgotten when the AI call rejects', async () => {
    generateGptResponse.mockRejectedValue(new Error('network down'));
    const result = await inferItemDungeonMode({ name: 'x' });
    expect(result.mode).toBe('forgotten');
    expect(result.reasoning).toMatch(/failed/i);
  });

  it('defaults to forgotten when the response is empty', async () => {
    generateGptResponse.mockResolvedValue('');
    const result = await inferItemDungeonMode({ name: 'x' });
    expect(result.mode).toBe('forgotten');
  });

  it('defaults to forgotten when no item is provided', async () => {
    const result = await inferItemDungeonMode(null);
    expect(result.mode).toBe('forgotten');
    expect(generateGptResponse).not.toHaveBeenCalled();
  });

  it('defaults to forgotten when the response mode is unrecognized', async () => {
    // The validator rejects unknown modes before the parse step, so
    // this scenario only fires when retries are exhausted and an
    // invalid response slipped through. The fallback at the final
    // mode-check provides defense in depth.
    generateGptResponse.mockResolvedValue(JSON.stringify({ mode: 'destroyed' }));
    const result = await inferItemDungeonMode({ name: 'x' });
    expect(result.mode).toBe('forgotten');
  });

  it('trims and preserves the reasoning text on success', async () => {
    generateGptResponse.mockResolvedValue(
      JSON.stringify({ mode: 'revered', reasoning: '  cult-shrine framing  ' })
    );
    const result = await inferItemDungeonMode({ name: 'x' });
    expect(result.reasoning).toBe('cult-shrine framing');
  });
});
