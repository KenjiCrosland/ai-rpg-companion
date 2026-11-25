# Seven broken sentences from the GM forty — report

Branch `statblock-enhancments-part-2`. Five commits, ready to push. Nothing pushed.

## Read this first: four canary sheets changed by more than their wording

The second amendment said the change was "wording only" and expected the five canary sheets to
differ by their self-reference alone. **Only s13 Purple Worm did.** Re-recording a sheet "from the
call that missed" means going live at the **idea** call, because the creature's short name is in the
idea prompt — and a live idea call rolls a fresh signature. So:

| sheet | lost a row the owner had read | gained |
|---|---|---|
| s01 Dire Wolf | Herding Snap | Herd-Cutter (Strength/Prone instead of Wisdom/Frightened) |
| s05 Air Elemental | Mimicry; Storm of Voices | Cage of Stolen Cries; Howling Vortex |
| s09 Stone Golem | Trail of Tears; Grief Glare | Weeping Visage |
| s15 Adult Red Dragon | Scarred Flank | — |
| s13 Purple Worm | — | — |

The same holds for four of gm40's nine: s16, s25, s28 and s34 went live at the idea or seat call and
carry new rows beside their fix. s04, s05, s08, s14 and s26 changed by one or two lines and nothing
else.

This is not a second fix and not a regression in the engine — it is the price of proving a
name-level fix on a frozen tape, and it was predictable from the standing lesson that a prompt which
matches keeps its answer. **I should have said so before re-recording, and I did not.** If those rows
matter, the way to keep them is to re-record nothing and accept that these sheets cannot be proven
on this tape; that is the owner's call, not mine, and the tapes are committed so either choice is
one revert away.

## 1. The seven, each with its pass, its words and what turns its test red

### Fault 1 — a net that restrains twice
**Pass:** the weapon table's net substitution in `reskin/generate.mjs`. The slot's Restrained rider
is welded hundreds of lines earlier, while the row still carries its damage expression, so the
weld's own "already restrains?" guard has nothing to find; the substitution then replaces the damage
and leaves the rider stranded after a full stop.
**Before:** `*Ranged Attack Roll:* +6, range 5/15 ft. If the target is Large or smaller, it has the
Restrained condition until it escapes (escape DC 13)., and the target has the Restrained condition
until the end of its next turn.`
**After:** `*Ranged Attack Roll:* +6, range 5/15 ft. If the target is Large or smaller, it has the
Restrained condition until it escapes (escape DC 13).`
**Red when:** the substitution stops consuming a following clause that imposes the same condition.

### Fault 2 — "One below half its hit point maximum creature"
**Pass:** `to2014Grammar` in `format-2024/generate.mjs` — the word-for-phrase swap, right for a
predicative "while Bloodied" and wrong before a noun.
**Before:** `One below half its hit point maximum creature the butcher can see within 60 feet must
make a DC 14 Dexterity saving throw.`
**After:** `One creature the butcher can see within 60 feet that is below half its hit point maximum
must make a DC 14 Dexterity saving throw.`
**Red when:** the attributive rewrite is removed — the phrase lands before the noun again.

### Fault 3 — print's Mimic, half rescaled
**Pass:** the rename path's rider paste (the second copy; see item 2 below).
**Before:** `…reach 5 ft. 22 (4d8 + 4) Piercing damage. —or 12 (2d8 + 3) Piercing damage if the
target is Grappled by the mimic—plus 4 (1d8) Acid damage.` and, on the Pseudopod, `Ability checks
made to escape this grapple have Disadvantage.` with nothing on the row that grapples.
**After:** print's one sentence, the second figure moved by the step the first took, and the orphan
grapple reference gone.
**Red when:** the rename path is put back to its two raw lines (turns two red).

### Fault 4 — "Ft Spear"
**Pass:** `partRows` in `reskin/generate.mjs`, the walk that collects the words before the noun. It
stepped back onto "ft." and kept it, because stripping the punctuation leaves a word like any other.
**Before:** `Ft Spear: Melee or Ranged Weapon Attack: +7 to hit…`
**After:** `Spear: Melee or Ranged Weapon Attack: +7 to hit…`
**Red when:** the sentence-boundary break is removed.
The clause is still one clause — I did not split it at "30 ft.", as the fault allowed.

### Fault 5 — two rows with one name
**Pass:** the strike landing in `reskin/generate.mjs`, which pushed its row into `sections` with no
uniqueness gate — the one every other landing runs.
**Before:** two rows named `Quiver Command`, one the herd template's save and one the seat's strike.
**After:** one `Quiver Command`; the strike carries no template name, so it leaves and the seat is
asked again. The sheet's `duplicate-row` FAIL is gone.
**Red when:** the gate is taken off the strike push.

### Fault 6 — the body's old name left in a row
**Pass:** the rename path's `plus N (` branch, which pasted print's rider raw with no `asInline`.
**Before (s26):** `…plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the
start of the assassin's next turn.`
**After:** `…until the start of the creeper's next turn.` s08 the same, as the whisper's.
**Red when:** the rename path is put back (the same change as fault 3).

### Fault 7 — a short name that is not a name
**Pass:** `byRule` in `reskin/generate.mjs`. `personalName` read "Gelatinous Cube" as an epithet plus
a given name — "Gelatinous" ends in -ous — and returned "Cube", a person form for a printed monster.
**Before:** `Amorphous. Cube can move through a space as narrow as 1 inch wide without squeezing.`
and `Foretold Moves. Madame can take 3 legendary actions…`
**After:** `the cube` everywhere, and `Madame Zolga`, who keeps her title per the amendment.
**Red when:** `printSelfReference` is removed from `byRule`.

## 2. Fault 3 — print's rows with a second figure, and what the scaler does

Twelve print rows carry a second figure. **Two** use print's em-dash — the Mimic's Bite and the
Swarm of Venomous Snakes' Bites — and ten use ", or":

Chimera (Bite), Swarm of Crawling Claws (Swarm of Grasping Hands), Blood Hawk (Beak), Giant Seahorse
(Ram), Goat (Ram), Swarm of Bats (Bites), Swarm of Insects (Bites), Swarm of Piranhas (Bites), Swarm
of Rats (Bites), Swarm of Ravens (Beaks).

Before this round the scaler moved the **first** figure only, on all twelve, and welded a full stop
in front of a dash on the two dashed ones. `pasteRider` now moves every figure in the rider by the
step the first figure took and keeps a dash continuation inside print's sentence. The ten ", or"
rows take the same path; none of them is on either forty, so this is reasoned from the code and the
corpus, not read off a sheet.

## 3. Fault 6 — where a creature's name is filled into row text

Nine sites in `reskin/generate.mjs`, by what they call:

| site | what it fills | through `settledInline()`? |
|---|---|---|
| the reaction's movement clause | the creature it pushes away from | **yes** (fixed 24 Nov) |
| the strike's host row | the attack it points at | **yes** |
| the save row's anchor | the creature a target is pulled toward | no — `inlineGuessRef()` |
| `asInline`, the clone path's text | print's noun in print's row | n/a: substitutes `inline`, which is settled |
| `asInline`, the clone path's rider | print's noun in print's rider | n/a, and now passed the body's name |
| `asInline`, the rename path | print's noun in a renamed row | n/a, and now passed the body's name |
| `asInline`, print's traits and legendary rows | print's noun | n/a |
| the kit row sweep | the kit block's own noun | n/a, runs after `inline` exists |
| the guess-repair sweep | every row stamped before the name settled | n/a, it is the repair |

Two of the nine read the guess. The reaction's was fixed on 24 November; **the save row's anchor
still calls `inlineGuessRef()`** and is the one left. It is one line in the same place. Reported,
not fixed — it is not one of the seven.

## 4. Fault 7 — the titles the short-name picker drops

`RANK`, in `personalName`: Sergeant, Captain, Commander, Lieutenant, General, Admiral, Marshal,
Warlord, Chieftain, Lord, Lady, Sir, Dame, Baron, Baroness, Count, Countess, Duke, Duchess, King,
Queen, Prince, Princess, Abbot, Abbess, Bishop, Brother, Sister, Mother, Father, Constable, Sheriff,
Grandmother, Grandfather, Granny, Grandma, Grandpa, Nan, Auntie, Aunt, Uncle, Old, Widow, Goodwife,
Goodman, Elder, Mistress, Master.

A second, shorter list names the honorifics that **keep** the name they title: Sir, Dame, Lord, Lady,
Saint — and now **Madame**. That is the list Madame joined, not `RANK`: putting her in `RANK` makes
her speak as "the madame", and my first attempt at "Zolga" broke the pinned decision that
"Grandmother Ashwick" reads as "the grandmother". The suite caught it.

**The pinned comment is corrected, and here is the decision it recorded.** It said print "speaks it
whole ('the goblin boss', 'the dire wolf')" and used that to justify the validator accepting a whole
name as a legal run. The run rule stands; its stated reason was false. Measured on
`srd52-monsters.json`: of print's multi-word names it refers to itself by the LAST word on 112, the
FIRST on 37, the whole name on 4 and otherwise on 9; 293 of 329 blocks name themselves at all.

## 5. Every sheet that differs, from a diff

**gm40 — 30 of 39 identical, nine changed:** s04 (fault 1), s05 (2), s08 (6), s14 (3), s16 (7),
s25 (4), s26 (6), s28 (7), s34 (5). s40 writes no block in a replay.

**The canary — 33 of 38 identical, five changed:** s01, s05, s09, s13, s15, all fault 7. The
self-reference changes on each are in the blocks file's head table; the extra rows on four of them
are the first section of this report.

**Are these all of them?** Yes, for these two forties: every sheet whose Name field holds a print
name and whose self-reference changed is in those five, plus gm40's s14 Mimic and s16 Gelatinous
Cube. s14's reads "the mimic" before and after — print agrees with what the engine already said.

## 6. From the not-this-round list, found to be one line

- **The save row's anchor** (item 3 above) — `inlineGuessRef()` where `settledInline()` belongs, one
  line in the same place as the reaction fix. Not fixed.
- Nothing else. s28's Foretold Moves, s18's "level 1 player character", the type and size misses and
  the replaced numbers are all more than one line, as you judged.

## 7. Anything a change made worse, read off a real sheet

The four canary sheets and four gm40 sheets that lost rows to a live idea call — the first section of
this report. Nothing else: no sheet gained a defect from the seven fixes themselves, and the lint
fell on both forties.

**Ambiguity from the shorter name, reported not fixed.** s01 Dire Wolf's Pack Tactics now reads "The
wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is
within 5 feet" — on a sheet whose own signature is about herding, "the wolf" and "the wolf's allies"
read as the same kind of creature where "the dire wolf" distinguished it from the pack it leads.
Print accepts that ambiguity on its own Dire Wolf page. s13 Purple Worm reads "the worm" beside a
Tunneler trait about tunnels; no other sheet in either forty mentions a second creature of its own
kind.

## 8. The lint, the suite, the replays

**Lint — gm40:** 12 blocks with a FAIL of 39, from 14 of 40. By rule: print-range 3,
undefined-attack-ref 3, hot 2, per-attack-ceiling 2, alignment-fit 2, hot-offense 1, dc 1, under 1,
print-rows 1, dual-recharge 1. **`duplicate-row` is gone** — that was fault 5 on s34.

**Lint — the canary:** 5 blocks with a FAIL of 38, from 6. By rule: `adjudicable-target` 4 and
`dangling-ref` 1 — both of the rules you said misread good sheets, and nothing else.

**Suite:** `npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent` — **exit 0**.
288 suites passed, 6066 passed, 26 skipped, 6092 total, 6 snapshots.

**Replays:** gm40 before the re-record, 9 of 39 did not reproduce (the nine you predicted: s04 as a
`REPLAY DIFFERS`, the other eight as misses), 1 skipped. The canary before, 5 of 38 missed, 2
skipped. After: **gm40 39 of 39 exactly, 1 skipped** and **the canary 38 of 38 exactly, 2 skipped**,
both exit 0.

**A harness finding, reported not fixed.** `--live-from miss --record` over a whole batch wrote tapes
whose call lists were short by one and whose first call was the wrong one; the same flags with
`--only N` are sound, and that is how all fourteen were re-recorded. The batch-wide tape was deleted
unused. Related and worth knowing when reading any of this: a generation's first two calls race, so
the recorder stores them in completion order — comparing two tapes by prefix reads as "nothing kept"
when the path and route calls merely swapped places. Compare as sets.

## 9. The commits — five

1. `b5e3d3d` statblock: four of gm40's seven broken sentences, and what the other three need
2. `0983fd4` statblock: the last three of gm40's seven — one paste, and print's own rows
3. `9013854` statblock: the pinned comment on how print names itself was wrong
4. `024192d` statblock: the fourteen re-recordings, each from the call that missed
5. this commit: the two blocks files, the two check files and this report

**On "one commit per fault":** I did not. Faults 1, 2, 4 and 5 landed in one commit and 3, 6 and 7
in another, because the five pipeline tests share one harness file and the first commit was made
before I had traced the other three. Faults 3 and 6 turned out to be one site, so they would have
shared a commit anyway.

Nothing deleted from `scripts/smoke-evidence`: both of this round's blocks files are the first in
their series' new generation and neither replaces the other's, and the files your handoff names all
stay.
