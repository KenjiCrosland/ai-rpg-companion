# The case: the catalog is not the problem (2026-10-21)

Five things landed today. The forty closed at **2 FAIL of 40**
(`sweep-2026-10-21T18-15-11`), Jest 115 suites / 3697 passing, build clean.

This case asks the critic to attack one conclusion in particular, stated plainly
below with its sample size, because the engine's whole catalog roadmap now rests
on it.

---

## 1. One grammar for "what condition does this row impose"

The `duplicate-mechanic` gate failed a sheet for three rows imposing Prone when
print's own Trample only TARGETS the already-prone ("one creature within 5 feet
**that has** the Prone condition"). The gate was wrong and the engine's stripping
pass was right to decline.

Cause: three copies of one grammar — the reader in `author.mjs`, a private
`imposedBy` in the checker, a private `imposedIn` in the engine. Widening the
reader fixed neither consumer. Both copies deleted; all three call one
set-returning `imposedConditions`.

The grammar cannot be made correct by alternations, and this is the evidence:

| grammar | example | truth |
|---|---|---|
| relative clause | "one creature **that has** the Prone condition" | requires |
| slot placeholder | "that has the `{consumed_condition}` condition" | requires |
| self-subject | "it gains +4 AC **and has the Prone condition**" | imposes on ITSELF |
| `if` as a gate | "**If** the target is Medium or smaller, it has the Grappled condition" | **imposes** |
| `if` as a requirement | "can't use this trait **if** it has the Incapacitated condition" | requires |

The last two have identical grammar and opposite meaning. So the WRITERS record
instead: `IMPOSES_BY_TEMPLATE` (hand-verified, 25 templates across 8
trigger/effect families, stamped at render), the grapple weld, the trait and
reaction rows from the authoring call's own `imposes` answer, and all five
library-row construction sites (three were dropping it). Four false
`imposes: Prone` tags removed from print's Trample in `donors.mjs`.

Coverage 38% → 61% on a condition-heavy twelve.

## 2. A clause the call judged is not an owed clause

Rule 1e failed two blocks and neither was a dropped clause. Vashka the Red
failed for "never breaks ranks" while the repair call had answered
`unplaced: ["description:never breaks ranks"]` — having read the finished sheet,
it judged the clause flavour. The engine discarded the verdict and failed the
block; worse, `landAuthored` only runs when the answer holds ROWS, so the prose
never reached the description either and the GM's words vanished entirely.

Both ways the call can say "this needs no new row" are now honoured and recorded
(`generation.answered_in_prose`, `answered_by_existing`). Live: Screewhelm's
"buries what it catches" credited to `Entomb`; Vault Maw's "carving with the
others" to `Multiattack`.

Not fixed by widening `claimedBy` (4-character stem overlap): "breaks"/"ranks"
share no stem with "unbroken"/"yield", nor "buries"/"catches" with
"entombs"/"grappling". Where two calls disagreed — the clause reader said
mechanical, the repair said description — the later call, holding the finished
sheet, judges.

## 3. A pre-existing escape bug, worth two false FAILs a forty

`effectOnly` in the checker carried `\\\\b` inside a template literal, which
`new RegExp` reads as a literal backslash followed by "b". That alternative
never matched from the day it was written, so rows reading "one creature within
30 feet **that is Frightened of** the X" kept their condition word and
`save-fit` demanded a Wisdom save for what is a damage row targeting the
already-frightened (the `exploiter` shape). Re-checking the SAME saved forty:
**5 FAIL → 3**.

## 4. THE CLAIM TO ATTACK — the catalog is ~93% complete

The engine now reports, on every `[gap]` line, which same-seat templates it
rejected and at which stage (`role` / `style` / `legality`). Over the forty,
**41 gap lines**:

| bucket | share | meaning |
|---|---|---|
| OVER-DECLINE | **71%** | a same-seat template WAS on the menu and the call said no |
| ROLE SHELF | 17% | none offered; same-seat ones exist but the role filter cut them |
| LEGALITY | 5% | correctly cut — wrong body type, no host row, wrong style |
| GENUINE GAP | **7%** | the catalog has nothing for that seat |

On that basis **composition was retired from the plan** — no genuine gap in
forty blocks needed two templates' effects in one row — and so was the
`on_being_hit/condition` family theory (4 of 5 genuine gaps one run, 1 of 3 the
next).

**Where this is weak, and what to attack:**

- **n = 41 gap lines from ONE forty.** The genuine-gap bucket is 3 lines. A
  second forty could plausibly read 4 or 15.
- **Three of my own earlier readings of this same data were wrong**, each in the
  direction of overstating a lever: a keyword clustering gave "four missing
  families"; a shape matrix gave 14 shapes at ~40% classification accuracy; and
  a first pass on this very instrument read **79% ROUTING** because it matched
  on trigger+effect and ignored `section` (counting `reaction` templates as
  withheld from `trait` seats). Why should the fourth reading be trusted?
- **OVER-DECLINE at 71% is asserted to be benign** because closest-acceptance
  lands the call's own named-nearest template and 1 row in 41 shipped nothing
  (against 22% of blocks at 2026-10-16). But "a row landed" is not "the right
  row landed". The blocks in this batch are the evidence; read them for whether
  second-choice rows are visibly worse.
- **Offline reconstruction of a menu was abandoned** after `heated-body` and
  `hook-drag` both appeared in rebuilt contexts and not in live ones. The
  diagnostic is therefore unverified against any independent method.

## 5. The forty is a long tail, not a work queue

| forty | FAIL |
|---|---|
| `...15-19-47` | 3 of 40 |
| `...15-59-59` | 3 of 40 |
| `...16-48-01` | 3 of 40 |
| `...17-45-29` | 3 of 40 (read 5 before the `effectOnly` fix) |
| `...18-15-11` | **2 of 40** |

The population turns over almost completely between runs. `two-novas` (Knell
Swarm) and `lack-honored` (Adult Red Dragon) repeated twice and then vanished on
the next run from the same fixed batch — so even an apparent repeat is variance.
Three defect classes were genuinely closed today and the count barely moved.

Remaining in this batch: a `lint:dangling-use-ref` / `undefined-attack-ref` pair
on one block (Shield Wall cites "Riposte even", a reference the row's own text
never defines) and `speaks-by-int` (INT 4 Monstrosity that speaks).

---

# 2024 blocks

## Review batch — sweep-2026-10-21T18-15-11

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Mire Hound | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Owlbear | 3 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Chapel Bell-Wraith | 3 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 8/8 |
| Air Elemental | 5 | 2024 | lurker-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Scree-Pit | 5 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lash-Bound Siege | 8 | 2024 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Hymn Drowned | 10 (2014) | 2014 | caster-8-binder | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 9/9 |
| Plaguefather | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |
| Purple Worm | 15 | 2024 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Glacier Heart | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 6/6 |
| Adult Red Dragon | 17 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 0/1 | 8/8 |
| Brass Tyrant | 17 | 2024 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 8/10 |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Ossuar the Bone Sun | 20 (2014) | 2014 | caster-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/10 |
| Ancient Gold Dragon | 24 (2014) | 2014 | — | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | — | — |
| Ka'ruun Trench-Singer | 24 | 2024 | lurker-17 | ok | SOFT: under | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 1/1 | 7/9 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Goblin Boss | 1 (2014) | 2014 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Vashka the Red | 6 | 2024 | defender-5 | ok | ok | FAIL: lint:dangling-use-ref, lint:undefined-attack-ref | ok | ok | ok | SOFT: print-rows | ok | ok | ok | FAIL (1) | 2/2 | 4/4 |
| Acidmaw Scytheling | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/4 | 4/4 |
| Iron Vault Sentinel | 11 (2014) | 2014 | brute-9-juggernaut | ok | user-set: AC 20 · reads CR 10 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/3 | 4/6 |
| Bog Widow | 7 | 2024 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 2/2 | 5/6 |
| Templar Reeve | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Ilvareth Dusksong | 12 (2014) | 2014 | caster-12 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Swarm of Plague-Knell Carols | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Chrism-Fed Reliquivore | 9 (2014) | 2014 | ooze-9 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Cumulus Whelp | 7 | 2024 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Grum the Cast-Out | 9 (2014) | 2014 | skirmisher-8 | ok | SOFT: band | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 2/2 | 2/3 |
| Reedmarch Sap-Keeper | 5 (2014) | 2014 | skirmisher-3 | ok | SOFT: band, hot | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/8 |
| Krennik Skullstandard | 4 (2014) | 2014 | skirmisher-3-mounted | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Brinewretch | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |
| Bileglazed Wardener | 4 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: speaks-by-int | ok | FAIL (1) | 13/14 | 6/7 |
| Meshrin | 8 (2014) | 2014 | skirmisher-8-hurler | ok | user-set: AC 16, HP 120 · reads CR 6.5 | SOFT: lint:hp-formula | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok | soft (2) | 8/8 | 7/7 |
| Ossuary Greatsword | 6 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Garrison Sellsword | 5 (2014) | 2014 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 4/4 |
| Brother Halric | 3 (2014) | 2014 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 10 of 69 user clauses** (coverage 86%); concept share 86% (179/208 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / structure: 1
- brute-5-grappler / reader: 1



---


### Dire Wolf — lowest CR

**Concept:** name: Dire Wolf | with a frost-rimed hide

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dire Wolf | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 3 → 1.5625; sustained 16 (2 × Bite); nova none; dmg 16

```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
MOD
SAVE
DEX
15
+2
+4
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
7
-2
-2

Skills Perception +5, Stealth +4

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rime-Crusted Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Clinging Murk (2/Day). The dire wolf fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the dire wolf's next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Rime-Crusted Hide — template heated-body; library draw (seed unstamped); binds the GM's words: frost+burn+rime
- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Bonus Actions/Clinging Murk — template zone-seed; library draw (seed unstamped); binds the GM's words: field

**Engine trace**

```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide that chills what it brushes [body] | pack-tactics circling and darting strikes [behavior] | the cold it drags with it into a fight [aura]
[concept] identity: A frost-rimed dire wolf opens the hunt by circling wide and driving prey toward the rest of its pack, then darts in for a snapping bite at the hamstring before wheeling out of reach. Every round it repeats the feint-and-flurry—rushing past a target, biting on the way through, and letting the killing cold of its hide rake anything that follows too close. It is animal-cunning and unsentimental; bloodied, it breaks off and lopes back into the rime to reform with its pack rather than die alone.
[concept] lore: These wolves den where the first winter froze too deep to thaw, and their frost-crusted coats carry that old cold out to steep the valleys in a false, killing autumn.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: rime = literal; Coat = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf rushes one foe in a low, wheeling feint, snapping at its legs to drive it stumbling away from the pack — then pours on speed toward a second enemy across the field, leaving the first off-balance and easy for the rest of the pack to run down. Once per fight, when it has room to circle, it does this instead of simply biting." [action/always/movement] — menu: snare, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, slow-bolt, zone-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, rally, riposte, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — slow-bolt (frost)
[reskin] word match declined by the call: slow-bolt, feint-slip, charge-push, charge — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "zone-seed" as nearest; it lands rather than the row being dropped (what it wanted: A passive/trait that makes the creature's own hide frost-rimed — a lasting defen)
[reskin] [gap] A passive/trait that makes the creature's own hide frost-rimed — a lasting defense or aura on the creature itself, not a — "The wolf rushes one foe in a low, wheeling feint, snapping at its legs to drive it stumbling away from the pack — then pours on speed toward a second enemy across the field, leaving the first off-balance and easy for the rest of the pack to run down. Once per fight, when it has room to circle, it does this instead of simply biting." — Dire Wolf [seat: action [action/always/movement]] (closest offered: zone-seed) [effect: defense] [nearest landed] [menu: slow-bolt snare shield-bash lure spew snare-bolt sensory-strike disarm thrown-burst-seed zone-seed feint-slip charge-push charge] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus phase-slip] [same-seat rejected: throw-retrieve:legality zone-seed:role]
[reskin] seat takes its clause: "Rime-Coat (2/Day)" answers "— with a frost-rimed hide" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] row renamed for uniqueness: "Rime-Coat (2/Day)" collides with a row on the sheet — "Clinging Murk (2/Day)"
[reskin] signature template: zone-seed -> Actions/"Clinging Murk (2/Day)" ("The frost-rimed hide is a cosmetic surface trait; no template carries a persiste [verb: field:idea]")
[reskin] signature idea (trait): "Its hide is crusted with killing cold, so anything that presses close against it — grappling it, clinging to it, or shoving past it — takes frostbite from the rime. The chill bites hardest when the wolf is bloodied and its coat splits open, deepening the burn until the creature backs away." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (frost)
[reskin] signature template (trait): heated-body -> Traits/"Rime-Crusted Hide" ("The rime-crusted hide punishes anything that presses close — touching or grappli [verb: frost:concept, burn:idea, rime:idea]")
[reskin] weapons answered: Bite = none
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] resistances derived: Cold
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Rime-Coat" is the seat's, not the Dire Wolf's
[reskin] dead control row: "Clinging Murk (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Ka'ruun Trench-Singer — highest CR

**Concept:** a leviathan of the trench whose song drowns fleets

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ka'ruun Trench-Singer [seed 1/2] | 24 | lurker-17 | ok | SOFT: under | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- bands · soft · under: effective HP 437 sits under print at CR 24 (468–546, n=5); the read holds at 25.5, within print's own ±1
- gates · soft · control-aoe-ungated: Actions/Luring Presence: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 24 / off 27 → 25.5; sustained 216 (3 × Hide + legendary Sound-Stalk); nova none; dmg 216

```
Ka'ruun Trench-Singer

Gargantuan Monstrosity, Neutral

AC 20
Initiative +9 (19)

HP 437 (25d20 + 175)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
25
+7
+7
INT
16
+3
+10
MOD
SAVE
DEX
28
+9
+16
WIS
18
+4
+11
MOD
SAVE
CON
24
+7
+7
CHA
14
+2
+2

Skills Perception +11, Stealth +16

Senses darkvision 300 ft., tremorsense 120 ft.; Passive Perception 21

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The trench-singer can breathe air and water.

Assassinate. During the first round of each combat, the trench-singer has Advantage on attack rolls against any creature that hasn't taken a turn. If the trench-singer hits a creature during that round, the target takes an extra 19 (3d12) Thunder damage.

Legendary Resistance (3/Day). If the trench-singer fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The trench-singer makes three Hide attacks. It can replace one attack with a use of Luring Presence.

Hide. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Luring Presence. Wisdom Saving Throw: DC 24, each creature of the trench-singer's choice within 120 feet that can see or hear the trench-singer. Failure: The target has the Charmed condition until the start of the trench-singer's next turn, and while Charmed this way, it must move toward the trench-singer by the safest available route on its turn and can't take Reactions.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the trench-singer takes the Hide action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the trench-singer can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sound-Stalk. The trench-singer moves up to half its Speed without provoking Opportunity Attacks, and it makes one Hide attack.

Deep Current. While in Dim Light or Darkness, the trench-singer takes the Hide action. The trench-singer can't take this action again until the start of its next turn.

Dread Note. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Amphibious — print's own row
- Traits/Assassinate — template assassinate; library draw (seed unstamped)
- Traits/Legendary Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Hide — the chassis
- Actions/Luring Presence — library seed lure; the GM's clause "a leviathan of the trench whose song drowns fleets"; binds the GM's words: song
- Bonus Actions/Umbral Step — the chassis
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Sound-Stalk — the chassis
- Legendary Actions/Deep Current — the chassis
- Legendary Actions/Dread Note — the chassis

**Engine trace**

```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] lurker type=Monstrosity mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: a Gargantuan body is not incorporeal — print's incorporeals are Medium and smaller | fell to lurker's plain line | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the Drowning Hymn that sinks fleets [behavior] | a body of living trench brine [body] | the unseen stalker of the lightless deep [aura]
[concept] identity: A Gargantuan trench-dweller that stalks the lightless deeps, then rises beneath a fleet as a wall of brine and hide to open with a sonar-driven slam that shatters hulls before its true weapon sounds. Every round thereafter its Drowning Hymn rolls outward in drowning waves, dragging swimmers and low-flying craft toward the seafloor while it circles unseen in the churned water, striking anything that surfaces. It does not flee — a wounded leviathan only sings deeper, and it will toy with a crippled ship for hours, herding survivors into the water before it finally lets them drown.
[concept] lore: It was spawned in the hadal dark beneath the oldest shipping lanes, and it hunts by song because sound is the only light it has ever known — each fleet it drowns becomes a new verse in the hymn it is teaching the trench.
[reskin] donor: lurker-17 -> CR 24 (invented — no printed peer)
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the trench-singer" — the call's own answer (kind), built from the name
[reskin] inline form: "the trench-singer" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The trench-singer pours its song into the water itself, and the sea begins to answer wrong. Every creature in the water around it is dragged downward and inward, pulled under and toward the singer's body as if the brine is remembering a deeper place — those it draws close end up tangled against its hide and below the surface, easy prey for the next strike, while those who burst free leave a churne" [action/save/movement] — menu: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, trample, thrown-burst, shield-bash, disarm, push-prone, herd (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, aggro-curse, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — lure (song)
[reskin] value check: "Drowning Verse" EV 5.2 vs floor 19.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Drowning Verse" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Luring Presence (Recharge 5-6)" EV 41.8 vs floor 19.8 (one attack of 3) — over the ceiling — gated Recharge 5-6
[reskin] library seed drawn: lure -> Actions/"Luring Presence (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a living wall of trench brine — anything that lands a solid blow finds salt water where meat should be, and the wound closes as the sea rushes back into it. Each time it is struck it drinks a little of the attacker's momentum into its own song, so the fight feeds it rather than draining it." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
[reskin] word match declined by the call: absorption, bloodied-burst, aberrant-ground, bloodied-fury, heated-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: landing a blow on it feeds the creature's own power rather than costing it Hit P)
[reskin] [gap] landing a blow on it feeds the creature's own power rather than costing it Hit Points — "Its hide is a living wall of trench brine — anything that lands a solid blow finds salt water where meat should be, and the wound closes as the sea rushes back into it. Each time it is struck it drinks a little of the attacker's momentum into its own song, so the fight feeds it rather than draining it." — Ka'ruun Trench-Singer [seat: trait [trait/on_being_hit/resource]] (closest offered: resonant-body) [effect: resource] [nearest landed] [menu: heated-body absorption bloodied-burst resonant-body weapon-lodge aberrant-ground bloodied-fury] [same-cell unoffered: none] [same-seat rejected: weapon-lodge:role]
[reskin] seat default: lurker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] trait declined: "Brine Tithe" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Hide = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Hide" reach 5 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] dead control row: "Luring Presence" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Luring Presence.
[reskin] row binds its clause: "Luring Presence" answers "a leviathan of the trench whose song drowns fleets" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Luring Presence) — the sameness metric
[reskin] size floor: STR 14 -> 25 — print prints no corporeal Gargantuan body under 25 (the Dragon Turtle); the attack follows it, as print's own 49 do
```


---


### Chapel Bell-Wraith — a 2024 sheet

**Concept:** a chapel bell-ringer's ghost that tolls for the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Chapel Bell-Wraith | 3 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "tolls for the dying"
- read: def 1 / off 5 → 3; sustained 38 (2 × Withering Touch); nova Wail 6; dmg 38

```
Chapel Bell-Wraith

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+3
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Toll-Bound Mark. The bell-wraith knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Ethereal Sight. The bell-wraith can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The bell-wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The bell-wraith makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Wail (1/Day). Constitution Saving Throw: DC 13, each creature within 30 feet of the bell-wraith that can hear it. Failure: 6 (1d12) Necrotic damage, and if the target has 6 Hit Points or fewer after taking this damage, it drops to 0 Hit Points. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the bell-wraith and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the bell-wraith's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the bell-wraith can see within 5 feet. Failure: The target is possessed by the bell-wraith; the bell-wraith disappears, and the target has the Incapacitated condition and loses control of its body. The bell-wraith now controls the body, but the target retains awareness. The bell-wraith can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The bell-wraith's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the bell-wraith leaves as a Bonus Action. When the possession ends, the bell-wraith appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The bell-wraith casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The bell-wraith is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Withering Touch — print's own row, renamed
- Actions/Wail — template wail; library draw (seed unstamped)
- Actions/Horrific Visage — print's own row
- Actions/Possession — print's own row
- Actions/Etherealness — print's own row
- Traits/Toll-Bound Mark — template faultless-tracker; library draw (seed unstamped); binds the GM's words: marked+its mark
- Traits/Ethereal Sight — print's own row
- Traits/Incorporeal Movement — print's own row

**Engine trace**

```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost that tolls ") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost who tolls f…" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: tolling the bell for the dying [behavior] | a grave-cold spectral tolling that drains the living [aura] | the chapel bell and rope it still serves [object]
[concept] identity: The bell-ringer's ghost drifts through the chapel walls, first tolling a slow, mournful knell that marks a living soul as dying; those who hear it feel their life-force begin to seep away. Each round after, it glides to the marked victim and reaches out with grave-cold hands that drain vitality, and it flinches from radiant light or holy ground but will not abandon its tolling while a chosen soul still draws breath. It is a patient, sorrowful harrier — not a berserker — hoarding its victims in the bell tower until their last breath leaves them.
[concept] lore: A bell-ringer who died mid-peal, still bound to the rope and the rite, this ghost rings for the dying so that no soul passes unheralded — and it drags the living into its tower to make sure the bell is never silent.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the bell-wraith" — the call's own answer (kind), built from the name
[reskin] inline form: "the bell-wraith" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "tolls for the dying" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: at_will/save_single]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wraith lays a hand on the rope and tolls a slow knell that only the living can hear, marking every breathing soul within earshot as dying. Each marked victim feels their warmth seep away in a creeping chill that no wound explains, and the toll can only fall once, so the wraith must wait before it can pick out new names." [action/save/damage] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, trample, snare, shield-bash, push-prone, thrown-burst-seed, curse-debt (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (toll, bell)
[reskin] pick kept on the GM's own words: action — "wail" has no key-table verb, but the call quotes "a chapel bell ringer's ghost that tolls for the dying" from the description
[reskin] seat takes its clause: "Wail (1/Day)" answers "a chapel bell-ringer's" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: wail -> Actions/"Wail (1/Day)" ("the bell tolls a knell only the living hear, marking every breathing soul in ear [shape fit, no verb match]")
[reskin] signature idea (trait): "While a soul it has tolled for still breathes, the bell-wraith cannot be turned aside from it and renews its mark whenever the wraith's grave-cold hands meet that victim's flesh, deepening the drained chill afresh." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, berserk (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (toll, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, death-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): faultless-tracker -> Traits/"Toll-Bound Mark" ("the wraith cannot be turned aside from the soul it tolled for and keeps its mark [verb: marked:idea, its mark:idea]")
[reskin] weapons answered: Grave-Hands = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave-Hands" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the bell-wraith makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] threshold re-derived after the cap: Actions/Wail (1/Day) — 20 over the row's own 6 damage, so the kill branch beat the damage branch; threshold to 6
[reskin] asked but unanswered: "tolls for the dying" asked for at_will and no row binds the clause
audit finding below confidence gate: Etherealness The entry claims the wraith is visible across planes but gives no sight range or sense enabling Material creatures to perceive an Ethereal wraith, so the claim cannot be adjudicated.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rewrite blocked — "Possession (Recharge 6)" is engine-authored chassis text
[reskin] audit rewrite blocked — "Etherealness" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Air Elemental — one marked soft

**Concept:** name: Air Elemental | that carries stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Air Elemental | 5 | lurker-5 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Stolen Chorus: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 5 / off 5 → 5; sustained 28 (2 × Thunderous Slam); nova Whirlwind 24; dmg 28

```
Air Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 90 (12d10 + 24)

Speed 10 ft., Fly 90 ft. (hover)

MOD
SAVE
STR
14
+2
+2
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+8
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
6
-2
-2

Skills Perception +3, Stealth +11

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Mimicry. The air elemental can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Chorus.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Chorus. Wisdom Saving Throw: DC 13, each creature of the air elemental's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Thunderous Slam — print's own row, renamed
- Actions/Stolen Chorus — template terror-pulse; library draw (seed unstamped); binds the GM's words: scream
- Actions/Whirlwind — print's own row
- Traits/Mimicry — template mimicry; library draw (seed unstamped); the GM's clause "carries stolen voices"; binds the GM's words: stolen voice+stolen voices+voices
- Traits/Air Form — print's own row

**Engine trace**

```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] lurker type=Elemental mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker: ✓ ("carries stolen voices") | lurker: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Elemental themes=elemental/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stolen voices echoing from the wind [behavior] | a body of swirling storm-air [body] | an invisible plunging ambush [behavior]
[concept] identity: A shrieking vortex of storm-wind that keeps the voices it has torn from the dying, opening with a plunging dive that strikes from unseen air and leaves its victim's own scream ringing in the gale. It then melts back into the sky, circling invisibly while stolen voices babble from every direction to scatter and unnerve its prey, before descending again on the loudest or loneliest. It is a jealous collector: when wounded it does not flee but howls with a chorus of the stolen, redoubling its fury to silence and swallow the one who dared to make it bleed.
[concept] lore: Born where a great storm passed over a battlefield and drank the last words of the dying, this elemental wanders the wild places hunting fresh voices to add to the many it already carries, and it grows ever more unwilling to let any living throat stay unclaimed.
[reskin] print canon defenses: HP 73 -> 90, AC 15 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: lurker-5 -> CR 5
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The elemental drags up one of the voices it has swallowed and hurls it at a foe as a screaming echo — the stolen sound lashes out from the wind and, for a moment, the victim hears the dead speaking in their own familiar tongue. Whoever is caught by it is shaken and rattled, their ears full of the chorus, until the sky quiets again." [action/save/condition] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, snare, shield-bash, push-prone, reveal (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature template: terror-pulse -> Actions/"Stolen Chorus (2/Day)" ("the stolen voice lashes out as a screaming echo and leaves the victim shaken and [verb: scream:idea]")
[reskin] signature idea (trait): "The voices it has swallowed never stop murmuring inside the swirling storm-air that makes up its body — whenever it is struck or startled, the chorus babbles out around it, a wall of stolen cries and warnings rising from every direction. Foes close to it grow unnerved and confused by the overlapping dead, struggling to tell which sound is the elemental and which is only memory." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] signature template (trait): mimicry -> Traits/"Mimicry" ("the elemental carries stolen voices that babble out of its storm-body, sounds ot [verb: stolen voice:concept, stolen voices:concept, voices:concept]")
[reskin] weapons answered: Gale Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gale Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the air elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Air Elemental's
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] dead control row: "Stolen Chorus" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Stolen Chorus.
[reskin] row binds its clause: "Mimicry" answers "carries stolen voices" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Brass Tyrant — bands soft

**Concept:** a tyrant of burning brass who rules a city of forges

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brass Tyrant [seed 1/2] | 17 | brute-17-juggernaut | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 22, 5 over; the HP axis pulls the read to 17.5
- **dropped clause:** "rules a city of forges"
- read: def 13 / off 22 → 17.5; sustained 170 (2 × Brass Fist + legendary Crushing Advance); nova Furnace Vent 72; dmg 170

```
Brass Tyrant

Huge Construct, Neutral Evil

AC 19
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
20
+5
+11
CHA
4
-3
-3

Skills Athletics +12, Perception +6

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft.; Passive Perception 16

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Forge-Fevered Brass. A creature that touches the tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Brass Fist attacks. It can replace one attack with a use of Furnace Brand.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 20 (4d6 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Vent (Recharge 5-6). Wisdom Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 72 (16d8) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Furnace Brand. Wisdom Saving Throw: DC 19, one creature within 60 feet that has the Frightened condition. Failure: 71 (13d10) Fire damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crushing Advance. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Shoulder Through. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Quake Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Forge-Fevered Brass — template heated-body; library draw (seed unstamped); binds the GM's words: burn+brass+heat
- Traits/Legendary Resistance — the chassis
- Traits/Immutable Form — the chassis
- Traits/Siege Monster — the chassis
- Actions/Multiattack — the chassis
- Actions/Brass Fist — the chassis
- Actions/Furnace Vent — the chassis
- Actions/Furnace Brand — library seed condition-payoff
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Crushing Advance — the chassis
- Legendary Actions/Shoulder Through — the chassis
- Legendary Actions/Quake Stomp — the chassis

**Engine trace**

```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a body of burning brass [body] | ruling a city of forges [behavior] | an aura of furnace-heat [aura]
[concept] identity: The Brass Tyrant opens by wading straight through the forge-city's own walls and furnaces, shouldering rubble and molten runoff aside until it is among the defenders; every round after that it swings its burning fists and vents furnace-heat through the brass seams of its body, melting shield and spear alike. Cornered or bloodied it does not retreat — it plants itself in the middle of the wreckage and fights to the death with a king's contempt for anyone who would take its forges, and it stops only when its brass body cools and cracks.
[concept] lore: Poured in the first furnace of a city built for nothing but smelting, the Brass Tyrant seized the forges as its throne and now rules the smoke-choked streets, demanding every ingot and every hour of the smiths' labor as tribute to itself.
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant wrenches loose a glowing-hot hunk of brass from its own seams and hurls it at a foe, and wherever the slag lands it keeps burning — a stubborn puddle of molten metal that sprawls across the ground and clings to whoever steps through it, so the streets themselves become the tyrant's furnace. It can do this repeatedly, but each hurled chunk leaves its body a little dimmer until it cools a" [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The tyrant wrenches loose a glowing-hot hunk of brass from i…" is tried as an action
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant wrenches loose a glowing-hot hunk of brass from its own seams and hurls it at a foe, and wherever the slag lands it keeps burning — a stubborn puddle of molten metal that sprawls across the ground and clings to whoever steps through it, so the streets themselves become the tyrant's furnace. It can do this repeatedly, but each hurled chunk leaves its body a little dimmer until it cools a" [action/save/damage] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, execute, curse-debt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature miss: action — "The tyrant wrenches loose a glowing-hot hunk of brass from its own seams and hurls it at a foe, and wherever the slag lands it keeps burning — a stubborn puddle of molten metal that sprawls across the ground and clings to whoever steps through it, so the streets themselves become the tyrant's furnace. It can do this repeatedly, but each hurled chunk leaves its body a little dimmer until it cools a" [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: condition-payoff, shield-bash, escalating-dread, terror-pulse, herd, drain, exploiter, execute, curse-debt, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] value check: "Merciless Strike" EV 59.8 vs floor 45.5 (one attack of 2) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its brass body is never merely warm: steel that strikes it drinks the forge-heat, and weapons that bite into the seams come away warped, softened, and ruined by the contact. Anyone who closes to grapple or shove it learns the same lesson on their hands." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, brass)
[reskin] signature template (trait): heated-body -> Traits/"Forge-Fevered Brass" ("Steel that strikes its brass body drinks the forge-heat, and weapons or hands th [verb: burn:concept, brass:concept, heat:idea]")
[reskin] weapons answered: Brass Fist = none; Furnace Vent = none; Molten Dread = none; Crushing Advance = none; Shoulder Through = none; Quake Stomp = none
[reskin] chassis nova: "Furnace Vent (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] save stat from print grammar: Actions/Furnace Vent imposes Frightened by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Furnace Vent — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] audit rename: "Merciless Strike" -> "Furnace Brand"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Furnace Brand) — the sameness metric
```


---


### Bileglazed Wardener — bands soft

**Concept:**  | role: brute

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bileglazed Wardener [seed 1/2] | 4 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: speaks-by-int | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 1–6, n=66)
- reader · fail · speaks-by-int: INT 4 on a Monstrosity speaks "Wardener understands the intruders' tongues but does not speak." — print has none of 19 Monstrosities, 88 Beasts or 4 Oozes at INT 5 or less speaking a tongue
- **dropped clause:** "picks the weakest and readiest target"
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Jaws); nova Threshold Execute 22; dmg 26

```
Bileglazed Wardener

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+3
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Wardener understands the intruders' tongues but does not speak.

CR 4 (XP 1,100; PB +2)

Traits

Amphibious. The wardener can breathe air and water.

Rooted Guardian. While the wardener is on the ground, the wardener cannot be moved against its will, and it refuses to abandon its post no matter what bait or lure is presented.

Glistening Bile. A creature that touches the wardener or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Acid damage.

Actions

Multiattack. The wardener makes two attacks, using Jaws or Bite in any combination.

Jaws. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14).

Bite. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Acid damage.

Threshold Execute (1/Day). Constitution Saving Throw: DC 13, one creature the wardener can see within 60 feet. Failure: If the target has 20 Hit Points or fewer, it has the Unconscious condition for 1 hour, until it takes damage, or until a creature within 5 feet of it takes an action to wake it. Otherwise, it takes 22 (5d8) Acid damage. Success: Half damage only.

Bonus Actions

Swallow. The wardener swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the wardener, and takes 6 (1d12) Acid damage at the start of each of the wardener's turns. The wardener can have only one creature swallowed at a time. If the wardener takes 12 damage or more in a single turn from the swallowed creature, the wardener must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the wardener. If the wardener dies, a swallowed creature exits the body Prone by using 5 feet of movement.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Jaws — authored for this sheet; a named part; the GM's clause "lunges to clamp its jaws onto the nearest limb"
- Actions/Bite — authored for this sheet; a named part; the GM's clause "rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike"
- Actions/Threshold Execute — library seed execute; the GM's clause "otherwise fights until killed"; binds the GM's words: kill+death
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Traits/Amphibious — print's own row
- Traits/Rooted Guardian — authored for this sheet; the GM's clause "It will not leave its ground for any bait"
- Traits/Glistening Bile — template heated-body; library draw (seed unstamped); the GM's clause "rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike"; binds the GM's words: acid+burn+touch

**Engine trace**

```
[path] blank — "role: brute" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "lunges to clamp its jaws onto the neares" | brute-grappler: ✓ ("lunges to clamp its jaws onto the neares") | brute-grappler: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Monstrosity themes=subterranean/venomous mind=sapient style=grappler lore=✓
[concept] synthesis text: The Brakketh is a squat, stone-hard reptile of the deep Underdark, its overlapping scales glazed with a slick of its own bile so that the whole hulking body reads as one dense, armored wedge wedged into a tunnel mouth it has claimed for life. It fights only on its home ground: it drops its head and shoulders, wedges itself across the passage, and lunges to clamp its jaws onto the nearest limb, then rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike. It will not leave its ground for any bait, but it is no dumb animal — it reads the intruders' speech, picks the weakest and readiest target, retreats only to a narrower passage where its bulk wins, and otherwise fights until killed. It is fully sapient (INT 10-14), and it is a territorial guardian that defends its home ground to the death.
[concept] signature elements: acid-flooded locking bite [behavior] | bile-glazed overlapping scales [body] | wedge-bodied tunnel-blocking brace [behavior]
[concept] name proposal: Brakketh
[concept] lore: Brakkeths are cavern-bred guardians that claim a single junction or vein-mouth as territory for their whole long lives, and they will parley in broken Underdark-speech with anyone who asks leave to pass — and eat anyone who does not.
[reskin] donor: brute-5-grappler -> CR 4
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] named parts: Jaws (slot, Grappled), Bite (clone) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the wardener" — the call's own answer (kind), built from the name; the rules would have said "Wardener"
[reskin] inline on kit rows: "Wardener" -> "the wardener"
[reskin] inline form: "the wardener" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "It will not leave its ground for any bait" reads like a lack to the words, and the call's list did not name it
[reskin] lacks not claimed: "but it is no dumb animal — it reads the intruders' speech" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "The Brakketh is a squat" -> has (descriptive), head | "stone-hard reptile of the deep Underdark" -> has (descriptive) | "its overlapping scales glazed with a slick of its own bile so that the whole hulking body reads as one dense" -> has (descriptive) | "armored wedge wedged into a tunnel mouth it has claimed for life" -> has (mechanical) | "It fights only on its home ground: it drops its head and shoulders" -> has (mechanical) [asked: resist] | "wedges itself across the passage" -> has (descriptive) | "lunges to clamp its jaws onto the nearest limb" -> has (mechanical) [asked: attack] | "rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike" -> has (mechanical) [asked: on_hit/attack] | "It will not leave its ground for any bait" -> has (mechanical) [asked: resist] | "but it is no dumb animal — it reads the intruders' speech" -> has (mechanical) [asked: buff_self] | "picks the weakest and readiest target" -> has (mechanical) [asked: condition] | "retreats only to a narrower passage where its bulk wins" -> has (mechanical) [asked: resist] | "otherwise fights until killed" -> has (mechanical) [asked: resist] | "It is fully sapient (INT 10-14)" -> has (descriptive) | "it is a territorial guardian that defends its home ground to the death" -> has (mechanical) [asked: resist]
[reskin] signature idea (action): "The wardener braces low across the tunnel mouth, then hurls its whole slicked bulk forward in a grinding lunge, driving anything caught in front of it back along the passage and down onto the stone. Creatures shoved into walls or other bodies are crushed and scoured by its bile-soaked scales as it plows through." [action/save/movement] — menu: leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, execute, blighted-ground, seal, wail, lure, pull-through, pacify, snare-bolt (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, rampage, patient-defense, lay-on-hands, affliction, contagion, charge-push, pounce)
[reskin] signature bound to the concept's verb: action — execute, blighted-ground (kill, death, ground, slick)
[reskin] closest accepted: action — the call refused every template but named "charge-push" as nearest; it lands rather than the row being dropped (what it wanted: on a hit, grabs the target and drags it down along the lunge instead of shoving )
[reskin] [gap] on a hit, grabs the target and drags it down along the lunge instead of shoving it away — "The wardener braces low across the tunnel mouth, then hurls its whole slicked bulk forward in a grinding lunge, driving anything caught in front of it back along the passage and down onto the stone. Creatures shoved into walls or other bodies are crushed and scoured by its bile-soaked scales as it plows through." — Bileglazed Wardener [seat: action [action/save/movement]] (closest offered: charge-push) [effect: condition] [nearest landed] [menu: execute blighted-ground leap condition-payoff shield-bash active-toll random-ray ground-burst spew herd thrown-burst-seed drain wind-up exploiter seal wail lure pull-through pacify snare-bolt charge-push] [same-cell unoffered: reel hook-drag aggro-curse obstacle-pull slow-bolt disarm] [same-seat rejected: swallow:legality trample:style thrown-burst:style gaze-single:role snare:role reel:role execute:role seal:role lure:role hook-drag:legality pull-through:role burrow-ambush:legality obstacle-pull:role pacify:role escalating-dread:legality terror-pulse:legality snare-bolt:role slow-bolt:role sensory-strike:role disarm:role push-prone:legality curse-debt:role reveal:role blighted-ground:role]
[reskin] rider declined: "Grinding Lunge" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] value check: "Threshold Execute (1/Day)" EV 17.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — added Success: Half; dice 14 → 22 (nova budget); priced at the cap — the floor sits above the nova cap, so the cap is the price
[reskin] library seed drawn: execute -> Actions/"Threshold Execute (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its bile glaze never dries: anyone who strikes the wardener or is pressed against it in a grapple comes away smeared with caustic slick, which keeps eating at whatever it touches until the victim scrubs it off or it burns itself out." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, evasion, guarded-stance, blurred-form)
[reskin] signature bound to the concept's verb: trait — heated-body, aberrant-ground, death-burst (acid, slick, death)
[reskin] signature template (trait): heated-body -> Traits/"Glistening Bile" ("the caustic bile glaze smears and keeps eating at anything that strikes the ward [verb: acid:concept, burn:idea, touch:idea]")
[reskin] repair: 2 clause(s) with no row — "It will not leave its ground for any bait", "but it is no dumb animal — it reads the intruders' speech"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["languages:but it is no dumb animal — it reads the intruders' speech","description:but it is no dumb animal — it reads the intruders' speech"]
[reskin] clause answered in prose: "but it is no dumb animal — it reads the intruders' speech" — the call read the sheet and judged it languages, not a row; the words reach the languages line instead
[reskin] clause answered in prose: "but it is no dumb animal — it reads the intruders' speech" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 2 clause(s) unplaced
[reskin] weapons answered: Jaws = none
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "Undercommon" -> "None" (sapient)
[reskin] save follows the effect: Actions/"Threshold Execute (1/Day)" Wisdom -> Constitution — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] row binds its clause: "Threshold Execute" answers "otherwise fights until killed" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Glistening Bile" answers "rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "rides the thrashing victim down while the acid its gullet secretes floods the bite and pits armor and bone alike" -> "Bite" — trigger: asked on_hit, row reads at_will
audit finding below confidence gate: Threshold Execute (1/Day) The save is adjudicated against a target up to 60 feet away, but the wake clause references a creature within 5 feet of the unconscious target without stating whether the waker must be an ally or any creature, leaving the ending condition ambiguous.
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Threshold Execute (1/Day)) — the sameness metric
[reskin] unplaced to Languages: "but it is no dumb animal — it reads the intruders' speech"
```


---


### Lash-Bound Siege — in the run

**Concept:** a siege-engine golem of lashed timber that shoulders through walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Lash-Bound Siege | 8 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shoulders through walls"
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Splintered Ram); nova Crushing Leap 27; dmg 54

```
Lash-Bound Siege

Huge Construct, Neutral

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Lightning Absorption. Whenever the siege is subjected to Lightning damage, it takes no damage and instead regains a number of Hit Points equal to the Lightning damage dealt.

Immutable Form. The siege can't shape-shift.

Magic Resistance. The siege has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The siege makes two Splintered Ram attacks.

Splintered Ram. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage.

Crushing Leap (Recharge 5-6). The siege spends 5 feet of movement to jump to a space within 20 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 16, each creature in the destination space. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Lightning Absorption — the chassis
- Traits/Immutable Form — the chassis
- Traits/Magic Resistance — the chassis
- Actions/Multiattack — the chassis
- Actions/Splintered Ram — the chassis
- Actions/Crushing Leap — template leap; library draw (seed unstamped)

**Engine trace**

```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("a siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct themes=forged/armed mind=sapient style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | lashed timber frame with a binding rune [body] | hurling torn wreckage as a volley [behavior]
[concept] identity: The siege-golem does not duel — it picks the weakest span of wall and shoulders through it, hurling the wreckage ahead of itself as a first volley. Every round after, it stays on that straight line: charging the nearest structure or shield-wall and crushing what it pins, splintering and re-lashing its own ribs as the timber is torn away. It is a single-minded engine with no retreat in it — pressure and damage do not make it pause, only redirect, and it fights until the frame that holds its binding rune is reduced to kindling.
[concept] lore: A desperate army lashed a war-engine together from scaffold beams, siege towers, and the bones of its own dead ram, then bound a siege-spirit into the timber to march before the host; it still seeks the next wall it was promised.
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the siege" — the call's own answer (kind), built from the name
[reskin] inline form: "the siege" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The siege lowers its splintered head and drives forward in a straight line, shouldering through anything built to stop it — walls, barricades, shield-walls. The frame burst sprays wreckage ahead of it, so everything caught in that line is crushed and flung aside as the golem plows onto the far side." [action/always/movement] — menu: leap, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, obstacle-pull, slow-bolt, disarm, zone-seed (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, blink, feint-slip, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — own-turn-punisher (lash)
[reskin] closest accepted: action — the call refused every template but named "leap" as nearest; it lands rather than the row being dropped (what it wanted: charges in a straight line and deals damage and knocks prone or flings aside eve)
[reskin] [gap] charges in a straight line and deals damage and knocks prone or flings aside everything in that line — "The siege lowers its splintered head and drives forward in a straight line, shouldering through anything built to stop it — walls, barricades, shield-walls. The frame burst sprays wreckage ahead of it, so everything caught in that line is crushed and flung aside as the golem plows onto the far side." — Lash-Bound Siege [seat: action [action/always/movement]] (closest offered: leap) [effect: damage] [nearest landed] [menu: own-turn-punisher leap throw-retrieve shield-bash active-toll random-ray ground-burst spew escalating-dread terror-pulse push-prone herd thrown-burst-seed drain wind-up obstacle-pull slow-bolt disarm zone-seed rally] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility focus feint-slip phase-slip] [same-seat rejected: zone-seed:role]
[reskin] pick kept on the GM's own words: action — "leap" has no key-table verb, but the call quotes "shoulders through walls" from the description
[reskin] value check: "Crushing Leap (Recharge 5-6)" EV 71.6 vs floor 14 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: leap -> Actions/"Crushing Leap (Recharge 5-6)" ("The idea is a line-charging bull rush that crushes and flings creatures in a str [shape fit, no verb match]")
[reskin] signature idea (trait): "Every time the siege tears through a structure or a pinned foe, it rips away timber and re-lashes its own ribs, rebuilding its frame as it advances. The binding rune can't be struck at until that self-repair is spent, and what it lashes back on stays lashed." [trait/on_being_hit/resource] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "Every time the siege tears through a structure or a pinned foe, it rips away timber and re-lashes its own ribs, rebuilding its frame as it advances. The binding rune can't be struck at until that self-repair is spent, and what it lashes back on stays lashed." [trait/on_being_hit/resource] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Splintered Ram = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Lightning, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Splintered Ram" reach 5 → 10 ft. on a Huge body (print's modal reach at that size)
audit finding below confidence gate: Crushing Leap No trigger, area, target, or end condition is missing here, but the statement "pushed 5 feet straight away" provides no direction reference—'straight away' from what point (the siege's pre- or post-landing position)? — leaving the push direction ambiguous.
audit finding below confidence gate: Crushing Leap A saving throw to avoid being crushed by a Huge Construct's body is a nimbleness dodge, which is fine, but 'each creature in the destination space' is a set determined only by the siege's landing at adversary discretion—the affected set is not fixed until the siege chooses its space, apparently after resolving, which makes targeting self-selecting.
audit finding below confidence gate: Crushing Leap Prone has its own written escape (standing up), so this is not a defect on its face—but combined with the push on success, a failed save leaves the creature prone *in the siege's occupied destination space* with no rule for whether it is grappled/pinned or simply shares the space.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Stone Golem — in the run

**Concept:** name: Stone Golem | carved as a weeping saint

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 9 → 10; sustained 48 (2 × Slam); nova none; dmg 48

```
Stone Golem

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+10
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+9
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Bonus Actions

Gaze Lock. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: Until the start of the stone golem's next turn, the target has Disadvantage on attack rolls against creatures other than the stone golem.

Slow (Recharge 5-6). The stone golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Slam — print's own row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Bonus Actions/Gaze Lock — template aggro-curse; library draw (seed unstamped); binds the GM's words: mark
- Bonus Actions/Slow — print's own row
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — print's own row

**Engine trace**

```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem — carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct themes=grave/forged mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: a saint's statue that weeps as it kills [behavior] | carved stone body with a draped pedestal base [body] | slow, unbreakable juggernaut advance [behavior]
[concept] identity: The weeping saint opens a fight by planting itself and simply walking forward through whatever stands in its path, stone fists swinging in flat, patient arcs that shatter shields and ribcages alike. Each round thereafter it advances toward the loudest, brightest target, its carved face streaming tears that run down the pedestal-drape of its own body while it grinds foes against walls and floor. It does not flee and cannot be reasoned with — under pressure it only redoubles its slow, relentless advance, weeping all the harder as it kills.
[concept] lore: A mourning sculptor carved her grief into a saint of stone and it stepped off its pedestal at her funeral, still crying for a grief it can neither name nor stop.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the stone golem" — the call answered "the stone golem" (kind), which the name does not support
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] signature idea (action): "The golem's carved face floods with tears that run down its drape — when it strikes a foe, the grief-slick stone of its fist leaves a spreading stain of weeping on the victim, so anyone freshly hit feels the same sorrow and stalls in place, unwilling to move closer to the thing that hurt them. The golem itself only weeps harder: it turns toward whoever it just marked and keeps walking, and the mar" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge, bolt-restrain, bolt-mark (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] closest accepted: action — the call refused every template but named "aggro-curse" as nearest; it lands rather than the row being dropped (what it wanted: a sticky mark on the hit target that stops it from closing on the golem, forcing)
[reskin] [gap] a sticky mark on the hit target that stops it from closing on the golem, forcing it to hold its ground — "The golem's carved face floods with tears that run down its drape — when it strikes a foe, the grief-slick stone of its fist leaves a spreading stain of weeping on the victim, so anyone freshly hit feels the same sorrow and stalls in place, unwilling to move closer to the thing that hurt them. The golem itself only weeps harder: it turns toward whoever it just marked and keeps walking, and the mar" — Stone Golem [seat: action [rider/on_hit/condition]] (closest offered: aggro-curse) [effect: movement] [nearest landed] [menu: stunning-strike charge-push hook-rider pounce charge bolt-restrain bolt-mark trample escalating-dread aggro-curse] [same-cell unoffered: affliction contagion snatch] [same-seat rejected: affliction:legality contagion:legality isolation:role snatch:legality bolt-restrain:role bolt-drag:role bolt-mark:role]
[reskin] seat takes its clause: "Weeping Stain" answers "— carved as a weeping saint" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: aggro-curse -> Bonus Actions/"Weeping Stain" ("The golem's carved face floods with tears that run down its drape — when it strikes a foe, the grief-slick stone of its fist leaves a spreading stain of weeping [verb: mark:idea]")
[reskin] signature idea (trait): "The saint's pedestal-drape is not cloth but carved stone that sheds tears in a constant runoff; ground the golem walks over is left slick with wept stone, and it never loses footing or gets slowed by anything that would push or trip it — its carved base simply grinds forward over rubble, grease, or broken ground as if it were level pavement." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: aberrant-ground, false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Weeping Foundation" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Fist = none; Hurlstone = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Hurlstone" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] audit rename: "Weeping Stain" -> "Gaze Lock"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Plaguefather — in the run

**Concept:** a plague-bearing archon of flies that commands lesser swarms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plaguefather [seed 1/2] | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 9 / off 15 → 12; sustained 87 (3 × Slam); nova none; dmg 87

```
Plaguefather

Large Fiend, Lawful Evil

AC 18
Initiative +2 (12)

HP 190 (20d10 + 80)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
13
+1
+1
MOD
SAVE
CON
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Scattering Motes. A creature that touches the plaguefather or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Poison damage.

Aura of Authority. While in a 10-foot Emanation originating from the plaguefather, the plaguefather and its allies have Advantage on attack rolls and saving throws, provided the plaguefather doesn't have the Incapacitated condition.

Actions

Multiattack. The plaguefather makes three attacks, using Slam or Sting in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Poison damage.

Sting. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Piercing damage.

Bonus Actions

Plaguefather's Decree (2/Day). Each ally within 30 feet of the plaguefather gains 14 (4d6) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Scattering Motes — template heated-body; library draw (seed unstamped); binds the GM's words: plague
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Slam — the chassis
- Actions/Sting — the chassis
- Bonus Actions/Plaguefather's Decree — library seed rally; the GM's clause "commands lesser swarms"; binds the GM's words: command

**Engine trace**

```
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] name: provided_name rejected — "a plague-bearing archon of flies that co…" is the description, not a name
[concept] hints: winged→style ✓ ("archon of flies") | swarm→body ✓ ("commands lesser swarms")
[concept] resolve: archetype=defender type=Fiend themes=fiendish/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: command over lesser fly swarms [behavior] | a body that is itself a living plague-cloud [body] | the drone and stench of the swarm [aura]
[concept] identity: The Plaguefather opens combat by loosing a droning cloud of its own body — the archon dissolves into a biting insect haze that spreads across the field and settles into lesser swarms that harry and sicken its foes. Every round after, it reforms among its brood to direct them, slamming diseased strikes into any attacker while its children multiply around the wounded. Faced with real resistance it does not flee — it draws the whole battlefield into its swarm, fighting to the last mote of its corrupted flesh.
[concept] lore: Born from a cyst in the Abyss where the first pestilence took root, the Plaguefather seeks only to spread its filth until every living thing carries its mark.
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the plaguefather" — the call's own answer (kind), built from the name
[reskin] inline form: "the plaguefather" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: save_area]
[reskin] signature idea (action): "The Plaguefather pours a portion of its own swarm-body outward, and that cloud moves across the field on its own, drifting where the Plaguefather wills it each round. Anyone caught inside the roiling mass is bitten and stung from every side, and the cloud can be pushed toward a cluster of foes or wrapped around an isolated one. The Plaguefather can only keep so much of itself abroad at once, so th" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, trample, thrown-burst, gaze-single, snare, execute, lure (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, coating, riposte, stunning-strike, charge-push, hook-rider, contagion)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] word match declined by the call: contagion, herd — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "active-toll" as nearest; it lands rather than the row being dropped (what it wanted: a lasting cloud the creature can move each round, dealing damage to anyone insid)
[reskin] [gap] a lasting cloud the creature can move each round, dealing damage to anyone inside it rather than a one-time burst — "The Plaguefather pours a portion of its own swarm-body outward, and that cloud moves across the field on its own, drifting where the Plaguefather wills it each round. Anyone caught inside the roiling mass is bitten and stung from every side, and the cloud can be pushed toward a cluster of foes or wrapped around an isolated one. The Plaguefather can only keep so much of itself abroad at once, so th" — Plaguefather [seat: action [action/always/damage]] (closest offered: active-toll) [effect: damage] [nearest landed] [menu: contagion throw-retrieve seal shield-bash active-toll random-ray ground-burst obstacle-pull terror-pulse slow-bolt disarm push-prone herd curse-debt reveal wind-up trample thrown-burst gaze-single snare execute lure] [same-cell unoffered: assassinate death-burst own-turn-punisher coating] [same-seat rejected: zone-seed:role]
[reskin] signature miss: action — "The Plaguefather pours a portion of its own swarm-body outward, and that cloud moves across the field on its own, drifting where the Plaguefather wills it each round. Anyone caught inside the roiling mass is bitten and stung from every side, and the cloud can be pushed toward a cluster of foes or wrapped around an isolated one. The Plaguefather can only keep so much of itself abroad at once, so th" [action/always/damage] — the model picked "active-toll" (no verb, and it quotes nothing the GM typed) over a concept-verb template (contagion, herd, rally)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Plaguefather's body is itself a living plague-cloud; whenever it is struck, motes of it scatter and cling to the attacker, an unclean bite that lingers on whoever raised a hand against it. Each time flesh meets its flesh, that creeping filth sinks deeper into the striker." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature template (trait): heated-body -> Traits/"Scattering Motes" ("whenever it is struck in melee, the plague-cloud scatters onto the attacker and  [verb: plague:concept]")
[reskin] weapons answered: Slam = none; Sting = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] row binds its clause: "Bolstering Cry" answers "commands lesser swarms" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Aura of Authority A plague-themed Fiend's aura grants the name 'Authority' but its effect is a generic combat buff with no command/presence mechanic, making the name-content fit weak.
[reskin] audit rename blocked — "Corrosive Sanctity" claims an element "Scattering Motes" does not pay (Poison)
[reskin] audit rename: "Bolstering Cry (2/Day)" -> "Plaguefather's Decree (2/Day)"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Plaguefather's Decree (2/Day)) — the sameness metric
```


---


### Purple Worm — in the run

**Concept:** name: Purple Worm | that swallowed a war-band's armoury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Purple Worm | 15 | brute-13 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 12 / off 11 → 11.5; sustained 51 (1 × Tail Stinger); nova none; dmg 51

```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+14
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
-1
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Senses tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Lodged Armoury. When a creature hits the purple worm with a nonmagical weapon, the weapon lodges in the purple worm's body. A lodged weapon can be pulled free by a creature within reach that succeeds on a DC 21 Strength (Athletics) check as an action; while lodged, the purple worm can use it: its Bite attacks deal an extra 22 (5d8) Acid damage per lodged weapon (maximum two).

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Gullet Armory.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Gullet Armory. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee attack this turn. Failure: 42 (12d6) Acid damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 22 (5d8) Acid damage at the start of each of the purple worm's turns. If the purple worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the purple worm and has the Prone condition. If the purple worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Bite — print's own row
- Actions/Tail Stinger — print's own row
- Actions/Gullet Armory — template swallow; library draw (seed unstamped); the GM's clause "swallowed a war-band's armoury"; binds the GM's words: swallow+swallows+swallowed
- Traits/Lodged Armoury — template weapon-lodge; library draw (seed unstamped); binds the GM's words: lodged
- Traits/Tunneler — print's own row
- Bonus Actions/Swallow — print's own row

**Engine trace**

```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "swallowed a war-band's armoury" | brute-grappler: ✓ ("swallowed a war-band's armoury") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing whole, armoury and all [behavior] | half-digested blades and mail lodged in its hide and gullet [object] | the grinding, clattering sound it tracks prey by [aura]
[concept] identity: A purple worm that devoured a war-band whole and has been slowly digesting its armoury ever since, its segmented hide now studded with half-melted blades and mail that grind audibly as it moves. It opens a fight by breaching the ground beneath the largest target and swallowing them down to the cuirass, then spends every round coiling and crushing while the swallowed prey is scoured by acid and shredded on the blades lodged in its gullet. Bloodied, it does not flee — it thrashes into a deeper, more violent burrow, dragging whatever it has seized down through the stone with it, because a worm that has eaten this much iron believes nothing left above can hurt it.
[concept] lore: Born in the deep stone beneath an old battlefield, this worm grew fat on the fallen and then on their gear, and now it hunts by the sound of clattering metal, seeking to swallow a hundred more armouries and become something no army can dig out.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "swallowed a war-band's armoury" names no absence — nothing in it takes anything away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (descriptive)
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the worm bursts up to Bite something standing on the ground, it doesn't settle for a mouthful — it swallows the victim down to the cuirass and keeps them there, and the gullet's blades and acid tear at them each time the worm coils to crush. The swallowed creature can hack or wrench itself free by spending its efforts, and when it does the worm's body shudders and spits the ruined armour out." [rider/on_hit/condition] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, condition-payoff, shield-bash, hook-drag, burrow-ambush, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed)
[reskin] signature template: swallow -> Actions/"Gullet Armory" ("The worm bursts up and swallows a ground-standing victim, holding it in its gull [verb: swallow:concept, swallows:concept, swallowed:concept]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "Blades and mail lodged in the worm's hide scrape and bite at anything that comes into reach — a creature that lands a blow on the worm tears itself on the protruding iron. At the start of the worm's turn, loose metal still clattering in its guts grinds loudly enough that nearby prey can hear exactly where it is coming from." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — tunneler (worm)
[reskin] word match declined by the call: tunneler, resonant-body, uncanny-sense — the key word does not mean the mechanic here
[reskin] signature template (trait): weapon-lodge -> Traits/"Lodged Armoury" ("Blades and mail lodged in the worm's hide — a war-band's armoury of metal stuck  [verb: lodged:idea]")
[reskin] weapons answered: Bite = none; Iron Scour = none
[reskin] chassis nova: "Iron Scour (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Iron Scour (Recharge 5-6)" is the seat's nova, not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Gullet Armory.
[reskin] row binds its clause: "Gullet Armory" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Gullet Armory The name promises an armoury mechanic but the entry only swallows a creature; the swallowed-creature clauses also duplicate the Bonus Action Swallow with different damage (12d6 vs 5d6), regurgitation thresholds (40/DC21/10 ft vs 30/DC21/5 ft), and escape distances (15 ft vs 20 ft), forcing the GM to track two divergent swallowed states.
audit finding below confidence gate: Lodged Armoury Nothing in the block explains how a lodged weapon deals Acid damage or how an unheld lodged weapon is 'used' — the referent (the lodged weapon as the acid source) is undefined.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] one mechanic, at most twice: "Gullet Armory" keeps its Restrained rider — the strip has no pattern for how this row words it: *Dexterity Saving Throw*: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee atta
[reskin] record reconciled: "Gullet Armory" no longer imposes Prone,Blinded,Restrained — the clause left, so the record goes with it
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
```


---


### Pit Fiend — in the run

**Concept:** name: Pit Fiend | who collects the oaths of dying knights

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 21 / off 11 → 16; sustained 43 (1 × Fiery Mace); nova Oathflame Standard 28; dmg 47

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Perception +10, Persuasion +19

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Oathflame Standard. The pit fiend explodes when it dies. Dexterity Saving Throw: DC 21, each creature in a 30-foot Emanation originating from the pit fiend. Failure: 28 (8d6) Fire damage. Success: Half damage. The explosion destroys the pit fiend's body.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oath Chain.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Oath Chain. Dexterity Saving Throw: DC 21, one creature within 30 feet. Failure: 14 (4d6) Fire damage, and the target can't regain Hit Points until the end of the pit fiend's next turn.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Oathflame Standard — template death-burst; library draw (seed unstamped); the GM's clause "collects the oaths of dying knights"; binds the GM's words: dying
- Traits/Legendary Resistance — the chassis
- Traits/Diabolical Restoration — print's own row
- Traits/Fear Aura — print's own row
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — print's own row, renamed
- Actions/Fiery Mace — print's own row; weapon mace
- Actions/Devilish Claw — print's own row
- Actions/Oath Chain — template seal; library draw (seed unstamped)
- Actions/Hellfire Spellcasting — print's own row

**Engine trace**

```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend themes=fiendish/grave mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: harvesting the oaths of dying knights [behavior] | an aura of authority that raises fallen allies [aura] | a blade of black flame [object]
[concept] identity: The Pit Fiend opens by stepping into the middle of a losing battle and offering the dying a choice: swear, and rise again under its banner — refuse, and it takes the oath from your burning breast anyway. Every round it wades in beside its oath-sworn host, parrying for them with a blade of black flame and holding the front rank with an authority that makes broken knights stand back up. It does not flee and it does not rage; it collects, patiently, until the field is empty of anything unclaimed.
[concept] lore: Forged in the deepest pit as a keeper of infernal contracts, it haunts the last moments of battlefields to harvest the oaths of dying knights, binding their last words into chains it wears as trophies and soldiers.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend singles out one dying creature it can see and offers the oath: swear and the creature is dragged back to its feet, standing and fighting as an ally of the fiend with its wounds held shut by black fire. Refuse and the same fire tears the last breath from its lungs — and the fiend wears that refusal as a fresh link in the chain at its belt, growing more terrible with every oath it has " [action/once_per_fight/resource] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — curse-debt, aggro-curse (oath)
[reskin] word match declined by the call: curse-debt, aggro-curse, obstacle-pull, hook-rider, exploiter — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "seal" as nearest; it lands rather than the row being dropped (what it wanted: presents a choice to one dying creature: accept and it is revived and fights for)
[reskin] [gap] presents a choice to one dying creature: accept and it is revived and fights for the fiend, refuse and it takes damage a — "The pit fiend singles out one dying creature it can see and offers the oath: swear and the creature is dragged back to its feet, standing and fighting as an ally of the fiend with its wounds held shut by black fire. Refuse and the same fire tears the last breath from its lungs — and the fiend wears that refusal as a fresh link in the chain at its belt, growing more terrible with every oath it has " — Pit Fiend [seat: action [action/once_per_fight/resource]] (closest offered: seal) [effect: resource] [nearest landed] [menu: curse-debt aggro-curse seal shield-bash active-toll random-ray ground-burst obstacle-pull terror-pulse slow-bolt disarm herd reveal wind-up exploiter hook-rider] [same-cell unoffered: none] [same-seat rejected: zone:role wail:role]
[reskin] pick kept on the GM's own words: action — "seal" has no key-table verb, but the call quotes "collects the oaths of dying knights" from the description
[reskin] signature template: seal -> Actions/"Oath Chain" ("The idea is a one-time pact offered to a dying creature that returns it to its f [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The fiend's banner burns around it — an aura of black flame and dread authority that steadies every oath-sworn fighting beside it, mending their wounds and refusing to let them fall while their oath holds; the living who stand against it feel the flame press on their resolve and falter." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, evasion, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, death-burst (dying)
[reskin] word match declined by the call: bloodied-burst, death-burst — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "death-burst" as nearest; it lands rather than the row being dropped (what it wanted: heals and steadies allies within its aura while they hold their oaths, and saddl)
[reskin] [gap] heals and steadies allies within its aura while they hold their oaths, and saddles enemies with dread — an ally-buffing, — "The fiend's banner burns around it — an aura of black flame and dread authority that steadies every oath-sworn fighting beside it, mending their wounds and refusing to let them fall while their oath holds; the living who stand against it feel the flame press on their resolve and falter." — Pit Fiend [seat: trait [trait/always/defense]] (closest offered: death-burst) [effect: defense] [nearest landed] [menu: bloodied-burst death-burst false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body guarded-stance undead-fortitude mimicry truth-aura gaze-aura evasion blurred-form heated-body fire-aura] [same-cell unoffered: shell-withdraw patient-defense] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role assassinate:role blurred-form:role death-burst:role]
[reskin] signature template (trait): death-burst -> Traits/"Oathflame Standard" ("The fiend's banner burns around it — an aura of black flame and dread authority that steadies every oath-sworn fighting beside it, mending their wounds and refu [verb: dying:concept]")
[reskin] weapons answered: Greatsword = greatsword
[reskin] speed by concept: added Fly 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Greatsword" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] save follows the effect: Actions/"Oath Chain" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Oath Chain.
[reskin] row binds its clause: "Oathflame Standard" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Oathflame Standard The entry name promises a 'Standard' (a banner/emblem of oath) but the text delivers an on-death explosion, so the name promises a mechanic its text never delivers.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Owlbear — in the run

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
(not the page capture — the card showed the other edition; drawn from the saved JSON)
Owlbear
Large Monstrosity, Unaligned
AC 13
HP 59 (7d10 + 21)
Speed 40 ft., Climb 40 ft.
STR 20 DEX 12 CON 17 INT 3 WIS 12 CHA 7
Skills Perception +5
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 3

Actions
Multiattack. The owlbear makes two Rend attacks.
Rend. *Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
```

**Where each row came from**

- Actions/Multiattack — print's own row
- Actions/Rend — print's own row, renamed

**Engine trace**

```
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "Owlbear" | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/uncanny mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: grapple
[concept] signature elements: bear-bulk and owl-beak fused in one body [body] | crashing predatory charge [behavior] | crushing hook-clawed grapple [behavior]
[concept] identity: An owlbear crashes out of cover in a shrieking, beak-first charge, and once it has a target it plants its bulk and trades bites and raking claws until something stops moving. It is a sullen, half-cunning predator that does not learn to flee until bloodied badly, and then only far enough to circle back on the wounded.
[concept] lore: Owlbears are the misbegotten get of a wizard's crossbreeding failed and gone feral in the deep woods, and what they want is meat, a den, and anything that wanders into their hunting ground during the night.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] weapons answered: Bite = none; Crashing Charge = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
```


---


### Vashka the Red — in the run

**Concept:** name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vashka the Red | 6 | defender-5 | ok | ok | FAIL: lint:dangling-use-ref, lint:undefined-attack-ref | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- structure · fail · lint:dangling-use-ref: Traits/Shield Wall: "uses Riposte even when the missed attack came from beyond 5 feet" references an entry that doesn't exist — reference a real entry by its exact name
- structure · fail · lint:undefined-attack-ref: Traits/Shield Wall references a use of "Riposte even", which is not defined anywhere in the statblock — rewrite the reference to name a real entry
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Shield Wall
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Longsword); nova none; dmg 33

```
Vashka the Red

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Shield Wall. While Vashka is within 5 feet of an ally that has a shield and neither is Incapacitated, Vashka gains a bonus to its Armor Class, and it can use its Riposte even when the missed attack came from beyond 5 feet if the attacker is within the wall's reach.

Actions

Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Shield Wall — authored for this sheet; the GM's clause "fights from a shield wall"
- Actions/Multiattack — the chassis
- Actions/Longsword — print's own row, renamed; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "warlord"

**Engine trace**

```
[path] class_npc — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("a hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: locked shield wall that never breaks ranks [behavior] | lacquered plate armor [body] | punishing strikes at anyone who moves past the line [behavior]
[concept] identity: Vashka the Red anchors herself in the center of a locked shield wall, advancing one grinding step at a time so her lacquered plate and her soldiers' shields form a single iron line. Every round she fights as part of that wall, punishing anyone who reaches past or around her with a brutal, disciplined strike — she never pursues, never breaks formation, and never lets a foe slip behind her. Under pressure she becomes colder and more obstinate, refusing to retreat even bloodied, because the wall is her weapon and her doctrine is to outlast.
[concept] lore: Vashka the Red rose through a legion of mercenary hobgoblins by never losing a line, and now she hires her lacquered shield wall to warlords who need a door held or a road closed — her price is always paid in advance, and her ranks never break.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: buff_self] | "never breaks ranks" -> has (mechanical) [asked: buff_self]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Vashka hits a foe with her hammer or javelin, the blow drives the target back and pins it against whatever stands behind it — allies, a wall, Vashka's own locking shields. A foe shoved into a solid body or barrier staggers and cannot slip past the line, while one with open ground behind it is simply thrown back. She uses this to fold an attacker into the wall and keep it there." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, bolt-drag (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, wail, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, rampage)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] closest accepted: action — the call refused every template but named "charge-push" as nearest; it lands rather than the row being dropped (what it wanted: pushes the target back on any hit and pins it against whatever is behind it so i)
[reskin] [gap] pushes the target back on any hit and pins it against whatever is behind it so it cannot move past the line — "When Vashka hits a foe with her hammer or javelin, the blow drives the target back and pins it against whatever stands behind it — allies, a wall, Vashka's own locking shields. A foe shoved into a solid body or barrier staggers and cannot slip past the line, while one with open ground behind it is simply thrown back. She uses this to fold an attacker into the wall and keep it there." — Vashka the Red [seat: action [rider/on_hit/movement]] (closest offered: charge-push) [effect: movement] [nearest landed] [menu: rally stunning-strike charge-push hook-rider bolt-drag throw-retrieve herd] [same-cell unoffered: none] [same-seat rejected: affliction:role contagion:role pounce:role isolation:role snatch:role bolt-restrain:role bolt-drag:role bolt-mark:role charge:role]
[reskin] signature miss: action — "When Vashka hits a foe with her hammer or javelin, the blow drives the target back and pins it against whatever stands behind it — allies, a wall, Vashka's own locking shields. A foe shoved into a solid body or barrier staggers and cannot slip past the line, while one with open ground behind it is simply thrown back. She uses this to fold an attacker into the wall and keep it there." [rider/on_hit/movement] — the model picked "charge-push" (no verb, and it quotes nothing the GM typed) over a concept-verb template (rally)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vashka's lacquered plate is built to be struck and to answer: whenever a foe's blow lands on her, splinters of hardened lacquer and glancing steel spray back at the attacker, punishing anyone who trades hits with her up close. The harder they lean into her, the more the wall bites." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, evasion, blurred-form)
[reskin] verb gate stands down: trait — no template shares a verb, but "Vashka the Red — A hobgoblin in lacquered plate" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: Deals reactive damage back to a creature that hits it in melee, scaling with the)
[reskin] [gap] Deals reactive damage back to a creature that hits it in melee, scaling with the blows traded — "Vashka's lacquered plate is built to be struck and to answer: whenever a foe's blow lands on her, splinters of hardened lacquer and glancing steel spray back at the attacker, punishing anyone who trades hits with her up close. The harder they lean into her, the more the wall bites." — Vashka the Red [seat: trait [trait/on_being_hit/damage]] (closest offered: resonant-body) [effect: damage] [nearest landed] [menu: absorption bloodied-burst resonant-body weapon-lodge] [same-cell unoffered: heated-body ward-retaliation snap-shot riposte] [same-seat rejected: heated-body:legality]
[reskin] trait declined: "Lacquer Rebuke" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] concept-first trait skipped: guarded-stance — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329); the same gate the seat's menu and the class kit use
[reskin] repair: 2 clause(s) with no row — "fights from a shield wall", "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced ["description:never breaks ranks"]
[reskin] clause answered in prose: "never breaks ranks" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 1 clause(s) unplaced
[reskin] weapons answered: Warhammer = warhammer; Javelin = javelin
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Goblin, Common" -> "Common, Goblin" — the Gladiator's plus the concept's Goblin
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Warhammer" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Javelin leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vashka makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a fighter fights with a longsword, not the Gladiator's
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Acidmaw Scytheling — in the run

**Concept:** A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Acidmaw Scytheling | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "It has four scythe-arms"
- **dropped clause:** "carving with the others"
- read: def 7 / off 11 → 9; sustained 62 (2 × Scythe-Arm); nova Caustic Spit 49; dmg 74

```
Acidmaw Scytheling

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+8
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Caustic Shell. A creature that touches the scytheling or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Acid damage.

Actions

Multiattack. The scytheling makes two Scythe-Arm attacks.

Scythe-Arm. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Slashing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Caustic Spit (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 49 (14d6) Acid damage. Success: Half damage.

Bonus Actions

Cocoon. The scytheling cocoons one Medium or smaller creature it is grappling. While cocooned, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scytheling, and takes 10 (3d6) Acid damage at the start of each of the scytheling's turns. The scytheling can have only one creature cocooned at a time. If the scytheling takes 25 damage or more on a single turn from the cocooned creature, the scytheling must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the scytheling. If the scytheling dies, a cocooned creature tears free Prone by using 10 feet of movement.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the GM's clause "carving with the others"
- Actions/Scythe-Arm — the chassis
- Actions/Caustic Spit — template thrown-burst-seed; library draw (seed unstamped)
- Bonus Actions/Cocoon — binds the GM's words: cocoon+swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+whelm
- Traits/Caustic Shell — template heated-body; library draw (seed unstamped); the GM's clause "a shell that sheds acid"; binds the GM's words: acid+burn

**Engine trace**

```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: on the GM's own words "pinning prey with two arms" | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: pinning prey with two scythe-arms while carving with the other two [behavior] | the acid-shedding chitin shell [body] | the reeking glob spat from its maw [behavior]
[concept] identity: A four-scythe horror that opens by spitting a reeking glob to soften the ground, then lunges to pin prey with two forearms while the other two saw it apart. Each round it holds one victim on the floor of the fight and carves, and when the shell is cracked it bleeds acid that punishes anything standing close enough to hit it. It never breaks off — once it has its claws in something, it clings and cuts until the thing stops moving.
[concept] lore: Hatched in the acid-scarred hollows below a fallen hive, it hunts to stock the hollow with meat and lays its eggs in what it pins; the acid it sheds is the same that carved its home.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Acidmaw = literal
[reskin] name_element answered: Acidmaw = literal
[reskin] engulf engine: Cocoon — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scytheling" — the call's own answer (kind), built from the name
[reskin] inline form: "the scytheling" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "spitting maw" names no absence — nothing in it takes anything away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/condition] | "a spitting maw" -> has (descriptive) | "a shell that sheds acid" -> has (mechanical) | "It fights by pinning prey with two arms" -> has (descriptive) | "carving with the others" -> has (mechanical) [asked: at_will/attack]
[reskin] signature idea (action): "The scytheling rears back and spits a reeking glob of its own acid at the ground beneath a nearby creature, splashing a wide patch that clings and eats at anything standing in it. The soaked ground stays slick and caustic for a while, so prey that linger there keep burning and find their footing treacherously uncertain." [action/save/damage] — menu: swallow, leap, condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, herd, thrown-burst-seed, drain, wind-up, exploiter, trample, thrown-burst, execute, seal, lure, pacify (+ shelf: shell-withdraw, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, pounce)
[reskin] signature bound to the concept's verb: action — spew, exploiter, shell-withdraw (spits, pinned, shell)
[reskin] word match declined by the call: spew — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "thrown-burst-seed" has no key-table verb, but the call quotes "spitting maw" from the description
[reskin] value check: "Caustic Spit (Recharge 5-6)" EV 76 vs floor 54.1 (the whole Multiattack (2 attacks)) — dice 32 → 49 (nova budget)
[reskin] signature template: thrown-burst-seed -> Actions/"Caustic Spit (Recharge 5-6)" ("spits a glob of acid at the ground beneath a nearby creature, splashing a wide c [shape fit, no verb match]")
[reskin] signature idea (trait): "Its shell is a thin sac of the same acid that carved its home, and it bursts whenever the shell is cracked. Anything close enough to strike it gets drenched in the spray and keeps burning as the acid clings to it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (acid)
[reskin] signature template (trait): heated-body -> Traits/"Caustic Shell" ("its shell is a sac of acid that bursts when cracked, drenching anything close en [verb: acid:concept, burn:idea]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Multiattack"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Multiattack" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Scythe-Arm = none; Reeking Spit = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] row binds its clause: "Caustic Shell" answers "a shell that sheds acid" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit and no row binds the clause
[reskin] ask vs row ok: "carving with the others" -> "Multiattack" — trigger at_will
audit finding below confidence gate: Caustic Shell The trigger is ambiguous — 'touches' has no defined event (does it mean Grappled by it, moved through its space, or an unarmed touch?), so the GM cannot reliably tell when the damage applies.
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
```


---


### Bog Widow — in the run

**Concept:** a marsh witch who curses trespassers, cr 7

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Widow | 7 | caster-8-binder | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Trespasser's Curse
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Bog Widow

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+3
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+3

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages, Sylvan

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The bog widow makes three Arcane Burst attacks. It can replace one attack with a use of Drowned Name.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The bog widow casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Drowned Name. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the bog widow's next turn.

Trespasser's Curse. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). The bog widow casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The bog widow casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Actions/Drowned Name — template slow-bolt; library draw (seed unstamped)
- Actions/Trespasser's Curse — authored for this sheet; the GM's clause "curses trespassers"
- Reactions/Protective Magic — mage kit; the GM's clause "witch"
- Bonus Actions/Misty Step — print's own row

**Engine trace**

```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid themes=beguiling/grave mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: curses that steal actions from trespassers [behavior] | bog-water bindings that drag prey under [body] | the wracking hex-ray she looses from afar [behavior]
[concept] identity: The marsh witch opens by marking trespassers with a whispered hex — a curse that saps will before a blade is drawn — then circles her bog at range, loosing wracking rays and mud-clinging binds that rob enemies of actions one at a time. She never trades blows; when pressed and bloodied she melts into the marsh mist, leaving her cursed quarry stumbling blind and slowed, and returns to pick them off as the fen swallows them.
[concept] lore: Born of drowned fen-water and old spite, the marsh witch claims every trespasser as her own — she curses them not to kill, but to keep, dragging them down into the peat where her bog can drink.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 4 defect(s) — name "Bog-Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear) | "Bog-Claw" is an anatomical name dealing Slashing on a mind-driven attacker (the attack bonus keys to CHA) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type | "Wracking Hex" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Mud-Bind" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] anatomy on a humanoid: "Bog-Claw" -> "Staff" (Bludgeoning) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the bog widow" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog widow" — the model's own reading of the name
[reskin] energy kept on a base row: "Wracking Hex" Necrotic — the row's own noun pays for it
[reskin] energy withheld on a base row: "Mud-Bind" Necrotic -> Bludgeoning (the body's physical type; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] control spell gated to daily — Blindness/Deafness (level 2 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] | "cr 7" -> has (header)
[reskin] menu pruned: action — push-prone, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The widow whispers a trespasser's name into the fen and plucks the vigor from their limbs: for a short while, everything that quarry attempts comes slower and clumsier — spells falter, footing slips, recoveries drag — so every step they take toward her costs them the ground they need to fight on. It clings to one marked creature at a time and she can only keep so many names drowned at once; killin" [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, gaze-single, snare, shield-bash, terror-pulse (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark, stunning-strike, pounce)
[reskin] closest accepted: action — the call refused every template but named "slow-bolt" as nearest; it lands rather than the row being dropped (what it wanted: curses one marked creature for several rounds so its actions, spells, and footin)
[reskin] [gap] curses one marked creature for several rounds so its actions, spells, and footing all come slower, lasting beyond a sing — "The widow whispers a trespasser's name into the fen and plucks the vigor from their limbs: for a short while, everything that quarry attempts comes slower and clumsier — spells falter, footing slips, recoveries drag — so every step they take toward her costs them the ground they need to fight on. It clings to one marked creature at a time and she can only keep so many names drowned at once; killin" — Bog Widow [seat: action [action/save/condition]] (closest offered: slow-bolt) [effect: condition] [nearest landed] [menu: condition-payoff seal wail lure active-toll random-ray ground-burst spew obstacle-pull pacify escalating-dread snare-bolt slow-bolt sensory-strike herd thrown-burst-seed drain curse-debt zone-seed reveal wind-up blighted-ground gaze-single snare shield-bash terror-pulse delayed-brand aggro-curse bolt-drag bolt-mark] [same-cell unoffered: swallow noxious-aura truth-aura gaze-aura push-prone] [same-seat rejected: swallow:role trample:role leap:role thrown-burst:style gaze-single:style snare:style reel:style execute:style shield-bash:role hook-drag:role pull-through:role burrow-ambush:legality terror-pulse:role disarm:role push-prone:role exploiter:role]
[reskin] pick kept on the GM's own words: action — "slow-bolt" has no key-table verb, but the call quotes "a marsh witch who curses trespassers cr" from the description
[reskin] seat takes its clause: "Drowned Name" answers "a marsh" — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: slow-bolt -> Actions/"Drowned Name" ("The idea is a lingering debuff on one marked target that slows its actions, fumb [shape fit, no verb match]")
[reskin] signature idea (trait): "Anyone she has named stays named: when a marked trespasser hurts her or slips free of her bindings, the hex tightens and stings them for their trouble, feeding their pain back into her own flagging strength." [trait/always/resource] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, adhesive, berserk (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, faultless-tracker, absorption — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "absorption" as nearest; it lands rather than the row being dropped (what it wanted: damages a marked creature when it strikes or escapes her and converts that pain )
[reskin] [gap] damages a marked creature when it strikes or escapes her and converts that pain into her own regained Hit Points — "Anyone she has named stays named: when a marked trespasser hurts her or slips free of her bindings, the hex tightens and stings them for their trouble, feeding their pain back into her own flagging strength." — Bog Widow [seat: trait [trait/always/resource]] (closest offered: absorption) [effect: damage] [nearest landed] [menu: terrain-walk false-appearance phobia aberrant-ground faultless-tracker web-walker bloodied-fury uncanny-sense shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura blurred-form death-burst adhesive berserk absorption] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: adhesive:role spider-climb:legality earth-glide:legality tunneler:legality berserk:role evasion:role guarded-stance:role assassinate:role]
[reskin] trait declined: "Absorption" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 1, traits 0, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 2 attack row(s), 1 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Bog-Claw = none; Wracking Hex = none; Mud-Bind = none; Drowning Mark = none
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Staff" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the bog widow makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Wracking Hex" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Mud-Bind" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned Name.
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
audit finding below confidence gate: Trespasser's Curse No range problem (range is stated) but the save type Wisdom targets a creature with no stated type—actually range and save and duration are all present; no defect.
[reskin] audit rewrite blocked — "Multiattack" is engine-authored chassis text
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
```


---


### Templar Reeve — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar Reeve | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 51 (3 × Mace); nova none; dmg 51

```
Templar Reeve

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Reeve, Reeve and its allies have Advantage on attack rolls and saving throws, provided Reeve doesn't have the Incapacitated condition.

Actions

Multiattack. Reeve makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Reeve's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Reeve can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-and-mace discipline that punishes passage [behavior] | magicless iron-and-faith templar armor [object] | unbroken shield wall [aura]
[concept] identity: A grim, shield-bearing templar who opens by bracing behind his shield and daring enemies to close, then answers with short, brutal mace work that punishes anyone who tries to slip past him. Every round he advances methodically, using his armored bulk and shield to control space rather than chase, turning the fight into a grinding corridor of blocked routes and crushed limbs. He does not flee when bloodied; he tightens his guard, plants his feet, and fights to the death as if the line itself were sacred.
[concept] lore: Once a temple guard sworn to protect a holy site, he abandoned his faith in spells and miracles for the certainty of iron, and now patrols ruins and pilgrim roads as a self-appointed living barricade who lets no one pass unexamined.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Guarded Mace Swing" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Reeve" — the call's own answer (person), built from the name
[reskin] inline form: "Reeve" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe tries to move past him or away from him within reach of his mace, he steps into the gap and drives the mace home — the fleeing target takes his mace damage and is halted in its tracks, its movement spent on the spot, and its next swing is clumsy from the jarring blow. He can answer only one such attempt each round, and only if he can still raise his shield." [reaction/on_being_hit/damage] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Interposing Mace" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "His shield and plate are his whole creed: while he keeps his guard raised, the first blow that lands on him each round is turned aside by iron and stubborn faith rather than magic, and the attacker's weapon rings off the shield with a jarring shock. Once he has turned a blow this way, the shield is braced and he cannot do it again until he has reset his stance." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] closest accepted: trait — the call refused every template but named "resonant-body" as nearest; it lands rather than the row being dropped (what it wanted: negates the first hit that lands each round, then must reset before it can do so)
[reskin] [gap] negates the first hit that lands each round, then must reset before it can do so again — "His shield and plate are his whole creed: while he keeps his guard raised, the first blow that lands on him each round is turned aside by iron and stubborn faith rather than magic, and the attacker's weapon rings off the shield with a jarring shock. Once he has turned a blow this way, the shield is braced and he cannot do it again until he has reset his stance." — Templar Reeve [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: defense] [nearest landed] [menu: absorption bloodied-burst resonant-body weapon-lodge uncanny-sense] [same-cell unoffered: interpose] [same-seat rejected: heated-body:legality]
[reskin] trait declined: "Braced Creed" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] print canon multiattack: "Reeve makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 66 against the card's 45 — the attack rows re-solve at 72% (3 attacks off one row after a supersede)
audit finding below confidence gate: Shield Bash The action is a shield shove that knocks targets Prone, but both the name and fiction point to being pushed or knocked down, whereas a Strength save is being used to resist a physical bash that is more like a shove; this is adjudicable, but the save stat contradicts the knockdown fiction since Prone from a bash is typically resisted by Dexterity or a Strength save to stay upright — however the fiction (shoved off balance) does support Strength, so not a defect.
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
```


---


### Swarm of Plague-Knell Carols — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Plague-Knell Carols | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Bell Slam); nova none; dmg 90

```
Swarm of Plague-Knell Carols

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Bell Slam. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Thunder damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Thunder damage if the swarm is Bloodied.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Traits/Swarm — the chassis
- Actions/Bell Slam — the chassis

**Engine trace**

```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | holds: the call reads none in these words | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=grave/forged mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: self-ringing funeral bells [body] | ringing the dying to rest [behavior] | a widening, brazen death-knell [aura]
[concept] identity: The swarm descends on the dying, a self-assembling choreography of iron bells that ring a death-knell over any wounded thing still breathing, closing from all sides in a widening spiral. Each round the ringing intensifies, and every toll is a hammer-stroke of forged iron against skull and ribcage, the noise itself a battering force that staggers even the living; the bells maneuver as a single terrible congregation, seeking the weakest prey to hover over. When bloodied the construct doesn't flee — it sheds half its mass into a scattered peal and redoubles its tolling, as if the dying thing must be given a proper burial faster.
[concept] lore: Forged in a cathedral foundry from the bells of a plague-town, this construct was made to ring the dead to rest, but it grew greedy for the dying and now hunts those who still breathe so it may finish the funeral itself.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Plague-Knell Carol" -> "Swarm of Plague-Knell Carols" — print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the knell carol" (kind), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "ring themselves over the dying" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "ring themselves over the dying" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, push-prone, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm rings the full funeral over one creature it can see — the bells answer each other in a rising, widening spiral of tolls that presses in from every side and buries the target under the sound. A creature already badly wounded has its own heartbeat taken up as the bell-note: the knell finds the dying and rings them toward rest, staggering them with grief and noise, and the swarm's next hamm" [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: wail — the key word does not mean the mechanic here
[reskin] signature miss: action — "The swarm rings the full funeral over one creature it can see — the bells answer each other in a rising, widening spiral of tolls that presses in from every side and buries the target under the sound. A creature already badly wounded has its own heartbeat taken up as the bell-note: the knell finds the dying and rings them toward rest, staggering them with grief and noise, and the swarm's next hamm" [action/save/condition] — the model picked "execute" (no verb, and it quotes nothing the GM typed) over a concept-verb template (active-toll)
[reskin] signature idea (trait): "The bells never truly stop — once the swarm has struck or been struck, a thin residue of tolling clings to it and to anything near it, and every round the ringing grows louder on its own until it reaches a proper funeral clamor, then fades and begins again. Anyone lingering in that growing noise is worn down by it round after round, so the dying are slowly rung to rest simply by staying near." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] word match declined by the call: bloodied-burst, resonant-body, death-burst — the key word does not mean the mechanic here
[reskin] closest accepted: trait — the call refused every template but named "noxious-aura" as nearest; it lands rather than the row being dropped (what it wanted: a repeating aura that escalates in intensity each round and then resets, damagin)
[reskin] [gap] a repeating aura that escalates in intensity each round and then resets, damaging creatures that remain near it round af — "The bells never truly stop — once the swarm has struck or been struck, a thin residue of tolling clings to it and to anything near it, and every round the ringing grows louder on its own until it reaches a proper funeral clamor, then fades and begins again. Anyone lingering in that growing noise is worn down by it round after round, so the dying are slowly rung to rest simply by staying near." — Swarm of Plague-Knell Carols [seat: trait [trait/always/damage]] (closest offered: noxious-aura) [effect: damage] [nearest landed] [menu: bloodied-burst false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind evasion relentless-pursuit bound marking-light guarded-stance undead-fortitude mimicry truth-aura gaze-aura assassinate blurred-form death-burst resonant-body] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality sealed-body:role]
[reskin] signature miss: trait — "The bells never truly stop — once the swarm has struck or been struck, a thin residue of tolling clings to it and to anything near it, and every round the ringing grows louder on its own until it reaches a proper funeral clamor, then fades and begins again. Anyone lingering in that growing noise is worn down by it round after round, so the dying are slowly rung to rest simply by staying near." [trait/always/damage] — the model picked "noxious-aura" (no verb, and it quotes nothing the GM typed) over a concept-verb template (bloodied-burst, resonant-body, death-burst)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "ring themselves over the dying"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:ring themselves over the dying"]
[reskin] clause answered in prose: "ring themselves over the dying" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Iron Peal = none; Signature Slot = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] asked but unanswered: "ring themselves over the dying" asked for at_will/at_will and no row binds the clause
[reskin] audit rename: "Iron Peal" -> "Bell Slam"
```


---


### Cumulus Whelp — in the run

**Concept:** a young storm drake whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cumulus Whelp | 7 | dragon-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a young storm drake whose breath is a rolling wall of thunder"
- read: def 5 / off 7 → 6; sustained 36 (2 × Talons); nova Thunder Breath 39; dmg 50

```
Cumulus Whelp

Medium Dragon, Neutral

AC 18
Initiative +1 (11)

HP 110 (17d8 + 34)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
12
+1
+4
WIS
12
+1
+4
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+2

Skills Perception +4, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The whelp makes two Talons attacks.

Talons. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 39 (6d12) Thunder damage. Success: Half damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Talons — the chassis
- Actions/Thunder Breath — the chassis

**Engine trace**

```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("'a young storm drake' names the creature") | breath→mechanics ✓ ("'breath is a rolling wall of thunder'")
[concept] resolve: archetype=dragon type=Dragon themes=draconic/breath mind=bestial style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: a rolling wall of thunder breath [behavior] | storm-charged drake body and wings [body] | the howling squall around it [aura]
[concept] identity: A young storm drake opens combat by inhaling deep and exhaling a rolling wall of thunder that barrels across the battlefield, flattening and deafening everything in its path. It then stays airborne in wide, banking arcs, diving to rake with its claws and snapping with its jaws between breath passes, using the cloud-choked sky as cover. When bloodied it grows frantic and reckless rather than cautious, redoubling its thunderous assaults as the storm inside it builds toward a violent collapse.
[concept] lore: Hatched in the roiling cumulonimbus above storm-torn highlands, a storm drake rides the squall lines it was born into, and it wants above all to grow strong enough that the thunder it breathes becomes the sky's own voice.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 42 → 39 (the chassis nova obeys the cap: 39 at CR 7)
[reskin] donor: dragon-2 -> CR 7
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the whelp" — the call's own answer (kind), built from the name
[reskin] inline form: "the whelp" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area]
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, pacify, snare-bolt, sensory-strike, curse-debt, zone-seed, reveal, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, feint-slip, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "With a thunderous downbeat of its wings the whelp hurls itself across the field in a long banking charge, and everything it passes over is buffeted by the trailing wall of storm it drags behind it. Anyone caught in that wake is staggered and knocked from their feet by the concussive slap, as though the squall line itself swept through. It can only whip up such a charge when its breath is spent and" [action/always/movement] — menu: gaze-single, snare, zone, execute, seal, shield-bash, lure (+ shelf: rampage, lay-on-hands, second-wind, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: hook-rider, zone — the key word does not mean the mechanic here
[reskin] rider declined: "Stormwake Charge" — a rider rides the user's own attack, so it needs the user's own ask; the call offered no quote, and the key table finds no verb either (the gong's bandaged concussion, 2026-10-01)
[reskin] signature idea (trait): "The storm inside the whelp builds whenever thunder rolls, its own or the sky's, so every time its thunder breath lands on a foe the charge in its hide grows visibly brighter and more unstable, and when it is badly wounded that charge jumps and spits at anyone who strikes it in melee." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] word match declined by the call: heated-body, resonant-body, absorption, weapon-lodge, bloodied-fury — the key word does not mean the mechanic here
[reskin] trait declined: "Storm Discharge" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Talons = none; Thunder Breath = none; Deafening Roar = none
[reskin] chassis nova: "Thunder Breath (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Thunder" is dealt, defended, or not a damage type
```


---


### Brinewretch — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Brinewretch [seed 1/1] | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Grasp); nova none; dmg 38

```
Brinewretch

Large Monstrosity, Neutral Evil

AC 20
Initiative -1 (9)

HP 93 (11d10 + 33)

Speed 10 ft., Climb 20 ft.

MOD
SAVE
STR
16
+3
+6
INT
7
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Senses tremorsense 30 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The brinewretch makes two Grasp attacks. It can replace one attack with a use of Brine Squeeze.

Grasp. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the brinewretch), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Brine Squeeze. Constitution Saving Throw: DC 14, one creature within 30 feet that has the Grappled condition. Failure: 36 (8d8) Acid damage. Success: Half damage.

Bonus Actions

False Form. The brinewretch shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Grasp — the chassis
- Actions/Brine Squeeze — library seed condition-payoff
- Bonus Actions/False Form — the chassis

**Engine trace**

```
[path] homebrew — "the thing in the well" (call)
[route] lurker-trap type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Monstrosity themes=aquatic/grasping mind=sapient style=trap energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the well shaft it fills and poses as [body] | drag prey down beneath the waterline [behavior] | baiting with slack rope and the promise of water [behavior]
[concept] identity: The thing in the well is a drowned hunger wearing the well's own stone — a hide of slick, mineral-encrusted brine-stone that has swollen to fill the shaft, its shape reading as wet masonry and dangling rope until a bucket or a hand comes close. When prey leans over the rim it lunges up the shaft, seizing the dangling rope or the reaching arm with boneless, brine-slick limbs and dragging its catch down beneath the waterline to crush and swallow it. It is patient, greedy, and territorial, and it does not flee — it retreats down the shaft to sulk and re-ambush, and it toys with anything that survives its first pull, playing out slack rope to bait the same victim back to the rim.
[concept] lore: Something fell into the old well long ago and never died; it grew into the shaft's wet stone, and now it keeps the well as a larder, offering cool clean water to anything thirsty enough to lean in.
[reskin] donor: lurker-5-trap -> CR 5
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] reach folded: "Grasping Limb" (reach 50) and Reel leave — no tether in the concept; the grapple rides "Melee Attack" (the Giant Crab's shape)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brinewretch" — the call's own answer (kind), built from the name
[reskin] inline form: "the brinewretch" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the brinewretch seizes a creature near the waterline, it can haul its catch straight down the shaft in the same motion, dragging the victim into the water and as deep as the shaft allows before the grip is tested. Whatever it pulls under is left thrashing in the dark, and the brinewretch holds it there as long as it can, letting the drowning do the work." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] word match declined by the call: hook-rider, exploiter — the key word does not mean the mechanic here
[reskin] closest accepted: action — the call refused every template but named "obstacle-pull" as nearest; it lands rather than the row being dropped (what it wanted: holds a grappled creature at the bottom of the water so it drowns there, keeping)
[reskin] [gap] holds a grappled creature at the bottom of the water so it drowns there, keeping it seized turn after turn — "When the brinewretch seizes a creature near the waterline, it can haul its catch straight down the shaft in the same motion, dragging the victim into the water and as deep as the shaft allows before the grip is tested. Whatever it pulls under is left thrashing in the dark, and the brinewretch holds it there as long as it can, letting the drowning do the work." — Brinewretch [seat: action [rider/on_hit/movement]] (closest offered: obstacle-pull) [effect: condition] [nearest landed] [menu: stunning-strike charge-push hook-rider pounce isolation obstacle-pull pacify exploiter] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:legality contagion:legality snatch:legality bolt-restrain:role bolt-drag:legality bolt-mark:role charge:role]
[reskin] value check: "Well-Dragged Drowning" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Well-Dragged Drowning" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: exploiter left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: obstacle-pull (EV 2.5 vs 9.4)
[reskin] value check: "Merciless Strike" EV 27.9 vs floor 23.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The brinewretch's hide weeps a clinging, stinging brine; anything that touches it or holds onto it is left slicked and burning, and the pain lingers while the stuff stays on skin. It marks whoever it has already gotten its grip on, so the burning grows crueler the longer they stay in its clutches." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] seat owes nothing: the trap line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait declined: "Brine-Slicked Hide" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Grasp = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] save follows the effect: Actions/"Merciless Strike" Wisdom -> Constitution — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Merciless Strike.
[reskin] save stat from print grammar: Actions/Merciless Strike imposes Grappled by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] audit rename: "Merciless Strike" -> "Brine Squeeze"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Brine Squeeze) — the sameness metric
```


---


### Ossuary Greatsword — in the run

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Greatsword | 6 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greatsword: reach 10 on a Medium body with no tether word
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Ossuary Greatsword

Medium Undead, Lawful Evil

AC 14
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+5
CHA
5
-3
-3

Skills Athletics +7, Perception +2

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the greatsword hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The greatsword makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: greatsword swung by animated bone [object] | tireless, fearless advance [behavior] | shattering bone body [body]
[concept] identity: A skeleton greatsword-wielder opens by closing the gap in a dead sprint, raising its blade overhead for a single committed chop meant to split a shield-bearer down the middle. Every round after that it stays in reach and trades blow for blow, dragging the greatsword back up with tireless arms while the bones of its shoulders ratchet like a windlass. It never flees and never flinches — it has no blood to lose and no fear to feel — but it is not stupid: it sets itself in doorways and against walls where its heavy swings cannot be flanked, and it will keep swinging until the last bone is shattered.
[concept] lore: Raised from a forgotten battlefield ossuary by a necromancer who wanted a bodyguard that would never ask for pay, this skeleton retains only the memory of the sword-form it drilled in life.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Greatsword" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the greatsword" — the call's own answer (kind), built from the name
[reskin] inline form: "the greatsword" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "skeleton" names no absence — nothing in it takes anything away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When it spends its whole opening round charging straight at a foe and brings the greatsword down in that one committed overhead chop, the blow lands with the full weight of its dead sprint behind it — enough to stagger even a shield-bearer and drive them back a step. After that first terrible swing the momentum is spent; it can only do this once per fight, and only against a foe it could actually " [action/once_per_fight/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Charging Overhead" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skeleton's shoulder and wrist joints ratchet and lock with each strike, hauling the greatsword back up without a breath of fatigue — so as long as it keeps trading blows with something in reach, its swings come faster and faster rather than slowing. The momentum dies if it is ever forced to break off or has nothing in reach to keep the arms working." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, assassinate (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] closest accepted: trait — the call refused every template but named "bloodied-fury" as nearest; it lands rather than the row being dropped (what it wanted: an escalating attack bonus that stacks each turn the creature keeps attacking a )
[reskin] [gap] an escalating attack bonus that stacks each turn the creature keeps attacking a target in reach, resetting when it break — "The skeleton's shoulder and wrist joints ratchet and lock with each strike, hauling the greatsword back up without a breath of fatigue — so as long as it keeps trading blows with something in reach, its swings come faster and faster rather than slowing. The momentum dies if it is ever forced to break off or has nothing in reach to keep the arms working." — Ossuary Greatsword [seat: trait [trait/always/damage]] (closest offered: bloodied-fury) [effect: damage] [nearest landed] [menu: false-appearance adhesive phobia terrain-walk aberrant-ground faultless-tracker web-walker noxious-aura bloodied-fury uncanny-sense berserk shielded-mind relentless-pursuit bound marking-light sealed-body undead-fortitude mimicry truth-aura gaze-aura death-burst assassinate] [same-cell unoffered: throw-retrieve own-turn-punisher coating] [same-seat rejected: spider-climb:legality earth-glide:legality tunneler:legality evasion:role guarded-stance:role assassinate:role blurred-form:role]
[reskin] trait declined: "Ratchet Momentum" — no receipt: the call quoted none of the GM's words for it and it bound on no concept key (1d: the receipt is the gate, not the body's substance)
[reskin] weapons answered: Greatsword = greatsword; Thrown Cleaver = cleaver
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Thrown Cleaver" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack re-read — "Shortbow" joins the combination; "The greatsword makes two attacks, using Greatsword or Shortbow in any combination."
```


---

