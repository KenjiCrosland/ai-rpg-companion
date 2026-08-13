/**
 * THE CROSS-BLOCK FREQUENCY LEDGER (owner call, 2026-08-07).
 *
 * A single block can be flawless and a SET can still read as repetitive.
 * The demiplane banish (`Banish` off the Adult Gold Dragon) shipped four
 * times across one review set — as Fold into Nothing, Scorch Step, Banish
 * to the Pit, and Reverie Banishment. Every instance was well-built,
 * correctly locked, and freshly renamed; the row underneath was identical.
 * Renaming is exactly why the repeat is invisible from inside any one
 * generation, and why the ledger keys on the SOURCE ROW rather than on the
 * shipped name.
 *
 * Design constraints this obeys:
 *   - It DAMPS, never excludes. A row that is the only fit still wins;
 *     guide-not-constrain is still the rule.
 *   - It is PASSED IN, never read by the engine. buildSkeleton stays a pure
 *     function of its arguments — if it reached for localStorage itself,
 *     jsdom would hand every test a shared, order-dependent ledger.
 *   - It never fails a generation. Every storage touch is guarded; a
 *     hostile or absent localStorage degrades to "no history", which is
 *     precisely the behavior before this existed.
 */

const KEY = 'statblock-row-ledger';
/** How many past generations are remembered. */
export const WINDOW = 12;
/** Generations this recent count double — a repeat you just saw stings most. */
const HOT = 3;

/**
 * A row's identity is the MECHANIC, not the donor.
 *
 * This keyed on `source/ability` at first, which made the ledger blind to
 * exactly the rows that saturate: Magic Resistance exists as 34 rows from 34
 * creatures, Pack Tactics as 18, Pounce as 18, Amphibious as 31 — so every
 * shipment looked like a different row and nothing was ever damped. 803 of
 * 1073 rows share a name with at least one other. Measured against live
 * output that was Magic Resistance in 65% of blocks and Pounce in 85%,
 * while the ledger reported no repeats at all.
 *
 * The same name across sources is the same mechanic scaled to a different
 * CR, so the name IS the identity. The donor is deliberately not part of it.
 */
export const rowKeyOf = (row) => String(row?.ability ?? row?.trait ?? '?')
  .replace(/\s*\([^)]*\)\s*$/, '').trim().toLowerCase();

function readRaw() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(Array.isArray) : [];
  } catch {
    return [];
  }
}

/**
 * Weight multipliers for rows shipped recently, as a plain object keyed by
 * row identity. Newest generation first.
 */
export function readRecent() {
  const gens = readRaw().slice(0, WINDOW);
  const hits = {};
  gens.forEach((keys, i) => {
    const weight = i < HOT ? 2 : 1;
    for (const k of new Set(keys)) hits[k] = (hits[k] ?? 0) + weight;
  });
  return hits;
}

/** Record the rows a finished block shipped. Newest first, window-capped. */
export function recordShipped(keys) {
  try {
    if (typeof localStorage === 'undefined') return;
    const fresh = [...new Set((keys ?? []).filter((k) => typeof k === 'string' && k && !k.endsWith('/?')))];
    if (!fresh.length) return;
    localStorage.setItem(KEY, JSON.stringify([fresh, ...readRaw()].slice(0, WINDOW)));
  } catch {
    /* storage full, disabled, or incognito — history is a nicety, never a gate */
  }
}

/**
 * The damping curve. One recent shipment costs a row about two thirds of
 * its weight; a stale one about a third. Nothing reaches zero.
 */
export function recencyWeight(row, recent) {
  if (!recent) return 1;
  const hits = recent[rowKeyOf(row)] ?? 0;
  return hits ? 1 / (1 + 0.9 * hits) : 1;
}

/** Clear the ledger (dev control / user-facing reset). */
export function clearLedger() {
  try {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(KEY);
  } catch { /* nothing to do */ }
}
