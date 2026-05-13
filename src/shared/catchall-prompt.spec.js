import {
  buildCatchallPromptBlock,
  isCatchallRegister,
  CATCHALL_REGISTER_PREFIXES,
  getItemNameAvoidList,
  registerItemNameAvoidLists,
} from './catchall-prompt.mjs';

describe('catchall-prompt', () => {
  describe('CATCHALL_REGISTER_PREFIXES', () => {
    it('does NOT include pool registers (Yoruba, Andean)', () => {
      // Pool registers have dedicated prompt builders. The catchall must
      // not duplicate their handling — both blocks would fire and
      // contradict each other.
      expect(CATCHALL_REGISTER_PREFIXES).not.toContain('Yoruba-inspired');
      expect(CATCHALL_REGISTER_PREFIXES).not.toContain('Andean-inspired');
    });

    it('does NOT include Western-canonical registers', () => {
      // Western-canonical registers (Latin/Norse/Germanic/Celtic/
      // Slavic/etc.) have established fantasy-genre conventions and
      // don't need catchall density constraints. The universal-invent
      // rules in the main prompt cover them adequately.
      const westernCanonical = [
        'Latin-inspired',
        'Greek-inspired',
        'Old-Norse-inspired',
        'Norse-inspired',
        'Anglo-Saxon-inspired',
        'Germanic-inspired',
        'Old-High-German-inspired',
        'Middle-High-German-inspired',
        'Gothic-inspired',
        'Celtic-inspired',
        'Welsh-inspired',
        'Old-Irish-inspired',
        'Old-Slavic-inspired',
        'Slavic-inspired',
        'Russian-inspired',
        'Romanian-inspired',
        'Hungarian-inspired',
        'Finnish-inspired',
        'Italian-Renaissance-inspired',
        'Old-Occitan-inspired',
      ];
      for (const prefix of westernCanonical) {
        expect(CATCHALL_REGISTER_PREFIXES).not.toContain(prefix);
      }
    });

    it('does NOT include fictional fantasy registers', () => {
      // No real-world referents to protect; universal-invent rules
      // already permit fictional name use freely.
      const fictionalFantasy = [
        'Elven',
        'Orcish',
        'Goblin-inspired',
        'Gnomish',
        'Draconic',
        'Aberrant',
        'Abyssal',
        'Infernal',
        'Primordial',
        'Technomagical',
      ];
      for (const prefix of fictionalFantasy) {
        expect(CATCHALL_REGISTER_PREFIXES).not.toContain(prefix);
      }
    });

    it('does NOT include the removed Navajo/Diné register', () => {
      // The Navajo/Diné register was removed entirely from the system
      // under appropriation caution. Including it here would imply the
      // register is still routable, which it isn't.
      expect(CATCHALL_REGISTER_PREFIXES).not.toContain('Navajo/Diné-inspired');
      expect(CATCHALL_REGISTER_PREFIXES).not.toContain('Diné-inspired');
    });

    it('includes representative cultural-protection-sensitive registers', () => {
      // Spot-check the categories the catchall is meant to cover.
      // Drift away from any of these (e.g., a future contributor
      // dropping Lakota assuming "Indigenous American is handled
      // elsewhere") should fail this test.
      const expected = [
        'Japanese-inspired',
        'Chinese-inspired',
        'Korean-inspired',
        'Mongolian-inspired',
        'Tibetan-inspired',
        'Hindi/Sanskrit-inspired',
        'Arabic/Persian-inspired',
        'Atlas-Berber-inspired',
        'Akan-inspired',
        'Igbo-inspired',
        'Swahili-inspired',
        'Maori-inspired',
        'Hawaiian-inspired',
        'Maya-inspired',
        'Aztec/Nahuatl-inspired',
        'Lakota-inspired',
      ];
      for (const prefix of expected) {
        expect(CATCHALL_REGISTER_PREFIXES).toContain(prefix);
      }
    });
  });

  describe('isCatchallRegister', () => {
    it('returns true for a catchall register descriptor (Japanese)', () => {
      expect(isCatchallRegister('Japanese-inspired: clean syllables (e.g., Kagezuki)')).toBe(true);
    });

    it('returns true for a catchall register descriptor (Hindi/Sanskrit)', () => {
      // Slash-containing prefix should match correctly.
      expect(isCatchallRegister('Hindi/Sanskrit-inspired: melodic, ceremonial')).toBe(true);
    });

    it('returns false for pool registers', () => {
      expect(isCatchallRegister('Yoruba-inspired: rhythmic with diacriticals')).toBe(false);
      expect(isCatchallRegister('Andean-inspired: structured Quechua flavor')).toBe(false);
    });

    it('returns false for Western-canonical registers', () => {
      expect(isCatchallRegister('Latin-inspired: formal, structured')).toBe(false);
      expect(isCatchallRegister('Old-Norse-inspired: Eddaic register')).toBe(false);
      expect(isCatchallRegister('Welsh-inspired: soft consonants')).toBe(false);
    });

    it('returns false for fictional fantasy registers', () => {
      expect(isCatchallRegister('Elven: elegant')).toBe(false);
      expect(isCatchallRegister('Orcish: brutal, guttural')).toBe(false);
      expect(isCatchallRegister('Abyssal: guttural, chaotic')).toBe(false);
    });

    it('returns false for null / undefined / empty / non-string input', () => {
      expect(isCatchallRegister(null)).toBe(false);
      expect(isCatchallRegister(undefined)).toBe(false);
      expect(isCatchallRegister('')).toBe(false);
      expect(isCatchallRegister(42)).toBe(false);
    });
  });

  describe('buildCatchallPromptBlock', () => {
    it('returns empty string for non-catchall registers', () => {
      expect(buildCatchallPromptBlock('Yoruba-inspired: rhythmic')).toBe('');
      expect(buildCatchallPromptBlock('Andean-inspired: structured Quechua')).toBe('');
      expect(buildCatchallPromptBlock('Latin-inspired: formal')).toBe('');
      expect(buildCatchallPromptBlock('Elven: elegant')).toBe('');
      expect(buildCatchallPromptBlock(null)).toBe('');
    });

    it('returns a non-empty block for a catchall register', () => {
      const block = buildCatchallPromptBlock('Japanese-inspired: clean syllables');
      expect(block.length).toBeGreaterThan(0);
    });
  });

  describe('whitelist deduplication (per-register character-name list)', () => {
    it('does NOT inject whitelist entries into the catchall block — buildCharacterWhitelistBlock handles that', () => {
      // The whitelist used to appear in the catchall block AND in the
      // dedicated character-whitelist block, producing the same list of
      // names twice in the prompt. The dedup landed during the per-
      // register migration sweep: catchall stays pure-structural, the
      // dedicated block is the universal whitelist injector. This test
      // pins the no-duplication contract.
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(block).not.toContain('Manawa-Kaha');
      expect(block).not.toContain('Kaiwhakairo');
      expect(block).not.toContain('Karu-Ata');
    });

    it('references the dedicated whitelist block in the character-name bullet', () => {
      // The catchall's character-name bullet hints that the whitelist
      // lives elsewhere so the LLM looks for it. If the wording drifts
      // and stops mentioning the dedicated block, the LLM is left
      // without guidance on where to find the curated list.
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(block).toMatch(/CHARACTER WHITELIST FOR THIS GENERATION/);
    });
  });

  describe('item-name avoid-list (per-register sacred-term protection)', () => {
    describe('registerItemNameAvoidLists registry', () => {
      it('includes representative sacred Te Reo terms in the Maori list', () => {
        // Spot-check a sample of the high-collision sacred surface.
        // Drift (a contributor stripping these out) should fail this test.
        const list = registerItemNameAvoidLists['Maori-inspired'];
        for (const term of ['mana', 'tapu', 'wairua', 'atua', 'tohunga', 'whakapapa']) {
          expect(list).toContain(term);
        }
      });
    });

    describe('getItemNameAvoidList', () => {
      it('returns the Maori list for a Maori register descriptor', () => {
        const list = getItemNameAvoidList('Maori-inspired: vowel-rich Te Reo phonetics');
        expect(list).toEqual(registerItemNameAvoidLists['Maori-inspired']);
      });

      it('returns null for catchall registers without an avoid-list', () => {
        // Hindi/Sanskrit, Hawaiian, etc. are catchall registers but
        // have no registered avoid-list yet. Lookup must return null,
        // not an empty array, so the bullet falls back to the
        // baseline copy.
        expect(getItemNameAvoidList('Hindi/Sanskrit-inspired: melodic')).toBeNull();
        expect(getItemNameAvoidList('Hawaiian-inspired: phonetics with okina')).toBeNull();
      });

      it('returns null for non-string / null / undefined input', () => {
        expect(getItemNameAvoidList(null)).toBeNull();
        expect(getItemNameAvoidList(undefined)).toBeNull();
        expect(getItemNameAvoidList(42)).toBeNull();
      });
    });

    // No prompt-string-content tests for the avoid-list injection.
    // The data-integrity tests above (registry presence, sacred-term
    // membership) plus getItemNameAvoidList return-value tests cover
    // the routing and the data. Whether the LLM honors the avoid-list
    // is a manual production-review concern.
  });
});
