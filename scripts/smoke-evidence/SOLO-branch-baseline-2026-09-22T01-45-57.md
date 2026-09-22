# Signature-slot review — single run, no comparison

Run: `branch-baseline-2026-09-22T01-45-57`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


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

Dappled Stillness. While the canopy leopard remains motionless, it is indistinguishable from a shadow cast by the canopy.

Actions

Multiattack. The canopy leopard makes three attacks, using Bite or Claw in any combination.

Bite. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Claw. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Slashing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the canopy leopard takes the Hide action.

Canopy Pounce (2/Day). The canopy leopard has Advantage on the next attack roll it makes before the end of its turn.

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
signature miss: action — "When the leopard drops from above onto prey that hasn't seen it coming, the fall itself is the killing blow: it lands on the target's back and rides it down, pinning the creature under its weight so it cannot break away. The victim is dragged, stumbling, partway toward the branches on that first terrible landing, marking it as the one the leopard means to take." [rider/on_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: affliction)
value check: "Predatory Focus (2/Day)" EV 0 vs floor 0 (a bonus action (free)) — worth the trade
library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
signature template (trait): false-appearance -> Traits/"Dappled Stillness" ("the idea's verb is still — while it stands motionless, prey lose sight of it and [verb: still:idea]")
```


---

## coining-charger

**Concept:** a brass bull construct that charges through market stalls

```
Coining Charger

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

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Furnace Rebound. A creature that touches the coining charger or hits it with a melee attack while within 5 feet of it takes 13 (3d8) Fire damage.

Actions

Gore. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the coining charger moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Slag Cone (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: 31 (9d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 13, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

Furnace Focus. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the coining charger's next turn, the target has Disadvantage on attack rolls against creatures other than the coining charger.

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
[route] brute-charger type=Construct mechanics=none — brute-charger: ✓ ("a brass bull construct that charges thro")
signature miss: action — "The charger slams its glowing-hot front hooves down and lets its inner furnace roar through the ground in a straight line ahead of it. Any surface in that lane erupts into clinging blobs of molten brass that stick to flesh and stall-wood alike, and they keep smoldering until someone takes the time to scrape them off. The bull can do this only every so often, as the effort vents its internal pressu" [action/always/damage] — "push-prone" could not be filled (fills: {"dc":"13"})
value check: "Binding Mark" EV 3.3 vs floor 0 (a bonus action (free)) — worth the trade
library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
signature template (trait): heated-body -> Traits/"Furnace Rebound" ("the idea is exactly a melee hit against it answers with heat — anyone who strike [verb: furnace:concept, brass:concept, iron:concept, heat:idea, burn:idea, sear:idea, fire:idea, glow:idea]")
```


---

## stormwrack-hermit

**Concept:** a recluse who calls lightning down on trespassers from a mile away

```
Stormwrack Hermit

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

Languages Common, Primordial

CR 12 (XP 8,400; PB +4)

Actions

Multiattack. The stormwrack hermit makes four Arc Bolt attacks. It can replace one attack with a use of Luring Presence.

Arc Bolt. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 150 ft. 20 (4d6 + 6) Lightning damage.

Spellcasting. The stormwrack hermit casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

- At Will: Misty Step
- 1/Day Each: Lightning Bolt, Thunderwave (level 3 version), Ice Storm

Luring Presence. Wisdom Saving Throw: DC 17, each creature of the stormwrack hermit's choice within 60 feet that can see or hear the stormwrack hermit. Failure: The target has the Charmed condition until the start of the stormwrack hermit's next turn, and while Charmed this way, it must move toward the stormwrack hermit by the safest available route on its turn and can't take Reactions.

Reactions

Protective Magic (3/Day). Trigger: The stormwrack hermit is hit by an attack roll. Response: The stormwrack hermit casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
signature miss: action — "The hermit fixes its gaze on a lone trespasser standing apart from their allies and calls down a streak of lightning from the storm-wracked sky above them. The bolt lands in a blinding flash, and for a heartbeat the target's silhouette is outlined in crawling arcs of electricity; if they are still standing, the hermit immediately follows with a second bolt before they can regroup." [rider/on_hit/damage] — no template exists for this section on this line
value check: "Luring Presence" EV 11.6 vs floor 10.9 (one attack of 4) — worth the trade
library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
signature miss: trait — "The hermit's body is a storm-scarred shell of ash and static, so every arc bolt it looses leaves a clinging charge on its victim that arcs to the next creature they touch. Anyone who strikes the hermit in melee also gets a jolt of stored lightning, as the sky's messenger punishes those who dare lay hands on it." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, death-burst)
```


---

## knitting-mountain

**Concept:** a mountain of troll-flesh that knits shut around the axes left in it

```
Knitting Mountain

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

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 16

Languages None

CR 17 (XP 18,000; PB +6)

Traits

Bloodied Burst. The first time the knitting mountain is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 19, each creature in a 30-foot Emanation originating from the knitting mountain. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Legendary Resistance (3/Day). If the knitting mountain fails a saving throw, it can choose to succeed instead.

Regeneration. The knitting mountain regains 20 Hit Points at the start of each of its turns. If the knitting mountain takes Acid or Fire damage, this trait doesn't function on the knitting mountain's next turn. The knitting mountain dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The knitting mountain makes three Slam attacks.

Slam. Melee Attack Roll: +12, reach 10 ft. 42 (8d8 + 6) Bludgeoning damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit the knitting mountain with an attack roll since the end of the knitting mountain's last turn takes 17 (5d6) Bludgeoning damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the knitting mountain can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Grinding Advance. The knitting mountain moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Flesh Beckons. Wisdom Saving Throw: DC 19, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

World Shudder. Strength Saving Throw: DC 19, each creature within 10 feet of the knitting mountain. Failure: The target has the Prone condition.

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
[route] brute-regenerator type=Monstrosity mechanics=regeneration, grapple — brute-regenerator: ✓ ("knits shut")
signature miss: action — "The knitting mountain tears a weapon it has already swallowed back out of its own body and hurls it across the field as a spinning missile of bone and iron. Whoever it strikes is left pinned and bleeding, and the wound it tore in the mountain seals a heartbeat later, ready to be reused." [action/always/damage] — the model found no template that holds it (offered: condition-payoff, throw-retrieve, hook-drag, active-toll, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter)
value check: "Answering Sting" EV 9.4 vs floor 0 (a bonus action (free)) — worth the trade
library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
signature template (trait): bloodied-burst -> Traits/"Knitting Surge" ("the concept's own verb is 'wounded'; the idea specifies wounds that knit shut an [verb: wounded:concept]")
```


---

## consecrated-threshold-warden

**Concept:** a stone shrine-guardian bound to the high priest it was made to protect

```
Consecrated Threshold Warden

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

Senses darkvision 120 ft., tremorsense 30 ft.; Passive Perception 13

Languages Understands Common and Celestial but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Ward Bond. The warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the warden.

Regeneration. The warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Actions

Multiattack. The warden makes two Slam attacks.

Slam. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.

Interpose (2/Day). The warden targets itself or one creature it can see within 60 feet. The target gains 18 (4d8) Temporary Hit Points, and its AC increases by 2 until the end of the warden's next turn.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the warden gains 9 (2d8) Temporary Hit Points.

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
[route] defender-warden type=Construct mechanics=none — defender-warden: ✓ ("stone shrine-guardian bound to the high ")
signature miss: action — "The warden calls its charge's name and steps back into its carved purpose. Its granite body becomes a living watchpost: for a short time, whenever the priest or the warden is struck, the attacker is pelted by shards of consecrated rock that fly from the shrine itself, and the warden knows exactly where that attacker stands. The effect ends early if the warden leaves the sacred ground." [rider/on_hit/damage] — no template exists for this section on this line
value check: "Bolstering Cry (2/Day)" EV 5 vs floor 0 (a bonus action (free)) — worth the trade
library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
signature miss: trait — "The warden's stone flesh drinks the shrine's blessing and holds it. When it is damaged by a creature, a thin seam of consecrated force remains on that creature until the shrine's next prayer, marking it for the warden's retaliation." [trait/on_being_hit/condition] — "false-appearance" could not be filled (fills: {})
```


---

## funeral-peal

**Concept:** a swarm of funeral bells that ring themselves over the dying

```
Funeral Peal

Medium Swarm of Tiny Constructs, Neutral

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

Senses blindsight 60 ft. (blind beyond this radius), darkvision 120 ft.; Passive Perception 10

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Tolling Bell attacks.

Tolling Bell. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage if the swarm is Bloodied.

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
signature template: active-toll -> Actions/"Funeral Toll (Recharge 5-6)" ("The central verb 'ring' matches the template's fixed concept verb 'ring' (bell c [verb: ring:concept, bell:concept]")
signature miss: trait — "Each individual bell in the swarm rings for the nearest creature that is already marked as dying, dragging its neighbor into the same toll until the whole swarm turns as one. An opponent can never shake the swarm by moving away; the many bells pivot and follow the peal." [trait/start_of_turn/movement] — no template exists for this section on this line
```


---

## pealwing

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

```
Pealwing

Huge Dragon, Chaotic Neutral

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

Legendary Resistance (3/Day). If the pealwing fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The pealwing makes three Bite attacks. It can replace one attack with a use of (A) Reel or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +11, reach 10 ft. 24 (4d8 + 6) Piercing damage plus 16 (3d10) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The pealwing casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Command, Fear, Dispel Magic
- 1/Day Each: Scrying

Reel. Strength Saving Throw: DC 18, one Huge or smaller creature within 60 feet. Failure: 21 (6d6) Thunder damage, and the target is pulled up to 25 feet straight toward the pealwing, and it has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pealwing can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Snap Jaws. The pealwing makes one Bite attack.

Spiral Dive. The pealwing moves up to half its Speed without provoking Opportunity Attacks.

Storm Stare. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
signature miss: action — "The pealwing rises sharply into its own thunderclouds, folding the storm around itself like a cloak, then dives at one creature it can see below. The dive is a straight plunging line of wind and noise; the first thing it reaches must scramble aside or be dragged with it back up and left exposed in the air." [rider/on_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: charge)
value check: "Reel" EV 21.6 vs floor 20.3 (one attack of 3) — added Success: Half
library seed drawn: reel -> Actions/"Reel" (no template held the idea; a proven shape stands in)
signature miss: trait — "Every peal of thunder the pealwing makes lingers in the sky around it. While it stays airborne in open space, the echoes keep striking anyone who tries to answer it with magic or reach it from a distance, so fighting it in the open means fighting the storm itself." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, death-burst)
```


---

## lamplighter-s-knife

**Concept:** a gutter assassin that hides between lantern-flickers

```
Lamplighter's Knife

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

Lantern Step. The lamplighter's knife ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The lamplighter's knife makes two attacks, using Knife or Thrown Knife in any combination.

Knife. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Slashing damage plus 5 (1d10) Necrotic damage.

Thrown Knife. Ranged Attack Roll: +5, range 30/90 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The lamplighter's knife takes the Dash, Disengage, or Hide action.

Flickerstep (Recharge 4-6). The lamplighter's knife teleports up to 40 feet to an unoccupied space it can see.

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
value check: "Flickerstep (Recharge 4-6)" EV 0 vs floor 0 (a bonus action (free)) — worth the trade
signature template: blink -> Bonus Actions/"Flickerstep (Recharge 4-6)" ("The idea's central verb is hiding between lantern-flickers, which maps to flicke [verb: flicker:concept, shadow:idea]")
signature miss: trait — "While within the dim pool of a lantern or torch, its body becomes pure shadow-stuff; it can slip through the space between one flame's flicker and the next without a sound. The moment it leaves the light, it unravels back into flesh, leaving only a lingering chill on the air." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, death-burst)
```


---

## hollow-trust

**Concept:** a vault that grew a hunger — the strongroom itself is the mimic

```
Hollow Trust

Large Monstrosity, Neutral

AC 14
Initiative +2 (12)

HP 119 (14d10 + 42)

Speed 10 ft., Fly 40 ft.

MOD
SAVE
STR
20
+5
+5
INT
13
+1
+1
MOD
SAVE
DEX
15
+2
+6
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
13
+1
+1

Skills Stealth +6

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 11

Languages understands Common and Dwarvish but can't speak

CR 11 (XP 7,200; PB +4)

Traits

Light Sensitivity. While in Bright Light, the hollow trust has Disadvantage on attack rolls.

Actions

Multiattack. The hollow trust makes two Slam attacks. It can replace one attack with a use of Vitality Leech.

Slam. Melee Attack Roll: +9 (with Advantage if the target is Grappled by the hollow trust), reach 10 ft. 41 (8d8 + 5) Bludgeoning damage.

Engulf. Melee Attack Roll: +9, reach 5 ft. 41 (8d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, the hollow trust attaches to it: the target has the Grappled condition (escape DC 15), and the hollow trust's attacks hit only the Grappled target while attached.

Vitality Leech. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 39 (6d12) Piercing damage, and the hollow trust regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The hollow trust shape-shifts to resemble a natural feature of its surroundings while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Monstrosity mechanics=grapple — lurker-trap: ✓ ("the strongroom itself is the mimic")
value check: "Vitality Leech" EV 30.2 vs floor 20.3 (one attack of 2) — added Success: Half; dice 24 → 39
signature template: drain -> Actions/"Vitality Leech" ("The idea is a vault that grew a hunger; the template's verb is hunger, matching  [verb: hunger:concept]")
signature miss: trait — "Its counterfeit door is a living trap. Anyone who steps within reach of the yawning entrance is caught by a sudden well of supernatural greed, unable to look away from the promise of treasure inside." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, death-burst)
```


---

## scarpfang

**Concept:** a cliff troll that shears slabs off the rockface and hurls them at climbers

```
Scarpfang

Large Giant, Neutral

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 15

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Mountain Stride. The scarpfang ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Regeneration. The scarpfang regains 15 Hit Points at the start of each of its turns. If the scarpfang takes Acid or Fire damage, this trait doesn't function on the scarpfang's next turn. The scarpfang dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The scarpfang makes three attacks, using Claw or Slab in any combination.

Claw. Melee Attack Roll: +6, reach 5 ft. 10 (2d6 + 3) Slashing damage.

Slab. Ranged Attack Roll: +6, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage.

Rockfall Burst (Recharge 5-6). The scarpfang hurls a sheared stone slab at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 31 (9d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Hurled Slab. The scarpfang hurls a hurled object. Ranged Attack Roll: +6, range 30/120 ft. 10 (3d6) Bludgeoning damage. The weapon lands in an unoccupied space within 5 feet of the target; until the scarpfang spends 5 feet of movement in that space to recover it, the scarpfang's Speed is halved and it can't use this action.

Bonus Actions

Fleet Agility. The scarpfang takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — skirmisher-hurler: ✓ ("shears slabs off the rockface and hurls ")
signature miss: action — "The scarpfang presses one claw flat against the cliff face and wrenches a slab loose, then hurls it in a high arcing throw at a foe already knocked sprawling or hanging helpless on the wall; the falling stone slams down and leaves the victim stunned and pinioned, pinned in place against the rock for a few moments while it readies its next throw." [rider/on_hit/condition] — no template on the shelf shares a verb with the concept or the idea (offered: affliction)
value check: "Hurled Weapon" EV 6.9 vs floor 5.2 (one attack of 3) — worth the trade
library seed drawn: throw-retrieve -> Actions/"Hurled Weapon" (no template held the idea; a proven shape stands in)
signature miss: trait — "The cliff troll is a body of living stone, and when it takes a heavy blow the force travels through it and it can shift its weight into the cliff itself, drinking strength from the mountain and rooting itself to the spot as long as the stone holds." [trait/on_being_hit/defense] — "false-appearance" could not be filled (fills: {})
```
