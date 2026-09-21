import {
  inferRegisterAndName,
  validateInferenceResponse,
  TOKEN_TO_REGISTER_PREFIX,
  FANTASY_UNSPECIFIED,
} from './infer-register-and-name.mjs';
import * as aiClient from '@/util/ai-client.mjs';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
  isDegradedMode: jest.fn(() => false),
}));

describe('validateInferenceResponse — JSON-shape validation', () => {
  it.each([
    ['both fields populated', '{"register":"goblin","userName":"Boblin"}'],
    ['null register, null userName', '{"register":null,"userName":null}'],
    ['null register, populated userName', '{"register":null,"userName":"Gary"}'],
    ['populated register, null userName', '{"register":"elven","userName":null}'],
    ['markdown-fenced JSON', '```json\n{"register":"goblin","userName":null}\n```'],
    ['leading/trailing whitespace', '   {"register":"goblin","userName":null}   '],
  ])('accepts %s', (_label, raw) => {
    expect(validateInferenceResponse(raw)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['plain prose (not JSON)', 'register is goblin'],
    ['malformed JSON', '{register: goblin}'],
    ['array instead of object', '[]'],
    ['register has wrong type', '{"register":42,"userName":null}'],
    ['userName has wrong type', '{"register":null,"userName":[]}'],
    ['null literal (typeof)', null],
    ['number', 42],
  ])('rejects %s', (_label, raw) => {
    expect(validateInferenceResponse(raw)).toBe(false);
  });
});

describe('inferRegisterAndName — routing behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns {null,null} when input is empty (no LLM call)', async () => {
    const result = await inferRegisterAndName('');
    expect(result).toEqual({ register: null, userName: null });
    expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
  });

  it('returns {null,null} when input is whitespace-only (no LLM call)', async () => {
    const result = await inferRegisterAndName('   ');
    expect(result).toEqual({ register: null, userName: null });
    expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
  });

  it('returns {null,null} when input is non-string (no LLM call)', async () => {
    expect(await inferRegisterAndName(null)).toEqual({ register: null, userName: null });
    expect(await inferRegisterAndName(undefined)).toEqual({ register: null, userName: null });
    expect(await inferRegisterAndName(42)).toEqual({ register: null, userName: null });
    expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
  });

  it('resolves a known register token to the full registerList descriptor', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"goblin","userName":"Boblin"}');
    const result = await inferRegisterAndName('goblin named Boblin');
    expect(result.register).not.toBeNull();
    expect(result.register.startsWith('Goblin-inspired')).toBe(true);
    expect(result.userName).toBe('Boblin');
  });

  it('returns null register when LLM responds with null register', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":null,"userName":null}');
    const result = await inferRegisterAndName('an edgerunner with cyberpsychosis');
    expect(result).toEqual({ register: null, userName: null });
  });

  it('returns FANTASY_UNSPECIFIED sentinel when LLM responds with that token', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"fantasy_unspecified","userName":null}');
    const result = await inferRegisterAndName('a tavern patron');
    expect(result.register).toBe(FANTASY_UNSPECIFIED);
    expect(result.userName).toBeNull();
  });

  it('FANTASY_UNSPECIFIED is distinct from null (separate routing signals)', async () => {
    // The sentinel must NOT equal null — the orchestrator branches on
    // identity to decide whether to roll a random fantasy register
    // (fantasy_unspecified) or skip the whitelist entirely (null).
    expect(FANTASY_UNSPECIFIED).not.toBeNull();
    expect(FANTASY_UNSPECIFIED).toBe('fantasy_unspecified');
  });

  it('returns FANTASY_UNSPECIFIED preserving userName when generic fantasy NPC has a name', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"fantasy_unspecified","userName":"Marcus"}');
    const result = await inferRegisterAndName('a tavern patron named Marcus');
    expect(result.register).toBe(FANTASY_UNSPECIFIED);
    expect(result.userName).toBe('Marcus');
  });

  it('handles uppercase FANTASY_UNSPECIFIED token from LLM', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"FANTASY_UNSPECIFIED","userName":null}');
    const result = await inferRegisterAndName('a wandering merchant');
    expect(result.register).toBe(FANTASY_UNSPECIFIED);
  });

  it('returns userName even when register is null (non-fantasy named character)', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":null,"userName":"Jax Voss"}');
    const result = await inferRegisterAndName('an edgerunner named Jax Voss');
    expect(result.register).toBeNull();
    expect(result.userName).toBe('Jax Voss');
  });

  it('strips markdown code fences from LLM response before parsing', async () => {
    aiClient.generateGptResponse.mockResolvedValue('```json\n{"register":"elven","userName":null}\n```');
    const result = await inferRegisterAndName('an elven scout');
    expect(result.register.startsWith('Elven')).toBe(true);
  });

  it('returns null register for unknown token (LLM made one up)', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"vulcan","userName":null}');
    const result = await inferRegisterAndName('a logical sci-fi alien');
    expect(result.register).toBeNull();
  });

  it('returns null userName for empty / whitespace string', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"elven","userName":""}');
    const result = await inferRegisterAndName('an elven scout');
    expect(result.userName).toBeNull();

    aiClient.generateGptResponse.mockResolvedValue('{"register":"elven","userName":"   "}');
    const result2 = await inferRegisterAndName('an elven scout');
    expect(result2.userName).toBeNull();
  });

  it('graceful: returns {null,null} on LLM error', async () => {
    aiClient.generateGptResponse.mockRejectedValue(new Error('network'));
    const result = await inferRegisterAndName('an elven scout');
    expect(result).toEqual({ register: null, userName: null });
  });

  // The recognize-then-gate trio below describes the contract for both
  // flag states. The classifier always recognizes the cultural signal;
  // the resolver's lookup in `registerList` decides whether the
  // descriptor is reachable. With `enableProtectedRegisters` OFF
  // (current state), these tokens resolve to null and the orchestrator
  // falls through to freehand generation — the "drunken ronin" →
  // Eckhart bug guard. When the flag flips back on, the same tokens
  // resolve to their descriptors and the catchall protection
  // machinery handles the safety surface downstream.

  it('recognize-then-gate: maori token resolves to null when flag is off', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"maori","userName":null}');
    const result = await inferRegisterAndName('a Maori-inspired warrior');
    expect(result.register).toBeNull();
  });

  it('recognize-then-gate: japanese token resolves to null when flag is off', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"japanese","userName":null}');
    const result = await inferRegisterAndName('a drunken ronin');
    expect(result.register).toBeNull();
  });

  it('recognize-then-gate: mongolian token resolves to null when flag is off', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"mongolian","userName":null}');
    const result = await inferRegisterAndName('a shaman of the eastern steppes');
    expect(result.register).toBeNull();
  });

  it('newly-mapped non-protected token: russian resolves to the Russian descriptor', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"russian","userName":null}');
    const result = await inferRegisterAndName("a boyar's huntsman");
    expect(result.register).not.toBeNull();
    expect(result.register.startsWith('Russian-inspired')).toBe(true);
  });

  it('newly-mapped non-protected token: egyptian resolves to the Egyptian descriptor', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"egyptian","userName":null}');
    const result = await inferRegisterAndName('a temple-scribe of the river-kingdom');
    expect(result.register).not.toBeNull();
    expect(result.register.startsWith('Egyptian-inspired')).toBe(true);
  });

  it('newly-mapped non-protected token: norse resolves to the Norse descriptor', async () => {
    aiClient.generateGptResponse.mockResolvedValue('{"register":"norse","userName":null}');
    const result = await inferRegisterAndName('a viking shield-maiden');
    expect(result.register).not.toBeNull();
    expect(result.register.startsWith('Norse-inspired')).toBe(true);
  });

  it('escapes embedded double quotes in user input so the prompt JSON stays valid', async () => {
    // Smoke check — a user input with embedded quotes must not break
    // the prompt template's surrounding `"…"`.
    aiClient.generateGptResponse.mockResolvedValue('{"register":null,"userName":null}');
    await inferRegisterAndName('the man known as "the Nail"');
    const promptArg = aiClient.generateGptResponse.mock.calls[0][0];
    // The escaped form should appear; the unescaped form would have
    // closed the surrounding quote prematurely.
    expect(promptArg).toContain('\\"the Nail\\"');
  });
});
