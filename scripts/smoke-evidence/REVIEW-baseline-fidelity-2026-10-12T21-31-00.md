# Review batch — baseline-fidelity-2026-10-12T21-31-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 6/6 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/7 |
| Mirel Dreen | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/5 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Crossroads Tyrant | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/9 |
| Marsh Skipper | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Vigil Stone | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Staffmage | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/1 |
| Muckjaw Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Hamperwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 1/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Iron Bull Golem | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 5/6 | 6/6 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Caltrop Runner | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Apiarch | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 3 of 46 user clauses** (coverage 93%); concept share 79% (65/82 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Caltrop Runner — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Caltrop Runner | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

```
Caltrop Runner
Small humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

12 (+1)

	

12 (+1)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Draconic

Challenge

1/2 (100 XP)

Proficiency Bonus:

+2

Warren Dash. The caltrop runner ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the caltrop runner takes the Dash or Disengage action.

Actions
Multiattack: The caltrop runner makes two Hand Crossbow attacks.
Dagger: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the caltrop runner has advantage on its next attack roll against the target before the end of its next turn.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: caltrop bag [object] | hit-and-run crossbow fire [behavior] | retreat to prepared ground [behavior]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The runner loads a caltrop round and fires it at a spot on the ground instead of a creature, scattering a small patch of spiked ground that springs open where it lands. Enemies crossing that patch are slowed and pricked, and the runner uses the confusion to slip to a new firing position. It can only do this a couple of times before its special rounds run dry." [rider/on_hit/movement] — menu: contagion, pounce (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] signature miss: action — "The runner loads a caltrop round and fires it at a spot on the ground instead of a creature, scattering a small patch of spiked ground that springs open where it lands. Enemies crossing that patch are slowed and pricked, and the runner uses the confusion to slip to a new firing position. It can only do this a couple of times before its special rounds run dry." [rider/on_hit/movement] — the model found no template that holds it (offered: contagion, pounce, feint-slip)
[reskin] value check: "Dazzling Burst" EV 0.6 vs floor 2.1 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The caltrop runner's body is a walking arsenal of concealed spikes and hooked barbs; anything that grapples it, swallows it, or otherwise seizes its body gets a fistful of barbed caltrops for its trouble. The runner sheds a few with every grab, making it painful to hold onto." [trait/on_being_hit/damage] — menu: EMPTY (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry, death-burst)
[reskin] signature miss: trait — "The caltrop runner's body is a walking arsenal of concealed spikes and hooked barbs; anything that grapples it, swallows it, or otherwise seizes its body gets a fistful of barbed caltrops for its trouble. The runner sheds a few with every grab, making it painful to hold onto." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry, death-burst)
```


---

## Iron Bull Golem — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull Golem | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

```
Iron Bull Golem

Huge Construct, Unaligned

AC 16
Initiative +0 (10)

HP 210 (20d12 + 80)

Speed 50 ft.

MOD
SAVE
STR
22
+6
+10
INT
5
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
18
+4
+8
CHA
6
-2
-2

Skills Athletics +10, Perception +5

Resistances Fire

Immunities Poison, Bludgeoning, Piercing, and Slashing from nonmagical attacks that aren't adamantine; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Scalding Breath. A creature that touches the iron bull golem or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull golem can't shape-shift.

Magic Resistance. The iron bull golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull golem makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Wisdom Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull golem. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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
[route] brute-charger type=Construct mechanics=breath — brute-charger: ✓ ("It charges and gores") | brute-charger: key "charges" (class verb)
[concept] signature elements: thunderous charge and gore [behavior] | scalding steam breath [behavior] | iron body immune to all but adamantine [body]
[reskin] signature idea (action): "The golem lowers its head and thunders in a straight line, building unstoppable momentum. The first creature in its path is gored and carried along, and if it strikes a wall or another solid obstacle, the impact shakes the ground and hurls the victim away." [action/always/movement] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Scalding steam constantly hisses from the golem's nostrils. Any creature that comes within reach of its burning breath is scalded, and its own fire cannot harm it." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Breath" ("a creature that comes within reach of its scalding steam is burned by contact, a [verb: scald:concept, iron:concept, burn:idea, fire:idea]")
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Meshrin
Large humanoid, lawful neutral
Armor Class

19 (splint, shield)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

11 (+0)

	

13 (+1)

	

14 (+2)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Meshrin hits a creature with its Greatsword, the attack deals an extra 3 damage.
Riposte (Reaction). When a creature misses Meshrin with a melee attack roll, Meshrin makes one Tail Swipe attack against that creature.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword and tail-swipes [object] | trained fighter's discipline [behavior] | razor claws and vicious bite [body]
[reskin] signature idea (action): "After a creature within Meshrin's reach fails to hold its ground against Meshrin's tail, Meshrin immediately presses the advantage with a disciplined follow-up. It lashes out with claws and bite, driving the foe down and keeping the warlord's path clear." [rider/on_hit/damage] — menu: charge-push, hook-rider (+ shelf: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "After a creature within Meshrin's reach fails to hold its ground against Meshrin's tail, Meshrin immediately presses the advantage with a disciplined follow-up. It lashes out with claws and bite, driving the foe down and keeping the warlord's path clear." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin's hide is a map of old wounds and harder lessons; blades that bite too shallow only teach it how to bite back. Whenever a foe lands a glancing blow, Meshrin answers with a snap of its jaws or a rake of its claws against that same attacker." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Meshrin's hide is a map of old wounds and harder lessons; blades that bite too shallow only teach it how to bite back. Whenever a foe lands a glancing blow, Meshrin answers with a snap of its jaws or a rake of its claws against that same attacker." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, terrain-walk, bloodied-fury)
```


---

## Mirel Dreen — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Mirel Dreen | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Mirel Dreen

Medium Humanoid, Neutral Evil

AC 15
Initiative +2 (12)

HP 65 (10d8 + 20)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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
+4
MOD
SAVE
CON
14
+2
+2
CHA
18
+4
+6

Skills Perception +4, Deception +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Mirel makes two attacks, using Claw or Acid Ray in any combination. It can replace one attack with a use of (A) Rotting Ray or (B) Spellcasting to cast Acid Arrow.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Acid Ray. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Acid damage.

Rotting Ray. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Acid damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mirel casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Acid Arrow
- 1/Day Each: Ray of Sickness (level 2 version), Cloudkill

Grasping Mire. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of Mirel's next turn.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: binding hexes that steal actions [behavior] | a brine-sodden hag body hung with drowned charms [body] | a fen-bound snare of roots and black water [aura]
[reskin] signature idea (action): "Mirel hurls a fistful of brine-soaked reed charms that burst into clutching hexes. Up to three foes feel the hex take hold: a wracking spasm steals what they were about to do, and their wounds refuse to close. The hex gnaws until Mirel is hurt or loses her focus, then the charms crumble to muck." [action/once_per_fight/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Brineclutch Hex" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brineclutch Hex" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Lash" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Mirel's body is sodden with bog-water and hung with drowned charms and finger-bone fetishes. The first blade or spell that bites her finds only brine and muck, the wound closing over like water—but the strike scatters her charms, and the hexes riding them lash back at whoever drew blood." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature miss: trait — "Mirel's body is sodden with bog-water and hung with drowned charms and finger-bone fetishes. The first blade or spell that bites her finds only brine and muck, the wound closing over like water—but the strike scatters her charms, and the hexes riding them lash back at whoever drew blood." [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk)
```


---

## Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 33 (3 × Rend); nova none; dmg 33

```
Troll
Large giant, unaligned
Armor Class

15 (natural armor)

Hit Points: 

94 (9d10 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

13 (+1)

	

20 (+5)

	

7 (-2)

	

9 (-1)

	

7 (-2)

Skills: 

Athletics +7, Perception +2

Saving Throws: 

STR +7, CON +8

Senses: 

darkvision 60 ft., passive Perception 12

Languages: 

Giant

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Regeneration. The troll regains 15 hit points at the start of each of its turns. If the troll takes acid or fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
Loathsome Limbs. If the troll ends any turn with half of its hit points or fewer and took 15+ slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 level of exhaustion for each missing limb, and it grows replacement limbs the next time it regains hit points.
Charge. As a bonus action, the troll moves up to half its speed straight toward an enemy it can see.

Actions
Multiattack: The troll makes three Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage.
```

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] cr from print: 5 — a print creature heads the words and the user set none
[concept] signature elements: regeneration that only fire or acid stops [behavior] | rubbery hide and gangly limbs [body] | ravenous hunger that never ends [behavior]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon name: "Gravemaw Troll" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon multiattack: "The troll makes three Rend attacks." — the Troll's own
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Knife Ball — a homebrew with a nova

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · soft · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Core Slam); nova Knife Scatter 11; dmg 14

```
Knife Ball
Small construct, unaligned
Armor Class

13 (natural armor)

Hit Points: 

45 (7d6 + 21)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3, WIS +4

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Buried Blade. During the first round of each combat, the knife ball has advantage on attack rolls against any creature that hasn't taken a turn. If the knife ball hits a creature during that round, the target takes an extra 4 (1d8) bludgeoning damage.
Rolling Shell. The knife ball ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the knife ball takes the Dash or Disengage action.

Actions
Multiattack: The knife ball makes two attacks: one with its Core Slam and one with its Thrown Knife. It can replace one attack with a use of Grinding Carve.
Core Slam: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) bludgeoning damage.
Thrown Knife: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) piercing damage. Immediately after the attack, a hurled knife returns to the knife ball's grasp.
Knife Scatter (Recharge 5-6): The knife ball hurls a hurled knife at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 11 (2d10) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Grinding Carve: One creature within 30 feet that is prone must make a DC 13 Dexterity saving throw, taking 7 (2d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — skirmisher-hurler: ✓ ("knife ball") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: retractable knife-studded iron shell [body] | hurling blades from its body [behavior] | rolling charge into foes [behavior]
[reskin] nova capped: "Hurled Burst" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball rolls straight through its enemies in a grinding charge, its bladed hide carving anyone in its path. After the charge, it can either keep moving or stop dead and let the momentum drive an extra knife into a single target it just passed." [action/always/damage] — menu: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Grinding Carve" EV 5.4 vs floor 3.6 (one attack of 2) — dice 14 → 7 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Grinding Carve" ("rolls straight through its enemies in a grinding charge, its bladed hide carving [verb: grind:idea]")
[reskin] signature idea (trait): "Whenever the knife ball slams its core into a target, the impact jars loose a buried blade that springs out and sticks into the same creature. The buried knife can be yanked free by the knife ball later, but until then it keeps hurting." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature template (trait): assassinate -> Traits/"Buried Blade" ("none of the templates carries the idea of a blade lodging in a target and persis [verb: knife:concept]")
[reskin] chassis nova: "Knife Scatter (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Vigil Stone — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vigil Stone | 4 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 28 (1 × Slam); nova none; dmg 28

```
Vigil Stone

Medium Construct, Unaligned

AC 13
Initiative +1 (11)

HP 84 (13d8 + 26)

Speed 20 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
18
+4
+6
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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Adhesive Hide. The vigil stone adheres to anything that touches it. A Huge or smaller creature adhered to the vigil stone has the Grappled condition (escape DC 14).

Actions

Slam. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the vigil stone), reach 5 ft. 17 (3d8 + 4) Bludgeoning damage plus 11 (2d10) Force damage.

Vitality Leech. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 27 (6d8) Force damage, and the vigil stone regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The vigil stone shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Construct mechanics=none — lurker-trap: ✓ ("only moves when no one is looking") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: moves only when unobserved [behavior] | carved stone gargoyle body [body] | perched ambush predator [behavior]
[reskin] signature idea (action): "The vigil stone marks one living creature it can currently see and freezes that mark into its stone heart; while the mark stands where others can watch it, the gargoyle cannot strike, but the moment the marked creature is alone — out of every ally's sight — the stone lurches across the distance and lands a blow meant only for it. Only one creature can bear the mark, and picking a new one releases " [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] value check: "Watchful Brand" EV 7.7 vs floor 14 (one attack of 1) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Watchful Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 20.9 vs floor 14 (one attack of 1) — added Success: Half; dice 16 → 27
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gargoyle is dormant stone whenever any living creature can see it — it cannot act, cannot move, and reads as plain masonry; the instant every watching eye is gone, it wakes and hunts." [trait/always/condition] — menu: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The gargoyle is dormant stone whenever any living creature can see it — it cannot act, cannot move, and reads as plain masonry; the instant every watching eye is gone, it wakes and hunts." [trait/always/condition] — the model found no template that holds it (offered: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Staffmage — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Staffmage | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff); nova none; dmg 22

```
Staffmage
Medium humanoid, neutral
Armor Class

12

Hit Points: 

58 (13d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


9 (-1)

	

14 (+2)

	

11 (+0)

	

17 (+3)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +5, Perception +3

Saving Throws: 

INT +5, WIS +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common and any three languages

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Actions
Multiattack: The staffmage makes two Staff attacks.
Staff: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage, and the target is subjected to the following effect. The target must make a DC 13 Constitution saving throw. On a failed save, the target has the Prone condition.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("hits people with his staff") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: staff strikes [object] | hit-and-run skirmishing [behavior] | iron-shod staff [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's; INT 17 outranks the card's +4, so the sheet rolls +5 (raise-only)
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "The staffmage lunges forward, sweeps his staff low into the knees of a foe he has just staggered, then spins and retreats to the farthest point he can reach on the battlefield, daring the target to come after him. If the knee-sweep lands, the foe is left off balance and cannot easily chase him." [rider/on_hit/condition] — menu: EMPTY (+ shelf: gaze-single, snare, reel, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally)
[reskin] signature miss: action — "The staffmage lunges forward, sweeps his staff low into the knees of a foe he has just staggered, then spins and retreats to the farthest point he can reach on the battlefield, daring the target to come after him. If the knee-sweep lands, the foe is left off balance and cannot easily chase him." [rider/on_hit/condition] — the model found no template that holds it (offered: herd)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The staffmage treats his staff as an extension of his own body, reading its balance and weight in every strike. So long as he holds no other weapon in his other hand, his staff attacks are unnaturally precise and can slip past an enemy's guard when he catches them off balance." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The staffmage treats his staff as an extension of his own body, reading its balance and weight in every strike. So long as he holds no other weapon in his other hand, his staff attacks are unnaturally precise and can slip past an enemy's guard when he catches them off balance." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Hamperwretch — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Hamperwretch | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Sodden Wrap); nova none; dmg 24

```
Hamperwretch

Medium Monstrosity, Neutral

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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

Skills Athletics +5, Perception +2

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 12

Languages understands Sock (a crude language of fabric and odor) but can't speak

CR 3 (XP 700; PB +2)

Traits

Uncanny Sense. The hamperwretch can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The hamperwretch makes two Sodden Wrap attacks. It can replace one attack with a use of Sodden Lash.

Sodden Wrap. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Sodden Lash. Strength Saving Throw: DC 13, one creature within 30 feet that is Grappled by the hamperwretch. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Smother. The hamperwretch smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the hamperwretch, and takes 4 (1d8) Bludgeoning damage at the start of each of the hamperwretch's turns. The hamperwretch can have only one creature smothered at a time. If the hamperwretch takes 9 damage or more in a single turn from the smothered creature, the hamperwretch must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the hamperwretch. If the hamperwretch dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: smothering engulf [behavior] | sentient pile of laundry [body] | language of socks [behavior]
[reskin] signature idea (action): "The hamperwretch inhales the stale air around it and then exhales a low, gurgling phrase in Sock, its native language of fabric and odor. Every creature that can smell the hamperwretch and is within thirty feet hears the phrase as a gut-level compulsion: unwashed bodies are meant to lie still and be forgotten. Listeners that understand any language must fight the urge to stop moving and let the da" [action/always/condition] — menu: swallow, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: leap, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Stale Sermon (2/Day)" EV 4.7 vs floor 20.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stale Sermon (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hamperwretch is a living pile of laundry, so its folds hold pockets of reeking air that leak out whenever it is disturbed. Any creature that touches, grapples, or is grappled by it is overwhelmed by the sock-stench: the creature's sense of direction and its ability to track enemies by smell or fine detail are scrambled until the end of its next turn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (smell, smells)
[reskin] signature bound by force: trait — "uncanny-sense" matches smell+smells in the user's words; the model's none is overruled
[reskin] signature template (trait): uncanny-sense -> Traits/"Uncanny Sense" ("exact concept match [verb: smell:concept, smells:concept]")
```


---

## Grandmother Ash — bands soft

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Choking Miasma 22; dmg 43

```
Grandmother Ash
Medium fey, neutral evil
Armor Class

15 (natural armor)

Hit Points: 

127 (17d8 + 51)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

16 (+3)

	

13 (+1)

	

14 (+2)

	

14 (+2)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Damage Vulnerabilities: 

fire

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common, Elvish, Sylvan

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Toxic Reek. A creature that touches the grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) poison damage.
Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Choking Miasma (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=aura, breath — caster-binder: ✓ ("Her nails are long and black and carry r") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: ash cloud form [body] | choking and suffocation [behavior] | undead crows as scouts [object]
[reskin] print canon route: the Green Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Green Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash exhales a billowing cloud of choking ash that fills the air around her, lingering for a short while. Anyone caught inside has the air stolen from their lungs, coughing and sputtering, and cannot see through the swirling soot. She often uses this to blind and scatter intruders before lunging at one with her rotting nails." [action/save/condition] — menu: swallow, trample, leap, thrown-burst, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: gaze-single, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] value check: "Choking Miasma (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Choking Miasma (Recharge 5-6)" ("exhales a billowing cloud of choking ash that fills the air around her, lingerin [verb: cloud of:concept, breathes:concept, exhales:idea]")
[reskin] signature idea (trait): "Whenever Grandmother Ash takes fire damage, her ash cloud form destabilizes and she is forced to pull herself together, losing her ability to drift and choke for a moment. She becomes briefly vulnerable and sluggish, making her retreat if badly burned." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature bound by force: trait — "heated-body" matches burn+fire in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: burn:concept, fire:concept]")
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ashen Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```
