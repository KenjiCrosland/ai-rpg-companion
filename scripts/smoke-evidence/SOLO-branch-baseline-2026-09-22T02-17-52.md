# Signature-slot review — single run, no comparison

Run: `branch-baseline-2026-09-22T02-17-52`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## canopy-leopard

**Concept:** a leopard-thing that stalks the canopy and drops on stragglers from above

```
Canopy Leopard

Large Beast, Unaligned

AC 16
Initiative +5 (15)

HP 93 (11d10 + 33)

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

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Canopy Camouflage. While the canopy leopard remains motionless, it is indistinguishable from the leopard's own dappled back.

Actions

Multiattack. The canopy leopard makes three attacks, using Bite or Claw in any combination.

Bite. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage. If the canopy leopard moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and the canopy leopard can make one Bite attack against it as a Bonus Action.

Claw. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Slashing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the canopy leopard takes the Hide action.

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
signature rider: pounce -> Bite (appended; drops on (concept), from above (concept), ambush from (concept), stragglers (con [verb: drops on:concept, from above:concept, ambush from:concept, stragglers:concept])
signature template (trait): false-appearance -> Traits/"Canopy Camouflage" ("the creature remains motionless and is indistinguishable from its surroundings;  [verb: blend:concept, mimic:idea, still:idea, hidden:idea]")
```


---

## ledgerhorn

**Concept:** a brass bull construct that charges through market stalls

```
Ledgerhorn

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

Languages understands the languages of its creators but can't speak

CR 5 (XP 1,800; PB +3)

Actions

Horn. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the ledgerhorn moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Furnace Blast (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: 31 (9d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

Chain Drag. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the ledgerhorn by its grip and has the Grappled condition (escape DC 13).

Bonus Actions

Trample. Dexterity Saving Throw: DC 13, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

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
signature miss: action — "The ledgerhorn rakes its brass horn laterally through everything in a wide half‑circle in front of it, pivoting on locked iron hooves. The horn sweeps through every creature and loose object caught in that arc; creatures that are already sprawled on the ground find the brazen tip tears through them with extra weight and heat, as though the bull saved its deepest gouge for those it has already knoc" [action/always/damage] — "push-prone" could not be filled (fills: {"dc":"14"})
value check: "Hooked Lash" EV 13.2 vs floor 12.5 (one attack of 1) — worth the trade
library seed drawn: hook-drag -> Actions/"Hooked Lash" (no template held the idea; a proven shape stands in)
signature miss: trait — "Where the ledgerhorn walks, the ground itself remembers the old trade route: loose stalls, barricades, and debris are shoved aside or ground to splinters in its wake. At the start of each of its turns, the path directly behind it becomes a clear, flattened lane—an open run the bull can use to line up its next straight‑line charge." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, death-burst)
```


---

## moor-warden

**Concept:** a recluse who calls lightning down on trespassers from a mile away

```
Moor Warden

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

Languages Common

CR 12 (XP 8,400; PB +4)

Actions

Multiattack. The moor warden makes four Sky Arc attacks. It can replace one attack with a use of Warden's Beckon.

Sky Arc. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 150 ft. 20 (4d6 + 6) Lightning damage.

Spellcasting. The moor warden casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Light, Fly
- 1/Day Each: Lightning Bolt

Warden's Beckon. Wisdom Saving Throw: DC 17, each creature of the moor warden's choice within 60 feet that can see or hear the moor warden. Failure: The target has the Charmed condition until the start of the moor warden's next turn, and while Charmed this way, it must move toward the moor warden by the safest available route on its turn and can't take Reactions.

Reactions

Protective Magic (3/Day). Trigger: The moor warden is hit by an attack roll. Response: The moor warden casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
signature miss: action — "When the moor warden calls down a strike, it can instead choose to focus the sky's fury on a single trespasser within a mile, causing a silent arc of lightning to leap from the clear sky to that target. The warden must be able to see the target, and the target must be outdoors under open sky, or the call fails. This is a deliberate, aimed strike that ignores distance up to a mile, but it leaves no" [action/always/damage] — the model found no template that holds it (offered: thrown-burst, gaze-single, snare, reel, condition-payoff, zone, execute, seal, lure, active-toll, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, summon-lite, wind-up, blighted-ground)
value check: "Luring Presence (Recharge 5-6)" EV 23.1 vs floor 10.9 (one attack of 4) — over the ceiling — gated Recharge 5-6
library seed drawn: lure -> Actions/"Luring Presence (Recharge 5-6)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The moor warden's body is grafted with iron filaments and ionized leyline circuitry, allowing it to sense any creature that touches the ground within a mile as a faint electrical signature. This awareness is constant and passive, but it only reveals the presence and rough direction of grounded creatures, not their exact location or identity." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, death-burst)
```


---

## pass-glutton

**Concept:** a mountain of troll-flesh that knits shut around the axes left in it

_(no block — the generation did not complete; see the run's trace)_


---

## shrine-guardian

**Concept:** a stone shrine-guardian bound to the high priest it was made to protect

```
Shrine Guardian

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

Languages Understands the languages of its creator but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Temple Stonework. While the shrine guardian remains motionless, it is indistinguishable from an ordinary stone wall.

Ward Bond. The shrine guardian is magically bound to a ward of its choosing, and it can have only one ward at a time. While the shrine guardian is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the shrine guardian.

Regeneration. The shrine guardian regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Actions

Multiattack. The shrine guardian makes two Fist attacks.

Fist. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.

Warding Prayer (2/Day). The shrine guardian targets itself or one creature it can see within 60 feet. The target gains 18 (4d8) Temporary Hit Points, and its AC increases by 2 until the end of the shrine guardian's next turn.

Bonus Actions

Ward Pulse (2/Day). Each ally within 30 feet of the shrine guardian gains 9 (2d8) Temporary Hit Points.

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
signature miss: action — "The shrine guardian slams its fist into the ground, and the stone around it heaves upward in a ring of jagged slabs that cages the priest from attackers. Enemies caught in the rising stone are crushed and pinned in place, forced to spend their strength breaking free while the guardian holds the line. The effect only reaches creatures near the guardian, leaving its own ward untouched." [rider/on_hit/damage] — no template exists for this section on this line
value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
signature template (trait): false-appearance -> Traits/"Temple Stonework" ("The guardian is made of carved temple stone, so while motionless it is indisting [verb: stone:concept]")
```


---

## carillon-of-the-dying

**Concept:** a swarm of funeral bells that ring themselves over the dying

```
Carillon of the Dying

Medium Swarm of Tiny Constructs, Lawful Neutral

AC 15
Initiative +5 (15)

HP 170 (20d8 + 80)

Speed 40 ft., Fly 30 ft. (hover)

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

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 10

Languages understands Common and one ancient funerary tongue but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Funeral Peal. The swarm explodes when it dies. Dexterity Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Necrotic damage. Success: Half damage. The explosion destroys the swarm's body.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Clapper attacks.

Clapper. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage if the swarm is Bloodied.

Funeral Toll (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
value check: "Funeral Toll (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
signature template: active-toll -> Actions/"Funeral Toll (Recharge 5-6)" ("the idea is funeral bells that ring themselves over the dying, an emanation of r [verb: ring:concept, bell:concept, toll:idea]")
signature template (trait): death-burst -> Traits/"Funeral Peal" ("the bells ring themselves over the dying — the concept's own verb is dying, and  [verb: dying:concept, final:idea, last breath:idea]")
```


---

## stormjaw

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

```
Stormjaw

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

Static Retort. A creature that touches the stormjaw or hits it with a melee attack while within 5 feet of it takes 21 (6d6) Thunder damage.

Legendary Resistance (3/Day). If the stormjaw fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The stormjaw makes three Bite attacks. It can replace one attack with a use of Thunderhaul Grip.

Bite. Melee Attack Roll: +11, reach 10 ft. 24 (4d8 + 6) Slashing damage plus 16 (3d10) Thunder damage.

Thunderhead (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The stormjaw casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Command, Dispel Magic
- 1/Day Each: Scrying

Thunderhaul Grip. Strength Saving Throw: DC 18, one Huge or smaller creature within 60 feet. Failure: The target is pulled up to 30 feet straight toward the stormjaw by a rolling wall of thunder and has the Grappled condition (escape DC 18). While Grappled this way, the target has the Restrained condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the stormjaw can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Talon Rake. The stormjaw makes one Bite attack.

Storm Glide. The stormjaw moves up to half its Speed without provoking Opportunity Attacks.

Thunder Roar. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("adult storm dragon")
value check: "Thunderhaul Grip" EV 21.5 vs floor 20.3 (one attack of 3) — worth the trade
signature template: hook-drag -> Actions/"Thunderhaul Grip" ("the concept's verb is drag, and the template carries a dragging pull on a failed [verb: drag:concept]")
signature template (trait): heated-body -> Traits/"Static Retort" ("The idea's central verb is 'hits' — a foe striking the creature in melee trigger [verb: lightning:concept, storm:concept]")
```


---

## gutter-lantern

**Concept:** a gutter assassin that hides between lantern-flickers

```
Gutter Lantern

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 40 ft., Climb 30 ft.

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

Clotted Lamplight. The first time the gutter lantern is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 12, each creature in a 15-foot Emanation originating from the gutter lantern. Failure: 6 (1d12) Bludgeoning damage, and the target has the Deafened condition until the end of its next turn.

Shadowstep. The gutter lantern ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The gutter lantern makes two attacks, using Dagger or Dart in any combination. It can replace one attack with a use of Luring Presence.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Dart. Ranged Attack Roll: +5, range 30/90 ft. 10 (2d6 + 3) Piercing damage.

Luring Presence. Wisdom Saving Throw: DC 12, one creature within 60 feet that can see or hear the Gutter Lantern's lantern beam. Failure: The target has the Charmed condition until the start of the gutter lantern's next turn, and while Charmed this way, it must move toward the gutter lantern by the safest available route on its turn.

Bonus Actions

Cunning Action. The gutter lantern takes the Dash, Disengage, or Hide action.

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
value check: "Luring Presence" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
signature template: lure -> Actions/"Luring Presence" ("the concept's verb 'lantern' is created by the template's own verb 'lure': the g [verb: lantern:concept, light:idea, glow:idea]")
signature template (trait): bloodied-burst -> Traits/"Clotted Lamplight" ("the concept has bloodied as its central verb and it triggers when bloodied in a  [verb: bloodied:concept, wounded:idea]")
```


---

## warden-s-hoard

**Concept:** a vault that grew a hunger — the strongroom itself is the mimic

```
Warden's Hoard

Huge Construct, Unaligned

AC 15
Initiative -1 (9)

HP 199 (21d12 + 63)

Speed 40 ft.

MOD
SAVE
STR
20
+5
+9
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
+7
CHA
6
-2
-2

Skills Athletics +9, Perception +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Common

CR 11 (XP 7,200; PB +4)

Traits

Devouring Vault. The warden's hoard adheres to anything that touches it. A Huge or smaller creature adhered to the warden's hoard is also Grappled by it (escape DC 16). Ability checks made to escape this grapple have Disadvantage.

Actions

Multiattack. The warden's hoard makes two Doorjaw attacks. It can replace one attack with a use of Vitality Leech.

Doorjaw. Melee Attack Roll: +9, reach 10 ft. 23 (4d8 + 5) Piercing damage plus 16 (3d10) Force damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.

Vitality Leech. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 39 (6d12) Force damage, and the warden's hoard regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Cage. The warden's hoard cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the warden's hoard, and takes 10 (3d6) Bludgeoning damage at the start of each of the warden's hoard's turns. The warden's hoard can have only one creature caged at a time. If the warden's hoard takes 25 damage or more on a single turn from the caged creature, the warden's hoard must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the warden's hoard. If the warden's hoard dies, a caged creature pulls free Prone by using 10 feet of movement.

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
[route] brute-grappler type=Construct mechanics=grapple, engulf — brute-grappler: ✓ ("the strongroom itself is the mimic")
signature miss: action — "The warden's hoard heaves its whole bulk in a grinding lurch across the ground, carving a path through anything in its way. Each creature it moves through or ends up close to can be shoved aside or pinned beneath its foundation; the same crushing motion slams shut any door, gate, or opening the creature passes." [action/always/movement] — the model found no template that holds it (offered: leap, condition-payoff, throw-retrieve, hook-drag, active-toll, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter)
value check: "Vitality Leech" EV 30.2 vs floor 20.3 (one attack of 2) — added Success: Half; dice 24 → 39
library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
signature template (trait): adhesive -> Traits/"Devouring Vault" ("the strongroom itself is a tooth-lined door-maw that swallows and crushes anythi [verb: mimic:concept, strongroom:concept, vault:concept]")
```


---

## scarp-troll

**Concept:** a cliff troll that shears slabs off the rockface and hurls them at climbers

```
Scarp Troll

Large Giant, Unaligned

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

Stillstone Camouflage. While the scarp troll remains motionless, it is indistinguishable from an ordinary object.

Cliff Stride. The scarp troll ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Regeneration. The scarp troll regains 15 Hit Points at the start of each of its turns. If the scarp troll takes Acid or Fire damage, this trait doesn't function on the scarp troll's next turn. The scarp troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The scarp troll makes three attacks, using Claw or Slab in any combination. It can replace one attack with a use of Slab Snatch.

Claw. Melee Attack Roll: +6, reach 5 ft. 10 (2d6 + 3) Slashing damage.

Slab. Ranged Attack Roll: +6, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage.

Rockfall (Recharge 5-6). The scarp troll hurls a sheared slab at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 31 (9d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Slab Snatch. Strength Saving Throw: DC 13, one creature within 5 feet that is holding a weapon or another object. Failure: The target drops the held object, which lands in its space.

Bonus Actions

Fleet Agility. The scarp troll takes the Dash or Disengage action.

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
signature miss: action — "The scarp troll rips a chunk of loose rock free and hurls it to bounce and shatter along the ground at a climber's feet, and the burst of grit and shrapnel blinds everyone caught in it for a heartbeat, leaving them clawing at their eyes and easy to knock off the wall. It throws this cheap shot to herd panicked climbers into the open, saving its heavy slab for when they can no longer see it coming." [action/save/condition] — "thrown-burst-seed" could not be filled (fills: {"dc":"13 (Dexterity)","burst":"4d6 bludgeoning","damage_type":"bludgeoning"})
value check: "Disarming Twist" EV 0 vs floor 5.2 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
library seed drawn: disarm -> Actions/"Disarming Twist" (no template held the idea; a proven shape stands in)
signature template (trait): false-appearance -> Traits/"Granite Shear" ("none — the idea is a stone-hurling combat action, not a motionless disguise; onl [verb: stone:concept]")
```
