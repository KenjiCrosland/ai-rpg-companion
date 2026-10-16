# Review batch — classes-eight-2026-10-16T01-57-31

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sselok the Palm of Stillness | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vitrix Ninthblade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hundred-Campaign Veteran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Scar-Marked Reaver | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Mortain | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Theus Vane | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Serah Vaelor | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/7 |
| Sorrowblade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/7 |
| Grimfang Packhound | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Lockvault Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Mazeherd Warden | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Ser Alaric Mournhold | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Whispercoin | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |

**Dropped 1 of 20 user clauses** (coverage 95%); concept share 66% (53/80 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Grimfang Packhound — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grimfang Packhound | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Grimfang Packhound

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

Pack Tactics. The packhound has Advantage on an attack roll against a creature if at least one of the packhound's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The packhound makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Predatory Focus (2/Day). The packhound has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: pack hunting tactics [behavior] | powerful bite [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The packhound exploits any opening created when a target's attention is pulled elsewhere — most often by a packmate's attack. It lunges at that harried prey, and when it connects, the wound tears deeper, bleeding badly and making it harder for the prey to flee or fight back for a short while." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "The packhound exploits any opening created when a target's attention is pulled elsewhere — most often by a packmate's attack. It lunges at that harried prey, and when it connects, the wound tears deeper, bleeding badly and making it harder for the prey to flee or fight back for a short while." [rider/on_hit/damage] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The packhound's jaws lock on instinct once they sink into prey, clamping down and grinding with relentless pressure. While it holds on, the victim is dragged off balance and the packhound can keep worrying the wound until it or the prey breaks free." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "The packhound's jaws lock on instinct once they sink into prey, clamping down and grinding with relentless pressure. While it holds on, the victim is dragged off balance and the packhound can keep worrying the wound until it or the prey breaks free." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
```


---

## Serah Vaelor — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Serah Vaelor | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Serah Vaelor

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

Warded Mending. Serah regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and its ward is within 30 feet of it.

Aura of Authority. While in a 10-foot Emanation originating from Serah, Serah and its allies have Advantage on attack rolls and saving throws, provided Serah doesn't have the Incapacitated condition.

Actions

Multiattack. Serah makes three attacks, using Longsword or Bolt in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Bolt. Ranged Attack Roll: +5, range 80/320 ft. 15 (3d8 + 2) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Serah touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Serah charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Bolstering Cry (2/Day). Each ally within 30 feet of Serah gains 9 (2d8) Temporary Hit Points.

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
[concept] signature elements: smites the unclean [behavior] | mends her soldiers [behavior] | oathsworn iron resolve [body]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Serah strides to an ally who can hear her and calls out a battlefield command that hardens their resolve. The next time that ally would be struck by a blow from an unclean foe, Serah's word turns the edge aside and the wound closes over with radiant light." [rider/on_hit/defense] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] signature miss: action — "Serah strides to an ally who can hear her and calls out a battlefield command that hardens their resolve. The next time that ally would be struck by a blow from an unclean foe, Serah's word turns the edge aside and the wound closes over with radiant light." [rider/on_hit/defense] — the model found no template that holds it (offered: rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Serah's oath binds her wounds as fiercely as it binds her sword arm. Whenever she strikes down a wicked creature, the graves of her slaughtered garrison seem to whisper, and her own bleeding slows as she takes strength from the righteous kill." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature bound by force: trait — "warded-mending" matches mend+mends+mending in the user's words; the model's none is overruled
[reskin] signature template (trait): warded-mending -> Traits/"Warded Mending" ("exact concept match [verb: mend:concept, mends:concept, mending:concept]")
```


---

## Hundred-Campaign Veteran — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hundred-Campaign Veteran | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Hundred-Campaign Veteran
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
Second Wind (2/Day). As a bonus action, the veteran regains 19 (3d12) hit points.
Riposte (Reaction). When a creature misses the veteran with a melee attack, the veteran makes one Longsword attack against that creature.

Actions
Multiattack: The veteran makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of the veteran's next turn, and the target must succeed on a DC 14 Strength saving throw or be knocked prone.
Shield Bash: One creature within 5 feet that the veteran can see must make a DC 14 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=thrown-weapon — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler bash that shoves and staggers [behavior] | longsword cuts from a disciplined guard [behavior] | iron-hard body and shield-bearing arm [body]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: riposte — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: fighter — "a veteran soldier with a longsword": Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "The veteran slams the rim of its buckler into a foe, using the force of the blow to drive the enemy away from its guarding line and leave them scrambling to recover. The shove only works on a target already off balance from a previous hit, and the effort leaves the veteran's own arm exposed for a moment, so it can't be repeated without risk." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] value check: "Driving Bellow (2/Day)" EV 7.4 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The veteran's iron-hard discipline and shield-bearing arm turn its guard into a grinding test of endurance. Whenever a foe tries to shove, trip, or otherwise force the veteran from its chosen ground, the attempt fails and the foe is left staggered by the veteran's unyielding stance." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The veteran's iron-hard discipline and shield-bearing arm turn its guard into a grinding test of endurance. Whenever a foe tries to shove, trip, or otherwise force the veteran from its chosen ground, the attempt fails and the foe is left staggered by the veteran's unyielding stance." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, guarded-stance)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Sselok the Palm of Stillness — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sselok the Palm of Stillness | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Sselok the Palm of Stillness

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 40 ft., Climb 50 ft.

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

Hold Breath. Sselok can hold its breath for 15 minutes.

Flowing Evasion. Sselok ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sselok makes two attacks, using Open Palm or Spit Dart in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Sselok's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Sselok's next turn.

Spit Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. Sselok takes the Dash or Disengage action.

Sudden Stillness (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Sselok moves up to half its Speed, and it makes one Open Palm attack.

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
[concept] signature elements: pressure-point strikes that numb and paralyze [behavior] | open-palm venom-channeling hands [body] | a duelist's patient circling [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "Sselok delivers a flurry of precise open-palm strikes to the same spot on a target it struck with Open Palm this turn, overwhelming a pressure point. The target must make a Constitution saving throw; on a failure, the limb or area struck goes dead, and the target is slowed and cannot use reactions until the end of its next turn." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] signature miss: action — "Sselok delivers a flurry of precise open-palm strikes to the same spot on a target it struck with Open Palm this turn, overwhelming a pressure point. The target must make a Constitution saving throw; on a failure, the limb or area struck goes dead, and the target is slowed and cannot use reactions until the end of its next turn." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Sselok hits a creature with Open Palm, its next attack against that same creature before the end of its next turn bypasses any temporary hit points or damage reduction, striking directly at the flesh." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Whenever Sselok hits a creature with Open Palm, its next attack against that same creature before the end of its next turn bypasses any temporary hit points or damage reduction, striking directly at the flesh." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## Vitrix Ninthblade — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vitrix Ninthblade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Vitrix Ninthblade

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

Languages Common plus one other language, Infernal, Thieves' Cant

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Vitrix has Advantage on attack rolls against any creature that hasn't taken a turn. If Vitrix hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Stalker. Vitrix ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vitrix makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vitrix takes the Dash, Disengage, or Hide action.

Reaper's Recognition (2/Day). Vitrix has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: rooftop stalking [behavior] | sneak attack from hiding [behavior] | infernal bloodline [body]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Vitrix marks a victim from an unseen perch, studying how they move and where they will be. Until the end of its next turn, all of Vitrix's attacks against that victim have their damage dice maximized, and the victim gains no benefit from cover or concealment against Vitrix's attacks. If Vitrix cannot attack the marked victim before the effect ends, the mark fades and cannot be reapplied for the re" [bonus_action/always/damage] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "Vitrix marks a victim from an unseen perch, studying how they move and where they will be. Until the end of its next turn, all of Vitrix's attacks against that victim have their damage dice maximized, and the victim gains no benefit from cover or concealment against Vitrix's attacks. If Vitrix cannot attack the marked victim before the effect ends, the mark fades and cannot be reapplied for the re" [bonus_action/always/damage] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vitrix's infernal blood lets it blend into the grime and smoke of the old quarter. Whenever it is in dim light or darkness, it can take the Hide action even while observed, and it leaves no tracks or trace of its passing." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "Vitrix's infernal blood lets it blend into the grime and smoke of the old quarter. Whenever it is in dim light or darkness, it can take the Hide action even while observed, and it leaves no tracks or trace of its passing." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal, Thieves' Cant" -> "Common plus one other language, Infernal, Thieves' Cant" — the Spy's plus the concept's Infernal, Thieves' Cant
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Spy's own row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "No Escape" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vitrix has Advantage on attack rolls against any creature that hasn't taken a turn. If Vitrix hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   No Escape: Vitrix knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
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

Medium Humanoid, Lawful Good

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

Rallying Command (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line with a shield") | defender: key "keeps the line" (class verb)
[concept] signature elements: shield wall that punishes anyone trying to move past [behavior] | longsword and shield, knightly armament [object] | unbreakable will to hold the line [behavior]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Dame Oriel slams her shield forward, driving everyone in front of her back a step and leaving them staggered and unable to press past her. The shove only works on those who try to move through or around her, leaving them wide open to her blade if they keep pushing." [action/save/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] signature miss: action — "Dame Oriel slams her shield forward, driving everyone in front of her back a step and leaving them staggered and unable to press past her. The shove only works on those who try to move through or around her, leaving them wide open to her blade if they keep pushing." [action/save/movement] — the model found no template that holds it (offered: rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Dame Oriel catches a blow on her shield and shrugs it off, she uses the opening to twist her longsword into a punishing counter. The harder they try to break her wall, the faster her blade answers." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Whenever Dame Oriel catches a blow on her shield and shrugs it off, she uses the opening to twist her longsword into a punishing counter. The harder they try to break her wall, the faster her blade answers." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Scar-Marked Reaver — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scar-Marked Reaver | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Maul); nova none; dmg 54

```
Scar-Marked Reaver

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Wounded Tempering. While Bloodied, the reaver has Advantage on attack rolls.

Bloodied Frenzy. While Bloodied, the reaver has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the reaver extra movement, and the reaver can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The reaver makes two attacks, using Maul or Boulder in any combination.

Maul. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Boulder. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Wounded Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reaver moves up to half its Speed without provoking Opportunity Attacks, and it makes one Maul attack.

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
[concept] signature elements: wounded berserk rage [behavior] | goliath stone-hardened body [body] | thrown-aside shield [object]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "When the reaver's rage is first woken by a wound, it hurls its hide shield away and bellows a challenge that pulls every nearby creature toward it, then charges. Enemies that answer the charge or crowd it are met with shoulder barges and crushing fists rather than the measured maul, driving them back and leaving them reeling. It can only make this surge once per fit of bloodlust." [action/once_per_fight/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage (wound)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rampage
[reskin] value check: "Wounded Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rampage -> Bonus Actions/"Wounded Rampage (1/Day)" ("the reaver is a goliath berserker who loses control when wounded and lashes out  [verb: wound:concept, rage:idea]")
[reskin] signature idea (trait): "The reaver's scarred goliath body has been tempered by a lifetime of stone and cold; the deeper its wounds, the harder its hide seems to become, and every fresh cut only feeds the kill-trance instead of slowing it. Rage, for it, is armor." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature template (trait): bloodied-fury -> Traits/"Wounded Tempering" ("The idea is that the deeper its wounds, the harder its hide becomes and every fr [verb: wounded:concept, rage:idea, temper:idea]")
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

Bolstering Cry (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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
[concept] signature elements: blessing her soldiers with radiant aegis [behavior] | sun-forged mace that burns with dawnlight [object] | dawnlight aura that hardens allies and sears foes [aura]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth plants her banner and chants a Dawn Blessing that wraps nearby allies in radiant aegis. The blessing hardens them against harm and leaves a searing mark on any foe that strikes them, making the enemy pay in holy fire for every blow landed." [action/save/condition] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature bound by force: action — "rally" matches blessing+bless in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: blessing:concept, bless:concept]")
[reskin] signature idea (trait): "Dawnlight clings to Vareth's sun-forged mace, and any creature she strikes burns with captured morning fire until the end of its next turn. The burn spreads: a foe already burning from her mace flares brighter when she or an ally lands another blow on it." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Dawnlight clings to Vareth's sun-forged mace, and any creature she strikes burns with captured morning fire until the end of its next turn. The burn spreads: a foe already burning from her mace flares brighter when she or an ally lands another blow on it." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Celestial, Common" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Sun-Forged Mace" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Dawnlight Bolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Solar Stride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. If the target is a creature, Vareth can channel the dawn through the strike: until the start of Vareth's next turn, one ally of Vareth's choice within 30 feet of Vareth has Advantage on its next attack roll.
provenance: none — the call wrote the text itself
```


---

## Brother Mortain — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Mortain | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Mortain

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

Multiattack. Mortain makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Mortain's next turn.

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
[concept] signature elements: shield-locked line-holding [behavior] | iron mace and consecrated plate [object] | the weight of an unyielding stance [aura]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Mortain slams his shield into the ground and pivots his stance, turning his guard into a living barricade. Enemies who try to slip past him into the space he guards find the mace waiting, and the blow lands not to kill but to break their stride and drive them back to the front line." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature miss: action — "Mortain slams his shield into the ground and pivots his stance, turning his guard into a living barricade. Enemies who try to slip past him into the space he guards find the mace waiting, and the blow lands not to kill but to break their stride and drive them back to the front line." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: snap-shot, riposte, push-prone, herd, patient-defense, rally)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Consecrated iron rings like a struck bell under impact. When an enemy strikes Mortain, the reverberation of his holy plate lashes back, marking the attacker with a brief, stinging rebuke that makes their next swing falter." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Censer Chain" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Theus Vane — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Theus Vane | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Theus Vane

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

Traits

Iron Vein Rebuke. If Theus is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Theus instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Theus makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. Theus casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Theus casts Misty Step, using the same spellcasting ability as Spellcasting.

Slip Step (2/Day). Theus teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Theus is hit by an attack roll. Response: Theus casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[concept] signature elements: steps aside from the blow before it lands [behavior] | iron-veined court wizard's body and his thin iron rapier [body] | the measured withdrawal — never fleeing, always leaving [behavior]
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The first time in a fight that Theus is missed by a melee weapon, the space he vacated screams. The attacker must save or take massive force damage as the hallway they lunged into is unmade around them. Everyone in the corridor witnesses the palace eat the swing for him." [reaction/on_being_hit/damage] — menu: snap-shot (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Slip Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Slip Step (2/Day)" ("a court wizard who is never where you struck and steps away — teleporting to an  [verb: step:concept]")
[reskin] signature idea (trait): "Theus's body is a cage of thin iron veins, and his bone rapier is a splinter of the same length. When an enemy holds him at reach or grapples him, the iron in his blood remembers and the attacker's own weapon rings with sympathetic pain, leaving them shaking and unable to strike him cleanly until they drop their guard." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature template (trait): evasion -> Traits/"Iron Vein Rebuke" ("The attacker is left shaking and unable to strike Theus cleanly until they drop  [verb: never where:concept]")
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Bone Rapier" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Iron-Shod Spear); nova none; dmg 42

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

Aura of Authority. While Thurivald is conscious and not incapacitated, Thurivald and its allies within 10 feet of it have advantage on attack rolls and saving throws.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Iron-Shod Spear and one with Warsong. It can replace one attack with a use of Commander's Rebuke.
Iron-Shod Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Warsong: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) psychic damage.
Commander's Rebuke: One creature within 30 feet of Thurivald that is charmed by it must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: war-song that drives allies into fury [behavior] | iron-shod spear and shield held beside the warband [object] | voice that hardens and hurls the line [aura]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald's song takes vengeance on a foe he has just struck: a warrior he wounds with his spear or his voice is left answerless for a moment, unable to strike back. The song finds the mouth of anyone he marks and holds it shut until he renews the verse." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature miss: action — "Thurivald's song takes vengeance on a foe he has just struck: a warrior he wounds with his spear or his voice is left answerless for a moment, unable to strike back. The song finds the mouth of anyone he marks and holds it shut until he renews the verse." [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, throw-retrieve, disarm, herd, reveal, aggro-curse, own-turn-punisher)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "While Thurivald's song rises, any comrade within earshot who is driven to fury by his verse finds iron in their limbs: their next strike carries the weight and reach of his spear, and the song's power redoubles when they answer it with a kill." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature miss: trait — "While Thurivald's song rises, any comrade within earshot who is driven to fury by his verse finds iron in their limbs: their next strike carries the weight and reach of his spear, and the song's power redoubles when they answer it with a kill." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury)
```


---

## Sorrowblade — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sorrowblade | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Sorrowblade

Medium Humanoid, Lawful Evil

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

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

Evasion. If Sorrowblade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Sorrowblade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Sorrowblade has Advantage on attack rolls against any creature that hasn't taken a turn. If Sorrowblade hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow-Slip. Sorrowblade ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sorrowblade makes two attacks, using Tanto or Shuriken in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Sorrowblade takes the Dash, Disengage, or Hide action.

Shadow Slip (1/Day). Sorrowblade casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: striking from stealth [behavior] | shadow-infused body [body] | poisoned blade [object]
[reskin] signature idea (action): "When Sorrowblade strikes a foe who has not yet noticed it this fight, the blade drinks the victim's strength — for a short while afterwards that enemy's own blows land weaker, and the wound Sorrowblade leaves keeps bleeding shadow. If the target was already hunting Sorrowblade, none of this happens; the opening strike must come from darkness, unseen." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into self-invisibility
[reskin] value check: "Shadow Veil (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shadow Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sorrowblade's body is stitched through with living shadow, so it can walk through flickering gloom and clinging darkness as if it were open air. Where light is thin it leaves no trail, and it slips free of anything that tries to hold or hinder it." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "Sorrowblade's body is stitched through with living shadow, so it can walk through flickering gloom and clinging darkness as if it were open air. Where light is thin it leaves no trail, and it slips free of anything that tries to hold or hinder it." [trait/always/movement] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Lockvault Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lockvault Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Lockvault Imp

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
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: lock-picking rogue [behavior] | shadow-body that slips through cracks [body] | stolen infernal keys [object]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp reads the seams and catches of armor, locks, and joints like cheap tumblers. As a single deft action, it picks one visible target or object within reach, quietly disables whatever protection it offers—really opening a lock, disarming a trap, or loosening a worn strap—or it slips its pick into the target, leaving the mark exposed and vulnerable to everyone else." [action/save/condition] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The imp reads the seams and catches of armor, locks, and joints like cheap tumblers. As a single deft action, it picks one visible target or object within reach, quietly disables whatever protection it offers—really opening a lock, disarming a trap, or loosening a worn strap—or it slips its pick into the target, leaving the mark exposed and vulnerable to everyone else." [action/save/condition] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, feint-slip, riposte)
[reskin] value check: "Sundering Shove" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's body is a thing of cracks and gaps, and any opening or shadowed seam is a door. While in dim light or darkness, it can slip through any crack, keyhole, or gap as if the space were much larger, and it leaves no trace of its passage." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "The imp's body is a thing of cracks and gaps, and any opening or shadowed seam is a door. While in dim light or darkness, it can slip through any crack, keyhole, or gap as if the space were much larger, and it leaves no trace of its passage." [trait/always/movement] — the model found no template that holds it (offered: sealed-body)
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Mazeherd Warden — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mazeherd Warden | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Bone Club); nova none; dmg 44

```
Mazeherd Warden

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

Bloodied Frenzy. While Bloodied, the warden has Advantage on attack rolls and saving throws.

Actions

Multiattack. The warden makes two Bone Club attacks.

Bone Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Charge. The warden moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the warden moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bone Club attack.

Percussive Herding. Wisdom Saving Throw: DC 14, each creature of the warden's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the warden's choice, using the safest available route.

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
[route] brute type=Monstrosity mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | brute-charger: ✓ ("minotaur reaver") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: herding prey into the maze [behavior] | bone club and horn-crowned skull [body] | the maze as lair and weapon [aura]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] signature idea (action): "The warden slams its bone club down, sending a percussive crack through the ground that rattles every creature it chooses within thirty feet. Those who flinch from the sound are seized by the instinct to bolt away from the warden, and it immediately shifts to block the most obvious escape route, so the panicked prey runs where the maze wants them." [action/save/condition] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] value check: "Percussive Herding (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Percussive Herding" moves to a bonus action — EV 8.2 vs floor 3.4 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Percussive Herding" ("The warden slams its bone club, and the prey are seized by the instinct to bolt  [verb: herd:concept]")
[reskin] signature idea (trait): "The warden's horn-crowned skull is a weapon of its own. Whenever it charges into a foe and connects with its club, the follow-through of its horns hooks the target and drags them along, cutting off their retreat and pulling them deeper into the corridors." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The warden's horn-crowned skull is a weapon of its own. Whenever it charges into a foe and connects with its club, the follow-through of its horns hooks the target and drags them along, cutting off their retreat and pulling them deeper into the corridors." [trait/always/movement] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
```


---

## Ser Alaric Mournhold — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Alaric Mournhold | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Hold the Line); nova none; dmg 52

```
Ser Alaric Mournhold

Medium Humanoid, Neutral Good

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

Aura of Authority. While in a 10-foot Emanation originating from the mournhold, the mournhold and its allies have Advantage on attack rolls and saving throws, provided the mournhold doesn't have the Incapacitated condition.

Actions

Multiattack. The mournhold makes two attacks, using Hold the Line or Longsword in any combination.

Hold the Line. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Longsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the mournhold gains 13 (3d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] signature elements: shield wall defense [behavior] | iron armor and body [body] | fallen knightly order [aura]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The knight slams their shield into the ground and holds the line, creating a zone of denial that forces enemies to deal with them or be broken for trying to slip past. While planted, attacks of opportunity against anyone who moves within their reach are savage and leave the offender reeling." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature bound by force: action — "rally" matches shield+orders in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: shield:concept, orders:concept]")
[reskin] signature idea (trait): "When an enemy strikes the knight while they are planting their … or standing their ground, the attacker's weapon rings against iron-hard resolve, and the knight's counter is immediate and bone-shattering." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Whispercoin — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whispercoin | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Rapier); nova none; dmg 24

```
Whispercoin

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

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Crowdstep. Whispercoin ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Whispercoin makes two attacks, using Rapier or Sling in any combination.

Rapier. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. Whispercoin takes the Dash, Disengage, or Hide action.

Market Slip. Whispercoin takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[concept] signature elements: the crowd as cover and weapon [behavior] | purse-cut and vanish [behavior] | motley market disguise [body]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The cutpurse vanishes into a dense knot of market-goers, using the jostling bodies as a living curtain. While so hidden, anyone who tries to strike at it risks cutting down an innocent bystander instead, and the cutpurse can slip away through the crowd before the confusion clears." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Market Slip" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Market Slip" ("The concept's verb is 'slip,' and Whispercoin survives the crowded market by sli [verb: slip:concept]")
[reskin] signature idea (trait): "With a quick shift of posture and a snatched scrap of cloth, the cutpurse blurs into the anonymous sea of a market crowd. Anyone trying to pick it out of the bustle sees only another face in the throng until it chooses to reveal itself." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
```
