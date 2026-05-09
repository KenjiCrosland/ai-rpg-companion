import {
  andeanCharacterEpithets,
  andeanPlaceEpithets,
  andeanSpiritEpithets,
  andeanCulturalNotes,
  andeanAvoidList,
} from './andean.mjs';

describe('andean cultural pool — data integrity', () => {
  describe('pool sizes (architecture target ranges)', () => {
    it('character pool is in 30-40 range', () => {
      expect(andeanCharacterEpithets.length).toBeGreaterThanOrEqual(30);
      expect(andeanCharacterEpithets.length).toBeLessThanOrEqual(40);
    });

    it('place pool is in 20-25 range', () => {
      expect(andeanPlaceEpithets.length).toBeGreaterThanOrEqual(20);
      expect(andeanPlaceEpithets.length).toBeLessThanOrEqual(25);
    });

    it('spirit pool is in 12-15 range', () => {
      expect(andeanSpiritEpithets.length).toBeGreaterThanOrEqual(12);
      expect(andeanSpiritEpithets.length).toBeLessThanOrEqual(15);
    });

    it('every pool entry is a non-empty string', () => {
      for (const pool of [andeanCharacterEpithets, andeanPlaceEpithets, andeanSpiritEpithets]) {
        for (const entry of pool) {
          expect(typeof entry).toBe('string');
          expect(entry.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('cultural notes', () => {
    it('is a non-empty string', () => {
      expect(typeof andeanCulturalNotes).toBe('string');
      expect(andeanCulturalNotes.length).toBeGreaterThan(0);
    });

    it('includes the v2 epithet-explanation framing', () => {
      // The architecture-mandated paragraph signaling pool entries are
      // praise-name epithets, not given names.
      expect(andeanCulturalNotes).toMatch(/praise-name epithets/i);
    });

    it('includes the v2 compound-construction guidance', () => {
      expect(andeanCulturalNotes).toMatch(/COMPOUND CONSTRUCTION PATTERNS TO AVOID/);
      expect(andeanCulturalNotes).toContain('[X]-kancha');
      expect(andeanCulturalNotes).toMatch(/Yawar/);
      expect(andeanCulturalNotes).toContain('[X]-ñawi');
      expect(andeanCulturalNotes).toContain('[X]-Inka');
      expect(andeanCulturalNotes).toContain('[X]-amaru');
    });

    it('includes the v2 multi-register sensory framing', () => {
      // Production-validation finding: single sensory register produced
      // verbatim phrase repetition. Multi-register text is the v2 fix.
      expect(andeanCulturalNotes).toMatch(/coastal/i);
      expect(andeanCulturalNotes).toMatch(/highland-valley|highland valley/i);
      expect(andeanCulturalNotes).toMatch(/forest-fringe|forest fringe/i);
      expect(andeanCulturalNotes).toMatch(/Vary atmospheric details/i);
    });

    it('includes the v2 ITEM-NAME CONSTRUCTION constrained vocabulary', () => {
      expect(andeanCulturalNotes).toMatch(/ITEM-NAME CONSTRUCTION/);
      // A few representative pre-approved components.
      expect(andeanCulturalNotes).toContain('thinka');
      expect(andeanCulturalNotes).toContain('warak');
      // Explicit exclusions.
      expect(andeanCulturalNotes).toMatch(/Do NOT use:.*yawar/i);
    });
  });

  describe('avoid-list (curation-time reference)', () => {
    it('exists as an exported array', () => {
      expect(Array.isArray(andeanAvoidList)).toBe(true);
      expect(andeanAvoidList.length).toBeGreaterThan(40);
    });

    it('covers Inca emperors', () => {
      expect(andeanAvoidList).toContain('Pachakutiq');
      expect(andeanAvoidList).toContain('Atawallpa');
      expect(andeanAvoidList).toContain('Wayna Qhapaq');
    });

    it('covers deities', () => {
      expect(andeanAvoidList).toContain('Inti');
      expect(andeanAvoidList).toContain('Pachamama');
      expect(andeanAvoidList).toContain('Viracocha');
    });

    it('covers sacred mountains and sites', () => {
      expect(andeanAvoidList).toContain('Salkantay');
      expect(andeanAvoidList).toContain('Qorikancha');
      expect(andeanAvoidList).toContain('Machu Picchu');
    });

    it('covers sacred concepts', () => {
      expect(andeanAvoidList).toContain("Wak'a");
      expect(andeanAvoidList).toContain('Khipu');
      expect(andeanAvoidList).toContain('Sapa Inca');
    });

    it('covers v2-added named historical resistance figures', () => {
      // The Rumiñawi-as-cursed-ring production failure motivated this
      // category. Drift away from it (forgetting the resistance-figures
      // category in a future pool refactor) should fail this test.
      expect(andeanAvoidList).toContain('Rumiñawi');
      expect(andeanAvoidList).toContain('Tupac Katari');
      expect(andeanAvoidList).toContain('Bartolina Sisa');
      expect(andeanAvoidList).toContain('Micaela Bastidas');
    });
  });

  describe('curation-time pool integrity (no avoid-list collisions)', () => {
    const allPoolEntries = [
      ...andeanCharacterEpithets,
      ...andeanPlaceEpithets,
      ...andeanSpiritEpithets,
    ];

    it('no pool entry exactly matches an avoid-list name', () => {
      const avoidSet = new Set(andeanAvoidList);
      for (const entry of allPoolEntries) {
        expect(avoidSet.has(entry)).toBe(false);
      }
    });
  });

  describe('v2 construction-pattern restrictions', () => {
    const allPoolEntries = [
      ...andeanCharacterEpithets,
      ...andeanPlaceEpithets,
      ...andeanSpiritEpithets,
    ];

    it('no pool entry uses the [X]-kancha sacred-compound pattern', () => {
      // -kancha denotes royal/sacred enclosed compounds (Qorikancha,
      // Pumakancha). The v2 brief explicitly bans pool expansion into
      // this pattern.
      for (const entry of allPoolEntries) {
        expect(entry.toLowerCase()).not.toMatch(/kancha$/);
      }
    });

    it('no pool entry uses Yawar-X compound pattern', () => {
      // Yawar Mayu is a documented ritual practice; Yawar Fiesta is a
      // real ceremonial tradition. The v2 brief bans Yawar-compounds
      // entirely (puka 'red' / yana 'black' / qhilli 'gray' carry the
      // dark-imagery mood without the cultural overlap).
      for (const entry of allPoolEntries) {
        expect(entry.toLowerCase()).not.toMatch(/^yawar/);
      }
    });

    it('no character-pool entry ends in bare -ñawi (Rumiñawi-pattern)', () => {
      // [X]-ñawi as a personal-name ending parses to real historical
      // figures (the Quito-resistance general). Pool entries with ñawi
      // as a middle component followed by -yuq (e.g., Ñawiyuq) are
      // structurally distinct epithet-form and remain allowed.
      for (const entry of andeanCharacterEpithets) {
        expect(entry.toLowerCase()).not.toMatch(/ñawi$/);
      }
    });

    it('no pool entry contains "amaru" as a component', () => {
      // [X]-amaru constructions read as dynastic-resistance-coded
      // (Tupac Amaru). The v2 brief bans amaru as a personal-name
      // component anywhere in the compound.
      for (const entry of allPoolEntries) {
        expect(entry.toLowerCase()).not.toContain('amaru');
      }
    });

    it('no pool entry contains "inka" or "inca" as a component', () => {
      // Always read as forming royal/imperial titles. Never used as a
      // compound element in fictional names.
      for (const entry of allPoolEntries) {
        const lower = entry.toLowerCase();
        expect(lower).not.toContain('inka');
        expect(lower).not.toContain('inca');
      }
    });
  });
});
