import {
  registerCharacterEpithetWhitelists,
  getWhitelistForRegister,
} from './register-whitelists.mjs';

describe('register-whitelists', () => {
  describe('registerCharacterEpithetWhitelists — architectural integrity', () => {
    it('does NOT include pool registers (Yoruba, Andean)', () => {
      // Pool registers have full pool architecture via their own prompt
      // builders. Adding them to this whitelist would cause both the
      // pool block and the catchall block to fire, contradicting each
      // other.
      expect(registerCharacterEpithetWhitelists).not.toHaveProperty('Yoruba-inspired');
      expect(registerCharacterEpithetWhitelists).not.toHaveProperty('Andean-inspired');
    });
  });

  describe('Maori whitelist (curation regression guards)', () => {
    const maori = registerCharacterEpithetWhitelists['Maori-inspired'];

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

  describe('getWhitelistForRegister', () => {
    it('returns the array for a registered register descriptor (Maori)', () => {
      const result = getWhitelistForRegister('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('Manawa-Kaha');
    });

    it('returns null for non-registered registers', () => {
      expect(getWhitelistForRegister('Latin-inspired: formal')).toBe(null);
      expect(getWhitelistForRegister('Hindi/Sanskrit-inspired: melodic')).toBe(null);
      expect(getWhitelistForRegister('Yoruba-inspired: rhythmic')).toBe(null);
    });

    it('returns null for null / undefined / empty / non-string input', () => {
      expect(getWhitelistForRegister(null)).toBe(null);
      expect(getWhitelistForRegister(undefined)).toBe(null);
      expect(getWhitelistForRegister('')).toBe(null);
      expect(getWhitelistForRegister(42)).toBe(null);
    });
  });
});
