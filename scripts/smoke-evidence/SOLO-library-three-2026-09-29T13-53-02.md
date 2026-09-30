# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T13-53-02`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## shieldwall-sergeant

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Shieldwall Sergeant

Medium Humanoid, Lawful Neutral

AC 14
Initiative -1 (9)

HP 97 (13d8 + 39)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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

Skills Athletics +6, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Dwarvish

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The sergeant makes two Shield Bash attacks.

Shield Bash. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Ranked Volley (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

Bonus Actions

Cage. The sergeant cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the sergeant, and takes 7 (2d6) Bludgeoning damage at the start of each of the sergeant's turns. The sergeant can have only one creature caged at a time. If the sergeant takes 15 damage or more in a single turn from the caged creature, the sergeant must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the sergeant. If the sergeant dies, a caged creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Humanoid mechanics=grapple, engulf — defender-leader: ✓ ("orders a volley") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override | defender-leader -> brute-grappler: the concept's VERB outranks the noun (key "holds", class verb)
value check: "Ranked Volley (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
signature template: thrown-burst-seed -> Actions/"Ranked Volley (Recharge 5-6)" ("The idea's verb is 'volley' — a call for a rapid missile discharge — which is th [verb: volley:concept]")
signature miss: trait — "The sergeant's tower shield is a planted wall: while it has not moved since its last turn and is not caging a creature, it and allies close beside it present a locked line that shrugs off the first rush. Enemies that try to break that line find their momentum spent and their footing lost against the braced rim." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
```


---

## iron-legion-sharpshot

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Iron Legion Sharpshot

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

Marked Quarry. The sharpshot knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Unhindered Stride. The sharpshot ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The sharpshot makes two attacks, using Dagger or Crossbow in any combination.

Dagger. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Crossbow. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The sharpshot takes the Dash or Disengage action.

Reactions

Close-Quarters Bolt. Trigger: A creature the sharpshot can see moves to within 5 feet of it. Response: The sharpshot makes one Crossbow attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a hobgoblin sniper")
value check: "Close-Quarters Bolt" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Close-Quarters Bolt" ("When a foe moves to within 5 feet, the sharpshot makes one crossbow attack again [verb: snaps off:concept, closes to melee:concept]")
signature template (trait): faultless-tracker -> Traits/"Iron Bead" ("Once it has picked a mark, it can keep that aim steady on a chosen target — know [verb: marked:idea]")
```


---

## barrow-wight

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow-Wight

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 135 (18d8 + 54)

Speed 30 ft., Burrow 30 ft.

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Necrotic Absorption. Whenever the barrow-wight is subjected to Necrotic damage, it takes no damage and instead regains a number of Hit Points equal to the Necrotic damage dealt.

Magic Resistance. The barrow-wight has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The barrow-wight makes two Slam attacks.

Slam. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage plus 10 (3d6) Necrotic damage.

Grave Eruption (Recharge 5-6). Strength Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

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
signature template: ground-burst -> Actions/"Grave Eruption (Recharge 5-6)" ("The idea is a violent eruption from the ground catching everything around it in  [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept, eruption:idea]")
signature miss: trait — "Its body is packed grave-earth and bone, and anyone who strikes it in melee gets a faceful of the same choking dust it unleashes when it rises, leaving them blinded and gasping." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst, earth-glide)
```


---

## resonant-gong-stomper

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Resonant Gong Stomper

Huge Construct, Unaligned

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Ringing Retort. A creature that hits the stomper with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the stomper is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The stomper can't shape-shift.

Siege Monster. The stomper deals double damage to objects and structures.

Actions

Multiattack. The stomper makes two Ram attacks. It can replace one attack with a use of Deafening Backbeat.

Ram. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Tremor (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the stomper. Failure: 54 (12d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Deafening Backbeat. Strength Saving Throw: DC 15, one creature within 30 feet that is Deafened. Failure: 18 (4d8) Thunder damage. Success: Half damage.

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
[route] brute-juggernaut type=Construct mechanics=aura — brute-juggernaut: ✓ ("a temple gong given legs")
signature miss: action — "The stomper slams a foot down and leaves a ringing iron gong-note humming in the ground at that spot. The note persists and pulses thunder through any creature standing on or very near the mark, punishing foes who cluster or linger where the temple's iron has been struck." [action/always/damage] — the model found no template that holds it (offered: condition-payoff, throw-retrieve, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, aggro-curse, own-turn-punisher, affliction)
value check: "Opportunist's Lash" EV 14 vs floor 12 (one attack of 2) — worth the trade
library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
signature template (trait): resonant-body -> Traits/"Ringing Retort" ("when it is struck by a melee attack, the blow rings it and sends a subsonic shud [verb: gong:concept, ring:idea]")
```


---

## skarnna-the-palisade

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Skarnna the Palisade

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

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Bloodied Burst. The first time Skarnna is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 12, each creature in a 15-foot Emanation originating from Skarnna. Failure: 6 (1d12) Fire damage, and the target has the Prone condition until the end of its next turn.

Aura of Authority. While in a 10-foot Emanation originating from Skarnna, Skarnna and its allies have Advantage on attack rolls and saving throws, provided Skarnna doesn't have the Incapacitated condition.

Actions

Multiattack. Skarnna makes two attacks, using Falchion or Falling Arrow in any combination.

Falchion. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Falling Arrow. Melee or Ranged Attack Roll: +5, reach 5 ft. or range 30/120 ft. 12 (2d8 + 3) Piercing damage.

Bonus Actions

Volley Order (2/Day). Each ally within 30 feet of Skarnna that can see or hear it can take a Reaction to make one ranged attack roll.

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
value check: "Volley Order (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Order (2/Day)" ("The idea is a shouted order ('Fire at will!') that lets archers who can hear the [verb: fire at will:concept, archers:concept, volley:idea]")
signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("the first thing that lands is the first time the creature is Bloodied; it shrugs [verb: scream:concept]")
```
