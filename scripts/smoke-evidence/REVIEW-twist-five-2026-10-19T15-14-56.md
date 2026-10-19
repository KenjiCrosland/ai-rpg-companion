# Review batch — twist-five-2026-10-19T15-14-56

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Sentinel | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Unyielding Champion | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| High-Pass Toll-Taker | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Galleries Glutton | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Stonemantle Castout | 9 | 2024 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/2 |

**Dropped 0 of 6 user clauses** (coverage 100%); concept share 100% (14/14 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Ossuary Sentinel — lowest CR

**Concept:** a skeleton with a greatsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossuary Sentinel | 2 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 12 (1 × Greatsword); nova none; dmg 12

```
Ossuary Sentinel

Medium Undead, Lawful Evil

AC 12
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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
+2
CHA
5
-3
-3

Skills Athletics +5, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 2 (XP 450; PB +2)

Traits

Great Weapon Master. When the sentinel hits a creature with its Greatsword, the attack deals an extra 2 damage.

Actions

Greatsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 6 (1d6 + 3) Piercing damage.

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

- Actions/Greatsword — authored for this sheet; a named part; the GM's clause "a skeleton with a greatsword"; weapon greatsword
- Actions/Shortbow — print's own row; weapon shortbow
- Traits/Great Weapon Master — a declared feature; the GM's clause "a skeleton with a greatsword"

**Engine trace**

```
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead themes=grave/armed mind=mindless style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a skeleton wielding a greatsword [object] | relentless committed overhead cleaves [behavior] | fights until the bones are broken [behavior]
[concept] identity: The greatsword skeleton closes on the nearest target in a straight, unhurried line, greatsword already raised in a two-handed grip, its whole fighting style built on long, committed overhead cleaves that leave its guard open but its reach unbroken. Round after round it simply swings again — no feints, no repositioning — trading any hit it takes to deliver another crunching blow, because its bones have no blood to lose and its body has no fear to break. It fights to the last joint, never fleeing and never toying, a relentless bone automaton that only advanced skeletons of its kind can command.
[concept] lore: Raised by a grave-cult as a standing sentinel of the ossuary, this skeleton patrols the tomb halls still wielding the greatsword it was buried with, obeying only the last order it was given: let nothing living pass.
[reskin] print canon array: STR 16, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +5
[reskin] donor: brute-2 -> CR 2
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] claim gate: CR 2 but a Undead body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "a skeleton with a greatsword" but offered no quote
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When the sentinel commits to its greatsword swing, it continues the cleave through everything in its path — every creature in a wide arc in front of it must dodge or be cut. Its guard stays wide open during the windup, so anything waiting for an opening can strike it before the blow lands." [action/always/damage] — menu: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "When the sentinel commits to its greatsword swing, it continues the cleave through everything in its path — every creature in a wide arc in front of it must dodge or be cut. Its guard stays wide open during the windup, so anything waiting for an opening can strike it before the blow lands." [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: trample, shield-bash, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The sentinel's empty bones and burial-worn joints never flinch or brace, so anything that strikes it in melee finds the swing passing through to the far side — the attacker takes a cut of its own committed momentum as the blade sweeps back around." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The sentinel's empty bones and burial-worn joints never flinch or brace, so anything that strikes it in melee finds the swing passing through to the far side — the attacker takes a cut of its own committed momentum as the blade sweeps back around." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greatsword = greatsword
[reskin] print canon alignment: Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon row: Actions/Shortbow — the Skeleton's own ranged row, added (the chassis carried none to rename) — far from print's CR 0.25: print's dice, the sheet's +5
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Stonemantle Castout — highest CR

**Concept:** a stone giant exile who speaks only Giant and understands no Common

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Stonemantle Castout | 9 | brute-9 | ok | SOFT: aim-atk | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-atk: attack +10 against the aim's +8
- read: def 7 / off 11 → 9; sustained 66 (2 × Stone Club); nova none; dmg 66

```
Stonemantle Castout

Huge Giant, Neutral

AC 15
Initiative +2 (12)

HP 161 (14d12 + 70)

Speed 40 ft.

MOD
SAVE
STR
23
+6
+10
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
20
+5
+9
CHA
9
-1
-1

Skills Athletics +10, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The castout makes two attacks, using Stone Club or Boulder in any combination.

Stone Club. Melee Attack Roll: +10, reach 15 ft. 33 (6d8 + 6) Bludgeoning damage.

Boulder. Ranged Attack Roll: +10, range 60/240 ft. 28 (5d8 + 6) Bludgeoning damage.

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
- Actions/Stone Club — print's own row, renamed; weapon club
- Actions/Boulder — print's own row, renamed

**Engine trace**

```
[path] twist — Stone Giant (is) — "stone giant exile" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=elemental mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurling boulders torn from the earth [behavior] | a body of living stone [body] | speaks Giant alone, understands no Common [behavior]
[concept] identity: The exile fights like a landslide with a grudge: it opens by hurling a boulder torn from the ground, then wades in swinging its stone fists and whatever it can wrench loose, weathering blows that would fell lesser giants. It speaks only Giant and never parleys — it fights until bloodied, then fights harder, and flees only when its own stone frame is cracking apart.
[concept] lore: Cast out of his stead for some forgotten offense, this stone giant roams the high passes alone, wanting only to be left to his silence and his rocks — and he assumes every stranger has come to drive him further out.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +8, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the castout" — the call's own answer (kind), built from the name
[reskin] inline form: "the castout" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] signature idea (action): "The castout tears a slab of the ground free and hurls it, not at one foe but as a rolling, skipping stone that plows through a line of them. It batters every creature in its path and leaves the ground behind churned and broken, so the field itself turns against anyone who stands in his way." [action/save/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Rolling Slab (Recharge 5-6)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "His hide is living mountain; every blow that lands knocks loose a spray of stone shards that cut and stagger whoever struck him, and the chips gather back onto his frame as he fights — he only grows harder to bring down the longer the brawl drags on." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — false-appearance (stone)
[reskin] word match declined by the call: false-appearance — the key word does not mean the mechanic here
[reskin] trait declined: "Living Mountain Hide" — bound only on the idea's own words (shard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Fists = none; Hurlstone = none
[reskin] print canon attack: "Fists" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon attack: "Hurlstone" -> "Boulder" — the Stone Giant's own ranged row
```


---

## Unyielding Champion — a 2024 sheet

**Concept:** a skeleton who was a gladiator in a former life

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Unyielding Champion | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Shortsword); nova none; dmg 26

```
Unyielding Champion

Medium Undead, Lawful Evil

AC 19
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
+1
MOD
SAVE
CON
15
+2
+4
CHA
5
-3
-3

Skills Athletics +6, Perception +1

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common plus one other language but can't speak

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The champion makes two attacks, using Shortsword or Shortbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Shortbow. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

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
- Actions/Shortsword — print's own row, renamed; weapon shortsword
- Actions/Shortbow — print's own row, renamed; weapon shortbow

**Engine trace**

```
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] defender type=Undead mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("was a gladiator in a former life") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "skeleton who was a gladiator in a former…" is the description, not a name
[concept] resolve: archetype=defender type=Undead themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shielded last-stand defense that punishes anyone who slips past [behavior] | the gladius and battered arena shield [object] | old gladiator's showmanship [behavior]
[concept] identity: The gladiator skeleton opens by planting its battered shield and advancing shield-first, daring foes to come within reach of its gladius; it rushes no one, letting the crowd come to it. Each round it holds the line, turning aside strikes with its shield and answering any foe who tries to slip past with a punishing sword cut. Bloodied, it only tightens its guard — this champion fights to the death, because it has already died once and lost the only match that mattered.
[concept] lore: A champion of the old arena whose death was never acknowledged by the mob, it rises each night to finish a bout that ended centuries ago, unable to leave until some challenger finally bests it.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton who was a gladiator in a former life" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Ranged Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the champion" — the call's own answer (kind), built from the name
[reskin] inline form: "the champion" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "a skeleton" names no absence — nothing in it takes anything away
[reskin] clauses: "a skeleton" -> has (descriptive), head | "was a gladiator in a former life" -> has (descriptive)
[reskin] signature idea (action): "When a foe slips past the champion's reach or turns its back to go for anyone else, the champion pivots and drives its gladius home — a flat, patient punishment for breaking the line. It can answer only one such opening at a time, so the crowd can bait it with a second runner while the first is corrected." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] fit declined: "Broken Line" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Skeleton's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The battered arena shield is not an accessory but the champion's whole argument: whoever strikes the champion from the front finds their blow turned aside by a shield that has already outlived a thousand fights, while blows that come from behind or from beyond the wall of it land as they should." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The battered arena shield is not an accessory but the champion's whole argument: whoever strikes the champion from the front finds their blow turned aside by a shield that has already outlived a thousand fights, while blows that come from behind or from beyond the wall of it land as they should." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Gladius = shortsword; Shield Bash = shield
[reskin] weapon declared: "Gladius" is a shortsword — the call's own answer
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon attack: "Gladius" -> "Shortsword" — the Skeleton's own row
[reskin] print canon attack: "Hurl Gladius" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
```


---

## High-Pass Toll-Taker — a print donor

**Concept:** an ogre with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| High-Pass Toll-Taker | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 4 → 2.125; sustained 22 (1 × Greataxe); nova none; dmg 22

```
High-Pass Toll-Taker

Large Giant, Chaotic Evil

AC 11
Initiative -1 (9)

HP 68 (8d10 + 24)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+6
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
7
-2
-2

Skills Athletics +6, Perception +0

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Giant

CR 3 (XP 700; PB +2)

Traits

Great Weapon Master. When the toll-taker hits a creature with its Greataxe, the attack deals an extra 2 damage.

Actions

Greataxe. Melee Attack Roll: +6, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 11 (2d6 + 4) Piercing damage.

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

- Actions/Greataxe — authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon greataxe
- Actions/Javelin — print's own row; authored for this sheet; a named part; the GM's clause "an ogre with a greataxe"; weapon javelin
- Traits/Great Weapon Master — a declared feature; the GM's clause "an ogre with a greataxe"

**Engine trace**

```
[path] twist — Ogre (is) — "an ogre" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("an ogre with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant themes=bestial/armed mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: towering greataxe swings [object] | tireless battering advance [behavior] | thick hide and brute mass [body]
[concept] identity: The ogre opens with a bellowing overhead greataxe chop meant to split a shield-bearer in two, then wades forward swinging in wide, tireless arcs that batter down anything still standing. It feels pain only as fuel, growing more reckless and brutal as it bleeds, and it never retreats — prey that runs merely dies tired. Thick hide and slab-like muscle let it stand and trade blows with a whole warband, and it fights to the death with dull, joyful stubbornness.
[concept] lore: A hill-ogre warlord's get, raised on stolen cattle and stolen axes, it haunts the high passes collecting tolls in whatever a traveler can bleed.
[reskin] print canon defenses: HP 66 -> 68, AC 12 -> 11 — the Ogre's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's at its own CR; attack +5 -> +6, DC 14 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] [path] decides: twist on the Ogre (the matcher agrees)
[reskin] print canon: "an ogre with a greataxe" heads on the Ogre — print's rows ride along; the seat stays
[reskin] named parts: Greataxe (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the toll-taker" — the call's own answer (kind), built from the name
[reskin] inline form: "the toll-taker" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an ogre with a greataxe" -> has (descriptive), head
[reskin] signature idea (action): "Letting out a bellowing overhead chop, the toll-taker brings its greataxe down on a foe and the shock of the blow hurls them backward and to the ground, clearing space for its advance. If the target crashes into another creature, that creature is knocked down too and the toll-taker can immediately stride toward the fallen without breaking its swing. Only the initial target suffers the axe's bite; " [action/save/movement] — menu: trample, leap, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] fit declined: "Bellowing Backhand" — a print body takes only what the user's words ask; the call quotes "an ogre with a greataxe", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Ogre's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The toll-taker's wounds are fuel: every time it is cut or clubbed, it bellows louder and swings harder on its next turn, and the more blood it sheds the wider and more reckless its arcs become, so it grows deadlier the longer a fight drags on. This fury never fades until the fight ends, and it cannot be scared or talked down." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] word match declined by the call: bloodied-burst, resonant-body, uncanny-sense, shielded-mind, sealed-body — the key word does not mean the mechanic here
[reskin] trait declined: "Wounded Fury" — bound only on the idea's own words (bloodied:idea, wounded:idea, fury:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Greataxe = greataxe
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Ogre's walk; the concept's other modes stay
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
```


---

## Galleries Glutton — in the run

**Concept:** a cave troll that speaks only Giant

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Galleries Glutton | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Rend); nova none; dmg 33

```
Galleries Glutton

Large Giant, Chaotic Evil

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

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The glutton regains 15 Hit Points at the start of each of its turns. If the glutton takes Acid or Fire damage, this trait doesn't function on the glutton's next turn. The glutton dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the glutton ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the glutton's limbs is severed, falls into the glutton's space, and becomes a Troll Limb. The limb acts immediately after the glutton's turn. The glutton has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The glutton makes three Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Slashing damage.

Bonus Actions

Charge. The glutton moves up to half its Speed straight toward an enemy it can see.

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
- Actions/Rend — print's own row, renamed
- Traits/Regeneration — print's own row
- Traits/Loathsome Limbs — print's own row
- Bonus Actions/Charge — print's own row

**Engine trace**

```
[path] twist — Troll (is) — "cave troll" (call)
[route] brute-regenerator type=Giant mechanics=regeneration — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-regenerator: ✓ ("cave troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] hints: troll→canon ✓ ("a cave troll that speaks only Giant")
[concept] resolve: archetype=brute type=Giant themes=subterranean/bestial mind=sapient style=regenerator energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: regeneration
[concept] signature elements: wounds that close as fast as they open [body] | clawing hook-and-drag into a mauling grapple [behavior] | guttural Giant-speech and cave lairing [aura]
[concept] identity: A hulking cave troll that brawls in close, hooking with slab-like claws and dragging prey into reach of its closing jaws before its wounds have even finished knitting. Every round it presses forward heedless of injury, letting cuts seal shut as it hauls and crushes, and it fights to the death — too stupidly stubborn to flee and too hungry to toy with what it has caught.
[concept] lore: Deep-cave trolls who trade their rumbling Giant-tongue for nothing else, they lair in lightless galleries and haul intruders down to be eaten at leisure, ravenous for the warmth and meat that never wanders into the dark on its own.
[reskin] print canon route: the Troll's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 116 -> 94, AC 14 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +7 -> +7, DC 16 (print's)
[reskin] regeneration organ injected — 10/turn
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: twist on the Troll (the matcher would have said homebrew)
[reskin] print canon: "a cave troll that speaks only Giant" heads on the Troll — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the glutton" — the call's own answer (kind), built from the name
[reskin] inline form: "the glutton" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cave troll" -> has (descriptive), head | "speaks only Giant" -> has (header)
[reskin] signature idea (action): "When its slab-claw hooks flesh, the glutton digs in and hauls the victim bodily toward its jaws instead of letting go — the struck creature is yanked out of its footing and dragged in against the troll's chest, dragged across the ground if it was standing further off. Anyone it hauls in this way is left off balance and pinned against the closing maw, easy meat for the next bite." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] fit declined: "Hooking Claw" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Troll's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The glutton's flesh knits shut around whatever cuts it — the instant a wound is opened, the meat crawls closed over the weapon and the attacker's reach. A foe that lands a telling blow finds its blade or limb caught fast in the sealing flesh, stuck to the troll while it keeps hauling forward." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] trait declined: "Sealing Flesh" — bound only on the idea's own words (knits shut around:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Claw = none
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Troll's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The glutton makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a cave troll that speaks only Giant" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
audit span not verbatim, dropped: Loathsome Limbs the glutton grows replacement limbs the next time it regains Hit Points
audit finding below confidence gate: Loathsome Limbs The block provides no tracking mechanism for Exhaustion removal tied to limb regrowth, and Exhaustion stacking from multiple limbs is undefined in interaction with other sources.
[reskin] audit rewrite blocked — "Regeneration" is engine-authored chassis text
[reskin] audit rewrite blocked — "Loathsome Limbs" is engine-authored chassis text
```
