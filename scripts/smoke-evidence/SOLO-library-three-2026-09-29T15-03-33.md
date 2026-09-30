# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T15-03-33`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## sergeant-thrum

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Sergeant Thrum

Medium Humanoid, Lawful Neutral

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While the sergeant isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Shield Bash or Heavy Crossbow in any combination.

Shield Bash. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Heavy Crossbow. Ranged Attack Roll: +5, range 100/400 ft. 16 (4d6 + 2) Piercing damage.

Bonus Actions

Synchronized Volley (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("orders a volley") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override | defender-leader: key "orders a" (class verb)
value check: "Synchronized Volley (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Synchronized Volley (2/Day)" ("the sergeant barks a volley order that seizes every ally who can hear it, snappi [verb: volley:concept, orders a volley:concept]")
signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: keeps the shield line:concept, shield line:concept, guard:idea]")
```


---

## kazrek-bolt-caller

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Kazrek Bolt-Caller

Medium Humanoid, Lawful Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 30 ft.

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
+6
WIS
14
+2
+2
MOD
SAVE
CON
14
+2
+2
CHA
11
+0
+0

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Goblin, Common

CR 4 (XP 1,100; PB +2)

Traits

Skirmish. Kazrek ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kazrek makes two attacks, using Spiked Gauntlet or Heavy Crossbow in any combination.

Spiked Gauntlet. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Heavy Crossbow. Ranged Attack Roll: +6, range 100/400 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. Kazrek takes the Dash or Disengage action.

Reactions

Hip Snap Shot. Trigger: A creature Kazrek can see moves to within 5 feet of it. Response: Kazrek makes one Heavy Crossbow attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a hobgoblin sniper") | skirmisher-archer: key "sniper" (class noun)
value check: "Hip Snap Shot" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Hip Snap Shot" ("When a foe steps into melee reach, Kazrek can immediately loose a bolt at them — [verb: snaps off:concept, closes to melee:concept, snap shot:idea]")
signature miss: trait — "Kazrek's crossbow is reinforced with iron and his armor is drilled to steady his aim; when he stands still and fires from cover, his bolts punch through shields and light cover." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst, resonant-body)
```


---

## barrow-wight

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow-Wight

Medium Undead, Neutral Evil

AC 15
Initiative +4 (14)

HP 84 (13d8 + 26)

Speed 30 ft., Burrow 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
12
+1
+1
MOD
SAVE
DEX
18
+4
+7
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
10
+0
+0

Skills Perception +4, Stealth +10

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Grave-Dirt Spray. The first time the barrow-wight is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 24 (7d6) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Assassinate. During the first round of each combat, the barrow-wight has Advantage on attack rolls against any creature that hasn't taken a turn. If the barrow-wight hits a creature during that round, the target takes an extra 13 (3d8) Necrotic damage.

Sunlight Sensitivity. While in sunlight, the barrow-wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow-wight makes two Necrotic Sword attacks.

Necrotic Sword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Necrotic damage.

Grave-Earth Eruption (Recharge 5-6). Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the barrow-wight takes the Hide action.

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
[route] lurker-phantom type=Undead mechanics=aura — lurker-phantom: ✓ ("a barrow-wight") | lurker-phantom: no line key in the words — the model's read of its quote
print canon route: the Wight's body outranks the phantom seat — no verb in the words names it; the plain lurker line
print canon: "a barrow-wight that erupts in a shockwave of grave earth around it when roused" heads on the Wight — print's rows ride along; the seat stays
value check: "Grave-Earth Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave-Earth Eruption (Recharge 5-6)" ("the barrow-wight erupts in a shockwave of grave earth and corpse-flesh blasting  [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept]")
signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
signature template (trait): bloodied-burst -> Traits/"Grave-Dirt Spray" ("any creature that strikes it in melee is spattered with clinging earth that numb [verb: erupt:concept]")
print canon attack: "Grave Claw" -> "Necrotic Sword" — the Wight's own row
print canon trait: Sunlight Sensitivity — "a barrow-wight that erupts in a shockwave of grave earth around it when roused" is the Wight (print's own row)
```


---

## resonant-colossus

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Resonant Colossus

Huge Construct, Neutral

AC 15
Initiative -1 (9)

HP 161 (17d12 + 51)

Speed 30 ft.

MOD
SAVE
STR
18
+4
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
17
+3
+7
CHA
4
-3
-3

Skills Athletics +8, Perception +4

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses tremorsense 60 ft., darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Tolling Reprisal. A creature that hits the resonant colossus with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the resonant colossus is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The resonant colossus can't shape-shift.

Siege Monster. The resonant colossus deals double damage to objects and structures.

Actions

Multiattack. The resonant colossus makes two Gong Slam attacks.

Gong Slam. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Tremor Toll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the resonant colossus. Failure: 49 (14d6) Thunder damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Tremor Toll (Recharge 5-6). Constitution Saving Throw: DC 15, one creature within 30 feet that has the Prone condition. Failure: 45 (13d6) Thunder damage. Success: Half damage.

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
[route] brute-juggernaut type=Construct mechanics=aura — brute-juggernaut: ✓ ("a temple gong given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
nova capped: "Area Nova" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
value check: "Tremor Toll (Recharge 5-6)" EV 34.9 vs floor 12 (one attack of 2) — over the ceiling — gated Recharge 5-6
signature template: condition-payoff -> Actions/"Tremor Toll (Recharge 5-6)" ("The colossus drives its foot into the ground to knock creatures off balance and  [shape fit, no verb match]")
signature template (trait): resonant-body -> Traits/"Tolling Reprisal" ("Whenever it is struck by a melee attack, its hollow iron shell rings like a gong [verb: gong:concept, toll:idea, iron:idea, hollow:idea]")
chassis nova: "Tremor Toll (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
nova geometry: "Tremor Toll (Recharge 5-6)" — 30-foot Cone → 15-foot Emanation (the concept says in all directions)
```


---

## skarrag-the-keening

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Skarrag the Keening

Small Humanoid, Lawful Neutral

AC 15
Initiative +2 (12)

HP 60 (11d6 + 22)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+4

Skills Athletics +5, Persuasion +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Skarrag, Skarrag and its allies have Advantage on attack rolls and saving throws, provided Skarrag doesn't have the Incapacitated condition.

Actions

Multiattack. Skarrag makes two attacks, using Iron-Shod Spear or Recurve Bow in any combination.

Iron-Shod Spear. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Recurve Bow. Ranged Attack Roll: +4, range 150/600 ft. 11 (2d8 + 2) Piercing damage.

Bonus Actions

Volley Order (2/Day). Each ally within 30 feet of Skarrag that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("screams fire at will to her archers from") | defender-leader: no line key in the words — the model's read of its quote
energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
value check: "Volley Order (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Order (2/Day)" ("each ally within earshot who can see or hear her takes a Reaction to make one ra [verb: looses at will:concept, archers:concept]")
signature miss: trait — "Skarrag's iron-shot spear is not just a weapon but a parry: when a blow comes in, she turns it aside with the haft and answers with the weighted butt, leaving the attacker off balance and open. This happens whenever she is attacked in melee and is still standing to fight back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst)
```
