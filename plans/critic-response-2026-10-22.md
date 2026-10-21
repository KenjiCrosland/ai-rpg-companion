# Critic response, package six: the receipt gate is a rubber stamp

**Trigger:** picking up after the critic's review of `sweep-2026-10-21T22-17-49`
(package six). Read `critic-response-2026-10-21.md` for what package six was
answering, and `BACKLOG-reskin-2026-10-21.md` for the standing FAIL rate.

**Verdict: 6 ship / 27 fix-lite / 7 fix** (package five: 5 / 26 / 9).
2024 half 3 / 13 / 4; 2014 half 3 / 14 / 3.

What the 1d replacement bought is real and should not be given back: twists have
rows again (Hydra's two smoke rows, the Vampire's garden, Knell Warden's Death
Knell + Funeral Din, the bell swarm ringing over the dying), Vashka holds the
line, Halric has his Mace, the gap trace reports at ship.

## THE CLAIM I ASKED THE CRITIC TO ATTACK FAILED. Accepted.

I put this up as the load-bearing claim: *the `expresses` element receipt is hard
to satisfy spuriously, so it is a sound substitute for a GM quote.* It is not.
Membership validation does work — the call cannot invent a third element — but
membership is not expression, and the gate passes decoration four ways.

**The exhibit, and it is decisive.** Adult Red Dragon's `Blindside Lash` names the
GM's twist word for word ("a blinded eye from an old lance") and ships as *"a
creature that touches the dragon takes 10 (3d6) fire damage."* The checker's own
`name-mechanic` gate failed it. The receipt was satisfied by putting the twist's
words in the **name** of a generic damage-on-touch template. That is precisely the
rubber stamp I said would falsify the claim.

Of the five twists in my own case table, **only Hydra and Vampire express theirs
mechanically.** The other three are a generic template wearing the twist's words:
Red Dragon (damage on touch), Stone Golem's `Sorrowful Wrath` (advantage while
bloodied), Bone Sun Lich's `Shard Retort` (necrotic damage on touch).

And the premise under the claim was wrong too. I wrote that the elements "were
drawn from the GM's description, so naming one is a receipt of the same kind as a
quote." **The concept call writes a [body]/[behavior]/[aura] triple for every
creature and invents freely on short prompts.** Greatsword Skeleton — GM prompt
"a skeleton with a greatsword" — had its free row name "relentless shock assault
that stands and trades blows" and ship as 2d6 bludgeoning to anyone who touches
it. That is the decoration row my case asked the critic to find, and it was in
the package.

### Sameness moved rather than went away

**12 of the 13 shipped free rows come from three templates** — damage-on-touch ×5,
bloodied-burst ×4, warded-mending ×3. Free rows are now the main sameness source,
and the seed-share metric does not count them.

## What I verified myself (and where my own report was wrong)

### I marked a pass criterion that had failed

My package-six case said `condition-duration` fired "once, correctly." **It is a
false positive and I should have caught it.** Drowned Choir's `One Voice` reads:

> When the drowned choir would be deafened or silenced, it sings through every
> throat it has drowned; ... and it is immune to being deafened.

It *imposes nothing* — it is an immunity. The gate fired because the **writer's
record** said the row imposes Deafened. I validated the criterion by reading the
gate's own message instead of the row text, which is measurement lesson 4 ("a
decline must trace what it saw") turned on myself: a FIRING must also be read
against the row, not against its own explanation. That immunity also belongs on
the Condition Immunities line.

### The allowance double-count: confirmed, with the mechanism

All four sheets the critic names show the pattern — a free row granted, then a
second row refused with "this sheet's free-row allowance (1) is spent":
Bog Hound, Thunderwall Drake, Drowned Choir, Trench Antiphon.

`freeRowsUsed` is incremented **at grant** (`generate.mjs:4030` and `:4456`) and
**never released** when the granted row is later vetoed or dropped. Confirmed end
to end:

- **Bog Hound** — granted `heated-body`; `heated-body` is in the
  VETOED-AFTER-ACCEPTANCE list; `Silt-Slick Hide` then refused for a spent
  allowance.
- **Trench Antiphon** — granted `execute`; `execute` vetoed (the value floor took
  it); the real trait `Brineback Spray` refused for a spent allowance.
- **Thunderwall Drake** — granted a `resonant-body` trait; the finished sheet is
  `Multiattack | Claw | Thunder Cone (Recharge 5-6)` with **no trait at all**,
  while `Stormhide Retort` was refused for a spent allowance.

So "17 free rows landed" was stamped at grant. **13 shipped.** My case's headline
number was the wrong one.

### 2014 paralysis: the critic's conclusion is right, the mechanism is different

Confirmed the defect. 2014 Bone Sun Lich ships *"must succeed on a DC 19
Constitution saving throw or be paralyzed"* with no bound, and the gate read the
block **clean**.

The critic guessed the gate reads the 2024 printing. It does not — and the reader
is not the problem. Measured directly:

| text | `imposedCondition` |
|---|---|
| `or be paralyzed.` (2014) | **"Paralyzed"** |
| `or have the Paralyzed condition until...` (2024) | `null` |

The reader detects the 2014 phrasing fine. **The real cause is
`checker.mjs:673`:** the whole adjudicability loop opens with

```js
if (/^(?:Multiattack|Legendary Action Uses|Spellcasting)\b/.test(e.name ?? '') || e.print) continue;
```

`Paralyzing Touch` is stamped `e.print` ("Actions/Paralyzing Touch — print's own
row"), so **every adjudicability gate skips it** — including `condition-duration`.
The exemption is justified for print's *own* text. But print's 2024 text is:

> ...the target has the Paralyzed condition **until the start of the lich's next turn.**

The 2014 conversion rewrote that row and **dropped the duration**, while the row
kept its print stamp. **The print exemption outlives the text it was granted
for.** This is general, not about paralysis: every converted print row is exempt
from every adjudicability gate while carrying text print never wrote.

The responsible layer already exists — `checker.mjs:612`'s
`conversion-dropped-half` does exactly this comparison (the 2024 row halves on a
success, the 2014 sheet dropped the clause) via `legacyByName`. The fix is a
sibling of that check, not a new special case, and it is the printing-equivalence
test the package-five brief already asked for.

## The owner's ruling (2026-10-22)

**Invented-element free rows on homebrew are allowed, capped by template family,
and counted in the sameness metric.** The owner's lean, matching the critic's
recommendation: at most one per template family per sheet, and visible in the
metric so we can see whether free rows add variety or just more damage-on-touch.

Note this ruling is what makes the retaliation-family cap (critic's proposal 7)
load-bearing rather than cosmetic — Brass Tyrant ships both `Molten Rebuke` and
`Molten Reckoning` today.

## The replacement for membership-only `expresses`

The critic's proposal, which I accept in full:

1. The concept call tags every element with its **source** — the GM clause it came
   from, or `invented`.
2. A free row naming a **GM-sourced** element earns that clause's coverage credit.
   This alone recovers much of the 78% coverage drop.
3. A free row naming an **invented** element is decoration — allowed per the
   ruling above, capped by family, counted in the metric.
4. **Expression is a call field judged by a different call**: "quote the words of
   this row that carry the element." Code checks the quote is present in the row
   text. `Blindside Lash` has nothing to quote. *(This is the house rule working
   as intended — meaning is a call field, and the engine validates the answer.)*
5. The allowance is counted **once, at ship**.
6. The receipt is **re-run after any rename** (Purple Worm's `Scrap Spray` →
   "Acid Burst" kept the receipt and lost the expression).
7. The retaliation family (damage-on-touch, bloodied-burst, own-turn-punisher) is
   capped at one per sheet.
8. Seed share counts free rows, broken down by template.

## Order of work (the critic's, unchanged)

1. **Instrument honesty** — allowance bookkeeping at ship; the gap ship-check
   counts appended riders (Purple Worm and Krennik log `VETOED: charge` while the
   charge rider is appended to their attacks — the check looks for a row, not a
   rider).
2. **Element provenance** — the source tag, the expression quote, the
   retaliation-family cap, free rows in the sameness metric.
3. **The three remaining provenance gates and verb preference** — credit, not
   existence. Same treatment as 1d: "a print body takes only what the user's words
   ask", "a rider rides the user's own attack", "a whole-round ability the GM never
   asked for". Verb preference is still untouched and is item 1's other half.
4. **Regressions** — 2014 paralysis (the print-exemption hole above), the
   Sellsword's shortsword, Klahk's Multiattack, warded-mending anchors, duplicated
   riders.
5. **Zone pricing at the value floor** — Brass Tyrant's Decree of Brass (EV 0) and
   Plague Archon's Brood Spit (EV 3.4) fell to seeds; price zones as
   creatures × rounds, or let them ride as bonus/recharge actions.
6. **Coverage** — chassis-row binding to the clauses they answer; the rename rule
   extended to chassis rows and to hyphenated words ("One-Eyed Grudge" →
   "Come Hither" dropped the GM's "eye").
7. The still-open list.

## Test categories, proposed before writing (the critic asked for this)

1. The free-row allowance is counted at ship, once.
2. Every element carries a source (a GM clause or `invented`); a free row naming a
   GM-sourced element earns that clause.
3. The expression quote is present in the row text.
4. The gap ship-check counts appended riders.
5. `condition-duration` reads the 2014 printing, and an **immunity is not an
   imposition**.
6. Multiattack references resolve after renames.
7. Named parts survive re-arm.
8. A warded-mending anchor names a thing that is on the sheet.

**Measure each against the corpus before shipping it** — the 58-times lesson.

## Done when

- Every free row on the re-render either earns a GM clause or is flagged invented,
  and each one quotes the row text that carries it.
- No retaliation template appears twice on a sheet.
- The four section-4 regressions are closed, the 2014 printing included.
- The run reports free rows and seeds per template, **measured at ship**.

## The count: four whole-sheet budgets, answered mid-build

Asked before designing the allowance fix: **how many whole-sheet questions does
the generator answer at a local point in its sequential build?** The build is one
long pipeline of LLM rounds (base sheet ~2011 → ideas ~3649 → action seat ~4145 →
trait seat ~4346 → repair ~4547 → audit ~6598), each call handed `sheetSoFar` so
it can see what is taken. **That ordering is load-bearing** — it is what stops
duplicate rows. The bug is never the ordering; it is a *global* decision made at
one of those local moments.

Four such budgets. **Two were already found and fixed — with the same remedy.**

| budget | where | state |
|---|---|---|
| AC filter (Guarded Stance) | menu build | **FIXED** — reconcile against the FINISHED AC, "which cannot miss a path" |
| Row cap (rows per sheet) | `:2754`-`:2827` | **FIXED** — evicts by priority; "the cap evicts by priority, it does not refuse the newcomer" |
| Free-row allowance | `:2401`, `:4030`, `:4456` | **BROKEN** — refuses the newcomer; counter spent at grant, never released |
| One nova per sheet | `:3131`, `:4198` | **BROKEN** — see below; this is `two-novas` |

### The row cap is the precedent, and it is measured

```
// cap used to REFUSE the incoming row, so kit rows — the strongest source of
// move sets in the measured runs — yielded while chassis filler stood: Evasion
// left four rogue sheets, the Mire Sifu lost Patient Defense and Marsh Stride,
// and row-cap yields went 0% to 22% of blocks after 10-13. Rows now leave in
// priority order instead: chassis filler first, then the signature, then kit
// rows. A row the GM's own words bound NEVER yields, and neither does print's.
```

The free-row allowance was written later and **repeated the mistake this comment
records abandoning.** So the fix is not a new design — it is applying an
established, measured, blessed policy in the same file to a budget that missed it.

### `two-novas` is this same bug — root cause found

`hasChassisNova` (`:3131`):

```js
const hasChassisNova = (secs) => (secs.Actions ?? []).some((e) =>
  !e.library && !e.template && /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '') && ...);
```

Two independent holes, both "mid-build answer to a whole-sheet question":

1. **It excludes `e.library` and `e.template` rows.** A *fitted* nova is invisible
   to the count, so it never blocks a later one.
2. **It runs at `:4198`; print canon places its rows at `~:5658`** — about 1,460
   lines later. So print's own nova is not on the sheet yet when a fitted nova is
   being gated. This is exactly the Guarded Stance shape ("print canon moves the
   AC afterwards").

**Proven on the Air Elemental** (`sweep-2026-10-21T22-17-49`, 05):

| row | `library` | `template` | `print` |
|---|---|---|---|
| `Chorus Barrage (Recharge 5-6)` | true | `active-toll` | false |
| `Whirlwind (Recharge 4-6)` | false | false | **true** |

`Chorus Barrage` **kept its gate**, which proves `hasChassisNova` evaluated false
at `:4198` — Whirlwind would satisfy the predicate had it been in `sections`.

### What this does to the proposal

One ship-time reconciliation that owns the whole-sheet budgets now pays for
itself four times: it fixes the **free-row allowance**, fixes **`two-novas`** (the
standing pick, 4 firings across 6 forties), and is the natural home for the
critic's **retaliation-family cap** and the ruling's **GM-sourced-over-invented**
preference. Four questions, one place, one answer each.

Keep the existing mid-build checks as cheap advisories if they help the prompts;
the *enforcement* moves to the finished sheet, where the row cap and the AC filter
already live.

**Test categories this adds** to the eight above:

9. A fitted nova blocks a later nova (the `library`/`template` exclusion is gone).
10. A nova that arrives with print's rows is counted against the one-nova budget.

## Landed: `settleSheetBudgets` — the budgets settle on the finished sheet

Order item 1, the enforcement half. `generate.mjs` now exports
`settleSheetBudgets({ sections, printExact, scaled, cr, generation, trace })`,
called immediately after the late nova **damage** cap — which already runs there
"after everything that can change its input," for exactly this reason.

**What moved:**

- **The free-row allowance no longer refuses mid-build.** Both grant sites
  (action and trait) now refuse only when `freeAllowance === 0`, i.e. an EXACT
  print sheet, where print closes the row set and no finished sheet could hold a
  free row. Otherwise the candidate is granted, the row is stamped `freeRow`, and
  the budget settles at ship. A granted row vetoed later no longer costs the
  sheet its second candidate.
- **One free row per DECLARED seat cell.** The critic's "retaliation family"
  needed no new vocabulary: `heated-body`, `bloodied-burst` and `resonant-body`
  all declare `trigger=on_being_hit, effect=damage`. The declared
  `section/trigger/effect` cell IS the family, read off `TEMPLATE_BY_ID`.
- **One nova a sheet, counted whatever wrote it.** The count no longer excludes
  `library`/`template` rows, and it runs after print canon has placed print's
  rows. Print's own nova always keeps its gate; a name-gated extra un-gates and
  re-prices through the same `valueCheck(..., noGate: true)` branch the mid-build
  sites use, syncing `text_noRider` (the rider weld rebuilds from that twin).
- **The sameness metric sees free rows.** `generation.free_rows` and
  `generation.free_row_templates` (critic's proposal 8).

**Gate:** Jest 116 suites / 3708 passing (+11 new in
`reskin/__tests__/sheet-budgets.spec.js`), build clean.

### A correction, and the second time this bit the same way

I reported to the owner that **0 of 329** print blocks carry two Recharge Action
rows. That was measured with a pattern matching only "Recharge". **The gate's own
predicate also counts `1/Day`** — and under it, print carries **one** such block:

> **Vrock** — `Spores (Recharge 6)` + `Stunning Screech (1/Day)`

So "one nova a sheet" is a 328-of-329 rule, not an absolute. `settleSheetBudgets`
is safe either way because it never un-gates a print row (tested). **But the
checker's `two-novas` gate does not exempt print rows, so a Vrock-derived sheet
would FAIL on print's own shape.** Latent, not yet observed in a forty. Flagged
rather than fixed — gate tuning is the owner's call.

This is measurement lesson 1 again ("a rule briefed as universal may fail print"),
and the second time this session that quoting a summary instead of reading the
artifact produced a wrong number. The first was scoring `condition-duration`
"correct" off the gate's own message.

### Known limits of this landing

- **A text-gated extra nova cannot be un-gated by renaming** (its limit is in its
  text). The pass counts it, prefers to keep it, and traces that the checker will
  still report the pair. A text-level conversion is out of scope here.
- **The grant-side relaxation is not unit-tested.** The 11 new tests cover
  `settleSheetBudgets` on finished sheets; that the grant sites no longer refuse
  prematurely is covered only by the full-pipeline smoke.
- **Still open from order item 1:** the gap ship-check counting appended riders
  (Purple Worm and Krennik log `VETOED: charge` while the charge rider is
  appended to their attacks).

### Pass criteria for the `budgets6` smoke, written before the run

Six cases, chosen to cover only what this landing changed: the four sheets that
lost a real trait to the phantom budget (Bog Hound, Drowned Choir, Trench
Antiphon, Thunderwall Drake) and both `two-novas` sheets (Air Elemental, the
glacier's heart / Rimeheart Stalker).

1. **No sheet refuses a row for a spent allowance.** The string
   "allowance (1) is spent" no longer exists in the code; a trace carrying it
   means the edit did not take.
2. **The four trait-losers each ship their free row.** `generation.free_rows` is
   1 and the trait is on the finished sheet.
3. **The Air Elemental ships exactly ONE gated nova** — `two-novas` does not
   FAIL. Expect either the mid-build un-gate or a new `one nova at ship` trace.
4. **The glacier's heart ships exactly one gated nova** — same.
5. **`generation.free_rows` ≤ 1 on every sheet**, and
   `free_row_templates` names the template that shipped.
6. **THE RISK OF THIS LANDING: no dangling reference.** The budget pass EVICTS
   rows, and an evicted row that a Multiattack cites is the Klahk failure mode.
   `lint:dangling-use-ref` and `undefined-attack-ref` must stay clean. The pass
   calls `sweepDeadName` for exactly this reason; criterion 6 is what proves it.
7. **No new FAIL class** on these six.

A sheet that ships a free row it previously lost AND stays clean on 6 is the
result this landing is for.

### The `budgets6` smoke read (`smoke-out/budgets6-2026-10-21T23-37-07`)

6 of 6 generated, **1 FAIL of 6 and it is not this change's**.

| criterion | result |
|---|---|
| 1. no "allowance is spent" refusal | **PASS** — the string is gone from the code and the traces |
| 2. the four trait-losers ship their free row | **3 of 4** (below) |
| 3. Air Elemental ships exactly one nova | **PASS** — only `Whirlwind (Recharge 4-6)`, print's own |
| 4. the glacier's heart ships one nova | **PASS** — no `two-novas` anywhere in the six |
| 5. `free_rows` ≤ 1, templates named | **PASS** on all six |
| 6. no dangling reference (the risk) | **PASS** — 0 `dangling-use-ref` / `undefined-attack-ref` |
| 7. no new FAIL class | **PASS** — see the one FAIL below |

**Free rows that now ship where the phantom budget had been eating them:**

```
Drowned Bog Hound   free_rows=1  heated-body     "Clinging Mire Coat"
Heart of Glacier    free_rows=1  shield-bash     "Glacial Trample"
Trench Sovereign    free_rows=1  resonant-body   "Pressure Echo"
Anvil-Cloud Drake   free_rows=1  resonant-body   "Thunder Retort"
```

Trench Antiphon's prompt had lost its trait to the spent allowance in the forty
and now ships one; so do the Bog Hound and the Thunderwall Drake's prompt.

**The fourth, Drowned Nave Choir, correctly ships none** — and for the right
reason: `signature miss: trait — "resonant-body" ... the call named none of this
creature's own elements for it: decoration`. That is the pre-existing receipt
gate, not the budget. A sheet whose call names no element still gets nothing.

**The one FAIL is unrelated:** `blind-beyond-darkvision` on Trench Sovereign (a
senses/header gate) on a poor roll of that prompt — concept 1/9. Nothing to do
with row budgets or novas.

### What the smoke did NOT exercise

Stated plainly rather than counted as coverage:

- **The nova un-gate never fired live.** No `one nova at ship` trace in the six —
  this run's Air Elemental produced only one nova on its own, so the pair never
  formed. The fix is covered by unit tests only.
- **The eviction path never fired live.** Every sheet had exactly one free-row
  candidate, so nothing was over budget and `sweepDeadName` was not exercised in
  anger. Criterion 6 passing therefore shows no regression, not that eviction is
  proven safe. Unit tests cover the eviction; a forty at close-out is what would
  exercise both for real.
