# Review batch — step7-twelve-2026-10-12T16-16-49

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 6/6 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 6/7 | 5/5 |
| Mirefang | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 6/9 |
| Stormward of the High Crags | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Griefmaven | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 0/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Glyphback | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 3 of 32 user clauses** (coverage 91%); concept share 73% (47/64 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Mirefang — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Mirefang | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Mirefang

Medium Monstrosity, Neutral

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

Sludge Stride. Difficult Terrain composed of mud and clinging brine doesn't cost the mirefang extra movement, and the mirefang can move across mud and clinging brine without needing to make an ability check.

Actions

Multiattack. The mirefang makes two Bite attacks. It can replace one attack with a use of Bog Haul.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Bog Haul. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the mirefang by its jaws and has the Grappled condition (escape DC 12).

Bonus Actions

Whelm. The mirefang whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the mirefang, and takes 3 (1d6) Bludgeoning damage at the start of each of the mirefang's turns. The mirefang can have only one creature whelmed at a time. If the mirefang takes 5 damage or more in a single turn from the whelmed creature, the mirefang must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the mirefang. If the mirefang dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[concept] signature elements: drags prey under the water [behavior] | mud-caked brine hide [body]
[reskin] claim gate: CR 1 but a Monstrosity body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The mirefang locks onto prey it has seized and hauls it bodily toward the nearest deep water, muck or brine, pulling the victim alongside and slightly beneath the surface while it drags. The victim is swept along with the hound and left half-submerged in the shallows or bog, making it harder to escape as the bottom turns soft and only its head stays clear." [bonus_action/always/movement] — menu: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] value check: "Bog Haul" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Bog Haul" ("the mirefang locks onto seized prey and hauls it bodily toward deep water, dragg [verb: drag:concept, under:concept, pull:idea, haul:idea]")
[reskin] signature idea (trait): "The mirefang's mud-caked hide constantly weeps a clinging brine that slicks the ground around it. Anything that grabs, grapples, or clings to the hound finds the coating treacherous and can easily lose its hold, while the hound itself remains sure-footed in the slop." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature template (trait): terrain-walk -> Traits/"Sludge Stride" ("the slick brine-clad ground around the hound is difficult terrain for others, ye [verb: bog:concept, mud:concept]")
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
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its speed. On a failed or successful save, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: storm-wracked tentacle grasp [behavior] | dragging ships into the abyss [behavior] | living brine and abyssal pressure [body]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Storm Surge (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon multiattack: "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow." — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Storm Surge (Recharge 5-6)" is the seat's nova, not the Kraken's
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
| Meshrin | 8 (2014) | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Meshrin
Large humanoid, neutral
Armor Class

14 (half plate)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

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

Great Weapon Master. When Meshrin hits a creature with its Greatsword, the attack deals an extra 3 damage.
Riposte (Reaction). When a creature misses Meshrin with a melee attack, Meshrin makes one Tail Swipe attack against that creature.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite.
Greatsword: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("Wields a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword and trained fighting styles [object] | tail swipe, claws, and vicious bite [body] | cold-blooded duelist discipline under pressure [behavior]
[reskin] signature idea (action): "Meshrin fights with colder discipline the moment its own blood is drawn, regardless of the enemy it faces. Once it has been wounded, it can suddenly trade its greatsword's reach for a killing angle, moving in and cutting at the weak side of a foe that thought it was safe. This maneuver cannot be repeated until it has had a moment to reset its stance." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin fights with colder discipline the moment its own blood is drawn, regardless of the enemy it faces. Once it has been wounded, it can suddenly trade its greatsword's reach for a killing angle, moving in and cutting at the weak side of a foe that thought it was safe. This maneuver cannot be repeated until it has had a moment to reset its stance." [rider/on_hit/damage] — the model found no template that holds it (offered: hook-drag)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Meshrin's training with the greatsword is not just in the attack; it is in the recovery. Whenever it lands a sword blow, it may immediately shift its weight and footwork to reposition without opening itself up to a free swing. This constant, trained movement makes it a nightmare to pin down or surround." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Meshrin's training with the greatsword is not just in the attack; it is in the recovery. Whenever it lands a sword blow, it may immediately shift its weight and footwork to reposition without opening itself up to a free swing. This constant, trained movement makes it a nightmare to pin down or surround." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Iron Bull — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull | 12 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · soft · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Bludgeoning Charge 42; dmg 92

```
Iron Bull

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

Scalding Vapor. A creature that touches the iron bull or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 46 (9d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 46 (9d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Bludgeoning Charge (Recharge 5-6). Strength Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[concept] signature elements: thundering charge and gore [behavior] | scalding steam breath [behavior] | iron bull body [body]
[reskin] signature idea (action): "The Iron Bull surges forward in a thunderous charge, its hooves cracking the ground and steam screaming from its nostrils as it closes the distance. Any creature in its path is trampled and knocked aside, and the bull finishes by lowering its head to gore the nearest foe with its iron horns." [action/always/movement] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] value check: "Thunder Charge (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Thunder Charge (Recharge 5-6)" ("The bull surges forward and its hooves crack the ground, trampling anything in i [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "The Iron Bull's body radiates scalding steam from its nostrils. Any creature that touches it or strikes it in melee is burned by the searing vapor." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Scalding Vapor" ("radiates scalding steam; any creature that touches it or strikes it in melee is  [verb: scald:concept, iron:concept, burn:idea, sear:idea, touch:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Nails); nova Noxious Spew 22; dmg 50

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

Rotting Nails. A creature that touches Grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) necrotic damage.
Mimicry. Grandmother can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.

Actions
Multiattack: Grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 25 (5d8 + 3) slashing damage.
Noxious Spew (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Blinded condition until the end of its next turn.
Spellcasting: Grandmother casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 13, +4 to hit with spell attacks): At Will: Dancing Lights, Disguise Self, Invisibility, Minor Illusion, Ray of Sickness
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=breath — skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: ✓ ("choke anyone who breathes her in") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: turning into choking ash [body] | black rot-carrying nails [body] | three crow watchers [object]
[reskin] print canon route: the Green Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Green Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 13, WIS 14, CHA 14 — the Green Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Green Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash collapses into a churning cloud of her own ash for a moment, without leaving her space. Anyone caught inside it breathes her in and begins to rot from the inside; she can only do this when she is not already a cloud. Those she marks this way stay rotting for a time, their flesh loosening." [action/always/damage] — menu: swallow, trample, leap, thrown-burst, gaze-single, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] signature bound by force: action — "spew" matches cloud of+breathes in the user's words; the model's none is overruled
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("exact concept match [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "Her body carries the rot in her black nails and in the air around her. When she strikes or is struck, the rot clings and spreads, eating away at flesh. It never spreads to fire or to those already burning." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature template (trait): heated-body -> Traits/"Rotting Nails" ("When she strikes or is struck, the rot clings and spreads — hits it with a melee [verb: burn:concept, fire:concept]")
[reskin] print canon languages: "Common" -> "Common, Elvish, Sylvan" — the Green Hag's
[reskin] print canon speed: 50 ft. -> 30 ft. — the Green Hag's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 30 ft. — the Green Hag's own
[reskin] print canon trait: Mimicry — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Green Hag (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Green Hag's
[reskin] print canon: chassis row leaves — Traits/"Ashform" is the seat's, not the Green Hag's
[reskin] print canon row: Actions/Spellcasting — the Green Hag's own
```


---

## Glacier Wyrm — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Glacier Wyrm | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Glacier Lunge); nova Killing Cold 76; dmg 204

```
Glacier Wyrm

Gargantuan Dragon, Unaligned

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

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

Vulnerabilities Fire

Immunities Cold

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the glacier wyrm extra movement, and the glacier wyrm can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the glacier wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The glacier wyrm makes three Bite attacks. It can replace one attack with a use of (A) Swallow or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Killing Cold (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The glacier wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Fear, Command, Suggestion, Dispel Magic

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the glacier wyrm hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the glacier wyrm, and takes 22 (5d8) Acid damage at the start of each of the glacier wyrm's turns. If the glacier wyrm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the glacier wyrm and has the Prone condition. If the glacier wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the glacier wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Glacier Lunge. The glacier wyrm makes one Bite attack.

Ice Slide. The glacier wyrm moves up to half its Speed without provoking Opportunity Attacks.

Pack-Ice Crack. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: swallowing ships whole [behavior] | freezing the sea to trap and shatter prey [behavior] | a body of living glacier ice [body]
[reskin] signature idea (action): "The glacier wyrm flexes muscles of living ice, cracking the frozen ground in a wide ring around itself. Everyone caught in the ring is thrown sprawling and rooted to the spot, legs locked in sudden ice that spreads up from the floor." [action/always/condition] — menu: swallow, condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The sea is its anvil: whenever the glacier wyrm ends its turn on or in the water, the surface around it hardens, creating a rim of unstable pack ice that can unbalance and trap creatures and block small vessels." [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Griefmaven — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Griefmaven | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Griefmaven

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

Multiattack. The griefmaven makes three attacks, using Claw or Withering Ray in any combination. It can replace one attack with a use of (A) Bolt or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Withering Ray. Ranged Attack Roll: +8, range 60 ft. 14 (2d8 + 5) Necrotic damage.

Bolt. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Piercing damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The griefmaven casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Punishing Hex. Charisma Saving Throw: DC 16, one creature within 60 feet. Failure: The target is cursed until the end of the griefmaven's next turn. The first time the cursed target deals damage to any creature before then, it takes 18 (4d8) Piercing damage. Success: Half damage only.

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
[concept] signature elements: curse of the firstborn [behavior] | spectral curse-sight [aura] | blood-borne blight [body]
[reskin] signature idea (action): "The griefmaven names one living creature with living kin and lays a generational curse on its bloodline. Until the curse is broken, every wound the creature suffers refuses to mend: no magic, potion, or rest can restore its health, and each time it strikes at the griefmaven or its allies, the same refusal gnaws at its own flesh, costing it vitality. The curse lifts only if the griefmaven is destro" [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Bloodline Reckoning" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] signature template: curse-debt -> Actions/"Bloodline Reckoning" ("the griefmaven curses one creature; until the curse ends, every wound refuses to [verb: curse:idea]")
[reskin] signature idea (trait): "The griefmaven's spectral curse-sight always finds the healthiest and most dangerous living foe in its view, marking that creature as prey; while the mark holds, the griefmaven's attacks against it bypass the protections of vigor and fortune, and the marked foe cannot hide from the griefmaven's gaze." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The griefmaven's spectral curse-sight always finds the healthiest and most dangerous living foe in its view, marking that creature as prey; while the mark holds, the griefmaven's attacks against it bypass the protections of vigor and fortune, and the marked foe cannot hide from the griefmaven's gaze." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---

## Knife Ball — bands soft

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · soft · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Spur); nova Blade Flurry 11; dmg 14

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

Rolling Shell. The knife ball ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the knife ball takes the Dash or Disengage action.

Actions
Multiattack: The knife ball makes two attacks: one with its Spur and one with its Knife. It can replace one attack with a use of Returning Blade.
Spur: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Knife: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) slashing damage. Immediately after the attack, a curved knife returns to the knife ball's grasp.
Blade Flurry (Recharge 5-6): The knife ball hurls a curved knife at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Returning Blade: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — skirmisher-hurler: ✓ ("knife ball") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: swarm of flung knives released from a rolling iron shell [behavior] | segmented iron ball that opens to hurl blades [body]
[reskin] nova capped: "Hurled Burst" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball stops rolling, plants itself, and locks its segmented shell. A heartbeat later every seam snaps open at once and a ring of curved knives bursts outward in all directions, leaving the ball briefly hollow and lighter. Creatures caught in the blast are driven back by the sheer volume of blades, scattering whatever formation they held." [action/always/movement] — menu: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "The knife ball stops rolling, plants itself, and locks its segmented shell. A heartbeat later every seam snaps open at once and a ring of curved knives bursts outward in all directions, leaving the ball briefly hollow and lighter. Creatures caught in the blast are driven back by the sheer volume of blades, scattering whatever formation they held." [action/always/movement] — the model found no template that holds it (offered: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter, riposte)
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The knife ball's shell is not decorative. The instant anything strikes its spinning iron surface, a curved knife breaks free from the seam nearest the impact and snaps back at the attacker. The harder the hit, the more blades peel away in answer." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature miss: trait — "The knife ball's shell is not decorative. The instant anything strikes its spinning iron surface, a curved knife breaks free from the seam nearest the impact and snaps back at the attacker. The harder the hit, the more blades peel away in answer." [trait/on_being_hit/damage] — the model found no template that holds it (offered: assassinate)
[reskin] chassis nova: "Blade Flurry (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```
