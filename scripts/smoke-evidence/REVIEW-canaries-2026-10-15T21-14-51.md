# Review batch — canaries-2026-10-15T21-14-51

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Sheepthief | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Rookery Mimic | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Iron Vigil | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Chancellor Unplaced | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thrumvane Stormwyrm | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 2/7 |
| Tithevault Sump | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 3/4 |
| Grave Toll | 13 | 2024 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | FAIL: inline-correctness | FAIL (1) | 0/1 | 4/4 |
| Marshal Vorgan | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Scentmarrow Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (2) | 1/1 | 0/4 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/6 |
| Pyre Knight Bel'Vorak | 17 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/8 |
| Drowned Well Child | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |

**Dropped 4 of 18 user clauses** (coverage 78%); concept share 58% (35/60 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- swarm-9 / reader: 1
- lurker-5 / bands: 1
- lurker-5 / reader: 1



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

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

Bonus Actions

Hoarder's Escape (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: turn invisible once per day [behavior] | skirmishing ambusher from tunnels [behavior] | small reptilian body [body]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Once per day, when the kobold is hurt or cornered, it turns invisible until it attacks or casts a spell. While invisible it can slip away unseen and reposition, making it seem to vanish into thin air as a survival trick." [bonus_action/once_per_fight/condition] — menu: patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Vanishing Skitter (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanishing Skitter (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kobold's small reptilian body lets it squeeze through gaps and tunnels that larger creatures cannot, and it can hide easily in cramped spaces." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, earth-glide, tunneler, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "The kobold's small reptilian body lets it squeeze through gaps and tunnels that larger creatures cannot, and it can hide easily in cramped spaces." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, earth-glide, tunneler, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon modes: burrow off — the Kobold Warrior has no such mode and the words name none
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon attack: "Bite" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Pyre Knight Bel'Vorak — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Pyre Knight Bel'Vorak | 17 (2014) | defender-17 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "burns the living"
- read: def 14 / off 20 → 17; sustained 138 (3 × Lance + legendary Reaping Lance Cut); nova Edict of Ash 24; dmg 138

```
Pyre Knight Bel'Vorak
Medium undead, neutral evil
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

darkvision 120 ft., passive Perception 19

Languages: 

understands Common and Infernal but can't speak

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Bel'Vorak fails a saving throw, it can choose to succeed instead.
Guard Aura. Each ally within 10 feet of Bel'Vorak has advantage on saving throws, provided Bel'Vorak is not incapacitated.
Riposte (Reaction). When a creature within 5 feet of Bel'Vorak misses it with a melee attack roll, Bel'Vorak makes one Lance attack against that creature.

Actions
Multiattack: Bel'Vorak makes three Lance attacks.
Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 10 (3d6) fire damage.
Edict of Ash (Recharge 5-6): One creature Bel'Vorak can see within 90 feet must make a DC 19 Constitution saving throw. If the target has 75 hit points or fewer, it drops to 0 hit points. Otherwise, it takes 24 (7d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

Bel'Vorak can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Bel'Vorak regains spent legendary actions at the start of its turn.

Reaping Lance Cut: Bel'Vorak makes one Lance attack.
Shield Wall: Bel'Vorak takes the Dodge action. Bel'Vorak can't take this action again until the start of its next turn.
Run Down: One creature within 5 feet must succeed on a DC 19 Strength saving throw or be pushed up to 15 feet away from Bel'Vorak and be knocked prone.
```

**Engine trace**

```
[route] defender type=Undead mechanics=aura — defender-leader: a Undead commands no troops | skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted -> defender: the concept's VERB outranks the noun (key "knight", class verb) | defender: key "knight" (class verb)
[concept] signature elements: cavalry of the damned [behavior] | burning aura and hellfire [aura] | ash-encrusted plate and burning steed [object]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "Bel'Vorak sweeps his lance low in a wide burning arc, and every foe caught in the cut is hurled off their feet and set alight. Those who fall from this attack smolder where they land, their burning forms tainting the ground so that anyone who steps over them is seared by clinging fire. He can call up this arc only once every few breaths, not with every swing." [action/save/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, execute (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — execute (death)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into execute
[reskin] value check: "Edict of Ash (1/Day)" EV 31.8 vs floor 60.8 (the whole Multiattack (3 attacks)) — added Success: Half; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Edict of Ash" moves to one attack of the Multiattack — EV 31.8 vs floor 12.5 there; the GM's verb keeps its row
[reskin] signature template: execute -> Actions/"Edict of Ash (Recharge 5-6)" ("the concept's central verb is death — the Pyre Knight executes and burns the liv [verb: death:concept]")
[reskin] signature idea (trait): "Ash and embers pour endlessly from Bel'Vorak's plate and his steed's burning hide, pooling into a churning trail of cinders wherever he rides. Any enemy he has knocked down who remains in that smoldering wake finds the fire climbing their legs, taking more damage each moment they stay inside it." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (burn)
[reskin] signature miss: trait — "Ash and embers pour endlessly from Bel'Vorak's plate and his steed's burning hide, pooling into a churning trail of cinders wherever he rides. Any enemy he has knocked down who remains in that smoldering wake finds the fire climbing their legs, taking more damage each moment they stay inside it." [trait/always/damage] — the model found no template that holds it (offered: heated-body)
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Scimitar: reach 10 on a Small body with no tether word
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg Charge 6; dmg 12

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

Ride-By. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of prone Pummel.
Scimitar: Melee Weapon Attack: +4 to hit, reach 10 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg Charge (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) piercing damage on a failed save and being prone.
Prone Pummel: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: worg-mounted skirmishing [behavior] | goblin pack leadership [behavior] | cruel hooked blade [object]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The boss snarls orders that only a goblin can obey, letting one ally within earshot that can see it strike again right now. That ally's extra strike doesn't count against its own limit of attacks for the turn." [action/always/movement] — menu: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The boss snarls orders that only a goblin can obey, letting one ally within earshot that can see it strike again right now. That ally's extra strike doesn't count against its own limit of attacks for the turn." [action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The barbs on the boss's lance stay buried until the boss twists them free, and the victim bleeds until then. The wound keeps hurting on its own until someone pulls the lance out, and pulling it out hurts even more." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The barbs on the boss's lance stay buried until the boss twists them free, and the victim bleeds until then. The wound keeps hurting on its own until someone pulls the lance out, and pulling it out hurts even more." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] chassis nova: "Worg Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Barbed Lance" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
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
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: bear-owl hybrid body [body] | relentless claw and beak assault [behavior] | enraged fighting to the death [behavior]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---

## Sheepthief — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sheepthief | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Sheepthief

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

Multiattack. The sheepthief makes two attacks, using Club or Slam in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the sheepthief's next turn.

Slam. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the sheepthief's next turn.

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
[concept] signature elements: a club swung with hill-shaking force [object] | thick hide that turns aside blades [body] | kicking and shoving smaller prey around [behavior]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "It stamps a foot and drives a shoulder or boot into a smaller creature, sending it tumbling across the ground away from the sheepthief. The victim lands sprawled and off-balance, easy pickings for the club on the next swing." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Dazzling Burst" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "A club blow from the sheepthief lands with such hill-shaking force that the ground jumps and anything near the impact staggers as the shock rolls out from the strike. The brute barely notices, already winding up for the next swing." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Thrumvane Stormwyrm — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thrumvane Stormwyrm | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Claw + legendary Thunderclap Snatch); nova Rolling Thunder 71; dmg 150

```
Thrumvane Stormwyrm

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

Senses darkvision 120 ft., blindsight 60 ft.; Passive Perception 17

Languages Draconic, Auran

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If Thrumvane fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Thrumvane makes three Claw attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Rolling Thunder (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. Thrumvane casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Command, Fear, Suggestion, Dispel Magic

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Thrumvane can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Thunderclap Snatch. Thrumvane makes one Claw attack.

Stormdive Retreat. Thrumvane moves up to half its Speed without provoking Opportunity Attacks.

Sky-Shaking Roar. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: breath weapon is a rolling wall of thunder [behavior] | storm-born body crackling with lightning [body] | aerial mastery and devastating dives [behavior]
[reskin] signature idea (action): "Thrumvane folds its wings and dives, riding the thunder of its own flight. Airborne creatures it passes beneath are slammed downward, and those who fall hard are left pressed to the ground, easy prey for the dragon's claws. The dive ends with the dragon climbing back into the storm." [action/always/movement] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "Thrumvane folds its wings and dives, riding the thunder of its own flight. Airborne creatures it passes beneath are slammed downward, and those who fall hard are left pressed to the ground, easy prey for the dragon's claws. The dive ends with the dragon climbing back into the storm." [action/always/movement] — the model found no template that holds it (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure)
[reskin] signature idea (trait): "The storm dragon's hide crackles with living lightning. Whenever it takes to the air, arcs of electricity lash out at nearby creatures, punishing those who crowd it. The charge is strongest when it is wounded and fighting desperately." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature miss: trait — "The storm dragon's hide crackles with living lightning. Whenever it takes to the air, arcs of electricity lash out at nearby creatures, punishing those who crowd it. The charge is strongest when it is wounded and fighting desperately." [trait/always/damage] — the model found no template that holds it (offered: heated-body)
[reskin] chassis nova: "Rolling Thunder (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Tithevault Sump — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tithevault Sump | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Tithevault Sump

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 8

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Amorphous. The sump can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the sump or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The sump can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The sump makes two Pseudopod attacks.

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
[route] ooze type=Ooze mechanics=grapple — ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] signature elements: digests reliquaries [behavior] | drips gilded acid [behavior] | amorphous tar body [body]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The sump retches up the half-digested gilding of everything it has ever eaten, spraying a cone of molten gold flecks and black acid that clings and hardens. Those caught are sealed in a shell of brittle gilt that anchors them in place while the acid keeps chewing inward, and the sump then lumbers toward the trapped prize. It can only do this after it has recently absorbed a sacred object." [action/once_per_fight/condition] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The sump retches up the half-digested gilding of everything it has ever eaten, spraying a cone of molten gold flecks and black acid that clings and hardens. Those caught are sealed in a shell of brittle gilt that anchors them in place while the acid keeps chewing inward, and the sump then lumbers toward the trapped prize. It can only do this after it has recently absorbed a sacred object." [action/once_per_fight/condition] — the model found no template that holds it (offered: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew)
[reskin] signature idea (trait): "Consecrated relics dissolve differently inside it, curdling its substance so its outermost layer hardens into a gold-crusted shell that shrugs off harm until the relic is consumed. Once the sacred object is gone the shell sloughs away and the sump is left softer and more raw for a time, eager for the next tithe." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature miss: trait — "Consecrated relics dissolve differently inside it, curdling its substance so its outermost layer hardens into a gold-crusted shell that shrugs off harm until the relic is consumed. Once the sacred object is gone the shell sloughs away and the sump is left softer and more raw for a time, eager for the next tithe." [trait/always/defense] — the model found no template that holds it (offered: aberrant-ground)
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon rows: Gilded Acid Drip leave — the Gray Ooze has one melee row (Pseudopod), and Multiattack reads print's
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Scentmarrow Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scentmarrow Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- reader · fail · alignment-fit: Unaligned on a Monstrosity with INT 12 that speaks None — Unaligned is for a creature with no capacity for ethics
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

```
Scentmarrow Stalker

Medium Monstrosity, Unaligned

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft., Burrow 30 ft.

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

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Actions

Multiattack. The stalker makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the stalker takes the Hide action.

Predatory Focus (2/Day). The stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("an eyeless hunter that tracks prey by sc") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: scent-based tracking [behavior] | eyeless chitinous body [body] | ambush from hiding [behavior]
[reskin] signature idea (action): "The stalker exhales a fine cloud of scent-marked spores onto a creature it can smell, tagging that prey so the stalker always knows exactly where it is and can track it unerringly for the rest of the hunt, even through invisibility, darkness, or magical disguises, until the tag is washed away or the stalker dies. It picks the tag's target the same way it would pick a bite's target." [action/always/condition] — menu: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, burrow-ambush, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus, isolation
[reskin] signature miss: action — "The stalker exhales a fine cloud of scent-marked spores onto a creature it can smell, tagging that prey so the stalker always knows exactly where it is and can track it unerringly for the rest of the hunt, even through invisibility, darkness, or magical disguises, until the tag is washed away or the stalker dies. It picks the tag's target the same way it would pick a bite's target." [action/always/condition] — the model found no template that holds it (offered: focus, isolation)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The stalker has no eyes at all, so nothing about how it looks, moves, or disguises itself can fool it — its whole body reads the world through scent and vibration, letting it pinpoint any breathing or bleeding creature nearby regardless of sight." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, earth-glide, tunneler, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The stalker has no eyes at all, so nothing about how it looks, moves, or disguises itself can fool it — its whole body reads the world through scent and vibration, letting it pinpoint any breathing or bleeding creature nearby regardless of sight." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Rookery Mimic — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rookery Mimic | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Shortsword); nova none; dmg 24

```
Rookery Mimic

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

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. The rookery mimic can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Rooftop Grace. The rookery mimic ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The rookery mimic makes two attacks, using Shortsword or Thrown Knife in any combination. It can replace one attack with a use of Voice Lure.

Shortsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Thrown Knife. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Voice Lure. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the mimic's mimicry. Failure: The target has the Charmed condition until the start of the rookery mimic's next turn, and while Charmed this way, it must move toward the rookery mimic by the safest available route on its turn.

Bonus Actions

Cunning Action. The rookery mimic takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: mimicry of stolen voices used as a lure and weapon [behavior] | rooftop and alley skulking [behavior] | a shadow-stuffed body with no voice of its own [body]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "It sounds a perfect stolen voice from a shadow it cannot be seen in—a friend's shout, a child's cry, a dying gasp—and the voice lands on one creature that can hear it. If that creature falls for it, it is pulled toward the noise until a blade is already in reach, or it freezes just long enough for the mimic to slip away. The voice is a lure first, a weapon second, and its real cost is paid when th" [action/save/movement] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Stolen Voice Lure" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Stolen Voice Lure" ("the voice lands on one creature that can hear it, and if that creature falls for [verb: lure:idea]")
[reskin] signature idea (trait): "Its throat holds a chorus of taken voices, so silence never stays silent around it. When it is harmed, cornered, or frightened, those voices spill out in a shriek of overlapping screams and commands that rattles the nerves of anyone close enough to hear—and makes it harder to tell where the mimic really is." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] species kit: Auran — the kenku's own
```


---

## Iron Vigil — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Vigil | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Iron Vigil

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

Multiattack. The vigil makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vigil's next turn.

Bonus Actions

Vigil's Rebuke. One creature within 5 feet that hit the vigil with an attack roll since the end of the vigil's last turn takes 7 (2d6) Bludgeoning damage.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("templar priest with a mace and no magic ") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: mace and shield defense [object] | unyielding final stand [behavior] | iron-clad faith [body]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "The vigil plants its feet, raises its mace like a hammer over an anvil, and intones the final prayer of its order. Until it dies, it simply cannot be forced from where it stands: attempts to shove, drag, or hurl it back fail, and any enemy who tries to slip past or push through suffers a brutal mace blow for the presumption. The vigil never flees or yields, and it cannot be made to move from that " [action/once_per_fight/defense] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "The vigil plants its feet, raises its mace like a hammer over an anvil, and intones the final prayer of its order. Until it dies, it simply cannot be forced from where it stands: attempts to shove, drag, or hurl it back fail, and any enemy who tries to slip past or push through suffers a brutal mace blow for the presumption. The vigil never flees or yields, and it cannot be made to move from that " [action/once_per_fight/defense] — the model found no template that holds it (offered: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally, hook-rider)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The vigil's shield is not just armor but an argument: the first time each round something tries to strike it, the weapon or attack has to get past the shield's edge, and if it fails, the vigil turns that failure into momentum, gaining a chance to answer with its mace. Its mace and shield work as one motion, so the vigil is always a little harder to hit while it is still swinging." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The vigil's shield is not just armor but an argument: the first time each round something tries to strike it, the weapon or attack has to get past the shield's edge, and if it fails, the vigil turns that failure into momentum, gaining a chance to answer with its mace. Its mace and shield work as one motion, so the vigil is always a little harder to hit while it is still swinging." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Chancellor Unplaced — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Chancellor Unplaced | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Repositioning Strike); nova none; dmg 36

```
Chancellor Unplaced

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

Languages Common and any three languages, Infernal, Celestial

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The chancellor unplaced makes three Repositioning Strike attacks.

Repositioning Strike. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Piercing damage.

Spellcasting. The chancellor unplaced casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The chancellor unplaced casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The chancellor unplaced teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The chancellor unplaced is hit by an attack roll. Response: The chancellor unplaced casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck and steps away") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: stepping out of the space you struck [behavior] | invisible sidestep and afterimage [body] | force needle from an unexpected quarter [object]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The chancellor sidesteps out of the timeline of a blow, and a shimmering afterimage of him is left standing where he was, wearing his face and his poise. The afterimage is not him — strikes aimed at it pass through cold displaced air, and the next creature to commit to an attack against it finds its momentum wasted and its guard down. He chooses the moment, and the afterimage never lasts long." [reaction/on_being_hit/defense] — menu: snap-shot (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into phase-slip
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" ("The concept's own verb is 'step' — the chancellor is a court wizard who is never [verb: step:concept]")
[reskin] signature idea (trait): "The chancellor's displaced presence frays the Thread of any attacker who tries to fix him in place: when a creature hits him with an attack, its own sense of where it stands wavers, and for a breath it cannot tell which version of the battlefield is real. While so unmoored, it cannot pin him down — no opportunity is taken, no pursuit is clean — and he slides one … closer to somewhere it cannot " [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "The chancellor's displaced presence frays the Thread of any attacker who tries to fix him in place: when a creature hits him with an attack, its own sense of where it stands wavers, and for a breath it cannot tell which version of the battlefield is real. While so unmoored, it cannot pin him down — no opportunity is taken, no pursuit is clean — and he slides one … closer to somewhere it cannot " [trait/always/movement] — the model found no template that holds it (offered: evasion)
[reskin] print canon languages: "Common, Infernal, Celestial" -> "Common and any three languages, Infernal, Celestial" — the Mage's plus the concept's Infernal, Celestial
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Grave Toll — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Grave Toll | 13 | swarm-9 | ok | ok | SOFT: swarm-multiattack | ok | ok | ok | ok | ok | FAIL: inline-correctness |

- structure · soft · swarm-multiattack: a swarm with a Multiattack (print swarms make one attack)
- reader · fail · inline-correctness: the inline "the swarm" is neither this creature's whole name nor its head noun nor a rank — a kind speaks whole, a person by its given name
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (2 × Bell); nova Tolling Peal 45; dmg 90

```
Grave Toll

Medium Swarm of Tiny Constructs, Neutral

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 40 ft., Fly 30 ft. (hover)

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Resonant Body. A creature that hits the swarm with a melee attack while within 5 feet of it takes 10 (3d6) Thunder damage and has the Deafened condition until the end of its next turn.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Bell attacks.

Bell. Melee Attack Roll: +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 14 (4d6) Bludgeoning damage if the swarm is Bloodied.

Tolling Peal (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[concept] signature elements: a swarm of self-ringing funeral bells [body] | it rings over the dying [behavior] | the tolling marks death [aura]
[reskin] signature idea (action): "The Grave Toll fixes on one creature it can sense that is already badly wounded, and every bell in the swarm begins tolling that creature's name in overlapping waves, a dirge meant for no one else. For as long as the victim remains in that state, the tolling gnaws at body and will alike, wearing it down faster the closer it comes to death, and the swarm drifts after it without pause. The dirge end" [action/always/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into active-toll
[reskin] value check: "Tolling Peal (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Tolling Peal (Recharge 5-6)" ("a swarm of funeral bells that ring themselves over the dying — the bells' ringin [verb: ring:concept, bell:concept, toll:idea]")
[reskin] signature idea (trait): "Whenever the swarm's bells … over a creature that is dying, that creature is marked — a toll that unseen things and other servants of death can perceive, lingering even after the swarm itself is gone. A creature can only bear one such mark at a time, and the mark fades if the creature recovers or is slain by other hands." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] signature miss: trait — "Whenever the swarm's bells … over a creature that is dying, that creature is marked — a toll that unseen things and other servants of death can perceive, lingering even after the swarm itself is gone. A creature can only bear one such mark at a time, and the mark fades if the creature recovers or is slain by other hands." [trait/always/condition] — the model found no template that holds it (offered: bloodied-burst)
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: bell:concept]")
```


---

## Marshal Vorgan — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Marshal Vorgan | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hail of Handaxes 28; dmg 47

```
Marshal Vorgan

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

Languages Common plus one other language, Dwarvish

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. Marshal makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and Marshal has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Hail of Handaxes (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher: ✓ ("closes with a shortsword") | skirmisher -> skirmisher-hurler: the concept's VERB outranks the noun (key "hurls", class verb) | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: handaxe throw [object] | shortsword close combat [object] | sellsword discipline [behavior]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "As part of the same motion it uses to throw a handaxe, Marshal Vorgan snaps off a second handaxe at a different foe — the two axes cross the battlefield like paired knife-throws. The second target must be different from the first, and the two throws must both happen before Vorgan moves or takes any other action." [action/always/damage] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into thrown-burst-seed
[reskin] signature miss: action — "As part of the same motion it uses to throw a handaxe, Marshal Vorgan snaps off a second handaxe at a different foe — the two axes cross the battlefield like paired knife-throws. The second target must be different from the first, and the two throws must both happen before Vorgan moves or takes any other action." [action/always/damage] — the model found no template that holds it (offered: thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vorgan's shortsword cuts deep precisely because it follows the handaxe. When he strikes a creature he has already wounded with a thrown weapon this fight, the shortsword wound is worse than its edge should allow." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Vorgan's shortsword cuts deep precisely because it follows the handaxe. When he strikes a creature he has already wounded with a thrown weapon this fight, the shortsword wound is worse than its edge should allow." [trait/always/damage] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] print canon languages: "Common, Dwarvish" -> "Common plus one other language, Dwarvish" — the Warrior Veteran's plus the concept's Dwarvish
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Battlefield Step" is the seat's, not the Warrior Veteran's
```


---

## Drowned Well Child — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Well Child | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Drowned Hand); nova none; dmg 38

```
Drowned Well Child

Small Undead, Neutral

AC 20
Initiative -1 (9)

HP 91 (14d6 + 42)

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 5 (XP 1,800; PB +3)

Traits

Drowned Ground. The ground in a 10-foot Emanation originating from the well child is Difficult Terrain.

Actions

Multiattack. The well child makes two Drowned Hand attacks. It can replace one attack with a use of Well-Drag.

Drowned Hand. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the well child), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Well-Drag. Wisdom Saving Throw: DC 14, one creature within 30 feet that has the Grappled condition. Failure: 22 (5d8) Necrotic damage. Success: Half damage.

Bonus Actions

False Form. The well child shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Undead mechanics=none — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: lurking beneath the well's surface [behavior] | bloated, waterlogged corpse-flesh [body] | the dark flooded shaft [aura]
[reskin] signature idea (action): "The creature remembers every face that ever stared down and drags that memory into the flesh of those it clings to. While it is latched onto a victim, it can twist their own reflection into a second, drowning self that rises from the floor beneath them and pulls at their legs, trying to drag them down toward any nearby water or low place. That doubled self only exists as long as the creature keeps" [trait/start_of_turn/movement] — menu: fire-aura, warded-mending (+ shelf: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "The creature remembers every face that ever stared down and drags that memory into the flesh of those it clings to. While it is latched onto a victim, it can twist their own reflection into a second, drowning self that rises from the floor beneath them and pulls at their legs, trying to drag them down toward any nearby water or low place. That doubled self only exists as long as the creature keeps" [trait/start_of_turn/movement] — the model found no template that holds it (offered: fire-aura, warded-mending, hook-drag, obstacle-pull, hook-rider, pull-through, exploiter, blighted-ground)
[reskin] value check: "Merciless Strike" EV 17.1 vs floor 9.4 (one attack of 2) — dice 36 → 22 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its body is a bloated, waterlogged corpse-flesh that never truly dries. Wherever it goes, a trail of standing water and grave-cold damp pools around it, making the ground slick and treacherous; plain stone and metal grow beaded with moisture and footing becomes uncertain near it. Creatures that start their turn sharing its space or adjacent to it must fight the drag of soaked clothes and numb limb" [trait/always/condition] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): aberrant-ground -> Traits/"Drowned Ground" ("the ground near it is slick and treacherous from the standing water and grave-co [verb: slick:idea, trail of:idea, treacherous:idea, footing:idea]")
```
