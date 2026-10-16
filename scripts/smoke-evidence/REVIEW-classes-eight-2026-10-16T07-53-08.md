# Review batch — classes-eight-2026-10-16T07-53-08

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Sifu | 5 | 2024 | skirmisher-3 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/6 |
| Ichorveil | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 1/1 | 5/7 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hollowaught | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 1/1 | 5/5 |
| Skallgrim the Bloody-Handed | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Ordained Wall | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Warden of the Fold | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Ashvowed Meridane | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Shadow-Veil Shinobi | 5 | 2024 | skirmisher-3-skulker | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (2) | 1/2 | 3/7 |
| Scarhide Pack-Leader | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Skeleton Key Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Mazehorn Reaver | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Ashen Vow of the Rampart | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Whisker Veil | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 1/5 |

**Dropped 4 of 19 user clauses** (coverage 79%); concept share 66% (52/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-skulker / reader: 2
- skirmisher-3 / gates: 1
- defender-5 / reader: 1
- skirmisher-3 / derivation: 1
- skirmisher-3-skulker / derivation: 1



---

## Scarhide Pack-Leader — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scarhide Pack-Leader | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Scarhide Pack-Leader

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

Pack Tactics. The pack-leader has Advantage on an attack roll against a creature if at least one of the pack-leader's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The pack-leader makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Charged Strike (2/Day). The pack-leader charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 6 (1d12) Piercing damage.

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
[concept] signature elements: pack tactics and flanking relays [behavior] | dire wolf hide and crushing jaws [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The pack-leader picks out one enemy that has already drawn blood from its pack this fight and names that enemy for the whole cadre. Every wolf that can see or hear the leader hunts that target as a relay, and any of them that strikes it from behind forces it to stagger, slowing it so the hunt stays on it. The bond dies when the prey does or when the leader is hurt badly enough to break its focus." [bonus_action/always/condition] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature miss: action — "The pack-leader picks out one enemy that has already drawn blood from its pack this fight and names that enemy for the whole cadre. Every wolf that can see or hear the leader hunts that target as a relay, and any of them that strikes it from behind forces it to stagger, slowing it so the hunt stays on it. The bond dies when the prey does or when the leader is hurt badly enough to break its focus." [bonus_action/always/condition] — the model found no template that holds it (offered: focus, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, feint-slip, coating)
[reskin] value check: "Venomed Edge (2/Day)" EV 3.3 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: coating -> Bonus Actions/"Venomed Edge (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is crisscrossed with old scars that have grown over into a hard, ridged shell. Blades and claws skid across the thickest parts, and glancing hits almost never find the meat beneath." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Its hide is crisscrossed with old scars that have grown over into a hard, ridged shell. Blades and claws skid across the thickest parts, and glancing hits almost never find the meat beneath." [trait/on_being_hit/defense] — the model found no template that holds it (offered: faultless-tracker, heated-body, absorption, bloodied-burst, resonant-body)
[reskin] print canon size: Medium -> Large — the Dire Wolf's
[reskin] print canon attack: "Fangs" -> "Bite" — the Dire Wolf's own row
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Relays" is the seat's, not the Dire Wolf's
```


---

## Ashvowed Meridane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Meridane | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Oathblade); nova none; dmg 54

```
Ashvowed Meridane

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

Aura of Authority. While in a 10-foot Emanation originating from Meridane, Meridane and its allies have Advantage on attack rolls and saving throws, provided Meridane doesn't have the Incapacitated condition.

Actions

Multiattack. Meridane makes three attacks, using Oathblade or Smiting Lance in any combination.

Oathblade. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Smiting Lance. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Meridane touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Meridane charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Sanguine Edge (2/Day). Meridane charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

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
[concept] signature elements: oath-aura that anchors and mends her soldiers [aura] | consecrated strikes against unclean foes [behavior] | ash-scarred armor and crusader's blade [object]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Meridane levels her consecrated strike against a foe she can see, and the blow carries her oath into their flesh: the wound refuses to close, searing them with ash-light whenever they raise a hand against her or her allies. The unclean she marks this way cannot slip free of it by fleeing out of reach — the oath simply waits, burning in them until they fall or until an ally of Meridane's mends the " [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature miss: action — "Meridane levels her consecrated strike against a foe she can see, and the blow carries her oath into their flesh: the wound refuses to close, searing them with ash-light whenever they raise a hand against her or her allies. The unclean she marks this way cannot slip free of it by fleeing out of reach — the oath simply waits, burning in them until they fall or until an ally of Meridane's mends the " [rider/on_hit/damage] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, reveal, aggro-curse, curse-debt, patient-defense)
[reskin] value check: "Venomed Edge (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: coating -> Bonus Actions/"Venomed Edge (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Ash clings to Meridane's armor and blade as an old scar never leaves the skin — whenever a foe draws blood from her or a nearby ally, that spilled blood settles into her as consecrated ash, and Meridane turns her next strike against that same foe with doubled fury. She grows more terrible the more her company bleeds, until the wound is answered." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Ash clings to Meridane's armor and blade as an old scar never leaves the skin — whenever a foe draws blood from her or a nearby ally, that spilled blood settles into her as consecrated ash, and Meridane turns her next strike against that same foe with doubled fury. She grows more terrible the more her company bleeds, until the wound is answered." [trait/on_being_hit/damage] — the model found no template that holds it (offered: warded-mending, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, terrain-walk, uncanny-sense, bound)
```


---

## Hollowaught — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollowaught | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form |

- reader · fail · inline-form: the call called "Hollowaught" a kind and the sheet speaks it as "Hollowaught" — a kind starts with "the"
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Hollowaught
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
Second Wind (2/Day). As a bonus action, Hollowaught regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Hollowaught misses it with a melee attack roll, Hollowaught makes one Longsword attack against that creature.

Actions
Multiattack: Hollowaught makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Hollowaught's next turn.
Shield Bash: One creature within 5 feet that Hollowaught can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: longsword and buckler proficiency [object] | shield bash that staggers and repositions [behavior] | holds the line and never retreats [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "Hollowaught slams its buckler into a foe and pivots forward into the space, using the momentum to drive that enemy back and drag a nearby ally behind its guard. The shove clears a path it immediately plugs — the thing it bashed is the thing now standing on the wrong side of its shield." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature miss: action — "Hollowaught slams its buckler into a foe and pivots forward into the space, using the momentum to drive that enemy back and drag a nearby ally behind its guard. The shove clears a path it immediately plugs — the thing it bashed is the thing now standing on the wrong side of its shield." [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, obstacle-pull, herd, rally)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Every time Hollowaught parries a blow with its longsword or takes a hit on its buckler, it answers in the same breath — the attacker gets cut before it can pull back. Stepping into its reach means trading a wound for the privilege." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Every time Hollowaught parries a blow with its longsword or takes a hit on its buckler, it answers in the same breath — the attacker gets cut before it can pull back. Stepping into its reach means trading a wound for the privilege." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, guarded-stance)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Mire Sifu — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mire Sifu | 5 | skirmisher-3 | ok | ok | ok | FAIL: ko-ungated | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- gates · fail · ko-ungated: Actions/Sealing Breath Palm: Stunned at will with neither a repeat save nor a one-turn cap
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Mire Sifu

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Climb 30 ft., Swim 40 ft.

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

Hold Breath. The mire sifu can hold its breath for 15 minutes.

Fen Step. The mire sifu ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The mire sifu makes two attacks, using Open Palm or Reed Spine in any combination. It can replace one attack with a use of Sealing Breath Palm.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the mire sifu's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the mire sifu's next turn.

Reed Spine. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Sealing Breath Palm. Constitution Saving Throw: DC 13, one creature within 30 feet that has the Stunned condition. Failure: 22 (5d8) Bludgeoning damage. Success: Half damage.

Bonus Actions

Fleet Agility. The mire sifu takes the Dash or Disengage action.

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
[concept] signature elements: pressure-point strikes with an open hand [behavior] | lizardfolk scaled hide and fen-dweller body [body] | the clinic of the open palm—each touch a targeted joint-lock [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "The mire sifu reads a foe it has already touched and strikes the same hidden hinge a second time with an open palm. Instead of just locking the body, the follow-up shuts the breath and the heart's rhythm down, leaving the target gasping and unable to act as the sifu slips back into the reeds. It only works on someone the sifu itself has already pressed and left reeling, so it is the finishing answ" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] value check: "Sealing Breath Palm" EV 17.1 vs floor 9.4 (one attack of 2) — dice 36 → 22 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Sealing Breath Palm" ("The finish only works on a foe the sifu itself has already pressed and left reel [verb: finish:idea]")
[reskin] signature idea (trait): "The mire sifu's body is a fen-dweller's, scaled and cold, so shallow water, mud, and reeds do not slow it or betray it. It leaves no trail a pursuer can follow and does not suffer the costs of fighting half-submerged, turning any swamp into its dojo." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## Ichorveil — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ichorveil | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form |

- reader · fail · inline-form: the call called "Ichorveil" a kind and the sheet speaks it as "Ichorveil" — a kind starts with "the"
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Ichorveil

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

Ichor Trail. Ichorveil knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, Ichorveil has Advantage on attack rolls against any creature that hasn't taken a turn. If Ichorveil hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Flow. Ichorveil ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Ichorveil makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Ichorveil takes the Dash, Disengage, or Hide action.

Ichor Sight (2/Day). Ichorveil has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: rooftop stalking and ambush from above [behavior] | venom-coated blades [object] | climbing across sheer walls and rooftops [body]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Ichorveil throws a specially prepared blade at a creature it has already wounded, and that blade finds the old bite. The wound reopens and the venom already in the target's blood surges through it, so the creature is left reeling and unable to call for help until it tears itself free of the spreading ichor." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Ichorveil's blades are slick with a venom that clings to flesh and blood. A creature struck by Ichorveil keeps bleeding that black ichor for a short time, leaving a clear trail for the tiefling to follow and making the victim easier for Ichorveil to hunt across the rooftops." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature template (trait): faultless-tracker -> Traits/"Ichor Trail" ("The struck creature keeps bleeding black ichor, leaving a clear trail for Ichorv [verb: stalks:concept, stalk:concept, hunts:idea, hunted:idea, trail:idea, follows:idea]")
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Envenomed Dagger" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Weighted Fangblade" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Prey" [catalog: uncanny-sense]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Ichorveil has Advantage on attack rolls against any creature that hasn't taken a turn. If Ichorveil hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Prey: Ichorveil can pinpoint the location of moving creatures within 60 feet of itself.
provenance: catalog template "uncanny-sense"
```


---

## Skeleton Key Imp — one marked soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skeleton Key Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Sting); nova none; dmg 30

```
Skeleton Key Imp

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

Magic Resistance. The key imp has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The key imp makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The key imp shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The key imp casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The key imp takes the Disengage or Hide action.

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
[concept] signature elements: picking locks for a devil [behavior] | shadow-stuff body that slips through keyholes [body] | thieves' tools made of infernal iron [object]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The imp drives its stiletto at a seam in armor, a lock, or a throat and gives it a vicious twist. On its next turn, if it is hidden or if a nearby enemy is distracted by another fight, that target suffers extra fire inside its own lock—the wound starts to glow and burn from the keyhole." [action/always/damage] — menu: trample, leap, gaze-single, snare, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.3 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The imp's body is a shadow-stuffed skeleton key: whenever it is hidden and a lock, chest, or doorway is within reach, it can slip itself through the keyhole and stealthily open the way from the far side. It leaves behind a lingering brimstone whiff that sharp-eyed guards can use to track it." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "The imp's body is a shadow-stuffed skeleton key: whenever it is hidden and a lock, chest, or doorway is within reach, it can slip itself through the keyhole and stealthily open the way from the far side. It leaves behind a lingering brimstone whiff that sharp-eyed guards can use to track it." [trait/always/movement] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 50 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Stiletto" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Lockstep" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
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

Knight's Rally (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line") | defender: key "keeps the line" (class verb)
[concept] signature elements: holds the line with shield and longsword [behavior] | punishes anyone who moves past [behavior] | oath-kept grave-watch [body]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Dame Oriel drives her shield forward at a creature in front of her, forcing it back and robbing it of its footing. She then plants her shield in the gap, and until she moves, anyone trying to slip past or reach past her runs into that planted shield. The shove works even on a larger creature if it fails to hold its ground." [action/save/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] value check: "Shieldshove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Shieldshove" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Dame Oriel's oath is to the ground beneath her. If magic or force would move her from where she stands, she can refuse, and she never suffers any penalty from standing her ground. She does not pursue; she only holds." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Dame Oriel's oath is to the ground beneath her. If magic or force would move her from where she stands, she can refuse, and she never suffers any penalty from standing her ground. She does not pursue; she only holds." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Skallgrim the Bloody-Handed — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skallgrim the Bloody-Handed | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Skallgrim the Bloody-Handed

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

Berserk. Whenever Skallgrim starts its turn Bloodied, roll 1d6. On a 6, Skallgrim goes berserk. On each of its turns while berserk, Skallgrim attacks the nearest creature it can see. If no creature is near enough to move to and attack, Skallgrim attacks an object. Once Skallgrim goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Skallgrim has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Skallgrim extra movement, and Skallgrim can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Skallgrim makes two attacks, using Greataxe or Hurlaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Bloody Riposte. One creature within 5 feet that hit Skallgrim with an attack roll since the end of Skallgrim's last turn takes 11 (2d10) Bludgeoning damage.

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
[concept] signature elements: loss of control when wounded [behavior] | reckless greataxe attacks [object] | fights to the death [behavior]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "When Skallgrim is already wounded, every greataxe swing becomes an all-or-nothing haymaker: he throws his whole mass behind the blow, so a connecting hit crushes far harder than his size should allow. The wildness costs him — if the swing misses, he overextends and is left wide open until he can recover his footing." [action/always/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] signature miss: action — "When Skallgrim is already wounded, every greataxe swing becomes an all-or-nothing haymaker: he throws his whole mass behind the blow, so a connecting hit crushes far harder than his size should allow. The wildness costs him — if the swing misses, he overextends and is left wide open until he can recover his footing." [action/always/damage] — the model found no template that holds it (offered: rampage, affliction, trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, second-wind)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The more blood Skallgrim loses, the less he defends himself; while wounded he stops guarding entirely and simply trades blows, leaving himself open to every attacker in reach. He cannot be talked down or made to retreat while this lasts — he fights on until he or everything near him is broken." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "The more blood Skallgrim loses, the less he defends himself; while wounded he stops guarding entirely and simply trades blows, leaving himself open to every attacker in reach. He cannot be talked down or made to retreat while this lasts — he fights on until he or everything near him is broken." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
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
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("who blesses her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers with radiant wards [behavior] | sun-forged iron mace [object] | aura of dawnlight that strengthens allies [aura]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth sweeps her sun-forged mace low across the ground in front of her, and the dawnfire lodged in the iron tears free in a wide arc of light. Every soldier she has warded — including herself — is caught in that light and feels their wounds close and their shield-arm steady, while enemies caught in the same arc are seared and knocked staggering back a step." [action/always/defense] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature miss: action — "Vareth sweeps her sun-forged mace low across the ground in front of her, and the dawnfire lodged in the iron tears free in a wide arc of light. Every soldier she has warded — including herself — is caught in that light and feels their wounds close and their shield-arm steady, while enemies caught in the same arc are seared and knocked staggering back a step." [action/always/defense] — the model found no template that holds it (offered: rally, trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, hook-rider, rampage)
[reskin] value check: "Lay on Hands (2/Day)" EV 11.6 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: lay-on-hands -> Bonus Actions/"Lay on Hands (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every blow Vareth lands with her mace leaves a lick of dawnfire clinging to the target. Her allies who strike that marked enemy next feel the light flare against them, burning the enemy again and lending the ally's own weapon a glint of that same radiance until the fire gutters out." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Every blow Vareth lands with her mace leaves a lick of dawnfire clinging to the target. Her allies who strike that marked enemy next feel the light flare against them, burning the enemy again and lending the ally's own weapon a glint of that same radiance until the fire gutters out." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Sun-forged Mace" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Dawnbolt" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Battle-Runner" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [catalog: active-toll]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Constitution Saving Throw*: DC 14, each creature in a 20-foot Emanation originating from Vareth. *Failure:* 22 (4d8 + 4) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage only.
provenance: catalog template "active-toll"
```


---

## Ordained Wall — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ordained Wall | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Ordained Wall

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

Senses darkvision 30 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The wall makes two Mace attacks.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the wall's next turn.

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
[concept] signature elements: planting a shield wall that punishes anyone who moves past [behavior] | an oathbound refusal to retreat, even bloodied [behavior] | a heavy iron mace and scarred shield [object]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "With a grunt, the templar slams its scarred shield down and braces into a fixed wall, anchoring itself where it stands while enemies batter against its guard. Any foe within reach that tries to slip past or through its line is answered with a brutal, punishing mace blow that shakes bone through steel." [action/always/defense] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The templar's scarred shield and heavy iron mace are extensions of its oath, turning every parry into a chance to punish the attacker. Whenever a blow lands on the templar, it can twist its shield to answer with a swift, rattling blow that leaves the aggressor reeling." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Scourge" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Warden of the Fold — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Warden of the Fold | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Warden of the Fold

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

Multiattack. The fold makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The fold casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The fold casts Misty Step, using the same spellcasting ability as Spellcasting.

Warden's Rebuke. One creature within 5 feet that hit the fold with an attack roll since the end of the fold's last turn takes 6 (1d12) Bludgeoning damage.

Reactions

Protective Magic (3/Day). Trigger: The fold is hit by an attack roll. Response: The fold casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: is never where the last strike fell [behavior] | a folded shadow-body that steps through space [body] | one precise spellstrike from a blind spot [behavior]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The fold picks a creature it can see and folds the space between them shut, so that its next strike arrives as though thrown from the victim's blind spot — the target's guard is measured against where the fold was, not where the blow comes from, leaving it wide open to that one hit. The fold flickers to the far side of the chosen creature as part of the same motion, so the duel resets with the fol" [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature miss: action — "The fold picks a creature it can see and folds the space between them shut, so that its next strike arrives as though thrown from the victim's blind spot — the target's guard is measured against where the fold was, not where the blow comes from, leaving it wide open to that one hit. The fold flickers to the far side of the chosen creature as part of the same motion, so the duel resets with the fol" [rider/on_hit/movement] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, aggro-curse, sensory-strike)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the fold would be struck, the warding lattice it is bound to tugs it one fold sideways — the attack passes through the space it just vacated, and the fold reappears a short step away with the strike already spent. It can only be tugged so far; the lattice frays if forced too often in quick succession." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Whenever the fold would be struck, the warding lattice it is bound to tugs it one fold sideways — the attack passes through the space it just vacated, and the fold reappears a short step away with the strike already spent. It can only be tugged so far; the lattice frays if forced too often in quick succession." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, bound)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Glimmer Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Sword); nova none; dmg 42

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

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet. The target must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Sword and one with Warhorn. It can replace one attack with a use of Traitor's Lash.
Sword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Warhorn: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Traitor's Lash: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: the fury-song that quickens allies [behavior] | voice as the weapon of the warband [behavior] | his blood-smeared drum and iron-tipped spear [object]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald raises the Hymn of Iron and keeps it going while he fights — as long as he is singing, every ally who can hear him feels their fury stoked, striking harder and shaking off wounds that should have stopped them. The song only dies if he is silenced or chooses to stop; the longer he holds the note, the deeper it sinks into their blood." [action/always/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald raises the Hymn of Iron and keeps it going while he fights — as long as he is singing, every ally who can hear him feels their fury stoked, striking harder and shaking off wounds that should have stopped them. The song only dies if he is silenced or chooses to stop; the longer he holds the note, the deeper it sinks into their blood." [action/always/resource] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, rally)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's war-drum is stretched from the skins of the fallen and his spear is tipped with old iron; when his blood is drawn, it smears across drum and shaft and his allies' wounds begin to close as his chant rises in answer — the more he is hurt, the more fiercely his song quickens them." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature miss: trait — "Thurivald's war-drum is stretched from the skins of the fallen and his spear is tipped with old iron; when his blood is drawn, it smears across drum and shaft and his allies' wounds begin to close as his chant rises in answer — the more he is hurt, the more fiercely his song quickens them." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, weapon-lodge, uncanny-sense)
```


---

## Shadow-Veil Shinobi — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadow-Veil Shinobi | 5 | skirmisher-3-skulker | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- derivation · fail · attack-stat: Poisoned Blade: +6 derives from DEX, but an attack row rolls STR
- reader · fail · name-mechanic: Actions/Poisoned Blade: the name promises Poison the text lacks
- **dropped clause:** "moves through the shadows"
- read: def 3 / off 5 → 4; sustained 34 (2 × Poisoned Blade); nova none; dmg 34

```
Shadow-Veil Shinobi

Medium Humanoid, Lawful Neutral

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

Evasion. If the shinobi is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shinobi instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the shinobi has Advantage on attack rolls against any creature that hasn't taken a turn. If the shinobi hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Shadow Step. The shinobi ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The shinobi makes two attacks, using Poisoned Blade or Shadow Bolt in any combination.

Poisoned Blade. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Shadow Bolt. Ranged Attack Roll: +6, range 80/320 ft. 16 (3d8 + 3) Poison damage.

Bonus Actions

Cunning Action. The shinobi takes the Dash, Disengage, or Hide action.

Vanish and Stab (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the shinobi moves up to half its Speed, and it makes one Poisoned Blade attack.

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
[concept] signature elements: strikes from stealth and vanishes [behavior] | body made of living shadow [body] | shadow-step teleportation [behavior]
[reskin] signature idea (action): "When the shinobi strikes a foe who has not yet located it in the fight, that first cut lands far heavier than its ordinary blade, and the wound refuses to close — the poison seeps deeper each time the victim strains or fights on. It is the opening cut that decides the duel: the target is left bleeding from within, weakening as the shinobi melts back into the dark." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature miss: action — "When the shinobi strikes a foe who has not yet located it in the fight, that first cut lands far heavier than its ordinary blade, and the wound refuses to close — the poison seeps deeper each time the victim strains or fights on. It is the opening cut that decides the duel: the target is left bleeding from within, weakening as the shinobi melts back into the dark." [rider/on_hit/damage] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, delayed-brand, rampage, aggro-curse, coating, riposte)
[reskin] value check: "Rampage (1/Day)" EV 17.7 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The shinobi is not merely hidden but half-real: while it lurks in dim light or darkness, its body thins into living shadow, so blows that would land on a solid figure pass through empty gloom. Any wound it takes, however, hardens it back into flesh and proves to its enemies exactly where it stands — until it slips away once more." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Mazehorn Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mazehorn Reaver | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Mazehorn Reaver

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

Bloodied Frenzy. While Bloodied, the reaver has Advantage on attack rolls and saving throws.

Actions

Multiattack. The reaver makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reaver moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

Answering Sting. One creature within 5 feet that hit the reaver with an attack roll since the end of the reaver's last turn takes 7 (2d6) Bludgeoning damage.

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
[concept] signature elements: herding prey into a maze [behavior] | massive bone-laced greataxe [object]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] signature idea (action): "The reaver swings its greataxe in a wide, low sweep that drags along the ground, not aiming to cut but to drive. Every enemy caught in the arc is shoved bodily away from the reaver and herded toward a direction it chooses, stumbling as they go; those who brace against the push take the blade's full bite instead." [action/save/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] signature miss: action — "The reaver swings its greataxe in a wide, low sweep that drags along the ground, not aiming to cut but to drive. Every enemy caught in the arc is shoved bodily away from the reaver and herded toward a direction it chooses, stumbling as they go; those who brace against the push take the blade's full bite instead." [action/save/movement] — the model picked "ground-burst" (no verb) over a concept-verb template (herd)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The reaver's axe is a massive slab of bone-laced iron; any wound it opens festers with splinters of cursed horn, making the victim's own blood betray them. While bleeding from such a wound, the victim leaves a clear trail the reaver can track, and their wild panic only sharpens the reaver's pursuit." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
```


---

## Ashen Vow of the Rampart — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Vow of the Rampart | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shields the weak"
- read: def 6 / off 8 → 7; sustained 52 (2 × Broadsword); nova none; dmg 52

```
Ashen Vow of the Rampart

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

Aura of Authority. While in a 10-foot Emanation originating from the vow, the vow and its allies have Advantage on attack rolls and saving throws, provided the vow doesn't have the Incapacitated condition.

Actions

Multiattack. The vow makes two attacks, using Broadsword or Shield Slam in any combination. It can replace one attack with a use of Creeping Dread.

Broadsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Shield Slam. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Creeping Dread. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the vow's next turn. If the target was already Frightened by this ability, it also takes 24 (7d6) Psychic damage.

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
[concept] signature elements: shielding the weak [behavior] | iron shield and blade [object] | the fallen order's oath [aura]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The vow slams its iron-shod shield into a foe, and with the impact bellows the old order's challenge: that enemy is marked as its sworn foe until it falls or the vow does, and while the mark holds the vow can turn any blow that foe aims at anyone else back onto itself, stepping into the strike. If the marked foe tries to move away, the vow answers at once, driving shield and blade after it to keep" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature miss: action — "The vow slams its iron-shod shield into a foe, and with the impact bellows the old order's challenge: that enemy is marked as its sworn foe until it falls or the vow does, and while the mark holds the vow can turn any blow that foe aims at anyone else back onto itself, stepping into the strike. If the marked foe tries to move away, the vow answers at once, driving shield and blade after it to keep" [rider/on_hit/condition] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, aggro-curse, terror-pulse, push-prone, reveal, own-turn-punisher)
[reskin] value check: "Creeping Dread" EV 16.6 vs floor 13 (one attack of 2) — dice 13 → 24
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "As long as the vow still stands between the wolves and the flock, the nearest ally it guards draws on the shield's iron certainty and the bellowed orders of the fallen order, steadying their nerve. If the vow is ever felled, that protection passes to whoever stands closest to its body, still shielding the weak even in death." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "As long as the vow still stands between the wolves and the flock, the nearest ally it guards draws on the shield's iron certainty and the bellowed orders of the fallen order, steadying their nerve. If the vow is ever felled, that protection passes to whoever stands closest to its body, still shielding the weak even in death." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
```


---

## Whisker Veil — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisker Veil | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "slips through the market crowd"
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Whisker Veil

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

Crowd Step. The veil ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The veil makes two attacks, using Dagger or Thrown Knife in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Thrown Knife. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The veil takes the Dash, Disengage, or Hide action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the veil moves up to half its Speed, and it makes one Dagger attack.

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
[concept] signature elements: hiding in the crowd before striking [behavior] | a concealed cutpurse's blade [object] | feline agility and claws [body]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "A moment after the veil is struck, it can vanish into the nearest press of bodies as if it were never there, and then reappear behind whoever just hurt it. The attacker feels a hand at its purse a heartbeat later, and the veil has a clear opening to strike." [reaction/on_being_hit/movement] — menu: snap-shot, riposte (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature miss: action — "A moment after the veil is struck, it can vanish into the nearest press of bodies as if it were never there, and then reappear behind whoever just hurt it. The attacker feels a hand at its purse a heartbeat later, and the veil has a clear opening to strike." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: feint-slip, snap-shot, riposte, self-invisibility)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The cutpurse's actual blade is not the one you see; it is a thin, hidden edge she draws only when a mark's guard drops. Anyone who thinks they have cornered her discovers too late that the visible knife was a distraction and the real cut was already made." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] species kit: Climb 30 ft. — the tabaxi's
```
