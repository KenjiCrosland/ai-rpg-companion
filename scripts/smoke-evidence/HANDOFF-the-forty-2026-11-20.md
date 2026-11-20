# The forty, re-recorded

Branch `statblock-enhancments-part-2`. Six commits this round: `572ae58` A, `cfc5ee9` B,
`446fe6a` C, `4cedbaa` D1, `94fed9a` D2, `7ae81ee` D3, `f4c8bb2` the lint.

Blocks: `BLOCKS-the-forty-2026-11-20.md` (all forty) and `BLOCKS-widened-check-2026-11-20.md`
(the six). New baseline: `baseline-2026-11-20`. `baseline-2026-11-18` untouched. No deletion.

## 1. The suite

**exit 0 — 260 suites, 5738 passed, 26 skipped, 5764 total.** 19 tests added across the round.

Read single-worker. At `--maxWorkers=2` a jest worker took a SIGSEGV twice and hung the run past
20 minutes; the suite it killed, `r9-release-pass.spec.js`, passes alone in under a second. Not
caused by this round's changes, but the committed numbers come from `--maxWorkers=1` and I would
read it that way from here.

## 2. The widened check

| sheet | the Multiattack line | lint |
|---|---|---|
| s31 roll 1 | `The drake makes two Horn attacks.` (no strike landed) | 0 |
| s31 roll 2 | `…two Horn attacks. It can replace one attack with a use of Brand-Wake Discharge if available.` | 0 |
| s31 roll 3 | `…two Horn attacks. It can replace one attack with a use of Charged Wake if available.` | 0 |
| s26 | `Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Whisper Hex.` | 0 |
| s20 | `The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineburst Pulse.` | 0 |
| s17 | `The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oath Demand.` | 0 |

Both stunning strikes are named `(Recharge 5-6)` and cited **"if available"**, as print writes a
gated citation. The pricing line is `EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade` on
both — the floor it had before it was allowed to keep its gate, which is D2.

The witch is unchanged from the row you approved: *Wisdom Saving Throw*, DC 14, 19 (3d12)
**Necrotic** damage, and the target is cursed.

**The lint's 0 is not a vacuous 0.** I replayed it against this morning's known-bad drake:
`ungated-turn-denial` fires. Then against a good sheet from this run with the citation stripped
out: `uncited-replacement-row` goes to 1, and taking the Recharge off as well makes it 1 and 1.
Both rules are live.

## 3. The recording and the strict replay

**40 of 40 recorded. None threw, none timed out.** Recorded whole, twist's switch off, nothing of
Part 3 in it.

**The strict replay reproduces 38 of 40.** The two misses are s22 (Goblin Boss) and s36 (blank),
and both miss in the PROMPT, not on the sheet — `REPLAY MISS — the route call … first differs at
line 4 of 84` and `the seed call … first differs at line 3 of 47`. They are the same pair that has
never replayed, and both are fresh from the recording run in the blocks file.

## 4. The checks on the forty

| | check | result |
|---|---|---|
| 1 | no sheet threw | **HELD** — 40/40 |
| 2 | no Multiattack lists a strike among its attacks | **HELD** — 4 strikes, none listed |
| 3 | a turn-denying strike carries a Recharge; none hands out Deafened | **HELD** |
| 4 | s26 holds the curse on a save of the mind; s04 holds none | **HELD** — s26 Wisdom; s04 no curse |
| 5 | every curse row deals Necrotic, or a type the model named | **HELD** — both Necrotic |
| 6 | the new lint counts 0 across the forty | **HELD** — 0 findings on 0 sheets |

## 5. The forty's totals

| | the forty |
|---|---|
| seats | 74 |
| shapes on the sheet | 27 |
| asked a second time | 16 |
| landed on the second ask | 10 |
| refused twice | 6 |
| rows through a seat row | 35 |
| rows through a template | 9 |
| rows through a strike | 7 written, 4 on the sheet |
| rows through a rider | 0 |
| rows through an aura | 0 |

Refused twice, by first reason: a trait is not a save ×3, the row needs a condition no row applies
×1, the row imposes a condition two rows already impose ×1, a rider with no effect ×1.

**Refused twice fell from 19 on the probe to 6 here, and not one is a Reaction's damaging save.**
That was 8 of 19 on the probe. Fix C is the reason — the first ask now has the box.

**D3 fired three times** on the forty (`citation follows the rename`), each one a clause that
would have been dropped on the old code. That is the fault that shipped three times on the two
previous forties, caught in production three times in one recording.

**The one-nova rule acted twice**, neither time on a strike.

## 6. Every strike, rider, aura, parry and curse row

**Strikes (4).** None is turn-denying, so none carries a Recharge, which is correct.
- s06 **Scree Buckle** — +6, reach 5 ft, 16 (3d8 + 3) Bludgeoning, then a DC 14 Strength save
- s24 **Scythe-Fling** — +8, reach 10 ft, 17 (3d8 + 4) Piercing plus 13 (3d8) Acid, then a DC 15 Dexterity save
- s35 **Wellwater Drag** — +6, reach 5 ft, 16 (3d8 + 3) Bludgeoning, then a DC 13 Strength save
- s36 **Granite Manacle** — +6, reach 5 ft, 13 (2d8 + 4) Bludgeoning, then a DC 13 Strength save

**Riders: 0. Auras: 0.** Both remain unproven — built, reachable, and used by nothing in the
forty. That is now three recordings for the rider.

**Parries (3).** s27, s37, s39 — all print's Gladiator row, verbatim.

**Curse rows (2).**
- s18 **Ruinous Curse** — *Charisma Saving Throw:* DC 19, one creature within 60 feet. *Failure:* 24 (7d6) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.
- s26 **Backwards Name** — *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

## 7. Against BLOCKS-air-elemental-2026-11-18.md

**All forty differ. 0 are identical.** As you expected, since every prompt changed.

Row counts, the same parser on both files so the comparison is internally consistent. **It
undercounts** — measured against the new forty's own JSON it reads 239 where the truth is 273, so
read the deltas, not the absolutes. The true per-sheet counts from JSON are in the table's third
column.

| sheet | 18 Nov (md) | 20 Nov (md) | 20 Nov (true) | | sheet | 18 Nov (md) | 20 Nov (md) | 20 Nov (true) |
|---|---|---|---|---|---|---|---|---|
| s01 | 3 | 3 | 3 | | s21 | 2 | 2 | 2 |
| s02 | 4 | 3 | 3 | | s22 | 5 | 5 | 5 |
| s03 | 3 | 4 | 4 | | s23 | 7 | 7 | 7 |
| s04 | 7 | 8 | 9 | | s24 | 4 | 6 | 6 |
| s05 | 4 | 4 | 5 | | s25 | 6 | 7 | 8 |
| s06 | 5 | 5 | 6 | | s26 | 5 | 5 | 7 |
| s07 | 6 | 6 | 7 | | s27 | 5 | 6 | 6 |
| s08 | 4 | 6 | 6 | | s28 | 5 | 5 | 8 |
| s09 | 6 | 6 | 7 | | s29 | 4 | 5 | 5 |
| s10 | 5 | 5 | 5 | | s30 | 7 | 6 | 7 |
| s11 | 13 | 12 | 12 | | s31 | 2 | 2 | 4 |
| s12 | 7 | 5 | 6 | | s32 | 4 | 3 | 4 |
| s13 | 6 | 6 | 6 | | s33 | 5 | 7 | 7 |
| s14 | 6 | 5 | 6 | | s34 | 6 | 5 | 7 |
| s15 | 8 | 8 | 10 | | s35 | 4 | 4 | 4 |
| s16 | 9 | 9 | 12 | | s36 | 4 | 4 | 4 |
| s17 | 9 | 9 | 11 | | s37 | 9 | 9 | 9 |
| s18 | 10 | 10 | 11 | | s38 | 4 | 4 | 4 |
| s19 | 11 | 11 | 14 | | s39 | 7 | 7 | 7 |
| s20 | 6 | 10 | 13 | | s40 | 4 | 5 | 6 |

Totals, same parser: 231 -> 239. True total on the new forty: **273 rows over 40 sheets**.

**Sheets under four rows, by the true count: s21 (2) only.** s01, s02 and s32 sit at 3 by the
markdown parser and 3, 3 and 4 by the JSON. s21 is the thin one and was thin on 18 November too.

## 8. What in the amendment turned out wrong

**The three unexplained rows are on the CHECKPOINT forty, not the air elemental forty.** The
amendment names `BLOCKS-air-elemental-2026-11-18.md`; Death's Toll, Sworn Word and Duskbind are in
`BLOCKS-checkpoint-2026-11-18.md`.

**Two of the three are D3; the third is not.** Measured on both forties, every rename of a cited
row dropped its clause, 6 of 6 — four of the checkpoint forty's 22 clauses (Smoldering Stampede,
Seize the Sworn Word, Clutching Dusk, Unbroken Death-Stride) and two of the air elemental's 22. So
**Sworn Word (s17) and Duskbind (s28) are this fault.** **Death's Toll (s04) is not**: it never
had a replacement clause — the tollkeeper's one clause went to Lingering Brand — which is the
separate queue item about a signature the Multiattack does not offer.

## 9. One thing seen and not touched

The blocks renderer writes a 2014 row as `Spider Climb.The owlbear can climb…`, with no space
after the name. It is in the markdown only, not on the sheet, and it is pre-existing — 58
occurrences on the 18 November forty. Not fixed; it is not in this round's order.
