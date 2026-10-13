# Review batch — step7-twelve-2026-10-12T14-06-52

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | brute-5 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 7/7 |
| Vault Sentinel | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 7/7 |
| Drowned Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Rimevault | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Storm-Herder | 13 | 2024 | brute-11-charger | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Graveborn Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/5 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Knife Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Mudmaw | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |

**Dropped 2 of 32 user clauses** (coverage 94%); concept share 78% (52/67 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Drowned Hound — lowest CR

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Drowned Hound

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Traits

Bog Stalker. Difficult Terrain composed of bog water, soft ground, mud, and reeds doesn't cost the drowned hound extra movement, and the drowned hound can move across bog water, soft ground, mud, and reeds without needing to make an ability check.

Actions

Multiattack. The drowned hound makes two Bite attacks. It can replace one attack with a use of Hooked Lash.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition.

Hooked Lash. Strength Saving Throw: DC 13, one creature within 20 feet. Failure: The target is pulled up to 15 feet straight toward the drowned hound by its grip and has the Grappled condition (escape DC 12).

Bonus Actions

Smother. The drowned hound smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the drowned hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the drowned hound's turns. The drowned hound can have only one creature smothered at a time. If the drowned hound takes 5 damage or more in a single turn from the smothered creature, the drowned hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the drowned hound. If the drowned hound dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[concept] signature elements: drag prey underwater to drown [behavior] | mud-caked hound hide [body]
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "When its prey is already caught in its grip, the hound does not just hold and chew — it rolls. Thrashing sideways, it hauls the grappled creature bodily along with it, plunging both into the murk and dragging the victim down into the black water wherever it goes. The hauled creature is yanked to wherever the hound moves, ending up submerged and disoriented in the bog." [bonus_action/always/movement] — menu: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: swallow, hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] signature bound by force: action — "hook-drag" matches drag+under in the user's words; the model's none is overruled
[reskin] value check: "Hooked Lash" EV 2.8 vs floor 2.6 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Hooked Lash" ("exact concept match [verb: drag:concept, under:concept, grapple:idea, haul:idea]")
[reskin] signature idea (trait): "The hound is one with the mud. While it lies still in bog water or soft ground, it is almost impossible to spot, blending seamlessly into the murk so that prey steps within reach before ever noticing it. It can also slip through muck and reeds without leaving a clear trail." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog, mud)
[reskin] signature template (trait): terrain-walk -> Traits/"Bog Stalker" ("The hound is one with the mud, slipping through muck and reeds without leaving a [verb: bog:concept, mud:concept, reeds:idea]")
```


---

## Kraken — highest CR

**Concept:** a kraken

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

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
Multiattack: The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 34 (7d6 + 10) bludgeoning damage. The target is grappled (escape DC 25) by one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The creature thrown and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is prone.
Lightning Strike: One creature the kraken can see within 120 feet must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken (it can have up to four creatures swallowed at a time) must make a DC 25 Dexterity saving throw, taking 23 (3d8 + 10) piercing damage on a failed save. On a failed save, If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has Total Cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken with the prone condition. If the kraken dies, any swallowed creature no longer is restrained and can escape from the corpse using 15 feet of movement, exiting prone.
Legendary Actions

The kraken can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The kraken regains spent legendary actions at the start of its turn.

Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature in a 15-foot radius originating from the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its Speed. Failure or Success: the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken") | brute-grappler: key "kraken" (class body)
[concept] signature elements: seizing arms that drag prey into a devouring maw [behavior] | a body of living abyssal brine [body] | ink-black storm-aura that chills the sea [aura]
[reskin] print canon route: "a kraken" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Tidal Eruption (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Tidal Eruption (Recharge 5-6)" is the seat's nova, not the Kraken's
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
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Tail Swipe); nova none; dmg 44

```
Meshrin
Large humanoid, lawful neutral
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

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Heavy Blow. When Meshrin hits a creature with its Greatsword, the attack deals an extra 3 damage.
Riposte (Reaction). When a creature misses Meshrin with a melee attack roll, Meshrin makes one Tail Swipe attack against that creature.

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite. It can replace one attack with a use of Chain Hook.
Greatsword: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
Chain Hook: One creature within 30 feet of Meshrin must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward Meshrin by its grip and be grappled (escape DC 15).
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("Wields a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword and long tail served together as one weapon [object] | trained fighting style and disciplined footwork [behavior] | razor claws and viscous bite closing the deal [body]
[reskin] signature idea (action): "Meshrin sets its feet in a disciplined fighting stance and lashes out with a measured, probing blow meant to catch a weapon or limb rather than kill outright. A creature struck this way has its footwork sabotaged, leaving it off-balance and unable to make more than a stumbling step until it shakes off the tangle. Meshrin then steps into biting and clawing range while the prey is still caught." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, rampage, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "Meshrin sets its feet in a disciplined fighting stance and lashes out with a measured, probing blow meant to catch a weapon or limb rather than kill outright. A creature struck this way has its footwork sabotaged, leaving it off-balance and unable to make more than a stumbling step until it shakes off the tangle. Meshrin then steps into biting and clawing range while the prey is still caught." [rider/on_hit/condition] — the model found no template that holds it (offered: hook-drag)
[reskin] value check: "Hooked Lash" EV 13.8 vs floor 13 (one attack of 2) — worth the trade
[reskin] library seed drawn: hook-drag -> Actions/"Hooked Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Meshrin lands a bite or claw strike on a creature already reeling or off-balance, its teeth and talons find the soft places and tear deeper, turning any moment of weakness into a vicious opening. This closing instinct rewards it for pressing the advantage the moment a foe falters." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever Meshrin lands a bite or claw strike on a creature already reeling or off-balance, its teeth and talons find the soft places and tear deeper, turning any moment of weakness into a vicious opening. This closing instinct rewards it for pressing the advantage the moment a foe falters." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Vault Sentinel — a 2024 sheet

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Vault Sentinel | 12 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · soft · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Shockwave 42; dmg 92

```
Vault Sentinel

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

Heated Body. A creature that touches the iron bull or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 46 (9d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 46 (9d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Shockwave (Recharge 5-6). Wisdom Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[concept] signature elements: iron bull golem [body] | relentless charge and gore [behavior] | scalding steam breath [behavior]
[reskin] signature idea (action): "The bull lowers its head and commits to a straight-line run at a foe it can see, hooves hammering the earth until the gore lands. The impact hurls the victim bodily along the bull's path and leaves it sprawled in the dirt where the bull can stomp and trample it. It can only build up this head of steam once every few breaths." [action/always/movement] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] signature bound by force: action — "ground-burst" matches stomp+stomps in the user's words; the model's none is overruled
[reskin] value check: "Shockwave (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Shockwave (Recharge 5-6)" ("exact concept match [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "Scalding steam hisses constantly from its iron nostrils, so anyone caught close in front of its face is seared and half-blinded by the venting heat, making it painful to stand and trade blows with the bull head-on." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature bound by force: trait — "heated-body" matches scald+iron in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: scald:concept, iron:concept, heat:idea, sear:idea]")
```


---

## Grandmother Ash — a print donor

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok |

- bands · soft · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Nails
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Nails); nova Noxious Spew 22; dmg 50

```
Grandmother Ash
Medium fiend, neutral
Armor Class

15 (natural armor)

Hit Points: 

127 (17d8 + 51)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

16 (+3)

	

16 (+3)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Damage Vulnerabilities: 

fire

Damage Resistances: 

cold

Condition Immunities: 

charmed

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Abyssal, Common, Infernal, Primordial

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Rotting Nails. A creature that touches Grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) necrotic damage.
Soul Bag. Grandmother has a soul bag. While holding or carrying the bag, Grandmother can use its Nightmare Haunting action.
The bag has AC 15, HP 20, and Resistance to all damage. The bag turns to dust if reduced to 0 hit points. If the bag is destroyed, any souls the bag is holding are released. Grandmother can create a new bag after 7 days.
Shape-Shift (Bonus Action). Grandmother shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.

Actions
Multiattack: Grandmother makes two Nails attacks.
Nails: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 25 (5d8 + 3) slashing damage.
Noxious Spew (Recharge 5-6): Each creature in a 30-foot cone must make a DC 15 Constitution saving throw, taking 22 (5d8) piercing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
Spellcasting: Grandmother casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14): - At Will: Detect Magic, Etherealness, Magic Missile
2/Day Each: Phantasmal Killer, Plane Shift
Nightmare Haunting (1/Day; Requires Soul Bag): While on the Ethereal Plane, Grandmother casts Dream, using the same spellcasting ability as Spellcasting. Only Grandmother can serve as the spell's messenger, and the target must be a creature Grandmother can see on the Material Plane. The spell fails and is wasted if the target is under the effect of the Protection from Evil and Good spell or within a Magic Circle spell.
If the target takes damage from the Dream spell, the target's Hit Point maximum decreases by an amount equal to that damage. If the spell kills the target, its soul is trapped in Grandmother's soul bag, and the target can't be raised from the dead until its soul is released. - At Will: - 1/Day Each: Dream, Protection from Evil and Good, Magic Circle
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=breath — caster-binder: ✓ ("choke anyone who breathes her in") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: turning into a choking cloud of ash [behavior] | long black rot-carrying nails [body] | three crows that warn her of intruders [behavior]
[reskin] print canon route: the Night Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Night Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 16, WIS 14, CHA 16 — the Night Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Night Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash dissolves into a swirling, choking cloud of ash that fills the air around her and clings to the lungs of anyone caught inside. Those who breathe her in begin to suffocate, their bodies rotting from within as the ash takes root, while she remains a formless haze that drifts through the space she occupies." [action/save/condition] — menu: swallow, trample, leap, thrown-burst, gaze-single, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("The idea's action is exhaling a choking cloud of ash over an area that forces a  [verb: cloud of:concept, breathes:concept, choking cloud:idea]")
[reskin] signature idea (trait): "Her long black nails carry a creeping rot that gnaws at flesh long after the wound is dealt, leaving injuries that refuse to close and steadily drain the life from those she marks. The rot spreads with every unhealed strike, making even glancing blows a lingering death sentence." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature template (trait): heated-body -> Traits/"Rotting Nails" ("a creature that touches the creature or hits it with a melee attack takes linger [verb: burn:concept, fire:concept]")
[reskin] print canon modes: fly off — the Night Hag has no such mode and the words name none
[reskin] print canon type: Fey -> Fiend — the Night Hag's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "Abyssal, Common, Infernal, Primordial" — the Night Hag's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Night Hag's walk; the concept's other modes stay
[reskin] print canon defenses: immunities Poison; Poisoned -> Charmed; resistances none -> Cold, Fire — the Night Hag's own header lines
[reskin] print canon trait: Soul Bag — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Night Hag (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Drifting" is the seat's, not the Night Hag's
[reskin] print canon row: Actions/Spellcasting — the Night Hag's own
[reskin] print canon row: Actions/Nightmare Haunting (1/Day; Requires Soul Bag) — the Night Hag's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Night Hag's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Night Hag's Shape-Shift
```


---

## Rimevault — a homebrew with a nova

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Rimevault | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Jaws + legendary Snapping Maw); nova Freezing Breath 76; dmg 204

```
Rimevault

Gargantuan Dragon, Neutral

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

Senses darkvision 120 ft., blindsight 60 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sealing Ice. Difficult Terrain composed of ice formed by Rimevault's swimming or breath doesn't cost Rimevault extra movement, and Rimevault can move across ice formed by Rimevault's swimming or breath without needing to make an ability check.

Legendary Resistance (4/Day). If Rimevault fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Rimevault makes three Jaws attacks. It can replace one attack with a use of (A) Swallow or (B) Spellcasting to cast Fear.

Jaws. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Freezing Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. Rimevault casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Command, Fear, Dispel Magic

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that Rimevault hit with a melee attack this turn. Failure: 42 (12d6) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Rimevault, and takes 22 (5d8) Acid damage at the start of each of Rimevault's turns. If Rimevault takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of Rimevault and has the Prone condition. If Rimevault dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Rimevault can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Snapping Maw. Rimevault makes one Jaws attack.

Glacier Surge. Rimevault moves up to half its Speed without provoking Opportunity Attacks.

Deepfreeze Stare. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("glacier wyrm") | dragon: key "wyrm" (class body)
[concept] signature elements: swallowing ships whole [behavior] | freezing the sea solid [behavior] | a body of glacial ice and dragonhide [body]
[reskin] signature idea (action): "Rimevault seizes a vessel, a structure, or a chunk of shore-ice in its jaws and flings or drives it bodily through the enemy line, so the wreck itself becomes the weapon. Everything in the object's path is struck by a wall of crushing mass and shattering cold that lingers, turning the ground itself into a hazard it can exploit before closing to feed." [action/always/damage] — menu: swallow, gaze-single, snare, condition-payoff, execute, seal, lure, hook-drag (+ shelf: shell-withdraw, contagion, charge-push, hook-rider, pounce, snatch, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature bound by force: action — "swallow" matches swallow+swallows+swallowed+whole in the user's words; the model's none is overruled
[reskin] value check: "Swallow" EV 46.8 vs floor 22.4 (one attack of 3) — a nova already stands — kept ungated, dice to 42 at the ceiling
[reskin] signature template: swallow -> Actions/"Swallow" ("exact concept match [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The sea freezes wherever Rimevault swims or breathes its breath, sealing open water into a brittle sheet around it. Anything caught on that sheet cannot easily break away, and the dragon can hear and feel every footfall, heartbeat, and hull-creak traveling through its own ice." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature template (trait): terrain-walk -> Traits/"Sealing Ice" ("The idea's central verb is 'freezes' — the sea freezes into ice, and Rimevault m [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Freezing Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Graveborn Seer — one marked soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Graveborn Seer | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Graveborn Seer

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

Languages Common

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The graveborn seer makes three attacks, using Claw or Plague Bolt in any combination. It can replace one attack with a use of (A) Blight Ray or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Plague Bolt. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Piercing damage.

Blight Ray. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The graveborn seer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Bonus Actions

Mark of the Seer. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: Until the start of the graveborn seer's next turn, the target has Disadvantage on attack rolls against creatures other than the graveborn seer.

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
[concept] signature elements: firstborn curse [behavior] | bone charms and plague-seer's staff [object] | aura of wailing spectral children [aura]
[reskin] signature idea (action): "The seer marks one foe as a stolen firstborn, and from then on a spectral child clings to that victim and wails whenever they try to act, making their movements falter and their strikes go wide while the seer remains the only one who can truly harm them. The curse lasts until the seer dies or chooses a new firstborn, and it cannot be lifted while the seer still stands." [action/once_per_fight/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Stolen Firstborn" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: aggro-curse -> Bonus Actions/"Stolen Firstborn" ("marks one foe, spectral child makes their movements falter and strikes go wide,  [verb: mark:idea]")
[reskin] signature idea (trait): "The seer carries a staff strung with bone charms taken from the graves of firstborn children. When the seer would be wounded, one of the charms can shatter to transfer that harm onto the currently marked firstborn instead, leaving the seer untouched and the victim reeling with sudden wounds. The staff holds only a few charms, and once they are spent the seer has no more lives to spend." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "The seer carries a staff strung with bone charms taken from the graves of firstborn children. When the seer would be wounded, one of the charms can shatter to transfer that harm onto the currently marked firstborn instead, leaving the seer untouched and the victim reeling with sudden wounds. The staff holds only a few charms, and once they are spent the seer has no more lives to spend." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker, bloodied-fury, death-burst)
```


---

## Knife Ball — bands soft

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Knife Ball | 2 (2014) | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · soft · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Blade); nova Knife Volley 11; dmg 14

```
Knife Ball
Small construct, unaligned
Armor Class

13 (natural armor)

Hit Points: 

45 (7d6 + 21)

Speed: 

50 ft.

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

darkvision 60 ft., tremorsense 30 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Relentless Roll. The knife ball ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the knife ball takes the Dash or Disengage action.

Actions
Multiattack: The knife ball makes two attacks: one with its Blade and one with its Thrown Blade. It can replace one attack with a use of Blade Sweep.
Blade: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Thrown Blade: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) slashing damage. Immediately after the attack, a thrown blade returns to the knife ball's grasp.
Knife Volley (Recharge 5-6): The knife ball hurls a thrown blade at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is also knocked prone.
Blade Sweep: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — brute-grappler: quote not found in the input ("a BODY that seizes and holds") | swarm: a swarm is a mass of many — no mass in the words | skirmisher-hurler: ✓ ("knife") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: hurled spinning blades on retractable chains [object] | volley of knives that return to the body [behavior] | iron sphere bristling with protruding knife-points [body]
[reskin] nova capped: "Hurled Burst" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball whips out lengths of chain threaded with blades, lashing a line of foes in front of it. Those it catches are shackled and dragged back toward the ball as it reels in, ending up right where its spinning knives can reach." [action/save/movement] — menu: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Chained Lash" EV 1 vs floor 3.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Chained Lash" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a bristling shell of knife-points. Any creature that touches it or hits it in melee is cut by the protruding iron." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature miss: trait — "Its body is a bristling shell of knife-points. Any creature that touches it or hits it in melee is cut by the protruding iron." [trait/on_being_hit/damage] — the model found no template that holds it (offered: assassinate)
[reskin] chassis nova: "Knife Volley (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```
