import {
  buildCatchallPromptBlock,
  isCatchallPalette,
  CATCHALL_PALETTE_PREFIXES,
  getItemNameAvoidList,
  paletteItemNameAvoidLists,
} from './catchall-prompt.mjs';

describe('catchall-prompt', () => {
  describe('CATCHALL_PALETTE_PREFIXES', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(CATCHALL_PALETTE_PREFIXES)).toBe(true);
      expect(CATCHALL_PALETTE_PREFIXES.length).toBeGreaterThan(0);
    });

    it('does NOT include pool palettes (Yoruba, Andean)', () => {
      // Pool palettes have dedicated prompt builders. The catchall must
      // not duplicate their handling — both blocks would fire and
      // contradict each other.
      expect(CATCHALL_PALETTE_PREFIXES).not.toContain('Yoruba-inspired');
      expect(CATCHALL_PALETTE_PREFIXES).not.toContain('Andean-inspired');
    });

    it('does NOT include Western-canonical palettes', () => {
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
        expect(CATCHALL_PALETTE_PREFIXES).not.toContain(prefix);
      }
    });

    it('does NOT include fictional fantasy palettes', () => {
      // No real-world referents to protect; universal-invent rules
      // already permit fictional name use freely.
      const fictionalFantasy = [
        'Sindarin-inspired',
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
        expect(CATCHALL_PALETTE_PREFIXES).not.toContain(prefix);
      }
    });

    it('does NOT include the removed Navajo/Diné palette', () => {
      // The Navajo/Diné palette was removed entirely from the system
      // under appropriation caution. Including it here would imply the
      // palette is still routable, which it isn't.
      expect(CATCHALL_PALETTE_PREFIXES).not.toContain('Navajo/Diné-inspired');
      expect(CATCHALL_PALETTE_PREFIXES).not.toContain('Diné-inspired');
    });

    it('includes representative cultural-protection-sensitive palettes', () => {
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
        expect(CATCHALL_PALETTE_PREFIXES).toContain(prefix);
      }
    });
  });

  describe('isCatchallPalette', () => {
    it('returns true for a catchall palette descriptor (Japanese)', () => {
      expect(isCatchallPalette('Japanese-inspired: clean syllables (e.g., Kagezuki)')).toBe(true);
    });

    it('returns true for a catchall palette descriptor (Hindi/Sanskrit)', () => {
      // Slash-containing prefix should match correctly.
      expect(isCatchallPalette('Hindi/Sanskrit-inspired: melodic, ceremonial')).toBe(true);
    });

    it('returns false for pool palettes', () => {
      expect(isCatchallPalette('Yoruba-inspired: rhythmic with diacriticals')).toBe(false);
      expect(isCatchallPalette('Andean-inspired: structured Quechua flavor')).toBe(false);
    });

    it('returns false for Western-canonical palettes', () => {
      expect(isCatchallPalette('Latin-inspired: formal, structured')).toBe(false);
      expect(isCatchallPalette('Old-Norse-inspired: Eddaic register')).toBe(false);
      expect(isCatchallPalette('Welsh-inspired: soft consonants')).toBe(false);
    });

    it('returns false for fictional fantasy palettes', () => {
      expect(isCatchallPalette('Sindarin-inspired (elvish): elegant')).toBe(false);
      expect(isCatchallPalette('Orcish: brutal, guttural')).toBe(false);
      expect(isCatchallPalette('Abyssal: guttural, chaotic')).toBe(false);
    });

    it('returns false for null / undefined / empty / non-string input', () => {
      expect(isCatchallPalette(null)).toBe(false);
      expect(isCatchallPalette(undefined)).toBe(false);
      expect(isCatchallPalette('')).toBe(false);
      expect(isCatchallPalette(42)).toBe(false);
    });
  });

  describe('buildCatchallPromptBlock', () => {
    it('returns empty string for non-catchall palettes', () => {
      expect(buildCatchallPromptBlock('Yoruba-inspired: rhythmic')).toBe('');
      expect(buildCatchallPromptBlock('Andean-inspired: structured Quechua')).toBe('');
      expect(buildCatchallPromptBlock('Latin-inspired: formal')).toBe('');
      expect(buildCatchallPromptBlock('Sindarin-inspired (elvish): elegant')).toBe('');
      expect(buildCatchallPromptBlock(null)).toBe('');
    });

    it('returns the catchall block for a catchall palette', () => {
      const block = buildCatchallPromptBlock('Japanese-inspired: clean syllables');
      expect(block).toMatch(/NAMING ARCHITECTURE FOR THIS GENERATION/);
      expect(block).toMatch(/ONE character name/);
      expect(block).toMatch(/ONE item name/);
      expect(block).toMatch(/ZERO place names/);
      expect(block).toMatch(/ZERO spirit or deity names/);
      expect(block).toMatch(/REAL FIGURES MUST NOT APPEAR/);
    });

    it('includes the role-not-name rule for secondary characters', () => {
      const block = buildCatchallPromptBlock('Hawaiian-inspired: phonetics with okina');
      expect(block).toMatch(/Secondary characters.*referred to by role/);
    });

    it('includes the materials-fusion rule', () => {
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo');
      expect(block).toMatch(/MATERIALS/);
      expect(block).toMatch(/fantasy materials/);
    });

    it('includes the worked example', () => {
      const block = buildCatchallPromptBlock('Tibetan-inspired: aspirated, contemplative');
      expect(block).toMatch(/EXAMPLE/);
      expect(block).toMatch(/in the speech of its makers/);
    });
  });

  describe('whitelist augmentation (per-palette character-name list)', () => {
    it('uses freehand-construction instruction when palette has no whitelist', () => {
      // Hindi/Sanskrit has no whitelist (yet). Catchall falls back to
      // the freehand-epithet-construction instruction.
      const block = buildCatchallPromptBlock('Hindi/Sanskrit-inspired: melodic, ceremonial');
      expect(block).toMatch(/Construct it as a praise-name epithet/);
      expect(block).not.toMatch(/from this curated list/);
    });

    it('uses pick-from-list instruction when palette has a whitelist (Maori)', () => {
      // Maori was the first whitelist registered after the Tangaroa-
      // as-fictional-smith production failure. The catchall must
      // replace freehand construction with the curated list.
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(block).toMatch(/from this curated list/);
      expect(block).not.toMatch(/Construct it as a praise-name epithet/);
    });

    it('injects representative whitelist entries when whitelist is used', () => {
      // Sanity check that the whitelist entries actually reach the
      // prompt — drift (forgetting to wire the lookup, accidentally
      // emptying the whitelist) should fail this test.
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(block).toContain('Manawa-Kaha');
      expect(block).toContain('Kaiwhakairo');
      expect(block).toContain('Karu-Ata');
    });

    it('whitelist instruction prohibits out-of-list construction', () => {
      // The whitelist is the only permitted source. Without explicit
      // prohibition, DeepSeek may treat the list as examples and
      // construct adjacent names freehand.
      const block = buildCatchallPromptBlock('Maori-inspired: vowel-rich Te Reo phonetics');
      expect(block).toMatch(/Do NOT generate any character name outside this list/);
      expect(block).toMatch(/Do NOT construct freehand epithets/);
    });
  });

  describe('item-name avoid-list (per-palette sacred-term protection)', () => {
    describe('paletteItemNameAvoidLists registry', () => {
      it('registers a Maori avoid-list', () => {
        // The Maori avoid-list is the first entry. Production output
        // showed DeepSeek reaching for the most prominent (and most
        // sacred) Te Reo terms when constructing item names; the list
        // fences off that surface.
        expect(paletteItemNameAvoidLists['Maori-inspired']).toBeDefined();
        expect(Array.isArray(paletteItemNameAvoidLists['Maori-inspired'])).toBe(true);
        expect(paletteItemNameAvoidLists['Maori-inspired'].length).toBeGreaterThan(0);
      });

      it('includes representative sacred Te Reo terms in the Maori list', () => {
        // Spot-check a sample of the high-collision sacred surface.
        // Drift (a contributor stripping these out) should fail this test.
        const list = paletteItemNameAvoidLists['Maori-inspired'];
        for (const term of ['mana', 'tapu', 'wairua', 'atua', 'tohunga', 'whakapapa']) {
          expect(list).toContain(term);
        }
      });
    });

    describe('getItemNameAvoidList', () => {
      it('returns the Maori list for a Maori palette descriptor', () => {
        const list = getItemNameAvoidList('Maori-inspired: vowel-rich Te Reo phonetics');
        expect(list).toEqual(paletteItemNameAvoidLists['Maori-inspired']);
      });

      it('returns null for catchall palettes without an avoid-list', () => {
        // Hindi/Sanskrit, Hawaiian, etc. are catchall palettes but
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
