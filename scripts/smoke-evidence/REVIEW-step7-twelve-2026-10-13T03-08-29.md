# Review batch — step7-twelve-2026-10-13T03-08-29

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 7/7 | 7/7 |
| Ferrum Taurus | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 4/7 |
| Grandmother Ash | 7 (2014) | 2014 | lurker-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Siltmaw | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Verrin-Kaul | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/9 |
| Kestrelhorn the Stormfather | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Marrowcradle Vessa | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Trench Ball | 2 (2014) | 2014 | brute-5-juggernaut | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Gorrukh | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 2 of 32 user clauses** (coverage 94%); concept share 64% (41/64 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Siltmaw — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Siltmaw | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Siltmaw

Medium Monstrosity, Unaligned

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

Senses darkvision 30 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Sure Footing. Difficult Terrain composed of mud doesn't cost the siltmaw extra movement, and the siltmaw can move across mud without needing to make an ability check.

Actions

Multiattack. The siltmaw makes two Bite attacks. It can replace one attack with a use of Hooked Lash.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Hooked Lash. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the siltmaw by its grip and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The siltmaw whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the siltmaw, and takes 3 (1d6) Bludgeoning damage at the start of each of the siltmaw's turns. The siltmaw can have only one creature whelmed at a time. If the siltmaw takes 5 damage or more in a single turn from the whelmed creature, the siltmaw must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the siltmaw. If the siltmaw dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: erupts from mud to drag prey under [behavior] | mud-caked bog hound body [body]
[reskin] claim gate: CR 1 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea call failed — HTTP 500: ; the library stands in
[reskin] value check: "Hooked Lash" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: hook-drag -> Actions/"Hooked Lash" (no template held the idea; a proven shape stands in)
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

understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious. The kraken can breathe air and water.
Siege Monster. The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (it can have up to four creatures swallowed at a time), taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. Whether it succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: quote not found in the input ("tentacles, a maw or cage that swallows, ") | brute-charger: quote not found in the input ("runs prey down — a straight rush that hi") | dragon: quote not found in the input ("breath weapon, flight, frightful presenc") | brute-grappler: taken on rank — its quote was not found, no hard veto | brute-grappler: key "kraken" (class body) | extra grapple: quote not found | extra breath: quote not found
[concept] signature elements: tentacle grapple and constriction [behavior] | engulfing maw that swallows ships and sailors [behavior] | pressurized scalding brine [body]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Brine Spray (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon attack: "Tentacles" -> "Tentacle" — the Kraken's own row
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Brine Spray (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
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
Large humanoid, neutral
Armor Class

19 (splint, shield)

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

Common

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
[concept] signature elements: greatsword held in trained fighting stance [object] | long tail swipe that sweeps the legs [body] | vicious bite and razor claws in close quarters [body]
[reskin] signature idea (action): "Meshrin settles into a low, bladed fighting stance that locks its greatsword forward like a spearpoint, daring anyone to test the gap. Until its next turn, the first creature that moves into reach or tries to slip past it Provokes a lightning-fast, disciplined counter cut that leaves them off-balance and makes their next attack clumsy. The stance demands stillness: if Meshrin moves more than a sin" [action/always/condition] — menu: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin settles into a low, bladed fighting stance that locks its greatsword forward like a spearpoint, daring anyone to test the gap. Until its next turn, the first creature that moves into reach or tries to slip past it Provokes a lightning-fast, disciplined counter cut that leaves them off-balance and makes their next attack clumsy. The stance demands stillness: if Meshrin moves more than a sin" [action/always/condition] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin has been drilled to punish any sign of weakness. When a creature within reach is distracted—staggered, prone, or reeling from a failed attempt against it—Meshrin's claws or bite lash out with knowing precision." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Meshrin has been drilled to punish any sign of weakness. When a creature within reach is distracted—staggered, prone, or reeling from a failed attempt against it—Meshrin's claws or bite lash out with knowing precision." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Ferrum Taurus — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Ferrum Taurus | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15 (print at 12 reads 8–14, n=15)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 14 → 15; sustained 84 (2 × Gore); nova Iron Shockwave Stomp 42; dmg 84

```
Ferrum Taurus

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

Scalding Nostrils. A creature that touches the ferrum taurus or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The ferrum taurus can't shape-shift.

Magic Resistance. The ferrum taurus has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The ferrum taurus makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Iron Shockwave Stomp (Recharge 5-6). Strength Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the ferrum taurus. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[concept] signature elements: charging gore and trample [behavior] | stomping hooves that shake the ground [behavior] | scalding steam breath [body]
[reskin] signature idea (action): "The iron bull paws the ground and then slams both forehooves down, sending a shockwave rippling outward. Every creature on the ground within a short distance is knocked off its feet and left sprawling." [action/always/condition] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] value check: "Iron Shockwave Stomp (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Iron Shockwave Stomp (Recharge 5-6)" ("slams both forehooves down, sending a shockwave rippling outward; every creature [verb: stomp:concept, stomps:concept, shockwave:idea]")
[reskin] signature idea (trait): "Scalding steam constantly curls from the bull's nostrils; any creature that strikes it in melee is seared by the billowing cloud. The heat also punishes those foolish enough to grapple or cling to its iron hide." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Nostrils" ("any creature that strikes it in melee is seared by the billowing cloud — touchin [verb: scald:concept, iron:concept, heat:idea, sear:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | lurker-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

```
Grandmother Ash
Medium fey, neutral evil
Armor Class

14 (natural armor)

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

Perception +5, Stealth +9

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

Heated Body. A creature that touches the grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) necrotic damage.
Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Noxious Spew (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] lurker-phantom type=Fey mechanics=breath — lurker-phantom: ✓ ("She can turn into a cloud of ash") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: ash-cloud engulf that chokes and blinds [behavior] | rot-blackened claws carrying decay [body] | three crow sentinels [object]
[reskin] print canon route: the Green Hag's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash collapses into a blinding, choking cloud of ash and cinder that billows outward to engulf a group of intruders. Those caught inside are left blinded by the stinging soot and wracked with wracking coughs that leave them gasping and unable to draw a steady breath. The cloud leaves them exposed and weakened until they can stagger free and clear the ash from their lungs." [action/save/condition] — menu: swallow, leap, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: gaze-single, delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] signature bound to the concept's verb: action — spew, blighted-ground (cloud of, breathes, rot, ash)
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("The idea's central verb is a cloud of ash and cinder that billows outward to eng [verb: cloud of:concept, breathes:concept, choking cloud:idea]")
[reskin] signature idea (trait): "Rot festers in the wounds left by the grandmother's blackened nails. Anyone clawed by her finds the injury refuses to close—flesh blackens, spreads, and continues to decay each round, slowly sapping their vitality until the rot is purged or they receive proper healing. The crows caw eagerly when they smell the sickness taking hold." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature bound by force: trait — "heated-body" matches burn+fire in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: burn:concept, fire:concept]")
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---

## Verrin-Kaul — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Verrin-Kaul | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 21.5 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 24, 4 over; the HP axis pulls the read to 21.5
- read: def 19 / off 24 → 21.5; sustained 192 (3 × Bite + legendary Fang Snap); nova Freezing Breath 76; dmg 192

```
Verrin-Kaul
Gargantuan Dragon, Neutral
AC 21
HP 333 (18d20 + 144)
Speed 40 ft., Fly 80 ft., Burrow 30 ft., Swim 40 ft.
STR 26 DEX 12 CON 26 INT 18 WIS 16 CHA 24
Skills Perception +9, Stealth +7
Immunities Cold
Senses darkvision 120 ft., blindsight 60 ft.; Passive Perception 19
Languages Common, Draconic
CR 20

Traits
Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the verrin-kaul extra movement, and the verrin-kaul can move across ice or snow without needing to make an ability check.
Legendary Resistance (4/Day). If the verrin-kaul fails a saving throw, it can choose to succeed instead.

Actions
Multiattack. The verrin-kaul makes three Bite attacks. It can replace one attack with a use of (A) Swallow or (B) Spellcasting to cast *Fear*.
Bite. *Melee Attack Roll:* +14, reach 15 ft. 32 (7d6 + 8) Cold damage.
Freezing Breath (Recharge 5-6). *Constitution Saving Throw*: DC 21, each creature in a 90-foot Cone. *Failure:* 76 (17d8) Cold damage. *Success:* Half damage.
Spellcasting. The verrin-kaul casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- **At Will:** *Detect Magic*, *Command*, *Fear*, *Suggestion*
Swallow. *Dexterity Saving Throw*: DC 21, one Large or smaller creature within 10 feet that the verrin-kaul hit with a melee attack this turn. *Failure:* 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the verrin-kaul, and takes 22 (5d8) Acid damage at the start of each of the verrin-kaul's turns. If the verrin-kaul takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the verrin-kaul and has the Prone condition. If the verrin-kaul dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions
Legendary Action Uses: 3. Immediately after another creature's turn, the verrin-kaul can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
Fang Snap. The verrin-kaul makes one Bite attack.
Coil Slide. The verrin-kaul moves up to half its Speed without provoking Opportunity Attacks.
Ice Tomb. *Wisdom Saving Throw*: DC 21, one creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing ships whole [behavior] | body of living glacial ice [body] | freezing the sea into a killing floor [aura]
[reskin] signature idea (action): "The glacier wyrm smashes its tail down and sends a cracking shockwave through the ice and water, freezing every loose scrap of wreckage, raft, or flotsam in a wide ring around it into a single locked sheet. Anyone standing on that debris is pinned in place and dragged along as the whole frozen mass shifts and tilts with the wyrm's movements, leaving them stranded and helpless out on the open floe." [action/always/movement] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The wyrm's body is living glacial ice, and any weapon or limb that strikes it is gripped by a sudden shell of frost that hardens around the point of contact, rooting the attacker to the spot and locking them within reach of its jaws." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Freezing Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Marrowcradle Vessa — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Marrowcradle Vessa | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Withering Grasp); nova none; dmg 54

```
Marrowcradle Vessa

Medium Humanoid, Neutral Evil

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

Languages Common, Infernal

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. Marrowcradle makes three attacks, using Withering Grasp or Rot Bolt in any combination. It can replace one attack with a use of (A) Festering Curse or (B) Spellcasting to cast Ray of Sickness.

Withering Grasp. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Necrotic damage.

Rot Bolt. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Piercing damage.

Festering Curse. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Poison damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Marrowcradle casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Debt of Ruin. Charisma Saving Throw: DC 16, one creature within 60 feet. Failure: The target is cursed until the end of Marrowcradle's next turn. The first time the cursed target deals damage to any creature before then, it takes 18 (4d8) Piercing damage. Success: Half damage only.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: Bloodline curse on firstborn [behavior] | Plague-seer's woven blood-sigil [object] | Wasting hex that steals actions [behavior]
[reskin] signature idea (action): "Vessa pricks her own finger and flicks a drop of her blood at every foe she can see, marking each one with a woven plague-sigil. Any marked creature that dares to take a reaction or make an opportunity attack immediately feels the hex tear through it, wasting away and losing that action entirely." [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Plague Sigil" EV 2.5 vs floor 9.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Plague Sigil" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Debt of Ruin" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The first time each round that Vessa sees a creature suffer from a plague or curse she has laid upon it, she can twist the affliction to momentarily blind or disorient another enemy within her sight, marking that creature as the next to be claimed by her bloodline doom." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
[reskin] signature miss: trait — "The first time each round that Vessa sees a creature suffer from a plague or curse she has laid upon it, she can twist the affliction to momentarily blind or disorient another enemy within her sight, marking that creature as the next to be claimed by her bloodline doom." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst, bloodied-burst)
```
