## 01. Bog Troll — CR 8

**Input:** `a bog troll that drags victims under the mire and holds them down`
**Donor:** brute-8-grappler -> CR 8
**Signature:** custom · **elapsed** 15s

### Block
```
Bog Troll

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 40 ft., Burrow 30 ft., Swim 40 ft.

MOD
SAVE
STR
20
+5
+8
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
12
+1
+1
MOD
SAVE
CON
17
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Bog-Soaked Hide. The bog troll can hold its breath for 1 hour. While in a swamp, marsh, or other bog terrain, the bog troll has Advantage on Dexterity (Stealth) checks and can move at its full Speed through nonmagical Difficult Terrain.

Regeneration. The bog troll regains 15 Hit Points at the start of each of its turns. If the bog troll takes Acid or Fire damage, this trait doesn't function on the bog troll's next turn. The bog troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The bog troll makes two Claw attacks. It can replace one attack with a use of Sinkhole Grasp.

Claw. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 11 (2d10) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Sinkhole Grasp. One creature within 10 feet that has the Grappled condition from the bog troll must make a DC 15 Strength saving throw. Failure: The target takes 18 (4d8) Acid damage and is pulled 5 feet into the mire, where it is Prone and Restrained: it can't stand up, its Speed is 0, and attack rolls against it have Advantage, while its own attack rolls have Disadvantage. At the start of each of its turns while mired, the target takes 10 (3d6) Acid damage, and it can end all these effects on itself by using its action to make a DC 15 Strength check. Success: The bog troll can move up to its Speed without provoking Opportunity Attacks.

Bonus Actions

Whelm. The bog troll whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the bog troll, and takes 10 (3d6) Bludgeoning damage at the start of each of the bog troll's turns. The bog troll can have only one creature whelmed at a time. If the bog troll takes 25 damage or more on a single turn from the whelmed creature, the bog troll must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the bog troll. If the bog troll dies, a whelmed creature pulls free Prone by using 10 feet of movement.

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
[concept] synthesis: archetype=controller type=Monstrosity themes=grasping/aquatic mind=bestial lore=✓
[concept] lore: A bog troll is a glutton grown fat and slow in drowning marshes, its stomach hungering for the rot of the drowned and its patience endless as the peat.
[concept] resolve: archetype=controller type=Monstrosity themes=grasping/aquatic mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "bog troll"
[concept] mechanics: grapple, engulf
[concept] signature elements: drags victims under the mire [behavior] | holds prey down until drowned [behavior] | bog-soaked hide like living peat [body]
[concept] identity: The bog troll waits submerged, its hide rippling like peat-stained water, and erupts in a surge of mud and reeking bile that latches onto a victim's legs. Each round it hauls its catch deeper, pinning them under the mire with its bulk while its free claws rake at rescuers. It fights in patient silence, but when bloodied it abandons the grapple to drag its own weight back into the black water, refusing to die on dry land.
[concept] lore: A bog troll is a glutton grown fat and slow in drowning marshes, its stomach hungering for the rot of the drowned and its patience endless as the peat.
[concept] style re-route: grappler is brute's seat — controller re-routes
[reskin] donor: brute-8-grappler -> CR 8
[reskin] seats: action <- "drags victims under the mire" | trait <- "bog-soaked hide like living peat"
[reskin] engulf engine: Whelm — the body's own verb
[reskin] trait wildcard: "Bog-Soaked Hide"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — "Mired" is not a rules condition — use a standard condition, or describe the state in lowercase prose ("the target is pacified: it can't...") — never mint capitalized condition vocabulary: One creature within 10 feet that has the Grappled condition from the bog troll must make a DC 15 Strength saving throw. 
[reskin] wildcard repaired: One creature within 10 feet that has the Grappled condition from the bog troll must make a DC 15 Str
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] multiattack replacement clause: It can replace one attack with a use of Sinkhole Grasp.
[reskin] lint actuator: capitalized "speed" -> "Speed" in "Bog-Soaked Hide"
[reskin] lint: speed-discord: a trait sets Speed 0 permanently while the header says "40 ft., Burrow 30 ft., Swim 40 ft." — print puts immobility in the header (Speed 0 ft. or 5 ft.) and deletes the trait clause
audit finding below confidence gate: Claw This short entry introduces a nested condition chain (Grappled then Restrained) that requires the GM to track two conditions with different escape methods, slowing resolution in combat.
[reskin] audit: [Sinkhole Grasp: The mired effect uses an action-co…sing its action to make a DC 15 Strength check."), Sinkhole Grasp: The entry lacks a clear range for …, while its own attack rolls have Disadvantage."), Whelm: The entry names 'Prone' as a condition the …occupied space within 10 feet of the bog troll."), Bog-Soaked Hide: The trait uses meta-language refe…full Speed through nonmagical Difficult Terrain")]
[reskin] done: "Bog Troll" — donor brute-8-grappler, CR 8
```
