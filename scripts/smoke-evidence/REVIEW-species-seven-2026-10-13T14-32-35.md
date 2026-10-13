# Review batch — species-seven-2026-10-13T14-32-35

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn of the Shallows | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/7 |
| Gormak Ironjaw | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Uthlok the Unmoving | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/4 |
| Ordan Stormhollow | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Vhaug Rottenbreath | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/7 |
| Cinderbent | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Echo of No Name | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |

**Dropped 0 of 7 user clauses** (coverage 100%); concept share 24% (9/37 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Vhaug Rottenbreath — lowest CR

**Concept:** a troglodyte raider who reeks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vhaug Rottenbreath | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Jagged Stoneblade); nova none; dmg 10

```
Vhaug Rottenbreath
Medium humanoid, neutral evil
Armor Class

13 (studded leather)

Hit Points: 

27 (5d8 + 5)

Speed: 

30 ft., climb 30 ft.

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

Sunlight Sensitivity. While in sunlight, Vhaug has disadvantage on ability checks and attack rolls.
Stench. Any creature that starts its turn within 5 feet of Vhaug must make a DC 11 Constitution saving throw. On a failed save, the target is poisoned until the start of its next turn. On a successful save, the target is immune to Vhaug's Stench for 24 hours.
Skitter. Vhaug ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Vhaug takes the Dash or Disengage action.

Actions
Multiattack: Vhaug makes two attacks: one with Jagged Stoneblade and one with Hurled Scythe. It can replace one attack with a use of Opportunist's Lash.
Jagged Stoneblade: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Hurled Scythe: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Opportunist's Lash: One creature within 30 feet that is poisoned must make a DC 11 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a troglodyte raider who reeks") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: overpowering stench that sickens [aura] | pack skirmisher tactics [behavior] | jagged stone blade [object]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Vhaug reveals a stash of jagged throwing stones and hurls one at a creature it can see within range, aiming for the face or a limb. The stone lodges in the wound, leaving a jagged shard that causes sharp pain and makes the victim's movements clumsy until they or an ally takes a moment to dig it out." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vhaug's jagged stone blade is deliberately fractured and rough, and when it strikes flesh it leaves splinters behind. A creature hit by the blade is wracked with lingering pain that makes it easier for others to strike true against it." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
[reskin] signature miss: trait — "Vhaug's jagged stone blade is deliberately fractured and rough, and when it strikes flesh it leaves splinters behind. A creature hit by the blade is wracked with lingering pain that makes it easier for others to strike true against it." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst)
```


---

## Ordan Stormhollow — highest CR

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Ordan Stormhollow | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Ordan Stormhollow

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

Multiattack. Ordan makes two attacks, using Greatsword or Heavy Crossbow in any combination.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("knight") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: holds the line with shield and armor [behavior] | lightning-charged riposte against anyone who moves past [behavior] | blue dragonborn scale and storm-blooded heritage [body]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Longsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Shield Bash" -> "Heavy Crossbow" — the Knight's own ranged row
```


---

## Gormak Ironjaw — a 2014 sheet

**Concept:** an orc warchief with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Gormak Ironjaw | 5 (2014) | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Greataxe); nova none; dmg 32

```
Gormak Ironjaw
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
Aura of Authority. While in a 10-foot-radius sphere originating from Gormak, Gormak and its allies have advantage on attack rolls and saving throws, provided Gormak is not incapacitated.
Relentless Rush. As a bonus action, Gormak takes the Dash action.
Bolstering Cry (2/Day). As a bonus action, each ally within 30 feet of Gormak gains 9 (2d8) temporary hit points.

Actions
Multiattack: Gormak makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Hand Axe: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("an orc warchief") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: commanding battlefield aura [aura] | the greataxe [object] | fights beside its troops [behavior]
[reskin] signature idea (action): "Gormak roars a command to charge, and the nearest ally on the battlefield instantly surges toward a target Gormak can see within the normal speed of that ally. The ally must be able to move and must be within reach of Gormak's voice—his aura's presence—though the call is heard even beyond the aura's edge. Gormak may issue this command only once on each of his turns, and only if he is not silenced " [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] value check: "Driving Bellow (2/Day)" EV 6.6 vs floor 28.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When Gormak strikes a creature with his greataxe, the brutal impact forces the target to stagger back a step, opening a gap that an ally can immediately exploit. The creature hit must be within reach of Gormak's melee attack, and the forced step counts as the target's movement on its next turn." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When Gormak strikes a creature with his greataxe, the brutal impact forces the target to stagger back a step, opening a gap that an ally can immediately exploit. The creature hit must be within reach of Gormak's melee attack, and the forced step counts as the target's movement on its next turn." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Sarn of the Shallows — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sarn of the Shallows | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Sarn of the Shallows

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

Assassinate. During the first round of each combat, Sarn has Advantage on attack rolls against any creature that hasn't taken a turn. If Sarn hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. Sarn can hold its breath for 15 minutes.

Marsh Stalker. Sarn ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sarn makes two Spear attacks.

Spear. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of Sarn's next turn.

Hurled Scythe. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sarn takes the Dash, Disengage, or Hide action.

Predatory Focus (2/Day). Sarn has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Humanoid mechanics=thrown-weapon — skirmisher: ✓ ("stalks the marsh with a spear") | skirmisher -> skirmisher-skulker: the concept's VERB outranks the noun (key "stalks", class verb) | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: hurled spear from cover [object] | stalking the marsh [behavior] | brine-slicked hide [body]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Sarn lashes its spear low through the shallows, flinging a sheet of brine and silt into the eyes of everyone directly ahead of it in a short cone. Anyone caught in the splash is half-blind, struggling to track Sarn or land a clean strike until they can wipe their face. It is the marsh itself fighting alongside the hunter." [action/save/condition] — menu: snare, reel, throw-retrieve, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus, throw-retrieve (stalk, spear)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus, throw-retrieve
[reskin] value check: "Marsh Stalker (2/Day)" EV 1.1 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Predatory Focus (2/Day)" ("The idea's central verb 'stalk' matches the focus template's (concept) verb matc [verb: stalk:concept, track:idea]")
[reskin] signature idea (trait): "Sarn's hide stays permanently slick with marsh brine and algae; it leaves no trail and clings to nothing. While in or beside water, reeds, or mud, it can slip through the tightest cover without a sound, and creatures that try to grab or cling to it slide off." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature bound by force: trait — "faultless-tracker" matches stalks+stalk in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Cinderbent — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Cinderbent | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 4 → 4; sustained 26 (2 × Spear); nova none; dmg 26

```
Cinderbent

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

Traits

Flame-Fear Fugue. While the cinderbent isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. The cinderbent makes two attacks, using Spear or Crossbow in any combination. It can replace one attack with a use of Shield Bash.

Spear. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Crossbow. Ranged Attack Roll: +4, range 80/320 ft. 11 (2d8 + 2) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the cinderbent can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of the cinderbent misses it with a melee attack roll. Response: The cinderbent makes one Spear attack against that creature.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a tiefling duelist") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: darting duelist footwork [behavior] | rapier precision [object] | flammable ashen body [body]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 75 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "When the cinderbent hits a creature with its rapier, it can twist the blade and pin the wound shut around the steel, then pivot to hurl the impaled prey away from itself. The thrown creature is sent stumbling and cannot immediately rush back into the fight, which buys the duelist its signature retreating step." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, reel, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (duelist)
[reskin] signature bound by force: action — "riposte" matches duelist in the user's words; the model's none is overruled
[reskin] value check: "Riposte" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Riposte" ("exact concept match [verb: duelist:concept, rapier:idea]")
[reskin] signature idea (trait): "The cinderbent's infernal blood carries an old terror of flame: whenever it takes fire damage, it must immediately abandon its weapons and flee as fast as it can, shrieking, for several seconds before its composure returns. It will not willingly enter or remain in any open flame while this terror lasts." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — guarded-stance (duelist)
[reskin] signature template (trait): guarded-stance -> Traits/"Flame-Fear Fugue" ("The idea is a fear-driven combat state the creature is in — while not yet 'broke [verb: duelist:concept]")
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Rapier" -> "Spear" — the Gladiator's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Gladiator's
[reskin] print canon: chassis row leaves — Traits/"Ash Step" is the seat's, not the Gladiator's
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---

## Uthlok the Unmoving — one marked soft

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Uthlok the Unmoving | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Claw); nova none; dmg 24

```
Uthlok the Unmoving

Medium Humanoid, Neutral

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

Senses darkvision 30 ft.; Passive Perception 12

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Uthlok can hold its breath for 1 hour.

Actions

Multiattack. Uthlok makes two Claw attacks.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Bonus Actions

Engulf. Uthlok engulfs one Medium or smaller creature it is grappling. While engulfed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Uthlok, and takes 4 (1d8) Acid damage at the start of each of Uthlok's turns. Uthlok can have only one creature engulfed at a time. If Uthlok takes 9 damage or more in a single turn from the engulfed creature, Uthlok must expel the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Uthlok. If Uthlok dies, an engulfed creature pulls free of the mass Prone by using 5 feet of movement.

Shell Defense. Uthlok withdraws into a boulder-like shell of fused, mineral-crusted plates. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] brute-grappler type=Humanoid mechanics=grapple, engulf — brute-grappler: ✓ ("withdraws into his shell") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into its shell [behavior] | shell that engulfs and crushes [body] | hermit's hermetic isolation [aura]
[reskin] signature idea (action): "Uthlok pulls his head and limbs in, seals himself against the world, and becomes a boulder of fused shell. Until he chooses to emerge, his shell blunts almost all harm that comes at him and he cannot be forced to move or let go of what he holds, but he also cannot attack or pursue anyone. Anyone who stands within reach of the withdrawn shell finds the grinding mineral edge punishing them if they l" [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Sealed Bulwark" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("Uthlok pulls his head and limbs in, seals himself against the world, and becomes [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Uthlok's isolation is total: if no creature is grappling him, engulfed by him, or within reach of his claws at the start of his turn, he simply stops responding to the world, becoming unaware of anything beyond his shell until someone comes close enough to disturb his meditation." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```
