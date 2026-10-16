# Review batch — classes-eight-2026-10-16T07-38-22

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Venomthorn Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/6 |
| Sable Rooftop Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Last Rearguard | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Ravening Blood-Wrack | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Ossian the Wall | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Salon Evanescent | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/5 |
| Dame Marisel Vane | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/7 |
| Nychta Vale | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 2/2 | 1/7 |
| Broken Fang | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Shadowpick Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Coilwarden | 6 | 2024 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Oathbound Sentinel | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/4 |
| Market Ghost | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 59% (49/83 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / gates: 1
- skirmisher-3 / derivation: 1
- defender-3-leader / structure: 1
- skirmisher-3-skulker / reader: 1



---

## Broken Fang — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Broken Fang | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Broken Fang

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

Faultless Tracker. The fang knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Pack Tactics. The fang has Advantage on an attack roll against a creature if at least one of the fang's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The fang makes two Bite attacks. It can replace one attack with a use of Predator's Dread.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Predator's Dread. Wisdom Saving Throw: DC 12, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the fang's next turn. If the target was already Frightened by this ability, it also takes 13 (3d8) Psychic damage.

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
[concept] signature elements: pack hunting tactics [behavior] | dart-in dart-out harassment [behavior] | powerful jaws and thick hide [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "Broken Fang reads its prey's fear: it names a single visible creature as the hunted, one it can see or smell, and the pack answers. For as long as it keeps its teeth in that creature, the fang never fights alone — when it lunges, it does not lunge from the side the pack has shown, and each lunge pulls the hunted farther from its friends and closer to the pack." [action/always/condition] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature miss: action — "Broken Fang reads its prey's fear: it names a single visible creature as the hunted, one it can see or smell, and the pack answers. For as long as it keeps its teeth in that creature, the fang never fights alone — when it lunges, it does not lunge from the side the pack has shown, and each lunge pulls the hunted farther from its friends and closer to the pack." [action/always/condition] — the model found no template that holds it (offered: focus, trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, isolation)
[reskin] value check: "Creeping Dread" EV 8.8 vs floor 6.2 (one attack of 2) — dice 6 → 13
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Broken Fang's jaws are built to hold, tear, and wear down prey twice its size — the thick-necked quarry of the moor. Once it has bitten into a creature, that creature cannot easily shake it, and every wasted moment spent pulling the wolf off is a moment the rest of the pack can close in." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Broken Fang's jaws are built to hold, tear, and wear down prey twice its size — the thick-necked quarry of the moor. Once it has bitten into a creature, that creature cannot easily shake it, and every wasted moment spent pulling the wolf off is a moment the rest of the pack can close in." [trait/always/condition] — the model picked "adhesive" (no verb) over a concept-verb template (faultless-tracker)
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept]")
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
```


---

## Dame Marisel Vane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Marisel Vane | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Dame Marisel Vane

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

Warded Mending. Dame Marisel regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and its ward is within 30 feet of it.

Aura of Authority. While in a 10-foot Emanation originating from Dame Marisel, Dame Marisel and its allies have Advantage on attack rolls and saving throws, provided Dame Marisel doesn't have the Incapacitated condition.

Actions

Multiattack. Dame Marisel makes three attacks, using Longsword or Sling in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 15 (3d8 + 2) Bludgeoning damage.

Bonus Actions

Lay on Hands (2/Day). Dame Marisel touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Dame Marisel charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Cruel Slash (2/Day). Dame Marisel charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

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
[concept] signature elements: smites the unclean [behavior] | mends her soldiers [behavior] | oath-sworn crusader's iron panoply [body]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "When a foe's strike lands on one of her soldiers within her reach, Dame Marisel answers by stepping the wounded soldier back and taking their place in the shield wall, her own blade flashing at the attacker as she does. The ally slips free of the enemy's reach and she ends up standing where they stood, her next strike carrying the weight of the insult. She can only answer an attack this way when s" [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature miss: action — "When a foe's strike lands on one of her soldiers within her reach, Dame Marisel answers by stepping the wounded soldier back and taking their place in the shield wall, her own blade flashing at the attacker as she does. The ally slips free of the enemy's reach and she ends up standing where they stood, her next strike carrying the weight of the insult. She can only answer an attack this way when s" [reaction/on_being_hit/movement] — the model found no template that holds it (offered: rally, snap-shot, riposte, own-turn-punisher)
[reskin] value check: "Venomed Edge (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: coating -> Bonus Actions/"Venomed Edge (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Dame Marisel's oath is a live ember in her chest, and it flares hottest when she is hurt. Each time she takes damage from an unclean foe, her next strike on that same foe bites deeper, the oath remembering the wound and settling the score. She does not need to wound it first — the ember answers insult, not injury dealt." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Dame Marisel's oath is a live ember in her chest, and it flares hottest when she is hurt. Each time she takes damage from an unclean foe, her next strike on that same foe bites deeper, the oath remembering the wound and settling the score. She does not need to wound it first — the ember answers insult, not injury dealt." [trait/on_being_hit/damage] — the model found no template that holds it (offered: warded-mending, absorption, bloodied-burst, resonant-body, weapon-lodge, adhesive, bloodied-fury)
[reskin] signature template (trait): warded-mending -> Traits/"Warded Mending" ("exact concept match [verb: mend:concept, mends:concept, mending:concept]")
```


---

## Last Rearguard — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Rearguard | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Last Rearguard
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
Second Wind (2/Day). As a bonus action, the rearguard regains 19 (3d12) hit points.
Shield Jab. As a bonus action, one creature within 5 feet that hit the rearguard with an attack roll since the end of the rearguard's last turn takes 7 (2d6) bludgeoning damage.
Riposte (Reaction). When a creature within 5 feet of the rearguard misses it with a melee attack roll, the rearguard makes one Longsword attack against that creature.

Actions
Multiattack: The rearguard makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of the rearguard's next turn.
Shield Bash: One creature within 5 feet that the rearguard can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: longsword precision [object] | buckler bash that repositions and punishes [behavior] | unyielding defensive stance [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "The rearguard plants itself and raises the buckler, holding a lane of ground against everything in front of it. While it keeps this stance, anyone it struck with its shield moments ago finds the longsword already waiting for them — every swing against those off-balance foes bites deeper and truer, as if the veteran has measured exactly where they will stagger. It can hold the guard only while it s" [trait/start_of_turn/damage] — menu: warded-mending (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "The rearguard plants itself and raises the buckler, holding a lane of ground against everything in front of it. While it keeps this stance, anyone it struck with its shield moments ago finds the longsword already waiting for them — every swing against those off-balance foes bites deeper and truer, as if the veteran has measured exactly where they will stagger. It can hold the guard only while it s" [trait/start_of_turn/damage] — the model found no template that holds it (offered: warded-mending, patient-defense, rally)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "As it bleeds, the veteran grows colder and more exact: the worse its wounds, the less it wastes a cut, reading openings it would never have dared take fresh. Its blade finds the seams of a fight it has already lost." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "As it bleeds, the veteran grows colder and more exact: the worse its wounds, the less it wastes a cut, reading openings it would never have dared take fresh. Its blade finds the seams of a fight it has already lost." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Venomthorn Adept — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Venomthorn Adept | 5 | skirmisher-3 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Pressure Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · fail · ko-ungated: Actions/Merciless Strike: Stunned at will with neither a repeat save nor a one-turn cap
- read: def 3 / off 5 → 4; sustained 34 (2 × Pressure Strike); nova none; dmg 34

```
Venomthorn Adept

Medium Humanoid, Neutral

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

Swamp Stride. The adept ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The adept makes two attacks, using Pressure Strike or Spine Dart in any combination. It can replace one attack with a use of Merciless Strike.

Pressure Strike. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the adept's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the adept's next turn.

Spine Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Merciless Strike. Wisdom Saving Throw: DC 13, one creature within 30 feet that has the Stunned condition. Failure: 22 (5d8) Bludgeoning damage. Success: Half damage.

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
[concept] signature elements: pressure-point strikes that numb and paralyze [behavior] | venomous open-hand martial arts [behavior] | scaled lizardfolk body [body]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Pressure Strike); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "Once per fight, when the adept hits a stunned or bloodied foe with an open-hand strike, it floods that body's hidden door with venom, numbing the limb. Until the end of the adept's next turn, that target cannot use that limb: it can move or act, but not both, and it drops anything held in that hand." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature miss: action — "Once per fight, when the adept hits a stunned or bloodied foe with an open-hand strike, it floods that body's hidden door with venom, numbing the limb. Until the end of the adept's next turn, that target cannot use that limb: it can move or act, but not both, and it drops anything held in that hand." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, rampage, leap, delayed-brand, exploiter, coating)
[reskin] value check: "Merciless Strike" EV 17.1 vs floor 9.4 (one attack of 2) — dice 36 → 22 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The adept's scaled body can cling to any surface with the smallest claw-hold, even while striking or dodging, so it treats walls and ceilings as ordinary ground for movement and never falls unless it chooses to." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The adept's scaled body can cling to any surface with the smallest claw-hold, even while striking or dodging, so it treats walls and ceilings as ordinary ground for movement and never falls unless it chooses to." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Sable Rooftop Stalker — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Rooftop Stalker | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Sable Rooftop Stalker

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

Eave Runner. The stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The stalker makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The stalker takes the Dash, Disengage, or Hide action.

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
[concept] signature elements: strikes from concealment with advantage [behavior] | vanishes after each attack [behavior] | tiefling bloodline [body]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The stalker has watched its prey from the dark, and it uses that knowledge to make its strike. When it attacks a creature that has not yet noticed it or cannot see it, and that creature is also isolated from its allies, the attack tears through the target's guard and briefly leaves them gasping and off balance." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The stalker instinctively knows how to use the rooftops to disappear. Whenever it moves at least a short distance across elevated ground, broken masonry, or tight alleys, it can slip out of sight and become hidden from the creatures below, as long as it ends its movement where cover or shadow is available." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "The stalker instinctively knows how to use the rooftops to disappear. Whenever it moves at least a short distance across elevated ground, broken masonry, or tight alleys, it can slip out of sight and become hidden from the creatures below, as long as it ends its movement where cover or shadow is available." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: stalks:concept, stalk:concept]")
[reskin] print canon alignment: Neutral Evil -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Shortsword" — the Spy's own row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Gargoyle Poise" [catalog: false-appearance]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Gargoyle Poise: While the stalker remains motionless, it is indistinguishable from an ordinary stone gargoyle or roof ornament.
provenance: catalog template "false-appearance"
```


---

## Coilwarden — one marked soft

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coilwarden | 6 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 82 is 22% under the card's 105
- bands · soft · band: reads CR 4 (print at 6 reads 3–8, n=42)
- read: def 2 / off 6 → 4; sustained 44 (2 × Horn); nova none; dmg 44

```
Coilwarden

Large Monstrosity, Neutral

AC 15
Initiative +4 (14)

HP 82 (11d10 + 22)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
12
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +10

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Assassinate. During the first round of each combat, the coilwarden has Advantage on attack rolls against any creature that hasn't taken a turn. If the coilwarden hits a creature during that round, the target takes an extra 11 (2d10) Piercing damage.

Bloodied Frenzy. While Bloodied, the coilwarden has Advantage on attack rolls and saving throws.

Actions

Multiattack. The coilwarden makes two Horn attacks. It can replace one attack with a use of Creeping Dread.

Horn. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Piercing damage.

Creeping Dread. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the coilwarden's next turn. If the target was already Frightened by this ability, it also takes 21 (6d6) Psychic damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the coilwarden takes the Hide action.

Charge. The coilwarden moves up to half its Speed straight toward an enemy it can see.

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
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("herds prey into the maze") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: herding prey into the maze [behavior] | labyrinthine cunning [behavior] | devastating ambush [behavior]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] signature idea (action): "The coilwarden lowers its horns and drives forward in a broad, unstoppable sweep, forcing every creature in its path to stumble backward or be shoved bodily along ahead of it. It does not stop at the first body — the whole point is to keep pushing, shoving the herd deeper down the passage in a single rush, so the prey that scatters ahead of it end up exactly where the maze wants them." [action/save/movement] — menu: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "The coilwarden lowers its horns and drives forward in a broad, unstoppable sweep, forcing every creature in its path to stumble backward or be shoved bodily along ahead of it. It does not stop at the first body — the whole point is to keep pushing, shoving the herd deeper down the passage in a single rush, so the prey that scatters ahead of it end up exactly where the maze wants them." [action/save/movement] — the model found no template that holds it (offered: leap, gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground)
[reskin] value check: "Creeping Dread" EV 14.4 vs floor 10.9 (one attack of 2) — dice 11 → 21
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The coilwarden always knows the way deeper. When it moves, it leaves no trace of where it turned, and any creature that tries to follow it through the maze finds the corridors shifting behind it — the path that led in does not lead back out." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The coilwarden always knows the way deeper. When it moves, it leaves no trace of where it turned, and any creature that tries to follow it through the maze finds the corridors shifting behind it — the path that led in does not lead back out." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
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

Defensive Presence. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Knight's Command (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who keeps the line with a shiel") | defender: key "keeps the line" (class verb)
[concept] signature elements: holding the line with shield and longsword [behavior] | punishing anyone who tries to move past [behavior] | an oathbound knight of iron [body]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Oriel sets her shield square and drives forward in a short, measured shove, forcing one foe directly ahead of her back several paces along the ground and leaving it knocked off balance. If that foe is already had its guard dropped by her earlier longsword work, the shove fouls it worse. She must have her shield and a clear, flat path to make the slide; she does not leave her spot, only clears the " [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] value check: "Shield Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Shield Shove" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Oriel's oath is literal. As long as she can see a foe threaten the ground she guards, she shrugs off effects that would drag, push, or teleport her from her post, and any magic that would force her away fizzles against her planted shield. The moment she chooses to advance, that protection lapses until she plants again." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Oriel's oath is literal. As long as she can see a foe threaten the ground she guards, she shrugs off effects that would drag, push, or teleport her from her post, and any magic that would force her away fizzles against her planted shield. The moment she chooses to advance, that protection lapses until she plants again." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
```


---

## Ravening Blood-Wrack — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ravening Blood-Wrack | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Maul); nova none; dmg 54

```
Ravening Blood-Wrack

Medium Humanoid, Neutral

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

Berserk. Whenever the blood-wrack starts its turn Bloodied, roll 1d6. On a 6, the blood-wrack goes berserk. On each of its turns while berserk, the blood-wrack attacks the nearest creature it can see. If no creature is near enough to move to and attack, the blood-wrack attacks an object. Once the blood-wrack goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, the blood-wrack has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost the blood-wrack extra movement, and the blood-wrack can move across ice or snow without needing to make an ability check.

Actions

Multiattack. The blood-wrack makes two attacks, using Maul or Hurlstone in any combination.

Maul. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Hurlstone. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Rallying Roar (2/Day). Each ally within 30 feet of the blood-wrack gains 14 (4d6) Temporary Hit Points.

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
[route] brute type=Humanoid mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: wounded frenzy [behavior] | chained maul [object] | veins that blacken when blood spills [body]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "The blood-wrack's wounds feed a fever that spreads through its weapon. When it strikes a creature while its own hide is split open, threads of its hungering blood cling to the target and keep burning, gnawing at it from the inside whenever the target tries to fight back or pull away. The pain stokes the creature's frenzy, and it can share the fever with a fresh victim each time it draws blood." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — rampage (wound)
[reskin] signature miss: action — "The blood-wrack's wounds feed a fever that spreads through its weapon. When it strikes a creature while its own hide is split open, threads of its hungering blood cling to the target and keep burning, gnawing at it from the inside whenever the target tries to fight back or pull away. The pain stokes the creature's frenzy, and it can share the fever with a fresh victim each time it draws blood." [rider/on_hit/condition] — the model found no template that holds it (offered: rampage, stunning-strike, charge-push, hook-rider, pounce, charge, drain, throw-retrieve, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.7 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The blood-wrack's maul is bound to its wrist by a long, heavy chain. After it hurls the maul at a foe, the chain snaps taut and drags the weapon howling back into its hands, so it is never left empty-fisted and can keep swinging without pause. The same chain lets it reel in a struck enemy, pulling the fight closer where its fever can crest." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "The blood-wrack's maul is bound to its wrist by a long, heavy chain. After it hurls the maul at a foe, the chain snaps taut and drags the weapon howling back into its hands, so it is never left empty-fisted and can keep swinging without pause. The same chain lets it reel in a struck enemy, pulling the fight closer where its fever can crest." [trait/always/movement] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Maul" reach 10 -> 5 ft. — reach follows the goliath's size
```


---

## Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Mace: +7 derives from DEX, but an attack row rolls STR
- **dropped clause:** "blesses her soldiers"
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

Divine Mending Touch (2/Day). Vareth touches a creature within 5 feet of itself and restores 21 (6d6) Hit Points to it.

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
[concept] signature elements: blessing her soldiers with dawn-light [behavior] | sun-forged iron blade [object] | radiant mantle of protection [aura]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth raises her blessed blade and prays a single word of dawn-light, wrapping each ally she can see in a protective radiance. Until her next turn, those allies shine softly, steadier under fire and harder to strike cleanly. She cannot do this again right away, and the light fades if she falls." [action/once_per_fight/defense] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature miss: action — "Vareth raises her blessed blade and prays a single word of dawn-light, wrapping each ally she can see in a protective radiance. Until her next turn, those allies shine softly, steadier under fire and harder to strike cleanly. She cannot do this again right away, and the light fades if she falls." [action/once_per_fight/defense] — the model found no template that holds it (offered: rally, trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed)
[reskin] value check: "Lay on Hands (2/Day)" EV 11.6 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The dawn-light clinging to Vareth's sun-forged blade lingers on those it wounds, leaving a luminous mark she can see through walls and darkness. Her allies can see the mark too, and they fight more surely against any marked enemy." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Sun Blade" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Dawn Bolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Dawn Step" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. If the target is a creature, it has the Blinded condition until the start of Vareth's next turn.
provenance: none — the call wrote the text itself
```


---

## Ossian the Wall — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ossian the Wall | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Ossian the Wall

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

Multiattack. Ossian makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Ossian's next turn.

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
[concept] signature elements: holds the line with shield and mace [behavior] | iron-forged plate and bludgeon [body] | no magic, only mass and edge [object]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "After one of its mace strikes lands, Ossian plants itself between the victim and the nearest of its own allies, stepping hard into the line without yielding an inch. Until the start of its next turn, the struck foe must get through Ossian to do anything useful — any attempt to move past or around it, or to attack anyone other than Ossian, is met with a sudden, shattering counter-blow from the low-" [reaction/on_being_hit/condition] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] signature miss: action — "After one of its mace strikes lands, Ossian plants itself between the victim and the nearest of its own allies, stepping hard into the line without yielding an inch. Until the start of its next turn, the struck foe must get through Ossian to do anything useful — any attempt to move past or around it, or to attack anyone other than Ossian, is met with a sudden, shattering counter-blow from the low-" [reaction/on_being_hit/condition] — the model found no template that holds it (offered: snap-shot, riposte, ground-burst, own-turn-punisher, rally)
[reskin] value check: "Dazzling Burst" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ossian's iron-forged plate turns the first bite of every killing blow; when an attack would drop it to nothing, it instead stands at the edge of death and keeps swinging, still holding the line long enough for one last word. It does not fall until the wall itself is broken — then it drops on the second such blow, and not before." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Ossian's iron-forged plate turns the first bite of every killing blow; when an attack would drop it to nothing, it instead stands at the edge of death and keeps swinging, still holding the line long enough for one last word. It does not fall until the wall itself is broken — then it drops on the second such blow, and not before." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Throwing Hammer" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Salon Evanescent — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Salon Evanescent | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Salon Evanescent

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

Evasion. If the evanescent is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the evanescent instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The evanescent makes three Arcane Burst attacks. It can replace one attack with a use of Debt of Ruin.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The evanescent casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Debt of Ruin. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the evanescent's next turn. The first time the cursed target deals damage to any creature before then, it takes 14 (4d6) Necrotic damage. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). The evanescent casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The evanescent is hit by an attack roll. Response: The evanescent casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("is never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: never where the strike lands [behavior] | steps away into shadow [behavior] | courtly, mocking calm [aura]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The evanescent strikes where a target is about to be, not where they are, punishing committed movement. When it takes its attack, it can choose to aim each strike at a space a target just left, forcing them to be hit by their own momentum unless they break stride. If a target willingly moves on their turn after being marked this way, the next attack against them cannot miss and ignores cover." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature miss: action — "The evanescent strikes where a target is about to be, not where they are, punishing committed movement. When it takes its attack, it can choose to aim each strike at a space a target just left, forcing them to be hit by their own momentum unless they break stride. If a target willingly moves on their turn after being marked this way, the next attack against them cannot miss and ignores cover." [rider/on_hit/damage] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, delayed-brand, reveal, aggro-curse)
[reskin] value check: "Debt of Ruin" EV 10.9 vs floor 7.3 (one attack of 3) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The evanescent's courtly calm turns every miss into a lesson in etiquette, making it harder to land a blow as the fight drags on. Each time an attacker misses it, the evanescent murmurs a correction; the same attacker takes a growing penalty to future attacks against it, while the evanescent becomes more composed and confident." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "The evanescent's courtly calm turns every miss into a lesson in etiquette, making it harder to land a blow as the fight drags on. Each time an attacker misses it, the evanescent murmurs a correction; the same attacker takes a growing penalty to future attacks against it, while the evanescent becomes more composed and confident." [trait/on_being_hit/condition] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Folded Fan" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · lint:duplicate-entry: Actions/War-Roar: identical text to "Spear" — two names, one ability; rewrite this entry into something distinct
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

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

Common, Giant

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While Thurivald is not incapacitated, it and its allies within 10 feet of it have advantage on attack rolls and saving throws.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with War-Roar. It can replace one attack with a use of Traitor's Recoil.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
War-Roar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Traitor's Recoil: One creature charmed by Thurivald within 30 feet of it must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: war-song that drives allies into a fury [behavior] | spear and shield of the skald [object] | aura of commanding battle-joy [aura]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald's war-song drives his allies into a fury. Each ally who can hear him and who attacks the same enemy Thurivald has just struck fights with heightened aggression, and the song's power grows stronger as more of his warband joins the attack, making their blows hit harder and harder. The fury ends if Thurivald is silenced, stunned, or otherwise prevented from singing." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald's war-song drives his allies into a fury. Each ally who can hear him and who attacks the same enemy Thurivald has just struck fights with heightened aggression, and the song's power grows stronger as more of his warband joins the attack, making their blows hit harder and harder. The fury ends if Thurivald is silenced, stunned, or otherwise prevented from singing." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, stunning-strike)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever an enemy strikes Thurivald while he is singing, the song turns the wound into a rallying verse that echoes through his warband. His allies who can hear him feel a surge of defiant vigor, and the enemy who struck him finds no purchase in the skald's unbroken rhythm." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature miss: trait — "Whenever an enemy strikes Thurivald while he is singing, the song turns the wound into a rallying verse that echoes through his warband. His allies who can hear him feel a surge of defiant vigor, and the enemy who struck him finds no purchase in the skald's unbroken rhythm." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, weapon-lodge)
```


---

## Nychta Vale — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nychta Vale | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- reader · fail · name-mechanic: Actions/Poisoned Dart: the name promises Poison the text lacks
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Nychta Vale

Medium Humanoid, Lawful Neutral

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

Evasion. If Nychta is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Nychta instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Nychta has Advantage on attack rolls against any creature that hasn't taken a turn. If Nychta hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Shadowslip. Nychta ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Nychta makes two attacks, using Tanto or Poisoned Dart in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Poisoned Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Nychta takes the Dash, Disengage, or Hide action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Nychta moves up to half its Speed, and it makes one Tanto attack.

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
[concept] signature elements: moves through shadows [behavior] | strikes unseen [behavior] | poisoned dart [object]
[reskin] signature idea (action): "Nychta fades into the darkness and becomes nearly invisible, vanishing from sight even while being watched. While hidden this way, it can slip through the shadows to reappear behind a nearby creature, striking before they can react. The effect ends after it attacks or moves into bright light." [action/always/movement] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature miss: action — "Nychta fades into the darkness and becomes nearly invisible, vanishing from sight even while being watched. While hidden this way, it can slip through the shadows to reappear behind a nearby creature, striking before they can react. The effect ends after it attacks or moves into bright light." [action/always/movement] — the model found no template that holds it (offered: self-invisibility, leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, focus, feint-slip)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Those hit by Nychta's poisoned dart find the venom clings to their senses, making them sluggish and unresponsive to danger. Until they recover, their reactions are slowed enough that Nychta can exploit openings it normally couldn't, and they struggle to track its movements." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "Those hit by Nychta's poisoned dart find the venom clings to their senses, making them sluggish and unresponsive to danger. Until they recover, their reactions are slowed enough that Nychta can exploit openings it normally couldn't, and they struggle to track its movements." [trait/always/condition] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Shadowpick Imp — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadowpick Imp | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Shadowpick Imp

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

Senses darkvision 120 ft.; Passive Perception 13

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

Shadow's Rebuke. One creature within 5 feet that hit the imp with an attack roll since the end of the imp's last turn takes 6 (1d12) Necrotic damage.

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
[concept] signature elements: picking locks with shadow-formed tools [behavior] | shadow-stuff body [body] | bound to a devil's service [behavior]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp plunges its shadowpick into a lock, ward, or similar seal and twists; if the seal is magical, it unravels in a silent pulse of cold that burns whoever laid the ward. If the seal is mundane, the pick instead marks it with a splinter of living shadow: until the imp wills it otherwise, that object can be opened by the imp alone, and anyone else who tries feels the lock bite back with necrotic" [action/always/damage] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The imp plunges its shadowpick into a lock, ward, or similar seal and twists; if the seal is magical, it unravels in a silent pulse of cold that burns whoever laid the ward. If the seal is mundane, the pick instead marks it with a splinter of living shadow: until the imp wills it otherwise, that object can be opened by the imp alone, and anyone else who tries feels the lock bite back with necrotic" [action/always/damage] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, riposte, isolation)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The imp's body is spun from the same shadow-stuff as its pick, so it leaves no trace of its passage and cannot be pinned by light. While in dim light or darkness, it can slip through any gap no wider than its pick, and any effect that would reveal, outline, or bind it by light instead reveals only a smear of darkness that leaks away." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "The imp's body is spun from the same shadow-stuff as its pick, so it leaves no trace of its passage and cannot be pinned by light. While in dim light or darkness, it can slip through any gap no wider than its pick, and any effect that would reveal, outline, or bind it by light instead reveals only a smear of darkness that leaks away." [trait/always/movement] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Infernal" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Shadowpick" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Oathbound Sentinel — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbound Sentinel | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Grave-Worn Blade); nova none; dmg 52

```
Oathbound Sentinel

Medium Humanoid, Lawful Good

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

Languages Common, Celestial

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the sentinel, the sentinel and its allies have Advantage on attack rolls and saving throws, provided the sentinel doesn't have the Incapacitated condition.

Actions

Multiattack. The sentinel makes two attacks, using Grave-Worn Blade or Ruin Shard in any combination.

Grave-Worn Blade. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Ruin Shard. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 26 (5d8 + 4) Bludgeoning damage.

Bonus Actions

Retributive Rebuke. One creature within 5 feet that hit the sentinel with an attack roll since the end of the sentinel's last turn takes 10 (3d6) Bludgeoning damage.

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
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("knight-errant") | defender: key "knight" (class verb)
[concept] signature elements: shielding the weak [behavior] | bone-forged shield [object] | fallen order oath [aura]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The sentinel slams its shield into the ground, creating a resonant shockwave that forces enemies to focus on it or suffer a crippling blow. Any enemy that tries to move past it or attack an ally within its reach is struck by a bone-shattering shield bash that leaves them reeling. This punishment happens automatically the first time each round an enemy attempts to bypass the sentinel's protection, " [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature miss: action — "The sentinel slams its shield into the ground, creating a resonant shockwave that forces enemies to focus on it or suffer a crippling blow. Any enemy that tries to move past it or attack an ally within its reach is struck by a bone-shattering shield bash that leaves them reeling. This punishment happens automatically the first time each round an enemy attempts to bypass the sentinel's protection, " [reaction/on_being_hit/damage] — the model found no template that holds it (offered: rally, snap-shot, riposte, shield-bash, ground-burst, obstacle-pull, push-prone)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sentinel's shield is forged from the bones of its fallen order, and when it interposes itself between an ally and harm, the shield splinters and lashes out at the attacker. Any enemy that strikes an ally within the sentinel's reach is cut by flying bone shards, punishing them for ignoring the sentinel's guardianship." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The sentinel's shield is forged from the bones of its fallen order, and when it interposes itself between an ally and harm, the shield splinters and lashes out at the attacker. Any enemy that strikes an ally within the sentinel's reach is cut by flying bone shards, punishing them for ignoring the sentinel's guardianship." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
```


---

## Market Ghost — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Market Ghost | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 1 / off 3 → 2; sustained 24 (2 × Filched Blade); nova none; dmg 24

```
Market Ghost

Medium Humanoid, Chaotic Neutral

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

Crowd Dancer. The market ghost ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The market ghost makes two attacks, using Filched Blade or Thrown Knife in any combination.

Filched Blade. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Thrown Knife. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The market ghost takes the Dash, Disengage, or Hide action.

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
[concept] signature elements: uses market crowds as cover to hide and ambush [behavior] | a filched blade that drinks blood [object] | quick, silent climb to rooftops and awnings [body]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The market ghost hooks a victim with a low, close slash that leaves the wound ragged and open. While that cut stays untended, every drop of spilled blood calls the ghost back to the same mark, and it can dart through the crowd almost unerringly toward whoever is bleeding out. The wound won't close until someone takes the time to bind it, and all the while the ghost knows exactly where its victim i" [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] value check: "Dazzling Burst" EV 1.7 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The ghost's filched blade drinks blood it has already tasted. Once it has cut someone open, that blade seems to leap at the same wound from then on, as if it remembers the scent of the blood, making every later strike against that bleeding target bite deeper." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The ghost's filched blade drinks blood it has already tasted. Once it has cut someone open, that blade seems to leap at the same wound from then on, as if it remembers the scent of the blood, making every later strike against that bleeding target bite deeper." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, absorption)
```
