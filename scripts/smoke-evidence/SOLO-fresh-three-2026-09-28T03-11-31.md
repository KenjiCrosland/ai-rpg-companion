# Signature-slot review — single run, no comparison

Run: `fresh-three-2026-09-28T03-11-31`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## wax-abbot

**Concept:** a candle-wax abbot who melts a little every time he lies, and lies constantly

```
Wax Abbot

Medium Humanoid, Neutral

AC 14
Initiative +1 (11)

HP 112 (15d8 + 45)

Speed 30 ft.

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
12
+1
+1
WIS
8
-1
-1
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

Skills Athletics +7, Perception +2

Vulnerabilities Fire

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Celestial

CR 6 (XP 2,300; PB +3)

Traits

Regeneration. The wax abbot regains 10 Hit Points at the start of each of its turns. If the wax abbot takes Cold damage, this trait doesn't function on the wax abbot's next turn. The wax abbot dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The wax abbot makes three Censer attacks.

Censer. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage.

Bonus Actions

Retaliatory Cinder. One creature within 5 feet that hit the wax abbot with an attack roll since the end of the wax abbot's last turn takes 6 (1d12) Fire damage.

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
[route] brute-regenerator type=Humanoid mechanics=regeneration — brute-regenerator: ✓ ("melts a little every time he lies")
signature miss: action — "The abbot tells a fresh, believable lie to one enemy who can hear and understand it, daring them to call it out. If they fail to see through it, they take psychic damage and the abbot's body loses a layer of wax, but he immediately rips the lie back out as a searing truth: a second wave of fire damage. If they see through the lie, the shame only melts him further, and he cannot use this on that sa" [action/save/damage] — the model found no template that holds it (offered: leap, throw-retrieve, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up)
value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
signature miss: trait — "Whenever the abbot hits a creature with his censer, some of his own molten wax splashes onto the target and hardens. The coating makes the target's movements stiff and painful, slowing them and making it harder for them to attack accurately until they scrape or burn it off." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, death-burst, heated-body)
```


---

## tidepool-anemone

**Concept:** a tide-pool anemone the size of a cart that pretends to be a rock garden

```
Tidepool Anemone

Large Monstrosity, Unaligned

AC 12
Initiative +1 (11)

HP 75 (10d10 + 20)

Speed 20 ft., Swim 20 ft.

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

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 11

Languages None

CR 3 (XP 700; PB +2)

Traits

Burn Loose. The first time the tidepool anemone is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 12, each creature in a 15-foot Emanation originating from the tidepool anemone. Failure: 13 (3d8) Acid damage, and the target has the Poisoned condition until the end of its next turn.

Adhesive Hide. The tidepool anemone adheres to anything that touches it. A Huge or smaller creature adhered to the tidepool anemone has the Grappled condition (escape DC 13).

Actions

Tentacles. Melee Attack Roll: +5 (with Advantage if the target is Grappled by the tidepool anemone), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 9 (2d8) Acid damage.

Opportunist's Lash. Strength Saving Throw: DC 12, one creature within 30 feet that is Grappled by the tidepool anemone. Failure: 18 (4d8) Acid damage. Success: Half damage.

Bonus Actions

False Form. The tidepool anemone shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Monstrosity mechanics=none — lurker-trap: ✓ ("pretends to be a rock garden")
value check: "Tidal Rupture" EV 3.2 vs floor 12 (one attack of 1) — still under — needs a condition from the worth-an-attack list (logged)
value check: "Opportunist's Lash" EV 14 vs floor 12 (one attack of 1) — worth the trade
library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
signature template (trait): bloodied-burst -> Traits/"Burn Loose" ("The creature releases a burst when something it has stuck tries to pull free — t [verb: wounded:idea]")
```


---

## thawless-memory

**Concept:** a glacier's dreaming mind, slow and enormous, that remembers every climber it has killed

```
Thawless Memory

Huge Elemental, Neutral

AC 16
Initiative -1 (9)

HP 210 (20d12 + 80)

Speed 30 ft., Burrow 30 ft.

MOD
SAVE
STR
22
+6
+10
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
18
+4
+8
CHA
4
-3
-3

Skills Athletics +10, Perception +4

Vulnerabilities Fire

Immunities Cold, Poison; Exhaustion, Poisoned

Senses blindsight 120 ft. (blind beyond this radius); Passive Perception 14

Languages Understands Common but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Glacial Advance. Difficult Terrain composed of ice doesn't cost the thawless memory extra movement, and the thawless memory can move across ice without needing to make an ability check.

Cold Absorption. Whenever the thawless memory is subjected to Cold damage, it takes no damage and instead regains a number of Hit Points equal to the Cold damage dealt.

Immutable Form. The thawless memory is immune to any spell or effect that would alter its form.

Siege Monster. The thawless memory deals double damage to objects and structures.

Grave-Name Chill. At the end of each of the thawless memory's turns, each creature in a 5-foot Emanation originating from the thawless memory takes 10 (3d6) Cold damage.

Actions

Multiattack. The thawless memory makes two Icefall Arm attacks.

Icefall Arm. Melee Attack Roll: +10, reach 10 ft. 30 (7d6 + 6) Cold damage.

Crevasse (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 67 (15d8) Cold damage, and the target has the Prone condition. Success: Half damage only.

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
[route] brute-juggernaut type=Elemental mechanics=snare — brute-juggernaut: ✓ ("slow and enormous")
signature template: fire-aura -> Traits/"Grave-Name Chill" ("The glacier's names settle cold into each living creature that can hear it, sapp [shape fit, no verb match]")
signature template (trait): terrain-walk -> Traits/"Glacial Advance" ("the idea is about advancing through ice without hindrance: 'does not walk so muc [verb: glacier:concept, ice:idea]")
```


---

## warden-of-ash

**Concept:** a kennel-master's ghost and the three hounds that died with him, still hunting as one

```
Warden of Ash

Medium Undead, Neutral

AC 13
Initiative +3 (13)

HP 60 (8d8 + 24)

Speed 5 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
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
15
+2
+2

Skills Stealth +6

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages understands Common and Sylvan but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the warden has Advantage on attack rolls against any creature that hasn't taken a turn. If the warden hits a creature during that round, the target takes an extra 9 (2d8) Necrotic damage.

Faultless Tracker. The warden knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Incorporeal Movement. The warden can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the warden has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The warden makes two Claw attacks.

Claw. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Necrotic damage.

Bonus Actions

Predatory Focus (2/Day). The warden has Advantage on the next attack roll it makes before the end of its turn.

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
[route] lurker-phantom type=Undead mechanics=summon — lurker-phantom: ✓ ("a kennel-master's ghost and the three ho")
value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: focus -> Bonus Actions/"Predatory Focus (2/Day)" ("The idea's verb 'hunt' is a concept match and the template's focus rule carries  [verb: hunt:concept]")
signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## quernwake

**Concept:** a millstone golem that grinds whatever it catches between its wheels

```
Quernwake

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

MOD
SAVE
STR
18
+4
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
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Immutable Form. The quernwake can't shape-shift.

Magic Resistance. The quernwake has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The quernwake makes two Millstone attacks.

Millstone. Melee Attack Roll: +8, reach 10 ft. 31 (6d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition.

Grinding Wheels (Recharge 5-6). Strength Saving Throw: DC 15, one creature within 30 feet that has the Grappled condition. Failure: 63 (14d8) Bludgeoning damage. Success: Half damage.

Bonus Actions

Entomb. The quernwake entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the quernwake, and takes 10 (3d6) Bludgeoning damage at the start of each of the quernwake's turns. The quernwake can have only one creature entombed at a time. If the quernwake takes 25 damage or more on a single turn from the entombed creature, the quernwake must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the quernwake. If the quernwake dies, an entombed creature breaks free Prone by using 10 feet of movement.

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
[route] brute-grappler type=Construct mechanics=grapple, engulf — brute-grappler: ✓ ("grinds whatever it catches between its w")
value check: "Grinding Wheels (Recharge 5-6)" EV 48.8 vs floor 16.6 (one attack of 2) — over the ceiling — gated Recharge 5-6
signature template: condition-payoff -> Actions/"Grinding Wheels (Recharge 5-6)" ("the idea is a slam that grinds a caught creature, dealing damage until it is fre [verb: grind:concept, caught:idea]")
signature miss: trait — "Whenever the quernwake grinds a creature between its wheels, the victim's equipment and body are slowly pulverized, reducing its armor's protection and leaving it more vulnerable to later crushing. This wear persists until the creature can repair or replace what was damaged." [trait/start_of_turn/condition] — the model found no template that holds it (offered: berserk)
```


---

## stolen-tongue

**Concept:** a magpie-thing that steals voices and mimics them to lure travelers off the road

```
Stolen Tongue

Tiny Monstrosity, Neutral

AC 12
Initiative +1 (11)

HP 49 (11d4 + 22)

Speed 20 ft., Fly 20 ft. (hover), Climb 20 ft.

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

Languages Common

CR 2 (XP 450; PB +2)

Traits

Adhesive Hide. The stolen tongue adheres to anything that touches it. A Huge or smaller creature adhered to the stolen tongue has the Grappled condition (escape DC 13).

Actions

Beak. Melee Attack Roll: +5 (with Advantage if the target is Grappled by the stolen tongue), reach 5 ft. 7 (1d8 + 3) Piercing damage plus 6 (1d12) Psychic damage.

Bonus Actions

False Form. The stolen tongue shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Monstrosity mechanics=none — skirmisher-skulker: ✓ ("steals voices and mimics them to lure tr") | skirmisher-skulker -> lurker-trap: the concept's VERB outranks the noun (mimics)
```


---

## plaguewright

**Concept:** a plague-doctor construct of lacquered leather whose beak dispenses the sickness it was built to cure

```
Plaguewright

Large Construct, Neutral

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

Speed 30 ft.

MOD
SAVE
STR
20
+5
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
16
+3
+6
CHA
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Poison Absorption. Whenever the plaguewright is subjected to Poison damage, it takes no damage and instead regains a number of Hit Points equal to the Poison damage dealt.

Immutable Form. The plaguewright is immune to any spell or effect that would alter its form.

Magic Resistance. The plaguewright has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The plaguewright makes two Pestle attacks.

Pestle. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 11 (2d10) Poison damage.

Miasmal Exhalation (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 27 (6d8) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("a plague-doctor construct of lacquered l")
value check: "Miasmal Exhalation (Recharge 5-6)" EV 71.6 vs floor 45.6 (the whole Multiattack (2 attacks)) — worth the trade
signature template: spew -> Actions/"Miasmal Exhalation (Recharge 5-6)" ("The plaguewright exhales a cone of plague-miasma, and creatures caught in it are [verb: exhales:idea]")
signature miss: trait — "The lacquered leather of the plaguewright's body weeps contagious residue whenever it is struck, splashing back onto the attacker with the same pestilence it exhales. A creature that wounds it in melee risks catching the plaguewright's disease." [trait/on_being_hit/condition] — the model found no template that holds it (offered: berserk)
```


---

## drowned-choir

**Concept:** a drowned cathedral's choir, one body of many mouths, whose hymn stops hearts

```
Drowned Choir

Large Undead, Neutral

AC 15
Initiative +6 (16)

HP 171 (18d10 + 72)

Speed 5 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
12
+1
+1
MOD
SAVE
DEX
22
+6
+11
WIS
14
+2
+2
MOD
SAVE
CON
19
+4
+4
CHA
15
+2
+2

Skills Stealth +11

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 120 ft.; Passive Perception 12

Languages Common, Deep Speech

CR 15 (XP 13,000; PB +5)

Traits

Assassinate. During the first round of each combat, the drowned choir has Advantage on attack rolls against any creature that hasn't taken a turn. If the drowned choir hits a creature during that round, the target takes an extra 26 (4d12) Necrotic damage.

Incorporeal Movement. The drowned choir can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the drowned choir has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The drowned choir makes two Mouth attacks. It can replace one attack with a use of Luring Presence.

Mouth. Melee Attack Roll: +11, reach 5 ft. 51 (10d8 + 6) Necrotic damage.

Luring Presence. Wisdom Saving Throw: DC 18, each creature of the drowned choir's choice within 90 feet that can see or hear the drowned choir. Failure: The target has the Charmed condition until the start of the drowned choir's next turn, and while Charmed this way, it must move toward the drowned choir by the safest available route on its turn and can't take Reactions.

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
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("a drowned cathedral's choir")
signature miss: action — "When the choir targets a creature that is already holding its breath against the hymn, it fastens several mouths onto the victim and begins draining the breath from their lungs. While the mouths remain attached, the victim cannot take a breath and suffers continuous necrotic damage; the choir's eyes and mouths cannot be used to sing its hymn at another target until the victim breaks free or dies." [rider/on_hit/damage] — the model found no template that holds it (offered: pacify, lure, pull-through)
value check: "Luring Presence (Recharge 5-6)" EV 57.2 vs floor 27 (one attack of 2) — over the ceiling — gated Recharge 5-6
library seed drawn: lure -> Actions/"Luring Presence (Recharge 5-6)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The hymn is not a thing the choir does but a thing that clings. Any living creature that starts its turn near the choir hears the unfinished hymn and must either hold its breath or take necrotic damage; the hymn only falters in true sunlight, where the choir's drowned voices thin and cannot force the living to drown." [trait/start_of_turn/damage] — no template on the shelf shares a verb with the concept or the idea (offered: fire-aura, warded-mending, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, assassinate, death-burst)
signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## pitchwake

**Concept:** a tar pit

```
Pitchwake

Large Ooze, Unaligned

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 30 ft., Burrow 30 ft.

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
16
+3
+3
CHA
4
-3
-3

Skills Athletics +6, Perception +2

Immunities Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 30 ft. (blind beyond this radius), tremorsense 60 ft.; Passive Perception 12

Languages None

CR 4 (XP 1,100; PB +2)

Traits

Tar Splash. The pitchwake adheres to anything that touches it. A Huge or smaller creature adhered to the pitchwake is also Grappled by it (escape DC 13). Ability checks made to escape this grapple have Disadvantage.

Actions

Multiattack. The pitchwake makes two Tarpseudopod attacks. It can replace one attack with a use of Tarring Glop.

Tarpseudopod. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Tarring Glop. Strength Saving Throw: DC 13, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the pitchwake by a glob of sticky tar and has the Grappled condition (escape DC 13).

Bonus Actions

Engulf. The pitchwake engulfs one Medium or smaller creature it is grappling. While engulfed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the pitchwake, and takes 6 (1d12) Acid damage at the start of each of the pitchwake's turns. The pitchwake can have only one creature engulfed at a time. If the pitchwake takes 12 damage or more in a single turn from the engulfed creature, the pitchwake must expel the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the pitchwake. If the pitchwake dies, an engulfed creature pulls free of the mass Prone by using 5 feet of movement.

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
[route] brute-grappler type=Ooze mechanics=grapple, engulf — brute-grappler: ✓ ("a tar pit")
value check: "Tarring Glop" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
signature template: hook-drag -> Actions/"Tarring Glop" ("The pitchwake hurls a glob of sticky tar that glues/slows the target, which is c [shape fit, no verb match]")
signature template (trait): adhesive -> Traits/"Tar Splash" ("the core verb is stick — tar that touches the attacker makes it sticky and halve [verb: tar:concept, stick:idea, sticky:idea]")
```


---

## last-watch

**Concept:** a hedge knight sworn to a dead king, whose oath keeps him standing after his body should have quit

```
Last Watch

Medium Undead, Lawful Neutral

AC 17
Initiative -1 (9)

HP 144 (17d8 + 68)

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Ward Bond. The last watch is magically bound to a ward of its choosing, and it can have only one ward at a time. While the last watch is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the last watch.

Regeneration. The last watch regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the last watch takes Radiant damage, this trait doesn't function at the start of the last watch's next turn.

Actions

Multiattack. The last watch makes two Shield attacks.

Shield. Melee Attack Roll: +7, reach 10 ft. 17 (3d8 + 4) Bludgeoning damage.

Bulwark (2/Day). The last watch targets itself or one creature it can see within 60 feet. The target gains 18 (4d8) Temporary Hit Points, and its AC increases by 2 until the end of the last watch's next turn.

Bonus Actions

Binding Mark. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the last watch's next turn, the target has Disadvantage on attack rolls against creatures other than the last watch.

Reactions

Interpose. Trigger: A creature within 5 feet of the last watch that it guards is hit by an attack roll. Response: The attack hits the last watch instead, and the last watch has Resistance to the attack's damage.

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
[route] defender-warden type=Undead mechanics=none — defender-warden: ✓ ("whose oath keeps him standing after his ")
value check: "Binding Mark" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: aggro-curse -> Bonus Actions/"Binding Mark" ("exact concept match [verb: oath:concept, sworn:concept, duel:idea]")
signature miss: trait — "When the knight hits a foe with his shield, a sliver of the enemy's life clings to the shield and flows into his ward, healing the ward by a small amount. This stolen vitality is grave-cold, tasting of the tomb, and only works if the ward is within his protective reach." [trait/always/resource] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
signature template (trait): interpose -> Traits/"Interpose" ("the seat owes it by print")
```
