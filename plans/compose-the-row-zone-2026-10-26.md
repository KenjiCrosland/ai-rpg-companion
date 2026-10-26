# The zone family's form — presence auras first, the trailing wake behind the critic

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. Read
`plans/compose-the-row-body-reaction-2026-10-26.md` first — this is the second
family on the same mechanism (`GRAMMARS`, `composedTemplate`, the form folded
into the fit call, the engine-side seat check) and reuses every seam it built.

## Why zone, and why now

`zone` is the family the AI tags most: 6 of 18 ideas in each of the last three
tens. Read every one (18 ideas) and sorted them by hand:

| kind | count | what shipped |
|---|---|---|
| a **presence** around it — furnace heat, dread, a shroud of flies, turbulent air | 6 | the damage one fit `fire-aura`; the condition ones all went to filler or a miss |
| a **trailing wake** — "the ground it walks over", "a scree apron behind it", "footsteps glaze the ground to ice" | 8 | filler, every one |
| misfiled (a shield-wall stance, a gale that shoves a line, a shoulder charge) | 4 | sentinel / drag / nova — not this family |

So the family is two shapes. One is print; one is not.

## What print says (SRD 5.2, measured)

- **An always-on aura is damage OR a condition, never both.** Fire Aura (Azer,
  Balor, Fire Elemental): end of its turns, N damage, no save. Stench (Ghast,
  Hezrou), Fear Aura (Pit Fiend), Vile Appearance (Sea Hag): start of the
  creature's turn in the area, a SAVE, a condition until the start of its next
  turn. Every damage-plus-condition emanation in the corpus (Horror Nimbus,
  Stunning Screech, Spores, the roars) is a Recharge or n/Day action. → The
  trait form offers damage or condition, and **bans the combination**.
- **A condition aura carries a saving throw**, so unlike body-reaction the
  condition list may include Frightened (Fear Aura is print) and Blinded (4 rows
  with a save). Prone stays out (owner, 2026-10-25). Poisoned, Frightened,
  Deafened, Blinded.
- **Sizes:** damage auras 5 ft at every CR (print's Fire Aura; the catalog's
  `fire-aura` frames already encode it with the retaliation ladder 5 (1d10) →
  16 (3d10)); condition auras 5/10/20 ft by band (`noxious-aura`'s frames);
  difficult-terrain auras 10 ft (`aberrant-ground`, Gibbering Mouther).
- **There is no trailing-hazard trait anywhere in print.** The only "wake" is
  Tunneler ("leaves a 10-foot-diameter tunnel in its wake") — a tunnel, no
  effect. The trailing placement is INVENTED.

## The two shapes

### Shape A — `zone`, placement AROUND. Print-exact. Ships first.

This is not new text: it is the three existing aura frames with their body
questions loosened and the payload chosen by the call. The ideas it serves
today land on filler because `noxious-aura` demands "a SMELL or a choking
cloud, not merely cold or dark" and `gaze-aura` demands "a face that is
horrifying to look at" — a dread presence, a shroud of flies, a storm's
turbulence have no template whose body question they pass.

Skeleton by payload (copy the catalog frames; do not retype them):
- damage → `fire-aura`'s frame: *"At the end of each of the creature's turns,
  each creature in a 5-foot Emanation originating from the creature takes
  {retal} {damage_type} damage."* — the ladder by band, as `composedTemplate`
  already does for body-reaction.
- condition → `noxious-aura`'s frame: *"{save_stat} Saving Throw: DC {dc}, any
  creature that starts its turn in a {size}-foot Emanation originating from the
  creature. Failure: The target has the {condition_minor} condition until the
  start of the creature's next turn. Success: The target is immune to this
  creature's aura for 24 hours."* — `{size}` 5/10/20 by band from that frame.
  Because the frame carries `{save_stat}` and `{condition_minor}`, the gate-3
  save contract and `saveStatsFor` run on it unchanged; the form need not ask
  for the stat.
- terrain → `aberrant-ground`'s frame: *"The ground in a 10-foot Emanation
  originating from the creature is Difficult Terrain."*

`GRAMMARS.zone`:
- `section: 'trait'`, `trigger_tag: 'start_of_turn'` (the aura fix made this
  and `always` interchangeable for traits).
- `payload` ∈ [damage, condition, terrain] — the three frames above.
- `condition` (payload 2 only) ∈ Poisoned | Frightened | Deafened | Blinded.
- `effect` by payload: damage / condition / movement.
- bans: no second payload ("damage AND a condition" — print gates that behind
  Recharge); no Prone; no "grows stronger"/"escalates" (a counter); one
  emanation, not a trailing one (Shape B).
- `imposes` declared on the synthesised template for the condition payload, as
  body-reaction does.
- `composedTemplate` needs one extension: a `{size}` fill by band for the
  condition frame. Read the band ladder off `noxious-aura.frames` at build time
  rather than hard-coding it, so the two cannot drift.

The body question is NOT asked for composed rows (same as body-reaction v1).
Risk: a swordsman with a "dread presence" composes a fear aura. The idea call
already judged the body when it tagged the family; measure it in BAR 2 before
adding a `needs_body` per family.

### Shape B — `zone`, placement TRAILING. Invented. Critic loop first.

The bigger half of the asks, and nothing in print. The owner's rule: a shape
need not be print, but it must work plausibly in the action economy. Proposed
sentence, modelled on the only print trait that describes a wake:

> *"The ground the creature moves across on its turn is Difficult Terrain until
> the start of its next turn."*  (terrain)
> *"…any creature that enters that ground or starts its turn there takes
> {retal} {damage_type} damage."*  (damage, appended)

Table cost, stated: the GM must hold the creature's path for one round. That is
a spatial memory, not a counter, and groups that use a grid already track
movement — but it IS more than an emanation asks, and `tally` was cut for less.
**Do not add this to `GRAMMARS` in this change.** Instead:
1. Render two sample statblocks with it by hand (the scree thing, the glacier).
2. Run the critic package read as a GM running it.
3. Only if the read is "ship" or "fix-lite", add it as a fourth payload option
   behind a `placement` slot in a follow-up, with its own canaries.

What this change DOES do for trailing ideas: offer Shape A. A "cold that pours
off it onto the ground it walks" can compose as a cold aura around it. BAR 3
counts how many trailing ideas accept the around-form versus refuse; that
number decides whether Shape B is worth inventing at all.

## Where it plugs in (all seams exist; nothing new in generate.mjs)

- `GRAMMARS` gains `zone` next to `body-reaction`.
- `composedTemplate` reads `g.frames_from` (template ids per payload) and copies
  the catalog frame per band, substituting `{retal}` from the ladder — a small
  generalisation of the body-reaction builder, not a second builder.
- `parseFit`'s compose validation already loops the grammar's lists; add the
  `payload` key the same way `trigger`/`consequence` are validated. Keep the
  bans table-driven.
- `composeFormLines` renders the zone form from the same fields.
- The seat gate (`g.section === idea.section`) already covers it: zone is a
  trait form; an action-seat zone idea (the gale) gets no form.

## Replay (write first) — `compose-zone.spec.js`

1. `parseFit` accepts each payload by exact text; rejects an invented payload;
   rejects Prone; rejects a condition on the damage or terrain payload; rejects
   two payloads.
2. `composedTemplate({family:'zone', payload: damage})` at CR 8 renders
   byte-equal to `renderTemplate(TEMPLATE_BY_ID.get('fire-aura'), ctx)` text —
   the point is that it IS that frame.
3. The condition payload at CR 3 / 8 / 15 renders 5 / 10 / 20-foot Emanations
   (read off `noxious-aura`'s frames, not asserted as literals twice).
4. The condition payload with Frightened renders a Wisdom save (the gate-3
   contract), with Poisoned a Constitution save, and `imposes` is declared on
   the rendered row.
5. The fit prompt carries the zone form only for a trait-seat zone idea.
6. The two-payload ban: `{payload: damage, condition: 'Poisoned'}` → null.

## Canaries — `scripts/smoke-batches/zone-canaries.json`

1. "a dread sovereign whose presence alone unmans the brave" (2024) — a fear
   AURA with no gaze and no stench: today it has no template; must compose
   Frightened with a Wisdom save.
2. "an archon wrapped in a humming shroud of biting flies" (2014) — Poisoned
   aura; the 2014 printing must read "within 10 feet of it … is poisoned".
3. "a glacier's heart given legs, trailing a wake of killing cold" (2024) — a
   TRAILING idea; records whether it accepts the around-form (cold aura) or
   refuses. Either is a pass for Shape A; the answer feeds Shape B's decision.

## Pre-registered pass/fail

One `save10` ten + the three canaries. Scripts in `scripts/signature-measures/`.
- **BAR 1** composed `zone` rows ≥ 2 across the ten (zone is ~33% of ideas; at
  the ~30% refusal rate that is 1–3) AND ≥ 2 of 3 canaries compose or fit.
- **BAR 2** every composed zone row, read as a GM beside its idea: sound,
  print-shaped, the right body. A fear aura on a creature with no presence to
  speak of, or an aura on a swordsman, is a FAIL and the signal to add a
  `needs_body` per family.
- **BAR 3** trailing ideas: count those that accepted the around-form vs
  refused. Report the ratio; no pass/fail — it is Shape B's input.
- **BAR 4** filler rate: the eight-run series is 45 23 27 18 29 29 31 41 / and
  then 10 on the last ten (1 of 10 rows). Zone is a third of ideas, so this is
  the first change that can move it. Target: ≤ 20% on this run AND the next.
- **BAR 5** ideas reaching the sheet: this metric swings ±15 on noise (nine-run
  series 61 72 83 58 78 78 89 94 56). Read the loss REASONS, not the number; a
  pass is "no loss traced to the zone form".
- **BAR 6** suite green (3,977 now), build clean, 2014 canary reads correctly.

## Non-goals

- No trailing placement in `GRAMMARS` (Shape B is a critic loop, then its own
  change). No damage+condition payload. No size the call chooses — the band
  does. No `needs_body` yet — measure first. No touching the keyword gate or
  the re-roll labels (three plans running).

---

## LANDED 2026-10-26, with a NEGATIVE result on the around-form. Read this before building more.

Suite 3,989 green, build clean. The mechanism generalised rather than duplicated:
each grammar now declares its own `slots`, and one validator, one builder, one
form-renderer and one JSON schema serve both families — a third family should
need no engine change. A payload that copies a catalog template's frames
(`frames_from`) brings its sizes and damage ladder with it, so no `{size}` fill
was needed. A copied condition frame KEEPS its `{condition_minor}` token (the
save contract binds the stat off it) and the call's choice travels as a declared
fill; substituting the word in silently cost the row its save stat, caught by a
test (Poisoned rendering a Wisdom save).

**The `fire-aura` -> `energy-aura` rename worked, and was the right call.** Before
it, the fly archon's menu did not hold the template at all (body question refused)
and the glacier declined it. After: `energy-aura` is on BOTH menus with the body
question passing (`body-refused: 0`). Reachability fixed.

**But the around-form still composed 0 of 3, and the reasons are substantive, not
structural.** The call is not dropping the task — it judged the form cannot carry
these ideas and said why in the gap list:

- **Trailing (canary 03), verbatim:** *"the wake left behind its path as it moves,
  **not an aura around it** — a zone trailing the creature's movement that
  damages…"* The call refused the around-form and named the exact distinction.
  **This is BAR 3 answered as decisively as it could be: a trailing idea does NOT
  accept an aura around the creature.**
- **Escalating (canary 02):** the idea is a swarm that harries anyone near it
  *"each moment… worn down simply by staying close"* — an aura that accumulates.
  The form offers a flat per-turn aura, and the escalation is exactly what the
  ban list forbids (it is a counter).
- Canary 01 was re-tagged `kill-growth` this run and shipped `gaze-aura`, so it
  did not test zone at all. Stochastic; re-run if 01 matters.

**What this means for the split decision.** The earlier body-reaction evidence
(the call naming a closest instead of filling the form) pointed at a dedicated
call. This run points the other way: with `closest` removed from the schema the
call fills nothing AND explains itself accurately in the gap record. It is
judging, not shirking. A dedicated call would get the same judgement. **Hold the
split.**

**What to build instead — the trailing shape, with the data now behind it.** 8 of
18 zone ideas are trailing, and the one tested refused the around-form by name.
Fable's Shape B goes to the critic loop next, exactly as sequenced. Its sentence
and its table cost (the GM holds the creature's path for one round) are in the
Shape B section above, unchanged.

**One thing the around-form still buys:** a *presence* idea with no escalation and
no trailing (the dread sovereign, a plain heat aura) now has a route where it had
none. Canary 01 drew a different family this run, so that half is UNMEASURED —
re-run the zone canaries before judging the around-form worthless.
