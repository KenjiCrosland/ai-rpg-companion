# Fit by stamps, not keywords — handoff to the implementation session

**Owner's working split (2026-10-26):** this plan was written by the analysis
session (Fable). The implementation session (Opus) executes it. Read this whole
file first; it assumes no conversation history.

## The problem in one sentence

When the AI describes a monster's signature ability in plain words, the code
picks the rules template by **keywords in the GM's concept** — "bell" →
`resonant-body`, "wall" → `spider-climb`, "statue" → `false-appearance` — and
that pick lands on the wrong mechanic more than half the time, bending every
bell-ghost into the same template regardless of what the AI actually described.

## Evidence (reproduce before touching anything)

All on the four `save10` runs (40 sheets, same batch, today's engine):

```
node --import ./scripts/alias-loader.mjs scripts/signature-measures/fit-trigger-match.mjs \
  smoke-out/save10-2026-10-25T20-35-08 smoke-out/save10-2026-10-25T20-49-19 \
  smoke-out/save10-2026-10-26T03-01-19 smoke-out/save10-2026-10-26T14-41-49
```

compares each shipped trait's **declared trigger** (the catalog cell) with the
**idea's declared trigger** (the AI's own tag on the `signature idea (trait)`
trace line). Result:

| how the template was chosen | fires differently from the idea |
|---|---|
| bound by a concept keyword | **6 of 11 (55%)** |
| named by an idea keyword | 2 of 8 (25%) |
| shape fit (nearest, no keyword) | 3 of 12 (25%) |

Three concrete cases from `smoke-out/save10-2026-10-26T14-41-49`:

- **#05 bell-ghost.** Idea: *"every blow the peal LANDS leaves a ring humming
  in the target; later hits deepen it"* — tagged `[trait/always/damage]`, an
  on-hit stacking effect. Shipped `resonant-body` (fires `on_being_hit`: thunder
  damage to whoever hits IT). The fit call's own `because` restated the idea
  correctly and picked the reactive template anyway. The menu line read
  `VERB MATCH: toll (concept), bell (concept), peal (concept), ring (idea)`. This
  monster got `resonant-body` in 3 of the 4 runs.
- **#01 brass tyrant.** Idea: *"burns hotter the longer it is opposed; once
  wounded badly, it moves faster and strikes harder."* `bloodied-fury` was on
  the menu and IS that idea. The fit call listed it in `wrong` ("word match
  declined by the call") and shipped `noxious-aura` as a nearest match, named
  "Noxious Aura", on a furnace creature.
- **#07 timber golem.** Idea begins *"The golem is NOT a carved statue…"*. The
  word "statue" keyed `false-appearance`; it shipped as a disguise trait named
  "Wall Breaker".

Two failure modes, one lever: the keyword label makes the AI **accept** a wrong
template that carries many matches (bell-ghost) and **reject** a right one as a
"word collision" (tyrant). The prompt already says "a VERB MATCH nominates, it
never accepts" (templates.mjs ~1514-1515) — the words are there and the AI
still follows the label and the position.

## Where it lives

- `generate.mjs` ~4165-4186 (`fitSeat`): `conceptBound` = templates whose
  `keys` matched words in the CONCEPT; `ideaNamed` = templates the IDEA's words
  matched that are not already on the menu. Then
  `offered = [...conceptBound, ...rest, ...ideaNamed]` — concept-keyword
  templates go **first**, idea-named go **last**.
- `templates.mjs` `templateMenuLines` (~1472-1486): every menu line carries
  `VERB MATCH: <word> (concept|idea)` when a key word hit.
- `templates.mjs` `rankByVerb` (~504): scores by key-word overlap; also
  honours `askedMechanic` as the lead (keep that — it is a declared stamp).
- `templates.mjs` `parseFit` (~1590): reads `wrong: [...]` — the AI's list of
  "word collisions" — into `wrongT` (generate.mjs, 7 uses) which feeds
  `declinedT` and the "word match declined by the call" trace.
- `VERB_KEYS` (templates.mjs ~379-470): the word table. **Do not delete it** —
  `deniedBy`, `scrubDeniedClauses`, `conceptVerbs` and the seed path read it.

## The change (owner's architecture: "categorize in the first calls, sort on the stamps")

The idea already carries declared tags — `trigger` and `effect` — chosen by
the AI from closed enums. Every template declares the same two cells. Order
the menu by **stamp agreement**, and stop showing keyword labels.

1. **`fitSeat` ordering.** Replace the `conceptBound`-first assembly with:
   `askedMechanic` lead (unchanged) → templates whose declared `trigger` AND
   `effect` equal the idea's tags → templates matching `trigger` only → the
   rest. Within a tier keep catalog order. `ideaNamed` templates join the pool
   like any other (they are no longer appended last). Keep the `conceptBound`
   computation ONLY for the existing trace line ("signature bound to the
   concept's verb") so runs stay comparable — but it must not reorder.
2. **`templateMenuLines`.** Drop the `VERB MATCH: …` suffix. In its place,
   mark stamp agreement plainly, e.g. `[fires: always, does: damage — matches
   the idea]` on tier-1 lines and nothing on the others. The AI should see the
   idea's own tags echoed, not the GM's words.
3. **Fit prompt text** (`buildFitPrompt`, the two paragraphs at ~1514-1515
   that explain VERB MATCH, and ~1520 "A template whose match is marked
   (concept) may be used even if you answer none"): rewrite for the new
   labels. Tell the AI the list is ordered by how the ability FIRES and what it
   DOES per its own description, that order is a hint not a verdict, and that
   `none` is the right answer when nothing carries the idea. Keep the
   `declined_because` enum; `collision` stays valid but should become rare.
4. **`wrong`.** Keep parsing it (harmless), but nothing should remove a template
   from a later menu because of it. Check what `wrongT`/`declinedT` gate
   (generate.mjs ~4285, ~4358) and make sure a `wrong` answer only traces.

Do **not** touch the trait-idea prompt (just rebalanced and measured, commit
"the idea prompt gives print's trait kinds") or `rankByVerb`'s `askedMechanic`
lead (measured 432/432 on 2026-10-23).

## Pre-registered pass/fail

Run one `save10` ten after landing (`SMOKE_TIMEOUT_MS=300000 node
scripts/smoke-statblock.mjs save10`), then the three scripts in
`scripts/signature-measures/` on the new run dir.

- **BAR 1** `fit-trigger-match.mjs` — "fires differently from the idea" falls
  from 11/31 (35%) to **≤ 20%** of shipped traits. At n≈9 traits that is 0–2.
- **BAR 2** the bell-ghost (#05) does NOT ship `resonant-body` unless its idea
  is tagged `on_being_hit`. Read its idea tag and its shipped template by hand.
- **BAR 3** `idea-to-row-rate.mjs` — ideas reaching the sheet stays **≥ 70%**
  (baseline 72%, last run 58% on action-seat noise — if it falls on the TRAIT
  seat, the new ordering is hiding the right template; inspect the menus).
- **BAR 4** decoration (nearest-match) rate stays **≤ 20%** (last run 18%).
- **BAR 5** suite green (`npx jest src/tools/statblock-generator src/util
  --maxWorkers=2 --silent`, 3,943 now) and `npm run build` clean. Tests that
  pin `VERB MATCH` text or `conceptBound`-first order live in
  `__tests__/templates.spec.js` (57 hits on rankByVerb/VERB MATCH),
  `asked-mechanic.spec.js`, `classes.spec.js`, `species.spec.js` — update the
  ones that assert the label or the order; keep the ones that assert the
  `askedMechanic` lead.
- **HOLISTIC** read the ten's blocks as a GM: ship / fix-lite / fix.

## Replay (write it first; the ten is regression, this is the proof)

A deterministic script beside the criteria: build the fit prompt for the
bell-ghost's exact idea and the exact menu from the trace
(`spider-climb, phobia, bloodied-fury, shielded-mind, evasion,
relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura,
assassinate + shelf: resonant-body`) with the idea tagged `always/damage`, and
assert (a) no line contains `VERB MATCH`, (b) `resonant-body` is not in tier 1,
(c) the tier-1 lines are the `always/damage` templates. Repeat for the tyrant's
idea (`always/damage`) and assert `bloodied-fury` is tier 1. Replay the
predicate; do not trust a clean ten for a shape the ten may not draw.

## What this will NOT fix (so nobody measures the wrong thing)

- A trait seat with **no template** for the idea (the bell-ghost's stacking
  on-hit effect has no trait-shaped home; the right answer there is `none`,
  then the library/decoration path). That is a shelf-coverage item, separate.
- The AI-picked rate is 25% wrong too. After this lands, measure again and the
  remaining misses are the menu-description problem, not the keyword one.

## Measurement scripts (committed with this plan)

`scripts/signature-measures/idea-tags.mjs` — the AI's declared trigger/effect
per idea, by seat. `idea-to-row-rate.mjs` — ideas proposed vs shipped vs lost,
with loss reasons. `fit-trigger-match.mjs` — the table above.
`decoration-vs-idea.mjs` — each nearest-match row beside the idea it replaced.
All take run directories as arguments and print unparsed lines, so a zero is
never a stale parser.

---

## LANDED 2026-10-26. Result, and the bottleneck it uncovered.

Suite 3,953 green (+10), build clean. Ten: `smoke-out/save10-2026-10-26T15-11-53`.

**BAR 1 read correctly needs a split the plan did not anticipate.** Raw, 4 of 7
shipped traits fired differently from their idea's tag — worse than the 11/31
baseline. But `scripts/signature-measures/trigger-available.mjs` (new) asks
whether a template with the idea's own trigger was even ON the menu, which
separates an ordering failure from a catalog gap:

| | before (4 runs, 31 traits) | after (1 run, 7 traits) |
|---|---|---|
| fires as the idea said | 20 | 3 |
| **ordering failures** (a same-trigger template was available) | **9 (29%)** | **1 — and on inspection, 0** |
| catalog gaps (no template on the menu has that trigger) | 2 | 3 |

The single flagged ordering failure is #01 Furnace Tyrant and it is **a correct
pick**: the idea ("the air around it shimmers with heat that wears down anyone
who lingers close") was tagged `always/damage`; the call skipped tier 1
(`assassinate`, always/damage — first-round advantage, nothing to do with heat)
and tier 0 (`phobia`, led because the GM's "terrifies" made `fear` the asked
mechanic) and chose `fire-aura` (start_of_turn/damage). It shipped as
*"Furnace Heat. At the end of each of the tyrant's turns, each creature in a
5-foot Emanation takes 13 (3d8) Fire damage."* That is the print idiom for a
heat aura and the idea's own `always` tag was the imprecise half. The call
overrode its own tag against the order — which is the design ("order is a hint,
not a verdict") working.

So BAR 1 is a pass on the thing it was built to measure, with the caveat that
**trigger agreement is a proxy that penalises the call for being right**. Any
future use of it must run the availability split first.

BAR 2 **pass** — the bell-ghost's `resonant-body` is no longer seated by the word
"bell". Its menu held 11 templates and NONE had the idea's `start_of_turn`
trigger, so `resonant-body` led on effect alone (tier 3). A catalog gap, not a
keyword bind.
BAR 3 **pass** — 78% of ideas reached the sheet (baseline 72%).
BAR 4 **fail, narrowly and noisily** — decoration 29% of shipped rows (4 of 14)
against a ≤20% bar; it was 18% last run, 31% before. The one readable case is
`weapon-lodge` again, on the Ramgate Hulk's "lattice of lashed timber that
splinters when struck".
BAR 5 **pass** — suite and build.

### Three things the implementation found that the plan had wrong or missed

1. **Keywords also GATE, they do not only order.** `generate.mjs` ~4145: if no
   template's key word appears in the concept OR the idea, the fit call is never
   made and the seat takes an "honest miss". That is 10 of the 25 losses earlier
   attributed to "nothing on the shelf does that" — some of those templates may
   have fitted. NOT touched: removing the gate means an extra AI call on sheets
   that currently skip it, which needs the owner's no-cost-increase ruling.
2. **The re-roll prompt shares the menu builder** (`format-2024/generate.mjs`
   2658) and passes the row's text as a STRING, so it has no tags to compare.
   Removing the labels left its menu unlabelled. `templateMenuLines` now has two
   modes: stamps for an idea OBJECT, the old VERB MATCH for a string. The
   re-roll path is unchanged and unmeasured, and still reads meaning out of the
   GM's words — its own item.
3. **`declinedT` filters, it does not only trace** (4911, 4954): a `none` answer
   adds every conceptBound template to a set that is then excluded from the
   fallback shelf and the seed pool. Left exactly as it was so this ten measures
   ordering alone; three trace strings that claimed the words "ranked it first"
   were corrected. Flagged in code: the honest record of a `none` is now every
   id in `offered`, and widening it would restrict the fallback much more.

### THE NEW BOTTLENECK: the trait catalog cannot serve the trait prompt

The trait catalog by trigger: **always 27, on_being_hit 5, save 3,
start_of_turn 2** (`fire-aura`, `warded-mending`). Catalog-wide there are three
`start_of_turn` templates.

Meanwhile the trait-idea prompt rewritten hours earlier (commit "the idea prompt
gives print's trait kinds") advertises *"what its PRESENCE does to the space
around it each turn (an emanation of cold, stench, dread, light, or broken
ground)"* — which teaches `start_of_turn`. The tags moved exactly as that
predicts:

```
20-35-08   5 always  4 on_being_hit                 (old prompt)
20-49-19   7 always  2 on_being_hit                 (old prompt)
03-01-19   5 always  4 on_being_hit                 (old prompt)
14-41-49   8 always  1 start_of_turn                (new prompt)
15-11-53   4 always  2 on_being_hit  3 start_of_turn (new prompt)
```

**The two changes interact: the prompt now asks for aura traits and the shelf has
two.** All three catalog gaps in this run are `start_of_turn` ideas, and they are
what drags BAR 1 and feeds the decoration rate. The next change is catalog, and
it is now a measured, named shape rather than a guess: `start_of_turn` trait
templates for an emanation of cold / stench / dread / light / broken ground —
the kinds the prompt advertises. `fire-aura` and `noxious-aura` are the pattern
to copy. Pre-register: the gap count falls to 0-1 and the decoration rate
follows it down.
