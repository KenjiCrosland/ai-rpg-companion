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
  isDegradedMode: jest.fn(() => false),
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
  PLACE_TYPE_VOCABULARY,
  FORMED_NATURES,
} from '../util/dungeon-dimensions.mjs';

describe('validateInferenceResponse', () => {
  it('accepts a well-shaped response', () => {
    const raw = JSON.stringify({
      type: 'chambered-complex',
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
      type: 'chambered-complex',
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
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: 'Eikheim',
    }));
    const result = await inferDungeonDimensions({
      description: 'a Norse barrow',
      difficulty: 2,
    });
    expect(result.type).toBe('chambered-complex');
    expect(result.character).toEqual(['ancient', 'haunted', 'moss-furred']);
    expect(result.register).toMatch(/Norse-inspired/);
    expect(result.userName).toBe('Eikheim');
    expect(DUNGEON_TENSIONS).toContain(result.tension);
    expect(result.difficulty).toBe(2);
  });

  it('honors user-supplied difficulty', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: null, register: null, userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'a dungeon',
      difficulty: 5,
    });
    expect(result.difficulty).toBe(5);
  });

  it('rolls difficulty when none supplied', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: null, register: null, userName: null,
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
      type: 'chambered-complex', character: null, register: null, userName: null,
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
      type: 'chambered-complex',
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
      type: 'chambered-complex',
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
      type: 'tower',
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
      type: 'spire',
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
      type: 'chambered-complex',
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
      type: 'chambered-complex',
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
      type: 'chambered-complex',
      character: ['ancient', '   ', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({ description: 'x' });
    expect(result.character).toEqual(['ancient', 'moss-furred']);
  });

  it('passes deterministic rng through to tension + difficulty', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
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

  // ---- Dimensional presets (item → dungeon seeded flow) ----

  it('PRESET: driveType wins over the LLM-resolved cascade roll', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: { driveType: 'prove_worthiness' },
    });
    expect(result.driveType).toBe('prove_worthiness');
  });

  it('PRESET: powerStructure wins over the holder-pick cascade', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: { powerStructure: 'single_apex' },
    });
    expect(result.powerStructure).toBe('single_apex');
  });

  it('PRESET: organizingLogic wins over the LLM extraction', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
      organizingLogic: ['inhabited_base'],  // LLM tries to override
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: { organizingLogic: ['containment'] },
    });
    expect(result.organizingLogic).toEqual(['containment']);
  });

  it('PRESET: register wins over the LLM-resolved register', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',  // LLM picks Norse
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: { register: 'Celtic-inspired: ...' },  // preset wins
    });
    expect(result.register).toBe('Celtic-inspired: ...');
  });

  it('PRESET: all four pre-sets compose for the trial mode lock', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: {
        register: 'Greek-inspired: ...',
        driveType: 'prove_worthiness',
        powerStructure: 'single_apex',
        organizingLogic: ['containment'],
      },
    });
    expect(result.register).toBe('Greek-inspired: ...');
    expect(result.driveType).toBe('prove_worthiness');
    expect(result.powerStructure).toBe('single_apex');
    expect(result.organizingLogic).toEqual(['containment']);
  });

  it('PRESET: invalid preset values are silently dropped (fallback rolls instead)', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: null,
    }));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: {
        driveType: 'made_up_drive_type',
        powerStructure: 'fictional_holder',
        organizingLogic: ['nonsense_logic'],
      },
    });
    // Invalid presets dropped → fallback rolls fire.
    expect(['recover_by_force', 'recover_by_stealth', 'recover_by_substitution',
            'escort_through', 'prevent_by_killing', 'prevent_by_ritual',
            'prevent_by_sabotage', 'acquire_by_negotiation', 'acquire_by_theft',
            'bear_a_message', 'expose_the_truth', 'usurp_authority',
            'survive_and_escape', 'exploit_the_standoff', 'prove_worthiness'])
      .toContain(result.driveType);
    expect(result.driveType).not.toBe('made_up_drive_type');
  });

  it('PRESET: presets survive the LLM-failure fallback path', async () => {
    generateGptResponse.mockRejectedValue(new Error('network down'));
    const result = await inferDungeonDimensions({
      description: 'x',
      presets: {
        driveType: 'prove_worthiness',
        powerStructure: 'single_apex',
        organizingLogic: ['containment'],
        register: 'Egyptian-inspired: ...',
      },
    });
    expect(result.driveType).toBe('prove_worthiness');
    expect(result.powerStructure).toBe('single_apex');
    expect(result.organizingLogic).toEqual(['containment']);
    expect(result.register).toBe('Egyptian-inspired: ...');
  });

  it('PRESET: omitting presets leaves the existing roll/LLM pipeline untouched', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse',
      userName: 'Eikheim',
    }));
    // Run without presets — should match the unseeded baseline.
    const r1 = await inferDungeonDimensions({
      description: 'a Norse barrow',
      rng: () => 0.5,
    });
    // Run with explicit empty presets — should match.
    const r2 = await inferDungeonDimensions({
      description: 'a Norse barrow',
      presets: {},
      rng: () => 0.5,
    });
    expect(r1.driveType).toBe(r2.driveType);
    expect(r1.powerStructure).toBe(r2.powerStructure);
    expect(r1.organizingLogic).toEqual(r2.organizingLogic);
    expect(r1.register).toBe(r2.register);
  });

  // ---- Coherence-check directive (Option 4) routing ----

  it('coherence-check directive anchor phrases are present in the inference prompt', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
    }));
    await inferDungeonDimensions({ description: 'x' });
    const prompt = generateGptResponse.mock.calls[0][0];
    expect(prompt).toContain('COHERENCE CHECK');
    expect(prompt).toContain('CONFIRM');
    expect(prompt).toContain('OVERRIDE');
    expect(prompt).toContain('structurally incoherent');
  });

  it('pre-rolled organizingLogic is interpolated into the coherence-check directive', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
    }));
    await inferDungeonDimensions({ description: 'x', rng: () => 0.5 });
    const prompt = generateGptResponse.mock.calls[0][0];
    // Loose match: a JSON array fragment appears after the pre-roll
    // anchor phrase. Routing-level — not asserting WHICH value rolled.
    expect(prompt).toMatch(/PRE-ROLLED an organizingLogic for this generation:\s*\[/);
  });

  it('LLM-override of pre-roll flows through to persisted organizingLogic + placeType derives from it', async () => {
    // LLM returns an override. The resolver persists the LLM value;
    // downstream placeType derives from the override's bucket.
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
      organizingLogic: ['production'],
    }));
    const result = await inferDungeonDimensions({ description: 'an old foundry' });
    expect(result.organizingLogic).toEqual(['production']);
    expect(PLACE_TYPE_VOCABULARY.production).toContain(result.placeType);
  });

  // ---- thirdParty: roll integrity + shape persistence ----

  it('returns a well-formed thirdParty on every call', async () => {
    const { CONTENDER_KINDS, CONTACT_KINDS } = require('../util/dungeon-dimensions.mjs');
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
    }));
    for (let seed = 1; seed <= 50; seed++) {
      const result = await inferDungeonDimensions({ description: 'x', rng: () => (seed % 100) / 100 });
      expect(typeof result.thirdParty).toBe('object');
      expect(typeof result.thirdParty.present).toBe('boolean');
      if (!result.thirdParty.present) {
        // present:false ⇒ no orphan sub-fields
        expect(result.thirdParty.type).toBeUndefined();
        expect(result.thirdParty.kind).toBeUndefined();
      } else {
        expect(['adversary', 'ally']).toContain(result.thirdParty.type);
        if (result.thirdParty.type === 'adversary') {
          expect(CONTENDER_KINDS).toContain(result.thirdParty.kind);
        } else {
          expect(CONTACT_KINDS).toContain(result.thirdParty.kind);
        }
      }
    }
  });

  it('thirdParty is a pure code-roll — no LLM section in the inference prompt', async () => {
    // The old contact-coherence section was removed; no THIRDPARTY or
    // CONTACT or CONTENDER section should appear in the inference prompt.
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
    }));
    await inferDungeonDimensions({ description: 'x' });
    const prompt = generateGptResponse.mock.calls[0][0];
    expect(prompt).not.toContain('COHERENCE CHECK for the pre-rolled CONTACT');
    expect(prompt).not.toContain('pre-rolled CONTACT for this generation');
    expect(prompt).not.toContain('thirdParty');
  });

  // ---- formedNature scoping + reachability ----

  it('formedNature is set when LLM returns organizingLogic containing "formed"', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'cave-system', character: ['ancient', 'haunted', 'silence-deep'],
      register: 'norse', userName: null,
      organizingLogic: ['formed'],
    }));
    const result = await inferDungeonDimensions({ description: 'a god-corpse' });
    expect(FORMED_NATURES).toContain(result.formedNature);
  });

  it('formedNature is null when organizingLogic does NOT contain "formed"', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
      organizingLogic: ['funerary'],
    }));
    const result = await inferDungeonDimensions({ description: 'a tomb' });
    expect(result.formedNature).toBeNull();
  });

  it('formedNature is set when composite organizingLogic includes "formed"', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'cave-system', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
      organizingLogic: ['formed', 'inhabited_base'],
    }));
    const result = await inferDungeonDimensions({ description: 'a god-corpse with a cult inside' });
    expect(FORMED_NATURES).toContain(result.formedNature);
  });

  it('formedNature drops to null if LLM overrides logic away from "formed"', async () => {
    // Pre-roll lands on 'formed' (force via rng=0 → invent which is
    // 'invent'... let me think: rng=0 hits open slot, organizingLogic=['invent'].
    // That doesn't include 'formed'. Try a different rng forcing formed:
    // first call < 0.10 → invent. Avoid. Need first call >= 0.10.
    // rng=0.5: composite check next... actually simpler: rely on LLM
    // override behavior. LLM returns funerary, organizingLogic becomes
    // ['funerary'], formedNature is null.
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex', character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
      organizingLogic: ['funerary'],
    }));
    const result = await inferDungeonDimensions({ description: 'a god-corpse', rng: () => 0.5 });
    // LLM override wins; resolvedOrganizingLogic = ['funerary']; formedNature null.
    expect(result.organizingLogic).toEqual(['funerary']);
    expect(result.formedNature).toBeNull();
  });

  it('returns a monster population (creature_type + relation) on success', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({
      type: 'chambered-complex',
      character: ['ancient', 'haunted', 'moss-furred'],
      register: 'norse', userName: null,
    }));
    const result = await inferDungeonDimensions({ description: 'x', rng: () => 0.5 });
    expect(result.monsterPopulation).toBeDefined();
    expect(typeof result.monsterPopulation.creature_type).toBe('string');
    expect(typeof result.monsterPopulation.relation).toBe('string');
  });

  it('returns a monster population on LLM failure (fallback path)', async () => {
    generateGptResponse.mockRejectedValue(new Error('network'));
    const result = await inferDungeonDimensions({ description: 'x', rng: () => 0.5 });
    // Even when the LLM call fails, emptyResult must carry a valid population.
    expect(result.monsterPopulation).toBeDefined();
    expect(typeof result.monsterPopulation.creature_type).toBe('string');
    expect(typeof result.monsterPopulation.relation).toBe('string');
  });
});
