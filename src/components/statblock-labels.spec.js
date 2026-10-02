import { labelsFor, languageCodeFor, CARD_LABELS } from './statblock-labels.mjs';

describe('card labels per output language (the interim i18n, 2026-10-01)', () => {
  test('a known language swaps every fixed label; an unknown one keeps English', () => {
    const de = labelsFor('de');
    expect(de.ac).toBe('RK'); expect(de.hp).toBe('TP'); expect(de.cr).toBe('HG'); expect(de.sections['Bonus Actions']).toBe('Bonusaktionen'); expect(de.abilities.STR).toBe('STÄ');
    expect(labelsFor('xx')).toEqual(labelsFor('en')); expect(labelsFor(undefined).ac).toBe('AC');
    expect(labelsFor('ja').sections.Traits).toBe('特徴'); expect(labelsFor('ja').cr).toBe('脅威度');
  });
  test('every language table carries the full label set', () => {
    const keys = Object.keys(CARD_LABELS.en).sort();
    for (const [code, t] of Object.entries(CARD_LABELS)) {
      expect(Object.keys(t).sort()).toEqual(keys);
      expect(Object.keys(t.sections).sort()).toEqual(Object.keys(CARD_LABELS.en.sections).sort());
      expect(t.legendaryUses).toContain('{n}');
      expect(code).toMatch(/^[a-z]{2}$/);
    }
  });
  test('the directive names a language; the code keys the labels', () => {
    expect(languageCodeFor('German')).toBe('de'); expect(languageCodeFor('français')).toBe('fr'); expect(languageCodeFor('Klingon')).toBeNull();
  });
});
