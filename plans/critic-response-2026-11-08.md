# Critic response — gate 2026-11-08 (sweep T05-42-47)

Written by Fable for whoever implements next (Opus). No conversation history is assumed. Every
mechanism below was traced on the saved run before it was written down; the sheet index is
given with every row name because a name without its index misdirected the critic once.

**Trigger for this plan:** the critic's full read of `smoke-out/sweep-2026-11-08T05-42-47/all.md`,
pasted 2026-11-08. Verdict Keeper 10 / Runs 18 / Tweak 8 / **Fix 4** / ‼ 0 — the best forty so far.
Release bar is `fix <= 2`. The critic's own line: *"Land §2a and this forty ships at 0 Fix."*

Delete this file when the §2a items land and the fix count is re-read.

## 0. What the four Fixes have in common

All four are classes the engine already has a check for, and the check did not reach ship.
That is the finding, not the four rows. Fix the paths, not the instances.

| # | sheet | row | critic's fix | why the existing check missed |
|---|---|---|---|---|
| 18 | Ossuar the Bone Sun | Multiattack | drop "to cast Hold Person" | `multiattack-offlist-spell` lives in `sheet-lints.mjs`, which the pipeline NEVER calls |
| 26 | Marshena Debtbinder | Multiattack | drop "(B) ... Ray of Sickness" | same |
| 25 | Black Iron Sentinel | Iron Root | "...Emanation originating from the sentinel" | seat-authored; the authoring form validates the shape but never writes the origin |
| 16 | Brass Tyrant | Forge Sovereign | "As a Bonus Action, ..." | `authored` + clause-bound but NOT `freeRow`, so no actuator reaches it |

## 1. Ordered work

### 1a. Wire the sheet lints into the pipeline (closes #18, #26)

**Measured:** `grep -rl "lintSheet(" src scripts` → `sheet-lints.mjs` itself and `scripts/lint-run.mjs`.
Nothing in `generate.mjs`. The pipeline's `lint:` trace (generate.mjs:9021/9245) is `lintStatblock`
from `format-2024/lint.mjs`, which has **no** offlist rule (`grep -c offlist` = 0). Run offline on the
saved JSON, `lintSheet` fires on both sheets: `offers to cast "Hold Person", which is on no spell
list this sheet has`. So the lint is correct and unreachable — the same shape as the audit's
rewrite arm (dead gate, 2026-11-05) and the shelf guard (one path of four, 2026-11-07).

**Do:** call `lintSheet(monster)` beside `lintStatblock` at 9021 and merge its findings into the
same `lint.findings` the trace prints. It must run **after** `multiattack replacement clause:` is
written (it is: trace order on #18 is 173 clause → 178 re-read → 179 lint) and before the
last-word pass at ~9779.

**Then act on it:** `repairReplaceClause` (checker.mjs) already degrades a replace clause
lettered → single option → absent when an OPTION names a dead row. Extend its `resolves`
predicate so an option whose `to cast *X*` spell is on no list the sheet carries is dead too —
the list reader is already written inside the offlist lint (`lists = rows that OFFER spells`).
Reuse it; do not write a second list reader. On #18 the clause has already fallen to its
single-option form (trace 178: `"(empty)" is not on this sheet, so the clause falls to its
single-option form`) and that single option is the off-list spell, so the result is "absent",
which print's commonest Multiattack carries.

**Predict before landing:** both sheets' Multiattacks lose the clause; `sheet-lint findings`
on the next forty is no longer 0 by construction — it will report what the offline lint
reports. State the expected count from `scripts/lint-run.mjs` on this run first.

**Test:** replay #18 and #26 (`smoke-out/sweep-2026-11-08T05-42-47/{18,26}-*.json`) through
`lintSheet` — both fire; through the repair — the clause is absent and the Spellcasting row
is untouched. Print no-op: 0 of 178 print Multiattacks rewritten.

### 1b. A seat-authored area row carries its origin (closes #25)

**Measured:** Iron Root is `authoredSeat=true` (not a template). Shipped 2014: `Each creature in
a 10-foot-radius sphere must succeed on a DC 16 Strength saving throw...` — no centre.
other_edition 2024: `each creature in a 10-foot Emanation. *Failure:*` — **also no origin**. So
the 2014 converter did not drop it; it was never written. `author.mjs:28 TARGET_OK` accepts
`each creature in a \d+-foot (Cone|Line|Emanation)` with no anchor while REQUIRING `centered on
a point within \d+ feet` for Sphere/Cube; the comment at :24 says an Emanation "comes from the
creature by definition." Print writes the anchor every time: "in a 20-foot Emanation originating
from the creature" (every Emanation row in the corpus).

**Do:** anchor the **Emanation only.** This item as first written said "Cone, Line or
Emanation"; print refused two of the three when Opus measured it before building (2026-11-08):

    Emanation: 33 of 34 mentions carry "originating from"   -> anchor it
    Cone:       0 of 55                                      -> leave alone
    Line:       0 of 24                                      -> leave alone

"each creature in a 60-foot Cone" is print's own complete form, and anchoring cones would have
made 55 print-shaped rows unlike print. Landed in `forms.mjs renderForm` (not `authoredRow`),
so one change covers both printings and every authored caller: an Emanation target without
`originating from` gets ` originating from {anchor}`, where `anchor` is an optional form field
the save caller fills with the creature's inline — no anchor, no change, so no other caller
moved. The 2014 branch then renders its own aura idiom, "each creature within 10 feet of the
sentinel", instead of the centreless "10-foot radius" that shipped on #25. Do NOT change
`TARGET_OK` to require the phrase from the model; the engine owns the anchor the way it owns
`{dc}`. Measured scope: 11 of 11 authored area rows across the three saved forties shipped with
no anchor — ~3-4 a forty. Tests: `emanation-anchor.spec.js`, which pins print's three rates.

**Predict:** `condition-duration`/adjudicability findings about an unanchored area on authored
rows → 0. Grep the three saved fortys for seat-authored Emanation/Cone rows lacking
`originating from` to state the before-count first.

**Test:** the real Iron Root answer (its `seatRow` fields are in the trace) renders with the
origin in both printings; a Sphere target still requires its centre.

### 1c. An authored row that is not free can still be repaired (closes #16)

**Measured:** Forge Sovereign stamps: `authored, clause, clauseId` — **no `freeRow`**. The
clause-repair arm wrote it (`repair: 1 clause with no row — "rules a city of forges"`). The audit
flagged it: `The trait depends on an undefined...`. `free row repair` calls on the sheet: 0,
because the free-row repair (2026-11-05) selects `row.freeRow` only. The critic's one-phrase fix
is an action economy: "As a Bonus Action, the brass tyrant commands...".

**Do (narrow):** widen the free-row repair's selection from `row.freeRow` to
`row.freeRow || row.authored` — a repair-authored row is as much the engine's own writing as a
free row, and it is exactly what the owner's ruling was for ("a flagged row is repaired, not
dropped"). Keep every existing refusal (print, template, library, chassis). Keep the cap at 2.

**But first measure the prize and the risk:** across the three saved fortys, count audit findings
on rows stamped `authored` and not `freeRow`. If it is ~1 per forty, this is the right size; if
it is 10+, the cap and the 1-of-7 apply rate (see §3) make it a cost with little return, and the
better fix is at the clause-repair writer (author.mjs `buildRepairPrompt`): a TRAIT whose
`effect` deals damage must declare an economy or a frequency, which `parseAuthorResponse`
already enforces for heals ("an unquantified heal is refused: it must carry {dmg} and a trigger
or a limit"). Extending that refusal from heals to damage-dealing traits is the smaller change.
Decide on the count.

### 1d. A clause-bound row outranks a decoration in the free-row budget (critic §6, #17)

**MEASURED 2026-11-08 (three fortys T03/T05/T09, 120 sheets) — and the first measurement of
this was WRONG; the corrected figures are below.** 34 `free row over budget` evictions. 26 of
them evicted a **seat-authored** row, which I first reported as "26 evicted a GM-asked row" —
that conflated "no template fit this seat's mechanic" with "answers something the GM typed".
Split properly by what the seat carried: **5** on a seat holding the GM's clause (`taste stands
down` fired), **9** handed a clause by `gmAsked`'s third tier (whose own trace says it "buys no
coverage credit"), **12** with no clause at all — correctly budget-governed free rows.

**The decisive number** (`checkBlock(sheet).fidelity.dropped`, the exact list `clause-rate.mjs`
scores the 85% bar against): of the 34 evictions, **7 dropped a clause the shipped sheet then
owed**; 6 were credited anyway by another row; 13 carried no clause. So the prize is **7 of the
39 current misses — 73% -> 78%**, not the "up to 26 of 39" first claimed. The seven:
#16 Molten Decree ("rules a city of forges"), #17 The Ledger's Due and #17 Harvest the Sworn
("collects the oaths of dying knights", two sweeps), #20 Drowning Song ("song drowns fleets"),
#12 Spore Choke ("commands lesser swarms"), #30 Engulf the Consecrated ("digests reliquaries"),
#39 Outlasted Steel ("closes with a shortsword").

The rank site's own comment asserted the invariant this breaks: *"a row the GM's own words asked
for earns clause credit and never becomes free."* It was a claim, not a rule — `generate.mjs`'s
seat-authoring site marked every authored row free regardless. A rule held past its evidence, in
its own words.

**LANDED (owner approved 2026-11-08).** One site, because the other three `markFreeRow` calls
already sit behind `!gmAsked(...)`: at the seat-authoring site a seat carrying `idea.clause` (the
same field the menu reads to stand taste down) no longer marks its row free, stamps the clause on
the row, and does not spend the allowance. The plan's original one-token rank fix landed too
(`(e.gmQuote || e.clause) ? 0`) for any free row that still carries a clause by another route.

**Honest cost, corrected:** the card ceiling sheds only `accepted_closest` (owner, 2026-10-29:
"a row the call actually CHOSE keeps the budget it always had however crowded the card is"). So a
clause row counting as fixed does NOT evict a chosen free row — it tightens the room left for a
borrowed one. Cost is one row longer on the 7-13 affected sheets of 120 (6-11%), plus a
nearest-match row shed a little more often. My first write-up of this claimed "a crowded card
sheds the surprise rather than the ask"; that was wrong and is corrected in the code comment.

**Still open, with its number:** 2 of the 7 were the `handed` tier, which this fix does not
reach (no `idea.clause` at authoring time; the clause arrives later at the print-body gate).
Worth 2 hits over three sweeps. Deliberately not bundled — exempting tier 3 means calling a
handed clause a receipt, which contradicts its own trace, and that is an owner question.

### 1e. Print's attack list is locked on a print body (critic §2b, #17 and #01)

**MEASURED 2026-11-08 (Fable, same three fortys) — exposure is 8 sheets of 120, as predicted
bounded.** `print canon attack:` lines vs print's attack rows: **Pit Fiend 3 of 3 sheets short**
(mapped 1, 2, 2 of 3 — Fiery Mace never arrives); **Skeleton twist 2 of 2 short** (#38, mapped 1
of Shortsword+Shortbow); Owlbear (Rend, 1) and Goblin Boss (2) are whole. **Dire Wolf 3 of 3
ship "makes two Bite attacks"**; print's Dire Wolf has Bite and no Multiattack.

Two mechanisms, one principle.

**#01 Dire Wolf, two Bites (8 of 10 rolls).** Print's Dire Wolf: `Pack Tactics | Bite`, **no
Multiattack**. The twist ran print canon for defenses, array and speed (trace 98-132) but
`generate.mjs:7577` writes print's Multiattack only `&& pc.multiattack` — when print has none,
nothing touches the donor's `makes two Bite attacks`, so it ships. **Do:** in the same block,
when the body is print's and `pc.multiattack` is absent, remove the chassis Multiattack (print
makes one attack here by fact, not by rule). Trace it. Predict: the Dire Wolf ships one Bite;
no other sheet changes unless its print body also lacks a Multiattack — list those first.

**#17 Pit Fiend, Fiery Mace absent (2 of 2 rolls).** The critic asks "where the Mace row
leaves". **It never arrives.** Trace 163-165: the twist produced two attack rows, print canon
mapped them (`Oathbrand -> Bite`, `Claw -> Devilish Claw`), then pasted print's three-name
Multiattack; the pool form (2026-11-05) made the sentence print-shaped without the Mace. The
pool form was the owner's approved compromise for CR math; the critic's position is that on
twist/exact paths print's attack list is locked and the authored row only adds a replace clause.

**RULED (owner, 2026-11-08): lock, on twist and exact paths only.** A GM who typed "Pit Fiend"
wants the Fiery Mace. The pool form stays as the repair for a row genuinely shed LATER in the
pipeline; it is no longer the answer to a row print has that the twist never wrote.

**Do:** in the print-canon attack block (generate.mjs ~7470-7580, where `print canon attack:`
maps the twist's rows onto print's names), after the mapping and BEFORE `print canon
multiattack:` is written: for every print attack row in `pc.meleeRows`/`pc.rangedRows` that no
twist row was mapped onto, add print's own row — name, text, numbers — stamped `print: true`
exactly as a mapped row is. Then print's Multiattack is pasted over a sheet that carries every
row it names, and `multiattack list re-read` has nothing to do. Paths: `pc.exact` and the twist
(`pathD.path === 'twist'`); never borrow, never homebrew.

**Predict before landing:** on #17 the sheet carries Bite, Devilish Claw AND Fiery Mace, the
Multiattack is print's verbatim, and `multiattack list re-read` does not fire. Across the three
saved fortys, count twist/exact sheets where `print canon attack:` lines < print's attack-row
count — that is every sheet this touches; list them with indices before building. The
2026-11-05 corpus query found only four print monsters whose counted Multiattack names three
rows (Barbed Devil, Chimera, Medusa, Pit Fiend), so the exposure is bounded.

**Cost to state honestly:** one more fixed row on a card whose free-row budget is already 0 at
CR 20 (trace 2026-11-05: "budget is 0 rather than 1"). The twist's own authored row still lands
as the Multiattack's replace clause, which is the critic's stated model. If the card-size
ceiling (`PRINT_CARD_ROWS`) then evicts the twist's row, trace it and bring it back here —
do not widen the ceiling to make room.

**Test:** replay #17's saved sheet (`smoke-out/sweep-2026-11-08T05-42-47/17-pit-fiend.json`,
other_edition is the 2024 form) through the print-canon block with the real print Pit Fiend:
three print attack rows ship, Multiattack is print's sentence, 0 re-reads. Print no-op: a
bare-name exact sheet is byte-identical to print (the release bar's 3-of-3). A borrow sheet
is unchanged.

### 1f. The creature noun wins over the occupation (critic §2b, #04)

**Measured:** `[path] class_npc — class cleric — "bell-ringer"` and `[route] lurker-phantom
type=Undead`. Trace 121: `[path] decides: class_npc on the Priest · class cleric (the matcher
would have said homebrew)`. The Priest body shipped: Mace, Divine Aid, Spirit Guardians, STR 16,
Medicine +7, type Undead and nothing else ghostly. 11-05 shipped the full 2024 ghost kit for the
same string. **Do not** add a word rule for "ghost". Both calls already answered; the engine
chose between them by fixed precedence (class over route). **Do:** when the path call names a
class AND the route call names a print body or type that is not a Humanoid (Undead, Construct,
Beast...), the body wins and the class becomes a kit on it — the same way Brother Halric (#40)
rightly gets the Priest because nothing else was named. Measure first: how many sheets per forty
have a class path AND a non-Humanoid route type.

### 1g. A target's state is a mechanical clause (critic §2e, #29)

**Measured:** `"ring themselves over the dying" -> has (descriptive)`. The trait seat then took
`fear-aura` as closest-accepted for "an aura that chips away at wounded creatures". The
MECHANICAL definition in the extraction prompt (generate.mjs:588) lists: a body part it strikes
with, anything it does TO creatures, a substance it exudes, a mount, a carried object — and
**nothing about a clause keyed to a target's state**. Yet the same schema's `when` field already
carries `when_bloodied` as a trigger enum, so the schema knows state triggers exist.

**Do:** one example in the prose, not a regex: *"'tolls for the dying' is mechanical (a trigger
on a creature's Hit Points); 'sings the dying into its ranks' is mechanical (a condition on a
target's state)"*. Then measure on the saved fortys how many clauses containing
dying/wounded/Bloodied/at 0 Hit Points were filed descriptive — that is the prize. Note the
interaction with the 2026-11-06 scoping ruling (descriptive clauses are excluded from the hit
rate): a mechanical clause mislabelled descriptive now vanishes from the score instead of
counting as a miss, so this misclassification is invisible to the bar until the label is right.

### 1h. A formation trait (critic §2f, Vashka 9 of 10 bare)

The subject-flip gate (2026-11-06) correctly refused `slow-bolt` for the shield-wall idea and
nothing replaced it. The missing shape is an adjacent-ally buff: *while an ally is within 5 feet,
both ...* — shield wall, phalanx, pack, choir-in-one-voice all route to it. Print has the pieces
(Pack Tactics, Aura of Authority). **Do:** one new trait template, print's grammar, `effect:
'defense'` declared (so the free-row floor does not price it by damage — 2026-11-05 ruling),
with the `roles` set wide enough that a defender/skirmisher person reaches it. Measure first how
many clauses across the fortys name an ally-adjacency condition; Vashka alone is 9 of 10.

## 2. Owner rulings carried by this plan

**Print's attack list is locked on twist and exact paths (owner, 2026-11-08, on Fable's
recommendation).** The pool form (2026-11-05) was the approved answer to #17 when the question
was "a row was shed — how do we keep the attack count?" The critic's read showed the row was
never written, not shed, and that the pool form hides the gap rather than restores it. Both
were true; the ruling is that fidelity wins on a print body — a GM who typed "Pit Fiend" wants
the Fiery Mace — and the pool form keeps its job for the case it was actually built for, a row
shed later in the pipeline. Built as 1e-#17 above. Scope is bounded: four print monsters name
three attack rows in a counted Multiattack.

Everything else in this plan needs no new ruling; each item cites the standing ruling it rests on.

## 3. What the critic answered about our own open questions (recorded, no action)

- **Free-row repair:** 7 calls, 1 applied — and the one that landed (#28 Living Shadow) is
  better than what it replaced. The six declines were all correct to leave standing. The
  critic's diagnosis of the declines is precise and should drive the next change to that
  prompt: *"the 'answer held no row' declines are all on rows the audit faulted for an unstated
  trigger or anchor ... one-clause fixes a form should be able to make; if the form returns
  nothing on a one-clause fault, it's being asked the wrong question."* The repair asks for a
  whole re-authored row; the fault is a missing clause. 1b fixes the anchor case at the writer;
  the trigger case wants the repair to ask for the missing clause, not a new row.
- **#29 as a monster:** plays as a CR 13-15 brute with an undead skin. Nothing on it is a swarm
  of bells over the dying except the name — that is 1g, not the swarm change.
- **#14 Moraine Heart and #36 Chorveth (the two checker FAILs):** both Tweak-grade at the
  table; the classes are right, the severity is a style call. Not release blockers.
- **Untested fixes confirmed untested:** no snare rolled (0 restrain-until-destroyed rows); no
  sheet imposed Prone three times (Krennik: two). The breakable-object bound and the shelf guard
  remain unverified on a run.
- **Refusal on the audit-reorder item accepted** on the numbers; the replacement item is 1d.

## 4. Stuck items the critic tracks (10-roll rates) — not this plan's scope

Drake breath always a 15-ft cone (10/10); sexton "for the dying" (0/10, see 1g); hobgoblin
species on Vashka (1/10); elf traits on Ilvareth (0/10); "a skeleton with a greatsword" → CR 6
(every gate); returning-handaxe rider on the Shortsword (5/5); Siege Monster on the siege golem
(~2/10); tyrant rulership (3/10, landed this roll as Forge Sovereign — 1c). Pick these up after
the fix count reads 0.

## 5. Measurement discipline for whoever lands this

- Measure the PATH before the fix: count how often the row/door in question actually runs on
  the three saved fortys (`sweep-2026-11-05T21-20-56`, `sweep-2026-11-08T03-08-42`,
  `sweep-2026-11-08T05-42-47`). Two fixes this week were correct and reached one row per
  two fortys.
- State the predicted number before landing, then run the targeted twelve, then the forty.
- Rows have two printings: read `r.text ?? r.description`, sections AND flat arrays. Exclude
  `all.md` when globbing a run directory. A row may have been RENAMED by print canon or the
  audit — check before calling it missing.
- A guard that skips is worse than a parser that errors: when bounding a gate by CR, read the
  CR off the sheet with a fallback and FIRE when it cannot be read (the swarm gate, 2026-11-08).
- Two not-in-scope identifiers slipped past the build this week (`TEMPLATE_BY_ID` for `BY_ID`;
  `cr` in a checker block). A swallowed ReferenceError inside a try/catch reads as a soft
  `checker-error`, not a crash. Run the gate on a fixture and assert it FIRED, not just that it
  did not throw.
