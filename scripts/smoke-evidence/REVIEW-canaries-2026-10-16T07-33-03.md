# Review batch — canaries-2026-10-16T07-33-03

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Gristleback Brute | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Vessel of Stolen Voices | 3 | 2024 | skirmisher-3-skulker | ok | ok | FAIL: multiattack-combination | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 4/6 |
| Garrison Hierophant | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Drowned Chamberlain | 6 | 2024 | caster-6 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/3 |
| Tempest Sovereign | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/7 |
| Gilded Vault Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: no-type-in-name | FAIL (1) | 0/1 | 5/5 |
| Swarm of Cerement Chorus | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Unmarked Blade | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/3 |
| Bogstalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 0/4 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Ashen Marshal | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 2/2 | 1/8 |
| Well-Drowned Warden | 5 | 2024 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/3 |

**Dropped 2 of 19 user clauses** (coverage 89%); concept share 60% (33/55 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-skulker / structure: 1
- ooze-9 / reader: 1
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

Dragonshadow (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[concept] signature elements: turn invisible once per day [behavior] | shadow-touched dagger strikes [object] | skittering cowardice [behavior]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold brushes the shadow spirit's mark and fades from sight entirely, becoming invisible. The invisibility ends the moment it makes an attack or casts a spell, but while hidden it can slip away, reposition, or set up its next strike. It can call on this vanishing trick only once per day." [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, blink, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Shadow Slip (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shadow Slip (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "While the kobold is hidden or invisible, its shadow-touched dagger strikes true against the seams in armor, making its attacks harder to defend against. The shadow spirit's gift guides its blade when it strikes from concealment." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] signature miss: trait — "While the kobold is hidden or invisible, its shadow-touched dagger strikes true against the seams in armor, making its attacks harder to defend against. The shadow spirit's gift guides its blade when it strikes from concealment." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skulker's Stride" is the seat's, not the Kobold Warrior's
```


---

## Ashen Marshal — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Marshal | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 125 a round is 22% under the table's 160
- structure · soft · reach: Actions/Flame Blade: reach 10 on a Medium body with no tether word
- read: def 14 / off 20 → 17; sustained 125 (2 × Flame Blade + legendary Ride Down); nova none; dmg 125

```
Ashen Marshal
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

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If the marshal fails a saving throw, it can choose to succeed instead.
Aura of Authority. While within 10 feet of the marshal, the marshal and its allies have advantage on attack rolls and saving throws, provided the marshal isn't incapacitated.
Answering Sting. As a bonus action, the marshal targets one creature within 5 feet that hit it with an attack roll since the end of the marshal's last turn, dealing 10 (3d6) fire damage to it.
Riposte (Reaction). When a creature within 5 feet of the marshal misses it with a melee attack, the marshal makes one Flame Blade attack against that creature.

Actions
Multiattack: The marshal makes two Flame Blade attacks.
Flame Blade: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (6d6 + 4) fire damage.
Legendary Actions

The marshal can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The marshal regains spent legendary actions at the start of its turn.

Ride Down: The marshal moves up to half its speed without provoking opportunity attacks, and it makes one Flame Blade attack.
Command Ally: One ally of the marshal that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Reform Ranks: The marshal and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — defender-leader: ✓ ("leads a cavalry of the damned") | defender-leader: key "leads a" (class verb)
[concept] signature elements: leading a cavalry of the damned [behavior] | burning the living [behavior] | ash-forged plate and blade [body]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "The marshal points its burning blade at the horizon and a spectral cavalry of ash and cinders thunders into being, sweeping across a wide stretch of the battlefield. Any living creature caught in that charge is not only seared by the legion's passage but is dragged along with it, pulled toward the marshal as if hooked by unseen reins. The marshal can call this charge only once each time it enters " [action/once_per_fight/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up (+ shelf: herd, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Ashen Cavalry Charge" EV 3.3 vs floor 12.5 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Ashen Cavalry Charge" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Cinders and ash drift from the marshal's burning form, clinging to any weapon that strikes it. A creature that hits the marshal with a melee attack is set smoldering, taking fire damage at the start of each of its turns until it uses its action to beat the flames out. The smoldering also makes it easier for the marshal's mounted allies to strike at it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature miss: trait — "Cinders and ash drift from the marshal's burning form, clinging to any weapon that strikes it. A creature that hits the marshal with a melee attack is set smoldering, taking fire damage at the start of each of its turns until it uses its action to beat the flames out. The smoldering also makes it easier for the marshal's mounted allies to strike at it." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, death-burst, absorption, bloodied-burst, resonant-body, weapon-lodge, terrain-walk, adhesive, fire-aura)
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg Stampede 6; dmg 12

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

Worgen Speed. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Opportunist's Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg Stampede (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each such creature must make a DC 12 Strength saving throw. On a failed save, the target takes 6 (1d12) bludgeoning damage and is knocked prone.
Opportunist's Lash: One prone creature within 30 feet of the boss must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: riding down foes with a worg [behavior] | a boss who commands lesser goblins [behavior] | mounted goblinoid pair [body]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The boss barks a savage command and the warband answers, a ragged volley of stones, arrows, and rusty blades lashing out from every goblin within earshot. Each ally that can hear the boss makes a free attack of its own against a target the boss has already hurt this round, and each one that does so steps back into cover or closes in at the boss's word. The boss can only issue this order when its w" [action/once_per_fight/damage] — menu: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The boss barks a savage command and the warband answers, a ragged volley of stones, arrows, and rusty blades lashing out from every goblin within earshot. Each ally that can hear the boss makes a free attack of its own against a target the boss has already hurt this round, and each one that does so steps back into cover or closes in at the boss's word. The boss can only issue this order when its w" [action/once_per_fight/damage] — the model found no template that holds it (offered: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, rampage)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The boss and its worg share one vicious hunting instinct, so whenever an enemy is knocked sprawling or bleeding badly by the boss's own attack, the worg lunges before the foe can rise. The beast snaps at any creature the boss has just felled or flattened, punishing anyone who dares stay down within reach." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The boss and its worg share one vicious hunting instinct, so whenever an enemy is knocked sprawling or bleeding badly by the boss's own attack, the worg lunges before the foe can rise. The beast snaps at any creature the boss has just felled or flattened, punishing anyone who dares stay down within reach." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] chassis nova: "Worg Stampede (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Boss's own ranged row
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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: bone-crushing hug [behavior] | hooked beak [body] | feathered bear body [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
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

## Gristleback Brute — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gristleback Brute | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Gristleback Brute

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

Multiattack. The brute makes two attacks, using Club or Javelin in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the brute's next turn.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the brute's next turn.

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
[concept] signature elements: massive club [object] | hurls boulders [behavior] | thick, scarred hide [body]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The brute plants its feet and swings its club in a full, crushing circle, hammering everything around it. Creatures caught in the arc are knocked back by the impact. The brute can only do this when it has a moment to wind up, so it cannot follow immediately with its usual flurry." [action/always/damage] — menu: swallow, trample, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: leap, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Driving Bellow (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When a foe lands a solid blow on the brute, its dim fury boils over and it lashes out at whoever struck it with a wild backhand. This happens without thought or aim, just spiteful reflex." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature miss: trait — "When a foe lands a solid blow on the brute, its dim fury boils over and it lashes out at whoever struck it with a wild backhand. This happens without thought or aim, just spiteful reflex." [trait/on_being_hit/damage] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge, bloodied-fury, shielded-mind)
[reskin] print canon alignment: Chaotic Neutral -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Giant" — the Ogre's
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Tempest Sovereign — a homebrew with a nova

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tempest Sovereign | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Claw + legendary Claw Snatch); nova Thunderwall 71; dmg 150

```
Tempest Sovereign

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

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Draconic, Auran

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the sovereign fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The sovereign makes three Claw attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Thunderwall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The sovereign casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the sovereign can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Claw Snatch. The sovereign makes one Claw attack.

Storm Dive. The sovereign moves up to half its Speed without provoking Opportunity Attacks.

Crack the Will. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-scaled body [body] | territorial storm sovereignty [behavior]
[reskin] signature idea (action): "The sovereign slams a claw into the ground and the sky answers: a rolling shelf of thunder races outward along the ground in every direction from the point of impact, flattening grass, shattering stone, and carrying the roar of the storm with it. Everyone caught in that expanding wave is knocked from their feet and shoved bodily outward, then left sprawled in its wake as the sovereign strides thro" [action/save/movement] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The sovereign slams a claw into the ground and the sky answers: a rolling shelf of thunder races outward along the ground in every direction from the point of impact, flattening grass, shattering stone, and carrying the roar of the storm with it. Everyone caught in that expanding wave is knocked from their feet and shoved bodily outward, then left sprawled in its wake as the sovereign strides thro" [action/save/movement] — the model found no template that holds it (offered: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure)
[reskin] signature idea (trait): "The sovereign's hide is a storm given scale: every blow that lands on it discharges in a crack of thunder that arcs back through the attacker, and any creature clinging to or grappling the sovereign takes that answering thunder over and over as long as it holds on. The closer and more persistent the contact, the louder the storm answers." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] signature miss: trait — "The sovereign's hide is a storm given scale: every blow that lands on it discharges in a crack of thunder that arcs back through the attacker, and any creature clinging to or grappling the sovereign takes that answering thunder over and over as long as it holds on. The closer and more persistent the contact, the louder the storm answers." [trait/on_being_hit/damage] — the model picked "resonant-body" (no verb) over a concept-verb template (heated-body)
[reskin] chassis nova: "Thunderwall (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Drowned Chamberlain — one marked soft

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Chamberlain | 6 | caster-6 | ok | ok | SOFT: multiattack-count | ok | ok | ok | ok | ok | ok |

- structure · soft · multiattack-count: Multiattack says 3 but names no rows
- read: def 2 / off 0 → 1; sustained 0 (3 × ?); nova none; dmg 0

```
Drowned Chamberlain

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

Actions

Multiattack. The chamberlain makes three attacks.

Spellcasting. The chamberlain casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The chamberlain casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The chamberlain is hit by an attack roll. Response: The chamberlain casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=teleport — caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: always a step from the strike [behavior] | court magic cast between footfalls [behavior] | shadow-pawned presence [body]
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The chamberlain reaches into its own shadow and tears off a slice of presence, shaping it into a pawn that stands where it stood. The pawn wears the chamberlain's outline and mask, and until it is struck down, any blow meant for the chamberlain may instead find only the pawn. The pawn can be struck and undone, but while it stands, the chamberlain is never quite where the attack lands." [action/always/defense] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] signature miss: action — "The chamberlain reaches into its own shadow and tears off a slice of presence, shaping it into a pawn that stands where it stood. The pawn wears the chamberlain's outline and mask, and until it is struck down, any blow meant for the chamberlain may instead find only the pawn. The pawn can be struck and undone, but while it stands, the chamberlain is never quite where the attack lands." [action/always/defense] — the model found no template that holds it (offered: phase-slip, thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground)
[reskin] value check: "Sundering Shove" EV 1.9 vs floor 7.3 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever the chamberlain is struck by an attack, a flicker of its shadow slips away and pawns itself to the Plane of Shadow. The next time it is hit, the wound bleeds shadow instead of blood, and the chamberlain steps one pace sideways through the space between here and there." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Whenever the chamberlain is struck by an attack, a flicker of its shadow slips away and pawns itself to the Plane of Shadow. The next time it is hit, the wound bleeds shadow instead of blood, and the chamberlain steps one pace sideways through the space between here and there." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, bloodied-fury, uncanny-sense)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Bogstalker — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bogstalker | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

```
Bogstalker

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 30 ft.

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

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the bogstalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the bogstalker hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Actions

Multiattack. The bogstalker makes two Bite attacks.

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the bogstalker takes the Hide action.

Predatory Focus (2/Day). The bogstalker has Advantage on the next attack roll it makes before the end of its turn.

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
[concept] signature elements: tracks prey by scent alone [behavior] | hide-and-ambush opener [behavior] | eyeless hide-membrane face [body]
[reskin] signature idea (action): "The bogstalker fixes its attention on one creature it can smell, learning that creature's scent so completely that it can track it unerringly across any distance and through any terrain for as long as the quarry lives. Once marked this way, the hunter always knows the direction and rough distance to that creature, even through walls, water, or miles of forest, and can never lose the trail to munda" [action/always/condition] — menu: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] value check: "Scent-Brand" EV 5.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Scent-Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bogstalker's face is a sealed, sunken mask of scarred hide with no eyes at all, so it simply cannot be blinded, dazzled, or fooled by anything that relies on being seen. Its whole world is scent and vibration, and it never needs to look at a target to strike it." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, uncanny-sense, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The bogstalker's face is a sealed, sunken mask of scarred hide with no eyes at all, so it simply cannot be blinded, dazzled, or fooled by anything that relies on being seen. Its whole world is scent and vibration, and it never needs to look at a target to strike it." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, web-walker, noxious-aura, bloodied-fury, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
```


---

## Vessel of Stolen Voices — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vessel of Stolen Voices | 3 | skirmisher-3-skulker | ok | ok | FAIL: multiattack-combination | ok | ok | ok | ok | ok | ok |

- structure · fail · multiattack-combination: "in any combination" with one row: "The stolen voices makes two attacks, using Dagger Throw in any combination."
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Vessel of Stolen Voices

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

Mimicry. The stolen voices can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Fleet. The stolen voices ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The stolen voices makes two attacks, using Dagger Throw in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Dagger Throw. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The stolen voices takes the Dash, Disengage, or Hide action.

Stolen Cadence (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the stolen voices moves up to half its Speed, and it makes one Dagger attack.

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
[concept] signature elements: throwing daggers from hiding [behavior] | mimicry of stolen voices [behavior] | a hoard of taken last words [object]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "It throws its voice in the exact cadence of a dead friend or loved one, speaking to one enemy that can hear it. That enemy is wracked by grief and hesitation, unable to act freely for a moment, while anyone else nearby who knew the dead speaker is thrown off balance and easier to fool. Once the same person hears a voice they know is stolen, it never works on them again." [action/always/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "It throws its voice in the exact cadence of a dead friend or loved one, speaking to one enemy that can hear it. That enemy is wracked by grief and hesitation, unable to act freely for a moment, while anyone else nearby who knew the dead speaker is thrown off balance and easier to fool. Once the same person hears a voice they know is stolen, it never works on them again." [action/always/condition] — the model found no template that holds it (offered: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed)
[reskin] value check: "Rampage (1/Day)" EV 10.1 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every creature it kills with a melee dagger, its hoard of stolen last words grows. Whenever it mimics a voice from that hoard, the sound carries a fragment of genuine dying breath, making it far harder to tell the imitation from the real thing." [trait/always/resource] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Every creature it kills with a melee dagger, its hoard of stolen last words grows. Whenever it mimics a voice from that hoard, the sound carries a fragment of genuine dying breath, making it far harder to tell the imitation from the real thing." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] species kit: Auran — the kenku's own
```


---

## Garrison Hierophant — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Garrison Hierophant | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Garrison Hierophant

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

Senses darkvision 30 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The hierophant makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the hierophant's next turn.

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
[concept] signature elements: shield-wall defender who punishes anyone who slips past [behavior] | a mace and shield in heavy iron plate, with no magic at all [object] | a litany of remembered prayers as its only 'miracles' [behavior]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "The hierophant plants its shield and speaks the words of the charge, daring every foe to come through it. Until the start of its next turn, the first enemy that enters or leaves the space it guards is crushed by a sudden mace stroke that cracks bone through mail, and the strike knocks the invader sprawling. Only one such trespasser can be punished before the hierophant must reset its stance and dr" [trait/start_of_turn/damage] — menu: warded-mending (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Driving Bellow (2/Day)" EV 8.2 vs floor 35.5 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The hierophant's worship is iron and stone: while it wears consecrated plate and bears its shield, the memory of its vows armors its mind as surely as steel armors its flesh, turning aside charms, fears, and beguilements that would make it yield the gate it was set to hold. This is not magic, merely a will too disciplined to be broken while the wall stands." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Gilded Vault Ooze — in the run

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Vault Ooze | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: no-type-in-name |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- reader · fail · no-type-in-name: Traits/Gilded Clinging Acid: the name carries Acid the text does not deal
- **dropped clause:** "digests reliquaries and drips gilded acid"
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Vault Ooze

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

Gilded Clinging Acid. The vault ooze adheres to anything that touches it. A Huge or smaller creature adhered to the vault ooze is also Grappled by it (escape DC 16). Ability checks made to escape this grapple have Disadvantage.

Amorphous. The vault ooze can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The vault ooze makes two Pseudopod attacks.

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
[concept] signature elements: engulfing reliquaries and prey [behavior] | tar and gold-flecked acid body [body] | dissolved gold and gemstone spray [object]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ooze gorges on the nearest source of metal or held treasure, dragging it inside; for a short time afterward it swells and glistens, and every creature still caught in its bulk feels the dissolved metal burning through them as its acid hardens into gold-flecked barbs." [action/save/damage] — menu: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature miss: action — "The ooze gorges on the nearest source of metal or held treasure, dragging it inside; for a short time afterward it swells and glistens, and every creature still caught in its bulk feels the dissolved metal burning through them as its acid hardens into gold-flecked barbs." [action/save/damage] — the model found no template that holds it (offered: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, hook-rider, patient-defense)
[reskin] signature idea (trait): "The ooze's tar-thick body clings: creatures that strike it or are struck by it find their weapons and limbs fouled with gilded acid that keeps eating at them for a few moments after contact." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature template (trait): adhesive -> Traits/"Gilded Clinging Acid" ("the ooze's tar-thick body clings to creatures that strike it or are struck by it [verb: tar:idea]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Gilded Slam" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Swarm of Cerement Chorus — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Cerement Chorus | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Cerement Clatter); nova none; dmg 90

```
Swarm of Cerement Chorus

Medium Swarm of Tiny Constructs, Lawful Neutral

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 30 ft.

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

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Cerement Clatter. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

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
[concept] signature elements: swarm of self-ringing bells [body] | targets the dying [behavior] | death-knell tolling [aura]
[reskin] signature idea (action): "The bell chorus fastens onto one creature it can sense is close to death — whether gravely wounded, unconscious, or one failed save from the end — and tolls its full knell directly into that creature alone. The toll bypasses every other soul nearby, striking the marked one as a lash of pure passing that other creatures barely even hear." [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] signature miss: action — "The bell chorus fastens onto one creature it can sense is close to death — whether gravely wounded, unconscious, or one failed save from the end — and tolls its full knell directly into that creature alone. The toll bypasses every other soul nearby, striking the marked one as a lash of pure passing that other creatures barely even hear." [action/save/damage] — the model found no template that holds it (offered: active-toll, trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, random-ray, ground-burst, spew, isolation)
[reskin] signature idea (trait): "When any creature dies within earshot of the chorus, the swarm catches that death like a bell catching a clapper and dives immediately for the nearest next life that is fading, its bodies pulled toward fresh endings with an eagerness nothing can slow." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] signature miss: trait — "When any creature dies within earshot of the chorus, the swarm catches that death like a bell catching a clapper and dives immediately for the nearest next life that is fading, its bodies pulled toward fresh endings with an eagerness nothing can slow." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
```


---

## Unmarked Blade — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Unmarked Blade | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Whirling Bladestorm 28; dmg 47

```
Unmarked Blade

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

Multiattack. The unmarked blade makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the unmarked blade has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

Whirling Bladestorm (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
[concept] signature elements: handaxe hurled before closing [behavior] | shortsword follow-through [object] | iron mercenary kit [body]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "The sellsword throws an axe in a flat arc and, in one unbroken motion, follows the throw and closes the distance, sword already sliding free. If the hurled axe hits, the target cannot easily escape the follow-up and the sellsword's next sword strike against it lands with unusual certainty. This is the one moment the blade truly commits." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature miss: action — "The sellsword throws an axe in a flat arc and, in one unbroken motion, follows the throw and closes the distance, sword already sliding free. If the hurled axe hits, the target cannot easily escape the follow-up and the sellsword's next sword strike against it lands with unusual certainty. This is the one moment the blade truly commits." [rider/on_hit/damage] — the model picked "bolt-mark" (no verb) over a concept-verb template (thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Those who try to slip away from the sellsword find the blade already there. Whenever an enemy turns its back to flee or reposition out of reach, the sellsword answers with one measured cut, a warning that its reach is longer than the space between you." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Those who try to slip away from the sellsword find the blade already there. Whenever an enemy turns its back to flee or reposition out of reach, the sellsword answers with one measured cut, a warning that its reach is longer than the space between you." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, faultless-tracker)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Veteran's Footwork" is the seat's, not the Warrior Veteran's
```


---

## Well-Drowned Warden — in the run

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well-Drowned Warden | 5 | lurker-5-trap | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Corrosive Tendril); nova none; dmg 34

```
Well-Drowned Warden

Large Monstrosity, Neutral Evil

AC 20
Initiative -1 (9)

HP 93 (11d10 + 33)

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

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The warden makes two Corrosive Tendril attacks. It can replace one attack with a use of Brine Choke.

Corrosive Tendril. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the warden), reach 5 ft. 17 (4d6 + 3) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Brine Choke. Strength Saving Throw: DC 14, one Medium or smaller creature the warden is touching. Failure: 9 (2d8) Acid damage, and the warden drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved. Success: Half damage only.

Bonus Actions

False Form. The warden shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Monstrosity mechanics=none — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: lurking in a well [behavior] | brine-soaked tendrils [body] | drowning grab [behavior]
[reskin] signature idea (action): "The warden reaches out and touches the water of its own well, staining a wide stretch of the surface with a clinging brine that is part of its body. Any creature standing in or passing through that soaked area is grabbed by the water itself and starts drowning on dry land — the water it has already swallowed turns on it, forcing it to fight for air. The soaked patch lasts only a short while before" [action/always/condition] — menu: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Brine Choke" EV 9.5 vs floor 9.4 (one attack of 2) — added Success: Half
[reskin] signature template: pull-through -> Actions/"Brine Choke" ("the warden touches the water of its well and any creature standing in or passing [verb: drown:idea]")
[reskin] signature idea (trait): "The warden's body is not flesh but living brine and broken rope. Whenever it strikes a creature it has already grabbed, the creature's own fluids begin to dissolve into the warden's mass, sapping its strength and feeding the warden. A creature that dies while dissolving leaves only clear water behind, and the warden grows a little heavier and hungrier." [trait/always/damage] — menu: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The warden's body is not flesh but living brine and broken rope. Whenever it strikes a creature it has already grabbed, the creature's own fluids begin to dissolve into the warden's mass, sapping its strength and feeding the warden. A creature that dies while dissolving leaves only clear water behind, and the warden grows a little heavier and hungrier." [trait/always/damage] — the model found no template that holds it (offered: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption)
```
