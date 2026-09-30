# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T14-16-10`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## dwarf-crossbow-sergeant

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Dwarf Crossbow Sergeant

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

Languages Common, Dwarvish

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Shield Bash or Hand Crossbow in any combination.

Shield Bash. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Hand Crossbow. Ranged Attack Roll: +5, range 30/120 ft. 16 (4d6 + 2) Piercing damage.

Bonus Actions

Volley Order (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("orders a volley") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override
value check: "Volley Order (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Order (2/Day)" ("orders a volley — every ally who can hear him looses a bolt at the same instant [verb: volley:concept, orders a volley:concept]")
```


---

## legion-sharpshooter

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Legion Sharpshooter

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

Languages Common, Goblin

CR 4 (XP 1,100; PB +2)

Traits

Disciplined Footwork. The sharpshooter ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The sharpshooter makes two attacks, using Bayonet or Crossbow in any combination.

Bayonet. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Crossbow. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The sharpshooter takes the Dash or Disengage action.

Reactions

Point-Blank Discipline. Trigger: A creature the sharpshooter can see moves to within 5 feet of it. Response: The sharpshooter makes one Crossbow attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a hobgoblin sniper who snaps off a shot")
value check: "Point-Blank Discipline" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Point-Blank Discipline" ("a foe closes to melee and the sharpshooter instantly fires a single bolt at that [verb: snaps off:concept, closes to melee:concept]")
signature miss: trait — "A legion-issue crossbow is no clumsy hunting weapon: in the sharpshooter's hands, its bolts drive through armor and flesh with a precision that leaves no doubt which side of the line is disciplined. The shot lands true, and the wound is one the enemy will remember." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst, bloodied-burst)
```


---

## barrow-wight

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow-Wight

Medium Undead, Neutral

AC 20
Initiative -1 (9)

HP 127 (17d8 + 51)

Speed 10 ft.

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Sunlight Sensitivity. While in sunlight, the barrow-wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow-wight makes two Slashing Sword attacks.

Slashing Sword. Melee Attack Roll: +7 (with Advantage if the target is Grappled by the barrow-wight), reach 5 ft. 13 (2d8 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15).

Bonus Actions

False Form. The barrow-wight shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Undead mechanics=aura — lurker-trap: ✓ ("erupts in a shockwave of grave earth aro")
```


---

## iron-chime

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Iron Chime

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

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

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Thunder Absorption. Whenever the iron chime is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The iron chime can't shape-shift.

Siege Monster. The iron chime deals double damage to objects and structures.

Actions

Multiattack. The iron chime makes two Stomp attacks. It can replace one attack with a use of Tolling Retort.

Stomp. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Tremor Toll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the iron chime. Failure: 49 (14d6) Thunder damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Tolling Retort. Strength Saving Throw: DC 15, one creature within 30 feet that is Prone. Failure: 18 (4d8) Thunder damage. Success: Half damage.

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("a temple gong given legs")
value check: "Seismic Toll (2/Day)" EV 9 vs floor 38.9 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
value check: "Opportunist's Lash" EV 14 vs floor 12 (one attack of 2) — worth the trade
library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
signature miss: trait — "Each heavy footfall of the Iron Chime leaves the ground tolling like a struck bell, carrying its rhythm along the earth to anyone in contact with it. Creatures the chime itself has already knocked down keep feeling that rhythm in their bones, so standing back up is slower and harder than it should be." [trait/always/condition] — the model found no template that holds it (offered: resonant-body)
```


---

## grixa-the-firecaller

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Grixa the Firecaller

Small Humanoid, Neutral

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

Languages Goblin, Common

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Grixa, Grixa and its allies have Advantage on attack rolls and saving throws, provided Grixa doesn't have the Incapacitated condition.

Actions

Multiattack. Grixa makes two attacks, using Jagged Parry or Bone Bow in any combination.

Jagged Parry. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Bone Bow. Ranged Attack Roll: +4, range 150/600 ft. 11 (2d8 + 2) Piercing damage.

Bonus Actions

Screaming Volley (2/Day). Each ally within 30 feet of Grixa that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("screams fire at will to her archers from")
value check: "Screaming Volley (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Screaming Volley (2/Day)" ("the idea's core is an ally within earshot taking a ranged attack roll as a React [verb: looses at will:concept, archers:concept, volley:idea, loose:idea]")
signature miss: trait — "Whenever Grixa is behind cover or an ally is between her and an attacker, she can duck, bark, and shift the line, letting a nearby ally step into the blow meant for her while she keeps directing the fire." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-burst)
```
