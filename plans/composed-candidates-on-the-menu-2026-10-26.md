# Composed candidates on the menu — no form, no second task

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. Supersedes the
"form" mechanism in `compose-the-row-body-reaction` and `compose-the-row-zone`;
keep those files for their grammars, bans and print evidence.

## The problem in one sentence

The fit call refuses the family form even when its own gap record describes the
form's payload nearly verbatim — five refusals in three runs, three in the last
ten alone (*"radiates an aura of killing cold. At the start of each of its turns,
creatures within…"* is the zone condition payload word for word) — because the
form is a second task, framed as a fallback, showing descriptions instead of
rules text, placed after three paragraphs that make refusal a productive act.

## Why this is the avenue before a dedicated call

From the call's side the prompt has two halves. The MENU is ~12 concrete rules
sentences with numbers and stamps — `- energy-aura [Traits] (fires:
start_of_turn, does: damage — matches the idea): At the end of each of the
creature's turns, each creature in a 5-foot Emanation… takes 13 (3d8)
{damage_type} damage.` Picking from it is the task the call does ~70% of the
time. The FORM is after the menu, labelled *"IF NONE FITS, FILL THIS FORM
INSTEAD"*, and for zone shows *descriptions* ("damage to everything close by…")
plus a line saying the engine will write the sentence later — a row the call
cannot see, through a task it was told to use after failing, with an explicit
exit ("a seat with no row is better than a row that is not the idea").

And for zone the payloads already ARE templates: the damage payload is
`energy-aura`'s frame. The only reason it is a "form" is that the body question
removed the template from the menu. We built a second mechanism to reach a row
that was one line away.

So: put the composed options ON THE MENU as ordinary lines. One task. Zero
extra calls. If the call still will not take a concrete, stamped, idea-matching
menu line its own gap record describes, the problem is the call and the
dedicated call is justified with a clean test behind it.

## The design (seams verified)

- `composedTemplate(pick)` already returns an object with every field
  `templateMenuLines` reads (`id, section, trigger, effect, gate, targets,
  flavor, frames`). It becomes a CANDIDATE FACTORY: for the idea's family (if
  it has a grammar for this seat), enumerate the payloads the sheet can carry
  and materialise one template per payload.
- Append them to `offered` (generate.mjs ~4230) BEFORE `orderByStamps` runs, so
  they sort by stamps like everything else. `parseFit` resolves the pick by
  `menu.find((m) => m.id === id)` (templates.mjs ~1920): a composed pick resolves
  to the synthesised template with no parser change.
- `templateMenuLines` renders them unchanged. Mark them honestly in the line
  the way gates are marked: the id carries `composed:` and the line reads the
  same as a template's. Do NOT label them "composed" in prose — that is the
  fallback framing again. They are candidates.
- Ids must be unique per payload: `composed:zone:damage`,
  `composed:body-reaction:touch+slow`. `composedTemplate` currently emits
  `composed:${family}` — extend it. `name` can stay a placeholder; the call's
  `name` field renames every pick anyway.
- A condition-bearing payload keeps its `{condition_minor}` SLOT, and the menu
  line advertises it the way `noxious-aura`'s already does ("— choose:
  {condition_minor} ∈ …"). For zone that is automatic (it is noxious-aura's
  frame, whose VOCAB line lists MINOR). For body-reaction the grammar's narrower
  list (Poisoned | Deafened) must be what the line advertises: either carry a
  per-template vocab override into `templateMenuLines`/`renderTemplate`, or
  emit one line per allowed condition (two lines). Pick the one that touches
  less; state which.
- Body-reaction enumerates 3 triggers × 4 consequences = 12. Too many. Pre-pick
  by the idea's own `effect` tag: show the consequences whose `effect` matches
  (damage → 1; condition → 1; movement → 2), across all three triggers — at
  most 6 lines, usually 3. The call still chooses; the stamps still order.
- Gates stay where they are, as CANDIDATE filters now: the seat gate (grammar
  section == idea section) decides whether to enumerate at all; the lane's
  line-move gate drops that payload on a sheet with no straight-line row; the
  seat check and lane check in the compose branch become dead and go.
- After the pick: `fit.template.composed` is truthy → the existing compose
  bookkeeping applies (receipt kept, `[composed: family]` on the gap record,
  the "row composed" trace, `imposes` declared, declared `fills` merged at
  render). The branch keyed on `fit.compose` is deleted. Walk the 11 sites that
  read `fit.template.id` (grep) and confirm a `composed:` id survives each —
  the ones that matter are `onSheet`/dedupe (a composed id is never on the sheet,
  correct), `declinedT` (fine), and any receipt check that looks the id up in
  `TEMPLATE_BY_ID` (it will miss; make it fall through to the template object
  in hand).

## Delete

- `composeFormLines` and the "IF NONE FITS, FILL THIS FORM" block.
- `parseFit`'s `compose` validation and the `"compose"` schema field.
- "THIS FORM IS THE REFUSAL PATH… Do not answer closest" and the schema's
  conditional removal of `closest`: restore `closest` everywhere. There is no
  form seat any more; the refusal path is the same on every seat.
- The `fit.compose` branch in `fitSeat`.
- `gateStandsDown`'s third arm ("the family has a form this seat can fill") —
  replace with: composed candidates are already in `pool`, so a stamp match on
  one of them stands the gate down through the first arm. Keep the test; change
  its expectation to assert the candidate is on the menu.

Keep `GRAMMARS` (payload lists, effect cells, conditions, bans, `requires`,
`frames_from`, the lane text), `composedTemplate`, `LANE_WIDTH`, `LINE_MOVE`,
the `t.imposes`/`t.fills` handling in `renderTemplate`, `IDEA_FAMILIES` and the
family tag (it is the measurement for phase 2 and it decides which family's
candidates to enumerate).

## The bans still hold — enforce them at ENUMERATION, not parse

`parseFit` no longer sees a form, so a banned pair cannot arrive; the factory
simply never materialises it (grapple + push-away; Prone anywhere; damage AND
condition on a zone). The specs that asserted parse-time refusal move to
asserting the candidate is absent from the enumeration.

## Replay (write first) — `composed-candidates.spec.js`

1. For a trait-seat `zone` idea tagged `start_of_turn/damage`, the candidates
   contain `composed:zone:damage` whose rendered text at CR 15 equals
   `energy-aura`'s; `orderByStamps` puts it in tier 1; the fit prompt contains
   its line with `(fires: start_of_turn, does: damage — matches the idea)` and
   contains NO "FILL THIS FORM".
2. For a trait-seat `body-reaction` idea tagged `on_being_hit/condition`, the
   candidates are the condition consequence × three triggers (3 lines), each
   with the narrow condition list advertised, none with Prone, Blinded or
   Frightened; the banned grapple+push pair is absent from an `effect:movement`
   enumeration.
3. `parseFit(json({template:'composed:zone:damage', name:'Killing Cold'}),
   offered)` resolves to the synthesised template; `fit.template.composed ===
   'zone'`.
4. An action-seat zone idea enumerates nothing (seat gate); a trait-seat zone
   idea on a sheet with no line move enumerates no lane.
5. `gateStandsDown` with a composed stamp match on the pool returns `down`
   through the stamps arm.
6. The prompt contains `"closest"` on every seat again.

## Canaries — `composed-canaries.json` — the three refusals from the last ten

1. "a glacier's heart given legs, radiating an aura of killing cold" (2024) —
   the verbatim-refused zone condition/damage idea; the composed line must be
   PICKED, not refused.
2. "a storm drake whose hide crackles with static that snaps at anything that
   strikes it" (2024) — the body-reaction damage idea refused last run.
3. "an archon wrapped in a humming shroud of biting flies" (2014) — the
   fly-swarm, refused twice; the 2014 printing must read "within 10 feet… takes
   N damage" / "is poisoned".

## Pre-registered pass/fail

- **BAR 1** composed candidates are PICKED on ≥ 2 of the 3 canaries (they were
  refused 0 of 3 as a form). 0 of 3 → the call is the limit and the dedicated
  call is the next change, with this evidence.
- **BAR 2** one `save10` ten: filler ratio (receipted/shipped) holds at ≥ 72%;
  composed picks counted and each read by hand beside its idea — a composed
  heat aura on a swordsman is a FAIL and means the family tag is not enough of a
  body judgement (then add `needs_body` per grammar).
- **BAR 3** composed lines do not cannibalise real templates: among composed
  picks, count how many had a NON-composed stamp-matching template on the same
  menu. Report the ratio; ≤ 1 in 3 is fine, higher means the composed line is
  winning on position/novelty and should sort after real templates within a
  tier (one-line change in `orderByStamps`: tier ties break real-before-composed).
- **BAR 4** no "verb gate" misses rise; the gate's stand-down count is reported.
- **BAR 5** suite green (4,001 now), build clean; 2014 canary reads correctly.
- HOLISTIC as always.

## Non-goals

No new families. No lane action form. No change to the idea prompt. No
dedicated call — that is what BAR 1 decides.

---

## LANDED 2026-10-26. BAR 1 PASSES: the call picks composed candidates off the menu.

Suite 4,004 green, build clean. Canaries = the three ideas the call had refused
as a FORM, verbatim.

| canary | as a form (before) | as a menu line (now) |
|---|---|---|
| static hide that snaps back (body-reaction) | refused | **PICKED** `composed:body-reaction:damage:t1` |
| fly shroud (zone condition, 2014) | refused twice | **PICKED** `composed:zone:condition:poisoned` |
| cold aura (zone) | refused | took `energy-aura`, the real template — correct |

**2 of 3 picked, and the third is the right answer, not a refusal.** The glacier's
body question now passes (the `energy-aura` rename), so a printed template was on
its menu and the call took it over the composed stand-in. That is the behaviour
we want: composed candidates fill a hole, they do not compete with print.

Shipped rows, read as a GM:
```
Crackling Hide. A creature that touches the fledgling or hits it with a melee
  attack while within 5 feet of it takes 7 (2d6) Lightning damage.      [2024]
Shroud of Flies. Any creature that starts its turn within 20 feet of the
  flywrapt archon must make a DC 17 Constitution saving throw. On a failed
  save, the target is poisoned until the end of its next turn...        [2014]
```
Both sound, both print-shaped, both the idea. The 2014 one is BAR 5: "within 20
feet", "is poisoned", no Emanation, no 2024 condition wording — and it carries
`imposes: "Poisoned"` as declared data.

**One defect found in the read, not fixed:** `Crackling Hide` carries
`imposes: undefined` — correct, it imposes nothing — but the 2024 composed row
did not record `imposes` where it should have (`Shroud of Flies` did). Check the
`t.imposes`/declared-fill path for an ASSEMBLED frame versus a COPIED one; the
assembled branch substitutes the condition into the text and may be losing the
declaration. No visible harm here because this candidate was the damage payload.

**What the form cost us, in hindsight:** five refusals across three runs on ideas
the form described, all because the options arrived as a second task framed as a
fallback. The same options, rendered as menu lines with their stamps and their
real rules text, are picked immediately. The mechanism was never the problem; the
framing was.

### A mistake worth recording
A deletion anchored on "from marker A to the next occurrence of marker B" removed
1,349 lines — `orderByStamps`, `stampAgrees`, `gateStandsDown` and most of the
module — because B was far away and `node --check` still passed. Recovered by
restoring from HEAD, re-extracting the two uncommitted pieces (the lane) out of
the saved damaged copy, and rewriting `gateStandsDown`, which existed in neither.
**Bound every deletion by the construct's own braces, never by the next
construct.** An hour lost; nothing lost permanently.
