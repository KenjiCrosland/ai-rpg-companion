# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-29T13-23-55`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## volley-sergeant

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Volley Sergeant

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

Braced Interposition. While the sergeant isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Warhammer or Heavy Crossbow in any combination.

Warhammer. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Heavy Crossbow. Ranged Attack Roll: +5, range 100/400 ft. 16 (4d6 + 2) Piercing damage.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("orders a volley")
value check: "Volley Order (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Order (2/Day)" ("exact concept match [verb: volley:concept, orders a volley:concept]")
signature template (trait): guarded-stance -> Traits/"Braced Interposition" ("he plants the shield and braces to shelter an ally beside him, taking the force  [verb: parry:idea]")
```


---

## iron-shadow-marksman

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Iron Shadow Marksman

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

Disengage Training. The marksman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The marksman makes two attacks, using Shortsword or Longbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The marksman takes the Dash or Disengage action.

Reactions

Point-Blank Riposte. Trigger: A creature the marksman can see ends its move within 30 feet of it. Response: The marksman makes one Longbow attack against that creature.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("snaps off a shot")
value check: "Point-Blank Riposte" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Point-Blank Riposte" ("the central verb is 'snaps off' a point-blank reaction shot when a creature clos [verb: snaps off:concept, closes to melee:concept]")
signature miss: trait — "The marksman carries a military-issue heavy crossbow that is always loaded and ready, allowing him to fire it even in melee without penalty. This weapon is part of his being, trusted to deliver one last punishing shot." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## barrow-ossuary

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow Ossuary

Large Undead, Neutral

AC 14
Initiative -1 (9)

HP 136 (16d10 + 48)

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

Necrotic Absorption. Whenever the barrow ossuary is subjected to Necrotic damage, it takes no damage and instead regains a number of Hit Points equal to the Necrotic damage dealt.

Immutable Form. The barrow ossuary can't shape-shift.

Magic Resistance. The barrow ossuary has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The barrow ossuary makes two Fist attacks.

Fist. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage plus 10 (3d6) Necrotic damage.

Grave-Earth Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow ossuary. Failure: 39 (6d12) Necrotic damage. Success: Half damage.

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
value check: "Grave-Earth Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave-Earth Eruption (Recharge 5-6)" ("the ossuary slams both fists into the ground and an eruption erupts around it as [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept, eruption:idea]")
signature miss: trait — "Its body is a walking mass of packed barrow-soil and bone, so every blow it lands leaves grit, splinters, and grave-dirt driven into the wound, clinging to flesh and armor alike. Anyone it strikes carries that buried weight with them, making every onward step a slog until they stop and claw the grave-earth free." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst, earth-glide)
```


---

## temple-gong

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Temple Gong

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Thunder Absorption. Whenever the gong is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The gong can't shape-shift.

Siege Monster. The gong deals double damage to objects and structures.

Actions

Multiattack. The gong makes two Slam attacks. It can replace one attack with a use of Reverberant Rebuke.

Slam. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage.

Resonant Toll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 54 (12d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Reverberant Rebuke. Strength Saving Throw: DC 15, one creature within 30 feet that is Deafened. Failure: 18 (4d8) Thunder damage. Success: Half damage.

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
value check: "Seismic Toll" EV 3.2 vs floor 12 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
value check: "Opportunist's Lash" EV 14 vs floor 12 (one attack of 2) — worth the trade
library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
signature miss: trait — "Every heavy footfall charges the gong's bronze body with deeper resonance; after it has stomped across the field a few times the stored hum makes its next outright slam hit like a falling bell, then the charge empties and the cycle begins again. Anyone who tries to hide the charge by tangling its legs just gives it more to stomp on." [trait/always/damage] — the model found no template that holds it (offered: resonant-body)
```


---

## ash-tongue-warchief

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Ash-Tongue Warchief

Small Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 58 (13d6 + 13)

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
16
+3
+5
WIS
14
+2
+2
MOD
SAVE
CON
13
+1
+1
CHA
11
+0
+0

Skills Perception +4, Stealth +5

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Palisade Stride. The warchief ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The warchief makes two attacks, using Palisade Spike or Shortbow in any combination.

Palisade Spike. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The warchief takes the Dash or Disengage action.

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
[route] skirmisher-archer type=Humanoid mechanics=none — defender-leader: ✓ ("screams fire at will to her archers from") | defender-leader -> skirmisher-archer: the concept's VERB outranks the noun (archers)
signature miss: action — "The warchief screams "Fire at will!" and every nearby goblin archer looses an arrow at a target she marks, all aiming at the same spot and forcing the target to keep its head down. The volley pins the target in place, making it unable to move without drawing more arrows, until the warchief's next shout redirects the fire. This can only be called out once per round, and only works while at least on" [action/once_per_fight/condition] — the model found no template that holds it (offered: sensory-strike)
value check: "Disarming Twist" EV 0 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
signature miss: trait — "Ash from the burned war-camp clings to the warchief's throat, and the rasp of her voice carries through smoke and din, making her shouted orders impossible to mistake or ignore by her archers. The ash also deadens the sound of her own movement, so she slips away from enemies who think they've cornered her." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst)
```
