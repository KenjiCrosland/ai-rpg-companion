/**
 * Tests for inheritance.mjs — applyInheritanceFromSiblings.
 *
 * Coverage spans the verification cases from the inheritance spec
 * (option A — broad type only):
 *
 *   - Two same-type siblings share register and character.
 *   - First-of-type with no siblings: dimensions pass through (caller
 *     decides whether to use parent register or roll fresh).
 *   - Sibling fields that are null fall through to base values (so a
 *     half-initialized sibling can't clobber an inferred value).
 *   - Pure function: inputs are not mutated.
 */

import { applyInheritanceFromSiblings } from './inheritance.mjs';

describe('applyInheritanceFromSiblings', () => {
  it('returns base dimensions unchanged when there are no siblings', () => {
    const base = {
      register: 'Welsh-inspired',
      character: ['ancient', 'lawful', 'mercantile'],
      tension: 'inheritance-burden',
    };
    expect(applyInheritanceFromSiblings(base, [])).toEqual(base);
    expect(applyInheritanceFromSiblings(base, null)).toEqual(base);
    expect(applyInheritanceFromSiblings(base, undefined)).toEqual(base);
  });

  it('overrides register and character with the first sibling when present', () => {
    const base = {
      register: 'Anglo-Saxon-inspired',           // would be inferred otherwise
      character: ['plague-stricken', 'pious'],     // would be inferred otherwise
      tension: 'imminent-crisis',
    };
    const siblings = [
      { register: 'Welsh-inspired', character: ['ancient', 'lawful', 'mercantile'] },
      { register: 'Norse-inspired', character: ['martial'] }, // not used (only first)
    ];
    const result = applyInheritanceFromSiblings(base, siblings);
    expect(result.register).toBe('Welsh-inspired');
    expect(result.character).toEqual(['ancient', 'lawful', 'mercantile']);
    // Tension passes through untouched — inheritance only covers register + character.
    expect(result.tension).toBe('imminent-crisis');
  });

  it('falls through to base register when the sibling has null/missing register', () => {
    const base = { register: 'Anglo-Saxon-inspired', character: ['quiet'] };
    const siblings = [{ register: null, character: ['mercantile'] }];
    const result = applyInheritanceFromSiblings(base, siblings);
    // Null register on sibling doesn't clobber the base value.
    expect(result.register).toBe('Anglo-Saxon-inspired');
    // Character on sibling is non-empty, so it does override.
    expect(result.character).toEqual(['mercantile']);
  });

  it('falls through to base character when the sibling has empty/missing character', () => {
    const base = { register: 'Welsh-inspired', character: ['hopeful'] };
    const siblings = [{ register: 'Norse-inspired', character: [] }];
    const result = applyInheritanceFromSiblings(base, siblings);
    // Sibling register overrides; empty character array falls through to base.
    expect(result.register).toBe('Norse-inspired');
    expect(result.character).toEqual(['hopeful']);
  });

  it('handles a sibling missing both fields by passing through all base values', () => {
    const base = { register: 'Welsh-inspired', character: ['ancient'] };
    const siblings = [{}];
    expect(applyInheritanceFromSiblings(base, siblings)).toEqual(base);
  });

  it('handles a null first sibling without throwing', () => {
    const base = { register: 'Welsh-inspired', character: ['ancient'] };
    expect(applyInheritanceFromSiblings(base, [null])).toEqual(base);
  });

  it('preserves other base fields (tension, userName, etc.) untouched', () => {
    const base = {
      register: 'A',
      character: ['x'],
      tension: 'cozy-routine',
      userName: 'Maplewood',
      bannedTropes: ['trope1', 'trope2'],
    };
    const siblings = [{ register: 'B', character: ['y'] }];
    const result = applyInheritanceFromSiblings(base, siblings);
    expect(result.tension).toBe('cozy-routine');
    expect(result.userName).toBe('Maplewood');
    expect(result.bannedTropes).toEqual(['trope1', 'trope2']);
  });

  it('does not mutate the input dimensions or siblings array', () => {
    const base = { register: 'A', character: ['x'], tension: 't' };
    const siblings = [{ register: 'B', character: ['y'] }];
    const baseSnapshot = JSON.parse(JSON.stringify(base));
    const siblingsSnapshot = JSON.parse(JSON.stringify(siblings));

    applyInheritanceFromSiblings(base, siblings);

    expect(base).toEqual(baseSnapshot);
    expect(siblings).toEqual(siblingsSnapshot);
  });

  it('handles a null/undefined dimensions object gracefully', () => {
    // Returning a fresh object with whatever the sibling provides is
    // fine; the caller would be misusing the helper here, but we don't
    // throw.
    const siblings = [{ register: 'A', character: ['x'] }];
    const result = applyInheritanceFromSiblings(null, siblings);
    expect(result.register).toBe('A');
    expect(result.character).toEqual(['x']);
  });
});

describe('applyInheritanceFromSiblings — verification scenarios from spec', () => {
  it('"Two settings seeded from one item: share register and character"', () => {
    // First setting Tockwrought Vault generates with these dimensions.
    const firstSetting = {
      register: 'Welsh-inspired',
      character: ['ancient', 'lawful', 'mercantile'],
      tension: 'inheritance-burden',
    };
    // Second setting Hill of Sleeping Gearwheels would otherwise infer
    // its own register and character from the prefill prose.
    const secondInferred = {
      register: 'Anglo-Saxon-inspired',
      character: ['quiet', 'rustic', 'old'],
      tension: 'cozy-routine', // tension stays fresh
    };
    const result = applyInheritanceFromSiblings(secondInferred, [firstSetting]);
    expect(result.register).toBe('Welsh-inspired');
    expect(result.character).toEqual(['ancient', 'lawful', 'mercantile']);
    // Tension stays specific to this generation.
    expect(result.tension).toBe('cozy-routine');
  });

  it('"First dungeon from a setting: inherits register from setting; rolls own character"', () => {
    // The caller (SettingGenerator) sets up base dimensions with
    // parentRegister and a freshly-rolled character. No siblings yet,
    // so inheritance is a no-op and the caller's defaults stand.
    const base = {
      register: 'Welsh-inspired',          // from parent
      character: ['echoing', 'ancient', 'cursed'], // freshly rolled
    };
    const result = applyInheritanceFromSiblings(base, []);
    expect(result).toEqual(base);
  });

  it('"Two dungeons under one setting: share register and character"', () => {
    const firstDungeon = {
      register: 'Welsh-inspired',
      character: ['echoing', 'ancient', 'cursed'],
    };
    const secondBase = {
      register: 'Welsh-inspired',         // parent register (no change)
      character: ['flooded', 'shifting'], // would be rolled fresh otherwise
    };
    const result = applyInheritanceFromSiblings(secondBase, [firstDungeon]);
    expect(result.register).toBe('Welsh-inspired');
    expect(result.character).toEqual(['echoing', 'ancient', 'cursed']);
  });
});
