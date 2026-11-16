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
    expect([r.stats.INT, r.stats.WIS, r.stats.CHA]).toEqual([15, 15, 15]);
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
    expect(r.stats.INT).toBe(15); // the other two still move
  });

  // RULING B (2026-11-15): the call can LOWER an animal's INT, never raise it. "A giant river
  // pike" read bestial, answered INT feeble, and shipped the card's INT 11.
  test.each([
    ['feeble', 11, 3, 'a card of 8 or more drops to 3'],
    ['feeble', 8, 3, 'the band edge drops too'],
    ['feeble', 7, 7, 'a card already that dim is left alone by rule 4'],
    ['ordinary', 11, 11, 'any other tier is still ignored'],
    ['capable', 11, 11, 'bestial with capable is the call contradicting itself'],
    ['formidable', 6, 6, 'and it can never raise'],
  ])('bestial, INT "%s" on a card of %i -> %i (%s)', (tier, card, want) => {
    for (const mind of ['bestial', 'mindless']) {
      const r = applyMindTiers({ tiers: { INT: tier }, stats: { ...CARD, INT: card }, cr: 3, mind });
      expect(r.stats.INT).toBe(want);
    }
  });

  test('a HELD score still wins over ruling B — rule 2 and 2c come first', () => {
    const striker = applyMindTiers({ tiers: { INT: 'feeble' }, stats: { ...CARD, INT: 11 }, cr: 3, mind: 'bestial', strikerStat: 'INT' });
    expect(striker.stats.INT).toBe(11);
    // 2c holds a mental the CARD'S DC derives from, when no physical reaches the same DC:
    // 8 + PB 2 + INT 16's mod 3 = 13, and the physicals here all derive 10
    const dcBearing = applyMindTiers({ tiers: { INT: 'feeble' }, stats: { STR: 10, DEX: 10, CON: 10, INT: 16, WIS: 10, CHA: 10 }, cr: 3, mind: 'bestial', cardDc: 13, pb: 2 });
    expect(dcBearing.stats.INT).toBe(16);
    expect(dcBearing.held.find((h) => h.k === 'INT').why).toMatch(/save DC 13 derives/);
  });

  test('3: INT stays when the call did not read the creature as sapient', () => {
    for (const mind of ['bestial', 'mindless']) {
      const r = run({ mind }); // the tiers here are all `capable`, which can never lower an INT
      expect(r.stats.INT).toBe(6);
      expect(r.stats.WIS).toBe(15); // only INT is held by this rule
    }
    expect(run({ mind: 'sapient' }).stats.INT).toBe(15);
    expect(run({ mind: null }).stats.INT).toBe(15); // no answer is not a refusal
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
  // THE BANDS AND NUMBERS, owner's ruling 1 of 2026-11-15: capable must read as 15 or better.
  // Two CR columns, and a row on each band edge — 13 against 14, and 17 against 18.
  test.each([[3, 15, 18], [8, 15, 18], [9, 15, 20], [16, 15, 20], [24, 15, 20]])(
    'CR %i: capable %i, formidable %i', (cr, cap, form) => {
      const r = applyMindTiers({ tiers: { INT: 'capable', WIS: 'formidable', CHA: 'feeble' }, stats: { ...CARD, CHA: 14 }, cr, mind: 'sapient' });
      expect(r.stats.INT).toBe(cap);
      expect(r.stats.WIS).toBe(form);
      expect(r.stats.CHA).toBe(6); // feeble is 6 at every CR
    },
  );

  test.each([[13, 'ordinary'], [14, 'capable'], [17, 'capable'], [18, 'formidable']])(
    'a card score of %i is already %s, so it is held', (card, tier) => {
      const r = applyMindTiers({ tiers: { INT: tier }, stats: { ...CARD, INT: card }, cr: 5, mind: 'sapient' });
      expect(r.stats.INT).toBe(card);
      expect(r.moves).toEqual([]);
    },
  );

  test.each([[13, 'capable', 15], [14, 'ordinary', 10], [17, 'formidable', 18], [18, 'capable', 15]])(
    'a card score of %i against "%s" moves to %i', (card, tier, to) => {
      const r = applyMindTiers({ tiers: { INT: tier }, stats: { ...CARD, INT: card }, cr: 5, mind: 'sapient' });
      expect(r.stats.INT).toBe(to);
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
