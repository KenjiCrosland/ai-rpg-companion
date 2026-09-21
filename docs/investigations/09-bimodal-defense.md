# Task 9 (reviewer follow-up): Bimodal / Compounding Defense

## The question

High AC + low HP + resistances — each component in-band while the combination
is broken. Does `defense-count` price the combination or just the components?

## What `defense-count` actually prices (code fact)

Three **independent** rules, each against its own archetype-adjusted target:

- `hp-band` — `monster.hp / chassis.hp` within a ratio band. Prices HP alone.
- `ac-band` — `|monster.ac − chassis.ac| ≤ 1`. Prices AC alone.
- `defense-count` — resistance/immunity **point budget**. Prices resistances
  alone.

**None prices the product.** Effective HP at the table is
`hp × (1 / hit-chance-given-AC) × resistance-multiplier` — multiplicative in
reality, additive-in-isolation in the lint. So the reviewer's structural
observation is correct: the combination is unpriced.

## But does the unpriced combination actually go out of band?

Simulated worst case per archetype (chassis HP × hp_mult, chassis AC + ac_mod,
full resistance budget), converting to DMG defensive+offensive CR:

| Archetype | drift, NO resistance | drift, + broad resistance |
|---|---|---|
| balanced | ~0 | +0 to +1 |
| **defender** (the high-AC case) | **~0** | +1 to +2 |
| brute | +1 to +3 | **+3 to +4** |
| swarm | 0 to +2 | +2 to +3 (exempt by design) |
| lurker | −3 to −6 | −3 to −6 |

Two findings fall out, and neither is the hypothesized one:

### 1. The literal "high AC + low HP" bimodal case does NOT reproduce.
Defender is the AC-heavy archetype (+2 AC, +10% HP). Its **no-resistance drift
is ~0** at every CR. High AC alone doesn't break the band, because the DMG
already expects AC to rise with CR and `ac-band` pins it to the curve. The
"each in-band but combination broken" hypothesis, applied to AC+HP, is false
in this engine.

### 2. The real compounding is HP × broad-resistance — and Task 5 already
mostly closed it.
The drift only reaches +3 when a high-hp_mult archetype spends its budget on a
**broad** package (the DMG's ~1.5–2× effective-HP multiplier for "resists most
damage"). The **only** cheap-and-broad package is Bludgeoning/Piercing/
Slashing — and **Task 5 now bans it for every non-swarm archetype**. Narrow
elemental resistances trigger only a ~1.1× multiplier (most damage isn't that
type), which doesn't push drift past +1. So post-Task-5:
- Non-swarm broad-resist compounding: **closed** (can't buy the package).
- Swarm compounding: exempt by design (swarms are meant to be tanky; their
  B/P/S is a required identity slot).

### 3. Residual real signal: the `brute` archetype runs +2 to +3 hot on its
own, independent of resistances — because `hp_mult 1.3 × damage_mult 1.15`
compounds both the defensive AND offensive CR. This is not a lint-combination
gap; it's archetype calibration. It mirrors the documented lurker case (which
runs −3 to −6 by the same logic, and is accepted as "fitted spec behavior").
By that standard brute-hot is the symmetric intended cost of the identity —
but +3 is large enough to note.

## Recommendation

- **No new combination-pricing lint.** The hypothesized AC+HP break doesn't
  reproduce, and the one combination that does (HP × broad resistance) is
  already neutralized by Task 5 for everyone who isn't a deliberately-tanky
  swarm. A product-pricing rule would be complexity chasing a closed hole.
- **Optionally revisit brute calibration.** If field review finds CR-N brutes
  playing like CR-N+3, the fix is tuning `brute.damage_mult` or `hp_mult` down
  in `archetype-chassis-spec.json` (one number), not a lint. Verify against
  official brute-like blocks (Bulette, Fire Giant) before changing — the DMG's
  own sluggers may sit hot too, in which case it's intended.
- **Document the independence** so a future session doesn't assume the three
  defense rules compose. Added to `docs/2024-architecture.md`.

## Blast radius / residual risk

No code changed. Residual: the effective-HP multipliers used here are DMG
rule-of-thumb, not measured against real party compositions; the "closed"
verdict for non-swarm broad resistance depends entirely on Task 5's ban
holding (if a future flavor review re-whitelists elemental-type creatures for
B/P/S, this hole partially reopens — see 05-bps-resistance.md residual risk).
