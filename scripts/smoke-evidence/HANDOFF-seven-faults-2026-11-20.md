# The seven faults, the lint, and the forty re-recorded

Branch `statblock-enhancments-part-2`. Nine commits: `7b8e9cc` fault 1, `fc379f4` fault 2,
`294e257` fault 3, `78f4829` fault 4, `6b1925c` fault 5, `15e001d` fault 6, `cb3ece0` the lint,
`7642aa7` faults 1 and 5 finished.

Blocks: `BLOCKS-the-forty-after-2026-11-20.md` — all forty, the 17 that changed and the 21 that
did not. `BLOCKS-the-forty-2026-11-20.md` stays as the before, as you named it.

## 1. The suite

`npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent`, read from its own exit
code. **exit 0 — 266 suites, 5780 passed, 26 skipped, 5806 total.** 44 tests added this round.

**No worker crashed at `--maxWorkers=2` this time.** Last round one took a SIGSEGV twice and hung
the run; it did not recur across four full runs today.

## 2. Each fault

### Fault 1 — a strike is not an extra attack. Three causes, not one.

The refusal you quoted is the least of it. A strike that lands is pushed into `sections` as it
lands, so when `uniqueRowName` runs the row is already on the sheet and the taken-names set holds
its own — every one of the five collided with itself, which is why the trace read as nonsense.
That is fixed, and it was never what lost the rows.

**Why two survived, which is the question that found the real cause: s35 and s36 are not print
bodies.** The three that were lost are all print heads, and the "one print melee row" pass splices
out a second melee attack row. A strike reads as one. It is not one — it is never named among the
attacks Multiattack lists and is offered in place of one, so it takes no extra swing.

**And a third remover, which only the replay found.** With both of those fixed, s01's "Flank the
Herd (Recharge 5-6)" is written, lands, is not refused — and is then taken by the provenance sweep
that drops a chassis row print has no slot for. Gated by fault 2's Recharge, it reads as the
chassis's own nova. The row carries `authored`, which that sweep already skips, so a pass between
the landing and the sweep drops the flag; `strike` is the row's own declaration and is checked on
its own now rather than trusting a flag that does not survive the trip.

### Fault 2 — one way to read a citation. Done.

`citationsIn` reads all three forms — plain, "X or Y", and the lettered list — and lives in
`templates.mjs` where the sync and the lint can both see it without a cycle. Over print: of the
citations that resolve to a row, every one already reads as this pass would leave it.

### Fault 3 — a row that needs a hit is not a trait. Done, and it declines rather than welds.

`contagion` declares `trigger: 'on_hit'`. All thirteen such templates also declare
`section: 'rider'`, so `templatesFor` already excluded them — and contagion arrived by the
DECLARED-MECHANIC lead, which injects by id past that filter. Both are gated now; the landing is
the one place every route passes through.

It declines. Welding needs a host attack, and choosing which attack a trait would ride is a
decision the engine does not get to make.

### Fault 4 — Deafened out, and the idea names its condition. Done. One cost, as you asked.

**The Hydra's Stump Vapor does not land.** Its idea said "streams stinging vapor" and "the thicker
the choking haze becomes" and named no condition. You expected it to keep landing. Adding
"choking" to the condition words is the one thing I am not allowed to do, so it is a question for
you and not a quiet change.

**The gate is visible working on s26's new roll.** Its idea says "must succeed on a Constitution
saving throw or be Poisoned", and the menu offered exactly one candidate,
`composed:zone:condition:poisoned`, where before it offered all four and the Dire Wolf took
Deafened off the end.

Scoped to the zone family, which is what was ordered and where it was measured. `body-reaction`
composes a condition too and could drift the same way; unmeasured, and raised here rather than
widened.

### Fault 5 — a strike adds something. The fix was in the wrong place and the replay said so.

The predicate is right and shared with the lint. But the refusal sits in the authoring block,
which runs AFTER the strike lands — so it never saw a strike, and Wellwater Drag shipped again
with the fix in place and inert. It is checked at the landing now; a redundant strike is not
landed and the seat falls through to that block, which refuses it and asks again.

### Fault 6 — print's name comes off print's nova. Done, and the count you asked for.

Measured over srd52-monsters.json: 67 printed rows are gated + a save + damage dice, and 63 are
Actions. The four that are not are exactly the wrong ones — three Bonus Action rows and the Stone
Giant's Deflect Missile, a Reaction. **The section is the whole discriminator.** Requiring an area
as the handoff worded it would also drop 2 legitimate single-target print novas.

**On the forty: exactly one rename took its name from a printed row that is not a nova — s32's,
and it was the only `print canon nova` rename on the forty at all.** s32 now carries print's own
Deflect Missile as a Reaction, which is correct, and no cone wearing that name.

### Fault 7 and the eighth — counted, not fixed.

`stock-template-name` and `two-recharge-rows` are in the lint and in the table below.

## 3. The Hydra and the Plague-Archon

**The Hydra.** Stump Vapor is gone, as fault 4's gate requires. It did not lose the stumps: it now
ships `Searing Stumps` (a trait keyed on losing a neck) and `Choking Reek (Recharge 5-6)`.

**The Plague-Archon.** Its cloud is gone, and **not because of fault 4** — the new roll's trait
seat chose the `heal` family and never reached a zone at all ("composed candidates: none trait —
the heal family has no grammar"). Its idea would have passed the gate. This is the re-record
rerolling, and it is the clearest loss on the sheet: the archon now has Pack Tactics and a
Bolstering Presence and nothing of the plague.

## 4. The lint — three columns

| rule | 18 Nov (38 sheets) | 20 Nov as recorded | after the fixes |
|---|---|---|---|
| uncited-replacement-row | 0 | 0 | 0 |
| ungated-turn-denial | 0 | 0 | 0 |
| citation-gate-mismatch | 0 | **1** — s20 | **0** |
| deafened-alone | 0 | **1** — s01 | **0** |
| rider-without-an-attack | 0 | **1** — s26 | **0** |
| strike-adds-nothing | 0 | **2** — s35, s36 | **0** |
| stock-template-name | 1 — s35 | **2** — s18, s24 | 1 — s12 |
| two-recharge-rows | 0 | **1** — s31 | 0 |

**Column 2 names exactly the eight sheets you found by reading, each under its own rule, with
nothing else.** It took two corrections to get there and the run said so both times:
`rider-without-an-attack` fired on 6 sheets until it read a rider's OPENING rather than "the
target" anywhere, and `two-recharge-rows` read 16 of 40 until it stopped counting a 3/Day trait as
a Recharge and stopped counting a dual-shape sheet's rows twice.

**The run over print: all eight silent on all 329 blocks.** One correction, and print was right —
`deafened-alone` fired on the Swarm of Ravens' Cacophony, whose Deafened carries "While Deafened,
the target also has Disadvantage on ability checks and attack rolls". That is print making the
condition matter, which is exactly what the Dire Wolf's bare aura does not do. The rule reads for
that consequence now and the true positive did not move.

**One thing seen and not touched:** the older `at-will-inline` rule fires on 7 printed blocks (the
four ancient dragons, the Cultist Fanatic, the Green Hag, the Mummy Lord). Not this instrument's,
not this round's order.

## 5. The replay and the re-record

| | |
|---|---|
| strict replay before re-recording | 11 missed on the PROMPT, 8 more differed in OUTPUT |
| re-recorded | **19 of 40**, each verified input-for-input against the baseline before placing |
| strict replay after | **38 of 40 reproduce** |
| the two that miss | s22 (route call) and s36 (seed call), as before — s36 did NOT become replayable |

The 11 prompt misses: s01, s05, s07, s12, s14, s17, s34 at the fit call (the menu changed), s26
and s32 at the audit call (the sheet changed), s22 and s36 as always. The 8 output differences:
s11, s16, s18, s20, s24, s31, s35, s38 — the fixes landing, plus the new lint's findings being
stored on the sheet.

## 6. Sheets that differ from BLOCKS-the-forty-2026-11-20.md — counted from a diff of the two files

**17 of 38 comparable sheets differ; 21 are identical.** (s22 and s36 are not comparable.)

Differ: s01 s05 s07 s11 s12 s14 s16 s17 s18 s20 s24 s26 s31 s32 s34 s35 s38
Identical: s02 s03 s04 s06 s08 s09 s10 s13 s15 s19 s21 s23 s25 s27 s28 s29 s30 s33 s37 s39 s40

**Eight carry a different creature name**, because the identity call runs live and a re-record
rerolls it: s12 Plague-Archon → Plague Archon, s14 Glacier Heart → Heart of the Glacier, s18 →
Bone-Sun Archlich, s20 Trench Hymn Leviathan → Trench Siren, s24 Merebone Harvester → Titan-Hollow
Scythe, s26 Fenwrack Crone → Mire Huldra, s31 Thundercloud Drake → Thunderhead Whelp, s32 Gorrak
Stonewold → Grumalk the Exile, s35 Thing in the Well → Well Drowned, s38 → Oathsworn Gravebound.
The inputs are unchanged.

## 7. What a fix made worse, and what I could not verify

**Seats refused twice went 6 → 9.** It rose. Some of that is the new refusals doing their job, and
I cannot attribute it cleanly, because the re-record rerolled every idea.

**s12 lost its plague cloud entirely** (section 3). The clearest regression on the forty, and it is
the reroll rather than a fix.

**ITEM 2 OF YOUR REPORT CANNOT BE ANSWERED FROM THIS FORTY, and I am not going to substitute the
new rows as if it could.** You asked, for s01, s11 and s38, whether the strike is on the sheet now
and what it does; and for s35 and s36, what the second ask wrote once the redundant strike was
refused. The re-record rerolled every idea, so Flank the Herd, Crimson Bramble Stalk,
Leg-Cutting Sweep and Wellwater Drag **do not exist on the new forty** — those seats wrote
different rows entirely. And the tapes holding the answers that wrote them were overwritten by the
re-record, so the one replay that could prove faults 1 and 5 cannot be run again.

What I did see, on the replay before the re-record: the collision refusal is gone, the strike is
written and lands, and a third pass removes it — which is the fix in `7642aa7`, landed after that
replay and therefore **unproven on a sheet**. Faults 1 and 5 need the next round's probe, on a
recording kept for the purpose.

**The forty now holds 1 strike, 0 riders, 0 auras.** The rider and the aura remain unproven across
three recordings.

## 8. Your marking

s03 belongs in **"what the GM typed is absent and a generic row stands in"** — Spider Climb
answers "has learned to climb" and then nothing uses it, and Cliffside Drop is a generic
bonus-action knockdown under a name about height. It is the same shape as s08 and s31.
