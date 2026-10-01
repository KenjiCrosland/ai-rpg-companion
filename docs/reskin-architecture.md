# The 2024 Reskin Engine — current architecture (as of 2026-10-01)

This describes the engine as it runs today. The July handoff journal
(`docs/2024-architecture.md`) is the history of the renderer, lint and
conversion sprints that preceded it; nothing below depends on reading it.
Code lives in `src/tools/statblock-generator/reskin/`. The sprint's working
notes (what each rule was answering) are in the owner's memory file and in
`scripts/smoke-evidence/SOLO-*.md`.

## Doctrine

- **Rules text is never free.** Every mechanic on a sheet is a *card*: a print
  shape with an engine-filled number, or a library seed. The model names
  things and chooses among cards; it never writes a rule the engine has not
  authored. Below the grammar line (numbers, ranges, DCs, geometry, riders)
  every write is deterministic.
- **Print overrules reviewers.** When a reviewer and the 2024 SRD disagree, the
  SRD wins and the receipt goes in the comment (Immutable Form is
  "can't shape-shift"; a Roper is AC 20; the Doppelganger's Surprise Attack
  is its first-round Advantage parenthetical).
- **No call is an island.** Every model call after the route sees the sheet so
  far (`chassisSheet()` / `sheetSoFar()`), the concept, and the seat it is
  filling.
- **The log explains every decision.** A sheet's trace says which key chose
  the line and what class the key was, which card bound on which words, what
  the ladder did to the numbers, and what left and why.

## The calls, in order

1. **Concept call** (Vue side, outside this directory): type, mind, movement,
   mechanics, energy, signature elements. Its outputs arrive as `options`.
2. **Route call** (`route.mjs`): the model ranks lines with a quote from the
   input. `chooseLine` vetoes picks whose quote is not in the input, applies
   the type gates, then the key rule (below), and prints the primary line's
   key and class.
3. **`generateReskin(options, callLLM)`** (`generate.mjs`):
   - donor pick and scale (`scale.mjs`), print-canon lookup, seat stand-downs;
   - **main reskin call**: name, `inline` form, renames for every chassis row,
     damage types, header fields; vetted by `reskinDefects`, repaired in rounds,
     then deterministic reverts (shelf names, a shifter's natural weapon);
   - **idea call**: one action idea and one trait idea in plain words;
   - **fit call**, per seat: pour the idea into ONE card from a menu the
     concept's verbs have already narrowed; the engine renders the card;
   - owed traits, concept-first traits, fallback, value check, header honesty,
     print-canon stamps, audit.

## Route (`route.mjs`)

24 lines: `brute, brute-charger, brute-grappler, brute-juggernaut,
brute-regenerator, skirmisher, skirmisher-mounted, -skulker, -hurler, -archer,
-shifter, -winged, lurker, lurker-phantom, lurker-trap, caster, caster-binder,
caster-warpriest, defender, defender-leader, defender-warden, swarm, ooze,
dragon`. The last three are bodies: the body outranks the role.

- **Fixed phrases first** (`lexicon.mjs readPhrases`): "fire at will" →
  "looses at will", "holds the line" → "keeps the line", "roots up" →
  "digs up", "takes a toll" → "takes a price", "spears the X" → "impales the
  X". Every reader of the words (route, key ranker, deny lists, element bank,
  the model prompts) reads the rewritten text.
- **Key classes** (`keyClass`): every `LINE_VERBS` key is a *verb*, a *body*
  noun (crab, werewolf, drowned, ghost…) or a *job* noun (archer, sergeant,
  captain…). A job noun never overrides the model's pick; a verb or body noun
  does, and the note names the key and its class. A job noun may fill a
  family that *fell* to its plain line.
- **Vetoes**: juggernaut needs a made type; warden a made or risen type; leader
  is never a Beast or made thing; trap is never a living type; archer needs a
  bow, arrow, crossbow or shot in the words; swarm needs a mass word. A body
  veto that leaves no pick falls to the plain line by type.
- **Owned nouns** (`NOUN_WHEN_OWNED`): "her archers", "its charge", "whose hide"
  are not the creature's verbs. **Enemy subjects**: "anyone who blocks it" is
  the enemy's verb.

## Donors (`donors.mjs`, `scale.mjs`)

90 cards: skirmisher 28, brute 21, lurker 11, defender 10, caster 8, dragon 4,
ooze 4, swarm 4. Each style line has rungs by CR and a legendary top seat.
`scaleDonor` fits the striker stat to the card's attack bonus (casters strike
with the mind), taxes flight 10%, and caps any chassis nova at `NOVA_CAP(cr)`.
Chassis rows carry `{damage_type}`, `{damage_type_2}`, `{projectile}`,
`{save_stat}`, `{condition_minor}` slots the main call fills.

## Print canon (`printCanonFor`)

A concept that names a print creature borrows print. Three grades:

| grade | example | what happens |
|---|---|---|
| whole name (`exact`) | "a wolf", "a doppelganger" | the block is the composition: seats stand down, print's rows, array, header |
| head noun (`borrowOnly`) | "a knight who…", "a barrow-wight that…", "a hag who…" (nearest-CR family), "a unicorn gone mad…" | rows, array and header ride; the seat stays for the clause's verb |
| head word / ending | "a canal ghost", "a hungry ooze" | rows ride; the claimed seat stays |

A Beast head in a long concept is reskin material and matches nothing.

What rides on a print body: traits (minus boilerplate), non-attack rows from
Actions, Bonus Actions and Reactions (Spellcasting included; dice rows are
re-priced by the value check at the sheet's CR; DCs derive from the named
stat), attack names, physical type, "plus" clause, roll parenthetical and
reach, the ability array (striker re-fitted), size, base walking speed, type,
languages, and print's movement modes (a mode beyond print's needs the
user's words: `NAMED_MODE`).

What leaves: seat-owed traits; chassis bonus actions, reactions, the ranged
row and the nova when print has none (Multiattack rekeyed). A body-shaped or
any styled seat stands down to the plain line when no class-verb names it;
a caster family demotes to the plain line unless print is casting-primary
(Spellcasting and no pure melee row). A print body never draws the blind
fallback; only a verb-bound fit adds to it.

## Templates (`shapes.mjs`, `library.mjs`, `templates.mjs`)

96 templates on the fit catalog: 70 shapes (from 71 authored; 28 invented,
each with a kin citation; the rest cite a print row) and 26 library seeds. Shapes carry frames per CR band, flavor
slots, and gates: `roles`, `styles`, `cr_range`, `requires_movement`,
`requires_style`, `requires_row` (a hurled weapon needs something to throw;
a bleed needs an edge), `deny_types` (contact damage is not a Humanoid's),
`host` (a rider or reaction that needs a melee or ranged row), `supersedes`.
Seeds are reaction-free by construction. `UTILITY` seeds never deal blind.

**Keys.** `VERB_KEYS` per card (concept-level), `SHAPE_KEYS` (frame verbs),
`DENY_KEYS` (a word that forbids a card), `SENSE_DENY` (a homograph read in
its phrase: "roots up" is digging). `rankByVerb` reads phrases first and
scores concept keys above idea keys.

**The fit flow** (`fitSeat`): the shelf is filtered to the sheet's engines and
the concept's words; cards the concept's own verbs name form the *bound*
menu and the model chooses only among them. Two concept keys, or one key that
is the creature's head noun, force the bind over a "none". A miss re-pours the
concept itself into the bound card for actions; a trait has no re-pour.

**Declines** (every decline prints its reason): a meat body's trait bound only
on the idea's words or on shape alone; a nova bound on shape alone or on the
idea's words; a rider bound on shape or idea alone, on any body.

**One verb, one bind.** The concept keys an action bound are *spent*; the
trait seat reads the concept and the idea with those words masked, and a card
whose only match was a spent key leaves the race. The head noun and material
nouns are never spent.

**Owed and concept-first.** A seat's print composition (`SEAT_DEFAULT_TRAIT`,
`MECHANIC_OWED_TRAIT`) ships first, but only when the seat was earned by a key
in the words or by a made seat's type gate. When the idea path leaves the trait
seat empty, the user's words rank the trait shelf directly.

**Fallback** (`fallbackMenu`): verb-matched cards first, then blind-dealable
seeds by name hash; never a nova, never on a print body or a body chassis.
Row names are made unique at every ship site.

## The value check (`valueCheck`)

Floor and ceiling by section (a bonus action or reaction is free: ceiling
only). Under the floor: add *Success: Half*, then climb the dice toward the
budget. Never climbed: a kill clause (priced by its threshold), a recurring
tick (priced by two turns, capped at half a hit). Over the ceiling: scale the
dice down against the measured value first; gate Recharge 5-6 only when a
per-hit die still clears it. Novas are budgeted by targets and capped by
`NOVA_CAP`. Control rows are never gated.

## Header honesty (`header.mjs` and the late passes in `generate.mjs`)

- **Languages**: by mind and type; a Beast never speaks; Elementals speak
  Primordial; a Humanoid always has Common and its species' print language.
- **Speed**: the concept's movement set decides; digging phrases earn Burrow;
  a negated wing removes Fly; a trait with `requires_movement` adds its mode.
- **Weapon table**: name → range and thrown-or-not (bows, crossbows, firearms,
  arrows, bolts, thrown weapons); a launcher rolls Dexterity on both sides.
- **Humanoid gates**: energy, rider and a non-physical weapon type need the
  element family in the user's words; a natural weapon needs the concept to
  give it; "a name is not a warrant".
- **Materials and types**: material vulnerabilities, the regen off-switch,
  Immutable Form on Constructs only, the type floor's immunities, the inline
  form (rank, epithet, coined surname, then the model's declaration).

## Smoke tooling

- `npm run dev` on :5173, then `node scripts/smoke-statblock.mjs <batch>
  [--only N]` (batches in `scripts/smoke-batches/`; `SMOKE_TIMEOUT_MS`).
- `node scripts/smoke-solo.mjs <run-dir>` writes a review doc under
  `scripts/smoke-evidence/` with each sheet and the filtered trace.
- **Goldens**: `scripts/smoke-batches/goldens.json`, 26 entries, each
  pinning a route and/or an accepted template set; run after every change
  that touches the route, the catalog or the ladder. Two entries are known
  to vary by idea-call roll (the astrologer, the cauldron).
- **Day-one batches** (`day-one.json`, `day-one-two.json`): plain GM prompts
  across every family; the measurement that found no missing donor.
- Gates: `npx jest` (reskin specs under `reskin/__tests__/`), `npm run build`.

## Data

`src/data/srd52-monsters.json` (329 blocks; immunities but no resistances
field) is the print corpus; `scripts/corpus-shapes.json` the tagged shapes.
The scrape's "Ne/Day" artifacts were normalized to "N/Day" on 2026-10-01.

## Open items

- Audit-rename drift: the trace names a row before the audit renames it.
- The caster menu still offers leveled control at will.
- The replay harness: record each phase's raw responses so a verification
  rerun can hold the untouched phases fixed.
- Retiring the 2014 legacy generator onto the engine-first path.
