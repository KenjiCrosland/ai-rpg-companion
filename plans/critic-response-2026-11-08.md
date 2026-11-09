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

**MEASURED 2026-11-08 (Fable, three fortys T03/T05/T09, 120 sheets) — exposure is bounded, both
mechanisms listed below with indices. READY FOR OPUS; 1d landed first and moved this file's line
numbers by ~35, corrected here.**

*Missing print attack row (mechanism #17):* `print canon attack:` lines vs print's attack rows —
**Pit Fiend #17, 3 of 3 sheets short** (mapped 1, 2, 2 of 3; Fiery Mace never arrives);
**Skeleton twist #38, 2 of 2 short** (mapped 1 of Shortsword + Shortbow). Owlbear (Rend) and
Goblin Boss (Scimitar, Shortbow) are whole.

*Chassis Multiattack on a print body that has none (mechanism #01):* **the Dire Wolf alone,
3 of 3** ("makes two Bite attacks" over print's verbatim Bite — +5, 8 (1d10 + 3), print's Prone
rider — so 16 damage a round against print's 8 at the same CR). Three false leads were on the
first exposure list and are refuted:
- **Skeleton #38 was NOT a defect.** Those sheets are CR 6 on a `brute-5` donor borrowing only
  the Skeleton's row NAMES; their "two attacks, using Greatsword or Shortbow in any combination"
  is the pool form a CR 6 brute is priced for. Print's CR 1/4 Skeleton says nothing about a CR 6
  one, and stripping it would have under-priced three sheets. **This is why the landed gate
  requires `nearPrintCr(cr, pc.cr)`: print's attack COUNT may only govern where print's NUMBERS
  already govern.** Dire Wolf CR 1 on print's CR 1 passes; Skeleton CR 6 against 1/4 does not.
- **Vampire #11** DOES have one — print's row is `Multiattack (Vampire Form Only)`, which
  `printCanonFor` already matches with `/^Multiattack\b/i`. The bare-name detector was at fault.
- **Spy #33** has none in print, but that sheet is a `class_npc` path, outside the ruling's scope.

**LANDED 2026-11-08 (Opus).** Mechanism #17: the block that already added print's melee rows
when the chassis carried NONE is generalised from "none" to "fewer than print names" — because
the rename pass pairs positionally, the unmapped print rows are always the TAIL, so the add-back
is `pc.meleeRows.slice(addFrom)` with `addFrom = 0` when the chassis has no melee row (today's
behaviour on every path it already served) and `meleeRows.length` on `pc.exact || isTwist`. A
borrow or class-NPC sheet with a partial list keeps it: `addFrom` runs past the end and the loop
adds nothing. Mechanism #01: an `else if` on the Multiattack paste gate strips the chassis
Multiattack when `printBody && (pc.exact || isTwist) && !pc.multiattack && nearPrintCr(cr, pc.cr)`.
New spec `print-attack-list.spec.js` asserts the corpus data and both gates, including the
Skeleton refusal. 4931 tests pass, build clean.

**Anchors, as of the 1d landing:** the mapping trace `print canon attack:` is at
`generate.mjs:7591`; the paste gate is at **7612**:
`if ((pc.exact || (pc.borrowOnly && nearPrintCr(cr, pc.cr))) && pc.multiattack)`. Note the
`borrowOnly` arm — it already pastes print's Multiattack onto a near-CR BORROW. The ruling says
never borrow for the lock: add the missing-row step and the strip-when-absent step under
`pc.exact || pathD.path === 'twist'` ONLY, and leave the borrow arm as it is. Do not refactor the
gate's shape to make the two paths look alike.

**Replay sheets:** `smoke-out/sweep-2026-11-08T05-42-47/17-pit-fiend.json` (Mace absent),
`smoke-out/sweep-2026-11-08T09-06-59/01-dire-wolf.json` (two Bites), and `.../38-formation-drill-
skeleton.json` (both mechanisms on one sheet: one of two attack rows, plus a Multiattack print
lacks). Twelve after landing: #01, #17, #38 × 2 rolls each, plus #21 Owlbear (exact no-op),
#22 Goblin Boss (whole list, must not change), #11 Vampire (has a Multiattack — must keep it),
and one borrow sheet (unchanged).

Two mechanisms, one principle.

**#01 Dire Wolf, two Bites (8 of 10 rolls).** Print's Dire Wolf: `Pack Tactics | Bite`, **no
Multiattack**. The twist ran print canon for defenses, array and speed (trace 98-132) but
`generate.mjs:7612` writes print's Multiattack only `&& pc.multiattack` — when print has none,
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

**Do:** in the print-canon attack block (generate.mjs ~7500-7625, where `print canon attack:`
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

**MEASURED 2026-11-08 (three fortys, 120 sheets) — THE DIAGNOSIS IN THIS ITEM IS REFUTED.**
It says "the engine chose between them by fixed precedence (class over route)". It does not:
the engine honours the path call, and **the path call itself flips.** Same input
("a chapel bell-ringer's ghost that tolls for the dying") three times:

| run | the path call decided | Priest-kit rows |
|---|---|---|
| T03 | **twist on the Ghost** (right) | 0 |
| T05 | class_npc on the Priest (the defect) | 1 |
| T09 | **twist on the Ghost** (right) | 0 |

The route is stable and right all three times (`lurker-phantom type=Undead`).

**The route TYPE is not the discriminator this item proposes.** class_npc + a non-Humanoid
route type is 4 of 120 sheets — and **3 of the 4 are Brother Halric**, whom this item itself
says rightly gets the Priest (his description is empty; the route guessed `type=Undead` from
nothing, and the engine already overrode it to ship `Medium humanoid`). So the rule as written
would break 3 sheets to fix 1. What actually separates #04 from Halric is the route's STYLE
(`phantom` vs `leader`), not the type.

**Recommendation:** this is a PROMPT fix, which is also what the item's own title says — the
path prompt should rank a creature noun in the GM's words above an occupation, and the trace
already shows the call quoting its key (`class cleric — "bell-ringer" (call)`). Do NOT add an
engine precedence rule. Exposure is **1 defect in 120 sheets**, a coin flip on one concept, so
by [[the-verdict-is-the-threshold]] this is the lowest-value item remaining.


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

**MEASURED 2026-11-08 (three fortys; 117 sheets carry a clauses line, the other 3 are the bare
Ancient Gold Dragon, which has no clauses by design).** Clauses naming a target's state
(dying/wounded/Bloodied/at 0 Hit Points): **7 filed mechanical, 2 filed descriptive** — so the
classification is already right 78% of the time. The two misses:
- #17 "collects the oaths of dying knights" (T03)
- #29 "ring themselves over the dying" (T05)

**Prize: 2 clauses over three sweeps**, and note the direction — a clause mislabelled
descriptive is EXCLUDED from the hit rate, so fixing the label moves these from invisible into
the denominator and can make the published rate look worse before it looks better. Still worth
the one prose example (no regex), but it is not a rate win.


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

**MEASURED 2026-11-08 (three fortys) — THE PREMISE HOLDS, AND THIS IS THE BEST REMAINING
LEVER.** Ally-adjacency clauses are classified correctly: **8 mechanical, 1 descriptive.** The
engine knows they are rule requests and has nothing to answer them with — a missing template,
exactly as this item says. Cross-referenced against `clause-rate.mjs 3`, these are the clauses
and their miss counts:
- #23 Vashka "fights from a shield wall" — 1 of 3 (**2 misses**)
- #23 Vashka "never breaks ranks" — 1 of 3 (**2 misses**)
- #10 Drowned Choir "sings in one voice" — 1 of 2 (**1 miss**)

**Prize: 5 of the 39 misses** behind the 73% rate — more than 1f (1) and 1g (2) combined, and
the second-largest measured lever after 1d. Build this one next.


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

---

## 7. Gate 2 response — critic's read of sweep T23-27-58 (2026-11-08, Fable)

Critic's counts: **14 Keeper / 21 Runs / 3 Tweak / 2 Fix** (prior gate 10/18/8/4). The §2a defect
classes are at 0 of 40; the claim held for what it named. Eleven concept rows landed that had been
missing for rolls — the payoff of 1d, bigger than the 73→78 clause-rate move shows.

Every number below is measured on `smoke-out/sweep-2026-11-08T23-27-58/` (traces + JSON) unless
marked *(critic)*. Six of six of the critic's checkable specifics verified exactly.

### 7.0 One attribution to correct before building

The critic wrote that both Fixes sit "on rows that 1d protected". **They do not.** Both are
**free signature rows** — the trait seat authored them, could not quote the GM, and the budget of
one KEPT them (traces: `free signature row: "Chorus of the Dying Breath"`, `free signature row:
"Rotting Toll"`). 1d's protected rows on those sheets are "Peal for the Dying" (#29) and nothing on
#05. The critic had no traces, so the guess was reasonable; the consequence is that the fix lives in
the **authored-row resolver**, not in 1d, and governs all 27 seat-authored rows that shipped this
forty, free or protected.

### 7a. Authored-row rigor — the critic's three checks, plus two from §3b (CLOSES BOTH FIXES)

**Population:** 27 seat-authored rows shipped. **Hits, measured with renames followed and dice
checked per PHRASE** (a first pass read 0/0/0 because it matched trace names against shipped names
and tested dice per sentence — the HP die in "regains 9 (2d8) Hit Points, its Slam deals extra
Thunder damage" hid the die-less phrase):

| check | hits / 27 | rows |
|---|---|---|
| 1. a damage phrase with no die | 1 | #05 Chorus: "deals extra Thunder damage" |
| 2. a target-state word with no threshold | 1 | #29 Rotting Toll: "wounded" |
| 3. the row contradicts a trait on the sheet | 1 | #29 Rotting Toll regains HP; Swarm says it can't |
| 4. an always-on damage aura with no save and no immunity *(critic §3b)* | 1 | #10 Airless Antiphon |
| 5. an off-turn triggered attack that costs no Reaction *(critic §3b)* | 1 | #15 Scar-Socket Vigil |

(A #17 hit on check 3 was my regex: "can't regain Hit Points" there is a rider on the TARGET.)

**Where:** the seat-authoring refusal chain (`generate.mjs` ~5695-5710) already refuses a dangling
ref, an unfilled slot, an unmet condition and an undefined actor. These are five more arms of the
same gate — a row the call wrote is asked the same questions a template is asked. House rule: the
CALL answers them. Checks 1 and 2 are declared data the author schema already has or nearly has
(`quantities`, `when_bloodied`): a bare "extra X damage" is a promised number not declared → the
resolver prices it or refuses; a state word must resolve to Bloodied / 0 Hit Points by the call's
own field, never a word table. Check 3 goes to the AUDIT, which already reads the whole sheet and
already carries an `element_claims` contract — add a `contradicts` ask per authored row ("does this
row's effect contradict a trait on this sheet? quote both or null"). Checks 4–5 are print facts:
print's free auras carry a save and 24-hour immunity; an attack made outside the creature's turn is
a Reaction. **Predict:** the two Fixes → Runs; 5 of 27 authored rows change; no template row moves.

**Opus notes for 7a.** (i) The refusal chain's existing arms are `dangS` / `slotS` / `unmetS` /
`actS` at ~5695-5710; add the five beside them with the same trace shape (`seat authoring
refused:` names the arm and the words). (ii) Prefer REFUSE-then-REPAIR over a text patch: a bare
"extra X damage" is a promised quantity the author call did not declare (`quantities` is already
in `parseAuthorResponse`); send the row back through the repair call asking for the die, as the
free-row repair already does. (iii) Check 2 resolves by the call: the author schema's `when` enum
already carries `when_bloodied`; a state word with no declared threshold is refused, not mapped
by a table. (iv) Check 3 is the audit's: extend `element_claims` (audit.mjs:205-230) with a
`contradicts` ask per authored row — "does this row's effect contradict a trait on this sheet?
quote BOTH spans or null" — and act on a quoted pair the way `element claim revoked` acts. (v)
Checks 4–5 are print facts, so they are engine validation, not word rules: an always-on damage
aura without a save + 24-hour immunity gets print's clause (`conditionClauseFor` / the aura
template's own grammar); an attack that fires outside the creature's turn is moved to Reactions
with a `Trigger:`/`Response:` frame. Replay sheets: `smoke-out/sweep-2026-11-08T23-27-58/05-*.json`,
`29-*.json`, `10-*.json`, `15-*.json`. Follow renames when reading traces: the trace says "Chorus
of the Dying Breath" and "Rotting Toll" are the names the seat wrote, and the audit may rename
again.

### 7b. Q1 answered — an execute row is not a nova

A gate is an **explicit use-limit token** (Recharge N–M, X/Day, "can't use again until…"), nothing
read from effect text. Print has both forms: Bodak's Death Gaze at-will, Banshee's Wail 1/Day.
**Do:** drop `\bdrops to 0 Hit Points\b` from `TEXT_GATE` (`generate.mjs:1709`); the checker's
`novasOf` and the engine's one-nova rule then share one predicate. Exposure: 1 in 160 (#31).

### 7c. Q2 answered — a handed clause protects a row IF the row states the clause's effect

12 handed rows shipped this forty. **Do:** reuse the audit's `element_claims` contract with the
handed clause as the claim; if the audit quotes the words of THAT ROW carrying it, stamp the row
clause-bound (not free, as 1d does for `idea.clause`); if null, it is a decoration near a clause
and the budget may take it. Prize measured 2026-11-08: 2 of the 7 clause-costing evictions across
three fortys. "Buys no coverage credit" stays true as a scoring fact.

### 7d. 1h — the formation template (the critic's shape; 5 of 39 misses)

One trait template, `effect: 'defense'`, Pack Tactics' grammar:
*"[Name]. While [X] is within 5 feet of an ally that doesn't have the Incapacitated condition,
[effect]."* Effects, print-shaped, chosen by the fit call from a short declared list: +2 AC ·
can't be moved against its will and can't be knocked Prone · Advantage on saves vs Charmed and
Frightened · shares a Resistance with the adjacent ally. Never adds damage (Pack Tactics / Aura of
Authority are print's offensive side). Keys are the library's existing `keys` mechanism (rank and
gate; the call decides) — not a new word table. *(critic)* "never breaks ranks" trips the LACKS
reader; check that before extraction. Test case: Vashka #23, 10 of 11 bare.

### 7e. 1e's siblings — print's other lines on a print body (measured this forty)

| line | twist/exact sheets drifting from print | examples |
|---|---|---|
| **saving throws** | **14 of 15** | Goblin Boss gets DEX +4 (print lists none); Vampire loses DEX/WIS/CHA proficiency; Pit Fiend loses DEX, gains STR/CON |
| senses | 3 of 15 | Pit Fiend truesight → darkvision; Lich truesight → darkvision 60; Stone Golem 120 → 60 |
| print Bonus Action / Reaction rows rewritten | 2 | Purple Worm "Swallow" (now a replace-attack DEX save); Lich "Protective Magic" |

**Saves is the largest fidelity gap on the whole forty.** `printCanonFor` (`generate.mjs:490`)
returns skills, immunities, resistances and vulnerabilities — **not saves** — so the donor's
proficient saves leak onto every print body.

**Opus notes for 7e-saves (pre-release item 2).** Print's `saves` map is the FULL six-ability map
with proficiency folded in where print lists one (Vampire `{STR:4, DEX:9, CON:9, INT:3, WIS:7,
CHA:9}` against stats 18/18/18/17/15/18 → DEX/CON/CHA proficient; Dire Wolf's map equals its
mods → no proficient save). So the datum to carry is WHICH abilities are proficient: derive it as
`saves[k] - mod(stats[k]) === pb` on print's own block, return it as `pc.saveProfs`, and apply it
where `print canon skills:` applies — on the SAME gate (exact, and twist/borrow at print's CR via
`printNearAdd`), recomputing the sheet's `saves` from the sheet's own mods + PB. A twist at a far
CR keeps print's proficiency SET with the sheet's numbers. Never on homebrew. Predict first: list
the 14 sheets above and what each should read; the twelve must show Goblin Boss with no listed
save and Vampire with DEX/WIS/CHA. **Do:** return `saves` and apply them where skills are
applied; `print canon senses:` ran on only 2 exact sheets — extend to twist; lock print's Bonus
Action and Reaction rows the way 1e locked attacks. This also closes the critic's #22 regression
(4th gate) and #13 Swallow (§3a).

### 7f. The swarm name: "Swarm of Peal of the Dyings"

`generate.mjs:3118`: `${bare}s` pluralises the LAST word of whatever the name is. **Do not** grow
the pluraliser. The route call already answers `is_a_swarm` with a quote; ask it for the swarm's
noun as a field (`swarm_of: "funeral bells"`) and build "Swarm of <that>". One token on a call we
already make; `${bare}s` stays as the fallback when the field is empty.

### 7g. Small, from §3d — after the above

#39 the advantage rider rides BOTH Handaxe and Shortsword (and "a handaxe returns" rides the
Shortsword, 6/6) — the T05 dedupe matched within one row, not across two; #06 "5-foot-long,
5-foot-wide line" — measure print's shortest Line before bounding (print has none that short,
*(recalled)*); #28 "may"/"can" and the `((with mind blank))` leak are prose.

### 7h. Not a defect: the "Name.Text" gap in the smoke dumps

53 rendered rows read "Scar-Socket Vigil.When…" in the `.md` files. `Statblock2024.vue:117,121`
inserts `{{ ' ' }}` after the name on both entry paths; the smoke's `innerText` dump drops it.
Verify once in the browser; do not build.

### 7.9 RELEASE SPLIT (owner + Fable, 2026-11-08) — WHAT OPUS DOES NOW

**Pre-release, in this order, then stop and run the forty.** About a day. Each is visible to a GM in
the first ten seconds of reading a sheet, or makes our own gate honest.

| # | item | why pre-release | size | done when |
|---|---|---|---|---|
| 1 | **7a** authored-row rigor — the five checks | the two Fixes; a die-less damage, a swarm that heals under a trait saying it can't | 5 of 27 authored rows this forty | #05 Chorus and #29 Rotting Toll replayed through the refusal chain: priced/refused; 0 template rows change; the twelve shows the five checks firing only on authored rows |
| 2 | **7e-saves** print's saving throws on a print body | 14 of 15 twist/exact sheets ship wrong saves; "Vampire" with no DEX/WIS/CHA proficiency breaks the print promise | one field on `printCanonFor` + apply where skills apply | Goblin Boss #22 lists no save; Vampire #11 reads DEX/WIS/CHA +9/+7/+9; Pit Fiend #17 reads print's; borrow/homebrew sheets unchanged |
| 3 | **7f** the swarm name | the sheet's TITLE reads "Swarm of Peal of the Dyings" | one field (`swarm_of`) on the route call; `${bare}s` stays as fallback | #29 reads "Swarm of Funeral Bells" (or the call's noun); "a swarm of rats" still reads "Swarm of Rats" |
| 4 | **7b** `TEXT_GATE` drops "drops to 0 Hit Points" | makes the gate's FAIL count honest | one token | #31 Thunder Dive: no `two-novas`; `print-attack-list.spec.js` gains the Bodak/Banshee fact |

Then: `npx jest … --silent` → `npm run build` → a twelve built from #05, #29, #10, #15 (7a), #11,
#17, #22, #13 (7e), #29 twice (7f), #31 (7b), + one homebrew and one borrow control (unchanged) →
`check-run.mjs` → **the forty** (sweep 2 of 3). Hand the forty to the critic with the §2-style
table. Do NOT start anything below until the owner has read that forty.

### 7.9b — ADDED 2026-11-09 after the GM-register forty (`typed40`, critic read 4 / 19 / 7 / 10)

The crafted forty reads 14/21/3/2; the GM-register forty reads **4 Keeper / 19 Runs / 7 Tweak /
10 Fix**, and the critic's verdict is *not yet*. Seven of the ten Fixes are two rules plus one
scaling bug. Every specific below was verified on the run's JSON and traces (9 of 9 checked).
Items 5–9 join the pre-release list; items 1–4 above are landed.

| # | item | the evidence | do |
|---|---|---|---|
| 5 | **B. A print body in the GM's words stands unless the call quotes why not** | #30 "owlbear but CR 8" → homebrew "Larder Stalker" (no owlbear); #07 "Krug \| ogre" → CR 2 homebrew Giant, Speed 50, Club 6; #03 "pirate captain" → Gladiator. `printCanonFor` finds Owlbear / Ogre / Pirate Captain exact on all three; the path CALL said homebrew/class and wins by design. 3 Fix + 3 Tweak-R of 40; 0 of 160 on sweep. | in `path.mjs`/the Vue's decide step: when the matcher returns `exact`/`twist` and the call says otherwise, require `assembly_receipt` to quote the GM's words that overrule it (the field exists); no quote → the print body stands. **Plus (critic):** a ROLE word is a tiebreaker, never an override of a mechanical noun — #12 "giant who throws boulders" + role artillery → a wizard giant with a Force Boulder. |
| 6 | **A. The call's quote opens a bane; the regex is the fallback** | #31 "a troll but weak to cold instead of fire": route read `bane: cold`; `WEAKNESS_FRAME` (`unless\|except\|only`) refused it; shipped Regeneration stops on Acid or Fire AND Vulnerabilities "Cold, Fire" — dropped, then contradicted. The frame was RIGHT 3 of 4 times this forty (#06, #08, #22 asked no weakness; the call volunteered one). | `route.mjs` ~678: `asked = WEAKNESS_FRAME.test(gm words) \|\| evidenceIn(parsed.bane.because, gm words)` — the call's own quote, vetted against the GM's words, is the second door; the regex stays for a quoteless answer. Then make sure the bane REPLACES print's (not adds): the troll must lose Fire. |
| 7 | **Spell list scaled to CR** | #15 "goblin wizard" CR 3 ships Fireball ×2 and Cone of Cold 1/day. | the class-NPC spell list is a print body's (Mage CR 6); scale the list to the sheet's CR — print's Apprentice/Mage/Archmage ladder is the closed fact; a CR 3 caster's top spell is 2nd level. |
| 8 | **Deterministic text bugs** | #18 ",." ×6 where "until the end of its next turn" should be; #24 and #35 "It can enter a creature's space and stop there." (an Air Form sentence) welded into auras; #33 a trait cites "Eruptive Ambush", a row not on the sheet (the checker's dangling-ref should have fired — trait-row citations are exempt; measure before widening). | find the template that renders the empty duration and the aura paste; both are engine text, not model prose. |
| 9 | **One print lookup, not two** | `printCanonFor('kobold')` → Kobold Warrior exact; `path.mjs` `corpusEntry('Kobold')` → "not in the corpus". Pip (#25) lost the kobold kit — his bio's one mechanical ask ("dangerous in a group" = Pack Tactics) — to a private copy. `corpusEntry` matches a print name INSIDE the phrase, never the typed head noun against print's role-suffixed names. | make `corpusEntry` delegate to the same head-noun resolution `printCanonFor` uses (one definition). Also fixes the species direction for goblin/elf/hag asks. |

**STATUS 2026-11-09 (Fable, after Opus landed 5–9 and re-ran `typed40`).** Four of five
verified on the re-run; one regression, caused by item 9, blocks the commit until item 10 lands.

| # | verified on `typed40-2026-11-09T01-59-58` |
|---|---|
| 5 | #07 "Krug \| ogre" → **twist on the Ogre**; #30 "owlbear but CR 8" → **twist on the Owlbear, named Owlbear**, CR 8. The line is `exact=true`, measured: 2 of 200 sheets change (both the critic's Fixes); the broad rule would have changed 25. |
| 6 | #31 troll → **Vulnerabilities "Cold"**, Regeneration stops on **Cold**. Both halves. The frame stayed (right 3 of 4 on the first run); the second door is the call's `stated` field, still vetted by `evidenceIn`; a named weakness now outranks one read off a material. |
| 7 | landed one-sided after the suite caught a two-sided first cut that would have stripped Power Word Kill from the CR 24 archlich on print's CR 21 Lich. Withholds only when print's CR is more than one ABOVE the sheet's. |
| 8 | #18 Eye Rays: 0 punctuation artefacts. `space_hold` gated to Elemental/Ooze (print's exact warrant) — after a first cut that also blocked an ABSENT type was caught by the augmentation suite. |
| 9 | `corpusEntry('Goblin')` → Goblin Warrior; both print lookups agree. **And it caused item 10.** |

### 10. A class NPC on a SPECIES body still gets the class's defining row (PRE-RELEASE, blocks the commit of 5–9)

**What happened.** "goblin wizard" (#15) first shipped the Mage body with Fireball ×2 at CR 3 (too
strong — item 7). After item 9 the path call's `Goblin Warrior` body is ACCEPTED instead of
refused, and `generate.mjs:2439` uses the class's own print block only when the call names NO
body (`!pathD.print_body`). The mage kit's rows are lifts FROM the Mage block (Protective Magic,
Misty Step) that need a Spellcasting row to attach to — the trace reads *"the sheet carries no row
it could refer to"* and *"nothing to add — the sheet already answers it"*. Result: a goblin with
Nimble Escape and Shadowmeld and **no magic at all**. Before: too strong, but a wizard. Now: not a
wizard. Worse, on the same input.

**Scope, measured on the re-run:** 12 class-NPC sheets; the goblin wizard is the ONLY caster
without a Spellcasting row and the only one standing on a species body (Maudra, Grizzelda, Vexmoor,
Mother Ash, the Cardinal all carry one). So this is the species-body case specifically, which
item 9 makes common — and which is exactly what the critic wanted: a goblin AND a wizard.

**Do:** when `pathD.path === 'class_npc'` and `pathD.print_body` is a species/folk body (not the
class's own block), lift the class's **defining row** from `bodyForClass(pathD.class, cr)` onto
the sheet — Spellcasting for mage/cleric/druid/warlock, the martial classes' equivalent where one
exists — scaled by item 7's rule (print's CR more than one above → the chassis's list stands).
One lift, at the kit site that already traces `class kit:`. Do NOT revert item 9: item 5 reads
through the same lookup and Krug/Owlbear depend on it.

**Replay:** `smoke-out/typed40-2026-11-09T01-59-58/15-*.json` → Spellcasting present, scaled to
CR 3, Nimble Escape kept. Controls: Maudra (#02) and Grizzelda (#27) unchanged (class body, row
already present); Vexmoor (#05) unchanged.

**Then:** commit 5–10 together → `typed40` → `sweep` (sweep 2 of 3).

**STATUS 2026-11-09 — 5–10 committed as `f867440`.** Six-sheet verification: Krug is a twist on
the Ogre at print's Speed 40 / HP 68; both goblin-wizard rolls read CR-3 spells (item 7 closes the
critic's #15); the three caster controls are unchanged. **Item 10 fired 0 of 6 rolls** — every
class NPC stood on its class's own block, so the species-body arm is proven by its ingredients
(`bodyForClass('mage')` lends Spellcasting; cleric → Priest; druid → null, declined) and by the
suite, not in the pipeline. **Three landed arms now wait on a specific roll:** 1e's tail add-back
(fired once on roll 9 of 9), 7a's two refusal arms (never yet), item 10 (never yet). If the next
two fortys show no species-body class NPC, item 10 is unverified, not working — say so. Also: a
Mage-bodied goblin wizard carries no goblin kit (no Nimble Escape), so the critic's "goblin kit ✗"
stands on that roll; item 10 is what makes the species-body roll shippable.

**Correction to the note above:** item 9 does NOT unblock Pip (#25). The refusal is `species
"kobold" has no kit` — the SPECIES kit table in `species.mjs`, a separate list. Kobold stays a
post-release species-kit entry.

### 11. The checker's `gate-fit` lacks the engine's KO exclusion (PRE-RELEASE, cheap, print-verified)

**Measured 2026-11-09 across three `typed40` runs:** `gate-fit` fired on all three, each time on a
different at-will grapple-and-drag row — Death Roll (#40), Reel In, Debtor's Pin. The engine's own
restore arm (`generate.mjs:8760`, `const KO = /Paralyzed|Stunned|Incapacitated|Unconscious|
Petrified|Restrained|Grappled/`) SKIPS KO conditions, so it never gates these rows; the checker's
rule (`checker.mjs:~1829`) has no such exclusion and fails them. Two copies of one predicate,
disagreeing — the recurring shape of this week.

**Print's warrant:** exactly **3** rows in 329 blocks are at-will condition actions on a sheet
with no Multiattack and no use gate — Brass Dragon Wyrmling / Sleep Breath, Harpy / Luring Song,
Homunculus / Bite — and **all three are KO conditions.** The checker rule FAILs them today; print
prints them. So the exclusion clears 3 print false positives and the 3 typed40 rows together.

**Do:** move `KO` to a shared module both readers import (`sheet-lints.mjs` already plays this
role for `undefinedStateIn` / `contradictsSelfHeal`), and make `gate-fit` skip a row whose imposed
condition matches it. One definition. Test: the three print rows pass; a non-KO at-will condition
action with no Multiattack (the Dire Wolf's Fur-Bristled Lunge shape) still fails; `print-attack-
list.spec.js`'s existing gate-fit tests stay green.

**NOT a fix:** the Beholder's `under` (reads CR 8 at a typed 13) recurs on all three runs and is
the stated-CR ruling (§0b of `post-release-2026-11-09.md`) — the owner's call on the ruler, not a
build. The other eleven FAIL rules across the three runs each appear once or twice on a different
sheet; that is the stochastic tail, not a backlog.

**Status of the Eye Rays `punctuation` FAIL (recurred on all three runs):** the item-8a fix
addressed a DIFFERENT instance and was verified on the composer, not the shipped path — the real
cause was the `{duration}` token inside the composed `ray_table`, substituted AFTER the duration
fill had run, so it rendered the raw key or, with an empty fill, "condition ,.". Fixed in
`composeRayTable` (the table resolves its own token), verified clean in BOTH fill states across all
five CR bands, and the spec now uses the CHECKER'S own punctuation regex — mine lacked `\s,` and
read the defect as clean. Suite 4954, build clean; uncommitted alongside this note.

**The critic's "GM lexicon" — NOT built as written, and here is why.** They propose a
deterministic table before the call: slow → Speed 20, legendary → LR + legendary actions, etc.
That is a word list deciding what the GM meant, which the owner's 2026-10-16 ruling forbids. The
traces show the right seam: the extraction ALREADY files these as clauses — `"slow" -> mechanical
[asked: at_will/movement]`, `"legendary" -> mechanical [asked: once_per_fight/save_area,
askMechanic: burst]`. "slow" was read as a movement ROW (hence Trample) when the schema's own
HEADER kind lists speed; "legendary" was read as a burst because the `asked` enum has no value for
legendary tempo. So the lexicon's rows become **call fields**: one HEADER example in the prompt
("'slow' is a header clause: Speed 20"), and a `legendary` value in the ask enum that the engine
answers with Legendary Resistance + legendary actions. Same for "heavy crossbow" (the weapon table
already knows it; the fill dropped "heavy"), "curses" (askMechanic: curse exists — #27 got a
bludgeoning bolt, so the SEAT is the fault, not the reading), "commands/leads" (Aura of
Authority). Post-release unless the forty after items 5–9 says otherwise.

**Post-release additions from this forty (critic §3–§6, verified):** species kits goblin (no
darkvision/Nimble Escape, #15), elf (0 of 13), hag (#08), kobold (#25 — item 9 unblocks it);
ranger → rogue kit (#04; Hunter's Mark + Evasion are SRD); necromancer → Archmage with no
necromancy (#05; Animate Dead, Finger of Death are SRD); the PI alias should carry a CHASSIS
(Beholder → artillery/controller with legendary tempo; Mind Flayer → caster-controller INT 19
telepathy; Displacer Beast → Large skirmisher — today all three route to a lurker, hence DEX 20 /
Stealth on a floating eye); "(with Advantage during the first round)" inside the attack bonus ×3;
bio mechanical hints land 22 of 35 — nouns arrive, adjectives-that-are-mechanics do not, which is
the call-field work above. Gladiator ×3 / Priest ×3 / Mage ×3 bodies on the class path.

**Re-run `typed40` after items 5–9, then `sweep` (sweep 2 of 3).** The critic's hold list is A,
B, spell scaling and the Cynosure text — items 5, 6, 7, 8.

**Post-release (do not build before the forty above):** 7d formation (5 misses; a missing row,
never a wrong one — Vashka ships a playable Gladiator), 7c handed clauses (2 hits), 7e senses (3
sheets) and Bonus/Reaction locks (2 sheets), 7g small regressions, 1f (prompt fix, 1 in 120), 1g
(2 clauses, moves them INTO the denominator). 7h is not a defect (verify once in the browser).

**The bar, stated honestly for whoever reads this next.** The roadmap's 85% over three sweeps is
probably not reachable pre-release from measured levers: 78 now; 7d ≈ +3.5, 7c ≈ +1.4 → ~83; the
rest is the 39% of clauses that coin-flip between runs, which nothing in this plan targets. The
owner's call is whether release means 85 or means "0 Fix on the critic's read + items 1–4 landed";
Fable recommends the second. **The one thing to hold release for is `typed40`** — every number here
is measured on forty writer's sentences; "knife ball" (two words) hit a bug four fortys never saw.
Build it from the owner's saved concepts (`userConcept` on saved sheets), run once, read it. If it
is ugly, that is the pre-release work; if it is fine, ship.
