/**
 * Pins the 2014 DMG semantics this module was extracted with.
 *
 * These exist so the 2024 change (Low/Moderate/High, no encounter
 * multiplier) lands as a visible test diff rather than a silent one. If you
 * are here to make that change, expect to rewrite this file — that is the
 * point of it.
 */
import {
  CR_TO_XP, normalizeCR, xpForCR, multiplierFor,
  totalPlayers, totalMonsters, thresholdsFor,
  rawXpFor, adjustedXpFor, difficultyFor,
} from './encounter-math.mjs';

import encounterDifficulty from '@/data/encounter-difficulty.json';
const TABLE = encounterDifficulty.encounter_difficulty;

describe('normalizeCR', () => {
  it('passes fraction strings through', () => {
    expect(normalizeCR('1/8')).toBe('1/8');
    expect(normalizeCR('1/2')).toBe('1/2');
  });

  it('converts decimal CRs to the fraction keys', () => {
    expect(normalizeCR(0.125)).toBe('1/8');
    expect(normalizeCR(0.25)).toBe('1/4');
    expect(normalizeCR(0.5)).toBe('1/2');
  });

  it('floors whole and numeric-string CRs', () => {
    expect(normalizeCR(5)).toBe('5');
    expect(normalizeCR('5')).toBe('5');
    expect(normalizeCR(5.9)).toBe('5');
  });

  it('falls back to 0 for null, undefined and unparseable input', () => {
    expect(normalizeCR(null)).toBe('0');
    expect(normalizeCR(undefined)).toBe('0');
    expect(normalizeCR('unknown')).toBe('0');
  });
});

describe('xpForCR', () => {
  it('awards the DMG value', () => {
    expect(xpForCR(3)).toBe(700);
    expect(xpForCR('1/8')).toBe(25);
    expect(xpForCR(30)).toBe(155000);
  });

  it('scores an off-table CR as 0 rather than NaN', () => {
    // CR 31 has no entry; a NaN here would poison every downstream total.
    expect(xpForCR(31)).toBe(0);
  });

  it('covers every key in the table', () => {
    for (const [cr, xp] of Object.entries(CR_TO_XP)) expect(xpForCR(cr)).toBe(xp);
  });
});

describe('multiplierFor', () => {
  it('walks the DMG tier table for a standard party', () => {
    expect(multiplierFor(1, 4)).toBe(1);
    expect(multiplierFor(2, 4)).toBe(1.5);
    expect(multiplierFor(6, 4)).toBe(2);
    expect(multiplierFor(10, 4)).toBe(2.5);
    expect(multiplierFor(14, 4)).toBe(3);
    expect(multiplierFor(15, 4)).toBe(4);
  });

  it('shifts a tier up for a party under three', () => {
    expect(multiplierFor(1, 2)).toBe(1.5);
  });

  it('shifts a tier down for a party over five', () => {
    expect(multiplierFor(2, 6)).toBe(1);
  });

  it('clamps at both ends of the table', () => {
    expect(multiplierFor(20, 2)).toBe(4);
    expect(multiplierFor(1, 6)).toBe(1);
  });

  it('returns 1 for an empty encounter even with a small party', () => {
    // The guard the component relied on before extraction. Without it a
    // party of two would get 1.5x of nothing.
    expect(multiplierFor(0, 2)).toBe(1);
  });
});

describe('party and monster totals', () => {
  it('sums players across groups', () => {
    expect(totalPlayers([{ players: 4, level: 3 }, { players: 2, level: 5 }])).toBe(6);
  });

  it('treats blank and null player counts as zero', () => {
    expect(totalPlayers([{ players: null, level: null }, { players: '', level: 2 }])).toBe(0);
  });

  it('defaults a missing quantity to one creature', () => {
    expect(totalMonsters([{ cr: 3 }, { cr: 1, quantity: 4 }])).toBe(5);
  });
});

describe('thresholdsFor', () => {
  it('scales the level row by the number of players', () => {
    const t = thresholdsFor([{ players: 4, level: 1 }], TABLE);
    expect(t).toEqual({ easy: 100, medium: 200, hard: 300, deadly: 400 });
  });

  it('sums across groups of different levels', () => {
    const t = thresholdsFor([{ players: 2, level: 1 }, { players: 2, level: 1 }], TABLE);
    expect(t.easy).toBe(100);
  });

  it('ignores groups missing a level or a player count', () => {
    expect(thresholdsFor([{ players: 4, level: null }], TABLE).easy).toBe(0);
    expect(thresholdsFor([{ players: 0, level: 5 }], TABLE).easy).toBe(0);
  });

  it('returns zeros for an unconfigured party', () => {
    expect(thresholdsFor([{ players: null, level: null }], TABLE))
      .toEqual({ easy: 0, medium: 0, hard: 0, deadly: 0 });
  });
});

describe('encounter XP', () => {
  it('sums raw XP across quantities', () => {
    expect(rawXpFor([{ cr: 1, quantity: 2 }, { cr: '1/8', quantity: 4 }])).toBe(500);
  });

  it('scores a single Owlbear at 700 XP', () => {
    // The creature-page anchor: the mockup prints "700 XP" for one Owlbear,
    // which is the raw CR 3 award with no multiplier applied.
    expect(rawXpFor([{ cr: 3, quantity: 1 }])).toBe(700);
    expect(adjustedXpFor([{ cr: 3, quantity: 1 }], 4)).toBe(700);
  });

  it('applies the multiplier and floors the result', () => {
    // 2 x CR 1 = 400 raw, tier 1 for a party of 4 = 1.5x.
    expect(adjustedXpFor([{ cr: 1, quantity: 2 }], 4)).toBe(600);
  });

  it('is 0 for an empty encounter', () => {
    expect(rawXpFor([])).toBe(0);
    expect(adjustedXpFor([], 4)).toBe(0);
  });
});

describe('difficultyFor', () => {
  const t = { easy: 100, medium: 200, hard: 300, deadly: 400 };

  it('names each band at its boundary', () => {
    expect(difficultyFor(400, t)).toBe('Deadly');
    expect(difficultyFor(300, t)).toBe('Hard');
    expect(difficultyFor(200, t)).toBe('Medium');
    expect(difficultyFor(100, t)).toBe('Easy');
    expect(difficultyFor(99, t)).toBe('Trivial');
  });

  it('separates "nothing to fight" from "party not configured"', () => {
    // Both look empty on screen but mean different things, and the
    // component surfaces both.
    expect(difficultyFor(0, t)).toBe('None');
    expect(difficultyFor(500, { easy: 0, medium: 0, hard: 0, deadly: 0 })).toBe('Unknown');
  });
});
