# Signature-slot review — single run, no comparison

Run: `trait-shelf-2026-09-27T18-28-43`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## bog-troll

**Concept:** a bog troll one with the mire; the muddy ground never slows it, and it wades where nothing can follow

```
Bog Troll

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 136 (16d10 + 48)

Speed 40 ft., Swim 40 ft.

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
6
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 7 (XP 2,900; PB +3)

Traits

Sure Footing. Difficult Terrain composed of mud doesn't cost the bog troll extra movement, and the bog troll can move across mud without needing to make an ability check.

Regeneration. The bog troll regains 15 Hit Points at the start of each of its turns. If the bog troll takes Acid or Fire damage, this trait doesn't function on the bog troll's next turn. The bog troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Slam. Melee Attack Roll: +7, reach 10 ft. 26 (5d8 + 4) Bludgeoning damage.

Hurled Debris. Ranged Attack Roll: +7, range 60/240 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Bog Charge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the bog troll moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

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
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("a bog troll")
signature miss: action — "The bog troll wades into any muddy or swampy ground and simply does not slow down — where other creatures would be stuck, it strides as if on dry land. When it leaves a patch of mire, the mud closes in behind it, clinging to anyone who tries to follow and dragging them to a halt. It can keep this up as long as it stays in its own kind of wet, heavy ground." [bonus_action/always/movement] — the model found no template that holds it (offered: rampage, shell-withdraw, aggro-curse, own-turn-punisher, rally, focus, coating, hook-rider, hook-drag)
value check: "Rampage (1/Day)" EV 21.1 vs floor 4.1 (a bonus action (free)) — worth the trade
library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: mire:concept, bog:concept, muddy:concept, never slows:concept, wades:concept, nothing can follow:concept, mud:idea]")
```


---

## ceiling-sentinel

**Concept:** a gargoyle-thing that scuttles along the cathedral ceiling and drops from the gutters onto stragglers

```
Ceiling Sentinel

Medium Monstrosity, Neutral

AC 20
Initiative -1 (9)

HP 82 (11d8 + 33)

Speed 10 ft., Climb 20 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
16
+3
+6
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

Senses darkvision 120 ft.; Passive Perception 16

Languages understands Celestial and Common but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Spider Climb. The ceiling sentinel can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The ceiling sentinel makes two Claw attacks and uses Reel.

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the ceiling sentinel), reach 5 ft. 17 (4d6 + 3) Slashing damage.

Stony Grasp. Melee Attack Roll: +6, reach 50 ft. The target has the Grappled condition (escape DC 14).

Reel. The ceiling sentinel pulls each creature Grappled by it up to 25 feet straight toward it.

Falling Silence (Recharge 5-6). The ceiling sentinel spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 13, each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

Bonus Actions

False Form. The ceiling sentinel shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Monstrosity mechanics=none — lurker-trap: ✓ ("drops from the gutters onto stragglers")
value check: "Falling Silence (Recharge 5-6)" EV 47.7 vs floor 9.4 (one attack of 2) — over the ceiling — gated Recharge 5-6
signature template: leap -> Actions/"Falling Silence (Recharge 5-6)" ("The sentinel releases its grip and drops straight down onto a passerby, using it [verb: drop:concept, stragglers:concept]")
signature template (trait): spider-climb -> Traits/"Spider Climb" ("exact concept match [verb: ceiling:concept, scuttle:concept, scuttles:concept, gutter:concept, gutters:concept]")
```


---

## hanged-jurist

**Concept:** a hanged judge whose noose still tightens around the guilty from a hundred feet away; it always knows exactly where its quarry stands

```
Hanged Jurist

Medium Undead, Lawful Neutral

AC 17
Initiative +2 (12)

HP 170 (20d8 + 80)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+7
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+10

Skills Perception +7, Deception +10

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Grave-Rope Leash. The hanged jurist knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Multiattack. The hanged jurist makes three attacks, using Noose or Lash in any combination. It can replace one attack with a use of (A) Verdict's Weight or (B) Spellcasting to cast Bestow Curse.

Noose. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage plus 13 (3d8) Necrotic damage.

Lash. Ranged Attack Roll: +10, range 60 ft. 27 (5d8 + 5) Necrotic damage.

Verdict's Weight. Constitution Saving Throw: DC 17, one creature within 60 feet. Failure: 27 (6d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn.

Spellcasting. The hanged jurist casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Misty Step, Bestow Curse, Hold Person

Judgment's Toll. Wisdom Saving Throw: DC 17, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the hanged jurist's next turn. If the target was already Frightened by this ability, it also takes 31 (9d6) Necrotic damage. Success: Half damage only.

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
[route] caster-binder (controller) type=Undead mechanics=snare — caster-binder: ✓ ("whose noose still tightens around the gu")
value check: "Beckoning Pull" EV 4.1 vs floor 15.6 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
value check: "Creeping Dread" EV 28.2 vs floor 15.6 (one attack of 3) — added Success: Half; dice 14 → 31
library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
signature template (trait): faultless-tracker -> Traits/"Grave-Rope Leash" ("always known and never truly out of reach — the creature knows the direction and [verb: quarry:concept, always knows:concept, knows exactly where:concept, from a hundred feet:concept]")
```


---

## drowned-keeper

**Concept:** a drowned lighthouse keeper, bloated and waterlogged, who leaves a spreading slick of brine wherever she moves

```
Drowned Keeper

Medium Undead, Neutral

AC 14
Initiative -1 (9)

HP 112 (15d8 + 45)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Resistances Cold

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 6 (XP 2,300; PB +3)

Traits

Brine Wake. The ground in a 10-foot Emanation originating from the drowned keeper is Difficult Terrain.

Actions

Multiattack. The drowned keeper makes two Brine Slam attacks. It can replace one attack with a use of Brine Lash.

Brine Slam. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Brine Lash. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target is pulled up to 25 feet straight toward the drowned keeper by lashing brine and has the Grappled condition (escape DC 14).

Bonus Actions

Whelm. The drowned keeper whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the drowned keeper, and takes 7 (2d6) Cold damage at the start of each of the drowned keeper's turns. The drowned keeper can have only one creature whelmed at a time. If the drowned keeper takes 15 damage or more in a single turn from the whelmed creature, the drowned keeper must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the drowned keeper. If the drowned keeper dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Undead mechanics=grapple, engulf — brute-grappler: ✓ ("a drowned lighthouse keeper, bloated and")
value check: "Brine Lash" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
signature template: hook-drag -> Actions/"Brine Lash" ("The keeper's surge latches onto creatures caught in the water she's left behind  [verb: drag:idea, pull:idea]")
signature template (trait): aberrant-ground -> Traits/"Brine Wake" ("the drowned keeper's brine film spreads wherever she moves and turns the ground  [verb: slick:concept, brine:concept, wherever she moves:concept, footing:idea]")
```


---

## ridge-scree-exile

**Concept:** a ridge exile of living scree whose hide crumbles into a wake of rubble that pursuers slow in

```
Ridge Scree Exile

Large Elemental, Neutral

AC 17
Initiative +4 (14)

HP 153 (18d10 + 54)

Speed 50 ft., Burrow 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
10
+0
+0
MOD
SAVE
DEX
18
+4
+8
WIS
14
+2
+6
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

Skills Perception +6, Stealth +12

Immunities Poison; Exhaustion, Poisoned

Senses tremorsense 60 ft.; Passive Perception 16

Languages Terran

CR 9 (XP 5,000; PB +4)

Traits

Assassinate. During the first round of each combat, the exile has Advantage on attack rolls against any creature that hasn't taken a turn. If the exile hits a creature during that round, the target takes an extra 11 (2d10) Bludgeoning damage.

Crumbling Wake. The ground in a 10-foot Emanation originating from the exile is Difficult Terrain.

Skittering Wake. The exile ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The exile makes three attacks, using Shard Slam or Jagged Fan in any combination.

Shard Slam. Melee Attack Roll: +8, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Jagged Fan. Ranged Attack Roll: +8, range 30/90 ft. 17 (3d8 + 4) Piercing damage.

Shrieking Scree (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 63 (14d8) Piercing damage. Success: Half damage.

Bonus Actions

Nimble Escape. The exile takes the Disengage or Hide action.

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
[route] skirmisher-skulker type=Elemental mechanics=none — brute-juggernaut: ✓ ("living scree") | brute-juggernaut -> skirmisher-skulker: the concept's VERB outranks the noun (hide)
value check: "Shrieking Scree (Recharge 5-6)" EV 97.7 vs floor 53.2 (the whole Multiattack (3 attacks)) — dice 21 → 63 (nova budget)
signature template: thrown-burst-seed -> Actions/"Shrieking Scree (Recharge 5-6)" ("The exile hurls a fan of jagged shards that shatter on the ground, affecting a w [verb: hurl:idea, shatter:idea]")
signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## three-grave-hound

**Concept:** a bloodhound stitched from three dead dogs that never loses a scent once it has tasted blood

```
Three-Grave Hound

Large Undead, Neutral

AC 13
Initiative -1 (9)

HP 82 (11d10 + 22)

Speed 40 ft.

MOD
SAVE
STR
18
+4
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
15
+2
+2
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Faultless Tracker. The three-grave hound knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Actions

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (3d8 + 4) Piercing damage plus 11 (2d10) Necrotic damage. If the target is a Large or smaller creature and the three-grave hound moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and has the Prone condition.

Bonus Actions

Trample. Dexterity Saving Throw: DC 13, one creature within 5 feet that has the Prone condition. Failure: 9 (2d8) Bludgeoning damage. Success: Half damage.

Bloodmark Howl. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the three-grave hound's next turn, the target has Disadvantage on attack rolls against creatures other than the three-grave hound.

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
[route] brute-charger type=Undead mechanics=snare — brute-charger: ✓ ("never loses a scent once it has tasted b")
value check: "Bloodmark Howl" EV 8.1 vs floor 4.4 (a bonus action (free)) — worth the trade
signature template: aggro-curse -> Bonus Actions/"Bloodmark Howl" ("The hound marks a wounded creature it can see, and the mark changes what the hou [verb: mark:idea]")
signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: scent:concept, bloodhound:concept, hound:idea]")
```


---

## rimehorn

**Concept:** a mountain goat with antlers of living ice that butts climbers off the ledge and freezes the handholds behind them

```
Rimehorn

Large Monstrosity, Unaligned

AC 15
Initiative +0 (10)

HP 153 (18d10 + 54)

Speed 40 ft., Climb 40 ft.

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

Skills Athletics +8, Perception +4

Vulnerabilities Fire

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 8 (XP 3,900; PB +3)

Actions

Gore. Melee Attack Roll: +8, reach 5 ft. 19 (4d6 + 5) Piercing damage plus 13 (3d8) Cold damage. If the target is a Large or smaller creature and the rimehorn moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Frost Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 49 (14d6) Cold damage, and the target has the Frightened condition. Success: Half damage only.

Horrid Display. Wisdom Saving Throw: DC 15, each creature of the rimehorn's choice within 30 feet that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Trample. Dexterity Saving Throw: DC 15, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

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
[route] brute-charger type=Monstrosity mechanics=none — brute-charger: ✓ ("butts climbers off the ledge")
signature miss: action — "The rimehorn rakes its ice antlers through the ground before it, freezing the stone into a slick, dark glaze over a wide stretch. Anyone moving across that glaze slides helplessly toward the nearest drop, carried by their own momentum until they can dig in or fall." [action/once_per_fight/movement] — no template on the shelf shares a verb with the concept or the idea (offered: condition-payoff, throw-retrieve, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, rally, focus, coating, affliction, hook-rider)
value check: "Horrid Display (2/Day)" EV 36.3 vs floor 27.9 (the whole Multiattack (1 attacks)) — worth the trade
library seed drawn: terror-pulse -> Actions/"Horrid Display (2/Day)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The rimehorn's antlers are living ice that spreads its chill through any wound they leave. A creature gored by those antlers keeps freezing from the inside, its blood and breath frosting over, until it breaks contact with the herd's high air." [trait/always/damage] — the model found no template that holds it (offered: terrain-walk)
```


---

## rafter-widow

**Concept:** a cellar spider the size of a hound that hangs from the rafters and knows every thread of its web

```
Rafter Widow

Medium Beast, Unaligned

AC 12
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 20 ft., Climb 20 ft.

MOD
SAVE
STR
17
+3
+5
INT
5
-3
-3
MOD
SAVE
DEX
12
+1
+1
WIS
13
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

Skills Stealth +5

Senses darkvision 60 ft.; Passive Perception 11

Languages None

CR 3 (XP 700; PB +2)

Traits

Spider Climb. The rafter widow can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Adhesive Hide. The rafter widow adheres to anything that touches it. A Huge or smaller creature adhered to the rafter widow has the Grappled condition (escape DC 13).

Actions

Fangs. Melee Attack Roll: +5 (with Advantage if the target is Grappled by the rafter widow), reach 5 ft. 12 (2d8 + 3) Piercing damage plus 9 (2d8) Poison damage.

Rafter Snare. Dexterity Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the rafter widow's next turn.

Bonus Actions

False Form. The rafter widow shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Beast mechanics=none — lurker-trap: ✓ ("hangs from the rafters")
value check: "Rafter Snare" EV 12.7 vs floor 12 (one attack of 1) — worth the trade
signature template: snare-bolt -> Actions/"Rafter Snare" ("the spider's own verb is web: it snares a creature at range in its silk, restrai [verb: web:concept, silk:idea]")
signature template (trait): spider-climb -> Traits/"Spider Climb" ("exact concept match [verb: rafters:concept, spider:concept]")
```


---

## foundry-overseer

**Concept:** a foundry overseer welded into his own furnace-suit who brands deserters and hunts them down wherever they run

```
Foundry Overseer

Large Construct, Lawful Neutral

AC 15
Initiative -1 (9)

HP 195 (23d10 + 69)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+9
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

Skills Athletics +9, Perception +4

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Ignan

CR 11 (XP 7,200; PB +4)

Traits

Faultless Tracker. The foundry overseer knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Fire Absorption. Whenever the foundry overseer is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.

Immutable Form. The foundry overseer is immune to any spell or effect that would alter its form.

Siege Monster. The foundry overseer deals double damage to objects and structures.

Actions

Multiattack. The foundry overseer makes two Branding Arm attacks.

Branding Arm. Melee Attack Roll: +9, reach 10 ft. 27 (5d8 + 5) Fire damage.

Furnace Gape (Recharge 5-6). Constitution Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: 66 (12d10) Fire damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Deserter's Brand. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: Until the start of the foundry overseer's next turn, the target has Disadvantage on attack rolls against creatures other than the foundry overseer.

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("welded into his own furnace-suit")
value check: "Deserter's Brand" EV 8.4 vs floor 4.6 (a bonus action (free)) — worth the trade
signature template: aggro-curse -> Bonus Actions/"Deserter's Brand" ("The overseer fixes its gaze on one foe it can see and names them a deserter, sea [verb: brand:concept, mark:idea]")
signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept, branded:concept, quarry:idea]")
```


---

## hour-s-warden

**Concept:** a bell-ringer's ghost who tolls the hour and cannot leave the tower

```
Hour's Warden

Medium Undead, Neutral

AC 12
Initiative +3 (13)

HP 33 (6d8 + 6)

Speed 5 ft., Fly 50 ft. (hover)

MOD
SAVE
STR
1
-5
-5
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
10
+0
+0
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

Skills Stealth +5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 2 (XP 450; PB +2)

Traits

Incorporeal Movement. The hour's warden can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the hour's warden has Disadvantage on ability checks and attack rolls.

Actions

Necrotic Touch. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage plus 6 (1d12) Necrotic damage.

Hour's Tolling (Recharge 5-6). Constitution Saving Throw: DC 12, each creature in a 10-foot Emanation originating from the hour's warden. Failure: 14 (4d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[route] lurker-phantom type=Undead mechanics=aura — lurker-phantom: ✓ ("a bell-ringer's ghost")
value check: "Hour's Tolling (Recharge 5-6)" EV 37.1 vs floor 11.8 (the whole Multiattack (1 attacks)) — worth the trade
signature template: active-toll -> Actions/"Hour's Tolling (Recharge 5-6)" ("the ghost tolls its bell/knell, and living hearers feel warmth drain — a Constit [verb: toll:concept, bell:concept, knell:idea]")
```
