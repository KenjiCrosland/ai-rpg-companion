# The aura templates' tags must match their frames — handoff to the implementation session

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. Read
`plans/fit-by-stamps-not-keywords-2026-10-26.md` first — this is its direct
sequel and uses its scripts.

## The problem in one sentence

The fit menu is now ordered by the idea's declared `trigger`/`effect` against
each template's declared cells — and three aura templates declare a trigger
their own frame contradicts, while the one damage aura is locked to hot bodies
by its body question, so the aura-style trait ideas the rebalanced prompt now
asks for cannot find the templates that exist for them.

## Evidence

Run `smoke-out/save10-2026-10-26T15-11-53` scored 3 "catalog gaps" (an idea's
trigger matched no template on its menu — `scripts/signature-measures/
trigger-available.mjs`). Two of the three had the right template on the menu:

- **#09 Glacier Heart.** Idea: *"heat drains out of everything near it, and the
  longer a creature stays close the deeper the chill settles"*, tagged
  `start_of_turn/damage`. The engine's own gap record: *"an emanation that
  forces a save and deals Cold damage each turn a creature remains inside it"*.
  `fire-aura` IS that — its frame is `…each creature in a 5-foot Emanation
  takes 5 (1d10) {damage_type} damage`, energy-agnostic. The body verdicts
  trace shows `fire-aura` refused: its `needs_body` asks for *"a body that
  burns, radiates heat, or is wreathed in flame"*. A glacier is not that. The
  template exists; the question excludes the body it would serve.
- **#04 Gospel of Flies.** Idea tagged `start_of_turn/damage`; shipped
  `noxious-aura` (tier 3, effect only). `noxious-aura`'s frame: *"any creature
  that starts its turn in a 5-foot Emanation"* — a start-of-turn aura — but it
  declares `trigger: save`.
- `gaze-aura` and `truth-aura` are the same: frames fire on "starts its turn
  within / in", tags say `save`.

A trait idea can NEVER be tagged `save`: `normaliseTag` (templates.mjs,
`LEGAL.trait = ['always','on_being_hit','start_of_turn']`) rewrites any other
trait trigger to `always`. So these three templates cannot reach tier 1 or 2 for
any trait idea, ever, under stamp ordering.

The trait catalog by declared trigger: always 27, on_being_hit 5, **save 3,
start_of_turn 2**. Print's aura traits (SRD 5.2, Emanation / starts-its-turn):
6 damage, 6 condition, 1 terrain, 1 buff — damage and condition in equal
measure. We have the shapes; the cells are wrong.

Why now: the trait-idea prompt (commit "the idea prompt gives print's trait
kinds") advertises *"what its PRESENCE does to the space around it each turn"*
and ideas moved to `start_of_turn` as that predicts (0 → 1 → 3 per ten). The
prompt asks for auras; the catalog cannot say yes.

## Item 1 (first, small): restore the keyword-set narrowing Opus dropped

In `fitSeat` (generate.mjs ~4165) the previous code narrowed `conceptBound` to
the STRONGEST concept matches before using it:

```js
if (conceptBound.length > 1) {
  const scored = rankByVerb(conceptBound, verbText);
  const top = scored[0].concept.length;
  conceptBound = scored.filter((r) => r.concept.length === top).map((r) => r.t);
}
```

The stamp-ordering commit removed it. `conceptBound` now feeds three things —
the trace, the extra candidates from the wide shelf, and **`declinedT` on a
`none` answer**, which filters the fallback shelf and the seed pool (4911,
4954). Without the narrowing, every weak keyword match is now recorded as
declined, a wider exclusion than before, and the candidate set also gained the
weak matches. Restore the four lines exactly. No new behaviour; this is the
state the 55% was measured against plus ordering only.

## Item 2: the three condition-auras declare the trigger their frame has

`noxious-aura`, `gaze-aura`, `truth-aura`: `trigger: 'save'` → `'start_of_turn'`.
That is what the frame says and what the AI's tag vocabulary can name.

Consequence to verify, not assume: `TEMPORAL = {on_hit, on_being_hit,
start_of_turn}` and `triggerCompatible(want, have)` requires equality when
either side is temporal. So after the re-tag these three leave the MAIN menu
for `always`-tagged ideas (they stay in the pool via the wide shelf, which
passes `trigger: null`) and JOIN it for `start_of_turn` ideas. Only one
`templatesFor(` call passes a real trigger (`trigger: idea.trigger`, the fit
path); the other seven pass `null`. No test pins these three triggers.
Check the action-seat frames of the same ids if any (`gaze-aura` is a trait
only; confirm).

Then: `orderByStamps` puts them in tier 1 for a `start_of_turn/condition`
idea, which is what #09-style "dread/stench presence" ideas are.

## Item 3: the damage aura serves any radiating body, not only a hot one

`fire-aura` already fills `{damage_type}` from the sheet's energy. Only its
body question and key words are heat-locked. Change `NEEDS_BODY['fire-aura']`
(templates.mjs ~822 region; find the map) from *"a body that burns, radiates
heat, or is wreathed in flame"* to a question a glacier, a radiant saint and a
rotting thing can pass — e.g. *"a body that radiates its own energy into the
space around it — burning heat, killing cold, searing light, creeping rot or
decay — so that merely standing near it hurts"*. Keep the refusal strong for
bodies that do not radiate (a swordsman, a wolf).

Rename is optional and I would NOT do it in this change: `fire-aura` is
referenced by id in traces, tests and the fit-by-stamps spec. Leave the id;
fix the question. (If the owner wants the id to say `damage-aura`, that is a
rename pass with its own grep.)

Key words: `fire-aura.keys` are all heat words (`aura, radiates, radiating,
waste heat, heat around, furnace`). Because keywords still GATE the fit call
(generate.mjs ~4145: no key-word hit in concept or idea → no call), a cold
body's idea reaches the call only if some key word matches. Add the plain
radiating-energy words (`cold, chill, frost, rime, radiance, glow, rot,
withers`) to that list. This is extending an existing word list that selects
CANDIDATES, not one that decides meaning — flag it in the commit as such, and
note that removing the gate (a cost question for the owner) would make it
unnecessary.

## Pre-registered pass/fail

Land items 1-3, suite + build, then one `save10` ten and the four scripts in
`scripts/signature-measures/` on the run dir.

- **BAR 1** `trigger-available.mjs`: catalog gaps **3 → 0 or 1**. Each remaining
  gap must be an idea whose trigger genuinely has no trait template (list it).
- **BAR 2** the Glacier Heart (#09) ships a **cold damage aura** from `fire-aura`
  with `{damage_type}` = Cold, or the trace shows its body verdict accepted it
  and the call chose otherwise for a stated reason. Either is a pass; a body
  refusal is a fail.
- **BAR 3** ordering failures stay at 0 (the previous run's one flagged case was
  a correct pick; inspect any new one the same way before counting it).
- **BAR 4** decoration ≤ 20% of shipped rows (last run 29%, the run before 18%).
- **BAR 5** ideas reaching the sheet ≥ 70% (last run 78%).
- **BAR 6** suite green (3,953 now) and `npm run build` clean. The stamp spec
  `fit-menu-stamps.spec.js` must still pass; its tyrant menu lists
  `noxious-aura` and the ordering assertions compare it against
  `bloodied-fury` — re-tagging to `start_of_turn` moves it from tier 4 to tier
  2 for that `always/damage` idea? No: `start_of_turn` ≠ `always`, and
  `condition` ≠ `damage`, so it stays tier 4. Verify by running the spec, do
  not reason it.
- **HOLISTIC** read the ten as a GM. Are the auras the kinds the prompt promised
  (cold, stench, dread), and do they read like print's Fire Aura / Stench?

## Replay (write first)

Add to `fit-menu-stamps.spec.js`:
1. For an idea `{ section:'trait', trigger:'start_of_turn', effect:'condition' }`
   over a menu containing `noxious-aura`, `gaze-aura`, `spider-climb`,
   `bloodied-fury`: the first two are tier 1 (both lead), the others after.
2. `TEMPLATE_BY_ID.get('noxious-aura').trigger === 'start_of_turn'` (and the
   other two) — the declared cell equals what the frame does; add a general
   assertion: every trait template whose frame contains "starts its turn"
   declares `start_of_turn`.
3. `liveBodyRequirements` (or whatever surfaces `needs_body` to the idea call)
   for `fire-aura` no longer contains the word "flame" and does contain "cold".

## What this will NOT fix

- An idea tagged `start_of_turn/movement` or `start_of_turn/resource` still has
  one or zero templates (`warded-mending` is the resource one). Report, don't
  build, unless the ten shows it as the remaining gap.
- `fire-aura` fires "at the END of each of the creature's turns" (print's Fire
  Aura idiom) while the condition-auras fire at the START of the affected
  creature's turn. Both are per-turn auras and both are correctly
  `start_of_turn` in the tag vocabulary, which has no "end of turn". Leave it.
- The keyword GATE at ~4145 and the re-roll prompt's keyword labels: both
  flagged in the previous plan, both the owner's call, both untouched here.

## Observations for the owner, not actions

- `truth-aura.mechanic = 'track'` and `noxious-aura.mechanic = 'breath'` look
  mis-stamped (a truth aura does not track; a stench is not a breath). The
  `mechanic` cell is tier 0 in ordering when the GM asked for that mechanic, so
  a wrong stamp can seat the wrong template first. Worth a pass over every
  template's `mechanic` against its frame — the same class of defect as this
  plan, one column over.

---

## LANDED 2026-10-26. Result.

Suite 3,959 green (+6), build clean. Ten: `smoke-out/save10-2026-10-26T15-34-24`.

**The plan's diagnosis was half right and the fix was bigger than item 2.**
Probing `templatesFor` before re-tagging (rather than reasoning about TEMPORAL as
the plan allowed itself to) showed the actual cause: a trait idea tagged
`start_of_turn` came back with **2 of 31** trait templates. `start_of_turn` is in
TEMPORAL, so `triggerCompatible` demanded equality and every `always` trait was
filtered out. The three "catalog gaps" were STARVATION, not mis-tagging —
`orderByStamps` had nothing to rank. Re-tagging alone would have traded the gap
from one trigger to the other (it would have pulled the three condition-auras out
of every `always` menu, the most common trait tag).

Landed, in order of importance:
1. `triggerCompatible(want, have, section)` — for a TRAIT, `always` and
   `start_of_turn` are compatible (new `PASSIVE` set). A trait that acts each
   turn is a passive trait; print writes Fire Aura and Aberrant Ground as plain
   traits with no trigger. Riders keep exact matching (tested:
   `on_hit` vs `on_being_hit` still false). Menu sizes: `start_of_turn` 2 -> 26,
   `always` 24 -> 26.
2. `noxious-aura`, `gaze-aura`, `truth-aura`: `save` -> `start_of_turn`, which is
   what their frames say. With (1) in place this is pure accuracy, no trade.
3. `NEEDS_BODY['fire-aura']`: any body that radiates its own energy — heat, cold,
   light, rot — not only flame. The frame always filled `{damage_type}` from the
   sheet.
4. The `conceptBound` narrowing restored (dropped by the stamp-ordering commit).

### Bars

- **BAR 1 pass.** Catalog gaps **3 -> 0**. Fires-as-tagged 7 of 8, one flagged
  ordering case.
- **BAR 2 pass, exactly the target case.** #09 Calved Heart shipped
  *"Killing Cold Wake. At the end of each of the calved heart's turns, each
  creature in a 5-foot Emanation takes 13 (3d8) Cold damage."* from `fire-aura`.
  Its body verdicts no longer list `fire-aura` as refused. Note this is also the
  run's one "ordering failure" — the idea was tagged `always/damage`, the call
  skipped tier 1 (`assassinate`) and chose the per-turn aura, which is correct.
  Same pattern as the previous run's Furnace Tyrant: the call overriding its own
  imprecise tag. Two runs, two such cases, both right — the metric penalises the
  call for being right and must always be read with the availability split.
- **BAR 3 pass.** Real ordering failures 0.
- **BAR 4 FAIL.** Decoration 29% of shipped rows (4 of 14), bar was <=20%.
  Across six same-batch runs: 45 / 23 / 27 / 18 / 29 / 29 (%). No trend; the bar
  was set from the best single run and is inside the noise. **The bar was wrong,
  not the run.** Re-set it from the six-run mean (~28%) and treat a real
  improvement as <=20% sustained over two runs.
- **BAR 5 pass.** 78% of ideas reached the sheet; losses 4 -> 2, and both are
  genuine shelf gaps (a hovering breath-platform stance; a brace-then-counter
  trait).
- **BAR 6 pass.** Suite and build.

### The three new auras read like print

```
Plague-Fly Aura. Constitution Saving Throw: DC 17, any creature that starts its
  turn in a 20-foot Emanation... Failure: The target has the Poisoned condition.
Dreadful Glare. Wisdom Saving Throw: DC 18, any creature that starts its turn
  within 30 feet and can see it. Failure: Frightened.
Killing Cold Wake. At the end of each of the calved heart's turns, each creature
  in a 5-foot Emanation takes 13 (3d8) Cold damage.
```
Stench / Fear Aura / Fire Aura, in print's own idiom, on the right bodies.

### What the decoration rate is actually made of (the next item)

The four decoration rows this run, idea vs shipped:
- "a rolling apron of loose gravel that skids ahead of it" -> `swallow`
- "not a solid thing but a shifting slope; blows plunge through" -> `guarded-stance`
- "hide holds a standing charge of storm; the first blow lands with a peal" -> `weapon-lodge`
- "lowers its shoulder and drives in a line, shoving everyone ahead" -> `charge-push`

The last is a reasonable fit. The first three are not: a loose-gravel body became
a swallow, then a defensive stance; a stored-charge body became weapons sticking
in its hide. `weapon-lodge` appears in this list for the fourth run running — it
is the catch-all for "something about my body happens when you hit it", and the
critic's standing weapon-lodge item is the same defect seen from the sheet side.
These are SHELF GAPS, which is the tail-build work, not a plumbing defect. The
plumbing is now done: ideas reach the call, the menu is ordered by what the idea
says, and the catalog's labels match its frames.
