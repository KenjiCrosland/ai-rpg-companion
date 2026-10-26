# When nothing fits, the AI fills the family's form — body-reaction first

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. This SUPERSEDES
`plans/tail-build-print-memorable-mechanics-2026-10-26.md`'s ordering (keep that
file for its print sources and non-goals; its five shapes move to a later phase).

## The owner's ruling (2026-10-26)

*"Let's try it. It will potentially be less sound, but if we loosen the
constraints to the sweet spot we might be ok."* And: **fold it into the fit
call; if the folded version is less than satisfactory it deserves its own call.**

## The problem in one sentence

When the fit call says no template fits, the engine ships the NEAREST template
anyway as unreceipted filler — 18–45% of signature rows across six same-batch
runs (mean ~28%) — and the AI's own "what is missing" records (122 across 100
sheets) are two-thirds VARIANTS of shapes we already have: same mechanic,
different trigger or payload. The biggest family is **body-reaction** — "something
happens to whoever hits, touches or grabs it" — 22 of 122, and `weapon-lodge`
was its landing pad in four of six runs.

## The design, in one paragraph

A template is a form with every blank pinned. A **family grammar** is the same
form with three blanks open, each a closed list. The AI never writes rules prose:
it picks list items, the engine assembles print's own sentence, and the result
rides `renderTemplate` → trait ceiling → checker → weld exactly as a template
does. Soundness lives where it lives today — in the skeleton, the closed lists,
the engine-owned numbers, and a short per-family ban list. "The sweet spot" is a
knob: how many blanks, how long each list. v1 is three blanks, short lists.

## Where it plugs in (the seams, verified)

- **Idea call** (`buildIdeaPrompt`, templates.mjs ~1477 return JSON; `parseIdeas`
  ~1532 normaliser): add `"family": "<one of …>"` to BOTH the action and trait
  objects. Enum = the ten family names below. Validate against the enum; when
  missing or invalid, derive a fallback from (section, trigger): trait +
  `on_being_hit` → `body-reaction`; else `null`. Trace the family on the
  `signature idea (…)` line so `scripts/signature-measures/idea-tags.mjs` can
  count families from the AI's own tag (that count decides phase 2).
- **Fit call** (`buildFitPrompt`, ~1551 onward; `parseFit` ~1662): when the
  idea's family has a grammar (v1: only `body-reaction`), append ONE block after
  WHY NONE FITS — *"IF NONE FITS, FILL THIS FORM INSTEAD"* — with the skeleton,
  the three lists, and the bans. The JSON gains
  `"compose": {"trigger": "<item>", "consequence": "<item>", "condition": "<item or \"\">"}`,
  to be answered ONLY with `"template": "none"`. `parseFit` validates every value
  by exact membership in the family's lists; any miss → `compose: null`.
- **The branch it replaces** (generate.mjs ~4275, `if (!fit.template && fit.closest)`):
  check `fit.compose` FIRST. If present and valid, synthesise a template object
  and set `fit = { ...fit, template: synth, composed: 'body-reaction', because: idea }`.
  Do NOT set `accepted_closest`; a composed row is not decoration — it carries
  the idea and takes `expresses`/`asked` from the same answer like any pick. Only
  if there is no valid `compose` does the existing closest/decoration logic run.
- **The synthesised template** must satisfy what `renderTemplate` reads off `t`
  (verified: `id, gate, frames, target_sizes, section, name, key, effect,
  duration_default, targets, kind`). Use `kind: 'seed'` so `frameOf` reads
  `t.text` (one assembled frame, no bands); `id: 'composed:body-reaction'`
  (matches no special-case `t.id` check); `section: 'trait'`; `trigger:
  'on_being_hit'`; `effect` from the consequence (damage / condition / movement);
  `flavor: []`; `keys: []`; `gate: null`; `nova: false`. Tokens in `text` are the
  same ones seeds use — copy the token set from an existing seed (`{dc}`,
  `{avg_half} ({dice_half})`, `{damage_type}`, `{condition_minor}`) so the
  existing fill code lands the numbers.
- **The gap record** (~4335): a composed row still pushes a record, tagged
  `[composed: body-reaction]` instead of `[VETOED…]`, so the list stays a
  countable list of what the catalog could not hold.
- **Trait ceiling** (~5019–5043) applies unchanged. **No pricing in v1**: every
  `valueCheck` call site is an action row (verified: 895, 4857, 4886, 4956, 4983,
  6470); traits are counted, not floored. That is why body-reaction goes first.
- **`FAMILY` already exists** in templates.mjs (~225) and means duplicate-pair
  groups for the retaliation cap (`punisher`, `light-mark`, `containment`). Do
  not reuse the name. Call the new map `GRAMMARS`.

## The body-reaction grammar (v1)

Skeleton — print's own (Black Pudding's Corrosive Form is the ONE reactive trait
in SRD 5.2; the 2014 idiom is Fire Elemental's Fire Form / Heated Body):

> `A creature that {trigger} {consequence}.`

`trigger` ∈
1. `hits the creature with a melee attack while within 5 feet of it`
2. `touches the creature or hits it with a melee attack while within 5 feet of it`
3. `grapples the creature or is grappled by it`

`consequence` ∈
1. `takes {avg_half} ({dice_half}) {damage_type} damage`
2. `has the {condition_minor} condition until the end of its next turn`
3. `has its Speed halved until the end of its next turn`
4. `is pushed up to 5 feet straight away from the creature`

`condition` (only with consequence 2) ∈ the existing `MINOR` list **minus Prone**
(owner, 2026-10-25: Prone is not worth a row): `Poisoned | Deafened | Frightened | Blinded`.

Bans (listed in the prompt AND enforced in `parseFit`):
- Prone anywhere (owner ruling).
- No counters, no "each time", no stacking, no reference to another row
  (`a-tracked-number-is-a-table-cost`). The skeleton has nowhere to put one;
  this ban exists so the AI does not try to smuggle it into `name`.
- trigger 3 + consequence 4 (a grappler cannot be pushed away by the thing it
  holds) — refuse the pair.
- v1 has no AREA consequence ("every creature within 5 feet") — single creature
  only. Phase 2 may add it with a price.

`{damage_type}` fills from the sheet's energy exactly as `heated-body` does; a
sheet with no energy gets Bludgeoning or Piercing by the existing `dtype` rule
(a splintering hulk is Piercing). The name comes from the fit's `name` field as
today (Title Case rule already in the prompt).

Overlap: "hits → damage" IS `heated-body`/`resonant-body`. The composer only runs
after the call refused the whole menu, so if it composes that exact pair the body
question refused the template but the AI still wants it. Allow it and trace
`composed duplicates a refused template:` so the count is visible.

## The family enum (all ten tagged; only one has a grammar in v1)

`body-reaction | zone | payoff | mark | sentinel | drag | heal | breach |
kill-growth | nova`. Define each in one line in the idea prompt. Families without
a grammar change nothing today; their tag is the measurement for phase 2.
(The 122-record clustering: body-reaction 22, zone 20, payoff 12, mark 10,
sentinel 8, drag 8, heal 5, breach 4, kill-growth 3, nova 5 [false gaps — the
sheet already had the breath], ~15 one-offs.)

## Replay (write first)

In a new `compose-body-reaction.spec.js`:
1. `parseFit` accepts `{template:'none', compose:{trigger:2, consequence:3}}` by
   exact item text, rejects an item not in the list, rejects Prone, rejects
   trigger 3 + consequence 4, and rejects `compose` alongside a real `template`.
2. The synthesised template renders through `renderTemplate` for the Scree Tide
   case (trait, CR 8, concept "a quarry-pit thing of living scree") and yields
   *"A creature that touches the scree tide or hits it with a melee attack while
   within 5 feet of it has its Speed halved until the end of its next turn."*
   (after the creature-name stamp). Assert the exact sentence.
3. Consequence 1 fills `{avg_half}` with the band's number and `{damage_type}`
   with the sheet's energy; with no energy, a physical type.
4. `parseIdeas` reads `family` from the enum; falls back to `body-reaction` for
   trait + `on_being_hit`; `null` otherwise.
5. The fit prompt contains the form ONLY when the idea's family is
   `body-reaction` (byte-check: a `zone` idea's prompt has no FILL THIS FORM).

## Pre-registered pass/fail

One `save10` ten after landing, plus the two Scree/Hulk-style canaries in
`scripts/smoke-batches/tail-canaries.json` (one in `rules: "2014"`):
- **BAR 1** composed rows appear: ≥ 2 of 10 sheets ship a `composed:body-reaction`
  trait (the family is ~18% of all gap records; at 10 sheets that is 1–3).
- **BAR 2** every composed row, read as a GM: sound, print-shaped, and IS the
  idea. List them all in the report with the idea beside each. 0 "fix" verdicts
  on composed rows. A single unsound composed row is a FAIL — this is the
  soundness experiment the owner agreed to.
- **BAR 3** filler rate (`idea-to-row-rate.mjs` decoration) falls from the ~28%
  mean; `weapon-lodge` as decoration: 0 in this run (it was the body-reaction
  landing pad).
- **BAR 4** nothing regresses: ideas reaching the sheet ≥ 70%; no checker
  failures on composed rows; suite green (3,959 now) and build clean.
- **BAR 5** the 2014 canary renders the composed trait in the flat `abilities`
  list with 2014 grammar ("is Poisoned" not "has the Poisoned condition") — read
  it by hand.
- **THE SPLIT DECISION (owner's ruling):** if composed rows are rare (BAR 1 fails
  while `signature miss` traces for body-reaction ideas remain), or the AI fills
  the form badly (BAR 2 fails on form-reading errors rather than design), the
  folded prompt is "less than satisfactory" and the composer becomes its own
  call. Report which, with the evidence; do not just switch.

## What this will NOT do

- Action-seat families (payoff, drag, nova…) need pricing through `valueCheck`
  and are phase 2 — after the trait family proves the mechanism.
- It does not touch the keyword GATE (generate.mjs ~4145): a composed row still
  needs the fit call to have run, which needs a key-word hit on the concept or
  the idea. Flagged three plans running; the owner's cost call.
- It does not add a body question for composed rows (the AI chose the trigger
  consciously at idea time; the trait ceiling bounds the count). If BAR 2 shows
  a body mismatch — a swordsman that "splinters" — add `needs_body` per family
  in phase 2.

## Phase 2 (not now; sequenced by the family tags this change starts counting)

zone (a `wake` placement: trailing its path; damage + slow together), payoff
(keyed on Bloodied/wounded; stacking is a counter — bounded or refused), mark,
sentinel, drag. Then the print-exact five from the superseded plan as pinned
forms. Each family: skeleton from print, three blanks, bans, a replay, a ten.
