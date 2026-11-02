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
~~**3b, 3d, 3a, 3c → ONE forty → 2 (all five retirements) → ONE forty → 1d → 4a/4b → 5 → 6 → 7.**~~
**Amended again 2026-11-01 (evening), after item 3's forty — see §5c.**

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

## 5c. Order amended a second time, 2026-11-01 — the critic sees quality, not plumbing

Item 3 landed and its forty (`sweep-2026-11-01T16-53-09`) read 1 FAIL of 40 — and that one
is a checker artifact (below). The next critic read is worth more AFTER the two items the
critic has already asked for twice, and BEFORE the two items it cannot see. Item 2 is
behaviour-preserving by design and item 1d is a refactor: neither changes a sheet the
critic grades, and item 2 needs two fortys of its own, so it should not sit between us
and the next read. Item 4 regenerates every sheet, so a read before it is a read of sheets
it will replace.

**Order now: nits (below) → 6 → 5 → ONE forty → CRITIC → 2 (that forty is its BEFORE) → 4a/4b → 1d → 7.**

### The three nits from the item-3 forty, first

- **N1. The ceiling gate's Bloodied strip misses the two-component split.** The swarm
  shipped `32 (6d8 + 5) Bludgeoning damage plus 21 (6d6) Necrotic damage, or 16 (3d10)
  Bludgeoning damage plus 10 (3d6) Necrotic damage if the swarm is Bloodied`. The gate's
  strip (`checker.mjs`, `single-target-ceiling`) matches one component before `if`, so it
  fails to strip and sums all four: **79, a FAIL** — where the true hit is 53 = 1.04x, a
  soft. Same class as the "135 damage" error of 2026-10-30. Widen the strip to the form
  the engine writes (optionally `plus N (XdY) <type> damage` before `if`). Pin with the
  swarm row above. *Instrument:* the item-3 forty re-checked reads **0 FAIL of 40**.
- **N2. Trace the clamp.** `scale.mjs` records `hit_clamped` on the scaled body; nothing
  in `generate.mjs` traces it, so the clamp is invisible in a sheet's trace. One line
  where `scaled` arrives: `swarm hit clamped: per-hit 90 -> 51 …`. *Instrument:* the
  trace appears on forty #29.
- **N3. The batch check's stock-name exemption.** "Shockwave" shipped on two sheets, and
  it is `ground-burst`'s own template name — the owner's one-mechanic-one-name ruling
  (2026-10-27) says stock rows CONVERGE on the template's name, so this is the ruling
  working, not a repeat. The §5 bar ("no invented row name repeats") must exempt
  template names alongside print names and plain attack names; the sameness metric
  still counts them. *Instrument:* `invented-name repeats` on the forty reads 0 with the
  exemption, and the sameness count is unchanged.

### The run ladder — cheapest instrument that answers the question

In this order, and only climb when the rung below cannot answer:

1. **In-process replay** (`scaleDonor`, `renderTemplate`, `valueCheck`, `checkBlock` on
   a saved sheet; a mocked `generateReskin`) — zero API cost. Item 3 was verified almost
   entirely here, including the four-variant swarm measurement. Default.
2. **A targeted batch** (5–12 cases, 2–5 min) — when the question is "does this fire
   LIVE on the case it was built for". Two are owed right now and were skipped:
   - `spear5` for item 3d — the prompt half is only proven live (the deterministic replay
     proved the engine backstop, not the model's answer). Predict: Cinder Knight
     "Piercing plus Fire"; bonfire and Hobgoblin Captain unchanged.
   - `twelve-1030` for the repaired rider guard (1c) — the forty gave it **0 chances**.
     Predict whether it fires on the Dire Wolf, and say "not reached" if no decoration
     rider is welded there this time either.
3. **A forty** — only when the question is a POPULATION (equivalence of a field with the
   text, the release bar, the critic package, a clause-rate sweep). One per stop point,
   never per item.

So before the pre-critic forty: run `spear5` and `twelve-1030`, record both, then the forty.

### Then item 6, then item 5, as specified in §4 — and this forty's facts to carry

- The repaired rider guard (1c) had **0 chances** on this forty: 4 welds, none onto a
  print row. It is reachable, not proven; the next forty keeps watching.
- `area` is declared on 5 of 10 area rows and **agrees with the text on all 5**; the other
  5 are chassis/donor rows. No reader retires until those declare too (1b's donor-side
  stamps, same shape as 1a's nine) — fold that into item 2's first forty, not before the
  critic.
- Per-clause hit rate over the last three sweeps: **75%**, 33% coin flips; the diff
  against the previous forty is 5 lost / 6 regained. Unchanged, as expected before item 4.

## 5d. Before the critic package — three items from the pre-critic forty (owner-agreed 2026-11-01)

The pre-critic forty (`sweep-2026-11-01T17-43-19`) landed 35 of 40 (five API timeouts)
with one FAIL and one name repeat. Both are understood; neither should reach the critic.
**Order: P1 → P3 → P2 → ONE forty → package → stop.** Items 2 and 4 still wait.

- **P1. The swarm ruling, finished: top the nova row up to the nova ceiling.** The clamp
  (3b) holds the bite at 51 and is safe only when the sheet's second row deals damage: on
  the 16-53 forty the swarm's Shockwave dealt 56 and the round passed; on 17-43 the fit
  call gave it a damageless control row and the round was the bite alone — 53 against a
  budget of 100, FAIL `under`. Measured: bite 53 + a GATED area row at the nova ceiling
  (`min(6·CR, 55+CR)` = 68 at CR 13) reads 81 of 100, OK. So the ruling's second half
  is implementable: when a one-attack body's round falls under budget after the clamp,
  fill its gated nova row's damage up to the nova ceiling — never past it (that is the
  `nova-cap` FAIL measured on 11-01). If the row deals no damage, it gains a damage
  clause at that figure in the sheet's own energy. Lives in `settleSheetBudgets`
  (the fit call picks that row long after `scaleDonor`), reads `scaled.hit_clamped`
  and `e.gate`. *Instrument, in-process first:* replay on the 17-43 #29 sheet reads
  `under` gone and `nova-cap` absent; then the forty's #29 passes with no FAIL. *Pin:*
  a case on `swarm-one-hit.spec.js` with a damageless nova row.
- **P2. `Iron Fist` ×2 — a naming nudge, not engineering.** A brass tyrant and a
  blackiron warden both reached for the obvious name; the batch check (N3) now sees it.
  This is the reskin prompt's NAME REGISTER paragraph: one sentence that a row named for
  the creature's material alone ("Iron Fist", "Stone Slam") is the sameness the critic
  reads, and the name should carry what the blow DOES or the creature's own element word
  instead. No engine change, no word list. *Instrument:* the batch check's invented
  repeats stays 0 on the forty; if it does not, report and move on — do not block the
  package on it.
- **P3. `kit-lands`: the stand-down records itself.** The gate counts rows flagged
  `kit: <class>` or print rows in the kit's SRD lifts; the fighter kit has no SRD lifts,
  and on the maul case it stood down with "nothing to add — the sheet already answers
  it" (Great Weapon Master arrived via the FEATURE path), so the gate can never pass on
  that sheet. A route flip exposed it. Fix in the declared-data shape every other writer
  uses: the kit pass stamps `generation.kit_stood_down = { class, because }` when it
  adds nothing because the sheet already answers it, and the gate reads that record and
  stands down too (soft at most, naming the reason). No change to what the kit does.
  *Instrument:* the maul case in `twelve-1030` re-checked reads no FAIL; a class sheet
  where the kit really landed nothing still FAILs (pin both).

Then one fresh forty — `check-run`, `clause-rate.mjs 3`, `critic-package.mjs` — and stop.
The five timeouts were API latency; if the re-run drops sheets again, run the missing
indices with `--only` rather than a fourth forty.

## 8. The release candidate, and the program after it (owner, 2026-11-01 evening)

### The map — read this first (owner, 2026-11-02)

How a signature ability is made: (1) the GM's sentence is split into clauses; (2) an AI
call INVENTS an idea; (3) a second call MATCHES the idea to a pre-written template; (4) a
match renders — sound, but samey; (5) no match — before R4 the nearest template shipped
anyway, with R4 the AI WRITES the ability into a form. The critic's finding across three
reads: the problem is step 2, not step 5 — the idea is invented from nothing, so it
changes on every re-roll and often answers a clause the GM never typed.

| name | number | step | what it is | state |
|---|---|---|---|---|
| **Author** | R4 | 5 | write the ability when no template fits | built; moved the mechanism, not the outcome; parked, not on the critical path |
| **Re-roll** | R6 | 2 | invent two ideas, keep the one that answers the clause | triggered (retention 1/7); waits behind Anchor; +1 call |
| **Anchor** | R7 | 2 | tell the idea call WHICH GM clause it must answer, and it names it | **next**; no call |
| **Quality** | R8 | 5 | four checks on any AI-written ability — no mid-word cut, the capital after the join, a DC on every check, no `requires` of a condition the sheet lacks | **with Anchor**; owed regardless of Author |
| Lints / measure / plumbing | R1-R3 | — | | done |
| Telemetry | R5 | — | regenerate-vs-save on the live site | product-side, separate |

**DECIDED (owner, 2026-11-02, after forty #4):** retention 1 -> 1 -> **3 of 7**, `missed`
25 -> 23 -> 15 -> **12**, with the anchor running at a fraction of its design. **Anchor stays.
Author stays. Re-roll stays deferred. No more originality iterations.** The critic's own
read: "the creativity problem is mostly solved; what's left is plumbing." What remains is
ONE plumbing pass (R9 below) and then the release gate — and the owner does not want to
keep iterating.

| **Release pass** | R9 | all | the classified deterministic list — removals of string surgery, closed-list validations, engine-written text, data, four call fields; no new regex over prose | **next, and last before the gate** |
| Post-release | — | — | subclass/feat fidelity rungs (SRD-idiom, not PHB lookups); a once/twice/thrice counter template family for the abstract verbs; the HP-max-drain ceiling | parked, named |


**`rc-2026-11-01` is the fallback.** Committed and tagged at the state the critic read
(`sweep-2026-11-01T20-03-32`): 12 ship / 25 fix-lite / 3 fix, S0 3, 37 of 40 sheets run
without a GM patching anything. The owner's read: good enough for existing users, not
for a broadcast; sameness better than it was, not at the sweet spot. Known and accepted
on this tag: two checker FAILs (Spitting Maw's payoff stack; the Stone Club duplicate the
engine detects and does not act on), the §2 text lints, the Weeping Saint at 0 of 4, and
the one-third clause churn. **Nothing in this section is built with a `.replace` on row
text.** That is now a hard rule, not a preference.

### Why the nit-ladder stops here

The critic's step-back read and this plan's §2 are the same diagnosis from two sides:
soundness went 16 broken → 3 in a week and originality stayed flat (runnable-tonight
2, 2, 0, 3, 2). Every fix *migrated* — Weapon Lodge through three hosts, filler from
Fear Aura to Shield Bash to exploiter rows — because a "fill the seat" imperative over a
finite menu takes the next-nearest template when one path closes. The best rows in
every sweep came from the AUTHORING path (forms the model writes, numbers the engine
prices); the broken text came from the same path's one soft spot plus the engine's
string surgery on rows after they exist. So the lever is architectural, and it is one
move seen from two sides:

> **The engine edits fields, never sentences. Text is rendered from fields at the end.**

### The program, in order

**R1. The rendered-output regression suite** — the precondition for everything below,
and the thing that would have caught "(A) or (B)" returning through 4,300 green tests.
Over the forty's saved sheets: per-clause "was this answered" (`clause-rate.mjs`'s
data, asserted), the batch check (N3), and the §2 text lints as build-failing checks.
Each lint is tagged by WHAT IT READS and may never feed a generation decision:
  - declared data, no text: duplicate row name; orphan action row (`gate`, dice,
    `attacksPerRound`); inline-form-vs-weapon (the call's `inline` against the closed
    table).
  - format of engine-written text (the `placeholder-leak` class): an unfilled number
    slot ("… feet toward"), an empty option ("(A) or (B)"), a save sentence missing its
    DC or its Failure half.
  - the conversion seam is NOT a lint: it is fixed by R3, which removes the transform.
*Instrument:* the suite fails on `sweep-2026-11-01T20-03-32` for every §2 item the critic
listed, by name, before any engine change — proving it sees them.

**R2. 4a, finally — read the 21 flaky clauses.** No code. Classify each miss: the fit
call refusing a menu it was shown (the 91% finding) · seat in the wrong section · clause
never reaching a seat. Predict the split first. If the first class dominates, R4 fixes
churn as a side effect and best-of-two is never bought.

**R3. Edits become re-authors; the 2014 printing renders from fields.**
  1. *Rider weld, condition strip, print's canon rider swap, the "fear unearned"
     removal* — each becomes a re-author call: the host row's fields plus the declared
     facts (`imposes`, `gate`, the rider's form) go to the model with a per-edit prompt
     template, and it returns the merged row as STRUCTURE; the engine renders once. One
     short call, only when an edit happens, whole sentence, no splice. The `[^.]*`
     regexes retire as each site moves.
  2. *The 2014 printing is a pure function of fields* for every form/template row —
     stat, reach, dice, type, rider, gate are all fields already. Only a free-prose
     trait needs a call. Krennik's seam cannot recur because nothing appends.
  3. *The trait form returns a complete sentence the engine never touches* except to
     substitute numbers; a save without `{dc}` is rejected by the form validator and
     re-asked — a declared-data check, no regex.
  *Instrument:* R1 green on a fresh forty; the count of `.replace(` over row text in
  `generate.mjs` falls with each site, and never rises.

**R3b. The kit is a menu, not a load-out — the empty-seat rule at the archetype level**
(critic + owner, 2026-11-01; added after R2). R2 measured the SEAT: 70% of attempted
seats ship a row the model refused. This is the CHASSIS: the kit rows that load before
the seat runs — grapple/engulf, charge/trample, Dash/Disengage, Relentless Pursuit, Blood
Frenzy, the charge rider, the seat's own nova — off the route call's mechanic GUESS. R1
already proved one instance (the Riverwight's Whelm with nothing to grapple). Filler is
not neutral: 10-29 traces showed asked-for rows leaving at ship because a row the engine
itself labelled decoration had taken the budget. And a kit that always loads makes every
roll of one concept the same sheet (owner: "lizardfolk ninja … I suspect it'll be the
same each roll").

  *Owner's guardrail, verbatim in spirit:* the templates are NOT thrown away, and this
  must not "open things up to chaos." So the move is SELECTION, never new content:
  - An archetype = a stat chassis (array, AC/HP/speeds, type defenses, senses,
    Multiattack, attacks) + a small number of SLOTS (two is the working number).
  - Each archetype has a MENU: the catalog templates that fit it today (the grappler's
    grapple-on-hit and engulf, the rider's trample and charge, the lurker's Ambusher /
    sneak-attack damage / Hide bonus action / Pack Tactics, the defender's Relentless
    Pursuit…) plus **"none"**. The menu is closed: only rows that already pass the fit
    call, the verb gate and CR calibration can be chosen, so no roll can produce a row
    we have never vetted. That is what keeps the "pretty good block" reachable.
  - Order: the SIGNATURE seat is authored first (it is the one that may need writing),
    then the slots are filled from the menu, then nothing else. A slot the call leaves
    empty stays empty.

  *Who chooses — a call field, never a key table.* The critic's closing line
  ("'sentinel', 'warden', 'guards' should be in it") is a word list deciding meaning, the
  thing this sprint retired; not taken. The kit choice is a field on the route/identity
  call: for each slot, which menu item (or none) and a QUOTE of the GM's words or the
  print row that warrants it; a quote is validated the way `vetAsked` validates `asked`.
  A choice with no quote is still allowed as FLAVOR (the horseman may trample because
  horsemen do) — the receipt decides whether the row is *owed*, not whether it may exist.
  Print's body rows and the blank path's synthesis remain receipts.

  *Variety is the acceptance criterion, not an engine rule* (a 25% floor cannot be a
  word rule; it is what we measure). Roll ONE concept eight times — "the headless
  horseman", "a lizardfolk ninja" — and: no single kit row appears on every roll; the
  bare chassis (signature + attacks, no kit) appears at least once; the archetype's
  trope (trample for the horseman) still appears on at least a quarter of them. Every
  roll passes the checker, so the floor never buys soundness.
  (Replaces the earlier snapshot-test idea — a deterministic plain ask was the complaint.)

  *Owner ruling, 2026-11-01: "reverse it."* 10-29's "longer is wanted" is reversed for
  DEFAULT rows only — asked rows are never cut. A plain ask may come out as short as the
  print block it resembles; row counts on a plain ask track print's MEDIAN for the band,
  not the p90 the free-row budget uses.

  *Measure before building, all zero-cost:*
    1. From the 329: the fraction of NON-legendary blocks per band carrying a Recharge
       action. Under half → a nova is not a default menu item.
    2. From the 329: row-count median per band, against the last forty's per-band mean.
    3. From `sweep-2026-11-01T20-03-32`: every kit/rider/nova row, with or without a
       receipt by the rule above. The critic predicts shape-repeats halve (Relentless
       Pursuit ×3, Faultless Tracker ×2, Blood Frenzy ×2, Dash ×3, three unwarranted
       Swallows) with coverage unchanged, because filler never earned any.
  *Instruments:* N3 stock-convergence count halves on a forty; coverage unchanged;
  `decoration_rows` → 0; runnable-tonight up; the eight-roll variety criterion above on
  two concepts (a targeted batch of 16, not a forty).
  *Watch:* a verb-less high-CR concept ("a sentinel of black iron, AC 20, Huge") must
  still earn the guard kit — by the call quoting "sentinel", which is the case that
  keeps dropping; if the quote is absent the row may still load as flavor.
  *Order:* after R3, before forty #1, so one forty measures R3 and R3b together and R4's
  runnable-tonight baseline is taken without filler in the budget.

**R3b — CLOSED BY MEASUREMENT (2026-11-02).** Three of its premises were refuted
before building (`ROADMAP-results-2026-11-01.md`, the R3b blocks): we are not longer
than print in the middle bands; a Recharge nova is print's own default at CR 13+ and we
UNDER-produce them below; and 0 of the 19 receiptless rows on forty #1 are kit loads —
14 are `closest accepted`. What shipped: a borrowed row (`accepted_closest`) is capped
by print's median for the band (unproven — 0 firings on the sixteen; judge on forty #2,
and hold it behind R4 if it sheds a praised row). The horseman already rolls 4 of 8
bare with the trope on all 8 as a rider. The variety criterion above is WRONG for a
species+class concept: a kit the concept's own words name (the lizardfolk's Hold
Breath, the rogue's Cunning Action) is a receipt, not a repeat — measure variety on the
SIGNATURE, which on the ninja was `closest accepted` 4 rolls of 8. That is R4.
Open, small: `attack-stat` on mounted knights (3 of 16 — a DEX chassis armed with a
lance), not R4's.

**R4 · AUTHOR — BUILT, MEASURED ON FORTY #2, AND NOT YET EARNING ITS KEEP (owner, 2026-11-02).**
The critic's read of `homebrew40-2026-11-02T05-09-26`, same question, same bar as the
baseline: **surprised 3 · plain 13 · missed 23** against 7 · 8 · 24, and **surprises
retained across the re-roll 1 of 7**. R4 moved the mechanism (`closest accepted` 44 ->
11; 25 authored rows on 39 sheets) and did not move the outcome. It costs ~1 call a
sheet, sits net +1 FAIL after its fixes (the recharge ordering), and one authored row
crashed a generation before the never-fail guard landed. Its premise was one layer too
far downstream: the refusals were the loss of ROWS, not of originality — the authored
rows answered the wrong clause as often as the right one because the IDEA they were
written for was never anchored to what the GM typed. That is R7 below, and it comes
first. **R4 stays in the code as built and is not on the critical path**; the forty
after R7 decides it (see R7's instrument). **If R7 does not pay off, the release
candidate is the state BEFORE R4** — `rc-2026-11-01`, with R4 switched off — not R4
patched further. The owner is wary of R4 for exactly this reason: it made things
temporarily worse on the number that matters.

**R4. Authoring-first for the signature seat.** *Decisions made 2026-11-02, after
the step-1 replay (220 of 220 refusals are `no_fit`): (a) SURGICAL, not literal —
author at the `closest accepted` branch in `fitSeat` (generate.mjs ~5041), the menu
stays for a template the call affirmed (the ~30% that work); (b) SEAT SHAPE — the
authored row returns in `fitSeat`'s seat shape (~5332) so it passes the seat's own
`valueCheck`, never through `landAuthored` directly; (c) the form->text renderer is
EXTRACTED from `landAuthored` into one shared function as the session's first commit,
repair-path tests unchanged — never copied. Trigger: `declined_because: no_fit`;
the nearest stays as the fallback only when authoring returns nothing.* Invert the dispatch: the seat tries the
authoring forms FIRST, the template menu is the fallback. Not free prose — forms as
today — through the same calibration passes (DC derivation, ceilings, duration bounds,
R1's lints). This is the originality lever and the sameness fix in one: the model's
idea stops dying at "closest accepted". *Instrument:* runnable-tonight ≥ 5 on a forty;
per-clause rate on three sweeps; R1 green. Also retires most of item 2 (the keys
ordering matters little once the menu is the fallback) and item 5 (a row the model
authored and named carries its own receipt).

**R5. Telemetry — regenerate vs save per concept on the live site.** The critic that
scales. Product-side, parallel, small. Needed before any Reddit-scale broadcast.

**R6 · RE-ROLL. Best-of-two — TRIGGERED, DEFERRED BEHIND R7 (owner, 2026-11-02).** Its own
condition fired: churn survived R4 (retention 1 of 7). It goes second, not first,
because R7 is the direct fix for the mechanism the critic named (the idea is anchored
to nothing) and costs no call, while best-of-two is +1 idea call a sheet and only
reduces churn if the "best" is chosen TOWARD the GM's clause — chosen for novelty, two
rolls churn like one. **If R7 lands and retention still does not clear about half, R6 is
next**, with the pick made by the clause receipt R7 introduces, and it is measured on
the same number. The owner's "diagnose first" is satisfied: the diagnosis is R7's.

**R7 · ANCHOR. The idea is anchored to the GM's clause — FIRST.** The idea call rolls fresh each
time and is anchored to nothing, so a surprise is rolled, not earned, and does not
survive a re-roll (1 of 7). The clause call already names a mechanic per GM clause and
the engine already knows which clauses the sheet has not answered (`unansweredClause`,
`leadForSeat`). The change: the idea call is handed the UNANSWERED clauses with their
declared mechanics, and each idea it returns NAMES the clause it answers — a receipt
field, validated by membership against the list, never a word match. The seat prompt
(`buildSeatPrompt`) then names that clause as THE CLAUSE THIS ROW MUST ANSWER. No new
call. This is also the fix for the weak-row class (the tax-ghost's stealth trait, the
duellist's stealth trait: a decent row answering a clause the seat was not for).
*Instruments, all read off the forty that follows:* (1) **surprises retained** against
forty #2's three — the critic's number, the one that matters; (2) `missed` by the
critic's read, against 23; (3) **the fit-vs-authored split per sheet** from the trace —
did the anchored idea fit a template, or need R4 to author it? That split is the whole
case for or against R4 and costs no extra run. *Kill criterion, stated before the run:*
if retention does not clear about half, R7 did not pay off and the release is
`rc-2026-11-01` with R4 off. If it does, R4 is judged by the split: mostly-fit means R4
is a small tail that can be off for release; mostly-authored means R4 is load-bearing
and stays.

**FORTY #3, THE CRITIC'S READ, AND THE DECISION (owner, 2026-11-02 evening).**
`homebrew40-2026-11-02T13-47-49`: **surprised 7 · plain 17 · missed 15** (baseline
7 · 8 · 25; forty #2 3 · 13 · 23), FAIL 3, clause 60%, **retention 1 of 7 — unmoved.**
Of 11 fix verdicts authoring owns ONE (#14 Spore-Mother); six are the concept never
reaching the sheet, two are regressed lints, two are the seat. Of the 7 surprises, 4
are authored rows and 2 are templates — the two "runnable tonight" sheets are a
template and a chassis row, so BOTH organs stay. `missed` moved and two instruments
agree (critic + frozen-clause count); retention did not. **But the anchor ran at 21%**:
the handoff said reuse `unansweredClause`, whose head fallback is right for one clause
and wrong for a list, so 46% of what the idea call saw was noise — the kill criterion
was measured against a mechanism a quarter running. **Decision: ONE more iteration,
same criterion, then final.** And the fallback is RE-READ: forty #3 beats the baseline
on `missed` by ten sheets, matches `surprised`, loses by two FAILs — **if the next forty
does not clear retention, the release is forty #3's state, not `rc-2026-11-01`.**
Parked, named: Regeneration as the seat's new Fear Aura (×5, four unasked, twice
stacked with another heal) — a seat-default receipt, R3b's territory, after this.

**R9 · RELEASE PASS (owner, 2026-11-02). The critic's deterministic list, classified by
the house rule first.** Forty #4 (`homebrew40-2026-11-02T18-48-33`, the critic's read):
bait 27 lines on 22 sheets, **11 deterministic**, 4 authoring run-ons. "One screenshot
sinks the sheet publicly." The owner's standing instruction for this pass: **if it needs
string surgery it has to be justified — this is where our problems come from.** Every
item below was classified before being listed; three are REMOVALS of existing surgery,
none adds a regex over the GM's or the model's prose, and prompt edits lead with the
abstract rule and put examples last or nowhere (the engine was teaching the model its
own answer). Each deterministic class gets an R1 snapshot-lint case on the saved forty #4
sheet that shipped it BEFORE the fix, so the critic's deterministic half becomes a suite.

*A. Remove surgery.* (1) `stampT` comes OFF authored seat rows — it rewrote "the creature"
(the target) into the monster's name: #36 "the scream cannot move away from the scream",
#08. The repair path never stamped; the seat should not have. (2) Whatever pass rewrote
#22's "cannot be Prone" into "cannot be **has** the Prone condition" stops running on
rows marked `authored` — the forms carry the condition as a FIELD and the renderer writes
the sentence; find the pass by replaying the saved sheet. (3) The collision fallback that
mints "<name> II" (#28) is removed: a collision refuses the row and the fallback stands in.
*B. Validate against closed facts.* (4) An authored row naming "the X condition" where X
is not in `ALL_CONDITIONS` is refused (#13 "sleep condition"). (5) A template's own
default name on a reskinned row is refused when the call named nothing — the 10-27 rule,
the catalog's own `name` fields are the list (#27 "Hurled Burst"; the placeholder rule
generalised, same site).
*C. Engine-written text.* (6) "?." — the name punctuation (#33). (7) A Multiattack that
"makes three attacks." naming no row (#13, #38 — second sweep). (8) "level 9 version"
inside a 2014 block (#37).
*D. Data.* (9) Immunity AND Absorption of one type on one sheet (#09, #10): the organ
replaces the line, it does not sit beside it. (10) d4 stacks on weapon rows (#15 11d4,
#40 7d4): the weapon table's die. (11) Cunning Action on a monk (#17): trace whether the
ROUTE declared monk and the kit table handed it the rogue's feature, or the route declared
rogue — either way declared data, fix the data. (12) The LACKS pass honours senses as it
honours languages (#10 "no eyes" with darkvision).
*E. Call fields — rule first, examples last.* (13) `mechanics` on the trait and reaction
forms: how many mechanics the row contains; the engine refuses >1 (#21, #17, #22, #13 —
four run-ons; print's 700-character traits are one mechanic, so no word count). (14) The
anchor's `clause` becomes a REQUIRED NUMBER — the index of the ask, 0 for none — validated
by bounds, no string matching. Forty #4: 49 blanks and 20 verbatim copies of the rendered
line with my annotation attached; the prompt said "or left out if it answers none", which
invited the blank. Measure the blank rate after; if it persists with the field required,
THEN a selection call is worth its cost — not before. (15) `heals` on the trait form, and
Regeneration as a default needs a receipt and never stacks: one per-turn heal per sheet
(#18, #23; four sweeps). (16) The `acts` prompt rewritten: the rule, then at most one
example.
*F. Defaults.* (17) A default trait ships only when the GM gave nothing to anchor to (a
blank roll, "a worm", "grief"). Print: **126 of 329 blocks carry zero traits** — an empty
slot is print's most common answer; an unasked Regeneration is not. Seat-kit traits earn 0
of 15 three reads running.
*G. The repair landing gets the seat's guards.* `conditionsImposedTwice` and
`danglingRefIn` on authored trait text — 3 of forty #4's 6 FAILs (#11, #12, #33).
*H. Traced, fixed if data.* The legendary seat on a CR 4 cat (#23, three of four rolls);
"a worm" with no CR at the top of the brute ladder (#27, four rolls; default mid-ladder).

*Status after the first R9 session (2026-11-02, night).* **Landed, pinned on their sheets:
A1, A2, A3 (half — see below), B4, C6, E14, G.** Suite 178/178, build clean, `.replace(`
187. **Refused with numbers:** B5 — 30 of 31 library seed names are not print row names,
so a name rule kills the fallback shelf; #27's real defect is the `name-mechanic` audit
finding that fired and sat *below the confidence gate* — that gate is the lever, not a
name rule. C8 — 2014 has no "version" idiom and the engine's 2014 Spellcasting still
emits At-Will/N-Day lists, so dropping the parenthetical loses information and
rewriting it invents idiom; owner's call. **Lint refused by print:** a "names the
creature twice" detector for A1 — 83 of print's own sentences do it; the pin is a
replay. **Found en route:** A2's true cause was ORDER (the garble-fixer ran before the
rule that makes the garble); C6's true site is the two Vue cards (`render.mjs` has
always guarded "?."), which is why saved JSON never showed it. **Miss, half-closed:** A3
fixed the trait seat's " II" fallback and not `uniqueRowName` (generate.mjs ~4944), which
still mints " II" for ACTION rows — the N4 note names BOTH sites. **Not audited:**
`skipAuthored` went on `prone-vocab` alone; the text-rule table has other vocabulary
rewrites that may garble an authored sentence the same way. **Not reached:** C7, D9–D12,
E13, E15, E16, F17, H. **No gate run** — correct: a half-pass measured is a wasted forty.
The second R9 session finishes the list, then runs both gates.

*Instrument:* the R1 lint suite green on forty #4's saved sheets after the fixes (each
class pinned on its own sheet first); then the two runs below. The critic scores with the
new rule — fix = any one-line bait, hot out of band, or unrunnable; ship+ = a quotable
signature or a fidelity tick — and counts bait (deterministic/model), signatures,
fidelity, band.

**R8 · QUALITY. The authored row goes through the quality layer — with R7, before the forty.**
The critic's split, three reads running: templates are sound and same, free text is
original and broken; three of three surprises and six of nine breaks on forty #2 were
authored rows — and three of those breaks were REPAIR-authored rows that predate R4, so
this is owed regardless of R4's fate. Four validations on the call's own answer, no
meaning read: (a) **no amputation** — `parseAuthorResponse` slices `effect` at 240
characters mid-word (Daubing Cling: 288 chars, cut to "into an o" and given a period);
a form over the cap is REFUSED, never sliced; (b) **the splice capital** — the
trigger/effect join lowercases the first word after it, full stop, not a longer word
list ("A memento", "That creature", "When the bull's"); (c) **a check or save with no
`{dc}`** is refused, beside `traitIsSave`; (d) **`condition_relation: requires` on a
condition no row on the sheet imposes** is refused — declared data, the same shape as
the third-imposition guard. Not in R8: "no referent" rows (other shepherds, raised
horses) — that is meaning, and is a call field or nothing.

Items 2, 1d and the old 5/6 are absorbed or deferred behind R4. The release bar in §5
still applies to whatever ships next; `rc-2026-11-01` is what we fall back to.

### The critic's read of forty #1 (2026-11-02) — what it changes

`sweep-2026-11-02T01-24-00`: **19 ship / 18 fix-lite / 3 fix** (11-01: 12/25/3) ·
S 22 clean / 16 nits / 2 broken (13/24/3) · shape repeats **31 -> 19**, 18 kinds -> 7 ·
runnable-tonight 2 · traits earning their row **15 of 34**. R3 shows: "the
garbled-sentence class is nearly gone."

**The number R3b needed.** *"Slot-fill traits earn 10 of 11; seat-kit traits earn 0
of 15."* Fear Aura on 6 sheets, 5 unasked (Vampire, Red Dragon, Brass Tyrant, Peals,
Krennik) — the seat's default trait is the sameness stack. R3b stays next and now
carries its instrument: **traits-earning 15/34 -> >= 25/34**, Fear Aura unasked 5 -> 0.

**Refused, with the finding kept.** The critic's §3 — "shoulders through walls" ->
Siege Monster, "a shell that sheds acid" -> the acid aura — is right that these are
not closest-accepted misses, and wrong that they are "key-table entries
(walls/siege/ram; shell/sheds/drips)". That is a word list deciding meaning (the
third such proposal this sprint). Both are print's own rows, and R3b's receipt — the
call quotes the GM's words for the mechanic it claims — LOADS them by the same rule
that unloads Fear Aura. So §3 is R3b's acceptance test, not a separate item: on a
re-roll of the forty, the Scaffold Ram carries Siege Monster and the Broodmare its
acid shell, each with the quote on the row.

**N4 — zero-cost, before R3b** (saved sheets only; no API):
  - lint: a row shipping a template's DEFAULT name ("Composed Row", "Trait", "Row")
    — the Rivenhearted Glacier, S0.
  - batch check: the same invented name carrying DIFFERENT rules across sheets
    (Sundering Shove: a 30-ft cone on the Scaffold Ram, single-target on the Stone
    Golem) — worse than byte-identical, and currently passes.
  - converter: "On a failed save, Until the start…" x2 — the `*Failure:*` label swap
    keeps the next word's capital; same closed lowercasing rule as the reaction fix.
    And the Vampire's Bite "…on a failed save. On a failed save, plus 13 (3d8)…" —
    a welded rider re-labelled by the converter; lint the doubled label.
  - MEASUREMENT GAP: the single-target ceiling fired on one of the three exploiter
    rows the critic found (Broodmare 54 at CR 9) and missed two (Glacier 54 at CR 15
    against 51; Leviathan 63 at CR 24 against 58). Find out why before trusting the
    gate's zero on any forty.
  Instrument: each lint fires on the named sheet of `sweep-2026-11-02T01-24-00`
  before any engine change.

**Parked, named.** Krennik is the worg again (the mount merged into the rider; head
ask missing — a repeat). The Red Dragon's Harrowing Presence inverts "blind in one
eye" for the third time. The sellsword's handaxe text on the Shortsword row, seventh
sweep. These are R4-era: a seat that authors first does not reach for them.

**R4's baseline is set.** `homebrew40-2026-11-02T01-02-31`, the critic's one
question — would the GM who typed this be surprised? — **7 surprised / 8 plain / 25
missed** of 40. The 25 are the concept's own sentence absent from the page ("only
dangerous the turn after it goes still", "only ever makes one attack" beside a
three-attack Multiattack, "no mouth" with a breath weapon). Forty #2 re-rolls this
batch after R4; the bar moves when a sheet leaves the third bucket for the first.

Order from here: **N4 -> R3b -> targeted sixteen (two concepts x eight rolls) ->
R4 -> twelve of the closest-accepted sheets -> forty #2 on `homebrew40` + the critic's
surprise question again.**

### Runs for this program — two fortys, total (owner, 2026-11-01)

The forty is the regression gate for a SET of changes we are confident in; a feature is
proven by the cheapest rung that answers it (§5c's ladder). Four fortys ran in the last
36 hours; one per stop point was right, but R1–R3 need fewer than that.

| item | rung | run |
|---|---|---|
| R1 | none — asserts over SAVED sheets | zero API cost; must fail on `20-03-32` before any engine change |
| R2 | none — reads traces | zero |
| R3, each site | in-process replay on the sheet that broke (Krennik for the seam, Bog Hound for the save, the rider-weld hosts), then ONE targeted batch per site: `twelve-1030` for the weld, a six-sheet 2014 batch for the printing, `spear5` for the rider-on-weapon path | 2–5 min each |
| R3 stop point | **forty #1** — R1 green, `.replace(` count down, critic package | one |
| R4 | targeted twelve of the sheets whose idea died at "closest accepted" (R2 names them), then **forty #2** + critic | one |

A forty that drops sheets is finished with `--only <indices>`, never re-run whole.
No forty for R1, R2, or any single R3 site.

## 6. For the next session, in one paragraph

State at 2026-11-02 (night): four fortys on `homebrew40` are scored by the critic. The
originality program is CLOSED BY DECISION — retention 1 -> 1 -> 3 of 7, `missed` 25 -> 12;
Anchor and Author stay, Re-roll stays deferred, and the owner does not want to keep
iterating on it. What is left is **R9, one plumbing pass**, classified by the house rule
(no new string surgery; three removals of it) and then the gate. **The release gate is
two runs, not one**: `sweep.json` as the regression floor (its own baseline: 19 ship / 18
fix-lite / 3 fix on forty #1), and — the critic's point, adopted — **a forty of REAL user
concept strings**, because `homebrew40` is the adversarial distribution by design and the
GM who types "Orc Bloodpriest" is the real one. If the owner has the strings, that run is
the number; if not, R5's telemetry is what gets them and `homebrew40` stands in once more.
Go/no-go: deterministic bait at 0 on both runs (the R1 suite says so before the critic
does), band median within ±1, FAILs at or under each run's own baseline, and the critic's
read of the real-concept forty reading like the Bloodpriest and not the Toll-Bell Wraith.
The release candidate is then that state; `rc-2026-11-01` is the fallback only if R9
regresses `sweep`. Post-release, parked and named: subclass/feat fidelity (SRD idiom, not
PHB), the counter template family for the abstract verbs, the HP-max-drain ceiling. The
implementer reports mechanism numbers and the R1 suite; the critic scores. Meaning is a
call field, never a word list; the engine edits fields, never sentences — and the
substitution bug that topped forty #4's list is what breaking that rule looks like.

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
