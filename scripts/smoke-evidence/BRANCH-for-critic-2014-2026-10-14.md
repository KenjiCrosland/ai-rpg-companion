# Release table for the critic — 2014 blocks — 2026-10-14

The case is at the top of the 2024 file (BRANCH-for-critic-2024-2026-10-14.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — classes-eight-2026-10-14T14-11-05

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

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


### Sergeant Aldric Vane — a 2014 sheet

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


### Thurivald — in the run

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


---

## Review batch — branch-rounds-2026-10-14T14-17-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

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


### Gloamripper — lowest CR

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
[reskin] species kit: troglodyte — "a troglodyte": Stench (Ghast/Stench), Sunlight Sensitivity (Drider/Sunlight Sensitivity); darkvision 60 ft.
[reskin] signature idea (action): "The gloamripper strikes from concealment, its blade coated in a toxin that deadens the mind. A target wounded by this attack cannot see the gloamripper for a short while, leaving them blind to its next strike. This affliction is purely its own; the gloamripper can never suffer it." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Merciless Strike" EV 8.5 vs floor 4.7 (one attack of 2) — dice 18 → 11 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gloamripper is at home in darkness. While in dim light or darkness, its movements through shadows are effortless: it leaves no trail and can squeeze through gaps as if they were open passages. It instinctively knows the way to any shadow within reach." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending)
```


---


### Sir Reginald Pemberton-Hughes — a 2014 sheet

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
[reskin] class kit: fighter — "Sir Reginald Pemberton-Hughes — a duelist with a greatsword": Riposte (riposte)
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

