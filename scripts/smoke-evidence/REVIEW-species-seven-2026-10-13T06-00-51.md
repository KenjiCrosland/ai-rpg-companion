# Review batch — species-seven-2026-10-13T06-00-51

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Orukk the Larder-Thief | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Gormak Skullsplitter | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Warden Shell-of-Stone | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Stormwall Vaelkar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Skarn the Reek | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/6 |
| Veyra Ashbrand | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Sablevox | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |

**Dropped 0 of 7 user clauses** (coverage 100%); concept share 33% (11/33 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Skarn the Reek — lowest CR

**Concept:** a troglodyte raider who reeks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Skarn the Reek | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Claw); nova none; dmg 10

```
Skarn the Reek
Medium humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

27 (5d8 + 5)

Speed: 

30 ft., swim 30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

12 (+1)

	

12 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Sunlight Sensitivity. While in sunlight, Skarn has disadvantage on ability checks and attack rolls.
Stench. Any creature that starts its turn within 5 feet of Skarn must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. On a successful save, the target is immune to Skarn's Stench for 24 hours.
Skittering. Skarn ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Skarn takes the Dash or Disengage action.

Actions
Multiattack: Skarn makes two attacks: one with Claw and one with Hurled Spear.
Claw: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Hurled Spear: Skarn hurls a jagged spear. Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 5 (1d8 + 1) piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until Skarn spends 5 feet of movement in that space to recover it, Skarn's speed is halved and it can't use this action.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a troglodyte raider") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: overwhelming stench [aura] | pack skirmisher [behavior] | bone-tipped claws and spear [object]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Skarn hurls a jagged spear with a shrieking cry that splits the air. Creatures near the spear’s flight path must momentarily cover their ears or lose their bearings, flinching away from the raider and leaving Skarn a clear path to slip through. The disruption lasts only a heartbeat, but in that instant Skarn’s allies can close in or Skarn can vanish into the dark." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Shrieking Spear" EV 3.6 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] signature template: throw-retrieve -> Actions/"Shrieking Spear" ("Skarn hurls a jagged spear with a shrieking cry; the spear is thrown and lands,  [verb: spear:idea]")
[reskin] signature idea (trait): "The reek clings to Skarn’s bone-tipped weapons, so every fresh wound burns with a nauseating musk. A creature struck by Skarn’s claw or spear carries the stink on its skin, drawing the attention of Skarn’s pack and making it easier for them to track and surround the victim." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
audit finding below confidence gate: Stench The Stench trait's signature action (a Constitution save) contradicts the stat chosen elsewhere for bodily fortitude — the chassis treats Constitution as the poison-resisting save, yet here it is used as the save to avoid being poisoned, which is backward.
```


---

## Stormwall Vaelkar — highest CR

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Stormwall Vaelkar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Stormwall Vaelkar

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
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
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Draconic, Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vaelkar makes two attacks, using Greatsword or Heavy Crossbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage plus 4 (1d8) Radiant damage.

Heavy Crossbow. Ranged Attack Roll: +7, range 100/400 ft. 22 (4d8 + 4) Piercing damage.

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
[route] defender type=Humanoid mechanics=breath — defender: ✓ ("knight") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: shield-wall interception [behavior] | lightning-infused blade [object] | thunderous sentinel aura [aura]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Longsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Javelin" -> "Heavy Crossbow" — the Knight's own ranged row
```


---

## Gormak Skullsplitter — a 2014 sheet

**Concept:** an orc warchief with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Gormak Skullsplitter | 5 (2014) | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Greataxe); nova none; dmg 32

```
Gormak Skullsplitter
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

14 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 120 ft., passive Perception 10

Languages: 

Common, Orc

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Gormak hits a creature with its greataxe, the attack deals an extra 3 damage.
Aura of Authority. While within 10 feet of Gormak, Gormak and its allies have advantage on attack rolls and saving throws, provided Gormak is not incapacitated.
Relentless Rush. As a bonus action, Gormak takes the Dash action.
Warleader's Howl (2/Day). As a bonus action, each ally within 30 feet of Gormak gains 9 (2d8) temporary hit points.

Actions
Multiattack: Gormak makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Handaxe: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("orc warchief") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: iron greataxe [object] | commanding aura [aura] | fight beside troops [behavior]
[reskin] signature idea (action): "Gormak roars a command straight at one enemy champion, naming them and daring them to hold the line. Until that champion either lands a solid blow on Gormak or is cut down, Gormak's warriors fight as if the challenge itself were a war-drum: every ally who can see or hear Gormak shrugs off the urge to run, and Gormak alone can be baited into overcommitting against that champion. Only one challenge " [bonus_action/always/condition] — menu: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature miss: action — "Gormak roars a command straight at one enemy champion, naming them and daring them to hold the line. Until that champion either lands a solid blow on Gormak or is cut down, Gormak's warriors fight as if the challenge itself were a war-drum: every ally who can see or hear Gormak shrugs off the urge to run, and Gormak alone can be baited into overcommitting against that champion. Only one challenge " [bonus_action/always/condition] — the model found no template that holds it (offered: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, terror-pulse, herd)
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Gormak's greataxe is clan-iron, kept keen by habit and hate. Whenever Gormak cuts a foe down with it, the killing stroke carries through: the nearest ally who saw the kill takes heart and fights with renewed savagery until Gormak's next turn." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Gormak's greataxe is clan-iron, kept keen by habit and hate. Whenever Gormak cuts a foe down with it, the killing stroke carries through: the nearest ally who saw the kill takes heart and fights with renewed savagery until Gormak's next turn." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
```


---

## Orukk the Larder-Thief — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Orukk the Larder-Thief | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Orukk the Larder-Thief

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 44 (8d8 + 8)

Speed 30 ft., Swim 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Draconic

CR 2 (XP 450; PB +2)

Traits

Assassinate. During the first round of each combat, Orukk has Advantage on attack rolls against any creature that hasn't taken a turn. If Orukk hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. Orukk can hold its breath for 15 minutes.

Marsh Stalker. Orukk ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Orukk makes two Spear attacks.

Spear. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of Orukk's next turn.

Marsh Hunter's Cast. Orukk hurls a spear. Ranged Attack Roll: +5, range 30/120 ft. 7 (1d8 + 3) Bludgeoning damage. The weapon lands in an unoccupied space within 5 feet of the target; until Orukk spends 5 feet of movement in that space to recover it, Orukk's Speed is halved and it can't use this action.

Bonus Actions

Cunning Action. Orukk takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("stalks the marsh with a spear") | skirmisher-hurler -> skirmisher-skulker: the concept's VERB outranks the noun (key "stalks", class verb) | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: stalking the marsh [behavior] | barbed spear [object] | venomous bite [body]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Orukk lunges low through the reeds and drives its barbed spear upward into a single foe, and that target cannot escape cleanly: the barbs hold fast, and if it tries to run or slip away from Orukk, the wound tears wider and it stumbles to a halt beside him." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: gaze-single, snare, reel, throw-retrieve, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — throw-retrieve, focus (spear, stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into throw-retrieve, focus
[reskin] value check: "Marsh Hunter's Cast" EV 4.8 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] signature template: throw-retrieve -> Actions/"Marsh Hunter's Cast" ("hurling the spear is the concept's own verb, and the hunter stalking the marsh i [verb: spear:concept]")
[reskin] signature idea (trait): "The barbs on Orukk's … are carved from marsh bone and never come out clean; anyone he hits with it keeps bleeding quietly and leaves a bright trail through the reeds, so Orukk tracks that prey without fail and knows exactly where it went." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Veyra Ashbrand — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Veyra Ashbrand | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 4 → 4; sustained 26 (2 × Spear); nova none; dmg 26

```
Veyra Ashbrand

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
+4
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
12
+1
+1
MOD
SAVE
CON
16
+3
+3
CHA
15
+2
+2

Skills Perception +3, Stealth +4

Vulnerabilities Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Veyra makes two attacks, using Spear or Dagger in any combination. It can replace one attack with a use of Shield Bash.

Spear. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Dagger. Ranged Attack Roll: +6, range 30/90 ft. 13 (2d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that Veyra can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a tiefling duelist who hates fire and ta") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: agile dueling with a rapier [behavior] | hatred of fire and extra damage from it [behavior] | ashen, scorched tiefling body [body]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 75 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "Veyra marks one foe with a searing line of insult, memory, and challenge. Until she wounds someone else or the marked foe falls, her rapier finds that target's openings more easily, and she reads its stance well enough to slip away from its reprisals. The taunt carries the old academy's cruelty; other enemies are invisible to her while the duel remains unresolved." [action/always/condition] — menu: trample, leap, gaze-single, snare, reel, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.3 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Fire is not just her hatred but her trigger; while any flame clings to her, the duelist's arrogance shatters and she abandons all tactics to flee the source of the burning. Only once the fire is out does her precision return." [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Fire is not just her hatred but her trigger; while any flame clings to her, the duelist's arrogance shatters and she abandons all tactics to flee the source of the burning. Only once the fire is out does her precision return." [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, bloodied-burst, evasion, guarded-stance, death-burst)
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Rapier" -> "Spear" — the Gladiator's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Gladiator's
[reskin] print canon: chassis row leaves — Traits/"Infernal Grace" is the seat's, not the Gladiator's
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```
