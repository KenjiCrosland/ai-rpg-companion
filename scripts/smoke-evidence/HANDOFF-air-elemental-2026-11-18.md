# Handoff — the Air Elemental's rows, Deafened, and the revert

For Fable 5.2 and the owner, 2026-11-18. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-air-elemental-2026-11-18.md` beside this file — all forty as the baseline holds them.

## 1. Suite and replay

**252 suites, 5,647 passed, 26 skipped.** Strict replay after the re-record:
**38 of 38 reproduced exactly, 2 skipped.**

Four sheets missed after fixes A–C (s05, s09, s10, s27 — two at the seat call, two at the audit),
and one more after the correction below (s29). **Five re-recorded live in all. Nothing threw and
nothing timed out.**

## 2. The revert

`git revert 508f39c8` — **all 19 files are back**: the three 14 November blocks files and the
sixteen `CHECK-*`. Confirmed by `git show --stat`: 19 files changed, 4,544 insertions.

## 3. Fix A — the budget keeps the typed row

**It needed correcting, and the first version was inert.** The budget loop does not iterate the
array I sorted: it iterates `ranked`, which the receipt ladder re-sorts. So the ordering had to go
into `receiptRank`, which read `e.clause` — prose the seat may or may not carry — and missed
`clauseId`, the binding. On the Air Elemental **both** free rows had been handed "carries stolen
voices" and only one carried the prose, so the ladder read the other as *decoration* and a budget of
one cut it.

My four tests passed over the inert version, because both of their rows tied on the old ladder and a
stable sort preserved the order I had just set. Two tests now drive the ladder itself.

**Every row the budget cut on the new forty, and whether it was bound:**

| sheet | cut | bound? | kept | bound? |
|---|---|---|---|---|
| s25 blackiron-sentinel | Iron Advance | no | Iron Interposition | no |
| s28 ilvareth-dusksong | Shadowmeld Step | no | Dusksong Shroud | **yes** |
| s33 riverbank-reed-ascetic | River's Reversal | **yes** | Reed-Walker's Stride | **yes** |
| s34 krennik-skullstandard | Scything Standard | no | Charging Momentum | no |

**No bound row was cut while an unbound row was kept** — which is the condition the handoff set. On
s33 both free rows were handed the same clause ("lizardfolk monk"), so one still goes: an ordering,
not an exemption. Four rows cut, down from seven.

## 4. Fix B — a Reaction's save says what the target suffers

**Three Reactions refused at the read**, and **zero "unfinished row dropped" on the whole forty**
(it was two), which is the point: a row refused at the read cannot spend a free-row place and then
vanish.

| sheet | row | what the second ask returned | landed? |
|---|---|---|---|
| s05 air elemental | Engulfing Wake | the same row again | no — refused twice |
| s09 stone golem | Tears of Remorse | the same row again | no — refused twice |
| s27 oathbroken warder | Hold the Line | the same row again | no — refused twice |

**The Stone Golem's row had exactly the same cause.** Its recorded answer reads
`"damage": false, "condition": null`, with no movement — identical in shape to Engulfing Wake. Its
effect was "the attack misses or the effect fails", which the form has no field for, just as the
drag had none.

None of the three landed on the second ask, and that is the honest result: the refusal is right, and
the model cannot answer it while the form has no field for what these rows want to say. That is the
Tracked prompt batch, not this round.

**The movement was a dead field, and that is why the drag had nowhere to go.** `renderForm`'s
reaction branch reads `save.movement` and the parse never carried it. It is carried now, through the
save form's own validator, named once and read by both.

## 5. Fix C — Deafened is never a row's only effect

**One row refused on the save path, and it landed:**

| sheet | refused | the second ask chose |
|---|---|---|
| s10 drowned choir | One Unbroken Voice — Deafened alone | **Drowning Hymn (Recharge 5-6)** — 42 (12d6) Radiant **and Frightened** |

That is the owner's own preference, chosen by the model rather than swapped by rule. Its companion
trait came back as **Endless Anthem**, which now heals the choir while a creature is "Deafened,
**Frightened**, or Stunned by it" — so the hymn no longer deafens the creature it needs to hear it.

**AND THE FIX HAD A HOLE, which I corrected the same day.** It read `save.damage` on a Reaction, and
a Reaction's damage is held unconditionally. The bells' Knellsong arrived with damage set, passed the
read, had its damage set aside, and shipped reading only "the target has the Deafened condition" —
one of the two rows the owner named. The flag is now ignored when judging a Reaction.

| sheet | refused | the second ask chose |
|---|---|---|
| s29 swarm of funeral bells | Knellsong — Deafened alone | **Deafened again** — refused twice, the seat is empty |

So s29 **loses Knellsong entirely** and now has no Reaction. The owner called it underwhelming and
said Deafened is not a big deal; removing it is defensible, and it leaves a thinner sheet. His call.

## 6. The sheets asked for

### s05 Air Elemental — **Stolen Voices is on the sheet, under that name**

```
Multiattack      The air elemental makes two Thunderous Slam attacks. It can replace one attack with
                 a use of Stolen Voices.
Thunderous Slam  *Melee Attack Roll:* +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
Stolen Voices    *Wisdom Saving Throw:* DC 13, one creature within 60 feet. *Failure:* The target has
                 the Frightened condition until the end of its next turn. If the target was already
                 Frightened …
Whirlwind (Recharge 4-6), Air Form    print's own rows
```

Fix A kept it (it is the bound row) and Fix B stopped Engulfing Wake spending the place first.

### s10 Drowned Choir — the hymn and the anthem together

```
Endless Anthem   At the start of each of its turns, if at least one living creature is Deafened,
                 Frightened, or Stunned by it, the drowned choir regains 14 (4d6) Hit Points …
Drowning Hymn (Recharge 5-6)
                 *Dexterity Saving Throw*: DC 15, each creature in a 60-foot Emanation originating
                 from Choir. *Failure:* 42 (12d6) Radiant damage, and the target has the Frightened
                 condition …
```

### s29 Swarm of Funeral Bells — Knellsong is gone

```
Swarm, Multiattack, Tolling, Over the Dying
```
No Reactions section. Tolling still deals Bludgeoning plus Necrotic, and the sheet still says Undead —
both still open with the owner.

### s33 Riverbank Reed-Ascetic — River's Reversal is **not** on the sheet

`Reed-Walker's Stride` took the single free-row place. Both were handed the same clause
("lizardfolk monk"), so the ordering could not separate them and the budget still cut one.

## 7. Every sheet that differs from BLOCKS-four-fixes-2026-11-18.md

Five. Both printings compared; where a change is in one half only it says so.

| sheet | what changed | half |
|---|---|---|
| s05 air-elemental | **+ Stolen Voices**, and the Multiattack now cites it | both |
| s09 stone-golem | **+ Keening Glare** — Tears of Remorse was refused at the read, so the other free row took the place | both |
| s10 drowned-choir | Ever-Swelling Hymn → **Endless Anthem**; One Unbroken Voice → **Drowning Hymn (Recharge 5-6)**, Deafened → Frightened | both |
| s27 oathbroken-warder | **− Silent Oath**. Not this round's doing: the sheet was re-recorded, and its trait seat's fresh answers were refused twice by the existing number gate | 2024 only |
| s29 swarm-of-funeral-bells | **− Knellsong** | both |

## 8. What in this handoff turned out wrong when I read the code

1. **Fix A's place.** "The loop that ends at generate.mjs 1693" keeps rows in the order it meets
   them — it does not. An ordering already existed, in the receipt ladder at 1632/1645, and that is
   where the binding had to be read. My first attempt obeyed the handoff literally and was inert.
2. **Fix C's reach on a Reaction.** "A save or a Reaction whose only effect is Deafened is refused"
   needed the held damage ignored, or Knellsong — one of the two rows the ruling names — passes.
   Found by reading the sheet after the fix, not from the code.
3. **The count of rows the budget cut** was 7 on the old forty and is 4 on this one; only one of the
   four is bound, and the row it lost to is bound as well.
4. **My own fault, not the handoff's:** I edited `src/` while the first live re-record was in flight,
   which HMR voids. That run was killed and its tape discarded, and the re-record redone from a clean
   build. Nothing from the voided run reached the repo.

## 9. The deletion, not done

The rule says the previous round's blocks file goes "unless … no file in the repo names it".
`BLOCKS-four-fixes-2026-11-18.md` **is named**, by `HANDOFF-four-fixes-2026-11-18.md`, which opens
"Blocks: `BLOCKS-four-fixes-2026-11-18.md` beside this file".

Every round's report names its own blocks file, so read literally this rule can never delete one. I
have not deleted it, and the question is yours: either the naming rule means *named by something
other than its own report*, or a blocks file is kept as long as its report is.
