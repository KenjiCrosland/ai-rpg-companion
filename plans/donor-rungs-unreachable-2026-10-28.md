# Five donor rungs are unreachable across part of their own cited range

**Owner, 2026-10-28:** *"let's park it. not a blocker."*

DEFERRED. Recorded so the measurements are not re-derived. Found while chasing a
CR 11-16 complexity gap that turned out to be mostly sample composition.

## The defect

`pickDonor` (scale.mjs) takes the highest donor **at or below** the target CR:

```js
const from = (list) => list.filter((d) => d.cr <= cr).sort((a, b) => b.cr - a.cr)[0] ?? list[0];
```

So a donor whose cited range starts below its nominal CR can never be drawn over
the bottom of that range. Five rungs are affected:

| donor | nominal CR | its own cite | unreachable at | cost |
|---|---|---|---|---|
| `dragon-15` | 15 | "the ten adult dragons (CR 13-17)" | **CR 13-14** | **loses the legendary kit** |
| `dragon-22` | 22 | "the ten ancient dragons (CR 20-24)" | **CR 20-21** | **loses the legendary kit** |
| `dragon-8` | 8 | "the ten young dragons (CR 6-10)" | CR 6-7 | wrong tier |
| `dragon-2` | 2 | "the ten wyrmlings (CR 1-4)" | CR 1 | wrong tier |
| `ooze-4` | 4 | "(CR 2-4)" | CR 2-3 | wrong tier |

Observed: `Bonespit Reef-Drake`, CR 13, drew `dragon-8` — the YOUNG dragon
chassis, two tiers below the donor that covers it — and shipped with no legendary
actions. Print's Adult Brass and Adult White are both CR 13 and both have them.

## Why this is NOT a legendary-threshold problem

The donor table is already print-exact: `dragon-15` is flagged legendary,
`dragon-8` is not, and print's young dragons have no legendary actions. The
`cr < 17` legendary tier in `pickDonor` should NOT be lowered — print's CR 13
giants, golems and devils have no legendary actions, so a flat CR-13 threshold
would be wrong. The rung just needs to be reachable.

**How print decides legendary actions** (measured, 2026-10-28): by chassis tier
and boss-variant, never by CR alone. Rate by band: **0% (CR 0-4), 3% (5-10),
41% (11-16), 85% (17+)**. At CR 11-16 the eleven that have them are the eight
adult dragons plus Mummy Lord, Vampire and Sphinx of Lore — solo lair-holders.
The sixteen without are elite troops: Archmage, Behir, Djinni, Efreeti, Erinyes,
Horned Devil, Ice Devil, Iron Golem, Marilith, Nalfeshnee, Planetar, Purple Worm,
Rakshasa, Remorhaz, Roc, Storm Giant.

## The proposed fix

A declared `cr_from` on each donor (its cite's lower bound), respected by
`from()`. Declared data, generalises to all five, and needs no change to the
legendary tier — `dragon-15` becomes reachable at 13 and brings its kit.

Check before shipping:
- Scaling a CR 15 chassis down to 13: `scale.mjs` has an explicit legendary HP
  trade, so arriving with the kit at 13 changes HP and the action economy.
- CR 20-21 on `dragon-22` is the same bug and probably worse — those sheets draw
  `dragon-15` today and lose the ancient tier entirely.

## What was NOT the problem (so it is not re-chased)

- **The free-row budget.** It evicts 6 rows across 66 sheets and is flat at 0.5
  rows/sheet in every band. Scaling it by CR would govern almost nothing: raising
  it at CR 11-16 recovers 2 rows across 13 sheets, against a 1.6-row gap.
- **A CR 11-16 complexity gap.** Ours 3.5 non-attack rows vs print 5.1 — but the
  whole shortfall is 1.1 legendary actions, and print's CR 11-16 sample is 8 of 27
  dragons (30%) against 1 of 11 in our batches (9%). Mostly composition, not a
  defect. Traits, non-attack actions, bonus actions and reactions all match print
  within half a row.
- **Low CR over-complexity IS real** (+1.6 at CR 0-2, +2.1 at CR 3-4) and is
  **chassis/print rows**, not free rows — the per-archetype donor trim the owner
  identified as the harder job.
