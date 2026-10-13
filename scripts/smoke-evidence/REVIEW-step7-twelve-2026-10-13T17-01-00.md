# Review batch — step7-twelve-2026-10-13T17-01-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 7/7 |
| Iron Bull Golem | 12 | 2024 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (2) | 6/7 | 5/5 |
| Oxbow Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Voraglace | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 7/9 |
| Thunderherd Kestrel | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Mosu the Plague-Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | ooze-1 | ok | ok | ok | ok | SOFT: type-immunities | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Snapping Turtle | 9 | 2024 | brute-9 | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |

**Dropped 1 of 32 user clauses** (coverage 97%); concept share 83% (52/63 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Oxbow Hound — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oxbow Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Oxbow Hound

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

Multiattack. The bog hound makes two Bite attacks. It can replace one attack with a use of Drowning Lunge.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Drowning Lunge. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the bog hound by forelimbs and has the Grappled condition (escape DC 12).

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
[concept] signature elements: drag under water to drown [behavior] | mud-caked hide [body]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Coiling against the bank or bottom, the hound lunges with a heave that wraps its forelimbs around prey it can see within a short reach. Whatever it grabs is dragged with it as it immediately moves straight down into the deepest nearby water, and if the prey is harmed by being pulled through the churn of roots and silt, they are left tangled and unable to call out. The hound cannot use this lunge a" [bonus_action/always/movement] — menu: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] value check: "Drowning Lunge" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Drowning Lunge" ("The hound lunges and wraps its forelimbs around prey it can see within a short r [verb: drag:concept, under:concept, pull:idea]")
[reskin] signature idea (trait): "The hound's hide is a living mat of dripping mud and pondweed. Whenever someone strikes it in melee or wrestles it, they come away blinded and plastered with stinging muck, giving the hound an opening to slither free or pull them closer." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature bound by force: trait — "terrain-walk" matches bog+mud in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept]")
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
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 23 Dexterity saving throw, taking 33 (6d10) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. On a failed or successful save, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: grappling arms that drag prey into a crushing beak [behavior] | a body of living, cold brine [body] | the ink-black deep it calls home [aura]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Black Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Kraken's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon name: "Drowned Court" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, and Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Black Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
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
| Meshrin | 8 (2014) | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Meshrin
Large humanoid, lawful neutral
Armor Class

14 (half plate)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

16 (+3)

	

6 (-2)

	

10 (+0)

	

6 (-2)

Skills: 

Athletics +7, Perception +3

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 13

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
Greatsword: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and the target is subjected to the following effect. The target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("Wields a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword technique [object] | tail sweep knockdown [behavior] | razor claws and vicious bite [body]
[reskin] signature idea (action): "When Meshrin has a greatsword and a foe it just knocked down, it plants a foot and drives the blade down in a precise executioner's stroke. This follow-up strike comes only after its greatsword has already hit the same target, and it hits so hard that a badly wounded foe is left gasping and slowed for a moment." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "When Meshrin has a greatsword and a foe it just knocked down, it plants a foot and drives the blade down in a precise executioner's stroke. This follow-up strike comes only after its greatsword has already hit the same target, and it hits so hard that a badly wounded foe is left gasping and slowed for a moment." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin's fighting style rewards relentless pressure: each time it lands a greatsword blow after already striking that same foe in the round, its follow-up cuts deeper and drives the enemy back a step, but this rhythm breaks if it is forced to move or if it misses." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Meshrin's fighting style rewards relentless pressure: each time it lands a greatsword blow after already striking that same foe in the round, its follow-up cuts deeper and drives the enemy back a step, but this rhythm breaks if it is forced to move or if it misses." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
```


---

## Iron Bull Golem — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull Golem | 12 | brute-11-charger | ok | SOFT: band | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | ok |

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

Scalding Vent. A creature that touches the golem or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 42 (8d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 42 (8d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Wisdom Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the golem. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("A huge iron golem") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: adamantine-only vulnerability [body] | trampling charge and gore [behavior] | scalding steam breath from the nostrils [behavior]
[reskin] signature idea (action): "The golem plants its hooves, lowers its head, and exhales a roaring cone of scalding steam straight down its charge lane. Anyone caught in the blast is cooked in their armor and left gasping and half-blind, while the golem itself only uses this to clear the ground it intends to cross." [action/save/damage] — menu: leap, condition-payoff, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "The golem's body is a working forge; whenever its iron hide is struck, it vents a jet of superheated vapor back at the attacker, scalding whoever dared to touch it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Vent" ("a creature that hits the golem with a melee attack while within 5 feet of it get [verb: scald:concept, iron:concept, touch:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Hates Fire
- read: def 4 / off 6 → 5; sustained 42 (2 × Nails); nova Noxious Spew 22; dmg 43

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

Hates Fire. When the grandmother takes fire damage, it screeches and recoils, and has Disadvantage on attack rolls until the end of its next turn.
Mimicry. The grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: The grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Noxious Spew (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: The grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=breath — caster-binder: ✓ ("She can turn into a cloud of ash and cho") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: turn into a cloud of ash and choke anyone who breathes her in [behavior] | hates fire and takes extra damage from it [behavior] | long black nails that carry rot [body]
[reskin] print canon route: the Green Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Green Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash bursts apart into a swirling cloud of her own ashes, flooding a space around her that lingers for a short while. Any breathing creature caught inside it must hold its breath or have the ash settle into its lungs, rotting it from within; she drifts freely through her own cloud while it lasts, unseen and untouchable to most attacks, and can rake anyone lost inside it before the ash f" [action/save/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] signature bound by force: action — "spew" matches cloud of+breathes in the user's words; the model's none is overruled
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("exact concept match [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "The rot on her long black nails spreads into whatever she wounds. A creature she has just struck with her nails begins to fester from inside — its flesh blackening and its breath souring — and the deeper the rot sets in, the harder it is for that creature to recover from any harm it suffers." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — terrain-walk, noxious-aura (ash, rot)
[reskin] signature miss: trait — "The rot on her long black nails spreads into whatever she wounds. A creature she has just struck with her nails begins to fester from inside — its flesh blackening and its breath souring — and the deeper the rot sets in, the harder it is for that creature to recover from any harm it suffers." [trait/always/damage] — the model found no template that holds it (offered: terrain-walk, noxious-aura)
[reskin] print canon modes: fly off — the Green Hag has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ashen Drift" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---

## Voraglace — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Voraglace | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Gnashing Bite); nova Freezing Gale 76; dmg 204

```
Voraglace

Gargantuan Dragon, Unaligned

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

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the wyrm extra movement, and the wyrm can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The wyrm makes three Bite attacks. It can replace one attack with a use of (A) Swallow or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Freezing Gale (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Command, Fear, Suggestion

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the wyrm hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the wyrm, and takes 22 (5d8) Acid damage at the start of each of the wyrm's turns. If the wyrm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the wyrm and has the Prone condition. If the wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Gnashing Bite. The wyrm makes one Bite attack.

Tide Surge. The wyrm moves up to half its Speed without provoking Opportunity Attacks.

Abyssal Dread. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: swallows ships whole [behavior] | freezes the sea [aura] | glacier-hard scaled body [body]
[reskin] signature idea (action): "The wyrm's gullet opens wide and the freezing breath within draws everything near into its throat. Creatures caught in that pull are dragged toward its maw, and those closest to it suffer the bite of its inner cold. The pull also reels in anything afloat or adrift around it, tightening its grip before the next lunge." [action/save/movement] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The wyrm's glacial hide is so cold that any weapon or claw that strikes it is rimed over, leaving the attacker's limbs numb and sluggish until the chill is shaken off. It never needs to flee; the frost it carries reaches those who dare touch it." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept]")
[reskin] chassis nova: "Freezing Gale (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Mosu the Plague-Seer — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mosu the Plague-Seer | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Mosu the Plague-Seer

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

Multiattack. Mosu makes three attacks, using Claw or Withering Ray in any combination. It can replace one attack with a use of (A) Wasting Hex or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Withering Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Wasting Hex. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Mosu casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Plague Siphon. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Piercing damage, and Mosu regains Hit Points equal to half the damage dealt. Success: Half damage only.

Curse of the Firstborn. Charisma Saving Throw: DC 16, one creature within 60 feet. Failure: The target has the Charmed condition until the end of its next turn.

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
[concept] signature elements: cursing the firstborn of every house [behavior] | blood-borne pestilence that spreads through family lines [body] | the wasting hex that outlives the caster [aura]
[reskin] signature idea (action): "Mosu points a finger at one creature it can see and recites the name of that creature's firstborn, even if the child is nowhere near. That child is immediately stricken by the same plague Mosu carries, and so is the creature itself; both are left with a persistent, worsening sickness that gives them no rest, and the only way to halt it is for the parent to spend a full turn in Mosu's sight loudly " [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Mosu points a finger at one creature it can see and recites the name of that creature's firstborn, even if the child is nowhere near. That child is immediately stricken by the same plague Mosu carries, and so is the creature itself; both are left with a persistent, worsening sickness that gives them no rest, and the only way to halt it is for the parent to spend a full turn in Mosu's sight loudly " [action/save/condition] — no template on the shelf shares a verb with the concept or the idea (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any creature that has been afflicted by Mosu's Wasting Hex becomes a carrier of the pestilence: at the start of each of its turns, the sickness tries to spread to one ally within reach whose blood it shares most closely, as the plague seeks family lines. A creature that resists the spread still feels its pull, and any creature that dies while carrying the plague leaves a faint, lingering trace tha" [trait/start_of_turn/condition] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Any creature that has been afflicted by Mosu's Wasting Hex becomes a carrier of the pestilence: at the start of each of its turns, the sickness tries to spread to one ally within reach whose blood it shares most closely, as the plague seeks family lines. A creature that resists the spread still feels its pull, and any creature that dies while carrying the plague leaves a faint, lingering trace tha" [trait/start_of_turn/condition] — the model found no template that holds it (offered: warded-mending, false-appearance, bloodied-burst, bloodied-fury, uncanny-sense, death-burst)
```
