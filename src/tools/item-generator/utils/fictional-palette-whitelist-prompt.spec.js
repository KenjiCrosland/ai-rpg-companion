import {
  buildFictionalPaletteWhitelistBlock,
  isFictionalPaletteWithWhitelist,
  FICTIONAL_PALETTE_WHITELIST_PREFIXES,
} from './fictional-palette-whitelist-prompt.mjs';
import {
  paletteCharacterEpithetWhitelists,
  getWhitelistForPalette,
} from '@/data/cultural-pools/palette-whitelists.mjs';
import { CATCHALL_PALETTE_PREFIXES } from './catchall-prompt.mjs';

const FICTIONAL_PREFIXES = [
  'Draconic',
  'Aberrant',
  'Abyssal',
  'Sindarin-inspired',
  'Infernal',
  'Primordial',
];

describe('fictional-palette-whitelist-prompt', () => {
  describe('routing-map integrity', () => {
    it('FICTIONAL_PALETTE_WHITELIST_PREFIXES contains exactly the six fictional palettes', () => {
      // Membership lock against silent additions/removals.
      expect([...FICTIONAL_PALETTE_WHITELIST_PREFIXES].sort()).toEqual([...FICTIONAL_PREFIXES].sort());
    });

    it('does NOT overlap with CATCHALL_PALETTE_PREFIXES', () => {
      // Two routing maps must remain disjoint — overlap would cause
      // both prompt builders to fire with contradictory framing.
      const overlap = FICTIONAL_PALETTE_WHITELIST_PREFIXES.filter(
        prefix => CATCHALL_PALETTE_PREFIXES.includes(prefix),
      );
      expect(overlap).toEqual([]);
    });

    it('every routed prefix has a registered whitelist with at least one entry', () => {
      // A routed prefix without a whitelist would inject nothing.
      for (const prefix of FICTIONAL_PALETTE_WHITELIST_PREFIXES) {
        expect(paletteCharacterEpithetWhitelists[prefix]?.length).toBeGreaterThan(0);
      }
    });
  });

  describe('isFictionalPaletteWithWhitelist (routing predicate)', () => {
    it('classifies fictional-with-whitelist palettes as true', () => {
      const cases = [
        'Draconic: harsh sibilants, ancient weight',
        'Aberrant: unpronounceable clusters',
        'Abyssal: guttural, chaotic',
        'Sindarin-inspired (elvish): elegant, vowel-rich',
        'Infernal: sharp, aggressive',
        'Primordial: pre-language sounds, elemental',
      ];
      for (const descriptor of cases) {
        expect(isFictionalPaletteWithWhitelist(descriptor)).toBe(true);
      }
    });

    it('classifies fictional-without-whitelist, catchall, and Western palettes as false', () => {
      const cases = [
        // Fictional palettes WITHOUT a registered whitelist:
        'Goblin-inspired: sharp', 'Orcish: brutal', 'Gnomish: clever', 'Technomagical: clinical',
        // Catchall palettes (handled by catchall builder):
        'Maori-inspired: vowel-rich', 'Japanese-inspired: clean syllables',
        // Western-canonical:
        'Latin-inspired: formal', 'Old-Norse-inspired: Eddaic',
      ];
      for (const descriptor of cases) {
        expect(isFictionalPaletteWithWhitelist(descriptor)).toBe(false);
      }
    });

    it('returns false for non-string / null / undefined / empty input', () => {
      for (const input of [null, undefined, '', 42]) {
        expect(isFictionalPaletteWithWhitelist(input)).toBe(false);
      }
    });
  });

  describe('buildFictionalPaletteWhitelistBlock (return-value behavior)', () => {
    // The builder is a routing pass-through: empty string when the
    // palette doesn't route here, non-empty when it does. The CONTENT
    // of the non-empty case is verified through manual production-
    // review, not via Jest assertions on prompt wording.

    it('returns empty string when the palette does not route here', () => {
      const cases = [
        'Maori-inspired: vowel-rich',     // catchall (handled elsewhere)
        'Latin-inspired: formal',         // Western-canonical
        'Goblin-inspired: sharp',         // fictional but no whitelist registered
        'Yoruba-inspired: rhythmic',      // pool palette (yoruba-prompt)
        null,
        undefined,
      ];
      for (const input of cases) {
        expect(buildFictionalPaletteWhitelistBlock(input)).toBe('');
      }
    });

    it('returns a non-empty block when the palette routes here', () => {
      // Routing-decision check only.
      for (const prefix of FICTIONAL_PREFIXES) {
        const descriptor = `${prefix}: descriptor stub`;
        expect(buildFictionalPaletteWhitelistBlock(descriptor)).not.toBe('');
      }
    });
  });

  describe('whitelist data integrity', () => {
    it('per-pool entry counts match the post-curation expected values', () => {
      // Per-pool entry counts after the curation pass that removed
      // Tolkien-published names (Sindarin) and D&D-canon character
      // names / close derivatives (Infernal archdevils, Abyssal demon
      // lords, Primordial Princes of Elemental Evil/Good).
      const expected = {
        'Draconic': 80,            // unchanged
        'Aberrant': 80,            // unchanged (Lovecraftian mythos derivatives are public-domain)
        'Abyssal': 71,             // 9 D&D-derivative removals
        'Infernal': 58,            // 22 D&D-archdevil-derivative removals
        'Sindarin-inspired': 63,   // 16 Tolkien-published-name removals (incl. brief duplicate)
        'Primordial': 33,          // 47 D&D-Prince-of-Elemental-Evil/Good removals
      };
      for (const [prefix, count] of Object.entries(expected)) {
        expect(getWhitelistForPalette(prefix)?.length).toBe(count);
      }
    });

    it('every pool entry is a unique non-empty trimmed string', () => {
      // De-duplication regression guard plus shape sanity. A duplicate
      // would over-rotate that name and reduce sub-convention variety;
      // an empty / whitespace-only entry would crash the prompt builder.
      for (const prefix of FICTIONAL_PREFIXES) {
        const list = getWhitelistForPalette(prefix);
        expect(new Set(list).size).toBe(list.length);
        for (const name of list) {
          expect(typeof name).toBe('string');
          expect(name.length).toBeGreaterThan(0);
          expect(name).toBe(name.trim());
        }
      }
    });

    it('curated-out entries stay out of their respective pools', () => {
      // Regression guard: a contributor re-adding any of these (e.g.,
      // from the original brief) should fail this test. Tolkien-
      // published names and D&D-canon character names / close
      // derivatives are off-limits per project policy.
      const forbidden = {
        'Sindarin-inspired': ['Mithrandir', 'Tinuviel', 'Eldarion', 'Galadhriel', 'Gilthoniel', 'Mormegil the Black-Sword', 'Glamdring-Forged', 'Narsil-Reforged'],
        'Infernal': ['Asmoreus', 'Mephistarion', 'Dispateron', 'Hutijonis', 'Levistanus', 'Glasyetta', 'Fiernazel', 'Zarialith', 'Bael', 'Bael the First-Pact'],
        'Abyssal': ["Graz'morr", 'Lolthrim', 'Yeenoggrenoth', 'Demogorthrazz', 'Orcuvargheth', 'Baphomarroch', 'Juiblexovol', "Graz'zthuvor"],
        'Primordial': ['Akadiroth', 'Imixthal', 'Olhydross', 'Ogremorrok', 'Cryonarrak', 'Imixarrak', 'Ogremmoth', 'Akadi-of-the-Stilled-Wind', "Sa'Imix-Vel"],
      };
      for (const [prefix, forbiddenNames] of Object.entries(forbidden)) {
        const list = getWhitelistForPalette(prefix);
        for (const name of forbiddenNames) {
          expect(list).not.toContain(name);
        }
      }
    });
  });
});
