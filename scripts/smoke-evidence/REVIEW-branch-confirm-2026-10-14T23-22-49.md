# Review batch — branch-confirm-2026-10-14T23-22-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathmender Seraphine | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/5 |
| Vaelrix Stormvow | 8 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/2 | 5/6 |
| Vespera Vaunt | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hollow Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/4 |
| Rimewake Wyrm | 9 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Meshrin | 6 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Kithral the Palm-Sage | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Quillwretch the Lockless | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Greyfen Howler | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Volgrun Ironmaw | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |
| Roan Hearthorn | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 3/4 |
| Llibran the Piperspawn | 4 | 2024 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Iron Diocese | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Vareth Solmane | 6 | 2024 | caster-2-warpriest | FAIL: attack-stat | SOFT: band | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/5 |
| Kanagi the Shroud-Bound | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Karrow Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |

**Dropped 5 of 22 user clauses** (coverage 77%); concept share 59% (41/70 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 1
- caster-2-warpriest / derivation: 1



---

## Greyfen Howler — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Greyfen Howler | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Greyfen Howler

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

Faultless Tracker. The howler knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Pack Tactics. The howler has Advantage on an attack roll against a creature if at least one of the howler's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The howler makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Bonus Actions

Bone-Chilling Howl (2/Day). The howler has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: pack coordination [behavior] | darting hit-and-run bite [behavior] | thick dire hide [body]
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] signature idea (action): "The howler lets out a bone-chilling howl that marks one creature it can see, making that prey the pack's focus. Until the howler's next turn, every wolf in its pack can feel exactly where that marked creature is, and their attacks against it are harder to avoid. The howl also rattles the marked creature, making it easier for the pack to flank and bring down." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] value check: "Bone-Chilling Howl (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Bone-Chilling Howl (2/Day)" ("The howl marks one creature it can see, making that prey the pack's focus; the p [verb: hunt:concept, focus:idea]")
[reskin] signature idea (trait): "The howler's thick, matted hide turns aside the first telling blow from any single attacker, letting it slip away before the pack's momentum breaks. Once per fight, when a creature hits the howler with an attack, the howler can immediately move a short distance without provoking any parting strikes, vanishing into the timber." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature bound by force: trait — "faultless-tracker" matches hunts+hunted in the user's words; the model's none is overruled
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: hunts:concept, hunted:concept]")
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Stalker" is the seat's, not the Dire Wolf's
```


---

## Rimewake Wyrm — highest CR

**Concept:** a rime-scaled wyrm that swallows sailors whole

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rimewake Wyrm | 9 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 11 → 8.5; sustained 54 (3 × Fangs); nova Rime Breath 49; dmg 69

```
Rimewake Wyrm

Huge Dragon, Neutral

AC 18
Initiative +1 (11)

HP 136 (13d12 + 52)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
14
+2
+2
MOD
SAVE
DEX
12
+1
+5
WIS
12
+1
+5
MOD
SAVE
CON
18
+4
+4
CHA
16
+3
+3

Skills Perception +5, Stealth +5

Immunities Cold

Senses darkvision 120 ft., blindsight 30 ft.; Passive Perception 15

Languages Common, Draconic

CR 9 (XP 5,000; PB +4)

Traits

Rimebound Hide. A creature that touches the wyrm or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Cold damage.

Actions

Multiattack. The wyrm makes three Fangs attacks. It can replace one attack with a use of Rimewake Gulp.

Fangs. Melee Attack Roll: +8, reach 10 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Cold damage.

Rime Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 49 (14d6) Cold damage. Success: Half damage.

Rimewake Gulp. Dexterity Saving Throw: DC 15, one Medium or smaller creature within 5 feet that the wyrm hit with a melee attack this turn. Failure: 18 (4d8) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the wyrm, and takes 9 (2d8) Cold damage at the start of each of the wyrm's turns. If the wyrm takes 20 damage or more on a single turn from a creature inside it, it must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the wyrm and has the Prone condition. If the wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 10 feet of movement, exiting with the Prone condition.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("rime-scaled wyrm") | dragon: key "wyrm" (class body)
[concept] signature elements: swallowing sailors whole [behavior] | rime-scaled hide [body] | frozen breath [aura]
[reskin] nova capped: "Breath Weapon" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] signature idea (action): "The wyrm surges forward in a burst of freezing spray, crashing into its prey and driving it beneath the surface. The target is dragged down with the wyrm's momentum, ending up floundering in the water and unable to easily escape the wyrm's reach. The wyrm can only make this rush when it is in the water, and it leaves itself briefly open to retaliation." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, snatch, charge (+ shelf: swallow, gaze-single, snare, reel, zone, execute, seal, shield-bash, lure, hook-drag, rampage, lay-on-hands, second-wind)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into swallow
[reskin] value check: "Rimewake Gulp" EV 19.8 vs floor 9.4 (one attack of 3) — a nova already stands — kept ungated, dice to 18 at the ceiling
[reskin] signature template: swallow -> Actions/"Rimewake Gulp" ("the idea is a wyrm that swallows sailors whole, which is exactly the swallow tem [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The wyrm's body is covered in rime that clings and spreads to anything it touches. Creatures that strike it in melee find their limbs numbed and slowed, while those the wyrm strikes are marked by frost that hampers their movement and makes them easier to drag under." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (rime)
[reskin] signature template (trait): heated-body -> Traits/"Rimebound Hide" ("the rime clinging to anything that touches it, so creatures striking it in melee [verb: rime:concept, touch:idea, frost:idea]")
[reskin] chassis nova: "Rime Breath (Recharge 5-6)" — the dragon-8's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Karrow Vane — a 2014 sheet

**Concept:** a veteran sellsword with a greatsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Karrow Vane | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "bashes with a buckler"
- read: def 6 / off 6 → 6; sustained 42 (2 × Greatsword); nova none; dmg 42

```
Karrow Vane
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

13 (+1)

	

14 (+2)

	

10 (+0)

	

11 (+0)

	

10 (+0)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +5

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common plus one other language

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Great Weapon Master. When Karrow hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions
Multiattack: Karrow makes two Greatsword attacks. It can replace one attack with a use of Shield Bash.
Greatsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target is subjected to the following effect. The target must make a DC 14 Strength saving throw. On a failed save, the target has the Prone condition.
Shield Bash: One creature within 5 feet that Karrow can see must make a DC 14 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save. On a failed save, if the target is Medium or smaller, it has the Prone condition.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("veteran sellsword") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler bash that staggers a foe off-balance [object] | greatsword brought down on the disadvantaged [object] | holds a line and punishes anyone who moves past [behavior]
[reskin] print canon array: STR 16, DEX 13, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, STR fitted to +6
[reskin] print canon: "a veteran sellsword with a greatsword who bashes with a buckler" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: riposte — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: fighter — "a veteran sellsword with a greatsword": Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "Karrow drives his buckler into the ground or wall, tearing open a brutal line of forced space. Anyone who tries to cross that line before Karrow's next turn gets slammed back, losing the ground they wanted to take." [action/always/movement] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Karrow drives his buckler into the ground or wall, tearing open a brutal line of forced space. Anyone who tries to cross that line before Karrow's next turn gets slammed back, losing the ground they wanted to take." [action/always/movement] — the model found no template that holds it (offered: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, own-turn-punisher)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Consummate professional that he is, Karrow's economy of motion turns a bloodied foe's overextension into free openings; when a creature already bleeding from his blade swings at him, Karrow gets an angle he didn't have before." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Consummate professional that he is, Karrow's economy of motion turns a bloodied foe's overextension into free openings; when a creature already bleeding from his blade swings at him, Karrow gets an angle he didn't have before." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, uncanny-sense)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon: chassis row leaves — Bonus Actions/"Second Wind (2/Day)" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Reactions/"Riposte" is the seat's, not the Warrior Veteran's
```


---

## Oathmender Seraphine — a 2024 sheet

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathmender Seraphine | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "smites the unclean"
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Oathmender Seraphine

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

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Seraphine, Seraphine and its allies have Advantage on attack rolls and saving throws, provided Seraphine doesn't have the Incapacitated condition.

Actions

Multiattack. Seraphine makes three attacks, using Longsword or Lance in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Lance. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Seraphine touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Mender's Rally (2/Day). Each ally within 30 feet of Seraphine gains 9 (2d8) Temporary Hit Points.

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
[route] defender-leader type=Humanoid mechanics=aura — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: smites the unclean with radiant force [behavior] | mends her soldiers [behavior] | aura of authority [aura]
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] class kit: coating — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands)
[reskin] signature idea (action): "Seraphine levels her blade at one foe she has judged corrupt and declares an oath of cleansing against it. Until her judgment is fulfilled or she is struck down, every wound she deals to that creature flares with searing light, and that foe's blows against her are turned aside as her conviction hardens. The oath ends only when the marked creature falls or Seraphine herself is broken." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Mender's Rally (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Mender's Rally (2/Day)" ("an oathsworn crusader who mends her soldiers, granting them succor in the thick  [verb: mend:concept]")
[reskin] signature idea (trait): "Whenever Seraphine strikes a creature she has judged corrupt and unclean, radiant fire clings to the wound, refusing to let the injury close. Any foe she marks for cleansing finds its own wounds knitting far more slowly for a time, its unnatural vitality seared back by the light of her oath." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Whenever Seraphine strikes a creature she has judged corrupt and unclean, radiant fire clings to the wound, refusing to let the injury close. Any foe she marks for cleansing finds its own wounds knitting far more slowly for a time, its unnatural vitality seared back by the light of her oath." [trait/always/condition] — the model found no template that holds it (offered: warded-mending)
```


---

## Hollow Warden — a print donor

**Concept:** a bulwark-sworn sentinel with a broken greatsword and a battered shield

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hollow Warden | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "a battered shield"
- read: def 6 / off 6 → 6; sustained 44 (2 × Broken Greatsword); nova none; dmg 44

```
Hollow Warden

Medium Elemental, Lawful Neutral

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
12
+1
+1
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
10
+0
+0

Skills Athletics +7, Perception +4

Immunities Fire, Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Primordial (Ignan)

CR 7 (XP 2,900; PB +3)

Traits

Great Weapon Master. When the warden hits a creature with its Broken Greatsword, the attack deals an extra 3 damage.

of the azer's choice. At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot Emanation originating from the azer takes 5 (1d10) Fire damage unless the azer has the Incapacitated condition.

Actions

Multiattack. The warden makes two Broken Greatsword attacks.

Broken Greatsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Warden's Brand. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of the warden's next turn, the target has Disadvantage on attack rolls against creatures other than the warden.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("bulwark-sworn sentinel with a broken gre") | defender: key "sentinel" (class verb)
[concept] signature elements: broken greatsword used as a braced spear [object] | battered shield planted as a bulwark [object] | unyielding last stand that refuses to yield ground [behavior]
[reskin] print canon array: STR 18, DEX 12, CON 15, INT 12, WIS 13, CHA 10 — the Azer Sentinel's, STR fitted to +7
[reskin] print canon: "a bulwark-sworn sentinel with a broken greatsword and a battered shield" heads on the Azer Sentinel — print's rows ride along; the seat stays
[reskin] signature idea (action): "The warden slams its battered shield down and drives its broken greatsword forward like a braced spear, threatening a wide line in front of it. Until the warden moves or is knocked down, any enemy that tries to move through that line is stopped short and shoved back the way it came, and the warden's attacks against creatures in front of it bite deeper." [action/once_per_fight/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — push-prone, aggro-curse, rally (batter, sworn, shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into push-prone, aggro-curse, rally
[reskin] value check: "Bulwark Shove" EV 3.4 vs floor 13 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Bulwark Shove" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Binding Mark" EV 7.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden fights with the greatsword held like a spear, so its blows drive enemies back a step. When it hits a creature with the broken greatsword, that creature is shoved away from the warden." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The warden fights with the greatsword held like a spear, so its blows drive enemies back a step. When it hits a creature with the broken greatsword, that creature is shoved away from the warden." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] print canon type: Humanoid -> Elemental — the Azer Sentinel's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Common" -> "Primordial (Ignan)" — the Azer Sentinel's
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Fire, Poison; Poisoned — the Azer Sentinel's own header lines
[reskin] print canon trait: Fire Aura — "a bulwark-sworn sentinel with a broken greatsword and a battered shield" is the Azer Sentinel (print's own row)
```


---

## Roan Hearthorn — a homebrew with a nova

**Concept:** a herdmaster who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Roan Hearthorn | 5 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- reader · fail · name-mechanic: Actions/Thunder Stampede: the name promises movement the text lacks
- read: def 3 / off 5 → 4; sustained 38 (2 × Barbed Lance); nova Thunder Stampede 18; dmg 38

```
Roan Hearthorn

Medium Humanoid, Lawful Neutral

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Roan, Roan and its allies have Advantage on attack rolls and saving throws, provided Roan doesn't have the Incapacitated condition.

Actions

Multiattack. Roan makes two attacks, using Barbed Lance or Bone Horn in any combination.

Barbed Lance. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Thunder damage.

Bone Horn. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Thunder damage.

Thunder Stampede (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 15-foot Emanation originating from Roan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commands a stampede of thunder-elk [behavior] | bone horn that calls the herd [object] | aura of authority over the herd [aura]
[reskin] signature idea (action): "Roan slams his bone horn to the ground and the plain answers — a stampede of thunder-elk erupts in a straight line away from him, trampling every enemy caught in the path and shoving survivors aside or off their feet. The herd then stays planted there, a living wall shoulder-to-shoulder with Roan, and the charge does not come again until the herd has had time to wheel and re-form. Roan braces behi" [action/once_per_fight/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd, active-toll, rally (command, thunder)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into herd, active-toll, rally
[reskin] value check: "Thunder Stampede (Recharge 5-6)" EV 47.7 vs floor 30.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Thunder Stampede (Recharge 5-6)" ("commands a stampede of thunder-elk; the concept's own verb is thunder, and the a [verb: thunder:concept]")
[reskin] signature idea (trait): "Whenever Roan's herd is trampling through a foe — the elk crashing past, horns lowered — the … in their hooves deafens and rattles anyone they ride by, punishing foes for standing in the stampede's way. Roan's own …-charged blows carry that same rolling boom, so every charge he leads lands like the sky cracking open, dragging one enemy after another under the herd's momentum." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Whenever Roan's herd is trampling through a foe — the elk crashing past, horns lowered — the … in their hooves deafens and rattles anyone they ride by, punishing foes for standing in the stampede's way. Roan's own …-charged blows carry that same rolling boom, so every charge he leads lands like the sky cracking open, dragging one enemy after another under the herd's momentum." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
```


---

## Vaelrix Stormvow — one marked soft

**Concept:** a battle-cleric of the storm who prays over her greatsword and casts blessings

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vaelrix Stormvow | 8 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 8 reads 2–10.5, n=24)
- **dropped clause:** "casts blessings"
- read: def 4 / off 8 → 6; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Vaelrix Stormvow

Medium Humanoid, Neutral Good

AC 15
Initiative +0 (10)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
INT
11
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
18
+4
+7
MOD
SAVE
CON
16
+3
+3
CHA
13
+1
+1

Skills Perception +7, Religion +6

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 17

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Great Weapon Master. When Vaelrix hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. Vaelrix makes two attacks, using Greatsword or Lightning Bolt in any combination. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.

Greatsword. Melee Attack Roll: +8, reach 5 ft. 26 (6d6 + 5) Slashing damage.

Lightning Bolt. Ranged Attack Roll: +3, range 80/320 ft. 18 (4d8) Lightning damage.

Spellcasting. Vaelrix casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks): - At Will: Guiding Bolt, Light
- 1/Day Each: Thunderwave (level 5 version)

Bonus Actions

Divine Aid (3/Day). Vaelrix casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Blessing of Storms (2/Day). Each ally within 30 feet of Vaelrix gains 14 (4d6) Temporary Hit Points.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("a battle-cleric of the storm who prays o") | caster-warpriest: key "prays" (class verb)
[concept] signature elements: praying over her greatsword [behavior] | casting blessings in combat [behavior] | storm-charged greatsword [object]
[reskin] class kit: cleric — "a battle-cleric of the storm": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] signature idea (action): "Vaelrix drives her charged blade into the ground or a foe and the gathered thunder answers as a rolling peal that washes over everyone near her — allies feel their god's favor settle on them like a hand on the shoulder, while the shock rattles her enemies and leaves them easy to strike. It is the planted-sword prayer made real, best used right as the fight begins or right after a blow has already " [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Blessing of Storms (2/Day)" EV 7.7 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Blessing of Storms (2/Day)" ("The concept is a battle-cleric who prays over her greatsword and casts blessings [verb: blessing:concept, bless:concept, prayer:idea]")
[reskin] signature idea (trait): "Thunder keeps living in her greatsword once it is charged, so every blow she lands carries a crawling aftershock that leaps to another nearby enemy of her choosing, letting one faithful swing punish a whole knot of foes." [trait/always/damage] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Thunder keeps living in her greatsword once it is charged, so every blow she lands carries a crawling aftershock that leaps to another nearby enemy of her choosing, letting one faithful swing punish a whole knot of foes." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## Meshrin — bands soft

**Concept:** name: Meshrin | a chain-hooked thing that drags its prey into the dark

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 6 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 4.5 (print at 6 reads 3–8, n=42)
- read: def 3 / off 6 → 4.5; sustained 40 (2 × Chain Hook); nova none; dmg 40

```
Meshrin

Medium Monstrosity, Neutral Evil

AC 14
Initiative -1 (9)

HP 112 (15d8 + 45)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
18
+4
+7
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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Meshrin makes two Chain Hook attacks.

Chain Hook. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition. It is pulled up to 10 feet straight toward Meshrin.

Bonus Actions

Cage. Meshrin cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Meshrin, and takes 7 (2d6) Acid damage at the start of each of Meshrin's turns. Meshrin can have only one creature caged at a time. If Meshrin takes 15 damage or more in a single turn from the caged creature, Meshrin must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Meshrin. If Meshrin dies, a caged creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("drags its prey") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: hooked chain that reels prey into the dark [object] | dragging victims into lightless hollows [behavior] | slick brine-coated hide [body]
[reskin] signature idea (action): "The Meshrin lashes its hooked chain at a creature it can see within a fair distance, snagging it and yanking it bodily toward the Meshrin's den—or simply off its feet. The victim is hauled through the air and left lying at the Meshrin's feet if it cannot keep its footing, instantly within reach of the barbs." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce (+ shelf: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-rider (hook, hooks, drag, drags)
[reskin] signature rider: hook-rider -> Chain Hook (appended; The chain hook snags the target and yanks it bodily toward Meshrin; the template [verb: hook:concept, hooks:concept, drag:concept, drags:concept, barb:idea, barbed:idea, barbs:idea, yank:idea])
[reskin] signature idea (trait): "The Meshrin's chain and barbs are slick with corrosive brine. Any living creature that spends too long hooked, held, or caged by Meshrin begins to weaken as the acid eats at its will to struggle, making escape from its clutches steadily harder." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The Meshrin's chain and barbs are slick with corrosive brine. Any living creature that spends too long hooked, held, or caged by Meshrin begins to weaken as the acid eats at its will to struggle, making escape from its clutches steadily harder." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption)
```


---

## Llibran the Piperspawn — bands soft

**Concept:** a satyr piper who dances travellers into the hills

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Llibran the Piperspawn | 4 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 58 is 23% under the card's 75
- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Pipesong Bolt); nova none; dmg 26

```
Llibran the Piperspawn

Medium Fey, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 58 (9d8 + 18)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
18
+4
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
+3
MOD
SAVE
CON
14
+2
+2
CHA
11
+0
+0

Skills Arcana +6, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Sylvan, Common

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. Llibran has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Llibran makes two Pipesong Bolt attacks. It can replace one attack with a use of Pied Piper's Reel.

Pipesong Bolt. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Psychic damage.

Spellcasting. Llibran casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Misty Step
- 1/Day Each: Charm Person, Hypnotic Pattern, Suggestion

Pied Piper's Reel. Wisdom Saving Throw: DC 14, one creature within 60 feet that can see or hear Llibran's dance or music. Failure: The target has the Charmed condition until the start of Llibran's next turn, and while Charmed this way, it must move toward Llibran by the safest available route on its turn.

Reactions

Protective Magic (3/Day). Trigger: Llibran is hit by an attack roll. Response: Llibran casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Fey mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | lurker-trap: a Fey sets traps; it is not one | fell to caster's plain line | caster: no line key in the words — the model's read of its quote
[concept] signature elements: piping a reel that drags travellers into a dance they cannot stop [behavior] | a body spun from living dream-stuff, milkweed-soft and impossible to pin down by [body] | the reed pipes whose tune is the hook in every listener's feet [object]
[reskin] species kit: satyr — "a satyr piper": Magic Resistance (Archmage/Magic Resistance)
[reskin] signature idea (action): "Llibran skirls a reel that hooks into the feet of everyone who can hear it; those caught begin stepping and cannot make themselves stop while the tune runs, pulled along the path the piper plays, one plodding pace at a time, and the reel travels with them until the piper's concentration breaks. Only a dancer who is dragged out of earshot or knocked down ends the step." [action/always/movement] — menu: gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — lure (dances)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into lure
[reskin] value check: "Pied Piper's Reel" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Pied Piper's Reel" ("The central verb is 'dances'—dancing travelers into the hills is exactly the lur [verb: dances:concept]")
[reskin] signature idea (trait): "Llibran's body is woven from living dream-stuff, soft and yielding, so a step that would pass through him finds only a shiver of music and misses entirely." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Llibran's body is woven from living dream-stuff, soft and yielding, so a step that would pass through him finds only a shiver of music and misses entirely." [trait/on_being_hit/defense] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, false-appearance)
```


---

## Vareth Solmane — bands soft

**Concept:** name: Vareth Solmane | a templar priest of the dawn

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | caster-2-warpriest | FAIL: attack-stat | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- derivation · fail · attack-stat: Mace: +7 derives from WIS, but an attack row rolls STR/DEX
- bands · soft · band: reads CR 4 (print at 6 reads 3–8, n=42)
- read: def 2 / off 6 → 4; sustained 44 (2 × Mace); nova none; dmg 44

```
Vareth Solmane

Medium Humanoid, Lawful Neutral

AC 14
Initiative +0 (10)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
11
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
18
+4
+7
MOD
SAVE
CON
15
+2
+2
CHA
13
+1
+1

Skills Perception +7, Religion +6

Senses darkvision 60 ft.; Passive Perception 17

Languages Common

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Dawn Bolt in any combination. It can replace one attack with a use of (A) Siphon Blessing or (B) Spellcasting to cast Guiding Bolt.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Dawn Bolt. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Spellcasting. Vareth casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 15, +7 to hit with spell attacks):

- At Will: Guiding Bolt, Light
- 1/Day Each: Blindness/Deafness, Bestow Curse

Siphon Blessing. Constitution Saving Throw: DC 15, one creature within 30 feet. Failure: 21 (6d6) Necrotic damage, and Vareth regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("templar priest of the dawn") | caster-warpriest: key "priest" (class noun)
[concept] signature elements: holy smites channeled through a weapon [behavior] | armored war-priest of the dawn [body] | prayers that heal and consecrate the battlefield [aura]
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": Divine Aid (3/Day) (Priest/Divine Aid)
[reskin] signature idea (action): "When Vareth strikes a foe with his mace, he can let the dawn-fire he has spent the whole fight gathering pour down the shaft and burst from the head as a blinding flare: everyone caught in the flash is left reeling and unable to see, and the unholy creatures he hunts are seared by the light. It costs him the holy charge he has been building through his prayers, so he can only unleash it after a fe" [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Vitality Leech" EV 16.3 vs floor 10.9 (one attack of 2) — added Success: Half; dice 13 → 21
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vareth is never truly alone in the dark — when the fight turns against him and his body is breaking, the dawn he serves answers his oath: holy light kindles around his armor, steadying his arm and shielding him until the enemy's next chance to strike passes. It happens once a fight, the moment he is first bloodied, and marks him as the Light's chosen hand even as he bleeds." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "Vareth is never truly alone in the dark — when the fight turns against him and his body is breaking, the dawn he serves answers his oath: holy light kindles around his armor, steadying his arm and shielding him until the enemy's next chance to strike passes. It happens once a fight, the moment he is first bloodied, and marks him as the Light's chosen hand even as he bleeds." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker, bloodied-fury, uncanny-sense)
```


---

## Vespera Vaunt — in the run

**Concept:** name: Vespera Vaunt | a tiefling cutpurse who strikes from the dark with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vespera Vaunt | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Vespera Vaunt

Medium Humanoid, Neutral Evil

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 50 ft.

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

Resistances Cold, Fire

Immunities Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Shadowstep. Vespera ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vespera makes two Shortsword attacks.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and Vespera has Advantage on its next attack roll against the target before the end of its next turn.

Bonus Actions

Nimble Escape. Vespera takes the Disengage or Hide action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Vespera moves up to half its Speed, and it makes one Shortsword attack.

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
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("strikes from the dark with a shortsword") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: strike from the dark [behavior] | advantage-fed shortsword [object] | shadow-bleed teleport [aura]
[reskin] species kit: tiefling — "Vespera Vaunt — a tiefling cutpurse": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "Vespera Vaunt — a tiefling cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Vespera slips into a pool of shadow and vanishes, then erupts from the darkness behind a foe with a blade of pure necrotic dread. The target must be one she has isolated or hidden from, and the strike savages both body and resolve, leaving them shaken and easy prey. She can only do this while benefiting from the cover of darkness or stealth, and the plunge requires her full concentration." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "Vespera slips into a pool of shadow and vanishes, then erupts from the darkness behind a foe with a blade of pure necrotic dread. The target must be one she has isolated or hidden from, and the strike savages both body and resolve, leaving them shaken and easy prey. She can only do this while benefiting from the cover of darkness or stealth, and the plunge requires her full concentration." [rider/on_hit/damage] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, ground-burst, self-invisibility, leap, rampage, feint-slip)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever Vespera strikes a creature that has not yet noticed her in the current fight, the wound festers with hungry shadow, sapping vitality and slowing the victim's reactions. The darkness clings to the injury until the target or an ally tears it away with a moment of focused effort." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Whenever Vespera strikes a creature that has not yet noticed her in the current fight, the wound festers with hungry shadow, sapping vitality and slowing the victim's reactions. The darkness clings to the injury until the target or an ally tears it away with a moment of focused effort." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] species kit: Fiend -> Humanoid — the tiefling's type (the words name no other)
[reskin] species kit: resistance Fire — the tiefling's
```


---

## Kithral the Palm-Sage — in the run

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kithral the Palm-Sage | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Kithral the Palm-Sage

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

Hold Breath. Kithral can hold its breath for 15 minutes.

Flow Step. Kithral ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kithral makes two attacks, using Open Palm or Scale Spur in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Kithral's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Kithral's next turn.

Scale Spur. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. Kithral takes the Dash or Disengage action.

Sidewinder Withdrawal. Kithral takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("lizardfolk monk who strikes pressure poi") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: open-hand pressure-point strikes that disable [behavior] | mobile dart-in-dart-out skirmishing [behavior] | slick hide and swamp-taught agility [body]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "Kithral feints and drives an open palm into a nerve cluster that his earlier strikes have already sensitized, making the limb go slack and useless. The target survives but cannot bring its best weapon to bear for a while, and Kithral can keep punishing the same crippled side." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into riposte
[reskin] signature miss: action — "Kithral feints and drives an open palm into a nerve cluster that his earlier strikes have already sensitized, making the limb go slack and useless. The target survives but cannot bring its best weapon to bear for a while, and Kithral can keep punishing the same crippled side." [rider/on_hit/condition] — the model found no template that holds it (offered: riposte)
[reskin] value check: "Feinting Step" EV 8.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: feint-slip -> Bonus Actions/"Feinting Step" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kithral reads the body's openings the way other hunters read tracks. Whenever a foe leaves an opening, Kithral's next touch finds the pressure point that hurts most, turning a glancing hit into a joint that won't hold weight." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Kithral reads the body's openings the way other hunters read tracks. Whenever a foe leaves an opening, Kithral's next touch finds the pressure point that hurts most, turning a glancing hit into a joint that won't hold weight." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Quillwretch the Lockless — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Quillwretch the Lockless | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Quillwretch the Lockless

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

Magic Resistance. Quillwretch has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. Quillwretch makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. Quillwretch shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. Quillwretch casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Spiteful Ember. One creature within 5 feet that hit Quillwretch with an attack roll since the end of Quillwretch's last turn takes 6 (1d12) Fire damage.

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
[concept] signature elements: infernal lockpicking and vault-cracking [behavior] | body of living flame [body] | thief's tools and keys [object]
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Its picks aren't just for locks — driven into a foe, the tools bite deep and twist, leaving the victim's own defenses pried open. Until it wrenches free, every crack in that creature's guard, armor, or wards stays a little wider, inviting the next strike home. The imp only gets this once per foe; after that, it moves on to a fresh lock." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "Its picks aren't just for locks — driven into a foe, the tools bite deep and twist, leaving the victim's own defenses pried open. Until it wrenches free, every crack in that creature's guard, armor, or wards stays a little wider, inviting the next strike home. The imp only gets this once per foe; after that, it moves on to a fresh lock." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, disarm, lure, riposte)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Quillwretch's body is a knot of living flame shaped like a keyhole. Any creature that grabs, grapples, or swallows it finds the fire jumps the gap — the imp's essence seeps into the hold itself, turning the capture into a slow burn that punishes the captor for every moment it maintains the grip." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Quillwretch's body is a knot of living flame shaped like a keyhole. Any creature that grabs, grapples, or swallows it finds the fire jumps the gap — the imp's essence seeps into the hold itself, turning the capture into a slow burn that punishes the captor for every moment it maintains the grip." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body, fire-aura, warded-mending)
[reskin] print canon modes: climb off — the Imp has no such mode and the words name none
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Infernal" — the Imp's
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Lockpick" -> "Sting" — the Imp's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Nimble Escape" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon: chassis row leaves — Traits/"Shadow Dart" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---

## Volgrun Ironmaw — in the run

**Concept:** an orc warlord who howls and retreats behind iron armor

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Volgrun Ironmaw | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "howls and retreats behind iron armor"
- read: def 6 / off 8 → 7; sustained 54 (3 × Ironclad Retort); nova none; dmg 54

```
Volgrun Ironmaw

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

Senses darkvision 120 ft.; Passive Perception 11

Languages Orc, Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Volgrun, Volgrun and its allies have Advantage on attack rolls and saving throws, provided Volgrun doesn't have the Incapacitated condition.

Actions

Multiattack. Volgrun makes three attacks, using Ironclad Retort or Iron Javelin in any combination.

Ironclad Retort. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.

Iron Javelin. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 30/120 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Relentless Rush. Volgrun takes the Dash action.

Iron Reprisal. One creature within 5 feet that hit Volgrun with an attack roll since the end of Volgrun's last turn takes 7 (2d6) Bludgeoning damage.

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
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("an orc warlord who howls and retreats be") | defender-leader: key "warlord" (class noun)
[concept] signature elements: parrying retreat behind iron armor [behavior] | howl that heartens allies and unnerves foes [behavior] | iron armor and shield [body]
[reskin] species kit: orc — "an orc warlord": Relentless Rush (Goblin Boss/Nimble Escape); darkvision 120 ft.
[reskin] signature idea (action): "When it howls and falls back in good order, every ally within the sound of its voice can use the moment to drop behind their shields and shift with it. Each of those allies who moves along with Volgrun finds its guard raised, so that the next blow against it meets iron and gets answered with a hard counter. The move is a withdrawal, not a rout: Volgrun chooses the ground, and the warband goes with" [bonus_action/always/defense] — menu: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — terror-pulse (howl)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into terror-pulse
[reskin] value check: "Horrid Display (2/Day)" EV 19.8 vs floor 45.6 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whoever strikes Volgrun and draws blood gets pulled into the angle of its shield; his next answer comes quicker and heavier than they planned for. The harder they press the wounded warlord, the more the iron bites back." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — resonant-body (iron)
[reskin] signature miss: trait — "Whoever strikes Volgrun and draws blood gets pulled into the angle of its shield; his next answer comes quicker and heavier than they planned for. The harder they press the wounded warlord, the more the iron bites back." [trait/on_being_hit/damage] — the model found no template that holds it (offered: resonant-body)
[reskin] species kit: darkvision 60 -> 120 ft. — the orc's
```


---

## Iron Diocese — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Diocese | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Iron Diocese

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The diocese makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the diocese's next turn.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: punishing blows against those who try to slip past [behavior] | shield and iron mace [object] | unyielding last stand [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "When a foe the diocese can see tries to move away from it or slip past it, the diocese answers instantly with a mace blow aimed at the legs that stops the escape cold. Anyone struck this way is left hobbled and reeling, unable to move again for a moment. The diocese can only manage this once between its own turns." [reaction/on_being_hit/movement] — menu: riposte (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "When a foe the diocese can see tries to move away from it or slip past it, the diocese answers instantly with a mace blow aimed at the legs that stops the escape cold. Anyone struck this way is left hobbled and reeling, unable to move again for a moment. The diocese can only manage this once between its own turns." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: riposte, own-turn-punisher, obstacle-pull, slow-bolt)
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The diocese's shield and mace are its whole faith: while it holds its ground without moving from where it first planted itself, its shield turns aside the worst of every blow and its mace lands heavier. The moment it is forced to step away, that certainty breaks and it fights as an ordinary soldier again." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (magic)
[reskin] signature miss: trait — "The diocese's shield and mace are its whole faith: while it holds its ground without moving from where it first planted itself, its shield turns aside the worst of every blow and its mace lands heavier. The moment it is forced to step away, that certainty breaks and it fights as an ordinary soldier again." [trait/always/defense] — the model found no template that holds it (offered: uncanny-sense)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Kanagi the Shroud-Bound — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kanagi the Shroud-Bound | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Iron Limb); nova none; dmg 34

```
Kanagi the Shroud-Bound

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

Evasion. If Kanagi is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kanagi instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, Kanagi has Advantage on attack rolls against any creature that hasn't taken a turn. If Kanagi hits a creature during that round, the target takes an extra 9 (2d8) Bludgeoning damage.

Shadowstep. Kanagi ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Kanagi makes two attacks, using Iron Limb or Weighted Chain in any combination.

Iron Limb. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Weighted Chain. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. Kanagi takes the Dash, Disengage, or Hide action.

Shroud Cloak (1/Day). Kanagi casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a ninja who moves through the shadows an") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: strikes from shadows unseen [behavior] | body woven from living shadow [body] | vanishes after each strike [behavior]
[reskin] signature idea (action): "When Kanagi strikes from hiding, its limbs unravel into ribbons of living shadow that pass through the target's guard, and a victim wounded this way carries a stain of that darkness that lingers until the end of its next turn. While stained, the victim cannot benefit from cover or concealment against Kanagi, and Kanagi's next strike against it lands with the cruel certainty of a shadow that alread" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into self-invisibility
[reskin] value check: "Shroud of Night (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shroud of Night (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kanagi's body is woven from the dark between worlds; while it stands in dim light or darkness, its outline blurs and it leaves no trace of its passage, and any wound it deals seems to bleed a little of the victim's own shadow away. Creatures that try to track it by sight find their eyes sliding off it, and those it has wounded feel a numbing chill that makes their own movements feel borrowed and w" [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "Kanagi's body is woven from the dark between worlds; while it stands in dim light or darkness, its outline blurs and it leaves no trace of its passage, and any wound it deals seems to bleed a little of the victim's own shadow away. Creatures that try to track it by sight find their eyes sliding off it, and those it has wounded feel a numbing chill that makes their own movements feel borrowed and w" [trait/always/movement] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[harness] re-rolled Traits/"Evasion" -> "Shadowsight" [catalog: uncanny-sense]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Evasion: If Kanagi is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kanagi instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.
Traits / AFTER   Shadowsight: Kanagi can pinpoint the location of moving creatures within 60 feet of itself.
provenance: catalog template "uncanny-sense"
```
