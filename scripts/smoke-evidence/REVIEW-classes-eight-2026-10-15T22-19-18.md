# Review batch — classes-eight-2026-10-15T22-19-18

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Palm Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Rookery Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/7 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sarn Feldmark | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Kargath Stonewroth | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Aldous | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Veyr Sable | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathmender Marisel | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/6 |
| Kurohaba | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/7 |
| Frostmaw Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Lockpick Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Maze Warden | 6 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/8 |
| Shield Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 1/1 | 3/4 |
| Wary Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 61% (51/83 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / reader: 1



---

## Frostmaw Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Frostmaw Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Frostmaw Pack

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The pack has Advantage on an attack roll against a creature if at least one of the pack's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Predatory Focus (2/Day). The pack has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: coordinated pack tactics: one wolf darts in and out while others flank and delay [behavior] | frozen northern hide and chilling breath [body] | the encircling howl that signals the hunt [aura]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "When the pack strikes, it does not strike as one but as a rotating wheel: each wolf lunges in at the target's flank, slashes, then peels back so the next can take its place before the prey can turn to face the new threat. Until the pack's next turn, the wounded quarry staggers off-balance, its footing unsure and its attention dragged in two directions at once." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Predatory Focus (2/Day)" ("the pack's own verb is 'hunt' — it focuses its hunt into Advantage on its next a [verb: hunt:concept]")
[reskin] signature idea (trait): "The pack's breath carries the killing cold of the northern reaches, and any creature that stays within the pack's encirclement feels the frost sinking into its limbs — slowing its reactions, stiffening its muscles, and making every moment in the ring feel like standing in a blizzard." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "The pack's breath carries the killing cold of the northern reaches, and any creature that stays within the pack's encirclement feels the frost sinking into its limbs — slowing its reactions, stiffening its muscles, and making every moment in the ring feel like standing in a blizzard." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
```


---

## Oathmender Marisel — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathmender Marisel | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "smites the unclean"
- read: def 6 / off 8 → 7; sustained 54 (3 × Consecrated Blade); nova none; dmg 54

```
Oathmender Marisel

Medium Humanoid, Lawful Good

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

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
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Marisel, Marisel and its allies have Advantage on attack rolls and saving throws, provided Marisel doesn't have the Incapacitated condition.

Actions

Multiattack. Marisel makes three attacks, using Consecrated Blade or Heavy Oathblow in any combination.

Consecrated Blade. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Heavy Oathblow. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Marisel touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Marisel charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

Mending Oathpulse (2/Day). Each ally within 30 feet of Marisel gains 9 (2d8) Temporary Hit Points.

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
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: smites the unclean [behavior] | mends her soldiers [behavior] | oathsworn iron zeal [aura]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Marisel drives her consecrated blade into the ground at her feet, and the iron of her oath rings out through the earth to every soldier sworn to her banner. Each ally who can see or hear her feels the mending surge through their wounds, closing cuts and steadying their stance, while the unclean caught in the same pulse flinch back as if the ground itself rejects them. The wound-knitting is the tru" [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] value check: "Mending Oathpulse (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Mending Oathpulse (2/Day)" ("The wound-knitting is the true effect: an oath-ring pulse that mends each ally s [verb: mend:concept]")
[reskin] signature idea (trait): "Once Marisel has marked an unclean creature with her smite, she will not let it slip the field alive — her next blow against that same foe carries the weight of her broken altar and every oath she has sworn since. The mark fades only when the creature falls or she does." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Once Marisel has marked an unclean creature with her smite, she will not let it slip the field alive — her next blow against that same foe carries the weight of her broken altar and every oath she has sworn since. The mark fades only when the creature falls or she does." [trait/always/damage] — the model found no template that holds it (offered: warded-mending)
```


---

## Sarn Feldmark — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn Feldmark | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "bashes with a buckler"
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sarn Feldmark
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

112 (25d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

11 (+0)

	

8 (-1)

	

11 (+0)

	

8 (-1)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, Sarn regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Sarn misses it with a melee attack roll, Sarn makes one Longsword attack against that creature.

Actions
Multiattack: Sarn makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Sarn's next turn.
Shield Bash: One creature within 5 feet that Sarn can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler bash that staggers and pins [behavior] | longsword counter on anyone who overcommits [object] | a hard-bitten veteran's refusal to give ground [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "When Sarn's Shield Bash sends a creature sprawling, he immediately follows the falling body with a short, chopping cut meant to keep it down. This cut lands as the same sort of punishing stroke his longsword deals, and the creature cannot easily scramble back to its feet while he looms over it." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature miss: action — "When Sarn's Shield Bash sends a creature sprawling, he immediately follows the falling body with a short, chopping cut meant to keep it down. This cut lands as the same sort of punishing stroke his longsword deals, and the creature cannot easily scramble back to its feet while he looms over it." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, exploiter, own-turn-punisher, rally)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sarn's longsword riposte leaves a creature hanging — for a moment, that enemy's own guard is broken by the counter. While it is so exposed, any further attack it makes against Sarn is thrown off balance." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Sarn's longsword riposte leaves a creature hanging — for a moment, that enemy's own guard is broken by the counter. While it is so exposed, any further attack it makes against Sarn is thrown off balance." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Drowned Palm Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Palm Adept | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Drowned Palm Adept

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 40 ft.

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
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The adept can hold its breath for 15 minutes.

Swamp Skulker. The adept ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The adept makes two attacks, using Open Palm or Finger Dart in any combination. It can replace one attack with a use of Opportunist's Lash.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn.

Finger Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Opportunist's Lash. Strength Saving Throw: DC 13, one creature within 30 feet that is Stunned. Failure: 14 (4d6) Piercing damage. Success: Half damage.

Bonus Actions

Fleet Agility. The adept takes the Dash or Disengage action.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pressure-point strikes that paralyze and weaken [behavior] | open-hand martial arts with bone-hardened palms [body] | lizardfolk swamp monk training [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "The adept reaches out and presses its open palm against a creature, momentarily sealing its flow of breath and motion. Until the end of the adept's next turn, that creature cannot willingly move from its current spot and has trouble drawing on its own strength or speed." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] signature miss: action — "The adept reaches out and presses its open palm against a creature, momentarily sealing its flow of breath and motion. Until the end of the adept's next turn, that creature cannot willingly move from its current spot and has trouble drawing on its own strength or speed." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The adept has learned to read the small tells of a body in pain. Whenever it lands a strike against a creature already reeling from its pressure-point work, the adept's next attack against that same creature slips past its guard more easily." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The adept has learned to read the small tells of a body in pain. Whenever it lands a strike against a creature already reeling from its pressure-point work, the adept's next attack against that same creature slips past its guard more easily." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Rookery Stalker — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rookery Stalker | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Rookery Stalker

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
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
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Faultless Tracker. The stalker knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasive Stride. The stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The stalker makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The stalker takes the Dash, Disengage, or Hide action.

Predatory Focus (2/Day). The stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: stalking the rooftops of the old quarter [behavior] | infernal blood granting unnatural stealth and teleportation [body] | a brace of poisoned throwing knives [object]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The stalker marks the most wounded enemy it can see as its prey and vanishes into the shadows of the rooftops, then reappears somewhere along the skyline to hurl a blade at that marked target. Until the hunt ends, the stalker knows exactly where its prey is and can slip through the cracks of the old quarter to close in on it, no matter how far it runs." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "The stalker marks the most wounded enemy it can see as its prey and vanishes into the shadows of the rooftops, then reappears somewhere along the skyline to hurl a blade at that marked target. Until the hunt ends, the stalker knows exactly where its prey is and can slip through the cracks of the old quarter to close in on it, no matter how far it runs." [action/always/condition] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Infernal blood lets the stalker taste a foe's fear on the wind; whenever a creature within the old quarter is wounded and tries to run or hide from it, the stalker senses the spilling blood and instinctively knows the direction and distance to that prey, even through walls and rooftops." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("The stalker senses spilling blood and instinctively knows the direction and dist [verb: stalks:concept, stalk:concept]")
[reskin] print canon alignment: Lawful Evil -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Poisoned Dagger" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Thrown Knife" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Sentinel" [catalog: uncanny-sense]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Sentinel: The stalker can pinpoint the location of moving creatures within 60 feet of itself.
provenance: catalog template "uncanny-sense"
```


---

## Maze Warden — a homebrew with a nova

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Maze Warden | 6 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 33 (3 × Gore); nova Hurl Spear 33; dmg 44

```
Maze Warden

Large Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 102 (12d10 + 36)

Speed 50 ft.

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
18
+4
+7
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

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the warden has Advantage on attack rolls and saving throws.

Labyrinth Stride. The warden ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The warden makes three attacks, using Gore or Spear in any combination. It can replace one attack with a use of Impaling Strike.

Gore. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.

Spear. Ranged Attack Roll: +7, range 20/60 ft. 8 (1d8 + 4) Piercing damage. Hit or Miss: Immediately after the attack, a spear returns to the warden's grasp.

Hurl Spear (Recharge 5-6). The warden hurls a spear at a point it can see within 90 feet. Dexterity Saving Throw: DC 14, each creature in a 5-foot-radius Sphere centered on that point. Failure: 33 (6d10) Piercing damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Impaling Strike. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 9 (2d8) Piercing damage. Success: Half damage.

Bonus Actions

Fleet Agility. The warden takes the Dash or Disengage action.

Charge. The warden moves up to half its Speed straight toward an enemy it can see.

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
[route] skirmisher-hurler type=Monstrosity mechanics=thrown-weapon, snare — skirmisher-hurler: ✓ ("herds prey into the maze") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: herds prey into maze dead ends [behavior] | thrown nets and hunting spears [object] | bone-horned minotaur reaver [body]
[reskin] nova capped: "Hurled Burst" 36 → 33 (the chassis nova obeys the cap: 33 at CR 6)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] signature idea (action): "The warden picks its moment and rakes a broad arc of broken ground with its horns, turning a straight corridor into a churned funnel. Anyone caught in the sweep is hooked, shoved, and dragged a short way along the path the warden chooses, which is always deeper into the maze or away from the group. The move keys off the fear already seeded by its spears: a herd that scatters at the mouth of a pass" [action/save/movement] — menu: snare, condition-payoff, throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Opportunist's Lash" EV 7 vs floor 5.7 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The labyrinth has no map the warden needs: once it has drawn blood from a creature, it always knows the shortest twisting route to that creature while both are in the maze, reading turns and dead ends as if they were painted on the inside of its skull. It cannot be shaken by fleeing, doubling back, or hiding in a side passage it has already claimed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Hurl Spear (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
INT
11
+0
+0
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
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Shieldwall Bulwark (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] signature elements: holds the line with shield and longsword [behavior] | punishes anyone who tries to move past [behavior] | iron shield and blade [object]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "When Dame Oriel plants her shield, she becomes an unbreakable anchor on the battlefield. Enemies within her reach find their movement suddenly arrested as if they struck an invisible wall, forced to stop and face her. This effect lasts until she lowers her shield or is forced to move, turning her into a living barricade that enemies must either break or go around." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Shieldwall Bulwark (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Shieldwall Bulwark (2/Day)" ("protecting allies with the shield grants them temporary hit points [verb: shield:concept]")
[reskin] signature idea (trait): "Dame Oriel's … is not just defense; it is a weapon of control. Whenever she blocks an attack with her …, the force of the blow is redirected into a punishing counter that leaves her attacker exposed and off-balance. Even in defeat, her stance remains a threat." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Dame Oriel's … is not just defense; it is a weapon of control. Whenever she blocks an attack with her …, the force of the blow is redirected into a punishing counter that leaves her attacker exposed and off-balance. Even in defeat, her stance remains a threat." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
```


---

## Kargath Stonewroth — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kargath Stonewroth | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Maul); nova none; dmg 54

```
Kargath Stonewroth

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

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
6
-2
-2

Skills Athletics +8, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Kargath starts its turn Bloodied, roll 1d6. On a 6, Kargath goes berserk. On each of its turns while berserk, Kargath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Kargath attacks an object. Once Kargath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Kargath has Advantage on attack rolls and saving throws.

Glacier Stride. Difficult Terrain composed of ice or snow doesn't cost Kargath extra movement, and Kargath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Kargath makes two attacks, using Maul or Boulder in any combination.

Maul. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Boulder. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Avalanche Charge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Kargath moves up to half its Speed without provoking Opportunity Attacks, and it makes one Maul attack.

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
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: lash out when wounded [behavior] | stone-hardened body [body] | massive stone maul [object]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "When an enemy's blow lands on Kargath, its mountain heritage answers in kind: it swings its maul in a wide, punishing arc at that attacker, heedless of defence. This lash comes without thought and can reward only the first coward bold enough to wound it in that moment." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage (wound)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rampage
[reskin] signature miss: action — "When an enemy's blow lands on Kargath, its mountain heritage answers in kind: it swings its maul in a wide, punishing arc at that attacker, heedless of defence. This lash comes without thought and can reward only the first coward bold enough to wound it in that moment." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rampage)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The instant Kargath's rage takes hold, the stone in its blood hardens its hide. While that frenzy lasts, weapons that strike it turn aside as if against granite, and even magic struggles to find purchase." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "The instant Kargath's rage takes hold, the stone in its blood hardens its hide. While that frenzy lasts, weapons that strike it turn aside as if against granite, and even magic struggles to find purchase." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst)
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Maul" reach 10 -> 5 ft. — reach follows the goliath's size
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+1
CHA
13
+1
+1

Skills Perception +6, Stealth +7

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language, Celestial

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Dawn Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers with radiant dawn-prayers [behavior] | iron-shod shield and mace [object] | the Dawn Antiphon chant that mends and ignites [aura]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth sweeps her shield low and speaks a prayer over the wounded. One bloodied soldier of her choice is wreathed in morning light: their open wounds knit shut, and the next time that soldier lands a blow, a crack of dawnfire leaps from the wound, burning the enemy for radiant damage. The blessing lingers until the soldier strikes or until the sun next rises." [action/always/resource] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Dawn Blessing (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Dawn Blessing (2/Day)" ("A templar priest who blesses her soldiers, granting them protection in battle; t [verb: blessing:concept, bless:concept, shield:idea, prayer:idea]")
[reskin] signature idea (trait): "Whoever dares to strike Vareth in melee and draws her attention is repaid by the iron edge of her shield, and the blow they land staggers them just enough that her own next swing against them comes faster and truer. The rebuke only reaches those who close within arm's reach, never those who fight her at range." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whoever dares to strike Vareth in melee and draws her attention is repaid by the iron edge of her shield, and the blow they land staggers them just enough that her own next swing against them comes faster and truer. The rebuke only reaches those who close within arm's reach, never those who fight her at range." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Shield Cast" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Shielded Advance" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage. If the target is within 30 feet of an ally of Vareth, the attack deals an extra 5 (2d4) Radiant damage.
provenance: none — the call wrote the text itself
```


---

## Brother Aldous — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Aldous | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Aldous

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Aldous makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Aldous's next turn.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: shield-first line holding [behavior] | mace and battered iron plate [object] | vow of silence and poverty [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Aldous plants his feet and drives his shield forward in a straight, brutal line. Anyone directly in front of him is thrown back and left stumbling, and the shove of the shield carries Aldous right behind it, so he ends up exactly where the line needs him—blocking the gap, body between the enemy and whatever he is sworn to hold." [rider/on_hit/movement] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When Aldous is hurt, his battered plate and dented helm bind tighter instead of breaking. Each wound makes him more deliberate and harder to move off his ground, so the longer the fight drags, the more the doorway belongs to him." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When Aldous is hurt, his battered plate and dented helm bind tighter instead of breaking. Each wound makes him more deliberate and harder to move off his ground, so the longer the fight drags, the more the doorway belongs to him." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Rock" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Veyr Sable — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Veyr Sable | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Shade Dagger); nova none; dmg 36

```
Veyr Sable

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Veyr makes three Shade Dagger attacks.

Shade Dagger. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 12 (2d8 + 3) Piercing damage.

Spellcasting. Veyr casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Veyr casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). Veyr teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Veyr is hit by an attack roll. Response: Veyr casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("never where you struck") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: stepping away from any strike [behavior] | shadow-stuff body that lingers after teleport [body] | dagger of hardened shade [object]
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "When Veyr steps away by shadow, he can leave behind a copy of himself woven from the darkness he passes through. This double stands where he last was, draws the next blow meant for him, and then dissolves into shreds of shade that lash out at anyone foolish enough to strike it. It lasts only long enough to fool one attacker into overcommitting before it scatters and Veyr is already gone." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" ("the concept's own verb (step) is exactly the template's verb: a wizard who is ne [verb: step:concept, shadow:idea]")
[reskin] signature idea (trait): "Every time Veyr slips through a shadow to escape a hit, the seam of darkness he passes through clings to him for a breath, making him harder to pin down until the start of his next turn. Those who swing at where he was feel their weapon drag through that clinging shade, throwing off their next strike." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Every time Veyr slips through a shadow to escape a hit, the seam of darkness he passes through clings to him for a breath, making him harder to pin down until the start of his next turn. Those who swing at where he was feel their weapon drag through that clinging shade, throwing off their next strike." [trait/on_being_hit/defense] — the model found no template that holds it (offered: evasion)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Thurivald
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

15 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Wounded Anthem. While Thurivald has half of its hit points or fewer, it has advantage on attack rolls.
Aura of Authority. While within 10 feet of Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Longsword and one with Warband Roar. It can replace one attack with a use of Opportunist's Lash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Warband Roar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) thunder damage.
Opportunist's Lash: One creature within 30 feet of Thurivald that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: the war-song that furies allies [behavior] | fighting shoulder-to-shoulder with the warband [behavior] | blood-soaked voice and blade [body]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald lets out a wordless battle-cry, and every ally who can hear his voice feels the old fury surge through their limbs. Until the end of the fight, those allies lash out with an extra strike whenever they attack, though the fury fades if Thurivald himself is ever silenced." [action/once_per_fight/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald lets out a wordless battle-cry, and every ally who can hear his voice feels the old fury surge through their limbs. Until the end of the fight, those allies lash out with an extra strike whenever they attack, though the fury fades if Thurivald himself is ever silenced." [action/once_per_fight/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, own-turn-punisher)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's voice and blade are soaked in the blood of the fallen. Whenever he lands a blow on an enemy that is already hurt, his song swells with their pain, and for a breath he fights harder than any mortal should." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature template (trait): bloodied-fury -> Traits/"Bloodied Anthem" ("Thurivald fights harder than any mortal should whenever he lands a blow on an al [verb: fury:concept, bloodied:idea, fights harder:idea]")
```


---

## Kurohaba — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kurohaba | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Kurohaba

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 50 ft.

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
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If Kurohaba is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kurohaba instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Kurohaba has Advantage on attack rolls against any creature that hasn't taken a turn. If Kurohaba hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow Step. Kurohaba ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kurohaba makes two attacks, using Tanto or Shuriken in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Kurohaba takes the Dash, Disengage, or Hide action.

Shadow Blink (Recharge 4-6). Kurohaba teleports up to 40 feet to an unoccupied space it can see.

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
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("a ninja who moves through the shadows an") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: shadow-teleport behind enemies [behavior] | poisoned blade [object] | shadow-flesh body [body]
[reskin] signature idea (action): "Kurohaba slashes with a tanto coated in shadow-venom that clings to the wound. A creature struck by this attack is marked by lingering poison; while marked, it cannot benefit from being hidden from Kurohaba, and Kurohaba always knows its exact location. The mark lasts until the creature receives magical healing or finishes a short rest." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, blink, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — blink, self-invisibility (shadow, unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into blink, self-invisibility
[reskin] value check: "Shadow Blink (Recharge 4-6)" EV 3.5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: blink -> Bonus Actions/"Shadow Blink (Recharge 4-6)" ("The idea is a ninja who moves through the shadows, striking unseen — the shadow  [verb: shadow:concept]")
[reskin] signature idea (trait): "Kurohaba can blend into any …, even those cast by creatures. While in dim light or darkness, it can take the Hide action even when observed, and its first attack from hiding each round deals extra poison damage. This poison also silences the victim, preventing them from calling out for help until the end of their next turn." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "Kurohaba can blend into any …, even those cast by creatures. While in dim light or darkness, it can take the Hide action even when observed, and its first attack from hiding each round deals extra poison damage. This poison also silences the victim, preventing them from calling out for help until the end of their next turn." [trait/always/damage] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Lockpick Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lockpick Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 6 → 4; sustained 40 (2 × Sting); nova none; dmg 40

```
Lockpick Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 76 (17d6 + 17)

Speed 20 ft., Fly 40 ft.

MOD
SAVE
STR
6
-2
-2
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+6
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
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The imp takes the Disengage or Hide action.

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
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: shadowy stiletto strikes from hiding [behavior] | master lockpick and trap-disarmer [object] | fearful bargainer when cornered [behavior]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp marks a single creature as its prey, slipping its stiletto into the target's shadow instead of its body. The prey feels a cold point press against its own shadow at all times, and when it starts its turn with the imp unseen by it, the waiting blade springs—poison bleeding through the link as if struck from behind. The imp can keep this mark on only one creature, and it drops if the imp is " [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The imp marks a single creature as its prey, slipping its stiletto into the target's shadow instead of its body. The prey feels a cold point press against its own shadow at all times, and when it starts its turn with the imp unseen by it, the waiting blade springs—poison bleeding through the link as if struck from behind. The imp can keep this mark on only one creature, and it drops if the imp is " [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending, delayed-brand, leap, patient-defense, aggro-curse, self-invisibility, feint-slip, coating)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.3 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "No lock, latch, or trap can hold the imp's fingers. Anything locked or trapped it touches clicks open or goes inert, and if it has seen a lock or trap before it can key the same opening into its stiletto, so its next strike against whatever that lock or trap protected rings with a poisoned echo and springs whatever was meant to stay shut." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "No lock, latch, or trap can hold the imp's fingers. Anything locked or trapped it touches clicks open or goes inert, and if it has seen a lock or trap before it can key the same opening into its stiletto, so its next strike against whatever that lock or trap protected rings with a poisoned echo and springs whatever was meant to stay shut." [trait/always/condition] — the model found no template that holds it (offered: sealed-body)
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Keyhole Step" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Shield Errant — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shield Errant | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity |

- reader · fail · multiattack-integrity: Multiattack's attack slot names "Tower Shield", which is not an attack row on this sheet
- read: def 6 / off 8 → 7; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Shield Errant

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
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
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the shield errant, the shield errant and its allies have Advantage on attack rolls and saving throws, provided the shield errant doesn't have the Incapacitated condition.

Actions

Multiattack. The shield errant makes two attacks, using Tower Shield or Greatsword in any combination.

Tower Shield. Strength Saving Throw: DC 15, one creature within 5 feet that the shield errant can see. Failure: 13 (3d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the shield errant gains 13 (3d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] signature elements: tower shield bodyguard [behavior] | iron-plated knight [body] | punishes movement past it [behavior]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "When the errant strikes the creature it has just knocked down with its tower shield, the blow lands with the weight of a failed oath—savagely harder than a normal hit. Only that one shamed, prone foe suffers it; the errant's fury is reserved for those it has already put flat." [rider/on_hit/damage] — menu: EMPTY (+ shelf: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, condition-payoff, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature bound by force: action — "rally" matches shield+orders in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: shield:concept, orders:concept]")
[reskin] signature idea (trait): "Standing its ground, the errant is plated in more than steel: whenever a foe it can see tries to slip past its guard and fail to get by, the opening is too good to resist and the errant answers with a free, punishing cut. It never happens more than once in the same instant, and only to the one who failed to get through." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Standing its ground, the errant is plated in more than steel: whenever a foe it can see tries to slip past its guard and fail to get by, the opening is too good to resist and the errant answers with a free, punishing cut. It never happens more than once in the same instant, and only to the one who failed to get through." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
```


---

## Wary Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Wary Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Wary Whisker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 50 ft.

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

Languages Common

CR 3 (XP 700; PB +2)

Traits

Crowdstep. The whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The whisker makes two attacks, using Dagger or Sling in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. The whisker takes the Dash, Disengage, or Hide action.

Slippery Sidestep. The whisker takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: strikes from hiding [behavior] | feline agility [behavior] | hidden blade [object]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The whisker makes a hidden blade attack that turns a hit into a bleeding cut. The wound keeps bleeding until the target shakes it off, but each time it does, the whisker can use the distraction to slip away into the crowd." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Slippery Sidestep" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Slippery Sidestep" ("slips through the market crowd — Disengage action plus a follow-up defensive edg [verb: slip:concept]")
[reskin] signature idea (trait): "Whenever the whisker attacks while hidden, the strike lands especially true. A foe that has not yet seen it in this fight is easier to cut down, and even if the blow misses, the whisker remains hidden long enough to … away untouched." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Whenever the whisker attacks while hidden, the strike lands especially true. A foe that has not yet seen it in this fight is easier to cut down, and even if the blow misses, the whisker remains hidden long enough to … away untouched." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```
