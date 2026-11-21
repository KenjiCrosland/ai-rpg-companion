# The soundness round, completed

Branch `statblock-enhancments-part-2`. Commits this round: `186cdf8` item 1, `fabcfac` item 2,
`740059e` item 3, `d456be0` items 4 and 5, `78a71ce` the curse keys, `b9e1145` the stopped report,
`b9e6378` the gate moved and the parts reader, `f3dafd8` the gate's crash, `0fdd2bc` the three
re-records, `b29b3d6` the stored sheets, `1d3047d` the ship check, and this one.

Blocks: `BLOCKS-the-forty-after-soundness-2026-11-21.md`, all forty, replacing
`BLOCKS-soundness-2026-11-21.md`, which held eight sheets that were not sheets.

## 1. s01, s06, s11 — the three the owner reads again

**s01, the Dire Wolf.** Frozen Shape is declined by item 5, and **Herding Snap keeps its place**:
there is nothing passive left to spend the budget, so the action survives.

| before | after |
|---|---|
| Frozen Shape · Pack Tactics · Bite | Pack Tactics · Bite · **Herding Snap (Recharge 5-6)** |

> **Herding Snap (Recharge 5-6).** *Wisdom Saving Throw*: DC 13, one creature within 5 feet.
> *Failure:* The target has the Frightened condition until the end of its next turn.

**s06, the Spoilheap Lurker.** Re-recorded from the seat call. The strike is no longer dropped by
the floor, so no library seed is drawn — and the seat, asked live, wrote a SAVE rather than a
strike. The Lurker ends with one row where it had two, as you expected.

| before | after |
|---|---|
| Multiattack · Rubble Lash · Scree Buckle · Screeburst Emergence (Recharge 5-6) · Entomb · Loose Scree | Multiattack · Rubble Lash · **Scree Snare** · Entomb |

> **Scree Snare.** *Strength Saving Throw*: DC 14, each creature in a 30-foot Cone. *Failure:* The
> target has the Prone condition.

The Multiattack offers it: "It can replace one attack with a use of Scree Snare."

**s11, the Vampire. Item 4 doing exactly what it was for.** Briar Blood was a trait that Poisoned
anyone who hit the vampire, with no save. Refused, asked again, and the second answer is the form
the owner named:

> **Briar Blood.** *Trigger:* The vampire takes damage from a melee weapon. *Response—Constitution
> Saving Throw:* DC 17, the triggering creature. *Failure:* The target has the Poisoned condition…

It moved from Traits to Reactions and gained the Constitution save. "no save is bad. needs a con
save."

## 2. The stored field on the fourteen — it is one field, on twenty-two sheets

Every one of them is `ideaEffect`, the idea's declared effect that item 3 stamps on the landed row
so the pricing pass can ask whether an idea about damage landed on a row with none. Nothing a GM
sees, one row per sheet.

s02 s03 s04 s05 s07 s08 s09 s10 s13 s14 s16 s18 s20 s25 s28 s29 s30 s32 s37 s40, and s17 and s26,
which the first pass could not compare because the curse gate was crashing them.

Stored sheets updated, **no call re-recorded**, every call count asserted unchanged before writing.

## 3. The three smaller things

**The two untested arms are gone.** A sheet with no Multiattack and a host that is not on the sheet
are both settled at the seat, and I could not build a path that reaches either with a strike
already landed. Removed rather than left claiming to guard something. The arm rule 7 orders — a
strike whose save hands out what its finished host applies — stays.

**Item 3's count of six does NOT stand, and Frozen Shape never dealt damage.** My reader took a
400-character window after a row's name and spilled into the next row. Read from each row's own
text: **5 of 24** rows carrying a stamp do not do what the idea said —

| sheet | row | stamped | does |
|---|---|---|---|
| s03 | Cliffside Drop | movement | damage, condition |
| s14 | Splintering Slick | movement | damage, condition |
| s17 | Abyssal Ash Brand | condition | damage |
| s26 | Fen Curse | condition | damage |
| s28 | Shadow Step (2/Day) | movement | nothing |

And a limit worth knowing: `ideaEffect` is stamped only on the ACTION seat's landed row, so trait
seats are not in that count at all. Measuring them the same way needs the same stamp.

**`traitWritesARider` writes nothing — I misread it and you repeated my misreading.** It is a
REFUSAL predicate: it catches an idea re-seated to the rider path whose author wrote the condition
as a trait anyway, and refuses it. On the forty it fired **0** times, and there are **0** rider
welds. So there are no rows from that path, and neither of the two unbounded rows comes from it.

The two unbounded save-on-hit rows are **s17 Bite** and **s33 Unarmed Strike**, both print's own.

## 4. Every sheet that differs from BLOCKS-the-forty-2026-11-21.md

**Three: s01, s06, s11**, from a shape-aware diff of the finished rows. The other 37 are identical.

Two false readings on the way there, both caught before they reached you: a markdown parser that
matched the wrong heading level and called s01 identical, and a row reader that only knew the 2024
shape and so saw s06 and s11 — both 2014 sheets — as empty.

## 5. The lint, eight rules, read off real sheets

| rule | 20 Nov as recorded | after |
|---|---|---|
| uncited-replacement-row | 0 | 0 |
| ungated-turn-denial | 0 | 0 |
| citation-gate-mismatch | 1 — s20 | 0 |
| deafened-alone | 1 — s01 | 0 |
| rider-without-an-attack | 1 — s26 | 0 |
| strike-adds-nothing | 2 — s35, s36 | 0 |
| stock-template-name | 2 — s18, s24 | 1 — s12 |
| two-recharge-rows | 1 — s31 | 0 |

`stock-template-name` is **1**, not the 6 my last report gave. You were right: that 6 was read off
a replay whose fit call had no answer, and a count read off a non-sheet is not a finding.

## 6. Anything a fix made worse

**I shipped a crash.** The curse gate at the landing read `idea?.clause` where the scope has
`ideasT`, and it threw `idea is not defined` on exactly the two sheets of the forty where
curse-debt lands — s17 and s26. The suite was green: the gate's six tests all read the predicate
and none drove the landing. Fixed, and three pipeline tests now drive it, the first verified red
with the out-of-scope variable put back. It is the same shape as the two faults this round was
convened to fix, which is the lesson.

**Seats refused twice: 9, unchanged.**

## 7. The suite and the replay

**exit 0 — 270 suites, 5819 passed, 26 skipped, 5845 total**, read single-worker. The
`--maxWorkers=2` hang recurred (exit 142); it is the third time and it is worth someone looking at.

**Replay: 38 of 40.** s22 (route call) and s36 (seed call) miss on the prompt.

**s22 is intermittent, which is new.** It reproduced on one replay and missed on the next two with
no code change between them. "The two that never replay" is really "s36, and s22 sometimes".

## 8. s24

Not changed. `scythes?` and `sickles?` are in PART_NOUN as the owner ruled, and checked first
against the forty's typed text: **one sheet contains either word, s24**, so nothing else could
move. But the noun is only half of it — a part with no damage type never ships, and the type comes
from the weapon table: `sickle` is an SRD weapon and has one, `scythe` is not and has none. So the
scythe is recognised and still does not become a part.

The type table is a different list and the exception was for PART_NOUN, so this is reported and not
fixed. **s24 is unchanged and the GM's four scythe-arms are still unanswered.**
