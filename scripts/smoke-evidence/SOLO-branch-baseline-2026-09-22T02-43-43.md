# Signature-slot review — single run, no comparison

Run: `branch-baseline-2026-09-22T02-43-43`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## canopy-dropper

**Concept:** a leopard-thing that stalks the canopy and drops on stragglers from above

```
Canopy Dropper

Medium Beast, Unaligned

AC 16
Initiative +5 (15)

HP 90 (12d8 + 36)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
12
+1
+1
INT
13
+1
+4
MOD
SAVE
DEX
20
+5
+8
WIS
14
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
11
+0
+0

Skills Perception +5, Stealth +11

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Ambush Crush. During the first round of each combat, the canopy dropper has Advantage on attack rolls against any creature that hasn't taken a turn. If the canopy dropper hits a creature during that round, the target takes an extra 9 (2d8) Bludgeoning damage.

Actions

Multiattack. The canopy dropper makes three attacks, using Claw or Spine in any combination.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage. If no creature other than the canopy dropper is within 5 feet of the target, the target takes an extra 9 (2d8) Bludgeoning damage.

Spine. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Piercing damage.

Deadfall Pounce (Recharge 5-6). The canopy dropper spends 5 feet of movement to jump to a space within 20 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 15, each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the canopy dropper takes the Hide action.

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
[route] lurker type=Beast mechanics=none — lurker: ✓ ("stalks the canopy and drops on straggler")
signature rider: isolation -> Claw (appended; the idea's own verb is straggler/stragglers — a lone target separated from its g [verb: straggler:concept, stragglers:concept, isolated:idea])
value check: "Crushing Leap (Recharge 5-6)" EV 47.7 vs floor 9.4 (one attack of 3) — over the ceiling — gated Recharge 5-6
library seed drawn: leap -> Actions/"Crushing Leap (Recharge 5-6)" (no template held the idea; a proven shape stands in)
signature template (trait): assassinate -> Traits/"Ambush Crush" ("The idea says the attack is more devastating when it strikes from the shadows, a [verb: stalk:concept]")
```


---

## market-bull

**Concept:** a brass bull construct that charges through market stalls

```
Market Bull

Large Construct, Unaligned

AC 14
Initiative +0 (10)

HP 102 (12d10 + 36)

Speed 40 ft.

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
10
+0
+0
WIS
12
+1
+1
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

Skills Athletics +6, Perception +4

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Common but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Searing Brass. A creature that touches the market bull or hits it with a melee attack while within 5 feet of it takes 13 (3d8) Fire damage.

Actions

Gore. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the market bull moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Scald (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: 31 (9d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 13, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

Bull's Challenge. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the market bull's next turn, the target has Disadvantage on attack rolls against creatures other than the market bull.

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
[route] brute-charger type=Construct mechanics=none — brute-charger: ✓ ("charges through market stalls")
signature miss: action — "The market bull lowers its head and charges in a straight line, smashing through any stalls, carts, or barricades in its path as if they were kindling. The charge continues through the wreckage, and the bull ends its movement only when it reaches a creature or a solid wall. Any creature caught in the path is knocked aside and left sprawling on the ground." [action/always/movement] — "push-prone" could not be filled (fills: {"dc":"13"})
value check: "Binding Mark" EV 7.2 vs floor 3.9 (a bonus action (free)) — worth the trade
library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
signature template (trait): heated-body -> Traits/"Searing Brass" ("being hit by a melee attack lashes searing heat at the attacker, the template's  [verb: brass:concept, iron:concept, heat:idea, sear:idea]")
```


---

## bottled-squall

**Concept:** a recluse who calls lightning down on trespassers from a mile away

```
Bottled Squall

Medium Humanoid, Neutral

AC 17
Initiative +2 (12)

HP 170 (20d8 + 80)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
22
+6
+10
MOD
SAVE
DEX
14
+2
+2
WIS
15
+2
+6
MOD
SAVE
CON
18
+4
+4
CHA
16
+3
+3

Skills Arcana +10, Perception +6

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 16

Languages Common, Auran

CR 12 (XP 8,400; PB +4)

Actions

Multiattack. The bottled squall makes four Arc attacks. It can replace one attack with a use of Binding Lash.

Arc. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 150 ft. 20 (4d6 + 6) Lightning damage.

Spellcasting. The bottled squall casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Misty Step, Fly
- 1/Day Each: Lightning Bolt

Binding Lash. Dexterity Saving Throw: DC 17, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the bottled squall's next turn.

Reactions

Protective Magic (3/Day). Trigger: The bottled squall is hit by an attack roll. Response: The bottled squall casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=none — caster: ✓ ("calls lightning down on trespassers from")
signature miss: action — "Calling down a forked lightning strike from the sky a mile away. It starts with a single target and forks out to everyone clustered within about ten feet of that target, favoring groups over lone invaders. This can only be called down if the target is under open sky or an equivalent storm-heavy place, and it cannot be used twice in a row without letting the storm recharge." [action/always/damage] — the model found no template that holds it (offered: thrown-burst, gaze-single, snare, reel, condition-payoff, zone, execute, seal, active-toll, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, summon-lite, wind-up, blighted-ground)
value check: "Binding Lash" EV 11.6 vs floor 10.9 (one attack of 4) — worth the trade
library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
signature miss: trait — "Its living iron body acts as a lightning rod and battery. Whenever it is struck by lightning or another electrical source, it stores that energy instead of taking harm, and the next time it makes an attack or calls down its storm, that stored charge is released to make the strike more vicious or to arc to an extra foe." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body)
```


---

## gristle-hill

**Concept:** a mountain of troll-flesh that knits shut around the axes left in it

```
Gristle Hill

Huge Monstrosity, Unaligned

AC 17
Initiative +1 (11)

HP 241 (21d12 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
INT
6
-2
-2
MOD
SAVE
DEX
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
20
+5
+11
CHA
8
-1
-1

Skills Athletics +12, Perception +6

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 17 (XP 18,000; PB +6)

Traits

Legendary Resistance (3/Day). If the gristle hill fails a saving throw, it can choose to succeed instead.

Regeneration. The gristle hill regains 20 Hit Points at the start of each of its turns. If the gristle hill takes Acid or Fire damage, this trait doesn't function on the gristle hill's next turn. The gristle hill dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The gristle hill makes three Slam attacks.

Slam. Melee Attack Roll: +12, reach 10 ft. 42 (8d8 + 6) Bludgeoning damage.

Gristle Engulf (Recharge 5-6). Strength Saving Throw: DC 19, one creature within 60 feet that has the Grappled condition. Failure: 84 (13d12) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the gristle hill can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Lumbering Advance. The gristle hill moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Skin-Crawling Notice. Wisdom Saving Throw: DC 19, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

Ground Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the gristle hill. Failure: The target has the Prone condition.

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
[route] brute-regenerator type=Monstrosity mechanics=regeneration — brute-regenerator: ✓ ("knits shut")
value check: "Gristle Engulf (Recharge 5-6)" EV 71 vs floor 22.4 (one attack of 3) — over the ceiling — gated Recharge 5-6
signature template: condition-payoff -> Actions/"Gristle Engulf (Recharge 5-6)" ("The core verb is 'caught,' the creature has caught prey, and the ability pays of [verb: caught:concept, grind:idea, crush:idea]")
signature miss: trait — "Weapons that strike the gristle hill are caught in its closing flesh. Blades, axes, and spears that hit it become embedded, and the creature's regeneration slowly pushes them deeper, causing the attacker to lose the weapon until the gristle hill is slain." [trait/on_being_hit/resource] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body)
```


---

## vault-warden

**Concept:** a stone shrine-guardian bound to the high priest it was made to protect

```
Vault Warden

Large Construct, Lawful Neutral

AC 17
Initiative -1 (9)

HP 142 (15d10 + 60)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
10
+0
+0
MOD
SAVE
CON
18
+4
+7
CHA
3
-4
-4

Skills Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages understands Common but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Ward Bond. The vault warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the vault warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the vault warden.

Regeneration. The vault warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Actions

Multiattack. The vault warden makes two Slam attacks.

Slam. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.

Interpose (2/Day). The vault warden targets itself or one creature it can see within 60 feet. The target gains 18 (4d8) Temporary Hit Points, and its AC increases by 2 until the end of the vault warden's next turn.

Bonus Actions

Warden's Command (2/Day). Each ally within 30 feet of the vault warden gains 9 (2d8) Temporary Hit Points.

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
[route] defender-warden type=Construct mechanics=none — defender-warden: ✓ ("a stone shrine-guardian bound to the hig")
value check: "Guardian's Intercession" EV 0 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The prayer bound into its chest is a living oath: when the high priest it guards is slain, the warden's granite heart cracks and its restraint shatters. It stops protecting anyone else, ignores all distractions, and can only attack or move directly toward the one who struck the killing blow, growing harder to stop until either it or that killer is destroyed." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive)
```


---

## last-rites

**Concept:** a swarm of funeral bells that ring themselves over the dying

```
Last Rites

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 40 ft.

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages understands Common but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Bloodied Burst. The first time the swarm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Toll attacks.

Toll. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Thunder damage, or 13 (3d8) Bludgeoning damage if the swarm is Bloodied.

Echoing Peal (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[route] swarm type=Construct mechanics=none — swarm: ✓ ("a swarm of funeral bells")
value check: "Echoing Peal (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
signature template: active-toll -> Actions/"Echoing Peal (Recharge 5-6)" ("The idea's own verb is 'rolls into one great chord' with 'peal' and 'toll' both  [verb: toll:concept, ring:concept, bell:concept, peal:idea]")
signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("The idea centers on a deafening peal/ring that triggers when the swarm is struck [verb: ring:concept, peal:concept, bell:concept, dying:concept, the dying:concept]")
```


---

## stormspire-wyrm

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

```
Stormspire Wyrm

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 175 (14d12 + 84)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
18
+4
+4

Skills Perception +7, Stealth +6

Immunities Thunder

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Thunderclap Rebuke. A creature that hits the stormspire wyrm with a melee attack while within 5 feet of it takes 21 (6d6) Thunder damage and has the Deafened condition until the end of its next turn.

Legendary Resistance (3/Day). If the stormspire wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The stormspire wyrm makes three Claw attacks. It can replace one attack with a use of (A) Thunder Draw or (B) Spellcasting to cast Fear.

Claw. Melee Attack Roll: +11, reach 10 ft. 24 (4d8 + 6) Slashing damage plus 16 (3d10) Thunder damage.

Thunderhead Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The stormspire wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Fear, Suggestion
- 1/Day Each: Scrying

Thunder Draw. Strength Saving Throw: DC 18, one Huge or smaller creature within 60 feet. Failure: 21 (6d6) Thunder damage, and the target is pulled up to 25 feet straight toward the stormspire wyrm, and it has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the stormspire wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Thunder Strike. The stormspire wyrm makes one Claw attack.

Storm Surge. The stormspire wyrm moves up to half its Speed without provoking Opportunity Attacks.

Apex Roar. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon")
value check: "Thunder Draw" EV 21.6 vs floor 20.3 (one attack of 3) — added Success: Half
signature template: reel -> Actions/"Thunder Draw" ("The idea has the verb 'pull' as its core, pulling a target toward the wyrm with  [verb: drag:concept, pull:idea]")
signature template (trait): resonant-body -> Traits/"Thunderclap Rebuke" ("The wyrm's thunder answers a melee blow, and the reverb rattles the attacker and [verb: thunder:concept, struck:idea]")
```


---

## gutter-lantern-lurker

**Concept:** a gutter assassin that hides between lantern-flickers

```
Gutter-Lantern Lurker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

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
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Shadow Slip. The gutter-lantern lurker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The gutter-lantern lurker makes two attacks, using Stiletto or Dart in any combination.

Stiletto. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Piercing damage plus 5 (1d10) Poison damage.

Dart. Ranged Attack Roll: +5, range 30/90 ft. 10 (2d6 + 3) Piercing damage.

Lantern-Burst Toxin Cloud (Recharge 5-6). Dexterity Saving Throw: DC 12, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 24 (7d6) Poison damage. Success: Half damage.

Bonus Actions

Cunning Action. The gutter-lantern lurker takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("hides between lantern-flickers")
value check: "Lantern Flicker (Recharge 4-6)" EV 0 vs floor 2 (a bonus action (free)) — a free row that does nothing (logged)
value check: "Hurled Burst (Recharge 5-6)" EV 37.2 vs floor 20.3 (the whole Multiattack (2 attacks)) — dice 13 → 24 (nova budget)
library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The lurker's iron-touched hide drinks in soot and lantern-flicker, so when it stays perfectly still in any dim light or shadow, its silhouette breaks apart among the shifting shadows. Anyone trying to track it by sight or aim an attack at it from range must first guess which patch of dark it truly occupies; if they choose wrongly, the attack or tracking fails until the lurker moves or the light st" [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, assassinate, death-burst)
```


---

## counting-house

**Concept:** a vault that grew a hunger — the strongroom itself is the mimic

```
Counting-House

Large Construct, Neutral

AC 16
Initiative +5 (15)

HP 127 (15d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
13
+1
+5
MOD
SAVE
DEX
20
+5
+9
WIS
14
+2
+2
MOD
SAVE
CON
17
+3
+3
CHA
11
+0
+0

Skills Perception +6, Stealth +13

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 16

Languages Understands Common and Dwarvish but can't speak

CR 11 (XP 7,200; PB +4)

Actions

Multiattack. The counting-house makes three attacks, using Door or Lockplate in any combination. It can replace one attack with a use of Tithe Siphon.

Door. Melee Attack Roll: +9, reach 5 ft. 27 (5d8 + 5) Piercing damage.

Lockplate. Ranged Attack Roll: +9, range 80/320 ft. 23 (4d8 + 5) Slashing damage.

Tithe Siphon. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 26 (4d12) Piercing damage, and the counting-house regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the counting-house takes the Hide action.

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
[route] lurker type=Construct mechanics=none — lurker-trap: quote not found in the input ("it IS the ambush — a disguised, rooted, ") | brute-grappler: quote not found in the input ("a solid BODY that seizes and holds — jaw") | brute-juggernaut: quote not found in the input ("a MADE thing — poured, forged, carved, o") | fell to lurker's plain line
signature miss: action — "The counting-house unfolds its doorway into a yawning iron gullet and lunges across the chamber, engulfing every creature in a wide swath before it. Those caught are dragged into its folding interior, where grinding tumblers and crushing walls leave them stuck fast and bleeding until they tear free or the vault-body shuts completely." [action/always/movement] — the model found no template that holds it (offered: leap, gaze-single, condition-payoff, execute, seal, lure, hook-drag, active-toll, pull-through, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, summon-lite, exploiter, blighted-ground)
value check: "Vitality Leech" EV 20.2 vs floor 13.5 (one attack of 3) — added Success: Half; dice 16 → 26
library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
signature miss: trait — "When the counting-house stays still in dim light or darkness, it passes for ordinary strongroom architecture: intruders who mistake it for a normal vault door or wall cannot perceive it as a threat until it chooses to strike. Only when its ambush begins does the hunger show." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, assassinate, death-burst)
```


---

## cliff-troll

**Concept:** a cliff troll that shears slabs off the rockface and hurls them at climbers

```
Cliff Troll

Large Giant, Chaotic Neutral

AC 16
Initiative +3 (13)

HP 93 (11d10 + 33)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +6

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Stone Splinter. A creature that touches the cliff troll or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Piercing damage.

Sure-Footed. The cliff troll ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The cliff troll makes three attacks, using Slam or Boulder in any combination. It can replace one attack with a use of Embedded Shard.

Slam. Melee Attack Roll: +6, reach 5 ft. 10 (2d6 + 3) Bludgeoning damage.

Boulder. Ranged Attack Roll: +6, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage.

Rockfall (Recharge 5-6). The cliff troll hurls a slab of rock at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 31 (9d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Embedded Shard. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target is branded: it takes 10 (3d6) Piercing damage at the start of each of its turns until it uses its action to tear the brand away Success: Half damage only.

Bonus Actions

Fleet Agility. The cliff troll takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls them at climbers")
signature miss: action — "The cliff troll rips a jagged slab out of the rockface and slams it down onto the spot where a climbing creature is clinging, pinning the creature's hands and feet to the wall with crushing weight. Anyone struck this way is left stuck in place and exposed, unable to climb or dodge until they tear themselves free or someone else breaks the stone away." [rider/on_hit/condition] — no template on the shelf shares a verb with the concept or the idea (offered: affliction, pounce, isolation)
value check: "Lingering Brand" EV 7.8 vs floor 5.2 (one attack of 3) — added Success: Half; dice 6 → 10
library seed drawn: delayed-brand -> Actions/"Lingering Brand" (no template held the idea; a proven shape stands in)
signature template (trait): heated-body -> Traits/"Stone Splinter" ("The idea's verb is 'touches/hits it with a melee attack' and the effect is damag [verb: shard:idea, jagged:idea]")
```
