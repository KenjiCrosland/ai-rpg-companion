# The owed clause: honour the call's own verdict

**Trigger:** touching the repair call, `owedUnanswered`, `claimedBy`, or the
checker's `owed-clause` gate. Also read before "fixing" coverage by widening a
word matcher.

## What was wrong

Rule 1e says that on a closed path (twist, class_npc) every clause the GM added
beyond print is owed a row — a print body plus an unanswered clause ships as the
stock monster. The forty failed two blocks on it, and NEITHER was a dropped
clause:

**Vashka the Red — "never breaks ranks".** The repair call answered
`unplaced: ["description:never breaks ranks"]`: having read the finished sheet,
it judged the clause flavour rather than rules. The engine discarded that verdict
and failed the block. Worse, `landAuthored` only runs when the answer contains
ROWS, so the prose never reached the description either — the sheet lost the
clause AND took a FAIL for losing it.

**Purple Worm — "swallowed a war-band's armoury".** A real miss, and not this
bug: the engine formed a correct idea and hit `[gap]` with no template for it.
That is the composition work (P1 in the backlog), and it should keep failing
until that exists.

## The one measurement that mattered

My first fix was built on an assumption about why the repair returned nothing,
and it did not work. Adding ONE trace of the call's actual answer —

```
repair answer: attacks 0, saves 0, traits 0, reactions 0,
               answered [], unplaced ["description:never breaks ranks"]
```

— showed the call had been answering all along. Keep that trace
(`trace('repair answer:', ...)`). Without it the failure is invisible, because a
call that writes no rows and a call that judges a clause unroweable look
identical from the outside.

## What the engine now does

Two ways the call can say "this needs no new row", both honoured and both
recorded:

1. **`answered: [{clause, row}]`** — the sheet already carries the mechanic in
   different words. The engine validates the row exists, binds the clause to it
   (`row.clause`, `row.answersAlso`) and records
   `generation.answered_by_existing`.
   Live: Screewhelm's "buries what it catches" credited to `Entomb`
   ("entombs one Medium or smaller creature it is grappling") — no shared stem,
   so the matcher could never have seen it. Vault Maw's "carving with the others"
   credited to `Multiattack` ("makes two attacks… can replace one with Harvest
   Drag"), which is defensible but is the shape to watch.
2. **`unplaced: [{clause, where: description|languages}]`** — it is not a row at
   all. The clause counts as answered, the words reach the description via
   `repairProse`, and `generation.answered_in_prose` records it.

## Why not just widen the matcher

Coverage is decided by `claimedBy`, a 4-character stem overlap. "breaks"/"ranks"
share no stem with "unbroken"/"yield"; "buries"/"catches" share none with
"entombs"/"grappling". Widening it is the keyword rule the CLAUDE.md ruling
forbids, and it would still miss the next synonym. The repair call already holds
the clause AND the whole finished sheet, so it is the reader with the context —
the engine's job is to validate the row it names really exists.

Note the call hierarchy this settles: the clause reader called "never breaks
ranks" MECHANICAL and the repair call called it DESCRIPTION. The later call, with
the finished sheet in front of it, wins.

## Watch item

Nothing reads `answered_in_prose` or `answered_by_existing` yet. A soft checker
report is P3 in the backlog — without it, a call that learns to dodge rules work
into prose weakens 1e silently.
