import { buildCharacterWhitelistBlock } from './character-whitelist-prompt.mjs';

describe('character-whitelist-prompt — return-value behavior', () => {
  // The block builder is a routing pass-through: empty string when no
  // pool matches OR the strictness gate fails, non-empty when a pool
  // matches AND the gate fires. The CONTENT of the non-empty case is
  // a prompt-string concern verified through manual production-review,
  // not via Jest assertions on prompt wording.

  it('returns empty string when no pool matches', () => {
    // Aesthetic origin + plain register, no pool to fire.
    expect(buildCharacterWhitelistBlock('Celestial', 'Latin-inspired: formal')).toBe('');
    expect(buildCharacterWhitelistBlock('Gnomish', 'Gnomish: clever')).toBe('');
    expect(buildCharacterWhitelistBlock(null, null)).toBe('');
    expect(buildCharacterWhitelistBlock(undefined, undefined)).toBe('');
  });

  it('returns non-empty when mandatory pool matches (regardless of mathRandom)', () => {
    // Orcish/Goblinoid mandatory: fires every time, no random gate.
    expect(buildCharacterWhitelistBlock('Orcish',    'Orcish: brutal',           0.99)).not.toBe('');
    expect(buildCharacterWhitelistBlock('Orcish',    'Orcish: brutal',           0)).not.toBe('');
    expect(buildCharacterWhitelistBlock('Goblinoid', 'Goblin-inspired: sharp',   0.99)).not.toBe('');
  });

  it('returns non-empty when preferred pool matches and mathRandom < 0.7', () => {
    // Elven/Dwarven preferred + roll under threshold → fires.
    expect(buildCharacterWhitelistBlock('Elven',   'Elven: elegant',   0)).not.toBe('');
    expect(buildCharacterWhitelistBlock('Dwarven', 'Old-Norse-inspired: Eddaic',   0.5)).not.toBe('');
    expect(buildCharacterWhitelistBlock('Elven',   'Elven: elegant',   0.69999)).not.toBe('');
  });

  it('returns empty when preferred pool matches but mathRandom >= 0.7', () => {
    // Strictness gate fails → no injection. The 30% case.
    expect(buildCharacterWhitelistBlock('Elven',    'Elven: elegant', 0.7)).toBe('');
    expect(buildCharacterWhitelistBlock('Dwarven',  'Old-Norse-inspired: Eddaic', 0.85)).toBe('');
    expect(buildCharacterWhitelistBlock('Draconic', 'Draconic: harsh',            0.95)).toBe('');
  });
});
