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

## Fix 2 — an authored escalation names its amount — LANDED; measured by escalate10

`escalationOk` beside `healOk` in parseAuthorResponse: an effect whose bonus grows
"each/every time" must carry {dmg} and a ceiling, else the trait is refused and
its clause folds to description. Same class as healOk — validates the model's
own answer, infers nothing about the GM's words. Spec: `__tests__/escalation.spec.js`.

escalate10: 0 unadjudicable escalations (detector proven to flag Deepening Cold on
tally6 #05 first; forty baseline 0 of 40), title case 0 of 10, no throws, signature
8 library / 2 dropped (mundane, exact — both correct). Holistic ~4 ship / 5
fix-lite / 0 fix: SOUND and DULL.

The finding that matters: every "ramp" on the three asking sheets was the SAME
template — `bloodied-fury`, "While Bloodied, Advantage on attack rolls" — renamed
Rising Core / Widening Fury / Furnace Fury. The `escalate` family's blandest
member is over-selected 3 of 4. And 0 authored escalations landed anywhere.

Refusals were SILENT: a refused trait folded into `unplaced` with no trace, so a
sheet that lost its ramp to escalationOk and a sheet whose call never wrote one
looked identical ([[a-private-copy-hides-the-fix]]: a decline must trace WHY).
parseAuthorResponse now returns `refused: [{name, why}]` and the one call site
(the repair path, generate.mjs ~5160 — the only reader; `rep.traits` feed
landAuthored) traces each. escalate4 re-runs the four asking concepts with the
trace live to separate (a) over-refusal from (b) never-authored. Bar in
`scratchpad/fix2-criteria.md`.

A flake, recorded: one full-suite run reported 1 failed / 3921 passed with no
suite name surfacing; the immediate re-run was 3922 / 0. Not reproduced.

### escalate4 (refusals traced) — outcome (b): fix 2 is correct and inert here

No refusal fired on any of the four asking sheets, and the authored (repair)
call ran on only one of them (#03). There was never an escalation to refuse: the
sameness is not over-refusal. #03's authored trait, "Stoked Furnace", landed and
is adjudicable — 14 (4d6), until the end of its next turn, first creature only —
an on-hit step, not a stacking ramp, phrased without "each time", so the gate
correctly did not apply.

`tally` DID land, on the fuse concept (#04 "a storm that gathers over three
rounds"), with the MODEL's own fill — "gains a mark as the stormfront swells and
thickens" — so the slot contract reaches the model when the stamp leads the
family and no sibling out-scores it.

**Why bloodied-fury wins the family (a design question for the owner, not fixed):**
the mechanic stamp promotes the whole `escalate` family, but INSIDE the promoted
group `rankByVerb` still orders by word score. `bloodied-fury` carries keys
("fury", "wounded", "injury"...) and scores 2 on "every injury makes it angrier";
`tally` and `wind-up` carry NO keys by design and score 0, so they sort last
unless nothing in the family scores. Keyless templates are therefore reachable
by the stamp but rarely FIRST. Options: tie all members of a promoted family (then
catalog order), or hand the fit call the promoted family unordered. Either touches
rankByVerb's contract — owner's call.

Misfit, logged: `undead-fortitude` ("Feral Resilience") on a LIVING bear-god. The
template's body gate should ask whether the creature is dead already.

## Fix 3 — the wind-up erupts at the END of its next turn — LANDED; measured by windup8

One line in library.mjs: "until the start of its next turn — when the power
erupts ... 15-foot Emanation" -> "At the end of its next turn, after it has moved,
the power erupts ... 20-foot Emanation" (print: 4 rows "at the end of its next
turn", 0 "at the start"). A frame text edit, no string matching.

windup8: 0 old-form wind-ups (detector proven to report 2 on tally6 first); the
new form landed on exactly the two known cases — Iron Sentinel's "Winding
Mainspring" and Sexton's Toll's "Shattering Peal" — both 20 ft, both reading:
"At the end of its next turn, after it has moved, the power erupts." As a GM runs
it: the walk-out counter now costs the party its whole move, which is the
telegraph working. 3,922 tests, build clean, title case 0 of 8, no throws,
mundane/exact controls untouched.

Not fix 3's, logged:
- #02's `{telegraph}` fill was the BLIND default — "its whole frame tensing" on a
  bell-ghost, the exact boilerplate leak the critic named. #01's was the model's
  own ("its plates shudder and its mainspring visibly tightens"). Same
  slot-contract-not-reaching-the-model symptom as tally/kill-denial on some
  sheets; worth one targeted look at how `you fill:` is rendered for seeds.
- the three other telegraph concepts (thunderhead, siege-mortar, caldera) took
  no wind-up: a plain recharge cone, a tally with the blind fill, a bloodied
  burst. Selection, not timing.
- NEAR-MISS, mine: I nearly reported the caldera's "Swelling Eruption" (targets
  Poisoned) as an orphaned payoff from a 150-char digest; the engine's own
  reader shows Molten Eruption AND Molten Rupture both impose Poisoned. Verify a
  defect with the real reader before naming it.
- "Thunder Absorption" on both thunder concepts — the absorption family is
  over-selected on energy concepts (and heals from the party's own thunder
  spells, as the critic said of the warden's Force Absorption).

## Fix 4 — the fuse ends in the big move — LANDED (numbers from fuse8 appended below)

`tally` now renders a HOLDING form — "It can use its most powerful action only
when it has 3 marks, and using it spends them" — and an exported late pass,
`tallyFeedsNova(sections, trace)` in generate.mjs, called right before
`trace('done:')` once the sheet's rows are final:
- finds the sheet's gated save nova by novaRows' own DECLARED predicate — the
  recorded gate (`gateOf`, which also reads a gate that lives only in the name),
  a Saving Throw, damage dice — never text that infers meaning;
- sets the nova's `gate` to '3 Marks', renames its suffix, and replaces the
  tally's own phrase "its most powerful action" with the nova's bare name (the
  one string operation: a closed token the engine itself wrote);
- with no such nova the tally LEAVES and traces why ("tally declined") — a
  fuse with no big move at the end is bookkeeping, the critic's exact complaint.
tally no longer declares Frightened (its payoff is the nova now). Pricing is
untouched: valueCheck already priced the nova as `gated`, and a recorded
'3 Marks' gate keeps `gated` true through gateOf.
Spec: `__tests__/tally-nova.spec.js` (bind, decline-and-trace, name-only gate,
no-op). Detector `/tmp/fusedet.mjs` shape, proven UNBOUND on escalate4 #04 (the
old state) before the new run.

### fuse8 — bars met, and a defect I made by composing fixes 3 and 4

Bars: 1 tally, BOUND (detector proven UNBOUND on escalate4 #04 first); 0 leftover
"most powerful action"; controls (#06 mundane, #07 exact) carry no tally and no
rewritten gate; a tally the FLOOR dropped (#01) left no stray 3-Marks gate behind;
title case clean; no throws.

THE DEFECT, caught by the GM's-eye read and not by any bar: #03 bound the marks to
`Gathering Ruin` — which fix 3 had just made a DELAYED wind-up. So: 3 rounds of
marks, a round spent charging, eruption at the END of the turn after that. **Five
rounds to a payoff in fights that last three or four** — the nova may never fire.
Each fix is right alone; together they build a fuse that feeds a fuse, which is
the critic's own complaint ("a fuse only pays off if what's at the end of it is
the big move") re-created one layer up by me.

Fixed: `tallyFeedsNova` now skips a nova whose frame DEFERS its damage, prefers
an immediate gated nova on the same sheet, and declines with that reason when the
only one defers. `wind-up` is the only delayed gated template (1 of 29), so the
cost in reach is near zero. Two more tests pin it (refuse-and-leave; prefer the
immediate nova when both are present).

LESSON for the plan's own cadence: a per-fix ten measures the fix. It cannot see
what two landed fixes do to each other. After a run of fixes, the composition is
its own question — and the holistic read is where it shows, not the bars.

## `tally` is CUT (owner, 2026-10-25) — and the rule it proves

The owner read the rendered rows and called it: too fiddly to adjudicate.

```
Winding Spring. At the start of each of its turns, the knight gains a mark as the
  mainspring coils tighter, to a maximum of 3. It can use Stone Barrage only when
  it has 3 marks, and using it spends them.
Stone Barrage (3 Marks). Constitution Saving Throw: DC 17, each creature in a
  30-foot Cone. Failure: 55 (10d10) Thunder damage.
```
Three sentences across two rows, a counter tracked for three rounds, and the GM
must read the trait to know when the action is legal. print buys the same
surprise in two words — `(Recharge 5-6)` — one die roll, nothing tracked.

Fix 4 made the mechanic CORRECT (the fuse ends in the big move, and cannot feed
another fuse) and left it NOT WORTH THE INK, which is exactly what the critic had
said before I built it. I defended the mechanic instead of hearing that.

**THE RULE, worth more than the template: a mechanic that needs its own tracked
number is a table cost, and a cheaper mechanic usually buys the same feeling.**
The survey's token economies (Time Debt, Luck Tokens, the three-notch clock) all
failed this way; `tally` was the same idea in a smaller coat. Before authoring a
shape, ask what the GM must HOLD to run it — not just whether it is sound.

Cut from: shapes.mjs (frame const + entry), templates.mjs (FLAVOR_SLOTS,
SLOT_CONTRACTS, BLIND_FILLS, SHAPE_TAGS, the `escalate` member), generate.mjs
(`tallyFeedsNova` + its call site), both test ledgers, and `tally-nova.spec.js`
deleted. Untouched: the unrelated local `const tally = {}` condition counters in
checker.mjs, generate.mjs and save-stat.spec.js. 3,922 tests green, build clean,
110 templates, the two mechanic enums still identical.

If a build-up is ever wanted again, the owner's cheaper shape is on record:
collapse it to ONE row and gate on the round number, which the table already
tracks — "Stone Barrage (3rd Round or Later)". No counter, one read.

### What of fixes 3 and 4 survives the cut
- Fix 3 (wind-up erupts at the END of its next turn, 20 ft) STANDS — it is
  independent of tally and measured by windup8.
- Fix 4's binding is gone with the template. The composition lesson stands and is
  recorded above: a per-fix ten cannot see what two landed fixes do to each other.

---

# THE CRITIC'S SECOND READ — sweep-2026-10-25T18-50-15: 7 ship / 25 fix-lite / 8 fix
(10-23 was 5 / 22 / 13.) Five of their claims checked against the saved JSON,
five correct — treat the read as reliable:
- Adult Red Dragon: "Burning Brand" keys on "is frightened" (2014 lowercase) and
  nothing on the sheet frightens. ORPHANED PAYOFF — print's Frightful Presence
  is missing. **My orphan detector reported 0 on this forty because its patterns
  were capitalized and the 2014 printing is lowercase.** True count: 1 of 4. The
  consumed_condition guidance landed on 2024 and did not hold on this 2014 sheet.
- Purple Worm: the library seed `swallow` (a DEX save) DISPLACED print's own
  Swallow (STR save, "Grappled by the worm", a Bonus Action); "Lodged Armoury"
  became a bloodied burst. `engulf_engine` was unset on print's row, so the
  one-engine rule did not see it. REGRESSION on a near-exact creature.
- Ossuary Sun-Lich: "or be paralyzed." — no duration, AGAIN (noted on 10-23 and
  not fixed: I recorded that the reader now DETECTS it and stopped there).
- Well Devourer: Bite imposes Grappled + welded `charge-push` pushes the same
  target 10 ft. The duplicate-trigger guard (fix 1) correctly did not fire; the
  prompt-only push half was ignored. The critic's rule is DECLARABLE: a rider
  template with effect=movement must not weld onto a host whose recorded
  `imposes` is Grappled/Restrained. No attack count needed. Build this.
- "Traits after Actions on 9 of the 2024 sheets": **MY critic-package.mjs** —
  it iterated the JSON's key order (Actions first); the UI prints Traits first.
  Fixed (print's section order) and the package rebuilt. "At will::" IS the
  engine's (it is in the JSON text).

Patterns they name that I can turn into gates, all declared-data:
1. payoff precondition reachability — a conditional payoff ships only if another
   row's RECORDED `imposes` (or the shared reader) supplies the condition; the
   2014 path needs it as much as 2024.
2. grapple + push never share a row — effect=movement rider vs host.imposes.
3. A2 on MIXED rows — damage-dominant (rowValue ev vs the condition) takes
   DEX/CON. Furnace Breath WIS -> DEX; Molten Weld STR -> DEX.
4. the bound/leash template on a movement-twist concept (Ilvareth) — a
   contraindication, not a key: a body gate question.
5. weapon-lodge x6 / thunder-retaliation x4 on bodies that do not warrant them —
   the NEEDS_BODY questions exist; find why they pass.

## Order the critic proposed, and I agree with it
1. three small gates (payoff reachability on both printings; grapple+push; A2
   damage-dominant) — catch 5 sheets.
2. bound/leash contraindication.
3. lodge + resonant-body warrants.
4. the Sun-Lich duration flap — find the regression; the fix exists.
5. Trench Hymn donor selection (lurker kit on a Gargantuan brute).
6. render: "At will::", spell-list indentation (engine), section order (mine, done).

## Gate 1 — a payoff needs a reachable precondition — LANDED (owner: "metadata back
## from the LLM over string matching")

The LLM half already existed and was never checked: the fit call's
`consumed_condition` (the model's answer, with "quote the row that imposes it"
in its guidance). Now:
- renderTemplate records the pick on the row as `consumes` (templates.mjs, the
  VOCAB fill loop; carried onto the fit row in generate.mjs).
- `payoffReachable(sections, trace)` runs before `trace('done:')`: another row
  must impose the consumed condition through the ONE shared reader
  (`imposedConditions` — recorded `imposes` first, prose second, both
  printings), else the row leaves and traces "payoff declined". The payoff's own
  target filter cannot satisfy it (the reader's PRECONDITION guard).
- Spec: `__tests__/payoff-reachable.spec.js` (2024 grammar, a recorded field
  with no prose, the 2014 lowercase printing, drop-and-trace, self-match, no-op).
- Replay on the forty's real Adult Red Dragon (2014): DROPS Burning Brand; with
  print's Frightful Presence restored, KEPT.
3,928 tests, build clean. Measured by payoff10b (bars in scratchpad).

Replay near-miss worth keeping: the gate SPLICES the dropped row out of the
sections it is handed, so a control built from the same array after the first
call had no Burning Brand to stamp — the "undefined.consumes" error was the
mutation, not the gate. Build each replay case from the file.

## Gates 2 and 3 — designs read against the code, build on the next commit

**Gate 2 — grapple and push never share a row.** At the weld (generate.mjs, the
`if (host && !dupTrig)` block) both facts are DECLARED and in hand:
`TEMPLATE_BY_ID.get(actionT.template).effect === 'movement'` (charge-push,
hook-rider, bolt-drag are the three) and `host.imposes` (recorded; Grappled /
Restrained). Refuse the weld when both hold — same shape as the dupTrig refusal:
drop the slot, trace "rider refused — a push on a grapple row", fall through,
never `return`. No attack count, no text. The prompt line stays (the call is
still asked); the gate is the backstop its answer needs.

**Gate 3 — A2 on mixed rows.** Finding: the model's `save_stat` pick is NEVER
consulted. templates.mjs ~1262 ("SAVE BY EFFECT") overwrites `fills.save_stat`
from a regex over the rendered text — 0 reads of the model's fill in that
block — and generate.mjs ~7008 retypes again from prose where no record exists.
The owner's ruling, "metadata back from the LLM over string matching", applies
directly:
1. VOCAB_GUIDANCE.save_stat — the rule where the model chooses: damage-dominant
   area -> Dexterity; a shove/grapple/knock-down -> Strength; poison, breath,
   disease, or a body condition -> Constitution; fear/charm/compulsion -> Wisdom.
   Print's own split (survey: 3 DEX area+Prone rows, 1 STR trample, 1 WIS roar).
2. SAVE BY EFFECT becomes VALIDATION of the model's pick, not replacement: keep
   the pick when it is in SAVE_STATS and consistent with the RECORDED
   `imposes`/`consumes` and `rowValue` (ev dominates -> DEX/CON allowed); fall
   to the by-effect rule ONLY when the model gave none or the pick contradicts a
   recorded condition (Prone + Wisdom). Trace every override with the reason.
3. The prose retype at ~7008 keeps its "no record on the row" guard — it is the
   print-row fallback and nothing else.
Critic's two: Furnace Breath (72 fire + Frightened) WIS -> DEX; Molten Weld
(59 fire, Prone target) STR -> DEX. Both are damage-dominant by rowValue.

Order: 2 then 3 — gate 2 is eight lines on declared data; gate 3 changes a
contract (the model's pick wins) and needs its own ten.

### payoff10b — gate 1's bars, all met

0 orphaned payoffs (1 payoff row, sourced: Mire Drag <- Bog Muck Grip). ONE
decline, and it fired on **#01 the Adult Red Dragon (2014)** — the critic's exact
case: "Terrifying Emberburst needs a Frightened target and nothing on the sheet
imposes Frightened — the row leaves". Signatures 9 library / 1 dropped (the bare
Owlbear, correct) against the forty's 34/6. Title case 0 of 10. No throws.

HONEST LIMIT: only 1 payoff row shipped across the ten, so the run is thin
evidence for "does not over-drop" — the spec's six cases and the dragon replay
carry that half. #02 (breath terrifies / hammer finds the terrified), #05 and #08
got NO payoff row at all; they were not declined (1 decline total), the template
simply was not selected. On the forty the Brass Tyrant DID get Molten Weld, so
that is selection variance, not the gate.

## Gate 2 — a push never undoes its own row — LANDED, with the count now DECLARED

The owner chose the cleaner, bigger change over reading the Multiattack sentence
at each use site.

`stampAttacksPerRound(sections)` in scale.mjs records `attacksPerRound` on every
attack row. It reads the Multiattack sentence ONCE — at the seam where scale.mjs
COMPOSES it (the count is known there directly: two at CR 5-10, three at CR 11+)
and once more before returning, for a donor that brought print's own. Every
consumer reads the field. Re-stamped in generate.mjs at ship time, because
renames and the citation sweep rewrite that sentence and a stale count is worse
than none. Same move that retired seven name-readers for `gate` and completed the
`imposes` record.

print's two idioms give a row the same ceiling and both are handled: "makes three
Rend attacks" (one row, three times) and "makes two attacks, using Claw or Bite
in any combination" (either, twice). The one trap, caught in verification: "It
can replace one attack with a use of Spew" NAMES Spew and grants it ONCE — the
first cut counted it as three. The count clause is everything before "can
replace".

The weld's gate 2 now refuses a rider whose template declares `effect: movement`
onto a host that EITHER holds the target (recorded `imposes` Grappled/Restrained)
OR swings 2+ times a round (the stamp). No sentence read at the weld.

Replay, both known-bad sheets from the forty: Well Devourer's Bite (Grappled)
REFUSES; Wrackwork Ram (Prone, two swings) REFUSES; a host that holds nothing and
swings once ALLOWS. Specs: `attacks-per-round.spec.js` (7 cases incl. the replace
clause, a gate suffix, and re-stamp-after-rename), plus the existing weld specs.
3,928 tests, build clean. Measured by push10 (bars in scratchpad).

NOTE for whoever reads this next: `multiattackShape` in templates.mjs still
parses the same sentence for `valueCheck`'s pricing. It now has a declared
alternative — `attacksPerRound` on the rows — and consolidating the two is a
tidy follow-up, not done here because pricing is load-bearing and wants its own
measurement.

### push10 — gate 2 holds; bar 2 failed as written and the cause is PRICING, not the gate

0 push-on-holding-or-repeating rows (forty had 2); the one refusal fired on the
Well Devourer's own Bite; `attacksPerRound` reached all 12 shipped attack rows.
No push landed anywhere — but one refusal total, so the gate did not eat them.

The mechanism, read exactly: the wind-dancer's "Sundering Shove" is the
`push-prone` SEED ("pushed up to 15 feet away ... and has the Prone condition"),
and valueCheck priced it at ev 3.7 against a floor of 14 (one attack of three)
because `rowValue` gives a row with no damage dice ev 0 and the only credit a
condition earns is through WORTH_AN_ATTACK —
  /Restrained|Grappled|Charmed|Paralyzed|Stunned|Incapacitated|Petrified/
— which does not contain PRONE. So a push-and-knock-down save row is priced as
"does nothing" and can never ship as an action at any CR. The three movement
RIDERS price differently: `charge-push` carries damage dice and clears the floor
at every band (ev 13-26); `hook-rider` and `bolt-drag` do not (ev 3-5 vs 12-20)
and are equally unshippable.

print disagrees with that pricing: a shove is a real action it writes (Strength
5 rows to Dexterity 2; Trampling Charge, Shield Shove, Wing Attack's push).
Prone costs the target half its move to clear and hands melee allies Advantage —
it is not nothing. Whether Prone (and "pushed") belongs on the worth-an-attack
list is a PRICING decision with budget consequences, so it is the owner's; not
changed here. If it goes in, the Sundering Shove seed ships and the
cliff-concepts get their fling as a row rather than only as an area save.

NOT a gate-2 problem. Logged, not chased.

**Owner's ruling on Prone (2026-10-25): NOT worth an attack.** "Even the Dire
Wolf at low CR has a Prone rider on a damage dealer" — Prone is a RIDER print
attaches to damage, never a payload priced on its own. WORTH_AN_ATTACK stays as
it is; a displacement-only row stays below the floor by design. The cliff-fling
concepts are correctly served by an area save that also deals damage.

## Gate 3 — the model's save_stat pick is CONSULTED — LANDED; measured by save10

Finding, verified: templates.mjs's SAVE BY EFFECT block overwrote
`fills.save_stat` with ZERO reads of the model's own answer — the VOCAB enum it
chose from was decorative. The owner's rule ("metadata back from the LLM over
string matching") applied directly.

Now: (1) VOCAB_GUIDANCE.save_stat carries print's MEASURED split — area+damage
Dexterity 46 / Constitution 29; shove Strength 5 to Dexterity 2; condition-only
Constitution 24 / Wisdom 13 — so the model chooses with the rule in hand.
(2) The pick STANDS unless it contradicts one of the two cases print is decisive
about: a shove is Strength; a damage-dominant row is never Wisdom (the critic's
Furnace Breath, 72 fire on a Wisdom save). (3) A damage-dominant row the
by-effect ladder cannot place (no condition word — ground-burst's frame) falls to
Dexterity; before this it rendered WISDOM, the template's own placeholder, both
when the pick contradicted and when there was no pick at all. (4) Every override
is recorded on the row as `saveOverride` with its reason.

Reach: only FIVE templates carry {save_stat} (condition-payoff, execute, seal,
noxious-aura, ground-burst). push-prone and wail hardcode theirs; the contract
cannot touch them, and my first replay "failed" on exactly those two before I
read the frames. The damage test reads the UNFILLED token ({avg} ({dice})) —
ENGINE slots fill later than this block, so a literal-dice regex matched nothing.

Spec: `__tests__/save-stat-contract.spec.js` (6 cases incl. out-of-enum pick and
the guidance's own counts). Detector `/tmp/wisdet.mjs`: flags Burning Brand and
Furnace Breath on the forty, exempts print's Horrific Visage (a fear row that
IMPOSES Frightened — Wisdom is right there).

Flake, second sighting: generate-2024.spec.js reported 1 failed under
--maxWorkers=2 with no assertion surfacing in text, JSON or verbose reporters;
alone and on immediate re-run it passed 3935/0. Not reproduced. If a third
sighting lands, bisect the worker count before the suite.

### Gate 3, second cycle — the first ten measured a HALF-LANDED gate

save10 (first run) failed bar 1 on the critic's own case: Furnace Breath AND
Furnace Glare both shipped on Wisdom with 0 overrides recorded. Four defects,
none visible to the first replay (which covered ground-burst only):
 a. `dmgDominant` matched {avg}/{avg_half}; condition-payoff carries {avg_x2}.
    Fixed: every damage token.
 b. `picked` read fills.save_stat AFTER the condition-save block (~1250) had
    written the ENGINE's own CONDITION_SAVE choice into it — so every pick, and
    no pick at all, read back as "Wisdom" and the contract honoured the engine
    while believing it honoured the model. Fixed: the model's pick is captured
    into `modelSave` BEFORE that block runs.
 c. `saveOverride` was returned by renderTemplate and never carried onto the fit
    row — I carried `consumes` at that site and not this. Zero overrides would
    have been recorded regardless of behaviour. Fixed.
 d. Furnace Breath is a CHASSIS nova — no template, no seed, no print — so gate
    3's block in renderTemplate never saw it. A2's late re-derive (generate.mjs,
    the "PRONE IN A DAMAGING AREA" arm) keyed on the CONDITION alone: Frightened
    -> ['Wisdom','Charisma'], never asking whether damage dominated. Fixed in
    that arm: areaDmg with a fear rider -> ['Dexterity','Constitution'].
 Then templates.spec insisted on a THIRD decisive case, and it was right: a
 condition AURA (imposes one minor condition, deals no damage) saves by its
 condition whatever the model proposed — Poisoned on Wisdom is as wrong as fire
 on Wisdom. Landed with the override reason "a Poisoned aura saves by its
 condition" — and it must YIELD to the damage rule when a frame carries both
 tokens (condition-payoff imposes a one-turn Frightened AND deals 59 fire; the
 fire is the row). The first cut re-derived Molten Weld to Wisdom on exactly
 that.

Replays now, all correct: ground-burst (4 cases), condition-payoff (4 cases),
noxious-aura Poisoned-on-Wisdom -> Constitution with reason, A2's arm on the
forty's real Furnace Breath -> DEX/CON with the fear-only control keeping Wisdom.
3,941 tests, build clean. save10 re-running.

**The lesson that generalised:** "the engine validates the model's pick" is only
true if the engine READS the pick — and the first thing a validation block reads
is whatever the last engine block wrote into the same field. Capture the model's
answer at the top, before any engine code touches the field, or the contract
inverts silently and every replay that feeds a pick through the normal path
passes for the wrong reason.

**save10 re-run (`smoke-out/save10-2026-10-25T20-49-19`), read against the bars:**
- Bar 1 damage-dominant-on-Wisdom: 2 -> 0. Furnace Breath (72 fire + Frightened)
  shipped on CONSTITUTION; Killing Wake (71 cold + Deafened) likewise. Both via
  the A2 chassis arm — the critic's exact case flipped live.
- Bar 2 overrides recorded: 0 — NOT evidence either way. This ten drew ZERO
  `{save_stat}` template rows (the first run drew two: Furnace Glare on
  condition-payoff, Fevered Wounds on noxious-aura). The hammer went to an
  `isolation` rider this time; the Glacier's bound `execute` was dropped by the
  floor. The renderTemplate block ran 0 times live. Its evidence is the
  deterministic replays (ground-burst 4, condition-payoff 4, noxious-aura 1).
- Bar 4: 2 "print grammar" traces, both chassis novas (A2 gap) — expected.
- Regression: 10/10 ok, no throws; signature outcomes 3 "never reached the sheet"
  (2 dropped by the floor), 1 trait refused; no payoff declines, no push-on-hold.
- Holistic (not gate 3's): Rimebound Glacier shipped "Aura of Truth" (can't lie)
  for a "clinging cold" idea — shape-fit fallback with no verb match, a FIX;
  Brass Tyrant's "hammer finds the terrified" landed as an isolation rider +
  Scent of Fear tracker — sound but samey; Siege-Timber Golem lost its
  wall-shouldering signature; Drake's Weapon Lodge and Bellringer's Resonant
  Body are the open lodge/resonant-body body-warrant item.
Verdict: gate 3 moves forward. The template path is sampled at ~0-2 draws per
ten; the close-out forty is where it gets measured live.
