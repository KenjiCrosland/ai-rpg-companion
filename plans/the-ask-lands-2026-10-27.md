# The ask lands — a mechanic per clause, a lead per seat

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. Priority 1 from the
owner's GM read (`plans/gm-read-2026-10-27.md`). Read that file's verdict first.

## The problem in one sentence

A GM who types two things gets the first and loses the second: the route call
names ONE mechanic per sheet, that one value leads EVERY seat's menu, and the
clause the second seat serves never declares what it asked for.

## The case, with the trace (save10-2026-10-27T00-36-54, #01)

Concept: *"a brass tyrant whose furnace breath terrifies and whose hammer finds
the terrified."* The GM typed the loop. Both **fix** verdicts in the read were
this class of miss.

```
clauses: "furnace breath terrifies" -> [asked: condition]
       | "hammer finds the terrified" -> [asked: attack]
declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
menu ordered by the idea's stamps: action — idea fires on_hit/does damage;
   leading: escalating-dread (save/condition), terror-pulse (save/condition), isolation (on_hit/damage)
```

- The AI's idea for the hammer seat was exactly the payoff: *"when the
  vrakmourne strikes a creature that is already frightened … the blow carries
  searing heat."* Tagged `on_hit/damage`.
- `condition-payoff` **was on the menu** (the Meshrin menu-widening held).
- But the sheet's single `askedMechanic` is `fear` — read off the BREATH clause
  — and tier 0 of `orderByStamps` puts fear templates ahead of the stamp-matching
  payoff on the HAMMER's seat. The call rightly refused two fear rows for a
  hammer, then landed on filler ("Cinder Rounds").
- The hammer's own ask was never declared. The word exists: `escalate` is in
  `ASKED_MECHANICS` and `MECHANIC.escalate` holds `condition-payoff` and
  `exploiter`. There was simply one slot, and the breath took it.
- The clause call DOES tag each clause — but with a **shape** (`attack`,
  `save_area`, `condition` …), not a mechanic. `[asked: attack]` is true of a
  hammer and useless for choosing a payoff.

So the vocabulary exists, the menu holds, and the ask is lost between them
because it is one-per-sheet and leads the wrong seat. This is why a two-clause
concept — the Horseman-style test — keeps losing its second clause while a
one-clause concept lands.

## The design — no new call

The clause call already runs once per sheet over every clause and answers
`shape`, `when`, `how_often` per clause (generate.mjs ~493 skeleton, ~1490–1500
parse into `askShape`/`askWhen`/`askOften`). Add **`mechanic`** beside `shape`:
one of `ASKED_MECHANICS` or `unsaid`, with the GM's own words as its quote — the
same receipt discipline the three existing fields use. Validate by membership;
keep only with a quote that is the GM's words (reuse the `wKeep`/`oKeep`
pattern); stamp it as `askMechanic` on the clause record.

Then, per seat: the seat already knows its clause (`assignSeats` →
`seatsT.action` / `seatsT.trait`, element text), and `askedFor` already finds
the clause record by text-includes on the first 24 chars. **The lead for a seat
is `record.askMechanic` of the clause that seat serves**, falling back to
`options.askedMechanic` only when the seat has no clause of its own.

Thread that per-seat value into the four consumers that today read
`options.askedMechanic` (generate.mjs 3977, 4157, 4167, 4240): the idea prompt's
"WHAT THE GM ASKED A ROW TO DO", `rankByVerb`, `gateStandsDown`, `orderByStamps`.
One local `askedT` computed once at the top of `fitSeat` from the seat's clause.

Leave `options.askedMechanic` (the route call's single value) as it is — it is
still right for single-clause concepts and for the seat with no clause.

## Replay (write first)

1. Clause parse: a clause answering `mechanic: "escalate"` with quote "finds the
   terrified" stamps `askMechanic: 'escalate'`; `mechanic: "fly"` (not in the
   list) stamps nothing; a mechanic with a quote that is not the GM's words is
   dropped with the existing "asked field dropped" trace.
2. Per-seat lead: with two clause records `{text:'furnace breath terrifies',
   askMechanic:'fear'}` and `{text:'hammer finds the terrified',
   askMechanic:'escalate'}` and seats `{action:'furnace breath that terrifies',
   trait:'hammer that finds the terrified'}` (match on the record's words the way
   `askedFor` does), the action seat's lead is `fear` and the trait seat's lead
   is `escalate`. Export the small resolver so the test can call it.
3. `orderByStamps` on #01's real action pool with lead `escalate` puts
   `condition-payoff` first; with lead `fear` it puts `escalating-dread` first.
   (Both are the pool from the trace: condition-payoff, escalating-dread,
   terror-pulse, isolation, exploiter, …)
4. A one-clause concept: the seat's clause has no `askMechanic` → falls back to
   `options.askedMechanic`, behaviour unchanged.

## Canaries — `scripts/smoke-batches/ask-lands.json`

The three asks from the read, verbatim, plus the Horseman:
1. "a brass tyrant whose furnace breath terrifies and whose hammer finds the
   terrified" — the hammer seat must land a payoff on Frightened.
2. "a plague-bearing archon of flies" — contagion on a hit row.
3. "a siege-engine golem of lashed timber that shoulders through walls" — a
   Siege Monster trait and/or a through-walls row.
4. "a headless horseman who rides down the fleeing and takes their heads" — two
   clauses; both must land. Name what you'd call a Horseman's move.

## Pre-registered pass/fail

- **BAR 1 (the number that matters):** "the ask lands" rate. For every clause
  the clause call marks `mechanical` with a mechanic, does a row ship whose
  template declares that mechanic (`MECHANIC_OF[template] === askMechanic`)?
  Measure it on the four tens of 2026-10-26/27 BEFORE the change (write the
  script: `scripts/signature-measures/ask-lands.mjs`, reading the `clauses:`
  trace and shipped `template` fields) and report the baseline; then after.
  Target: the two-clause concepts in the canaries land BOTH clauses (4 of 4),
  and the rate on a `save10` ten does not fall.
- **BAR 2** #01's hammer seat ships a row whose template is in
  `MECHANIC.escalate` and whose text names Frightened as its precondition.
- **BAR 3** no regression on one-clause concepts: in the ten, seats with no
  clause of their own trace "lead: sheet's asked mechanic" and nothing else
  changes for them.
- **BAR 4** no extra call: the clause call ran before and runs now; count calls
  per sheet in the trace and show the number is unchanged.
- **BAR 5** suite green (4,011 now), build clean.

## What this will NOT fix

- "plague-bearing" → contagion and "shoulders through walls" → siege may ALSO be
  vocabulary gaps (is there an `ASKED_MECHANICS` word the clause call would
  reach for? `contagion` is not in the list; `siege` is not in the list). If the
  baseline script shows those clauses tagged `unsaid`, that is the next change:
  add the word AND the `MECHANIC` family mapping, nothing else. Do not add words
  speculatively — add the ones the canaries prove missing.
- Naming (priority 2) is a separate plan.

## Non-goals
No new call. No change to the route call's single value. No keyword table.

---

## LANDED 2026-10-27. The mechanism works; the row is eaten by the free-row budget.

Suite 4,021 green, build clean. Replay: `__tests__/ask-lands.spec.js` (10 cases
from the real #01 trace). Baseline script: `scripts/signature-measures/ask-lands.mjs`.

**Baseline, measured before the change (40 sheets, four tens):** the sheet's one
declared ask lands on **6 of 18 sheets (33%)**, and on sheets with two or more
mechanical clauses, **0 of 4**. Worse than this plan assumed — it is not only the
second clause that is lost. Taxonomy checked: `shove`→charge-push and
`burst`→active-toll score as landed, so the misses are real; only
`grapple`→`swallow` is an artifact.

**The clause call now answers a mechanic per clause** (same call, no new one),
validated by membership of `ASKED_MECHANICS` and the same quote discipline as
`when`/`how_often`. **`leadForSeat`** matches a seat to its own clause by shared
words; the three readers inside `fitSeat` (verb rank, gate, menu order) take that
value. One plan item was WRONG: the idea prompt is called ONCE for both seats, so
`seat` is out of scope there — my first cut threw at runtime and the suite caught
it. Reverted to the sheet value; telling that call BOTH clause asks is a separate
change.

**The vocabulary was the real blocker, and it was invisible until the first canary
run.** Both calls were shown 26 BARE WORDS. `harvest` was named for "takes their
heads" (the word is in the phrase); nothing was named for "whose hammer finds the
terrified", because no reader maps that onto `escalate` — a label covering
bloodied-fury, rampage, berserk, execute, condition-payoff, exploiter,
assassinate, isolation and wind-up. `MECHANIC_GLOSS` now gives all 26 a one-line
meaning derived from the templates each family holds. With it:

```
clauses: "furnace breath terrifies" [askMechanic: breath]
       | "whose hammer finds the terrified" [askMechanic: escalate]
lead by this seat's own clause: action — "escalate" ... not the sheet's "fear"
declared mechanic leads the menu: action — escalate: condition-payoff, exploiter, execute
signature template: condition-payoff -> Actions/"Merciless Strike"
```

**The ask reached the menu, was ordered first, and was picked.** That is this
plan's goal, achieved on the exact case.

### THE ROW STILL DOES NOT SHIP — the next defect, and it is not placement

```
feature name: "Merciless Strike" -> "Trip Attack"
multiattack replacement clause: It can replace one attack with a use of Trip Attack.
free row over budget: Actions/"Trip Attack" leaves at ship — this sheet's
  free-row budget (1) is spent by a row that SHIPPED
multiattack re-read — "Trip Attack" left; "Multiattack" now reads "...two Hammer attacks."
free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Terror's Toll"
```

The payoff was picked, named, and wired into the Multiattack — then the
**free-row budget** (1 per sheet) kept the TRAIT seat's `assassinate` decoration
and evicted the ACTION seat's receipted payoff. A row the GM asked for lost its
slot to a row the call admitted was a nearest match.

**CORRECTION after a second look (Fable, same day): it is NOT an ordering
question — the ordering already exists and did not fire.** The budget site
already ranks free rows `gmQuote (0) > expresses (1) > decoration (2)` and says
"a receipt row is never displaced". The payoff had `expresses` (rank 1); the
`assassinate` row was decoration (rank 2); the decoration was kept. And the
`free-row order:` trace, which that ranking prints, never appeared on the sheet
— so the ranking branch did not run for these two rows.

There is a second oddity in the same trace that may be the same bug:

```
seats: action <- "furnace breath that terrifies" | trait <- "the hammer that finds the terrified"
lead by this seat's own clause: action — "escalate"
lead by this seat's own clause: trait  — "escalate"
```

`leadForSeat` counts shared words. "furnace breath that terrifies" shares three
words with the BREATH clause and none with the hammer clause, so the action seat
should have been led by `breath`, not `escalate`. Both seats answering `escalate`
means either the seats were re-assigned after that trace (the chassis nova
covered the breath — see `covered` in `assignSeats`) or `leadForSeat` was fed
something other than the traced seat text. Either way the lead on the real case
was right by accident, which is the "consistent hidden error" the owner's rule
exists to catch.

### REPLAY DONE 2026-10-27. Both questions answered; one real defect fixed.

**Q1 — the leads were right; the TRACE is stale.** There are two `assignSeats`
calls. The one that prints `seats:` (line ~2152) sits in a bare block and its
`const seats` is discarded — it exists only for the trace. The real `seatsT`
(~3913) runs later with a wider `covered` list that includes `coveredBySheet`,
so the Furnace Breath nova had covered the breath element and BOTH seats
legitimately pointed at the hammer. `escalate` twice was correct. `leadForSeat`
is not misfiring — it is still the string-match debt below, nothing more. The
misleading `seats:` trace was left alone (out of scope).

**Q2 — the receipt was never on the row. Fixed.** `settleSheetBudgets` ranks
free rows by reading `expresses` OFF THE ROW. Three sites marked a row free and
only the trait ones put the receipt there:

| site | `freeRow` on row | receipt on row |
|---|---|---|
| action seat's grant (`takeAsFreeRow`) | yes | **NO — left on the seat** |
| trait, refused template | yes | yes (null) |
| trait, with a receipt | yes | yes, via `shipTrait`'s later copy |

So every ACTION free row reached the budget looking like decoration. Traits
iterate first and the sort is stable, so the trait seat's row took the single
slot and nothing ever reordered — the `free-row order:` trace fired on **2 of
the 32** sheets that had two or more candidates across the four tens. The
"a receipt row is never displaced" rule (critic, 2026-10-22) never protected an
action row. That is the owner's placement complaint, mechanically.

Fixed with ONE OWNER for the mark, `markFreeRow(seat, {decoration})`, used at
all three sites so a fourth cannot repeat the omission. Replay in
`__tests__/sheet-budgets.spec.js` covers the stamp and the tyrant's real pair in
sheet order; **verified failing (2 tests) with the pre-fix behaviour restored**,
passing with the fix. Suite 4,025 green, build clean.

**Also found: rank 0 of that ranking (`gmQuote`) is unreachable and always was.**
No site writes it, and a free row cannot carry a GM quote by definition — a row
the GM's words asked for earns clause credit and never becomes free. The arm was
kept with a note; flagged to the owner for a ruling.

### The canary re-run did NOT exercise the contest — read the replay, not the ten
`smoke-out/ask-lands-2026-10-27T01-49-36`: only one sheet produced a free-row
candidate at all (1 of 1 kept), so the budget never had to choose. Per
[[replay-the-known-bad-case]] this is the expected shape — a live run samples the
trigger, the replay forces it. The run's job here was regression, and it passed:
per-clause mechanics still answered (`fear`/`escalate`, `charge`/`drain`), both
seats still led by their own clause on #04.

One unrelated miss in that run, pre-existing and DEPRIORITISED by the owner
("the critic is too strict on CR"): #03's `push-prone` was dropped by the value
floor at CR 8 and no seed was legal, so the sheet shipped no signature.

### THEN: the declared seat↔clause link (replaces the word counting)

`leadForSeat` is the one string match today's work introduced. The seat's
element and the clause are two phrasings of the same GM words produced by two
different calls; the fix is a field on whichever of those calls runs second —
"which clause does this element come from" (an index, validated by range) — so
the seat carries its clause id and the word counting is deleted. Write this plan
after the replay, because the replay decides whether the matcher is merely
debt or already misfiring.

### Measurement caveats for whoever reads the script next
- `ask-lands.mjs` credits a landed ask by the shipped row's TEMPLATE id, so a
  chassis/donor row that does the thing (Furnace Breath has no template) scores
  as a miss. The per-clause `breath` "miss" on #01 is exactly that.
- Its sheet-level reading takes the FIRST "declared mechanic leads the menu"
  line, which since this change is a PER-SEAT line. Rewrite it to read
  `[askMechanic: …]` per clause only; the 4/4 it reported on the canaries is not
  comparable to the 6/18 baseline.
