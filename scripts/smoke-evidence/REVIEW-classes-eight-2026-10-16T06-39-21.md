# Review batch — classes-eight-2026-10-16T06-39-21

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Venom Palm Initiate | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Hollow Chimney Nix | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Garrick the Wall | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Grendh Skarn-Blood | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Brother Halric | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Unmet Strike | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Serelda Vane | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/7 |
| Silent Kage | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 1/2 | 2/7 |
| Greyfell Packlord | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Kilkil the Locksmith's Finger | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Vault Marauder | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Iron Vigil | 7 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/4 |
| Bone-Ledger Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 63% (50/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- skirmisher-3-skulker / reader: 1
- defender-5 / structure: 1



---

## Greyfell Packlord — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Greyfell Packlord | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Greyfell Packlord

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

Pack Tactics. The packlord has Advantage on an attack roll against a creature if at least one of the packlord's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The packlord makes two Bite attacks.

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
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: coordinated pack hunting [behavior] | hit-and-run skirmishing [behavior] | savage fangs and pack-torn hide [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The packlord savages one creature already wounded by it or its pack. Its packmates seize the opening, each one that can reach the prey tearing into it at the same moment. The packlord cannot use this again until it has spent a breath circling the fight." [action/save/condition] — menu: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature miss: action — "The packlord savages one creature already wounded by it or its pack. Its packmates seize the opening, each one that can reach the prey tearing into it at the same moment. The packlord cannot use this again until it has spent a breath circling the fight." [action/save/condition] — the model found no template that holds it (offered: focus, trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, rampage, riposte, affliction)
[reskin] value check: "Horrid Display (2/Day)" EV 13.2 vs floor 20.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The packlord knows the smell of its own blood. Once the fight has gone badly enough, it stops pressing the attack and falls back toward its pack, keeping out of reach while the pack takes over the kill." [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "The packlord knows the smell of its own blood. Once the fight has gone badly enough, it stops pressing the attack and falls back toward its pack, keeping out of reach while the pack takes over the kill." [trait/start_of_turn/movement] — the model found no template that holds it (offered: faultless-tracker, fire-aura, warded-mending, uncanny-sense, bloodied-fury, bloodied-burst)
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Skirmisher" is the seat's, not the Dire Wolf's
```


---

## Serelda Vane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Serelda Vane | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Serelda Vane

Medium Humanoid, Lawful Neutral

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

Warded Mending. Serelda regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and its ward is within 30 feet of it.

Aura of Authority. While in a 10-foot Emanation originating from Serelda, Serelda and its allies have Advantage on attack rolls and saving throws, provided Serelda doesn't have the Incapacitated condition.

Actions

Multiattack. Serelda makes three attacks, using Longsword or Oathbolt in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Oathbolt. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Serelda touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Serelda charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Cruel Edge (2/Day). Serelda charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Slashing damage.

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
[concept] signature elements: smiting the unclean [behavior] | mending her soldiers [behavior] | oath-sworn banner and iron [object]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] signature idea (action): "Serelda marks an unclean foe she can see as a sworn target of her oath — anything undead, fiendish, or otherwise defiled by her faith's reckoning. While the mark stands, every soldier fighting behind her banner can strike that target as surely as she does, and the target cannot slip away from the line without paying for it. She can only hold one such oath at a time; when the marked thing falls, sh" [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature miss: action — "Serelda marks an unclean foe she can see as a sworn target of her oath — anything undead, fiendish, or otherwise defiled by her faith's reckoning. While the mark stands, every soldier fighting behind her banner can strike that target as surely as she does, and the target cannot slip away from the line without paying for it. She can only hold one such oath at a time; when the marked thing falls, sh" [action/always/condition] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse)
[reskin] value check: "Venomed Edge (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: coating -> Bonus Actions/"Venomed Edge (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Serelda's banner is planted in the ground where she last swore her oath, and iron will not let her abandon it — while she stands her ground near that point she fights with grim certainty, and any ally who breaks from the line toward the banner feels her oath pull them back into formation. The banner is a place, not a piece of cloth: as long as it stands, the company has somewhere to reform." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Serelda's banner is planted in the ground where she last swore her oath, and iron will not let her abandon it — while she stands her ground near that point she fights with grim certainty, and any ally who breaks from the line toward the banner feels her oath pull them back into formation. The banner is a place, not a piece of cloth: as long as it stands, the company has somewhere to reform." [trait/always/movement] — the model picked "bound" (no verb) over a concept-verb template (warded-mending)
[reskin] signature template (trait): warded-mending -> Traits/"Warded Mending" ("exact concept match [verb: mend:concept, mends:concept, mending:concept]")
```


---

## Garrick the Wall — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Garrick the Wall | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Garrick the Wall
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
Second Wind (2/Day). As a bonus action, Garrick regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Garrick misses him with a melee attack roll, Garrick makes one Longsword attack against that creature.

Actions
Multiattack: Garrick makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Garrick's next turn.
Shield Bash: One creature within 5 feet of Garrick that he can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler bash that staggers [behavior] | longsword disciplined strikes [object] | holds the line, punishes movement past [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "When a foe turns to slip past Garrick and flee, he steps into the gap and drives his buckler into their ribs, shoving them back behind his line and leaving them stumbling and off balance. He can only catch one runner per beat of the fight, and only if they are close enough to reach." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "When a foe turns to slip past Garrick and flee, he steps into the gap and drives his buckler into their ribs, shoving them back behind his line and leaving them stumbling and off balance. He can only catch one runner per beat of the fight, and only if they are close enough to reach." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: herd, own-turn-punisher)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Garrick's longsword work is parade-ground precise: knowing where the shield check just left an enemy wide open, his next strike lands where their guard cannot follow, and his measured backsteps let him guide allies out of the killing ground without turning his back." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Garrick's longsword work is parade-ground precise: knowing where the shield check just left an enemy wide open, his next strike lands where their guard cannot follow, and his measured backsteps let him guide allies out of the killing ground without turning his back." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon alignment: Neutral Good -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Dwarvish" -> "Common, Dwarvish" — the Warrior Infantry's plus the concept's Dwarvish
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---

## Venom Palm Initiate — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Venom Palm Initiate | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm Strike: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm Strike); nova none; dmg 34

```
Venom Palm Initiate

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

Hold Breath. The initiate can hold its breath for 15 minutes.

Marsh Stride. The initiate ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The initiate makes two attacks, using Open Palm Strike or Venom Spit in any combination.

Open Palm Strike. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the initiate's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the initiate's next turn.

Venom Spit. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The initiate takes the Dash or Disengage action.

Blood in the Water (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the initiate moves up to half its Speed, and it makes one Open Palm Strike attack.

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
[route] skirmisher type=Humanoid mechanics=grapple — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: open-palm pressure-point strikes [behavior] | venomous lizardfolk physiology [body] | pack-hunting skirmisher tactics [behavior]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm Strike); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "The initiate hoods its open hand and drives a needlepoint strike into the exact point its earlier hits have been softening, turning its whole flurry into one culminating blow that leaves the target's limbs slack and useless; if that blow lands on someone already reeling from its pressure-point work, the numbing spreads until they can hardly lift their weapon. It can only gather itself for this str" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature miss: action — "The initiate hoods its open hand and drives a needlepoint strike into the exact point its earlier hits have been softening, turning its whole flurry into one culminating blow that leaves the target's limbs slack and useless; if that blow lands on someone already reeling from its pressure-point work, the numbing spreads until they can hardly lift their weapon. It can only gather itself for this str" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, disarm, focus)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its venomous marsh blood carries a creeping torpor that lingers in every wound it opens; anyone it has struck feels the numbness spread through their joints on their own turn, slowing their guard and leaving them open to the next darting pass." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## Hollow Chimney Nix — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Chimney Nix | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Hollow Chimney Nix

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

Assassinate. During the first round of each combat, the chimney nix has Advantage on attack rolls against any creature that hasn't taken a turn. If the chimney nix hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Rooftop Stalker. The chimney nix ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The chimney nix makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The chimney nix takes the Dash, Disengage, or Hide action.

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
[concept] signature elements: the rooftop ambush from hiding [behavior] | hand crossbow and tail-blade [object] | tail that snatches and tangles [body]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "When the chimney nix shoots or strikes a creature that has not yet noticed her this fight — or that has lost track of her since her last attack — she picks her moment and lands the blow on an unguarded spot. The creature is left reeling and unable to call out, giving the nix a clean head start to slip back into the chimney stacks. She can only pull this off on a creature that hasn't already seen h" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature miss: action — "When the chimney nix shoots or strikes a creature that has not yet noticed her this fight — or that has lost track of her since her last attack — she picks her moment and lands the blow on an unguarded spot. The creature is left reeling and unable to call out, giving the nix a clean head start to slip back into the chimney stacks. She can only pull this off on a creature that hasn't already seen h" [rider/on_hit/condition] — the model found no template that holds it (offered: focus, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, leap, feint-slip)
[reskin] value check: "Sundering Shove" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The chimney nix fights with crossbow and tail together, never showing the same face twice. Whenever she hits a creature she has already wounded this round with the other weapon, the second blow lands deeper, and she can twist her tail to yank a loose item — a shield, a pouch, a readied weapon — off the creature as she pulls away." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "The chimney nix fights with crossbow and tail together, never showing the same face twice. Whenever she hits a creature she has already wounded this round with the other weapon, the second blow lands deeper, and she can twist her tail to yank a loose item — a shield, a pouch, a readied weapon — off the creature as she pulls away." [trait/always/damage] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Tail" -> "Shortsword" — the Spy's own row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Quarry" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, the chimney nix has Advantage on attack rolls against any creature that hasn't taken a turn. If the chimney nix hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Quarry: The chimney nix knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Grendh Skarn-Blood — one marked soft

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grendh Skarn-Blood | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Grendh Skarn-Blood

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

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Grendh starts its turn Bloodied, roll 1d6. On a 6, Grendh goes berserk. On each of its turns while berserk, Grendh attacks the nearest creature it can see. If no creature is near enough to move to and attack, Grendh attacks an object. Once Grendh goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Grendh has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Grendh extra movement, and Grendh can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Grendh makes two attacks, using Greataxe or Handaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Slashing damage.

Handaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Reckless Retaliation. One creature within 5 feet that hit Grendh with an attack roll since the end of Grendh's last turn takes 11 (2d10) Bludgeoning damage.

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
[concept] signature elements: wound-triggered loss of control [behavior] | huge greataxe swung without regard for defense [object] | blood-spending frenzy that ignores its own injuries [behavior]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "When Grendh itself is wounded—whether by an enemy's strike or its own reckless fury—it can immediately lash out with a wild, unstoppable swing, heedless of who stands in the way. The blow lands on whatever creature is nearest, friend or foe, and its sheer force leaves the target reeling and unable to retaliate." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] value check: "Reckless Retaliation" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Reckless Retaliation" ("The idea is a reaction triggered by being wounded—whether by an enemy's blow or  [verb: retaliate:idea, lash:idea]")
[reskin] signature idea (trait): "Grendh's rage only deepens when it is hurt. Every wound it suffers stokes its frenzy, causing it to attack with even greater violence and ignore its own defense entirely." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "Grendh's rage only deepens when it is hurt. Every wound it suffers stokes its frenzy, causing it to attack with even greater violence and ignore its own defense entirely." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
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

Medium Humanoid, Neutral Good

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

Evasive Parry. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Answering Sting. One creature within 5 feet that hit Dame Oriel with an attack roll since the end of Dame Oriel's last turn takes 7 (2d6) Bludgeoning damage.

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
[concept] signature elements: shield-wall stance that blocks a choke point [behavior] | longsword and kite shield [object] | unbreakable hold-the-line discipline [behavior]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Dame Oriel slams her kite shield into the ground and holds a shield-wall stance across one small stretch of ground in front of her, turning it into a doorway only she can defend. While the stance holds, anyone trying to move through that lane has to get past her longsword first — she cuts at them the moment they crowd in, and the stance lasts only as long as she keeps standing still and unhurt. It" [action/always/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature miss: action — "Dame Oriel slams her kite shield into the ground and holds a shield-wall stance across one small stretch of ground in front of her, turning it into a doorway only she can defend. While the stance holds, anyone trying to move through that lane has to get past her longsword first — she cuts at them the moment they crowd in, and the stance lasts only as long as she keeps standing still and unhurt. It" [action/always/condition] — the model found no template that holds it (offered: rally, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The first blow that lands on Dame Oriel from any one attacker in a round smacks her shield and does less than it should; her discipline means she always has the shield where it needs to be. Blows after that first one land true, so a single relentless foe can eventually wear through." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The first blow that lands on Dame Oriel from any one attacker in a round smacks her shield and does less than it should; her discipline means she always has the shield where it needs to be. Blows after that first one land true, so a single relentless foe can eventually wear through." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, relentless-pursuit)
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
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — caster-warpriest: ✓ ("a templar priest of the dawn who blesses") | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers with radiant auras [aura] | holy-fire mace blows from the front rank [object] | fighting to the death while any soldier remains blessed [behavior]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Vareth raises her sun-disc and chants the dawn blessing over every soldier sworn to her banner within her sight. Wrapped in radiant mail, each blessed soldier fights on through wounds that would drop them — while a soldier under her blessing still stands, she does not flee or fall, no matter how the line breaks around her." [action/once_per_fight/defense] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, rally, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] value check: "Dawn Blessing (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Dawn Blessing (2/Day)" ("Vareth blesses every soldier sworn to her banner within her sight, and they figh [verb: blessing:concept, bless:concept]")
[reskin] signature idea (trait): "Soldiers under Vareth's … carry a sliver of sunrise within them; when one is struck, that light flares outward and lashes the attacker with holy fire. Even in her silence the … answers for her soldiers, making every blow against the blessed cost something." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Soldiers under Vareth's … carry a sliver of sunrise within them; when one is struck, that light flares outward and lashes the attacker with holy fire. Even in her silence the … answers for her soldiers, making every blow against the blessed cost something." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon modes: climb off — the Priest has no such mode and the words name none
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common plus one other language, Celestial" — the Priest's plus the concept's Celestial
[reskin] print canon attack: "Sun-Mace" -> "Mace" — the Priest's own row
[reskin] print canon attack: "Dawn Dart" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Holy Stride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Mace" -> "Mace" [catalog: seal]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Constitution Saving Throw*: DC 14, one creature within 30 feet. *Failure:* 22 (4d8 + 4) Necrotic damage, and the target can't regain Hit Points until the end of Vareth's next turn. *Success:* Half damage only.
provenance: catalog template "seal"
```


---

## Brother Halric — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Halric | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 26 (2 × Mace); nova none; dmg 26

```
Brother Halric

Medium Humanoid, Neutral

AC 16
Initiative +0 (10)

HP 77 (14d8 + 14)

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
+2
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

Skills Perception +5, Stealth +2

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Halric makes two attacks, using Mace or Thrown Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Halric's next turn.

Thrown Mace. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Bludgeoning damage.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("templar priest") | caster-warpriest: key "priest" (class noun)
[concept] signature elements: mace strikes that carry holy weight without a spell [object] | anti-magic templar tactics and disciplined melee pressure [behavior] | iron-shod faith that endures where magic fails [body]
[reskin] print canon route: the Priest's body outranks the warpriest seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Halric raises his sanctified mace overhead and brings it down in a slow, deliberate arc that unravels magic as it falls. If the blow connects with a creature that is currently concentrating on a spell or under the effect of an ongoing magical effect, the mace tears that magic away entirely, ending the ongoing effect and leaving the caster's mind ringing and exposed." [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "Halric raises his sanctified mace overhead and brings it down in a slow, deliberate arc that unravels magic as it falls. If the blow connects with a creature that is currently concentrating on a spell or under the effect of an ongoing magical effect, the mace tears that magic away entirely, ending the ongoing effect and leaving the caster's mind ringing and exposed." [rider/on_hit/condition] — the model found no template that holds it (offered: charge-push, hook-rider, pounce, isolation, bolt-mark, charge, sensory-strike)
[reskin] value check: "Sundering Shove" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Halric's mace is a blunt instrument of pure faith, and its strikes carry a lingering weight that holy words cannot match. Whenever he hits a creature with his mace, that creature's next attempt to cast a spell or use a magical ability before the end of its next turn falters—the words catch in its throat and the effect fizzles." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Halric's mace is a blunt instrument of pure faith, and its strikes carry a lingering weight that holy words cannot match. Whenever he hits a creature with his mace, that creature's next attempt to cast a spell or use a magical ability before the end of its next turn falters—the words catch in its throat and the effect fizzles." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon yields: "Thrown Mace" keeps its mace — the GM typed it; the Priest's Radiant Flame prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Traits/"Relentless Stride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
```


---

## Unmet Strike — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmet Strike | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 0 → 1; sustained 0 (3 × ?); nova none; dmg 0

```
Unmet Strike

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

Languages Common and any three languages, Elvish, Draconic

CR 6 (XP 2,300; PB +3)

Traits

Evasion. If the unmet strike is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the unmet strike instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The unmet strike makes three attacks. It can replace one attack with a use of Sealing Touch.

Spellcasting. The unmet strike casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Sealing Touch. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: 14 (4d6) Necrotic damage, and the target can't regain Hit Points until the end of the unmet strike's next turn. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). The unmet strike casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The unmet strike is hit by an attack roll. Response: The unmet strike casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=none — caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: stepping away from every blow [behavior] | shadow-stuff body that never stands where struck [body] | arcane bolts of misdirection [object]
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The wizard marks the space it vacates, leaving a lurking afterimage of its own shadow there. When a foe next attacks from or moves through that spot, the shadow surges into them and pins their feet, so pursuing the wizard means fighting the place it used to be. Only one afterimage can linger at a time." [bonus_action/always/condition] — menu: lay-on-hands, aggro-curse, self-invisibility, rally (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The wizard marks the space it vacates, leaving a lurking afterimage of its own shadow there. When a foe next attacks from or moves through that spot, the shadow surges into them and pins their feet, so pursuing the wizard means fighting the place it used to be. Only one afterimage can linger at a time." [bonus_action/always/condition] — the model found no template that holds it (offered: lay-on-hands, aggro-curse, self-invisibility, rally, delayed-brand, reveal, bolt-restrain, bolt-mark)
[reskin] value check: "Sealing Touch" EV 10.9 vs floor 7.3 (one attack of 3) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is packed shadow-stuff, not flesh, so wounds do not bleed and pain does not register. Whenever something strikes it, the blow simply passes through with no visible injury, and the wizard shows no reaction that could betray a true position." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Its body is packed shadow-stuff, not flesh, so wounds do not bleed and pain does not register. Whenever something strikes it, the blow simply passes through with no visible injury, and the wizard shows no reaction that could betray a true position." [trait/on_being_hit/defense] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, false-appearance, bloodied-fury)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon languages: "Common, Elvish, Draconic" -> "Common and any three languages, Elvish, Draconic" — the Mage's plus the concept's Elvish, Draconic
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
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

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with Hurlspear. It can replace one attack with a use of Disciplinarian's Rebuke.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Hurlspear: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Disciplinarian's Rebuke: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: the warband fury aura [behavior] | a skald's iron-strung war-harp [object] | battle-song that hardens allies [aura]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald sweeps his spear in a wide arc, and the warband's fury answers—chosen allies who can hear his voice suddenly slip past a guarding enemy's defense as if the parry itself shoved them through. The opening lasts only a heartbeat: the next ally to strike before Thurivald's next turn ignores the target's shield and footing and hits true." [rider/on_hit/defense] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature miss: action — "Thurivald sweeps his spear in a wide arc, and the warband's fury answers—chosen allies who can hear his voice suddenly slip past a guarding enemy's defense as if the parry itself shoved them through. The opening lasts only a heartbeat: the next ally to strike before Thurivald's next turn ignores the target's shield and footing and hits true." [rider/on_hit/defense] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, riposte, throw-retrieve, push-prone, aggro-curse, own-turn-punisher, rally)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald has no retreat in him; a skald who flees loses the verse. When he chooses to stand and fight, the song turns inward and his own wounds stop bleeding for a moment—but only so long as he keeps singing and never turns his back." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature miss: trait — "Thurivald has no retreat in him; a skald who flees loses the verse. When he chooses to stand and fight, the song turns inward and his own wounds stop bleeding for a moment—but only so long as he keeps singing and never turns his back." [trait/always/defense] — the model picked "undead-fortitude" (no verb) over a concept-verb template (bloodied-fury)
```


---

## Silent Kage — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Silent Kage | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: inline-form |

- reader · fail · inline-form: the call called "Silent Kage" a person and the sheet speaks it as "the silent kage" — a person speaks by its given name
- **dropped clause:** "moves through the shadows"
- read: def 3 / off 5 → 4; sustained 34 (2 × Assassin's Strike); nova none; dmg 34

```
Silent Kage

Medium Humanoid, Neutral

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

Evasion. If the silent kage is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the silent kage instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the silent kage has Advantage on attack rolls against any creature that hasn't taken a turn. If the silent kage hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadow Stride. The silent kage ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The silent kage makes two attacks, using Assassin's Strike or Shuriken in any combination.

Assassin's Strike. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The silent kage takes the Dash, Disengage, or Hide action.

Shroud of Silence (1/Day). The silent kage casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: strikes from hiding with advantage [behavior] | moves through shadows [behavior] | poisoned blade [object]
[reskin] signature idea (action): "It mingles deadly poison into a thrown blade, so that a struck victim is wracked with crippling agony for a short while and has trouble acting. If that victim is already suffering from the poison, the next thrown blade instead forces them to relive their worst memory, leaving them briefly unable to move or cry out." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature miss: action — "It mingles deadly poison into a thrown blade, so that a struck victim is wracked with crippling agony for a short while and has trouble acting. If that victim is already suffering from the poison, the next thrown blade instead forces them to relive their worst memory, leaving them briefly unable to move or cry out." [rider/on_hit/condition] — the model picked "stunning-strike" (no verb) over a concept-verb template (self-invisibility)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When bloodied, it vanishes into a cloud of smoke and shadow, using the distraction to slide unseen into a new position and hide once more. This lets it toy with enemies, always striking from an unexpected angle." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "When bloodied, it vanishes into a cloud of smoke and shadow, using the distraction to slide unseen into a new position and hide once more. This lets it toy with enemies, always striking from an unexpected angle." [trait/always/movement] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Kilkil the Locksmith's Finger — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kilkil the Locksmith's Finger | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 5 → 3; sustained 30 (2 × Sting); nova Locksmith's Burst 22; dmg 35

```
Kilkil the Locksmith's Finger

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

Magic Resistance. Kilkil has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Kilkil makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Locksmith's Burst (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 22 (5d8) Fire damage. Success: Half damage.

Shape-Shift. Kilkil shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. Kilkil casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. Kilkil takes the Disengage or Hide action.

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
[concept] signature elements: lockpicking for a devil [behavior] | shadow-wreathed body [body] | iron lockpick [object]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Kilkil wrenches its pick free and hurls a ring of its infernal keys spinning around itself, each key trailing a filament of shadow-flame. Enemies close by are seared and left stumbling while the ring dissolves, giving Kilkil a moment to slip into hiding or scurry for an escape crack. It can only be done once before the keys must be gathered again." [action/always/damage] — menu: trample, gaze-single, snare, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: leap, lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 34.1 vs floor 23.7 (the whole Multiattack (2 attacks)) — dice 14 → 22 (nova budget)
[reskin] library seed drawn: thrown-burst -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kilkil's body drinks in the shadows around it, leaving no trace as it moves. While it stays in dim light or darkness, it can slip through openings no wider than a keyhole without slowing, and its passing makes no sound." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] signature miss: trait — "Kilkil's body drinks in the shadows around it, leaving no trace as it moves. While it stays in dim light or darkness, it can slip through openings no wider than a keyhole without slowing, and its passing makes no sound." [trait/always/movement] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption)
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Lockpick" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Skulker" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Vault Marauder — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vault Marauder | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Bone-Cudgel); nova none; dmg 44

```
Vault Marauder

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

Bloodied Frenzy. While Bloodied, the marauder has Advantage on attack rolls and saving throws.

Actions

Multiattack. The marauder makes two Bone-Cudgel attacks.

Bone-Cudgel. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage.

Bonus Actions

Charge. The marauder moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the marauder moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bone-Cudgel attack.

Bone Riposte. One creature within 5 feet that hit the marauder with an attack roll since the end of the marauder's last turn takes 7 (2d6) Bludgeoning damage.

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
[concept] signature elements: herding prey through a maze [behavior] | bone-cudgel and bone-plated hide [body] | drives victims into dead ends [behavior]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] signature idea (action): "The marauder slams its bone-cudgel into the ground, and a tremor races forward in a wide line, splitting the floor into a jagged rift. Creatures caught in the rift are thrown toward the marauder or toward each other, herded together and knocked off balance, while broken stone blocks the way behind them. This can be done only once every few minutes, as the labyrinth itself seems to answer the blow." [action/always/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] signature miss: action — "The marauder slams its bone-cudgel into the ground, and a tremor races forward in a wide line, splitting the floor into a jagged rift. Creatures caught in the rift are thrown toward the marauder or toward each other, herded together and knocked off balance, while broken stone blocks the way behind them. This can be done only once every few minutes, as the labyrinth itself seems to answer the blow." [action/always/movement] — the model found no template that holds it (offered: herd, trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, own-turn-punisher)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The marauder's bone-plated hide turns aside the first telling blow of any fight, and the attacker's weapon rings against it with a dull crack. The impact leaves the attacker exposed, their guard broken by the unnatural hardness of the creature's body." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "The marauder's bone-plated hide turns aside the first telling blow of any fight, and the attacker's weapon rings against it with a dull crack. The impact leaves the attacker exposed, their guard broken by the unnatural hardness of the creature's body." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, aberrant-ground)
```


---

## Iron Vigil — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Vigil | 7 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · lint:duplicate-entry: Actions/Greatsword: identical text to "Oathbound Blade Strike" — two names, one ability; rewrite this entry into something distinct
- read: def 6 / off 8 → 7; sustained 52 (2 × Oathbound Blade Strike); nova none; dmg 52

```
Iron Vigil

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

Aura of Authority. While in a 10-foot Emanation originating from the vigil, the vigil and its allies have Advantage on attack rolls and saving throws, provided the vigil doesn't have the Incapacitated condition.

Actions

Multiattack. The vigil makes two attacks, using Oathbound Blade Strike or Greatsword in any combination.

Oathbound Blade Strike. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit the vigil with an attack roll since the end of the vigil's last turn takes 10 (3d6) Bludgeoning damage.

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
[concept] signature elements: shield wall that guards the weak [behavior] | iron-plated armor and heavy shield [object] | protective aura that bolsters allies [aura]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The vigil slams its heavy shield into the ground, raising an invisible wall of orders that binds nearby foes. Enemies close enough feel their steps drag and their strikes falter, as the weight of the vigil's oath presses down on them. The vigil and its allies can still move freely; the wall is an idea held in the air, not a physical obstacle." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature miss: action — "The vigil slams its heavy shield into the ground, raising an invisible wall of orders that binds nearby foes. Enemies close enough feel their steps drag and their strikes falter, as the weight of the vigil's oath presses down on them. The vigil and its allies can still move freely; the wall is an idea held in the air, not a physical obstacle." [action/always/condition] — the model found no template that holds it (offered: rally, throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, hook-rider, patient-defense, aggro-curse, self-invisibility)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The vigil's shield is part of its oath, and those who try to hurt it feel that oath turn back on them. The first time in a round that an enemy hits the vigil, a burst of iron will flares from the shield, staggering the attacker and giving the vigil's allies a chance to act." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The vigil's shield is part of its oath, and those who try to hurt it feel that oath turn back on them. The first time in a round that an enemy hits the vigil, a burst of iron will flares from the shield, staggering the attacker and giving the vigil's allies a chance to act." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge)
```


---

## Bone-Ledger Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bone-Ledger Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Poniard); nova none; dmg 24

```
Bone-Ledger Whisker

Medium Humanoid, Lawful Neutral

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

Crowdstep. The whisker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The whisker makes two attacks, using Poniard or Sling in any combination.

Poniard. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. The whisker takes the Dash, Disengage, or Hide action.

Ledger Slip. The whisker takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a tabaxi cutpurse who slips through the ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: crowd-slip cutpurse strike [behavior] | poisoned blade and snare-cord [object] | catlike climb and vanish [behavior]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The whisker whips out a corded snare-line weighted with bone hooks and lashes it across the nearest target's legs — reaching over a vendor's counter, between two porters, under a cart, wherever the crowd gives it a lane. On a catch the line bites and yanks the victim down, leaving them sprawled and easy to rob while the whisker retracts the cord with one paw and melts back into the press." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] value check: "Bonehook Snare (Recharge 5-6)" EV 6.6 vs floor 20.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bonehook Snare (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Feinting Step" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: feint-slip -> Bonus Actions/"Feinting Step" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its poniard carries a catacomb-bazaar brew that keeps working on whoever it has cut, thinning their breath and slowing their blood round after round, so a victim who shrugged the first sting still sags an alley later. The whisker knows exactly how long the poison bites and paces its fight around that clock." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Its poniard carries a catacomb-bazaar brew that keeps working on whoever it has cut, thinning their breath and slowing their blood round after round, so a victim who shrugged the first sting still sags an alley later. The whisker knows exactly how long the poison bites and paces its fight around that clock." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
```
