# Task 8 (reviewer follow-up): Aggregate DPR incl. Legendary — REAL HOLE, precisely located

## The question

Task 1 checked per-*entry* legendary damage against the per-attack budget.
Nobody checked whether **total round output** (Multiattack + legendary uses +
recharge nova) lands in the CR band, or whether the chassis DPR budget
accounts for legendary output at all. Decisive test: compute official
aggregate DPR including legendary for the 30 SRD legendary blocks, compare to
band. If officials also "exceed" it, the concern dissolves; if not, there's a
budget hole.

## Part 1 — the naive test is one officials fail too (so it's the wrong test)

Aggregate = (best routine turn × 2 + best nova) / 3, plus 3 legendary uses at
their resolved damage (following `uses X` reuse into the target action).

- **17/30 official legendary blocks exceed the band MAX** once legendary
  output is included.
- Median (3-round + legendary) / band-mid = **1.15**.

So a rule that flags "aggregate > band" would flag 17 official monsters. The
reviewer's original framing, taken literally, does dissolve: officials do run
~15% over band-mid at the table once legendary is counted, because the DMG's
offensive-CR method never treated legendary actions as sustained DPR.

## Part 2 — but officials pay for it by underbuilding the routine turn

The decisive number is what the routine turn costs:

- Median **routine-only / band-mid = 0.55**.

Officials deliberately build the Multiattack turn at ~55% of band-mid,
precisely to leave headroom for legendary + nova. Examples: Lich routine 93
(0.62 mid) but 186 aggregate; Kraken 48 (0.26 mid) but 147; Mummy Lord 35
(0.36) but 110. The routine turn is *not* the monster's full offense for a
legendary creature — it's roughly half of it.

## Part 3 — our engine does NOT do this. That's the hole.

`damageBudgetFor` (generate.mjs) sets the routine budget to
`band_midpoint × damage_mult`, **with no discount for legendary presence**.
Computed directly from the engine:

| Archetype | routine / band-mid | routine + 3 legendary uses (upper bound) |
|---|---|---|
| balanced | **1.00** | 2.0 mid |
| brute | **1.15** | 2.3 mid |
| defender | 0.85 | 1.7 mid |
| controller | 0.70 | 1.4 mid |

(The right column assumes all 3 legendary uses are per-attack damage — an
upper bound; a realistic 1–2 damage-uses/round still puts balanced at
~1.3–1.5 mid.) Against the official convention (routine 0.55 mid, aggregate
1.15 mid), **our legendary-bearing blocks run hot on the routine turn** — a
balanced legendary creature budgets its Multiattack at 1.00 mid where WotC
budgets 0.55, then Task 1 lets it add per-attack-capped legendary on top.

Task 1's per-entry cap does **not** address this: capping each legendary
entry at one attack's damage is correct (officials do the same, ceiling 1.38
Kraken), but the *sum* with an undiscounted routine still overshoots.

## Root cause

`damageBudgetFor(cr, chassis, plan)` — location: it reads
`plan.multiattack` (to split across attacks) but ignores `plan.legendary`
entirely. There is no "solo-with-legendary" pacing adjustment.

## Narrowest fix

Discount the routine budget when the plan carries legendary actions:

```js
// in damageBudgetFor, after computing `total`
const legendaryDiscount = (plan.legendary?.status === 'required'
  || plan.legendary?.status === 'recommended') ? 0.6 : 1;
const total = Math.max(1, Math.round(midpoint * (chassis.damage_mult ?? 1) * legendaryDiscount));
```

0.6 (not the observed 0.55) leaves a small margin so the routine turn doesn't
feel anemic. This flows automatically into `perAttack`, the prompt skeletons,
and the `attack-damage-band` lint — one constant, one site, corpus-anchored.
`optional`-legendary tiers are left at full routine (they usually don't take
legendary, and if they do the overshoot is smaller and self-limiting).

## Blast radius

Every generated legendary-bearing block's attack/save damage numbers drop
~40%. This is the largest-behavioral-impact fix in the whole investigation —
it changes numbers on shipped-quality output, so it needs field validation
(generate a CR 15 and CR 21 legendary block before/after, confirm the routine
turn still *feels* threatening). Non-legendary blocks: untouched. Loaded
saved monsters: untouched (regeneration only).

## Residual risk

- 0.6 is one data point's worth of calibration (median 0.55 across 30 blocks,
  but the spread is wide: Solar 0.77, Kraken 0.26). A per-archetype legendary
  discount would be more precise but adds surface; start with the flat
  constant and tune from the failure log.
- The fix assumes legendary creatures actually take ~2–3 legendary
  uses/round. A block that generates only movement legendaries would then be
  *under*-budgeted. Acceptable — underbuilt-but-legal beats overbuilt, and
  matches the never-fail-generation posture.
- This interacts with Task 1: if both ship, Task 1's per-entry cap plus this
  routine discount together reproduce the official pacing. Ship this one
  first — it's higher-leverage and simpler (one constant vs a reuse
  resolver).
