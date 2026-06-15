/**
 * Tests for extract-related-dungeons + item-dungeon-prompts.
 *
 * Mirrors the extract-related-settings test structure. Behavior over
 * shape: validator routing, prompt-content presence of the key
 * discrimination signals, orchestrator merge semantics. No prompt-
 * string-content tests beyond confirming the load-bearing
 * discriminator vocabulary is present.
 */

import {
  createItemDungeonExtractionPrompt,
  validateItemDungeonExtraction,
  buildDungeonPrefillFromItem,
} from '@/prompts/item-dungeon-prompts.mjs';
import {
  extractRelatedDungeons,
  mergeStubs,
} from '../utils/extract-related-dungeons.mjs';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));
import { generateGptResponse } from '@/util/ai-client.mjs';

describe('createItemDungeonExtractionPrompt', () => {
  it('includes the item name, type, rarity, physical description, and lore', () => {
    const item = {
      name: 'The Helm of Eikheim',
      item_type: 'Wondrous Item',
      rarity: 'Very Rare',
      physical_description: 'a black iron helm with no visor',
      lore: 'forged in the Hollow Vault, sealed beneath the Iron Hills',
    };
    const prompt = createItemDungeonExtractionPrompt(item);
    expect(prompt).toContain('The Helm of Eikheim');
    expect(prompt).toContain('Wondrous Item');
    expect(prompt).toContain('Very Rare');
    expect(prompt).toContain('a black iron helm');
    expect(prompt).toContain('forged in the Hollow Vault');
  });

  it('names the dungeon vs setting discrimination explicitly', () => {
    const prompt = createItemDungeonExtractionPrompt({ name: 'x', lore: 'y' });
    expect(prompt).toContain('DUNGEON vs SETTING');
    expect(prompt).toContain('SPECIFIC BOUNDED SITE');
    expect(prompt).toContain('REGION');
  });

  it('lists dungeon-shape vocabulary the model can pattern-match against', () => {
    const prompt = createItemDungeonExtractionPrompt({ name: 'x' });
    expect(prompt).toMatch(/Sepulcher|Tomb|Crypt|Barrow|Vault/);
    expect(prompt).toMatch(/Forge|Foundry|Hold|Warren/);
  });

  it('handles missing fields with explicit placeholders', () => {
    const prompt = createItemDungeonExtractionPrompt({});
    expect(prompt).toContain('(unnamed)');
    expect(prompt).toContain('(unspecified)');
    expect(prompt).toContain('(none)');
  });

  it('includes the existing-stubs block when stubs are passed', () => {
    const prompt = createItemDungeonExtractionPrompt(
      { name: 'x' },
      { existingStubs: [{ name: 'The Old Forge' }] }
    );
    expect(prompt).toContain('EXISTING DUNGEON STUBS');
    expect(prompt).toContain('The Old Forge');
  });

  it('omits the existing-stubs block when no stubs are passed', () => {
    const prompt = createItemDungeonExtractionPrompt({ name: 'x' });
    expect(prompt).not.toContain('EXISTING DUNGEON STUBS');
  });

  it('includes the item name verbatim in the role_brief example pattern', () => {
    const prompt = createItemDungeonExtractionPrompt({ name: 'Frost-Tongue' });
    expect(prompt).toContain('Frost-Tongue');
    expect(prompt).toContain('role_brief');
  });

  it('does not throw on null / undefined input', () => {
    expect(() => createItemDungeonExtractionPrompt(null)).not.toThrow();
    expect(() => createItemDungeonExtractionPrompt(undefined)).not.toThrow();
  });
});

describe('validateItemDungeonExtraction', () => {
  it('accepts a well-formed stub array', () => {
    const raw = JSON.stringify([
      { name: 'The Hollow Vault', role_brief: 'sealed the helm', context: 'a barrow', source_quote: 'sealed beneath' },
    ]);
    expect(validateItemDungeonExtraction(raw)).toBe(true);
  });

  it('accepts an empty array (no dungeons found in lore)', () => {
    expect(validateItemDungeonExtraction('[]')).toBe(true);
  });

  it('accepts stubs with missing source_quote (optional field)', () => {
    const raw = JSON.stringify([
      { name: 'The Hollow Vault', role_brief: 'r', context: 'c' },
    ]);
    expect(validateItemDungeonExtraction(raw)).toBe(true);
  });

  it('rejects stubs missing a name', () => {
    const raw = JSON.stringify([{ role_brief: 'r', context: 'c' }]);
    expect(validateItemDungeonExtraction(raw)).toBe(false);
  });

  it('rejects stubs with empty-string name', () => {
    const raw = JSON.stringify([{ name: '', role_brief: 'r', context: 'c' }]);
    expect(validateItemDungeonExtraction(raw)).toBe(false);
  });

  it('rejects top-level objects (not arrays)', () => {
    const raw = JSON.stringify({ name: 'x' });
    expect(validateItemDungeonExtraction(raw)).toBe(false);
  });

  it('rejects malformed JSON', () => {
    expect(validateItemDungeonExtraction('{not json')).toBe(false);
    expect(validateItemDungeonExtraction('')).toBe(false);
  });
});

describe('extractRelatedDungeons', () => {
  beforeEach(() => {
    generateGptResponse.mockReset();
  });

  it('returns an empty array when item is null', async () => {
    const result = await extractRelatedDungeons(null);
    expect(result).toEqual([]);
    expect(generateGptResponse).not.toHaveBeenCalled();
  });

  it('returns parsed stubs with dungeon_id seeded to null', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify([
      { name: 'The Hollow Vault', role_brief: 'sealed the helm', context: 'a barrow', source_quote: 'sealed beneath' },
      { name: 'The Bone-Maw Tomb', role_brief: 'where it was lost', context: 'a crypt', source_quote: 'lost in the tomb' },
    ]));
    const result = await extractRelatedDungeons({ name: 'x', lore: 'y' });
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('The Hollow Vault');
    expect(result[0].dungeon_id).toBeNull();
    expect(result[1].name).toBe('The Bone-Maw Tomb');
  });

  it('dedupes by case-insensitive name (preserves first occurrence)', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify([
      { name: 'The Vault', role_brief: 'one', context: 'a', source_quote: '' },
      { name: 'the vault', role_brief: 'two', context: 'b', source_quote: '' },
    ]));
    const result = await extractRelatedDungeons({ name: 'x' });
    expect(result).toHaveLength(1);
    expect(result[0].role_brief).toBe('one');
  });

  it('drops stubs with empty names', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify([
      { name: '', role_brief: 'orphan', context: '', source_quote: '' },
      { name: 'The Vault', role_brief: 'good', context: '', source_quote: '' },
    ]));
    const result = await extractRelatedDungeons({ name: 'x' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('The Vault');
  });

  it('returns empty array when the response is malformed JSON', async () => {
    generateGptResponse.mockResolvedValue('{not json');
    const result = await extractRelatedDungeons({ name: 'x' });
    expect(result).toEqual([]);
  });

  it('returns empty array when the response is not an array', async () => {
    generateGptResponse.mockResolvedValue(JSON.stringify({ name: 'oops' }));
    const result = await extractRelatedDungeons({ name: 'x' });
    expect(result).toEqual([]);
  });
});

describe('mergeStubs', () => {
  it('preserves promoted stubs across rescans', () => {
    const existing = [
      { name: 'The Vault', role_brief: 'r', context: 'c', source_quote: '', dungeon_id: 'dng_123' },
    ];
    const fresh = [
      { name: 'The Tomb', role_brief: 'r2', context: 'c2', source_quote: '', dungeon_id: null },
    ];
    const merged = mergeStubs(existing, fresh);
    expect(merged).toHaveLength(2);
    expect(merged[0].dungeon_id).toBe('dng_123');
    expect(merged[1].name).toBe('The Tomb');
  });

  it('drops unpromoted existing stubs (fresh extraction is authoritative)', () => {
    const existing = [
      { name: 'The Old Forge', role_brief: 'r', context: 'c', source_quote: '', dungeon_id: null },
    ];
    const fresh = [
      { name: 'The Hollow Vault', role_brief: 'r2', context: 'c2', source_quote: '', dungeon_id: null },
    ];
    const merged = mergeStubs(existing, fresh);
    expect(merged).toHaveLength(1);
    expect(merged[0].name).toBe('The Hollow Vault');
  });

  it('drops fresh stubs that case-insensitively match a promoted stub', () => {
    const existing = [
      { name: 'The Vault', role_brief: 'r', context: 'c', source_quote: '', dungeon_id: 'dng_123' },
    ];
    const fresh = [
      { name: 'the vault', role_brief: 'r2', context: 'c2', source_quote: '', dungeon_id: null },
    ];
    const merged = mergeStubs(existing, fresh);
    expect(merged).toHaveLength(1);
    expect(merged[0].dungeon_id).toBe('dng_123');
    expect(merged[0].role_brief).toBe('r');  // promoted stub wins
  });

  it('dedupes fresh stubs by case-insensitive name', () => {
    const fresh = [
      { name: 'The Vault', role_brief: 'one', context: '', source_quote: '', dungeon_id: null },
      { name: 'the vault', role_brief: 'two', context: '', source_quote: '', dungeon_id: null },
    ];
    const merged = mergeStubs([], fresh);
    expect(merged).toHaveLength(1);
    expect(merged[0].role_brief).toBe('one');
  });

  it('handles empty / non-array inputs without throwing', () => {
    expect(mergeStubs(null, null)).toEqual([]);
    expect(mergeStubs([], [])).toEqual([]);
    expect(mergeStubs(undefined, undefined)).toEqual([]);
  });
});

describe('buildDungeonPrefillFromItem', () => {
  const sampleSeed = {
    source: { type: 'item', id: 'The Helm', name: 'The Helm' },
    entities: [{
      name: 'The Hollow Vault',
      role_or_description: 'where the helm was sealed',
      context: 'a barrow in the Iron Hills',
      source_quote: 'sealed beneath the Iron Hills',
    }],
  };

  it('builds a prefill including stub name, role, and item link', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    expect(text).toContain('The Hollow Vault');
    expect(text).toContain('where the helm was sealed');
    expect(text).toContain('The Helm');
  });

  it('includes an explicit mission directive naming the item as the recovery target', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    // The directive must (a) name the item as the recovery target and
    // (b) explicitly forbid the model from inventing a related artifact.
    // Both are required to prevent the MacGuffin-shift failure mode
    // where the dungeon centers on a brooch / scroll / ledger that the
    // model invented instead of the seeded item.
    expect(text).toMatch(/recover.*The Helm/);
    expect(text).toMatch(/quest hook MUST/);
    expect(text).toMatch(/do not invent a related artifact/);
  });

  it('frames the item itself as the reward', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    expect(text).toMatch(/IS the reward/);
  });

  it('redirects the quest hook to a source of information, away from commissioning NPCs', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    // The hook-shape directive must (a) positively name the
    // source-of-information pattern with concrete examples (rumor,
    // prophecy, survivor's tale, etc.), and (b) explicitly forbid
    // the commissioning-NPC shape including a named-pattern ban.
    // This is an attractor-redirect: the commissioning-NPC frame is
    // a fantasy-genre default the model falls back to, so just
    // banning specific reward types isn't enough — the model needs
    // a positive alternate hook shape to gravitate toward.
    expect(text).toMatch(/source of information/);
    expect(text).toMatch(/rumor/);
    expect(text).toMatch(/prophecy/);
    expect(text).toMatch(/survivor's tale/);
    expect(text).toMatch(/MUST NOT come from a commissioning NPC/);
    expect(text).toMatch(/Do not write a hook in the shape/);
  });

  it('omits the mission directive when no item name is available', () => {
    const text = buildDungeonPrefillFromItem({
      source: { type: 'item', id: 'x', name: '' },  // empty item name
      entities: [{ name: 'Place', role_or_description: '', context: '', source_quote: '' }],
    });
    expect(text).not.toMatch(/quest hook MUST/);
    expect(text).not.toMatch(/recover/);
    expect(text).not.toMatch(/IS the reward/);
    expect(text).not.toMatch(/source of information/);
  });

  it('includes the place context when present', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    expect(text).toContain('a barrow in the Iron Hills');
  });

  it('includes the source quote when present', () => {
    const text = buildDungeonPrefillFromItem(sampleSeed);
    expect(text).toContain('sealed beneath the Iron Hills');
  });

  it('returns empty string for null / empty input', () => {
    expect(buildDungeonPrefillFromItem(null)).toBe('');
    expect(buildDungeonPrefillFromItem({})).toBe('');
    expect(buildDungeonPrefillFromItem({ source: null, entities: [] })).toBe('');
  });

  it('returns empty string when entities array is missing', () => {
    expect(buildDungeonPrefillFromItem({ source: { type: 'item', id: 'x', name: 'x' } })).toBe('');
  });
});
