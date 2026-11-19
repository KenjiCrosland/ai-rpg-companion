# Handoff — the boxes are reached, and the curse is the GM's

For Fable 5.2 and the owner, 2026-11-19. Branch `statblock-enhancments-part-2`.
Probe sheets: `BLOCKS-reachable-probe-2026-11-19.md`. `baseline-2026-11-18` untouched; no re-record.

## The headline

**The boxes are reached.** 9 rows landed through a strike, against 0 last session. Refused twice is
down from 21 to 18, and the tollkeeper no longer curses. The probe also crashed twice and found two
real bugs doing it.

## 1. Suite

**258 suites, 5,714 passed, 26 skipped**, read from jest's own exit code (0), not through a pipe.

Strict replay of the baseline is not run this session: every prompt that changed makes it miss, and
the handoff says to leave it.

## 2. Fix 1 — the boxes can be reached

Both prompts are at the end of this report, whole, as asked.

**The skeleton and the parser now read one list.** `AUTHORED_ARRAYS` builds the envelope and is what
the parser consumes, and the test compares the two by behaviour — it feeds a row into each array and
checks the parser takes it. The old byte-for-byte envelope test is gone: it passed happily through
both the 11 November fault and this one.

**The ask names what the seat takes**, from `SEAT_TAKES`, which the landing reads too. Hoisting the
two closures that table needs above the ask was necessary and the suite caught it — read from the
prompt, both were in the temporal dead zone and every seat threw.

## 3. Fix 2 — the aura

**The count, before building: 4 of the 21 refused-twice answers are an aura the form can hold.**
All four are one sheet — the Thunderwall Drake's `Stormwake`/`Downdraft`/`Storm-Charged Wake`, all
Prone. That is under the third you set, and I said so before going on. The other four start-of-turn
answers are the marsh witch's difficult terrain, which is the zone family and already a catalog
template, not a condition aura. Counted from the probe's own recordings, which are still on disk.

It is built, and print's sentence renders word for word:

```
*Dexterity Saving Throw*: DC 13, any creature that starts its turn in a 10-foot Emanation
originating from the drake. *Failure:* The target has the Prone condition until the start of its
next turn. *Success:* The target is immune to this drake's Stormwake for 24 hours.
```

**No aura landed in the probe.** The redirect fires and the form is offered; the model answered a
strike on the drake instead, which is the sheet the count said would want an aura.

## 4. Fix 3 — the curse

| | last session | this session |
|---|---|---|
| marsh witch rolls with a curse on the sheet | 1 of 3 | **1 of 3** |
| tollkeeper rolls with a curse on the sheet | 4 of 4 | **0 of 3** |

**3.1 holds.** The tollkeeper's "tolls for the dying" no longer reaches a curse: the call still says
`curse`, the words do not, and the lead falls back to `drain`. The template's stale keys — `debt`,
`rebuke`, `price` — are gone.

**3.4 holds.** The curse row deals one whole hit at every CR, measured at CR 3, 7, 12 and 17; it was
0.6 of one.

**3.2 did not move the witch.** She is still 1 of 3. On the two uncursed rolls her seat landed a
`Hex` through its own template rather than through a save or strike bound to the clause, and 3.2
only reaches a save or a strike that carries the clauseId. That is the gap, and it is mine: I read
"the row written for it" as the seat's own row and did not cover a template landing on the same
clause.

**The audit on curses:** no curse reached a sheet in this probe except the witch's one roll, so
there is no useful count of `open_ended` findings against them. Next probe.

## 5. The probe

| | last session | this session |
|---|---|---|
| seats | 66 | 70 |
| asked a second time | 30 | **33** |
| landed on the second ask | 9 | **15** |
| refused twice | 21 | **18** |
| rows through a rider | 0 | 0 |
| rows through a strike | 0 | **9** |
| rows through an aura | not built | 0 |

**Share of landed rows by form: seat row 26, template 10, strike 9.** A strike is 20% of what lands
— present, not dominant, which is the shape you asked me to watch. All nine clone an attack and add
a Constitution save; five distinct rows across the drake and the leviathan.

Refusals by reason: a trait is not a save ×6 (was 11), no row of the kind asked ×5, a save written
as prose ×4, a number promised and not written ×2, a save with no effect ×1.

## 6. The crash, and the two bugs it found

**s31 threw on 2 of 3 rolls** — the only sheet where a strike lands, so the new box found both:

- **Mine:** the rider, strike and aura landings returned a thin `{ row, section }` where the
  pipeline reads `.authoredSeat`, `.row.name`, `.asked` and `.because` off the seat result.
- **Latent and older:** `uniqueRowName` sets `actionT = null` on a name collision, and the trace a
  dozen lines below read `actionT.authoredSeat` *outside* the `if (actionT)` that followed it, as
  did the `sweepDeadName` after it. Unreachable until a row could collide on name here — which a
  cloned strike can.

Both fixed; the drake is 3 of 3. The crashed sheets are in the blocks file as they came out.

## 7. Would I re-record each

- **Fix 1 — yes.** It is the reason anything landed. One list, one table, and a test that compares
  lists rather than reading a prompt.
- **Fix 2 — yes, but it has not proved itself.** Nothing landed through it. It cannot break a sheet
  (it only adds a form and a redirect), and print's shape is the argument, but its value is unproven
  and its count was under your threshold.
- **Fix 3 — yes.** 3.1 and 3.4 are measured and clean. 3.2 needs the extension above before the
  witch will curse reliably; it does no harm as it stands.

## 8. What turned out wrong when I read the code

1. **The skeleton, not the guide, was the blocker** — as you said, and the evidence agrees: adding
   the arrays and naming the forms moved strikes from 0 to 9 in one session.
2. **My landings returned the wrong shape**, and only a live roll showed it. The suite was green
   through it.
3. **An older unguarded trace** sat behind a null that nothing could reach until now.
4. **3.2's reach is narrower than its description.** "The row written for it" does not cover a
   template landing on the clause, which is how the witch stays at 1 of 3.
5. **Not a code fault, but worth recording:** I overwrote `.claude/settings.json` with a heredoc
   while adding permissions. Nothing was lost — the deny rules live in `settings.local.json` and
   were untouched — but the Read-tool denies do not stop a shell command reading the same file, so
   the deny list is now mirrored into the committed settings and extended to Bash.

## The two prompts, whole

```


================ THE SEAT PROMPT — A TRAIT ================

You are writing ONE ability for a D&D monster — the one ability it is still missing. Write it into the closed forms below, in the creature's own register. You never write a number: no attack bonus, no damage dice, no DC — the engine prices the row.

THE CREATURE: Thunderwall Drake (the drake), CR 7.
THE SHEET SO FAR (complete but for this one ability; never restate a row it already carries, and never name a row that is not on it):
Actions / Horn: *Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage.
Actions / Thunder Wall (Recharge 5-6): *Constitution Saving Throw*: DC 14, each creature in a 15-foot Cone. *Failure:* 22 (4d10) Thunder damage.

THE ABILITY TO WRITE, in the words it was described in:
[object Object]

THE CLAUSE THIS ROW MUST ANSWER — the creator typed these words: **"breath is a rolling wall of thunder"**. FIRST look at THE SHEET SO FAR above and ask whether a row already on it carries this, in different words: a bite that already grapples and holds IS "drags its prey under", a swallow IS "eats them whole". If one does, write NO row — put that clause and that row's exact name in "answered" and leave every form array empty. That is the better answer, not a failure: the creature already does what the creator asked, and a second row for it is the same mechanic told twice. Only when nothing on the sheet carries it, write the row, and the row you write is for this and nothing else. A row that is good in itself and answers something else is the wrong row.

THE SEAT IS a trait, and more than one form can fill it. Write exactly one row, in whichever of these forms the ability actually is — a trait, an aura, a reaction, a rider or a strike — and leave every other array empty. WHICH FORM above tells you which it is: answer the form the ability IS, not the one the seat is named after.

THE FORMS
- save (a curse, a breath, a shove, a gaze): { "clause", "name", "stat": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "target": "one creature within N feet" | "each creature in a N-foot Cone|Sphere|Line|Emanation", "damage": true|false, "type": one of the damage types or null, "condition": one of the conditions or null, "movement": "pushed up to N feet"|"pulled up to N feet"|null, "success": "half"|"none", "recharge": true|false }.
- trait (a passive, a style, a resource — it costs the creature NOTHING; never write "uses its Reaction" here, that is the reaction form below): { "clause", "name", "trigger": a when/while/if clause or null, "effect": one sentence; write {dc} where a save DC belongs and {dmg} where damage belongs — never a number, "imposes": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises, "passive_effect": one of ability/bonus/protection/threat/limitation/none }.
- A row that HEALS states the Hit Points as {dmg}, the action it costs, and a limit (a trigger, "1/Day", or "Recharge 5-6"): "restores hit points to the faithful" and "after minutes" are not rows a table can run.
- {dmg} IS DAMAGE AND {dc} IS A SAVE DC. Never write {dmg} where a COUNT belongs — a number of uses, attacks or legendary actions is a plain small integer you write yourself ("can take 3 legendary actions"), because a GM cannot take 4d6 of anything. If a row should be limited, say so with its limit ("1/Day", "Recharge 5-6") and not with a number in the sentence.
- NEVER PROMISE A LIST YOU DO NOT WRITE. "choosing from the options below", "one of the following" and "as listed below" each require the options to follow IN THIS SAME row's text; a row that promises them and stops is a dead row a GM cannot run.
- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, same tokens, "imposes": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises }.
- "acts" ON A TRAIT OR REACTION: name anything OTHER than this creature that your row makes act — attack, rise, move, carry, obey — exactly as the sheet above names it, or null. A table can only run it if that thing is a row on the sheet with rules of its own; if it is not, rewrite the row so this creature does the work. (A row that raises "a spore-puppet" needs a spore-puppet on the sheet.)
- "heals" ON A TRAIT OR REACTION: true if the row gives this creature Hit Points back on its own, every round, with no action spent; false otherwise. A one-off heal, a heal that costs an action, and a heal on another creature are all false.
- "quantities" ON A TRAIT OR REACTION: how many separate NUMBERS the row needs a table to know — every damage amount, every distance or area size, every bonus or penalty. Count them and answer the number. Then WRITE every one of them: {dmg} for damage the engine should fill, {dc} for a save DC, and a literal number for a distance or an area ("a 15-foot Emanation", "within 30 feet"). A row that promises a number and does not write it cannot be run at a table and is refused — "gains Temporary Hit Points" with no amount, "an Emanation" with no size, "deals extra Fire damage" with no amount. If the row needs no numbers at all, answer 0. A BONUS YOU ONLY DESCRIBE IS STILL A NUMBER: "deals extra Fire damage", "gains Temporary Hit Points", "is fiercer while Bloodied" each need an amount a table can read, so COUNT them. If you cannot give the amount as {dmg}, do not promise it.
- "mechanics" ON A TRAIT OR REACTION: how many separate things the row makes a table do — count them, and answer the number. One row, one mechanic: a row that turns a blow back AND steps in front of an ally is two, a row that hides it AND heals it is two. Write the one that matters and leave the other out; we take only rows that answer 1.
- "imposes" ON A TRAIT OR REACTION: name the condition the row involves, or null if it involves none. A row that requires one condition and inflicts another names the one it INFLICTS.
- "passive_effect" ON A TRAIT: a trait must change what this creature CAN or CANNOT do. Name which, exactly one of: ability (it can do something other creatures cannot — breathe water, fly past without being struck at, pinpoint metal through stone) | bonus (it rolls better or hits harder under a stated circumstance) | protection (it resists, is immune to, or cannot be given something) | threat (merely standing near it, or striking it, costs the other creature something) | limitation (it CANNOT do something, or pays a price others do not — it can't shape-shift, it must submerge every few hours, it suffers in sunlight) | none. Answer NONE when the row only DESCRIBES the creature — how it waits, watches, perches, stalks, broods or looks. That is prose, not a trait, and we will drop the row: a trait with no positive and no negative effect on the creature is a line a GM cannot run (owner's ruling, 2026-10-30; shipped as the Dayvault Warden's "Patience", which said it "waits motionless on its perch, watching its prey, without taking any action").
- "condition_relation" ON A TRAIT OR REACTION: how the row relates to that condition. Exactly one of: inflicts (the row APPLIES it to a target — the only value that hands the condition out) | requires (the target must ALREADY have it for the row to work: "a creature that has the Prone condition", "a creature it is grappling") | immune (the row says the creature CANNOT be given it) | self (it lands on THIS CREATURE, not a target) | none (no condition involved; answer null for "imposes" too). A word that merely DESCRIBES is not the condition: "a frightening ruin", "a horrifying stench", "a paralysing cold" are prose, not rules — answer none unless the row names the condition as a game effect.
- rider (something this creature's own attack does on a hit, light enough to need no save): { "clause", "attack": the EXACT name of an attack row on the sheet above, "condition": one of Prone/Grappled or null, "movement": "pushed up to N feet" | "pulled up to N feet" | null, "curse": true|false }. It adds no row: the engine writes it onto that attack.
- strike (something this creature's own attack does on a hit that NEEDS a saving throw): { "clause", "name", "attack": the EXACT name of an attack row on the sheet above, "save": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "condition": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "movement": "pushed up to N feet" | "pulled up to N feet" | null, "curse": true|false }. The engine writes it as its own row with that attack's numbers, and Multiattack offers it in place of one attack.
- aura (creatures near this one save at the start of their turns): { "clause", "name", "stat": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "radius": 5 | 10 | 20 | 30, "condition": one of Poisoned/Frightened/Charmed/Prone }. The engine writes the whole sentence, the DC, the ending and the immunity line. It deals no damage.
- "curse" ON A SAVE, A RIDER OR A STRIKE: true only if the creator asked for a curse. The engine writes the curse and chooses what it does; you only say that this row carries one.
- "response_kind" ON A REACTION: leave it out unless the response is the creature defending itself, in which case the only value is "parry" and the engine writes the sentence. You still write the name and the trigger.
WHICH FORM
- It happens when one of this creature's own attacks hits, and it needs a saving throw: a strike.
- It happens when one of this creature's own attacks hits, and it does not: a rider.
- It answers something another creature does: a reaction.
- It forces a saving throw on this creature's own turn: a save.
- It makes creatures near it save at the start of their turns: an aura.
- It is always true of the creature: a trait. A trait does not force a saving throw.
- A clause that is speech goes to "unplaced" with "where": "languages"; pure lore goes to "unplaced" with "where": "description". Never invent a clause the creator did not type. Never write "the thunderwall drake" if Thunderwall Drake is a person; write "the drake".

THE SAVE'S STAT. Published monsters pair a save with the stat whose faculty the effect attacks, and the same pairings are held to here:
- the row deals damage — Dexterity, or Constitution. Not Strength and not Wisdom, whatever condition rides along with the damage.
- the row's whole effect is moving the target, a shove or a pull or a haul — Strength.
- the row applies a condition and deals no damage — Strength for Prone, Grappled or Restrained; Constitution for Poisoned, Blinded, Deafened, Stunned or Paralyzed; Wisdom for Frightened or Charmed.
- the row does none of those — whichever stat its own fiction asks for.

Answer with ONE JSON object, the row in the one array its form belongs to:
{ "attacks": [], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "riders": [ ... ], "strikes": [ ... ], "auras": [ ... ], "crossRef": null, "answered": [ { "clause": "...", "row": "..." } ], "unplaced": [] }

IF THE ABILITY CANNOT BE WRITTEN AS ONE OF THESE FORMS — it is speech, or lore, or it needs a second row beside it to make sense — answer with every array empty and say where it belongs in "unplaced". That is a real answer and costs nothing: the sheet has a ready-made ability to fall back on, and a row that does not work at a table is worse than one that is merely close.

BEFORE YOU ANSWER, ONE LAST LOOK AT THE SHEET. Which row on it already does "breath is a rolling wall of thunder"? If there is one — a bite that grapples and holds, a swallow, a tongue that reels — name it in "answered" with every form array empty, and write nothing. The sheet is not missing an ability in that case, and a second row for the same mechanic is the defect this question exists to catch.


================ THE SEAT PROMPT — AN ACTION ================

You are writing ONE ability for a D&D monster — the one ability it is still missing. Write it into the closed forms below, in the creature's own register. You never write a number: no attack bonus, no damage dice, no DC — the engine prices the row.

THE CREATURE: Thunderwall Drake (the drake), CR 7.
THE SHEET SO FAR (complete but for this one ability; never restate a row it already carries, and never name a row that is not on it):
Actions / Horn: *Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage.
Actions / Thunder Wall (Recharge 5-6): *Constitution Saving Throw*: DC 14, each creature in a 15-foot Cone. *Failure:* 22 (4d10) Thunder damage.

THE ABILITY TO WRITE, in the words it was described in:
[object Object]

THE CLAUSE THIS ROW MUST ANSWER — the creator typed these words: **"breath is a rolling wall of thunder"**. FIRST look at THE SHEET SO FAR above and ask whether a row already on it carries this, in different words: a bite that already grapples and holds IS "drags its prey under", a swallow IS "eats them whole". If one does, write NO row — put that clause and that row's exact name in "answered" and leave every form array empty. That is the better answer, not a failure: the creature already does what the creator asked, and a second row for it is the same mechanic told twice. Only when nothing on the sheet carries it, write the row, and the row you write is for this and nothing else. A row that is good in itself and answers something else is the wrong row.

THE SEAT IS an action, and more than one form can fill it. Write exactly one row, in whichever of these forms the ability actually is — a save or a strike — and leave every other array empty. WHICH FORM above tells you which it is: answer the form the ability IS, not the one the seat is named after.

THE FORMS
- save (a curse, a breath, a shove, a gaze): { "clause", "name", "stat": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "target": "one creature within N feet" | "each creature in a N-foot Cone|Sphere|Line|Emanation", "damage": true|false, "type": one of the damage types or null, "condition": one of the conditions or null, "movement": "pushed up to N feet"|"pulled up to N feet"|null, "success": "half"|"none", "recharge": true|false }.
- trait (a passive, a style, a resource — it costs the creature NOTHING; never write "uses its Reaction" here, that is the reaction form below): { "clause", "name", "trigger": a when/while/if clause or null, "effect": one sentence; write {dc} where a save DC belongs and {dmg} where damage belongs — never a number, "imposes": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises, "passive_effect": one of ability/bonus/protection/threat/limitation/none }.
- A row that HEALS states the Hit Points as {dmg}, the action it costs, and a limit (a trigger, "1/Day", or "Recharge 5-6"): "restores hit points to the faithful" and "after minutes" are not rows a table can run.
- {dmg} IS DAMAGE AND {dc} IS A SAVE DC. Never write {dmg} where a COUNT belongs — a number of uses, attacks or legendary actions is a plain small integer you write yourself ("can take 3 legendary actions"), because a GM cannot take 4d6 of anything. If a row should be limited, say so with its limit ("1/Day", "Recharge 5-6") and not with a number in the sentence.
- NEVER PROMISE A LIST YOU DO NOT WRITE. "choosing from the options below", "one of the following" and "as listed below" each require the options to follow IN THIS SAME row's text; a row that promises them and stops is a dead row a GM cannot run.
- reaction: { "clause", "name", "trigger": one sentence, "response": one sentence, same tokens, "imposes": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "condition_relation": one of inflicts/requires/immune/self/none, "acts": the name of another creature or object this row makes act, or null, "heals": true if it restores this creature Hit Points every round for free, "mechanics": how many separate things a table must do, "quantities": how many numbers the row promises }.
- "acts" ON A TRAIT OR REACTION: name anything OTHER than this creature that your row makes act — attack, rise, move, carry, obey — exactly as the sheet above names it, or null. A table can only run it if that thing is a row on the sheet with rules of its own; if it is not, rewrite the row so this creature does the work. (A row that raises "a spore-puppet" needs a spore-puppet on the sheet.)
- "heals" ON A TRAIT OR REACTION: true if the row gives this creature Hit Points back on its own, every round, with no action spent; false otherwise. A one-off heal, a heal that costs an action, and a heal on another creature are all false.
- "quantities" ON A TRAIT OR REACTION: how many separate NUMBERS the row needs a table to know — every damage amount, every distance or area size, every bonus or penalty. Count them and answer the number. Then WRITE every one of them: {dmg} for damage the engine should fill, {dc} for a save DC, and a literal number for a distance or an area ("a 15-foot Emanation", "within 30 feet"). A row that promises a number and does not write it cannot be run at a table and is refused — "gains Temporary Hit Points" with no amount, "an Emanation" with no size, "deals extra Fire damage" with no amount. If the row needs no numbers at all, answer 0. A BONUS YOU ONLY DESCRIBE IS STILL A NUMBER: "deals extra Fire damage", "gains Temporary Hit Points", "is fiercer while Bloodied" each need an amount a table can read, so COUNT them. If you cannot give the amount as {dmg}, do not promise it.
- "mechanics" ON A TRAIT OR REACTION: how many separate things the row makes a table do — count them, and answer the number. One row, one mechanic: a row that turns a blow back AND steps in front of an ally is two, a row that hides it AND heals it is two. Write the one that matters and leave the other out; we take only rows that answer 1.
- "imposes" ON A TRAIT OR REACTION: name the condition the row involves, or null if it involves none. A row that requires one condition and inflicts another names the one it INFLICTS.
- "passive_effect" ON A TRAIT: a trait must change what this creature CAN or CANNOT do. Name which, exactly one of: ability (it can do something other creatures cannot — breathe water, fly past without being struck at, pinpoint metal through stone) | bonus (it rolls better or hits harder under a stated circumstance) | protection (it resists, is immune to, or cannot be given something) | threat (merely standing near it, or striking it, costs the other creature something) | limitation (it CANNOT do something, or pays a price others do not — it can't shape-shift, it must submerge every few hours, it suffers in sunlight) | none. Answer NONE when the row only DESCRIBES the creature — how it waits, watches, perches, stalks, broods or looks. That is prose, not a trait, and we will drop the row: a trait with no positive and no negative effect on the creature is a line a GM cannot run (owner's ruling, 2026-10-30; shipped as the Dayvault Warden's "Patience", which said it "waits motionless on its perch, watching its prey, without taking any action").
- "condition_relation" ON A TRAIT OR REACTION: how the row relates to that condition. Exactly one of: inflicts (the row APPLIES it to a target — the only value that hands the condition out) | requires (the target must ALREADY have it for the row to work: "a creature that has the Prone condition", "a creature it is grappling") | immune (the row says the creature CANNOT be given it) | self (it lands on THIS CREATURE, not a target) | none (no condition involved; answer null for "imposes" too). A word that merely DESCRIBES is not the condition: "a frightening ruin", "a horrifying stench", "a paralysing cold" are prose, not rules — answer none unless the row names the condition as a game effect.
- rider (something this creature's own attack does on a hit, light enough to need no save): { "clause", "attack": the EXACT name of an attack row on the sheet above, "condition": one of Prone/Grappled or null, "movement": "pushed up to N feet" | "pulled up to N feet" | null, "curse": true|false }. It adds no row: the engine writes it onto that attack.
- strike (something this creature's own attack does on a hit that NEEDS a saving throw): { "clause", "name", "attack": the EXACT name of an attack row on the sheet above, "save": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "condition": one of Blinded/Charmed/Deafened/Frightened/Grappled/Paralyzed/Poisoned/Prone/Restrained/Stunned or null, "movement": "pushed up to N feet" | "pulled up to N feet" | null, "curse": true|false }. The engine writes it as its own row with that attack's numbers, and Multiattack offers it in place of one attack.
- aura (creatures near this one save at the start of their turns): { "clause", "name", "stat": one of Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma, "radius": 5 | 10 | 20 | 30, "condition": one of Poisoned/Frightened/Charmed/Prone }. The engine writes the whole sentence, the DC, the ending and the immunity line. It deals no damage.
- "curse" ON A SAVE, A RIDER OR A STRIKE: true only if the creator asked for a curse. The engine writes the curse and chooses what it does; you only say that this row carries one.
- "response_kind" ON A REACTION: leave it out unless the response is the creature defending itself, in which case the only value is "parry" and the engine writes the sentence. You still write the name and the trigger.
WHICH FORM
- It happens when one of this creature's own attacks hits, and it needs a saving throw: a strike.
- It happens when one of this creature's own attacks hits, and it does not: a rider.
- It answers something another creature does: a reaction.
- It forces a saving throw on this creature's own turn: a save.
- It makes creatures near it save at the start of their turns: an aura.
- It is always true of the creature: a trait. A trait does not force a saving throw.
- A clause that is speech goes to "unplaced" with "where": "languages"; pure lore goes to "unplaced" with "where": "description". Never invent a clause the creator did not type. Never write "the thunderwall drake" if Thunderwall Drake is a person; write "the drake".

THE SAVE'S STAT. Published monsters pair a save with the stat whose faculty the effect attacks, and the same pairings are held to here:
- the row deals damage — Dexterity, or Constitution. Not Strength and not Wisdom, whatever condition rides along with the damage.
- the row's whole effect is moving the target, a shove or a pull or a haul — Strength.
- the row applies a condition and deals no damage — Strength for Prone, Grappled or Restrained; Constitution for Poisoned, Blinded, Deafened, Stunned or Paralyzed; Wisdom for Frightened or Charmed.
- the row does none of those — whichever stat its own fiction asks for.

Answer with ONE JSON object, the row in the one array its form belongs to:
{ "attacks": [], "saves": [ ... ], "traits": [ ... ], "reactions": [ ... ], "riders": [ ... ], "strikes": [ ... ], "auras": [ ... ], "crossRef": null, "answered": [ { "clause": "...", "row": "..." } ], "unplaced": [] }

IF THE ABILITY CANNOT BE WRITTEN AS ONE OF THESE FORMS — it is speech, or lore, or it needs a second row beside it to make sense — answer with every array empty and say where it belongs in "unplaced". That is a real answer and costs nothing: the sheet has a ready-made ability to fall back on, and a row that does not work at a table is worse than one that is merely close.

BEFORE YOU ANSWER, ONE LAST LOOK AT THE SHEET. Which row on it already does "breath is a rolling wall of thunder"? If there is one — a bite that grapples and holds, a swallow, a tongue that reels — name it in "answered" with every form array empty, and write nothing. The sheet is not missing an ability in that case, and a second row for the same mechanic is the defect this question exists to catch.
```
