# Release table for the critic — 2026-10-29

One run: a forty, taken as the regression gate at the close of the augmentation
and trait-shape work. Forty concepts spanning every path the generator has —
print-exact, twist, class NPC, homebrew, and one blank with no input at all —
across CR 1 to 24 and both rules editions.

## What landed since the last package

1. **A closed set of augmentations.** Five trait templates may now carry one of
   four extra clauses — a squeeze allowance, a space-hold, sight in its own
   medium, and a terrain boon — each cited to a print row, each written by the
   template itself rather than by prose assembly. The model picks the kind by
   name from a menu the template advertises; anything off the menu is refused.
2. **Two new trait shapes.** `pack-tactics` (print's Hobgoblin Warrior) and
   `death-restoration` ("reforms after death", which covered 21 of print's 32
   death-triggered traits and was the only real gap in a sweep of print's 324
   traits).
3. **Mimicry takes a slot.** Its frame is now "The creature can mimic
   {mimicked}", so a concept's own words can reach it.
4. **A row now records what it wrote.** The clause a row answers, the condition
   it imposes, what it requires, and when it ends are all stamped on the row by
   the writer instead of being read back out of the text later.
5. **A 2014 conversion fix.** Converting a 2024 row that imposes a condition
   into a 2014 saving throw was dropping any text that followed the condition.

## The gate — four FAIL rows of forty, one of them ours to discount

| block | gate | our read |
|---|---|---|
| Adult Red Dragon | `two-novas` | real. "Threshold Execute" and "Fire Breath" on one sheet. |
| Black Iron Vigil | `name-mechanic` | real. "Warded Charge" names a movement its text does not have. |
| Reliquary-Glut | `escape-dc` ×2 | real but invisible: escape DC 15 written where 16 derives, on Adhesive and Hooked Lash. |
| Granite Exile | `lack-honored` | **false positive.** The GM asked for "understands no Common"; the sheet's Languages line reads `Giant`, with no Common. The predicate wants an absence to be positively expressed somewhere on the sheet, and a header cannot prove a negative by containing a row. Hand-derive the rest of that row, not this cell. |

Standing rate across forties is 1–3 FAIL, so three real failures is inside the
band and none of them is new.

## Our own read of the forty: 22 ship / 15 fix-lite / 3 fix

The previous forty read 20 / 17 / 3. Three blocks we would call standouts, all
because the GM's own words reached a mechanic:

- **Vampire**, asked "who keeps a garden of thorns" — *Sure Footing. Difficult
  Terrain composed of its garden of thorns doesn't cost the vampire extra
  movement.*
- **Vesp Lord**, asked "commands lesser swarms" — an invented reaction,
  *Sovereign of the Swarm*, keyed on creatures with the Swarm tag within 60 feet.
- **Bogwitch Molra**, asked "curses trespassers" — an invented action,
  *Trespasser's Bane*.

The three we would send back:

- **Adult Red Dragon** — the two novas above.
- **Black Iron Vigil** — the name above.
- **Ashen Trophykeeper** — the blank path, no input at all. It minted three
  melee rows named *Claw*, *Fang*, and *Claws*, and the third deals **Psychic
  damage off a claw**. Two complaints in one sheet: a near-duplicate name pair,
  and a flesh limb dealing energy, which the generator's own instructions forbid
  (melee deals the limb's physical type unless the body itself is energy) and
  which nothing currently checks.

## The one pattern we want judged

**The blind fill.** Four of the fifteen fix-lite blocks are a parameterised
trait whose slot had the GM's phrase available and filled it generically
anyway:

- **Air Elemental**, asked "that carries stolen voices" — the first Mimicry
  draw since the slot was added, and it wrote *"can mimic animal sounds and
  humanoid voices"*.
- **Bog Hound** ("a mud-caked bog hound that drags fishermen under") and
  **Well-Drowned** ("the thing in the well") both got *"indistinguishable from
  an ordinary object"*.
- **False Form** on the Well-Drowned is a hardcoded row with no slot at all,
  unlike its sibling False Appearance, whose slot fills from the concept 72% of
  the time.

Our question for the critic: is the right move to widen the slots (more rows
parameterised), or to tighten the fill (a slot that cannot be filled from the
concept refuses rather than defaults)? The second costs rows; the first costs
nothing but may raise the rate of slots filled with something merely adjacent.

## Two things we could not measure, offered as open, not as findings

1. **An unmotivated element.** The concept call answers one `energy` field, and
   the engine writes it on the melee rider *and* the resistance line, so one
   wrong word appears twice — a knife ball came back resisting Fire and dealing
   it. There is exactly one guard against this and it covers Humanoids only.
   We tried three times to put a rate on it and discarded all three: the first
   two used our own cognate word-lists to judge whether a concept warrants an
   element (which is the thing this project does not do), and the third
   collapsed when the commonest "flesh limb dealing energy" offenders turned
   out to be print's own rows — Devilish Claw, Fiery Mace, Withering Touch,
   Paralyzing Touch. We have no rate we trust. Judge the two sheets in this run
   that show it (Ashen Trophykeeper's Psychic claw; Pit Fiend's added Searing
   Aura on a concept about oaths) and tell us whether it reads as a defect.
2. **Rampage above CR 1.** We draw it to CR 12. Print prints it twice, both at
   CR 1 or below, and both as `Rampage (1/Day)` — so the cap is print's, not
   ours. Whether a 1/Day bonus action still earns its line at CR 5–12 is a
   calibration question print gives no answer to.

## What not to spend time on

- Row counts. We are above print's rows at every CR band and the owner has
  ruled that longer is wanted; sameness, not length, is the complaint.
- The escape-DC off-by-one. It is a lint, already queued.
- Whether a mechanic may exist. Print rules calibration — saves, sizes, damage,
  ranges — and never existence. If a concept needs a row print does not have,
  the generator is expected to invent one that fits.
