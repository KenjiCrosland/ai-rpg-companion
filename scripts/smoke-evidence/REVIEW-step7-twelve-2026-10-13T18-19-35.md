# Review batch — step7-twelve-2026-10-13T18-19-35

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Vaultsworn Bulwark | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok | soft (2) | 6/6 | 3/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 5/7 | 4/4 |
| Mire Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thurivald | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Thunder-Stamp Herdmaster | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Sorrowbile the Rotwife | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Snapping Turtle Elder | 9 | 2024 | brute-9 | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 69% (43/62 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Mire Hound — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Mire Hound

Medium Beast, Unaligned

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+4
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

Skills Athletics +4, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Sure Footing. Difficult Terrain composed of mud doesn't cost the mire hound extra movement, and the mire hound can move across mud without needing to make an ability check.

Actions

Multiattack. The mire hound makes two Bite attacks. It can replace one attack with a use of Drowning Drag.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Drowning Drag. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the mire hound by its jaws and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The mire hound whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the mire hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the mire hound's turns. The mire hound can have only one creature whelmed at a time. If the mire hound takes 5 damage or more in a single turn from the whelmed creature, the mire hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the mire hound. If the mire hound dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Beast mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: drags prey underwater [behavior] | mud-caked hide [body]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The hound seizes a creature it has already clamped in its jaws and throws itself into the deepest water within reach, dragging the victim with it. While submerged it thrashes and buries its prey in the soft bottom, forcing the victim to break free or be drowned. It releases only after the victim tears loose or goes limp." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-rider, hook-drag (drag, drags, under)
[reskin] value check: "Drowning Drag" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Drowning Drag" ("The hound seizes a creature it has grappled and drags it into the water, forcing [verb: drag:concept, under:concept]")
[reskin] signature idea (trait): "The hound's mud-caked hide stays slick and dripping, and its natural camouflage lets it vanish into banks, reeds, and shallows the moment it stops moving. Creatures that try to spot it in such terrain find it nearly impossible to pick out from the muck." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept, reeds:idea, shallows:idea]")
```


---

## Kraken — highest CR

**Concept:** a kraken

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

```
Kraken
Gargantuan monstrosity, chaotic evil
Armor Class

18 (natural armor)

Hit Points: 

481 (26d20 + 208)

Speed: 

30 ft., swim 120 ft.

STR	DEX	CON	INT	WIS	CHA


30 (+10)

	

11 (+0)

	

26 (+8)

	

22 (+6)

	

18 (+4)

	

20 (+5)

Skills: 

Athletics +17, Perception +11

Saving Throws: 

STR +17, CON +15, WIS +11

Damage Immunities: 

cold, lightning

Condition Immunities: 

frightened, grappled, paralyzed, restrained

Senses: 

truesight 120 ft., passive Perception 21

Languages: 

understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft.

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious. The kraken can breathe air and water.
Siege Monster. The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) by one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 23 Dexterity saving throw, taking 33 (6d10) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller and fails the save, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. Whether it succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and constriction [behavior] | ink cloud and deep-sea ambush [behavior] | crushing beak and swallowing maw [body]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Brine Eruption (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Kraken's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Abyssal Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Brine Eruption (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Meshrin
Large humanoid, lawful neutral
Armor Class

19 (natural armor)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft., swim 30 ft.

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

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Hold Breath. Meshrin can hold its breath for 15 minutes.
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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: key "fighting styles" (class verb)
[concept] signature elements: holds the line with greatsword and tail [behavior] | razor claws and vicious bite [body] | trained in fighting styles [object]
[reskin] signature idea (action): "Meshrin goes into a flurry of brutal close-quarters savagery, raking with its claws and finishing by sinking its teeth into the same foe. The target is left bleeding and unsteady, easy prey for the rest of the legion. Against a foe already knocked to the ground, the onslaught is far worse." [rider/on_hit/damage] — menu: charge-push, hook-rider (+ shelf: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin goes into a flurry of brutal close-quarters savagery, raking with its claws and finishing by sinking its teeth into the same foe. The target is left bleeding and unsteady, easy prey for the rest of the legion. Against a foe already knocked to the ground, the onslaught is far worse." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Any creature Meshrin has clawed or bitten cannot slip away unnoticed; Meshrin keeps it marked as its quarry, matching the target's pace and turning its full attention on it. The quarry cannot hide from Meshrin while the marks remain." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Vaultsworn Bulwark — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaultsworn Bulwark | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Shockwave 42; dmg 84

```
Vaultsworn Bulwark

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

Senses darkvision 120 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Scalding Vent. A creature that touches Bulwark or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. Bulwark can't shape-shift.

Magic Resistance. Bulwark has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Bulwark makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 15-foot Emanation originating from Bulwark. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("huge iron golem") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: iron bull charge and gore [behavior] | ground-shaking stomp [behavior] | scalding steam breath [body]
[reskin] signature idea (action): "The bull lowers its head and thunders in a straight line through everything in its path, goring and trampling all in its way. Any creature it passes through is battered and scorched by the searing heat of its iron hide. The charge ends when it slams into a solid barrier or the line is spent, leaving a wake of superheated air." [action/always/damage] — menu: leap, condition-payoff, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Scalding steam constantly vents from the bull's nostrils and joints. Any creature that strikes it in melee is burned by the superheated vapor, and the air around it is painfully hot to breathe." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Vent" ("A creature that hits the bulwark with a melee attack is burned by the superheate [verb: scald:concept, iron:concept, burn:idea, hot:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Reeling Cinder Cloud 22; dmg 43

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

Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Reeling Cinder Cloud (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] skirmisher-winged type=Fey mechanics=breath, aura — caster-binder: a caster line needs a magic word in the words — none here | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | skirmisher-winged: ✓ ("She keeps three crows that warn her of i") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] signature elements: turning into choking ash-cloud [behavior] | rot-black nails [body] | three crow familiars [object]
[reskin] print canon route: the Green Hag's body outranks the winged seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash dissolves into a reeling cloud of burning ash and drives it down the throats of everyone pressed close to her. Those caught in the cloud breathe her in and begin to rot from the inside, and the rot lingers in them so that each fresh wound she opens in them afterwards seeps and will not close. Only living creatures that need to breathe are touched by it, and she can only hold the as" [action/always/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] value check: "Reeling Cinder Cloud (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Reeling Cinder Cloud (Recharge 5-6)" ("Grandmother Ash dissolves into a cloud of burning ash and drives it into the mou [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "The black rot under her nails does not wash off. Anything her nails open keeps seeping and festering, and healing magic poured into those wounds has to fight the rot before it can close them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk, noxious-aura (ash, rot)
[reskin] signature miss: trait — "The black rot under her nails does not wash off. Anything her nails open keeps seeping and festering, and healing magic poured into those wounds has to fight the rot before it can close them." [trait/always/damage] — the model found no template that holds it (offered: terrain-walk, noxious-aura)
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon alignment: Chaotic Neutral -> Neutral Evil — the Green Hag's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ash Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---

## Thurivald — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Freezing Bite); nova Glacier Breath 76; dmg 204

```
Thurivald

Gargantuan Dragon, Neutral

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Burrow 30 ft., Swim 40 ft.

MOD
SAVE
STR
26
+8
+8
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+7
WIS
16
+3
+9
MOD
SAVE
CON
26
+8
+8
CHA
24
+7
+7

Skills Perception +9, Stealth +7

Immunities Cold

Senses blindsight 60 ft., darkvision 120 ft., tremorsense 60 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost Thurivald extra movement, and Thurivald can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If Thurivald fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Thurivald makes three Bite attacks. It can replace one attack with a use of (A) Glacial Maw or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Glacier Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. Thurivald casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Darkness, Fear
- 1/Day Each: Scrying

Glacial Maw. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that Thurivald hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Thurivald, and takes 22 (5d8) Acid damage at the start of each of Thurivald's turns. If Thurivald takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of Thurivald and has the Prone condition. If Thurivald dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Thurivald can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Freezing Bite. Thurivald makes one Bite attack.

Ice Surge. Thurivald moves up to half its Speed without provoking Opportunity Attacks.

Endless Winter. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing entire ships [behavior] | freezing the sea solid [behavior] | glacial hide [body]
[reskin] signature idea (action): "Thurivald surges up through the ice beneath a vessel and takes the whole ship into its gullet in one motion, hauling it down into the freezing dark. The vessel and everyone aboard vanish: the swallowed ship is held inside the wyrm's glacial gut, its crew going still and silent in the cold, with only a faint frozen shape pressed against the dragon's hide to show they ever existed. Until the wyrm is" [action/always/movement] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] value check: "Glacial Maw" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Glacial Maw" ("the wyrm surges up and takes the whole ship into its gullet in one motion, hauli [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "Anything Thurivald … is sealed in a tomb of primordial ice inside it, preserved but held fast. The wyrm can hold a limited number of such prizes within it at once, and each one drags at its guts, slowing and weighing it down until it retreats to the depths to settle them. Its cold carapace grows over each captured vessel, thickening with every ship it takes." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Glacier Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Sorrowbile the Rotwife — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sorrowbile the Rotwife | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Sorrowbile the Rotwife

Medium Undead, Neutral

AC 16
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

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
+5
MOD
SAVE
CON
16
+3
+3
CHA
20
+5
+8

Skills Perception +5, Deception +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common and Undercommon

CR 8 (XP 3,900; PB +3)

Traits

Rotting Body. A creature that touches Sorrowbile or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Necrotic damage.

Actions

Multiattack. Sorrowbile makes three attacks, using Claw or Grave-Rot Ray in any combination. It can replace one attack with a use of (A) Withering Rot or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Necrotic damage.

Grave-Rot Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Withering Rot. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Sorrowbile casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Rotwife's Embrace. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the target can't regain Hit Points until the end of Sorrowbile's next turn. Success: Half damage only.

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
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: curse the firstborn of every house [behavior] | grave-rot aura that weakens the living [aura] | staff of knotted umbilicus [object]
[reskin] signature idea (action): "Sorrowbile points a finger at a foe and declares it firstborn. That creature is plagued with a rot that makes it share Sorrowbile's suffering: whenever Sorrowbile takes damage, the hexed creature feels the same injury, and if it dies while hexed it immediately rises as a plague-ridden revenant under Sorrowbile's control. Only one creature can bear the hex at a time, and Sorrowbile can pass the cur" [action/always/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Sorrowbile points a finger at a foe and declares it firstborn. That creature is plagued with a rot that makes it share Sorrowbile's suffering: whenever Sorrowbile takes damage, the hexed creature feels the same injury, and if it dies while hexed it immediately rises as a plague-ridden revenant under Sorrowbile's control. Only one creature can bear the hex at a time, and Sorrowbile can pass the cur" [action/always/condition] — the model found no template that holds it (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand)
[reskin] value check: "Sealing Touch" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 9 → 18
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A boneyard aura of grave-rot clings to Sorrowbile, sapping the vitality of the living who draw near. Any living creature that starts its turn close to her finds its flesh weakening, and if it is already plagued by her rot, the decay spreads faster, making it harder for the creature to act." [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (plague)
[reskin] signature miss: trait — "A boneyard aura of grave-rot clings to Sorrowbile, sapping the vitality of the living who draw near. Any living creature that starts its turn close to her finds its flesh weakening, and if it is already plagued by her rot, the decay spreads faster, making it harder for the creature to act." [trait/start_of_turn/condition] — the model found no template that holds it (offered: heated-body)
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: plague:concept]")
```


---

## Thunder-Stamp Herdmaster — in the run

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thunder-Stamp Herdmaster | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × War-Whip); nova none; dmg 93

```
Thunder-Stamp Herdmaster

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 212 (25d8 + 100)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
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
13
+1
+1
MOD
SAVE
CON
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the herdmaster, the herdmaster and its allies have Advantage on attack rolls and saving throws, provided the herdmaster doesn't have the Incapacitated condition.

Actions

Multiattack. The herdmaster makes three attacks, using War-Whip or Thunder-Elk in any combination.

War-Whip. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Thunder damage.

Thunder-Elk. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 30/120 ft. 29 (7d6 + 5) Thunder damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the herdmaster gains 14 (4d6) Temporary Hit Points.

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
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("commands a stampede") | defender-leader: key "commands" (class verb)
[concept] signature elements: a stampede of thunder-elk he commands [behavior] | iron herding-whip that cracks with thunder [object] | an aura of authority that steadies the herd [aura]
[reskin] signature idea (action): "The herdmaster cracks his whip and the herd answers — a line of thunder-elk materializes and stampedes in a straight line away from him, trampling everything in its path and leaving the ground shaking with thunder. The elk remain briefly as a phantom herd that he can drive forward again on later turns, but each time they stampede they thin out and eventually dissipate. He can only call a new stamp" [action/always/movement] — menu: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] signature bound by force: action — "herd" matches command+stampede in the user's words; the model's none is overruled
[reskin] value check: "Driving Bellow (2/Day)" EV 11.7 vs floor 76.1 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the herdmaster's whip cracks, the thunderclap empowers his herd — any thunder-elk currently stampeding that hears the crack surges forward with renewed vigor, moving farther and hitting harder until the end of his next turn. The crack also marks his prey: the elk instinctively veer toward the last creature he struck with his whip, focusing their trampling on that foe." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever the herdmaster's whip cracks, the thunderclap empowers his herd — any thunder-elk currently stampeding that hears the crack surges forward with renewed vigor, moving farther and hitting harder until the end of his next turn. The crack also marks his prey: the elk instinctively veer toward the last creature he struck with his whip, focusing their trampling on that foe." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
```


---

## Goblin Warrior — in the run

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

```
Goblin Warrior

Small Fey, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 31 (9d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+4
WIS
8
-1
-1
MOD
SAVE
CON
10
+0
+0
CHA
8
-1
-1

Skills Perception +1, Stealth +4

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Actions

Multiattack. The goblin warrior makes two attacks, using Scimitar or Shortbow in any combination.

Scimitar. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage plus 2 (1d4) Slashing damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Nimble Escape. The goblin takes the Disengage or Hide action.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack skirmishing and hit-and-run [behavior] | rusty scavenged blade [object] | cowardly retreat when bloodied [behavior]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon alignment: Neutral -> Chaotic Neutral — the Goblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---

## Sir Reginald Pemberton-Hughes — in the run

**Concept:** name: Sir Reginald Pemberton-Hughes | a knight who is deathly afraid of chickens and will flee from any bird

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Reginald Pemberton-Hughes | 5 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Greatsword); nova none; dmg 40

```
Sir Reginald Pemberton-Hughes
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

14 (+2)

	

11 (+0)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +5

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common plus one other language

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Phobia. While Sir Reginald can see the thing it fears within 30 feet of itself, it has disadvantage on attack rolls and ability checks, and it must use its movement on each of its turns to move away from the thing it fears by the safest available route unless there is nowhere farther to go.

Actions
Multiattack: Sir Reginald makes two attacks: one with Greatsword and one with Heavy Crossbow.
Greatsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage plus 4 (1d8) radiant damage.
Heavy Crossbow: Ranged Weapon Attack: +6 to hit, range 100/400 ft., one target. Hit: 16 (3d8 + 3) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who is deathly afraid of chicke") | defender: key "knight" (class verb)
[concept] signature elements: phobic flight from birds [behavior] | shield-and-plate bulwark [object] | terror of chickens [aura]
[reskin] print canon array: STR 16, DEX 11, CON 14, INT 11, WIS 11, CHA 15 — the Knight's, STR fitted to +6
[reskin] print canon: "Sir Reginald Pemberton-Hughes — a knight who is deathly afraid of chickens and will flee from any bird" heads on the Knight — print's rows ride along; the seat stays
[reskin] signature idea (action): "The moment any bird comes into Sir Reginald's sight, his discipline shatters: he shrieks, drops whatever he is holding, and sprints full-tilt away from the feathered thing, his shield forgotten on the ground. He will not stop, fight, or even look back until the bird is gone entirely from his view and he has put a great deal of ground between himself and it — only then does he creep back, shame-fac" [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature miss: action — "The moment any bird comes into Sir Reginald's sight, his discipline shatters: he shrieks, drops whatever he is holding, and sprints full-tilt away from the feathered thing, his shield forgotten on the ground. He will not stop, fight, or even look back until the bird is gone entirely from his view and he has put a great deal of ground between himself and it — only then does he creep back, shame-fac" [reaction/on_being_hit/movement] — the model found no template that holds it (offered: snap-shot, riposte, terror-pulse, rally)
[reskin] value check: "Dazzling Burst" EV 2.3 vs floor 8.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When Sir Reginald plants his shield and holds his ground, his defense becomes nigh-impossible to break: anyone striking him suffers a jarring, punishing rebound that rattles them hard enough to leave them staggered and open. He becomes a stone in the road that hurts you to kick." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — phobia (afraid of, afraid, flee from)
[reskin] signature bound by force: trait — "phobia" matches afraid of+afraid+flee from in the user's words; the model's none is overruled
[reskin] signature template (trait): phobia -> Traits/"Phobia" ("exact concept match [verb: afraid of:concept, afraid:concept, flee from:concept]")
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Knight's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Knight's
[reskin] print canon attack: "Broadsword" -> "Greatsword" — the Knight's own row
[reskin] print canon attack: "Shield Bash" -> "Heavy Crossbow" — the Knight's own ranged row
[reskin] print canon defenses: immunities none -> Frightened — the Knight's own header lines
```


---

## Knife Ball — in the run

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 2 → 1.0625; sustained 19 (1 × Blade); nova none; dmg 19

```
Knife Ball
Small construct, unaligned
Armor Class

10

Hit Points: 

44 (8d6 + 16)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

12 (+1)

	

15 (+2)

	

5 (-3)

	

13 (+1)

	

8 (-1)

Skills: 

Stealth +5

Saving Throws: 

STR +3

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

blindsight 10 ft., darkvision 60 ft., passive Perception 11

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Adhesive Hide. The knife ball adheres to anything that touches it. A Huge or smaller creature adhered to the knife ball is grappled (escape DC 11).
False Form. As a bonus action, the knife ball shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

Actions
Blade: Melee Weapon Attack: +3 to hit (with advantage if the target is grappled by the knife ball), reach 5 ft., one target. Hit: 19 (4d8 + 1) slashing damage.
Adhesive Yank: One creature within 30 feet of the knife ball that is grappled by it must make a DC 12 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] lurker-trap type=Construct mechanics=none — swarm: a swarm is a mass of many — no mass in the words | lurker-trap: ✓ ("knife ball") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: erupts from a harmless-looking ball into a whirling sphere of blades [behavior] | shell of spring-loaded iron knives [body] | disguised as a stray iron ball before striking [aura]
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball erupts into a thirty-foot shell of spring-loaded iron blades. Every creature in that massive sphere is slashed and then knocked away from the ball, staggering back. After erupting, the blades stay extended, so the knife ball moves slowly until it retracts them at the start of its next turn." [action/always/damage] — menu: swallow, condition-payoff, seal, lure, hook-drag, active-toll, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "The knife ball erupts into a thirty-foot shell of spring-loaded iron blades. Every creature in that massive sphere is slashed and then knocked away from the ball, staggering back. After erupting, the blades stay extended, so the knife ball moves slowly until it retracts them at the start of its next turn." [action/always/damage] — the model found no template that holds it (offered: swallow, condition-payoff, seal, lure, hook-drag, active-toll, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, shell-withdraw, pounce)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 8.8 (one attack of 1) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any creature that hits the knife ball with a melee attack is raked by its whirling blades, taking slashing damage as the shell bites back. The knife ball can only bring its shell to bear this way once each round, so it doesn't punish every single blow." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature miss: trait — "Any creature that hits the knife ball with a melee attack is raked by its whirling blades, taking slashing damage as the shell bites back. The knife ball can only bring its shell to bear this way once each round, so it doesn't punish every single blow." [trait/on_being_hit/damage] — the model found no template that holds it (offered: assassinate)
```


---

## Snapping Turtle Elder — in the run

**Concept:** a giant snapping turtle with AC 22 that bites for 50 damage

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Snapping Turtle Elder | 9 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 98 (2 × Bite); nova none; dmg 98

```
Snapping Turtle Elder

Huge Beast, Unaligned

AC 22
Initiative -1 (9)

HP 161 (17d12 + 51)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+8
INT
8
-1
-1
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
8
-1
-1

Skills Athletics +8, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The turtle elder makes two Bite attacks.

Bite. Melee Attack Roll: +8, reach 10 ft. 49 (10d8 + 4) Piercing damage.

Bonus Actions

Shell Defense. The turtle elder withdraws into its shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] brute type=Beast mechanics=grapple — brute-grappler: ✓ ("giant snapping turtle") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: the crushing bite [behavior] | armor-plated shell and neck [body] | lurking in murky shallows [behavior]
[reskin] signature idea (action): "The elder lunges with its full neck, seizing a victim in a crushing, locking bite. Until the turtle chooses to let go or is forced apart, the victim stays clamped in its jaws, and at the start of each of its turns the turtle automatically grinds down, dealing damage to the caught creature and its shell scraping away at anything the victim is carrying or wearing. The turtle cannot bite anyone else " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, thrown-burst, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — shell-withdraw (turtle)
[reskin] signature bound by force: action — "shell-withdraw" matches turtle in the user's words; the model's none is overruled
[reskin] value check: "Shell Defense" EV 9.6 vs floor 5.2 (a bonus action (free)) — worth the trade
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("exact concept match [verb: turtle:concept, shell:idea]")
[reskin] signature idea (trait): "Its neck and limbs are plated in ancient shell, letting it pull into an armored knot that turns aside most blows. When it does, the shell also traps momentum, so any attacker who strikes it in melee gets a punishing scrape from the shell's serrated lip." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "Its neck and limbs are plated in ancient shell, letting it pull into an armored knot that turns aside most blows. When it does, the shell also traps momentum, so any attacker who strikes it in melee gets a punishing scrape from the shell's serrated lip." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
```
