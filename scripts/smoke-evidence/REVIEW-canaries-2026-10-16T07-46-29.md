# Review batch — canaries-2026-10-16T07-46-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| High Pass Mauler | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Whisper-gallery Kenku | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Ashvowed Ordric | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Whisper-of-Hollow Court | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Peak-Storm Rivenwyrm | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 0/1 | 3/7 |
| Reliquary Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 5/5 |
| Dolorous Peal Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Axe-and-Blade Contract | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Midden-ghast | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathbroken Marshal | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 2/2 | 1/8 |
| Well-Drowned | 5 | 2024 | lurker-5-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 4 of 18 user clauses** (coverage 78%); concept share 67% (42/63 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- dragon-15 / reader: 1
- lurker-5 / bands: 1



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
[concept] signature elements: one-daily invisibility [behavior] | skirmishing from cover [behavior] | tunnel ambush tactics [behavior]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Once per day, the kobold's scales and gear shimmer and slough away into the background, leaving it unseen until it attacks or is caught in bright, direct light. While hidden this way it can slip through the middle of a fight, take a hiding spot no one would expect, and line up its next knife throw or backstab on a victim who never saw it coming." [bonus_action/once_per_fight/condition] — menu: patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Shimmering Scales (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shimmering Scales (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The instant the kobold vanishes, every tunnel-rocker, dripping pipe, and loose scree in the room seems to change places, so attackers swing at the wrong empty patch of air and the kobold's own allies lose track of it too. Any creature that tries to attack or target the vanished kobold does so blind, guessing at where it actually crouches." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] print canon modes: climb off — the Kobold Warrior has no such mode and the words name none
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon attack: "Stone Knife" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Scutter" is the seat's, not the Kobold Warrior's
```


---

## Oathbroken Marshal — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbroken Marshal | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 115 a round is 28% under the table's 160
- structure · soft · reach: Actions/Blade: reach 10 on a Medium body with no tether word
- read: def 14 / off 18 → 16; sustained 115 (2 × Blade + legendary Ride Down); nova none; dmg 115

```
Oathbroken Marshal
Medium undead, neutral evil
Armor Class 20 (natural armor)
Hit Points 256 (27d8 + 135)
Speed 30 ft.
STR 18 (+4), DEX 14 (+2), CON 20 (+5), INT 14 (+2), WIS 16 (+3), CHA 20 (+5)
Saving Throws CON +11, CHA +11
Skills Athletics +10, Persuasion +11
Damage Resistances fire
Damage Immunities poison
Condition Immunities exhaustion, poisoned
Senses darkvision 120 ft., passive Perception 13
Languages Common plus the languages it knew in life
Challenge 17 (18,000 XP)
Proficiency Bonus +6

Traits
Legendary Resistance (3/Day): If the marshal fails a saving throw, it can choose to succeed instead.
Aura of Authority: While in a 10-foot-radius sphere centered on the marshal, the marshal and its allies have advantage on attack rolls and saving throws, provided the marshal is not incapacitated.
Retributive Flame: As a bonus action, the marshal targets one creature within 5 feet that hit the marshal with an attack roll since the end of the marshal's last turn. The target takes 10 (3d6) fire damage.
Riposte (Reaction): When a creature within 5 feet of the marshal misses it with a melee attack roll, the marshal makes one Blade attack against that creature.

Actions
Multiattack: The marshal makes two Blade attacks.
Blade: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) slashing damage plus 10 (3d6) fire damage.

Legendary Actions
Ride Down: The marshal moves up to half its speed without provoking opportunity attacks, and it makes one Blade attack.
Spur On: One ally of the marshal that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Rally Legion: The marshal and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — defender-leader: ✓ ("leads a cavalry of the damned") | defender-leader: key "leads a" (class verb)
[concept] signature elements: cavalry of the damned [behavior] | burning the living [behavior] | aura of command [aura]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "The marshal raises a hand and every corpse within sight is kindled with black fire, then claws upright as an undead rider that immediately charges the living. Those it rides down are dragged back into the legion when they fall." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "The marshal raises a hand and every corpse within sight is kindled with black fire, then claws upright as an undead rider that immediately charges the living. Those it rides down are dragged back into the legion when they fall." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, hook-rider, charge-push)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the marshal or one of its undead allies burns a living creature, that victim smolders with black fire, and the marshal and its legion draw strength from the suffering." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature miss: trait — "When the marshal or one of its undead allies burns a living creature, that victim smolders with black fire, and the marshal and its legion draw strength from the suffering." [trait/always/defense] — the model found no template that holds it (offered: heated-body, death-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
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

Worg-Bred. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Opportunist's Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Ride-Down (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw. On a failed save, it takes 6 (1d12) bludgeoning damage and is prone.
Opportunist's Lash: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: goblin riding a worg as one skirmishing unit [behavior] | crude javelins hurled from worg-back [object] | ride-down attack that carries it past the target [behavior]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "From worg-back, the boss looses a fistful of crude javelins in a wide, skidding arc, forcing everything in a line ahead to duck rather than stand. The volley is meant to make prey break cover and run where the worg wants them. It can only be done while the boss is riding; once dismounted, the trick is lost." [action/always/damage] — menu: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "From worg-back, the boss looses a fistful of crude javelins in a wide, skidding arc, forcing everything in a line ahead to duck rather than stand. The volley is meant to make prey break cover and run where the worg wants them. It can only be done while the boss is riding; once dismounted, the trick is lost." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, feint-slip)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The worg-bred boss and its mount move as one animal: any rider-like foe that holds, grapples, or unseats the goblin finds the worg instantly turning on it with snapping jaws. The worg never stands idle while its rider is dragged down." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "The worg-bred boss and its mount move as one animal: any rider-like foe that holds, grapples, or unseats the goblin finds the worg instantly turning on it with snapping jaws. The worg never stands idle while its rider is dragged down." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Saber" -> "Scimitar" — the Goblin Boss's own row
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
[concept] signature elements: bear-hawk hybridization [body] | ferocious territorial charge [behavior] | bone-crushing grappling hug [behavior]
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Claws" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---

## High Pass Mauler — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| High Pass Mauler | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
High Pass Mauler

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

Multiattack. The mauler makes two attacks, using Club or Javelin in any combination. It can replace one attack with a use of Crushing Fear.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the mauler's next turn.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the mauler's next turn.

Crushing Fear. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the mauler's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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
[concept] signature elements: a club the size of a tree trunk [object] | a wall of hide and muscle that never stops swinging [body] | fights to the death with dull persistence [behavior]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The mauler digs in and swings its club in a flat, wide arc that sweeps through everyone standing in front of it, not just one target. Anyone caught in that sweep is knocked stumbling backward and has to gather themselves before they can close in again. It can only wind up for this once, then has to rest the club on its shoulder before it can do it a second time." [action/once_per_fight/damage] — menu: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Creeping Dread" EV 12.4 vs floor 9.4 (one attack of 2) — dice 9 → 18
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "A club the size of a tree trunk simply carries through whatever it hits — when the mauler lands a blow, the force of the swing knocks the victim off their feet and out of position. Wounded or not, it keeps swinging the same way every round, because nothing has ever made it stop." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "A club the size of a tree trunk simply carries through whatever it hits — when the mauler lands a blow, the force of the swing knocks the victim off their feet and out of position. Wounded or not, it keeps swinging the same way every round, because nothing has ever made it stop." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] print canon alignment: Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Peak-Storm Rivenwyrm — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Peak-Storm Rivenwyrm | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- reader · fail · name-mechanic: Legendary Actions/Wing Sweep: the name promises the Prone condition the text lacks
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Bite + legendary Storm Strike); nova Thunder Roll 71; dmg 150

```
Peak-Storm Rivenwyrm

Huge Dragon, Chaotic Neutral

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

Senses blindsight 60 ft., darkvision 120 ft., tremorsense 30 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the rivenwyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The rivenwyrm makes three Bite attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Bite. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Piercing damage plus 10 (3d6) Thunder damage.

Thunder Roll (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The rivenwyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the rivenwyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Strike. The rivenwyrm makes one Bite attack.

Wing Sweep. The rivenwyrm moves up to half its Speed without provoking Opportunity Attacks.

Tempest Roar. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("adult storm dragon") | dragon: key "dragon" (class body)
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-wracked body of charged air and rain [body] | frightful presence that echoes like thunder [aura]
[reskin] signature idea (action): "The rivenwyrm exhales a roiling wall of charged air and freezing rain that drifts across the field as a line, laced with crackling thunder. It persists briefly, and any creature caught inside it is deafened and lashed by the storm. At the start of each of the wyrm's turns, the wall drifts a short distance in a direction the wyrm chooses, so it can herd and cage prey without ever landing." [action/always/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The rivenwyrm exhales a roiling wall of charged air and freezing rain that drifts across the field as a line, laced with crackling thunder. It persists briefly, and any creature caught inside it is deafened and lashed by the storm. At the start of each of the wyrm's turns, the wall drifts a short distance in a direction the wyrm chooses, so it can herd and cage prey without ever landing." [action/always/damage] — the model found no template that holds it (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure, charge)
[reskin] signature idea (trait): "The wyrm's body is a storm given scale: its hide sheds a constant shroud of charged mist and static. Whenever a creature hits the rivenwyrm with a melee attack from within reach, the discharge leaps back along the attacker's arm, leaving them deafened until the end of their next turn and crackling with thundrous backlash." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature miss: trait — "The wyrm's body is a storm given scale: its hide sheds a constant shroud of charged mist and static. Whenever a creature hits the rivenwyrm with a melee attack from within reach, the discharge leaps back along the attacker's arm, leaving them deafened until the end of their next turn and crackling with thundrous backlash." [trait/on_being_hit/condition] — the model picked "resonant-body" (no verb) over a concept-verb template (heated-body)
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Reliquary Ooze — one marked soft

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Reliquary Ooze | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Reliquary Ooze

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

Aberrant Ground. The ground in a 10-foot Emanation originating from the ooze is Difficult Terrain.

Amorphous. The ooze can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The ooze makes two Pseudopod attacks.

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
[concept] signature elements: digests reliquaries [behavior] | gilded acid drip [body] | amorphous ooze [body]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ooze lets out a wet, rattling cough and sprays a fan of half-dissolved reliquary fragments in a direction it chooses. The jagged shards of gold and bone splatter a short distance from it, sticking to the ground and to any creature they strike. A creature coated in this gilded sludge finds the gold hardening around its joints, slowing it down until it scrapes the fragments off itself." [action/save/condition] — menu: trample, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: leap, rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature idea (trait): "Whenever the ooze dissolves a piece of treasure or a holy symbol as part of its meal, molten gold weeps from its body and hardens into a thin, gleaming shell. Until the shell is cracked, the ooze's acid is dulled, but its weight and density make its strikes land harder." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature miss: trait — "Whenever the ooze dissolves a piece of treasure or a holy symbol as part of its meal, molten gold weeps from its body and hardens into a thin, gleaming shell. Until the shell is cracked, the ooze's acid is dulled, but its weight and density make its strikes land harder." [trait/always/damage] — the model found no template that holds it (offered: aberrant-ground, false-appearance, adhesive, phobia, terrain-walk, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] signature template (trait): aberrant-ground -> Traits/"Aberrant Ground" ("exact concept match [verb: ooze:concept]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Gilded Pseudopod" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Midden-ghast — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Midden-ghast | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 38 (2 × Barbed Forelimbs); nova none; dmg 38

```
Midden-ghast

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

Scent-Locked Pursuit. The midden-ghast knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the midden-ghast has Advantage on attack rolls against any creature that hasn't taken a turn. If the midden-ghast hits a creature during that round, the target takes an extra 9 (2d8) Poison damage.

Actions

Multiattack. The midden-ghast makes two Barbed Forelimbs attacks. It can replace one attack with a use of Carrion Draught.

Barbed Forelimbs. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Poison damage.

Carrion Draught. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Poison damage, and the midden-ghast regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Shadowmeld. While in Dim Light or Darkness, the midden-ghast takes the Hide action.

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
[concept] signature elements: hunts by scent alone, eyeless [behavior] | chitin-plated barbed forelimbs [body] | caustic venom burst from palm-spines [body]
[reskin] signature idea (action): "The midden-ghast's barbed forelimbs are hollow and venom-slicked; when it strikes a creature it has been tracking by scent, it drives both limbs deep and floods the wound with caustic venom from its palm-spines. The venom lingers in the flesh, and the creature keeps reeking of it, so the ghast can follow that wound-smell even through total darkness and around corners long after the prey flees. Any" [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The midden-ghast has no eyes and hunts by scent alone: it locks onto the musk of any living creature whose blood it has tasted or whose trail it has crossed, and from then on it always knows the direction to that prey as long as they share the same air, even if the prey is hidden, silent, or standing still. Only water, running wind, or leaving the area entirely shakes the lock." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): faultless-tracker -> Traits/"Scent-Locked Pursuit" ("The creature hunts by scent alone and always knows the direction to any prey who [verb: track:concept, tracks:concept, tracking:concept, scent:concept, hunts:idea, hunted:idea, always knows:idea, direction to:idea, trail:idea]")
```


---

## Well-Drowned — bands soft

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well-Drowned | 5 | lurker-5-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 67 is 26% under the card's 90
- read: def 3 / off 5 → 4; sustained 34 (2 × Claw); nova none; dmg 34

```
Well-Drowned

Medium Undead, Neutral

AC 13
Initiative +3 (13)

HP 67 (9d8 + 27)

Speed 5 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
6
-2
-2
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
16
+3
+3
CHA
15
+2
+2

Skills Stealth +6

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages Common plus the languages it knew in life

CR 5 (XP 1,800; PB +3)

Traits

Incorporeal Movement. The well-drowned can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the well-drowned has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The well-drowned makes two Claw attacks. It can replace one attack with a use of Down the Well.

Claw. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Down the Well. Strength Saving Throw: DC 13, one Medium or smaller creature the well-drowned is touching. Failure: 9 (2d8) Necrotic damage, and the well-drowned drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved. Success: Half damage only.

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
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("the thing in the well") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: rising from the well to drag victims down [behavior] | a body of wet, skeletal bone that seeps through stone [body] | a drowning well of cold black water [aura]
[reskin] signature idea (action): "The well-drowned lunges with both bone hands and grabs hold of a living creature, sinking its grip into flesh. If the grab lands, it drags the victim straight down through the floor or wall as if both were water, pulling them under the stone for a moment. The victim is dragged prone and held in the earth, and the well-drowned stays half-sunk with them, keeping its meal close." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: swallow, leap, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Down the Well" EV 9.5 vs floor 9.4 (one attack of 2) — added Success: Half
[reskin] signature template: pull-through -> Actions/"Down the Well" ("it drags the grabbed victim straight down through the floor as if it were water, [verb: through the floor:idea, drown:idea]")
[reskin] signature idea (trait): "When the well-drowned is badly wounded, it sinks into the nearest wall or floor and seeps through the stone. On its next turn it rises up behind a creature it has already wounded, reaching out through the surface to claw at it from below." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "When the well-drowned is badly wounded, it sinks into the nearest wall or floor and seeps through the stone. On its next turn it rises up behind a creature it has already wounded, reaching out through the surface to claw at it from below." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
```


---

## Whisper-gallery Kenku — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisper-gallery Kenku | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Prison Shiv); nova none; dmg 24

```
Whisper-gallery Kenku

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

Mimicry. The kenku can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Shadow Slip. The kenku ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The kenku makes two attacks, using Prison Shiv or Thrown Shank in any combination.

Prison Shiv. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Thrown Shank. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The kenku takes the Dash, Disengage, or Hide action.

Shadow Ambush (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the kenku moves up to half its Speed, and it makes one Prison Shiv attack.

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
[concept] signature elements: stolen mimicry of voices | bone-handled prison shiv [object] | shadow-step vanish and reposition [behavior]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The kenku hurls a stolen voice across the battlefield as a perfect, living sound—a guard's all-clear, a child's sob, a lover's cry for help. Creatures that hear it must turn their attention toward the source, breaking their guard and letting the kenku slip away through shadow or strike from an unseen angle before the echo dies." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Stolen All-Clear" EV 1.7 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Stolen All-Clear" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bone-handled prison shiv is a memory of the debtors' prison, and when the kenku drives it home it tears a stolen voice from the victim, silencing them in a way that mirrors the kenku's own stolen speech." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The bone-handled prison shiv is a memory of the debtors' prison, and when the kenku drives it home it tears a stolen voice from the victim, silencing them in a way that mirrors the kenku's own stolen speech." [trait/always/condition] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] species kit: Auran — the kenku's own
```


---

## Ashvowed Ordric — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashvowed Ordric | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Ashvowed Ordric

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

Multiattack. Ordric makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Ordric's next turn.

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
[concept] signature elements: a mace and a shield, no spells [object] | holds the line and punishes anyone who tries to pass [behavior] | unshakable, prayerless resolve [aura]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "When Ordric's mace cracks a foe, the blow leaves the victim's guard broken and ringing; until the next breath passes, any opening that target leaves is punished with a crushing strike from the mace. An ally who steps through that broken guard is shoved stumbling back toward the line, unharmed but repositioned, as Ordric's shield and voice refuse them passage." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature miss: action — "When Ordric's mace cracks a foe, the blow leaves the victim's guard broken and ringing; until the next breath passes, any opening that target leaves is punished with a crushing strike from the mace. An ally who steps through that broken guard is shoved stumbling back toward the line, unharmed but repositioned, as Ordric's shield and voice refuse them passage." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, active-toll, own-turn-punisher, rally, riposte)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ordric does not chase. As long as he has not moved since the start of his turn, his shield hand and planted feet make the space around him a wall; enemies that try to pass or slip away are met with a sudden shield-bash that stops them dead and leaves them exposed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Ordric does not chase. As long as he has not moved since the start of his turn, his shield hand and planted feet make the space around him a wall; enemies that try to pass or slip away are met with a sudden shield-bash that stops them dead and leaves them exposed." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Whisper-of-Hollow Court — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Whisper-of-Hollow Court | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Whisper-of-Hollow Court

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

Evasion. If the hollow court is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the hollow court instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The hollow court makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The hollow court casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The hollow court casts Misty Step, using the same spellcasting ability as Spellcasting.

Phase Slip (2/Day). The hollow court teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: The hollow court is hit by an attack roll. Response: The hollow court casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=teleport — caster: ✓ ("a court wizard who is never where you st") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: steps away from where you strike [behavior] | arcane bolts from impossible angles [behavior] | courtly, mocking demeanor [behavior]
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The court wizard marks a distant attacker with a whispered insult that follows them like an echo. For a short while, every displacement bolt the wizard fires curves unerringly toward that marked target, even from behind cover or through a crowd, and the wizard always knows exactly where the target is." [rider/on_hit/condition] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] value check: "Phase Slip (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: phase-slip -> Bonus Actions/"Phase Slip (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the wizard successfully hits a creature with a displacement bolt, it can immediately step sideways through the wound in reality, appearing in an unoccupied space near that creature. This flicker of repositioning leaves the wizard impossible to pin down, even as it keeps up its barrage from ever-changing angles." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Whenever the wizard successfully hits a creature with a displacement bolt, it can immediately step sideways through the wound in reality, appearing in an unoccupied space near that creature. This flicker of repositioning leaves the wizard impossible to pin down, even as it keeps up its barrage from ever-changing angles." [trait/always/movement] — the model found no template that holds it (offered: evasion, false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("exact concept match [verb: never where:concept]")
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Displacement Stroke" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Dolorous Peal Swarm — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dolorous Peal Swarm | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Tolling Cascade); nova none; dmg 90

```
Dolorous Peal Swarm

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

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Bloodied Burst. The first time the swarm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 91 (14d12) Necrotic damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Tolling Cascade. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Bludgeoning damage, or 45 (13d6) Bludgeoning damage if the swarm is Bloodied.

Dirge Mark (Recharge 5-6). Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 90 feet that can see or hear the swarm's tolling bells. Failure: The target has the Charmed condition until the start of the swarm's next turn, and while Charmed this way, it must move toward the swarm by the safest available route on its turn and can't take Reactions.

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
[route] swarm type=Construct mechanics=none — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] signature elements: swarm of self-ringing funeral bells [body] | ringing over the dying [behavior] | necrotic toll [aura]
[reskin] signature idea (action): "Its bells find a creature already struggling for breath and answer with a dirge tuned to it alone: the target is marked for the swarm's ringing, and every step it takes toward safety draws the bells after it, because being heard is the same as being hunted. When a creature marked this way slips closer to death, the bells ring louder and more wildly, quickening the swarm's frenzy so it can finish t" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, patient-defense, second-wind, riposte)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] value check: "Dirge Mark (Recharge 5-6)" EV 99 vs floor 46.8 (one attack of 1) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Dirge Mark (Recharge 5-6)" ("The bells draw a marked, struggling creature after them, forcing it to move towa [verb: draw:idea]")
[reskin] signature idea (trait): "The swarm's chimes are not merely sound but a settling of the grave: each time the bells ring over a creature that can still hear them, a little warmth leaves it, and the swarm briefly glows with stolen life. This is why the bells never stop ringing and why the dying feel colder the longer they listen." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] signature miss: trait — "The swarm's chimes are not merely sound but a settling of the grave: each time the bells ring over a creature that can still hear them, a little warmth leaves it, and the swarm briefly glows with stolen life. This is why the bells never stop ringing and why the dying feel colder the longer they listen." [trait/always/damage] — the model picked "noxious-aura" (no verb) over a concept-verb template (bloodied-burst, resonant-body, death-burst)
[reskin] signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("exact concept match [verb: ring:concept, bell:concept, dying:concept, the dying:concept]")
```


---

## Axe-and-Blade Contract — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Axe-and-Blade Contract | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hurls a handaxe"
- read: def 3 / off 6 → 4.5; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Axe-and-Blade Contract

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

Multiattack. The contract makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the contract has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Bonus Actions

Retaliating Backhand. One creature within 5 feet that hit the contract with an attack roll since the end of the contract's last turn takes 7 (2d6) Bludgeoning damage.

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
[concept] signature elements: handaxe hurled to open the fight [object] | shortsword follow-up into melee [object] | professional sellsword's measured aggression [behavior]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "The sellsword hurls a handaxe at one creature and that same throw drives the sword hand. If the axe hits, the sellsword may immediately make one shortsword attack against any creature within reach, as part of the same action. This lets it open at range and close in the same breath." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature miss: action — "The sellsword hurls a handaxe at one creature and that same throw drives the sword hand. If the axe hits, the sellsword may immediately make one shortsword attack against any creature within reach, as part of the same action. This lets it open at range and close in the same breath." [rider/on_hit/movement] — the model found no template that holds it (offered: thrown-burst-seed, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, throw-retrieve, spew, riposte)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The sellsword's shortsword cuts with the momentum of its thrown axe. Once per turn, when the sellsword hits with a shortsword attack, the target cannot willingly move away from the sellsword until the end of its next turn. If the target tries to flee, the sellsword's next handaxe throw against it has advantage." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The sellsword's shortsword cuts with the momentum of its thrown axe. Once per turn, when the sellsword hits with a shortsword attack, the target cannot willingly move away from the sellsword until the end of its next turn. If the target tries to flee, the sellsword's next handaxe throw against it has advantage." [trait/always/movement] — the model found no template that holds it (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Mobile" is the seat's, not the Warrior Veteran's
```
