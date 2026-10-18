# Release table for the critic — 2014 blocks — 2026-10-17

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-17-step3.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — cues-2026-10-17T00-36-41

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Troll | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Chapel-Glass Ox | 5 | 2024 | brute-5-charger | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Bridge Warden | 4 | 2024 | defender-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Sanctified Charger | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 1/5 |
| Dune Grasper | 7 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 1/2 | 2/5 |
| Tidepool Grasper | 3 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Tallyman | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/5 |
| Oathbound Sentinel | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Marquis Corvane | 4 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Sire Vaelros | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: print-range | FAIL (1) | 0/1 | 3/5 |

**Dropped 4 of 12 user clauses** (coverage 67%); concept share 47% (22/47 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- lurker-5 / reader: 1
- skirmisher-3 / reader: 1



---


_No 2014 blocks sampled in this run._

---

## Review batch — holds-2026-10-17T00-21-12

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodvowed Hull | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Cairnroot Warden | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 3/3 |
| Silver-Veined Troll | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Still-Water Palm | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/6 |
| Bloodcursed Colossus | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Ironbillet Veteran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Slate Shadow | 5 | 2024 | skirmisher-3-skulker | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 5/6 |

**Dropped 0 of 8 user clauses** (coverage 100%); concept share 79% (31/39 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- skirmisher-3-skulker / derivation: 1



---


### Thurivald — a 2014 sheet

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

passive Perception 10

Languages: 

Common, Giant

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Captain's Charm (Bonus Action). One creature Thurivald can see within 30 feet must make a DC 14 Wisdom saving throw. On a failed save, the target is charmed until the start of Thurivald's next turn.
Bolstering Cry (2/Day) (Bonus Action). Each ally within 30 feet of Thurivald gains 10 (3d6) Temporary hit points.

Actions
Multiattack: Thurivald makes two attacks, using Spear or Throwing Spear. It can replace one attack with a use of Cunning Retort.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Throwing Spear: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Cunning Retort: One creature within 30 feet that is Charmed by Thurivald must make a DC 14 Wisdom saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Throwing Spear — weapon spear
- Actions/Cunning Retort — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"
- Bonus Actions/Bolstering Cry — template rally; bard kit; the GM's clause "Thurivald — a skald"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/voice mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: war-song that drives allies into fury [behavior] | iron-shod spear [object] | rallies and commands a warband [behavior]
[concept] identity: Thurivald opens by raising his voice in a bone-rattling war-song that quickens his allies and fills enemies with dread, then wades into melee beside his warband, striking with his iron-shod spear while the song continues. He is a leader first and a fighter second: every round he repositions allies, calls out charges, and keeps the fury burning until he is bloodied, at which point he fights to the death rather than abandon his song.
[concept] lore: Thurivald was a skald of the frozen north whose warband was ambushed and slaughtered; he alone survived, and now he sings the same fury into any who will follow him, seeking a battle glorious enough to drown the memory of his failure.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] row evicted for the cap: Traits/"Aura of Authority" (chassis filler) leaves so "Bolstering Cry" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm), Bolstering Cry (2/Day) (rally)
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no spells" quotes nothing the user typed
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald plants the butt of his spear and looses a rising war-song that swells through his allies, driving each of them to surge across the field at his command. One ally who can hear him immediately moves to a position he directs and then strikes with a weapon of its own, carried on the fury of the song. The song cannot carry an ally beyond the reach of his voice, and once it has lifted a warrio" [action/always/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, riposte, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: active-toll — the key word does not mean the mechanic here
[reskin] value check: "Rising War-Song (2/Day)" EV 7.4 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Rising War-Song (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The iron shoes of Thurivald's spear bite and drag at the wound, leaving splinters of iron-song in the flesh that keep the enemy's own fury from rising. Until the barbed iron is torn free, the wounded creature cannot benefit from any ally healing it, rousing it, or lifting its despair." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The iron shoes of Thurivald's spear bite and drag at the wound, leaving splinters of iron-song in the flesh that keep the enemy's own fury from rising. Until the barbed iron is torn free, the wounded creature cannot benefit from any ally healing it, rousing it, or lifting its despair." [trait/always/condition] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, resonant-body)
[reskin] weapons answered: Spear = spear; Throwing Spear = spear
[reskin] weapon table: "Throwing Spear" — thrown, range 20/60
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
[reskin] audit rename: "Opportunist's Lash" -> "Cunning Retort"
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
```


---


### Ironbillet Veteran — in the run

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ironbillet Veteran | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Ironbillet Veteran
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
Second Wind (2/Day). As a bonus action, the veteran regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of the veteran misses it with a melee attack roll, the veteran makes one Longsword attack against that creature.

Actions
Multiattack: The veteran makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of the veteran's next turn.
Shield Bash: One creature within 5 feet that the veteran can see must make a DC 14 Strength saving throw, taking 10 (3d6) bludgeoning damage on a failed save, and if the target is Medium or smaller, it is also knocked prone.
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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shield-bash into a longsword cut on the same beat [behavior] | scarred iron soldier [body] | round buckler and well-worn longsword [object]
[concept] identity: A veteran soldier in scarred iron, the longsword probes low while the buckler sets the rhythm—shield-check to the jaw, half-step, cut to the seam. Every round it trades a small opening for a cleaner angle, punishing reach with a bash into the same beat as the blade. It fights with a quartermaster's economy: first blood is an invitation, not a finish, and it breaks only when its knees do.
[concept] lore: Grown from the dregs of a dozen routed companies, the iron-veteran drills alone on forgotten battlefields, wanting nothing more than a line worth holding.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "the veteran" — the call's own answer (kind), built from the name
[reskin] inline form: "the veteran" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: condition]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The veteran slams the buckler into a foe's weapon the instant that foe commits to a strike, spiking the blow aside and grinding it down into the dirt. The parried creature is pulled off balance, forced a step forward and left wide open. Any ally of the veteran who saw it can then close on the stymied attacker before it recovers." [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: disarm, obstacle-pull, exploiter, patient-defense — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The veteran slams the buckler into a foe's weapon the instant that foe commits to a strike, spiking the blow aside and grinding it down into the dirt. The parried creature is pulled off balance, forced a step forward and left wide open. Any ally of the veteran who saw it can then close on the stymied attacker before it recovers." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: obstacle-pull, disarm, exploiter, patient-defense)
[reskin] fallback respects the call: disarm, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.6 vs floor 9.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The veteran's discipline holds best when standing shoulder-to-shoulder with an ally or backed into a line it will not yield. Fights are not won by one soldier but by the man on your left; as long as it holds a flank instead of fighting alone, the veteran channels that stubbornness into a refusal to give ground." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The veteran's discipline holds best when standing shoulder-to-shoulder with an ally or backed into a line it will not yield. Fights are not won by one soldier but by the man on your left; as long as it holds a flank instead of fighting alone, the veteran channels that stubbornness into a refusal to give ground." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

