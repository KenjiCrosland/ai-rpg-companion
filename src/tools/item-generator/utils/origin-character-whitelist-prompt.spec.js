import {
  buildOriginCharacterWhitelistBlock,
  isOriginWithCharacterWhitelist,
  ORIGIN_CHARACTER_WHITELIST_NAMES,
} from './origin-character-whitelist-prompt.mjs';
import {
  originCharacterEpithetWhitelists,
  getCharacterWhitelistForOrigin,
} from '@/data/cultural-pools/origin-character-whitelists.mjs';
import { paletteCharacterEpithetWhitelists } from '@/data/cultural-pools/palette-whitelists.mjs';

describe('origin-character-whitelist-prompt', () => {
  it('every routed origin has a non-empty registered whitelist', () => {
    // Routing-map integrity: a routed origin without a whitelist
    // would inject nothing despite the prompt block claiming a list
    // exists.
    for (const origin of ORIGIN_CHARACTER_WHITELIST_NAMES) {
      expect(originCharacterEpithetWhitelists[origin]?.length).toBeGreaterThan(0);
    }
  });

  it('origin keys do not collide with palette-whitelist keys', () => {
    // Disjointness: the per-origin map is keyed by origin name (e.g.,
    // "Dwarven"), the per-palette map is keyed by palette prefix
    // (e.g., "Maori-inspired"). If they ever shared a key, lookups
    // could route ambiguously.
    const originKeys = Object.keys(originCharacterEpithetWhitelists);
    const paletteKeys = Object.keys(paletteCharacterEpithetWhitelists);
    const collision = originKeys.filter(k => paletteKeys.includes(k));
    expect(collision).toEqual([]);
  });

  it('isOriginWithCharacterWhitelist routes correctly across input categories', () => {
    // Dwarven is registered. Other fantasy races, aesthetic origins,
    // and bad input should all return false.
    expect(isOriginWithCharacterWhitelist('Dwarven')).toBe(true);
    for (const input of [
      'Elven', 'Orcish', 'Gnomish', 'Giant',     // fantasy races without origin whitelists
      'Draconic', 'Aberrant', 'Infernal',         // fictional origins (route through palette branch)
      'Celestial', 'Fey', 'Necromantic',          // aesthetic origins
      null, undefined, '', 42,                    // bad input
    ]) {
      expect(isOriginWithCharacterWhitelist(input)).toBe(false);
    }
  });

  it('buildOriginCharacterWhitelistBlock returns non-empty for routed origins, empty otherwise', () => {
    // Routing-decision check only — block CONTENT is verified through
    // manual production-review, not Jest assertions on prompt wording.
    for (const origin of ORIGIN_CHARACTER_WHITELIST_NAMES) {
      expect(buildOriginCharacterWhitelistBlock(origin)).not.toBe('');
    }
    for (const input of ['Elven', 'Draconic', 'Celestial', null, undefined, '']) {
      expect(buildOriginCharacterWhitelistBlock(input)).toBe('');
    }
  });

  it('every Dwarven pool entry is a unique non-empty trimmed string', () => {
    // Data integrity: duplicates would over-rotate; empty / whitespace-
    // only entries would crash the prompt builder; whitespace-prefix /
    // trailing-whitespace entries usually indicate a transcription bug.
    const list = getCharacterWhitelistForOrigin('Dwarven');
    expect(list.length).toBe(100);
    expect(new Set(list).size).toBe(list.length);
    for (const name of list) {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
      expect(name).toBe(name.trim());
    }
  });
});
