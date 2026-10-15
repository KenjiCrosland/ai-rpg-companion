# name_element — ranked-list item 1, landed

**The offender:** `SPECTRAL_COMPOUNDS`, the fastest-growing exception list in the
engine. Six patches, one per newly coined folklore compound, over a space a model
can coin from forever: `witch-fire, fox-fire, bale-fire, marsh-fire, ghost-fire,
cold-fire, wisp-fire, corpse-fire`.

## The measurement came first, and it reframed the fix

| name | does it claim an element? |
|---|---|
| Witchfire, Foxfire, Balefire, Soulfire, Moonfire, Hexfire, Spiritfire | **no claim** |
| Witch-**Fire**, Fox-**Fire**, Ghost-**Fire** | Fire |

A **closed** compound never claimed anything — the word boundary already blocks a
match inside it. **Every one of the six patches was adding a HYPHEN spelling**,
because a hyphen reads to a regex as a boundary where morphologically it is a
fusion. Three of the eight entries (`cold-?fire`, `wisp-?fire`, `corpse-?fire`)
could never have fired at all: "cold" and "wisp" and "corpse" are in no claim
list. Half the list was dead weight.

So the rule print actually follows is about **form**: an element word fused into
a compound makes no claim ("a kind of fire that is not fire"); one standing on
its own does ("Flame Lash" is a lash of flame).

## The split that follows from it

- **The engine checks the form.** `elementFused(name)` asks whether the matched
  element word is half of a word or a word of its own. A fact, no list.
- **The call judges the meaning.** Which fused compounds are folklore is a
  judgement, and the call coined the name *and* declared the damage type in the
  same breath — so `name_element` sits directly beside `damage_types` in the
  skeleton, asked only of names that contain an element word.
- **The receipt** (the lesson from the polarity measurement: the call is good at
  meaning and careless about scope): `imagery` is believed **only** on a fused
  element word. `nameClaimSatisfied('Flame Lash', ['Cold'], 'imagery')` is
  `false`. The gate is not dodgeable by labelling everything imagery.
- **The list speaks only where the call did not.** A name the call calls
  `literal` owes its element even if `SPECTRAL_COMPOUNDS` would have excused it —
  an inconsistency in my first cut that the pins caught.

## Live reads

**Run 1 (`branch-element`, 4 blocks) did not exercise the field** — 4/4 clean,
checker 0 FAIL, and **zero `name_element` traces**. My batch put the folklore
compound in the *creature* name; the gate runs on *row* renames. Worth recording
why the call avoids element words in row names: the existing gate already pushes
it away from unpaid claims, so the imagery case only arises when the GM's own
words force an element word onto a row.

**Run 2 (`branch-element2`, 2 blocks) exercised both directions.** Checker 0 FAIL.

```
name element declared: "Witch-Fire" is imagery — the call's own reading of the name it coined (Fire/Cold stands)
repair round 1: 1 defect(s) — "Witch-Fire" deals Fire but this creature's energy is Cold — use Cold or a physical type
name element declared: "Witch-Fire" is imagery — the call's own reading of the name it coined (Cold/Cold stands)
```
```
Witch-Fire. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Cold damage.
Flame Lash. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 11 (2d10) Fire damage.
```

- **The imagery case stands.** The call named a row "Witch-Fire", declared it
  imagery, and the name-claim gate let a Cold row keep a fire word — which is
  exactly what the old regex needed a hand-written entry to allow. A *different*
  gate (energy coherence) fired on the first answer because it dealt Fire where
  the creature's energy is Cold; the repair fixed it, and the second pass
  re-declared imagery on Cold/Cold. Correct, and unrelated to this field.
- **The bare word is still paid.** "Flame Lash" deals Fire. The call did not try
  to call it imagery, so the refusal path was never reached live — it is held by
  pins, not by a live read. Stated plainly rather than claimed.

## What is covered by pins vs seen live

| | pinned | seen live |
|---|---|---|
| closed compounds claim nothing | ✓ | ✓ (run 1 names) |
| a hyphen compound declared imagery stands | ✓ | ✓ |
| a compound the list has never seen (`Grave-Fire`) | ✓ | — |
| a bare element word is refused imagery | ✓ | — (the call never tried) |
| `literal` still owes its element | ✓ | — |
| no answer falls back to the list | ✓ | — |
| the answer is on the record once | ✓ | next batch |

## Also noticed in run 1 — two sightings, not fixes

1. `repair round 1: rename for "Melee Attack" copies the prompt's own example
   "Flame Whip"` — the call reached for a name the prompt itself supplied, and
   the repair caught it. That is `HINT_ECHO`, the 3-patch cue from the audit's
   same "exception list over a generative space" class. Second sighting.
2. `Glacier Slam` deals Bludgeoning with no complaint, because "glacier" is in no
   claim list. Correct today — and a reminder that `NAME_CLAIMS` is itself a
   *detector*, so the reasoning that condemned `NEG_CUE` applies to it too. Not
   touched without measuring first.

## Gate

`npx jest` 2686 passed / 67 suites. 9 pins for this field in
`reskin/__tests__/weapons.spec.js` (41 in the file). `npm run build` clean.
