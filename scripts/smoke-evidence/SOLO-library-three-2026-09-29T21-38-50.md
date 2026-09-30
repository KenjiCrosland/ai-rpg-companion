# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T21-38-50`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## sergeant-durn-halbek

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Sergeant Durn Halbek

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

Volley Command (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("orders a volley") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override | defender-leader: key "orders a" (class verb)
value check: "Volley Command (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Command (2/Day)" ("the sergeant barks a command designating a target, and allies who can see or hea [verb: volley:concept, orders a volley:concept, loose:idea]")
signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: keeps the shield line:concept, shield line:concept, stance:idea]")
```


---

## iron-shot

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Iron Shot

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

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Withdrawal Drill. The iron shot ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The iron shot makes two attacks, using Bayonet or Long Rifle in any combination.

Bayonet. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage.

Long Rifle. Ranged Attack Roll: +6, range 40/120 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The iron shot takes the Dash or Disengage action.

Reactions

Snap Shot. Trigger: A creature the iron shot can see moves to within 5 feet of it. Response: The iron shot makes one Long Rifle attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a hobgoblin sniper who snaps off a shot") | skirmisher-archer: key "sniper" (class noun)
value check: "Snap Shot" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Snap Shot" ("the idea's central verb is 'snap off a shot' at an enemy moving into melee reach [verb: snaps off:concept, closes to melee:concept]")
signature miss: trait — "The iron shot's long rifle is always loaded and ready, even in the middle of a melee. As long as it hasn't lost its weapon, it treats any enemy who … as a threat it can punish, and its aim never falters against a charging foe. Additionally, once per round, if it hasn't used its reaction yet, it can fire a snap shot at an enemy that misses it with a melee attack." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst, resonant-body)
```


---

## barrow-king

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow King

Medium Undead, Neutral

AC 14
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
14
+2
+2
WIS
13
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +7, Perception +3

Immunities Necrotic, Poison; Exhaustion, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Grave-Stride. Difficult Terrain composed of earth, loose stone, and rubble doesn't cost the barrow king extra movement, and the barrow king can move across earth, loose stone, and rubble without needing to make an ability check.

Necrotic Absorption. Whenever the barrow king is subjected to Necrotic damage, it takes no damage and instead regains a number of Hit Points equal to the Necrotic damage dealt.

Magic Resistance. The barrow king has Advantage on saving throws against spells and other magical effects.

Sunlight Sensitivity. While in sunlight, the barrow king has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow king makes two Necrotic Sword attacks. It can replace one attack with a use of Life Drain.

Necrotic Sword. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 4 (1d8) Necrotic damage.

Grave Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow king. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

Life Drain. Constitution Saving Throw: DC 14, one creature within 5 feet. Failure: 24 (7d6) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken.
A Humanoid slain by this attack rises 24 hours later as a Zombie under the barrow king's control, unless the Humanoid is restored to life or its body is destroyed. the barrow king can have no more than twelve zombies under its control at a time. Success: Half damage only.

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
[route] brute-juggernaut type=Undead mechanics=aura — brute-juggernaut: ✓ ("erupts in a shockwave of grave earth aro") | brute-juggernaut: no line key in the words — the model's read of its quote
print canon array: STR 18, DEX 14, CON 16, INT 10, WIS 13, CHA 15 — the Wight's, STR fitted to +7
print canon: "a barrow-wight that erupts in a shockwave of grave earth around it when roused" heads on the Wight — print's rows ride along; the seat stays
value check: "Grave Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave Eruption (Recharge 5-6)" ("The idea centers on the barrow king slamming both fists down and the ground erup [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept, eruption:idea]")
signature template (trait): terrain-walk -> Traits/"Grave-Stride" ("the creature moves through earth, loose stone, collapsed rubble and burial mound [verb: rubble:idea]")
trait stripped: Traits/Immutable Form — a golem's trait on a Undead
print canon attack: "Grave-Fist" -> "Necrotic Sword" — the Wight's own row
print canon trait: Sunlight Sensitivity — "a barrow-wight that erupts in a shockwave of grave earth around it when roused" is the Wight (print's own row)
print canon row priced: Life Drain — dice 6 → 24
print canon row: Actions/Life Drain — the Wight's own
```


---

## bronze-bell-brute

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Bronze Bell-Brute

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

Senses blindsight 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Ringing Rebuke. A creature that hits the bell-brute with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the bell-brute is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The bell-brute can't shape-shift.

Siege Monster. The bell-brute deals double damage to objects and structures.

Actions

Multiattack. The bell-brute makes two Gong Slam attacks.

Gong Slam. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Tremor Stomp (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the bell-brute. Failure: 49 (14d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Discordant Toll. The bell-brute hurls a hurled object. Ranged Attack Roll: +8, range 30/120 ft. 24 (7d6) Thunder damage. The weapon lands in an unoccupied space within 5 feet of the target; until the bell-brute spends 5 feet of movement in that space to recover it, the bell-brute's Speed is halved and it can't use this action.

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
signature miss: action — "When the bell-brute brings its gong-face down on a foe, the whole body rings like a struck bell. Every enemy near the impact is shaken by the reverberation and struggles to keep its footing, leaving them exposed for the next swing." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, charge-push, hook-rider, pounce, throw-retrieve, exploiter, shell-withdraw)
value check: "Hurled Weapon" EV 16.4 vs floor 12 (one attack of 2) — worth the trade
library seed drawn: throw-retrieve -> Actions/"Hurled Weapon" (no template held the idea; a proven shape stands in)
signature template (trait): resonant-body -> Traits/"Ringing Rebuke" ("the ring washes outward and rattles the nerves of those close by, making it hard [verb: gong:concept, ring:idea, bell:idea, bronze:idea, hollow:idea]")
chassis nova: "Tremor Stomp (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
nova geometry: "Tremor Stomp (Recharge 5-6)" — 30-foot Cone → 15-foot Emanation (the concept says in all directions)
```


---

## skarn-emberbrand

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Skarn Emberbrand

Small Humanoid, Neutral Evil

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

Aura of Authority. While in a 10-foot Emanation originating from Skarn, Skarn and its allies have Advantage on attack rolls and saving throws, provided Skarn doesn't have the Incapacitated condition.

Actions

Multiattack. Skarn makes two attacks, using Firebrand or Shortbow in any combination.

Firebrand. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Fire damage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 11 (2d8 + 2) Piercing damage.

Bonus Actions

Ember Volley (2/Day). Each ally within 30 feet of Skarn that can see or hear it can take a Reaction to make one ranged attack roll.

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
energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
value check: "Ember Volley (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Ember Volley (2/Day)" ("She orders her archers to converge fire on the target; they loose their arrows a [verb: looses at will:concept, archers:concept, loose:idea]")
signature miss: trait — "Whenever Skarn's own brand strikes home, the mark it leaves on the target catches. Fire from the tribe's arrows, brands, and torches eats into that victim faster and spreads to anyone standing beside them, so the wounded become a second blaze she can point at." [trait/always/damage] — the model found no template that holds it (offered: bloodied-burst)
```
