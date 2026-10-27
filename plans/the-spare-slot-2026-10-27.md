# The spare slot: three templates, 1,248 rows, three different causes

**Trigger:** owner, 2026-10-27 — *"these rows are too common. what should we
do?"* — on Heated Body (500 shipped), Surprise Attack (443), Resonant Body
(299) across the saved runs.

**Status:** planned (Fable). Opus implements, in the order below — each step
is independent and measured on its own.

## The one-line version

They are common for three unrelated reasons, and none of them is the AI
choosing them on merit:

1. **Surprise Attack is forced in by a table.** 331 of its 366 shipped rows
   came from `SEAT_DEFAULT_TRAIT` — when a skulker's or lurker's trait seat
   misses, the engine renders it *blind*, no call. Its stated reason ("print's
   Assassin carries Assassinate") is false: the 2024 Assassin has no such
   feature (checked 2026-10-27 — Evasion, Multiattack, Shortsword, Light
   Crossbow, Cunning Action).
2. **Heated Body and Resonant Body are injected by a word list.** 379 of 500
   and 210 of 293 shipped rows had "bound to the concept's verb" — the keyword
   table matched a concept word and ADDED the template to the fit menu. Heated
   Body's list is 39 words: `heat, burn, … touch, furnace, fire, … brass, iron,
   … spines, thorns, … lightning, storm, … acid, frost, … plague, contagion`.
   Any elemental, metal, spiny or diseased body binds it. "iron" and "brass"
   bind BOTH templates. This is the word-list-decides-meaning that CLAUDE.md
   forbids, sitting on the hottest path in the engine.
3. **The idea call over-asks for hit-me-back traits.** On today's 113 stamped
   trait ideas, 18% fire `on_being_hit`. In print, 3 traits of 324 do (1%).
   That is the reactive bias the owner raised on 2026-10-26; the prompt was
   tweaked once and this is where it stands.

Today's stamped runs show step 2 already shrinking (the stamp ordering landed
this morning): the retaliation/aura family shipped on 18% of sheets; of the 5
rows whose idea wanted a DIFFERENT trigger, 4 were keyword-bound. Step 3 is now
the larger share: 15 of 20 family rows came from an idea that asked for one.

## Step 1 — stop forcing Surprise Attack (biggest, smallest)

`templates.mjs` ~1835:
```js
export const SEAT_DEFAULT_TRAIT = { phantom: [], skulker: ['assassinate', 'evasion'], trap: ['false-appearance'], warden: ['interpose'], lurker: ['assassinate'] };
```
- Remove `'assassinate'` from `skulker` and from `lurker`. Keep `evasion` on
  skulker — print's Assassin does carry it. `lurker` becomes `[]`.
- Correct the comment: the print claim is wrong, and a blind default is the
  engine choosing a mechanic ([[the-call-judges-the-engine-validates]]).
- A seat that misses now stays EMPTY rather than taking a blind row. That is
  the intended cost: a thinner skulker sheet beats 331 identical ones. The
  idea/fit path can still land `assassinate` when the call wants it (it is not
  gated — see `class-features-need-a-class.spec.js`).
- Replay: a skulker whose trait seat misses ships no `assassinate`; a skulker
  whose idea asks for an ambush still can. Check `classes.spec.js` — the owed-
  rogue test expects a Surprise Attack row for "stalks": that is the CLASS KIT
  path (`MECHANIC_OWED_TRAIT` / the kit), not the seat default — verify which
  before touching the test, and if it is the seat default, the test was
  pinning the defect.

## Step 2 — the keyword table may rank; it may not inject

`generate.mjs` ~4362:
```js
const candidates = [...menu, ...ideaNamed.filter(…), ...conceptBound.filter((t) => !menu.includes(t) && !ideaNamed.includes(t))];
```
- Drop the `conceptBound` spread. The pool is unchanged; `orderByStamps` orders
  it by what the idea declared; the call can still pick Heated Body when the
  idea wants a hit-me-back trait. What stops is a 39-word list putting it on
  the menu of a creature whose idea wanted an aura.
- Leave `keys`, `rankByVerb` and the verb GATE alone — one change per ten, and
  the gate already has the declared-warrant bypass from this morning.
- Keep the `signature bound to the concept's verb:` trace (it is useful
  evidence) but reword it: "…would have bound; stamps order the menu now".
- Replay: build the menu for a concept with "brass" in it whose idea stamps
  `always/damage`; assert `heated-body`/`resonant-body` are NOT on `candidates`
  unless the pool+stamps put them there. Use a real pool call
  ([[a-probe-must-be-fed-real-context]]).

## Step 3 — tell the idea call print's rate

The idea prompt (`buildIdeaPrompt`) is where 18% comes from. Prompt work, no
new call:
- State the fact plainly in the trait-seat instructions: *"In print, about 1
  trait in 100 fires when the creature is hit. Most traits are always-on
  (senses, movement, immunities, how it fights) or happen on its own turn.
  Do not default to 'when hit, it hurts the attacker' — choose it only when
  the concept is ABOUT the creature's surface."*
- Do not ban the trigger. A thorned hulk should still get one.
- Bar: on the next ten, `on_being_hit` trait ideas ≤ 8% (from 18%). Read it
  off the existing `menu ordered by the idea's stamps` line.

## Measure (before is in the numbers above)

Add `scripts/signature-measures/spare-slot.mjs`: per run, (a) share of sheets
shipping any of {heated-body, resonant-body, bloodied-burst, energy-aura,
noxious-aura, assassinate}; (b) `assassinate` rows granted by `seat default:`;
(c) family rows whose idea stamp was not `on_being_hit`/aura-compatible and
that were keyword-bound; (d) distribution of trait-idea triggers.

Bars on a ten after all three steps, each read against today's 22 runs:
- (a) family share of sheets: 18% → **≤ 10%**
- (b) seat-default Surprise Attack: **0**
- (c) keyword-bound wrong-trigger family rows: **0**
- (d) `on_being_hit` trait ideas: 18% → **≤ 8%**
- Regression: 10/10 generate; the ask-lands numbers do not fall; suite, build.

## What this does NOT do
- It does not delete or trim any `keys` list. The lists still rank and gate;
  removing them is its own plan and its own ten.
- It does not add a template-family cap. One exists already (declared cell,
  `settleSheetBudgets`); this plan removes the three things that feed it.
- It does not touch `bloodied-burst`, `energy-aura`, `noxious-aura` directly —
  they ride the same injection and the same idea bias, and the measurement
  counts them.

---

## RESULTS, 2026-10-27. Two causes gone; the slot is still monopolised.

All three steps landed. Suite 4,043 green, build clean. Measured with
`scripts/signature-measures/spare-slot.mjs` on the SAME batch before and after
(`save10` at 02-09-51 vs 06-04-04) — the plan's "before: 18%" came from 146
mixed sheets and was not a like-for-like comparison.

| bar | before | after | verdict |
|---|---|---|---|
| (b) blind seat default ships the ambush trait | 331 of its 366 rows | **0** | PASS |
| (c) keys inject a family row against the idea's own trigger | 4 of 5 | **0** | PASS |
| (d) `on_being_hit` trait ideas | 3 of 9 (33%) | 2 of 9 (22%) | NOT MET (bar ≤8%) |
| (a) sheets shipping a retaliation/aura row | 4 (40%) | **5 (50%)** | FAILED |

**(d) is one sheet of difference at n=9 — no evidence either way.** Metric
volatility on this measure is ±15 points at n≈18; a real read needs a forty or
several tens.

**Bar (a) was BADLY SPECIFIED and I wrote it.** It counts retaliation templates
and auras as one family. They are not the same answer: an aura IS what an
always-on damaging trait should be, so an aura landing on an `always`/
`start_of_turn` idea is correct, while a hit-me-back trait landing there is the
defect. Composition shows what actually happened:

```
before: resonant-body x3, energy-aura x1
after:  energy-aura x4,  resonant-body x1
```

The retaliation rows fell from 3 to 1. The AURA rows rose from 1 to 4. The
sameness did not go away — it moved to a template that is correctly offered.

**Why energy-aura now leads.** It reaches the menu legitimately: it declares
`start_of_turn/damage`, so `orderByStamps` puts it at tier 1 for any trait idea
that fires `always`/`start_of_turn` (the two are interchangeable for traits
since the aura re-tag of 2026-10-26, which fixed a starvation — this is that
fix's other edge). On two of the four sheets the idea wanted
`always/resource` and `always/movement` and the call still chose the aura from
a menu that offered `spider-climb`, `phobia`, `bloodied-fury`,
`aberrant-ground`. That is the CALL choosing, not an injection — allowed, and
not fixable by another gate.

### What the next plan has to be about

Not a cap, and not another gate. The always-on trait pool is **thin**: 10
candidates, most of them narrow (`undead-fortitude`, `truth-aura`, `bound`,
`relentless-pursuit`), so for a generic "its body does something all the time"
idea the aura is the only broadly-applicable answer. The cure is MORE
always-on trait shapes that are not auras — senses, terrain, how it fights,
what it ignores — which is the same conclusion as the composed-row work
(`plans/composed-candidates-on-the-menu-2026-10-26.md`) reached for actions.

Do NOT re-run this measurement on one ten and call it moved. Bars (a) and (d)
need a forty.

### Measurement caveat found while running this
`templatesFor` probed out-of-pipeline does NOT return `energy-aura` for
`trigger: 'start_of_turn'` (10 candidates, no aura) even though it is on the
live menu — the pool gate wants a body verdict that only the live idea call
supplies ([[a-probe-must-be-fed-real-context]]). Any pool probe for a
NEEDS_BODY template is unreliable without one.
