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

### 7.9c — THE RELEASE LIST (critic's ruling on sweep `05-57-15` + GM forty `06-25-17`, reviewed by Fable 2026-11-09)

The critic's ruling: **not shippable on this sweep; the list is three items, all deterministic.**
Fable verified every premise below against print and the saved sheets. Where the critic was wrong
the correction is stated with its number. Items 12–17 are PRE-RELEASE and replace items 1–11's
"then the forty" step. Then one `sweep` + one `typed40`, then the critic once more.

**THE RELEASE GATE, REPLACED (adopted from the critic, 2026-11-09).** The 85% per-clause bar is
retired as a *release gate* and kept as a post-release target. (The critic's "114 + 12 = 85.1%" is
off by one — the never-clause misses are **11**, one clause is 0/2 — so the four never-clauses
reach **84.5%**, not 85; the bar needs one coin-flip too.) The gate that holds the button:
**0 sheets hot ≥ +1.5 CR under a read that multiplies AoE by 2 targets · 0 authored rows citing
a missing row / event / precondition · 0 print attack, bonus-action or reaction rows re-diced,
renamed or shed on the exact/twist paths · checker FAILs ≤ 1 of 40 · the deterministic stuck
list at 0.** Coin flips are variety per the owner's ruling; they do not gate.

| # | item | the evidence (measured) | do | verify |
|---|---|---|---|---|
| 12 | **Print's Bonus Actions and Reactions are locked on a print body, the way 1e locked its attacks** (the surviving half of the critic's A-ii) | Purple Worm #13: print's Swallow (a Bonus Action, STR save, a grappled target) rewritten as a replace-attack DEX save on **3 of 3 frozen sweeps**; Goblin Boss #22 shed print's Redirect Attack (a Reaction). 1e's lock covers `pc.meleeRows`/`rangedRows` only. **Dropped from this item (owner, 2026-11-09): the "a weapon named as the cause of a wound" call field.** Measured: 80 inputs, 9 name a weapon, **8 of 9 are the creature's weapon**; the Red Dragon's lance is 1 of 80 and 1 roll in 6 on its own sheet. A new field for that is an exception, not a rule — it goes in the release notes as a known edge case. | extend 1e's lock: on exact/twist, print's Bonus Action and Reaction rows ride verbatim at the sheet's DC/PB, stamped `print`, and a chassis row that would displace one leaves. Same gate, same trace shape (`print canon row:`). Never borrow/homebrew. | replay `smoke-out/sweep-2026-11-09T05-57-15/13-*.json`: Swallow is print's Bonus Action, stamped print, 0 re-reads. #22: Redirect Attack present. Owlbear/Goblin Boss exact sheets byte-identical. |
| 13 | **At-will area damage inside a Multiattack is bounded by the attack it replaces, or it is Recharge 5–6** (the critic's B) | **Print: 24 at-will "replace one attack with X" rows; 0 are AoE with damage ≥ the attack replaced** — exactly the critic's prediction. Ours: Gormak #32 Shattered Ground 38 to everything within 10 ft replacing a 30 attack (→ ~106 DPR at CR 9, band 57–62); Barrow Duelist #38 Barrow Sweep 28 + Prone replacing 21 (→ ~77 at CR 6, band 33–38). **Our gate is blind to this**: `checker.mjs:504` `sustained = attack × count + rays + aura` prices an at-will AoE replace row at zero, which is why the critic reads 3 hot and we read 0. | engine: a replace-clause row that targets an area carries damage ≤ the attack it replaces, else it takes Recharge 5–6 (print's own shape: area damage behind Recharge, at-will replace rows are control — Prone, Frightened, grapple). Checker: price an at-will AoE replace row at avg × 2 targets in `sustained` so the gate sees what the critic sees. | replay #32 and #38 saved sheets: both read inside band. Then one forty: hot ≥ +1.5 = 0. Print no-op: the 24 print rows unchanged. |
| 14 | **The citation arm matches normalised names and refuses events and preconditions too** (the critic's C + our §3 of the typed40 package) | `dangS` at `generate.mjs:5771` matches cited names literally. Three failure shapes measured this week: (i) **near-miss name** — "use its Umbral Step bonus action" when the row is "Umbral Step" (#20, reads fine to a GM, matcher too literal); (ii) **missing row** — Thornback's "Eruptive Ambush" (typed40 03-38-20), Pup-Bonded Warg's "Bite" (sweep 05-34-07); (iii) **undefined event / precondition** — Krennik #34 "a creature that has witnessed his standard break" (no standard, no break, "near" has no distance); Rotbark #36 Rootfeed triggers on Grappled/Restrained/Prone with no row imposing any — **and the same arm refused Mother Ash's trait for exactly that**, so it is inconsistent between sheets. 3 of 7 fortys carry one. | two moves at ONE arm: (1) normalise before matching — strip `(bonus action|action|reaction|trait)` and the creature's own name from a cited phrase, then match row names, so (i) ships as written; (2) then refuse hard, and widen what counts as a citation: a row, an **event** (must be a row on the sheet, a condition, a state — Bloodied / 0 HP / start-end of turn — or a defined game event), a **precondition** (the Mother Ash arm applied to every sheet). | replay: #20 ships unchanged; Thornback (03-38-20 sheet) refused or rewritten; Krennik #34 refused; Rotbark #36 refused the way Mother Ash was. One pass each. |
| 15 | **The lack-removal pass skips the row it just authored for the lack** (the critic's A-i, our sweep §3) | #15, all three frozen sweeps: `lacks asked: "blind in one eye"` → the seat authors "Ruined-Eye Glare" / "Lance-Scarred Blind Side" → `lacks clause: … leaves` (`generate.mjs:10509`) deletes it for mentioning the eye → checker: no `flaw` row → `lack-honored` FAIL. The one rule in all three frozen sweeps. The sheet also keeps print's senses (blindsight 60, darkvision 120) — a half-blind dragon reads fully sighted. | the pass that removes rows for a lack must skip a row stamped `flaw` or authored FOR that lack (the seat knows which clause it wrote for — `idea.clause`), and the lack should touch the senses line where it names a sense. | roll #15 three times: the flaw row survives 3/3; `lack-honored` 0/3. |
| 16 | **`asked: legendary` is a call field** (the critic's "first call field to build"; our lexicon ruling) | Thornback #33 "an ankheg but legendary, boss fight for level 5": extraction files `"legendary" -> mechanical [asked: once_per_fight/save_area, askMechanic: burst]` — read as a BURST because `ASK_OFTEN` (`generate.mjs:1690`) has no value for legendary tempo. 0 of 2 rolls carry Legendary Resistance or legendary actions. The single most common GM adjective for "boss". | add `legendary` to the ask enum; the engine answers it with Legendary Resistance (3/Day) + legendary actions from the chassis (print's machinery from CR 10 is already gated — the Unicorn exception at CR 5 is print's own). Same seam for `slow`/`fast` (a HEADER clause — one prompt example: "'slow' is a header clause: Speed 20"). | three rolls of #33: LR + legendary actions 3/3. |
| 17 | **A seat row is stamped with the clause it answers, not a neighbour's** (the Corrosive Drip finding) | #24: "a shell that sheds acid" reads NEVER on `clause-rate` (0/3). The row **landed** — Corrosive Drip, a 5-ft acid Emanation at end of turn — but the energy-aura seat stamped it `clause: "carving with the others"` (the scythe-arm clause), so the checker's "a GM quote on Corrosive Drip that does not lie inside this clause — no credit" is CORRECT by its rules. The critic read this as a checker fix; it is the engine's attribution at the seat (`generate.mjs:6984` / `9081`). | the seat that lands a row stamps `idea.clause` — the clause the seat was built for — never a clause inferred afterwards from word overlap. | replay #24: "a shell that sheds acid" credited; "carving with the others" not falsely credited. Expect the never list to drop to 3. |

**STATUS 2026-11-09 (Opus) — 15, 13, 12 and HALF of 14 landed; 4972 tests pass, build clean.**

- **15 done.** The chain measured: over 18 saved fortys carrying #15, **6 deleted the authored flaw
  row and all 6 FAILed `lack-honored`; the 11 that deleted nothing all shipped `Sight Weakness` and
  passed.** The pass now keeps a row stamped with THIS lack's clause (`row.clause`, already written
  by the 11-08 landing). 5 tests. **Separate finding, not fixed:** print's dragon senses say
  "blind**sight**" and the checker's generic presence test matches the clause's WORDS, so "blind in
  one eye" can read as honoured because the sheet says blindsight — that hides the defect; own item.
- **13 done, both halves.** Print's warrant confirmed exactly as the critic predicted: **24 at-will
  replace-an-attack rows across 329 blocks, 0** AoE reaching the attack they replace. Engine: such a
  row takes Recharge 5-6 (print's own shape). Checker: `sustained` now prices the swap at ×2 targets
  — **the critic's "hot tail that did not exist on the last two gates" existed; our gate priced it
  at zero.** Gormak 30→106, Barrow 21→77; Owlbear/Purple Worm/Brass Tyrant unchanged. 2 tests.
- **14 half done.** The near-miss name: "use its Umbral Step bonus action" resolves to the row
  "Umbral Step". One normaliser shared by both citation readers; #20 goes 2 FAILs → 0, a genuinely
  missing row still refuses twice, print's 329 blocks stay at 0. 8 tests. (`dangling-use-ref`'s own
  capture eats the word "action" and leaves "…bonus", so the bare word is strippable too.)
  **NOT done:** the event case (Krennik's "witnessed his standard break") and the precondition case
  (Rotbark's Grappled/Restrained/Prone with no row imposing one — the predicate exists but lives in
  the AUTHORING chain, so template rows slip past; it needs to run at ship time as a sheet lint).
- **12 done, and two handoff claims corrected.** Print's Goblin Boss has **no Redirect Attack** —
  Multiattack, Scimitar, Shortbow, Nimble Escape is the whole block; that was a 2014 feature
  remembered into 5.2, so nothing was shed. And the Purple Worm's Swallow is **not an unlocked print
  row**: the engine's own `swallow` TEMPLATE writes a row of that name into Actions first, and the
  existing same-name rule was gated to print NOVAS only. Widened to any print rules row at print's
  CR, and the winner returns to print's own section.
- **12 — one guard to add (Fable's audit, 2026-11-09).** `printWins` checks `!same.print &&
  !same.library` and not whether the engine row is the GM's: a row carrying `clause`, `gmQuote` or
  `authoredSeat` would be overwritten by print's same-named row on exact/twist. Measured: 16
  collisions in 440 sheets, **0 GM-stamped** — zero exposure this week, but the hole is real and
  the GM's words win. Add `&& !same.clause && !same.gmQuote && !same.authoredSeat` and trace the
  stand-down.
- **16 POST-RELEASE (owner, 2026-11-09): "a GM won't ask for legendary actions below CR 10."** The
  only evidence was Thornback at CR 8 — and that input ("an ankheg but legendary, boss fight for
  level 5") is one Fable wrote for `typed40`, not a GM's. `asked: legendary` stays a call field to
  build later; at CR 10+ the chassis machinery already fires.
- **17 DIAGNOSIS CHANGED, not built.** Corrosive Drip is not mis-stamped: it was SEATED for
  "carving with the others" and happens to answer "a shell that sheds acid". The engine's
  provenance is accurate; what is missing is a row answering a SECOND clause. `answersAlso` already
  exists (`generate.mjs:6985`, the repair call's "this clause is already answered by row X") and did
  not fire here. The fix is on that path — ask the repair call about owed clauses a shipped row
  expresses — not at the seat.

### 18. The returning-weapon clause is a magic-weapon exception (PRE-RELEASE, owner's find 2026-11-09)

**Measured.** Print writes a returning clause **4 times in 1291 rows**, and all four are a weapon
dealing ELEMENTAL damage — which is how print marks it magical: Ice Devil's Ice Spear (Cold),
Salamander's Flame Spear (Fire), Solar's Flying Sword (Radiant), Merfolk's Ocean Spear (Cold). **No
mundane thrown weapon returns.** Ours writes it **28 times** across the week's fortys, because it is
hard-coded into four donor rows (`skirmisher-8/13/18-hurler` and a hybrid) as
`*Hit or Miss:* Immediately after the attack, {projectile} returns to the creature's grasp.` — so
every hurler carries it by construction and the projectile is then swapped to whatever the concept
named: a tar clod, tossed coins, a spider's web, Meshrin's mundane javelin. Owner: *"anything that
isn't magical and the monster doesn't conceivably have a cache of ammunition for does not need to
return — the return to grasp should be an exception rather than the rule."*

**A second bug rides it:** the clause lands on Harl's **Shortsword**, a MELEE row ("a handaxe returns
to Harl's grasp") — the critic measured 7 of 7.

**Do:** the gate is the DAMAGE TYPE, not `thrown` (the weapon table has `thrown` on 14 weapons, and
it is the wrong signal — print's javelin is thrown and does not return). The clause survives only
where the row deals a non-physical damage type, and only on the thrown row. Strip it from the donor
rows and add it on that condition, so it is an exception by construction.

**LANDED 2026-11-09 (Opus) — as a CALL FIELD, and the 2026-09-15 ruling stands.** A first cut keyed
the clause on ELEMENTAL damage (print's 4 of 4 are magic weapons) and the suite refused it: the
Cliff Troll ruling of 2026-09-15 says a SINGLE signature object must come back or it is thrown once
and gone (its lantern skull, Bludgeoning). That ruling is right. What was wrong is how the engine
told ambient from singular — a word list of nouns (slab|stone|rock|boulder|rubble|…) that missed a
tar clod, tossed coins, a web and a mundane javelin. Whether a creature has endless supply of what
it throws is a judgement about the fiction, so the reskin call now answers
**`projectile_supply: "single" | "ambient"`** beside `projectile`, and the clause is dropped on
`ambient`. The word list survives ONLY as the fallback for an unanswered field (widened with the
four misses), because a failed call never costs a sheet.

**OWNER'S RULING 2026-11-09 — THE WORD LIST GOES, NOT WIDENS.** "Why are we relying on a word
list for 18. I don't like that. Can we make it a hard rule not to expand bad decisions?" Yes, and
it is now in CLAUDE.md. For Opus, the fix at `generate.mjs` (the `projectile_supply` block):
- the clause stays ONLY when the call answers `single`; `ambient`, blank, or off-enum all drop it.
  An exception needs a positive answer — print writes it 4 times in 1291 rows, so "no clause unless
  told" is wrong on nearly nothing.
- delete the ambient regex entirely (the original list AND the four words added this session).
- `generate.spec.js` "ambient stone never boomerangs; a singular signature projectile still
  returns": the lantern-skull case sets `projectile_supply: 'single'` on the answer — that is the
  contract now; the slab case sets nothing and must drop. Add one case: `projectile_supply`
  absent, projectile "its barbed anchor" → no clause (the default is the conservative one).
- trace the drop as "the call did not say this projectile is a single object the creature must
  recover" so a GM reading the trace sees why the javelin stays on the ground.

**Still open — the melee half (the critic's 7/7).** Harl's *Shortsword* carries "a handaxe returns
to Harl's grasp". All four donor rows that carry the clause are Ranged or Melee-or-Ranged, so the
clause starts on the right row: the defect is the RENAME, which gave the thrown row the melee name
("hurls a handaxe and closes with a shortsword" assigned backwards). Fix at the rename mapping, not
at the clause.

**Verify when the melee half lands:** replay #37 Meshrin (Javelin keeps no clause), #39 Harl (the
clause rides the Handaxe row), #22 Clockwork Spider (the web loses it), #39 Skarn's Coin Toss. Print
no-op: the four print rows keep theirs. Then one forty: 0 returning clauses on ambient ammunition.

### 19 + 20 — CALIBRATION: the ruler, the to-hit stat, the spell list (owner's read on the review page, 2026-11-09)

**The owner:** "these blocks are way too cold, mostly on the defensive CR… I want GMs to go 'haha
that'll scare them'… Is our math wrong on the conversion between donor templates? That's where I'd
look first. I don't like too many fixes at the end." And: "I've been nervous about appropriate
spells and number a day for casters by CR."

**Measured against print, three passes (the third corrected the first two — see the note at the
end). What survives:**

1. **The defensive read is a wrong ruler.** The checker takes the 2014 DMG table's HP column
   literally. Print itself sits at 71% of it and reads below it on 94% of blocks; ours 74% / 93%.
   The DMG method AVERAGES defence and offence — print's idiom is lighter HP with damage at band,
   and its NET read is −0.4 (near centre). The review page shows the defensive component as if it
   were the verdict. **No block is cold on HP: ours sit at 95% of print's median HP at the same CR,
   and each donor family tracks its own print family within 10% (brute, skirmisher, caster; lurker
   samples too small to say).**
2. **The to-hit modifier runs 1–2 under print from CR 5 up, in every family.** PB is right; the
   ability SCORE is low. DC = 8 + PB + mod, so every save DC is dragged down with it. "It keeps
   missing" is the coldness a GM feels.

   ```
    CR        |  5 |  7 |  9 | 11 | 13 | 15 | 17 | 20
   print mod  | +4 | +4 | +6 | +6 | +6 | +7 | +8 | +8
   donor mod  | +3 | +4 | +4 | +5 | +5 | +6 | +6 | +8
   ```
   Per family the skirmisher is worst (+3/+4 vs print +4/+5/+6 at CR 1–10).
3. **Offense in aggregate is print's**: our OFF read median 0.0 / 9% under / 24% over vs print's
   0.0 / 10% / 23%; DPR 104% of print's median. One hot pocket: caster and lurker donors at CR 14+
   carry an at-will area row inside the Multiattack (caster-15 reads 165 at CR 15 vs Archmage 108,
   Lich 126) — now priced by item 13, which is why it shows.
4. **Casters are priced like print** — attack row × N; spells are texture and nova, not the round,
   in both. **But the spell list does not grow with CR and print's does:**

   ```
                    at-will | daily | damage spells
   Priest   CR 2       2    |   1   | none
   Mage     CR 6       5    |   4   | Fireball 2/day, Cone of Cold 1/day
   Archmage CR 12      8    |   6   | Lightning Bolt, Cone of Cold
   Lich     CR 21      8    |   7   | … Power Word Kill
   ```
   Ours (18 casters, two fortys): every MENU-built caster carries 2 at-will + 1–2 daily at any CR
   (the prompt asks "exactly 2 … exactly 2 MORE"); class NPCs on the Priest carry the CR 2 list up
   to CR 9 (Maudra CR 7, Mother Ash CR 9 → 2/1). 3 of 11 casters at CR 8+ have two at-will spells;
   print's has eight. No low-CR over-casting found (0 of 3 under CR 4 cast 3rd level) — the
   one-sided gate from item 9 holds on that side.

**BUILD, in this order. No owner decision is needed for any of it — all four are measured.**

| # | item | do | verify |
|---|---|---|---|
| **19a** | **the ruler** (`checker.mjs` def read; `scripts/review-html.js` Numbers panel) | calibrate the defensive HP reference so print's NET read centres at 0 (today −0.4) — the DMG method's own adjustments (effective HP for resistances/immunities/LR, AC steps) stay; the HP column is scaled to print's actual HP-by-CR. On the review page show `def` and `off` in grey as components and the NET read as the number. | print: net median 0.0 ± 0.2, def cold ≤ −1.5 under 15% (today 33%). Our three fortys re-read: DEF cold falls accordingly; hot/under gates re-measured, expected FAILs unchanged ±1. |
| **19b** | **the to-hit stat** (`donors.mjs` ability scores / `scale.mjs`) | the donor's primary ability score tracks print's median best-attack modifier by family and tier: brute/skirmisher/lurker/caster +3 at CR 1–4, +4 at 5–7, +6 at 8–13, +7 at 14–16, +8 at 17+ (the skirmisher's own line is +4/+5/+6 at CR 1–2/5–7/8–10). Lifts to-hit AND DC together — do not touch DC separately. | `scaleDonor` at each tier: `atkBest − pb` equals the table; DC = 8 + PB + mod follows. DPR as % of print median rises from 104% with no dice change (hit chance is not in the raw read, so expect the raw number unchanged and the DPR-at-AC on the review page up ~5–10%). |
| **19c** | **the CR 14+ area-swap pocket** (caster-15, caster-21, lurker-13, lurker-17 donor rows) | item 13's engine rule already gates a NEW area swap; these donors ship one BY CONSTRUCTION. Give the donor row its Recharge 5-6 in the table (print's shape), or bound its damage to the attack it replaces. | caster-15 at CR 15 sustained ≈ 66–110, not 165; hot ≥ +1.5 at CR 11+ falls from 23%. |
| **20** | **spell list size by CR** (`generate.mjs` SPELL_MENU prompt; the print-list paste at the `rulesRows` Spellcasting branch) | a CR → list-size table from print's four points — at-will 2/5/8/8 and daily 1/4/6/7 at CR 2/6/12/21, interpolated — applied twice: the menu prompt asks for THAT many ("exactly N at will, M daily") instead of the fixed 2+2; and a print list pasted onto a sheet more than ~3 CR above the print body's is TOPPED UP from the menu to the table's count, never swapped. Damage-spell ceiling from the same table: 3rd level at CR 5–6, one 5th-level nova at CR 6+, 6th+ at CR 12+. | a CR 9 menu caster reads ~6 at-will / 5 daily; Maudra (CR 7 on the Priest) reads ≥ 4 at-will; print bodies at their own CR byte-identical; 0 casters under CR 5 with a 3rd-level spell. Confirm with the engine's own spell table, not the probe's name parse (it returned nothing on levels). |

**20 — OWNER'S RULING ON SPELL DAMAGE (2026-11-09): "a CR 2 spellcaster should have access to
some damage within band. It just needs to do the same amount of damage as a main attack, or as much
as a gated nova if the number per day is limited."** The print Priest (CR 2, no damage spell) is an
edge case, not the shape — the Druid at the same CR carries Thunderwave, the Mage carries Fireball
2/day. So the list-size table above carries a DAMAGE RULE with it:

- **every caster's list includes at least one damage spell**, chosen from `SPELL_DAMAGE_AVG`
  (exists in `generate.mjs`) by the sheet's CR band;
- **priced two ways, like print prices everything else:** an at-will damage spell (a cantrip, or a
  spell the Multiattack can swap an attack for) deals ≈ ONE ATTACK's damage for the band; a
  limited damage spell (N/day) deals ≈ the band's NOVA — roughly the band's whole round, the way a
  Recharge breath is priced (Mage CR 6: Arcane Burst 16 ×3 = 48 a round; Fireball 28 at 2/day,
  Cone of Cold 36 at 1/day). At CR 2 (band 15–20) that is Shatter 13 or Scorching Ray 21 at 1/day;
  at CR 6 Fireball; at CR 12 Cone of Cold / Lightning Bolt ×2; the ceiling-by-CR line above bounds
  the level.
- **the checker must SEE it** (`checker.mjs` `read.nova`): today a nova is a Recharge/X-Day ROW,
  and a daily damage spell inside the Spellcasting list is invisible — so a caster whose burst is
  Fireball reads as having no nova. Price the strongest N/Day damage spell as the nova via the
  same `SPELL_DAMAGE_AVG`, moved to one shared owner. Verify on print: the Mage's nova reads 28–36;
  the Lich's reads Power Word Kill / Finger of Death's figure; blocks with no damage spell are
  unchanged.
- when item 9's one-sided gate withholds a too-strong print list from a low-CR sheet, the sheet
  still gets a damage spell from the table at ITS CR — the gate must not leave a caster with
  nothing to throw.

**Not built — the damage-band knob.** Aiming DPR at the band midpoint instead of its floor was
proposed as the "scare them" lever. 19b lifts hit rate by 5–10% on its own; re-measure after 19–20
and raise the knob only if the owner still wants more. Root first.

**Baseline for the before/after:** `smoke-out/typed40-2026-11-09T21-04-40` — the fifth GM forty,
run on commit `1cc043e` before any of 19–20. Same inputs after 19–20 is the comparison; the owner
reads THAT one on the review page.

**Measurement note for whoever measures next (three wrong denominators in one afternoon):**
(i) "brute-13 is under-diced" compared the brute with ALL print at CR 13, where casters and
lurkers pull the median up — against brute-print it tracks within 10%; (ii) "caster HP is low"
used "has a Spellcasting row" as the caster proxy and pooled hags, devils and mind flayers —
against print's humanoid casters (Priest/Mage/Archmage) the donor is within 10%; (iii) print's
"OFF median −10" was five blocks with a non-numeric read, not a finding. Compare a family with its
own family, name the proxy, and print what the probe skipped.

### 7.9d — the critic's fifth GM forty (`21-04-40`): Keeper 8 · Runs 15 · Tweak 12 · Fix 5 — triage (Fable, 2026-11-09)

Floor stable: Fix 10 → 6 → 5 on the same inputs. The critic's per-block table is signal as usual;
their §3 headline is refuted on its premise and the two defects under it are real with a different
cause. Sorted: **build now** (21–27, below), **folded into 19–20**, **refuted with the number**, **noise**.

**REFUTED — "a call field that fires wrong" (#33 legendary, #34 slow).** Neither field exists.
`ASK_OFTEN` has no `legendary` (item 16 is post-release by the owner's ruling, unbuilt); "slow" was
filed by the extraction as `has (descriptive)` — flavour, not a header clause — so no field fired.
The advice "before any more fields go in, replay these two" does not apply. The two defects are
real and have their own causes, items 21 and 22. Also: Thornback's "Legendary Nature" is an
AUTHORED trait (the seat wrote it for the clause "legendary"), not engine machinery.

**REFUTED — #14 "the short-name slot took the attack's name."** `inline` is "Cinder" on the JSON
(the call's own answer, traced). The 2014 RENDERING wrote "Dart makes two attacks" — so the 2014
conversion re-derives a short name instead of using the declared one. 0 of 200 sheets across five
GM fortys have an attack name as `inline`; this is the 2014 printing path, one roll. Item 25.

**FOLDED INTO 19–20:** Misty Step listed At Will (#15) — the 3/Day bonus action became an unlimited
teleport when it moved into the spell list. Print's at-will spells are cantrips and 1st level at
CR ≤ 6 (the Mage), and reach 2nd only at CR 12 (the Archmage's Invisibility, Detect Thoughts).
Item 20's CR table gets an **at-will level ceiling** (≤1st to CR 11, ≤2nd from CR 12) and the rule
that a spell print places as N/Day never migrates to at-will. The Beholder at −4 to −7 (#18, 3/3) is
also a 19a/20 consequence in part — but see item 26 for the half that is not.

**NOISE (per the owner's variety ruling):** the bio sheets landing a different three-of-four each
roll (Orrin, Ysolde, the Cardinal, Grizzelda, Pip, Shadowfang); the compound nouns routing to twist
1 of 3 (vampire pirate, owlbear zombie — both Keepers when they do); Zarnak's two-of-five. The
critic's own read: "not a regression, the coin-flip band on a bad roll." Their product note stands
and is the owner's: Regenerate should be cheap.

**BUILD NOW — pre-release, each deterministic or one-roll-verifiable:**

| # | item | the evidence | do | verify |
|---|---|---|---|---|
| **21** | **an authored row with a dice expression where a COUNT belongs, or that promises options it does not list** (#33) | "Legendary Nature. Thornback can take 14 (4d6) Legendary Actions after another creature's turn, choosing from the options below." — no options, a damage die as a count. Item 7a refuses a described number; it does not refuse a count written as dice, nor a row whose "options below" / "listed below" has nothing below it. | two arms on the authoring refusal chain: (i) a usage count (`N/Day`, "can take N", "N times") must be an integer 1–5; dice in that slot refuse the row; (ii) a row that refers to options/a list/"below" refuses unless the sheet carries that section. Trace both. | replay #33's saved call: refused; three rolls of #33: no row with dice in a count slot. |
| **22** | **"slow" / "fast" / "fly" are HEADER clauses, not description** (#34, 2 of 3 inverted; "fast" landed on #09 this roll by luck) | the extraction filed `"slow" -> has (descriptive)`. The schema's HEADER kind exists and lists speed; the prompt's examples never show a speed adjective. (Item 16's note said this; it is now measured at 2/3.) | one prompt example on the extraction call: `"slow" -> header [speed: 20]`, `"fast" -> header [speed: 40+]`, `"flies" -> header [speed: fly]`. The engine already applies a header speed clause. No word rule — the example teaches the kind. | three rolls of #34: Speed ≤ 20, 3/3; #09 "fast": Speed ≥ 40, 3/3. |
| **23** | **the item-12 guard's exception excludes the concept-as-clause, and a Reaction with no Trigger loses the collision regardless** (#27) | the guard kept the authored "Protective Magic (3/Day) … in response to the spell's trigger" — no Trigger clause — because its `clause` was "swamp witch npc", the whole concept. Measured earlier: all 3 firings this run had `clause === concept`. | `gmOwns` is false when `same.clause` equals the concept text (the seat wrote it FOR the concept, not for an ask); and when the engine row is a Reaction without a `Trigger:` sentence, print's row wins whatever the stamp. Same discriminator applies to item 15's flaw-row check (`row.clause === concept` is not "authored for the lack"). | replay #27: Protective Magic is print's text with a Trigger; #05 Vexmoor unchanged. |
| **24** | **a weapon the GM names takes the weapon table's die and range when a print row is renamed to it** (#32, 0 of 3) | "goblin boss with a heavy crossbow" → twist on the Goblin Boss → print's Shortbow renamed "Crossbow" at **1d8, 80/320** (the light crossbow). The table has `heavy crossbow: die 10, range 100/400, heavy`. `weaponsIn` read "heavy crossbow" (measured). The rename kept print's numbers. | at the rename/weapon-apply site: when the GM's named weapon is in the table and a row is renamed to it, the row's die and range become the table's (print's attack bonus and count stay). | replay #32: Crossbow 1d10, 100/400; the Scimitar untouched. |
| **25** | **the 2014 rendering uses the declared `inline`, never re-derives it** (#14) | JSON `inline: "Cinder"`; the 2014 text says "Dart makes two attacks … Once on each of Dart's turns" while the bonus action says "Cinder". Two names on one sheet. | find where the 2014 conversion substitutes the short name and make it read `m.inline`; if it must derive, derive from `name`, never from a row name. | replay #14 on the 2014 path: one name. Scan the saved 2014 sheets: 0 with a row name used as the subject. |
| **26** | **a PI alias's defining mechanic is its own clause** (#20 displacer beast, 0 Displacement this roll; #18 Beholder — label follows body) | the alias text "a six-legged panther with two tentacles whose image appears a few feet from where it stands" is ONE clause, and the Tentacles row got stamped with the whole of it (measured on the saved JSON), so "whose image appears…" was answered by an attack. Beholder: the alias names the creature and the chassis is a lurker; 3/3 at −4 or colder. | `PI_ALIASES` entries carry `clauses: [...]` — the body and the signature as separate strings ("a six-legged panther with two tentacles" · "its image appears a few feet from where it stands, so attacks against it miss unless the attacker can see past the displacement") — so the signature is owed its own row. For the Beholder, the cheap half: when a PI alias chose the CR and the body reads ≥ 3 under it, the label follows the body and the trace says so. | three rolls of "displacer beast": a Displacement-shaped row 3/3. #18: label = body read ± 1. |
| **27** | **the deterministic kit misses, one roll each** — the critic's 3/3 list | Gladiator skills (Performance +5) on war chiefs, captains, blacksmiths (#01, #03, #23 — 3 of 3); the Mage ability array (INT 18 / WIS 16, saves INT/WIS) on a cleric (#02, 3/3); goblin kit absent on a goblin wizard (#15, 3/3); no False Appearance on a tree (#36), no Hold Breath on an alligator (#40); Cunning Action on monks 16/16 | each is one owner: the class-NPC chassis keeps print's SKILLS and ARRAY only for the class that print body IS (Gladiator skills belong to a gladiator, the Mage array to a mage) and otherwise takes the class's own; species kits (goblin, kobold) land on class_npc as on homebrew; Cunning Action → Step of the Wind on the monk kit. | one roll each, the critic's list. |

**STATUS 2026-11-09 (Opus) — 19a LANDED · 19b WITHDRAWN, NO DEFECT · a per-CR check added instead.**

**19a is in, and it was the real one.** The defensive read referenced the 2014 DMG's HP column,
which print ignores. Measured against every column at once, print is not "cool" — it is THIN AND
ACCURATE: **HP 67% of the column, damage 93%, attack bonus +2 OVER it, DC and AC exactly on it.**
The 2024 design trades durability for reliability. Only the defensive axis was measuring against a
column print does not use, which is exactly the axis the owner saw as cold.
- the read now references print's own HP-by-CR curve (healthy tiers carry their exact median, thin
  tiers interpolate in log space between healthy neighbours) x 1.25 headroom — the DMG method adds
  AC and trait rungs on top of an HP base and print's monsters carry those traits, so at 1.00 print
  read +0.5 with 26% hot. Swept: 1.25 centres the net median at 0 with symmetric tails.
- **print now reads on its own labels: net median 0.0, cold 10%, hot 8%** (was -0.4 / 15% / 9%, with
  33% of print's own blocks cold on the defensive axis alone).
- **our 120 saved sheets: net cold 31% -> 18%, defensive cold 56% -> 35%.**
- `hp-curve.spec.js` (9 tests) re-derives the curve from the corpus. Two fixtures that pinned the old
  ruler's NUMBERS were restated to pin behaviour.
- found on the way: a thin tier was overwriting a healthy one (CR 12's two blocks pushed CR 13's real
  median of 198 to 224); JS object key order puts '1/8' after '30'; and a body under 80% of print's
  own floor now fails `under` on its own, because the averaged read let a glass cannon's damage carry
  a body print would never ship.

**19b IS WITHDRAWN — THERE WAS NO TO-HIT DEFECT, and the owner caught the measurement error
("I thought our measurement showed less damage and variability on to hit").** Measured correctly —
SHIPPED SHEETS against print's own median at the SAME CR:

| | ours vs print |
|---|---|
| attack bonus | **+0** on every path (homebrew n=58, class_npc n=32, twist n=25) |
| damage per round | **103%** of print's mid-range |
| to-hit spread | 1 point |

The "+4 donor vs +6 print" in the earlier draft compared RAW DONOR TEMPLATES against a print median
pooled differently. Against the same per-CR pool the donors are 1 under at CR 5 and 9 and EXACT at
CR 13 and 17 — and shipped sheets are at print on every path, because class NPCs stand on print
bodies, twists carry print's attack rows, and print canon replaces the numbers. **Changing the card's
formula would have pushed every sheet ABOVE print.** The attempt also contradicted the
owner-designated numeric authority (the Blog of Holding card, 2026-08-17) and broke ~80 fixtures.
Reverted whole; the card is untouched.

**ADDED INSTEAD — the per-CR check (owner: "can we do a per CR check? not a formula?").**
`corpusAt` now carries print's attack-bonus and save-DC range and median at each CR, and two SOFT
findings report a sheet under them — `print-atk` and `print-dc`. Reported, never enforced; no
generation change, no fixture moved. **8 of 80 sheets flag**, e.g. Big Bob: "attack +7 is under
every print block at CR 9 (+8 to +12, median +10, n=8)". The review page's Numbers panel now shows
print's own range at the sheet's CR beside the DMG column, so the gap is readable per sheet.

**The one real offensive outlier: CR 17+ sheets read 150% of print's damage** (n=6) — that is 19c's
caster/lurker donors shipping an at-will area swap by construction. Still open.

**MEASUREMENT NOTE — four wrong denominators in one evening, all the same shape:** the brute "under-
diced" against ALL print at the CR rather than brute-print; "caster HP low" from a proxy that counted
hags and devils as casters; print's "OFF median -10" from blocks with no numeric read; and this one,
the donor measured where the sheet was the question. **Compare the SHIPPED SHEET against print at the
SAME CR, pooled the same way, and say which population the number is about.** The per-CR check added
above is that instrument.

**THE LIST, CUT TO WHAT SURVIVED (Fable, 2026-11-09 evening, after the calibration pass).** Chunk A
found one real defect (the ruler, 19a — landed) and refuted four premises against print; chunk B's
premise ("lists grow with CR") was refuted too. What remains is twelve small items, none bigger than a
prompt line or one arm on an existing chain. `gate-calibration` is RETIRED (its chunk dissolved);
`gate-spells` is reshaped below.

| chunk | item | do | verify |
|---|---|---|---|
| **B1** | **a class NPC standing on a print CASTER body carries that body's list size** | Maudra (CR 7) and Mother Ash (CR 9) stand on the CR 2 Priest and ship its 2 at-will + 1 daily. Print's dedicated-caster line is the ONE place lists grow (Priest 2+1 → Mage 5+4 → Archmage 8+6 → Lich 8+7); everywhere else print's median is 3+3 at every CR, and our 2+2 is one spell light, not wrong. So: when the body is a print caster and the sheet's CR is ≥ 3 above the body's, top the list up from the menu toward the next body in the line (the Mage's 5+4 at CR 6+, the Archmage's at 12+). Never swap the print list out. | replay Maudra: ≥ 4 at-will; a CR 3 wizard still has no Fireball (item 9 holds); print Mage/Lich at their own CR byte-identical |
| **B2** | **a spell print places as N/Day never migrates to at-will** | #15 Nib: Misty Step — print's 3/Day bonus action — listed "At Will" after it moved into the spell list. | replay #15: Misty Step at 3/Day or absent, never at-will; scan all saved casters: 0 at-will spells above 1st level below CR 12 |
| **B3** | **the owner's damage ruling** — every caster carries a damage spell, priced as one attack (at-will) or as the band's nova (N/Day), from `SPELL_DAMAGE_AVG`; the checker's nova read sees a daily damage spell; item 9's gate never leaves a caster empty-handed | see item 20's ruling block above (unchanged) | a CR 2 caster reads a damage spell; the Mage's nova reads 28–36 |
| **C** | **23 → 22 → 21 → 24 → 26 → 25 → 27** (7.9d, unchanged) — 23 leads, it made Grizzelda worse | | `gate-critic5` |
| carry | **14b** precondition lint (3rd sheet: Mother Ash's trait fires on Restrained/Grappled with no row imposing either); **18 melee half** (the rename gave the thrown row the melee name) | | one replay each |

**Twelves:** `gate-spells` reshaped to B — Maudra, Mother Ash, Nib, a CR 2 menu caster, a CR 3 wizard
(item 9), print Mage and Lich as controls, a battle-mage for the nova read (drop the four growth-by-CR
canaries). `gate-critic5` as written.

**Order for Opus:** B1 → B2 → B3 → `gate-spells` → C (23 → 22 → 21 → 24 → 26 → 25 → 27) → `gate-critic5`
→ 14b → 18 melee half → suite → build → `sweep` + `typed40` **(the first runs on the new ruler — they
set the baseline whatever else lands)** → review page → the owner reads the typed forty → the critic
gets both. **If that run reads clean on the new ruler and the review page, it is the release candidate.**

**Dropped from pre-release:** `gate-calibration`; 19b and 19c (no defect); item 16 (post-release by the
owner's ruling); the damage-band knob (offense is at print — 103% of its median — so there is nothing
to lift).


**Same-day if there is the hour (deterministic, 3 of 3 on every spot check, not blockers):** Cunning
Action on monks → Step of the Wind (14/14; SRD 5.2 monk); the returning-weapon clause attaches to the
THROWN weapon, not the second slot (Harl's Shortsword says "a handaxe returns", 7/7; Meshrin's Javelin
is right); "Spitting Maw" renders melee (6/6 — the name promises ranged); a CR floor on death riders
(Dust-Death Bite "short of a Wish" on a CR 1 beast — print puts these at CR 13+); Great Weapon Master
is a PC feat, not SRD 5.2 (3/40).

**NOT built — the critic's item E as written.** Their §5 says four sheets show "the matcher returns
a print head and class_npc swaps the chassis." The traces: **1 of 4** (Vell — matcher twist Pirate
Captain, call Gladiator). Skritch, Mother Ash and Big Bob all read `the matcher would have said
homebrew` — the matcher found NOTHING, so no head was overridden. That is a matcher-reach problem
("goblin boss", "hag midwife", a giant who throws boulders are invisible to `printCanonFor`), a
different item, post-release. Build only E's verified half, folded into item 12: when the matcher
DOES hold a print head, class_npc adds a class row to that body and never swaps the chassis.

**Other corrections to the critic's two documents, for the record:** "hot tail that did not exist
on the last two gates" — it existed; our gate was blind to it (item 13), the same two SOFT hots
appear on all three frozen sweeps. "Corrosive Drip is a checker fix" — engine attribution (item
17). #12 Big Bob "the role word won" — the call chose homebrew-caster and the matcher agreed; a
wizard giant, yes, but not by that mechanism. Everything else they stated that we could check
held: A-ii's 53-a-hit, Krennik's event, Mind Flayer INT 4 / CHA 4 / Languages None, the stuck
list, B's print expectation of ~0 (it is 0).

**Known gaps to ship with, agreed with the critic:** a weapon named as what WOUNDED the creature can be read as its weapon (the Red Dragon's lance — 1 of 80 inputs, 1 of 6 rolls; owner declined a call field for it 2026-11-09); the two-noun compound ("vampire pirate",
"owlbear zombie" — 2 of 40 typed inputs; release note: *type the base monster, describe the
mashup*); the Beholder's stated CR (but see the critic's §4 — the −7 is a PI alias carrying the
NAME and not the creature; the cheap fix is the label follows the body, post-release); the 15
coin-flip clauses; the two unverified arms (replay them against saved sheets — if the Pit Fiend
shape no longer exists, BUILD the input that forces it rather than wait).

**THE NERF PATH LEADS (owner, 2026-11-09: "a GM wanting to nerf a monster is more likely in
general").** Measured across 440 sheets / 11 fortys: 9 distinct lacks asks, the common shapes
honoured 6–7 of 7 ("no magic at all", "instead of regrowing", "understands no Common", "lost a
hand"); 19 refusals, mostly correct ("scary", "haunted suit of armor" are not absences). Two gaps:
**(a) the lack pass deleted 4 authored flaw rows this week — all four on #15** (item 15: the one
recurring FAIL, and it is a nerf); **(b) "only X" is not read as a lack of everything else**
("speaks only Giant" refused 5×, "speaks only the old tongue" 1×) — but both sheets shipped RIGHT
via a sibling clause, so post-release. **Test-set finding:** `typed40` carries only 2 nerf inputs
in 40 ("lost a hand", "it does not brawl"); when inputs are next revised (after the frozen window),
nerfs should be a quarter of the GM forty.

**Order for Opus (2026-11-09 evening, superseded by 7.9d below):** 19a → 19b → 19c → 20 → 23 → 22 → 21 → 24 → 26 → 25 → 27 → 14b → 18 melee half → `npx jest … --silent` →
`npm run build` → `sweep` → `typed40` → both to the critic with this section's table.

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
