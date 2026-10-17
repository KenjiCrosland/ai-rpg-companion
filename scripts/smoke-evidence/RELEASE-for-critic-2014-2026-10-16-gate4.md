# Release table for the critic — 2014 blocks — 2026-10-16

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-16-gate4.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — classes-eight-2026-10-16T22-10-02

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Steam-Marsh Stillness | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Vesper of the Gables | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Kaelen the Shield-Wall | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Volkra Emberwrought | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vigil of the Shrine Door | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Quillen Ashvale | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Sera Vaelin | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Umbral Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/6 |
| Winter-Pack Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Keyhole Shade | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Labyrinth Warden | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Last Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Mira the Cutpurse | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |

**Dropped 3 of 19 user clauses** (coverage 84%); concept share 72% (57/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Kaelen the Shield-Wall — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kaelen the Shield-Wall | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Kaelen the Shield-Wall
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

passive Perception 13

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, Kaelen regains 19 (3d12) hit points.
Stalwart Presence (Bonus Action). One creature within 30 feet must succeed on a DC 14 Wisdom saving throw or have disadvantage on the next attack roll it makes before the start of Kaelen's next turn.
Riposte (Reaction). When a creature within 5 feet of Kaelen misses it with a melee attack roll, Kaelen makes one Longsword attack against that creature.

Actions
Multiattack: Kaelen makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Kaelen's next turn.
Shield Bash: One creature within 5 feet that Kaelen can see must make a DC 14 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save. On a failed save, if the target is Medium or smaller, it is also knocked prone.
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Stalwart Presence — library seed unnerve

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash [object] | longsword thrust [object] | holds the line [behavior]
[concept] identity: A veteran soldier opens with a measured longsword thrust, then uses his buckler to bash and shove, controlling the space around him. Every round he presses with shield feints and ripostes, punishing any who try to move past him. Under pressure he is relentless, never fleeing, and only yields when his body gives out.
[concept] lore: A veteran of a hundred border skirmishes, he now serves as an unyielding guard for a cause or commander he believes in, holding chokepoints against all comers.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Kaelen" — the call's own answer (person), built from the name
[reskin] inline form: "Kaelen" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Kaelen drives his blade forward in a measured thrust that pins his foe's attention and footing to him alone: the struck enemy cannot break away or slip past to reach anyone behind Kaelen, and any ally Kaelen is guarding can step through that opening without drawing the enemy's eye. The pin lasts only until Kaelen's next turn, but in that moment the line holds because the enemy has no choice but to" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Kaelen drives his blade forward in a measured thrust that pins his foe's attention and footing to him alone: the struck enemy cannot break away or slip past to reach anyone behind Kaelen, and any ally Kaelen is guarding can step through that opening without drawing the enemy's eye. The pin lasts only until Kaelen's next turn, but in that moment the line holds because the enemy has no choice but to" [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, obstacle-pull, herd)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Unnerving Croon" EV 5.7 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: unnerve -> Bonus Actions/"Unnerving Croon" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Kaelen never yields ground while he still stands — so long as he has breath in him, enemies who try to move through the space he guards are stopped short as though they had walked into the flat of his buckler, though a foe who downs him can pass freely over him." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Kaelen never yields ground while he still stands — so long as he has breath in him, enemies who try to move through the space he guards are stopped short as though they had walked into the flat of his buckler, though a foe who downs him can pass freely over him." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] audit rename: "Unnerving Croon" -> "Stalwart Presence"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "sings his warband into a fury"
- read: def 4 / off 6 → 5; sustained 42 (2 × Handaxe); nova none; dmg 42

```
Thurivald
Medium humanoid, chaotic neutral
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

passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.
Fury-Song Bellow (2/Day). As a bonus action, each ally within 30 feet of Thurivald gains 10 (3d6) temporary hit points.

Actions
Multiattack: Thurivald makes two Handaxe attacks.
Handaxe: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Handaxe — weapon handaxe
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"
- Bonus Actions/Fury-Song Bellow — template rally; library draw (seed unstamped); binds the GM's words: bellows

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the fury-song that drives allies into a killing rage [behavior] | iron-reinforced shield and axe wielded beside his warband [object] | an unbreakable chant that only grows louder when he is bloodied [aura]
[concept] identity: Thurivald opens by plantin' his shield and soundin' the first verse of the fury-song, a thunderous skald-cry that sets every ally's blood to boilin' — from there he fights shoulder to shoulder, parryin' blows meant for his warband while keepin' the chant alive, his own axe workin' in time with the rhythm. He never breaks; when bloodied he only sings louder, and if his warband falls he fights on alone in a grimmest verse, because the song is the last thing he has left to give.
[concept] lore: Thurivald was the last skald of a burned hall, and he wanders the raidin' roads singin' old war-verses into any warband that will have him, hopin' one song is loud enough to drown out the silence of the home he failed to save.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald bellows the opening verse of the fury-song, and every ally who can hear him is driven into a killing rage until he stops singing. While the song lasts, allies fight more fiercely and recklessly, but Thurivald must keep his voice up, and the rage ends early if he is silenced or loses the breath to sing." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: terror-pulse — the key word does not mean the mechanic here
[reskin] value check: "Fury-Song Bellow (2/Day)" EV 5.5 vs floor 3.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Fury-Song Bellow (2/Day)" ("The idea is that Thurivald bellows the fury-song and every ally who can hear him [verb: bellows:idea]")
[reskin] signature idea (trait): "Thurivald never fights alone in spirit: whenever an ally within his reach is hit by an attack, he can throw his shield into the blow's path, taking the strike on his own shield-arm instead. Doing so costs him his footing and his own guard for a moment, leaving him exposed until he can recover." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, aberrant-ground — the key word does not mean the mechanic here
[reskin] trait declined: "Shield-Split Chorus" — bound only on the idea's own words (guard:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Handaxe = handaxe; Throwing Axe = handaxe
[reskin] weapon table: "Throwing Axe" — thrown, range 20/60
[reskin] languages by mind: "Common, Skaldic" -> "Common" (sapient)
[reskin] row narrowed: "Throwing Axe" is a melee weapon by name — the hybrid range leaves
[reskin] narrowed row removed as a twin: "Throwing Axe" became identical to "Handaxe" once its range left — one mechanic, one row
[reskin] multiattack re-read — "Throwing Axe" left; "Multiattack" now reads "Thurivald makes two Handaxe attacks."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

