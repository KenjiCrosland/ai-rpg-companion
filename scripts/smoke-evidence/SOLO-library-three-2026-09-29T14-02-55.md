# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T14-02-55`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## sergeant-durnhal

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Sergeant Durnhal

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

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Shield or Crossbow in any combination.

Shield. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 16 (4d6 + 2) Piercing damage.

Bonus Actions

Sergeant's Volley (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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
value check: "Sergeant's Volley (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Sergeant's Volley (2/Day)" ("the sergeant snaps a command that up to three allies who hear it can answer by l [verb: volley:concept, orders a volley:concept, loose:idea]")
signature miss: trait — "The sergeant keeps a heavy crossbow braced and half-drawn low against its hip while the shield comes up, so the spent string never has to travel far to be cocked again. As long as the shield is in hand, no order, shove, or wound stops the sergeant from finishing a loaded shot." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
```
