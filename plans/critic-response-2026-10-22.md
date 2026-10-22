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

## Landed: order item 1 complete — the gap ship-check counts appended riders

The other half of instrument honesty. A rider welded onto a row **owns no row of
its own**, and the ship-check asked "did this template ship?" by reading
`e.template` off the rows — so a rider that shipped read as a veto.

Confirmed in the forty before fixing: both sheets logged the weld AND the veto.

```
13-purple-worm : signature rider: charge -> Bite (appended; ...)
34-krennik     : signature rider: charge -> Saber (appended; ...)
                 ...and both [gap] lines stamped VETOED AFTER ACCEPTANCE: charge
```

**The fix follows the line directly above the bug.** The weld already hands the
host the rider's *provenance* (`host.boundKeys = [...]` — "the rider's provenance
rides on the host"); it simply never handed over **which template** shipped. It
now also records `host.riderTemplates`, and the ship-check reads that alongside
`e.template`.

Extracted as `readGapOutcomes({ sections, gapRecords, generation, trace })` for
the same reason `settleSheetBudgets` was — the late passes are otherwise only
reachable through chained LLM mocks (the critic's test category 4).

**This moves a published number.** "VETOED after acceptance: 10 of 30" counted at
least these two shipped riders as vetoes, so the real figure is **8 of 30 or
better** — the 1d replacement did more than I reported, and `gap-outcomes.mjs`
will show it on the next run with no change to the parser (the trace format is
unchanged; only which branch fires).

**Gate:** Jest 116 suites / 3713 passing (+16 total new), build clean.

### Pass criteria for the `riders2` smoke, written before the run

Two cases: Purple Worm and Krennik Skullstandard, the two sheets that misreported.

1. **Wherever a `signature rider:` weld trace appears, that template's `[gap]`
   line reads `[landed: X]`** — never `VETOED AFTER ACCEPTANCE`.
2. **`generation.gap_vetoed` does not count a welded rider.**
3. **No new FAIL** on either sheet.
4. **Honest caveat up front:** the charge rider may not re-form on this roll
   (the forty turns over almost completely between runs). If no
   `signature rider:` trace appears, the fix is **not exercised live** and rests
   on the unit tests — say so rather than counting the run as proof.

### The `riders2` smoke read (`smoke-out/riders2-2026-10-21T23-53-06`)

**0 FAIL of 2.** Criterion 4's caveat is the headline: **the charge rider did not
re-form on this roll, so the fix was not exercised live.** No `signature rider:`
trace on either sheet. This run's Krennik shipped `Pack-Call Standard` (lure)
where the forty's rode `charge` onto his Saber. The rider fix rests on its unit
tests until a run happens to weld one.

What the run DOES establish — no false veto survives:

| sheet | `gap_vetoed` | stamps |
|---|---|---|
| Purple Worm | 0 of 1 | `[landed: exploiter]` |
| Krennik Skullstandard | 1 of 2 | `[landed: lure]`, `[VETOED: resonant-body]` |

**The one veto is a TRUE positive**, traced end to end:

```
closest accepted: trait — the call refused every template but named
  "resonant-body" as nearest; it lands rather than the row being dropped
trait declined: "Resonant Body" — no receipt of any kind: no quote, no concept
  key, and the call named none of this creature's own elements
```

Accepted by closest-acceptance, then declined by the receipt gate. The row
genuinely never reached the sheet, and for the right reason.

**A verification error worth recording.** I first "confirmed" resonant-body was
absent by scanning the saved JSON's `sections` — but **this sheet's saved JSON has
empty sections** (so do Bog Hound's and Drowned Choir's). The check could not
have failed, so it proved nothing. The trace and the rendered card are the
authoritative record for a smoke, not the JSON. Third instance this session of
the same mistake shape: read the artifact, not a proxy for it.

**This veto is also a live example of order item 2's remaining work** — the
critic's point (c): pass/fail tracks whether the call FILLS the `expresses`
field, not whether the row is decoration. Krennik's element list contains
"skull-trophy standard" and the idea was literally about the standard's rattle,
yet the call named no element and the row died. The source tag plus the
expression quote are what fix this class.

## Landed: the print-exemption hole — `conversion-dropped-duration`

Order item 4's first regression, pulled forward because it was already diagnosed
and is a correctness bug that ships today.

**The root cause, which is NOT what the critic guessed.** The critic expected the
gate to be reading the 2024 printing. It is not, and the reader is fine —
`imposedCondition` detects the 2014 phrasing ("or be paralyzed") and is actually
blind to 2024's "has the Paralyzed condition". The real cause is
`checker.mjs`'s adjudicability loop, which opens:

```js
if (/^(?:Multiattack|Legendary Action Uses|Spellcasting)\b/.test(e.name ?? '') || e.print) continue;
```

`Paralyzing Touch` is stamped `e.print`, so **every adjudicability gate skips
it**. The exemption is justified for print's own text — but the 2014 conversion
REWRITES the row and it keeps the print stamp, so a converted print row carries
text print never wrote and is exempt from every one of those gates. Print's own
2024 text ends "until the start of the lich's next turn"; the conversion dropped
it. **The exemption outlives the text it was granted for**, and this is general,
not about paralysis.

**The fix is the printing-equivalence test** the package-five brief asked for,
placed beside `conversion-dropped-half` in `gateEdition`, which already makes
exactly this 2024-vs-2014 comparison through `legacyByName`. It accuses only the
CONVERSION: it fires when the 2024 row bounds the condition and the 2014 row does
not. If neither printing bounds it, that is a different finding and not this
gate's to make.

**Measured before shipping**, over the 19 two-printing sheets of
`sweep-2026-10-21T22-17-49`: **1 fire, 0 false positives**, and the fire is the
Bone Sun Lich's `Paralyzing Touch`. Re-running the checker over that forty now
reads **6 FAIL blocks instead of 5** — the new one is a defect that was shipping
invisibly, which is the same pattern the backlog records for the 10-20 forty
("0 FAIL was NOT better").

**One definition, not two.** The bound pattern and the must-be-bounded condition
list are now module constants (`CONDITION_BOUNDED`, `MUST_BE_BOUNDED`) shared by
the `condition-duration` gate and this new check. Two copies of a bound pattern
is how a gate and its sibling drift apart.

**Gate:** Jest 117 suites / 3719 passing (+6), build clean.

### NOT done: the immunity half of test category 5 — needs a ruling

The critic's other section-4 item: the single `condition-duration` firing was a
**false positive**. Drowned Choir's `One Voice` reads "it is immune to being
deafened" — it imposes nothing, but the writer's record said it did, and
`imposedConditions` **prefers the record and never consults the text**:

```js
const rec = typeof row === 'object' ? row?.imposes : null;
...
if (recs.length) return recs;   // the text is never read
```

Fixing it means teaching the engine that an immunity is not an imposition, and
every formulation needs **new phrase patterns** — "immune to being deafened",
"can't be deafened", and the fact that "would be deafened" is a trigger rather
than an application. The 2014 text reader would otherwise match "be deafened"
inside "would be deafened" and the gate would still fire.

CLAUDE.md's standing instruction is explicit: *"If a fix seems to need a new word
rule, stop and propose it to the owner instead of writing it."* So it is proposed,
not written. Two candidate shapes:

1. **Validate the call's answer** (fits the house rule's own split — the call
   judges, the engine validates): on authoring, drop a recorded `imposes` the row
   text contradicts. Needs the immunity patterns.
2. **Ask the authoring call directly** — it already answers `imposes`; it could
   answer whether the row *imposes* the condition or *grants immunity* to it, as
   a second enum on a call we already make. No word rule at all, and the same
   shape as the `costs` lesson (3/5 wrong → 5/5 right).

Shape 2 looks right by the repo's own precedent, and it is the owner's call.

### A third vacuous-assertion slip, caught by a harness guard

The first draft of `conversion-duration.spec.js` extracted findings with
`Object.values(r.gates).flat()` — but a gate is `{ status, findings: [...] }`, so
that yields gate objects with no `rule`, and every `not.toMatch` assertion
matched the empty string. **Four negative tests passed vacuously.** Caught only
because the positive test failed and forced a look at the real shape.

The file now carries a guard test — *"the harness reads findings at all"* —
asserting the extractor sees something on a block known to be flagged. Any spec
whose negatives carry the weight should have one.

## Landed: `condition_relation` — the immunity half of test category 5

The critic's other section-4 item: the single `condition-duration` firing was a
**false positive**. Drowned Choir's `One Voice` grants immunity to Deafened and
imposes nothing, but the writer's record said it did.

**The premise of my own earlier proposal was wrong.** I had said the fix needed
new immunity phrase patterns. It did not — the prompt ALREADY said:

> "Say null when the row only MENTIONS a condition — … when it names one to say
> the creature is **immune** to it …"

The call had that instruction and disobeyed it. So "tell it more" was never the
fix. The actual flaw: **one nullable field was being asked to carry five
different relationships** — inflicts / requires / immune / self / none. Collapsing
them is what made it unreliable.

### Probed alone first, which is the method worth keeping

Per the owner (2026-10-22), a prompt hypothesis is tested with **direct calls
through the dev proxy**, not by running the pipeline and reading traces.
`scripts/probe-condition-relation.mjs` is checked in beside `probe-path.mjs`:
15 hand-labelled rows × 3 runs, ~90 calls, about four minutes.

| round | strict | on the consequence |
|---|---|---|
| straightforward cases only | 27/27 | 27/27 |
| + 6 adversarial shapes | 41/45 | 44/45 |
| + one prompt line on flavour | 42/45 | **45/45** |

**The strict score is the wrong number and I measured it wrong at first.** The
engine honours a recorded `imposes` ONLY when the relation is `inflicts`, so
confusing `requires`/`immune`/`self`/`none` with each other costs nothing. The
probe now reports the consequence — inflicts vs not — as its headline.

Two cases worth recording honestly:

- **`Soothing Word`** ("ends the Frightened condition on it") — I labelled it
  `none`; the call answers `requires` 3/3, and that is defensible: the row does
  need the ally to have Frightened. **Kept in the probe as a recorded dispute
  rather than re-labelled to improve the score.** Immaterial either way — neither
  value is `inflicts`.
- **`Dread Aspect`** ("a frightening ruin of bone and tallow") read as
  `Frightened/inflicts` on 1 of 3 runs — flavour prose scored as a rules effect.
  This was the one genuine miss, and one prompt line closed it 3/3: *"A word that
  merely DESCRIBES is not the condition."* Its failure mode was a spurious checker
  complaint, not a shipped defect — the visible stochastic error the ruling
  accepts.

### What landed

- The prompt asks `condition_relation` as its own enum on traits and reactions,
  and `imposes` now names the condition the row INVOLVES.
- `parseAuthorResponse` validates by **membership** and honours the record only on
  `inflicts`. Verified across all five values plus two fallbacks:

```
inflicts  -> imposes="Prone"    requires -> imposes=null
immune    -> imposes=null       self     -> imposes=null
none      -> imposes=null
(no relation)      -> imposes="Stunned"  — older answers unchanged
(unknown value)    -> imposes="Charmed"  — falls back rather than guessing
```

- Backward compatible by construction: an answer carrying no relation behaves
  exactly as before, so nothing depends on the new field arriving.

**Gate:** Jest 117 suites / 3730 passing (+8), build clean.

### The `relation2` e2e read (`smoke-out/relation2-2026-10-22T00-58-52`)

One full e2e with trace on the two sheets that exposed the defects.

**The print-exemption fix is confirmed LIVE.** Ossun Lich — a fresh generation of
the archlich prompt, not the saved forty — fires:

```
edition · FAIL · conversion-dropped-duration: Actions/Paralyzing Touch:
  the 2024 row bounds Paralyzed; the 2014 sheet dropped the duration and
  imposes it indefinitely
```

So the gate catches the defect on a run nobody hand-picked, and the exemption
hole is closed in anger rather than only against saved evidence.

**The `condition_relation` fix was NOT exercised live, and the clean read is not
evidence for it.** Drowned Hymn Choir came back clean — but that roll produced no
authoring-call trace and no immunity-shaped row at all, so the field never came
into play. The clean verdict is a different roll, not a pass. Same shape as the
rider ship-check two landings ago: the defect simply did not re-form.

What the relation fix actually rests on:

- **45/45 on the consequence** across 15 hand-labelled rows × 3 runs of direct
  calls (`scripts/probe-condition-relation.mjs`) — including the exact defect row,
  `One Voice` → `Deafened/immune`, 3/3.
- **8 unit tests** covering all five enum values plus the two fallbacks.

That is stronger evidence than a single e2e roll would have been, which is the
point of probing the prompt alone. But it is not the same as having seen it fire
in the pipeline, and it should not be written up as though it were. The next forty
will exercise it incidentally; `grep -h "condition_relation" <run>/*.md` is the
check, and the trace does not currently log the field — **worth adding a trace
line for it before the next forty**, or the evidence will be invisible again.

## Landed: order item 3 — the three provenance gates decide credit, not existence

The action seat had the same disease 1d had, wearing three different coats. Each
gate killed the row outright (`actionT = null`) when it could not quote the GM:

| gate | the row the critic named |
|---|---|
| "a print body takes only what the user's words ask" | Renounced Templar's `Wardens' Rebuke`, Greatsword Skeleton's `Sweeping Greatsword` |
| "a whole-round ability the GM never asked for" | Scree Slide's `Grinding Surge` |
| "a rider rides the user's own attack" | Thunderwall's `Stormwake Corridor` |

All three now accept the **element receipt** as a receipt of the same kind as a
quote, through one shared `takeAsFreeRow(seat, label)`. The row earns no clause
credit and still faces the ship-time free-row budget, the value floor, dedup,
adjudicability, body legality and the nova caps. Exact sheets are untouched —
print closes the row set and the budget is 0 there.

**The nova gate is the one worth watching**, since a nova is the largest single
power grant a seat makes. What still holds it is named in the code: one Recharge
nova a sheet (enforced on the FINISHED sheet, counting every provenance),
`NOVA_CAP` on its damage, the value floor, and the free-row budget. A second nova
taken this way un-gates and re-prices rather than shipping beside the first.

### Why this is not the blanket allowance the critic originally asked for

`expresses` is validated by **MEMBERSHIP** against the element list the concept
call produced. My first attempt at a positive test failed for exactly that
reason — the element I invented for the fixture was not in the creature's list, so
the row was still declined. The test only passes once `signatureElements` actually
contains it. **That membership check is the whole guard**, and it is now pinned
from both sides:

- With no element named, all three action-seat pins still refuse — the gong's
  `Bone-Rattling Note`, the cauldron's `Scalding Spill`, `Scalding Vent`.
- With a real element named, the cauldron's nova ships as a free row, earning no
  clause credit (new test, same fixture, one field different).

The three trait-seat decoration pins (`Iron Fury`, `Marked Quarry`, the forged
`ground-burst`) are unaffected by construction — they guard the trait seat, which
1d already covered — and still assert both the refusal trace and the row's
absence.

### Also landed: the relation is traced

`condition_relation` now emits a `condition relation:` line for every authored
trait and reaction that carries one, so the next forty can be audited with
`grep -h "condition relation:" <run>/*.md`. Without it the judgment would have
been invisible, which is measurement lesson 4.

**Gate:** Jest 117 suites / 3731 passing, build clean.

**Verb preference (item 1's other half) is still UNTOUCHED** — a keyed template
the call already declined is not a better answer. That is the last structural
piece before element provenance (item 2).

## Landed: verb preference stands down — item 1 is now fully closed

The last structural piece. The receipt test inside `fitSeat` used to fire only
when `verbRanked.some((r) => r.concept.length)` — only when a CONCEPT-KEYED
template was also on the menu — and its trace said the model "picked X over a
concept-verb template."

**That keyed template was ranked FIRST on the menu and the call declined it.** The
decline is information, not an error, and force-binding was retired for exactly
this reason (the retirement note above lists the word-collision defects it caused:
"guard" → Guarded Stance, "mimic" → False Appearance, "ooze" → Aberrant Ground).
Whether some *other* template happened to carry a matching key has nothing to do
with whether THIS row has a receipt.

The test is now uniform: **no verb, no quote, no element named → decoration,
whatever else was on the shelf.** The `conceptBound` ranking stays — ranking a
keyed template first is not overruling the call.

### The blast radius, measured before shipping

Over `sweep-2026-10-21T22-17-49`, of 27 shipped signature rows:

| | rows |
|---|---|
| matched a verb | 46 trace hits across the forty |
| shape fit, NO verb match | 12 |
| of those, quote-backed (`pick kept on the GM's own words`) | 8 |
| of those, element-backed (free rows) | 4 of the no-verb set |
| **newly refused** | **1 — Well Drownedthing** |

The one row that changes had no receipt of any kind and shipped only because no
keyed alternative existed. **It is on the sheet the critic cited in point (c)** —
where the complaint was that `Brine-Slick Coils` was refused while the creature's
own element list held "a body of briny, weed-choked coils". That is the call
failing to name an element it had, and the fix is item 2, not a gate that lets
decoration through.

### A trace matcher moved; no assertion changed

`a receiptless shape fit is declined on ANY body` asserted the
`trait declined:` wording. A receiptless pick is now refused one stage earlier,
inside `fitSeat` (`signature miss: … decoration, not a signature`), so the trace
moved while the outcome did not. The matcher now pins **the reason the two
messages share** — "the call named none of this creature's own elements" — rather
than which gate caught it. The substantive assertion (the row is absent from the
sheet) is untouched, and still passes.

**Gate:** Jest 117 suites / 3731 passing, build clean.

## Where the critic's order stands

| item | state |
|---|---|
| 1. instrument honesty + verb preference | **CLOSED** |
| 2. element provenance (source tag, expression quote, family cap, metric) | family cap + metric landed; **source tag and expression quote remain** |
| 3. the three provenance gates | **CLOSED** |
| 4. regressions | 2014 paralysis **CLOSED**; Sellsword's shortsword, Klahk's Multiattack, warded-mending anchors, duplicated riders remain |
| 5. zone pricing at the floor | open |
| 6. coverage (chassis-row binding, rename on chassis/hyphens) | open |
| 7. the still-open list | open |

Not yet verified live: the `e.gate` equivalence over a forty (nothing reads the
field until it passes), `condition_relation` firing in the pipeline, and the
rider ship-check.

## The branch ten: pass criteria, written before the run

Built fresh for THIS branch's changes, no fixed sentinels (owner, 2026-10-14).
The forty is the release gate, not this.

| # | case | what it is here to prove |
|---|---|---|
| 1 | the thing in the well | verb preference: the ONE row the measurement said changes |
| 2 | Purple Worm | a welded rider reads as landed, not vetoed |
| 3 | Krennik Skullstandard | the same, on a 2014 mounted sheet |
| 4 | drowned cathedral choir | `condition_relation` fires and is traced |
| 5 | archlich | `conversion-dropped-duration` on a fresh roll |
| 6 | Air Elemental | one nova at ship + `e.gate` on a fitted row |
| 7 | glacier's heart | `e.gate` on a CHASSIS nova (2014) |
| 8 | templar priest | print-body gate yields to an element receipt |
| 9 | skeleton with a greatsword | the same |
| 10 | quarry-pit scree thing | nova gate yields to an element receipt |

**Criteria:**

1. **THE EQUIVALENCE CHECK — the point of the run.** For every row whose NAME
   carries a gate, `e.gate` agrees; print rows excepted (their name is the closed
   fact). Anything unstamped is named. Until this passes, no consumer may read
   `e.gate` and the five name-reading sites stay.
2. **No `lint:dangling-use-ref` / `undefined-attack-ref`** anywhere. The budget
   pass evicts rows and `sweepDeadName` is what keeps a Multiattack citation
   valid; eviction was never exercised live.
3. **No `two-novas`**, and no sheet left with zero novas by an over-eager un-gate.
4. **`condition relation:` appears** on any sheet whose authoring call wrote a
   trait or reaction. If it never appears, the field is still unexercised — say so
   rather than counting the run as proof.
5. **A welded rider reads `[landed: X]`**, never `VETOED AFTER ACCEPTANCE`, on any
   sheet showing a `signature rider:` trace.
6. **At least one `free signature row:` on an ACTION seat** (cases 8-10), proving
   item 3's gates now yield. If none appears, the gates were not exercised.
7. **`free_rows` ≤ 1 on every sheet**, and `free_row_templates` populated.
8. **No new FAIL class** attributable to these changes. `conversion-dropped-duration`
   on the archlich is EXPECTED and is a pass, not a regression.

**What would make me revert rather than iterate:** a dangling reference (2), or a
sheet shipping two novas (3) — both mean a pass that mutates the finished sheet is
unsafe, and both are things the unit tests cover but had never been seen live.

### The branch-ten read (`smoke-out/branch10-2026-10-22T01-49-29`) — 3 FAIL of 10

Scored against the criteria written before the run.

| # | criterion | result |
|---|---|---|
| 1 | `e.gate` equivalence | **7 agree, 0 disagree, 2 unstamped** (below) |
| 2 | no dangling reference (REVERT trigger) | **PASS — and the eviction path finally fired** |
| 3 | no `two-novas` (REVERT trigger) | **FAIL — 1 sheet** (below) |
| 4 | `condition relation:` traced | **0 — still unexercised** |
| 5 | a welded rider reads landed | **0 welds — still unexercised** |
| 6 | a free row on an ACTION seat | **PASS** — `ground-burst` (Grave Legionnaire), `leap` (Slough Pit Scree) |
| 7 | `free_rows` ≤ 1, templates named | **PASS** on all ten |
| 8 | no new FAIL class from these changes | **PASS** — see the three below |

**Criterion 2 is the one worth noting.** Ossuar evicted a row at ship —
`free row over budget: Actions/"Shell Scour" leaves at ship` — the first time the
eviction path has run outside a unit test. That sheet carries **no dangling
reference**; `sweepDeadName` held. Its only FAIL is the expected
`conversion-dropped-duration`.

**Verb preference behaved as measured.** Well Drowned Dweller reads
`free_rows=0` and ships clean — the receiptless row it used to carry is gone,
which is the one change the pre-run measurement predicted.

#### The two unstamped gates are a bounded category, not a leak

Both are on Ossuar: `Legendary Resistance (3/Day)` and `Protective Magic (3/Day)`.
These are **donor rows that declare the gate inside the name string** — the donor
data holds 30 such names, all Legendary Resistance / Protective Magic — and they
take the rename pass's `e.rules` branch, so there was never a `gate` field to
carry. Fixable in one place: split a gate out of the donor's name at the boundary,
which converts a closed fact into the field once instead of leaving five consumers
to re-read it. Until then, **no consumer may read `e.gate`** — the equivalence is
not yet total.

#### The `two-novas` sheet: the pass detected it, pricing refused the fix

Air Elemental shipped `Stolen Chorus (Recharge 5-6)` beside print's
`Whirlwind (Recharge 4-6)`, and the trace I added last landing says exactly why:

```
one nova at ship: "Stolen Chorus (1/Day)" could NOT be un-gated — pricing
  re-gated it (over the ceiling — gated Recharge 5-6). It stands beside
  "Whirlwind" and the checker will report the pair
```

`settleSheetBudgets` found the pair, kept print's row, stripped the gate, and
`valueCheck` put it straight back: the "keep it ungated and scale to the ceiling"
branch needs `hasDamage && !kill && !recurring`, and the `wail` template fails one
of those, so the row fell through to "over the ceiling — gated Recharge 5-6".

**On my own revert criterion, honestly.** I wrote that a two-novas sheet would
make me revert rather than iterate. I am not reverting, and the reasoning should
be checkable rather than convenient: that criterion was aimed at *the pass making
a sheet unsafe*. It did not. Before this change the Air Elemental shipped two
novas **silently**; it now ships two with a trace naming the cause and a checker
FAIL. Reverting restores the silence and the defect. So the criterion as written
does not fit what happened — but I am flagging that I am interpreting it rather
than obeying it, because that is exactly the move that needs to be visible.

**The real fix needs a ruling.** When an extra nova cannot be un-gated because
pricing insists:

1. **Drop the row.** Matches the row-cap precedent (evict by priority). Risk: the
   row may answer a GM clause — here it carries the "stolen voices" idea, and the
   sheet reads 5/5 concept, so dropping costs real coverage.
2. **Force it to the at-will ceiling**, overriding the `kill`/`recurring` guard in
   this one situation. Keeps the row and the clause; deliberately prices a
   kill-shaped effect as at-will, which is what that guard exists to prevent.
3. **Leave the pair** and let the checker report it (today's behaviour) — one
   visible FAIL a forty rather than a silent one.

My lean is 2 with the damage scaled hard, because it keeps coverage and the gate
stays honest either way; but it trades against a guard that was put there on
purpose, so it is the owner's call.

#### Still unexercised after three runs

`condition_relation` (0 traces) and the rider ship-check (0 welds) have now failed
to re-form in three consecutive smokes. Both rest on unit tests and, for the
relation, the 45/45 probe. The forty at release is where they will surface; the
greps are `condition relation:` and `signature rider:`.

## The owner's ruling on the second nova (2026-10-22), implemented

> "the action economy should limit the use unless they are recharge 5-6. if there
> are two recharges then yes we need to weaken and remove the recharge gate, but
> it still has the interesting mechanics (saves, etc) it should be the same damage
> or less as a multiattack sum or main attack"

Option 2, with the ceiling named. **The gate cannot be refused, and the damage is
the thing that moves.**

`valueCheck` takes a `forceUngated` mode:

- it **never** hands the gate back (the voluntary branch's
  `hasDamage && !kill && !recurring` guard is what let `wail` be re-gated);
- its ceiling is **`maEV`, the Multiattack sum**, not the ordinary ungated
  `1.5 × attackEV`;
- it scales **only the dice**. The save, the area, the condition and the DC are
  untouched.

The reasoning that makes the kill guard unnecessary here is the owner's: using the
row costs the whole action, so at or below the sum of what attacking would have
dealt, it is never the strictly better play. **The economy is the limit, not the
recharge.** `settleSheetBudgets` now passes `forceUngated`, and a gate handed back
anyway is traced as *a bug in the pricing path, not a balance decision*.

Verified on the exact branch-ten case:

```
one nova at ship: "Stolen Chorus (Recharge 5-6)" un-gated to "Stolen Chorus"
  — "Whirlwind" already carries this sheet's Recharge nova
  (dice 45 → 18 (scaled down to the ceiling); un-gated by the one-nova rule)

*Constitution Saving Throw:* DC 13, each creature in a 15-foot Emanation.
*Failure:* 18 (4d8) Thunder damage, and the target has the Deafened condition
until the end of its next turn.
```

Save ✓, area ✓, condition ✓, DC ✓. 18 against a Multiattack sum of 28 (two Slams
at 14). Print's `Whirlwind (Recharge 4-6)` keeps its gate.

**Gate:** Jest 117 suites / 3736 passing (+5), build clean.

### What is still open on this branch

1. **The donor name-gates** — `Legendary Resistance (3/Day)` and
   `Protective Magic (3/Day)` carry their gate inside the name and so are the last
   two rows failing the `e.gate` equivalence. One boundary fix (split the gate out
   of the donor's name once); until it lands, **no consumer may read `e.gate`**.
2. **`condition_relation` and the rider ship-check** have not re-formed in three
   smokes. The release forty is where they surface.
3. **`attack-in-multiattack` on the Drowned Choir** — a rename
   (`Cold Hands` → `Hands Strike`) plus a Multiattack re-read to "makes three
   attacks", which names no rows. Not this branch's work; it belongs to the
   critic's item 7 (forced mixed Multiattacks) and is the same family as Klahk's.
