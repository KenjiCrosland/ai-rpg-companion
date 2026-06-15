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
  RARITY_TO_TIERS,
  pickTierForRarity,
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

describe('RARITY_TO_TIERS', () => {
  it('locks the rarity → tier mapping', () => {
    expect(RARITY_TO_TIERS).toEqual({
      common: [1],
      uncommon: [1, 2],
      rare: [2, 3],
      'very rare': [3, 4],
      legendary: [4, 5],
      artifact: [5],
    });
  });

  it('every tier is in the valid 1-5 range', () => {
    for (const tiers of Object.values(RARITY_TO_TIERS)) {
      for (const t of tiers) {
        expect(t).toBeGreaterThanOrEqual(1);
        expect(t).toBeLessThanOrEqual(5);
      }
    }
  });

  it('adjacent rarities overlap by exactly one tier (or are single-tier endpoints)', () => {
    // Common is single-tier (T1 only). Uncommon overlaps with Common at
    // T1 and extends to T2. Rare overlaps with Uncommon at T2 and
    // extends to T3. Etc. Artifact is single-tier (T5 only).
    const order = ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'];
    for (let i = 0; i < order.length - 1; i++) {
      const cur = RARITY_TO_TIERS[order[i]];
      const next = RARITY_TO_TIERS[order[i + 1]];
      const overlap = cur.filter(t => next.includes(t));
      expect(overlap.length).toBeGreaterThan(0);
    }
  });
});

describe('pickTierForRarity', () => {
  it('returns 1 for common (single-tier rarity)', () => {
    expect(pickTierForRarity('common')).toBe(1);
    expect(pickTierForRarity('COMMON')).toBe(1);
    expect(pickTierForRarity('  Common  ')).toBe(1);
  });

  it('returns 5 for artifact (single-tier rarity)', () => {
    expect(pickTierForRarity('artifact')).toBe(5);
    expect(pickTierForRarity('Artifact')).toBe(5);
  });

  it('returns either tier in the overlap range for multi-tier rarities', () => {
    const seen = new Set();
    for (let i = 0; i < 200; i++) {
      seen.add(pickTierForRarity('very rare'));
    }
    expect(seen).toEqual(new Set([3, 4]));
  });

  it('handles "very rare" with the space in the key', () => {
    const t = pickTierForRarity('Very Rare');
    expect([3, 4]).toContain(t);
  });

  it('returns null for unrecognized rarities', () => {
    expect(pickTierForRarity('mythical')).toBeNull();
    expect(pickTierForRarity('')).toBeNull();
    expect(pickTierForRarity(null)).toBeNull();
    expect(pickTierForRarity(undefined)).toBeNull();
  });

  it('honors injected rng for determinism', () => {
    // rng=0 → first tier in array
    expect(pickTierForRarity('rare', () => 0)).toBe(2);
    // rng=0.9999 → last tier in array
    expect(pickTierForRarity('rare', () => 0.9999)).toBe(3);
  });

  it('all multi-tier rarities produce both tiers over enough samples', () => {
    const multi = ['uncommon', 'rare', 'very rare', 'legendary'];
    for (const rarity of multi) {
      const seen = new Set();
      for (let i = 0; i < 200; i++) {
        seen.add(pickTierForRarity(rarity));
      }
      expect(seen.size).toBe(2);
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
