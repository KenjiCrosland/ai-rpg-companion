# Review batch — canaries-2026-10-16T06-34-25

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Road Tribute Ogre | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Cut-Tongue Mimic | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Ashen Sacrament Templar | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Unstruck Advisor | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Rolgar the Thunderhead | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name | FAIL (1) | 0/1 | 4/7 |
| Gilded Reliquary Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Swarm of Unfinished Peals | 13 | 2024 | swarm-9 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/2 |
| Hired Blade | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Scent-Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (2) | 1/1 | 3/4 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Sir Garrick Mournhusk | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/9 |
| Sorrowful Well-Dweller | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 2 of 18 user clauses** (coverage 89%); concept share 73% (43/59 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1
- swarm-9 / bands: 1
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

Scurry Into Hiding (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: turns invisible once per day [behavior] | scrappy skirmisher tactics [behavior] | sling stones and thrown weapons [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold slips into perfect invisibility, vanishing from sight along with everything it carries. The effect lasts until it attacks or unleashes its next sling stone, letting it reposition unseen for a single ambush strike before it flickers back into view." [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Vanishing Skirmish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanishing Skirmish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Sensing imminent danger, the kobold instinctively scrambles into whatever crack or shadow is nearest, gaining the benefit of cover even in plain sight. This reflexive evasion mirrors its skittering nature and keeps it one step ahead of larger foes." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "Sensing imminent danger, the kobold instinctively scrambles into whatever crack or shadow is nearest, gaining the benefit of cover even in plain sight. This reflexive evasion mirrors its skittering nature and keeps it one step ahead of larger foes." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Sir Garrick Mournhusk — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sir Garrick Mournhusk | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 115 a round is 28% under the table's 160
- read: def 14 / off 18 → 16; sustained 115 (2 × Soulfire Lance + legendary Deathless Charge); nova none; dmg 115

```
Sir Garrick Mournhusk
Medium undead, lawful evil
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

the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Soulfire Rebound. A creature that touches Sir Garrick or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.
Legendary Resistance (3/Day). If Sir Garrick fails a saving throw, it can choose to succeed instead.
Aura of Authority. While in a 10-foot-radius sphere centered on Sir Garrick, Sir Garrick and its allies have advantage on attack rolls and saving throws, provided Sir Garrick is not incapacitated.
Soulfire Retort. As a bonus action, Sir Garrick targets one creature within 5 feet that hit it with an attack roll since the end of Sir Garrick's last turn, which takes 10 (3d6) fire damage.
Riposte (Reaction). When a creature within 5 feet of Sir Garrick misses it with a melee attack roll, Sir Garrick makes one Soulfire Lance attack against that creature.

Actions
Multiattack: Sir Garrick makes two Soulfire Lance attacks.
Soulfire Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 10 (3d6) fire damage.
Legendary Actions

Sir Garrick can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Sir Garrick regains spent legendary actions at the start of its turn.

Deathless Charge: Sir Garrick moves up to half its speed without provoking opportunity attacks, and it makes one Soulfire Lance attack.
Spur Cavalry: One ally of Sir Garrick that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Rally Damned: Sir Garrick and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted -> defender-leader: the concept's VERB outranks the noun (key "leads a", class verb) | defender-leader: key "leads a" (class verb)
[concept] signature elements: leads a cavalry of the damned [behavior] | burns the living with ash and soul-fire [aura] | parrying riposte [behavior]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "Sir Garrick sweeps his lance in a wide arc and a wave of grave-ash erupts outward, clinging to every living creature in the area. The ash burns with soul-fire, igniting the living and leaving them smoldering; each living creature it touches takes fire damage and continues to burn until it or an ally spends time smothering the flames." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any living creature that hits Sir Garrick in melee is splashed by the burning soul-fire that smolders in his bones, taking fire damage. The fire clings to the attacker, igniting them until they spend an action to put themselves out." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature template (trait): heated-body -> Traits/"Soulfire Rebound" ("A creature that hits Sir Garrick with a melee attack is splashed by the burning  [verb: burn:concept, fire:idea]")
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Trampling Rush 6; dmg 12

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
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Goblin's Follow-Through.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Trampling Rush (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) bludgeoning damage on a failed save, and the target is knocked prone.
Goblin's Follow-Through: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: mounted skirmishing [behavior] | worg mount [behavior] | rusty blade [object]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "A move used after mounting or when a nearby mount is already ridden: the rider locks eyes on a creature it has just hit, then spurs the mount into a vicious, snapping rush. The mount arcs into the target's flank and bites, then the boss twists in the saddle and slashes down with a weighted saber. The target is knocked off balance and tangled, left unable to simply run or ride away from the pair." [rider/on_hit/condition] — menu: contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "It fights as a rider first: while mounted, the boss can use any response or dodge that its mount could make, and the mount can use the boss's reactions to keep them both moving or to snap at something that gets too close. The pair acts less like two creatures and more like one mean, mobile beast with a goblin on top." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "It fights as a rider first: while mounted, the boss can use any response or dodge that its mount could make, and the mount can use the boss's reactions to keep them both moving or to snap at something that gets too close. The pair acts less like two creatures and more like one mean, mobile beast with a goblin on top." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Saber" -> "Scimitar" — the Goblin Boss's own row
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
[route] brute type=Monstrosity mechanics=none — brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: beak and claw melee savagery [body] | tackling grapple on sight of prey [behavior] | aggressive pursuit and berserk rage when bloodied [behavior]
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

## Road Tribute Ogre — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Road Tribute Ogre | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Road Tribute Ogre

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

Multiattack. The tribute ogre makes two attacks, using Club or Javelin in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the tribute ogre's next turn.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the tribute ogre's next turn.

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
[concept] signature elements: massive club swings [object] | thick, bristled hide [body] | relentless pursuit of prey [behavior]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "It hooks its club around a runner's legs and drags them back into reach, then plants a foot on them so they cannot rise and flee again. It uses this when someone in reach tries to slip away, keeping prey close for the next skull-splitting swing." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Driving Bellow (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its massive club swings carry through whatever they strike, so anyone standing beside the creature's target also gets clipped by the same blow. This makes standing shoulder-to-shoulder against it a bad idea." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Its massive club swings carry through whatever they strike, so anyone standing beside the creature's target also gets clipped by the same blow. This makes standing shoulder-to-shoulder against it a bad idea." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Rolgar the Thunderhead — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rolgar the Thunderhead | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: no-type-in-name |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- reader · fail · no-type-in-name: Legendary Actions/Thunder Dive: the name carries Thunder the text does not deal
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Claws + legendary Storm Claw); nova Thunder Wall 71; dmg 150

```
Rolgar the Thunderhead

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

Legendary Resistance (3/Day). If Rolgar fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Rolgar makes three Claws attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Claws. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. Rolgar casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Rolgar can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Claw. Rolgar makes one Claws attack.

Thunder Dive. Rolgar moves up to half its Speed without provoking Opportunity Attacks.

Rattling Roar. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon whose breath is a ") | dragon: key "dragon" (class body)
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-wrought draconic body [body] | delight in toying with prey [behavior]
[reskin] signature idea (action): "Rolgar chooses one creature it can see within a hundred feet, and a length of thunder-wall unspools across the ground from his feet to that creature's, standing between them as a shimmering barrier. The chosen prey is boxed in with the storm, while every other creature nearby is shoved away from the line and cannot cross it without being hurled back." [action/always/movement] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "Rolgar chooses one creature it can see within a hundred feet, and a length of thunder-wall unspools across the ground from his feet to that creature's, standing between them as a shimmering barrier. The chosen prey is boxed in with the storm, while every other creature nearby is shoved away from the line and cannot cross it without being hurled back." [action/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure, lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "Whenever Rolgar's thunder magic shakes a creature, the storm's charge clings to it; while charged, the creature crackles audibly and any thunder damage Rolgar deals to it rings twice as loud, and Rolgar can always tell exactly where that creature is even through walls or darkness." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature miss: trait — "Whenever Rolgar's thunder magic shakes a creature, the storm's charge clings to it; while charged, the creature crackles audibly and any thunder damage Rolgar deals to it rings twice as loud, and Rolgar can always tell exactly where that creature is even through walls or darkness." [trait/always/damage] — the model picked "faultless-tracker" (no verb) over a concept-verb template (heated-body)
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Gilded Reliquary Ooze — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Reliquary Ooze | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Reliquary Ooze

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

Consecrated Scent. The reliquary ooze can pinpoint the location of consecrated metal within 60 feet of itself.

Amorphous. The reliquary ooze can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the reliquary ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The reliquary ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The reliquary ooze makes two Pseudopod attacks.

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
[concept] signature elements: gilded acid drips that corrode metal and flesh [body] | devouring and digesting reliquaries and armor [behavior] | cathedral-vault lair and consecrated metal hunger [aura]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ooze lashes out in a wide, painting arc with a limb of gilded acid, splattering everything in front of it. The acid clings to metal it touches, and the ooze can taste the goodness of the metal it has just marked—so on its next turn it knows exactly which target to engulf first." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The ooze lashes out in a wide, painting arc with a limb of g…" is tried as an action
[reskin] signature idea (action): "The ooze lashes out in a wide, painting arc with a limb of gilded acid, splattering everything in front of it. The acid clings to metal it touches, and the ooze can taste the goodness of the metal it has just marked—so on its next turn it knows exactly which target to engulf first." [action/save/damage] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The ooze lashes out in a wide, painting arc with a limb of gilded acid, splattering everything in front of it. The acid clings to metal it touches, and the ooze can taste the goodness of the metal it has just marked—so on its next turn it knows exactly which target to engulf first." [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature idea (trait): "The ooze senses the worth of consecrated metal—holy symbols, sanctified armor, anointed blades—and cannot help but move toward the strongest such taste. Each round it spends engulfing a creature wearing or wielding such metal, the gilding inside its body spreads, making its own acid attack stronger and the metal inedible for anyone else." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature template (trait): uncanny-sense -> Traits/"Consecrated Scent" ("sense the worth of consecrated metal and move toward the strongest such taste; ' [verb: senses:idea, metal:idea]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Acid Pseudo" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Swarm of Unfinished Peals — bands fail

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Unfinished Peals | 13 | swarm-9 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 45 a round is 55% under the card's 100
- bands · fail · under: damage 45 a round sits under print at CR 13 (72–126, n=11); reads CR 9.5
- read: def 10 / off 9 → 9.5; sustained 45 (1 × Tolling Fist); nova none; dmg 45

```
Swarm of Unfinished Peals

Medium Swarm of Tiny Constructs, Neutral

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 40 ft.

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

Senses blindsight 60 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Tolling Fist. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

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
[concept] signature elements: swarm of self-ringing funeral bells [body] | tolling for the dying [behavior] | discordant peal that strips life [aura]
[reskin] signature idea (action): "The peals focus on one creature whose wounds are already open, no matter how far away it lies; its dying pulse acts as a tuning fork, and the swarm rings the creature's own life-thrum back at it. The targeted creature feels its injuries rewound into louder, fatal echoes, taking Necrotic damage that the swarm then feeds back into its own hollow bodies as a stolen peal. This can also be aimed at a c" [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] signature miss: action — "The peals focus on one creature whose wounds are already open, no matter how far away it lies; its dying pulse acts as a tuning fork, and the swarm rings the creature's own life-thrum back at it. The targeted creature feels its injuries rewound into louder, fatal echoes, taking Necrotic damage that the swarm then feeds back into its own hollow bodies as a stolen peal. This can also be aimed at a c" [action/save/damage] — the model found no template that holds it (offered: active-toll, trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, random-ray, ground-burst, spew, riposte)
[reskin] signature idea (trait): "Any creature that is not at its full health and begins its turn near the swarm hears its own pulse turned into a funeral bell; the sound strips away more of its life, and the closer it is to death the more the ringing wounds it. The swarm cannot choose to quiet this peal; it sounds automatically for anyone the dying have not yet fully tolled." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] signature miss: trait — "Any creature that is not at its full health and begins its turn near the swarm hears its own pulse turned into a funeral bell; the sound strips away more of its life, and the closer it is to death the more the ringing wounds it. The swarm cannot choose to quiet this peal; it sounds automatically for anyone the dying have not yet fully tolled." [trait/start_of_turn/damage] — the model found no template that holds it (offered: bloodied-burst, fire-aura, warded-mending, resonant-body, death-burst, bloodied-fury)
```


---

## Scent-Stalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Scent-Stalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- reader · fail · alignment-fit: Unaligned on a Monstrosity with INT 12 that speaks None — Unaligned is for a creature with no capacity for ethics
- read: def 1 / off 5 → 3; sustained 38 (2 × Bite); nova none; dmg 38

```
Scent-Stalker

Medium Monstrosity, Unaligned

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 40 ft., Climb 40 ft.

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

Assassinate. During the first round of each combat, the scent-stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the scent-stalker hits a creature during that round, the target takes an extra 9 (2d8) Poison damage.

Actions

Multiattack. The scent-stalker makes two Bite attacks. It can replace one attack with a use of Vitality Leech.

Bite. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Poison damage.

Vitality Leech. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Poison damage, and the scent-stalker regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the scent-stalker takes the Hide action.

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
[concept] signature elements: scent-based hunting [behavior] | eyeless hide and nasal pits [body] | pheromone-marking ambush [behavior]
[reskin] signature idea (action): "The scent-stalker exhales a stinging pheromone cloud at one creature whose scent it is already tracking. That creature's own odor turns against it: its reek sharpens and carries, so the stalker's next strike against it lands harder and leaves the victim's scent thick on the air, making it easier for the stalker to follow even through darkness." [action/save/condition] — menu: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] signature miss: action — "The scent-stalker exhales a stinging pheromone cloud at one creature whose scent it is already tracking. That creature's own odor turns against it: its reek sharpens and carries, so the stalker's next strike against it lands harder and leaves the victim's scent thick on the air, making it easier for the stalker to follow even through darkness." [action/save/condition] — the model found no template that holds it (offered: focus, isolation, leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The scent-stalker's nasal pits read the air like a map: it automatically knows the exact location of any creature whose scent it has already caught, even if that creature hides, turns invisible, or moves beyond its sight. Once it smells you, it simply does not lose you." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The scent-stalker's nasal pits read the air like a map: it automatically knows the exact location of any creature whose scent it has already caught, even if that creature hides, turns invisible, or moves beyond its sight. Once it smells you, it simply does not lose you." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Cut-Tongue Mimic — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cut-Tongue Mimic | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Cut-Tongue Mimic

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

Mimicry. The mimic can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Elusive Movement. The mimic ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The mimic makes two attacks, using Dagger or Hand Crossbow in any combination. It can replace one attack with a use of Borrowed Voice.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Hand Crossbow. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Piercing damage.

Borrowed Voice. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the mimic. Failure: The target has the Charmed condition until the start of the mimic's next turn, and while Charmed this way, it must move toward the mimic by the safest available route on its turn.

Bonus Actions

Cunning Action. The mimic takes the Dash, Disengage, or Hide action.

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
[concept] signature elements: speaks only in stolen voices [behavior] | mimicry as misdirection [behavior] | shadow-woven kenku body [body]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The mimic steals the voice of someone the target trusts—a comrade, a lover, a superior—and throws that voice across the battlefield. The target hears their trusted ally call out in desperate warning or command, and in that split second of misplaced attention, the mimic slips behind their guard. Until the mimic's next turn, the target is distracted, easy prey for a blade in the back." [action/once_per_fight/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Borrowed Voice" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Borrowed Voice" ("the mimic throws a trusted ally's voice across the battlefield so the target hea [verb: call:idea]")
[reskin] signature idea (trait): "Whenever the mimic takes a hit, it instinctively answers with a stolen sound from its collection—a shriek of pain, a guard's alarm, the dying gasp of someone the attacker knows. The attacker is left momentarily unsure whether they truly struck the mimic or some other victim, giving the mimic a heartbeat to slip away into shadow." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whenever the mimic takes a hit, it instinctively answers with a stolen sound from its collection—a shriek of pain, a guard's alarm, the dying gasp of someone the attacker knows. The attacker is left momentarily unsure whether they truly struck the mimic or some other victim, giving the mimic a heartbeat to slip away into shadow." [trait/on_being_hit/movement] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, guarded-stance, death-burst)
[reskin] species kit: Auran — the kenku's own
```


---

## Ashen Sacrament Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Sacrament Templar | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Ashen Sacrament Templar

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

Multiattack. The sacrament templar makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the sacrament templar's next turn.

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
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: mace-and-shield line holding [behavior] | iron discipline and plate [body] | punishing those who move past [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "The templar slams his mace down in a line ahead of him, and a crushing pressure rolls out along the ground from the point of impact. Every enemy in that line is smashed backward and must scramble to close in again, unless they drop prone and hold still. This pushes foes back into their own ranks and leaves the templar holding the front." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "The templar slams his mace down in a line ahead of him, and a crushing pressure rolls out along the ground from the point of impact. Every enemy in that line is smashed backward and must scramble to close in again, unless they drop prone and hold still. This pushes foes back into their own ranks and leaves the templar holding the front." [action/always/movement] — the model found no template that holds it (offered: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, rally)
[reskin] value check: "Horrid Display (2/Day)" EV 23.1 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The first enemy to move away from the templar, or to attack anyone else while still within his reach, draws his immediate reprisal. He does not wait for his turn; his shield drives into them and his mace follows, forcing them back onto the line he has drawn." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The first enemy to move away from the templar, or to attack anyone else while still within his reach, draws his immediate reprisal. He does not wait for his turn; his shield drives into them and his mace follows, forcing them back onto the line he has drawn." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, faultless-tracker)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Unstruck Advisor — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unstruck Advisor | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Unstruck Advisor

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

Evasion. If the unstruck advisor is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the unstruck advisor instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The unstruck advisor makes three Arcane Burst attacks. It can replace one attack with a use of Ledger's Due.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The unstruck advisor casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Ledger's Due. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the unstruck advisor's next turn. The first time the cursed target deals damage to any creature before then, it takes 14 (4d6) Necrotic damage. Success: Half damage only.

Bonus Actions

Misty Step (3/Day). The unstruck advisor casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The unstruck advisor is hit by an attack roll. Response: The unstruck advisor casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[concept] signature elements: phasing displacement [behavior] | shadowy form [body] | deceiving illusions [aura]
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The advisor strikes a creature, and for a heartbeat the target is yanked out of step with time. While unstuck, every blow the target lands passes harmlessly through its foe, and the advisor leaves its afterimage where the target aimed." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature miss: action — "The advisor strikes a creature, and for a heartbeat the target is yanked out of step with time. While unstuck, every blow the target lands passes harmlessly through its foe, and the advisor leaves its afterimage where the target aimed." [rider/on_hit/condition] — the model found no template that holds it (offered: phase-slip, bolt-restrain, bolt-drag, bolt-mark, obstacle-pull)
[reskin] value check: "Debt of Ruin" EV 10.9 vs floor 7.3 (one attack of 3) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a creature misses the advisor with an attack, the advisor flickers into a momentary phase, causing the attacker's next strike to swing through empty space as well. The advisor's outline smears and lags behind its true position until it next attacks or is struck." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Whenever a creature misses the advisor with an attack, the advisor flickers into a momentary phase, causing the attacker's next strike to swing through empty space as well. The advisor's outline smears and lags behind its true position until it next attacks or is struck." [trait/on_being_hit/defense] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, marking-light)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Aeon Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Hired Blade — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hired Blade | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hurled Burst 28; dmg 47

```
Hired Blade

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

Multiattack. The hired blade makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the hired blade has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Hurled Burst (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
[concept] signature elements: hurled handaxe before closing [behavior] | close with shortsword [behavior] | handaxe and shortsword [object]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "The hired blade hurls a handaxe to break an enemy's guard, then immediately closes the distance without giving them time to reset. The thrown axe leaves the target rattled and exposed, making it easier for the hired blade's shortsword to land. If the target tries to flee or reposition, the hired blade can keep pace and strike before they escape." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature miss: action — "The hired blade hurls a handaxe to break an enemy's guard, then immediately closes the distance without giving them time to reset. The thrown axe leaves the target rattled and exposed, making it easier for the hired blade's shortsword to land. If the target tries to flee or reposition, the hired blade can keep pace and strike before they escape." [rider/on_hit/condition] — the model picked "bolt-mark" (no verb) over a concept-verb template (thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hired blade's professional discipline lets it weave handaxe throws and shortsword strikes into a seamless rhythm. Whenever it hits with a handaxe, its next shortsword attack against that same target comes faster and harder to avoid." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The hired blade's professional discipline lets it weave handaxe throws and shortsword strikes into a seamless rhythm. Whenever it hits with a handaxe, its next shortsword attack against that same target comes faster and harder to avoid." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Veteran's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Skirmisher" is the seat's, not the Warrior Veteran's
audit finding below confidence gate: Hurled Burst (Recharge 5-6) The entry name is a generic engine stand-in that fails to describe the signature ranged burst attack of this creature.
```


---

## Sorrowful Well-Dweller — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sorrowful Well-Dweller | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 38 (2 × Brine Lash); nova none; dmg 38

```
Sorrowful Well-Dweller

Medium Aberration, Neutral Evil

AC 20
Initiative -1 (9)

HP 90 (12d8 + 36)

Speed 10 ft., Climb 20 ft., Swim 10 ft.

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

Resistances Cold

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The well-dweller makes two Brine Lash attacks. It can replace one attack with a use of Dragging Brine Pull.

Brine Lash. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the well-dweller), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Dragging Brine Pull. Strength Saving Throw: DC 14, one creature within 30 feet that is Grappled by the well-dweller. Failure: 14 (4d6) Cold damage. Success: Half damage.

Bonus Actions

False Form. The well-dweller shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[concept] signature elements: ambush from a false, still surface [behavior] | brine-soaked dragging limbs [body] | the cold, black water of the well [aura]
[reskin] signature idea (action): "The well-dweller lunges and seizes a creature's leg with its lashing limbs, then hauls it over the lip and down into the water, dragging it beneath the surface and holding it under. While the creature is pinned underwater, it is blinded and choking, unable to breathe or cry out, and the cold brine seeps into its body. The well-dweller can only drag one victim at a time and must remain in contact w" [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "The well-dweller lunges and seizes a creature's leg with its lashing limbs, then hauls it over the lip and down into the water, dragging it beneath the surface and holding it under. While the creature is pinned underwater, it is blinded and choking, unable to breathe or cry out, and the cold brine seeps into its body. The well-dweller can only drag one victim at a time and must remain in contact w" [rider/on_hit/movement] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, hook-drag, obstacle-pull, slow-bolt, exploiter, spew, pacify, sensory-strike)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The well-dweller's touch leaves a lingering, bone-deep chill that clings to flesh. Any creature that starts its turn grappled by or in contact with the well-dweller feels this cold gnawing at it, and the sensation intensifies the longer it remains in contact, sapping its strength and making it sluggish." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "The well-dweller's touch leaves a lingering, bone-deep chill that clings to flesh. Any creature that starts its turn grappled by or in contact with the well-dweller feels this cold gnawing at it, and the sensation intensifies the longer it remains in contact, sapping its strength and making it sluggish." [trait/start_of_turn/damage] — the model found no template that holds it (offered: fire-aura, warded-mending, heated-body, absorption, spider-climb, aberrant-ground)
```
