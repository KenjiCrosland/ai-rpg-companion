import {
  paletteCharacterEpithetWhitelists,
  getWhitelistForPalette,
} from './palette-whitelists.mjs';

describe('palette-whitelists — data integrity', () => {
  describe('paletteCharacterEpithetWhitelists', () => {
    it('is a non-empty object keyed by palette prefix', () => {
      expect(typeof paletteCharacterEpithetWhitelists).toBe('object');
      expect(Object.keys(paletteCharacterEpithetWhitelists).length).toBeGreaterThan(0);
    });

    it('every value is a non-empty array of strings', () => {
      for (const [prefix, list] of Object.entries(paletteCharacterEpithetWhitelists)) {
        expect(Array.isArray(list)).toBe(true);
        expect(list.length).toBeGreaterThan(0);
        for (const entry of list) {
          expect(typeof entry).toBe('string');
          expect(entry.length).toBeGreaterThan(0);
        }
      }
    });

    it('every whitelist size is within its architecture tier bounds', () => {
      // Two tiers:
      //   - Real-world cultural whitelists (Maori-inspired): target
      //     25-40 entries. Sub-25 means too little LLM variety;
      //     over-40 approaches full pool-architecture territory and
      //     shifts the curation-cost balance.
      //   - Fictional-fantasy whitelists (Draconic, Aberrant, Abyssal,
      //     Sindarin-inspired, Infernal, Primordial): target ~80
      //     entries spanning 6-8 sub-conventions. The size IS the
      //     protective architecture against monotonous outputs; sub-
      //     conventions diversify what "one name from this list"
      //     looks like across many generations.
      //
      //     The current fictional-tier counts are below the 80-name
      //     target because the curation pass that removed Tolkien-
      //     published names and D&D-canon-character derivatives left
      //     several sub-conventions empty. The lower bound here (30)
      //     is permissive to accommodate the post-removal counts;
      //     replacement entries are pending. Hard floor is 30 (below
      //     that, the pool can't generate adequate variety).
      const fictionalPrefixes = new Set([
        'Draconic',
        'Aberrant',
        'Abyssal',
        'Sindarin-inspired',
        'Infernal',
        'Primordial',
      ]);
      for (const [prefix, list] of Object.entries(paletteCharacterEpithetWhitelists)) {
        if (fictionalPrefixes.has(prefix)) {
          expect(list.length).toBeGreaterThanOrEqual(30);
          expect(list.length).toBeLessThanOrEqual(90);
        } else {
          expect(list.length).toBeGreaterThanOrEqual(25);
          expect(list.length).toBeLessThanOrEqual(40);
        }
      }
    });

    it('does NOT include pool palettes (Yoruba, Andean)', () => {
      // Pool palettes have full pool architecture via their own prompt
      // builders. Adding them to this whitelist would cause both the
      // pool block and the catchall block to fire, contradicting each
      // other.
      expect(paletteCharacterEpithetWhitelists).not.toHaveProperty('Yoruba-inspired');
      expect(paletteCharacterEpithetWhitelists).not.toHaveProperty('Andean-inspired');
    });
  });

  describe('Maori whitelist (first registered v2 whitelist)', () => {
    const maori = paletteCharacterEpithetWhitelists['Maori-inspired'];

    it('exists', () => {
      expect(Array.isArray(maori)).toBe(true);
    });

    it('contains no real Maori atua names', () => {
      // The whole point of the whitelist is preventing real-figure
      // usage. Production validation found Tangaroa used as fictional
      // smith — drift back into atua-name territory should fail here.
      const atuaForbidden = [
        'Tangaroa', 'Tāne', 'Tane', 'Tūmatauenga', 'Tumatauenga',
        'Tāwhirimātea', 'Tawhirimatea', 'Whiro', 'Rongo', 'Haumia',
        'Aituā', 'Aitua', 'Ranginui', 'Papatūānuku', 'Papatuanuku',
        'Mahuika', 'Māui', 'Maui', 'Kupe', 'Paikea', 'Tāwhaki',
        'Tawhaki', 'Rūaumoko', 'Ruaumoko',
      ];
      for (const entry of maori) {
        for (const forbidden of atuaForbidden) {
          expect(entry).not.toContain(forbidden);
        }
      }
    });

    it('contains no Hine- prefix entries (Hine-* is a goddess-name pattern)', () => {
      for (const entry of maori) {
        expect(entry).not.toMatch(/^Hine-/);
      }
    });

    it('contains no sacred-concept components', () => {
      // mana, tapu, mauri, hau, wairua, atua, taonga, kaitiaki, marae,
      // tohunga are core sacred terms in te ao Māori.
      const sacredConcepts = [
        'mana', 'tapu', 'mauri', 'wairua', 'atua', 'taonga',
        'kaitiaki', 'marae', 'tohunga',
      ];
      for (const entry of maori) {
        const lower = entry.toLowerCase();
        for (const concept of sacredConcepts) {
          // Word-boundary check: we want to catch "mana" but allow
          // "Manawa" (chest/heart) which is a different word starting
          // with man-.
          const pattern = new RegExp(`\\b${concept}\\b`);
          expect(lower).not.toMatch(pattern);
        }
      }
    });
  });

  describe('getWhitelistForPalette', () => {
    it('returns the array for a registered palette descriptor (Maori)', () => {
      const result = getWhitelistForPalette('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('Manawa-Kaha');
    });

    it('returns null for non-registered palettes', () => {
      expect(getWhitelistForPalette('Latin-inspired: formal')).toBe(null);
      expect(getWhitelistForPalette('Hindi/Sanskrit-inspired: melodic')).toBe(null);
      expect(getWhitelistForPalette('Yoruba-inspired: rhythmic')).toBe(null);
    });

    it('returns null for null / undefined / empty / non-string input', () => {
      expect(getWhitelistForPalette(null)).toBe(null);
      expect(getWhitelistForPalette(undefined)).toBe(null);
      expect(getWhitelistForPalette('')).toBe(null);
      expect(getWhitelistForPalette(42)).toBe(null);
    });
  });
});
