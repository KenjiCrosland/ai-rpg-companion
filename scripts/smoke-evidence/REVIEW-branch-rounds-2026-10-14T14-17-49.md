# Review batch — branch-rounds-2026-10-14T14-17-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Orc | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Crookbound Herdmaster | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sir Reginald Pemberton-Hughes | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Coral Vurthax | 5 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Rime-Scaled Wyrm | 9 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | soft (1) | 1/1 | 3/4 |
| Yewshrine Warden | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thornpiper Reveler | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Gloamripper | 2 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/7 |
| Stormwrought Oathkeeper | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Meshrin | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 0 of 13 user clauses** (coverage 100%); concept share 69% (36/52 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Gloamripper — lowest CR

**Concept:** a troglodyte that lurks in shadow and steps away from its kill

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gloamripper | 2 (2014) | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 2 → 1.125; sustained 20 (2 × Kukri); nova none; dmg 20

```
Gloamripper
Medium humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

44 (8d8 + 8)

Speed: 

30 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

12 (+1)

	

13 (+1)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +3, Stealth +5

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

2 (450 XP)

Proficiency Bonus:

+2

Sunlight Sensitivity. While in sunlight, the gloamripper has disadvantage on ability checks and attack rolls.
Stench. Any creature that starts its turn within 5 feet of the gloamripper must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. On a successful save, the creature is immune to the gloamripper's Stench for 24 hours.
Shadowstep. The gloamripper ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Cunning Action. As a bonus action, the gloamripper takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The gloamripper makes two attacks: one with its Kukri and one with its Barbed Dart. It can replace one attack with a use of Merciless Strike.
Kukri: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 10 (2d8 + 1) piercing damage.
Barbed Dart: Ranged Weapon Attack: +3 to hit, range 20/60 ft., one target. Hit: 8 (2d6 + 1) piercing damage.
Merciless Strike: One creature within 30 feet that is poisoned must make a DC 11 Wisdom saving throw, taking 11 (2d10) bludgeoning damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("lurks in shadow") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: strike from hiding and vanish [behavior] | stench of the warrens [aura] | shadow-step through darkness [body]
[reskin] claim gate: CR 2 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The gloamripper strikes from concealment, its blade coated in a toxin that deadens the mind. A target wounded by this attack cannot see the gloamripper for a short while, leaving them blind to its next strike. This affliction is purely its own; the gloamripper can never suffer it." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Merciless Strike" EV 8.5 vs floor 4.7 (one attack of 2) — dice 18 → 11 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gloamripper is at home in darkness. While in dim light or darkness, its movements through shadows are effortless: it leaves no trail and can squeeze through gaps as if they were open passages. It instinctively knows the way to any shadow within reach." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
```


---

## Rime-Scaled Wyrm — highest CR

**Concept:** a rime-scaled wyrm that swallows sailors whole

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rime-Scaled Wyrm | 9 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity |

- reader · soft · multiattack-integrity: Multiattack uses "Gorge", which is not a row on this sheet
- read: def 6 / off 11 → 8.5; sustained 54 (3 × Bite); nova Rime Breath 49; dmg 69

```
Rime-Scaled Wyrm

Huge Dragon, Neutral Evil

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

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Draconic

CR 9 (XP 5,000; PB +4)

Traits

Rime Shock. A creature that touches the rime-scaled wyrm or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Cold damage.

Actions

Multiattack. The rime-scaled wyrm makes three Bite attacks. It can replace one attack with a use of Gorge and Glut.

Bite. Melee Attack Roll: +8, reach 10 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Cold damage.

Rime Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 49 (14d6) Cold damage. Success: Half damage.

Gorge and Glut. Dexterity Saving Throw: DC 15, one Medium or smaller creature within 5 feet that the rime-scaled wyrm hit with a melee attack this turn. Failure: 18 (4d8) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the rime-scaled wyrm, and takes 9 (2d8) Acid damage at the start of each of the rime-scaled wyrm's turns. If the rime-scaled wyrm takes 20 damage or more on a single turn from a creature inside it, it must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the rime-scaled wyrm and has the Prone condition. If the rime-scaled wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 10 feet of movement, exiting with the Prone condition.

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
[route] brute-grappler type=Dragon mechanics=grapple, engulf — brute-grappler: ✓ ("swallows sailors whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing sailors whole [behavior] | rime-scaled hide [body] | living glacier serpent [body]
[reskin] nova capped: "Breath Weapon" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] signature idea (action): "The wyrm drives its head down into one grappled victim and swallows again, pulling the prey deeper into its gut. The victim is crushed and frozen inside, while the wyrm can keep fighting and even takes a moment to hurl the body out if it wants." [action/always/condition] — menu: swallow, shield-bash, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] value check: "Gorge and Glut" EV 19.8 vs floor 9.4 (one attack of 3) — a nova already stands — kept ungated, dice to 18 at the ceiling
[reskin] signature template: swallow -> Actions/"Gorge and Glut" ("The wyrm drives its head down into a grappled victim and swallows again, pulling [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The wyrm is a living glacier: whenever a creature strikes its rime-crusted hide in melee, a shock of killing cold rushes back through the weapon and numbs the attacker. The cold clings, making the attacker slower and more vulnerable until it shakes the frost off." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (rime)
[reskin] signature template (trait): heated-body -> Traits/"Rime Shock" ("a creature that hits the wyrm with a melee attack is shocked back by killing col [verb: rime:concept, shock:idea, frost:idea]")
[reskin] chassis nova: "Rime Breath (Recharge 5-6)" — the dragon-8's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Sir Reginald Pemberton-Hughes — a 2014 sheet

**Concept:** name: Sir Reginald Pemberton-Hughes | a duelist with a greatsword and a heavy crossbow who is deathly afraid of chickens

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Reginald Pemberton-Hughes | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greatsword); nova none; dmg 44

```
Sir Reginald Pemberton-Hughes
Medium humanoid, neutral
Armor Class

16 (studded leather, shield)

Hit Points: 

112 (15d8 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Avian Terror. While Sir Reginald can see live chickens within 30 feet of itself, it has Disadvantage on attack rolls and ability checks, and it must use its movement on each of its turns to move away from live chickens by the safest available route unless there is nowhere farther to go.
Great Weapon Master. When Sir Reginald hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions
Multiattack: Sir Reginald makes two attacks, using Greatsword or Crossbow. It can replace one attack with a use of Shield Bash.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage.
Crossbow: Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 20 (4d8 + 2) piercing damage, and Sir Reginald has Advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that Sir Reginald can see must make a DC 15 Strength saving throw, taking 19 (3d12) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, If the target is a Medium or smaller creature, it has the Prone condition.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a heavy crossbow") | skirmisher-archer -> defender: the concept's VERB outranks the noun (key "duelist", class verb) | defender: key "duelist" (class verb)
[concept] signature elements: greatsword and heavy crossbow duelist [behavior] | disciplined defender who punishes movement past him [behavior] | deathly fear of chickens [behavior]
[reskin] print canon defenses: HP 114 -> 112, AC 18 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] print canon: "Sir Reginald Pemberton-Hughes — a duelist with a greatsword and a heavy crossbow who is deathly afraid of chickens" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] signature idea (action): "When Sir Reginald would be frightened or forced to flee by a chicken, he can instead master himself and issue a formal challenge to the bird's keeper: the nearest foe must face him in single combat or he simply leaves. If the foe accepts, Sir Reginald becomes the center of the duel, punishing anyone else who interferes with a swift crossbow bolt." [action/once_per_fight/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, stunning-strike, charge-push, hook-rider)
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sir Reginald is deathly afraid of live chickens, and the presence of one within thirty feet shatters his discipline: he will disengage, retreat, or parley absurdly to avoid the bird, even abandoning an otherwise winning duel." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — phobia (afraid of, afraid)
[reskin] signature template (trait): phobia -> Traits/"Avian Terror" ("Sir Reginald is deathly afraid of live chickens; seeing one within 30 feet shatt [verb: afraid of:concept, afraid:concept]")
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon: chassis row leaves — Reactions/"Riposte" is the seat's, not the Gladiator's
[reskin] print canon row priced: Shield Bash — dice 9 → 19
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
```


---

## Bloodmaw Orc — a 2024 sheet

**Concept:** a bloodmaw orc berserker with a greataxe who retreats behind iron armor

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Orc | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Bloodmaw Orc

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

Senses darkvision 120 ft.; Passive Perception 13

Languages Common, Orc

CR 8 (XP 3,900; PB +3)

Traits

Scrapwrought Hide. A creature that hits the bloodmaw orc with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Bloodied Frenzy. While Bloodied, the bloodmaw orc has Advantage on attack rolls and saving throws.

Great Weapon Master. When the bloodmaw orc hits a creature with its Greataxe, the attack deals an extra 3 damage.

Actions

Multiattack. The bloodmaw orc makes two attacks, using Greataxe or Hurlaxe in any combination. It can replace one attack with a use of Bloodcurdling Howl.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 26 (6d6 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Slashing damage.

Bloodcurdling Howl. Wisdom Saving Throw: DC 16, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the bloodmaw orc's next turn. If the target was already Frightened by this ability, it also takes 27 (6d8) Piercing damage.

Bonus Actions

Relentless Rush. The bloodmaw orc takes the Dash action.

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
[route] brute type=Humanoid mechanics=none — brute: ✓ ("bloodmaw orc berserker with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greataxe berserker charge [behavior] | retreats behind scavenged iron armor [behavior] | bloodmaw orc physiology [body]
[reskin] signature idea (action): "The orc makes a lunging, two-handed chop that only works if it has room to wind up and commit — so it can only use this right after moving a good distance toward its target, representing the full-blooded opening charge. On a hit the greataxe bites deep enough that the wound keeps bleeding, and the orc visibly pries a strip of iron off the victim to feed its shell. The chop is exhausting and leaves" [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Creeping Dread" EV 18.6 vs floor 14 (one attack of 2) — dice 14 → 27
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every time the orc is hit by a melee attack, it tears a strip of iron off the attacker's weapon, shield, or armor and bolts it onto its own hide, thickening its scrap shell; each piece makes the next blows against it glance away, but the shell is brittle — a solid enough hit or a shove can shake several plates loose at once. The shell only grows while the orc stays on the defensive and retreats be" [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body (iron)
[reskin] signature template (trait): resonant-body -> Traits/"Scrapwrought Hide" ("Every time the orc is hit by a melee attack while within reach, it tears a strip [verb: iron:concept]")
```


---

## Coral Vurthax — a homebrew with a nova

**Concept:** a triton reef-warden who topples raiders with a trident

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coral Vurthax | 5 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 36 (3 × Trident); nova Tide Burst 28; dmg 43

```
Coral Vurthax

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 90 (12d8 + 36)

Speed 30 ft., Swim 40 ft.

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
16
+3
+6
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

Skills Perception +5, Stealth +6

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Primordial

CR 5 (XP 1,800; PB +3)

Traits

Amphibious. The vurthax can breathe air and water.

Reef Stride. The vurthax ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The vurthax makes three Trident attacks. It can replace one attack with a use of Downed Strike.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 12 (2d8 + 3) Piercing damage, and the target is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Prone condition.

Tide Burst (Recharge 5-6). The vurthax hurls its barbed trident at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 28 (8d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Downed Strike. Strength Saving Throw: DC 13, one creature within 30 feet that has the Prone condition. Failure: 10 (3d6) Bludgeoning damage. Success: Half damage.

Bonus Actions

Fleet Agility. The vurthax takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — defender-warden: a Humanoid is not a made or risen guardian | skirmisher-hurler: ✓ ("topples raiders with a trident") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: hurled trident that topples raiders [behavior] | living brine body [body] | coral-reef territory [aura]
[reskin] nova capped: "Hurled Burst" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] signature idea (action): "Great hooked spines line the warden's forearms; it drives them into a foe it has just knocked down and drags itself atop the body, pinning the prey in place and keeping it within the warden's reach while the trident is hauled back to hand. The hold lasts only as long as the warden chooses to stay crouched on top of its catch, a patient ambush hunter riding its prize in the shallows." [action/save/condition] — menu: snare, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, bolt-mark)
[reskin] value check: "Spine Pin" EV 7.8 vs floor 5.2 (one attack of 3) — dice 21 → 10 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Spine Pin" ("the idea drives spines into a foe it has just knocked down; the payoff triggers  [shape fit, no verb match]")
[reskin] signature idea (trait): "The warden swims in the brine held within its own flesh and gear, sloughing off the steady pressure of deep water; its barbed trident and clinging coral armplates weigh it no more than dry land does, so it never suffers the usual drag of water or slippery footing." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The warden swims in the brine held within its own flesh and gear, sloughing off the steady pressure of deep water; its barbed trident and clinging coral armplates weigh it no more than dry land does, so it never suffers the usual drag of water or slippery footing." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] chassis nova: "Tide Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Crookbound Herdmaster — in the run

**Concept:** a herdmaster who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Crookbound Herdmaster | 5 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 38 (2 × Herding Crook); nova none; dmg 38

```
Crookbound Herdmaster

Medium Humanoid, Neutral

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

Aura of Authority. While in a 10-foot Emanation originating from the herdmaster, the herdmaster and its allies have Advantage on attack rolls and saving throws, provided the herdmaster doesn't have the Incapacitated condition.

Actions

Multiattack. The herdmaster makes two attacks, using Herding Crook or Thunderbolt in any combination.

Herding Crook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Thunder damage.

Thunderbolt. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Thunder damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the herdmaster gains 9 (2d8) Temporary Hit Points.

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
[concept] signature elements: commands a stampede of thunder-elk [behavior] | aura of authority that keeps the herd cohesive [aura] | iron-shod herding crook [object]
[reskin] signature idea (action): "The Herdmaster plants its feet, swings its ironwood crook overhead, and bellows. Bestial thunder-elk — even unseen ones — surge forward from its flanks in a thundering line, crashing through everything in their path and trampling enemies under hoof and storm before the herd skillfully swerves aside; allies still standing at the Herdmaster's side are untouched." [action/once_per_fight/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up (+ shelf: herd, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into herd
[reskin] value check: "Thunder Herd Call (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Thunder Herd Call (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the Herdmaster is struck in melee, it not only parries with its iron-shod crook but gives back a thunderous crack of the same storm contained in the ironwood, punishing the attacker for daring to break the herd's stride." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---

## Yewshrine Warden — in the run

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Yewshrine Warden | 3 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Bite); nova none; dmg 24

```
Yewshrine Warden

Medium Humanoid, Lawful Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +5, Perception +3

Senses darkvision 30 ft.; Passive Perception 13

Languages Common, Aquan

CR 3 (XP 700; PB +2)

Traits

Hold Breath. The warden can hold its breath for 1 hour.

Actions

Multiattack. The warden makes two attacks, using Bite or Shell Spikes in any combination.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shell Spikes. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Shell Defense. The warden withdraws into iron-banded shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

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
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("a tortle hermit who withdraws into his s") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into an iron-reinforced shell [behavior] | iron-banded shell that turns aside blows [body] | punishing those who try to move past [behavior]
[reskin] signature idea (action): "The warden locks himself inside his iron-banded shell, hunkering down so that blows glance off the iron and he cannot be moved against his will. While withdrawn, he cannot attack, but at the start of each of his turns he can peek out just enough to lash at any enemy who has come within reach, punishing those who think him helpless. He chooses to withdraw; no one can force him into it." [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, shell-withdraw, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Iron Shell Retreat" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("the warden chooses to withdraw into his shell, becoming harder to hit and immobi [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "The warden's shell is thick with iron bands, and its weight settles him like a rooted stone; when he braces, the shell turns aside blows that would stagger a softer creature, and attempts to shove or trip him find only immovable iron." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The warden's shell is thick with iron bands, and its weight settles him like a rooted stone; when he braces, the shell turns aside blows that would stagger a softer creature, and attempts to shove or trip him find only immovable iron." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
```


---

## Thornpiper Reveler — in the run

**Concept:** a satyr piper who dances travellers into the hills

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thornpiper Reveler | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 28 (2 × Thornpipe); nova none; dmg 28

```
Thornpiper Reveler

Medium Fey, Chaotic Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

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
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The reveler has Advantage on saving throws against spells and other magical effects.

Fleet Footwork. The reveler ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The reveler makes two attacks, using Thornpipe or Thorn Dart in any combination.

Thornpipe. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Psychic damage.

Thorn Dart. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Psychic damage.

Bonus Actions

Fleet Agility. The reveler takes the Dash or Disengage action.

Whirling Sidestep. The reveler takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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
[route] skirmisher type=Fey mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | skirmisher: ✓ ("a satyr piper who dances") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: compelling dance-aura [aura] | thorn-pipe instrument [object] | skirmishing hit-and-run dance [behavior]
[reskin] signature idea (action): "The reveler lifts its thornpipe and plays a shrill, skipping reel aimed at one creature it can see, compelling that creature to spend its movement dancing directly toward the reveler along the shortest safe path. The reel does not root the target; it makes the dance irresistible if the target fails to withstand it, and the reveler can keep playing round after round to drag the same victim ever dee" [action/save/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (dance)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Whirling Sidestep" EV 6.9 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Whirling Sidestep" ("the creature is a dancer whose dance is evasive — it slips away in motion, and f [verb: dance:concept]")
[reskin] signature idea (trait): "The reveler moves in an ever-shifting … that cannot be pinned down; whenever a creature ends its turn having moved less than it could have, the reveler's thornpipe gives off a mocking psychic echo that punishes the creature for standing still. Any creature that chooses not to move during its turn while within earshot suffers a stab of psychic pain that leaves it reeling." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The reveler moves in an ever-shifting … that cannot be pinned down; whenever a creature ends its turn having moved less than it could have, the reveler's thornpipe gives off a mocking psychic echo that punishes the creature for standing still. Any creature that chooses not to move during its turn while within earshot suffers a stab of psychic pain that leaves it reeling." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, fire-aura)
```


---

## Stormwrought Oathkeeper — in the run

**Concept:** name: Stormwrought Oathkeeper | a storm-marked warden who stomps the ground and spits venom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormwrought Oathkeeper | 7 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Claw); nova Storm Stomp 24; dmg 47

```
Stormwrought Oathkeeper

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 117 (18d8 + 36)

Speed 40 ft.

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
18
+4
+7
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
8
-1
-1

Skills Perception +4, Stealth +7

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Stormclap Retort. A creature that touches the oathkeeper or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Lightning damage.

Storm Stride. The oathkeeper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The oathkeeper makes two attacks, using Claw or Venom Spit in any combination.

Claw. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 10 (3d6) Lightning damage.

Storm Stomp (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the oathkeeper. Failure: 24 (7d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Venom Spit. Ranged Attack Roll: +7, range 30/120 ft. 13 (2d8 + 4) Poison damage.

Bonus Actions

Fleet Agility. The oathkeeper takes the Dash or Disengage action.

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
[route] skirmisher type=Monstrosity mechanics=none — brute: ✓ ("a storm-marked warden who stomps the gro") | brute -> skirmisher: the concept's VERB outranks the noun (key "spits", class verb) | skirmisher: key "spits" (class verb)
[concept] signature elements: thunder-charged ground slam that erupts in a burst of lightning [behavior] | venomous spittle that blinds and poisons [behavior] | storm-scarred hide crackling with static [body]
[reskin] signature idea (action): "The oathkeeper leans back and heaves its head to spit a glob of envenomed spittle that arcs toward a creature it can see. Where the spittle lands, clinging poison saps the victim's vigor; but while the venom is still wet on its lips, the creature can also stomp the ground, discharging a thunder-charged shockwave that erupts in a burst of lightning, hurling nearby foes prone in a tangle of limbs." [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: leap, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — ground-burst, delayed-brand (stomp, stomps, venom, mark)
[reskin] value check: "Storm Stomp (Recharge 5-6)" EV 64.7 vs floor 42.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Storm Stomp (Recharge 5-6)" ("the oathkeeper stomps the ground, discharging a thunder-charged shockwave that e [verb: stomp:concept, stomps:concept, erupt:idea, erupts:idea, burst:idea, shockwave:idea]")
[reskin] signature idea (trait): "The oathkeeper's storm-scarred hide crackles with restless static, and when a foe lands a hit, the charge leaps back along the weapon or claw. The attacker is jolted and left staggering, their muscles twitching with lingering lightning." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, faultless-tracker (storm, marked)
[reskin] signature template (trait): heated-body -> Traits/"Stormclap Retort" ("a foe lands a hit, the charge leaps back along the weapon or claw [verb: storm:concept, lightning:idea]")
```


---

## Meshrin — in the run

**Concept:** name: Meshrin | a chain-hooked thing that drags its prey into the dark

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 6 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Hooked Chain); nova none; dmg 40

```
Meshrin

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 30 ft.

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

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Drag into the Dark. When Meshrin hits a creature with its Hooked Chain, If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition. It is pulled up to 10 feet straight toward Meshrin.

Actions

Multiattack. Meshrin makes two Hooked Chain attacks.

Hooked Chain. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition. It is pulled up to 10 feet straight toward Meshrin.

Bonus Actions

Cage. Meshrin cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Meshrin, and takes 7 (2d6) Poison damage at the start of each of Meshrin's turns. Meshrin can have only one creature caged at a time. If Meshrin takes 15 damage or more in a single turn from the caged creature, Meshrin must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Meshrin. If Meshrin dies, a caged creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, snare — brute-grappler: ✓ ("chain-hooked thing that drags its prey") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: chain-hooks that bite and drag [object] | drags prey into the dark [behavior] | toying with trapped victims [behavior]
[reskin] signature idea (action): "Meshrin plants its chains and hauls on them, dragging every foe it has hooked straight toward its waiting maw. Each creature still caught on a chain is yanked across the ground to within reach of the maw and left sprawled on the floor for the moment it takes to reel them the rest of the way in." [action/always/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-rider (hook, hooks, drag, drags)
[reskin] signature bound by force: action — "hook-rider" matches hook+hooks+drag+drags in the user's words; the model's none is overruled
[reskin] signature rider: hook-rider -> Hooked Chain (appended; exact concept match [verb: hook:concept, hooks:concept, drag:concept, drags:concept, yank:idea])
[reskin] signature idea (trait): "The barbs on Meshrin's chains are slick with a poison that never lets go: any creature still hooked and being dragged has the venom worked deeper into its wounds, while a creature that tears itself free only spreads the poison further through its own flesh." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The barbs on Meshrin's chains are slick with a poison that never lets go: any creature still hooked and being dragged has the venom worked deeper into its wounds, while a creature that tears itself free only spreads the poison further through its own flesh." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, bloodied-burst)
```
