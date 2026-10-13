# Review batch — species-seven-2026-10-13T17-21-18

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mere Stalker | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Orc Warchief | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Old Road Warden | 3 | 2024 | brute-2 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/4 |
| Stormgate Knight | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Reekmaw Creeper | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/7 |
| Ashvowed Brannor | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Quillhook | 2 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |

**Dropped 1 of 7 user clauses** (coverage 86%); concept share 51% (18/35 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Reekmaw Creeper — lowest CR

**Concept:** a troglodyte raider who reeks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reekmaw Creeper | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Claw); nova none; dmg 10

```
Reekmaw Creeper
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

Sunlight Sensitivity. While in sunlight, the reekmaw creeper has disadvantage on ability checks and attack rolls.
Stench. Any creature that starts its turn within 5 feet of the reekmaw creeper must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. On a successful save, the creature is immune to the reekmaw creeper's Stench for 24 hours.
Skittering Raider. The reekmaw creeper ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the reekmaw creeper takes the Dash or Disengage action.

Actions
Multiattack: The reekmaw creeper makes two attacks: one with its Claw and one with its Bone Shard. It can replace one attack with a use of Opportunist's Lash.
Claw: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Bone Shard: Ranged Weapon Attack: +3 to hit, range 20/60 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Opportunist's Lash: One creature within 30 feet of the reekmaw creeper that is poisoned must make a DC 11 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("troglodyte raider") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: stench that sickens and poisons [aura] | pack hit-and-run tactics [behavior] | raider's stone claw attacks [body]
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The reekmaw creeper befouls its own stone claws with filth from its warren, then scuttles past a foe and slashes low across the legs. A creature hit this way cannot easily chase the pack: its stride falters, and the reek clings to it until the end of its next turn, leaving it ripe for the next skulking ambush." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The reekmaw creeper befouls its own stone claws with filth f…" is tried as an action
[reskin] signature idea (action): "The reekmaw creeper befouls its own stone claws with filth from its warren, then scuttles past a foe and slashes low across the legs. A creature hit this way cannot easily chase the pack: its stride falters, and the reek clings to it until the end of its next turn, leaving it ripe for the next skulking ambush." [action/save/movement] — menu: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The reekmaw creeper befouls its own stone claws with filth from its warren, then scuttles past a foe and slashes low across the legs. A creature hit this way cannot easily chase the pack: its stride falters, and the reek clings to it until the end of its next turn, leaving it ripe for the next skulking ambush." [action/save/movement] — no template on the shelf shares a verb with the concept or the idea (offered: snare, throw-retrieve, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The reekmaw creeper's stone claws are shaped by a lifetime of clawing through tunnel rock, and they leave jagged, weeping wounds on flesh. Any creature the reekmaw creeper strikes with its claws continues to bleed and sting from stone grit and reek until it or an ally takes a moment to staunch the wound." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
[reskin] signature miss: trait — "The reekmaw creeper's stone claws are shaped by a lifetime of clawing through tunnel rock, and they leave jagged, weeping wounds on flesh. Any creature the reekmaw creeper strikes with its claws continues to bleed and sting from stone grit and reek until it or an ally takes a moment to staunch the wound." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, blurred-form, death-burst, bloodied-burst)
```


---

## Stormgate Knight — highest CR

**Concept:** a blue dragonborn knight

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormgate Knight | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Stormgate Knight

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

Multiattack. The stormgate knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.

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
[concept] signature elements: holding the line as a living shield-wall [behavior] | storm-charged blade and breath [object] | blue dragonborn scale and crest [body]
[reskin] print canon: "a blue dragonborn knight" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Knight's
[reskin] print canon senses: "none" — the Knight's
[reskin] print canon attack: "Fangs" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Stormbrand" -> "Heavy Crossbow" — the Knight's own ranged row
```


---

## Orc Warchief — a 2014 sheet

**Concept:** an orc warchief with a greataxe

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Orc Warchief | 5 (2014) | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Greataxe); nova none; dmg 32

```
Orc Warchief
Medium humanoid, neutral evil
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

Great Weapon Master. When the warchief hits a creature with its greataxe, the attack deals an extra 3 damage.
Aura of Authority. While the warchief is not incapacitated, it and each ally within 10 feet of it have advantage on attack rolls and saving throws.
Relentless Rush. As a bonus action, the warchief takes the Dash action.
Greataxe Riposte. As a bonus action, one creature within 5 feet of the warchief that hit it with an attack roll since the end of the warchief's last turn takes 7 (2d6) bludgeoning damage.

Actions
Multiattack: The warchief makes two Greataxe attacks.
Greataxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Handaxe: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("an orc warchief with a greataxe") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: greataxe parry [behavior] | aura of command [aura] | scarred iron wargear [object]
[reskin] signature idea (action): "When a creature strikes the warchief in melee, the warchief can immediately deflect the blow with the flat of its greataxe and answer with a brutal counterstroke. The parry turns the attacker's momentum against them, leaving them reeling and exposed. The warchief can only parry and riposte when it can see the incoming attack and is still holding its greataxe." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] value check: "Greataxe Riposte" EV 3.9 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Greataxe Riposte" ("The warchief makes a brutal counterattack ('answer') against a creature within 5 [verb: answer:idea]")
[reskin] signature idea (trait): "The warchief's scarred iron wargear is a patchwork of every rival it has broken—each dent and rent a story of survival. When the warchief takes a grievous wound, the sight of its own scarred iron and the blood of its foes whips it into a fiercer frenzy, making it deadlier as the fight drags on." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Mere Stalker — a 2024 sheet

**Concept:** a lizardfolk hunter who stalks the marsh with a spear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mere Stalker | 2 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 2 → 1.25; sustained 14 (2 × Spear); nova none; dmg 14

```
Mere Stalker

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

Assassinate. During the first round of each combat, the mere stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the mere stalker hits a creature during that round, the target takes an extra 4 (1d8) Bludgeoning damage.

Hold Breath. The mere stalker can hold its breath for 15 minutes.

Marsh Stride. The mere stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The mere stalker makes two Spear attacks.

Spear. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 20/60 ft. 7 (1d8 + 3) Piercing damage, and the target has Disadvantage on its next attack roll before the start of the mere stalker's next turn.

Bonus Actions

Cunning Action. The mere stalker takes the Dash, Disengage, or Hide action.

Stalking Focus (2/Day). The mere stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: spear thrown from cover [object] | stalking the marsh reeds [behavior] | venomous bite and barbed hide [body]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The stalker hurls a spear that sinks in and stays: the barbed head lodges in the target's flesh, trailing a length of marsh-reed cord back to the stalker's claw. As long as the spear stays bitten into the prey, the stalker can follow it no matter how the marsh twists, dragging itself through mud and reeds toward the wounded thing, and when it finally closes the distance it rips the barb free in a " [rider/on_hit/movement] — menu: bolt-mark (+ shelf: gaze-single, snare, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Stalking Focus (2/Day)" EV 1.1 vs floor 1.1 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Stalking Focus (2/Day)" ("The idea's central verb is 'stalk' — a predator's patient pursuit that ends in a [verb: stalk:concept]")
[reskin] signature idea (trait): "The bark of the mere stalker's hide bristles with tiny barbed scales, and its bite carries the rot of dead water. Anything that grapples it, swallows it, or clamps onto it in melee is pricked and envenomed, and the poison thickens in the marsh air around it so that even a near miss from its spear leaves the wound burning and slow to close." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature bound by force: trait — "faultless-tracker" matches stalks+stalk in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Ashvowed Brannor — a print donor

**Concept:** a tiefling duelist who hates fire and takes extra damage from it

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Brannor | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 2 → 3; sustained 13 (1 × Spear); nova none; dmg 13

```
Ashvowed Brannor

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

Guarded Stance. While the ashvowed brannor isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Spear. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 13 (2d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the ashvowed brannor can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of the ashvowed brannor misses it with a melee attack roll. Response: The ashvowed brannor makes one Spear attack against that creature.

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
[concept] signature elements: fire-hating duelist [behavior] | infernal blood [body] | dueling blade [object]
[reskin] print canon pb: print's +7 on PB +3 reads +6 on this sheet's PB +2; DCs follow
[reskin] print canon defenses: HP 75 -> 112, AC 16 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +6, DC 14 (print's, on this sheet's PB)
[reskin] print canon: "a tiefling duelist who hates fire and takes extra damage from it" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "The brannor lunges at a foe it can see and makes a single sabre attack. On a hit, it can immediately use its reaction to make one additional sabre attack against the same target, provided that target is wielding fire or has dealt fire damage since the end of the brannor's last turn." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (duelist)
[reskin] value check: "Cinderchase Lunge" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
[reskin] signature template: riposte -> Reactions/"Cinderchase Lunge" ("There is no verb match and the trigger differs (it is not a miss reaction but a  [verb: duelist:concept, sabre:idea]")
[reskin] signature idea (trait): "Whenever the brannor takes fire damage, its inner infernal heat surges. Until the end of its next turn, its speed increases by 10 feet and its melee attacks deal additional fire damage." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — guarded-stance (duelist)
[reskin] signature bound by force: trait — "guarded-stance" matches duelist in the user's words; the model's none is overruled
[reskin] signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: duelist:concept]")
[reskin] print canon languages: "Common, Infernal" -> "Common, Infernal" — the Gladiator's plus the concept's Infernal
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Sabre" -> "Spear" — the Gladiator's own row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Gladiator's
[reskin] print canon: chassis row leaves — Traits/"Emberstep" is the seat's, not the Gladiator's
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---

## Old Road Warden — one marked soft

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Old Road Warden | 3 | brute-2 | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Horrid Display: at-will multi-target control with no damage and no gate
- read: def 2 / off 3 → 2.5; sustained 24 (1 × Shell); nova none; dmg 24

```
Old Road Warden

Medium Humanoid, Neutral

AC 17
Initiative -1 (9)

HP 65 (10d8 + 20)

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
8
-1
-1
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
6
-2
-2

Skills Athletics +5, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 3 (XP 700; PB +2)

Traits

Hold Breath. Warden can hold its breath for 1 hour.

Actions

Shell. Melee Attack Roll: +5, reach 5 ft. 24 (6d6 + 3) Bludgeoning damage.

Horrid Display. Wisdom Saving Throw: DC 12, each creature of Warden's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Shell Defense. Warden withdraws into its shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] brute type=Humanoid mechanics=none — brute-grappler: ✓ ("withdraws into his shell") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: retreating into an armored shell under pressure [behavior] | a massive stone-and-hide carapace [body]
[reskin] signature idea (action): "When the warden is hurt badly, he slams his weight down and grinds forward like a battering ram, using his shell as a moving fortress. Everyone caught in his path is shoved aside and left sprawling, and the warden himself settles into a braced, planted stance that makes him harder to shift. He becomes an immovable roadblock that punishes anyone trying to get past." [action/save/movement] — menu: trample, leap, condition-payoff, throw-retrieve, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: rampage, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Horrid Display (2/Day)" EV 25.3 vs floor 19.4 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] library seed drawn: terror-pulse -> Actions/"Horrid Display (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden's stone-and-hide carapace is so massive and dense that whenever something strikes him, the impact forces the attacker to give ground or be knocked off balance. Foes that hit him in melee are pushed back a step, their momentum turned against them." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The warden's stone-and-hide carapace is so massive and dense that whenever something strikes him, the impact forces the attacker to give ground or be knocked off balance. Foes that hit him in melee are pushed back a step, their momentum turned against them." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
```
