# Review batch — classes-eight-2026-10-16T06-56-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kasksa the Slow Bone | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Verel of the Old Quarter | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Serga Whitlock | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Vorgath the GriefWound | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Iron Chapter Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Reflected Advisor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Ashvowed Sera | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Shadow-Blade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/7 |
| Cliff Herder | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Lockspring Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Marrow Maze | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wall of the Broken Oath | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Sable Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/5 |

**Dropped 3 of 19 user clauses** (coverage 84%); concept share 72% (56/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1



---

## Cliff Herder — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cliff Herder | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Cliff Herder

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

Pack Tactics. The herder has Advantage on an attack roll against a creature if at least one of the herder's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The herder makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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
[route] skirmisher type=Beast mechanics=grapple — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack tactics [behavior] | hit-and-run harrying [behavior] | dire wolf pack hunter [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The herder lets out a sharp, commanding howl that only its packmates understand, directing one of them to snap at a nearby creature. A beast that obeys this signal opens a hole in the prey's guard, leaving it reeling long enough for the herder to immediately slip in and bite it as well. The howl carries no magic; it is pure, practiced wolf language." [action/always/condition] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature miss: action — "The herder lets out a sharp, commanding howl that only its packmates understand, directing one of them to snap at a nearby creature. A beast that obeys this signal opens a hole in the prey's guard, leaving it reeling long enough for the herder to immediately slip in and bite it as well. The howl carries no magic; it is pure, practiced wolf language." [action/always/condition] — the model found no template that holds it (offered: focus, trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, feint-slip, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the herder sees a packmate attacking a creature that has been backed against a wall, ledge, or other solid obstacle, it instinctively rushes that same creature, knowing the prey has nowhere left to run. The moment an ally wounds a cornered target, the herder closes in to finish the job." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Whenever the herder sees a packmate attacking a creature that has been backed against a wall, ledge, or other solid obstacle, it instinctively rushes that same creature, knowing the prey has nowhere left to run. The moment an ally wounds a cornered target, the herder closes in to finish the job." [trait/always/movement] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Stalker" is the seat's, not the Dire Wolf's
```


---

## Ashvowed Sera — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Sera | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Greatsword); nova none; dmg 54

```
Ashvowed Sera

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

Aura of Authority. While in a 10-foot Emanation originating from Sera, Sera and its allies have Advantage on attack rolls and saving throws, provided Sera doesn't have the Incapacitated condition.

Actions

Multiattack. Sera makes three attacks, using Greatsword or Radiant Burst in any combination.

Greatsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Radiant Burst. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Radiant damage.

Bonus Actions

Lay on Hands (2/Day). Sera touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Sera charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Grievous Edge (2/Day). Sera charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

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
[concept] signature elements: smites that sear the unclean [behavior] | battlefield oath that hardens her troops [aura] | worn iron plate and blessed blade [object]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Sera plants her banner and roars the battlefield oath, binding her soldiers into one unbroken line. For as long as she stands and keeps fighting, her allies who hold their ground beside her cannot be broken, terrified, or turned against her, and any wound that would fell one of them is instead carried by the whole line together." [action/once_per_fight/defense] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature miss: action — "Sera plants her banner and roars the battlefield oath, binding her soldiers into one unbroken line. For as long as she stands and keeps fighting, her allies who hold their ground beside her cannot be broken, terrified, or turned against her, and any wound that would fell one of them is instead carried by the whole line together." [action/once_per_fight/defense] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse)
[reskin] value check: "Venomed Edge (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: coating -> Bonus Actions/"Venomed Edge (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sera refuses to fall while the line still needs her: when she would be struck down, she plants her sword, swears the oath again aloud, and rises with the last of her strength until every ally she can see has been shielded or avenged." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Sera refuses to fall while the line still needs her: when she would be struck down, she plants her sword, swears the oath again aloud, and rises with the last of her strength until every ally she can see has been shielded or avenged." [trait/on_being_hit/defense] — the model found no template that holds it (offered: warded-mending, absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
```


---

## Serga Whitlock — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Serga Whitlock | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Serga Whitlock
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

Common, Dwarvish

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, Serga regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Serga misses it with a melee attack roll, Serga makes one Longsword attack against that creature.

Actions
Multiattack: Serga makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Serga's next turn.
Shield Bash: One creature within 5 feet that Serga can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: longsword discipline [object] | buckler bash that stops movement [behavior] | holds the line under pressure [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "When a foe turns to run, Serga does not chase. She slams her buckler into their back, and the whole fight shifts a step toward her — she advances, allies are dragged along, and anyone who wants a piece of her has to come through the blade first. She holds that new front, and the next fool who lunges gets opened up." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "When a foe turns to run, Serga does not chase. She slams her buckler into their back, and the whole fight shifts a step toward her — she advances, allies are dragged along, and anyone who wants a piece of her has to come through the blade first. She holds that new front, and the next fool who lunges gets opened up." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: hook-rider, obstacle-pull, herd)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Serga's longsword does not just cut — it teaches. Every clean strike leaves a mark that makes her next attack against that same opponent land harder, as if she is reading their fear and hitting exactly where they flinch. She has to keep her attention on that one target; the lesson fades if she looks away." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Serga's longsword does not just cut — it teaches. Every clean strike leaves a mark that makes her next attack against that same opponent land harder, as if she is reading their fear and hitting exactly where they flinch. She has to keep her attention on that one target; the lesson fades if she looks away." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon languages: "Common, Dwarvish" -> "Common, Dwarvish" — the Warrior Infantry's plus the concept's Dwarvish
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Kasksa the Slow Bone — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kasksa the Slow Bone | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Kasksa the Slow Bone

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

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

Hold Breath. Kasksa can hold its breath for 15 minutes.

Slippery Guard. Kasksa ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kasksa makes two attacks, using Open Palm or Tail Flick in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Kasksa's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Kasksa's next turn.

Tail Flick. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Bludgeoning damage.

Bonus Actions

Fleet Agility. Kasksa takes the Dash or Disengage action.

Coiled Lunge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Kasksa moves up to half its Speed, and it makes one Open Palm attack.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: open-hand pressure-point strikes [behavior] | scaled lizardfolk body [body] | disciplined skirmishing [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "Kasksa lashes out with its tail to sweep an enemy off balance, tripping them to the ground and leaving them vulnerable to a follow-up open-palm strike. The sweep can be done in place of a normal attack, and if it works the target is knocked prone." [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature miss: action — "Kasksa lashes out with its tail to sweep an enemy off balance, tripping them to the ground and leaving them vulnerable to a follow-up open-palm strike. The sweep can be done in place of a normal attack, and if it works the target is knocked prone." [rider/on_hit/condition] — the model picked "pounce" (no verb) over a concept-verb template (riposte)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kasksa's scaled body instinctively hardens and slips when grabbed or restrained, making it difficult to hold. Each time an attempt to grapple or restrain it is made, there is a good chance it slides free." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Kasksa's scaled body instinctively hardens and slips when grabbed or restrained, making it difficult to hold. Each time an attempt to grapple or restrain it is made, there is a good chance it slides free." [trait/on_being_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Verel of the Old Quarter — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Verel of the Old Quarter | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Verel of the Old Quarter

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

Assassinate. During the first round of each combat, Verel has Advantage on attack rolls against any creature that hasn't taken a turn. If Verel hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Skirmisher. Verel ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Verel makes two attacks, using Shortsword or Hand Crossbow in any combination. It can replace one attack with a use of Assassin's Mark.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Assassin's Mark. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of Verel's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

Bonus Actions

Cunning Action. Verel takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks") | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: rooftop stalking [behavior] | infernal shadow [body] | thrown knives [object]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Verel marks its prey before the fight even begins — a guild merchant or watch captain glimpsed from the rooftops becomes its quarry. Once per fight, as Verel strikes that marked quarry, the wound is unnervingly precise: the target's vision blurs and its ears fill with the old quarter's distant noise, leaving it unable to track Verel or call for help. The mark ends the moment Verel is badly wounded" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature miss: action — "Verel marks its prey before the fight even begins — a guild merchant or watch captain glimpsed from the rooftops becomes its quarry. Once per fight, as Verel strikes that marked quarry, the wound is unnervingly precise: the target's vision blurs and its ears fill with the old quarter's distant noise, leaving it unable to track Verel or call for help. The mark ends the moment Verel is badly wounded" [rider/on_hit/condition] — the model found no template that holds it (offered: focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, delayed-brand, rampage, aggro-curse, feint-slip)
[reskin] value check: "Creeping Dread" EV 12.4 vs floor 9.4 (one attack of 2) — dice 9 → 18
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Verel's infernal blood keeps a thin veil of shadow wrapped around it — the dimmer the light, the harder it is to hold a bead on. While in darkness or shadow, anyone trying to track Verel by sight or land a ranged attack against it from afar finds their aim sliding off, as if the shadows lean in to hide its shape." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "Verel's infernal blood keeps a thin veil of shadow wrapped around it — the dimmer the light, the harder it is to hold a bead on. While in darkness or shadow, anyone trying to track Verel by sight or land a ranged attack against it from afar finds their aim sliding off, as if the shadows lean in to hide its shape." [trait/always/defense] — the model picked "blurred-form" (no verb) over a concept-verb template (faultless-tracker)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Kukri" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Throwing Knives" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: spider-climb]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Verel has Advantage on attack rolls against any creature that hasn't taken a turn. If Verel hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Verel can climb difficult surfaces, including along ceilings, without needing to make an ability check.
provenance: catalog template "spider-climb"
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

Bolstering Cry (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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
[concept] signature elements: immovable shield-wall [object] | sword-and-shield line defense [behavior] | punishes any who slip past [behavior]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Oriel plants her shield and declares a line across the ground: a lane of open floor in front of her that she dares enemies to cross. Until she is broken, the first enemy who steps into that lane each turn is shoved back hard the moment they try to slip past her." [action/once_per_fight/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature miss: action — "Oriel plants her shield and declares a line across the ground: a lane of open floor in front of her that she dares enemies to cross. Until she is broken, the first enemy who steps into that lane each turn is shoved back hard the moment they try to slip past her." [action/once_per_fight/movement] — the model picked "push-prone" (no verb) over a concept-verb template (rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Oriel hits a creature with her longsword, she can redirect the blow's force to slam it backward, keeping it pinned on the far side of her shield line." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever Oriel hits a creature with her longsword, she can redirect the blow's force to slam it backward, keeping it pinned on the far side of her shield line." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Vorgath the GriefWound — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vorgath the GriefWound | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 50 (2 × Greataxe); nova none; dmg 50

```
Vorgath the GriefWound

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

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Vorgath starts its turn Bloodied, roll 1d6. On a 6, Vorgath goes berserk. On each of its turns while berserk, Vorgath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Vorgath attacks an object. Once Vorgath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Vorgath has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Vorgath extra movement, and Vorgath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Vorgath makes two attacks, using Greataxe or Hurlaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 11 (2d10) Cold damage. If the target is a creature and doesn't already have a spiteful wound, it is subjected to the following effect. Constitution Saving Throw: DC 16. Failure: The target receives a spiteful wound. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 16 Wisdom (Medicine) check.

Hurlaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

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
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: rage when wounded [behavior] | ice-hardened body [body] | greataxe [object]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "Vorgath slams his greataxe down in a brutal overhead blow. If the strike lands, the wound left behind festers with ancestral spite, causing the target to bleed cold for a short time. While bleeding, the target takes cold damage at the start of each of its turns, and Vorgath's rage grows — allowing him to immediately move toward the wounded creature if it is within reach." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — affliction, rampage (wound)
[reskin] signature rider: affliction -> Greataxe (appended; the wound left behind festers and makes the target bleed cold damage at the star [verb: wound:concept, bleed:idea, fester:idea])
[reskin] signature idea (trait): "Vorgath's body is hardened by frost and the spirits of his ancestors. Whenever a creature hits him with a melee attack, a burst of freezing air lashes out, chilling the attacker and making it harder for them to move or fight effectively for a moment. This does not affect creatures immune to cold." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Greataxe" reach 10 -> 5 ft. — reach follows the goliath's size
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Mace: +7 derives from DEX, but an attack row rolls STR
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

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Lay on Hands (2/Day). Vareth touches a creature within 5 feet of itself and restores 21 (6d6) Hit Points to it.

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
[concept] signature elements: Dawn Litany that blesses her soldiers with radiant damage [aura] | sun-cracked iron mace that channels holy energy [object] | martyrdom at 0 HP: Searing Light burst [behavior]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth whispers the final words of a broken prayer and lets the dawn she carries inside her escape. Every enemy within reach is seared by the light, and the faithful who stand close to her are healed instead, their wounds closing as the same radiance passes through them. After she does this, her mace loses its glow until the next time she raises it in the litany." [action/once_per_fight/damage] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature miss: action — "Vareth whispers the final words of a broken prayer and lets the dawn she carries inside her escape. Every enemy within reach is seared by the light, and the faithful who stand close to her are healed instead, their wounds closing as the same radiance passes through them. After she does this, her mace loses its glow until the next time she raises it in the litany." [action/once_per_fight/damage] — the model found no template that holds it (offered: rally, trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, lay-on-hands, rampage, affliction)
[reskin] value check: "Lay on Hands (2/Day)" EV 11.6 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vareth's Dawn Litany is not just words; while she chants it, her allies' weapons shine with captured sunlight. Anyone she has blessed in this way deals extra radiant damage, and the first time they would be frightened or charmed after being blessed, the light flares and they simply shake it off." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Vareth's Dawn Litany is not just words; while she chants it, her allies' weapons shine with captured sunlight. Anyone she has blessed in this way deals extra radiant damage, and the first time they would be frightened or charmed after being blessed, the light flares and they simply shake it off." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, warded-mending)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Sun-Cracked Mace" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Sun-Branded Bolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Unbroken Advance" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. On a hit, if Vareth is under the effect of its own Bless spell, one ally of Vareth's choice within 30 feet of itself can immediately use its Reaction to make one attack or cast one spell of 1st level or lower.
provenance: none — the call wrote the text itself
```


---

## Iron Chapter Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Chapter Templar | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Iron Chapter Templar

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

Multiattack. The templar makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: mace-and-shield line-holding [behavior] | heavy iron mace [object] | no magic, only steel [body]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "When the templar braces its shield and holds the line, it dares the nearest enemy to come through its guard. The first enemy to approach and attack it before the templar's next turn is met with a punishing counterattack across the knees, using the same mace. This counter is a reaction it can make once per round, as long as the templar can see the attacker and still has its shield raised." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.5 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The templar wields a heavy iron mace with such force that it jars the grip of those it strikes, making their next attack clumsy and unsure. This is always true whenever the templar lands a hit with its mace." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The templar wields a heavy iron mace with such force that it jars the grip of those it strikes, making their next attack clumsy and unsure. This is always true whenever the templar lands a hit with its mace." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Sling" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Reflected Advisor — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reflected Advisor | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Reflected Advisor

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

Languages Common and any three languages, Elvish, Sylvan

CR 6 (XP 2,300; PB +3)

Traits

Evasion. If the advisor is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the advisor instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The advisor makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The advisor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The advisor casts Misty Step, using the same spellcasting ability as Spellcasting.

Misleading Glimmer. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the advisor's next turn, the target has Disadvantage on attack rolls against creatures other than the advisor.

Reactions

Protective Magic (3/Day). Trigger: The advisor is hit by an attack roll. Response: The advisor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] lurker type=Humanoid mechanics=none — lurker: ✓ ("is never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: steps away after every strike [behavior] | never where you struck [behavior] | body woven of living shadow [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 76 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The advisor slips sideways through a heartbeat, leaving a mirror-image double standing where it was. Anyone who struck at it that instant finds their blow landing on the illusion, while the advisor reappears behind a nearby target with one of its own waiting tentacles already uncoiling. If it uses this trick when no one has attacked it recently, the double still confuses those trying to track it." [reaction/on_being_hit/movement] — menu: snap-shot (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The advisor slips sideways through a heartbeat, leaving a mirror-image double standing where it was. Anyone who struck at it that instant finds their blow landing on the illusion, while the advisor reappears behind a nearby target with one of its own waiting tentacles already uncoiling. If it uses this trick when no one has attacked it recently, the double still confuses those trying to track it." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: snap-shot, bolt-mark)
[reskin] value check: "Binding Mark" EV 4.2 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The advisor's body is a weave of living shadow and reflected light, so it can exist in more than one place at once to a viewer. Whenever it moves, a shimmering afterimage remains at its previous position, mimicking its posture and masking its true location until the start of its next turn." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon modes: fly off — the Mage has no such mode and the words name none
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Sylvan" -> "Common and any three languages, Elvish, Sylvan" — the Mage's plus the concept's Elvish, Sylvan
[reskin] print canon attack: "Reach Strike" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Notched Blade); nova none; dmg 42

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

Fallen Oath Fury. While Thurivald has half of its hit points or fewer, it has advantage on attack rolls.
Aura of Authority. While within 10 feet of Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Notched Blade and one with Bone-Horn Harp. It can replace one attack with a use of Opportunist's Lash.
Notched Blade: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Bone-Horn Harp: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) psychic damage.
Opportunist's Lash: One creature within 30 feet of Thurivald that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: war-chant that rouses allies into fury [behavior] | iron oath and iron blade [object] | bone-horn harp [object]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald raises his bone-horn harp and unleashes a war-chant that sinks into his warband like a red-hot brand—his allies hear it even through stone, and it sets their blood boiling with a fury that makes every blow fall harder and lets them shake off fear and pain alike until the chant fades. The chant rolls over the field each time he starts it anew, but it cannot take root in a mind that cannot" [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald raises his bone-horn harp and unleashes a war-chant that sinks into his warband like a red-hot brand—his allies hear it even through stone, and it sets their blood boiling with a fury that makes every blow fall harder and lets them shake off fear and pain alike until the chant fades. The chant rolls over the field each time he starts it anew, but it cannot take root in a mind that cannot" [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, aggro-curse)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's iron oath is a living weight: whenever an ally within the sound of his voice is struck down, the loss only stokes his own fury—he fights harder and the chant grows fiercer, as if each fallen comrade is hammered into his blade. He never breaks, never yields, and the song itself seems to drag him on past the point where any mortal throat would fail." [trait/start_of_turn/resource] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature template (trait): bloodied-fury -> Traits/"Fallen Oath Fury" ("whenever an ally within the sound of his voice is struck down, the loss only sto [verb: fury:concept, fights harder:idea]")
```


---

## Shadow-Blade — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadow-Blade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 3 / off 5 → 4; sustained 34 (2 × Blade); nova none; dmg 34

```
Shadow-Blade

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 30 ft.

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

Evasion. If the shadow-blade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shadow-blade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the shadow-blade has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadow-blade hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Shadow-Step. The shadow-blade ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The shadow-blade makes two attacks, using Blade or Shuriken in any combination.

Blade. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shadow-blade takes the Dash, Disengage, or Hide action.

Shadow Fade (1/Day). The shadow-blade casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: striking from unseen positions [behavior] | body woven from living shadow [body] | silent movement through darkness [behavior]
[reskin] signature idea (action): "The shadow-blade chooses one enemy and becomes unseen to that creature alone, then strikes from beyond its noticing. The victim wanders, its eyes sliding past the assassin, and the shadow-blade closes the distance unopposed for a single killing blow. This works only against a foe that is already wounded or isolated, and only once while the two of them remain in the same fight." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] value check: "Hidden Edge (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Hidden Edge (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the shadow-blade takes a hit, its form bleeds into the surrounding dark and flicks forward — it shifts a short distance and leaves the attacker grasping nothing but the space where it stood. The assassin ends up behind or beside its would-be killer, ready to answer in kind." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "When the shadow-blade takes a hit, its form bleeds into the surrounding dark and flicks forward — it shifts a short distance and leaves the attacker grasping nothing but the space where it stood. The assassin ends up behind or beside its would-be killer, ready to answer in kind." [trait/on_being_hit/movement] — the model found no template that holds it (offered: assassinate, absorption, bloodied-burst, resonant-body)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Lockspring Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lockspring Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Lockspring Imp

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

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
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: picks locks for a devil [behavior] | shadowy body [body] | poisoned stiletto [object]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp jams its stiletto into a foe's armor, straps, or flesh and twists — and a lock of its own making snaps shut inside the wound. Until that lock is forced open, the victim's wounds keep reopening, bleeding out a trickle of vitality each moment, and the imp knows the instant anyone tries to pick it free. The imp can only maintain one such lock at a time; springing a new one releases the last." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's body is a living shadow stitched to a keyhole's edge — where light is dim or absent, it can fold itself flat and thin enough to slip through any gap a key could pass, and it leaves no trail, scent, or footprint behind. It cannot do this in bright light or open flame." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "The imp's body is a living shadow stitched to a keyhole's edge — where light is dim or absent, it can fold itself flat and thin enough to slip through any gap a key could pass, and it leaves no trail, scent, or footprint behind. It cannot do this in bright light or open flame." [trait/always/movement] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, fire-aura)
[reskin] print canon alignment: Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Slippery" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Marrow Maze — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marrow Maze | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Horns); nova none; dmg 40

```
Marrow Maze

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the maze has Advantage on attack rolls and saving throws.

Actions

Multiattack. The maze makes two Horns attacks.

Horns. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Necrotic damage.

Bonus Actions

Charge. The maze moves up to half its Speed straight toward an enemy it can see.

Bloodied Pursuit (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the maze moves up to half its Speed without provoking Opportunity Attacks, and it makes one Horns attack.

Answering Sting. One creature within 5 feet that hit the maze with an attack roll since the end of the maze's last turn takes 7 (2d6) Necrotic damage.

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
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: herding prey into winding dead ends [behavior] | bone-plated hide and ossified horns [body] | the maze as a living trap [aura]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] signature idea (action): "The maze lowers its skull and charges in a long, grinding sweep, goring every creature in a wide line before skidding to a halt behind the ones it just passed. Anyone still standing in that lane is shoved bodily toward the far end of the path, left shaken by the bone-splintering impact. It is how the reaver turns a crowd into a queue." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a lattice of grown-over bone plates, and its horns are ossified stumps that never stop aching. When it is bloodied, those old breaks in the bone knit tighter around the marrow and the thing moves with a lurching, splintering speed, like the maze itself is trying to close." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Its hide is a lattice of grown-over bone plates, and its horns are ossified stumps that never stop aching. When it is bloodied, those old breaks in the bone knit tighter around the marrow and the thing moves with a lurching, splintering speed, like the maze itself is trying to close." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, bloodied-burst, warded-mending)
```


---

## Wall of the Broken Oath — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Wall of the Broken Oath | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Cudgel Smash); nova none; dmg 52

```
Wall of the Broken Oath

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

Aura of Authority. While in a 10-foot Emanation originating from the wall, the wall and its allies have Advantage on attack rolls and saving throws, provided the wall doesn't have the Incapacitated condition.

Actions

Multiattack. The wall makes two attacks, using Cudgel Smash or Thrown Shield in any combination. It can replace one attack with a use of Shield Bash.

Cudgel Smash. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Thrown Shield. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 26 (5d8 + 4) Bludgeoning damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the wall can see. Failure: 13 (3d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition. Success: Half damage only.

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
[concept] signature elements: defensive stance that shields allies [behavior] | iron armor and battered shield [object] | unyielding refusal to retreat [aura]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The knight plants its battered shield and dares the enemy to come through. Until its next turn, it stands fast, and any foe that tries to move past it or strike one of its charges is battered back with a bone-breaking shield bash. The stance breaks if it is forced to move." [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] value check: "Shield Bash" EV 13.5 vs floor 13 (one attack of 2) — added Success: Half
[reskin] signature template: shield-bash -> Actions/"Shield Bash" ("the knight stands fast and batters any foe that tries to move past it or strike  [verb: shield bash:idea, bash:idea, bashes:idea, bashing:idea]")
[reskin] signature idea (trait): "The knight's iron armor and ruined shield have been battered by years of holding the line. Whenever a blow would stagger it, the knight grits its teeth and remains standing, using the impact to brace its next shield bash." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The knight's iron armor and ruined shield have been battered by years of holding the line. Whenever a blow would stagger it, the knight grits its teeth and remains standing, using the impact to brace its next shield bash." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
```


---

## Sable Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 1 / off 3 → 2; sustained 24 (2 × Claw-Blade); nova none; dmg 24

```
Sable Whisker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 30 ft.

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

Crowd Step. The whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The whisker makes two attacks, using Claw-Blade or Dart in any combination.

Claw-Blade. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The whisker takes the Dash, Disengage, or Hide action.

Sable Pounce (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the whisker moves up to half its Speed, and it makes one Claw-Blade attack.

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
[concept] signature elements: slips through market crowds [behavior] | hidden claw-blade [object] | cutpurse's escape [behavior]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The whisker slips through a press of bodies, threading the gaps between foes as though they were market stalls, and the moment it slides past someone it rakes a hidden claw-blade across purse or hamstring. The slip itself does not harm the mark — it only leaves the whisker adjacent and unseen by the one it brushed past, so the next cut comes from nowhere. It cannot slip through the same foe twice " [action/always/movement] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature miss: action — "The whisker slips through a press of bodies, threading the gaps between foes as though they were market stalls, and the moment it slides past someone it rakes a hidden claw-blade across purse or hamstring. The slip itself does not harm the mark — it only leaves the whisker adjacent and unseen by the one it brushed past, so the next cut comes from nowhere. It cannot slip through the same foe twice " [action/always/movement] — the model found no template that holds it (offered: feint-slip, leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, self-invisibility, bolt-mark)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The whisker's claw-blades sit in wraps and cuffs that read as harmless market clutter — only when it is hidden, or when it is unseen by the target, does the strike land from an angle the mark never saw, and the wound continues to bleed as the whisker melts back into the crowd." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The whisker's claw-blades sit in wraps and cuffs that read as harmless market clutter — only when it is hidden, or when it is unseen by the target, does the strike land from an angle the mark never saw, and the wound continues to bleed as the whisker melts back into the crowd." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
```
