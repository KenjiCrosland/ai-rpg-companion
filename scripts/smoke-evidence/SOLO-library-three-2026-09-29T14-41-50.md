# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T14-41-50`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## gatewarden-sarge

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Gatewarden Sarge

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

Languages Dwarvish, Common

CR 5 (XP 1,800; PB +3)

Traits

Shielded Stance. While the sergeant isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Warhammer or Crossbow in any combination.

Warhammer. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 16 (4d6 + 2) Piercing damage.

Bonus Actions

Coordinated Shot (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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
value check: "Snapping Volley (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Snapping Volley (2/Day)" ("The sergeant barks a volley order and every ally who can hear and see him looses [verb: volley:concept, orders a volley:concept]")
signature template (trait): guarded-stance -> Traits/"Dressed Line" ("allies who guard next to him hold their ground and strike back harder when the e [verb: keeps the shield line:concept, shield line:concept, guard:idea]")
```


---

## ashbolt-sniper

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Ashbolt Sniper

Medium Humanoid, Neutral

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

Skirmisher. The sniper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The sniper makes two attacks, using Knife or Crossbow in any combination.

Knife. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Crossbow. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The sniper takes the Dash or Disengage action.

Reactions

Ember Snap Shot. Trigger: A creature the sniper can see moves to within 5 feet of it. Response: The sniper makes one Crossbow attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("snaps off a shot at anyone who closes to")
value check: "Ember Snap Shot" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Ember Snap Shot" ("the idea is a reaction to a foe closing to melee, and the sniper answers instant [verb: snaps off:concept, closes to melee:concept]")
signature miss: trait — "Iron-legion drill lives in the hands, not the heart: the sniper's crossbow never jams or slips and its reload is pure muscle memory, so the weapon always arrives ready and the shot never fails for lack of care. Even a deserter keeps the legion's discipline in the bolt." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst, resonant-body)
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

Grave-Soil Body. The barrow-wight can burrow through nonmagical, unworked earth and stone. While doing so, the barrow-wight doesn't disturb the material it moves through.

Sunlight Sensitivity. While in sunlight, the barrow-wight has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow-wight makes two Necrotic Sword attacks.

Necrotic Sword. Melee Attack Roll: +7 (with Advantage if the target is Grappled by the barrow-wight), reach 5 ft. 13 (2d8 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15) plus 4 (1d8) Necrotic damage.

Grave Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow-wight. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

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
[route] lurker-trap type=Undead mechanics=none — lurker-trap: ✓ ("erupts in a shockwave of grave earth aro")
value check: "Grave Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave Eruption (Recharge 5-6)" ("the grave earth 'detonates outward in every direction' as the wight erupts, batt [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept, detonate:idea]")
signature template (trait): earth-glide -> Traits/"Grave-Soil Body" ("Its body is grave-soil and corpse-flesh knitted together — the earth/soil materi [verb: earth:concept]")
```


---

## klang-warden

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Klang Warden

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

Answering Peal. A creature that hits the klang warden with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the klang warden is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The klang warden can't shape-shift.

Siege Monster. The klang warden deals double damage to objects and structures.

Actions

Multiattack. The klang warden makes two Stomp attacks. It can replace one attack with a use of Opportunist's Lash.

Stomp. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Resonant Toll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the klang warden. Failure: 49 (14d6) Thunder damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Opportunist's Lash. Strength Saving Throw: DC 15, one creature within 30 feet that is Prone. Failure: 18 (4d8) Thunder damage. Success: Half damage.

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
signature miss: action — "The klang warden drives one iron foot down with the toll of a funeral gong, and the tremor runs outward through stone, wood, and flesh alike. Every creature on the ground within thirty feet is staggered by the ringing shock, unable to move from where it stands until it shakes off the resonance. The warden remains fixed in place, letting the echo do its work." [action/save/condition] — the model found no template that holds it (offered: condition-payoff, throw-retrieve, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter)
value check: "Opportunist's Lash" EV 14 vs floor 12 (one attack of 2) — worth the trade
library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
signature template (trait): resonant-body -> Traits/"Answering Peal" ("the hum of the last note answers a metal strike, a painful peal punishing the ha [verb: gong:concept, bronze:idea, peal:idea]")
```


---

## bramblewrack-ironmother

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Bramblewrack Ironmother

Small Humanoid, Chaotic Neutral

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

Aura of Authority. While in a 10-foot Emanation originating from the bramblewrack ironmother, the bramblewrack ironmother and its allies have Advantage on attack rolls and saving throws, provided the bramblewrack ironmother doesn't have the Incapacitated condition.

Actions

Multiattack. The bramblewrack ironmother makes two attacks, using Cleaver or Crossbow in any combination.

Cleaver. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Crossbow. Ranged Attack Roll: +4, range 80/320 ft. 11 (2d8 + 2) Piercing damage.

Bonus Actions

Coordinated Volley (2/Day). Each ally within 30 feet of the bramblewrack ironmother that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("screams fire at will to her archers")
value check: "Burning Volley (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Burning Volley (2/Day)" ("goblin archers loose burning arrows at a target she chooses, reacting to her scr [verb: looses at will:concept, archers:concept, loose:idea]")
signature miss: trait — "Whenever a goblin ally within her aura is reduced to zero hit points, the Ironmother bellows a command that keeps the goblin on its feet until the end of its next turn, still able to attack and act; if it is not healed by then, it finally collapses." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-burst)
```
