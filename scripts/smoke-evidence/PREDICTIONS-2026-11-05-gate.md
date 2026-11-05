# Predictions — gate forty over everything since the release forty

Written before launch, unedited after. The last gate was `sweep-2026-11-05T00-31-57` /
`homebrew40-2026-11-05T00-51-36` (40/40 and 40/40, 4 and 1 lint findings, 7 and 3 FAILs).
Since then: the single-target save clamp, the payoff redesign on both paths, the
escalation shelf and ladder, and the loop gate.

## What I expect to HOLD

- **40/40 and 40/40, 0 throws.** Nothing since touched generation flow.
- **single-target saves over print's ceiling: 0.** Enforced at ship on the finished
  sentence, so it survives the downstream re-price that beat five earlier attempts.
- **`multiattack-*` lints and `empty-option`: 0.** Repaired at ship and unchanged since.
- **`save-without-its-numbers`, `effect-cites-nothing`: 0.**
- **median round damage ~14**, unchanged in all seven runs of the twelve — the clamped
  rows were never in the per-round figure.

## What I expect to MOVE

- **`multiattack-offlist-spell`: non-zero again.** The lint works; no repair was built.
- **checker FAILs: the `single-target-ceiling` class should fall.** It was 3 of sweep's 7
  last gate (Ground Eruption 36>24, Opportunist's Lash 42>31, Ring the Dying Over 56>31).
  All three are single-target saves, so the clamp should take them. If they survive, the
  ship-time cap is not reaching the rows the checker reads.
- **payoff rows: 1-3 across the 80.** Base rate is 2.6% of catalog rows; the loop gate
  removes the redundant ones, so the count may DROP while quality rises.

## What would surprise me, and what each would mean

- A single-target save over the ceiling → the ship-time cap misses a writer I have not
  found. There were four.
- A payoff on a sheet that already swallows/whelms → the loop gate guards the SHELF only,
  and the catalog is the 6x path. This is the known hole; a hit here sizes it.
- FAILs rising above last gate's 7+3 → something in the payoff or clamp work regressed a
  class I did not measure. The suite would not have caught it; five of six clamp attempts
  were green.

## The caveat

Single-roll counts move +/-3 on noise alone (owner, 11-03), and the creatures differ run
to run, so the FAIL LIST is not comparable — only the class breakdown is. Ship/fix
verdicts are the critic's; these are mechanism numbers.
