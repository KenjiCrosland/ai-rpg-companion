# The canaries, recomposed — and the baseline

**Owner, 2026-10-15:** "I feel like we need different canaries. We're doing too
much direct print testing, that's hardly the full feature set."

## The measurement that confirmed it

Trace audit of the old ten:

| path | blocks |
|---|---|
| print-canon, "is a print creature" (seats stand down, print composes) | Owlbear, Wolf, Stone Golem, Vampire Spawn |
| print-canon, "heads on" (print's rows ride along) | Kobold, Goblin Boss, Troll, Ogre |
| not print at all | Headless Horseman, Well Shade |

**Eight of ten went through print-canon** — the most stable path in the engine.
Never touched: the species kit, the class kit, all three bodies, casters and
spellcasting, the legendary tier (the set topped out at CR 10), lacks clauses,
thrown/hybrid weapon rows, and rich multi-clause authoring (one named part across
ten sheets).

That is why today's six landings were measured by ad-hoc batches instead, and why
the rider fold moved **zero** canary reads — none of them reach it.

## The new set: 14, one axis each

print drops from 8 blocks to 3 (plain, head-on, mounted-2014) — enough to protect
a load-bearing path without being the floor. The old set is kept at
`canaries-print-era.json`.

Added, each previously uncovered: species kit, class kit + a lacks clause, caster,
dragon body + legendary tier, ooze body, swarm body, the weapon table + a hybrid
row, polarity, and 2014 at CR 17 with legendary actions and a leader seat.

Deliberate: several blocks pair two axes that co-occur in real GM input (class +
lacks, dragon + legendary, 2014 + legendary + leader) — a failure is slightly
ambiguous, but 11 axes fit in 14 blocks. Stone Golem (construct immunities),
Troll (regeneration) and Headless Horseman (invented donor, no printed peer) moved
out to the forty, where close-out breadth belongs.

## Baseline: 2 FAIL, 5 SOFT of 14

| block | axis | verdict |
|---|---|---|
| Owlbear | print, plain | clean |
| Sheepthief | print head + named weapon | clean |
| Kobold | the dice-solver floor | clean |
| Rookery Mimic | **species kit** | clean (concept 2/6) |
| Iron Vigil | **class kit + lacks** | clean (concept 1/2) |
| Chancellor Unplaced | **caster** | clean |
| Thrumvane Stormwyrm | **dragon + legendary** | SOFT hot-offense (+6) |
| Tithevault Sump | **ooze body** | SOFT print-rows |
| Grave Toll | **swarm body** | **FAIL inline-correctness**, SOFT swarm-multiattack |
| Marshal Vorgan | **weapon table** | clean |
| Scentmarrow Stalker | **polarity** | **FAIL under, FAIL alignment-fit** |
| Goblin Boss | 2014 + mounted | SOFT reach |
| Pyre Knight Bel'Vorak | **2014 + legendary + leader** | clean (concept 1/8) |
| Drowned Well Child | never-fail | clean |

**Both FAILs are on new axes.** The set found them on its first run.

### The standout: the polarity canary

```
Scentmarrow Stalker — Medium Monstrosity, Unaligned
HP 65 (10d8 + 20)    Senses blindsight 60 ft. (blind beyond this radius)
Languages None       INT 12
```

Three distinct defects on one sheet:

1. **HP 65 against the CR 5 card's 90 — 28% under, and below print's own CR 5
   floor (75–228, n=52).** The donor is `lurker-5`. This is the **second
   sighting** of the lurker line shipping under print's HP floor: `high-cr` had
   `lurker-17` at CR 19 with HP 263 against print's 287–337. Deterministic,
   donor-data, nothing to do with the call.
2. **`alignment-fit`: Unaligned on a Monstrosity with INT 12 that speaks None.**
   The concept resolved `mind=bestial` — reasonable for a scent-tracking eyeless
   hunter — which set Unaligned and no languages, while the donor array kept
   INT 12. Nothing reconciles the mind read with the array.
3. **concept share 0/4.** The eyeless lack landed correctly on the senses line
   (blindsight), but the scent-tracking the GM asked for produced no row. The
   same concept DID ship `Bloodscent Pursuit` in `branch-polarity`, so this is
   variance, not a hard gap.

### Recurring, now with a second or fourth sighting

- `inline-correctness` — **4th today** ("the swarm", "the herd reaver", and the
  "of the …" tail case). This is the `names:` metadata question.
- `swarm-multiattack` — print swarms make one attack; 2nd sighting.
- ooze `print-rows: Traits/Spider Climb` outside print — 2nd sighting.
- dragon `hot-offense` +6 — the legendary budget's residual, down from +8.

### Concept share is visible across the new axes

Rookery Mimic 2/6, Pyre Knight 1/8, Iron Vigil 1/2, Scentmarrow 0/4. The old
print-heavy set hid this: a print creature's rows are print's by definition, so
concept share reads high for free. The new set shows the metric where it actually
matters.

## What this changes about the instrument

The floor now fails when the features we change break, instead of passing because
print-canon is stable. Two FAILs and five SOFTs on run one is the right starting
state for a regression gate — a floor that reads all-green on first use is not
measuring anything.
