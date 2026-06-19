import {
  deriveEventYear,
  yearsAgoFromEventYear,
  sortByYearsAgo,
  availablePeriodsForPosition,
  yearsAgoFromSelection,
  YEAR_RANGES,
} from './lore-timeline.mjs';

// ── A. Derivation & cascade (yearsAgo is the canonical axis) ──────────────
describe('deriveEventYear', () => {
  it('subtracts yearsAgo from the current year, preserving the reckoning', () => {
    expect(deriveEventYear('1492 DR', 677)).toBe('815 DR');
    expect(deriveEventYear('1492 DR', 1454)).toBe('38 DR');
  });

  it('replaces only the numeric run and keeps surrounding text', () => {
    expect(deriveEventYear('Year 3024', 24)).toBe('Year 3000');
  });

  it('produces negative years rather than clamping (pre-reckoning events)', () => {
    expect(deriveEventYear('100 AR', 150)).toBe('-50 AR');
  });

  it('falls back to a relative phrase when the year is blank', () => {
    expect(deriveEventYear('', 200)).toBe('200 years ago');
  });

  it('falls back to a relative phrase when the year is ambiguous (more than one number)', () => {
    // "1492-1500 DR" has two numeric runs → can't pick one → relative phrase
    expect(deriveEventYear('1492-1500 DR', 10)).toBe('10 years ago');
  });

  it('falls back to a relative phrase when the year has no number at all', () => {
    expect(deriveEventYear('the dawn age', 10)).toBe('10 years ago');
  });

  it('cascades: the same yearsAgo yields a different display year when the world year changes', () => {
    const yearsAgo = 100;
    expect(deriveEventYear('1492 DR', yearsAgo)).toBe('1392 DR');
    expect(deriveEventYear('1500 DR', yearsAgo)).toBe('1400 DR');
  });
});

describe('yearsAgoFromEventYear (inverse, for manual year edits)', () => {
  it('recovers yearsAgo from an edited event year', () => {
    expect(yearsAgoFromEventYear('815 DR', '1492 DR')).toBe(677);
  });

  it('round-trips with deriveEventYear', () => {
    const derived = deriveEventYear('1492 DR', 677);
    expect(yearsAgoFromEventYear(derived, '1492 DR')).toBe(677);
  });

  it('returns null when either year is ambiguous so the caller keeps the old value', () => {
    expect(yearsAgoFromEventYear('the dawn age', '1492 DR')).toBeNull();
    expect(yearsAgoFromEventYear('815 DR', '')).toBeNull();
  });
});

describe('sortByYearsAgo', () => {
  it('orders oldest first and does not mutate the input', () => {
    const input = [{ yearsAgo: 10 }, { yearsAgo: 500 }, { yearsAgo: 100 }];
    const sorted = sortByYearsAgo(input);
    expect(sorted.map((e) => e.yearsAgo)).toEqual([500, 100, 10]);
    expect(input.map((e) => e.yearsAgo)).toEqual([10, 500, 100]);
  });

  it('preserves element references so a display-row index resolves back to the stored object', () => {
    // The component relies on this: the derived sortedTimelineEvents maps to
    // NEW objects (to attach eventYear), so edit/remove handlers locate the
    // real stored event via sortByYearsAgo(...)[row] + indexOf instead. That
    // only works if sort hands back the *same* references it was given.
    const a = { yearsAgo: 10, title: 'a' };
    const b = { yearsAgo: 500, title: 'b' };
    const c = { yearsAgo: 100, title: 'c' };
    const stored = [a, b, c];
    const row = 0; // oldest display row → should be `b` (500 years ago)
    const resolved = sortByYearsAgo(stored)[row];
    expect(resolved).toBe(b);
    expect(stored.indexOf(resolved)).toBe(1);
  });
});

// ── B. Insertion constraints ──────────────────────────────────────────────
describe('availablePeriodsForPosition', () => {
  it('offers every bucket when the timeline is empty', () => {
    expect(availablePeriodsForPosition([], 0)).toEqual(YEAR_RANGES.map((r) => r.label));
  });

  it('only offers buckets older than the event after the slot (inserting before)', () => {
    // One event 5 years ago; inserting at position 0 must be strictly older.
    const labels = availablePeriodsForPosition([{ yearsAgo: 5 }], 0);
    expect(labels).not.toContain('Recent (1-5 years ago)');
    expect(labels).toContain('A century ago (80-120 years)');
  });

  it('only offers buckets younger than the event before the slot (appending)', () => {
    // One event 1000 years ago; appending at the end must be more recent.
    const labels = availablePeriodsForPosition([{ yearsAgo: 1000 }], 1);
    expect(labels).toContain('Recent (1-5 years ago)');
    expect(labels).not.toContain('Ancient times (1500-3000 years)');
  });

  it('restricts to buckets overlapping the gap between two neighbours', () => {
    // Gap between 40 and 400 years ago → only buckets touching (41..399).
    const sorted = [{ yearsAgo: 400 }, { yearsAgo: 40 }];
    const labels = availablePeriodsForPosition(sorted, 1);
    expect(labels).toContain('A century ago (80-120 years)');
    expect(labels).not.toContain('Recent (1-5 years ago)');
    expect(labels).not.toContain('Many centuries ago (400-800 years)');
  });
});

describe('yearsAgoFromSelection', () => {
  it('returns the bucket floor/ceiling for deterministic random ends', () => {
    expect(yearsAgoFromSelection('A century ago (80-120 years)', [], 0, () => 0)).toBe(80);
    expect(yearsAgoFromSelection('A century ago (80-120 years)', [], 0, () => 0.999999)).toBe(120);
  });

  it('clamps the floor above the event after the slot', () => {
    // eventAfter 90 years ago → result must be ≥ 91 even though bucket starts at 80.
    const sorted = [{ yearsAgo: 90 }];
    const result = yearsAgoFromSelection('A century ago (80-120 years)', sorted, 0, () => 0);
    expect(result).toBe(91);
  });

  it('clamps the ceiling below the event before the slot', () => {
    // eventBefore 100 years ago → appending must be ≤ 99 even though bucket runs to 120.
    const sorted = [{ yearsAgo: 100 }];
    const result = yearsAgoFromSelection('A century ago (80-120 years)', sorted, 1, () => 0.999999);
    expect(result).toBe(99);
  });

  it('always lands strictly between two neighbours across the random range', () => {
    const sorted = [{ yearsAgo: 120 }, { yearsAgo: 80 }];
    for (const r of [0, 0.25, 0.5, 0.75, 0.999999]) {
      const result = yearsAgoFromSelection('A century ago (80-120 years)', sorted, 1, () => r);
      expect(result).toBeGreaterThan(80);
      expect(result).toBeLessThan(120);
    }
  });

  it('falls back to 100 for an unknown selection', () => {
    expect(yearsAgoFromSelection('nonsense', [], 0)).toBe(100);
  });
});
