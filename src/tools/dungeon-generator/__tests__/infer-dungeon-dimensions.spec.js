/**
 * Tests for infer-dungeon-dimensions.
 *
 * Covers:
 *   1. validateInferenceResponse — accepts the four-field shape,
 *      rejects malformed payloads.
 *   2. inferDungeonDimensions — the full async pipeline with the
 *      LLM call mocked. Verifies: difficulty resolution, tension
 *      code-pick, register routing, type fallback when LLM returns
 *      something invalid, and graceful failure.
 */

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

import { generateGptResponse } from '@/util/ai-client.mjs';
import {
  inferDungeonDimensions,
  validateInferenceResponse,
} from '../util/infer-dungeon-dimensions.mjs';
import {
  DUNGEON_TYPES,
  DUNGEON_TENSIONS,
  DIFFICULTY_TIER_KEYS,
} from '../util/dungeon-dimensions.mjs';

describe('validateInferenceResponse', () => {
  it('accepts a well-shaped response', () => {
    const raw = JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'old-norse',
      userName: 'Eikheim',
    });
    expect(validateInferenceResponse(raw)).toBe(true);
  });

  it('accepts nulls in any field', () => {
    const raw = JSON.stringify({
      type: null, character: null, register: null, userName: null,
    });
    expect(validateInferenceResponse(raw)).toBe(true);
  });

  it('strips markdown code fences before parsing', () => {
    const raw = '```json\n{"type":"tomb","character":["ancient","haunted","moss-furred"],"register":"old-norse","userName":null}\n```';
    expect(validateInferenceResponse(raw)).toBe(true);
  });

  it('rejects malformed JSON', () => {
    expect(validateInferenceResponse('{not json')).toBe(false);
    expect(validateInferenceResponse('')).toBe(false);
    expect(validateInferenceResponse(null)).toBe(false);
  });

  it('rejects character that is not an array of strings', () => {
    const raw = JSON.stringify({
      type: 'tomb',
      character: [1, 2, 3],
      register: 'old-norse',
      userName: null,
    });
    expect(validateInferenceResponse(raw)).toBe(false);
  });

  it('rejects when fields are wrong type', () => {
    expect(validateInferenceResponse(JSON.stringify({
      type: 123, character: null, register: null, userName: null,
    }))).toBe(false);
    expect(validateInferenceResponse(JSON.stringify({
      type: null, character: null, register: 123, userName: null,
    }))).toBe(false);
  });
});

describe('inferDungeonDimensions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all six dimensions on a successful LLM response', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: 'Eikheim',
    }));
    const result = await inferDungeonDimensions({
      description: 'a Norse barrow',
      difficulty: 2,
    });
    expect(result.type).toBe('tomb');
    expect(result.character).toEqual(['ancient', 'haunted', 'moss-furred']);
    expect(result.register).toMatch(/Norse-inspired/);
    expect(result.userName).toBe('Eikheim');
    expect(DUNGEON_TENSIONS).toContain(result.tension);
    expect(result.difficulty).toBe(2);
  });

  it('honors user-supplied difficulty', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb', character: null, register: null, userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 5,
    });
    expect(result.difficulty).toBe(5);
  });

  it('rolls difficulty when none supplied', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb', character: null, register: null, userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      // no difficulty
      rng: () => 0, // first tier
    });
    expect(DIFFICULTY_TIER_KEYS).toContain(result.difficulty);
  });

  it('rejects an out-of-pool difficulty and rolls instead', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb', character: null, register: null, userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 99,
      rng: () => 0,
    });
    expect(DIFFICULTY_TIER_KEYS).toContain(result.difficulty);
    expect(result.difficulty).toBe(1);
  });

  it('code-picks tension uniformly (LLM has no say)', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    // rng=0 → first tension
    const r0 = await inferDungeonDimensions({ description: 'x', rng: () => 0 });
    expect(r0.tension).toBe(DUNGEON_TENSIONS[0]);
    // rng=0.9999 → last tension
    const rLast = await inferDungeonDimensions({ description: 'x', rng: () => 0.9999 });
    expect(rLast.tension).toBe(DUNGEON_TENSIONS[DUNGEON_TENSIONS.length - 1]);
  });

  it('falls back to a weighted-pool type when LLM returns an out-of-pool type', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'not-a-real-type',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 3,
    });
    expect(DUNGEON_TYPES).toContain(result.type);
    expect(result.type).not.toBe('not-a-real-type');
  });

  it('returns code-rolled defaults when the LLM call throws', async () => {
    generateGptResponse.mockRejectedValue(new Error('network'));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 3,
      rng: () => 0,
    });
    expect(DUNGEON_TYPES).toContain(result.type);
    expect(DUNGEON_TENSIONS).toContain(result.tension);
    expect(result.difficulty).toBe(3);
  });

  it('returns code-rolled defaults when the LLM response is malformed', async () => {
    generateGptResponse.mockResolvedValue('not json');
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 2,
      rng: () => 0,
    });
    expect(DUNGEON_TYPES).toContain(result.type);
    expect(result.difficulty).toBe(2);
  });

  it('empty-input case routes register to a random humanoid register (fantasy_unspecified path)', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      // LLM picks "fantasy_unspecified" because there's no signal,
      // but on the empty-input path we go to the FULL humanoid pool
      // (not the Western-medieval default).
      register: 'fantasy_unspecified',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: '',
      lore: '',
    });
    expect(result.register).toBeTruthy();
    expect(typeof result.register).toBe('string');
  });

  it('user-input fantasy_unspecified routes to the Western-medieval default pool', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'fortress',
      character: ['embattled', 'feudal', 'snow-bound'],
      register: 'fantasy_unspecified',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a border keep besieged through the long winter',
    });
    // Western-medieval defaults all start with one of a curated set of
    // prefixes. We just check it's a non-empty string from the pool.
    expect(result.register).toBeTruthy();
    expect(typeof result.register).toBe('string');
  });

  it('user-input with explicit register signal honors the LLM token', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'ziggurat',
      character: ['scholarly', 'ancient', 'sun-scorched'],
      register: 'mesopotamian',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a Mesopotamian-style ziggurat',
    });
    expect(result.register).toMatch(/Mesopotamian/);
  });

  it('user-input with explicit null register honors the null', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'wreck',
      character: ['fallen', 'verdigris-streaked', 'silence-deep'],
      register: null,
      userName: 'Velrith',
    }));
    const result = await inferDungeonDimensions({
      description: 'the wreck of the Velrith, sunk off the Drowning Coast',
    });
    expect(result.register).toBeNull();
  });

  it('preserves user-supplied name verbatim', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: 'the Hollow Vault',
    }));
    const result = await inferDungeonDimensions({
      description: 'an old tomb called the Hollow Vault',
    });
    expect(result.userName).toBe('the Hollow Vault');
  });

  it('normalizes a userName with whitespace', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: '  Eikheim  ',
    }));
    const result = await inferDungeonDimensions({
      description: 'a tomb called Eikheim',
    });
    expect(result.userName).toBe('Eikheim');
  });

  it('character filter drops empty / whitespace-only entries', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', '   ', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({ description: 'x' });
    expect(result.character).toEqual(['ancient', 'moss-furred']);
  });

  it('passes deterministic rng through to tension + difficulty', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'tomb',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    // Same seed, same outcome.
    const r1 = await inferDungeonDimensions({ description: 'x', rng: () => 0.5 });
    const r2 = await inferDungeonDimensions({ description: 'x', rng: () => 0.5 });
    expect(r1.tension).toBe(r2.tension);
    expect(r1.difficulty).toBe(r2.difficulty);
  });
});
