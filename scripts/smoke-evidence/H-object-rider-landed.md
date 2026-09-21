## 01. Notched Duelist — CR 7

**Input:** `a mercenary duelist with a notched saber and a dagger in the off hand`
**Donor:** skirmisher-3 -> CR 7
**Signature:** custom · **elapsed** 12s

### Block
```
Notched Duelist

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 117 (18d8 + 36)

Speed 50 ft.

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
18
+4
+7
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +7

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, one other language

CR 7 (XP 2,900; PB +3)

Traits

Footwork. The notched duelist ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The notched duelist makes two attacks, using Notched Saber or Dagger Flick in any combination.

Notched Saber. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage. When the notched duelist hits with this attack, the target's Speed is reduced by 10 feet until the end of its next turn, and the next attack roll the notched duelist makes against the target before then has Advantage.

Dagger Flick. Ranged Attack Roll: +7, range 30/90 ft. 22 (4d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The notched duelist takes the Dash or Disengage action.

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

### Trace
```
[concept] synthesis: archetype=skirmisher type=Humanoid themes=armed/beguiling mind=sapient lore=✓
[concept] lore: A discharged blade-for-hire from a dissolved free company, it wanders the borderlands selling its saber to whichever side will pay and betraying them the moment the purse runs light.
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/beguiling mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: notched saber with off-hand dagger [object] | feint-and-riposte dueling style [behavior] | mercenary opportunism [aura]
[concept] identity: A CR 7 mercenary duelist who opens by shadowing the most valuable enemy and using Off-Hand Feint with the dagger to draw a guard before delivering a precise notched-saber cut. Once bloodied, it disengages with a riposte, repositions behind cover or an ally, and lets its opponents come to it—never staying in a straight fight it cannot win.
[concept] lore: A discharged blade-for-hire from a dissolved free company, it wanders the borderlands selling its saber to whichever side will pay and betraying them the moment the purse runs light.
[reskin] donor: skirmisher-3 -> CR 7
[reskin] seats: action <- "feint-and-riposte dueling style" | trait <- "notched saber with off-hand dagger"
[reskin] trait wildcard rejected — name over 4 words: The creature wields a notched saber in its main hand and a dagger in its off hand. While it has both weapons drawn, mele
[reskin] object rider: "notched saber with off-hand dagger" rides "Notched Saber" — the engine chose the slot; the model writes the payload
[reskin] informed wildcard — written against the assembled sheet
[reskin] rider appended to "Notched Saber": When the notched duelist hits with this attack, the target's Speed is reduced by
[reskin] repair trait draft rejected — name collides with an existing entry (exact or near-namesake): The duelist wields a notched saber in its main hand and a dagger in its off hand. While both weapons
[reskin] repair trait draft rejected — name collides with an existing entry (exact or near-namesake): The duelist wields a notched saber in its main hand and a dagger in its off hand. While both weapons
[reskin] repair trait draft rejected — name collides with an existing entry (exact or near-namesake): The duelist wields a notched saber in its main hand and a dagger in its off hand. While both weapons
[reskin] wildcard repair skipped — Failed to generate a valid response. Please try again later.
[reskin] trait repair failed — no repair; no trait ships
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] done: "Notched Duelist" — donor skirmisher-3, CR 7
```
