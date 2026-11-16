# The case: the catalog is not the problem (2026-10-21)

Five things landed today. The forty closed at **2 FAIL of 40**
(`sweep-2026-10-21T18-15-11`), Jest 115 suites / 3697 passing, build clean.

This case asks the critic to attack one conclusion in particular, stated plainly
below with its sample size, because the engine's whole catalog roadmap now rests
on it.

---

## 1. One grammar for "what condition does this row impose"

The `duplicate-mechanic` gate failed a sheet for three rows imposing Prone when
print's own Trample only TARGETS the already-prone ("one creature within 5 feet
**that has** the Prone condition"). The gate was wrong and the engine's stripping
pass was right to decline.

Cause: three copies of one grammar — the reader in `author.mjs`, a private
`imposedBy` in the checker, a private `imposedIn` in the engine. Widening the
reader fixed neither consumer. Both copies deleted; all three call one
set-returning `imposedConditions`.

The grammar cannot be made correct by alternations, and this is the evidence:

| grammar | example | truth |
|---|---|---|
| relative clause | "one creature **that has** the Prone condition" | requires |
| slot placeholder | "that has the `{consumed_condition}` condition" | requires |
| self-subject | "it gains +4 AC **and has the Prone condition**" | imposes on ITSELF |
| `if` as a gate | "**If** the target is Medium or smaller, it has the Grappled condition" | **imposes** |
| `if` as a requirement | "can't use this trait **if** it has the Incapacitated condition" | requires |

The last two have identical grammar and opposite meaning. So the WRITERS record
instead: `IMPOSES_BY_TEMPLATE` (hand-verified, 25 templates across 8
trigger/effect families, stamped at render), the grapple weld, the trait and
reaction rows from the authoring call's own `imposes` answer, and all five
library-row construction sites (three were dropping it). Four false
`imposes: Prone` tags removed from print's Trample in `donors.mjs`.

Coverage 38% → 61% on a condition-heavy twelve.

## 2. A clause the call judged is not an owed clause

Rule 1e failed two blocks and neither was a dropped clause. Vashka the Red
failed for "never breaks ranks" while the repair call had answered
`unplaced: ["description:never breaks ranks"]` — having read the finished sheet,
it judged the clause flavour. The engine discarded the verdict and failed the
block; worse, `landAuthored` only runs when the answer holds ROWS, so the prose
never reached the description either and the GM's words vanished entirely.

Both ways the call can say "this needs no new row" are now honoured and recorded
(`generation.answered_in_prose`, `answered_by_existing`). Live: Screewhelm's
"buries what it catches" credited to `Entomb`; Vault Maw's "carving with the
others" to `Multiattack`.

Not fixed by widening `claimedBy` (4-character stem overlap): "breaks"/"ranks"
share no stem with "unbroken"/"yield", nor "buries"/"catches" with
"entombs"/"grappling". Where two calls disagreed — the clause reader said
mechanical, the repair said description — the later call, holding the finished
sheet, judges.

## 3. A pre-existing escape bug, worth two false FAILs a forty

`effectOnly` in the checker carried `\\\\b` inside a template literal, which
`new RegExp` reads as a literal backslash followed by "b". That alternative
never matched from the day it was written, so rows reading "one creature within
30 feet **that is Frightened of** the X" kept their condition word and
`save-fit` demanded a Wisdom save for what is a damage row targeting the
already-frightened (the `exploiter` shape). Re-checking the SAME saved forty:
**5 FAIL → 3**.

## 4. THE CLAIM TO ATTACK — the catalog is ~93% complete

The engine now reports, on every `[gap]` line, which same-seat templates it
rejected and at which stage (`role` / `style` / `legality`). Over the forty,
**41 gap lines**:

| bucket | share | meaning |
|---|---|---|
| OVER-DECLINE | **71%** | a same-seat template WAS on the menu and the call said no |
| ROLE SHELF | 17% | none offered; same-seat ones exist but the role filter cut them |
| LEGALITY | 5% | correctly cut — wrong body type, no host row, wrong style |
| GENUINE GAP | **7%** | the catalog has nothing for that seat |

On that basis **composition was retired from the plan** — no genuine gap in
forty blocks needed two templates' effects in one row — and so was the
`on_being_hit/condition` family theory (4 of 5 genuine gaps one run, 1 of 3 the
next).

**Where this is weak, and what to attack:**

- **n = 41 gap lines from ONE forty.** The genuine-gap bucket is 3 lines. A
  second forty could plausibly read 4 or 15.
- **Three of my own earlier readings of this same data were wrong**, each in the
  direction of overstating a lever: a keyword clustering gave "four missing
  families"; a shape matrix gave 14 shapes at ~40% classification accuracy; and
  a first pass on this very instrument read **79% ROUTING** because it matched
  on trigger+effect and ignored `section` (counting `reaction` templates as
  withheld from `trait` seats). Why should the fourth reading be trusted?
- **OVER-DECLINE at 71% is asserted to be benign** because closest-acceptance
  lands the call's own named-nearest template and 1 row in 41 shipped nothing
  (against 22% of blocks at 2026-10-16). But "a row landed" is not "the right
  row landed". The blocks in this batch are the evidence; read them for whether
  second-choice rows are visibly worse.
- **Offline reconstruction of a menu was abandoned** after `heated-body` and
  `hook-drag` both appeared in rebuilt contexts and not in live ones. The
  diagnostic is therefore unverified against any independent method.

## 5. The forty is a long tail, not a work queue

| forty | FAIL |
|---|---|
| `...15-19-47` | 3 of 40 |
| `...15-59-59` | 3 of 40 |
| `...16-48-01` | 3 of 40 |
| `...17-45-29` | 3 of 40 (read 5 before the `effectOnly` fix) |
| `...18-15-11` | **2 of 40** |

The population turns over almost completely between runs. `two-novas` (Knell
Swarm) and `lack-honored` (Adult Red Dragon) repeated twice and then vanished on
the next run from the same fixed batch — so even an apparent repeat is variance.
Three defect classes were genuinely closed today and the count barely moved.

Remaining in this batch: a `lint:dangling-use-ref` / `undefined-attack-ref` pair
on one block (Shield Wall cites "Riposte even", a reference the row's own text
never defines) and `speaks-by-int` (INT 4 Monstrosity that speaks).
