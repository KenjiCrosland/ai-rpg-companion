# Review batch — step7-twelve-2026-10-13T06-24-11

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Vault Tender | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 4/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 5/5 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Frostmaw Leviathan | 20 | 2024 | brute-17-grappler | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 1/8 |
| Thunderkin Warden | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Goblin Warrior | 1 | 2024 | defender-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Firstborn Debt | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Sunder Roller | 2 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/2 |
| Blackwater Snapper | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 4 of 32 user clauses** (coverage 88%); concept share 66% (39/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Bog Hound — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Bog Hound

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

Sure Footing. Difficult Terrain composed of mud doesn't cost the bog hound extra movement, and the bog hound can move across mud without needing to make an ability check.

Actions

Multiattack. The bog hound makes two Bite attacks.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the bog hound.

Bonus Actions

Whelm. The bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the bog hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[concept] signature elements: drags prey under water [behavior] | mud-caked hide [body]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The bog hound's powerful jaws and rolling body let it drag a creature it has bitten straight down into the soft muck, pulling the victim beneath the surface. The dragged creature is yanked into the bog hound's space and must fight to keep its head above the mud, while the hound thrashes to keep it under. This only works on a creature the hound has just bitten, and the dragging ends if the hound is" [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-rider, hook-drag (drag, drags, under)
[reskin] signature rider: hook-rider -> Bite (appended; the hound drags a creature it has just bitten, pulling it into its space; the dr [verb: drag:concept, drags:concept, yank:idea])
[reskin] signature idea (trait): "The bog hound's hide is caked in thick, wet mud that clings to weapons and hands. When a creature strikes the hound in melee, some of that mud splatters into the attacker's face, briefly blinding and distracting them. The mud also makes the hound hard to grab or hold onto, as it slips and squirms free." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept]")
```


---

## Kraken — highest CR

**Concept:** a kraken

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 12 → 17; sustained 48 (2 × Tentacle); nova none; dmg 48

```
Kraken
Gargantuan monstrosity, neutral
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
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (it can have up to four creatures swallowed at a time), taking 23 (3d8 + 10) piercing damage on a failed save. If the target is Large or smaller, it is swallowed and no longer grappled on a failed save. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken and is knocked prone. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. On a failed or successful save, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacles that crush and drag [body] | venomous ink cloud [behavior] | storm-summoning at sea [aura]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Ink Torrent (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Ink Torrent (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword discipline and punishing counters [object] | lashing tail sweeps that shove and trip [behavior] | hide and claws built to hold the line [body]
[reskin] signature idea (action): "Meshrin reads the reach of every foe that dares close in: when an enemy steps inside its guard, it rakes that foolish creature with its claws once and ends the exchange with a brutal bite, punishing the mistake as only a drilled line-holder would. This decisive counter can be used only a limited number of times each fight, forcing Meshrin to pick the moment it truly means to hold the choke point." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin reads the reach of every foe that dares close in: when an enemy steps inside its guard, it rakes that foolish creature with its claws once and ends the exchange with a brutal bite, punishing the mistake as only a drilled line-holder would. This decisive counter can be used only a limited number of times each fight, forcing Meshrin to pick the moment it truly means to hold the choke point." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin's training is a cold, patient rhythm: each consecutive blow it lands against the same enemy sharpens its next strike, and the discipline collapses the moment it swings at someone else. The longer it keeps its focus locked on one target, the harder its next greatsword thrust or tail sweep becomes to withstand." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Meshrin's training is a cold, patient rhythm: each consecutive blow it lands against the same enemy sharpens its next strike, and the discipline collapses the moment it swings at someone else. The longer it keeps its focus locked on one target, the harder its next greatsword thrust or tail sweep becomes to withstand." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Vault Tender — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vault Tender | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Scorching Charge 42; dmg 84

```
Vault Tender

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Scalding Iron Hide. A creature that touches the vault tender or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The vault tender can't shape-shift.

Magic Resistance. The vault tender has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The vault tender makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Scorching Charge (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the vault tender. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("A huge iron golem shaped like a bull") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: charging gore [behavior] | steam breath [behavior] | iron body [body]
[reskin] signature idea (action): "The iron bull lowers its head and charges in a straight line, steam shrieking from its nostrils. Creatures in its path are scorched by the scalding steam and feel the ground tremble as it nears. This can only be done after it has moved some distance toward its target." [action/always/movement] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] value check: "Scorching Charge (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Scorching Charge (Recharge 5-6)" ("scorched by the scalding steam and feel the ground tremble as it nears, creature [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "The iron bull's body radiates foundry heat. Anyone who strikes it in melee is burned by the searing metal and scalding steam that vents from its seams." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Iron Hide" ("Anyone who strikes the iron bull in melee is burned by its searing metal and sca [verb: scald:concept, iron:concept, heat:idea, burn:idea, sear:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Hates Fire
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

```
Grandmother Ash
Medium fey, neutral
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

Hates Fire. When the grandmother takes fire damage, She has Disadvantage on attack rolls and ability checks until the end of her next turn.
Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Noxious Spew (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=aura — caster-binder: ✓ ("Her nails are long and black and carry r") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: turning into a choking cloud of ash [body] | long black nails that carry rot [body] | three crows that warn her of intruders [behavior]
[reskin] print canon route: the Green Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Green Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash exhales a billowing gout of her own ash at one creature she can see, and the ash clings and crawls into the lungs, hooking there like soot in a chimney. Until that victim wrenches free of it, every breath it takes is ash, and whatever it tries to do next is spent coughing and heaving instead of acting. She can only seed this in one pair of lungs at a time; the moment she breathes i" [action/save/condition] — menu: swallow, trample, leap, thrown-burst, gaze-single, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] signature bound by force: action — "spew" matches cloud of+breathes in the user's words; the model's none is overruled
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("exact concept match [verb: cloud of:concept, breathes:concept, exhales:idea]")
[reskin] signature idea (trait): "Grandmother Ash's body is not flesh but settled ash, and whenever a foe strikes her it bursts apart into her choking cloud, letting her dissolve a short distance and reform while her attacker's mouth and eyes fill with grit. She can only do this so often before the wind and the clinging embers scatter her too thin, so a foe who keeps pressing her can still bring her down." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk, noxious-aura (ash, rot)
[reskin] signature miss: trait — "Grandmother Ash's body is not flesh but settled ash, and whenever a foe strikes her it bursts apart into her choking cloud, letting her dissolve a short distance and reform while her attacker's mouth and eyes fill with grit. She can only do this so often before the wind and the clinging embers scatter her too thin, so a foe who keeps pressing her can still bring her down." [trait/on_being_hit/movement] — the model found no template that holds it (offered: terrain-walk, noxious-aura)
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Soot Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---

## Thunderkin Warden — a homebrew with a nova

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Thunderkin Warden | 13 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 16 → 13; sustained 93 (3 × Staff); nova Bludgeoning-Elk Stampede 42; dmg 93

```
Thunderkin Warden

Medium Humanoid, Chaotic Neutral

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

Aura of Authority. While in a 10-foot Emanation originating from the warden, the warden and its allies have Advantage on attack rolls and saving throws, provided the warden doesn't have the Incapacitated condition.

Actions

Multiattack. The warden makes three attacks, using Staff or Hoof Kick in any combination.

Staff. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage plus 13 (3d8) Thunder damage.

Hoof Kick. Melee Attack Roll: +10, reach 5 ft. 29 (7d6 + 5) Bludgeoning damage.

Bludgeoning-Elk Stampede (Recharge 5-6). Dexterity Saving Throw: DC 17, each creature in a 60-foot Cone. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the warden gains 14 (4d6) Temporary Hit Points.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: thunder-elk stampede [behavior] | storm-call command [behavior] | iron-shod herding staff [object]
[reskin] signature idea (action): "The warden raises its iron-shod staff and sounds a thunder-call, and the herd answers — a line of thunder-elk comes thundering across the field in a stampede, hooves cracking stone and lightning arcing between their antlers. The stampede runs through everything in its path, friend and foe alike, and the warden can bellow one command mid-charge to steer the herd's fury onto a chosen foe. Once the h" [action/once_per_fight/damage] — menu: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] value check: "Thunder Stampede (2/Day)" EV 11.7 vs floor 76.1 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Thunder Stampede (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden's staff is shod in iron taken from the storm-plains; whenever it strikes true, the ringing iron calls a peal of thunder that echoes into the herd's bones, and the elk it commands trample and shock harder for the space of a breath. The iron shodding also means the staff never breaks, however savagely the warden swings it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The warden's staff is shod in iron taken from the storm-plains; whenever it strikes true, the ringing iron calls a peal of thunder that echoes into the herd's bones, and the elk it commands trample and shock harder for the space of a breath. The iron shodding also means the staff never breaks, however savagely the warden swings it." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body, bloodied-burst)
[reskin] chassis nova: "Thunder-Elk Stampede (Recharge 5-6)" — the defender-8-leader's own nova row; geometry, cap and rider lines below are its edits
```


---

## Frostmaw Leviathan — a legendary

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Frostmaw Leviathan | 20 | brute-17-grappler | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22.5 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 26, 6 over; the HP axis pulls the read to 22.5
- read: def 19 / off 26 → 22.5; sustained 220 (2 × Jaws + legendary Surge Up); nova none; dmg 220

```
Frostmaw Leviathan

Gargantuan Monstrosity, Neutral

AC 19
Initiative -1 (9)

HP 346 (21d20 + 126)

Speed 40 ft., Burrow 30 ft., Swim 40 ft.

MOD
SAVE
STR
26
+8
+14
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
22
+6
+12
CHA
4
-3
-3

Skills Athletics +14, Perception +6

Vulnerabilities Fire

Resistances Cold

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 16

Languages Common

CR 20 (XP 25,000; PB +6)

Traits

Black Ice Passage. Difficult Terrain composed of ice doesn't cost the frostmaw leviathan extra movement, and the frostmaw leviathan can move across ice without needing to make an ability check.

Legendary Resistance (3/Day). If the frostmaw leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The frostmaw leviathan makes two Jaws attacks. It can replace one attack with a use of Glacial Tether.

Jaws. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage plus 18 (4d8) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22). While Grappled, the target has the Restrained condition.

Glacial Tether. Strength Saving Throw: DC 22, one creature within 30 feet that is Grappled by the frostmaw leviathan. Failure: 45 (13d6) Cold damage. Success: Half damage.

Bonus Actions

Swallow. The frostmaw leviathan swallows one Large or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the frostmaw leviathan, and takes 21 (6d6) Cold damage at the start of each of the frostmaw leviathan's turns. The frostmaw leviathan can have only one creature swallowed at a time. If the frostmaw leviathan takes 40 damage or more in a single turn from the swallowed creature, the frostmaw leviathan must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the frostmaw leviathan. If the frostmaw leviathan dies, a swallowed creature exits the body Prone by using 10 feet of movement.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the frostmaw leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Surge Up. The frostmaw leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Jaws attack.

Drag Under. The frostmaw leviathan moves up to half its Speed without provoking Opportunity Attacks, carrying each creature it is grappling along with it.

Ice Shatter. Strength Saving Throw: DC 22, each creature within 10 feet of the frostmaw leviathan. Failure: The target has the Prone condition.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallows ships whole [behavior] | freezes the sea [body] | ice-crusted body [body]
[reskin] signature idea (action): "The leviathan smashes a huge flipper or its tail onto the frozen surface, and the glacier itself shivers. A jagged spiderweb of pressure cracks races outward from the impact, reshaping the pack ice around it; the following turn, when the leviathan surges, it can erupt from any of those cracks instead of walking over the surface, dragging anything clinging nearby down into the freezing water with i" [action/always/movement] — menu: condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce)
[reskin] signature miss: action — "The leviathan smashes a huge flipper or its tail onto the frozen surface, and the glacier itself shivers. A jagged spiderweb of pressure cracks races outward from the impact, reshaping the pack ice around it; the following turn, when the leviathan surges, it can erupt from any of those cracks instead of walking over the surface, dragging anything clinging nearby down into the freezing water with i" [action/always/movement] — the model found no template that holds it (offered: condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, hook-rider)
[reskin] value check: "Opportunist's Lash" EV 34.9 vs floor 29.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sea around the leviathan thickens into black ice wherever it lingers, and creatures dragged beneath the surface by it find the frozen crust latching onto their limbs. Each time the leviathan moves, the water it passes through sets hard behind it, sealing the open channels any survivors had left." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature template (trait): terrain-walk -> Traits/"Black Ice Passage" ("the leviathan gliding through water is unhindered by the ice it creates behind i [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea, frozen:idea]")
```


---

## Firstborn Debt — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Firstborn Debt | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Bludgeoning Touch); nova none; dmg 54

```
Firstborn Debt

Medium Humanoid, Neutral

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

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The firstborn debt makes three attacks, using Bludgeoning Touch or Ray of Sickness in any combination. It can replace one attack with a use of (A) Grave-Ash Mark or (B) Spellcasting to cast Ray of Sickness.

Bludgeoning Touch. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.

Ray of Sickness. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Poison damage.

Grave-Ash Mark. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The firstborn debt casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness, Misty Step
- 1/Day Each: Bestow Curse, Cloudkill

Tally the Debt. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Bludgeoning damage, and the target can't regain Hit Points until the end of the firstborn debt's next turn. Success: Half damage only.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn") | caster-binder: key "curses" (class verb)
[concept] signature elements: bloodline curse on the firstborn [behavior] | seeping ash body [body] | blighted gaze that marks victims [aura]
[reskin] signature idea (action): "The plague-seer fixates on a living foe and lays a bloodline curse: a seeping ash brand marks the victim's firstborn. Until the curse is lifted, the victim gains no benefit from healing and takes creeping necrotic damage at the start of each of its turns." [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Firstborn Seep" EV 5.5 vs floor 9.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Firstborn Seep" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Sealing Touch" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 9 → 18
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the firstborn debt is struck in melee, grave-ash bursts from the wound and clings to the attacker, seeping into their lungs and leaving them unable to draw a clean breath until they spend their own effort to clear it." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```
