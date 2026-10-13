# Review batch — baseline-fidelity-2026-10-12T14-30-29

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 7/7 | 8/8 |
| Warpath Ball | 2 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Brinewrack Marrowdow | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/6 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thrall Sovereign | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Bog Lurker | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/6 |
| Stillstone Gargoyle | 4 | 2024 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Staffsore | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 2/2 | 2/2 |
| Mudsnapper Leviathan | 9 | 2024 | brute-8-grappler | ok | user-set: AC 22 · reads CR 12.5 | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Lost Sock Heap | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/3 | 2/4 |
| Grandmother Ash | 7 (2014) | 2014 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 6/7 | 7/7 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Skittergrasp | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |

**Dropped 3 of 39 user clauses** (coverage 92%); concept share 79% (61/77 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Skittergrasp — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Skittergrasp | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Hand Crossbow); nova none; dmg 10

```
Skittergrasp
Small humanoid, lawful neutral
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft., climb 30 ft.

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

Skitter. The skittergrasp ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the skittergrasp takes the Dash or Disengage action.

Actions
Multiattack: The skittergrasp makes two Hand Crossbow attacks.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 5 (1d8 + 1) piercing damage, and the skittergrasp has advantage on its next attack roll against the target before the end of its next turn.
Crossbow: Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 4 (1d6 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=thrown-weapon — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: bag of caltrops scattered as area denial [object] | hand crossbow fired from cover [object] | skirmishing retreat through trapped tunnels [behavior]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The skittergrasp scatters a handful of caltrops across the ground in a patch near it, choosing a spot within a short throw. The patch stays until cleared or until the creature is gone from the fight; anyone stepping through it has their feet torn and is slowed enough that fleeing the skittergrasp becomes a mistake." [action/save/condition] — menu: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating)
[reskin] signature miss: action — "The skittergrasp scatters a handful of caltrops across the ground in a patch near it, choosing a spot within a short throw. The patch stays until cleared or until the creature is gone from the fight; anyone stepping through it has their feet torn and is slowed enough that fleeing the skittergrasp becomes a mistake." [action/save/condition] — the model found no template that holds it (offered: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed)
[reskin] value check: "Sundering Shove" EV 0.6 vs floor 2.1 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The skittergrasp has wired its tunnels with tripwires and blind turns it alone remembers, so when a pursuer closes to melee it can yank a line and drop a shower of roof spikes, forcing the attacker to choose between ducking and following." [trait/on_being_hit/movement] — menu: EMPTY (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry, death-burst)
[reskin] signature miss: trait — "The skittergrasp has wired its tunnels with tripwires and blind turns it alone remembers, so when a pursuer closes to melee it can yank a line and drop a shower of roof spikes, forcing the attacker to choose between ducking and following." [trait/on_being_hit/movement] — the model found no template that holds it (offered: faultless-tracker)
```


---

## Iron Bull — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull | 12 | brute-11-charger | ok | SOFT: band, hot | ok | ok | SOFT: lint:bps-immunity | ok | ok | ok |

- bands · soft · band: reads CR 15.5 (print at 12 reads 8–14, n=15)
- bands · soft · hot: reads CR 15.5, more than three over — the user's own immunity line drives the defensive read (user-set)
- headerBody · soft · lint:bps-immunity: Immunity to all three physical types — 0/329 printed blocks have it; the physical types are stripped from Immunities
- read: def 16 / off 15 → 15.5; sustained 92 (2 × Gore); nova Steam Shriek 42; dmg 92

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

Senses blindsight 60 ft., darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Searing Iron Hide. A creature that touches the iron bull or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Gore or Hooves in any combination.

Gore. Melee Attack Roll: +10, reach 10 ft. 46 (9d8 + 6) Piercing damage.

Hooves. Melee Attack Roll: +10, reach 5 ft. 46 (9d8 + 6) Bludgeoning damage, and the target has the Prone condition.

Steam Shriek (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 15-foot Emanation originating from the iron bull. Failure: 42 (12d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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
[concept] signature elements: thundering charge and gore [behavior] | iron body [body] | scalding steam breath [behavior]
[reskin] signature idea (action): "The iron bull releases a shrieking roar of scalding steam from its nostrils, filling a cone in front of it with blistering vapor and thunderous noise that leaves those caught in it blinded, deafened, and burned. The steam lingers as a hot, obscuring cloud for a short while afterward, but the bull will not use it again until it has had time to cool and recharge." [action/always/damage] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — ground-burst (stomp, stomps)
[reskin] value check: "Steam Shriek (Recharge 5-6)" EV 110.2 vs floor 69.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Steam Shriek (Recharge 5-6)" ("the bull releases a cone of scalding steam and thunderous noise that burns and l [verb: stomp:concept, stomps:concept]")
[reskin] signature idea (trait): "The iron bull's body conducts the searing heat of its internal furnace. Whenever a creature strikes the bull in melee, it is burned by the sudden blast of heat that erupts from the point of impact, and any creature that grapples or otherwise holds onto the bull suffers the same searing pain as long as it maintains contact." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Searing Furnace Hide" ("A creature that hits the bull with a melee attack or touches/grapples it takes s [verb: scald:concept, iron:concept, heat:idea, burn:idea, sear:idea, furnace:idea]")
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Tail Swipe); nova none; dmg 51

```
Meshrin
Large humanoid, lawful neutral
Armor Class

16 (chain mail)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

16 (+3)

	

12 (+1)

	

13 (+1)

	

18 (+4)

Skills: 

Athletics +7, Persuasion +7

Saving Throws: 

CON +6, CHA +7

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Meshrin hits a creature with its greatsword, the attack deals an extra 3 damage.
Aura of Authority. While within 10 feet of Meshrin, Meshrin and its allies have advantage on attack rolls and saving throws, provided Meshrin isn't incapacitated.
Riposte (Reaction). When a creature misses Meshrin with a melee attack roll, Meshrin makes one Tail Swipe attack against that creature.

Actions
Multiattack: Meshrin makes three attacks, using Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite. It can replace one attack with a use of Scaled Coil.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be knocked prone.
Razor Sharp Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.
Scaled Coil: One creature within 30 feet of Meshrin must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet straight toward Meshrin by its grip and be grappled (escape DC 15).
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("is trained in fighting styles") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword discipline and parry [object] | lashing tail swipe [behavior] | pack-commanding aura [aura]
[reskin] signature idea (action): "After he or a nearby ally is struck, Meshrin calls out an opening and turns it into an advantage for his side, steeling their nerve and exposing the attacker. The next ally who presses the attack in that same moment strikes with extra confidence." [reaction/on_being_hit/defense] — menu: EMPTY (+ shelf: throw-retrieve, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — hook-drag (claw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into hook-drag
[reskin] signature miss: action — "After he or a nearby ally is struck, Meshrin calls out an opening and turns it into an advantage for his side, steeling their nerve and exposing the attacker. The next ally who presses the attack in that same moment strikes with extra confidence." [reaction/on_being_hit/defense] — the model found no template that holds it (offered: hook-drag)
[reskin] value check: "Hooked Lash" EV 9.4 vs floor 8.8 (one attack of 3) — worth the trade
[reskin] library seed drawn: hook-drag -> Actions/"Hooked Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When an enemy fails to land a hit on Meshrin and leaves itself open, he pivots into a smooth counterstroke, shifting a step as he does so and forcing the attacker to stay off balance. Each such opening can only be exploited once per exchange." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When an enemy fails to land a hit on Meshrin and leaves itself open, he pivots into a smooth counterstroke, shifting a step as he does so and forcing the attacker to stay off balance. Each such opening can only be exploited once per exchange." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
```


---

## Brinewrack Marrowdow — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Brinewrack Marrowdow | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Brinewrack Marrowdow

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 65 (10d8 + 20)

Speed 30 ft., Swim 30 ft.

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

Languages Common, Sylvan, telepathy 60 ft.

CR 4 (XP 1,100; PB +2)

Traits

Fen-Slick Stride. Difficult Terrain composed of bog-brine slick doesn't cost Brinewrack extra movement, and Brinewrack can move across bog-brine slick without needing to make an ability check.

Actions

Multiattack. Brinewrack makes two attacks, using Claw or Brine Bolt in any combination. It can replace one attack with a use of (A) Brine Gaze or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Brine Bolt. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Brine Gaze. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. Brinewrack casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

- At Will: Ray of Sickness, Fog Cloud
- 1/Day Each: Bestow Curse, Mirror Image

Brinerot Reprisal. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of Brinewrack's next turn. The first time the cursed target deals damage to any creature before then, it takes 14 (4d6) Piercing damage. Success: Half damage only.

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
[concept] signature elements: hexes that steal actions [behavior] | bog-brine body [body] | the evil eye
[reskin] signature idea (action): "Brinewrack hexes one enemy who can hear her, stealing a future from them: for a short while, whenever that enemy acts, they must first fight off a spectral memory of drowning or the action is wasted and a piece of their will is torn away and fed back to Brinewrack as vigor. The hex ends early if she hexes someone else, or when she takes a solid hit that breaks her concentration." [bonus_action/always/resource] — menu: aggro-curse, self-invisibility, rally (+ shelf: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into slow-bolt
[reskin] signature miss: action — "Brinewrack hexes one enemy who can hear her, stealing a future from them: for a short while, whenever that enemy acts, they must first fight off a spectral memory of drowning or the action is wasted and a piece of their will is torn away and fed back to Brinewrack as vigor. The hex ends early if she hexes someone else, or when she takes a solid hit that breaks her concentration." [bonus_action/always/resource] — the model found no template that holds it (offered: slow-bolt)
[reskin] value check: "Debt of Ruin" EV 10.9 vs floor 7.3 (one attack of 2) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Brinewrack's bog-brine body leaks fen-slick everywhere she goes: any creature that strikes her in melee has its grip fouled, its footing stolen, and its weapon arm numbed by clinging brine-slime, leaving it fumbling and exposed until it wipes the foulness away. The muck also pools around her, making the ground she haunts treacherous for those who chase her." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature template (trait): terrain-walk -> Traits/"Fen-Slick Stride" ("the muck pools around her, making the ground she haunts treacherous for those wh [verb: bog:concept, fen:idea]")
```


---

## Troll — a print donor

**Concept:** a troll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Troll | 5 (2014) | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Rend); nova none; dmg 34

```
Troll
Large giant, chaotic neutral
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

Regeneration. The troll regains 15 hit points at the start of each of its turns. If the troll takes Acid or fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 hit points and doesn't regenerate.
Loathsome Limbs. If the troll ends any turn below half its hit point maximum and took 15+ slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a Troll Limb. The limb acts immediately after the troll's turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains hit points.
Charge (Bonus Action). The troll moves up to half its Speed straight toward an enemy it can see.

Actions
Multiattack: The troll makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) slashing damage.
```

**Engine trace**

```
[route] brute-regenerator type=Giant mechanics=regeneration — brute-regenerator: ✓ ("a troll") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] cr from print: 5 — a print creature heads the words and the user set none
[concept] signature elements: regeneration that only fire or acid can stop [body] | savage multiattack with claws and bite [behavior] | lanky, lopping limbs that seize and rend [body]
[reskin] print canon route: "a troll" is the Troll — the regenerator seat stands down for the plain line
[reskin] print canon defenses: HP 95 -> 94, AC 13 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon modes: climb off — the Troll has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Troll's
[reskin] print canon senses: "darkvision 60 ft." — the Troll's
[reskin] print canon name: "Mireblood Thurse" -> "Troll" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "None" -> "Giant" — the Troll's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Troll's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Rend" — the Troll's own row
[reskin] print canon trait: Loathsome Limbs — "a troll" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---

## Warpath Ball — a homebrew with a nova

**Concept:** knife ball

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Warpath Ball | 2 (2014) | skirmisher-8-hurler | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 14 a round is 22% under the table's 18
- bands · soft · band: reads CR 0.625 (print at 2 reads 0.125–2.5, n=43)
- read: def 1/4 / off 1 → 0.625; sustained 10 (2 × Hooked Blades); nova Blade Burst 11; dmg 14

```
Warpath Ball
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

darkvision 60 ft., passive Perception 14

Languages: 

understands the languages of its creator but can't speak

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Slashing Advance. The warpath ball ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the warpath ball takes the Dash or Disengage action.

Actions
Multiattack: The warpath ball makes two attacks: one with its Hooked Blades and one with its Knife Fan. It can replace one attack with a use of Hooked Pull.
Hooked Blades: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.
Knife Fan: Ranged Weapon Attack: +3 to hit, range 30/90 ft., one target. Hit: 5 (1d8 + 1) slashing damage. Immediately after the attack, a hooked knife returns to the warpath ball's grasp.
Blade Burst (Recharge 5-6): The warpath ball hurls a hooked knife at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 11 (2d10) slashing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is also knocked prone on a failed save.
Hooked Pull: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — skirmisher-hurler: ✓ ("knife ball") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: hurled fan of hooked iron blades [behavior] | whirling shell of chained knives [body] | ricocheting mobility in combat [behavior]
[reskin] nova capped: "Hurled Burst" 13 → 11 (the chassis nova obeys the cap: 11 at CR 2)
[reskin] claim gate: CR 2 but a Construct body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The knife ball whirls in place and hurls a hooked blade at one foe, then yanks the fine chain to whip the knife back past a second enemy on the return — striking both, but the whip-around exposes the second target and lets the ball drag itself a short step toward whoever it just cut as the chain reels in. This ricochet shot can only reach a second target on the line between the ball and the first " [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: swallow, snare, reel, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 3.6 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any blade the knife ball has thrown this round is still chained to its whirling shell, so any foe who steps into the empty space behind the ball while a knife is out in the field gets lashed by the taut chain dragging back through that gap — the ball's shell grows more dangerous the more knives are loose, not less." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (knife)
[reskin] signature miss: trait — "Any blade the knife ball has thrown this round is still chained to its whirling shell, so any foe who steps into the empty space behind the ball while a knife is out in the field gets lashed by the taut chain dragging back through that gap — the ball's shell grows more dangerous the more knives are loose, not less." [trait/always/damage] — the model found no template that holds it (offered: assassinate)
[reskin] chassis nova: "Blade Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Staffsore — one marked soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Staffsore | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Staff
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff); nova none; dmg 22

```
Staffsore
Medium humanoid, chaotic neutral
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

	

14 (+2)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +4, Perception +3

Saving Throws: 

INT +4, WIS +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common and any three languages

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Actions
Multiattack: The staffsore makes two Staff attacks.
Staff: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage, and the target is subjected to the following effect. The target must make a DC 12 Constitution saving throw. On a failed save, the target has the Prone condition.
Staff Bind: One creature within 60 feet must make a DC 12 Dexterity saving throw. On a failed save, the target has the Restrained condition until the end of the staffsore's next turn.
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("he just hits people with his staff") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: two-handed staff bashing [behavior] | bitter ex-wizard [behavior] | bone-reinforced staff [object]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from brute, so the attack bonus and the spell DC key to one stat
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 14, WIS 12, CHA 11 — the Mage's, INT fitted to +4
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "The staffsore turns his fall into a rolling leg sweep, cracking his staff across the shins of anyone near — and he can only pull this off right after he himself has been knocked onto his back by someone else's attack." [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: gaze-single, snare, reel, condition-payoff, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally)
[reskin] signature miss: action — "The staffsore turns his fall into a rolling leg sweep, cracking his staff across the shins of anyone near — and he can only pull this off right after he himself has been knocked onto his back by someone else's attack." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: reel, obstacle-pull)
[reskin] value check: "Binding Lash" EV 6.1 vs floor 5.7 (one attack of 2) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The more badly he is bleeding and hurt, the more brutally hard he swings, feeding the pain straight back into his arm. He cannot cast spells anymore, but he can channel that bitter ruin into sheer blunt force." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Lost Sock Heap — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Lost Sock Heap | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Fold); nova none; dmg 24

```
Lost Sock Heap

Large Construct, Unaligned

AC 13
Initiative -1 (9)

HP 68 (8d10 + 24)

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

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft.; Passive Perception 12

Languages Speaks only in the language of socks

CR 3 (XP 700; PB +2)

Traits

Tremorsense of the Heap. The heap can pinpoint the location of moving creatures within 60 feet of itself.

Actions

Multiattack. The heap makes two Fold attacks. It can replace one attack with a use of Sock Snare.

Fold. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Sock Snare. Strength Saving Throw: DC 13, one creature within 30 feet that is Grappled by the heap. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Smother. The heap smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the heap, and takes 4 (1d8) Bludgeoning damage at the start of each of the heap's turns. The heap can have only one creature smothered at a time. If the heap takes 9 damage or more in a single turn from the smothered creature, the heap must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the heap. If the heap dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Construct mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: smothering engulf [behavior] | stinking aura of old socks [aura] | sentient pile of laundry [body]
[reskin] signature idea (action): "The heap moans a sour, sock-damp note that only noses understand, and the reek of unwashed wool rolls out from it in every direction. Anyone caught in the cloud gags and heaves, their eyes streaming, unable to hold a breath without tasting a gymnasium floor — and the more the heap is torn open and its innards spilled, the worse the stench becomes. It can keep the reek rolling as long as it stands," [action/always/condition] — menu: swallow, leap, condition-payoff, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The heap's body is a permanent, personal stench that clings like wet lint: anyone who comes up against it in melee, grapples it, or is pinned inside it finds their nose and throat filled with the rot of abandoned laundry. The closer and longer they stay, the more the smell worms into them — leaving them retching, off-balance, and easy prey to be folded up and buried. Even after they pull free, the" [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (smell, smells)
[reskin] signature template (trait): uncanny-sense -> Traits/"none" ("closest verb match — the stench is the heap's signature sense/clinging presence, [verb: smell:concept, smells:concept, nose:idea]")
```


---

## Grandmother Ash — bands soft

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | SOFT: print-rows | ok |

- bands · soft · band: reads CR 5.5 (print at 7 reads 4.5–8.5, n=6)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Actions/Nails
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Nails); nova Noxious Spew 22; dmg 50

```
Grandmother Ash
Medium fiend, neutral evil
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

Heated Body. A creature that touches Grandmother or hits it with a melee attack while within 5 feet of it takes 7 (2d6) poison damage.
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
[route] caster-binder (controller) type=Fey mechanics=breath — caster-binder: ✓ ("She can turn into a cloud of ash and cho") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: ash-cloud suffocation [behavior] | black rot-nails [body] | three crow sentinels [object]
[reskin] print canon route: the Night Hag's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Night Hag is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 16, INT 16, WIS 14, CHA 16 — the Night Hag's, DEX fitted to +6
[reskin] print canon: "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." heads on the Night Hag — print's rows ride along; the seat stays
[reskin] signature idea (action): "Grandmother Ash dissolves into a swirling cloud of burning ash that fills a space near her. Anyone caught in the cloud who needs to breathe feels the ash pour into their lungs, choking them from the inside; they are left gasping, unable to speak or cast spells until they tear themselves free. The cloud clings a moment, then she reforms from it, ready to strike." [action/save/condition] — menu: swallow, trample, leap, thrown-burst, gaze-single, snare, reel, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — spew (cloud of, breathes)
[reskin] signature bound by force: action — "spew" matches cloud of+breathes in the user's words; the model's none is overruled
[reskin] value check: "Noxious Spew (Recharge 5-6)" EV 58.3 vs floor 37.2 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: spew -> Actions/"Noxious Spew (Recharge 5-6)" ("exact concept match [verb: cloud of:concept, breathes:concept]")
[reskin] signature idea (trait): "The black rot on Grandmother's nails spreads into any wound she opens. A creature she strikes with her nails begins to putrefy from within; for a short while afterward, any healing it receives is wasted, and the stench of its own decay betrays it to her crows." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (burn, fire)
[reskin] signature bound by force: trait — "heated-body" matches burn+fire in the user's words; the model's none is overruled
[reskin] signature template (trait): heated-body -> Traits/"Heated Body" ("exact concept match [verb: burn:concept, fire:concept]")
[reskin] print canon type: Fey -> Fiend — the Night Hag's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "Abyssal, Common, Infernal, Primordial" — the Night Hag's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Night Hag's walk; the concept's other modes stay
[reskin] print canon defenses: immunities Poison; Poisoned -> Charmed; resistances none -> Cold, Fire — the Night Hag's own header lines
[reskin] print canon trait: Soul Bag — "Grandmother Ash — An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders." is the Night Hag (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Ash Drift" is the seat's, not the Night Hag's
[reskin] print canon row: Actions/Spellcasting — the Night Hag's own
[reskin] print canon row: Actions/Nightmare Haunting (1/Day; Requires Soul Bag) — the Night Hag's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Night Hag's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Night Hag's Shape-Shift
```
