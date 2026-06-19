/**
 * Pure time-axis helpers for the item Lore Builder timeline.
 *
 * `yearsAgo` is the canonical axis for every event — it's the only value
 * persisted on a timeline event. The human-facing world-year string
 * (e.g. "815 DR") is *derived* at render from the item's current world
 * year, never stored, so editing the world year cascades to every event
 * instead of leaving a stale snapshot behind.
 *
 * These functions are extracted from LoreBuilderTab.vue so the derivation
 * and insertion-constraint logic can be unit-tested without mounting the
 * AI/quota-bound component.
 */

// The selectable "how long ago" buckets. Single source of truth shared by
// the period <select> options and the random year-within-bucket picker, so
// an option label can never drift out of sync with its numeric range.
export const YEAR_RANGES = [
  { label: 'Recent (1-5 years ago)', min: 1, max: 5 },
  { label: 'Several years ago (5-15 years)', min: 5, max: 15 },
  { label: 'A generation ago (20-40 years)', min: 20, max: 40 },
  { label: 'Two generations ago (40-80 years)', min: 40, max: 80 },
  { label: 'A century ago (80-120 years)', min: 80, max: 120 },
  { label: 'Several centuries ago (200-400 years)', min: 200, max: 400 },
  { label: 'Many centuries ago (400-800 years)', min: 400, max: 800 },
  { label: 'An age ago (800-1500 years)', min: 800, max: 1500 },
  { label: 'Ancient times (1500-3000 years)', min: 1500, max: 3000 },
  { label: 'Time immemorial (3000+ years)', min: 3000, max: 5000 },
];

const RANGE_BY_LABEL = Object.fromEntries(
  YEAR_RANGES.map((r) => [r.label, [r.min, r.max]]),
);

/**
 * Derive an event's display year from the world's current year and how
 * many years ago the event happened. Returns the current-year string with
 * its single numeric run replaced by `current − yearsAgo` (preserving the
 * surrounding reckoning, e.g. " DR"). Falls back to "N years ago" when the
 * current year is blank or doesn't contain exactly one number.
 */
export function deriveEventYear(currentYear, yearsAgo) {
  if (!currentYear) return `${yearsAgo} years ago`;

  const str = String(currentYear);
  const matches = str.match(/\d+/g);
  if (!matches || matches.length !== 1) {
    return `${yearsAgo} years ago`;
  }

  const currentYearNum = parseInt(matches[0], 10);
  const eventYearNum = currentYearNum - yearsAgo;
  return str.replace(/\d+/, eventYearNum.toString());
}

/**
 * Invert deriveEventYear: given an edited world-year string and the
 * current world year, compute the implied `yearsAgo`. Returns null when
 * either string lacks exactly one number (caller keeps the old value).
 */
export function yearsAgoFromEventYear(eventYear, currentYear) {
  const eventMatch = String(eventYear).match(/\d+/g);
  const currentMatch = String(currentYear).match(/\d+/g);
  if (
    !eventMatch || eventMatch.length !== 1 ||
    !currentMatch || currentMatch.length !== 1
  ) {
    return null;
  }
  return parseInt(currentMatch[0], 10) - parseInt(eventMatch[0], 10);
}

/** Oldest → newest (largest yearsAgo first). Does not mutate the input. */
export function sortByYearsAgo(events) {
  return [...events].sort((a, b) => b.yearsAgo - a.yearsAgo);
}

/**
 * The period buckets valid for inserting an event at `position` in a
 * chronologically-sorted (oldest→newest) list. A bucket is offered only if
 * it overlaps the open gap bounded by the neighbours: the event after the
 * slot forces a strictly-older floor, the event before forces a
 * strictly-younger ceiling.
 */
export function availablePeriodsForPosition(sortedEvents, position) {
  const eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;
  const eventBefore = position > 0 ? sortedEvents[position - 1] : null;

  let minYears = 1;
  let maxYears = 10000;
  if (eventAfter) minYears = eventAfter.yearsAgo + 1;
  if (eventBefore) maxYears = eventBefore.yearsAgo - 1;

  return YEAR_RANGES
    .filter((r) => r.min <= maxYears && r.max >= minYears)
    .map((r) => r.label);
}

/**
 * Pick a concrete `yearsAgo` inside the selected bucket, clamped so it
 * stays strictly between the neighbouring events at `position`. `random`
 * is injectable for deterministic tests (defaults to Math.random).
 */
export function yearsAgoFromSelection(
  selection,
  sortedEvents,
  position,
  random = Math.random,
) {
  const range = RANGE_BY_LABEL[selection];
  if (!range) return 100;

  const eventBefore = position > 0 ? sortedEvents[position - 1] : null;
  const eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;

  let min = range[0];
  let max = range[1];
  if (eventAfter) min = Math.max(min, eventAfter.yearsAgo + 1);
  if (eventBefore) max = Math.min(max, eventBefore.yearsAgo - 1);

  return Math.floor(random() * (max - min + 1)) + min;
}
