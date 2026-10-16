# Review batch — canaries-2026-10-15T22-14-39

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

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

## Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Kobold

Small Dragon, Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +4

Senses darkvision 30 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

Bonus Actions

Vanish (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: once-daily invisibility [behavior] | cowardly skirmishing [behavior] | scaled hide and stolen blades [body]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Once per day, the kobold slips out of sight and becomes unseen as if it had quietly vanished, its outline blurring into the background even while it moves and attacks. The effect lasts only a short while and ends early if the kobold strikes a foe or is hit; it can skitter, aim, and reposition invisibly, then use its next attack from hiding to catch an enemy off guard. This is its one stolen scrap " [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Stolen Scrap (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Stolen Scrap (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the kobold is bloodied, its nerve breaks and it instinctively turns invisible and runs. This fleeing invisibility is an instinctive panic response, not a controlled concealment, and it lasts just long enough to slip away toward its bolt-hole." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "When the kobold is bloodied, its nerve breaks and it instinctively turns invisible and runs. This fleeing invisibility is an instinctive panic response, not a controlled concealment, and it lasts just long enough to slip away toward its bolt-hole." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Ashvowed Brannor — highest CR

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

## Goblin Boss — a 2014 sheet

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

## Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
7
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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
[route] brute type=Monstrosity mechanics=grapple — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: bone-crushing hug [behavior] | hooked beak and crushing forelimbs [body] | fused owl-bear hybrid [body]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---

## Hillmoot Crusher — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hillmoot Crusher | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Hillmoot Crusher

Large Giant, Chaotic Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+7
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+6
CHA
7
-2
-2

Skills Athletics +7, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Giant

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The crusher makes two attacks, using Club or Slam in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the crusher's next turn.

Slam. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the crusher's next turn.

Bonus Actions

Crushing Focus. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of the crusher's next turn, the target has Disadvantage on attack rolls against creatures other than the crusher.

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
[route] brute type=Giant mechanics=none — brute: ✓ ("big ogre with a club") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: massive club [object] | brutal melee brawling [behavior] | ogre toughness [body]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Crusher winds up and slams its club down with enough force to send smaller foes tumbling backward. Anyone caught in the impact is thrown away from the Crusher and lands prone." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature miss: action — "The Crusher winds up and slams its club down with enough force to send smaller foes tumbling backward. Anyone caught in the impact is thrown away from the Crusher and lands prone." [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, push-prone, wind-up)
[reskin] value check: "Binding Mark" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The Crusher's club is so massive that every swing carries a shockwave, shaking the ground and rattling anyone nearby. Foes who try to stand their ground find it hard to keep balance." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The Crusher's club is so massive that every swing carries a shockwave, shaking the ground and rattling anyone nearby. Foes who try to stand their ground find it hard to keep balance." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Rolling Thunderwall — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rolling Thunderwall | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- read: def 9 / off 21 → 15; sustained 150 (3 × Thunderclap Claw + legendary Echoing Claw); nova Thunderclap Breath 71; dmg 150

```
Rolling Thunderwall

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 187 (15d12 + 90)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
20
+5
+5

Skills Perception +7, Stealth +6

Immunities Thunder

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Stormlash Scales. A creature that touches the thunderwall or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage.

Legendary Resistance (3/Day). If the thunderwall fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The thunderwall makes three Thunderclap Claw attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Thunderclap Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunderclap Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The thunderwall casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Counterspell

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the thunderwall can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Echoing Claw. The thunderwall makes one Thunderclap Claw attack.

Wing Buffet. The thunderwall moves up to half its Speed without provoking Opportunity Attacks.

Clap Dive. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon") | dragon: key "dragon" (class body)
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-scaled hide crackling with lightning [body] | arrogant tempest-born temperament [aura]
[reskin] signature idea (action): "The thunderwall sweeps a claw through the air and hurls a crackling lance of lightning at a creature it can see, though the bolt must first pass through any thunder-wall the dragon has left on the field; a target standing inside a wall takes the bolt full in the chest, while one using the wall as cover is merely grazed. The lightning forks and leaps to another nearby creature standing in the same " [action/always/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Thunder and lightning cling to the thunderwall's scales; whenever a creature lands a telling blow against the dragon in melee, the charge lashes back in a crackling arc, shocking the attacker and leaving them momentarily unable to hear anything but the dragon's roaring storm. A creature already deafened by the storm is not shocked a second time." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature template (trait): heated-body -> Traits/"Stormlash Scales" ("A creature that lands a melee hit on the thunderwall is shocked by the charge cl [verb: storm:concept, lightning:idea, shock:idea]")
[reskin] chassis nova: "Rolling Thunder-Wall Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Gilded Reliquary — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Reliquary | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Reliquary

Medium Ooze, Unaligned

AC 11
Initiative -2 (8)

HP 165 (22d8 + 66)

Speed 10 ft., Climb 10 ft.

MOD
SAVE
STR
18
+4
+4
INT
1
-5
-5
MOD
SAVE
DEX
6
-2
-2
WIS
6
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
2
-4
-4

Resistances Acid, Cold, Fire

Immunities Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 60 ft. (blind beyond this radius), tremorsense 60 ft.; Passive Perception 8

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Aberrant Ground. The ground in a 10-foot Emanation originating from the reliquary is Difficult Terrain.

Amorphous. The reliquary can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the reliquary or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The reliquary can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The reliquary makes two Pseudopod attacks.

Pseudopod. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.

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
[route] ooze type=Ooze mechanics=none — ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] signature elements: digests reliquaries [behavior] | gilded acid drip [body] | cathedral-vault ambusher [behavior]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The reliquary drags a corpse, a fallen foe, or a heap of cathedral treasure partway into its own translucent body, then squeezes and churns until the swallowed relic or remains burst, spraying everyone nearby with a fan of gilded acid. The payload can be a sacred object it has already absorbed, meaning the ooze always carries one last gulp of dissolved reliquary to weaponize." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] signature miss: action — "The reliquary drags a corpse, a fallen foe, or a heap of cathedral treasure partway into its own translucent body, then squeezes and churns until the swallowed relic or remains burst, spraying everyone nearby with a fan of gilded acid. The payload can be a sacred object it has already absorbed, meaning the ooze always carries one last gulp of dissolved reliquary to weaponize." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, charge, thrown-burst, ground-burst)
[reskin] signature idea (trait): "Anything the reliquary has dissolved leaves its mark: wounds it opens, and the armor or hide it scrapes with each pseudopod, start gleaming with a thin gold crust that thickens the longer the fight runs. That gold stays on the victim and clings to whatever it touches, so the ooze's gilded acid follows its prey and keeps rediscovering it." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature bound by force: trait — "aberrant-ground" matches ooze in the user's words; the model's none is overruled
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon alignment: Neutral -> Unaligned — the Gray Ooze's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Gilded Pseudopod" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Ash-Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ash-Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Hooked Claw); nova none; dmg 38

```
Ash-Stalker

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
12
+1
+1
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
13
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +9

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Poison damage.

Actions

Multiattack. The stalker makes two Hooked Claw attacks.

Hooked Claw. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Poison damage. If no creature other than the stalker is within 5 feet of the target, the target takes an extra 9 (2d8) Poison damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the stalker takes the Hide action.

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
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: hunts by scent, not sight [behavior] | opening pounce from invisibility [behavior] | chitin and venom [body]
[reskin] signature idea (action): "When the stalker strikes a wounded creature, it uses its hooked claws to pin the creature against the ground, locking it in place. The pinned prey cannot escape while the stalker holds it, but the stalker cannot attack anything else until the hold is broken." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus, isolation
[reskin] signature rider: isolation -> Hooked Claw (appended; the hunter's mechanic is the lone target — prey that stands apart from its pack  [verb: alone:concept])
[reskin] signature idea (trait): "The stalker's scent-glands constantly leak a numbing musk that deadens the senses of nearby creatures. Any living creature that starts its turn close to the stalker finds its reactions slowed and its movements clumsy." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The stalker's scent-glands constantly leak a numbing musk that deadens the senses of nearby creatures. Any living creature that starts its turn close to the stalker finds its reactions slowed and its movements clumsy." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Echojack — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Echojack | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Echojack

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

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

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. Echojack can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Unseen Step. Echojack ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Echojack makes two attacks, using Dagger or Throwing Dagger in any combination. It can replace one attack with a use of Luring Presence.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Throwing Dagger. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Luring Presence. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear Echojack. Failure: The target has the Charmed condition until the start of Echojack's next turn, and while Charmed this way, it must move toward Echojack by the safest available route on its turn.

Bonus Actions

Cunning Action. Echojack takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief who speaks only in stolen ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: stolen voices recycled as lures [behavior] | thief's blade and thrown knives [object] | kenku body of blood and feather [body]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "Echojack throws its voice into a perfect imitation of a dying companion, a panicked warning, or a command from a trusted leader, choosing one enemy who can hear it. That enemy is compelled to spin toward the sound and lunge a few steps after it, dropping its guard and giving Echojack or its allies a free opening. The trick only works once per foe, and the same voice can never be used on the same t" [action/save/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "Echojack throws its voice into a perfect imitation of a dying companion, a panicked warning, or a command from a trusted leader, choosing one enemy who can hear it. That enemy is compelled to spin toward the sound and lunge a few steps after it, dropping its guard and giving Echojack or its allies a free opening. The trick only works once per foe, and the same voice can never be used on the same t" [action/save/condition] — the model found no template that holds it (offered: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, feint-slip, riposte)
[reskin] value check: "Luring Presence" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The first time Echojack is badly wounded, its stolen voices spill out in a chorus of borrowed screams and death rattles. Every enemy nearby that can hear it hesitates, mistaking the cry for one of their own, and Echojack slips away into the nearest crowd before anyone can react." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The first time Echojack is badly wounded, its stolen voices spill out in a chorus of borrowed screams and death rattles. Every enemy nearby that can hear it hesitates, mistaking the cry for one of their own, and Echojack slips away into the nearest crowd before anyone can react." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, uncanny-sense, death-burst)
[reskin] species kit: Auran — the kenku's own
```


---

## Unmoved — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmoved | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Unmoved

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

Multiattack. Unmoved makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Unmoved's next turn.

Spellcasting. Unmoved casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Unmoved casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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
[concept] signature elements: iron-shod mace and tower shield [object] | holds the line, punishes anyone who moves past [behavior] | faith shattered, swings anyway [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "Instead of attacking, the Templar plants his feet, sets his tower shield across his body, and dares the field to move past him. Until he breaks his stance, he watches a stretch of ground before him like a gate he has sworn to hold: anyone who tries to cross that line without first beating his guard gets a mace head slammed into them as they come, and anyone already inside it finds every step punis" [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "Instead of attacking, the Templar plants his feet, sets his tower shield across his body, and dares the field to move past him. Until he breaks his stance, he watches a stretch of ground before him like a gate he has sworn to hold: anyone who tries to cross that line without first beating his guard gets a mace head slammed into them as they come, and anyone already inside it finds every step punis" [action/always/movement] — the model found no template that holds it (offered: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, aggro-curse, own-turn-punisher, rally)
[reskin] value check: "Disarming Twist" EV 0 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The Templar's iron-shod mace and tower shield are one weapon and one wall, so a strike that dents a shield leaves the arm behind it numb and heavy. Whenever he lands a telling blow, the weight of that blow lingers in the target's guard, making the next thing they try to do with that arm come slower and weaker." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The Templar's iron-shod mace and tower shield are one weapon and one wall, so a strike that dents a shield leaves the arm behind it numb and heavy. Whenever he lands a telling blow, the weight of that blow lingers in the target's guard, making the next thing they try to do with that arm come slower and weaker." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Absent Regent — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Absent Regent | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Scepter Strike); nova none; dmg 36

```
Absent Regent

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

Traits

Evasion. If the regent is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the regent instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The regent makes three Scepter Strike attacks.

Scepter Strike. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The regent casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The regent casts Misty Step, using the same spellcasting ability as Spellcasting.

Evasive Step (2/Day). The regent teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The regent is hit by an attack roll. Response: The regent casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[concept] signature elements: never where the blow lands [behavior] | steps away through folded space [behavior] | courtly bearing and wizardly mind [body]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The regent marks one enemy it can see, and for a short while that enemy becomes the only thing it cares about—whenever the marked foe tries to move away or attack anyone else, the regent blinks through folded space to appear right beside it and punishes the lapse with a strike that leaves the target doubting its own position. This mark ends when the regent marks someone new or when the marked crea" [rider/on_hit/movement] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Evasive Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Evasive Step (2/Day)" ("the regent is never where you struck and steps away — teleporting on a bonus act [verb: step:concept, blink:idea]")
[reskin] signature idea (trait): "The regent's courtly mind turns every miss into a lesson in geometry: each time an attacker fails to hit it, the regent learns the arc of that failure and the next strike it makes against that same attacker cannot be avoided by anything short of a perfect dodge, because it has already been where the attack will be." [trait/always/condition] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "The regent's courtly mind turns every miss into a lesson in geometry: each time an attacker fails to hit it, the regent learns the arc of that failure and the next strike it makes against that same attacker cannot be avoided by anything short of a perfect dodge, because it has already been where the attack will be." [trait/always/condition] — the model found no template that holds it (offered: evasion)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Swarm of Tollring Chorus — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Tollring Chorus | 13 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | ok |

- structure · soft · swarm-multiattack: a swarm with a Multiattack (print swarms make one attack)
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (2 × Clapper); nova Tollring Knell 45; dmg 90

```
Swarm of Tollring Chorus

Medium Swarm of Tiny Constructs, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Resonant Body. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Clapper attacks.

Clapper. Melee Attack Roll: +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 14 (4d6) Bludgeoning damage if the swarm is Bloodied.

Tollring Knell (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] signature elements: ringing over the dying [behavior] | swarm of animated funeral bells [body] | deafening death knell [aura]
[reskin] signature idea (action): "The swarm rings a single, shattering knell meant for the dying. Every living creature near it—friend or foe alike—is overwhelmed by the deafening toll, left reeling and unable to hear anything but the bell for a time. It can share the burden: the ringing is loudest for those already wounded, so the closer a creature is to death, the more it hurts and the longer the silence lasts." [action/save/condition] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Tollring Knell (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Tollring Knell (Recharge 5-6)" ("The swarm rings a shattering knell at the dying; the ability's verb is ring/toll [verb: ring:concept, bell:concept, toll:idea, deafen:idea, knell:idea]")
[reskin] signature idea (trait): "Whenever a creature dies within earshot of the swarm, the bells seize the moment of passage and answer with a hungry echo, their ringing growing stronger and more relentless for a short while. Each death it witnesses empowers the swarm, so a battlefield of the fallen makes it deadlier still." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] signature miss: trait — "Whenever a creature dies within earshot of the swarm, the bells seize the moment of passage and answer with a hungry echo, their ringing growing stronger and more relentless for a short while. Each death it witnesses empowers the swarm, so a battlefield of the fallen makes it deadlier still." [trait/always/damage] — the model found no template that holds it (offered: bloodied-burst)
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: bell:concept]")
```


---

## Coinbound Sellsword — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coinbound Sellsword | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hurlaxe Burst 28; dmg 47

```
Coinbound Sellsword

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. Sellsword makes two attacks, using Shortsword or Hurlaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and Sellsword has Advantage on its next attack roll against the target before the end of its next turn.

Hurlaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Hurlaxe Burst (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling a handaxe [behavior] | closing with a shortsword [behavior] | handaxe [object]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "When the sellsword hurls a handaxe at a foe, the throw can also pin the target's gear or clothing to a nearby surface, immediately anchoring them in place until they wrench free. If no such surface is within a stride, the axe's flight instead skips low across the ground and rebounds back to the sellsword's hand, ready for the next exchange." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into thrown-burst-seed
[reskin] value check: "Hurlaxe Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] signature template: thrown-burst-seed -> Actions/"Hurlaxe Burst (Recharge 5-6)" ("the sellsword hurls a handaxe; that thrown attack bursts into slashing damage in [verb: hurl:concept, throw:idea]")
[reskin] signature idea (trait): "A thrower's rhythm guides the sellsword's arm: after landing a thrown handaxe, the next shortsword strike against that same foe comes faster and harder, as if the axe's arc carried the blade behind it. This edge fades if the sellsword turns its attention elsewhere." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "A thrower's rhythm guides the sellsword's arm: after landing a thrown handaxe, the next shortsword strike against that same foe comes faster and harder, as if the axe's arc carried the blade behind it. This edge fades if the sellsword turns its attention elsewhere." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Hurlaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Loose Stride" is the seat's, not the Warrior Veteran's
```


---

## Well-Drowned Thing — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well-Drowned Thing | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Maw); nova none; dmg 38

```
Well-Drowned Thing

Medium Aberration, Neutral

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Swim 10 ft.

MOD
SAVE
STR
16
+3
+6
INT
7
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Caustic Sheen. A creature that touches the drowned thing or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Acid damage.

Actions

Multiattack. The drowned thing makes two Maw attacks. It can replace one attack with a use of Brackish Drain.

Maw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the drowned thing), reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Brackish Drain. Constitution Saving Throw: DC 14, one creature within 30 feet. Failure: 18 (4d8) Acid damage, and the drowned thing regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

False Form. The drowned thing shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Aberration mechanics=grapple — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: lurking at the bottom of a well [body] | explosive vertical lunge from the water [behavior] | dragging prey down into the flooded dark [behavior]
[reskin] signature idea (action): "The well-drowned thing vomits a choking gout of black, briny brine mixed with its own bile up and outward at everything clustered near the rim or gathered around it. The slick fluid clings and burns flesh and corrodes metal, leaving the ground beneath its well treacherous, and the creature fights best when prey is caught in that spreading, acidic mire." [action/always/damage] — menu: swallow, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: leap, delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The creature's body sweats a sheen of the same caustic well-water, so that anything that bites it, grapples it, or presses close against its hide is scalded by the residue and left slick and weakened in the same moment. The wet dark at the bottom of its shaft is its element, and the fluid always clings to attackers as readily as it clings to the thing itself." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Caustic Sheen" ("Anything that bites it, grapples it, or presses close against its hide is scalde [verb: scald:idea]")
```
