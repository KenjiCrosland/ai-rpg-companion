# Entry-name conventions from the corpus (statblock generator, skeleton path)

## Trigger

The next statblock-generator naming work — or the next live review where entry
names read as a hyphen chain (Brine-Wracked Fist / Salt-Crusted Noose /
Whale-Fall Reek on one sheet). Owner call 2026-08-16: "we should look at the
corpus for naming conventions. But they should be more straightforward than
using folk epithets for abilities. This may be a later todo as we still have a
few big refactors." Deliberately parked behind the writer-call promotion
(component 4) and call-A slimming.

## Problem

DeepSeek names ENTRIES (actions/traits/bonus actions) as hyphenated two-part
compounds at a rate print never approaches. Measured 2026-08-16 on all 329
printed blocks:

- **402 unique printed entry names; 3 contain a hyphen (0.7%)** —
  Shape-Shift, Mind-Rending Roar, World-Shaking Movement.
- Word-count distribution: **130 one-word (32%), 259 two-word (64%)**,
  10 three-word, 3 longer. Print entry names are one or two plain words:
  Rend, Slam, Pounce, Whirlwind; Fire Breath, Deadly Leap, Frightful
  Presence.

Live blocks routinely ship 50-80% hyphenated entries (the Tidewrack Keeper:
6 of 10). The PROPER-name registers (kenning/coinage/folk in
`skeleton/name-registers.mjs`) are working and are NOT the model for entries —
the owner explicitly wants entry naming *more straightforward*: no epithets,
no registers, print's own plain shape.

## What already exists (don't rebuild)

- Flavor prompt already carries (added 2026-08-16, effect unproven at parking
  time): "entry names never hyphenate: print writes compound entry names as
  separate plain words or one word — a sheet of hyphenated compounds reads as
  one writer's tic." Watch whether it moves the rate at all.
- One authored folk EXAMPLE ("the Rattle-Wife") was de-hyphenated after two
  hyphen-heavy blocks both rolled the folk convention — examples teach more
  than instructions.
- The harmonizer strip now consumes adjacent hyphens (the "-Breath" orphan
  class).
- `namingRules` in `concept-seeds.mjs` bans hyphens in the PROPER name only.

## Recommended approach (in order of increasing force; measure between steps)

1. **Calibration by rotated printed examples**: sample 6-8 real printed entry
   names (from the 402, weighted 1-2 words) into the flavor prompt's naming
   paragraph per generation, seeded like the register briefs. Positive
   steering, zero ban list — the same mechanism that fixed proper names.
2. **Deterministic normalization pass** (corrections registry): hyphen →
   space in entry names ("Tide-Reader" → "Tide Reader"), reference
   propagation included. Low-risk, print-shaped (three-word results are
   printed, if rare). Consider only if (1) doesn't move the rate — a
   normalizer ships the model's tic in a trench coat, and 3+-word names are
   only 3% of print.
3. **Audit clause**: entry-name style judgment (hyphens, word count > 2) as a
   low-confidence audit principle with the rename actuator. The audit already
   owns adjective/name-promise judgment; this is the same shelf.

Anti-goal: do NOT route entry names through the proper-name registers, and do
NOT build a per-entry convention roll — print has ONE entry-name convention
and it is "one or two plain words."

## Ledger observations parked with this plan (verify before acting)

- Undertow Gaze shipped "13 (3d8) Acid damage plus 7 (2d6) Acid damage" —
  a same-type rider reading as one damage line split in two (print's
  base+rider is always two TYPES). Small corrections-pass candidate: merge
  same-type base+rider dice.
- "Difficult Terrain composed of bladderwrack" shipped — the habitat vet
  keeps only six real terrains; verify whether the vet missed it or the
  model renamed post-vet.
- INT 18 with "Understands Deep Speech but can't speak" — a mute alien
  genius is legal-ish but odd; check print for sapient understand-only lines
  before ruling.
