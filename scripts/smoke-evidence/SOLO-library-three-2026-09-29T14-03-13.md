# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T14-03-13`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## barrow-wight

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow-Wight

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

Speed 40 ft.

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
6
-2
-2

Skills Athletics +7, Perception +3

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Sunlight Sensitivity. While in sunlight, the barrow-wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow-wight makes two attacks, using Necrotic Sword or Bone Bow in any combination.

Necrotic Sword. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Slashing damage. plus 4 (1d8) Necrotic damage.

Bone Bow. Ranged Attack Roll: +7, range 150/600 ft. 22 (4d8 + 4) Bludgeoning damage.

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
[route] brute type=Undead mechanics=aura — brute: ✓ ("a shockwave of grave earth around it whe")
```
