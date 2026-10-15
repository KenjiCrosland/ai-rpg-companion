# Review batch — classes-eight-2026-10-14T14-11-05

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rruzhk of the Nerve-Map | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Vespera Vaunt | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Aldric Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Korvath the Ragebound | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Iron Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Crown's Echo | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Lady Merivane | 8 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 4/7 |
| Smokeveil | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Timberline Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Skelkey Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/3 |
| Maze-Hunger Minotaur | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Oathbroken Vigil | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sable Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |

**Dropped 2 of 20 user clauses** (coverage 90%); concept share 64% (48/75 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Timberline Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timberline Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Timberline Pack

Medium Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

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

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Wolfpack Cunning. The pack ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The pack takes the Dash or Disengage action.

Pack Ambush (2/Day). The pack has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: pack-hunting flank strikes [behavior] | shaggy winter hide [body] | the pack's spreading encirclement [aura]
[reskin] signature idea (action): "When the pack strikes prey that another of its family is already threatening, it lunges at the distracted flank and tears deep, then slips back into the brush with the meat still in its jaws. The wound keeps bleeding into the snow, and any ally the target was guarding feels the loss of that attention." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "When the pack strikes prey that another of its family is already threatening, it lunges at the distracted flank and tears deep, then slips back into the brush with the meat still in its jaws. The wound keeps bleeding into the snow, and any ally the target was guarding feels the loss of that attention." [rider/on_hit/damage] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its shaggy winter hide sheds the bite of the cold and clings to the stink of the den, so nothing in the timber mistakes it for stray. The pack closes on prey without being noticed until it is already surrounded." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Its shaggy winter hide sheds the bite of the cold and clings to the stink of the den, so nothing in the timber mistakes it for stray. The pack closes on prey without being noticed until it is already surrounded." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker)
```


---

## Lady Merivane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lady Merivane | 8 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 8 reads 2–10.5, n=24)
- read: def 4 / off 8 → 6; sustained 54 (2 × Greatsword); nova none; dmg 54

```
Lady Merivane

Medium Humanoid, Lawful Good

AC 15
Initiative +0 (10)

HP 112 (15d8 + 45)

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
20
+5
+8
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

Skills Perception +8, Religion +6

Senses darkvision 60 ft.; Passive Perception 18

Languages Celestial, Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Lady Merivane, Lady Merivane and its allies have Advantage on attack rolls and saving throws, provided Lady Merivane doesn't have the Incapacitated condition.

Actions

Multiattack. Lady Merivane makes two attacks, using Greatsword, Bolt or Smite the Unclean in any combination. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.

Greatsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bolt. Ranged Attack Roll: +8, range 80/320 ft. 23 (4d8 + 5) Piercing damage.

Spellcasting. Lady Merivane casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Guiding Bolt, Light, Detect Magic, Dispel Magic

Smite the Unclean. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Radiant damage.

Bonus Actions

Lay on Hands (2/Day). Lady Merivane touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Mending Aegis (2/Day). Each ally within 30 feet of Lady Merivane gains 14 (4d6) Temporary Hit Points.

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "smites", class verb) | caster-warpriest: key "smites" (class verb)
[concept] signature elements: divine smite against the unclean [behavior] | healing prayers for soldiers [behavior] | consecrated iron armor and blade [object]
[reskin] class kit: coating — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: paladin — "an oathsworn crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands)
[reskin] signature idea (action): "When Lady Merivane strikes a deeply corrupted or unholy creature with her greatsword, she can immediately call down a flash of consecrated judgment upon it. This is an attack that adds a searing burst of radiant damage to the strike, and the force of the blow also staggers the foe, making it less able to defend itself until the end of its next turn." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Mending Aegis (2/Day)" EV 7.7 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Mending Aegis (2/Day)" ("The concept's own verb is mend, and the creature mends her soldiers — healing he [verb: mend:concept]")
[reskin] signature idea (trait): "Lady Merivane's armor and blade were consecrated in rites of binding oath, and they remain charged with that holy purpose. Whenever she moves to engage a corrupted or unholy enemy, her aura of authority flares brighter for a moment, and her own attacks against such foes carry an extra sting of divine wrath." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Lady Merivane's armor and blade were consecrated in rites of binding oath, and they remain charged with that holy purpose. Whenever she moves to engage a corrupted or unholy enemy, her aura of authority flares brighter for a moment, and her own attacks against such foes carry an extra sting of divine wrath." [trait/always/defense] — the model found no template that holds it (offered: warded-mending)
```


---

## Sergeant Aldric Vane — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sergeant Aldric Vane | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sergeant Aldric Vane
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

Pack Tactics. The warrior has Advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions
Multiattack: The sergeant makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has Disadvantage on its next attack roll before the start of the sergeant's next turn.
Shield Bash: One creature within 5 feet that the sergeant can see must make a DC 14 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save. On a failed save, if the target is Medium or smaller, it has the Prone condition.
Trip Attack: One creature within 30 feet that is Prone must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a longsword who bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler shield-bash that staggers [behavior] | longsword and buckler [object] | holds the line and fights to the death [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "When the sergeant strikes a foe with his longsword, he drives forward behind the blow, stepping into the space his enemy gives up. Anyone watching him work the line sees a soldier who treats every cut as a way to take ground rather than give it." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature miss: action — "When the sergeant strikes a foe with his longsword, he drives forward behind the blow, stepping into the space his enemy gives up. Anyone watching him work the line sees a soldier who treats every cut as a way to take ground rather than give it." [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, disarm, herd)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sergeant has held this line so long that his feet just know where the killing ground is. When an enemy tries to slip around him into the space he is guarding, his shield is already there to meet them." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Second Wind (2/Day)" is the seat's, not the Warrior Infantry's
[reskin] print canon: chassis row leaves — Reactions/"Riposte" is the seat's, not the Warrior Infantry's
```


---

## Rruzhk of the Nerve-Map — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rruzhk of the Nerve-Map | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Hand: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Hand); nova none; dmg 34

```
Rruzhk of the Nerve-Map

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

Hold Breath. Rruzhk can hold its breath for 15 minutes.

Reedstep. Rruzhk ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Rruzhk makes two attacks, using Open Hand or Stone in any combination.

Open Hand. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Rruzhk's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Rruzhk's next turn. Once on each of Rruzhk's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Rruzhk's next turn.

Stone. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Bludgeoning damage.

Bonus Actions

Fleet Agility. Rruzhk takes the Dash or Disengage action.

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
[concept] signature elements: pressure-point strikes that disable limbs and joints [behavior] | open-hand martial arts [behavior] | lizardfolk scale-hide [body]
[reskin] species kit yields: Marsh Stride — the sheet is full (6 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Hand); Patient Defense yielded to print's row cap 4
[reskin] signature idea (action): "Rruzhk studies the flow of life in its foes. By striking a precise nerve cluster with an open hand, it can invert the target's senses: for a short while the victim's own allies look like enemies and its own limbs feel foreign. The confusion lasts until the victim shakes it off, and Rruzhk cannot use this again until it has landed a few ordinary pressure-point strikes to re-map the body's lines." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — stunning-strike (pressure point, open hand, monk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into stunning-strike
[reskin] signature rider: stunning-strike -> Open Hand (appended; The idea is an open-hand monk strike that hits pressure points to stun, which is [verb: pressure point:concept, open hand:concept, monk:concept, nerve:idea])
[reskin] signature idea (trait): "Rruzhk's scales are tattooed with a living nerve-map that tingles when violence is near. When a creature it can see makes an attack against it, Rruzhk instinctively shifts along the map, gaining a brief edge in evasion that fades if the same foe presses the attack." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Rruzhk's scales are tattooed with a living nerve-map that tingles when violence is near. When a creature it can see makes an attack against it, Rruzhk instinctively shifts along the map, gaining a brief edge in evasion that fades if the same foe presses the attack." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, evasion)
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Vespera Vaunt — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vespera Vaunt | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Vespera Vaunt

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

Assassinate. During the first round of each combat, Vespera has Advantage on attack rolls against any creature that hasn't taken a turn. If Vespera hits a creature during that round, the target takes an extra 9 (2d8) Bludgeoning damage.

Rooftop Stalker. Vespera ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vespera makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vespera takes the Dash, Disengage, or Hide action.

Rooftop Stalk (2/Day). Vespera has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: rooftop stalking and ambush [behavior] | fiendish tiefling bloodline [body] | poisoned blades and bolts [object]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tiefling rogue": Assassinate (assassinate); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Vespera whispers a gutter curse at one enemy who can see or hear it within a short span, planting a seed of doubt in their mind. The next time Vespera damages that enemy, the wound refuses to close and they grow weaker until they spend precious time patching themselves up or call on magic to purge the hex." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Rooftop Stalk (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Rooftop Stalk (2/Day)" ("The idea centers on the verb 'stalk' — a tiefling rogue who stalks the rooftops  [verb: stalk:concept]")
[reskin] signature idea (trait): "Vespera's blades and bolts carry a slow rooftop toxin distilled from gutter herbs. Whenever a poisoned blade or bolt harms a creature, the poison keeps working, weakening their movements and dulling their reflexes until someone shakes off the creeping numbness." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "Vespera's blades and bolts carry a slow rooftop toxin distilled from gutter herbs. Whenever a poisoned blade or bolt harms a creature, the poison keeps working, weakening their movements and dulling their reflexes until someone shakes off the creeping numbness." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Horns" -> "Shortsword" — the Spy's own row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Bloodhound Pursuit" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vespera has Advantage on attack rolls against any creature that hasn't taken a turn. If Vespera hits a creature during that round, the target takes an extra 9 (2d8) Bludgeoning damage.
Traits / AFTER   Bloodhound Pursuit: Vespera knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Skelkey Imp — one marked soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skelkey Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Shortsword); nova none; dmg 30

```
Skelkey Imp

Tiny Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 67 (27d4)

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
18
+4
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

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus one other language, Infernal

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The skelkey imp makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Slashing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Cunning Action. The skelkey imp takes the Dash, Disengage, or Hide action.

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
[concept] signature elements: lockpicking for a devil master [behavior] | infernal lockpicking tools [object] | winged skirmisher [body]
[reskin] print canon route: the Spy's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 18, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Spy — print's rows ride along; the seat stays
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action); Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The Skelkey Imp jams its infernal lockpicks into a lock, mechanism, or similar device and wrenches it open or shut. Any creature that was relying on that device to stay safe, contained, or trapped is caught off guard and left badly exposed." [action/always/condition] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The Skelkey Imp jams its infernal lockpicks into a lock, mechanism, or similar device and wrenches it open or shut. Any creature that was relying on that device to stay safe, contained, or trapped is caught off guard and left badly exposed." [action/always/condition] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, riposte)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.5 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Because its picks are forged from infernal materials and carry a spark of hellfire, any lock or mechanism it touches is quietly compromised. Locks click open at a whisper of effort, and those who later inspect or depend on such locks find them unreliable." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Because its picks are forged from infernal materials and carry a spark of hellfire, any lock or mechanism it touches is quietly compromised. Locks click open at a whisper of effort, and those who later inspect or depend on such locks find them unreliable." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] print canon modes: fly off — the Spy has no such mode and the words name none
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Fiend -> Humanoid — the Spy's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Infernal, understands Common but can't speak" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon speed: 40 ft. -> 30 ft. — the Spy's walk; the concept's other modes stay
[reskin] print canon attack: "Pick" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Lockpick" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Winged Cunning" is the seat's, not the Spy's
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Nimble Escape" yields to the Spy's Cunning Action
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
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

Shielding Stance (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

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
[concept] signature elements: shield wall that punishes those who move past [behavior] | longsword and shield [object] | unbreakable iron oath [aura]
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] signature idea (action): "Dame Oriel slams her shield forward in a shove that forces nearby foes back a step and makes the ground before her a wall they cannot cross except at their peril. Until the start of her next turn, any enemy that tries to move through or past her is punished with a longsword thrust, as though her discipline itself strikes them down." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Shielding Stance (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Shielding Stance (2/Day)" ("the idea's central verb is shield — intercepting blows meant for allies is the s [verb: shield:concept]")
[reskin] signature idea (trait): "When Dame Oriel hits a creature with her longsword, her …'s weight presses the wound, making it harder for that enemy to wound her allies. The next time that creature attacks someone other than her before the end of its next turn, it does so at a disadvantage, for her discipline demands it face her alone." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When Dame Oriel hits a creature with her longsword, her …'s weight presses the wound, making it harder for that enemy to wound her allies. The next time that creature attacks someone other than her before the end of its next turn, it does so at a disadvantage, for her discipline demands it face her alone." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
```


---

## Korvath the Ragebound — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Korvath the Ragebound | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Korvath the Ragebound

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 40 ft.

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

Berserk. Whenever Korvath starts its turn Bloodied, roll 1d6. On a 6, Korvath goes berserk. On each of its turns while berserk, Korvath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Korvath attacks an object. Once Korvath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Korvath has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Korvath extra movement, and Korvath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Korvath makes two attacks, using Greataxe or Thrown Hammer in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Thrown Hammer. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Korvath moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

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
[concept] signature elements: wounded fury [behavior] | reckless greataxe attacks [behavior] | stone-skinned hide [body]
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] signature idea (action): "Korvath slams his open hand against a fresh wound, then roars — the sight of his own blood sends a wave of fury through allies who share his pain. Any ally who can see or hear him is swept up in the rage, fighting harder for a moment. Korvath himself can do this only when he is already wounded." [action/once_per_fight/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rampage, affliction
[reskin] signature miss: action — "Korvath slams his open hand against a fresh wound, then roars — the sight of his own blood sends a wave of fury through allies who share his pain. Any ally who can see or hear him is swept up in the rage, fighting harder for a moment. Korvath himself can do this only when he is already wounded." [action/once_per_fight/damage] — the model found no template that holds it (offered: rampage, affliction)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Korvath's rock-veined hide makes him impossible to ignore in a brawl: any enemy who tries to slip past him feels the weight of his presence and must choose between facing him or being crushed. His sheer bulk and stone skin turn every near miss into a hard shove." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "Korvath's rock-veined hide makes him impossible to ignore in a brawl: any enemy who tries to slip past him feels the weight of his presence and must choose between facing him or being crushed. His sheer bulk and stone skin turn every near miss into a hard shove." [trait/always/movement] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst)
[reskin] species kit: Giant -> Humanoid — the goliath's type (the words name no other)
[reskin] species kit: Large -> Medium — a goliath is Medium (the words name no other size)
[reskin] species kit: "Greataxe" reach 10 -> 5 ft. — reach follows the goliath's size
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

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability:

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

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
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — caster-warpriest: ✓ ("blesses her soldiers") | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers before battle [behavior] | radiant mace strikes [object] | armor of the dawn [body]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] signature idea (action): "She plants her banner in the ground. The banner radiates a daylight-hued glow that marks the spot as holy ground. While she holds concentration, her blessed soldiers within the glow of the banner fight with renewed certainty: their attacks chip away at foes more surely, and when a blessed soldier falls, the banner flares and steadies the nearest standing faithful, letting them shrug off a moment o" [action/once_per_fight/resource] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "She plants her banner in the ground. The banner radiates a daylight-hued glow that marks the spot as holy ground. While she holds concentration, her blessed soldiers within the glow of the banner fight with renewed certainty: their attacks chip away at foes more surely, and when a blessed soldier falls, the banner flares and steadies the nearest standing faithful, letting them shrug off a moment o" [action/once_per_fight/resource] — the model found no template that holds it (offered: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, bolt-mark)
[reskin] value check: "Sundering Shove" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Her mace carries the dawn's warmth. Each strike she lands leaves a lingering ember of holy light on the target, and whenever a blessed ally hits that same foe, the ember flares and adds a sting of radiant pain." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Her mace carries the dawn's warmth. Each strike she lands leaves a lingering ember of holy light on the target, and whenever a blessed ally hits that same foe, the ember flares and adds a sting of radiant pain." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Sling" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Stride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
[harness] re-rolled Actions/"Multiattack" -> "Multiattack" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Multiattack: Vareth makes two attacks, using Mace or Radiant Flame in any combination.
Actions / AFTER   Multiattack: Vareth makes two attacks, using Mace or Radiant Flame in any combination.
provenance: none — the call wrote the text itself
```


---

## Iron Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Templar | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Iron Templar

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

Senses blindsight 10 ft. (blind beyond this radius); Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The templar makes two Mace attacks. It can replace one attack with a use of Creeping Dread.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Radiant Flame. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Radiant damage.

Creeping Dread. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the templar's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Piercing damage.

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
[concept] signature elements: grinding attrition warfare [behavior] | unyielding shield-lock defense [object] | hollow consecrated iron plate [body]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "The Iron Templar drives its mace down in a slow, crushing overhead blow that rings through armor and bone. A foe struck this way has its wind and footing knocked loose, so until it can collect itself every step it takes is a struggle that leaves it open to the templar's next swing. The templar simply grinds such foes down, one concussive blow at a time." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature miss: action — "The Iron Templar drives its mace down in a slow, crushing overhead blow that rings through armor and bone. A foe struck this way has its wind and footing knocked loose, so until it can collect itself every step it takes is a struggle that leaves it open to the templar's next swing. The templar simply grinds such foes down, one concussive blow at a time." [rider/on_hit/condition] — the model found no template that holds it (offered: charge-push, hook-rider, slow-bolt, disarm, push-prone, herd, wind-up, riposte)
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 2) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the templar plants its shield, the ground around it becomes a locked doorway: foes within its reach cannot slip past without offering a clear opening, and any that try are met with a punishing shield-bash. It never willingly gives up that planted stance, grinding down anyone who stays in the doorway with it." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (magic)
[reskin] signature miss: trait — "When the templar plants its shield, the ground around it becomes a locked doorway: foes within its reach cannot slip past without offering a clear opening, and any that try are met with a punishing shield-bash. It never willingly gives up that planted stance, grinding down anyone who stays in the doorway with it." [trait/always/defense] — the model found no template that holds it (offered: uncanny-sense)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Hurlbrand" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Creeping Dread The generic entry name does not reflect the Iron Templar's divine-judgment concept, making it read as a stock placeholder rather than the templar's signature smite.
```


---

## Crown's Echo — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Crown's Echo | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Forceful Staff); nova none; dmg 36

```
Crown's Echo

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

Actions

Multiattack. The echo makes three Forceful Staff attacks.

Forceful Staff. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The echo casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Reactions

Protective Magic (3/Day). Trigger: The echo is hit by an attack roll. Response: The echo casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("never where you struck and steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: never where the blow lands—steps aside through the Weave [behavior] | a court wizard in silks, forever mid-bow [body] | the echo of a chuckle as he vanishes [aura]
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "As a parting courtesy, the echo bows to a chosen enemy it can see and then steps through the Weave a short distance." [action/always/movement] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] value check: "Courteous Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Courteous Step (2/Day)" ("The echo bows and steps through the Weave a short distance — a teleporting step  [verb: step:concept]")
[reskin] signature idea (trait): "Once per fight, when badly wounded, the echo vanishes through the Weave. It reappears somewhere outside the reach of its pursuers, leaving behind only its chuckle and the smell of scorched parchment." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Once per fight, when badly wounded, the echo vanishes through the Weave. It reappears somewhere outside the reach of its pursuers, leaving behind only its chuckle and the smell of scorched parchment." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Sylvan" -> "Common and any three languages, Elvish, Sylvan" — the Mage's plus the concept's Elvish, Sylvan
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Bone-Horn); nova none; dmg 42

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
Multiattack: Thurivald makes two attacks: one with Bone-Horn and one with Word-Spike. It can replace one attack with a use of Commander's Rebuke.
Bone-Horn: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Word-Spike: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 21 (4d8 + 3) psychic damage.
Commander's Rebuke: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("a skald who sings his warband into a fur") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: the skald-song that drives his warband into a killing fury [behavior] | war-chanter's voice and bone-horn [object] | ash-caked armor and the smell of a burned hall [body]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald sings the next verse of the war-song he began at his own funeral pyre, binding every ally who can hear him into the same killing fury. Those allies fight with a drive that is not their own until he is struck down, and he gives them one more verse's worth of rage even as he dies, the last note burning his voice out so no other skald can ever steal it." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald sings the next verse of the war-song he began at his own funeral pyre, binding every ally who can hear him into the same killing fury. Those allies fight with a drive that is not their own until he is struck down, and he gives them one more verse's worth of rage even as he dies, the last note burning his voice out so no other skald can ever steal it." [action/once_per_fight/resource] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's bone-horn and his war-chanter's voice are the same instrument: the song is always in his throat, so anyone who tries to break his line or silence him mid-verse gets the next note in the teeth. When he is hit, he answers with a stabbing line from the song that pierces the attacker's mind and keeps the warband's fury from lapsing." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature miss: trait — "Thurivald's bone-horn and his war-chanter's voice are the same instrument: the song is always in his throat, so anyone who tries to break his line or silence him mid-verse gets the next note in the teeth. When he is hit, he answers with a stabbing line from the song that pierces the attacker's mind and keeps the warband's fury from lapsing." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-fury)
```


---

## Smokeveil — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Smokeveil | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Smokeveil

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

Evasion. If the smokeveil is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the smokeveil instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the smokeveil has Advantage on attack rolls against any creature that hasn't taken a turn. If the smokeveil hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Umbral Stride. The smokeveil ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The smokeveil makes two attacks, using Tanto or Shuriken in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The smokeveil takes the Dash, Disengage, or Hide action.

Ashen Withdrawal (1/Day). The smokeveil casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: strikes unseen from shadow [behavior] | shadow-step teleportation [behavior] | body made of living shadow [body]
[reskin] signature idea (action): "The smokeveil reaches through the target's own shadow — a length of living darkness lashed to its victim at the moment it is first struck unseen. From then on, that one creature always has the smokeveil's marker on it: whenever the smokeveil is hidden from it, the smokeveil can strike at it once from any shadow within sight as if it were standing right there, and the blow lands carrying the wound " [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into self-invisibility
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The smokeveil's body is a garment of living shadow, so it never truly fills a space — even when spotted, it stands half-elsewhere, and anyone who strikes at it grapples smoke. While it is unseen by its attacker, every blow against it slides off into the dark; the moment it is plainly seen, it becomes as solid and as fragile as the mortal it once was." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "The smokeveil's body is a garment of living shadow, so it never truly fills a space — even when spotted, it stands half-elsewhere, and anyone who strikes at it grapples smoke. While it is unseen by its attacker, every blow against it slides off into the dark; the moment it is plainly seen, it becomes as solid and as fragile as the mortal it once was." [trait/on_being_hit/defense] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---

## Maze-Hunger Minotaur — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Maze-Hunger Minotaur | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Maze-Hunger Minotaur

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

Bloodied Frenzy. While Bloodied, the minotaur has Advantage on attack rolls and saving throws.

Actions

Multiattack. The minotaur makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The minotaur moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the minotaur moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

Labyrinth Rebuke. One creature within 5 feet that hit the minotaur with an attack roll since the end of the minotaur's last turn takes 7 (2d6) Bludgeoning damage.

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
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: herding prey into the maze [behavior] | labyrinthine cunning [behavior] | massive horns and axe [body]
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] signature idea (action): "The minotaur sweeps its horns in a brutal arc, forcing caught prey to stumble away in a direction it chooses. Instead of harming them, it drives them along the path it wants, tightening the noose of the maze." [bonus_action/save/movement] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into herd
[reskin] signature miss: action — "The minotaur sweeps its horns in a brutal arc, forcing caught prey to stumble away in a direction it chooses. Instead of harming them, it drives them along the path it wants, tightening the noose of the maze." [bonus_action/save/movement] — the model found no template that holds it (offered: herd)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its massive horns and axe are extensions of the maze's hunger, and when blood is drawn, the labyrinth itself seems to reach out to hinder the wounded. Those it strikes find their steps heavy and their escape slowed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Its massive horns and axe are extensions of the maze's hunger, and when blood is drawn, the labyrinth itself seems to reach out to hinder the wounded. Those it strikes find their steps heavy and their escape slowed." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
```


---

## Oathbroken Vigil — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbroken Vigil | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Shield); nova none; dmg 52

```
Oathbroken Vigil

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

Multiattack. The vigil makes two attacks, using Shield or Sword in any combination.

Shield. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Sword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the vigil gains 13 (3d8) Temporary Hit Points.

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
[concept] signature elements: shielding the weak with iron bulwark [behavior] | fall of a knightly order [aura] | broken longsword and shield [object]
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] signature idea (action): "The Vigil plants its shield and calls out a formal challenge to every enemy that can see or hear it, demanding they face it or be broken for turning away. Any foe that ignores the challenge and tries to move past the Vigil toward its allies instead eats a punishing shield-first charge that slams them to a halt and leaves them reeling." [action/once_per_fight/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature bound by force: action — "rally" matches shield+orders in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: shield:concept, orders:concept]")
[reskin] signature idea (trait): "When a creature the Vigil can see within reach is hit by an attack, the Vigil can throw itself into the blow, taking the damage onto its own … and body. The attacker's strike lands on the Vigil instead, and the Vigil's grim stubbornness means it will keep doing this as long as it draws breath, never letting the weak fall while it still stands." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When a creature the Vigil can see within reach is hit by an attack, the Vigil can throw itself into the blow, taking the damage onto its own … and body. The attacker's strike lands on the Vigil instead, and the Vigil's grim stubbornness means it will keep doing this as long as it draws breath, never letting the weak fall while it still stands." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
```


---

## Sable Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

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

Crowdstep. Sable ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sable makes two attacks, using Dagger or Sling in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. Sable takes the Dash, Disengage, or Hide action.

Slip the Crowd. Sable takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[concept] signature elements: slips through the market crowd [behavior] | cutpurse's blade [object] | shadow-wrapped escape [aura]
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a tabaxi cutpurse": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Sable Whisker makes a knifing attack aimed at an exposed place—a purse string, a belt pouch, a shield strap—cutting it loose rather than drawing blood. The target must be carrying something vulnerable in that moment, and if the cut lands, the thing falls away clattering across the cobbles. In a packed market crowd, that can spill coins, rip a weapon from a loosened sheath, or send a potion rolling" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Slip the Crowd" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Slip the Crowd" ("slips through the crowd — taking Disengage to weave away and leaving attackers o [verb: slip:concept]")
[reskin] signature idea (trait): "Anyone who reaches into a crowd to grab Sable or strike it must first find it among the bodies and the press—and when they swing, a bystander or a stall or another shopper is as likely to take the blow. Sable is never truly alone while a crowd is nearby; it slips through, and the crowd itself becomes its armor." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Anyone who reaches into a crowd to grab Sable or strike it must first find it among the bodies and the press—and when they swing, a bystander or a stall or another shopper is as likely to take the blow. Sable is never truly alone while a crowd is nearby; it slips through, and the crowd itself becomes its armor." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
```
