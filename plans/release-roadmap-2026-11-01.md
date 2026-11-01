# Release roadmap — the reskin engine, reviewed 2026-11-01

**Trigger:** picking up the statblock reskin sprint after the week of 2026-10-26 →
2026-10-30 (54 commits, `9ff13ee..250cf47`). Read this before `critic-response-2026-10-29.md`;
it supersedes that file's "Order of work" and "Done when".

**Who this is for:** the owner (the rulings and the release bar) and the implementing
session (the ordered work, each item with its instrument and its stop point).

**The owner's standing worry, verbatim:** *"our general rule of using metadata returned
from llm over regex and string matching — I notice that is starting to leak in and I want
to make sure we don't pile on cruft."* Section 2 answers it with numbers.

---

## 1. What the week delivered

54 commits, all green: **164 suites / 4,472 tests, build clean.** Engine +2,926 lines net
(generate.mjs +1,240 → **9,178 lines**), tests +4,367 lines.

Landed and **verified in-pipeline** (not only by unit test):

| landing | instrument | result |
|---|---|---|
| rest-long rider lands once; no unasked rider rewrites print | targeted twelve, both arms | 3/3 — Dire Wolf and Red Dragon clean, the control (a GM who *asked*) still gets the rider |
| print's name ≠ print's text (`print_name_only`) | same twelve | guard no longer over-blocks name-claimed rows |
| Weapon Lodge capped to zero extra damage | same twelve | defect absent on all 3 hosts — **the cap itself untested** (template declined each time) |
| ranged weapon die sizes (11 added) | corpus-pinned spec | 39/40 weapons declare `die`; `net` correctly none |
| warrant check as `NEEDS_BODY` questions (spider-climb, shield-bash) | warrant8, both arms | spider-climb 7/7 perfect separation; shield-bash 7/8 (one permissive, shipped nothing) |
| chassis Absorption needs a named energy | unit, both arms | Lightning-on-timber and Acid-on-iron gone; Glacier Heart's Cold kept |
| `passive_effect` on the trait form (owner's ruling) | unit, three arms | `none` drops, real lever keeps, **missing keeps** |
| a weapon row deals its weapon's damage | spear5 | 5/5 incl. the "flaming spear" edge and print's Hobgoblin Captain; the prompt did the work, the engine override never fired |
| prompt swap: bare `print` → "the published statblocks" (20 → 0) | A/B same twelve | 2 FAIL both sides; **0 lost / 3 regained** — one pair, cannot be separated from churn |
| `scripts/clause-rate.mjs` — per-clause hit rate across sweeps | four sweeps | **76%**: 56% always, **34% coin flip**, 10% never |

Critic's read of the last forty (`sweep-2026-10-30T02-34-52`): **13 ship / 22 fix-lite / 5 fix**,
soundness-0 **4**, runnable-tonight **3** (was 0), regressions 7 / recoveries 6.

### Claims made this week that the roadmap must NOT inherit

Each was stated, then measured narrower. Recorded so nobody builds on them.

- "weapon dice reach 9 of 10" → never measured; the real result is **4 of 4 reached rows
  correct**, with the two misses both `print`-exempt.
- "the print row is exempt by design" → wrong twice over: `print: true` has **three
  meanings** (verbatim text; a chassis row *claimed by name*; a class-kit row on a print
  body) and only the first justifies an exemption. Not fixed; see §4 item 1c.
- "the `printNearAdd` fix clears one of the two FAILs" → it cannot; Unarmed Strike is not
  in the weapon table.
- The critic's "the Vampire lost print's Regeneration" → **print has no such row** in SRD
  5.2 (that is 2014 MM). Our Vampire matches print's 11 rows exactly.
- Two spot-check instincts died under measurement and should stay dead: Fly 70 at CR 8 is
  inside print (young dragons 80, Deva 90); 49 area damage at CR 8 is print's own number
  (Young Bronze Dragon).

---

## 2. The regex audit — is the rule leaking?

Method: every line added to `reskin/*.mjs` (non-test) this week that calls
`.test/.match/.exec/matchAll/new RegExp` — **57 lines** — classified by *what the match
decides*, against the split in `llm-metadata-over-regex.md` and
`retire-the-string-matching-2026-10-22.md` ("what stays": validating a call's answer; reading
print's furniture once at a boundary; predicates over a finished sheet with a receipt).

### The answer, in one table

| class | lines | verdict |
|---|---|---|
| **A. format of engine-written text** — dice `\d+ \(\d+d\d+`, `Attack Roll`, `reach N ft`, the `(Recharge)` name gate, `^Multiattack`, placeholder `\{[a-z_]+\}`, terminal punctuation | 24 | allowed — but **the same expression is copied**: the dice regex 7×, `Attack Roll` 8× across author/checker/generate. This is the plan's class C (copies of one fact) and it is how the Shortsword-dealt-Slashing defect was born |
| **B. validating a call's enum** — `kind`, `passive_effect`, `condition_relation` | 4 | allowed, correct |
| **C. print corpus read at a boundary** | 3 | allowed |
| **D. meaning read off engine-written text where a declared field exists** — `has the (\w+) condition` as fallback for `imposes`; `each creature\|Cone\|Sphere` for "is this an area row"; the rider gate reading `Restrained\|Grappled…` and `Saving Throw` off rider text; `MINOR_EFFECT` in the value floor; `straight line` beside the declared `LINE_MOVE` set | 14 | **cruft, load-bearing today** — each has (or should have) a field: `imposes` (now 88% declared), `area`, `saveOverride`, the template's effect cell. Finish the field, then delete the reader (§4 item 1) |
| **E. the GM's prose deciding meaning** | 0 lines this week — **but 67 new `keys` words** in 7 new lists | see below |
| F. text surgery on engine text (the truncation fix, the 2014 save-gate conversion) | 12 | allowed; brittle (`[^.]*` ate a trailing clause three times this week). Wants one reader, not many editors |

**So: zero new prose-regex lines, but the word-list inventory grew 1,733 → 1,800 words
(159 → 166 lists).** The new lists — `fear-aura` ("terrifies, terror, dread, dreadful…"),
`pack-tactics` ("formation, shield wall, ranks, never breaks ranks…"), `blood-frenzy`,
`death-restoration`, `energy-aura` — are exactly the shape `declare-the-body-2026-10-22.md`
demoted to a failed-call fallback. They are *not* a violation on the fallback path, but
two reads keep them live as more than a fallback:

- `templates.mjs:1100-1108` scores key hits and **sorts the menu by them** before the call
  sees it. The comment says "orders rather than filters"; ordering a menu the call then
  picks from is input shaping, and a stochastic key read costs the first seats.
- `templates.mjs:1586` `askedFor(t)` decides "did the GM ask for this template" by key
  overlap — while `asked` is a field the fit call already answers and `vetAsked` validates.
  **Verify its read site**; if it gates anything when the call's `asked` exists, it is a
  tiebreaker against the call, which the house rule forbids.

### The pre-week word lists still deciding meaning (the actual cruft pile)

None was added this week; all are the kind the owner is worried about, and every one has
a call field that already answers the same question.

| list | what it decides | the field that already exists | read sites |
|---|---|---|---|
| `NAME_CLAIMS` (7 regex → energy, Aug) + `ENERGY_WARRANTS` | which energy the concept names; whether a Humanoid's energy is "warranted" (`energyWithheld`) | the reskin call's `energy`; `name_element: literal\|imagery` | 7 |
| `TEMPLATE_DENY` (Oct 13) | "hates/fears/vulnerable to … fire" denies heated-body / energy-aura | `NEEDS_BODY` — the mechanism built to replace it | 1 |
| `SENSE_DENY` + `scrubDeniedClauses` + `readPhrases` | disambiguates key words ("dances away", "roots through") | nothing — this is a regex layer *on top of* the keys layer | 3 |
| `ENGINE_KEY_WORD` (50-word alternation) | fallback for `holds === null` | the route call's `holds` | 1 |
| `MINOR_EFFECT` (Sep 21) | is this frame's effect minor, for the value floor | the template's declared effect cell / `imposes` | 1 |
| `honestNouns` | noun extraction for renames | `names` field (plan item never asked) | 2 |

`llm-metadata-over-regex.md` named three questions to ask the call — `polarity`,
`acts_on`, `names`. Grep today: **`polarity` 0, `acts_on` 0, `names` 0** in the prompts
(polarity landed as a clause field on 2026-10-15 under a different key; the other two are
unstarted). `acts_on` is what retires the rider gate in class D; `names` is what retires
`honestNouns` and the name–text gates.

### The structural finding

`generate.mjs` is 9,178 lines, **4,047 of them comment-only**, 518 `trace(` calls, 627
lines over 200 characters. The comments are this project's memory and must stay. But three
of this week's six soundness defects shared one root cause — *a decision made before
print's composition is known* — which is an **ordering** bug, and a 9k-line function with
no phase boundaries invites exactly that. Two of the week's fixes were "move this block to
the end of the print-canon block". That is cruft of a different kind: not word lists, but
guards appended inline until nobody can say what runs before what.

---

## 3. Where the blocks stand — baselines for the release bar

All from `sweep-2026-10-30T02-34-52` (the last forty) unless noted.

| measure | now | instrument |
|---|---|---|
| checker FAIL | **3 of 40** (2 classes left: `single-target-ceiling`, `damage-dice`) | `check-run.mjs` |
| critic verdicts | 13 ship / 22 fix-lite / **5 fix**; S0 **4** | critic read |
| runnable-tonight (twist → rule) | **3** | critic read |
| per-clause hit rate, 4 sweeps | **76%** (34% coin flip, 10% never) | `clause-rate.mjs` |
| coverage, frozen clauses | 55% | check table |
| concept-element share | 86% | check table |
| `imposes` declared on rows whose text imposes | **22 of 25 (88%)** | this review |
| `gate` field on rows with a gate in the name | **11 of 12** | this review |
| rows labelled `decoration` / `freeRow` | 5 / 10 | this review |
| invented row names repeated across sheets | **1** ("Shield Shove" ×2; "Legendary Action Uses" is a header row) | this review |
| byte-identical row texts across sheets | **0** | this review |
| `record completed:` / `clause unresolved:` traces | 0 / 0 | the retire plan's own instrument — the id link holds |
| print-exact sheets byte-identical to print | Owlbear ✓, Vampire ✓ (11/11 rows) | twelve |
| Weeping Saint fixture | **0 of 4** | sweeps |

**Owner rulings, 2026-11-01** (all five settled; the implementer does not reopen them):

1. **The swarm's 90 — GO.** Composition: a swarm above print's last swarm CR (3) moves its
   surplus single-target budget into its *area* row and holds the bite to the band ceiling.
   Spec in item 3b.
2. **Best-of-two — DIAGNOSE FIRST.** Item 4a/4b before any purchase; best-of-two only for
   the flaky clauses that survive the prompt fix.
3. **Fire as a rider — YES.** A weapon row keeps its physical type and the energy moves to
   `melee_rider` instead of being dropped. Spec in item 3d.
4. **The `print` flag — RULED 2026-11-01, then DROPPED the same day.** The implementer
   found both consumers run before any row carries the flag, and the rider guard had
   never fired (0 of four runs). The guard now reads the print MATCH and its own row
   names. `print_text` is not built; the owner ruled "drop it" on the results.
5. **`each creature of its choice` — LEAVE IT.** Closed. Not a soundness problem; print's
   convention only. Do not remove it from `lure`, `terror-pulse`, `driving-bellow`.

---

## 4. The ordered work

Each item: what, the instrument that proves it, the number it must move, the stop point.
**Every landing states its predicted number before the run** (`measure-before-not-after`).
No item below adds a word to a `keys` list or a regex over the concept; if one seems to
need it, stop and propose.

### Item 1 — finish the fields, then delete the readers (the cruft answer)

The retire plan's own method: complete the record, then the text reader survives only for
print. Three records are nearly complete; finishing them is what lets class D go.

- **1a. `imposes` 22/25 → 25/25.** The three owing rows are the chassis `{condition_minor}`
  fill and the rider weld (the retire plan predicted exactly these). Stamp at the fill
  site. *Instrument:* the `record completed:` trace stays 0 **and** the `has the (\w+)
  condition` fallback in checker + generate is deleted and the forty does not change.
- **1b. `area` stamped at render** — `{ shape, size }` from the frame's declared target
  (`AREA_LADDER`/`targets`), so `each creature|Cone|Sphere` (author.mjs, templates.mjs) and
  the checker's `(\d+)-foot (Cone|…)` read a field. *Instrument:* equivalence over a forty
  (name/text shape == field) before any reader is retired — the `gate` precedent.
- **1c. The `print` flag → `print_text` (RULED YES, 2026-11-01).** Keep `print` as
  "stands on a print block" (nothing that reads it today changes). Add **`print_text:
  true`**, stamped in ONE place — the end of the print-canon block, after every pass that
  rewrites row text — iff the row's text equals the matched print block's row once both
  sides have the same inline name and attack bonus substituted (reuse `asInline` and the
  `+N` / `DC N` replacements the canon block already applies; compare after collapsing
  whitespace). Then: the weapon re-dice exempts `print_text`, not `print`; the rider weld's
  unasked-on-print refusal reads `print_text`; `print_name_only` becomes redundant and is
  deleted once both readers are switched. *Instrument:* the twelve's Reed Dart ships `d4`
  and the monk's Unarmed Strike is reached; the Hobgoblin Captain's Greatsword stays
  "Slashing plus Poison"; the Owlbear and Vampire stay byte-identical. *Pin:* a spec over
  the forty's saved JSON asserting every `print_text` row equals its print row, and that
  no row with `print_text` was re-diced.
- **1d. One `rowShape(e)` reader** exporting `{ dice, attackRoll, reach, range, gate,
  area }` — replacing the 7 dice-regex copies and 8 `Attack Roll` copies. Pure consolidation,
  behaviour-preserving by construction; pin with a snapshot over a forty.
- **1e. The rider gate reads declared fields.** `generate.mjs` "a rider that imposes a hold
  on every hit of a repeatable row" reads condition words and `Saving Throw` off rider text;
  the render already declares `imposes` and `saveOverride`. Switch the predicate; keep the
  text read as a traced fallback for `template=-` rows only.

Stop point: a forty with **no class-D reader firing except on a traced fallback**, and the
forty's checker table unchanged.

### Item 2 — retire the five prose word-lists

In this order, each with a before/after forty (same batch, `clause-diff.mjs`):

1. **`TEMPLATE_DENY`** → two `NEEDS_BODY` questions (heated-body, energy-aura already have
   body questions; the deny asks the *inverse* — "is this body hurt by fire?" — which is
   `materialVulnerability`'s question. Fold into that call's answer.)
2. **`NAME_CLAIMS` + `ENERGY_WARRANTS`** → the reskin call's `energy` + a receipt (the
   quote must appear in the concept — `vetAsked`'s shape). `energyWithheld` then reads a
   field. *Risk:* 7 read sites; land behind a flag and diff a forty.
3. **`ENGINE_KEY_WORD`** → delete; `holds === null` falls to "not held" and traces.
4. **`SENSE_DENY`/`scrubDeniedClauses`/`readPhrases`** → delete with the keys ordering
   (next line).
5. **Keys as menu ORDER** (`templates.mjs:1100`) → order by the idea's declared stamps only
   (`orderByStamps` already exists and runs *after* this). Measure: fit-call pick rate and
   `no_fit` rate on a forty before/after. If pick rate falls, the keys were doing work the
   prompt should do — fix the prompt, not the list.

Stop point: `grep -c "keys:" templates.mjs` is unchanged (lists stay as the failed-call
fallback the 10-22 plan allows) but **no read site consults them while a call answer is
present**.

### Item 3 — the two remaining soundness classes

- **3a. Purple Worm's Swallow 64 vs 51 (1.25×).** A single engulf row priced at its own
  budget; print's Purple Worm is 2024 SRD — compare its Swallow directly and take print's
  number (closed fact). Instrument: the forty's `single-target-ceiling` count → 0 outside the
  swarm.
- **3b. The swarm (RULED GO, 2026-11-01).** Composition, in `scale.mjs`, beside the swarm
  exemption at ~line 130 (print's seven swarms each make one attack; the checker hard-fails
  a swarm Multiattack — that stays). Spec:
  1. Export the band ceiling as ONE closed fact — `SINGLE_TARGET_CEILING` (the `CAP` table
     now private to the checker, with the running max already applied) — from
     `card-budgets.mjs`, and have the checker import it. Two copies of one fact is the
     drift the audit is about.
  2. For a swarm donor scaled **above CR 3** (print's last swarm): after the per-hit solve,
     if the bite's average exceeds the ceiling for the band, clamp the bite to the ceiling
     (keep the die, scale the count — the re-dice's own rule; keep the Bloodied split at
     print's ratio) and move the surplus per-round budget into the swarm's area row
     (`each creature in a N-foot Emanation` — the row the sheet already carries; create it
     from the swarm donor's area frame if absent). The area row keeps its Recharge gate;
     the surplus is added to its damage, not its rate.
  3. Trace it: `swarm surplus moved: bite 90 -> 51, +39 to <area row>`.
  *Instrument:* forty #29 reads bite ≤ 51; `single-target-ceiling` 0 on the swarm;
  `hot-offense` does not fire (the round total is unchanged); exactly one attack row, no
  Multiattack. *Pins:* `donors.spec`'s swarm cases plus one new case at CR 13 asserting the
  clamp, the move, and the Bloodied ratio.
- **3c. `damage-dice` on kit rows** (Unarmed Strike "23 (3d8 + 3)"): the stated average and
  the dice disagree — an arithmetic defect in the kit scaler, not a dice-size one. Fix the
  scaler; instrument: `damage-dice` 1 → 0.
- **3d. Fire as a rider (RULED YES, 2026-11-01).** Two halves, prompt first:
  1. *Prompt* (`buildReskinPrompt`, the sentence added 2026-10-30 that begins "A row named
     after a WEAPON"): make the move explicit — *"if the creature's weapon is wreathed in an
     energy, answer the weapon's physical type here AND that energy on `melee_rider` — a
     flaming spear is Piercing plus Fire, the way the Knight's Greatsword is Slashing plus
     Radiant. Do not drop the energy."*
  2. *Engine backstop* (`generate.mjs`, the "weapon deals its own damage" override): when it
     demotes an energy off a weapon row's main slot and `melee_rider` is `none`, set the
     rider to that energy **before** the `text_noRider` restore runs (the restore is what
     erases the rider slot) — and only if the row carries a `{damage_type_2}` slot; otherwise
     trace `energy dropped: no rider slot on "<row>"`. Do not re-split the budget by hand;
     the rider path already prices two components.
  *Instrument:* re-run `spear5`; the Cinder Knight ships "Piercing plus Fire" and the Vestry
  Wyrd keeps its fire rows; the living bonfire and the Hobgoblin Captain are unchanged.
  *Pin:* `weapon-damage-type.spec.js` gains the prompt clause and a parse-level case.

Stop point: critic S0 = 0 on a forty.

### Item 4 — stability (the critic's headline)

76% per-clause, 34% coin flips. The lever is upstream of the checker.

- **4a. Diagnose before buying.** `clause-rate.mjs` lists the 21 flaky clauses. For each,
  read the trace on a hit run and a miss run and classify the miss: fit-call `no_fit` on a
  menu it was shown (the `idea-register-not-length` finding — 91% of seat misses) vs seat
  assigned to the wrong section vs the clause never reaching a seat. **Predict the split
  before reading.**
- **4b. Fix the largest class in the prompt** (idea register / menu order from item 2.5),
  re-run the same forty, re-measure.
- **4c. Best-of-two (RULED: DIAGNOSE FIRST, 2026-11-01).** Not before 4a and 4b have
  landed and been re-measured on the same forty. If flaky clauses remain after the prompt
  fix, bring the owner the list and the per-sheet call cost; only then build best-of-two,
  scoped to sheets whose clauses were not all answered on the first pass.

Stop point: per-clause hit rate ≥ **85%** over three consecutive sweeps of the forty
(release), **90%** target (critic's bar). *Why 85 at release:* the measured floor is 76 with
no stability work done; 90 on three sweeps is ~0 flips, which likely needs best-of-two.

### Item 5 — name–text agreement, one field

The twelve's "Wasting Bite" (an aura), the warden's "Spear Blind" (a cone), the earlier
"Swallow Armoury" (thunder retaliation). `llm-metadata-over-regex.md` already specifies the
fix: **`name_claims: mechanic | element | movement | none`** on the rename, validated
against the row's declared `template`/`imposes`/`area` — three gates (`name-mechanic`,
`no-type-in-name`, `type-fit`) collapse into one field + one validator. Instrument: those
three gates' soft count on a forty.

### Item 6 — the review package carries header lines

The critic cannot check "understands no Common" without the header. Render defenses,
senses, languages into `critic-files.mjs` output. Instrument: the critic stops listing it.

### Item 7 — the release forty, then the critic

Run the fixed forty three times (stability), package with `critic-files.mjs`, and the
release bar below is judged on the **third** run.

---

## 5. Acceptance criteria — the release bar

The forty (`scripts/smoke-batches/sweep.json`) is the release instrument; its forty inputs
are frozen. Two bars: **release** (ship it) and **target** (the critic's "done when").

### Whole-forty bars

| criterion | release | target | instrument |
|---|---|---|---|
| checker `fail`-graded findings | **0** | 0 | `check-run.mjs` |
| critic soundness-0 sheets | **0** | 0 | critic read |
| per-clause hit rate, 3 consecutive sweeps | **≥ 85%** | ≥ 90% | `clause-rate.mjs 3` |
| clauses never answered in 3 sweeps | **≤ 2 of ~62** | 0 | `clause-rate.mjs` |
| print-exact sheets (bare print name) byte-identical to print | **3 of 3** | 3 of 3 | twelve/forty diff |
| print row changed on a twist sheet with no clause targeting it | **0** | 0 | `print-rows` gate |
| invented row name repeated across sheets | **0** | 0 | this review's script → fold into `check-run` |
| byte-identical row text across sheets | **0** | 0 | same |
| rows the engine labels `decoration` | **≤ 2** | 0 | `decoration_rows` |
| critic ship / fix-lite / fix | **≥ 16 / — / ≤ 2** | 20+ / — / 0 | critic read |
| runnable-tonight (twist → rule) | **≥ 5 of 20** twist sheets | ≥ 8 | critic read |
| `imposes` declared where text imposes; `gate` where name gates | **100%** | 100% | this review's script |
| suite / build | green | green | jest, vite |

### Per-category bars (the forty's own taxonomy)

| category (sheets) | must hold |
|---|---|
| **bare print name** (21, 22, 19) | sheet == print, every row, AC/HP/array; nothing invented |
| **print head + addition** (1, 3, 5, 7, 11, 13, 15, 17) | print's rows intact except the one the clause targets; the clause carries **one** row with a GM quote (`gmQuote`); no `decoration` |
| **print head + flavour only** (9 — the Weeping Saint) | numbers stay print's; **≥ 1 row expresses the flavour clause** 3 runs of 3 (the critic's fixture, stated as a category rule) |
| **print head + a lack** (15, 27) | the lack is honoured by *omission* on the header line and by no row granting a bypass (the Granite Exile ruling) |
| **homebrew one-liner** (2, 4, 6, 8, 10, 12, 14, 16, 18, 20) | 1 signature action + 1 trait, each with a receipt (`asked`/`expresses`); `passive_effect ≠ none`; no stock row the body cannot warrant (`NEEDS_BODY` answered); single-target rows ≤ band ceiling |
| **named parts** (24) | each named part is an attack row; no part minted from a negated clause; a part's range follows its verb |
| **header directives / CR in words** (25, 26) | the typed AC/size/speed/CR stand (`userSet`) and no gate overrides them |
| **named caster** (28) | one stat keys attack and DC; every spell on-list for that caster |
| **bodies: swarm / ooze / dragon** (29, 30, 31) | print's body grammar (swarm one attack + Bloodied split; ooze immunities; breath inside the nova cap) and the band ceiling |
| **weapons** (37, 38, 39) | every weapon-named row: the table's die, type (physical), reach/range; energy only as a rider |
| **never-fail / archetype-only** (35, 36) | a legal sheet ships; 0 FAIL |
| **dense** (37) | every GM number honoured; every ask has a row or a traced reason |
| **person's name, no print match** (40) | library body stands in; no print noun leaks |

### What to STOP doing (the cruft rule, made checkable)

1. No new word in any `keys` list; no new regex that reads the concept, a clause, or an
   idea. A test pins the keys inventory at **1,800 words / 166 lists** so growth is a
   deliberate, reviewed change.
2. A new guard in `generate.mjs` lands as a **named function with declared inputs**, not an
   inline block; its predicate reads fields, and any text read is a traced fallback.
3. Every text-format regex comes from `rowShape(e)` (item 1d) — one definition.
4. A landing is "measured" only when the number was stated before the run.

---

## 5b. Order amended by the owner, 2026-11-01 — "monsters first, tidy after"

After item 1 landed (1a, 1b, 1c-repaired, 1e; 1d deferred), the order is:
**3b, 3d, 3a, 3c → ONE forty → 2 (all five retirements) → ONE forty → 1d → 4a/4b → 5 → 6 → 7.**

Two cost rules the owner's instruction implies:
- **One forty serves two stop points.** The forty after item 3 is both item 1's
  equivalence check (readers may be retired only if `area`/`imposes` fields agree with
  the text population-wide, and the repaired rider guard must be seen to fire) and
  item 3's "S0 = 0". Do not run a forty for item 1 alone.
- **Item 2 gets two fortys, not ten.** The post-item-3 forty is the BEFORE for all five
  retirements; land them; one AFTER forty; `clause-diff.mjs` between the two. If the diff
  is not "0 lost", bisect by reverting lists one at a time against the saved AFTER —
  no further fortys until a culprit is named.
- A targeted twelve (`scripts/smoke-batches/twelve-1030.json`, ~5 min) is the right
  instrument for "does the repaired guard fire on the Dire Wolf" if that answer is
  wanted before the forty.

## 6. For the next session, in one paragraph

Start with item 1a–1e (fields, then delete readers): it is the direct answer to the owner's
worry and it is behaviour-preserving, so it can land without a critic cycle. Then item 2 in
order, one list at a time, each diffed on the same forty. Items 3a and 3c clear the last
checker FAILs; 3b waits on the owner. Item 4a is a reading exercise, not code — do it before
touching stability. Items 5 and 6 are small and the critic asked for both twice. Then the
release forty, three times.

---

## 7. The results sheet — what the implementing session hands back

The owner conserves the reviewing session's budget by having the implementer write
**`scripts/smoke-evidence/ROADMAP-results-<date>.md`** as it goes, one block per item, in
this exact shape. The reviewer reads that file and the run directories it names — nothing
else. An item without a block is "not started"; a block without a number is "not measured".

```
### <item id> — <one-line what>
predicted:   <the number stated BEFORE the run, verbatim>
measured:    <the number after, same instrument>
runs:        smoke-out/<dir> [, smoke-out/<dir>]   (before / after where the item is a diff)
suite:       <N suites / N tests> · build <clean|broken>
commit:      <sha> <subject>
not done:    <anything the item promised that did not land, in one line each>
surprises:   <anything measured that was not predicted; "none" is a valid answer>
```

Rules for filling it:

- **`predicted` is written before the run and never edited after.** If the prediction was
  wrong, `measured` says so; that is the point of the row.
- A regression-floor case (the Owlbear, the Vampire, the Hobgoblin Captain, the living
  bonfire) is listed under `measured` as `unchanged` or `CHANGED: <what>` — never omitted.
- Every text-reading retired under item 1 or 2 names the **forty diff** that proved
  behaviour-preserving: `clause-diff.mjs <before> <after>` with its `lost / regained` line
  pasted verbatim.
- No prose beyond the fields. The reviewer will ask if a number needs a story.

The reviewer's check, in order: (1) `predicted` vs `measured` on every block; (2) the
floors; (3) `not done`; (4) the keys-inventory pin still reads 1,800 / 166; (5) the release
bar in §5 against the latest forty's `check-run` table and `clause-rate.mjs 3`.
