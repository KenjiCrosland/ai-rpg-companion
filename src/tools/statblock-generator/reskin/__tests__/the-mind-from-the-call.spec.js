/**
 * THE MIND FROM THE CALL (item 4, owner's ruling 2026-11-15).
 *
 * On a homebrew sheet the donor card supplies INT, WIS and CHA, and the card is picked by
 * combat role: a vampire captain shipped INT 4 with no language, a carnival barker CHA 8. The
 * identity call now ranks the three in tiers and `applyMindTiers` turns a tier into a score.
 *
 * Category 1 here (the function's answers) and category 4's arithmetic rule. Categories 2 to 4
 * on whole sheets live in `the-mind-on-a-sheet.spec.js`. No test reads the prompt's wording.
 */
import { applyMindTiers, MIND_TIER_BANDS, castingAbilityOf } from '../generate.mjs';

const CARD = { STR: 16, DEX: 12, CON: 14, INT: 6, WIS: 10, CHA: 4 };
const run = (over = {}) => applyMindTiers({ tiers: { INT: 'capable', WIS: 'capable', CHA: 'capable' }, stats: CARD, cr: 3, ...over });

describe('the five rules, first that applies', () => {
  test('5: otherwise the tier becomes a score', () => {
    const r = run({ mind: 'sapient' });
    expect(r.ran).toBe(true);
    expect([r.stats.INT, r.stats.WIS, r.stats.CHA]).toEqual([13, 13, 13]);
    expect(r.stats.STR).toBe(16); // the body is untouched
  });

  test('1: no usable tier — the card stays', () => {
    for (const bad of [undefined, null, '', 'brilliant', 14, '12']) {
      const r = run({ mind: 'sapient', tiers: { INT: bad, WIS: 'capable', CHA: 'capable' } });
      expect(r.stats.INT).toBe(6);
      expect(r.held.some((h) => h.k === 'INT')).toBe(true);
    }
  });

  test('2: the attacking score stays, whatever the tier', () => {
    const r = run({ mind: 'sapient', strikerStat: 'CHA' });
    expect(r.stats.CHA).toBe(4);
    expect(r.held.find((h) => h.k === 'CHA').why).toMatch(/attacking score/);
  });

  test("2b: the named casting ability stays — the card's save DC derives from it", () => {
    const sections = { Actions: [{ name: 'Spellcasting', text: 'The creature casts, using Charisma as the spellcasting ability (spell save DC {dc})' }] };
    const r = run({ mind: 'sapient', sections });
    expect(r.stats.CHA).toBe(4);
    expect(r.held.find((h) => h.k === 'CHA').why).toMatch(/casting ability/);
    expect(r.stats.INT).toBe(13); // the other two still move
  });

  test('3: INT stays when the call did not read the creature as sapient', () => {
    for (const mind of ['bestial', 'mindless']) {
      const r = run({ mind });
      expect(r.stats.INT).toBe(6);
      expect(r.stats.WIS).toBe(13); // only INT is held by this rule
    }
    expect(run({ mind: 'sapient' }).stats.INT).toBe(13);
    expect(run({ mind: null }).stats.INT).toBe(13); // no answer is not a refusal
  });

  test("4: a card already inside the band stays, so a right score is never moved", () => {
    const r = applyMindTiers({ tiers: { INT: 'ordinary', WIS: 'ordinary', CHA: 'feeble' }, stats: { ...CARD, INT: 9 }, cr: 3, mind: 'sapient' });
    expect(r.stats.INT).toBe(9);  // 9 is already ordinary
    expect(r.stats.WIS).toBe(10); // 10 is already ordinary
    expect(r.stats.CHA).toBe(4);  // 4 is already feeble
    expect(r.moves).toEqual([]);
  });
});

describe('the number table, by CR column', () => {
  test.each([[3, 13, 16], [8, 13, 16], [9, 14, 18], [16, 14, 18], [17, 14, 20], [24, 14, 20]])(
    'CR %i: capable %i, formidable %i', (cr, cap, form) => {
      const r = applyMindTiers({ tiers: { INT: 'capable', WIS: 'formidable', CHA: 'feeble' }, stats: { ...CARD, CHA: 12 }, cr, mind: 'sapient' });
      expect(r.stats.INT).toBe(cap);
      expect(r.stats.WIS).toBe(form);
      expect(r.stats.CHA).toBe(6); // feeble is 6 at every CR
    },
  );

  test('every tier number falls inside its own band', () => {
    for (const cr of [1, 8, 9, 16, 17, 30]) {
      for (const tier of Object.keys(MIND_TIER_BANDS)) {
        const r = applyMindTiers({ tiers: { INT: tier }, stats: { ...CARD, INT: 1 }, cr, mind: 'sapient' });
        const [lo, hi] = MIND_TIER_BANDS[tier];
        expect(r.stats.INT).toBeGreaterThanOrEqual(lo);
        expect(r.stats.INT).toBeLessThanOrEqual(hi);
      }
    }
  });
});

describe('what it never does', () => {
  test('a print record means it does not run at all', () => {
    const r = run({ mind: 'sapient', hasPrintRecord: true });
    expect(r.ran).toBe(false);
    expect(r.stats).toEqual(CARD);
  });

  test('no tiers at all means it does not run', () => {
    expect(applyMindTiers({ tiers: null, stats: CARD, cr: 3 }).ran).toBe(false);
    expect(applyMindTiers({ tiers: 'capable', stats: CARD, cr: 3 }).ran).toBe(false);
  });

  test('STR, DEX and CON are never touched', () => {
    for (const mind of ['sapient', 'bestial', null]) {
      const r = run({ mind, tiers: { INT: 'formidable', WIS: 'formidable', CHA: 'formidable' } });
      expect([r.stats.STR, r.stats.DEX, r.stats.CON]).toEqual([16, 12, 14]);
    }
  });

  test('castingAbilityOf reads the row the donor carries, and null when there is none', () => {
    expect(castingAbilityOf({ Actions: [{ text: 'using Wisdom as the spellcasting ability (spell save DC 14)' }] })).toBe('WIS');
    expect(castingAbilityOf({ Actions: [{ text: 'Melee Attack Roll: +5' }] })).toBeNull();
    expect(castingAbilityOf(null)).toBeNull();
  });
});
