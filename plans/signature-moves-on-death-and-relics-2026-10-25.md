# Signature moves: the on-death family and the destructible relic

**Trigger for this plan:** work on the reskin catalog's *action templates*
(`src/tools/statblock-generator/reskin/shapes.mjs`, `library.mjs`,
`templates.mjs`). Read this before adding any new template family.

## Why this exists

The owner generated two Headless Horsemen. Both were mechanically sound — the
catalog built the whole charge→Prone→payoff chain (Saddle Saber knocks Prone on a
20-foot charge, Hoofbeat Massacre knocks Prone in a line, Merciless Strike only
targets the Prone) — and both were **missing the signature flourish**: a
decapitating blow that fires when the horseman drops a creature to 0 HP.

A survey confirmed this is a catalog gap, not a routing failure. 15 creature
concepts were sent to DeepSeek at temperature 1.0, asked for two signature
abilities each, with our taxonomy deliberately withheld so the answers could not
be biased into our own cells (`scratchpad/probe-signatures.mjs`). 30 abilities came
back. Classified against the catalog:

- **already covered:** terrain/zone creation (8 templates), the creature's own
  death (`death-burst`), escalation (`rampage`, `escalating-dread`), denying
  reactions (the Stunned/Incapacitated conditions already do this)
- **buildable gaps:** on a nearby creature's death; a destructible object that
  gates an ability; a building counter that pays off; a bounded second form at
  half HP; a simple forced choice; an end-of-turn trigger (17 print rows use
  "at the end of each of its turns"; we only have `start_of_turn`)
- **declined** — on the owner's bar of "works in the action economy and the
  ruleset", NOT on print precedent, which the owner ruled is not required:
  initiative *reordering* (no mid-combat re-sequencing exists in 5e; invalidates
  player planning; per-round bookkeeping) — note this is distinct from an extra
  action at initiative count 20, which is legendary-action grammar we already
  have and is a budget question; hidden simultaneous choice (no turn-structure
  support); taxing spell slots and Hit Dice (taxes casters only, players see
  nothing gained).
- **retracted:** summon/minions. The tool emits ONE statblock, so a summon row
  references stats it never produces. The only validatable grammar is "rises as a
  «named SRD creature»", which print uses **4 times total**. The claim that this
  was "the biggest hole" rested on reading a *correct* output as a miss — the fly
  archon answering "commands lesser swarms" with ally temp HP is the right answer
  for a single-statblock tool. Multi-creature fights are the encounter
  generator's job. The motivating concept (a hive-queen who "wears her dead
  daughters as armour") is served by the relic family below, not by summoning.

## IMPORTANT: no new trigger cell is needed

An earlier read of this concluded the 6-trigger enum (`always`, `on_being_hit`,
`on_hit`, `once_per_fight`, `save`, `start_of_turn`) had no cell for "on a kill"
and that therefore nothing could route there. **That was wrong.** `death-burst`
carries `trigger: 'always'` while its frame text reads "The creature explodes
**when it dies**." The trigger enum is a coarse ROUTING key; the actual firing
condition lives in the frame. Both families below follow that precedent and add
no trigger enum entry.

## What a new family MUST have, or it ships inert

Three times in one day a declaration did nothing because one of these was missed:

1. **A `MECHANIC` entry**, or the route call cannot name it and the template is
   unreachable. `MECHANIC` / `MECHANIC_OF` in `templates.mjs` and
   `ASKED_MECHANICS` in `route.mjs` **must stay the same list** —
   `__tests__/asked-mechanic.spec.js` asserts it.
2. **Carriage on BOTH catalog branches.** The seed branch and the shape branch of
   `renderTemplate` are separate; eight `needs_body` declarations were inert for a
   week because only one branch read them, and the seed branch read the library's
   `imposes` while ignoring `IMPOSES_BY_TEMPLATE`.
3. **A slot contract for every FLAVOR slot.** A slot must keep the promise its
   frame makes. `{wound_noun}` took the whole noun phrase while the frame went on
   to say "While wounded… The wound closes… stanch the wound", so any fill but
   the literal word produced nonsense. Put the requirement in `SLOT_CONTRACTS`
   where the model reads it, and validate with the `fillKeepsFrame` ladder.

Names already taken — do not collide. `FLAVOR_SLOTS`: phobia, restraint,
projectile, wound_phrase, zone_effect, zone_rule, disguise, shell, telegraph,
lure_source, hook, douse, terrain, sense_target, **anchor**, **ward**.
`ASKED_MECHANICS` (24): swallow gaze snare grapple shove charm fear dazzle charge
breath burst drain curse retaliate climb teleport zone disguise harden resist
escalate mend command track.

---

## Family 1 — the on-death family (mechanic: `harvest`)

Fires when THIS creature reduces another creature to 0 HP. Two shapes, because
one needs pricing and one does not.

### 1a. `kill-denial` — the victim cannot come back. PRICE: ZERO.

Print grammar (Mummy Lord and Mummy, `Rotting Fist`): *"A creature dies and turns
to dust if reduced to 0 Hit Points by this attack."* No combat value — it changes
nothing about the fight's math — so `valueCheck` prices it at 0 and it can ride
at any CR. This is the cheapest high-delight row in the survey and the right
first landing.

- cell: `trigger: 'always'`, `effect: 'condition'`, `replaces: 'trait'`
- frame (band-independent; the fiction is the only variable):
  `'A creature that this {creature} reduces to 0 Hit Points {kill_consequence}, and it can't be restored to life by any means short of a *Wish* spell.'`
- slot `kill_consequence` — FLAVOR. **Contract:** a predicate describing what
  happens to the body, no subject and no full stop, 2–6 words, and it must name a
  fate rather than damage — "loses its head to the saber", "crumbles to dust",
  "is absorbed into the mouther". Validate via `fillKeepsFrame`: reject a fill
  containing a die expression or the word "damage".
- `NEEDS_BODY`: ask whether this creature can destroy a body at all — a creature
  made of light or sound that kills by terror plausibly leaves the body intact.
  Phrase the question in plain words, never a pattern.

### 1b. `kill-harvest` — the creature gains something. NEEDS PRICING.

Print grammar: Aboleth `Consume Memories` (*"gains the target's memories"*),
Vampire `Bite` (the victim *"rises the following sunset as a Vampire Spawn under
the vampire's control"*), Gibbering Mouther `Bite` (body absorbed).

- cell: `trigger: 'always'`, `effect: 'resource'`, `replaces: 'trait'`
- frame, by band, with the gain scaled off the card:
  `'When this {creature} reduces a creature to 0 Hit Points, {harvest_gain} the {creature} gains {avg_half} ({dice_half}) Temporary Hit Points.'`
- **Pricing rule to add to `valueCheck`:** a kill is a rare event, so this is NOT
  a per-round resource. Price it as a **once-per-fight** gain (the `rampage` /
  `once_per_fight` precedent), not as sustained value. If it cannot be priced
  that way, land 1a only — 1a alone answers the Horseman case.
- slot `harvest_gain` — FLAVOR, a short clause naming the fiction of the taking.

---

## Family 2 — the destructible relic (mechanic: `relic`)

A named object, carried or worn, that GATES one of the creature's abilities.
Players can attack the object instead of the creature — the fight gets an
objective rather than a second health bar. This is the mechanic the survey
reached for most often in runnable form (Soul Lamp, Rigged High Striker,
Daughterplate Armor, and the Horseman's own head).

### Print's ladder, measured — all three objects in the corpus

| object | creature CR | AC | HP | protection |
|---|---|---|---|---|
| Night Hag / Soul Bag | 5 | 15 | 20 | Resistance to all damage |
| Erinyes / Magic Rope | 12 | 20 | 90 | Immunity to Poison and Psychic |
| Mummy Lord / Heart | 15 | 17 | 10 | **Immunity to all damage except Fire** |

Three points is thin and they serve different purposes, so do NOT over-fit a
curve. The **Mummy Lord's heart is the model to copy**: low HP with a damage-type
key. The puzzle ("what hurts it?") is the point, not the HP total. Proposed:
`AC = the creature's own AC - 2`, `HP = 10 + 5 per CR band` capped at 40, and a
mandatory `except {relic_weakness}` clause. State in the comment that the ladder
is authored from three print points, not derived.

- cell: `trigger: 'always'`, `effect: 'defense'`, `replaces: 'trait'`
- frame:
  `'The {creature} carries {relic_name}. While it is intact, the {creature} can use its {gated_row} action. {relic_name} is a Tiny object that has AC {relic_ac}, HP {relic_hp}, and Immunity to all damage except {relic_weakness}.'`
- `{relic_ac}` / `{relic_hp}` are **ENGINE** slots — never the model's, same rule
  as `dc` and `damage_type`.
- `{relic_weakness}` is VOCAB — a closed enum from the damage types.
- `{relic_name}` is FLAVOR. **Contract:** a noun phrase with its article, 2–4
  words, and it must be a THING that could be carried or worn, not an effect —
  "its severed head", "the soul bag", "a daughter's carapace".
- `{gated_row}` is an **ENGINE** slot: it must name a row that actually exists on
  the finished sheet. **This is the hard part.** A relic gating a row that was
  cut, renamed, or never landed is a dangling citation — the exact bug class the
  Multiattack citation sweep and the rename-rewrites-its-citations pass already
  handle (`generate.mjs`, "A RENAME REWRITES ITS CITATIONS"). Land the relic row
  LAST, after the sheet's rows are final, and bind `{gated_row}` to a row that is
  present; if no suitable row exists, the template declines.

## Tests to write with it

- the two enums are the same list after adding `harvest` and `relic`; every
  template still carries a mechanic stamp (extend `asked-mechanic.spec.js`)
- every new frame's slots are all in `FLAVOR_SLOTS`/VOCAB/engine, none left over
- `kill-denial` renders at every CR band with no slot unfilled
- a `kill_consequence` fill containing a die expression falls to the blind default
- the relic's `{gated_row}` names a row present in the same `sections` object —
  assert on a built sheet, not on the template
- `valueCheck` prices `kill-denial` at 0 and does not change the sheet's budget

## Order

1. `kill-denial` — zero pricing, answers the Horseman, highest delight per unit
   of machinery.
2. `relic` — needs the last-row binding, so it is the one with real integration
   risk.
3. `kill-harvest` — only if the once-per-fight pricing holds.

Measure each with a focused ten before the next, per the owner's cadence, and
judge the blocks holistically (playability, fun, soundness, originality) rather
than by the metric just changed.

---

# AUDIT CORRECTION (2026-10-25, later) — read this before building anything else

The "buildable gaps" list above was **inflated**, and three separate times a gap
claim was wrong for the SAME reason: I checked the trigger ENUM instead of
searching FRAME TEXT. The firing condition lives in the frame — `death-burst`
says "when it dies" on the `always` cell, `fire-aura` says "at the end of each of
its turns". Audit with `/tmp/audit.mjs`-style frame search, never by enum.

Claims that turned out to be FALSE:
- "no cell for on-kill, nothing could route there" — `death-burst` precedent.
- "end-of-turn is a gap, 17 print rows" — `fire-aura` has it (cite: Azer/Fire
  Aura). And the 17 was a miscount: most of those rows are the TARGET repeating a
  save, not a creature end-of-turn trigger. Real count ~1 (Hydra).
- "forced choice has print grammar" — **0 rows** in the corpus. It is plausible
  under the owner's bar ("works in the action economy and ruleset"), but it is
  NOT print-backed; mark it `invented: true`.
- "summons: we have nothing" — `summon-lite` exists in library.mjs. The minions
  retraction still stands, but on the one-statblock ground only.
- My own audit regex produced a FALSE POSITIVE: `sealed-body` matched
  /shape-shifts?/ on the NEGATION "can't shape-shift". A second form IS a gap.

## The verified list, after the audit and the owner's action-economy filter

LANDED: `kill-denial` (on-kill denial, prices at 0), `relic-object` (a Tiny
object with AC/HP whose destruction takes the regeneration with it; authored
ladder AC 13-17 / HP 5-25, `supersedes` warded-mending's regen line so they
cannot stack).

STILL TO BUILD:
1. **a counter that builds** — 0 print rows; `escalating-dread`/`wind-up` are the
   nearest and do not actually count anything. This is where the survey's Time
   Debt / Luck Tokens / three-notch clock land in a runnable form.
2. **a forced choice** — "take the damage or drop what you are holding". Zero
   bookkeeping, no print grammar, mark invented.
3. **a bounded second form at half HP** — nothing has it. Bounded means: gain a
   movement mode, change a damage type, grow a size. NOT an open rewrite.
4. **`kill-harvest`** — the boon half of on-death. Needs the once-per-fight
   pricing rule in valueCheck; land it only if that holds.

DECLINED on the owner's bar, not on precedent: initiative REORDERING (no 5e
mid-combat re-sequencing; per-round bookkeeping), hidden simultaneous choice,
taxing spell slots and Hit Dice. An extra action at initiative count 20 is
legendary-action grammar we already have and is a BUDGET question, not a new
mechanic.

## A FOURTH way a declaration ships inert

The plan listed three. There is a fourth, and it cost a cycle: a shape with no
`SHAPE_TAGS[id]` entry is **silently dropped** by
`SHAPES.filter((s) => SECTION_BY_REPLACES[s.replaces] && SHAPE_TAGS[s.id])`.
The template never exists and its NEEDS_BODY entry points at nothing.

Two more things a new shape must do, both found by failing tests:
- `roles` may only contain the six in `ROLES`. `'caster'` is an ARCHETYPE, not a
  shape role — this slip happened on both new templates.
- an `invented: true` shape must be added to the **invention ledger** in
  `__tests__/shapes.spec.js`, which asserts the exact sorted list.
- a template with no key words must be named in `KEYLESS_BY_DESIGN` in
  `__tests__/templates.spec.js`. Deliberate friction: mechanic-routed templates
  are a choice, so they are visible in review.

## And the finding that reframes all of it

The owner's bar is NOT how often a template fires — it is that the menu is
expanded so the shape is AVAILABLE when apt and absent otherwise. Measured over
two tens: `kill-denial` fired on 1 of 10, on the one concept that named the
effect outright, with **0 false positives in 20 observations**. That is correct
behaviour, not a miss.

Measured, so it does not need re-deriving: prompt bloat is NOT the limiter. The
route call asks 18 questions in ~2,800 tokens; asking the mechanic question ALONE
scored 0/5 against 1/5 inside the full prompt. The limiter is that one enum slot
returns the PRIMARY mechanic, so a secondary flourish always loses — which is the
owner's original `compound_parts: [A, B]` idea, closed too early.

Coverage of what the model invents is the metric that matters: of 30 surveyed
signature abilities put through the real fit call against a wide menu, the early
sample ran about 1 in 9 finding any template at all.

---

# PRINT SURVEY (2026-10-25) — synergy and distinct mechanics, 329 SRD monsters

Measured, so it does not need re-deriving. Classifier is regex over frame text
(`/tmp/survey2.mjs` shape); four of its first-pass rows were wrong and are fixed
here: Recharge is a GATE field a frame scan cannot see (29 of our templates carry
it); "bargain/choice: 32" was 100% Legendary Resistance; charge is phrased "moved
20+ feet straight toward" in 2024; touch-retaliation is a 2014 idiom (SRD 5.2: 1
row) replaced by end-of-turn Emanations (5 rows) — we carry both (`heated-body`,
`fire-aura`) and ship the retired one 13% of the time.

**Interlock is rare in print:** 1.5% strict (Aboleth, Ettercap, Gorgon, Elephant,
Mammoth), 4.6% widened. Our forty: 5%. We are AT print on interlock; the owner
does not want it over-represented, and print agrees. Leave it.

**Memorability is one vivid mechanic, not many.** Stirge, Darkmantle, Rust
Monster, Roper, Troll, Shield Guardian, Black Pudding all score ONE class — a rare
one. Multi-class leaders (Vampire 6, Aboleth, Kraken, Night Hag, Wraith) are the
exception. ~26% of print is genuinely plain, and that is an overestimate.

**We built the body of print's distribution and skipped the tail** — the plateau
is a distribution-SHAPE problem, not a count problem:
- over: prone 43% vs 16%, charge 13% vs 5%, terrain 6x, swallow 4x, regen-with-
  off-switch 12x, bloodied 16x, touch-retaliation 13% vs ~0
- absent (print uses, catalog has NOTHING): second form 4% (14), possession 3%
  (9), attach/latch 1% (Stirge, Darkmantle), gear destruction 1% (Rust Monster),
  spawn/raise, multiple heads
- blind spots the classifier missed until checked: gear destruction, reel/pull
  (we HAVE reel: `reel`, `hook-drag`, `bolt-drag`, `obstacle-pull`)

## The soundness guard — the owner's ruling, final

NOT "cite a print row". Print is the cheapest EVIDENCE of soundness, not a
requirement. A new shape ships when it:
1. works in the action economy and ruleset;
2. prices through `rowValue` before it ships — and NOTE: conditional trait
   damage prices at 0 (`death-burst`, `bloodied-burst` both ev=0), so a trait
   payoff is invisible to the budget and must be BOUNDED by design (once per
   fight, `{avg_half}`), not by the pricer;
3. runs at a table with no new bookkeeping system — at most one visible number
   or one object.
Rule 3 is what excludes the survey's unsound inventions (initiative reorder,
hidden simultaneous choice, spell-slot tax, token economies). `invented: true`
and the invention ledger in `shapes.spec.js` are the honest label.

## Build order, revised twice and now settled

LANDED: `kill-denial`, `relic-object`, `tally` (the counter — invented, 5 of the
30 survey refusals collapse into it; climbs at the start of its own turn because
an on-kill build does not fill in party combat; pays off once at `{avg_half}` +
one-turn Frightened, NOT Prone).
NEXT, in print's frequency order, each with a price and a ten:
second form (bounded) -> possession/control -> attach/latch -> gear destruction
-> `kill-harvest` (once-per-fight pricing) -> destroyable charges (tally x relic).

---

# THE SMOKE CAPTURED THE WRONG BLOCK ON SAME-NAME RERUNS (found 2026-10-25, fixed)

`scripts/smoke-statblock.mjs` picked the generated monster as the FIRST
localStorage entry whose serialization was not there before the run. A run that
re-serializes an OLDER same-name entry (the 2014/2024 `other_edition` write does)
makes that old sheet "fresh" too, and it sits earlier in the array — so run #2
captured run #1's block. Proof: tally6 #01/#02 had DIFFERENT traces and
byte-identical blocks; horseman4's 2014 block hashed identical to its 2024 one,
which is impossible from its own run. Fixed to the LAST fresh entry (the app
appends: `statblock-storage.mjs:30`, `StatblockGenerator.vue:1763`).

INVALIDATED by this: every "same input twice -> identical" reading before the fix
(horseman4 x4, tally6 #02). They were one sheet re-read, not zero variance. The
critic package builder (`scripts/critic-package.mjs`) now refuses byte-identical
blocks, which is how this surfaced.

# tally six — result and the escalate fold

- `tally` was never NAMED by the route: both explicit build-up asks ("winds
  tighter every round", "grows more dangerous the longer the fight goes") went
  to `escalate`, the pre-existing word, and the stamp led its family (wind-up,
  rampage, deepening-cold). `tally` is now a MEMBER of `escalate`, not its own
  enum word — a synonym listed after the established word is never chosen.
- It still landed on the idiom case (#04 bell-ghost, "Building Toll ... gains a
  mark as the bell tolls once more") off the menu, fill in the model's words,
  Title Case; and correctly stayed off the mundane sellsword.
- Top pattern, 2 of 5: TWO ROWS OF ONE FAMILY on a sheet (#04 tally + wind-up;
  #06 Riposte + Answering Sting). Same gap as the forty's 4 of 40. The family
  cap is the next soundness fix, ahead of any new template.
- The Horseman (#01) is charger + trait again: Ride-By, Headsman's Blade charge
  rider, Trampling Charge, Mounted Agility, Rampage. Sound; samey; no head
  mechanic. "takes their heads" still has no shape that fits a party fight —
  an on-kill build does not fill. The honest answer for the Horseman is
  `kill-harvest` with once-per-fight pricing, or accepting that the head is a
  `relic-object` (the thing he carries that the party can take).

## CORRECTION to the capture bug above (same day, later)

The localStorage selection was NOT the fault — the JSONs always differed. The .md
block is `allInnerTexts()` of the ACTIVE card on screen, and the tool sorts a
folder by CR, so two same-name same-CR sheets leave run #1's card active and run
#2's .md shows run #1's block. The "last fresh" change is harmless and stays; the
real fix is deferred: the smoke should CLICK the fresh monster in the saved list
before capturing. Until then **the .md block is unreliable on same-name reruns;
the JSON is the source of truth**, and `scripts/critic-package.mjs` now renders
from JSON (both saved shapes) instead of copying the .md block.

## Four real Headless Horsemen, same input — the plateau measured

Row SETS differ every run; the SHAPES do not. Across four runs the signature drew
from: charge rider, trample line (Trampling Charge / Ride-Down / Headlong Ride),
rampage (Rampage / Severing Stroke), relentless-pursuit, condition-payoff
(Harvested Trophy = Merciless Strike), and `tally` once (Mounting Tally — with the
BLIND fill "as its fury mounts", so the slot contract did not reach the model).
Head mechanic: 0 of 4. The rename layer produces real name variance over low
shape variance — this is what the owner means by "samey", and it is invisible on
any single sheet. Measure it as DISTINCT SHAPES PER N SAME-INPUT RUNS, not as
name variety.

---

# THE CRITIC'S TABLE READ (2026-10-25) and the fix order

Memorable 0, sound 5, broken 2 (Horseman tally6#02, Glacier's Heart). Both
broken calls VERIFIED against the saved JSON before acting:

- **Saber, two charge riders on one trigger.** The first is the donor's own print
  rider; the second is `charge-push`, welded because a head-taking idea was
  accepted as "closest offered". The weld (`generate.mjs`, the `if (host)` block
  near the `host.text = ... riderText` line) deduped by template ID only, and the
  donor's rider has no ID. The push strands the host's own remaining attacks.
- **Deepening Cold, unadjudicable.** `authored: true, model: None`. "increases
  each time it applies" names no amount; "resets when it regains Hit Points"
  beside Regeneration 15/turn resets every turn. `parseAuthorResponse` has a
  quantified-heal rule (critic A8) and NO rule that an escalation names its
  amount. The audit flagged it; the rewrite loop touches only `entry.model`
  rows, so an authored row has NO correction path. Second instance of a finding
  that does not gate (the first: the orphaned Cursed Sinkhole).
- **Wind-up erupts at the wrong end.** Action spent, erupts "at the start of its
  next turn", 15 ft; players step out. print: 0 rows erupt at the start of its
  next turn, 4 at the END — the critic's fix is print's grammar.
- **Tally pays off on the wrong row.** Payoff must be the signature row (marks
  feed the nova), not a +2d10 rider. Agreed; the once-per-fight bound survives.

The owner's ruling: fixes 1-4 yes; "5" (a steed trait / Large) NO — the Horseman
is one input among many, and the goal is that a SHORT, MECHANIC-FREE concept comes
back with a surprise. Do not patch one creature.

## Fix 1 — one rider per trigger — LANDED, measured by rider10

(a) At the weld: the rider's opening clause (to its first comma) is its trigger;
if the host already carries that exact clause the rider is refused, the slot
leaves, the seat looks elsewhere. Engine sentence vs engine sentence — a fact
about strings, no meaning inferred. NOT caught: the same effect in other words
(the family cap owns that).
(b) In the fit prompt, one line: a rider that moves the target out of reach does
not belong on a row the Multiattack repeats. Judgement stays with the call, which
can read reach and attack count.
NOT built: a declared attack-count check. None is declared (`multiattack: null`
on the scaled sheet; the count lives only in the Multiattack sentence) and the
owner rightly rejected reading "pushed away" off the text as meaning-by-word-list.

A near-miss worth keeping: the first cut used `return` inside the weld — which sits
in generateReskin's MAIN body — so a duplicate would have exited generation with
no sheet. The suite passed because nothing in it welds a duplicate. Restructured
as `if (host && !dupTrig) {...} else if (dupTrig) {refuse}`; the original slot-drop
at the `wcDropped = true` site FALLS THROUGH and so does this.

Detector (`/tmp/duptrig.mjs` shape): proven to report 1 on tally6 #02 before being
pointed at the new run; its first cut reported 0 on that sheet because the clause
regex capped at 60 chars. Baselines: same-trigger-twice 1 of 46 sheets;
push-on-a-repeated-row 2 of 46 (tally6 Saber, the forty's Ram-Timber Golem).

## Next, in order (each with a ten)
2. `parseAuthorResponse`: an escalating effect must name its amount — beside
   `healOk`, same shape. Consider marking authored rows `model: true` so the
   audit MAY rewrite them (their effect text is the model's).
3. wind-up: erupt at the END of its next turn, after movement (library text).
4. tally: marks feed the sheet's nova; once-per-fight bound kept.

## Fix 1 — what the ten showed, and two defects the ten could NOT show

rider10: 0 same-trigger-twice rows, 0 push-on-a-repeated-row, 0 refusals fired
(the duplicate is 1 run in 4 on the Horseman — stochastic), signature 7 library /
3 dropped (two pre-existing causes: a floor-dropped seed, "no template held the
idea" on the ooze), title case 0 of 10, no throws. Holistic ~5 ship / 4 fix-lite.
relic-object landed on BOTH Horsemen — #02 with the model's own fill, "the fresh
severed head ... a Tiny object that has AC 17, HP 20": the closest any run has
come to the owner's north star (a short concept, a surprise the party can act on).

Both defects below were caught by a DETERMINISTIC REPLAY of the guard's predicate
against the known-bad Saber (`/tmp/guardproof.mjs` shape), NOT by the ten. When a
guard's trigger is rare, replay the known-bad case; a clean ten proves nothing.
1. The first cut used `return` inside the weld, which sits in generateReskin's
   MAIN body — a duplicate would have exited generation with no sheet. The suite
   passed because nothing in it welds a duplicate. The original slot-drop at
   `wcDropped = true` FALLS THROUGH; so does the fix now (`if (host && !dupTrig)
   {...} else if (dupTrig) {refuse}`).
2. The second cut could NEVER fire: at weld time the rider still reads "If the
   creature moved" (the self-reference token) while the host's donor text was
   already rewritten to "If the horseman moved". The guard now substitutes the
   same `inline` the later rewrite uses before comparing — compare what WILL
   print. Replay: "GUARD WOULD REFUSE the known-bad weld".

## Fix 4 — design (not built): tally re-gates the sheet's nova

Gates are a RECORDED field (`gateOf = (e) => e?.gate ?? gateFromName(e)`), and
valueCheck prices any recorded gate as `gated` (floor 1.3x maEV, ceiling 2.5x) —
so a new gate value is legal and priced without touching the pricer. Design:
when `tally` lands on a sheet that already carries a gated save nova (found by
`novaRows`, i.e. the recorded gate + a Saving Throw, never text), the nova's
`gate` becomes `'3 Marks'` (name suffix follows from `(${gate})`), its Recharge
leaves, and tally's text reads "it gains a mark ... When it has 3 marks it can
use <nova> and the marks are spent" — the fuse ends in the big move, as the
critic asked, and the once-per-fight bound survives because 3 marks take 3
rounds. If the sheet has no gated nova, tally DECLINES (the relic's gated_row
rule). Bind by `rowByName` on the nova's bare name, set at land time, after the
sheet's rows are final.
