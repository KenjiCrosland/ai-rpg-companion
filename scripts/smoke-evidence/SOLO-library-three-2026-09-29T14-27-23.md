# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T14-27-23`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## barrow-wight

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow Wight

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

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

Skills Athletics +7, Perception +3

Immunities Necrotic, Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Grave-Blight Burst. The first time the barrow-wight is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 24 (7d6) Necrotic damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage only.

Necrotic Absorption. Whenever the barrow-wight is subjected to Necrotic damage, it takes no damage and instead regains a number of Hit Points equal to the Necrotic damage dealt.

Magic Resistance. The barrow-wight has Advantage on saving throws against spells and other magical effects.

Sunlight Sensitivity. While in sunlight, the barrow-wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow-wight makes two Necrotic Sword attacks.

Necrotic Sword. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 4 (1d8) Necrotic damage.

Grave Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

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
[route] brute-juggernaut type=Undead mechanics=aura — brute-juggernaut: ✓ ("erupts in a shockwave of grave earth aro")
value check: "Grave Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave Eruption (Recharge 5-6)" ("The wight erupts in a shockwave, violently shoving everything around it; the gro [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept]")
signature template (trait): bloodied-burst -> Traits/"Grave-Earth Spray" ("When struck it releases a spray of corrupting grave-earth; the closest printed f [verb: erupt:concept]")
```
