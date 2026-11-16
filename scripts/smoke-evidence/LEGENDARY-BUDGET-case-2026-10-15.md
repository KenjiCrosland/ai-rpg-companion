# The legendary budget — two readings of one question, reconciled

**Found by:** the `bodies` run, 2026-10-15. A CR 15 storm dragon FAILED
`hot-offense` — "offense alone reads CR 23, 8 over — past print's own ceiling".

## What it was not

My first reading was that the energy rider was being added per hit and
multiplied by the Multiattack count. **Wrong** — the rider is a 60/40 *split* of
the solved per-hit (`scale.mjs`: "sum = the solved per-hit, budget unchanged"),
so it is not additive at all.

## What it was: the loop counted what the seed did not

```js
const legendaryHits = legendaryStrikes * 3;                  // "the DMG counts every legendary use"
let perHit = Math.round(card.dpr / (attacks + legendaryHits + 1));   // seed: counts 3 ✓
…
const sustained = perHit * (attacks + legendaryStrikes);     // loop: counts 1 ✗
```

The seed, the comment above it, and the checker's own `sustainedOf` all count a
cost-1 legendary strike **three times** — the DMG's reading, landed from the
critic's 2026-10-02 audit. The convergence loop counted it **once**, so it drove
`perHit` back up until the sheet was hot.

**Second defect, in the same filter.** The donors already carry print's brake —
`Legendary Ranged Attack: … The creature can't take this action again` — and the
checker honours it (`once ? 1 : floor(uses/cost)`). `scale.mjs`'s filter did not,
so a donor with one free repeat row and one braked row was priced as two free
ones: six phantom attacks where the checker counts four. That is why fixing only
the first defect left CR 18-22 weak.

Both fixed. The budget solver and the gate now read a legendary row the same way.

## Measured against print

Print's blocks carrying a legendary attack-repeat row:

| CR | print per-hit | ours before | ours after |
|---|---|---|---|
| 15 | 21–22 (Adult Bronze/Green) | **32** | 26 |
| 17 | 18–21 (Adult Gold/Red) | — | 29 |
| 18 | 21–24 | — | **22** |
| 20 | 24–26 (Ancient Brass/White) | — | **25** |
| 22 | 27 (Ancient Bronze/Green) | — | 33 |

The skirmisher line lands on print exactly. The brute line reads higher, but
per-hit is not comparable across attack counts — fewer, bigger hits carry the
same round damage — so the gate is the judge there, not this column.

**Print also settled a donor question:** 27 of 30 print blocks with legendary
actions have exactly ONE attack-repeat row, 3 have none, and **zero have two**.
Ten of our donors have two — but both of theirs carry print's "can't take this
action again" brake on the second, so with the filter fixed they price as print
does. No donor edit needed.

## The regression picture, high-cr (12 blocks)

| | 2026-10-04 (before) | 2026-10-15 (after) |
|---|---|---|
| `hot-offense` softs | **5 of 12** (+4, +4, +4, +5, +4 over) | **1 of 12** (+4) |
| `aim-dpr` under-card | 2 (27%, 26% under) | 5 (21–37% under) |
| FAILs | 3 | 4 |

The high tier was **systematically hot** — five blocks reading +4 to +5 over on
offense, which is the error that kills a party. It now reads inside print's own
range (`reads CR 15.5; print at 17 reads 13–18.5, n=9`) at the cost of running
under the engine's own card.

**That gap is the open question this landing does not answer:** the card asks 190
dpr at CR 17, and print's CR 17 blocks read 13–18.5 CR from their actual damage.
The card looks hot relative to print at the top. Recalibrating it is a separate,
measured decision — not something to slip in under a bug fix.

None of the 4 FAILs is a damage-band failure:

- `under` (HP 263 vs print's 287–337 at CR 19) — that concept drew **lurker-17**
  today where it drew skirmisher-18 on the 4th. A donor-HP gap on a different
  draw; the damage solver does not touch HP.
- `inline-correctness` ×1, `name-mechanic` ×1, `save-fit`/`no-type-in-name` ×1 —
  the known reader families, unrelated.

## Two pins changed, and why

Both encoded the bug rather than the law, so both had to move — stated plainly
because changing a pin to make a change pass is exactly the wrong move:

1. **`scale.spec.js`** counted a legendary strike once when computing sustained.
   The checker, the seed, and the DMG count three. The pin was asserting the
   arithmetic that produced the hot dragon.
2. **`generate.spec.js`, the CR 21 upcast law** asserted `Cone of Cold (level
   6-9)`. That held only while the row was inflated. With the fix, caster-21's
   per-hit is **32** and print's CR 21 Lich deals **31** — and Cone of Cold's base
   is 36, already past row parity, so upcasting it would overshoot print. The pin
   now reads the LAW in both directions: it STAYS at CR 21 where the base clears
   the row, and RISES at CR 25 where the row is 41. A per-hit change can no
   longer fake a pass.

## One thing print overruled me on

I reported the `bodies` ooze as missing Poison immunity and called it a content
error. Print's own oozes: **0 of 4** are Poison-immune (Black Pudding has Acid,
Cold, Lightning, Slashing; Gray Ooze has none). The *gate* was wrong, asking for
something print never prints, while `generate.mjs`'s body table already had it
right as Acid. Measured all four types before editing — Undead 17/19,
Construct 9/10, Elemental 12/17 Poison-immune — and removed only Ooze. Pinned
with the corpus shares so the intuition cannot come back.

## Gate

`npx jest` 2703 passed / 68 suites. `npm run build` clean. `bodies` 0 FAIL
(was 1). `high-cr` 4 FAIL, none in the damage bands.
