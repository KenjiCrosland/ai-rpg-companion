# The five faults, and three gates that did not hold

Branch `statblock-enhancments-part-2`, one commit: `fbc8804`. Blocks:
`BLOCKS-five-faults-probe-2026-11-20.md` (33 sheets, every one of the round).

**The six gates did not all hold, so I stopped before the re-record, as the handoff orders.**
Gates 1, 2 and 6 held. Gates 3, 4 and 5 failed. I did not adjust a gate and I did not attempt a
second fix for any of them. `baseline-2026-11-18` is untouched; nothing was deleted.

---

## 1. The suite

`npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent`, read from its own exit
code, not through a pipe.

**exit 0 — 5720 passed, 26 skipped, 5746 total, 258 suites.** 12 new tests.

---

## 2. The five faults, each with the sheet that shows it

### Fault 1 — a strike is never named among Multiattack's attacks. **FIXED, and it reaches the sheet.**

The Thunderwall Drake, all three rolls:

> **Multiattack.** The drake makes two Horn attacks. **It can replace one attack with a use of
> Charged Brand-Wake.**

Named among the attacks: no. Offered by the replacement clause: yes. That clause is the once-a-turn
limit the trace has claimed since the strike was built, and now it is true.

It took three passes, not one. The attack-list builder and the late re-read were the two I expected.
The one that actually shipped the fault was a third — the normaliser that rebuilds the Multiattack
line from every attack row on the sheet, which re-added the strike after both others had excluded
it. Had I tested only the parse, as the last two sessions did, I would have reported this fixed and
it would have shipped broken for a third time.

### Fault 2 — a turn-denying strike takes a Recharge. **The fix is right and a later pass takes it off. GATE 3 FAILED.**

`strikeRowFrom` names it correctly. From the drake's own trace:

> `[reskin] strike written from its attack: "Charged Brand-Wake (Recharge 5-6)" clones "Horn" and
> adds a Constitution save`

Four lines later, on the same sheet:

> `[reskin] one nova: "Charged Brand-Wake" arrived gated on a sheet whose chassis already carries a
> Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice
> Snare, step 7)`

**This is the answer to the question you asked me to report.** The one-nova rule strips a strike's
Recharge whenever the chassis already carries a Recharge nova, and the drake's chassis does. All
three rolls shipped a Stunned-at-will strike. The rule and the ruling disagree:

- One nova says a sheet carries one Recharge, so the second one goes.
- The 18 November ruling says a strike that takes a turn away carries a Recharge.

Both are yours and I will not pick between them. The three outs I can see, none taken:
the strike is exempt from one nova (a strike is not a nova — it is one attack of two, priced
against a single attack, which is why the value check passes it at EV 9.9 against a 9.4 floor);
or the chassis nova yields to it; or a turn-denying strike that cannot have a Recharge is refused
at authoring and the seat asks again. The first is the smallest and I think it is right, but it is
your call.

### Fault 3 — Deafened is not a strike's effect. **FIXED, both halves.**

The refusal fires on a strike, and the swap that turns a second Deafened answer into Frightened now
walks the one shared array list instead of three names, so a strike is no longer invisible to it.
Tested on `strikeRowFrom`'s own output, not the parse. Nothing in the probe handed out Deafened.

### Fault 4 — the fields shown are the fields accepted. **Half fixed. I found the other half and left it.**

One list now, `REACTION_SAVE_FIELDS = ['stat','target','condition','movement','success']`, read by
both redirects. No `damage`, no `type`, and `movement` is named — which the gate has accepted since
18 November and the model was never told about.

**What I missed, and only found when the probe's refusals did not drop: the first ask has no save
box for a reaction at all.** The reaction form in the first-ask prompt is:

> `- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, … }`

There is nowhere to put a saving throw. A model that wants a reaction with a save writes it as prose
inside `"response"` and is refused for exactly that — three times in the probe, all on "Hold the
Line". The redirect then shows the proper box, which is why the fix I made is a redirect fix and not
a first-ask fix. I have not touched it: it is a second fix for Gate 5 and the handoff forbids that.

**The drift sweep, asked a third time.** `save` was the only form showing a field the parse did not
keep — a `curse` field, shown since 18 November and dropped on the floor. That is Fault 5's cause,
below. The reaction form's fields read as zero to my checker because they are written inline rather
than on `- "field" ON A …` lines; checked by eye, no drift there.

### Fault 5 — the curse flag reaches the sheet. **The sentence lands. Two of your three symptoms survive.**

The flag is dropped in `parseAuthorResponse`'s `save` branch: `savesAll` built every other field
and never carried `curse`, so 3.2 set the flag on an object the renderer never saw. It carries it
now, and the engine writes the sentence. All three Mirewitch rolls ship a curse:

> **Mirebrand Hex.** *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19
> (3d12) **Bludgeoning** damage, and the target is cursed. While cursed, the target can't regain
> Hit Points.

**Your second symptom survives: it still bludgeons, on all three rolls.** My fix defaults the type
to Necrotic when the call named none — and it is set too late. `saveType` is computed on the line
*above* my block, so by the time I set `s.type = 'Necrotic'` the rendered type has already fallen
through the word table to `Bludgeoning`. The fix is inert for the type. An ordering mistake, mine,
and I am reporting it rather than moving the two lines, because that is a second fix for Gate 4.

**Your third symptom survives on 1 of 3: roll 2 ships a Strength save.** Same shape as Fault 2 — my
block sets the stat to a save of the mind and a later pass takes it back:

> `[reskin] save re-derived after a retype: Actions/Mire-Mark Hex — a Wisdom save for a condition
> the row IMPOSES, which calls for Strength or Dexterity (A2)`

That roll's curse also pulls the target 10 feet, so the re-derive sees a forced movement and picks
Strength by print's grammar. It is not wrong about forced movement; it does not know the row is a
curse. The same question as Fault 2: which rule yields.

---

## 3. The probe

`--live-from seat --rolls 3` on the eleven. 33 of 33 completed, **0 threw, 0 timed out.**

| | 19 Nov | 20 Nov |
|---|---|---|
| seats | 70 | 66 |
| shapes on the sheet | — | 25 |
| asked a second time | 33 | 31 |
| landed on the second ask | 15 | **12** |
| refused twice | 18 | **19** |
| rows through a rider | 0 | **0** |
| rows through a strike | 9 | **3** |
| rows through an aura | 0 | **1** |

An aura landed for the first time. A rider still has not landed in any probe since it was built.
Strikes fell from 9 to 3 across the same eleven sheets; I have no evidence that is anything but roll
variance, and I am not going to claim it is.

Refusals by first reason: a trait is not a save ×8 (was 6), a number promised and not written ×4, a
save written as prose ×3, no row of the kind asked ×2, a condition the sheet already applies ×1, a
rider with no effect ×1.

---

## 4. The six gates

| | gate | result |
|---|---|---|
| 1 | no sheet threw | **HELD** — 33/33 |
| 2 | no Multiattack names a strike; every strike offered by the clause | **HELD** — 3 strikes, all correct, non-vacuous |
| 3 | a turn-denying strike carries a Recharge; none hands out Deafened | **FAILED** — 3 of 3 drake rolls, stripped by one nova |
| 4 | the witch is cursed on a save of the mind, the tollkeeper is not | **FAILED** — cursed 3/3, mind save 2/3, tollkeeper 0/3 ✓ |
| 5 | refused twice ≤ 14, a Reaction's damaging save ≤ 3 of them | **FAILED** — 19 and 8 |
| 6 | the suite is green from its own exit code | **HELD** — exit 0 |

Gate 2 is worth one line: it is not vacuous. Three strikes shipped and the checker read all three.

**No re-record.** `baseline-2026-11-18` stands as the "before", no new baseline directory was made,
and nothing was deleted this session.

---

## 5. Where the handoff turned out wrong

**Fault 4's diagnosis was the smaller half of the fault.** The handoff names the redirect's field
list, and that was real and is fixed. But the first ask never had a save box for a reaction, and
that is what three of the probe's refusals actually are. Fixing the redirect could not have moved
Gate 5 much, and did not.

**Fault 2 was named as a missing Recharge.** It was not missing — it was being written and then
removed. Had the test stopped at `strikeRowFrom`, as the handoff warned about, it would have passed.

Two of the three failures are the same shape, and it is the shape worth naming: **a fix that writes
the right value into a row, and a later pass that overwrites it.** One nova takes the Recharge off;
the save re-derive takes the mind save off. Both later passes are correct about what they know and
blind to what the new fix knows. If you want a general answer rather than three local ones, it is
that a row written for a declared ask should carry a mark the later passes read — the same shape as
`writtenForATypedClause`, which already stops the audit renaming a typed row.
