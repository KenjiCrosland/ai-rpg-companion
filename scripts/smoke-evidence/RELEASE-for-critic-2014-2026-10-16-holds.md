# Release table for the critic — 2014 blocks — 2026-10-16

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-16.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — branch-holds-2026-10-16T09-38-31

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Aldren Vosch | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Voice-Thief of the Gallows Rookery | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Templar of the Unmoved Stone | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Umbral Assassin | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |

**Dropped 0 of 8 user clauses** (coverage 100%); concept share 55% (12/22 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


_No 2014 blocks sampled in this run._

---

## Review batch — branch-nova-2026-10-16T09-17-50

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 0/1 | 3/3 |
| Altarstone Warden | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 2/2 | 5/7 |
| Plaguecarrion Mote | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Stormcore Detonant | 15 | 2024 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/3 |
| Hornwold Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 1/3 |
| Bog Cauldron | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key, engine-needs-key | FAIL (1) | 1/1 | 3/4 |

**Dropped 3 of 8 user clauses** (coverage 63%); concept share 72% (18/25 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- swarm-9 / reader: 1
- brute-13 / bands: 1
- defender-5 / reader: 1
- brute-8-grappler / reader: 1



---


_No 2014 blocks sampled in this run._

---

## Review batch — classes-eight-2026-10-16T09-20-14

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marsh Nerve-Striker | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Sylvara Emberthorn | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Hundredth Line | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Oathbroken Korrath | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/5 |
| Templar of the Unmoved Stone | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Last Court Magician | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/5 |
| Oathsworn Crusader | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Unseen Blade | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/7 |
| Ravine Packstalker | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Skeinfang Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Bone-Labyrinth Reaver | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Broken Wall Sentinel | 7 | 2024 | defender-5 | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/4 |
| Bellcount Cutpurse | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 76% (59/78 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- defender-3-leader / structure: 1
- defender-5 / structure: 1



---


### Hundredth Line — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hundredth Line | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Hundredth Line
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
Second Wind (2/Day). As a bonus action, the hundredth line regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of the hundredth line misses it with a melee attack roll, the hundredth line makes one Longsword attack against that creature.

Actions
Multiattack: The hundredth line makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of the hundredth line's next turn.
Shield Bash: One creature within 5 feet that the hundredth line can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "a veteran soldier with a longsword"

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a veteran soldier with a longsword who b…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: longsword and buckler duel [object] | holds the line [behavior] | shield bash stagger [behavior]
[concept] identity: A grizzled veteran opens by stepping into the enemy's reach, catching the first swing on a scarred buckler and answering with a low longsword cut to the knee. Every round after, it fights as a single fluid machine — parry, shield-bash to stagger, then a precise thrust at the exposed gap — always giving ground slowly, never breaking stride, using the terrain and its own armored bulk to funnel foes into kill-zones. It fights to the death, not from fanaticism but from a cold professional certainty that the line must hold.
[concept] lore: This soldier was forged from a hundred failed defenses and one last stand that bought a city a single day; now it wanders the old battlefields, looking for a line worth dying on and a commander worth following.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "the hundredth line" — the call's own answer (kind), built from the name
[reskin] inline form: "the hundredth line" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no ranged weapon" quotes nothing the user typed
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (descriptive)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The Hundredth Line locks eyes with one foe and calls them out, challenging them to settle it blade to blade. So long as the soldier stands its ground and keeps trading blows with that single opponent, both of them are drawn into the duel — the challenge ends whenever either breaks away, or when the soldier turns its attention elsewhere. Foes who have seen the Hundredth Line do this before know it " [action/always/condition] — menu: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Hundredth Challenge" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Wounds do not make the Hundredth Line flinch; they make it read the fight. Every time an enemy's blow lands on it and does not bring it down, the Hundredth Line learns exactly where that weapon wants to be — and the next time the same foe swings, it is already moving to be somewhere else." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: bloodied-burst, bloodied-fury, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature miss: trait — "Wounds do not make the Hundredth Line flinch; they make it read the fight. Every time an enemy's blow lands on it and does not bring it down, the Hundredth Line learns exactly where that weapon wants to be — and the next time the same foe swings, it is already moving to be somewhere else." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | FAIL: lint:duplicate-entry | ok | ok | ok | ok | ok | ok |

- structure · fail · lint:duplicate-entry: Actions/Booming Bellow: identical text to "Rune-Spear" — two names, one ability; rewrite this entry into something distinct
- **dropped clause:** "sings his warband into a fury"
- read: def 4 / off 6 → 5; sustained 42 (2 × Rune-Spear); nova none; dmg 42

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

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.
Iron-Verse Fury (2/Day). As a bonus action, Thurivald grants each ally within 30 feet of it 10 (3d6) temporary hit points.

Actions
Multiattack: Thurivald makes two attacks: one with Rune-Spear and one with Booming Bellow.
Rune-Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Booming Bellow: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Rune-Spear — weapon spear
- Actions/Booming Bellow — the chassis
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"
- Bonus Actions/Iron-Verse Fury — template rally; library draw (seed unstamped); binds the GM's words: bellows

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: war-chant that quickens allies [behavior] | rune-scored iron spear [object] | aura of fierce authority [aura]
[concept] identity: Thurivald opens by planting his banner and unleashing a thunderous war-chant that quickens his warband's blood, then wades into melee beside them, striking with a rune-scored spear and bellowing fresh verses each round to keep their fury at a boil. He fights to the death if his song still holds his warriors, but if the warband breaks he will try to withdraw and rally them — a skald never flees alone while a chorus remains.
[concept] lore: Thurivald is a battle-poet of the frost-marched jarls, who sings the old iron-words that turn fear to fury and wants only to die with a verse on his lips and his warband still standing.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] repair round 1: 1 defect(s) — "Booming Bellow" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] energy withheld on a base row: "Booming Bellow" Thunder -> Piercing (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] signature idea (action): "Thurivald bellows a verse from the old iron-words, and every ally who can hear him is driven into a killing fury: until the end of their next turn, their weapon strikes bite deeper, tearing flesh with a jagged echo of the chant. The verse costs him his voice for a breath — he cannot bellow again until he has drawn blood or taken a wound, and the fury dies if he stops fighting." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] value check: "Iron-Verse Fury (2/Day)" EV 5.5 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Iron-Verse Fury (2/Day)" ("The bellow drives every ally who can hear him into a killing fury, making their  [verb: bellows:idea]")
[reskin] signature idea (trait): "The runes carved down Thurivald's spear are a verse of their own, and they answer every blow they land: each time the spear strikes a foe, a fragment of the chant clings to the wound, leaving the next ally to strike that same foe fighting through a hymn of iron that makes their weapon feel lighter and truer." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, resonant-body, marking-light, faultless-tracker, relentless-pursuit, guarded-stance, berserk — the key word does not mean the mechanic here
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The runes carved down Thurivald's spear are a verse of their own, and they answer every blow they land: each time the spear strikes a foe, a fragment of the chant clings to the wound, leaving the next ally to strike that same foe fighting through a hymn of iron that makes their weapon feel lighter and truer." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Rune-Spear = spear; Booming Bellow = none; Rally the Warband = none
[reskin] languages by mind: "Common plus two languages" -> "Common" (sapient)
[reskin] row narrowed: "Booming Bellow" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


---

## Review batch — canaries-2026-10-16T09-26-32

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Cave Glutton | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Tunnel Absconder | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Glass-Voiced Thief | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Iron-Vow Templar | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Courtier Unseen | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Stormheart Wyrm | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name | FAIL (1) | 0/1 | 3/7 |
| Gilded Vault Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 5/5 |
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 0/1 | 4/4 |
| Thistle and Tally | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Rendering Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Ashen Marshal | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | FAIL: inline-form | FAIL (1) | 2/2 | 1/9 |
| Thing in the Well | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 3 of 18 user clauses** (coverage 83%); concept share 65% (40/62 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1
- swarm-9 / reader: 1
- lurker-5 / bands: 1
- defender-17-leader / reader: 1



---


### Ashen Marshal — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Marshal | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | FAIL: inline-form |

- bands · soft · aim-dpr: damage 115 a round is 28% under the table's 160
- reader · fail · inline-form: the call called "Ashen Marshal" a person and the sheet speaks it as "the ashen marshal" — a person speaks by its given name
- read: def 14 / off 18 → 16; sustained 115 (2 × Hellfire Lance + legendary Ride Down); nova none; dmg 115

```
Ashen Marshal
Medium undead, neutral evil
Armor Class

20 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

20 (+5)

	

14 (+2)

	

16 (+3)

	

20 (+5)

Skills: 

Athletics +10, Persuasion +11

Saving Throws: 

CON +11, CHA +11

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 13

Languages: 

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Cinder Shroud. A creature that touches the ashen marshal or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.
Legendary Resistance (3/Day). If the ashen marshal fails a saving throw, it can choose to succeed instead.
Aura of Authority. While within 10 feet of the ashen marshal, the ashen marshal and its allies have advantage on attack rolls and saving throws, provided the ashen marshal isn't incapacitated.
Retaliating Ember. As a bonus action, the ashen marshal targets one creature within 5 feet that hit it with an attack roll since the end of the ashen marshal's last turn, and that creature takes 10 (3d6) fire damage.
Riposte (Reaction). When a creature within 5 feet of the ashen marshal misses it with a melee attack roll, the ashen marshal makes one Hellfire Lance attack against that creature.

Actions
Multiattack: The ashen marshal makes two Hellfire Lance attacks.
Hellfire Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 10 (3d6) fire damage.
Legendary Actions

The ashen marshal can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ashen marshal regains spent legendary actions at the start of its turn.

Ride Down: The ashen marshal moves up to half its speed without provoking opportunity attacks, and it makes one Hellfire Lance attack.
Spur the Host: One ally of the ashen marshal that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Reform the Line: The ashen marshal and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Where each row came from**

- Traits/Cinder Shroud — template heated-body; library draw (seed unstamped); binds the GM's words: burn+fire
- Traits/Legendary Resistance — the chassis
- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Hellfire Lance — weapon lance
- Legendary Actions/Legendary Action Uses: 3 — the chassis
- Legendary Actions/Ride Down — the chassis
- Legendary Actions/Spur the Host — the chassis
- Legendary Actions/Reform the Line — the chassis
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a death knight"
- Bonus Actions/Retaliating Ember — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted -> defender-leader: the concept's VERB outranks the noun (key "leads a", class verb) | defender-leader: key "leads a" (class verb)
[concept] name: provided_name rejected — "a death knight who leads a cavalry of th…" is the description, not a name
[concept] resolve: archetype=defender type=Undead themes=grave/terror mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: cavalry of the damned [behavior] | burns the living [behavior] | ash-clad death knight [body]
[concept] identity: A death knight who commands a cavalry of the damned, torching the living with unholy fire. It opens by lighting the field ablaze, then leads chargers in a coordinated, relentless advance, parrying and punishing any who stand against it. Under pressure, it never flees — it simply tightens the reins and orders another wave.
[concept] lore: Once a mortal commander who sold his soul for an unbroken charge, this death knight now rides at the head of a spectral host, seeking to set the world alight one kingdom at a time.
[reskin] donor: defender-17-leader -> CR 17 (invented — no printed peer)
[reskin] name_element answered: Hellfire Lance = imagery
[reskin] name element refused: "Hellfire Lance" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] inline by rule: "the ashen marshal" — the call answered "Sir Kaelen" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a death knight" -> has (descriptive), head | "leads a cavalry of the damned" -> has (descriptive) | "burns the living" -> has (mechanical)
[reskin] signature idea (action): "The marshal calls up a spectral cavalry charge that sweeps across the battlefield, trampling and burning the living in its path. The ghostly horsemen appear in a line beside the marshal and surge forward, leaving a trail of unholy fire that clings to those they pass through. The charge fades after it has passed, but the ground where it rode remains scorched." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: push-prone, herd, ground-burst, wind-up — the key word does not mean the mechanic here
[reskin] signature miss: action — "The marshal calls up a spectral cavalry charge that sweeps across the battlefield, trampling and burning the living in its path. The ghostly horsemen appear in a line beside the marshal and surge forward, leaving a trail of unholy fire that clings to those they pass through. The charge fades after it has passed, but the ground where it rode remains scorched." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up)
[reskin] fallback respects the call: push-prone, herd left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 26.4 vs 40.6)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 12.5)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The ashen marshal is wreathed in smoldering ash and cinders that cling to anything that strikes it. When the marshal is hit by a melee attack, a cloud of burning ash bursts outward, setting the attacker alight with unholy fire." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] word match declined by the call: terrain-walk, fire-aura, bloodied-burst, adhesive — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Cinder Shroud" ("The marshal is wreathed in smoldering ash; a melee attacker is set alight with u [verb: burn:concept, fire:idea]")
[reskin] weapons answered: Hellfire Lance = lance
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] resistances derived: Fire
audit finding below confidence gate: Cinder Shroud Adjudication ambiguity: 'touches' is undefined — does grappling, shoving, or being touched by the marshal count? The trigger condition is too broad for a 10-second ruling.
[reskin] audit rename: "Answering Sting" -> "Retaliating Ember"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg's Rush 6; dmg 12

```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Perception +1, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Skirmisher. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg's Rush (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) piercing damage on a failed save. On a failed save, the target is knocked prone.
```

**Where each row came from**

- Traits/Skirmisher — the chassis
- Actions/Multiattack — the chassis
- Actions/Scimitar — weapon scimitar
- Actions/Shortbow — print's own row, renamed; weapon javelin
- Actions/Worg's Rush — the chassis
- Bonus Actions/Nimble Escape — print's own row

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: mounted charge [behavior] | worg mount [object] | goblinoid cruelty [aura]
[concept] identity: The goblin boss opens combat by charging with its worg mount, using a ride-by attack to bite and slice past the front line before wheeling around for another pass. It circles the fray, darting in to strike at isolated or bloodied foes while its mount snaps at anything within reach, and it flees on its worg the moment the fight turns against it—or if the worg falls, it desperately tries to escape on foot or surrender.
[concept] lore: A goblin boss who has tamed a worg through cruelty and scraps, it uses the beast to raid supply lines and terrorize travelers, seeking to grow its hoard and reputation among goblinkind.
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: skirmisher-3-mounted -> CR 1 (invented — no printed peer)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] inline by rule: "the boss" — the call answered "the boss" (kind), which the name does not support
[reskin] inline form: "the boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss — riding a worg" -> has (descriptive), head
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The boss singles out a foe its mount has just knocked down and screams for the worg to pin it. The worg savages the fallen creature while the boss stands over them, and nearby allies who see this are cowed into fighting harder. The pinned foe must tear free of the worg or be torn apart." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] word match declined by the call: rampage, exploiter — the key word does not mean the mechanic here
[reskin] fit declined: "Worg Pin" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: exploiter, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "Goblin Boss — riding a worg" heads on the Goblin Boss and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 3.1 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The boss is never braver than its mount. While the worg is beside it, it fights on with the beast's ferocity; the moment the worg is gone, the boss's nerve breaks and it tries only to run or yield." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The boss is never braver than its mount. While the worg is beside it, it fights on with the beast's ferocity; the moment the worg is gone, the boss's nerve breaks and it tries only to run or yield." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Scimitar = scimitar; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Worg's Rush (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" yields to the Goblin Boss's Nimble Escape
[reskin] audit rename: "Ride-By" -> "Skirmisher"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

