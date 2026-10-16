# Release table for the critic — 2014 blocks — 2026-10-15

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-15.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — canaries-2026-10-15T22-14-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Hillmoot Crusher | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Echojack | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Unmoved | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Absent Regent | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Rolling Thunderwall | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/8 |
| Gilded Reliquary | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Swarm of Tollring Chorus | 13 | 2024 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/4 |
| Coinbound Sellsword | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Ash-Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/3 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Ashvowed Brannor | 17 (2014) | 2014 | defender-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 2/7 |
| Well-Drowned Thing | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |

**Dropped 3 of 18 user clauses** (coverage 83%); concept share 60% (38/63 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-5 / bands: 1
- defender-17 / reader: 1



---


### Ashvowed Brannor — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Brannor | 17 (2014) | defender-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 17.5
- reader · fail · name-mechanic: Legendary Actions/Damned Charge: the name promises movement the text lacks
- **dropped clause:** "leads a cavalry of the damned"
- read: def 14 / off 21 → 17.5; sustained 150 (3 × Hellfire Lance + legendary Shield Wall); nova none; dmg 150

```
Ashvowed Brannor
Medium undead, lawful neutral
Armor Class

21 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

20 (+5)

	

12 (+1)

	

16 (+3)

	

16 (+3)

Skills: 

Athletics +10, Perception +9

Saving Throws: 

STR +10, CON +11, WIS +9

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 19

Languages: 

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Brannor fails a saving throw, it can choose to succeed instead.
Riposte (Reaction). When a creature within 5 feet of Brannor misses it with a melee attack roll, Brannor makes one Hellfire Lance attack against that creature.

Actions
Multiattack: Brannor makes three Hellfire Lance attacks. It can replace one attack with a use of Opportunist's Lash.
Hellfire Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (6d6 + 4) fire damage.
Opportunist's Lash: One creature within 30 feet that is prone must make a DC 19 Strength saving throw, taking 19 (3d12) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

Brannor can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Brannor regains spent legendary actions at the start of its turn.

Shield Wall: Brannor makes one Hellfire Lance attack.
Hold the Line: Brannor takes the Dodge action. Brannor can't take this action again until the start of its next turn.
Damned Charge: One creature within 5 feet must succeed on a DC 19 Strength saving throw or be pushed up to 15 feet away from Brannor and be knocked prone.
```

**Engine trace**

```
[route] defender type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted -> defender: the concept's VERB outranks the noun (key "knight", class verb) | defender: key "knight" (class verb)
[concept] signature elements: leads a cavalry of the damned [behavior] | holds the line on a burning charger [behavior] | burns the living in its wake [aura]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "Brannor sweeps its Hellfire Lance in a wide, deliberate arc, dragging a furrow of burning ash across the ground before it. Every enemy standing in that wake is seared by the clinging fire and left smoldering, carrying the burn with them as long as the ash clings to them. It can only do this when it plants its feet and reins in the charge, so it cannot be used while moving, and the fire dies out on" [action/always/damage] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, execute (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — execute (death)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into execute
[reskin] signature miss: action — "Brannor sweeps its Hellfire Lance in a wide, deliberate arc, dragging a furrow of burning ash across the ground before it. Every enemy standing in that wake is seared by the clinging fire and left smoldering, carrying the burn with them as long as the ash clings to them. It can only do this when it plants its feet and reins in the charge, so it cannot be used while moving, and the fire dies out on" [action/always/damage] — the model found no template that holds it (offered: execute)
[reskin] value check: "Opportunist's Lash" EV 14.7 vs floor 12.5 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Wherever Brannor spurs its charger, the hooves leave a low wake of hellfire that clings to living creatures and spreads to anyone who stands beside them. The burn laps at the living each moment they remain in the wake, marking them as fuel for the charge, and snuffs out of its own accord once Brannor rides clear." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — death-burst, heated-body (death, burn)
[reskin] signature miss: trait — "Wherever Brannor spurs its charger, the hooves leave a low wake of hellfire that clings to living creatures and spreads to anyone who stands beside them. The burn laps at the living each moment they remain in the wake, marking them as fuel for the charge, and snuffs out of its own accord once Brannor rides clear." [trait/always/damage] — the model found no template that holds it (offered: death-burst, heated-body)
```


---


### Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Ride-Down 6; dmg 12

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

Skittering Retreat. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Goblin's Cruel Finish.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Ride-Down (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) bludgeoning damage on a failed save. On a failed save, the target is also prone.
Goblin's Cruel Finish: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("goblin boss") | skirmisher-skulker -> skirmisher-mounted: the concept's VERB outranks the noun (key "riding", class verb) | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: riding a worg in hit-and-run charges [behavior] | goblin-mounted-archer harasser [behavior] | crude scimitar and shortbow [object]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The boss snaps his scimitar across the face of a creature he has just knocked down or that is already lying helpless, drawing blood that sends the worg into a frenzy. The mount savages the wounded target with a free bite, which makes the boss grin wider the more hurt his victim already is." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The boss snaps his scimitar across the face of a creature he has just knocked down or that is already lying helpless, drawing blood that sends the worg into a frenzy. The mount savages the wounded target with a free bite, which makes the boss grin wider the more hurt his victim already is." [rider/on_hit/damage] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, rampage, exploiter, lure)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The goblin and his worg move as one flesh when the rider is hurt — the worg lunges at whoever struck him, and the boss scrambles up the beast's back to put it between himself and danger. He always keeps an escape route open through his mount." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "The goblin and his worg move as one flesh when the rider is hurt — the worg lunges at whoever struck him, and the boss scrambles up the beast's back to put it between himself and danger. He always keeps an escape route open through his mount." [trait/on_being_hit/movement] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Scimitar Slash" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" yields to the Goblin Boss's Nimble Escape
```


---


---

## Review batch — classes-eight-2026-10-15T22-19-18

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Palm Adept | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/6 |
| Rookery Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/7 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sarn Feldmark | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 5/5 |
| Kargath Stonewroth | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Aldous | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Veyr Sable | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathmender Marisel | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/6 |
| Kurohaba | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/7 |
| Frostmaw Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Lockpick Imp | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Maze Warden | 6 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/8 |
| Shield Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: multiattack-integrity | FAIL (1) | 1/1 | 3/4 |
| Wary Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/5 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 61% (51/83 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / reader: 1



---


### Sarn Feldmark — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn Feldmark | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "bashes with a buckler"
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sarn Feldmark
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
Second Wind (2/Day). As a bonus action, Sarn regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Sarn misses it with a melee attack roll, Sarn makes one Longsword attack against that creature.

Actions
Multiattack: Sarn makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Sarn's next turn.
Shield Bash: One creature within 5 feet that Sarn can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("bashes with a buckler") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: buckler bash that staggers and pins [behavior] | longsword counter on anyone who overcommits [object] | a hard-bitten veteran's refusal to give ground [behavior]
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] signature idea (action): "When Sarn's Shield Bash sends a creature sprawling, he immediately follows the falling body with a short, chopping cut meant to keep it down. This cut lands as the same sort of punishing stroke his longsword deals, and the creature cannot easily scramble back to its feet while he looms over it." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature miss: action — "When Sarn's Shield Bash sends a creature sprawling, he immediately follows the falling body with a short, chopping cut meant to keep it down. This cut lands as the same sort of punishing stroke his longsword deals, and the creature cannot easily scramble back to its feet while he looms over it." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, exploiter, own-turn-punisher, rally)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Sarn's longsword riposte leaves a creature hanging — for a moment, that enemy's own guard is broken by the counter. While it is so exposed, any further attack it makes against Sarn is thrown off balance." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Sarn's longsword riposte leaves a creature hanging — for a moment, that enemy's own guard is broken by the counter. While it is so exposed, any further attack it makes against Sarn is thrown off balance." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
```


---


### Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

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

Wounded Anthem. While Thurivald has half of its hit points or fewer, it has advantage on attack rolls.
Aura of Authority. While within 10 feet of Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Longsword and one with Warband Roar. It can replace one attack with a use of Opportunist's Lash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage.
Warband Roar: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) thunder damage.
Opportunist's Lash: One creature within 30 feet of Thurivald that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: the war-song that furies allies [behavior] | fighting shoulder-to-shoulder with the warband [behavior] | blood-soaked voice and blade [body]
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] signature idea (action): "Thurivald lets out a wordless battle-cry, and every ally who can hear his voice feels the old fury surge through their limbs. Until the end of the fight, those allies lash out with an extra strike whenever they attack, though the fury fades if Thurivald himself is ever silenced." [action/once_per_fight/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Thurivald lets out a wordless battle-cry, and every ally who can hear his voice feels the old fury surge through their limbs. Until the end of the fight, those allies lash out with an extra strike whenever they attack, though the fury fades if Thurivald himself is ever silenced." [action/once_per_fight/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, own-turn-punisher)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's voice and blade are soaked in the blood of the fallen. Whenever he lands a blow on an enemy that is already hurt, his song swells with their pain, and for a breath he fights harder than any mortal should." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] signature template (trait): bloodied-fury -> Traits/"Bloodied Anthem" ("Thurivald fights harder than any mortal should whenever he lands a blow on an al [verb: fury:concept, bloodied:idea, fights harder:idea]")
```


---

