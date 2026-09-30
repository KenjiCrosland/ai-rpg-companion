# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T13-36-41`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## grukkha-the-pyrewall

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Grukkha the Pyrewall

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

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 10

Languages Goblin, Common

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Grukkha, Grukkha and its allies have Advantage on attack rolls and saving throws, provided Grukkha doesn't have the Incapacitated condition.

Actions

Multiattack. Grukkha makes two attacks, using Scimitar or Longbow in any combination.

Scimitar. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Longbow. Ranged Attack Roll: +4, range 150/600 ft. 11 (2d8 + 2) Fire damage.

Bonus Actions

Screaming Volley (2/Day). Each ally within 30 feet of Grukkha that can see or hear it can take a Reaction to make one ranged attack roll.

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
signature template: volley-order -> Bonus Actions/"Screaming Volley (2/Day)" ("Every ally within earshot of that scream who has a bow or sling looses immediate [verb: fire at will:concept, archers:concept, volley:idea]")
signature miss: trait — "Grukkha's throat and lungs are caked with ash from the burning warren, and her defiant screams carry through smoke, wind, and the roar of fire. She can be heard clearly by allies and enemies alike through any noise or obstruction that would muffle a normal voice." [trait/always/defense] — the model found no template that holds it (offered: bloodied-burst)
```
