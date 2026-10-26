# The tail build — print's memorable mechanics the catalog does not have

**Working split:** written by the analysis session (Fable); the implementation
session (Opus) executes it. Assumes no conversation history. Read
`plans/signature-moves-on-death-and-relics-2026-10-25.md` §"What a new family
MUST have, or it ships inert" and §"A FOURTH way a declaration ships inert"
before authoring anything — two shapes were built this week that shipped inert
for missing one of those.

## The goal, in the owner's words

*"I want a GM who types in a short concept without any mechanics to be
pleasantly surprised."* Sound AND memorable. The print survey (same plan,
§survey) found memorability is **one vivid rare mechanic** — the Stirge is
memorable for a 1/8-CR creature because it latches on and drains you. Our catalog
built print's common body (prone, terrain, swallow, bloodied, touch-retaliation)
and skipped its tail.

## Why this is the next thing, measured

The plumbing is done (three commits today: idea prompt rebalanced, fit menu
ordered by stamps, aura traits reachable). What is left:

- **Variety is NOT the problem.** `scripts/signature-measures/distinct-mechanic.mjs`
  over six same-batch runs: 6-9 of 10 sheets already carry a signature no other
  sheet in that ten has. And the Headless Horseman — the owner's own test case —
  across 10 reruns drew six DIFFERENT action signatures (throw-retrieve, rampage,
  lure, exploiter, condition-payoff, affliction).
- **The right shape is the problem.** None of those six is a Horseman's move:
  nothing beheads, nothing rides down, nothing throws a head. Two of the ten
  reruns shipped no action signature at all. Reasonable-but-generic is the
  plateau: the shelf has a hundred sound shapes and not the one the concept
  demands.
- **The filler rate confirms it.** Across six runs, 18-45% (mean ~28%) of shipped
  signature rows are "nearest match" decoration — the AI said nothing fits, the
  engine shipped the closest template anyway. `weapon-lodge` was the landing pad
  in four of six runs, for ideas like "a standing charge of storm in its hide" and
  "loose gravel that blows plunge through". Shelf gaps, not plumbing.

## The shapes, in order. Print-exact first, invented last.

Print text below is from `src/data/srd52-monsters.json` (the ONLY verbatim
source — see memory `srd-only-verbatim`). Copy print's grammar; parameterise only
what the catalog's other shapes parameterise ({dc}, {avg}, {dice}, {damage_type},
flavour slots). Check each shape against print's frequency before pricing it
("print overrules reviewers, pins and you").

### 1. `latch` — attach and drain (the Stirge). Rider on a melee attack.

Print (Stirge, CR 1/8):
> Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Piercing damage, and the stirge
> attaches to the target. While attached, the stirge can't make Proboscis attacks,
> and the target takes 5 (2d4) Necrotic damage at the start of each of the stirge's
> turns. The stirge can detach itself by spending 5 feet of its movement. The target
> or a creature within 5 feet of it can detach the stirge as an action.

- `section: 'rider'`, `trigger: 'on_hit'`, `effect: 'damage'`, mechanic: a new
  `MECHANIC` family or `escalate`? Neither — add `attach` to `MECHANIC` (and to
  `ASKED_MECHANICS` in route.mjs so the resolve call can name it from "latches
  on", "burrows into", "clamps"). Four-invariant checklist applies.
- `needs_body`: "a mouth, proboscis, hooks or limbs that can hold on to a creature
  larger than itself". Not a swordsman.
- Pricing: the per-turn drain is the value; price it as the attack's per-hit
  damage at the band (the Stirge's drain ≈ its hit). `valueCheck` must see the
  ongoing damage or the floor will drop it — read how `swallow`'s per-turn acid
  is priced and copy that.
- Table cost: none tracked — "attached" is a state the GM already holds like
  Grappled. One row, one read.
- 2014 printing: the 2014 Stirge is "Blood Drain" with the same shape; confirm
  the row renders in a `rules: "2014"` sheet (see "Both printings" below).

### 2. `corrosive-form` — gear destruction, two frames (Black Pudding, Rust Monster).

Print (Black Pudding, CR 4, trait — the ONE reactive trait in all of SRD 5.2):
> A creature that hits the pudding with a melee attack roll takes 4 (1d8) Acid
> damage. Nonmagical ammunition is destroyed immediately after hitting the pudding
> and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to
> attack rolls immediately after dealing damage to the pudding and coming into
> contact with it. The weapon is destroyed if the penalty reaches -5. The penalty
> can be removed by casting [Mending]…

Print (Rust Monster, CR 1/2, action):
> The rust monster targets one nonmagical metal object—armor or a weapon—worn or
> carried by a creature within 5 feet of itself. Dexterity Saving Throw: DC 11, the
> creature with the object. Failure: The object takes a -1 penalty to the AC it
> offers (armor) or to its attack rolls (weapon). Armor is destroyed if the penalty
> reduces its AC to 10, and a weapon is destroyed if its penalty reaches -5…

- Two templates: `corrosive-form` (trait, `on_being_hit`/`resource` — it is a
  retaliation whose payload is gear, not HP) and `rust-touch` (action,
  `save`/`resource`). Mechanic family: add `destroy` (gear). `ASKED_MECHANICS`
  += 'destroy' ("corrodes", "rusts", "eats metal", "ruins armour").
- `needs_body`: "a body of acid, rust, corrosion or a hunger for metal".
  `{damage_type}` on the trait frame from the sheet's energy (Acid default).
- Pricing: gear damage has no HP value and `valueCheck` prices it 0. That is
  fine for the TRAIT (traits are counted, not floored). For the ACTION it will be
  floor-dropped unless it is priced; print's Rust Monster is CR 1/2, so gate the
  action to CR ≤ 4 (print's own bound) and give it a flat value equal to one
  attack at the band — a destroyed weapon is worth at least a hit. State this in
  the template comment; it is a pricing judgement, flag it.
- This is the body-reaction shape the decoration data keeps asking for ("hide
  holds a charge", "blows plunge through"), done print's way.

### 3. `bloodied-form` — a second form, bounded. INVENTED. Critic loop first.

No print peer with this trigger (print's Shape-Shift is an action and keeps the
stats). The memorable version is the one a GM remembers: *the hag's true face;
the cocoon bursting at half health.* Shape:

> **{form_name}.** The first time the creature is Bloodied in a fight, {transformation}.
> Until the end of the fight, {one concrete change}.

`{one concrete change}` is a CLOSED menu, chosen by the fit call, each item
priced:
  - its {melee} attack deals an extra {avg_half} ({dice_half}) {damage_type} damage
  - its reach increases by 5 feet
  - it gains a Fly Speed of 40 ft. (hover) — only on a body that could
  - it gains Advantage on attack rolls (print: bloodied-fury, already exists —
    exclude this one, or the two shapes collide)
- `section: 'trait'`, `trigger: 'always'`, `effect: 'damage'` (or movement by
  item — declare per the chosen item if the catalog supports it; else `damage`).
  `invented: true` → append to the ledger in `shapes.spec.js`.
- Gate = Bloodied: the table already tracks it (memory
  `a-tracked-number-is-a-table-cost` — no counters, no cross-references).
- Pricing: half a fight of the increment → ev ≈ 0.5 × the item's value.
- **Critic loop before the catalog**: render two sample statblocks with it
  (a hag, a chrysalis-thing), run the critic package read as a GM, and only then
  wire the four invariants. The owner asked for this loop for invented shapes.

### 4. `possession` — take the body (the Ghost). Action, Recharge 6. Critic loop.

Print (Ghost, CR 4):
> Charisma Saving Throw: DC 13, one Humanoid the ghost can see within 5 feet.
> Failure: The target is possessed by the ghost; the ghost disappears, and the
> target has the Incapacitated condition and loses control of its body. The ghost
> now controls the body, but the target retains awareness. The ghost can't be
> targeted by any attack, spell, or other effect, except ones that specifically
> target Undead. The ghost's game statistics are the same, except it uses the
> possessed target's Speed… [read the full row]
> The possession lasts until the body drops to 0 Hit Points, the ghost ends it as
> a Bonus Action, or the ghost is forced out…

- Print-exact, but LONG and the GM holds two bodies — that is a table cost, and
  print accepts it at CR 4 for one creature. Gate: `needs_body` "an incorporeal
  spirit, a bodiless mind, a thing that wears others". `cr_range` 3-12. Recharge
  6, as print. `trigger: 'save'`, `effect: 'condition'`, mechanic `control`
  (add to MECHANIC + ASKED_MECHANICS: "possesses", "takes over", "rides a body").
- Pricing: print prices it as the Ghost's whole offence at CR 4; treat it as a
  nova (`nova: true`) valued at the band's attack.
- Critic loop: render a ghost and a non-undead case (a parasite-mind) and read
  as a GM. The second may fail the body question on purpose — record that.

### 5. (optional) `kill-harvest` — check `rampage` first.

The owner approved "harvest" earlier, but "a slain creature rises" is minions
(retracted) and "after reducing a creature to 0 HP, move and attack" is
`rampage`, which exists. Only build if there is a non-minion, non-rampage shape
left — "regains {hp} HP when it reduces a creature to 0 HP" is the candidate.
Do this last or not at all; report rather than build if `rampage` covers it.

## Reachability — a shape that exists but never ships is the relic-object lesson

`relic-object` shipped 0 of 40 after it was built. For EACH shape, before
calling it landed:
1. Write two concept canaries that should draw it (e.g. latch: "a cave leech
  the size of a dog that clamps on and will not let go"; "a lamprey-thing").
   One of the two in `rules: "2014"`.
2. Run them through the REAL pipeline (`scripts/smoke-statblock.mjs` on a batch
   file) — never a fabricated probe (memory `a-probe-must-be-fed-real-context`).
3. Confirm in the trace: the resolve call named the mechanic (`asked_mechanic`),
   the template was on the fit menu, the body question passed, and the row
   shipped. If any link fails, that is the defect, not the shape.
4. Add the canaries to a new batch `scripts/smoke-batches/tail-canaries.json`
   so the close-out forty can carry them.

## Both printings

A shape renders through its frame; the 2014 sheet is produced by the legacy
conversion (`toLegacyModel`, format-2024). `kill-denial` and `relic-object` ship
in both; confirm by running one 2014 canary per shape and reading the flat
`abilities`/`actions` output — "has the X condition" must become "is X" in 2014
idiom (see `imposedConditions` for the two grammars).

## Pre-registered pass/fail — per shape, then the set

Per shape (after its canaries):
- Both canaries ship the shape as a real row with a receipt (not decoration).
- The row reads like print to a GM (the critic read for 3 and 4; your own read
  for 1 and 2).
- Priced: not floor-dropped at its band; not above the band's cap. Replay
  `valueCheck` on the rendered row at three CRs and print the numbers.
- Suite green, build clean, four invariants satisfied, ledger updated for
  invented shapes.

For the set (one `save10` ten + the Horseman reruns), using
`scripts/signature-measures/`:
- **Filler rate** (`idea-to-row-rate.mjs`): six-run mean is ~28%. Target **≤20%
  on two consecutive runs**. (The single-run ≤20% bar set earlier was noise.)
- **Weapon-lodge as landing pad**: appeared in 4 of 6 runs as decoration.
  Target: 0-1 of the next 3 runs.
- **Ideas lost to "nothing on the shelf"**: 2-11 per run. Target: halve.
- **Horseman reruns (4)**: at least 2 of 4 ship an action signature that a GM
  would call a Horseman's move. This is a judgement — write the four rows out
  and judge them; do not score it with a regex.
- RETIRED as a headline: "fires the way the idea said" (`fit-trigger-match.mjs`).
  Two runs running its one flagged failure was the call correctly overriding its
  own tag. Keep `trigger-available.mjs` (the availability split) only.
- **Holistic**: ship / fix-lite / fix on playability, fun, soundness,
  originality — the owner reads this.

## Non-goals (so the build stays narrow)

- No minions, no summons (owner, retracted). No counters, no clocks, no token
  economies (`tally` was cut: "as a GM I'd have to reread to adjudicate").
- Interlock stays at print's rate (1.5-4.6%); `latch` is not interlock.
- Prone is not worth an attack (owner ruling) — no shape whose payload is Prone.
- Do not touch the keyword GATE (generate.mjs ~4145) or the re-roll labels —
  both are the owner's cost call, both flagged in the two previous plans.
- Do not rename `fire-aura`.

## Order and cadence

latch → corrosive-form/rust-touch → (critic loop) bloodied-form → (critic loop)
possession → kill-harvest only if warranted. Land one, run its canaries, suite,
build, report, the owner commits; then the next. The set-level ten runs after
shape 2 and again after shape 4, not after every shape.
