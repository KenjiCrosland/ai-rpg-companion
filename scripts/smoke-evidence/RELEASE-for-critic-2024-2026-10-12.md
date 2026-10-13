# Release candidate — the forty and the baseline on the green-lit engine — 2026-10-12

**Status: the release gate, run on the critic's green light** (the canaries and the sprint feature batch, 2026-10-12). The earlier `case-rc-2026-10-12.md` ran before that read and stands as evidence of the pre-fix engine only.

What the engine carries since the October 4 release: step 7 (parts as engine rows, the template path untouched, a strict repair call), step 8 (the feature table, the adamantine idiom, the swallow and phobia shapes, the hag borrow by context, coverage by provenance), the critic's fix round (2014 print rows take the conversion model's text; print's Multiattack and dice on exact bodies), the canaries' fix round (exact dice only at print's CR, raise-only arrays above it, parts folding the slot's whole damage, print's own ranged row verbatim, the English twin for translated blocks, the Name field's short form, the armor note from print's Gear), and the sprint batch's fix round (the part reader, slot keys by mode, a part evicting a same-named chassis row, the mode lack, honorifics and role-noun epithets on every path, template-row provenance, riposte by name, the trip clause, print's dice on an exact body's added rows). Cases: `STEP8-holes-2026-10-12.md`, `CANARIES-case-2026-10-12.md`, `FEATURES-case-2026-10.md`.

## The runs

| set | run | saved | fails | coverage (by provenance) | concept share |
|---|---|---|---|---|---|
| the forty (`sweep.json`) | `sweep-2026-10-12T20-51-37` | 40 of 40 (the 2014 Pit Fiend stalled at 180 s, saved at 300 s and folded in) | **0 of 40** | 40/44 (91%) | 206/264 (78%) |
| the baseline (`baseline-fidelity.json`) | `baseline-fidelity-2026-10-12T21-31-00` | 18 of 18 (the bog witch, the staff wizard and the laundry pile stalled at 180 s, saved at 300 s and folded in) | **0 of 18** | 43/46 (93%) | 65/82 (79%) |

Against the step-8 brief's ship conditions: fails zero on both ✓; baseline coverage ≥ 85 by provenance ✓ (93); the forty's concept share 85 ✗ (78 — the same four one-liners as before, whose template rows bound on the idea rather than the user's words: the gate-golem's "forces the lock", the plague-seer's curse, the siege titan's stomp, the mirror assassin's reflections; provenance counts them honestly as unbound, and the bar reset is on the close-out list); the fixed cases: Meshrin passes 7/7 in the baseline (four part rows, Great Weapon Master, Trip Attack, Riposte, "Meshrin" on every row), Grandmother Ash 6/7 with the crows the named gap, as the critic has read it twice.

**One engine change after the forty ran.** The baseline's staff wizard ("a wizard but he cannot cast any spells, he just hits people with his staff") failed derivation on the first pass: the raise-only rule kept the Mage's INT 17 and rolled the staff at +5, and the spell lack then removed every casting row, leaving a weapon rolling Intelligence. The lack now re-derives weapon rows off the better of STR and DEX when no casting is left (the staff rolls +4 off DEX 14, 11 (2d8 + 2)); pinned; the block was rerun alone and folded in (`holdren-2026-10-12T22-19-37`). The change touches only a sheet where a spell lack removes all casting — no block of the forty, the canaries or the sprint batch has one — so the forty stands as the gate for this engine. Gate after it: 182 suites, 5,202 tests, build clean.

## Invariance against the October 4 release

Every print head in the forty now carries print's own attack rows to the digit, in both editions. Against the release sheets these are the moves, each toward print:

| print head | release (Oct 4) | now | print (SRD 5.2) |
|---|---|---|---|
| Goblin Warrior (2014) | Scimitar 1d8 + 1, +3 | 1d6 + 2, +4 | Scimitar +4, 5 (1d6 + 2) |
| Owlbear | Rend 26 (6d6 + 5), no Multiattack | 14 (2d8 + 5), "makes two Rend attacks" | Rend +7, 14 (2d8 + 5); two Rend |
| Troll | Rend 18 (4d6 + 4) | 11 (2d6 + 4), three Rend | Rend +7, 11 (2d6 + 4); three Rend |
| Hydra | Bite 14 (2d8 + 5) | 10 (1d10 + 5) | Bite +8, 10 (1d10 + 5) |
| Stone Golem | Slam 20 (4d6 + 6) + 9 Force; Force Bolt off the chassis | 15 (2d8 + 6) + 9 (2d8) Force; Force Bolt +9, 22 (4d10), 120 ft. | print's |
| Vampire | Grave Strike 17 (3d8 + 4) | 8 (1d8 + 4) plus 7 (2d6) Necrotic | +9, 8 (1d8 + 4) |
| Dragon Turtle | Bite 16 (2d8 + 7), Tail 16 | Bite 23 (3d10 + 7), Tail 18 (2d10 + 7) | print's |
| Pit Fiend | Bite 22 (4d6 + 8), Claw 22 | Bite 18 (3d6 + 8), Devilish Claw 26 (4d8 + 8), Fiery Mace 22 (4d6 + 8) + 21 (6d6) Fire | print's |
| Kraken | Tentacle 34 (7d6 + 10) | 24 (4d6 + 10) | +17, 24 (4d6 + 10) |

The Goblin Warrior 2024 and the Adult Green Dragon 2014 are row-identical to the release. Legendary row *names* on the Pit Fiend and Dragon Turtle vary with the donor roll, as they did in the release's own two rolls. The twenty homebrew one-liners differ from the release by 2–18 rows each — a different roll of the model on every one; the twelve's row-level read of six of them across five rounds found no unclassified diff, and the gate table above finds no fail.

## Dropped clauses

The forty: four, all the idea-bound one-liner shapes above. The baseline: the frog rider's "rides a giant frog" (the mounted seat is the sheet's answer; the style word is "mounted", not "frog"), Grandmother Ash's crows, the lantern drowned's "he is cold and dripping" (descriptive). None is a row the sheet should have and lacks.

## Attached for the critic's spot-check

`FEATURES-sheets-for-critic-2026-10-12.md` — four sheets from the frozen sprint batch, as the critic asked: Okhra (the greataxe out of a header clause, Great Weapon Master), Dame Oriel (the stalled block rerun; the silvered rapier beside one Crossbow; a Riposte that names a real row), the Gullet-Wyrm (the swallow; "that creature" as one target), the hill giant archer (no melee row, the Multiattack re-read). Appended to the 2024 critic file.

## Open at close-out

Provenance for rows the model renamed to answer a clause (Dream Ride, Boil Hex, the scarecrow's flinch — coverage undercounts in that direction); the forty's concept-share bar; the forty's composition (20 CR spine + 20 use-case shapes, per the owner's structure); the extraction keeping a paraphrase ("collects a fee" for "toll"); Grik's double trip (a Trip rider and a Knee-Knocker seed on one kobold); a crows/companion reaction shape.

---

# 2024 blocks

## Review batch — sweep-2026-10-12T20-51-37

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Creel Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Mire Fang | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Lantern Widow | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Lantern Hermit | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 2/2 | 6/7 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Lockwrought Sentinel | 5 (2014) | 2014 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 1/2 | 6/8 |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Firstborn Blight | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/5 |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Stillbirth Oracle | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/7 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Toller | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Bell-Drowned Harbor | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Storm-Herder | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Thunder-Marshal | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Ossuary Colossus | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/8 |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Bone-Wrought Siege Titan | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/7 |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | ok | soft (1) | 1/1 | 8/9 |
| Glassworn Echo | 18 | 2024 | skirmisher-18-skulker | ok | SOFT: band, hot-offense | SOFT: reach | SOFT: ko-at-will | ok | ok | ok | ok | soft (3) | 0/1 | 2/8 |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | ok | soft (1) | 1/1 | 8/9 |
| Glass Duelist | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/11 |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/9 |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | soft (1) | 1/1 | 12/12 |
| Vessikar | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/9 |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sunbound Regent | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 10/11 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sunbound Archlich | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 11/11 |

**Dropped 4 of 44 user clauses** (coverage 91%); concept share 78% (206/264 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Goblin Warrior — lowest CR

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

```
Goblin Warrior

Small Fey, Neutral

AC 15
Initiative +2 (12)

HP 31 (9d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+4
WIS
8
-1
-1
MOD
SAVE
CON
10
+0
+0
CHA
8
-1
-1

Skills Perception +1, Stealth +4

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Actions

Multiattack. The goblin warrior makes two attacks, using Scimitar or Shortbow in any combination.

Scimitar. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage plus 2 (1d4) Slashing damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Nimble Escape. The goblin takes the Disengage or Hide action.

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

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack-tactic flanking [behavior] | dart in, dart out skirmishing [behavior] | crude blade and thrown rock [object]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skittering" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Creel Hound — a 2024 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Creel Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Creel Hound

Medium Monstrosity, Neutral

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+4
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

Skills Athletics +4, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Sure Footing. Difficult Terrain composed of mud doesn't cost the creel hound extra movement, and the creel hound can move across mud without needing to make an ability check.

Actions

Multiattack. The creel hound makes two Bite attacks. It can replace one attack with a use of Choking Drag.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Choking Drag. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the creel hound by its forelimbs coiling back into the bank and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The creel hound whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the creel hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the creel hound's turns. The creel hound can have only one creature whelmed at a time. If the creel hound takes 5 damage or more in a single turn from the whelmed creature, the creel hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the creel hound. If the creel hound dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: drags prey under the water [behavior] | mud-caked bog hound [body] | ambush from turbid shallows [behavior]
[reskin] claim gate: CR 1 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Coiling its forelimbs back into the bank, the hound throws its weight toward the water, hauling every creature it is holding along the bottom and down into the deepest mud it can reach. This drives the hound, its victim, and the water between them into a churning, chokeful murk — a patch of bog so thick with stirred filth that anyone caught in it loses sight of the surface and breathes mud instead" [action/once_per_fight/movement] — menu: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] value check: "Choking Drag" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Choking Drag" ("hauls every creature it is holding along the bottom — a drag/haul of a held crea [verb: drag:concept, under:concept, haul:idea]")
[reskin] signature idea (trait): "The hound's hide is so matted with bog-mud that while it is submerged to the shoulders in the shallows it looks like the bank itself, not a living thing, so anyone wading nearby who isn't actively watching the water reads it as terrain until it erupts. Mud clings to its jaws and back, and it sheds silently back into the same water in the same way, leaving a fisherman certain he saw nothing at all." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept, shallows:idea, wading:idea]")
```


---


### Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 33 (3 × Rend); nova none; dmg 33

```
Troll

Large Giant, Unaligned

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Regeneration. The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The troll makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The troll moves up to half its Speed straight toward an enemy it can see.

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

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] signature elements: regeneration that closes wounds [body] | rabid, relentless melee assault [behavior] | flame and acid as its only bane [body]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 99 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Bite" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---


### Lantern Widow — a homebrew with a nova

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Lantern Widow | 3 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 14 (2 × Poker); nova Lantern Burst 17; dmg 21

```
Lantern Widow

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (8d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
14
+2
+4
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +4, Stealth +5

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 3 (XP 700; PB +2)

Traits

Skitter. The lantern widow ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The lantern widow makes two attacks, using Poker or Lantern in any combination. It can replace one attack with a use of Opportunist's Lash.

Poker. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.

Lantern. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage. Hit or Miss: Immediately after the attack, her lantern returns to the lantern widow's grasp.

Lantern Burst (Recharge 5-6). The lantern widow hurls her lantern at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 17 (5d6) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Opportunist's Lash. Strength Saving Throw: DC 12, one creature within 30 feet that is Prone. Failure: 6 (1d12) Fire damage. Success: Half damage.

Bonus Actions

Fleet Agility. The lantern widow takes the Dash or Disengage action.

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

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling the burning lantern [behavior] | the glass eye that never blinks [body] | a hermit's hoarded lamp oil and tinder [object]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "She hurls a fistful of lamp oil from her belt, splashing the front of everyone in a small cone. For a short while, each person hit keeps burning softly, taking a little fire damage at the start of their turn and giving her lantern attacks a better chance to find them. The oil only sticks to flesh, not to the ground or to objects." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her glass eye never blinks, so she sees out of it even while pressed against bark or hidden in brush. Anyone who thinks cover or darkness makes them safe from her throws learns otherwise." [trait/always/defense] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — marking-light, resonant-body (lantern, glass)
[reskin] signature miss: trait — "Her glass eye never blinks, so she sees out of it even while pressed against bark or hidden in brush. Anyone who thinks cover or darkness makes them safe from her throws learns otherwise." [trait/always/defense] — the model found no template that holds it (offered: marking-light, resonant-body)
[reskin] chassis nova: "Lantern Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Adult Green Dragon — a legendary

**Concept:** an adult green dragon

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Adult Green Dragon | 15 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 20 → 15.5; sustained 132 (3 × Rend + legendary Pounce); nova Poison Breath 71; dmg 135

```
Adult Green Dragon

Huge Dragon, Neutral Evil

AC 19
Initiative +1 (11)

HP 207 (18d12 + 90)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
23
+6
+6
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+6
WIS
15
+2
+7
MOD
SAVE
CON
21
+5
+5
CHA
18
+4
+4

Skills Perception +7, Stealth +6

Immunities Poison; Poisoned

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the adult green dragon fails a saving throw, it can choose to succeed instead.

Amphibious. The adult green dragon can breathe air and water.

Actions

Multiattack. The adult green dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Mind Spike (level 3 version).

Rend. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 7 (2d6) Poison damage.

Poison Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Poison damage. Success: Half damage.

Spellcasting. The adult green dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Mind Spike
- 1/Day Each: Geas

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the adult green dragon can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mind Invasion. The adult green dragon uses Spellcasting to cast Mind Spike (level 3 version).

Noxious Miasma. Constitution Saving Throw: DC 18, each creature in a 20-foot-radius Sphere centered on a point the adult green dragon can see within 90 feet. Failure: 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. Failure or Success: the adult green dragon can't take this action again until the start of its next turn.

Pounce. The adult green dragon moves up to half its Speed, and it makes one Rend attack.

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

**Engine trace**

```
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult green dragon") | dragon: key "dragon" (class body)
[concept] signature elements: venomous breath weapon in a cone [behavior] | adult dragon chassis with flight and frightful presence [body] | amphibious ambusher of forests and swamps [behavior]
[reskin] print canon defenses: HP 192 -> 207, AC 19 -> 19 — the Adult Green Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 12, CON 21, INT 18, WIS 15, CHA 18 — the Adult Green Dragon's at its own CR; attack +11 -> +11, DC 18 (print's)
[reskin] print canon: "an adult green dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Poison Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Adult Green Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Adult Green Dragon's
[reskin] print canon languages: "Common, Draconic, Sylvan" -> "Common, Draconic" — the Adult Green Dragon's
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Green Dragon's own row
[reskin] print canon multiattack: "The adult green dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Mind Spike* (level 3 version)." — the Adult Green Dragon's own
[reskin] print canon defenses: immunities Poison -> Poison; Poisoned — the Adult Green Dragon's own header lines
[reskin] print canon trait: Amphibious — "an adult green dragon" is the Adult Green Dragon (print's own row)
[reskin] print canon legendary: Mind Invasion, Noxious Miasma, Pounce — the Adult Green Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Firstborn Blight — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Firstborn Blight | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Rotting Claw); nova none; dmg 54

```
Firstborn Blight

Medium Humanoid, Neutral Evil

AC 16
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
20
+5
+8

Skills Perception +5, Deception +8

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The firstborn blight makes three attacks, using Rotting Claw or Withering Ray in any combination. It can replace one attack with a use of (A) Blight Touch or (B) Spellcasting to cast Ray of Sickness.

Rotting Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Withering Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Blight Touch. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The firstborn blight casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Bloodline Debt. Charisma Saving Throw: DC 16, one creature within 60 feet. Failure: The target is cursed until the end of the firstborn blight's next turn. The first time the cursed target deals damage to any creature before then, it takes 18 (4d8) Piercing damage. Success: Half damage only.

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

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: curses the firstborn of every house [behavior] | a body of slow poison and black blood [body] | the seer's eye that finds the heir
[reskin] signature idea (action): "The firstborn blight reaches into the blood it shares with a foe and makes the curse travel — the wound it has already opened blooms outward into that creature's kin. Until the blight is bloodied, every creature of the same bloodline as the one it hurts suffers a share of that harm, so the family watches each other sicken. Once the blight is bloodied, this link snaps shut and it turns its attentio" [action/save/damage] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Bloodline Debt" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] signature template: curse-debt -> Actions/"Bloodline Debt" ("the blight curses one creature it shares blood with, and when that creature deal [verb: curse:idea]")
[reskin] signature idea (trait): "Its body is a reservoir of slow poison: any creature that strikes it in melee gets that black blood on its hands, and the blight's own wounds seep into whoever draws near. While the blight is bloodied, the poison in its blood thickens, and every creature within a short distance moves as though wading through it." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---


### Glassworn Echo — bands soft

**Concept:** a mirror assassin who strikes from the reflections of her victims

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Glassworn Echo | 18 | skirmisher-18-skulker | ok | SOFT: band, hot-offense | SOFT: reach | SOFT: ko-at-will | ok | ok | ok | ok |

- bands · soft · band: reads CR 20 (print at 18 reads 12.5–18.5, n=5)
- bands · soft · hot-offense: offense alone reads CR 25, 7 over; the HP axis pulls the read to 20
- structure · soft · reach: Actions/Shard Nails: reach 10 on a Medium body with no tether word
- gates · soft · ko-at-will: Actions/Mirror Stare: Paralyzed at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 15 / off 25 → 20; sustained 198 (3 × Shard Nails + legendary Mirror Lunge); nova none; dmg 198

```
Glassworn Echo

Medium Monstrosity, Neutral

AC 19
Initiative +7 (17)

HP 294 (31d8 + 155)

Speed 70 ft.

MOD
SAVE
STR
20
+5
+5
INT
14
+2
+2
MOD
SAVE
DEX
24
+7
+13
WIS
18
+4
+10
MOD
SAVE
CON
21
+5
+5
CHA
16
+3
+3

Skills Perception +10, Stealth +13

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If the glassworn echo fails a saving throw, it can choose to succeed instead.

Slippery. The glassworn echo ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Reflected Shunt. When a creature the glassworn echo can see ends its turn within 5 feet of it, the glassworn echo can move up to 15 feet without provoking Opportunity Attacks.

Actions

Multiattack. The glassworn echo makes three Shard Nails attacks. It can replace one attack with a use of Mirror Stare.

Shard Nails. Melee Attack Roll: +13, reach 10 ft. 20 (3d8 + 7) Slashing damage plus 13 (3d8) Psychic damage.

Mirror Stare. Wisdom Saving Throw: DC 21, one creature the glassworn echo can see within 90 feet. Failure: 28 (8d6) Psychic damage, and the target has the Paralyzed condition until the end of the glassworn echo's next turn.

Bonus Actions

Nimble Escape. The glassworn echo takes the Disengage or Hide action.

Blink Step (Recharge 4-6). The glassworn echo teleports up to 120 feet to an unoccupied space it can see.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the glassworn echo can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mirror Lunge. The glassworn echo moves up to half its Speed without provoking Opportunity Attacks, and it makes one Shard Nails attack.

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

**Engine trace**

```
[route] skirmisher-skulker type=Monstrosity mechanics=teleport, gaze — skirmisher-skulker: ✓ ("a mirror assassin who strikes from the r") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: striking from inside a victim's reflection [behavior] | stepping through mirrors and reflective surfaces [behavior] | a body of living shadow that wears a stolen face [body]
[reskin] signature idea (action): "The echo rips a living replica out of its victim's reflection and hurls it at the original. The replica looks and sounds exactly like the victim, lands next to them, and tears at them with the victim's own strengths; the victim cannot tell which of the two they are fighting, so their next blow might cut themselves instead. The replica lasts only moments before the glass in it shatters." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation (+ shelf: swallow, gaze-single, snare, reel, condition-payoff, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "The echo rips a living replica out of its victim's reflection and hurls it at the original. The replica looks and sounds exactly like the victim, lands next to them, and tears at them with the victim's own strengths; the victim cannot tell which of the two they are fighting, so their next blow might cut themselves instead. The replica lasts only moments before the glass in it shatters." [rider/on_hit/damage] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, thrown-burst-seed, gaze-single, blink)
[reskin] value check: "Blink Step (Recharge 4-6)" EV 6 vs floor 5 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: blink -> Bonus Actions/"Blink Step (Recharge 4-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a creature looks at the glassworn echo, its stolen face is the one the viewer most dreads or most loves, and the echo can feel the moment recognition lands. That look feeds it: while a creature it can see is staring at it, the echo is wreathed in the viewer's own reflection and any wound it takes is half an illusion, bleeding light instead of flesh." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — gaze-aura (reflection, reflections)
```


---


### Glacier Wyrm — bands soft

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Wyrm | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Jaws + legendary Crushing Bite); nova Riming Breath 76; dmg 204

```
Glacier Wyrm

Gargantuan Dragon, Neutral

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
26
+8
+8
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+7
WIS
16
+3
+9
MOD
SAVE
CON
26
+8
+8
CHA
24
+7
+7

Skills Perception +9, Stealth +7

Vulnerabilities Fire

Immunities Cold

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the glacier wyrm extra movement, and the glacier wyrm can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the glacier wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The glacier wyrm makes three Jaws attacks. It can replace one attack with a use of (A) Swallow or (B) Spellcasting to cast Fear.

Jaws. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Riming Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The glacier wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Command, Fear, Dispel Magic

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the glacier wyrm hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the glacier wyrm, and takes 22 (5d8) Acid damage at the start of each of the glacier wyrm's turns. If the glacier wyrm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the glacier wyrm and has the Prone condition. If the glacier wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the glacier wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crushing Bite. The glacier wyrm makes one Jaws attack.

Ice-Drag. The glacier wyrm moves up to half its Speed without provoking Opportunity Attacks.

Hull-Shatter. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

**Engine trace**

```
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing ships whole [behavior] | freezing the sea around it [aura] | a body of living glacier ice [body]
[reskin] signature idea (action): "The glacier wyrm rears up and drags its freezing coils across the hull of the vessel it has seized, crushing timbers and sheathing the deck in a spreading sheet of black ice. Crew caught on that ice are rooted where they stand — sliding, grasping at nothing — as the ship's seams split and the sea rushes in. The wyrm can only do this while it still has a vessel in its grip." [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The sea itself freezes wherever the wyrm breaches, and the cold comes with it: the water around it stiffens into a creaking sheet that spreads from its body, catching anyone in the water or on the ice." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Riming Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Sunbound Regent — bands soft

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sunbound Regent | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- read: def 22 / off 24 → 23; sustained 168 (3 × Hurled Debris + legendary Deathly Teleport); nova none; dmg 168

```
Sunbound Regent

Medium Undead, Lawful Neutral

AC 21
Initiative +3 (13)

HP 442 (59d8 + 177)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
28
+9
+16
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +16, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft., truesight 30 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the sunbound regent fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the sunbound regent reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the sunbound regent's lair.

Actions

Multiattack. The sunbound regent makes three attacks, using Hurled Debris, Eldritch Burst, or Paralyzing Touch in any combination. It can replace one attack with a use of (A) Sealing Bind or (B) Spellcasting to cast Guiding Bolt.

Hurled Debris. Melee or Ranged Attack Roll: +16, reach 5 ft. or range 120 ft. 45 (8d8 + 9) Radiant damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage, and the target has the Paralyzed condition until the start of the sunbound regent's next turn.

Spellcasting. The sunbound regent casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 24):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Sealing Bind. Dexterity Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the sunbound regent's next turn.

Reactions

Protective Magic (3/Day). Trigger: The sunbound regent is hit by an attack roll. Response: The sunbound regent casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the sunbound regent can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The sunbound regent teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from the sunbound regent. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the sunbound regent can't take this action again until the start of its next turn.

Frightening Gaze. The sunbound regent casts Fear, using the same spellcasting ability as Spellcasting. The sunbound regent can't take this action again until the start of its next turn.

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

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: raising and commanding the dead of a whole kingdom [behavior] | the crown that binds every corpse-subject [object] | solar radiance burning through dead flesh [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The regent commands the bound dead to rise as a wall between itself and harm, spending a sliver of its own accumulated vitality to pull soldiers up from the ground. The risen dead do not attack; they simply stand, and each moment they endure its next words, it becomes harder to strike the regent because they take the blow instead." [reaction/on_being_hit/defense] — menu: snap-shot (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt, bolt-restrain
[reskin] value check: "Sealing Bind" EV 31.4 vs floor 29.6 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Sealing Bind" ("carries the concept's own verb 'bind/binds' — the archlich binds one creature wi [verb: bind:concept]")
[reskin] signature idea (trait): "Every living or undead creature the regent has personally slain leaves a tether to its crown, and when that creature is destroyed near the regent, its last spark flies back to the crown and makes the next flare of solar judgment burn fiercer." [trait/always/damage] — menu: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Every living or undead creature the regent has personally slain leaves a tether to its crown, and when that creature is destroyed near the regent, its last spark flies back to the crown and makes the next flare of solar judgment burn fiercer." [trait/always/damage] — the model found no template that holds it (offered: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, heated-body)
[reskin] chassis nova: "Solar Convocation (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Solar Convocation (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Review batch — baseline-fidelity-2026-10-12T21-31-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 6/6 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/7 |
| Mirel Dreen | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crossroads Tyrant | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/9 |
| Marsh Skipper | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vigil Stone | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Staffmage | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Muckjaw Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Hamperwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Iron Bull Golem | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Caltrop Runner | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Apiarch | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 3 of 46 user clauses** (coverage 93%); concept share 79% (65/82 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Caltrop Runner — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Caltrop Runner | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

```
Caltrop Runner
Small humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

12 (+1)

	

12 (+1)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Draconic

Challenge

1/2 (100 XP)

Proficiency Bonus:

+2

Warren Dash. The caltrop runner ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the caltrop runner takes the Dash or Disengage action.

Actions
Multiattack: The caltrop runner makes two Hand Crossbow attacks.
Dagger: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the caltrop runner has advantage on its next attack roll against the target before the end of its next turn.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: caltrop bag [object] | hit-and-run crossbow fire [behavior] | retreat to prepared ground [behavior]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The runner loads a caltrop round and fires it at a spot on the ground instead of a creature, scattering a small patch of spiked ground that springs open where it lands. Enemies crossing that patch are slowed and pricked, and the runner uses the confusion to slip to a new firing position. It can only do this a couple of times before its special rounds run dry." [rider/on_hit/movement] — menu: contagion, pounce (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] signature miss: action — "The runner loads a caltrop round and fires it at a spot on the ground instead of a creature, scattering a small patch of spiked ground that springs open where it lands. Enemies crossing that patch are slowed and pricked, and the runner uses the confusion to slip to a new firing position. It can only do this a couple of times before its special rounds run dry." [rider/on_hit/movement] — the model found no template that holds it (offered: contagion, pounce, feint-slip)
[reskin] value check: "Dazzling Burst" EV 0.6 vs floor 2.1 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The caltrop runner's body is a walking arsenal of concealed spikes and hooked barbs; anything that grapples it, swallows it, or otherwise seizes its body gets a fistful of barbed caltrops for its trouble. The runner sheds a few with every grab, making it painful to hold onto." [trait/on_being_hit/damage] — menu: EMPTY (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry, death-burst)
[reskin] signature miss: trait — "The caltrop runner's body is a walking arsenal of concealed spikes and hooked barbs; anything that grapples it, swallows it, or otherwise seizes its body gets a fistful of barbed caltrops for its trouble. The runner sheds a few with every grab, making it painful to hold onto." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry, death-burst)
```


---


### Iron Bull Golem — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull Golem | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

```
Iron Bull Golem

Huge Construct, Unaligned

AC 16
Initiative +0 (10)

HP 210 (20d12 + 80)

Speed 50 ft.

MOD
SAVE
STR
22
+6
+10
INT
5
-3
-3
MOD
SAVE
DEX
10
+0
+0
WIS
12
+1
+1
MOD
SAVE
CON
18
+4
+8
CHA
6
-2
-2

Skills Athletics +10, Perception +5

Resistances Fire

Immunities Poison, Bludgeoning, Piercing, and Slashing from nonmagical attacks that aren't adamantine; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Scalding Breath. A creature that touches the iron bull golem or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull golem can't shape-shift.

Magic Resistance. The iron bull golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull golem makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Wisdom Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull golem. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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

**Engine trace**

```
[route] brute-charger type=Construct mechanics=breath — brute-charger: ✓ ("It charges and gores") | brute-charger: key "charges" (class verb)
[concept] signature elements: thunderous charge and gore [behavior] | scalding steam breath [behavior] | iron body immune to all but adamantine [body]
[reskin] signature idea (action): "The golem lowers its head and thunders in a straight line, building unstoppable momentum. The first creature in its path is gored and carried along, and if it strikes a wall or another solid obstacle, the impact shakes the ground and hurls the victim away." [action/always/movement] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Scalding steam constantly hisses from the golem's nostrils. Any creature that comes within reach of its burning breath is scalded, and its own fire cannot harm it." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Breath" ("a creature that comes within reach of its scalding steam is burned by contact, a [verb: scald:concept, iron:concept, burn:idea, fire:idea]")
```


---


### Mirel Dreen — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Mirel Dreen | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Mirel Dreen

Medium Humanoid, Neutral Evil

AC 15
Initiative +2 (12)

HP 65 (10d8 + 20)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+4
MOD
SAVE
CON
14
+2
+2
CHA
18
+4
+6

Skills Perception +4, Deception +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Mirel makes two attacks, using Claw or Acid Ray in any combination. It can replace one attack with a use of (A) Rotting Ray or (B) Spellcasting to cast Acid Arrow.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Acid Ray. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Acid damage.

Rotting Ray. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Acid damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mirel casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Acid Arrow
- 1/Day Each: Ray of Sickness (level 2 version), Cloudkill

Grasping Mire. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of Mirel's next turn.

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

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: binding hexes that steal actions [behavior] | a brine-sodden hag body hung with drowned charms [body] | a fen-bound snare of roots and black water [aura]
[reskin] signature idea (action): "Mirel hurls a fistful of brine-soaked reed charms that burst into clutching hexes. Up to three foes feel the hex take hold: a wracking spasm steals what they were about to do, and their wounds refuse to close. The hex gnaws until Mirel is hurt or loses her focus, then the charms crumble to muck." [action/once_per_fight/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Brineclutch Hex" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brineclutch Hex" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Lash" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Mirel's body is sodden with bog-water and hung with drowned charms and finger-bone fetishes. The first blade or spell that bites her finds only brine and muck, the wound closing over like water—but the strike scatters her charms, and the hexes riding them lash back at whoever drew blood." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature miss: trait — "Mirel's body is sodden with bog-water and hung with drowned charms and finger-bone fetishes. The first blade or spell that bites her finds only brine and muck, the wound closing over like water—but the strike scatters her charms, and the hexes riding them lash back at whoever drew blood." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk)
```


---


### Vigil Stone — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vigil Stone | 4 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Slam); nova none; dmg 28

```
Vigil Stone

Medium Construct, Unaligned

AC 13
Initiative +1 (11)

HP 84 (13d8 + 26)

Speed 20 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
18
+4
+6
INT
5
-3
-3
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
8
-1
-1

Skills Stealth +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Adhesive Hide. The vigil stone adheres to anything that touches it. A Huge or smaller creature adhered to the vigil stone has the Grappled condition (escape DC 14).

Actions

Slam. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the vigil stone), reach 5 ft. 17 (3d8 + 4) Bludgeoning damage plus 11 (2d10) Force damage.

Vitality Leech. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 27 (6d8) Force damage, and the vigil stone regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The vigil stone shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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

**Engine trace**

```
[route] lurker-trap type=Construct mechanics=none — lurker-trap: ✓ ("only moves when no one is looking") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: moves only when unobserved [behavior] | carved stone gargoyle body [body] | perched ambush predator [behavior]
[reskin] signature idea (action): "The vigil stone marks one living creature it can currently see and freezes that mark into its stone heart; while the mark stands where others can watch it, the gargoyle cannot strike, but the moment the marked creature is alone — out of every ally's sight — the stone lurches across the distance and lands a blow meant only for it. Only one creature can bear the mark, and picking a new one releases " [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] value check: "Watchful Brand" EV 7.7 vs floor 14 (one attack of 1) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Watchful Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 20.9 vs floor 14 (one attack of 1) — added Success: Half; dice 16 → 27
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gargoyle is dormant stone whenever any living creature can see it — it cannot act, cannot move, and reads as plain masonry; the instant every watching eye is gone, it wakes and hunts." [trait/always/condition] — menu: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The gargoyle is dormant stone whenever any living creature can see it — it cannot act, cannot move, and reads as plain masonry; the instant every watching eye is gone, it wakes and hunts." [trait/always/condition] — the model found no template that holds it (offered: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---


### Hamperwretch — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Hamperwretch | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sodden Wrap); nova none; dmg 24

```
Hamperwretch

Medium Monstrosity, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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

Skills Athletics +5, Perception +2

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 12

Languages understands Sock (a crude language of fabric and odor) but can't speak

CR 3 (XP 700; PB +2)

Traits

Uncanny Sense. The hamperwretch can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The hamperwretch makes two Sodden Wrap attacks. It can replace one attack with a use of Sodden Lash.

Sodden Wrap. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Sodden Lash. Strength Saving Throw: DC 13, one creature within 30 feet that is Grappled by the hamperwretch. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Smother. The hamperwretch smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the hamperwretch, and takes 4 (1d8) Bludgeoning damage at the start of each of the hamperwretch's turns. The hamperwretch can have only one creature smothered at a time. If the hamperwretch takes 9 damage or more in a single turn from the smothered creature, the hamperwretch must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the hamperwretch. If the hamperwretch dies, a smothered creature pulls free Prone by using 5 feet of movement.

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

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: smothering engulf [behavior] | sentient pile of laundry [body] | language of socks [behavior]
[reskin] signature idea (action): "The hamperwretch inhales the stale air around it and then exhales a low, gurgling phrase in Sock, its native language of fabric and odor. Every creature that can smell the hamperwretch and is within thirty feet hears the phrase as a gut-level compulsion: unwashed bodies are meant to lie still and be forgotten. Listeners that understand any language must fight the urge to stop moving and let the da" [action/always/condition] — menu: swallow, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: leap, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Stale Sermon (2/Day)" EV 4.7 vs floor 20.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stale Sermon (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hamperwretch is a living pile of laundry, so its folds hold pockets of reeking air that leak out whenever it is disturbed. Any creature that touches, grapples, or is grappled by it is overwhelmed by the sock-stench: the creature's sense of direction and its ability to track enemies by smell or fine detail are scrambled until the end of its next turn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (smell, smells)
[reskin] signature bound by force: trait — "uncanny-sense" matches smell+smells in the user's words; the model's none is overruled
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("exact concept match [verb: smell:concept, smells:concept]")
```


---



---

# Attached: four sheets from the sprint feature batch (the critic's spot-check)


The critic asked (green-light read, 2026-10-12) for four sheets from the frozen sprint batch (`features-2026-10-2026-10-12T18-06-23`, the reference run) so the fix round's claims can be read against rows: Okhra (the greataxe out of a header clause, Great Weapon Master), Dame Oriel (the block that stalled and was rerun; the silvered rapier beside one Crossbow, a Riposte that names a real row), the Gullet-Wyrm (the swallow; "that creature" as one target), and the hill giant archer (no melee row, the Multiattack re-read). Each block: its checker row, the sheet as saved, the engine trace. Not a gate.

---

## Okhra the Hewer

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Okhra the Hewer | 13 (2014) | 2014 | skirmisher-13-skulker | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/6 |


**Input:** `name: Okhra the Hewer | A Large ogre champion wielding a huge two-handed greataxe with crushing force; she has a tusked bite and shrugs off blows with a thick hide.`
**Donor:** skirmisher-13-skulker -> CR 13 (invented — no printed peer)
**Signature:** none · **elapsed** 20s

### Block
```
Okhra the Hewer
Large giant, neutral
Armor Class

18 (natural armor)

Hit Points: 

180 (19d10 + 76)

Speed: 

60 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

16 (+3)

	

18 (+4)

	

10 (+0)

	

16 (+3)

	

12 (+1)

Skills: 

Perception +8, Stealth +8

Saving Throws: 

DEX +8, WIS +8

Senses: 

darkvision 60 ft., passive Perception 18

Languages: 

Common

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Great Weapon Master. When Okhra hits a creature with its greataxe, the attack deals an extra 5 damage.
Trailwise. Okhra ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Backstep. When a creature Okhra can see ends its turn within 5 feet of it, Okhra can move up to 10 feet without provoking opportunity attacks.
Nimble Escape. As a bonus action, Okhra takes the Disengage or Hide action.

Actions
Multiattack: Okhra makes three attacks, using Greataxe or Tusked Bite.
Greataxe: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 25 (5d8 + 3) slashing damage.
Tusked Bite: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
```

### Trace
```
[route] skirmisher-skulker type=Giant mechanics=none — brute: ✓ ("wielding a huge two-handed greataxe with") | brute -> skirmisher-skulker: the concept's VERB outranks the noun (key "hide", class verb) | skirmisher-skulker: key "hide" (class verb)
[concept] resolve: archetype=skirmisher type=Giant themes=armed/bestial mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Okhra the Hewer"
[concept] mechanics: none claimed
[concept] signature elements: ambush-and-vanish axe strikes [behavior] | massive two-handed greataxe [object] | thick hide that shrugs off blows [body]
[concept] identity: Okhra opens from ambush, bursting from cover to split a foe with a greataxe swing meant to pulp, then vanishes into the terrain before the survivors can answer. Every round she repeats this: a crushing rush, a tusked bite for anything left standing, then a shrug of her thick hide as she backs into shadow. She is not a skulking coward but a patient butcher — she toys with prey who panic, and she fights to the death only when cornered, preferring to bleed a party over ground she chose.
[concept] lore: Okhra the Hewer was the last champion of a broken ogre war-band, and she haunts the ruins of their stolen hill-fort, hunting anything that carries iron or fire.
[reskin] donor: skirmisher-13-skulker -> CR 13 (invented — no printed peer)
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "ambush-and-vanish axe strikes" | trait <- "massive two-handed greataxe"
[reskin] named parts: Greataxe (slot), Tusked Bite (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] part supersedes: Actions/"Tusked Bite" leaves — the model named a chassis row for the user's Tusked Bite; the part is that row
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] proper noun: "Okhra the Hewer" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline form: "Okhra" — the model's own reading of the name
[reskin] signature idea (trait): "The enormous crescent blade of Okhra's greataxe chips and splinters whatever it strikes, and she feeds the shattered remnants into her hide, thickening it against the next blows. Each time she lands a telling blow, her body knits over with jagged iron and fire-hardened timber, briefly turning her into a walking barricade." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The enormous crescent blade of Okhra's greataxe chips and splinters whatever it strikes, and she feeds the shattered remnants into her hide, thickening it against the next blows. Each time she lands a telling blow, her body knits over with jagged iron and fire-hardened timber, briefly turning her into a walking barricade." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] trait ceiling: "Assassinate" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] trait ceiling: "Evasion" does not ship — 3 traits already, and print's ceiling for a meat body is 3
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] lint: 0 findings
[reskin] audit: [Trailwise: This clause duplicates Nimble Escape, w… Attacks against it are made with Disadvantage."), Great Weapon Master: This entry name is a meta-ref…s Greataxe, the attack deals an extra 5 damage.")]
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a feature's real name, or print's own row
[reskin] done: "Okhra the Hewer" — donor skirmisher-13-skulker, CR 13
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## Dame Oriel Vance

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel Vance | 7 (2014) | 2014 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |


**Input:** `name: Dame Oriel Vance | a vampire hunter with a silvered rapier and a crossbow`
**Donor:** skirmisher-3-archer -> CR 7
**Signature:** library · **elapsed** 28s

### Block
```
Dame Oriel Vance
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

15 (+2)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Duelist's Step. Dame Oriel ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Dame Oriel takes the Dash or Disengage action.
Riposte (Reaction). When a creature within 5 feet of Dame Oriel misses it with a melee attack, Dame Oriel makes one Silvered Rapier attack against that creature.

Actions
Multiattack: Dame Oriel makes two attacks: one with Silvered Rapier and one with Crossbow.
Silvered Rapier: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and Dame Oriel has advantage on its next attack roll against the target before the end of its next turn.
Crossbow: Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and Dame Oriel has advantage on its next attack roll against the target before the end of its next turn.
```

### Trace
```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("a crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] resolve: archetype=skirmisher type=Humanoid themes=grave/armed mind=sapient style=archer energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Dame Oriel Vance"
[concept] mechanics: thrown-weapon
[concept] signature elements: silvered rapier precision [object] | hunting her own kind [behavior] | a vampire compelled by the hunt [behavior]
[concept] identity: Dame Oriel Vance opens at the edge of her crossbow's reach, planting a silvered bolt before she closes — then uses her silvered rapier to punish any vampire that tries to pin her in melee. She is a duelist above all: mobile, precise, and unhurried, preferring to bleed a predator across the room rather than stand and trade, and she disengages when wounded only to reappear at a better angle.
[concept] lore: A once-celebrated vampire-hunter of a fallen order, Oriel was turned by the very quarry she stalked; she now plies the old roads and ruined chapels, using her master's silvered techniques to hunt her own kind in a desperate bid for a cure that may not exist.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-archer -> CR 7
[reskin] seats: action <- "hunting her own kind" | trait <- "silvered rapier precision"
[reskin] repair round 1: 1 defect(s) — "Silver Bolt" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] named parts: Silvered Rapier (slot), Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Silvered Rapier, Vex on Crossbow — the feature table, no call
[reskin] proper noun: "Dame Oriel Vance" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline form: "Oriel" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "With a clear line to a foe that has been wounded this fight, Dame Oriel plants a silvered bolt through the old bite-scar, thigh, or wing-joint, then lets the pain do her hunting for her. Until that foe tears the bolt free at the cost of its own blood, it flinches at every cut, leaving her an opening to slip away and reappear where it is already looking the wrong way." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (rapier)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] value check: "Silvered Riposte" EV 14.3 vs floor 3.6 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Silvered Riposte" ("The concept's own verb is the rapier, and a vampire hunter's signature use of a  [verb: rapier:concept, opening:idea]")
[reskin] keys spent by the action: rapier
[reskin] signature idea (trait): "Against a foe that has wounded her first, her … finds the opening that only a hunter-turned-prey can see, and each such cut teaches her the angle for the next. She does not flinch from the thing that bit her; she measures it." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] trait declined: "Measured Retort" — bound only on the idea's own words (wounded:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] feature name: "Silvered Riposte" -> "Riposte"
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] lint: 0 findings
[reskin] audit: [Duelist's Step: The antecedent of "it" is ambiguou… Attacks against it are made with Disadvantage.")]
[reskin] audit rewrite blocked — "Duelist's Step" is engine-authored chassis text
[reskin] done: "Dame Oriel Vance" — donor skirmisher-3-archer, CR 7
[reskin] 2014 conversion: one lint-gated call — both printings saved
```

---

## Gorget Gnawer

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gorget Gnawer | 16 | 2024 | brute-15-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/3 | 3/4 |


**Input:** `a gargantuan purple worm-thing that swallows horses whole and burrows under caravans`
**Donor:** brute-15-grappler -> CR 16
**Signature:** library · **elapsed** 16s

### Block
```
Gorget Gnawer

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -1 (9)

HP 263 (17d20 + 85)

Speed 40 ft., Burrow 30 ft.

MOD
SAVE
STR
24
+7
+12
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
20
+5
+10
CHA
4
-3
-3

Skills Athletics +12, Perception +5

Senses darkvision 60 ft., tremorsense 120 ft.; Passive Perception 15

Languages Common

CR 16 (XP 15,000; PB +5)

Traits

Trenching Eruption. The gorget gnawer can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The gorget gnawer makes two Maw attacks.

Maw. Melee Attack Roll: +12, reach 10 ft. 54 (19d4 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 20). While Grappled, the target has the Restrained condition.

Tremor Eruption (Recharge 5-6). If the gorget gnawer is burrowing, it erupts from the ground at a point within 5 feet of one creature. Dexterity Saving Throw: DC 20, that creature. Failure: 78 (12d12) Bludgeoning damage, and the target has the Prone condition. The gorget gnawer then makes one Maw attack against the target. Success: Half damage only.

Bonus Actions

Swallow. The gorget gnawer swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the gorget gnawer, and takes 17 (5d6) Acid damage at the start of each of the gorget gnawer's turns. The gorget gnawer can have only one creature swallowed at a time. If the gorget gnawer takes 35 damage or more in a single turn from the swallowed creature, the gorget gnawer must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the gorget gnawer. If the gorget gnawer dies, a swallowed creature exits the body Prone by using 10 feet of movement.

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

### Trace
```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("swallows horses whole") | brute-grappler: key "swallows" (class verb)
[concept] name: provided_name rejected — "a gargantuan purple worm-thing that swal…" is the description, not a name
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] hints: engulf→mechanics ✓ (""swallows horses whole"")
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/devouring mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing horses whole [behavior] | burrowing under caravans [behavior] | gargantuan purple worm body [body]
[concept] identity: The worm erupts beneath a caravan, jaws first, and swallows a horse whole to clear the field. Every round after, it loops back underground and re-emerges under the largest target, grappling and dragging prey into its burrow; it toys with isolated morsels but thrashes toward the deepest cluster of hooves and wheels, only withdrawing when its hide is truly breached.
[concept] lore: A devourer grown fat on the old caravan roads, it remembers the taste of horseflesh and now drags whole trains beneath the earth to feed its endless hunger.
[reskin] donor: brute-15-grappler -> CR 16
[reskin] seats: action <- "burrowing under caravans" | trait <- "gargantuan purple worm body"
[reskin] save dc derived: DC 19 -> 20 (8 + PB 5 + the sheet's best 7) — no stat on the sheet reached it
[reskin] signature idea (action): "The worm dives beneath the ground, leaving only churned earth behind, and travels unseen through the soil. It bursts up again at the start of its next turn directly beneath the largest cluster of creatures within a wide stretch of ground it can sense, showering the area with dirt and debris that staggers those caught in the upheaval." [action/always/movement] — menu: condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, burrow-ambush, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: herd, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — burrow-ambush, hook-drag (burrow, under)
[reskin] value check: "Tremor Eruption (Recharge 5-6)" EV 103 vs floor 91.3 (the whole Multiattack (2 attacks)) — added Success: Half; dice 54 → 78 (nova budget)
[reskin] signature template: burrow-ambush -> Actions/"Tremor Eruption (Recharge 5-6)" ("The worm burrows, travels unseen, erupts from the ground, and staggers those in  [verb: burrow:concept, beneath:idea, earth:idea]")
[reskin] keys spent by the action: burrow
[reskin] signature idea (trait): "The Gorget Gnawer's body is a living trench. When it erupts from the earth, the collapsing tunnel beneath it tears the ground open in a line behind it, leaving unstable, yawning …-mouths that can swallow creatures or vehicles that move over them carelessly." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — tunneler (worm, burrows, burrow)
[reskin] signature template (trait): tunneler -> Traits/"Trenching Eruption" ("The collapsing tunnel it carves through the earth is the ground torn open behind [verb: worm:concept, burrows:concept, burrow:concept, tunnel:idea, tunnels:idea, tunneling:idea]")
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] done: "Gorget Gnawer" — donor brute-15-grappler, CR 16
```

---

## Ridgewaste

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ridgewaste | 7 | 2024 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 1/4 |


**Input:** `a hill giant archer who has no melee attack at all and shoots from the ridge`
**Donor:** skirmisher-3-archer -> CR 7
**Signature:** library · **elapsed** 19s

### Block
```
Ridgewaste

Huge Giant, Neutral

AC 16
Initiative +4 (14)

HP 119 (14d12 + 28)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+7
WIS
14
+2
+2
MOD
SAVE
CON
15
+2
+2
CHA
11
+0
+0

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Ridge Stride. The ridgewaste ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The ridgewaste makes two Longbow attacks.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The ridgewaste takes the Dash or Disengage action.

Retaliating Slam. One creature within 5 feet that hit the ridgewaste with an attack roll since the end of the ridgewaste's last turn takes 10 (3d6) Bludgeoning damage.

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

### Trace
```
[route] skirmisher-archer type=Giant mechanics=none — skirmisher-archer: ✓ ("shoots from the ridge") | skirmisher-archer: key "archer" (class noun)
[concept] resolve: archetype=skirmisher type=Giant themes=armed/subterranean mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: no melee attack—fights only at range [behavior] | shoots from elevated ridges [behavior] | giant longbow firing boulder-sized arrows [object]
[concept] identity: The ridge-archer opens by planting a boulder-sized arrow into the most exposed target from four hundred feet out, then repositions along elevated terrain every round to keep the high ground and a clean line, treating the battlefield as a vertical shooting gallery. It never closes to melee—if cornered or bloodied it abandons the position and sprints for a new ridge, using thrown boulders only as a parting screen while it withdraws. It is a patient, calculating skirmisher that fights at range until completely overwhelmed, then flees rather than brawl.
[concept] lore: Hill giant archers are exiles from their own kind, giants who traded boulder-throwing and club-swinging for the longbow after being driven from their tribe, and now they haunt ridgelines and cliff paths, picking off travelers and rival hunters for sport and supplies.
[reskin] donor: skirmisher-3-archer -> CR 7
[reskin] seats: action <- "no melee attack—fights only at range" | trait <- "giant longbow firing boulder-sized arrows"
[reskin] inline form: "the ridgewaste" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] extraction: 3 of 7 model clauses quote nothing the user typed and leave the record ("patient, calculating skirmisher that fights at range until completely overwhelmed, then flees rather than brawl", "repositions along elevated terrain every round to keep the high ground and a clean line", "opens by planting a boulder-sized arrow into the most exposed target from four hundred feet out")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The ridgewaste looses a boulder-sized arrow that skewers its target and pins it to whatever is behind it. The pinned victim can tear itself free, but doing so costs it its next move and leaves it vulnerable as it wrenches loose. The ridgewaste can only pin one target at a time and must reload between shots." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: swallow, leap, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The ridgewaste looses a boulder-sized arrow that skewers its target and pins it to whatever is behind it. The pinned victim can tear itself free, but doing so costs it its next move and leaves it vulnerable as it wrenches loose. The ridgewaste can only pin one target at a time and must reload between shots." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, disarm)
[reskin] fallback skipped by the floor: sensory-strike (EV 3.4 vs 13)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 13)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The ridgewaste's longbow is strung for giant arrows: any shot that misses its target continues on and can strike another creature directly behind the original target on the same line. The archer can deliberately aim through a crowded line, treating enemies as stepping stones for a single shot." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The ridgewaste's longbow is strung for giant arrows: any shot that misses its target continues on and can strike another creature directly behind the original target on the same line. The archer can deliberately aim through a crowded line, treating enemies as stepping stones for a single shot." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] lint: 0 findings
[reskin] audit: [Answering Sting: The name 'Sting' promises a pierc…t fits the ridgewaste. (about: "Answering Sting")]
[reskin] audit rename: "Answering Sting" -> "Retaliating Slam"
[reskin] lacks clause: Actions/"Fist" leaves — "has no melee attack at all" (no melee attack)
[reskin] done: "Ridgewaste" — donor skirmisher-3-archer, CR 7
```

