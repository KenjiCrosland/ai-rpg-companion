# Case: stages 3 and 4 — two new call fields, three latent defects

Run: `smoke-out/stage34-2026-10-16T20-49-59` (10 blocks, 1 FAIL).
Review: `scripts/smoke-evidence/REVIEW-stage34-2026-10-16T20-49-59.md`.
Check: `scripts/smoke-evidence/CHECK-stage34-2026-10-16T20-49-59.md`.
Gates: 71 suites / 2797 passed; `npm run build` clean. 28 pins in
`reskin/__tests__/stage34-pins.spec.js`.

Both fields ride on calls we already make, so there is no new cost.

## What to look at first

**1. The implied class (stage 4 item 2) — the part I think is sound.**
The key table is a word list eight classes deep, and it missed every one of 12
hand-probed concepts, among them samurai, gladiator, kung fu master and pirate
captain, all of which train as one of the eight. The call now names the class
with a receipt and the engine keeps every veto. This run:

- `"rogue"` on *"a lizardfolk ninja who strikes from the reeds"*
- `"fighter"` on *"a samurai retainer sworn to a dead house"*
- `"fighter"` on *"a gladiator of the pit who plays to the crowd"*
- `"druid"` REFUSED — not one of the eight, and **not coerced to cleric**; the
  Standing Circle Druid ships Vine Staff / Verdant Wisp / Spellcasting and no kit rows
- the dire wolf took none (bestial refusal), and the tiefling rogue went through
  the TABLE — the call only ever speaks into a silence

Worth challenging: `soloLen: 5` lets a single five-letter word be the receipt,
because "ninja" and "ronin" are the real cases. Four would let a coincidental
"iron" justify a fighter. Is five the right line?

**2. The asked trigger/limit (stage 3 item 3) — the part I am least sure of.**
The call extracts the trigger, the limit and the shape the GM's own words name;
the engine reads the row that ANSWERED that clause (joined on `e.clause`) and
says whether they agree. It reports and never rewrites.

One finding has survived every run, in two instances of ONE shape — **the GM
names a trigger and the engine ships an untriggered row**:

| ask | row | verdict |
|---|---|---|
| *"slams the ground at the start of each of its turns"* | `Slam` | asked `start_of_turn`, row reads `at_will` |
| *"is never where you struck and steps away"* | `Misty Step` | asked `on_being_hit`, row reads `at_will` |

The second is the critic's own "never where you struck" case, found by a metric
this time instead of by a reader.

**This field cost four corrections to my own measurement before it read true**,
and the critic should weigh whether it earns its place:
- the row readers were wrong on real rows: "While Bloodied" demanded "is
  Bloodied", "hits with" demanded "hits a creature"
- the vocabulary had no per-day option, so a GM's "once per day" had nowhere
  correct to go and the call's forced answer was counted as its error
- the clause join took the first clause sharing any word, so the trigger for
  *"flies into a rage once per day when wounded"* landed on *"a berserker"*
- the call over-answers: *"mends her own wounds"* names no trigger and no limit
  and the call answered `on_hit` + `at_will`. An asked field now needs a
  supporting word in the GM's own clause or it is dropped (3 dropped this run)

Six real shipped rows are pinned as a calibration table.

## Three latent defects the new fields flushed out

None of these were caused by the fields; each was sitting in the engine and only
shipped once a door opened wider. This is the stage's main yield.

**The engine invented a weapon.** `templates.mjs` read
`ranged_name: ctx.rangedName ?? 'Longbow'`, so a ranged-host template on a sheet
with NO ranged attack rendered a bow the creature does not have — the Court
Step-Wizard's `Missed Step Riposte ... makes one Longbow attack` beside Slam and
Spellcasting. A template that cannot be filled now declines. Family: 6 of 186
saved runs, five shapes, including the Shadowblade "Poisoned Blade" bug chased
separately earlier this sprint.

**A row named for a weapon took another weapon's range.** The Pit Champion
shipped `Spear ... range 30/120 ft.` — a javelin's. `e.weapon` is fitted from the
row's numbers and outvoted the word a GM reads. The name wins now when it names a
real weapon; `weaponFor` returns null for invented names, so fitted weapons still
cover every row they were there for. Verified live: `Spear ... range 20/60 ft.`
with `weapon=scimitar` underneath.

**The dangling-reference scan lived in one reader only**, so the checker could
FAIL a sheet for citing a row that does not exist while generation built it
happily. It is one exported predicate now, called by both. Writing its pin found
that the scan over-captured: `uses Slam against the attacker` captured the whole
tail and read a legitimate row as dangling — harmless while only the checker
reported it, a silent false refusal once generation reads it. Bounded to a
title-case run. Old vs new, 12 runs / ~117 blocks: identical verdicts.

## Known and not fixed here

- `attack-stat` (the run's 1 FAIL): `Greataxe: +8 derives from DEX`. A class
  kit's weapon not matching the chassis stat. Pre-existing family, 12 of 188
  saved runs, 7 of them the same "Mace derives from DEX". Not from these fields —
  the berserker's class came from the table.
- the `lurker-5` donor is under print's CR 5 HP band in 4 of 4 runs (the owner's
  parked question 1).
- the generation-side dangling guard has pins on its predicate but has not fired
  on a live run: the condition has not recurred since the root cause was fixed.
